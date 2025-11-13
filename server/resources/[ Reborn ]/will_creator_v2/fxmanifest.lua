fx_version 'bodacious'
game 'gta5'
lua54 'yes'

version '1.0.0'
ui_page 'web-side/dist/index.html'

client_scripts {
    "@vrp/lib/utils.lua",
    'Config.lua',
    'client-side/*.lua'
}

server_scripts {
    "@vrp/lib/utils.lua",
    'Config.lua',
    'server-side/*.lua'
}

files {
    'web-side/dist/index.html',
    'web-side/dist/**',
}

dependency '/assetpacks'
