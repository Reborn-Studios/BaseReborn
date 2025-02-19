-----------------------------------------------------------------------------------------------------------------------------------------
-- COMANDOS
-----------------------------------------------------------------------------------------------------------------------------------------
local adminVehs = {}
GlobalState["Plates"] = {}          -- Creative Network
GlobalState["vehPlates"] = {}       -- Creative V5
local ADMIN_PERMISSION = "admin.permissao"

--######################--
--### SPAWNAR CARRO ###---
--######################--

RegisterCommand("addgarage", function(source)
	local source = source
	local user_id = getUserId(source)
	if hasPermission(user_id, ADMIN_PERMISSION) then
		vCLIENT.startRegisterGarage(source)
	end
end)

--######################--
--### SPAWNAR CARRO ###---
--######################--

RegisterCommand("car",function(source,args,rawCommand)
	local user_id = getUserId(source)
    local identity = getUserIdentity(user_id)
 	if user_id then
		if hasPermission(user_id,ADMIN_PERMISSION) and args[1] then
            local Ped = GetPlayerPed(source)
			local Coords = GetEntityCoords(Ped)
			local heading = GetEntityHeading(Ped)
            local x,y,z = Coords["x"],Coords["y"],Coords["z"]
            local plate = generatePlateNumber()
            adminVehs[plate] = user_id
            local netid = will.spawnVehicle(args[1],x,y,z,heading,{plate=plate},true)
            local nveh = NetworkGetEntityFromNetworkId(netid)
			SetPedIntoVehicle(Ped,nveh,-1)
			SendDiscord("ID: "..user_id, "Spawnou o **"..args[1].."**\n Coordenadas: "..tD(x)..", "..tD(y)..", "..tD(z))
		end
	end
end)

--######################--
--### DELETAR CARRO ###---
--######################--

RegisterCommand("dv",function(source,args,rawCommand)
	local user_id = getUserId(source)
	if hasPermission(user_id,ADMIN_PERMISSION) then
        if args[1] then
            local vehicles = vCLIENT.getNearVehicles(source,parseInt(args[1])) or {}
            if next(vehicles) then
                for veh,dist in pairs(vehicles) do
                    vCLIENT.deleteVehicle(source,veh,true)
                end
                local x,y,z = table.unpack(GetEntityCoords(GetPlayerPed(source)))
                SendDiscord("ID: "..user_id, "Deu DV Area nas coordenadas: "..tD(x)..", "..tD(y)..", "..tD(z))
            end
        else
            local vehicle = vCLIENT.getNearVehicle(source,12)
            if vehicle then
                vCLIENT.deleteVehicle(source,vehicle,true)
                local veh,vehNet,vehPlate,vehName = vCLIENT.vehList(source,11)
                if vehName then
                    local x,y,z = table.unpack(GetEntityCoords(GetPlayerPed(source)))
                    SendDiscord("ID: "..user_id, "Deletou o **"..vehName.."**\n Coordenadas: "..tD(x)..", "..tD(y)..", "..tD(z))
                end
            end
        end
	end
end)

--######################--
--###  FIXAR CARRO  ###---
--######################--

RegisterCommand("fix",function(source,args,rawCommand)
	local user_id = getUserId(source)
	if user_id then
		if hasPermission(user_id,ADMIN_PERMISSION) then
			local vehicle,vehNet,vehPlate,vehName = vCLIENT.vehList(source,7)
			if vehicle then
				TriggerClientEvent("will_garages_v2:repairVehicle",-1,vehNet,true)
				local x,y,z = table.unpack(GetEntityCoords(GetPlayerPed(source)))
				SendDiscord("ID: "..user_id, "Deu fix no carro **"..vehName.."**\n Coordenadas: "..tD(x)..", "..tD(y)..", "..tD(z))
			end
		end
	end
end)

--#############################--
--###  COMPARTILHAR CHAVE  ###---
--#############################--

local sharedKeys = {}

RegisterServerEvent("garages:Key")
AddEventHandler("garages:Key",function(entity)
	local source = source
	local Plate = entity[1]
	local user_id = getUserId(source)
    if Config.base == "cn" then
        if user_id and GlobalState["Plates"][Plate] == user_id then
            vRP.GenerateItem(user_id,"vehkey-"..Plate,1,true,false)
        end
    elseif Config.base == "summerz" then
        if user_id and GlobalState["vehPlates"][Plate] == user_id then
            vRP.generateItem(user_id,"vehkey-"..Plate,1,true,false)
        end
	end
end)

RegisterCommand("chave",function(source, args)
    local source = source
    local user_id = getUserId(source)
    local keyCommands = {
        ["add"] = function(vehicle, id)
            if not getUserSource(id) then
                TriggerClientEvent("Notify", source, "aviso", "ID "..id.." não está online", 5000)
                return
            end
            local index = "key-"..vehicle.."-"..user_id
            if not sharedKeys[index] then
                sharedKeys[index] = { id }
                TriggerClientEvent("Notify", source, "sucesso", "Chave do veículo <b>"..vehicle.."<.b> emprestada para o ID <b>"..id.."<.b>", 5000)
            else
                for k,v in pairs(sharedKeys[index]) do
                    if id == v then
                        TriggerClientEvent("Notify", source, "aviso", "ID "..id.." já possui a chave desse veículo", 5000)
                        return
                    end
                end
                table.insert(sharedKeys[index], id)
                TriggerClientEvent("Notify", source, "sucesso", "Chave do veículo <b>"..vehicle.."<.b> emprestada para o ID <b>"..id.."<.b>", 5000)  
            end
        end,
        ["remove"] = function(vehicle, id)
            local index = "key-"..vehicle.."-"..user_id
            if sharedKeys[index] then
                for k,v in ipairs(sharedKeys[index]) do
                    if id == v then
                        table.remove(sharedKeys[index], k)
                        TriggerClientEvent("Notify", source, "importante", "Chave do veículo <b>"..vehicle.."<.b> removida do ID <b>"..id.."<.b>", 5000)  
                        return
                    end
                end
                TriggerClientEvent("Notify", source, "aviso", "ID "..id.." não possui a chave desse veículo", 5000)
            else
                TriggerClientEvent("Notify", source, "aviso", "ID "..id.." não possui a chave desse veículo", 5000)
            end
        end,
        ["list"] = function()
            local myvehicles = query("will/get_vehicles", {user_id = user_id})
            local list = "Chaves emprestadas:"
            if #myvehicles > 0 then
                for i, veh in ipairs(myvehicles) do
                    local vehicle = veh.vehicle
                    local index = "key-"..vehicle.."-"..user_id
                    if sharedKeys[index] and #sharedKeys[index] > 0 then
                        list = list.."<br><b>"..vehicle.."<.b>: "
                        for k,v in ipairs(sharedKeys[index]) do
                            if k == #sharedKeys[index] then
                                list = list..v
                            else
                                list = list..v..",<br>"
                            end
                        end
                    end
                end
                if string.len(list) > 24 then
                    TriggerClientEvent("Notify",source,"importante", list)
                end
            end
        end
    }
    if args[1] and args[1] == "list" then
        keyCommands[args[1]]()
        return
    end
    if #args < 3 or not keyCommands[args[1]] then
        TriggerClientEvent("Notify", source, "aviso", "Utilize .chave <b>(add.remove) (veículo) (id)<.b>", 5000)
        return
    end
    local id = parseInt(args[3])
    local vehicle = args[2]
    local hasVehicle = #(query("will/get_vehicle", { user_id = user_id, vehicle = vehicle })) > 0
    if not hasVehicle then
        TriggerClientEvent("Notify", source, "aviso", "Você não possui o veículo <b>"..vehicle.."<.b>", 5000)
        return
    elseif not id or id < 1 or id == user_id then
        TriggerClientEvent("Notify", source, "aviso", "ID inválido", 5000)
        return
    end
    keyCommands[args[1]](vehicle, id)
end)

function canLockVehicle(user_id, vname, owner, plate)
    if adminVehs[plate] == user_id then
        return true
    end
    if user_id and vname and owner then
        local index = "key-"..vname.."-"..owner
        if sharedKeys[index] then
            for _,id in pairs(sharedKeys[index]) do
                if id == user_id then
                    return true
                end
            end
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Spawnar/deletar veiculo
-----------------------------------------------------------------------------------------------------------------------------------------
local spawnedWrongVehs = {}

-- Função chamada ao spawnar um veiculo (Server-side)
function modifiesOnSpawnVehicle(user_id, vehName, data)
    -- Parametro 'data' são as informações do banco de dados
    return
end

-- Função chamada ao deletar um veiculo (Server-side)
function modifiesOnDeleteVehicle(user_id, vehName, byDv)
    -- Parametro 'byDv' é 'true' caso o veiculo seja deletado por /dv
    return
end

function will.spawnVehicle(vname,x,y,z,h,data,interior,bucket)
    local source = source
    local debugVehicle = 0
    local mHash = GetHashKey(vname)
    local height = bucket == 0 and z or 1.000
	local nveh = CreateVehicle(mHash, x, y, height, h ,true, true)
    while not DoesEntityExist(nveh) and debugVehicle <= 80 do
        debugVehicle = debugVehicle + 1
        Wait(100)
    end
    if DoesEntityExist(nveh) then
        local netid = NetworkGetNetworkIdFromEntity(nveh)
        if not netid then
            spawnedWrongVehs[nveh] = true
            return
        end
        local vehPlate = data.plate or generatePlateNumber()
        SetVehicleNumberPlateText(nveh,vehPlate)
        while GetEntityRoutingBucket(nveh) ~= parseInt(bucket) do
            SetEntityRoutingBucket(nveh,parseInt(bucket))
            Wait(100)
        end
        debugVehicle = 0
        while GetVehicleNumberPlateText(nveh) ~= vehPlate and debugVehicle <= 50 do
            SetVehicleNumberPlateText(nveh,vehPlate)
            debugVehicle = debugVehicle + 1
            Wait(100)
        end
        Wait(100)
        SetEntityCoords(nveh, x, y, z, false, false, false, true)
        SetEntityHeading(nveh, h)
        if data.body then
            SetVehicleBodyHealth(nveh,data.body+0.0)
        else
            SetVehicleBodyHealth(nveh,1000.0)
        end
        if data.vehDoors ~= nil and type(data.vehDoors) == "table" then
            for k,v in pairs(data.vehDoors) do
                if v then
                    SetVehicleDoorBroken(nveh,parseInt(k),parseInt(v))
                end
            end
        end
        registerPlate(vehPlate, getUserId(source))
        if interior then
            SetVehicleDoorsLocked(nveh,1)   -- Destrancado
            if not spawnedVehsInside[source] then spawnedVehsInside[source] = {} end
            spawnedVehsInside[source][vehPlate] = nveh
        else
            SetVehicleDoorsLocked(nveh,2)   -- Trancado
        end
	    return netid
    elseif nveh then
        spawnedWrongVehs[nveh] = true
    end
end

CreateThread(function()
    while true do
        Wait(1000)
        for k,v in pairs(spawnedWrongVehs) do
            if DoesEntityExist(k) then
                vCLIENT.deleteVehicle(-1,k,true)
                DeleteEntity(k)
            else
                spawnedWrongVehs[k] = nil
            end
        end
    end
end)

--########## Pegar tunagem ##########

function getTunning(user_id,veiculo,vehPlate)
    local tunagem = ''
    if GetResourceState("will_tunners") == "started" then
        tunagem = getSData("custom:"..vehPlate)
    elseif GetResourceState("ld_tunners") == "started" then
        tunagem = getSData("mods:"..vehPlate)
    elseif Config.base == "creative" then
    	tunagem = getSData("custom:"..user_id..":"..veiculo)
	elseif Config.base == "vrpex" then
    	tunagem = getSData("custom:u"..user_id.."veh_"..veiculo)
	elseif Config.base == "summerz" then
		local custom = query("entitydata/getData",{ dkey = "custom:"..user_id..":"..veiculo })
		if custom[1] then
			tunagem = custom[1]["dvalue"]
		end
    elseif Config.base == "cn" then
        local Datatable = query("entitydata/GetData",{ dkey = "Mods:"..user_id..":"..veiculo })
        if parseInt(#Datatable) > 0 then
            tunagem = Datatable[1]["dvalue"]
        end
	end
    if type(tunagem) == 'string' then tunagem = json.decode(tunagem) end
	return (tunagem or {})
end

--########## Permissão das casas ##########

function getMyHome(user_id,nome)
    local myHome = query("will/get_homeuser",{ user_id = parseInt(user_id), home = tostring(nome) })
    if myHome[1] then
        return true
    end
    local nplayer = getUserSource(user_id)
    TriggerClientEvent("Notify",nplayer,"negado","Você não possui permissão na casa "..nome..".", 5000)
    return false
end

function getNewHomes()
	local result = {}
    -- ### Função para setar garagem com outro script de casas ###
	return result
end

--########## Pagamento da garagem ##########

function will.payGarage(payment)
    local source = source
    local user_id = getUserId(source)
    if payment and type(payment) == 'number' then
        if request(source,"Deseja alugar o veiculo por R$"..payment.."?",30) then
            return paymentMethod(user_id, payment)
        end
    end
end

--########## Função para vender o veiculo ##########

vRP.prepare("will/rent_veh","SELECT * FROM will_rent WHERE user_id = @user_id AND vehicle = @vehicle")

function sellVehicle(source, vehicle, price, plate)
    local user_id = getUserId(source)
    if will.getVehicleType(vehicle) ~= "vip" then
        local consult = vRP.query("will/rent_veh",{ user_id = user_id, vehicle = vehicle })
        if consult[1] then
            TriggerClientEvent("Notify",source,"negado","Você não pode vender esse veiculo!",5000)
            return
        end
        if request(source, "Deseja vender o veiculo "..vehicle.." por R$"..price.."?", 30) then
            local vehData = query("will/get_user_plate", { plate = plate })
            if vehData[1] and parseInt(vehData[1]['user_id']) == user_id then
                execute("will/rem_vehicle", { user_id = user_id, vehicle = vehicle })
                addBank(user_id, price)
                TriggerClientEvent("Notify",source,"sucesso","Venda concluída com sucesso.",5000)
            end
        end
    else
        TriggerClientEvent("Notify",source,"negado","Não pode vender veiculo vip.",5000)
    end
end

--########## Função para transferir o veiculo ##########

function transferVehicle(source, nplayer, vehicle, plate)
    local user_id = getUserId(source)
    local nuser_id = getUserId(nplayer)
    local identity = getUserIdentity(nuser_id)
    if nplayer and identity then
        if request(source, "Deseja transferir o veiculo "..vehicle.." para "..identity.name.." ?", 30) then
        	local vehData = query("will/get_user_plate", { plate = plate })
            if vehData[1] and parseInt(vehData[1]['user_id']) == user_id then
                local custom = getTunning(user_id,vehicle,plate)
                if custom then
                    execute("will/rem_srv_data",{ dkey = "custom:u"..parseInt(user_id).."veh_"..tostring(vehicle) })
                    execute("will/set_srvdata",{ key = "custom:u"..parseInt(nuser_id).."veh_"..tostring(vehicle), value = json.encode(custom) })
                end
                
                execute("will/move_vehicle", { nuser_id = nuser_id, plate = plate })
    
                TriggerClientEvent("Notify",source,"sucesso","Transferência concluída com sucesso.",5000)
                TriggerClientEvent("Notify",nplayer,"sucesso","Você recebeu "..vehicle.." em sua garagem.",5000)
            end
        end
    else
        Config.Notification('player_transfer','negado',true,source)
    end
end

--########## Permissão para entrar no interior ##########

function requestEnterGarage(source, nplayer)
    local user_id = getUserId(source)
    local identity = getUserIdentity(user_id)
    if request(nplayer, "Permitir "..identity.name.." entrar na sua garagem?", 8) then
        return true
    end
end

--########## Verifica se o veiculo está detido ou com multa ##########

function checkArrestedVehicle(source,user_id,data,vname)
    local arrested = false
    if Config.base == "vrpex" and (parseInt(data.detido) >= 1 or os.time() >= (parseInt(data.time)+24*60*60)) then
        arrested = true
    elseif Config.base == "creative" and (parseInt(data.arrest) >= 1 or os.time() >= (parseInt(data.time)+24*60*60)) then
        arrested = true
    elseif Config.base == "summerz" and (parseInt(data.arrest) >= 1 or os.time() >= (parseInt(data.tax)+24*60*60)) then
        arrested = true
    elseif Config.base == "cn" and (parseInt(data.arrest) >= 1 or os.time() >= (parseInt(data.tax)+24*60*60)) then
        arrested = true
    end
    if arrested then
        local valordetido = 2/100
        local vehType = will.getVehicleType(vname)
        if vehType == "carros" or vehType == "motos" or vehType == nil then
            valordetido = 3/100
        elseif vehType == "donate" then
            valordetido = 5/100
        end
        local vehPrice = will.getVehiclePrice(vname)*valordetido
        local status = request(source,"O veículo "..vname.." está detido, deseja acionar o seguro pagando <b>R$"..tostring(vehPrice).."</b>?",60)
        if status then
            if paymentMethod(user_id, vehPrice) then
                execute("will/set_arrest",{ plate = data.plate, arrest = 0, time = os.time() + 7*24*60*60 })
                return true
            else
                TriggerClientEvent("Notify",source,"negado","Dinheiro insuficiente.",5000)
            end
        end
    else
        return true
    end
end

RegisterServerEvent("will_garages:setVehStatus")
AddEventHandler("will_garages:setVehStatus",function(nuser_id, vehname, status, src)
	if src == nil then src = source end
    if type(nuser_id) == "string" then nuser_id = getUserByPlate(nuser_id) end
	local vehicle = vCLIENT.getNearVehicle(src,7)
	if status == "Detido" then
		if vehicle then
			execute("will/set_vehicle_state",{ user_id = nuser_id, vehicle = vehname, arrest = 1 })
			local veh,vehNet,vehPlate,vehName = vCLIENT.vehList(src,7)
			if vehName == vehname then
				vCLIENT.deleteVehicle(src,vehicle)
			end
		end
	elseif status == "Normal" then
		execute("will/set_vehicle_state",{ user_id = nuser_id, vehicle = vehname, arrest = 0 })
	end
end)

--########## Funções dos veiculos ##########

function will.getVehicleGlobal()
    return GlobalState['VehicleGlobal']
end

function will.getVehicleName(name)
	local vname = name
    if GlobalState['VehicleGlobal'][name] then
        vname = GlobalState['VehicleGlobal'][name].name
    end
    return vname
end

function will.getVehiclePrice(name)
	local vprice = 50000    
    if GlobalState['VehicleGlobal'][name] then
        vprice = GlobalState['VehicleGlobal'][name].price
    end
    return vprice
end

function will.getVehicleChest(name)
    local vchest = 40
    if GlobalState['VehicleGlobal'][name] then
        if GlobalState['VehicleGlobal'][name].chest then
            vchest = GlobalState['VehicleGlobal'][name].chest
        elseif GlobalState['VehicleGlobal'][name].mala then
            vchest = GlobalState['VehicleGlobal'][name].mala
        end
    end
    return parseInt(vchest)
end

function will.getVehicleType(name)
    local vtype = "carros"
    if GlobalState['VehicleGlobal'][name] then
        vtype = GlobalState['VehicleGlobal'][name].type
        if GlobalState['VehicleGlobal'][name].tipo then
            vtype = GlobalState['VehicleGlobal'][name].tipo
        end
    end
    return vtype
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOCK VEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("will_garages_v2:vehicleLock")
AddEventHandler("will_garages_v2:vehicleLock",function(vehNet,vehPlate)
	local source = source
	local user_id = getUserId(source)
	if user_id then
		local _,vehNet,vehPlate,vehName = vCLIENT.vehList(source,4)
		if vehName and vehPlate then
			local plateUserId = getUserByPlate(vehPlate)
			if user_id == plateUserId or canLockVehicle(user_id, vehName, plateUserId, vehPlate) then
                if not vCLIENT.inVehicle(source) then
                    playAnim(source)
                end
                local networkVeh = NetworkGetEntityFromNetworkId(vehNet)
                local vehLock = GetVehicleDoorLockStatus(networkVeh)
                if vehLock >= 2 then
                    TriggerClientEvent("Notify",source,"importante","Veículo <b>destrancado</b> com sucesso.",5000)
                    TriggerClientEvent("vrp_sound:source",source,"lock",0.3)
                    SetVehicleDoorsLocked(networkVeh,1)   -- Destrancado
                else
                    TriggerClientEvent("Notify",source,"importante","Veículo <b>trancado</b> com sucesso.",5000)
                    TriggerClientEvent("vrp_sound:source",source,"lock",0.3)
                    SetVehicleDoorsLocked(networkVeh,2)   -- Trancado
                end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTER PLATE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("setPlateEveryone")
AddEventHandler("setPlateEveryone",function(plate)
    local source = source
    if source then
        registerPlate(plate, getUserId(source))
    else
        registerPlate(plate, nil)
    end
end)

function registerPlate(vehPlate, user_id)
    if vehPlate then
        local vehPlates = GlobalState["vehPlates"]
        local Plates = GlobalState["Plates"]
        vehPlates[vehPlate] = user_id or true
        Plates[vehPlate] = user_id or true
        GlobalState["vehPlates"] = vehPlates
        GlobalState["Plates"] = Plates
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- EXPORTS
-----------------------------------------------------------------------------------------------------------------------------------------
exports('getVehicleGlobal', will.getVehicleGlobal)
exports('getVehicleName', will.getVehicleName)
exports('getVehiclePrice', will.getVehiclePrice)
exports('getVehicleChest', will.getVehicleChest)
exports('getVehicleType', will.getVehicleType)
exports('generatePlateNumber', generatePlateNumber)

--########## Export para adicionar veiculo na garagem ##########

-- Máximo de veiculos por permissão

local enableMaxVehs = false

local maxVehs = {
    ['Supremo'] = 15,
    ['Ruby'] = 12,
    ['Diamante'] = 10,
    ['Ouro'] = 7,
    ['Prata'] = 6
}

exports('checkMaxVehs',function(user_id)
    local myvehicles = enableMaxVehs and query("will/get_vehicles", {user_id = user_id}) or {}
    local maxVeh = 5
    if enableMaxVehs then
        for perm, veh in pairs(maxVehs) do
            if hasPermission(user_id, perm) then
                maxVeh = veh
            end
        end
    end
    if #myvehicles < maxVeh or not enableMaxVehs then
        return true
    else
        local nplayer = getUserSource(user_id)
        TriggerClientEvent("Notify",nplayer,"negado","Máximo de veículos atingido.",5000)
        return false
    end
end)

exports('addVehicle', function(user_id, vehicle)
    if exports['will_garages_v2']:checkMaxVehs(user_id) then
        local plate = generatePlateNumber()
        local infos = { user_id = user_id, vehicle = vehicle, plate = plate, engine = 1000, body = 1000, fuel = 100, work = 'false' }
        execute("will/add_vehicle", infos)
        execute("will/set_arrest",{ plate = plate, arrest = 0, time = os.time() + 7*24*60*60 })
    end
end)

-- ## exports['will_garages_v2']:addVehicle(user_id, vehicle)

exports('remVehicle',function(user_id, vehicle)
    execute("will/rem_vehicle", { user_id = user_id, vehicle = vehicle })
end)

-- ## exports['will_garages_v2']:remVehicle(user_id, vehicle)

-----------------------------------------------------------------------------------------------------------------------------------------
-- PREPARES
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	prepare("will/add_vehicle","INSERT IGNORE INTO "..Config.vehicleDB.."(user_id,vehicle,plate,engine,body,fuel,work) VALUES(@user_id,@vehicle,@plate,@engine,@body,@fuel,@work)")
	prepare("will/add_work_veh","INSERT IGNORE INTO "..Config.vehicleDB.."(user_id,vehicle,plate,engine,body,fuel,work) VALUES(@user_id,@vehicle,@plate,@engine,@body,@fuel,'true')")
	prepare("will/rem_vehicle","DELETE FROM "..Config.vehicleDB.." WHERE user_id = @user_id AND vehicle = @vehicle")
	prepare("will/get_vehicle","SELECT * FROM "..Config.vehicleDB.." WHERE user_id = @user_id AND vehicle = @vehicle")
	prepare("will/get_vehicles","SELECT * FROM "..Config.vehicleDB.." WHERE user_id = @user_id")
	prepare("will/get_user_plate","SELECT * FROM "..Config.vehicleDB.." WHERE plate = @plate")
	prepare("will/update_vehicles_plates","UPDATE "..Config.vehicleDB.." SET plate = @plate WHERE user_id = @user_id AND vehicle = @vehicle")
	prepare("will/update_vehicles","UPDATE "..Config.vehicleDB.." SET engine = @engine, body = @body, fuel = @fuel, doors = @doors, windows = @windows, tyres = @tyres WHERE plate = @plate")
	prepare("will/move_vehicle","UPDATE "..Config.vehicleDB.." SET user_id = @nuser_id WHERE plate = @plate")
	prepare("will/set_garage","UPDATE "..Config.vehicleDB.." SET garage = @garage WHERE plate = @plate")
	prepare("will/get_stoled_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE theft LIKE '%thief%'")
	prepare("will/get_shared_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE garage LIKE CONCAT('shared:', @garage)")
	prepare("will/set_veh_stoled","UPDATE "..Config.vehicleDB.." SET theft = @theft WHERE plate = @plate")
	prepare("will/set_vehicle_state","UPDATE "..Config.vehicleDB.." SET arrest = @arrest WHERE user_id = @user_id AND vehicle = @vehicle")

    AddEventHandler("vRP:playerSpawn",function(user_id,source)
        playerSpawn(user_id,source)
        local homes = getNewHomes()
        TriggerClientEvent("will_garages:setHomes",source,homes)
    end)

	if Config.base == "creative" then
		prepare("will/set_arrest","UPDATE "..Config.vehicleDB.." SET arrest = @arrest, time = @time WHERE plate = @plate")
		prepare("will/get_arrested_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE arrest > 0")
        prepare("will/get_homeuser","SELECT * FROM will_homes WHERE owner = @user_id AND name = @home")
        prepare("will/rem_srv_data","DELETE FROM vrp_srv_data WHERE dkey = @dkey")
        prepare("will/set_srvdata","REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@key,@value)")
    elseif Config.base == "summerz" then
        prepare("will/set_arrest","UPDATE "..Config.vehicleDB.." SET arrest = @arrest, tax = @time WHERE plate = @plate")
		prepare("will/get_arrested_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE arrest > 0")
        prepare("will/get_homeuser","SELECT * FROM summerz_propertys WHERE id = @user_id AND name = @home")
        prepare("will/rem_srv_data","DELETE FROM summerz_entitydata WHERE dkey = @dkey")
        prepare("will/set_srvdata","REPLACE INTO summerz_entitydata(dkey,dvalue) VALUES(@key,@value)")

        AddEventHandler("playerConnect",function(user_id,source)
            playerSpawn(user_id,source)
            local homes = getNewHomes()
            TriggerClientEvent("will_garages:setHomes",source,homes)
        end)
    elseif Config.base == "cn" then
        prepare("will/set_arrest","UPDATE "..Config.vehicleDB.." SET arrest = @arrest, tax = @time WHERE plate = @plate")
		prepare("will/get_arrested_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE arrest > 0")
        prepare("will/get_homeuser","SELECT * FROM propertys WHERE Passport = @user_id AND Name = @home")
        prepare("will/rem_srv_data","DELETE FROM entitydata WHERE dkey = @dkey")
        prepare("will/set_srvdata","REPLACE INTO entitydata(dkey,dvalue) VALUES(@key,@value)")

        AddEventHandler("Connect",function(user_id,source)
            playerSpawn(user_id,source)
            local homes = getNewHomes()
            TriggerClientEvent("will_garages:setHomes",source,homes)
        end)
    else
		prepare("will/set_arrest","UPDATE "..Config.vehicleDB.." SET detido = @arrest, time = @time WHERE plate = @plate")
		prepare("will/get_arrested_vehs","SELECT * FROM "..Config.vehicleDB.." WHERE detido > 0")
        prepare("will/get_homeuser","SELECT * FROM will_homes WHERE owner = @user_id AND name = @home")
        prepare("will/set_srvdata","REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@key,@value)")
        prepare("will/rem_srv_data","DELETE FROM vrp_srv_data WHERE dkey = @dkey")
	end
end)

function SendDiscord(title, text, subtitle)
	local ts = os.time()
	local time = os.date('%Y-%m-%d %H:%M:%S', ts)
	local connect = {
	    {
	        ["color"] = 12422,
	        ["title"] = title,
	        ["description"] = text,
	        ["footer"] = {
				["text"] = subtitle,
				["icon_url"] = Config.IconURL,
	        },
	    }
	}
	PerformHttpRequest(Config.Weebhok, function(err, text, headers) end, 'POST', json.encode({username = Config.Botname, embeds = connect, avatar_url = Config.Logo}), { ['Content-Type'] = 'application/json' })
end