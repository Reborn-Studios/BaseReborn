

cfg_s = {}
Webhooks = module("Reborn/webhooks") or {}

cfg_s.webhook_comprar = Webhooks.webhookcomprar
cfg_s.webhookaddcar = ""

cfg_s.rent_time = 3

CreateThread(function()
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
local veiculos = config.veiculos

cfg_s.buy_vehicle = function(user_id,category,vehicle,tuning)
    if user_id and category and vehicle and tuning then
        if vRP.getFines(user_id) > 0 then
            local nplayer = getUserSource(user_id)
			TriggerClientEvent("Notify",nplayer,"aviso","Multas pendentes encontradas.",3000)
			return false
		end
        if veiculos[category][vehicle] then
            if not veiculos[category][vehicle].vip then
                local vehStock = query('will/get_estoque',{vehicle = vehicle})
                local hasEstoque = vehStock and vehStock[1]
                if not hasEstoque or (vehStock[1].estoque > 0) then
                    local myVeh = query('will/get_vehicle',{user_id=user_id})
                    local price = veiculos[category][vehicle].valor
                    local nplayer = getUserSource(user_id)
                    for k,v in pairs(myVeh) do
                        if v.vehicle == vehicle then
                            if not srv.checkRentSell(user_id,vehicle) then
                                if request(nplayer,"Deseja comprar "..vehicle.." por R$"..price.."?",30) and checkMaxUserVehs(user_id) and tryPayment(user_id,price) then
                                    execute('will/rem_rent',{user_id = user_id,vehicle = vehicle})
                                    addVehicle(user_id, vehicle)
                                    if hasEstoque then
                                        execute('will/att_estoque',{estoque = (vehStock[1].estoque - 1),vehicle = vehicle })
                                    end
                                    vRP.setSData('custom:'..user_id..":"..vehicle,json.encode(tuning))
                                    TriggerClientEvent('Notify',nplayer,"sucesso","Sua compra foi aprovada pelo nossso gerente!")
                                    webhook(cfg_s.webhook_comprar,'```[Concessionaria compra]\n[ID]:'..user_id.."\n[VALOR]:"..price.."[VEICULO]:"..vehicle..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").."\n```")
                                    return
                                end
                            else
                                TriggerClientEvent('Notify',nplayer,'negado',"Você já possui este veiculo em sua garagem!")
                                return
                            end
                        end
                    end
                    if request(nplayer,"Deseja comprar "..vehicle.." por R$"..price.."?",30) and checkMaxUserVehs(user_id) and tryPayment(user_id,price) then
                        if hasEstoque then
                            execute('will/att_estoque',{estoque = (vehStock[1].estoque - 1),vehicle = vehicle })
                        end
                        addVehicle(user_id, vehicle)
                        vRP.setSData('custom:'..user_id..":"..vehicle,json.encode(tuning))
                        TriggerClientEvent('Notify',nplayer,"sucesso","Sua compra foi aprovada pelo nossso gerente!")
                        webhook(cfg_s.webhook_comprar,'```[Concessionaria compra]\n[ID]:'..user_id.."\n[VALOR]:"..price.."[VEICULO]:"..vehicle..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").."\n```")
                    end
                end
            else
                TriggerClientEvent('Notify',nplayer,"negado","Para adquirir acesse nossa loja rebornshop!")
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

cfg_s.rent_vehicle = function(user_id,categoria,vehicle)
    local source = getUserSource(user_id)
    if vRP.getFines(user_id) > 0 then
        TriggerClientEvent("Notify",source,"aviso","Multas pendentes encontradas.",3000)
        return false
    end
    if not checkVehicle(user_id,vehicle) then
        if veiculos[categoria][vehicle] then
            if not veiculos[categoria][vehicle].vip then
                local rent_price = parseInt(veiculos[categoria][vehicle].valor * config.rentPrice)
                local myVeh = query('will/get_vehicle',{user_id=user_id})
                for k,v in pairs(myVeh) do
                    if v.vehicle == vehicle then
                        TriggerClientEvent('Notify',source,'negado',"Você já possui este veiculo em sua garagem!")
                        return
                    end
                end
                local time = parseInt(os.time() + 24*cfg_s.rent_time*60*60)
                if request(source,"Deseja alugar "..vehicle.." por R$"..rent_price.."?",30) and checkMaxUserVehs(user_id) and tryPayment(user_id,rent_price) then
                    execute('will/add_rend',{user_id = user_id,vehicle = vehicle,time = time})
                    addVehicle(user_id, vehicle)
                    TriggerClientEvent('Notify',source,'sucesso',"Você alugou "..veiculos[categoria][vehicle].nome.." por R$"..rent_price.." dutante "..cfg_s.rent_time.." dias!")
                end
            else
                TriggerClientEvent('Notify',source,'negado',"Você não pode alugar este tipo de veiculo!")
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

return cfg_s