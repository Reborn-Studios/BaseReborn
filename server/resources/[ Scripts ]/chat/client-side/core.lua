-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vSERVER = Tunnel.getInterface("chat")

CreateThread(function()
	SetTextChatEnabled(false)
end)

RegisterNetEvent("__cfx_internal:serverPrint")
AddEventHandler('__cfx_internal:serverPrint', function(msg)
	return
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Active = {
	['Police'] = true,
	['Paramedic'] = true,
	['Mechanic'] = true,
	['Admin'] = true,
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLOCK
-----------------------------------------------------------------------------------------------------------------------------------------
local Block = {
	"zap",
	"macaco",
	"preto",
	"arrombado",
	"viadinho",
	"urugutango",
	"gorila",
	"gorilla",
	"mongoloide",
	"bixa",
	"bicha",
	"traveco",
	"veveco",
	"boiola",
	"pau",
	"buceta",
	"gay",
	"piranha",
	"monkey",
	"vagabunda",
	"puta",
	"escroto",
	"piranha",
	"pretinho",
	"escurinho",
	"negrinho",
	"piranha"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHATEVENT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("ChatEvent",function()
	if not IsPauseMenuActive() and not LocalPlayer.state.Handcuff and not LocalPlayer.state.Carry and not IsPedReloading(PlayerPedId()) then
		local Tags = {}
		for Permission,_ in pairs(Active) do
			if LocalPlayer.state[Permission] then
				table.insert(Tags,Permission)
			end
		end
		if not LocalPlayer.state.Police then
			table.insert(Tags,"Ilegal")
		end

		SendNUIMessage({ Action = "Chat", Payload = { Tags,Block } })
		SetNuiFocus(true,true)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT:CLIENTMESSAGE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("chat:ClientMessage")
AddEventHandler("chat:ClientMessage",function(Author,Message,Mode)
	SendNUIMessage({ Action = "Message", Payload = { Author,Message,Mode } })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHATSUBMIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("ChatSubmit",function(Data,Callback)
	if Data["message"] ~= "" then
		if Data["message"]:sub(1,1) == "/" then
			ExecuteCommand(Data["message"]:sub(2))
			SetNuiFocus(false,false)
		else
			TriggerServerEvent("chat:ServerMessage",Data.tag,Data.message)
		end
	end

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Close",function(Data,Callback)
	SetNuiFocus(false,false)

	Callback("Ok")
end)

RegisterNUICallback("Theme",function(Data,Callback)
	Callback({
		shadow = true,
		main = "7335d8f2",
		mainText = "#ffffff",
		common = "#6fc66a",
		rare = "#6ac6c5",
		epic = "#c66a75",
		legendary = "#c6986a",
		accept = {
			letter = "#dcffe9",
			background = "#3fa466"
		},
		reject = {
			letter = "#ffe8e8",
			background = "#ad4443"
		},
		chat = {
			Police = {
				background = "#16468b",
				letter = "#ffffff"
			},
			Paramedic = {
				background = "#c127cf",
				letter = "#ffffff"
			},
			Mechanic = {
				background = "#d4780f",
				letter = "#ffffff"
			},
			Ilegal = {
				background = "#3b3b3b",
				letter = "#ffffff"
			}
		},
	})
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("ChatEvent","Abrir o chat.","keyboard","T")