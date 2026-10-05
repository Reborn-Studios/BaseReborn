---@type table Shared server helpers (server.util): envelopes and string bounds.
local util   = require 'server.util'
---@type table MDT permissions (server.mdt.access): identity, departments and the audited wrapper.
local access = require 'server.mdt.access'
---@type table Live records (server.mdt.live): record access resolution and the revoke recheck.
local live   = require 'server.mdt.live'

---@type table Shares module; the table returned at end of file. Police paperwork handed to a
---court department, view-only or editable, until the police side takes it back.
local shares = {}

---@type table<string, boolean> Record kinds a share can name.
local KINDS <const> = { report = true, case = true, warrant = true }

---@type table<string, boolean> Access levels a share can grant.
local LEVELS <const> = { view = true, edit = true }

---@type string Client event telling a court terminal its shared paperwork changed.
local EVENT <const> = 'sd-phone:client:mdt:shares'

---Tells every online member of a court department that a share to them was made, changed or
---taken back, so an open list or record repaints without being reopened.
---@param department string court department job
---@param kind string
---@param ref string
---@param level 'view'|'edit'|nil nil once revoked
local function announce(department, kind, ref, level)
    util.pushMany(EVENT, access.audienceOf(department), { type = kind, ref = ref, access = level })
end

---The court departments a record can be shared with, in config order.
---@return table[] targets { job, label, short, bench }
local function targets()
    local out = {}
    for _, dept in ipairs(access.departments()) do
        if dept.type == 'doj' then
            out[#out + 1] = { job = dept.job, label = dept.label, short = dept.short, bench = dept.bench == true }
        end
    end
    return out
end

---Whether a job names a court department.
---@param job string|nil
---@return boolean
local function isCourtJob(job)
    local dept = job and access.departmentFor(job)
    return dept ~= nil and dept.type == 'doj'
end

---The access a court caller's department holds on a record, or nil when nothing is shared.
---@param me table caller identity
---@param kind string
---@param ref string
---@return 'view'|'edit'|nil level
function shares.accessFor(me, kind, ref)
    local level = MySQL.scalar.await([[
        SELECT access FROM phone_mdt_shares
        WHERE entity_type = ? AND entity_ref = ? AND department = ? AND revoked_at IS NULL LIMIT 1
    ]], { kind, ref, me.job })
    if level == 'edit' or level == 'view' then return level end
    return nil
end

---SQL fragment admitting only records shared with the caller's department, against a ref column.
---@param me table caller identity
---@param kind string
---@param refColumn string qualified column holding the record ref
---@return string clause, any[] args
function shares.clause(me, kind, refColumn)
    return ([[EXISTS (
        SELECT 1 FROM phone_mdt_shares s
        WHERE s.entity_type = ? AND s.entity_ref = %s AND s.department = ? AND s.revoked_at IS NULL
    )]]):format(refColumn), { kind, me.job }
end

---The access level for each of a set of refs, for annotating a court list in one query.
---@param me table caller identity
---@param kind string
---@param refs string[]
---@return table<string, string> levels
function shares.levelsFor(me, kind, refs)
    local out = {}
    if #refs == 0 then return out end
    local marks, params = {}, { kind, me.job }
    for i = 1, #refs do
        marks[i] = '?'
        params[#params + 1] = refs[i]
    end
    local rows = MySQL.query.await(([[
        SELECT entity_ref, access FROM phone_mdt_shares
        WHERE entity_type = ? AND department = ? AND revoked_at IS NULL AND entity_ref IN (%s)
    ]]):format(table.concat(marks, ',')), params) or {}
    for i = 1, #rows do out[rows[i].entity_ref] = rows[i].access end
    return out
end

---Every active share on a record, for the owning department's share sheet.
---@param kind string
---@param ref string
---@return table[] rows
local function activeShares(kind, ref)
    local rows = MySQL.query.await([[
        SELECT department, access, shared_name, created_at FROM phone_mdt_shares
        WHERE entity_type = ? AND entity_ref = ? AND revoked_at IS NULL ORDER BY created_at ASC
    ]], { kind, ref }) or {}
    local out = {}
    for i = 1, #rows do
        local dept = access.departmentFor(rows[i].department)
        out[i] = {
            department = rows[i].department,
            label      = dept and dept.label or rows[i].department,
            access     = rows[i].access,
            sharedBy   = rows[i].shared_name,
            createdAt  = tonumber(rows[i].created_at) or 0,
        }
    end
    return out
end

---Resolves a share request's record, refusing anyone who does not own it.
---@param src integer
---@param payload table
---@param me table
---@return string|nil kind, string|nil ref, table|nil refusal
local function owned(src, payload, me)
    local kind = type(payload.type) == 'string' and KINDS[payload.type] and payload.type or nil
    local ref = util.limitedString(payload.ref, 16)
    if not kind or not ref then return nil, nil, util.fail('mdt.recordNotAvailable', 'That record is not available') end
    local res = live.resolve(kind, src, me, ref)
    if not res or not res.view then return nil, nil, util.fail('mdt.recordNotAvailable', 'That record is not available') end
    if not res.owner then return nil, nil, util.fail('mdt.onlyOwnersShare', 'Only the department that owns this can share it') end
    return kind, ref, nil
end

---The court departments a record can go to and where it has already gone.
shares.list = access.gated('shares.create', function(src, payload, me)
    local kind, ref, refusal = owned(src, payload, me)
    if not kind or not ref then return refusal end
    return util.ok({
        targets   = targets(),
        shares    = activeShares(kind, ref),
        canRevoke = access.can(src, 'shares.revoke'),
    })
end)

---Shares a record with a court department, or changes the access an existing share grants.
shares.create = access.audited('shares.create', function(src, payload, me)
    local kind, ref, refusal = owned(src, payload, me)
    if not kind or not ref then return refusal end

    local department = util.limitedString(payload.department, 64)
    if not isCourtJob(department) then return util.fail('mdt.pickCourtDepartment', 'Pick a court department') end

    local level = type(payload.access) == 'string' and LEVELS[payload.access] and payload.access or 'view'
    local now = os.time()
    MySQL.query.await([[
        INSERT INTO phone_mdt_shares (entity_type, entity_ref, department, access, shared_cid, shared_name, created_at, revoked_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NULL)
        ON DUPLICATE KEY UPDATE access = VALUES(access), shared_cid = VALUES(shared_cid),
            shared_name = VALUES(shared_name), created_at = VALUES(created_at), revoked_at = NULL
    ]], { kind, ref, department, level, me.citizenid, me.name, now })

    live.recheck(kind, ref)
    announce(department, kind, ref, level)

    return util.ok({ shares = activeShares(kind, ref) }),
        { entityType = kind, entityId = ref, details = { department = department, access = level } }
end)

---Takes a record back from a court department and removes anyone on it who has lost access.
shares.revoke = access.audited('shares.revoke', function(src, payload, me)
    local kind, ref, refusal = owned(src, payload, me)
    if not kind or not ref then return refusal end

    local department = util.limitedString(payload.department, 64)
    if not department then return util.fail('mdt.pickCourtDepartment', 'Pick a court department') end

    MySQL.update.await([[
        UPDATE phone_mdt_shares SET revoked_at = ?
        WHERE entity_type = ? AND entity_ref = ? AND department = ? AND revoked_at IS NULL
    ]], { os.time(), kind, ref, department })

    live.recheck(kind, ref)
    announce(department, kind, ref, nil)

    return util.ok({ shares = activeShares(kind, ref) }),
        { entityType = kind, entityId = ref, details = { department = department } }
end)

---Drops every share on a record that no longer exists, telling the courts that still held it.
---@param kind string
---@param ref string
function shares.forget(kind, ref)
    local held = MySQL.query.await([[
        SELECT department FROM phone_mdt_shares
        WHERE entity_type = ? AND entity_ref = ? AND revoked_at IS NULL
    ]], { kind, ref }) or {}
    MySQL.update.await('DELETE FROM phone_mdt_shares WHERE entity_type = ? AND entity_ref = ?', { kind, ref })
    for i = 1, #held do announce(held[i].department, kind, ref, nil) end
end

return shares
