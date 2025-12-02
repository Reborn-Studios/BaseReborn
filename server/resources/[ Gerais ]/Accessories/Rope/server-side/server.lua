-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
rpVRP = {}
Tunnel.bindInterface("vrp_rope",rpVRP)
vCLIENT = Tunnel.getInterface("vrp_rope")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
function rpVRP.startCarry(target,animationLib,animationLib2,animation,animation2,distans,distans2,height,targetSrc,length,spin,controlFlagSrc,controlFlagTarget,animFlagTarget)
	local source = source
	vCLIENT.syncTarget(targetSrc,source,animationLib2,animation2,distans,distans2,height,length,spin,controlFlagTarget,animFlagTarget)
	vCLIENT.syncSource(source,animationLib,animation,length,controlFlagSrc,animFlagTarget)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STOPCARRY
-----------------------------------------------------------------------------------------------------------------------------------------
function rpVRP.stopCarry(targetSrc)
	vCLIENT.stopCarry(targetSrc)
end