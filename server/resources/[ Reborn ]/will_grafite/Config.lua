local Webhooks = module("config/webhooks") or {}

-----##########################################################-----
--###          CONFIG
-----##########################################################-----

Config = {

    SPRAY_PERSIST_DAYS = 2,                 -- Duração do spray (dias)

    OPEN_COMMAND = "spray",

    PERMISS = nil,                          -- Permissão para usar o comando

    WEBHOOK = Webhooks.webhookgrafite,

    NECESSARY = {
        item = "grafite",                      -- Item necessario para o realizar o spray
        amount = 1,

        item_remove = "removedor",               -- Item necessario para o remover o spray
        amount_remove = 1
    },

    -- Cores: https://docs.fivem.net/docs/game-references/blips/#blip-colors
    GROUPS_COLOR = {
        ['Mafia'] = 1,
        ['Bahamas'] = 17,
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
    if IsDuplicityVersion() then
        TriggerClientEvent("Notify",source,"aviso",message,5000)
    else
        TriggerEvent("Notify","aviso",message,5000)
    end
end


--[[
-- Usar o evento para deletar o spray:

TriggerClientEvent("will_spray:removeClosestSpray",source)

-- Evento para abrir painel do spray:

TriggerClientEvent('will_spray:spray', source)

]]