-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA SETAGEM
-----------------------------------------------------------------------------------------------------------------------------------------
local roleWeight = {}
for index, role in ipairs(TriadeAdmin.Roles) do
	roleWeight[role.id] = #TriadeAdmin.Roles - index + 1
end

local function roleGrantedBy(groupName, level)
	local ok, groups = pcall(function() return vRP.Groups() end)
	if not ok or type(groups) ~= "table" then return nil end

	local data = groups[groupName]
	if not data then return nil end

	level = TA.int(level)
	if level <= 0 then level = 1 end

	local permissions = {}
	for _, perm in ipairs(data.Permissions or {}) do permissions[#permissions + 1] = perm end

	local hierarchy = data.Hierarchy and data.Hierarchy[level]
	if hierarchy then
		for _, perm in ipairs(hierarchy.Permission or {}) do permissions[#permissions + 1] = perm end
		if hierarchy.Group then permissions[#permissions + 1] = hierarchy.Group end
	end
	permissions[#permissions + 1] = groupName

	local function matches(rolePerm)
		rolePerm = tostring(rolePerm)

		local group, maxLevel = rolePerm:match("^(.-)%-(%d+)$")
		if group then
			return string.lower(group) == string.lower(groupName) and level <= tonumber(maxLevel)
		end

		for _, perm in ipairs(permissions) do
			if string.lower(tostring(perm)) == string.lower(rolePerm) then return true end
		end
		return false
	end

	local best = nil
	for _, role in ipairs(TriadeAdmin.Roles) do
		for _, rolePerm in ipairs(role.perms) do
			if matches(rolePerm) and (not best or roleWeight[role.id] > roleWeight[best]) then
				best = role.id
			end
		end
	end

	return best
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("groups", "tab.setagem", function(source, payload)
	local passport = TA.int(payload.passport)

	local available = {}
	local ok, groups = pcall(function() return vRP.Groups() end)
	if ok and type(groups) == "table" then
		for name, data in pairs(groups) do
			local organization = name
			local groupType = (type(data) == "table" and data.Type) or "geral"

			if type(data) == "table" and type(data.Hierarchy) == "table" and next(data.Hierarchy) then
				for level, entry in pairs(data.Hierarchy) do
					available[#available + 1] = {
						["group"] = name,
						["level"] = TA.int(level),
						["label"] = tostring(entry.Group or name),
						["title"] = tostring(entry.Title or entry.Group or name),
						["organization"] = organization,
						["type"] = groupType,
						["leader"] = entry.Leader == true,
						["salary"] = TA.int(entry.Salary)
					}
				end
			else
				available[#available + 1] = {
					["group"] = name,
					["level"] = 1,
					["label"] = name,
					["title"] = organization,
					["organization"] = organization,
					["type"] = groupType,
					["leader"] = false,
					["salary"] = 0
				}
			end
		end
	end

	table.sort(available, function(a, b)
		if string.lower(a.organization) == string.lower(b.organization) then
			return a.level < b.level
		end
		return string.lower(a.organization) < string.lower(b.organization)
	end)

	local current = {}
	local identity = nil

	if passport > 0 then
		identity = TA.identity(passport)
		if identity then
			for _, entry in ipairs(TA.groupsOf(passport)) do
				local groupData = ok and groups[entry.group] or nil
				if groupData then
					current[#current + 1] = {
						["group"] = entry.group,
						["level"] = entry.level,
						["title"] = entry.title,
						["organization"] = (groupData and groupData.Name) or entry.group,
						["type"] = (groupData and groupData.Type) or "geral"
					}
				end
			end
		end
	end

	return {
		["available"] = available,
		["current"] = current,
		["player"] = identity and {
			["passport"] = passport,
			["name"] = TA.str(identity.name) .. " " .. TA.str(identity.name2),
			["online"] = vRP.getUserSource(passport) ~= nil
		} or nil
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("group.add", "group.add", function(source, payload)
	local passport = TA.int(payload.passport)
	local group = TA.str(payload.group, 64)
	local level = TA.int(payload.level)
	if level <= 0 then level = 1 end

	if passport <= 0 or group == "" then return { ok = false, message = "Informe o passaporte e o cargo." } end
	if not TA.identity(passport) then return { ok = false, message = "Passaporte nao encontrado." } end
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	local sourceRole = TA.role(source)
	local granted = roleGrantedBy(group, level)
	if granted and (roleWeight[granted] or 0) >= (roleWeight[sourceRole] or 0) and sourceRole ~= "dono" then
		return { ok = false, message = "Voce nao pode conceder um cargo igual ou superior ao seu." }
	end

	pcall(function() vRP.addUserGroup(passport, group, level) end)

	local target = vRP.getUserSource(passport)
	if target then
		TA.notify(target, "sucesso", "Voce foi adicionado(a) ao grupo <b>" .. group .. "</b>.", 5000)
	end

	TA.log(source, "setar", "Passaporte " .. passport .. " => " .. group .. " nivel " .. level)
	return { ok = true, message = "Cargo adicionado com sucesso." }
end)

TA.action("group.remove", "group.remove", function(source, payload)
	local passport = TA.int(payload.passport)
	local group = TA.str(payload.group, 64)

	if passport <= 0 or group == "" then return { ok = false, message = "Informe o passaporte e o cargo." } end
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	local sourceRole = TA.role(source)
	local granted = roleGrantedBy(group, TA.int(payload.level))
	if granted and (roleWeight[granted] or 0) >= (roleWeight[sourceRole] or 0) and sourceRole ~= "dono" then
		return { ok = false, message = "Voce nao pode remover um cargo igual ou superior ao seu." }
	end

	pcall(function() vRP.removeUserGroup(passport, group) end)

	local target = vRP.getUserSource(passport)
	if target then
		TA.notify(target, "negado", "Voce foi removido(a) do grupo <b>" .. group .. "</b>.", 5000)
	end

	TA.log(source, "desetar", "Passaporte " .. passport .. " => " .. group)
	return { ok = true, message = "Cargo removido com sucesso." }
end)
