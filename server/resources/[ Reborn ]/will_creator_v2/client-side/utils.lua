---@type SkinData
SkinData = {
    ["gender"] = "mp_m_freemode_01",
    -- Genetica
    ["parent1"] = 0,
    ["parent2"] = 0,
    ["shape1"] = 0,
    ["shape2"] = 0,
    ["similarity"] = 0.5,
    ["skinSimilarity"] = 0.5,
    -- Olhos
    ["eyeColor"] = 0,
    ["eyeOpenness"] = -1,
    ["eyebrowsStyle"] = -1,
    ["eyebrowsOpacity"] = -1,
    ["eyebrowsColor"] = -1,
    ["eyebrowsColor2"] = -1,
    ["eyebrowsHeight"] = -1,
    ["eyebrowsWidth"] = -1,
    -- Nariz
    ["noseWidth"] = -1,
    ["noseHeight"] = -1,
    ["noseLength"] = -1,
    ["noseBridge"] = -1,
    ["noseTip"] = -1,
    ["noseShift"] = -1,
    -- Bochecha
    ["cheekHeight"] = -1,
    ["cheekWidth"] = -1,
    ["cheekboneWidth"] = -1,
    -- Rosto
    ["lips"] = -1,
    ["chinLength"] = -1,
    ["chinPosition"] = -1,
    ["chinWidth"] = -1,
    ["chinShape"] = -1,
    ["jawWidth"] = -1,
    ["jawHeight"] = -1,
    ["neckLength"] = -1,
    -- Cabelo
    ["hair"] = -1,
    ["hairColor"] = -1,
    ["hairColor2"] = -1,
    -- Barba
    ["beard"] = -1,
    ["beardColor"] = -1,
    -- Maquiagem
    ["blush"] = -1,
    ["blushColor"] = -1,
    ["lipstick"] = -1,
    ["lipstickColor"] = -1,
    ["makeup"] = -1,
    -- Aspectos
    ["aspect"] = -1,
    ["skin"] = -1,
    ["freckles"] = -1,
    ["wrinkles"] = -1,
    ["wrinklesOpacity"] = -1,
    -- Corpo
    ["bodyHair"] = -1,
    ["bodyHairColor"] = -1,
    ["blemishes1"] = -1,
    ["blemishes2"] = -1,
    ["shirtOverlay"] = -1,
}

Clothes = {
	["hats"] = { item = 0, texture = 0 },
	["glasses"] = { item = 0, texture = 0 },
	["ear"] = { item = 0, texture = 0 },
	["watches"] = { item = 0, texture = 0 },
	["bracelets"] = { item = 0, texture = 0 },
	["mask"] = { item = 0, texture = 0 },
    ["hair"] = { item = 0, texture = 0 },
	["torso"] = { item = 0, texture = 0 },
	["legs"] = { item = 0, texture = 0 },
	["parachutes"] = { item = 0, texture = 0 },
	["shoes"] = { item = 0, texture = 0 },
	["accessories"] = { item = 0, texture = 0 },
	["undershirts"] = { item = 0, texture = 0 },
	["vest"] = { item = 0, texture = 0 },
	["decals"] = { item = 0, texture = 0 },
	["tops"] = { item = 0, texture = 0 },
}

Variations = {
	["hats"] = { type = "prop", id = 0 },
	["glasses"] = { type = "prop", id = 1 },
	["ear"] = { type = "prop", id = 2 },
	["watches"] = { type = "prop", id = 6 },
	["bracelets"] = { type = "prop", id = 7 },
	["mask"] = { type = "variation", id = 1 },
    ["hair"] = { type = "variation", id = 2 },
	["torsos"] = { type = "variation", id = 3 },
	["legs"] = { type = "variation", id = 4 },
	["parachutes"] = { type = "variation", id = 5 },
	["shoes"] = { type = "variation", id = 6 },
	["accessories"] = { type = "variation", id = 7 },
	["undershirts"] = { type = "variation", id = 8 },
	["vest"] = { type = "variation", id = 9 },
	["decals"] = { type = "variation", id = 10 },
	["tops"] = { type = "variation", id = 11 },

    ["beard"] = { type = "overlay", id = 1 },
    ["eyebrowsStyle"] = { type = "overlay", id = 2 },
    ["wrinkles"] = { type = "overlay", id = 3 },
    ["makeup"] = { type = "overlay", id = 4 },
    ["blush"] = { type = "overlay", id = 5 },
    ["lipstick"] = { type = "overlay", id = 8 },
    ["freckles"] = { type = "overlay", id = 9 },
    ["bodyHair"] = { type = "overlay", id = 10 },
    ["eyeColor"] = { type = "eye", id = 1 },
}

function GetMaxValues(disabled)
    if not disabled then disabled = Config.DisabledCategories end
	local MaxModels = {
		["torsos"] = { item = 0, texture = 0 },
		["parachutes"] = { item = 0, texture = 0 },
		["undershirts"] = { item = 0, texture = 0 },
		["tops"] = { item = 0, texture = 0 },
		["legs"] = { item = 0, texture = 0 },
		["vest"] = { item = 0, texture = 0 },
		["shoes"] = { item = 0, texture = 0 },
		["mask"] = { item = 0, texture = 0 },
		["hats"] = { item = 0, texture = 0 },
		["glasses"] = { item = 0, texture = 0 },
		["ear"] = { item = 0, texture = 0 },
		["watches"] = { item = 0, texture = 0 },
		["bracelets"] = { item = 0, texture = 0 },
		["accessories"] = { item = 0, texture = 0 },
		["decals"] = { item = 0, texture = 0 },

        ["beard"] = { item = 0, texture = 0 },
        ["eyebrowsStyle"] = { item = 0, texture = 0 },
        ["wrinkles"] = { item = 0, texture = 0 },
        ["makeup"] = { item = 0, texture = 0 },
        ["blush"] = { item = 0, texture = 0 },
        ["lipstick"] = { item = 0, texture = 0 },
        ["freckles"] = { item = 0, texture = 0 },
        ["bodyHair"] = { item = 0, texture = 0 },
		["hair"] = { item = 0, texture = 0 },
		["eyeColor"] = { item = 32, texture = 0 },
	}

	local ped = PlayerPedId()
    local disabledCategories = disabled[GetEntityModel(ped)] or {}

	for k,v in pairs(Variations) do
        if v["type"] == "variation" then
            MaxModels[k]["item"] = GetNumberOfPedDrawableVariations(ped,v["id"]) - 1
            MaxModels[k]["texture"] = GetNumberOfPedTextureVariations(ped,v["id"],GetPedDrawableVariation(ped,v["id"])) - 1

            if MaxModels[k]["texture"] <= 0 then
                MaxModels[k]["texture"] = 0
            end
        elseif v["type"] == "prop" then
            MaxModels[k]["item"] = GetNumberOfPedPropDrawableVariations(ped,v["id"]) - 1
            MaxModels[k]["texture"] = GetNumberOfPedPropTextureVariations(ped,v["id"],GetPedPropIndex(ped,v["id"])) - 1

            if MaxModels[k]["texture"] <= 0 then
                MaxModels[k]["texture"] = 0
            end
        elseif v["type"] == "overlay" then
            MaxModels[k]["item"] = GetNumHeadOverlayValues(v["id"]) - 1
        end
        if disabledCategories[k] then
            MaxModels[k]["disabled"] = disabledCategories[k]
        end
	end
    return MaxModels
end

function LoadModel(model)
	while not HasModelLoaded(model) do
        RequestModel(model)
        Wait(10)
    end
	return true
end

function LoadAnim(anim)
	RequestAnimDict(anim)
	while not HasAnimDictLoaded(anim) do
		RequestAnimDict(anim)
		Wait(10)
	end
	return true
end

function Teleport(ped,x,y,z)
    local heading = nil
    if type(x) == "vector3" then
        x,y,z = table.unpack(x)
    elseif type(x) == "vector4" then
        heading = x.w
        x,y,z = table.unpack(x)
    elseif type(x) == "table" then
        heading = x.heading
        z = x.z
        y = x.y
        x = x.x
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
    if heading then
        SetEntityHeading(ped, heading)
    end
    FreezeEntityPosition(ped, false)
end

local function getCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot(0)
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))
	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

function GetCamCoords()
    local cam = GetGameplayCamCoord()
    local camCds = getCoordsFromCam(20.0,cam)
    local handle = StartExpensiveSynchronousShapeTestLosProbe(cam.x,cam.y,cam.z,camCds.x,camCds.y,camCds.z,-1,PlayerPedId(),4)
    local _,hit,coords = GetShapeTestResult(handle)
    return hit,coords
end

function GetBlipCoords()
    local isAdding = true
    repeat
        DisablePlayerFiring(PlayerId(), true)
        DisableControlAction(0, 25, true)
        DrawLocalText("~g~MOUSE LEFT~w~  COLOCAR",0.015,0.56)
        DrawLocalText("~r~MOUSE RIGHT~w~  CANCELAR",0.015,0.59)
        local hit,coords = GetCamCoords()
        if hit then
            ---@diagnostic disable-next-line: missing-parameter
            DrawMarker(27, coords.x, coords.y, coords.z + 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.7, 0.7, 25, 42, 255, 100, false, false, 0, true)
            if IsDisabledControlJustPressed(0, 24) then
                isAdding = false
                return {x = coords.x, y = coords.y, z = coords.z + 0.5}
            end
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
        end
        Wait(0)
    until not isAdding
end

function DrawLocalText(text,x,y)
	SetTextFont(4)
	SetTextScale(0.38,0.38)
	SetTextColour(255,255,255,255)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
