-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP UTILS
-----------------------------------------------------------------------------------------------------------------------------------------	
local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
local Webhooks = module("Reborn/webhooks")
WallServer = {}
Tunnel.bindInterface("Wall",WallServer)
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- USER ADMIN PERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------	
function WallServer.isAdmin()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		return HasPermission(source,"wall")
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GET USER ID AND STEAMHEX
-----------------------------------------------------------------------------------------------------------------------------------------	
function WallServer.getInfos()
	local players = {}
	local users = vRP.getUsers()
	for id,source in pairs(users) do
		local userIdentity = vRP.getUserIdentity(id)
		if userIdentity and userIdentity.name then
			players[source] = { name = userIdentity.name.." "..userIdentity.name2, id = id }
		else
			players[source] = { name = "Indefinido", id = id }
		end
	end
	return players
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REPORT LOG WEBHOOK
-----------------------------------------------------------------------------------------------------------------------------------------
function WallServer.reportLog(toggle)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		vRP.createWeebHook(Webhooks.webhookids,"```prolog\n[ID]: "..user_id.." \n[STATUS DO WALL]: ".. toggle ..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end
