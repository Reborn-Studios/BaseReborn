local Proxy = module("vrp","lib/Proxy")
Reborn = Proxy.getInterface("Reborn")

Notify = { isLoaded = false }

CreateThread(function()
    while not NetworkIsPlayerActive(PlayerId()) do 
        Wait(5000)
    end

    Wait(2000)

    SendNUIMessage({
        message = 'setData',
        data = Config
    })

    Notify.isLoaded = true
end)

function Notify:new(data)
    if not self.isLoaded then return end;

    if not data.message then
        data.message = data.description or data.title
        data.title = nil
    end

    SendNUIMessage({
        message = 'createNotification',
        data = {
            message = data.message or 'Nenhuma mensagem provida',
            title= data.title or 'Notificação',
            type = data.type or 'info',
            duration = data.duration or 4000,
        }
    })
end

RegisterNetEvent("Notify")
AddEventHandler("Notify",function(css,mensagem,timer,position)
	if not timer or type(timer) ~= "number" then
		timer = 5000
	end

	if css == "aviso" or css == "amarelo" or css == "warning" then
        Notify:new({
            message = mensagem,
            title = 'Aviso',
            type = 'warning',
            duration = timer
        })
    elseif css == "negado" or css == "vermelho" or css == "error" then
        Notify:new({
            message = mensagem,
            title = 'Negado',
            type = 'error',
            duration = timer
        })
    elseif css == "sucesso" or css == "verde" or css == "success" then
        Notify:new({
            message = mensagem,
            title = 'Sucesso',
            type = 'success',
            duration = timer
        })
    elseif css == "importante" or css == "azul" then
        Notify:new({
            message = mensagem,
            title = 'Informação',
            type = 'info',
            duration = timer
        })
    else
        Notify:new({
            message = mensagem,
            title = css,
            type = 'info',
            duration = timer
        })
    end
end)

RegisterNetEvent("itensNotify")
AddEventHandler("itensNotify",function(status,index,amount,item)
	if index and amount and item then
		SendNUIMessage({ itemNotify = true, type = status, item = index, quantity = amount })
	else
		SendNUIMessage({ itemNotify = true, type = status[1], item = status[2], quantity = status[3] })
	end
end)

RegisterNetEvent("progress")
AddEventHandler("progress",function(time,message)
	SendNUIMessage({ progress = true, time = tonumber(time), message = message })
end)

RegisterNetEvent("Progress")
AddEventHandler("Progress",function(time,message)
	SendNUIMessage({ progress = true, time = tonumber(time), message = message })
end)

local showHood = false
RegisterNetEvent("vrp_hud:toggleHood")
AddEventHandler("vrp_hud:toggleHood",function()
	showHood = not showHood
	SendNUIMessage({ hood = showHood })

	if showHood then
		SetPedComponentVariation(PlayerPedId(),1,69,0,2)
	else
		SetPedComponentVariation(PlayerPedId(),1,0,0,2)
	end
end)

exports('sendNotification', function(data)
    Notify:new(data)
end)

RegisterCommand('testProgress', function()
	SendNUIMessage({ progress = true, time = 5000, message = "Bebendo" })
end)

RegisterCommand('testNotify', function()
    Notify:new({
        message = 'This is a ~r~error~s~ notification',
        title = 'Error',
        type = 'error',
        duration = 5000
    })

    Notify:new({
        message = 'This is a ~o~warning~s~ notification',
        title = 'Warning',
        type = 'warning',
        duration = 5000
    })

    Notify:new({
        message = 'This is a ~g~success~s~ notification',
        title = 'Success',
        type = 'success',
        duration = 5000
    })

    Notify:new({
        message = 'This is a ~b~info~s~ notification',
        title = 'Info',
        type = 'info',
        duration = 5000
    })
end)