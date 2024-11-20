local CurrentFloor
local CurrentElevator
local DrawCoords = {}
local GameTimer = GetGameTimer()
local Elevators = GlobalState["Elevators"]

AddStateBagChangeHandler("Elevators","",function (_,_,value)
    Elevators = value
    DrawCoords = {}
    for _, k in pairs(Elevators) do
        for _, v in pairs(k.Floors) do
            table.insert(DrawCoords, v['Coords'])
        end
    end
end)

local function getFloor()
    local floor = {}
    lib.showTextUI('Posicione o blip para o andar')
    local blipCds = GetBlipCoords()
    lib.hideTextUI()
    local input = lib.inputDialog('Registro do andar', {
        { type = 'input', label = 'Nome', description = 'Nome do andar', required = true },
        { type = 'select', label = 'Icone', required = true, options = {
            { label = "Cima", value = "fa-solid fa-circle-sort-up" },
            { label = "Padrao", value = "fa-solid fa-circle-sort" },
            { label = "Baixo", value = "fa-solid fa-circle-sort-down" },
        } },
    })
    if input then
        floor.Name = input[1]
        floor.Icon = input[2]
        floor.Coords = blipCds
        return floor
    end
end

local function createElevator()
    local elevator = {}
    local input = lib.inputDialog('Registro de Elevador', {
        { type = 'input', label = 'Nome', description = 'Nome do elevador', required = true },
        { type = 'checkbox', label = 'Usar com veiculos' },
    })
    if input then
        elevator.Name = input[1]
        elevator.CanUseVehicle = input[2]
        elevator.Floors = {}
        while #elevator.Floors < 2 do
            local floor = getFloor()
            if floor then
                table.insert(elevator.Floors, floor)
            end
            Wait(500)
        end
        repeat
            local alert = lib.alertDialog({
                header = 'Elevador',
                content = 'Adicionar mais andar?',
                centered = true,
                cancel = true,
                labels = {
                    cancel = "Não",
                    confirm = "Sim"
                }
            })
            if alert == 'confirm'  then
                local floor = getFloor()
                if floor then
                    table.insert(elevator.Floors, floor)
                end
            end
        until alert == 'cancel'
        ServerControl.registerElevator(elevator)
    end
end

local function deleteElevator(index)
    local elevator = Elevators[index]
    if elevator then
        local alert = lib.alertDialog({
            header = 'Deletar Elevador?',
            content = 'Tem certeza que deseja deletar o elevador: \n'..elevator.Name,
            centered = true,
            cancel = true
        })
        if alert == "confirm" then
            ServerControl.deleteElevator(index)
        end
    end
end

function Client.elevatorsControl()
    local values = {}
    for k,v in pairs(Elevators) do
        table.insert(values,{
            label = v.Name,
            value = k
        })
    end
    lib.registerMenu({
        id = 'admin_elevators_control',
        title = 'Controle dos Elevadores',
        position = 'bottom-right',
        options = {
            { label = 'Criar Elevador', description = 'Crie um novo elevador!' },
            { label = 'Deletar Elevador', values = values, description = 'Deletar elevadores criados!' },
        }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            createElevator()
        elseif selected == 2 then
            deleteElevator(scrollIndex)
        end
    end)
    lib.showMenu('admin_elevators_control')
end

local Functions = {
    ['open'] = function()
        local Ped = PlayerPedId()
        local PlayerCoord = GetEntityCoords(Ped)
        for i = 1, #Elevators do
            for j = 1, #Elevators[i]['Floors'] do
                local Floor = Elevators[i]['Floors'][j]
                if #(PlayerCoord - vector3(Floor['Coords']['x'],Floor['Coords']['y'],Floor['Coords']['z'])) <= 1.3 then
					if IsPedInAnyVehicle(Ped) and not Floor['CanUseVehicle'] then
						Notify('Veículos são proibidos no andar selecionado')
						return
					end
                    local Data = {}
                    for k, v in pairs(Elevators[i]['Floors']) do
                        local name = string.format('<i class="%s"></i><br> %s', v['Icon'] or "fa-solid fa-circle-sort", v['Name'] or tostring(k))
                        table.insert(Data, { id = k, name = name })
                    end
                    CurrentFloor = j
                    CurrentElevator = i
                    SetNuiFocus(true, true)
                    SendNUIMessage({ action = 'openElevator', andares = Data })
                    break
                end
            end
        end
    end,
    ['close'] = function()
        SendNUIMessage({ action = 'close' })
        SetNuiFocus(false, false)
    end,
    ['teleport'] = function(id)
        local Floor = Elevators[CurrentElevator]['Floors'][id]
		local Ped = PlayerPedId()
		if IsPedInAnyVehicle(Ped) and not Floor['CanUseVehicle'] then
			Notify('Veículos são proibidos no andar selecionado')
			return
		end
		if (CurrentFloor == id) then
			Notify('Você já está no andar selecionado')
			return
		end
        if Floor then
            local Entity = GetVehiclePedIsIn(Ped) ~= 0 and GetVehiclePedIsIn(Ped) or Ped

			SetNuiFocus(false, false)
			SendNUIMessage({ action = 'bell' })
            SendNUIMessage({ action = 'close' })

			GameTimer = (GetGameTimer() + 3 * 1000)
            NetworkFadeOutEntity(Entity, false, true)
			Wait(500)
            DoScreenFadeOut(500)
            Wait(500)
            SetEntityCoordsNoOffset(Entity, Floor['Coords']['x'], Floor['Coords']['y'], Floor['Coords']['z'], false, false, false)
            while not HasCollisionLoadedAroundEntity(Entity) do
                FreezeEntityPosition(Entity, true)
                SetEntityCoords(Entity, Floor['Coords']['x'], Floor['Coords']['y'], Floor['Coords']['z'], true, false, false, true)
                RequestCollisionAtCoord(Floor['Coords']['x'], Floor['Coords']['y'], Floor['Coords']['z'])
                Wait(500)
            end
            SetEntityCoordsNoOffset(Entity, Floor['Coords']['x'], Floor['Coords']['y'], Floor['Coords']['z'], false, false, false)
            SetVehicleOnGroundProperly(Entity)
            Wait(500)
			DoScreenFadeIn(500)
            FreezeEntityPosition(Entity, false)
            NetworkFadeInEntity(Entity, true)
        end
    end
}

function Notify(Text, Seconds)
	Text, Seconds = Text or "", Seconds or 5
    TriggerEvent("Notify","negado",Text,Seconds * 1000)
end

RegisterNUICallback('UIRequest', function(data, cb)
    local Action = data['action']
    local FloorId = data['andarId']
    Functions[Action](FloorId)
end)

CreateThread(function()
    for _, k in pairs(Elevators) do
        for _, v in pairs(k.Floors) do
            table.insert(DrawCoords, v['Coords'])
        end
    end
    while true do
        local idleTime = 1000
        local playerPos = GetEntityCoords(PlayerPedId())
        for i = 1, #DrawCoords do
            local dist = #(playerPos - vector3(DrawCoords[i]['x'], DrawCoords[i]['y'], DrawCoords[i]['z']))
            if dist < 20 then
                idleTime = 5
				if dist < 10 and (GetGameTimer() >= GameTimer) then
					DrawMarker(27, DrawCoords[i]['x'], DrawCoords[i]['y'], DrawCoords[i]['z'] - 0.95, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.75, 1.75, 0.0, 0, 0, 0, 70, false, false, 0, true )
                    if IsControlJustPressed(0, 38) then
                        if (GetGameTimer() >= GameTimer) then
                            Functions:open()
                        end
                    end
				end
            end
        end
        Wait(idleTime)
    end
end)
