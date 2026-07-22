local BatePontos = GlobalState["BatePontoLocations"] or {}

AddStateBagChangeHandler("BatePontoLocations", "", function(_, _, value)
    BatePontos = value or {}
end)

local function getBatePontoInput(title, current)
    local input = lib.inputDialog(title, {
        { type = "input", label = "Nome", description = "Nome do local", required = true, default = current and current.name or nil },
        { type = "input", label = "Webhook", description = "Webhook de logs", default = current and current.webhook or nil },
        { type = "select", label = "Animacao", description = "Animacao ao usar o bate-ponto", default = current and (current.anim or "Tablet") or "Tablet", options = {
            { label = "Tablet", value = "Tablet" },
            { label = "Animacao parada", value = "Anim" },
            { label = "Sem animacao", value = "None" },
        } },
    })
    if input then
        return {
            name = input[1],
            webhook = input[2] or "",
            anim = input[3] == "None" and nil or input[3],
        }
    end
end

local function createBatePonto(groupName)
    local data = getBatePontoInput("Registro de bate-ponto")
    if not data then
        return
    end

    lib.showTextUI("Posicione o blip para registrar o local")
    local coords = GetBlipCoords()
    lib.hideTextUI()

    if coords then
        data.coords = coords
        ServerControl.registerBatePonto(groupName,data)
    end
end

local function editBatePonto(groupName,index)
    local batePonto = BatePontos[groupName] and BatePontos[groupName][index]
    if not batePonto then
        return
    end

    local data = getBatePontoInput("Edicao de bate-ponto", batePonto)
    if not data then
        return
    end

    data.coords = batePonto.coords
    ServerControl.updateBatePonto(groupName, index, data)
end

local function deleteBatePonto(groupName,index)
    local batePonto = BatePontos[groupName] and BatePontos[groupName][index]
    if not batePonto then
        return
    end

    local alert = lib.alertDialog({
        header = "Deletar bate-ponto?",
        content = "Tem certeza que deseja deletar o local:\n" .. batePonto.name,
        centered = true,
        cancel = true
    })

    if alert == "confirm" then
        ServerControl.deleteBatePonto(groupName,index)
    end
end

local function manageBatePonto(groupName,index)
    local batePonto = BatePontos[groupName]
    if not batePonto or not batePonto[index] then
        return
    end

    lib.registerContext({
        id = "admin_bateponto_manage",
        title = "Gerenciar Bate-ponto",
        menu = "admin_bateponto_list",
        options = {
            {
                title = "Editar dados",
                description = "Alterar nome, permissoes, webhook e animacao",
                icon = "fa-solid fa-pen-to-square",
                onSelect = function()
                    editBatePonto(groupName,index)
                end
            },
            {
                title = "Editar local",
                description = "Alterar a coordenada do bate-ponto",
                icon = "fa-solid fa-location-dot",
                onSelect = function()
                    lib.showTextUI("Posicione o blip para atualizar o local")
                    local coords = GetBlipCoords()
                    lib.hideTextUI()

                    if coords then
                        batePonto[index].coords = coords
                        ServerControl.updateBatePonto(groupName, index, batePonto[index])
                    end
                end
            },
            {
                title = "Teleportar ate o local",
                description = "Ir ate a coordenada registrada",
                icon = "fa-solid fa-map-location-dot",
                onSelect = function()
                    DoScreenFadeOut(500)
                    while not IsScreenFadedOut() do
                        Wait(10)
                    end
                    SetEntityCoords(PlayerPedId(), batePonto[index].coords.x, batePonto[index].coords.y, batePonto[index].coords.z)
                    DoScreenFadeIn(500)
                end
            },
            {
                title = "Deletar local",
                description = "Remover o bate-ponto registrado",
                icon = "fa-solid fa-trash",
                onSelect = function()
                    deleteBatePonto(groupName,index)
                end
            }
        }
    })

    lib.showContext("admin_bateponto_manage")
end

local function listBatePontos(groupName)
    local options = {
        {
            title = "Criar novo local",
            description = "Registrar um novo bate-ponto",
            icon = "fa-solid fa-plus",
            onSelect = function()
                createBatePonto(groupName)
            end
        }
    }
    if BatePontos[groupName] then
        for index, batePonto in ipairs(BatePontos[groupName]) do
            table.insert(options, {
                title = batePonto.name,
                description = string.format("Coords: (%.1f, %.1f, %.1f)", batePonto.coords.x, batePonto.coords.y, batePonto.coords.z),
                icon = "fa-solid fa-clipboard-user",
                onSelect = function()
                    manageBatePonto(groupName,index)
                end
            })
        end

        table.sort(options, function(a, b)
            return a.title < b.title
        end)
    end

    lib.registerContext({
        id = "admin_bateponto_list",
        title = "Locais de Bate-ponto",
        menu = "admin_bateponto_control",
        options = options
    })
    lib.showContext("admin_bateponto_list")
end

function Client.showBatePontos(services)
    local options = {}
    if services and #services > 0 then
        for _, service in pairs(services) do
            table.insert(options, {
                title = service.label,
                description = service.name,
                icon = "fa-solid fa-circle-info",
                onSelect = function()
                    listBatePontos(service.name)
                end
            })
        end
    end
    table.sort(options, function(a, b)
        return a.title < b.title
    end)
    lib.registerContext({
        id = "admin_bateponto_control",
        title = "Controle de Bate-ponto",
        menu = "admin_menu_control",
        options = options
    })
    lib.showContext("admin_bateponto_control")
end
