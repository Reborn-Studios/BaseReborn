fx_version 'bodacious'
game 'gta5'
lua54 'yes'

client_scripts {
    'client-side/*.lua'
}

shared_scripts {
    "@vrp/lib/utils.lua",
    'config.lua'
}

server_scripts {
    "server-side/server.lua"
}

ui_page 'web-side/dist/index.html'

files {
    'web-side/dist/**',
}
