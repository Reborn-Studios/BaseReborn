local Proxy = module("lib/Proxy") or {}
local Tunnel = module("lib/Tunnel") or {}
Reborn = {}
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

----####----####----####----##
----##    IMG DIRETORIO    -##
----####----####----####----##

Reborn.images = function()
    return "https://api.rebornsystem.com.br/imagens/"
end

----####----####----####----##
----##   MULTI-PERSONAGEM  -##
----####----####----####----##

Reborn.multi_personagem = function()
    return {
        ['Enabled'] = true,             -- Caso desativar, OBRIGATORIO dar WIPE
        ['Max_personagens'] = 1         -- Quantidade de personagens que todos conseguerem criar
    }                                   -- Para aumentar de player especifico: Banco de dados > accounts > chars
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
        ['DefaultBackpack'] = 30,       -- Caso use ox_inventory altere em 'inventory:weight' no ox.cfg
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
    local BaseConfig = exports['AdminControl']:GetControlFile("baseconfig") or {}
    return {
        ['Tempo'] = BaseConfig.Needs?.Tempo or 90,         -- Segundos
        ['Fome'] = BaseConfig.Needs?.Fome or 2,           -- Total de 100
        ['Sede'] = BaseConfig.Needs?.Sede or 1,           -- Total de 100
    }
end

--####----####----####----
--##   NPC CONTROL   ##--
--####----####----####----

Reborn.npcControl = function()
    local BaseConfig = exports['AdminControl']:GetControlFile("baseconfig") or {}
    return {
        ['PedDensity'] = BaseConfig.NpcControl?.PedDensity or 0.5,           -- Quantidade de npc na rua (0.0 a 0.99)
        ['VehicleDensity'] = BaseConfig.NpcControl?.VehicleDensity or 0.4,       -- Quantidade de veiculos de npc na rua (0.0 a 0.99)
        ['ParkedVehicle'] = BaseConfig.NpcControl?.ParkedVehicle or 0.4,        -- Quantidade de veiculos estacionados (0.0 a 0.99)
    }
end
-- Caso deseja tirar os npc, deixa tudo 0.0

----####----####----##
----## MANUTENÇÃO -##
----####----####----##

Reborn.maintenance = function()
    local BaseConfig = exports['AdminControl']:GetControlFile("baseconfig") or {}
    return {
        enabled = BaseConfig.Maintenance?.enabled or false,
        text = BaseConfig.Maintenance?.text or "Servidor em manutenção",
        licenses = BaseConfig.Maintenance?.licenses or {
            [""] = true
        }
    }
end

----####----####----####----##
----## AUTO RESTART SERVER -##
----####----####----####----##

Reborn.autoReload = function()
    local BaseConfig = exports['AdminControl']:GetControlFile("baseconfig") or {}
    return {
        ['Enabled'] = BaseConfig.AutoReload?.Enabled or false,                        -- Ativar/desativar auto-restart do servidor
        ['RecurringTime'] = BaseConfig.AutoReload?.RecurringTime or 12 * 60 * 60 * 1000,    -- Reiniciar após 12 horas
        ['Timers'] = BaseConfig.AutoReload?.Timers or {                              -- Horarios programados para reiniciar
            ['10:00'] = true,
            ['18:00'] = true,
        },
        ['Warning'] = {
            ['TimeToRestart'] = 5 * 60 * 1000,                          -- Tempo para avisar antes de dar RR
            ['Message'] = "Previsão de terremoto em 5 minutos...",      -- Mensagem para avisar
            ['ChangeWeather'] = "THUNDER",                              -- Mudança de tempo
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

----####----####----####----##
----##  CHANGE IDENTIFIER  -##
----####----####----####----##

Reborn.changeIdentifier = function()
    return {
        ['Comando'] = "mudarid",
        ['Tabelas'] = {
            -- # Tabela - Identificador
            ['ld_orgs_daily'] = "user_id",
            ['ld_orgs_monthly'] = "user_id",
            ['ox_inventory'] = "owner",
            ['playerskins'] = "user_id",
            ['saved_skins'] = "user_id",
            ['permissions'] = "user_id",
            ['characters'] = "id",
            ['charskins'] = "user_id",
            ['vrp_user_data'] = "user_id",
            ['accounts_ids'] = "user_id",
            ['players'] = "citizenid",
            ['vehicles'] = "user_id",
            ['will_battlepass'] = "user_id",
            ['will_ficha'] = "user_id",
            ['will_homes'] = "owner",
            ['will_jobs'] = "id",
            ['will_rent'] = "user_id",
            ['will_shops'] = "owner",
        }
    }
end

--####----####--
--##  WIPE  ##--
--####----####--

Reborn.segurity_code = function()
    local BaseConfig = exports['AdminControl']:GetControlFile("baseconfig") or {}
    return {
        code = BaseConfig.Wipe?.Password or "Reborn",                    -- Codigo de segurança
        start_id = BaseConfig.Wipe?.StartId or 1,                       -- Inicio dos Ids
        start_bank = BaseConfig.Wipe?.StartBank or 25000,                 -- Dinheiro inicial no banco
        db_tables = {
            'accounts',
            'permissions',
            'vrp_srv_data',
            'characters',
            'charskins',
            'sv_banking_data',
            'vrp_user_data',
            'accounts_ids',
            'smartbank_accounts',
            'smartbank_cards',
            'smartbank_fines',
            'smartbank_statements',
            'vehicles',
            'users',
            'players',
            'will_battlepass',
            'will_sprays',
            'will_ficha',
            'will_homes',
            'will_rent',
            'will_conce',
            'will_login',
            'will_jobs',
            'ox_inventory',
            'ld_tunners',
            'cloakrooms',
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
        err = "Não foi possível achar um identificador.",
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

Reborn.frameworkTables = function()
    -- Usar tabelas das outras frameworks
    return {
        -- ESX
        ['users'] = true,
        ['owned_vehicles'] = true,

        -- QBCore
        ['players'] = true,
        ['player_vehicles'] = true,
    }
end

Reborn.dbSimilarTables = function()
    return {

        -- VRP

        { ['Old'] = "vrp_user_vehicles", ['New'] = "vehicles",
            ['Columns'] = {
                ['detido'] = "arrest",
                ['ipva'] = "time",
            }
        },
        { ['Old'] = "vrp_vehicles", ['New'] = "vehicles" },
        { ['Old'] = "vrp_user_identities", ['New'] = "characters",
            ['Columns'] = {
                ['user_id'] = "id",
                ['firstname'] = "name",
                ['name'] = "name2",
            }
        },
        { ['Old'] = "vrp_infos", ['New'] = "accounts" },
        { ['Old'] = "vrp_users", ['New'] = "characters" },
        { ['Old'] = "vrp_user_moneys", ['New'] = "characters",
            ['Columns'] = {
                ['user_id'] = "id",
                ['wallet'] = "bank",
            }
        },

        -- SUMMERZ

        { ['Old'] = "summerz_propertys", ['New'] = "vrp_homes" },
        { ['Old'] = "summerz_vehicles", ['New'] = "vehicles",
            ['Columns'] = {
                ['tax'] = 'time',
            }
        },
        { ['Old'] = "summerz_fidentity", ['New'] = "characters" },
        { ['Old'] = "summerz_entitydata", ['New'] = "vrp_srv_data" },
        { ['Old'] = "summerz_playerdata", ['New'] = "vrp_user_data" },
        { ['Old'] = "summerz_accounts", ['New'] = "accounts" },
        { ['Old'] = "summerz_characters", ['New'] = "characters" },
    }
end

GlobalState['DbSimilarTables'] = Reborn.dbSimilarTables()