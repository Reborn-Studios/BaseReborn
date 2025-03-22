-----#######################################--
--##            VRP 
-----#######################################--

Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
Reborn = Proxy.getInterface("Reborn")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

Config.base = "creative"						-- vrpex / creative / summerz

Config.XpPerMinute = 6						-- XP ganho a cada minuto
Config.MaxXpPerLevel = 1500					-- Maximo de XP por nivel
Config.AddXpTime = 60 * 1000				-- 60 segundos para aumentar xp
Config.LevelPrice = 20						-- Preço para comprar um nivel

Config.Command = "battlepass"				-- Comando para abrir o painel
Config.AcessToEveryone = true				-- Todos tem acesso para ver os premios (Nao conseguem resgatar)
Config.ExclusiveBattlepass = false			-- Battlepass exclusivo para comprar
Config.BattlepassPerm = "battlepass.perm"	-- Permissao que tera acesso ao battlepass

Config.Images = Reborn.images()				-- Diretorio das imagens

-----##########################################################-----

-- name é o item do inventario e nome da imagem

Config.Lootboxes = {
	[1] =	{ title = 'AIO LOOTBOX',		name = 'aio_box',			type = 'item',		moneyPrice = 80000,		coinPrice = 3500  },
	[2] =	{ title = 'COLETE LOOTBOX',		name = 'vest_box',			type = 'item',		moneyPrice = nil,		coinPrice = 5000  },
	[3] =	{ title = 'DINHEIRO LOOTBOX',	name = 'money_box',			type = 'money',		moneyPrice = nil,		coinPrice = 5000  },
	[4] =	{ title = 'WEAPON LOOTBOX',		name = 'weapon_box',		type = 'item',		moneyPrice = nil,		coinPrice = 7500  },
	[5] =	{ title = 'MEDKIT LOOTBOX',		name = 'medkit_box',		type = 'item',		moneyPrice = nil,		coinPrice = 2500  },
	[6] =	{ title = 'VEHICLE LOOTBOX',	name = 'vehicle_box',		type = 'vehicle',	moneyPrice = nil,		coinPrice = 17500 },
}

Config.LootboxesRewards = {
	[1] = { -- aio
		{ name = 'analgesic',			label = 'Analgesico',			amount = 5,			luck = 10 },
		{ name = 'bandage',				label = 'Bandagem',				amount = 10,		luck = 30 },
		{ name = 'vest',				label = 'Colete',				amount = 3,			luck = 30 },
		{ name = 'dollars',				label = 'R$60000',				amount = 60000,		luck = 15 },
		{ name = 'warfarin',			label = 'Kit Médico',			amount = 2,			luck = 15 },
	},
	[2] = { -- vest
		{ name = 'vest',				label = 'Colete',				amount = 4,			luck = 34 },
		{ name = 'warfarin',			label = 'Kit Médico',			amount = 5,			luck = 33 },
		{ name = 'adrenaline',			label = 'Adrenalina',			amount = 10,		luck = 33 },
	},
	[3] = { -- money
		{ name = 'dollars',				label = 'R$20000',				amount = 30000,		luck = 40 },
		{ name = 'dollars',				label = 'R$15000',				amount = 15000,		luck = 40 },
		{ name = 'dollars',				label = 'R$60000',				amount = 60000,		luck = 10 },
		{ name = 'dollars',				label = 'R$90000',				amount = 30000,		luck = 10 },
	},
	[4] = { -- weapon
		{ name = 'WEAPON_PISTOL_MK2',	label = 'FIVE SEVEN',			amount = 1,			luck = 30 },
		{ name = 'WEAPON_MICROSMG',		label = 'UZI',					amount = 1,			luck = 25 },
		{ name = 'WEAPON_SMG',			label = 'MP5',					amount = 1,			luck = 25 },
		{ name = 'WEAPON_ASSAULTRIFLE',	label = 'AK103',				amount = 1,			luck = 10 },
		{ name = 'WEAPON_CARBINERIFLE',	label = 'M4A1',					amount = 1,			luck = 10 },
	},
	[5] = { -- medical
		{ name = 'bandage',				label = 'Bandagem',				amount = 10,		luck = 34 },
		{ name = 'analgesic',			label = 'Analgesico',			amount = 5,			luck = 33 },
		{ name = 'warfarin',			label = 'Kit Médico',			amount = 3,			luck = 33 },
	},
	[6] = { -- vehicle
		{ name = 'bmwi8',				label = 'BMW I8',	   			amount = 1,			luck = 10 },
		{ name = 'civictyper',			label = 'Civic Type R',			amount = 1,			luck = 10 },
		{ name = 'escalade2021',		label = 'Escalade 2021',		amount = 1,			luck = 10 },
		{ name = 'golfmk7',				label = 'Golf MK7',				amount = 1,			luck = 10 },
		{ name = 'mazdarx7',			label = 'Mazda RX7',			amount = 1,			luck = 10 },
		{ name = 'nissangtr2',			label = 'Nissan GTR 2',			amount = 1,			luck = 10 },
		{ name = 'porsche911',			label = 'Porsche 911',			amount = 1,			luck = 10 },
		{ name = 's1000rr',				label = 'S1000 RR',				amount = 1,			luck = 10 },
		{ name = 'skyliner34',			label = 'Skyline R34',			amount = 1,			luck = 10 },
		{ name = 'toyotasupra2',		label = 'Toyota Supra 2',		amount = 1,			luck = 10 },
	},
}

Config.LevelRewards = {

	[1] = { title = 'DINHEIRO',				item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[2] = { title = 'MOCHILA',				item = 'backpackp',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[3] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[4] = { title = 'DINHEIRO',				item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[5] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[6] = { title = 'DESERT EAGLE',			item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[7] = { title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete' },
	
	[8] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[9] = { title = 'MUNIÇÃO',				item = 'ammo-rifle',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[10] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[11] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[12] = { title = 'MOCHILA',				item = 'backpackm',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[13] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[14] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[15] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[16] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[17] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[18] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[19] = { title = 'MUNIÇÃO',				item = 'ammo-rifle',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[20] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[21] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[22] = { title = 'MOCHILA',				item = 'backpackm',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[23] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[24] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[25] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[26] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[27] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[28] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[29] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[30] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[31] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[32] = { title = 'MOCHILA',				item = 'backpackg',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[33] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[34] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[35] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[36] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[37] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[38] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[39] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[40] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[41] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[42] = { title = 'MOCHILA',				item = 'backpackg',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[43] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[44] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[45] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[46] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[47] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[48] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[49] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[50] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[51] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[52] = { title = 'MOCHILA',				item = 'backpackx',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[53] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[54] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[55] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[56] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[57] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[58] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[59] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[60] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[61] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[62] = { title = 'MOCHILA',				item = 'backpackx',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[63] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[64] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[65] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[66] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[67] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[68] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[69] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[70] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[71] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[72] = { title = 'MOCHILA',				item = 'backpackm',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[73] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[74] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[75] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[76] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[77] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[78] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[79] = { title = 'MUNIÇÃO',				item = 'ammo-rifle2',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[80] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[81] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[82] = { title = 'MOCHILA',				item = 'backpackg',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[83] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[84] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[85] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[86] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[87] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[88] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[89] = { title = 'MUNIÇÃO',				item = 'ammo-rifle',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[90] = { title = 'LOOTBOX',				item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },

	[91] = { title = 'DINHEIRO',			item = 'dollars',					amount = 20000,		type = 'money',			desc = 'GANHE R$20000' },
	
	[92] = { title = 'MOCHILA',				item = 'backpackx',					amount = 1,			type = 'item',			desc = 'GANHE 1 MOCHILA' },
	
	[93] = { title = 'PISTOLA',				item = 'WEAPON_PISTOL',				amount = 1,			type = 'weapon',		desc = 'GANHE 1 PISTOLA' },
	
	[94] = { title = 'DINHEIRO',			item = 'dollars',					amount = 70000,		type = 'money',			desc = 'GANHE R$70000' },
	
	[95] = { title = 'COLETE',				item = 'vest',						amount = 5,			type = 'item',			desc = 'GANHE 5 COLETES' },
	
	[96] = { title = 'DESERT EAGLE',		item = 'WEAPON_PISTOL50',			amount = 1,			type = 'weapon',		desc = 'GANHE UMA DESERT EAGLE' },
	
	[97] = {title = 'Colete',				item = 'vest',						amount = 3,			type = 'item',			desc = 'GANHE 3 Colete'},
	
	[98] = { title = 'RIFLE MK2',			item = 'WEAPON_ASSAULTRIFLE',		amount = 1,			type = 'weapon',		desc = 'GANHE A ASSAULTRIFLE' },
	
	[99] = { title = 'MUNIÇÃO',				item = 'ammo-rifle',			amount = 50,		type = 'item',			desc = 'GANHE 50 MUNIÇÃO DE RIFLE' },
	
	[100] = { title = 'LOOTBOX',			item = 'aio_box',					amount = 1,			type = 'item',			desc = 'GANHE 1 AIO LOOTBOX' },
	
}

Config.notify = function(msg, source)
	local messages = {
		['battepass_reward'] = { "Recompensa do battlepass liberada.", "sucesso" },
		['level_up'] = { "Proximo level alcançado.", "sucesso" },
		['player_not_online'] = { "Jogador não esta online", "negado" },
		['add_battlepass'] = { "Battlepass adicionado ao player", "sucesso" },
		['rem_battlepass'] = { "Battlepass removido do player", "sucesso" },
		['received_battlepass'] = { "Você recebeu o battlepass", "sucesso" },
		['lost_battlepass'] = { "Você perdeu seu battlepass", "negado" },
		['buy_level'] = { "Você comprou um Nível do Passe de Batalha", "sucesso" },
		['insuficient_coins'] = { "Você não tem moedas suficientes", "negado" }
	}
	if source then
		TriggerClientEvent("Notify", source, messages[msg][2], messages[msg][1], 5000)
	else
		TriggerEvent("Notify", messages[msg][2], messages[msg][1], 5000)
	end
end

if not IsDuplicityVersion() then
	RegisterNetEvent("will_battlepass:open",function ()
		ExecuteCommand(Config.Command)
	end)
end
