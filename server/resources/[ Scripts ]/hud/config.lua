
-------------------------------------------- General --------------------------------------------
Config = {}
Config.Mysql = "oxmysql" -- mysql-async, ghmattimysql, oxmysql
Config.DefaultHud = "radial" -- Default hud when player first login avaliable huds [radial, classic, text]
Config.DefaultSpeedUnit = "kmh" -- Default speed unit when player first login avaliable speed units [kmh, mph]
Config.HudSettingsCommand = 'hud' -- Command for open hud settings
Config.DisplayMapOnWalk = false -- true - Show map when walking | false - Hide map when walking
Config.DisplayRealTime = false -- if you set this to true will show the real time according to player local time | if false it will show the game time
Config.EnableSpamNotification = true -- Spam preventation for seatbelt, cruise etc.
Config.EnableDateDisplay = true -- Determines if display date or nor
Config.DefaultMap = "rectangle" -- rectangle, radial
Config.DefaultSpeedometerSize = 0.7 -- 0.5 - 1.3
Config.DefaultHudSize = 1.0 -- 0.5 - 1.3
Config.EnableAmmoHud = true -- Determines if display ammo hud or nor
Config.DefaultRefreshRate = 500 -- Refresh rate for vehicle hud
Config.EnableHealth = true
Config.EnableHunger = true
Config.EnableThirst = true
Config.EnableHud = true
Config.EnableArmor = true
Config.EnableStamina = true
Config.EnableSpeedometer = true

Config.DefaultHudColors = {
    ["radial"] = {
        ["health"] = "#FF4848ac",
        ["armor"] = "#FFFFFFac",
        ["hunger"] = "#FFA048ac",
        ["thirst"] = "#4886FFac", 
        ["stress"] = "#48A7FFac",
        ["stamina"] = "#C4FF48ac",
        ["oxy"] = "#48A7FFac",
        ["parachute"] = "#48FFBDac", 
        ["nitro"] = "#AFFF48ac", 
        ["altitude"] = "#00FFF0ac", 
    },
    ["text"] = {
        ["health"] = "#FF4848ac",
        ["armor"] = "#FFFFFFac",
        ["hunger"] = "#FFA048ac",
        ["thirst"] = "#4886FFac", 
        ["stress"] = "#48A7FFac",
        ["stamina"] = "#C4FF48ac",
        ["parachute"] = "#48FFBDac", 
        ["oxy"] = "#48A7FFac",
        ["nitro"] = "#AFFF48ac", 
        ["altitude"] = "#00FFF0ac", 
    },    
    ["classic"] = {
        ["health"] = "#9F2929",
        ["armor"] = "#2E3893",
        ["hunger"] = "#B3743A",
        ["thirst"] = "#2F549C", 
        ["stress"] = "#AA35A6",
        ["oxy"] = "#48A7FFac",
        ["stamina"] = "#c4ff48",
        ["parachute"] = "#48ffde", 
        ["nitro"] = "#8eff48", 
        ["altitude"] = "#48deff", 
    },      
}


-------------------------------------------- Watermark hud --------------------------------------------
Config.DisableWaterMarkTextAndLogo = false -- true - Disable watermark text and logo 
Config.UseWaterMarkText = false -- if true text will be shown | if  false logo will be shown
Config.WaterMarkText1 = GlobalState['Basics']['ServerName'] -- Top right server text
Config.WaterMarkText2 = "RP"  -- Top right server text
Config.WaterMarkLogo = GlobalState['Basics']['CityLogo'] -- Logo url
Config.LogoWidth = "200px"
Config.LogoHeight = "180px"
Config.EnableId = false -- Determines if display server id or nor
Config.EnableWatermarkCash = false -- Determines if display cash or nor
Config.EnableWatermarkBankMoney = false -- Determines if display bank money or nor
Config.EnableWatermarkJob = true -- Determines if display job or nor
Config.EnableWatermarkWeaponImage = true -- Determines if display weapon image or nor
Config.EnableWaterMarkHud = true -- Determines if right-top hud is enabled or not

Config.Text1Style = {
    ["color"] = '#e960c7',
    ["text-shadow"] = "0px 0.38rem 2.566rem rgba(116, 5, 147, 0.55)",
}

Config.Text2Style = {
    ["color"] = "#ffffff",
}

-------------------------------------------- Keys --------------------------------------------
Config.DefaultCruiseControlKey = "C" -- Default control key for cruise. Players can change the key according to their desire 
Config.DefaultSeatbeltControlKey = "G" -- Default control key for seatbelt. Players can change the key according to their desire 
Config.VehicleEngineToggleKey = "M" -- Default control key for toggle engine. Players can change the key according to their desire 
Config.NitroKey = "SHIFT" -- Default control key for use nitro. Players can change the key according to their desire 

-------------------------------------------- Nitro --------------------------------------------
Config.RemoveNitroOnpress = 2 -- Determines of how much you want to remove nitro when player press nitro key
Config.NitroItem = "nitro" -- item to install nitro to a vehicle
Config.EnableNitro = false -- Determines if nitro system is enabled or not
Config.NitroForce = 50.0 -- Nitro force when player using nitro

-------------------------------------------- Engine Toggle --------------------------------------------
Config.EnableEngineToggle = false -- Determines if engine toggle is enabled or not

-------------------------------------------- Vehicle Functionality --------------------------------------------
Config.EnableCruise = false -- Determines if cruise mode is active
Config.EnableSeatbelt = true -- Determines if seatbelt is active

-------------------------------------------- Settings text --------------------------------------------
Config.SettingsLocale = { -- Settings texts
["text_hud_1"] = "test",
["text_hud_2"] = "hud",
["classic_hud_1"] = "clasic",
["classic_hud_2"] = "hud",
["radial_hud_1"] = "radial",
["radial_hud_2"] = "hud",
["hide_hud"] = "Esconder Hud",
["health"] = "Vida",
["armor"] = "Colete",
["thirst"] = "Sede",
["stress"] = "Stress",
["oxy"] = "Oxigenio",
["hunger"] = "Fome",
["show_hud"] = "Mostrar Hud",
["stamina"] = "Stamina",
["nitro"] = "Nitro",
["Altitude"] = "Altitude",
["Parachute"] = "Paraquedas",
["enable_cinematicmode"] = "Ativar Cinematic",
["disable_cinematicmode"] = "Desativar Cinematic",
["exit_settings_1"] = "SAÍDA",
["exit_settings_2"] = "CONFIGURAÇÕES",
["speedometer"] = "Kilometragem",
["map"] = "MAPA",
["show_compass"] = "Exibir hora/data",
["hide_compass"] = "Esconder hora/data",
["rectangle"] = "Quadrado",
["radial"] = "Redondo",
["dynamic"] = "Dinamico",
["status"] = "STATUS",
["enable"] = "Ativo",
["hud_size"] = "Tamanho do Hud",
["disable"] = "Desativar",
["hide_at"] = "Esconder-se",
["and_above"] = "Acima",
["enable_edit_mode"] = "Mover HUD (uma imagem)",
["enable_edit_mode_2"] = "Mover HUD (em massa)",
["change_status_size"] = "Mudança de tamanho do Hud",
["change_color"] = "Mudança de cor do Hud",
["disable_edit_mode"] = "Desativar modo de edição",
["reset_hud_positions"] = "Redefinir localização do Hud",
["info_text"] = "Reborn Studios",
["speedometer_size"] = "Tamanho Quilometragem",
["refresh_rate"] = "Taxa de atualização",
["esc_to_exit"] = "PRESSIONE ESC PARA SAIR DO MODO DE EDIÇÃO"
}

-------------------------------------------- Fuel --------------------------------------------

Config.GetVehicleFuel = function(vehicle)
    return GetVehicleFuelLevel(vehicle)
end

-------------------------------------------- Stress --------------------------------------------

Config.UseStress = false -- if you set this to false the stress hud will be removed
Config.StressWhitelistJobs = { -- Add here jobs you want to disable stress 
    'police', 'ambulance'
}

Config.WhitelistedWeaponStress = {
    `weapon_petrolcan`,
    `weapon_hazardcan`,
    `weapon_fireextinguisher`
}

Config.AddStress = {
    ["on_shoot"] = {
        min = 1,
        max = 3,
        enable = true,
    },
    ["on_fastdrive"] = {
        min = 1,
        max = 3,
        enable = true,
    },
}

Config.RemoveStress = { -- You can set here amounts by your desire
    ["on_eat"] = {
        min = 5,
        max = 10,
        enable = true,

    },
    ["on_drink"] = {
        min = 5,
        max = 10,
        enable = true,

    },
    ["on_swimming"] = {
        min = 5,
        max = 10,
        enable = true,

    },
    ["on_running"] = {
        min = 5,
        max = 10,
        enable = true,
    },
}

-------------------------------------------- Notifications --------------------------------------------

Config.Notifications = { -- Notifications
    ["stress_gained"] = {
        message = 'Ficando estressado',
        type = "negado",
        time = 5000
    },
    ["stress_relive"] = {
        message =  'Você esta relaxando',
        type = "sucesso",
        time = 5000
    },
    ["took_off_seatbelt"] = {
        type = "negado",
        message = "Remover o cinto.",
        time = 5000
    },
    ["took_seatbelt"] = {
        type = "sucesso",
        message = "Coloque o cinto.",
        time = 5000
    },
    ["cruise_actived"] = {
        type = "sucesso",
        message = "Cruzeiro ativado.",
        time = 5000
    },
    ["cruise_disabled"] = {
        type = "negado",
        message = "Cruzeiro desativado.",
        time = 5000
    },
    ["spam"] = {
        type = "negado",
        message = "Espere um segundo.",
        time = 5000
    },
    ["engine_on"] = {
        type = "sucesso",
        message = "Motor ligado.",
        time = 5000
    }, 
    ["engine_off"] = {
        type = "sucesso",
        message = "Motor desligado.",
        time = 5000
    }, 
    ["cant_install_nitro"] = {
        type = "negado",
        message = "Não pode usar o Nitro dentro do veículo.",
        time = 5000
    }, 
    ["no_veh_nearby"] = {
        type = "negado",
        message = "Não há nenhum veículo por perto.",
        time = 5000
    }, 
    ["cash_display"] = {
        type = "sucesso",
        message = "Você possui $%s em seu bolso.",
        time = 5000
    }, 
    ["bank_display"] = {
        type = "sucesso",
        message = "Você possui $%s em seu banco.",
        time = 5000
    }, 
}

Config.Notify = {
    Background = 'rgba(31, 40, 54, 1.0)', -- Background color of the notification

    UseSound = true, -- Use a sound when a notification is shown

    Position = {
        Align = 'center', -- Options: top, center, bottom
        Side = 'right', -- Options: left, right
    },

    -- Notification types and their colors and icons (you can add more types)
    -- Icons can be fined here: https://pictogrammers.com/library/mdi/
    Types = {
        ['success'] = {
            ['color'] = '#4caf50',
            ['icon'] = 'mdi-check'
        },
        ['error'] = {
            ['color'] = '#ef5350',
            ['icon'] = 'mdi-alert-circle-outline'
        },
        ['warning'] = {
            ['color'] = '#ff9800',
            ['icon'] = 'mdi-account-alert'
        },
        ['info'] = {
            ['color'] = '#61a5fb',
            ['icon'] = 'mdi-information'
        },
    }
}

Config.Notification = function(message, type, isServer, src) -- You can change here events for notifications
    if isServer then
        TriggerClientEvent('Notify', src, type, message, 5000)
    else
        TriggerEvent('Notify', type, message, 5000)
    end
end 