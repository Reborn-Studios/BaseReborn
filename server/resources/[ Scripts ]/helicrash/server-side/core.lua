-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Boxes = 0
local Cooldown = os.time()
-----------------------------------------------------------------------------------------------------------------------------------------
-- GLOBALSTATE
-----------------------------------------------------------------------------------------------------------------------------------------
GlobalState["Helicrash"] = false
GlobalState["HelicrashCooldown"] = os.time()
GlobalState["Firework"] = false
local Chests = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if Timers[os.date("%H:%M")] and os.time() >= Cooldown then
			Boxes = 0
			local Selected = math.random(#Components)
			for Number,v in pairs(Components[Selected]) do
				if Number ~= "1" then
					Boxes = Boxes + 1

					local Items = {}
					local Loot = math.random(#Loots)
					for Slot,w in pairs(Loots[Loot]) do
						Loots[Loot][Slot] = w
						table.insert(Items,{ w["item"],w["amount"] })
					end
					if GetResourceState("ox_inventory") == "started" then
						local stashId = exports.ox_inventory:CreateTemporaryStash({
							label = "Helicrash",
							slots = 100,
							maxWeight = 100000,
							coords = v[1],
							items = Items
						})
						Chests["Helicrash-"..Number] = stashId
					else
						vRP.RemSrvData("Chest:Helicrash-"..Number)
						vRP.SetSrvData("Chest:Helicrash-"..Number,json.encode(Loots[Loot]),false)
					end
				end
			end

			TriggerClientEvent("Notify", -1, "azul", "Mayday! Mayday! Tivemos problemas técnicos em nossos motores e estamos em queda livre.", 60000)
            TriggerClientEvent("playMaydaySound", -1)
			GlobalState["Helicrash"] = Selected
			GlobalState["HelicrashCooldown"] = os.time() + 600
			Cooldown = os.time() + 3600
		end

		if Burn[os.date("%H:%M-%d/%m")] and os.time() >= Cooldown then
			TriggerClientEvent('smartphone:createSMS',-1,'Prefeitura',"A Prefeitura de "..GlobalState['Basics']['ServerName'].." deseja a todos os seus cidadões um feliz e próspero Ano Novo! Feliz "..os.date("%Y").."!")
			GlobalState["Firework"] = true
			Cooldown = os.time() + 900

			SetTimeout(900000,function()
				GlobalState["Firework"] = false
			end)
		end

		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BOX
-----------------------------------------------------------------------------------------------------------------------------------------
exports("Box",function()
	if GlobalState["Helicrash"] then
		Boxes = Boxes - 1

		if Boxes <= 0 then
			GlobalState["Helicrash"] = false
			Boxes = 0
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HELICRASH
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("helicrash",function(source,Message)
	local Passport = vRP.Passport(source)
	if Passport then
		if vRP.HasGroup(Passport,"Admin",2) and Message[2] then
			local Hours = parseInt(Message[1])
			local Minutes = parseInt(Message[2])

			if Hours <= 9 then
				Hours = "0"..Hours
			end

			if Minutes <= 9 then
				Minutes = "0"..Minutes
			end

			if not Timers[Hours..":"..Minutes] then
				Timers[Hours..":"..Minutes] = true
				TriggerClientEvent("Notify",source,"verde","Helicrash definido para às <b>"..Hours..":"..Minutes.."</b>.",5000)
			else
				Timers[Hours..":"..Minutes] = nil
				TriggerClientEvent("Notify",source,"verde","Helicrash das <b>"..Hours..":"..Minutes.."</b> removido.",5000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FIREWORK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("firework",function(source)
	local Passport = vRP.Passport(source)
	if Passport and vRP.HasGroup(Passport,"Admin",2) then
    	GlobalState["Firework"] = true

		Wait(900000)
		GlobalState["Firework"] = false
	end
end)

local opened = {}

RegisterServerEvent("chest:Open",function (data)
	local source = source
	local user_id = vRP.getUserId(source)
	local identity = vRP.getUserIdentity(user_id)
	if data.service and Chests[data.service] and identity then
		TriggerClientEvent('ox_inventory:openInventory', source, 'stash', Chests[data.service])
		if not opened[Chests[data.service]] then
			opened[Chests[data.service]] = true
			TriggerClientEvent('Notify', -1, 'amarelo', 'O jogador: <b>' ..identity["name"]..' '..identity["name2"].. '</b> coletou um suprimento do Helicrash.',5000)
		end
	end
end)