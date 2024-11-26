-- Enable/Disable anims
SetConvarReplicated("voice_enableRadioAnim", Config.RadioAnims and "1" or "0")

local random = math.random
function utils.uuid()
    math.randomseed(tonumber(tostring(os.time()):reverse():sub(1, 9)))
    local template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function(c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end

local infinityEnabled = (GetConvar('onesync_enableInfinity', 'false') == 'true' or GetConvar('onesync_enableInfinity', 'false') == '1') and true or false

callback.register('fd_radio:isInfinityEnabled', function(source)
    return infinityEnabled
end)
