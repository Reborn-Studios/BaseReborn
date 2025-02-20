vRP = Proxy.getInterface("vRP")

Theme = {
    modern = {interiorId = 227841,  ipl = "apa_v_mp_h_01_c"},
    moody = {interiorId = 228609, ipl = "apa_v_mp_h_02_c"},
    vibrant = {interiorId = 229377, ipl = "apa_v_mp_h_03_c"},
    sharp = {interiorId = 230145, ipl = "apa_v_mp_h_04_c"},
    monochrome = {interiorId = 230913, ipl = "apa_v_mp_h_05_c"},
    seductive = {interiorId = 231681, ipl = "apa_v_mp_h_06_c"},
    regal = {interiorId = 232449, ipl = "apa_v_mp_h_07_c"},
    aqua = {interiorId = 233217, ipl = "apa_v_mp_h_08_c"},
}

RegisterNetEvent("will_homes:blips")
AddEventHandler("will_homes:blips",function()
    TriggerEvent("Notify","aviso","Marcação das casas",5000)
    TriggerEvent("will_homes:client:updateBlips")
end)

theftCoords = {
    ['apartment1'] = {
        { 265.71,-997.11,-99.0 },
        { 264.2,-995.48,-99.0 },
        { 262.06,-995.41,-99.0 },
        { 257.28,-995.56,-99.0 },
        { 259.99,-1004.04,-99.0 },
        { 262.91,-1002.64,-99.0 },
        { 262.4,-999.88,-99.0 },
    },
    ['apartment2'] = {
        { -32.41,-583.92,78.87 },
        { -36.05,-580.69,78.84 },
        { -37.14,-583.68,78.84 },
        { -34.43,-586.55,78.84 },
        { -27.7,-581.41,79.24 },
        { -22.19,-580.2,79.24 },
        { -11.15,-584.82,79.44 },
        { -12.69,-587.34,79.44 },
    },
    ['apartment3'] = {
        { -783.32,325.36,187.32 },
        { -781.94,327.86,187.32 },
        { -782.58,330.75,187.32 },
        { -781.41,338.26,187.12 },
        { -781.75,341.87,187.12 },
        { -793.37,342.14,187.12 },
        { -800.1,338.46,190.72 },
        { -796.29,330.93,190.72 },
        { -799.16,328.18,190.72 },
    },
}

openChest = function(id)
    local vault = vSERVER.getVault(id)
    local house = Houses[id]
    if house and not visitMode then
        TriggerServerEvent('ld-inv:Server:OpenInventory','chest:'..house.name,{isHouse=true,slots=24,weight=vault},house.name)
        TriggerServerEvent('will_inventory:server:openInventory', 'chest_'..house.name, "storage_case")
        TriggerEvent("homes:openVault", house.name,vault)
        TriggerEvent("vrp_chest:homes", house.name,vault)
        TriggerServerEvent("dpn:openHouseChest", { chestName = house.name, slots = 30, size = vault })
    end
end

CreateBlips = function(house, coord, col)
    local blip = AddBlipForCoord(coord)
    SetBlipSprite(blip, 40)
    SetBlipDisplay(blip, 4)
    SetBlipScale(blip, 0.5)
    SetBlipColour(blip, col or 64) 
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Casa")
    EndTextCommandSetBlipName(blip)
    table.insert(Blips, blip)
end

ClearBlips = function()
    for k, v in pairs(Blips) do
        if DoesBlipExist(v) then
            RemoveBlip(v)
        end
    end
end

Draw3DText = function(x, y, z, tipo, data)
    DrawBase3D(x, y, z,"homes")
    if tipo == "entrar" then
        DrawText3D(x,y,z, "~o~[E]~w~ Entrar")
    elseif tipo == "sair" then
        DrawText3D(x,y,z, "~o~[E] ~w~Sair")
    elseif tipo == "venda" then
        DrawText3D(x,y,z, "~o~[E] "..data.name.." ~g~[A venda] ~g~ [R$"..formatNumber(data.price).."]  ~w~")
    elseif tipo == "amigo" then
        DrawText3D(x,y,z, "~o~[E] ~w~"..data.name.." ~g~[Casa de amigo]")
    elseif tipo == "bau" then
        DrawText3D(x,y,z, "~o~[E] ~w~Abrir baú")
    elseif tipo == "gerenciar" then
        DrawText3D(x,y,z, "~g~[E] ~w~Gerenciar")
    end
end

CreateThread(function()
    Wait(1000)
    for k,v in pairs(Theme) do
        if IsIplActive(Theme[k].ipl) then 
            RemoveIpl(Theme[k].ipl)
            RefreshInterior(Theme[k].interiorId)
            PinInteriorInMemory(Theme[k].interiorId)
        end
    end
end)

function startThread()
    CreateThread(function()
        Wait(1000)
        if not Config.targetScript then

            CreateThread(function()
                while true do 
                    local sleepThread = 1500
                    for k,v in pairs(Houses) do
                        local coords = GetEntityCoords(PlayerPedId())

                        local dist = #(v.coords.house_in - coords)

                        if dist < 2.0 then
                            while dist < 2.0 do
                                dist = #(v.coords.house_in - GetEntityCoords(PlayerPedId()))
                                sleepThread = 4
                                if v.owner == 0 then 
                                    Draw3DText(v.coords.house_in.x, v.coords.house_in.y, v.coords.house_in.z + 0.2, "venda",v)
                                    if dist < 1.40 and IsControlJustPressed(0, 38) then 
                                        joinHouse(k, "Ninguem")
                                        Wait(1000)
                                    end
                                elseif v.owner == LocalOwner then
                                    Draw3DText(v.coords.house_in.x, v.coords.house_in.y, v.coords.house_in.z + 0.2, "entrar",v)
                                    if dist < 1.40 and IsControlJustPressed(0, 38) then 
                                        joinHouse(k, "Sua casa")
                                        Wait(1000)
                                    end
                                else
                                    for i,val in pairs(v.friends) do
                                        if parseInt(val.id) == LocalOwner then
                                            Draw3DText(v.coords.house_in.x, v.coords.house_in.y, v.coords.house_in.z + 0.2, "amigo",v)
                                            if dist < 1.40 and IsControlJustPressed(0, 38) then 
                                                joinHouse(k, "Casa de amigo")
                                                Wait(1000)
                                            end
                                        end
                                    end
                                end
                                Wait(sleepThread)
                            end
                        end

                        local dist2 = #(v.coords.house_out - coords)

                        if dist2 < 3.0 then
                            while dist2 < 2.0 do
                                dist2 = #(v.coords.house_out - GetEntityCoords(PlayerPedId()))
                                sleepThread = 4
                                Draw3DText(v.coords.house_out.x, v.coords.house_out.y, v.coords.house_out.z + 0.2, "sair",v)
                                if dist2 < 1.40 and IsControlJustPressed(0, 38) then
                                    exitHouse(k)
                                    Wait(1000)
                                end
                                Wait(sleepThread)
                            end
                        end

                        local chest = #(v.coords.chest - coords)
                        if chest < 3.0 and not robberyMode then 
                            while chest < 3.0 do
                                chest = #(v.coords.chest - GetEntityCoords(PlayerPedId()))
                                sleepThread = 4
                                Draw3DText(v.coords.chest.x, v.coords.chest.y, v.coords.chest.z + 0.2,"bau",v)
                                if chest < 1.40 and IsControlJustPressed(0, 38) then 
                                    openChest(CurId)
                                    Wait(1000)
                                end
                                Wait(sleepThread)
                            end
                        end
                        
                        if v.coords.manage then
                            if v.coords.manage then
                                local mdist =  #(v.coords.manage - coords)
                                if mdist < 3.0 then 
                                    while mdist < 3.0 do
                                        sleepThread = 4
                                        mdist =  #(v.coords.manage - GetEntityCoords(PlayerPedId()))
                                        Draw3DText(v.coords.manage.x, v.coords.manage.y, v.coords.manage.z + 0.2,"gerenciar",v)
                                        if mdist < 2.50 and IsControlJustPressed(0, 38) then 
                                            manage(CurId)
                                            Wait(1000)
                                        end
                                        Wait(sleepThread)
                                    end
                                end
                            end
                        end
                    end
                    Wait(sleepThread)
                end
            end)

        else

            for k,v in pairs(Houses) do
                local owner = "Ninguem"
                local label = "Imobiliária"
                if parseInt(v.owner) == LocalOwner then
                    owner = "Sua casa"
                    label = "Entrar"
                else
                    for i,v in pairs(v.friends) do
                        if parseInt(v.id) == LocalOwner then
                            owner = "Casa de amigo"
                            label = "Entrar"
                        end
                    end
                end
                if v.owner == 0 or label == "Entrar" then
                    exports["target"]:AddCircleZone("join"..v.name,v.coords.house_in,0.75,{
                        name = v.name,
                        heading = 3374176
                    },{
                        distance = 2.5,
                        shop = { k, owner },
                        options = {
                            {
                                event = "will_homes:joinHouse",
                                label = label,
                                tunnel = "client",
                                
                            }
                        }
                    })
                end

                exports["target"]:AddCircleZone("exit"..v.name,v.coords.house_out,0.75,{
                    name = v.name,
                    heading = 3374176
                },{
                    distance = 2.5,
                    options = {
                        {
                            event = "will_homes:exitHouse",
                            label = "Sair",
                            tunnel = "client"
                        }
                    },
                })

                exports["target"]:AddCircleZone("chest"..v.name,v.coords.chest,0.75,{
                    name = v.name,
                    heading = 3374176
                },{
                    distance = 2.5,
                    shop = k,
                    options = {
                        {
                            event = "will_homes:openChest",
                            label = "Abrir baú",
                            tunnel = "client",
                            
                        }
                    }
                })

                if v.coords.manage then
                    exports["target"]:AddCircleZone("manage"..v.name,v.coords.manage,0.75,{
                        name = v.name,
                        heading = 3374176
                    },{
                        distance = 2.5,
                        shop = k,
                        options = {
                            {
                                event = "will_homes:manageHouse",
                                label = "Gerenciar casa",
                                tunnel = "client",
                            }
                        }
                    })
                end
            end

        end
    end)
end

CreateThread(function()
	while true do
		local timeDistance = 999
		if robberyMode then
			local ped = PlayerPedId()
			if not IsPedInAnyVehicle(ped) then
				local speed = GetEntitySpeed(ped)
				local coords = GetEntityCoords(ped)
                local theme = Houses[CurId].theme
                if Theme[theme] then theme = "apartment3" end

				if speed > 2 and GetGameTimer() >= homesTheft["police"] then
					homesTheft["police"] = GetGameTimer() + 15000
                    local coords = Houses[CurId].coords.house_in
					vSERVER.callPolice(coords['x'],coords['y'],coords['z'])
				end
				if theftCoords[theme] then
					for k,v in pairs(theftCoords[theme]) do
						if not homesTheft["theftCoords"][k] then
                            local x,y,z = v[1], v[2], v[3]
							local distance = #(coords - vector3(x,y,z))
							if distance <= 1.25 then
								timeDistance = 1
								DrawText3D(x,y,z,"~g~E~w~   VASCULHAR")
								if IsControlJustPressed(1,38) then
                                    vRP.playAnim(false,{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"},true)
                                    local taskBar = exports["taskbar"]:taskHomes()
                                    if taskBar then
                                        vSERVER.paymentTheft("MOBILE")
                                        homesTheft["theftCoords"][k] = true
                                    end
                                    async(function()
                                        vRP.removeObjects()
                                    end)
								end
							end
						end
					end
				end
			end
		end
		Wait(timeDistance)
	end
end)

function GetPlayers()
	local pedList = {}

	for _,_player in ipairs(GetActivePlayers()) do
		pedList[GetPlayerServerId(_player)] = true
	end

	return pedList
end

function will.nearestPlayers(vDistance)
	local r = {}
	local users = GetPlayers()
	for k,v in pairs(users) do
		local player = GetPlayerFromServerId(k)
		if player ~= PlayerId() and NetworkIsPlayerConnected(player) then
			local oped = GetPlayerPed(player)
			local coords = GetEntityCoords(oped)
			local coordsPed = GetEntityCoords(PlayerPedId())
			local distance = #(coords - coordsPed)
			if distance <= vDistance then
				r[GetPlayerServerId(player)] = distance
			end
		end
	end
	return r
end

DrawText3D = function (x, y, z, text)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    SetDrawOrigin(x,y,z, 0)
    DrawText(0.0, 0.0)
    ClearDrawOrigin()
end

formatNumber = function(n)
    return tostring(math.floor(n)):reverse():gsub("(%d%d%d)","%1,"):gsub(",(%-?)$","%1"):reverse()
end

exports("MarkProperty",function (id)
    if Houses[id] then
        local coords = Houses[id].coords.house_in
        SetNewWaypoint(coords.x,coords.y)
        TriggerEvent("Notify","sucesso","Localização marcada.",5000)
    end
end)
