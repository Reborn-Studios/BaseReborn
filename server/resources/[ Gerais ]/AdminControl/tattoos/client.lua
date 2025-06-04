local TattoosShops = GlobalState['TattoosShops']

AddStateBagChangeHandler("TattoosShops","",function (_,_,value)
    TattoosShops = value
end)

local function createTattooShop()
    local groups = ServerControl.getGroups()
    if groups then
        local input = lib.inputDialog('Registro de loja de tatuagem', {
            { type = 'input', label = 'Nome', description = 'Nome da loja', required = true },
            { type = 'checkbox', label = 'Mostrar blip mapa', icon = "map" },
        })
        if input then
            local data = {}
            data.label = input[1]
            data.showBlip = input[2]
            local coords = GetBlipCoords()
            if coords then
                data.coords = coords
                ServerControl.registerTattooShop(data)
            end
        end
    end
end

local function manageTattooShop(index)
    local tattooShop = TattoosShops[index]
    if tattooShop then
        lib.registerContext({
            id = 'admin_manage_tattooshop',
            title = 'Gerenciar Loja de Tatuagem',
            menu = 'admin_tattoos_list',
            options = {
                {
                    title = "Teleportar até o local",
                    description = "Teleportar até o local da loja",
                    icon = 'fa-solid fa-location-dot',
                    iconColor = 'blue',
                    onSelect = function()
                        DoScreenFadeOut(500)
                        while not IsScreenFadedOut() do
                            Wait(10)
                        end
                        SetEntityCoords(PlayerPedId(),tattooShop.coords.x,tattooShop.coords.y,tattooShop.coords.z)
                        DoScreenFadeIn(500)
                    end
                },
                {
                    title = "Deletar Loja de Tatuagem",
                    description = "Deletar "..tattooShop.label,
                    icon = 'fa-solid fa-trash',
                    iconColor = 'red',
                    onSelect = function()
                        ServerControl.deleteTattooShop(index)
                    end
                },
            }
        })
        lib.showContext('admin_manage_tattooshop')
    end
end

local function listTattooShops()
    local options = {}
    for k,v in pairs(TattoosShops) do
        table.insert(options,{
            title = v.label,
            onSelect = function()
                manageTattooShop(k)
            end
        })
    end
    lib.registerContext({
        id = 'admin_tattoos_list',
        title = 'Lista de Lojas de Tatuagem',
        menu = 'admin_tattoos_control',
        options = options
    })
    lib.showContext('admin_tattoos_list')
end

RegisterNetEvent("AdminControl:openTattoosShop")
AddEventHandler("AdminControl:openTattoosShop",function()
    lib.registerContext({
        id = 'admin_tattoos_control',
        title = 'Controle das Lojas de Tatuagem',
        options = {
            {
                title = 'Registrar Loja de Tatuagem',
                description = 'Registrar um novo local',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = createTattooShop
            },
            {
                title = "Listar Lojas de Tatuagem",
                description = "Listar todos as lojas",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listTattooShops
            }
        }
    })
    lib.showContext('admin_tattoos_control')
end)
