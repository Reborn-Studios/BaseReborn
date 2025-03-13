fx_version 'cerulean'
game 'gta5'
description 'gfx-racing'
author 'HSN'
version '1.0.0'
lua54 'yes'

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'config.lua',
    'server/server-config.lua',
    'server/main.lua',
    'server/functions.lua',
    'server/player.lua',
}


client_scripts {
    'config.lua',
    'client/*.lua'
}

ui_page {
    'ui/index.html',
}

files {
    'ui/index.html',
    'ui/fonts/*.otf',
    'ui/fonts/*.OTF',
    'ui/fonts/*.ttf',
    'ui/images/*.png',
    'ui/mapStyles/**/**/*.jpg',
    'ui/*.js',
    'ui/style.css',
    'ui/blips/*.png'
}

dependency '/assetpacks'
