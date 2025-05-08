local List = {}

local function convertVehs()
    if GetResourceState("will_garages_v2") == "started" then
        local vehs = GlobalState['VehicleGlobal']
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
        local vehs = module('vrp',"config/Vehicles") or {}
        for k,v in pairs(vehs) do
            List[k] = {
                Name = v.name,
                Weight = tonumber(v.weight) or 40,
                Price = v.price,
                Mode = v.type,
                Gemstone = v.Gemstone or 0,
                Class = v.type,
            }
        end
    end
end

CreateThread(function()
    Wait(500)
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