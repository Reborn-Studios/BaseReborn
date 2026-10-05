-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CHAMADOS (LADO DO JOGADOR E POPUP DA STAFF)
-----------------------------------------------------------------------------------------------------------------------------------------
local menuOpen = false
local popupFocus = false
local popups = 0

local function setFocus(state)
	SetNuiFocus(state, state)
	SetNuiFocusKeepInput(false)
end

local function closeMenu()
	if not menuOpen then return end
	menuOpen = false
	setFocus(false)
	SendNUIMessage({ ["action"] = "ticketMenuClose" })
end

local function openMenu()
	if menuOpen then closeMenu() return end
	if TriadeAdminIsOpen and TriadeAdminIsOpen() then return end

	local data = lib.callback.await("triade_admin:ticketMenu", false)
	if not data then return end

	menuOpen = true
	setFocus(true)
	SendNUIMessage({ ["action"] = "ticketMenu", ["data"] = data })
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- TECLA F5
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("triade_admin_ticket", function()
	if menuOpen then
		closeMenu()
		return
	end

	if popups > 0 then
		popupFocus = not popupFocus
		setFocus(popupFocus)
		SendNUIMessage({ ["action"] = "ticketPopupFocus", ["state"] = popupFocus })
		return
	end

	openMenu()
end, false)

RegisterKeyMapping("triade_admin_ticket", "Abrir chamados", "keyboard", TriadeAdmin.Open.TicketKey)

RegisterCommand(TriadeAdmin.Open.TicketCommand, function()
	openMenu()
end, false)

-----------------------------------------------------------------------------------------------------------------------------------------
-- POPUPS DA STAFF
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:ticketPopup", function(ticket)
	popups = popups + 1
	SendNUIMessage({ ["action"] = "ticketPopup", ["data"] = ticket })
	PlaySoundFrontend(-1, "Menu_Accept", "Phone_SoundSet_Default", true)
end)

RegisterNetEvent("triade_admin:ticketClosePopup", function(id)
	if popups > 0 then popups = popups - 1 end
	SendNUIMessage({ ["action"] = "ticketPopupRemove", ["id"] = id })

	if popups <= 0 and popupFocus then
		popupFocus = false
		setFocus(false)
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- AVALIACAO DO ATENDIMENTO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:ticketRating", function(data)
	setFocus(true)
	SendNUIMessage({ ["action"] = "ticketRating", ["data"] = data })
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CALLBACKS DA NUI
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("ticketCreate", function(data, cb)
	local result = lib.callback.await("triade_admin:ticketCreate", false, data.type, data.message)
	closeMenu()
	cb(result or { ["ok"] = false })
end)

RegisterNUICallback("ticketMenuClose", function(_, cb)
	closeMenu()
	cb({ ["ok"] = true })
end)

RegisterNUICallback("ticketAction", function(data, cb)
	local result = lib.callback.await("triade_admin:action", false, data.key, { ["id"] = data.id })

	if data.key == "ticket.accept" or data.key == "ticket.close" then
		if popups > 0 then popups = popups - 1 end
		if popups <= 0 and popupFocus then
			popupFocus = false
			setFocus(false)
		end
	end

	cb(result or { ["ok"] = false })
end)

RegisterNUICallback("ticketDismiss", function(data, cb)
	if popups > 0 then popups = popups - 1 end
	if popups <= 0 and popupFocus then
		popupFocus = false
		setFocus(false)
	end
	cb({ ["ok"] = true })
end)

RegisterNUICallback("ticketRate", function(data, cb)
	local ok = lib.callback.await("triade_admin:ticketRate", false, data.id, data.rating, data.comment)
	setFocus(false)
	cb({ ["ok"] = ok == true })
end)

RegisterNUICallback("ticketRatingClose", function(_, cb)
	setFocus(false)
	cb({ ["ok"] = true })
end)

AddEventHandler("onResourceStop", function(resource)
	if resource == GetCurrentResourceName() then
		SetNuiFocus(false, false)
	end
end)
