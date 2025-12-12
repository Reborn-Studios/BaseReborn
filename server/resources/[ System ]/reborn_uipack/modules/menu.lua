local menus = {}
local currentMenu = nil

function RegisterMenu(menuData, callback)
  if not menuData.id then
    error("No menu id was provided.")
  end
  if not menuData.title then
    error("No menu title was provided.")
  end
  if not menuData.options then
    error("No menu options were provided.")
  end
  
  menuData.cb = callback
  menus[menuData.id] = menuData
end

function ShowMenu(menuId, startIndex)
  local menu = menus[menuId]
  
  if not menu then
    error(("No menu with id %s was found"):format(menuId))
  end
  
  if table.type(menu.options) == "empty" then
    error(("Can't open empty menu with id %s"):format(menuId))
  end
  
  if not currentMenu then
    local disableControl = Utils.game == "fivem" and 140 or 3809269511
    
    CreateThread(function()
      local playerId = PlayerId()
      
      while currentMenu do
        if currentMenu.disableInput ~= false then
          DisablePlayerFiring(playerId, true)
          
          if Utils.game == "fivem" then
            HudWeaponWheelIgnoreSelection()
          end
          
          DisableControlAction(0, disableControl, true)
        end
        
        Wait(0)
      end
    end)
  end
  
  currentMenu = menu
  
  Utils.setNuiFocus(not menu.disableInput, true)
  
  SendNUIMessage({
    action = "setMenu",
    data = {
      position = menu.position,
      canClose = menu.canClose,
      title = menu.title,
      subtitle = menu.subtitle,
      items = menu.options,
      startItemIndex = startIndex and (startIndex - 1) or 0
    }
  })
end

function HideMenu(triggerClose)
  local menu = currentMenu
  currentMenu = nil
  
  if not menu then
    return
  end
  
  Utils.resetNuiFocus()
  
  if triggerClose and menu.onClose then
    menu.onClose()
  end
  
  SendNUIMessage({
    action = "closeMenu"
  })
end

function SetMenuOptions(menuId, options, optionIndex)
  if optionIndex then
    menus[menuId].options[optionIndex] = options
  else
    if not options[1] then
      error("Invalid override format used, expected table of options.")
    end
    menus[menuId].options = options
  end
end

function GetOpenMenu()
  if currentMenu then
    return currentMenu.id
  end
end

RegisterNUICallback("confirmSelected", function(data, cb)
  cb(1)
  
  local itemIndex = data[1] + 1
  data[1] = itemIndex
  
  if data[2] then
    data[2] = data[2] + 1
  end
  
  if not currentMenu then
    return
  end
  
  local menu = currentMenu
  local selectedOption = menu.options[itemIndex]
  
  if selectedOption.close ~= false then
    Utils.resetNuiFocus()
    currentMenu = nil
  end
  
  if menu.cb then
    menu.cb(data[1], data[2], selectedOption.args, data[3])
  end
end)

RegisterNUICallback("changeIndex", function(data, cb)
  cb(1)
  
  if not currentMenu or not currentMenu.onSideScroll then
    return
  end
  
  local itemIndex = data[1] + 1
  data[1] = itemIndex
  
  if data[2] then
    data[2] = data[2] + 1
  end
  
  currentMenu.onSideScroll(data[1], data[2], currentMenu.options[itemIndex].args)
end)

RegisterNUICallback("changeSelected", function(data, cb)
  cb(1)
  
  if not currentMenu or not currentMenu.onSelected then
    return
  end
  
  local itemIndex = data[1] + 1
  data[1] = itemIndex
  
  local args = currentMenu.options[itemIndex].args
  
  if args then
    if type(args) ~= "table" then
      return error("Menu args must be passed as a table")
    end
  else
    args = {}
  end
  
  if data[2] then
    args[data[3]] = true
  end
  
  if data[2] and not args.isCheck then
    data[2] = data[2] + 1
  end
  
  currentMenu.onSelected(data[1], data[2], args)
end)

RegisterNUICallback("changeChecked", function(data, cb)
  cb(1)
  
  if not currentMenu or not currentMenu.onCheck then
    return
  end
  
  local itemIndex = data[1] + 1
  data[1] = itemIndex
  
  currentMenu.onCheck(data[1], data[2], currentMenu.options[itemIndex].args)
end)

RegisterNUICallback("closeMenu", function(data, cb)
  cb(1)
  
  Utils.resetNuiFocus()
  
  if not currentMenu then
    return
  end
  
  local menu = currentMenu
  currentMenu = nil
  
  if menu.onClose then
    menu.onClose(data)
  end
end)