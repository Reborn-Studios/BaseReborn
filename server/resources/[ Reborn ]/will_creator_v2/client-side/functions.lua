-- #########################
--      INITIATION
-- #########################

Barbershops = GlobalState["Barbershops"] or {}

local aliasClothes = {
    ["torso"] = "arms",
    ["undershirts"] = "tshirt",
    ["legs"] = "pants",
    ["parachutes"] = "backpack",
    ["accessories"] = "accessory",
    ["tops"] = "torso",
    ["hats"] = "hat",
    ["glasses"] = "glass",
    ["watches"] = "watch",
    ["bracelets"] = "bracelet"
}

CreateThread(function()
    DoScreenFadeOut(0)
    ClearPedTasks(PlayerPedId())
    while true do
        Wait(100)
        if NetworkIsSessionActive() or NetworkIsPlayerActive(PlayerId()) then
            if GetResourceState("spawnmanager") == "started" then
                exports['spawnmanager']:setAutoSpawn(false)
            end
            -- Desativar hud
            TriggerEvent("hudActived",false)
            TriggerEvent("hud:Active",false)
            if Config.EnableMultichar then
                CharacterSelect()
            else
                ShutdownLoadingScreen()
                ShutdownLoadingScreenNui()
                Wait(2000)
                PlayCharacter()
            end
            break
        end
    end
end)

function ApplyCustomization(Ped, Data)
    SendDebug(("ApplyCustomization - %s | %s"):format(Data["parent1"],Data["parent2"]))
    if Data and Data["parent1"] then
        -- Caracteristicas da face
        SetPedHeadBlendData(Ped, Data["parent1"], Data["parent2"], 0, Data["shape1"], Data["shape2"], 0, Data["similarity"], Data["skinSimilarity"], 0, true)
        -- Olhos
        SetPedEyeColor(Ped, Data["eyeColor"])
        -- Cabelo
        SetPedComponentVariation(Ped, 2, Data["hair"] or 0, 0, 0)
        SetPedHairColor(Ped, Data["hairColor"], Data["hairColor2"])
        -- Barba
        SetPedHeadOverlay(Ped, 1, Data["beard"], 1.0)
        SetPedHeadOverlayColor(Ped, 1, 1, Data["beardColor"], 0)
        -- Sobrancelha
        SetPedHeadOverlay(Ped, 2, Data["eyebrowsStyle"], Data["eyebrowsOpacity"])
        SetPedHeadOverlayColor(Ped, 2, 1, Data["eyebrowsColor"], Data["eyebrowsColor2"])
        -- Rugas
        SetPedHeadOverlay(Ped, 3, Data["wrinkles"], Data["wrinklesOpacity"])
        -- Maquiagem
        SetPedHeadOverlay(Ped, 4, Data["makeup"], 1.0)
        -- Blush
        SetPedHeadOverlay(Ped, 5, Data["blush"], 1.0)
        SetPedHeadOverlayColor(Ped, 5, 2, Data["blushColor"], 0)
        -- Manchas
        SetPedHeadOverlay(Ped, 6, Data["aspect"], 1.0)
        -- Pele
        SetPedHeadOverlay(Ped, 7, Data["skin"], 1.0)
        -- Labios
        SetPedHeadOverlay(Ped, 8, Data["lipstick"], 1.0)
        SetPedHeadOverlayColor(Ped, 8, 2, Data["lipstickColor"],  0)
        -- Sardas
        SetPedHeadOverlay(Ped, 9, Data["freckles"], 1.0)
        -- Pelo corporal
        SetPedHeadOverlay(Ped, 10, Data["bodyHair"], 1.0)
        SetPedHeadOverlayColor(Ped, 10, 1, Data["bodyHairColor"], 0)
        -- Manchas
        SetPedHeadOverlay(Ped, 11, Data["blemishes1"], 1.0)
        SetPedHeadOverlay(Ped, 12, Data["blemishes2"], 1.0)
        -- Nariz
        SetPedFaceFeature(Ped, 0, Data["noseWidth"])
        SetPedFaceFeature(Ped, 1, Data["noseHeight"])
        SetPedFaceFeature(Ped, 2, Data["noseLength"])
        SetPedFaceFeature(Ped, 3, Data["noseBridge"])
        SetPedFaceFeature(Ped, 4, Data["noseTip"])
        SetPedFaceFeature(Ped, 5, Data["noseShift"])
        -- Sobrancelha
        SetPedFaceFeature(Ped, 6, Data["eyebrowsHeight"])
        SetPedFaceFeature(Ped, 7, Data["eyebrowsWidth"])
        -- Bochecha
        SetPedFaceFeature(Ped, 8, Data["cheekHeight"])
        SetPedFaceFeature(Ped, 9, Data["cheekWidth"])
        SetPedFaceFeature(Ped, 10, Data["cheekboneWidth"])
        -- Abertura dos olhos
        SetPedFaceFeature(Ped, 11, Data["eyeOpenness"])
        -- Labios
        SetPedFaceFeature(Ped, 12, Data["lips"])
        -- Mandibula
        SetPedFaceFeature(Ped, 13, Data["jawWidth"])
        SetPedFaceFeature(Ped, 14, Data["jawHeight"])
        -- Queixo
        SetPedFaceFeature(Ped, 15, Data["chinLength"])
        SetPedFaceFeature(Ped, 16, Data["chinPosition"])
        SetPedFaceFeature(Ped, 17, Data["chinWidth"])
        SetPedFaceFeature(Ped, 18, Data["chinShape"])
        -- Pescoço
        SetPedFaceFeature(Ped, 19, Data["neckLength"])
    end
end

CreateThread(function()
    while true do
        if not LocalPlayer["state"]["Barbershop"] and not InMultichar and not LocalPlayer["state"]["Creation"] then
            ApplyCustomization(PlayerPedId(), SkinData)
        end
        Wait(3000)
    end
end)

function ConvertClothes(data)
    local newClothes = table.clone(data)
    if data["tops"] or data["legs"] then
        for k,v in pairs(data) do
            if aliasClothes[k] then
                newClothes[aliasClothes[k]] = v
            else
                newClothes[k] = v
            end
        end
    end
    return newClothes
end

function ApplyClothes(Ped, Data)
    if not Data then return end
    SendDebug(("ApplyClothes - %s | %s"):format(Data["pants"],Data["torso"]))
    Data = ConvertClothes(Data)
    if GetResourceState("will_skinshop") == "started" and not LocalPlayer.state["Creation"] then
        TriggerEvent("skinshop:Apply",Data)
	elseif Data["pants"] and Data["torso"] then
        SendDebug(("Pants - Torso - %s | %s"):format(Data["pants"]["item"],Data["torso"]["item"]))
		SetPedComponentVariation(Ped,4,Data["pants"]["item"] or 0,Data["pants"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,3,Data["arms"]["item"] or 0,Data["arms"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,5,Data["backpack"]["item"] or 0,Data["backpack"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,8,Data["tshirt"]["item"] or 0,Data["tshirt"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,9,Data["vest"]["item"] or 0,Data["vest"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,11,Data["torso"]["item"] or 0,Data["torso"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,6,Data["shoes"]["item"] or 0,Data["shoes"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,1,Data["mask"]["item"] or 0,Data["mask"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,10,Data["decals"]["item"] or 0,Data["decals"]["texture"] or 0,1)
		SetPedComponentVariation(Ped,7,Data["accessory"]["item"] or 0,Data["accessory"]["texture"] or 0,1)

		if Data["hat"]["item"] and Data["hat"]["item"] ~= -1 and Data["hat"]["item"] ~= 0 then
			SetPedPropIndex(Ped,0,Data["hat"]["item"],Data["hat"]["texture"],true)
		else
			ClearPedProp(Ped,0)
		end

		if Data["glass"]["item"] and Data["glass"]["item"] ~= -1 and Data["glass"]["item"] ~= 0 then
			SetPedPropIndex(Ped,1,Data["glass"]["item"],Data["glass"]["texture"],true)
		else
			ClearPedProp(Ped,1)
		end

		if Data["ear"]["item"] and Data["ear"]["item"] ~= -1 and Data["ear"]["item"] ~= 0 then
			SetPedPropIndex(Ped,2,Data["ear"]["item"],Data["ear"]["texture"],true)
		else
			ClearPedProp(Ped,2)
		end

		if Data["watch"]["item"] and Data["watch"]["item"] ~= -1 and Data["watch"]["item"] ~= 0 then
			SetPedPropIndex(Ped,6,Data["watch"]["item"],Data["watch"]["texture"],true)
		else
			ClearPedProp(Ped,6)
		end

		if Data["bracelet"]["item"] and Data["bracelet"]["item"] ~= -1 and Data["bracelet"]["item"] ~= 0 then
			SetPedPropIndex(Ped,7,Data["bracelet"]["item"],Data["bracelet"]["texture"],true)
		else
			ClearPedProp(Ped,7)
		end
    elseif Data.modelhash or Data.model then
        vRP.setCustomization(Data)
	end
end

-- #########################
--      APPLY VARIATION
-- #########################

local anims = {
	{ ["dict"] = "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity", ["name"] = "hi_dance_crowd_17_v2_male^2" },
	{ ["dict"] = "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@", ["name"] = "high_center_down" },
	{ ["dict"] = "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@", ["name"] = "med_center_up" }
}

function ApplyCharData(ped,data)
    ApplyCustomization(ped,data["skin"])
    ApplyClothes(PlayerPedId(),data["clothes"])
    for index,overlay in pairs(data["tattoos"]) do
        SetPedDecoration(ped,GetHashKey(overlay[1]),GetHashKey(index))
    end
end

function CharCustom(data, anim, customAnim)
	if data["skin"] and LoadModel(data["skin"].gender) then
		SetPlayerModel(PlayerId(),data["skin"].gender)
		SetPedComponentVariation(PlayerPedId(),5,0,0,1)
        ApplyCharData(PlayerPedId(),data)
        SetEntityHealth(PlayerPedId(), GetPedMaxHealth(PlayerPedId()))
		SetEntityVisible(PlayerPedId(),true,false)
        if anim then
            if customAnim then
                FreezeAnim(customAnim["dict"], customAnim["name"], 49, true)
            else
                local random = math.random(#anims)
                FreezeAnim(anims[random]["dict"], anims[random]["name"], 49, true)
            end
        end
	end
end

RegisterNetEvent("will_creator_v2:reloadPlayer")
AddEventHandler("will_creator_v2:reloadPlayer",function(data)
    CharCustom(data)
end)

function ChangeToSkin(skin)
    local model = GetHashKey(skin)
    LoadModel(model)
    SetPlayerModel(PlayerId(), model)
    SetEntityVisible(PlayerPedId(),true,false)
    SetPedComponentVariation(PlayerPedId(), 0, 0, 0, 2)
    ApplyClothes(PlayerPedId(), Clothes)
    ApplyCustomization(PlayerPedId(), SkinData)
    SetFacialIdleAnimOverride(PlayerPedId(), "pose_normal_1", "")
    SendNUIMessage({
        action = "DEFAULT_VALUES",
        data = {
            Clothes = Clothes,
            Skin = SkinData,
        }
    })
    Wait(50)
    InterpCamera("head")
    local maxHealth = GetEntityMaxHealth(PlayerPedId())
    SetEntityHealth(PlayerPedId(), maxHealth > 101 and maxHealth or 200)
end

function SpawnPoints()
    local spawns = Server.getSpawns()
    return spawns
end

AddStateBagChangeHandler("Barbershops","",function(bagName,_,newValue)
    Barbershops = newValue
end)

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
        local timeDistance = 500
        for k, store in pairs(Barbershops) do
            if #(coords - vec3(store.coords.x,store.coords.y,store.coords.z)) <= 3 then
                timeDistance = 3
                DrawBase3D(store.coords.x,store.coords.y,store.coords.z,"barbershop")
                if IsControlJustPressed(0, 38) then
                    TriggerEvent("hudActived",false)
                    OpenBarbershop()
                end
            end
        end
        Wait(timeDistance)
    end
end)


RegisterNUICallback("CharacterCreator::ImportCharacter",function(data,cb)
    local CharacterData = json.decode(data.character)
    if CharacterData["gender"] == "male" then
        CharacterData["gender"] = "mp_m_freemode_01"
        ChangeToSkin("mp_m_freemode_01")
    elseif CharacterData["gender"] == "female" then
        CharacterData["gender"] = "mp_f_freemode_01"
        ChangeToSkin("mp_f_freemode_01")
    end
    CharacterData["parent1"] = CharacterData["parent1"] or CharacterData["shapeFirst"] or CharacterData[1]
    CharacterData["parent2"] = CharacterData["parent2"] or CharacterData["shapeSecond"] or CharacterData[2]
    CharacterData["shape1"] = CharacterData["shape1"] or CharacterData["shapeThird"] or CharacterData[5]
    CharacterData["shape2"] = CharacterData["shape2"] or CharacterData["skinFirst"] or CharacterData[5]
    CharacterData["similarity"] = CharacterData["similarity"] or CharacterData["shapeMix"]  or CharacterData[3]
    CharacterData["skinSimilarity"] = CharacterData["skinSimilarity"] or CharacterData["skinMix"] or CharacterData[3]
    CharacterData["eyeColor"] = CharacterData["eyeColor"] or CharacterData["eyes"] or CharacterData[4]
    CharacterData["hair"] = CharacterData["hair"] or CharacterData[10]
    CharacterData["hairColor"] = CharacterData["hairColor"] or CharacterData["hair-color"] or CharacterData[11]
    CharacterData["hairColor2"] = CharacterData["hairColor2"] or CharacterData["hair-highlightcolor"] or CharacterData[12]
    CharacterData["beard"] = CharacterData["beard"] or CharacterData["facialHair"] or CharacterData[22]
    CharacterData["beardColor"] = CharacterData["beardColor"] or CharacterData["facialHair-color"] or CharacterData[24]
    CharacterData["eyebrowsStyle"] = CharacterData["eyebrowsStyle"] or CharacterData["eyebrows"] or CharacterData[19]
    CharacterData["eyebrowsOpacity"] = CharacterData["eyebrowsOpacity"] or CharacterData["eyebrows-opacity"] or CharacterData[20]
    CharacterData["eyebrowsColor"] = CharacterData["eyebrowsColor"] or CharacterData["eyebrows-color"] or CharacterData[21]
    CharacterData["eyebrowsColor2"] = CharacterData["eyebrowsColor2"] or CharacterData[22]
    CharacterData["wrinkles"] = CharacterData["wrinkles"] or CharacterData["ageing"] or CharacterData[9]
    CharacterData["wrinklesOpacity"] = CharacterData["wrinklesOpacity"] or CharacterData["ageing-opacity"]
    CharacterData["makeup"] = CharacterData["makeup"] or CharacterData[13]
    CharacterData["blush"] = CharacterData["blush"] or CharacterData[25]
    CharacterData["blushColor"] = CharacterData["blushColor"] or CharacterData["blush-color"] or CharacterData[27]
    CharacterData["aspect"] = CharacterData["aspect"] or CharacterData["complexion"] or CharacterData[6]
    CharacterData["skin"] = CharacterData["skin"] or CharacterData["sunDamage"]
    CharacterData["lipstick"] = CharacterData["lipstick"] or CharacterData[16]
    CharacterData["lipstickColor"] = CharacterData["lipstickColor"] or CharacterData["lipstick-color"] or CharacterData[18]
    CharacterData["freckles"] = CharacterData["freckles"] or CharacterData[8]
    CharacterData["bodyHair"] = CharacterData["bodyHair"] or CharacterData["chestHair"] or CharacterData[47]
    CharacterData["bodyHairColor"] = CharacterData["bodyHairColor"] or CharacterData["chestHair-color"] or CharacterData[49]
    CharacterData["blemishes1"] = CharacterData["blemishes1"] or CharacterData["bodyBlemishes"] or CharacterData[48]
    CharacterData["blemishes2"] = CharacterData["blemishes2"] or CharacterData["addBodyBlemishes"] or CharacterData[49]
    CharacterData["noseWidth"] = CharacterData["noseWidth"] or CharacterData[28]
    CharacterData["noseHeight"] = CharacterData["noseHeight"] or CharacterData["nosePeakHeight"] or CharacterData[29]
    CharacterData["noseLength"] = CharacterData["noseLength"] or CharacterData["nosePeakLength"] or CharacterData[30]
    CharacterData["noseBridge"] = CharacterData["noseBridge"] or CharacterData["noseBoneHigh"] or CharacterData[31]
    CharacterData["noseTip"] = CharacterData["noseTip"] or CharacterData["noseBoneTwist"] or CharacterData[32]
    CharacterData["noseShift"] = CharacterData["noseShift"] or CharacterData["nosePeakLowering"] or CharacterData[33]
    CharacterData["eyebrowsHeight"] = CharacterData["eyebrowsHeight"] or CharacterData["eyeBrownHigh"] or CharacterData[44]
    CharacterData["eyebrowsWidth"] = CharacterData["eyebrowsWidth"] or CharacterData["eyeBrownForward"] or CharacterData[45]
    CharacterData["cheekHeight"] = CharacterData["cheekHeight"] or CharacterData["cheeksBoneHigh"] or CharacterData[36]
    CharacterData["cheekWidth"] = CharacterData["cheekWidth"] or CharacterData["cheeksWidth"] or CharacterData[35]
    CharacterData["cheekboneWidth"] = CharacterData["cheekboneWidth"] or CharacterData["cheeksBoneWidth"] or CharacterData[45]
    CharacterData["eyeOpenness"] = CharacterData["eyeOpenness"] or CharacterData["eyesOpenning"] or CharacterData[15]
    CharacterData["lips"] = CharacterData["lips"] or CharacterData["lipsThickness"] or CharacterData[42]
    CharacterData["jawWidth"] = CharacterData["jawWidth"] or CharacterData["jawBoneWidth"] or CharacterData[46]
    CharacterData["jawHeight"] = CharacterData["jawHeight"] or CharacterData["jawBoneBackLength"] or CharacterData[37]
    CharacterData["chinLength"] = CharacterData["chinLength"] or CharacterData["chinBoneLength"] or CharacterData[38]
    CharacterData["chinPosition"] = CharacterData["chinPosition"] or CharacterData["chinHole"] or CharacterData[40]
    CharacterData["chinWidth"] = CharacterData["chinWidth"] or CharacterData["chinBoneWidth"] or CharacterData[39]
    CharacterData["chinShape"] = CharacterData["chinShape"] or CharacterData["chinBoneLowering"] or CharacterData[41]
    CharacterData["neckLength"] = CharacterData["neckLength"] or CharacterData["neckThickness"] or CharacterData[43]
    SkinData = CharacterData
    ApplyCustomization(PlayerPedId(),CharacterData)
    cb("ok")
end)

RegisterNetEvent("will_creator_v2:openBarber")
AddEventHandler("will_creator_v2:openBarber",function()
    OpenBarbershop()
end)

RegisterNetEvent("will_creator_v2:openAdmin")
AddEventHandler("will_creator_v2:openAdmin",function()
    OpenAdminPainel()
end)