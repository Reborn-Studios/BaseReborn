QBCore = exports["qb-core"]:GetCoreObject()

RegisterNetEvent("Reborn:reloadInfos",function()
    QBCore = exports["qb-core"]:GetCoreObject()
end)

-- SERVER COMPATIBILITY LAYER
if (IsDuplicityVersion()) then
    SetTimeout(1000, function()
        MySQL.query([[
            CREATE TABLE IF NOT EXISTS `bans` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `name` varchar(50) DEFAULT NULL,
                `license` varchar(50) DEFAULT NULL,
                `discord` varchar(50) DEFAULT NULL,
                `ip` varchar(50) DEFAULT NULL,
                `reason` text DEFAULT NULL,
                `expire` int(11) DEFAULT NULL,
                `bannedby` varchar(255) NOT NULL DEFAULT 'LeBanhammer',
                PRIMARY KEY (`id`)
            )
        ]])

        MySQL.query([[
            CREATE TABLE IF NOT EXISTS `warns` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `name` varchar(50) NOT NULL,
                `license` varchar(50) NOT NULL,
                `reason` text NOT NULL,
                `warnedby` varchar(50) NOT NULL,
                `warnedtime` bigint(20) NOT NULL DEFAULT unix_timestamp(),
                PRIMARY KEY (`id`)
            )
        ]])

        -- print("[mri_Qbox PAINEL ADMIN QBOX] Database carregada. << modificações feitas por .mur4i e williv")
    end)

    Compat = {
        GetPlayer = QBCore.Functions.GetPlayer,
        GetPlayerFromCharacterIdentifier = QBCore.Functions.GetPlayerByCitizenId,
        GetOfflinePlayerFromCharacterIdentifier = QBCore.Functions.GetOfflinePlayerByCitizenId,
        GetPlayerList = function()
            local PlayerList = {}
            for k, v in pairs(QBCore.Functions.GetPlayers()) do
                v = tonumber(v)
                local Player = QBCore.Functions.GetPlayer(v)
                if Player then
                    local identifiers, steamIdentifier = GetPlayerIdentifiers(v)
                    for _, v2 in pairs(identifiers) do
                        if string.find(v2, "license:") then
                            steamIdentifier = v2
                        end
                        if not Config.ShowIPInIdentifiers then
                            if string.find(v2, "ip:") then
                                identifiers[_] = nil
                            end
                        end
                    end
                    local playerRole = "user"
                    if QBCore.Functions.HasPermission(v, "Owner") then
                        playerRole = "god"
                    elseif QBCore.Functions.HasPermission(v, "Admin") then
                        playerRole = "admin"
                    end

                    -- local lastOnlineResult = MySQL.query.await("SELECT last_updated FROM characters WHERE user_id = ?", {Player.PlayerData.citizenid})
                    local lastOnlineResult = {}
                    local amountofVehicles = MySQL.query.await('SELECT COUNT(*) as count FROM `'..Config.DB.VehiclesTable..'` WHERE `user_id` = ?', {Player.PlayerData.citizenid})
                    local bank = Player.PlayerData.money.bank or "Unknown"
                    local cash = Player.PlayerData.money.cash or "Unknown"
                    local citizenid = Player.PlayerData.citizenid or "Unknown"
                    local gender = Player.PlayerData.charinfo.gender or "Unknown"
                    local nationality = Player.PlayerData.charinfo.nationality or "Unknown"
                    local phone = Player.PlayerData.charinfo.phone or "Unknown"
                    local accountid = Player.PlayerData.charinfo.account or "Unknown"
                    local hunger = Player.PlayerData.metadata['hunger'] or "Unknown"
                    local thirst = Player.PlayerData.metadata['thirst'] or "Unknown"
                    local injail = Player.PlayerData.metadata['injail'] or "Unknown"
                    local lastonline = lastOnlineResult[1] and lastOnlineResult[1].last_updated or "Unknown"
                    local job = Player.PlayerData.job.label or "Unknown"
                    local rank =  Player.PlayerData.job.grade.name or "Unknown"
                    local health = GetEntityHealth(GetPlayerPed(Player.PlayerData.source)) / 2
                    local armor = GetPedArmour(GetPlayerPed(Player.PlayerData.source))
                    local gang = Player.PlayerData.gang.label or "Unknown"
                    local charname = (Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname) or "Unknown"
                    local jobboss = Player.PlayerData.job.isboss or "Unknown"
                    local duty = Player.PlayerData.job.onduty or "Unknown"
                    local gangrank = Player.PlayerData.gang.grade.name or "Unknown"
                    local gangboss = Player.PlayerData.gang.isboss or "Unknown"
            
                    table.insert(PlayerList,
                        {
                            id = v,
                            name = GetPlayerName(v),
                            identifiers = json.encode(identifiers),
                            role = LoadedRole[v],
                            bank = '$'..comma_value(bank),
                            cash = '$'..comma_value(cash),
                            steamid = steamIdentifier,
                            citizenid = citizenid,
                            gender = gender,
                            nationality = nationality,
                            phone = phone,
                            accountid = accountid,
                            hunger = hunger,
                            thirst = thirst,
                            injail = injail,
                            lastonline = lastonline,
                            amountofVehicles = amountofVehicles[1].count,
                            job = job,
                            rank = rank,
                            health = health,
                            armor = armor,
                            jobboss = jobboss and "<span class=\"badge badge-success\">"..Lang:t('alerts.yes').."</span>" or "<span class=\"badge badge-danger\">"..Lang:t('alerts.no').."</span>",
                            duty = duty and "<span class=\"badge badge-success\">"..Lang:t('alerts.yes').."</span>" or "<span class=\"badge badge-danger\">"..Lang:t('alerts.no').."</span>",
                            gang = gang,
                            gangrank = gangrank,
                            gangboss = gangboss and "<span class=\"badge badge-success\">"..Lang:t('alerts.yes').."</span>" or "<span class=\"badge badge-danger\">"..Lang:t('alerts.no').."</span>",
                            charname = charname,
                        }
                    )
                end
            end
            return PlayerList
        end,
        SetPlayerJob = function(targetId, job, grade)
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                p.Functions.SetJob(tostring(job), tonumber(grade))
                p.Functions.Save()
            end
        end,
        SetPlayerGang = function(targetId, gang, grade)
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                p.Functions.SetGang(tostring(gang), tonumber(grade))
                p.Functions.Save()
            end
        end,
        GetPlayerRole = function(targetId)
            return QBCore.Functions.GetPermission(targetId)
        end,
        GetCharacterName = function(targetId)
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                return p.PlayerData.charinfo.firstname .. ' ' .. p.PlayerData.charinfo.lastname
            end
        end,
        ClearPlayerInventory = function (targetId)
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                -- p.Functions.ClearInventory()
                TriggerEvent("ld-inv:Server:ClearInventory", p.PlayerData.citizenid)
	            TriggerEvent("ld-inv:Server:ClearWeapons", p.PlayerData.citizenid)
                if GetResourceState("ox_inventory") == "started" then
                    if targetId then
                        exports.ox_inventory:ClearInventory(targetId)
                    end
                end
            end
        end,
        GetVehiclesList = function()
            if GetResourceState("will_garages_v2") == "started" then
                local VehicleList = {}
                for veh,info in pairs(GlobalState['VehicleGlobal']) do
                    VehicleList[veh] = {
                        ['name'] = info.name,
                        ['brand'] = info.name,
                        ['model'] = info.name,
                        ['price'] = info.price,
                        ['category'] = info.type,
                        ['hash'] = GetHashKey(veh),
                        ['shop'] = 'pdm',
                    }
                end
                return VehicleList
            end
            return QBCore.Shared.Vehicles
        end,
        GetItemsList = function()
            if GetResourceState("ox_inventory") == "started" then
                return exports.ox_inventory:Items()
            end
            return QBCore.Shared.Items
        end,
        
        GetCharacterIdentifier = function(targetId)
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                return p.PlayerData.citizenid
            else
                return nil
            end
        end,
        GetMasterEmployeeList = function()
            local jobs = QBCore.Shared.Jobs
            local list = {}
            for k,v in pairs(jobs) do
                local res = MySQL.query.await("SELECT * FROM `permissions` WHERE `permiss` = ?", {k})
                local JobEmployees = {}
                for k2,v2 in pairs(res) do
                    local Player = nil
                    local isOnline = false
                    local playerDatas = QBCore.Functions.GetPlayerByCitizenId(v2.user_id)
                    if playerDatas then
                        isOnline = true
                        Player = playerDatas
                    else
                        isOnline = false
                        Player = QBCore.Functions.GetOfflinePlayerByCitizenId(v2.user_id)
                    end
                    if Player then
                        local CharInfo = Player.PlayerData.charinfo
                        table.insert(JobEmployees, {
                            Name = Player.PlayerData.license or "Não encontrado",
                            CitizenId = v2.user_id,
                            CharName = CharInfo.firstname .. ' ' .. CharInfo.lastname,
                            IsBoss = string.find(k,"Lider") and "Sim" or "Não",
                            IsOnline = isOnline and "<span class=\"badge bg-success text-light\">ONLINE</span>" or "<span class=\"badge bg-danger text-light\">OFFLINE</span>",
                            Grade = {name = v.label, level = 1},
                        })
                    end
                end
                list[k] = JobEmployees
            end
            return list
        end,
        GetMasterGangList = function()
            local gangs = QBCore.Shared.Gangs
            local list = {}
            --[[ for k,v in pairs(gangs) do
                local GangMembers = {}
                local results = MySQL.query.await("SELECT * FROM `"..Config.DB.CharactersTable.."` WHERE `gang` LIKE ?", {"%"..k.."%"})
                for k1,v1 in ipairs(results) do
                    local CharInfo = json.decode(v1.charinfo)
                    local CharName = "Unknown?"
                    if CharInfo then
                        CharName = CharInfo.firstname .. ' ' .. CharInfo.lastname
                    end
                    local GangInfo = json.decode(v1.gang)
                    local GradeInfo = GangInfo.grade
                    local Online = QBCore.Functions.GetPlayerByCitizenId(v1.citizenid)
                    table.insert(GangMembers, {
                        Name = v1.name,
                        CitizenId = v1.citizenid,
                        CharName = CharName,
                        IsBoss = GangInfo.isboss,
                        IsOnline = Online and "<span class=\"badge bg-success text-light\">ONLINE</span>" or "<span class=\"badge bg-danger text-light\">OFFLINE</span>",
                        Grade = {name = GradeInfo.name, level = GradeInfo.level},
                    })
                end
                list[k] = GangMembers
            end ]]
            return list
        end,
        CreateCallback = QBCore.Functions.CreateCallback,
        GetCharacterData = function(targetId)
            local d = {}
            local p = QBCore.Functions.GetPlayer(targetId)
            if p then
                d.CharacterName = p.PlayerData.charinfo.firstname .. ' ' .. p.PlayerData.charinfo.lastname
                d.Role = "Unknown"
                d.Cash = p.PlayerData.money.cash
                d.Bank = p.PlayerData.money.bank
                d.CharacterIdentifier = p.PlayerData.citizenid
                d.Job = p.PlayerData.job.label
                d.Rank = p.PlayerData.job.grade.name
                d.PlayerId = p.PlayerData.source
                d.IsBoss = p.PlayerData.job.isboss
                d.OnDuty = p.PlayerData.job.onduty
                d.GangLabel = p.PlayerData.gang.label
                d.GangRank = p.PlayerData.gang.grade.name
                d.GangIsBoss = p.PlayerData.gang.isboss
            end
            return d
        end,
        GetLeaderboardInfo = function()
            local money = {}
            local vehicles = {}
            local results = MySQL.query.await("SELECT * FROM `"..Config.DB.CharactersTable.."`")
            for k,v in pairs(results) do
                local moneyInfo = json.decode(v.money)
                money[#money + 1] = {
                    citizenid = v.id,
                    firstname = v.name,
                    lastname = v.name2,
                    cash = 0,
                    bank = v.bank,
                    crypto = 0,
                    coins = 0,
                    lastseen = ""
                }
                results2 = MySQL.query.await("SELECT * FROM `"..Config.DB.VehiclesTable.."` WHERE user_id = ?", {v.id})
                for _, v1 in pairs(results2) do
                    if results[k] == nil then
                        return
                    end
                    vehicles[#vehicles + 1] = {
                        citizenid = v.id,
                        firstname = v.name,
                        lastname = v.name2,
                        vehicle = v1.vehicle,
                    }
                end
            end
            return money, vehicles
        end,
        PlayerActions = {
            AddMoney = function(targetId, amount)
                local p = QBCore.Functions.GetPlayer(targetId)
                if p then
                    p.Functions.AddMoney("cash", amount, "Admin Action")
                end
            end,
            RemoveMoney = function(targetId, amount)
                local p = QBCore.Functions.GetPlayer(targetId)
                if p then
                    p.Functions.RemoveMoney("cash", amount, "Admin Action")
                end
            end,
            AddBank = function(targetId, amount)
                local p = QBCore.Functions.GetPlayer(targetId)
                if p then
                    p.Functions.AddMoney("bank", amount, "Admin Action")
                end
            end,
            RemoveBank = function(targetId, amount)
                local p = QBCore.Functions.GetPlayer(targetId)
                if p then
                    p.Functions.RemoveMoney("bank", amount, "Admin Action")
                end
            end,
        },
    }
end

-- CLIENT COMPATIBILITY LAYER
if (not IsDuplicityVersion()) then
    Compat = {
        OpenInventory = function(targetId) 
            TriggerServerEvent("ld-inventory:revistar", targetId, "otherplayer")
            if GetResourceState("ox_inventory") == "started" then
                if targetId then
                    exports.ox_inventory:forceOpenInventory(source, 'player', tonumber(targetId))
                end
            end
        end,
        UncuffSelf = function()
            TriggerEvent('police:client:GetCuffed')
        end,
        GetClosestObject = QBCore.Functions.GetClosestObject,
        GetClosestVehicle = QBCore.Functions.GetClosestVehicle,
        TriggerCallback = QBCore.Functions.TriggerCallback,
    }
end