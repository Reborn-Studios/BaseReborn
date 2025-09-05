local function exportHandler(exportName, func)
    AddEventHandler(('__cfx_export_target_%s'):format(exportName), function(setCB)
        setCB(func)
    end)
end

---@param options table
---@return table
local function convert(options)
    local distance = options.distance
    options = options.options

    -- People may pass options as a hashmap (or mixed, even)
    for k, v in pairs(options) do
        if type(k) ~= 'number' then
            table.insert(options, v)
        end
    end

    for id, v in pairs(options) do
        if type(id) ~= 'number' then
            options[id] = nil
            goto continue
        end

        v.onSelect = v.action
        v.distance = v.distance or distance
        v.name = v.name or v.label
        v.groups = v.job
        v.items = v.item or v.required_item

        if v.event and v.tunnel and v.tunnel ~= 'client' then
            v.serverEvent = v.event

            if v.tunnel == 'command' then
                v.command = v.event
            end

            v.event = nil
            v.type = nil
        end

        v.action = nil
        v.job = nil
        v.item = nil
        v.required_item = nil
        v.qtarget = true

        ::continue::
    end

    return options
end

local api = require 'client.api'

exportHandler('AddPolyZone', function(name, points, options, targetoptions)
    local newPoints = table.create(#points, 0)
    local thickness = math.abs(options.maxZ - options.minZ)

    for i = 1, #points do
        local point = points[i]
        newPoints[i] = vec3(point.x, point.y, options.maxZ - (thickness / 2))
    end

    return api.addPolyZone({
        name = name,
        points = newPoints,
        thickness = thickness,
        debug = options.debugPoly,
        options = convert(targetoptions),
    })
end)

exportHandler('AddCircleZone', function(name, center, radius, options, targetoptions)
    return api.addSphereZone({
        name = name,
        coords = center,
        radius = radius,
        debug = options.debugPoly,
        options = convert(targetoptions),
    })
end)

exportHandler('RemCircleZone', function(name)
    api.removeZone(name, true)
end)

exportHandler('AddTargetModel', function(models, options)
    api.addModel(models, convert(options))
end)

exportHandler('RemoveTargetModel',function(model)
    api.removeModel(model)
end)

exportHandler('AddBoxZone',function (name, center, lenght, width, _, options, target)
    return api.addBoxZone({
        name = name,
        coords = center,
        radius = width,
        debug = options.debugPoly,
        options = convert(options),
    })
end)

exportHandler('LabelText', function(models, options)
    -- 
end)

api.addModel({ -171943901,-109356459,1805980844,-99500382,1262298127,1737474779,2040839490,1037469683,867556671,-1521264200,-741944541,-591349326,-293380809,-628719744,-1317098115,1630899471,38932324,-523951410,725259233,764848282,2064599526,536071214,589738836,146905321,47332588,-1118419705,538002882,-377849416,96868307,-1195678770,-853526657,652816835 },convert({
    options = {
        {
            icon = "fa-solid fa-chair",
            event = "target:animSentar",
            label = "Sentar",
            tunnel = "client"
        }
    },
    distance = 1.0
}))

local chairs = {
	[-171943901] = 0.0,
	[-109356459] = 0.5,
	[1805980844] = 0.5,
	[-99500382] = 0.3,
	[1262298127] = 0.0,
	[1737474779] = 0.5,
	[2040839490] = 0.0,
	[1037469683] = 0.4,
	[867556671] = 0.4,
	[-1521264200] = 0.0,
	[-741944541] = 0.4,
	[-591349326] = 0.5,
	[-293380809] = 0.5,
	[-628719744] = 0.5,
	[-1317098115] = 0.5,
	[1630899471] = 0.5,
	[38932324] = 0.5,
	[-523951410] = 0.5,
	[725259233] = 0.5,
	[764848282] = 0.5,
	[2064599526] = 0.5,
	[536071214] = 0.5,
	[589738836] = 0.5,
	[146905321] = 0.5,
	[47332588] = 0.5,
	[-1118419705] = 0.5,
	[538002882] = -0.1,
	[-377849416] = 0.5,
	[96868307] = 0.5,
	[-1195678770] = 0.7,
	[-853526657] = -0.1,
	[652816835] = 0.8
}

RegisterNetEvent("target:animSentar")
AddEventHandler("target:animSentar",function(data)
	local ped = PlayerPedId()
	if GetEntityHealth(ped) > 101 then
		local objCoords = GetEntityCoords(data.entity)
        local objModel = GetEntityModel(data.entity)
        
		FreezeEntityPosition(data.entity,true)
		SetEntityCoords(ped,objCoords["x"],objCoords["y"],objCoords["z"] + chairs[objModel],1,0,0,0)
		if chairs[objModel] == 0.7 then
			SetEntityHeading(ped,GetEntityHeading(data.entity))
		else
			SetEntityHeading(ped,GetEntityHeading(data.entity) - 180.0)
		end
		local coords = GetEntityCoords(ped)
		TaskStartScenarioAtPosition(ped,"PROP_HUMAN_SEAT_CHAIR_MP_PLAYER",coords.x,coords.y,coords.z-1,GetEntityHeading(ped),0,0,false)
	end
end)

local beds = {
	[1631638868] = { 0.0,0.0 },
	[2117668672] = { 0.0,0.0 },
	[-1498379115] = { 1.0,90.0 },
	[-1519439119] = { 1.0,0.0 },
	[-289946279] = { 1.0,0.0 }
}

RegisterNetEvent("target:animDeitar")
AddEventHandler("target:animDeitar",function(data)
	local ped = PlayerPedId()
	if GetEntityHealth(ped) > 101 and beds[GetEntityModel(data.entity)] then
		local objCoords = GetEntityCoords(data.entity)
		SetEntityCoords(ped,objCoords["x"],objCoords["y"],objCoords["z"] + beds[GetEntityModel(data.entity)][1],1,0,0,0)
		SetEntityHeading(ped,GetEntityHeading(data.entity) + beds[GetEntityModel(data.entity)][2] - 180.0)
        local dictAnim = "anim@gangops@morgue@table@"
        RequestAnimDict(dictAnim)
        while not HasAnimDictLoaded(dictAnim) do Wait(10) end
        if HasAnimDictLoaded(dictAnim) then
            TaskPlayAnim(ped,dictAnim,"body_search",3.0,3.0,-1,1,0,0,0,0)
        end
	end
end)

api.addModel({ 684586828,577432224,-206690185,-1587184881,666561306,218085040,-58485588,-1426008804,-228596739,1437508529,-1096777189,1511880420,-468629664,1143474856,-2096124444,682791951,-115771139,1329570871,-130812911, },convert({
    options = {
        {
            icon = "fa-solid fa-trash",
            event = "inventory:verifyObjects",
            label = "Vasculhar",
            tunnel = "server"
        }
    },
    distance = 0.75
}))

api.addModel({ -1691644768,-742198632 },convert({
    options = {
        {
            icon = "fa-solid fa-bottle-water",
            event = "inventory:makeWater",
            label = "Encher",
            tunnel = "server",
        }
    },
    distance = 0.75
}))

api.addModel({ 1631638868,2117668672,-1498379115,-1519439119,-289946279 },convert({
    options = {
        {
            icon = "fa-solid fa-bed",
            event = "target:animDeitar",
            label = "Deitar",
            tunnel = "client"
        }
    },
    distance = 1.0
}))

api.addGlobalPlayer(convert({
    distance = 1.0,
    options = {
        {
            -- job = "police",      -- Descomentar caso queira revista apenas para policia
            icon = "fa-solid fa-people-robbery",
            action = function(data)
                if GetResourceState("ox_inventory") == "started" and data then
                    local nplayerid = NetworkGetPlayerIndexFromPed(data)
                    local nplayer = GetPlayerServerId(nplayerid)
                    TriggerServerEvent("ox_inventory:requestRevist", nplayer, IsEntityPlayingAnim(data,"random@arrests@busted","idle_a",3))
                end
            end,
            label = "Revistar",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-suitcase-medical",
            job = "ambulance",
            event = "paramedic:Revive",
            label = "Reanimar",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-stethoscope",
            job = "ambulance",
            event = "hospital:diagnostico",
            label = "Diagnóstico",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-notes-medical",
            job = "ambulance",
            event = "hospital:tratamento",
            label = "Tratamento",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-droplet",
            job = "ambulance",
            event = "hospital:sangramento",
            label = "Sangramento",
            tunnel = "server"
        },
    }
}))

api.addGlobalVehicle(convert({
    distance = 1.0,
    options = {
        {
            job = "police",
            icon = "fa-regular fa-id-card",
            event = "police:runPlate",
            label = "Verificar Placa",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-car-rear",
            event = "player:CheckTrunk",
            label = "Checar Porta-Malas",
            tunnel = "server"
        },
        {
            icon = "fa-solid fa-right-to-bracket",
            event = "player:EnterTrunk",
            label = "Entrar no Porta-Malas",
            tunnel = "server"
        }
    }
}))

local VehPlates = GlobalState["vehPlates"] or {}
AddStateBagChangeHandler("vehPlates","",function(name,key,value)
	VehPlates = value
end)

api.addGlobalVehicle({
    {
        icon = 'fa-solid fa-key',
        label = "Chave Veícular",
        distance = 2,
        canInteract = function(entity, distance, coords, name)
            if GetVehicleDoorLockStatus(entity) <= 1 then
                local plate = GetVehicleNumberPlateText(entity)
                return VehPlates[plate]
            end
        end,
        onSelect = function (data)
            local plate = GetVehicleNumberPlateText(data.entity)
            if plate then
                TriggerServerEvent("garages:Key",plate)
            end
        end,
    }
})

CreateThread(function()
    while GetResourceState("ox_inventory") ~= "started" do Wait(1000) end
    local ox_inventory = exports.ox_inventory
    ox_inventory:displayMetadata("plate", "Placa")
end)

--[[ 

    Jewelry robbery

]]

function AddCircleZone(name,center,radius,options,targetoptions)
    exports['target']:AddCircleZone(name,center,radius,options,targetoptions)
end

CreateThread(function()
    Wait(1000)
    if GetResourceState("will_robbery") == "started" then
		return
	end
    AddCircleZone("jewelry01",vector3(-626.67,-238.58,38.05),0.75,{
        name = "jewelry01",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "1")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry02",vector3(-625.66,-237.86,38.05),0.75,{
        name = "jewelry02",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "2")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry03",vector3(-626.84,-235.35,38.05),0.75,{
        name = "jewelry03",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "3")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry04",vector3(-625.83,-234.6,38.05),0.75,{
        name = "jewelry04",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "4")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry05",vector3(-626.9,-233.15,38.05),0.75,{
        name = "jewelry05",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "5")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry06",vector3(-627.94,-233.92,38.05),0.75,{
        name = "jewelry06",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "6")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry07",vector3(-620.22,-234.44,38.05),0.75,{
        name = "jewelry07",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "7")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry08",vector3(-619.16,-233.7,38.05),0.75,{
        name = "jewelry08",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "8")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry09",vector3(-617.56,-230.57,38.05),0.75,{
        name = "jewelry09",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "9")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry10",vector3(-618.29,-229.49,38.05),0.75,{
        name = "jewelry10",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "10")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry11",vector3(-619.68,-227.63,38.05),0.75,{
        name = "jewelry11",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "11")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry12",vector3(-620.43,-226.56,38.05),0.75,{
        name = "jewelry12",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "12")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry13",vector3(-623.92,-227.06,38.05),0.75,{
        name = "jewelry13",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "13")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry14",vector3(-624.97,-227.84,38.05),0.75,{
        name = "jewelry14",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "14")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry15",vector3(-624.42,-231.08,38.05),0.75,{
        name = "jewelry15",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "15")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry16",vector3(-623.98,-228.18,38.05),0.75,{
        name = "jewelry16",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "16")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry17",vector3(-621.08,-228.58,38.05),0.75,{
        name = "jewelry17",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "17")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry18",vector3(-619.72,-230.43,38.05),0.75,{
        name = "jewelry18",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "18")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry19",vector3(-620.14,-233.31,38.05),0.75,{
        name = "jewelry19",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "19")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
    
    AddCircleZone("jewelry20",vector3(-623.05,-232.95,38.05),0.75,{
        name = "jewelry20",
        heading = 3374176
    },{
        distance = 1.0,
        options = {
            {
                icon = "fa-solid fa-ring",
                action = function()
                    TriggerServerEvent("robberys:jewelry", "20")
                end,
                canInteract = function ()
                    return GlobalState['JewelryStatus']
                end,
                label = "Roubar",
                tunnel = "server"
            }
        }
    })
end)
