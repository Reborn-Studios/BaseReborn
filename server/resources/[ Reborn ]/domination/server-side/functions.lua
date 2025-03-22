
--#########################
---## FRAMEWORK FUNCTIONS
--#########################

function getUserId(source)
    return vRP.getUserId(source)
end

function getUserSource(user_id)
	return vRP.getUserSource(user_id)
end

function getUserIdentity(user_id)
    local identity = vRP.getUserIdentity(user_id)
	if not identity.name2 then
        identity.name2 = identity.firstname
    end
    return identity
end

function addUsersGroup(users, group)
    for k,v in pairs(users) do
        local nplayer = getUserSource(v)
        if nplayer then
            vRP.addUserGroup(v, group)
        else
            vRP.execute("vRP/add_group",{ user_id = v, permiss = group })
        end
    end
end

function removeUsersGroup(users, group)
    local consult = query("vRP/get_specific_perm",{ permiss = group })
    for k,v in pairs(consult) do
        local nplayer = getUserSource(v.user_id)
        if nplayer then
            vRP.removeUserGroup(v.user_id, group)
        else
            execute("vRP/del_group",{ user_id = v.user_id, permiss = group })
        end
    end
end

function hasPermission(user_id, perm)
    return vRP.hasPermission(user_id, perm)
end

function getUsersByPermission(perm)
    return vRP.numPermission(perm, true)
end

function giveInventoryItem(user_id, item, amount)
    vRP.giveInventoryItem(user_id, item, amount, true)
end

function checkUserWeight(user_id, item, amount)
    if vRP.computeInvWeight(user_id) + (getItemWeight(item) * amount) <= vRP.getBackpack(user_id) then
        return true
    end
end

function getItemWeight(item)
    return vRP.itemWeightList(item) or 0.5
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

function getSData(key)
    local data = vRP.getSData(key)
    if type(data) == "string" then
        data = json.decode(data)
    end
	return data or {}
end

function setSData(key, data)
    vRP.setSData(key, data)
end

function sendChatMessage(mode, org, place)
    if mode == "dominando" then
        TriggerClientEvent('chatMessage',-1,"[DOMINAÇÃO] A organização "..org.." está dominando o território "..place)
		-- TriggerClientEvent('chat:addMessage', -1, { args={"Me","Dominação"}, template = '<div class="style-msg" style="background: linear-gradient(to right, rgba(157, 0, 255, 1), transparent);"><span id="nameMsg">[DOMINAÇÃO] ^0A organização ^1'..org.." ^7está dominando o território ^1"..place..'.</span>'})
    else
        TriggerClientEvent('chatMessage',-1,"[DOMINAÇÃO] A organização "..org.." dominou o território "..place)
		-- TriggerClientEvent('chat:addMessage', -1, { args={"Me","Dominação"}, template = '<div class="style-msg" style="background: linear-gradient(to right, rgba(157, 0, 255, 1), transparent);"><span id="nameMsg">[DOMINAÇÃO] ^0A organização ^1' ..org.. " ^7dominou o território ^1" .. place..'.</span>',})
    end
end

AddEventHandler("vRP:playerSpawn",function(user_id,source)
    playerSpawn(source, user_id)
end)

function sendWebhookMessage(webhook, place, winner, facs)
    PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
        embeds = {
            {
                title = "REGISTRO DE INVASÃO:\n⠀⠀",
                thumbnail = {
                    url = "https://media.discordapp.net/attachments/920768087911989300/928788429922250833/rbn.png?width=677&height=676"
                },
                fields = {
                    {
                        name = "**LOCAL:**",
                        value = "` "..place.." `"
                    },
                    {
                        name = "**VENCEDOR:**",
                        value = "` "..winner.." `"
                    },
                    {
                        name = "**PARTICIPANTES:**",
                        value = facs
                    }
                },
                footer = {
                    text = os.date("\nData: %d/%m/%Y - Hora: %H:%M:%S"),
                    icon_url = "https://media.discordapp.net/attachments/920768087911989300/928788429922250833/rbn.png?width=677&height=676"
                },
                color = 15418782
            }
        }
    }), { ['Content-Type'] = 'application/json' })
end
