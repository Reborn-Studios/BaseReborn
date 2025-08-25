fx_version "bodacious"
game "gta5"
lua54 "yes"

ui_page "web-side/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"@PolyZone/client.lua",
	"Presets.lua",
	"client-side/*"
}

server_scripts {
	"@vrp/lib/utils.lua",
	"Presets.lua",
	"server-side/*"
}

files {
	"web-side/*"
}

exports {
	"AddButton","SetTitle"
}