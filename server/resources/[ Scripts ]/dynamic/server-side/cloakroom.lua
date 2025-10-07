-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")
vRPC = Tunnel.getInterface("vRP")

Cloak = {}
Tunnel.bindInterface("Cloakrooms",Cloak)

CreateThread(function ()
    vRP._prepare("cloakroom/saveClothes","INSERT IGNORE INTO cloakrooms(name,permiss,service,custom,sexo) VALUES(@name,@permiss,@service,@custom,@sexo)")
    vRP._prepare("cloakroom/updateClothes","UPDATE cloakrooms SET custom = @custom WHERE name = @name AND permiss = @permiss")
    vRP._prepare("cloakroom/deleteClothes","DELETE FROM cloakrooms WHERE name = @name")
    vRP._prepare("cloakroom/selectClothesT","SELECT * FROM cloakrooms WHERE service = @service AND sexo = @sexo")
    vRP._prepare("cloakroom/selectClothesW","SELECT * FROM cloakrooms WHERE name = @name AND sexo = @sexo")
    vRP._prepare("cloakroom/selectClothes","SELECT * FROM cloakrooms WHERE name = @name AND permiss = @permiss")
    exports["oxmysql"]:execute([[
        CREATE TABLE IF NOT EXISTS `cloakrooms` (
        `name` varchar(55) NOT NULL,
        `permiss` varchar(55) NOT NULL,
        `service` varchar(55) NOT NULL,
        `custom` varchar(500) NOT NULL,
        `sexo` varchar(55) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
    ]])
end)

local propCloths = {
    [0] = "hat",
    [1] = "glass",
    [2] = "ear",
    [6] = "watch",
    [7] = "bracelet",
}

local varCloths = {
    [1] = "mask",
    [3] = "arms",
    [4] = "pants",
    [5] = "backpack",
    [6] = "shoes",
    [7] = "accessory",
    [8] = "tshirt",
    [9] = "vest",
    [10] = "decals",
    [11] = "torso",
}

local function parse_part(key)
	if type(key) == "string" and string.sub(key,1,1) == "p" then
		return true,tonumber(string.sub(key,2))
	else
		return false,tonumber(key)
	end
end

local function convertClothes(clothes)
    local custom = {}
    for part,v in pairs(clothes) do
        local isprop, index = parse_part(part)
        if isprop then
            if index and propCloths[index] then
                custom[propCloths[index]] = { item = v[1], texture = v[2] }
            end
        elseif index and varCloths[index] then
            custom[varCloths[index]] = { item = v[1], texture = v[2] }
        end
    end
    return custom
end

RegisterServerEvent("Cloakrooms:applyPreset")
AddEventHandler("Cloakrooms:applyPreset",function(perm)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local sexo
        if GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_m_freemode_01") then
            sexo = "mp_m_freemode_01"
        elseif GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_f_freemode_01") then
            sexo = "mp_f_freemode_01"
        end
        if perm:find("apply") then
            local clothData = splitString(perm,"-")
            local Index = tonumber(clothData[2])
            TriggerClientEvent("dynamic:closeSystem", source)
            local permiss = vRP.prompt(source, "Insira o grupo", "")
            local services = Services[Index] and Services[Index][1]
            if permiss and services then
                local clothes = vRP.prompt(source, "Insira o nome do uniforme", "")
                if clothes and clothes ~= "" and clothes ~= nil then
                    local myClothes = vRPC.getCustomization(source)
                    if myClothes then
                        vRP.execute("cloakroom/saveClothes",{ name = clothes, service = services, permiss = permiss, custom = json.encode(myClothes), sexo = sexo })
                        TriggerClientEvent("Notify",source,"importante","Preset salvo com sucesso",6000)
                    end
                end
            end
            return
        elseif perm == "sairPtr" then
            local basic = vRP.getSData("RoupaOff:"..user_id)
            local consult = json.decode(basic) or {}
            if consult then
                TriggerClientEvent("updateRoupas",source,convertClothes(consult))
            end
            TriggerClientEvent("Notify",source,"negado","Você retirou seu uniforme..",6000)
            return
        elseif perm:find("remove") then
            local clothData = splitString(perm,"-")
            local clothName = clothData[2]
            if clothName then
                TriggerClientEvent("dynamic:closeSystem", source)
                vRP.execute("cloakroom/deleteClothes",{ name = clothName })
                TriggerClientEvent("Notify",source,"sucesso","Você retirou o uniforme da lista.",5000)
            end
            return
        end
        local consult = vRP.query("cloakroom/selectClothesW",{ name = perm, sexo = sexo })
        if consult[1] and consult[1].custom then
            if vRP.hasPermission(user_id,consult[1].permiss) then
                local myClothes = vRPC.getCustomization(source)
                TriggerClientEvent("Notify",source,"sucesso","Roupas aplicadas.",5000)
                vRP.setSData("RoupaOff:"..user_id,json.encode(myClothes))
                local preset = json.decode(consult[1].custom)
                TriggerClientEvent("skinshop:Apply",source,convertClothes(preset), true)
            end
        end
    end
end)

Cloak.requestPermission = function(index)
    local source = source
    local data = Services[index]
    local user_id = vRP.getUserId(source)
    if user_id and data then
        if vRP.hasPermission(user_id, data[5]) then
            local lider = vRP.hasPermission(user_id, data[6])
            local sexo
            if GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_m_freemode_01") then
                sexo = "mp_m_freemode_01"
            elseif GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_f_freemode_01") then
                sexo = "mp_f_freemode_01"
            end
            local consult = vRP.query("cloakroom/selectClothesT",{ service = data[1], sexo = sexo })
            return true,lider,consult
        end
    end
    return false
end
