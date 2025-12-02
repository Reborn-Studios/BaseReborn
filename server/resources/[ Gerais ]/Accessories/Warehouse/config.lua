Config = {}

Config.Warehouses = {
    {
        coords = vector3(598.4041, -408.3136, 26.0418), -- Coordenadas do armazem
        price = 50000,  -- Preço do armazem

    },
    {
        coords = vector3(615.6195, -410.1126, 26.0322),
        price = 75000,

    },
    {
        coords = vector3(610.4863, -420.4500, 24.8400),
        price = 75000,

    },

}
Config.Blips = {
    enabled = true,         -- Coloque false para desativar os blips
    blipId = 473,
    blipColor = 3,
    blipName = "Armazem"  -- Nome do blip
}

Config.maxPurchases = 6 -- Quantidade maxima que um player pode comprar

Config.Props = {
    {
        model = "prop_boxpile_07d",
        coords = vector3(1053.2159, -3102.4148, -40.00000),
        heading = 270.0
    },
}
Config.stashes = {
    defaultSlots = 50,
    defaultWeight = 50000,
    maxSlots = 200,
    maxWeight = 200000,
    slotCost = 1000,
    weightCost = 500
}

-- discord logs
Config.Webhook = ''
Config.BotToken = ''

Config.sellpros = 0.25 -- Porcentagem que irá perder ao vender
