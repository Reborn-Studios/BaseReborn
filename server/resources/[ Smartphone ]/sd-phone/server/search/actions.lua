---@type table Framework player bridge (bridge.server.player): SIM-aware identifier.
local player = require 'bridge.server.player'
---@type table Shared helpers (server.util): envelopes, trim, rate limits, LIKE escaping.
local util = require 'server.util'
---@type table sd-phone config root (configs/config.lua): stocks assets and feed limits.
local config = require 'configs.config'
---@type table Gate evaluator (server.gates): which apps this player may use.
local gates = require 'server.gates'
---@type table Contacts persistence (server.contacts.store).
local contacts = require 'server.contacts.store'
---@type table Messages persistence (server.messages.store).
local messages = require 'server.messages.store'
---@type table Mail persistence (server.mail.store).
local mail = require 'server.mail.store'
---@type table Notes persistence (server.notes.store).
local notes = require 'server.notes.store'
---@type table Calendar persistence (server.calendar.store).
local calendar = require 'server.calendar.store'
---@type table Documents persistence (server.documents.store).
local documents = require 'server.documents.store'
---@type table Voice memo persistence (server.voicememos.store).
local voicememos = require 'server.voicememos.store'
---@type table Garages bridge (bridge.server.garages): the caller's owned vehicles.
local garages = require 'bridge.server.garages'
---@type table Housing bridge (bridge.server.housing): the caller's owned properties.
local housing = require 'bridge.server.housing'
---@type table Weazel News persistence (server.weazelnews.store).
local weazelnews = require 'server.weazelnews.store'
---@type table Marketplace persistence (server.marketplace.store).
local marketplace = require 'server.marketplace.store'
---@type table Pages persistence (server.pages.store).
local pages = require 'server.pages.store'
---@type table Birdy handlers (server.birdy.actions): profile search.
local birdy = require 'server.birdy.actions'
---@type table Photogram handlers (server.photogram.actions): profile search.
local photogram = require 'server.photogram.actions'

local ok, fail = util.ok, util.fail

local actions = {}

---@type integer Hits returned per section.
local PER_SECTION <const> = 3
---@type integer Call-log rows read before collapsing repeat numbers down to PER_SECTION.
local RECENTS_SCAN <const> = 30
---@type integer Longest query accepted, in bytes.
local MAX_QUERY <const> = 64
---@type integer, integer Rolling budget: searches per window.
local WINDOW_MS <const>, PER_WINDOW <const> = 5000, 20
---@type integer, integer Seconds a garages or homes list stays cached per character.
local GARAGES_TTL <const>, HOMES_TTL <const> = 10, 30

---@type table<string, string> Searchable source key -> the app id whose gate decides it.
local SOURCES <const> = {
    contacts    = 'phone',
    messages    = 'messages',
    mail        = 'mail',
    notes       = 'notes',
    calendar    = 'calendar',
    documents   = 'documents',
    recents     = 'phone',
    voicememos  = 'voicememos',
    garages     = 'garages',
    homes       = 'homes',
    places      = 'maps',
    stocks      = 'stocks',
    weazelnews  = 'weazelnews',
    marketplace = 'marketplace',
    pages       = 'pages',
    birdy       = 'birdy',
    photogram   = 'photogram',
}

---@type string[] Source keys in the order they run.
local ORDER <const> = {
    'contacts', 'messages', 'mail', 'notes', 'calendar', 'documents', 'recents', 'voicememos',
    'garages', 'homes', 'places', 'stocks', 'weazelnews', 'marketplace', 'pages', 'birdy', 'photogram',
}

---@type table<string, true> Sources whose failure has already been printed this resource start.
local warned = {}

---@type table<string, table<string, { at: integer, data: table }>> List kind -> identifier -> cached list.
local listCache = { garages = {}, homes = {} }

---@type integer Milliseconds a public feed read is shared across every searcher.
local FEED_TTL_MS <const> = 5000

---@type table<string, { at: integer, data: table }> Feed name -> the last rows read for every player.
local feedCache = {}

---Steps a byte index back to the start of its UTF-8 character.
---@param s string
---@param i integer
---@return integer
local function charStart(s, i)
    while i > 1 do
        local b = s:byte(i)
        if not b or b < 0x80 or b >= 0xC0 then break end
        i = i - 1
    end
    return i
end

---A one-line excerpt of `text` around the first case-insensitive hit of `q`.
---@param text string
---@param q string
---@return string
local function snippet(text, q)
    local flat = tostring(text or ''):gsub('%s+', ' ')
    local at = flat:lower():find(q:lower(), 1, true) or 1
    local from = charStart(flat, math.max(1, at - 24))
    local to = charStart(flat, math.min(#flat + 1, at + #q + 72))
    local out = flat:sub(from, to - 1)
    if from > 1 then out = '...' .. out end
    if to <= #flat then out = out .. '...' end
    return out
end

---First non-empty line of a note body, which is its title.
---@param body string
---@return string
local function noteTitle(body)
    for line in tostring(body or ''):gmatch('[^\n]+') do
        local s = util.trim(line)
        if s ~= '' then return s end
    end
    return ''
end

---A string value, or nil when absent or blank.
---@param v any
---@return string|nil
local function str(v)
    if v == nil then return nil end
    local s = util.trim(tostring(v))
    return s ~= '' and s or nil
end

---A GenericHit with every field a string; blank optional fields are dropped.
---@param id any
---@param title any
---@param subtitle any
---@param extra any
---@return { id: string, title: string, subtitle?: string, extra?: string }
local function hit(id, title, subtitle, extra)
    return { id = tostring(id), title = str(title) or '', subtitle = str(subtitle), extra = str(extra) }
end

---Whether any of the given values contains the lowercased needle.
---@param needle string lowercased query
---@param ... any
---@return boolean
local function matches(needle, ...)
    for i = 1, select('#', ...) do
        local v = select(i, ...)
        if v ~= nil and tostring(v):lower():find(needle, 1, true) then return true end
    end
    return false
end

---The non-blank values joined with ", ".
---@param ... any
---@return string|nil
local function joined(...)
    local parts = {}
    for i = 1, select('#', ...) do
        local s = str(select(i, ...))
        if s then parts[#parts + 1] = s end
    end
    return #parts > 0 and table.concat(parts, ', ') or nil
end

---A per-character list from `load`, reused for `ttl` seconds and keyed on the real identifier.
---@param kind string cache bucket
---@param src number
---@param ttl integer seconds
---@param load fun(src: number): table
---@return table
local function cachedList(kind, src, ttl, load)
    local id = player.getRealIdentifier(src)
    if not id then return {} end
    local bucket, now = listCache[kind], os.time()
    local entry = bucket[id]
    if entry and (now - entry.at) < ttl then return entry.data end
    for key, e in pairs(bucket) do
        if (now - e.at) >= ttl then bucket[key] = nil end
    end
    local data = load(src)
    if type(data) ~= 'table' then data = {} end
    bucket[id] = { at = now, data = data }
    return data
end

---Rows from a public feed `load`, shared by every player and reread after FEED_TTL_MS.
---@param name string feed key
---@param load fun(): table
---@return table
local function cachedFeed(name, load)
    local now, entry = GetGameTimer(), feedCache[name]
    if entry and now - entry.at >= 0 and now - entry.at < FEED_TTL_MS then return entry.data end
    local data = load()
    if type(data) ~= 'table' then data = {} end
    feedCache[name] = { at = now, data = data }
    return data
end

---@param cid string
---@param q string
---@return table[]
local function searchMail(cid, q)
    local needle, hits = q:lower(), {}
    for _, acc in ipairs(mail.listAccountsForCitizen(cid)) do
        for _, m in ipairs(acc.messages or {}) do
            local from = type(m.from) == 'table' and m.from or {}
            local folder = m.folder or 'inbox'
            if folder ~= 'trash' then
                local subject, body = tostring(m.subject or ''), tostring(m.body or '')
                local fromName, fromEmail = tostring(from.name or ''), tostring(from.email or '')
                local inBody = body:lower():find(needle, 1, true)
                if inBody or subject:lower():find(needle, 1, true)
                    or fromName:lower():find(needle, 1, true) or fromEmail:lower():find(needle, 1, true) then
                    hits[#hits + 1] = {
                        id        = m.id,
                        accountId = acc.email,
                        folder    = folder,
                        subject   = subject,
                        fromName  = fromName ~= '' and fromName or fromEmail,
                        snippet   = inBody and snippet(body, q) or snippet(body, ''),
                        sentAt    = tostring(m.sentAt or ''),
                    }
                end
            end
        end
    end
    table.sort(hits, function(a, b) return a.sentAt > b.sentAt end)
    for i = PER_SECTION + 1, #hits do hits[i] = nil end
    for i = 1, #hits do hits[i].sentAt = nil end
    return hits
end

---Upcoming events soonest first, then past events most recent first.
---@param cid string
---@param q string
---@return table[]
local function searchCalendar(cid, q)
    local needle, today = q:lower(), os.date('%Y-%m-%d')
    local found = {}
    for _, e in ipairs(calendar.visibleTo(cid)) do
        if matches(needle, e.title, e.location, e.notes) then found[#found + 1] = e end
    end
    table.sort(found, function(a, b)
        local ak, bk = tostring(a.day_key or ''), tostring(b.day_key or '')
        local au, bu = ak >= today, bk >= today
        if au ~= bu then return au end
        if ak ~= bk then
            if au then return ak < bk end
            return ak > bk
        end
        return tostring(a.start_time or '') < tostring(b.start_time or '')
    end)
    local hits = {}
    for i = 1, math.min(PER_SECTION, #found) do
        local e = found[i]
        local day = tostring(e.day_key or '')
        local time = not util.truthy(e.all_day) and str(e.start_time) or nil
        local when = time and (day .. ' ' .. time) or day
        hits[i] = hit(e.id, e.title, joined(when, e.location), day)
    end
    return hits
end

---@param cid string
---@param q string
---@return table[]
local function searchDocuments(cid, q)
    local needle, hits = q:lower(), {}
    for _, d in ipairs(documents.search(cid, q, PER_SECTION)) do
        local content = d.kind == 'text' and tostring(d.content or '') or ''
        local subtitle = nil
        if content ~= '' then
            subtitle = content:lower():find(needle, 1, true) and snippet(content, q) or snippet(content, '')
        end
        hits[#hits + 1] = hit(d.id, d.name, subtitle)
    end
    return hits
end

---One row per number, newest call first.
---@param cid string
---@param q string
---@return table[]
local function searchRecents(cid, q)
    local hits, seen = {}, {}
    for _, c in ipairs(contacts.searchCalls(cid, q, RECENTS_SCAN)) do
        local number = tostring(c.number or '')
        if not seen[number] then
            seen[number] = true
            local name = str(c.name)
            hits[#hits + 1] = hit(c.id, name or number, name and number or nil)
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---@param cid string
---@param q string
---@return table[]
local function searchVoiceMemos(cid, q)
    local hits = {}
    for _, m in ipairs(voicememos.search(cid, q, PER_SECTION)) do
        local secs = math.max(0, math.floor(tonumber(m.duration) or 0))
        hits[#hits + 1] = hit(m.id, m.name, ('%d:%02d'):format(secs // 60, secs % 60))
    end
    return hits
end

---@param src number
---@param q string
---@return table[]
local function searchGarages(src, q)
    local needle, hits = q:lower(), {}
    for _, v in ipairs(cachedList('garages', src, GARAGES_TTL, garages.list)) do
        if matches(needle, v.model, v.plate, v.garage) then
            hits[#hits + 1] = hit(v.id, v.model or v.plate, joined(v.plate, v.location), v.model)
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---@param src number
---@param q string
---@return table[]
local function searchHomes(src, q)
    local needle, hits = q:lower(), {}
    for _, h in ipairs(cachedList('homes', src, HOMES_TTL, housing.list)) do
        if matches(needle, h.address, h.type, h.area) then
            hits[#hits + 1] = hit(h.id, h.address, joined(h.type, h.area))
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---Configured companies that have a map position.
---@param q string
---@return table[]
local function searchPlaces(q)
    local needle, hits = q:lower(), {}
    for _, c in ipairs((config.Services or {}).Companies or {}) do
        local x, y = c.coords and tonumber(c.coords.x), c.coords and tonumber(c.coords.y)
        if c.job and x and y and matches(needle, c.label, c.location) then
            hits[#hits + 1] = hit(c.job, c.label, c.location, ('%.2f,%.2f'):format(x, y))
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---@param q string
---@return table[]
local function searchStocks(q)
    local needle, hits = q:lower(), {}
    for _, a in ipairs((config.Stocks or {}).Assets or {}) do
        if a.symbol and matches(needle, a.symbol, a.name) then
            hits[#hits + 1] = hit(a.symbol, a.name or a.symbol, a.symbol)
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---Published articles only; scheduled and draft rows are never read.
---@param q string
---@return table[]
local function searchWeazelNews(q)
    local needle, hits = q:lower(), {}
    local rows = cachedFeed('weazelnews', function()
        return weazelnews.articles(config.WeazelNews.ArticlesPerFeed)
    end)
    for _, a in ipairs(rows) do
        if a.status == 'published' and matches(needle, a.headline, a.dek, a.author) then
            hits[#hits + 1] = hit(a.id, a.headline, str(a.dek) or a.author)
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---Live rows from a listings-shaped feed store; scheduled rows are never included.
---@param name string feed key for the shared cache
---@param store table marketplace or pages store
---@param limit integer feed cap from config
---@param q string
---@return table[]
local function searchListings(name, store, limit, q)
    local needle, hits = q:lower(), {}
    for _, r in ipairs(cachedFeed(name, function() return store.recent(limit) end)) do
        if r.status == 'published' and matches(needle, r.title, r.body) then
            hits[#hits + 1] = hit(r.id, r.title, snippet(r.body, q))
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---Profile hits from an app's own search action; a refusal yields no hits.
---@param handler fun(src: number, payload: table): table
---@param src number
---@param q string
---@return table[]
local function searchProfiles(handler, src, q)
    local res = handler(src, { query = q })
    local users = type(res) == 'table' and res.success and type(res.data) == 'table' and res.data.users
    if type(users) ~= 'table' then return {} end
    local hits = {}
    for _, u in ipairs(users) do
        local handle = str(u.handle)
        if handle then
            hits[#hits + 1] = hit(handle, str(u.name) or handle, '@' .. handle)
            if #hits >= PER_SECTION then break end
        end
    end
    return hits
end

---@type table<string, fun(src: number, cid: string, q: string): table[]> Source key -> its search.
local RUNNERS <const> = {
    contacts = function(_, cid, q)
        local out = {}
        for _, c in ipairs(contacts.search(cid, q, PER_SECTION)) do
            out[#out + 1] = { id = c.id, name = c.name, phone = c.phone, avatar = c.avatar, color = c.color }
        end
        return out
    end,
    messages = function(_, cid, q)
        local out = {}
        for _, m in ipairs(messages.search(cid, q, PER_SECTION)) do
            local row = { conversationId = m.conversation, snippet = snippet(m.body, q) }
            if m.conversation:sub(1, 2) == 'g-' then
                local group = messages.getGroup(m.conversation:sub(3))
                row.groupName = group and group.name or nil
            end
            out[#out + 1] = row
        end
        return out
    end,
    mail = function(_, cid, q) return searchMail(cid, q) end,
    notes = function(_, cid, q)
        local out = {}
        for _, n in ipairs(notes.search(cid, q, PER_SECTION)) do
            out[#out + 1] = { id = n.id, title = noteTitle(n.body), snippet = snippet(n.body, q) }
        end
        return out
    end,
    calendar    = function(_, cid, q) return searchCalendar(cid, q) end,
    documents   = function(_, cid, q) return searchDocuments(cid, q) end,
    recents     = function(_, cid, q) return searchRecents(cid, q) end,
    voicememos  = function(_, cid, q) return searchVoiceMemos(cid, q) end,
    garages     = function(src, _, q) return searchGarages(src, q) end,
    homes       = function(src, _, q) return searchHomes(src, q) end,
    places      = function(_, _, q) return searchPlaces(q) end,
    stocks      = function(_, _, q) return searchStocks(q) end,
    weazelnews  = function(_, _, q) return searchWeazelNews(q) end,
    marketplace = function(_, _, q) return searchListings('marketplace', marketplace, config.Marketplace.ListLimit, q) end,
    pages       = function(_, _, q) return searchListings('pages', pages, config.Pages.ListLimit, q) end,
    birdy       = function(src, _, q) return searchProfiles(birdy.search, src, q) end,
    photogram   = function(src, _, q) return searchProfiles(photogram.search, src, q) end,
}

---Spotlight query over the caller's own data and public directories. Sections not requested, or
---whose app is gated off for the caller, come back empty.
---@param src number
---@param payload { q: string, sources: string[] }|nil
---@return table envelope
function actions.query(src, payload)
    local result = {
        contacts = {}, messages = {}, mail = {}, notes = {}, calendar = {}, documents = {}, recents = {},
        voicememos = {}, garages = {}, homes = {}, places = {}, stocks = {}, weazelnews = {},
        marketplace = {}, pages = {}, birdy = {}, photogram = {},
    }
    local cid = player.getIdentifier(src)
    if not cid then return ok(result) end

    payload = type(payload) == 'table' and payload or {}
    local q = util.trim(payload.q)
    if #q > MAX_QUERY then q = q:sub(1, charStart(q, MAX_QUERY + 1) - 1) end
    if #q < 2 then return ok(result) end

    if not util.rateLimit(cid, 'search:query', WINDOW_MS, PER_WINDOW) then
        return fail('search.rateLimited', 'Searching too fast, try again in a moment')
    end

    local want, any = {}, false
    if type(payload.sources) == 'table' then
        for _, s in ipairs(payload.sources) do
            if SOURCES[s] then want[s], any = true, true end
        end
    end
    if not any then return ok(result) end

    local hidden = {}
    for _, appId in ipairs(gates.hiddenBaseApps(src)) do hidden[appId] = true end

    for _, key in ipairs(ORDER) do
        local appId = SOURCES[key]
        if want[key] and util.appEnabled(appId) and not hidden[appId] then
            local fine, hits = pcall(RUNNERS[key], src, cid, q)
            if fine and type(hits) == 'table' then
                result[key] = hits
            elseif not fine and not warned[key] then
                warned[key] = true
                print(('^1[sd-phone:search]^0 %s search failed: %s'):format(key, tostring(hits)))
            end
        end
    end

    return ok(result)
end

return actions
