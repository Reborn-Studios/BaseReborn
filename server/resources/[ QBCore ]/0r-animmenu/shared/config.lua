Config = {
    Language = "en",
    UseOldVersionPlacing = false,
    PlayPlacedAnimOnPlayerPed = true,
    TeleportBackAfterPlacedCancelled = true,
    QuickAnimationsState = true,
    QuickPrimaryKey = 'LSHIFT', -- Just works with NUM keys
    DefaultQuickKeys = {
        [1] = {Key = 'NUM1'}, -- To make it NUM key write NUM1
        [2] = {Key = 'NUM2'}, -- To make it NUM key write NUM2
        [3] = {Key = 'NUM3'}, -- To make it NUM key write NUM3
        [4] = {Key = 'NUM4'}, -- To make it NUM key write NUM4
        [5] = {Key = 'NUM5'}, -- To make it NUM key write NUM4
        [6] = {Key = 'NUM6'}, -- To make it NUM key write NUM5
        [7] = {Key = 'NUM7'} -- To make it NUM key write NUM5
    },
    NumKeys = { -- If you want to use NUM keys you can also configure keys here.
        [1] = {Key = 108},
        [2] = {Key = 110},
        [3] = {Key = 125},
        [4] = {Key = 117},
        [5] = {Key = 127},
        [6] = {Key = 118},
        [7] = {Key = 314}
    },
    MenuKey = {
        Command = 'animmenu',
        KeyMapping = {
            Enable = false,
            Key = 'F4'
        },
        NormalKey = {
            Enable = false,
            Key = 170 -- https://gist.github.com/FlokiTV/8372476722453cfb0ceabe9334204070
        },
        CloseKey = 27 -- https://www.toptal.com/developers/keycode
    },
    CanOpenMenu = function()
        if IsPedDeadOrDying(PlayerPedId(), true) then
            return false
        end
        return true
    end,
    PropTimeout = 2000,
    AllowMovement = true, -- By activating this, you enable the player to move while the menu is open.
    MaxDistanceForAnimPos = 15.0,
    AllowedInCars = false, -- Set this if you really wanna disable emotes in cars, as of 1.7.2 they only play the upper body part if in vehicle
    -- Pointing
    Pointing = {
        Enable = true,
        KeyMapping = {
            Enable = true,
            Key = 'B' -- Get the button string here https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
        },
        NormalKey = {
            Enable = false,
            Key = 29 -- https://gist.github.com/FlokiTV/8372476722453cfb0ceabe9334204070
        }
    },
    -- Crouching
    CrouchingEnabled = false, -- Default Key (Left CTRL)
    -- Ragdoll
    Ragdoll = {
        Enable = false,
        ByPassCanRagdoll = true,
        KeyMapping = {
            Enable = true,
            Key = 'U' -- Get the button string here https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
        },
        NormalKey = {
            Enable = false,
            Key = 303 -- https://gist.github.com/FlokiTV/8372476722453cfb0ceabe9334204070
        }
    },
    Notify = function(text, length, type)
        TriggerEvent('QBCore:Notify', text, type, length)
    end,
    UseSameKeyForCancelAndHandsUp = false, -- If it's true just edit HandsUp in line 90.
    CancelWalk = true, -- Resets movement type when using the /e c command
    CancelEmote = {
        Command = "emotecancel",
        Enable = true, -- Set this to false if you have something else on X or change it (default X), and then just use /e c to cancel emotes.
        KeyMapping = {
            Enable = true,
            Key = 'X' -- Get the button string here https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
        },
        NormalKey = {
            Enable = true,
            Key = 74 -- https://gist.github.com/FlokiTV/8372476722453cfb0ceabe9334204070
        }
    },
    HandsUp = {
        Command = "handsup",
        Enable = false, -- Set this to false if you have something else on X or change it (default X), and then just use /e c to cancel emotes.
        KeyMapping = {
            Enable = true,
            Key = 'GRAVE' -- Get the button string here https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/
        },
        NormalKey = {
            Enable = false,
            Key = 73 -- https://gist.github.com/FlokiTV/8372476722453cfb0ceabe9334204070
        }
    },
    CanHandsup = function()
        -- Example usage for qb-policejob
        -- if GetResourceState('qb-policejob') == "started" then
        --     if exports['qb-policejob']:IsHandcuffed() then return false end
        -- end
        return true
    end,
    HandsupDisableControls = function()
        -- Example usage for qb-smallresources
        -- if GetResourceState('qb-smallresources') == "started" then
        --     exports['qb-smallresources']:addDisableControls({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
        -- end
    end,
    HandsupEnableControls = function()
        -- Example usage for qb-smallresources
        -- if GetResourceState('qb-smallresources') == "started" then
        --     exports['qb-smallresources']:removeDisableControls({24, 25, 47, 58, 59, 63, 64, 71, 72, 75, 140, 141, 142, 143, 257, 263, 264})
        -- end
    end,
    AnimalPeds = {
        "a_c_boar",
        "a_c_cat_01",
        "a_c_chickenhawk",
        "a_c_chimp",
        "a_c_chop",
        "a_c_cormorant",
        "a_c_cow",
        "a_c_coyote",
        "a_c_crow",
        "a_c_deer",
        "a_c_dolphin",
        "a_c_fish",
        "a_c_hen",
        "a_c_humpback",
        "a_c_husky",
        "a_c_killerwhale",
        "a_c_mtlion",
        "a_c_pig",
        "a_c_pigeon",
        "a_c_poodle",
        "a_c_pug",
        "a_c_rabbit_01",
        "a_c_rat",
        "a_c_retriever",
        "a_c_rhesus",
        "a_c_rottweiler",
        "a_c_seagull",
        "a_c_sharkhammer",
        "a_c_sharktiger",
        "a_c_shepherd",
        "a_c_stingray",
        "a_c_westy"
    },
    AnimFlag = {
        MOVING = 51,
        LOOP = 1,
        STUCK = 50,
    },
    ScenarioType = {
        MALE = 'MaleScenario',
        SCENARIO = 'Scenario',
        OBJECT = 'ScenarioObject',
    },
    VehicleRequirement = {
        NOT_ALLOWED = 'NOT_ALLOWED',
        REQUIRED = 'REQUIRED',
    },
    AnimPos = {
        Enable = true,
        MaxDistance = 10.0,
        MaxHeightDistance = 5.0,  -- Current Z coordinate + this value
    },
    Categories = {
        General = true,
        Extra = true,
        Expressions = true,
        Dances = true,
        Walks = true,
        PlacedEmotes = true,
        Shared = true,
        PropEmotes = true,
        AnimalEmotes = true,
        Gang = true
    },
    GangEmotePropMenuCommand = "gangemoteprops",
    GangEmotePropMenuKey = "O",
    GangEmotePropMenuInfoCommand = "gangemotepropsinfo",
    GangEmotePropMenuInfoKey = "I",
    GangEmotePropMenu = "ox_lib", -- default, ox_lib, qb-menu
    GangEmoteProps = {
        {objName = "w_pi_pistol", label = "Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_combatpistol", label = "Combat Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_pistol50", label = "Pistol .50", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_sns_pistol", label = "SNS Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_heavypistol", label = "Heavy Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_vintage_pistol", label = "Vintage Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_appistol", label = "AP Pistol", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_stungun", label = "Stun Gun", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_pistolmk2", label = "Pistol Mk II", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_sns_pistolmk2", label = "SNS Pistol Mk II", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_revolvermk2", label = "Heavy Revolver Mk II", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_pistol_luxe", label = "Pistol Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_combatpistol_luxe", label = "Combat Pistol Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_pistol50_luxe", label = "Pistol .50 Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_sns_pistol_luxe", label = "SNS Pistol Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_heavypistol_luxe", label = "Heavy Pistol Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }},
        {objName = "w_pi_appistol_luxe", label = "AP Pistol Luxe", handOffsets = {
            rightHand = {pos = {0.15, 0.03, -0.01}, rot = {-30.0, 0.0, 0.0}},
            leftHand  = {pos = {0.15, 0.03, -0.01}, rot = {235.0, 0.0, 0.0}}
        }}
    }
}