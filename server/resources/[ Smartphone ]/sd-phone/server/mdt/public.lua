---@type table sd-phone config root (configs/config.lua).
local config    = require 'configs.config'
---@type table Shared server helpers (server.util): failure envelopes and input limits.
local util      = require 'server.util'
---@type table MDT access layer: configured departments, identities and permissions.
local access    = require 'server.mdt.access'
---@type table MDT persistence: profiles and names.
local store     = require 'server.mdt.store'
---@type table Framework player bridge: online identifier resolution.
local player    = require 'bridge.server.player'
---@type table MDT persons and vehicles.
local records   = require 'server.mdt.records'
---@type table MDT firearms registry.
local weapons   = require 'server.mdt.weapons'
---@type table MDT reports and cases.
local paperwork = require 'server.mdt.paperwork'
---@type table MDT warrants.
local warrants  = require 'server.mdt.warrants'
---@type table MDT roster mutations.
local roster    = require 'server.mdt.roster'

---@type table Public MDT API. These exports are the native SD-phone surface; the lb-tablet
---compatibility layer is deliberately a thin mapper over the same guarded handlers.
local public = {}

---@type boolean
local ENABLED = ((config.Mdt or {}).Enabled == true)

---Resolve the online player that owns a native/legacy actor reference. Legacy lb-tablet accepts
---either a server id or a tablet/character identifier. SD must have an online actor for reads and
---writes that pass MDT permissions; accepting an offline string and bypassing the gate would make
---a resource export an authorization hole.
---@param actor number|string|nil
---@return number|nil source
function public.sourceOf(actor)
    local n = tonumber(actor)
    if n and n > 0 and player.getIdentifier(n) then return n end
    if type(actor) == 'string' and actor ~= '' then return player.getSourceByIdentifier(actor) end
    return nil
end

---Unwrap one normal SD callback envelope.
---@param result table|nil
---@param key string|nil
---@return any value
---@return string|nil message
local function unwrap(result, key)
    if type(result) ~= 'table' or result.success ~= true then
        return nil, type(result) == 'table' and result.message or 'The MDT request was refused'
    end
    local data = result.data
    if key then return type(data) == 'table' and data[key] or nil end
    return data
end

---Run a guarded MDT handler as an online actor. The handler keeps SD's normal department and
---grade checks, audit rows and domain separation intact.
---@param actor number|string
---@param handler fun(source: number, payload: table): table
---@param payload table
---@param key string|nil response data key
---@return any value
---@return string|nil message
function public.invoke(actor, handler, payload, key)
    if not ENABLED then return nil, 'The MDT is disabled' end
    local src = public.sourceOf(actor)
    if not src then return nil, 'The MDT actor must be online' end
    return unwrap(handler(src, type(payload) == 'table' and payload or {}), key)
end

---Canonical LB department name for an SD department. Configured job names remain the native
---identity; Police/Ambulance are compatibility labels only.
---@param dept table
---@return string
function public.lbName(dept)
    if dept.type == 'ems' then return 'Ambulance' end
    if dept.type == 'doj' then return 'Court' end
    return 'Police'
end

---Find a configured department by LB name, job name, short code or display label.
---@param name string
---@return table|nil
function public.department(name)
    if type(name) ~= 'string' or name == '' then return nil end
    local needle = name:lower()
    for _, dept in ipairs(access.departments()) do
        if needle == public.lbName(dept):lower()
            or needle == tostring(dept.job or ''):lower()
            or needle == tostring(dept.short or ''):lower()
            or needle == tostring(dept.label or ''):lower() then
            return dept
        end
    end
    return nil
end

---The configured departments in a compact native shape. The LB-shaped metadata adapter is in the
---compat layer; native callers should use this instead of depending on LB tab JSON.
function public.departments()
    local out = {}
    for i, dept in ipairs(access.departments()) do
        out[i] = {
            job    = dept.job,
            type   = dept.type or 'leo',
            label  = dept.label or dept.job,
            short  = dept.short or dept.job,
            seal   = dept.seal,
            accent = dept.accent,
            callsign = dept.callsign,
        }
    end
    return out
end

---Return the native identity/profile for an online actor.
function public.account(actor)
    if not ENABLED then return nil, 'The MDT is disabled' end
    local src = public.sourceOf(actor)
    if not src then return nil, 'The MDT actor must be online' end
    local me = access.identity(src)
    if not me then return nil, 'The actor has no MDT department' end
    return {
        citizenid  = me.citizenid,
        name       = me.name,
        job        = me.job,
        department = me.department,
        grade      = me.grade,
        rank       = me.rank,
        callsign   = me.callsign,
        badge      = me.badge,
        radio      = me.radio,
        avatar     = me.avatar,
        duty       = me.duty,
    }
end

---Return the native permission keys actually granted to an actor.
function public.permissions(actor)
    if not ENABLED then return {} end
    local src = public.sourceOf(actor)
    if not src then return {} end
    return access.grants(src)
end

---Read a profile overlay without making callers depend on the SQL table.
function public.avatar(actor)
    local account, message = public.account(actor)
    return account and account.avatar or nil, message
end

---Resolve either SD's human reference or the local numeric row id. Numeric ids are accepted only
---as a convenience for adapters; all policy is still enforced by the guarded handler after the
---reference is resolved.
---@param tableName string one of the fixed MDT tables below
---@param ref any
---@return string|nil
local function refOf(tableName, ref)
    local text = util.limitedString(type(ref) == 'string' and ref or tostring(ref or ''), 32)
    if not text then return nil end
    if not tonumber(text) then return text end
    local allowed = {
        reports = true,
        cases = true,
        warrants = true,
    }
    if not allowed[tableName] then return nil end
    return MySQL.scalar.await(('SELECT ref FROM phone_mdt_%s WHERE id = ? LIMIT 1'):format(tableName), { tonumber(text) })
end

function public.callsign(actor)
    local account, message = public.account(actor)
    return account and account.callsign or nil, message
end

---Set a callsign through the normal roster permission path. `actor` is the administrator/roster
---editor and target is the officer whose callsign changes.
function public.setCallsign(actor, target, callsign)
    local result = public.invoke(actor, roster.setCallsign, {
        citizenid = type(target) == 'number' and player.getIdentifier(target) or target,
        callsign   = callsign,
    })
    return result ~= nil, result
end

function public.person(actor, citizenid)
    return public.invoke(actor, records.personsGet, { citizenid = citizenid }, 'person')
end

function public.vehicle(actor, plate)
    return public.invoke(actor, records.vehiclesGet, { plate = plate }, 'vehicle')
end

function public.trustedPerson(citizenid, domain)
    if not ENABLED or domain ~= 'leo' then return nil end
    return records.exportPerson(citizenid, domain)
end

function public.trustedVehicle(plate)
    if not ENABLED then return nil end
    return records.exportVehicle(plate)
end

function public.trustedCase(ref, domain)
    if not ENABLED then return nil end
    return paperwork.exportCase(ref, domain)
end

function public.trustedWarrant(ref, domain)
    if not ENABLED then return nil end
    return warrants.exportWarrant(ref, domain)
end

function public.updateVehicle(actor, data)
    return public.invoke(actor, records.vehiclesUpdate, data)
end

function public.report(actor, ref)
    return public.invoke(actor, paperwork.reportsGet, { ref = refOf('reports', ref) }, 'report')
end

---Trusted resource-facing report read for LB's source-less GetMDTReport contract. The domain is
---mandatory so compatibility callers cannot accidentally cross the Police/EMS boundary.
function public.trustedReport(ref, domain)
    if not ENABLED then return nil end
    return paperwork.exportReport(ref, domain)
end

function public.trustedDeleteReport(ref)
    if not ENABLED then return false end
    return paperwork.exportDeleteReport(ref)
end

function public.trustedCharges(citizenid)
    if not ENABLED then return {} end
    return paperwork.exportCharges(citizenid)
end

function public.saveReport(actor, data)
    if type(data) == 'table' and data.ref ~= nil then
        local payload = {}
        for key, value in pairs(data) do payload[key] = value end
        payload.ref = refOf('reports', data.ref)
        data = payload
    end
    return public.invoke(actor, paperwork.reportsSave, data, 'report')
end

function public.deleteReport(actor, ref)
    local result, message = public.invoke(actor, paperwork.reportsDelete, { ref = refOf('reports', ref) })
    return result ~= nil, message
end

function public.case(actor, ref)
    return public.invoke(actor, paperwork.casesGet, { ref = refOf('cases', ref) }, 'case')
end

function public.saveCase(actor, data)
    if type(data) == 'table' and data.ref ~= nil then
        local payload = {}
        for key, value in pairs(data) do payload[key] = value end
        payload.ref = refOf('cases', data.ref)
        data = payload
    end
    return public.invoke(actor, paperwork.casesSave, data, 'case')
end

function public.deleteCase(actor, ref)
    local result, message = public.invoke(actor, paperwork.casesDelete, { ref = refOf('cases', ref) })
    return result ~= nil, message
end

function public.warrant(actor, ref)
    return public.invoke(actor, warrants.get, { ref = refOf('warrants', ref) }, 'warrant')
end

function public.issueWarrant(actor, data)
    return public.invoke(actor, warrants.issue, data, 'warrant')
end

function public.closeWarrant(actor, ref)
    local result, message = public.invoke(actor, warrants.close, { ref = refOf('warrants', ref) }, 'warrant')
    return result, message
end

function public.voidWarrant(actor, ref)
    local result, message = public.invoke(actor, warrants.void, { ref = refOf('warrants', ref) }, 'warrant')
    return result, message
end

---Native SD exports. They return data directly on success and `nil/false, message` on refusal.
exports('mdtGetDepartments', function() return public.departments() end)
exports('mdtIsEmployee', function(actor, department)
    if not ENABLED then return false end
    local src = public.sourceOf(actor)
    if not src then return false end
    local me = access.identity(src)
    local wanted = public.department(department)
    return me ~= nil and (not wanted or me.department.job == wanted.job)
end)
exports('mdtGetPermissions', function(actor) return public.permissions(actor) end)
exports('mdtGetAccount', function(actor) return public.account(actor) end)
exports('mdtGetCallsign', function(actor) return public.callsign(actor) end)
exports('mdtSetCallsign', function(actor, target, callsign)
    return public.setCallsign(actor, target, callsign)
end)
exports('mdtGetAvatar', function(actor) return public.avatar(actor) end)
exports('mdtGetPerson', function(actor, citizenid) return public.person(actor, citizenid) end)
exports('mdtGetVehicle', function(actor, plate) return public.vehicle(actor, plate) end)
exports('mdtGetTrustedPerson', function(citizenid, domain) return public.trustedPerson(citizenid, domain) end)
exports('mdtGetTrustedVehicle', function(plate) return public.trustedVehicle(plate) end)
exports('mdtGetTrustedCase', function(ref, domain) return public.trustedCase(ref, domain) end)
exports('mdtGetTrustedWarrant', function(ref, domain) return public.trustedWarrant(ref, domain) end)
exports('mdtUpdateVehicle', function(actor, data) return public.updateVehicle(actor, data) end)
exports('mdtGetReport', function(actor, ref) return public.report(actor, ref) end)
exports('mdtGetTrustedReport', function(ref, domain) return public.trustedReport(ref, domain) end)
exports('mdtDeleteTrustedReport', function(ref) return public.trustedDeleteReport(ref) end)
exports('mdtGetPlayerCharges', function(citizenid) return public.trustedCharges(citizenid) end)
exports('mdtSaveReport', function(actor, data) return public.saveReport(actor, data) end)
exports('mdtDeleteReport', function(actor, ref) return public.deleteReport(actor, ref) end)
exports('mdtGetCase', function(actor, ref) return public.case(actor, ref) end)
exports('mdtSaveCase', function(actor, data) return public.saveCase(actor, data) end)
exports('mdtDeleteCase', function(actor, ref) return public.deleteCase(actor, ref) end)
exports('mdtGetWarrant', function(actor, ref) return public.warrant(actor, ref) end)
exports('mdtIssueWarrant', function(actor, data) return public.issueWarrant(actor, data) end)
exports('mdtCloseWarrant', function(actor, ref) return public.closeWarrant(actor, ref) end)
exports('mdtVoidWarrant', function(actor, ref) return public.voidWarrant(actor, ref) end)

return public
