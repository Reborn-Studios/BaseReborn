areaBlip = {}

function createAreaBlip(x,y,z,color,blink,name,radius)
    if areaBlip[name] then
        RemoveBlip(areaBlip[name])
        areaBlip[name] = nil
    end

    if name then
        local radius = parseInt(radius) + 0.0 or 150.0
        areaBlip[name] = AddBlipForRadius(x,y,z,radius)
        SetBlipColour(areaBlip[name],color)
        SetBlipAsShortRange(areaBlip[name],true)
        -- SetBlipHiddenOnLegend(areaBlip[name],true)
        SetBlipAlpha(areaBlip[name],150)
        SetBlipFlashesAlternate(areaBlip[name],blink)

        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(name)
        EndTextCommandSetBlipName(areaBlip[name])
    end
end

local function repeats(s,c)
    local _,n = s:gsub(c,"")
    return n
end

function DrawText3D(x,y,z, name,lider,proxima,pode)
    local _,_x,_y=World3dToScreen2d(x,y,z)

    SetTextScale(0.28, 0.28)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)

	local text = ""
	if pode ~= "" then
		text = "\n~g~LOCAL DE DOMINAÇÃO\n~w~Nome: ~g~".."~a~".."\n~w~Líder atual: ~g~".."~a~".."\n~w~Local disponível para ".."~a~".."\n~a~"
	else
		text = "\n~g~LOCAL DE DOMINAÇÃO\n~w~Nome: ~g~".."~a~".."\n~w~Líder atual: ~g~".."~a~".."\n~w~Disponível em: ~g~".."~a~"
	end
    AddTextEntry("dominfo", text)
	SetTextEntry("dominfo")
	AddTextComponentString(name)
	if lider == nil then lider = "----" end
	AddTextComponentString(lider)
	AddTextComponentString(proxima)
	AddTextComponentString(pode)

    SetTextCentre(true)
    DrawText(_x,_y)
    local factor = (string.len(text) + 25) / (repeats(text,"\n") * 290)
	local factor2 = (repeats(text,"\n") * 0.0130) -- antes 0.0140
	local factor3 = (repeats(text,"\n") * 0.023)
    DrawRect(_x,_y+factor2, 0.002+ factor, factor3, 41, 11, 41, 68)
end
