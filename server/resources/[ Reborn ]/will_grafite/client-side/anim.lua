TEXT_SPRAY = "REBORN"
local cancelado = false
local last_hp = nil
local SprayBlips = {}

function AddBlip(index,x,y,z,group)
    if index and Config.GROUPS_COLOR[group] then
        if SprayBlips[index] and DoesBlipExist(SprayBlips[index]) then
            RemoveBlip(SprayBlips[index])
            SprayBlips[index] = nil
        end
        local color = Config.GROUPS_COLOR[group] or 0
        SprayBlips[index] = AddBlipForRadius(x, y, z, 25.0)
        SetBlipColour(SprayBlips[index],color)
        SetBlipAsShortRange(SprayBlips[index],true)

        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString('Grafite - '..group)
        EndTextCommandSetBlipName(SprayBlips[index])
    end
end

function StartAnim(time, animDict, animName, flag, finish, cancel, opts)
    cancelado = false
    local ped = PlayerPedId()
    if not opts then opts = {} end
    if animDict then
        while (not HasAnimDictLoaded(animDict)) do
            RequestAnimDict(animDict)
            Wait(100)
        end
        TaskPlayAnim(ped, animDict, animName, opts.speedIn or 1.0, opts.speedOut or 1.0, -1, flag, 0, 0, 0, 0 )
    end
    last_hp = GetEntityHealth(ped)
    local timeLeft = time
    while true do
        Wait(4)
        timeLeft = timeLeft - (GetFrameTime() * 1000)
        if timeLeft <= 0 then
            break
        end

        local new_hp = GetEntityHealth(ped)

        if new_hp ~= last_hp then
            cancelado = true
        end
        last_hp = new_hp

        DisableControlAction(0, Config.Keys.CANCEL.code, true)
        if IsControlPressed(0, Config.Keys.CANCEL.code) or IsDisabledControlPressed(0, Config.Keys.CANCEL.code) then
            cancelado = true
        end

        if cancelado then
            if animDict then
                StopAnimTask(ped, animDict, animName, 1.0)
                ClearPedTasks(ped)
            end
            if cancel then
                cancel()
                return
            end
        end
    end
    if finish then
        StopAnimTask(ped, animDict, animName, 1.0)
        ClearPedTasks(ped)
        finish()
    end
end

function CreateSprayRemoveProp(ped)
    local ragProp = CreateObject(
        `p_loose_rag_01_s`, --`prop_ecola_can`,
        0.0, 0.0, 0.0,
        true, false, false
    )
    AttachEntityToEntity(ragProp, ped, GetPedBoneIndex(ped, 28422), x, y, z, ax, ay, az, true, true, false, true, 1, true)
    return ragProp
end

FORBIDDEN_MATERIALS = {
    [1913209870] = true,
    [-1595148316] = true,
    [510490462] = true,
    [909950165] = true,
    [-1907520769] = true,
    [-1136057692] = true,
    [509508168] = true,
    [1288448767] = true,
    [-786060715] = true,
    [-1931024423] = true,
    [-1937569590] = true,
    [-878560889] = true,
    [1619704960] = true,
    [1550304810] = true,
    [951832588] = true,
    [2128369009] = true,
    [-356706482] = true,
    [1925605558] = true,
    [-1885547121] = true,
    [-1942898710] = true,
    [312396330] = true,
    [1635937914] = true,
    [-273490167] = true,
    [1109728704] = true,
    [223086562] = true,
    [1584636462] = true,
    [-461750719] = true,
    [1333033863] = true,
    [-1286696947] = true,
    [-1833527165] = true,
    [581794674] = true,
    [-913351839] = true,
    [-2041329971] = true,
    [-309121453] = true,
    [-1915425863] = true,
    [1429989756] = true,
    [673696729] = true,
    [244521486] = true,
    [435688960] = true,
    [-634481305] = true,
    [-1634184340] = true,
}
