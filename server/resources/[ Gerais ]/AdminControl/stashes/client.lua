local stashes = GlobalState['AllStashes']

AddStateBagChangeHandler("AllStashes","",function (_,_,value)
    stashes = value
end)

local function createStash()
    local groups = ServerControl.getGroups()
    if groups then
        local input = lib.inputDialog('Registro de bau', {
            { type = 'input', label = 'Nome', description = 'Nome do bau', required = true },
            { type = 'number', label = 'Slots', description = 'Numero de slots do bau' },
            { type = 'number', label = 'Peso', description = 'Peso do bau (Em gramas)', placeholder = "50000",  },
            { type = 'checkbox', label = 'Bau unico', description = 'Bau pessoal onde os itens sao particulares' },
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, searchable = true },
            { type = 'input', label = 'Webhook', description = 'Controle de logs' },
        })
        if input then
            local Groups = {}
            local SelectedGroups = input[5] or {}
            if type(SelectedGroups) == "table" then
                for _,ndata in pairs(SelectedGroups) do
                    local Perms = json.decode(ndata)
                    for group,grade in pairs(Perms) do
                        Groups[group] = tonumber(grade)
                    end
                end
            end
            local data = {}
            data.label = input[1]
            data.slots = input[2] or Config.DefaultStash.slots
            data.weight = input[3] or Config.DefaultStash.weight
            data.owner = input[4]
            data.webhook = input[6]
            if next(Groups) then
                data.groups = Groups
            end
            local coords = GetBlipCoords()
            if coords then
                data.coords = coords
                ServerControl.registerStash(data)
            end
        end
    end
end

local function editStash(index)
    local Stash = stashes[index]
    if Stash then
        local input = lib.inputDialog('Ediçao do bau', {
            { type = 'input', label = 'Nome', description = 'Nome do bau', default = tostring(Stash.label), required = true },
            { type = 'number', label = 'Slots', description = 'Numero de slots do bau', default = tonumber(Stash.slots) },
            { type = 'number', label = 'Peso', description = 'Peso do bau (Em gramas)', placeholder = "50000", default = tonumber(Stash.weight) },
            { type = 'input', label = 'Webhook', description = 'Controle de logs' },
        })
        if input then
            Stash.label = input[1] or Stash.label
            Stash.slots = input[2] or Stash.slots
            Stash.weight = input[3] or Stash.weight
            Stash.webhook = input[4] or ""
            ServerControl.editStash(index,Stash)
        end
    end
end

local function manageStash(index)
    local Stash = stashes[index]
    if Stash then
        lib.registerContext({
            id = 'admin_manage_stashe',
            title = 'Gerenciar Bau',
            menu = 'admin_stashes_list',
            options = {
                {
                    title = "Editar Bau",
                    description = "Editar nome, slots e peso",
                    icon = 'fa-solid fa-pen-to-square',
                    iconColor = 'yellow',
                    onSelect = function()
                        editStash(index)
                    end
                },
                {
                    title = "Editar local do bau",
                    description = "Alterar local do bau",
                    icon = 'fa-solid fa-location-dot',
                    iconColor = 'green',
                    onSelect = function()
                        local coords = GetBlipCoords()
                        if coords then
                            Stash.coords = coords
                            ServerControl.editStash(index,Stash)
                        end
                    end
                },
                {
                    title = "Teleportar até bau",
                    description = "Teleportar até o local do bau",
                    icon = 'fa-solid fa-location-dot',
                    iconColor = 'blue',
                    onSelect = function()
                        DoScreenFadeOut(500)
                        while not IsScreenFadedOut() do
                            Wait(10)
                        end
                        SetEntityCoords(PlayerPedId(),Stash.coords.x,Stash.coords.y,Stash.coords.z)
                        DoScreenFadeIn(500)
                    end
                },
                {
                    title = "Deletar Bau",
                    description = "Deletar bau "..Stash.label,
                    icon = 'fa-solid fa-trash',
                    iconColor = 'red',
                    onSelect = function()
                        ServerControl.deleteStash(index)
                    end
                },
            }
        })
        lib.showContext('admin_manage_stashe')
    end
end

local function listStashes()
    local options = {}
    for k,v in pairs(stashes) do
        table.insert(options,{
            title = v.label,
            description = "Slots: "..v.slots.." | Peso: "..v.weight.."g",
            onSelect = function()
                manageStash(k)
            end
        })
    end
    lib.registerContext({
        id = 'admin_stashes_list',
        title = 'Lista de Baus',
        menu = 'admin_stashes_control',
        options = options
    })
    lib.showContext('admin_stashes_list')
end

RegisterNetEvent("AdminControl:openStashes")
AddEventHandler("AdminControl:openStashes",function()
    lib.registerContext({
        id = 'admin_stashes_control',
        title = 'Controle dos Baus',
        options = {
            {
                title = 'Registrar Bau',
                description = 'Registrar um novo bau',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = createStash
            },
            {
                title = "Listar Baus",
                description = "Listar todos os baus registrados",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listStashes
            }
        }
    })
    lib.showContext('admin_stashes_control')
end)

CreateThread(function()
	while true do
		local timeDistance = 500
        local ped = PlayerPedId()
        local coords = GetEntityCoords(ped)
		for k,stash in pairs(stashes) do
            local distance = #(coords - vector3(stash.coords.x,stash.coords.y,stash.coords.z))
			if distance <= 10.0 then
				timeDistance = 4
                DrawBase3D(stash.coords.x,stash.coords.y,stash.coords.z,"chest")
                if distance <= 2 and IsControlJustPressed(0,38) then
                    exports.ox_inventory:openInventory('stash', stash.id)
                end
			end
		end
		Wait(timeDistance)
	end
end)
