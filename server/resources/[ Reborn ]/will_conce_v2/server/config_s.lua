

cfg_s = {}
Webhooks = module("config/webhooks") or {}

cfg_s.webhook_comprar = Webhooks.webhookcomprar
cfg_s.webhookaddcar = ""

cfg_s.rent_time = 3

CreateThread(function()
    prepare("will/get_all_stock","SELECT * FROM will_conce")
    prepare("will/get_estoque","SELECT * FROM will_conce WHERE vehicle = @vehicle")
    prepare("will/att_estoque","UPDATE will_conce SET estoque = @estoque WHERE vehicle = @vehicle")
    
    prepare("will/get_rent","SELECT * FROM will_rent WHERE user_id = @user_id")
    prepare("will/check_rent","SELECT * FROM will_rent")
    prepare("will/add_rend","INSERT IGNORE INTO will_rent(user_id,vehicle,time) VALUES(@user_id,@vehicle,@time)")
    prepare("will/rem_rent","DELETE FROM will_rent WHERE user_id = @user_id AND vehicle = @vehicle")
    
    if config.base == "creative" then
        prepare("will/add_vehicle","INSERT IGNORE INTO "..config.vehicleDB.."(user_id,vehicle,plate,phone,work) VALUES(@user_id,@vehicle,@plate,@phone,@work)")
    else
        prepare("will/add_vehicle","INSERT IGNORE INTO "..config.vehicleDB.."(user_id,vehicle,ipva) VALUES(@user_id,@vehicle,@ipva)")
    end
    prepare("will/rem_vehicle","DELETE FROM "..config.vehicleDB.." WHERE user_id = @user_id AND vehicle = @vehicle")
    
    prepare("will/get_vehicle","SELECT * FROM "..config.vehicleDB.." WHERE user_id = @user_id")
    
    prepare("will/insert_stock","INSERT IGNORE INTO will_conce(vehicle,estoque) VALUES(@vehicle,@estoque)")
    
    prepare("will/create_rent",[[
        CREATE TABLE IF NOT EXISTS `will_rent` (
            `user_id` INT(11) NULL DEFAULT NULL,
            `vehicle` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
            `time` INT(11) NULL DEFAULT NULL
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;
    ]])
    prepare("will/create_conce",[[
        CREATE TABLE IF NOT EXISTS `will_conce` (
            `vehicle` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
            `estoque` INT(11) NULL DEFAULT NULL
        )
        COLLATE='utf8mb4_general_ci'
        ENGINE=InnoDB
        ;
    ]])

    execute("will/create_rent")
    execute("will/create_conce")
end)

function webhook(webhook,message)
    if webhook ~= "none" then
        PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({content = message}), { ['Content-Type'] = 'application/json' })
    end
end

--------------------------------------------------------------
--- [ Custom commands ]
--------------------------------------------------------------

cfg_s.buy_vehicle = function(user_id,category,vehicle,tuning,indexConce)
    if user_id and category and vehicle and tuning then
        local nplayer = getUserSource(user_id)
        if not nplayer then return end
        if vRP.getFines(user_id) > 0 then
			TriggerClientEvent("Notify",nplayer,"aviso","Multas pendentes encontradas.",3000)
			return false
		end
        local ConceVehicles = config.conce[indexConce].vehicles or config.veiculos
        if ConceVehicles[category][vehicle] then
            local vehStock = query('will/get_estoque',{vehicle = vehicle})
            local hasEstoque = vehStock and vehStock[1]
            if not hasEstoque or (vehStock[1].estoque > 0) then
                local myVeh = query('will/get_vehicle',{user_id=user_id})
                local price = ConceVehicles[category][vehicle].valor
                for k,v in pairs(myVeh) do
                    if v.vehicle == vehicle then
                        if not srv.checkRentSell(user_id,vehicle) then
                            if request(nplayer,"Deseja comprar "..vehicle.." por R$"..price.."?",30) and checkMaxUserVehs(user_id) then
                                if tryPayment(user_id,price,ConceVehicles[category][vehicle].vip) then
                                    local plate = vRP.generatePlateNumber()
                                    execute('will/rem_rent',{user_id = user_id,vehicle = vehicle})
                                    addVehicle(user_id, vehicle, plate)
                                    if hasEstoque then
                                        local quantity = (vehStock[1].estoque - 1)
                                        execute('will/att_estoque',{estoque = quantity,vehicle = vehicle })
                                        VehsStocks[vehicle] = quantity
                                    end
                                    if GetResourceState("ld_tunners") == "started" then
                                        local tunning2 = { primaryColor = tuning.customPcolor }
                                        vRP.setSData("mods:"..plate,json.encode(tunning2))
                                    else
                                        vRP.setSData('custom:'..user_id..":"..vehicle,json.encode(tuning))
                                    end
                                    
                                    TriggerClientEvent('Notify',nplayer,"sucesso","Sua compra foi aprovada pelo nossso gerente!")
                                    webhook(cfg_s.webhook_comprar,'```[Concessionaria compra]\n[ID]:'..user_id.."\n[VALOR]:"..price.."[VEICULO]:"..vehicle..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").."\n```")
                                    return
                                else
                                    TriggerClientEvent('Notify',nplayer,'negado',"Você não possui dinheiro suficiente para comprar este veiculo!",5000)
                                    return
                                end
                            end
                        else
                            TriggerClientEvent('Notify',nplayer,'negado',"Você já possui este veiculo em sua garagem!")
                            return
                        end
                    end
                end
                if request(nplayer,"Deseja comprar "..vehicle.." por R$"..price.."?",30) and checkMaxUserVehs(user_id) then
                    if tryPayment(user_id,price,ConceVehicles[category][vehicle].vip) then
                        local plate = vRP.generatePlateNumber()
                        if hasEstoque then
                            local quantity = (vehStock[1].estoque - 1)
                            execute('will/att_estoque',{estoque = quantity, vehicle = vehicle })
                            VehsStocks[vehicle] = quantity
                        end
                        addVehicle(user_id, vehicle, plate)
                        if GetResourceState("ld_tunners") == "started" then
                            local tunning2 = { primaryColor = tuning.customPcolor }
                            vRP.setSData("mods:"..plate,json.encode(tunning2))
                        elseif GetResourceState("lscustoms") == "started" then
                            vRP.setSData('custom:'..user_id..":"..vehicle,json.encode({ PrimaryColour = { Type = 0, Color = tuning.customPcolor } }))
                        else
                            vRP.setSData('custom:'..user_id..":"..vehicle,json.encode(tuning))
                        end
                        TriggerClientEvent('Notify',nplayer,"sucesso","Sua compra foi aprovada pelo nossso gerente!")
                        webhook(cfg_s.webhook_comprar,'```[Concessionaria compra]\n[ID]:'..user_id.."\n[VALOR]:"..price.."[VEICULO]:"..vehicle..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").."\n```")
                    else
                        TriggerClientEvent('Notify',nplayer,'negado',"Você não possui dinheiro suficiente para comprar este veiculo!",5000)
                    end
                end
            else
                TriggerClientEvent('Notify',nplayer,'negado',"Veiculo sem estoque!",5000)
            end
        end
    end
end

function checkMaxUserVehs(user_id)
    if GetResourceState("will_garages_v2") == "started" then
        return exports['will_garages_v2']:checkMaxVehs(user_id)
    end
    return true
end

cfg_s.rent_vehicle = function(user_id,categoria,vehicle,indexConce)
    local source = getUserSource(user_id)
    if not source then return end
    if vRP.getFines(user_id) > 0 then
        TriggerClientEvent("Notify",source,"aviso","Multas pendentes encontradas.",3000)
        return false
    end
    if not checkVehicle(user_id,vehicle) then
        local ConceVehicles = config.conce[indexConce].vehicles or config.veiculos
        if ConceVehicles[categoria][vehicle] then
            if categoria == "vips" then
                TriggerClientEvent('Notify',source,'negado',"Você não pode alugar um veículo VIP!")
                return
            end
            local rent_price = parseInt(ConceVehicles[categoria][vehicle].valor * config.rentPrice)
            local myVeh = query('will/get_vehicle',{user_id=user_id})
            for k,v in pairs(myVeh) do
                if v.vehicle == vehicle then
                    TriggerClientEvent('Notify',source,'negado',"Você já possui este veiculo em sua garagem!")
                    return
                end
            end
            local time = parseInt(os.time() + 24*cfg_s.rent_time*60*60)
            if request(source,"Deseja alugar "..vehicle.." por R$"..rent_price.."?",30) and checkMaxUserVehs(user_id) then
                if tryPayment(user_id,rent_price,ConceVehicles[categoria][vehicle].vip) then
                    execute('will/add_rend',{user_id = user_id,vehicle = vehicle,time = time})
                    addVehicle(user_id, vehicle)
                    TriggerClientEvent('Notify',source,'sucesso',"Você alugou "..ConceVehicles[categoria][vehicle].nome.." por R$"..rent_price.." dutante "..cfg_s.rent_time.." dias!")
                else
                    TriggerClientEvent('Notify',source,'negado',"Você não possui dinheiro suficiente para alugar este veiculo!",5000)
                end
            end
        end
    else
        TriggerClientEvent('Notify',source,'negado',"Você já possui este veiculo!")
    end
end

RegisterCommand("admconce",function(source,args,rawCommand)
    local user_id = getUserId(source)
    if user_id then
        if (vRP.hasPermission(user_id,"Admin") or vRP.hasPermission(user_id,"admin.permissao")) then
            TriggerClientEvent("will_conce_v2:openAdmin",source)
        end
    end
end)

RegisterCommand("inserir_estoque",function(source,args,rawCommand)
    local user_id = getUserId(source)
    if user_id then
        if (vRP.hasPermission(user_id,"Admin") or vRP.hasPermission(user_id,"admin.permissao")) then
            if args[1] then
                local stock = tonumber(args[1]) or 0
                for category,vehicles in pairs(config.veiculos) do
                    for veh,v in pairs(vehicles) do
                        if VehsStocks[veh] then
                            execute('will/att_estoque',{ estoque = stock, vehicle = veh })
                        else
                            execute("will/insert_stock", { vehicle = veh, estoque = stock })
                        end
                        VehsStocks[veh] = stock
                    end
                end
            else
                TriggerClientEvent('Notify',source,'negado',"Utilize /inserir_estoque (quantidade) para todos os veiculos")
            end
        end
    end
end)

return cfg_s