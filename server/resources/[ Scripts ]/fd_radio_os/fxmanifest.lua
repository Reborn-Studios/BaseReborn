fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_yellow.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_yellow.ydr'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_grey.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_grey.ydr'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_blue.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_blue.ydr'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_green.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_green.ydr'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_red.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_red.ydr'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_white.ytyp'
data_file 'DLC_ITYP_REQUEST' 'stream/walkietalkie_white.ydr'

--[[ Manifest ]] --
dependencies {
    '/server:5104',
    '/onesync',
    'pma-voice',
    'PolyZone'
}

files {
    'web/dist/index.html',
    'web/dist/**/*',
}

ui_page 'web/dist/index.html'

shared_scripts {
    'config.lua',
    'locale.lua',
    'modules/**/shared.lua',
}

client_scripts {
    '@PolyZone/client.lua',
    '@PolyZone/CircleZone.lua',
    'modules/**/client.lua',
    'modules/**/client/*.lua'
}

server_scripts {
    'modules/**/server.lua',
    'modules/**/server/*.lua'
}
