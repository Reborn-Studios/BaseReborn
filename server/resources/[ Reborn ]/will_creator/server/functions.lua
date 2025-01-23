--#########################
---##    VRP FUNCTIONS
--#########################
vRPclient = Tunnel.getInterface("vRP")

function getUserId(source)
    if Config.Base == "cn" then
		return vRP.Passport(source)
    end
    return vRP.getUserId(source)
end

function getUserIdentity(user_id)
    if Config.Base == "cn" then
		return vRP.Identity(source)
    end
    if Config.Base == "summerz" then
		return vRP.userIdentity(source)
    end
    return vRP.getUserIdentity(user_id)
end

function prepare(name, query)
    if Config.Base == "cn" then
		return vRP.Prepare(name, query)
    end
    vRP.prepare(name, query)
end

function query(name, data)
    if Config.Base == "cn" then
		return vRP.Query(name, data)
    end
    return vRP.query(name, data)
end

function execute(name, data)
    if Config.Base == "cn" then
		return vRP.Query(name, data)
    end
    vRP.execute(name, data)
end

--#########################
---##   SCRIPT FUNCTIONS
--#########################

-- Pegar identificador do jogador (Geralmente usado "steam" ou "licensa"). Utiliza-se para multichar
--- @param number
--- @return string | number
function getIdentifier(source)
    return vRP.getSteam(source)
end

-- Pegar maximo de personagens por jogador
--- @param source: number
--- @param user_id: number
function getPlayerMaxChars(identifier)
    local maxValue = 0
    if Config.UseKeySystem then
        local maxValues = json.decode(LoadResourceFile(GetCurrentResourceName(), 'maxValues.json'))
        if maxValues[identifier] ~= nil then
            maxValue = maxValues[identifier]
        end
    else
        local result = query("will_creator/countChars",{ identifier = identifier })
        if result and result[1] then
            maxValue = parseInt(result[1].chars) - 1
        end
    end
    return maxValue
end

-- Aumentar numero de personagens do jogador com codigo
--- @param code: string
--- @param identifier: string
--- @return bool
function updatePlayerMaxChars(code, identifier)
    local keys = json.decode(LoadResourceFile(GetCurrentResourceName(), 'keys.json'))
    if keys[code] ~= nil then
        if keys[code].used == false then
            keys[code].used = true
            SaveResourceFile(GetCurrentResourceName(), 'keys.json', json.encode(keys), -1)
            return true
        end
    end
    return false
end

-- Pegar informaçoes de um personagem
--- @param id: number -- ID do personagem
--- @param data: table<string | string> -- Informaçoes do personagem
--- @return table<string | string>
function getCharacter(id, data)
    local result = data or query("will_creator/get_user", { id = id })[1]
    if not result or not id then return {} end
    local userTablesSkin = json.decode(vRP.getUData(id, "Datatable"))
    return {
        id = result.id or result.user_id,
        name = result.name,
        lastname = result.name2 or result.firstname,
        job = vRP.getUserGroupByType(id,"job") or "Desempregado",
        cash = vRP.getInventoryItemAmount(id,"dollars"),
        bank = result.bank or vRP.getBankMoney(id),
        skin = userTablesSkin and userTablesSkin["skin"],
        gender = userTablesSkin and userTablesSkin["skin"] == 1885233650 and 0 or 1,
    }
end

-- Pegar informaçoes de todos personagens do jogador
--- @param source: number
--- @return table<string | string>
function getCharacters(source)
    local chars = {}
    local identifier = getIdentifier(source)
    local result = query("will_creator/get_characters",{ identifier = identifier })
    for i = 1, (#result), 1 do
        local charData = getCharacter(result[i]["id"], result[i])
        table.insert(chars, charData)
    end
    return chars
end

-- Inserir informaçoes no banco de dados e retornar id
--- @param src: number (source)
--- @param data: table<string | string>
--- @return number
function createCharacter(src, data, clothes)
    local identifier = getIdentifier(src)
    execute("will_creator/create_characters",{ identifier = identifier, name = data.firstname, name2 = data.lastname })
    local consult = query("will_creator/lastCharacters",{ identifier = identifier })
    local id = parseInt(consult[1]["id"])
    if clothes and next(clothes) then
        vRP.setUData(id, "Clothings", json.encode(clothes))
    end
    if Config.Base == "cn" then
        vRP.CharacterChosen(src, id, data.gender)
    elseif Config.Base == "summerz" then
        vRP.characterChosen(src, id, data.gender)
    else
        TriggerEvent("baseModule:idLoaded", src, id, data.gender)
    end
    TriggerClientEvent("hudActived", src, true)
    return id
end

-- Função chamada ao iniciar um personagem
--- @param source: number
--- @param user_id: number
function onPlayCharacter(source,user_id)
    if Config.Base == "cn" then
        vRP.CharacterChosen(source, user_id, nil)
    elseif Config.Base == "summerz" then
        vRP.characterChosen(source, user_id, nil)
    elseif Config.EnableMultichar then
        TriggerEvent("baseModule:idLoaded", source, user_id, nil)
    else
        TriggerEvent("vRP:playerSpawn", user_id, source)
    end
    -- Ativar hud
    TriggerClientEvent("hudActived",source,true)
end

-- Pegar roupas do personagem -> Aplica-se na função `applyClothes` no client_config
--- @param id: number
--- @return table<string | string>
function getClothes(user_id)
    local data = vRP.getUData(user_id, "Clothings")
    if data and data ~= "" then
        local clothes = json.decode(data)
        if clothes then
            return clothes
        end
    end
    data = vRP.getUData(user_id, "vRP:datatable")
    if data and data ~= "" then
        local datatable = json.decode(data)
        if datatable and datatable.customization then
            return datatable.customization
        end
    end
    local datatable = vRP.getUserDataTable(user_id) or {}
    return datatable.customization or {}
end

-- Pegar customização do personagem -> Aplica-se na função `applyCustomization` no client_config
--- @param id: number
--- @return table<string | string>
function getBarber(id)
    local skins = query("will_creator/get_playerskins",{ user_id = id })
    if skins[1] then
        return json.decode(skins[1].skin), skins[1].model
    end
end

-- Pegar tatuagens do personagem -> Aplica-se na função `customization` no client_config
--- @param id: number
--- @return table<string | string>
function getTattoos(user_id)
    local data = vRP.getUData(user_id,"vRP:tattoos")
    if data and data ~= '' then
       local custom = json.decode(data)  
       return custom or {}
    end
    data = vRP.getUData(user_id,"Tattoos")
    if data and data ~= '' then
       local custom = json.decode(data)  
       return custom or {}
    end
    return {}
end

-- Pega ultimas coordenadas do personagem
--- @param source: number
--- @return table<string | number>
function getUserLastCoords(source)
    local user_id = getUserId(source)
	local data = vRP.getUserDataTable(user_id)
    local lastPosition = { x = 54.7, y = -880.1, z = 260.0 }
    if data and data.position then
        lastPosition = data.position
    else
        local data = vRP.getUData(user_id, "Datatable")
        if data and data ~= "" then
            lastPosition = json.decode(data).position
        end
    end
    return lastPosition
end

-- Evento disparado ao spawnar o personagem pelo vrp
local spawnerEvents = {["summerz"] = "playerConnect", ["cn"] = "Connect"}
AddEventHandler(spawnerEvents[Config.Base] or "vRP:playerSpawn",
    function(user_id,source)
        Wait(500)
        local skin = getBarber(user_id)
        if skin then
            TriggerClientEvent('will_creator:client:loadData', source, skin)
        end
    end
)

--#########################
---##      COMMANDS
--#########################

RegisterCommand("creator",function(source)
    local user_id = getUserId(source)
    if vRP.hasPermission(user_id, "admin.permissao") or vRP.hasPermission(user_id, "Admin") then
        TriggerClientEvent('will_creator:client:CreateCharacter', source, "mp_m_freemode_01")
    end
end)

RegisterCommand('addcode', function(source, args)
    local source = source
    local user_id = getUserId(source)
    if vRP.hasPermission(user_id, "admin.permissao") or vRP.hasPermission(user_id, "Admin") then
        if args[1] then
            local keys = json.decode(LoadResourceFile(GetCurrentResourceName(), 'keys.json'))
            if keys[tostring(args[1])] == nil then
                keys[tostring(args[1])] = {
                    used = false,
                    increase = tonumber(args[2]) or 1
                }
                SaveResourceFile(GetCurrentResourceName(), 'keys.json', json.encode(keys), -1)
                TriggerClientEvent("Notify",source,"sucesso","Codigo "..tostring(args[1]).." criado com sucesso!",5000)
                return
            end
        end
        TriggerClientEvent("Notify",source,"negado","Utilize um codigo valido com /addcode (codigo) (aumento)")
    end
end)

local bvidaCooldown = {}

function reloadPlayer(src)
    local user_id = getUserId(src)
    if bvidaCooldown[user_id] and bvidaCooldown[user_id] > os.time() then return end
    bvidaCooldown[user_id] = os.time() + 10
    if not user_id then return end
    local skin,model = getBarber(user_id)
    local clothes = getClothes(user_id)
    local tattoos = getTattoos(user_id)
    local nped = GetPlayerPed(src)
    local health = GetEntityHealth(nped)
    local armour = GetPedArmour(nped)
    if skin and user_id then
        vCLIENT.reloadPlayer(src,{
            Barber = skin,
            Clothes = clothes,
            Tattoos = tattoos,
            Skin = tonumber(model)
        })
    end
    Wait(200)
    vRPclient.setHealth(src, health)
    SetPedArmour(nped,armour)
end

RegisterCommand('bvida', reloadPlayer)

RegisterServerEvent("player:Debug")
AddEventHandler("player:Debug",function()
    local source = source
    reloadPlayer(source)
end)

--#########################
---##      PREPARES
--#########################

CreateThread(function()
    Wait(500)
    prepare("will_creator/insert_playerskin","INSERT INTO playerskins (user_id, model, skin, active) VALUES (@user_id, @model, @skin, @active)")
    prepare("will_creator/get_playerskins","SELECT * FROM playerskins WHERE user_id = @user_id")
    prepare("will_creator/delete_playerskin","DELETE FROM playerskins WHERE user_id = @user_id")

    prepare("will_creator/save_skin","INSERT INTO saved_skins (user_id, model, mugshot, type, skin, skin2) VALUES (@user_id, @model, @mugshot, @type, @skin, @skin2)")
    prepare("will_creator/get_skins_type","SELECT id, mugshot FROM saved_skins WHERE user_id = @user_id AND type = @type")
    prepare("will_creator/get_skins","SELECT id, mugshot FROM saved_skins WHERE user_id = @user_id")
    prepare("will_creator/get_skin","SELECT * FROM saved_skins WHERE id = @id AND user_id = @user_id")
    prepare("will_creator/delete_skin","DELETE FROM saved_skins WHERE id = @id")
    
    local dbColumns = {
        ['vrpex'] = {
            ['accounts'] = {
                ['table'] = "vrp_infos",
                ['chars'] = "chars"
            },
            ['chars'] = {
                ['table'] = "vrp_user_identities",
                ['user_id'] = "user_id",
                ['identifier'] = "steam",
                ['name'] = "name",
                ['name2'] = "firstname",
            },
        },
        ['creative'] = {
            ['accounts'] = {
                ['table'] = "vrp_infos",
                ['chars'] = "chars"
            },
            ['chars'] = {
                ['table'] = "vrp_users",
                ['user_id'] = "id",
                ['identifier'] = "identifier",
                ['name'] = "name",
                ['name2'] = "name2",
            },
        },
        ['summerz'] = {
            ['accounts'] = {
                ['table'] = "summerz_accounts",
                ['chars'] = "chars"
            },
            ['chars'] = {
                ['table'] = "summerz_characters",
                ['user_id'] = "id",
                ['identifier'] = "steam",
                ['name'] = "name",
                ['name2'] = "name2",
            },
        },
        ['cn'] = {
            ['accounts'] = {
                ['table'] = "accounts",
                ['chars'] = "chars"
            },
            ['chars'] = {
                ['table'] = "characters",
                ['user_id'] = "id",
                ['identifier'] = "license",
                ['name'] = "name",
                ['name2'] = "name2",
            },
        },
    }

    -- get char infos
    prepare("will_creator/get_user","SELECT * FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['user_id'].." = @id")
    -- get last id created
    prepare("will_creator/lastCharacters","SELECT "..dbColumns[Config.Base]['chars']['user_id'].." FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier ORDER BY "..dbColumns[Config.Base]['chars']['user_id'].." DESC LIMIT 1")
    -- get chars with identifier
    prepare("will_creator/get_characters","SELECT * FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier")
    -- get max chars with identifier
    prepare("will_creator/countChars","SELECT "..dbColumns[Config.Base]['accounts']['chars'].." FROM "..dbColumns[Config.Base]['accounts']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier")
    -- insert char infos
    prepare("will_creator/create_characters","INSERT INTO "..dbColumns[Config.Base]['chars']['table'].."("..dbColumns[Config.Base]['chars']['identifier']..","..dbColumns[Config.Base]['chars']['name']..","..dbColumns[Config.Base]['chars']['name2']..") VALUES(@identifier,@name,@name2)")
end)
