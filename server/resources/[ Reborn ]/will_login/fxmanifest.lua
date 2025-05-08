fx_version 'adamant'
game 'gta5'
lua54 'yes'

ui_page 'html/ui.html'

client_scripts {
	'config.lua',
	'client.lua',
}

server_scripts {
	"@vrp/lib/utils.lua",
	'@mysql-async/lib/MySQL.lua',
	'config.lua',
	'functions.lua',
	'server.lua',
}

files {
	'html/ui.html',
	'html/*.css',
	'html/*.js',
	'html/img/*.png',
	'html/img/*.jpg',
	'html/img/*.svg',
}
