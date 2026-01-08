local comecar = false
local dict = "rcmextreme2atv"
local anims = {
	"idle_b",
	"idle_c",
	"idle_d",
	"idle_e"
}

CreateThread(function()
	while true do
		local idle = 1000
		local ped = PlayerPedId()
		local bike = GetVehiclePedIsIn(ped, false)
		local speed = GetEntitySpeed(bike)*3.6
		if comecar == true then
			if IsPedOnAnyBike(ped) then
				if speed >= 30 then
					idle = 5
					while not HasAnimDictLoaded(dict) do
						Wait(0)
						RequestAnimDict(dict)
					end

					-- Seta Esquerda ou NumPad 4 = Manobra esquerda
					if IsControlJustPressed(0,174) or IsControlJustPressed(0,108) then
						TaskPlayAnim(ped,dict,anims[1], 8.0, -8.0, -1, 32, 0, false, false, false)

					-- Seta Direita ou NumPad 6 = Manobra direita
					elseif IsControlJustPressed(0,175) or IsControlJustPressed(0,107) then
						TaskPlayAnim(ped,dict,anims[2], 8.0, -8.0, -1, 32, 0, false, false, false)

					-- Seta para Baixo ou NumPad 5 = Manobra lados
					elseif IsControlJustPressed(0,173) or IsControlJustPressed(0,110) then
						TaskPlayAnim(ped,dict,anims[3], 8.0, -8.0, -1, 32, 0, false, false, false)

					-- Seta para Cima ou NumPad 8 = Manobra cima
					elseif IsControlJustPressed(0,27) or IsControlJustPressed(0,111) then
						TaskPlayAnim(ped,dict,anims[4], 8.0, -8.0, -1, 32, 0, false, false, false)
					end
				end
			end
		end
		Wait(idle)
	end
end)

RegisterCommand("manobras",function(raw,args)
	if comecar == false then
		if LocalPlayer.state["Premium"] then
			comecar = true
			TriggerEvent("Notify","amarelo","Você está preparado para fazer manobras",3000)
		else
			TriggerEvent("Notify","negado","Você não tem permissão")
			return
		end
	else
		comecar = false
		TriggerEvent("Notify","importante","Você parou de fazer manobras")
	end
end)
