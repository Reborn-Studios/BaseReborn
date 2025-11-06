fx_version 'cerulean'
game 'gta5'

author 'Farzam'
description 'A FiveM loading screen made with ❤️ using React, Tailwind, and Vite'
version '1.0.3'

-- Optional: Include if you're using any client-side logic (remove if unused)
-- client_script 'client/client.lua'

-- Files to load (built assets from Vite build)
files {
    'html/index.html',
    'html/assets/**',
    'html/config.json',
    'html/*.js',
    'html/*.css',
    'html/*.ico',
    'html/*.png',
    'html/*.svg',
    'html/*.mp3',
    'html/*.mp4'
}

-- Entry point
loadscreen 'html/index.html'

-- Optional UX improvements
loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

-- Engine version + compatibility flags
lua54 'yes'
use_experimental_fxv2_oal 'yes'

server_script 'server/server.lua'
