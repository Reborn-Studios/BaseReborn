local playerTalking = {}

local submixes = {}
local default = {}
local jammer = {}
local muted = {}
local maxRange = 0

function initSubmixes()
    Citizen.CreateThread(function()
        -- Set default radio submix
        default = CreateAudioSubmix('Radio_Default')
        SetAudioSubmixEffectRadioFx(default, 0)
        SetAudioSubmixEffectParamInt(default, 0, `default`, 1)

        for _, submix in pairs(Config.DefaultRadioFilter) do
            if type(_) ~= 'string' then
                SetAudioSubmixEffectParamFloat(default, 0, GetHashKey(submix.name), submix.value)
            end
        end

        SetAudioSubmixOutputVolumes(
            default,
            0,
            Config.DefaultRadioFilter.volume?.frontLeftVolume or 0.25--[[ frontLeftVolume ]] ,
            Config.DefaultRadioFilter.volume?.frontRightVolume or 1.0--[[ frontRightVolume ]] ,
            Config.DefaultRadioFilter.volume?.rearLeftVolume or 0.0--[[ rearLeftVolume ]] ,
            Config.DefaultRadioFilter.volume?.rearRightVolume or 0.0--[[ rearRightVolume ]] ,
            Config.DefaultRadioFilter.volume?.channel5Volume or 1.0--[[ channel5Volume ]] ,
            Config.DefaultRadioFilter.volume?.channel6Volume or 1.0--[[ channel6Volume ]]
        )
        AddAudioSubmixOutput(default, 0)

        -- Set default radio submix
        pcall(function()
            exports['pma-voice']:setEffectSubmix('radio', default)
        end)

        exports['pma-voice']:setVoiceProperty('micClicks', Config.MicClicks)

        -- Jammer Filter
        jammer = CreateAudioSubmix('Radio_Jammer')
        SetAudioSubmixEffectRadioFx(jammer, 0)
        SetAudioSubmixEffectParamInt(jammer, 0, `default`, 1)

        for _, submix in pairs(Config.JammerFilter.effect) do
            SetAudioSubmixEffectParamFloat(jammer, 0, GetHashKey(submix.name), submix.value)
        end

        SetAudioSubmixOutputVolumes(
            jammer,
            0,
            Config.JammerFilter.volume?.frontLeftVolume or 0.25--[[ frontLeftVolume ]] ,
            Config.JammerFilter.volume?.frontRightVolume or 1.0--[[ frontRightVolume ]] ,
            Config.JammerFilter.volume?.rearLeftVolume or 0.0--[[ rearLeftVolume ]] ,
            Config.JammerFilter.volume?.rearRightVolume or 0.0--[[ rearRightVolume ]] ,
            Config.JammerFilter.volume?.channel5Volume or 1.0--[[ channel5Volume ]] ,
            Config.JammerFilter.volume?.channel6Volume or 1.0--[[ channel6Volume ]]
        )
        AddAudioSubmixOutput(jammer, 0)


        for _, filter in pairs(Config.Ranges) do
            submixes[_] = {
                id = CreateAudioSubmix('Radio_' .. _),
                effect = filter
            }

            if filter.ranges?.max and filter.ranges?.max > maxRange then
                maxRange = filter.ranges?.max
            end

            SetAudioSubmixEffectRadioFx(submixes[_].id, 0)
            SetAudioSubmixEffectParamInt(submixes[_].id, 0, `default`, 1)

            for i, effect in pairs(filter.effect) do
                SetAudioSubmixEffectParamFloat(submixes[_].id, 0, GetHashKey(effect.name), effect.value)
            end

            SetAudioSubmixOutputVolumes(
                submixes[_].id,
                0,
                filter.volume?.frontLeftVolume or 0.25--[[ frontLeftVolume ]] ,
                filter.volume?.frontRightVolume or 1.0--[[ frontRightVolume ]] ,
                filter.volume?.rearLeftVolume or 0.0--[[ rearLeftVolume ]] ,
                filter.volume?.rearRightVolume or 0.0--[[ rearRightVolume ]] ,
                filter.volume?.channel5Volume or 1.0--[[ channel5Volume ]] ,
                filter.volume?.channel6Volume or 1.0--[[ channel6Volume ]]
            )

            AddAudioSubmixOutput(submixes[_].id, 0)
        end

        muted = CreateAudioSubmix('Radio_Muted')
        SetAudioSubmixEffectRadioFx(muted, 0)
        SetAudioSubmixEffectParamInt(muted, 0, `default`, 1)

        SetAudioSubmixOutputVolumes(
            muted,
            0,
            0.0 --[[ frontLeftVolume ]] ,
            0.0 --[[ frontRightVolume ]] ,
            0.0--[[ rearLeftVolume ]] ,
            0.0 --[[ rearRightVolume ]] ,
            0.0 --[[ channel5Volume ]] ,
            0.0 --[[ channel6Volume ]]
        )

        AddAudioSubmixOutput(muted, 0)
    end)
end

local function getEffect(id)
    local targetCoords = infinity.getPlayerCoords(id)
    local range = #(GetEntityCoords(cache.ped) - targetCoords)

    local submixToUse = nil
    local mute = nil

    for _, filter in pairs(submixes) do
        if filter.effect.ranges then
            local checkRange = filter.effect.ranges
            if range > checkRange?.min and range < checkRange?.max then
                submixToUse = submixes[_].id
                mute = checkRange.mute or false
            end
        end
    end
    if submixToUse == nil then
        submixToUse = default
    end

    if mute then
        submixToUse = muted
    end

    if submixToUse == default and range >= maxRange then
        submixToUse = muted
    end

    return submixToUse
end

function JammerShouldActivate(id)
    if Config.AllowJammers and (bridge.hasJob(Config.DisableJammerForJobs) or Config.DisableJammerForChannels[getCurrentChannel()] ~= nil) then
        return false
    end


    if Config.AllowJammers and utils.tableLength(insideJammerZones) > 0 then
        return true
    end

    local isInsideJammerZone = callback.await("fd_radio:isInJammerZone", false, id)
    if Config.AllowJammers and isInsideJammerZone then
        return true
    end

    return false
end

local function setCheckingLoop(id)
    CreateThread(function()
        while playerTalking[id] do
            if JammerShouldActivate(id) then
                MumbleSetSubmixForServerId(id, jammer)

                Wait(2000)
                goto continue
            end

            local effect = getEffect(id)

            MumbleSetSubmixForServerId(id, effect)

            Wait(2000)
            ::continue::
        end

        playerTalking[id] = nil
    end)
end

RegisterNetEvent('pma-voice:setTalkingOnRadio', function(ply, talking)
    if not talking and playerTalking[ply] then
        MumbleSetSubmixForServerId(ply, -1)
        playerTalking[ply] = talking
        updatePlayersTalking(playerTalking)
        return
    end

    local isSpectating = NetworkIsInSpectatorMode() or GetRenderingCam() ~= -1
    if isSpectating and not Config.disableAutoSpectateModeDetection then
        return
    end

    playerTalking[ply] = talking
    updatePlayersTalking(playerTalking)

    if Config.AllowJammers and JammerShouldActivate(ply) then
        Wait(100)
        MumbleSetSubmixForServerId(ply, jammer)
        setCheckingLoop(ply)

        return
    end

    if not Config.UseRanges then
        return
    end

    if Config.Framework ~= 'none' and bridge.hasJob(Config.DisableRangesForJobs) then
        return
    end

    if Config.Framework ~= 'none' and bridge.hasJob(Config.DisableJammerForJobs) then
        return
    end

    if Config.DisableRangeForChannels[getCurrentChannel()] ~= nil then
        return
    end

    local effect = getEffect(ply)

    -- Wait before pma-voice runs their routine
    Wait(100)
    MumbleSetSubmixForServerId(ply, effect)

    setCheckingLoop(ply)
end)

initSubmixes()
