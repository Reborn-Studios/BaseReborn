-- This thread scans for nearby ATM models defined in Config.atmModels, creates a radial point for interaction,
-- shows prompt text on enter, opens the banking UI on key press (E / control 38), and hides UI/text on exit.
-- Functionality preserved; comments added for clarity.

local createdAtmPoints = {}
local atmModels = Config.atmModels

CreateThread(function()
  while true do
    for i = 1, #atmModels, 1 do
      local playerPed = PlayerPedId()
      local playerCoords = GetEntityCoords(playerPed)
      local obj = GetClosestObjectOfType(playerCoords, 0.7, atmModels[i], false, false, false)
      if obj ~= 0 then
        local coords = GetEntityCoords(obj)
        local existsNear = false
        for j = 1, #createdAtmPoints, 1 do
          if Vdist2(coords, createdAtmPoints[j]) < 2 then
            existsNear = true
            break
          end
        end
        if not existsNear then
          local point = CreatePoint({ coords = coords, radius = 2 })
          point.Inside = function()
            if IsControlJustPressed(0, 38) then
              manageUI(true, "BANKINGVISABLITY", Callbacks.Await("fetchAccountData"), true)
            end
          end
          point.OnEnter = function()
            Config.drawText(Lang.client.atm_interact)
          end
          point.OnExit = function()
            Config.hideText()
            manageUI(false, "BANKINGVISABLITY", {}, false, true)
          end
          createdAtmPoints[#createdAtmPoints + 1] = coords
        end
      end
    end
    Wait(1000)
  end
end)
