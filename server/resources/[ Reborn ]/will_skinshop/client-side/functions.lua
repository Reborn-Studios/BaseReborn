local SkinShops = GlobalState['SkinShops']

AddStateBagChangeHandler('SkinShops',"",function(_,_,value)
	SkinShops = value
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped,false) and not ChangingClothes then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(SkinShops) do
				if v.coords then
					local shopCoords = vector3(v.coords.x, v.coords.y, v.coords.z)
					local distance = #(coords - shopCoords)
					if distance <= 2 then
						timeDistance = 1
						DrawBase3D(shopCoords.x, shopCoords.y, shopCoords.z, "clothes")
						if IsControlJustPressed(0,38) and vSERVER.checkShares() then
							if v.permission == nil or vSERVER.checkPermission(v.permission) then
								OpenMenu(k)
							end
						end
					end
				end
			end
		end
	    Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETMASK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setMask")
AddEventHandler("skinshop:setMask",function(item,texture)
	vRP.playAnim(true,{"missfbi4","takeoff_mask"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,1,item,texture or 0,1)
		SkinData["mask"]["item"] = item
		SkinData["mask"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,1) == SkinData["mask"]["item"] then
		SetPedComponentVariation(ped,1,0,0,1)
	else
		SetPedComponentVariation(ped,1,SkinData["mask"]["item"],SkinData["mask"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETHAT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setHat")
AddEventHandler("skinshop:setHat",function(item,texture)
	vRP.playAnim(true,{"mp_masks@standard_car@ds@","put_on_mask"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedPropIndex(ped,0,item,texture or 0,true)
		SkinData["hat"]["item"] = item
		SkinData["hat"]["texture"] = texture or 0
	elseif GetPedPropIndex(ped,0) == SkinData["hat"]["item"] then
		ClearPedProp(ped,0)
	else
		SetPedPropIndex(ped,0,SkinData["hat"]["item"],SkinData["hat"]["texture"],true)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETGLASSES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setGlasses")
AddEventHandler("skinshop:setGlasses",function(item,texture)
	vRP.playAnim(true,{"clothingspecs","take_off"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedPropIndex(ped,1,item,texture or 0,true)
		SkinData["glass"]["item"] = item
		SkinData["glass"]["texture"] = texture or 0
	elseif GetPedPropIndex(ped,1) == SkinData["glass"]["item"] then
		ClearPedProp(ped,1)
	else
		SetPedPropIndex(ped,1,SkinData["glass"]["item"],SkinData["glass"]["texture"],true)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETARMS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setArms")
AddEventHandler("skinshop:setArms",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,3,item,texture or 0,1)
		SkinData["arms"]["item"] = item
		SkinData["arms"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,3) == SkinData["arms"]["item"] then
		SetPedComponentVariation(ped,3,15,0,1)
	else
		SetPedComponentVariation(ped,3,SkinData["arms"]["item"],SkinData["arms"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETSHOES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setShoes")
AddEventHandler("skinshop:setShoes",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,6,item,texture or 0,1)
		SkinData["shoes"]["item"] = item
		SkinData["shoes"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,6) == SkinData["shoes"]["item"] then
		SetPedComponentVariation(ped,6,5,0,1)
	else
		SetPedComponentVariation(ped,6,SkinData["shoes"]["item"],SkinData["shoes"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETPANTS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setPants")
AddEventHandler("skinshop:setPants",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,4,item,texture or 0,1)
		SkinData["pants"]["item"] = item
		SkinData["pants"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,4) == SkinData["pants"]["item"] then
		if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
			SetPedComponentVariation(ped,4,14,0,1)
		elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
			SetPedComponentVariation(ped,4,15,0,1)
		end
	else
		SetPedComponentVariation(ped,4,SkinData["pants"]["item"],SkinData["pants"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETSHIRT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setShirt")
AddEventHandler("skinshop:setShirt",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,8,item,texture or 0,1)
		SkinData["tshirt"]["item"] = item
		SkinData["tshirt"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,8) == SkinData["tshirt"]["item"] then
		SetPedComponentVariation(ped,8,15,0,1)
		SetPedComponentVariation(ped,3,15,0,1)
	else
		SetPedComponentVariation(ped,8,SkinData["tshirt"]["item"],SkinData["tshirt"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETJACKET
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setJacket")
AddEventHandler("skinshop:setJacket",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,11,item,texture or 0,1)
		SkinData["torso"]["item"] = item
		SkinData["torso"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,11) == SkinData["torso"]["item"] then
		SetPedComponentVariation(ped,11,15,0,1)
		SetPedComponentVariation(ped,3,15,0,1)
	else
		SetPedComponentVariation(ped,11,SkinData["torso"]["item"],SkinData["torso"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETVEST
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:setVest")
AddEventHandler("skinshop:setVest",function(item,texture)
	vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
	Wait(1000)
	local ped = PlayerPedId()
	if item then
		SetPedComponentVariation(ped,9,item,texture or 0,1)
		SkinData["vest"]["item"] = item
		SkinData["vest"]["texture"] = texture or 0
	elseif GetPedDrawableVariation(ped,9) == SkinData["vest"]["item"] then
		SetPedComponentVariation(ped,9,0,0,1)
	else
		SetPedComponentVariation(ped,9,SkinData["vest"]["item"],SkinData["vest"]["texture"],1)
	end
	vRP.removeObjects()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLEBACKPACK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:toggleBackpack")
AddEventHandler("skinshop:toggleBackpack",function(numBack)
	if SkinData["backpack"]["item"] == tonumber(numBack) then
		SkinData["backpack"]["item"] = 0
		SkinData["backpack"]["texture"] = 0
	else
		SkinData["backpack"]["texture"] = 0
		SkinData["backpack"]["item"] = tonumber(numBack)
	end
	SetPedComponentVariation(PlayerPedId(),5,SkinData["backpack"]["item"],SkinData["backpack"]["texture"],1)
	vSERVER.updateClothes(SkinData)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEBACKPACK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("skinshop:removeBackpack")
AddEventHandler("skinshop:removeBackpack",function(numBack)
	if SkinData["backpack"]["item"] == tonumber(numBack) then
		SkinData["backpack"]["item"] = 0
		SkinData["backpack"]["texture"] = 0
		SetPedComponentVariation(PlayerPedId(),5,0,0,1)
		vSERVER.updateClothes(SkinData)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CAMERAS
-----------------------------------------------------------------------------------------------------------------------------------------
local activeCam = nil
local cameras = {
    body = { coords = vec3(0.0, 2.5, 0.9), point = vec3(0.0,0.0,-0.2) },
    head = { coords = vec3(0.0, 0.7, 0.8), point = vec3(0.0,0.0,0.6) },
    chest = { coords = vec3(0.0, 1.4, 0.7), point = vec3(0.0,0.0,0.2) },
    legs = { coords = vec3(0.0, 1.3, 0.2), point = vec3(0.0,0.0,-0.5) }
}

local function changeCamera(cameraName)
    if cameras[cameraName] then
        if cameraName == activeCam then return end
        activeCam = cameraName
        local ped = PlayerPedId()
        local cam = cameras[cameraName]
        local coord = GetOffsetFromEntityInWorldCoords(ped,cam.coords.x,cam.coords.y,cam.coords.z)
        local tempCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA",coord.x,coord.y,coord.z,0,0,0,50.0,false,0)
        local pointCoords = GetOffsetFromEntityInWorldCoords(ped,cam.point.x,cam.point.y,cam.point.z)
        SetCamActive(tempCam, true)
		if FixedCam then
			SetCamActiveWithInterp(tempCam, FixedCam, 600, 1, 1)
		end
        PointCamAtCoord(tempCam, pointCoords.x,pointCoords.y,pointCoords.z)
        CreateThread(function()
            Wait(600)
			if FixedCam then
				DestroyCam(FixedCam,false)
			end
            FixedCam = tempCam
        end)
    end
end

RegisterNUICallback("setupCam",function(data)
	local value = data["value"]
	if value == 1 then
		changeCamera("head")
	elseif value == 2 then
		changeCamera("chest")
	elseif value == 3 then
		changeCamera("legs")
	else
		changeCamera("body")
	end
end)

function CreateCamera(store)
    local ped = PlayerPedId()
    local groundCam = CreateCam("DEFAULT_SCRIPTED_CAMERA",false)
    if store and store.coords then
        SetEntityCoords(ped, store.coords.x, store.coords.y, store.coords.z-0.97,false,false,false,false)
        if store.h then
            SetEntityHeading(ped, store.h)
        end
    end
    AttachCamToEntity(groundCam, ped, 0.5, -1.6, 0.0, false)
    SetCamRot(groundCam, 0, 0.0, 0.0, 0)
    SetCamActive(groundCam, true)
    RenderScriptCams(true, false, 1, true, true)
    activeCam = "body"
    local cam = cameras[activeCam]
    local coord = GetOffsetFromEntityInWorldCoords(ped,cam.coords.x,cam.coords.y,cam.coords.z)
    FixedCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coord.x,coord.y,coord.z, 0,0,0, 50.0,false,0)
    local pointCoords = GetOffsetFromEntityInWorldCoords(ped,cam.point.x,cam.point.y,cam.point.z)
    PointCamAtCoord(FixedCam, pointCoords.x, pointCoords.y, pointCoords.z)
    SetCamActive(FixedCam, true)
    SetCamActiveWithInterp(FixedCam, groundCam, 1000, 1, 1)
    CreateThread(function()
        Wait(1000)
        DestroyCam(groundCam,false)
    end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
local function freezeAnim(dict, anim, flag, keep)
    if not keep then
        ClearPedTasks(PlayerPedId())
    end
    while not HasAnimDictLoaded(dict) do
        RequestAnimDict(dict)
        Wait(10)
    end
    TaskPlayAnim(PlayerPedId(), dict, anim, 2.0, 2.0, -1, flag or 1, 0, false, false, false)
    RemoveAnimDict(dict)
end

function SetPedPosition(handsUp)
    if handsUp then
        freezeAnim("random@mugging3", "handsup_standing_base", 49)
    else
        freezeAnim("move_f@multiplayer", "idle")
    end
end

function DrawText3D(x,y,z, text)
    local _,_x,_y=World3dToScreen2d(x,y,z)
    SetTextScale(0.45, 0.45)
    SetTextFont(6)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    DrawText(_x,_y)
end

local Clothes = {
	['torso'] = "jaqueta",
	['vest'] = "colete",
	['backpack'] = "mochila",
	['tshirt'] = "camisa",
	['pants'] = "calcas",
	['shoes'] = "sapatos",
	['arms'] = "maos",
	['mask'] = "mascara",
	['hat'] = "chapeu",
	['glasses'] = "oculos",

}
RegisterCommand('vroupas', function()
	local table = ''
	for k,v in pairs(SkinData) do
		table = table .. (Clothes[k] or k)  .. ' ' .. v['item'] .. ' ' .. v['texture'] .. '; '
	end
	vRP.prompt("Roupas", table)
end)

exports("getClothes",function ()
	return SkinData
end)
