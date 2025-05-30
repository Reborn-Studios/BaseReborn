-- https://github.com/overextended/ox_lib/blob/master/imports/callback/server.lua
-- Huge shoutout to overextended team.

local events = {}
local cbEvent = ('__fd_radio_cb_%s')

RegisterNetEvent(cbEvent:format(cache.resource), function(key, ...)
    local cb = events[key]
    return cb and cb(...)
end)

---@param _ any
---@param event string
---@param playerId number
---@param cb function|false
---@param ... any
---@return unknown?
local function triggerClientCallback(_, event, playerId, cb, ...)
    local key

    repeat
        key = ('%s:%s:%s'):format(event, math.random(0, 100000), playerId)
    until not events[key]

    TriggerClientEvent(cbEvent:format(event), playerId, cache.resource, key, ...)

    ---@type promise | false
    local promise = not cb and promise.new()

    events[key] = function(response)
        events[key] = nil

        if promise then
            return promise:resolve(response and { msgpack.unpack(response) } or {})
        end

        return cb and cb(response and msgpack.unpack(response))
    end

    if promise then
        return table.unpack(Citizen.Await(promise))
    end
end

---@overload fun(event: string, playerId: number, cb: function, ...)
callback = setmetatable({}, {
    __call = triggerClientCallback
})

---@param event string
---@param playerId number
--- Sends an event to a client and halts the current thread until a response is returned.
function callback.await(event, playerId, ...)
    return triggerClientCallback(nil, event, playerId, false, ...)
end

local function callbackResponse(success, result, ...)
    if not success then
        if result then
            return print(('^1SCRIPT ERROR: %s^0\n%s'):format(result,
                Citizen.InvokeNative(`FORMAT_STACK_TRACE` & 0xFFFFFFFF, nil, 0, Citizen.ResultAsString()) or ''))
        end

        return false
    end

    return msgpack.pack(result, ...)
end

local pcall = pcall

---@param name string
---@param cb function
--- Registers an event handler and callback function to respond to client requests.
function callback.register(name, cb)
    RegisterNetEvent(cbEvent:format(name), function(resource, key, ...)
        TriggerClientEvent(cbEvent:format(resource), source, key, callbackResponse(pcall(cb, source, ...)))
    end)
end
