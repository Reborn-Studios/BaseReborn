CreateThread(function()
	-- Check table
	Wait(500)
	prepare("homes/check_table","DESCRIBE will_homes")
    prepare('will/get_all_homes',"SELECT * FROM will_homes")
	local table = query("homes/check_table")
	local hasHouseId = false
	local hasTax = false
	for k,v in pairs(table) do
		if v.Field == "house_id" then
			hasHouseId = true
		end
		if v.Field == "tax" then
			hasTax = true
		end
	end
	if not hasHouseId then
		prepare("homes/put_house_id","ALTER TABLE will_homes ADD house_id INT(11) NOT NULL DEFAULT 0")
		execute("homes/put_house_id")
	end
	if not hasTax then
		prepare("homes/put_tax","ALTER TABLE will_homes ADD tax INT(11) NOT NULL DEFAULT 1572029150")
		execute("homes/put_tax")
	end
	Wait(500)
	prepare("will/buy_home","INSERT IGNORE INTO will_homes(house_id,owner,name,friends,extends,tax) VALUES(@house_id,@owner,@name,@friends,@extends,@tax)")
    prepare("will/upd_taxhomes","UPDATE `will_homes` SET tax = @tax WHERE owner = @owner AND name = @home")
    prepare('will/update_friends',"UPDATE `will_homes` SET friends = @friends WHERE house_id = @id")
    prepare('will/update_extends',"UPDATE `will_homes` SET extends = @extends WHERE house_id = @id")
    prepare('will/update_home','UPDATE `will_homes` SET owner = @owner, tax = @tax WHERE house_id = @id')
    prepare('will/update_theme',"UPDATE `will_homes` SET theme = @theme WHERE house_id = @id")
    prepare('will/get_vault',"SELECT vault FROM will_homes WHERE house_id = @id")
    prepare('will/sell_home',"DELETE FROM `will_homes` WHERE house_id = @id")
    prepare('will/get_homeuserid',"SELECT * FROM will_homes WHERE owner = @owner")

	prepare("homes/get_homepermissions","SELECT * FROM will_homes WHERE owner = @user_id AND name = @home")
    prepare("homes/get_homeuseridowner", "SELECT * FROM will_homes WHERE name = @home")
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERENCIA / COMPRA / TAXA
-----------------------------------------------------------------------------------------------------------------------------------------

function tryTransferHome(user_id, nuser_id, house)
    local source = getUserSource(user_id)
    local nplayer = getUserSource(nuser_id)
    local identity = getUserIdentity(user_id)
    local nidentity = getUserIdentity(nuser_id)
    if nplayer then
        if request(source,"Deseja transferir sua casa para "..nidentity.name.." ?",30) then
            if request(nplayer,"Aceitar casa de "..identity.name.." ?",30) then
                TriggerClientEvent("Notify",source,"sucesso","Casa transferida com sucesso.",5000)
                TriggerClientEvent("Notify",nplayer,"sucesso","Casa transferida com sucesso.",5000)
                return true
            end
        end
    else
        TriggerClientEvent("Notify",source,"negado","Cidadão não se encontra.",5000)
    end
end

function tryBuyHouse(user_id, house)
    local homes = query("will/get_homeuserid", { owner = user_id })
    if #homes >= 20 then
        local source = getUserSource(user_id)
        TriggerClientEvent("Notify",source,"negado","Limite de casas atingido.",5000)
        return false
    end
    return true
end

function tryPayTax(user_id,house)
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ROUBOS
-----------------------------------------------------------------------------------------------------------------------------------------
local mobileTheft = {
	["MOBILE"] = {
		{ item = "notepad", min = 1, max = 5 },
		{ item = "keyboard", min = 1, max = 1 },
		{ item = "plastic", min = 1, max = 1 },
		{ item = "dollars", min = 500, max = 1500 },
		{ item = "mouse", min = 1, max = 1 },
		{ item = "watch", min = 2, max = 4 },
		{ item = "playstation", min = 1, max = 1 },
		{ item = "xbox", min = 1, max = 1 },
		{ item = "legos", min = 1, max = 1 },
		{ item = "ominitrix", min = 1, max = 1 },
		{ item = "ring", min = 1, max = 1 },
		{ item = "dildo", min = 1, max = 1 },
	}
}

function will.paymentTheft(mobile)
	local source = source
	local user_id = getUserId(source)
	if user_id then
		local policeResult = getPolicesByPermission()
		local randItem = math.random(#mobileTheft[mobile])
		local value = math.random(mobileTheft[mobile][randItem]["min"],mobileTheft[mobile][randItem]["max"])

		if (getInventoryWeigth(user_id) + (getItemWeight(mobileTheft[mobile][randItem]["item"]) * parseInt(value))) <= getInventoryMaxWeight(user_id) then
			if parseInt(#policeResult) <= 4 then
				if math.random(100) <= 40 then
					vRP.giveInventoryItem(user_id,mobileTheft[mobile][randItem]["item"],parseInt(value),true)
				else
					TriggerClientEvent("Notify",source,"aviso","Compartimento vazio.",5000)
				end
			else
				if math.random(100) <= 80 then
					vRP.giveInventoryItem(user_id,mobileTheft[mobile][randItem]["item"],parseInt(value),true)
				else
					TriggerClientEvent("Notify",source,"aviso","Compartimento vazio.",5000)
				end
			end
		else
			TriggerClientEvent("Notify",source,"negado","Mochila cheia.",5000)
		end
	end
end

function will.callPolice(x,y,z)
    local source = source
	local user_id = getUserId(source)
	if user_id then
		local ped = GetPlayerPed(source)
		local coords = GetEntityCoords(ped)

		local policeResult = getPolicesByPermission()
		for k,v in pairs(policeResult) do
			async(function()
				TriggerClientEvent("NotifyPush",v,{ code = 90, title = "Roubo de Propriedade", x = x, y = y, z = z, criminal = "Alarme de segurança", time = "Recebido às "..os.date("%H:%M"), blipColor = 43 })
			end)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMANDOS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("house_reload", function(source, args, rawCommand)
    local source = source
	local user_id = getUserId(source)
    if hasPermission(user_id, "admin.permissao") then
        CacheHouses = {}
        local houses = query('will/get_all_homes')
        will.loadHouses(houses)
        TriggerClientEvent("Notify",source,"sucesso","Casas carregadas com sucesso.",5000)
    end
end)

RegisterCommand("casas",function(source,args,rawCommand)
	local source = source
	local user_id = getUserId(source)
	if user_id then
        TriggerClientEvent("will_homes:client:updateBlips",source)
        TriggerClientEvent("Notify",source,"aviso","Marcação das casas.",5000)
	end
end)

RegisterCommand("invadir",function(source,args,rawCommand)
	local source = source
	local user_id = getUserId(source)
	if hasPermission(user_id, "policia.permissao") then
        tryEnterHome(source)
	end
end)

-- Função para entrar na casa mais proxima
-- Pode ser usado para implementar em seu script de roubo

exports("tryEnterHome", tryEnterHome)   -- tryEnterHome(source)

-- Modelo para usar na <lockpick>:

--[[ 
if itemName == "lockpick" then
	local checkHome = exports['will_homes']:tryEnterHome(source, true)
	if checkHome then
		vRPclient.playAnim(source,false,{{"missheistfbi3b_ig7","lift_fibagent_loop"}},false)
		local taskResult = vTASKBAR.taskLockpick(source)
		if taskResult then
			TriggerClientEvent("will_homes:client:enterHouse",source, checkHome, true)
		end
		vRPclient._stopAnim(source,false)
	end
end

]]

-- Deletar casas sem taxas pagas

CreateThread(function()
	Wait(2000)
	local houses = query('will/get_all_homes') or {}
	for k,v in pairs(houses) do
		if (parseInt(v.tax)+60*60*24*Config.delHomeTime) < os.time() then
			execute('will/sell_home', { id = v.id })
		end
	end
end)