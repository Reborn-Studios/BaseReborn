
--#########################
---## FRAMEWORK FUNCTIONS
--#########################

function getUserId(source)
    if config.base == "cn" then
		return vRP.Passport(source)
    end
    return vRP.getUserId(source)
end

function getUserSource(user_id)
	if config.base == "summerz" then
		return vRP.userSource(user_id)
    elseif config.base == "cn" then
		return vRP.Source(user_id)
	end
	return vRP.getUserSource(user_id)
end

function getUserIdentity(user_id)
    local identity = vRP.getUserIdentity(user_id)
    if config.base == "summerz" then
		identity = vRP.userIdentity(user_id)
    elseif config.base == "cn" then
		identity = vRP.Identity(user_id)
	end
	if not identity.name2 then
        identity.name2 = identity.firstname
    end
    return identity
end

function tryPayment(user_id, price)
    if config.base == "cn" then
        return vRP.PaymentFull(user_id, parseInt(price))
    elseif config.base == "summerz" then
        return vRP.paymentFull(user_id, parseInt(price))
    end
	return vRP.tryFullPayment(user_id, parseInt(price))
end

function prepare(name, query)
    if config.base == "cn" then
        vRP.Prepare(name, data)
    else
        vRP.prepare(name, query)
    end
end

function query(name, data)
    if config.base == "cn" then
        return vRP.Query(name, data)
    else
        return vRP.query(name, data)
    end
end

function execute(name, data)
    if config.base == "cn" then
        vRP.Query(name, data)
    else
        vRP.execute(name, data)
    end
end

function request(source,text,time)
    if config.base == "cn" then
        return vRP.Request(source,text,time)
    end
    return vRP.request(source,text,time)
end

function addVehicle(user_id, vehicle)
    if GetResourceState("will_garages_v2") == "started" then
        exports['will_garages_v2']:addVehicle(user_id, vehicle)
    elseif Config.base == "creative" then
        local plate = vRP.generatePlateNumber()
        local phone = vRP.getPhone(parseInt(user_id))
        execute("will/add_vehicle",{ user_id = parseInt(user_id), vehicle = vehicle, plate = plate, phone = phone, work = 'false' })
    else
        execute('will/add_vehicle',{user_id = user_id,vehicle = vehicle, ipva = os.time() + 24*30*30})
    end
end