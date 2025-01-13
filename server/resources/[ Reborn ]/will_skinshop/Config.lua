Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- Diretório das imagens
Config.imageDirect = "http://212.18.114.101/clothes/"

-- Definição de preços  
Config.clothPrices = {
    -- Preço de todos itens
    ['all'] = 50,
    ['torso'] = {
        -- Ex: (Apenas a jaqueta 14 de textura 1 esta com preço de R$250)
        ['14'] = {
            ['1'] = 250
        },
        -- Ex: (Todas jaquetas 15 de qualquer textura tem preço de R$150)
        ['21'] = 150,
    },
}

Config.vipClothes = {
    ['torso'] = {
        ['70'] = 5,
        ['203'] = 10,
        ['204'] = 10,
        ['205'] = 10,
    },
    ['pants'] = {
        ['82'] = 8,
        ['83'] = 8,
    }
}

-- Possui script empresas da Reborn?
Config.will_shops = true

-- Possui Advanced Inventory da Reborn?
Config.will_inventory = false

--[[***************

{
    coords = vector3(0.0, 0.0, 0.0),        --[ -> ] Local da loja [* Chave obrigatória *]
    clothes = {                             --[ -> ] Limitação de roupas na loja
        ['bracelet'] = {
            ['available'] = {0, 10},        -- Liberado bracelets do 0 ao 10
            ['block'] = { ['5'] = true }    -- Bracelet 5 bloqueado
        },
--      ...
    } or "all",                 
    blockedCategories = {                   --[ -> ] Categorias bloqueadas na loja
        ['ear'] = true,                     -- Brincos bloqueados
--      ...
    },
    permission = nil,                       --[ -> ] Permissão para acessar loja
}

***************** ]]
Config.locates = {
    ['Creator'] = {
        clothes = "all",
        blockedCategories = {
            ['decals'] = true,
            ['bracelet'] = true,
            ['ear'] = true,
            ['watch'] = true,
            ['glass'] = true,
            ['backpack'] = true,
            ['vest'] = true,
            ['mask'] = true,
            ['accessory'] = true,
        },
        permission = nil,
        -- coords = vector3(-1380.78, -469.91, 72.5)
    },
    {
        clothes = {
            -- Categoria com peças limitadas
            ["torso"] = {
                -- Intervalo das disponiveis (Ex.: 0 até 200)
                ['available'] = { 0, 200 },
                ['block'] = {
                    -- Modelo bloqueado
                    ['14'] = true
                }
            },
        },
        -- Categorias bloqueadas
        blockedCategories = {
            ['decals'] = true,
            ['bracelet'] = true,
            ['ear'] = true,
            ['watch'] = true,
            ['glass'] = true,
        },
        permission = nil,
        -- coords = vector3(75.40,-1392.92,29.37) -- Local no will_shops
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-163.20,-302.03,39.73)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-822.34,-1073.49,11.32)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-1193.81,-768.49,17.31)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-1450.85,-238.15,49.81)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(4.90,6512.47,31.87)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(1693.95,4822.67,42.06)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(126.05,-223.10,54.55)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(614.26,2761.91,42.08)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(1196.74,2710.21,38.22)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-3170.18,1044.54,20.86)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-1101.46,2710.57,19.10)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(461.85,-999.75,30.68)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(461.87,-995.88,30.68)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(301.9,-599.55,43.29)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(298.54,-598.2,43.29)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(1834.73,2571.71,46.02)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(105.66,-1303.04,28.8)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(153.1,-3011.12,7.04)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-1124.28,-1442.0,5.22)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-439.47,6011.46,36.99)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-437.44,6008.93,36.99)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(362.35,-1593.34,25.44)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-1186.57,-902.82,13.99)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(810.28,-761.19,31.26)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(387.37,799.76,187.45)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(-586.76,-1049.98,22.34)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(1825.76,3672.3,34.27)
    },
    {
        clothes = "all",
        permission = nil,
        coords = vector3(1853.5,3688.55,29.81)
    },
    {
        coords = vector3(-1887.19,2070.57,145.57)
    },
    {
        coords = vector3(1951.38,3766.07,32.59)
    },
    {
        coords = vector3(1614.82,0.72,165.93)
    },
    {
        coords = vector3(1777.69,-3.79,165.22)
    },
    {
        coords = vector3(362.7,3578.51,34.54)
    },
    {
        coords = vector3(-1098.33,-831.83,14.29)
    },
}

Config.shopLocs = {}

local function refreshLocates()
    for Index,data in pairs(Config.locates) do
        if data.coords then
            table.insert(Config.shopLocs,data)
        end
    end
    if GlobalState["Skinshops"] then
        for Index,data in pairs(GlobalState["Skinshops"]) do
            table.insert(Config.shopLocs,data)
        end
    end
end

CreateThread(refreshLocates)

AddStateBagChangeHandler("Skinshops","",function (_,_,value)
    if not value then return end
    Config.shopLocs = {}
    Wait(100)
    refreshLocates()
end)

--------------------------------------------------
            -- *** NÃO ALTERAR *** --
--------------------------------------------------
Config.clothingCategorys = {
	["arms"] = { type = "variation", id = 3 },
	["backpack"] = { type = "variation", id = 5 },
	["tshirt"] = { type = "variation", id = 8 },
	["torso"] = { type = "variation", id = 11 },
	["pants"] = { type = "variation", id = 4 },
	["vest"] = { type = "variation", id = 9 },
	["shoes"] = { type = "variation", id = 6 },
	["mask"] = { type = "variation", id = 1 },
	["hat"] = { type = "prop", id = 0 },
	["glass"] = { type = "prop", id = 1 },
	["ear"] = { type = "prop", id = 2 },
	["watch"] = { type = "prop", id = 6 },
	["bracelet"] = { type = "prop", id = 7 },
	["accessory"] = { type = "variation", id = 7 },
	["decals"] = { type = "variation", id = 10 }
}