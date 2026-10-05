---@type table sd-phone config root (configs/config.lua): Photos.UploadLimits.
local config = require 'configs.config'
---@type table Player bridge (bridge.server.player): the character an upload is charged to.
local player = require 'bridge.server.player'

---@type table Shared upload budget for every player-driven media path (camera, voice memos,
---voicemail, call recordings, message audio, MDT bodycam, Vibez voiceovers). Every byte that
---reaches the media provider on a player's behalf is paid for here BEFORE it leaves, because the
---provider bills the server owner and nothing downstream can take an upload back.
---
---Four ceilings, all of which must pass:
---  1. a gap between uploads, so a loop cannot fire at line rate;
---  2. a rolling byte and count budget per ACCOUNT, keyed by the FiveM license rather than the
---     character, so switching characters or carrying several does not multiply it;
---  3. a daily byte cap per account, persisted in resource KVP so a restart does not reset it;
---  4. a rolling byte ceiling and a daily byte cap for the whole server, which bound the bill
---     however many accounts an abuser brings.
local mediaLimit = {}

---@type table Photos config (configs/photos.lua): the UploadLimits block.
local PHOTOS = type(config.Photos) == 'table' and config.Photos or require 'configs.photos'
---@type table Upload ceilings as configured; every value has a default below.
local LIMITS = type(PHOTOS.UploadLimits) == 'table' and PHOTOS.UploadLimits or {}

---A config number, floored and clamped to `min`, or `default` when unset or not a number.
---@param value any
---@param default number
---@param min number
---@return number
local function setting(value, default, min)
    local n = tonumber(value)
    if not n or n ~= n then return default end
    return math.max(min, math.floor(n))
end

---@type integer Bytes in a megabyte.
local MB <const> = 1024 * 1024

---@type integer Minimum gap between accepted uploads from one account (ms).
local COOLDOWN_MS  = setting(LIMITS.CooldownMs, 1000, 0)
---@type integer Rolling window the per-account and server budgets are measured over (ms).
local WINDOW_MS    = setting(LIMITS.WindowMinutes, 10, 1) * 60 * 1000
---@type integer Bytes one account may upload within a window.
local WINDOW_BYTES = setting(LIMITS.PlayerMB, 200, 1) * MB
---@type integer Uploads one account may make within a window, whatever their size.
local WINDOW_COUNT = setting(LIMITS.PlayerUploads, 120, 1)
---@type integer Kilobytes one account may upload per UTC day; 0 turns the daily cap off.
local DAILY_KB     = setting(LIMITS.PlayerDailyMB, 2048, 0) * 1024
---@type integer Bytes the whole server may upload within a window; 0 turns the ceiling off.
local SERVER_BYTES = setting(LIMITS.ServerMB, 3072, 0) * MB
---@type integer Kilobytes the whole server may upload per UTC day; 0 turns the cap off. The
---per-account caps cannot bound someone who brings many accounts; this does.
local SERVER_DAILY_KB = setting(LIMITS.ServerDailyMB, 20480, 0) * 1024

---@type string Daily-total key for the whole server. Accounts are `license:...` or `cid:...`,
---so this can never collide with one.
local SERVER_ACCOUNT <const> = '__server'

---@type string Prefix of the KVP keys holding each account's daily total.
local KVP_PREFIX <const> = 'sd_media_day:'

---@alias MediaEvent { t: integer, bytes: integer }

---@type table<string, { last: integer, events: MediaEvent[] }> Rolling state per account.
local buckets = {}
---@type MediaEvent[] Rolling state for the whole server.
local serverEvents = {}
---@type table<string, integer> Daily totals in KB when KVP natives are unavailable (tests).
local dayMemory = {}

---@type boolean Whether resource KVP can hold the daily totals.
local HAS_KVP = type(GetResourceKvpInt) == 'function' and type(SetResourceKvpInt) == 'function'

---The account an upload is charged to: the FiveM license, so every character on it shares one
---budget. Falls back to the character when no license is visible, which still refuses nothing
---that should pass. Nil when the player has no character loaded.
---@param src number
---@return string|nil account
local function accountOf(src)
    -- The real character, not the SIM identity getIdentifier resolves to when unique phones are on:
    -- keyed by the SIM, every SIM a player carries would be a fresh budget.
    local cid = player.getRealIdentifier(src)
    if type(cid) ~= 'string' or cid == '' then return nil end
    local license = type(GetPlayerIdentifierByType) == 'function'
        and GetPlayerIdentifierByType(tostring(src), 'license') or nil
    if type(license) == 'string' and license ~= '' then return license end
    return 'cid:' .. cid
end

---Today's UTC date as a KVP key part.
---@return string
local function today()
    return tostring(os.date('!%Y%m%d'))
end

---@param account string
---@param day string
---@return integer kb
local function dayRead(account, day)
    local key = KVP_PREFIX .. day .. ':' .. account
    if HAS_KVP then return GetResourceKvpInt(key) or 0 end
    return dayMemory[key] or 0
end

---@param account string
---@param day string
---@param kb integer
local function dayWrite(account, day, kb)
    local key = KVP_PREFIX .. day .. ':' .. account
    kb = math.max(0, kb)
    if HAS_KVP then SetResourceKvpInt(key, kb) else dayMemory[key] = kb end
end

---Drops events older than the window and returns what is left in it.
---@param events MediaEvent[]
---@param now integer
---@return MediaEvent[] kept, integer bytes, integer count
local function prune(events, now)
    local kept, sum = {}, 0
    for _, e in ipairs(events) do
        if now - e.t < WINDOW_MS then
            kept[#kept + 1] = e
            sum = sum + e.bytes
        end
    end
    return kept, sum, #kept
end

---@alias MediaTicket { account: string, day: string, event: MediaEvent, serverEvent: MediaEvent }

---The shared gate. Synchronous (no yield), so calling it immediately before an async upload is
---race-free: a concurrent request sees the bytes this one recorded.
---@param src number
---@param bytes any
---@param useCooldown boolean
---@return boolean ok, string|nil reason, MediaTicket|nil ticket
local function take(src, bytes, useCooldown)
    local account = accountOf(src)
    if not account then return false, 'identity' end

    bytes = math.max(0, math.floor(tonumber(bytes) or 0))
    local now = GetGameTimer()

    local b = buckets[account]
    if useCooldown and b and now - b.last < COOLDOWN_MS then return false, 'cooldown' end
    b = b or { last = 0, events = {} }
    buckets[account] = b

    local sum, count
    b.events, sum, count = prune(b.events, now)
    if count + 1 > WINDOW_COUNT then return false, 'budget' end
    if sum + bytes > WINDOW_BYTES then return false, 'budget' end

    local day = today()
    local kb = math.ceil(bytes / 1024)
    if DAILY_KB > 0 and dayRead(account, day) + kb > DAILY_KB then return false, 'budget' end

    local serverSum
    serverEvents, serverSum = prune(serverEvents, now)
    if SERVER_BYTES > 0 and serverSum + bytes > SERVER_BYTES then
        print(('^1[sd-phone:media]^0 server-wide upload ceiling reached (%d MB in %d min); refusing uploads until it drains.')
            :format(SERVER_BYTES // MB, WINDOW_MS // 60000))
        return false, 'server'
    end
    if SERVER_DAILY_KB > 0 and dayRead(SERVER_ACCOUNT, day) + kb > SERVER_DAILY_KB then
        print(('^1[sd-phone:media]^0 server-wide daily upload cap reached (%d MB); refusing uploads until 00:00 UTC.')
            :format(SERVER_DAILY_KB // 1024))
        return false, 'server'
    end

    if useCooldown then b.last = now end
    local event = { t = now, bytes = bytes }
    local serverEvent = { t = now, bytes = bytes }
    b.events[#b.events + 1] = event
    serverEvents[#serverEvents + 1] = serverEvent
    if DAILY_KB > 0 then dayWrite(account, day, dayRead(account, day) + kb) end
    if SERVER_DAILY_KB > 0 then dayWrite(SERVER_ACCOUNT, day, dayRead(SERVER_ACCOUNT, day) + kb) end

    return true, nil, { account = account, day = day, event = event, serverEvent = serverEvent }
end

---Gates and charges an upload the server is about to make with bytes it already holds.
---Refuses a player with no character loaded: nothing player-driven uploads anonymously, and an
---unidentified source used to pass straight through every ceiling.
---@param src number player the upload is for
---@param bytes any size of the upload being attempted
---@return boolean ok true when the upload may proceed
---@return string|nil reason 'identity' | 'cooldown' | 'budget' | 'server' when blocked
function mediaLimit.charge(src, bytes)
    local ok, why = take(src, bytes, true)
    return ok, why
end

---Reserves `bytes` for an upload whose real size is not known yet (a presigned slot, where the
---player uploads to the provider directly). Charged in full now, because the provider has been
---paid the moment the bytes land, whether or not the player ever reports back. No cooldown: the
---slot's own mint gate paces these, and a failed direct attempt must still be able to fall back.
---@param src number
---@param bytes integer the most this slot can be settled at
---@return boolean ok, string|nil reason, MediaTicket|nil ticket hand to settle once the size is known
function mediaLimit.reserve(src, bytes)
    return take(src, bytes, false)
end

---Settles a reservation at the size actually stored. Only ever lowers the charge: a reservation
---is the ceiling the slot was minted for, and a larger figure here would mean the caller's own
---cap was not applied.
---@param ticket MediaTicket|nil
---@param bytes any
function mediaLimit.settle(ticket, bytes)
    if type(ticket) ~= 'table' or type(ticket.event) ~= 'table' then return end
    bytes = math.max(0, math.floor(tonumber(bytes) or 0))
    local reserved = ticket.event.bytes
    if bytes >= reserved then return end

    ticket.event.bytes = bytes
    ticket.serverEvent.bytes = bytes
    local refundKb = math.ceil(reserved / 1024) - math.ceil(bytes / 1024)
    if refundKb > 0 then
        if DAILY_KB > 0 then
            dayWrite(ticket.account, ticket.day, dayRead(ticket.account, ticket.day) - refundKb)
        end
        if SERVER_DAILY_KB > 0 then
            dayWrite(SERVER_ACCOUNT, ticket.day, dayRead(SERVER_ACCOUNT, ticket.day) - refundKb)
        end
    end
end

---Deletes daily totals from any day but today, so KVP holds one key per active account.
local function sweepDays()
    if not HAS_KVP or type(StartFindKvp) ~= 'function' then return end
    local keep = KVP_PREFIX .. today() .. ':'
    local stale = {}
    local handle = StartFindKvp(KVP_PREFIX)
    if not handle or handle == -1 then return end
    while true do
        local key = FindKvp(handle)
        if not key then break end
        if key:sub(1, #keep) ~= keep then stale[#stale + 1] = key end
    end
    EndFindKvp(handle)
    for _, key in ipairs(stale) do DeleteResourceKvp(key) end
end

-- Periodic sweep: drop accounts with nothing left in the window so the table cannot grow
-- unbounded, and daily totals from earlier days so KVP does not either.
CreateThread(function()
    sweepDays()
    while true do
        Wait(WINDOW_MS)
        local now = GetGameTimer()
        for account, b in pairs(buckets) do
            local kept = prune(b.events, now)
            if #kept == 0 and now - b.last >= WINDOW_MS then
                buckets[account] = nil
            else
                b.events = kept
            end
        end
        serverEvents = prune(serverEvents, now)
        sweepDays()
    end
end)

return mediaLimit
