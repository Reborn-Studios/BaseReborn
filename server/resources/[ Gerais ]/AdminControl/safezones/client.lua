-- Locais de safezone
local fields = GlobalState['SafeZones']
local safeZones = {}

AddStateBagChangeHandler("SafeZones","",function (_,_,value)
    safeZones = {}
    fields = value
    for k,v in pairs(fields) do
        safeZones[k] = PolyZone:Create(v.fieldZone, {
            name = "safe_zone_"..k,
            minZ = v.minZ,
            maxZ = v.maxZ,
        })
    end
end)

local isInSafezone = false
local notified = false

local function createSafezone()
    local isAdding = true
    local minZ = 50.0
    local actualZone = PolyZone:new({}, {})
    local safeZoneCds = {}
    while isAdding do
        DisablePlayerFiring(PlayerId(), true)
        DisableControlAction(0, 25, true)
        DisableControlAction(0, 38, true)
        local hit,coords = GetCamCoords()
        if hit then
            DrawLine(coords.x,coords.y,coords.z, coords.x,coords.y,coords.z + 10.0, 0, 255, 0, 250)
            DrawLocalText("~g~E~w~  CONFIRMAR",0.015,0.53)
            DrawLocalText("~b~MOUSE LEFT~w~  COLOCAR",0.015,0.56)
            DrawLocalText("~r~MOUSE RIGHT~w~  CANCELAR",0.015,0.59)
        end
        if IsDisabledControlJustPressed(0, 38) then
            isAdding = false
            return safeZoneCds, minZ
        end
        if IsDisabledControlJustPressed(0, 24) then
            if coords.z < minZ then
                minZ = coords.z
            end
            table.insert(safeZoneCds, vector2(coords.x, coords.y))
            actualZone.points = safeZoneCds
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
        end
        actualZone:draw()
        Wait(4)
    end
end

function CreateSafe()
    local safeZoneCds, minZ = createSafezone()
    if safeZoneCds and #safeZoneCds > 2 then
        local input = lib.inputDialog('Registro de bau', {
            { type = 'input', label = 'Nome', description = 'Nome da safezone', required = true },
            { type = 'number', label = 'Altura', description = 'Altura da safezone', default = 10, placeholder = "10.0" },
            { type = 'checkbox', label = 'Liberar para policiais' },
        })
        if input then
            ServerControl.registerSafezone({
                name = input[1],
                fieldZone = safeZoneCds,
                minZ = minZ,
                maxZ = minZ + (tonumber(input[2]) or 10.0),
                allowPolice = input[3]
            })
        end
    end
end

function DeleteSafe(index)
    local field = fields[index]
    if field then
        local alert = lib.alertDialog({
            header = 'Deletar Safezone?',
            content = 'Tem certeza que deseja deletar a safezone: \n'..field.name,
            centered = true,
            cancel = true
        })
        if alert == "confirm" then
            ServerControl.deleteSafezone(index)
        end
    end
end

function Client.showSafes()
    local values = {}
    for k,v in pairs(fields) do
        table.insert(values,{
            label = v.name,
            value = v.id
        })
    end
    lib.registerMenu({
        id = 'admin_safezones_control',
        title = 'Controle das Safezones',
        position = 'bottom-right',
        options = {
            { label = 'Criar Safezone', description = 'Crie uma nova area safe!' },
            { label = 'Deletar Safezone', values = values, description = 'Deletar safezones criadas!' },
        }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            CreateSafe()
        elseif selected == 2 then
            DeleteSafe(scrollIndex)
        end
    end)
    lib.showMenu('admin_safezones_control')
end

CreateThread(function()
    Wait(500)
    for k,v in pairs(fields) do
        safeZones[k] = PolyZone:Create(v.fieldZone, {
            name = "safe_zone_"..k,
            minZ = v.minZ,
            maxZ = v.maxZ,
        })
    end
    while true do
        local inSafe = false
        for k,data in pairs(safeZones) do
            if fields[k] then
                if not fields[k].allowPolice or not LocalPlayer.state.Police then
                    inSafe = data:isPointInside(GetEntityCoords(PlayerPedId()))
                    if inSafe then
                        break
                    end
                end
            end
        end
        isInSafezone = inSafe
        LocalPlayer.state.canUseWeapons = not inSafe
        Wait(1000)
    end
end)

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local timing = 1000
        if isInSafezone then
            timing = 4
            if not notified then
                notified = true
                lib.showTextUI('Você está na safezone',{
                    position = "left-center",
                    icon = 'shield',
                    iconAnimation = "bounce",
                    style = {
                        borderRadius = 5,
                        backgroundColor = '#48BB78',
                        color = 'white'
                    }
                })
            end
            DisableControlAction(1, 37, true)
            DisableControlAction(0, 37, true)
            DisableControlAction(2, 37, true)
            DisableControlAction(1, 45, true)
            DisableControlAction(2, 80, true)
            DisableControlAction(2, 140, true)
            DisableControlAction(2, 250, true)
            DisableControlAction(2, 263, true)
            DisableControlAction(2, 310, true)
            DisableControlAction(1, 140, true)
            DisableControlAction(1, 141, true)
            DisableControlAction(1, 142, true)
            DisableControlAction(1, 143, true)
            DisableControlAction(0, 24, true)
            DisableControlAction(0, 25, true)
            DisableControlAction(0, 106, true)
            SetCurrentPedWeapon(ped,GetHashKey("WEAPON_UNARMED"),true)
            DisablePlayerFiring(ped,true)
            if not IsPedInAnyVehicle(ped) then
                DisableControlAction(0, 58, true)
                DisableControlAction(0, 47, true)
            end
        elseif notified then
            notified = false
            lib.hideTextUI()
            -- TriggerEvent("Notify","aviso","Você saiu da SafeZone",3000)
        end
        Wait(timing)
    end
end)
