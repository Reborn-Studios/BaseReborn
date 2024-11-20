RegisterNetEvent("AdminControl:showUserGroups")
AddEventHandler("AdminControl:showUserGroups",function(user_id, userGroups)
    local groups = ServerControl.getGroups()
    if groups then
        local options = {}
        for _,Group in ipairs(groups) do
            table.insert(options,{
                type = "checkbox", label = Group.label, value = Group.value, checked = userGroups[Group.groupName] and true
            })
        end
        local input = lib.inputDialog("Controle de grupos ("..user_id..")", options)
        if input then
            local addGroups = {}
            local remGroups = {}
            local changed = false
            for k,bool in ipairs(input) do
                local groupName = groups[k].groupName
                if groupName then
                    if bool then
                        if not userGroups[groupName] then
                            addGroups[groupName] = true
                            changed = true
                        end
                    else
                        if userGroups[groupName] then
                            remGroups[groupName] = true
                            changed = true
                        end
                    end
                end
            end
            if changed then
                TriggerServerEvent("AdminControl:setUserGroups",user_id,addGroups,remGroups)
            end
        end
    end
end)
