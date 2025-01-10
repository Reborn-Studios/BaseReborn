local AllSkinshops = {}

local ClothingCategorys = {
    {
        label = "Mochila",
        value = "backpack",
    },
    {
        label = "T-Shirt",
        value = "tshirt",
    },
    {
        label = "Camiseta",
        value = "torso",
    },
    {
        label = "Calça",
        value = "pants",
    },
    {
        label = "Jaqueta",
        value = "vest",
    },
    {
        label = "Sapato",
        value = "shoes",
    },
    {
        label = "Máscara",
        value = "mask",
    },
    {
        label = "Chapéu",
        value = "hat",
    },
    {
        label = "Óculos",
        value = "glass",
    },
    {
        label = "Relógio",
        value = "watch",
    },
    {
        label = "Bracelete",
        value = "bracelet",
    },
    {
        label = "Acessórios",
        value = "accessory",
    },
    {
        label = "Decal",
        value = "decals",
    },
}

function CreateSkinshop()
    local skinshop = {}
    for k,v in pairs(ClothingCategorys) do
        ClothingCategorys[k].type = "checkbox"
        ClothingCategorys[k].checked = true
    end
    local options = {
        { type = 'input', label = 'Nome', description = 'Nome da loja de roupa', required = true },
    }
    for k,v in pairs(ClothingCategorys) do
        table.insert(options,v)
    end
    local input = lib.inputDialog('Registro de loja de roupa', options)
    if input then
        skinshop.name = input[1]
        skinshop.blockedCategories = {}
        for k,bool in pairs(input) do
            if k > 1 then
                if not bool then
                    skinshop.blockedCategories[ClothingCategorys[ k - 1].value] = true
                end
            end
        end
        if not next(skinshop.blockedCategories) then
            skinshop.blockedCategories = nil
        end
        lib.showTextUI('Posicione o blip',{
            position = "right-center",
            icon = 'shirt',
            iconAnimation = "bounce",
            style = {
                borderRadius = 5,
                backgroundColor = '#488dbb',
                color = 'white'
            }
        })
        local blip = GetBlipCoords()
        lib.hideTextUI()
        if blip then
            skinshop.coords = blip
            ServerControl.registerSkinshop(skinshop)
        end
    end
end

local function deleteSkinshop(skinshop)
    local alert = lib.alertDialog({
        header = 'Deletar Loja de Roupa?',
        content = 'Tem certeza que deseja deletar a Loja de Roupa?',
        centered = true,
        cancel = true
    })
    if alert == "confirm" then
        ServerControl.deleteSkinshop(skinshop)
    end
end

local function manageSkinshop(skinshop)
    lib.registerContext({
        id = 'admin_skinshops_control',
        title = 'Controle da Loja de Roupa',
        menu = 'admin_skinshops_edit',
        options = {
            {
                title = 'Deletar Loja de Roupa',
                description = 'Deletar a loja de roupa',
                icon = 'fa-solid fa-trash',
                onSelect = function()
                    deleteSkinshop(skinshop)
                end,
            },
            {
                title = 'Teleportar até local',
                description = 'Ir a loja de roupa',
                icon = 'location-dot',
                onSelect = function()
                    if AllSkinshops[skinshop] and AllSkinshops[skinshop].coords then
                        local coords = AllSkinshops[skinshop].coords
                        DoScreenFadeOut(500)
                        Wait(500)
                        SetEntityCoords(PlayerPedId(),coords.x,coords.y,coords.z)
                        DoScreenFadeIn(500)
                    end
                end,
            },
        }
    })
    lib.showContext('admin_skinshops_control')
end

local function listSkinshop(values)
    local options = {}
    for k,v in pairs(values) do
        options[k] = {
            title = "Gerenciar "..v.label,
            description = "Gerencie a loja de roupa",
            icon = 'fa-solid fa-pen-to-square',
            arrow = true,
            onSelect = function()
                manageSkinshop(v.value)
            end,
        }
    end
    lib.registerContext({
        id = 'admin_skinshops_edit',
        title = 'Editar Loja de Roupa',
        menu = 'admin_skinshops_control',
        options = options
    })
    lib.showContext('admin_skinshops_edit')
end

RegisterNetEvent("AdminControl:openSkinshops")
AddEventHandler("AdminControl:openSkinshops",function(skinshops)
    AllSkinshops = skinshops
    local values = {}
    for k,v in pairs(skinshops) do
        table.insert(values,{
            label = v.name,
            value = k
        })
    end
    lib.registerContext({
        id = 'admin_skinshops_control',
        title = 'Controle das Lojas de Roupas',
        options = {
            {
                title = 'Criar Loja de Roupa',
                description = 'Crie uma nova loja de roupa!',
                icon = 'fa-solid fa-plus',
                onSelect = function()
                    CreateSkinshop()
                end,
            },
            {
                title = 'Listar Lojas de Roupa',
                description = 'Liste todas as lojas de roupa criadas!',
                icon = 'fa-solid fa-list',
                onSelect = function()
                    listSkinshop(values)
                end
            },
        }
    })
    lib.showContext('admin_skinshops_control')
end)
