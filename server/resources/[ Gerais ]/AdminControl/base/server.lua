RegisterCommand(Config.Commands["baseconfig"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["baseconfig"]['perm']) then
        local BaseConfig = GetControlFile("baseconfig")
        TriggerClientEvent("AdminControl:openBaseConfig",source,BaseConfig)
    end
end)

local function saveData(Data)
    local BaseConfig = GetControlFile("baseconfig")
    for key,v in pairs(BaseConfig) do
        if Data[key] ~= nil then
            if type(Data[key]) == "table" then
                for k,d in pairs(Data[key]) do
                    if Data[key][k] ~= v[k] then
                        BaseConfig[key][k] = Data[key][k]
                    end
                end
            else
                if Data[key] ~= v then
                    BaseConfig[key] = Data[key]
                end
            end
        end
    end
    SaveAllFile('baseconfig',BaseConfig)
end

local function convertRGBtoHex(rgb)
    local r, g, b = rgb:match("rgb%((%d+),%s*(%d+),%s*(%d+)%)")
    r = tonumber(r)
    g = tonumber(g)
    b = tonumber(b)
    if not r or not g or not b then return nil end
    return string.format("#%02X%02X%02X", r, g, b)
end

RegisterNetEvent("AdminControl:saveBaseConfig")
AddEventHandler("AdminControl:saveBaseConfig",function (data)
    local source = source
    local BasicsConfig = GlobalState['Basics']
    local BaseData = {}
    BaseData.ServerName = data[1] or BasicsConfig['ServerName']
    BaseData.Discord = data[2] or BasicsConfig['Discord']
    BaseData.MaxHealth = data[3] or BasicsConfig['MaxHealth']
    BaseData.CityColor = data[4] or BasicsConfig['CityColor']
    BaseData.CityColorHex = convertRGBtoHex(BaseData.CityColor)
    BaseData.Identifier = data[5] or BasicsConfig['Identifier']
    BaseData.Whitelist = data[6] or BasicsConfig['Whitelist']
    BaseData.Theme = data[7] or BasicsConfig['Theme']
    BaseData.Debug = data[8]
    saveData(BaseData)
    BasicsConfig = BaseData
    GlobalState:set("Basics",BasicsConfig,true)
    TriggerClientEvent("Notify",source,"sucesso","Configurações básicas salvas com sucesso! Serão aplicadas após RR",5000)
    StopResource("loading")
    Wait(500)
    StartResource("loading")
end)

RegisterNetEvent("AdminControl:saveNeedsConfig")
AddEventHandler("AdminControl:saveNeedsConfig",function (data)
    local source = source
    local Needs = {}
    local BaseConfig = GetControlFile("baseconfig")
    Needs.Tempo = data[1] or BaseConfig.Needs.Tempo
    Needs.Fome = data[2] or BaseConfig.Needs.Fome
    Needs.Sede = data[3] or BaseConfig.Needs.Sede
    saveData({ Needs = Needs })
    TriggerClientEvent("Notify",source,"sucesso","Configurações de fome e sede salvas com sucesso!",5000)
end)

RegisterNetEvent("AdminControl:saveNpcControlConfig")
AddEventHandler("AdminControl:saveNpcControlConfig",function (data)
    local source = source
    local NpcControl = {}
    local BaseConfig = GetControlFile("baseconfig")
    NpcControl.PedDensity = data[1] and (data[1] / 100) or BaseConfig.NpcControl.PedDensity
    NpcControl.VehicleDensity = data[2] and (data[2] / 100) or BaseConfig.NpcControl.VehicleDensity
    NpcControl.ParkedVehicle = data[3] and (data[3] / 100) or BaseConfig.NpcControl.ParkedVehicle
    saveData({ NpcControl = NpcControl })
    TriggerClientEvent("Notify",source,"sucesso","Controle de NPC salvo com sucesso! Serão aplicadas após RR",5000)
end)

RegisterNetEvent("AdminControl:saveMaintenceConfig")
AddEventHandler("AdminControl:saveMaintenceConfig",function (data)
    local source = source
    local Maintenance = {}
    local licenses = {}
    if data[3] then
        for i=1, #data[3] do
            licenses[data[3][i]] = true
        end
    end
    Maintenance.enabled = data[1]
    Maintenance.text = data[2]
    Maintenance.licenses = licenses
    saveData({ Maintenance = Maintenance })
    TriggerClientEvent("Notify",source,"sucesso","Configuração de manutenção salvo com sucesso!",5000)
end)

RegisterNetEvent("AdminControl:saveAutoReloadConfig")
AddEventHandler("AdminControl:saveAutoReloadConfig",function (data)
    local source = source
    local AutoReload = {}
    local Timers = {}
    if data[2] then
        local Timer = os.date("%H:%M",data[2]/1000)
        Timers[Timer] = true
        AutoReload.Timer1 = data[2]
    end
    if data[3] then
        local Timer = os.date("%H:%M",data[3]/1000)
        Timers[Timer] = true
        AutoReload.Timer2 = data[3]
    end
    AutoReload.Enabled = data[1]
    AutoReload.RecurringTime = data[4] and data[4] * 60 * 60 * 1000
    AutoReload.Timers = Timers
    saveData({ AutoReload = AutoReload })
    TriggerClientEvent("Notify",source,"sucesso","RR Automatico salvo com sucesso! Serão aplicadas após RR",5000)
end)

RegisterNetEvent("AdminControl:saveWipeConfig")
AddEventHandler("AdminControl:saveWipeConfig",function (data)
    local source = source
    local Wipe = {}
    local BaseConfig = GetControlFile("baseconfig")
    Wipe.Password = data[1] or BaseConfig.Wipe.Password
    Wipe.StartId = data[2] or BaseConfig.Wipe.StartId
    Wipe.StartBank = data[3] or BaseConfig.Wipe.StartBank
    saveData({ Wipe = Wipe })
    TriggerClientEvent("Notify",source,"sucesso","Configuração de Wipe salvo com sucesso!",5000)
end)
