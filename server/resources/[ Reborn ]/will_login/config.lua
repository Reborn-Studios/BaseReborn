Config = {}

Config.Mysql = "oxmysql"                        -- mysql-async , ghmattimysql, oxmysql
Config.Register = {
    ['name'] = true,
    ['email'] = true,
    ['phone'] = true,
    ['birthdate'] = true
}
Config.Discord = GlobalState['Basics']["Discord"]
Config.Codep = "RBN"                            -- Prefixo do codigo
Config.CodeNumber = 6                           -- Quantidade de caracteres
Config.Login = true                            -- Assim que o codigo for resgatado, pode resgatar novamente (Quando tem mais personagem)
Config.MenuCommand = "referencemenu"            -- Comando para abrir menu

Config.Vehicles = {
    {
        index = "488",
        image = "https://api.rebornsystem.com.br/imagens/488.png",
        title = "Ferrari 488",
        days = 3
    },
    {
        index = "gt63",
        image = "https://api.rebornsystem.com.br/imagens/gt63.png",
        title = "Mercedes GT63",
        days = 5
    },
    {
        index = "z8r",
        image = "https://api.rebornsystem.com.br/imagens/s1000rr.png",
        title = "Z8 R",
        days = 7
    }
}

Config.Away = {
    [1] = { -- Invite Level
        price = 2000 -- level award
    },
    [2] = { -- Invite Level
        price = 5000 -- level award
    },
    [3] = { -- Invite Level
        price = 7500 -- level award
    },
    [4] = { -- Invite Level
        price = 7500 -- level award
    },
    [5] = { -- Invite Level
        price = 9000 -- level award
    },
    [6] = { -- Invite Level
        price = 9000 -- level award
    },
    [7] = { -- Invite Level
        price = 10000 -- level award
    },
    [8] = { -- Invite Level
        price = 10000 -- level award
    },
    [9] = { -- Invite Level
        price = 15000 -- level award
    },
    [10] = { -- Invite Level
        price = 20000 -- level award
    },
    [11] = { -- Invite Level
        price = 20000 -- level award
    },
}
