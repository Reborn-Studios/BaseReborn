fx_version "bodacious"
game "gta5"
author "Reborn Studios"

ui_page "web-side/index.html"

shared_scripts {
	"@vrp/lib/utils.lua",
	"callback/shared.lua",
	"Config.lua",
}

client_scripts {
	"callback/client.lua",
	"client-side/**",
}

server_scripts {
	"callback/server.lua",
	"server-side/*",
}

files {
	"web-side/*",
}