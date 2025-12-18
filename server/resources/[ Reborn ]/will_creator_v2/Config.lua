Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
RebornConfig = Proxy.getInterface("Reborn")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- "vrpex" | "creative" | "summerz" | "cn"
Config.Base = "creative"

Config.Debug = false

-- ####################
--      MULTI CHAR
-- ####################

-- Habilitar multi character (Caso mude após criar personagens, é aconselhavel deletar todos)
Config.EnableMultichar = RebornConfig.multi_personagem()["Enabled"]

-- Coordenadas na escolha do personagem
Config.MulticharDefaultCoords = vector4(-609.92,-134.14,39.01,155.01)

-- Coordenadas por permissão
Config.Multichar = {
    [1] = {
        ['perms'] = { "Coronel", "Capitao", "Major",
            "Tenente", "Sub.Tenente", "Sargento", "2Sargento",
            "3Sargento", "Cabo", "Soldado", "Recruta"
        },
        ['coords'] = vector4(142.08,-352.9,43.26,303.2),
        ['anim'] = { ["dict"] = "mp_player_int_uppersalute", ["name"] = "mp_player_int_salute" }
    },
}

-- #############################
--      SPAWNER
-- #############################

---@type Spawns[]
Config.Spawns = {
    {
        x = 54.61,
        y = -880.21,
        z = 30.35,
        label = "GARAGEM PRAÇA",
        image = "garagempraca.png"
    },
    {
        x = -772.95,
        y = 5595.9,
        z = 33.49,
        label = "GARAGEM PALETO",
        image = "garagempaleto.png"
    },
    {
        x = 318.1,
        y = 2623.98,
        z = 44.47,
        label = "GARAGEM SANDY SHORES",
        image = "easternmotel.jpg"
    },
    {
        x = -1848.26,
        y = -1228.77,
        z = 13.02,
        label = "PIER",
        image = "pier.jpg"
    },
    {
        x = 1169.39,
        y = -1527.58,
        z = 34.85,
        label = "HOSPITAL",
        perm = "paramedico.permissao",
        image = "hospital.png"
    },
    {
        x = 107.96,
        y = -386.25,
        z = 42.34,
        label = "DEPARTAMENTO POLICIAL",
        perm = "policia.permissao",
        image = "dp.png"
    },
}

-- #############################
--      BARBERSHOP
-- #############################

Config.BarberCategories = {
    ['Olhos'] = {
        'eyeColor',
        'eyeOpenness',
        'eyebrowsStyle',
        'eyebrowsOpacity',
        'eyebrowsColor',
        'eyebrowsColor2',
        'eyebrowsHeight',
        'eyebrowsWidth',
    },
    ['Nariz'] = {
        'noseWidth',
        'noseHeight',
        'noseLength',
        'noseBridge',
        'noseTip',
        'noseShift',
    },
    ['Bochecha'] = {
        'cheekHeight',
        'cheekWidth',
        'cheekboneWidth',
    },
    ['Rosto'] = {
        'lips',
        'chinLength',
        'chinPosition',
        'chinWidth',
        'chinShape',
        'jawWidth',
        'jawHeight',
        'neckLength',
    },
    ['Cabelo'] = {
        'hair',
        'hairColor',
        'hairColor2',
    },
    ['Barba'] = {
        'beard',
        'beardColor',
    },
    ['Maquiagem'] = {
        'blush',
        'blushColor',
        'lipstick',
        'lipstickColor',
        'makeup',
    },
    ['Aspectos'] = {
        'aspect',
        'skin',
        'freckles',
        'wrinkles',
        'wrinklesOpacity',
    },
    ['Corpo'] = {
        'bodyHair',
        'bodyHairColor',
        'blemishes1',
        'blemishes2',
    }
}

-- #############################
--      CRIAÇAO DE PERSONAGEM
-- #############################

-- Coords para criar personagem
Config.CreateCoords = vector4(-1399.04,-480.35,72.05,277.5)

-- Coords para spawnar apos criação
Config.SpawnCoords = vector4(-1037.02,-2734.81,13.76,327.28)

Config.DisabledCategories = {
    [`mp_m_freemode_01`] = {
        ["hair"] = {
            [78] = true,
            [79] = true,
            [80] = true,
        },
        ["beard"] = {
            [24] = true,
            [25] = true,
            [26] = true,
            [27] = true,
        },
        ["eyeColor"] = {
            [28] = true,
            [29] = true,
            [30] = true,
            [31] = true,
        },
    },
    [`mp_f_freemode_01`] = {
        ["hair"] = {
            [25] = true,
            [75] = true,
        },
    }
}

Config.DefaultClothes = {
    ["mp_m_freemode_01"] = {
        ["vest"] = { item = 0, texture =  0 },
        ["torso"] = { item = 15, texture = 0 },
        ["accessories"] = { item = 0, texture = 0 },
        ["hats"] = { item = -1, texture = 0 },
        ["mask"] = { item = 0, texture = 0 },
        ["undershirts"] = { item = 15, texture = 0 },
        ["shoes"] = { item = 5, texture = 2 },
        ["bracelets"] = { item = -1, texture = 0 },
        ["tops"] = { item = 15, texture = 0 },
        ["parachutes"] = { item = 0, texture = 0 },
        ["ear"] = { item = -1, texture = 0 },
        ["decals"] = { item = 0, texture = 0 },
        ["legs"] = { item = 61, texture = 2 },
        ["watches"] = { item = -1, texture = 0 },
        ["glasses"] = { item = -1, texture = 0 },
    },
    ["mp_f_freemode_01"] = {
        ["vest"] = { item = 0, texture =  0 },
        ["torso"] = { item = 15, texture = 0 },
        ["accessories"] = { item = 0, texture = 0 },
        ["hats"] = { item = -1, texture = 0 },
        ["mask"] = { item = 0, texture = 0 },
        ["undershirts"] = { item = 15, texture = 0 },
        ["shoes"] = { item = 16, texture = 0 },
        ["bracelets"] = { item = -1, texture = 0 },
        ["tops"] = { item = 15, texture = 0 },
        ["parachutes"] = { item = 0, texture = 0 },
        ["ear"] = { item = -1, texture = 0 },
        ["decals"] = { item = 0, texture = 0 },
        ["legs"] = { item = 10, texture = 0 },
        ["watches"] = { item = -1, texture = 0 },
        ["glasses"] = { item = -1, texture = 0 },
    },
}

---@type table<string | SkinData>
Config.DefaultSkins = {
    ['mp_m_freemode_01'] = {
         -- Genetica
        ["parent1"] = 21,
        ["parent2"] = 15,
        ["shape1"] = 0,
        ["shape2"] = 0,
        ["similarity"] = 0.2,
        ["skinSimilarity"] = 0.2,
        -- Olhos
        ["eyeColor"] = 0,
        ["eyeOpenness"] = 0,
        ["eyebrowsStyle"] = 0,
        ["eyebrowsOpacity"] = 0.99,
        ["eyebrowsColor"] = 0,
        ["eyebrowsColor2"] = 0,
        ["eyebrowsHeight"] = 0,
        ["eyebrowsWidth"] = 0,
        -- Nariz
        ["noseWidth"] = 0,
        ["noseHeight"] = 0,
        ["noseLength"] = 0,
        ["noseBridge"] = 0,
        ["noseTip"] = 0,
        ["noseShift"] = 0,
        -- Bochecha
        ["cheekHeight"] = 0,
        ["cheekWidth"] = 0,
        ["cheekboneWidth"] = 0,
        -- Rosto
        ["lips"] = -1,
        ["chinLength"] = -1,
        ["chinPosition"] = -1,
        ["chinWidth"] = -1,
        ["chinShape"] = -1,
        ["jawWidth"] = -1,
        ["jawHeight"] = -1,
        ["neckLength"] = -1,
        -- Cabelo
        ["hair"] = 0,
        ["hairColor"] = 0,
        ["hairColor2"] = 0,
        -- Barba
        ["beard"] = -1,
        ["beardColor"] = 0,
        -- Maquiagem
        ["blush"] = -1,
        ["blushColor"] = -1,
        ["lipstick"] = -1,
        ["lipstickColor"] = -1,
        ["makeup"] = -1,
        -- Aspectos
        ["aspect"] = -1,
        ["skin"] = -1,
        ["freckles"] = -1,
        ["wrinkles"] = -1,
        ["wrinklesOpacity"] = 0.99,
        -- Corpo
        ["bodyHair"] = -1,
        ["bodyHairColor"] = -1,
        ["blemishes1"] = -1,
        ["blemishes2"] = -1,
        ["shirtOverlay"] = -1,
    },
    ['mp_f_freemode_01'] = {
         -- Genetica
        ["parent1"] = 21,
        ["parent2"] = 14,
        ["shape1"] = 0,
        ["shape2"] = 0,
        ["similarity"] = 0.2,
        ["skinSimilarity"] = 0.2,
        -- Olhos
        ["eyeColor"] = 0,
        ["eyeOpenness"] = 0,
        ["eyebrowsStyle"] = 0,
        ["eyebrowsOpacity"] = 0.99,
        ["eyebrowsColor"] = 0,
        ["eyebrowsColor2"] = 0,
        ["eyebrowsHeight"] = 0,
        ["eyebrowsWidth"] = 0,
        -- Nariz
        ["noseWidth"] = 0,
        ["noseHeight"] = 0,
        ["noseLength"] = 0,
        ["noseBridge"] = 0,
        ["noseTip"] = 0,
        ["noseShift"] = 0,
        -- Bochecha
        ["cheekHeight"] = 0,
        ["cheekWidth"] = 0,
        ["cheekboneWidth"] = 0,
        -- Rosto
        ["lips"] = -1,
        ["chinLength"] = -1,
        ["chinPosition"] = -1,
        ["chinWidth"] = -1,
        ["chinShape"] = -1,
        ["jawWidth"] = -1,
        ["jawHeight"] = -1,
        ["neckLength"] = -1,
        -- Cabelo
        ["hair"] = 15,
        ["hairColor"] = 0,
        ["hairColor2"] = 0,
        -- Barba
        ["beard"] = -1,
        ["beardColor"] = 0,
        -- Maquiagem
        ["blush"] = -1,
        ["blushColor"] = -1,
        ["lipstick"] = -1,
        ["lipstickColor"] = -1,
        ["makeup"] = -1,
        -- Aspectos
        ["aspect"] = -1,
        ["skin"] = -1,
        ["freckles"] = -1,
        ["wrinkles"] = -1,
        ["wrinklesOpacity"] = 0.99,
        -- Corpo
        ["bodyHair"] = -1,
        ["bodyHairColor"] = -1,
        ["blemishes1"] = -1,
        ["blemishes2"] = -1,
        ["shirtOverlay"] = -1,
    }
}