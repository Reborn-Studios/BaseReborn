Config = {}

--###############----###########
-- ##   Roubo a carro forte
--###############----###########

Config.stockade = {
    ['stockadeItem'] = "blackcard",
	['cops'] = 3,
    ['payment'] = {
        ['item'] = "dollars2",
        ['qntd'] = math.random(15000,30000),
    }
}

--###############----###########
-- ##      Roubo a joalheria
--###############----###########

Config.jewelry = {
	['cops'] = 5,
    ['bombLocs'] = { -631.29,-237.43,38.08,305.32 },
    ['itens'] = function(user_id)
		local aleat = math.random(100)
        if aleat >= 50 then
            vRP.giveInventoryItem(user_id,"watch",parseInt(math.random(14,16)),true)
        elseif aleat < 50 and aleat >= 10 then
            vRP.giveInventoryItem(user_id,"ring",parseInt(math.random(20,22)),true)
        elseif aleat < 10 then
            vRP.giveInventoryItem(user_id,"goldbar",parseInt(math.random(15,18)),true)
        end
    end,
}

--###############----###########
-- ##       Roubo gerais
--###############----###########

Config.gerais = {
	[1] = {
		["x"] = 28.24,
		["y"] = -1338.832,
		["z"] = 29.5,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 }
		}
	},
	[2] = {
		["x"] = 2548.883,
		["y"] = 384.850,
		["z"] = 108.63,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[3] = {
		["x"] = 1159.156,
		["y"] = -314.055,
		["z"] = 69.21,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[4] = {
		["x"] = -710.067,
		["y"] = -904.091,
		["z"] = 19.22,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[5] = {
		["x"] = -43.652,
		["y"] = -1748.122,
		["z"] = 29.43,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[6] = {
		["x"] = 378.291,
		["y"] = 333.712,
		["z"] = 103.57,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[7] = {
		["x"] = -3800000.385,
		["y"] = 1004.504,
		["z"] = 12.84,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[8] = {
		["x"] = 1734.968,
		["y"] = 6421.161,
		["z"] = 35.04,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[9] = {
		["x"] = 546.450,
		["y"] = 2662.45,
		["z"] = 42.16,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[10] = {
		["x"] = 1959.113,
		["y"] = 3749.239,
		["z"] = 32.35,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[11] = {
		["x"] = 2672.457,
		["y"] = 3286.811,
		["z"] = 55.25,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[12] = {
		["x"] = 1708.095,
		["y"] = 4920.711,
		["z"] = 42.07,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[13] = {
		["x"] = -1829.422,
		["y"] = 798.491,
		["z"] = 138.2,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[14] = {
		["x"] = -2959.66,
		["y"] = 386.765,
		["z"] = 14.05,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[15] = {
		["x"] = -3048.155,
		["y"] = 585.519,
		["z"] = 7.91,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[16] = {
		["x"] = 1126.75,
		["y"] = -979.760,
		["z"] = 45.42,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[17] = {
		["x"] = 1169.631,
		["y"] = 2717.833,
		["z"] = 37.16,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 3600,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[18] = {
		["x"] = -1478.67,
		["y"] = -375.675,
		["z"] = 39.17,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 7200,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[19] = {
		["x"] = -1221.126,
		["y"] = -916.213,
		["z"] = 11.33,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 7200,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[20] = {
		["x"] = 1693.374,
		["y"] = 3761.669,
		["z"] = 34.71,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[21] = {
		["x"] = 253.061,
		["y"] = -51.643,
		["z"] = 69.95,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[22] = {
		["x"] = 841.128,
		["y"] = -1034.951,
		["z"] = 28.2,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[23] = {
		["x"] = -330.467,
		["y"] = 6085.647,
		["z"] = 31.46,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[24] = {
		["x"] = -660.987,
		["y"] = -933.901,
		["z"] = 21.83,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[25] = {
		["x"] = -1304.775,
		["y"] = -395.832,
		["z"] = 36.7,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[26] = {
		["x"] = -1117.765,
		["y"] = 2700.388,
		["z"] = 18.56,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[27] = {
		["x"] = 2566.632,
		["y"] = 292.945,
		["z"] = 108.74,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[28] = {
		["x"] = -3172.701,
		["y"] = 1089.462,
		["z"] = 20.84,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[29] = {
		["x"] = 23.733,
		["y"] = -1106.27,
		["z"] = 29.8,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[30] = {
		["x"] = 808.914,
		["y"] = -2158.684,
		["z"] = 29.62,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "ammus",
		["cooldown"] = 7200,
		["name"] = "Loja de Armas",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "WEAPON_PISTOL", ["min"] = 1, ["max"] = 1 },
			{ ["item"] = "WEAPON_SNSPISTOL", ["min"] = 1, ["max"] = 2 },
			{ ["item"] = "ammo-9", ["min"] = 50, ["max"] = 75 }
		}
	},
	[31] = {
		["x"] = -1210.409,
		["y"] = -336.485,
		["z"] = 38.29,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 }
		}
	},
	[32] = {
		["x"] = -353.519,
		["y"] = -55.518,
		["z"] = 49.54,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 }
		}
	},
	[33] = {
		["x"] = 311.525,
		["y"] = -284.649,
		["z"] = 54.67,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 }
		}
	},
	[34] = {
		["x"] = 147.210,
		["y"] = -1046.292,
		["z"] = 29.87,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 }
		}
	},
	[35] = {
		["x"] = -2956.449,
		["y"] = 482.090,
		["z"] = 16.2,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 }
		}
	},
	[36] = {
		["x"] = 1175.66,
		["y"] = 2712.939,
		["z"] = 38.59,
		["cops"] = 8,
		["time"] = 300,
		["distance"] = 12,
		["type"] = "fleeca",
		["cooldown"] = 10800,
		["name"] = "Banco Fleeca",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 800000, ["max"] = 1000000 },
		}
	},
	[37] = {
		["x"] = 134.124,
		["y"] = -1708.138,
		["z"] = 29.7,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["cooldown"] = 2600,
		["required"] = "lockpick",
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[38] = {
		["x"] = -1284.667,
		["y"] = -1115.089,
		["z"] = 7.5,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["cooldown"] = 2600,
		["required"] = "lockpick",
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[39] = {
		["x"] = 1930.781,
		["y"] = 3727.585,
		["z"] = 33.35,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["required"] = "lockpick",
		["cooldown"] = 2600,
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[40] = {
		["x"] = 1211.147,
		["y"] = -470.180,
		["z"] = 66.71,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["required"] = "lockpick",
		["cooldown"] = 2600,
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[41] = {
		["x"] = -30.355,
		["y"] = -151.385,
		["z"] = 57.58,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["required"] = "lockpick",
		["cooldown"] = 2600,
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[42] = {
		["x"] = -278.047,
		["y"] = 6231.001,
		["z"] = 32.2,
		["cops"] = 2,
		["time"] = 120,
		["distance"] = 10,
		["type"] = "barber",
		["required"] = "lockpick",
		["cooldown"] = 2600,
		["name"] = "Barbearia",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 52000, ["max"] = 54000 },
		}
	},
	[43] = {
		["x"] = 265.336,
		["y"] = 220.184,
		["z"] = 102.09,
		["cops"] = 10,
		["time"] = 600,
		["distance"] = 20,
		["type"] = "bank",
		["cooldown"] = 21600,
		["name"] = "Vinewood Vault",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 2700000, ["max"] = 3200000 }
		}
	},
	[44] = {
		["x"] = -104.386,
		["y"] = 6477.150,
		["z"] = 31.83,
		["cops"] = 2,
		["time"] = 600,
		["distance"] = 12,
		["type"] = "bank",
		["cooldown"] = 21600,
		["name"] = "Savings Bank",
		["required"] = "blackcard",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 3000000, ["max"] = 4000000 }
		}
	},
	[45] = {
		["x"] = 1982.44,
		["y"] = 3053.4,
		["z"] = 47.22,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 7200,
		["name"] = "Yellow Jack",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 100000, ["max"] = 120000 },
		}
	},
	[46] = {
		["x"] = -3249.99,
		["y"] = 1004.39,
		["z"] = 12.84,
		["cops"] = 2,
		["time"] = 240,
		["distance"] = 12,
		["type"] = "convn",
		["cooldown"] = 7200,
		["name"] = "Loja de Departamento",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 140000, ["max"] = 160000 },
		}
	},
	[47] = {
		["x"] = 987.76,
		["y"] = -2129.84,
		["z"] = 30.48,
		["cops"] = 3,
		["time"] = 400,
		["distance"] = 20,
		["type"] = "chicken",
		["cooldown"] = 14400,
		["name"] = "Açougue",
		["required"] = "lockpick",
		["itens"] = {
			{ ["item"] = "dollars2", ["min"] = 1400000, ["max"] = 1600000 },
		}
	},
}

--###############----##############
-- ##   Roubo a caixa registradora
--###############----##############

Config.cashMachine = {
	['atm'] = {
		['cops'] = 2,
		['timeToExplode'] = math.random(30,40),
		['payment'] = {
			{ "dollars2", math.random(15000,17500) },
			{ "aluminum", math.random(10,20) },
			{ "rubber", math.random(25,50) },
			{ "plastic", math.random(25,50) },
		}
	},
	['machine'] = {
		['cops'] = 2,
		['payment'] = math.random(200,500)
	}
}
