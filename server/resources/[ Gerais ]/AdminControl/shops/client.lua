local Shops = GlobalState['AllShops'] or {}

AddStateBagChangeHandler("AllShops","",function (_,_,value)
    Shops = value
end)

local AllItems = {}
CreateThread(function ()
    if GlobalState['Inventory'] == "ox_inventory" then
        while GetResourceState("ox_inventory") ~= "started" do
            Wait(1000)
        end
        Wait(500)
        AllItems = exports.ox_inventory:Items()
    else
        AllItems = GlobalState["RebornConfig"].items
    end
end)

local newShop = {
    name = nil,
    locations = {},
    items = {},
    group = {}
}

local function setShopName(args)
    local key = nil
    if args and args.key then
        key = args.key
    end
    local shop = {}
    if key then
        shop = Shops[key] or newShop
    else
        table.clone(newShop, shop)
    end
    local input = lib.inputDialog("Nome da loja", {{
        type = 'input',
        label = "Nome da loja",
        placeholder = "Ammunation",
        default = shop.name and tostring(shop.name) or "",
        required = true
    }})
    if input then
        shop.name = input[1]
        if not key then
            key = #Shops + 1
            Shops[key] = shop
        end
        Shops[key] = shop
    end
    args.callback(key)
end

local function setShopGroup(args)
    local key = args.key
    local shop = Shops[key] or newShop
    local input = lib.inputDialog("Defina o grupo", {{
        type = 'multi-select',
        label = "Defina o grupo",
        options = ServerControl.getGroups(),
        default = tostring(shop.group) or "",
        required = true,
        searchable = true
    }})
    if input then
        local Groups = {}
        local SelectedGroups = input[1] or {}
        if type(SelectedGroups) == "table" then
            for _,ndata in pairs(SelectedGroups) do
                local Perms = json.decode(ndata)
                for group,grade in pairs(Perms) do
                    Groups[group] = tonumber(grade)
                end
            end
        end
        shop.group = Groups
        Shops[key] = shop
    end
    args.callback(key)
end

function GetItems()
    local items = {}
    for k, v in pairs(AllItems) do
        items[#items + 1] = {
            value = k,
            label = string.format('%s (%s)', v.label or v.name, k)
        }
    end
    return items
end

local function setItem(args)
    local shop = Shops[args.shopKey] or newShop
    local input = lib.inputDialog("Definir itens", {{
        type = 'multi-select',
        label = "Definir itens",
        default = args.itemKey,
        options = GetItems(),
        required = true,
        searchable = true,
        clearable = true
    }}) or {}
    if input then
        if type(input[1]) == "table" then
            for k,item in pairs(input[1]) do
                if shop.items[args.itemKey] then
                    shop.items[args.itemKey] = nil
                end
                shop.items[item] = shop.items[args.itemKey] or 0
            end
        elseif input[1] ~= args.itemKey then
            if shop.items[args.itemKey] then
                shop.items[args.itemKey] = nil
            end
            shop.items[input[1]] = shop.items[args.itemKey] or 0
        end
    end
    args.callback({key = args.shopKey})
end

local function setPrice(args)
    local item = Shops[args.shopKey].items[args.itemKey]
    local input = lib.inputDialog("Definir preço", {{
        type = 'number',
        label = "Definir preço",
        default = item or 0,
        required = true
    }})
    if input then
        Shops[args.shopKey].items[args.itemKey] = tonumber(input[1]) or 0
    end
    args.callback({
        shopKey = args.shopKey,
        itemKey = args.itemKey
    })
end

local function deleteItem(args)
    local alert = lib.alertDialog({
        header = 'Deletar Item?',
        content = 'Tem certeza que deseja deletar o item: \n'..AllItems[args.itemKey].label or AllItems[args.itemKey].name,
        centered = true,
        cancel = true
    })
    if alert == "confirm" then
        Shops[args.shopKey].items[args.itemKey] = nil
        args.callback({ key = args.shopKey })
    else
        args.callbackCancel({ shopKey = args.shopKey, itemKey = args.itemKey })
    end
end

local function itemActionMenu(args)
    local price = Shops[args.shopKey].items[args.itemKey] or 0
    local ctx = {
        id = 'action_item',
        title = AllItems[args.itemKey].label or AllItems[args.itemKey].name,
        menu = 'items_shops',
        options = {{
            title = "Mudar item",
            icon = 'file-pen',
            onSelect = setItem,
            args = {
                shopKey = args.shopKey,
                itemKey = args.itemKey,
                callback = ListItems
            }
        }, {
            title = "Definir preço",
            description = '$'..price,
            icon = 'up-down',
            onSelect = setPrice,
            args = {
                shopKey = args.shopKey,
                itemKey = args.itemKey,
                callback = itemActionMenu
            }
        }, {
            title = "Remover item",
            icon = 'trash',
            onSelect = deleteItem,
            args = {
                shopKey = args.shopKey,
                itemKey = args.itemKey,
                callback = ListItems,
                callbackCancel = itemActionMenu
            }
        }}
    }
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

function ListItems(args)
    local shop = Shops[args.key] or newShop
    local ctx = {
        id = 'items_shops',
        title = "Itens compraveis",
        menu = 'admin_manage_shop',
        description = shop.name,
        options = {{
            title = "Adicionar item",
            icon = 'square-plus',
            arrow = true,
            onSelect = setItem,
            args = {
                shopKey = args.key,
                callback = ListItems
            }
        }}
    }
    for k, v in pairs(shop.items or {}) do
        ctx.options[#ctx.options + 1] = {
            title = k,
            onSelect = itemActionMenu,
            args = {
                itemKey = k,
                shopKey = args.key
            }
        }
    end
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function addPoints(args)
    if Shops[args.key] then
        local coords = GetBlipCoords()
        if coords then
            Shops[args.key].locations[#Shops[args.key].locations + 1] = coords
            lib.notify({
                type = 'success',
                description = 'Local adicionado.'
            })
        end
    end
    args.callback(args)
end

local function changePointLocation(args)
    local location = nil
    local coords = GetBlipCoords()
    if coords then
        location = coords
    end
    if location then
        Shops[args.shopKey].locations[args.pointKey] = location
        lib.notify({
            type = 'success',
            description = "Local atualizado"
        })
    end
    args.callback({
        shopKey = args.shopKey,
        itemKey = args.itemKey,
        pointKey = args.pointKey
    })
end

local function teleportToPoint(args)
    DoScreenFadeOut(500)
    while not IsScreenFadedOut() do
        Wait(10)
    end
    local coords = Shops[args.shopKey].locations[args.pointKey]
    SetEntityCoords(PlayerPedId(),coords.x,coords.y,coords.z,false,false,false,false)
    DoScreenFadeIn(500)
    args.callback({
        shopKey = args.shopKey,
        itemKey = args.itemKey,
        pointKey = args.pointKey
    })
end

local function deletePoint(args)
    local alert = lib.alertDialog({
        header = 'Deletar local?',
        content = 'Tem certeza que deseja deletar o local: \n'..GetLocationFormatted(Shops[args.shopKey].locations[args.pointKey]),
        centered = true,
        cancel = true
    })
    if alert == "confirm" then
        Shops[args.shopKey].locations[args.pointKey] = nil
        args.callback({
            shopKey = args.shopKey,
            itemKey = args.itemKey
        })
    end
end

local function pointMenu(args)
    local ctx = {
        id = 'point_item',
        menu = 'list_points',
        title = GetLocationFormatted(Shops[args.shopKey].locations[args.pointKey]),
        options = {{
            title = "Mudar localização",
            icon = 'location-dot',
            onSelect = changePointLocation,
            args = {
                shopKey = args.shopKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                callback = pointMenu
            }
        }, {
            title = "Teleportar ao local",
            icon = 'location-dot',
            onSelect = teleportToPoint,
            args = {
                shopKey = args.shopKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                callback = pointMenu
            }
        }, {
            title = "Deletar local",
            icon = 'trash',
            onSelect = deletePoint,
            args = {
                shopKey = args.shopKey,
                key = args.shopKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                callback = listPoints
            }
        }}
    }
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

function GetLocation(coords)
    local streetName, crossingRoad = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
    return GetStreetNameFromHashKey(streetName)
end

function GetLocationFormatted(location, key)
    if key then
        return string.format('[%02d] - %s', key, GetLocation(location))
    else
        return GetLocation(location)
    end
end

function listPoints(args)
    local shop = Shops[args.key] or newShop
    local ctx = {
        id = 'list_points',
        menu = 'admin_manage_shop',
        title = "Localizações",
        options = {{
            title = "Adicionar local",
            icon = 'square-plus',
            onSelect = addPoints,
            args = {
                key = args.key,
                callback = listPoints
            }
        }}
    }
    for k, v in pairs(shop.locations) do
        ctx.options[#ctx.options + 1] = {
            title = GetLocationFormatted(v, k),
            description = string.format('X: %.2f, Y: %.2f, Z: %.2f', v.x, v.y, v.z),
            icon = 'map-pin',
            arrow = true,
            onSelect = pointMenu,
            args = {
                shopKey = args.key,
                pointKey = k,
                name = GetLocationFormatted(v, k)
            }
        }
    end
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function saveShop(args)
    ServerControl.registerShop(args.key, Shops[args.key])
    args.callback(args.key)
end

local function deleteShop(args)
    if Shops[args.key] then
        local alert = lib.alertDialog({
            header = 'Deletar loja?',
            content = 'Tem certeza que deseja deletar toda a loja: \n'..Shops[args.key].name,
            centered = true,
            cancel = true
        })
        if alert == "confirm" then
            Shops[args.key] = nil
            ServerControl.deleteShop(args.key)
            return lib.hideContext()
        end
    end
    args.callbackCancel(args.key)
end

local function manageShop(key)
    if not key then
        key = #Shops + 1
    end
    local data = key and Shops[key] or newShop
    local ctx = {
        id = 'admin_manage_shop',
        description = "",
        title = data.name or "Criação de loja",
        menu = 'admin_shops_list',
        options = {
        {
            title = "Nome da loja",
            icon = 'file-pen',
            onSelect = setShopName,
            description = data.name or "",
            args = {
                key = key,
                callback = manageShop
            }
        }, {
            title = "Grupo",
            icon = 'users',
            onSelect = setShopGroup,
            args = {
                key = key,
                callback = manageShop
            }
        }, {
            title = "Itens",
            icon = 'rectangle-list',
            arrow = true,
            onSelect = ListItems,
            args = {
                key = key
            }
        }, {
            title = "Localizações",
            icon = 'location-crosshairs',
            arrow = true,
            onSelect = listPoints,
            args = {
                key = key,
            }
        },{
            title = "Salvar configurações",
            icon = 'floppy-disk',
            iconAnimation = Config.IconAnimation,
            onSelect = saveShop,
            args = {
                key = key,
                callback = function()
                    lib.hideContext()
                end
            }
        }, {
            title = "Deletar loja",
            icon = 'trash',
            onSelect = deleteShop,
            args = {
                key = key,
                callback = manageShop,
                callbackCancel = manageShop
            }
        }}
    }
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function listShops()
    local options = {}
    for k,v in pairs(Shops) do
        table.insert(options,{
            title = v.name,
            onSelect = function()
                manageShop(k)
            end
        })
    end
    lib.registerContext({
        id = 'admin_shops_list',
        title = 'Lista de Lojas',
        menu = 'admin_shops_control',
        options = options
    })
    lib.showContext('admin_shops_list')
end

RegisterNetEvent("AdminControl:openShops")
AddEventHandler("AdminControl:openShops",function()
    lib.registerContext({
        id = 'admin_shops_control',
        title = 'Controle das Lojas',
        options = {
            {
                title = 'Registrar Loja',
                description = 'Registrar uma nova loja',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = manageShop
            },
            {
                title = "Listar Lojas",
                description = "Listar todos as lojas registrados",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listShops
            }
        }
    })
    lib.showContext('admin_shops_control')
end)

CreateThread(function()
	while true do
		local timeDistance = 500
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
		for k,shop in pairs(Shops) do
            if shop.locations then
                for i, shopCoords in pairs(shop.locations) do
                    local distance = #(coords - vector3(shopCoords.x,shopCoords.y,shopCoords.z))
                    if distance <= 5.0 then
                        timeDistance = 4
                        DrawMarker(23, shopCoords.x,shopCoords.y,shopCoords.z - 0.97, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 1.5, 1.5, 50, 50, 150, 200, false, false, 0, false, false, false, false)
                        DrawText3D(shopCoords.x,shopCoords.y,shopCoords.z,"~g~[E]~w~ para abrir "..shop.name)
                        if distance <= 2 and IsControlJustPressed(0,38) then
                            exports.ox_inventory:openInventory('shop', { type = shop.name, id = i })
                        end
                    end
                end
            end
		end
		Wait(timeDistance)
	end
end)

function DrawText3D(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,150)
	SetTextEntry("STRING")
	SetTextCentre(true)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text)) / 400
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
end