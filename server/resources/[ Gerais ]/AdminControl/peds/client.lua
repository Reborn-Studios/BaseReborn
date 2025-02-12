local AllPeds = GlobalState['AllPeds']
local pedIndex = 1
local createdPed = nil
local pedModel = Config.PedHashs[pedIndex]

AddStateBagChangeHandler("AllPeds","",function (_,_,value)
    if not value then return end
    AllPeds = value
end)

local function createLocalPed(model,coords,heading)
    if LoadModel(model) then
        local nped = CreatePed(4,model,coords.x, coords.y, coords.z + 0.1,heading,false,false)
        SetEntityInvincible(nped,true)
        FreezeEntityPosition(nped,true)
        SetEntityAlpha(nped,200)
        SetBlockingOfNonTemporaryEvents(nped,true)
        SetModelAsNoLongerNeeded(model)
        return nped
    end
end

local function managePed(args)
    local PedIndex = args.pedIndex
    local ped = AllPeds[PedIndex]
    local options = {
        {
            title = "Teleportar até o Ped",
            description = "Va até o local",
            icon = "location-dot",
            iconColor = "#00ff00",
            onSelect = function ()
                DoScreenFadeOut(500)
                Wait(500)
                SetEntityCoords(PlayerPedId(),ped.Coords[1],ped.Coords[2],ped.Coords[3])
                DoScreenFadeIn(500)
            end
        },
        {
            title = "Editar Ped",
            description = "Editar",
            icon = "pen-to-square",
            iconColor = "#0000ff",
            onSelect = function ()
                TriggerServerEvent("AdminControl:deletePed",PedIndex)
                Wait(500)
                local PedData = GetPedCoords()
                TriggerServerEvent("AdminControl:editPed",PedIndex,PedData.coords,PedData.heading,PedData.model)
            end
        },
        {
            title = "Deletar Ped",
            description = "Deletar Ped",
            icon = "trash",
            iconColor = "#ff0000",
            onSelect = function ()
                TriggerServerEvent("AdminControl:deletePed",PedIndex)
            end
        },
    }
    lib.registerContext({
        id = 'ped_manage',
        title = 'Gerenciar Ped',
        options = options
    })
    lib.showContext('ped_manage')
end

local function listPeds()
    local options = {}
    for Index,Ped in pairs(AllPeds) do
        table.insert(options,
        {
            title = Index.." - "..Ped.Model,
            description = "Gerenciar Ped",
            arrow = true,
            onSelect = managePed,
            args = {
                pedIndex = Index
            }
        })
    end
    lib.registerContext({
        id = 'ped_list',
        title = 'Lista de Peds',
        options = options
    })
    lib.showContext('ped_list')
end

local function deletePed()
    if createdPed and DoesEntityExist(createdPed) then
        DeletePed(createdPed)
    end
end

function GetPedCoords()
    local heading = 0.0
    local isAdding = true
    repeat
        DisableControlAction(0, 25, true)
        DisablePlayerFiring(PlayerId(), true)
        DrawLocalText("~g~MOUSE LEFT~w~  COLOCAR OBJETO",0.015,0.56)
        DrawLocalText("~r~MOUSE RIGHT~w~  CANCELAR",0.015,0.59)
        DrawLocalText("~b~Q~w~  MUDAR PED",0.015,0.62)
        DrawLocalText("~y~SCROLL UP~w~  GIRA ESQUERDA",0.015,0.65)
        DrawLocalText("~y~SCROLL DOWN~w~  GIRA DIREITA",0.015,0.68)
        local hit,coords = GetCamCoords()
        if hit then
            if not createdPed then
                createdPed = createLocalPed(pedModel,coords,heading)
            else
                SetEntityCoords(createdPed,coords.x, coords.y, coords.z + 0.5,false,false,false)
            end
            if IsControlJustPressed(1,180) and createdPed then
                heading = heading + 6.0
                SetEntityHeading(createdPed,heading)
            end
            if IsControlJustPressed(1,181) and createdPed then
                heading = heading - 6.0
                SetEntityHeading(createdPed,heading)
            end
            if IsDisabledControlJustPressed(0,44) then
                pedIndex = pedIndex + 1
                if #Config.PedHashs < pedIndex then
                    pedIndex = 1
                end
                pedModel = Config.PedHashs[pedIndex]
                deletePed()
                createdPed = createLocalPed(pedModel,coords,heading)
            end
            if IsDisabledControlJustPressed(0, 24) then
                isAdding = false
                deletePed()
                local pedCoords = vector3(coords.x,coords.y,coords.z + 1.0)
                return {coords = pedCoords, heading = heading, model = pedModel}
            end
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
            deletePed()
        end
        Wait(0)
    until not isAdding
end

function Client.getPedData()
    lib.registerContext({
        id = 'admin_peds_control',
        title = 'Controle dos Peds',
        menu = 'admin_menu_control',
        options = {
            {
                title = 'Criar Ped',
                icon = 'plus',
                onSelect = function()
                    local PedData = GetPedCoords()
                    TriggerServerEvent("AdminControl:addPed",PedData.coords, PedData.heading, PedData.model)
                end
            },
            {
                title = 'Listar Peds',
                icon = 'list',
                arrow = true,
                onSelect = function()
                    listPeds()
                end
            }
        }
    })
    lib.showContext('admin_peds_control')
end
