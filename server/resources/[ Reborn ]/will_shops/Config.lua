Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
Reborn = Proxy.getInterface("Reborn")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- // vrpex // creative -> (creative v3) // summerz -> (creative v5) // cn -> (creative network) //
Config.base = "creative"

-- // Cooldown para novos trabalhos
Config.cooldown = 60

-- // Diretorio das imagens
Config.imageDirect = Reborn.images()

-- // Taxa ao vender a loja
Config.sellTax = 0.85

-- // Estoque inicial ao comprar a loja 
Config.initStock = function(item)
    if item == "fuel" then
        return 5000
    end
    return 5
end

-- // Quantidade do produto em trabalhos
Config.jobsQuantity = function(item, value)
    if item == 'fuel' then
        return 5000
    end
    return math.random(15, 25)
end


--// Contratos a cada 120 minutos
Config.WorkTimeout = 120

-- // Trabalhos para aumentar o estoque das lojas (Feito pelo dono)
Config.Works = {
    -- Empregos so aparece nas lojas que possui os respectivos produtos
    [1] = {
        ['name'] = "Carga de hamburguer",
        ['item'] = 'hamburger',
        ['quantity'] = 20,
        ['vehicle'] = "speedo4",
        ['destiny'] = vector3(-174.83,-1289.36,31.3),
        ['cooldown'] = 60
    },
    [2] = {
        ['name'] = "Carga de coca-cola",
        ['item'] = 'cola',
        ['quantity'] = 25,
        ['vehicle'] = "pounder",
        ['destiny'] = vector3(341.33,-1270.56,32.1),
        ['cooldown'] = 60
    },
    [3] = {
        ['name'] = "Carga de combustível",
        ['item'] = 'fuel',
        ['quantity'] = 15000,
        ['vehicle'] = "hauler",
        ['destiny'] = vector4(198.35,6619.26,31.68,184.26),
        ['cooldown'] = 60
    },
    [4] = {
        ['name'] = "Carga de energetico",
        ['item'] = 'energetic',
        ['quantity'] = 45,
        ['vehicle'] = "speedo4",
        ['destiny'] = vector3(58.67,6332.95,31.38),
        ['cooldown'] = 60
    },
}

-- // Aumento de estoque (Estoque | Valor)
Config.Stocks = {
    [1] = { 100, 0 },
    [2] = { 200, 50000 },
    [3] = { 300, 60000 },
    [4] = { 400, 70000 },
    [5] = { 500, 80000 },
    [6] = { 1000, 100000 },
    [7] = { 2500, 100000 },
    [8] = { 5000, 100000 },
}

-- // Veiculos para buscar mercadoria
Config.deliveryVehs = {
    ['hamburger'] = "speedo4",
    ['cola'] = "pounder",
    ['fuel'] = "hauler",
}

-- // Produtos gerais para as lojas
local shopsProducts = {
    ['Conveniencia'] = {
        ['cola'] = 200,
        ['hamburger'] = 150,
        ['sandwich'] = 150,
        ['absolut'] = 180,
        ['hotdog'] = 180,
        ['fries'] = 120,
        ['energetic'] = 500,
        ['chocolate'] = 250,
        ['tacos'] = 150,
        ['soda'] = 150,
        ['backpackp'] = 150,
        ['backpackm'] = 150,
        ['backpackg'] = 150,
        ['backpackx'] = 150,
    },
    ['Ammunation'] = {
        ["GADGET_PARACHUTE"] = 475,
        ["WEAPON_HATCHET"] = 975,
        ["WEAPON_BAT"] = 975,
        ["WEAPON_BATTLEAXE"] = 975,
        ["WEAPON_GOLFCLUB"] = 975,
        ["WEAPON_HAMMER"] = 725,
        ["WEAPON_MACHETE"] = 975,
        ["WEAPON_POOLCUE"] = 975,
        ["WEAPON_STONE_HATCHET"] = 975,
        ["WEAPON_KNUCKLE"] = 975,
        ["WEAPON_FLASHLIGHT"] = 675
    },
    ['Skinshop'] = {
        ["arms"] = 50,
        ["backpack"] = 50,
        ["mask"] = 50,
        ["vest"] = 50,
        ["glass"] = 50,
        ["hat"] = 50,
        ["ear"] = 50,
        ["bracelet"] = 50,
        ["accessory"] = 50,
        ["decals"] = 50,
        ["tshirt"] = 50,
        ["torso"] = 50,
        ["pants"] = 50,
        ["shoes"] = 50,
        ["watch"] = 50,
    },
    ['Posto'] = {
        ['gallon'] = 500,
        ['fuel'] = 0.085,
    },
}

-- // Valores minimos e maximos para os produtos
Config.ItemPrices = {
    ['hotdog'] = {
        ['min'] = 50,
        ['max'] = 500
    },
    ['cola'] = {
        ['min'] = 50,
        ['max'] = 500
    },
}

-- // Configuração de todas lojas
Config.Shops = {
    ["Conveniencia_01"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(28.67,-1339.34,29.5),
        ['buy_products_coords'] = vector3(25.75,-1345.71,29.5),
        ['job_coords'] = vector3(23.03,-1350.41,29.33),
        ['veh_spawn'] = vector4(15.71,-1347.9,28.88,182.34),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_02"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(1159.9,-315.35,69.21),
        ['buy_products_coords'] = vector3(1163.59,-323.79,69.21),
        ['job_coords'] = vector3(1164.75,-326.23,69.25),
        ['veh_spawn'] = vector4(1154.97,-333.86,68.66,188.51),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_03"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-709.57,-905.11,19.25),
        ['buy_products_coords'] = vector3(-707.4,-914.27,19.22),
        ['job_coords'] = vector3(-714.76,-917.77,19.22),
        ['veh_spawn'] = vector4(-706.13,-921.95,19.02,182.08),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_04"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-44.12,-1749.44,29.43),
        ['buy_products_coords'] = vector3(-47.99,-1757.43,29.43),
        ['job_coords'] = vector3(-55.74,-1755.63,29.44),
        ['veh_spawn'] = vector4(-64.64,-1749.07,29.36,42.24),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_05"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(378.75,333.07,103.57),
        ['buy_products_coords'] = vector3(374.03,327.03,103.57),
        ['job_coords'] = vector3(369.89,324.45,103.58),
        ['veh_spawn'] = vector4(366.57,329.75,103.56,167.67),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_06"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(1959.9,3749.1,32.35),
        ['buy_products_coords'] = vector3(1960.79,3741.37,32.35),
        ['job_coords'] = vector3(1962.87,3737.53,32.37),
        ['veh_spawn'] = vector4(1974.09,3746.04,32.23,207.79),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_07"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-1828.24,797.97,138.19),
        ['buy_products_coords'] = vector3(-1820.41,792.62,138.12),
        ['job_coords'] = vector3(-1818.72,796.75,138.14),
        ['veh_spawn'] = vector4(-1812.46,787.98,137.73,223.62),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_08"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-1220.89,-915.83,11.33),
        ['buy_products_coords'] = vector3(-1222.76,-907.21,12.33),
        ['job_coords'] = vector3(-1219.42,-910.63,12.33),
        ['veh_spawn'] = vector4(-1223.14,-889.9,12.53,301.6),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_09"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(239.76,-898.79,29.63),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_10"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(2549.3,385.01,108.63),
        ['buy_products_coords'] = vector3(2556.04,380.89,108.61),
        ['job_coords'] = vector3(2560.16,383.05,108.63),
        ['veh_spawn'] = vector4(2565.71,393.58,108.47,359.52),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_11"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-3249.99,1004.48,12.84),
        ['buy_products_coords'] = vector3(-3243.07,1001.3,12.84),
        ['job_coords'] = vector3(-3239.35,999.48,12.56),
        ['veh_spawn'] = vector4(-3237.79,994.66,12.41,274.53),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_12"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(1734.53,6420.94,35.04),
        ['buy_products_coords'] = vector3(1728.39,6416.21,35.03),
        ['job_coords'] = vector3(1728.05,6412.44,35.01),
        ['veh_spawn'] = vector4(1739.99,6400.69,35.28,67.38),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_13"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(549.2,2670.22,42.16),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_14"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(1697.35,4923.46,42.06),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_15"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(1392.03,3606.1,34.98),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_16"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(-2966.41,391.59,15.05),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_17"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(-3040.04,584.22,7.9),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_18"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(1134.33,-983.09,46.4),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_19"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(1165.26,2710.79,38.15),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_20"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(-1486.77,-377.56,40.15),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Conveniencia_21"] = {
        ['value'] = 200000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0.0,0.0,0.0),
        ['buy_products_coords'] = vector3(2677.07,3279.95,55.23),
        ['job_coords'] = vector3(0.0,0.0,0.0),
        ['veh_spawn'] = vector4(0.0,0.0,0.0,0.0),
        ['products'] = shopsProducts['Conveniencia']
    },
    ["Posto_01"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(174.79,-1541.75,29.27),
        ['buy_products_coords'] = vector3(170.53,-1551.17,29.27),
        ['job_coords'] = vector3(164.88,-1556.25,29.27),
        ['veh_spawn'] = vector4(183.51,-1550.78,29.19,218.39),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_02"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(808.59,-1049.75,28.2),
        ['buy_products_coords'] = vector3(817.77,-1040.83,26.76),
        ['job_coords'] = vector3(820.79,-1040.23,26.76),
        ['veh_spawn'] = vector4(804.55,-1044.91,26.65,88.68),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_03"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(1214.85,-1381.92,35.37),
        ['buy_products_coords'] = vector3(1210.81,-1389.03,35.38),
        ['job_coords'] = vector3(1207.0,-1389.62,35.38),
        ['veh_spawn'] = vector4(1217.12,-1392.57,35.22,273.78),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_04"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(1160.9,-312.14,69.36),
        ['buy_products_coords'] = vector3(1161.85,-326.7,69.22),
        ['job_coords'] = vector3(1167.13,-321.56,69.28),
        ['veh_spawn'] = vector4(1176.18,-314.84,69.19,278.84),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_05"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(642.4,260.41,103.3),
        ['buy_products_coords'] = vector3(643.74,263.46,103.3),
        ['job_coords'] = vector3(646.28,267.23,103.26),
        ['veh_spawn'] = vector4(625.49,250.95,103.04,103.46),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_06"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(2559.07,367.75,108.63),
        ['buy_products_coords'] = vector3(2559.16,373.67,108.63),
        ['job_coords'] = vector3(2559.5,353.41,108.63),
        ['veh_spawn'] = vector4(2566.59,347.31,108.47,164.46),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_07"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(-342.51,-1475.24,30.75),
        ['buy_products_coords'] = vector3(-342.48,-1483.11,30.72),
        ['job_coords'] = vector3(-342.51,-1486.07,30.76),
        ['veh_spawn'] = vector4(-334.05,-1461.04,30.52,307.04),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_08"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(-94.48,6398.84,31.49),
        ['buy_products_coords'] = vector3(-92.61,6409.84,31.65),
        ['job_coords'] = vector3(-90.35,6414.63,31.64),
        ['veh_spawn'] = vector4(-103.52,6404.77,31.5,22.57),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_09"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(-1432.2,-253.17,46.36),
        ['buy_products_coords'] = vector3(-1427.8,-268.4,46.23),
        ['job_coords'] = vector3(-1436.04,-259.58,46.27),
        ['veh_spawn'] = vector4(-1426.77,-246.04,46.38,131.52),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Posto_10"] = {
        ['value'] = 150000,
        ['stock'] = 1000,
        ['managment_coords'] = vector3(-702.67,-916.85,19.22),
        ['buy_products_coords'] = vector3(-706.61,-917.17,19.22),
        ['job_coords'] = vector3(-700.35,-917.41,19.22),
        ['veh_spawn'] = vector4(-707.03,-926.15,19.02,176.97),
        ['products'] = shopsProducts['Posto'],
        ['shopDifference'] = "fuelSystem"
    },
    ["Ammunation_01"] = {
        ['value'] = 100000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(6.6,-1100.14,29.8),
        ['buy_products_coords'] = vector3(21.87,-1106.68,29.8),
        ['job_coords'] = vector3(14.93,-1114.78,29.8),
        ['veh_spawn'] = vector4(-8.38,-1116.18,28.11,160.27),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_02"] = {
        ['value'] = 100000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(827.08,-2158.62,29.62),
        ['buy_products_coords'] = vector3(811.15,-2157.67,29.62),
        ['job_coords'] = vector3(814.26,-2147.66,29.49),
        ['veh_spawn'] = vector4(820.69,-2139.35,29.11,356.62),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_03"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(1692.77,3759.41,34.71),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_04"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(252.7,-49.91,69.95),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_05"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(842.41,-1035.28,28.19),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_06"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(-331.62,6084.93,31.46),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_07"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(-662.29,-933.62,21.82),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_08"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(-1304.17,-394.62,36.7),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_09"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(-1118.95,2699.73,18.55),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_10"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(2567.98,292.65,108.73),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    ["Ammunation_11"] = {
        ['value'] = 0,
        ['stock'] = 100,
        ['managment_coords'] = vector3(0,0,0),
        ['buy_products_coords'] = vector3(-3173.51,1088.38,20.84),
        ['job_coords'] = vector3(0,0,0),
        ['veh_spawn'] = vector4(0,0,0,0),
        ['products'] = shopsProducts['Ammunation']
    },
    --// NECESSARIO CASSINO V2 - REBORN
    ["Cassino"] = {
        ['value'] = 100000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(958.02,34.82,71.84),
        ['buy_products_coords'] = vector3(948.35,33.41,71.84),
        ['job_coords'] = vector3(951.99,26.91,71.84),
        ['veh_spawn'] = vector4(954.99,27.28,81.16,144.86),
        ['products'] = {
            ["fichas"] = 1,
            ["rouletticket"] = 5000
        },
    },
    ["Skinshop_01"] = {
        ['value'] = 150000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(71.69,-1391.7,29.38),
        ['buy_products_coords'] = vector3(0.0,0.0,0.0),
        ['job_coords'] = vector3(84.8,-1397.97,29.3),
        ['veh_spawn'] = vector4(91.83,-1404.44,29.15,315.79),
        ['products'] = shopsProducts['Skinshop'],
        ['shopDifference'] = function()
            local clothLocs = {
                { 70.81,-1399.61,29.38 },
            }
            skinshopThread(clothLocs,"Skinshop_01")
        end,
    },
    ["Skinshop_02"] = {
        ['value'] = 150000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(-700.25,-151.38,37.42),
        ['buy_products_coords'] = vector3(0.0,0.0,0.0),
        ['job_coords'] = vector3(-712.55,-165.26,36.99),
        ['veh_spawn'] = vector4(-714.74,-173.76,36.83,28.52),
        ['products'] = shopsProducts['Skinshop'],
        ['shopDifference'] = function()
            local clothLocs = {
                { -710.96,-155.39,37.42 },
            }
            skinshopThread(clothLocs,"Skinshop_02")
        end,
    },
    ["Skinshop_03"] = {
        ['value'] = 150000,
        ['stock'] = 100,
        ['managment_coords'] = vector3(429.12,-807.42,29.5),
        ['buy_products_coords'] = vector3(0.0,0.0,0.0),
        ['job_coords'] = vector3(417.97,-812.59,29.3),
        ['veh_spawn'] = vector4(409.82,-799.31,29.22,349.2),
        ['products'] = shopsProducts['Skinshop'],
        ['shopDifference'] = function()
            local clothLocs = {
                { 428.46,-800.76,29.5 },
            }
            skinshopThread(clothLocs,"Skinshop_03")
        end,
    },
}

-- // Locais de entrega de carga
Config.deliveryCoords = {
    ['fuel'] = {
        { 725.37,-874.53,24.67,265.96 },
        { 693.66,-1090.43,22.45,174.62 },
        { 977.51,-1013.67,41.32,270.83 },
        { 901.89,-1129.9,24.08,86.26 },
        { 911.7,-1258.04,25.58,33.69 },
        { 847.06,-1397.72,26.14,151.79 },
        { 830.67,-1409.13,26.16,334.64 },
        { 130.47,-1066.12,29.2,160.09 },
        { -52.79,-1078.65,26.93,67.2 },
        { -131.74,-1097.38,21.69,335.25 },
        { -621.47,-1106.05,22.18,1.07 },
        { -668.65,-1182.07,10.62,208.79 },
        { -111.84,-956.71,27.27,339.83 },
        { -1323.51,-1165.11,4.73,359.27 },
        { -1314.65,-1254.96,4.58,19.95 },
        { -1169.18,-1768.78,3.87,306.82 },
        { -1343.38,-744.02,22.28,309.26 },
        { -1532.84,-578.16,33.63,304.2 },
        { -1461.4,-362.39,43.89,219.06 },
        { -1457.25,-384.15,38.51,114.12 },
        { -1544.42,-411.45,41.99,226.04 },
        { -1432.72,-250.32,46.37,130.83 },
        { -1040.24,-499.88,36.07,118.78 },
        { 346.43,-1107.19,29.41,177.11 },
        { 523.99,-2112.7,5.99,182.08 },
    },

    -- Caso um produto nao esteja definido, é utilizado essas coordenadas
    ['others'] = {
        { -716.71, -371.86, 34.78 }, 
		{ -880.98, -182.65, 37.84 }, 
		{ -229.34, -78.79, 49.8 }, 
		{ 773.66, -150.35, 75.63 }, 
		{ 1178.91, -1463.69, 34.91 }, 
		{ 1041.14, -2115.86, 32.88 }, 
		{ 764.65, -1722.99, 30.53 }, 
		{ 520.81, -1653.01, 29.3 }, 
		{ -321.03, -1401.03, 31.77 }, 
		{ -703.6, -1179.9, 10.62 }, 
		{ -1200.45, -1162.81, 7.7 }, 
		{ -1570.88, -482.35, 35.55 },
        { 78.64,289.22,110.22 },
        { 135.14,323.21,116.64 },
        { 2561.82,2590.75,38.09 }
        
    },
}

-- // Configuração das notificações
Config.Notify = {
    NotifyEvent = "Notify",
    NotifyTypes = { Sucess = "sucesso", Denied = "negado", Warning = "aviso" },

    NotPermission = "Você não tem permissão.",
    ShopAvaliable = "Loja se encontra disponivel para compra.",
    NoWeight = "Espaço insuficiente",
    NoMoney = "Dinheiro insuficiente",
    NoShopMoney = "Dinheiro insuficiente na loja",
    NoStock = "Loja sem estoque",
    FullStock = "Loja com estoque cheio",
    BoughtShop = "Loja adquirida com sucesso",
    DepositMoney = "Dinheiro depositado com sucesso",
    StockLimit = "Estoque invalido ou já no máximo",
    CooldownShop = "Trabalho indisponivel no momento.",
    WorkConcluded = "Trabalho concluido com sucesso.",
    InitWork = "Entre no veiculo e busque a mercadoria",
    SendJob = "Trabalho divulgado!",
    VehError = "Erro ao spawnar o veiculo"
}

-- // Thread para criação de mais empregos
CreateThread(function()
    if IsDuplicityVersion() then
        while true do
            for shopName,data in pairs(shopsProducts) do
                for k,v in pairs(data) do
                    local destinyCoords = Config.deliveryCoords[k] or Config.deliveryCoords['others']
                    local destiny = destinyCoords[math.random(1,#destinyCoords)]
                    table.insert(Config.Works, {
                        ['name'] = "Carga de "..getItemName(k),
                        ['item'] = k,
                        ['quantity'] = math.random(10,15),
                        ['vehicle'] = Config.deliveryVehs[k] or "speedo4",
                        ['destiny'] = vector3(destiny[1],destiny[2],destiny[3]),
                        ['cooldown'] = 60
                    })
                end
            end
            Wait(1000*60*Config.WorkTimeout)
        end
    end
end)

-- // EXPORTS
--[[ 
--- @param data: table {
    source: number;
    shop: string;
    product: string;
    amount: number;
}
exports['will_shops']:tryBuyProduct(data)

exports['will_shops']:bougthProduct(user_id, shopId, product, amount, price, details)

exports['will_shops']:getProductPrice(shopId,product)

exports['will_shops']:getShopProducts(shopId)

exports['will_shops']:addShopStock(shopId,product,quantity)

exports['will_shops']:remShopStock(shopId, product, quantity)

exports['will_shops']:checkStock(shopId, product, quantity)

exports['will_shops']:shopBougths(shopId,client,product,quantity,reward,details)

exports['will_shops']:tryShopPayment(shopId,value)
]]