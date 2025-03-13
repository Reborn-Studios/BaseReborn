local Webhooks = module("Reborn/webhooks") or {}
local Proxy = module("vrp","lib/Proxy") or {}
Reborn = Proxy.getInterface("Reborn")
-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- Framework utilizado
Config.Framework = 'vrp' -- 'vrp', 'esx', 'qb'

-- Target (olhinho) ou false para usar drawtext
Config.Target = 'ox'    -- 'ox', 'qb','target' (vrp), false

-- Ativar o debug
Config.Debug = false

-- Dar bonus conforme tenha policia
Config.GiveBonusOnPolice = true

-- Distancia para açoes de venda
Config.ActionDistance = 2.0

-- Minimo de policias para vender drogas
Config.MinimumCops = 0

-- Chance para acionar a policia em cada venda
Config.ChanceSell = 10  -- (%)

-- Webhook
Config.Webhook = Webhooks.webhookselldrugs

-- Diretorio das imagens
Config.ImageDirect = Reborn.images()

-----##############################-----
--###    VENDA COM MESA
-----##############################-----

-- Props das mesas
Config.TableProps = { "prop_protest_table_01", "bkr_prop_weed_table_01b", "prop_ven_market_table1", "prop_tri_table_01" }

-- Maximo de produto em cima de outro
Config.MaxProductsAbove = 5

-- Venda de drogas com mesa para npc
Config.SellToNpc = {
    ['Enabled'] = true,
    ['Timeout'] = 15,   -- segundos
    ['MaxDistance'] = 60.0,
    -- Spawnar npcs proximos da mesa
    ['SpawnClosely'] = false,
    ['SpawnDistance'] = 20.0
}

-----##############################-----
--###    VENDA COM NPC NA RUA
-----##############################-----

-- Deve ativar a venda para npc?
Config.ShouldToggleSelling = false       -- Event: "will_drugsales:toggleselling" (client-side)

-- Tempo em segundos para concluir a venda
Config.SellTimeout = 7

-- Itens para vender
Config.SellItems = {
    { item = 'cocaine',  price = math.random(100, 200), prop = "bkr_prop_coke_cutblock_01" },
    { item = 'weed',     price = math.random(100, 200), prop = "hei_prop_heist_weed_block_01b" },
    { item = 'meth',     price = math.random(100, 200), prop = "bkr_prop_meth_smallbag_01a" },
}

-- Modo de pagamento
Config.Money = {
    name = 'dollars2',      -- 'cash', 'bank', 'black_money', item de dinheiro
    type = 'item',          -- 'item', 'money'
}

-- Vender em qualquer local
Config.SellAnywhere = true

-- Quantidade para vender se [Config.SellAnywhere == true]
Config.RandomSell = { min = 1, max = 6 } -- range: min, max

-- Zonas de venda se [Config.SellAnywhere = false]
Config.SellZones = {
    ['groove'] = {
        points = {
            vec3(251.0, -1860.0, 27.0),
            vec3(139.0, -1997.0, 27.0),
            vec3(132.0, -2025.0, 27.0),
            vec3(91.0, -2023.0, 27.0),
            vec3(-151.0, -1788.0, 27.0),
            vec3(-110.0, -1751.0, 27.0),
            vec3(42.0, -1688.0, 27.0),
            vec3(60.0, -1699.0, 27.0),
        },
        randomSellAmount = Config.RandomSell,
        items = Config.SellItems
    },
    ['vinewood'] = {
        points = {
            vec3(-663.80639648438, 114.2766418457, 97.0),
            vec3(-660.09497070312, 299.65426635742, 97.0),
            vec3(-546.58837890625, 275.86111450196, 97.0),
            vec3(-542.21002197266, 357.8136291504, 97.0),
            vec3(-519.6430053711, 349.90490722656, 97.0),
            vec3(-512.67572021484, 276.3483581543, 97.0),
            vec3(21.216751098632, 278.6813659668, 97.0),
            vec3(49.785594940186, 339.29946899414, 97.0),
            vec3(108.84923553466, 399.87518310546, 97.0),
            vec3(124.068069458, 384.4684753418, 97.0),
            vec3(92.195236206054, 354.55239868164, 97.0),
            vec3(170.3550567627, 377.32186889648, 97.0),
            vec3(841.11456298828, 199.74020385742, 97.0),
            vec3(530.7640991211, -193.10136413574, 97.0)
        },
        randomSellAmount = Config.RandomSell,
        items = Config.SellItems
    },
}

-----##############################-----
--###    OUTROS
-----##############################-----

-- Blacklist de npcs
Config.BlacklistPeds = {
    "mp_m_shopkeep_01",
    "s_m_y_ammucity_01",
    "s_m_m_lathandy_01",
    "s_f_y_clubbar_01",
    "ig_talcc",
    "g_f_y_vagos_01",
    "hc_hacker",
    "s_m_m_migrant_01",
}

-- Locales
Config.Locales = {
    ['sell_drugs_target'] = "Vender drogas",
    ['buy_drugs_target'] = "Comprar",                           -- DRAWTEXT: "~g~[E]~w~ Comprar produtos"
    ['get_table_target'] = "Guardar mesa",                      -- DRAWTEXT: "~b~[G]~w~ Guardar mesa"
    ['position_products_target'] = "Posicionar produtos",       -- DRAWTEXT: "~g~[E]~w~ Posicionar produtos"

    ['enable_selling'] = "Venda iniciada",
    ['disable_selling'] = "Venda pausada",

    ['disable_zone'] = "Local proibido para vendas",
    ['npc_talk'] = "- To a fim de uns %s pack de %s. Quanto consegue para mim?",
    ['timeout_sell'] = "Você demorou muito para decidir o preço",
    ['not_enough_items'] = "Ela tinha interesse em comprar, mas você não tinha o suficiente para vender!",
    ['not_enough_cops'] = "Comprador não esta interessado no momento!",
    ['npc_spoken'] = "Você já conversou com esse cidadão",
    ['not_enough_to_table'] = "Você não possui item suficiente",
    ['high_price'] = "O preço oferecido foi alto e o cidadão recusou",
    ['product_sold'] = 'Você recebeu $%s pela venda',
    ['npc_call_police'] = "O cidadão esta ligando para policia!",
    ['police_alert'] = "Alerta de venda de drogas! Verifique seu GPS.",
}
