---@alias NotificationPosition 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' | 'center-right' | 'center-left'
---@alias NotificationType 'info' | 'warning' | 'success' | 'error'
---@alias IconAnimationType 'spin' | 'spinPulse' | 'spinReverse' | 'pulse' | 'beat' | 'fade' | 'beatFade' | 'bounce' | 'shake'

---@class NotifyProps
---@field id? string
---@field title? string
---@field description? string
---@field duration? number
---@field showDuration? boolean
---@field position? NotificationPosition
---@field type? NotificationType
---@field style? { [string]: any }
---@field icon? string | { [1]: IconProp, [2]: string }
---@field iconAnimation? IconAnimationType
---@field iconColor? string
---@field alignIcon? 'top' | 'center'
---@field sound? { bank?: string, set: string, name: string }

local settings = require 'resource.settings'

---`client`
---@param data NotifyProps
---@diagnostic disable-next-line: duplicate-set-field
function lib.notify(data)
    if GetResourceState('notifications') == 'started' then
        return exports['notifications']:sendNotification({
            message = data.description,
            title = data.title,
            type = data.type,
            duration = data.duration
        })
    end
    TriggerEvent("Notify", data.type or "azul", data.description or data.title, data.duration or 5000)

    -- local sound = settings.notification_audio and data.sound
    -- data.sound = nil
    -- data.position = data.position or settings.notification_position

    -- SendNUIMessage({
    --     action = 'notify',
    --     data = data
    -- })

    -- if not sound then return end

    -- if sound.bank then lib.requestAudioBank(sound.bank) end

    -- local soundId = GetSoundId()
    -- PlaySoundFrontend(soundId, sound.name, sound.set, true)
    -- ReleaseSoundId(soundId)

    -- if sound.bank then ReleaseNamedScriptAudioBank(sound.bank) end
end

---@class DefaultNotifyProps
---@field title? string
---@field description? string
---@field duration? number
---@field position? NotificationPosition
---@field status? 'info' | 'warning' | 'success' | 'error'
---@field id? number

---@param data DefaultNotifyProps
function lib.defaultNotify(data)
    -- Backwards compat for v3
    data.type = data.status
    if data.type == 'inform' then data.type = 'info' end
    return lib.notify(data --[[@as NotifyProps]])
end

RegisterNetEvent('ox_lib:notify', lib.notify)
RegisterNetEvent('ox_lib:defaultNotify', lib.defaultNotify)
