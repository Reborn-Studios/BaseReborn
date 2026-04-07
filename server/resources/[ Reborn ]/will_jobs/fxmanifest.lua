--## REBORN SHOP ##--
--## REBORN SHOP ##--
--## REBORN SHOP ##--
fx_version "bodacious"
game "gta5"

author 'williv'
ui_page 'web-side/index.html'

client_scripts {
	"@vrp/lib/utils.lua",
    "Config.lua",
	"client-side/routes.lua",
	"client-side/clothes.lua",
	"client-side/client_config.lua",
	"client-side/client.lua",
	"client-side/peds.lua",
	"client-side/jobs.lua",
}

server_scripts {
	"@vrp/lib/utils.lua",
    "Config.lua",
	"server-side/functions.lua",
	"server-side/server.lua",
}

files {
	"web-side/index.html",
	"web-side/assets/**",
}
