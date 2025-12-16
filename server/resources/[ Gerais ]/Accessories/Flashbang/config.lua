ConfigFlash = {}

-- Flashbang Radius Configuration (in meters)
-- flashbangRadius: If the player is in direct line of sight with the flashbang and within this radius, it will be affected.
-- stunRadius: If the player is in this radius, it will be affected no matter what (because of the concussive effect). This goes through walls!
-- Effects always scale with distance.
ConfigFlash.FlashbangRadius = 40
ConfigFlash.StunRadius = 10

-- Stun Configuration (Only applies if the player is within stunRadius)
-- RagdollEnabled: If true, set the player to ragdoll when they are stunned. If false, they will remain standing.
-- RagdollTime: This is how long they will lay on the floor, if enabled. In seconds.
-- Disarm: Wether to disarm the player or not.
ConfigFlash.RagdollEnabled = true
ConfigFlash.RagdollTime = 5
ConfigFlash.Disarm = true

-- Timer Configuration
-- Pretty simple: How long should the player be affected? In seconds.
ConfigFlash.FlashbangDuration = 5

-- Slow Mouse Movement Configuration
-- SlowMovement: Enable to limit the mouse movement speed of the player when stunned by a flashbang.
-- SlowMovementScale: Scale (0.0 - 1.0) of the original mouse movement. Lower values mean slower mouse movement.
ConfigFlash.SlowMovement = true
ConfigFlash.SlowMovementScale = 0.1