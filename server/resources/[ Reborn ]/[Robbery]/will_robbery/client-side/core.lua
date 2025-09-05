function Notify(msg)
    if Config.notifications[msg] then
        if type(Config.notifications[msg]) == "table" then
            TriggerEvent("Notify",Config.notifications[msg].type,Config.notifications[msg].message,5000)
        else
            TriggerEvent("Notify","importante",Config.notifications[msg],5000)
        end
    else
        TriggerEvent("Notify","importante",msg,5000)
    end
end

function ProgressBar(duration, text)
    if lib then
        return lib.progressBar({
            duration = duration,
            label = text,
            useWhileDead = false,
            canCancel = false,
            disable = {
                car = true,
                move = true,
                combat = true,
            },
            anim = {
                dict = 'oddjobs@shop_robbery@rob_till',
                clip = 'loop',
            }
        })
    else
        TriggerEvent("Progress",duration,text)
        Wait(duration)
        return true
    end
end

function policeAlert(coords,robbery)
    callback.await("will_robbery:callPolice",false,coords,robbery)
end

function addBlip(coords, sprite, colour, text)
    local blip = AddBlipForCoord(coords.x,coords.y,coords.z)
    SetBlipSprite(blip, sprite)
    SetBlipColour(blip, colour)
    SetBlipAsShortRange(blip, true)
    SetBlipScale(blip, 0.7)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(text)
    EndTextCommandSetBlipName(blip)
    return blip
end

function DrawText3D(x,y,z,text)
	local _,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,150)
	SetTextEntry("STRING")
	SetTextCentre(true)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text)) / 400
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
end

function AddBoxZone(Name,Center,Length,Width,Options,Target)
    if Config.target == 'qb-target' then
        exports['qb-target']:AddBoxZone(Name,Center,Length,Width,Options,Target)
    elseif Config.target == 'ox-target' then
        exports.ox_target:addBoxZone({
            coords = Center,
            size = vec3(Length, Width, 2),
            rotation = 45,
            options = Target.options,
        })
    elseif Config.target == 'target' then
        exports.target:AddCircleZone(Name,Center,Width,Options,Target)
    end
end

function RemCircleZone(Name)
    if Config.target == 'qb-target' then
        exports['qb-target']:RemoveZone(Name)
    elseif Config.target == 'ox-target' then
        exports.ox_target:removeZone(Name)
    elseif Config.target == 'target' then
        exports.target:RemCircleZone(Name)
    end
end

function loadAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        RequestAnimDict(dict)
        Wait(50)
    end
end

function loadModel(model)
    if type(model) == 'number' then
        model = model
    else
        model = GetHashKey(model)
    end
    while not HasModelLoaded(model) do
        RequestModel(model)
        Wait(0)
    end
end

function loadPtfxAsset(dict)
    while not HasNamedPtfxAssetLoaded(dict) do
        RequestNamedPtfxAsset(dict)
        Wait(50)
	end
end