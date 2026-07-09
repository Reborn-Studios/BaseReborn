RegisterNetEvent('0resmon-animmenu:sendAnimRequest:server', function(data)
    TriggerClientEvent('0resmon-animmenu:receiveAnimRequest:client', data.id, data)
end)

RegisterNetEvent('0resmon-animmenu:playAnimTogetherSender:server', function(data)
    local id = data.data.target
    if data.target then
        id = data.target
    end
    TriggerClientEvent('0resmon-animmenu:playAnimTogetherSender:client', id, data)
end)

RegisterNetEvent('0resmon-animmenu:playAnimTogetherSender2:server', function(data)
    local id = data.data.target
    if data.target then
        id = data.target
    end
    TriggerClientEvent('0resmon-animmenu:playAnimTogetherSender2:client', id, data)
end)

RegisterNetEvent('0resmon-animmenu:requstCanelledNotif:server', function(target)
    TriggerClientEvent('0resmon-animmenu:requstCanelledNotif:client', target)
end)

RegisterNetEvent('0resmon-animmenu:cancelEmote:server', function(target)
    TriggerClientEvent('0resmon-animmenu:cancelEmote:client', target)
end)

RegisterNetEvent('0resmon-animmenu:animDictLoaded:server', function(target)
    TriggerClientEvent('0resmon-animmenu:animDictLoaded:client', target)
end)

RegisterNetEvent('0resmon-animmenu:ptfxSync:server', function(asset, name, offset, rot, bone, scale, color)
    if type(asset) ~= "string" or type(name) ~= "string" or type(offset) ~= "vector3" or type(rot) ~= "vector3" then
        return
    end
    local srcPlayerState = Player(source).state
    srcPlayerState:set('ptfxAsset', asset, true)
    srcPlayerState:set('ptfxName', name, true)
    srcPlayerState:set('ptfxOffset', offset, true)
    srcPlayerState:set('ptfxRot', rot, true)
    srcPlayerState:set('ptfxBone', bone, true)
    srcPlayerState:set('ptfxScale', scale, true)
    srcPlayerState:set('ptfxColor', color, true)
    srcPlayerState:set('ptfxPropNet', false, true)
    srcPlayerState:set('ptfx', false, true)
end)

RegisterNetEvent("0resmon-animmenu:ptfxSyncProp:server", function(propNet)
    local srcPlayerState = Player(source).state
    if propNet then
        local waitForEntityToExistCount = 0
        while waitForEntityToExistCount <= 100 and not DoesEntityExist(NetworkGetEntityFromNetworkId(propNet)) do
            Wait(10)
            waitForEntityToExistCount = waitForEntityToExistCount + 1
        end
        if waitForEntityToExistCount < 100 then
            srcPlayerState:set('ptfxPropNet', propNet, true)
            return
        end
    end
    srcPlayerState:set('ptfxPropNet', false, true)
end)

RegisterNetEvent('0r-animmenu:attachPeds:server', function(targetId, myId, data)
    TriggerClientEvent('0r-animmenu:attachPeds:client', targetId, myId, data)
end)

Citizen.CreateThread(function()
    -- Find resources that contains "smallresources"
    -- handsup.lua
    local resourceList = {}
    for i = 0, GetNumResources(), 1 do
        local resource_name = GetResourceByFindIndex(i)
        if resource_name and GetResourceState(resource_name) == "started" then
            table.insert(resourceList, resource_name)
        end
    end
    local findedResources = {}
    for k, v in pairs(resourceList) do
        if string.match(v, "smallresources") then
            table.insert(findedResources, v)
        end
    end
    for k, v in pairs(findedResources) do
        local loadedFile = LoadResourceFile(v, "client/handsup.lua")
        if loadedFile ~= nil then
            local resPath = GetResourcePath(v)
            print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " ^1" .. v .. "/client/handsup.lua ^0file deleted by script.")
            os.remove(resPath .. "/client/handsup.lua")
            Citizen.Wait(500)
            StopResource(v)
            Citizen.Wait(500)
            StartResource(v)
        end
    end
    -- crouchprone.lua
    for k, v in pairs(findedResources) do
        local loadedFile = LoadResourceFile(v, "client/crouchprone.lua")
        if loadedFile ~= nil then
            local resPath = GetResourcePath(v)
            print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " ^1" .. v .. "/client/crouchprone.lua ^0file deleted by script.")
            os.remove(resPath .. "/client/crouchprone.lua")
            Citizen.Wait(500)
            StopResource(v)
            Citizen.Wait(500)
            StartResource(v)
        end
    end
end)

-- Citizen.CreateThread(function()
--     Citizen.Wait(500)
--     local path = GetResourcePath(GetCurrentResourceName())
--     local tempfile = io.open(path:gsub('//', '/')..'/'.."test.lua", 'a+')
--     if tempfile then
--         tempfile:close()
--         path = path:gsub('//', '/')..'/'.."test.lua"
--     end
--     local file = io.open(path, 'w') -- 'w' kullanarak eski içeriği temizliyoruz
--     file:write("RES.General = {\n")

--     for _, v in pairs(general) do
--         file:write('    ["' .. _ .. '"] = {\n')
--         for i = 1, 3 do
--             file:write(("        '%s',\n"):format(v[i]))
--         end
--         file:write(("        imageId = '%s',\n"):format(_))

--         -- AnimationOptions'u direkt olarak yazdır
--         if v.AnimationOptions then
--             file:write("        AnimationOptions = " .. serializeTable(v.AnimationOptions, 2) .. ",\n")
--         end

--         file:write("    },\n")
--     end

--     file:write("}\n")
--     file:close()
-- end)

-- Citizen.CreateThread(function()
--     Citizen.Wait(500)
    
--     local path = GetResourcePath(GetCurrentResourceName())
--     local tempfile = io.open(path:gsub('//', '/')..'/'.."test.lua", 'a+')
--     if tempfile then
--         tempfile:close()
--         path = path:gsub('//', '/')..'/'.."test.lua"
--     end

--     local file = io.open(path, 'w')
--     file:write("RES.General = {\n")

--     -- 1) Tüm keyleri çekip sıralıyoruz
--     local keys = {}
--     for k in pairs(RES.General) do
--         table.insert(keys, k)
--     end
--     table.sort(keys) -- <-- Burada alfabetik sıralanır

--     -- 2) Sıralı keylerle yaz
--     for _, key in ipairs(keys) do
--         local v = RES.General[key]

--         file:write(('    ["%s"] = {\n'):format(string.lower(key)))

--         -- İlk 3 string (senin örnek formatın)
--         for i = 1, 3 do
--             if v[i] then
--                 file:write(('        "%s",\n'):format(v[i]))
--             end
--         end

--         -- imageId en sona
--         file:write(("        imageId = '%s',\n"):format(string.lower(key)))

--         -- AnimationOptions varsa yaz
--         if v.AnimationOptions then
--             file:write("        AnimationOptions = " .. serializeTable(v.AnimationOptions, 2) .. ",\n")
--         end

--         file:write("    },\n")
--     end

--     file:write("}\n")
--     file:close()
-- end)

-- function serializeTable(tbl, indent)
--     indent = indent or 0
--     local formatting = string.rep("    ", indent)
--     local result = "{\n"

--     for k, v in pairs(tbl) do
--         local key = type(k) == "number" and "" or tostring(k) .. " = "

--         if type(v) == "table" then
--             result = result .. formatting .. "    " .. key .. serializeTable(v, indent + 1) .. ",\n"
--         elseif type(v) == "string" then
--             result = result .. formatting .. "    " .. key .. string.format("'%s'", v) .. ",\n"
--         else
--             result = result .. formatting .. "    " .. key .. tostring(v) .. ",\n"
--         end
--     end

--     return result .. formatting .. "}"
-- end

function serializeTable(tbl, indent)
    indent = indent or 0
    local formatting = string.rep("    ", indent)
    local result = "{\n"

    for k, v in pairs(tbl) do
        local key = type(k) == "number" and "" or tostring(k) .. " = "

        -- 1) RAW yazar: runtime value'yu değil, Lua kodunu olduğu gibi
        if k == "onFootFlag" and type(v) ~= "table" then
            result = result .. formatting .. "    " .. key .. "Config.AnimFlag.MOVING,\n"

        -- 2) Normal tabloysa
        elseif type(v) == "table" then
            result = result .. formatting .. "    " .. key .. serializeTable(v, indent + 1) .. ",\n"

        -- 3) String ise
        elseif type(v) == "string" then
            result = result .. formatting .. "    " .. key .. string.format("'%s'", v) .. ",\n"

        -- 4) Diğer her şey
        else
            result = result .. formatting .. "    " .. key .. tostring(v) .. ",\n"
        end
    end

    return result .. formatting .. "}"
end


RegisterNetEvent('0resmon-animmenu:setPedAlpha:server', function(id, alpha)
    TriggerClientEvent("0resmon-animmenu:setPedAlpha:server", -1, id, alpha)
end)









-- local resourcePath = GetResourcePath(GetCurrentResourceName())
-- local outputPath = resourcePath .. "/expressions_with_imageid.lua"


-- -- 1) imageId ekle
-- local function AddImageIdToTable(tbl)
--     for key, value in pairs(tbl) do
--         if type(value) == "table" and value.imageId == nil then
--             value.imageId = key
--         end
--     end
-- end


-- -- 2) alfabetik key sıralama
-- local function SortedKeys(tbl)
--     local keys = {}
--     for k in pairs(tbl) do
--         if type(k) == "string" then
--             table.insert(keys, k)
--         end
--     end
--     table.sort(keys)
--     return keys
-- end


-- -- 3) iç tablonun formatlı serialize'ı (temiz girinti)
-- local function SerializeInner(tbl, indent)
--     indent = indent or ""
--     local tab = indent .. "    "
--     local lines = {"{"}

--     -- önce string değerler
--     for i, v in ipairs(tbl) do
--         table.insert(lines, tab .. string.format("%q,", v))
--     end

--     -- sonra imageId (en sona)
--     if tbl.imageId then
--         table.insert(lines, tab .. string.format('imageId = %q,', tbl.imageId))
--     end

--     table.insert(lines, indent .. "}")
--     return table.concat(lines, "\n")
-- end


-- -- 4) dış tablo serialize (temiz yapı)
-- local function SerializeExpressions(tbl)
--     local lines = {"RES.Expressions = {"}
--     for _, key in ipairs(SortedKeys(tbl)) do
--         local inner = SerializeInner(tbl[key], "    ")
--         table.insert(lines, string.format('    ["%s"] = %s,', key, inner))
--     end
--     table.insert(lines, "}")
--     return table.concat(lines, "\n")
-- end


-- -- Uygula
-- AddImageIdToTable(RES.Walks)

-- -- Kaydet
-- local file = io.open(outputPath, "w+")
-- file:write(SerializeExpressions(RES.Walks))
-- file:close()

-- print("^2✔ expressions_with_imageid.lua (TEMİZ FORMAT) -> ^7" .. outputPath)