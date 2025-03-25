-----------------------------------
--########## Funções vRP ##########
-----------------------------------

Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

function getUserId(source)
    return vRP.getUserId(source) or vRP.Passport(source)
end

function getInventoryItemAmount(user_id,item)
    if vRP.getInventoryItemAmount then
        return vRP.getInventoryItemAmount(user_id,item)
    elseif vRP.InventoryItemAmount then
        return vRP.InventoryItemAmount(user_id,item)[1]
    end
end

function tryGetInventoryItem(user_id,item,amount)
    if vRP.tryGetInventoryItem then
        return vRP.tryGetInventoryItem(user_id,item,amount)
    elseif vRP.TakeItem then
        return vRP.TakeItem(user_id,item,amount)
    end
end

function getUserGroup(user_id)
    return vRP.getUserGroupByType(user_id,"job") or "None"
end

function hasPermission(user_id, perm)
    return vRP.hasPermission(user_id, perm) or vRP.HasPermission(user_id, perm)
end

function prepare(name, query)
    if vRP.prepare then
        vRP.prepare(name, query)
    elseif vRP.Prepare then
        vRP.Prepare(name, query)
    end
end

function query(name, data)
    if vRP.query then
        return vRP.query(name, data)
    elseif vRP.Query then
        return vRP.Query(name, data)
    end
end

function execute(name, data)
    if vRP.execute then
        vRP.execute(name, data)
    else
        vRP.query(name, data)
    end
end

-----------------------------------
--##########   Prepares  ##########
-----------------------------------

CreateThread(function ()
    prepare("vRP/insert_spray","INSERT INTO will_sprays(`group`, `x`, `y`, `z`, `rx`, `ry`, `rz`, `scale`, `text`, `font`, `color`, `interior`) VALUES(@group, @x, @y, @z, @rx, @ry, @rz, @scale, @text, @font, @color, @interior)")
    prepare("vRP/remove_sprays","DELETE FROM will_sprays WHERE DATEDIFF(NOW(), created_at) >= @days")
    prepare("vRP/delete_spray","DELETE FROM will_sprays WHERE id = @id LIMIT 1")
    prepare("vRP/get_sprays","SELECT * FROM will_sprays")
    prepare("vRP/create_grafite_table",[[
        CREATE TABLE IF NOT EXISTS `will_sprays` (
            `id` INT(11) NOT NULL AUTO_INCREMENT,
            `group` VARCHAR(32) NOT NULL COLLATE 'utf8_general_ci',
            `x` FLOAT(8,4) NOT NULL,
            `y` FLOAT(8,4) NOT NULL,
            `z` FLOAT(8,4) NOT NULL,
            `rx` FLOAT(8,4) NOT NULL,
            `ry` FLOAT(8,4) NOT NULL,
            `rz` FLOAT(8,4) NOT NULL,
            `scale` FLOAT(8,4) NOT NULL,
            `text` VARCHAR(32) NOT NULL COLLATE 'utf8_general_ci',
            `font` VARCHAR(32) NOT NULL COLLATE 'utf8_general_ci',
            `color` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8_general_ci',
            `interior` INT(3) NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
            PRIMARY KEY (`id`) USING BTREE
        ) COLLATE='utf8_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;
    ]])
    prepare("vRP/set_spray_group",[[
        ALTER TABLE `will_sprays` ADD COLUMN IF NOT EXISTS `group` VARCHAR(32) NOT NULL DEFAULT '' COLLATE 'utf8_general_ci' AFTER `id`;
    ]])
end)

-----------------------------------
--##########   Webhook  ##########
-----------------------------------

function SendDiscord(webhook, color, name, title, text, text2)
    local date = os.date("%H:%M:%S - %d/%m/%Y")
    local logo = 'https://cdn.discordapp.com/attachments/796797155100327976/875550178264903730/unknown.png'

    if title == nil or title == '' then
        return nil
    end

    local embeds = {
        {
            ["title"] = title,
            ["type"] = name,

            ["thumbnail"] = {
            ["url"] = logo
            }, 

            ["fields"] = {
                { 
                    ["name"] = text,
                    ["value"] = text2
                }
            },

            ["footer"] = { 
                ["text"] = "Will - "..date,
                ["icon_url"] = logo
            },

            ["color"] =  color

        }
    }
    PerformHttpRequest(webhook, function(Error, Content, Hand) end, 'POST', json.encode({username = name, embeds = embeds, avatar_url = logo}), { ['Content-Type'] = 'application/json' })
end