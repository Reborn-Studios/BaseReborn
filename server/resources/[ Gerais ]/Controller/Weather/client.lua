local weatherSync = GlobalState.weatherSync
local clockHours,clockMinutes = GlobalState.clockHours,GlobalState.clockMinutes

AddStateBagChangeHandler("weatherSync","",function (_, _, value)
	weatherSync = value
end)

AddStateBagChangeHandler("clockHours","",function (_, _, value)
	clockHours = value
end)

AddStateBagChangeHandler("clockMinutes","",function (_, _, value)
	clockMinutes = value
end)

CreateThread(function()
	while true do
		SetWeatherTypeNow(weatherSync)
		SetWeatherTypePersist(weatherSync)
		SetWeatherTypeNowPersist(weatherSync)
		NetworkOverrideClockTime(clockHours,clockMinutes,00)
		Wait(1000)
	end
end)