fx_version "bodacious"
game "gta5"
lua54 'yes'
ui_page "web-side/index.html"

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
	'ox_lib'
}

shared_scripts {
	'@ox_lib/init.lua',
	"lib/utils.lua",
    'Reborn/locale.lua',
	"Base_Config.lua",
	"Esx-Qbcore.lua",
	"lib/adaptive.lua"
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	"base.lua",
	"lib/server.lua",
	"queue.lua",
	"server-side/*",
}

client_scripts {
	"@PolyZone/client.lua",
	"client-side/*",
}

files {
	"Reborn/*",
	"web-side/*",
	"web-side/**/*",
	"lib/Tunnel.lua",
	"lib/Proxy.lua",
	"lib/utils.lua",
	"lib/vehicles.lua",
	"lib/Tools.lua",
}

provide 'taskbar'
provide 'qb-core'
provide 'es_extended'
provide 'spawnmanager'
provide 'sessionmanager'