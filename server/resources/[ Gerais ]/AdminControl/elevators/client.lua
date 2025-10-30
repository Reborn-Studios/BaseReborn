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
    local groups = ServerControl.getGroups()
    lib.hideTextUI()
    local input = lib.inputDialog('Registro do andar', {
        { type = 'input', label = 'Nome', description = 'Nome do andar', required = true },
        { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, searchable = true },
        { type = 'select', label = 'Icone', required = true, options = {
            { label = "Cima", value = "fa-solid fa-circle-sort-up" },
            { label = "Padrao", value = "fa-solid fa-circle-sort" },
            { label = "Baixo", value = "fa-solid fa-circle-sort-down" },
        } },
    })
    if input then
        local Groups = {}
        local SelectedGroups = input[2]
        if type(SelectedGroups) == "table" then
            for _,ndata in pairs(SelectedGroups) do
                local Perms = json.decode(ndata)
                for group,grade in pairs(Perms) do
                    Groups[group] = tonumber(grade)
                end
            end
        else
            Groups = nil
        end
        floor.Name = input[1]
        floor.Perm = Groups
        floor.Icon = input[3]
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

local function manageElevator(index)
    local elevator = Elevators[index]
    if elevator then
        local options = {
            {
                title = 'Adicionar Andar',
                description = 'Adicione um andar!',
                icon = "square-plus",
                onSelect = function()
                    local floor = getFloor()
                    if floor then
                        table.insert(elevator.Floors, floor)
                        ServerControl.updateElevator(index, elevator)
                    end
                end
            },
            {
                title = 'Teleportar ao local',
                description = 'Va até o local',
                icon = "location-dot",
                onSelect = function()
                    DoScreenFadeOut(500)
                    Wait(500)
                    SetEntityCoords(PlayerPedId(), elevator.Floors[1]['Coords'].x, elevator.Floors[1]['Coords'].y, elevator.Floors[1]['Coords'].z)
                    DoScreenFadeIn(500)
                end
            },
            {
                title = 'Deletar Elevador',
                description = 'Deletar Elevador',
                icon = "trash",
                onSelect = function()
                    deleteElevator(index)
                end
            }
        }
        lib.registerContext({
            id = 'admin_elevators_manage',
            title = 'Gerenciar Elevador',
            menu = 'admin_elevators_list',
            onBack = function()
                lib.showContext('admin_elevators_list')
            end,
            options = options
        })
        lib.showContext('admin_elevators_manage')
    end
end

local function listElevators()
    local values = {}
    for k,v in pairs(Elevators) do
        table.insert(values,{
            label = v.Name,
            value = k
        })
    end
    local options = {}
    for i = 1,#values do
        table.insert(options,{
            title = values[i].label,
            description = 'Gerenciar Elevador',
            icon = "map-pin",
            arrow = true,
            onSelect = function()
                manageElevator(values[i].value)
            end
        })
    end
    lib.registerContext({
        id = 'admin_elevators_list',
        title = 'Listar Elevadores',
        menu = 'admin_elevators_control',
        onBack = function()
            lib.showContext('admin_elevators_control')
        end,
        options = options
    })
    lib.showContext('admin_elevators_list')
end

function Client.elevatorsControl()
    lib.registerContext({
        id = 'admin_elevators_control',
        title = 'Controle dos Elevadores',
        options = {
            {
                title = 'Criar Elevador',
                description = 'Crie um novo elevador!',
                icon = "square-plus",
                onSelect = createElevator
            },
            {
                title = 'Listar Elevadores',
                description = 'Liste os elevadores!',
                icon = "list",
                onSelect = listElevators
            },
        }
    })
    lib.showContext('admin_elevators_control')
end

local Functions = {
    ['open'] = function()
        local Ped = PlayerPedId()
        local PlayerCoord = GetEntityCoords(Ped)
        for i = 1, #Elevators do
            for j = 1, #Elevators[i]['Floors'] do
                local Floor = Elevators[i]['Floors'][j]
                if #(PlayerCoord - vector3(Floor['Coords']['x'],Floor['Coords']['y'],Floor['Coords']['z'])) <= 1.3 then
					if IsPedInAnyVehicle(Ped) and not Elevators[i]['CanUseVehicle'] then
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
		if IsPedInAnyVehicle(Ped) and not Elevators[CurrentElevator]['CanUseVehicle'] then
			Notify('Veículos são proibidos no andar selecionado')
			return
		end
		if (CurrentFloor == id) then
			Notify('Você já está no andar selecionado')
			return
		end
        if Floor then
            if Floor.Perm and not ServerControl.checkPerm(Floor.Perm) then
                return
            end
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
                    DrawBase3D(DrawCoords[i]['x'], DrawCoords[i]['y'], DrawCoords[i]['z'],"elevator")
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
