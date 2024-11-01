-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

local Services = {
			-- Nome |    Coordenadas	| Permissao para colocar roupas | Permissao para salvar as roupas
	[1] = { "Hospital", -443.36, -310.76, 34.91, "paramedico.permissao", "diretor.permissao" },
	[2] = { "Hospital", -437.91, -308.26, 34.91, "paramedico.permissao", "diretor.permissao" },
	[3] = { "Mecânica", 957.04, -965.33, 39.76, "mecanico.permissao", "lidermecanico.permissao" },
	[4] = { "Policia", -952.72, -2048.43, 12.92, "policia.permissao","comando.permissao" },
	[5] = { "Policia", -954.62, -2050.35, 12.92, "policia.permissao","comando.permissao" },
}

CreateThread(function()
	if IsDuplicityVersion() then
		vRPC = Tunnel.getInterface("vRP")

		Cloak = {}
		Tunnel.bindInterface("Cloakrooms",Cloak)

		CreateThread(function ()
			vRP._prepare("cloakroom/saveClothes","INSERT IGNORE INTO clothes(name,permiss,service,custom,sexo) VALUES(@name,@permiss,@service,@custom,@sexo)")
			vRP._prepare("cloakroom/updateClothes","UPDATE clothes SET custom = @custom WHERE name = @name AND permiss = @permiss")
			vRP._prepare("cloakroom/deleteClothes","DELETE FROM clothes WHERE name = @name")
			vRP._prepare("cloakroom/selectClothesT","SELECT * FROM clothes WHERE service = @service AND sexo = @sexo")
			vRP._prepare("cloakroom/selectClothesW","SELECT * FROM clothes WHERE name = @name AND sexo = @sexo")
			vRP._prepare("cloakroom/selectClothes","SELECT * FROM clothes WHERE name = @name AND permiss = @permiss")
			exports["oxmysql"]:execute([[
				CREATE TABLE IF NOT EXISTS `clothes` (
				`name` varchar(55) NOT NULL,
				`permiss` varchar(55) NOT NULL,
				`service` varchar(55) NOT NULL,
				`custom` varchar(500) NOT NULL,
				`sexo` varchar(55) NOT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=LATIN1;
			]])
		end)

		RegisterServerEvent("Cloakrooms:applyPreset")
		AddEventHandler("Cloakrooms:applyPreset",function(perm)
			local source = source
			local user_id = vRP.getUserId(source)
			if user_id then
				local sexo
				if GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_m_freemode_01") then
					sexo = "mp_m_freemode_01"
				elseif GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_f_freemode_01") then
					sexo = "mp_f_freemode_01"
				end
				if perm == "apply" then
					TriggerClientEvent("dynamic:closeSystem", source)
					local permiss = vRP.prompt(source, "Insira a perm", "")
					local services = vRP.prompt(source, "Insira a Org", "")
					if permiss and services then
						local clothes = vRP.prompt(source, "Insira o nome do uniforme", "")
						if clothes and clothes ~= "" and clothes ~= nil then
							local myClothes = vRPC.getCustomization(source)
							if myClothes then
								vRP.execute("cloakroom/saveClothes",{ name = clothes, service = services, permiss = permiss, custom = json.encode(myClothes), sexo = sexo })
								TriggerClientEvent("Notify",source,"importante","Preset salvo com sucesso",6000)
							end
						end
					end
					return
				elseif perm == "sairPtr" then
					local basic = vRP.getSData("RoupaOff:"..user_id)
					local consult = json.decode(basic) or {}
					if consult then
						TriggerClientEvent("updateRoupas",source,consult)
					end
					TriggerClientEvent("Notify",source,"negado","Você retirou seu uniforme..",6000)
					return
				elseif perm:find("remove") then
					local clothData = splitString(perm,"-")
					local clothName = clothData[2]
					if clothName then
						TriggerClientEvent("dynamic:closeSystem", source)
						vRP.execute("cloakroom/deleteClothes",{ name = clothName })
						TriggerClientEvent("Notify",source,"sucesso","Você retirou o uniforme da lista.",5000)
					end
					return
				end
				local consult = vRP.query("cloakroom/selectClothesW",{ name = perm, sexo = sexo })
				local myClothes = vRPC.getCustomPlayer(source)
				if consult[1] and consult[1].custom then
					if vRP.hasPermission(user_id,consult[1].permiss) then
						vRP.setSData("RoupaOff:"..user_id,json.encode(myClothes))
						vRPC._setCustomization(source,json.decode(consult[1].custom))
					end
				end
			end
		end)

		Cloak.requestPermission = function(index)
			local source = source
			local data = Services[index]
			local user_id = vRP.getUserId(source)
			if user_id and data then
				if vRP.hasPermission(user_id, data[5]) then
					local lider = vRP.hasPermission(user_id, data[6])
					local sexo
					if GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_m_freemode_01") then
						sexo = "mp_m_freemode_01"
					elseif GetEntityModel(GetPlayerPed(source)) == GetHashKey("mp_f_freemode_01") then
						sexo = "mp_f_freemode_01"
					end
					local consult = vRP.query("cloakroom/selectClothesT",{ service = data[1], sexo = sexo })
					return true,lider,consult
				end
			end
			return false
		end
	else
		Cloakroom = Tunnel.getInterface("Cloakrooms")

		CreateThread( function()
			while true do
				local timeDistance = 1000
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				for k,v in pairs(Services) do
					local distance = #(coords - vector3(v[2],v[3],v[4]))
					if distance <= 10 then
						timeDistance = 4
						DrawMarker(23,v[2],v[3],v[4]-0.99, 0, 0, 0, 0, 0, 0, 0.7, 0.7, 0.5, 95, 140, 50, 240, false, false, 0, false)
						if distance <= 2 then
							DrawBase3D(v[2],v[3],v[4]+0.1, "[ ~y~"..v[1].."~w~ ]")
							DrawBase3D(v[2],v[3],v[4], "Aperte ~y~E~w~ para abrir o sistema")
							if IsControlJustPressed(0,38) then
								local checkPermission,checkLider,uniforms = Cloakroom.requestPermission(k)
								if checkPermission then
									exports["dynamic"]:SubMenu("Equipar","Todas os uniformes de sua corporação.","uniforms")
									exports["dynamic"]:AddButton("Sair","Retirar o seu uniforme.","Cloakrooms:applyPreset","sairPtr","uniforms",true)
									if checkLider then
										exports["dynamic"]:SubMenu("Opções","Gerenciamento de uniformes líder.","optionsUniforms")
										exports["dynamic"]:AddButton("Adicionar","Adicione o uniforme que está em seu corpo.","Cloakrooms:applyPreset","apply","optionsUniforms",true)
										if uniforms and uniforms[1] then
											exports["dynamic"]:SubMenu("Remover","Remover uniformes.","removeUniforms")
											for _,x in pairs(uniforms) do
												exports["dynamic"]:AddButton(x.name,"Remover roupa.","Cloakrooms:applyPreset",'remove-'..x.name,"removeUniforms",true)
											end
										end
									end
									if uniforms then
										for _,x in pairs(uniforms) do
											exports["dynamic"]:AddButton(x.name,"Roupa para utilizar em serviço.","Cloakrooms:applyPreset",x.name,"uniforms",true)
										end
									end
									exports["dynamic"]:openMenu()
								end
							end
						end
					end
				end
				Wait(timeDistance)
			end
		end)
	end
end)
