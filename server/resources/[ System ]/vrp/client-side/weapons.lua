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
		if HasPedGotWeapon(ped,hash) then
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
	TriggerServerEvent("will_inventory:giveWeapons", weapon_list)
end
