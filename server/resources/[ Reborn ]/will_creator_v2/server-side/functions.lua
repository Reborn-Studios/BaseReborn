--#########################
---##    VRP FUNCTIONS
--#########################

local bvidaCooldown = {}
vRPC = Tunnel.getInterface("vRP")

-- ID do personagem
---@param source number
---@return number
function GetUserId(source)
    if Config.Base == "cn" then
		return vRP.Passport(source)
    end
    return vRP.getUserId(source)
end

-- Source atraves do ID
---@param id number
---@return number
function UserSource(id)
    if Config.Base == "cn" then
        return vRP.Source(id)
    end
    if Config.Base == "summerz" then
        return vRP.userSource(id)
    end
    return vRP.getUserSource(id)
end

-- Prepare de querys
---@param name string
---@param query string
function PrepareQuery(name, query)
    if Config.Base == "cn" then
		return vRP.Prepare(name, query)
    end
    vRP.prepare(name, query)
end

-- Query de consulta
---@param name string
---@param data? table<string | string>
---@return table<string | string>
function QueryConsult(name, data)
    if Config.Base == "cn" then
		return vRP.Query(name, data)
    end
    return vRP.query(name, data)
end

-- Query de execução
---@param name string
---@param data? table<string | string>
function QueryExecute(name, data)
    if Config.Base == "cn" then
		return vRP.Query(name, data)
    end
    vRP.execute(name, data)
end

--#########################
---##   SCRIPT FUNCTIONS
--#########################

-- Pegar identificador do jogador (Geralmente usado "steam" ou "licensa"). Utiliza-se para multichar
--- @param source number
--- @return string | number | boolean
function GetIdentifier(source)
    if Config.Base == "cn" then
        return vRP.Identities(source) or source
    end
    if Config.Base == "summerz" then
        return vRP.getIdentities(source)
    end
    return vRP.getSteam(source)
end

local groups = module('vrp',"config/Groups") or {}
--- @param user_id number
--- @return string, string
local function getUserJob(user_id)
    local userJobs = vRP.query("vRP/get_perm",{ user_id = user_id })
    local job = "Desempregado"
    local permiss = "Desempregado"
    for k,v in pairs(userJobs) do
        if groups[v.permiss] and groups[v.permiss]._config and groups[v.permiss]._config.gtype and groups[v.permiss]._config.gtype == "job" then
            job = groups[v.permiss]._config.title or v.permiss
            permiss = v.permiss
        end
    end
    return job, permiss
end

-- Nome inteiro do personagem
---@param data table<string | string>
---@return string
local function getFullName(data)
    local name = data.name or data.Name or data.nome
    local surname = data.name2 or data.firstname or data.Lastname or data.sobrenome
    if name then
        if surname then
            return name.." "..surname
        end
        return name
    end
    return "Individuo Indigente"
end

-- Pegar informaçoes de um personagem
--- @param id number -- ID do personagem
--- @param data? table<string | string> -- Informaçoes do personagem
--- @return Character | nil
function GetCharacter(id, data)
    local result = data or QueryConsult("will_creator_v2/get_user", { id = id })[1]
    if not result or not id then return end
    local skin = GetBarber(id)
    local job,permiss = getUserJob(id)
    return {
        id = id,
        skin = skin,
        name = getFullName(result),
        job = job,
        permiss = permiss,
        bank = result.bank or result.Bank or vRP.getBankMoney(id),
        phone = result.phone,
        clothes = GetClothes(id),
        tattoos = GetTattoos(id),
    }
end

-- Pegar informaçoes de todos personagens do jogador
--- @param source number
--- @return Character[]
function GetCharacters(source)
    local Chars = {}
    local identifier = GetIdentifier(source)
    local result = QueryConsult("will_creator_v2/get_characters",{ identifier = identifier })
    for i = 1, (#result), 1 do
        local CharData = GetCharacter(result[i]["id"], result[i])
        if CharData then
            table.insert(Chars, CharData)
        end
    end
    return Chars
end

-- Pegar maximo de personagens por jogador
--- @param source number
--- @return boolean
function CheckForCreateCharacter(source)
    local maxValue = 0
    local identifier = GetIdentifier(source)
    if not identifier then return false end
    local Chars = GetUserCharacters(identifier, source)
    local result = QueryConsult("will_creator_v2/countChars",{ identifier = identifier })
    if result and result[1] then
        maxValue = parseInt(result[1].chars)
    end
    if #Chars > 0 and #Chars >= maxValue then
        TriggerClientEvent("Notify",source,"negado","Você atingiu o limite de personagens.",5000)
        return false
    end
    return true
end

-- Inserir informaçoes no banco de dados e retornar id
--- @param src number (source)
--- @param data SkinData
--- @return number | nil
function CreateCharacter(src, data)
    local identifier = GetIdentifier(src)
    if not identifier then return end
    QueryExecute("will_creator_v2/create_characters",{ identifier = identifier, name = data.firstname, name2 = data.lastname })
    local consult = QueryConsult("will_creator_v2/lastCharacters",{ identifier = identifier })
    local id = parseInt(consult[1]["id"])
    QueryExecute("will_creator_v2/insert_playerskin",{ user_id = id, skin = json.encode(data), active = 1 })
    PlayCharacter(src,id,data.gender)
    return id
end

-- Função chamada ao iniciar um personagem
--- @param source number
--- @param user_id number
function PlayCharacter(source,user_id,gender)
    if Config.Base == "cn" then
        vRP.CharacterChosen(source, user_id, gender)
    elseif Config.Base == "summerz" then
        vRP.characterChosen(source, user_id, gender)
    elseif Config.EnableMultichar then
        TriggerEvent("baseModule:idLoaded", source, user_id, gender)
    else
        TriggerEvent("vRP:playerSpawn", user_id, source)
    end
    -- Ativar hud
    TriggerClientEvent("hudActived",source,true)
end

-- Pegar roupas do personagem -> Aplica-se na função `applyClothes` no client_config
--- @param user_id number
--- @return table<string | string>
function GetClothes(user_id)
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
--- @param id number
--- @return SkinData | nil
function GetBarber(id)
    local skins = QueryConsult("will_creator_v2/get_playerskins",{ user_id = id })
    if skins[1] then
        return json.decode(skins[1].skin)
    end
    return nil
end

-- Pegar tatuagens do personagem -> Aplica-se na função `customization` no client_config
--- @param user_id number
--- @return table<string | string>
function GetTattoos(user_id)
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
--- @param source number
--- @return table<string | number>
function GetUserLastCoords(source)
    local user_id = GetUserId(source)
	local data = vRP.getUserDataTable(user_id)
    local lastPosition = { x = 54.7, y = -880.1, z = 260.0 }
    if data and data.position then
        lastPosition = data.position
    else
        data = vRP.getUData(user_id, "Datatable")
        if data and data ~= "" then
            lastPosition = json.decode(data).position
        end
    end
    return lastPosition
end

-- Função para recarregar personagem
--- @param src number
function ReloadPlayer(src)
    local user_id = GetUserId(src)
    if bvidaCooldown[user_id] and bvidaCooldown[user_id] > os.time() then return end
    bvidaCooldown[user_id] = os.time() + 10
    if not user_id then return end
    local skin = GetBarber(user_id)
    local clothes = GetClothes(user_id)
    local tattoos = GetTattoos(user_id)
    local nped = GetPlayerPed(src)
    local health = GetEntityHealth(nped)
    local armour = GetPedArmour(nped)
    if skin and user_id then
        TriggerClientEvent("will_creator_v2:reloadPlayer",src,{
            skin = skin,
            clothes = clothes,
            tattoos = tattoos,
       })
    end
    Wait(200)
    vRPC.setHealth(src, health)
    SetPedArmour(nped,armour)
end

-- Pegar spawns do personagem
--- @param src number
--- @return Spawns[]
function GetSpawns(src)
    local user_id = GetUserId(src)
    while not user_id do
        Wait(300)
        user_id = GetUserId(src)
    end
    Wait(700)
    local UserSpawns = {}
    for k,v in pairs(Config.Spawns) do
        if not v.perm or vRP.hasPermission(user_id, v.perm) then
            table.insert(UserSpawns, v)
        end
    end
    return UserSpawns
end

-- Pegar modelos bloqueados
--- @param source number
--- @return table
function GetUserDisabledCategories(source)
    local user_id = GetUserId(source)
    if vRP.hasPermission(user_id, "vip.permissao") or vRP.hasPermission(user_id, "Platina") then
        return {}
    end
    return Config.DisabledCategories
end

--#########################
---##      COMMANDS
--#########################

RegisterCommand("creator",function(source, args)
    local user_id = GetUserId(source)
    if vRP.hasPermission(user_id, "admin.permissao") or vRP.hasPermission(user_id, "Admin") then
        if args[1] and tonumber(args[1]) ~= nil then
            local target = UserSource(tonumber(args[1]) or 0)
            if target then
                TriggerClientEvent('will_creator_v2:client:CreateCharacter', target)
            end
        else
            TriggerClientEvent('will_creator_v2:client:CreateCharacter', source)
        end
    end
end, false)

RegisterCommand("creatoradm",function (source)
    local user_id = GetUserId(source)
    if vRP.hasPermission(user_id, "admin.permissao") or vRP.hasPermission(user_id, "Admin") then
        TriggerClientEvent('will_creator_v2:openAdmin', source)
    end
end)

RegisterCommand('bvida', ReloadPlayer)
exports("ReloadPlayer", ReloadPlayer)

RegisterServerEvent("player:Debug")
AddEventHandler("player:Debug",function()
    local source = source
    ReloadPlayer(source)
end)

AddEventHandler("playerDropped",function()
    local source = source
    local identifier = GetIdentifier(source)
    if identifier and Characters[identifier] then
        Characters[identifier] = nil
    end
end)

--#########################
---##      PREPARES
--#########################

CreateThread(function()
    PrepareQuery("will_creator_v2/create_playerskins",[[
        CREATE TABLE IF NOT EXISTS `charskins` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `user_id` varchar(255) NOT NULL,
        `skin` text NOT NULL,
        `active` tinyint(4) NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`),
        KEY `user_id` (`user_id`),
        KEY `active` (`active`)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    ]])
    PrepareQuery("will_creator_v2/create_barbershops",[[
        CREATE TABLE IF NOT EXISTS `barbershops` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL DEFAULT 'Barbearia',
        `coords` text NOT NULL,
        `blip` text NOT NULL DEFAULT 'false',
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    ]])
    PrepareQuery("will_creator_v2/insert_playerskin","INSERT INTO charskins (user_id, skin, active) VALUES (@user_id, @skin, @active)")
    PrepareQuery("will_creator_v2/save_playerskin","UPDATE charskins SET skin = @skin WHERE user_id = @user_id")
    PrepareQuery("will_creator_v2/get_playerskins","SELECT * FROM charskins WHERE user_id = @user_id AND active = 1")
    PrepareQuery("will_creator_v2/delete_playerskin","DELETE FROM charskins WHERE user_id = @user_id")
    PrepareQuery("will_creator_v2/get_barbershops","SELECT * FROM barbershops")
    PrepareQuery("will_creator_v2/register_barbershop","INSERT INTO barbershops(name,coords,blip) VALUES(@name,@coords,@blip)")
    PrepareQuery("will_creator_v2/remove_barbershop","DELETE FROM barbershops WHERE id = @id")
    Wait(200)
    QueryExecute("will_creator_v2/create_playerskins")
    QueryExecute("will_creator_v2/create_barbershops")
    QueryExecute("will_creator_v2/get_barbershops")

    local dbColumns = {
        ['vrpex'] = {
            ['accounts'] = {
                ['table'] = "accounts",
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
                ['table'] = "accounts",
                ['chars'] = "chars"
            },
            ['chars'] = {
                ['table'] = "characters",
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
    PrepareQuery("will_creator_v2/get_user","SELECT * FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['user_id'].." = @id")
    -- get last id created
    PrepareQuery("will_creator_v2/lastCharacters","SELECT "..dbColumns[Config.Base]['chars']['user_id'].." FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier ORDER BY "..dbColumns[Config.Base]['chars']['user_id'].." DESC LIMIT 1")
    -- get chars with identifier
    PrepareQuery("will_creator_v2/get_characters","SELECT * FROM "..dbColumns[Config.Base]['chars']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier")
    -- get all chars
    PrepareQuery("will_creator_v2/get_all_chars","SELECT * FROM "..dbColumns[Config.Base]['chars']['table'])
    -- get max chars with identifier
    PrepareQuery("will_creator_v2/countChars","SELECT "..dbColumns[Config.Base]['accounts']['chars'].." FROM "..dbColumns[Config.Base]['accounts']['table'].." WHERE "..dbColumns[Config.Base]['chars']['identifier'].." = @identifier")
    -- insert char infos
    PrepareQuery("will_creator_v2/create_characters","INSERT INTO "..dbColumns[Config.Base]['chars']['table'].."("..dbColumns[Config.Base]['chars']['identifier']..","..dbColumns[Config.Base]['chars']['name']..","..dbColumns[Config.Base]['chars']['name2']..") VALUES(@identifier,@name,@name2)")
end)
