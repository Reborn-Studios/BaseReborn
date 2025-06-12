-----##########################################################-----
--###          FILE CONTROL
-----##########################################################-----

function GetControlFile(file)
    return json.decode(LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json')) or {}
end

function SaveControlFile(file,index,result)
    local data = json.decode(LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json'))
    if data and data[index] == nil then
        data[index] = result
        SaveResourceFile(GetCurrentResourceName(), 'data/'..file..'.json', json.encode(data, { indent = true }), -1)
    end
end

function EditControlFile(file,index,result)
    local data = json.decode(LoadResourceFile(GetCurrentResourceName(), 'data/'..file..'.json'))
    if data and data[index] then
        data[index] = result
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
