fx_version   'bodacious'
game         'gta5'
lua54        'yes'

ui_page 'web-side/index.html'

dependencies {
    '/server:5181',
    '/onesync',
}

shared_scripts {
    '@vrp/lib/utils.lua',
    'Config.lua'
}

server_scripts {
    "server-side/*.lua",
}

client_scripts {
    "@PolyZone/client.lua",
    "client-side/*.lua",
}

files {
	"web-side/index.html",
	"web-side/style.css",
	"web-side/script.js",
}

dependency "PolyZone"