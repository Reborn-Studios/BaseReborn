Config = {
    ServerCallbacks = {}, -- Don't edit or change
    MenuKey = 'F3',
    MaxDistanceForAnimPos = 20.0,
    CancelWalk = true, -- Resets movement type when using the /e c command
    EnableXtoCancel = true,  -- Set this to false if you have something else on X (default X), and then just use /e c to cancel emotes.
    CancelEmoteKey = 'F6', -- Get the button string here https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
    AllowedInCars = true, -- Set this if you really wanna disable emotes in cars, as of 1.7.2 they only play the upper body part if in vehicle
    QuickPrimaryKey = 'LSHIFT', -- The primary key name to be used to play the quick animations, for example, the key you specify and the quick animation number to be played will be pressed (LSHIFT + 1, LSHIFT + 2). Check here for more keys https://docs.fivem.net/docs/game-references/controls/.
    -- Pointing
    PointingEnabled = false,
    PointingKeybind = 'B',
    -- Crouching
    CrouchingEnabled = false, -- Default Key (Left CTRL)
    -- Ragdoll
    RagdollEnabled = false,
    RagdollKeybind = 'U',
    Notify = function(text, length, type)
        TriggerEvent('QBCore:Notify', text, type, length)
    end,
    -- Hands Up (Hands Up key is same with CancelEmoteKey)
    EnableHandsUp = false,
    CanHandsup = function()
        -- Example usage for qb-policejob
        if GetResourceState('qb-policejob') == "starting" or GetResourceState('qb-policejob') == "started" then
            if exports['qb-policejob']:IsHandcuffed() then return false end
        end
        return true
    end,
    HandsupDisableControls = function()
        -- Example usage for qb-smallresources
        if GetResourceState('qb-smallresources') == "starting" or GetResourceState('qb-smallresources') == "started" then
            exports['qb-smallresources']:addDisableControls({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
        end
    end,
    HandsupEnableControls = function()
        -- Example usage for qb-smallresources
        if GetResourceState('qb-smallresources') == "starting" or GetResourceState('qb-smallresources') == "started" then
            exports['qb-smallresources']:removeDisableControls({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
        end
    end
}