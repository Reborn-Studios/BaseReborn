local Tools = module("vrp","lib/Tools") or {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDBLIPS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.addBlips(x,y,z,sprite,color,text,scale,route)
	local blip = AddBlipForCoord(x,y,z)
	SetBlipSprite(blip,sprite)
	SetBlipAsShortRange(blip,true)
	SetBlipColour(blip,color)
	SetBlipScale(blip,scale)
	if route then
		SetBlipRoute(blip,true)
	end
	if text then
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString(text)
		EndTextCommandSetBlipName(blip)
	end
	return blip
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDBLIPSALPHA
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.addBlipsAlpha(x,y,z,color)
	local blip = AddBlipForRadius(x,y,z,100.0)
	SetBlipHighDetail(blip,true)
	SetBlipColour(blip,color)
	SetBlipAlpha(blip,150)
	SetBlipAsShortRange(blip,true)
	return blip
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEBLIP
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.removeBlips(id)
	if DoesBlipExist(id) then
		RemoveBlip(id)
	end
end
----------------------------------------------------------------------------------------------------------------------------------------
-- marcação no mapa
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.addBlip(x,y,z,idtype,idcolor,text,scale,route)
	local blip = AddBlipForCoord(x,y,z)
	SetBlipSprite(blip,idtype)
	SetBlipAsShortRange(blip,true)
	SetBlipColour(blip,idcolor)
	SetBlipScale(blip,scale)

	if route then
		SetBlipRoute(blip,true)
	end

	if text then
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString(text)
		EndTextCommandSetBlipName(blip)
	end
	return blip
end

function tvRP.removeBlip(id)
	RemoveBlip(id)
end

function tvRP.setGPS(x,y)
	SetNewWaypoint(x+0.0001,y+0.0001)
end

function tvRP.getWaypoint()
    local waypoint = GetFirstBlipInfoId(8)
    if DoesBlipExist(waypoint) then
        return true,waypoint
    else
        return false
    end
end

local markers = {}
local marker_ids = Tools.newIDGenerator()
local named_markers = {}

function tvRP.addMarker(m,x,y,z,sx,sy,sz,r,g,b,a,visible_distance)
	local marker = { m = m, x = x, y = y, z = z, sx = sx, sy = sy, sz = sz, r = r, g = g, b = b, a = a, visible_distance = visible_distance }

	if marker.sx == nil then marker.sx = 2.0 end
	if marker.sy == nil then marker.sy = 2.0 end
	if marker.sz == nil then marker.sz = 0.7 end

	if marker.r == nil then marker.r = 0 end
	if marker.g == nil then marker.g = 155 end
	if marker.b == nil then marker.b = 255 end
	if marker.a == nil then marker.a = 200 end

	marker.x = marker.x+0.001
	marker.y = marker.y+0.001
	marker.z = marker.z+0.001
	marker.sx = marker.sx+0.001
	marker.sy = marker.sy+0.001
	marker.sz = marker.sz+0.001

	if marker.visible_distance == nil then marker.visible_distance = 150 end

	local id = marker_ids:gen()
	markers[id] = marker

	return id
end

function tvRP.removeMarker(id)
	if markers[id] then
		markers[id] = nil
		marker_ids:free(id)
	end
end

function tvRP.setNamedMarker(name,x,y,z,sx,sy,sz,r,g,b,a,visible_distance)
	tvRP.removeNamedMarker(name)
	named_markers[name] = tvRP.addMarker(x,y,z,sx,sy,sz,r,g,b,a,visible_distance)
	return named_markers[name]
end

function tvRP.removeNamedMarker(name)
	if named_markers[name] then
		tvRP.removeMarker(named_markers[name])
		named_markers[name] = nil
	end
end

CreateThread(function()
	while true do
		local timeDistance = 3000
		for k,v in pairs(markers) do
			local px,py,pz = tvRP.getPositions()
			if GetDistanceBetweenCoords(v.x,v.y,v.z,px,py,pz,true) <= v.visible_distance then
				timeDistance = 4
				DrawMarker(v.m,v.x,v.y,v.z,0,0,0,0,0,0,v.sx,v.sy,v.sz,v.r,v.g,v.b,v.a,false,false,0,false,"","",false)
			end
		end
		Wait(timeDistance)
	end
end)

local areas = {}
function tvRP.setArea(name,x,y,z,radius,height)
	local area = { x = x+0.001, y = y+0.001, z = z+0.001, radius = radius, height = height }
	if area.height == nil then area.height = 6 end
	areas[name] = area
end

function tvRP.removeArea(name)
	if areas[name] then
		areas[name] = nil
	end
end
