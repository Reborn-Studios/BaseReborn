local function createLocalVehicle()
    local ped = PlayerPedId()
    local pedCoords = GetEntityCoords(ped)
	local pedHeading = GetEntityHeading(ped)
    local mHash = GetHashKey("zentorno")
    LoadModel(mHash)
    local newVehicle = CreateVehicle(mHash,pedCoords["x"],pedCoords["y"],pedCoords["z"],pedHeading,false,false)
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
			SetEntityHeading(newVehicle,headObject + 5.0)
		end

		if IsControlJustPressed(1,181) then
			local headObject = GetEntityHeading(newVehicle)
			SetEntityHeading(newVehicle,headObject - 5.0)
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
            { type = 'multi-select', label = 'Permissoes', description = "Selecione as permissoes", options = groups },
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
            Wait(1000)
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

RegisterNetEvent("AdminControl:openGarages")
AddEventHandler("AdminControl:openGarages",function(garages)
    local values = {}
    for k,v in pairs(garages) do
        table.insert(values,{
            label = v.name,
            value = v.id
        })
    end
    lib.registerMenu({
        id = 'admin_garages_control',
        title = 'Controle das Garagens',
        position = 'bottom-right',
        options = {
            { label = 'Criar Garagem', description = 'Crie uma nova garagem!' },
            { label = 'Deletar Garagem', values = values, description = 'Deletar garagens criadas!' },
        }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            CreateGarage()
        elseif selected == 2 then
            local alert = lib.alertDialog({
                header = 'Deletar Garagem?',
                content = 'Tem certeza que deseja deletar a garagem: \n'..values[scrollIndex].label,
                centered = true,
                cancel = true
            })
            if alert == "confirm" then
                ServerControl.deleteGarage(values[scrollIndex].value)
            end
        end
    end)
    lib.showMenu('admin_garages_control')
end)