local Proxy = module("lib/Proxy")
local Tunnel = module("lib/Tunnel")
Reborn = {}
Reborn.debug = false -- Debug mode
Proxy.addInterface("Reborn",Reborn)
Tunnel.bindInterface("Reborn",Reborn)

----####----####----####----##
----##        LICENÇA      -##
----####----####----####----##

Reborn.license = function()
    return {
        ['license'] = "Sua licença (Token) aqui",
        ['ip'] = "http://localhost/",
        ['porta'] = "30120",
    }
end

--####----####----####----
--##   VARIABLES   ##--
--####----####----####----

GlobalState['Basics'] = {
    ['ServerName'] = "Reborn Studios",
    ['Discord'] = "https://discord.gg/F2K5CCqcaZ",
    ['ServerStore'] = "",
    ['Whitelist'] = true,
}

GlobalState['Inventory'] = "ld_inventory"       -- "ld_inventory" / "will_inventory" / "ox_inventory" / "custom"

----####----####----####----##
----##    IMG DIRETORIO    -##
----####----####----####----##

Reborn.images = function()
    return "http://212.18.114.101/imagens/"
end

----####----####----####----##
----##   MULTI-PERSONAGEM  -##
----####----####----####----##

Reborn.multi_personagem = function()
    return {
        ['Enabled'] = true,
        ['Max_personagens'] = 1         -- Quantidade de personagens que todos conseguerem criar
    }                                   -- Para aumentar de player especifico: Banco de dados > vrp_infos > chars
end

----####----####----####----##
--  ##   PRIMEIRO LOGIN     ##
----####----####----####----##

Reborn.first_login = function()
    return {
        ['Mensagem'] = "Seja bem-vindo a <b>"..GlobalState['Basics']['ServerName'].."</b>. A cidade foi desenvolvida pensando especialmente em você, faça sua historia.",
        -- Itens inicias
        ['Itens'] = {
            ['celular'] = 1,
            ['identity'] = 1,
            ['water'] = 3,
            ['sandwich'] = 3,
            ['dollars'] = 10000,
        },
        ['Groups'] = {
            --[id] = { 'grupos' }
            [1] = { "Owner", "Admin" },
            [2] = { "Owner", "Admin" },
        },
    }
end

----####----####----####----##
--  ##      FOME E SEDE     ##
----####----####----####----##

Reborn.needs = function()
    return {
        ['Tempo'] = 90,         -- Segundos
        ['Fome'] = 2,           -- Total de 100
        ['Sede'] = 1,           -- Total de 100
    }
end

--####----####----####----
--##   NPC CONTROL   ##--
--####----####----####----

Reborn.npcControl = function()
    return {
        ['PedDensity'] = 0.5,           -- Quantidade de npc na rua (0.0 a 0.99)
        ['VehicleDensity'] = 0.4,       -- Quantidade de veiculos de npc na rua (0.0 a 0.99)
        ['ParkedVehicle'] = 0.4,        -- Quantidade de veiculos estacionados (0.0 a 0.99)
    }
end
-- Caso deseja tirar os npc, deixa tudo 0.0

----####----####----##
----## MANUTENÇÃO -##
----####----####----##

Reborn.maintenance = function()
    return {
        enabled = false,
        text = "Servidor em manutenção",
        licenses = {
            [""] = true
        }
    }
end

----####----####----####----##
----## ESTATISTICAS SERVER -##
----####----####----####----##

Reborn.statistics = function()
    return {
        ['Comando'] = "exit",
        ['Webhook'] = ""
    }
end

--####----####--
--##  WIPE  ##--
--####----####--

Reborn.segurity_code = function()
    return {
        code = "Reborn",                    -- Codigo de segurança
        start_id = 1,                       -- Inicio dos Ids
        start_bank = 25000,                 -- Dinheiro inicial no banco
        db_tables = {
            'vrp_infos',
            'vrp_invoice',
            'vrp_permissions',
            'vrp_srv_data',
            'vrp_users',
            'vrp_user_data',
            'vrp_user_ids',
            'smartbank_accounts',
            'smartbank_cards',
            'smartbank_fines',
            'smartbank_statements',
            'vrp_vehicles',
            'will_battlepass',
            'will_sprays',
            'will_ficha',
            'will_homes',
            'will_rent',
            'will_conce',
            'user_bans',
            'ld_orgs',
            'ld_orgs_daily',
            'ld_orgs_monthly',
            'ld_orgs_farm',
            'playerskins',
            'saved_skins',
            'smartphone_uber_trips',
            'smartphone_ifood_orders',
            'smartphone_contacts',
            'smartphone_settings',
            'smartphone_calls',
            'smartphone_olx',
            'smartphone_blocks',
            'smartphone_instagram',
            'smartphone_instagram_posts',
            'smartphone_instagram_likes',
            'smartphone_instagram_followers',
            'smartphone_instagram_notifications',
            'smartphone_twitter_profiles',
            'smartphone_twitter_tweets',
            'smartphone_twitter_likes',
            'smartphone_twitter_followers',
            'smartphone_paypal_transactions',
            'smartphone_tor_messages',
            'smartphone_tor_payments',
            'smartphone_whatsapp',
            'smartphone_whatsapp_channels',
            'smartphone_whatsapp_messages',
            'smartphone_whatsapp_groups',
            'smartphone_casino',
            'smartphone_calls',
            'smartphone_bank_invoices',
            'will_shops_jobs',
            'will_shops_stock',
            'will_shops',
        }
    }
end

----####----####----####----##
----## MENSAGENS DE INICIO -##
----####----####----####----##

Reborn.Language = function()
    return {
        joining = "Entrando...",
        connecting = "Conectando...",
        err = "Não foi possível identificar sua Steam ou Social Club.",
        _err = "Você foi desconectado por demorar demais na fila.",
        pos = "Você é o %d/%d da fila, aguarde sua conexão",
        connectingerr = "Não foi possível adiciona-lo na fila.",
        steam = "Você precisa estar com a Steam aberta para conectar.",
        whitelist = "Você não é está aprovado, entre em nosso Discord para mais informações: "..GlobalState['Basics']['Discord']
    }
end

--####----####----####----
--##  SIMILAR TABLES  ##--
--####----####----####----

Reborn.dbSimilarTables = function()
    return {

        -- VRP
        
        { ['Old'] = "vrp_user_vehicles", ['New'] = "vrp_vehicles",
            ['Columns'] = {
                ['detido'] = "arrest",
                ['ipva'] = "time",
            }
        },
        { ['Old'] = "vrp_user_identities", ['New'] = "vrp_users",
            ['Columns'] = {
                ['user_id'] = "id",
                ['firstname'] = "name",
                ['name'] = "name2",
            }
        },
        { ['Old'] = "vrp_user_moneys", ['New'] = "vrp_users",
            ['Columns'] = {
                ['user_id'] = "id",
                ['wallet'] = "bank",
            }
        },

        -- SUMMERZ

        { ['Old'] = "summerz_propertys", ['New'] = "vrp_homes" },
        { ['Old'] = "summerz_vehicles", ['New'] = "vrp_vehicles",
            ['Columns'] = {
                ['tax'] = 'time',
            }
        },
        { ['Old'] = "summerz_fidentity", ['New'] = "vrp_users" },
        { ['Old'] = "summerz_entitydata", ['New'] = "vrp_srv_data" },
        { ['Old'] = "summerz_playerdata", ['New'] = "vrp_user_data" },
        { ['Old'] = "summerz_accounts", ['New'] = "vrp_infos" },
        { ['Old'] = "summerz_characters", ['New'] = "vrp_users" },

        -- ESX

        -- { ['Old'] = "owned_vehicles", ['New'] = "vrp_vehicles",
        --     ['Columns'] = {
        --         ['owner'] = 'user_id',
        --     }
        -- },
        -- { ['Old'] = "users", ['New'] = "vrp_users",
        --     ['Columns'] = {
        --         ['identifier'] = 'id',
        --         ['firstname'] = 'name',
        --         ['lastname'] = 'name2',
        --         ['phone_number'] = 'phone',
        --     }
        -- },

        -- -- QBCore
        -- { ['Old'] = "owned_vehicles", ['New'] = "vrp_vehicles",
        --     ['Columns'] = {
        --         ['owner'] = 'user_id',
        --     }
        -- },
        -- { ['Old'] = "players", ['New'] = "vrp_users",
        --     ['Columns'] = {
        --         ['citizenid'] = 'id',
        --         ['cid'] = 'id',
        --         ['money'] = 'bank',
        --     }
        -- },
    }
end

GlobalState['DbSimilarTables'] = Reborn.dbSimilarTables()