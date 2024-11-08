-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------	
WallServer = {}
Tunnel.bindInterface("Wall",WallServer)
vRP = Proxy.getInterface("vRP")
local ActiveWall = {}
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
			players[source] = { name = userIdentity.name.." "..userIdentity.name2, id = id, wall = ActiveWall[source] }
		else
			players[source] = { name = "Indefinido", id = id, wall = ActiveWall[source] }
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
		if toggle == "ON" then
			ActiveWall[source] = true
		else
			ActiveWall[source] = nil
		end
		vRP.createWeebHook(Webhooks.webhookids,"```prolog\n[ID]: "..user_id.." \n[STATUS DO WALL]: ".. toggle ..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end
