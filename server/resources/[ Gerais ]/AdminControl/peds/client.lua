local AllPeds = GlobalState['AllPeds']
local pedIndex = 1
local createdPed = nil
local pedModel = Config.PedHashs[pedIndex]

local function syncNpcs()
    for Index,Ped in pairs(AllPeds) do
        exports['core']:AddPed(Ped)
        if LocalPlayer.state["Admin"] then
            exports['target']:AddCircleZone(Ped.Model..Index,vector3(Ped.Coords[1],Ped.Coords[2],Ped.Coords[3]),2.0,{
                name = Ped.Model..Index,
                heading = 3374176
            },{
                distance = 2.0,
                options = {
                    {
                        label = 'Deletar Ped',
                        icon = 'fa-solid fa-trash',
                        action = function ()
                            exports['target']:RemCircleZone(Ped.Model..Index)
                            TriggerServerEvent("AdminControl:deletePed",Index)
                        end,
                        tunnel = "server"
                    },
                }
            })
        end
    end
end

CreateThread(syncNpcs)

AddStateBagChangeHandler("AllPeds","",function (_,_,value)
    if not value then return end
    for k,v in pairs(AllPeds) do
        if not value[k] then
            exports['core']:RemovePed(v)
        end
    end
    AllPeds = value
    syncNpcs()
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
                TriggerServerEvent("AdminControl:addPed",pedCoords, heading, pedModel)
            end
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
            deletePed()
        end
        Wait(0)
    until not isAdding
end

Client.getPedData = GetPedCoords
