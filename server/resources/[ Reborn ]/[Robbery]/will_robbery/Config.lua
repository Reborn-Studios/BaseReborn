Webhooks = module("config/webhooks") or {}

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

Config.framework = "vrp"        -- qb / esx / vrp

Config.target = "ox-target"        -- qb-target / ox-target / target / false

Config.debug = false

Config.webhook = Webhooks.rouboshook             -- Webhooks

Config.robberys = {
    ['Arts'] = {
        ['enabled'] = true,
        ['name'] = "Roubo a Artes",     -- Nome do roubo
        ["requiredPoliceCount"] = 0,    -- Minimo de policiais necessarios
        ["nextRob"] = 1800,             -- Tempo para iniciar o outro roubo (Segundos)
        -- Inicio do roubo
        ['startHeist'] ={
            pos = vector3(244.346, 374.012, 105.738),
            peds = {
                {pos = vector3(244.346, 374.012, 105.738), heading = 156.39, ped = 's_m_m_highsec_01'},
                {pos = vector3(243.487, 372.176, 105.738), heading = 265.63, ped = 's_m_m_highsec_02'},
                {pos = vector3(245.074, 372.730, 105.738), heading = 73.3, ped = 's_m_m_fiboffice_02'}
            }
        },
        -- Local da venda das pinturas
        ['sellPainting'] ={
            pos = vector3(288.558, -2981.1, 5.90696),
            peds = {
                {pos = vector3(288.558, -2981.1, 5.90696), heading = 135.88, ped = 's_m_m_highsec_01'},
                {pos = vector3(287.190, -2980.9, 5.72252), heading = 218.0, ped = 's_m_m_highsec_02'},
                {pos = vector3(287.731, -2982.6, 5.82852), heading = 336.08, ped = 's_m_m_fiboffice_02'}
            }
        },
        -- Item de recompensa
        ['rewardItem'] = "dollars2",
        -- Local das pinturas
        ["painting"] = {
            {
                rewardItem = 'paintinge',
                paintingPrice = 5000,
                scenePos = vector3(1400.486, 1164.55, 113.4136),
                sceneRot = vector3(0.0, 0.0, -90.0),
                object = 'ch_prop_vault_painting_01e',
                objectPos = vector3(1400.946, 1164.55, 114.5336),
                objHeading = 270.0
            },
            {
                rewardItem = 'paintingi',
                paintingPrice = 5000,
                scenePos = vector3(1408.175, 1144.014, 113.4136),
                sceneRot = vector3(0.0, 0.0, 180.0),
                object = 'ch_prop_vault_painting_01i',
                objectPos = vector3(1408.175, 1143.564, 114.5336),
                objHeading = 180.0
            },
            {
                rewardItem = 'paintingh',
                paintingPrice = 5000,
                scenePos = vector3(1407.637, 1150.74, 113.4136),
                sceneRot = vector3(0.0, 0.0, 0.0),
                object = 'ch_prop_vault_painting_01h',
                objectPos = vector3(1407.637, 1151.17, 114.5336),
                objHeading = 0.0
            },
            {
                rewardItem = 'paintingj',
                paintingPrice = 5000,
                scenePos = vector3(1408.637, 1150.74, 113.4136),
                sceneRot = vector3(0.0, 0.0, 0.0),
                object = 'ch_prop_vault_painting_01j',
                objectPos = vector3(1408.637, 1151.17, 114.5336),
                objHeading = 0.0
            },
            {
                rewardItem = 'paintingf',
                paintingPrice = 5000,
                scenePos = vector3(1397.586, 1165.579, 113.4136),
                sceneRot = vector3(0.0, 0.0, 90.0),
                object = 'ch_prop_vault_painting_01f',
                objectPos = vector3(1397.136, 1165.579, 114.5336),
                objHeading = 90.0
            },
            {
                rewardItem = 'paintingg',
                paintingPrice = 5000,
                scenePos = vector3(1397.976, 1165.679, 113.4136),
                sceneRot = vector3(0.0, 0.0, 0.0),
                object = 'ch_prop_vault_painting_01g',
                objectPos = vector3(1397.936, 1166.079, 114.5336),
                objHeading = 0.0
            },
        },
        ["objects"] = {
            'hei_p_m_bag_var22_arm_s',
            'w_me_switchblade'
        },
        ["animations"] = {
            {"top_left_enter", "top_left_enter_ch_prop_ch_sec_cabinet_02a", "top_left_enter_ch_prop_vault_painting_01a", "top_left_enter_hei_p_m_bag_var22_arm_s", "top_left_enter_w_me_switchblade"},
            {"cutting_top_left_idle", "cutting_top_left_idle_ch_prop_ch_sec_cabinet_02a", "cutting_top_left_idle_ch_prop_vault_painting_01a", "cutting_top_left_idle_hei_p_m_bag_var22_arm_s", "cutting_top_left_idle_w_me_switchblade"},
            {"cutting_top_left_to_right", "cutting_top_left_to_right_ch_prop_ch_sec_cabinet_02a", "cutting_top_left_to_right_ch_prop_vault_painting_01a", "cutting_top_left_to_right_hei_p_m_bag_var22_arm_s", "cutting_top_left_to_right_w_me_switchblade"},
            {"cutting_top_right_idle", "_cutting_top_right_idle_ch_prop_ch_sec_cabinet_02a", "cutting_top_right_idle_ch_prop_vault_painting_01a", "cutting_top_right_idle_hei_p_m_bag_var22_arm_s", "cutting_top_right_idle_w_me_switchblade"},
            {"cutting_right_top_to_bottom", "cutting_right_top_to_bottom_ch_prop_ch_sec_cabinet_02a", "cutting_right_top_to_bottom_ch_prop_vault_painting_01a", "cutting_right_top_to_bottom_hei_p_m_bag_var22_arm_s", "cutting_right_top_to_bottom_w_me_switchblade"},
            {"cutting_bottom_right_idle", "cutting_bottom_right_idle_ch_prop_ch_sec_cabinet_02a", "cutting_bottom_right_idle_ch_prop_vault_painting_01a", "cutting_bottom_right_idle_hei_p_m_bag_var22_arm_s", "cutting_bottom_right_idle_w_me_switchblade"},
            {"cutting_bottom_right_to_left", "cutting_bottom_right_to_left_ch_prop_ch_sec_cabinet_02a", "cutting_bottom_right_to_left_ch_prop_vault_painting_01a", "cutting_bottom_right_to_left_hei_p_m_bag_var22_arm_s", "cutting_bottom_right_to_left_w_me_switchblade"},
            {"cutting_bottom_left_idle", "cutting_bottom_left_idle_ch_prop_ch_sec_cabinet_02a", "cutting_bottom_left_idle_ch_prop_vault_painting_01a", "cutting_bottom_left_idle_hei_p_m_bag_var22_arm_s", "cutting_bottom_left_idle_w_me_switchblade"},
            {"cutting_left_top_to_bottom", "cutting_left_top_to_bottom_ch_prop_ch_sec_cabinet_02a", "cutting_left_top_to_bottom_ch_prop_vault_painting_01a", "cutting_left_top_to_bottom_hei_p_m_bag_var22_arm_s", "cutting_left_top_to_bottom_w_me_switchblade"},
            {"with_painting_exit", "with_painting_exit_ch_prop_ch_sec_cabinet_02a", "with_painting_exit_ch_prop_vault_painting_01a", "with_painting_exit_hei_p_m_bag_var22_arm_s", "with_painting_exit_w_me_switchblade"},
        },
    },
    ['ATM'] = {
        enabled = true,
        name = "Roubo a ATM",           -- Nome do roubo
        RequiredPoliceCount = 0,        -- Numero minimo de policiais para iniciar
        CooldownTimer = 60,             -- Cooldown em segundos para iniciar outro roubo
        EnableDrilling = true,          -- Ativar roubo por furadeira
        DrillItem = false,              -- Item de furadeira para roubar
        EnableHacking = true,           -- Ativar roubo por hacking
        HackItem = false,               -- Item de hack para roubar
        MoneyDrop = true,               -- Dropar dinheiro no chão
        Hacking = {
            Minigame = 'utk_fingerprint',   -- memorygame, mhacking, utk_fingerprint
            InitialHackDuration = 2000,     -- 2 segundos
            LootAtmDuration = 20000         -- 20 segundos
        },
        Reward = {
            item = 'dollars2',          -- Item para entregar
            amount = 1000,              -- Valor multiplicado pelos cash_pile
            hack_cash_pile = 10,        -- Pilha de dinheiro apos hacker
            drill_cash_pile = 5,        -- Pilha de dinheiro apos furar
        },
        AtmModels = {'prop_fleeca_atm', 'prop_atm_01', 'prop_atm_02', 'prop_atm_03'},
    },
    ['Betta'] = {
        ['enabled'] = true,
        ['name'] = "Roubo ao Banco Betta",
        ['requiredPoliceCount'] = 0,        -- Policiais necessarios para roubar
        ['nextRob'] = 10,                   -- Segundos para o proximo roubo
        -- Inicio do roubo
        ['startHeist'] ={
            pos = vector3(-1419.7, -676.23, 26.7605),
            peds = {
                {pos = vector3(-1419.7, -676.23, 26.7605), heading = 78.4, ped = 's_m_m_highsec_01'},
                {pos = vector3(-1420.3, -675.34, 26.7246), heading = 168.78, ped = 's_m_m_highsec_02'},
                {pos = vector3(-1420.5, -676.88, 26.7605), heading = 356.42, ped = 's_m_m_fiboffice_02'}
            }
        },
        -- Itens necessarios para roubar (Ordem é importante)
        ['requiredItems'] = {
            'bag',
            'drill',
            'drill',
            'thermite_h',
            'cutter'
        },
        -- Itens de recompensa, ordem é importante
        ['rewardItems'] = {
            { itemName = 'goldbar', count = 1, sellPrice = 100 },
            { itemName = 'diamond', count = 1, sellPrice = 100 },
        },
        ['rewardMoneys'] = {
            ['stacks'] = function()
                return math.random(50000, 100000)
            end,
        },
        ['rewardLockbox'] = function()
            local random = math.random(#Config.robberys['Betta']['rewardItems'])
            local lockboxBag = {
                item = Config.robberys['Betta']['rewardItems'][random]['itemName'],
                count = math.random(1, 5),
            }
            return lockboxBag
        end,
        ['drillTime'] = 30,         -- Tempo para furar
        -- Itens para dar como recompensa
        ['black_money'] = {
            status = true,
            itemName = 'dollars2'
        },
        -- Local para finalizar o roubo
        ['finishHeist'] = {
            buyerPos = vector3(1104.28, -2287.5, 29.1784)
        },
        -- Locais do roubo
        ['BettaSetup'] = {
            ['main'] = vector3(-1220.7, -341.21, 37.7323),
            ['trollys'] = {
                {coords = vector3(-1221.6, -343.99, 36.7322), heading = 343.0, type = 'diamond'},
                {coords = vector3(-1219.5, -342.73, 36.7322), heading = 118.0, type = 'gold'},
            },
            ['actions'] = {
                ['lockbox_1']      =  {coords  = vector3(-1220.7, -341.21, 37.7323), heading = 27.0, length = 1.8,  width = 0.5, debugPoly = false, minZ = 37.2160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Furar caixa", scene = 'lockbox_1',      canInteract = function() return not HeistSync['lockbox_1'] end}},     distance = 1.5},
                ['lockbox_2']      =  {coords  = vector3(-1222.3, -341.22, 37.7403), heading = 117.0, length = 1.8, width = 0.5, debugPoly = false, minZ = 37.2160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Furar caixa", scene = 'lockbox_2',      canInteract = function() return not HeistSync['lockbox_2'] end}},     distance = 1.5},
                ['trolly_1']       =  {coords  = vector3(-1221.6, -343.99, 36.7322), heading = 77.0, length = 1.0,  width = 0.5, debugPoly = false, minZ = 37.2160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Grab trolly",   scene = 'trolly_1',       canInteract = function() return not HeistSync['trolly_1'] end}},      distance = 1.5},
                ['trolly_2']       =  {coords  = vector3(-1219.5, -342.73, 36.7322), heading = 27.0, length = 1.0,  width = 0.5, debugPoly = false, minZ = 37.2160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Grab trolly",   scene = 'trolly_2',       canInteract = function() return not HeistSync['trolly_2'] end}},      distance = 1.5},
                ['stack']          =  {coords  = vector3(-1218.7, -345.93, 37.7322), heading = 27.0, length = 1.0,  width = 1.0, debugPoly = false, minZ = 37.5160, maxZ = 37.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Pegar montante",    scene = 'stack',          canInteract = function() return not HeistSync['stack'] end}},         distance = 1.5},
                ['bolt_cutter']    =  {coords  = vector3(-1220.2, -343.99, 37.7322), heading = 27.0, length = 0.2,  width = 0.2, debugPoly = false, minZ = 37.5160, maxZ = 38.160, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Cortar tranca",      scene = 'bolt_cutter',    canInteract = function() return not HeistSync['bolt_cutter'] end}},   distance = 1.5},
                ['vault_drill']    =  {coords  = vector3(-1223.7, -343.42, 37.7322), heading = 27.0, length = 1.5,  width = 1.0, debugPoly = false, minZ = 36.5160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Colocar drill",   scene = 'vault_drill',    canInteract = function() return not HeistSync['vault_drill'] end}},   distance = 1.5},
                ['enter_thermite'] =  {coords  = vector3(-1230.1, -337.27, 37.6160), heading = 27.0, length = 0.5,  width = 2.0, debugPoly = false, minZ = 36.5160, maxZ = 38.960, options = {{type = "client", event = "bettaheist:client:actions", icon = "fa-solid fa-hand", label = "Plantar termita",scene = 'enter_thermite', canInteract = function() return not HeistSync['enter_thermite'] end}},distance = 1.5},
            }
        }
    },
    ['Helicopter'] = {
        ['enabled'] = true,
        ['name'] = "Roubo a Helicoptero",
        ['requiredPoliceCount'] = 0,    -- Policiais necessarios para roubar
        ['nextRob'] = 1800,             -- Segundos para o proximo roubo
        -- Inicio de roubo
        ['startHeist'] = {
            pos = vector3(44.0880, -106.9069, 55.0743),
        },
        -- Local do Ped para inicio do roubo
        ['ManagerPed'] = {
            model = "cs_bankman",                               -- Modelo do ped
            location = vector3(44.0880, -106.9069, 55.0743),    -- Local do ped
            heading = 333.0,
            enableBlip = true
        },
        ['ManagerBlip'] = {
            enable = true,
            sprite = 280,
            color = 2,
            scale = 0.8,
            label = "Chefe Helicoptero"
        },
        ['HelicopterBlip'] = {
            enable = true,
            sprite = 43,
            color = 1,
            scale = 1.2,
            label = "Local do Helicoptero"
        },
        -- Todos inimigos que serao spawnados
        ['Enemies'] = {
            { model = "g_m_m_chicold_01", weapon = "WEAPON_SMG" },
            { model = "g_m_m_chicold_01", weapon = "WEAPON_CARBINERIFLE" },
            { model = "g_m_m_chicold_01", weapon = "WEAPON_ASSAULTRIFLE" }
            -- adicionar mais se quiser
        },
        ['EnableReward'] = true,
        ['RewardItem'] = 'dollars2',        -- Item de recompensa
        ['RewardCash'] = 10000,             -- Total da recompensa
        ['EnemyLocationOffset'] = vector3(0, 5, 0),
        ['HelicopterModel'] = "buzzard2",       -- Modelo do heli
        ['HelipadLocation'] = vector4(-745.75, -1468.96, 5.0, 90.0),    -- Local do heli
        ['FinishCoords'] = vector3(2671.58,3520.81,52.68)               -- Local para entregar o heli
    },
    ['Jewelry'] = {
        enabled = true,
        name = "Roubo a Joalheria",
        RobberyTime = 10,           -- Tempo para iniciar roubo
        Cooldown = 30,              -- Tempo para iniciar roubo novamente
        AutoLock = true,            -- Trancar automaticamente
        RequiredPolice = 0,         -- Policias necessarios para roubar
        DoorLock = "ox",            -- Tipo de tranca para portas
        -- Local de inicio do roubo
        Locations = {
            name = 'Joalheria Vangelico',
            coords = vec3(-630.5, -237.13, 38.08),
            doors = {
                752, 753
            },
            thermite = {
                coords = vec4(-596.02, -283.7, 50.4, 300.0),
                amination = vec4(-596.02, -283.7, 50.4, 304.5),
                effect = vec3(-596.02, -283.7, 50.19)
            },
            hack = {

            }
        },
        Alerts = {
            startThermite = 50,
            successThermite = 100,
            failThermite = false
        },
        Thermite = {
            item = 'thermite_h',
            time = 60,
            gridsize = 5,
            incorrectBlocks = 10
        },
        -- Alarme e tempo que ficara tocando
        SoundAlarm = {
            enable = true,
            time = 60
        },
        -- Itens de recompensa
        Rewards = {
            {
                chance = 100,
                item = 'goldbar',
                amount = { min = 1, max = 2 }
            },
            {
                chance = 5,
                item = 'diamond',
                amount = 1
            }
        },
        -- Armas permitidas para quebrar a vitrine
        WhitelistWeapons = {
            'weapon_assaultrifle',
            'weapon_carbinerifle',
            'weapon_pumpshotgun',
            'weapon_sawnoffshotgun',
            'weapon_compactrifle',
            'weapon_autoshotgun',
            'weapon_crowbar',
            'weapon_pistol',
            'weapon_pistol_mk2',
            'weapon_combatpistol',
            'weapon_appistol',
            'weapon_pistol50',
            'weapon_microsmg'
        },
        -- Todas vitrines para quebrar
        Vitrines = {
            {
                coords = vec4(-626.83, -235.35, 38.05, 35.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-625.81, -234.7, 38.05, 35.0),
                props = {
                    pre = 'des_jewel_cab4_start',
                    post = 'des_jewel_cab4_end'
                }
            },
            {
                coords = vec4(-626.95, -233.14, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-628.0, -233.86, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-625.7, -237.8, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-626.7, -238.58, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab2_start',
                    post = 'des_jewel_cab2_end'
                }
            },
            {
                coords = vec4(-624.55, -231.06, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab4_start',
                    post = 'des_jewel_cab4_end'
                }
            },
            {
                coords = vec4(-623.13, -232.94, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-620.29, -234.44, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-619.15, -233.66, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-620.19, -233.44, 38.05, 35.0),
                props = {
                    pre = 'des_jewel_cab4_start',
                    post = 'des_jewel_cab4_end'
                }
            },
            {
                coords = vec4(-617.63, -230.58, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab2_start',
                    post = 'des_jewel_cab2_end'
                }
            },
            {
                coords = vec4(-618.33, -229.55, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-619.7, -230.33, 38.05, 125.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-620.95, -228.6, 38.05, 125.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-619.79, -227.6, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab2_start',
                    post = 'des_jewel_cab2_end'
                }
            },
            {
                coords = vec4(-620.42, -226.6, 38.05, 305.0),
                props = {
                    pre = 'des_jewel_cab_start',
                    post = 'des_jewel_cab_end'
                }
            },
            {
                coords = vec4(-623.94, -227.18, 38.05, 35.0),
                props = {
                    pre = 'des_jewel_cab4_start',
                    post = 'des_jewel_cab4_end'
                }
            },
            {
                coords = vec4(-624.91, -227.87, 38.05, 35.0),
                props = {
                    pre = 'des_jewel_cab3_start',
                    post = 'des_jewel_cab3_end'
                }
            },
            {
                coords = vec4(-623.94, -228.05, 38.05, 215.0),
                props = {
                    pre = 'des_jewel_cab2_start',
                    post = 'des_jewel_cab2_end'
                }
            }
        }
    },
    ['Kidnapping'] = {
        ['enabled'] = true,
        ['name'] = "Sequestro",
        ['requiredPoliceCount'] = 0,    -- Policiais necessarios para roubar
        ['nextNapping'] = 500,          -- Tempo de cooldown necessario para roubar
        -- Inicio de roubo
        ['start'] = {
            ped = {model = 'a_m_m_soucent_02', pos = vector3(-1383.1, -640.04, 28.6733), heading = 211.53}
        },
        -- Local das vitimas para sequestro
        ['randomSpawnCoords'] = {
            {pos = vector3(-833.02, -350.74, 38.6802), heading = 243.42},
            {pos = vector3(-197.90, -864.60, 29.3243), heading = 246.03},
            {pos = vector3(-20.242, -1721.1, 29.2882), heading = 22.81}
        },
        -- Local da cena de tortura
        ['query'] = {
            scenePos = vector3(568.450, -3123.8, 18.7686),
            sceneRot = vector3(0.0, 0.0, -90.0),
            laptopScenePos = vector3(565.9, -3123.0, 18.7686),
            laptopSceneRot = vector3(0.0, 0.0, 0.0),
            tripodPos = vector3(570.572, -3123.8, 17.7086),
            cameraPos = vector3(570.572, -3123.755, 19.2986),
            cameraHeading = -90.0
        },
        ['videoRecordItem'] = 'videorecord',            -- Item de gravacao
        ['pedToKidnapped'] = 'a_m_m_prolhost_01',       -- Ped para sequestrar
        ['RewardItem'] = 'dollars2',                    -- Item de recompensa
        ['rewardCash'] = 30000,                         -- Quantidade da recompensa
        -- Itens aleatorios para entregar apos vender a gravacao
        ['randomRewardItems'] = {
            'goldbar',
            'diamond'
        },
        ['objects_1'] = {
            'prop_cs_wrench'
        },
        ['animations_1'] = {
            {'wrench_idle_player', 'wrench_idle_victim', 'wrench_idle_chair', 'wrench_idle_wrench'},
            {'wrench_attack_left_player', 'wrench_attack_left_victim', 'wrench_attack_left_chair', 'wrench_attack_left_wrench'},
            {'wrench_attack_mid_player', 'wrench_attack_mid_victim', 'wrench_attack_mid_chair', 'wrench_attack_mid_wrench'},
            {'wrench_attack_right_player', 'wrench_attack_right_victim', 'wrench_attack_right_chair', 'wrench_attack_right_wrench'},
        },
        ['objects_2'] = {
            'w_am_jerrycan',
            'p_loose_rag_01_s'
        },
        ['animations_2'] = {
            {'waterboard_idle_player', 'waterboard_idle_victim', 'waterboard_idle_chair', 'waterboard_idle_jerrycan', 'waterboard_idle_rag'},
            {'waterboard_kick_player', 'waterboard_kick_victim', 'waterboard_kick_chair', 'waterboard_kick_jerrycan', 'waterboard_kick_rag'},
            {'waterboard_loop_player', 'waterboard_loop_victim', 'waterboard_loop_chair', 'waterboard_loop_jerrycan', 'waterboard_loop_rag'},
            {'waterboard_outro_player', 'waterboard_outro_victim', 'waterboard_outro_chair', 'waterboard_outro_jerrycan', 'waterboard_outro_rag'}
        },
        ['objects_3'] = {
            'prop_pliers_01'
        },
        ['animations_3'] = {
            {'pull_tooth_intro_player', 'pull_tooth_intro_victim', 'pull_tooth_intro_pliers'},
            {'pull_tooth_idle_player', 'pull_tooth_idle_victim', 'pull_tooth_idle_pliers'},
            {'pull_tooth_loop_player', 'pull_tooth_loop_victim', 'pull_tooth_loop_pliers'},
            {'pull_tooth_outro_b_player', 'pull_tooth_outro_b_victim', 'pull_tooth_outro_b_pliers'},
        }
    },
    ['Train'] = {
        ['enabled'] = true,
        ['name'] = 'Roubo ao trem',
        ['requiredPoliceCount'] = 0,        -- Policiais necessarios para roubar
        ['nextRob'] = 3600,                 -- Tempo para o proximo roubo
        -- Itens necessarios para roubar
        ['requiredItems'] = {
            'cutter',
            'bag'
        },
        -- Recompensa
        ['reward'] = {
            itemName = 'goldbar',
            grabCount = 25,
            sellPrice = 150,
            sellItem = "dollars2"
        },
        -- Inicio do roubo
        ['startHeist'] ={
            pos = vector3(-687.82, -2417.1, 13.9445),
            peds = {
                {pos = vector3(-686.43, -2417.5, 13.8945), heading = 23.22, ped = 's_m_m_highsec_01'},
                {pos = vector3(-687.82, -2417.1, 13.8945), heading = 320.78, ped = 's_m_m_highsec_02'},
                {pos = vector3(-688.89, -2416.3, 13.8945), heading = 291.42, ped = 's_m_m_fiboffice_02'}
            }
        },
        -- Guardas para spawnar
        ['guardPeds'] = {
            { coords = vector3(2850.67, 4535.49, 45.3924), heading = 270.87, model = 's_m_y_blackops_01'},
            { coords = vector3(2856.28, 4544.12, 45.3354), heading = 177.93, model = 's_m_y_blackops_01'},
            { coords = vector3(2869.90, 4530.26, 47.7877), heading = 354.93, model = 's_m_y_blackops_01'},
            { coords = vector3(2859.08, 4519.85, 47.9145), heading = 177.88, model = 's_m_y_blackops_01'},
            { coords = vector3(2843.78, 4521.66, 47.4138), heading = 268.28, model = 's_m_y_blackops_01'},
            { coords = vector3(2856.90, 4526.85, 48.6552), heading = 268.3, model = 's_m_y_blackops_01'},
            { coords = vector3(2878.67, 4556.77, 48.4119), heading = 359.44, model = 's_m_y_blackops_01'},
            { coords = vector3(2886.69, 4556.21, 48.4262), heading = 265.05, model = 's_m_y_blackops_01'},
        },
        -- Local para finalizar o roubo
        ['finishHeist'] = {
            buyerPos = vector3(-1690.6, -916.19, 6.78323)
        },
        -- Local para prepara roubo
        ['setupTrain'] = {
            pos = vector3(2872.028, 4544.253, 47.758),
            part = vector3(2883.305, 4557.646, 47.758),
            heading = 140.0,
            ['containers'] = {
                {
                    pos = vector3(2885.97, 4560.83, 48.0551), 
                    heading = 320.0, 
                    lock = {pos = vector3(2884.76, 4559.38, 49.22561), taken = false},
                    table = vector3(2886.55, 4561.53, 48.23),
                    golds = {
                        {pos = vector3(2886.05, 4561.93, 49.14), taken = false},
                        {pos = vector3(2887.05, 4561.13, 49.14), taken = false},
                    } 
                },
                {
                    pos = vector3(2880.97, 4554.83, 48.0551), 
                    heading = 140.0, 
                    lock = {pos = vector3(2882.15, 4556.26, 49.22561), taken = false},
                    table = vector3(2880.45, 4554.23, 48.23),
                    golds = {
                        {pos = vector3(2881.05, 4553.93, 49.14), taken = false},
                        {pos = vector3(2880.25, 4554.63, 49.14), taken = false},
                    } 
                }
            }
        }
    },
    ['Yacht'] = {
        enabled = true,
        name = 'Roubo a Yacht',
        RequiredCopsCount = 0,                  -- Policias necessarios para iniciar roubo
        Cooldown = 60,                          -- Tempo para iniciar roubo novamente
        MaxDistance = 120,                      -- O roubo finaliza apos essa distancia
        DisableControls = {170,168,24,257,25,263,32,34,31,30,45,22,44,23,288,289,170,167,73,199,59,71,72,36,47,264,257,140,141,142,143,75},
        -- Itens necessarios para o roubo
        Items = {
            HackingItem = {remove = false, item = 'hack_usb'},
            DrillingItem = {remove = false, item = 'yacht_drill'},
        },
        -- Item de recompensa
        RewardItem = 'dollars2',
        -- Coordenadas gerais
        Coords = {
            Start = vector3(-2031.4377, -1038.0327, 2.5636),
            KeypadCoords = vector3(-2069.735595, -1020.0855, 6.444),
            SafeHacking = vector3(-2070.3191, -1019.8993, 5.4842),
            SafeDoorCoords = vector3(-2069.56, -1019.29, 6.0424),
        },
        -- Local para vender os itens
        ItemsSellToBoss = {
            availableTime = 30, -- Em minutos, tempo necessario para o player vender os itens
            coords = vector4(-274.8105, 167.8665, 77.9090, 84.9507),
            model = 'a_m_m_eastsa_01',
            blip = {use = true, label = 'Items Sell', size = 0.9, sprite = 500, color = 2},
            ItemPrices = {
                {item = "goldbar", label = "Barra de ouro", sellprice = 2000},
                {item = "diamond", label = "Diamante", sellprice = 5000},
                {item = "expensive_champagne", label = "Champagne", sellprice = 700},
                {item = "laptop", label = "Laptop", sellprice = 700},
                {item = "laptop", label = "Laptop", sellprice = 700},
                {item = "goldbar", label = "Barra de ouro", sellprice = 700},
                {item = "cocaine", label = "Pack de drogas", sellprice = 700},
                {item = "weed", label = "Pack de drogas", sellprice = 700},
                {item = "paintinge", label = "Pintura", sellprice = 700},
                {item = "paintingi", label = "Pintura", sellprice = 700},
            }
        },
        -- Blips no mapa
        Blips = {
            HeistBlip = {Use = true, label = 'Yacht', size = 0.8, sprite = 455, color = 62},
            PoliceAlertBlip = {label = 'Roubo Yacht', size = 1.0, sprite = 161, color = 1},
            SafeHackBlip = {Use = false, label = 'Hackear', size = 0.8, sprite = 156, color = 62},
        },
        -- Marcadores
        Markers = {
            SafeHacking = {use = true, marker = 20, rgb = {233, 88, 69}, bobUpAndDown = false, rotate = false},
            LockBoxes = {use = true, marker = 20, rgb = {233, 88, 69}, bobUpAndDown = false, rotate = false},
            Trolleys = {use = true, marker = 20, rgb = {233, 88, 69}, bobUpAndDown = false, rotate = false},
        },

        SafeHackingPreset = {
            Levels = 3, -- levels is how many levels you want. Max is 4, Min is 1
            Lifes = 4,  -- lifes is how many life player has, Max is 6, Min is 1
            Time = 3, -- time is how much time player has in minutes, Max is 9, min is 1 (I highly recommend to set it between 3-1)
        },

        LockerChanceforReward = 50, -- Porcentagem
        LockerRewards = {
            {item = 'goldbar', label = 'Barra de ouro', count = {5, 10}},
            {item = 'diamond', label = 'Diamante', count = {5, 10}},
        },
        -- Item de recompensa
        TrollyReward = {item = "dollars2", label = "Money", count = 5000},
        -- Usar marcador nos loots
        HighlightNearLoots = true,
        CollectableLoots = {
            {item = "whiskey", label = "Whisky", object = "prop_bottle_richard", coords = vector3(-2083.281, -1013.483, 5.755), heading = 0.0, chancetospawn = 50}, -- the chance is in percentages
            {item = "laptop", label = "Laptop", object = "prop_laptop_02_closed", coords = vector3(-2089.171, -1012.758, 5.782), heading = 0.0, chancetospawn = 60},
            {item = "laptop", label = "Laptop", object = "prop_laptop_02_closed", coords = vector3(-2058.118, -1024.084, 12.001), heading = 0.0, chancetospawn = 70},
            {item = "goldbar", label = "Gold Award", object = "ex_prop_exec_award_gold", coords = vector3(-2096.027, -1007.098, 5.750), heading = 0.0, chancetospawn = 50},
            {item = "cocaine", label = "Drug Pack", object = "hei_prop_hei_drug_pack_02", coords = vector3(-2093.656, -1015.328, 9.074), heading = 80.0, chancetospawn = 90},
            {item = "weed", label = "Drug Pack", object = "ex_office_swag_drugbags", coords = vector3(-2078.893, -1021.743, 5.850), heading = 180.0, chancetospawn = 90},
            {item = "cocaine", label = "Drug Pack", object = "hei_prop_hei_drug_pack_01a", coords = vector3(-2083.006, -1019.682, 12.739), heading = -17.0, chancetospawn = 100},
        },
        -- Usar marcador nas pinturas
        HighlightNearArts = true,
        ArtSteal = {
            {item = "paintinge", label = "Painting", object = 'ch_prop_vault_painting_01e', coords = vector3(-2085.606, -1021.154, 5.973), heading = 162.0, chancetospawn = 100},
            {item = "paintingi", label = "Painting", object = 'ch_prop_vault_painting_01h', coords = vector3(-2090.608, -1009.536, 5.926), heading = -107.36, chancetospawn = 100},
        },
        -- Guardas para proteçao
        Guards = {
            {
                coords = vector3(-2037.0341, -1027.6553, 5.8820),
                pedModel = "s_m_m_highsec_01",
                weapon = "WEAPON_ASSAULTRIFLE",
            },
            {
                coords = vector3(-2042.3258, -1038.4536, 5.8827),
                pedModel = "s_m_m_highsec_01",
                weapon = "WEAPON_ASSAULTRIFLE",
            },
            {
                coords = vector3(-2081.3970, -1025.9827, 5.8828),
                pedModel = "s_m_m_highsec_01",
                weapon = "WEAPON_ASSAULTRIFLE",
            },
            {
                coords = vector3(-2074.9980, -1018.6064, 5.8841),
                pedModel = "s_m_m_highsec_01",
                weapon = "WEAPON_ASSAULTRIFLE",
            },
            {
                coords = vector3(-2074.3450, -1014.7513, 5.8820),
                pedModel = "s_m_m_highsec_01",
                weapon = "WEAPON_ASSAULTRIFLE",
            },
        },
        -- Locais das caixas para abrir
        Lockboxes = {
            {
                coords = vector3(-2067.530, -1018.543, 4.878),
                heading = -18.0
            },
            {
                coords = vector3(-2066.751, -1019.933, 4.878),
                heading = -107.0
            },
            {
                coords = vector3(-2067.333, -1021.842, 4.878),
                heading = -107.0
            },
            {
                coords = vector3(-2068.845, -1022.527, 4.878),
                heading = 162.0
            },
        },
        -- Montante de dinheiro
        Trolleys = {
            {
                model = "hei_prop_hei_cash_trolly_01",
                coords = vector3(-2068.983, -1020.724, 4.8820),
                heading = 160.0,
            },
        },
        Animations = {
            ["keypadHacking"] = "anim_heist@hs3f@ig1_hack_keypad@arcade@male@",
        },
        Props = {
            ["door"] = "ch_prop_ch_vault_d_door_01a",
            ["usb"] = "ch_prop_ch_usb_drive01x",
            ["phone"] = "prop_phone_ing",
            ["keypad"] = "prop_ld_keypad_01b",
            ["tablet"] = "prop_cs_tablet",
        },
        MoneyForm = '$',
        HelpNotify = {
            [1] = {'Pressione ~INPUT_PICKUP~ para cortar à direita', 38},
            [2] = {'Pressione ~INPUT_PICKUP~ para cortar para baixo', 38}, 
            [3] = {'Pressione ~INPUT_PICKUP~ para cortar à esquerda', 38},
        },
        Texts = {
            [1] = {'[E] - Para iniciar o roubo ao iate', 38},
            [2] = {'[E] - Para começar a hackear o cofre', 38},
            [3] = {'[E] - Para começar a furar o armário', 38},
            [4] = {'[E] - Para pegar o dinheiro', 38},
            [5] = {'[E] - Para roubar o item', 38},
            [6] = {'[E] - Para roubar a pintura', 38},
            [7] = {'[E] - Para vender os itens', 38},
        },
        Notify = {
            [1] =  {'Notificação', "Já existe um assalto em andamento.", 5000, 'error'},
            [2] =  {'Notificação', "Não há policiais suficientes na cidade!", 5000, 'error'},
            [3] =  {'Notificação', "O assalto começou!", 5000, 'success'},
            [4] =  {'Notificação', "O hack falhou!", 5000, 'error'},
            [5] =  {'Notificação', "O assalto terminou!", 5000, 'success'},
            [6] =  {'Notificação', "Você hackeou o cofre com sucesso!", 5000, 'success'},
            [7] =  {'Notificação', "Você não tem o item correto para fazer isso!", 5000, 'error'},
            [8] =  {'Notificação', "Você vendeu:", 5000, 'success'},
            [9] =  {'Notificação', "Você conseguiu:", 5000, 'success'},
            [10] = {'Notificação', "Você não tem nada para vender!", 5000, 'error'},
            [11] = {'Notificação', "Venda os itens no local designado!", 10000, 'info'},
            [12] = {'Notificação', "Acabou o tempo! O Chefe foi embora!", 5000, 'error'},
            [13] = {'Notificação', "Roubo ao iate em andamento. Marcado no mapa!", 5000, 'info'},
            [14] = {'Notificação', "Você está muito longe para iniciar o assalto!", 5000, 'error'},
            [15] = {'Notificação', "Houve um assalto há pouco tempo, você precisa esperar!", 5000, 'error'},
            [16] = {'Notificação', "O roubo ao iate terminou!", 5000, 'info'},
        },
    },
}

Config.notifications = {
    ['steal_blip'] = 'Mansão Madrazo',
    ['sell_blip'] = 'Clientes de Pintura',
    ['start_stealing'] = 'Para roubar',
    ['cute_right'] = 'Para cortar à direita',
    ['cute_left'] = 'Para cortar à esquerda',
    ['cute_down'] = 'Para cortar para baixo',
    ['go_steal'] = 'Vá para a Mansão Madrazo e roube a pintura.',
    ['go_sell'] = 'Vá para o blip e entregue o roubo.',
    ['already_cuting'] = 'Você já está roubando.',
    ['already_heist'] = { type = "negado", message = 'Você já começou o assalto. Espere até terminar.' },
    ['start_heist'] = 'Para começar o assalto',
    ['sell_painting'] = 'Para vender a pintura',
    ['wait_nextrob'] = 'Você precisa esperar esse tempo para despir novamente',
    ['minute'] = 'Minuto',
    ['police_alert'] = 'Alerta de roubo de arte! Verifique o seu GPS.',
    ['no_switchblade'] = 'Você não está armado com uma faca de abertura automática',
    ['need_police'] = 'Não há policiais suficientes na cidade.',
    ['betta_blip'] = 'Banco Betta',
    ['heist_info'] = 'Vá para a localização no GPS.',
    ['heist_info2'] = 'Itens necessários para o assalto: Bolsas, furadeiras, termita e cortador de vidro.',
    ['drill_bar'] = 'FURANDO',
    ['need_this'] = 'Você precisa disso: ',
    ['total_money'] = 'Você conseguiu isso: ',
    ['not_cop'] = 'Você não é um policial!',
    ['buyer_blip'] = 'Comprador',
    ['deliver_to_buyer'] = 'Entregue o saque ao comprador. Verifique o GPS.',

    ['attack_left'] = 'Para atacar à esquerda',
    ['attack_mid'] = 'Para atacar ao meio',
    ['attack_right'] = 'Para atacar à direita',
    ['switch_jerrycan'] = 'Para trocar o galão de gasolina',
    ['switch_pliers'] = 'Para trocar o alicate',
    ['tooth_pull'] = 'Para arrancar o dente',
    ['tooth_rip'] = 'Para rasgar o dente',
    ['blindfold'] = 'Para usar o capuz',
    ['cant_blindfold'] = 'Você está muito longe',
    ['query_room_busy'] = 'Sala de interrogatório ocupada, aguarde um pouco.',
    ['wait_nextnapping'] = 'Você precisa esperar este tempo para despir novamente',
    ['get_job'] = 'Para pegar o trabalho',
    ['finish_job'] = 'Para terminar o trabalho',
    ['get_videorecord'] = 'Para pegar a gravação de vídeo',
    ['check_videorecord'] = 'Para verificar a gravação de vídeo',
    ['go_laptop'] = 'Vá para o laptop para verificar a gravação de vídeo.',
    ['mission_failed'] = 'Missão falhou. A pessoa sequestrada está morta.',
    ['mission_failed2'] = 'Missão falhou. Você se afastou da pessoa sequestrada.',
    ['kidnap_blip'] = 'Alguém para ser sequestrado',
    ['boss_blip'] = 'Vender gravação de vídeo',
    ['info_1'] = 'Quero que você encontre alguém. Verifique o GPS. Há algumas coisas que você deve perguntar a esse homem.',
    ['info_2'] = 'Você pode liberá-lo depois de obter as respostas que deseja. Você deve ter as respostas.',
    ['info_3'] = 'Não se esqueça de gravar o vídeo!',
    ['go_query'] = 'Vá para a sala de interrogatório.',
    ['start_query'] = 'Para começar o interrogatório',
    ['leave_vehicle'] = 'Para sair do carro',
    ['drop_chair'] = 'Para largar a cadeira',
    ['pour_gasoline'] = 'Para derramar gasolina',
    ['up_chair'] = 'Para levantar a cadeira',
    ['cutting'] = 'Para cortar',
    ['grab'] = 'Para pegar',
    ['goto_ambush'] = 'Vá para o ponto de emboscada no GPS. Mate os guardas, procure nos contêineres da Merryweather e roube o ouro.',
    ['ambush_blip'] = 'Ponto de Emboscada',

    ["jewellery_store"] = "Joalheria",
    ["smash_vitrine"] = "Quebre a vitrine",
    ["smash_progress"] = "Quebrando vitrine",
    ["blow_fuse_box"] = "Explodir caixa de fusíveis",

    ["notification_store_is_hit"] = "Roubo à loja já está em andamento",
    ["notification_not_enough_police"] = "Não há policiais suficientes na cidade",
    ["notification_no_item"] = "Você não tem o item necessário",
    ["notification_left_fingerprint"] = "Deixou uma impressão digital",
    ["notification_on_cooldown"] = "Joalheria está em espera (%s Minutos)",
    ["notification_thermite_fail"] = "Você falhou no hack",
    ["notification_thermite_success"] = "As portas %s foram desbloqueadas",
    ["notification_invalid_weapon"] = "Você não pode quebrar a vitrine com esta arma",
    ["notification_time_left"] = "Você tem %s Minutos até a loja fechar",
    ["notification_doors_locked"] = "As portas foram trancadas!",
}