fx_version "cerulean"
game 'gta5'
lua54 'yes'

author 'Lucca. (luccathereal)'
description 'https://discord.gg/4YDS7mW6UE'
version '1.0.1'

shared_script {
    "@vrp/lib/Utils.lua",
    "config.lua"
} 

client_scripts {
    "functions_client.lua",
    "client/client.lua",
}

server_scripts {
    "functions_server.lua",
    "server/server.lua",
    "@mysql-async/lib/MySQL.lua",
    "@oxmysql/lib/MySQL.lua",
}

ui_page "ui/index.html"

files {
    "ui/img/*.png",
    "ui/img/*.gif",
    "ui/img/*.*",
    "ui/*.html",
    "ui/*.js",
    "ui/*.css",
    "ui/fonts/*.ttf",
    "ui/sounds/*.ogg",
    "data/*.meta",
    "stream/vehicle_paint_ramps.ytd",
	"dlcsounds_sounds.dat54.rel",
    "dlc_sounds/sounds.awc",
}

data_file "CARCOLS_GEN9_FILE" "data/carcols_gen9.meta"
data_file "CARMODCOLS_GEN9_FILE" "data/carmodcols_gen9.meta"
data_file "FIVEM_LOVES_YOU_447B37BE29496FA0" "data/carmodcols.ymt"

data_file "AUDIO_WAVEPACK" "dlc_sounds"
data_file "AUDIO_SOUNDDATA" "dlcsounds_sounds.dat"

dependency '/assetpacks'