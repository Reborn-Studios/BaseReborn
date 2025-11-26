local houses = GlobalState['Houses']

AddStateBagChangeHandler("Houses","",function (_,_,value)
    houses = value
end)

local houseOptions = {
    { value = "apartment1", label = "Apartamento 1" },
    { value = "apartment2", label = "Apartamento 2" },
    { value = "apartment3", label = "Apartamento 3" },
    { value = "apartment4", label = "Apartamento 4" },
    { value = "apartment5", label = "Apartamento 5" },
}

local interiorOptions = {
    { value = "modern", label = "Modern" },
    { value = "moody", label = "Moody" },
    { value = "vibrant", label = "Vibrant" },
    { value = "sharp", label = "Sharp" },
    { value = "monochrome", label = "Monochrome" },
    { value = "seductive", label = "Seductive" },
    { value = "regal", label = "Regal" },
    { value = "aqua", label = "Aqua" },
}

local function createHouse()
    local aparts = exports['will_homes']:Apartments()
    local input = lib.inputDialog('Registro de casa', {
        { type = 'input', label = 'Nome', description = 'Nome da casa', required = true },
        { type = 'number', label = 'Preço', description = 'Preço da casa', placeholder = "500000", required = true },
        { type = 'select', label = 'Tema da casa', description = "Selecione o tema da casa", options = houseOptions, searchable = true, required = true },
        { type = 'slider', min = 1, max = 5, label = 'Estrelas', description = 'Estrelas da casa', default = 3 },
    })
    if input and input[1] and input[2] then
        local theme = input[3]
        if theme == "apartment3" then
            local input2 = lib.inputDialog('Selecionar tema interior', {
                { type = 'select', label = 'Interior da casa', description = "Selecione o tema do interior", options = interiorOptions, searchable = true, default = "modern" },
            })
            if input2 and input2[1] then
                theme = input2[1]
            end
        end
        TriggerEvent("Notify","aviso","Para criar garagem para essa casa, crie com o mesmo nome dessa casa",7000)
        local coords = GetBlipCoords()
        local data = {
            name = input[1],
            price = input[2],
            coords = {
                house_in = coords,
                house_out = aparts[input[3]].out,
                manage = aparts[input[3]].manage,
                chest = aparts[input[3]].chest,
            },
            owner = 0,
            friends = {},
            stars = input[4],
            theme = theme,
            garage = false,
            extends = {},
        }
        ServerControl.createHouse(data)
    end
end

local function manageHouse(index)
    local House = houses[index]
    if House then
        lib.registerContext({
            id = 'admin_manage_house',
            title = 'Gerenciar Casa',
            menu = 'admin_houses_list',
            options = {
                {
                    title = "Teleportar até casa",
                    description = "Teleportar até o local da casa",
                    icon = 'fa-solid fa-location-dot',
                    iconColor = 'blue',
                    onSelect = function()
                        DoScreenFadeOut(500)
                        while not IsScreenFadedOut() do
                            Wait(10)
                        end
                        SetEntityCoords(PlayerPedId(),House.coords.house_in.x,House.coords.house_in.y,House.coords.house_in.z)
                        DoScreenFadeIn(500)
                    end
                },
                {
                    title = "Deletar Casa",
                    description = "Deletar casa "..House.name,
                    icon = 'fa-solid fa-trash',
                    iconColor = 'red',
                    onSelect = function()
                        ServerControl.deleteHouse(index)
                    end
                },
            }
        })
        lib.showContext('admin_manage_house')
    end
end

local function listHouses()
    local options = {}
    for k,v in pairs(houses) do
        table.insert(options,{
            title = v.name,
            description = "Tema: "..v.theme.." | Preço: "..v.price,
            onSelect = function()
                manageHouse(k)
            end
        })
    end
    lib.registerContext({
        id = 'admin_houses_list',
        title = 'Lista de Casas',
        menu = 'admin_houses_control',
        options = options
    })
    lib.showContext('admin_houses_list')
end

RegisterNetEvent("AdminControl:openHouses")
AddEventHandler("AdminControl:openHouses",function()
    lib.registerContext({
        id = 'admin_houses_control',
        title = 'Controle das Casas',
        options = {
            {
                title = 'Registrar Casa',
                description = 'Registrar uma nova casa no servidor',
                icon = 'fa-solid fa-plus',
                iconColor = 'green',
                onSelect = createHouse
            },
            {
                title = "Listar Casas",
                description = "Listar todos as casas registrados",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listHouses
            }
        }
    })
    lib.showContext('admin_houses_control')
end)
