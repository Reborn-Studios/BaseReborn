---@type table sd-phone config root (configs/config.lua); read for the authored-text cap.
local config = require 'configs.config'
---@type table Shared server helpers (server.util): envelopes, string caps, batched push.
local util   = require 'server.util'
---@type table MDT permissions (server.mdt.access): the read gate, the audited write wrapper and
---the caller's domain.
local access = require 'server.mdt.access'
---@type table[] Standing orders (configs/sops.lua): the set every department starts from.
local SOPS   = require 'configs.sops'

---@type table SOPs module; the table returned at end of file. The config file publishes to
---everybody; a department holding sops.manage lays its own changes over that, and those changes
---never reach another department.
local sops = {}

---@type table MDT limits (configs/mdt.lua).
local LIMITS = ((config.Mdt or {}).Limits or {})

---@type integer Longest standing order body a terminal may save.
local MAX_BODY = math.floor(tonumber(LIMITS.SopBody) or 12000)

---@type table<string, boolean> Terminals an order may be published to.
local TERMINALS = { leo = true, ems = true }

---@type string Client event telling a department's open terminals its orders changed.
local EVENT <const> = 'sd-phone:client:mdt:sops'

---@type table|nil Catalogue built once from the config, keyed by terminal.
local cache

---@type table<string, table[]> Stored overrides by department job, dropped on every write to it.
local stored = {}

---Builds the catalogue. An order with no code is skipped rather than shown blank, and one naming
---an unknown terminal is skipped rather than quietly published to everybody.
---@return table<string, table[]> byTerminal
local function load()
    if cache then return cache end

    local out = { leo = {}, ems = {} }
    local seen = {}

    for i = 1, #SOPS do
        local entry = SOPS[i]
        local code  = type(entry) == 'table' and type(entry.code) == 'string' and entry.code or nil
        local where = entry and entry.terminal

        if not code then
            print(('^3[sd-phone:mdt]^0 SOP entry %d has no code and was skipped'):format(i))
        elseif where ~= nil and not TERMINALS[where] then
            print(('^3[sd-phone:mdt]^0 SOP %s names unknown terminal %s and was skipped'):format(code, tostring(where)))
        elseif seen[code] then
            print(('^3[sd-phone:mdt]^0 SOP %s is listed twice; the first wins'):format(code))
        else
            seen[code] = true

            local jobs
            if type(entry.jobs) == 'table' then
                jobs = {}
                for n = 1, #entry.jobs do
                    if type(entry.jobs[n]) == 'string' then jobs[entry.jobs[n]] = true end
                end
            end

            local order = {
                code     = code,
                title    = type(entry.title) == 'string' and entry.title or code,
                category = type(entry.category) == 'string' and entry.category or 'General',
                summary  = type(entry.summary) == 'string' and entry.summary or '',
                revised  = type(entry.revised) == 'string' and entry.revised or '',
                body     = type(entry.body) == 'string' and entry.body or '',
                jobs     = jobs,
            }

            -- No terminal means both, which is how a joint order is published once.
            if where == nil or where == 'leo' then out.leo[#out.leo + 1] = order end
            if where == nil or where == 'ems' then out.ems[#out.ems + 1] = order end
        end
    end

    cache = out
    return cache
end

---The orders the config file publishes to one caller: their terminal's set, minus anything scoped
---to other departments.
---@param me table caller identity
---@return table[] rows
local function shippedFor(me)
    local rows = load()[access.domain(me) == 'ems' and 'ems' or 'leo'] or {}
    local out = {}
    for i = 1, #rows do
        local order = rows[i]
        if not order.jobs or order.jobs[me.job] then out[#out + 1] = order end
    end
    return out
end

---What one department has changed from its terminal. A table that does not exist yet reads as
---nothing, so the config file alone still publishes.
---@param department string department job
---@return table[] rows
local function overridesFor(department)
    if stored[department] then return stored[department] end
    local ok, rows = pcall(MySQL.query.await, [[
        SELECT `code`, `title`, `category`, `summary`, `revised`, `body`, `removed`
        FROM phone_mdt_sop_overrides WHERE `department` = ?
    ]], { department })
    stored[department] = (ok and type(rows) == 'table') and rows or {}
    return stored[department]
end

---The shape a terminal renders.
---@param order table
---@param custom boolean written by this department rather than shipped
---@param edited boolean a shipped order this department rewrote
---@return table sop
local function shapeOf(order, custom, edited)
    return {
        code     = order.code,
        title    = order.title,
        category = order.category,
        summary  = order.summary,
        revised  = order.revised,
        body     = order.body or '',
        custom   = custom,
        edited   = edited,
    }
end

---One caller's standing orders: what the config publishes to them with their own department's
---changes laid over it. Scoping is applied here rather than on the client, so an order restricted
---to one force is not merely hidden from another, it is never sent.
---@param me table caller identity
---@return table[] rows active orders, in config order with the department's own appended
---@return table[] removed shipped orders this department hid
---@return table<string, table> shipped the config's own rows by code, as this caller sees them
local function catalogFor(me)
    local base = shippedFor(me)
    local shipped, changes = {}, {}
    for i = 1, #base do shipped[base[i].code] = base[i] end

    local mine = overridesFor(me.job)
    for i = 1, #mine do changes[mine[i].code] = mine[i] end

    local rows, removed = {}, {}
    for i = 1, #base do
        local change = changes[base[i].code]
        if not change then
            rows[#rows + 1] = shapeOf(base[i], false, false)
        elseif util.truthy(change.removed) then
            removed[#removed + 1] = shapeOf(base[i], false, false)
        else
            rows[#rows + 1] = shapeOf(change, false, true)
        end
    end
    for i = 1, #mine do
        if not shipped[mine[i].code] and not util.truthy(mine[i].removed) then
            rows[#rows + 1] = shapeOf(mine[i], true, false)
        end
    end

    return rows, removed, shipped
end

---Drops one department's cached changes and tells its open terminals to read again.
---@param department string department job
local function changed(department)
    stored[department] = nil
    util.pushMany(EVENT, access.audienceOf(department), {})
end

---The standing orders one caller may read. Whoever may rewrite them also gets the shipped orders
---their department has hidden, so they can be brought back.
sops.list = access.gated('sops.view', function(src, _, me)
    local rows, removed = catalogFor(me)
    local manage = access.can(src, 'sops.manage')
    return util.ok({ rows = rows, removed = manage and removed or nil, canManage = manage })
end)

---Writes one of the caller's own department's standing orders: a new one, or its own version of a
---shipped one. Another department reading the same code is never affected.
sops.save = access.audited('sops.manage', function(_, payload, me)
    local code = util.limitedString(payload.code, 16)
    if not code then return util.fail('mdt.codeRequired', 'A code is required') end
    -- limitedString trims an over-long value to fit, and a trimmed code could land on a different order.
    if #util.trim(payload.code) > 16 then return util.fail('mdt.codeTooLong', 'A code can be at most 16 characters') end

    local title = util.limitedString(payload.title, 160)
    if not title then return util.fail('mdt.titleRequired', 'A title is required') end

    local category = util.limitedString(payload.category, 40) or 'General'
    local summary  = util.limitedString(payload.summary, 255) or ''
    local revised  = util.limitedString(payload.revised, 60) or ''
    if type(payload.body) == 'string' and #payload.body > MAX_BODY then
        return util.fail('mdt.sopBodyTooLong', 'That order is too long. Keep it under {max} characters.', { max = MAX_BODY })
    end
    local body = util.limitedString(payload.body, MAX_BODY) or ''

    MySQL.query.await([[
        INSERT INTO phone_mdt_sop_overrides
            (`department`, `code`, `title`, `category`, `summary`, `revised`, `body`, `removed`, `updated_name`, `updated_at`)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
        ON DUPLICATE KEY UPDATE
            `title` = VALUES(`title`), `category` = VALUES(`category`), `summary` = VALUES(`summary`),
            `revised` = VALUES(`revised`), `body` = VALUES(`body`), `removed` = 0,
            `updated_name` = VALUES(`updated_name`), `updated_at` = VALUES(`updated_at`)
    ]], { me.job, code, title, category, summary, revised, body, me.name, os.time() })

    changed(me.job)
    return util.ok({ code = code }),
        { entityType = 'sop', entityId = code, details = { title = title, department = me.job } }
end)

---Takes an order off the caller's department's terminal. A shipped one is hidden rather than
---deleted, so it can be brought back; one the department wrote itself is simply removed.
sops.remove = access.audited('sops.manage', function(_, payload, me)
    local code = util.limitedString(payload.code, 16)
    if not code then return util.fail('mdt.sopNoLongerExists', 'That order no longer exists') end

    local rows, _, shipped = catalogFor(me)
    local current
    for i = 1, #rows do
        if rows[i].code == code then current = rows[i] break end
    end
    if not current then return util.fail('mdt.sopNoLongerExists', 'That order no longer exists') end

    if shipped[code] then
        MySQL.query.await([[
            INSERT INTO phone_mdt_sop_overrides
                (`department`, `code`, `title`, `category`, `summary`, `revised`, `body`, `removed`, `updated_name`, `updated_at`)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            ON DUPLICATE KEY UPDATE `removed` = 1,
                `updated_name` = VALUES(`updated_name`), `updated_at` = VALUES(`updated_at`)
        ]], { me.job, code, current.title, current.category, current.summary, current.revised, current.body, me.name, os.time() })
    else
        MySQL.update.await('DELETE FROM phone_mdt_sop_overrides WHERE `department` = ? AND `code` = ?', { me.job, code })
    end

    changed(me.job)
    return util.ok({ code = code }), { entityType = 'sop', entityId = code, details = { title = current.title, department = me.job } }
end)

---Puts a shipped order back to what the config file says for the caller's department, whether it
---was rewritten or hidden.
sops.reset = access.audited('sops.manage', function(_, payload, me)
    local code = util.limitedString(payload.code, 16)
    local _, _, shipped = catalogFor(me)
    if not code or not shipped[code] then
        return util.fail('mdt.sopNoDefault', 'That order has no default to go back to')
    end

    MySQL.update.await('DELETE FROM phone_mdt_sop_overrides WHERE `department` = ? AND `code` = ?', { me.job, code })
    changed(me.job)
    return util.ok({ code = code }), { entityType = 'sop', entityId = code, details = { department = me.job } }
end)

return sops
