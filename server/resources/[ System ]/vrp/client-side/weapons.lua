-----------------------------------------------------------------------------------------------------------------------------------------
-- WEAPONTYPES
-----------------------------------------------------------------------------------------------------------------------------------------
local weapon_list = {}
local weapon_types = {
	"GADGET_PARACHUTE",
	"WEAPON_KNIFE",
	"WEAPON_KNUCKLE",
	"WEAPON_NIGHTSTICK",
	"WEAPON_HAMMER",
	"WEAPON_BAT",
	"WEAPON_GOLFCLUB",
	"WEAPON_CROWBAR",
	"WEAPON_BOTTLE",
	"WEAPON_DAGGER",
	"WEAPON_HATCHET",
	"WEAPON_MACHETE",
	"WEAPON_FLASHLIGHT",
	"WEAPON_SWITCHBLADE",
	"WEAPON_POOLCUE",
	"WEAPON_PIPEWRENCH",
	"WEAPON_STONE_HATCHET",
	"WEAPON_WRENCH",
	"WEAPON_BATTLEAXE",
	"WEAPON_AUTOSHOTGUN",
	"WEAPON_GRENADE",
	"WEAPON_STICKYBOMB",
	"WEAPON_PROXMINE",
	"WEAPON_BZGAS",
	"WEAPON_SMOKEGRENADE",
	"WEAPON_MOLOTOV",
	"WEAPON_FIREEXTINGUISHER",
	"WEAPON_PETROLCAN",
	"WEAPON_SNOWBALL",
	"WEAPON_FLARE",
	"WEAPON_BALL",
	"WEAPON_PISTOL",
	"WEAPON_PISTOL_MK2",
	"WEAPON_COMBATPISTOL",
	"WEAPON_APPISTOL",
	"WEAPON_REVOLVER",
	"WEAPON_REVOLVER_MK2",
	"WEAPON_DOUBLEACTION",
	"WEAPON_PISTOL50",
	"WEAPON_SNSPISTOL",
	"WEAPON_SNSPISTOL_MK2",
	"WEAPON_HEAVYPISTOL",
	"WEAPON_VINTAGEPISTOL",
	"WEAPON_STUNGUN",
	"WEAPON_FLAREGUN",
	"WEAPON_MARKSMANPISTOL",
	"WEAPON_RAYPISTOL",
	"WEAPON_MICROSMG",
	"WEAPON_MINISMG",
	"WEAPON_SMG",
	"WEAPON_SMG_MK2",
	"WEAPON_ASSAULTSMG",
	"WEAPON_COMBATPDW",
	"WEAPON_GUSENBERG",
	"WEAPON_MACHINEPISTOL",
	"WEAPON_MG",
	"WEAPON_COMBATMG",
	"WEAPON_COMBATMG_MK2",
	"WEAPON_RAYCARBINE",
	"WEAPON_ASSAULTRIFLE",
	"WEAPON_ASSAULTRIFLE_MK2",
	"WEAPON_CARBINERIFLE",
	"WEAPON_CARBINERIFLE_MK2",
	"WEAPON_ADVANCEDRIFLE",
	"WEAPON_SPECIALCARBINE",
	"WEAPON_SPECIALCARBINE_MK2",
	"WEAPON_BULLPUPRIFLE",
	"WEAPON_BULLPUPRIFLE_MK2",
	"WEAPON_COMPACTRIFLE",
	"WEAPON_PUMPSHOTGUN",
	"WEAPON_PUMPSHOTGUN_MK2",
	"WEAPON_SWEEPERSHOTGUN",
	"WEAPON_SAWNOFFSHOTGUN",
	"WEAPON_BULLPUPSHOTGUN",
	"WEAPON_ASSAULTSHOTGUN",
	"WEAPON_MUSKET",
	"WEAPON_HEAVYSHOTGUN",
	"WEAPON_DBSHOTGUN",
	"WEAPON_SNIPERRIFLE",
	"WEAPON_HEAVYSNIPER",
	"WEAPON_HEAVYSNIPER_MK2",
	"WEAPON_MARKSMANRIFLE",
	"WEAPON_MARKSMANRIFLE_MK2",
	"WEAPON_GRENADELAUNCHER",
	"WEAPON_GRENADELAUNCHER_SMOKE",
	"WEAPON_RPG",
	"WEAPON_MINIGUN",
	"WEAPON_FIREWORK",
	"WEAPON_RAILGUN",
	"WEAPON_HOMINGLAUNCHER",
	"WEAPON_COMPACTLAUNCHER",
	"WEAPON_RAYMINIGUN",
	"WEAPON_PIPEBOMB"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETWEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getWeapons()
	local ped = PlayerPedId()
	local weapons = {}
	local ammo_types = {}
	for k,v in pairs(weapon_types) do
		local hash = GetHashKey(v)
		if HasPedGotWeapon(ped,hash,false) then
			local weapon = {}
			weapons[v] = weapon
			local atype = GetPedAmmoTypeFromWeapon(ped,hash)
			if ammo_types[atype] == nil then
				ammo_types[atype] = true
				weapon.ammo = GetAmmoInPedWeapon(ped,hash)
			else
				weapon.ammo = 0
			end
		end
	end
	weapons = tvRP.legalWeaponsChecker(weapons)
	return weapons
end

function tvRP.legalWeaponsChecker(weapon)
	local weapons_legal = tvRP.getWeaponsLegal()
	local ilegal = false
	for v, b in pairs(weapon) do
		if not weapon_list[v] then
			ilegal = true
		end
	end
	if ilegal then
		tvRP.giveWeapons(weapons_legal, true, false)
		weapon = weapons_legal
	end
	return weapon
end

function tvRP.getWeaponsLegal()
	return weapon_list
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REPLACEWEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.replaceWeapons(weapons)
	local old_weapons = tvRP.getWeapons()
	tvRP.giveWeapons(weapons, true, false)
	return old_weapons
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLEARWEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.clearWeapons()
	RemoveAllPedWeapons(PlayerPedId(),true)
	weapon_list = {}
	vRPserver.updateWeapons({})
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GiveWeaponToPed
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.giveWeapons(weapons,clear_before,forceHand)
	local ped = PlayerPedId()
	if clear_before then
		RemoveAllPedWeapons(ped,true)
		weapon_list = {}
	end
	if forceHand == nil then forceHand = true end

	for k,v in pairs(weapons) do
		GiveWeaponToPed(ped,GetHashKey(k),v.ammo or 0,false,forceHand)
		weapon_list[string.upper(k)] = v
	end
	vRPserver.updateWeapons(tvRP.getWeapons())
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GiveWeaponToPed
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getWeaponAmmo(Weapon)
	return GetAmmoInPedWeapon(PlayerPedId(),Weapon)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVENTORY:CREATEWEAPON
-----------------------------------------------------------------------------------------------------------------------------------------
local Objects = {}
local Config = {
	["WEAPON_KATANA"] = {
		["Bone"] = 24818,
		["x"] = 0.27,
		["y"] = -0.15,
		["z"] = 0.22,
		["RotX"] = 0.0,
		["RotY"] = 220.0,
		["RotZ"] = 2.5,
		["Model"] = "w_me_katana"
	},
	["WEAPON_CARBINERIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_carbinerifle"
	},
	["WEAPON_M4A4"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_m4a4"
	},
	["WEAPON_CARBINERIFLE_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_carbineriflemk2"
	},
	["WEAPON_ADVANCEDRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.02,
		["y"] = -0.14,
		["z"] = -0.04,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_advancedrifle"
	},
	["WEAPON_BULLPUPRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.02,
		["y"] = -0.14,
		["z"] = -0.04,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_bullpuprifle"
	},
	["WEAPON_BULLPUPRIFLE_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.02,
		["y"] = -0.14,
		["z"] = -0.04,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_bullpupriflemk2"
	},
	["WEAPON_SPECIALCARBINE"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_specialcarbine"
	},
	["WEAPON_SPECIALCARBINE_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_specialcarbinemk2"
	},
	["WEAPON_MUSKET"] = {
		["Bone"] = 24818,
		["x"] = -0.1,
		["y"] = -0.14,
		["z"] = 0.0,
		["RotX"] = 0.0,
		["RotY"] = 0.8,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_musket"
	},
	["WEAPON_BAT"] = {
		["Bone"] = 24818,
		["x"] = -0.18,
		["y"] = -0.18,
		["z"] = 0.0,
		["RotX"] = 0.0,
		["RotY"] = 90.0,
		["RotZ"] = 2.5,
		["Model"] = "w_me_bat"
	},
	["WEAPON_PUMPSHOTGUN"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sg_pumpshotgun"
	},
	["WEAPON_RPG"] = {
		["Bone"] = 24818,
		["x"] = -0.20,
		["y"] = -0.22,
		["z"] = 0.0,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,2.5,
		["Model"] = "w_lr_rpg"
	},
	["WEAPON_PUMPSHOTGUN_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sg_pumpshotgunmk2"
	},
	["WEAPON_SMG"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sb_smg"
	},
	["WEAPON_SMG_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.22,
		["y"] = -0.14,
		["z"] = 0.12,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sb_smgmk2"
	},
	["WEAPON_COMPACTRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.22,
		["y"] = -0.14,
		["z"] = 0.12,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_assaultrifle_smg"
	},
	["WEAPON_ASSAULTSMG"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.07,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sb_assaultsmg"
	},
	["WEAPON_HEAVYRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.08,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_heavyrifleh"
	},
	["WEAPON_TACTICALRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.08,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_carbinerifle_reh"
	},
	["WEAPON_ASSAULTRIFLE"] = {
		["Bone"] = 24818,
		["x"] = 0.08,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_assaultrifle"
	},
	["WEAPON_ASSAULTRIFLE_MK2"] = {
		["Bone"] = 24818,
		["x"] = 0.08,
		["y"] = -0.14,
		["z"] = 0.08,
		["RotX"] = 0.0,
		["RotY"] = 135.0,
		["RotZ"] = 2.5,
		["Model"] = "w_ar_assaultrifle"
	},
	["WEAPON_GUSENBERG"] = {
		["Bone"] = 24818,
		["x"] = 0.12,
		["y"] = -0.14,
		["z"] = -0.10,
		["RotX"] = 0.0,
		["RotY"] = 180.0,
		["RotZ"] = 2.5,
		["Model"] = "w_sb_gusenberg"
	},

	-- Config de armas no Peito (So descomentar qual você quer)

	-- ["WEAPON_PUMPSHOTGUN_MK2"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.10,
	-- 	["y"] = 0.19,
	-- 	["z"] = -0.08,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 150.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_sg_pumpshotgunmk2"
	-- },
	-- ["WEAPON_PUMPSHOTGUN"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.10,
	-- 	["y"] = 0.19,
	-- 	["z"] = -0.08,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 150.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_sg_pumpshotgun"
	-- },
	-- ["WEAPON_SMG"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.03,
	-- 	["y"] = 0.19,
	-- 	["z"] = -0.13,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 168.0,
	-- 	["RotZ"] = -8.0,
	-- 	["Model"] = "w_sb_smg"
	-- },
	-- ["WEAPON_COMBATPDW"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.12,
	-- 	["y"] = 0.19,
	-- 	["z"] = 0.04,
	-- 	["RotX"] = 0.0,
	-- 	["RotY"] = 135.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_sb_pdw"
	-- },
	-- ["WEAPON_ASSAULTSMG"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.12,
	-- 	["y"] = 0.19,
	-- 	["z"] = -0.07,
	-- 	["RotX"] = 0.0,
	-- 	["RotY"] = 135.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_sb_assaultsmg"
	-- },
	-- ["WEAPON_ASSAULTRIFLE"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.13,
	-- 	["y"] = -0.14,
	-- 	["z"] = 0.04,
	-- 	["RotX"] = 0.0,
	-- 	["RotY"] = 145.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_ar_assaultrifle"
	-- },
	-- ["WEAPON_CARBINERIFLE"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = -0.03,
	-- 	["y"] = 0.20,
	-- 	["z"] = -0.10,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 168.0,
	-- 	["RotZ"] = -8.0,
	-- 	["Model"] = "w_ar_carbinerifle"
	-- },
	-- ["WEAPON_SPECIALCARBINE"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = 0.02,
	-- 	["y"] = 0.19,
	-- 	["z"] = -0.05,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 150.0,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_ar_specialcarbine"
	-- },
	-- ["WEAPON_MUSKET"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = -0.1,
	-- 	["y"] = 0.19,
	-- 	["z"] = 0.0,
	-- 	["RotX"] = 0.0,
	-- 	["RotY"] = 0.8,
	-- 	["RotZ"] = 5.0,
	-- 	["Model"] = "w_ar_musket"
	-- },
	-- ["WEAPON_CARBINERIFLE_MK2"] = {
	-- 	["Bone"] = 24818,
	-- 	["x"] = -0.03,
	-- 	["y"] = 0.20,
	-- 	["z"] = -0.10,
	-- 	["RotX"] = 165.0,
	-- 	["RotY"] = 168.0,
	-- 	["RotZ"] = -8.0,
	-- 	["Model"] = "w_ar_carbineriflemk2"
	-- }
}

RegisterNetEvent("inventory:CreateWeapon")
AddEventHandler("inventory:CreateWeapon",function(Item)
	local Split = splitString(Item,"-")
	local Name = Split[1]

	if not Objects[Name] and Config[Name] then
		local Ped = PlayerPedId()
		local Config = Config[Name]
		local Coords = GetEntityCoords(Ped)
		local Bone = GetPedBoneIndex(Ped,Config["Bone"])

		local Progression,Network = vRPserver.CreateObject(Config["Model"],Coords["x"],Coords["y"],Coords["z"],Name)
		if Progression then
			Objects[Name] = LoadNetwork(Network)
			AttachEntityToEntity(Objects[Name],Ped,Bone,Config["x"],Config["y"],Config["z"],Config["RotX"],Config["RotY"],Config["RotZ"],false,false,false,false,2,true)
			SetEntityCompletelyDisableCollision(Objects[Name],false,true)
		end
	end
end)

RegisterNetEvent("inventory:RemoveWeapon")
AddEventHandler("inventory:RemoveWeapon",function(Name)
	if Name and Objects[Name] then
		TriggerServerEvent("DeleteObject",0,Name)
		Objects[Name] = nil
	end
end)

RegisterNetEvent("inventory:ClearWeapons")
AddEventHandler("inventory:ClearWeapons",function()
	for Name,v in pairs(Objects) do
		TriggerServerEvent("DeleteObject",0,Name)
		Objects[Name] = nil
	end
end)