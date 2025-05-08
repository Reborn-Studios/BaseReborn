-----#######################################--
--##            VRP 
-----#######################################--

Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
Reborn = Proxy.getInterface("Reborn")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config.base = "creative"                        -- vrpex / creative (v1 a v3) / summerz (creative v4 e v5)

--### BANCO DE DADOS ###--
Config.Mysql = "oxmysql"                        -- mysql-async // oxmysql // ghmattimysql
Config.vehicleDB = "vehicles"               -- Tabela dos veiculos

Config.imgDiret = Reborn.images()               -- Diretorio de imagens para os carros

Config.deleteNearVeh = true                     -- Botão para deletar veiculo proximo
Config.pick_cars = true                         -- Abrir opçoes de veiculos ao entrar em garagem sem vaga

Config.SellCar = {                              -- Opção de venda de carros
    ['Enabled'] = true,
    ['Porcent'] = 70
}

Config.TransferCar = true                       -- Opção de transferência de carro

Config.serverSpawn = true                       -- Spawnar carro pelo server-side

Config.robberyVehs = {
    ['Enabled'] = true,                         -- Guardar veiculo de outra pessoa na garagem
    ['Days_stealed'] = 2,                       -- Dias para o carro roubado permanecer
    ['Vehs_limit'] = 5                          -- Limite de carros que pode guardar na garagem (Funciona apenas se usar a opção Config.guardar_outro_veh)
}

Config.disable_veh_peds = true                 -- Desativar veiculos de npc

Config.car_by_garage = false                    -- Spawnar carro em apenas garagem que foi guardado

Config.interior_by_player = false               -- Interior proprio para player. Exceçções podem ser feitas:
                                                -- Dentro da Config das garagens, utilize: ["public"] = true -->> Exemplo: garagem 2 (praça)

Config.dist_in_garage = 100                     -- Distancia de segurança dentro do interior da garagem

Config.backupGarage = vector3(55.63,-879.52,30.37)

Config.debug = false                             -- Mensagens para controle da garagem

Config.collision_stop = {
    ['Distance'] = 7,                           -- Ao se distanciar da saida, o carro volta a ter colisão
    ['Time'] = 12,                              -- Após esses segundos, o carro volta a ter colisão
}

Config.blip_distance = {
    ['Normal'] = 7.0,                             -- Distancia do blip quando está a pé
    ['Veiculo'] = 9.0                             -- Distancia do blip quando está de carro
}

Config.vehicleTypes = {
    ["carros"] = "Nativo",
    ["motos"] = "Moto",
    ["work"] = "Serviço",
    ["automobile"] = "cars",
    ["bike"] = "bikes",
    ["boat"] = "boats",
    ["heli"] = "work",
    ["plane"] = "work",
    ["submarine"] = "work",
    ["trailer"] = "work",
    ["train"] = "work",
}

Config.defaultValues = {
    ["carros"] = 100000,
    ["motos"] = 100000,
    ["work"] = -1,
    ["automobile"] = 100000,
    ["bike"] = 100000,
    ["boat"] = -1,
    ["heli"] = -1,
    ["plane"] = -1,
    ["submarine"] = -1,
    ["trailer"] = -1,
    ["train"] = -1,
}
-----##########################################################-----
--###          BLACKLISTS
-----##########################################################-----

Config.BlacklistVehicles = {
    ["Garagem_gigante"] = {},
    ["Garagem_luxo"] = {
        "phantom"
    },
    ["Garagem_maior"] = {
        "benson",
        "hauler",
        "hauler2",
        "mule",
        "mule2",
        "mule3",
        "mule4",
        "phantom"
    },
    ["Garagem_media"] = {
        "benson",
        "hauler",
        "hauler2",
        "mule",
        "mule2",
        "mule3",
        "mule4",
        "phantom"
    },
    ["Garagem_menor"] = {
        "benson",
        "hauler",
        "hauler2",
        "mule",
        "mule2",
        "mule3",
        "mule4",
        "phantom"
    },
}

Config.exclusiveGarages = {}

-----##########################################################-----
--###          GARAGENS INTERIORES
-----##########################################################-----

Config.interior_garages = {
    ["Garagem_menor"] = {
        ["saida"] = { 
            ["blip"] = { 179.07,-1000.89,-98.99 },
            ["veiculo"] = { 174.3,-1006.27,-99.42,0.24 }
         },
        ["spawns"] = {
            { 170.69,-1002.71,-99.42,180.49 },
            { 175.01,-1001.74,-99.42,90.33 },
        }
    },
    ["Garagem_media"] = {
        ["saida"] = { 
            ["blip"] = { 207.05,-999.02,-98.99 },
            ["veiculo"] = { 202.58,-1005.38,-99.42,358.82 }
         },
        ["spawns"] = {
            { 193.08,-995.67,-99.42,266.58 },
            { 193.17,-999.06,-99.42,266.58 },
            { 193.25,-1002.27,-99.42,266.58 },
            { 193.27,-1005.69,-99.42,266.58 },
        }
    },
    ["Garagem_maior"] = {
        ["saida"] = { 
            ["blip"] = { 241.01,-1004.85,-98.99 },
            ["veiculo"] = { 224.18,-1004.28,-99.42,358.57 }
         },
        ["spawns"] = {
            { 223.68,-977.71,-99.42, 236.27 },
            { 222.91,-983.74,-99.42, 236.27 },
            { 223.08,-989.21,-99.42,236.27 },
            { 234.17,-983.79,-99.42,126.15 },
            { 233.7,-991.85,-99.42,126.15 },
            { 223.06,-995.2,-99.42,232.88 },
        }
    },
    ["Garagem_luxo"] = {
        ["saida"] = { 
            ["blip"] = { -1507.61,-3017.08,-79.24 },
            ["veiculo"] = { -1517.3,-2978.63,-81.19,271.41 }
        },
        ["spawns"] = {
            { -1517.72,-2998.47,-82.63,328.73 },
            { -1512.72,-2998.47,-82.63,328.73 },
            { -1507.72,-2998.47,-82.63,328.73 },
            { -1502.72,-2998.47,-82.63,328.73 },
            { -1497.72,-2998.47,-82.63,328.73 },

            { -1517.33,-2987.74,-82.63,207.87 },
            { -1512.94,-2987.74,-82.63,207.87 },
            { -1507.94,-2987.74,-82.63,207.87 },
            { -1502.94,-2987.74,-82.63,207.87 },
            { -1497.94,-2987.74,-82.63,207.87 },
        }
    },
    ["Garagem_gigante"] = {
        ["saida"] = { 
            ["blip"] = { -2216.39,1143.93,-23.05 },
            ["veiculo"] = { -2218.88,1157.36,-23.68,185.55 }
         },
        ["spawns"] = {
            { -2203.25,1129.18,-23.68,90.11 },
            { -2203.25,1126.18,-23.68,90.11 },
            { -2203.25,1122.18,-23.68,90.11 },
            { -2203.25,1118.18,-23.68,90.11 },
            { -2203.25,1114.18,-23.68,90.11 },

            { -2185.93,1139.05,-23.68,269.38 },
            { -2185.93,1136.05,-23.68,269.38 },
            { -2185.93,1133.05,-23.68,269.38 },
            { -2185.93,1129.55,-23.91,269.38 },
            { -2185.93,1126.05,-23.68,269.38 },

            { -2185.93,1122.55,-23.68,269.38 },
            { -2185.93,1121.05,-23.68,269.38 },
            { -2185.93,1118.05,-23.68,269.38 },
            { -2185.93,1115.05,-23.68,269.38 },
            { -2185.93,1112.05,-23.68,269.38 },
            { -2185.93,1109.05,-23.68,269.38 },
            { -2185.93,1106.55,-23.68,269.38 },
            { -2185.93,1103.05,-23.68,269.38 }
        },
    },
}

-----##########################################################-----
--###          GARAGENS TRABALHOS
-----##########################################################-----

Config.workgarage = {
    ["Mecanico"] = {
        "flatbed",
        "Amarokmec"
    },
    ["Paramedic"] = {
		"ambulance",
    },
    ["Hospital"] = {
        "ambulance",
    },
    ["Heliparamedic"] = {
        "polmav"
    },
    ["Police_interior"] = {
        "police",
		"polmustang",
		"police3",
    },
    ["Police"] = {
        { model = "police", livery = 1, name = "Veiculo policial", photo = "policephoto", perm = "Coronel" },
		"polmustang",
		"police3"
    },
    ["Helipolice"] = {
        "polmav"
    },
    ["Driver"] = {
        "bus"
    },
    ["Caminhoneiro"] = {
		"packer"
	},
    ["Boats"] = {
        "marquis",
        "seashark",
        "predator",
        "dinghy"
    },
    ["Transporter"] = {
        "stockade"
    },
    ["Lumberman"] = {
        "ratloader"
    },
    ["Fisherman"] = {
        "rebel2"
    },
    ["Garbageman"] = {
        "trash"
    },
    ["HeliVIP"] = {
        "supervolito2",
        "swift2"
    },
    ["Taxista"] = {
        "taxi"
    },
    ["Bike"] = {
        "bmx",
        "cruiser",
        "fixter",
        "scorcher",
        "tribike",
        "tribike2",
        "tribike3"
    },
    ["Eletricista"] = {
        "uno"
    },
    ["Towdriver"] = {
        "flatbed"
    },
    ["Delivery"] = {
        "enduro",
    }
}

-----##########################################################-----
--###               GARAGENS CASAS
-----##########################################################-----

Config.homesInterior = {
    ["Middle"] = "Garagem_menor",           -- Creative
    ["Homes"] = "Garagem_menor",            -- Summerz
    ["KR"] = "Garagem_menor",               -- vRPex
    ["LV"] = "Garagem_menor",               -- vRPex
    ["PB"] = "Garagem_menor",               -- vRPex
    ["MS"] = "Garagem_maior",
    ["LX"] = "Garagem_maior",
    ["FH"] = "Garagem_media",
    ["MS"] = "Garagem_maior",
}

-----##########################################################-----
--###               NOTIFYS
-----##########################################################-----

Config.Notifications = {
    ['error_transfer'] = {
        message = 'Você não pode transferir o carro para si mesmo.',
        type = 'negado'
    },
    ['player_transfer'] = {
        message = 'Cidadão não está acordado.',
        type = 'negado'
    },
    ['no_permission'] = {
        message = 'Sem permissão',
        type = 'negado'
    },
    ['carsell'] = {
        message = 'Carro vendido com sucesso',
        type = 'sucesso'
    },
    ['parkprice'] = {
        message = 'Você pagou R$ ',
        type = 'sucesso'
    },
    ['notowner'] = {
        message = 'Veículo não é seu',
        type = 'negado'
    },
    ['transfer'] = {
        message = 'Você transferiu o veículo',
        type = 'sucesso'
    },
    ['transfer2'] = {
        message = 'O veículo foi enviado para sua garagem',
        type = 'sucesso'
    },
    ['money'] = {
        message = 'Sem dinheiro suficiente',
        type = 'negado'
    },
    ['notvehicle'] = {
        message = 'Não há veiculo nessa garagem',
        type = 'negado'
    },
    ['block_spawn'] = {
        message = 'Vaga ocupada',
        type = 'negado'
    },
    ['no_park_car'] = {
        message = 'Não permitido para esse veiculo',
        type = 'negado'
    },
    ['far_vehicle'] = {
        message = 'Veiculo se encontra longe',
        type = 'negado'
    },
    ['off_interior'] = {
        message = 'Cidadão não se encontra na garagem',
        type = 'negado'
    },
    ['error_spawn_veh'] = {
        message = 'Erro ao encontrar o veiculo',
        type = 'negado'
    },
}

Config.Notification = function(message, tipo, server, src)
    if Config.Notifications[message] then
        tipo = Config.Notifications[message].type
        message = Config.Notifications[message].message
    end
    if server then
        TriggerClientEvent("Notify", src, tipo, message)
    else
        TriggerEvent("Notify", tipo, message)
    end
end

-----##########################################################-----
--###               DİSCORD WEBHOOK
-----##########################################################-----
local Webhooks = module("config/webhooks")

Config.Weebhok = Webhooks.webhookgarage
Config.Botname = "Reborn Garage Log"
Config.IconURL = ""
Config.Logo = ""

-----##########################################################-----
--###           EVENTOS PARA UTILIZAR
-----##########################################################-----
--[[

-- Sync delete vehicle
TriggerClientEvent("will_garages_v2:deleteVehicle",-1,vehNet,vehPlate)

-- Registrar placa
TriggerServerEvent("setPlateEveryone",plate)

]]
