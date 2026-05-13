Translations = {}

function translat(str, ...) -- Translate string
    if Translations['br'] ~= nil then
        if Translations['br'][str] ~= nil then
            return string.format(Translations['br'][str], ...)
        end
    end
end

function translate(str, ...) -- Translate string first char uppercase
    return tostring(translat(str, ...):gsub('^%l', string.upper))
end

Translations['br'] = {
    -- notifications
    ['chair_occupied'] = 'Essa cadeira está ocupada.',
    ['no_react'] = 'Você não respondeu ao Dealer no tempo, sua mão passou.',
    ['no_bet_input'] = 'Você não colocou uma aposta.',
    ['not_enough_chips'] = 'Você não possui fichas suficientes.',
    ['not_enough_chips_next'] = 'Você não possui fichas suficientes para apostar no Pair Plus.',
    ['not_enough_chips_third'] = 'Você não possui fichas suficientes para apostar.',
    ['not_enough_chips_toplay'] = 'Você não possui fichas suficientes para apostar!',
    ['already_betted'] = 'Você já apostou.',
    ['lose'] = 'Você perdeu!',
    -- formatted notif
    ['dealer_not_qual'] = 'Empate.\nVocê ganhou %s fichas de volta.',
    ['dealer_not_qual_ante'] = 'Empate.\nVocê ganhou %s fichas de volta. (Ante multiplicador: x%s)',
    ['player_won_ante'] = 'Você ganhou!\n%s fichas. (Ante multiplicador: x%s)',
    ['player_won'] = 'Você ganhou %s fichas.',
    ['pair_won'] = 'Você ganhou %s fichas. Pair Plus! (Pair multiplicador: x%s)',
    -- hud
    ['current_bet_input'] = 'APOSTA:',
    ['current_player_chips'] = 'FICHAS:',
    ['table_min_max'] = 'MIN/MAX:',
    ['remaining_time'] = 'TEMPO:',
    -- top left
    ['waiting_for_players'] = 'Esperando por ~b~jogadores~w~...\n',
    ['clearing_table'] = 'Limpando a mesa.\n~b~Proximo jogo começa em breve.\n',
    ['dealer_showing_hand'] = 'O ~r~Dealer~w~ está mostrando sua mão.\n',
    ['players_showing_hands'] = 'Revelando mão dos jogadores.\n',
    ['dealing_cards'] = 'Entregando cartas.\n',
    -- inputs
    ['fold_cards'] = 'Correr',
    ['play_cards'] = 'Jogar',
    ['leave_game'] = 'Deixar jogo',
    ['raise_bet'] = 'Aumentar aposta',
    ['reduce_bet'] = 'Reduzir aposta',
    ['custom_bet'] = 'Aposta personalizada',
    ['place_bet'] = 'Colocar aposta',
    ['place_pair_bet'] = 'Colocar Pair Plus aposta',
    -- gtao ui
    ['tcp'] = '~b~Three Card Poker',
    ['sit_down_table'] = '~h~<C>Jogar</C> ~b~Three Card Poker',
    ['description'] = 'Game Description',
    ['desc_1'] = 'TCP_DIS1', -- this is Rockstar Setuped default, this will automaticly change if you are using german language etc.
    ['desc_2'] = 'TCP_DIS2',
    ['desc_3'] = 'TCP_DIS3',
    ['description_info'] = 'Como o jogo funciona?',
    ['rule_1'] = 'TCP_RULE_1',
    ['rule_2'] = 'TCP_RULE_2',
    ['rule_3'] = 'TCP_RULE_3',
    ['rule_4'] = 'TCP_RULE_4',
    ['rule_5'] = 'TCP_RULE_5',
    ['rule_header_1'] = 'TCP_RULE_1T',
    ['rule_header_2'] = 'TCP_RULE_2T',
    ['rule_header_3'] = 'TCP_RULE_3T',
    ['rule_header_4'] = 'TCP_RULE_4T',
    ['rule_header_5'] = 'TCP_RULE_5T',
    ['rules'] = 'Regras do jogo',
    ['rules_info'] = 'Regras do jogo.',
    ['limit_exceed'] = 'Sua aposta é muito pequena, ou muito grande para essa mesa.',
    ['invalid_bet'] = 'Quantidade invalida.',
    ['chair_used'] = 'Essa cadeira está ocupada.',
    ['can_not_bet_because_started'] = 'O jogo já começou, você não pode apostar no momento.',
    ['input_place_bet'] = 'Quantas fichas deseja apostar?',
    -- help msg
    ['help_sit_rulett'] = '~INPUT_CONTEXT~ Sentar na mesa.',
    ['help_rulett_all'] = '~INPUT_CELLPHONE_CANCEL~ Levantar-se\n~INPUT_CONTEXT~ Mudar camera\n~INPUT_LOOK_LR~ Selecionar numero\n~INPUT_ATTACK~ Apostar numero\n~INPUT_CELLPHONE_UP~ Aumentar aposta\n~INPUT_CELLPHONE_DOWN~ Diminuir aposta\n~INPUT_JUMP~ Aposta personalizada',
    -- nui
    ['starting_soon'] = 'O jogo começa em instantes..',
    ['game_going_on'] = 'O jogo está em progresso..',
    ['seconds'] = 'segundos.',
    -- formatted msg
    ['won_chips'] = 'Você ganhou %s fichas. Multiplicador: x%s',
    ['placed_bet'] = 'Aposta de %s fichas feita.'
}


SharedPokers = {}
closeToPokers = false

local mainScene = nil -- the main sitting scene, we need it globally, for the exit
local activePokerTable = nil -- current table Id where we are sitting
local activeChairData = nil -- chair data, it is a table with rotation and coords
local currentBetInput = 0 -- currently bet input
local playerBetted = nil -- important, because when it changes to TRUE, we are disabling the standup, etc
local playerPairPlus = nil -- pair plus bet amount
local watchingCards = false -- for the notification and other inputs
local playerDecidedChoice = false

local clientTimer = nil
local currentHelpText = nil

local mainCamera = nil

local buttonScaleform = nil

local networkedChips = {}

local PlayerOwnedChips = 0

local InformationPlaying = false

local playedHudSound = false

local frm_showed = false

-- EVENTS
RegisterNetEvent('aquiverPoker:updateCards')
RegisterNetEvent('aquiverPoker:updateState')
RegisterNetEvent('aquiverPoker:playerBetAnim')
RegisterNetEvent('aquiverPoker:Stage:1')
RegisterNetEvent('aquiverPoker:Stage:2')
RegisterNetEvent('aquiverPoker:Stage:3')
RegisterNetEvent('aquiverPoker:Stage:4')
RegisterNetEvent('aquiverPoker:playerPlayCards')
RegisterNetEvent('aquiverPoker:playerFoldCards')
RegisterNetEvent('aquiverPoker:Stage:5')
RegisterNetEvent('aquiverPoker:Stage:6')
RegisterNetEvent('aquiverPoker:Stage:7')
RegisterNetEvent('aquiverPoker:resetTable')
RegisterNetEvent('aquiverPoker:playerWin')
RegisterNetEvent('aquiverPoker:playerLost')
RegisterNetEvent('aquiverPoker:playerDraw')
RegisterNetEvent('aquiverPoker:updatePlayerChips')
RegisterNetEvent('aquiverPoker:playerPairPlusAnim')
RegisterNetEvent('aquiverPoker:sitDown:client')
----------------------

AddEventHandler(
    'aquiverPoker:sitDown:client',
    function(tableId, chairId, chairCoords, chairRotation)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].sitDownCallback(chairId, chairCoords, chairRotation)
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerPairPlusAnim',
    function(amount)
        if SharedPokers[activePokerTable] ~= nil then
            SharedPokers[activePokerTable].playerPairPlusAnim(amount)
        end
    end
)

AddEventHandler(
    'aquiverPoker:updateCards',
    function(tableId, Cards)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].updateCards(Cards)
        end
    end
)

AddEventHandler(
    'aquiverPoker:updateState',
    function(tableId, Active, TimeLeft)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].updateState(Active, TimeLeft)
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerBetAnim',
    function(amount)
        if SharedPokers[activePokerTable] ~= nil then
            SharedPokers[activePokerTable].playerBetAnim(amount)
        end
    end
)

AddEventHandler(
    'aquiverPoker:updatePlayerChips',
    function(amount)
        if amount ~= nil then
            PlayerOwnedChips = amount
        else
            Main.DebugMsg('Error in: aquiverPoker:updatePlayerChips. (Your param[amount] is nil)')
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerDraw',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].playerDraw()
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerLost',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].playerLost()
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerWin',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].playerWin()
        end
    end
)

AddEventHandler(
    'aquiverPoker:resetTable',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].resetTable()
        end
    end
)

AddEventHandler(
    'aquiverPoker:Stage:7',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = translate('clearing_table')

            SharedPokers[tableId].clearTable()
        end
    end
)
AddEventHandler(
    'aquiverPoker:Stage:6',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = translate('dealer_showing_hand')
            SharedPokers[tableId].revealSelfCards()
        end
    end
)
AddEventHandler(
    'aquiverPoker:Stage:5',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = translate('players_showing_hands')
            SharedPokers[tableId].revealPlayerCards()
        end
    end
)

AddEventHandler(
    'aquiverPoker:Stage:1',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].FirstAction()
        end
    end
)

AddEventHandler(
    'aquiverPoker:Stage:2',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = translate('dealing_cards')
            SharedPokers[tableId].dealToPlayers()
        end
    end
)
AddEventHandler(
    'aquiverPoker:Stage:3',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = nil
            SharedPokers[tableId].dealToSelf()
            SharedPokers[tableId].putDownDeck()
            SharedPokers[tableId].dealerStandingIdle()
        end
    end
)

AddEventHandler(
    'aquiverPoker:Stage:4',
    function(tableId)
        if SharedPokers[tableId] ~= nil then
            currentHelpText = nil
            SharedPokers[tableId].watchCards()
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerPlayCards',
    function(mainSrc, tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].playCards(mainSrc)
        end
    end
)

AddEventHandler(
    'aquiverPoker:playerFoldCards',
    function(mainSrc, tableId)
        if SharedPokers[tableId] ~= nil then
            SharedPokers[tableId].foldCards(mainSrc)
        end
    end
)

GroupDigits = function(value)
    local left, num, right = string.match(value, '^([^%d]*%d)(%d*)(.-)$')

    return left .. (num:reverse():gsub('(%d%d%d)', '%1' .. ','):reverse()) .. right
end

ShowHelpNotification = function(msg, thisFrame, beep, duration)
    AddTextEntry('aquiverNotification', msg)

    if thisFrame then
        DisplayHelpTextThisFrame('aquiverNotification', false)
    else
        if beep == nil then
            beep = true
        end
        BeginTextCommandDisplayHelp('aquiverNotification')
        EndTextCommandDisplayHelp(0, false, beep, duration or -1)
    end
end

ShowNotification = function(msg)
    SetNotificationTextEntry('STRING')
    AddTextComponentString(msg)
    DrawNotification(0, 1)
end

AquiverPoker = function(index, data)
    local self = {}

    self.index = index
    self.data = data

    self.cards = {}

    self.playersFolded = {}

    self.updateCards = function(Cards)
        self.ServerCards = Cards
    end

    self.updateState = function(Active, TimeLeft)
        self.Active = Active
        self.TimeLeft = TimeLeft
    end

    self.playerDraw = function()
        SendNUIMessage({
            action = "showGame",
            game = "Poker",
            currentBet = 0
        })
        local pedReaction = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            local pedr = ({'female_dealer_reaction_impartial_var01', 'female_dealer_reaction_impartial_var02', 'female_dealer_reaction_impartial_var03'})[math.random(1, 3)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            local pedr = ({'reaction_impartial_var_01', 'reaction_impartial_var_02', 'reaction_impartial_var_03', 'reaction_impartial_var_04'})[math.random(1, 4)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        end
    end

    self.playerWin = function()
        local reaction = nil
        if GetEntityModel(PlayerPedId()) == GetHashKey('mp_f_freemode_01') then -- female
            reaction =
                ({
                'female_reaction_great_var_01',
                'female_reaction_great_var_02',
                'female_reaction_great_var_03',
                'female_reaction_great_var_04',
                'female_reaction_great_var_05'
            })[math.random(1, 5)]
        else
            reaction = ({'reaction_great_var_01', 'reaction_great_var_02', 'reaction_great_var_03', 'reaction_great_var_04'})[math.random(1, 4)]
        end

        if reaction then
            local reactionScene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), reactionScene, Main.PlayerAnimDictShared, reaction, 2.0, -2.0, 13, 16, 2.0, 0)
            NetworkStartSynchronisedScene(reactionScene)
        end
        SendNUIMessage({ action = "playAudio", transactionFile = "chips" })
        local pedReaction = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            local pedr = ({'female_dealer_reaction_bad_var01', 'female_dealer_reaction_bad_var02', 'female_dealer_reaction_bad_var03'})[math.random(1, 3)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            local pedr = ({'reaction_bad_var_01', 'reaction_bad_var_02', 'reaction_bad_var_03', 'reaction_bad_var_04'})[math.random(1, 4)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        SendNUIMessage({
            action = "showGame",
            game = "Poker",
            currentBet = 0
        })
    end

    self.playerLost = function()
        local reaction = nil
        if GetEntityModel(PlayerPedId()) == GetHashKey('mp_f_freemode_01') then -- female
            reaction =
                ({
                'female_reaction_terrible_var_01',
                'female_reaction_terrible_var_02',
                'female_reaction_terrible_var_03',
                'female_reaction_terrible_var_04',
                'female_reaction_terrible_var_05'
            })[math.random(1, 5)]
        else
            reaction = ({'reaction_terrible_var_01', 'reaction_terrible_var_02', 'reaction_terrible_var_03', 'reaction_terrible_var_04'})[math.random(1, 4)]
        end

        if reaction then
            local reactionScene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), reactionScene, Main.PlayerAnimDictShared, reaction, 2.0, -2.0, 13, 16, 2.0, 0)
            NetworkStartSynchronisedScene(reactionScene)
        end

        local pedReaction = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            local pedr = ({'female_dealer_reaction_good_var01', 'female_dealer_reaction_good_var02', 'female_dealer_reaction_good_var03'})[math.random(1, 3)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            local pedr = ({'reaction_good_var_01', 'reaction_good_var_02', 'reaction_good_var_03'})[math.random(1, 3)]
            TaskSynchronizedScene(self.ped, pedReaction, Main.DealerAnimDictShared, pedr, 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        SendNUIMessage({
            action = "showGame",
            game = "Poker",
            currentBet = 0
        })
    end

    self.speakPed = function(duma)
        Citizen.CreateThread(
            function()
                PlayPedAmbientSpeechNative(self.ped, duma, 'SPEECH_PARAMS_FORCE_NORMAL_CLEAR', 1)
            end
        )
    end

    self.createDefaultPakli = function()
        Citizen.CreateThread(
            function()
                local cardModel = GetHashKey('vw_prop_casino_cards_01')
                RequestModel(cardModel)
                while not HasModelLoaded(cardModel) do
                    Citizen.Wait(1)
                end

                RequestAnimDict(Main.DealerAnimDictPoker)
                while not HasAnimDictLoaded(Main.DealerAnimDictPoker) do
                    Citizen.Wait(1)
                end

                local offset = GetAnimInitialOffsetPosition(Main.DealerAnimDictPoker, 'deck_pick_up_deck', self.data.Position, 0.0, 0.0, self.data.Heading, 0.01, 2)
                self.pakli = CreateObject(cardModel, offset, false, false, true)
                SetEntityCoordsNoOffset(self.pakli, offset, false, false, true)
                SetEntityRotation(self.pakli, 0.0, 0.0, self.data.Rotation, 2, true)
                FreezeEntityPosition(self.pakli, true)
            end
        )
    end

    self.isPedFemale = function()
        if GetEntityModel(self.ped) == GetHashKey('S_M_Y_Casino_01') then
            return false
        else
            return true
        end
    end

    self.createPed = function()
        Citizen.CreateThread(
            function()
                local maleCasinoDealer = GetHashKey('S_M_Y_Casino_01')
                local femaleCasinoDealer = GetHashKey('S_F_Y_Casino_01')

                local frmVar_1 = math.random(1, 13)
                if frmVar_1 < 7 then
                    dealerModel = maleCasinoDealer
                else
                    dealerModel = femaleCasinoDealer
                end

                RequestModel(dealerModel)
                while not HasModelLoaded(dealerModel) do
                    Citizen.Wait(1)
                end

                self.ped = CreatePed(26, dealerModel, self.data.Position, self.data.Heading, false, true)
                table.insert(dealerPeds,self.ped)
                SetModelAsNoLongerNeeded(dealerModel)
                SetEntityCanBeDamaged(self.ped, false)
                SetPedAsEnemy(self.ped, false)
                SetBlockingOfNonTemporaryEvents(self.ped, true)
                SetPedResetFlag(self.ped, 249, 1)
                SetPedCanEvasiveDive(self.ped, 0)
                SetPedCanRagdollFromPlayerImpact(self.ped, 0)
                SetPedCanRagdoll(self.ped, false)

                frm_setPedClothes(frmVar_1, self.ped)
                frm_setPedVoiceGroup(frmVar_1, self.ped)

                SetEntityCoordsNoOffset(self.ped, self.data.Position + vector3(0.0, 0.0, 1.0), false, false, true)
                SetEntityHeading(self.ped, self.data.Heading)

                RequestAnimDict(Main.DealerAnimDictShared)
                while not HasAnimDictLoaded(Main.DealerAnimDictShared) do
                    Citizen.Wait(1)
                end

                self.dealerStandingIdle()

                Main.DebugMsg('Poker ped created.')
            end
        )
    end

    self.sitDownCallback = function(chairId, chairCoords, chairRotation)
        activeChairData = {
            chairId = chairId,
            chairCoords = chairCoords,
            chairRotation = chairRotation
        }

        if GetEntityModel(PlayerPedId()) == GetHashKey('mp_m_freemode_01') then
            local rspeech = math.random(1, 2)
            if rspeech == 1 then
                self.speakPed('MINIGAME_DEALER_GREET')
            else
                self.speakPed('MINIGAME_DEALER_GREET_MALE')
            end
        else
            local rspeech = math.random(1, 2)
            if rspeech == 1 then
                self.speakPed('MINIGAME_DEALER_GREET')
            else
                self.speakPed('MINIGAME_DEALER_GREET_FEMALE')
            end
        end

        RequestAnimDict(Main.PlayerAnimDictShared)
        while not HasAnimDictLoaded(Main.PlayerAnimDictShared) do
            Citizen.Wait(1)
        end
        SetPlayerControl(PlayerPedId(), 0, 0)
        local sitScene = NetworkCreateSynchronisedScene(chairCoords, chairRotation, 2, true, false, 1.0, 0.0, 1.0)
        local sitAnim = ({'sit_enter_left_side', 'sit_enter_right_side'})[math.random(1, 2)]
        NetworkAddPedToSynchronisedScene(PlayerPedId(), sitScene, Main.PlayerAnimDictShared, sitAnim, 2.0, -2.0, 13, 16, 2.0, 0)
        NetworkStartSynchronisedScene(sitScene)

        Citizen.Wait(4000)
        mainScene = NetworkCreateSynchronisedScene(chairCoords, chairRotation, 2, true, false, 1.0, 0.0, 1.0)
        NetworkAddPedToSynchronisedScene(PlayerPedId(), mainScene, Main.PlayerAnimDictShared, 'idle_cardgames', 2.0, -2.0, 13, 16, 1000.0, 0)
        NetworkStartSynchronisedScene(mainScene)

        self.EnableRender(true)
        SetPlayerControl(PlayerPedId(), 1, 0)

        Citizen.Wait(500)
    end

    self.sitDown = function(chairId, chairCoords, chairRotation)
        StartAudioScene('DLC_VW_Casino_Table_Games')

        if not IsEntityDead(PlayerPedId()) then
            TriggerServerEvent('aquiverPoker:sitDown:server', self.index, chairId, chairCoords, chairRotation)
        end
    end

    self.createCard = function(cardName)
        local cardModel = GetHashKey(cardName)
        RequestModel(cardModel)
        while not HasModelLoaded(cardModel) do
            Citizen.Wait(1)
        end

        return CreateObject(cardModel, self.data.Position, false, true, true)
    end

    self.FirstAction = function()
        self.speakPed('MINIGAME_DEALER_CLOSED_BETS')

        -- FIRST ACTION TO DO WHEN STARTING GAME
        RequestAnimDict(Main.DealerAnimDictPoker)
        while not HasAnimDictLoaded(Main.DealerAnimDictPoker) do
            Citizen.Wait(1)
        end

        local firstScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)

        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, firstScene, Main.DealerAnimDictPoker, 'female_deck_pick_up', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, firstScene, Main.DealerAnimDictPoker, 'deck_pick_up', 2.0, -2.0, 13, 16, 1000.0, 0)
        end

        while GetSynchronizedScenePhase(firstScene) < 0.99 do
            if HasAnimEventFired(self.ped, 1691374422) then
                if not IsEntityAttachedToAnyPed(self.pakli) then
                    FreezeEntityPosition(self.pakli, false)
                    AttachEntityToEntity(self.pakli, self.ped, GetPedBoneIndex(self.ped, 60309), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true)
                end
            end

            Citizen.Wait(1)
        end

        if self.ServerCards['dealer'] ~= nil then
            self.cards['dealer'] = {}

            if not DoesEntityExist(self.cards['dealer'][1]) then
                self.cards['dealer'][1] = self.createCard(Main.Cards[self.ServerCards['dealer'].Hand[1]])
            end
            if not DoesEntityExist(self.cards['dealer'][2]) then
                self.cards['dealer'][2] = self.createCard(Main.Cards[self.ServerCards['dealer'].Hand[2]])
            end
            if not DoesEntityExist(self.cards['dealer'][3]) then
                self.cards['dealer'][3] = self.createCard(Main.Cards[self.ServerCards['dealer'].Hand[3]])
            end
        end

        local secondScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, secondScene, Main.DealerAnimDictPoker, 'female_deck_shuffle', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, secondScene, Main.DealerAnimDictPoker, 'deck_shuffle', 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        PlaySynchronizedEntityAnim(self.cards['dealer'][1], secondScene, 'deck_shuffle_card_a', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        PlaySynchronizedEntityAnim(self.cards['dealer'][2], secondScene, 'deck_shuffle_card_b', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        PlaySynchronizedEntityAnim(self.cards['dealer'][3], secondScene, 'deck_shuffle_card_c', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)

        while GetSynchronizedScenePhase(secondScene) < 0.99 do
            Citizen.Wait(1)
        end

        SetEntityVisible(self.cards['dealer'][1], false, false)
        SetEntityVisible(self.cards['dealer'][2], false, false)
        SetEntityVisible(self.cards['dealer'][3], false, false)

        local thirdScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, thirdScene, Main.DealerAnimDictPoker, 'female_deck_idle', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, thirdScene, Main.DealerAnimDictPoker, 'deck_idle', 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        while GetSynchronizedScenePhase(thirdScene) < 0.99 do
            Citizen.Wait(1)
        end
    end

    self.dealToPlayers = function()
        StartAudioScene('DLC_VW_Casino_Cards_Focus_Hand')
        StartAudioScene('DLC_VW_Casino_Table_Games')

        buttonScaleform = nil
        Main.DebugMsg('dealing to players')
        -- SECOND ACTIONS TO DO, THERE CAN BE MORE PLAYERS!
        for targetSrc, data in pairs(self.ServerCards) do
            if targetSrc ~= 'dealer' then
                self.cards[targetSrc] = {}
                self.cards[targetSrc][1] = self.createCard(Main.Cards[data.Hand[1]])
                self.cards[targetSrc][2] = self.createCard(Main.Cards[data.Hand[2]])
                self.cards[targetSrc][3] = self.createCard(Main.Cards[data.Hand[3]])

                RequestAnimDict(Main.DealerAnimDictPoker)
                while not HasAnimDictLoaded(Main.DealerAnimDictPoker) do
                    Citizen.Wait(1)
                end

                local playerAnimId = nil

                if data.chairData.chairId == 4 then -- this is reverse because rockstar think differently no idea why
                    playerAnimId = 'p01'
                elseif data.chairData.chairId == 3 then
                    playerAnimId = 'p02'
                elseif data.chairData.chairId == 2 then
                    playerAnimId = 'p03'
                elseif data.chairData.chairId == 1 then
                    playerAnimId = 'p04'
                end

                if playerAnimId ~= nil then
                    local dealScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)

                    SetEntityVisible(self.cards[targetSrc][1], false, false)
                    SetEntityVisible(self.cards[targetSrc][2], false, false)
                    SetEntityVisible(self.cards[targetSrc][3], false, false)

                    if self.isPedFemale() then
                        TaskSynchronizedScene(self.ped, dealScene, Main.DealerAnimDictPoker, string.format('female_deck_deal_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                    else
                        TaskSynchronizedScene(self.ped, dealScene, Main.DealerAnimDictPoker, string.format('deck_deal_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                    end

                    PlaySynchronizedEntityAnim(
                        self.cards[targetSrc][1],
                        dealScene,
                        string.format('deck_deal_%s_card_a', playerAnimId),
                        Main.DealerAnimDictPoker,
                        1000.0,
                        0,
                        0,
                        1000.0
                    )
                    PlaySynchronizedEntityAnim(
                        self.cards[targetSrc][2],
                        dealScene,
                        string.format('deck_deal_%s_card_b', playerAnimId),
                        Main.DealerAnimDictPoker,
                        1000.0,
                        0,
                        0,
                        1000.0
                    )
                    PlaySynchronizedEntityAnim(
                        self.cards[targetSrc][3],
                        dealScene,
                        string.format('deck_deal_%s_card_c', playerAnimId),
                        Main.DealerAnimDictPoker,
                        1000.0,
                        0,
                        0,
                        1000.0
                    )

                    while GetSynchronizedScenePhase(dealScene) < 0.05 do
                        Citizen.Wait(1)
                    end

                    SetEntityVisible(self.cards[targetSrc][1], true, false)
                    SetEntityVisible(self.cards[targetSrc][2], true, false)
                    SetEntityVisible(self.cards[targetSrc][3], true, false)

                    while GetSynchronizedScenePhase(dealScene) < 0.99 do
                        Citizen.Wait(1)
                    end
                end
            end
        end
        Main.DebugMsg('dealing ended')
    end

    self.watchCards = function()
        self.speakPed('MINIGAME_DEALER_COMMENT_SLOW')

        if self.index == activePokerTable and playerBetted ~= nil then
            clientTimer = Main.PlayerDecideTime
            Citizen.CreateThread(
                function()
                    while clientTimer ~= nil do
                        Citizen.Wait(1000)
                        if clientTimer ~= nil then
                            clientTimer = clientTimer - 1

                            if clientTimer < 1 then
                                clientTimer = nil
                                ShowNotification(translate('no_react'))
                                TriggerServerEvent('aquiverPoker:foldCards', self.index)
                            end
                        end
                    end
                end
            )
        end

        RequestAnimDict(Main.PlayerAnimDictPoker)
        while not HasAnimDictLoaded(Main.PlayerAnimDictPoker) do
            Citizen.Wait(1)
        end

        for targetSrc, data in pairs(self.ServerCards) do
            if targetSrc ~= 'dealer' then
                -- if we are the player, we call it once
                if GetPlayerServerId(PlayerId()) == targetSrc and self.index == activePokerTable then
                    local scene = NetworkCreateSynchronisedScene(data.chairData.chairCoords, data.chairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
                    NetworkAddPedToSynchronisedScene(PlayerPedId(), scene, Main.PlayerAnimDictPoker, 'cards_pickup', 2.0, -2.0, 13, 16, 1000.0, 0)
                    NetworkStartSynchronisedScene(scene)
                    SendNUIMessage({
                        action = "showGame",
                        game = "Poker",
                        secondStep = true
                    })
                    Citizen.CreateThread(
                        function()
                            Citizen.Wait(1500)
                            watchingCards = true
                            ShakeGameplayCam('HAND_SHAKE', 0.15)
                            -- buttonScaleform = setupThirdButtons('instructional_buttons')

                            local playerHandValue = Main.getHandAllValues(data.Hand)
                            if playerHandValue ~= nil then
                                Main.DebugMsg(string.format('Player hand value: %s', playerHandValue))
                                local form = Main.formatHandValue(playerHandValue)
                                if form ~= nil then
                                    Citizen.CreateThread(
                                        function()
                                            while watchingCards do
                                                Citizen.Wait(0)

                                                drawText2d(0.5, 0.9, 0.45, form)
                                            end
                                        end
                                    )
                                end
                            end
                        end
                    )
                end

                local cardsScene = CreateSynchronizedScene(data.chairData.chairCoords + vector3(0.0, 0.0, 0.01), data.chairData.chairRotation, 2)

                PlaySynchronizedEntityAnim(self.cards[targetSrc][1], cardsScene, 'cards_pickup_card_a', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
                PlaySynchronizedEntityAnim(self.cards[targetSrc][2], cardsScene, 'cards_pickup_card_b', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
                PlaySynchronizedEntityAnim(self.cards[targetSrc][3], cardsScene, 'cards_pickup_card_c', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            end
        end
    end

    self.foldCards = function(mainSrc)
        self.playersFolded[mainSrc] = true

        if GetPlayerServerId(PlayerId()) == mainSrc then
            local scene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), scene, Main.PlayerAnimDictPoker, 'cards_fold', 2.0, -2.0, 13, 16, 1000.0, 0)
            NetworkStartSynchronisedScene(scene)
            playerDecidedChoice = true
            watchingCards = false
            buttonScaleform = nil
            StopGameplayCamShaking(true)
        end

        if self.cards[mainSrc] ~= nil then
            local chairData = self.ServerCards[mainSrc].chairData
            local cardsScene = CreateSynchronizedScene(chairData.chairCoords + vector3(0.0, 0.0, 0.01), chairData.chairRotation, 2)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][1], cardsScene, 'cards_fold_card_a', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][2], cardsScene, 'cards_fold_card_b', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][3], cardsScene, 'cards_fold_card_c', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        end
    end

    self.playCards = function(mainSrc)
        if GetPlayerServerId(PlayerId()) == mainSrc then
            playerDecidedChoice = true
            watchingCards = false
            buttonScaleform = nil
            StopGameplayCamShaking(true)

            Citizen.CreateThread(
                function()
                    local scene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
                    NetworkAddPedToSynchronisedScene(PlayerPedId(), scene, Main.PlayerAnimDictPoker, 'cards_play', 2.0, -2.0, 13, 16, 1000.0, 0)
                    NetworkStartSynchronisedScene(scene)

                    while not HasAnimEventFired(PlayerPedId(), -1424880317) do
                        Citizen.Wait(1)
                    end

                    local nextScene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
                    NetworkAddPedToSynchronisedScene(PlayerPedId(), nextScene, Main.PlayerAnimDictPoker, 'cards_bet', 2.0, -2.0, 13, 16, 1000.0, 0)
                    NetworkStartSynchronisedScene(nextScene)

                    Citizen.Wait(500)

                    local offsetAlign = nil
                    if activeChairData.chairId == 4 then
                        offsetAlign = vector3(0.689125, 0.171575, 0.954)
                    elseif activeChairData.chairId == 3 then
                        offsetAlign = vector3(0.2869, -0.211925, 0.954)
                    elseif activeChairData.chairId == 2 then
                        offsetAlign = vector3(-0.30935, -0.205675, 0.954)
                    elseif activeChairData.chairId == 1 then
                        offsetAlign = vector3(-0.69795, 0.211525, 0.954)
                    end

                    if offsetAlign == nil then
                        Main.DebugMsg('Something error happened during the playCards function.')
                        return
                    end
                    local offset = GetObjectOffsetFromCoords(self.data.Position, self.data.Heading, offsetAlign)
                    local chipModel = getChipModelByAmount(playerBetted)
                    RequestModel(chipModel)
                    while not HasModelLoaded(chipModel) do
                        Citizen.Wait(1)
                    end

                    local chipObj = CreateObjectNoOffset(chipModel, offset, true, false, true)
                    SetEntityCoordsNoOffset(chipObj, offset, false, false, true)
                    SetEntityHeading(chipObj, GetEntityHeading(PlayerPedId()))
                    table.insert(networkedChips, chipObj)

                    while not HasAnimEventFired(PlayerPedId(), -1424880317) do
                        Citizen.Wait(1)
                    end

                    self.playerRandomIdleAnim()
                end
            )
        end

        if self.cards[mainSrc] ~= nil and self.ServerCards[mainSrc] ~= nil then
            local chairData = self.ServerCards[mainSrc].chairData
            local cardsScene = CreateSynchronizedScene(chairData.chairCoords + vector3(0.0, 0.0, 0.01), chairData.chairRotation, 2)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][1], cardsScene, 'cards_play_card_a', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][2], cardsScene, 'cards_play_card_b', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards[mainSrc][3], cardsScene, 'cards_play_card_c', Main.PlayerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        end
    end

    self.playerRandomIdleAnim = function()
        local selectedIdleAnim = nil

        if GetEntityModel(PlayerPedId()) == GetHashKey('mp_f_freemode_01') then -- female
            local fmlIdles = {
                'female_idle_cardgames_var_01',
                'female_idle_cardgames_var_02',
                'female_idle_cardgames_var_03',
                'female_idle_cardgames_var_04',
                'female_idle_cardgames_var_05',
                'female_idle_cardgames_var_06',
                'female_idle_cardgames_var_07',
                'female_idle_cardgames_var_08'
            }
            selectedIdleAnim = fmlIdles[math.random(1, 8)]
        else -- male or UFO
            local mlIdles = {
                'idle_cardgames_var_01',
                'idle_cardgames_var_02',
                'idle_cardgames_var_03',
                'idle_cardgames_var_04',
                'idle_cardgames_var_05',
                'idle_cardgames_var_06',
                'idle_cardgames_var_07',
                'idle_cardgames_var_08',
                'idle_cardgames_var_09',
                'idle_cardgames_var_10',
                'idle_cardgames_var_11',
                'idle_cardgames_var_12',
                'idle_cardgames_var_13'
            }
            selectedIdleAnim = mlIdles[math.random(1, 13)]
        end

        if selectedIdleAnim ~= nil then
            local playerIdleScene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), playerIdleScene, Main.PlayerAnimDictShared, selectedIdleAnim, 2.0, -2.0, 13, 16, 1000.0, 0)
            NetworkStartSynchronisedScene(playerIdleScene)

            while not HasAnimEventFired(PlayerPedId(), -1424880317) do
                Citizen.Wait(1)
            end

            local playerIdleScene2 = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), playerIdleScene2, Main.PlayerAnimDictShared, 'idle_cardgames', 2.0, -2.0, 13, 16, 1000.0, 0)
            NetworkStartSynchronisedScene(playerIdleScene2)
        end
    end

    self.dealToSelf = function()
        Main.DebugMsg('dealing dealer cards.')
        local dealSelfScene = CreateSynchronizedScene(self.data.Position + vector3(0.0, 0.0, 0.01), 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, dealSelfScene, Main.DealerAnimDictPoker, 'female_deck_deal_self', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, dealSelfScene, Main.DealerAnimDictPoker, 'deck_deal_self', 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        PlaySynchronizedEntityAnim(self.cards['dealer'][1], dealSelfScene, 'deck_deal_self_card_a', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        PlaySynchronizedEntityAnim(self.cards['dealer'][2], dealSelfScene, 'deck_deal_self_card_b', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        PlaySynchronizedEntityAnim(self.cards['dealer'][3], dealSelfScene, 'deck_deal_self_card_c', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)

        while GetSynchronizedScenePhase(dealSelfScene) < 0.05 do
            Citizen.Wait(1)
        end

        SetEntityVisible(self.cards['dealer'][1], true, false)
        SetEntityVisible(self.cards['dealer'][2], true, false)
        SetEntityVisible(self.cards['dealer'][3], true, false)

        while GetSynchronizedScenePhase(dealSelfScene) < 0.99 do
            Citizen.Wait(1)
        end
    end

    self.dealerStandingIdle = function()
        local scene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, scene, Main.DealerAnimDictShared, 'female_idle', 1000.0, -2.0, -1.0, 33, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, scene, Main.DealerAnimDictShared, 'idle', 1000.0, -2.0, -1.0, 33, 1000.0, 0)
        end
    end

    self.putDownDeck = function()
        local scene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, scene, Main.DealerAnimDictPoker, 'female_deck_put_down', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, scene, Main.DealerAnimDictPoker, 'deck_put_down', 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        while GetSynchronizedScenePhase(scene) < 0.99 do
            Citizen.Wait(1)
        end

        if IsEntityAttachedToAnyPed(self.pakli) then
            DetachEntity(self.pakli, true, true)
            FreezeEntityPosition(self.pakli, true)
            Main.DebugMsg('pakli detached')
        end

        self.dealerStandingIdle()
    end

    self.EnableRender = function(state)
        if state then
            DisplayRadar(false)
            activePokerTable = self.index
            TriggerEvent('ShowPlayerHud', false)
            SendNUIMessage({
                action = "showGame",
                game = "Poker",
                currentBet = currentBetInput
            })
            Citizen.CreateThread(
                function()
                    while activePokerTable do
                        Citizen.Wait(0)
                        DisableAllControlActions(0)

                        if buttonScaleform ~= nil then
                            DrawScaleformMovieFullscreen(buttonScaleform, 255, 255, 255, 255, 0)
                        end

                        EnableControlAction(0, 0, true) -- changing camera
                        EnableControlAction(0, 1, true) -- mouse cam
                        EnableControlAction(0, 2, true) -- mouse cam

                        -- if player betted then
                        if playerBetted then
                            local reactiveText = ''

                            if currentHelpText then
                                reactiveText = reactiveText .. currentHelpText
                            end

                            if self.TimeLeft > 0 then
                                reactiveText = reactiveText .. translate('waiting_for_players')
                            end

                            if watchingCards then
                                if IsDisabledControlJustPressed(0, 38) then
                                    clientTimer = nil
                                    watchingCards = false
                                    buttonScaleform = nil
                                    StopGameplayCamShaking(true)
                                    TriggerServerEvent('aquiverPoker:playCards', self.index, playerBetted)
                                end

                                if IsDisabledControlJustPressed(0, 177) then
                                    clientTimer = nil
                                    watchingCards = false
                                    buttonScaleform = nil
                                    StopGameplayCamShaking(true)
                                    TriggerServerEvent('aquiverPoker:foldCards', self.index)
                                end
                            end

                            if string.len(reactiveText) > 0 then
                                ShowHelpNotification(reactiveText)
                            end
                        end

                        -- only enable standup if he did not bet
                        if playerBetted == nil then
                            if IsDisabledControlJustPressed(0, 177) then
                                self.EnableRender(false)
                                PlaySoundFrontend(-1, 'FocusOut', 'HintCamSounds', false)
                                SendNUIMessage({ action = "showCassino" })
                            end
                        end

                        if playerBetted == nil or playerPairPlus == nil then
                            if self.TimeLeft == nil or self.TimeLeft > 0 then
                                -- bet input
                                if IsDisabledControlJustPressed(0, 22) then --Custom Bet [space]
                                    local tmpInput = getGenericTextInput('Quanto deseja apostar?')
                                    if tonumber(tmpInput) then
                                        tmpInput = tonumber(tmpInput)
                                        if tmpInput > 0 then
                                            if tmpInput > self.data.MaximumBet then
                                                PlaySoundFrontend(-1, 'DLC_VW_ERROR_MAX', 'dlc_vw_table_games_frontend_sounds', true)
                                            else
                                                currentBetInput = tmpInput
                                                PlaySoundFrontend(-1, 'DLC_VW_BET_HIGHLIGHT', 'dlc_vw_table_games_frontend_sounds', true)
                                            end
                                        end
                                    end
                                end

                                if IsDisabledControlJustPressed(0, 176) then
                                    if currentBetInput > 0 then
                                        if currentBetInput >= self.data.MinimumBet and currentBetInput <= self.data.MaximumBet then
                                            if playerBetted == nil then
                                                TriggerServerEvent('aquiverPoker:betPlayer', self.index, activeChairData, currentBetInput)
                                            else
                                                if playerPairPlus == nil then
                                                    TriggerServerEvent('aquiverPoker:betPairPlusPlayer', self.index, currentBetInput)
                                                end
                                            end
                                        else
                                            PlaySoundFrontend(-1, 'DLC_VW_ERROR_MAX', 'dlc_vw_table_games_frontend_sounds', true)
                                        end
                                    else
                                        ShowNotification(translate('no_bet_input'))
                                    end
                                end
                            end
                        end

                        if self.Active then
                            SendNUIMessage({ action = "showTimer", timeLeft = self.TimeLeft })

                        end
                    end
                end
            )
        else
            self.speakPed('MINIGAME_DEALER_LEAVE_NEUTRAL_GAME')

            local sitExitScene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
            NetworkAddPedToSynchronisedScene(PlayerPedId(), sitExitScene, Main.PlayerAnimDictShared, 'sit_exit_left', 2.0, -2.0, 13, 16, 2.0, 0)
            NetworkStartSynchronisedScene(sitExitScene)

            Citizen.Wait(4000)
            TriggerServerEvent('aquiverPoker:standUp', self.index, activeChairData.chairId)
            TriggerEvent('ShowPlayerHud', true)

            NetworkStopSynchronisedScene(mainScene)
            NetworkStopSynchronisedScene(sitExitScene)
            DisplayRadar(true)

            -- only at the end reset the vars
            activePokerTable = nil
            activeChairData = nil
        end
    end

    self.revealSelfCards = function()
        Citizen.CreateThread(
            function()
                if self.index == activePokerTable then
                    local offset = GetObjectOffsetFromCoords(self.data.Position + vector3(0.0, 0.0, 0.03), self.data.Heading, 0.0, -0.04, 1.35)
                    mainCamera = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', offset, -78.0, 0.0, self.data.Heading, 80.0, true, 2)
                    SetCamActive(mainCamera, true)
                    RenderScriptCams(true, 900, 900, true, false)
                    ShakeCam(mainCamera, 'HAND_SHAKE', 0.25)

                    Citizen.Wait(2500)

                    local dealerHandValue = Main.getHandAllValues(self.ServerCards['dealer'].Hand)
                    if dealerHandValue ~= nil then
                        Main.DebugMsg(string.format('Dealer hand value: %s', dealerHandValue))
                        local form = Main.formatHandValue(dealerHandValue)
                        if form ~= nil then
                            Citizen.CreateThread(
                                function()
                                    while DoesCamExist(mainCamera) do
                                        Citizen.Wait(0)

                                        drawText2d(0.5, 0.9, 0.45, form)
                                    end
                                end
                            )
                        end
                    end

                    Citizen.Wait(7500)

                    if DoesCamExist(mainCamera) then
                        DestroyCam(mainCamera, false)
                    end
                    RenderScriptCams(false, 900, 900, true, false)
                end
            end
        )
        if self.ServerCards['dealer'] ~= nil then
            local revealScene = CreateSynchronizedScene(self.data.Position + vector3(0.0, 0.0, 0.01), 0.0, 0.0, self.data.Heading, 2)
            if self.isPedFemale() then
                TaskSynchronizedScene(self.ped, revealScene, Main.DealerAnimDictPoker, 'female_reveal_self', 2.0, -2.0, 13, 16, 1000.0, 0)
            else
                TaskSynchronizedScene(self.ped, revealScene, Main.DealerAnimDictPoker, 'reveal_self', 2.0, -2.0, 13, 16, 1000.0, 0)
            end
            PlaySynchronizedEntityAnim(self.cards['dealer'][1], revealScene, 'reveal_self_card_a', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards['dealer'][2], revealScene, 'reveal_self_card_b', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards['dealer'][3], revealScene, 'reveal_self_card_c', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
        end
    end

    self.revealPlayerCards = function()
        for targetSrc, data in pairs(self.ServerCards) do
            if targetSrc ~= 'dealer' then
                local playerAnimId = nil

                if data.chairData.chairId == 4 then -- this is reverse because rockstar think differently no idea why
                    playerAnimId = 'p01'
                elseif data.chairData.chairId == 3 then
                    playerAnimId = 'p02'
                elseif data.chairData.chairId == 2 then
                    playerAnimId = 'p03'
                elseif data.chairData.chairId == 1 then
                    playerAnimId = 'p04'
                end

                local mainAnimFormat = nil
                local entityAnimFormatA = nil
                local entityAnimFormatB = nil
                local entityAnimFormatC = nil

                if self.playersFolded[targetSrc] then -- if he or she folded the hand
                    if self.isPedFemale() then
                        mainAnimFormat = string.format('female_reveal_folded_%s', playerAnimId)
                    else
                        mainAnimFormat = string.format('reveal_folded_%s', playerAnimId)
                    end
                    entityAnimFormatA = string.format('reveal_folded_%s_card_a', playerAnimId)
                    entityAnimFormatB = string.format('reveal_folded_%s_card_b', playerAnimId)
                    entityAnimFormatC = string.format('reveal_folded_%s_card_c', playerAnimId)
                else
                    if self.isPedFemale() then
                        mainAnimFormat = string.format('female_reveal_played_%s', playerAnimId)
                    else
                        mainAnimFormat = string.format('reveal_played_%s', playerAnimId)
                    end
                    entityAnimFormatA = string.format('reveal_played_%s_card_a', playerAnimId)
                    entityAnimFormatB = string.format('reveal_played_%s_card_b', playerAnimId)
                    entityAnimFormatC = string.format('reveal_played_%s_card_c', playerAnimId)
                end

                if mainAnimFormat ~= nil then
                    if activePokerTable == self.index then -- only show camera if he/she is sitting at the table.
                        if Config.ShowCardsAfterReveal then
                            local offset =
                                GetAnimInitialOffsetPosition(Main.PlayerAnimDictPoker, 'cards_play_card_b', data.chairData.chairCoords, data.chairData.chairRotation, 0.0, 2)

                            if DoesCamExist(mainCamera) then
                                DestroyCam(mainCamera, false)
                            end

                            mainCamera =
                                CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', offset + vector3(0.0, 0.0, 0.45), -85.0, 0.0, data.chairData.chairRotation.z - 90.0, 80.0, true, 2)
                            SetCamActive(mainCamera, true)
                            RenderScriptCams(true, 900, 900, true, false)
                            --ShakeCam(mainCamera, 'HAND_SHAKE', 0.25)
                        end
                    end

                    SetEntityVisible(self.cards[targetSrc][1], false, false)
                    SetEntityVisible(self.cards[targetSrc][2], false, false)
                    SetEntityVisible(self.cards[targetSrc][3], false, false)

                    local revealScene = CreateSynchronizedScene(self.data.Position + vector3(0.0, 0.0, 0.02), 0.0, 0.0, self.data.Heading, 2)
                    TaskSynchronizedScene(self.ped, revealScene, Main.DealerAnimDictPoker, mainAnimFormat, 2.0, -2.0, 13, 16, 1000.0, 0)
                    PlaySynchronizedEntityAnim(self.cards[targetSrc][1], revealScene, entityAnimFormatA, Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
                    PlaySynchronizedEntityAnim(self.cards[targetSrc][2], revealScene, entityAnimFormatB, Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
                    PlaySynchronizedEntityAnim(self.cards[targetSrc][3], revealScene, entityAnimFormatC, Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)

                    while GetSynchronizedScenePhase(revealScene) < 0.025 do
                        Citizen.Wait(1)
                    end

                    SetEntityVisible(self.cards[targetSrc][1], true, false)
                    SetEntityVisible(self.cards[targetSrc][2], true, false)
                    SetEntityVisible(self.cards[targetSrc][3], true, false)

                    while GetSynchronizedScenePhase(revealScene) < 0.99 do
                        Citizen.Wait(1)
                    end

                    local ggScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
                    if self.isPedFemale() then
                        TaskSynchronizedScene(self.ped, ggScene, Main.DealerAnimDictShared, string.format('female_acknowledge_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                    else
                        TaskSynchronizedScene(self.ped, ggScene, Main.DealerAnimDictShared, string.format('acknowledge_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                    end
                end
            end
        end
    end

    self.resetTable = function()
        -- chips clearing
        if #networkedChips > 0 then
            for i = 1, #networkedChips, 1 do
                if NetworkGetEntityOwner(networkedChips[i]) == PlayerId() then
                    DeleteObject(networkedChips[i])
                end
            end
        end

        Citizen.Wait(200) -- because i like timeouts -_-

        for k, v in pairs(self.cards) do
            for i = 1, #v, 1 do
                DeleteObject(v[i])
            end
        end

        Citizen.Wait(200) -- because i like timeouts -_-

        self.cards = {}

        if self.index == activePokerTable then
            playerBetted = nil
            playerPairPlus = nil
            watchingCards = false
            StopGameplayCamShaking(true)
            playerDecidedChoice = false
            clientTimer = nil
            currentHelpText = nil
            networkedChips = {}
            currentBetInput = 0
        end

        self.ServerCards = {}
        self.Active = false
        self.TimeLeft = nil
        self.playersPlaying = {}
        self.playersFolded = {}

        self.dealerStandingIdle()
    end

    self.clearTable = function()
        self.speakPed('MINIGAME_DEALER_ANOTHER_GO')

        -- deck picking up anim
        local firstScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
        if self.isPedFemale() then
            TaskSynchronizedScene(self.ped, firstScene, Main.DealerAnimDictPoker, 'female_deck_pick_up', 2.0, -2.0, 13, 16, 1000.0, 0)
        else
            TaskSynchronizedScene(self.ped, firstScene, Main.DealerAnimDictPoker, 'deck_pick_up', 2.0, -2.0, 13, 16, 1000.0, 0)
        end
        while GetSynchronizedScenePhase(firstScene) < 0.99 do
            if HasAnimEventFired(self.ped, 1691374422) then
                if not IsEntityAttachedToAnyPed(self.pakli) then
                    FreezeEntityPosition(self.pakli, false)
                    AttachEntityToEntity(self.pakli, self.ped, GetPedBoneIndex(self.ped, 60309), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true)
                end
            end

            Citizen.Wait(1)
        end

        -- collect player cards
        for targetSrc, data in pairs(self.ServerCards) do
            if targetSrc ~= 'dealer' then
                local playerAnimId = nil

                if data.chairData.chairId == 4 then -- this is reverse because rockstar think differently no idea why
                    playerAnimId = 'p01'
                elseif data.chairData.chairId == 3 then
                    playerAnimId = 'p02'
                elseif data.chairData.chairId == 2 then
                    playerAnimId = 'p03'
                elseif data.chairData.chairId == 1 then
                    playerAnimId = 'p04'
                end

                local collectScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
                if self.isPedFemale() then
                    TaskSynchronizedScene(self.ped, collectScene, Main.DealerAnimDictPoker, string.format('female_cards_collect_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                else
                    TaskSynchronizedScene(self.ped, collectScene, Main.DealerAnimDictPoker, string.format('cards_collect_%s', playerAnimId), 2.0, -2.0, 13, 16, 1000.0, 0)
                end
                PlaySynchronizedEntityAnim(
                    self.cards[targetSrc][1],
                    collectScene,
                    string.format('cards_collect_%s_card_a', playerAnimId),
                    Main.DealerAnimDictPoker,
                    1000.0,
                    0,
                    0,
                    1000.0
                )
                PlaySynchronizedEntityAnim(
                    self.cards[targetSrc][2],
                    collectScene,
                    string.format('cards_collect_%s_card_b', playerAnimId),
                    Main.DealerAnimDictPoker,
                    1000.0,
                    0,
                    0,
                    1000.0
                )
                PlaySynchronizedEntityAnim(
                    self.cards[targetSrc][3],
                    collectScene,
                    string.format('cards_collect_%s_card_c', playerAnimId),
                    Main.DealerAnimDictPoker,
                    1000.0,
                    0,
                    0,
                    1000.0
                )
                while GetSynchronizedScenePhase(collectScene) < 0.99 do
                    Citizen.Wait(1)
                end

                DeleteObject(self.cards[targetSrc][1])
                DeleteObject(self.cards[targetSrc][2])
                DeleteObject(self.cards[targetSrc][3])
            end
        end

        -- collect own dealer cards
        if self.ServerCards['dealer'] then
            local collectScene = CreateSynchronizedScene(self.data.Position, 0.0, 0.0, self.data.Heading, 2)
            if self.isPedFemale() then
                TaskSynchronizedScene(self.ped, collectScene, Main.DealerAnimDictPoker, 'female_cards_collect_self', 2.0, -2.0, 13, 16, 1000.0, 0)
            else
                TaskSynchronizedScene(self.ped, collectScene, Main.DealerAnimDictPoker, 'cards_collect_self', 2.0, -2.0, 13, 16, 1000.0, 0)
            end
            PlaySynchronizedEntityAnim(self.cards['dealer'][1], collectScene, 'cards_collect_self_card_a', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards['dealer'][2], collectScene, 'cards_collect_self_card_b', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            PlaySynchronizedEntityAnim(self.cards['dealer'][3], collectScene, 'cards_collect_self_card_c', Main.DealerAnimDictPoker, 1000.0, 0, 0, 1000.0)
            SetBit(0)
            while GetSynchronizedScenePhase(collectScene) < 0.99 do
                Citizen.Wait(1)
            end

            DeleteObject(self.cards['dealer'][1])
            DeleteObject(self.cards['dealer'][2])
            DeleteObject(self.cards['dealer'][3])
        end

        self.putDownDeck()
    end

    self.playerPairPlusAnim = function(amount)
        playerPairPlus = amount
        buttonScaleform = nil
        SendNUIMessage({
            action = "showGame",
            game = "Poker",
            currentBet = playerPairPlus*2
        })
        RequestAnimDict(Main.PlayerAnimDictPoker)
        while not HasAnimDictLoaded(Main.PlayerAnimDictPoker) do
            Citizen.Wait(1)
        end

        local offsetAlign = nil
        if activeChairData.chairId == 4 then
            offsetAlign = vector3(0.51655, 0.2268, 0.95)
        elseif activeChairData.chairId == 3 then
            offsetAlign = vector3(0.2163, -0.04745, 0.95)
        elseif activeChairData.chairId == 2 then
            offsetAlign = vector3(-0.2552, -0.031225, 0.95)
        elseif activeChairData.chairId == 1 then
            offsetAlign = vector3(-0.529875, 0.281425, 0.95)
        end

        if offsetAlign == nil then
            Main.DebugMsg('Something error happened during the playerBetAnim function.')
            return
        end

        local animName = 'bet_plus'
        if amount >= 10000 then
            animName = 'bet_plus_large'
        end

        local scene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, true, false, 1.0, 0.0, 1.0)
        NetworkAddPedToSynchronisedScene(PlayerPedId(), scene, Main.PlayerAnimDictPoker, animName, 2.0, -2.0, 13, 16, 1000.0, 0)
        NetworkStartSynchronisedScene(scene)

        while not HasAnimEventFired(PlayerPedId(), -1424880317) do
            Citizen.Wait(1)
        end

        local offset = GetObjectOffsetFromCoords(self.data.Position, self.data.Heading, offsetAlign)
        local chipModel = getChipModelByAmount(amount)
        RequestModel(chipModel)
        while not HasModelLoaded(chipModel) do
            Citizen.Wait(1)
        end

        local chipObj = CreateObjectNoOffset(chipModel, offset, true, false, true)
        SetEntityCoordsNoOffset(chipObj, offset, false, false, true)
        SetEntityHeading(chipObj, GetEntityHeading(PlayerPedId()))
        table.insert(networkedChips, chipObj)

        self.playerRandomIdleAnim()
    end

    self.playerBetAnim = function(amount)
        playerBetted = amount
        SendNUIMessage({
            action = "showGame",
            game = "Poker",
            currentBet = playerBetted
        })
        RequestAnimDict(Main.PlayerAnimDictPoker)
        while not HasAnimDictLoaded(Main.PlayerAnimDictPoker) do
            Citizen.Wait(1)
        end
        SendNUIMessage({ action = "playAudio", transactionFile = "chips" })
        local offsetAlign = nil
        if activeChairData.chairId == 4 then
            offsetAlign = vector3(0.59535, 0.200875, 0.95)
        elseif activeChairData.chairId == 3 then
            offsetAlign = vector3(0.247825, -0.123625, 0.95)
        elseif activeChairData.chairId == 2 then
            offsetAlign = vector3(-0.2804, -0.109775, 0.95)
        elseif activeChairData.chairId == 1 then
            offsetAlign = vector3(-0.606975, 0.249675, 0.95)
        end

        if offsetAlign == nil then
            Main.DebugMsg('Something error happened during the playerBetAnim function.')
            return
        end

        local animName = 'bet_ante'
        if amount >= 10000 then
            animName = 'bet_ante_large'
        end

        local scene = NetworkCreateSynchronisedScene(activeChairData.chairCoords, activeChairData.chairRotation, 2, false, true, 1.0, 0.0, 1.0)
        NetworkAddPedToSynchronisedScene(PlayerPedId(), scene, Main.PlayerAnimDictPoker, animName, 2.0, -2.0, 13, 16, 1000.0, 0)
        NetworkStartSynchronisedScene(scene)

        while not HasAnimEventFired(PlayerPedId(), -1424880317) do
            Citizen.Wait(1)
        end

        local offset = GetObjectOffsetFromCoords(self.data.Position, self.data.Heading, offsetAlign)
        local chipModel = getChipModelByAmount(amount)
        RequestModel(chipModel)
        while not HasModelLoaded(chipModel) do
            Citizen.Wait(1)
        end

        local chipObj = CreateObjectNoOffset(chipModel, offset, true, false, true)
        SetEntityCoordsNoOffset(chipObj, offset, false, false, true)
        SetEntityHeading(chipObj, GetEntityHeading(PlayerPedId()))
        table.insert(networkedChips, chipObj)

        self.playerRandomIdleAnim()
    end

    self.createDefaultPakli()
    self.createPed()

    SharedPokers[index] = self
end

Citizen.CreateThread(
    function()
        while not closeToPokers do
            Citizen.Wait(500)
        end

        Citizen.Wait(1000) -- repairs the client crash on login

        RequestAnimDict(Main.DealerAnimDictShared)
        RequestAnimDict(Main.DealerAnimDictPoker)
        RequestAnimDict(Main.PlayerAnimDictShared)
        RequestAnimDict(Main.PlayerAnimDictPoker)

        -- creating the poker tables
        for index, data in pairs(Config.Pokers) do
            AquiverPoker(index, data)
        end
    end
)

Citizen.CreateThread(function()
    while true do
        local letSleep = true
        if not InformationPlaying and activePokerTable == nil and activeChairData == nil then
            if closeToPokers then
                local playerpos = GetEntityCoords(PlayerPedId())
                for k, v in pairs(SharedPokers) do
                    local dist = #(playerpos - v.data.Position)
                    if dist < 3.0 then
                        for i = 1, #Main.Tables, 1 do
                            local tableObj = GetClosestObjectOfType(playerpos, 3.0, GetHashKey(Main.Tables[i]), false)

                            if DoesEntityExist(tableObj) then
                                letSleep = false

                                for chairBone, chairId in pairs(Main.PokerChairs) do
                                    local chaircoords = GetWorldPositionOfEntityBone(tableObj, GetEntityBoneIndexByName(tableObj, chairBone))
                                    if chaircoords then
                                        if #(playerpos - chaircoords) < 1.5 then
                                            local chairrotation = GetWorldRotationOfEntityBone(tableObj, GetEntityBoneIndexByName(tableObj, chairBone))
                                            drawfreameeMarker(chaircoords + vector3(0.0, 0.0, 1.0))
                                            if IsDisabledControlJustPressed(0,38) then
                                                v.sitDown(chairId, chaircoords, chairrotation)
                                            end
                                            break
                                        end
                                    end
                                end
                                break
                            end
                        end
                    end
                end
            end
        end
        if letSleep then
            Citizen.Wait(1000)
        end
        Citizen.Wait(1)
    end
end)

-- OTHERS

function frm_setPedVoiceGroup(randomNumber, dealerPed)
    if randomNumber == 0 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_WHITE_01'))
    elseif randomNumber == 1 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_ASIAN_01'))
    elseif randomNumber == 2 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_ASIAN_02'))
    elseif randomNumber == 3 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_ASIAN_01'))
    elseif randomNumber == 4 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_WHITE_01'))
    elseif randomNumber == 5 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_WHITE_02'))
    elseif randomNumber == 6 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_M_Y_Casino_01_WHITE_01'))
    elseif randomNumber == 7 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_ASIAN_01'))
    elseif randomNumber == 8 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_ASIAN_02'))
    elseif randomNumber == 9 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_ASIAN_01'))
    elseif randomNumber == 10 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_ASIAN_02'))
    elseif randomNumber == 11 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_LATINA_01'))
    elseif randomNumber == 12 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_LATINA_02'))
    elseif randomNumber == 13 then
        SetPedVoiceGroup(dealerPed, GetHashKey('S_F_Y_Casino_01_LATINA_01'))
    end
end

function frm_setPedClothes(randomNumber, dealerPed)
    if randomNumber == 0 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 1 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 2, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 2 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 3 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 4 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 2, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 5 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 6 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 1, 0, 0)
    elseif randomNumber == 7 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 8 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 9 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 2, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 10 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 3, 3, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 11 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 0, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
        SetPedPropIndex(dealerPed, 1, 0, 0, false)
    elseif randomNumber == 12 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 3, 1, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 3, 1, 0)
        SetPedComponentVariation(dealerPed, 3, 1, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
    elseif randomNumber == 13 then
        SetPedDefaultComponentVariation(dealerPed)
        SetPedComponentVariation(dealerPed, 0, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 1, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 2, 4, 0, 0)
        SetPedComponentVariation(dealerPed, 3, 2, 1, 0)
        SetPedComponentVariation(dealerPed, 4, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 6, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 7, 1, 0, 0)
        SetPedComponentVariation(dealerPed, 8, 2, 0, 0)
        SetPedComponentVariation(dealerPed, 10, 0, 0, 0)
        SetPedComponentVariation(dealerPed, 11, 0, 0, 0)
        SetPedPropIndex(dealerPed, 1, 0, 0, false)
    end
end

function getGenericTextInput(type)
    if type == nil then
        type = ''
    end
    AddTextEntry('FMMC_MPM_NA', tostring(type))
    DisplayOnscreenKeyboard(1, 'FMMC_MPM_NA', tostring(type), '', '', '', '', 30)
    while (UpdateOnscreenKeyboard() == 0) do
        DisableAllControlActions(0)
        Wait(0)
    end
    if (GetOnscreenKeyboardResult()) then
        local result = GetOnscreenKeyboardResult()
        if result then
            return result
        end
    end
    return false
end

function getChipModelByAmount(amount)
    if amount <= 10 then
        return GetHashKey('vw_prop_chip_10dollar_x1')
    elseif amount > 10 and amount < 50 then
        return GetHashKey('vw_prop_chip_10dollar_st')
    elseif amount >= 50 and amount < 100 then
        return GetHashKey('vw_prop_chip_50dollar_x1')
    elseif amount >= 100 and amount < 200 then
        return GetHashKey('vw_prop_chip_100dollar_x1')
    elseif amount >= 200 and amount < 500 then
        return GetHashKey('vw_prop_chip_100dollar_st')
    elseif amount == 500 then
        return GetHashKey('vw_prop_chip_500dollar_x1')
    elseif amount > 500 and amount < 1000 then
        return GetHashKey('vw_prop_chip_500dollar_st')
    elseif amount == 1000 then
        return GetHashKey('vw_prop_chip_1kdollar_x1')
    elseif amount > 1000 and amount < 5000 then
        return GetHashKey('vw_prop_chip_1kdollar_st')
    elseif amount == 5000 then
        return GetHashKey('vw_prop_plaq_5kdollar_x1')
    elseif amount > 5000 and amount < 10000 then
        return GetHashKey('vw_prop_plaq_5kdollar_st')
    elseif amount == 10000 then
        return GetHashKey('vw_prop_plaq_10kdollar_x1')
    elseif amount > 10000 then
        return GetHashKey('vw_prop_plaq_10kdollar_st')
    end
end

function ButtonMessage(text)
    BeginTextCommandScaleformString('STRING')
    AddTextComponentScaleform(text)
    EndTextCommandScaleformString()
end

function Button(ControlButton)
    N_0xe83a3e3557a56640(ControlButton)
end

function setupSecondButtons(scaleform)
    -- to have the 'hint' sound effect
    PlaySoundFrontend(-1, 'FocusIn', 'HintCamSounds', true)
    ---
    local scaleform = RequestScaleformMovie(scaleform)
    while not HasScaleformMovieLoaded(scaleform) do
        Citizen.Wait(0)
    end
    PushScaleformMovieFunction(scaleform, 'CLEAR_ALL')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_CLEAR_SPACE')
    PushScaleformMovieFunctionParameterInt(200)
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(1)
    Button(GetControlInstructionalButton(0, 177, true)) -- The button to display
    ButtonMessage(translate('leave_game'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(2)
    Button(GetControlInstructionalButton(0, 172, true))
    ButtonMessage(translate('raise_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(3)
    Button(GetControlInstructionalButton(0, 173, true))
    ButtonMessage(translate('reduce_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(4)
    Button(GetControlInstructionalButton(0, 22, true))
    ButtonMessage(translate('custom_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(5)
    Button(GetControlInstructionalButton(0, 176, true))
    ButtonMessage(translate('place_pair_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'DRAW_INSTRUCTIONAL_BUTTONS')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_BACKGROUND_COLOUR')
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(80)
    PopScaleformMovieFunctionVoid()

    return scaleform
end

function setupThirdButtons(scaleform)
    -- to have the 'hint' sound effect
    PlaySoundFrontend(-1, 'FocusIn', 'HintCamSounds', true)
    ---

    local scaleform = RequestScaleformMovie(scaleform)
    while not HasScaleformMovieLoaded(scaleform) do
        Citizen.Wait(0)
    end
    PushScaleformMovieFunction(scaleform, 'CLEAR_ALL')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_CLEAR_SPACE')
    PushScaleformMovieFunctionParameterInt(200)
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(1)
    Button(GetControlInstructionalButton(0, 177, true)) -- The button to display
    ButtonMessage(translate('fold_cards'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(2)
    Button(GetControlInstructionalButton(0, 38, true))
    ButtonMessage(translate('play_cards'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'DRAW_INSTRUCTIONAL_BUTTONS')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_BACKGROUND_COLOUR')
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(80)
    PopScaleformMovieFunctionVoid()

    return scaleform
end

function setupFirstButtons(scaleform)
    local scaleform = RequestScaleformMovie(scaleform)
    while not HasScaleformMovieLoaded(scaleform) do
        Citizen.Wait(0)
    end
    PushScaleformMovieFunction(scaleform, 'CLEAR_ALL')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_CLEAR_SPACE')
    PushScaleformMovieFunctionParameterInt(200)
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(1)
    Button(GetControlInstructionalButton(0, 177, true)) -- The button to display
    ButtonMessage(translate('leave_game'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(2)
    Button(GetControlInstructionalButton(0, 172, true))
    ButtonMessage(translate('raise_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(3)
    Button(GetControlInstructionalButton(0, 173, true))
    ButtonMessage(translate('reduce_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(4)
    Button(GetControlInstructionalButton(0, 22, true))
    ButtonMessage(translate('custom_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_DATA_SLOT')
    PushScaleformMovieFunctionParameterInt(5)
    Button(GetControlInstructionalButton(0, 176, true))
    ButtonMessage(translate('place_bet'))
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'DRAW_INSTRUCTIONAL_BUTTONS')
    PopScaleformMovieFunctionVoid()

    PushScaleformMovieFunction(scaleform, 'SET_BACKGROUND_COLOUR')
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(80)
    PopScaleformMovieFunctionVoid()

    return scaleform
end

function drawText2d(x, y, sc, text)
    SetTextFont(0)
    SetTextScale(sc, sc)
    SetTextCentre(true)
    SetTextOutline()
    SetTextColour(254, 254, 254, 255)
    SetTextEntry('STRING')
    AddTextComponentString(text)
    DrawText(x, y)
end

AddEventHandler('onResourceStop',function(r)
    if r ~= GetCurrentResourceName() then 
        return 
    end
    for k,v in pairs(dealerPeds) do
        DeletePed(v)
    end
    for k,v in pairs(tableObjects) do
        DeleteObject(v)
    end
end)