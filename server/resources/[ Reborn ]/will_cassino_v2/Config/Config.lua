Config = {}
Tunnel = module("vrp","lib/Tunnel")
Webhooks = module("Reborn/webhooks") or {}

--            ///////////////\\\\\\\\\\\\\\
--                   CASSINO JOGOS
--            ///////////////\\\\\\\\\\\\\\

-- Item utilizado no cassino para apostar. (Recomendado criar um item fichas)
Config.money = "fichas"

-- will_shops
Config.hasShops = false

-- Carro de exibição e npc em alguns lugares, caso não queira, deixar 'false'. 
-- Recomendado retirar para otimizar um pouco mais.
Config.details = true

-- Caso deseja alguns npc para exibição, deixe 'true', caso contrario, 'false'
Config.npc = true

-- Carro de exibição
Config.car = "t20"
Config.carCoords = { 935.08, 42.41, 72.53 }

Config.webhookgames = Webhooks.webhookcassino

--#############################
--         Lucky Wheel
--#############################

-- A roleta pode ser rodada em 2 formas:

-- 1° Um valor definido para cada rodada

Config.roleta = 7000    -- Valor para rodar a roleta //\\ É usado o Config.money como item

-- 2° Um item exclusivo apenas para rodar a roleta
-- Se não for utilizar, deixar vazio -> ""
Config.item = ""

-- Prêmios da roleta:
Config.hardLucky = true			-- Dificultar os premios

Config.luckywheelReward = {
	[1] = { name = 'Clothing', index = 1, luck = 15, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 5000) end) end },

	[2] = { name = 'RP 2500', index = 345, luck = 20, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 2500) end) end },
	[3] = { name = 'RP 5000', index = 270, luck = 10, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 5000) end) end },
	[4] = { name = 'RP 7500', index = 200, luck = 5, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 7500) end) end },
	[5] = { name = 'RP 10000', index = 125, luck = 5, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 10000) end) end },
	[6] = { name = 'RP 15000', index = 55, luck = 5, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 15000) end) end },

	[7] = { name = 'Money 20000', index = 325, luck = 5, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 20000) end) end },
	[8] = { name = 'Money 30000', index = 253, luck = 4, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 30000) end) end },
	[9] = { name = 'Money 40000', index = 108, luck = 4, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 40000) end) end },
	[10] = { name = 'Money 50000', index = 20, luck = 2, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 50000) end) end },

	[11] = { name = 'Chips 10000', index = 305, luck = 5, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 10000) end) end },
	[12] = { name = 'Chips 15000', index = 235, luck = 4, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 15000) end) end },
	[13] = { name = 'Chips 20000', index = 180, luck = 4, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 20000) end) end },
	[14] = { name = 'Chips 25000', index = 90, luck = 3, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 25000) end) end },
	
	[15] = { name = 'Mystery', index = 163, luck = 2, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 100000) end) end },
	[16] = { name = 'Discount', index = 290, luck = 2, reward = function(source) SetTimeout(6000,function() giveInventoryItem(getUserId(source), Config.money, 100000) end) end },
	[17] = { name = 'Vehicle', index = 35, luck = 1, reward = function(source) SetTimeout(6000,function() addVehicle(source) end) end },
}

--#############################
--           Roleta
--#############################

-- Segundos para iniciar a roleta após sentar na mesa
Config.RouletteStart = 30 

Config.RulettTables = { 
    [1] = {
        position = vector3(1003.94,57.09,69.44 - 1.0),
        rot = 11.13,
    },
    [2] = { 
        position = vector3(999.53,56.04,69.44 - 1.0),
        rot = 106.28,
    },
    [3] = {
        position = vector3(984.5,52.28,70.24 - 1.0),
        rot = 100.15,
    },
}

--#############################
--            Slots
--#############################

Config.OffWinner = 0 -- Adicionar chance para perder (0 - 100)

-- As maquinas, suas posições e a quantidade que pode apostar:
-- Mude apenas o 'bet' para o que preferir em cada maquina.
-- (Lembrando que é o mesmo item utilizado no Config.money para apostar)

Config.Slots = { 
	[1] = { -- Diamonds
		pos = vector3(943.87,51.37,71.44),		
		bet = 2500,
		prop = 'vw_prop_casino_slot_07a',
		prop1 = 'vw_prop_casino_slot_07a_reels',
		prop2 = 'vw_prop_casino_slot_07b_reels',
	},
	[2] = {
		pos = vector3(948.92,49.42,71.44),
		bet = 2500,
		prop = 'vw_prop_casino_slot_07a',
		prop1 = 'vw_prop_casino_slot_07a_reels',
		prop2 = 'vw_prop_casino_slot_07b_reels',
	},
	[3] = {
		pos = vector3(957.11,51.76,71.44),
		bet = 2500,
		prop = 'vw_prop_casino_slot_07a',
		prop1 = 'vw_prop_casino_slot_07a_reels',
		prop2 = 'vw_prop_casino_slot_07b_reels',
	},
	[4] = {
		pos = vector3(953.59,40.52,71.44),
		bet = 2500,
		prop = 'vw_prop_casino_slot_07a',
		prop1 = 'vw_prop_casino_slot_07a_reels',
		prop2 = 'vw_prop_casino_slot_07b_reels',
	},

	-- Fortune And Glory

	[5] = { 
		pos = vector3(958.73,39.2,71.44),
		bet = 1000,
		prop = 'vw_prop_casino_slot_05a',
		prop1 = 'vw_prop_casino_slot_05a_reels',
		prop2 = 'vw_prop_casino_slot_05b_reels',
	},
	[6] = { 
		pos = vector3(955.88,40.7,71.44),
		bet = 1000,
		prop = 'vw_prop_casino_slot_05a',
		prop1 = 'vw_prop_casino_slot_05a_reels',
		prop2 = 'vw_prop_casino_slot_05b_reels',
	},
	[7] = { 
		pos = vector3(953.37,47.93,71.44),
		bet = 1000,
		prop = 'vw_prop_casino_slot_05a',
		prop1 = 'vw_prop_casino_slot_05a_reels',
		prop2 = 'vw_prop_casino_slot_05b_reels',
	},
	[8] = { 
		pos = vector3(951.2,49.55,71.44),
		bet = 1000,
		prop = 'vw_prop_casino_slot_05a',
		prop1 = 'vw_prop_casino_slot_05a_reels',
		prop2 = 'vw_prop_casino_slot_05b_reels',
	},

    -- Have A Stab
	
	[9] = { 
		pos = vector3(943.28,50.81,71.44),
		bet = 500,
		prop = 'vw_prop_casino_slot_06a',
		prop1 = 'vw_prop_casino_slot_06a_reels',
		prop2 = 'vw_prop_casino_slot_06b_reels',
	},
	[10] = {
		pos = vector3(949.56,48.95,71.44),
		bet = 500,
		prop = 'vw_prop_casino_slot_06a',
		prop1 = 'vw_prop_casino_slot_06a_reels',
		prop2 = 'vw_prop_casino_slot_06b_reels',
	},
	[11] = {
		pos = vector3(955.13,50.91,71.44),
		bet = 500,
		prop = 'vw_prop_casino_slot_06a',
		prop1 = 'vw_prop_casino_slot_06a_reels',
		prop2 = 'vw_prop_casino_slot_06b_reels',
	},
	[12] = {
		pos = vector3(954.23,40.15,71.44),
		bet = 500,
		prop = 'vw_prop_casino_slot_06a',
		prop1 = 'vw_prop_casino_slot_06a_reels',
		prop2 = 'vw_prop_casino_slot_06b_reels',
	},
	
	-- Shoot First

	[16] = { 
		pos = vector3(944.37,47.13,71.44),
		bet = 200,
		prop = 'vw_prop_casino_slot_03a',
		prop1 = 'vw_prop_casino_slot_03a_reels',
		prop2 = 'vw_prop_casino_slot_03b_reels',
	},
	[17] = {
		pos = vector3(953.23,51.9,71.44),
		bet = 200,
		prop = 'vw_prop_casino_slot_03a',
		prop1 = 'vw_prop_casino_slot_03a_reels',
		prop2 = 'vw_prop_casino_slot_03b_reels',
	},
	[18] = {
		pos = vector3(954.2,45.37,71.44),
		bet = 200,
		prop = 'vw_prop_casino_slot_03a',
		prop1 = 'vw_prop_casino_slot_03a_reels',
		prop2 = 'vw_prop_casino_slot_03b_reels',
	},
	[19] = {
		pos = vector3(957.53,41.46,71.44),
		bet = 200,
		prop = 'vw_prop_casino_slot_03a',
		prop1 = 'vw_prop_casino_slot_03a_reels',
		prop2 = 'vw_prop_casino_slot_03b_reels',
	},
	
    -- Fame or Shame

	[20] = { 
		pos = vector3(957.64,41.28,71.44),
		bet = 100,
		prop = 'vw_prop_casino_slot_04a',
		prop1 = 'vw_prop_casino_slot_04a_reels',
		prop2 = 'vw_prop_casino_slot_04b_reels',
	},
	[21] = {
		pos = vector3(955.88,42.49,71.44),
		bet = 100,
		prop = 'vw_prop_casino_slot_04a',
		prop1 = 'vw_prop_casino_slot_04a_reels',
		prop2 = 'vw_prop_casino_slot_04b_reels',
	},
	[22] = {
		pos = vector3(953.45,46.16,71.44),
		bet = 100,
		prop = 'vw_prop_casino_slot_04a',
		prop1 = 'vw_prop_casino_slot_04a_reels',
		prop2 = 'vw_prop_casino_slot_04b_reels',
	},
	[23] = {
		pos = vector3(953.24,51.52,71.44),
		bet = 100,
		prop = 'vw_prop_casino_slot_04a',
		prop1 = 'vw_prop_casino_slot_04a_reels',
		prop2 = 'vw_prop_casino_slot_04b_reels',
	},
	[24] = {
		pos = vector3(951.39,51.58,71.44),
		bet = 100,
		prop = 'vw_prop_casino_slot_04a',
		prop1 = 'vw_prop_casino_slot_04a_reels',
		prop2 = 'vw_prop_casino_slot_04b_reels',
	},
	[25] = {
		pos = vector3(942.79,50.55,71.44),
		bet = 1000,
		prop = 'vw_prop_casino_slot_05a',
		prop1 = 'vw_prop_casino_slot_05a_reels',
		prop2 = 'vw_prop_casino_slot_05b_reels',
	},
}

Config.slotsWins = {
	doubled = false,  -- Ganhar com 2 simbolos iguais
	multiplicador = 5 -- Multiplicador caso ganhe com 2 simbolos
}

Config.Mult = { -- Multiplicadores: baseado no GTA:ONLINE
	['1'] = 25,	
	['2'] = 50,
	['3'] = 100,
	['4'] = 150,
	['5'] = 200,
	['6'] = 250,
	['7'] = 300,
}

function winSlots(bet, slot1, slot2, slot3)
	local total = 0
	if slot1 == slot2 and slot2 == slot3 and slot1 == slot3 then
		if Config.Mult[slot1] then
			total = bet * Config.Mult[slot1]
		end		
	elseif Config.slotsWins['doubled'] then
		if slot1 == '6' and slot2 == '6' then
			total = bet*Config.slotsWins['multiplicador']
		elseif slot1 == '6' and slot3 == '6' then
			total = bet*Config.slotsWins['multiplicador']
		elseif slot2 == '6' and slot3 == '6' then
			total = bet*Config.slotsWins['multiplicador']
		end
	end
	return total
end

--#############################
--            Poker
--#############################

-- SETUPS

Config.TimeLeftAfter = 15 -- Tempo para o jogador apostar
Config.PlayerDecideTime = 15 -- Tempo para o jogador decidir
Config.ShowCardsAfterReveal = true -- Mudar a camera do jogador quando revelar as cartas

-- Mudar apenas o MinimumBet e MaximumBet, minimo e maximo para apostar.
Config.Pokers = {
    [1] = {
        Position = vector3(985.04, 66.63, 69.23),
        Heading = 8.0,
        MaximumBet = 150000,
        MinimumBet = 50
    },
    [2] = {
        Position = vector3(994.90, 58.21, 68.43),
        Heading = 243.0,
        MaximumBet = 150000,
        MinimumBet = 50
    },
    [3] = {
        Position = vector3(998.43, 61.03, 68.43),
        Heading = 193.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
    [4] = {
        Position = vector3(996.34, 51.73, 68.43),
        Heading = 323.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
    [5] = {
        Position = vector3(1000.78, 51.03, 68.43),
        Heading = 13.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
    [6] = {
        Position = vector3(988.46, 64.28, 69.23),
        Heading = 283.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
    [7] = {
        Position = vector3(993.23, 43.61, 69.23),
        Heading = 283.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
    [8] = {
        Position = vector3(991.46, 40.09, 69.23),
        Heading = 203.0,
        MaximumBet = 50000,
        MinimumBet = 50
    },
}

--#############################
--         Blackjack
--#############################

Config.blackJackTables = {
    [0] = {
        dealerPos = vector3(1001.88,59.86,69.44),
        dealerHeading = 321.34,
        tablePos = vector3(1002.38, 60.50, 68.43),
        tableHeading = 143.30,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    },
    [1] = { --    1003.49,53.62,69.44,
        dealerPos = vector3(1003.49,53.62,69.44),
        dealerHeading = 237.76,
        tablePos = vector3(1004.18, 53.19, 68.43),
        tableHeading = 58.30,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    },
    [2] = { -- 986.04,59.76,70.24,3.69
        dealerPos = vector3(986.04,59.76,70.24),
        dealerHeading = 3.69,
        tablePos = vector3(985.90, 60.55, 69.23),
        tableHeading = 188.31,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    },
    [3] = {
        dealerPos = vector3(986.48,42.06,70.24),
        dealerHeading = 278.74,
        tablePos = vector3(987.26, 42.20, 69.23),
        tableHeading = 103.30,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    }, -- 
    [4] = {
        dealerPos = vector3(988.7,46.48,70.24),
        dealerHeading = 203.31,
        tablePos = vector3(989.03, 45.72, 69.23),
        tableHeading = 23.30,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    },
    [5] = {
        dealerPos = vector3(981.61,62.68,70.24),
        dealerHeading = 281.72,
        tablePos = vector3(982.48, 62.90, 69.23),
        tableHeading = 103.30,
        distance = 1000.0,
        prop = "vw_prop_casino_blckjack_01"
    },
} 

Config.blackjack = {
    ['MinimumBet'] = 1,
    ['MaximumBet'] = 1000000
}

--#############################
--         InsideTrack
--#############################

Config.InsideTrack = {
	['minBet'] = 10,
	['maxBet'] = 100000,
	['multiplier'] = 2
}
