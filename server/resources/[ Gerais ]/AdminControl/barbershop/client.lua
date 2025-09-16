local BarberShops = GlobalState['BarberShops']

AddStateBagChangeHandler("BarberShops","",function (_,_,value)
    BarberShops = value
end)

local function createBarberShop()
    local groups = ServerControl.getGroups()
    if groups then
        local input = lib.inputDialog('Registro de barbearia', {
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
                ServerControl.registerBarberShop(data)
            end
        end
    end
end

local function manageBarberShop(index)
    local barberShop = BarberShops[index]
    if barberShop then
        lib.registerContext({
            id = 'admin_manage_barbershop',
            title = 'Gerenciar Barbearia',
            menu = 'admin_barber_list',
            options = {
                {
                    title = "Teleportar até o local",
                    description = "Teleportar até o local",
                    icon = 'fa-solid fa-location-dot',
                    iconColor = 'blue',
                    onSelect = function()
                        DoScreenFadeOut(500)
                        while not IsScreenFadedOut() do
                            Wait(10)
                        end
                        SetEntityCoords(PlayerPedId(),barberShop.coords.x,barberShop.coords.y,barberShop.coords.z,false,false,false,false)
                        DoScreenFadeIn(500)
                    end
                },
                {
                    title = "Deletar Barbearia",
                    description = "Deletar "..barberShop.label,
                    icon = 'fa-solid fa-trash',
                    iconColor = 'red',
                    onSelect = function()
                        ServerControl.deleteBarberShop(index)
                    end
                },
            }
        })
        lib.showContext('admin_manage_barbershop')
    end
end

local function listBarberShops()
    local options = {}
    for k,v in pairs(BarberShops) do
        table.insert(options,{
            title = v.label,
            onSelect = function()
                manageBarberShop(k)
            end
        })
    end
    lib.registerContext({
        id = 'admin_barber_list',
        title = 'Lista de Barbearias',
        menu = 'admin_barber_control',
        options = options
    })
    lib.showContext('admin_barber_list')
end

RegisterNetEvent("AdminControl:openBarberShop")
AddEventHandler("AdminControl:openBarberShop",function()
    lib.registerContext({
        id = 'admin_barber_control',
        title = 'Controle das Barbearias',
        options = {
            {
                title = 'Registrar Barbearia',
                description = 'Registrar um novo local',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = createBarberShop
            },
            {
                title = "Listar Barbearias",
                description = "Listar todos as lojas",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listBarberShops
            }
        }
    })
    lib.showContext('admin_barber_control')
end)
