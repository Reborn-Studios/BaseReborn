local function openBasicConfig(baseConfig)
    local DefaultConfig = GlobalState['Basics']
    local input = lib.inputDialog('Base Config', {
        { type = 'input', label = 'Nome do Servidor', description = 'Nome do Servidor', default = baseConfig.ServerName or DefaultConfig['ServerName'] },
        { type = 'input', label = 'Discord', description = 'Link do Discord', default = baseConfig.Discord or DefaultConfig['Discord'], icon = "link" },
        { type = 'number', label = 'Máximo de Vida', description = 'Máximo de vida dos personagens', step = 100, placeholder = tostring(baseConfig.MaxHealth or DefaultConfig['MaxHealth']), icon = "heart" },
        { type = 'color', label = 'Cor do Tema da cidade', default = baseConfig.CityColor or DefaultConfig['CityColor'], icon = "palette" },
        { type = 'select', label = 'Identificador da Base', description = 'Caso trocar será dado wipe', icon = "key", options = {
            { label = "Steam", value = "steam" },
            { label = "Licença FiveM", value = "license" },
            { label = "Discord", value = "discord" },
        }, default = baseConfig.Identifier or DefaultConfig['Identifier'] },
        { type = 'checkbox', label = 'Whitelist', description = "Whitelist fechado?", checked = baseConfig.Whitelist or DefaultConfig['Whitelist'], icon = "door-closed" },
        { type = 'select', label = 'Tema da Base', description = 'Definir o tema da Base', icon = "circle-half-stroke", options = {
            { label = "Próprio", value = "default" },
            { label = "São Paulo", value = "SP" },
            { label = "Rio de Janeiro", value = "RJ" },
        }, default = baseConfig.Theme or DefaultConfig['Theme'] },
        { type = 'checkbox', label = 'Debug', description = "Ativar debug da base", checked = baseConfig.Debug or DefaultConfig['Debug'], icon = "code" },
    })
    if input then
        TriggerServerEvent("AdminControl:saveBaseConfig", input)
    end
end

RegisterNetEvent("AdminControl:openBaseConfig")
AddEventHandler("AdminControl:openBaseConfig",function(baseConfig)
    lib.registerContext({
        id = 'admin_baseconfig_control',
        title = 'Base Config',
        options = {
            {
                title = 'Config básica',
                icon = 'gear',
                arrow = true,
                onSelect = function()
                    openBasicConfig(baseConfig)
                end
            },
            {
                title = 'Fome e Sede',
                icon = 'utensils',
                arrow = true,
                onSelect = function()
                    local input = lib.inputDialog('Config de Fome e Sede', {
                        { type = 'number', label = 'Tempo de diminuição (Segundos)', description = 'Tempo para diminuir fome e sede', placeholder = baseConfig.Needs?.Tempo, icon = "clock" },
                        { type = 'number', label = 'Fome (0 a 100)', description = 'Quantidade para diminuir fome', placeholder = baseConfig.Needs?.Fome, icon = "burger" },
                        { type = 'number', label = 'Sede (0 a 100)', description = 'Quantidade para diminuir sede', placeholder = baseConfig.Needs?.Sede, icon = "bottle-water" },
                    })
                    if input then
                        TriggerServerEvent("AdminControl:saveNeedsConfig", input)
                    end
                end
            },
            {
                title = 'Controle de NPC',
                icon = 'person',
                arrow = true,
                onSelect = function()
                    local input = lib.inputDialog('Config de Fome e Sede', {
                        { type = 'number', label = 'Densidade de NPCs (Porcentagem)', min = 0, max = 100, description = 'Quantidade de npc na rua (0 a 100)', placeholder = baseConfig.NpcControl?.PedDensity, icon = "person" },
                        { type = 'number', label = 'Densidade de Veículos (Porcentagem)', min = 0, max = 100, description = 'Quantidade de veiculos de npc na rua (0 a 100)', placeholder = baseConfig.NpcControl?.VehicleDensity, icon = "car" },
                        { type = 'number', label = 'Veículos estacionados (Porcentagem)', min = 0, max = 100, description = 'Quantidade de veiculos estacionados (0 a 100)', placeholder = baseConfig.NpcControl?.ParkedVehicle, icon = "square-parking" },
                    })
                    if input then
                        TriggerServerEvent("AdminControl:saveNpcControlConfig", input)
                    end
                end
            },
            {
                title = 'Manutenção',
                icon = 'hammer',
                arrow = true,
                onSelect = function()
                    local licenses = ServerControl.getLicenses()
                    if licenses then
                        local input = lib.inputDialog('MANUTENÇÃO', {
                            { type = 'checkbox', label = 'Manutenção', description = 'Ativar Manutenção', checked = baseConfig.Maintenance?.enabled, icon = "check" },
                            { type = 'input', autosize = true, label = 'Texto de aviso', description = 'Texto aparece ao tentar entrar', default = baseConfig.Maintenance?.text, icon = "exclamation" },
                            { type = 'multi-select', label = 'Licenças liberadas', searchable = true, description = 'Licenças permitidas para entrar no servidor', placeholder = baseConfig.Maintenance?.licenses, icon = "id-card", options = licenses },
                        })
                        if input then
                            TriggerServerEvent("AdminControl:saveMaintenceConfig", input)
                        end
                    end
                end
            },
            {
                title = 'Auto Reload',
                icon = 'arrow-rotate-right',
                arrow = true,
                onSelect = function()
                    local input = lib.inputDialog2('Reinicio automatico da cidade', {
                        { type = 'checkbox', label = 'Ativar', description = 'Deseja ativar o sistema de reload automatico?', checked = baseConfig.AutoReload?.Enabled },
                        { type = 'time', label = 'Horário fixo para reiniciar', description = 'Horarios programados para reiniciar', placeholder = baseConfig.AutoReload?.Timer1, default = baseConfig.AutoReload?.Timer1, format = "24", icon = "clock" },
                        { type = 'time', label = '2° Horário fixo para reiniciar', description = 'Outro Horario programados para reiniciar', placeholder = baseConfig.AutoReload?.Timer2, default = baseConfig.AutoReload?.Timer2, format = "24", icon = "clock" },
                        { type = 'number', label = 'Definir horas para reiniciar', description = 'De quantas em quantas horas a cidade irá reiniciar?', default = (baseConfig.AutoReload?.RecurringTime or 43200000) / (60 * 60 * 1000), icon = "timer" },
                    })
                    if input then
                        TriggerServerEvent("AdminControl:saveAutoReloadConfig", input)
                    end
                end
            },
            {
                title = 'Config Wipe',
                icon = 'filter-circle-xmark',
                arrow = true,
                onSelect = function()
                    local input = lib.inputDialog('WIPE', {
                        { type = 'input', password = true, label = 'Senha', description = 'Senha para dar wipe', default = baseConfig.Wipe?.Password, icon = "key" },
                        { type = 'number', label = 'ID de inicio', description = 'Qual ID irá iniciar na cidade?', default = baseConfig.Wipe?.StartId, icon = "address-card" },
                        { type = 'number', label = 'Valor de inicial do Banco', description = 'Valor que irá iniciar no banco dos players', placeholder = baseConfig.Wipe?.StartBank, default = baseConfig.Wipe?.StartBank, icon = "money-bill" },
                    })
                    if input then
                        TriggerServerEvent("AdminControl:saveWipeConfig", input)
                    end
                end
            },
        }
    })
    lib.showContext('admin_baseconfig_control')
end)
