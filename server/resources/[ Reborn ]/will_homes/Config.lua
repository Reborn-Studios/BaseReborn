Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")

-----##########################################################-----
--###          CONFIG
-----##########################################################-----

Config = {}

Config.base = "creative"            -- vrpex // creative // summerz // cn

Config.SellTax = 10                 -- Taxa de venda

Config.taxTime = 7                  -- Dias para pagar taxa de casa

Config.delHomeTime = 5              -- Dias para casa ficar sem dono (Se não pagar a taxa)

Config.houseTaxes = function(id)    -- Preço das taxas
    if not id then return 0 end
    local house = {}
    if IsDuplicityVersion() then
        house = CacheHouses[id]
    else
        house = Houses[id]
    end
    local price = house.price * 1/10
    if price > 100000 then
        price = 100000
    end
    return price
end

Config.showBlips = true             -- Mostrar blips

Config.debug = false                -- Debug para auxiliar em erros

Config.Aparts = {
    ["apartment1"] = {
        out = vector3(266.06,-1006.85,-100.78),
        chest = vector3(265.9,-999.42,-99.0),
    },
    ["apartment2"] = {
        out = vector3(-24.04,-597.62,80.04),
        chest = vector3(-12.64,-597.13,79.44),
    },
    ["apartment3"] = {
        out = vector3(-782.2, 319, 187.9),
        manage = vector3(-796.58,322.04,187.32),
        chest = vector3(-796.5, 328.2, 187.3),
    },
    ["apartment4"] = {
        out = vector3(342.07,437.9,149.39),
        chest = vector3(338.43,436.76,141.78),
    },
    ["apartment5"] = {
        out = vector3(-1289.94,449.92,97.91),
        chest = vector3(-1287.88,455.55,90.3),
    },
}

Config.Houses_Template = { 
    name = "Casa a venda",
    price = 5,
    coords = {      
        house_in = vector3(1,1,1),
        house_out = vector3(1,1,1),
        chest = vector3(1,1,1)
    },
    owner = "",
    friends = {  },
    theme = "apartment1",
    stars = 1,
    extends = {},
}
