-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRPC = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("chat",Creative)
vKEYBOARD = Tunnel.getInterface("keyboard")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT:SERVERMESSAGE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("chat:ServerMessage")
AddEventHandler("chat:ServerMessage",function(Mode,Message)
	local source = source
	local Passport = vRP.Passport(source)
	if not Passport then return false end

	local Name = vRP.FullName(Passport)
	local Messages = Message:gsub("[<>]","")

	if Mode == "GERAL" then
		TriggerClientEvent("chat:ClientMessage",-1,Name,Messages,Mode)
	elseif Mode == "OOC" then
		TriggerClientEvent("chat:ClientMessage",source,Name,Messages,Mode)
		for _,Sources in pairs(vRPC.ClosestPeds(source,10)) do
			async(function()
				TriggerClientEvent("chat:ClientMessage",Sources,Name,Messages,Mode)
			end)
		end
	elseif Mode then
		if vRP.GetHealth(source) > 100 then
			for Passports,_ in pairs(vRP.numPermission(Mode)) do
				local Source = vRP.Source(Passports)
				if Source then
					TriggerClientEvent("chat:ClientMessage",Source,Name,Messages,Mode)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMMANDS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("me",function(source,Message,History)
	local Passport = vRP.Passport(source)
	if Passport and Message[1] then
		local Name = vRP.FullName(Passport)
		local Message = string.sub(History:sub(4),1,100)
		TriggerClientEvent("chat:me_new",-1,source,Name,Message,10)
	end
end)

RegisterCommand("pol2",function(source,args,History)
	local Passport = vRP.Passport(source)
	if Passport and args[1] then
		if vRP.hasPermission(Passport,"policia.permissao") then
			if vRP.GetHealth(source) > 100 and not Player(source).state.Handcuff then
				local Message = string.sub(History:sub(4),1,100)
				TriggerClientEvent("chat:ClientMessage",-1,"🚨",Message,"Police")
			end
		end
	end
end)

RegisterCommand("hp2",function(source,args,History)
	local Passport = vRP.Passport(source)
	if Passport and args[1] then
		if vRP.hasPermission(Passport,"paramedico.permissao") then
			if vRP.GetHealth(source) > 100 and not Player(source).state.Handcuff then
				local Message = string.sub(History:sub(4),1,100)
				TriggerClientEvent("chat:ClientMessage",-1,"🫀",Message,"Paramedic")
			end
		end
	end
end)

RegisterCommand("mec2",function(source,args,History)
	local Passport = vRP.Passport(source)
	if Passport and args[1] then
		if vRP.hasPermission(Passport,"mecanico.permissao") then
			if vRP.GetHealth(source) > 100 and not Player(source).state.Handcuff then
				local Message = string.sub(History:sub(4),1,100)
				TriggerClientEvent("chat:ClientMessage",-1,"🔧",Message,"Mechanic")
			end
		end
	end
end)

RegisterCommand("ilegal",function(source,args,History)
	local Passport = vRP.Passport(source)
	if Passport and args[1] then
		if not vRP.hasPermission(Passport,"policia.permissao") then
			if vRP.GetHealth(source) > 100 and not Player(source).state.Handcuff then
				local Message = string.sub(History:sub(7),1,100)
				for k,v in pairs(vRP.getUsers()) do
					if not vRP.hasPermission(k,"policia.permissao") then
						TriggerClientEvent("chat:ClientMessage",v,"Anonimo",Message,"Ilegal")
					end
				end
			end
		end
	end
end)
