--## REBORN SHOP ##--
--## REBORN SHOP ##--
--## REBORN SHOP ##--

fx_version "bodacious"
game "gta5"

ui_page 'web-side/index.html'

client_scripts {
	"@vrp/lib/utils.lua",
    "Config.lua",
	"client-side/*"
}

server_scripts {
	"@vrp/lib/utils.lua",
    "Config.lua",
	"server-side/*"
}

files {
	"web-side/index.html",
	"web-side/css.css",
	"web-side/jquery.js",
}
