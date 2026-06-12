local assaultToggle = false
local clockHours = GlobalState.clockHours

AddStateBagChangeHandler("clockHours","",function (_, _, value)
	clockHours = value
end)

CreateThread(function ()
    while AssaultConfig.enable do
        Wait(5000)
        if not assaultToggle then
            if (clockHours > 12 and clockHours >= AssaultConfig.StartTime) or (clockHours < 12 and clockHours < AssaultConfig.EndTime) then
                assaultToggle = true
                SendNUIMessage({ action = "showAssault" })
            end
        elseif assaultToggle then
            if (clockHours < 12 and clockHours >= AssaultConfig.EndTime) or (clockHours > 12 and clockHours < AssaultConfig.StartTime) then
                assaultToggle = false
                SendNUIMessage({ action = "hideAssault" })
            end
        end
    end
end)
