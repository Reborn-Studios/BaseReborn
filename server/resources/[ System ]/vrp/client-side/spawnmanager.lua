local diedAt
local spawnNum = 1
local respawnForced
local spawned = false
local spawnPoints = {}
local spawnLock = false
local autoSpawnCallback
local autoSpawnEnabled = false

local function addSpawnPoint(spawn)
	if not tonumber(spawn.x) or not tonumber(spawn.y) or not tonumber(spawn.z) then
		error("invalid spawn position")
	end

	if not tonumber(spawn.heading) then
		error("invalid spawn heading")
	end

	local model = spawn.model

	if not tonumber(spawn.model) then
		model = GetHashKey(spawn.model)
	end

	if not IsModelInCdimage(model) then
		error("invalid spawn model")
	end

	spawn.model = model
	spawn.idx = spawnNum
	spawnNum = spawnNum + 1

	table.insert(spawnPoints,spawn)

	return spawn.idx
end


AddEventHandler("getMapDirectives",function(add)
	add("spawnpoint",function(state,model)
		return function(opts)
			local x,y,z,heading
			local s,e = pcall(function()
				if opts.x then
					x = opts.x
					y = opts.y
					z = opts.z
				else
					x = opts[1]
					y = opts[2]
					z = opts[3]
				end

				x = x + 0.0001
				y = y + 0.0001
				z = z + 0.0001

				heading = opts.heading and (opts.heading + 0.01) or 0

				addSpawnPoint({ x = x, y = y, z = z, heading = heading, model = model })

				if not tonumber(model) then
					model = GetHashKey(model)
				end

				state.add("xyz",{ x, y, z })
				state.add("model",model)
			end)
		end
	end,function(state,arg)
		for i,sp in ipairs(spawnPoints) do
			if sp.x == state.xyz[1] and sp.y == state.xyz[2] and sp.z == state.xyz[3] and sp.model == state.model then
				table.remove(spawnPoints,i)
				return
			end
		end
	end)
end)

local function loadSpawns(spawnString)
	local data = json.decode(spawnString)
	if not data.spawns then
		error("no spawns in JSON data")
	end

	for i,spawn in ipairs(data.spawns) do
		addSpawnPoint(spawn)
	end
end

local function removeSpawnPoint(spawn)
	for i = 1,#spawnPoints do
		if spawnPoints[i].idx == spawn then
			table.remove(spawnPoints,i)
			return
		end
	end
end

local function setAutoSpawn(enabled)
	autoSpawnEnabled = enabled
end

local function setAutoSpawnCallback(cb)
	autoSpawnCallback = cb
	autoSpawnEnabled = true
end

local function freezePlayer(id,freeze)
	local player = id
	SetPlayerControl(player,not freeze,0)

	local ped = GetPlayerPed(player)

	if not freeze then
		if not IsEntityVisible(ped) then
			SetEntityVisible(ped,true,false)
		end

		FreezeEntityPosition(ped,false)
		SetPlayerInvincible(player,false)
	else
		if IsEntityVisible(ped) then
			SetEntityVisible(ped,false,false)
		end

		FreezeEntityPosition(ped,true)
		SetPlayerInvincible(player,true)

		if not IsPedFatallyInjured(ped) then
			ClearPedTasksImmediately(ped)
		end
	end
end

local function spawnPlayer(spawnIdx,cb)
	if spawnLock then
		return
	end

	spawnLock = true

	CreateThread(function()
		if not spawnIdx then
			spawnIdx = GetRandomIntInRange(1,#spawnPoints+1)
		end

		local spawn

		if type(spawnIdx) == "table" then
			spawn = spawnIdx
		else
			spawn = spawnPoints[spawnIdx]
		end

		if not spawn.skipFade then
			DoScreenFadeOut(500)

			while not IsScreenFadedOut() do
				Wait(10)
			end
		end

		if not spawn then
			spawnLock = false
			return
		end

		freezePlayer(PlayerId(),true)

		if spawn.model then
			RequestModel(spawn.model)
			while not HasModelLoaded(spawn.model) do
				RequestModel(spawn.model)
				Wait(10)
			end

			SetPlayerModel(PlayerId(),spawn.model)
			SetModelAsNoLongerNeeded(spawn.model)
		end

		RequestCollisionAtCoord(spawn.x,spawn.y,spawn.z)

		local ped = PlayerPedId()

		SetEntityCoordsNoOffset(ped,spawn.x,spawn.y,spawn.z,false,false,false)
		NetworkResurrectLocalPlayer(spawn.x,spawn.y,spawn.z,spawn.heading,0,true)
		ClearPedTasksImmediately(ped)
		--RemoveAllPedWeapons(ped)
		ClearPlayerWantedLevel(PlayerId())

		local time = GetGameTimer()

		while (not HasCollisionLoadedAroundEntity(ped) and (GetGameTimer() - time) < 5000) do
			Wait(10)
		end

		ShutdownLoadingScreen()

		if IsScreenFadedOut() then
			DoScreenFadeIn(500)

			while not IsScreenFadedIn() do
				Wait(10)
			end
		end

		freezePlayer(PlayerId(),false)

		TriggerServerEvent("vRP:playerSpawned")
		TriggerEvent("vRP:clientSpawned")

		spawned = true

		if cb then
			cb(spawn)
		end

		spawnLock = false
	end)
end

CreateThread(function()
	while true do
		Wait(1000)
		if not spawned then
			local playerPed = PlayerPedId()
			if playerPed and playerPed ~= -1 then
				if autoSpawnEnabled then
					if NetworkIsPlayerActive(PlayerId()) then
						if (diedAt and (math.abs(GetTimeDifference(GetGameTimer(),diedAt)) > 2000)) or respawnForced then
							if autoSpawnCallback then
								autoSpawnCallback()
							else
								spawnPlayer()
							end

							respawnForced = false
						end
					end
				end

				if IsEntityDead(playerPed) then
					if not diedAt then
						diedAt = GetGameTimer()
					end
				else
					diedAt = nil
				end
			end
		else
			break
		end
	end
end)

local function forceRespawn()
	spawnLock = false
	respawnForced = true
end

exports("spawnPlayer",spawnPlayer)
exportHandler('spawnmanager', 'spawnPlayer', spawnPlayer)
exports("addSpawnPoint",addSpawnPoint)
exportHandler('spawnmanager', 'addSpawnPoint', addSpawnPoint)
exports("removeSpawnPoint",removeSpawnPoint)
exportHandler('spawnmanager', 'removeSpawnPoint', removeSpawnPoint)
exports("loadSpawns",loadSpawns)
exportHandler('spawnmanager', 'loadSpawns', loadSpawns)
exports("setAutoSpawn",setAutoSpawn)
exportHandler('spawnmanager', 'setAutoSpawn', setAutoSpawn)
exports("setAutoSpawnCallback",setAutoSpawnCallback)
exportHandler('spawnmanager', "setAutoSpawnCallback",setAutoSpawnCallback)
exports("forceRespawn",forceRespawn)
exportHandler('spawnmanager', "forceRespawn",forceRespawn)
