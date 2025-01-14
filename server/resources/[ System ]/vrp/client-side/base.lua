-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Proxy = module("vrp","lib/Proxy") or {}
local Tunnel = module("vrp","lib/Tunnel") or {}
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
tvRP = {}
Tunnel.bindInterface("vRP",tvRP)
vRPserver = Tunnel.getInterface("vRP")
Proxy.addInterface("vRP",tvRP)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARANIM
-----------------------------------------------------------------------------------------------------------------------------------------
local animActived = false
local animDict = nil
local animName = nil
local animFlags = 0
local object = nil
-----------------------------------------------------------------------------------------------------------------------------------------
-- TELEPORT
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.teleport(x,y,z)
	SetEntityCoords(PlayerPedId(),x+0.0001,y+0.0001,z+0.0001,true,false,false,true)
	vRPserver._updatePositions(x,y,z)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETCAMDIRECTION
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getCamDirection()
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
-----------------------------------------------------------------------------------------------------------------------------------------
-- ACTIVEPLAYERS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.activePlayers()
	local activePlayers = {}
	for _,v in ipairs(GetActivePlayers()) do
		activePlayers[#activePlayers + 1] = GetPlayerServerId(v)
	end
	return activePlayers
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NEARESTPLAYERS
-----------------------------------------------------------------------------------------------------------------------------------------
function GetPlayers()
	local pedList = {}
	for _,_player in ipairs(GetActivePlayers()) do
		pedList[GetPlayerServerId(_player)] = true
	end
	return pedList
end

function tvRP.nearestPlayers(vDistance)
	local r = {}
	local users = GetPlayers()
	for k,v in pairs(users) do
		local player = GetPlayerFromServerId(k)
		if player ~= PlayerId() and NetworkIsPlayerConnected(player) then
			local oped = GetPlayerPed(player)
			local coords = GetEntityCoords(oped)
			local coordsPed = GetEntityCoords(PlayerPedId())
			local distance = #(coords - coordsPed)
			if distance <= vDistance then
				r[GetPlayerServerId(player)] = distance
			end
		end
	end
	return r
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NEARESTPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.nearestPlayer(radius)
	local p = nil
	local players = tvRP.nearestPlayers(radius)
	local min = radius + 0.0001
	for k,v in pairs(players) do
		if v < min then
			min = v
			p = k
		end
	end
	return p
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYANIM
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.playAnim(upper,seq,looping)
	local ped = PlayerPedId()
	if seq.task then
		tvRP.stopAnim(true)
		if seq.task == "PROP_HUMAN_SEAT_CHAIR_MP_PLAYER" then
			local coords = GetEntityCoords(ped)
			TaskStartScenarioAtPosition(ped,seq.task,coords.x,coords.y,coords.z-1,GetEntityHeading(ped),0,false,false)
		else
			TaskStartScenarioInPlace(ped,seq.task,0,not seq.play_exit)
		end
	else
		tvRP.stopAnim(upper)

		local flags = 0
		if upper then flags = flags + 48 end
		if looping then flags = flags + 1 end

		CreateThread(function()
			local dictAnim = nil
			local nameAnim = nil
			if type(seq[1]) == "table" then
				dictAnim = seq[1][1] 
				nameAnim = seq[1][2]
			else
				dictAnim = seq[1]
				nameAnim = seq[2]
			end
			RequestAnimDict(dictAnim)
			while not HasAnimDictLoaded(dictAnim) do
				RequestAnimDict(dictAnim)
				Wait(10)
			end

			if HasAnimDictLoaded(dictAnim) then
				animDict = dictAnim
				animName = nameAnim
				animFlags = flags
				if flags == 49 then
					animActived = true
				end
				TaskPlayAnim(ped,dictAnim,nameAnim,3.0,3.0,-1,flags,0,false,false,false)
			end
		end)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADANIM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 1000
		if animActived and animDict and animName and not IsEntityPlayingAnim(cache.ped,animDict,animName,3) then
			TaskPlayAnim(cache.ped,animDict,animName,3.0,3.0,-1,animFlags,0,false,false,false)
			timeDistance = 4
		end
		if animActived then
			timeDistance = 4
			DisableControlAction(1,16,true)
			DisableControlAction(1,17,true)
			DisableControlAction(1,24,true)
			DisableControlAction(1,25,true)
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- STOPANIM
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.stopAnim(upper)
	animActived = false
	if upper then
		ClearPedSecondaryTask(PlayerPedId())
	else
		ClearPedTasks(PlayerPedId())
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STOPACTIVED
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.stopActived()
	animActived = false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DELETEOBJECT
-----------------------------------------------------------------------------------------------------------------------------------------
function DeleteObject()
	if object and DoesEntityExist(object) then
		TriggerServerEvent("tryDeleteEntity",ObjToNet(object))
		object = nil
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEOBJECTS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.createObjects(dict,anim,prop,flag,mao,altura,pos1,pos2,pos3,pos4,pos5)
	DeleteObject()
	local ped = PlayerPedId()
	local mHash = GetHashKey(prop)
	LoadModel(mHash)

	if anim ~= "" then
		tvRP.loadAnimSet(dict)
		TaskPlayAnim(ped,dict,anim,3.0,3.0,-1,flag,0,false,false,false)
	end

	if altura then
		local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,0.0,-5.0)
		object = CreateObject(mHash,coords.x,coords.y,coords.z,true,true,true)
		AttachEntityToEntity(object,ped,GetPedBoneIndex(ped,mao),altura,pos1,pos2,pos3,pos4,pos5,true,true,false,true,1,true)
	else
		local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,0.0,-5.0)
		object = CreateObject(mHash,coords.x,coords.y,coords.z,true,true,true)
		AttachEntityToEntity(object,ped,GetPedBoneIndex(ped,mao),0.0,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true)
	end
	SetEntityAsMissionEntity(object,true,true)
	SetModelAsNoLongerNeeded(mHash)
	animDict = dict
	animName = anim
	animFlags = flag
	animActived = true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEACTIVED
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.removeActived()
	if animActived then
		DeleteObject()
		animActived = false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEOBJECTS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.removeObjects(status)
	if status == "one" then
		tvRP.stopAnim(true)
	elseif status == "two" then
		tvRP.stopAnim(false)
	else
		tvRP.stopAnim(true)
		tvRP.stopAnim(false)
	end
	animActived = false
	TriggerEvent("camera")
	TriggerEvent("binoculos")
	DeleteObject()
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADQUEUE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if NetworkIsSessionStarted() then
			TriggerServerEvent("Queue:playerActivated")
			return
		end
		Wait(30000)
	end
end)
