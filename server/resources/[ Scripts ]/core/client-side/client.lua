-----------------------------------------------------------------------------------------------------------------------------------------
-- BLIPS
-----------------------------------------------------------------------------------------------------------------------------------------
local blips = {
	{ 826.79,-972.39,26.25,544,75,"Sport Race",0.4 },
	{ -212.58,-1325.01,30.89,544,75,"Bennys",0.6 },
	{ 265.05,-1262.65,29.3,361,4,"Posto de Gasolina",0.4 },
	{ 819.02,-1027.96,26.41,361,4,"Posto de Gasolina",0.4 },
	{ 1208.61,-1402.43,35.23,361,4,"Posto de Gasolina",0.4 },
	{ 1181.48,-330.26,69.32,361,4,"Posto de Gasolina",0.4 },
	{ 621.01,268.68,103.09,361,4,"Posto de Gasolina",0.4 },
	{ 2581.09,361.79,108.47,361,4,"Posto de Gasolina",0.4 },
	{ 175.08,-1562.12,29.27,361,4,"Posto de Gasolina",0.4 },
	{ -319.76,-1471.63,30.55,361,4,"Posto de Gasolina",0.4 },
	{ 1782.33,3328.46,41.26,361,4,"Posto de Gasolina",0.4 },
	{ 49.42,2778.8,58.05,361,4,"Posto de Gasolina",0.4 },
	{ 264.09,2606.56,44.99,361,4,"Posto de Gasolina",0.4 },
	{ 1039.38,2671.28,39.56,361,4,"Posto de Gasolina",0.4 },
	{ 1207.4,2659.93,37.9,361,4,"Posto de Gasolina",0.4 },
	{ 2539.19,2594.47,37.95,361,4,"Posto de Gasolina",0.4 },
	{ 2679.95,3264.18,55.25,361,4,"Posto de Gasolina",0.4 },
	{ 2005.03,3774.43,32.41,361,4,"Posto de Gasolina",0.4 },
	{ 1687.07,4929.53,42.08,361,4,"Posto de Gasolina",0.4 },
	{ 1701.53,6415.99,32.77,361,4,"Posto de Gasolina",0.4 },
	{ 180.1,6602.88,31.87,361,4,"Posto de Gasolina",0.4 },
	{ -94.46,6419.59,31.48,361,4,"Posto de Gasolina",0.4 },
	{ -2555.17,2334.23,33.08,361,4,"Posto de Gasolina",0.4 },
	{ -1800.09,803.54,138.72,361,4,"Posto de Gasolina",0.4 },
	{ -1437.0,-276.8,46.21,361,4,"Posto de Gasolina",0.4 },
	{ -2096.3,-320.17,13.17,361,4,"Posto de Gasolina",0.4 },
	{ -724.56,-935.97,19.22,361,4,"Posto de Gasolina",0.4 },
	{ -525.26,-1211.19,18.19,361,4,"Posto de Gasolina",0.4 },
	{ -70.96,-1762.21,29.54,361,4,"Posto de Gasolina",0.4 },
	{ -434.09,-348.49,34.92,80,35,"Hospital",0.5 },
	{ -1077.14,-845.3,4.89,60,4,"Departamento Policial",0.6 },
	{ 25.68,-1346.6,29.5,52,36,"Loja de Departamento",0.5 },
	{ 2556.47,382.05,108.63,52,36,"Loja de Departamento",0.5 },
	{ 1163.55,-323.02,69.21,52,36,"Loja de Departamento",0.5 },
	{ -707.31,-913.75,19.22,52,36,"Loja de Departamento",0.5 },
	{ -47.72,-1757.23,29.43,52,36,"Loja de Departamento",0.5 },
	{ 373.89,326.86,103.57,52,36,"Loja de Departamento",0.5 },
	{ -3242.95,1001.28,12.84,52,36,"Loja de Departamento",0.5 },
	{ 1729.3,6415.48,35.04,52,36,"Loja de Departamento",0.5 },
	{ 548.0,2670.35,42.16,52,36,"Loja de Departamento",0.5 },
	{ 1960.69,3741.34,32.35,52,36,"Loja de Departamento",0.5 },
	{ 2677.92,3280.85,55.25,52,36,"Loja de Departamento",0.5 },
	{ 1698.5,4924.09,42.07,52,36,"Loja de Departamento",0.5 },
	{ -1820.82,793.21,138.12,52,36,"Loja de Departamento",0.5 },
	{ 1393.21,3605.26,34.99,52,36,"Loja de Departamento",0.5 },
	{ -2967.78,390.92,15.05,52,36,"Loja de Departamento",0.5 },
	{ -3040.14,585.44,7.91,52,36,"Loja de Departamento",0.5 },
	{ 1135.56,-982.24,46.42,52,36,"Loja de Departamento",0.5 },
	{ 1166.0,2709.45,38.16,52,36,"Loja de Departamento",0.5 },
	{ -1487.21,-378.99,40.17,52,36,"Loja de Departamento",0.5 },
	{ -1222.76,-907.21,12.33,52,36,"Loja de Departamento",0.5 },
	{ 1692.62,3759.50,34.70,76,6,"Loja de Armas",0.4 },
	{ 252.89,-49.25,69.94,76,6,"Loja de Armas",0.4 },
	{ 843.28,-1034.02,28.19,76,6,"Loja de Armas",0.4 },
	{ -331.35,6083.45,31.45,76,6,"Loja de Armas",0.4 },
	{ -663.15,-934.92,21.82,76,6,"Loja de Armas",0.4 },
	{ -1305.18,-393.48,36.69,76,6,"Loja de Armas",0.4 },
	{ -1118.80,2698.22,18.55,76,6,"Loja de Armas",0.4 },
	{ 2568.83,293.89,108.73,76,6,"Loja de Armas",0.4 },
	{ -3172.68,1087.10,20.83,76,6,"Loja de Armas",0.4 },
	{ 21.32,-1106.44,29.79,76,6,"Loja de Armas",0.4 },
	{ 811.19,-2157.67,29.61,76,6,"Loja de Armas",0.4 },
	{ -1213.44,-331.02,37.78,207,46,"Banco",0.5 },
	{ -351.59,-49.68,49.04,207,46,"Banco",0.5 },
	{ 313.47,-278.81,54.17,207,46,"Banco",0.5 },
	{ 149.35,-1040.53,29.37,207,46,"Banco",0.5 },
	{ -2962.60,482.17,15.70,207,46,"Banco",0.5 },
	{ -112.81,6469.91,31.62,207,46,"Banco",0.5 },
	{ 1175.74,2706.80,38.09,207,46,"Banco",0.5 },
	{ -51.82,-1111.38,26.44,225,4,"Concessionaria",0.5 },
	{ -815.12,-184.15,37.57,71,4,"Barbearia",0.5 },
	{ 138.13,-1706.46,29.3,71,4,"Barbearia",0.5 },
	{ -1280.92,-1117.07,7.0,71,4,"Barbearia",0.5 },
	{ 1930.54,3732.06,32.85,71,4,"Barbearia",0.5 },
	{ 1214.2,-473.18,66.21,71,4,"Barbearia",0.5 },
	{ -33.61,-154.52,57.08,71,4,"Barbearia",0.5 },
	{ -276.65,6226.76,31.7,71,4,"Barbearia",0.5 },
	{ 75.35,-1392.92,29.38,73,4,"Loja de Roupas",0.5 },
	{ -710.15,-152.36,37.42,73,4,"Loja de Roupas",0.5 },
	{ -163.73,-303.62,39.74,73,4,"Loja de Roupas",0.5 },
	{ -822.38,-1073.52,11.33,73,4,"Loja de Roupas",0.5 },
	{ -1193.13,-767.93,17.32,73,4,"Loja de Roupas",0.5 },
	{ -1449.83,-237.01,49.82,73,4,"Loja de Roupas",0.5 },
	{ 4.83,6512.44,31.88,73,4,"Loja de Roupas",0.5 },
	{ 1693.95,4822.78,42.07,73,4,"Loja de Roupas",0.5 },
	{ 125.82,-223.82,54.56,73,4,"Loja de Roupas",0.5 },
	{ 614.2,2762.83,42.09,73,4,"Loja de Roupas",0.5 },
	{ 1196.72,2710.26,38.23,73,4,"Loja de Roupas",0.5 },
	{ -3170.53,1043.68,20.87,73,4,"Loja de Roupas",0.5 },
	{ -1101.42,2710.63,19.11,73,4,"Loja de Roupas",0.5 },
	{ 425.6,-806.25,29.5,73,4,"Loja de Roupas",0.5 },

	{1322.88,-1652.58,52.28,75,4,"Tatuagens",0.4},
	{-1151.05,-1425.83,4.95,75,4,"Tatuagens",0.4 },
	{320.71,182.87,103.58,75,4,"Tatuagens",0.4 },
	{-3172.58,1074.11,20.82,75,4,"Tatuagens",0.4 },
	{1863.28,3747.38,33.03,75,4,"Tatuagens",0.4 },
	{-293.07,6200.77,31.48,75,4,"Tatuagens",0.4 },
	{ -1082.31,-247.59,37.77,498,4,"Central de Empregos",0.5 },
	{ -1728.06,-1050.69,1.71,266,4,"Embarcações",0.5 },
	{ 1966.36,3975.86,31.51,266,4,"Embarcações",0.5 },
	{ -776.72,-1495.02,2.29,266,4,"Embarcações",0.5 },
	{ -893.97,5687.78,3.29,266,4,"Embarcações",0.5 },
	{ 453.04,-608.15,28.6,513,4,"Motorista",0.5 },
	{ 239.31,242.81,106.69,67,4,"Transportador",0.5 },
	{ -837.97,5406.55,34.59,285,4,"Lenhador",0.5 },
	{ -1563.32,-975.79,13.02,68,4,"Pescador",0.5 },
	{ -1188.27,2727.94,2.4,68,4,"Pescador",0.5 },
	-- { -1592.68,-1005.43,13.03,68,4,"Venda De Peixes",0.5 },
	{ 11.27,-1599.34,29.38,540,4,"Food Grill",0.5},
	{ 132.6,-1305.06,29.2,93,4,"Bar",0.5 },
	{ -565.14,271.56,83.02,93,4,"Bar",0.5 },
	{ -469.3,-1721.89,18.69,318,4,"Lixeiro",0.7 },
	{ -1482.8, -1029.82, 6.14,305,1,"Salva-vidas",0.7 },
	{ 4.58,-705.95,45.98,351,4,"Escritório",0.7 },
	{ -117.29,-604.52,36.29,351,4,"Escritório",0.7 },
	{ -935.68,-378.77,38.97,351,4,"Escritório",0.7 },
	{ -428.56,-1728.33,19.79,467,11,"Reciclagem",0.6 },
	{ -741.56,5594.94,41.66,36,4,"Teleférico",0.6 },
	{ 454.46,5571.95,781.19,36,4,"Teleférico",0.6 },
	{ 408.17,-1635.57,29.3,515,4,"Reboque",0.7 },
	{ 1706.07,4791.75,41.98,515,4,"Reboque",0.7 }
}

CreateThread(function()
	for _,v in pairs(blips) do
		local blip = AddBlipForCoord(v[1],v[2],v[3])
		SetBlipSprite(blip,v[4])
		SetBlipAsShortRange(blip,true)
		SetBlipColour(blip,v[5])
		SetBlipScale(blip,v[7])
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString(v[6])
		EndTextCommandSetBlipName(blip)
	end
end)

CreateThread(function()
	local SUPPRESSED_MODELS = { "SHAMAL","LUXOR","LUXOR2","JET","LAZER","TITAN","BARRACKS","BARRACKS2","CRUSADER","RHINO","AIRTUG","RIPLEY","PHANTOM","HAULER","RUBBLE","BIFF","TACO","PACKER","TRAILERS","TRAILERS2","TRAILERS3","TRAILERS4","BLIMP","POLMAV","MULE","MULE2","MULE3","MULE4" }
	while true do
		InvalidateIdleCam()
        InvalidateVehicleIdleCam()
		DistantCopCarSirens(false)

        SetCreateRandomCops(false)
        CancelCurrentPoliceReport()
        SetCreateRandomCopsOnScenarios(false)
        SetCreateRandomCopsNotOnScenarios(false)

        SetPedInfiniteAmmoClip(PlayerPedId(),false)
		for _,model in next,SUPPRESSED_MODELS do
			SetVehicleModelIsSuppressed(GetHashKey(model),true)
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WEAPONS DAMAGE
-----------------------------------------------------------------------------------------------------------------------------------------
local weaponsDamage = {
	['WEAPON_UNARMED'] = 0.1,
	['WEAPON_FLASHLIGHT'] = 0.1,
	['WEAPON_NIGHTSTICK'] = 0.1,
	['WEAPON_HATCHET'] = 0.6,
	['WEAPON_KNIFE'] = 0.7,
	['WEAPON_BAT'] = 0.3,
	['WEAPON_BATTLEAXE'] = 0.5,
	['WEAPON_BOTTLE'] = 0.3,
	['WEAPON_CROWBAR'] = 0.3,
	['WEAPON_DAGGER'] = 0.2,
	['WEAPON_GOLFCLUB'] = 0.1,
	['WEAPON_HAMMER'] = 0.2,
	['WEAPON_MACHETE'] = 0.1,
	['WEAPON_POOLCUE'] = 0.1,
	['WEAPON_STONE_HATCHET'] = 0.2,
	['WEAPON_SWITCHBLADE'] = 0.2,
	['WEAPON_WRENCH'] = 0.3,
	['WEAPON_KNUCKLE'] = 0.3,
	['WEAPON_SAWNOFFSHOTGUN'] = 1.3,
	['WEAPON_PUMPSHOTGUN'] = 2.0,
}

CreateThread(function()
	while true do
		for weapon,damage in pairs(weaponsDamage) do
			SetWeaponDamageModifier(GetHashKey(weapon),damage)
		end

		RemoveAllPickupsOfType("PICKUP_WEAPON_KNIFE")
		RemoveAllPickupsOfType("PICKUP_WEAPON_PISTOL")
		RemoveAllPickupsOfType("PICKUP_WEAPON_MINISMG")
		RemoveAllPickupsOfType("PICKUP_WEAPON_MICROSMG")
		RemoveAllPickupsOfType("PICKUP_WEAPON_PUMPSHOTGUN")
		RemoveAllPickupsOfType("PICKUP_WEAPON_CARBINERIFLE")
		RemoveAllPickupsOfType("PICKUP_WEAPON_SAWNOFFSHOTGUN")

		HideHudComponentThisFrame(1)
		HideHudComponentThisFrame(2)
		HideHudComponentThisFrame(3)
		HideHudComponentThisFrame(4)
		HideHudComponentThisFrame(5)
		HideHudComponentThisFrame(6)
		HideHudComponentThisFrame(7)
		HideHudComponentThisFrame(8)
		HideHudComponentThisFrame(9)
		HideHudComponentThisFrame(10)
		HideHudComponentThisFrame(11)
		HideHudComponentThisFrame(12)
		HideHudComponentThisFrame(13)
		HideHudComponentThisFrame(15)
		HideHudComponentThisFrame(17)
		HideHudComponentThisFrame(18)
		-- HideHudComponentThisFrame(19)	-- WEAPON_WHEEL
		HideHudComponentThisFrame(20)
		HideHudComponentThisFrame(21)
		HideHudComponentThisFrame(22)

		-- DisableControlAction(1,37,true)	-- TAB
		--[[ DisableControlAction(1,157,true)
		DisableControlAction(1,158,true)
		DisableControlAction(1,159,true)
		DisableControlAction(1,160,true)
		DisableControlAction(1,161,true)
		DisableControlAction(1,162,true)
		DisableControlAction(1,163,true)
		DisableControlAction(1,164,true)
		DisableControlAction(1,165,true) ]]

		DisablePlayerVehicleRewards(PlayerId())
		
		if GetPlayerWantedLevel(PlayerId()) ~= 0 then
			ClearPlayerWantedLevel(PlayerId())
		end
		ClearAreaOfPeds(549.69,-3149.5,6.07,200.0,false)  -- Remove ped Mafia
		Wait(0)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- RECOIL
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local ped = PlayerPedId()

		if IsPedArmed(ped,6) then
			DisableControlAction(1,140,true)
			DisableControlAction(1,141,true)
			DisableControlAction(1,142,true)
			Wait(4)
		else
			Wait(1500)
		end

		if IsPedShooting(ped) then
			local cam = GetFollowPedCamViewMode()
			local veh = IsPedInAnyVehicle(ped)
			
			local speed = math.ceil(GetEntitySpeed(ped))
			if speed > 70 then
				speed = 70
			end

			local _,wep = GetCurrentPedWeapon(ped)
			local class = GetWeapontypeGroup(wep)
			local p = GetGameplayCamRelativePitch()
			local camDist = #(GetGameplayCamCoord() - GetEntityCoords(ped))

			local recoil = math.random(110,120+(math.ceil(speed*0.5)))/100
			local rifle = false

			if class == 970310034 or class == 1159398588 then
				rifle = true
			end

			if camDist < 5.3 then
				camDist = 0.7
			elseif camDist < 10.0 then
				camDist = 1.5
			else
				camDist =  2.0
			end

			if veh then
				recoil = recoil + (recoil * camDist)
			else
				recoil = recoil * 0.1
			end

			if cam == 4 then
				recoil = recoil * 0.6
				if rifle then
					recoil = recoil * 0.1
				end
			end

			if rifle then
				recoil = recoil * 0.6
			end

			local spread = math.random(4)
			local h = GetGameplayCamRelativeHeading()
			local hf = math.random(10,40+speed) / 100

			if veh then
				hf = hf * 2.0
			end

			if spread == 1 then
				SetGameplayCamRelativeHeading(h+hf)
			elseif spread == 2 then
				SetGameplayCamRelativeHeading(h-hf)
			end

			local set = p + recoil - 0.2
			SetGameplayCamRelativePitch(set,1.0)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ISLAND
-----------------------------------------------------------------------------------------------------------------------------------------
local Island = {
	"h4_islandairstrip",
	"h4_islandairstrip_props",
	"h4_islandx_mansion",
	"h4_islandx_mansion_props",
	"h4_islandx_props",
	"h4_islandxdock",
	"h4_islandxdock_props",
	"h4_islandxdock_props_2",
	"h4_islandxtower",
	"h4_islandx_maindock",
	"h4_islandx_maindock_props",
	"h4_islandx_maindock_props_2",
	"h4_IslandX_Mansion_Vault",
	"h4_islandairstrip_propsb",
	"h4_beach",
	"h4_beach_props",
	"h4_beach_bar_props",
	"h4_islandx_barrack_props",
	"h4_islandx_checkpoint",
	"h4_islandx_checkpoint_props",
	"h4_islandx_Mansion_Office",
	"h4_islandx_Mansion_LockUp_01",
	"h4_islandx_Mansion_LockUp_02",
	"h4_islandx_Mansion_LockUp_03",
	"h4_islandairstrip_hangar_props",
	"h4_IslandX_Mansion_B",
	"h4_islandairstrip_doorsclosed",
	"h4_Underwater_Gate_Closed",
	"h4_mansion_gate_closed",
	"h4_aa_guns",
	"h4_IslandX_Mansion_GuardFence",
	"h4_IslandX_Mansion_Entrance_Fence",
	"h4_IslandX_Mansion_B_Side_Fence",
	"h4_IslandX_Mansion_Lights",
	"h4_islandxcanal_props",
	"h4_beach_props_party",
	"h4_islandX_Terrain_props_06_a",
	"h4_islandX_Terrain_props_06_b",
	"h4_islandX_Terrain_props_06_c",
	"h4_islandX_Terrain_props_05_a",
	"h4_islandX_Terrain_props_05_b",
	"h4_islandX_Terrain_props_05_c",
	"h4_islandX_Terrain_props_05_d",
	"h4_islandX_Terrain_props_05_e",
	"h4_islandX_Terrain_props_05_f",
	"h4_islandx_terrain_01",
	"h4_islandx_terrain_02",
	"h4_islandx_terrain_03",
	"h4_islandx_terrain_04",
	"h4_islandx_terrain_05",
	"h4_islandx_terrain_06",
	"h4_ne_ipl_00",
	"h4_ne_ipl_01",
	"h4_ne_ipl_02",
	"h4_ne_ipl_03",
	"h4_ne_ipl_04",
	"h4_ne_ipl_05",
	"h4_ne_ipl_06",
	"h4_ne_ipl_07",
	"h4_ne_ipl_08",
	"h4_ne_ipl_09",
	"h4_nw_ipl_00",
	"h4_nw_ipl_01",
	"h4_nw_ipl_02",
	"h4_nw_ipl_03",
	"h4_nw_ipl_04",
	"h4_nw_ipl_05",
	"h4_nw_ipl_06",
	"h4_nw_ipl_07",
	"h4_nw_ipl_08",
	"h4_nw_ipl_09",
	"h4_se_ipl_00",
	"h4_se_ipl_01",
	"h4_se_ipl_02",
	"h4_se_ipl_03",
	"h4_se_ipl_04",
	"h4_se_ipl_05",
	"h4_se_ipl_06",
	"h4_se_ipl_07",
	"h4_se_ipl_08",
	"h4_se_ipl_09",
	"h4_sw_ipl_00",
	"h4_sw_ipl_01",
	"h4_sw_ipl_02",
	"h4_sw_ipl_03",
	"h4_sw_ipl_04",
	"h4_sw_ipl_05",
	"h4_sw_ipl_06",
	"h4_sw_ipl_07",
	"h4_sw_ipl_08",
	"h4_sw_ipl_09",
	"h4_islandx_mansion",
	"h4_islandxtower_veg",
	"h4_islandx_sea_mines",
	"h4_islandx",
	"h4_islandx_barrack_hatch",
	"h4_islandxdock_water_hatch",
	"h4_beach_party"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADCAYO
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	local CayoPerico = false

	while true do
		local Ped = PlayerPedId()
		local Coords = GetEntityCoords(Ped)

		if #(Coords - vec3(4840.57,-5174.42,2.0)) <= 2000 then
			if not CayoPerico then
				for _,v in pairs(Island) do
					RequestIpl(v)
				end

				SetIslandHopperEnabled("HeistIsland",true)
				SetAiGlobalPathNodesType(1)
				SetDeepOceanScaler(0.0)
				LoadGlobalWaterType(1)
				CayoPerico = true
			end
		else
			if CayoPerico then
				for _,v in pairs(Island) do
					RemoveIpl(v)
				end

				SetIslandHopperEnabled("HeistIsland",false)
				SetAiGlobalPathNodesType(0)
				SetDeepOceanScaler(1.0)
				LoadGlobalWaterType(0)
				CayoPerico = false
			end
		end
		Wait(1000)
	end
end)