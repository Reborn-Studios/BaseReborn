fx_version 'cerulean'
game 'gta5'
lua54 'yes'
nui_callback_strict_mode 'true'

ui_page 'web/index.html'

shared_scripts {
	"@vrp/lib/utils.lua",
	'Config.lua',
}

client_scripts {
	'client/client.lua',
}

server_scripts {
	'server/server.lua',
}

files {
	'web/index.html',
	'web/script.js',
	'web/style.css',
}
