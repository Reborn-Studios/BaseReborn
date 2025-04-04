GFX = {}
Framework = nil
GFX.ActiveRaces = {}
GFX.LeaderBoard = {}
Citizen.CreateThread(function()
    GFX.Framework = GFX.GetFramework()
    MySQL.query([[
        CREATE TABLE IF NOT EXISTS `gfx_racing` (
            `identifier` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `routes` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `racehistory` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `win` INT(11) NULL DEFAULT NULL,
            `lose` INT(11) NULL DEFAULT NULL,
            `favouritecar` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `distance` BIGINT(20) NULL DEFAULT NULL,
            `charname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `incomingrace` INT(11) NULL DEFAULT NULL,
            `lastrace` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `playerphoto` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci'
        ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
    ]])
    MySQL.query([[
        CREATE TABLE IF NOT EXISTS `races` (
            `owner` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `reward` INT(11) NULL DEFAULT NULL,
            `date` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `maxplayers` INT(11) NULL DEFAULT NULL,
            `route` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `id` BIGINT(20) NULL DEFAULT NULL,
            `players` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
            `luadate` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci'
        ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
    ]])
    Wait(2000)
    local races = MySQL.query.await('SELECT * FROM races')
    for k,v in pairs(races) do
        local data = {
            Name = v.name,
            Reward = v.reward,
            Others = {
                Players = v.maxplayers,
                Route = json.decode(v.route),
                Time = v.date
            }
        }
        Racers = json.decode(v.players) ~= nil and json.decode(v.players) or {}
        table.insert(GFX.ActiveRaces, {data = data, route = json.decode(v.route), owner = v.owner, id = v.id, players = Racers, luadate = v.luadate})
    end
    local racers = MySQL.query.await('SELECT * FROM gfx_racing')
    for k,v in pairs(racers) do
        table.insert(GFX.LeaderBoard, {
            win = tonumber(v.win),
            lose = tonumber(v.lose),
            distance = tonumber(v.distance),
            charname = v.charname,
            playerphoto = v.playerphoto,
            identifier = v.identifier
        })
        table.sort(GFX.LeaderBoard, function(a, b)
            return tonumber(a.win) > tonumber(b.win)
        end)
    end
end)

RegisterServerEvent("QBCore:Server:PlayerLoaded")
AddEventHandler("QBCore:Server:PlayerLoaded",function(Player)
    if Player.PlayerData.source then
        GFX.GetPlayer(Player.PlayerData.source)
    end
end)

RegisterServerEvent("gfx-racing-FinishRace")
AddEventHandler("gfx-racing-FinishRace", function(racedata)
    local src = source
    local rank = 0
    if (racedata and racedata.id) then
        if GFX.RaceLeaderBoard[racedata.id] == nil then
            return
        end

        for k,v in pairs(GFX.RaceLeaderBoard[racedata.id]) do
            rank += 1
            if v.source and v.source == src and not v.finished then
                v.finished = true
                local user = GFX.GetUser(src)
                if user then
                    user.FinishRace(racedata, rank, v.km)
                    TriggerClientEvent("gfx-racing:Client:FinishRace", src, rank)
                end
            end
        end
    end
end)

RegisterServerEvent("gfx-racing-SetRaceLeaderBoard")
AddEventHandler("gfx-racing-SetRaceLeaderBoard", function(id,checkstatus, km, distancenewwaypoint)
    local src = source
    local user = GFX.GetUser(src)
    if GFX.RaceLeaderBoard[id] == nil then
        GFX.RaceLeaderBoard[id] = {}
    end
    for k,v in pairs(GFX.RaceLeaderBoard[id]) do
        if v.source then
            if v.source == src then
                v.rank = checkstatus
                v.km = km
                v.distancenewwaypoint = distancenewwaypoint
                table.sort(GFX.RaceLeaderBoard[id], function(a, b)
                    if a.finished or b.finished then return false end
                    if tonumber(a.rank) == tonumber(b.rank) then
                        return tonumber(a.distancenewwaypoint) < tonumber(b.distancenewwaypoint) -- Aynı değerlere sahip öğelerin sırasını değiştirme
                    else
                        return tonumber(a.rank) > tonumber(b.rank) -- Diğer durumlarda artan düzende sıralama
                    end
                end)
                TriggerClientEvent("gfx-racing:SetRaceLeaderBoard", src, GFX.RaceLeaderBoard[id])
                return
            end
        end
    end
    table.insert(GFX.RaceLeaderBoard[id], {source = src, rank = checkstatus, CharacterName = user.CharacterName, playerphoto = user.PlayerPhoto, km = km, finished = false, iswinner = false})
    TriggerClientEvent("gfx-racing:SetRaceLeaderBoard", src, GFX.RaceLeaderBoard[id])
end)

RegisterServerEvent("QBCore:Server:OnPlayerUnload")
AddEventHandler("QBCore:Server:OnPlayerUnload", function(source)
    local user = GFX.GetUser(source)
    GFX.Save(source)
    if user then
        if user.inRace then
            for k,v in pairs(GFX.RaceLeaderBoard) do
                for i,j in pairs(v) do
                    if j.source == source then
                        table.remove(GFX.RaceLeaderBoard[k],i)
                        print("Player left the race "..source)
                    end
                end
            end
        end
    end
end)

AddEventHandler('playerDropped', function (reason)
    local src = source
    GFX.Save(src)
    local user = GFX.GetUser(src)
    if user then
        if user.inRace then
            for k,v in pairs(GFX.RaceLeaderBoard) do
                for i,j in pairs(v) do
                    if j.source == src then
                        table.remove(GFX.RaceLeaderBoard[k],i)
                        print("Player left the race "..src)
                    end
                end
            end
        end
    end
end)

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
        return
    end
    count = 0
    for k,v in pairs(GFX.Users) do
        count += 1
        GFX.Save(k)
    end
    print("[Racing] "..count.." Player saved!")
end)
