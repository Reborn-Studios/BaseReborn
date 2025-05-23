Config = {}

Config.Settings = {
    colorAndFitmentPayMethod = "cash", -- Escolha cash/card (cash = dinheiro da mão, card = dinheiro do banco)
    keyCodes = {
        driftMode = 21, -- Botão para freio de mão (padrão: SHIFT ESQUERDO)
        popNbang = 74, -- Botão para ativar o pops'n'bangs no escapamento (padrão: H)
        purge = 73 -- Botão para ativar o purgador no carro (padrão: X)
    },
    performanceMode = {
        torqValue = 16.0, -- Multiplicador de torque do veículo no modo performance
        engineValue = 16.0, -- Multiplicador de força do motor do veículo no modo performance
        wastegate_increase = 0.5, -- Multiplicador de melhorias no carro com a wastegate
    },
    popNbang_time = math.random(1,150), -- caso aumente aqui, o popNbang será mais lento
    purgeSize = 2, -- Tamanho do jato do purgador
    nitro = {
        multiplier = 1.10, -- Coeficiente de propulsão ao usar nitro (Recomendado não aumentar muito)
        time = 3000, -- Quanto tempo o nitro vai durar
        cooldown = 30000, -- Quanto devo para usar o nitro novamente
        keyCode = 38, -- Tecla para utilizar o nitro
    },
    syncFitment = true, -- Ativar sincronização para todos os players sobre as montagens de roda
    automaticTunningSync = true, -- Ativar sincronização das tunagens independente da garagem
    automaticTunningSyncType = 1, -- Modos de sincronização automática
    automaticTunningSyncTimeCheck = 4000, -- Tempo que o script vai verificar se um carro novo está spawnado e sincronizar as tunagens

    -- Sistema de ordens de serviço
    serviceOrderMode = {
        enabled = false, -- Ativar sistema de ordens de serviço (ao realizar a tunagem, a ordem é gerada e o mecânico aplica)
        applyBonus = 0.5, -- Bônus de pagamento para ordens de serviço
        applyPermission = "mecanico.permissao", -- Permissão necessária para aceitar ordens de serviço
        expireTime = 3 -- Tempo em dias para remover as ordens que não foram utilizadas, do banco.
    }
}

Config.Menus = {
    upgrades = {
        brakes = { basePrice = 5000, increaseBy = 500 }, -- caso não queira que requisite um item, basta apagar esse parâmetro, igual os exemplos abaixo.
        transmission = { basePrice = 5000, increaseBy = 500 },
        suspension = { basePrice = 5000, increaseBy = 500 },
        engine = { basePrice = 5000, increaseBy = 500 },
        turbo = { basePrice = 5000, enabled = true }, -- caso queira desativar a tunagem de turbo, basta mudar o enabled para false
    },
    customization = {
        spoiler = { basePrice = 1500, increaseBy = 250 },
        skirts = { basePrice = 750, increaseBy = 100 },
        exhausts = { basePrice = 1000, increaseBy = 200 },
        grille = { basePrice = 750, increaseBy = 150 },
        hood = { basePrice = 2200, increaseBy = 350 },
        fenders = { basePrice = 1250, increaseBy = 250 },
        roof = { basePrice = 1000, increaseBy = 250 },
        horn = { basePrice = 500, increaseBy = 0 },
        engine_block = { basePrice = 5000, increaseBy = 1250 },
        air_filters = { basePrice = 3500, increaseBy = 1000 },
        struts = { basePrice = 2500, increaseBy = 250 },
        license_plate = { basePrice = 500, increaseBy = 0 },
        plate_holders = { basePrice = 500, increaseBy = 0 },
        vanity_plates = { basePrice = 750, increaseBy = 250 },
        headlights = { basePrice = 1250, increaseBy = 0 },
        front_bumper = { basePrice = 1250, increaseBy = 250 },
        rear_bumper = { basePrice = 1250, increaseBy = 250 },
        arch_cover = { basePrice = 750, increaseBy = 250 },
        aerials = { basePrice = 500, increaseBy = 150 },
        trim = { basePrice = 750, increaseBy = 250 },
        tank = { basePrice = 500, increaseBy = 250 },
        windows = { basePrice = 350, increaseBy = 250 },
        frame = { basePrice = 1000, increaseBy = 250 },
    },
    cosmetic = {
        headlight_color = { basePrice = 250, increaseBy = 0 },
        livery = { basePrice = 500, increaseBy = 0 },
        neon = { basePrice = 250, increaseBy = 0 },
        window_tint = { basePrice = 100, increaseBy = 50 },
        tire_smoke = { basePrice = 250, increaseBy = 0 },
        trim_design = { basePrice = 500, increaseBy = 150 },
        ornaments = { basePrice = 500, increaseBy = 0 },
        dashboard = { basePrice = 500, increaseBy = 100 },
        dial_design = { basePrice = 500, increaseBy = 100 },
        door_speaker = { basePrice = 250, increaseBy = 0 },
        seats = { basePrice = 250, increaseBy = 150 },
        steering_wheels = { basePrice = 500, increaseBy = 250 },
        shifter_leavers = { basePrice = 500, increaseBy = 250 },
        plaques = { basePrice = 750, increaseBy = 250 },
        speakers = { basePrice = 500, increaseBy = 250 },
        trunk = { basePrice = 500, increaseBy = 250 },
        wheels = { basePrice = 5000, increaseBy = 0 },
    },
    fitment = {
        price = 7500,
    },
    tuning = {
        vehicle_traction = { basePrice = 10000 },
        tuner_chip = { basePrice = 25000 },
        nitro = { basePrice = 15000 },
        popcorn = { basePrice = 15000 },
        popcolor = { basePrice = 20000 },
        wastegate = { basePrice = 30000 },
        purge = { basePrice = 10000 },
    },
    paintBooth = {
        color = 500, 
        pearlescent = 500, 
        chrome = 750, 
        chameleon = 2500, 
        neon = 250, 
        smoke = 250, 
        wheel = 250,
    },
    extras = {
        price = 250
    }
}

Config.Locations = {
    ["Bennys Workshop"] = {
        illegalMechanic = false,
        permission = "mecanico.permissao",
        coords = {
            vector3(835.4,-983.77,26.0),
            vector3(835.51,-975.3,26.0),
            vector3(835.06,-967.17,26.01),
        },
        excludeMods = {}, -- vehicle, cosmetic, upgrades, wheel, paintbrush
        showBlip = false,
        blipSprite = 446,
        blipColor = 4,
        blipCoords = vector3(827.41,-984.23,26.16),
    },
    
    ["Bennys Workshop Ilegal"] = {
        illegalMechanic = true,
        permission = "bennys.permissao",
        coords = {
            vector3(-222.97,-1329.2,30.9)
        },
        showBlip = false,
        excludeMods = {},
        blipSprite = 446,
        blipColor = 4,
        blipCoords = vector3(-222.97,-1329.2,30.9),
    }
}

-- Menu de extras (geralmente para viaturas)
Config.ExtraMenuLocations = {
    ["LSPD"] = {
        permission = "policia.permissão", -- permissão necessária para acessar
        coords = {
            vector3(455.23, -1020.47, 27.95)
        },
    } 
}

-- Configuração de mensagens
Config.Locale = {
    ["open_mechanic_menu"] = "~INPUT_CONTEXT~ Abrir mecânica",
    ["open_extra_menu"] = "~INPUT_CONTEXT~ Abrir menu de extras",
    ["dont_have_money"] = "Você não possui dinheiro suficiente",
    ["dont_have_item"] = "Você não possui o item necessário",
    ["popnbang_active"] = "Status do pops'N'bangs: %s",
    ["save_cancel"] = "Mudanças canceladas.",
    ["saved"] = "As mudanças foram aplicadas com sucesso!"
}