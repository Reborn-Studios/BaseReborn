local activeSkillCheck = nil

function SkillCheck(difficulty, keys, options)
    if activeSkillCheck then
        return
    end
    
    activeSkillCheck = promise.new()
    
    if not options then
        options = {}
    end
    
    Utils.setNuiFocus(false, true)
    
    SendNUIMessage({
        action = "startSkillCheck",
        data = {
            difficulty = difficulty or {"easy"},
            keys = keys or {"e"},
            label = options.label,
            instruction = options.instruction,
            type = options.type
        }
    })
    
    return Citizen.Await(activeSkillCheck)
end

function CancelSkillCheck()
    if not activeSkillCheck then
        error("No skillCheck is active")
    end
    
    SendNUIMessage({
        action = "skillCheckCancel"
    })
end

function SkillCheckActive()
    return activeSkillCheck ~= nil
end

RegisterNUICallback("skillCheckOver", function(result, callback)
    callback(1)
    
    if activeSkillCheck then
        Utils.resetNuiFocus()
        activeSkillCheck:resolve(result)
        activeSkillCheck = nil
    end
end)