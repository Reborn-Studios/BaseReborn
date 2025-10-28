local permissions = {}
local groups = module('vrp',"config/Groups") or {}
RegisterServerEvent("Reborn:reloadInfos",function() groups = module('vrp',"config/Groups") end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GROUPS FUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getGroupTitle(group)
	local g = groups[group]
	if g and g._config and g._config.title then
		return g._config.title
	end
	return group
end

function vRP.getUserGroups(user_id)
    local data = vRP.query("vRP/get_perm", { user_id = user_id })
    local userGroups = {}
    if data then
        for k,v in pairs(data) do
            userGroups[v.permiss] = true
        end
    end
    return userGroups
end

function vRP.getUserGroupByType(user_id,gtype)
	if not user_id then return end
	if not permissions[user_id] then permissions[user_id] = {} end
    for k,v in pairs(permissions[user_id]) do
        local kgroup = groups[v.permiss]
        if kgroup then
            if kgroup._config and kgroup._config.gtype and kgroup._config.gtype == gtype then
                return v.permiss
            end
        end
    end
    return nil
end

function ConvertGroupPerm(perms)
    for k,perm in pairs(perms) do
        if CONVERT_GROUPS[perm] then
            return CONVERT_GROUPS[perm]["job"]
        end
    end
end

function vRP.getJobFromGroup(group)
	if group and groups[group] then
		if groups[group]._config and groups[group]._config.grade then
			local Job = ConvertGroupPerm(groups[group])
			if Job then
				return {
					[Job] = groups[group]._config.grade
				}
			end
		end
	end
	return { [group] = "0" }
end

function vRP.getGroup(group)
	if group and groups[group] then
		return groups[group]
	end
end

function vRP.getSalaryByGroup(group)
	local g = groups[group]
	if g and g._config and g._config.salary then
		return g._config.salary
	end
	return nil
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUMPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
local JobsPermissions = {
	['policia.permissao'] = "Police",
	['paramedico.permissao'] = "Paramedic",
	['mecanico.permissao'] = "Mechanic",
	['admin.permissao'] = "Admin",
}

function vRP.insertPermission(user_id,perm)
	local user = parseInt(user_id)
	local nplayer = vRP.getUserSource(user)
	if not permissions[user] then permissions[user] = {} end
	table.insert(permissions[user], { permiss = perm } )
	if not nplayer then return end
	Player(nplayer)["state"][perm] = true
	local group = groups[perm]
	if group then
		for l,w in ipairs(group) do
			if type(w) == "string" and JobsPermissions[w] then
				if vRP.hasPermission(user, w) then
					Player(nplayer)["state"][JobsPermissions[w]] = true
				end
				if JobsPermissions[w] == "Admin" then
					lib.addPrincipal(nplayer, "group.admin")
					lib.addPrincipal(vRP.getSteam(nplayer), "group.admin")
				end
			end
		end
		if group and group._config then
			if group._config.gtype and group._config.gtype == "vip" then
				Player(nplayer)["state"]["Premium"] = true
			end
		end
	end
	if groups[perm] and groups[perm]._config then
		if groups[perm]._config.gtype and groups[perm]._config.gtype == "vip" then
			Player(nplayer)["state"]["Premium"] = true
		end
	end
	if vRP.hasPermission(user, "policia.permissao") then
		TriggerEvent("vrp_blipsystem:serviceEnter",nplayer,"Policial",77)
	elseif vRP.hasPermission(user, "paramedico.permissao") then
		TriggerEvent("vrp_blipsystem:serviceEnter",nplayer,"Paramedico",83)
	elseif vRP.hasPermission(user, "mecanico.permissao") then
		TriggerEvent("vrp_blipsystem:serviceEnter",nplayer,"Mecanico",51)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUMPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.removePermission(user_id,perm)
	local user = parseInt(user_id)
	local nplayer = vRP.getUserSource(user)
	if nplayer then
		TriggerEvent("vrp_blipsystem:serviceExit",nplayer)
		Player(nplayer)["state"][perm] = false
		local group = groups[perm]
		if group then
			for l,w in ipairs(group) do
				if type(w) == "string" and JobsPermissions[w] then
					if vRP.hasPermission(user, w) then
						Player(nplayer)["state"][JobsPermissions[w]] = false
					end
					if JobsPermissions[w] == "Admin" then
						lib.removePrincipal(nplayer, "group.admin")
						lib.removePrincipal(vRP.getSteam(nplayer), "group.admin")
					end
				end
			end
			if group and group._config then
				if group._config.gtype and group._config.gtype == "vip" then
					Player(nplayer)["state"]["Premium"] = false
				end
			end
		end
	end
	if permissions[user] then
		for k,v in pairs(permissions[user]) do
			if perm == v.permiss then
				table.remove(permissions[user], k)
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HASPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.hasPermission(user,perm)
	local user_id = parseInt(user)
	if permissions[user_id] then
		for k,v in pairs(permissions[user_id]) do
			if v.permiss == perm then
				return true
			else
				local group = groups[v.permiss]
				if group then
					for l,w in ipairs(group) do
						if w == perm then
							return true
						end
					end
				end
			end
		end
	end
	local nplayer = vRP.getUserSource(user_id)
	if nplayer then
		local Player = QBCore.Functions.GetPlayer(nplayer)
		if Player and Player.PlayerData.job.name == perm then
			return true
		end
		local xPlayer = ESX.GetPlayerFromId(nplayer)
		if xPlayer and (xPlayer.job.name == perm or xPlayer.group == perm) then
			return true
		end
	end
	return false
end

function vRP.hasAnyPermission(user_id, perms)
	if type(perms) ~= "table" then return false end
	for k,v in pairs(perms) do
		if vRP.hasPermission(user_id,v) then
			return true
		end
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- USERS BY PERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
local aliasPerm = {
	['Police'] = "policia.permissao",
	['Mechanic'] = "mecanico.permissao",
	['Admin'] = "suporte.permissao",
	['Paramedic'] = "paramedico.permissao"
}

function vRP.numPermission(perm, offline)
	local users = {}
	if perm and aliasPerm[perm] then
        for k,v in pairs(vRP.rusers) do
            if vRP.hasPermission(tonumber(k), aliasPerm[perm]) then
                table.insert(users,tonumber(k))
            end
        end
	else
		local consult = vRP.query("vRP/get_specific_perm",{ permiss = tostring(perm) })
		for k,v in pairs(consult) do
			if offline then
				table.insert(users,v.user_id)
			else
				local userSource = vRP.getUserSource(v.user_id)
				if userSource then
					table.insert(users,v.user_id)
				end
			end
		end
    end
	return users
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERLEAVE
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("vRP:playerLeave",function(user_id,source)
	if permissions[user_id] then
		permissions[user_id] = nil
	end
end)
