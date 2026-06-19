fx_version "cerulean"
game 'gta5'
lua54 'yes'

author 'Lucca. (luccathereal)'
description 'https://discord.gg/4YDS7mW6UE'
version '2.0'

dependency 'PolyZone'

ui_page 'nui/index.html'

shared_script 'lang.lua'

client_scripts {
    '@PolyZone/client.lua',
    '@vrp/lib/utils.lua',
    'config.lua',
    'client/client.lua',
    'client/blocked_zones.lua'
}

server_scripts {
    '@vrp/lib/utils.lua',
    '@oxmysql/lib/MySQL.lua',
    'server/helper.lua',
    'server/server.lua'
}

files {
    'nui/index.html',
    'nui/styles.css',
    'nui/admin.css',
    'nui/script.js',
    'nui/admin.js',
    'nui/assets/**/*',
    'settings.json',
    'stream/rojo_jblboombox.ydr',
    'stream/rojo_jblboombox.ytyp'
}

data_file 'DLC_ITYP_REQUEST' 'stream/rojo_jblboombox.ytyp'