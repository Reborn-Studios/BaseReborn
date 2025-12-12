Utils = {}
Utils.game = GetGameName()

function Utils.waitFor(callback, errorMessage, timeout)
    local result = callback()
    if result ~= nil then
        return result
    end
    
    if timeout or timeout == nil then
        if type(timeout) ~= "number" then
            timeout = 1000
        end
    end
    
    local startTime = timeout and GetGameTimer() or nil
    
    while result == nil do
        Wait(0)
        
        local elapsedTime = timeout and (GetGameTimer() - startTime) or nil
        
        if elapsedTime and elapsedTime > timeout then
            error(
                (errorMessage or "failed to resolve callback"):format(elapsedTime),
                2
            )
            return
        end
        
        result = callback()
    end
    
    return result
end

function Utils.requestAudioBank(bankName, timeout)
    return Utils.waitFor(
        function()
            if RequestScriptAudioBank(bankName, false) then
                return bankName
            end
        end,
        ([[failed to load audiobank '%s' - this may be caused by
- too many loaded assets
- oversized, invalid, or corrupted assets]]):format(bankName),
        timeout or 30000
    )
end

function Utils.streamingRequest(requestFunc, checkFunc, assetType, assetName, timeout, ...)
    if checkFunc(assetName) then
        return assetName
    end
    
    requestFunc(assetName, ...)
    
    return Utils.waitFor(
        function()
            if checkFunc(assetName) then
                return assetName
            end
        end,
        ([[failed to load %s '%s' - this may be caused by
- too many loaded assets
- oversized, invalid, or corrupted assets]]):format(assetType, assetName),
        timeout or 30000
    )
end

function Utils.requestAnimDict(animDict, timeout)
    if HasAnimDictLoaded(animDict) then
        return animDict
    end
    
    if type(animDict) ~= "string" then
        error(
            ("expected animDict to have type 'string' (received %s)"):format(type(animDict))
        )
    end
    
    if not DoesAnimDictExist(animDict) then
        error(("attempted to load invalid animDict '%s'"):format(animDict))
    end
    
    return Utils.streamingRequest(
        RequestAnimDict,
        HasAnimDictLoaded,
        "animDict",
        animDict,
        timeout
    )
end

function Utils.requestModel(model, timeout)
    if type(model) ~= "number" then
        model = joaat(model)
    end
    
    if HasModelLoaded(model) then
        return model
    end
    
    if not IsModelValid(model) and not IsModelInCdimage(model) then
        error(("attempted to load invalid model '%s'"):format(model))
    end
    
    return Utils.streamingRequest(
        RequestModel,
        HasModelLoaded,
        "model",
        model,
        timeout
    )
end

-- NUI Focus Management
local previousNuiFocusState = IsNuiFocusKeepingInput()

function Utils.setNuiFocus(keepInput, blockInput)
    previousNuiFocusState = IsNuiFocusKeepingInput()
    SetNuiFocus(true, not blockInput)
    SetNuiFocusKeepInput(keepInput)
end

function Utils.resetNuiFocus()
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(previousNuiFocusState)
end

-- Keybind System
local keybinds = {}
local IsPauseMenuActive = IsPauseMenuActive
local GetControlInstructionalButton = GetControlInstructionalButton

local KeybindPrototype = {
    disabled = false,
    isPressed = false,
    defaultKey = "",
    defaultMapper = "keyboard"
}

KeybindPrototype.__index = function(self, key)
    if key == "currentKey" then
        return self:getCurrentKey() or KeybindPrototype[key]
    end
    return KeybindPrototype[key]
end

function KeybindPrototype:getCurrentKey()
    return GetControlInstructionalButton(0, self.hash, true):sub(3)
end

function KeybindPrototype:isControlPressed()
    return self.isPressed
end

function KeybindPrototype:disable(state)
    self.disabled = state
end

function Utils.addKeybind(keybindData)
    keybindData.hash = joaat("+" .. keybindData.name) | 0x80000000
    
    keybinds[keybindData.name] = setmetatable(keybindData, KeybindPrototype)
    
    RegisterCommand("+" .. keybindData.name, function()
        if keybindData.disabled or IsPauseMenuActive() then
            return
        end
        
        keybindData.isPressed = true
        
        if keybindData.onPressed then
            keybindData:onPressed()
        end
    end)
    
    RegisterCommand("-" .. keybindData.name, function()
        if keybindData.disabled or IsPauseMenuActive() then
            return
        end
        
        keybindData.isPressed = false
        
        if keybindData.onReleased then
            keybindData:onReleased()
        end
    end)
    
    RegisterKeyMapping(
        "+" .. keybindData.name,
        keybindData.description,
        keybindData.defaultMapper,
        keybindData.defaultKey
    )
    
    if keybindData.secondaryKey then
        RegisterKeyMapping(
            "~!+" .. keybindData.name,
            keybindData.description,
            keybindData.secondaryMapper or keybindData.defaultMapper,
            keybindData.secondaryKey
        )
    end
    
    SetTimeout(500, function()
        TriggerEvent("chat:removeSuggestion", ("/+%s"):format(keybindData.name))
        TriggerEvent("chat:removeSuggestion", ("/-%s"):format(keybindData.name))
    end)
    
    return keybindData
end

function Utils.sanitizeItems(items)
    local sanitized = {}
    
    for i = 1, #items do
        local item = items[i]
        local cleanItem = {}
        
        for key, value in pairs(item) do
            if type(value) ~= "function" and key ~= "onSelect" then
                cleanItem[key] = value
            end
        end
        
        sanitized[#sanitized + 1] = cleanItem
    end
    
    return sanitized
end

function Utils.debugPrint(message)
    print("[uipack-debug]", message)
end