local QB = exports["qb-core"]:GetCoreObject()

function GetPlayer()
	return QB.Functions.GetPlayerData()
end

CreateThread(function()
	while GetPlayer() == nil do
		Wait(1000)
	end
	TriggerServerEvent('ds_blipcreator:getBlips')
end)

RegisterNetEvent('QBCore:Client:OnJobUpdate', function()
	TriggerEvent('ds_blipcreator:setBlips',blips)
end)

local groups = { 'job', 'gang' }

function IsPlayerInGroup( filter)
	local type = type(filter)
	local player = GetPlayer()
	if type == 'string' then
		for i = 1, #groups do
			local data = player[groups[i]]
			if data.name == filter then
				return data.name, data.grade.level
			elseif LocalPlayer.state[filter] then
				return filter, 0
			end
		end
	else
		local tabletype = table.type(filter)
		if tabletype == 'hash' then
			for i = 1, #groups do
				local data = player[groups[i]]
				local grade = filter[data.name]

				if grade and grade <= data.grade.level then
					return data.name, data.grade.level
				end
			end
			for group, grade in pairs(filter) do
				if LocalPlayer.state[group] then
					return group, 0
				end
			end
		elseif tabletype == 'array' then
			for i = 1, #filter do
				local group = filter[i]

				for j = 1, #groups do
					local data = player[groups[j]]

					if data.name == group then
						return data.name, data.grade.level
					elseif LocalPlayer.state[group] then
						return group, 0
					end
				end
			end
		end
	end
end
