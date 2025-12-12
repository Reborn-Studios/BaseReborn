fx_version 'cerulean'
game "gta5"
version '0.0.1'
lua54 'yes'

ui_page 'html/index.html'
-- ui_page 'http://localhost:3000'

client_scripts {
  '@vrp/lib/utils.lua',
  'client/**',
}

server_scripts {
  '@mysql-async/lib/MySQL.lua',
  'server/**',
}

shared_scripts {
  'lang.lua',
  'config.lua',
	'@ox_lib/init.lua',
  '@reborn_uipack/init.lua',
}

files {
  'data/*',
  'html/**',
}

escrow_ignore {
  'config.lua',
  'lang.lua',
  'server/bridge.lua'
}
dependency '/assetpacks'