local stashesWebhooks = {
    ['inspect'] = Webhooks.webhookrevistar,
    ['get_drop'] = Webhooks.webhookpickupItem,
    ['send_drop'] = Webhooks.webhookdropItem,
    ['homes'] = Webhooks.webhookbaucasas,
    ['trunk'] = Webhooks.webhookportamalas,
    ['glovebox'] = Webhooks.webhookportaluvas,
}

GlobalState['AllStashes'] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'ox_inventory' or resourceName == GetCurrentResourceName() then
        if GetResourceState("ox_inventory") == "missing" then return end
        local Stashes = GetControlFile("stashes")
        for Index,stash in pairs(Stashes) do
            exports.ox_inventory:RegisterStash(stash.id, stash.label, stash.slots, stash.weight, stash.owner, stash.groups, stash.coords)
            stashesWebhooks[stash.id] = stash.webhook
        end
        GlobalState['AllStashes'] = Stashes
    end
end)

RegisterCommand(Config.Commands["stashes"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["stashes"]['perm']) then
        if GetResourceState("ox_inventory") == "started" then
            TriggerClientEvent("AdminControl:openStashes",source)
        else
            TriggerClientEvent("Notify",source,"negado","Ox inventory não iniciado",5000)
        end
    end
end)

local function getStashId(id)
    local Stashes = GlobalState['AllStashes']
    local stashId = "Registered-"..id
    for k,v in pairs(Stashes) do
        if v.id == stashId then
            id = id + 1
            return getStashId(id)
        end
    end
    return stashId
end

function Server.registerStash(Stash)
    local source = source
    if Stash.label then
        local Stashes = GlobalState['AllStashes']
        local id = #Stashes + 1
        Stash.id = getStashId(id)
        exports.ox_inventory:RegisterStash(Stash.id, Stash.label, Stash.slots, Stash.weight, Stash.owner, Stash.groups, Stash.coords)
        Stashes[id] = Stash
        stashesWebhooks[id] = Stash.webhook
        GlobalState:set("AllStashes",Stashes,true)
        SaveControlFile("stashes",id,Stash)
        TriggerClientEvent("Notify",source,"sucesso","Bau registrado com sucesso!",5000)
    end
end

function Server.editStash(index, Stash)
    local source = source
    local Stashes = GlobalState['AllStashes']
    if Stashes[index] then
        Stashes[index].label = Stash.label
        Stashes[index].slots = Stash.slots
        Stashes[index].weight = Stash.weight
        Stashes[index].coords = Stash.coords
        Stashes[index].webhook = Stash.webhook
        stashesWebhooks[Stash.id] = Stash.webhook
        GlobalState:set("AllStashes",Stashes,true)
        EditControlFile("stashes",index,Stashes[index])
        exports.ox_inventory:RegisterStash(Stash.id, Stash.label, Stash.slots, Stash.weight, Stash.owner, Stash.groups, Stash.coords)
        TriggerClientEvent("Notify",source,"sucesso","Bau editado com sucesso!",5000)
    end
end

function Server.deleteStash(index)
    local source = source
    local Stashes = GlobalState['AllStashes']
    if Stashes[index] then
        RemoveControlFile("stashes",index)
        vRP.query("DELETE FROM ox_inventory WHERE name = '"..Stashes[index].id.."'")
        exports.ox_inventory:ClearInventory(Stashes[index].id)
        table.remove(Stashes,index)
        GlobalState:set("AllStashes",Stashes,true)
        TriggerClientEvent("Notify",source,"sucesso","Bau removido com sucesso!",5000)
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WEBHOOKS INVENTARIO
-----------------------------------------------------------------------------------------------------------------------------------------
local function sendWebhookEmbed(webhook, title, description, fields, color)
    PerformHttpRequest(
        webhook,
        function(err, text, headers)
        end,
        "POST",
        json.encode(
            {
                embeds = {
                    {
                        title = title,
                        description = description,
                        author = {
                            name = "",
                            icon_url = ''
                        },
                        fields = fields,
                        footer = {
                            text = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
                            icon_url = "",
                        },
                        color = color
                    }
                }
            }
        ),
        {["Content-Type"] = "application/json"}
    )
end

local function getStashName(id)
    local Stashes = GlobalState['AllStashes']
    for k,v in pairs(Stashes) do
        if v.id == id then
            return v.label
        end
    end
    return id
end

local loaded = false
AddEventHandler("onResourceStart",function(rs)
    if rs == "ox_inventory" or rs == GetCurrentResourceName() then
        Wait(500)
        if loaded then return end
        loaded = true
        if GetResourceState("ox_inventory") == "missing" then return end
        exports.ox_inventory:registerHook('swapItems', function(payload)
            local title = nil
            local webhook = nil
            if payload.toInventory == payload.fromInventory then
                return true
            end
            local user_id = vRP.getUserId(tonumber(payload.source))
            local toInvSplit = splitString(payload.toInventory,":")
            local fromInvSplit = splitString(payload.fromInventory,":")
            if stashesWebhooks[toInvSplit[1]] then
                webhook = stashesWebhooks[toInvSplit[1]]
                title = ("ID (%s) COLOCOU ITEM NO BAU __%s__"):format(user_id,getStashName(toInvSplit[1]))
            elseif stashesWebhooks[fromInvSplit[1]] then
                webhook = stashesWebhooks[fromInvSplit[1]]
                title = ("ID (%s) RETIROU ITEM DO BAU __%s__"):format(user_id,getStashName(fromInvSplit[1]))
            elseif string.find(payload.fromInventory,"drop") then
                webhook = stashesWebhooks['get_drop']
                title = ("ID (%s) PEGOU DROP DO CHÃO"):format(user_id)
            elseif payload.toInventory and tostring(payload.toInventory):find("drop") then
                webhook = stashesWebhooks['send_drop']
                title = ("ID (%s) LARGOU DROP NO CHÃO"):format(user_id)
            elseif payload.toType == "player" and payload.fromType == "player" then
                webhook = stashesWebhooks['inspect']
                title = ("ID (%s) PEGOU DO ID (%s)"):format(vRP.getUserId(payload["toInventory"]), vRP.getUserId(payload["fromInventory"]))
            elseif payload.toType == "trunk" or payload.fromType == "trunk" then
                webhook = stashesWebhooks['trunk']
                if payload.toType == "trunk" then
                    title = ("ID (%s) COLOCOU NO PORTA-MALAS (%s)"):format(user_id, payload["toInventory"])
                else
                    title = ("ID (%s) PEGOU DO PORTA-MALAS (%s)"):format(user_id, payload["fromInventory"])
                end
            elseif payload.toType == "glovebox" or payload.fromType == "glovebox" then
                webhook = stashesWebhooks['glovebox']
                if payload.toType == "glovebox" then
                    title = ("ID (%s) COLOCOU NO PORTA-LUVAS (%s)"):format(user_id, payload["toInventory"])
                else
                    title = ("ID (%s) PEGOU DO PORTA-LUVAS (%s)"):format(user_id, payload["fromInventory"])
                end
            else
                -- print(json.encode(payload, { indent = true }))
            end
            if webhook and user_id then
                local fromSlot = payload.fromSlot
                sendWebhookEmbed(webhook, title, 'Registro de mudança de item entre inventarios.', {
                    {
                        name = 'Item',
                        value = ("%s (%s)"):format(fromSlot.label, fromSlot.name),
                        inline = true
                    },
                    {
                        name = 'Quantidade',
                        value = payload.count,
                        inline = true
                    },
                    {
                        name = 'Metadata',
                        value = json.encode(fromSlot.metadata, { indent = true })
                    },
                }, 16776960)
            end
            return true
        end)
    end
end)
