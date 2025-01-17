fx_version 'bodacious'
game 'gta5'

shared_scripts {
    'config.lua'
}

client_scripts {
    "@vrp/lib/utils.lua",
    'client/client.lua',
    'client/nitro.lua',
    'client/stress.lua',
    'client/status.lua',
}

server_scripts {
    "@vrp/lib/utils.lua",
	'@oxmysql/lib/MySQL.lua',
    'server/server.lua',
    'server/stress.lua',
    'server/nitro.lua',
}

ui_page {
	'html/index.html',
}

files {
	'html/assets/fonts/*.otf',
	'html/assets/images/*.png',
	'html/assets/weapons/*.png',
	'html/lib/*.js',
	'html/script/*.js',
	'html/index.html',
	'html/*.ogg',
	'html/style/*.css',
}

lua54 'on'
