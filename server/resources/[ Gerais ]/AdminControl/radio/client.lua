local AllFreqs = GlobalState["RadioFrequency"]

AddStateBagChangeHandler("RadioFrequency","",function (_,_,value)
    AllFreqs = value
end)

local function createRadioFreq()
    local groups = ServerControl.getGroups()
    if groups then
        local input = lib.inputDialog('Registro de Frequencia', {
            { type = 'input', label = 'Nome', description = 'Nome da Frequencia', required = true },
            { type = 'number', label = 'Frequencia', description = 'Numero da frequencia', required = true },
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, searchable = true },
            { type = 'checkbox', label = 'Desativar Bloqueador de sinal' },
        })
        if input then
            local Groups = {}
            local SelectedGroups = input[3] or {}
            if type(SelectedGroups) == "table" then
                for _,ndata in pairs(SelectedGroups) do
                    local Perms = json.decode(ndata)
                    for group,grade in pairs(Perms) do
                        Groups[group] = true
                    end
                end
            end
            local data = {}
            data.name = input[1]
            data.freq = input[2]
            data.disableJammer = input[4]
            data.groups = Groups
            ServerControl.setRadioFrequency(data)
        end
    end
end

local function deleteRadioFreq(index)
    local freq = AllFreqs[index]
    if freq then
        local alert = lib.alertDialog({
            header = 'Deletar Frequencia?',
            content = 'Tem certeza que deseja deletar a frequencia: \n'..freq.name.." - "..freq.freq,
            centered = true,
            cancel = true
        })
        if alert == "confirm" then
            ServerControl.deleteFrequency(index)
        end
    end
end

local function editRadioFreq(index)
    local freq = AllFreqs[index]
    if freq then
        local groups = ServerControl.getGroups()
        if groups then
            local input = lib.inputDialog('Registro de Frequencia', {
                { type = 'input', label = 'Nome', description = 'Nome da Frequencia', required = true, default = freq.name },
                { type = 'number', label = 'Frequencia', description = 'Numero da frequencia', required = true, default = freq.freq },
                { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, default = freq.groups, searchable = true },
                { type = 'checkbox', label = 'Desativar Bloqueador de sinal', checked = freq.disableJammer and true },
            })
            if input then
                local Groups = {}
                local SelectedGroups = input[3] or {}
                if type(SelectedGroups) == "table" then
                    for _,ndata in pairs(SelectedGroups) do
                        local Perms = json.decode(ndata)
                        for group,grade in pairs(Perms) do
                            Groups[group] = true
                        end
                    end
                end
                local data = {}
                data.name = input[1]
                data.freq = input[2]
                data.disableJammer = input[4]
                data.groups = Groups
                ServerControl.updateFrequency(index,data)
            end
        end
    end
end

local function manageRadioFreq(index)
    local freq = AllFreqs[index]
    if freq then
        lib.registerContext({
            id = 'admin_radio_freq_manage',
            title = 'Gerenciar Frequencia',
            options = {
                {
                    title = 'Editar Frequencia',
                    description = 'Editar frequencia de radio!',
                    icon = 'fa-solid fa-pen-to-square',
                    onSelect = function()
                        editRadioFreq(index)
                    end,
                },
                {
                    title = 'Deletar Frequencia',
                    description = 'Deletar frequencia de radio!',
                    icon = 'fa-solid fa-trash',
                    onSelect = function()
                        deleteRadioFreq(index)
                    end,
                },
            }
        })
        lib.showContext('admin_radio_freq_manage')
    end
end

local function listRadioFreqs(values)
    local options = {}
    for _,ndata in pairs(values) do
        table.insert(options,{
            title = ndata.label,
            description = "Gerenciar Frequencia",
            icon = 'fa-solid fa-gear',
            onSelect = function()
                manageRadioFreq(ndata.value)
            end,
        })
    end
    lib.registerContext({
        id = 'admin_radio_freq_list',
        title = 'Listar Frequencias',
        menu = 'admin_radio_freq_control',
        options = options
    })
    lib.showContext('admin_radio_freq_list')
end

function Client.showRadioFreqs()
    local values = {}
    for k,v in pairs(AllFreqs) do
        table.insert(values,{
            label = v.name.." - "..v.freq,
            value = k
        })
    end
    lib.registerContext({
        id = 'admin_radio_freq_control',
        title = 'Controle das Frequencias de Radio',
        options = {
            {
                title = 'Criar Frequencia',
                description = 'Crie uma nova frequencia de radio!',
                icon = 'fa-solid fa-plus',
                onSelect = createRadioFreq
            },
            {
                title = 'Listar Frequencias',
                description = 'Listar frequencias de radio!',
                icon = 'fa-solid fa-list',
                onSelect = function()
                    listRadioFreqs(values)
                end,
            },
        }
    })
    lib.showContext('admin_radio_freq_control')
end
