local sessions = ArmBrakerConfig.sessions

RegisterNetEvent('ArmBraker:check_sv')
AddEventHandler('ArmBraker:check_sv', function(position)
    local a, b, c = table.unpack(position)
    for k,v in pairs(sessions) do
        local x = a - v.x
        local y = b - v.y
        local z = c - v.z

        if #vec3(x, y, z) < 1.5 then
            if sessions[k].place1 == 0 and not sessions[k].started then
                sessions[k].place1 = source
                TriggerClientEvent('ArmBraker:check_cl', source, 'place1')
            elseif sessions[k].place2 == 0 and sessions[k].place1 ~= 0 then
                sessions[k].place2 = source
                TriggerClientEvent('ArmBraker:check_cl', source, 'place2')
            else
                TriggerClientEvent('ArmBraker:check_cl', source, 'noplace')
                return
            end

            if sessions[k].place1 ~= 0 and sessions[k].place2 ~= 0 and not sessions[k].started then
                TriggerClientEvent('ArmBraker:start_cl', sessions[k].place1)
                TriggerClientEvent('ArmBraker:start_cl', sessions[k].place2)
                break
            end
        end
    end
end)


RegisterNetEvent('ArmBraker:updategrade_sv')
AddEventHandler('ArmBraker:updategrade_sv', function(gradeUpValue)
    for k,v in pairs(sessions) do
        if v.place1 == source or v.place2 == source then
            v.grade = v.grade + gradeUpValue
            if v.grade <= 0.10 then
                v.grade = -999
            elseif v.grade >= 0.90 then
                v.grade = 999
            end
            TriggerClientEvent('ArmBraker:updategrade_cl', v.place1, v.grade)
            TriggerClientEvent('ArmBraker:updategrade_cl', v.place2, v.grade)
            break
        end
    end
end)

RegisterNetEvent('ArmBraker:disband_sv')
AddEventHandler('ArmBraker:disband_sv', function(position)
    local a, b, c = table.unpack(position)
    for k,v in pairs(sessions) do
        local x = a - v.x
        local y = b - v.y
        local z = c - v.z
        local _source = source
        if #vec3(x, y, z) < 1.5 then
            if sessions[k].place1 == source or sessions[k].place2 == source then
                local m = k
                if sessions[k].place1 ~= 0 then
                    TriggerClientEvent('ArmBraker:reset_cl', sessions[m].place1)
                end
                if sessions[k].place2 ~= 0 then
                    TriggerClientEvent('ArmBraker:reset_cl', sessions[k].place2)
                end
                Wait(100)
                sessions[k].started = false
                sessions[k].place1 = 0
                sessions[k].place2 = 0
                sessions[k].grade = 0.5
                break
            end
        end
    end
end)
