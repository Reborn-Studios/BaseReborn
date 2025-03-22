fx_version "bodacious"
game "gta5"

ui_page "web-side/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"**/client-side/*",
}

server_scripts {
	"@vrp/lib/utils.lua",
	"**/server-side/*",
}

files {
	"stream/p_defilied_ragdoll_01_s.ydr",
	"web-side/*",
	"web-side/**/*"
}
