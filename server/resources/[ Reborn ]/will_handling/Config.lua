local Proxy = module("vrp", "lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

Config.webhook = ""

Config.handling = {
    fInitialDriveForce = { min = 0.05, max = 1.2 },
	fInitialDriveMaxFlatVel = { min = 60.0, max = 450.0 },
	fBrakeForce = { min = 0.05, max = 3.0 },
	fSteeringLock = { min = 20.0, max = 60.0 },
	fTractionCurveMax = { min = 1.0, max = 6.0 },
	fTractionCurveMin = { min = 0.5, max = 6.0 },
	fTractionLossMult = { min = 0.2, max = 2.2 },
	fLowSpeedTractionLossMult = { min = 0.2, max = 2.2 },
	fDownforceModifier = { min = 0.0, max = 20.0 },
}

Config.hasAdminPermission = function(src)
    local user_id = vRP.getUserId(src)
    if vRP.hasPermission(user_id, "admin.permissao") or vRP.hasPermission(user_id, "Admin") or vRP.HasPermission(user_id, "Admin") then
        return true
    end
    return false
end

function Notify(message, vtype, src)
    if vtype == 'error' then
        vtype = "negado"
    end
    if src then
        TriggerClientEvent('Notify', src, vtype, message, 50000)
    else
        TriggerEvent('Notify', vtype, message, 50000)
    end
end

CreateThread(function ()
    if IsDuplicityVersion() then
        RegisterCommand('handling', function(src)
            if Config.hasAdminPermission(src) then
                TriggerClientEvent('will_handling:openUI', src)
            end
        end, false)
    end
end)
