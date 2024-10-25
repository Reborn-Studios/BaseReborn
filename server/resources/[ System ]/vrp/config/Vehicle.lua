local List = {}

local function convertVehs()
    if GetResourceState("will_garages_v2") == "started" then
        local vehs = exports['will_garages_v2']:getVehicleGlobal()
        for Name,v in pairs(vehs) do
            List[Name] = {
                Name = v.name,
                Weight = tonumber(v.chest),
                Price = v.price,
                Mode = v.type,
                Gemstone = v.Gemstone or 0,
                Class = v.type,
            }
        end
    else
        local vehs = module('vrp',"Reborn/Vehicles") or {}
        for _,v in pairs(vehs) do
            List[v.name] = {
                Name = v.modelo,
                Weight = tonumber(v.capacidade),
                Price = v.price,
                Mode = v.tipo,
                Gemstone = v.Gemstone or 0,
                Class = v.tipo,
            }
        end
    end
end

CreateThread(function()
    convertVehs()
end)

RegisterNetEvent("Reborn:reloadInfos",function()
	convertVehs()
end)

function VehicleGlobal()
    return List
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLEEXIST
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleExist(Name)
    return List[Name] and true or false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLENAME
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleName(Name)
    if List[Name] and List[Name]["Name"] then
        return List[Name]["Name"]
    end

    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLECHEST
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleChest(Name)
    if List[Name] and List[Name]["Weight"] then
        return List[Name]["Weight"]
    end

    return 0
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLEPRICE
-----------------------------------------------------------------------------------------------------------------------------------------
function VehiclePrice(Name)
    if List[Name] and List[Name]["Price"] then
        return List[Name]["Price"]
    end

    return 0
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLEMODE
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleMode(Name)
    if List[Name] and List[Name]["Mode"] then
        return List[Name]["Mode"]
    end

    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLEGEMSTONE
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleGems(Name)
    if List[Name] and List[Name]["Gemstone"] then
        return List[Name]["Gemstone"]
    end

    return 0
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLECLASS
-----------------------------------------------------------------------------------------------------------------------------------------
function VehicleClass(Name)
    if List[Name] and List[Name]["Class"] then
        return List[Name]["Class"]
    end

    return "Desconhecido"
end