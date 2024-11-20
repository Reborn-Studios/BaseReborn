-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local localPeds = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- LIST
-----------------------------------------------------------------------------------------------------------------------------------------
local List = {
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 1692.28,3760.94,34.69,229.61 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 253.79,-50.5,69.94,68.04 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 842.41,-1035.28,28.19,0.0 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { -331.62,6084.93,31.46,226.78 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { -662.29,-933.62,21.82,181.42 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { -1304.17,-394.62,36.7,73.71 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { -1118.95,2699.73,18.55,223.94 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 2567.98,292.65,108.73,0.0 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { -3173.51,1088.38,20.84,249.45 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 22.59,-1105.54,29.79,155.91 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Ammunation (Framework)
		Distance = 12,
		Coords = { 810.22,-2158.99,29.62,0.0 },
		Model = "ig_dale" ,
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 24.49,-1346.08,29.49,272.13 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 2556.04,380.89,108.61,0.0 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 1164.82,-323.63,69.2,99.22 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -706.16,-914.55,19.21,90.71 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -47.39,-1758.63,29.42,51.03 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 372.86,327.53,103.56,257.96 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { -3243.38,1000.11,12.82,0.0 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { 1728.39,6416.21,35.03,246.62 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { 549.2,2670.22,42.16,96.38 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { 1959.54,3741.01,32.33,303.31 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { 2677.07,3279.95,55.23,334.49 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { 1697.35,4923.46,42.06,328.82 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 6,
		Coords = { -1819.55,793.51,138.08,133.23 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 1392.03,3606.1,34.98,204.1 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -2966.41,391.59,15.05,85.04 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -3040.04,584.22,7.9,19.85 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 1134.33,-983.09,46.4,277.8 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 1165.26,2710.79,38.15,178.59 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -1486.77,-377.56,40.15,133.23 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { -1221.42,-907.91,12.32,31.19 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Departament (Framework)
		Distance = 10,
		Coords = { 812.46,-781.18,26.17,269.3 },
		Model = "mp_m_shopkeep_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Prisão (Center)
		Distance = 100,
		Coords = { 1818.73,2596.25,45.7,141.74 },
		Model = "s_m_m_prisguard_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{
		Distance = 100,
		Coords = { -1083.07,-245.78,37.77,203.98 },
		Model = "ig_dale",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	}
	--[[ { -- Venda de peixes
		Distance = 50,
		Coords = { -1564.64,-976.76,13.02,271.64 },
		Model = "ig_dale",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Venda de peixes
		Distance = 50,
		Coords = { -1558.87,-970.52,13.02,229.83 },
		Model = "ig_dale",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Lenhador
		Distance = 50,
		Coords = { -843.63,5407.52,34.62,301.0 },
		Model = "a_m_m_farmer_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Motorista
		Distance = 50,
		Coords = { 452.95,-607.92,28.6,272.22 },
		Model = "csb_prologuedriver",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Lixeiro
		Distance = 50,
		Coords = { -469.95,-1722.21,18.69,288.12 },
		Model = "s_m_y_garbage",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Salva-vidas
		Distance = 50,
		Coords = { -1483.17,-1029.64,6.13,232.31 },
		Model = "s_m_y_baywatch_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Guincho
		Distance = 50,
		Coords = { 407.53,-1624.49,29.3,225.12 },
		Model = "s_m_m_dockwork_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	},
	{ -- Transporter
		Distance = 50,
		Coords = { 239.45,243.0,106.69,68.97 },
		Model = "s_m_y_hwaycop_01",
		anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
	}, ]]
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDPED
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddPed", function(Data)
	for Number = 1,#List do
		local Distance = #(vec3(Data.Coords[1],Data.Coords[2],Data.Coords[3]) - vec3(List[Number]["Coords"][1],List[Number]["Coords"][2],List[Number]["Coords"][3]))
		if Distance <= 1.0 then
			return
		end
	end
	table.insert(List,Data)
end)

exports("RemovePed", function(Data)
	for Number = 1,#List do
		local Distance = #(vec3(Data.Coords[1],Data.Coords[2],Data.Coords[3]) - vec3(List[Number]["Coords"][1],List[Number]["Coords"][2],List[Number]["Coords"][3]))
		if Distance <= 1.0 then
			if DoesEntityExist(localPeds[Number]) then
				DeleteEntity(localPeds[Number])
			end
			table.remove(List,Number)
			return
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADLIST
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local Ped = PlayerPedId()
		local Coords = GetEntityCoords(Ped)
		for Number = 1,#List do
			local Distance = #(Coords - vec3(List[Number]["Coords"][1],List[Number]["Coords"][2],List[Number]["Coords"][3]))
			if Distance <= List[Number]["Distance"] then
				if not localPeds[Number] then
					if LoadModel(List[Number]["Model"]) then
						localPeds[Number] = CreatePed(4,List[Number]["Model"],List[Number]["Coords"][1],List[Number]["Coords"][2],List[Number]["Coords"][3] - 1,List[Number]["Coords"][4],false,false)
						SetPedArmour(localPeds[Number],100)
						SetEntityInvincible(localPeds[Number],true)
						FreezeEntityPosition(localPeds[Number],true)
						SetBlockingOfNonTemporaryEvents(localPeds[Number],true)
						SetModelAsNoLongerNeeded(List[Number]["Model"])
						if List[Number]["anim"] ~= nil then
							if LoadAnim(List[Number]["anim"][1]) then
								TaskPlayAnim(localPeds[Number],List[Number]["anim"][1],List[Number]["anim"][2],4.0,4.0,-1,1,0,false,false,false)
							end
						end
					end
				end
			else
				if localPeds[Number] then
					if DoesEntityExist(localPeds[Number]) then
						DeleteEntity(localPeds[Number])
					end
					localPeds[Number] = nil
				end
			end
		end
		Wait(2000)
	end
end)
