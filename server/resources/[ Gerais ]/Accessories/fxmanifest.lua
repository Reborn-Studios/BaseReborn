fx_version "bodacious"
game "gta5"
lua54 "yes"

ui_page "web-side/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"**/client-side/*",
}

server_scripts {
    "@mysql-async/lib/MySQL.lua",
	"@vrp/lib/utils.lua",
	"**/server-side/*",
}

shared_scripts {
	"@ox_lib/init.lua",
	"**/config.lua",
}

files {
	"stream/p_defilied_ragdoll_01_s.ydr",
	"web-side/*",
	"web-side/**/*"
}
