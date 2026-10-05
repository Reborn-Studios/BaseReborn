-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA CLIMA
-----------------------------------------------------------------------------------------------------------------------------------------
local state = {
	["frozen"] = true,
	["rotation"] = false,
	["rotationIndex"] = 1
}

local function save()
	pcall(function() vRP.setSData("triade_admin:weather", json.encode(state)) end)
end

local function load()
	local ok, raw = pcall(function() return vRP.getSData("triade_admin:weather") end)
	if ok and raw and raw ~= "" then
		local decoded = json.decode(raw)
		if type(decoded) == "table" then
			state.frozen = decoded.frozen ~= false
			state.rotation = decoded.rotation == true
			state.rotationIndex = TA.int(decoded.rotationIndex)
			if state.rotationIndex <= 0 then state.rotationIndex = 1 end
		end
	end
end

local function validWeather(id)
	for _, weather in ipairs(TriadeAdmin.Weather.Types) do
		if weather.id == id then return true end
	end
	return false
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- ROTACAO AUTOMATICA
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(5000)
	load()

	while true do
		Wait(math.max(60, TriadeAdmin.Weather.RotationMinutes * 60) * 1000)

		if state.rotation and not state.frozen then
			state.rotationIndex = state.rotationIndex + 1
			if state.rotationIndex > #TriadeAdmin.Weather.Rotation then state.rotationIndex = 1 end

			local weather = TriadeAdmin.Weather.Rotation[state.rotationIndex]
			if weather then
				GlobalState.weatherSync = weather
			end
			save()
		end
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("weather", "tab.clima", function(source)
	return {
		["current"] = GlobalState.weatherSync or "CLEAR",
		["frozen"] = state.frozen,
		["rotation"] = state.rotation,
		["hours"] = TA.int(GlobalState.clockHours),
		["minutes"] = TA.int(GlobalState.clockMinutes),
		["timeFrozen"] = GlobalState.freezeTime == true,
		["types"] = TriadeAdmin.Weather.Types
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("weather.set", "weather.set", function(source, payload)
	local weather = string.upper(TA.str(payload.weather, 24))
	if not validWeather(weather) then return { ok = false, message = "Clima invalido." } end

	GlobalState.weatherSync = weather
	save()

	TA.log(source, "clima", weather)
	return { ok = true, message = "Clima alterado para " .. weather .. "." }
end)

TA.action("weather.freeze", "weather.set", function(source, payload)
	state.frozen = payload.state == true
	if state.frozen then state.rotation = false end
	save()

	TA.log(source, "clima-congelar", tostring(state.frozen))
	return { ok = true, message = state.frozen and "Clima congelado." or "Clima descongelado." }
end)

TA.action("weather.rotation", "weather.set", function(source, payload)
	state.rotation = payload.state == true
	if state.rotation then state.frozen = false end
	save()

	TA.log(source, "clima-rotativo", tostring(state.rotation))
	return { ok = true, message = state.rotation and "Clima rotativo ativado." or "Clima rotativo desativado." }
end)

TA.action("weather.time", "weather.time", function(source, payload)
	local hours = TA.int(payload.hours)
	local minutes = TA.int(payload.minutes)

	if hours < 0 or hours > 23 then return { ok = false, message = "Hora invalida." } end
	if minutes < 0 or minutes > 59 then return { ok = false, message = "Minuto invalido." } end

	GlobalState.clockHours = hours
	GlobalState.clockMinutes = minutes

	TA.log(source, "horario", string.format("%02d:%02d", hours, minutes))
	return { ok = true, message = string.format("Horario definido para %02d:%02d.", hours, minutes) }
end)

TA.action("weather.timeFreeze", "weather.time", function(source, payload)
	GlobalState.freezeTime = payload.state == true

	TA.log(source, "horario-congelar", tostring(payload.state == true))
	return { ok = true, message = (payload.state == true) and "Horario congelado." or "Horario em movimento." }
end)
