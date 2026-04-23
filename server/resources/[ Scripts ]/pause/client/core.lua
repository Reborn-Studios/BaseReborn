-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vSERVER = Tunnel.getInterface("pause")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Pause = false
local InfosCache = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMMAND
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("PauseBreak",function()
	if not Pause and not IsPauseMenuActive() and not IsNuiFocused() then
		Pause = true
		SetNuiFocus(true,true)
		TransitionToBlurred(1000)
		SetCursorLocation(0.5,0.5)
		TriggerEvent("hud:Active",false)
		SendNUIMessage({ Action = "Open" })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Close",function(Data,Callback)
	Pause = false
	SetNuiFocus(false,false)
	TransitionFromBlurred(1000)
	TriggerEvent("hud:Active",true)
	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SKINS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Skinweapon",function(Data,Callback)
	Pause = false
	SetNuiFocus(false,false)
	TransitionFromBlurred(1000)
	TriggerEvent("hud:Active",true)
	TriggerEvent("skinweapon:Open")

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("PauseBreak","Abrir as configurações","keyboard","Escape")
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Disconnect",function(Data,Callback)
	vSERVER.Disconnect()

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLOCKESC
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        SetPauseMenuActive(false)
		if IsControlJustPressed(0,199) then
            ActivateFrontendMenu(GetHashKey('FE_MENU_VERSION_MP_PAUSE'),0,-1)
        end
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETTINGS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Settings",function(Data,Callback)
	Pause = false
	SetNuiFocus(false,false)
	TransitionFromBlurred(1000)
	TriggerEvent("hud:Active",true)
	ActivateFrontendMenu("FE_MENU_VERSION_LANDING_MENU",0,-1)

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAP
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Map",function(Data,Callback)
	Pause = false
	SetNuiFocus(false,false)
	TransitionFromBlurred(1000)
	TriggerEvent("hud:Active",true)
	ActivateFrontendMenu("FE_MENU_VERSION_MP_PAUSE",0,-1)

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUM
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Premium",function(Data,Callback)
	Callback(Premium)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUMBUY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("PremiumBuy",function(Data,Callback)
	Callback(vSERVER.PremiumBuy(Data["Hierarchy"],Data["Selectables"]))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOME
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Home",function(Data,Callback)
	if not InfosCache["Home"] or InfosCache["Home"].time < GetGameTimer() then
		local Home = vSERVER.Home()
		InfosCache["Home"] = {
			data = Home,
			time = GetGameTimer() + 60000
		}
	end
	Callback(InfosCache["Home"].data)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- STORELIST
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("StoreList",function(Data,Callback)
	if not InfosCache["StoreList"] or InfosCache["StoreList"].time < GetGameTimer() then
		local StoreList = vSERVER.StoreList()
		InfosCache["StoreList"] = {
			data = StoreList,
			time = GetGameTimer() + 60000
		}
	end
	Callback(InfosCache["StoreList"].data)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- STORESBUY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("StoreBuy",function(Data,Callback)
	if not LocalPlayer["state"]["Prison"] then
		Callback(vSERVER.StoreBuy(Data["Index"],Data["Amount"]))
	else
		Callback(false)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATTLEPASS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Battlepass",function(Data,Callback)
	if not InfosCache["Battlepass"] or InfosCache["Battlepass"].time < GetGameTimer() then
		local Battlepass = vSERVER.Battlepass()
		InfosCache["Battlepass"] = {
			data = Battlepass,
			time = GetGameTimer() + 60000
		}
	end
	Callback(InfosCache["Battlepass"].data)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATTLEPASSBUY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("BattlepassBuy",function(Data,Callback)
	Callback(vSERVER.RolepassBuy())
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATTLEPASSRESCUE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("BattlepassRescue",function(Data,Callback)
	if not LocalPlayer["state"]["Prison"] then
		Callback(vSERVER.RolepassRescue(Data["Mode"],Data["Number"]))
	else
		Callback(false)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BOXES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Boxes",function(Data,Callback)
	Callback(Boxes)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPENBOX
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("OpenBox",function(Data,Callback)
	Callback(vSERVER.OpenBox(Data))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Marketplace",function(Data,Callback)
	if not InfosCache["Marketplace"] or InfosCache["Marketplace"].time < GetGameTimer() then
		local Marketplace = vSERVER.Marketplace()
		InfosCache["Marketplace"] = {
			data = Marketplace,
			time = GetGameTimer() + 60000
		}
	end
	Callback(InfosCache["Marketplace"].data)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEINVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("MarketplaceInventory",function(Data,Callback)
	Callback(vSERVER.MarketplaceInventory(Data["Mode"]))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEINVENTORY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("MarketplaceList",function(Data,Callback)
	Callback(vSERVER.MarketplaceList(Data["Mode"]))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEANNOUNCE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("MarketplaceAnnounce",function(Data,Callback)
	Callback(vSERVER.MarketplaceAnnounce(Data))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACEBUY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("MarketplaceBuy",function(Data,Callback)
	Callback(vSERVER.MarketplaceBuy(Data["Id"]))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MARKETPLACECANCEL
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("MarketplaceCancel",function(Data,Callback)
	Callback(vSERVER.MarketplaceCancel(Data["Id"]))
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAUSE:NOTIFY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("pause:Notify")
AddEventHandler("pause:Notify",function(Title,Message,Type)
	SendNUIMessage({ Action = "Notify", Payload = { Title,Message,Type } })
end)