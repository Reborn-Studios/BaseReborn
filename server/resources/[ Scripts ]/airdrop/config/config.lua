_G.Index = {}; -- nao mexa

Index.Main = {
    --[[
        opcoes disponives de minutos: 

        60 - 1 minuto;
        120 - 2 minutos;
        180 - 3 minutos;
        240 - 4 minutos;
        300 - 5 minutos;
    ]]
    ['minutos'] = { -- minutos para liberar a caixa de suprimentos (passar os segundos)
        180
    },

    ['cds'] = { -- coordenadas dos airdrops
        [1] = {['x'] = -922.99, ['y'] = -724.39, ['z'] = 19.92, ['nome'] = 'Quadra do CHINA'},
        [2] = {['x'] = 87.92, ['y'] = -1927.11, ['z'] = 20.79, ['nome'] = 'Rua dos BALLAS'},
        [3] = {['x'] = 1462.44, ['y'] = 1109.78, ['z'] = 114.34, ['nome'] = 'Fazenda'},
        [4] = {['x'] = -286.21, ['y'] = -1643.74, ['z'] = 31.85, ['nome'] = 'Quadra da Groove'},
        [5] = {['x'] = 326.54, ['y'] = -2033.8, ['z'] = 20.92, ['nome'] = 'Rua dos Vagos'},
        [6] = {['x'] = 771.12, ['y'] = -233.15, ['z'] = 66.12, ['nome'] = 'Campinho'},
        [7] = {['x'] = 888.06, ['y'] = 14.95, ['z'] = 78.9, ['nome'] = 'Cassino'},
        [8] = {['x'] = 1029.4, ['y'] = -539.58, ['z'] = 60.51, ['nome'] = 'Lago'},
        [9] = {['x'] = -1246.02, ['y'] = -1664.11, ['z'] = 3.95, ['nome'] = 'Quadra BLOODS'},
        [10] = {['x'] = -2237.82, ['y'] = 264.83, ['z'] = 174.62, ['nome'] = 'Universidade'},
        [11] = {['x'] = 2402.26, ['y'] = 3106.73, ['z'] = 48.25, ['nome'] = 'Aero Abandonado'},
    },

    ['time'] = { -- tempo em milisegundos, q o drop vai cair do ceu, quanto maior esse numero mais devagar ele vai cair, quanto menor o numero, mais rapido vai cair (recomendado 15 ou 20)
        40
    },

    ['_reward'] = { -- recompensas do airdrop
        itens = {
            {'WEAPON_PISTOL_MK2', math.random(2, 4)},
            {'ammo-9', math.random(250, 750)},
            {'dollars', math.random(250000, 300000)},
            {'backpackm', math.random(1, 4)},
            {'energetic', math.random(8,15)},
            {'radio', math.random(1, 4)},
        }
    },

    ['webhook'] = { -- webhook de ganhadores
        ''
    },

    ['permission'] = { -- permissao para soltar o airdrop
        'Admin'
    },

    ['delay'] = { -- delay pra soltar airdrop
        120
    },

    ['delayToRobbery'] = { -- tempo de roubo do air drop em milisegundos
        1250
    }
};

return Index; -- nao mexa