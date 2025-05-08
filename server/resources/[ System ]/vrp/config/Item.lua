local List = {}

local function convertItems()
	local items = module('vrp',"config/Itemlist") or {}
    for Item,v in pairs(items) do
        List[Item] = {
            ["Index"] = v.index,
            ["Name"] = v.name,
            ["Type"] = v.type,
            ["Weight"] = v.weight,
        }
    end
end

RegisterNetEvent("Reborn:reloadInfos",function()
	convertItems()
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMBODY
-----------------------------------------------------------------------------------------------------------------------------------------
function itemBody(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] then
		return List[Item]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMINDEX
-----------------------------------------------------------------------------------------------------------------------------------------
function itemIndex(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Index"] then
		return List[Item]["Index"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMNAME
-----------------------------------------------------------------------------------------------------------------------------------------
function itemName(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Name"] then
		return List[Item]["Name"]
	end

	return "Deletado"
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMTYPE
-----------------------------------------------------------------------------------------------------------------------------------------
function itemType(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Type"] then
		return List[Item]["Type"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMAMMO
-----------------------------------------------------------------------------------------------------------------------------------------
function itemAmmo(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Ammo"] then
		return List[Item]["Ammo"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function itemVehicle(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Vehicle"] then
		return List[Item]["Vehicle"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMWEIGHT
-----------------------------------------------------------------------------------------------------------------------------------------
function itemWeight(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Weight"] then
		return List[Item]["Weight"] + 0.0
	end

	return 0.0
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMMAXAMOUNT
-----------------------------------------------------------------------------------------------------------------------------------------
function itemMaxAmount(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Max"] then
		return List[Item]["Max"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMSCAPE
-----------------------------------------------------------------------------------------------------------------------------------------
function itemScape(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Scape"] then
		return List[Item]["Scape"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMDESCRIPTION
-----------------------------------------------------------------------------------------------------------------------------------------
function itemDescription(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Description"] then
		return List[Item]["Description"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMDURABILITY
-----------------------------------------------------------------------------------------------------------------------------------------
function itemDurability(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Durability"] then
		return List[Item]["Durability"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMCHARGES
-----------------------------------------------------------------------------------------------------------------------------------------
function itemCharges(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Charges"] then
		return List[Item]["Charges"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMECONOMY
-----------------------------------------------------------------------------------------------------------------------------------------
function itemEconomy(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Economy"] then
		return List[Item]["Economy"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMBLOCK
-----------------------------------------------------------------------------------------------------------------------------------------
function itemBlock(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Block"] then
		return List[Item]["Block"]
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ITEMREPAIR
-----------------------------------------------------------------------------------------------------------------------------------------
function itemRepair(Item)
	local Split = splitString(Item,"-")
	local Item = Split[1]

	if List[Item] and List[Item]["Repair"] then
		return List[Item]["Repair"]
	end

	return false
end