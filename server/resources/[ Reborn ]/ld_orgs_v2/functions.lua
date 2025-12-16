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
    -- DATABASE HELPERS
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

    prepareQuery('ld_orgs_v2/GetUsersGroup', "SELECT user_id,permiss FROM permissions")

    -------------------------------------------------------------------------
    -- USER DATA
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
    -- GROUPS / PERMISSIONS
    -------------------------------------------------------------------------
    -- CAPTURAR GRUPOS (OFFLINE/ONLINE)
    function getUserGroups(user_id)
        if not user_id then return {} end
        return getUserMyGroups(user_id)
    end

    function getUserMyGroups(user_id)
        if not user_id then return {} end
        return vRP.getUserGroups(user_id) or {}
    end

    -- SETAR / REMOVER GRUPO (OFFLINE)
    function updateUserGroups(user_id, group)
        if not user_id or not group then return false end
        return vRP.removeUserGroup(user_id, group)
    end

    function addUserGroup(user_id, group)
        if not user_id or not group then return false end
        return vRP.addUserGroup(user_id, group)
    end

    function removeUserGroup(user_id, group)
        if not user_id or not group then return false end
        return vRP.removeUserGroup(user_id, group)
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
    -- MONEY
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
    -- USERS / IDENTIDADE
    -------------------------------------------------------------------------
    function getUserSource(user_id)
        if not user_id then return nil end
        return vRP.getUserSource(user_id)
    end

    function getUserId(source)
        if not source then return nil end
        return vRP.getUserId(source)
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
    function itemName(item)
        if not item then return nil end
        return vRP.itemNameList(item) or item
    end

    function request(source, text, time)
        if not source or not text then return false end
        return vRP.request(source, text, time or 30)
    end

    -------------------------------------------------------------------------
    -- COMMANDS
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

        if not hasPermission(user_id, "admin.permissao") then
            notify(source, "negado", "Sem permissão.", 5000)
            return
        end

        if BLACKLIST and BLACKLIST.remUser then
            BLACKLIST:remUser(ply_id)
            notify("sucesso", "Você removeu a blacklist do ID: "..ply_id..".", 5000)
        end
    end)

    -------------------------------------------------------------------------
    -- EVENTS
    -------------------------------------------------------------------------
    AddEventHandler('vRP:playerSpawn', function(user_id, source)
        if not user_id or not source then return end
        TriggerEvent('ld_orgs_v2:playerSpawn', user_id, source)
    end)

    AddEventHandler('vRP:playerLeave', function(user_id)
        if not user_id then return end
        TriggerEvent('ld_orgs_v2:playerLeave', user_id)
    end)
end
