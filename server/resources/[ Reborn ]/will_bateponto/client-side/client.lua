-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
will = {}
Tunnel.bindInterface("will_bateponto",will)
vSERVER = Tunnel.getInterface("will_bateponto")

local object = nil
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATE-PONTO
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function() 
    Wait(1000)
    TriggerServerEvent(GetCurrentResourceName()..':auth', tostring(GetCurrentServerEndpoint()):gsub('.+:(%d+)','%1'))
end)

Citizen.CreateThread(function()
	while true do
		local timeDistance = 1000
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(Config.data) do
                for _,coord in pairs(v.coords) do
                    local distance = #(coords - vector3(coord[1],coord[2],coord[3]))
                    if distance <= 1.5 then
                        timeDistance = 4
                        DrawMarker(21,coord[1],coord[2],coord[3]-0.6,0,0,0,0,0,0,0.4,0.4,0.4,255,0,0,125,1,0,0,0)
                        if IsControlJustPressed(1,38) then
                            if v.Anim == "Tablet" then
                                Config.func.createTablet()
                            elseif v.Anim == "Anim" then
                                playingAnim("anim@heists@prison_heiststation@cop_reactions","cop_b_idle")
                            end
                            SetNuiFocus(true,true)
                            SendNUIMessage({ type = "firstMenu" })
                            object = k
                        end
                    end
                end
			end
		end
		Citizen.Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("batepontoClose",function(data,cb)
	SetNuiFocus(false,false)
	SendNUIMessage({ type = "hideMenu" })
	Config.func.removeObjects()
end)

RegisterNUICallback("botao",function(data,cb)
    if object then
        vSERVER.checkBateponto(object)
    end
end)

function will.enter()
	SendNUIMessage({ type = "Entrou" })
end

function will.exit()
	SendNUIMessage({ type = "Saiu" })
end

function will.verify()
	SendNUIMessage({ type = "Verify" })
end

function playingAnim(dict,anim)
	local ped = PlayerPedId()
	if anim ~= "" then
		RequestAnimSet(dict)
		while not HasAnimSetLoaded(dict) do
			Citizen.Wait(10)
		end
		TaskPlayAnim(ped,dict,anim,3.0,3.0,-1,0,0,0,0,0)
	end
end
