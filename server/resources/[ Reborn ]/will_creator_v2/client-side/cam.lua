-- #########################
--      VARIABLES
-- #########################

Cam = nil
CamOffset = 2
SpawnCam = nil
ActiveCam = nil
CreatorCam = nil
MulticharCam = nil
AnimActived = false
CustomCamLocation = nil
HeadingToCam = GetEntityHeading(PlayerPedId())

-- #########################
--      CREATOR
-- #########################

function FreezeAnim(dict, anim, flag, keep)
    if not keep then
        ClearPedTasks(PlayerPedId())
    end
    LoadAnim(dict)
    TaskPlayAnim(PlayerPedId(), dict, anim, 3.0, 3.0, -1, flag or 1, 0, false, false, false)
    RemoveAnimDict(dict)
end

local Cameras = {
    body = { coords = vec3(0.0, 1.8, 0.7), point = vec3(0.0,0.0,0.0) },
    eye = { coords = vec3(0.0, 0.32, 0.7), point = vec3(0.0,0.0,0.7) },
    nose = { coords = vec3(0.0, 0.32, 0.66), point = vec3(0.0,0.0,0.66) },
    mouth = { coords = vec3(0.0, 0.32, 0.63), point = vec3(0.0,0.0,0.63) },
    head = { coords = vec3(0.0, 0.5, 0.72), point = vec3(0.0,0.0,0.67) },
}

CreatorCams = {
    ['Genetica'] = "head",
    ['Olhos'] = "eye",
    ['Nariz'] = "nose",
    ['Bochecha'] = "mouth",
    ['Rosto'] = "head",
    ['Cabelo'] = "head",
    ['Barba'] = "head",
    ['Maquiagem'] = "head",
    ['Aspectos'] = "head",
    ['Corpo'] = "body",
    ['Outfit'] = "body",
}

RegisterNuiCallback("CharacterCreator::SetCameraIndex",function(data,cb)
    local cam = data.cam
    if cam and CreatorCams[cam] then
        InterpCamera(CreatorCams[cam])
    end
end)

function InterpCamera(cameraName)
    if Cameras[cameraName] then
        local cam = Cameras[cameraName]
        FreezeAnim("mp_sleep", "bind_pose_180", 49, true)
        if cameraName == ActiveCam then return end
        ActiveCam = cameraName
        local ped = PlayerPedId()
        local coord = GetOffsetFromEntityInWorldCoords(ped,cam.coords.x,cam.coords.y,cam.coords.z)
        local tempCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coord.x, coord.y, coord.z, 0, 0, 0, 50.0, false, 0)
        local pointCoords = GetOffsetFromEntityInWorldCoords(ped, cam.point.x, cam.point.y, cam.point.z)
        SetCamActive(tempCam, true)
        if CreatorCam then
            SetCamActiveWithInterp(tempCam, CreatorCam, 600, 1, 1)
        end
        PointCamAtCoord(tempCam, pointCoords.x, pointCoords.y, pointCoords.z)
        CreateThread(function()
            Wait(600)
            if CreatorCam then
                DestroyCam(CreatorCam, false)
            end
            CreatorCam = tempCam
        end)
    end
end

function CreateCamera()
    local ped = PlayerPedId()
    local groundCam = CreateCam("DEFAULT_SCRIPTED_CAMERA", false)
    AttachCamToEntity(groundCam, ped, 0.0, -2.0, 0.0, false)
    SetCamActive(groundCam, true)
    RenderScriptCams(true, false, 1, true, true)
    ActiveCam = "body"
    local cam = Cameras[ActiveCam]
    local coord = GetOffsetFromEntityInWorldCoords(ped, cam.coords.x, cam.coords.y, cam.coords.z)
    CreatorCam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coord.x, coord.y, coord.z, 0, 0, 0, 50.0, false, 0)
    local pointCoords = GetOffsetFromEntityInWorldCoords(ped, cam.point.x, cam.point.y, cam.point.z)
    PointCamAtCoord(CreatorCam, pointCoords.x, pointCoords.y, pointCoords.z)
    SetCamActive(CreatorCam, true)
    SetCamActiveWithInterp(CreatorCam, groundCam, 1000, 1, 1)
    if cam.f then cam.f() end
    CreateThread(function()
        Wait(1000)
        DestroyCam(groundCam,false)
    end)
end

function EnableCam()
    local coords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 2.0, 0)
    RenderScriptCams(false, false, 0, true, false)
    if Cam then
        DestroyCam(Cam, false)
    end
    if not Cam or (not DoesCamExist(Cam)) then
        Cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
        SetCamActive(Cam, true)
        RenderScriptCams(true, false, 0, true, true)
        SetCamCoord(Cam, coords.x, coords.y, coords.z + 0.2)
        SetCamRot(Cam, 0.0, 0.0, GetEntityHeading(PlayerPedId()) + 180, 0)
    end

    if CustomCamLocation ~= nil then
        SetCamCoord(Cam, CustomCamLocation.x, CustomCamLocation.y, CustomCamLocation.z)
        SetCamRot(Cam, 0.0, 0.0, CustomCamLocation.w, 0)
    end

    HeadingToCam = GetEntityHeading(PlayerPedId()) + 90
    CamOffset = 2.0
end

function GetPositionByRelativeHeading(ped, head, dist)
    local pedPos = GetEntityCoords(ped)
    local finPosx = pedPos.x + math.cos(head * (math.pi / 180)) * dist
    local finPosy = pedPos.y + math.sin(head * (math.pi / 180)) * dist
    return finPosx, finPosy
end

RegisterNUICallback('setupCam', function(data, cb)
    local value = data.value
    if not value then return end
    if Cameras[value] then
        InterpCamera(value)
    else
        local pedPos = GetEntityCoords(PlayerPedId())
        CamOffset = 2.0
        local cx, cy = GetPositionByRelativeHeading(PlayerPedId(), HeadingToCam, CamOffset)
        if Cam then
            SetCamCoord(Cam, cx, cy, pedPos.z + 0.2)
            PointCamAtCoord(Cam, pedPos.x, pedPos.y, pedPos.z + 0.2)
        end
    end
    cb('ok')
end)

-- #########################
--      MULTI CHAR
-- #########################

function IntroCam(data)
    local initCoord = Config.MulticharDefaultCoords
    DoScreenFadeOut(500)
    while not IsScreenFadedOut() do
        Wait(10)
    end
    local myJob = nil
    if data then
        if data.permiss then
            for k,v in pairs(Config.Multichar) do
                for l,perm in pairs(v['perms']) do
                    if perm == data.permiss then
                        myJob = k
                        break
                    end
                end
            end
        end
        if myJob and Config.Multichar[myJob] then
            initCoord = Config.Multichar[myJob]['coords']
            Teleport(PlayerPedId(),initCoord.x,initCoord.y,initCoord.z)
            CharCustom(data, true, Config.Multichar[myJob]['anim'])
        else
            Teleport(PlayerPedId(),initCoord.x,initCoord.y,initCoord.z)
            CharCustom(data, true)
        end
    end
    local ped = PlayerPedId()
    SetEntityHeading(ped, initCoord.w)
    Wait(500)
    if MulticharCam then
        PointCamAtPedBone(MulticharCam, ped, 31086, 0.0, 0.0, 0.0, true)
        local coords = GetOffsetFromEntityInWorldCoords(ped, 0, 1.1, 0)
        SetCamCoord(MulticharCam, coords.x, coords.y, coords.z + 0.6)
        SetCamRot(MulticharCam, 0.0, 0.0, GetEntityHeading(ped) + 180, 0)
        SetCamUseShallowDofMode(MulticharCam, true)
        SetCamNearDof(MulticharCam, 0.7)
        SetCamFarDof(MulticharCam, 5.3)
        SetCamDofStrength(MulticharCam, 1.0)
        SetUseHiDof()
    end
    DoScreenFadeIn(500)
    while not IsScreenFadedIn() do
        Wait(10)
    end
end

function EnableMulticharCam()
    local coords = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 2.0, 0)
    RenderScriptCams(false, false, 0, true, false)
    if MulticharCam then
        DestroyCam(MulticharCam, false)
    end

    if not MulticharCam or (not DoesCamExist(MulticharCam)) then
        MulticharCam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
        SetCamActive(MulticharCam, true)
        RenderScriptCams(true, false, 0, true, true)
        SetCamCoord(MulticharCam, coords.x, coords.y, coords.z + 0.2)
        SetCamRot(MulticharCam, 0.0, 0.0, GetEntityHeading(PlayerPedId()) + 180, 0)
    end

    if CustomCamLocation ~= nil then
        SetCamCoord(MulticharCam, CustomCamLocation.x, CustomCamLocation.y, CustomCamLocation.z)
        SetCamRot(MulticharCam, 0.0, 0.0, CustomCamLocation.w, 0)
    end

    HeadingToCam = GetEntityHeading(PlayerPedId()) + 90
    CamOffset = 2.0
end

function DisableCam(cam)
    RenderScriptCams(false, true, 250, true, false)
    DestroyCam(cam, false)
    FreezeEntityPosition(PlayerPedId(), false)
end
