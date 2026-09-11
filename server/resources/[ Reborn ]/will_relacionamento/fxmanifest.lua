fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Reborn Studios'
version '1.0.0'

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js'
}

shared_scripts {
    '@ox_lib/init.lua',
    '@vrp/lib/utils.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}
