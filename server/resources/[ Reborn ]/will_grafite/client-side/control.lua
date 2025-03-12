-----------------------------------------
-- CLASS
-----------------------------------------
_JT = {}

function JT(dim)
    local n = { values={}, positions={}, directions={}, sign=1 }
    setmetatable(n,{__index=_JT})
    for i=1,dim do
        n.values[i]=i
        n.positions[i]=i
        n.directions[i]=-1
    end
    return n
end

function _JT:largestMobile()
    for i=#self.values,1,-1 do
        local loc=self.positions[i]+self.directions[i]
        if loc >= 1 and loc <= #self.values and self.values[loc] < i then
            return i
        end
    end
    return 0
end

function _JT:next()
    local r=self:largestMobile()
    if r==0 then return false end
    local rloc=self.positions[r]
    local lloc=rloc+self.directions[r]
    local l=self.values[lloc]
    self.values[lloc],self.values[rloc] = self.values[rloc],self.values[lloc]
    self.positions[l],self.positions[r] = self.positions[r],self.positions[l]
    self.sign=-self.sign
    for i=r+1,#self.directions do self.directions[i]=-self.directions[i] end
    return true
end

_MTX = {}

function MTX(matrix)
    setmetatable(matrix,{__index=_MTX})
    matrix.rows=#matrix
    matrix.cols=#matrix[1]
    return matrix
end

function _MTX:perm() return self:det(1) end

function _MTX:det(perm)
    local det=0
    local jt=JT(self.cols)
    repeat
        local pi=perm or jt.sign
        for i,v in ipairs(jt.values) do
            pi=pi*self[i][v]
        end
        det=det+pi
    until not jt:next()
    return det
end

function IsOnPlane(a,b,c,d,e,f)
    local det1 = MTX{
        {a.x, b.x, c.x, d.x},
        {a.y, b.y, c.y, d.y},
        {a.z, b.z, c.z, d.z},
        {1  , 1  , 1  , 1  , 1  },
    }
    local det2 = MTX{
        {a.x, c.x, e.x, f.x},
        {a.y, c.y, e.y, f.y},
        {a.z, c.z, e.z, f.z},
        {1  , 1  , 1  , 1  , 1  },
    }
    return math.abs(det1:det()) < 0.1 and math.abs(det2:det()) < 0.1
end

-----------------------------------------
-- CODIGO
-----------------------------------------

function SprayEffects()
    local dict = "scr_recartheft"
    local name = "scr_wheel_burnout"
    local ped = PlayerPedId()
    local fwd = GetEntityForwardVector(ped)
    local coords = GetEntityCoords(ped) + fwd * 0.5 + vector3(0.0, 0.0, -0.5)
	RequestNamedPtfxAsset(dict)
    while not HasNamedPtfxAssetLoaded(dict) do
        Citizen.Wait(0)
	end
    local heading = GetEntityHeading(ped)
    UseParticleFxAssetNextCall(dict)
    SetParticleFxNonLoopedColour(255 / 255, 255 / 255, 255 / 255)
    SetParticleFxNonLoopedAlpha(1.0)
    local ptr = StartNetworkedParticleFxNonLoopedAtCoord(name, coords.x, coords.y, coords.z + 2.0, 0.0, 0.0, heading, 0.7, false, false, false)
    RemoveNamedPtfxAsset(dict)
end

function RemoveDisallowedCharacters(str, inverse)
    local replaced, _ = str:gsub(inverse, '')
    return replaced
end

-------------------------------------------------------------------------
-- RAYCAST
-------------------------------------------------------------------------

local LastRayStart = nil
local LastRayDirection = nil

local LastComputedRayEndCoords = nil
local LastComputedRayNormal = nil
local LastError = nil

function FindRaycastedSprayCoords()
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    local cameraRotation = GetGameplayCamRot()
	local cameraCoord = GetGameplayCamCoord()
	local direction = RotationToDirection(cameraRotation)
    local rayStart = cameraCoord
    local rayDirection = direction

    if not LastRayStart or not LastRayDirection or ((not LastComputedRayEndCoords or not LastComputedRayNormal) and not LastError) or rayStart ~= LastRayStart or rayDirection ~= LastRayDirection then
        LastRayStart = rayStart
        LastRayDirection = rayDirection
        local result, error, rayEndCoords, rayNormal = FindRaycastedSprayCoordsNotCached(ped, coords, rayStart, rayDirection)
        if result then
            if LastSubtitleText then
                LastSubtitleText = nil
                ClearPrints()
            end
            LastComputedRayEndCoords = rayEndCoords
            LastComputedRayNormal = rayNormal
            LastError = nil
            return LastComputedRayEndCoords, LastComputedRayNormal, LastComputedRayNormal
        else
            LastComputedRayEndCoords = nil
            LastComputedRayNormal = nil
            LastError = error
            DrawSubtitleText(error)
        end
    else
        return LastComputedRayEndCoords, LastComputedRayNormal, LastComputedRayNormal
    end
end

function FindRaycastedSprayCoordsNotCached(ped, coords, rayStart, rayDirection)
    local rayHit, rayEndCoords, rayNormal, materialHash = CheckRay(ped, rayStart, rayDirection)
    local ray2Hit, ray2EndCoords, ray2Normal, _ = CheckRay(ped, rayStart + vector3(0.0, 0.0, 0.2), rayDirection)
    local ray3Hit, ray3EndCoords, ray3Normal, _ = CheckRay(ped, rayStart + vector3(1.0, 0.0, 0.0), rayDirection)
    local ray4Hit, ray4EndCoords, ray4Normal, _ = CheckRay(ped, rayStart + vector3(-1.0, 0.0, 0.0), rayDirection)
    local ray5Hit, ray5EndCoords, ray5Normal, _ = CheckRay(ped, rayStart + vector3(0.0, 1.0, 0.0), rayDirection)
    local ray6Hit, ray6EndCoords, ray6Normal, _ = CheckRay(ped, rayStart + vector3(0.0, -1.0, 0.0), rayDirection)
    local isOnGround = ray2Normal.z > 0.9

    if not isOnGround and rayHit and ray2Hit and ray3Hit and ray4Hit and ray5Hit and ray6Hit then
        if not FORBIDDEN_MATERIALS[materialHash] then
            if #(coords - rayEndCoords) < 3.0 then
                if (IsNormalSame(rayNormal, ray2Normal)
                and IsNormalSame(rayNormal, ray3Normal)
                and IsNormalSame(rayNormal, ray4Normal)
                and IsNormalSame(rayNormal, ray5Normal)
                and IsNormalSame(rayNormal, ray6Normal)
                and IsOnPlane(rayEndCoords, ray2EndCoords, ray3EndCoords, ray4EndCoords, ray5EndCoords, ray6EndCoords)) then
                    return true, '', rayEndCoords, rayNormal, rayNormal
                else
                    return false, Config.Text.SPRAY_ERRORS.NOT_FLAT
                end
            else
                return false, Config.Text.SPRAY_ERRORS.TOO_FAR
            end
        else
            return false, Config.Text.SPRAY_ERRORS.INVALID_SURFACE
        end
    else
        return false, Config.Text.SPRAY_ERRORS.AIM
    end
end

local LastSubtitleText = nil
function DrawSubtitleText(text)
    if text ~= LastSubtitleText then
        LastSubtitleText = text
        BeginTextCommandPrint("STRING")
        AddTextComponentSubstringPlayerName(text)
        EndTextCommandPrint(5000, true)
    end
end

function RotationToDirection(rotation)
	local adjustedRotation = {
		x = (math.pi / 180) * rotation.x,
		y = (math.pi / 180) * rotation.y,
		z = (math.pi / 180) * rotation.z
	}
	return vector3(
        -math.sin(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		math.cos(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		math.sin(adjustedRotation.x)
    )
end

function CheckRay(ped, coords, direction)
    local rayEndPoint = coords + direction * 1000.0
    local rayHandle = StartShapeTestRay(coords.x,coords.y,coords.z,rayEndPoint.x,rayEndPoint.y,rayEndPoint.z,1,ped)
    local retval, hit, endCoords, surfaceNormal, materialHash, entityHit = GetShapeTestResultEx(rayHandle)
    return hit == 1, endCoords, surfaceNormal, materialHash
end

function IsNormalSame(norm1, norm2)
    local xDist = math.abs(norm1.x - norm2.x)
    local yDist = math.abs(norm1.y - norm2.y)
    local zDist = math.abs(norm1.z - norm2.z)
    return xDist < 0.01 and yDist < 0.01 and zDist < 0.01
end
