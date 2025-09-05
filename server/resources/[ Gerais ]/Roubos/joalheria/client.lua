-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Jewelry = Tunnel.getInterface("joalheria")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local jewelryStart = GlobalState['JewelryStatus']
AddStateBagChangeHandler("JewelryStatus","",function (_,_,value) jewelryStart = value end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- JEWELRYROBBERY
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	Wait(1000)
	local bombLoc = Config.jewelry.bombLocs
	if GetResourceState("will_robbery") == "started" then
		return
	end
	exports["target"]:AddCircleZone("Robbery:Jewelry",vector3(bombLoc[1],bombLoc[2],bombLoc[3]),0.75,{
		name = "Robbery:Jewelry",
		heading = 3374176
	},{
		distance = 1.5,
		options = {
			{
				canInteract = function()
					return not LocalPlayer.state.Police and not jewelryStart
				end,
				icon = "fa-solid fa-sack-dollar",
				event = "robbery:jewelryRobbery",
				label = "Roubar Joalheria",
				tunnel = "client",
			}
		}
	})
end)

RegisterNetEvent("robbery:jewelryRobbery")
AddEventHandler("robbery:jewelryRobbery",function ()
	if Jewelry.jewelryCheckItens() then
		TriggerEvent("cancelando",true)
		vRP._playAnim(false,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)
		Wait(10000)
		vRP.removeObjects()
		TriggerEvent("cancelando",false)
		local bombLoc = Config.jewelry.bombLocs
		local mHash = GetHashKey("prop_c4_final_green")
		LoadModel(mHash)
		local bomb = CreateObjectNoOffset(mHash,bombLoc[1],bombLoc[2],bombLoc[3]-0.3,true,false,false)
		SetEntityAsMissionEntity(bomb,true,true)
		FreezeEntityPosition(bomb,true)
		SetEntityHeading(bomb,bombLoc[4])
		SetModelAsNoLongerNeeded(mHash)
		Wait(20000)
		TriggerServerEvent("doors:doorsStatistics",20,false)
		TriggerServerEvent("tryDeleteEntity",ObjToNet(bomb))
		AddExplosion(bombLoc[1],bombLoc[2],bombLoc[3],2,100.0,true,false,1.0)
		Jewelry.jewelryUpdateStatus(true)
	end
end)
