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
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups },
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
            data.webhook = input[5]
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
        lib.registerMenu({
            id = 'manage_stashe',
            title = 'Gerenciar Bau',
            position = 'bottom-right',
            options = {
                { label = 'Deletar Bau', description = 'Deletar bau '..Stash.label },
                { label = 'Gerenciar Bau', description = 'Alterar nome, slots e peso.' },
                { label = 'Local do Bau', description = 'Alterar local do bau!' },
            }
        },
        function(selected, scrollIndex, args)
            if selected == 1 then
                ServerControl.deleteStash(index)
            elseif selected == 2 then
                editStash(index)
            elseif selected == 3 then
                local coords = GetBlipCoords()
                if coords then
                    Stash.coords = coords
                    ServerControl.editStash(index,Stash)
                end
            end
        end)
        lib.showMenu('manage_stashe')
    end
end

RegisterNetEvent("AdminControl:openStashes")
AddEventHandler("AdminControl:openStashes",function()
    lib.registerMenu({
    id = 'admin_stashes_control',
    title = 'Controle dos Baus',
    position = 'bottom-right',
    options = {
        { label = 'Criar Bau', description = 'Crie um novo bau!' },
        { label = 'Baus criados', values = stashes, description = 'Gerenciar baus criados!' },
    }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            createStash()
        elseif selected == 2 then
            manageStash(scrollIndex)
        end
    end)
    lib.showMenu('admin_stashes_control')
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
                DrawMarker(2, stash.coords.x,stash.coords.y,stash.coords.z-0.5, 0, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 255, 255, 255, 180, false, true, 2, true) -- seta
	            DrawMarker(25, stash.coords.x,stash.coords.y,stash.coords.z-1.00, 0, 0, 0, 0, 0, 0, 0.9, 0.9, 0.5, 255, 255, 255, 180, false, true, 2, true) -- baixo
	            DrawMarker(25, stash.coords.x,stash.coords.y,stash.coords.z-1.00, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 0.5, 19, 126, 138, 280, false, true, 2, true) -- baixo contorno azul
                if distance <= 2 and IsControlJustPressed(0,38) then
                    exports.ox_inventory:openInventory('stash', stash.id)
                end
			end
		end
		Wait(timeDistance)
	end
end)
