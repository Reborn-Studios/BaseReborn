callback = {}

---@class Vitrine : OxClass
---@field id number
---@field coords vector4
---@field props table
---@field isOpen boolean
Vitrine = {}

---@param coords vector4
---@param props table
function Vitrine:new(id, coords, props)
    local data = {
        id = id,
        coords = coords,
        props = props,
        isOpen = false,
        isBusy = true
    }
    setmetatable(data, self)
    self.__index = self
    return data
end

---@param coords vector4
---@param props table
function Vitrine:constructor(id, coords, props)
    self.id = id
    self.coords = coords
    self.props = props
    self.isOpen = false
    self.isBusy = true
end

function Vitrine:open()
    self.isOpen = true

    self:swapModel(true)
end

function Vitrine:reset()
    self.isOpen = false
    self:setBusy(true)

    self:swapModel(false)
end

function Vitrine:setBusy(value)
    self.isBusy = value
end

function Vitrine:swapModel(value)
    if IsDuplicityVersion() then
        return
    end

    local preHash, postHash = GetHashKey(self.props.pre), GetHashKey(self.props.post)

    if not HasModelLoaded(preHash) then
        loadModel(preHash)
    end
    if not HasModelLoaded(postHash) then
        loadModel(postHash)
    end

    if value then
        CreateModelSwap(self.coords.x, self.coords.y, self.coords.z, 0.1, preHash, postHash, false)
    else
        RemoveModelSwap(self.coords.x, self.coords.y, self.coords.z, 0.1, preHash, postHash, false)
    end
end