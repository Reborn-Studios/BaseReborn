maxHealth = GlobalState['Basics']['MaxHealth'] or 400

-- #########################
--      INITIATION
-- #########################

CreateThread(function()
    Wait(500)
    DoScreenFadeOut(0)
    ClearPedTasks(PlayerPedId())
    while true do
        Wait(100)
        if NetworkIsSessionActive() or NetworkIsPlayerActive(PlayerId()) then
            if GetResourceState("spawnmanager") == "started" then
                exports['spawnmanager']:setAutoSpawn(false)
            end
            Wait(500)
            SetEntityVisible(PlayerPedId(), false)
            -- Desativar hud
            TriggerEvent("hudActived",false)
            TriggerEvent("hud:Active",false)
            CharacterSelect()
            break
        end
    end
end)

-- #########################
--      APPLY VARIATION
-- #########################

local anims = {
	{ ["Dict"] = "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity", ["Name"] = "hi_dance_crowd_17_v2_male^2" },
	{ ["Dict"] = "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@", ["Name"] = "high_center_down" },
	{ ["Dict"] = "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@", ["Name"] = "med_center_up" }
}

function customization(data, anim)
	if loadModel(data["Skin"]) then
		SetPlayerModel(PlayerId(),data["Skin"])
		SetPedComponentVariation(PlayerPedId(),5,0,0,1)
        if anim then
            local random = math.random(#anims)
            if loadAnim(anims[random]["Dict"]) then
                TaskPlayAnim(PlayerPedId(),anims[random]["Dict"],anims[random]["Name"],8.0,8.0,-1,1,0,0,0,0)
            end
        end
        
		applyClothes(PlayerPedId(),data["Clothes"])
        applyCustomization(PlayerPedId(),data["Barber"])

		for index,overlay in pairs(data["Tattoos"]) do
			SetPedDecoration(PlayerPedId(),GetHashKey(overlay[1]),GetHashKey(index))
		end
		SetEntityVisible(PlayerPedId(),true,0)
	end
end

function creatorClothes(creating)
    local clothes = {}
    if creating then
        clothes = {
            [GetHashKey("mp_m_freemode_01")] = {
                ["pants"] = { item = 61, texture = 0 },
                ["arms"] = { item = 15, texture = 0 },
                ["tshirt"] = { item = 15, texture = 0 },
                ["torso"] = { item = 15, texture = 0 },
                ["vest"] = { item = 0, texture = 0 },
                ["shoes"] = { item = 34, texture = 0 },
                ["mask"] = { item = 0, texture = 0 },
                ["backpack"] = { item = 0, texture = 0 },
                ["hat"] = { item = -1, texture = 0 },
                ["glass"] = { item = 0, texture = 0 },
                ["ear"] = { item = -1, texture = 0 },
                ["watch"] = { item = -1, texture = 0 },
                ["bracelet"] = { item = -1, texture = 0 },
                ["accessory"] = { item = -1, texture = 0 },
                ["decals"] = { item = 0, texture = 0 }
            },
            [GetHashKey("mp_f_freemode_01")] = {
                ["pants"] = { item = 15, texture = 0 },
                ["arms"] = { item = 15, texture = 0 },
                ["tshirt"] = { item = 14, texture = 0 },
                ["torso"] = { item = 15, texture = 0 },
                ["vest"] = { item = 0, texture = 0 },
                ["shoes"] = { item = 35, texture = 0 },
                ["mask"] = { item = 0, texture = 0 },
                ["backpack"] = { item = 0, texture = 0 },
                ["hat"] = { item = -1, texture = 0 },
                ["glass"] = { item = 0, texture = 0 },
                ["ear"] = { item = -1, texture = 0 },
                ["watch"] = { item = -1, texture = 0 },
                ["bracelet"] = { item = -1, texture = 0 },
                ["accessory"] = { item = -1, texture = 0 },
                ["decals"] = { item = 0, texture = 0 }
            },
        }
    else
        clothes = {
            [GetHashKey("mp_m_freemode_01")] = {
                ["pants"] = { item = 4, texture = 1 },
                ["arms"] = { item = 0, texture = 0 },
                ["tshirt"] = { item = 15, texture = 0 },
                ["torso"] = { item = 16, texture = 2 },
                ["vest"] = { item = 0, texture = 0 },
                ["shoes"] = { item = 1, texture = 0 },
                ["mask"] = { item = 0, texture = 0 },
                ["backpack"] = { item = 0, texture = 0 },
                ["hat"] = { item = -1, texture = 0 },
                ["glass"] = { item = 0, texture = 0 },
                ["ear"] = { item = -1, texture = 0 },
                ["watch"] = { item = -1, texture = 0 },
                ["bracelet"] = { item = -1, texture = 0 },
                ["accessory"] = { item = -1, texture = 0 },
                ["decals"] = { item = 0, texture = 0 }
            },
            [GetHashKey("mp_f_freemode_01")] = {
                ["pants"] = { item = 112, texture = 0 },
                ["arms"] = { item = 14, texture = 0 },
                ["tshirt"] = { item = 6, texture = 0 },
                ["torso"] = { item = 338, texture = 7 },
                ["vest"] = { item = 0, texture = 0 },
                ["shoes"] = { item = 49, texture = 0 },
                ["mask"] = { item = 0, texture = 0 },
                ["backpack"] = { item = 0, texture = 0 },
                ["hat"] = { item = -1, texture = 0 },
                ["glass"] = { item = 0, texture = 0 },
                ["ear"] = { item = -1, texture = 0 },
                ["watch"] = { item = -1, texture = 0 },
                ["bracelet"] = { item = -1, texture = 0 },
                ["accessory"] = { item = -1, texture = 0 },
                ["decals"] = { item = 0, texture = 0 }
            },
        }
    end
    if GetResourceState("will_skinshop") == "started" then
        exports['will_skinshop']:applyClothes(clothes[GetEntityModel(PlayerPedId())])
    else
        applyClothes(PlayerPedId(),clothes[GetEntityModel(PlayerPedId())])
    end
end

function applyClothes(ped,data)
    if not data then return end
	if data["pants"] and data["torso"] then
		if data["backpack"] == nil then
			data["backpack"] = {}
			data["backpack"]["item"] = 0
			data["backpack"]["texture"] = 0
		end
		SetPedComponentVariation(ped,4,data["pants"]["item"] or 0,data["pants"]["texture"] or 0,1)
		SetPedComponentVariation(ped,3,data["arms"]["item"] or 0,data["arms"]["texture"] or 0,1)
		SetPedComponentVariation(ped,5,data["backpack"]["item"] or 0,data["backpack"]["texture"] or 0,1)
		SetPedComponentVariation(ped,8,data["tshirt"]["item"] or 0,data["tshirt"]["texture"] or 0,1)
		SetPedComponentVariation(ped,9,data["vest"]["item"] or 0,data["vest"]["texture"] or 0,1)
		SetPedComponentVariation(ped,11,data["torso"]["item"] or 0,data["torso"]["texture"] or 0,1)
		SetPedComponentVariation(ped,6,data["shoes"]["item"] or 0,data["shoes"]["texture"] or 0,1)
		SetPedComponentVariation(ped,1,data["mask"]["item"] or 0,data["mask"]["texture"] or 0,1)
		SetPedComponentVariation(ped,10,data["decals"]["item"] or 0,data["decals"]["texture"] or 0,1)
		SetPedComponentVariation(ped,7,data["accessory"]["item"] or 0,data["accessory"]["texture"] or 0,1)

		if data["hat"]["item"] ~= -1 and data["hat"]["item"] ~= 0 then
			SetPedPropIndex(ped,0,data["hat"]["item"],data["hat"]["texture"],1)
		else
			ClearPedProp(ped,0)
		end

		if data["glass"]["item"] ~= -1 and data["glass"]["item"] ~= 0 then
			SetPedPropIndex(ped,1,data["glass"]["item"],data["glass"]["texture"],1)
		else
			ClearPedProp(ped,1)
		end

		if data["ear"]["item"] ~= -1 and data["ear"]["item"] ~= 0 then
			SetPedPropIndex(ped,2,data["ear"]["item"],data["ear"]["texture"],1)
		else
			ClearPedProp(ped,2)
		end

		if data["watch"]["item"] ~= -1 and data["watch"]["item"] ~= 0 then
			SetPedPropIndex(ped,6,data["watch"]["item"],data["watch"]["texture"],1)
		else
			ClearPedProp(ped,6)
		end

		if data["bracelet"]["item"] ~= -1 and data["bracelet"]["item"] ~= 0 then
			SetPedPropIndex(ped,7,data["bracelet"]["item"],data["bracelet"]["texture"],1)
		else
			ClearPedProp(ped,7)
		end
    elseif data.modelhash or data.model then
        vRP.setCustomization(data)
    else
        TriggerEvent("skinshop:apply",data)
        TriggerEvent("skinshop:Apply",data)
	end
end

function applyCustomization(ped, data)
    if data and data["face"] then
        SetPedHeadBlendData(ped, data["face"].item, data["face2"].item, 0, 21, 15, 0, data["facemix"].shapeMix, data["facemix"].skinMix, 0, true)
        
        SetPedComponentVariation(ped, 2, data["hair"].item, 0, 0)
        SetPedHairColor(ped, data["hair"].texture, data["hair2"] and data["hair2"].texture or data["hair"].texture)
        
        SetPedHeadOverlay(ped, 1, data["beard"].item, data["beard"].opacity and data["beard"].opacity/10 or 1.0)
        SetPedHeadOverlayColor(ped, 1, 1, data["beard"].texture, 0)

        SetPedHeadOverlay(ped, 2, data["eyebrows"].item, data["eyebrows"].opacity and data["eyebrows"].opacity/10 or 1.0)
        SetPedHeadOverlayColor(ped, 2, 1, data["eyebrows"].texture, 0)

        SetPedHeadOverlay(ped, 3, data["ageing"].item, 1.0)
        SetPedHeadOverlayColor(ped, 3, 1, data["ageing"].texture, 0)

        SetPedHeadOverlay(ped, 4, data["makeup"].item, data["makeup"].opacity and data["makeup"].opacity / 10 or 1.0)
        SetPedHeadOverlayColor(ped, 4, 2, data["makeup"].texture, 0)
    
        SetPedHeadOverlay(ped, 5, data["blush"].item, data["blush"].opacity and data["blush"].opacity / 10 or 1.0)
        SetPedHeadOverlayColor(ped, 5, 2, data["blush"].texture, 0)
    
        SetPedHeadOverlay(ped, 8, data["lipstick"].item, data["lipstick"].opacity and data["lipstick"].opacity / 10 or 1.0)
        SetPedHeadOverlayColor(ped, 8, 2, data["lipstick"].texture,  0)

        SetPedHeadOverlay(ped, 9, data["moles"].item, 1.0)
        SetPedHeadOverlayColor(ped, 9, GetPedDrawableVariation(ped, 9), data["moles"].texture / 10)

        if data["chest_hair"] then
            SetPedHeadOverlay(ped, 10, data["chest_hair"].item, 1.0)
            SetPedHeadOverlayColor(ped, 10, 1, data["chest_hair"].texture, 0)
        end
                
        SetPedEyeColor(ped, data["eye_color"].item)
        
        -- Nariz
        SetPedFaceFeature(ped, 0, data["nose_0"].item / 10)
        SetPedFaceFeature(ped, 1, data["nose_1"].item / 10)
        SetPedFaceFeature(ped, 2, data["nose_2"].item / 10)
        SetPedFaceFeature(ped, 3, data["nose_3"].item / 10)
        SetPedFaceFeature(ped, 4, data["nose_4"].item / 10)
        SetPedFaceFeature(ped, 5, data["nose_5"].item / 10)
    
        -- Sobrancelha
        SetPedFaceFeature(ped, 6, data["eyebrown_high"].item / 10)
        SetPedFaceFeature(ped, 7, data["eyebrown_forward"].item / 10)
    
        -- Bochecha
        SetPedFaceFeature(ped, 8, data["cheek_1"].item / 10)
        SetPedFaceFeature(ped, 9, data["cheek_2"].item / 10)
        SetPedFaceFeature(ped, 10, data["cheek_3"].item / 10)
    
        -- Outros
        SetPedFaceFeature(ped, 11, data["eye_opening"].item / 10)
        SetPedFaceFeature(ped, 12, data["lips_thickness"].item / 10)
        SetPedFaceFeature(ped, 13, data["jaw_bone_width"].item / 10)
        SetPedFaceFeature(ped, 14, data["jaw_bone_back_lenght"].item / 10)
        SetPedFaceFeature(ped, 15, data["chimp_bone_lowering"].item / 10)
        SetPedFaceFeature(ped, 16, data["chimp_bone_lenght"].item / 10)
        SetPedFaceFeature(ped, 17, data["chimp_bone_width"].item / 10)
        SetPedFaceFeature(ped, 18, data["chimp_hole"].item / 10)
        SetPedFaceFeature(ped, 19, data["neck_thikness"].item / 10)
    end
end

pedCategories = {
    ["hair"]                 = { type = "hair", id = 2 },
    ["eyebrows"]             = { type = "overlay", id = 2 },
    ["face"]                 = { type = "face", id = 2 },
    ["face2"]                = { type = "face", id = 2 },
    ["facemix"]              = { type = "face", id = 2 },
    ["beard"]                = { type = "overlay", id = 1 },
    ["blush"]                = { type = "overlay", id = 5 },
    ["lipstick"]             = { type = "overlay", id = 8 },
    ["chest_hair"]             = { type = "overlay", id = 10 },
    ["makeup"]               = { type = "overlay", id = 4 },
    ["ageing"]               = { type = "ageing", id = 3 },
    ["eye_color"]            = { type = "eye_color", id = 1 },
    ["moles"]                = { type = "moles", id = 1 },
    ["jaw_bone_width"]       = { type = "cheek", id = 1 },
    ["jaw_bone_back_lenght"] = { type = "cheek", id = 1 },
    ["lips_thickness"]       = { type = "nose", id = 1 },
    ["nose_0"]               = { type = "nose", id = 1 },
    ["nose_1"]               = { type = "nose", id = 1 },
    ["nose_2"]               = { type = "nose", id = 2 },
    ["nose_3"]               = { type = "nose", id = 3 },
    ["nose_4"]               = { type = "nose", id = 4 },
    ["nose_5"]               = { type = "nose", id = 5 },
    ["cheek_1"]              = { type = "cheek", id = 1 },
    ["cheek_2"]              = { type = "cheek", id = 2 },
    ["cheek_3"]              = { type = "cheek", id = 3 },
    ["eyebrown_high"]        = { type = "nose", id = 1 },
    ["eyebrown_forward"]     = { type = "nose", id = 2 },
    ["eye_opening"]          = { type = "nose", id = 1 },
    ["chimp_bone_lowering"]  = { type = "chin", id = 1 },
    ["chimp_bone_lenght"]    = { type = "chin", id = 2 },
    ["chimp_bone_width"]     = { type = "cheek", id = 3 },
    ["chimp_hole"]           = { type = "cheek", id = 4 },
    ["neck_thikness"]        = { type = "cheek", id = 5 },
}

function GetMaxValues(isSingle, key, push)
    local maxModelValues = {
        ["eye_color"]            = { type = "hair", item = 0, texture = 0 },
        ["moles"]                = { type = "hair", item = 0, texture = 0 },
        ["hair"]                 = { type = "hair", item = 0, texture = 0 },
        ["eyebrows"]             = { type = "hair", item = 0, texture = 0 },
        ["beard"]                = { type = "hair", item = 0, texture = 0 },
        ["eye_opening"]          = { type = "hair", id = 1 },
        ["jaw_bone_width"]       = { type = "hair", item = 0, texture = 0 },
        ["jaw_bone_back_lenght"] = { type = "hair", item = 0, texture = 0 },
        ["lips_thickness"]       = { type = "hair", item = 0, texture = 0 },
        ["cheek_1"]              = { type = "hair", item = 0, texture = 0 },
        ["cheek_2"]              = { type = "hair", item = 0, texture = 0 },
        ["cheek_3"]              = { type = "hair", item = 0, texture = 0 },
        ["eyebrown_high"]        = { type = "hair", item = 0, texture = 0 },
        ["eyebrown_forward"]     = { type = "hair", item = 0, texture = 0 },
        ["nose_0"]               = { type = "hair", item = 0, texture = 0 },
        ["nose_1"]               = { type = "hair", item = 0, texture = 0 },
        ["nose_2"]               = { type = "hair", item = 0, texture = 0 },
        ["nose_3"]               = { type = "hair", item = 0, texture = 0 },
        ["nose_4"]               = { type = "hair", item = 0, texture = 0 },
        ["nose_5"]               = { type = "hair", item = 0, texture = 0 },
        ["chimp_bone_lowering"]  = { type = "hair", item = 0, texture = 0 },
        ["chimp_bone_lenght"]    = { type = "hair", item = 0, texture = 0 },
        ["chimp_bone_width"]     = { type = "hair", item = 0, texture = 0 },
        ["chimp_hole"]           = { type = "hair", item = 0, texture = 0 },
        ["neck_thikness"]        = { type = "hair", item = 0, texture = 0 },
        ["blush"]                = { type = "hair", item = 0, texture = 0 },
        ["lipstick"]             = { type = "hair", item = 0, texture = 0 },
        ["chest_hair"]           = { type = "hair", item = 0, texture = 0 },
        ["makeup"]               = { type = "hair", item = 0, texture = 0 },
        ["ageing"]               = { type = "hair", item = 0, texture = 0 },
        ["face"]                 = { type = "character", item = 0, texture = 0 },
        ["face2"]                = { type = "character", item = 0, texture = 0 },
        ["facemix"]              = { type = "character", shapeMix = 0, skinMix = 0 },
    }

    local ped = PlayerPedId()
    for k, v in pairs(pedCategories) do
        if v.type == "hair" then
            maxModelValues[k].item = GetNumberOfPedDrawableVariations(ped, v.id) - 1
            maxModelValues[k].texture = 45
        end

        if v.type == "face" then
            maxModelValues[k].item = 45
            maxModelValues[k].texture = 15
        end

        if v.type == "face2" then
            maxModelValues[k].item = 45
            maxModelValues[k].texture = 15
        end

        if v.type == "facemix" then
            maxModelValues[k].shapeMix = 10
            maxModelValues[k].skinMix = 10
        end

        if v.type == "ageing" then
            maxModelValues[k].item = GetNumHeadOverlayValues(v.id)
            maxModelValues[k].texture = 0
        end

        if v.type == "overlay" then
            maxModelValues[k].item = GetNumHeadOverlayValues(v.id) - 1
            maxModelValues[k].texture = 45
        end

        if v.type == "eye_color" then
            maxModelValues[k].item = 31
            maxModelValues[k].texture = 0
        end

        if v.type == "moles" then
            maxModelValues[k].item = GetNumHeadOverlayValues(9) - 1
            maxModelValues[k].texture = 10
        end

        if v.type == "nose" then
            maxModelValues[k].item = 30
            maxModelValues[k].texture = 0
        end

        if v.type == "cheek" then
            maxModelValues[k].item = 30
            maxModelValues[k].texture = 0
        end

        if v.type == "chin" then
            maxModelValues[k].item = 30
            maxModelValues[k].texture = 0
        end
    end

    if push ~= nil then
        return maxModelValues
    else
        if isSingle then
            SendNUIMessage({
                action = "updateMaxSinle",
                maxValues = maxModelValues,
                key = key
            })
        else
            SendNUIMessage({
                action = "updateMax",
                maxValues = maxModelValues
            })
        end
    end
end

skinData = {
    ["face"] = {
        item = 0,
        texture = 0,
        defaultItem = 21,
        defaultTexture = 0,
    },
    ["face2"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["facemix"] = {
        skinMix = 0,
        shapeMix = 0,
        defaultSkinMix = 0.0,
        defaultShapeMix = 0.0,
    },
    ["hair"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["hair2"] = {
        texture = 0,
        defaultTexture = 0,
    },
    ["eyebrows"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
        opacity = 10
    },
    ["beard"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
        opacity = 10
    },
    ["blush"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
        opacity = 10
    },
    ["lipstick"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
        opacity = 10
    },
    ["chest_hair"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
    },
    ["makeup"] = {
        item = -1,
        texture = 1,
        defaultItem = -1,
        defaultTexture = 1,
        opacity = 10
    },
    ["ageing"] = {
        item = -1,
        texture = 0,
        defaultItem = -1,
        defaultTexture = 0,
    },
    ["eye_color"] = {
        item = -1,
        texture = 0,
        defaultItem = -1,
        defaultTexture = 0,
    },
    ["moles"] = {
        item = 0,
        texture = 0,
        defaultItem = -1,
        defaultTexture = 0,
    },
    ["nose_0"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["nose_1"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["nose_2"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["nose_3"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["nose_4"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["nose_5"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["cheek_1"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["cheek_2"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["cheek_3"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["eye_opening"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["lips_thickness"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["jaw_bone_width"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["eyebrown_high"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["eyebrown_forward"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["jaw_bone_back_lenght"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["chimp_bone_lowering"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["chimp_bone_lenght"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["chimp_bone_width"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["chimp_hole"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
    ["neck_thikness"] = {
        item = 0,
        texture = 0,
        defaultItem = 0,
        defaultTexture = 0,
    },
}

-- #########################
--      UTIL FUNCTIONS
-- #########################

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
        local timeDistance = 500
        if not inShopping then
            for k, store in pairs(Config.Stores) do
                if #(coords - vec3(store.coords.x,store.coords.y,store.coords.z)) <= 3 then
                    timeDistance = 3
                    DrawMarker(27,store.coords.x,store.coords.y,store.coords.z-0.95,0,0,0,0,180.0,130.0,1.0,1.0,1.0,255,0,0,75,0,0,0,1)
                    if IsControlJustPressed(0, 38) then
                        openShopMenu(store.type)
                    end
                end
            end
        end
        Wait(timeDistance)
    end
end)

--[[ --> BLIPS PARA O MAPA
function setupBlips()
    for k, _ in pairs(Config.Stores) do
        local blipConfig = Config.BlipType[Config.Stores[k].type]
        if blipConfig.showBlip then
            createBlip(blipConfig, Config.Stores[k].coords)
        end
    end
end

function createBlip(blipConfig, coords)
    local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipSprite(blip, blipConfig.sprite)
    SetBlipColour(blip, blipConfig.color)
    SetBlipScale(blip, blipConfig.scale)
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(blipConfig.name)
    EndTextCommandSetBlipName(blip)
    return blip
end ]]

function loadModel(model)
	while not HasModelLoaded(model) do
        RequestModel(model)
        Wait(10)
    end
	return true
end

function loadAnim(anim)
	RequestAnimDict(anim)
	while not HasAnimDictLoaded(anim) do
		RequestAnimDict(anim)
		Wait(10)
	end
	return true
end

function teleport(ped,x, y, z)
    if type(x) == "vector3" then
        x,y,z = table.unpack(x)
    end
    FreezeEntityPosition(ped, true)
    SetEntityCoords(ped, x + 0.0001, y + 0.0001, z + 0.0001, true, false, false, true)
    local timer = 10
    while not HasCollisionLoadedAroundEntity(ped) and timer > 0 do
        FreezeEntityPosition(ped, true)
        SetEntityCoords(ped, x + 0.0001, y + 0.0001, z + 0.0001, true, false, false, true)
        RequestCollisionAtCoord(x, y, z)
        Wait(500)
        timer = timer - 1
    end
    SetEntityCoords(ped, x + 0.0001, y + 0.0001, z + 0.0001, true, false, false, true)
    FreezeEntityPosition(ped, false)
end

-- #########################
--      CUT SCENE
-- #########################

local sub_b0b5 = {
    [0] = "MP_Plane_Passenger_1",
    [1] = "MP_Plane_Passenger_2",
    [2] = "MP_Plane_Passenger_3",
    [3] = "MP_Plane_Passenger_4",
    [4] = "MP_Plane_Passenger_5",
    [5] = "MP_Plane_Passenger_6",
    [6] = "MP_Plane_Passenger_7"
}

function sub_b747(ped, a_1)
    if a_1 == 0 then
        SetPedComponentVariation(ped, 0, 21, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 9, 0, 0)
        SetPedComponentVariation(ped, 3, 1, 0, 0)
        SetPedComponentVariation(ped, 4, 9, 0, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 4, 8, 0)
        SetPedComponentVariation(ped, 7, 0, 0, 0)
        SetPedComponentVariation(ped, 8, 15, 0, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 10, 0, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 1 then
        SetPedComponentVariation(ped, 0, 13, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 5, 4, 0)
        SetPedComponentVariation(ped, 3, 1, 0, 0)
        SetPedComponentVariation(ped, 4, 10, 0, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 10, 0, 0)
        SetPedComponentVariation(ped, 7, 11, 2, 0)
        SetPedComponentVariation(ped, 8, 13, 6, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 10, 0, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 2 then
        SetPedComponentVariation(ped, 0, 15, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 1, 4, 0)
        SetPedComponentVariation(ped, 3, 1, 0, 0)
        SetPedComponentVariation(ped, 4, 0, 1, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 1, 7, 0)
        SetPedComponentVariation(ped, 7, 0, 0, 0)
        SetPedComponentVariation(ped, 8, 2, 9, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 6, 0, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 3 then
        SetPedComponentVariation(ped, 0, 14, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 5, 3, 0)
        SetPedComponentVariation(ped, 3, 3, 0, 0)
        SetPedComponentVariation(ped, 4, 1, 6, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 11, 5, 0)
        SetPedComponentVariation(ped, 7, 0, 0, 0)
        SetPedComponentVariation(ped, 8, 2, 0, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 3, 12, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 4 then
        SetPedComponentVariation(ped, 0, 18, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 15, 3, 0)
        SetPedComponentVariation(ped, 3, 15, 0, 0)
        SetPedComponentVariation(ped, 4, 2, 5, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 4, 6, 0)
        SetPedComponentVariation(ped, 7, 4, 0, 0)
        SetPedComponentVariation(ped, 8, 3, 0, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 4, 0, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 5 then
        SetPedComponentVariation(ped, 0, 27, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 7, 3, 0)
        SetPedComponentVariation(ped, 3, 11, 0, 0)
        SetPedComponentVariation(ped, 4, 4, 8, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 13, 14, 0)
        SetPedComponentVariation(ped, 7, 5, 3, 0)
        SetPedComponentVariation(ped, 8, 3, 0, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 2, 7, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    elseif a_1 == 6 then
        SetPedComponentVariation(ped, 0, 16, 0, 0)
        SetPedComponentVariation(ped, 1, 0, 0, 0)
        SetPedComponentVariation(ped, 2, 15, 1, 0)
        SetPedComponentVariation(ped, 3, 3, 0, 0)
        SetPedComponentVariation(ped, 4, 5, 6, 0)
        SetPedComponentVariation(ped, 5, 0, 0, 0)
        SetPedComponentVariation(ped, 6, 2, 8, 0)
        SetPedComponentVariation(ped, 7, 0, 0, 0)
        SetPedComponentVariation(ped, 8, 2, 0, 0)
        SetPedComponentVariation(ped, 9, 0, 0, 0)
        SetPedComponentVariation(ped, 10, 0, 0, 0)
        SetPedComponentVariation(ped, 11, 3, 7, 0)
        ClearPedProp(ped, 0)
        ClearPedProp(ped, 1)
        ClearPedProp(ped, 2)
        ClearPedProp(ped, 3)
        ClearPedProp(ped, 4)
        ClearPedProp(ped, 5)
        ClearPedProp(ped, 6)
        ClearPedProp(ped, 7)
        ClearPedProp(ped, 8)
    end
end

function cutScene()
	PrepareMusicEvent("FM_INTRO_START") --FM_INTRO_START
	TriggerMusicEvent("FM_INTRO_START") --FM_INTRO_START
    local plyrId = PlayerPedId() -- PLAYER ID
    -----------------------------------------------
	if IsMale(plyrId) then
		RequestCutsceneWithPlaybackList("MP_INTRO_CONCAT", 31, 8)
	else	
		RequestCutsceneWithPlaybackList("MP_INTRO_CONCAT", 103, 8)
	end
    while not HasCutsceneLoaded() do Wait(10) end --- waiting for the cutscene to load
	if IsMale(plyrId) then
		RegisterEntityForCutscene(0, 'MP_Male_Character', 3, GetEntityModel(PlayerPedId()), 0)
		RegisterEntityForCutscene(PlayerPedId(), 'MP_Male_Character', 0, 0, 0)
		SetCutsceneEntityStreamingFlags('MP_Male_Character', 0, 1) 
		local female = RegisterEntityForCutscene(0,"MP_Female_Character",3,0,64) 
		NetworkSetEntityInvisibleToNetwork(female, true)
	else
		RegisterEntityForCutscene(0, 'MP_Female_Character', 3, GetEntityModel(PlayerPedId()), 0)
		RegisterEntityForCutscene(PlayerPedId(), 'MP_Female_Character', 0, 0, 0)
		SetCutsceneEntityStreamingFlags('MP_Female_Character', 0, 1) 
		local male = RegisterEntityForCutscene(0,"MP_Male_Character",3,0,64) 
		NetworkSetEntityInvisibleToNetwork(male, true)
	end
	local ped = {}
	for v_3=0, 6, 1 do
		if v_3 == 1 or v_3 == 2 or v_3 == 4 or v_3 == 6 then
			ped[v_3] = CreatePed(26, `mp_f_freemode_01`, -1117.77783203125, -1557.6248779296875, 3.3819, 0.0, 0, 0)
		else
			ped[v_3] = CreatePed(26, `mp_m_freemode_01`, -1117.77783203125, -1557.6248779296875, 3.3819, 0.0, 0, 0)
		end
        if not IsEntityDead(ped[v_3]) then
			sub_b747(ped[v_3], v_3)
            FinalizeHeadBlend(ped[v_3])
            RegisterEntityForCutscene(ped[v_3], sub_b0b5[v_3], 0, 0, 64)
        end
    end
	
	NewLoadSceneStartSphere(-1212.79, -1673.52, 7, 1000, 0) ----- avoid texture bugs
    -----------------------------------------------
    inCutscene = true
    CreateThread(setWeather) ---- SUN TIME
    StartCutscene(4) --- START the custscene
    CreateThread(function()
        while IsCutsceneActive() do
            SetPlayerControl(PlayerId(), true, false)
            Wait(1)
        end
    end)
    DoScreenFadeIn(3000)

    Wait(30520) --- custscene time
	for v_3=0, 6, 1 do
		DeleteEntity(ped[v_3])
	end
	PrepareMusicEvent("AC_STOP")
	TriggerMusicEvent("AC_STOP")
    FreezeEntityPosition(plyrId)
    DoScreenFadeOut(500)
    Wait(500)
    StopCutsceneImmediately()
    inCutscene = false
end 

function setWeather()
    while inCutscene do
        SetWeatherTypeNow("EXTRASUNNY")
        NetworkOverrideClockTime(12,0,0)
        Wait(0)
    end
end

function IsMale(ped)
	if IsPedModel(ped, 'mp_m_freemode_01') then
		return true
	else
		return false
	end
end
