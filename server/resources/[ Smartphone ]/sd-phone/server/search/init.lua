---@type table Spotlight handlers (server.search.actions).
local actions = require 'server.search.actions'

lib.callback.register('sd-phone:server:search:query', function(src, payload)
    return actions.query(src, payload)
end)
