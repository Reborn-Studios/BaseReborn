-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Blip = nil
local Objects = {}
local Active = false
local FxAsset = "scr_indep_fireworks"

AddRelationshipGroup('GuardPeds')
SetRelationshipBetweenGroups(0, GetHashKey("GuardPeds"), GetHashKey("GuardPeds"))
SetRelationshipBetweenGroups(5, GetHashKey("GuardPeds"), GetHashKey("PLAYER"))
SetRelationshipBetweenGroups(5, GetHashKey("PLAYER"), GetHashKey("GuardPeds"))
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if Active and Components[Active] then
			local Ped = PlayerPedId()
			local Crashed = Components[Active]
			local Coords = GetEntityCoords(Ped)
			local Distance = #(Coords - Crashed["1"][1])

			if Distance <= 250 then
				for Number,v in pairs(Crashed) do
					if not Objects[Number] and LoadModel(v[3]) then
						Objects[Number] = CreateObjectNoOffset(v[3],v[1],false,false,false)
						PlaceObjectOnGroundProperly(Objects[Number])
						FreezeEntityPosition(Objects[Number],true)
						SetEntityLodDist(Objects[Number],0xFFFF)
						SetEntityHeading(Objects[Number],v[2])

						SetPedRelationshipGroupHash(Ped, GetHashKey('PLAYER'))

						local model = "s_m_y_blackops_01"
						LoadModel(model)
						Objects[Number.."ped"] = CreatePed(26, GetHashKey(model),v[1], true, true)
						NetworkRegisterEntityAsNetworked(Objects[Number.."ped"])
						local networkID = NetworkGetNetworkIdFromEntity(Objects[Number.."ped"])
						SetNetworkIdCanMigrate(networkID, true)
						SetNetworkIdExistsOnAllMachines(networkID, true)
						SetPedRandomComponentVariation(Objects[Number.."ped"], 0)
						SetPedRandomProps(Objects[Number.."ped"])
						SetEntityAsMissionEntity(Objects[Number.."ped"], false, false)
						SetEntityVisible(Objects[Number.."ped"], true, false)
						SetPedRelationshipGroupHash(Objects[Number.."ped"], GetHashKey("GuardPeds"))
						SetPedAccuracy(Objects[Number.."ped"], 50)
						SetPedArmour(Objects[Number.."ped"], 100)
						SetPedCanSwitchWeapon(Objects[Number.."ped"], true)
						SetPedDropsWeaponsWhenDead(Objects[Number.."ped"], false)
						SetPedFleeAttributes(Objects[Number.."ped"], 0, false)
						GiveWeaponToPed(Objects[Number.."ped"], GetHashKey('WEAPON_PISTOL'), 255, false, false)
						local random = math.random(1, 2)
						if random == 2 then
							TaskGuardCurrentPosition(Objects[Number.."ped"], 10.0, 10.0, 1)
						end

						if Number ~= "1" then
							exports["target"]:AddBoxZone("Helicrash:"..Number,v[1],1.25,2.0,{
								name = "Helicrash:"..Number,
								heading = v[2],
								minZ = v[1]["z"] - 1.00,
								maxZ = v[1]["z"] + 0.25
							},{
								shop = "Helicrash-"..Number,
								Distance = 1.75,
								options = {
									{
										event = "helicrash:Open",
										label = "Abrir",
										icon = "fa-solid fa-helicopter",
										tunnel = "shop",
										service = "Helicrash-"..Number
									}
								}
							})
						end
					end
				end
			else
				if Objects["1"] then
					for Number,v in pairs(Objects) do
						if Number ~= "1" then
							exports["target"]:RemCircleZone("Helicrash:"..Number)
						end
						DeleteEntity(Objects[Number])
						Objects[Number] = nil
					end
				end
			end
		end

		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SOM
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("playMaydaySound")
AddEventHandler("playMaydaySound", function()
    TriggerEvent("sounds:source", "drop", 0.4)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDSTATEBAGCHANGEHANDLER
-----------------------------------------------------------------------------------------------------------------------------------------
AddStateBagChangeHandler("Helicrash",nil,function(Name,Key,Value)
	if DoesBlipExist(Blip) then
		RemoveBlip(Blip)
	end

	Active = Value

	if not Value then
		if Objects["1"] then
			for Number,_ in pairs(Objects) do
				if Number ~= "1" then
					exports["target"]:RemCircleZone("Helicrash:"..Number)

					if DoesEntityExist(Objects[Number]) then
						DeleteEntity(Objects[Number])
					end

					Objects[Number] = nil
				end
			end
		end
	else
		HeliBlip(Active)

		if Objects["1"] then
			for Number,v in pairs(Objects) do
				exports["target"]:RemCircleZone("Helicrash:"..Number)

				if DoesEntityExist(Objects[Number]) then
					DeleteEntity(Objects[Number])
				end

				Objects[Number] = nil
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GLOBALSTATE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("onClientResourceStart")
AddEventHandler("onClientResourceStart",function(Resource)
	if (GetCurrentResourceName() ~= Resource) then
		return
	end

	if GlobalState["Helicrash"] then
		Active = GlobalState["Helicrash"]
		HeliBlip(Active)
	end

	if GlobalState["Firework"] then
		for i = 1,#Locations,1 do
			TriggerEvent("firework:"..Locations[i]["Type"],Locations[i]["Coords"])
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HELIBLIP
-----------------------------------------------------------------------------------------------------------------------------------------
function HeliBlip(Number)
	if Components[Number] then
		Blip = AddBlipForCoord(Components[Number]["1"][1],Components[Number]["1"][2],Components[Number]["1"][3])
		SetBlipSprite(Blip,43)
		SetBlipDisplay(Blip,4)
		SetBlipAsShortRange(Blip,true)
		SetBlipColour(Blip,5)
		SetBlipScale(Blip,0.8)
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString("Helicóptero")
		EndTextCommandSetBlipName(Blip)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDSTATEBAGCHANGEHANDLER
-----------------------------------------------------------------------------------------------------------------------------------------
AddStateBagChangeHandler("Firework",nil,function(Name,Key,Value)
	if Value then
		for i = 1,#Locations,1 do
			TriggerEvent("firework:"..Locations[i]["Type"],Locations[i]["Coords"])
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FIREWORK:BATTERY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("firework:Battery")
AddEventHandler("firework:Battery",function(Coords)
    RequestNamedPtfxAsset(FxAsset)
    while not HasNamedPtfxAssetLoaded(FxAsset) do
        Wait(1)
	end
	
	repeat
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(4000)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_trailburst",Coords,0.0,0.0,0.0,math.random() * 0.5 + 2.8,false,false,false,false)
		Wait(1500)
	until not GlobalState["Firework"]
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FIREWORK:ROCKET
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("firework:Rocket")
AddEventHandler("firework:Rocket",function(Coords)
	while not HasNamedPtfxAssetLoaded(FxAsset) do
        Wait(1)
    end

	repeat
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_starburst",Coords,0.0,0.0,0.0,2.5,false,false,false,false)
		Wait(1500)
	until not GlobalState["Firework"]
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FIREWORK:FOUNTAIN
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("firework:Fountain")
AddEventHandler("firework:Fountain",function(Coords)
	RequestNamedPtfxAsset(FxAsset)
    while not HasNamedPtfxAssetLoaded(FxAsset) do
        Wait(1)
	end
	
	repeat
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 0.5 + 1.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 1.5 + 2.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 1.5 + 2.8,false,false,false,false)
		Wait(1500)
		UseParticleFxAsset(FxAsset)
		SetParticleFxNonLoopedColour(math.random(),math.random(),math.random())
		StartNetworkedParticleFxNonLoopedAtCoord("scr_indep_firework_fountain",Coords,0.0,0.0,0.0,math.random() * 1.5 + 2.8,false,false,false,false)
		Wait(1500)
	until not GlobalState["Firework"]
end)