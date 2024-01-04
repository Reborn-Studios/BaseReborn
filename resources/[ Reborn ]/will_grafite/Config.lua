local Webhooks = module("Reborn/webhooks")

Config = {
    SPRAY_PERSIST_DAYS = 2,                 -- Duração do spray (dias)
    
    PERMISS = nil,                          -- Permissão para usar o comando

    WEBHOOK = Webhooks.webhookgrafite,

    NECESSARY = {                           
        item = "grafite",                      -- Item necessario para o realizar o spray
        amount = 1,

        item_remove = "removedor",               -- Item necessario para o remover o spray
        amount_remove = 1
    },

    Blacklist = {                           -- Palavras proibidas
        'negro',
        'macaco',
        'viado',
        'boiola',
        'gay',
        'negro',
        'mongoloide',
        'mongol'
    },

    Text = {
        SPRAY_ERRORS = {
            NOT_FLAT = 'Esta superfície não é reta suficiente',
            TOO_FAR = 'Esta superfície está muito longe',
            INVALID_SURFACE = 'Não é permitido nesta superfície',
            AIM = 'Aponte o spray em uma parede reta',
        },
        NO_SPRAY_NEARBY = 'Não há nenhum spray perto para remover',
        NEED_SPRAY = 'Você não possui um spray',
        BLACKLISTED = 'Esta palavra está proibida.',
        NEED_PERMISS = 'Você não tem permissão.'
    },
    
    Keys = {
        CANCEL = { code = 23 },
    },
    Timers = {
        Piece       = 30, -- seconds
        Tag         = 10, -- seconds
        Overwrite   = 30, -- seconds
    },
    RenderMax       = 2,    -- requires a gfx ("texture_1") per item in steam folder.

    Scaleforms = {
        Sharpness = -1.0, -- -1.0 for semi-transparent background, 1.0 for solid black background.
        Width     = 0.4,  -- effects overall dui frame width.
        Height    = 0.2,  -- effects overall dui frame height.
    },
}

FONTS = {
    {
        font = 'graffiti1',
        label = 'Next Custom',
        allowed = '^[A-Z0-9\\-.]+$',
        forceUppercase = true,
        allowedInverse = '[^A-Z0-9\\-.]+',
        sizeMult = 0.35,
    },
    {
        font = 'graffiti2',
        label = 'Dripping Marker',
        allowed = '^[A-Za-z0-9\\-.$+-*/=%"\'#@&();:,<>!_~]+$',
        allowedInverse = '[^A-Za-z0-9\\-.$+-*/=%"\'#@&();:,<>!_~]+',
        sizeMult = 1.0,
    },
    {
        font = 'graffiti3',
        label = 'Docallisme',
        allowed = '^[A-Z]+$',
        forceUppercase = true,
        allowedInverse = '[^A-Z]+',
        sizeMult = 0.45,
    },
    {
        font = 'graffiti4',
        label = 'Fat Wandals',
        allowed = '^[A-Za-z\\-.$+-*/=%"\'#@&();:,<>!_~]+$',
        allowedInverse = '[^A-Za-z\\-.$+-*/=%"\'#@&();:,<>!_~]+',
        sizeMult = 0.3,
    },
    {
        font = 'graffiti5',
        label = 'Sister Spray',
        allowed = '^[A-Z0-9]+$',
        forceUppercase = true,
        allowedInverse = '[^A-Z0-9]+',
        sizeMult = 0.3,
    },
    {
        font = 'PricedownGTAVInt',
        label = 'Pricedown',
        allowed = '^[A-Za-z0-9]+$',
        allowedInverse = '[^A-Za-z0-9]+',
        sizeMult = 0.75,
    },
    {
        font = 'Chalet-LondonNineteenSixty',
        label = 'Chalet',
        allowed = '^[A-Za-z0-9]+$',
        allowedInverse = '[^A-Za-z0-9]+',
        sizeMult = 0.6,
    },
    {
        font = 'SignPainter-HouseScript',
        label = 'Sign Painter',
        allowed = '^[A-Za-z0-9]+$',
        allowedInverse = '[^A-Za-z0-9]+',
        sizeMult = 0.85,
    }
}

function Notifys(source,message)
    if source == nil then source = source end
    TriggerClientEvent("Notify",source,"aviso",message)
end


--[[
Usar o evento para deletar o spray:

TriggerClientEvent("will_spray:removeClosestSpray",source)

]]