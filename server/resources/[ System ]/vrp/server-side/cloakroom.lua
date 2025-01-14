function vRP.save_idle_custom(player,custom)
	local r_idle = {}
	local user_id = vRP.getUserId(player)
	if user_id then
		local data = vRP.getUData(user_id,"Clockroom")
		if data and type(data) == "table" then
			if data.cloakroom_idle == nil then
				data.cloakroom_idle = custom
			end
		else
			vRP.setUData(user_id, "Clockroom", json.encode(custom))
			data = {}
			data.cloakroom_idle = custom
		end
		for k,v in pairs(data.cloakroom_idle) do
			r_idle[k] = v
		end
	end
	return r_idle
end

function vRP.removeCloak(player)
	local user_id = vRP.getUserId(player)
	if user_id then
		local data = vRP.getUData(user_id,"Clockroom")
		if data then
			if data.cloakroom_idle ~= nil then
				vRPclient._setCustomization(player,data.cloakroom_idle)
				data.cloakroom_idle = nil
			end
		end
	end
end
