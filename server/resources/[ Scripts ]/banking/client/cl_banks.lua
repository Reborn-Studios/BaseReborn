-- Preserves original behavior: NUI visibility, cooldowns, blip setup, and point interactions for banks

local isOnCooldown = false
RESOURCESTATE = {}

manageUI = function(state, resource, userBankData, focus, ignoreCooldown)
  if not ignoreCooldown then
    if isOnCooldown then
      Config.notify("error", Lang.client.cool_down)
      return
    end
    if not state then
      isOnCooldown = true
      SetTimeout(2000, function()
        isOnCooldown = false
      end)
    end
  end
  RESOURCESTATE[resource] = state
  SetNuiFocus(focus, focus)
  SendNUIMessage({
    action = "setVisible",
    data = {
      resource = resource,
      state = state,
      data = {
        userBankData = userBankData,
        bankingConfig = {
          creditScore = Config.creditScore,
          savingsAccount = Config.savingsAccount,
          ui = Lang.UI,
        },
      },
    },
  })
end

RegisterNUICallback("hideByComponent", function(A0_2, A1_2)
  manageUI(false, A0_2, {}, false)
  A1_2("ok")
end)

CreateThread(function()
  for i = 1, #Config.bankLocations.COORDS, 1 do
    local blip = AddBlipForCoord(Config.bankLocations.COORDS[i])
    SetBlipSprite(blip, Config.bankLocations.BLIPSPRITE)
    SetBlipDisplay(blip, 4)
    SetBlipScale(blip, Config.bankLocations.BLIPSCALE)
    SetBlipColour(blip, Config.bankLocations.BLIPCOLOR)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(Config.bankLocations.BLIPNAME)
    EndTextCommandSetBlipName(blip)
    SetBlipAsShortRange(blip, true)

    local point = CreatePoint({
      coords = Config.bankLocations.COORDS[i],
      radius = 2.5,
      uid = "banking",
    })

    point.Inside = function(pointer)
      DrawBase3D(pointer.Coords.x, pointer.Coords.y, pointer.Coords.z,"bank")
      if IsControlJustReleased(0, 38) then
        manageUI(true, "BANKINGVISABLITY", Callbacks.Await("fetchAccountData"), true)
      end
    end

    point.OnExit = function()
      manageUI(false, "BANKINGVISABLITY", {}, false, true)
      Config.hideText()
    end

    point.OnEnter = function(pointer)
      -- Config.drawText(Lang.client.bank_interact)
    end
  end
end)

RegisterNUICallback("bankingAction", function(A0_2, A1_2)
  if isOnCooldown then
    Config.notify("error", Lang.client.cool_down)
    return A1_2("ok")
  end
  isOnCooldown = true
  SetTimeout(1000, function()
    isOnCooldown = false
  end)

  local result = Callbacks.Await("manageAccount", A0_2)
  Config.notify(result.type, (Lang.client[result.response] or "An error occurred while processing your request."))

  SendNUIMessage({
    action = "resyncBankingData",
    data = Callbacks.Await("fetchAccountData"),
  })
  A1_2("ok")
end)
