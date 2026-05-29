vSERVER = Tunnel.getInterface("DiamondInsideTrack")

local minBet = Config.InsideTrack['minBet']
local maxBet = Config.InsideTrack['maxBet']
local multiplicador = Config.InsideTrack['multiplier']

local cooldown = 60
local tick = 0
local checkRaceStatus = false
local balance = 0  
local playing = false

function OpenInsideTrack()
    if Utils.InsideTrackActive then
        return
    end

    Utils.InsideTrackActive = true

    -- Scaleform
    Utils.Scaleform = RequestScaleformMovie('HORSE_RACING_CONSOLE')

    while not HasScaleformMovieLoaded(Utils.Scaleform) do
        Wait(0)
    end

    DisplayHud(false)
    SetPlayerControl(PlayerId(), false, 0)
    
    if IsNamedRendertargetRegistered('casinoscreen_02') then
        ReleaseNamedRendertarget('casinoscreen_02')
    end

    while not RequestScriptAudioBank('DLC_VINEWOOD/CASINO_GENERAL') do
        Wait(0)
    end

    Utils:ShowMainScreen()
    Utils:SetMainScreenCooldown(cooldown)

    -- Add horses
    Utils.AddHorses(Utils.Scaleform)

    Utils:DrawInsideTrack()
    Utils:HandleControls()

    balance = vSERVER.getBalance()
end

function LeaveInsideTrack()
    Utils.InsideTrackActive = false
    playing = false
    DisplayHud(true)
    SetPlayerControl(PlayerId(), true, 0)
    SetScaleformMovieAsNoLongerNeeded(Utils.Scaleform)

    Utils.Scaleform = -1
end

function Utils:DrawInsideTrack()
    Citizen.CreateThread(function()
        while self.InsideTrackActive do
            Wait(0)

            local xMouse, yMouse = GetDisabledControlNormal(2, 239), GetDisabledControlNormal(2, 240)

            -- Fake cooldown
            tick = (tick + 10)

            if (tick == 1000) then
                if (cooldown == 1) then
                    cooldown = 60
                end
                
                cooldown = (cooldown - 1)
                tick = 0

                self:SetMainScreenCooldown(cooldown)
            end
            
            -- Mouse control
            BeginScaleformMovieMethod(self.Scaleform, 'SET_MOUSE_INPUT')
            ScaleformMovieMethodAddParamFloat(xMouse)
            ScaleformMovieMethodAddParamFloat(yMouse)
            EndScaleformMovieMethod()

            -- Draw
            DrawScaleformMovieFullscreen(self.Scaleform, 255, 255, 255, 255)
        end
    end)
end

function Utils:HandleControls()
    Citizen.CreateThread(function()
        while self.InsideTrackActive do
            Wait(0)

            if IsControlJustPressed(2, 194) then
                LeaveInsideTrack()
                TriggerEvent("InsideTrack:LeaveInsideTrack")
                loadBigScreen()
            end
            -- Left click
            if IsControlJustPressed(2, 237) then
                local clickedButton = self:GetMouseClickedButton()
                balance = vSERVER.getBalance()
                if self.ChooseHorseVisible then
                    if (clickedButton ~= 12) and (clickedButton ~= -1) then
                        self.CurrentHorse = (clickedButton - 1)
                        self:ShowBetScreen(self.CurrentHorse)
                        self.ChooseHorseVisible = false
                    end
                end

                -- Rules button
                if (clickedButton == 15) then
                    self:ShowRules()
                end

                -- Close buttons
                if (clickedButton == 12) then
                    if self.ChooseHorseVisible then
                        self.ChooseHorseVisible = false
                    end
                    
                    if self.BetVisible then
                        self:ShowHorseSelection()
                        self.BetVisible = false
                        self.CurrentHorse = -1
                    else
                        self:ShowMainScreen()
                    end
                end

                -- Start bet
                if (clickedButton == 1) then
                    self:ShowHorseSelection()
                end

                -- Start race
                if (clickedButton == 10) then
                    if vSERVER.getMoneyBet(self.CurrentBet) then
                        self.CurrentSoundId = GetSoundId()
                        PlaySoundFrontend(self.CurrentSoundId, 'race_loop', 'dlc_vw_casino_inside_track_betting_single_event_sounds')
                        
                        self:StartRace()
                        checkRaceStatus = true
                    end
                end
                self.PlayerBalance = balance
                -- Change bet
                if (clickedButton == 8) then
                    if (self.CurrentBet < self.PlayerBalance) and (self.CurrentBet < maxBet) then
                        self.CurrentBet = (self.CurrentBet + 100)
                        self.CurrentGain = math.floor(self.CurrentBet * multiplicador)
                        self:UpdateBetValues(self.CurrentHorse, self.CurrentBet, self.PlayerBalance, self.CurrentGain)
                    end
                end

                if (clickedButton == 9) then
                    if (self.CurrentBet > minBet) then
                        self.CurrentBet = (self.CurrentBet - 100)
                        self.CurrentGain = math.floor(self.CurrentBet * multiplicador)
                        self:UpdateBetValues(self.CurrentHorse, self.CurrentBet, self.PlayerBalance, self.CurrentGain)
                    end
                end

                if (clickedButton == 13) then
                    self:ShowMainScreen()
                end

                -- Check race
                while checkRaceStatus do
                    Wait(0)

                    local raceFinished = self:IsRaceFinished()

                    if (raceFinished) then
                        StopSound(self.CurrentSoundId)
                        ReleaseSoundId(self.CurrentSoundId)

                        self.CurrentSoundId = -1

                        if (self.CurrentHorse == self.CurrentWinner) then
                            self.PlayerBalance = (self.PlayerBalance + self.CurrentGain)
                            vSERVER.giveMoneyBet(self.CurrentGain)
                            SendNUIMessage({ action = "playAudio", transactionFile = "chips" })
                            self:UpdateBetValues(self.CurrentHorse, self.CurrentBet, self.PlayerBalance, self.CurrentGain)
                        else
                            vSERVER.lostGame(self.CurrentBet)
                        end
                        
                        self:ShowResults()

                        self.CurrentHorse = -1
                        self.CurrentWinner = -1
                        self.HorsesPositions = {}
                        
                        checkRaceStatus = false
                    end
                end
            end
        end
    end)
end
    
local screenTarget, bigScreenScaleform = -1, -1
local bigScreenCoords = vector3(952.18,85.37,70.04)
local bigScreenRender, isBigScreenLoaded = false, false

local function registerTarget(name, objectModel)
    if not IsNamedRendertargetRegistered(name) then
        RegisterNamedRendertarget(name, false)
        LinkNamedRendertarget(objectModel)
    end

    return GetNamedRendertargetRenderId(name)
end

function loadBigScreen()
    screenTarget = registerTarget("casinoscreen_02", `vw_vwint01_betting_screen`)
    bigScreenScaleform = RequestScaleformMovie('HORSE_RACING_WALL')

    while not HasScaleformMovieLoaded(bigScreenScaleform) do
        Wait(0)
    end

    BeginScaleformMovieMethod(bigScreenScaleform, 'SHOW_SCREEN')
    ScaleformMovieMethodAddParamInt(0)
    EndScaleformMovieMethod()

    SetScaleformFitRendertarget(bigScreenScaleform, true)
    Utils.AddHorses(bigScreenScaleform)

    isBigScreenLoaded = true
end

Citizen.CreateThread(function()
    while not Utils.InsideTrackActive do
        Citizen.Wait(0)

        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local distance = #(playerCoords - bigScreenCoords)

        if (distance <= 30.0) then
            if not isBigScreenLoaded then
                loadBigScreen()
            end

            if not bigScreenRender then
                bigScreenRender = true
            end

            SetTextRenderId(screenTarget)
            SetScriptGfxDrawOrder(4)
            SetScriptGfxDrawBehindPausemenu(true)
            DrawScaleformMovieFullscreen(bigScreenScaleform, 255, 255, 255, 255)
            SetTextRenderId(GetDefaultScriptRendertargetRenderId())
        elseif bigScreenRender then
            bigScreenRender = false
            isBigScreenLoaded = false

            ReleaseNamedRendertarget('casinoscreen_02')
            SetScaleformMovieAsNoLongerNeeded(bigScreenScaleform)
        end
    end
end)

local playing = false

Citizen.CreateThread(function()
    while true do
		local idle = 500
        local ped = PlayerPedId()
        local playerpos = GetEntityCoords(ped)
        local object = GetClosestObjectOfType(playerpos,1.2,-1005355458,0,0,0)
		local coordsobj = GetEntityCoords(object)
		local objHeading = GetEntityHeading(object)
        if DoesEntityExist(object) and not playing and closeToCassino then
			idle = 4
            drawfreameeMarker(coordsobj + vector3(0.0, 0.0, 1.0))
			if IsControlJustPressed(0,38) then
				SITTING_SCENE = NetworkCreateSynchronisedScene(coordsobj, objHeading - 90.0, 2, 1, 0, 1065353216, 0, 1065353216)
				RequestAnimDict('anim_casino_b@amb@casino@games@shared@player@')
				while not HasAnimDictLoaded('anim_casino_b@amb@casino@games@shared@player@') do
					Citizen.Wait(1)
				end
				local randomSit = ({'sit_enter_left', 'sit_enter_right'})[math.random(1, 2)]
				NetworkAddPedToSynchronisedScene(PlayerPedId(),SITTING_SCENE,'anim_casino_b@amb@casino@games@shared@player@',randomSit,2.0,-2.0,13,16,2.0,0)
				NetworkStartSynchronisedScene(SITTING_SCENE)
				
				local sex = 0
				local objrot = GetEntityRotation(object)
				local rot = objrot + vector3(0.0, 0.0, 180.0)
				if GetEntityModel(PlayerPedId()) == GetHashKey('mp_f_freemode_01') then sex = 1 end
				local L = 'anim_casino_a@amb@casino@games@slots@male'
				if sex == 1 then
					L = 'anim_casino_a@amb@casino@games@slots@female'
				end
				RequestAnimDict(L)
				while not HasAnimDictLoaded(L) do
					Citizen.Wait(1)
				end
				SITTING_SCENE = NetworkCreateSynchronisedScene(coordsobj + vector3(-0.2, 0.8, -0.12), rot, 2, 1, 0, 1065353216, 0, 1065353216)
				local rndspin = ({'base_idle_a', 'base_idle_b', 'base_idle_c', 'base_idle_d', 'base_idle_e', 'base_idle_f'})[math.random(1, 6)]
				NetworkAddPedToSynchronisedScene(PlayerPedId(),SITTING_SCENE,L,rndspin,2.0,2.0,13,16,2.0,0)
				NetworkStartSynchronisedScene(SITTING_SCENE)
				Citizen.Wait(1200)
				local Offset = GetObjectOffsetFromCoords(GetEntityCoords(object), GetEntityHeading(object), 0.0, -0.5, 0.6)
				local CamOffset = GetObjectOffsetFromCoords(GetEntityCoords(object), GetEntityHeading(object), 0.0, -0.5, 0.6)

				local Camposition = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', CamOffset.x, CamOffset.y, CamOffset.z+0.8, rot.x-25.0, rot.y, rot.z, 85.0, true, 2)
				SetCamActive(Camposition, true)
				ShakeCam(Camposition, 'HAND_SHAKE', 0.3)
				RenderScriptCams(true, 900, 900, true, false)
                Citizen.Wait(1200)
                OpenInsideTrack()
                playing = true
				Citizen.Wait(3000)

				-- Voltar a camera
                RenderScriptCams(false, 900, 900, true, false)
				if DoesCamExist(Camposition) then
					DestroyCam(Camposition, false)
				end
			end
        end
        Citizen.Wait(idle)
    end
end)
SetPlayerControl(PlayerId(), true, 0)

RegisterNetEvent("InsideTrack:LeaveInsideTrack")
AddEventHandler("InsideTrack:LeaveInsideTrack",function()
    local ped = PlayerPedId()
    local playerpos = GetEntityCoords(ped)
    FreezeEntityPosition(ped, false)
    SetEntityCoords(ped, playerpos.x, playerpos.y - 0.43, playerpos.z + 0.15, 1, 0, 0 , true)
    Citizen.Wait(200)
    RenderScriptCams(false, 900, 900, true, false)
    --DoScreenFadeOut(500)
    playing = false
    Citizen.Wait(600)
    LeaveInsideTrack()
    ClearPedTasks(GetPlayerPed(-1))
    ClearPedSecondaryTask(ped)
end)