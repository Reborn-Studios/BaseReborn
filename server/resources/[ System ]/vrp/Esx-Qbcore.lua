QBConfig = {}
Config = {}
ESX = {}

--####----####----####----
--##  QBCore Config  ##--
--####----####----####----

QBConfig.Money = {}
QBConfig.Money.MoneyTypes = { cash = 500, bank = 5000, crypto = 0 } -- type = startamount - Add or remove money types for your server (for ex. blackmoney = 0), remember once added it will not be removed from the database!
QBConfig.Money.DontAllowMinus = { 'cash', 'crypto' } -- Money that is not allowed going in minus

QBConfig.Player = {}
QBConfig.Player.Bloodtypes = { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" }

QBConfig.Server = {} -- General server config
QBConfig.Server.Closed = false -- Set server closed (no one can join except people with ace permission 'qbadmin.join')
QBConfig.Server.ClosedReason = "Server Closed" -- Reason message to display when people can't join the server
QBConfig.Server.Whitelist = false -- Enable or disable whitelist on the server
QBConfig.Server.WhitelistPermission = 'Admin' -- Permission that's able to enter the server when the whitelist is on
QBConfig.Server.Discord = GlobalState['Basics']['Discord'] -- Discord invite link
QBConfig.Server.CheckDuplicateLicense = true -- Check for duplicate rockstar license on join
QBConfig.Server.Permissions = { 'Owner', 'Admin', 'Mod' } -- Add as many groups as you want here after creating them in your server.cfg

QBConfig.Notify = {}

QBConfig.Notify.NotificationStyling = {
    group = false, -- Allow notifications to stack with a badge instead of repeating
    position = "right", -- top-left | top-right | bottom-left | bottom-right | top | bottom | left | right | center
    progress = false -- Display Progress Bar
}

-- These are how you define different notification variants
-- The "color" key is background of the notification
-- The "icon" key is the css-icon code, this project uses `Material Icons` & `Font Awesome`
QBConfig.Notify.VariantDefinitions = {
    success = {
        classes = 'success',
        icon = 'done'
    },
    primary = {
        classes = 'primary',
        icon = 'info'
    },
    error = {
        classes = 'error',
        icon = 'dangerous'
    },
    police = {
        classes = 'police',
        icon = 'local_police'
    },
    ambulance = {
        classes = 'ambulance',
        icon = 'fas fa-ambulance'
    }
}

--####----####----####----
--##  ESX Config  ##--
--####----####----####----

Config.Accounts = {
	bank = {
		label = 'Conta do banco',
		round = true
	},
	black_money = {
		label = 'Conta do banco',
		round = true
	},
	money = {
		label = 'Dinheiro na carteira',
		round = true
	}
}

Config.EnableHud            	= false -- enable the default hud? Display current job and accounts (black, bank & cash)
Config.EnableDefaultInventory   = false -- Display the default Inventory ( F2 )
Config.OxInventory              = GlobalState['Inventory'] == "ox_inventory"
Config.PlayerFunctionOverride   = GlobalState['Inventory'] == "ox_inventory" and "OxInventory"
Config.DistanceGive 			= 4.0 -- Max distance when giving items, weapons etc.

Config.CustomAIPlates = 'ESX.A111' -- Custom plates for AI vehicles 
-- Pattern string format
--1 will lead to a random number from 0-9.
--A will lead to a random letter from A-Z.
-- . will lead to a random letter or number, with 50% probability of being either.
--^1 will lead to a literal 1 being emitted.
--^A will lead to a literal A being emitted.
--Any other character will lead to said character being emitted.
-- A string shorter than 8 characters will be padded on the right.

Config.MaxAdminVehicles = true -- admin vehicles spawn with max vehcle settings
