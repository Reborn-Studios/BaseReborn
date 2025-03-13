fx_version "bodacious"
game "gta5"

ui_page "web/index.html"

author 'Lucca. (luccathereal)'
description 'https://discord.gg/4YDS7mW6UE'
version '1.0.1'

client_scripts {
	"client/*"
}

server_scripts {
	"server/*",
}

shared_script {
	"@vrp/lib/utils.lua",
	"config.lua",
	"functions.lua"
}

files {
	"web/*"
}
