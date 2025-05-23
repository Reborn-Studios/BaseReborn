Config = {}

--------##########################----------
------           Gerais           ---------
--------##########################----------

Config.Geral = {
    -- Tempo para entregar os salarios (minutos)
    ['salaryTime'] = 30,
    -- Veiculos bloqueados de fazer drift
    ['driftBlocked'] = {
        [`coach`] = true,
        [`bus`] = true,
        [`youga2`] = true,
        [`ratloader`] = true,
        [`taxi`] = true,
        [`boxville4`] = true,
        [`trash2`] = true,
        [`tiptruck`] = true,
        [`rebel`] = true,
        [`speedo`] = true,
        [`phantom`] = true,
        [`packer`] = true,
        [`paramedicoambu`] = true,
    },
}

--------##########################----------
------          Survival          ---------
--------##########################----------

Config.Survival = {
    -- Tempo de morte
    ['deathTimer'] = 60,
    -- Coordenadas para reviver
    ['reviveCoords'] = { 1139.18,-1573.4,35.39 },
    -- Preço de do /socorro
    ['socorroValue'] = 10000,
}

--------##########################----------
------          Hospital          ---------
--------##########################----------

Config.Hospital = {
    -- Ativar/desativar sangramento
    ['bleedind'] = true,
    -- Locais de atendimentos
    ['services'] = {
        ['Santos'] = {
            init =  { 1139.93,-1536.88,35.39 },
            beds = {
                { 1126.53,-1546.94,35.9 },
                { 1123.58,-1547.12,35.9 },
                { 1120.52,-1547.3,35.9 },
                { 1121.12,-1538.45,35.9 },
                { 1124.17,-1538.27,35.9 },
                { 1127.21,-1538.06,35.9 },
            }
        }
    },
    -- Macas avulsas
    ['beds'] = {
        { ['x'] = 321.76, ['y'] = -586.79, ['z'] = 43.29 },
        { ['x'] = 314.7, ['y'] = -579.51, ['z'] = 43.29 },
        { ['x'] = 310.35, ['y'] = -577.82, ['z'] = 43.29 },
        { ['x'] = -577.47, ['y'] = -581.57, ['z'] = 43.29 },
        { ['x'] = 312.08, ['y'] = -583.11, ['z'] = 43.29 },
        { ['x'] = 315.42, ['y'] = -584.65, ['z'] = 43.29 },
        { ['x'] = 318.62, ['y'] = -585.7, ['z'] = 43.29 },
        { ['x'] = 308.68, ['y'] = -582.1, ['z'] = 43.29 },
    },
    -- Valor dos tratamentos
    ['treatmentValue'] = {
        -- Padrao
        ['default'] = 500,
        -- Tratamento para policial de graça
        ['freePolice'] = true,
        -- Valor para morto
        ['death'] = 2000,
    },
}

--------##########################----------
------            Admin           ---------
--------##########################----------

Config.Admin = {
    -- Comandos e permissoes
    ['kickall'] = "console",
    ['say'] = "console",
    ['skin'] = "Owner",
    ['item'] = "admin.permissao",
    ['debug'] = "admin.permissao",
    ['addcar'] = "owner.permissao",
    ['addtempcar'] = "owner.permissao",
    ['capuz'] = "owner.permissao",
    ['noclip'] = {	"Owner", "Admin", "Mod", "Sup" },
    ['gobucket'] = "admin.permissao",
    ['kick'] = { "Owner", "Admin", "Mod", "Sup" },
    ['ban'] = {	"Owner", "Admin" },
    ['unban'] = { "Owner", "Admin" },
    ['wl'] = { "Owner", "Admin", "Mod", "Sup" },
    ['unwl'] = { "Owner", "Admin", "Mod", "Sup" },
    ['coins'] = "owner.permissao",
    ['money'] = "admin.permissao",
    ['tpcds'] = "admin.permissao",
    ['cds'] = "suporte.permissao",
    ['cds2'] = "suporte.permissao",
    ['group'] = "moderador.permissao",
    ['ungroup'] = "moderador.permissao",
    ['rg2'] = {	"Owner", "Admin", "Mod", "Sup" },
    ['tptome'] = { "Owner", "Admin", "Mod" },
    ['limparinv'] = "admin.permissao",
    ['tpto'] = { "Owner", "Admin", "Mod", "Sup" },
    ['tpway'] = { "Owner", "Admin", "Mod", "Sup" },
    ['hash'] = { "Owner", "Admin", "Mod", "Sup" },
    ['getcar'] = { "Owner", "Admin" },
    ['delnpcs'] = "Owner",
    ['tuning'] = "Owner",
    ['limpararea'] = {	"admin.permissao", "policia.permissao" },
    ['players'] = "admin.permissao",
    ['pon'] = "suporte.permissao",
    ['anuncio'] = {	"Owner", "Admin" },
    ['itemall'] = "Owner",
    ['pegarip'] = "Owner",
    ['spec'] = "Owner",
    ['kill'] = "Owner",
    ['freeze'] = "Owner",
    ['dm'] = "admin.permissao",
    ['checkgroup'] = "admin.permissao",
    ['rg'] = { "admin.permissao", "policia.permissao" },
    ['time'] = "admin.permissao",
    ['weather'] = "admin.permissao",
    ['wall'] = "admin.permissao",
    ['postit'] = "admin.permissao",
}

--------##########################----------
------            Wall            ---------
--------##########################----------

Config.Wall = {
    ['distance'] = 150.0,
    ['threadTime'] = 5000,
}
