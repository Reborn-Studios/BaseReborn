fx_version 'bodacious'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
name 'ox_inventory'
author 'Overextended'
version '2.44.1'
repository 'https://github.com/overextended/ox_inventory'
description 'Slot-based inventory with item metadata support'

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
    'ox_lib',
    'ox_target',
}

shared_script '@ox_lib/init.lua'

ox_libs {
    'locale',
    'table',
    'math',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    '@vrp/lib/utils.lua',
    '@vrp/config/Item.lua',
    '@vrp/config/Usables.lua',
    '@vrp/config/Vehicle.lua',
    'init.lua'
}

client_script 'init.lua'

ui_page 'web/build/index.html'

files {
    'client.lua',
    'server.lua',
    'locales/*.json',
    'web/build/index.html',
    'web/build/assets/*.js',
    'web/build/assets/*.css',
    'modules/**/shared.lua',
    'modules/**/client.lua',
    'modules/bridge/**/client.lua',
    'data/*.lua',
}
