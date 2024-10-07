-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local Webhooks = module("Reborn/webhooks")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
plVRP = {}
Tunnel.bindInterface("Player",plVRP)
plCLIENT = Tunnel.getInterface("Player")
vTASKBAR = Tunnel.getInterface("taskbar")
vSKINSHOP = Tunnel.getInterface("will_skinshop")
----------------------------------------------------------------------------------------------------------------------------------------
-- WINS 
----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("trywins")
AddEventHandler("trywins",function(nveh)
	TriggerClientEvent("vrp_player:syncWins",-1,nveh)
end)
----------------------------------------------------------------------------------------------------------------------------------------
-- LOG - MORTE
----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("logplayerDied")
AddEventHandler("logplayerDied",function(killer, weapon)
	local source = source
	local user_id = vRP.getUserId(source)
	local nuser_id = vRP.getUserId(killer)
	local admAmount = vRP.numPermission("Admin")
	if killer and nuser_id then
		for k,v in pairs(admAmount) do
			local player = vRP.getUserSource(v)
			TriggerClientEvent("Notify",player,"negado",""..nuser_id.." MATOU "..user_id,3000)
		end
		vRP.createWeebHook(Webhooks.webhooklinkdeath,"```prolog\n[ID]: "..nuser_id.." \n[MATOU]: "..user_id.." \n[ARMA]: "..weapon..""..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	else
		for k,v in pairs(admAmount) do
			local player = vRP.getUserSource(v)
			TriggerClientEvent("Notify",player,"negado",""..user_id.." SE MATOU ",3000)
		end
		vRP.createWeebHook(Webhooks.webhooklinkdeath,"```prolog\n[ID]: "..user_id.." \n[SE MATOU]\n[ARMA]: "..weapon..""..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WECOLOR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("wecolor",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if parseInt(args[1]) >= 0 and parseInt(args[1]) <= 7 then
			if vRP.hasPermission(user_id,"Attachs") then
				plCLIENT.weColors(source,parseInt(args[1]))
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WELUX
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("welux",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"Police") then
			plCLIENT.weLux(source)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMOTES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("e",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if not plCLIENT.getHandcuff(source) then
			if args[2] == "friend" then
				local identity = vRP.getUserIdentity(user_id)
				local nplayer = vRPclient.nearestPlayer(source,2)
				if nplayer then
					if vRPclient.getHealth(nplayer) > 101 and not plCLIENT.getHandcuff(nplayer) then
						local request = vRP.request(nplayer,"Você aceita o pedido de <b>"..identity.name.." da animação <b>"..args[1].."</b>?",30)
						if request then
							TriggerClientEvent("emotes",nplayer,args[1])
							TriggerClientEvent("emotes",source,args[1])
						end
					end
				end
			else
				TriggerClientEvent("emotes",source,args[1])
			end
		end
	end
end)

RegisterCommand("e5",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if vRP.hasPermission(user_id,"Owner") then
		if not plCLIENT.getHandcuff(source) then
			TriggerClientEvent("emotes5",source,args[1],args[2])
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMOTES2
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("e2",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"Admin") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local nplayer = vRPclient.nearestPlayer(source,2)
				if nplayer then
					TriggerClientEvent("emotes",nplayer,args[1])
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUM
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("premium",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		local identity = vRP.getUserIdentity(user_id)
		if identity then
			local consult = vRP.getInfos(identity.steam)
			if consult[1] and parseInt(os.time()) <= parseInt(consult[1].premium+24*consult[1].predays*60*60) then
				TriggerClientEvent("Notify",source,"importante","Você ainda tem "..vRP.getTimers(parseInt(86400*consult[1].predays-(os.time()-consult[1].premium))).." de benefícios <b>Premium</b>.",5000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WINS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("vidros",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
			local vehicle,vehNet = vRPclient.vehList(source,7)
			if vehicle then
				TriggerClientEvent("vrp_player:syncWins",-1,vehNet,args[1])
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- RECEIVESALARY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_player:salary")
AddEventHandler("vrp_player:salary",function()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local userGroups = vRP.getUserGroups(user_id)
		for k,v in pairs(userGroups) do
			local groupSalary = vRP.getSalaryByGroup(k)
			if groupSalary then
				vRP.addBank(parseInt(user_id), groupSalary)
				TriggerClientEvent("Notify",source,"sucesso","Voce recebeu seu salario de R$"..groupSalary..".", 5000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CALL
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('call',function(source)
	local source = source
	local user_id = vRP.getUserId(source)
	local answered = false
	if user_id then
		local service = vRP.prompt(source,"Quem deseja chamar? (Policia, Samu, Mecanico, Taxi, Admin):","")
		if service == "" then
			return
		end
		local description = vRP.prompt(source,"Descrição do seu chamado:","")
		if description == "" or #description < 4 then
			return
		end

		local x,y,z = vRPclient.getPositions(source)
		local identity = vRP.getUserIdentity(user_id)
		local players = {}

		if service == 'Policia' then
			players = vRP.numPermission("Police")
		elseif service == 'Samu' then
			players = vRP.numPermission("Paramedic")
		elseif service == 'Mecanico' then
			players = vRP.numPermission("Mechanic")
		elseif service == 'Taxi' then
			players = vRP.numPermission("Taxi")
		elseif service == 'Admin' then
			players = vRP.numPermission("Admin")
		else
			TriggerClientEvent("Notify",source,"negado","Não existe o serviço ".. service .. ".",5000)
		end
		if #players > 0 then
			TriggerClientEvent("Notify",source,"sucesso","Chamado efetuado com sucesso, aguarde no local.",5000)
			for k,v in pairs(players) do
				local sourcecall = vRP.getUserSource(v)
				local identitys = vRP.getUserIdentity(v)
				--if v and v ~= user_id then
					TriggerClientEvent("chatMessage",sourcecall,identity.name.." "..identity.name2.." ("..user_id..")",{107,182,84},description)
					local request = vRP.request(sourcecall,"Aceitar o chamado de <b>"..identity.name.." ("..description..")</b>?",30)
					if request then
						TriggerClientEvent("NotifyPush",sourcecall,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = description, sprite = 358, code = 20, title = "Chamado", x = x, y = y, z = z, name = identity.name.." "..identity.name2, phone = identity.phone, rgba = {69,115,41} })
						if not answered then
							answered = true
							vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
							TriggerClientEvent("Notify",source,"importante","Chamado atendido por <b>"..identitys.name.." "..identitys.name2.."</b>, aguarde no local.",10000)
						else
							if answered then
								TriggerClientEvent("Notify",sourcecall,"negado","Chamado já foi atendido por outra pessoa.",5000)
								vRPclient.playSound(sourcecall,"CHECKPOINT_MISSED","HUD_MINI_GAME_SOUNDSET")
							end
						end
					end
				--end
			end
		else
			TriggerClientEvent("Notify",source,"negado","Não tem ".. service .. " em serviço.",5000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("pd",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"policia.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				local police = vRP.numPermission("Police")
				for k,v in pairs(police) do
					local sourcepolice = vRP.getUserSource(v)
					async(function()
						TriggerClientEvent("chatMessage",sourcepolice,identity.name.." "..identity.name2,{140, 0, 255},rawCommand:sub(3))
					end)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MEC
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("mec",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"mecanico.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				local police = vRP.numPermission("Mechanic")
				for k,v in pairs(police) do
					local sourcepolice = vRP.getUserSource(v)
					async(function()
						TriggerClientEvent("chatMessage",sourcepolice,identity.name.." "..identity.name2,{196, 88, 0},rawCommand:sub(4))
					end)
				end
			end
		end
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- EXTRAS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("extras",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"Police") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				plCLIENT.extraVehicle(source,args[1])
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("hp",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"paramedico.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				local police = vRP.numPermission("Paramedic")
				for k,v in pairs(police) do
					local sourceparamedic = vRP.getUserSource(v)
					async(function()
						TriggerClientEvent("chatMessage",sourceparamedic,identity.name.." "..identity.name2,{255,175,175},rawCommand:sub(3))
					end)
				end
			end
		end
	end
end)

RegisterCommand("911",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"policia.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				TriggerClientEvent("chatMessage",-1,"[POLICE]:"..identity.name.." "..identity.name2,{0,0,255},rawCommand:sub(4))
			end
		end
	end
end)

RegisterCommand("112",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"paramedico.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				TriggerClientEvent("chatMessage",-1,"[SAMU]:"..identity.name.." "..identity.name2,{255,150,255},rawCommand:sub(4))
			end
		end
	end
end)

RegisterCommand("443",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id and args[1] then
		if vRP.hasPermission(user_id,"mecanico.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local identity = vRP.getUserIdentity(user_id)
				TriggerClientEvent("chatMessage",-1,"[MECANICA]:"..identity.name.." "..identity.name2,{255, 115, 0},rawCommand:sub(4))
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLATENAME
-----------------------------------------------------------------------------------------------------------------------------------------
local plateName = { "James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric","Stephen","Andrew","Raymond","Gregory","Joshua","Jerry","Dennis","Walter","Patrick","Peter","Harold","Douglas","Henry","Carl","Arthur","Ryan","Roger","Joe","Juan","Jack","Albert","Jonathan","Justin","Terry","Gerald","Keith","Samuel","Willie","Ralph","Lawrence","Nicholas","Roy","Benjamin","Bruce","Brandon","Adam","Harry","Fred","Wayne","Billy","Steve","Louis","Jeremy","Aaron","Randy","Howard","Eugene","Carlos","Russell","Bobby","Victor","Martin","Ernest","Phillip","Todd","Jesse","Craig","Alan","Shawn","Clarence","Sean","Philip","Chris","Johnny","Earl","Jimmy","Antonio","Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Maria","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley","Cynthia","Angela","Melissa","Brenda","Amy","Anna","Rebecca","Virginia","Kathleen","Pamela","Martha","Debra","Amanda","Stephanie","Carolyn","Christine","Marie","Janet","Catherine","Frances","Ann","Joyce","Diane","Alice","Julie","Heather","Teresa","Doris","Gloria","Evelyn","Jean","Cheryl","Mildred","Katherine","Joan","Ashley","Judith","Rose","Janice","Kelly","Nicole","Judy","Christina","Kathy","Theresa","Beverly","Denise","Tammy","Irene","Jane","Lori","Rachel","Marilyn","Andrea","Kathryn","Louise","Sara","Anne","Jacqueline","Wanda","Bonnie","Julia","Ruby","Lois","Tina","Phyllis","Norma","Paula","Diana","Annie","Lillian","Emily","Robin" }
local plateName2 = { "Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes" }
local plateSave = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLATE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("placa",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		getPlate(user_id,args)
	end
end)

RegisterNetEvent("police:runPlate")
AddEventHandler("police:runPlate",function()
	local source = source
	local user_id = vRP.getUserId(source)
	getPlate(user_id)
end)

function getPlate(user_id,args)
	local source = vRP.getUserSource(user_id)
	if vRP.hasPermission(user_id,"policia.permissao") then
		if vRPclient.getHealth(source) > 101 then
			if args and args[1] then
				local plateUser = vRP.getVehiclePlate(tostring(args[1]))
				if plateUser then
					local identity = vRP.getUserIdentity(plateUser)
					if identity then
						vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
						TriggerClientEvent("Notify",source,"importante","<b>Passaporte:</b> "..identity.id.."<br><b>RG:</b> "..identity.registration.."<br><b>Nome:</b> "..identity.name.." "..identity.name2.."<br><b>Telefone:</b> "..identity.phone,25000)
					end
				else
					if not plateSave[string.upper(args[1])] then
						plateSave[string.upper(args[1])] = { math.random(5000,9999),plateName[math.random(#plateName)].." "..plateName2[math.random(#plateName2)],vRP.generatePhoneNumber() }
					end

					vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
					TriggerClientEvent("Notify",source,"importante","<b>Passaporte:</b> "..plateSave[args[1]][1].."<br><b>RG:</b> "..string.upper(args[1]).."<br><b>Nome:</b> "..plateSave[args[1]][2].."<br><b>Telefone:</b> "..plateSave[args[1]][3],25000)
				end
			else
				local vehicle,vehNet,vehPlate = vRPclient.vehList(source,7)
				if vehicle then
					local plateUser = vRP.getVehiclePlate(vehPlate)
					if plateUser then
						local identity = vRP.getUserIdentity(plateUser)
						if identity then
							vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
							TriggerClientEvent("Notify",source,"importante","<b>PLACA:</b> "..identity.registration.."<br><b>Nome:</b> "..identity.name.." "..identity.name2.."<br><b>Telefone:</b> "..identity.phone,25000)
						end
					else
						if not plateSave[vehPlate] then
							plateSave[vehPlate] = { math.random(5000,9999),plateName[math.random(#plateName)].." "..plateName2[math.random(#plateName2)],vRP.generatePhoneNumber() }
						end

						vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
						TriggerClientEvent("Notify",source,"importante","<b>Passaporte:</b> "..plateSave[vehPlate][1].."<br><b>RG:</b> "..vehPlate.."<br><b>Nome:</b> "..plateSave[vehPlate][2].."<br><b>Telefone:</b> "..plateSave[vehPlate][3],25000)
					end
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SERVICE
-----------------------------------------------------------------------------------------------------------------------------------------
local admGroups = { "Owner", "Admin", "Mod", "Sup" }

RegisterCommand("deus",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		for k,adm in pairs(admGroups) do
			local waitGroup = "wait"..adm
			if vRP.hasPermission(user_id,adm) then
				vRP.removePermission(user_id,adm)
				vRP.insertPermission(user_id,waitGroup)
				TriggerClientEvent("Notify",source,"importante","Você saiu de serviço de "..adm,5000)
				vRP.execute("vRP/upd_group",{ user_id = user_id, permiss = adm, newpermiss = waitGroup })
				vRP.createWeebHook(Webhooks.servicedeus,"```prolog\n[ID]: "..user_id.." \n[PERDEU OS PODERES] "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			elseif vRP.hasPermission(user_id, waitGroup) then
				vRP.removePermission(user_id, waitGroup)
				vRP.insertPermission(user_id, adm)
				TriggerClientEvent("Notify",source,"importante","Você entrou em serviço de "..adm,5000)
				vRP.execute("vRP/upd_group",{ user_id = user_id, permiss = waitGroup, newpermiss = adm })
				vRP.createWeebHook(Webhooks.servicedeus,"```prolog\n[ID]: "..user_id.." \n[GANHOU PODERES] "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			end
		end
	end
end)
----------------------------------------------------------------------------------------------------------------------------------------
-- CUFF
-----------------------------------------------------------------------------------------------------------------------------------------
local poCuff = {}
function plVRP.cuffToggle()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"Admin") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) and poCuff[user_id] == nil then
				if not vRPclient.inVehicle(source) then
					local nplayer = vRPclient.nearestPlayer(source,1.2)
					local nuser_id = vRP.getUserId(nplayer)
					if nplayer and not vRPclient.inVehicle(nplayer) then
						if plCLIENT.getHandcuff(nplayer) then
							plCLIENT.toggleCarry2(nplayer,source)
							vRPclient._playAnim(source,false,{"mp_arresting","a_uncuff"},false)
							SetTimeout(4000,function()
								plCLIENT.toggleHandcuff(nplayer)
								plCLIENT.toggleCarry2(nplayer,source)
								vRPclient._stopAnim(nplayer,false)
								TriggerClientEvent("vrp_sound:source",nplayer,"uncuff",0.5)
								TriggerClientEvent("vrp_sound:source",source,"uncuff",0.5)
							end)
						else
							poCuff[user_id] = true
							plCLIENT.toggleCarry2(nplayer,source)
							TriggerClientEvent("vrp_sound:source",source,"cuff",0.5)
							TriggerClientEvent("vrp_sound:source",nplayer,"cuff",0.5)
							vRPclient._playAnim(source,false,{"mp_arrest_paired","cop_p2_back_left"},false)
							vRPclient._playAnim(nplayer,false,{"mp_arrest_paired","crook_p2_back_left"},false)
							--vRPclient._playAnim(nplayer,true,{"mp_arresting","idle"},true)
							SetTimeout(3500,function()
								plCLIENT.toggleHandcuff(nplayer)
								plCLIENT.toggleCarry2(nplayer,source)
								vRPclient._stopAnim(source,false)
							end)
							poCuff[user_id] = nil
						end
					end
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UNCUFF
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("algemas",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"Owner") then
			plCLIENT.toggleHandcuff(source)
			vRPclient._stopAnim(source,false)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADFIRED
-----------------------------------------------------------------------------------------------------------------------------------------
local shotFired = {}
Citizen.CreateThread(function()
	while true do
		for k,v in pairs(shotFired) do
			if shotFired[k] > 0 then
				shotFired[k] = v - 10
				if shotFired[k] <= 0 then
					shotFired[k] = nil
				end
			end
		end
		Citizen.Wait(10000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOTSFIRED
-----------------------------------------------------------------------------------------------------------------------------------------
function plVRP.shotsFired()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if shotFired[user_id] == nil then
			if not vRP.hasPermission(user_id,"policia.permissao") then
				shotFired[user_id] = 30
				local x,y,z = vRPclient.getPositions(source)
				local comAmount = vRP.numPermission("Police")
				for k,v in pairs(comAmount) do
					local player = vRP.getUserSource(v)
					async(function()
						TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Ei esta tendo troca de tiro aqui perto de minha casa!", code = 10, title = "Confronto em andamento", x = x, y = y, z = z, criminal = "Disparos de arma de fogo", rgba = {105,52,136} })
					end)
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CARRY
-----------------------------------------------------------------------------------------------------------------------------------------
function plVRP.carryToggle()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"admin.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local nplayer = vRPclient.nearestPlayer(source,2)
				if nplayer then
					plCLIENT.toggleCarry(nplayer,source)
				end
			end
		end
	end
end

RegisterServerEvent("inventory:Carry")
AddEventHandler("inventory:Carry", plVRP.carryToggle)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CARRY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("carregar2",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
				local nplayer = vRPclient.nearestPlayer(source,2)
				if nplayer then
					TriggerClientEvent("vrp_rope:toggleRope",source,nplayer)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- RV
-----------------------------------------------------------------------------------------------------------------------------------------
function removeVehicle(source)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"Admin") or vRP.getInventoryItemAmount(user_id,"rope") >= 1 then
			if vRPclient.getHealth(source) > 101 and not vRPclient.inVehicle(source) then
				local vehicle,vehNet,vehPlate,vehName,vehLock = vRPclient.vehList(source,11)
				if vehicle then
					if vehLock ~= 2 then
						local nplayer = vRPclient.nearestPlayer(source,11)
						if nplayer then
							plCLIENT.removeVehicle(nplayer)
						end
					end
				end
			end
		end
	end
end

RegisterCommand("rv",function(source,args,rawCommand)
	removeVehicle(source)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CV
-----------------------------------------------------------------------------------------------------------------------------------------
function putVehicle(source, seat)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"Admin") or vRP.getInventoryItemAmount(user_id,"rope") >= 1 then
			if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) and not vRPclient.inVehicle(source) then
				local vehicle,vehNet,vehPlate,vehName,vehLock = vRPclient.vehList(source,11)
				if vehicle then
					if vehLock ~= 2 then
						local nplayer = vRPclient.nearestPlayer(source,2)
						if nplayer then
							plCLIENT.putVehicle(nplayer)
						end
					end
				end
			end
		end
	end
end

RegisterCommand("cv",function(source,args,rawCommand)
	putVehicle(source)
end)

RegisterServerEvent("player:cvFunctions")
AddEventHandler("player:cvFunctions",function(mode)
	local source = source
	if mode == "cv" then
		putVehicle(source)
	elseif mode == "rv" then
		removeVehicle(source)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OUTFIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("outfit",function(source,args,rawCommand)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if not vRP.wantedReturn(user_id) and not vRP.reposeReturn(user_id) then
			if args[1] then
				if args[1] == "save" then
					local custom = vSKINSHOP.getCustomization(source)
					if custom then
						vRP.setSData("saveClothes:"..parseInt(user_id),json.encode(custom))
						TriggerClientEvent("Notify",source,"sucesso","Outfit salvo com sucesso.",3000)
					end
				end
			else
				local consult = vRP.getSData("saveClothes:"..parseInt(user_id))
				local result = json.decode(consult)
				if result then
					TriggerClientEvent("updateRoupas",source,result)
					TriggerClientEvent("Notify",source,"sucesso","Outfit aplicado com sucesso.",3000)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUMFIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("premiumfit",function(source,args,rawCommand)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if not vRP.wantedReturn(user_id) and not vRP.reposeReturn(user_id) and vRP.getPremium(user_id) then
			if args[1] then
				if args[1] == "save" then
					local custom = vSKINSHOP.getCustomization(source)
					if custom then
						vRP.setSData("premClothes:"..parseInt(user_id),json.encode(custom))
						TriggerClientEvent("Notify",source,"sucesso","Premiumfit salvo com sucesso.",3000)
					end
				end
			else
				local consult = vRP.getSData("premClothes:"..parseInt(user_id))
				local result = json.decode(consult)
				if result then
					TriggerClientEvent("updateRoupas",source,result)
					TriggerClientEvent("Notify",source,"sucesso","Premiumfit aplicado com sucesso.",3000)
				end
			end
		end
	end
end)

local removeFit = {
	["homem"] = {
		["hat"] = { item = -1, texture = 0 },
		["pants"] = { item = 14, texture = 0 },
		["vest"] = { item = 0, texture = 0 },
		["backpack"] = { item = 0, texture = 0 },
		["bracelet"] = { item = -1, texture = 0 },
		["decals"] = { item = 0, texture = 0 },
		["mask"] = { item = 0, texture = 0 },
		["shoes"] = { item = 5, texture = 0 },
		["tshirt"] = { item = 15, texture = 0 },
		["torso"] = { item = 15, texture = 0 },
		["accessory"] = { item = 0, texture = 0 },
		["watch"] = { item = -1, texture = 0 },
		["arms"] = { item = 15, texture = 0 },
		["glass"] = { item = 0, texture = 0 },
		["ear"] = { item = -1, texture = 0 }
	},
	["mulher"] = {
		["hat"] = { item = -1, texture = 0 },
		["pants"] = { item = 14, texture = 0 },
		["vest"] = { item = 0, texture = 0 },
		["backpack"] = { item = 0, texture = 0 },
		["bracelet"] = { item = -1, texture = 0 },
		["decals"] = { item = 0, texture = 0 },
		["mask"] = { item = 0, texture = 0 },
		["shoes"] = { item = 5, texture = 0 },
		["tshirt"] = { item = 15, texture = 0 },
		["torso"] = { item = 15, texture = 0 },
		["accessory"] = { item = 0, texture = 0 },
		["watch"] = { item = -1, texture = 0 },
		["arms"] = { item = 15, texture = 0 },
		["glass"] = { item = 0, texture = 0 },
		["ear"] = { item = -1, texture = 0 }
	}
}

RegisterNetEvent("player:Outfit")
AddEventHandler("player:Outfit",function(Mode)
	local source = source
	local Passport = vRP.getUserId(source)
	if Mode == "aplicar" then
		local consult = vRP.getSData("saveClothes:"..Passport)
		local result = json.decode(consult) or {}
		if result["pants"] ~= nil then
			TriggerClientEvent("skinshop:Apply",source,result)
			TriggerClientEvent("Notify",source,"verde","Roupas aplicadas.",3000)
		else
			TriggerClientEvent("Notify",source,"amarelo","Roupas não encontradas.",3000)
		end
	elseif Mode == "salvar" then
		local custom = vSKINSHOP.getCustomization(source)
		if custom then
			vRP.setSData("saveClothes:"..Passport,json.encode(custom))
			TriggerClientEvent("Notify",source,"verde","Roupas salvas.",3000)
		end
	elseif Mode == "aplicarpre" then
		local consult = vRP.getSData("premClothes:"..Passport)
		local result = json.decode(consult) or {}
		if result["pants"] then
			TriggerClientEvent("skinshop:Apply",source,result)
			TriggerClientEvent("Notify",source,"verde","Roupas aplicadas.",5000)
		else
			TriggerClientEvent("Notify",source,"amarelo","Roupas não encontradas.",5000)
		end
	elseif Mode == "salvarpre" then
		local custom = vSKINSHOP.getCustomization(source)
		if custom then
			vRP.setSData("premClothes:"..Passport,json.encode(custom))
			TriggerClientEvent("Notify",source,"verde","Roupas salvas.",5000)
		end
	elseif Mode == "remover" then
		local Model = vRP.modelPlayer(source)
		if Model == "mp_m_freemode_01" then
			TriggerClientEvent("skinshop:Apply",source,removeFit["homem"])
			TriggerClientEvent("Notify",source,"verde","Roupas Removidas",3000)
		elseif Model == "mp_f_freemode_01" then
			TriggerClientEvent("skinshop:Apply",source,removeFit["mulher"])
			TriggerClientEvent("Notify",source,"verde","Roupas Removidas",3000)
		end
	else
		TriggerClientEvent("will_skinshop:set"..Mode,source)
	end
end)

RegisterServerEvent("skinshop:Remove")
AddEventHandler("skinshop:Remove",function(Mode)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local nplayer = vRPclient.nearestPlayer(source,2)
		if nplayer then
			if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") then
				TriggerClientEvent("will_skinshop:set"..Mode,nplayer)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETREPOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("setrepouso",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if vRP.hasPermission(user_id,"paramedico.permissao") then
		local nplayer = vRPclient.nearestPlayer(source,2)
		if nplayer then
			local nuser_id = vRP.getUserId(nplayer)
			if nuser_id then
				local identity = vRP.getUserIdentity(parseInt(nuser_id))
				if vRP.request(source,"Deseja aplicar <b>"..parseInt(args[1]).." minutos</b>.",30) then
					vRP.reposeTimer(nuser_id,parseInt(args[1]))
					TriggerClientEvent("Notify",source,"sucesso","Você aplicou <b>"..parseInt(args[1]).." minutos</b> de repouso.",10000)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WALKING
-----------------------------------------------------------------------------------------------------------------------------------------
local walking = {
	{ "move_m@alien" },
	{ "anim_group_move_ballistic" },
	{ "move_f@arrogant@a" },
	{ "move_m@brave" },
	{ "move_m@casual@a" },
	{ "move_m@casual@b" },
	{ "move_m@casual@c" },
	{ "move_m@casual@d" },
	{ "move_m@casual@e" },
	{ "move_m@casual@f" },
	{ "move_f@chichi" },
	{ "move_m@confident" },
	{ "move_m@business@a" },
	{ "move_m@business@b" },
	{ "move_m@business@c" },
	{ "move_m@drunk@a" },
	{ "move_m@drunk@slightlydrunk" },
	{ "move_m@buzzed" },
	{ "move_m@drunk@verydrunk" },
	{ "move_f@femme@" },
	{ "move_characters@franklin@fire" },
	{ "move_characters@michael@fire" },
	{ "move_m@fire" },
	{ "move_f@flee@a" },
	{ "move_p_m_one" },
	{ "move_m@gangster@generic" },
	{ "move_m@gangster@ng" },
	{ "move_m@gangster@var_e" },
	{ "move_m@gangster@var_f" },
	{ "move_m@gangster@var_i" },
	{ "anim@move_m@grooving@" },
	{ "move_f@heels@c" },
	{ "move_m@hipster@a" },
	{ "move_m@hobo@a" },
	{ "move_f@hurry@a" },
	{ "move_p_m_zero_janitor" },
	{ "move_p_m_zero_slow" },
	{ "move_m@jog@" },
	{ "anim_group_move_lemar_alley" },
	{ "move_heist_lester" },
	{ "move_f@maneater" },
	{ "move_m@money" },
	{ "move_m@posh@" },
	{ "move_f@posh@" },
	{ "move_m@quick" },
	{ "female_fast_runner" },
	{ "move_m@sad@a" },
	{ "move_m@sassy" },
	{ "move_f@sassy" },
	{ "move_f@scared" },
	{ "move_f@sexy@a" },
	{ "move_m@shadyped@a" },
	{ "move_characters@jimmy@slow@" },
	{ "move_m@swagger" },
	{ "move_m@tough_guy@" },
	{ "move_f@tough_guy@" },
	{ "move_p_m_two" },
	{ "move_m@bag" },
	{ "move_m@injured" }
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ANDAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("andar",function(source,args,rawCommand)
	if args[1] then
		if not plCLIENT.getHandcuff(source) then
			plCLIENT.movementClip(source,walking[parseInt(args[1])][1])
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- LIVERY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("extras2",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if (vRP.hasPermission(user_id,"Police") or vRP.hasPermission(user_id,"Paramedic")) and parseInt(args[1]) > 0 then
			plCLIENT.toggleLivery(source,parseInt(args[1]))
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRUNKIN
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("trunkin",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) and not plCLIENT.playerDriving(source) then
			TriggerClientEvent("vrp_player:EnterTrunk",source)
		end
	end
end)

RegisterNetEvent("player:EnterTrunk")
AddEventHandler("player:EnterTrunk",function()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) and not plCLIENT.playerDriving(source) then
			TriggerClientEvent("vrp_player:EnterTrunk",source)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKTRUNK
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("checktrunk",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not vRPclient.inVehicle(source) and not plCLIENT.getHandcuff(source) then
			local nplayer = vRPclient.nearestPlayer(source,2)
			if nplayer then
				TriggerClientEvent("vrp_player:CheckTrunk",nplayer)
			end
		end
	end
end)

RegisterNetEvent("player:CheckTrunk")
AddEventHandler("player:CheckTrunk",function()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not vRPclient.inVehicle(source) and not plCLIENT.getHandcuff(source) then
			local nplayer = vRPclient.nearestPlayer(source,2)
			if nplayer then
				TriggerClientEvent("vrp_player:CheckTrunk",nplayer)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEAT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("seat",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
			TriggerClientEvent("vrp_player:SeatPlayer",source,args[1])
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ONDUTY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("onduty",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 and not plCLIENT.getHandcuff(source) then
			if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"mecanico.permissao") or vRP.hasPermission(user_id,"Taxi") then
				local onDuty = ""
				local service = {}

				if vRP.hasPermission(user_id,"policia.permissao") then
					service = vRP.numPermission("Police")
				elseif vRP.hasPermission(user_id,"paramedico.permissao") then
					service = vRP.numPermission("Paramedic")
				elseif vRP.hasPermission(user_id,"mecanico.permissao") then
					service = vRP.numPermission("Mechanic")
				elseif vRP.hasPermission(user_id,"Taxi") then
					service = vRP.numPermission("Taxi")
				end

				for k,v in pairs(service) do
					local nuser_id = vRP.getUserId(v)
					local identity = vRP.getUserIdentity(nuser_id)

					onDuty = onDuty.."<b>Passaporte:</b> "..vRP.format(parseInt(nuser_id)).."   -   <b>Nome:</b> "..identity.name.." "..identity.name2.."<br>"
				end
				
				TriggerClientEvent("Notify",source,"importante",onDuty,30000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- /SEQUESTRO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('sequestro',function(source,args,rawCommand)
	local nplayer = vRPclient.nearestPlayer(source,5)
	if nplayer then
		if plCLIENT.getHandcuff(nplayer) then
			if not plCLIENT.getNoCarro(source) then
				local vehicle = vRPclient.vehList(source,7)
				if vehicle then
					if plCLIENT.getCarroClass(source,vehicle) then
						vRPclient.setMalas(nplayer)
					end
				end
			elseif vRPclient.isMalas(nplayer) then
				vRPclient.setMalas(nplayer)
			end
		else
			TriggerClientEvent("Notify",source,"aviso","A pessoa precisa estar algemada para colocar ou retirar do Porta-Malas.",4000)
		end
	end
end)
------------------------------------------------------------------------------------------ 
-- BEIJAR
-----------------------------------------------------------------------------------------------
RegisterCommand("beijar",function(source,args,rawCommand)
    local user_id = vRP.getUserId(source)
    local nplayer = vRPclient.nearestPlayer(source,2)
	if vRPclient.getHealth(source) > 101 and not vRPclient.inVehicle(source) and not plCLIENT.getHandcuff(source) then
		if nplayer then
			local pedido = vRP.request(nplayer,"Deseja iniciar o beijo?",30)
			if pedido then
				vRPclient.playAnim(source,true,{"mp_ped_interaction","kisses_guy_a"},false)    
				vRPclient.playAnim(nplayer,true,{"mp_ped_interaction","kisses_guy_b"},false)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PTR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('ptr', function(source,args,rawCommand)
    local user_id = vRP.getUserId(source)
    local player = vRP.getUserSource(user_id)
    local oficiais = vRP.numPermission("Police")
    local policia = 0
    local oficiais_nomes = ""
    if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"mecanico.permissao") or vRP.hasPermission(user_id,"Owner") or vRP.hasPermission(user_id,"Admin") then
        for k,v in ipairs(oficiais) do
            local identity = vRP.getUserIdentity(parseInt(v))
            oficiais_nomes = oficiais_nomes .. "<b>" .. v .. "</b>: " .. identity.name .. " " .. identity.name2 .. "<br>"
            policia = policia + 1
        end
        TriggerClientEvent("Notify",source,"importante", "Atualmente <b>"..policia.." Oficiais</b> em serviço.", 4000)
        if parseInt(policia) > 0 then
            TriggerClientEvent("Notify",source,"importante", oficiais_nomes,4000)
        end
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMS
 ----------------------------------------------------------------------------------------------------------------------------------------
 RegisterCommand('ems', function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	local player = vRP.getUserSource(user_id)
	local oficiais = vRP.numPermission("Paramedic")
	local paramedicos = 0
	local paramedicos_nomes = ""
	if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"mecanico.permissao") or vRP.hasPermission(user_id,"Owner") or vRP.hasPermission(user_id,"Admin") then
		for k,v in ipairs(oficiais) do
			local identity = vRP.getUserIdentity(parseInt(v))
			paramedicos_nomes = paramedicos_nomes .. "<b>" .. v .. "</b>: " .. identity.name .. " " .. identity.name2 .. "<br>"
			paramedicos = paramedicos + 1
		end
		TriggerClientEvent("Notify",source,"importante", "Atualmente <b>"..paramedicos.." Paramédicos</b> em serviço.", 4000)
		if parseInt(paramedicos) > 0 then
			TriggerClientEvent("Notify",source,"importante", paramedicos_nomes, 4000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- 
----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('mecs', function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	local player = vRP.getUserSource(user_id)
	local oficiais = vRP.numPermission("Mechanic")
	local paramedicos = 0
	local oficiais_nomes = ""
	if vRP.hasPermission(user_id,"policia.permissao") or vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"mecanico.permissao") or vRP.hasPermission(user_id,"Owner") or vRP.hasPermission(user_id,"Admin") then
		for k,v in ipairs(oficiais) do
			local identity = vRP.getUserIdentity(parseInt(v))
			oficiais_nomes = oficiais_nomes .. "<b>" .. v .. "</b>: " .. identity.name .. " " .. identity.name2 .. "<br>"
			paramedicos = paramedicos + 1
		end
		TriggerClientEvent("Notify",source,"importante", "Atualmente <b>"..paramedicos.." Mecânicos</b> em serviço.", 4000)
		if parseInt(paramedicos) > 0 then
			TriggerClientEvent("Notify",source,"importante", oficiais_nomes, 4000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- Status
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("status", function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		local samuAmount = vRP.numPermission("Paramedic")
		local copAmount = vRP.numPermission("Police")
		local mecAmount = vRP.numPermission("Mechanic")
		TriggerClientEvent("Notify",source,"importante","<b>Policiais:</b> "..#copAmount.."<br><b>Paramedicos:</b> "..#samuAmount.."<br><b>Mecânico:</b> "..#mecAmount.." ",15000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FESTINHA
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand('festinha',function(source,args,rawCommand)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") or vRP.hasPermission(user_id,"Owner") then
        local identity = vRP.getUserIdentity(user_id)
        local mensagem = vRP.prompt(source,"Mensagem:","")
        if mensagem == "" then
            return
        end
        vRPclient.setDiv(-1,"festinha"," @keyframes blinking {    0%{ background-color: #ff3d50; border: 2px solid #871924; opacity: 0.8; } 25%{ background-color: #d22d99; border: 2px solid #901f69; opacity: 0.8; } 50%{ background-color: #55d66b; border: 2px solid #126620; opacity: 0.8; } 75%{ background-color: #22e5e0; border: 2px solid #15928f; opacity: 0.8; } 100%{ background-color: #222291; border: 2px solid #6565f2; opacity: 0.8; }  } .div_festinha { font-size: 11px; font-family: arial; color: rgba(255, 255, 255,1); padding: 20px; bottom: 10%; right: 5%; max-width: 500px; position: absolute; -webkit-border-radius: 5px; animation: blinking 1s infinite; } bold { font-size: 16px; }","<bold>"..mensagem.."</bold><br><br>Festeiro(a): "..identity.name.." "..identity.name2.."</b>.")
        SetTimeout(7000,function()
            vRPclient.removeDiv(-1,"festinha")
        end)
    end
end)

RegisterServerEvent('heli:forward.spotlight')
AddEventHandler('heli:forward.spotlight',function(state)
	local source = source
	TriggerClientEvent('heli:forward.spotlight',-1,source,state)
end)

RegisterServerEvent('heli:tracking.spotlight')
AddEventHandler('heli:tracking.spotlight',function(target_netID,target_plate,targetposx,targetposy,targetposz)
	local source = source
	TriggerClientEvent('heli:Tspotlight',-1,source,target_netID,target_plate,targetposx,targetposy,targetposz)
end)

RegisterServerEvent('heli:tracking.spotlight.toggle')
AddEventHandler('heli:tracking.spotlight.toggle',function()
	local source = source
	TriggerClientEvent('heli:Tspotlight.toggle',-1,source)
end)

RegisterServerEvent('heli:pause.tracking.spotlight')
AddEventHandler('heli:pause.tracking.spotlight',function(pause_Tspotlight)
	local source = source
	TriggerClientEvent('heli:pause.Tspotlight',-1,source,pause_Tspotlight)
end)

RegisterServerEvent('heli:manual.spotlight')
AddEventHandler('heli:manual.spotlight',function()
	local source = source
	TriggerClientEvent('heli:Mspotlight',-1,source)
end)

RegisterServerEvent('heli:manual.spotlight.toggle')
AddEventHandler('heli:manual.spotlight.toggle',function()
	local source = source
	TriggerClientEvent('heli:Mspotlight.toggle',-1,source)
end)

RegisterServerEvent('heli:radius.up')
AddEventHandler('heli:radius.up',function()
	local source = source
	TriggerClientEvent('heli:radius.up',-1,source)
end)

RegisterServerEvent('heli:radius.down')
AddEventHandler('heli:radius.down',function()
	local source = source
	TriggerClientEvent('heli:radius.down',-1,source)
end)
