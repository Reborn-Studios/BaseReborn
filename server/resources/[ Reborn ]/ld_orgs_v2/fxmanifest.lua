fx_version 'adamant'
game 'gta5'
lua54 'yes'

author 'Lucca. (luccathereal)'
description 'https://discord.gg/4YDS7mW6UE'
version '2.0.0'

shared_scripts {
    '@vrp/lib/utils.lua',
    'config.lua',
    'functions.lua',
    'groups.lua',
    'lang.lua',
}

server_scripts {
    'server/core/members.lua',
    'server/*.lua',
    'server/callbacks/*.lua',
    'server/core/panel_context.lua',
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

              

