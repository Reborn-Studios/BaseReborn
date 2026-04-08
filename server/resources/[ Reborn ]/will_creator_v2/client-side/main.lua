local Users = {}
local lastPos = nil
local CreatorUser = {}
local nuiReady = false
local oldSkinData = nil
local LastCoords = nil
InMultichar = false
Server = Tunnel.getInterface("will_creator_v2")

function SendDebug(message)
    if Config.Debug then
        print("^3[Debug]^0 "..message)
    end
end

RegisterNuiCallback("NuiReady",function (data,cb)
    nuiReady = true
end)

function PlayCharacter(id)
    while not nuiReady do
        Wait(100)
    end
    SendDebug(("PlayCharacter: %s"):format(id or 'nil'))
    if Config.EnableMultichar then
        SendNUIMessage({ action = "Close:Route" })
        SetNuiFocus(false, false)
        InMultichar = false
    else
        local Chars = Server.Characters()
        if Chars and Chars[1] and Chars[1].skin and LoadModel(Chars[1].skin.gender) then
            SetPlayerModel(PlayerId(),Chars[1].skin.gender)
            SetPedComponentVariation(PlayerPedId(),5,0,0,1)
            ApplyCharData(PlayerPedId(),{
                skin = Chars[1].skin,
                clothes = Chars[1].clothes or {},
                tattoos = Chars[1].tattoos or {}
            })
        end
    end
    DoScreenFadeOut(500)
    while not IsScreenFadedOut() do
        Wait(10)
    end
    local ped = PlayerPedId()
    local hasSpawned, char = Server.PlayChar(id)
    if char and char.skin then
        TriggerServerEvent("will_creator_v2:inCreator",false)
        SkinData = char.skin
        if Config.EnableMultichar then
            SetTimeout(1500,function ()
                ApplyCharData(PlayerPedId(),char)
            end)
        end
        SendDebug(("First spawn: %s ID: %s"):format(hasSpawned or "nil",id or "nil"))
        LastCoords = Server.LastCoords()
        if not hasSpawned then
            OpenSpawnSelector()
        else
            Teleport(ped, LastCoords)
            SetPlayerInvincible(PlayerId(), false)
            SetEntityVisible(ped, true, false)
            DisableCam(SpawnCam)
            DoScreenFadeIn(500)
        end
        local mugshot = GetMugShotBase64()
        if mugshot then
            TriggerServerEvent("will_creator_v2:updateMugshot",mugshot)
        end
    else
        CreateCharacter()
    end
end

--------------------------------------------------------
--              SELECT CHARACTER
--------------------------------------------------------

function ShowCharacter(char)
    if char then
        IntroCam(char)
    end
end

function CharacterSelect()
    while not nuiReady do
        Wait(100)
    end
    SendDebug("Character Select")
    DoScreenFadeOut(500)
    Users = Server.Characters()
    SendDebug(("Users: %s"):format(json.encode(Users,{indent = true})))
    local ped = PlayerPedId()
	SetEntityVisible(ped,false,false)
    FreezeEntityPosition(ped,true)
    EnableMulticharCam()
    DoScreenFadeIn(500)
    SetFocusEntity(ped)
    SetNuiFocus(true,true)
    SendNUIMessage({
        action = "Change:Route",
        name = "CharacterSelector",
        message = {
            route = "/Character/Selector",
            arguments = {
                characters = Users
            }
        }
    })
    InMultichar = true
    TriggerServerEvent("will_creator_v2:inCreator",true)
    if Users[1] then
        ShowCharacter(Users[1])
    else
        IntroCam()
    end
    CreateThread(function()
        while InMultichar do
            SetWeatherTypeNow("EXTRASUNNY")
            SetWeatherTypePersist("EXTRASUNNY")
            SetWeatherTypeNowPersist("EXTRASUNNY")
            SetWeatherTypeNowPersist("EXTRASUNNY")
            NetworkOverrideClockTime(8, 0, 0)
            Wait(4)
        end
    end)
end

-- Criar personagem
RegisterNuiCallback("CharacterSelector::CreateCharacter", function(data,cb)
    local allowedToCreate = Server.TryCreateChar()
    if allowedToCreate then
        CreateCharacter()
        cb(true)
    else
        cb(false)
    end
end)

-- Selecionar personagem para aparecer na tela
RegisterNuiCallback("CharacterSelector::SelectCharacter", function(data)
    local id = tonumber(data.id)
    SendDebug(("NUI:: SelectCharacter ID: %s"):format(id or "nil"))
    for k,v in pairs(Users) do
        if tonumber(v.id) == id then
            ShowCharacter(v)
            break
        end
    end
end)

-- Entrar no servidor com personagem
RegisterNuiCallback("CharacterSelector::JoinServer", function(data)
    local id = data.id
    PlayCharacter(id)
end)

RegisterNuiCallback("CharacterSelector::DeleteCharacter", function(data,cb)
    local id = data.id
    local deleted = Server.DeleteChar(id)
    cb(deleted)
end)

--------------------------------------------------------
--              CREATOR
--------------------------------------------------------

function ChangeGender(gender)
    if not gender then gender = "mp_m_freemode_01" end
    Clothes = Config.DefaultClothes[gender]
    if not LocalPlayer.state["Barbershop"] then
        SkinData = Config.DefaultSkins[gender]
    end
    local name = (CreatorUser.name or "")..""
    CreatorUser = table.clone(SkinData)
    CreatorUser.gender = gender
    CreatorUser.name = name
    ChangeToSkin(gender)
    SetTimeout(1500,function ()
        SendNUIMessage({
            action = "UPDATE_TEXTURE",
            data = GetMaxValues()
        })
    end)
end

RegisterNetEvent("will_creator_v2:client:CreateCharacter")
AddEventHandler("will_creator_v2:client:CreateCharacter",function(gender)
	LocalPlayer["state"]:set("Barbershop",true,true)
    lastPos = GetEntityCoords(PlayerPedId())
    CreateCharacter(true,gender)
end)

function CreateCharacter(recreate,gender)
    SendDebug("Create Character")
    if Config.EnableMultichar then
        DisableCam(MulticharCam)
        SendNUIMessage({ action = "Close:Route" })
    end
    DoScreenFadeOut(1000)
    while not IsScreenFadedOut() do
        Wait(10)
    end
    ChangeGender(gender)
    Teleport(PlayerPedId(),Config.CreateCoords)
    DoScreenFadeIn(1000)
    while not IsScreenFadedIn() do
        Wait(10)
    end
    SetFocusEntity(PlayerPedId())
    SendNUIMessage({
        action = "Change:Route",
        name = "CharacterCreator",
        message = {
            route = "/Character/Creator",
            arguments = {}
        }
    })
    SetNuiFocus(true, true)
    TriggerServerEvent("will_creator_v2:inCreator",true,recreate)
    CreateCamera()
    InterpCamera("head")
end

RegisterNuiCallback("CharacterCreator::MenuVariables", function(data,cb)
    local menu = data.menu
    local optIndex = tonumber(data.optIndex)
    local event = nil
    local value = nil
    if optIndex and optIndex >= 0 then
        optIndex = optIndex + 1
        local option = menu.options[optIndex]
        event = option.event
        value = option.value
    else
        event = menu.event
        value = menu.value
    end
    SendDebug(("CharacterCreator::MenuVariables: %s - %s"):format(event or "nil",value or "nil"))
    if event and value then
        if event == "gender" then
            ChangeGender(value)
        elseif event ~= "name" then
            value = tonumber(value) or 0
        end
        CreatorUser[event] = value
        if SkinData[event] then
            if value == 1.0 or value == 2.0 then
                value = (value * 100) / 100
            end
            SkinData[event] = value
            if event ~= "gender" then
                ApplyCustomization(PlayerPedId(), SkinData)
            end
        elseif event ~= "gender" then
            if Clothes[event] then
                Clothes[event].item = value
                if Variations[event] then
                    local ped = PlayerPedId()
                    local MaxModels = 0
                    local id = Variations[event].id
                    if Variations[event].type == "prop" then
                        MaxModels = GetNumberOfPedPropTextureVariations(ped,id,GetPedPropIndex(ped,id)) - 1
                    elseif Variations[event].type == "variation" then
                        MaxModels = GetNumberOfPedTextureVariations(ped,id,GetPedDrawableVariation(ped,id))
                    end
                    SendNUIMessage({
                        action = "UPDATE_CLOTH_TEXTURE",
                        data = {
                            event = event.."Texture",
                            texture = MaxModels
                        }
                    })
                end
            else
                local texture = event:gsub("texture", "")
                if texture and Clothes[event] then
                    Clothes[texture].texture = value
                end
            end
            ApplyClothes(PlayerPedId(),Clothes)
        end
    end
    cb(true)
end)

RegisterNuiCallback("CharacterCreator::CameraZoom", function(data,cb)
    -- print(json.encode(data))
end)

local function splitString(str,symbol)
	local number = 1
	local tableResult = {}
	if symbol == nil then
		symbol = "-"
	end
	for str in string.gmatch(str,"([^"..symbol.."]+)") do
		tableResult[number] = str
		number = number + 1
	end
	return tableResult
end

RegisterNuiCallback("CharacterCreator::SaveCharacter", function(data,cb)
    if CreatorUser.name then
        local fullName = splitString(CreatorUser.name," ")
        if not fullName[2] then
            fullName[2] = " "
        end
        if not fullName[1] or not fullName[2] or string.len(fullName[1]) < 3 or string.len(fullName[2]) < 3 then
            cb(false)
            return
        end
        SendDebug(("CharacterCreator::SaveCharacter: %s"):format(json.encode(CreatorUser,{indent = true})))
        CreatorUser.firstname = fullName[1]
        CreatorUser.lastname = fullName[2]
        SendNUIMessage({ action = "Close:Route" })
        SetNuiFocus(false, false)
        DisableCam(CreatorCam)
        DoScreenFadeOut(1000)
        while not IsScreenFadedOut() do
            Wait(10)
        end
        if lastPos and lastPos.x then
            Teleport(PlayerPedId(),lastPos.x, lastPos.y, lastPos.z)
        else
            Teleport(PlayerPedId(),Config.SpawnCoords)
        end
        SetPlayerInvincible(PlayerId(), false)
        SetEntityVisible(PlayerPedId(), true, false)
        DoScreenFadeIn(1000)
        InMultichar = false
        Server.SaveCharacter(CreatorUser,ConvertClothes(Clothes))
        TriggerServerEvent("will_creator_v2:inCreator",false)
        CreatorUser.name = nil
        cb(true)
    elseif LocalPlayer.state["Barbershop"] then
        SendDebug(("CharacterCreator::SaveCharacter: %s"):format(json.encode(SkinData,{indent = true})))
        SendNUIMessage({ action = "Close:Route" })
        SetNuiFocus(false, false)
        DisableCam(CreatorCam)
        SetPlayerInvincible(PlayerId(), false)
        Server.SaveCharacter(SkinData)
        ClearPedTasks(PlayerPedId())
        local mugshot = GetMugShotBase64()
        if mugshot then
            TriggerServerEvent("will_creator_v2:updateMugshot",mugshot)
        end
        cb(true)
    else
        cb(false)
    end
end)

RegisterNUICallback("CharacterCreator::RotatePed", function(data)
    local ped = PlayerPedId()
    local heading = GetEntityHeading(ped)
    if data.mode == "right" then
        SetEntityHeading(ped, heading + 20)
    elseif data.mode == "left" then
        SetEntityHeading(ped, heading - 20)
    end
end)

RegisterNuiCallback("CharacterCreator::CameraHeight",function(data,cb)
    -- print('CameraHeight', data.x, data.y)
end)

--------------------------------------------------------
--              SPAWN SELECTOR
--------------------------------------------------------

function OpenSpawnSelector()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "Change:Route",
        name = "SpawnSelector",
        message = {
            route = "/Spawn/Selector",
            arguments = {
                spawns = SpawnPoints()
            }
        }
    })
end

local function spawnChar(spawn)
    SendNUIMessage({ action = "Close:Route" })
    SetNuiFocus(false, false)
    DisableCam(SpawnCam)
    DoScreenFadeOut(800)
    while not IsScreenFadedOut() do
        Wait(10)
    end
    Teleport(PlayerPedId(), spawn)
    SetPlayerInvincible(PlayerId(), false)
    SetEntityVisible(PlayerPedId(), true, false)
    DoScreenFadeIn(800)
end

RegisterNuiCallback("SpawnSelector::SelectSpawn", function(data,cb)
    spawnChar(data)
    cb(true)
end)

RegisterNuiCallback("SpawnSelector::SelectLastSpawn",function(data,cb)
    spawnChar(LastCoords)
    cb(true)
end)

RegisterNuiCallback("CharacterSelector::RouteChanged", function(data)
    -- print('CharacterSelector',data.name)
end)

RegisterNuiCallback("CharacterCreator::RouteChanged", function(data)
    -- print('CharacterCreator',data.name)
end)

RegisterNuiCallback("SpawnSelector::RouteChanged", function(data)
    -- print('SpawnSelector',data.name)
end)

--------------------------------------------------------
--              BARBERSHOP
--------------------------------------------------------

function OpenBarbershop()
	LocalPlayer["state"]:set("Barbershop",true,true)
    oldSkinData = table.clone(SkinData)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "Change:Route",
        name = "CharacterCreator",
        message = {
            route = "/Character/Creator",
            arguments = {}
        }
    })
    CreateCamera()
    InterpCamera("head")
    SetFacialIdleAnimOverride(PlayerPedId(), "pose_normal_1", "")
    Wait(200)
    SendNUIMessage({
        action = "OPEN_BARBERSHOP",
        data = Config.BarberCategories
    })
    Wait(200)
    SendNUIMessage({
        action = "UPDATE_GENDER",
        data = GetEntityModel(PlayerPedId()) == GetHashKey("mp_m_freemode_01") and "mp_m_freemode_01" or "mp_f_freemode_01"
    })
    Wait(200)
    local disabledCategories = Server.checkCategories()
    SendNUIMessage({
        action = "UPDATE_TEXTURE",
        data = GetMaxValues(disabledCategories)
    })
end

RegisterNuiCallback("Barbershop::Close",function(data,cb)
    if LocalPlayer.state["Barbershop"] then
        SendNUIMessage({ action = "Close:Route" })
        SetNuiFocus(false, false)
        DisableCam(CreatorCam)
        ClearPedTasks(PlayerPedId())
        if oldSkinData then
            SkinData = table.clone(oldSkinData)
            ApplyCustomization(PlayerPedId(), oldSkinData)
            SetPlayerInvincible(PlayerId(), false)
        end
	    LocalPlayer["state"]:set("Barbershop",false,true)
        cb(true)
    end
end)

--------------------------------------------------------
--              ADMIN PAINEL
--------------------------------------------------------

local Answers = {}
local mugshotId = 0
local playerModel = nil
local MugshotsCache = {}

function OpenAdminPainel()
    SendNUIMessage({
        action = "Change:Route",
        name = "AdminPainel",
        message = {
            route = "/Admin",
            arguments = {}
        }
    })
    SetNuiFocus(true, true)
end

RegisterNuiCallback("AdminPainel::GetCharacters",function (data,cb)
    local AdmUsers = Server.GetUsers()
    cb(AdmUsers)
end)

RegisterNuiCallback("AdminPainel::Close",function (data,cb)
    SendNUIMessage({ action = "Close:Route" })
    SetNuiFocus(false, false)
    if playerModel then
        DeleteEntity(playerModel)
        playerModel = nil
        SetFrontendActive(false)
        ReplaceHudColourWithRgba(117, 31, 31, 31, 100)
    end
end)

RegisterNuiCallback("AdminPainel::GetBarbershops",function (data,cb)
    cb(Barbershops)
end)

RegisterNuiCallback("AdminPainel::RegisterBarbershops",function (data,cb)
    SendNUIMessage({ action = "Close:Route" })
    SetNuiFocus(false, false)
    local coords = GetBlipCoords()
    if coords then
        data.coords = coords
        Server.registerBarberShop(data)
    end
end)

RegisterNuiCallback("AdminPainel::DeleteBarbershops",function (data,cb)
    Server.deleteBarberShop(data.id)
    cb(true)
end)

RegisterNuiCallback("AdminPainel::SendCreatorCharacter",function (data,cb)
    local id = tonumber(data.id)
    Server.sendToCreator(id)
end)

RegisterNuiCallback("AdminPainel::Teleport",function (data,cb)
    Teleport(PlayerPedId(),data.coords.x,data.coords.y,data.coords.z)
end)

RegisterNuiCallback("AdminPainel::ViewCharacter",function (data,cb)
    local id = data.id
    local Char = Server.GetChar(id)
    SendDebug(("ViewCharacter: %s"):format(json.encode(Char,{indent = true})))
    if Char then
        CreatePedScreen(Char, true)
    end
end)

RegisterNuiCallback("AdminPainel::DeleteChar",function(data,cb)
    if playerModel then
        DeleteEntity(playerModel)
        playerModel = nil
        SetFrontendActive(false)
        ReplaceHudColourWithRgba(117, 31, 31, 31, 100)
    end
end)

function CreatePedScreen(Char, refresh)
    if playerModel then
        DeleteEntity(playerModel)
        playerModel = nil
        SetFrontendActive(false)
        ReplaceHudColourWithRgba(117, 31, 31, 31, 100)
        if not refresh then
            return
        else
            Wait(100)
        end
    end
    SetFrontendActive(true)
    ActivateFrontendMenu(GetHashKey("FE_MENU_VERSION_EMPTY_NO_BACKGROUND"), true, -1)
    Wait(100)
    SetMouseCursorVisibleInMenus(false)
    local x,y,z = table.unpack(GetEntityCoords(PlayerPedId()))
    playerModel = CreatePed(2, GetHashKey(Char["skin"].gender), x, y, z, 0, false, false)
    ApplyCustomization(playerModel, Char["skin"])
    if Char["clothes"] then
        ApplyClothes(playerModel, Char["clothes"])
    end
    if Char["tattoos"] then
        for index,overlay in pairs(Char["tattoos"]) do
            SetPedDecoration(PlayerPedId(),GetHashKey(overlay[1]),GetHashKey(index))
        end
    end
    SetEntityCoords(playerModel, x,y,z - 10,false,false,false,false)
    FreezeEntityPosition(playerModel, true)
    SetEntityVisible(playerModel, false, false)
    NetworkSetEntityInvisibleToNetwork(playerModel, false)
    Wait(200)
    SetPedAsNoLongerNeeded(playerModel)
    GivePedToPauseMenu(playerModel, 1)
    SetPauseMenuPedLighting(true)
    SetPauseMenuPedSleepState(true)
    ReplaceHudColourWithRgba(117, 0, 0, 0, 0)
end

RegisterNUICallback('Answer', function(data)
    if MugshotsCache[data.Id] then
        UnregisterPedheadshot(MugshotsCache[data.Id])
        MugshotsCache[data.Id] = nil
    end
    Answers[data.Id]:resolve(data.Answer)
    Answers[data.Id] = nil
end)

function GetMugShotBase64()
    local Ped = PlayerPedId()
    mugshotId = mugshotId + 1

    local Handle = RegisterPedheadshotTransparent(Ped)
    if Handle == nil or Handle == 0 then Handle = RegisterPedheadshot(Ped) end

    local timer = 2000
    while ((not Handle or not IsPedheadshotReady(Handle) or not IsPedheadshotValid(Handle)) and timer > 0) do
        Wait(10)
        timer = timer - 10
    end

    local MugShotTxd = 'none'
    if (IsPedheadshotReady(Handle) and IsPedheadshotValid(Handle)) then
        MugshotsCache[mugshotId] = Handle
        MugShotTxd = GetPedheadshotTxdString(Handle)
    end
    SendNUIMessage({
        action = 'convert',
        pMugShotTxd = MugShotTxd,
        id = mugshotId,
    })
    local p = promise.new()
    Answers[mugshotId] = p
    return Citizen.Await(p)
end
