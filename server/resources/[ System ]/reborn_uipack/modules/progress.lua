local activeProgress = nil
local playerState = LocalPlayer.state
local playerProps = {}
local maxProgressProps = GetConvarInt("ox:progressPropLimit", 2)

local CONTROLS = {
    INPUT_LOOK_LR = 1,
    INPUT_LOOK_UD = 2,
    INPUT_SPRINT = 21,
    INPUT_AIM = 25,
    INPUT_MOVE_LR = 30,
    INPUT_MOVE_UD = 31,
    INPUT_DUCK = 36,
    INPUT_VEH_MOVE_LEFT_ONLY = 63,
    INPUT_VEH_MOVE_RIGHT_ONLY = 64,
    INPUT_VEH_ACCELERATE = 71,
    INPUT_VEH_BRAKE = 72,
    INPUT_VEH_EXIT = 75,
    INPUT_VEH_MOUSE_CONTROL_OVERRIDE = 106
}

function CreateProgressProp(ped, propData)
    Utils.requestModel(propData.model)
    
    local pedCoords = GetEntityCoords(ped)
    local prop = CreateObject(
        propData.model,
        pedCoords.x,
        pedCoords.y,
        pedCoords.z + 0.95,
        false,
        false,
        false
    )
    
    local boneIndex = GetPedBoneIndex(ped, propData.bone or 60309)
    
    AttachEntityToEntity(
        prop,
        ped,
        boneIndex,
        propData.pos.x,
        propData.pos.y,
        propData.pos.z,
        propData.rot.x,
        propData.rot.y,
        propData.rot.z,
        true,
        true,
        false,
        true,
        propData.rotOrder or 0,
        true
    )
    
    SetModelAsNoLongerNeeded(propData.model)
    
    return prop
end

function ShouldCancelProgress(progressData)
    local playerPed = PlayerPedId()
    
    if not progressData.useWhileDead and IsEntityDead(playerPed) then
        return true
    end
    
    if not progressData.allowRagdoll and IsPedRagdoll(playerPed) then
        return true
    end
    
    if not progressData.allowCuffed and IsPedCuffed(playerPed) then
        return true
    end
    
    if not progressData.allowFalling and IsPedFalling(playerPed) then
        return true
    end
    
    if not progressData.allowSwimming and IsPedSwimming(playerPed) then
        return true
    end
    
    return false
end

function HandleProgressControls(progressData)
    playerState.invBusy = true
    activeProgress = progressData
    
    local animData = progressData.anim
    if animData then
        if animData.dict then
            Utils.requestAnimDict(animData.dict)
            TaskPlayAnim(
                PlayerPedId(),
                animData.dict,
                animData.clip,
                animData.blendIn or 3.0,
                animData.blendOut or 1.0,
                animData.duration or -1,
                animData.flag or 49,
                animData.playbackRate or 0,
                animData.lockX,
                animData.lockY,
                animData.lockZ
            )
            RemoveAnimDict(animData.dict)
        elseif animData.scenario then
            TaskStartScenarioInPlace(
                PlayerPedId(),
                animData.scenario,
                0,
                animData.playEnter == nil or animData.playEnter
            )
        end
    end
    
    if progressData.prop then
        TriggerServerEvent("ox_lib:progressProps", progressData.prop)
    end
    
    local disableControls = progressData.disable
    local startTime = GetGameTimer()
    local playerId = PlayerId()
    
    while activeProgress do
        if disableControls then
            if disableControls.mouse then
                DisableControlAction(0, CONTROLS.INPUT_LOOK_LR, true)
                DisableControlAction(0, CONTROLS.INPUT_LOOK_UD, true)
                DisableControlAction(0, CONTROLS.INPUT_VEH_MOUSE_CONTROL_OVERRIDE, true)
            end
            
            if disableControls.move then
                DisableControlAction(0, CONTROLS.INPUT_SPRINT, true)
                DisableControlAction(0, CONTROLS.INPUT_MOVE_LR, true)
                DisableControlAction(0, CONTROLS.INPUT_MOVE_UD, true)
                DisableControlAction(0, CONTROLS.INPUT_DUCK, true)
            end
            
            if disableControls.sprint and not disableControls.move then
                DisableControlAction(0, CONTROLS.INPUT_SPRINT, true)
            end
            
            if disableControls.car then
                DisableControlAction(0, CONTROLS.INPUT_VEH_MOVE_LEFT_ONLY, true)
                DisableControlAction(0, CONTROLS.INPUT_VEH_MOVE_RIGHT_ONLY, true)
                DisableControlAction(0, CONTROLS.INPUT_VEH_ACCELERATE, true)
                DisableControlAction(0, CONTROLS.INPUT_VEH_BRAKE, true)
                DisableControlAction(0, CONTROLS.INPUT_VEH_EXIT, true)
            end
            
            if disableControls.combat then
                DisableControlAction(0, CONTROLS.INPUT_AIM, true)
                DisablePlayerFiring(playerId, true)
            end
        end
        
        if ShouldCancelProgress(activeProgress) then
            activeProgress = false
        end
        
        Wait(0)
    end
    
    if progressData.prop then
        TriggerServerEvent("ox_lib:progressProps", nil)
    end
    
    if animData then
        if animData.dict then
            StopAnimTask(PlayerPedId(), animData.dict, animData.clip, 1.0)
            Wait(0)
        else
            ClearPedTasks(PlayerPedId())
        end
    end
    
    playerState.invBusy = false
    
    local elapsedTime = activeProgress and GetGameTimer() - startTime or false
    
    if activeProgress == false or (elapsedTime and elapsedTime > progressData.duration) then
        SendNUIMessage({ action = "progressCancel" })
        return false
    end
    
    return true
end

function ProgressBar(progressData)
    while activeProgress ~= nil do
        Wait(0)
    end
    
    if ShouldCancelProgress(progressData) then
        return
    end
    
    if not progressData.variant then
        progressData.variant = GetConvar("reborn:progressBar", "secondary")
    end
    SendNUIMessage({
        action = "progress",
        data = {
            label = progressData.label,
            duration = progressData.duration,
            position = progressData.position,
            variant = progressData.variant,
            canCancel = progressData.canCancel
        }
    })
    
    return HandleProgressControls(progressData)
end

function ProgressCircle(progressData)
    ProgressBar(progressData)
end

function CancelProgress()
    if not activeProgress then
        error("No progress bar is active")
    end
    activeProgress = false
end

function ProgressActive()
    return activeProgress and true or false
end

RegisterNUICallback("progressComplete", function(data, cb)
    cb(1)
    activeProgress = nil
end)

RegisterCommand("cancelprogress_reborn", function()
    if activeProgress and activeProgress.canCancel then
        activeProgress = false
    end
end, false)

RegisterKeyMapping(
    "cancelprogress_reborn",
    "Cancel Progressbar",
    "keyboard",
    GetConvar("reborn:progressCancelKey", "X")
)

function CleanupPlayerProps(serverId)
    local props = playerProps[serverId]
    if not props then return end
    
    playerProps[serverId] = nil
    
    for i = 1, #props do
        local prop = props[i]
        if DoesEntityExist(prop) then
            DeleteEntity(prop)
        end
    end
end

RegisterNetEvent("onPlayerDropped", function(serverId)
    CleanupPlayerProps(serverId)
end)

AddStateBagChangeHandler("lib:progressProps", nil, function(bagName, key, value, reserved, replicated)
    if replicated then return end
    
    local player = GetPlayerFromStateBagName(bagName)
    if player == 0 then return end
    
    local playerPed = GetPlayerPed(player)
    local serverId = GetPlayerServerId(player)
    
    if not value or playerProps[serverId] then
        CleanupPlayerProps(serverId)
        if not value then return end
    end
    
    local props = {}
    
    if value.model then
        local prop = CreateProgressProp(playerPed, value)
        if prop then
            props[#props + 1] = prop
        end
    else
        local propCount = math.min(maxProgressProps, #value)
        for i = 1, propCount do
            local prop = CreateProgressProp(playerPed, value[i])
            if prop then
                props[#props + 1] = prop
            end
        end
    end
    
    playerProps[serverId] = props
end)
