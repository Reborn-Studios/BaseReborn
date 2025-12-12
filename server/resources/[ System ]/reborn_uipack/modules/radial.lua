-- Estado do menu radial
local isRadialOpen = false
local registeredMenus = {}
local rootMenuItems = {}
local menuHistory = {}
local currentMenu = nil
local isRadialDisabled = false

function OpenRadialMenu(menuId, selectedOption)
  local targetMenu = menuId and registeredMenus[menuId] or nil
  
  if menuId and not targetMenu then
    return error("No radial menu with such id found.")
  end
  
  currentMenu = targetMenu
  
  SendNUIMessage({
    action = "openRadialMenu",
    data = false
  })
  
  Wait(100)
  
  if not isRadialOpen then
    return
  end
  
  local itemsToShow = (targetMenu and targetMenu.items) and targetMenu.items or rootMenuItems
  
  SendNUIMessage({
    action = "openRadialMenu",
    data = {
      items = Utils.sanitizeItems(itemsToShow),
      sub = targetMenu and true or nil,
      option = selectedOption
    }
  })
end

function RefreshRadialMenu(menuId)
  if not isRadialOpen then
    return
  end
  
  if currentMenu and menuId then
    if menuId == currentMenu.id then
      return OpenRadialMenu(menuId)
    else
      for i = 1, #menuHistory do
        local historyEntry = menuHistory[i]
        
        if historyEntry.id == menuId then
          local menu = registeredMenus[historyEntry.id]
          
          for j = 1, #menu.items do
            if menu.items[j].menu == currentMenu.id then
              return
            end
          end
          
          currentMenu = menu
          
          for j = #menuHistory, i, -1 do
            menuHistory[j] = nil
          end
          
          return OpenRadialMenu(currentMenu.id)
        end
      end
    end
    return
  end
  
  table.wipe(menuHistory)
  OpenRadialMenu()
end

function RegisterRadial(menuData)
  registeredMenus[menuData.id] = menuData
  menuData.resource = GetInvokingResource()
  
  if currentMenu then
    RefreshRadialMenu(menuData.id)
  end
end

function GetCurrentRadialId()
  return currentMenu and currentMenu.id or nil
end

function HideRadial()
  if not isRadialOpen then
    return
  end
  
  SendNUIMessage({
    action = "openRadialMenu",
    data = false
  })
  
  Utils.resetNuiFocus()
  table.wipe(menuHistory)
  isRadialOpen = false
  currentMenu = nil
end

function AddRadialItem(items)
  local itemCount = #rootMenuItems
  local resourceName = GetInvokingResource()
  
  if table.type(items) ~= "array" or not items then
    items = {items}
  end
  
  for i = 1, #items do
    local item = items[i]
    item.resource = resourceName
    
    if itemCount == 0 then
      itemCount = itemCount + 1
      rootMenuItems[itemCount] = item
    else
      for j = 1, itemCount do
        if rootMenuItems[j].id == item.id then
          rootMenuItems[j] = item
          break
        end
        
        if j == itemCount then
          itemCount = itemCount + 1
          rootMenuItems[itemCount] = item
        end
      end
    end
  end
  
  if isRadialOpen and not currentMenu then
    RefreshRadialMenu()
  end
end

function RemoveRadialItem(itemId)
  local foundItem = nil
  
  for i = 1, #rootMenuItems do
    foundItem = rootMenuItems[i]
    
    if foundItem.id == itemId then
      table.remove(rootMenuItems, i)
      break
    end
  end
  
  if isRadialOpen then
    RefreshRadialMenu(itemId)
  end
end

function ClearRadialItems()
  table.wipe(rootMenuItems)
  
  if isRadialOpen then
    RefreshRadialMenu()
  end
end

RegisterNUICallback("radialClick", function(selectedIndex, cb)
  cb(1)
  
  local itemIndex = selectedIndex + 1
  local selectedItem = nil
  local parentMenuId = nil
  
  if currentMenu then
    selectedItem = currentMenu.items[itemIndex]
    parentMenuId = currentMenu.id
  else
    selectedItem = rootMenuItems[itemIndex]
  end
  
  local itemResource = (currentMenu and currentMenu.resource) and currentMenu.resource or selectedItem.resource
  
  if selectedItem.menu then
    local historyIndex = #menuHistory + 1
    menuHistory[historyIndex] = {
      id = currentMenu and currentMenu.id or nil,
      option = selectedItem.menu
    }
    
    OpenRadialMenu(selectedItem.menu)
  else
    if not selectedItem.keepOpen then
      HideRadial()
    end
  end
  
  local callback = selectedItem.onSelect
  
  if callback then
    if type(callback) == "string" then
      return exports[itemResource][callback](0, parentMenuId, itemIndex)
    end
    
    callback(parentMenuId, itemIndex)
  end
end)

RegisterNUICallback("radialBack", function(data, cb)
  cb(1)
  
  local historyCount = #menuHistory
  local previousMenu = historyCount > 0 and menuHistory[historyCount] or nil
  
  if not previousMenu then
    return
  end
  
  menuHistory[historyCount] = nil
  
  if previousMenu.id then
    return OpenRadialMenu(previousMenu.id, previousMenu.option)
  end
  
  currentMenu = nil
  
  SendNUIMessage({
    action = "openRadialMenu",
    data = false
  })
  
  Wait(100)
  
  if not isRadialOpen then
    return
  end
  
  SendNUIMessage({
    action = "openRadialMenu",
    data = {
      items = Utils.sanitizeItems(rootMenuItems),
      option = previousMenu.option
    }
  })
end)

RegisterNUICallback("radialClose", function(data, cb)
  cb(1)
  
  if not isRadialOpen then
    return
  end
  
  Utils.resetNuiFocus()
  isRadialOpen = false
  currentMenu = nil
end)

RegisterNUICallback("radialTransition", function(data, cb)
  Wait(100)
  
  if not isRadialOpen then
    return cb(false)
  end
  
  cb(true)
end)

function disableRadial(disabled)
  isRadialDisabled = disabled
  
  if isRadialOpen and disabled then
    return HideRadial()
  end
end

function WaitForUtilsDependency()
  local maxAttempts = 100
  local attempts = 0
  
  while not Utils and maxAttempts > attempts do
    Wait(100)
    attempts = attempts + 1
  end
  
  if not Utils then
    error(("Failed to load Utils dependency after \"%s\" ms."):format(maxAttempts * 100))
  end
end

WaitForUtilsDependency()

Utils.addKeybind({
  name = "reborn-radial",
  description = "Open radial menu",
  defaultKey = GetConvar("reborn:radialOpenKey", "z"),
  onPressed = function()
    if isRadialDisabled then
      return
    end
    
    if isRadialOpen then
      return HideRadial()
    end
    
    if #rootMenuItems == 0 or IsNuiFocused() or IsPauseMenuActive() then
      return
    end
    
    isRadialOpen = true
    
    SendNUIMessage({
      action = "openRadialMenu",
      data = {
        items = Utils.sanitizeItems(rootMenuItems)
      }
    })
    
    Utils.setNuiFocus(true)
    SetCursorLocation(0.5, 0.5)
    
    local playerId = PlayerId()
    
    while isRadialOpen do
      DisablePlayerFiring(playerId, true)
      DisableControlAction(0, 1, true)
      DisableControlAction(0, 2, true)
      DisableControlAction(0, 142, true)
      DisableControlAction(2, 199, true)
      DisableControlAction(2, 200, true)
      Wait(0)
    end
  end,
  onReleased = GetConvar("reborn:radialOpenMode", "press") == "hold" and HideRadial or nil
})

AddEventHandler("onClientResourceStop", function(resourceName)
  for i = #rootMenuItems, 1, -1 do
    local item = rootMenuItems[i]
    
    if item.resource == resourceName then
      table.remove(rootMenuItems, i)
    end
  end
end)