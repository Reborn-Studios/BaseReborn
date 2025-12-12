local disabledComponents = json.decode(GetConvar("reborn:disabledComponents", "{}")) or {}
local uipack = exports.reborn_uipack
local debugMode = GetConvarInt("reborn:debug", 0) == 1

local libOverrides = {}

function libOverrides.notify(data)
    uipack:Notify(data)
end

function libOverrides.showTextUI(text, options)
    uipack:ShowTextUI(text, options)
end

function libOverrides.hideTextUI()
    uipack:HideTextUI()
end

function libOverrides.isTextUIOpen()
    return uipack:IsTextUIOpen()
end

function libOverrides.progressBar(data)
    if not data.variant then
        data.variant = GetConvar("reborn:progressBar", "secondary")
    end
    return uipack:ProgressBar(data)
end

function libOverrides.progressCircle(data)
    data.variant = "secondary"
    return uipack:ProgressBar(data)
end

function libOverrides.progressActive()
    return uipack:ProgressActive()
end

function libOverrides.cancelProgress()
    uipack:CancelProgress()
end

function libOverrides.addRadialItem(data)
    uipack:AddRadialItem(data)
end

function libOverrides.removeRadialItem(id)
    uipack:RemoveRadialItem(id)
end

function libOverrides.clearRadialItems()
    uipack:ClearRadialItems()
end

function libOverrides.registerRadial(data)
    uipack:RegisterRadial(data)
end

function libOverrides.hideRadial()
    uipack:HideRadial()
end

function libOverrides.disableRadial(state)
    uipack:DisableRadial(state)
end

function libOverrides.getCurrentRadialId()
    return uipack:GetCurrentRadialId()
end

function libOverrides.skillCheck(difficulty, keys, inputs)
    return uipack:SkillCheck(difficulty, keys, inputs)
end

function libOverrides.skillCheckActive()
    return uipack:SkillCheckActive()
end

function libOverrides.cancelSkillCheck()
    return uipack:CancelSkillCheck()
end

function libOverrides.inputDialog(heading, rows, options)
    return uipack:InputDialog(heading, rows, options)
end

function libOverrides.closeInputDialog()
    uipack:CloseInputDialog()
end

function libOverrides.registerContext(data)
    uipack:RegisterContext(data)
end

function libOverrides.showContext(id)
    uipack:ShowContext(id)
end

function libOverrides.hideContext(onExit)
    uipack:HideContext(onExit)
end

function libOverrides.getOpenContextMenu()
    return uipack:GetOpenContextMenu()
end

function libOverrides.alertDialog(data)
    return uipack:AlertDialog(data)
end

function libOverrides.closeAlertDialog()
    uipack:CloseAlertDialog()
end

function libOverrides.registerMenu(id, data)
    uipack:RegisterMenu(id, data)
end

function libOverrides.showMenu(id)
    uipack:ShowMenu(id)
end

function libOverrides.hideMenu(onExit)
    uipack:HideMenu(onExit)
end

function libOverrides.getOpenMenu()
    return uipack:GetOpenMenu()
end

function libOverrides.setMenuOptions(id, options, index)
    uipack:SetMenuOptions(id, options, index)
end

local componentMapping = {
    notify = "notify",
    showTextUI = "textUI",
    hideTextUI = "textUI",
    isTextUIOpen = "textUI",
    progressBar = "progressBar",
    progressCircle = "progressBar",
    progressActive = "progressBar",
    cancelProgress = "progressBar",
    addRadialItem = "radial",
    removeRadialItem = "radial",
    clearRadialItems = "radial",
    registerRadial = "radial",
    hideRadial = "radial",
    disableRadial = "radial",
    getCurrentRadialId = "radial",
    skillCheck = "skillCheck",
    skillCheckActive = "skillCheck",
    cancelSkillCheck = "skillCheck",
    inputDialog = "inputDialog",
    closeInputDialog = "inputDialog",
    registerContext = "contextMenu",
    showContext = "contextMenu",
    hideContext = "contextMenu",
    getOpenContextMenu = "contextMenu",
    alertDialog = "alertDialog",
    closeAlertDialog = "alertDialog",
    registerMenu = "listMenu",
    showMenu = "listMenu",
    hideMenu = "listMenu",
    getOpenMenu = "listMenu",
    setMenuOptions = "listMenu"
}

local successCount = 0
local totalCount = 0

for functionName, overrideFunction in pairs(libOverrides) do
    totalCount = totalCount + 1
    local componentName = componentMapping[functionName]
    
    if componentName and disabledComponents[componentName] then
        if debugMode then
            print(string.format("[reborn_uipack] Skipped overriding lib.%s (component \"%s\" disabled)", functionName, componentName))
        end
    else
        local success, error = pcall(function()
            lib[functionName] = overrideFunction
            successCount = successCount + 1
        end)
        
        if not success and debugMode then
            print(string.format("[reborn_uipack] Failed to override lib.%s: %s", functionName, error))
        end
    end
end

if debugMode then
    print(string.format("[reborn_uipack] Successfully initialized %d/%d function overrides", successCount, totalCount))
end

local originalExports = exports

exports = setmetatable({}, {
    __call = function(self, resource, exportName)
        return originalExports(resource, exportName)
    end,
    __index = function(self, resource)
        if resource == "ox_lib" then
            return setmetatable({}, {
                __index = function(_, functionName)
                    local override = libOverrides[functionName]
                    if override then
                        return function(_, ...)
                            return override(...)
                        end
                    end
                    return originalExports.ox_lib[functionName]
                end
            })
        end
        return originalExports[resource]
    end
})
