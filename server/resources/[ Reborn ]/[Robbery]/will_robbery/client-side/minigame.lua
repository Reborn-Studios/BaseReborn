function PlayMinigame(minigame)
    local inGame = true
    local sucess = false
    if Config.debug then
        return true
    end
    if minigame == "memorygame" then
        exports["memorygame"]:thermiteminigame(10, 3, 3, 10, function()
            sucess = true
            inGame = false
        end,
        function()
            inGame = false
            print("failure")
        end)
    elseif minigame == "mhacking" then
        TriggerEvent("mhacking:show")
        TriggerEvent("mhacking:start", 7, 19, function(outcome, timeremaining)
            TriggerEvent("mhacking:hide")
            if outcome then
                sucess = true
            end
            inGame = false
        end)
    elseif minigame == "utk_fingerprint" then
        TriggerEvent("utk_fingerprint:Start", 1, 6, 1, function(outcome, _)
            if outcome then
                sucess = true
            end
            inGame = false
        end)
    elseif minigame == "drilling" then
        TriggerEvent("Drilling:Start",function(success)
            if success then
                sucess = true
            end
            inGame = false
        end)
    end
    while inGame do
        Wait(500)
    end
    return sucess
end
