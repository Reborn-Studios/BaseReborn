Client = {}
Tunnel.bindInterface("AdminControl",Client)
ServerControl = Tunnel.getInterface("AdminControl")

function Client.openMainMenu()
    lib.registerContext({
        id = 'admin_menu_control',
        title = 'Controle de configurações',
        options = {
            {
                title = 'Painel ADM',
                description = 'Abrir painel ADM',
                icon = "fa-solid fa-user-secret",
                onSelect = function ()
                    ExecuteCommand("adm")
                end
            },
            {
                title = 'Grupos',
                description = 'Gerenciar grupos',
                icon = "fa-solid fa-users",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["groups"]['command'])
                end
            },
            {
                title = 'Itens',
                description = 'Gerenciar itens',
                icon = "fa-solid fa-boxes-stacked",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["items"]['command'])
                end
            },
            {
                title = 'Portas',
                description = 'Gerenciar portas',
                icon = "fa-solid fa-door-open",
                onSelect = function ()
                    if GetResourceState("ox_doorlock") == "started" then
                        ExecuteCommand("doorlock")
                    else
                        TriggerEvent("Notify","negado","Você não tem o script de portas",5000)
                    end
                end
            },
            {
                title = 'Elevadores',
                description = 'Gerenciar elevadores',
                icon = "fa-solid fa-elevator",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["elevators"]['command'])
                end
            },
            {
                title = 'Garagens',
                description = 'Gerenciar garagens',
                icon = "fa-solid fa-warehouse",
                onSelect = function ()
                    if GetResourceState("will_garages_v2") == "started" then
                        ExecuteCommand(Config.Commands["garages"]['command'])
                    else
                        TriggerEvent("Notify","negado","Você não tem a garagem da Reborn",5000)
                    end
                end
            },
            {
                title = 'Concessionaria',
                description = 'Gerenciar concessionaria',
                icon="fa-solid fa-car",
                onSelect = function ()
                    if GetResourceState("will_conce_v2") == "started" then
                        ExecuteCommand("admconce")
                    else
                        TriggerEvent("Notify","negado","Você não tem a concessionaria da Reborn",5000)
                    end
                end
            },
            {
                title = 'NPCS',
                description = 'Gerenciar Npcs',
                icon="fa-solid fa-person",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["peds"]['command'])
                end
            },
            {
                title = 'Safezones',
                description = 'Gerenciar Safezones',
                icon="fa-solid fa-shield",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["safezones"]['command'])
                end
            },
            {
                title = 'Baus',
                description = 'Gerenciar Baus',
                icon="fa-solid fa-toolbox",
                onSelect = function ()
                    if GetResourceState("ox_inventory") == "started" then
                        ExecuteCommand(Config.Commands["stashes"]['command'])
                    else
                        TriggerEvent("Notify","negado","Você não tem o ox_inventory",5000)
                    end
                end
            },
            {
                title = 'Frequencia Radios',
                description = 'Gerenciar Frequencias de radio',
                icon="fa-solid fa-radio",
                onSelect = function ()
                    if GetResourceState("fd_radio_os") == "started" then
                        ExecuteCommand(Config.Commands["radio"]['command'])
                    else
                        TriggerEvent("Notify","negado","Você não tem o fd_radio_os",5000)
                    end
                end
            },
            {
                title = 'Lojas de roupas',
                description = 'Gerenciar Lojas de roupas',
                icon="fa-solid fa-shirt",
                onSelect = function ()
                    if GetResourceState("will_skinshop") == "started" then
                        ExecuteCommand(Config.Commands["skinshop"]['command'])
                    else
                        TriggerEvent("Notify","negado","Você não tem o skinshop da Reborn",5000)
                    end
                end
            },
            {
                title = 'Blips',
                description = 'Gerenciar blips no mapa',
                icon="fa-solid fa-map-location-dot",
                onSelect = function ()
                    ExecuteCommand("blips")
                end
            },
            {
                title = 'Criar rotas',
                description = 'Criação de rotas',
                icon="fa-solid fa-route",
                onSelect = function ()
                    ExecuteCommand("criarfarm")
                end
            },
            {
                title = 'Criar Lojas',
                description = 'Criação de lojas',
                icon="fa-solid fa-shop",
                onSelect = function ()
                    ExecuteCommand("createshops")
                end
            },
            {
                title = 'Criar Loja de Tatuagem',
                description = 'Lojas de Tatuagem',
                icon="fa-solid fa-paintbrush",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["tattooshop"]['command'])
                end
            },
            {
                title = 'Criar Barbershop',
                description = 'Lojas de Barbearia',
                icon="fa-solid fa-scissors",
                onSelect = function ()
                    ExecuteCommand(Config.Commands["barbershop"]['command'])
                end
            }
        }
    })
    lib.showContext('admin_menu_control')
end

local function getCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot()
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))
	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

function GetCamCoords()
    local cam = GetGameplayCamCoord()
    local camCds = getCoordsFromCam(20.0,cam)
    local handle = StartExpensiveSynchronousShapeTestLosProbe(cam.x,cam.y,cam.z,camCds.x,camCds.y,camCds.z,-1,PlayerPedId(),4)
    local _,hit,coords = GetShapeTestResult(handle)
    return hit,coords
end

function GetBlipCoords()
    local isAdding = true
    repeat
        DisablePlayerFiring(PlayerId(), true)
        DisableControlAction(0, 25, true)
        DrawLocalText("~g~MOUSE LEFT~w~  COLOCAR",0.015,0.56)
        DrawLocalText("~r~MOUSE RIGHT~w~  CANCELAR",0.015,0.59)
        local hit,coords = GetCamCoords()
        if hit then
            DrawMarker(27, coords.x, coords.y, coords.z + 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.7, 0.7, 25, 42, 255, 100, false, false, 0, true)
            if IsDisabledControlJustPressed(0, 24) then
                isAdding = false
                return vector3(coords.x,coords.y,coords.z + 1.0)
            end
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
        end
        Wait(0)
    until not isAdding
end

function DrawLocalText(text,x,y)
	SetTextFont(4)
	SetTextScale(0.38,0.38)
	SetTextColour(255,255,255,255)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
