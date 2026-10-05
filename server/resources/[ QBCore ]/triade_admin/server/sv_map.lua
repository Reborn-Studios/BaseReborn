-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA MAPA AO VIVO
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("map", "tab.mapa", function(source)
	local players = {}

	for passport, target in pairs(vRP.getUsers()) do
		local coords = TA.coords(target)
		if coords then
			local name = TA.fullName(passport)
			players[#players + 1] = {
				["passport"] = TA.int(passport),
				["name"] = name,
				["initials"] = TA.initials(name),
				["ping"] = GetPlayerPing(target) or 0,
				["bucket"] = GetPlayerRoutingBucket(target) or 0,
				["x"] = coords.x,
				["y"] = coords.y,
				["z"] = coords.z,
				["heading"] = coords.h
			}
		end
	end

	table.sort(players, function(a, b) return a.passport < b.passport end)

	return {
		["players"] = players,
		["bounds"] = TriadeAdmin.Map,
		["refresh"] = TriadeAdmin.Map.Refresh
	}
end)
