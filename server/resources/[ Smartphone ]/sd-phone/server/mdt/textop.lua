---@type table Text operations; the table returned at end of file. The server half of live text
---editing: checks, rebases and applies the edits terminals send, counted in UTF-16 units as they are.
local textop = {}

---@alias TextOp (integer|string)[] Positive keeps that many units, negative drops them, a string inserts.

---@type integer Most components one edit may carry.
local MAX_COMPONENTS <const> = 64

---Counts a UTF-8 string in UTF-16 units, which is how the terminal's JavaScript measures it.
---@param s string
---@return integer units
function textop.units(s)
    local _, chars = s:gsub('[^\128-\191]', '')
    local _, wide = s:gsub('[\240-\247]', '')
    return chars + wide
end

---Appends a component, folding it into the one before where they are the same kind.
---@param op TextOp
---@param c integer|string
local function add(op, c)
    if c == 0 or c == '' then return end
    local n = #op
    local last = op[n]
    if type(c) == 'string' then
        if type(last) == 'string' then
            op[n] = last .. c
        elseif type(last) == 'number' and last < 0 then
            if type(op[n - 1]) == 'string' then op[n - 1] = op[n - 1] .. c
            else table.insert(op, n, c) end
        else
            op[n + 1] = c
        end
        return
    end
    if type(last) == 'number' and ((c > 0 and last > 0) or (c < 0 and last < 0)) then
        op[n] = last + c
    else
        op[n + 1] = c
    end
end

---Rebuilds a client's edit as clean integers and valid UTF-8, measuring it on the way.
---@param op any
---@param maxInsertBytes integer
---@return TextOp|nil clean, integer base, integer target
function textop.check(op, maxInsertBytes)
    if type(op) ~= 'table' or #op == 0 or #op > MAX_COMPONENTS then return nil, 0, 0 end
    local out, base, target = {}, 0, 0
    for i = 1, #op do
        local c = op[i]
        if type(c) == 'string' then
            if c == '' or #c > maxInsertBytes or not utf8.len(c) then return nil, 0, 0 end
            target = target + textop.units(c)
            add(out, c)
        elseif type(c) == 'number' then
            local n = math.tointeger(c)
            if not n or n == 0 then return nil, 0, 0 end
            base = base + math.abs(n)
            if n > 0 then target = target + n end
            add(out, n)
        else
            return nil, 0, 0
        end
    end
    return out, base, target
end

---Rebases edit `a` over edit `b`, both made against the same text, so `a` can follow `b`.
---@param a TextOp
---@param b TextOp
---@return TextOp|nil rebased
function textop.transform(a, b)
    local out = {}
    local i, j = 1, 1
    local x, y = a[1], b[1]
    while x ~= nil or y ~= nil do
        if type(x) == 'string' then
            add(out, x)
            i = i + 1
            x = a[i]
        elseif type(y) == 'string' then
            add(out, textop.units(y))
            j = j + 1
            y = b[j]
        else
            if x == nil or y == nil then return nil end
            local n = math.min(math.abs(x), math.abs(y))
            if x > 0 and y > 0 then add(out, n)
            elseif x < 0 and y > 0 then add(out, -n) end
            x = x > 0 and x - n or x + n
            y = y > 0 and y - n or y + n
            if x == 0 then i = i + 1 x = a[i] end
            if y == 0 then j = j + 1 y = b[j] end
        end
    end
    return out
end

---Steps a byte index forward by a number of UTF-16 units.
---@param text string
---@param at integer byte index to start from
---@param units integer
---@return integer|nil next byte index, or nil when the text ends first or a character would be split
local function advance(text, at, units)
    local size = #text
    while units > 0 do
        if at > size then return nil end
        local b = text:byte(at)
        local bytes = b < 0x80 and 1 or b < 0xE0 and 2 or b < 0xF0 and 3 or 4
        local wide = bytes == 4 and 2 or 1
        if units < wide then return nil end
        at = at + bytes
        units = units - wide
    end
    return at
end

---Applies an edit to a text.
---@param text string
---@param op TextOp
---@return string|nil result nil when the edit does not fit the text
function textop.apply(text, op)
    local parts, at = {}, 1
    for i = 1, #op do
        local c = op[i]
        if type(c) == 'string' then
            parts[#parts + 1] = c
        else
            local next = advance(text, at, math.abs(c))
            if not next then return nil end
            if c > 0 then parts[#parts + 1] = text:sub(at, next - 1) end
            at = next
        end
    end
    if at ~= #text + 1 then return nil end
    return table.concat(parts)
end

return textop
