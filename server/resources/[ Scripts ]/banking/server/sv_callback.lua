function registerServerCallback(name, handler)
  local eventName = "__svBanking:callback:" .. name
  RegisterNetEvent(eventName, function(...)
    local src = source
    local result = handler(src, ...)
    TriggerClientEvent(eventName, src, result)
  end)
end
RegisterCallback = registerServerCallback
