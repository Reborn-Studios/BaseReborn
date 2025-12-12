Proxy = module("vrp","lib/Proxy")
Reborn = Proxy.getInterface("Reborn")

Config = {}

Config.debug = false

Config.imageDirect = Reborn.images().."/%s.png"

-----------------------
--- Progress bar
-----------------------

Config.progressColor = "#ff8c00"

Config.progressType = 2         -- 1 | 2

Config.progressPosition = {
    vertical = 'end',           -- start, center, end
    horizontal = 'end',      -- start, center, end
}

-----------------------
--- Notificações gerais
-----------------------

Config.notifyPosition = {
    top = "25%",
    right = "1%"
}

Config.typeStyles = {
    ['success'] = {
        ['color'] = '#4caf50',
        ['gradient'] = 'linear-gradient(90deg, #4caf5033 25%, #0e0f0e11 50%)',
        ['icon'] = './success.svg'
    },
    ['error'] = {
        ['color'] = '#ff4b4b',
        ['gradient'] = 'linear-gradient(90deg, #ff4b4b33 25%, #e9454573 50%)',
        ['icon'] = './alert.svg'
    },
    ['warning'] = {
        ['color'] = '#ffb84d',
        ['gradient'] = 'linear-gradient(90deg, #ffb84d33 25%, #ff880011 50%)',
        ['icon'] = './bell.svg'
    },
    ['info'] = {
        ['color'] = '#2196f3',
        ['gradient'] = 'linear-gradient(90deg, #2196f333 25%, #1565c011 50%)',
        ['icon'] = './info.svg'
    },
    ['payment'] = {
        ['color'] = '#00c853',
        ['gradient'] = 'linear-gradient(90deg, #00c85333 25%, #00962411 50%)',
        ['icon'] = './dollar.svg'
    },
    ['police'] = {
        ['color'] = '#2196f3',
        ['gradient'] = 'linear-gradient(90deg, #2196f333 25%, #1565c011 50%)',
        ['icon'] = "police.svg",
    },
    ['ambulance'] = {
        ['color'] = '#ff4b4b',
        ['gradient'] = 'linear-gradient(90deg, #ff4b4b33 25%, #e9454573 50%)',
        ['icon'] = "ambulance.svg",
    },
    ['mechanic'] = {
        ['color'] = '#ffb84d',
        ['gradient'] = 'linear-gradient(90deg, #ffb84d33 25%, #ff880011 50%)',
        ['icon'] = "mechanic.svg",
    },
}

---------------------------
--- Notificações para itens
---------------------------

Config.itemNotifyPosition = {
    bottom = "2%",
    left = "50%"
}

Config.itemStyles = {
    ['added'] = {
        ['borderColor'] = '#00c086ff',
        ['color'] = '#4caf78c7',
        ['text'] = 'ADICIONADO'
    },
    ['removed'] = {
        ['borderColor'] = '#ff4b4bff',
        ['color'] = '#ff4b4bbb',
        ['text'] = 'REMOVIDO'
    },
    ['equipped'] = {
        ['borderColor'] = '#2196f3ff',
        ['color'] = '#2195f3b2',
        ['text'] = 'EQUIPADO'
    },
    ['unequipped'] = {
        ['borderColor'] = '#ff6811',
        ['color'] = '#fa843f',
        ['text'] = 'DESEQUIPADO'
    },
    ['general'] = {
        ['borderColor'] = '#ffb84dff',
        ['color'] = '#ffb84db6',
        ['text'] = ''
    }
}

Config.convertedTypes = {
    ui_added = "added",
    ui_removed = "removed",
    ui_equipped = "equipped",
    ui_holstered = "unequipped",
    REMOVIDO = "removed",
    RECEBEU = "added",
    EQUIPADO = "equipped",
    DESEQUIPADO = "unequipped",
}

--[[

## COMANDOS PARA TESTAR

/testNotify
/testProgress
/testItensNotify

]]