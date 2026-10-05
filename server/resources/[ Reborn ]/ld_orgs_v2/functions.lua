Tunnel   = module("vrp", "lib/Tunnel")
Proxy    = module("vrp", "lib/Proxy")
Tools    = module("vrp", "lib/Tools")

Resource = GetCurrentResourceName()
SERVER   = IsDuplicityVersion()

RegisterTunnel = {}
vRP = Proxy.getInterface("vRP")

if SERVER then
    vRPclient = Tunnel.getInterface("vRP")
end

Tunnel.bindInterface(Resource, RegisterTunnel)
vTunnel = Tunnel.getInterface(Resource)

if SERVER then
    -------------------------------------------------------------------------
    -- BANCO DE DADOS
    -------------------------------------------------------------------------
    function prepareQuery(name, params)
        if not name or not params then return false end
        return vRP.prepare(name, params)
    end

    function executeQuery(name, params)
        if not name then return false end
        return vRP.execute(name, params or {})
    end

    function consultQuery(name, params)
        if not name then return {} end
        return vRP.query(name, params or {})
    end

    -- A inicialização lê todos os vínculos em uma consulta, incluindo a hierarquia.
    prepareQuery('ld_orgs_v2/GetUsersGroup', "SELECT * FROM permissions")

    -------------------------------------------------------------------------
    -- DADOS DO JOGADOR
    -------------------------------------------------------------------------
    function setUData(user_id, key, value)
        if not user_id or not key then return false end
        return vRP.setUData(user_id, key, value)
    end

    function getUData(user_id, key)
        if not user_id or not key then return nil end
        return vRP.getUData(user_id, key)
    end

    -------------------------------------------------------------------------
    -- GRUPOS / PERMISSÕES
    -------------------------------------------------------------------------
    -- CAPTURAR GRUPOS (OFFLINE/ONLINE)
    function getUserGroups(user_id, rows)
        user_id = tonumber(user_id)
        if not user_id or user_id <= 0 then return nil end
        rows = rows or vRP.query('vRP/get_perm', { user_id = user_id })
        if type(rows) ~= 'table' then return nil end
        local groups = {}
        for _, row in ipairs(rows) do
            local config = Config.Groups[row.permiss]
            if not config then
                for _, organization in pairs(Config.Groups) do
                    if organization.permission == row.permiss then config = organization; break end
                end
            end
            if config and row.hierarchy ~= nil then
                local role
                for name, data in pairs(config.List) do
                    if tonumber(data.tier) == tonumber(row.hierarchy) and (not role or name < role) then role = name end
                end
                assert(role, 'Hierarquia sem cargo configurado: ' .. row.permiss .. '/' .. tostring(row.hierarchy))
                groups[role] = true
            else
                groups[row.permiss] = tonumber(row.hierarchy) or true
            end
        end
        return groups
    end

    function addUserGroup(user_id, group, hierarchy)
        if not user_id or not group then return false end
        local organization = Organizations.List[group]
        local config = organization and Config.Groups[organization]
        if config and type(hierarchy) ~= 'number' then
            local permission = config.permission or organization
            local native = vRP.getGroup(permission)
            if native and native.Hierarchy then
                return vRP.addUserGroup(user_id, permission, tonumber(config.List[group].tier))
            end
        end
        return vRP.addUserGroup(user_id, group, type(hierarchy) == 'number' and hierarchy or nil)
    end

    function removeUserGroup(user_id, group)
        if not user_id or not group then return false end
        local organization = Organizations.List[group]
        local config = organization and Config.Groups[organization]
        local permission = config and (config.permission or organization)
        local native = permission and vRP.getGroup(permission)
        return vRP.removeUserGroup(user_id, native and native.Hierarchy and permission or group)
    end

    function hasGroup(user_id, group)
        if not user_id or not group then return false end
        return vRP.hasGroup(user_id, group)
    end

    function hasPermission(user_id, perm)
        if not user_id or not perm then return false end
        return vRP.hasPermission(user_id, perm)
    end

    -------------------------------------------------------------------------
    -- DINHEIRO
    -------------------------------------------------------------------------
    function getBankMoney(user_id)
        if not user_id then return 0 end
        return vRP.getBankMoney(user_id) or 0
    end

    function giveBankMoney(user_id, amount)
        amount = tonumber(amount)
        if not user_id or not amount or amount <= 0 then return false end
        return vRP.giveBankMoney(user_id, amount)
    end

    function tryFullPayment(user_id, amount)
        amount = tonumber(amount)
        if not user_id or not amount or amount <= 0 then return false end
        return vRP.tryFullPayment(user_id, amount)
    end

    -------------------------------------------------------------------------
    -- JOGADORES / IDENTIDADE
    -------------------------------------------------------------------------
    function getUserSource(user_id)
        user_id = tonumber(user_id)
        if not user_id then return nil end
        return vRP.getUserSource(user_id)
    end

    function getUserId(source)
        if not source then return nil end
        return tonumber(vRP.getUserId(source))
    end

    function getUsers()
        return vRP.getUsers() or {}
    end

    function getUserIdentity(user_id)
        if not user_id then return nil end

        local identity = vRP.getUserIdentity(user_id)
        if not identity then return nil end

        if identity.nome then
            identity.name = identity.nome
            identity.firstname = identity.sobrenome
        end

        if identity.name2 then
            identity.firstname = identity.name2
        end

        return identity
    end

    -------------------------------------------------------------------------
    -- ITENS / UI
    -------------------------------------------------------------------------
    function getItemName(item)
        if not item then return nil end
        return vRP.itemNameList(item) or item
    end

    function request(source, text, time)
        if not source or not text then return false end
        return vRP.request(source, text, time or 30)
    end

    -------------------------------------------------------------------------
    -- COMANDOS
    -------------------------------------------------------------------------
    RegisterCommand('blacklist', function(source, args)
        if not source or not args then return end

        local user_id = getUserId(source)
        if not user_id then return end

        local ply_id = tonumber(args[1])
        if not ply_id then
            notify(source, "negado", "ID inválido.", 5000)
            return
        end

        if not hasPermission(user_id, Config.Permissions.removeBlacklist) then
            notify(source, "negado", "Sem permissão.", 5000)
            return
        end

        if BLACKLIST and BLACKLIST.remUser then
            BLACKLIST:remUser(ply_id)
            notify("sucesso", "Você removeu a blacklist do ID: "..ply_id..".", 5000)
        end
    end)

    -------------------------------------------------------------------------
    -- EVENTOS
    -------------------------------------------------------------------------
    for _, event in ipairs({ 'vRP:playerJoinGroup', 'vRP:playerLeaveGroup' }) do
        AddEventHandler(event, function(user_id, group)
            if not Organizations then return end
            for name, config in pairs(Config.Groups) do
                if group == name or group == config.permission or config.List[group] then
                    Organizations:QueueSync(user_id)
                    return
                end
            end
        end)
    end

    AddEventHandler('vRP:playerSpawn', function(user_id, source, first_spawn)
        if not user_id or not source then return end
        TriggerEvent('ld_orgs_v2:playerSpawn', user_id, source, first_spawn)
    end)

    AddEventHandler('vRP:playerLeave', function(user_id)
        if not user_id then return end
        TriggerEvent('ld_orgs_v2:playerLeave', user_id)
    end)
end
