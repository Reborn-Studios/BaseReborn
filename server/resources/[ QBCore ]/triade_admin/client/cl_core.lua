-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CLIENTE (NUI)
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp", "lib/Tunnel") or {}
Proxy = module("vrp", "lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")

local panelOpen = false
local busy = false
local previewOpen = false

-----------------------------------------------------------------------------------------------------------------------------------------
-- ABRIR / FECHAR
-----------------------------------------------------------------------------------------------------------------------------------------
local function closePanel()
	if not panelOpen then return end
	panelOpen = false
	SetNuiFocus(false, false)
	SendNUIMessage({ ["action"] = "close" })
	if previewOpen then
		previewOpen = false
		TriggerServerEvent("triade_admin:previewStopSession")
	end
end

local function openPanel(announce)
	if panelOpen or busy then return end
	busy = true

	local data = lib.callback.await("triade_admin:open", false)
	busy = false

	if not data then
		-- Pela tecla fica em silencio; pelo comando avisa que nao tem acesso.
		if announce then
			TriggerEvent("Notify", "negado", "Voce nao tem acesso ao painel administrativo.", 5000)
		end
		return
	end

	panelOpen = true
	SetNuiFocus(true, true)
	SendNUIMessage({ ["action"] = "open", ["data"] = data })
end

function TriadeAdminIsOpen()
	return panelOpen
end

RegisterCommand("triade_admin_panel", function()
	if panelOpen then
		closePanel()
	else
		openPanel()
	end
end, false)

RegisterKeyMapping("triade_admin_panel", "Painel administrativo", "keyboard", TriadeAdmin.Open.Key)

RegisterCommand(TriadeAdmin.Open.Command, function()
	if panelOpen then closePanel() else openPanel(true) end
end, false)

for _, alias in ipairs(TriadeAdmin.Open.Aliases or {}) do
	RegisterCommand(alias, function()
		if panelOpen then closePanel() else openPanel(true) end
	end, false)
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CALLBACKS DA NUI
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("close", function(_, cb)
	closePanel()
	cb({ ["ok"] = true })
end)

RegisterNUICallback("previewClose", function(_, cb)
	if previewOpen then
		previewOpen = false
		TriggerServerEvent("triade_admin:previewStopSession")
	end
	cb({ ["ok"] = true })
end)

RegisterNUICallback("fetch", function(data, cb)
	local result = lib.callback.await("triade_admin:fetch", false, data.key, data.payload or {})
	cb(result or false)
end)

RegisterNUICallback("action", function(data, cb)
	local result = lib.callback.await("triade_admin:action", false, data.key, data.payload or {})
	cb(result or { ["ok"] = false, ["message"] = "Sem resposta do servidor." })
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- FECHAR COM ESC
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if panelOpen then
			DisableControlAction(0, 322, true)
			if IsDisabledControlJustReleased(0, 322) then
				if previewOpen then
					SendNUIMessage({ ["action"] = "previewClose" })
				else
					closePanel()
				end
			end
			Wait(0)
		else
			Wait(300)
		end
	end
end)

AddEventHandler("onResourceStop", function(resource)
	if resource == GetCurrentResourceName() then
		SetNuiFocus(false, false)
		if previewOpen then
			previewOpen = false
			TriggerServerEvent("triade_admin:previewStopSession")
		end
	end
end)

RegisterNetEvent("triade_admin:previewActive", function()
	if not panelOpen then return end
	previewOpen = true
end)

RegisterNetEvent("triade_admin:previewStop", function()
	previewOpen = false
	SendNUIMessage({ ["action"] = "previewClose" })
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- EVENTOS AUXILIARES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:closePanel", function()
	closePanel()
end)

RegisterNetEvent("triade_admin:identityUpdated", function()
	TriggerEvent("Notify", "aviso", "A sua identidade foi atualizada pela administracao.", 6000)
end)
