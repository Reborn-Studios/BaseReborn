local registeredContexts = {}
local currentContextId = nil

function CloseContextMenu(callback, forceClose, skipExitCallback)
  if callback then
    callback(1)
  end
  
  Utils.resetNuiFocus()
  
  if not currentContextId then
    return
  end
  
  if callback or skipExitCallback then
    local currentContext = registeredContexts[currentContextId]
    if currentContext and currentContext.onExit then
      currentContext.onExit()
    end
  end
  
  if not callback then
    SendNUIMessage({
      action = "hideContext"
    })
  end
  
  currentContextId = nil
end

function ShowContext(contextId)
  local context = registeredContexts[contextId]
  
  if not context then
    error("No context menu of such id found.")
  end
  
  currentContextId = contextId
  
  Utils.setNuiFocus(false)
  
  SendNuiMessage(json.encode({
    action = "showContext",
    data = {
      title = context.title,
      subtitle = context.subtitle,
      titleIcon = context.titleIcon,
      sectionTitle = context.sectionTitle,
      sectionIcon = context.sectionIcon,
      footerLabel = context.footerLabel,
      canClose = context.canClose,
      menu = context.menu,
      options = Utils.sanitizeItems(context.options)
    }
  }, {
    sort_keys = true
  }))
end

function RegisterContext(contextData)
  for key, value in pairs(contextData) do
    if type(key) == "number" then
      registeredContexts[value.id] = value
    else
      registeredContexts[contextData.id] = contextData
      break
    end
  end
end

function GetOpenContextMenu()
  return currentContextId
end

function HideContext(skipExitCallback)
  CloseContextMenu(nil, nil, skipExitCallback)
end

RegisterNUICallback("openContext", function(data, callback)
  if data.back then
    local currentContext = registeredContexts[currentContextId]
    if currentContext and currentContext.onBack then
      currentContext.onBack()
    end
  end
  
  callback(1)
  ShowContext(data.id)
end)

RegisterNUICallback("clickContext", function(optionIndex, callback)
  callback(1)
  
  local indexType = math.type(tonumber(optionIndex))
  
  if indexType == "float" then
    optionIndex = math.tointeger(optionIndex)
  elseif tonumber(optionIndex) then
    optionIndex = optionIndex + 1
  end
  
  local currentContext = registeredContexts[currentContextId]
  local selectedOption = currentContext.options[optionIndex]
  
  if not selectedOption.event and not selectedOption.serverEvent and not selectedOption.onSelect then
    return
  end
  
  currentContextId = nil
  
  SendNUIMessage({
    action = "hideContext"
  })
  
  Utils.resetNuiFocus()
  
  if selectedOption.onSelect then
    selectedOption.onSelect(selectedOption.args)
  end
  
  if selectedOption.event then
    TriggerEvent(selectedOption.event, selectedOption.args)
  end
  
  if selectedOption.serverEvent then
    TriggerServerEvent(selectedOption.serverEvent, selectedOption.args)
  end
end)

RegisterNUICallback("closeContext", CloseContextMenu)