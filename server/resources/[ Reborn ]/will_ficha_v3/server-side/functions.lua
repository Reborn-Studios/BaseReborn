-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------

vRPclient = Tunnel.getInterface("vRP")

-----------------------------------
--########## Funções vRP ##########
-----------------------------------

function getUserId(source)
    return vRP.getUserId(source)
end

function getUserSource(user_id)
	return vRP.getUserSource(user_id)
end

function getUserIdentity(user_id)
	return vRP.getUserIdentity(user_id)
end

function hasPermission(user_id, perm)
    return vRP.hasPermission(user_id, perm)
end

function addGroup(user_id, group)
    vRP.addUserGroup(user_id, group)
end

function removeGroup(user_id, group)
    vRP.removeUserGroup(user_id, group)
end

function getUserPlate(plate)
    local plateUser = vRP.getVehiclePlate(plate) or vRP.getUserIdRegistration(plate)
    return plateUser
end

function getRegistration(user_id)
    local identity = getUserIdentity(user_id)
    return identity.registration
end

function vehicleName(vname)
    return vRP.vehicleName(vname)
end

function getUserTax(user_id)
    return vRP.getFines(user_id)
end

function addUserTax(user_id, data)
	local user = data.id
    local multa = parseInt(data.taxTotal)
    local multas = getUserTax(parseInt(user))
    local source = getUserSource(parseInt(user_id))
    if GetResourceState("ld_smartbank") == "started" then
        if exports['ld_smartbank']:CreateFine(source, "Policia", multa, json.encode(data.crimes)) then
            vRP.setUData(parseInt(user_id),"vRP:multas",json.encode(parseInt(multas)+multa))
        end
    else
        vRP.setUData(parseInt(user_id),"vRP:multas",json.encode(parseInt(multas)+multa))
    end
end

function arrestPlayer(data)
	local user_id = parseInt(data.id)
    local pena = parseInt(data.serviceTotal)
    local nplayer = getUserSource(user_id)
    vRP.initPrison(user_id, pena)
    if nplayer then
        local ped = GetPlayerPed(nplayer)
        TriggerClientEvent('prisioneiro',nplayer,true)
        TriggerClientEvent("resetHandcuff",nplayer)
        local x,y,z = table.unpack(Config.coords_prison['Preso'])
        SetEntityCoords(ped,x,y,z)
        SetEntityHeading(ped, 166.14)
    end
end

function reducePrison(source, time)
    local user_id = getUserId(source)
    local consult, tempo
    consult = vRP.getInformation(user_id)
    tempo = consult[1].prison
    if parseInt(tempo) <= 0 then
        TriggerClientEvent('prisioneiro',source,false)
        vRP.setUData(parseInt(user_id),"vRP:prisao", -1)
        local ped = GetPlayerPed(source)
        local x,y,z = table.unpack(Config.coords_prison['Solto'])
        SetEntityCoords(ped,x,y,z)
    else
        vRP.setUData(parseInt(user_id), "vRP:prisao", json.encode(parseInt(tempo) - time))
        if Config.base == "creative" then
            execute("vRP/rem_prison",{ user_id = parseInt(user_id), prison = time })
        elseif Config.base == "summerz" then
            vRP.updatePrison(user_id)
        end
        TriggerClientEvent('prisioneiro',source,true)
        Config.notification(source,'Rest_prison',tempo)
    end
    return tempo
end

function checkUserCnh(user_id)
	local habilitacion = "NÃO POSSUI"
	if hasPermission(user_id,"carteiraAB.permissao") then
		habilitacion = "AB"
	elseif hasPermission(user_id,"carteiraA.permissao") then
		habilitacion = "A"
	elseif hasPermission(user_id,"carteiraB.permissao") then
		habilitacion = "B"
	end
	return habilitacion
end

function getFullName(user_id)
    if not user_id then return end
	local identity = getUserIdentity(user_id)
	if identity and identity.name then
		return identity.name.." "..identity.name2
	end
	return "Não identificado"
end

function getSpecificPerm()
    local polices = {}
    for k,perm in pairs(Config.hierarquia) do
        local users = vRP.numPermission(perm,true)
        for _,user in pairs(users) do
            table.insert(polices,user)
        end
    end
	return polices
end

function prepare(name, query)
    vRP.prepare(name, query)
end

function query(name, data)
    return vRP.query(name, data)
end

function execute(name, data)
    vRP.execute(name, data)
end

RegisterCommand("remprisao", function(source, args)
    local user_id = getUserId(source)
    if user_id and vRP.hasPermission(user_id,"admin.permissao") and args[1] then
        local nuser_id = parseInt(args[1])
        local nplayer = getUserSource(nuser_id)
        local ped = GetPlayerPed(nplayer)
        local x,y,z = table.unpack(Config.coords_prison['Solto'])
        TriggerClientEvent('prisioneiro',nplayer,false)
        SetEntityCoords(ped,x,y,z)
        vRP.setUData(parseInt(nuser_id),"vRP:prisao",-1)
	    vRP.execute("vRP/set_prison",{ user_id = nuser_id, prison = 0, locate = 1 })
    end
end)

AddEventHandler("vRP:playerSpawn",function(user_id,source)
    Citizen.Wait(3000)
    if source then
        local value = vRP.getUData(parseInt(user_id),"vRP:prisao") or vRP.getInformation(user_id)[1].prison
        local tempo = parseInt(json.decode(value)) or 0
        if tempo > 0 then
            local ped = GetPlayerPed(source)
            local x,y,z = table.unpack(Config.coords_prison['Preso'])
            SetEntityCoords(ped,x,y,z)
            TriggerEvent("will_ficha_v3:reducePrison",source)
            playerSpawn(source, tempo)
        end
    end
end)

function SendDiscord(webhook, text, text2)
	local avatar = 'https://cdn.discordapp.com/attachments/796797155100327976/875550178264903730/unknown.png'
    local embeds = {
        { 
            ["title"] = "Ficha v3",
            ["type"] = GlobalState['Basics']['ServerName'],

            ["thumbnail"] = {
            	["url"] = avatar
            }, 

            ["fields"] = {
                { 
                    ["name"] = text,
                    ["value"] = text2
                }
            },

            ["footer"] = { 
                ["text"] = os.date("%H:%M:%S - %d/%m/%Y"),
                ["icon_url"] = avatar
            },

            ["color"] =  12422

        }
    }
    PerformHttpRequest(webhook, function(Error, Content, Hand) end, 'POST', json.encode({username = GlobalState['Basics']['ServerName'], embeds = embeds, avatar_url = avatar}), { ['Content-Type'] = 'application/json' })
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- FUGA DA PRISÃO
-----------------------------------------------------------------------------------------------------------------------------------------
vTASKBAR = Tunnel.getInterface("vrp_taskbar")

local keyItem = "lockpick"

function will.checkLocate()
    local source = source
	local user_id = getUserId(source)
	if user_id then
        local rand = math.random(1,100)
        if rand <= 2 then
            vRP.giveInventoryItem(user_id,keyItem,1,true)
        else
			TriggerClientEvent("Notify",source,"negado","Nada encontrado.",5000)
        end
    end
end

function will.checkKey()
	local source = source
	local user_id = getUserId(source)
	if user_id then
		local policeResult = vRP.getUsersByPermission(Config.permissions['Police']) or vRP.numPermission(Config.permissions['Police'])
		if parseInt(#policeResult) <= 1 then
			TriggerClientEvent("Notify",source,"negado","Sistema indisponível no momento.",5000)
			return false
		end
		if vRP.getInventoryItemAmount(user_id,keyItem) >= 1 then
			vRPclient._playAnim(source,false,{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"},true)
			local taskResult = vTASKBAR and vTASKBAR.taskTwo and vTASKBAR.taskTwo(source) or true
			if taskResult then
				if vRP.tryGetInventoryItem(user_id,keyItem,1,true) then
					TriggerClientEvent('prisioneiro',source,false)
					vRP.setUData(user_id,"vRP:prisao",-1)
		
					for k,v in pairs(policeResult) do
						async(function()
							local player = getUserSource(parseInt(v))
							TriggerClientEvent("Notify",player,"aviso","Recebemos a informação de um fugitivo da penitenciária.",15000)
						end)
					end
					TriggerClientEvent("vrp_sysblips:ToogleProcurado",source,true)
					TriggerClientEvent("vrp_sysblips:ToggleService",source,"Fugitivo",60)
					TriggerClientEvent("Notify",source,"sucesso","Fuga iniciada, corra!",5000)
					vRPclient._stopAnim(source,false)
					return true
				end
			else
				for k,v in pairs(policeResult) do
					local player = getUserSource(parseInt(v))
					async(function()
						TriggerClientEvent("Notify",player,"aviso","Tentativa de fuga da penitenciária.",5000)
					end)
				end
				TriggerClientEvent("Notify",source,"negado","Você falhou.",5000)
				vRPclient._stopAnim(source,false)
				return false
			end
		else
			TriggerClientEvent("Notify",source,"negado","Você não possui chave.",5000)
		end

		return false
	end
end

-------##########-------##########-------##########-------##########
--						 PREPARES
-------##########-------##########-------##########-------##########

CreateThread(function()
    prepare("ficha/get_user_infos","SELECT * FROM will_ficha WHERE user_id = @user_id")
    prepare("ficha/update_image","UPDATE will_ficha SET image = @image WHERE user_id = @user_id")
    prepare("ficha/update_infos","UPDATE will_ficha SET infos = @infos WHERE user_id = @user_id AND status = @status")
    prepare("ficha/insert_arrests","INSERT INTO will_ficha(user_id,status,data,infos) VALUES(@user_id,@status,@data,@infos)")
    prepare("ficha/delete_infos","DELETE FROM will_ficha WHERE id = @id AND status = 'Boletim'")
    prepare("ficha/remove_arrest", "DELETE FROM will_ficha WHERE id = @id")
    prepare("ficha/get_vehicle_by_plate","SELECT user_id, vehicle, plate FROM "..Config.vehicle_db.." WHERE plate = @plate")
    
    prepare("ficha/get_vehicles","SELECT * FROM "..Config.vehicle_db.." WHERE user_id = @user_id")
    prepare("vRP/add_group","INSERT INTO vrp_permissions(user_id,permiss) VALUES(@user_id,@permiss)")
    prepare("vRP/del_group","DELETE FROM vrp_permissions WHERE user_id = @user_id AND permiss = @permiss")
    prepare("vRP/get_specific_perm","SELECT * FROM vrp_permissions WHERE permiss = @permiss")
    prepare("vRP/getAllUsers","SELECT * FROM vrp_user_data WHERE dvalue LIKE CONCAT('%', @set, '%')")

    if Config.base == "summerz" then
        prepare("ficha/insert_porte","ALTER TABLE `summerz_characters` ADD COLUMN IF NOT EXISTS porte VARCHAR(254) DEFAULT 'INAPTO' COLLATE 'latin1_swedish_ci';")
        prepare("ficha/update_porte","UPDATE summerz_characters SET porte = @porte WHERE id = @user_id")
    elseif Config.base == "creative" then
        prepare("ficha/insert_porte","ALTER TABLE `vrp_users` ADD COLUMN IF NOT EXISTS porte VARCHAR(254) DEFAULT 'INAPTO' COLLATE 'latin1_swedish_ci';")
        prepare("ficha/update_porte","UPDATE vrp_users SET porte = @porte WHERE id = @user_id")
    else
        prepare("ficha/insert_porte","ALTER TABLE `vrp_user_identities` ADD COLUMN IF NOT EXISTS porte VARCHAR(254) DEFAULT 'INAPTO' COLLATE 'latin1_swedish_ci';")
        prepare("ficha/update_porte","UPDATE vrp_user_identities SET porte = @porte WHERE user_id = @user_id")
    end
    prepare("ficha/create_table",[[
        CREATE TABLE IF NOT EXISTS `will_ficha` (
        `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `user_id` INT(50) NULL DEFAULT NULL,
        `status` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        `image` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        `data` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        `infos` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
        PRIMARY KEY (`id`) USING BTREE
    )COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;
    ]])
    Wait(500)
    execute("ficha/create_table")
    execute("ficha/insert_porte")
end)