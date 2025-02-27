--## REBORN SHOP ##--
--## REBORN SHOP ##--
--## REBORN SHOP ##--

fx_version 'adamant'
game 'gta5'

ui_page "nui/index.html"

client_scripts {
	"@vrp/lib/utils.lua",
	'Config.lua',
	'Homes.lua',
	'client/*'
}

server_scripts {
	"@vrp/lib/utils.lua",
	'Config.lua',
	'Homes.lua',
	'server/*',
}
 
files {
	"nui/index.html",
	"nui/fonts/*.ttf",
	"nui/interiors/*.png",
	"nui/bg.png",
	"nui/style.css",
	"nui/jquery.js",
}
