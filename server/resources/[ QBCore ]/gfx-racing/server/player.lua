GFX.Users = {}
GFX.Race = {}
Races = {}
GFX.RaceLeaderBoard = {}
GFX.GetPlayer = function(source) 
    if source then
        PlayerIdentifier = GFX.GetPlayerIdentifier(source)
        if not PlayerIdentifier then return end
        MySQL.prepare('SELECT * FROM gfx_racing WHERE identifier = ?', {PlayerIdentifier}, function(result)
            if result then
                result.routes = json.decode(result.routes)
                result.racehistory = json.decode(result.racehistory)
                result.favouritecar = json.decode(result.favouritecar)
                GFX.UserData(source, PlayerIdentifier, result)
            else
                GFX.CreateChar(source, PlayerIdentifier)
            end
        end)
    end
end

GFX.UserData = function(source, identifier, userData)
    local self = {}
    self.identifier = identifier
    self.source = source
    self.NotifMinutes = {
        [5] = false,
        [4] = false,
        [3] = false,
        [2] = false,
        [1] = false
    }
    self.Routes = userData.routes ~= nil and userData.routes or {} 
    self.RaceHistory = userData.racehistory ~= nil and userData.racehistory or {}
    self.LastRace = userData.lastrace ~= nil and userData.lastrace or "Unknown"
    self.Win = userData.win ~= nil and userData.win or 0
    self.Lose = userData.lose ~= nil and userData.lose or 0
    self.FavouriteCar = GFX.GetFavoruiteCar(userData.favouritecar)
    self.Distance = userData.distance ~= nil and userData.distance or 0
    self.Steam = GetPlayerName(source)
    self.CharacterName = GFX.GetPlayerCharacterName(source)
    self.IncomingRace = GFX.CheckIncomingRace(userData.incomingrace)
    self.PlayerPhoto = GFX.GetProfilePhoto(self.source)
    self.inRace = false
    function self.CheckIncomingRace()
        if (self.IncomingRace ~= 0) then
            for k,v in pairs(GFX.ActiveRaces) do
                if v.id == tonumber(self.IncomingRace) then
                    return 
                end
            end
        end
        self.IncomingRace = 0
    end
    self.CheckIncomingRace()
    function self.JoinRace(id)
        if (self.IncomingRace ~= 0) then
            return TriggerClientEvent("gfx-racing:notify",self.source, Config.Texts["inracealready"])
        end
        for k,v in pairs(GFX.ActiveRaces) do
            if v.id == id then
                if #v.players + 1 > tonumber(v.data.Others.Players) then
                    return TriggerClientEvent("gfx-racing:notify",self.source, Config.Texts["maxplayers"])
                end
                players = {
                    identifier = self.identifier,
                    playerwin = self.Win,
                    playerlose = self.Lose
                }
                table.insert(v.players, players)
                MySQL.update('UPDATE races SET players = ?  WHERE id = ?', {json.encode(v.players), id}, function(affectedRows)
                    if affectedRows then
                    end
                end)
                
                break
            end
        end
        self.IncomingRace = id
        self.Update()
    end
    function self.SetLastRace(data)
        self.LastRace = data.data.Name.." - "..data.data.Reward.."$"
    end

    function self.GetFavCar()
        if #self.FavouriteCar > 1 then
            return self.FavouriteCar[1].carname
        else
            return "Unknown"
        end
    end

    function self.LeaveRace()
        local racedata = self.GetIncomingRaceData()
        if racedata then
            if racedata.owner == self.identifier then
                TriggerClientEvent("gfx-racing:notify",self.source, Config.Texts["racedeactivated"])
                GFX.RemoveActiveRace(racedata.id, true)
            end
            for k,v in pairs(GFX.ActiveRaces) do
                if v.id == racedata.id then
                    for i,j in pairs(v.players) do
                        if j.identifier == self.identifier then
                            table.remove(v.players, i)
                            MySQL.update('UPDATE races SET players = ?  WHERE id = ?', {json.encode(v.players), racedata.id}, function(affectedRows)
                                if affectedRows then
                                end
                            end)
                        end
                    end
                end
            end
        end
        self.NotifMinutes = {
            [5] = false,
            [4] = false,
            [3] = false,
            [2] = false,
            [1] = false
        }
        self.IncomingRace = 0
        self.Update()
    end


    function self.KickRace()
        local racedata = self.GetIncomingRaceData()
        for k,v in pairs(GFX.ActiveRaces) do
            if v.id == racedata.id then
                for i,j in pairs(v.players) do
                    if j.identifier == self.identifier then
                        table.remove(v.players, i)
                        MySQL.update('UPDATE races SET players = ?  WHERE id = ?', {json.encode(v.players), racedata.id}, function(affectedRows)
                            if affectedRows then
                            end
                        end)
                    end
                end
            end
        end
        self.NotifMinutes = {
            [5] = false,
            [4] = false,
            [3] = false,
            [2] = false,
            [1] = false
        }
        self.IncomingRace = 0
        self.Update()
    end

    function self.GetRoute(id)
        if id then
            for k,v in pairs(self.Routes) do
                if v.id == id then  
                    return v.Routes
                end
            end
        end
    end


    function self.SendNotification(min)
        min = tonumber(min)
        if not self.NotifMinutes[min] then
            self.NotifMinutes[min] = true
            local text = Config.Texts["racestartin"].." "..min.."m"
            TriggerClientEvent("gfx-racing:notify",self.source, text)
            local data = self.GetIncomingRaceData()
            if (data) then
                local x = data.route[1].x
                local y = data.route[1].y
                TriggerClientEvent("gfx-racing:SetMarker", self.source, {x,y})
            end
            
        end
    end

    function self.FinishRace(racedata, rank, km)
        self.SetLastRace(racedata)
        if (rank == 1) then 
            GFX.AddMoney(self.source, tonumber(racedata.data.Reward)) 
            self.Win += 1 
        else
            self.Lose += 1 
        end
        self.Distance += tonumber(km)
        table.insert(self.RaceHistory, {rank = rank, racename = racedata.data.Name, date = racedata.data.Others.Time})
        self.inRace = false
        self.IncomingRace = 0
        self.NotifMinutes = {
            [5] = false,
            [4] = false,
            [3] = false,
            [2] = false,
            [1] = false
        }
        GFX.UpdateLeaderBoard(self)
    end

    function self.StartRace(data, userlist) 
        --print("started "..self.source)
        self.inRace = true
        local ped = GetPlayerPed(self.source)
        local coords = GetEntityCoords(ped)
        local estcoord = vector2(data.route[1].x, data.route[1].y)
        local dst = #(vector2(coords.x, coords.y) - estcoord)
        if (dst <= 100.0) then
            TriggerClientEvent("gfx-racing:StartRace", self.source, data, userlist)
            table.insert(GFX.RaceLeaderBoard[data.id], {source = self.source, rank = 1, CharacterName = self.CharacterName, playerphoto = self.PlayerPhoto, km = 0.0, finished = false, iswinner = false})
            --TriggerClientEvent("gfx-racing:SetRaceLeaderBoard", self.source, GFX.RaceLeaderBoard[data.id])
        else
            TriggerClientEvent("gfx-racing:notify",self.source, Config.Texts["notatlocation"])
            self.LeaveRace()
        end
        
    end

    function self.AddFavCar(vehlabel)
        if (vehlabel) then
            for k,v in pairs(self.FavouriteCar) do
                if v.carname == vehlabel then
                    v.count += 1
                    return
                end
            end
            table.insert(self.FavouriteCar, {carname = vehlabel, count = 1})
        end
    end

    function self.GetIncomingRaceData()
        if (self.IncomingRace ~= 0) then
            for k,v in pairs(GFX.ActiveRaces) do
                if v.id == tonumber(self.IncomingRace) then
                    return v
                end
            end
        end
        return false
    end


    function self.AddRoute(name, Routes, Streets)
        if name and Routes then
            self.Routes[#self.Routes+1] = {
                name = name,
                Routes = Routes,
                StartStreet = Streets.StartStreet,
                FinishStreet = Streets.FinishStreet,
                id = math.random(1,99999)
            }
        end
        self.Update()
    end
    function self.DeleteRoute(id)
        for key,value in pairs(self.Routes) do
            if (value.id == tonumber(id)) then
                self.Routes[key] = nil
                self.Update()
            end
        end
    end

    function self.Update()
        TriggerClientEvent("gfx-racing:updatenui",self.source, self, GFX.GetActiveRaces(), GFX.LeaderBoard, self.GetIncomingRaceData(), self.GetFavCar(), GFX.GetPlayerBankAmount(self.source))
    end
    GFX.Users[self.source] = self
end



GFX.CreateChar = function(source, identifier) 
    self = {}
    self.identifier = identifier
    self.Routes = {}
    self.RaceHistory = {}
    self.LastRace = "Uknown"
    self.Win = 0
    self.Lose = 0
    self.FavouriteCar = {}
    self.Distance = 0
    self.Steam = GetPlayerName(source)
    self.CharacterName = GFX.GetPlayerCharacterName(source)
    self.PlayerPhoto = GFX.GetProfilePhoto(source)
    self.IncomingRace = 0
    MySQL.insert('INSERT INTO gfx_racing (identifier, routes, racehistory, win, lose, favouritecar, distance, charname, incomingrace, lastrace, playerphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {self.identifier, json.encode(self.Routes), json.encode(self.RaceHistory), tonumber(self.Win), tonumber(self.Lose), json.encode(self.FavouriteCar), self.Distance, self.CharacterName, self.IncomingRace, self.LastRace, self.PlayerPhoto}, function(id)
        print("Player Created "..self.Steam)
    end)
    GFX.UserData(source, identifier, self)
    table.insert(GFX.LeaderBoard, {
        win = 0,
        lose = 0,
        distance = 0,
        charname = self.CharacterName,
        playerphoto = self.PlayerPhoto,
        identifier = self.identifier
    })
    table.sort(GFX.LeaderBoard, function(a, b)
        return tonumber(a.win) > tonumber(b.win)
    end)
end


GFX.AddActiveRaces = function(data, route, owner, id, luadate)
    anntext = " "..Config.Texts["createrace"].." "..data.Name.."!"
    TriggerClientEvent("gfx-racing-client:CreateRace", -1, data, route, id, anntext)
    table.insert(GFX.ActiveRaces, {data = data, route = route, owner = owner, id = id, players = {}, luadate = luadate})
end

GFX.RemoveActiveRace = function(id)
    for k,v in pairs(GFX.ActiveRaces) do
        if v.id == tonumber(id) then
            for i,j in pairs(v.players) do
                local user = GFX.GetUser(v.source)
                if user then
                    user.KickRace()
                end
            end
            table.remove(GFX.ActiveRaces, k)
            MySQL.query('DELETE FROM races WHERE id = ?', { tonumber(id) })
            TriggerClientEvent("gfx-racing:RemoveRacing",-1,id)
            break
        end
    end
end


GFX.GetActiveRaces = function()
    return GFX.ActiveRaces
end

GFX.CreateRace = function(source, gdata)
    local data = gdata.data
    local user = GFX.GetUser(source)
    if user then
        if user.IncomingRace ~= 0 then
            return TriggerClientEvent("gfx-racing:notify",source, Config.Texts["inracealready"])
        end
        luadate = gdata.luadate
        local route = user.GetRoute(tonumber(data.Others.Route))
        owner = user.identifier
        createdid = math.random(111,99999)
        MySQL.insert('INSERT INTO races (owner, name, reward, date, maxplayers, route, id, players, luadate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', {user.identifier, data.Name, data.Reward, data.Others.Time, data.Others.Players, json.encode(route), createdid, json.encode(players), luadate}, function(id)
            GFX.AddActiveRaces(data, route, owner, createdid, luadate)
            user.JoinRace(createdid)
            TriggerClientEvent("gfx-racing:notify",source, Config.Texts["creatednewrace"])
        end)
    end
end




RegisterServerEvent("gfx-racing:SetFavCar")
AddEventHandler("gfx-racing:SetFavCar", function(vehlabel)
    local user = GFX.GetUser(source)
    user.AddFavCar(vehlabel)
end)

RegisterServerEvent("gfx-racing-ServerOpenNUI")
AddEventHandler("gfx-racing-ServerOpenNUI", function()
    local source = source
    OpenMenu(source)
end)

function OpenMenu(source)
    local user = GFX.GetUser(source)
    if user then
        TriggerClientEvent("applytest",source, user, GFX.GetActiveRaces(), GFX.LeaderBoard, user.GetIncomingRaceData(), user.GetFavCar(), GFX.GetPlayerBankAmount(source))
    end
end
    

RegisterServerEvent("gfx-racing-server:CreateRace")
AddEventHandler("gfx-racing-server:CreateRace",function(data)
    local source = source
    local playermoney = GFX.GetPlayerBankAmount(source)
    local racereward = tonumber(data.data.Reward)
    if (playermoney >=  racereward) then
        GFX.RemoveMoney(source, racereward)
        GFX.CreateRace(source, data)
    end
end)

RegisterServerEvent("gfx-racing-server:JoinRace")
AddEventHandler("gfx-racing-server:JoinRace",function(id)
    local user = GFX.GetUser(source)
    user.JoinRace(tonumber(id))
end)

RegisterServerEvent("gfx-racing-server:leaverace")
AddEventHandler("gfx-racing-server:leaverace",function()
    local user = GFX.GetUser(source)
    user.LeaveRace()
end)


-- RegisterServerEvent("gfx-racing:setInterval")
-- AddEventHandler("gfx-racing:setInterval", function(timediff)
--     local user = GFX.GetUser(source)
--     if user.IncomingRace == 0 then return end
--     CheckTime(source, timediff)
-- end)


RegisterServerEvent("gfx-racing-server:AddRoute")
AddEventHandler("gfx-racing-server:AddRoute",function(routeData, Streets)
    local user = GFX.GetUser(source)
    if user then
        user.AddRoute(routeData.name, routeData.Routes, Streets)
    end
end)

RegisterServerEvent("gfx-racing:ClearRaceData")
AddEventHandler("gfx-racing:ClearRaceData",function(id)
    GFX.RemoveActiveRace(id)
end)




Citizen.CreateThread(function()
    while true do
        Citizen.Wait(3000)
        for k,v in pairs(GFX.ActiveRaces) do
            v.luadate = tonumber(v.luadate)
            local racetime = os.date("*t", v.luadate / 1000)
            local racetimeex = os.time{day= racetime.day, year=racetime.year, month=racetime.month, yday = racetime.yday, wday = racetime.wday, isdst = racetime.isdst,sec = racetime.sec , min = racetime.min, hour = racetime.hour}
            local curtime = os.time()
            local diff = os.difftime(racetimeex, curtime)
            hours = string.format("%0.f", math.floor(diff/3600));
            mins = string.format("%0.f", math.floor(diff/60 - (hours*60)));
            hours = tonumber(hours)
            mins = tonumber(mins)
            if (hours == 0 and mins <= 5 and mins > 0) then
                for i,j in pairs(v.players) do
                    local Player = GFX.GetUserFromIdentifier(j.identifier)
                    if Player then
                        Player.SendNotification(mins)
                    end
                end 
            end
            if diff < 0 then
                for i,j in pairs(v.players) do
                    local Player = GFX.GetUserFromIdentifier(j.identifier)
                    if Player then
                        local data = Player.GetIncomingRaceData()
                        GFX.StartRace(data)
                        Citizen.Wait(100)
                        GFX.RemoveActiveRace(v.id)
                        print("deleted race "..v.id)
                        break
                    end
                end
            end
        end
    end
end)
  

RegisterServerEvent("gfx-racing:SetDistance")
AddEventHandler("gfx-racing:SetDistance", function(newDistance)
    local user = GFX.GetUser(source)
    if newDistance < 1 then return end
    user.SetDistance(newDistance)
end)

RegisterServerEvent("gfx-racing:Server:DeleteRoute")
AddEventHandler("gfx-racing:Server:DeleteRoute", function(id) 
    local user = GFX.GetUser(source)
    if (id and user) then
        user.DeleteRoute(id)
    end
end)

GFX.GetFavoruiteCar = function(vehlist)
    if vehlist then
        table.sort(vehlist, function(a, b)
            return tonumber(a.count) > tonumber(b.count)
        end)
        return vehlist
    else
        return {}
    end
end



GFX.Save = function(source)
    if GFX.Users[source] then
        local Player = GFX.GetUser(source)
        MySQL.update('UPDATE gfx_racing SET routes = ?,racehistory = ?,win = ?, lose = ?, favouritecar = ?,distance = ?, charname = ?, incomingrace = ?, lastrace = ?, playerphoto = ?  WHERE identifier = ?', {json.encode(Player.Routes), json.encode(Player.RaceHistory), tonumber(Player.Win), tonumber(Player.Lose), json.encode(Player.FavouriteCar) , math.ceil(Player.Distance), Player.CharacterName, Player.IncomingRace, Player.LastRace, Player.PlayerPhoto,  Player.identifier}, function(affectedRows)
        end)
    end
    return false
end


GFX.GetUser = function(source)
   if GFX.Users[source] == nil then
        GFX.GetPlayer(source)
        while GFX.Users[source] == nil do
            Citizen.Wait(0)
        end
        return GFX.Users[source]
    end
    return GFX.Users[source]
end


GFX.GetUserFromIdentifier = function(identifier)
    for k,v in pairs(GFX.Users) do
        if v.identifier == identifier then
            return GFX.Users[v.source]
        end
    end
    return nil
end

GFX.CheckIncomingRace = function(id)
    if id == 0 then
        return 0
    end
    if (id ~= 0) then
        for k,v in pairs(GFX.ActiveRaces) do
            if v.id == tonumber(id) then
                return v.id
            end
        end
    end
    return 0
end