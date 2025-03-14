GFX.PlayerData = {}

GFX.ExecuteSql = function(query)
    local IsBusy = true
    local result = nil
    if Config.Database == "oxmysql" then
        exports.oxmysql:execute(query, function(data)
            result = data
            IsBusy = false
        end)

    elseif Config.Database == "ghmattimysql" then
        exports.ghmattimysql:execute(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    elseif Config.Database == "mysql-async" then
        MySQL.Async.fetchAll(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    end
    while IsBusy do
        Citizen.Wait(0)
    end
    return result
end

GFX.GetFramework = function()
    local object = nil
    if Config.Framework == "esx" then
        while object == nil do
            object = exports['es_extended']:getSharedObject()
            Citizen.Wait(0)
        end
    end
    if Config.Framework == "new-qb" then
        object = exports["qb-core"]:GetCoreObject()
    end
    if Config.Framework == "old-qb" then
        while object == nil do
            TriggerEvent('QBCore:GetObject', function(obj)object = obj end)
            Citizen.Wait(200)
        end
    end
    return object
end

GFX.GetPlayerCharacterName = function(source)
    if not source then return print("unknown source") end
    if Config.Framework == "new-qb" or Config.Framework == "old-qb" then
        local Player = GFX.Framework.Functions.GetPlayer(source)
        if Player then
            local charinfo = Player.PlayerData.charinfo
            return charinfo.firstname..' '..charinfo.lastname
        else
            return ""
        end
    elseif Config.Framework == "esx" then
        return GFX.GetPlayerCharacterNameESX(source)
    end
end

GFX.GetPlayerIdentifier = function(source)
    if not source then return print("unknown source") end
    if Config.Framework == "old-qb" or Config.Framework == "new-qb" then
        local Player = GFX.Framework.Functions.GetPlayer(source)
        if Player then
            return Player.PlayerData.citizenid
        else
            DropPlayer(source, "Unknown Identifier")
        end
    elseif Config.Framework == "esx" then
        return GFX.Framework.GetPlayerFromId(source).identifier
    end
end

GFX.StartRace = function(data)
    if (data) then
        if GFX.RaceLeaderBoard[data.id] == nil then
            GFX.RaceLeaderBoard[data.id] = {}
        end
        usertable = {}
        for k,v in pairs(data.players) do
            local isonline = GFX.CheckIsPlayerOnline(v.identifier)
            if isonline then
                local user = GFX.GetUser(isonline)
                table.insert(usertable, {id = user.source, ready = false, name = user.CharacterName})
            end
        end
        for k,v in pairs(usertable) do
            local user = GFX.GetUser(v.id)
            if user then
                user.SetLastRace(data)
                user.StartRace(data, usertable)
            end
        end
    end
end

GFX.UpdateLeaderBoard = function(PlayerData)
    for k,v in pairs(GFX.LeaderBoard) do
        if v.identifier == PlayerData.identifier then
            v.win = tonumber(PlayerData.Win)
            v.lose = tonumber(PlayerData.Lose)
            v.distance = tonumber(PlayerData.Distance)
            v.charname = PlayerData.CharacterName
            v.playerphoto = PlayerData.PlayerPhoto
            break
        end
    end
    table.sort(GFX.LeaderBoard, function(a, b)
        return tonumber(a.win) > tonumber(b.win)
    end)
end

GFX.GetPlayerBankAmount = function(source) 
    if not source then return print("unknown source") end
    if Config.Framework == "old-qb" or Config.Framework == "new-qb" then
        return GFX.Framework.Functions.GetPlayer(source).PlayerData.money.bank
    elseif Config.Framework == "esx" then
        local xPlayer = GFX.Framework.GetPlayerFromId(source)
        return xPlayer.getAccount('bank').money
    end
end

GFX.AddMoney = function(source, amount)
    if Config.Framework == "new-qb" or Config.Framework == "old-qb" then
        local Player = GFX.Framework.Functions.GetPlayer(source)
        return Player.Functions.AddMoney("bank", math.floor(amount))
    else
        local Player = GFX.Framework.GetPlayerFromId(source)
        return Player.addAccountMoney("bank", math.floor(amount))
    end
end

GFX.RemoveMoney = function(source, amount)
    if Config.Framework == "new-qb" or Config.Framework == "old-qb" then
        local Player = GFX.Framework.Functions.GetPlayer(source)
        return Player.Functions.RemoveMoney("bank", tonumber(amount))
    else
        local Player = GFX.Framework.GetPlayerFromId(source)
        return Player.removeAccountMoney("bank", tonumber(amount))
    end
end

GFX.CheckIsPlayerOnline = function(identifier)
    if Config.Framework == "old-qb" or Config.Framework == "new-qb" then
        return GFX.Framework.Functions.GetPlayerByCitizenId(identifier) ~= nil and GFX.Framework.Functions.GetPlayerByCitizenId(identifier).PlayerData.source or false
    elseif Config.Framework == "esx" then
        return GFX.Framework.GetPlayerFromIdentifier(identifier) ~= nil and GFX.Framework.GetPlayerFromIdentifier(identifier).source or false
    end
end

function GetSteamPP(source)
    local idf =  nil
    for k,v in pairs(GetPlayerIdentifiers(source))do
        if string.sub(v, 1, string.len("steam:")) == "steam:" then
            idf = v
        end
    end
    local avatar = "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/b9e02fad49fb6c1e4205ae6abcb7890a5ed7743a.png"
    if idf == nil then
        return avatar
    end
    local callback = promise:new()
    PerformHttpRequest('http://steamcommunity.com/profiles/' .. tonumber(GetIDFromSource('steam', idf), 16) .. '/?xml=1', function(Error, Content, Head)
        local SteamProfileSplitted = stringsplit(Content, '\n')
        if SteamProfileSplitted ~= nil and next(SteamProfileSplitted) ~= nil then
            for i, Line in ipairs(SteamProfileSplitted) do
                if Line:find('<avatarFull>') then
                    callback:resolve(Line:gsub('<avatarFull><!%[CDATA%[', ''):gsub(']]></avatarFull>', ''))
                    for k,v in pairs(callback) do
                        return callback.value
                    end
                    break
                end
            end
        end
    end)
    return Citizen.Await(callback)
end

function GetIDFromSource(Type, CurrentID) 
    local ID = stringsplit(CurrentID, ':')
    if (ID[1]:lower() == string.lower(Type)) then
        return ID[2]:lower()
    end

    return nil
end

function stringsplit(input, seperator)
    if seperator == nil then
        seperator = '%s'
    end

    local t={} ; i=1
    if input ~= nil then
        for str in string.gmatch(input, '([^'..seperator..']+)') do
            t[i] = str
            i = i + 1
        end
        return t
    end
end

local Caches = {
    Avatars = {}
}

function GetDiscordAvatar(user)
    local discordId = nil
    local imgURL = nil
    for _, id in ipairs(GetPlayerIdentifiers(user)) do
        if string.match(id, "discord:") then
            discordId = string.gsub(id, "discord:", "")
            break
        end
    end

    if discordId then
        if Caches.Avatars[discordId] == nil then
            local endpoint = ("users/%s"):format(discordId)
            local member = DiscordRequest("GET", endpoint, {})

            if member.code == 200 then
                local data = json.decode(member.data)
                if data ~= nil and data.avatar ~= nil then
                    if (data.avatar:sub(1, 1) and data.avatar:sub(2, 2) == "_") then
                        imgURL = "https://media.discordapp.net/avatars/" .. discordId .. "/" .. data.avatar .. ".gif"
                    else
                        imgURL = "https://media.discordapp.net/avatars/" .. discordId .. "/" .. data.avatar .. ".png"
                    end
                end
            end
            Caches.Avatars[discordId] = imgURL
        else
            imgURL = Caches.Avatars[discordId]
        end
    else
        print("[GFX] ERROR: Discord ID was not found...")
    end
    return imgURL
end

local FormattedToken = "Bot " .. SERVERCONFIG.DISCORDTOKEN
function DiscordRequest(method, endpoint, jsondata)
    local data = nil
    PerformHttpRequest(
        "https://discordapp.com/api/" .. endpoint,
        function(errorCode, resultData, resultHeaders)
            data = {data = resultData, code = errorCode, headers = resultHeaders}
        end,
        method,
        #jsondata > 0 and json.encode(jsondata) or "",
        {["Content-Type"] = "application/json", ["Authorization"] = FormattedToken}
    )
    while data == nil do
        Citizen.Wait(0)
    end
    return data
end

GFX.GetProfilePhoto = function(source)
    if Config.ImageType == "steam" then
        return GetSteamPP(source)
    else
        return GetDiscordAvatar(source)
    end
end
