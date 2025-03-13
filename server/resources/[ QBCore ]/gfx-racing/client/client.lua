RouteList = {}
racedatac = {}
inrace = false
RaceRouteProgress = {}
RaceLeaderBoard = 0
racerspeds = {}
local mpGamerTags = {}
raceBlip = {}
CheckPointStatus = {}
distanceTraveled = 0
lastLocation = nil
percentagecounter = 0
distancenewwaypoint = 0

RegisterNUICallback("CloseUi",function(data, cb)
    SetNuiFocus(false, false)
end)

RegisterCommand(Config.Texts["openui"].command, function()
    TriggerServerEvent("gfx-racing-ServerOpenNUI")
end, false)


RegisterKeyMapping(Config.Texts["openui"].command, Config.Texts["openui"].text, 'keyboard', Config.Texts["openui"].key)



RegisterNUICallback('AddMarker', function(data)
    if #RouteList + 1 > Config.MaximumRouteCount then
        return TriggerEvent("gfx-racing:notify", Config.Texts["maxroute"])
    end
    RouteList[#RouteList+1] = {x = data.x, y = data.y}
end)

RegisterNUICallback('UpdateMarker', function(data)
    if RouteList[tonumber(data.id)] then
        RouteList[tonumber(data.id)] = {x = data.x, y = data.y}
    end
end)

RegisterNUICallback('DeleteRoute', function(data)
    if (data.id) then
        TriggerServerEvent("gfx-racing:Server:DeleteRoute", data.id)
    end
end)

RegisterNetEvent("gfx-racing:NewRaceNotf")
AddEventHandler("gfx-racing:NewRaceNotf", function(text)
    SendNUIMessage({
        message = 'NewRaceNotf',
        text = text
    })
end)


RegisterNUICallback('AddRoute', function(data)
    if #RouteList < Config.MinimumRouteCountForAddRoute then
        return TriggerEvent("gfx-racing:notify", Config.Texts["needmoreroute"])
        
    end
    Streets = {}
    data.Routes = RouteList
    local streetnamehashF = GetStreetNameAtCoord(RouteList[#RouteList].x,RouteList[#RouteList].y,0.0)
    Streets.FinishStreet = GetStreetNameFromHashKey(streetnamehashF)
    local streetnamehashS = GetStreetNameAtCoord(RouteList[1].x,RouteList[1].y,0.0)
    Streets.StartStreet = GetStreetNameFromHashKey(streetnamehashS)
    TriggerServerEvent("gfx-racing-server:AddRoute",data, Streets)
    RouteList = {}
end)


RegisterNUICallback('ClearRouteData', function()
    RouteList = {}
end)


RegisterNetEvent("gfx-racing:Client:FinishRace")
AddEventHandler("gfx-racing:Client:FinishRace", function(rank)
    TriggerEvent("gfx-racing:notify", Config.Texts["finishrace"])
    SetWaypointOff()
    ClearGpsMultiRoute()
    SendNUIMessage({
        message = 'closeleaderboard',
    })
end)

RegisterNetEvent("gfx-racing:notify")
AddEventHandler("gfx-racing:notify", function(text, time)
    SendNUIMessage({
        message = "SendNotification",
        text = text,
        time = time or 4000
    })
end)

RegisterNetEvent("gfx-racing:SetMarker")
AddEventHandler("gfx-racing:SetMarker", function(coordtable)
    SetNewWaypoint(coordtable[1], coordtable[2])
end)

RegisterNetEvent("gfx-racing:SetRaceLeaderBoard")
AddEventHandler("gfx-racing:SetRaceLeaderBoard", function(leaderboard)
    SendNUIMessage({
        message = 'refreshleaderboardpage',
        leaderboard = leaderboard,
        lap = #CheckPointStatus.."/"..#RaceRouteProgress,
        percentage = percentagecounter
    })
end)

RegisterNetEvent("gfx-racing:UpdateRacers")
AddEventHandler("gfx-racing:UpdateRacers", function(id)
    if racerspeds then
        for k,v in pairs(racerspeds) do
            if v.id == id then
                table.remove(racerspeds, k)
            end
        end
    end
end)

RegisterNetEvent("gfx-racing:RemoveRacing")
AddEventHandler("gfx-racing:RemoveRacing", function(id)
    SendNUIMessage({
        message = 'removeracing',
        id = id
    })
end)

RegisterNUICallback('CreateRace', function(data)
    TriggerServerEvent("gfx-racing-server:CreateRace", data)
end)

RegisterNUICallback('leaverace', function(data)
    TriggerServerEvent("gfx-racing-server:leaverace")
end)

RegisterNUICallback("setinterval",function(data)
    local timediff = data.timediff
--StartInterval(timediff)
    --TriggerServerEvent("gfx-racing:setInterval", timediff)
end)

RegisterNUICallback("updateinterval",function(data)
    local timediff = data.timediff
    TriggerServerEvent("gfx-racing:setInterval", timediff)
end)

RegisterNetEvent("applytest")
AddEventHandler("applytest",function(data, activeraces, LeaderBoard, incomingrace, favouritecar, bankmoney)
    SendNUIMessage({
        message = 'OpenNui',
        data = data,
        activeraces = activeraces,
        LeaderBoard = LeaderBoard,
        incomingrace = incomingrace,
        favouritecar = favouritecar,
        bankmoney = bankmoney
    })
    SetNuiFocus(true, true)
end)

RegisterNetEvent("gfx-racing:updatenui")
AddEventHandler("gfx-racing:updatenui",function(data, activeraces, LeaderBoard, incomingrace, favouritecar, bankmoney)
    SendNUIMessage({
        message = 'update',
        data = data,
        activeraces = activeraces,
        LeaderBoard = LeaderBoard,
        incomingrace = incomingrace,
        favouritecar = favouritecar,
        bankmoney = bankmoney
    })
end)



RegisterNetEvent("gfx-racing-client:RefreshActiveRaces")
AddEventHandler("gfx-racing-client:RefreshActiveRaces",function(activeraces)
    SendNUIMessage({
        message = 'RefreshActive',
        activeraces = activeraces,
    })
end)


RegisterNetEvent("gfx-racing-client:CreateRace")
AddEventHandler("gfx-racing-client:CreateRace",function(data, route, id, text)
    SendNUIMessage({
        message = 'AddRace',
        data = data,
        route = route,
        id = id,
        text = text
    })
end)

RegisterNUICallback("JoinRace", function(data)
    TriggerServerEvent("gfx-racing-server:JoinRace", data.id)
end)

RegisterNetEvent("gfx-racing:StartRace")
AddEventHandler("gfx-racing:StartRace", function(racedata, userlist)
    TriggerEvent("gfx-racing:notify", Config.Texts["racestartin"])
    local timer = 30000
    while timer > 0 do
        Citizen.Wait(1000)
        timer = timer - 1000
    end
    racedatac = racedata
    racers = userlist
    inrace = true
    racerspeds = userlist
    if Config.ShowPlayerNamesInRace then
        ShowPlayerNames(racerspeds)
    end
    AddBlips()
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped, false)
    local pedcoord = GetEntityCoords(ped)
    for k,v in ipairs(racedatac.route) do
        status = false
        if k == 1 then status = true end
        RaceRouteProgress[k] = {status = status, x = v.x, y = v.y}
    end
    SetConfig()
    countdown = 10000
    FreezeEntityPosition(veh, true)
    local count = 10
    while countdown > 0 do
        countdown = countdown - 1000
        SendNUIMessage({
            message = "Countdown",
            count = count
        })
        count = count - 1
        Citizen.Wait(1000)
    end
    lastLocation = vector2(pedcoord.x, pedcoord.y)
    FreezeEntityPosition(veh, false)
    if (veh ~= 0) then
        local vehmodel = GetDisplayNameFromVehicleModel(GetEntityModel(veh))
        TriggerServerEvent("gfx-racing:SetFavCar", vehmodel)
    end

    StartRace()
end)



-- RegisterNetEvent("gfx-racing:StartRaceN")
-- AddEventHandler("gfx-racing:StartRaceN",function(usersTable)
--     if (racedatac) then
--         racerspeds = usersTable
--         for k,v in pairs(usersTable) do
--             if v.incoord then
--                 table.insert(racerspeds, {id = v.id, name = v.name})
--             end
--         end
--         if Config.ShowPlayerNamesInRace then
--             ShowPlayerNames(racerspeds)
--         end
--         local ped = PlayerPedId()
--         local veh = GetVehiclePedIsIn(ped, false)
--         FreezeEntityPosition(veh, true)
--         for k,v in ipairs(racedatac.route) do
--             status = false
--             if k == 1 then status = true end
--             RaceRouteProgress[k] = {status = status, x = v.x, y = v.y}
--         end
--         SetConfig()
--         countdown = 10000
--         local count = 10
--         while countdown > 0 do
--             countdown = countdown - 1000
--             SendNUIMessage({
--                 message = "Countdown",
--                 count = count
--             })
--             count = count - 1
--             Citizen.Wait(1000)
--         end
        
--         FreezeEntityPosition(veh, false)
--         StartRace()
--     end
-- end)

local blips = {}
function addBlip(pos, displayNum, isFinishOrStart)
  local blip = AddBlipForCoord(pos[1], pos[2], 0.0)
  if isFinishOrStart then
    SetBlipSprite(blip, 38)
    SetBlipColour(blip, 4)
  else
    ShowNumberOnBlip(blip, displayNum)
    SetBlipColour(blip, 7)
  end
  SetBlipDisplay(blip, 8)
  SetBlipScale(blip, 0.8)
  SetBlipAsShortRange(blip, true)
  blips[#blips + 1] = blip
  return blip
end


DeleteBlip = function(id)
    if (id) then
        RemoveBlip(id)
    end
end

SetConfig = function()
    SetWaypointOff()
    ClearGpsMultiRoute()
    --StartGpsMultiRoute(142, true, false)
    for k,v in pairs(RaceRouteProgress) do
        if k ~= 1 then
      --      AddPointToGpsMultiRoute(v.x, v.y, 30.0)
            SetBlipAsShortRange(blip, false)
        end
    end
    --SetGpsMultiRouteRender(true)
end


function addCheckpointBlip(checkpointNum)
    if RaceRouteProgress[checkpointNum] then
        return addBlip(
            {RaceRouteProgress[checkpointNum].x, RaceRouteProgress[checkpointNum].y},
            checkpointNum,
            checkpointNum == #RaceRouteProgress
          )
    end
    --AddPointToGpsMultiRoute(RaceRouteProgress[checkpointNum].x, RaceRouteProgress[checkpointNum].y, 100.0)
end




StartRace = function()
    StartLeaderBoard()
    if (racedatac) then
        while true do
            local wait = 3
            local ped = GetEntityCoords(PlayerPedId())
            local vec2pedcoord = vector2(ped.x, ped.y)
            for k,v in ipairs(RaceRouteProgress) do
                local check = IsEntityAtCoord(PlayerPedId(), v.x,v.y,ped.z, 40.0, 40.0, 1000.0, 0,1,0)
                if not RaceRouteProgress[k-1] then -- start 
                    if not raceBlip[k] then
                        CheckPointStatus[k] = addCheckpointBlip(k+1)
                        raceBlip[k] = true
                        percentagecounter += math.ceil((100/ #RaceRouteProgress))
                    end
                    local newwaypointcoord = vector2(RaceRouteProgress[k+1].x, RaceRouteProgress[k+1].y)
                    distancenewwaypoint = #(vec2pedcoord - newwaypointcoord)
                end
                if check then
                    if (RaceRouteProgress[k-1] and RaceRouteProgress[k-1].status) then
                        RaceRouteProgress[k].status = true
                        if not raceBlip[k] then
                            if RaceRouteProgress[k+1] then
                                raceBlip[k] = true
                                CheckPointStatus[k] = addCheckpointBlip(k+1)
                                DeleteBlip(CheckPointStatus[k-1])
                                percentagecounter += math.ceil((100/ #RaceRouteProgress))
                            end
                        end
                        if RaceRouteProgress[k+1] then
                            local newwaypointcoord = vector2(RaceRouteProgress[k+1].x, RaceRouteProgress[k+1].y)
                            distancenewwaypoint = #(vec2pedcoord - newwaypointcoord)
                        end
                    end
                end
                if v.status then
                    if RaceRouteProgress[k+1] == nil then
                        CheckPointStatus[k] = true
                        FinishRace()
                        break
                    end
                end

                
            end
            if Config.VehicleCollision then
                SetCollisions(racerspeds, true)
            end
            Citizen.Wait(wait)
        end
    end
end



StartLeaderBoard = function() 
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(3000)
            if (racedatac and lastLocation) then
                local plycoord = GetEntityCoords(PlayerPedId())
                local startPos = lastLocation
                local newPos = vector2(plycoord.x, plycoord.y)
                if startPos ~= newPos then
                    local newDistance = #(startPos - newPos)
                    lastLocation = newPos
                    distanceTraveled += (newDistance/1609)
                end
                local lastroute = racedatac.route[#racedatac.route]
                local estdst = vector3(lastroute.x, lastroute.y, 0.0)
                
                local diff = #(estdst - plycoord)
                TriggerServerEvent("gfx-racing-SetRaceLeaderBoard", racedatac.id,  #CheckPointStatus, distanceTraveled, distancenewwaypoint)
            end
        end
    end)
end


AddBlips = function()
    -- for k,v in pairs(racedatac.route) do
    --     if not raceBlip[k] then
    --         Blip = AddBlipForCoord(v.x,v.y,v.z)
    --         SetBlipSprite(Blip,1)
    --         SetBlipScale(Blip,0.6)
    --         SetBlipColour(Blip,11) 
    --         SetBlipDisplay(Blip, 4)
    --         SetBlipAsShortRange(Blip, true)
    --         BeginTextCommandSetBlipName("STRING")
    --         AddTextComponentSubstringPlayerName("Test")
    --         EndTextCommandSetBlipName(Blip)
    --     end
    -- end
end




RegisterNUICallback("clearracedata", function(data)
    TriggerServerEvent("gfx-racing:ClearRaceData", data.id)
end)

StartInterval = function(timediff) 
    Citizen.CreateThread(function()
        while not inrace do
            local wait = 6000
            SendNUIMessage({
                message = 'updateinterval',
                time = timediff
            })
            Citizen.Wait(wait)
        end
    end)
end

ShowPlayerNames = function(racersc)
    for k,v in pairs(racersc) do
        RenderNames(v)
    end
end

local gtComponent = {
    GAMER_NAME = 0,
    CREW_TAG = 1,
    healthArmour = 2,
    BIG_TEXT = 3,
    AUDIO_ICON = 4,
    MP_USING_MENU = 5,
    MP_PASSIVE_MODE = 6,
    WANTED_STARS = 7,
    MP_DRIVER = 8,
    MP_CO_DRIVER = 9,
    MP_TAGGED = 10,
    GAMER_NAME_NEARBY = 11,
    ARROW = 12,
    MP_PACKAGES = 13,
    INV_IF_PED_FOLLOWING = 14,
    RANK_TEXT = 15,
    MP_TYPING = 16
}

SetCollisions = function(_, bool)
    local racevehicles = {}
    for k,v in pairs(racerspeds) do
        local i = GetPlayerFromServerId(v.id)
        local ped = GetPlayerPed(i)
        local veh = GetVehiclePedIsIn(ped, false)
        if veh and veh ~= 0 then
            table.insert(racevehicles, veh)
        end
    end
    local userCar = GetVehiclePedIsIn(PlayerPedId(), false)
    local ped = PlayerPedId()
        for _, vehicle in pairs(racevehicles) do
            if vehicle and vehicle ~= -1 then
                if DoesEntityExist(vehicle) and vehicle ~= userCar then
                    SetEntityNoCollisionEntity(userCar, vehicle, bool)
                end
                -- if userCar and DoesEntityExist(userCar) then
                --     SetEntityNoCollisionEntity(vehicle, userCar, bool)
                -- end
            end
        end
end



function RenderNames(data)
    local i = GetPlayerFromServerId(data.id)
    --if NetworkIsPlayerActive(i) and i ~= PlayerId() then
    if NetworkIsPlayerActive(i) and i ~= PlayerId() then
        if i ~= -1 then
            -- get their ped
            local ped = GetPlayerPed(i)
            local pedCoords = GetEntityCoords(ped)
            local health = GetEntityHealth(ped) - 100
            health = health >= 0 and health or GetEntityHealth(ped)
            if not mpGamerTags[i] or mpGamerTags[i].ped ~= ped or not IsMpGamerTagActive(mpGamerTags[i].tag) then
                if not mpGamerTags[i] or not IsMpGamerTagActive(mpGamerTags[i].tag) then
                    local nameTag = data.name
                    if mpGamerTags[i] then
                        RemoveMpGamerTag(mpGamerTags[i].tag)
                    end
                    mpGamerTags[i] = {
                        tag = CreateMpGamerTag(GetPlayerPed(i), nameTag, false, false, '', 0),
                        ped = ped
                    }
                end
            end
            local tag = mpGamerTags[i].tag
            local distance = #(pedCoords - GetEntityCoords(ped))
            if distance < 100 then
                SetMpGamerTagVisibility(tag, gtComponent.GAMER_NAME, true)
            else
                SetMpGamerTagVisibility(tag, gtComponent.GAMER_NAME, false)
            end
        end
    end
end

function RemoveGamerTags()
    for k,v in pairs(mpGamerTags) do
        RemoveMpGamerTag(v.tag)
    end
    mpGamerTags = {}
end




FinishRace = function()
    TriggerServerEvent("gfx-racing-FinishRace", racedatac)
    RemoveGamerTags()
    for k,v in pairs(blips) do
        RemoveBlip(v)
    end
    RouteList = {}
    racedatac = {}
    inrace = false
    RaceRouteProgress = {}
    RaceLeaderBoard = 0
    racerspeds = {}
    mpGamerTags = {}
    raceBlip = {}
    CheckPointStatus = {}
    distanceTraveled = 0
    lastLocation = nil
    percentagecounter = 0
end
