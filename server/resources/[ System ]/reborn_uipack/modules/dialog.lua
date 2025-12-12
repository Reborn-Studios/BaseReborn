local activeDialogPromise = nil

function InputDialog(heading, rows, options)
    if activeDialogPromise then
        return
    end
    
    activeDialogPromise = promise.new()
    
    -- Normalizar rows: converter strings simples em objetos de input
    for i = 1, #rows do
        if type(rows[i]) == "string" then
            rows[i] = {
                type = "input",
                label = rows[i]
            }
        end
    end
    
    Utils.setNuiFocus(false)
    
    SendNUIMessage({
        action = "openDialog",
        data = {
            heading = heading,
            rows = rows,
            options = options
        }
    })
    
    return Citizen.Await(activeDialogPromise)
end

function CloseInputDialog()
    if not activeDialogPromise then
        return
    end
    
    Utils.resetNuiFocus()
    
    SendNUIMessage({
        action = "closeInputDialog"
    })
    
    activeDialogPromise:resolve(nil)
    activeDialogPromise = nil
end

RegisterNUICallback("inputData", function(data, callback)
    callback(1)
    
    Utils.resetNuiFocus()
    
    local dialogPromise = activeDialogPromise
    activeDialogPromise = nil
    
    dialogPromise:resolve(data)
end)