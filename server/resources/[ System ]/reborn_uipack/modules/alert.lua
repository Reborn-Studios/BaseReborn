local activePromise = nil
local alertCounter = 0

function AlertDialog(alertData, timeout)
  if activePromise then
    return
  end
  
  alertCounter = alertCounter + 1
  local currentAlertId = alertCounter
  
  activePromise = promise.new()
  
  Utils.setNuiFocus(false)
  
  SendNUIMessage({
    action = "sendAlert",
    data = alertData
  })
  
  if timeout then
    SetTimeout(timeout, function()
      if currentAlertId == alertCounter then
        CloseAlertDialog("timeout")
      end
    end)
  end
  
  return Citizen.Await(activePromise)
end

function CloseAlertDialog(reason)
  if not activePromise then
    return
  end
  
  Utils.resetNuiFocus()
  
  SendNUIMessage({
    action = "closeAlertDialog"
  })
  
  local promiseToResolve = activePromise
  activePromise = nil
  
  if reason then
    promiseToResolve:reject(reason)
  else
    promiseToResolve:resolve()
  end
end

RegisterNUICallback("closeAlert", function(data, callback)
  callback(1)
  
  Utils.resetNuiFocus()
  
  local promiseToResolve = activePromise
  activePromise = nil
  
  promiseToResolve:resolve(data)
end)

RegisterNetEvent("ox_lib:alertDialog", AlertDialog)