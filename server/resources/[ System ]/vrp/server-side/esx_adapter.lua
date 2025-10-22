ESX.Players = {}
ESX.Jobs = {}
ESX.Items = {}
Core = {}
Core.UsableItemsCallbacks = {}
Core.TimeoutCount = -1
Core.CancelledTimeouts = {}
Core.RegisteredCommands = {}
Core.Pickups = {}
Core.PickupId = 0
Core.PlayerFunctionOverrides = {}

AddEventHandler('esx:getSharedObject', function(cb)
  if ESX.IsFunctionReference(cb) then
    cb(ESX)
  end
end)

exports('getSharedObject', function()
    return ESX
end)

exportHandler("es_extended","getSharedObject", function()
  return ESX
end)

RegisterServerEvent('esx:clientLog')
AddEventHandler('esx:clientLog', function(msg)
    if Config.EnableDebug then
        print(('[^2TRACE^7] %s^7'):format(msg))
    end
end)

function ESX.Trace(msg)
    if Config.EnableDebug then
      print(('[^2TRACE^7] %s^7'):format(msg))
    end
end

function ESX.SetTimeout(msec, cb)
    local id = Core.TimeoutCount + 1
    SetTimeout(msec, function()
        if Core.CancelledTimeouts[id] then
            Core.CancelledTimeouts[id] = nil
        else
            cb()
        end
    end)
    Core.TimeoutCount = id
    return id
end

function ESX.TriggerClientEvent(eventName, playerIds, ...)
    if type(playerIds) == "number" then
        TriggerClientEvent(eventName, playerIds, ...)
        return
    end

    local payload = msgpack.pack_args(...)
    local payloadLength = #payload

    for i = 1, #playerIds do
        TriggerClientEventInternal(eventName, playerIds[i], payload, payloadLength)
    end
end
  
function ESX.RegisterCommand(name, group, cb, allowConsole, suggestion)
    if type(name) == 'table' then
        for k, v in ipairs(name) do
            ESX.RegisterCommand(v, group, cb, allowConsole, suggestion)
        end
    
        return
    end
  
    if Core.RegisteredCommands[name] then
        print(('[^3WARNING^7] Command ^5"%s" ^7already registered, overriding command'):format(name))
    
        if Core.RegisteredCommands[name].suggestion then
            TriggerClientEvent('chat:removeSuggestion', -1, ('/%s'):format(name))
        end
    end
  
    if suggestion then
        if not suggestion.arguments then
            suggestion.arguments = {}
        end
        if not suggestion.help then
            suggestion.help = ''
        end
    
        TriggerClientEvent('chat:addSuggestion', -1, ('/%s'):format(name), suggestion.help, suggestion.arguments)
    end
  
    Core.RegisteredCommands[name] = {group = group, cb = cb, allowConsole = allowConsole, suggestion = suggestion}
  
    RegisterCommand(name, function(playerId, args, rawCommand)
      local command = Core.RegisteredCommands[name]
  
      if not command.allowConsole and playerId == 0 then
        print(('[^3WARNING^7] ^5%s'):format(_U('commanderror_console')))
      else
        local xPlayer, error = ESX.Players[playerId], nil
  
        if command.suggestion then
          if command.suggestion.validate then
            if #args ~= #command.suggestion.arguments then
              error = _U('commanderror_argumentmismatch', #args, #command.suggestion.arguments)
            end
          end
  
          if not error and command.suggestion.arguments then
            local newArgs = {}
  
            for k, v in ipairs(command.suggestion.arguments) do
              if v.type then
                if v.type == 'number' then
                  local newArg = tonumber(args[k])
  
                  if newArg then
                    newArgs[v.name] = newArg
                  else
                    error = _U('commanderror_argumentmismatch_number', k)
                  end
                elseif v.type == 'player' or v.type == 'playerId' then
                  local targetPlayer = tonumber(args[k])
  
                  if args[k] == 'me' then
                    targetPlayer = playerId
                  end
  
                  if targetPlayer then
                    local xTargetPlayer = ESX.GetPlayerFromId(targetPlayer)
  
                    if xTargetPlayer then
                      if v.type == 'player' then
                        newArgs[v.name] = xTargetPlayer
                      else
                        newArgs[v.name] = targetPlayer
                      end
                    else
                      error = _U('commanderror_invalidplayerid')
                    end
                  else
                    error = _U('commanderror_argumentmismatch_number', k)
                  end
                elseif v.type == 'string' then
                  newArgs[v.name] = args[k]
                elseif v.type == 'item' then
                  if ESX.Items[args[k]] then
                    newArgs[v.name] = args[k]
                  else
                    error = _U('commanderror_invaliditem')
                  end
                elseif v.type == 'weapon' then
                  if ESX.GetWeapon(args[k]) then
                    newArgs[v.name] = string.upper(args[k])
                  else
                    error = _U('commanderror_invalidweapon')
                  end
                elseif v.type == 'any' then
                  newArgs[v.name] = args[k]
                end
              end
  
              if v.validate == false then
                error = nil
              end
  
              if error then
                break
              end
            end
  
            args = newArgs
          end
        end
  
        if error then
          if playerId == 0 then
            print(('[^3WARNING^7] %s^7'):format(error))
          else
            xPlayer.showNotification(error)
          end
        else
          cb(xPlayer or false, args, function(msg)
            if playerId == 0 then
              print(('[^3WARNING^7] %s^7'):format(msg))
            else
              xPlayer.showNotification(msg)
            end
          end)
        end
      end
    end, true)
  
    if type(group) == 'table' then
        for k, v in ipairs(group) do
            ExecuteCommand(('add_ace group.%s command.%s allow'):format(v, name))
        end
    else
        ExecuteCommand(('add_ace group.%s command.%s allow'):format(group, name))
    end
end
  
function ESX.ClearTimeout(id)
    Core.CancelledTimeouts[id] = true
end

Callbacks = {}

Callbacks.requests = {}
Callbacks.storage = {}
Callbacks.id = 0

function Callbacks:Register(name, resource, cb)
    self.storage[name] = {
        resource = resource,
        cb = cb
    }
end

function Callbacks:Execute(cb, ...)
    local success, errorString = pcall(cb, ...)

    if not success then
        print(("[^1ERROR^7] Failed to execute Callback with RequestId: ^5%s^7"):format(self.currentId))
        print("^3Callback Error:^7 " .. tostring(errorString))  -- just log, don't throw
        self.currentId = nil
        return
    end

    self.currentId = nil
end

function Callbacks:Trigger(player, event, cb, invoker, ...)
    self.requests[self.id] = {
        await = type(cb) == "boolean",
        cb = cb or promise:new()
    }
    local table = self.requests[self.id]

    TriggerClientEvent("esx:triggerClientCallback", player, event, self.id, invoker, ...)

    self.id += 1

    return table.cb
end

function Callbacks:ServerRecieve(player, event, requestId, invoker, ...)
    self.currentId = requestId

    if not self.storage[event] then
        return error(("Server Callback with requestId ^5%s^1 Was Called by ^5%s^1 but does not exist."):format(event, invoker))
    end

    local returnCb = function(...)
        TriggerClientEvent("esx:serverCallback", player, requestId, invoker, ...)
    end
    local callback = self.storage[event].cb

    self:Execute(callback, player, returnCb, ...)
end

function Callbacks:RecieveClient(requestId, invoker, ...)
    self.currentId = requestId

    if not self.requests[self.currentId] then
        return error(("Client Callback with requestId ^5%s^1 Was Called by ^5%s^1 but does not exist."):format(self.currentId, invoker))
    end

    local callback = self.requests[self.currentId]

    self.requests[requestId] = nil
    if callback.await then
        callback.cb:resolve({ ... })
    else
        self:Execute(callback.cb, ...)
    end
end

function ESX.TriggerClientCallback(player, eventName, callback, ...)
    local invokingResource = GetInvokingResource()
    local invoker = (invokingResource and invokingResource ~= "Unknown") and invokingResource or "es_extended"

    Callbacks:Trigger(player, eventName, callback, invoker, ...)
end

function ESX.AwaitClientCallback(player, eventName, ...)
    local invokingResource = GetInvokingResource()
    local invoker = (invokingResource and invokingResource ~= "Unknown") and invokingResource or "es_extended"

    local p = Callbacks:Trigger(player, eventName, false, invoker, ...)
    if not p then return end

    SetTimeout(15000, function()
        if p.state == "pending" then
            p:reject("Server Callback Timed Out")
        end
    end)

    Citizen.Await(p)

    return table.unpack(p.value)
end

function ESX.RegisterServerCallback(eventName, callback)
    local invokingResource = GetInvokingResource()
    local invoker = (invokingResource and invokingResource ~= "Unknown") and invokingResource or "es_extended"

    Callbacks:Register(eventName, invoker, callback)
end

function ESX.DoesServerCallbackExist(eventName)
    return Callbacks.storage[eventName] ~= nil
end

RegisterNetEvent("esx:clientCallback", function(requestId, invoker, ...)
    Callbacks:RecieveClient(requestId, invoker, ...)
end)

RegisterNetEvent("esx:triggerServerCallback", function(eventName, requestId, invoker, ...)
    local source = source
    Callbacks:ServerRecieve(source, eventName, requestId, invoker, ...)
end)

local function updateHealthAndArmorInMetadata(xPlayer)
  local ped = GetPlayerPed(xPlayer.source)
  xPlayer.setMeta("health", GetEntityHealth(ped))
  xPlayer.setMeta("armor", GetPedArmour(ped))
end

function Core.SavePlayer(xPlayer, cb)
  if not xPlayer then return end
  local name = xPlayer.getName()
  updateHealthAndArmorInMetadata(xPlayer)
  local parameters <const> = {
      json.encode(xPlayer.getAccounts(true)),
      xPlayer.job.name,
      xPlayer.job.grade,
      xPlayer.group,
      json.encode(xPlayer.getCoords()),
      json.encode(xPlayer.getInventory(true)),
      json.encode(xPlayer.getLoadout(true)),
      json.encode(xPlayer.getMeta()),
      xPlayer.identifier,
  }

  MySQL.prepare(
      "UPDATE `users` SET `accounts` = ?, `job` = ?, `job_grade` = ?, `group` = ?, `position` = ?, `inventory` = ?, `loadout` = ?, `metadata` = ? WHERE `identifier` = ?",
      parameters,
      function(affectedRows)
          if affectedRows == 1 then
              print(('[^2INFO^7] Saved player ^5"%s^7"'):format(name))
              TriggerEvent("esx:playerSaved", xPlayer.playerId, xPlayer)
          end
          if cb then
              cb()
          end
      end
  )
end

function Core.SavePlayers(cb)
  local xPlayers <const> = ESX.Players
  if not next(xPlayers) then
      return
  end

  local startTime <const> = os.time()
  local parameters = {}

  for _, xPlayer in pairs(ESX.Players) do
      updateHealthAndArmorInMetadata(xPlayer)
      parameters[#parameters + 1] = {
          json.encode(xPlayer.getAccounts(true)),
          xPlayer.job.name,
          xPlayer.job.grade,
          xPlayer.group,
          json.encode(xPlayer.getCoords()),
          json.encode(xPlayer.getInventory(true)),
          json.encode(xPlayer.getLoadout(true)),
          json.encode(xPlayer.getMeta()),
          xPlayer.identifier,
      }
  end

  MySQL.prepare(
      "UPDATE `users` SET `accounts` = ?, `job` = ?, `job_grade` = ?, `group` = ?, `position` = ?, `inventory` = ?, `loadout` = ?, `metadata` = ? WHERE `identifier` = ?",
      parameters,
      function(results)
          if not results then
              return
          end

          if type(cb) == "function" then
              return cb()
          end

          print(("[^2INFO^7] Saved ^5%s^7 %s over ^5%s^7 ms"):format(#parameters, #parameters > 1 and "players" or "player", ESX.Math.Round((os.time() - startTime) / 1000000, 2)))
      end
  )
end
  
function ESX.GetPlayers()
    local sources = {}
  
    for k, v in pairs(ESX.Players) do
        sources[#sources + 1] = k
    end
  
    return sources
end
  
function ESX.GetExtendedPlayers(key, val)
    local xPlayers = {}
    for k, v in pairs(ESX.Players) do
        if key then
            if (key == 'job' and v.job.name == val) or v[key] == val then
                xPlayers[#xPlayers + 1] = v
            end
        else
            xPlayers[#xPlayers + 1] = v
        end
    end
    return xPlayers
end

function ESX.GetNumPlayers(key, val)
    if not key then
        return #GetPlayers()
    end

    if type(val) == "table" then
        local numPlayers = {}
        if key == "job" then
            for _, v in ipairs(val) do
                numPlayers[v] = (Core.JobsPlayerCount[v] or 0)
            end
            return numPlayers
        end

        local filteredPlayers = ESX.GetExtendedPlayers(key, val)
        for i, v in pairs(filteredPlayers) do
            numPlayers[i] = (#v or 0)
        end
        return numPlayers
    end

    if key == "job" then
        return (Core.JobsPlayerCount[val] or 0)
    end

    return #ESX.GetExtendedPlayers(key, val)
end
  
function ESX.GetPlayerFromId(source)
    return ESX.Players[tonumber(source)]
end
  
function ESX.GetPlayerFromIdentifier(identifier)
    for k, v in pairs(ESX.Players) do
        if v.identifier == identifier then
            return v
        end
    end
end

function ESX.IsPlayerLoaded(source)
    return ESX.Players[source] ~= nil
end

function ESX.GetIdentifier(playerId)
  for k, v in ipairs(GetPlayerIdentifiers(playerId)) do
      if string.match(v, 'license:') then
          local identifier = string.gsub(v, 'license:', '')
          return identifier
      end
  end
end

function ESX.GetVehicleType(model, player, cb)
    if cb and not ESX.IsFunctionReference(cb) then
        error("Invalid callback function")
    end

    local promise = not cb and promise.new()
    local function resolve(result)
        if promise then
            promise:resolve(result)
        elseif cb then
            cb(result)
        end

        return result
    end

    model = type(model) == "string" and joaat(model) or model

    if Core.vehicleTypesByModel[model] then
        return resolve(Core.vehicleTypesByModel[model])
    end

    ESX.TriggerClientCallback(player, "esx:GetVehicleType", function(vehicleType)
        Core.vehicleTypesByModel[model] = vehicleType
        resolve(vehicleType)
    end, model)

    if promise then
        return Citizen.Await(promise)
    end
end

function ESX.RefreshJobs()
  local Jobs = {}
  local allJobs = Reborn.groups()

  for k, v in pairs(allJobs) do
    Jobs[k] = v
    Jobs[k].label = v._config and v._config.title or k
    Jobs[k].name = k
    Jobs[k].grades = { ['0'] = {grade = 0, label = v._config and v._config.title or k, salary = v._config and v._config.salary or 0, skin_male = {}, skin_female = {}} }
  end
  
  if Jobs then
    ESX.Jobs = Jobs
  end
  ESX.Jobs['unemployed'] = {label = 'Unemployed', name = "Unemployed", grades = {['0'] = {grade = 0, label = 'Unemployed', salary = 200, skin_male = {}, skin_female = {}}}}
end

function ESX.RegisterUsableItem(item, cb)
    Core.UsableItemsCallbacks[item] = cb
end

function ESX.UseItem(source, item, ...)
    if ESX.Items[item] then
        local itemCallback = Core.UsableItemsCallbacks[item]
    
        if itemCallback then
            local success, result = pcall(itemCallback, source, item, ...)
    
            if not success then
              return result and print(result) or
                    print(('[^3WARNING^7] An error occured when using item ^5"%s"^7! This was not caused by ESX.'):format(item))
            else
              return true
            end
        end
    --[[ else
        print(('[^3WARNING^7] Item ^5"%s"^7 was used but does not exist!'):format(item)) ]]
    end
end
  
function ESX.RegisterPlayerFunctionOverrides(index, overrides)
    Core.PlayerFunctionOverrides[index] = overrides
end
  
function ESX.SetPlayerFunctionOverride(index)
    if not index or not Core.PlayerFunctionOverrides[index] then
        return print('[^3WARNING^7] No valid index provided.')
    end
  
    Config.PlayerFunctionOverride = index
end
  
function ESX.GetItemLabel(item)
    if ESX.Items[item] then
        return ESX.Items[item].label
    else
        print('[^3WARNING^7] Attemting to get invalid Item -> ' .. item)
    end
end
  
function ESX.GetJobs()
    return ESX.Jobs
end

function ESX.GetItems()
    return ESX.Items
end
  
function ESX.GetUsableItems()
    local Usables = {}
    for k in pairs(Core.UsableItemsCallbacks) do
        Usables[k] = true
    end
    return Usables
end
  
function ESX.CreatePickup(type, name, count, label, playerId, components, tintIndex)
    local pickupId = (Core.PickupId == 65635 and 0 or Core.PickupId + 1)
    local xPlayer = ESX.Players[playerId]
    local coords = xPlayer.getCoords()
  
    Core.Pickups[pickupId] = {type = type, name = name, count = count, label = label, coords = coords}
  
    if type == 'item_weapon' then
        Core.Pickups[pickupId].components = components
        Core.Pickups[pickupId].tintIndex = tintIndex
    end
  
    TriggerClientEvent('esx:createPickup', -1, pickupId, label, coords, type, name, components, tintIndex)
    Core.PickupId = pickupId
end
  
function ESX.DoesJobExist(job, grade)
    grade = tostring(grade)
    if job and grade then
        if ESX.Jobs[job] and ESX.Jobs[job].grades[grade] then
            return true
        end
    end
  
    return false
end
  
function Core.IsPlayerAdmin(playerId)
    if (IsPlayerAceAllowed(playerId, 'command') or GetConvar('sv_lan', '') == 'true') and true or false then
        return true
    end
  
    local xPlayer = ESX.Players[playerId]
  
    if xPlayer then
        if xPlayer.group == 'admin' then
            return true
        end
    end
    return false
end

------------------------------------------------------------------------------------------------------------------------

local newPlayer = 'INSERT INTO `users` SET `accounts` = ?, `identifier` = ?, `group` = ?, `firstname` = ?, `lastname` = ?, `dateofbirth` = ?, `sex` = ?, `height` = ?'
local loadPlayer = "SELECT `accounts`, `job`, `job_grade`, `group`, `position`, `inventory`, `skin`, `loadout`, `metadata` FROM `users` WHERE identifier = ?"

AddEventHandler("esx:onPlayerJoined", function(src, data)
  while not next(ESX.Jobs) do
      Wait(50)
  end

  if not ESX.Players[src] then
      local identifier = ESX.GetIdentifier(src)
      if data then
          createESXPlayer(identifier, src, data)
      else
          loadESXPlayer(identifier, src, false)
      end
  end
end)

function onPlayerJoined(playerId)
  local identifier = ESX.GetIdentifier(playerId)
  if identifier then
      if ESX.GetPlayerFromIdentifier(identifier) then
          DropPlayer(
              playerId,
              ("there was an error loading your character!\nError code: identifier-active-ingame\n\nThis error is caused by a player on this server who has the same identifier as you have. Make sure you are not playing on the same Rockstar account.\n\nYour Rockstar identifier: %s"):format(
                  identifier
              )
          )
      else
          local result = MySQL.scalar.await("SELECT 1 FROM users WHERE identifier = ?", { identifier })
          if result then
              loadESXPlayer(identifier, playerId, false)
          else
              createESXPlayer(identifier, playerId)
          end
      end
  end
end

function createESXPlayer(identifier, playerId, data)
  local accounts = {}
  local initial = Reborn.segurity_code()
  Config.StartingAccountMoney = { bank = initial['start_bank'] }
  for account, money in pairs(Config.StartingAccountMoney) do
      accounts[account] = money
  end

  local defaultGroup = "user"
  if Core.IsPlayerAdmin(playerId) then
      print(("[^2INFO^0] Player ^5%s^0 Has been granted admin permissions via ^5Ace Perms^7."):format(playerId))
      defaultGroup = "admin"
  end

  local parameters = { json.encode(accounts), identifier, defaultGroup, data.firstname, data.lastname, data.dateofbirth, data.sex, data.height }
  local frameworkTables = Reborn.frameworkTables()
  if frameworkTables['users'] then
    MySQL.prepare(newPlayer, parameters, function()
        loadESXPlayer(identifier, playerId, true)
    end)
  end
end

--[[ if not Config.Multichar then
  AddEventHandler('playerConnecting', function(name, setCallback, deferrals)
    deferrals.defer()
    local playerId = source
    local identifier = ESX.GetIdentifier(playerId)

    if identifier then
      if ESX.GetPlayerFromIdentifier(identifier) then
        deferrals.done(
          ('There was an error loading your character!\nError code: identifier-active\n\nThis error is caused by a player on this server who has the same identifier as you have. Make sure you are not playing on the same account.\n\nYour identifier: %s'):format(
            identifier))
      else
        deferrals.done()
      end
    else
      deferrals.done(
        'There was an error loading your character!\nError code: identifier-missing\n\nThe cause of this error is not known, your identifier could not be found. Please come back later or report this problem to the server administration team.')
    end
  end)
end ]]

function loadESXPlayer(identifier, playerId, isNew)
  local userData = {
    accounts = {},
    inventory = {},
    loadout = {},
    weight = 0,
    identifier = identifier,
    firstName = "John",
    lastName = "Doe",
    dateofbirth = "01/01/2000",
    height = 120,
    dead = false,
    job = {}
  }
  local user_id = nil
  while not user_id do
    user_id = vRP.getUserId(playerId)
    Wait(100)
  end
  local result = vRP.query("vRP/get_vrp_users", { id = user_id })
  local result2 = {}
  local frameworkTables = Reborn.frameworkTables()
  if frameworkTables['users'] then
    result2 = MySQL.prepare.await(loadPlayer, { identifier })
  end
  local myJob = nil
  local allJobs = Reborn.groups()
  local user_groups = vRP.getUserGroups(user_id)

  for k,v in pairs(user_groups) do
    local kgroup = allJobs[k]
    if kgroup then
        if kgroup._config and kgroup._config.gtype and kgroup._config.gtype == "job" then
          myJob = k
          break
        end
    end
  end
  local job, grade, jobObject, gradeObject = myJob, '0'
  
  -- Accounts
  local foundAccounts, foundItems = {}, {}
  foundAccounts['bank'] = vRP.getBank(user_id)
  foundAccounts['money'] = vRP.getInventoryItemAmount(user_id, "dollars")
  foundAccounts['cash'] = vRP.getInventoryItemAmount(user_id, "dollars")
  foundAccounts['black_money'] = vRP.getInventoryItemAmount(user_id, "dollars2")

  for account, data in pairs(Config.Accounts) do
    if data.round == nil then
      data.round = true
    end
    local index = #userData.accounts + 1
    userData.accounts[index] = {
      name = account, 
      money = foundAccounts[account] or 0,
      label = data.label, 
      round = data.round,
      index = index
    }
  end

  -- Job
  if ESX.DoesJobExist(job, grade) then
    jobObject, gradeObject = ESX.Jobs[job], ESX.Jobs[job].grades[grade]
  else
    --print(('[^3WARNING^7] Ignoring invalid job for %s [job: %s, grade: %s]'):format(identifier, job, grade))
    job, grade = 'unemployed', '0'
    jobObject, gradeObject = ESX.Jobs[job], ESX.Jobs[job] and ESX.Jobs[job].grades and ESX.Jobs[job].grades[grade]
  end

  userData.job.id = jobObject.id
  userData.job.name = jobObject.name
  userData.job.label = jobObject.label

  userData.job.grade = tonumber(grade)
  userData.job.grade_name = gradeObject.name
  userData.job.grade_label = gradeObject.label
  userData.job.grade_salary = gradeObject.salary

  userData.job.skin_male = {}
  userData.job.skin_female = {}

  if gradeObject.skin_male then
    userData.job.skin_male = type(gradeObject.skin_male) == "string" and json.decode(gradeObject.skin_male) or gradeObject.skin_male
  end
  if gradeObject.skin_female then
    userData.job.skin_female = type(gradeObject.skin_female) == "string" and json.decode(gradeObject.skin_female) or gradeObject.skin_female
  end

  -- Inventory
  result.inventory = vRP.getInventory(user_id)
  if result.inventory then
    local inventory = type(result.inventory) == "string" and json.decode(result.inventory) or result.inventory

    for k, v in pairs(inventory) do
      local item = ESX.Items[v.item] or ESX.Items[k]
      if item then
        foundItems[v.item] = v.amount or v.count
        table.insert(userData.inventory, {
            name = v.item or v.name,
            count = v.amount or v.count,
            label = item.label,
            weight = item.weight,
            usable = Core.UsableItemsCallbacks[v.item] ~= nil,
            rare = item.rare,
            canRemove = item.canRemove
          })
      end
    end
  end

  -- Group
  result.group = vRP.getUserGroupByType(user_id,"job")
  if result.group then
    if result.group == "superadmin" then
      userData.group = "admin"
      print("[^3WARNING^7] Superadmin detected, setting group to admin")
    else
      userData.group = result.group
    end
  else
    userData.group = 'user'
  end

  -- Loadout
  if result2.loadout and result2.loadout ~= '' then
    local loadout = json.decode(result2.loadout)

    for name, weapon in pairs(loadout) do
      local label = ESX.GetWeaponLabel(name)

      if label then
        if not weapon.components then
          weapon.components = {}
        end
        if not weapon.tintIndex then
          weapon.tintIndex = 0
        end

        table.insert(userData.loadout,
          {name = name, ammo = weapon.ammo, label = label, components = weapon.components, tintIndex = weapon.tintIndex})
      end
    end
  end

  local data = vRP.getUserDataTable(user_id)
  if data == nil then
    local playerData = vRP.getUData(user_id,"Datatable")
    data = json.decode(playerData) or {}
  end

  -- Position
  result.position = data.position
  if result.position and result.position ~= '' then
    userData.coords = result.position
  else
    print('[^3WARNING^7] Column ^5"position"^0 in ^5"users"^0 table is missing required default value. Using backup coords, fix your database.')
    userData.coords = {x = -269.4, y = -955.3, z = 31.2, heading = 205.8}
  end
  -- Skin
  if data.skin == -1667301416 then
    userData.sex = 'f'
  else
    userData.sex = 'm'
  end
  if result.skin and result.skin ~= '' then
    userData.skin = json.decode(result.skin)
  else
    if userData.sex == 'f' then
      userData.skin = {sex = 1}
    else
      userData.skin = {sex = 0}
    end
  end
  -- Metadata
  userData.metadata = (result2.metadata and result2.metadata ~= "") and json.decode(result2.metadata) or {}

  -- Identity
  if result.name and result.name ~= '' then
    userData.firstname = result.name
    userData.lastname = result.name2
    userData.playerName = userData.firstname .. ' ' .. userData.lastname
    if result2.dateofbirth then
      userData.dateofbirth = result.dateofbirth
    end
    if result2.sex then
      userData.sex = result.sex
    end
    if result2.height then
      userData.height = result.height
    end
  end

  local xPlayer = Reborn.CreateExtendedPlayer(playerId, identifier, userData.group, userData.accounts, userData.inventory, userData.weight, userData.job,
    userData.loadout, userData.playerName, userData.coords, userData.metadata, user_id)

  ESX.Players[playerId] = xPlayer

  if result2.firstname then
    xPlayer.set('firstName', result2.firstname)
    xPlayer.set('lastName', result2.lastname)
    if result2.dateofbirth then
      xPlayer.set('dateofbirth', result2.dateofbirth)
    end
    if result2.sex then
      xPlayer.set('sex', result2.sex)
    end
    if result2.height then
      xPlayer.set('height', result2.height)
    end
  end

  TriggerEvent('esx:playerLoaded', playerId, xPlayer, isNew)

  xPlayer.triggerEvent('esx:playerLoaded',
    {
      accounts = xPlayer.getAccounts(), 
      coords = xPlayer.getCoords(), 
      identifier = xPlayer.getIdentifier(), 
      inventory = xPlayer.getInventory(),
      job = xPlayer.getJob(), 
      loadout = xPlayer.getLoadout(), 
      maxWeight = xPlayer.getMaxWeight(), 
      money = xPlayer.getMoney(),
      sex = xPlayer.get("sex") or "m",
      dead = false
    }, isNew,
    userData.skin)

  xPlayer.triggerEvent('esx:createMissingPickups', Core.Pickups)

  xPlayer.triggerEvent('esx:registerSuggestions', Core.RegisteredCommands)
  print(('[^2INFO ESX^0] Player ^5"%s" ^0has connected to the server. Identifier: ^5%s^7'):format(xPlayer.getName(), identifier))
end

AddEventHandler('playerDropped', function(reason)
  local playerId = source
  local xPlayer = ESX.GetPlayerFromId(playerId)

  if xPlayer then
    TriggerEvent('esx:playerDropped', playerId, reason)

    Core.SavePlayer(xPlayer, function()
      ESX.Players[playerId] = nil
    end)
  end
end)

AddEventHandler('esx:playerLogout', function(playerId, cb)
  local xPlayer = ESX.GetPlayerFromId(playerId)
  if xPlayer then
    TriggerEvent('esx:playerDropped', playerId)
  end
  TriggerClientEvent("esx:onPlayerLogout", playerId)
end)

RegisterNetEvent('esx:updateCoords')
AddEventHandler('esx:updateCoords', function()
  local source = source
  local xPlayer = ESX.GetPlayerFromId(source)

  if xPlayer then
    xPlayer.updateCoords()
  end
end)


RegisterNetEvent('esx:updateWeaponAmmo')
AddEventHandler('esx:updateWeaponAmmo', function(weaponName, ammoCount)
  local xPlayer = ESX.GetPlayerFromId(source)

  if xPlayer then
    xPlayer.updateWeaponAmmo(weaponName, ammoCount)
  end
end)

RegisterNetEvent('esx:giveInventoryItem')
AddEventHandler('esx:giveInventoryItem', function(target, type, itemName, itemCount)
  local playerId = source
  local sourceXPlayer = ESX.GetPlayerFromId(playerId)
  local targetXPlayer = ESX.GetPlayerFromId(target)
  local distance = #(GetEntityCoords(GetPlayerPed(playerId)) - GetEntityCoords(GetPlayerPed(target)))
  if not sourceXPlayer or not targetXPlayer or distance > Config.DistanceGive then
    print("[WARNING] Player Detected Cheating: " .. GetPlayerName(playerId))
    return
  end

  if type == 'item_standard' then
    local sourceItem = sourceXPlayer.getInventoryItem(itemName)

    if itemCount > 0 and sourceItem.count >= itemCount then
      if targetXPlayer.canCarryItem(itemName, itemCount) then
        sourceXPlayer.removeInventoryItem(itemName, itemCount)
        targetXPlayer.addInventoryItem(itemName, itemCount)

        sourceXPlayer.showNotification(_U('gave_item', itemCount, sourceItem.label, targetXPlayer.name))
        targetXPlayer.showNotification(_U('received_item', itemCount, sourceItem.label, sourceXPlayer.name))
      else
        sourceXPlayer.showNotification(_U('ex_inv_lim', targetXPlayer.name))
      end
    else
      sourceXPlayer.showNotification(_U('imp_invalid_quantity'))
    end
  elseif type == 'item_account' then
    if itemCount > 0 and sourceXPlayer.getAccount(itemName).money >= itemCount then
      sourceXPlayer.removeAccountMoney(itemName, itemCount, "Gave to " .. targetXPlayer.name)
      targetXPlayer.addAccountMoney(itemName, itemCount, "Received from " .. sourceXPlayer.name)

      sourceXPlayer.showNotification(_U('gave_account_money', ESX.Math.GroupDigits(itemCount), Config.Accounts[itemName].label, targetXPlayer.name))
      targetXPlayer.showNotification(_U('received_account_money', ESX.Math.GroupDigits(itemCount), Config.Accounts[itemName].label,
        sourceXPlayer.name))
    else
      sourceXPlayer.showNotification(_U('imp_invalid_amount'))
    end
  elseif type == 'item_weapon' then
    if sourceXPlayer.hasWeapon(itemName) then
      local weaponLabel = ESX.GetWeaponLabel(itemName)
      if not targetXPlayer.hasWeapon(itemName) then
        local _, weapon = sourceXPlayer.getWeapon(itemName)
        local _, weaponObject = ESX.GetWeapon(itemName)
        itemCount = weapon.ammo
        local weaponComponents = ESX.Table.Clone(weapon.components)
        local weaponTint = weapon.tintIndex
        if weaponTint then
          targetXPlayer.setWeaponTint(itemName, weaponTint)
        end
        if weaponComponents then
          for k, v in pairs(weaponComponents) do
            targetXPlayer.addWeaponComponent(itemName, v)
          end
        end
        sourceXPlayer.removeWeapon(itemName)
        targetXPlayer.addWeapon(itemName, itemCount)

        if weaponObject.ammo and itemCount > 0 then
          local ammoLabel = weaponObject.ammo.label
          sourceXPlayer.showNotification(_U('gave_weapon_withammo', weaponLabel, itemCount, ammoLabel, targetXPlayer.name))
          targetXPlayer.showNotification(_U('received_weapon_withammo', weaponLabel, itemCount, ammoLabel, sourceXPlayer.name))
        else
          sourceXPlayer.showNotification(_U('gave_weapon', weaponLabel, targetXPlayer.name))
          targetXPlayer.showNotification(_U('received_weapon', weaponLabel, sourceXPlayer.name))
        end
      else
        sourceXPlayer.showNotification(_U('gave_weapon_hasalready', targetXPlayer.name, weaponLabel))
        targetXPlayer.showNotification(_U('received_weapon_hasalready', sourceXPlayer.name, weaponLabel))
      end
    end
  elseif type == 'item_ammo' then
    if sourceXPlayer.hasWeapon(itemName) then
      local weaponNum, weapon = sourceXPlayer.getWeapon(itemName)

      if targetXPlayer.hasWeapon(itemName) then
        local _, weaponObject = ESX.GetWeapon(itemName)

        if weaponObject.ammo then
          local ammoLabel = weaponObject.ammo.label

          if weapon.ammo >= itemCount then
            sourceXPlayer.removeWeaponAmmo(itemName, itemCount)
            targetXPlayer.addWeaponAmmo(itemName, itemCount)

            sourceXPlayer.showNotification(_U('gave_weapon_ammo', itemCount, ammoLabel, weapon.label, targetXPlayer.name))
            targetXPlayer.showNotification(_U('received_weapon_ammo', itemCount, ammoLabel, weapon.label, sourceXPlayer.name))
          end
        end
      else
        sourceXPlayer.showNotification(_U('gave_weapon_noweapon', targetXPlayer.name))
        targetXPlayer.showNotification(_U('received_weapon_noweapon', sourceXPlayer.name, weapon.label))
      end
    end
  end
end)

RegisterNetEvent('esx:removeInventoryItem')
AddEventHandler('esx:removeInventoryItem', function(type, itemName, itemCount)
  local playerId = source
  local xPlayer = ESX.GetPlayerFromId(playerId)

  if type == 'item_standard' then
    if itemCount == nil or itemCount < 1 then
      xPlayer.showNotification(_U('imp_invalid_quantity'))
    else
      local xItem = xPlayer.getInventoryItem(itemName)

      if (itemCount > xItem.count or xItem.count < 1) then
        xPlayer.showNotification(_U('imp_invalid_quantity'))
      else
        xPlayer.removeInventoryItem(itemName, itemCount)
        local pickupLabel = ('%s [%s]'):format(xItem.label, itemCount)
        ESX.CreatePickup('item_standard', itemName, itemCount, pickupLabel, playerId)
        xPlayer.showNotification(_U('threw_standard', itemCount, xItem.label))
      end
    end
  elseif type == 'item_account' then
    if itemCount == nil or itemCount < 1 then
      xPlayer.showNotification(_U('imp_invalid_amount'))
    else
      local account = xPlayer.getAccount(itemName)

      if (itemCount > account.money or account.money < 1) then
        xPlayer.showNotification(_U('imp_invalid_amount'))
      else
        xPlayer.removeAccountMoney(itemName, itemCount, "Threw away")
        local pickupLabel = ('%s [%s]'):format(account.label, _U('locale_currency', ESX.Math.GroupDigits(itemCount)))
        ESX.CreatePickup('item_account', itemName, itemCount, pickupLabel, playerId)
        xPlayer.showNotification(_U('threw_account', ESX.Math.GroupDigits(itemCount), string.lower(account.label)))
      end
    end
  elseif type == 'item_weapon' then
    itemName = string.upper(itemName)

    if xPlayer.hasWeapon(itemName) then
      local _, weapon = xPlayer.getWeapon(itemName)
      local _, weaponObject = ESX.GetWeapon(itemName)
      local components, pickupLabel = ESX.Table.Clone(weapon.components)
      xPlayer.removeWeapon(itemName)

      if weaponObject.ammo and weapon.ammo > 0 then
        local ammoLabel = weaponObject.ammo.label
        pickupLabel = ('%s [%s %s]'):format(weapon.label, weapon.ammo, ammoLabel)
        xPlayer.showNotification(_U('threw_weapon_ammo', weapon.label, weapon.ammo, ammoLabel))
      else
        pickupLabel = ('%s'):format(weapon.label)
        xPlayer.showNotification(_U('threw_weapon', weapon.label))
      end

      ESX.CreatePickup('item_weapon', itemName, weapon.ammo, pickupLabel, playerId, components, weapon.tintIndex)
    end
  end
end)

RegisterNetEvent('esx:useItem')
AddEventHandler('esx:useItem', function(itemName)
  local source = source
  local xPlayer = ESX.GetPlayerFromId(source)
  local count = xPlayer.getInventoryItem(itemName).count

  if count > 0 then
    ESX.UseItem(source, itemName)
  else
    xPlayer.showNotification(_U('act_imp'))
  end
end)

RegisterNetEvent('esx:onPickup')
AddEventHandler('esx:onPickup', function(pickupId)
  local pickup, xPlayer, success = Core.Pickups[pickupId], ESX.GetPlayerFromId(source)

  if pickup then
    if pickup.type == 'item_standard' then
      if xPlayer.canCarryItem(pickup.name, pickup.count) then
        xPlayer.addInventoryItem(pickup.name, pickup.count)
        success = true
      else
        xPlayer.showNotification(_U('threw_cannot_pickup'))
      end
    elseif pickup.type == 'item_account' then
      success = true
      xPlayer.addAccountMoney(pickup.name, pickup.count, "Picked up")
    elseif pickup.type == 'item_weapon' then
      if xPlayer.hasWeapon(pickup.name) then
        xPlayer.showNotification(_U('threw_weapon_already'))
      else
        success = true
        xPlayer.addWeapon(pickup.name, pickup.count)
        xPlayer.setWeaponTint(pickup.name, pickup.tintIndex)

        for k, v in ipairs(pickup.components) do
          xPlayer.addWeaponComponent(pickup.name, v)
        end
      end
    end

    if success then
      Core.Pickups[pickupId] = nil
      TriggerClientEvent('esx:removePickup', -1, pickupId)
    end
  end
end)

ESX.RegisterServerCallback("esx:getPlayerData", function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)

    if not xPlayer then
        return
    end

    cb({
        identifier = xPlayer.identifier,
        accounts = xPlayer.getAccounts(),
        inventory = xPlayer.getInventory(),
        job = xPlayer.getJob(),
        loadout = xPlayer.getLoadout(),
        money = xPlayer.getMoney(),
        position = xPlayer.getCoords(true),
        metadata = xPlayer.getMeta(),
    })
end)

ESX.RegisterServerCallback('esx:isUserAdmin', function(source, cb)
  cb(Core.IsPlayerAdmin(source))
end)

ESX.RegisterServerCallback("esx:getGameBuild", function(_, cb)
    cb(tonumber(GetConvar("sv_enforceGameBuild", "1604")))
end)

ESX.RegisterServerCallback("esx:getOtherPlayerData", function(_, cb, target)
    local xPlayer = ESX.GetPlayerFromId(target)

    if not xPlayer then
        return
    end

    cb({
        identifier = xPlayer.identifier,
        accounts = xPlayer.getAccounts(),
        inventory = xPlayer.getInventory(),
        job = xPlayer.getJob(),
        loadout = xPlayer.getLoadout(),
        money = xPlayer.getMoney(),
        position = xPlayer.getCoords(true),
        metadata = xPlayer.getMeta(),
    })
end)

ESX.RegisterServerCallback('esx:getPlayerNames', function(source, cb, players)
  players[source] = nil

  for playerId, v in pairs(players) do
    local xPlayer = ESX.GetPlayerFromId(playerId)

    if xPlayer then
      players[playerId] = xPlayer.getName()
    else
      players[playerId] = nil
    end
  end

  cb(players)
end)

ESX.RegisterServerCallback("esx:spawnVehicle", function(source, cb, vehData)
    local ped = GetPlayerPed(source)
    ESX.OneSync.SpawnVehicle(vehData.model or `ADDER`, vehData.coords or GetEntityCoords(ped), vehData.coords.w or 0.0, vehData.props or {}, function(id)
        if vehData.warp then
            local vehicle = NetworkGetEntityFromNetworkId(id)
            local timeout = 0
            while GetVehiclePedIsIn(ped, false) ~= vehicle and timeout <= 15 do
                Wait(0)
                TaskWarpPedIntoVehicle(ped, vehicle, -1)
                timeout += 1
            end
        end
        cb(id)
    end)
end)

AddEventHandler('txAdmin:events:scheduledRestart', function(eventData)
  if eventData.secondsRemaining == 60 then
    CreateThread(function()
      Wait(50000)
      Core.SavePlayers()
    end)
  end
end)

AddEventHandler('txAdmin:events:serverShuttingDown', function()
  Core.SavePlayers()
end)

function _U(str, ...) -- Translate string first char uppercase
	return tostring(str:gsub("^%l", string.upper))
end

ESX.OneSync = {}

---@class vector3
---@field x number
---@field y number
---@field z number

local function getNearbyPlayers(source, closest, distance, ignore)
	local result = {}
	local count = 0
	if not distance then distance = 100 end
	if type(source) == 'number' then
		source = GetPlayerPed(source)

		if not source then
			error("Received invalid first argument (source); should be playerId or vector3 coordinates")
		end

		source = GetEntityCoords(GetPlayerPed(source))
	end

	for _, xPlayer in pairs(ESX.Players) do
		if not ignore or not ignore[xPlayer.source] then
			local entity = GetPlayerPed(xPlayer.source)
			local coords = GetEntityCoords(entity)

			if not closest then
				local dist = #(source - coords)
				if dist <= distance then
					count = count + 1
					result[count] = {id = xPlayer.source, ped = NetworkGetNetworkIdFromEntity(entity), coords = coords, dist = dist}
				end
			else
				local dist = #(source - coords)
				if dist <= (result.dist or distance) then
					result = {id = xPlayer.source, ped = NetworkGetNetworkIdFromEntity(entity), coords = coords, dist = dist}
				end
			end
		end
	end

	return result
end

---@param source vector3|number playerId or vector3 coordinates
---@param maxDistance number
---@param ignore table playerIds to ignore, where the key is playerId and value is true
function ESX.OneSync.GetPlayersInArea(source, maxDistance, ignore)
	return getNearbyPlayers(source, false, maxDistance, ignore)
end

---@param source vector3|number playerId or vector3 coordinates
---@param maxDistance number
---@param ignore table playerIds to ignore, where the key is playerId and value is true
function ESX.OneSync.GetClosestPlayer(source, maxDistance, ignore)
	return getNearbyPlayers(source, true, maxDistance, ignore)
end

---@param model number|string
---@param coords vector3|table
---@param heading number
---@param cb function
function ESX.OneSync.SpawnVehicle(model, coords, heading, autoMobile, cb)
		if type(model) == 'string' then model = joaat(model) end
		local vector = type(coords) == "vector3" and coords or vec(coords.x, coords.y, coords.z)
		if type(autoMobile) ~= 'boolean' then
			return
		end
		CreateThread(function()
		local Entity = autoMobile and Citizen.InvokeNative(`CREATE_AUTOMOBILE`, model, coords.x, coords.y, coords.z, heading) or CreateVehicle(model, coords, heading, true, true)
		while not DoesEntityExist(Entity) do
			Wait(0)
		end
		local netID = NetworkGetNetworkIdFromEntity(Entity)
		cb(netID)
	end)
end

---@param model number|string
---@param coords vector3|table
---@param heading number
---@param cb function
function ESX.OneSync.SpawnObject(model, coords, heading, cb)
	if type(model) == 'string' then model = joaat(model) end
	local vector = type(coords) == "vector3" and coords or vec(coords.x, coords.y, coords.z)
	CreateThread(function()
		local entity = CreateObject(model, coords, true, true)
		while not DoesEntityExist(entity) do Wait(50) end
		SetEntityHeading(entity, heading)
		cb(NetworkGetNetworkIdFromEntity(entity))
	end)
end

---@param model number|string
---@param coords vector3|table
---@param heading number
---@param cb function
function ESX.OneSync.SpawnPed(model, coords, heading, cb)
	if type(model) == 'string' then model = joaat(model) end
	CreateThread(function()
		local entity = CreatePed(0, model, coords.x, coords.y, coords.z, heading, true, true)
		while not DoesEntityExist(entity) do Wait(50) end
		return entity
	end)
end

---@param model number|string
---@param vehicle number entityId
---@param seat number
---@param cb function
function ESX.OneSync.SpawnPedInVehicle(model, vehicle, seat, cb)
	if type(model) == 'string' then model = joaat(model) end
	CreateThread(function()
		local entity = CreatePedInsideVehicle(vehicle, 1, model, seat, true, true)
		while not DoesEntityExist(entity) do Wait(50) end
		return entity
	end)
end

local function getNearbyEntities(entities, coords, modelFilter, maxDistance, isPed)
	local nearbyEntities = {}
	coords = type(coords) == 'number' and GetEntityCoords(GetPlayerPed(coords)) or vector3(coords.x, coords.y, coords.z)
	for _, entity in pairs(entities) do
		if not isPed or (isPed and not IsPedAPlayer(entity)) then
			if not modelFilter or modelFilter[GetEntityModel(entity)] then
				local entityCoords = GetEntityCoords(entity)
				if not maxDistance or #(coords - entityCoords) <= maxDistance then
					nearbyEntities[#nearbyEntities+1] = NetworkGetNetworkIdFromEntity(entity)
				end
			end
		end
	end

	return nearbyEntities
end

---@param coords vector3
---@param maxDistance number
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return table
function ESX.OneSync.GetPedsInArea(coords, maxDistance, modelFilter)
	return getNearbyEntities(GetAllPeds(), coords, modelFilter, maxDistance, true)
end

---@param coords vector3
---@param maxDistance number
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return table
function ESX.OneSync.GetObjectsInArea(coords, maxDistance, modelFilter)
	return getNearbyEntities(GetAllObjects(), coords, modelFilter, maxDistance)
end

---@param coords vector3
---@param maxDistance number
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return table
function ESX.OneSync.GetVehiclesInArea(coords, maxDistance, modelFilter, cb)
	return getNearbyEntities(GetAllVehicles(), coords, modelFilter, maxDistance)
end

local function getClosestEntity(entities, coords, modelFilter, isPed)
	local distance, closestEntity, closestCoords = maxDistance or 100, nil, nil
	coords = type(coords) == 'number' and GetEntityCoords(GetPlayerPed(coords)) or vector3(coords.x, coords.y, coords.z)

	for _, entity in pairs(entities) do
		if not isPed or (isPed and not IsPedAPlayer(entity)) then
			if not modelFilter or modelFilter[GetEntityModel(entity)] then
				local entityCoords = GetEntityCoords(entity)
				local dist = #(coords - entityCoords)
				if dist < distance then
					closestEntity, distance, closestCoords = entity, dist, entityCoords
				end
			end
		end
	end
	return NetworkGetNetworkIdFromEntity(closestEntity), distance, closestCoords
end

---@param coords vector3
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return number entityId, number distance, vector3 coords
function ESX.OneSync.GetClosestPed(coords, modelFilter)
	return getClosestEntity(GetAllPeds(), coords, modelFilter, true)
end

---@param coords vector3
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return number entityId, number distance, vector3 coords
function ESX.OneSync.GetClosestObject(coords, modelFilter)
	return getClosestEntity(GetAllObjects(), coords, modelFilter)
end

---@param coords vector3
---@param modelFilter table models to ignore, where the key is the model hash and the value is true
---@return number entityId, number distance, vector3 coords
function ESX.OneSync.GetClosestVehicle(coords, modelFilter)
	return getClosestEntity(GetAllVehicles(), coords, modelFilter)
end

ESX.RegisterServerCallback("esx:Onesync:SpawnVehicle", function(source, cb, model, coords, heading, autoMobile)
	ESX.OneSync.SpawnVehicle(model, coords, heading, autoMobile, cb)
end)

ESX.RegisterServerCallback("esx:Onesync:SpawnObject", function(source, cb, model, coords, heading)
	ESX.OneSync.SpawnObject(model, coords, heading, cb)
end)

-- for k,v in pairs(ESX.OneSync) do
-- 	ESX.RegisterServerCallback("esx:Onesync:"..k, function(source, cb, ...)
-- 		cb(v(...))
-- 	end)
-- end

exportHandler("es_extended","addVehicle", function(playerId, model, vehPlate)
  local xPlayer = ESX.GetPlayerFromId(playerId)
  local plate = vehPlate or vRP.generatePlateNumber()
  MySQL.insert('INSERT INTO owned_vehicles (owner, plate, vehicle) VALUES (?, ?, ?)', { xPlayer.identifier, plate, json.encode({model = joaat(model), plate = plate}) })
end)
-- exports['es_extended']:addVehicle(source, vehicle, vehPlate)


if Config.OxInventory then
    AddEventHandler("ox_inventory:loadInventory", function(module)
        Inventory = module
    end)
end

Core.PlayerFunctionOverrides.OxInventory = {
    getInventory = function(self)
        return function(minimal)
            if minimal then
                local minimalInventory = {}

                for k, v in pairs(self.inventory) do
                    if v.count and v.count > 0 then
                        local metadata = v.metadata

                        if v.metadata and next(v.metadata) == nil then
                            metadata = nil
                        end

                        minimalInventory[#minimalInventory + 1] = {
                            name = v.name,
                            count = v.count,
                            slot = k,
                            metadata = metadata,
                        }
                    end
                end

                return minimalInventory
            end

            return self.inventory
        end
    end,

    getLoadout = function()
        return function()
            return {}
        end
    end,

    setAccountMoney = function(self)
        return function(accountName, money, reason)
            reason = reason or "unknown"
            if money >= 0 then
                local account = self.getAccount(accountName)

                if account then
                    money = account.round and ESX.Math.Round(money) or money
                    self.accounts[account.index].money = money

                    self.triggerEvent("esx:setAccountMoney", account)
                    TriggerEvent("esx:setAccountMoney", self.source, accountName, money, reason)
                    if Inventory.accounts[accountName] then
                        Inventory.SetItem(self.source, accountName, money)
                    end
                end
            end
        end
    end,

    addAccountMoney = function(self)
        return function(accountName, money, reason)
            reason = reason or "unknown"
            if money > 0 then
                local account = self.getAccount(accountName)

                if account then
                    money = account.round and ESX.Math.Round(money) or money
                    self.accounts[account.index].money = self.accounts[account.index].money + money
                    self.triggerEvent("esx:setAccountMoney", account)
                    TriggerEvent("esx:addAccountMoney", self.source, accountName, money, reason)
                    if Inventory.accounts[accountName] then
                        Inventory.AddItem(self.source, accountName, money)
                    end
                end
            end
        end
    end,

    removeAccountMoney = function(self)
        return function(accountName, money, reason)
            reason = reason or "unknown"
            if money > 0 then
                local account = self.getAccount(accountName)

                if account then
                    money = account.round and ESX.Math.Round(money) or money
                    self.accounts[account.index].money = self.accounts[account.index].money - money
                    self.triggerEvent("esx:setAccountMoney", account)
                    TriggerEvent("esx:removeAccountMoney", self.source, accountName, money, reason)
                    if Inventory.accounts[accountName] then
                        Inventory.RemoveItem(self.source, accountName, money)
                    end
                end
            end
        end
    end,

    getInventoryItem = function(self)
        return function(name, metadata)
            return Inventory.GetItem(self.source, name, metadata)
        end
    end,

    addInventoryItem = function(self)
        return function(name, count, metadata, slot)
            return Inventory.AddItem(self.source, name, count or 1, metadata, slot)
        end
    end,

    removeInventoryItem = function(self)
        return function(name, count, metadata, slot)
            return Inventory.RemoveItem(self.source, name, count or 1, metadata, slot)
        end
    end,

    setInventoryItem = function(self)
        return function(name, count, metadata)
            return Inventory.SetItem(self.source, name, count, metadata)
        end
    end,

    canCarryItem = function(self)
        return function(name, count, metadata)
            return Inventory.CanCarryItem(self.source, name, count, metadata)
        end
    end,

    canSwapItem = function(self)
        return function(firstItem, firstItemCount, testItem, testItemCount)
            return Inventory.CanSwapItem(self.source, firstItem, firstItemCount, testItem, testItemCount)
        end
    end,

    setMaxWeight = function(self)
        return function(newWeight)
            self.maxWeight = newWeight
            self.triggerEvent("esx:setMaxWeight", self.maxWeight)
            return Inventory.Set(self.source, "maxWeight", newWeight)
        end
    end,

    addWeapon = function()
        return function() end
    end,

    addWeaponComponent = function()
        return function() end
    end,

    addWeaponAmmo = function()
        return function() end
    end,

    updateWeaponAmmo = function()
        return function() end
    end,

    setWeaponTint = function()
        return function() end
    end,

    getWeaponTint = function()
        return function() end
    end,

    removeWeapon = function()
        return function() end
    end,

    removeWeaponComponent = function()
        return function() end
    end,

    removeWeaponAmmo = function()
        return function() end
    end,

    hasWeaponComponent = function()
        return function()
            return false
        end
    end,

    hasWeapon = function()
        return function()
            return false
        end
    end,

    hasItem = function(self)
        return function(name, metadata)
            return Inventory.GetItem(self.source, name, metadata)
        end
    end,

    getWeapon = function()
        return function() end
    end,

    syncInventory = function(self)
        return function(weight, maxWeight, items, money)
            self.weight, self.maxWeight = weight, maxWeight
            self.inventory = items

            if money then
                for accountName, amount in pairs(money) do
                    local account = self.getAccount(accountName)

                    if account and ESX.Math.Round(account.money) ~= amount then
                        account.money = amount
                        self.triggerEvent("esx:setAccountMoney", account)
                        TriggerEvent("esx:setAccountMoney", self.source, accountName, amount, "Sync account with item")
                    end
                end
            end
        end
    end,
}
