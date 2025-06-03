SERVER = IsDuplicityVersion()
CLIENT = not SERVER

function table.maxn(t)
	local max = 0
	for k,v in pairs(t) do
		local n = tonumber(k)
		if n and n > max then max = n end
	end
	return max
end

local modules = {}
function module(rsc,path,refresh)
	if path == nil then
		path = rsc
		rsc = "vrp"
	end

	local key = rsc..path
	local module = modules[key]
	if module and not refresh then
		return module
	else
		local oldPath = path
		if oldPath == "cfg/groups" then
			path = "config/groups"
		end
		local code = LoadResourceFile(rsc,path..".lua")
		if code then
			local f,err = load(code, rsc.."/"..path..".lua")
			if f then
				local ok,res = xpcall(f,debug.traceback)
				if ok then
					if oldPath == "cfg/groups" then
						res = { groups = res }
					end
					modules[key] = res
					return res
				else
					error("error loading module "..rsc.."/"..path..":"..res)
				end
			else
				error("error parsing module "..rsc.."/"..path..":"..debug.traceback(err))
			end
		else
			error("resource file "..rsc.."/"..path..".lua not found")
		end
	end
end

local function wait(self)
	local rets = Citizen.Await(self.p)
	if not rets then
		rets = self.r 
	end
	return table.unpack(rets,1,table.maxn(rets))
end

local function areturn(self,...)
	self.r = {...}
	self.p:resolve(self.r)
end

function async(func)
	if func then
		Citizen.CreateThreadNow(func)
	else
		return setmetatable({ wait = wait, p = promise.new() }, { __call = areturn })
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PARSEINT
-----------------------------------------------------------------------------------------------------------------------------------------
function parseInt(v)
	local Number = tonumber(v)
	if Number == nil then
		return 0
	else
		return math.floor(Number)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SANITIZESTRING
-----------------------------------------------------------------------------------------------------------------------------------------
local sanitize_tmp = {}
function sanitizeString(str,strchars,allow_policy)
	local r = ""
	local chars = sanitize_tmp[strchars]
	if chars == nil then
		chars = {}
		local size = string.len(strchars)
		for i = 1,size do
			local char = string.sub(strchars,i,i)
			chars[char] = true
		end
		sanitize_tmp[strchars] = chars
	end

	size = string.len(str)
	for i = 1,size do
		local char = string.sub(str,i,i)
		if (allow_policy and chars[char]) or (not allow_policy and not chars[char]) then
			r = r..char
		end
	end
	return r
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- SPLITSTRING
-----------------------------------------------------------------------------------------------------------------------------------------
function splitString(str,symbol)
	local number = 1
	local tableResult = {}

	if symbol == nil then
		symbol = "-"
	end

	for str in string.gmatch(str,"([^"..symbol.."]+)") do
		tableResult[number] = str
		number = number + 1
	end

	return tableResult
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MATHLEGTH
-----------------------------------------------------------------------------------------------------------------------------------------
function mathLegth(n)
	return math.ceil(n * 100) / 100
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PARSEFORMAT
-----------------------------------------------------------------------------------------------------------------------------------------
function parseFormat(number)
	local left,num,right = string.match(parseInt(number),"^([^%d]*%d)(%d*)(.-)$")
	return left..(num:reverse():gsub("(%d%d%d)","%1."):reverse())..right
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMPLETETIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
function completeTimers(seconds)
	local days = math.floor(seconds / 86400)
	seconds = seconds - days * 86400
	local hours = math.floor(seconds / 3600)
	seconds = seconds - hours * 3600
	local minutes = math.floor(seconds / 60)
	seconds = seconds - minutes * 60

	if days > 0 then
		return string.format("<b>%d Dias</b>, <b>%d Horas</b>, <b>%d Minutos</b> e <b>%d Segundos</b>",days,hours,minutes,seconds)
	elseif hours > 0 then
		return string.format("<b>%d Horas</b>, <b>%d Minutos</b> e <b>%d Segundos</b>",hours,minutes,seconds)
	elseif minutes > 0 then
		return string.format("<b>%d Minutos</b> e <b>%d Segundos</b>",minutes,seconds)
	elseif seconds > 0 then
		return string.format("<b>%d Segundos</b>",seconds)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MINIMALTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
function minimalTimers(seconds)
	local days = math.floor(seconds / 86400)
	seconds = seconds - days * 86400
	local hours = math.floor(seconds / 3600)
	seconds = seconds - hours * 3600
	local minutes = math.floor(seconds / 60)
	seconds = seconds - minutes * 60

	if days > 0 then
		return string.format("%d Dias, %d Horas",days,hours)
	elseif hours > 0 then
		return string.format("%d Horas, %d Minutos",hours,minutes)
	elseif minutes > 0 then
		return string.format("%d Minutos",minutes)
	elseif seconds > 0 then
		return string.format("%d Segundos",seconds)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOAD MODEL
-----------------------------------------------------------------------------------------------------------------------------------------
function LoadModel(model)
	while not HasModelLoaded(model) do
        RequestModel(model)
        Citizen.Wait(10)
    end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOAD ANIM
-----------------------------------------------------------------------------------------------------------------------------------------
function LoadAnim(anim)
	RequestAnimDict(anim)
	while not HasAnimDictLoaded(anim) do
		RequestAnimDict(anim)
		Citizen.Wait(10)
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOADMOVEMENT
-----------------------------------------------------------------------------------------------------------------------------------------
function LoadMovement(Library)
	RequestAnimSet(Library)
	while not HasAnimSetLoaded(Library) do
		RequestAnimSet(Library)
		Wait(1)
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOADNETWORK
-----------------------------------------------------------------------------------------------------------------------------------------
function LoadNetwork(Network)
	local Cooldown = 100
	local Object = NetworkGetEntityFromNetworkId(Network)
	while not DoesEntityExist(Object) and Cooldown > 0 do
		Cooldown = Cooldown - 1
		Object = NetworkGetEntityFromNetworkId(Network)

		Wait(1)
	end

	if DoesEntityExist(Object) then
		NetworkRequestControlOfEntity(Object)
		while not NetworkHasControlOfEntity(Object) do
			Wait(1)
		end

		SetEntityAsMissionEntity(Object,true,true)
		while not IsEntityAMissionEntity(Object) do
			Wait(1)
		end

		return Object
	end

	return
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DRAWBASE3D
-----------------------------------------------------------------------------------------------------------------------------------------
if not IsDuplicityVersion() then
	CreateThread(function()
		if not HasStreamedTextureDictLoaded("rbn_blips") then
			RequestStreamedTextureDict("rbn_blips", true)
			while not HasStreamedTextureDictLoaded("rbn_blips") do
				Wait(1)
			end
		end
	end)
	local rbnBlips = {
		["ammunation"] = true,
		["barbershop"] = true,
		["bate-ponto"] = true,
		["clothes"] = true,
		["conce"] = true,
		["department"] = true,
		["garage"] = true,
		["homes"] = true,
		["tattoos"] = true,
		["treatment"] = true,
		["elevator"] = true,
		["routes"] = true,
		["chest"] = true,
		["races"] = true,
		["jobs"] = true,
		["bank"] = true,
	}
	function DrawBase3D(x,y,z,text)
		if rbnBlips[text] and HasStreamedTextureDictLoaded("rbn_blips") then
			DrawMarker(9, x, y, z, 0.0, 0.0, 0.0, 90.0, 90.0, 0.0, 1.5, 1.5, 1.5, 255, 255, 255, 255, false, true, 2, false, "rbn_blips", text, false)
		else
			local _,_x,_y = World3dToScreen2d(x,y,z)
			SetTextFont(2)
			SetTextScale(0.35,0.35)
			SetTextColour(255,255,255,215)
			SetTextEntry("STRING")
			SetTextCentre(true)
			AddTextComponentString(text)
			DrawText(_x,_y)
			local factor = (string.len(text))/350
			DrawRect(_x,_y+0.0125,0.01+factor,0.03,34,44,52,175)
		end
	end
end
