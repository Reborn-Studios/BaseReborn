fx_version "bodacious"
game "gta5"

ui_page "Web/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"@vrp/Reborn/cloakrooms.lua",
	"Config.lua",
	"**/client.lua",
}

server_scripts {
	"@vrp/lib/utils.lua",
	"@vrp/Reborn/cloakrooms.lua",
	"Config.lua",
	"**/server.lua",
}

files {
	"Web/*",
	"Web/**/*"
}

provide "survival"