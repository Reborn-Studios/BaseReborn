local Webhooks = module("Reborn/webhooks")
Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")
Reborn = Proxy.getInterface("Reborn")

---###############---
---##[ Configs ]##---
---###############---

Config = {}

Config.base = "creative"                                        -- 'vrpex' / 'creative'

Config.imgDiret = Reborn.images().."/"                          --Reborn.images().."/"                               -- Diretorio das imagens dos veiculos

Config.vehicle_db = "vrp_vehicles"                              -- Banco de dados de veiculos
Config.differentPlate = true

Config.openPainel = "mdt"

Config.ld_smartbank = true

Config.debug = false

Config.permissions = {                                          -- Permissões padrão e para o gerenciamento
    ['Police'] = "policia.permissao",
    ['Administration'] = {
        ['Perm'] = "Coronel",
        ['Acesso'] = {}
    }
}

Config.hierarquia = {                                           -- Hierarquia da Policia (A ordem é IMPORTANTE!)
    [1] = "Coronel",
    [2] = "Capitao",
    [3] = "Major",
    [4] = "Tenente",
    [5] = "Sub.Tenente",
    [6] = "Sargento",
    [7] = "2Sargento",
    [8] = "3Sargento",
    [9] = "Cabo",
    [10] = "Soldado",
    [11] = "Recruta"
}

Config.coords_prison = {                                        -- Coordenadas ao ser preso e ao ser solto
    ['Preso'] = vector3(1680.1,2513.0,45.5),
    ['Solto'] = vector3(1850.5,2604.0,45.5),
}

Config.serviceTime = {                                          -- Configuração para reduzir o tempo de prisão
    ['Time_cooldown'] = 60,                                     -- Tempo para reduzir a quantidade de meses presos (60 segundos)
    ['Tempo'] = 1,                                              -- A cada 'Time_cooldown' segundos, diminui 1
    ['Reduzir'] = 4,                                            -- Reduzir pena por serviço
    ['Limite'] = 4,                                             -- Limite para parar de trabalhar
    ['Caixa'] = {                                               -- Configuração do emprego de carregar caixa
        ['Pegar'] = vector3(1691.59,2566.05,45.56),
        ['Entregar'] = vector3(1669.51,2487.71,45.82),
        
    }
}

----################----
----##[ Webhooks ]##----
----################----

Config.hookManagment = ""                                       -- Webhook para o gerenciamento dos policias

Config.hookPrisao = ""                                          -- Webhook ao prender alguem

Config.hookMulta = ""                                           -- Webhook ao multar alguem

Config.post_photo = "https://discord.com/api/webhooks/1330976859319439381/nlIB4iaSaPSZIcJTtK1ljkIr_RKUp2O12HgA-NPaFOOBAiUJAZkZxJxcWWp4rKKbtBvC"                                          -- Webhook para registrar a foto

----#######################----
--##[ Codigo serviceTimel ]##--
----#######################----

Config.timeReductionList = {                                    -- Porcentagem para reduzir os meses de prisão
    0,
	10,
	20,
	30,
	40,
	50,
}

Config.vehicleStatusList = {                                    -- Status dos veiculos
    'Regular',
	'Detido',
	'Roubado',
}

Config.codigo_penal = {
    [1] = {
        name = "Homicídio",
        serviceTime = 10,
        taxValue = 1000,
    },
    [2] = {
        name = "Roubo ao Banco Central",
        serviceTime = 100,
        taxValue = 30000,
    },  
    [3] = {
        name = "Roubo a Lojinha",
        serviceTime = 20,
        taxValue = 5000,
    },
    [4] = {
        name = "Tentativa de Homicídio",
        serviceTime = 50,
        taxValue = 10000,
    },
    [5] = {
        name = "Tráfico de Armas",
        serviceTime = 55,
        taxValue = 50000,
    },
    [6] = {
        name = "Desobediência",
        serviceTime = 10,
        taxValue = 5000,
    },
    [7] = {
        name = "Posse de algema, capuz, C4 ou lockpick",
        serviceTime = 35,
        taxValue = 20000,
    },
    [8] = {
        name = "Ocultação Facial",
        serviceTime = 0,
        taxValue = 7500,
    },
}

----################----
--##[  FUNCTIONS  ]##--
----################----

Config.servicosElec = {                                         -- Serviço de eletrica
	[1] = { 1679.65,2480.19,45.57,136.52 },
	[2] = { 1700.21,2474.81,45.57,228.39 },
	[3] = { 1706.99,2481.11,45.57,226.21 },
	[4] = { 1737.41,2504.68,45.57,166.44 },
	[5] = { 1760.65,2519.08,45.57,256.13 },
	[6] = { 1695.8,2536.22,45.57,90.09 },
	[7] = { 1652.46,2564.41,45.57,0.38 },
	[8] = { 1629.92,2564.38,45.57,1.6 },
	[9] = { 1624.51,2577.44,45.57,272.34 },
	[10] = { 1608.92,2566.89,45.57,43.79 },
	[11] = { 1609.91,2539.73,45.57,135.58 },
	[12] = { 1622.37,2507.73,45.57,97.58 },
	[13] = { 1643.92,2490.75,45.57,187.29 }
}

Config.notification = function(source,msg,variable1,variable2)
    if variable1 == nil then variable1 = "" end
    if variable2 == nil then variable2 = "" end
    local Notifys = {
        ['Applied_prison'] = {
            Type = "sucesso",
            Msg = "Detenção aplicada com sucesso."
        },
        ['Receive_prison'] = {
            Type = "importante",
            Msg = "Você foi preso por <b>"..variable1.."</b> meses. Motivo: "..variable2.."."
        },
        ['Receive_fine'] = {
            Type = "importante",
            Msg = "Você recebeu uma multa de <b>R$"..variable1.."</b>"
        },
        ['Rest_prison'] = {
            Type = "aviso",
            Msg = "Você ainda tem <b>"..variable1.." meses</b> restantes."
        },
        ['Limit_work'] = {
            Type = "negado",
            Msg = "Atingiu o limite da redução de serviceTime, não precisa mais trabalhar."
        },
    }
    TriggerClientEvent("Notify",source,Notifys[msg].Type,Notifys[msg].Msg,5000)
end

Config.drawMark = function(x,y,z)
    DrawMarker(21,x,y,z - 0.6,0,0,0,0.0,0,0,0.5,0.5,0.4,240,202,87,150,0,0,0,1)
end

Config.drawText = function(x, y, z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    local px,py,pz=table.unpack(GetGameplayCamCoords())
    SetTextScale(0.3, 0.3)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text)) / 370
    DrawRect(_x,_y+0.0125, 0.005+ factor, 0.03, 41, 11, 41, 68)
end

function getUserTax(user_id)
	return vRP.getFines(user_id)
end