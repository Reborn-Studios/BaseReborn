-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
will = {}
Tunnel.bindInterface("identity",will)
vSERVER = Tunnel.getInterface("identity")

local opened = false
local Answers = {}
local imageCache = nil
local MugshotsCache = {}
RegisterCommand("identidade", function()
    if not opened then
        opened = true
        local infos = vSERVER.getIndentity()
        if not imageCache then
            imageCache = GetMugShotBase64()
            SetTimeout(60000*5,function()
                imageCache = nil
            end)
        end
        infos.mugshot = imageCache
        infos.serverName = GlobalState['Basics']['ServerName']
        SendNUIMessage({ open = true, infos = infos })
        local timeOut = 6
        while opened do
            timeOut = timeOut - 1
            if timeOut == 0 then
                SendNUIMessage({ close = true })
                opened = false
            end
            Wait(1000)
        end
    else
        SendNUIMessage({ close = true })
        opened = false
    end
end)

RegisterKeyMapping("identidade","Identity: Mostrar Identidade","keyboard","f11")

RegisterNUICallback('Answer', function(data)
    if MugshotsCache[data.Id] then
        UnregisterPedheadshot(MugshotsCache[data.Id])
        MugshotsCache[data.Id] = nil
    end
    Answers[data.Id]:resolve(data.Answer)
    Answers[data.Id] = nil
end)

local mugshotId = 0
function GetMugShotBase64(Ped, Transparent)
    Ped = PlayerPedId()
    mugshotId = mugshotId + 1

    local Handle = RegisterPedheadshotTransparent(Ped)

    if Handle == nil or Handle == 0 then Handle = RegisterPedheadshot(Ped) end

    local timer = 2000
    while ((not Handle or not IsPedheadshotReady(Handle) or not IsPedheadshotValid(Handle)) and timer > 0) do
        Wait(10)
        timer = timer - 10
    end

    local MugShotTxd = 'none'
    if (IsPedheadshotReady(Handle) and IsPedheadshotValid(Handle)) then
        MugshotsCache[mugshotId] = Handle
        MugShotTxd = GetPedheadshotTxdString(Handle)
        
    end
    SendNUIMessage({
        type = 'convert',
        pMugShotTxd = MugShotTxd,
        id = mugshotId,
    })
    local p = promise.new()
    Answers[mugshotId] = p

    return Citizen.Await(p)
end
