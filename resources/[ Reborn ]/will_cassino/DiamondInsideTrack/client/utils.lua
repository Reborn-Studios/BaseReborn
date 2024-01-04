Utils = {
    Scaleform = -1,
    ChooseHorseVisible = false,
    BetVisible = false,
    PlayerBalance = 0,
    CurrentHorse = -1,
    CurrentBet = Config.InsideTrack['minBet'],
    CurrentGain = Config.InsideTrack['minBet'] * Config.InsideTrack['multiplier'],
    HorsesPositions = {},
    CurrentWiner = -1,
    EnableBigScreen = true, -- Set it to false if you don't need the big screen,
    CurrentSoundId = -1,
    InsideTrackActive = false
}

function Utils:GetMouseClickedButton()
    local returnValue = -1

    CallScaleformMovieMethodWithNumber(self.Scaleform, 'SET_INPUT_EVENT', 237.0, -1082130432, -1082130432, -1082130432, -1082130432)
    BeginScaleformMovieMethod(self.Scaleform, 'GET_CURRENT_SELECTION')

    returnValue = EndScaleformMovieMethodReturnValue()

    while not IsScaleformMovieMethodReturnValueReady(returnValue) do
        Wait(0)
    end

    return GetScaleformMovieMethodReturnValueInt(returnValue)
end

function Utils.GetRandomHorseName()
    local random = math.random(0, 99)
    local randomName = (random < 10) and ('ITH_NAME_00'..random) or ('ITH_NAME_0'..random)

    return randomName
end