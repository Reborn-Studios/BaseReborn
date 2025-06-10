vRP.prepare("vRP/get_priorityqueue","SELECT identifier,priority FROM accounts")

local Queue = {}
local maxPlayers = 1024
local priorityUsers = {}
local languages = Reborn.Language()
local Webhooks = module("config/webhooks") or {}
Queue.QueueList = {}
Queue.PlayerList = {}
Queue.PlayerCount = 0
Queue.Priority = {}
Queue.Connecting = {}
Queue.ThreadCount = 0

function Queue:HexIdToSteamId(hexId)
	local cid = parseInt(string.sub(hexId, 7))
	local steam64 = parseInt(string.sub( cid, 2))
	local a = steam64 % 2 == 0 and 0 or 1
	local b = parseInt(math.abs(6561197960265728 - steam64 - a) / 2)
	local sid = "steam_0:"..a..":"..(a == 1 and b -1 or b)
	return sid
end

function Queue:IsSteamRunning(src)
	local baseIdentifier = GlobalState['Basics']['Identifier'] or "steam"
	if baseIdentifier ~= "steam" then return true end
	for k,v in ipairs(GetPlayerIdentifiers(src)) do
		if string.sub(v,1,5) == baseIdentifier then
			return true
		end
	end
	return false
end

function Queue:IsInQueue(ids,rtnTbl,bySource,connecting)
	for genericKey1,genericValue1 in ipairs(connecting and self.Connecting or self.QueueList) do
		local inQueue = false

		if not bySource then
			for genericKey2,genericValue2 in ipairs(genericValue1.ids) do
				if inQueue then break end

				for genericKey3,genericValue3 in ipairs(ids) do
					if genericValue3 == genericValue2 then inQueue = true break end
				end
			end
		else
			inQueue = ids == genericValue1.source
		end

		if inQueue then
			if rtnTbl then
				return genericKey1,connecting and self.Connecting[genericKey1] or self.QueueList[genericKey1]
			end

			return true
		end
	end
	return false
end

local function getPriority()
	priorityUsers = {}
	local pList = vRP.query("vRP/get_priorityqueue")

	for i = 1,#pList do
		priorityUsers[pList[i].identifier] = pList[i].priority
	end	

	return priorityUsers
end

function Queue:IsPriority(ids)
	local baseIdentifier = GlobalState['Basics']['Identifier'] or "steam"
	for k,v in ipairs(ids) do
		v = string.lower(v)

		priorityUsers = getPriority()

		if string.find(v,baseIdentifier) and not priorityUsers[v] then
			local steamid = self:HexIdToSteamId(v)
			if priorityUsers[steamid] then
				return priorityUsers[steamid] ~= nil and priorityUsers[steamid] or false
			end
		end

		if priorityUsers[v] then
			return priorityUsers[v] ~= nil and priorityUsers[v] or false
		end
	end
end

function Queue:AddToQueue(ids,connectTime,name,src,deferrals)
	if self:IsInQueue(ids) then
		return
	end

	local tmp = { source = src, ids = ids, name = name, firstconnect = connectTime, priority = self:IsPriority(ids) or (src == "debug" and math.random(0,15)), timeout = 0, deferrals = deferrals }

	local _pos = 1
	local queueCount = self:GetSize() + 1

	for k,v in ipairs(self.QueueList) do
		if tmp.priority then
			if not v.priority then
				_pos = k
			else
				if tmp.priority > v.priority then
					_pos = k
				end
			end
			if _pos then
				break
			end
		end
	end

	if not _pos then
		_pos = self:GetSize() + 1
	end

	table.insert(self.QueueList,_pos,tmp)
end

function Queue:RemoveFromQueue(ids,bySource)
	if self:IsInQueue(ids,false,bySource) then
		local pos, data = self:IsInQueue(ids,true,bySource)
		if pos and type(pos) == "number" then
			table.remove(self.QueueList,pos)
		end
	end
end

function Queue:GetSize()
	return #self.QueueList
end

function Queue:ConnectingSize()
	return #self.Connecting
end

function Queue:IsInConnecting(ids,bySource,refresh)
	local inConnecting,tbl = self:IsInQueue(ids,refresh and true or false,bySource and true or false,true)

	if not inConnecting then
		return false
	end

	if refresh and inConnecting and tbl then
		self.Connecting[inConnecting].timeout = 0
	end
	return true
end

function Queue:RemoveFromConnecting(ids,bySource)
	for k,v in ipairs(self.Connecting) do
		local inConnecting = false

		if not bySource then
			for i,j in ipairs(v.ids) do
				if inConnecting then
					break
				end

				for q,e in ipairs(ids) do
					if e == j then inConnecting = true break end
				end
			end
		else
			inConnecting = ids == v.source
		end

		if inConnecting then
			table.remove(self.Connecting,k)
			return true
		end
	end
	return false
end

function Queue:AddToConnecting(ids,ignorePos,autoRemove,done)
	local function removeFromQueue()
	if not autoRemove then
		return
	end

	done(languages.connectingerr)
		self:RemoveFromConnecting(ids)
		self:RemoveFromQueue(ids)
	end

	if self:ConnectingSize() >= 10 then
		removeFromQueue()
		return false
	end

	if ids[1] == "debug" then
		table.insert(self.Connecting,{ source = ids[1], ids = ids, name = ids[1], firstconnect = ids[1], priority = ids[1], timeout = 0 })
		return true
	end

	if self:IsInConnecting(ids) then
		self:RemoveFromConnecting(ids)
	end

	local pos,data = self:IsInQueue(ids,true)
	if not ignorePos and (not pos or pos > 1) then
		removeFromQueue()
		return false
	end

	table.insert(self.Connecting,data)
	self:RemoveFromQueue(ids)
	return true
end

function Queue:GetIds(src)
	local ids = GetPlayerIdentifiers(src)
	local ip = GetPlayerEndpoint(src)

	ids = (ids and ids[1]) and ids or (ip and {"ip:" .. ip} or false)

	if ids and #ids > 1 then
		for k,v in ipairs(ids) do
			if string.sub(v, 1, 3) == "ip:" then table.remove(ids, k) end
		end
	end
	return ids
end

function Queue:AddPriority(id,power)
	if not id then
		return false
	end

	priorityUsers = getPriority()

	if type(id) == "table" then
		for k, v in pairs(id) do
			if k and type(k) == "string" and v and type(v) == "number" then
				priorityUsers[k] = v
			else
				return false
			end
		end
		return true
	end

	power = (power and type(power) == "number") and power or 10
	priorityUsers[string.lower(id)] = power

	return true
end

function Queue:RemovePriority(id)
	priorityUsers = getPriority()

	if not id then
		return false
	end

	priorityUsers[id] = nil
	return true
end

function Queue:UpdatePosData(src,ids,deferrals)
	local pos,data = self:IsInQueue(ids,true)
	self.QueueList[pos].source = src
	self.QueueList[pos].ids = ids
	self.QueueList[pos].timeout = 0
	self.QueueList[pos].deferrals = deferrals
end

function Queue:NotFull(firstJoin)
	local canJoin = self.PlayerCount + self:ConnectingSize() < maxPlayers and self:ConnectingSize() < 100
	if firstJoin and canJoin then
		canJoin = self:GetSize() <= 1
	end
	return canJoin
end

function Queue:SetPos(ids,newPos)
	local pos,data = self:IsInQueue(ids,true)
	if pos and type(pos) == "number" then
		table.remove(self.QueueList,pos)
	end
	table.insert(self.QueueList,newPos,data)
end

function AddPriority(id,power)
	return Queue:AddPriority(id,power)
end

function RemovePriority(id)
	return Queue:RemovePriority(id)
end

Citizen.CreateThread(function()
	local function playerConnect(name,setKickReason,deferrals)
		local src = source
		local ids = Queue:GetIds(src)
		local connectTime = os.time()
		local connecting = true

		deferrals.defer()

		Citizen.CreateThread(function()
			while connecting do
				Citizen.Wait(500)
				if not connecting then
					return
				end
				deferrals.update(languages.connecting)
			end
		end)

		Citizen.Wait(1000)

		local function done(msg)
			connecting = false
			Citizen.CreateThread(function()
				if msg then
					deferrals.update(tostring(msg) and tostring(msg) or "")
				end

				Citizen.Wait(1000)

				if msg then
					deferrals.done(tostring(msg) and tostring(msg) or "")
					CancelEvent()
				end
			end)
		end

		local function update(msg)
			connecting = false
			deferrals.update(tostring(msg) and tostring(msg) or "")
		end

		if not ids then
			done(languages.err)
			CancelEvent()
			return
		end

		if not Queue:IsSteamRunning(src) then -- if Reborn.RequireSteam and not Queue:IsSteamRunning(src) then
			done(languages.steam)
			CancelEvent()
			return
		end

		local reason = "You were kicked from joining the queue"

		local function setReason(msg)
			reason = tostring(msg)
		end

		TriggerEvent("queue:playerJoinQueue",src,setReason)

		if WasEventCanceled() then
			done(reason)

			Queue:RemoveFromQueue(ids)
			Queue:RemoveFromConnecting(ids)

			CancelEvent()
			return
		end

		local rejoined = false

		if Queue:IsInQueue(ids) then
			rejoined = true
			Queue:UpdatePosData(src,ids,deferrals)
		else
			Queue:AddToQueue(ids,connectTime,name,src,deferrals)
		end

		if Queue:IsInConnecting(ids,false,true) then
			Queue:RemoveFromConnecting(ids)

			if Queue:NotFull() then
				local added = Queue:AddToConnecting(ids,true,true,done)
				if not added then
					CancelEvent()
					return
				end

				done()
				TriggerEvent("queue:playerConnecting",src,ids,name,setKickReason,deferrals)

				return
			else
				Queue:AddToQueue(ids,connectTime,name,src,deferrals)
				Queue:SetPos(ids,1)
			end
		end

		local pos,data = Queue:IsInQueue(ids,true)

		if not pos or not data then
			done(languages._err)
			Queue:RemoveFromQueue(ids)
			Queue:RemoveFromConnecting(ids)
			CancelEvent()
			return
		end

		if Queue:NotFull(true) then
			local added = Queue:AddToConnecting(ids,true,true,done)
			if not added then
				CancelEvent()
				return
			end

			done()

			TriggerEvent("queue:playerConnecting",src,ids,name,setKickReason,deferrals)

			return
		end

		update(string.format(languages.pos,pos,Queue:GetSize()))

		Citizen.CreateThread(function()
			if rejoined then
				return
			end

			Queue.ThreadCount = Queue.ThreadCount + 1
			local dotCount = 0

			while true do
				Citizen.Wait(1000)
				local dots = ""

				dotCount = dotCount + 1
				if dotCount > 3 then
					dotCount = 0
				end

				for i = 1,dotCount do dots = dots .. "." end

				local pos,data = Queue:IsInQueue(ids,true)

				if not pos or not data then
					if data and data.deferrals then
						data.deferrals.done(languages._err)
					end
					CancelEvent()
					Queue:RemoveFromQueue(ids)
					Queue:RemoveFromConnecting(ids)
					Queue.ThreadCount = Queue.ThreadCount - 1
					return
				end

				if pos <= 1 and Queue:NotFull() then
					local added = Queue:AddToConnecting(ids)
					data.deferrals.update(languages.joining)
					Citizen.Wait(500)

					if not added then
						data.deferrals.done(languages.connectingerr)
						CancelEvent()
						Queue.ThreadCount = Queue.ThreadCount - 1
						return
					end

					data.deferrals.update("Loading into server")

					Queue:RemoveFromQueue(ids)
					Queue.ThreadCount = Queue.ThreadCount - 1

					TriggerEvent("queue:playerConnecting",data.source,data.ids,name,setKickReason,data.deferrals)
					
					return
				end

				local msg = string.format("PHRP\n\n"..languages.pos.."%s\nEvite punições, fique por dentro das regras de conduta.\nAtualizações frequentes, deixe sua sugestão em nosso discord.",pos,Queue:GetSize(),dots)
				data.deferrals.update(msg)
			end
		end)
	end

	AddEventHandler("playerConnecting",playerConnect)

	local function checkTimeOuts()
		local i = 1
		while i <= Queue:GetSize() do
			local data = Queue.QueueList[i]
			local lastMsg = GetPlayerLastMsg(data.source)

			if lastMsg == 0 or lastMsg >= 30000 then
				data.timeout = data.timeout + 1
			else
				data.timeout = 0
			end

			if not data.ids or not data.name or not data.firstconnect or data.priority == nil or not data.source then
				data.deferrals.done(languages._err)
				table.remove(Queue.QueueList, i)
			elseif (data.timeout >= 120) and data.source ~= "debug" and os.time() - data.firstconnect > 5 then
				data.deferrals.done(languages._err)
				Queue:RemoveFromQueue(data.source,true)
				Queue:RemoveFromConnecting(data.source,true)
			else
				i = i + 1
			end
		end

		i = 1

		while i <= Queue:ConnectingSize() do
			local data = Queue.Connecting[i]
			local lastMsg = GetPlayerLastMsg(data.source)
			data.timeout = data.timeout + 1

			if ((data.timeout >= 300 and lastMsg >= 35000) or data.timeout >= 340) and data.source ~= "debug" and os.time() - data.firstconnect > 5 then
				Queue:RemoveFromQueue(data.source,true)
				Queue:RemoveFromConnecting(data.source,true)
			else
				i = i + 1
			end
		end

		SetTimeout(1000,checkTimeOuts)
	end
	checkTimeOuts()
end)

local function playerActivated()
	local source = source

	if not Queue.PlayerList[source] then
		local ids = Queue:GetIds(source)

		Queue.PlayerCount = Queue.PlayerCount + 1
		Queue.PlayerList[source] = true
		Queue:RemoveFromQueue(ids)
		Queue:RemoveFromConnecting(ids)
	end
end

AddEventHandler("queue:playerConnecting",function(source,ids,name,setKickReason,deferrals)
	deferrals.defer()
	local source = source
    local languages = Reborn.Language()
    local identifier = vRP.getSteam(source)
	local maintenance = Reborn.maintenance()
	if maintenance and maintenance.enabled then
		if maintenance.licenses[identifier] then
			return deferrals.done()
		end
		return deferrals.done(maintenance.text)
	end
	local rows = vRP.getInfos(identifier)
    local multi_personagem = Reborn.multi_personagem()
    if multi_personagem['Enabled'] then
        if identifier then
            if not rows[1] or not rows[1].banned then
                if not GlobalState['Basics']['Whitelist'] or (rows[1] and rows[1].whitelist) then
                    deferrals.done()
                else
					local Card = {
                        ["$schema"] = "http://adaptivecards.io/schemas/adaptive-card.json",
                        ["type"] = "AdaptiveCard",
                        ["version"] = "1.4",
                        ["horizontalAlignment"] = 'center',
                        ["body"] = {
                            {
                                ["type"] = "Container",
                                ["items"] = {
                                    {
                                        ["type"] = "TextBlock",
                                        ["text"] = "Bem-vindo à "..GlobalState['Basics']['ServerName'],
                                        ["weight"] = 'bolder',
                                        ["size"] = 'extraLarge', 
                                    },
                                    {
                                        ["type"] = "ColumnSet",
                                        ["columns"] = {
                                            {
                                                ["type"] = "Column",
                                                ["width"] = "400px",
                                                ["items"] = {
                                                    {
                                                        ["type"] = "TextBlock",
                                                        ["text"] = "Olá, "..name.."! Prepare-se para mergulhar na vida vibrante e imprevisível de Base City! Aqui, cada escolha molda o seu destino e cada ação tem uma consequência. Junte-se a outros jogadores, estabeleça alianças, enfrente adversários e construa sua própria história neste vasto universo roleplay. Lembre-se: Respeite as regras, entre no personagem e divirta-se!",
                                                        ["isSubtle"] = true,
                                                        ["wrap"] = true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    {
                                        ["type"] = "ColumnSet",
                                        ["columns"] = {
                                            {
                                                ["type"] = "Column",
                                                ["width"] = "250px",
                                                ["items"] = {
                                                    {
                                                        ["type"] = "Input.ChoiceSet",
                                                        ["id"] = "choice_set",
                                                        ["label"] = "Onde nos encontrou?",
                                                        ["placeholder"] = "Selecionar",
                                                        ["choices"] = {
                                                            {
                                                                ["id"] = 'input_text',
                                                                ["type"] = "input_text",
                                                                ["title"] = 'Lista Fivem',
                                                                ["value"] = 'Lista Fivem'
                                                            },
                                                            {
                                                                ["id"] = 'input_text',
                                                                ["type"] = "input_text",
                                                                ["title"] = 'Ultima Season',
                                                                ["value"] = 'Ultima Season'
                                                            },
                                                            {
                                                                ["id"] = 'input_text',
                                                                ["type"] = "input_text",
                                                                ["title"] = 'Tiktok',
                                                                ["value"] = 'Tiktok'
                                                            },
                                                            {
                                                                ["id"] = 'input_text',
                                                                ["type"] = "input_text",
                                                                ["title"] = 'Outros',
                                                                ["value"] = 'Outros'
                                                            },
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }
                            },
                            {
                                ["isVisible"] = false,
                                ["type"] = "Container",
                                ["items"] = {
                                    {
                                        ["type"] = "TextBlock",
                                        ["text"] = "DISCORD",
                                        ["weight"] = 'bolder',
                                        ["size"] = 'extraLarge', 
                                    },
                                    {
                                        ["type"] = "TextBlock",
                                        ["text"] = "Siga as instruções para conectar ao discord",
                                        ["isSubtle"] = true,
                                        ["wrap"] = true,
                                    },
                                    {
                                        ["type"] = "Image",
                                        ["url"] = "https://cdn.discordapp.com/attachments/1128809150508449934/1159214802552492042/imgs.png",
                                    }, 
                                    {
                                        ["type"] = "ColumnSet",
                                        ["columns"] = {
                                            {
                                                ["type"] = "Column",
                                                ["width"] = "250px",
                                                ["items"] = {
                                                    {
                                                        ["type"] = "TextBlock",
                                                        ["text"] = "1 PASSO: COPIE SEU ID DE LIBERAÇÃO ABAIXO E COLE NA SALA DE LIBERAR ID DO DISCORD",
                                                        ["size"] = 'Small', 
                                                        ["wrap"] = true
                                                    },
                                                },
                                            },
                                            
                                        },
                                    },
                                    {
                                        ["horizontalAlignment"] = "Center",
                                        ["type"] = "ActionSet",
                                        ["actions"] = {
                                            {
                                                ["type"] = "Action.Submit",
                                                ["id"] = 'copy_to_token',
                                                ["title"] = 'SEU ID DE LIBERAÇÃO',
                                                ["iconUrl"] = 'https://cdn.discordapp.com/attachments/1128809150508449934/1159211818854658108/discord.png'
                                            },
                                        },
                                    },
                                    {
                                        ["type"] = "TextBlock",
                                        ["text"] = "2 PASSO: ENTRE EM NOSSO DISCORD",
                                        ["size"] = 'Small', 
                                        ["wrap"] = true
                                    },
                                    {
                                        ["horizontalAlignment"] = "Center",
                                        ["type"] = "ActionSet",
                                        ["actions"] = {
                                            {
                                                ["type"] = "Action.OpenUrl",
                                                ["id"] = 'copy_to_discord',
                                                ["title"] = GlobalState['Basics']['Discord'],
                                                ["url"] = GlobalState['Basics']['Discord'],
                                                ["iconUrl"] = 'https://cdn.discordapp.com/attachments/1128809150508449934/1159211818854658108/discord.png'
                                            },
                                        },
                                    },
                                }
                            }
                        },
                        ["actions"] = {
                            {
                                ["type"] = "Action.Submit",
								["id"] = 'confirm_card',
                                ["title"] = "CONFIRMAR"
                            }
                        }
                    }
                    function CardCallback(data, rawData)
                        if not Card["time"] or tonumber(Card["time"]) <= os.time() then
                            if rows[1] then
                                if rows[1].whitelist then
                                    deferrals.done()
                                else
                                    if data.submitId == "copy_to_token" then
                                        os.execute(string.format('echo %s | clip',rows[1].token))
									elseif data.submitId == "confirm_card" then
										local newRows = vRP.getInfos(identifier)
										if newRows[1].whitelist then
											deferrals.done()
										else
											deferrals.done("Você ainda não foi liberado. Tente novamente")
										end
                                    end
                                end
                            else
                                if data.choice_set then
									local token = vRP.generateToken()
									local _rows,affected = vRP.query("vRP/create_user",{ identifier = identifier, token = token })
									if #affected > 0 then
										Card["body"][2]["items"][5]["actions"][1]["title"] = 'SEU TOKEN DE LIBERAÇÃO: '..token
										Card["body"][1]["isVisible"] = false
										Card["body"][2]["isVisible"] = true 
										vRP.createWeebHook(Webhooks.createAccount,"```TOKEN DE LIBERAÇÃO: "..token.."\nNOME:"..name.." \nIP: "..GetPlayerEndpoint(source).."\n**Onde nos encontrou:** "..data.choice_set)
										rows = vRP.getInfos(identifier)
									end
                                end
                            end
                            Card["time"] = tostring(os.time()+2)
                        end
                        Card["clock"] = tostring(os.clock())
                        deferrals.presentCard(Card, CardCallback)
					end
					if rows[1] then
                        Card["body"][1]["isVisible"] = false
                        Card["body"][2]["isVisible"] = true
                        Card["body"][2]["items"][5]["actions"][1]["title"] = 'SEU TOKEN DE LIBERAÇÃO: '..rows[1].token
                    end
					Wait(3000)
                    deferrals.presentCard(Card, CardCallback)
                end
            else
                deferrals.done("Você foi banido da cidade. Seu identificaor: "..identifier)
            end
        else
            deferrals.done("Ocorreu um problema de identificação.")
        end
    else
        local user_id = vRP.getUserIdByIdentifiers(source,ids)
        if user_id then
            if not rows[1] or not rows[1].banned then
                if rows[1] and rows[1].whitelist then 
                    deferrals.done()
                else
                    deferrals.done(languages['whitelist'].."\n[ID: "..user_id.." ]")
                end
            else
                deferrals.done("Você foi banido da cidade. Seu ID: "..user_id)
            end
        else
            deferrals.done("Ocorreu um problema de identificação.")
        end
    end
	TriggerEvent("queue:playerConnectingRemoveQueues",ids)
end)

RegisterServerEvent("Queue:playerActivated")
AddEventHandler("Queue:playerActivated",playerActivated)

local function playerDropped()
	local source = source

	if Queue.PlayerList[source] then
		local ids = Queue:GetIds(source)

		Queue.PlayerCount = Queue.PlayerCount - 1
		Queue.PlayerList[source] = nil
		Queue:RemoveFromQueue(ids)
		Queue:RemoveFromConnecting(ids)
	end
end

AddEventHandler("playerDropped",playerDropped)

AddEventHandler("queue:playerConnectingRemoveQueues",function(ids)
	Queue:RemoveFromQueue(ids)
	Queue:RemoveFromConnecting(ids)
end)
