RegisterNetEvent("AdminControl:showUserGroups")
AddEventHandler("AdminControl:showUserGroups",function(user_id, userGroups)
    local groups = ServerControl.getGroups()
    if groups then
        local options = {}
        for _,Group in ipairs(groups) do
            table.insert(options,{
                type = "checkbox", label = Group.label, value = Group.value, checked = userGroups[Group.groupName] and true
            })
        end
        local input = lib.inputDialog("Controle de grupos ("..user_id..")", options)
        if input then
            local addGroups = {}
            local remGroups = {}
            local changed = false
            for k,bool in ipairs(input) do
                local groupName = groups[k].groupName
                if groupName then
                    if bool then
                        if not userGroups[groupName] then
                            addGroups[groupName] = true
                            changed = true
                        end
                    else
                        if userGroups[groupName] then
                            remGroups[groupName] = true
                            changed = true
                        end
                    end
                end
            end
            if changed then
                TriggerServerEvent("AdminControl:setUserGroups",user_id,addGroups,remGroups)
            end
        end
    end
end)

local AllGroups = GlobalState["AllGroups"] or {}

AddStateBagChangeHandler("AllGroups","",function (_,_,value)
    AllGroups = value
end)

local function createGroup()
    local input = lib.inputDialog("Criar novo grupo",{
        {type = "input", label = "Grupo", required = true},
        {type = "input", label = "Titulo"},
        {type = "input", label = "Tipo", default = "job", description = "Tipos como: job/vip/staff (opcional)"},
        {type = "number", label = "Salário", description = "(opcional)"},
        {type = "input", label = "Grade", description = "Utilizado em QB/ESX (opcional)"},
        {type = "textarea", label = "Permissões", default = "sem.permissao,no.permissao", autosize = true, description = "Permissões separadas por virgula"}
    })
    if input and input[1] then
        TriggerServerEvent("AdminControl:createGroup",{
            groupName = input[1],
            title = input[2],
            gtype = input[3] or nil,
            salary = input[4] and input[4] > 0 and input[4] or nil,
            grade = input[5] or nil,
            perms = input[6]
        })
    end
end

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
            {type = "input", label = "Grade", default = Group._config and Group._config.grade, description = "Utilizado em QB/ESX (opcional)"},
            {type = "textarea", label = "Permissões", default = perms and table.concat(perms,",") or "", autosize = true, description = "Permissões separadas por virgula"}
        })
        if input then
            TriggerServerEvent("AdminControl:editGroup",{
                groupName = groupName,
                title = input[2],
                gtype = input[3] or nil,
                salary = input[4] and input[4] > 0 and input[4] or nil,
                grade = input[5] or nil,
                perms = input[6]
            })
        end
    end
end

local function listGroups()
    local options = {}
    for GroupName,Group in pairs(AllGroups) do
        table.insert(options,{
            title = GroupName,
            description = Group._config and Group._config.title or GroupName,
            onSelect = function()
                lib.registerContext({
                    id = 'admin_group_manage',
                    title = 'Gerenciar Grupo',
                    menu = 'admin_groups_list',
                    arrow = true,
                    options = {
                        {
                            title = "Editar",
                            description = "Editar grupo",
                            icon = 'pen',
                            iconColor = 'yellow',
                            onSelect = function()
                                editGroup(GroupName)
                            end
                        },
                        {
                            title = "Excluir",
                            description = "Excluir grupo",
                            icon = 'trash',
                            iconColor = 'red',
                            onSelect = function()
                                TriggerServerEvent("AdminControl:deleteGroup",GroupName)
                            end
                        }
                    }
                })
                lib.showContext('admin_group_manage')
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
