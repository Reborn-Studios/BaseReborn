-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local wanted = {}
local repose = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- WANTEDDOWN
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		for k,v in pairs(wanted) do
			if wanted[k] > 0 then
				wanted[k] = v - 1
				if wanted[k] <= 0 then
					wanted[k] = nil
				end
			end
		end
		for k,v in pairs(repose) do
			if repose[k] > 0 then
				repose[k] = v - 1
				if repose[k] <= 0 then
					repose[k] = nil
				end
			end
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- WANTEDRETURN
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.wantedReturn(user_id)
	if wanted[user_id] ~= nil then
		TriggerClientEvent("Notify",vRP.getUserSource(user_id),"importante","Aguarde "..vRP.getTimers(wanted[user_id])..".",5000)
		return true
	else
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REPOSERETURN
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.reposeReturn(user_id)
	if repose[user_id] ~= nil then
		TriggerClientEvent("Notify",vRP.getUserSource(user_id),"importante","Aguarde "..vRP.getTimers(repose[user_id])..".",5000)
		return true
	else
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WANTEDTIMER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.wantedTimer(user_id,timer)
	if wanted[user_id] ~= nil then
		wanted[user_id] = wanted[user_id] + timer
	else
		wanted[user_id] = timer
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REPOSETIMER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.reposeTimer(user_id,timer)
	if repose[user_id] ~= nil then
		repose[user_id] = repose[user_id] + timer * 60
	else
		repose[user_id] = timer * 60
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WANTED
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("procurado",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if wanted[user_id] ~= nil then
			TriggerClientEvent("Notify",source,"importante","Aguarde "..vRP.getTimers(wanted[user_id])..".",8000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REPOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("repouso",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if repose[user_id] ~= nil then
			TriggerClientEvent("Notify",source,"importante","Aguarde "..vRP.getTimers(repose[user_id])..".",5000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERINFO
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getInformation(user_id)
	return vRP.query("vRP/get_vrp_users",{ id = parseInt(user_id) })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETUSERINFO
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getInfos(identifier)
	return vRP.query("vRP/get_accounts",{ identifier = identifier })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getTimers(seconds)
	local days = math.floor(seconds/86400)
	seconds = seconds - days * 86400
	local hours = math.floor(seconds/3600)
	seconds = seconds - hours * 3600
	local minutes = math.floor(seconds/60)
	seconds = seconds - minutes * 60

	if days > 0 then
		return string.format("<b>%d Dias</b>, <b>%d Horas</b>, <b>%d Minutos</b> e <b>%d Segundos</b>",days,hours,minutes,seconds)
	elseif hours > 0 then
		return string.format("<b>%d Horas</b>, <b>%d Minutos</b> e <b>%d Segundos</b>",hours,minutes,seconds)
	elseif minutes > 0 then
		return string.format("<b>%d Minutos</b> e <b>%d Segundos</b>",minutes,seconds)
	elseif seconds > 0 then
		return string.format("<b>%d Segundos</b>",seconds)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getTimersMinimal(seconds)
	local days = math.floor(seconds/86400)
	seconds = seconds - days * 86400
	local hours = math.floor(seconds/3600)
	seconds = seconds - hours * 3600
	local minutes = math.floor(seconds/60)
	seconds = seconds - minutes * 60

	if days > 0 then
		return string.format("<b>%d D</b>, <b>%d H</b>, <b>%d M</b>",days,hours,minutes)
	elseif hours > 0 then
		return string.format("<b>%d H</b>, <b>%d M</b>",hours,minutes)
	elseif minutes > 0 then
		return string.format("<b>%d Minutos</b>",minutes)
	elseif seconds > 0 then
		return string.format("<b>%d Segundos</b>",seconds)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- AREAS
-----------------------------------------------------------------------------------------------------------------------------------------
local client_areas = {}
AddEventHandler("vRP:playerLeave",function(user_id,source)
	local areas = client_areas[source]
	if areas then
		for k,area in pairs(areas) do
			if area.inside and area.leave then
				area.leave(source,k)
			end
		end
	end
	client_areas[source] = nil
end)

function vRP.setArea(source,name,x,y,z,radius,height,cb_enter,cb_leave)
	local areas = client_areas[source] or {}
	client_areas[source] = areas
	areas[name] = { enter = cb_enter, leave = cb_leave }
	vRPclient._setArea(source,name,x,y,z,radius,height)
end

function vRP.removeArea(source,name)
	vRPclient._removeArea(source,name)
	local areas = client_areas[source]
	if areas then
		local area = areas[name] 
		if area then
			if area.inside and area.leave then
				area.leave(source,name)
			end
			areas[name] = nil
		end
	end
end

function tvRP.enterArea(name)
	local source = source
	local user_id = vRP.getUserId(source)
	local areas = client_areas[source]
	if not vRP.searchReturn(source) then
		if areas then
			local area = areas[name]
			if area and not area.inside then
				area.inside = true
				if area.enter then
					area.enter(source,name)
				end
			end
		end
	end
end

function tvRP.leaveArea(name)
	local areas = client_areas[source]
	if areas then
		local area = areas[name] 
		if area and area.inside then
			area.inside = false
			if area.leave then
				area.leave(source,name)
			end
		end
	end
end

function vRP.searchReturn(source)
	return false
end

-------##########-------##########-------##########-------##########
--						  WEBHOOK
-------##########-------##########-------##########-------##########
local Discords = {}

AddEventHandler("Discord",function(Hook,Message,Color)
	if not Discords[Hook] then return end
	PerformHttpRequest(Discords[Hook],function(err,text,headers) end,"POST",json.encode({
		username = GlobalState['Basics']['ServerName'],
		embeds = { { color = Color, description = Message } }
	}),{ ["Content-Type"] = "application/json" })
end)

function vRP.createWeebHook(webhook,message)
	if webhook ~= "" then
		PerformHttpRequest(webhook, function(err, text, headers) end, "POST",
        json.encode(
            {
                embeds = {
                    {
                        title = "WEBHOOK",
                        description = message,
                        author = {
                            name = GlobalState['Basics']['ServerName'],
                            icon_url = GlobalState['Basics']['CityLogo']
                        },
                        footer = {
                            text = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
                            icon_url = GlobalState['Basics']['CityLogo']
                        },
                        color = 3092790
                    }
                }
            }
        ),
        {["Content-Type"] = "application/json"}
    )
	end
end
