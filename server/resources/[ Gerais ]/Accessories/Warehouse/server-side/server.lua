Config = Config or {}

local webhook = Config.Webhook
local botToken = Config.BotToken
local playerLocations = {}
local Identifier = GlobalState['Basics']['Identifier'] or "steam"

local function generateUniqueWarehouseId()
    local warehouseId, isUnique = nil, false
    while not isUnique do
        warehouseId = math.random(500, 1000)
        local result = MySQL.query.await('SELECT `warehouse_id` FROM `warehouses` WHERE `warehouse_id` = ?', {warehouseId})
        if result[1] == nil then isUnique = true end
    end
    return warehouseId
end

local function getSteamIdentifier(src)
    for _, id in ipairs(GetPlayerIdentifiers(src)) do
        if string.match(id, Identifier..":") then
            return id
        end
    end
    return nil
end

local function getDiscordIdentifierAndTag(src, callback)
    local discordId
    for _, id in ipairs(GetPlayerIdentifiers(src)) do
        if string.match(id, "discord:") then
            discordId = string.sub(id, 9)
            break
        end
    end
    if discordId then
        PerformHttpRequest("https://discord.com/api/v10/users/" .. discordId, function(err, response, headers)
            if err == 200 then
                local data = json.decode(response)
                callback(discordId, data.username .. "#" .. data.discriminator)
            else
                callback(discordId, nil)
            end
        end, "GET", "", {["Authorization"] = "Bot " .. botToken})
    else
        callback(nil, nil)
    end
end

local function sendToDiscord(title, message, color)
    PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
        embeds = {{
            title = title,
            description = message,
            color = color
        }}
    }), {['Content-Type'] = 'application/json'})
end

RegisterNetEvent('warehouse:buy')
AddEventHandler('warehouse:buy', function(warehouseIndex, warehouseName, warehouseCode)
    local src = source
    local playerName = GetPlayerName(src)
    local steamId = getSteamIdentifier(src)
    local warehouse = Config.Warehouses[warehouseIndex]

    getDiscordIdentifierAndTag(src, function(discordId, discordTag)
        if not warehouseName or warehouseName == "" then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Nome do armazém inválido!', type = 'error'})
            return
        end
        if not warehouseCode or #warehouseCode ~= 4 then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Código de acesso inválido! Deve ter 4 dígitos.', type = 'error'})
            return
        end

        local money = exports.ox_inventory:GetItem(src, 'dollars')
        local warehousePrice = warehouse.price
        if not money or money.count < warehousePrice then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Dinheiro insuficiente para comprar o armazém! Você precisa de $' .. warehousePrice, type = 'error'})
            return
        end

        local existingWarehouses = MySQL.query.await('SELECT `id`, `purchase_count` FROM `warehouses` WHERE `location` = ?', {json.encode(warehouse.coords)})

        if #existingWarehouses > 0 then
            local warehouseData = existingWarehouses[1]
            if warehouseData.purchase_count >= Config.maxPurchases then
                TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Este armazém atingiu o limite máximo de compras', type = 'error'})
                return
            end

            exports.ox_inventory:RemoveItem(src, 'dollars', warehousePrice)

            MySQL.update.await('UPDATE `warehouses` SET `purchase_count` = `purchase_count` + 1 WHERE `id` = ?', {warehouseData.id})

            local newWarehouseId = generateUniqueWarehouseId()
            MySQL.insert.await('INSERT INTO `warehouses` (owner, steam_id, name, code, location, warehouse_id, max_slots, max_weight, discord, original_price, purchase_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {
                playerName, steamId, warehouseName, warehouseCode, json.encode(warehouse.coords), newWarehouseId, Config.stashes.defaultSlots, Config.stashes.defaultWeight, discordId, warehousePrice, warehouseData.purchase_count + 1
            })

            exports.ox_inventory:RegisterStash('warehouse_' .. newWarehouseId, warehouseName, Config.stashes.defaultSlots, Config.stashes.defaultWeight, playerName)

            TriggerClientEvent('ox_lib:notify', src, {title = 'Sucesso', description = 'Você comprou o armazém: ' .. warehouseName, type = 'success'})
            TriggerClientEvent('warehouse:setupStashTarget', src, warehouse.coords, newWarehouseId)
        else
            exports.ox_inventory:RemoveItem(src, 'dollars', warehousePrice)

            local warehouseId = generateUniqueWarehouseId()
            MySQL.insert.await('INSERT INTO `warehouses` (owner, steam_id, name, code, location, warehouse_id, max_slots, max_weight, discord, original_price, purchase_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {
                playerName, steamId, warehouseName, warehouseCode, json.encode(warehouse.coords), warehouseId, Config.stashes.defaultSlots, Config.stashes.defaultWeight, discordId, warehousePrice, 1
            })

            exports.ox_inventory:RegisterStash('warehouse_' .. warehouseId, warehouseName, Config.stashes.defaultSlots, Config.stashes.defaultWeight, playerName)

            TriggerClientEvent('ox_lib:notify', src, {title = 'Sucesso', description = 'Você comprou o armazém: ' .. warehouseName, type = 'success'})
            TriggerClientEvent('warehouse:setupStashTarget', src, warehouse.coords, warehouseId)
        end
        local discordDisplay = discordTag or "Desconhecido"
        local mention = discordId and ("<@" .. discordId .. ">") or "Desconhecido"
        sendToDiscord("Compra de Armazém", ("**Jogador:** %s\n**Discord:** %s\n**Nome do Armazém:** %s\n**Preço:** $%d"):format(playerName, mention, warehouseName, warehousePrice), 3447003)
    end)
end)

RegisterNetEvent('warehouse:requestUpgradeInfo')
AddEventHandler('warehouse:requestUpgradeInfo', function(warehouseId, upgradeType)
    local src = source
    local warehouse = MySQL.query.await('SELECT `max_slots`, `max_weight` FROM `warehouses` WHERE `warehouse_id` = ?', {warehouseId})
    if warehouse[1] then
        TriggerClientEvent('warehouse:receiveUpgradeInfo', src, warehouse[1].max_slots, warehouse[1].max_weight)
    else
        TriggerClientEvent('ox_lib:notify', src, {type = 'error', description = 'Armazém não encontrado.'})
    end
end)

RegisterNetEvent('warehouse:processUpgrade')
AddEventHandler('warehouse:processUpgrade', function(warehouseId, upgradeType, upgradeAmount, upgradeCost)
    local src = source
    local playerName = GetPlayerName(src)
    local money = exports.ox_inventory:GetItem(src, 'dollars')
    if not money or money.count < upgradeCost then
        TriggerClientEvent('ox_lib:notify', src, {type = 'error', description = 'Dinheiro insuficiente para esta melhoria!'})
        return
    end

    local warehouse = MySQL.query.await('SELECT `max_slots`, `max_weight` FROM `warehouses` WHERE `warehouse_id` = ?', {warehouseId})
    if not warehouse[1] then
        TriggerClientEvent('ox_lib:notify', src, {type = 'error', description = 'Armazém não encontrado!'})
        return
    end

    local currentSlots = warehouse[1].max_slots
    local currentWeight = warehouse[1].max_weight

    if upgradeType == 'slots' then
        if currentSlots + upgradeAmount > Config.stashes.maxSlots then
            TriggerClientEvent('ox_lib:notify', src, {type = 'error', description = 'Melhoria excede o limite máximo de slots!'})
            return
        end
        MySQL.update.await('UPDATE `warehouses` SET `max_slots` = ? WHERE `warehouse_id` = ?', {currentSlots + upgradeAmount, warehouseId})
    elseif upgradeType == 'weight' then
        if currentWeight + (upgradeAmount * 1000) > Config.stashes.maxWeight then
            TriggerClientEvent('ox_lib:notify', src, {type = 'error', description = 'Melhoria excede o limite máximo de peso!'})
            return
        end
        MySQL.update.await('UPDATE `warehouses` SET `max_weight` = ? WHERE `warehouse_id` = ?', {currentWeight + (upgradeAmount * 1000), warehouseId})
    end

    exports.ox_inventory:RemoveItem(src, 'dollars', upgradeCost)

    exports.ox_inventory:RegisterStash('warehouse_' .. warehouseId, warehouse[1].name, currentSlots + upgradeAmount, currentWeight + (upgradeAmount * 1000), playerName)

    TriggerClientEvent('ox_lib:notify', src, {type = 'success', description = 'Armazém melhorado com sucesso!'})
end)

RegisterNetEvent('warehouse:changePin')
AddEventHandler('warehouse:changePin', function(warehouseId, newCode)
    local src = source
    local steamId = getSteamIdentifier(src)

    if not newCode or #newCode ~= 4 then
        TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Código de acesso inválido! Deve ter 4 dígitos.', type = 'error'})
        return
    end

    MySQL.update('UPDATE `warehouses` SET `code` = ? WHERE `warehouse_id` = ? AND `steam_id` = ?', {newCode, warehouseId, steamId}, function(affectedRows)
        if affectedRows > 0 then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Sucesso', description = 'Código do armazém alterado com sucesso!', type = 'success'})
        else
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Você não é o dono deste armazém!', type = 'error'})
        end
    end)
end)

RegisterNetEvent('warehouse:enter')
AddEventHandler('warehouse:enter', function(warehouseName, enteredCode, playerCoords)
    local src = source
    local steamId = getSteamIdentifier(src)
    MySQL.query('SELECT `code`, `warehouse_id`, `steam_id`, `location` FROM `warehouses` WHERE `name` = ?', {warehouseName}, function(result)
        if result[1] and (result[1].code == enteredCode or result[1].steam_id == steamId) then
            local entryCoords = json.decode(result[1].location)
            local distance = #(playerCoords - vec3(entryCoords.x, entryCoords.y, entryCoords.z))
            if distance <= 5.0 then
                local warehouseId = result[1].warehouse_id
                local isOwner = (result[1].steam_id == steamId)
                playerLocations[src] = playerCoords

                SetPlayerRoutingBucket(src, warehouseId)
                TriggerClientEvent('warehouse:teleportInside', src, warehouseId, isOwner)

                TriggerClientEvent('warehouse:setupStashTarget', src, entryCoords, warehouseId)
                if result[1].code ~= enteredCode then
                    TriggerClientEvent('ox_lib:notify', src, {title = 'Informação', description = 'A senha inserida está errada, mas você entrou por ser o dono', type = 'info'})
                end
            else
                TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Você não pode entrar neste armazém daqui!', type = 'error'})
            end
        else
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Nome ou código do armazém inválido!', type = 'error'})
        end
    end)
end)

RegisterNetEvent('warehouse:leave')
AddEventHandler('warehouse:leave', function(src)
    local src = src or source
    local originalPos = playerLocations[src]

    SetPlayerRoutingBucket(src, 0)
    if originalPos then
        TriggerClientEvent('warehouse:teleportOutside', src, originalPos)
        playerLocations[src] = nil
    else
        TriggerClientEvent('ox_lib:notify', src, {title = 'Aviso', description = 'Localização de saída não encontrada!', type = 'error'})
    end
end)

RegisterCommand("requestStashInfo", function(source, args, rawCommand)
    local src = source
    local playerName = GetPlayerName(src)

    if IsPlayerAceAllowed(src, "command.requestStashInfo") then
        if not args[1] then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Por favor, forneça um nome de armazém!', type = 'error'})
            return
        end

        local warehouseName = args[1]

        MySQL.query('SELECT `warehouse_id`, `owner`, `discord`, `max_slots`, `max_weight` FROM `warehouses` WHERE `name` = ?', {warehouseName}, function(result)
            if result[1] then
                local warehouseId = result[1].warehouse_id
                local ownerName = result[1].owner
                local ownerDiscord = result[1].discord and ("<@" .. result[1].discord .. ">") or "Desconhecido"
                local stashId = 'warehouse_' .. warehouseId
                local inventory = exports.ox_inventory:GetInventory(stashId)
                if inventory and inventory.items then
                    local itemList = ""
                    for _, item in pairs(inventory.items) do
                        itemList = itemList .. ("**Item:** %s | **Quantidade:** %d\n"):format(item.name, item.count)
                    end

                    if itemList == "" then
                        itemList = "O armazém está vazio."
                    end

                    sendToDiscord("Informações do Armazém", ("**Nome do Armazém:** %s\n**Dono:** %s\n**Discord do Dono:** %s\n**Solicitado por:** %s\n\n%s"):format(warehouseName, ownerName, ownerDiscord, playerName, itemList), 3447003)
                    TriggerClientEvent('ox_lib:notify', src, {title = 'Sucesso', description = 'Informações do armazém enviadas para o Discord!', type = 'success'})
                else
                    TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Nenhum item encontrado no armazém.', type = 'error'})
                end
            else
                TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Nenhum armazém encontrado com esse nome!', type = 'error'})
            end
        end)
    else
        TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Você não tem permissão para usar este comando!', type = 'error'})
    end
end)

AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `warehouses` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `owner` varchar(100) NOT NULL,
        `steam_id` varchar(50) DEFAULT NULL,
        `discord` varchar(50) NOT NULL,
        `name` varchar(100) NOT NULL,
        `code` varchar(4) NOT NULL,
        `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`location`)),
        `warehouse_id` int(11) NOT NULL,
        `max_slots` int(11) DEFAULT 50,
        `max_weight` int(11) DEFAULT 50000,
        `original_price` int(11) NOT NULL DEFAULT 0,
        `purchase_count` int(11) NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`),
        UNIQUE KEY `warehouse_id_UNIQUE` (`warehouse_id`),
        UNIQUE KEY `name_UNIQUE` (`name`)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    ]])
    local warehouses = MySQL.query.await('SELECT `warehouse_id`, `name`, `owner`, `max_slots`, `max_weight` FROM `warehouses`')
    if warehouses then
        for _, warehouse in pairs(warehouses) do
            exports.ox_inventory:RegisterStash('warehouse_' .. warehouse.warehouse_id, warehouse.name, warehouse.max_slots, warehouse.max_weight, warehouse.owner)
        end
    end
end)

RegisterNetEvent('warehouse:sell')
AddEventHandler('warehouse:sell', function()
    local src = source
    local steamId = getSteamIdentifier(src)
    local playerName = GetPlayerName(src)
    local warehouseId = GetPlayerRoutingBucket(src)
    local saleCutPercentage = Config.sellpros

    getDiscordIdentifierAndTag(src, function(discordId, discordTag)
        local mention = discordId and ("<@" .. discordId .. ">") or "Unknown"

        local warehouse = MySQL.query.await('SELECT `name`, `original_price`, `steam_id` FROM `warehouses` WHERE `warehouse_id` = ?', {warehouseId})
        if not warehouse[1] or tostring(warehouse[1].steam_id) ~= tostring(steamId) then
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Você não é o dono do armazém', type = 'error'})
            return
        end

        local warehousePrice = warehouse[1].original_price or 0
        local payoutAmount = math.floor(warehousePrice * (1 - saleCutPercentage))

        if payoutAmount > 0 then
            exports.ox_inventory:AddItem(src, 'dollars', payoutAmount)
        else
            TriggerClientEvent('ox_lib:notify', src, {title = 'Erro', description = 'Valor invalido!', type = 'error'})
            return
        end

        exports.ox_inventory:ClearInventory('warehouse_' .. warehouseId)
        MySQL.query.await('DELETE FROM `warehouses` WHERE `warehouse_id` = ?', {warehouseId})

        TriggerClientEvent('ox_lib:notify', src, {title = 'Success', description = ('Você vender o armazém por $%d depois de um desconto de %.0f%%.'):format(payoutAmount, saleCutPercentage * 100), type = 'success'})

        sendToDiscord("Venda de armazém", ("**Jogador:** %s\n**Discord:** %s\n**Nome do armazém:** %s\n**Preço original:** $%d\n**Valor recebido:** $%d\n")
            :format(playerName, mention, warehouse[1].name, warehousePrice, payoutAmount), 16056320)

        TriggerEvent('warehouse:leave', src)
    end)
end)
