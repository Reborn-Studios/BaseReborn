local Config = {
    command = "som",
    adminCommand = "spotifyadmin",
    resetScreenCommand = "spotifyresetscreen",
    adminPanelPermission = { "Owner", "Admin" },
}

Config.YoutubeAPI = {
    Key = "AIzaSyBif1aQtkVStNj56XG9gRF2kbqjMVuqJU0",
    InvidiousInstances = {
        'https://iv.melmac.space',
        'https://invidious.nerdvpn.de',
    }
}

Config.getUserId = function(source)
    local user_id = vRP.getUserId(source)
    return user_id
end

Config.hasPermission = function(source, permission)
    if not permission then
        return false
    end

    local user_id = Config.getUserId(source)

    if type(permission) == "string" then
        return vRP.hasPermission(user_id, permission)
    end

    if type(permission) == "table" then
        for _, perm in ipairs(permission) do
            if vRP.hasPermission(user_id, perm) then
                return true
            end
        end
        return false
    end

    return false
end

Config.getUserIdentity = function(source)
    local user_id = Config.getUserId(source)
    local identity = vRP.getUserIdentity(user_id)
    return identity
end

return Config
