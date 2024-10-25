fx_version "bodacious"
game "gta5"

ui_page 'web-side/index.html'

client_scripts {
	"@vrp/lib/utils.lua",
	"client-side/*.lua",
}

server_scripts {
	"@vrp/lib/utils.lua",
	"server-side/*.lua"
}     

files {
	"web-side/index.html",
	"web-side/css.css",
	"web-side/bg.jpg",
	"web-side/jquery.js",
}              