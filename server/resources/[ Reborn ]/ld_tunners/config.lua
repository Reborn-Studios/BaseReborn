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
    effectsSyncRadius = 100.0, -- Raio (metros) para sincronizar efeitos visuais/sonoros via statebag
    nitro = {
        multiplier = 1.10, -- Coeficiente de propulsão ao usar nitro (Recomendado não aumentar muito)
        time = 3000, -- Quanto tempo o nitro vai durar
        cooldown = 30000, -- Quanto devo para usar o nitro novamente
        keyCode = 38, -- Tecla para utilizar o nitro
    },
    syncFitment = true, -- Ativar sincronização para todos os players sobre as montagens de roda
    automaticTunningSync = false, -- Ativar sincronização das tunagens independente da garagem
    automaticTunningSyncType = 1, -- Modos de sincronização automática
    automaticTunningSyncTimeCheck = 4000, -- Tempo que o script vai verificar se um carro novo está spawnado e sincronizar as tunagens

    -- Sistema de ordens de serviço
    serviceOrderMode = {
        enabled = false, -- Ativar sistema de ordens de serviço (ao realizar a tunagem, a ordem é gerada e o mecânico aplica)
        applyBonus = 0.5, -- Bônus de pagamento para ordens de serviço
        applyPermission = "mecanico.permissao", -- Permissão necessária para aceitar ordens de serviço
        expireTime = 3 -- Tempo em dias para remover as ordens que não foram utilizadas, do banco.
    },

    enableRepair = true, -- Ativar sistema de reparo
    enableNuiVignette = true, -- Escurecer bordas da tela quando a interface da mecânica estiver aberta
    mouseOnlyMode = true, -- Interface inteira só com mouse (oculta dicas de setas e CTRL liberar mouse)
    menuWheelScrollSpeed = 8, -- Multiplicador do scroll horizontal das categorias com mouse ativo
    mainCameraFraming = {
        offsetAdd = { x = 0.0, y = -0.4, z = 0.0 }, -- Soma ao offset da câmera principal (Z sobe a câmera)
        rotationAdd = { x = -12.0, y = 0.0, z = 0.0 }, -- Inclinação extra (empurra o carro para cima na tela)
        fov = 54.0, -- Campo de visão da câmera principal (padrão era 50)
    },
    freeCamera = {
        distance = 7.5, -- Distância inicial da câmera livre em relação ao veículo
        pitch = 10.0, -- Inclinação inicial (maior = visão mais de cima, carro acima da UI)
        yaw = 110.0, -- Ângulo horizontal inicial
        fov = 62.0,
        sensitivityX = 4.5,
        sensitivityY = 4.5,
        inheritMenuCamera = true, -- Herda o yaw da câmera do menu ao pressionar H
        inheritDistance = true, -- Herda a distância da câmera do menu (recomendado)
        distanceMin = 5.0, -- Distância mínima ao aproximar com scroll
        distanceMax = 14.0,
        distancePadding = 1.25, -- Folga extra além do tamanho do veículo
        lookAtHeight = 0.0, -- Ajuste fino do ponto focal vertical (negativo = mira mais baixo no carro)
        offsetAdd = { x = 0.0, y = 0.0, z = -0.3 }, -- Offset da posição da câmera (Z negativo desce a câmera)
    },
    mechanicInfo = {
        legal = {
            banner = "img/bennysimg.png",
            text = "Você está utilizando uma <span>mecânica legal</span>. A mecânica ideal para o trabalhador que é apaixonado por carros, e não quer se envolver em altos riscos com as autoridades.",
        },
        illegal = {
            banner = "img/bennysimgilegal.png",
            text = "Você está utilizando uma <span>mecânica ilegal</span>. Aqui, você poderá fazer as mesmas coisas de uma legalizada, porém com uma apimentada a mais! Explore as novidades.",
        },
    },
}

Config.Menus = {
    upgrades = {
        brakes = { basePrice = 5000, increaseBy = 500, --[[ item = "brakes" ]] }, -- caso não queira que requisite um item, basta apagar esse parâmetro, igual os exemplos abaixo.
        transmission = { basePrice = 5000, increaseBy = 500 },
        suspension = { basePrice = 5000, increaseBy = 500 },
        engine = { basePrice = 5000, increaseBy = 500 },
        armor = { basePrice = 5000, increaseBy = 500, enabled = true }, -- caso queira desativar a blindagem de lataria, basta mudar o enabled para false
        armor_tyre = { basePrice = 5000, enabled = true }, -- caso queira desativar a blindagem de pneu, basta mudar o enabled para false
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
        step = 0.01, -- incremento das setas, slider e arredondamento do input
        limits = {
            ["wheels-width"] = { min = -1.0, max = 1.0 },
            ["front-left"] = { min = -1.0, max = 1.0 },
            ["front-right"] = { min = -1.0, max = 1.0 },
            ["rear-left"] = { min = -1.0, max = 1.0 },
            ["rear-right"] = { min = -1.0, max = 1.0 },
            ["front-left-camber"] = { min = -1.0, max = 1.0 },
            ["front-right-camber"] = { min = -1.0, max = 1.0 },
            ["rear-left-camber"] = { min = -1.0, max = 1.0 },
            ["rear-right-camber"] = { min = -1.0, max = 1.0 },
        },
    },
    tuning = {
        vehicle_traction = { basePrice = 10000 },
        tuner_chip = { basePrice = 25000 },
        nitro = { basePrice = 15000 },
        popcorn = { basePrice = 15000 },
        popcolor = { basePrice = 20000 },
        popsound = { basePrice = 20000 },
        wastegate = { basePrice = 30000 },
        purge = { basePrice = 10000 },
    },
    airSuspension = {
        enabled = true,
        openKey = "J", -- tecla para abrir o controle da suspensão a ar
        basePrice = 25000,
        item = false, -- "ktisuspensao" para exigir item na instalação | false para desativado
        category = "illegal", -- "legal" = Cosmética | "illegal" = Tunagem Avançada | "both" = Cosmética + Tunagem Avançada (ilegal)
        minHeight = -0.095,
        maxHeight = 0.095,
        presetMin = -0.0949,
        maxSpeedKmh = 25,
        stepFast = 0.003,
        stepSlow = 0.0003,
        stepLimit = 0.00045, -- velocidade ao usar alt. máxima/mínima e presets
        sounds = {
            up = "encher",
            down = "esvaziar",
            volume = 0.85,
        },
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
        illegalMechanic = true,
        permission = nil,
        coords = {
            vector3(835.17,-983.75,26.54),
            vector3(835.22,-975.08,26.53),
            vector3(835.06,-967.08,26.54),
        },
        excludeMods = {}, -- vehicle, cosmetic, upgrades, wheel, paintbrush
        showBlip = true,
        blipSprite = 446,
        blipColor = 4,
        blipCoords = vector3(835.17,-983.75,26.54),
    },
    
    ["Bennys Workshop Ilegal"] = {
        illegalMechanic = true,
        permission = nil,
        coords = {
            vector3(-222.97,-1329.2,30.9)
        },
        showBlip = true,
        excludeMods = {},
        blipSprite = 446,
        blipColor = 4,
        blipCoords = vector3(-222.97,-1329.2,30.9),
    }
}

-- Menu de extras (geralmente para viaturas)
Config.ExtraMenuLocations = {
    ["LSPD"] = {
        permission = "policia.permissao", -- permissão necessária para acessar
        coords = {
            vector3(455.23, -1020.47, 27.95)
        },
    }
}

-- Configuração de mensagens
Config.Locale = {
    ["open_mechanic_menu"] = "~g~[E]~w~ Abrir mecânica",
    ["open_extra_menu"] = "~g~[E]~w~ Abrir menu de extras",
    ["dont_have_money"] = "Você não possui dinheiro suficiente",
    ["dont_have_item"] = "Você não possui o item necessário",
    ["popnbang_active"] = "Status do pops'N'bangs: %s",
    ["save_cancel"] = "Mudanças canceladas.",
    ["order_generated"] = "A ordem de serviço foi gerada com sucesso!",
    ["saved"] = "As mudanças foram aplicadas com sucesso!",
    ["air_suspension_missing"] = "O veículo não possui suspensão a ar!",
    ["air_suspension_too_fast"] = "Você está muito rápido!",
    ["air_suspension_not_in_vehicle"] = "Você não está em um veículo!",
    ["air_suspension_max_height"] = "Altura máxima atingida!",
    ["air_suspension_min_height"] = "Altura mínima atingida!",
    ["air_suspension_preset_saved"] = "Novo preset definido para suspensão!",
    ["air_suspension_preset_deleted"] = "Preset removido!",
    ["air_suspension_preset_empty"] = "Este slot de preset está vazio!",
}