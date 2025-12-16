fx_version 'adamant'
game 'gta5'
lua54 'yes'

author 'Lucca. (luccathereal)'
description 'https://discord.gg/4YDS7mW6UE'
version '1.0.0'

shared_scripts {
    '@vrp/lib/utils.lua',
    'config.lua',
    'functions.lua',
    'groups.lua',
    'lang.lua',
}

server_scripts {
    'server/*.lua',
    'server/callbacks/*.lua',
}  

client_scripts {
    'client/*.lua',
    'client/callbacks/*.lua',
}  

ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*'
}                            

              

