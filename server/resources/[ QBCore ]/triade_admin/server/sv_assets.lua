-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - SERVIDOR HTTP DE IMAGENS
-----------------------------------------------------------------------------------------------------------------------------------------
local searchPaths = nil

local function folders()
	if searchPaths then return searchPaths end

	searchPaths = {}
	for _, entry in ipairs(TriadeAdmin.Images.Folders or {}) do
		local resolved = TA.resolveFolder(entry)
		if resolved then searchPaths[#searchPaths + 1] = resolved end
	end

	return searchPaths
end

local MIME = {
	[".png"] = "image/png",
	[".jpg"] = "image/jpeg",
	[".jpeg"] = "image/jpeg",
	[".webp"] = "image/webp",
	[".svg"] = "image/svg+xml"
}

-- PNG 1x1 transparente devolvido quando nada e encontrado.
local EMPTY_PNG = string.char(
	137, 80, 78, 71, 13, 10, 26, 10,
	0, 0, 0, 13, 73, 72, 68, 82,
	0, 0, 0, 1, 0, 0, 0, 1,
	8, 6, 0, 0, 0, 31, 21, 196, 137,
	0, 0, 0, 10, 73, 68, 65, 84,
	120, 156, 99, 0, 1, 0, 0, 5, 0, 1,
	13, 10, 45, 180,
	0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
)

local cache = {}

local function readFile(path)
	local file = io.open(path, "rb")
	if not file then return nil end
	local data = file:read("*a")
	file:close()
	return data
end

local function extensionOf(path)
	local index = path:find("%.[^%.]+$")
	if not index then return "" end
	return path:sub(index):lower()
end

local function candidatesFor(name)
	local base, ext = name:match("^(.*)(%.[^%.]+)$")
	if not base then
		base, ext = name, ".png"
	end

	local list = {}
	local seen = {}
	local function push(value)
		if value ~= "" and not seen[value] then
			seen[value] = true
			list[#list + 1] = value
		end
	end

	push(base .. ext)
	push(string.lower(base) .. ext)
	push(string.upper(base) .. ext)
	push(base .. ".png")
	push(string.lower(base) .. ".png")
	push(string.upper(base) .. ".png")
	push(base .. ".jpg")
	push(string.lower(base) .. ".jpg")
	push(base .. ".webp")
	return list
end

local function locate(name)
	if cache[name] ~= nil then return cache[name] end

	for _, candidate in ipairs(candidatesFor(name)) do
		for _, folder in ipairs(folders()) do
			local full = folder .. "/" .. candidate
			local data = readFile(full)
			if data then
				cache[name] = { ["data"] = data, ["mime"] = MIME[extensionOf(candidate)] or "image/png" }
				return cache[name]
			end
		end
	end

	cache[name] = false
	return false
end

SetHttpHandler(function(request, response)
	local path = request.path or "/"
	local query = path:find("?")
	if query then path = path:sub(1, query - 1) end

	if path == "/" or path == "/health" then
		response.writeHead(200, { ["Content-Type"] = "application/json", ["Cache-Control"] = "no-store" })
		response.send(json.encode({ status = "ok", resource = GetCurrentResourceName(), root = TA.serverRoot(), folders = folders() }))
		return
	end

	if path:sub(1, 5) ~= "/img/" then
		response.writeHead(404, { ["Content-Type"] = "text/plain" })
		response.send("Not Found")
		return
	end

	local name = path:sub(6)
	if name == "" or name:find("%.%.") or name:find("/") or name:find("\\") then
		response.writeHead(403, { ["Content-Type"] = "text/plain" })
		response.send("Forbidden")
		return
	end

	local found = locate(name)
	if found then
		response.writeHead(200, {
			["Content-Type"] = found.mime,
			["Cache-Control"] = "public, max-age=604800",
			["Access-Control-Allow-Origin"] = "*"
		})
		response.send(found.data)
		return
	end

	response.writeHead(404, {
		["Content-Type"] = "image/png",
		["Cache-Control"] = "public, max-age=3600",
		["Access-Control-Allow-Origin"] = "*",
		["X-Triade-Fallback"] = "empty"
	})
	response.send(EMPTY_PNG)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- LIMPAR CACHE (comando de console)
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("triadeadmin_cache", function(source)
	if source ~= 0 then return end
	cache = {}
	print("^2[triade_admin]^7 cache de imagens limpo.")
end, true)

CreateThread(function()
	Wait(3000)
	print("^2[triade_admin]^7 servidor de imagens ativo em ^2" .. #folders() .. "^7 pasta(s). Raiz: ^2" .. TA.serverRoot() .. "^7")
end)
