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
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups },
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

function Client.showRadioFreqs()
    local values = {}
    for k,v in pairs(AllFreqs) do
        table.insert(values,{
            label = v.name.." - "..v.freq,
            value = k
        })
    end
    lib.registerMenu({
        id = 'admin_radio_freq_control',
        title = 'Controle das Frequencias de Radio',
        position = 'bottom-right',
        options = {
            { label = 'Criar Frequencia', description = 'Crie uma nova frequencia de radio!' },
            { label = 'Deletar Frequencia', values = values, description = 'Deletar frequencia de radio!' },
        }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            createRadioFreq()
        elseif selected == 2 then
            deleteRadioFreq(scrollIndex)
        end
    end)
    lib.showMenu('admin_radio_freq_control')
end