-- Exposes globals: CreatePoint({ coords, radius?, uid? }) -> point; DeletePoint(uid)
-- Point fields used: Coords, radius, uid, yourInside, currentDistance, Inside(), OnEnter(), OnExit()

local points = {}
local anyInside = false

function CreatePoint(opts)
  local point = {}
  point.Coords = opts.coords
  point.radius = opts.radius or 5
  point.uid = opts.uid or (#points + 1)
  table.insert(points, point)
  return point
end

function DeletePoint(uid)
  for i, p in ipairs(points) do
    if p.uid == uid then
      table.remove(points, i)
      break
    end
  end
end

CreateThread(function()
  while true do
    Wait(0)
    local playerPos = GetEntityCoords(PlayerPedId())
    for _, p in ipairs(points) do
      local dist = #(playerPos - p.Coords)
      p.currentDistance = dist
      if dist < p.radius then
        if p.yourInside then
          if p.Inside then p.Inside(p) end
        else
          if not p.yourInside then
            p.yourInside = true
            if p.OnEnter then p.OnEnter(p) anyInside = true end
          end
        end
      else
        if p.yourInside then
          p.yourInside = false
          if p.OnExit then p.OnExit(p) anyInside = false end
        end
      end
    end
    if not anyInside then
      Wait(1500)
    end
  end
end)
