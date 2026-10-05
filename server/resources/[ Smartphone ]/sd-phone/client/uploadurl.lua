---Completes an HTTP upload slot the server minted, swapping its path for the full URL on the server
---this client is connected to, or marks it unavailable when there is no address to use.
---@param res table successful envelope { data = { path: string, partBytes: integer } }
return function(res)
    local endpoint = GetCurrentServerEndpoint()
    local data = type(res.data) == 'table' and res.data or nil
    if not data or type(data.path) ~= 'string' or type(endpoint) ~= 'string' or endpoint == '' then
        res.success = false
        res.code = 'unavailable'
        res.data = nil
        return
    end
    data.url = ('http://%s/%s%s'):format(endpoint, GetCurrentResourceName(), data.path)
    data.path = nil
end
