local open = false
local notifyId = 'jsfour-idcard-open'

local function showDocumentNotify()
	if exports and exports.ox_lib then
		exports.ox_lib:notify({
			id = notifyId,
			title = 'Dokument geöffnet',
			description = 'Drücke die Pfeiltasten zum Dokumentwechsel, wenn du zwei Dokumente hast, z. B. Personalausweis und Führerschein.',
			type = 'inform',
			duration = 999999
		})
	end
end

local function hideDocumentNotify()
	if exports and exports.ox_lib then
		exports.ox_lib:notify({
			id = notifyId,
			title = ' ',
			description = ' ',
			type = 'info',
			duration = 1,
			showDuration = false,
			style = {
				opacity = 0,
				height = 0,
				margin = 0,
				padding = 0,
				overflow = 'hidden'
			}
		})
	end
end

-- Open ID card
RegisterNetEvent('jsfour-idcard:open')
AddEventHandler('jsfour-idcard:open', function( data, type )
	open = true
	SendNUIMessage({
		action = "open",
		array  = data,
		type   = type
	})
	showDocumentNotify()
end)

-- Key events
Citizen.CreateThread(function()
	while true do
		Wait(0)
		if open then
			if IsControlJustReleased(0, 174) then
				SendNUIMessage({ action = 'selectLeft' })
			elseif IsControlJustReleased(0, 175) then
				SendNUIMessage({ action = 'selectRight' })
			elseif IsControlJustReleased(0, 172) then
				SendNUIMessage({ action = 'selectUp' })
			elseif IsControlJustReleased(0, 173) then
				SendNUIMessage({ action = 'selectDown' })
			elseif IsControlJustReleased(0, 322) or IsControlJustReleased(0, 177) then
				SendNUIMessage({ action = 'close' })
				hideDocumentNotify()
				open = false
			end
		end
	end
end)
