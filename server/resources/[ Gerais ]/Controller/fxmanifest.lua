fx_version "bodacious"
game "gta5"
lua54 "yes"

ui_page "Web/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	"Config.lua",
	"**/client.lua",
}

server_scripts {
	"@vrp/lib/utils.lua",
	"Config.lua",
	"**/server.lua",
}

shared_script '@ox_lib/init.lua'

files {
	"Web/*",
	"Web/**/*"
}

provide "survival"