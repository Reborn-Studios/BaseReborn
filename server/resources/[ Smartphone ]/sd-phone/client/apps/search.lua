---@type fun(nuiAction: string, serverEvent: string, onAccepted?: fun(), transform?: fun(res: table)) NUI->server pass-through registrar (client.nui).
local proxy = require 'client.nui'
---@type fun(raw: any): VehicleModel Stored model value to hash/spawn/display (client.vehiclename).
local vehicleModel = require 'client.vehiclename'

---Swaps each garage hit's title for the readable name of the raw model the server put in `extra`.
---@param res table successful search envelope
local function nameGarages(res)
    local garages = type(res.data) == 'table' and res.data.garages
    if type(garages) ~= 'table' then return end
    for _, h in ipairs(garages) do
        if type(h) == 'table' and h.extra then
            local ok, model = pcall(vehicleModel, h.extra)
            if ok and model.display ~= '' then h.title = model.display end
            h.extra = nil
        end
    end
end

proxy('sd-phone:search:query', 'sd-phone:server:search:query', nil, nameGarages)
