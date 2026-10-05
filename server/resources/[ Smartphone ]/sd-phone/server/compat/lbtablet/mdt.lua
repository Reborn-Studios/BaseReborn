---@type table Shared helpers for the lb-tablet compatibility shim.
local shim   = require 'server.compat.lbtablet.shared'
---@type table Native SD MDT API. All guarded reads/writes go through this module.
local public  = require 'server.mdt.public'
---@type table MDT profiles.
local store   = require 'server.mdt.store'
---@type table Player bridge.
local player  = require 'bridge.server.player'
---@type table MDT access and departments.
local access  = require 'server.mdt.access'
---@type table MDT live callsign roster.
local dispatch = require 'server.mdt.dispatch'

---@type table MDT compatibility module.
local compat = {}

local function refusal(name, message)
    shim.warnOnce(name, ('%s (called by %s)'):format(message, GetInvokingResource() or 'unknown'))
    return false
end

local function idOf(value)
    if type(value) == 'table' then
        value = value.id or value.identifier or value.citizenid or value.serialNumber
    end
    if type(value) ~= 'string' and type(value) ~= 'number' then return nil end
    local text = tostring(value)
    return text ~= '' and text or nil
end

local function each(value, fn)
    if type(value) ~= 'table' then
        if value ~= nil then fn(value) end
        return
    end
    for i = 1, #value do fn(value[i]) end
end

local function list(value)
    if type(value) == 'table' and type(value.added) == 'table' then return value.added end
    if type(value) == 'table' then return value end
    return {}
end

local function department(name)
    return public.department(name)
end

local function profileFor(mdtName, target)
    local dept = department(mdtName)
    if not dept then return nil end

    local cid = idOf(target)
    if type(target) == 'number' then cid = player.getIdentifier(target) end
    if not cid then return nil end

    local profile = store.profile(cid)
    if profile and profile.department == dept.job then return profile end

    local src = public.sourceOf(target)
    if src then
        local account = public.account(src)
        if account and account.department and account.department.job == dept.job then
            return store.profile(account.citizenid) or account
        end
    end
    return nil
end

local function accountShape(profile)
    if not profile then return nil end
    return {
        id      = profile.citizenid,
        name    = profile.name or profile.citizenid,
        avatar  = profile.avatar,
        callsign = profile.callsign,
        rank    = profile.rank or '',
    }
end

local function targetSource(actor)
    return public.sourceOf(actor)
end

local function evidenceOf(gallery)
    local out = {}
    each(gallery, function(item)
        local url = type(item) == 'table' and (item.attachment or item.url) or item
        if type(url) == 'string' and url ~= '' then
            out[#out + 1] = { url = url, label = type(item) == 'table' and (item.label or '') or '' }
        end
    end)
    return out
end

local function involvedOf(items, role, out)
    each(list(items), function(item)
        local cid = idOf(item)
        if cid then out[#out + 1] = { citizenid = cid, role = role } end
    end)
end

local function mapReport(report, medical)
    if not report then return nil end
    local out = {
        id          = tonumber(report.id) or report.ref,
        ref         = report.ref,
        title       = report.title,
        type        = report.type,
        description = report.body,
        created     = (tonumber(report.createdAt) or 0) * 1000,
        lastUpdated = (tonumber(report.updatedAt) or 0) * 1000,
        createdBy   = report.authorCid,
        author      = report.author,
        gallery     = {},
        tags        = {},
    }

    for i, item in ipairs(report.evidence or {}) do
        out.gallery[i] = { attachment = item.url, label = item.label }
    end

    if medical then
        out.patient = nil
        out.doctorsInvolved = {}
        out.injuries = report.body
        for _, item in ipairs(report.involved or {}) do
            if item.role == 'patient' and not out.patient then out.patient = item.citizenid end
            if item.role == 'responder' then
                out.doctorsInvolved[#out.doctorsInvolved + 1] = { id = item.citizenid, name = item.name }
            end
        end
    else
        out.involved = {}
        out.weaponsInvolved = {}
        for _, item in ipairs(report.involved or {}) do
            local involvement = item.role == 'suspect' and 'suspect' or 'civilian'
            out.involved[#out.involved + 1] = {
                involved = item.citizenid,
                involvement = involvement,
                name = item.name,
            }
        end
    end
    return out
end

local function mapCase(caseFile)
    if not caseFile then return nil end
    local out = {
        id          = tonumber(caseFile.id) or caseFile.ref,
        ref         = caseFile.ref,
        title       = caseFile.title,
        description = caseFile.summary,
        createdBy   = caseFile.createdBy,
        created     = (tonumber(caseFile.createdAt) or 0) * 1000,
        lastUpdated = (tonumber(caseFile.updatedAt) or 0) * 1000,
        involved    = {},
        evidence    = {},
        tags        = {},
        reports     = {},
        criminalsInvolved = {},
        vehicleModels = {},
        weaponsInvolved = {},
    }
    for _, officer in ipairs(caseFile.officers or {}) do
        out.involved[#out.involved + 1] = {
            involved = officer.citizenid,
            involvement = 'officer',
            name = officer.name,
        }
    end
    for i, item in ipairs(caseFile.evidence or {}) do
        out.evidence[i] = { attachment = item.url, label = item.label }
    end
    for i, report in ipairs(caseFile.reports or {}) do
        out.reports[i] = { id = report.id or report.ref, label = report.title }
    end
    return out
end

local function mapWarrant(warrant)
    if not warrant then return nil end
    return {
        id          = tonumber(warrant.id) or warrant.ref,
        ref         = warrant.ref,
        title       = 'Warrant ' .. tostring(warrant.ref or ''),
        description = table.concat((function()
            local lines = {}
            for _, charge in ipairs(warrant.charges or {}) do
                lines[#lines + 1] = charge.label or charge.code or ''
            end
            return lines
        end)(), ', '),
        type        = 'warrant',
        status      = warrant.active and 'active' or 'closed',
        priority    = 'normal',
        createdBy   = warrant.issuedCid,
        timestamp   = (tonumber(warrant.issuedAt) or 0) * 1000,
        lastUpdated = (tonumber(warrant.expiresAt) or 0) * 1000,
        author      = warrant.officer,
        target      = {
            id = warrant.citizenid,
            type = 'profile',
            name = warrant.subject,
        },
        gallery = {},
        tags = {},
        reports = warrant.reportRef and { { id = warrant.reportRef, label = warrant.reportRef } } or {},
    }
end

local function actorForCreator(creator)
    local src = targetSource(creator)
    if not src then return nil end
    return src
end

local function reportPayload(data, medical)
    data = type(data) == 'table' and data or {}
    local fields = data.fields or {}
    local involved = {}

    if medical then
        involvedOf(fields.target and { fields.target } or data.patient and { data.patient } or nil, 'patient', involved)
        involvedOf(fields.doctors or data.doctors, 'responder', involved)
        return {
            title    = data.title,
            type     = fields.type or data.type,
            body     = fields.description or data.description or fields.injuries_conditions or data.injuries or '',
            evidence = evidenceOf(fields.gallery or data.gallery),
            involved = involved,
        }
    end

    -- SD intentionally stores only suspect/victim/witness roles and has no report-level weapon
    -- relation. Officers, weapons and tags therefore cannot be represented without changing the
    -- native MDT schema; refuse rather than silently dropping those legacy fields.
    if #list(fields.officers or data.officers) > 0
        or #list(fields.weapons or data.weapons) > 0
        or #list(data.tags or fields.tags) > 0 then
        return nil, 'police report contains officers, weapons or tags that SD reports do not store'
    end

    involvedOf(fields.suspects or data.suspects, 'suspect', involved)
    involvedOf(fields.civilians or data.civilians, 'victim', involved)
    return {
        title    = data.title,
        type     = fields.type or data.type,
        body     = fields.description or data.description or '',
        evidence = evidenceOf(fields.gallery or data.gallery),
        involved = involved,
    }
end

local function saveLegacyReport(mdtName, tabId, creator, data, medical)
    if tabId ~= 'reports' then return refusal('CreateMDTReport.' .. tabId, 'only the reports tab maps to SD paperwork') end
    local payload, why = reportPayload(data, medical)
    if not payload then return refusal('CreateMDTReport.fields', why) end
    local src = actorForCreator(creator)
    if not src then return refusal('CreateMDTReport.creator', 'creator must be an online SD MDT employee') end
    local report, message = public.saveReport(src, payload)
    if not report then
        shim.warnOnce('CreateMDTReport.refused', ('CreateMDTReport was refused: %s'):format(message or 'unknown reason'))
        return false
    end
    return tonumber(report.ref and report.ref:match('(%d+)$')) or report.ref
end

local function updateLegacyReport(mdtName, tabId, creator, data, medical)
    if type(data) ~= 'table' or not data.id then return refusal('UpdateMDTReport.id', 'UpdateMDTReport needs a report id') end
    local payload, why = reportPayload(data, medical)
    if not payload then return refusal('UpdateMDTReport.fields', why) end
    payload.ref = tostring(data.id)
    local src = actorForCreator(creator)
    if not src then return refusal('UpdateMDTReport.creator', 'creator must be an online SD MDT employee') end
    local report, message = public.saveReport(src, payload)
    if not report then
        shim.warnOnce('UpdateMDTReport.refused', ('UpdateMDTReport was refused: %s'):format(message or 'unknown reason'))
        return false
    end
    return tonumber(report.ref and report.ref:match('(%d+)$')) or report.ref
end

-- LB shared MDT metadata. SD exposes native department metadata separately; this is only the
-- minimum LB-shaped object needed to discover the configured Police/Ambulance departments.
shim.registerLbExport('GetMDTs', function()
    local out = {}
    for _, dept in ipairs(access.departments()) do
        local name = public.lbName(dept)
        out[name] = {
            name = name,
            department = dept.job,
            deviceName = 'SD MDT',
            jobsArray = { dept.job },
            tabs = {},
        }
    end
    return out
end)

shim.registerLbExport('GetMDT', function(mdtName)
    local all = exports['sd-phone']:mdtGetDepartments()
    for _, dept in ipairs(all or {}) do
        if public.lbName(dept):lower() == tostring(mdtName or ''):lower() then
            return {
                name = public.lbName(dept),
                department = dept.job,
                deviceName = 'SD MDT',
                jobsArray = { dept.job },
                tabs = {},
            }
        end
    end
    return nil
end)

shim.registerLbExport('IsEmployeeOfMDT', function(mdtName, source)
    return exports['sd-phone']:mdtIsEmployee(source, mdtName) == true
end)

shim.registerLbExport('GetMDTPermissions', function(mdtName, source)
    local dept = department(mdtName)
    if not dept or not source then return false end
    local grants = exports['sd-phone']:mdtGetPermissions(source)
    local has = {}
    for _, key in ipairs(grants or {}) do has[key] = true end
    local function p(view, create, edit, delete)
        return { view = has[view] == true, create = has[create] == true, edit = has[edit] == true, delete = has[delete] == true }
    end
    return {
        default = { view = has['home.view'] == true },
        users = p('persons.view', 'persons.edit', 'persons.edit', 'persons.edit'),
        vehicles = p('vehicles.view', 'vehicles.edit', 'vehicles.edit', 'vehicles.edit'),
        reports = p('reports.view', 'reports.create', 'reports.edit.own', 'reports.delete'),
        weapons = p('weapons.view', 'weapons.edit', 'weapons.edit', 'weapons.edit'),
        dispatch = p('dispatch.view', 'dispatch.attach', 'dispatch.status', 'dispatch.status'),
    }
end)

shim.registerLbExport('GetMDTAccount', function(mdtName, target)
    return accountShape(profileFor(mdtName, target))
end)
shim.registerLbExport('GetMDTCallsign', function(mdtName, target)
    local profile = profileFor(mdtName, target)
    return profile and profile.callsign or nil
end)
shim.registerLbExport('GetMDTAvatar', function(mdtName, target)
    local profile = profileFor(mdtName, target)
    return profile and profile.avatar or nil
end)

shim.registerLbExport('GetMDTUser', function(mdtName, target)
    local dept = department(mdtName)
    if not dept or dept.type ~= 'leo' then return false end
    local cid = type(target) == 'number' and player.getIdentifier(target) or target
    local person = exports['sd-phone']:mdtGetTrustedPerson(cid, 'leo')
    if not person then return false end
    person.id = person.citizenid
    return person
end)

shim.registerLbExport('GetMDTVehicle', function(mdtName, plate)
    local dept = department(mdtName)
    if not dept or dept.type ~= 'leo' then return false end
    local vehicle = exports['sd-phone']:mdtGetTrustedVehicle(plate)
    if not vehicle then return false end
    vehicle.id = vehicle.plate
    return vehicle
end)

-- SetMDTCallsign has no actor parameter in LB's server API. A normal SD write must still be
-- performed by an online MDT employee; ignoreCheck is accepted only as a server-side override for
-- the target's own currently active department, never as a way to cross departments.
shim.registerLbExport('SetMDTCallsign', function(mdtName, target, callsign, ignoreCheck)
    local dept = department(mdtName)
    local src = targetSource(target)
    local profile = profileFor(mdtName, target)
    if not dept or not src or not profile
        or not exports['sd-phone']:mdtIsEmployee(src, mdtName) then
        return false, 'invalid_target'
    end
    if ignoreCheck then
        local value = type(callsign) == 'string' and callsign:upper() or ''
        if value == '' then return false, 'invalid_callsign' end
        local updated, refused = store.updateProfile(profile.citizenid, { callsign = value })
        if not updated then return false, refused and 'callsign_taken' or 'invalid_callsign' end
        dispatch.setCallsign(profile.citizenid, value)
        return updated.callsign
    end
    local ok = exports['sd-phone']:mdtSetCallsign(src, profile.citizenid, callsign)
    if not ok then return false, 'invalid_callsign' end
    local updated = store.profile(profile.citizenid)
    return updated and updated.callsign or false
end)

-- Read/write report exports. Generic Create/Update only support SD's actual report tab; legacy
-- police reports refuse fields SD does not model. Ambulance reports map patient/doctor/injury data
-- onto SD's medical report roles/body.
shim.registerLbExport('GetMDTReport', function(mdtName, tabId, reportId)
    local dept = department(mdtName)
    if not dept or tabId ~= 'reports' then return false end
    local report = exports['sd-phone']:mdtGetTrustedReport(reportId, dept.type == 'ems' and 'ems' or 'leo')
    return mapReport(report, dept.type == 'ems') or false
end)

shim.registerLbExport('DeleteMDTReport', function(reportId)
    return exports['sd-phone']:mdtDeleteTrustedReport(reportId) == true
end)

shim.registerLbExport('CreateMDTReport', function(mdtName, tabId, creator, data)
    local dept = department(mdtName)
    if not dept then return false end
    return saveLegacyReport(mdtName, tabId, creator, data, dept.type == 'ems')
end)

shim.registerLbExport('UpdateMDTReport', function(mdtName, tabId, creator, data)
    local dept = department(mdtName)
    if not dept then return false end
    return updateLegacyReport(mdtName, tabId, creator, data, dept.type == 'ems')
end)

-- Legacy report aliases. Warrant/case aliases are intentionally not registered: LB models them as
-- report tabs with tags, arbitrary involved entities and criminal sentencing; SD has separate
-- warrant/case entities with different required fields and lifecycle rules.
shim.registerLbExport('CreatePoliceReport', function(creator, data)
    return saveLegacyReport('Police', 'reports', creator, data, false)
end)
shim.registerLbExport('UpdatePoliceReport', function(creator, data)
    return updateLegacyReport('Police', 'reports', creator, data, false)
end)
shim.registerLbExport('GetPoliceReport', function(reportId)
    return mapReport(exports['sd-phone']:mdtGetTrustedReport(reportId, 'leo'), false) or false
end)
shim.registerLbExport('DeletePoliceReport', function(reportId)
    return exports['sd-phone']:mdtDeleteTrustedReport(reportId) == true
end)

shim.registerLbExport('CreateAmbulanceReport', function(creator, data)
    return saveLegacyReport('Ambulance', 'reports', creator, data, true)
end)
shim.registerLbExport('UpdateAmbulanceReport', function(creator, data)
    return updateLegacyReport('Ambulance', 'reports', creator, data, true)
end)
shim.registerLbExport('GetAmbulanceReport', function(reportId)
    return mapReport(exports['sd-phone']:mdtGetTrustedReport(reportId, 'ems'), true) or false
end)
shim.registerLbExport('DeleteAmbulanceReport', function(reportId)
    return exports['sd-phone']:mdtDeleteTrustedReport(reportId) == true
end)

-- Case/warrant reads are possible because SD has those entities. Their legacy create/update/delete
-- operations are not registered: LB's payloads require tags, arbitrary entity relations and
-- criminal sentencing that SD deliberately does not store.
shim.registerLbExport('GetPoliceCase', function(caseId)
    return mapCase(exports['sd-phone']:mdtGetTrustedCase(caseId, 'leo')) or false
end)
shim.registerLbExport('GetPoliceWarrant', function(warrantId)
    return mapWarrant(exports['sd-phone']:mdtGetTrustedWarrant(warrantId, 'leo')) or false
end)

-- The SD weapon registry is a real equivalent, but it is keyed by serial rather than LB's numeric
-- weapon profile id. Keep the LB return contract by returning the SD record with id=serial.
shim.registerLbExport('RegisterMDTWeapon', function(mdtName, serial, data, registrant)
    local dept = department(mdtName)
    if not dept or dept.type ~= 'leo' then return false end
    data = type(data) == 'table' and data or {}
    local number, message = exports['sd-phone']:mdtRegisterWeapon({
        serial       = serial,
        name         = data.weaponName or data.name,
        owner        = data.owner,
        registeredBy = registrant,
    })
    if not number then shim.warnOnce('RegisterMDTWeapon.refused', message or 'RegisterMDTWeapon was refused') end
    return number or false
end)

shim.registerLbExport('GetMDTWeapon', function(mdtName, serial)
    local dept = department(mdtName)
    if not dept or dept.type ~= 'leo' then return false end
    local weapon = exports['sd-phone']:mdtGetWeapon(serial)
    if not weapon then return false end
    weapon.id = weapon.serial
    return weapon
end)

-- Legacy aliases that have a faithful SD equivalent.
shim.registerLbExport('GetPoliceCallsign', function(target) return exports['lb-tablet']:GetMDTCallsign('Police', target) end)
shim.registerLbExport('GetAmbulanceCallsign', function(target) return exports['lb-tablet']:GetMDTCallsign('Ambulance', target) end)
shim.registerLbExport('SetPoliceCallsign', function(target, callsign, ignoreCheck)
    return exports['lb-tablet']:SetMDTCallsign('Police', target, callsign, ignoreCheck)
end)
shim.registerLbExport('SetAmbulanceCallsign', function(target, callsign, ignoreCheck)
    return exports['lb-tablet']:SetMDTCallsign('Ambulance', target, callsign, ignoreCheck)
end)
shim.registerLbExport('GetPoliceAvatar', function(target) return exports['lb-tablet']:GetMDTAvatar('Police', target) end)
shim.registerLbExport('GetAmbulanceAvatar', function(target) return exports['lb-tablet']:GetMDTAvatar('Ambulance', target) end)
shim.registerLbExport('RegisterWeapon', function(serial, data)
    data = type(data) == 'table' and data or {}
    local number, message = exports['sd-phone']:mdtRegisterWeapon({
        serial = serial,
        name = data.weaponName or data.name,
        owner = data.owner,
    })
    if not number then shim.warnOnce('RegisterWeapon.refused', message or 'RegisterWeapon was refused') end
    return number or false
end)

shim.registerLbExport('GetPolicePlayerCharges', function(identifier)
    return exports['sd-phone']:mdtGetPlayerCharges(identifier)
end)

-- Shared LB exports are also callable from client resources. Keep the decision server-side: the
-- client round-trip below receives the same configured metadata and active-job permission result
-- as a server caller, without trusting a client-provided job or grade.
lib.callback.register('sd-phone:server:lbtablet:mdtShared', function(src, action, mdtName)
    if action == 'GetMDTs' then return exports['lb-tablet']:GetMDTs() end
    if action == 'GetMDT' then return exports['lb-tablet']:GetMDT(mdtName) end
    if action == 'IsEmployeeOfMDT' then return exports['lb-tablet']:IsEmployeeOfMDT(mdtName, src) end
    if action == 'GetMDTPermissions' then return exports['lb-tablet']:GetMDTPermissions(mdtName, src) end
    return false
end)

return compat
