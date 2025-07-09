local Utils = lib.require('client/utils')
local newFarm = {
    name = nil,
    config = {
        start = {
            location = nil,
            width = nil,
            length = nil
        },
        points = {},
        randomRoute = false,
        items = {}
    },
    group = {
        name = nil,
        grade = 0
    }
}

local newItem = {
    min = nil,
    max = nil,
    animation = Utils.GetDefaultAnim()
}

local function delete(caption, tableObj, key)
    if Utils.ConfirmationDialog(caption) == 'confirm' then
        tableObj[key] = nil
        return true
    end
    return false
end

local function deleteFarm(args)
    local farm = Farms[args.key]
    local result = delete(locale('actions.confirmation_description', locale('actions.farm'), Farms[args.key].name), Farms, args.key)
    if result then
        TriggerServerEvent('mri_Qfarm:server:DeleteFarm', farm.farmId)
        args.callback()
    else
        args.callbackCancel(args.key)
    end
end

local function deleteItem(args)
    local result = delete(locale('actions.confirmation_description', locale('actions.item'), Items[args.itemKey].label or Items[args.itemKey].name),
        Farms[args.farmKey].config.items, args.itemKey)
    if result then
        args.callback({
            key = args.farmKey
        })
    else
        args.callbackCancel({
            farmKey = args.farmKey,
            itemKey = args.itemKey
        })
    end
end

local function deletePoint(args)
    local result = delete(locale('actions.confirmation_description', locale('actions.point'), args.name),
        Farms[args.farmKey].config.points, args.pointKey)
    args.callback({
        key = args.farmKey,
        itemKey = args.itemKey
    })
end

local function exportFarm(args)
    lib.setClipboard(json.encode(Farms[args.key], {indent = true}))
    lib.notify({
        type = "success",
        description = "Copiado para a área de transferência."
    })
    args.callback(args.key)
end

local function changeFarmLocation(args)
    local location = nil
    local result = Utils.GetPedCoords()
    if result.result == 'choose' then
        location = result.coords
    end
    if location then
        Farms[args.key].config.start = {
            location = location,
            width = Config.FarmBoxWidth,
            length = Config.FarmBoxLength
        }
        lib.notify({
            type = 'success',
            description = locale('notify.updated')
        })
    end
    args.callback(args.key)
end

local function changePointLocation(args)
    local location = nil
    local result = Utils.GetPedCoords()
    if result.result == 'choose' then
        location = result.coords
    end
    if location then
        Farms[args.farmKey].config.points[args.pointKey] = location
        lib.notify({
            type = 'success',
            description = locale('notify.updated')
        })
    end
    args.callback({
        farmKey = args.farmKey,
        itemKey = args.itemKey,
        pointKey = args.pointKey
    })
end

local function setFarmName(args)
    local key = nil
    if args and args.key then
        key = args.key
    end
    local farm = {}
    if key then
        farm = Farms[key]
    else
        table.clone(newFarm, farm)
    end
    local input = lib.inputDialog(locale('creator.name'), {{
        type = 'input',
        label = locale('creator.name'),
        description = locale('creator.description_name'),
        placeholder = locale('creator.placeholder_name'),
        default = farm.name and tostring(farm.name) or "",
        required = true
    }})
    if input then
        farm.name = input[1]
        if not key then
            key = #Farms + 1
            Farms[key] = farm
        end
        Farms[key] = farm
    end
    args.callback(key)
end

local function setFarmGroup(args)
    local key = args.key
    local farm = Farms[key]
    local input = lib.inputDialog(locale('creator.group'), {{
        type = 'multi-select',
        label = locale('creator.group'),
        description = locale('creator.description_group'),
        options = Utils.GetBaseGroups(),
        default = farm.group['name'],
        required = true,
        searchable = true
    }})
    if input then
        farm.group['name'] = input[1]
        Farms[key] = farm
    end
    args.callback(key)
end

local function teleportToFarm(args)
    Utils.TpToLoc(Farms[args.key].config.start.location)
    args.callback(args.key)
end

local function teleportToPoint(args)
    Utils.TpToLoc(Farms[args.farmKey].config.points[args.pointKey])
    args.callback({
        farmKey = args.farmKey,
        itemKey = args.itemKey,
        pointKey = args.pointKey
    })
end

local function setFarmGrade(args)
    local key = args.key
    local farm = Farms[key]
    local input = lib.inputDialog(locale('creator.grade'), {{
        type = 'select',
        label = locale('creator.grade'),
        description = locale('creator.description_grade'),
        options = Utils.GetBaseGroups(true)[farm.group.name].grades,
        default = farm.group['grade'] and tostring(farm.group['grade']) or 0,
        required = true,
        searchable = true
    }})
    if input then
        farm.group['grade'] = input[1]
        Farms[key] = farm
    end
    args.callback(key)
end

local function setItem(args)
    local farm = Farms[args.farmKey]
    local input = lib.inputDialog(locale('actions.item.change'), {{
        type = 'multi-select',
        label = locale('items.name'),
        description = locale('items.description_name'),
        default = args.itemKey,
        options = Utils.GetBaseItems(),
        required = true,
        searchable = true,
        clearable = true
    }}) or {}
    if input then
        if type(input[1]) == "table" then
            for k,item in pairs(input[1]) do
                local temp = {}
                table.clone(farm.config.items[args.itemKey] or newItem, temp)
                if farm.config.items[args.itemKey] then
                    farm.config.items[args.itemKey] = nil
                end
                farm.config.items[item] = temp
            end
        elseif input[1] ~= args.itemKey then
            local temp = {}
            table.clone(farm.config.items[args.itemKey] or newItem, temp)
            if farm.config.items[args.itemKey] then
                farm.config.items[args.itemKey] = nil
            end
            farm.config.items[input[1]] = temp
        end
    end
    args.callback({key = args.farmKey})
end

local function setMinMax(args)
    local item = Farms[args.farmKey].config.items[args.itemKey]
    local input = lib.inputDialog(locale('actions.item.minmax'), {{
        type = 'number',
        label = locale('items.min'),
        description = locale('items.description_min'),
        default = item.min or 0,
        required = true
    }, {
        type = 'number',
        label = locale('items.max'),
        description = locale('items.description_max'),
        default = item.max or 1,
        required = true
    }})
    if input then
        item.min = tonumber(input[1])
        item.max = tonumber(input[2])
    end
    args.callback({
        farmKey = args.farmKey,
        itemKey = args.itemKey
    })
end

local function setRandom(args)
    local Farm = Farms[args.key]
    local input = lib.inputDialog(locale('actions.item.random'), {{
        type = 'checkbox',
        label = locale('actions.item.random'),
        description = locale('actions.item.description_random'),
        checked = not not (Farm.config.randomRoute)
    }})
    if input then
        Farm.config.randomRoute = input[1] or false
    end
    args.callback(args.key)
end

local function setAnimation(args)
    local Farm = Farms[args.key]
    if Config.UseEmoteMenu then
        local input = lib.inputDialog(locale('actions.item.animation'), {{
            type = 'input',
            label = locale('actions.item.animation'),
            description = locale('actions.item.description_anim_name'),
            default = Farm.animation and type(Farm.animation) ~= 'table' and tostring(Farm.animation) or '',
            required = true
        }})
        if input then
            Farm.animation = input[1]
        end
    else
        local input = lib.inputDialog(locale('items.animation'), {{
            type = 'input',
            label = locale('anim.dict'),
            default = tostring(Farm.animation.dict) or 'amb@prop_human_bum_bin@idle_a',
            required = true
        }, {
            type = 'input',
            label = locale('anim.anim'),
            default = tostring(Farm.animation.anim) or 'idle_a',
            required = true
        }, {
            type = 'number',
            label = locale('anim.inspeed'),
            default = tonumber(Farm.animation.inSpeed) or 6.0,
            required = true
        }, {
            type = 'number',
            label = locale('anim.outspeed'),
            default = tonumber(Farm.animation.outSpeed) or -6.0,
            required = true
        }, {
            type = 'number',
            label = locale('anim.duration'),
            default = tonumber(Farm.animation.duration) or -1,
            required = true
        }, {
            type = 'number',
            label = locale('anim.flag'),
            default = tonumber(Farm.animation.flag) or 47,
            required = true
        }, {
            type = 'number',
            label = locale('anim.rate'),
            default = tonumber(Farm.animation.rate) or 0,
            required = true
        }, {
            type = 'number',
            label = locale('anim.x'),
            default = tonumber(Farm.animation.x) or 0,
            required = true
        }, {
            type = 'number',
            label = locale('anim.y'),
            default = tonumber(Farm.animation.y) or 0,
            required = true
        }, {
            type = 'number',
            label = locale('anim.z'),
            default = tonumber(Farm.animation.z) or 0,
            required = true
        }})
        if input then
            local _anim = Farm.animation or {}
            _anim.dict = input[1]
            _anim.anim = input[2]
            _anim.inSpeed = input[3]
            _anim.outSpeed = input[4]
            _anim.duration = input[5]
            _anim.flag = input[6]
            _anim.rate = input[7]
            _anim.x = input[8]
            _anim.y = input[9]
            _anim.z = input[10] or false
            Farm.animation = _anim
            return true, Farm
        end
    end
    args.callback(args.key)
end

local function pointMenu(args)
    local ctx = {
        id = 'point_item',
        menu = 'list_points',
        title = args.name,

        options = {{
            title = locale('actions.point.change_location'),
            description = locale('actinos.point.description_change_location'),
            icon = 'location-dot',
            iconAnimation = Config.IconAnimation,
            onSelect = changePointLocation,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                callback = pointMenu
            }
        }, {
            title = locale('actions.teleport'),
            description = locale('actions.description_teleport'),
            icon = 'location-dot',
            iconAnimation = Config.IconAnimation,
            onSelect = teleportToPoint,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                callback = pointMenu
            }
        }, {
            title = locale('actions.delete'),
            description = locale("actions.description_delete", locale("actions.point")),
            icon = 'trash',
            iconAnimation = Config.IconAnimation,
            iconColor = ColorScheme.danger,
            onSelect = deletePoint,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                pointKey = args.pointKey,
                name = args.name,
                callback = listPoints
            }
        }}
    }
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function addPoints(args)
    local keepLoop = true
    if Farms[args.key] then
        while keepLoop do
            Wait(0)
            local result = Utils.GetPedCoords()
            keepLoop = result.result == 'choose'
            if keepLoop then
                Farms[args.key].config.points[#Farms[args.key].config.points + 1] = result.coords
                lib.notify({
                    type = 'success',
                    description = 'Ponto adicionado.'
                })
            end
        end
    end
    -- Farms[args.key] = farm
    args.callback(args)
end

function listPoints(args)
    local farm = Farms[args.key]
    local ctx = {
        id = 'list_points',
        menu = 'action_farm',
        title = locale('menus.points', farm.name),
        options = {{
            title = locale('actions.add_point'),
            description = locale('actions.description_add_point'),
            icon = 'square-plus',
            iconAnimation = Config.IconAnimation,
            onSelect = addPoints,
            args = {
                key = args.key,
                callback = listPoints
            }
        }}
    }
    for k, v in pairs(farm.config.points) do
        ctx.options[#ctx.options + 1] = {
            title = Utils.GetLocationFormatted(v, k),
            description = string.format('X: %.2f, Y: %.2f, Z: %.2f', v.x, v.y, v.z),
            icon = 'map-pin',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = pointMenu,
            args = {
                farmKey = args.key,
                pointKey = k,
                name = Utils.GetLocationFormatted(v, k)
            }
        }
    end
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function itemActionMenu(args)
    local item = Farms[args.farmKey].config.items[args.itemKey]
    local ctx = {
        id = 'action_item',
        title = Items[args.itemKey].label or Items[args.itemKey].name,
        description = locale('actions.item.description_menu', Farms[args.farmKey].config.randomRoute and 'Sim' or 'Não', item.min or 0, item.max or 1),
        menu = 'items_farm',
        options = {{
            title = locale('actions.item.change'),
            description = locale('actions.item.description_change'),
            icon = 'file-pen',
            iconAnimation = Config.IconAnimation,
            onSelect = setItem,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                callback = ListItems
            }
        }, {
            title = locale('actions.item.minmax'),
            description = locale('actions.item.description_minmax'),
            icon = 'up-down',
            iconAnimation = Config.IconAnimation,
            onSelect = setMinMax,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                callback = itemActionMenu
            }
        }, {
            title = locale('actions.delete'),
            description = locale("actions.description_delete", locale("actions.item")),
            icon = 'trash',
            iconAnimation = Config.IconAnimation,
            iconColor = ColorScheme.danger,
            onSelect = deleteItem,
            args = {
                farmKey = args.farmKey,
                itemKey = args.itemKey,
                callback = ListItems,
                callbackCancel = itemActionMenu
            }
        }}
    }

    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

function ListItems(args)
    local farm = Farms[args.key]
    local ctx = {
        id = 'items_farm',
        title = locale('menus.items'),
        menu = 'action_farm',
        description = farm.name,
        options = {{
            title = locale('actions.item.create'),
            description = locale('actions.item.description_create'),
            icon = 'square-plus',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = setItem,
            args = {
                farmKey = args.key,
                callback = ListItems
            }
        }}
    }
    for k, v in pairs(farm.config.items) do
        ctx.options[#ctx.options + 1] = {
            title = Items[k].label or Items[k].name,
            icon = string.format('%s/%s.png', GlobalState["RebornConfig"].images, Items[k].index or Items[k].name),
            image = string.format('%s/%s.png', GlobalState["RebornConfig"].images, Items[k].index or Items[k].name),
            metadata = Utils.GetItemMetadata(Items[k]),
            description = Items[k].description,
            onSelect = itemActionMenu,
            args = {
                itemKey = k,
                farmKey = args.key
            }
        }
    end
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function saveFarm(args)
    TriggerServerEvent("mri_Qfarm:server:SaveFarm", Farms[args.key], args.key)
    args.callback(args.key)
end

local function actionMenu(key)
    local farm = Farms[key]
    local groupName = 'Sem grupo'
    local grade = '0'
    local groups = Utils.GetBaseGroups(true)
    local disableGradeSet = false
    local farmGroup = farm.group['name'] or farm.group[1] and farm.group[1]['name']
    if farmGroup and groups[farmGroup] then
        groupName = groups[farmGroup].label
    else
        disableGradeSet = true
    end
    local locationText = locale('actions.farm.change_location')
    if farm.config.start.location == nil then
        locationText = locale('actions.farm.set_location')
    end
    local ctx = {
        id = 'action_farm',
        description = string.format('%s: %s, %s: %s', locale('creator.group'), groupName, locale('creator.grade'), grade),
        title = farm.name:upper(),
        menu = 'list_farms',
        options = {{
            title = locale('actions.farm.rename'),
            description = locale('actions.farm.description_rename'),
            icon = 'file-pen',
            iconAnimation = Config.IconAnimation,
            onSelect = setFarmName,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('creator.group'),
            description = locale('creator.description_group'),
            icon = 'users',
            iconAnimation = Config.IconAnimation,
            onSelect = setFarmGroup,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('creator.grade'),
            description = locale('creator.description_grade'),
            icon = 'list-ol',
            iconAnimation = Config.IconAnimation,
            onSelect = setFarmGrade,
            disabled = disableGradeSet,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locationText,
            icon = 'location-dot',
            iconAnimation = Config.IconAnimation,
            onSelect = changeFarmLocation,
            description = locale('actions.farm.description_location'),
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('actions.farm.items'),
            description = locale('actions.farm.description_items'),
            icon = 'rectangle-list',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = ListItems,
            args = {
                key = key
            }
        },
        {
            title = locale('actions.item.random'),
            description = locale('actions.item.description_random'),
            icon ='shuffle',
            iconAnimation = Config.IconAnimation,
            onSelect = setRandom,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('actions.item.animation'),
            description = locale('actions.item.description_animation'),
            icon = 'person-walking',
            iconAnimation = Config.IconAnimation,
            onSelect = setAnimation,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('actions.points'),
            description = locale('actions.description_points'),
            icon = 'location-crosshairs',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = listPoints,
            args = {
                key = key,
            }
        }, {
            title = locale('actions.teleport'),
            description = locale('actions.description_teleport'),
            icon = 'location-dot',
            iconAnimation = Config.IconAnimation,
            onSelect = teleportToFarm,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('actions.export'),
            description = locale("actions.description_export", locale("actions.farm")),
            icon = 'copy',
            iconAnimation = Config.IconAnimation,
            onSelect = exportFarm,
            args = {
                key = key,
                callback = actionMenu
            }
        }, {
            title = locale('actions.save'),
            description = locale("actions.description_save"),
            icon = 'floppy-disk',
            iconAnimation = Config.IconAnimation,
            onSelect = saveFarm,
            args = {
                key = key,
                callback = function()
                    lib.hideContext()
                end
            }
        }, {
            title = locale('actions.delete'),
            description = locale("actions.description_delete", locale("actions.farm")),
            icon = 'trash',
            iconAnimation = Config.IconAnimation,
            iconColor = ColorScheme.danger,
            onSelect = deleteFarm,
            args = {
                key = key,
                callback = ListFarm,
                callbackCancel = actionMenu
            }
        }}
    }
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end
-- {"grade":0,"name":["GrooveNovato","GrooveMembro","GrooveLider","GrooveGerente","GrooveSubLider"]}
function ListFarm()
    local ctx = {
        id = 'list_farms',
        menu = 'menu_farm',
        title = 'Listar Farms',
        description = locale('actions.farm.description_title', #Farms),
        options = {}
    }
    for k, v in pairs(Farms) do
        local groups = Utils.GetBaseGroups(true)
        local groupName = locale('creator.no_group')
        if v.group['name'] and v.group.name[1] and groups[v.group.name[1]] then
            groupName = groups[v.group.name[1]].label
        end
        local description = locale('menus.description_farm', groupName)
        ctx.options[#ctx.options + 1] = {
            title = v.name:upper(),
            icon = 'warehouse',
            iconAnimation = Config.IconAnimation,
            description = description,
            metadata = Utils.GetMetadataFromFarm(k),
            onSelect = function()
                actionMenu(k)
            end
        }
    end
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

local function manageFarms()
    Items = Utils.GetItems()
    local ctx = {
        id = 'menu_farm',
        title = locale('actions.farm.title'),
        description = locale('actions.farm.description_title', #Farms),
        options = {{
            title = locale('actions.farm.create'),
            description = locale('actions.farm.description_create'),
            icon = 'square-plus',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = setFarmName,
            args = {
                callback = ListFarm
            }
        },{
            title = locale('actions.farm.list'),
            description = locale('actions.farm.description_list'),
            icon = 'list-ul',
            iconAnimation = Config.IconAnimation,
            arrow = true,
            onSelect = ListFarm
        }
    }}
    lib.registerContext(ctx)
    lib.showContext(ctx.id)
end

lib.callback.register('mri_Qfarm:manageFarmsMenu', function()
    manageFarms()
    return true
end)

