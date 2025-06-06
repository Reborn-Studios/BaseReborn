local NewItems = GlobalState["NewItems"] or {}

CreateThread(function()
    Wait(1000)
    for k,v in pairs(NewItems) do
        exports['ox_inventory']:createItem({
            name = k,
            label = v.name,
            weight = v.weight * 1000,
            description = v.description,
            close = true,
            client = {
                image = v.index..".png"
            }
        })
    end
    TriggerEvent("ox_inventory:reloadItems")
end)

AddStateBagChangeHandler("NewItems","",function (_,_,value)
    for k,v in pairs(value) do
        if not NewItems[k] then
            exports['ox_inventory']:createItem({
                name = k,
                label = v.name,
                weight = v.weight * 1000,
                description = v.description,
                close = true,
                client = {
                    image = v.index..".png"
                }
            })
        end
    end
    for k,v in pairs(NewItems) do
        if not value[k] then
            exports['ox_inventory']:deleteItem(k)
        end
    end
    NewItems = value
    TriggerEvent("ox_inventory:reloadItems")
end)

local function createNewItem()
    local input = lib.inputDialog("Criar novo item",{
        {type = "input", label = "Item", required = true},
        {type = "input", label = "Nome do item"},
        {type = "input", label = "Index", description = "Utilizado para imagem"},
        {type = "input", label = "Tipo", default = "use", description = "Tipo do item"},
        {type = "textarea", label = "Descrição", description = "Descrição do item (opcional)"},
        {type = "number", label = "Peso", default = 0.5 ,description = "Peso do item"}
    })
    if input and input[1] then
        local data = {
            item = input[1],
            name = input[2],
            index = input[3] or input[1],
            type = input[4] or "use",
            description = input[5] or nil,
            weight = input[6] or 0.5
        }
        TriggerServerEvent("AdminControl:createNewItem",data)
    end
end

local function editItem(item)
    local data = NewItems[item]
    local input = lib.inputDialog("Editar item",{
        {type = "input", label = "Item", default = item, disabled = true},
        {type = "input", label = "Nome do item", default = data.name},
        {type = "input", label = "Index", description = "Utilizado para imagem", default = data.index},
        {type = "input", label = "Tipo", default = data.type, description = "Tipo do item"},
        {type = "textarea", label = "Descrição", description = "Descrição do item (opcional)", default = data.description},
        {type = "number", label = "Peso", default = data.weight ,description = "Peso do item"}
    })
    if input and input[1] then
        TriggerServerEvent("AdminControl:editNewItem",{
            item = item,
            name = input[2],
            index = input[3] ~= "" and input[3] or input[1],
            type = input[4] or "use",
            description = input[5] or nil,
            weight = input[6] or 0.5
        })
    end
end

local function listItems()
    local options = {}
    for k,v in pairs(NewItems) do
        table.insert(options,{
            title = k,
            description = "Item: "..v.name.."\nTipo: "..v.type.."\nDescrição: "..v.description,
            icon = "box",
            iconColor = "blue",
            onSelect = function ()
                lib.registerContext({
                    id = 'admin_items_manage',
                    title = 'Controle dos Itens',
                    menu = 'admin_items_list',
                    onBack = function()
                        lib.showContext('admin_items_list')
                    end,
                    options = {
                        {
                            title = 'Editar item',
                            description = 'Editar item',
                            icon = 'toolbox',
                            iconColor = 'green',
                            onSelect = function ()
                                editItem(k)
                            end
                        },
                        {
                            title = "Deletar item",
                            description = "Deletar item",
                            icon = 'trash',
                            iconColor = 'red',
                            onSelect = function ()
                                TriggerServerEvent("AdminControl:deleteNewItem",k)
                            end
                        }
                    }
                })
                lib.showContext('admin_items_manage')
            end
        })
    end
    lib.registerContext({
        id = 'admin_items_list',
        title = 'Controle dos Itens',
        menu = 'admin_items_control',
        onBack = function()
            lib.showContext('admin_items_control')
        end,
        options = options
    })
    lib.showContext('admin_items_list')
end

RegisterNetEvent("AdminControl:openNewItems")
AddEventHandler("AdminControl:openNewItems",function()
    lib.registerContext({
        id = 'admin_items_control',
        title = 'Controle dos Itens',
        options = {
            {
                title = 'Criar novo item',
                description = 'Criar item',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = createNewItem
            },
            {
                title = "Listar Itens",
                description = "Listar todos os itens criados",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listItems
            }
        }
    })
    lib.showContext('admin_items_control')
end)