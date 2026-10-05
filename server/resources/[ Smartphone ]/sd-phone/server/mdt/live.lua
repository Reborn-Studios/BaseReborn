---@type table Shared server helpers (server.util): envelopes, string bounds, batched push, cleanup.
local util   = require 'server.util'
---@type table MDT permissions (server.mdt.access): identity and the terminal gate.
local access = require 'server.mdt.access'
---@type table Text operations (server.mdt.textop): checks, rebases and applies live text edits.
local textop = require 'server.mdt.textop'

---@type table Live module; the table returned at end of file. Presence, field locks and in-flight
---drafts for the paperwork a terminal has open.
local live = {}

---@alias LiveAccess { row: table, view: boolean, edit: boolean, owner: boolean, restore: boolean, fields: table<string, boolean>, access: string|nil, texts: table<string, string>|nil }

---@alias LiveResolver fun(src: integer, me: table, ref: string): LiveAccess|nil

---@type table<string, { resolve: LiveResolver, restore: fun(src: integer, me: table, ref: string, field: string, value: string): table }>
---Per record kind: how a caller's access is resolved and how a revision is put back.
local kinds = {}

---@type string Client event every open record listens on.
local EVENT <const> = 'sd-phone:client:mdt:live'

---@type integer Seconds a lock survives without its holder touching it.
local LOCK_TTL <const> = 20

---@type integer Milliseconds between two drafts from one source.
local DRAFT_GAP_MS <const> = 120

---@type integer Largest encoded draft relayed, in bytes.
local MAX_DRAFT_BYTES <const> = 48000

---@type integer How often expired locks are swept, in ms.
local SWEEP_MS <const> = 5000

---@type integer Largest shared text, in bytes.
local MAX_TEXT_BYTES <const> = 48000

---@type integer Largest single insert an edit may carry, in bytes.
local MAX_INSERT_BYTES <const> = 16000

---@type integer Edits kept per text so a terminal that is behind can be rebased.
local HISTORY_KEPT <const> = 300

---@type integer Edits one source may send per second.
local OPS_PER_SECOND <const> = 40

---@type integer Milliseconds between two caret positions from one source.
local CARET_GAP_MS <const> = 80

---@type integer Seconds an empty room keeps unsaved shared text before dropping it.
local UNSAVED_TTL <const> = 1800

---@alias LiveMember { cid: string, name: string, department: string }
---@alias LiveLock { src: integer, cid: string, name: string, at: integer }
---@alias LiveText { text: string, saved: string, units: integer, rev: integer, savedRev: integer, history: table<integer, TextOp>, authors: table<string, string> }
---@alias LiveRoom { kind: string, ref: string, members: table<integer, LiveMember>, locks: table<string, LiveLock>, drafts: table<string, any>, texts: table<string, LiveText>, emptiedAt: integer|nil }

---@type table<string, LiveRoom> Open records by `kind:ref`.
local rooms = {}

---@type table<integer, table<string, boolean>> Room keys each source sits in.
local seats = {}

---@type table<integer, integer> GetGameTimer() of each source's last relayed draft.
local lastDraft = {}

---@type table<integer, integer> GetGameTimer() of each source's last relayed caret.
local lastCaret = {}

---@type table<integer, { second: integer, count: integer }> Edits each source sent in the current second.
local opRate = {}

---Registers how a record kind is read and restored.
---@param kind string
---@param handlers { resolve: LiveResolver, restore: fun(src: integer, me: table, ref: string, field: string, value: string): table }
function live.register(kind, handlers)
    kinds[kind] = handlers
end

---Resolves a caller's access to one record, or nil when the kind is unknown or the record is not theirs to see.
---@param kind any
---@param src integer
---@param me table
---@param ref any
---@return LiveAccess|nil
function live.resolve(kind, src, me, ref)
    local handlers = type(kind) == 'string' and kinds[kind] or nil
    local key = util.limitedString(ref, 16)
    if not handlers or not key then return nil end
    local ok, res = pcall(handlers.resolve, src, me, key)
    if not ok then
        print(('^1[sd-phone:mdt]^0 live resolve for %s failed: %s'):format(kind, res))
        return nil
    end
    return res
end

---Puts a revision's earlier value back through the kind's own save path.
---@param kind string
---@param src integer
---@param me table
---@param ref string
---@param field string
---@param value string
---@return table envelope
function live.restore(kind, src, me, ref, field, value)
    local handlers = kinds[kind]
    if not handlers or not handlers.restore then return util.fail('mdt.didNotGoThrough', 'That did not go through') end
    return handlers.restore(src, me, ref, field, value)
end

---@param kind string
---@param ref string
---@return string
local function keyOf(kind, ref)
    return kind .. ':' .. ref
end

---Whether a lock is still held.
---@param lock LiveLock|nil
---@return boolean
local function current(lock)
    return lock ~= nil and (os.time() - lock.at) < LOCK_TTL
end

---The room state a client renders.
---@param room LiveRoom
---@return table
local function stateOf(room)
    local viewers, seen = {}, {}
    for _, member in pairs(room.members) do
        if not seen[member.cid] then
            seen[member.cid] = true
            viewers[#viewers + 1] = { citizenid = member.cid, name = member.name, department = member.department }
        end
    end
    local locks, drafts = {}, {}
    for field, lock in pairs(room.locks) do
        if current(lock) then
            locks[field] = { citizenid = lock.cid, name = lock.name }
            if room.drafts[field] ~= nil then drafts[field] = room.drafts[field] end
        end
    end
    local texts = {}
    for field, doc in pairs(room.texts) do
        texts[field] = { text = doc.text, rev = doc.rev, dirty = doc.rev ~= doc.savedRev }
    end
    return { viewers = viewers, locks = locks, drafts = drafts, texts = texts }
end

---Whether a room holds shared text nobody has saved yet.
---@param room LiveRoom
---@return boolean
local function unsaved(room)
    for _, doc in pairs(room.texts) do
        if doc.rev ~= doc.savedRev then return true end
    end
    return false
end

---Pushes one change to everyone in a room, optionally skipping the source that caused it.
---@param room LiveRoom
---@param payload table
---@param except integer|nil
local function broadcast(room, payload, except)
    local targets = {}
    for src in pairs(room.members) do
        if src ~= except then targets[#targets + 1] = src end
    end
    payload.key  = keyOf(room.kind, room.ref)
    payload.type = room.kind
    payload.ref  = room.ref
    util.pushMany(EVENT, targets, payload)
end

---Releases every lock a source holds in a room, dropping its drafts with them.
---@param room LiveRoom
---@param src integer
---@param only table<string, boolean>|nil release just these fields
---@return string[] released
local function releaseAll(room, src, only)
    local released = {}
    for field, lock in pairs(room.locks) do
        if lock.src == src and (not only or only[field]) then
            room.locks[field] = nil
            room.drafts[field] = nil
            released[#released + 1] = field
        end
    end
    return released
end

---Takes a source out of a room, telling the others, and forgets the room once it is empty.
---@param key string
---@param src integer
local function vacate(key, src)
    local room = rooms[key]
    if seats[src] then seats[src][key] = nil end
    if not room or not room.members[src] then return end
    room.members[src] = nil
    local released = releaseAll(room, src)
    if next(room.members) == nil then
        if unsaved(room) then room.emptiedAt = os.time() else rooms[key] = nil end
        return
    end
    for i = 1, #released do broadcast(room, { kind = 'lock', field = released[i], holder = nil }) end
    broadcast(room, { kind = 'presence', viewers = stateOf(room).viewers })
end

---The room a caller has joined for a record, or nil.
---@param src integer
---@param payload table
---@return LiveRoom|nil room, string|nil key
local function joined(src, payload)
    local kind = type(payload.type) == 'string' and payload.type or nil
    local ref = util.limitedString(payload.ref, 16)
    if not kind or not ref then return nil, nil end
    local key = keyOf(kind, ref)
    local room = rooms[key]
    if not room or not room.members[src] then return nil, key end
    return room, key
end

---Opens a record for live viewing and answers with who else is on it.
live.join = access.open(function(src, payload, me)
    local kind = type(payload.type) == 'string' and payload.type or nil
    local ref = util.limitedString(payload.ref, 16)
    if not kind or not ref then return util.fail('mdt.recordNotAvailable', 'That record is not available') end
    local res = live.resolve(kind, src, me, ref)
    if not res or not res.view then return util.fail('mdt.recordNotAvailable', 'That record is not available') end

    local key = keyOf(kind, ref)
    local room = rooms[key]
    if not room then
        room = { kind = kind, ref = ref, members = {}, locks = {}, drafts = {}, texts = {} }
        rooms[key] = room
    end
    room.emptiedAt = nil
    for field, value in pairs(res.texts or {}) do
        if not room.texts[field] then
            local text = type(value) == 'string' and value or ''
            room.texts[field] = { text = text, saved = text, units = textop.units(text), rev = 0, savedRev = 0, history = {}, authors = {} }
        end
    end
    room.members[src] = {
        cid        = me.citizenid,
        name       = me.name,
        department = me.department.short or me.department.label or me.job,
    }
    seats[src] = seats[src] or {}
    seats[src][key] = true

    local state = stateOf(room)
    broadcast(room, { kind = 'presence', viewers = state.viewers }, src)

    local fields = {}
    for field in pairs(res.fields or {}) do fields[#fields + 1] = field end
    state.fields = fields
    state.canEdit = res.edit == true
    return util.ok(state)
end)

---Leaves a record.
live.leave = access.open(function(src, payload)
    local _, key = joined(src, payload)
    if key then vacate(key, src) end
    return util.ok({})
end)

---Claims a field for editing, or refreshes a claim already held.
live.lock = access.open(function(src, payload, me)
    local room, key = joined(src, payload)
    if not room or not key then return util.fail('mdt.recordNotAvailable', 'That record is not available') end

    local field = util.limitedString(payload.field, 24)
    local res = live.resolve(room.kind, src, me, room.ref)
    if not field or not res or not res.edit or not (res.fields or {})[field] then
        return util.fail('mdt.rankDoesNotAllow', 'Your rank does not allow that')
    end

    if room.texts[field] then return util.ok({ field = field, shared = true }) end

    local lock = room.locks[field]
    if current(lock) and lock.src ~= src then
        return util.fail('mdt.fieldBeingEdited', '{name} is editing that', { name = lock.name })
    end

    local fresh = not (lock and lock.src == src and current(lock))
    room.locks[field] = { src = src, cid = me.citizenid, name = me.name, at = os.time() }
    if fresh then
        room.drafts[field] = nil
        broadcast(room, { kind = 'lock', field = field, holder = { citizenid = me.citizenid, name = me.name } }, src)
    end
    return util.ok({ field = field })
end)

---Gives a field back without saving it.
live.unlock = access.open(function(src, payload)
    local room = joined(src, payload)
    local field = util.limitedString(payload.field, 24)
    if room and field and room.locks[field] and room.locks[field].src == src then
        room.locks[field] = nil
        room.drafts[field] = nil
        broadcast(room, { kind = 'lock', field = field, holder = nil }, src)
    end
    return util.ok({})
end)

---Relays the value a lock holder is typing to everyone else on the record.
live.draft = access.open(function(src, payload)
    local room = joined(src, payload)
    local field = util.limitedString(payload.field, 24)
    if not room or not field then return util.fail('mdt.recordNotAvailable', 'That record is not available') end

    local lock = room.locks[field]
    if not current(lock) or lock.src ~= src then
        return util.fail('mdt.fieldNotLocked', 'Start editing that field first')
    end

    local nowMs = GetGameTimer()
    if lastDraft[src] and nowMs - lastDraft[src] < DRAFT_GAP_MS then return util.ok({ throttled = true }) end
    if not util.encodedSize(payload.value, MAX_DRAFT_BYTES) then
        return util.fail('mdt.draftTooLarge', 'That is too long to share live')
    end

    lastDraft[src] = nowMs
    lock.at = os.time()
    room.drafts[field] = payload.value
    broadcast(room, { kind = 'draft', field = field, value = payload.value, citizenid = lock.cid }, src)
    return util.ok({})
end)

---Whether a source may send another edit this second.
---@param src integer
---@return boolean
local function underOpRate(src)
    local second = os.time()
    local rate = opRate[src]
    if not rate or rate.second ~= second then
        opRate[src] = { second = second, count = 1 }
        return true
    end
    rate.count = rate.count + 1
    return rate.count <= OPS_PER_SECOND
end

---Takes one edit to a shared text, rebases it over whatever landed since the sender's revision,
---applies it and sends the result to everyone on the record, the sender included.
live.op = access.open(function(src, payload, me)
    local room = joined(src, payload)
    local field = util.limitedString(payload.field, 24)
    local doc = room and field and room.texts[field]
    if not room or not field or not doc then return util.fail('mdt.recordNotAvailable', 'That record is not available') end

    local res = live.resolve(room.kind, src, me, room.ref)
    if not res or not res.edit or not (res.fields or {})[field] then
        return util.fail('mdt.rankDoesNotAllow', 'Your rank does not allow that')
    end
    if not underOpRate(src) then return util.fail('mdt.liveResync', 'Resync') end

    local rev = math.tointeger(tonumber(payload.rev))
    local op = textop.check(payload.op, MAX_INSERT_BYTES)
    if not rev or not op or rev > doc.rev or doc.rev - rev > HISTORY_KEPT then
        return util.fail('mdt.liveResync', 'Resync')
    end

    for r = rev + 1, doc.rev do
        op = doc.history[r] and textop.transform(op, doc.history[r])
        if not op then return util.fail('mdt.liveResync', 'Resync') end
    end

    local text = textop.apply(doc.text, op)
    if not text or #text > MAX_TEXT_BYTES then return util.fail('mdt.liveResync', 'Resync') end

    doc.text = text
    doc.units = textop.units(text)
    doc.rev = doc.rev + 1
    doc.history[doc.rev] = op
    doc.history[doc.rev - HISTORY_KEPT] = nil
    doc.authors[me.citizenid] = me.name
    if doc.text == doc.saved then
        doc.savedRev = doc.rev
        doc.authors = {}
    end

    broadcast(room, {
        kind = 'op', field = field, rev = doc.rev, op = op,
        citizenid = me.citizenid, name = me.name, id = util.limitedString(payload.id, 24),
    })
    return util.ok({ rev = doc.rev })
end)

---Relays where a caller's caret sits in a shared text, or that it left.
live.caret = access.open(function(src, payload, me)
    local room = joined(src, payload)
    local field = util.limitedString(payload.field, 24)
    if not room or not field or not room.texts[field] then return util.ok({}) end

    local nowMs = GetGameTimer()
    local pos = math.tointeger(tonumber(payload.pos))
    if pos and lastCaret[src] and nowMs - lastCaret[src] < CARET_GAP_MS then return util.ok({ throttled = true }) end
    lastCaret[src] = nowMs

    broadcast(room, { kind = 'caret', field = field, pos = pos, citizenid = me.citizenid, name = me.name }, src)
    return util.ok({})
end)

---Answers with a shared text as the server holds it, for a terminal that fell out of step.
live.sync = access.open(function(src, payload)
    local room = joined(src, payload)
    local field = util.limitedString(payload.field, 24)
    local doc = room and field and room.texts[field]
    if not doc then return util.fail('mdt.recordNotAvailable', 'That record is not available') end
    return util.ok({ text = doc.text, rev = doc.rev, dirty = doc.rev ~= doc.savedRev })
end)

---The shared text of a field and the revision it stands at, or nil when nobody has it open.
---@param kind string
---@param ref string
---@param field string
---@return string|nil text, integer|nil rev
function live.textOf(kind, ref, field)
    local room = rooms[keyOf(kind, ref)]
    local doc = room and room.texts[field]
    if not doc then return nil, nil end
    return doc.text, doc.rev
end

---The names of everyone but `exceptCid` who typed into a shared text since it was last saved.
---@param kind string
---@param ref string
---@param field string
---@param exceptCid string
---@return string[] names
function live.contributors(kind, ref, field, exceptCid)
    local room = rooms[keyOf(kind, ref)]
    local doc = room and room.texts[field]
    local names = {}
    for cid, name in pairs(doc and doc.authors or {}) do
        if cid ~= exceptCid then names[#names + 1] = name end
    end
    table.sort(names)
    return names
end

---The name of whoever else holds a field's lock, or nil when it is free or held by `src`.
---@param kind string
---@param ref string
---@param field string
---@param src integer
---@return string|nil holder
function live.lockedByOther(kind, ref, field, src)
    local room = rooms[keyOf(kind, ref)]
    local lock = room and room.locks[field]
    if current(lock) and lock.src ~= src then return lock.name end
    return nil
end

---Settles a shared text against what was just written: clean when it still stands at the
---revision that was saved, replaced for everyone when the record now holds something else.
---@param room LiveRoom
---@param field string
---@param stored { text: string, rev: integer|nil }
local function settleText(room, field, stored)
    local doc = room.texts[field]
    if not doc then return end
    if stored.rev and doc.rev ~= stored.rev then
        doc.savedRev = stored.rev
        return
    end
    doc.authors = {}
    doc.saved = stored.text
    if doc.text == stored.text then
        doc.savedRev = doc.rev
        return
    end
    doc.text = stored.text
    doc.units = textop.units(stored.text)
    doc.rev = doc.rev + 1
    doc.savedRev = doc.rev
    doc.history = {}
    broadcast(room, { kind = 'text', field = field, text = doc.text, rev = doc.rev })
end

---Announces that fields were saved, releasing the saver's locks on them.
---@param kind string
---@param ref string
---@param src integer
---@param fields string[]
---@param by string display name of the saver
---@param texts table<string, { text: string, rev: integer|nil }>|nil what each shared text field now holds
function live.saved(kind, ref, src, fields, by, texts)
    local room = rooms[keyOf(kind, ref)]
    if not room then return end
    local only = {}
    for i = 1, #fields do only[fields[i]] = true end
    releaseAll(room, src, only)
    for field, stored in pairs(texts or {}) do settleText(room, field, stored) end
    broadcast(room, { kind = 'saved', fields = fields, by = by })
end

---Closes a record for everyone viewing it, as when it is deleted.
---@param kind string
---@param ref string
function live.close(kind, ref)
    local key = keyOf(kind, ref)
    local room = rooms[key]
    if not room then return end
    broadcast(room, { kind = 'closed' })
    for src in pairs(room.members) do
        if seats[src] then seats[src][key] = nil end
    end
    rooms[key] = nil
end

---Re-resolves everyone on a record, removing whoever has lost access and telling them so.
---@param kind string
---@param ref string
function live.recheck(kind, ref)
    local key = keyOf(kind, ref)
    local room = rooms[key]
    if not room then return end
    local lost = {}
    for src in pairs(room.members) do
        local me = access.identity(src)
        local res = me and live.resolve(kind, src, me, ref)
        if not res or not res.view then lost[#lost + 1] = src end
    end
    for i = 1, #lost do
        util.pushMany(EVENT, { lost[i] }, { key = key, type = kind, ref = ref, kind = 'revoked' })
        vacate(key, lost[i])
    end
end

util.onCleanup(function(src)
    for key in pairs(seats[src] or {}) do vacate(key, src) end
    seats[src] = nil
    lastDraft[src] = nil
    lastCaret[src] = nil
    opRate[src] = nil
end)

---Releases locks whose holders stopped touching them, so a closed tab never pins a field.
CreateThread(function()
    while true do
        Wait(SWEEP_MS)
        local now = os.time()
        for key, room in pairs(rooms) do
            if room.emptiedAt and now - room.emptiedAt > UNSAVED_TTL then rooms[key] = nil end
        end
        for _, room in pairs(rooms) do
            for field, lock in pairs(room.locks) do
                if not current(lock) then
                    room.locks[field] = nil
                    room.drafts[field] = nil
                    broadcast(room, { kind = 'lock', field = field, holder = nil })
                end
            end
        end
    end
end)

return live
