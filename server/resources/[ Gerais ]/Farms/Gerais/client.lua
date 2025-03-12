-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Server = Tunnel.getInterface("products")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local inPed = nil
local inTimers = 30
local timeSelling = 0
local inService = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- PEDHASHS
-----------------------------------------------------------------------------------------------------------------------------------------
local pedHashs = {
	"ig_abigail",
	"u_m_y_abner",
	"a_m_o_acult_02",
	"a_m_m_afriamer_01",
	"csb_mp_agent14",
	"csb_agent",
	"u_m_m_aldinapoli",
	"ig_amandatownley",
	"ig_andreas",
	"u_m_y_antonb",
	"csb_anita",
	"cs_andreas",
	"ig_ashley",
	"s_m_m_autoshop_01",
	"ig_money",
	"g_m_y_ballaeast_01",
	"g_m_y_ballaorig_01",
	"g_f_y_ballas_01",
	"u_m_y_babyd",
	"ig_barry",
	"s_m_y_barman_01",
	"u_m_y_baygor",
	"a_f_y_beach_01",
	"a_f_y_bevhills_02",
	"a_f_y_bevhills_01",
	"u_m_y_burgerdrug_01",
	"a_m_m_business_01",
	"a_f_m_business_02",
	"a_m_y_business_02",
	"ig_car3guy1",
	"ig_chef2",
	"g_m_m_chigoon_02",
	"g_m_m_chigoon_01",
	"ig_claypain",
	"ig_clay",
	"a_f_m_eastsa_01"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- PEDLOCATE
-----------------------------------------------------------------------------------------------------------------------------------------
local pedLocate = {
	{ 57.75,-1483.87,29.27,223.26 },
	{ 162.48,-1421.24,29.25,0.39 },
	{ 491.26,-1271.15,29.47,313.24 },
	{ 562.01,-1452.83,29.51,45.45 },
	{ 992.2,-1543.66,30.82,301.54 },
	{ 1164.34,-1485.19,34.85,155.17 },
	{ 1215.36,-770.11,57.83,61.22 },
	{ 1075.25,-680.29,57.66,208.8 },
	{ 968.78,-308.15,66.98,10.96 },
	{ 927.06,50.68,81.11,80.12 },
	{ 743.82,223.34,87.04,179.75 },
	{ 384.66,428.0,144.21,314.89 },
	{ 269.03,325.19,105.55,351.27 },
	{ -101.49,429.75,113.14,217.13 },
	{ -146.42,230.15,94.94,348.6 },
	{ -567.36,274.73,83.02,169.6 },
	{ -661.76,-219.56,37.74,96.06 },
	{ -1084.96,-261.93,37.79,204.25 },
	{ -1316.49,-393.29,36.6,84.95 },
	{ -1387.93,-419.04,36.63,350.12 },
	{ -1547.94,-435.22,35.89,231.09 },
	{ -1664.9,-533.71,35.55,178.2 },
	{ -1779.91,-428.05,41.45,233.23 },
	{ -2002.14,-501.78,11.51,77.78 },
	{ -1515.96,-920.31,10.17,145.99 },
	{ -1351.55,-1128.94,4.12,37.2 },
	{ -1210.85,-1383.67,4.05,69.58 },
	{ -1195.35,-1542.59,4.38,101.89 },
	{ -1014.69,-1515.41,6.52,112.4 },
	{ -1038.33,-1398.09,5.56,62.42 },
	{ -823.14,-1224.72,7.34,41.04 },
	{ -663.58,-1217.26,11.82,48.45 },
	{ -529.28,-1783.74,21.57,317.83 },
	{ -342.19,-1484.51,30.71,297.83 },
	{ 133.38,-2198.5,6.18,49.56 },
	{ 265.04,-2507.43,6.45,305.44 },
	{ 52.15,-2570.75,6.01,11.49 },
	{ -261.7,-2655.4,6.16,350.66 },
	{ 767.41,-2482.37,20.19,127.82 },
	{ 795.47,-2971.45,6.03,140.83 },
	{ 764.76,-3148.8,5.91,340.53 },
	{ 568.97,-2753.89,6.06,295.01 },
	{ 923.3,-2372.54,30.51,94.56 },
	{ 988.69,-2422.48,29.72,94.59 },
	{ 1049.18,-2426.67,30.31,125.03 },
	{ 1010.49,-2038.33,31.55,256.46 },
	{ 730.07,-1973.1,29.3,262.22 },
	{ 847.98,-1316.58,26.45,134.11 },
	{ 751.11,-1201.25,24.29,333.05 },
	{ 722.59,-1070.48,23.07,32.39 },
	{ 890.97,-1027.48,35.11,320.08 },
	{ 273.33,-965.1,29.32,36.82 },
	{ 362.33,-580.67,28.84,217.67 },
	{ 222.95,-596.69,43.88,227.29 },
	{ 373.03,-355.64,46.73,228.49 },
	{ -24.57,-1571.08,29.33,203.23 },
	{ -75.99,-1390.04,29.33,152.36 },
	{ -26.06,-1415.8,29.32,232.86 },
	{ 169.68,-1507.31,29.27,105.41 },
	{ 239.21,-1378.58,33.75,182.77 },
	{ 405.68,-1347.09,41.06,329.06 },
	{ -97.71,-1013.58,27.28,198.88 },
	{ -261.26,-985.74,31.22,306.18 },
	{ -144.49,-845.84,30.61,120.6 },
	{ 8.53,-915.4,29.91,100.67 },
	{ 76.56,-871.81,31.51,31.15 },
	{ 416.94,-1085.25,30.06,132.16 },
	{ 510.84,-1076.09,28.84,64.75 },
	{ 980.38,-121.74,74.05,111.13 },
	{ 232.16,673.81,189.95,75.22 },
	{ -174.2,969.17,237.43,302.16 },
	{ -657.15,897.48,229.25,16.68 },
	{ 211.71,-935.1,24.28,184.66 },
	{ 450.72,-834.77,28.0,307.98 },
	{ 501.48,-646.11,24.76,291.42 },
	{ 300.92,-603.72,43.42,106.22 },
	{ 321.65,-236.54,54.02,127.4 },
	{ 173.86,-225.29,54.2,293.95 },
	{ 217.2,-19.5,69.9,185.16 },
	{ 170.92,-25.68,68.32,198.65 },
	{ 196.1,233.15,105.55,201.05 },
	{ 80.08,274.85,110.22,206.85 },
	{ -142.8,229.75,94.94,33.99 },
	{ -242.52,279.4,92.04,212.48 },
	{ -378.51,218.44,83.66,36.16 },
	{ -479.65,218.61,83.7,318.74 },
	{ -723.19,-99.95,38.25,350.79 },
	{ -1016.78,-266.5,39.05,27.03 },
	{ -1261.97,-348.93,36.82,7.06 },
	{ -1360.91,-354.44,36.68,249.2 },
	{ -1477.49,-518.58,34.74,82.17 },
	{ -1666.34,-979.55,8.17,23.01 },
	{ -1793.08,-1199.23,13.02,351.44 },
	{ -1325.29,-1516.27,4.44,10.08 },
	{ -1115.14,-1580.04,8.68,85.74 },
	{ -989.18,-1577.2,5.18,75.03 },
	{ -741.08,-1128.09,10.6,97.79 },
	{ -695.69,-1385.75,5.5,101.0 },
	{ -533.58,-1269.84,26.91,225.86 },
	{ -174.9,-1158.66,23.82,37.94 },
	{ 244.44,-1073.72,29.29,49.77 },
	{ 295.94,-1449.6,29.97,5.7 },
	{ 309.24,-1434.64,29.97,97.68 },
	{ 406.67,-1501.1,29.29,88.76 },
	{ 442.01,-1481.85,29.3,74.78 },
	{ 873.62,-1578.92,30.87,34.79 }
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSERVICE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 700
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		for k,inLocate in pairs(Farms.init) do
			local distance = #(coords - vector3(inLocate[1],inLocate[2],inLocate[3]))
			if distance <= 1.5 and not inService then
				timeDistance = 4
				DrawText3D(inLocate[1],inLocate[2],inLocate[3],"~g~E~w~  PEGAR LISTA DE CONTATOS")
				if IsControlJustPressed(1,38) and not inService then
					inService = true
					Startthreaddelivery()
					Startthreadintimers()
					Timeselling()
					TriggerEvent("Notify","sucesso","Voce pegou a lista dos contatos, espere um pouco que jaja alguem te chama.",5000)
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADDELIVERY
-----------------------------------------------------------------------------------------------------------------------------------------
function Startthreaddelivery()
	CreateThread(function()
		while inService do
			local timeDistance = 700
			if inPed ~= nil and inTimers <= 0 then
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				local coordsPed = GetEntityCoords(inPed)
				local distance = #(coords - coordsPed)
				if distance <= 10 then
					timeDistance = 4
					if timeSelling > 0 then
						DisableControlAction(1,23,true)
						DrawText3D(coordsPed.x,coordsPed.y,coordsPed.z,"~w~AGUARDE  ~g~"..timeSelling.."~w~  SEGUNDOS")
					else
						DrawText3D(coordsPed.x,coordsPed.y,coordsPed.z,"~g~E~w~   VENDER")
						if distance <= 2 then
							if IsControlJustPressed(1,38) and not IsPedInAnyVehicle(ped,false) and Server.checkAmount() then
								timeSelling = 5
							end
						end
					end
				end
			end
			Wait(timeDistance)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADINTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
function Startthreadintimers()
	CreateThread(function()
		while inService do
			if inTimers > 0 then
				inTimers = inTimers - 1
				if inTimers == 20 and inPed ~= nil then
					DeleteEntity(inPed)
					inPed = nil
				end
				if inTimers <= 0 then
					local mHash = GetHashKey(pedHashs[math.random(#pedHashs)])
					LoadModel(mHash)
					local rand = math.random(#pedLocate)
					inPed = CreatePed(4,mHash,pedLocate[rand][1],pedLocate[rand][2],pedLocate[rand][3]-1,pedLocate[rand][4],false,false)
					SetEntityInvincible(inPed,true)
					FreezeEntityPosition(inPed,true)
					SetPedSuffersCriticalHits(inPed,false)
					SetBlockingOfNonTemporaryEvents(inPed,true)
					SetModelAsNoLongerNeeded(mHash)
					Server.sendNotify(pedLocate[rand][1], pedLocate[rand][2], pedLocate[rand][3])
				end
			end
			Wait(1000)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TIMESELLING
-----------------------------------------------------------------------------------------------------------------------------------------
function Timeselling()
	CreateThread(function()
		while inService do
			if timeSelling > 0 and inPed then
				timeSelling = timeSelling - 1
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				local coordsPed = GetEntityCoords(inPed)
				local distance = #(coords - coordsPed)

				if timeSelling <= 0 and inPed then
					LoadAnim("pickup_object")
					TaskPlayAnim(inPed,"pickup_object","putdown_low",3.0,3.0,-1,48,10,false,false,false)
					SetEntityInvincible(inPed,false)
					FreezeEntityPosition(inPed,false)
					TaskWanderStandard(inPed,10.0,10)
					inTimers = math.random(10,20)
					Server.paymentMethod()
					Wait(math.random(2000,5000))
				end

				if distance >= 3 and inPed then
					FreezeEntityPosition(inPed,false)
					TaskWanderStandard(inPed,10.0,10)
					timeSelling = 0
					inTimers = 30
				end
			end
			Wait(1000)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOWME3D
-----------------------------------------------------------------------------------------------------------------------------------------
function DrawText3D(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,100)
	SetTextEntry("STRING")
	SetTextCentre(true)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text)) / 400
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
end

CreateThread(function()
	while true do
		local will = 1000
		if inService then
			will = 4
			DrawTxT("PRESSIONE ~r~F7~w~ SE DESEJA FINALIZAR A ENTREGA",4,0.24,0.922,0.4,255,255,255,237)
			if IsControlJustPressed(1,168) then
				inService = false
				TriggerEvent("Notify","sucesso","Serviço finalizado.",3000)
				if inPed ~= nil then
					DeleteEntity(inPed)
					inTimers = 30
				end
			end
		end
		Wait(will)
	end
end)

function DrawTxT(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextCentre(true)
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
