-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - AUTO-TESTE
-----------------------------------------------------------------------------------------------------------------------------------------

-- Consultas de leitura e o payload minimo que cada uma precisa.
local CASES = {
	{ ["key"] = "server",			["payload"] = {} },
	{ ["key"] = "players",			["payload"] = {} },
	{ ["key"] = "map",				["payload"] = {} },
	{ ["key"] = "items",			["payload"] = {} },
	{ ["key"] = "vehicles",			["payload"] = {} },
	{ ["key"] = "locations",		["payload"] = {} },
	{ ["key"] = "weather",			["payload"] = {} },
	{ ["key"] = "permissions",		["payload"] = {} },
	{ ["key"] = "banhistory",		["payload"] = { ["search"] = "" } },
	{ ["key"] = "warns",			["payload"] = { ["search"] = "" } },
	{ ["key"] = "tickets",			["payload"] = {} },
	{ ["key"] = "ticketHistory",	["payload"] = { ["search"] = "" } },
	{ ["key"] = "ticketRanking",	["payload"] = {} },
	{ ["key"] = "ticketRatings",	["payload"] = {} },
	{ ["key"] = "ticketNotes",		["payload"] = {} },
	{ ["key"] = "groups",			["payload"] = { ["passport"] = 0 } },
	{ ["key"] = "garage",			["payload"] = { ["passport"] = 0 } },
	{ ["key"] = "identity",			["payload"] = { ["passport"] = 0 } },
	{ ["key"] = "player",			["payload"] = { ["passport"] = 0 } },
	{ ["key"] = "inventory",		["payload"] = { ["passport"] = 0 } },
	{ ["key"] = "resources",		["payload"] = {} },
	{ ["key"] = "metrics",			["payload"] = {} },
	{ ["key"] = "characters",		["payload"] = { ["search"] = "", ["page"] = 1, ["size"] = 5 } },
	{ ["key"] = "logs",				["payload"] = { ["search"] = "", ["page"] = 1, ["size"] = 5 } },
	{ ["key"] = "chat",				["payload"] = {} },
	{ ["key"] = "capture",			["payload"] = {} }
}

local function describe(value)
	if value == nil then return "nil" end
	if type(value) ~= "table" then return tostring(value) end

	local parts = {}
	for key, inner in pairs(value) do
		if type(inner) == "table" then
			parts[#parts + 1] = tostring(key) .. "=" .. #inner
		else
			parts[#parts + 1] = tostring(key) .. "=" .. tostring(inner)
		end
	end

	table.sort(parts)
	local text = table.concat(parts, " ")
	if #text > 90 then text = text:sub(1, 87) .. "..." end
	return text
end

function TA.selftest()
	local lines = {}
	local function add(text) lines[#lines + 1] = text end

	local passed, failed, skipped = 0, 0, 0

	add("^5=====================================================================^7")
	add("^5 TRIADE ADMIN - AUTO-TESTE DAS CONSULTAS^7")
	add("^5=====================================================================^7")

	for _, case in ipairs(CASES) do
		local entry = TA.Fetchers[case.key]

		if not entry then
			failed = failed + 1
			add("^1 FALHA  ^7" .. string.format("%-16s", case.key) .. "^1consulta nao registada^7")
		else
			local started = os.clock()
			local ok, result = pcall(entry.handler, 0, case.payload)
			local elapsed = math.floor((os.clock() - started) * 1000)

			if not ok then
				failed = failed + 1
				add("^1 FALHA  ^7" .. string.format("%-16s", case.key) .. "^1" .. tostring(result) .. "^7")
			elseif result == nil then
				skipped = skipped + 1
				add("^3 VAZIO  ^7" .. string.format("%-16s", case.key) .. "^3devolveu nil (normal sem jogador/passaporte)^7")
			else
				passed = passed + 1
				add("^2 OK     ^7" .. string.format("%-16s", case.key) .. string.format("%4dms  ", elapsed) .. "^7" .. describe(result))
			end
		end
	end

	-- Verifica que toda a acao registada tem handler e permissao valida
	local badActions = 0
	for key, entry in pairs(TA.Actions) do
		if type(entry.handler) ~= "function" then
			badActions = badActions + 1
			add("^1 FALHA  ^7acao '" .. key .. "' sem handler^7")
		elseif entry.permission and not TriadeAdmin.Permissions[entry.permission] then
			badActions = badActions + 1
			add("^1 FALHA  ^7acao '" .. key .. "' usa permissao inexistente '" .. entry.permission .. "'^7")
		end
	end

	add("")
	add("^5 RESUMO^7")
	add("   ^2" .. passed .. " ok^7   ^3" .. skipped .. " vazias^7   ^1" .. (failed + badActions) .. " falhas^7")

	if failed + badActions == 0 then
		add("^2 Todas as consultas responderam. O lado do servidor esta funcional.^7")
	else
		add("^1 Ha falhas acima: corrige antes de usar o painel nesta base.^7")
	end
	add("^5=====================================================================^7")

	return lines
end

RegisterCommand("triadeadmin_selftest", function(source)
	if source ~= 0 then return end
	CreateThread(function()
		for _, line in ipairs(TA.selftest()) do print(line) end
	end)
end, true)
