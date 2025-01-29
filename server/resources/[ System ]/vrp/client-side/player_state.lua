RegisterNetEvent("syncmala")
AddEventHandler("syncmala",function(index)
	if NetworkDoesNetworkIdExist(index) then
		local v = NetToVeh(index)
		if DoesEntityExist(v) then
			if IsEntityAVehicle(v) then
				SetVehicleDoorOpen(v,5,false,false)
				Wait(1000)
				SetVehicleDoorShut(v,5,false)
			end
		end
	end
end)

CreateThread(function()
	for i = 1,121 do
		EnableDispatchService(i,false)
	end
	while true do
		SetPlayerHealthRechargeMultiplier(cache.playerId,0.0)
		SetPlayerHealthRechargeLimit(cache.playerId,0.0)
		local maxHealth = GlobalState['Basics']['MaxHealth'] or 400
		if GetEntityMaxHealth(cache.ped) ~= maxHealth then
			SetEntityMaxHealth(cache.ped,maxHealth)
			SetPedMaxHealth(cache.ped,maxHealth)
		end

		if GetPlayerMaxArmour(cache.ped) ~= 100 then
			SetPlayerMaxArmour(cache.ped,100)
		end

		if GetPlayerMaxStamina(cache.playerId) ~= 200.0 then
			SetPlayerMaxStamina(cache.playerId,200.0)
		end

		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local noclip = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYSOUND
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.playSound(dict,name)
	PlaySoundFrontend(-1,dict,name,false)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETMODELPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getSkins()
    return GetEntityModel(PlayerPedId()) == GetHashKey("mp_m_freemode_01") or GetEntityModel(PlayerPedId()) == GetHashKey("mp_f_freemode_01")
end

function tvRP.getModelPlayer()
	local ped = PlayerPedId()
	if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
		return "mp_m_freemode_01"
	elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
		return "mp_f_freemode_01"
	elseif GetEntityModel(ped) == GetHashKey("s_f_y_scrubs_01") then
		return "s_f_y_scrubs_01"
	end
end

function tvRP.getCustomPlayer()
    local ped = PlayerPedId()
    local custom = { GetPedDrawableVariation(ped,1),GetPedTextureVariation(ped,1),GetPedDrawableVariation(ped,5),GetPedTextureVariation(ped,5),GetPedDrawableVariation(ped,7),GetPedTextureVariation(ped,7),GetPedDrawableVariation(ped,3),GetPedTextureVariation(ped,3),GetPedDrawableVariation(ped,4),GetPedTextureVariation(ped,4),GetPedDrawableVariation(ped,8),GetPedTextureVariation(ped,8),GetPedDrawableVariation(ped,6),GetPedTextureVariation(ped,6),GetPedDrawableVariation(ped,11),GetPedTextureVariation(ped,11),GetPedDrawableVariation(ped,9),GetPedTextureVariation(ped,9),GetPedDrawableVariation(ped,10),GetPedTextureVariation(ped,10),GetPedPropIndex(ped,0),GetPedPropTextureIndex(ped,0),GetPedPropIndex(ped,1),GetPedPropTextureIndex(ped,1),GetPedPropIndex(ped,2),GetPedPropTextureIndex(ped,2),GetPedPropIndex(ped,6),GetPedPropTextureIndex(ped,6),GetPedPropIndex(ped,7),GetPedPropTextureIndex(ped,7) }
    return custom
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETPOSITIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getPositions()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	return mathLegth(coords.x),mathLegth(coords.y),mathLegth(coords.z),mathLegth(GetEntityHeading(ped))
end

function tvRP.getPosition()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	return mathLegth(coords.x),mathLegth(coords.y),mathLegth(coords.z),mathLegth(GetEntityHeading(ped))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- APPLYSKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.applySkin(model)
	local mHash = model
	LoadModel(mHash)

	if HasModelLoaded(mHash) then
		SetPlayerModel(PlayerId(),mHash)
		SetModelAsNoLongerNeeded(mHash)
	end
	SetPedComponentVariation(PlayerPedId(),1,0,0,2)
end

function tvRP.getCustomization()
	local ped = PlayerPedId()
	local custom = {}
	custom.modelhash = GetEntityModel(ped)

	for i = 0,11 do
		custom[i] = { GetPedDrawableVariation(ped,i),GetPedTextureVariation(ped,i),GetPedPaletteVariation(ped,i) }
	end

	for i = 0,10 do
		custom["p"..i] = { GetPedPropIndex(ped,i),math.max(GetPedPropTextureIndex(ped,i),0) }
	end
	return custom
end

local function parse_part(key)
	if type(key) == "string" and string.sub(key,1,1) == "p" then
		return true,tonumber(string.sub(key,2))
	else
		return false,tonumber(key)
	end
end

function tvRP.getDrawableTextures(part,drawable)
	local isprop, index = parse_part(part)
	if isprop then
		return GetNumberOfPedPropTextureVariations(PlayerPedId(),index,drawable)
	else
		return GetNumberOfPedTextureVariations(PlayerPedId(),index,drawable)
	end
end

function tvRP.setCustomization(custom, localApply)
	local r = async()
	CreateThread(function()
		if custom then
			local ped = GetPlayerPed(-1)
			local mhash = nil

			if custom.modelhash then
				mhash = custom.modelhash
			elseif custom.model then
				mhash = GetHashKey(custom.model)
			end

			if mhash then
                local i = 0
                while not HasModelLoaded(mhash) and i < 10000 do
                    i = i + 1
                    RequestModel(mhash)
                    Wait(10)
                end

                if HasModelLoaded(mhash) then
                    -- local armour = GetPedArmour(ped)
                    -- local health = GetEntityHealth(ped)
                    SetPlayerModel(PlayerId(),mhash)
					--SetEntityHealth(ped,health)
                    SetModelAsNoLongerNeeded(mhash)
                end
            end

			ped = GetPlayerPed(-1)
			SetPedMaxHealth(ped,GlobalState['Basics']['MaxHealth'] or 400)

			for k,v in pairs(custom) do
				if k ~= "model" and k ~= "modelhash" then
					local isprop, index = parse_part(k)
					if isprop then
						if v[1] < 0 then
							ClearPedProp(ped,index)
						else
							SetPedPropIndex(ped,index,v[1],v[2],v[3] or true)
						end
					else
						SetPedComponentVariation(ped,index,v[1],v[2],v[3] or 2)
					end
					TriggerEvent("reloadtattos")
				end
			end
			if not localApply then
				vRPserver._updateCustomization(custom)
			end
		end
		r()
	end)
	return r:wait()
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NOCLIP
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.noClip()
	noclip = not noclip
	local ped = PlayerPedId()

	if noclip then
		SetEntityInvincible(ped,true)
		SetEntityVisible(ped,false,false)
		InitNoClipThread()
	else
		SetEntityInvincible(ped,false)
		SetEntityVisible(ped,true,false)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADNOCLIP
-----------------------------------------------------------------------------------------------------------------------------------------
local function getCamDirection()
	local heading = GetGameplayCamRelativeHeading()+GetEntityHeading(PlayerPedId())
	local pitch = GetGameplayCamRelativePitch()
	local x = -math.sin(heading*math.pi/180.0)
	local y = math.cos(heading*math.pi/180.0)
	local z = math.sin(pitch*math.pi/180.0)
	local len = math.sqrt(x*x+y*y+z*z)
	if len ~= 0 then
		x = x / len
		y = y / len
		z = z / len
	end
	return x,y,z
end

function InitNoClipThread()
	CreateThread(function()
		local ped = PlayerPedId()
		while noclip do
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local dx,dy,dz = getCamDirection()
			local speed = 1.0

			SetEntityVelocity(ped,0.0001,0.0001,0.0001)

			if IsControlPressed(0,21) then
				speed = 5.0
			end

			if IsControlPressed(0,22) then
				speed = 30.0
			end

			if IsControlPressed(0,19) then
				speed = 100.0
			end

			if IsControlPressed(0,210) then
				speed = 0.2
			end

			if IsControlPressed(1,32) then
				x = x + speed * dx
				y = y + speed * dy
				z = z + speed * dz
			end

			if IsControlPressed(1,269) then
				x = x - speed * dx
				y = y - speed * dy
				z = z - speed * dz
			end

			if IsControlPressed(1,10) then
				z = z + 1
			end

			if IsControlPressed(1,11) then
				z = z - 1
			end

			SetEntityCoordsNoOffset(ped,x,y,z,true,true,true)
			Wait(1)
		end
	end)
end
