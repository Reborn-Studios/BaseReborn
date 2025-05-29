-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local localPeds = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- LIST
-----------------------------------------------------------------------------------------------------------------------------------------
local List = GlobalState['AllPeds']
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
			localPeds[Number] = nil
			return
		end
	end
end)

AddStateBagChangeHandler("AllPeds","",function (_,_,value)
    if not value then return end
	List = {}
	for _,Ped in pairs(localPeds) do
		if DoesEntityExist(Ped) then
			DeleteEntity(Ped)
		end
	end
	localPeds = {}
	Wait(100)
    List = value
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
