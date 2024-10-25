---------------------------
-- ## DB - CONFIG
---------------------------
local function tableConcat(self,t2)
    for k,v in next,t2 do
        self[#self+1] = v
    end
    return self
end

local function blob2string(blob)
    for i,c in pairs(blob) do
        blob[i] = string.char(c)
    end
    return tableConcat(blob)
end

local queries = {}
local driver = exports.oxmysql

local function on_init(cfg)
    return driver ~= nil
end

local function on_prepare(name, _query)
    local query = checkQuery(_query)
    queries[name] = query
end

function string:split(sep)
    if sep == nil then
     	sep = "%s"
    end
    local t={}
    for str in self:gmatch("([^"..sep.."]+)") do
        table.insert(t, str)
    end
    return t
end

function string:last(needle)
    local i=self:match(".*"..needle.."()")
    if i==nil then return 0 else return i-1 end
end

local function split(inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t={}
    for str in inputstr:gmatch("([^"..sep.."]+)") do
        table.insert(t, str)
    end
    return t
end

local function on_query(name, params, mode)
    local query = queries[name]
    if type(query) ~= 'string' then
        local prepares = { "update", "select", "delete", "insert",'truncate', 'alter' }
        local w = split(name, ' ')
        for k,v in pairs(prepares) do
            if v:upper() == w[1] or v:upper() == w[2] then
                query = checkQuery(name)
            end
        end
        if not query then
            print('^1Prepare inexistent ('..tostring(name)..').^0')
            return
        end
    end
    local _params = {_ = true}
    for k,v in pairs(params) do
        _params[k] = v
    end
    local r = async()
    if mode == "execute" then
        local condition = query:sub(0,query:last('IF;'))
        local splited = {}
        if condition:len() > 0 then 
            table.insert(splited, condition)
        end
        tableConcat(splited or {}, query:sub(query:last('IF;') + 1):split(';') or {})
        local responses = {}
        for k,v in next, splited do
            if type(v) ~= 'string' or not v:match("%w") then goto continue end 
            local p = async()
            driver:execute(v, _params, function(data)
                local data = data or {}
                p(data.affectedRows or 0)
            end)
            table.insert(responses, p:wait())
            ::continue::
        end
        r(table.unpack(responses))
    elseif mode == "scalar" then
        driver:scalar(query, _params, function(scalar)
            r(scalar)
        end)
    else
        local condition = query:sub(0,query:last('IF;'))
        local splited = {}
        if condition:len() > 0 then
            table.insert(splited, condition)
        end
        tableConcat(splited or {}, query:sub(query:last('IF;') + 1):split(';') or {})
        local responses = {}
        local lastInsert = {}
        for k,v in next, splited do
            if type(v) ~= 'string' or not v:match("%w") then goto continue end
            local p = async()
            local s,l = v:lower():find('last_insert_id()')
            if s and l then 
                v = v:gsub(v:sub(s,l).."%(%)",tostring(lastInsert[k-1]))
            end
            driver:execute(v, _params, function(rows)
                local select = true
                for _,row in pairs(rows) do
                    if type(row) == 'table' then
                        for k,v in pairs(row) do
                            if type(v) == "table" then
                                row[k] = blob2string(v)
                            end
                        end
                    else
                        select = not select
                        break
                    end
                end
                if select then
                    p(rows)
                else
                    lastInsert[k] = rows.insertId
                    p(rows.affectedRows or 0)
                end
            end)
            table.insert(responses, p:wait())
            ::continue::
        end
        r(table.unpack(responses))
    end
    return r:wait()
end

async(function()
    vRP.registerDBDriver("oxmysql", on_init, on_prepare, on_query)
end)
