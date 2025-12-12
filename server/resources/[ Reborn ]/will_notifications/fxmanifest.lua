fx_version 'bodacious'
game 'gta5'
lua54 'yes'

client_scripts {
    "@vrp/lib/utils.lua",
    'client-side/*.lua'
}

shared_scripts {
    'config.lua'
}

server_scripts {
    "@vrp/lib/utils.lua",
    "server-side/server.lua"
}

ui_page 'web-side/dist/index.html'

files {
    'web-side/dist/**',
}
