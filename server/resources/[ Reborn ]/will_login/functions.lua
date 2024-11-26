function GetIdentifier(source)
    local identifiers = GetPlayerIdentifiers(source)
    for _, identifier in ipairs(identifiers) do
        if string.find(identifier, "steam:") then
            return identifier
        end
    end
end

function GetToken(source)
    local whitelist = IsWhitelisted(source)
    if whitelist == nil then
        local identifier = GetIdentifier(source)
        ExecuteSql("INSERT INTO `vrp_infos` (`steam`) VALUES('"..identifier.."');")
        local affected = ExecuteSql("SELECT LAST_INSERT_ID() AS id;")
        if #affected > 0 then
            return affected[1].id
        end
    else
        local rows = ExecuteSql("SELECT `id` FROM `vrp_infos` WHERE `steam` = '"..GetIdentifier(source).."'")
        if rows[1] then
            return rows[1].id
        end
    end
end

function IsWhitelisted(source)
    local rows = ExecuteSql("SELECT `whitelist` FROM `vrp_infos` WHERE `steam` = '"..GetIdentifier(source).."'")
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