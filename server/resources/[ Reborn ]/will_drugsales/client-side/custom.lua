Framework = {}
local usingTable = false

function CreateTable(model)
	local mHash = GetHashKey(model)
	LoadModel(mHash)
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	local pedHeading = GetEntityHeading(ped) - 180
	local newObject = CreateObject(mHash,coords["x"],coords["y"],coords["z"],false,false,false)
	SetEntityCollision(newObject,false,false)
	SetEntityHeading(newObject,pedHeading)
	SetEntityAlpha(newObject,100,false)
	return newObject
end

RegisterNetEvent("will_drugsales:useTable",function(tableModel)
	if usingTable then return end
	if not CurrentZone and not Config.SellAnywhere then
		Framework:Notify(Config.Locales["disable_zone"])
		return
	end
	usingTable = true
	local tableIndex = 1
	local objectProgress = true
	local aplicationObject = false
	local newObject = CreateTable(tableModel or Config.TableProps[tableIndex])
	while objectProgress do
		local cam = GetGameplayCamCoord()
		local handle = StartExpensiveSynchronousShapeTestLosProbe(cam,GetCoordsFromCam(10.0,cam),-1,PlayerPedId(),4)
		local _,_,shapeCoords = GetShapeTestResult(handle)
		SetEntityCoordsNoOffset(newObject,shapeCoords["x"],shapeCoords["y"],shapeCoords["z"] + 0.5,true,false,false)

		if not tableModel then
			DrawLocalText("~g~G~w~  ALTERAR MESA",4,0.015,0.53,0.38,255,255,255,255)
		end
		DrawLocalText("~g~F~w~  CANCELAR",4,0.015,0.56,0.38,255,255,255,255)
		DrawLocalText("~g~E~w~  COLOCAR OBJETO",4,0.015,0.59,0.38,255,255,255,255)
		DrawLocalText("~y~SCROLL UP~w~  GIRA ESQUERDA",4,0.015,0.62,0.38,255,255,255,255)
		DrawLocalText("~y~SCROLL DOWN~w~  GIRA DIREITA",4,0.015,0.65,0.38,255,255,255,255)

		if IsControlJustPressed(1,38) then
			aplicationObject = true
			objectProgress = false
		end
		if IsControlJustPressed(1,47) and not tableModel then
			tableIndex = tableIndex + 1
			if not Config.TableProps[tableIndex] then
				tableIndex = 1
			end
			DeleteEntity(newObject)
			newObject = CreateTable(Config.TableProps[tableIndex])
		end
		if IsControlJustPressed(1,49) then
			objectProgress = false
		end
		if IsControlJustPressed(1,180) then
			local headObject = GetEntityHeading(newObject)
			SetEntityHeading(newObject,headObject + 2.5)
		end
		if IsControlJustPressed(1,181) then
			local headObject = GetEntityHeading(newObject)
			SetEntityHeading(newObject,headObject - 2.5)
		end
		Wait(1)
	end

	local headObject = GetEntityHeading(newObject)
	local coordsObject = GetEntityCoords(newObject)
	local _,GroundZ = GetGroundZFor_3dCoord(coordsObject["x"],coordsObject["y"],coordsObject["z"])
	local newCoords = {
		["x"] = coordsObject["x"],
		["y"] = coordsObject["y"],
		["z"] = GroundZ ~= 0.0 and GroundZ or coordsObject["z"]
	}
	usingTable = false
	DeleteEntity(newObject)
	if aplicationObject and OnAddTable() then
		TriggerServerEvent("will_drugsales:setTable",Config.TableProps[tableIndex],newCoords,headObject)
	end
end)

function GetCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot()
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))
	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

function DrawLocalText(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end

if Config.Framework == 'vrp' then
    function Framework:Notify(text)
        TriggerEvent("Notify","aviso",text,5000)
    end
	function Framework:GetItemName(item)
		if itemName and type(itemName) == "function" then
			return itemName(item)
		end
		local items = {}
		local loaded, result = pcall(function()
			return module('vrp',"Reborn/Itemlist")
		end)
		if loaded then
			items = result
		else
			loaded, result = pcall(function()
				return module('vrp',"cfg/items")
			end)
			if loaded then
				items = result
			end
		end
		if items[item] then
			return items[item].name or items[item].nome or item
		end
		return item
    end
end

if Config.Framework == 'qb' then
    local QBCore = exports['qb-core']:GetCoreObject()
    function Framework:Notify(text)
        return QBCore.Functions.Notify(text)
    end
	function Framework:GetItemName(item)
		local itemData = QBCore.Shared.Items[item]
		if itemData then
			return itemData.label
		end
		return item
    end
end

if Config.Framework == 'esx' then
    local ESX = exports.es_extended:getSharedObject()
    function Framework:Notify(text)
        ESX.ShowNotification(text, 'success', 3000)
    end
	function Framework:GetItemName(item)
		return item
    end
end

if Config.Target == 'ox' then
    function Framework:AddGlobalPed(options)
        exports.ox_target:addGlobalPed(options)
    end

    function Framework:RemoveGlobalPed(optionNames)
        exports.ox_target:removeGlobalPed(optionNames)
    end

	function Framework:AddLocalEntity(entity, options)
		exports.ox_target:addLocalEntity(entity,options)
	end
elseif Config.Target == 'qb' then
    function Framework:AddGlobalPed(options)
        exports['qb-target']:AddGlobalPed({
            options = options,
            distance = 4,
        })
    end

    function Framework:RemoveGlobalPed(optionNames)
        exports['qb-target']:RemoveGlobalPed(optionNames)
    end

	function Framework:AddLocalEntity(entity, options)
		exports['qb-target']:AddTargetEntity(entity,options)
	end
elseif Config.Target == 'target' then
	local globalPeds = {}
	local addingGlobalPed = false

	local GetPeds = function()
		local peds = {}
		local pedPool = GetGamePool("CPed")
		for i = 1, #pedPool, 1 do
			if not globalPeds[pedPool[i]] then
				globalPeds[pedPool[i]] = true
				peds[#peds + 1] = GetEntityModel(pedPool[i])
			end
		end
		return peds
	end

	ConvertOptions = function(options,ignore)
		local newOptions = {}
		newOptions.distance = options[1].distance
		newOptions.Distance = options[1].distance
		newOptions.options = {}
		for _,v in pairs(options) do
			local name = "will_drugsales:"..v.id
			newOptions.options[#newOptions.options + 1] = {
				event = name,
				label = v.label,
				tunnel = "client"
			}
			RegisterNetEvent(name,function (data)
				local ped = data[1] or data.entity or data
				if CanTarget(ped) or ignore then
					v.onSelect(ped)
				end
			end)
		end
		return newOptions
	end

    function Framework:AddGlobalPed(options)
		if addingGlobalPed then return end
		addingGlobalPed = true
		options = ConvertOptions(options)
		CreateThread(function ()
			while addingGlobalPed do
				local peds = GetPeds()
				exports['target']:AddTargetModel(peds,options)
				Wait(3000)
			end
		end)
    end

    function Framework:RemoveGlobalPed(optionNames)
        addingGlobalPed = false
		for ped,_ in pairs(globalPeds) do
			local hasExport = pcall(function()
				return exports['target']['RemoveTargetModel']
			end)
			if hasExport then
				exports['target']:RemoveTargetModel(GetEntityModel(ped))
			else
				error('No RemoveTargetModel in target script')
			end
		end

		--[[ 				-- Colocar no seu script de target
			function RemoveTargetModel(ped)
				Models[ped] = nil
			end
			exports("RemoveTargetModel",RemoveTargetModel)
		]]
    end

	function Framework:AddLocalEntity(entity, options)
		options = ConvertOptions(options,true)
		exports['target']:AddTargetModel(GetEntityModel(entity),options)
	end
elseif not Config.Target then
    function Framework:DrawText3D(x, y, z, text)
        local _, _x, _y=World3dToScreen2d(x,y,z)
		SetTextScale(0.35, 0.35)
		SetTextFont(4)
		SetTextProportional(true)
		SetTextColour(255, 255, 255, 215)
		SetTextEntry("STRING")
		SetTextCentre(true)
		AddTextComponentString(text)
		DrawText(_x,_y)
		local factor = (string.len(text)) / 370
		DrawRect(_x,_y+0.0125, 0.015+ factor, 0.03, 41, 11, 41, 68)
    end
end

function Framework:GetSellItems(zone)
    if Config.SellAnywhere then
        return Config.SellItems
    else
        return Config.SellZones[zone].items
    end
end

function Framework:GetRandomSell(zone)
    if Config.SellAnywhere then
        return Config.RandomSell
    else
        return Config.SellZones[zone].randomSellAmount
    end
end

local function isPedBlacklisted(ped)
	local model = GetEntityModel(ped)
	for i = 1, #Config.BlacklistPeds do
		if model == GetHashKey(Config.BlacklistPeds[i]) then
			return true
		end
	end
	return false
end

function CanTarget(entity)
	if not CurrentZone and not Config.SellAnywhere then return false end
	if not IsPedDeadOrDying(entity, false) and not IsPedInAnyVehicle(entity, false) and (GetPedType(entity)~=28) and (not IsPedAPlayer(entity)) and (not isPedBlacklisted(entity)) and not IsPedInAnyVehicle(PlayerPedId(), false) then
		return true
	end
end

function OnAddTable()
	local dict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@"
	local anim = "machinic_loop_mechandplayer"
	local pid = PlayerPedId()
	LoadAnim(dict)
	FreezeEntityPosition(pid, true)
	TaskPlayAnim(pid, dict, anim, 8.0, -8, 4000, 0, 1, false,false,false)
	TriggerServerEvent("will_drugsales:removeTableItem")
	Wait(4000)
	FreezeEntityPosition(pid, false)
	ClearPedTasks(pid)
	return true
end

function OnRemoveTable(table)
	local dict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@"
	local anim = "machinic_loop_mechandplayer"
	local pid = PlayerPedId()
	LoadAnim(dict)
	FreezeEntityPosition(pid, true)
	TaskPlayAnim(pid, dict, anim, 8.0, -8, 4000, 0, 1, false,false,false)
	Wait(4000)
	TriggerServerEvent("will_drugsales:addTableItem")
	FreezeEntityPosition(pid, false)
	ClearPedTasks(pid)
	return true
end

RegisterNetEvent('will_drugsales:client:policeAlert')
AddEventHandler('will_drugsales:client:policeAlert', function(targetCoords)
    ShowNotification(Config.Locales['police_alert'])
    local alpha = 250
    local drugAlert = AddBlipForRadius(targetCoords.x, targetCoords.y, targetCoords.z, 50.0)

    SetBlipHighDetail(drugAlert, true)
    SetBlipColour(drugAlert, 1)
    SetBlipAlpha(drugAlert, alpha)
    SetBlipAsShortRange(drugAlert, true)

    while alpha ~= 0 do
        Wait(500)
        alpha = alpha - 1
        SetBlipAlpha(drugAlert, alpha)
        if alpha == 0 then
            RemoveBlip(drugAlert)
            return
        end
    end
end)

if Config.Debug then
	RegisterCommand("testtable",function ()
		TriggerEvent("will_drugsales:useTable")
	end)
end

PedHashs = {
	"ig_abigail",
	"u_m_y_abner",
	"a_m_o_acult_02",
	"a_m_m_afriamer_01",
	"csb_mp_agent14",
	"csb_agent",
	"u_m_m_aldinapoli",
	"ig_amandatownley",
	"ig_andreas",
	"u_m_y_antonb",
	"csb_anita",
	"cs_andreas",
	"ig_ashley",
	"s_m_m_autoshop_01",
	"ig_money",
	"g_m_y_ballaeast_01",
	"g_m_y_ballaorig_01",
	"g_f_y_ballas_01",
	"u_m_y_babyd",
	"ig_barry",
	"s_m_y_barman_01",
	"u_m_y_baygor",
	"a_f_y_beach_01",
	"a_f_y_bevhills_02",
	"a_f_y_bevhills_01",
	"u_m_y_burgerdrug_01",
	"a_m_m_business_01",
	"a_f_m_business_02",
	"a_m_y_business_02",
	"ig_car3guy1",
	"ig_chef2",
	"g_m_m_chigoon_02",
	"g_m_m_chigoon_01",
	"ig_claypain",
	"ig_clay",
	"a_f_m_eastsa_01"
}