-- Provides Callbacks.Await(name, ...) -> first result, and Callbacks.Callback(name, handler, ...)
-- Keeps original behavior: server event "__svBanking:callback:" .. name, promise-based await, and handler execution

local _Callbacks = {}

function _Callbacks.Await(name, ...)
  local eventName = "__svBanking:callback:" .. name
  TriggerServerEvent(eventName, ...)
  local p = promise.new()
  local firstResult
  RegisterNetEvent(eventName, function(...)
    firstResult = (...)
    p:resolve(...)
  end)
  Citizen.Await(p)
  return firstResult
end

function _Callbacks.Callback(name, handler, ...)
  local eventName = "__svBanking:callback:" .. name
  TriggerServerEvent(eventName, ...)
  local p = promise.new()
  RegisterNetEvent(eventName, function(...)
    p:resolve(...)
    return handler(...)
  end)
  Citizen.Await(p)
end

Callbacks = _Callbacks
