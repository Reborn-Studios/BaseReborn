local Permissions = {}
local Groups = module('vrp',"config/Groups") or {}
RegisterServerEvent("Reborn:reloadInfos",function() Groups = module('vrp',"config/Groups") end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GROUPS FUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.Groups()
	return Groups
end

function vRP.getGroupTitle(group,hierarchy)
	local Group = Groups[group]
	if Group and hierarchy and Group["Hierarchy"] and Group["Hierarchy"][hierarchy] then
		return Group["Hierarchy"][hierarchy]["Title"] or Group["Hierarchy"][hierarchy]["Group"]
	end
	return group
end

function vRP.getUserGroups(user_id)
	if Permissions[user_id] then
		return Permissions[user_id]
	end
	local userGroups = {}
    local data = vRP.query("vRP/get_perm", { user_id = user_id })
    if data then
        for k,v in pairs(data) do
            userGroups[v.permiss] = v.hierarchy
        end
    end
    return userGroups
end

function vRP.getUserGroupByType(user_id,gtype)
	if not user_id then return end
	local userGroups = vRP.getUserGroups(user_id)
	for group,level in pairs(userGroups) do
		if Groups[group] and Groups[group].Type == gtype then
			return group,level
		end
	end
    return nil
end

function vRP.getGroupFromJob(job,grade)
	for group,v in pairs(Groups) do
		if v.QBESXGroup == job then
			if not grade then return group end
			for level,data in pairs(v.Hierarchy) do
				if level == tonumber(grade) then
					return group
				end
			end
		end
	end
end

exportHandler("qb-core","GetGroupFromJob",vRP.getGroupFromJob)

function vRP.getGroup(group)
	if group and Groups[group] then
		return Groups[group]
	end
end

function vRP.getSalaryByGroup(group,hierarchy)
	local Group = Groups[group]
	if Group and Group["Hierarchy"] and Group["Hierarchy"][hierarchy] then
		return Group["Hierarchy"][hierarchy].Salary
	end
	return nil
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUMPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
local ClientPerms = {
	['police'] = "Police",
	['ambulance'] = "Paramedic",
	['mechanic'] = "Mechanic",
	['admin'] = "Admin",
}

function vRP.insertPermission(user_id,group,hierarchy)
	local user = parseInt(user_id)
	local nplayer = vRP.getUserSource(user)
	local Group = Groups[group]
	if Group and Group["Hierarchy"] then
		if not hierarchy then hierarchy = #Group["Hierarchy"] end
		if not Permissions[user] then Permissions[user] = {} end
		local perm = Group["Hierarchy"][hierarchy].Group
		Permissions[user][group] = hierarchy

		if not nplayer then return end
		Player(nplayer)["state"][perm] = hierarchy

		if Group["QBESXGroup"] then
			if ClientPerms[Group["QBESXGroup"]] then
				Player(nplayer)["state"][ClientPerms[Group["QBESXGroup"]]] = hierarchy
			end
			Player(nplayer)["state"][Group["QBESXGroup"]] = hierarchy
			if Group["QBESXGroup"] == "admin" then
				lib.addPrincipal(nplayer, "group.admin")
				lib.addPrincipal(vRP.getSteam(nplayer), "group.admin")
			end
		end

		if Group.Type == "vip" then
			Player(nplayer)["state"]["Premium"] = hierarchy
		end
		if Group["Markers"] then
			TriggerEvent("vrp_blipsystem:serviceEnter",nplayer,group)
		end

		vRP.ServiceEnter(nplayer,user,group,true)
		if Group["Hierarchy"][hierarchy]["BackpackWeight"] then
			if GetResourceState("ox_inventory") == "started" then
				local inventory = exports.ox_inventory:GetInventory(nplayer)
				local backpack = inventory.maxWeight / 1000
				if backpack then
					backpack = backpack + Group["Hierarchy"][hierarchy]["BackpackWeight"]
					exports.ox_inventory:SetMaxWeight(nplayer, backpack * 1000)
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUMPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.removePermission(user_id,group)
	local user = parseInt(user_id)
	local nplayer = vRP.getUserSource(user)
	if nplayer then
		local Group = Groups[group]
		if Group then
			local hierarchy = Permissions[user][group]
			local perm = Group["Hierarchy"][hierarchy].Group
			Player(nplayer)["state"][perm] = nil
			if Group["QBESXGroup"] then
				Player(nplayer)["state"][Group["QBESXGroup"]] = nil
				if Group["QBESXGroup"] == "admin" then
					lib.removePrincipal(nplayer, "group.admin")
					lib.removePrincipal(vRP.getSteam(nplayer), "group.admin")
				end
			end
			if Group.Type == "vip" then
				Player(nplayer)["state"]["Premium"] = nil
			end
			if Group["Markers"] then
				TriggerEvent("vrp_blipsystem:serviceExit",nplayer)
			end
			vRP.ServiceLeave(nplayer,user,group,true)
			if Group["Hierarchy"][hierarchy]["BackpackWeight"] then
				if GetResourceState("ox_inventory") == "started" then
					local inventory = exports.ox_inventory:GetInventory(nplayer)
					local backpack = inventory.maxWeight / 1000
					if backpack then
						backpack = backpack - Group["Hierarchy"][hierarchy]["BackpackWeight"]
						exports.ox_inventory:SetMaxWeight(nplayer, backpack * 1000)
					end
				end
			end
		end
	end
	if Permissions[user] and Permissions[user][group] then
		Permissions[user][group] = nil
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HASPERMISSION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.hasPermission(user,perm,level)
	local user_id = parseInt(user)
	local PermissionParts = splitString(perm, "-")
    if PermissionParts[2] then
        perm, level = PermissionParts[1], parseInt(PermissionParts[2])
    end
	if Permissions[user_id] then
		if Groups[perm] then
			if Permissions[user_id][perm] then
				if not level or Permissions[user_id][perm] <= level then
					return Permissions[user_id][perm], Groups[perm]["Hierarchy"][Permissions[user_id][perm]]["Title"]
				end
			end
			return false
		end
		for Group,hierarchy in pairs(Permissions[user_id]) do
			if Groups[Group] then
				if Groups[Group]["Permissions"] then
					if Contains(Groups[Group]["Permissions"], perm) then
						return hierarchy, Groups[Group]["Hierarchy"][hierarchy]["Title"]
					end
				end
				if Groups[Group]["Hierarchy"] then
					for i = hierarchy, #Groups[Group]["Hierarchy"], 1 do
						if Groups[Group]["Hierarchy"][i]["Permission"] then
							if Contains(Groups[Group]["Hierarchy"][i]["Permission"], perm) then
								return hierarchy, Groups[Group]["Hierarchy"][i]["Title"]
							end
						end
					end
				end
			end
		end
	end
	local nplayer = vRP.getUserSource(user_id)
	if nplayer then
		if Player(nplayer)["state"][perm] then
			if not level or Player(nplayer)["state"][perm] <= level then
				return Player(nplayer)["state"][perm]
			end
		end
		local Player = QBCore.Functions.GetPlayer(nplayer)
		if Player and Player.PlayerData.job.name == perm then
			return true
		end
		local xPlayer = ESX.GetPlayerFromId(nplayer)
		if xPlayer and (xPlayer.job.name == perm or xPlayer.group == perm) then
			return true
		end
	else
		local consult = vRP.query(level and "vRP/get_group_hierarchy" or "vRP/get_group",{ hierarchy = level, permiss = perm, user_id = user_id })[1]
		if consult then
			return tonumber(consult.hierarchy)
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
function vRP.numPermission(perm, offline)
	local users = {}
	if offline then
		local consult = vRP.query("vRP/get_specific_perm",{ permiss = tostring(perm) })
		for k,v in pairs(consult) do
			table.insert(users,v.user_id)
		end
	else
		for k,v in pairs(vRP.rusers) do
			if vRP.hasPermission(tonumber(k), perm) then
				table.insert(users,tonumber(k))
			end
		end
	end
	return users
end
