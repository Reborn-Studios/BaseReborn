Framework = {}

if Config.Framework == "vrp" then
    if not module then
        return error("Importar no fxmanifest utils.lua")
    end
    Tunnel = module("vrp","lib/Tunnel")
    Proxy = module("vrp","lib/Proxy")
    vRP = Proxy.getInterface("vRP")

    function Framework:GetUserIdentifier(source)
        if vRP.getUserId then
            return vRP.getUserId(source)
        elseif vRP.Passport then
            return vRP.Passport(source)
        end
    end

    function Framework:GetCops()
        local cops = {}
        if vRP.getUsersByPermission then
            cops = vRP.getUsersByPermission("policia.permissao")
        elseif vRP.numPermission then
            cops = vRP.numPermission("Police")
        elseif vRP.NumPermission then
            cops = vRP.NumPermission("Police")
        end
        return cops
    end

    function Framework:PoliceAlert(coords)
        local cops = Framework:GetCops()
        for k,v in pairs(cops) do
            async(function()
                local player = vRP.getUserSource and vRP.getUserSource(v) or vRP.userSource and vRP.userSource(v) or vRP.Source and vRP.Source(v)
                if player then
                    TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Me ajuda um cara acabou de tentar me vender droga!", code = 20, title = "Denúncia de Venda de Drogas", x = coords.x, y = coords.y, z = coords.z, rgba = {41,76,119} })
                end
            end)
        end
    end

    function Framework:AddItem(source, item, amount)
        if amount <= 0 then return end
        local user_id = Framework:GetUserIdentifier(source)
        if vRP.giveInventoryItem then
            vRP.giveInventoryItem(user_id, item, amount, true)
        elseif vRP.GiveItem then
            vRP.GiveItem(user_id, item, amount)
        end
    end

    function Framework:GetItem(source, item)
        local user_id = Framework:GetUserIdentifier(source)
        if vRP.getInventoryItemAmount then
            return vRP.getInventoryItemAmount(user_id, item)
        elseif vRP.InventoryItemAmount then
            return vRP.InventoryItemAmount(user_id, item)[1]
        end
    end

    function Framework:RemoveItem(source, item, amount)
        local user_id = Framework:GetUserIdentifier(source)
        if vRP.tryGetInventoryItem then
            if vRP.tryGetInventoryItem(user_id, item, amount) then
                return true
            end
        elseif vRP.TakeItem then
            return vRP.TakeItem(user_id, item, amount)
        end
    end

    function Framework:AddMoney(source, type, amount, reason)
        local user_id = Framework:GetUserIdentifier(source)
        if vRP.giveBankMoney then
            vRP.giveBankMoney(user_id, amount)
        elseif vRP.addBank then
            vRP.addBank(user_id, amount)
        elseif vRP.GiveBank then
            vRP.GiveBank(user_id, amount)
        end
        return true
    end

    function Framework:Payment(buyer, owner, quantity, price, product)
        local value = quantity * price
        if Framework:RemoveItem(buyer, "dollars2",value) then
            Framework:AddItem(owner, "dollars2", value)
            TriggerClientEvent("Notify",owner,"sucesso","Você vendeu o produto "..product.." por R$"..value,5000)
            return true
        else
            TriggerClientEvent("Notify",buyer,"negado","Dinheiro insuficiente.",5000)
        end
    end

    function Framework:SrvNotify(src,text)
        TriggerClientEvent("Notify",src,"aviso",text,5000)
    end
end

if Config.Framework == 'qb' then
    local QBCore = exports['qb-core']:GetCoreObject()

    function Framework:GetUserIdentifier(source)
        local player = QBCore.Functions.GetPlayer(source)
        if player then
            return player.PlayerData.citizenid
        end
    end

    function Framework:GetCops()
        local cops = {}
        for _, v in pairs(QBCore.Functions.GetPlayers()) do
            local Player = QBCore.Functions.GetPlayer(v)
            if Player ~= nil then
                if Player.PlayerData.job.name == "police" and Player.PlayerData.job.onduty then
                    table.insert(cops,Player.PlayerData.source)
                end
            end
        end
        return cops
    end

    function Framework:PoliceAlert(coords)
        local cops = Framework:GetCops()
        for _,player in pairs(cops) do
            TriggerClientEvent('will_drugsales:client:policeAlert', player, coords)
        end
    end

    function Framework:AddItem(source, item, amount)
        local player = QBCore.Functions.GetPlayer(source)
        if not player then return false end
        return player.Functions.AddItem(item, amount)
    end

    function Framework:RemoveItem(source, item, amount)
        local player = QBCore.Functions.GetPlayer(source)
        if not player then return false end
        return player.Functions.RemoveItem(item, amount)
    end

    function Framework:AddMoney(source, type, amount, reason)
        local player = QBCore.Functions.GetPlayer(source)
        if not player then return false end
        return player.Functions.AddMoney(type, amount, reason)
    end

    function Framework:SrvNotify(src,text)
        TriggerClientEvent("QBCore:Notify", src, text, "warning")
    end
end

if Config.Framework == 'esx' then
    local ESX = exports.es_extended:getSharedObject()

    function Framework:GetUserIdentifier(source)
        local player = ESX.GetPlayerFromId(source)
        if player then
            return player.identifier
        end
    end

    function Framework:GetCops()
        local cops = {}
        for _, v in pairs(ESX.GetPlayers()) do
            local player = ESX.GetPlayerFromId(v)
            if player then
                if player.job.name == "police" then
                    table.insert(cops,player.source)
                end
            end
        end
        return cops
    end

    function Framework:PoliceAlert(coords)
        local cops = Framework:GetCops()
        for _,player in pairs(cops) do
            TriggerClientEvent('will_drugsales:client:policeAlert', player, coords)
        end
    end

    function Framework:AddItem(source, item, amount)
        local player = ESX.GetPlayerFromId(source)
        if not player then return false end
        return player.addInventoryItem(item, amount)
    end

    function Framework:RemoveItem(source, item, amount)
        local player = ESX.GetPlayerFromId(source)
        if not player then return false end
        return player.removeInventoryItem(item, amount)
    end

    function Framework:AddMoney(source, type, amount, reason)
        local player = ESX.GetPlayerFromId(source)
        if not player then return false end
        player.addMoney(amount)
        return true
    end

    function Framework:SrvNotify(src,text)
        local player = ESX.GetPlayerFromId(src)
        if not player then return false end
        player.showNotification(text)
    end
end

function Framework:GetCopBonus(price)
    local copsamount = #Framework:GetCops()
    if copsamount > 0 and copsamount < 3 then
        price = price * 1.2
    elseif copsamount >= 3 and copsamount <= 7 then
        price = price * 1.5
    elseif copsamount >= 8 then
        price = price * 2.0
    end
    return price
end

function Framework:CheckDrugPrice(data)
    local price = tonumber(data.price)
    if not price then return end
    local item = data.item
	local amount = data.amount
    for _,v in pairs(Config.SellItems) do
        if v.item == item then
            local drugPrice = v.price * amount
            if drugPrice > price then
                if Config.Debug then print('Pagou preço justo') end
                return true
            end
            if math.random(1,100) > 50 and (drugPrice + drugPrice * 1/5) > price then
                if Config.Debug then print('Pagou preço 20% mais caro') end
                return true
            elseif math.random(1,100) > 70 and (drugPrice + drugPrice * 2/5) > price then
                if Config.Debug then print('Pagou preço 40% mais caro') end
                return true
            elseif math.random(1,100) > 90 then
                if Config.Debug then print('Pagou preço cobrado',price) end
                return true
            end
        end
    end
    return false
end

RegisterNetEvent("will_drugsales:addTableItem")
AddEventHandler("will_drugsales:addTableItem", function ()
   local source = source
   Framework:AddItem(source, "drugtable", 1)
end)

RegisterNetEvent("will_drugsales:removeTableItem")
AddEventHandler("will_drugsales:removeTableItem", function ()
    local source = source
    Framework:RemoveItem(source, "drugtable", 1)
end)

RegisterCommand("selldrugs",function (source)
    TriggerClientEvent("will_drugsales:toggleselling",source)
end)

RegisterServerEvent("will_drugsales:policeAlert", function (coords)
    Framework:PoliceAlert(coords)
end)
