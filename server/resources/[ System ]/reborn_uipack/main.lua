function LoadLocaleFile(locale)
  if not locale then
    locale = "pt"
  end

  local resourceName = GetCurrentResourceName()
  local localeFilePath = string.format("locales/%s.lua", locale)
  local localeContent = LoadResourceFile(resourceName, localeFilePath)

  if localeContent then
    local localeData = load(localeContent)()
    if localeData then
      return localeData
    end
  end

  return {}
end

-- Callback NUI para obter configurações do resource
RegisterNuiCallback("getConfig", function(data, callback)
  local locale = GetConvar("reborn:locale", "pt")
  local debugMode = GetConvarInt("reborn:debug", 0) == 1

  local config = {
    primaryColor = GetConvar("reborn:primaryColor", "#682bca"),
    notificationDuration = GetConvarInt("reborn:notificationDuration", 3000),
    progressCancelKey = GetConvar("reborn:progressCancelKey", "X"),
    notifyPosition = GetConvar("reborn:notificationPosition", "top-center"),
    textUIPosition = GetConvar("reborn:textUIPosition", "center-left"),
    progressVariant = GetConvar("reborn:progressBar", "secondary"),
    debugMode = debugMode,
    locale = locale,
    locales = LoadLocaleFile(locale)
  }

  if debugMode then
    Utils.debugPrint(string.format("Locale: %s", locale))
    Utils.debugPrint("Config Table:")

    for key, value in pairs(config) do
      if type(value) == "table" then
        Utils.debugPrint(key .. ": {")
        for subKey, subValue in pairs(value) do
          Utils.debugPrint("  " .. tostring(subKey) .. " = " .. tostring(subValue))
        end
        Utils.debugPrint("}")
      else
        Utils.debugPrint(tostring(key) .. " = " .. tostring(value))
      end
    end
  end

  callback(config)
end)

-- Exports para notificações
exports("Notify", Notify)
RegisterNetEvent("reborn:notify", Notify)

-- Exports para Text UI
exports("ShowTextUI", ShowTextUI)
exports("HideTextUI", HideTextUI)
exports("IsTextUIOpen", IsTextUIOpen)

-- Exports para Progress Bar
exports("ProgressBar", ProgressBar)
exports("ProgressActive", ProgressActive)
exports("CancelProgress", CancelProgress)

local function registerProgressFallback()
  local state = GetResourceState('will_notifications')
  if state ~= 'started' then
    RegisterNetEvent('Progress')
    AddEventHandler('Progress', function(time, message)
      ProgressBar({ label = message, duration = tonumber(time) or 5000 })
    end)
    RegisterNetEvent('progress')
    AddEventHandler('progress', function(time, message)
      ProgressBar({ label = message, duration = tonumber(time) or 5000 })
    end)
  end
end

registerProgressFallback()


-- Exports para Radial Menu
exports("AddRadialItem", AddRadialItem)
exports("RemoveRadialItem", RemoveRadialItem)
exports("ClearRadialItems", ClearRadialItems)
exports("RegisterRadial", RegisterRadial)
exports("HideRadial", HideRadial)
exports("DisableRadial", disableRadial)
exports("GetCurrentRadialId", GetCurrentRadialId)

-- Exports para Skill Check
exports("SkillCheck", SkillCheck)
exports("SkillCheckActive", SkillCheckActive)
exports("CancelSkillCheck", CancelSkillCheck)

-- Exports para Input Dialog
exports("InputDialog", InputDialog)
exports("CloseInputDialog", CloseInputDialog)

-- Exports para Context Menu
exports("RegisterContext", RegisterContext)
exports("ShowContext", ShowContext)
exports("HideContext", HideContext)
exports("GetOpenContextMenu", GetOpenContextMenu)

-- Exports para Alert Dialog
exports("AlertDialog", AlertDialog)
exports("CloseAlertDialog", CloseAlertDialog)

-- Exports para Menu
exports("RegisterMenu", RegisterMenu)
exports("ShowMenu", ShowMenu)
exports("HideMenu", HideMenu)
exports("GetOpenMenu", GetOpenMenu)
exports("SetMenuOptions", SetMenuOptions)
