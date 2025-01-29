-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Objects = {}
local initObjects = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTS:TABLE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("objects:Table")
AddEventHandler("objects:Table",function(Table)
	Objects = Table
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTS:ADICIONAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("objects:Adicionar")
AddEventHandler("objects:Adicionar",function(Number,Table)
	Objects[Number] = Table
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTCOORDS
-----------------------------------------------------------------------------------------------------------------------------------------
local function targetLabel(x,y,z,Number,item,mode)
	if mode == "1" then
		exports["target"]:AddCircleZone("Objects:"..Number,vector3(x,y,z),1.0,{
			name = "Objects:"..Number,
			heading = 3374176
		},{
			distance = 1.5,
			options = {
				{
					action = function ()
						TriggerEvent("objects:Guardar",Number)
					end,
					label = "Guardar",
					tunnel = "client"
				},{
					event = "inventory:makeProducts",
					label = "Produzir",
					tunnel = "police",
					service = item
				}
			}
		})
	elseif mode == "2" then
		exports["target"]:AddCircleZone("Objects:"..Number,vector3(x,y,z),0.75,{
			name = "Objects:"..Number,
			heading = 3374176
		},{
			distance = 2.5,
			options = {
				{
					event = "inventory:makeProducts",
					label = "Cozinhar Filé de Peixe",
					tunnel = "police",
					service = "fishfillet"
				},{
					event = "inventory:makeProducts",
					label = "Cozinhar Carne Animal",
					tunnel = "police",
					service = "animalmeat"
				},{
					event = "inventory:makeProducts",
					label = "Assar Marshmallow",
					tunnel = "police",
					service = "marshmallow"
				}
			}
		})
	elseif mode == "3" then
		exports["target"]:AddCircleZone("Objects:"..Number,vector3(x,y,z),1.0,{
			name = "Objects:"..Number,
			heading = 3374176
		},{
			distance = 1.5,
			options = {
				{
					action = function ()
						TriggerEvent("objects:Guardar",Number)
					end,
					label = "Guardar",
					tunnel = "client"
				}
			}
		})
	elseif mode == "4" then
		exports["target"]:AddCircleZone("Objects:"..Number,vector3(x,y,z),1.0,{
			name = "Objects:"..Number,
			heading = 3374176
		},{
			distance = 1.5,
			options = {
				{
					action = function ()
						TriggerEvent("objects:Guardar",Number)
					end,
					label = "Guardar",
					tunnel = "client"
				},{
					event = "vRP:Sentar",
					label = "Sentar",
					tunnel = "client"
				}
			}
		})
	elseif mode == "5" then
		exports["target"]:AddCircleZone("Objects:"..Number,vector3(x,y,z),1.0,{
			name = "Objects:"..Number,
			heading = 3374176
		},{
			distance = 1.5,
			options = {
				{
					action = function ()
						TriggerEvent("objects:Guardar",Number)
					end,
					label = "Guardar",
					tunnel = "client"
				},{
					event = "shops:medicBag",
					label = "Abrir",
					tunnel = "client"
				}
			}
		})
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADOBJECTS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)

		for k,v in pairs(Objects) do
			local distance = #(coords - vector3(v["x"],v["y"],v["z"]))
			if distance <= v["distance"] then
				if initObjects[k] == nil then
					local mHash = GetHashKey(v["object"])

					RequestModel(mHash)
					while not HasModelLoaded(mHash) do
						Wait(1)
					end

					if HasModelLoaded(mHash) then
						targetLabel(v["x"],v["y"],v["z"],k,v["item"],v["mode"])

						initObjects[k] = CreateObject(mHash,v["x"],v["y"],v["z"],false,false,false)
						FreezeEntityPosition(initObjects[k],true)
						SetEntityHeading(initObjects[k],v["h"])
						SetEntityLodDist(initObjects[k],0xFFFF)
						SetModelAsNoLongerNeeded(mHash)
					end
				end
			else
				if initObjects[k] then
					exports["target"]:RemCircleZone("Objects:"..k)

					if DoesEntityExist(initObjects[k]) then
						DeleteEntity(initObjects[k])
						initObjects[k] = nil
					end
				end
			end
		end

		Wait(3000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTS:GUARDAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("objects:Guardar")
AddEventHandler("objects:Guardar",function(Number)
	TriggerServerEvent("objects:Guardar",Number)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTS:REMOVER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("objects:Remover")
AddEventHandler("objects:Remover",function(Number)
	Objects[Number] = nil

	if initObjects[Number] then
		exports["target"]:RemCircleZone("Objects:"..Number)

		if DoesEntityExist(initObjects[Number]) then
			DeleteEntity(initObjects[Number])
			initObjects[Number] = nil
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETCOORDSFROMCAM
-----------------------------------------------------------------------------------------------------------------------------------------
function GetCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot(0)
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))

	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- OBJECTCOORDS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.objectCoords(model)
	local ped = PlayerPedId()
	local objectProgress = true
	local aplicationObject = false
	local mHash = GetHashKey(model)

	RequestModel(mHash)
	while not HasModelLoaded(mHash) do
		Wait(1)
	end

	local pedCoords = GetEntityCoords(ped)
	local pedHeading = GetEntityHeading(ped)
	local newObject = CreateObject(mHash,pedCoords["x"],pedCoords["y"],pedCoords["z"],false,false,false)
	SetEntityCollision(newObject,false,false)
	SetEntityHeading(newObject,pedHeading)
	SetEntityAlpha(newObject,100,false)

	while objectProgress do
		local cam = GetGameplayCamCoord()
		local cdsCam = GetCoordsFromCam(10.0,cam)
		local handle = StartExpensiveSynchronousShapeTestLosProbe(cam.x,cam.y,cam.z,cdsCam.x,cdsCam.y,cdsCam.z,-1,ped,4)
		local _,_,coords = GetShapeTestResult(handle)

		SetEntityCoordsNoOffset(newObject,coords["x"],coords["y"],coords["z"],true,false,false)

		DrwTxt("~g~F~w~  CANCELAR",4,0.015,0.86,0.38,255,255,255,255)
		DrwTxt("~g~E~w~  COLOCAR OBJETO",4,0.015,0.89,0.38,255,255,255,255)
		DrwTxt("~y~SCROLL UP~w~  GIRA ESQUERDA",4,0.015,0.92,0.38,255,255,255,255)
		DrwTxt("~y~SCROLL DOWN~w~  GIRA DIREITA",4,0.015,0.95,0.38,255,255,255,255)

		if IsControlJustPressed(1,38) then
			aplicationObject = true
			objectProgress = false
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

	local newCoords = {
		["x"] = coordsObject["x"],
		["y"] = coordsObject["y"],
		["z"] = coordsObject["z"]
	}

	DeleteEntity(newObject)

	return aplicationObject,newCoords,headObject
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DWTEXT
-----------------------------------------------------------------------------------------------------------------------------------------
function DrwTxt(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAIRS
-----------------------------------------------------------------------------------------------------------------------------------------
local chairs = {
	[536071214] = 0.5
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP:SENTAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vRP:Sentar")
AddEventHandler("vRP:Sentar",function(Number)
	local ped = PlayerPedId()
	local model = GetEntityModel(initObjects[Number])
	local heading = GetEntityHeading(initObjects[Number])
	local objCoords = GetEntityCoords(initObjects[Number])
	SetEntityCoords(ped,objCoords["x"],objCoords["y"],objCoords["z"] + chairs[model],true,false,false,false)
	SetEntityHeading(ped,heading - 180.0)
	tvRP.playAnim(false,{ task = "PROP_HUMAN_SEAT_CHAIR_MP_PLAYER" },false)
end)
