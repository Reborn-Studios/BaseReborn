local currentOriginalUserGroups = {}

RegisterNetEvent("AdminControl:showUserGroups")
AddEventHandler("AdminControl:showUserGroups",function(user_id, userGroups)
    local groups = ServerControl.getGroups()
    if groups then
        currentOriginalUserGroups = userGroups
        SetNuiFocus(true, true)
        SendNUIMessage({
            action = "openGroups",
            userId = user_id,
            groups = groups,
            userGroups = userGroups
        })
    end
end)

RegisterNUICallback("saveGroups", function(data, cb)
    SetNuiFocus(false, false)
    local user_id = data.userId
    local selectedGroups = data.selectedGroups -- { ["Admin"] = 1 }
    local groups = ServerControl.getGroups()
    if groups then
        local addGroups = {}
        local remGroups = {}
        local changed = false
        for _, Group in ipairs(groups) do
            local groupName = Group.groupName
            local wasInGroup = currentOriginalUserGroups[groupName] and currentOriginalUserGroups[groupName] == Group.level
            local isInGroup = selectedGroups[groupName] and selectedGroups[groupName] == Group.level
            if isInGroup and not wasInGroup then
                addGroups[groupName] = Group.level
                changed = true
            elseif not isInGroup and wasInGroup then
                remGroups[groupName] = Group.level
                changed = true
            end
        end
        if changed then
            TriggerServerEvent("AdminControl:setUserGroups", user_id, addGroups, remGroups)
        end
    end
    cb("ok")
end)

RegisterNUICallback("closeGroups", function(data, cb)
    SetNuiFocus(false, false)
    cb("ok")
end)

local AllGroups = GlobalState["AllGroups"] or {}

AddStateBagChangeHandler("AllGroups","",function (_,_,value)
    AllGroups = value
end)

local function editGroup(groupName)
    local Group = AllGroups[groupName]
    if Group then
        local perms = {}
        for k,v in pairs(Group) do
            if k ~= "_config" then
                table.insert(perms,v)
            end
        end
        local input = lib.inputDialog("Editar grupo ("..groupName..")",{
            {type = "input", label = "Grupo", default = groupName, disabled = true},
            {type = "input", label = "Titulo", default = Group._config and Group._config.title or groupName},
            {type = "input", label = "Tipo", default = Group._config and Group._config.gtype, description = "Tipos como: job/vip/staff (opcional)"},
            {type = "number", label = "Salário", default = Group._config and Group._config.salary, description = "(opcional)"},
            {type = "textarea", label = "Permissões", default = perms and table.concat(perms,",") or "", autosize = true, description = "Permissões separadas por virgula"}
        })
        if input then
            TriggerServerEvent("AdminControl:editGroup",{
                groupName = groupName,
                title = input[2],
                gtype = input[3] or nil,
                salary = input[4] and input[4] > 0 and input[4] or nil,
                perms = input[5]
            })
        end
    end
end

local function listPerms(GroupName,Hierarchy)
    local options = {}
    for Level,v in ipairs(Hierarchy) do
        table.insert(options,{
            title = v["Group"],
            description = v["Title"] or GroupName,
            onSelect = function()
                lib.registerContext({
                    id = 'admin_group_manage',
                    title = 'Hierarquia do grupo',
                    menu = 'admin_groups_manage',
                    arrow = true,
                    options = {
                        {
                            title = "Editar",
                            description = "Editar grupo",
                            icon = 'pen',
                            iconColor = 'yellow',
                            onSelect = function()
                                local input = lib.inputDialog("Editar grupo ("..v["Group"] or GroupName..")",{
                                    { type = "input", label = "Grupo", default = v["Group"] or GroupName, disabled = true },
                                    { type = "input", label = "Titulo", default = v["Title"] or GroupName },
                                    { type = "checkbox", label = "Lider?", checked = v["Leader"] },
                                    { type = "number", label = "Salário", default = v["Salary"] },
                                    { type = "textarea", label = "Permissões", default = v["Permission"] and table.concat(v["Permission"],",") or "", autosize = true, description = "Permissões separadas por virgula" }
                                })
                                if input then
                                    TriggerServerEvent("AdminControl:editGroupHierarchy",{
                                        groupName = GroupName,
                                        level = Level,
                                        group = input[1],
                                        title = input[2],
                                        leader = input[3] or nil,
                                        salary = input[4] and input[4] > 0 and input[4] or nil,
                                        perms = input[5]
                                    })
                                end
                            end
                        },
                        {
                            title = "Excluir",
                            description = "Excluir grupo",
                            icon = 'trash',
                            iconColor = 'red',
                            onSelect = function()
                                TriggerServerEvent("AdminControl:deleteGroupLevel",GroupName,Level)
                            end
                        }
                    }
                })
                lib.showContext('admin_group_manage')
            end
        })
    end
    lib.registerContext({
        id = 'admin_perms_list',
        title = 'Hierarquia do grupo: '..GroupName,
        menu = 'admin_groups_manage',
        arrow = true,
        options = options
    })
    lib.showContext('admin_perms_list')
end

local function listGroups()
    local options = {}
    for GroupName,Group in pairs(AllGroups) do
        table.insert(options,{
            title = GroupName,
            description = Group["Name"] or GroupName,
            onSelect = function()
                lib.registerContext({
                    id = 'admin_groups_manage',
                    title = 'Gerenciar Grupo',
                    menu = 'admin_groups_list',
                    arrow = true,
                    options = {
                        {
                            title = "Criar Grupo Hierarquico",
                            description = "Criar grupo com hierarquia",
                            icon = 'layer-group',
                            iconColor = 'blue',
                            onSelect = function()
                                local input = lib.inputDialog("Criar novo grupo hierarquico",{
                                    { type = "input", label = "Grupo", required = true, description = "Nome do grupo" },
                                    { type = "input", label = "Titulo", description = "Titulo do grupo" },
                                    { type = "checkbox", label = "Lider?", description = "Se é lider do grupo" },
                                    { type = "number", label = "Salário", description = "Salário do cargo" },
                                    { type = "textarea", label = "Permissões", autosize = true, description = "Permissões separadas por virgula" },
                                })
                                if input then
                                    TriggerServerEvent("AdminControl:createGroupHierarchy",{
                                        groupName = GroupName,
                                        group = input[1],
                                        title = input[2],
                                        leader = input[3] or nil,
                                        salary = input[4] and input[4] > 0 and input[4] or nil,
                                        perms = input[5]
                                    })
                                end
                            end
                        },
                        {
                            title = "Editar",
                            description = "Editar grupo e hierarquias",
                            icon = 'pen',
                            iconColor = 'yellow',
                            onSelect = function()
                                lib.registerContext({
                                    id = 'admin_group_manage',
                                    title = 'Gerenciar '..GroupName,
                                    menu = 'admin_groups_manage',
                                    arrow = true,
                                    options = {
                                        {
                                            title = "Nome/Tipo/Etc...",
                                            description = "Editar nome, tipo, qb/esx, outros",
                                            icon = 'pen',
                                            iconColor = 'yellow',
                                            onSelect = function()
                                                local input = lib.inputDialog("Editar grupo ("..GroupName..")",{
                                                    { type = "input", label = "Grupo", default = GroupName, disabled = true },
                                                    { type = "input", label = "Titulo", default = Group["Name"] or GroupName },
                                                    { type = "select", label = "Tipo", default = Group["Type"], description = "Tipos como: job/vip/staff", options = {
                                                        { label = "Trabalho/Org", value = "job" },
                                                        { label = "Trabalho secundário", value = "job2" },
                                                        { label = "Gangue (QBCore)", value = "gang" },
                                                        { label = "VIP", value = "vip" },
                                                        { label = "Staff", value = "staff" },
                                                        { label = "Nenhum", value = "none" },
                                                    } },
                                                    { type = "input", label = "Grupo QB/ESX", default = Group["QBESXGroup"], description = "Tipos como: police/ambulance/cardealer..." },
                                                    { type = "checkbox", label = "Blips no mapa?", checked = Group["Markers"] },
                                                    { type = "checkbox", label = "Entrar em serviço?", checked = Group["Service"] },
                                                    { type = "checkbox", label = "Utilizar painel de orgs?", checked = Group["OrgPanel"] },
                                                    { type = "textarea", label = "Permissões", default = Group["Permissions"] and table.concat(Group["Permissions"],",") or "", autosize = true, description = "Permissões separadas por virgula" },
                                                })
                                                if input then
                                                    TriggerServerEvent("AdminControl:editGroup",{
                                                        groupName = GroupName,
                                                        Name = input[2],
                                                        Type = input[3] or nil,
                                                        QBESXGroup = input[4],
                                                        Markers = input[5],
                                                        Service = input[6],
                                                        OrgPanel = input[7],
                                                        Permissions = input[8],
                                                    })
                                                end
                                            end
                                        },
                                        {
                                            title = "Hierarquia",
                                            description = "Ver todas as permissões",
                                            icon = 'eye',
                                            iconColor = 'purple',
                                            onSelect = function()
                                                listPerms(GroupName,Group["Hierarchy"])
                                            end
                                        }
                                    }
                                })
                                lib.showContext('admin_group_manage')
                            end
                        },
                        {
                            title = "Excluir",
                            description = "Excluir grupo inteiro",
                            icon = 'trash',
                            iconColor = 'red',
                            onSelect = function()
                                TriggerServerEvent("AdminControl:deleteGroup",GroupName)
                            end
                        }
                    }
                })
                lib.showContext('admin_groups_manage')
            end
        })
    end
    lib.registerContext({
        id = 'admin_groups_list',
        title = 'Listar Grupos',
        menu = 'admin_groups_control',
        arrow = true,
        options = options
    })
    lib.showContext('admin_groups_list')
end

local function createGroup()
    local input = lib.inputDialog("Criar novo grupo",{
        { type = "input", label = "Grupo", required = true },
        { type = "input", label = "Titulo" },
        { type = "select", label = "Tipo", description = "Tipo de grupo", options = {
            { label = "Trabalho/Org", value = "job" },
            { label = "Trabalho secundário", value = "job2" },
            { label = "Gangue (QBCore)", value = "gang" },
            { label = "VIP", value = "vip" },
            { label = "Staff", value = "staff" },
            { label = "Nenhum", value = "none" },
        } },
        { type = "input", label = "Grupo QB/ESX (Opcional)", description = "Tipos como: police/ambulance/cardealer..." },
        { type = "checkbox", label = "Blipar no mapa?", description = "Aparecer blips dos players setados no mapa" },
        { type = "checkbox", label = "Entrar em serviço?", description = "O grupo terá opção de sair e entrar de serviço" },
        { type = "checkbox", label = "Utilizar painel de orgs?" },
        { type = "textarea", label = "Permissões", autosize = true, description = "Permissões separadas por virgula" },
    })
    if input and input[1] then
        TriggerServerEvent("AdminControl:createGroup",{
            groupName = input[1],
            Name = input[2],
            Type = input[3] and input[3] ~= "none" and input[3] or nil,
            QBESXGroup = input[4],
            Markers = input[5],
            Service = input[6],
            OrgPanel = input[7],
            Permissions = input[8],
        })
        listGroups()
    end
end

RegisterNetEvent("AdminControl:openGroups")
AddEventHandler("AdminControl:openGroups",function()
    lib.registerContext({
        id = 'admin_groups_control',
        title = 'Controle dos Grupos',
        options = {
            {
                title = 'Criar novo grupo',
                description = 'Criar facção/org',
                icon = 'toolbox',
                iconColor = 'green',
                onSelect = createGroup
            },
            {
                title = "Listar Grupos",
                description = "Listar todos os grupos criados",
                icon = 'list',
                iconColor = 'blue',
                onSelect = listGroups
            }
        }
    })
    lib.showContext('admin_groups_control')
end)
