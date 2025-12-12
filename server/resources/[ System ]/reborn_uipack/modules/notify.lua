local config = {}

function SafeGetKvp(getFunction, key, defaultValue)
  local success, result = pcall(getFunction, key)
  if not success then
    DeleteResourceKvp(key)
    return defaultValue
  end
  return result or defaultValue
end

config.notification_audio = (SafeGetKvp(GetResourceKvpInt, "notification_audio", 1) == 1)

function Notify(notification)
  if notification and notification.type then
    if notification.type == "inform" then
      notification.type = "info"
    end
  end

  local soundData = nil
  if config.notification_audio then
    soundData = notification.sound
  end
  notification.sound = nil

  -- SendNUIMessage({
  --   action = "notification",
  --   data = notification
  -- })

  TriggerEvent("Notify",notification.type,notification.title or notification.description,5000)

  if not soundData then
    return
  end

  local hasAudioBank = (soundData.bank ~= nil)
  
  if hasAudioBank then
    Utils.requestAudioBank(soundData.bank)
  end

  local soundId = GetSoundId()
  PlaySoundFrontend(soundId, soundData.name, soundData.set, true)
  ReleaseSoundId(soundId)

  if hasAudioBank then
    ReleaseNamedScriptAudioBank(soundData.bank)
  end
end