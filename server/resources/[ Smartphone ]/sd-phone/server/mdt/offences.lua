---@type table sd-phone config root (configs/config.lua); read for the charge-line cap.
local config = require 'configs.config'
---@type table Shared server helpers (server.util): envelopes, clamping, string caps.
local util   = require 'server.util'
---@type table MDT permissions (server.mdt.access): the read gate.
local access = require 'server.mdt.access'
---@type table[] The penal code (configs/penalcode.lua): the catalogue every server starts from.
local PENAL  = require 'configs.penalcode'

---@type table Offences module; the table returned at end of file. The penal code, and the single
---place a sentence or a fine is ever calculated.
local offences = {}

---@type table<string, boolean> Valid charge classes; mirrors the ChargeClass union.
local CLASSES = { felony = true, misdemeanor = true, infraction = true }

---@type integer Highest count one charge line may carry.
local MAX_COUNT = 99

---@type integer Charge lines one record may carry.
local MAX_LINES = math.floor(tonumber(((config.Mdt or {}).Limits or {}).Charges) or 40)

---@type table<string, integer> Class sort order: felonies read first, then down.
local CLASS_ORDER = { felony = 1, misdemeanor = 2, infraction = 3 }

---@type integer Highest jail term, in months, one charge may be set to from the terminal.
local MAX_MONTHS = 9999

---@type integer Highest fine one charge may be set to from the terminal.
local MAX_FINE = 100000000

---@type string Client event telling every open terminal the penal code changed.
local EVENT <const> = 'sd-phone:client:mdt:offences'

---@type table|nil Catalog: { rows = active Offence[], removed = hidden Offence[], byCode = ... }.
---Built from the config file with the terminal's overrides laid over it, and dropped on every write.
local cache

---@type table<string, table>|nil The config file's own rows by code, before any override.
local shipped

---Sorts offences felonies first, then by code.
---@param rows table[]
local function sortRows(rows)
    table.sort(rows, function(a, b)
        local ca, cb = CLASS_ORDER[a.class] or 9, CLASS_ORDER[b.class] or 9
        if ca ~= cb then return ca < cb end
        return a.code < b.code
    end)
end

---The config file's rows by code. A malformed entry is skipped with a console line rather than
---taken on trust: a charge with no class would otherwise sentence at zero months forever.
---@return table<string, table> byCode
local function shippedRows()
    if shipped then return shipped end

    local byCode = {}
    for i = 1, #PENAL do
        local entry = PENAL[i]
        local code  = type(entry) == 'table' and type(entry.code) == 'string' and entry.code or nil
        if not code or not CLASSES[entry.class] then
            print(('^3[sd-phone:mdt]^0 penal code entry %d is malformed and was skipped'):format(i))
        elseif byCode[code] then
            print(('^3[sd-phone:mdt]^0 penal code %s is listed twice; the first wins'):format(code))
        else
            byCode[code] = {
                code        = code,
                label       = type(entry.label) == 'string' and entry.label or code,
                class       = entry.class,
                months      = math.max(0, math.floor(tonumber(entry.months) or 0)),
                fine        = math.max(0, math.floor(tonumber(entry.fine) or 0)),
                description = type(entry.description) == 'string' and entry.description or '',
            }
        end
    end

    shipped = byCode
    return shipped
end

---Every override the terminal has stored. A table that does not exist yet reads as none, so the
---config file alone still sentences.
---@return table[] rows
local function overrideRows()
    local ok, rows = pcall(MySQL.query.await,
        'SELECT `code`, `label`, `class`, `months`, `fine`, `description`, `removed` FROM phone_mdt_penal_overrides')
    if ok and type(rows) == 'table' then return rows end
    return {}
end

---Builds the catalog: the config file, with the terminal's overrides laid over it. A retuned charge
---carries `edited` and the figures it shipped with, a server's own charge carries `custom`, and a
---hidden one leaves the list but stays resolvable, so re-saving an old report keeps a charge that
---has since been retired.
---@return table catalog { rows: table[], removed: table[], byCode: table<string, table> }
local function load()
    if cache then return cache end

    local base = shippedRows()
    local rows, removed, byCode = {}, {}, {}
    local overridden = {}

    local stored = overrideRows()
    for i = 1, #stored do
        local o = stored[i]
        if type(o.code) == 'string' and CLASSES[o.class] then
            overridden[o.code] = true
            local origin = base[o.code]
            local row = {
                code          = o.code,
                label         = o.label,
                class         = o.class,
                months        = math.max(0, math.floor(tonumber(o.months) or 0)),
                fine          = math.max(0, math.floor(tonumber(o.fine) or 0)),
                description   = o.description or '',
                custom        = origin == nil,
                edited        = origin ~= nil,
                defaultMonths = origin and origin.months or nil,
                defaultFine   = origin and origin.fine or nil,
            }
            byCode[o.code] = row
            if util.truthy(o.removed) then
                removed[#removed + 1] = row
            else
                rows[#rows + 1] = row
            end
        end
    end

    for code, origin in pairs(base) do
        if not overridden[code] then
            local row = {
                code = origin.code, label = origin.label, class = origin.class,
                months = origin.months, fine = origin.fine, description = origin.description,
                custom = false, edited = false,
            }
            rows[#rows + 1] = row
            byCode[code] = row
        end
    end

    sortRows(rows)
    sortRows(removed)

    cache = { rows = rows, removed = removed, byCode = byCode }
    return cache
end

---Drops the cached catalog and tells every open terminal to read it again.
local function changed()
    cache = nil
    util.pushMany(EVENT, access.audience(), {})
end

---Every offence, felonies first then by code.
---@return table[] rows
function offences.all()
    return load().rows
end

---One offence by code, or nil when it is not in the catalog.
---@param code any
---@return table|nil offence
function offences.byCode(code)
    if type(code) ~= 'string' then return nil end
    return load().byCode[code]
end

---Resolves charge lines against the catalog and totals them. Months and fine are ALWAYS looked up
---here, never taken from the caller, so every screen quotes the same sentence. Line figures stay
---per unit; the totals are what multiply by count.
---@param charges any list of { code: string, count?: number, citizenid?: string }
---@return table[] lines resolved lines { code, label, class, citizenid, count, months, fine }
---@return integer months total months across every line
---@return integer fine total fine across every line
function offences.totalFor(charges)
    local lines, months, fine = {}, 0, 0
    if type(charges) ~= 'table' then return lines, 0, 0 end

    local byCode = load().byCode
    for i = 1, #charges do
        local c = charges[i]
        if type(c) == 'table' and #lines < MAX_LINES then
            local offence = byCode[type(c.code) == 'string' and c.code or '']
            if offence then
                local count = math.floor(tonumber(c.count) or 1)
                if count < 1 then count = 1 end
                if count > MAX_COUNT then count = MAX_COUNT end

                lines[#lines + 1] = {
                    code      = offence.code,
                    label     = offence.label,
                    class     = offence.class,
                    citizenid = (type(c.citizenid) == 'string' and c.citizenid ~= '') and c.citizenid or nil,
                    count     = count,
                    months    = offence.months,
                    fine      = offence.fine,
                }
                months = months + (offence.months * count)
                fine   = fine + (offence.fine * count)
            end
        end
    end

    return lines, months, fine
end

---Class counters for a resolved charge list, as a warrant row stores them.
---@param lines table[] resolved charge lines
---@return integer felonies
---@return integer misdemeanors
---@return integer infractions
function offences.countByClass(lines)
    local felonies, misdemeanors, infractions = 0, 0, 0
    for i = 1, #lines do
        local line = lines[i]
        if line.class == 'felony' then felonies = felonies + line.count
        elseif line.class == 'misdemeanor' then misdemeanors = misdemeanors + line.count
        else infractions = infractions + line.count end
    end
    return felonies, misdemeanors, infractions
end

---The whole penal code. Read by the charge picker, every report total and the jail quote. Whoever
---may retune it also gets the charges the server has hidden, so they can be brought back.
offences.list = access.gated('offences.view', function(src)
    local manage = access.can(src, 'offences.manage')
    return util.ok({
        rows      = offences.all(),
        removed   = manage and load().removed or nil,
        canManage = manage,
    })
end)

---Creates a charge of the server's own, or retunes one the config file ships. Only paperwork filed
---afterwards is affected: a report keeps its own copy of every charge it was filed with.
offences.save = access.audited('offences.manage', function(_, payload, me)
    local code = util.limitedString(payload.code, 16)
    if not code then return util.fail('mdt.codeRequired', 'A code is required') end
    -- limitedString trims an over-long value to fit, and a trimmed code could land on a different charge.
    if #util.trim(payload.code) > 16 then return util.fail('mdt.codeTooLong', 'A code can be at most 16 characters') end

    local label = util.limitedString(payload.label, 120)
    if not label then return util.fail('mdt.titleRequired', 'A title is required') end

    local class = type(payload.class) == 'string' and payload.class or ''
    if not CLASSES[class] then return util.fail('mdt.pickValidClass', 'Pick a valid charge class') end

    local months = math.floor(tonumber(payload.months) or -1)
    local fine   = math.floor(tonumber(payload.fine) or -1)
    if months < 0 or months > MAX_MONTHS then
        return util.fail('mdt.monthsOutOfRange', 'Jail time must be between 0 and {max} months', { max = MAX_MONTHS })
    end
    if fine < 0 or fine > MAX_FINE then
        return util.fail('mdt.fineOutOfRange', 'The fine must be between 0 and {max}', { max = MAX_FINE })
    end

    local description = util.limitedString(payload.description, 255) or ''

    MySQL.query.await([[
        INSERT INTO phone_mdt_penal_overrides
            (`code`, `label`, `class`, `months`, `fine`, `description`, `removed`, `updated_name`, `updated_at`)
        VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
        ON DUPLICATE KEY UPDATE
            `label` = VALUES(`label`), `class` = VALUES(`class`), `months` = VALUES(`months`),
            `fine` = VALUES(`fine`), `description` = VALUES(`description`), `removed` = 0,
            `updated_name` = VALUES(`updated_name`), `updated_at` = VALUES(`updated_at`)
    ]], { code, label, class, months, fine, description, me.name, os.time() })

    changed()
    return util.ok({ offence = offences.byCode(code) }),
        { entityType = 'offence', entityId = code, details = { label = label, months = months, fine = fine } }
end)

---Takes a charge out of the penal code. One the config file ships is hidden rather than deleted,
---so it can be brought back; one the server added itself is simply removed.
offences.remove = access.audited('offences.manage', function(_, payload, me)
    local code = util.limitedString(payload.code, 16)
    local current = code and offences.byCode(code)
    if not code or not current then return util.fail('mdt.offenceNoLongerExists', 'That charge no longer exists') end

    if shippedRows()[code] then
        MySQL.query.await([[
            INSERT INTO phone_mdt_penal_overrides
                (`code`, `label`, `class`, `months`, `fine`, `description`, `removed`, `updated_name`, `updated_at`)
            VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
            ON DUPLICATE KEY UPDATE `removed` = 1,
                `updated_name` = VALUES(`updated_name`), `updated_at` = VALUES(`updated_at`)
        ]], { code, current.label, current.class, current.months, current.fine, current.description, me.name, os.time() })
    else
        MySQL.update.await('DELETE FROM phone_mdt_penal_overrides WHERE `code` = ?', { code })
    end

    changed()
    return util.ok({ code = code }), { entityType = 'offence', entityId = code, details = { label = current.label } }
end)

---Puts a shipped charge back to what the config file says, whether it was retuned or hidden.
offences.reset = access.audited('offences.manage', function(_, payload)
    local code = util.limitedString(payload.code, 16)
    if not code or not shippedRows()[code] then
        return util.fail('mdt.offenceNoDefault', 'That charge has no default to go back to')
    end

    MySQL.update.await('DELETE FROM phone_mdt_penal_overrides WHERE `code` = ?', { code })
    changed()
    return util.ok({ offence = offences.byCode(code) }), { entityType = 'offence', entityId = code }
end)

return offences
