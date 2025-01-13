vRP = Proxy.getInterface("vRP")

customCamLocation = nil
local animation = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) and not changingClothes then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(Config.shopLocs) do
				if v.coords then
					local distance = #(coords - vector3(v.coords.x,v.coords.y,v.coords.z))
					if distance <= 2 then
						timeDistance = 1
						DrawMarker(27, v.coords.x, v.coords.y, v.coords.z-0.95,0,0,0,0,180.0,130.0,1.0,1.0,1.0,255,0,0,75,0,0,0,1)
						if IsControlJustPressed(0,38) and vSERVER.checkShares() then
							if v.permission == nil or vSERVER.checkPermission(v.permission) then
								openMenu(k)
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
RegisterNetEvent("will_skinshop:setMask")
AddEventHandler("will_skinshop:setMask",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"missfbi4","takeoff_mask"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,1,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,1) == skinData["mask"]["item"] then
			SetPedComponentVariation(ped,1,0,0,1)
		else
			SetPedComponentVariation(ped,1,skinData["mask"]["item"],skinData["mask"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETHAT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setHat")
AddEventHandler("will_skinshop:setHat",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"mp_masks@standard_car@ds@","put_on_mask"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedPropIndex(ped,0,item,texture or 0,1)
		elseif GetPedPropIndex(ped,0) == skinData["hat"]["item"] then
			ClearPedProp(ped,0)
		else
			SetPedPropIndex(ped,0,skinData["hat"]["item"],skinData["hat"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETGLASSES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setGlasses")
AddEventHandler("will_skinshop:setGlasses",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingspecs","take_off"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedPropIndex(ped,1,item,texture or 0,1)
		elseif GetPedPropIndex(ped,1) == skinData["glass"]["item"] then
			ClearPedProp(ped,1)
		else
			SetPedPropIndex(ped,1,skinData["glass"]["item"],skinData["glass"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETARMS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setArms")
AddEventHandler("will_skinshop:setArms",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,3,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,3) == skinData["arms"]["item"] then
			SetPedComponentVariation(ped,3,15,0,1)
		else
			SetPedComponentVariation(ped,3,skinData["arms"]["item"],skinData["arms"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETSHOES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setShoes")
AddEventHandler("will_skinshop:setShoes",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,6,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,6) == skinData["shoes"]["item"] then
			SetPedComponentVariation(ped,6,5,0,1)
		else
			SetPedComponentVariation(ped,6,skinData["shoes"]["item"],skinData["shoes"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETPANTS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setPants")
AddEventHandler("will_skinshop:setPants",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,4,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,4) == skinData["pants"]["item"] then
			if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
				SetPedComponentVariation(ped,4,14,0,1)
			elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
				SetPedComponentVariation(ped,4,15,0,1)
			end
		else
			SetPedComponentVariation(ped,4,skinData["pants"]["item"],skinData["pants"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETSHIRT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setShirt")
AddEventHandler("will_skinshop:setShirt",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,8,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,8) == skinData["tshirt"]["item"] then
			SetPedComponentVariation(ped,8,15,0,1)
			SetPedComponentVariation(ped,3,15,0,1)
		else
			SetPedComponentVariation(ped,8,skinData["tshirt"]["item"],skinData["tshirt"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETJACKET
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setJacket")
AddEventHandler("will_skinshop:setJacket",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,11,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,11) == skinData["torso"]["item"] then
			SetPedComponentVariation(ped,11,15,0,1)
			SetPedComponentVariation(ped,3,15,0,1)
		else
			SetPedComponentVariation(ped,11,skinData["torso"]["item"],skinData["torso"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETVEST
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:setVest")
AddEventHandler("will_skinshop:setVest",function(item,texture)
	if not animation then
		animation = true
		vRP.playAnim(true,{"clothingtie","try_tie_negative_a"},true)
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if item then
			SetPedComponentVariation(ped,9,item,texture or 0,1)
		elseif GetPedDrawableVariation(ped,9) == skinData["vest"]["item"] then
			SetPedComponentVariation(ped,9,0,0,1)
		else
			SetPedComponentVariation(ped,9,skinData["vest"]["item"],skinData["vest"]["texture"],1)
		end

		vRP.removeObjects()
		animation = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLEBACKPACK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:toggleBackpack")
AddEventHandler("will_skinshop:toggleBackpack",function(numBack)
	if skinData["backpack"]["item"] == parseInt(numBack) then
		skinData["backpack"]["item"] = 0
		skinData["backpack"]["texture"] = 0
	else
		skinData["backpack"]["texture"] = 0
		skinData["backpack"]["item"] = parseInt(numBack)
	end

	SetPedComponentVariation(PlayerPedId(),5,skinData["backpack"]["item"],skinData["backpack"]["texture"],1)

	vSERVER.updateClothes(skinData)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEBACKPACK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("will_skinshop:removeBackpack")
AddEventHandler("will_skinshop:removeBackpack",function(numBack)
	if skinData["backpack"]["item"] == parseInt(numBack) then
		skinData["backpack"]["item"] = 0
		skinData["backpack"]["texture"] = 0
		SetPedComponentVariation(PlayerPedId(),5,0,0,1)

		vSERVER.updateClothes(skinData)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CAMRES
-----------------------------------------------------------------------------------------------------------------------------------------
local activeCam = nil
local cameras = {
    body = { coords = vec3(0.0, 2.5, 0.9), point = vec3(0.0,0.0,-0.2) }, 
    head = { coords = vec3(0.0, 0.7, 0.8), point = vec3(0.0,0.0,0.6) },
    chest = { coords = vec3(0.0, 1.4, 0.7), point = vec3(0.0,0.0,0.2) },
    legs = { coords = vec3(0.0, 1.3, 0.2), point = vec3(0.0,0.0,-0.5) }
}

function changeCamera(cameraName)
    if cameras[cameraName] then
        if cameraName == activeCam then return end
        activeCam = cameraName
        local ped = PlayerPedId()
        local cam = cameras[cameraName]
        local coord = GetOffsetFromEntityInWorldCoords(ped,cam.coords)
        local tempCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coord, 0,0,0, 50.0)
        local pointCoords = GetOffsetFromEntityInWorldCoords(ped,cam.point)
        SetCamActive(tempCam, true)
        SetCamActiveWithInterp(tempCam, fixedCam, 600, true, true)
        PointCamAtCoord(tempCam, pointCoords)
        CreateThread(function()
            Wait(600)
            DestroyCam(fixedCam)
            fixedCam = tempCam
        end)
    end
end

function createCamera(store)
    local ped = PlayerPedId()
    local groundCam = CreateCam("DEFAULT_SCRIPTED_CAMERA")
    if store and store.coords then
        SetEntityCoords(ped, store.coords.x, store.coords.y, store.coords.z-0.97)
        if store.h then
            SetEntityHeading(ped, store.h)
        end
    end
    AttachCamToEntity(groundCam, ped, 0.5, -1.6, 0.0)
    SetCamRot(groundCam, 0, 0.0, 0.0)
    SetCamActive(groundCam, true)
    RenderScriptCams(true, false, 1, true, true)
    activeCam = "body"
    local cam = cameras[activeCam]
    local coord = GetOffsetFromEntityInWorldCoords(ped,cam.coords)
    fixedCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coord, 0,0,0, 50.0)
    local pointCoords = GetOffsetFromEntityInWorldCoords(ped,cam.point)
    PointCamAtCoord(fixedCam, pointCoords)
    SetCamActive(fixedCam, true)
    SetCamActiveWithInterp(fixedCam, groundCam, 1000, true, true)
    CreateThread(function()
        Wait(1000)
        DestroyCam(groundCam)
    end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CAMRES
-----------------------------------------------------------------------------------------------------------------------------------------
function freezeAnim(dict, anim, flag, keep)
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

function setPedPosition(handsUp)
    if handsUp then
        freezeAnim("random@mugging3", "handsup_standing_base", 49)
    else
        freezeAnim("move_f@multiplayer", "idle")
    end
end
