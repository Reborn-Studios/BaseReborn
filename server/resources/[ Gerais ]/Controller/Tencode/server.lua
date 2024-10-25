-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPC = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
CodeServer = {}
Tunnel.bindInterface("tencode",CodeServer)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local codes = {
	[10] = {
		text = "Confronto em andamento",
		blip = 6
	},
	[13] = {
		text = "Oficial ferido",
		blip = 1
	},
	[20] = {
		text = "Localização",
		blip = 38
	},
	[32] = {
		text = "Homem suspeito",
		blip = 83
	},
	[38] = {
		text = "Parando veículo suspeito",
		blip = 61
	},
	[50] = {
		text = "Acidente de trânsito",
		blip = 77
	},
	[78] = {
		text = "Reforço solicitado",
		blip = 4
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SENDCODE
-----------------------------------------------------------------------------------------------------------------------------------------
function CodeServer.sendCode(code)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local ped = GetPlayerPed(source)
		local coords = GetEntityCoords(ped)
		local identity = vRP.getUserIdentity(user_id)
		local policeResult = vRP.getUsersByPermission("policia.permissao")
		for k,v in pairs(policeResult) do
			async(function()
				local nplayer = vRP.getUserSource(v)
				if nplayer then
					if code ~= 13 then
						vRPC.playSound(nplayer,"Event_Start_Text","GTAO_FM_Events_Soundset")
					end
					TriggerClientEvent("NotifyPush",nplayer,{ code = code, title = codes[parseInt(code)]["text"], x = coords["x"], y = coords["y"], z = coords["z"], name = identity["name"].." "..identity["name2"], time = "Recebido às "..os.date("%H:%M"), blipColor = codes[parseInt(code)]["blip"], rgba = {205,52,56} })
				end
			end)
		end
	end
end
