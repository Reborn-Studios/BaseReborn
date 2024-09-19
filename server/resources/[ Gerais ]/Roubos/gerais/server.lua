-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local Webhooks = module("Reborn/webhooks")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
robRP = {}
Tunnel.bindInterface("Roubos",robRP)
vCLIENT = Tunnel.getInterface("Roubos")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local robberyProgress = {}
local vars = Config.gerais
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKPOLICE
-----------------------------------------------------------------------------------------------------------------------------------------
function robRP.checkPolice(robberyId,coords)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if robberyProgress[vars[robberyId].type] ~= nil then
			TriggerClientEvent("Notify",source,"importante","Aguarde <b>"..robberyProgress[vars[robberyId].type].."</b> segundos.",4000)
			return false
		end

		local amountCops = vRP.numPermission("Police")
		if parseInt(#amountCops) < parseInt(vars[robberyId].cops) then
			TriggerClientEvent("Notify",source,"aviso","Sistema indisponível,tente mais tarde.",4000)
			return false
		end

		if not vRP.hasPermission(user_id,"policia.permissao") then
			if vRP.tryGetInventoryItem(user_id,vars[robberyId].required,1,true) then
				for k,v in pairs(amountCops) do
					local player = vRP.getUserSource(v)
					async(function()
						TriggerClientEvent("NotifyPush",player,{ code = 31, time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Me ajuda esta tento um roubo a "..vars[robberyId].name.."!", title = "Roubo a "..vars[robberyId].name, x = coords.x, y = coords.y, z = coords.z, rgba = {0,150,90} })
					end)
				end

				robberyProgress[vars[robberyId].type] = vars[robberyId].cooldown
				vRPclient._playAnim(source,false,{"oddjobs@shop_robbery@rob_till","loop"},true)
				vRP.createWeebHook(Webhooks.rouboshook,"```prolog\n[ID]: "..user_id.."\n[ROUBOU]: "..vars[robberyId].name.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
				return true
			else
				TriggerClientEvent("Notify",source,"aviso","Você precisa de <b>1x "..vRP.itemNameList(vars[robberyId].required).."</b>.",4000)
				return false
			end
		else
			TriggerClientEvent("Notify",source,"aviso","Você não pode fazer isso.",4000)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYMENTMETHOD
-----------------------------------------------------------------------------------------------------------------------------------------
function robRP.paymentMethod(robberyId)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		vRP.wantedTimer(user_id,600)
		for k,v in pairs(vars[robberyId].itens) do
			vRP.giveInventoryItem(user_id,v.item,parseInt(math.random(v.min,v.max)),true)
			vRPclient._stopAnim(source,false)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		for k,v in pairs(robberyProgress) do
			if robberyProgress[k] > 0 then
				robberyProgress[k] = robberyProgress[k] - 1
				if robberyProgress[k] <= 0 then
					robberyProgress[k] = nil
				end
			end
		end
		Citizen.Wait(1000)
	end
end)
