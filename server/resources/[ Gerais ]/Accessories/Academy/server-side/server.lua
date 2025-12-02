Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

RegisterNetEvent("Academy:upgradeWeight")
AddEventHandler("Academy:upgradeWeight", function()
    local source = source
    local user_id = vRP.getUserId(source)
    local backpack = vRP.getBackpack(user_id)
    if backpack == nil then return end
    if backpack >= AcademyConfig.maxWeight then
        TriggerClientEvent("Notify",source,"negado","Você já possui o peso máximo.",5000)
        return
    end
    local newBackpack = backpack + AcademyConfig.increaseWeight
    vRP.setBackpack(user_id, newBackpack)
    if GetResourceState("ox_inventory") == "started" then
        exports.ox_inventory:SetMaxWeight(source, newBackpack * 1000)
    end
    TriggerClientEvent("Notify",source,"sucesso","Parabens! Seu peso aumentou para "..newBackpack.."kg",5000)
end)
