local Utils = {}

function Utils.GetItems()
    if GetResourceState("ox_inventory") == "started" then
        return exports.ox_inventory:Items()
    end
    return GlobalState["RebornConfig"].items
end

function Utils.GetPedCoords()
    lib.hideTextUI()
    local text = {}
    table.insert(text, locale('actions.choose_location.1'))
    table.insert(text, locale('actions.choose_location.2'))
    lib.showTextUI(table.concat(text), {
        position = 'right-center'
    })

    while true do
        Wait(0)
        if IsControlJustReleased(0, 38) then
            lib.hideTextUI()
            return {
                result = 'choose',
                coords = GetEntityCoords(cache.ped)
            }
        end
        if IsControlJustReleased(0, 177) then
            lib.hideTextUI()
            return {
                result = 'cancel',
                coords = nil
            }
        end
        if IsControlJustPressed(0, 201) then
            lib.hideTextUI()
            return {
                result = 'end',
                coords = nil
            }
        end
    end
end

function Utils.TpToLoc(coords)
    if coords then
        DoScreenFadeOut(500)
        Wait(1000)
        SetPedCoordsKeepVehicle(PlayerPedId(), coords.x, coords.y, coords.z)
        DoScreenFadeIn(500)
    end
end

function Utils.ConfirmationDialog(content)
    return lib.alertDialog({
        header = locale('dialog.confirmation'),
        content = content,
        centered = true,
        cancel = true,
        labels = {
            cancel = locale('actions.cancel'),
            confirm = locale('actions.confirm')
        }
    })
end

function Utils.GetLocation(coords)
    local streetName, crossingRoad = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
    return GetStreetNameFromHashKey(streetName)
end

function Utils.GetLocationFormatted(location, key)
    if key then
        return string.format('[%02d] - %s', key, Utils.GetLocation(location))
    else
        return Utils.GetLocation(location)
    end
end

function Utils.GetGroupGrades(group)
    local grades = {}
    for k, v in pairs(group.grades) do
        grades[#grades + 1] = {
            value = k,
            label = string.format('%s - %s', k, v.name)
        }
    end
    return grades
end

function Utils.GetBaseGroups(named)
    QBCore = exports["qb-core"]:GetCoreObject()
    local jobs = QBCore.Shared.Jobs
    -- local gangs = exports.qbx_core:GetGangs()
    local groups = {}
    for k, v in pairs(jobs) do
        if not string.find(k,"Paisana") then
            local data = {
                value = k,
                label = v.label,
                grades = Utils.GetGroupGrades(v)
            }
            if named then
                groups[k] = data
            else
                groups[#groups + 1] = data
            end
        end
    end
    --[[ for k, v in pairs(gangs) do
        if not (k == 'none') then
            local data = {
                value = k,
                label = v.label,
                grades = Utils.GetGroupGrades(v)
            }
            if named then
                groups[k] = data
            else
                groups[#groups + 1] = data
            end
        end
    end ]]
    return groups
end

function Utils.GetBaseItems()
    local items = {}
    for k, v in pairs(Utils.GetItems()) do
        items[#items + 1] = {
            value = k,
            label = string.format('%s (%s)', v.label or v.name, k)
        }
    end
    return items
end

function Utils.GetItemMetadata(item)
    return {{
        label = locale('items.spawn'),
        value = item.name
    }, {
        label = locale('items.weight'),
        value = item.weight
    }, {
        label = locale('items.type'),
        value = item.type or locale('items.notype')
    }}
end

function Utils.GetMetadataFromFarm(key)
    local data = {}
    local items = Farms[key].config.items
    for k, v in pairs(items) do
        data[#data + 1] = {
            label = locale('menus.route'),
            value = string.format('%s (%s)', Items[k].label, k)
        }
    end
    if #data <= 0 then
        return {{
            label = locale('menus.route'),
            value = locale('menus.no_route')
        }}
    end
    return data
end

function Utils.GetDefaultAnim()
    if Config.UseUseEmoteMenu then
        return DefaultAnimCmd
    else
        return DefaultAnim
    end
end

return Utils
