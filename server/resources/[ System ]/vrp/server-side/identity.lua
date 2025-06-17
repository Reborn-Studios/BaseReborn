-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERIDENTITY
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserIdentity(user_id,refresh)
	local source = vRP.getUserSource(user_id)
	local identity = Reborn.getIdentity(source,refresh,user_id)
	if GetResourceState("lb-phone") == "started" and source then
		identity.phone = exports["lb-phone"]:GetEquippedPhoneNumber(source) or ""
	end
	return identity
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERREGISTRATION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserRegistration(user_id)
	local source = vRP.getUserSource(user_id)
	local identity = Reborn.getIdentity(source)
	if identity then
		return identity['registration']
	end
	local rows = vRP.getInformation(user_id)
	return rows[1].registration
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERIDREGISTRATION
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserIdRegistration(registration)
	local rows = vRP.query("vRP/get_vrp_registration",{ registration = registration })
	if rows[1] then
		return rows[1].id
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INITPRISON
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.initPrison(user_id,amount)
	vRP.execute("vRP/set_prison",{ user_id = user_id, prison = parseInt(amount), locate = 1 })
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		UserIdentity["prison"] = parseInt(amount)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEPRISON
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.updatePrison(user_id,amount)
	if not amount or amount <= 0 then
		amount = 1
	end
	vRP.execute("vRP/rem_prison",{ user_id = user_id, prison = amount })
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		UserIdentity["prison"] = UserIdentity["prison"] - amount

		if UserIdentity["prison"] < 0 then
			UserIdentity["prison"] = 0
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADECHARS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeChars(user_id)
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		vRP.execute("accounts/infosUpdatechars",{ identifier = UserIdentity["identifier"] })
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- USERGEMSTONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.userGemstone(identifier)
	local infoAccount = vRP.infoAccount(identifier)
	return infoAccount["gems"] or 0
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADEGEMSTONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeGemstone(user_id,amount)
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		vRP.execute("vRP/set_vRP_gems",{ identifier = UserIdentity["identifier"], gems = amount })
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADENAMES
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeNames(user_id,name,name2)
	vRP.execute("vRP/rename_characters",{ name = name, name2 = name2, id = user_id })
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		UserIdentity["name2"] = name2
		UserIdentity["name"] = name
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADEPHONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradePhone(user_id,phone)
	vRP.execute("characters/updatePhone",{ phone = phone, id = user_id })
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		UserIdentity["phone"] = phone
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETVEHICLEPLATE
-----------------------------------------------------------------------------------------------------------------------------------------
local plateUser = {}

function vRP.getVehiclePlate(plate)
	if not plateUser[plate] then
		local rows = vRP.query("vRP/get_vehicle_plate",{ plate = plate })
		if rows[1] then
			plateUser[plate] = rows[1].user_id
		end
	end
	return plateUser[plate]
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERBYPHONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getUserByPhone(phone)
	local rows = vRP.query("vRP/get_vrp_phone",{ phone = phone })
	if rows[1] then
		return rows[1].id
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETPHONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getPhone(id)
	local UserIdentity = vRP.getUserIdentity(id)
	if UserIdentity then
		return UserIdentity['phone']
	end
	local rows = vRP.query("vRP/get_vrp_users",{ id = id })
	if rows[1] then
		return rows[1].phone
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENERATESTRINGNUMBER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.generateStringNumber(format)
	local abyte = string.byte("A")
	local zbyte = string.byte("0")
	local number = ""
	for i = 1,#format do
		local char = string.sub(format,i,i)
    	if char == "D" then
    		number = number..string.char(zbyte+math.random(0,9))
		elseif char == "L" then
			number = number..string.char(abyte+math.random(0,25))
		else
			number = number..char
		end
	end
	return number
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENERATEREGISTRATIONNUMBER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.generateRegistrationNumber()
	local user_id = nil
	local registration = ""
	repeat
		Citizen.Wait(0)
		registration = vRP.generateStringNumber("DDLLLDDD")
		user_id = vRP.getUserIdRegistration(registration)
	until not user_id

	return registration
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENERATEPLATENUMBER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.generatePlateNumber()
	local user_id = nil
	local registration = ""
	repeat
		Citizen.Wait(0)
		registration = vRP.generateStringNumber("DDLLLDDD")
		user_id = vRP.getVehiclePlate(registration)
	until not user_id

	return registration
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENPLATE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.genPlate()
	return vRP.generateStringNumber("LLDDDLLL")
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENERATEPHONENUMBER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.generatePhoneNumber()
	local user_id = nil
	local phone = ""

	repeat
		Citizen.Wait(0)
		phone = vRP.generateStringNumber("DDD-DDD")
		user_id = vRP.getUserByPhone(phone)
	until not user_id

	return phone
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GENERATETOKEN
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.generateToken()
	local account = nil
	local token = ""

	repeat
		Citizen.Wait(0)
		token = vRP.generateStringNumber("LLLDD")
		account = vRP.getAccountByToken(token)
	until not account

	return token
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ACCOUNTBYTOKEN
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getAccountByToken(token)
	local rows = vRP.query("vRP/get_account_by_token",{ token = token })
	if rows[1] then
		return rows[1].id
	end
end
