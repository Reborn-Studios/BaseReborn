RegisterCommand("me",function(source,args,rawCommand)
	TriggerClientEvent("showme:pressMe", -1,source, rawCommand:sub(4), 10)
end)