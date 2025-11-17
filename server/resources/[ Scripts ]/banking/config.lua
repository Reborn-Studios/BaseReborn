Config = Config or {}

Config.debug = false -- Enable or disable debug mode (true/false)

Config.creditScore = {
    enabled = true, -- [default true] Enable or disable credit score completely (true/false)
    startingCredit = 130, -- Starting credit score for new players
    max = 1000, -- Maximum credit score a player can have
    creditMargins = { -- Credit score margins shown in the UI
        low = 200, -- Credit score below this value is considered low
        good = 500, -- Credit score below this value is considered good
        high = 850 -- Credit score below this value is considered high
    }
}

Config.savingsAccount = {
    enabled = true, -- Enable or disable savings account completely
}

Config.notify = function(type, description)
    lib.notify({ type = type, description = description })
end

Config.drawText = function(message)
    exports.ox_lib:showTextUI(message)
end

Config.hideText = function()
    exports.ox_lib:hideTextUI()
end

Config.bankLocations = {
    BLIPNAME = 'Bank',
    BLIPSPRITE = 108,
    BLIPCOLOR = 2,
    BLIPSCALE = 0.7,
    DISTANCE = 2.0,
    COORDS = {
        vector3(149.9499, -1040.7720, 29.3741),
        vector3(-1212.98, -330.84, 37.79),
        vector3(-2962.58, 482.63, 15.71),
        vector3(314.19, -278.62, 54.17),
        vector3(-351.53, -49.53, 49.04),
        vector3(-111.1939, 6468.2202, 31.6267),
        vector3(1174.8418, 2706.9104, 38.0940)
    }
}

Config.atmModels = {
    `prop_atm_01`,
    `prop_atm_02`,
    `prop_atm_03`,
    `prop_fleeca_atm`
}