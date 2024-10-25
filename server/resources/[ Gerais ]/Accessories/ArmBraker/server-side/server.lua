local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

local sessions = {
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 187.35, ['y'] = -993.49, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 191.54, ['y'] = -991.9, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 195.14, ['y'] = -989.94, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 977.9, ['y'] = -95.17, ['z'] = 74.87, model = 'prop_arm_wrestle_01'}, -- MC
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1823.73, ['y'] = -1181.51, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'},
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1820.16, ['y'] = -1183.45, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'},
    { place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1816.31, ['y'] = -1185.56, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'},
}

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
