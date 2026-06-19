fx_version 'cerulean'
game 'gta5'
lua54 'yes'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/assets/**/*',
}

shared_scripts {
    '@ox_lib/init.lua',
    '@reborn_uipack/init.lua',
    'config.lua',
}

client_scripts {
    'client-side/*.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server-side/server.lua',
}

dependencies {
    'oxmysql',
    'ox_lib',
}
