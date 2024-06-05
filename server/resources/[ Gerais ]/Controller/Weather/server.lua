local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local timeDate = GetGameTimer()
GlobalState.clockHours = 7
GlobalState.clockMinutes = 0
GlobalState.weatherSync = "EXTRASUNNY"
-----------------------------------------------------------------------------------------------------------------------------------------
-- WEATHER TYPES
-----------------------------------------------------------------------------------------------------------------------------------------
local weatherTypes = { 
	["BLIZZARD"] = true,
	["CLEAR"] = true,
	["CLEARING"] = true,
	["CLOUDS"] = true,
	["EXTRASUNNY"] = true,
	["FOGGY"] = true,
	["HALLOWEEN"] = true,
	["OVERCAST"] = true,
	["RAIN"] = true,
	["SMOG"] = true,
	["SNOWLIGHT"] = true,
	["THUNDER"] = true,
	["XMAS"] = true,
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADGLOBAL
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		if GetGameTimer() >= (timeDate + 4000) then
			timeDate = GetGameTimer()
			GlobalState.clockMinutes = GlobalState.clockMinutes + 1

			if GlobalState.clockMinutes >= 60 then
				GlobalState.clockHours = GlobalState.clockHours + 1
				GlobalState.clockMinutes = 0

				if GlobalState.clockHours >= 24 then
					GlobalState.clockHours = 0
				end
			end
		end

		Citizen.Wait(4000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMANDO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("time",function(source,args,rawCommand)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"admin.permissao") and parseInt(args[1]) >= 0 and parseInt(args[2]) >= 0 then
			GlobalState.clockMinutes = parseInt(args[2])
			GlobalState.clockHours = parseInt(args[1])

			if GlobalState.clockMinutes >= 60 then
				GlobalState.clockMinutes = 0
			end

			if GlobalState.clockHours >= 24 then
				GlobalState.clockHours = 0
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WEATHER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("weather",function(source,args,rawCommand)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"admin.permissao") and args[1] ~= "" and weatherTypes[string.upper(args[1])] then
			GlobalState.weatherSync = string.upper(args[1])
		end
	end
end)