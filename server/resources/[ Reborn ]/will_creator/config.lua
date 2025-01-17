Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- "vrpex" | "creative" | "summerz" | "cn"
Config.Base = "creative"

-- Usar sistema de chaves que fornecemos (Utilizado para liberar mais personagem para os jogadores)
Config.UseKeySystem = true

-- ####################
--      MULTI CHAR
-- ####################
rbnConfig = GlobalState["RebornConfig"]
-- Habilitar multi character (Caso mude após criar personagens, é aconselhavel deletar todos)
Config.EnableMultichar = rbnConfig and rbnConfig.multiChar["Enabled"] or true

-- Nome da cidade
Config.ServerName = GlobalState['Basics']['ServerName']
-- Loja da cidade
Config.ServerStore = GlobalState['Basics']['ServerStore']
-- Imagem com fundo transparente
Config.ServerLogo = GlobalState['Basics']['CityLogo']
Config.ServerDescription = "Reborn Studios é uma loja de serviços e produtos voltados ao FiveM. Focamos no diferencial e no atendimento ao cliente."
-- Coordenadas na escolha do personagem
Config.MulticharCoords = vector4(-1596.07, -1127.56, 1.26, 267.44)
-- Maximo de personagens permitidos
Config.MaxCharacterSlots = 4
-- Slots extra para personagens (0 significa que pode criar apenas 1 personagem por padrão) / (1 significa que todos players podem criar 2 personagens)
Config.DefaultExtraCharacterSlots = rbnConfig and (rbnConfig.multiChar["Max_personagens"] - 1) or 0

-- #############################
--      SPAWNER
-- #############################

-- Local inicial para posicionar a camera de spawn
Config.DefaultCoords = { x = -204.0, y = -842.0, z = 580.0 }

Config.Coordinates = {
    {
        camcoords = {x = -772.95, y = 5595.9, z = 260.0},
        spawncoords = {x = -772.95, y = 5595.9, z = 33.49},
        street = "VESPUCCI",
        name = "GARAGEM PALETO",
        img = "garagempaleto.png",
    },
    {
        camcoords = {x = 54.7, y = -880.1, z = 260.0}, -- 3th value is the cameras height. When the character spawns, it will be fixed to the ground.
        spawncoords = {x = 54.7, y = -880.1, z = 30.35}, -- 3th value is the cameras height. When the character spawns, it will be fixed to the ground.
        street = "CENTRAL",
        name = "GARAGEM PRAÇA",
        img = "garagempraca.png",
    },
    {
        camcoords = {x = 158.85, y = -1001.63, z = 260.0},
        spawncoords = {x = 158.85, y = -1001.63, z = 29.36},
        street = "PRAÇA",
        name = "PRAÇA",
        img = "praca.jpg",
    },
    {
        camcoords = {x = 318.1, y = 2623.98, z = 260.0},
        spawncoords = {x = 318.1, y = 2623.98, z = 44.47},
        street = "SANDY SHORES",
        name = "GARAGEM SANDY SHORES",
        img = "easternmotel.jpg",
    },
    {
        camcoords = {x = -1846.06, y = -1227.31, z = 260.0},
        spawncoords = {x = -1846.06, y = -1227.31, z = 13.02},
        street = "PIER",
        name = "PIER",
        img = "pier.jpg",
    },
}

-- #############################
--      CRIAÇAO DE PERSONAGEM
-- #############################

-- Coords para criar personagem
Config.CreateCoords = vector3(-1380.78, -469.91, 72.5)

-- Usar will skinshop
Config.UseSkinshop = true

-- Usar cut scene apos criar personagem
Config.UseCutScene = false

-- Coords para spawnar apos criação
Config.SpawnCoords = vector4(-1037.02,-2734.81,13.76,327.28)

-- Preço na mudança do barbershop
Config.BarberPrice = 200

-- Categorias ao abrir o barbershop
Config.BarberCategories = { "CABELO", "BOCA", "NARIZ", "OLHOS" }

Config.BlipType = {
    ["barber"] = {
        showBlip = true,
        sprite = 71,
        color = 0,
        scale = 0.7,
        name = "Barbearia"
    },
    ["surgery"] = {
        showBlip = true,
        sprite = 73,
        color = 0,
        scale = 0.7,
        name = "Sala de cirurgia"
    }
}

Config.Stores = {
    {
        type = "barber",
        coords = vector4(-814.22, -183.7, 37.57, 116.91),
    },
    {
        type = "barber",
        coords = vector4(136.78, -1708.4, 29.29, 144.19),
    },
    {
        type = "barber",
        coords = vector4(-1282.57, -1116.84, 6.99, 89.25),
    },
    {
        type = "barber",
        coords = vector4(1931.41, 3729.73, 32.84, 212.08),
    },
    {
        type = "barber",
        coords = vector4(1212.8, -472.9, 65.2, 60.94),
    },
    {
        type = "barber",
        coords = vector4(-32.9, -152.3, 56.1, 335.22),
    },
    {
        type = "barber",
        coords = vector4(-278.1, 6228.5, 30.7, 49.32),
    },
    {
        type = "surgery",
        coords = vector4(-1379.69,-470.58,72.05,10.79),
    }
}
