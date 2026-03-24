-----##########################################################-----
--###          FILE CONTROL
-----##########################################################-----

local CacheFiles = {}

function GetControlFile(file)
    if CacheFiles[file] then
        return CacheFiles[file]
    end
    local data = LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json')
    if data then
        CacheFiles[file] = json.decode(data)
        return CacheFiles[file]
    end
    return json.decode(LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json')) or {}
end

exports("GetControlFile",GetControlFile)

function SaveAllFile(file,result)
    CacheFiles[file] = result
    SaveResourceFile(GetCurrentResourceName(), 'data/'..file..'.json', json.encode(result, { indent = true }), -1)
end

function SaveControlFile(file,index,result)
    local data = GetControlFile(file)
    if data and data[index] == nil then
        data[index] = result
        CacheFiles[file] = data
        SaveResourceFile(GetCurrentResourceName(), 'data/'..file..'.json', json.encode(data, { indent = true }), -1)
    end
end

function EditControlFile(file,index,result)
    local data = GetControlFile(file)
    if data and data[index] then
        data[index] = result
        CacheFiles[file] = data
        SaveResourceFile(GetCurrentResourceName(), 'data/'..file..'.json', json.encode(data, { indent = true }), -1)
    end
end

function RemoveControlFile(file,index)
    local data = json.decode(LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json'))
    if data and data[index] ~= nil then
        if table.type(data) == "array" then
            table.remove(data,index)
        else
            data[index] = nil
        end
        CacheFiles[file] = data
        SaveResourceFile(GetCurrentResourceName(), 'data/'..file..'.json', json.encode(data, { indent = true }), -1)
    end
end
-----##########################################################-----
--###          VRP FUNCTIONS
-----##########################################################-----

Server = {}
local groups = module('vrp',"config/Groups") or {}
RegisterNetEvent("Reborn:reloadInfos",function() groups = module('vrp',"config/Groups",true) or {} end)
Webhooks = module("config/webhooks") or {}
ClientControl = Tunnel.getInterface("AdminControl")
Tunnel.bindInterface("AdminControl", Server)

vRP.prepare("AdminControl/get_all_characters","SELECT * FROM characters GROUP BY identifier")

local function openMenu(source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"admin.permissao") then
        ClientControl.openMainMenu(source)
    end
end

RegisterServerEvent("AdminControl:openMenu")
AddEventHandler("AdminControl:openMenu",function()
    local source = source
    openMenu(source)
end)

exports("openMenu",openMenu)
RegisterCommand("adm2", openMenu)
RegisterCommand("gerenciar", openMenu)

function GetAllGroups()
    local formattedGroups = {}
    for group,perms in pairs(groups) do
        if not group:find("Paisana") and group ~= "Owner" then
            local GroupInfo = vRP.getJobFromGroup(group)
            table.insert(formattedGroups,{
                id = #formattedGroups,
                label = vRP.getGroupTitle(group),
                value = json.encode(GroupInfo),
                groupName = group
            })
        end
    end
    table.sort(formattedGroups,function (a,b)
        return a.label < b.label
    end)
    return formattedGroups
end

Server.getGroups = GetAllGroups

function Server.GetControlFile(file)
    return GetControlFile(file)
end

function Server.getLicenses()
    local options = {}
    local r = async()
    local consult = vRP.query("AdminControl/get_all_characters")
    for i=1,#consult do
        table.insert(options,{
            label = consult[i].id.." - "..consult[i].name.." "..consult[i].name2,
            value = consult[i].identifier,
        })
    end
    table.sort(options,function (a,b)
        return a.label < b.label
    end)
    r(options)
    return r:wait()
end