-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Proxy = module("vrp","lib/Proxy") or {}
local Tunnel = module("vrp","lib/Tunnel") or {}
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("skinweapon",Creative)
vSKINWEAPON = Tunnel.getInterface("skinweapon")
-----------------------------------------------------------------------------------------------------------------------------------------
-- USERSKINS
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.Gemstone()
    local Source = source
    local Passport = vRP.Passport(Source)
    return vRP.getGmsId(Passport)
end

function Creative.UserSkins()
    local Source = source
    local Passport = vRP.Passport(Source)

    if Passport then
        local SkinsData = vRP.UserData(Passport, "Skins") or {}

        if not SkinsData["List"] then SkinsData["List"] = {} end

        return SkinsData
    end

    return {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BUYSKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.BuySkin(Data)
    local source = source
    local Passport = vRP.Passport(source)
    local Identity = vRP.Identity(Passport)
    local Account = vRP.Account(Identity["License"])
    if Passport and Account then
        if vRP.getGmsId(Passport) >= Data["price"] then
            local SkinsData = vRP.UserData(Passport, "Skins")

            if not SkinsData then
                SkinsData = { List = {} }
            elseif not SkinsData["List"] then
                SkinsData["List"] = {}
            end

            local Price = Data["price"]

            for k,v in pairs(SkinsData["List"]) do
                if v == Data["id"] then
                    TriggerClientEvent("Notify", source, "negado", "Você já possui esta skin.", 15000)

                    return false
                end
            end

            if vRP.Request(source,"Você realmente deseja comprar a skin de arma <b>"..Data["name"].."</b> para a arma <b>"..Data["description"].."</b>?") then
                if vRP.PaymentGems(Passport, Price) then
                    table.insert(SkinsData["List"], Data["id"])
                    vRP.setUData(Passport, "Skins", json.encode(SkinsData))
                    TriggerClientEvent("Notify", source, "sucesso", "Skin adquirida com sucesso.", 5000)
                else
                    TriggerClientEvent("Notify", source, "negado", "Você não possui gemas o suficiente.", 5000)
                end
            end

            return true
        end
    end

    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLESKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ToggleSkin(Weapon, Component)
    local Source = source
    local Passport = vRP.Passport(Source)

    if Passport then
        if Weapon then
            local SkinsData = vRP.UserData(Passport, "Skins")

            SkinsData[Weapon] = Component
            vRP.setUData(Passport, "Skins", json.encode(SkinsData))
            CheckToEquip(Source, Weapon)
            return true
        end
    end

    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFERSKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.TransferSkin(Target, Number, Weapon, Component)
    local source = source
    local Passport = vRP.Passport(source)
    local OtherPassport = parseInt(Target)
    local OtherSource = vRP.Source(OtherPassport)
    local Name = nil

    if Passport then
        if OtherSource and Number and Weapon and Component then
            local SkinsData = vRP.UserData(Passport, "Skins") or {}
            local TargetSkinsData = vRP.UserData(OtherPassport, "Skins") or {}

            if not TargetSkinsData["List"] then
                TargetSkinsData["List"] = {}
            end

            for k, v in pairs(vSKINWEAPON.Weapons(source)) do
                if v["weapon"] == Weapon and v["component"] == Component then
                    Name = v["name"]
                end
            end

            if vRP.Request(source,"Você realmente deseja transferir a skin de arma <b>"..Name.."</b> para o jogador <b>"..vRP.FullName(OtherPassport).."</b>?") then
                for k,v in pairs(TargetSkinsData["List"]) do
                    if v == Number then
                        TriggerClientEvent("Notify", source, "negado", "O jogador já possui esta Skin.", 5000)

                        return false
                    end
                end

                for k,v in pairs(SkinsData["List"]) do
                    if v == Number then
                        table.remove(SkinsData["List"], k)
                    end
                end

                table.insert(TargetSkinsData["List"], Number)

                vRP.setUData(Target, "Skins", json.encode(TargetSkinsData))
                vRP.setUData(Passport, "Skins", json.encode(SkinsData))
                TriggerClientEvent("Notify", source, "sucesso", "Você transferiu a skin de arma <b>"..Name.."</b> para o jogador <b>"..vRP.FullName(OtherPassport).."</b>", 5000)
                TriggerClientEvent("Notify", OtherSource, "sucesso", "Você recebeu a skin de arma <b>"..Name.."</b> do jogador <b>"..vRP.FullName(Passport).."</b>", 5000)

                return true
            end
        elseif not OtherSource then
            TriggerClientEvent("Notify", source, "negado", "O jogador não existe ou ele não esta na cidade.", 5000)

            return false
        end
    end

    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ACTIVESKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.ActiveSkin(Weapon, Component)
    local source = source
    local Passport = vRP.Passport(source)

    if Passport then
        local SkinsData = vRP.UserData(Passport, "Skins")
        local Name = nil
        SkinsData[Weapon] = Component

        if not SkinsData then
            SkinsData = { List = {} }
        elseif not SkinsData["List"] then
            SkinsData["List"] = {}
        end

        vRP.setUData(Passport, "Skins", json.encode(SkinsData))

        for k, v in pairs(vSKINWEAPON.Weapons(source)) do
            if v["weapon"] == Weapon and v["component"] == Component then
                Name = v["name"]
            end
        end
        if Name then
            CheckToEquip(source, Weapon)
            TriggerClientEvent("Notify", source, "sucesso", "A skin <b>"..Name.."</b> foi ativada", 5000)
            return true
        end
    end
    return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INACTIVESKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.InactiveSkin(Weapon, Component)
    local source = source
    local Passport = vRP.Passport(source)
    if Passport then
        local SkinsData = vRP.UserData(Passport, "Skins")
        local Name = nil

        if not SkinsData then
            SkinsData = { List = {} }
        elseif not SkinsData["List"] then
            SkinsData["List"] = {}
        end

        SkinsData[Weapon] = nil

        vRP.setUData(Passport, "Skins", json.encode(SkinsData))

        for k, v in pairs(vSKINWEAPON.Weapons(source)) do
            if v["weapon"] == Weapon and v["component"] == Component then
                Name = v["name"]
            end
        end
        if Name then
            TriggerClientEvent("Notify", source, "sucesso", "A skin <b>"..Name.."</b> foi desativada", 5000)
            local Ped = GetPlayerPed(source)
            if GetHashKey(Weapon) == GetCurrentPedWeapon(Ped) then
                RemoveWeaponComponentFromPed(Ped,Weapon,Component)
            end
            return true
        end
    end
    return false
end

function CheckToEquip(Source, Weapon)
    local Passport = vRP.Passport(Source)
    if Passport then
        local SkinsData = vRP.UserData(Passport, "Skins") or {}
        if SkinsData[Weapon] then
            GiveWeaponComponentToPed(GetPlayerPed(Source),Weapon,SkinsData[Weapon])
        end
    end
end

RegisterNetEvent("skinweapon:checkToEquip")
AddEventHandler("skinweapon:checkToEquip",function (Weapon)
    local Source = source
    CheckToEquip(Source, Weapon)
end)
