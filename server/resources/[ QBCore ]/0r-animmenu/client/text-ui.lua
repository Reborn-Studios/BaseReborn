-- Textures
Textures = { -- Do not change
    pin = 'pin',
    interact = 'interact',
    interactRed = 'interactRed',
    bg = 'bg',
    bgRed = 'bgRed'
}

local txdLoaded = false
Citizen.CreateThread(function()
    loadTxd()
end)

function loadTxd()
    local txd = CreateRuntimeTxd('interactions_txd_0resmon')
    for _, v in pairs(Textures) do
        CreateRuntimeTextureFromImage(txd, tostring(v), "assets/" .. v .. ".png")
    end
end

ConfigTextUI = {}
ConfigTextUI.Players = {}
local textUIActive = false
function displayTextUI(text, key, hide)
    if textUIActive then
        changeText(text, key)
    else
        textUIActive = true
        local key = key
        SendNUIMessage({action = "textUI", show = true, key = key, text = text, hide = hide})
    end
end

function changeText(text, key)
    local key = key
    SendNUIMessage({action = "textUIUpdate", key = key, text = text})
end

function hideTextUI()
    if textUIActive then
        textUIActive = false
        SendNUIMessage({action = "textUI", show = false})
    end
end

function create3DTextUIOnPlayers(id, data)
    if ConfigTextUI.Players[id] then
        print(id .. " already exist.")
    else
        local targetPlayerId = GetPlayerFromServerId(data.id)
        local targetPed = GetPlayerPed(targetPlayerId)
        ConfigTextUI.Players[id] = {
            data = {
                id = id,
                ped = targetPed, 
                displayDist = data.displayDist,
                interactDist = data.interactDist,
                enableKeyClick = data.enableKeyClick,
                keyNum = data.keyNum, -- Key number
                keyNum2 = data.keyNum2,
                key = data.key, -- Key name
                text = data.text,
                theme = data.theme or "green"
            },
            onKeyClick = function()
                if data.triggerData then
                    if data.triggerData.isServer then
                        TriggerServerEvent(data.triggerData.triggerName, data.triggerData.args)
                    else
                        TriggerEvent(data.triggerData.triggerName, data.triggerData.args)
                    end
                end
            end,
            onKeyClick2 = function()
                if data.triggerData2 then
                    if data.triggerData2.isServer then
                        TriggerServerEvent(data.triggerData2.triggerName, data.triggerData2.args)
                    else
                        TriggerEvent(data.triggerData2.triggerName, data.triggerData2.args)
                    end
                end
            end
        }
    end
end

function delete3DTextUIOnPlayers(id)
    if ConfigTextUI.Players[id] then
        ConfigTextUI.Players[id] = nil
    else
        print(id .. " doesnt exist.")
    end
end

local showTextUI2 = false
Citizen.CreateThread(function()
    loadTxd()
    while true do
        local sleep = 1000
        local playerCoords = GetEntityCoords(PlayerPedId())
        for k, v in pairs(ConfigTextUI.Players) do
            v.data.coords = GetEntityCoords(v.data.ped)
            local dist = #(v.data.coords - playerCoords)
            if dist <= v.data.displayDist then
                sleep = 0
                if dist <= v.data.interactDist then
                    -- Main Text
                    local factor = (string.len(v.data.text)) / 370
                    local width = 0.03 + factor
                    -- Key Text
                    local factor2 = (string.len(v.data.key)) / 370
                    local width2 = 0.016 + factor2
                    local onScreen, _x, _y = World3dToScreen2d(v.data.coords.x, v.data.coords.y, v.data.coords.z)
                    if onScreen then
                        local interact, bg = 'interact', 'bg'
                        if v.data.theme == "red" then
                            interact, bg = 'interactRed', 'bgRed'
                        end
                        -- E
                        SetScriptGfxAlignParams(0.0, 0.0, 0.0, 0.0)
                        SetTextScale(0, 0.35)
                        SetTextFont(4)
                        SetTextColour(255, 255, 255, 255)
                        BeginTextCommandDisplayText("STRING")
                        SetTextCentre(true)
                        SetTextJustification(0)
                        AddTextComponentSubstringPlayerName(v.data.key)
                        SetDrawOrigin(v.data.coords.x, v.data.coords.y, v.data.coords.z)
                        EndTextCommandDisplayText(0.0, -0.0115)
                        ResetScriptGfxAlign()
                        SetScriptGfxAlignParams(0.0, 0.0, 0.0, 0.0)
                        DrawSprite('interactions_txd_0resmon', interact, 0.0, 0.0, width2, 0.03133333333333333, 0.0, 255, 255, 255, 255)
                        ResetScriptGfxAlign()
                        ClearDrawOrigin()
                        -- Bg
                        SetScriptGfxAlignParams(0.018 + (width / 2), 0 * 0.03 - 0.0125, 0.0, 0.0)
                        SetTextScale(0, 0.3)
                        SetTextFont(4)
                        SetTextColour(255, 255, 255, 255)
                        BeginTextCommandDisplayText("STRING")
                        SetTextCentre(1)
                        AddTextComponentSubstringPlayerName(v.data.text)
                        SetDrawOrigin(v.data.coords.x, v.data.coords.y, v.data.coords.z)
                        SetTextJustification(0)
                        EndTextCommandDisplayText(-0.01, 0.001)
                        ResetScriptGfxAlign()
                        SetScriptGfxAlignParams(0.018 + (width / 2), 0 * 0.03 - 0.015, 0.0, 0.0)
                        DrawSprite('interactions_txd_0resmon', bg, 0.0, 0.015, width, 0.025, 0.0, 255, 255, 255, 255)
                        ResetScriptGfxAlign()
                        ClearDrawOrigin()
                        if v.data.enableKeyClick then
                            if v.data.keyNum then
                                if IsControlJustReleased(0, v.data.keyNum) then
                                    v.onKeyClick()
                                end
                            end
                            if v.data.keyNum2 then
                                if IsControlJustReleased(0, v.data.keyNum2) then
                                    v.onKeyClick2()
                                end
                            end
                        end
                    end
                else
                    SetScriptGfxAlignParams(0.0, 0.0, 0.0, 0.0)
                    SetDrawOrigin(v.data.coords.x, v.data.coords.y, v.data.coords.z)
                    DrawSprite('interactions_txd_0resmon', 'pin', 0, 0, 0.0125, 0.02333333333333333, 0, 255, 255, 255, 255)
                    ResetScriptGfxAlign()
                end
            end
        end
        Citizen.Wait(sleep)
    end
end)