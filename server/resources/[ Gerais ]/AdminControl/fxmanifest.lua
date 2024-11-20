fx_version "bodacious"
game "gta5"
lua54 'yes'

ui_page 'web/index.html'

dependencies {
    '/server:6116',
    '/onesync',
	'ox_lib'
}

shared_scripts {
	'@ox_lib/init.lua',
	"@vrp/lib/utils.lua",
	"Config.lua",
}

client_scripts {
	"@PolyZone/client.lua",
	"client.lua",
	"**/client.lua",
}

server_scripts {
	"server.lua",
	"**/server.lua",
}

files {
	'web/*'
}
