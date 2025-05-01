function GetIdentifier(source)
    local identifiers = GetPlayerIdentifiers(source)
    local baseIdentifier = GlobalState['Basics']['Identifier'] or "steam"
    for _, identifier in ipairs(identifiers) do
        if string.find(identifier, baseIdentifier..":") then
            return identifier
        end
    end
end

function GetToken(source)
    local whitelist = IsWhitelisted(source)
    if whitelist == nil then
        local identifier = GetIdentifier(source)
        ExecuteSql("INSERT INTO `accounts` (`steam`,`identifier`) VALUES('','"..identifier.."');")
        local affected = ExecuteSql("SELECT LAST_INSERT_ID() AS id;")
        if #affected > 0 then
            return affected[1].id
        end
    else
        local rows = ExecuteSql("SELECT `id` FROM `accounts` WHERE `identifier` = '"..GetIdentifier(source).."'")
        if rows[1] then
            return rows[1].id
        end
    end
end

function IsWhitelisted(source)
    local rows = ExecuteSql("SELECT `whitelist` FROM `accounts` WHERE `identifier` = '"..GetIdentifier(source).."'")
	if rows[1] then
		return rows[1].whitelist
	end
end

function ExecuteSql(query)
    local IsBusy = true
    local result = nil
    if Config.Mysql == "oxmysql" then
        if MySQL == nil then
            exports.oxmysql:execute(query, function(data)
                result = data
                IsBusy = false
            end)
        else
            MySQL.query(query, {}, function(data)
                result = data
                IsBusy = false
            end)
        end
    elseif Config.Mysql == "ghmattimysql" then
        exports.ghmattimysql:execute(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    elseif Config.Mysql == "mysql-async" then
        MySQL.Async.fetchAll(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    end
    while IsBusy do
        Citizen.Wait(0)
    end
    return result
end

local function removeVehicles()
    local db = ExecuteSql('SELECT * FROM will_rent') or {}
    local time = os.time()
    for k,v in pairs(db) do
        if tonumber(v.time) <= time then
            ExecuteSql('DELETE FROM will_rent WHERE user_id = "'..v.user_id..'" AND vehicle = "'..v.vehicle..'"')
            ExecuteSql("DELETE FROM vrp_vehicles WHERE user_id = '"..v.user_id.."' AND vehicle = '"..v.vehicle.."'")
        end
    end
end

CreateThread(removeVehicles)

RegisterNetEvent("will_login:checkRegister")
AddEventHandler("will_login:checkRegister",function (source)
    local idf = GetIdentifier(source)
    local rst = ExecuteSql("SELECT * FROM `will_login` WHERE identifier = '"..idf.."'")
    if not rst or not rst[1] then
        TriggerClientEvent("will_login:LoginMenu",source)
    end
end)
