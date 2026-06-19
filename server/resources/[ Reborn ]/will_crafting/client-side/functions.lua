RegisterCommand(Config.MenuCommand, function()
    TriggerEvent("will_crafting:EditMenu")
end)

function GetBaseItems()
    local items = {}
    for k, v in pairs(GlobalState["RebornConfig"]["items"]) do
        items[#items + 1] = {
            value = k,
            label = string.format('%s (%s)', v.name, k)
        }
    end
    return items
end

function Progress(message, duration, type)
    if Config.OxProgress then
        if type == 'circle' then
            return lib.progressCircle({
                duration = duration * 1000,
                label = message,
                position = 'bottom',
                useWhileDead = false,
                canCancel = true,
                disable = {
                    car = true,
                    move = true,
                    combat = true,
                    mouse = false
                },
            })
        elseif type == 'default' then
            return lib.progressBar({
                duration = duration * 1000,
                label = message,
                useWhileDead = false,
                canCancel = true,
                disable = {
                    car = true,
                    move = true,
                    combat = true,
                    mouse = false
                },
            })
        end
    end
end

BlipCreation = function(v, g)
    local blip = AddBlipForCoord(g.x, g.y, g.z)
    SetBlipSprite(blip, v.sprite)
    SetBlipScale(blip, v.scale)
    SetBlipColour(blip, v.colour)
    SetBlipAsShortRange(blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentSubstringPlayerName(tostring(v.blip_label))
    EndTextCommandSetBlipName(blip)
    Insert(Blips, blip)
end
