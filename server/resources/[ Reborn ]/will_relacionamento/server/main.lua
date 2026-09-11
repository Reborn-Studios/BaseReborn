local Proxy = module('vrp', 'lib/Proxy') or {}
local Tunnel = module('vrp', 'lib/Tunnel') or {}
vRP = Proxy.getInterface('vRP')
vRPclient = Tunnel.getInterface('vRP')

local pending = {}
local pendingByUser = {}

MySQL.ready(function()
    MySQL.query([[
        CREATE TABLE IF NOT EXISTS `will_relationships` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `user_id1` INT NOT NULL,
            `user_id2` INT NOT NULL,
            `status` VARCHAR(16) NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            UNIQUE KEY `pair` (`user_id1`, `user_id2`),
            KEY `idx_user1` (`user_id1`),
            KEY `idx_user2` (`user_id2`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ]])
end)

local function canonicalPair(a, b)
    if a < b then
        return a, b
    end
    return b, a
end

local function getName(user_id)
    local identity = vRP.getUserIdentity(user_id)
    if identity and identity.name and identity.name2 then
        return ('%s %s'):format(identity.name, identity.name2)
    end
    return tostring(user_id)
end

local function getRelationshipByUser(user_id)
    local rows = MySQL.query.await('SELECT * FROM will_relationships WHERE user_id1 = ? OR user_id2 = ? LIMIT 1', { user_id, user_id })
    if rows and rows[1] then
        return rows[1]
    end
end

local function getRelationshipBetween(a, b)
    local u1, u2 = canonicalPair(a, b)
    local rows = MySQL.query.await('SELECT * FROM will_relationships WHERE user_id1 = ? AND user_id2 = ? LIMIT 1', { u1, u2 })
    if rows and rows[1] then
        return rows[1]
    end
end

local function getPartnerUserId(row, user_id)
    if not row then return end
    if tonumber(row.user_id1) == user_id then
        return tonumber(row.user_id2)
    end
    return tonumber(row.user_id1)
end

local function notify(source, kind, message, time)
    TriggerClientEvent('Notify', source, kind or 'aviso', message or '', time or 5000)
end

local function removePending(user_id, token)
    local list = pendingByUser[user_id]
    if not list then return end
    list[token] = nil
    if not next(list) then
        pendingByUser[user_id] = nil
    end
end

local function cleanupPendingForUser(user_id)
    local list = pendingByUser[user_id]
    if not list then return end
    for token in pairs(list) do
        local req = pending[token]
        pending[token] = nil
        if req then
            removePending(req.from_user_id, token)
            removePending(req.to_user_id, token)
        end
    end
    pendingByUser[user_id] = nil
end

local function addPending(user_id, token)
    if not pendingByUser[user_id] then
        pendingByUser[user_id] = {}
    end
    pendingByUser[user_id][token] = true
end

CreateThread(function()
    while true do
        local t = os.time()
        for token, req in pairs(pending) do
            if not req or (t - (req.created_at or t)) > 60 then
                pending[token] = nil
                if req then
                    removePending(req.from_user_id, token)
                    removePending(req.to_user_id, token)
                end
            end
        end
        Wait(15000)
    end
end)

lib.callback.register('will_relacionamento:getPanelData', function(source, targetServerId)
    local user_id = vRP.getUserId(source)
    if not user_id then
        return { error = 'not_logged' }
    end

    targetServerId = tonumber(targetServerId)
    if not targetServerId or targetServerId <= 0 then
        return {
            me = { user_id = user_id, name = getName(user_id) },
            target = { server_id = 1, user_id = 1, name = "Ninguem da Silva" },
        }
    end

    local target_user_id = vRP.getUserId(targetServerId)
    if not target_user_id then
        return { error = 'target_offline' }
    end

    local myRel = getRelationshipByUser(user_id)
    local myPartnerId = getPartnerUserId(myRel, user_id)
    local myRelPayload
    if myRel then
        myRelPayload = {
            status = myRel.status,
            partner_user_id = myPartnerId,
            partner_name = myPartnerId and getName(myPartnerId) or nil
        }
    end

    local relWithTarget = getRelationshipBetween(user_id, target_user_id)
    local relWithTargetPayload
    if relWithTarget then
        relWithTargetPayload = {
            status = relWithTarget.status
        }
    end

    return {
        me = { user_id = user_id, name = getName(user_id) },
        target = { server_id = targetServerId, user_id = target_user_id, name = getName(target_user_id) },
        my_relationship = myRelPayload,
        relationship_with_target = relWithTargetPayload
    }
end)

RegisterNetEvent('will_relacionamento:requestDating', function(targetServerId)
    local source = source
    local user_id = vRP.getUserId(source)
    if not user_id then return end

    targetServerId = tonumber(targetServerId)
    if not targetServerId or targetServerId <= 0 then return end

    local target_user_id = vRP.getUserId(targetServerId)
    if not target_user_id then
        return notify(source, 'negado', 'Jogador indisponível.')
    end

    if user_id == target_user_id then
        return notify(source, 'negado', 'Não é possível fazer isso com você mesmo.')
    end

    local myRel = getRelationshipByUser(user_id)
    if myRel then
        return notify(source, 'negado', 'Você já está em um relacionamento.')
    end

    local targetRel = getRelationshipByUser(target_user_id)
    if targetRel then
        return notify(source, 'negado', 'Essa pessoa já está em um relacionamento.')
    end

    if vRP.getInventoryItemAmount(user_id,"ring") == 0 then
        return notify(source, 'negado', 'Você não tem uma aliança')
    end

    vRPclient.playAnim(source,false,{ "amb@medic@standing@kneel@idle_a", "idle_a" },true)

    local token = ('%s:%s:%s'):format(user_id, target_user_id, os.time() .. math.random(1000, 9999))
    pending[token] = {
        type = 'dating',
        from_source = source,
        to_source = targetServerId,
        from_user_id = user_id,
        to_user_id = target_user_id,
        created_at = os.time()
    }
    addPending(user_id, token)
    addPending(target_user_id, token)

    TriggerClientEvent('will_relacionamento:openIncoming', targetServerId, {
        token = token,
        type = 'dating',
        from = { user_id = user_id, name = getName(user_id) }
    })
    notify(source, 'sucesso', 'Pedido de namoro enviado.')
end)

RegisterNetEvent('will_relacionamento:requestMarriage', function(targetServerId)
    local source = source
    local user_id = vRP.getUserId(source)
    if not user_id then return end

    targetServerId = tonumber(targetServerId)
    if not targetServerId or targetServerId <= 0 then return end

    local target_user_id = vRP.getUserId(targetServerId)
    if not target_user_id then
        return notify(source, 'negado', 'Jogador indisponível.')
    end

    if user_id == target_user_id then
        return notify(source, 'negado', 'Não é possível fazer isso com você mesmo.')
    end

    local rel = getRelationshipBetween(user_id, target_user_id)
    if not rel or rel.status ~= 'dating' then
        return notify(source, 'negado', 'Você só pode casar se estiver namorando essa pessoa.')
    end

    if vRP.getInventoryItemAmount(user_id,"ring") == 0 then
        return notify(source, 'negado', 'Você não tem uma aliança')
    end

    vRPclient.playAnim(source,false,{ "amb@medic@standing@kneel@idle_a", "idle_a" },true)

    local token = ('%s:%s:%s'):format(user_id, target_user_id, os.time() .. math.random(1000, 9999))
    pending[token] = {
        type = 'marriage',
        from_source = source,
        to_source = targetServerId,
        from_user_id = user_id,
        to_user_id = target_user_id,
        created_at = os.time()
    }
    addPending(user_id, token)
    addPending(target_user_id, token)

    TriggerClientEvent('will_relacionamento:openIncoming', targetServerId, {
        token = token,
        type = 'marriage',
        from = { user_id = user_id, name = getName(user_id) }
    })
    notify(source, 'sucesso', 'Pedido de casamento enviado.')
end)

RegisterNetEvent('will_relacionamento:respond', function(token, accepted)
    local source = source
    local user_id = vRP.getUserId(source)
    if not user_id then return end

    if type(token) ~= 'string' or token == '' then return end
    accepted = accepted == true

    local req = pending[token]
    if not req then
        return notify(source, 'negado', 'Pedido expirado ou inválido.')
    end

    if req.to_user_id ~= user_id or tonumber(req.to_source) ~= source then
        return notify(source, 'negado', 'Pedido inválido.')
    end

    local fromSource = tonumber(req.from_source)
    local fromUserId = tonumber(req.from_user_id)
    local toUserId = tonumber(req.to_user_id)

    pending[token] = nil
    removePending(fromUserId, token)
    removePending(toUserId, token)
    if fromSource then
        vRPclient.stopAnim(fromSource)
    end

    if not accepted then
        if fromSource and fromSource > 0 then
            notify(fromSource, 'aviso', ('%s recusou o pedido.'):format(getName(toUserId)))
        end
        return notify(source, 'aviso', 'Você recusou o pedido.')
    end

    if req.type == 'dating' then
        if getRelationshipByUser(fromUserId) then
            notify(source, 'negado', 'Essa pessoa já entrou em um relacionamento.')
            if fromSource and fromSource > 0 then
                notify(fromSource, 'negado', 'Você já entrou em um relacionamento.')
            end
            return
        end

        if getRelationshipByUser(toUserId) then
            notify(source, 'negado', 'Você já entrou em um relacionamento.')
            if fromSource and fromSource > 0 then
                notify(fromSource, 'negado', 'Essa pessoa já entrou em um relacionamento.')
            end
            return
        end

        
        if vRP.tryGetInventoryItem(fromUserId,"ring",1) then
            local u1, u2 = canonicalPair(fromUserId, toUserId)
            MySQL.insert.await('INSERT INTO will_relationships (user_id1, user_id2, status) VALUES (?, ?, ?)', { u1, u2, 'dating' })
            notify(source, 'sucesso', ('Você está namorando %s.'):format(getName(fromUserId)))
            vRP.giveInventoryItem(toUserId,"ring",1)
            if fromSource and fromSource > 0 then
                notify(fromSource, 'sucesso', ('Você está namorando %s.'):format(getName(toUserId)))
            end
        end
        return
    end

    if req.type == 'marriage' then
        local rel = getRelationshipBetween(fromUserId, toUserId)
        if not rel or rel.status ~= 'dating' then
            notify(source, 'negado', 'Vocês não estão namorando.')
            if fromSource and fromSource > 0 then
                notify(fromSource, 'negado', 'Vocês não estão namorando.')
            end
            return
        end

        if vRP.tryGetInventoryItem(fromUserId,"ring",1) then
            local u1, u2 = canonicalPair(fromUserId, toUserId)
            MySQL.update.await('UPDATE will_relationships SET status = ? WHERE user_id1 = ? AND user_id2 = ?', { 'married', u1, u2 })
            notify(source, 'sucesso', ('Você se casou com %s.'):format(getName(fromUserId)))
            vRP.giveInventoryItem(toUserId,"ring",1)
            if fromSource and fromSource > 0 then
                notify(fromSource, 'sucesso', ('Você se casou com %s.'):format(getName(toUserId)))
            end
        end
        return
    end
end)

RegisterNetEvent('will_relacionamento:endWithTarget', function(targetServerId)
    local source = source
    local user_id = vRP.getUserId(source)
    if not user_id then return end

    targetServerId = tonumber(targetServerId)
    if not targetServerId or targetServerId <= 0 then return end

    local target_user_id = vRP.getUserId(targetServerId)
    if not target_user_id then
        return notify(source, 'negado', 'Jogador indisponível.')
    end

    local rel = getRelationshipBetween(user_id, target_user_id)
    if not rel then
        return notify(source, 'negado', 'Vocês não possuem relacionamento.')
    end

    local u1, u2 = canonicalPair(user_id, target_user_id)
    MySQL.query.await('DELETE FROM will_relationships WHERE user_id1 = ? AND user_id2 = ?', { u1, u2 })

    notify(source, 'sucesso', 'Relacionamento terminado.')
    notify(targetServerId, 'aviso', ('%s terminou o relacionamento.'):format(getName(user_id)))
end)

AddEventHandler('playerDropped', function()
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        cleanupPendingForUser(user_id)
    end
end)
