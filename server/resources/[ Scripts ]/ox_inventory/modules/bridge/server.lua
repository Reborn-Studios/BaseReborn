---@todo separate module into smaller submodules to handle each framework
---starting to get bulky

function server.hasGroup(inv, group)
	if type(group) == 'table' then
		for name, requiredRank in pairs(group) do
			local groupRank = inv.player.groups[name]
			if groupRank then
				if type(requiredRank) == 'table' then
					if lib.table.contains(requiredRank, groupRank) then
						return name, groupRank
					end
				else
					if groupRank <= requiredRank then
						return name, groupRank
					end
				end
			elseif Player(inv.player.source).state[name] then
				if requiredRank then
					if Player(inv.player.source).state[name] <= requiredRank then
						return name, Player(inv.player.source).state[name]
					end
				else
					return name, "0"
				end
			end
		end
	else
		local groupRank = inv.player.groups[group]
		if groupRank then
			return group, groupRank
		elseif Player(inv.player.source).state[group] then
			return group, "0"
		end
	end
end

---@diagnostic disable-next-line: duplicate-set-field
function server.setPlayerData(player)
	if not player.groups then
		warn(("server.setPlayerData did not receive any groups for '%s'"):format(player?.name or GetPlayerName(player)))
	end

	return {
		source = player.source,
		name = player.name,
		groups = player.groups or {},
		sex = player.sex,
		dateofbirth = player.dateofbirth,
	}
end

---@diagnostic disable-next-line: duplicate-set-field
function server.buyLicense()
	warn('Licenses are not supported for the current framework.')
end

local Inventory = require 'modules.inventory.server'

function server.playerDropped(source)
	local inv = Inventory(source) --[[@as OxInventory]]

	if inv?.player then
		inv:closeInventory()
		Inventory.Remove(inv)
	end
end

local success, result = pcall(lib.load, ('modules.bridge.%s.server'):format(shared.framework))

if not success then
    lib = nil
    error(result, 0)
end

if server.convertInventory then exports('ConvertItems', server.convertInventory) end
