fx_version "bodacious"
game "gta5"
lua54 "yes"

name "triade_admin"
author "Base Triade"
description "Painel administrativo completo (Servidor, Jogadores, Advertencias, Mapa, Chamados, Setagem, RG, Itens, Veiculos, Locais e Clima)"
version "1.0.0"

ui_page "web/index.html"

dependencies {
	"/server:6116",
	"/onesync",
	"oxmysql",
	"ox_lib",
	"vrp"
}

shared_scripts {
	"@ox_lib/init.lua",
	"@vrp/lib/utils.lua",
	"config.lua"
}

client_scripts {
	"client/cl_core.lua",
	"client/cl_actions.lua",
	"client/cl_tickets.lua",
	"client/cl_tools.lua",
	"client/cl_capture.lua"
}

server_scripts {
	"@oxmysql/lib/MySQL.lua",
	"server/sv_core.lua",
	"server/sv_db.lua",
	"server/sv_compat.lua",
	"server/sv_assets.lua",
	"server/sv_catalog.lua",
	"server/sv_character.lua",
	"server/sv_players.lua",
	"server/sv_server.lua",
	"server/sv_identity.lua",
	"server/sv_groups.lua",
	"server/sv_items.lua",
	"server/sv_vehicles.lua",
	"server/sv_locations.lua",
	"server/sv_weather.lua",
	"server/sv_warns.lua",
	"server/sv_tickets.lua",
	"server/sv_map.lua",
	"server/sv_tools.lua",
	"server/sv_capture.lua",
	"server/sv_selftest.lua"
}

files {
	"web/index.html",
	"web/style.css",
	"web/app.js",
	"web/img/*"
}
