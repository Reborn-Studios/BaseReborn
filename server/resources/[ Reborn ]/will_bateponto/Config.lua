Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")
local Webhooks = module("Reborn/webhooks") or {}

Config = {}

Config.base = "creative"       -- vrpex / creative

Config.data = {
    ['Police'] = {
        webhook = Webhooks.webhooktogglepolice,
        coords = {
            {-579.25,-2161.59,6.72},
            { -1071.08,-823.24,5.48 },
            {927.13,-3180.89,7.49},
            {-575.72,-2395.38,19.13},
            {-1646.01,-869.32,9.78},
            {-2084.96,-542.17,13.75},
            {-218.51,1571.4,343.13},
            {-341.55,-1406.11,31.96},
            {-292.19,6122.03,34.41},
        },
        groups = {
            [1] = {
                group = "Recruta",
                paisanaGroup = "PaisanaRecruta",
            },
            [2] = {
                group = "Soldado",
                paisanaGroup = "PaisanaSoldado",
            },
            [3] = {
                group = "Cabo",
                paisanaGroup = "PaisanaCabo",
            },
            [4] = {
                group = "3Sargento",
                paisanaGroup = "Paisana3Sargento",
            },
            [5] = {
                group = "2Sargento",
                paisanaGroup = "Paisana2Sargento",
            },
            [6] = {
                group = "Sargento",
                paisanaGroup = "PaisanaSargento",
            },
            [7] = {
                group = "Sub.Tenente",
                paisanaGroup = "PaisanaSub.Tenente",
            },
            [8] = {
                group = "Tenente",
                paisanaGroup = "PaisanaTenente",
            },
            [9] = {
                group = "Major",
                paisanaGroup = "PaisanaMajor",
            },
            [10] = {
                group = "Capitao",
                paisanaGroup = "PaisanaCapitao",
            },
            [11] = {
                group = "Coronel",
                paisanaGroup = "PaisanaCoronel",
            },
            [12] = {
                group = "Delegado",
                paisanaGroup = "PaisanaDelegado",
            },
        }
    },
    ['Medic'] = {
        webhook = Webhooks.webhooktogglemedic,
        coords = {
            { -854.77,-2185.62,8.95 }
        },
        groups = {
            [1] = {
                group = "Enfermeiro",
                paisanaGroup = "PaisanaEnfermeiro",
            },
            [2] = {
                group = "Medico",
                paisanaGroup = "PaisanaMedico",
            },
            [3] = {
                group = "Diretor",
                paisanaGroup = "PaisanaDiretor",
            },
        }
    },
    ['Mechanic'] = {
        webhook = Webhooks.webhooktogglemechanic,
        coords = {
            { 821.16,-932.98,26.47 }
        },
        groups = {
            [1] = {
                group = "Mecanico",
                paisanaGroup = "PaisanaMecanico",
            },
            [2] = {
                group = "Mecanicolider",
                paisanaGroup = "PaisanaMecanicolider",
            }
        }
    }
}

Config.func = {
    getUserId = function(source)
        return vRP.getUserId(source)
    end,

    hasGroup = function(user_id, group)
        return vRP.hasGroup(user_id, group)
    end,

    updateGroup = function(user_id, group, newGroup)
        vRP.removeUserGroup(user_id,group)
        vRP.addUserGroup(user_id, newGroup)
    end,

    enterService = function(source)
        if vRP.hasPermission(vRP.getUserId(source),"policia.permissao") then
            TriggerEvent("vrp_blipsystem:serviceEnter",source,"Policial",77)
            TriggerClientEvent("tencode:StatusService",source,true)
            TriggerClientEvent("vrp_tencode:StatusService",source,true)
        end
    end,

    exitService = function(source)
        TriggerEvent("vrp_blipsystem:serviceExit",source)
        TriggerClientEvent("tencode:StatusService",source,false)
        TriggerClientEvent("vrp_tencode:StatusService",source,false)
    end,

    removeObjects = function()
        if Config.base == "creative" or Config.base == "summerz" then	
            vRP.removeObjects()
        else
            vRP._DeletarObjeto()
        end
    end,
    
    createTablet = function()
        if Config.base == "creative" or Config.base == "summerz" then		
            vRP.createObjects("amb@code_human_in_bus_passenger_idles@female@tablet@base","base","prop_cs_tablet",50,28422)
        else
            vRP._CarregarObjeto("amb@code_human_in_bus_passenger_idles@female@tablet@idle_a","idle_b","prop_cs_tablet",49,28422)
        end
    end,

    sendDiscord = function(webhook, title, text)
        vRP.createWeebHook(webhook, "```prolog\n"..title.." "..text.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
    end,
}
