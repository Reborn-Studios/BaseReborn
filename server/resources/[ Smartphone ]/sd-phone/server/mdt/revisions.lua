---@type table Shared server helpers (server.util): envelopes and string bounds.
local util   = require 'server.util'
---@type table MDT permissions (server.mdt.access): identity and the open wrapper.
local access = require 'server.mdt.access'
---@type table MDT persistence (server.mdt.store): the audit trail a restore writes to.
local store  = require 'server.mdt.store'
---@type table Live records (server.mdt.live): access resolution, field locks and the restore path.
local live   = require 'server.mdt.live'

---@type table Revisions module; the table returned at end of file. A field-by-field history of
---every amendment to shared paperwork, and the way back to an earlier value.
local revisions = {}

---@type integer Revisions returned for one record, newest first.
local HISTORY_LIMIT <const> = 100

---@type integer Longest value kept per side of a revision, in bytes.
local MAX_VALUE <const> = 60000

---Records one field's change. A value that did not change writes nothing.
---@param me table editor identity
---@param kind string
---@param ref string
---@param field string
---@param before string|nil
---@param after string|nil
function revisions.record(me, kind, ref, field, before, after)
    before = before or ''
    after = after or ''
    if before == after then return end
    MySQL.insert.await([[
        INSERT INTO phone_mdt_revisions
            (entity_type, entity_ref, field, before_value, after_value, editor_cid, editor_name, department, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ]], {
        kind, ref, field, before:sub(1, MAX_VALUE), after:sub(1, MAX_VALUE),
        me.citizenid, me.name, me.job, os.time(),
    })
end

---Drops the history of a record that no longer exists.
---@param kind string
---@param ref string
function revisions.forget(kind, ref)
    MySQL.update.await('DELETE FROM phone_mdt_revisions WHERE entity_type = ? AND entity_ref = ?', { kind, ref })
end

---A record's revisions, newest first, with whether the caller may restore them.
revisions.list = access.open(function(src, payload, me)
    local kind = type(payload.type) == 'string' and payload.type or nil
    local ref = util.limitedString(payload.ref, 16)
    local res = live.resolve(kind, src, me, ref)
    if not res or not res.view then return util.fail('mdt.recordNotAvailable', 'That record is not available') end

    local rows = MySQL.query.await([[
        SELECT id, field, before_value, after_value, editor_name, department, created_at FROM phone_mdt_revisions
        WHERE entity_type = ? AND entity_ref = ? ORDER BY created_at DESC, id DESC LIMIT ?
    ]], { kind, ref, HISTORY_LIMIT }) or {}

    local out = {}
    for i = 1, #rows do
        local dept = access.departmentFor(rows[i].department)
        out[i] = {
            id         = tonumber(rows[i].id),
            field      = rows[i].field,
            before     = rows[i].before_value or '',
            after      = rows[i].after_value or '',
            editor     = rows[i].editor_name,
            department = dept and (dept.short or dept.label) or rows[i].department,
            court      = dept ~= nil and dept.type == 'doj',
            createdAt  = tonumber(rows[i].created_at) or 0,
        }
    end
    return util.ok({ rows = out, canRestore = res.restore == true })
end)

---Puts a field back to the value it held before one revision, as a new revision of its own.
revisions.restore = access.open(function(src, payload, me)
    local id = math.floor(tonumber(payload.id) or 0)
    if id < 1 then return util.fail('mdt.revisionNotFound', 'That revision is not on file') end

    local row = MySQL.single.await(
        'SELECT entity_type, entity_ref, field, before_value FROM phone_mdt_revisions WHERE id = ? LIMIT 1', { id })
    if not row then return util.fail('mdt.revisionNotFound', 'That revision is not on file') end

    local res = live.resolve(row.entity_type, src, me, row.entity_ref)
    if not res or not res.restore then return util.fail('mdt.rankDoesNotAllow', 'Your rank does not allow that') end

    local holder = live.lockedByOther(row.entity_type, row.entity_ref, row.field, src)
    if holder then return util.fail('mdt.fieldBeingEdited', '{name} is editing that', { name = holder }) end

    local result = live.restore(row.entity_type, src, me, row.entity_ref, row.field, row.before_value or '')
    if result.success == true then
        store.audit(me, 'revisions.restore', row.entity_type, row.entity_ref, { field = row.field, revision = id })
    end
    return result
end)

return revisions
