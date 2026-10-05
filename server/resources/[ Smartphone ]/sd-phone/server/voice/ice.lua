---@type table sd-phone config root (configs/config.lua).
local config = require 'configs.config'
---@type table Player bridge (bridge.server.player): who a relay credential is issued to.
local player = require 'bridge.server.player'
---@type table Shared server helpers (server.util): the disconnect hook that revokes credentials.
local util   = require 'server.util'
---@type table Node crypto helper (server.crypto): HMAC for coturn's time-limited credentials.
local crypto = require 'server.crypto'

---@type table Voice config (configs/voice.lua): STUN list + TURN provisioning.
local CFG  = config.Voice or {}
---@type table Public STUN server URLs, always offered to every peer connection.
local STUN = CFG.StunServers or { 'stun:stun.l.google.com:19302' }
---@type table TURN provisioning config (CFG.Turn): Provider + TtlSeconds.
local TURN = CFG.Turn or {}

---@type table ICE module; the table returned at end of file.
---
---A TURN relay bills its owner by the gigabyte, and the credential for it has to be handed to the
---player's browser, where anyone can read it out and point their own traffic at the relay from
---outside the game. Until 2026-09-16 one Cloudflare credential lasting a day was shared by every
---player, so a single copied credential worked for anyone, and kept working after they left.
---
---Now each player gets their own, only once a character is loaded, and it is revoked the moment
---they disconnect: a copied credential stops working when its owner does, and a heavy user can be
---traced to one player. A coturn relay gets the same treatment through its shared-secret mode.
local ice = {}

---@type integer Seconds a failed provisioning is cached for, per player. Short enough that a
---transient Cloudflare outage heals on its own, long enough that it can never become a request loop.
local ICE_FAILURE_TTL <const> = 60

---@type integer Seconds before a credential lapses that a fresh one is minted instead of reusing it.
---Clients refresh their copy well inside this, so a call never starts on a credential about to die.
local REFRESH_LEAD_MAX_S <const> = 3600

---@type integer Lifetime of a Cloudflare credential, in seconds. It has to outlast the longest call:
---Cloudflare does not say whether an allocation survives its credential expiring.
local TTL = math.max(600, math.floor(tonumber(TURN.TtlSeconds) or 86400))

---@alias IceIssued { entries: table, refreshAt: integer, usernames: { name: string, expires: integer }[] }

---@type table<number, IceIssued> Credentials issued to each connected source.
local issued = {}
---@type table<number, table> In-flight provisioning per source, so a burst of calls from one player
---waits on one request instead of fanning out to Cloudflare.
local pending = {}

---The always-available STUN portion of an iceServers list, built fresh so callers can append.
---@return table servers array of { urls = string }
local function baseStun()
    local servers = {}
    for _, url in ipairs(STUN) do servers[#servers + 1] = { urls = url } end
    return servers
end

---Flattens a provider's iceServers payload into entries RTCPeerConnection accepts. Cloudflare
---returns an ARRAY (a plain STUN entry plus a credentialled TURN one), so appending the payload
---whole hands the browser a nested array carrying no `urls`, and RTCPeerConnection rejects the
---WHOLE configuration with "Malformed RTCIceServer" - the call goes black. A lone entry object is
---taken too, since that is the shape a hand-rolled or non-Cloudflare provider tends to return.
---@param payload table|nil decoded `iceServers` value from the provider
---@return table entries flat array of RTCIceServer tables, empty when none are usable
local function normalizeIceServers(payload)
    if type(payload) ~= 'table' then return {} end

    local entries = {}
    for _, entry in ipairs(payload.urls and { payload } or payload) do
        if type(entry) == 'table' and entry.urls ~= nil then entries[#entries + 1] = entry end
    end
    return entries
end

---@return string tokenId, string apiToken
local function cloudflareConvars()
    return GetConvar('sd_cf_turn_token_id', ''), GetConvar('sd_cf_turn_api_token', '')
end

---Provisions one Cloudflare Realtime TURN credential set. Returns nil when unconfigured, on any
---transport/decode failure, or when the payload holds no usable entry - all of which cache as a
---failure rather than serve a list the browser will throw on.
---@return table|nil entries flat array of RTCIceServer tables, nil on failure
local function fetchCloudflareTurn()
    local tokenId, apiToken = cloudflareConvars()
    if tokenId == '' or apiToken == '' then return nil end

    local p = promise.new()
    PerformHttpRequest(
        ('https://rtc.live.cloudflare.com/v1/turn/keys/%s/credentials/generate-ice-servers'):format(tokenId),
        function(status, body)
            if status ~= 201 or not body then return p:resolve(nil) end
            local ok, decoded = pcall(json.decode, body)
            local entries = ok and decoded and normalizeIceServers(decoded.iceServers) or nil
            p:resolve(entries and entries[1] and entries or nil)
        end,
        'POST',
        json.encode({ ttl = TTL }),
        {
            ['Authorization'] = 'Bearer ' .. apiToken,
            ['Content-Type']  = 'application/json',
            ['Accept']        = 'application/json',
        }
    )
    return Citizen.Await(p)
end

---Revokes Cloudflare credentials by username. Fire and forget: a revoke that fails leaves the
---credential to lapse at its TTL, which is what every credential did before revocation existed.
---@param usernames { name: string, expires: integer }[]
local function revokeCloudflare(usernames)
    local tokenId, apiToken = cloudflareConvars()
    if tokenId == '' or apiToken == '' then return end
    local now = os.time()
    for _, u in ipairs(usernames) do
        if u.expires > now then
            local name = u.name:gsub('[^%w%-_%.~]', function(c) return ('%%%02X'):format(c:byte()) end)
            PerformHttpRequest(
                ('https://rtc.live.cloudflare.com/v1/turn/keys/%s/credentials/%s/revoke'):format(tokenId, name),
                function(status)
                    if status ~= 204 and status ~= 200 then
                        print(('^3[sd-phone:voice]^0 could not revoke a TURN credential (HTTP %s); it lapses at its TTL instead.')
                            :format(tostring(status)))
                    end
                end,
                'POST', '', { ['Authorization'] = 'Bearer ' .. apiToken }
            )
        end
    end
end

---Usernames carried by a credential set, so they can be revoked later.
---@param entries table
---@param expires integer
---@return { name: string, expires: integer }[]
local function usernamesOf(entries, expires)
    local out, seen = {}, {}
    for _, entry in ipairs(entries) do
        local name = entry.username
        if type(name) == 'string' and name ~= '' and not seen[name] then
            seen[name] = true
            out[#out + 1] = { name = name, expires = expires }
        end
    end
    return out
end

---Appends the Cloudflare credentials issued to `src`, minting a fresh set when none is current.
---@param src number
---@param servers table list to append to
local function appendCloudflare(src, servers)
    local now = os.time()
    local hit = issued[src]
    if not (hit and hit.refreshAt > now) then
        if pending[src] then
            Citizen.Await(pending[src])
        else
            local p = promise.new()
            pending[src] = p

            local ok, entries = pcall(fetchCloudflareTurn)
            local mintedAt = os.time()
            local previous = issued[src] and issued[src].usernames or {}
            if ok and entries then
                local keep = {}
                for _, u in ipairs(previous) do
                    if u.expires > mintedAt then keep[#keep + 1] = u end
                end
                for _, u in ipairs(usernamesOf(entries, mintedAt + TTL)) do keep[#keep + 1] = u end
                issued[src] = {
                    entries   = entries,
                    refreshAt = mintedAt + TTL - math.min(REFRESH_LEAD_MAX_S, TTL // 2),
                    usernames = keep,
                }
            else
                issued[src] = { entries = {}, refreshAt = mintedAt + ICE_FAILURE_TTL, usernames = previous }
            end

            -- The player left while Cloudflare answered: the cleanup already ran against an older
            -- entry, so what was just minted would otherwise outlive them.
            if not GetPlayerName(src) then
                local gone = issued[src]
                issued[src] = nil
                if gone then revokeCloudflare(gone.usernames) end
            end

            pending[src] = nil
            p:resolve(true)
        end
        hit = issued[src]
    end

    for _, entry in ipairs(hit and hit.entries or {}) do servers[#servers + 1] = entry end
end

---ICE servers for one player's WebRTC features (video calls, the nearby-voice mesh): STUN always,
---and their own Cloudflare TURN credential when provisioning is configured and they have a
---character loaded. Nobody else's credential is ever returned.
---@param src number|nil the player the list is for; without one only STUN is returned
---@return table servers iceServers array for RTCPeerConnection
function ice.servers(src)
    local servers = baseStun()
    src = tonumber(src)
    if not src or not ice.cloudflareConfigured() then return servers end
    if not player.getRealIdentifier(src) then return servers end
    appendCloudflare(src, servers)
    return servers
end

---The self-hosted relay (sd_phone_turn_url) as one RTCIceServer entry, or nil when none is set.
---
---With sd_phone_turn_secret set (coturn's `use-auth-secret` / `static-auth-secret`), each player
---gets a credential of their own that expires on its own, following coturn's REST API scheme:
---username `<expiry>:<id>`, credential base64(HMAC-SHA1(secret, username)). The older fixed
---username/password pair still works, but it is one credential shared by every player.
---@param src number|nil
---@return table|nil entry
function ice.fixedRelay(src)
    local url = GetConvar('sd_phone_turn_url', '')
    if url == '' then return nil end

    local secret = GetConvar('sd_phone_turn_secret', '')
    if secret ~= '' then
        src = tonumber(src)
        if not src or not player.getRealIdentifier(src) then return nil end
        local username = ('%d:sdphone-%d'):format(os.time() + TTL, src)
        local credential = crypto.hmacSha1Base64(secret, username)
        if not credential then return nil end
        return { urls = url, username = username, credential = credential }
    end

    return {
        urls       = url,
        username   = GetConvar('sd_phone_turn_username', ''),
        credential = GetConvar('sd_phone_turn_credential', ''),
    }
end

---True when the self-hosted relay hands every player the same fixed credential.
---@return boolean
function ice.fixedRelayShared()
    return GetConvar('sd_phone_turn_url', '') ~= '' and GetConvar('sd_phone_turn_secret', '') == ''
end

---True when Cloudflare TURN provisioning is configured, whatever its current health.
---@return boolean
function ice.cloudflareConfigured()
    local tokenId, apiToken = cloudflareConvars()
    return TURN.Provider == 'cloudflare' and tokenId ~= '' and apiToken ~= ''
end

util.onCleanup(function(src)
    local gone = issued[src]
    issued[src] = nil
    if gone then revokeCloudflare(gone.usernames) end
end)

return ice
