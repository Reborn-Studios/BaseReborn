-- This thread scans for nearby ATM models defined in Config.atmModels, creates a radial point for interaction,
-- shows prompt text on enter, opens the banking UI on key press (E / control 38), and hides UI/text on exit.
-- Functionality preserved; comments added for clarity.

local createdAtmPoints = {}
local atmModels = Config.atmModels

CreateThread(function()
  exports["ox_target"]:addModel(atmModels,{
		{
			label = "Abrir ATM",
			icon = "fa-solid fa-money-bill-transfer",
			event = "Banking:openAtm"
		}
	})
end)

RegisterNetEvent("Banking:openAtm")
AddEventHandler("Banking:openAtm", function()
  manageUI(true, "BANKINGVISABLITY", Callbacks.Await("fetchAccountData"), true)
end)