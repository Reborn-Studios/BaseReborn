-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
will = {}
Tunnel.bindInterface("will_bateponto",will)
vSERVER = Tunnel.getInterface("will_bateponto")

local object = nil
local BatePontoData = Config.getData()

AddStateBagChangeHandler("BatePontoLocations", "", function(_, _, value)
    if type(value) == "table" and next(value) then
        BatePontoData = value
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATE-PONTO
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 1000
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped, false) then
			local coords = GetEntityCoords(ped)
            for Index,points in pairs(BatePontoData) do
                for k,v in pairs(points) do
                    local distance = #(coords - vector3(v.coords.x,v.coords.y,v.coords.z))
                    if distance <= 3.5 then
                        timeDistance = 4
                        DrawBase3D(v.coords.x,v.coords.y,v.coords.z,"bate-ponto")
                        if IsControlJustPressed(1,38) then
                            if v.anim == "Tablet" then
                                vRP.createObjects("amb@code_human_in_bus_passenger_idles@female@tablet@base","base","prop_cs_tablet",50,28422)
                            elseif v.anim == "Anim" then
                                vRP.playAnim(false,{"anim@heists@prison_heiststation@cop_reactions","cop_b_idle"},true)
                            end
                            SetNuiFocus(true,true)
                            SendNUIMessage({ type = "firstMenu" })
                            object = { Index, k }
                        end
                    end
                end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUI CALLBACKS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("batepontoClose",function(data,cb)
	SetNuiFocus(false,false)
	SendNUIMessage({ type = "hideMenu" })
	vRP.removeObjects()
end)

RegisterNUICallback("botao",function(data,cb)
    if object then
        vSERVER.checkBateponto(object)
    end
end)

function will.sendText(text)
	SendNUIMessage({ sendText = text })
end
