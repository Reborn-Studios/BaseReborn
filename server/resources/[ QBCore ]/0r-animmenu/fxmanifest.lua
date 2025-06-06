--  _____  ________  ________  ________  ___       _______   ________  ___  __    ________      
-- / __  \|\  ___  \|\   __  \|\  ___  \|\  \     |\  ___ \ |\   __  \|\  \|\  \ |\   ____\     
-- |\/_|\  \ \____   \ \  \|\  \ \____   \ \  \    \ \   __/|\ \  \|\  \ \  \/  /|\ \  \___|_    
-- \|/ \ \  \|____|\  \ \  \\\  \|____|\  \ \  \    \ \  \_|/_\ \   __  \ \   ___  \ \_____  \   
--      \ \  \  __\_\  \ \  \\\  \  __\_\  \ \  \____\ \  \_|\ \ \  \ \  \ \  \\ \  \|____|\  \  
--       \ \__\|\_______\ \_______\|\_______\ \_______\ \_______\ \__\ \__\ \__\\ \__\____\_\  \ 
--        \|__|\|_______|\|_______|\|_______|\|_______|\|_______|\|__|\|__|\|__| \|__|\_________\
--                                                                                   \|_________|
--                                                                                               
-- https://www.youtube.com/watch?v=bSN7Hhfk2QU&feature=youtu.be                                                                                              
-- https://discord.gg/mRJFK5sTyr  & https://dsc.gg/1909leaks 
fx_version 'cerulean'
game 'gta5'
lua54 'yes'
escrow_ignore {
    'shared/*.lua',
    'client/*.lua',
    'server/*.lua',
    'locales/*.lua'
}
shared_scripts {
    'shared/cores.lua',
	'shared/locale.lua',
    'locales/pt.lua',
    'shared/config.lua',
    'shared/AnimationList.lua'
}

client_scripts {
	'client/*.lua'
}
server_scripts {
    'server/*.lua'
}
ui_page 'html/index.html'
files {'html/**'}
dependency '/assetpacks'
dependency '/assetpacks'