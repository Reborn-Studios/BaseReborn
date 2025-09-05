-----------------------------------------------------------------------------------------------------------------------------------------
-- vRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Proxy = module("lib/Proxy") or {}
Tunnel = module("lib/Tunnel") or {}
Webhooks = module("config/webhooks") or {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vRP = {}
QBCore = {}
vRP.users = {}
vRP.rusers = {}
vRP.user_tables = {}
vRP.user_sources = {}
Proxy.addInterface("vRP",vRP)

tvRP = {}
Tunnel.bindInterface("vRP",tvRP)
vRPclient = Tunnel.getInterface("vRP")

GlobalState["OnlinePlayers"] = 0
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local db_driver
local db_drivers = {}
local cached_queries = {}
local cached_prepares = {}
local db_initialized = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTERDBDRIVER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.registerDBDriver(name,on_init,on_prepare,on_query)
	if not db_drivers[name] then
		db_drivers[name] = { on_init,on_prepare,on_query }
		db_driver = db_drivers[name]
		db_initialized = true

		for _,prepare in pairs(cached_prepares) do
			on_prepare(table.unpack(prepare,1,table.maxn(prepare)))
		end

		for _,query in pairs(cached_queries) do
			query[2](on_query(table.unpack(query[1],1,table.maxn(query[1]))))
		end

		cached_prepares = nil
		cached_queries = nil
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- FORMAT
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.format(n)
	local left,num,right = string.match(n,'^([^%d]*%d)(%d*)(.-)$')
	return left..(num:reverse():gsub('(%d%d%d)','%1.'):reverse())..right
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.prepare(name,query)
	if db_initialized then
		db_driver[2](name,query)
	else
		table.insert(cached_prepares,{ name,query })
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- QUERY
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.query(name,params,mode)
	if not mode then mode = "query" end

	if db_initialized then
		return db_driver[3](name,params or {},mode)
	else
		local r = async()
		table.insert(cached_queries,{{ name,params or {},mode },r })
		return r:wait()
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- EXECUTE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.execute(name,params)
	return vRP.query(name,params,"execute")
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ISBANNED
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.isBanned(identifier)
	local rows = vRP.getInfos(identifier)
	if rows[1] then
		return rows[1].banned
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ISWHITELISTED
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.isWhitelisted(identifier)
	local rows = vRP.getInfos(identifier)
	if rows[1] then
		return rows[1].whitelist
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETUDATA
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.setUData(user_id,key,value)
	vRP.execute("vRP/set_userdata",{ user_id = parseInt(user_id), key = key, value = value })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUDATA
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUData(user_id,key)
	local rows = vRP.query("vRP/get_userdata",{ user_id = parseInt(user_id), key = key })
	if #rows > 0 then
		return rows[1].dvalue
	else
		return ""
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETSDATA
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.setSData(key,value)
	vRP.execute("vRP/set_srvdata",{ key = key, value = value })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETSDATA
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getSData(key)
	local rows = vRP.query("vRP/get_srvdata",{ key = key })
	if #rows > 0 then
		return rows[1].dvalue
	else
		return ""
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERDATATABLE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserDataTable(user_id)
	return vRP.user_tables[user_id]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETINVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
if GlobalState['Inventory'] == "ox_inventory" then
	vRP.getInventory = function(user_id)
		local nplayer = vRP.getUserSource(user_id)
		if nplayer then
			local userInv = exports.ox_inventory:GetInventory(nplayer)
			if userInv then
				local playerItems = userInv.items or {}
				for k,v in pairs(playerItems) do
					playerItems[k].item = v.name
					playerItems[k].amount = v.count
				end
				return playerItems
			end
		end
		return {}
	end
else
	function vRP.getInventory(user_id)
		local data = vRP.user_tables[user_id]
		if data then
			return data.inventorys
		end
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATESELECTSKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.updateSelectSkin(user_id,hash)
	local data = vRP.user_tables[user_id]
	if data then
		data.skin = hash
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- USERLIST
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.userList()
	return vRP.user_sources
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERID
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserId(source)
	return vRP.users[source]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUsers()
	local users = {}
	for k,v in pairs(vRP.user_sources) do
		users[k] = v
	end
	return users
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERSOURCE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserSource(user_id)
	return vRP.user_sources[user_id]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERDROPPED
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("playerDropped",function()
	local source = source
	local ped = GetPlayerPed(source)
    local health = GetEntityHealth(ped)
    local armour = GetPedArmour(ped)
    local coords = GetEntityCoords(ped)
	GlobalState["OnlinePlayers"] = GlobalState["OnlinePlayers"] - 1
	vRP.rejoinServer(source,health,armour,coords)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KICK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.kick(user_id,reason)
	if vRP.user_sources[user_id] then
		local source = vRP.user_sources[user_id]
		local ped = GetPlayerPed(source)
		local health = GetEntityHealth(ped)
		local armour = GetPedArmour(ped)
		local coords = GetEntityCoords(ped)
		vRP.rejoinServer(source,health,armour,coords)
		DropPlayer(source,reason)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DROPPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.rejoinServer(source,health,armour,coords)
	local user_id = vRP.getUserId(source)
	if user_id then
		local identity = vRP.getUserIdentity(user_id)
		if identity then
			if health then
				vRP.user_tables[user_id].health = health
			end
			if armour then
				vRP.user_tables[user_id].armour = armour
			end
			if coords then
				vRP.user_tables[user_id].position = { x = coords.x, y = coords.y, z = coords.z }
			end
			TriggerEvent("vRP:playerLeave",user_id,source)
			TriggerEvent("playerDisconnect",user_id,source)
			TriggerEvent("Disconnect",user_id,source)
			TriggerEvent("esx:playerLogout",source)
			vRP.setUData(user_id,"Datatable",json.encode(vRP.user_tables[user_id]))
			local Player = QBCore.Functions.GetPlayer(source)
			if Player then
				Player.Functions.Logout()
			end
			vRP.rusers[user_id] = nil
			vRP.users[source] = nil
			vRP.user_sources[user_id] = nil
			vRP.user_tables[user_id] = nil
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- RESET BACKPACK_WEIGHT
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.resetBackpackWeight(user_id)
	local data = vRP.user_tables[user_id]
	if data then
		local first_login = Reborn.first_login()
		data.backpack = first_login['DefaultBackpack'] or 10
		if GetResourceState("ox_inventory") == "started" then
			local nplayer = vRP.getUserSource(user_id)
			if nplayer then
				local BACKPACK_SLOTS = 50
				exports.ox_inventory:SetMaxWeight(nplayer, data.backpack * 1000)
				exports.ox_inventory:SetSlotCount(nplayer, BACKPACK_SLOTS)
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLEARINVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.clearInventory(user_id)
	if not vRP.hasPermission(user_id, "mochila.permissao") then
		vRP.resetBackpackWeight(user_id)
	end
	vRP.user_tables[user_id].inventorys = {}
	TriggerEvent("ld-inv:Server:ClearInventory", user_id)
	TriggerEvent("ld-inv:Server:ClearWeapons", user_id)
	if GetResourceState("ox_inventory") == "started" then
		local nplayer = vRP.getUserSource(user_id)
		if nplayer then
			exports.ox_inventory:ClearInventory(nplayer)
		end
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERSPAWNED
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("baseModule:idLoaded")
AddEventHandler("baseModule:idLoaded",function(source,user,model)
	local user_id = parseInt(user)
	if not user_id then return end
	if vRP.rusers[user_id] == nil then
		local playerData = vRP.getUData(parseInt(user_id),"Datatable")
		local resultData = json.decode(playerData) or {}
		vRP.user_tables[user_id] = resultData
		vRP.user_sources[user_id] = source
		vRP.users[source] = user_id

		local identity = vRP.getUserIdentity(user_id)
		if model ~= nil then
			local first_login = Reborn.first_login()
			TriggerClientEvent("Notify",source,"importante",first_login['Mensagem'],20000)
			vRP.user_tables[user_id].weaps = {}
			vRP.user_tables[user_id].inventorys = {}
			vRP.user_tables[user_id].health = GlobalState['Basics']['MaxHealth'] or 400
			local skin = "m"
			if model then
				if model == "female" then
					model = "mp_f_freemode_01"
					skin = "f"
				elseif model == "male" then
					model = "mp_m_freemode_01"
				end
				vRP.user_tables[user_id].skin = GetHashKey(model)
			else
				vRP.user_tables[user_id].skin = `mp_m_freemode_01`
			end
			vRP.user_tables[user_id].backpack = first_login['DefaultBackpack'] or 10
			TriggerEvent("Reborn:newPlayer",user_id)
			SetTimeout(5000,function()
				for k,v in pairs(first_login['Itens']) do
					vRP.giveInventoryItem(user_id,k,v)
				end
			end)
			TriggerEvent("esx:onPlayerJoined",source,{
                firstname = identity.name,
                lastname = identity.name2,
                dateofbirth = "01-01-2025",
                sex = skin == "f" and 1 or 0,
                height = 120,
                skin = skin
            })
		end
		if GetResourceState("nation_creator") ~= "started" then
			TriggerEvent("will_login:checkRegister",source)
		end

		if identity then
			vRP.rusers[user_id] = identity.identifier
		end

		GlobalState["OnlinePlayers"] = GlobalState["OnlinePlayers"] + 1

		local registration = vRP.getUserRegistration(user_id)
		if registration == nil then
			vRP.execute("vRP/update_characters",{ id = parseInt(user_id), registration = vRP.generateRegistrationNumber(), phone = vRP.generatePhoneNumber() })
		end
        vRP.setUData(user_id,"Datatable",json.encode(vRP.user_tables[user_id]))
		TriggerEvent("vRP:playerSpawn",user_id,source,true)
		TriggerEvent("playerConnect",user_id,source, true)
		TriggerClientEvent("hudActived",source,true)
	else
		DropPlayer(source,"Você já está conectado em outra conta.")
		if vRP.user_sources[user_id] then
			DropPlayer(vRP.user_sources[user_id],"Você conectou em outra conta.")
		end
		print("O jogador "..user_id.." tentou se conectar em duas contas.")
	end
end)
