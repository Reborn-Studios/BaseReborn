--[[ All settings of the script are found and edited in this file. ]]

Config = {}

--[[
    You can edit the default settings for Hud like this.
    I tried to choose the variable names as meaningful as possible.
--]]
Config.DefaultHudSettings   = {
    ---@type BarStyle
    bar_style = 'hexagon-w',
    -- center | hud
    logoPos = "center",
    activeHunger = true,
    activeThirst = true,
    activeStress = true,
    --[[ Places all bar types in a new order. ]]
    is_res_style_active = true,
    vehicle_hud_style = 4,
    -- If `editableByPlayers` value is `false` players cannot change the `onlyInVehicle` value.
    mini_map = { onlyInVehicle = true, style = 'rectangle', editableByPlayers = true },
    -- If `editableByPlayers` value is `false` players cannot change the `onlyInVehicle` value.
    compass = { active = true, onlyInVehicle = true, editableByPlayers = true },
    cinematic = { active = true },
    -- kmH 'true' or 'false' | false is MPH
    vehicle_info = { kmH = true },
    --[[
        - It is located in the upper right corner.
        - It lists data such as date, server name, money, etc.
    --]]
    client_info = {
        active = true,
        server_info = {
            active = true,
            -- Server name
            name = "",
            -- Server Logo | path: ui/build/images/server_images/<file>
            image = "LogoRbn.png",
            -- Show online players on client_info
            showOnlinePlayers = false,
        },
        bank = { active = true },
        cash = { active = false },
        job = { active = true },
        player_source = { active = true },
        radio = { active = true },
        time = { active = false },
        weapon = { active = true },
        real_time = { active = false },
        extra_currency = { active = false },
    },
    music_info = {
        -- Listening to music feature true/false
        active = true,
    },
    --[[
        - Located above the map.
        - Shows current location, music information or time.
    --]]
    navigation_widget = { active = true },
    -- Bar colors set by default.
    bar_colors = {
        armor = '#1D4ED8',
        health = '#CF4E5B',
        hunger = '#FFC400',
        oxygen = '#00FFA3',
        stamina = '#C4FF48',
        stress = '#6b21a8',
        thirst = '#00c2ff',
        vehicle_engine = '#C4FF48',
        voice = '#FFFFFF',
        vehicle_nitro = '#cf654e',
    },
}

--If money is an item on your server, you need to edit this.
Config.MoneySettings        = {
    isMoneyItem = true,
    itemName = 'dollars',
    -- You can put one more currency if you want it to appear on the `client_info`.
    -- to hide it or set active to `false`
    extra_currency = {
        type = 'item', --[[@type 'item' | 'account']]
        name = 'dollars2', --[[@type string | nil]] -- account or item name
    }
}

Config.ToggleSettingsMenu   = {
    active = true,
    key = nil,             -- nil or Key
    command = 'hud', -- Shortcut key to open hud settings menu
}

-- Configures for seat-belt system.
Config.ToggleSeatBelt       = {
    active = true,
    key = 'G',
    --What should be the minimum vehicle speed for eject:
    -- This value is set according to kmH being `true`. If you are using kmH `false`, you can write it as `MPH`.
    ejectSpeed = 160,
    -- If true, you will receive a warning if you are not wearing your seat belt.
    warning = false,
}

-- Shortcut key to turn the vehicle engine on and off
Config.ToggleVehicleEngine  = {
    active = false,
    key = 'Z',
}

-- Shortcut key to toggle cinametic mode
Config.ToggleCinematicMode  = {
    active = true,
    key = nil,             -- nil or Key
    command = 'cinematic', -- Toggle cinematic mode
}

-- Allows the player to default all positions.
Config.ResetHudPositions    = {
    active = true,
    command = 'resethudpos',
}

--If you want to hide GTA components, you need to enable this.
Config.HideGTAHudComponents = false
--Works with `HideGTAHudComponents` Components. | Can be used to fix the map if it is broken.
Config.HavePostalMap        = false

--Defines the refresh thread timecycle for data that need to be updated periodically. Milliseconds
Config.RefreshTimes         = {
    hud = 500,
    vehicle = 200,
    requestPlayerCount = 30 * 1000 -- 30 seconds
}

-- Colors available by default.
-- I advise you to set 20.
Config.BarColors            = {
    '#CF4E5B', '#CF4E75', '#CF4EAB', '#A888DE', '#6b21a8', '#7FCF4E', '#C4FF48', '#FFC400', '#FF9900', '#CF654E',
    '#1d4ed8', '#00C2FF', '#4EB0CF', '#4ECFA1', '#00FFA3', '#A68A7B', '#FFFFFF', '#7A7A7A', '#4B4B4B', '#00000057'
}

--A list of electric vehicles available in the game.
Config.ElectricVehicles     = {
    'Imorgon',
    'Neon',
    'Raiden',
    'Cyclone',
    'Voltic',
    'Voltic2',
    'Tezeract',
    'Dilettante',
    'Dilettante2',
    'Airtug',
    'Caddy',
    'Caddy2',
    'Caddy3',
    'Surge',
    'Khamelion',
    'RCBandito'
}
