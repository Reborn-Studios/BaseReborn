local vehHeading = 0.0

local function createLocalVehicle()
    local ped = PlayerPedId()
    local pedCoords = GetEntityCoords(ped)
    local mHash = GetHashKey("zentorno")
    LoadModel(mHash)
    local newVehicle = CreateVehicle(mHash,pedCoords["x"],pedCoords["y"],pedCoords["z"],vehHeading,false,false)
	SetEntityCollision(newVehicle,false,false)
	SetEntityAlpha(newVehicle,100,false)
    return newVehicle
end

local function getVehicleCoords(justOne)
    local vehPos = {}
    local spawnedVehs = {}
    local confirmed = false
	local objectProgress = true
	local newVehicle = createLocalVehicle()
    table.insert(spawnedVehs, newVehicle)
    lib.showTextUI('Posicione as vagas',{
        position = "right-center",
        icon = 'car',
        iconAnimation = "bounce",
        style = {
            borderRadius = 5,
            backgroundColor = '#488dbb',
            color = 'white'
        }
    })
	while objectProgress do
		local hit,coords = GetCamCoords()
        if hit then
            SetEntityCoordsNoOffset(newVehicle,coords["x"],coords["y"],coords["z"]+0.6,true)
        end
        DisablePlayerFiring(PlayerId(), true)
		DrawLocalText("~b~MOUSE LEFT~w~  ADICIONAR VAGA",0.015,0.53)
        if not justOne then
            DrawLocalText("~g~E~w~  FINALIZAR",0.015,0.56)
        end
		DrawLocalText("~r~F~w~  CANCELAR",0.015,0.59)
		DrawLocalText("~y~SCROLL UP~w~  GIRA ESQUERDA",0.015,0.62)
		DrawLocalText("~y~SCROLL DOWN~w~  GIRA DIREITA",0.015,0.65)

        if IsDisabledControlJustPressed(0, 24) then
            local headObject = GetEntityHeading(newVehicle)
            local coordsObject = GetEntityCoords(newVehicle)
            local _,GroundZ = GetGroundZFor_3dCoord(coordsObject["x"],coordsObject["y"],coordsObject["z"])
	        SetEntityCollision(newVehicle,true,true)
            table.insert(vehPos, { coordsObject["x"], coordsObject["y"], GroundZ ~= 0.0 and GroundZ or coordsObject["z"], headObject })
            newVehicle = createLocalVehicle()
            table.insert(spawnedVehs, newVehicle)
            if justOne then
                objectProgress = false
                confirmed = true
            end
        end

		if IsControlJustPressed(1,38) then
			objectProgress = false
            confirmed = true
		end

		if IsControlJustPressed(1,49) then
			objectProgress = false
		end

		if IsControlJustPressed(1,180) then
			local headObject = GetEntityHeading(newVehicle)
            vehHeading = headObject + 5.0
			SetEntityHeading(newVehicle,vehHeading)
		end

		if IsControlJustPressed(1,181) then
			local headObject = GetEntityHeading(newVehicle)
            vehHeading = headObject - 5.0
			SetEntityHeading(newVehicle,vehHeading)
		end

		Wait(1)
	end
    for k,veh in pairs(spawnedVehs) do
        DeleteEntity(veh)
    end
    lib.hideTextUI()
    if confirmed then
        return vehPos
    end
end

function CreateGarage()
    local garage = {}
    local groups = ServerControl.getGroups()
    if groups then
        local input = lib.inputDialog('Registro de garagem', {
            { type = 'input', label = 'Nome', description = 'Nome da garagem', required = true },
            { type = 'select', label = 'Tipo de garagem', description = 'Tipo da garagem', icon = "warehouse", options = {
                { label = "Interior", value = "interior" },
                { label = "Painel", value = "painel" },
            }, default = "painel" },
            { type = 'number', label = 'Pagamento', description = 'Pagamento para acessar garagem', default = 0, icon = "money" },
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, searchable = true },
            { type = 'checkbox', label = 'Mostrar no blip mapa', icon = "map" },
        })
        if input then
            garage.entrada = {}
            garage.name = input[1]
            garage.type = input[2]
            garage.payment = input[3] or false
            local Groups = {}
            local SelectedGroups = input[4]
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
            garage.perms = Groups
            garage.map = input[5]
            lib.showTextUI('Posicione o blip',{
                position = "right-center",
                icon = 'warehouse',
                iconAnimation = "bounce",
                style = {
                    borderRadius = 5,
                    backgroundColor = '#488dbb',
                    color = 'white'
                }
            })
            local blipCds = GetBlipCoords()
            garage.entrada.blip = { blipCds.x, blipCds.y, blipCds.z }
            Wait(500)
            if garage.type == "painel" then
                local vehsPos = getVehicleCoords()
                if not vehsPos then return end
                garage.spawns = vehsPos
            elseif garage.type == "interior" then
                local vehPos = getVehicleCoords(true)
                if not vehPos then return end
                garage.entrada.veiculo = vehPos[1]
                local inputInterior = lib.inputDialog('Interior da garagem', {
                    { type = 'select', label = 'Interior', description = 'Selecione o interior', icon = "warehouse", options = {
                        { label = "Garagem pequena", value = "Garagem_menor" },
                        { label = "Garagem media", value = "Garagem_media" },
                        { label = "Garagem maior", value = "Garagem_maior" },
                        { label = "Garagem luxo", value = "Garagem_luxo" },
                        { label = "Garagem gigante", value = "Garagem_gigante" },
                    }, default = "Garagem_media" },
                })
                if not inputInterior then return end
                garage.interior = inputInterior[1]
            end
            lib.hideTextUI()
            ServerControl.registerGarage(garage)
        end
    end
end

local function manageGarage(args)
    local index = args[1]
    local garagesGlobal = GlobalState['GaragesGlobal'] or {}
    local garage = garagesGlobal[index]
    if garage then
        garage.id = index
        local options = {
            {
                title = 'Editar Garagem',
                icon = "pencil",
                iconColor = "#488dbb",
                onSelect = function()
                    local defaultType = "painel"
                    if garage.interior then defaultType = "interior" end
                    local groups = ServerControl.getGroups()
                    local input = lib.inputDialog('Editar garagem', {
                        { type = 'input', label = 'Nome', description = 'Nome da garagem', required = true, default = tostring(garage.name) },
                        { type = 'select', label = 'Tipo de garagem', description = 'Tipo da garagem', icon = "warehouse", options = {
                            { label = "Interior", value = "interior" },
                            { label = "Painel", value = "painel" },
                        }, default = defaultType },
                        { type = 'number', label = 'Pagamento', description = 'Pagamento para acessar garagem', default = 0, icon = "money" },
                        { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups, default = garage.perm, searchable = true },
                        { type = 'checkbox', label = 'Mostrar no blip mapa', icon = "map", checked = garage.map and true },
                    })
                    if input then
                        garage.name = input[1]
                        garage.type = input[2]
                        garage.payment = input[3] or false
                        local Groups = {}
                        local SelectedGroups = input[4]
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
                        garage.perms = Groups
                        garage.map = input[5]
                        if garage.type == "painel" then
                            local alert = lib.alertDialog({
                                header = 'Realocar as vagas',
                                content = 'Deseja realocar as vagas da garagem?',
                                centered = true,
                                cancel = true
                            })
                            if alert == "confirm" then
                                local vehsPos = getVehicleCoords()
                                if not vehsPos then return end
                                garage.spawns = vehsPos
                            end
                        elseif garage.type == "interior" then
                            local vehPos = getVehicleCoords(true)
                            if not vehPos then return end
                            garage.entrada.veiculo = vehPos[1]
                            local inputInterior = lib.inputDialog('Interior da garagem', {
                                { type = 'select', label = 'Interior', description = 'Selecione o interior', icon = "warehouse", options = {
                                    { label = "Garagem pequena", value = "Garagem_menor" },
                                    { label = "Garagem media", value = "Garagem_media" },
                                    { label = "Garagem maior", value = "Garagem_maior" },
                                    { label = "Garagem luxo", value = "Garagem_luxo" },
                                    { label = "Garagem gigante", value = "Garagem_gigante" },
                                }, default = tostring(garage.interior) or "Garagem_media" },
                            })
                            if not inputInterior then return end
                            garage.interior = inputInterior[1]
                        end
                        ServerControl.updateGarage(garage)
                    end
                end
            },
            {
                title = 'Teleportar ao local',
                description = 'Va até a garagem',
                icon = "location-dot",
                iconColor = "#488dbb",
                onSelect = function()
                    DoScreenFadeOut(500)
                    Wait(500)
                    SetEntityCoords(PlayerPedId(), garage.entrada.blip[1], garage.entrada.blip[2], garage.entrada.blip[3])
                    DoScreenFadeIn(500)
                end
            },
            {
                title = 'Deletar Garagem',
                description = 'Deletar Garagem',
                icon = "trash",
                iconColor = "#bb4848",
                onSelect = function()
                    local alert = lib.alertDialog({
                        header = 'Deletar Garagem?',
                        content = 'Tem certeza que deseja deletar a garagem: \n'..garage.name,
                        centered = true,
                        cancel = true
                    })
                    if alert == "confirm" then
                        ServerControl.deleteGarage(garage.id)
                    end
                end
            }
        }
        lib.registerContext({
            id = 'admin_garages_manage',
            title = 'Gerenciar Garagem: '..garage.name,
            menu = 'admin_garages_list',
            onBack = function()
                lib.showContext('admin_garages_list')
            end,
            options = options
        })
        lib.showContext('admin_garages_manage')
    end
end

local function listGarages(values)
    local options = {}
    for i=1,#values do
        table.insert(options,{
            title = values[i].label,
            description = "ID: "..values[i].value,
            icon = "warehouse",
            iconColor = "#488dbb",
            arrow = true,
            onSelect = manageGarage,
            args = { values[i].value }
        })
    end
    lib.registerContext({
        id = 'admin_garages_list',
        title = 'Listar Garagens',
        menu = 'admin_garages_control',
        options = options
    })
    lib.showContext('admin_garages_list')
end

RegisterNetEvent("AdminControl:openGarages")
AddEventHandler("AdminControl:openGarages",function(garages)
    local values = {}
    for k,v in pairs(garages) do
        if v.name and v.id then
            table.insert(values,{
                label = v.name,
                value = v.id
            })
        end
    end
    lib.registerContext({
        id = 'admin_garages_control',
        title = 'Controle das Garagens',
        options = {
            {
                title = 'Criar Garagem',
                icon = 'plus',
                iconColor = '#488dbb',
                arrow = true,
                onSelect = function()
                    CreateGarage()
                end
            },
            {
                title = 'Listar Garagens',
                icon = 'list',
                iconColor = '#488dbb',
                arrow = true,
                onSelect = function()
                    listGarages(values)
                end
            }
        }
    })
    lib.showContext('admin_garages_control')
end)