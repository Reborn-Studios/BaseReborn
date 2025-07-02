-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("pause", Creative)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Battlepass = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARES
-----------------------------------------------------------------------------------------------------------------------------------------
vRP.Prepare('pause_marketplace_itens/insertItem',"INSERT INTO pause_marketplace_itens (id, Name, `Key`, Price, Amount, owner_id) VALUES (@id, @Name, @Key, @Price, @Amount, @owner_id)")
vRP.Prepare('pause_marketplace_itens/getItems', "SELECT * FROM pause_marketplace_itens")
vRP.Prepare("pause_marketplace_itens/getItem","SELECT * FROM pause_marketplace_itens WHERE id = @id")
vRP.Prepare("pause_marketplace_itens/deleteItem","DELETE FROM pause_marketplace_itens WHERE id = @id")
vRP.Prepare('pause_shopping/insertShopping',"INSERT INTO pause_shopping(passport, item_name, amount, price, discount, image)VALUES(@passport, @item_name, @amount, @price, @discount, @image)")
vRP.Prepare('pause_shopping/getShopping', "SELECT * FROM pause_shopping WHERE passport = @passport ORDER BY created_at DESC LIMIT 10")
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Disconnect()
    local source = source
    vRP.Kick(source, "Você desconectou do servidor.")
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Premium
-----------------------------------------------------------------------------------------------------------------------------------------
local function getPremium(Source)
    local Passport = vRP.Passport(Source)
    local Identity = vRP.Identity(Passport)
    local Account = vRP.Account(Identity["License"])

    local PremiumDay = 0
    if Account["Premium"] and Account["Premium"] >= os.time() then
        local tempoRestante = Account["Premium"] - os.time()
        PremiumDay = math.floor(tempoRestante / 86400)
    end

    local Display = Premium["Platina"]
    local Hierarchy = vRP.GetUserHierarchy(Passport, "Premium")
    if vRP.HasPermission(Passport,"vip.permissao") then
        Display = Premium[Hierarchy]
    end

    return {
        ["Active"] = PremiumDay,
        ["Hierarchy"] = Hierarchy,
        ["Display"] = Display
    }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Experience
-----------------------------------------------------------------------------------------------------------------------------------------
local function getExperience(Passport)
    local Experience = {}
    if Works and GetResourceState("will_jobs") == "started" then
        for key, work in pairs(Works) do
            local exp = exports["will_jobs"]:getUserExp(Passport, work)
            table.insert(Experience, { work, exp })
        end
    end
    return Experience
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Boxes
-----------------------------------------------------------------------------------------------------------------------------------------
local function getBox(Source)
    local boxId = BoxMenu
    local box = Boxes[boxId]
    if not box then
        return nil
    end
    local rewards = {}
    for _, reward in ipairs(box.Rewards) do
        table.insert(rewards, {
            Id = reward.Id,
            Amount = reward.Amount,
            Image = reward.Image,
            Item = reward.Item,
            Name = reward.Name,
            Chance = reward.Chance
        })
    end
    return {
        Discount = box.Discount,
        Id = box.Id,
        Image = box.Image,
        Name = box.Name,
        Price = box.Price,
        Rewards = rewards
    }
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUMBUY
-----------------------------------------------------------------------------------------------------------------------------------------
local function addVehicle(user_id, vehicle)
    vRP.addUserVehicle(user_id,vehicle)
end

local function setPremium(Passport)
    local identity = vRP.Identity(Passport)
    vRP.execute("vRP/set_premium",{ identifier = identity.identifier, premium = parseInt(os.time()), chars = 2, predays = 30, priority = 50 })
end

local function upgradePremium(Passport)
    local identity = vRP.Identity(Passport)
    vRP.execute("vRP/update_premium",{ identifier = identity.identifier, predays = 30 })
end

function Creative.PremiumBuy(Data,Select)
    local Source = source
    local Passport = vRP.Passport(Source)
    if Passport and tonumber(Data) then
        local PremiumType = nil
        for k,v in pairs(Premium) do
            if v['Hierarchy'] == tonumber(Data) then
                PremiumType = k
                break
            end
        end
        if Premium[PremiumType] then
            local SelectedPremium = Premium[PremiumType]
            local Price = SelectedPremium.Price * SelectedPremium.Discount
            if type(SelectedPremium) == "table" then
                PremiumType = PremiumType
            end
            if vRP.PaymentGemstone(Passport, Price) then
                if not vRP.getPremium(Passport) then
                    setPremium(Passport)
                    if SelectedPremium["Selectables"] then
                        for _, Selectable in ipairs(SelectedPremium["Selectables"]) do
                            if Select[Selectable["Id"]] then
                                local data = Selectable["Options"][Select[Selectable["Id"]]]
                                local VehicleIndex = data["Index"]
                                local RentalDays = data["Amount"]
                                if VehicleIndex then
                                    if RentalDays then
                                        local Time = os.time() + 24 * 60 * 60 * RentalDays
                                        vRP.execute('will/add_rend',{ user_id = Passport, vehicle = VehicleIndex ,time = Time })
                                    end
                                    addVehicle(Passport, VehicleIndex)
                                    TriggerClientEvent("Notify", Source, "Sucesso", "Premium alugado com sucesso", 5000)
                                end
                            end
                        end
                    end
                    vRP.SetPermission(Passport, PremiumType)
                    TriggerClientEvent("pause:Notify", Source, "Compra concluída.",
                        "Premium " .. SelectedPremium.Name .. "", "verde")
                else
                    upgradePremium(Passport)
                    TriggerClientEvent("pause:Notify", Source, "Renovado com sucesso.",
                            "Premium " .. SelectedPremium.Name .. "", "verde")
                end
                return true
            else
                TriggerClientEvent("pause:Notify", Source, "Gemas insuficientes.", "Verifique suas Gemas.", "vermelho")
                return false
            end
        else
            TriggerClientEvent("pause:Notify", Source, "Tipo de premium inválido.", "Verifique suas Gemas.", "vermelho")
            return false
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOME
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Home()
    local Source = source
    local Passport = vRP.Passport(Source)
    local Identity = vRP.Identity(Passport)
    if Identity then
        local Home = {
            ["Information"] = {
                ["Passport"] = Passport,
                ["Name"] = vRP.FullName(Passport),
                ["Bank"] = Identity["Bank"],
                ["Phone"] = vRP.GetPhone(Passport),
                ["Blood"] = Identity["Blood"],
                ["Gemstone"] = vRP.getGmsId(Passport),
                ["Medic"] = vRP.getUserGroupByType(Passport,"job") or "Desempregado"
            },
            ["Premium"] = getPremium(Source),
            ["Carousel"] = getCarousel(),
            ["Shopping"] = getShopping(Passport),
            ["Experience"] = getExperience(Passport),
            ["Box"] = getBox(Source),
            ["Levels"] = { 0, 250, 500, 1000, 2000, 3500, 7500, 10000, 15000 }
        }
        return Home
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STOREBUY
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.StoreBuy(itemName, amount)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local function getItemData(itemName)
            return ShopItens[itemName]
        end
        local itemData = getItemData(itemName)
        if itemData then
            local price = parseInt(itemData["Price"] * itemData["Discount"]) * amount
            if vRP.PaymentGemstone(user_id, price) then
                local params = {
                    ['@passport'] = user_id,
                    ['@item_name'] = itemName,
                    ['@amount'] = amount,
                    ['@price'] = price,
                    ['@discount'] = itemData["Discount"],
                    ['@image'] = itemData["Image"] or itemName
                }
                vRP.Query('pause_shopping/insertShopping', params)
                vRP.GenerateItem(user_id, itemName, amount, false)
                TriggerClientEvent("pause:Notify", source, "Compra concluída.", "Verifique seu Inventario.", "verde")
                return true
            else
                TriggerClientEvent("pause:Notify", source, "Gemas insuficientes.", "Verifique suas Gemas.", "vermelho")
                return false
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETSHOPPING
-----------------------------------------------------------------------------------------------------------------------------------------
function getShopping(Passport)
    local shopping = {}
    local params = { ['@passport'] = Passport }
    local rows = vRP.Query('pause_shopping/getShopping', params)
    if rows then
        for i, row in ipairs(rows) do
            shopping[i] = {
                Amount = row.amount,
                Discount = row.discount,
                Image = row.image,
                Index = row.item_name,
                Name = vRP.itemNameList(row.item_name),
                Price = row.price,
                id = i
            }
        end
    end
    return shopping
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Carousel
-----------------------------------------------------------------------------------------------------------------------------------------
function getCarousel()
    local Carousel = {}

    if ShopItens then
        for Key, Value in pairs(ShopItens) do
            if Value["Discount"] < 1.0 then 
                local FinalPrice = Value["Price"] * Value["Discount"]
                
                table.insert(Carousel, {
                    ["Price"] = Value["Price"], 
                    ["FinalPrice"] = FinalPrice,
                    ["id"] = #Carousel + 1,
                    ["Name"] = vRP.itemNameList(Key),
                    ["Index"] = Key,
                    ["Image"] = Key,
                    ["Discount"] = Value["Discount"]
                })
            end
        end
    end

    if #Carousel > 0 then
        table.sort(Carousel, function(a, b)
            return a["Discount"] < b["Discount"]
        end)
    end

    return Carousel
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STORELIST
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.StoreList()
    local DiamondsList = {}
    if ShopItens then
        for Number, v in pairs(ShopItens) do
            DiamondsList[#DiamondsList + 1] = {
                ["Index"] = Number,
                ["Description"] = itemDescription(Number),
                ["Image"] = Number,
                ["Name"] = vRP.itemNameList(Number),
                ["Price"] = v.Price,
                ["Discount"] = v.Discount,
            }
        end
    end
    return DiamondsList
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect",function(Passport)
	if Battlepass[Passport] then
        vRP.setUData(Passport,"Rolepass",json.encode(Battlepass[Passport]))
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETROLEPASS
-----------------------------------------------------------------------------------------------------------------------------------------
function GetRolepass(Passport)
    if not Battlepass[Passport] then
        Battlepass[Passport] = json.decode(vRP.UserData(Passport,"Rolepass")) or {Active = false, Points = 0, Free = 0, Premium = 0}
    end
    return Battlepass[Passport]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDPOINTS
-----------------------------------------------------------------------------------------------------------------------------------------
function AddPoints(source, Points)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        Battlepass[user_id] = Battlepass[user_id] or {Points = 0}
        local Rolepass = Battlepass[user_id] or {Points = 0}
        Battlepass[user_id]["Points"] = Rolepass["Points"] + Points
        local data = { Active = Rolepass["Active"] or false, Points = Battlepass[user_id]["Points"], Free = Rolepass["Free"], Premium = Rolepass["Premium"] }
        vRP.setUData(user_id,"Rolepass",json.encode(data))
        TriggerClientEvent("Notify",source,"Sucesso","+ ".. Points.." Pontos Adicionados",5000)
        return true
    else
        return false
    end
end
exports("AddPoints",AddPoints)
RegisterCommand("points",function(source,Message)
    local Passport = vRP.Passport(source)
    local OtherSource = parseInt(Message[1])
    if Passport and OtherSource and OtherSource > 0 and vRP.Passport(OtherSource) and vRP.HasGroup(Passport,"Admin") then
        exports["pause"]:AddPoints(OtherSource,Message[2])
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ROLEPASS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Rolepass()
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local RolepassTwo = GetRolepass(user_id)
        local Premium = {}
        for Index,Value in pairs(RoleItens["Premium"]) do
            table.insert(Premium, { id = Index, Name = vRP.itemNameList(Value.Item), Index = Value.Item, Amount = Value.Amount, Image = Value.Item, Description = itemDescription(Value.Item) })
        end
        local Free = {}
        for Index,Value in pairs(RoleItens["Free"]) do
            table.insert(Free, { id = Index, Name = vRP.itemNameList(Value.Item), Index = Value.Item, Amount = Value.Amount, Image = Value.Item, Description = itemDescription(Value.Item) })
        end
        return {
            Active = RolepassTwo["Active"],
            CurrentFree = parseInt(RolepassTwo["Free"]),
            CurrentPremium = parseInt(RolepassTwo["Premium"]),
            Finish = parseInt(RolepassTwo["Premium"]) - os.time(),
            Free = Free,
            Necessary = RolepassPoints,
            Points = parseInt(math.ceil(parseInt(RolepassTwo["Points"]) / 500) * 500),
            Premium = Premium,
            Price = RolepassPrice
        }
    end
    return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ROLEPASSBUY
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.RolepassBuy()
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        if Battlepass["Active"] == nil then
            Battlepass["Active"] = false
        end
        if not Battlepass["Active"] then
            if vRP.PaymentGemstone(user_id, RolepassPrice) then
                Battlepass["Active"] = true
                vRP.setUData(user_id,"Rolepass",json.encode(Battlepass))
                TriggerClientEvent("pause:Notify", source, "Compra concluída.", "Verifique o Passe de Batalha.", "verde")
                return true
            else
                TriggerClientEvent("pause:Notify", source, "Gemas insuficientes.", "Verifique suas Gemas.", "vermelho")
                return false
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ROLEPASSRESCUE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.RolepassRescue(Mode, Number)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        if Battlepass["Active"] == nil then
            Battlepass["Active"] = false
        end
        print(Mode, Number)
        if RoleItens[Mode] then
            if RoleItens[Mode][Number] then
                local itemName = RoleItens[Mode][Number]["Item"]
                local itemAmount = RoleItens[Mode][Number]["Amount"]
                Battlepass[user_id][Mode] = parseInt(Number)
                Battlepass[user_id]["Points"] = not Battlepass[user_id]["Points"] and 0 or Battlepass[user_id]["Points"] - RolepassPoints
                vRP.setUData(user_id,"Rolepass",json.encode(Battlepass[user_id]))
                vRP.GenerateItem(user_id, itemName, itemAmount, false)
                TriggerClientEvent("pause:Notify", source, "Item Recebido.", "Você recebeu <b>"..itemAmount.."x "..vRP.itemNameList(itemName).."</b>.", "verde")
                return true
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPENBOX
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.OpenBox(Data)
    local source = source
    local user_id = vRP.Passport(source)

    if user_id then
        local boxData
        for _, box in pairs(Boxes) do
            if box.Id == Data then
                boxData = box
                break
            end
        end

        if boxData then
            local price = parseInt(boxData.Price * boxData.Discount)

            if vRP.PaymentGemstone(user_id, price) then
                local totalChance = 0
                for _, reward in pairs(boxData.Rewards) do
                    local adjustedChance = reward.Chance
                    if reward.Amount >= 2000 then
                        adjustedChance = math.floor(reward.Chance * 0.1)
                    elseif reward.Amount >= 1500 then
                        adjustedChance = math.floor(reward.Chance * 0.2)
                    elseif reward.Amount >= 1250 then
                        adjustedChance = math.floor(reward.Chance * 0.3)
                    elseif reward.Amount >= 1000 then
                        adjustedChance = math.floor(reward.Chance * 0.5)
                    end

                    totalChance = totalChance + adjustedChance
                    reward.AdjustedChance = adjustedChance
                end

                local random = math.random(totalChance)
                local currentChance = 0

                for _, reward in pairs(boxData.Rewards) do
                    currentChance = currentChance + reward.AdjustedChance
                    if random <= currentChance then
                        vRP.GenerateItem(user_id, reward.Item, reward.Amount, false)
                        Citizen.SetTimeout(6000, function()
                            TriggerClientEvent("pause:Notify", source, "Sucesso","Você recebeu " .. reward.Amount .. "x " .. reward.Name, "verde")
                        end)

                        return reward.Id
                    end
                end
            else
                TriggerClientEvent("pause:Notify", source, "Gemas insuficientes", "Você não possui gemas suficientes","vermelho")
                return false
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Marketplace()
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local result = vRP.Query('pause_marketplace_itens/getItems')
        marketplaceList = {}
        for _, item in ipairs(result) do
            table.insert(marketplaceList, {
                Amount = item.Amount,
                Id = item.id,
                Key = item.Key,
                Name = vRP.itemNameList(item.Name),
                Price = item.Price
            })
        end
        return marketplaceList
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEINVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.MarketplaceInventory(Mode)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local inventory = {}
        local inv = vRP.Inventory(user_id)
        for k, v in pairs(inv) do
            if v["item"] then
                local item = {
                    Amount = v["amount"],
                    Item = v["item"],
                    Key = v["item"],
                    Name = vRP.itemNameList(v["item"]),
                }

                table.insert(inventory, item)
            end
        end
        return inventory
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACELIST
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.MarketplaceList(Mode)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local result = vRP.Query('pause_marketplace_itens/getItems')
        local playerItems = {}
        for _, item in ipairs(result) do
            if tonumber(item.owner_id) == tonumber(user_id) then
                table.insert(playerItems, {
                    Id = item.id,
                    Name = vRP.itemNameList(item.Name),
                    Key = item.Key,
                    Price = item.Price,
                    Amount = item.Amount
                })
            end
        end
        if #playerItems > 0 then
            return playerItems
        else
            return false
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEANNOUNCE
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.MarketplaceAnnounce(data)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        if vRP.TakeItem(user_id, data["Item"], data["Amount"]) then
            local id = 1
            for k,v in ipairs(marketplaceList) do
                id = v.Id + 1
            end
            local name = data["Item"] 
            local key = data["Item"]  
            local price = data["Price"]
            local amount = data["Amount"]
            vRP.Query('pause_marketplace_itens/insertItem', {
                ['@id'] = id,
                ['@Name'] = name,
                ['@Key'] = key,
                ['@Price'] = price,
                ['@Amount'] = amount,
                ['@owner_id'] = user_id
            })
            marketplaceList[id] = {
                Id = id,
                user_id = user_id,
                Item = data["Item"],
                Amount = data["Amount"],
                Price = data["Price"]
            }
            TriggerClientEvent("pause:Notify", source, "Item anunciado com sucesso.")
            return true
        else
            TriggerClientEvent("pause:Notify", source, "Você não tem esse item em quantidade suficiente.","Verifique o inventario")
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEBUY
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.MarketplaceBuy(id)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local item = vRP.Query("pause_marketplace_itens/getItem", { id = id })
        if item[1] then
            if tostring(item[1].owner_id) == tostring(user_id) then
                TriggerClientEvent("pause:Notify", source, "Você não pode comprar seu próprio item.","Verifique o item antes de comprar.")
                return false
            end
            if vRP.PaymentFull(user_id, item[1].Price) then
                vRP.GiveBank(item[1].owner_id, item[1].Price)
                vRP.GiveItem(user_id, item[1].Name, item[1].Amount)
                vRP.Query("pause_marketplace_itens/deleteItem", { id = id })
                TriggerClientEvent("pause:Notify", source,"Compra realizada com sucesso.","Verifique seu Inventario","verde")
                local seller = vRP.Source(item[1].owner_id)
                if seller then
                    TriggerClientEvent("Notify", seller, "Sucesso", "Seu item foi vendido por $" .. item[1].Price .. ".", 5000)
                end
                return true
            else
                TriggerClientEvent("pause:Notify", source, "Dinheiro insuficiente.","Verifique seu banco ou inventario.")
                return false
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACECANCEL
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.MarketplaceCancel(id)
    local source = source
    local user_id = vRP.Passport(source)
    if user_id then
        local item = vRP.Query("pause_marketplace_itens/getItem",{ id = id })
        if item[1] then
            vRP.GiveItem(user_id, item[1].Name, item[1].Amount)
            vRP.Query("pause_marketplace_itens/deleteItem",{ id = id })
            TriggerClientEvent("pause:Notify",source,"Item cancelado com sucesso.","Verifique o seu Inventorio.")
            return true
        end
    end
    return false
end

CreateThread(function ()
    while true do
        for Passport,OtherSource in pairs(vRP.Players()) do
            if Battlepass[Passport] then
                exports["pause"]:AddPoints(OtherSource, 5)
            end
        end
        Wait(1000 * 60 * 3)
    end
end)

return Creative