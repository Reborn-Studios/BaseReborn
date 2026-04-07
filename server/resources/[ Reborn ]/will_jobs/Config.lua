-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

-- [ Tipos: "vrpex" / "creative" (v3) / "summerz" / "cn" ]
Config.base = "creative"

-- Inicio
Config.coords = {
	{ -1082.31,-247.59,37.77 }
}

-- Deletar veiculo ao finalizar o serviço
Config.deleteVeh = true

Config.jobs = {
	["Lixeiro"] = {
		text = "~g~[E]~w~ COLETAR",
		image = "./assets/images/lixeiro.png",
		description = "Recolha lixo pela cidade e contribua para um ambiente mais limpo.",
		steps = {
			[1] = {
				message = "Busque o veículo e coloque uniforme",
				coords = vector3(-469.3,-1721.89,18.69),
				camCoords = vector3(-463.55,-1718.35,18.66),
				camTime = 3000,
				spawnVeh = true
			},
			[2] = {
				message = "Vá as lixeiras e colete o lixo",
				coords = vector3(-361.7,-1864.53,20.53),
				camCoords = vector3(-370.65,-1862.68,20.53),
				camTime = 3000,
			},
		},

		startEvent = "will_jobs:initGarbageman",

		vehicleConfig = {
			vehicle = "trash",
			coords = vector4(-461.3,-1719.82,18.64,316.18)
		},

		blipType = "all",

		reward = function(level)
			local levelRewards = {
				[0] = math.random(15, 20),
				[1] = math.random(20, 25),
				[2] = math.random(25, 30),
				[3] = math.random(30, 40),
				[4] = math.random(40, 45),
				[5] = math.random(50, 60),
			}
			local xpRewards = {	[0] = 12, [1] = 12,	[2] = 12 }
			local XP_REWARD = xpRewards[level] or 8
			return levelRewards[level] or math.random(60, 80), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 50.0 then
				DrawMarker(1,x,y,z - 1.0,0,0,0,0,0,0,5.0,5.0,20.0,55,55,215,100,0,0,0,0)
			end
		end,
	},
	
	["Taxi"] = {
		text = "~g~[E]~w~ RECEBER CIDADÃO",
		image = "./assets/images/taxi.png",
		description = "Transporte passageiros pela cidade e ganhe dinheiro com corridas.",
		steps = {
			[1] = {
				message = "Busque o seu taxi e vista seu uniforme",
				coords = vector3(895.64,-178.49,74.71),
				camCoords = vector3(902.43,-188.61,73.79),
				spawnVeh = true,
				camTime = 4000,
			},
			[2] = {
				message = "Transporte os cidadãos com cuidado",
				coords = vector3(918.67,-163.91,78.15),
				camCoords = vector3(945.75,-161.27,83.9),
				camTime = 3000,
			},
		},

		startEvent = "will_jobs:initTaxi",

		vehicleConfig = {
			vehicle = "cdataxi",
			coords = vector4(900.87,-180.86,73.91,240.18)
		},

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 12
			local levelRewards = {
				[0] = math.random(50, 80),
				[1] = math.random(80, 100),
				[2] = math.random(100, 120),
				[3] = math.random(120, 140),
				[4] = math.random(140, 160),
				[5] = math.random(160, 180),
			}
			return levelRewards[level] or math.random(180, 250), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 50.0 then
				DrawMarker(1,x,y,z - 1.0,0,0,0,0,0,0,5.0,5.0,5.0,55,215,55,100,0,0,0,0)
			end
		end,
	},

	["Entregador"] = {
		text = "~g~[E]~w~ COLETAR",
		image = "./assets/images/entregador.png",
		description = "Faça entregas de diversos itens para diferentes locais.",
		steps = {
			[1] = {
				message = "Busque a moto e vista seu uniforme",
				coords = vector3(151.8,-1478.17,29.36),
				camCoords = vector3(156.29,-1487.45,29.28),
				camTime = 4000,
				spawnVeh = true,
			},
			[2] = {
				message = "Retire o pedido e entregue-o",
				coords = vector3(144.05,-1461.98,29.15),
				camCoords = vector3(150.32,-1460.4,29.97),
				camTime = 4000,
			},
		},

		startEvent = "will_jobs:initDelivery",

		vehicleConfig = {
			vehUpgrades = function(exp)
				if exp > 5 then
					return "carroavalanches"
				end
				return "carroentregas"
			end,
			coords = vector4(157.2,-1479.66,29.15,330.59)
		},

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 5
			local levelRewards = {
				[0] = math.random(30, 40),
				[1] = math.random(40, 50),
				[2] = math.random(50, 60),
				[3] = math.random(60, 70),
				[4] = math.random(70, 80),
				[5] = math.random(90, 100),
			}
			return levelRewards[level] or math.random(100, 150), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 50.0 then
				DrawMarker(1,x,y,z - 1.0,0,0,0,0,0,0,5.0,5.0,5.0,55,55,215,100,0,0,0,0)
			end
		end,
	},

	["Lenhador"] = {
		text = "~g~[E]~w~ COLETAR",
		image = "./assets/images/lenhador.png",
		description = "Corte e colete madeira nas florestas para venda e uso.",
		steps = {
			[1] = {
				message = "Vista seu uniforme e pegue o veiculo",
				coords = vector3(-843.12,5407.49,34.62),
				camCoords = vector3(-830.33,5416.95,34.39),
				spawnVeh = true,
				camTime = 4000,
			},
			[2] = {
				message = "Vá a area de reflorestamento e corte as arvores",
				coords = vector3(-554.65,5516.5,59.46),
				camCoords = vector3(-533.23,5532.12,70.63),
				camTime = 4000,
			},
			[3] = {
				message = "Vá a madeireira e venda suas madeiras",
				coords = vector3(-490.3,5329.56,83.58),
				camCoords = vector3(-465.04,5367.52,91.82),
				camTime = 4000,
			}
		},

		startEvent = "will_jobs:initLumberman",

		vehicleConfig = {
			vehicle = "ratloader",
			coords = vector4(-840.76,5414.66,34.53,271.02)
		},
		
		blipType = "all",

		onCollect = function()
			TriggerServerEvent("will_jobs:lumbermanPayout")
		end,

		reward = function(user_id, level)
			local XP_REWARD = 8
			local levelRewards = {
				[0] = math.random(2, 5),
				[1] = math.random(5, 8),
				[2] = math.random(8, 10),
				[3] = math.random(10, 13),
				[4] = math.random(13, 16),
				[5] = math.random(16, 20),
			}
			local WOOD_ITEM = "woodlog"
			local money = levelRewards[level] or math.random(20, 25)
			local itemAmount = getInventoryItemAmount(user_id, WOOD_ITEM) or 0
            money = money * itemAmount
			tryGetInventoryItem(user_id, WOOD_ITEM, itemAmount)
			return money, XP_REWARD
		end,
	},

	["Motorista"] = {
		text = "~g~[E]~w~ RECEBER PASSAGEIROS",
		image = "./assets/images/motorista.png",
		description = "Transporte mercadorias de um ponto a outro da cidade.",
		steps = {
			[1] = {
				message = "Pegue o ônibus e vista o uniforme",
				coords = vector3(453.54,-608.07,28.58),
				camCoords = vector3(463.92,-614.78,29.66),
				spawnVeh = true,
				camTime = 4000,
			},
			[2] = {
				message = "Transporte os cidadãos pela cidade",
				coords = vector3(115.54,-781.95,31.4),
				camCoords = vector3(127.78,-789.43,33.1),
				camTime = 4000,
			},
		},

		vehicleConfig = {
			vehicle = "bus",
			coords = vector4(462.76,-605.69,28.5,214.84)
		},

		startEvent = "will_jobs:initDriver",

		blipType = "progressive",

		reward = function(level)
			local XP_REWARD = 9
			local levelRewards = {
				[0] = math.random(20, 30),
				[1] = math.random(30, 40),
				[2] = math.random(40, 50),
				[3] = math.random(50, 60),
				[4] = math.random(60, 70),
				[5] = math.random(70, 80),
			}
			return levelRewards[level] or math.random(80, 100), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 50.0 then
				DrawMarker(1,x,y,z - 1.0,0,0,0,0,0,0,5.0,5.0,5.0,55,215,55,100,0,0,0,0)
			end
		end,
	},

	["Transportador"] = {
		text = "~g~[E]~w~ COLETAR",
		image = "./assets/images/transportador.png",
		salary = 2800,
		description = "Realize transporte de cargas pesadas entre localidades.",
		steps = {
			[1] = {
				message = "Busque o veiculo e vista seu uniforme",
				coords = vector3(238.6,243.0,106.19),
				camCoords = vector3(227.32,253.76,106.83),
				spawnVeh = true,
				camTime = 4000
			},
			[2] = {
				message = "Vá ao local coletar as malotes",
				coords = vector3(265.94,213.28,101.69),
				camCoords = vector3(259.54,215.95,101.69),
				camTime = 4000
			},
			[3] = {
				message = "Transporte as cargas com cuidado até o destino",
				coords = vector3(124.07,-885.38,30.48),
				camCoords = vector3(133.53,-893.57,33.42),
				camTime = 4000
			},
		},

		vehicleConfig = {
			vehicle = "stockade",
			coords = vector4(229.86,244.86,105.06,341.41)
		},

		startEvent = "will_jobs:initTransporter",

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 11
			local levelRewards = {
				[0] = math.random(50, 80),
				[1] = math.random(80, 100),
				[2] = math.random(100, 120),
				[3] = math.random(120, 140),
				[4] = math.random(140, 160),
				[5] = math.random(160, 180),
			}
			return levelRewards[level] or math.random(180, 250), XP_REWARD
		end,
	},
	
	["Caminhoneiro"] = {
		text = "~g~[E]~w~ COLETAR CARGA",
		blipDistance = 10.0,
		image = "./assets/images/caminhoneiro.png",
		salary = 3300,
		description = "Faça entregas de grandes cargas com seu caminhão.",
		steps = {
			[1] = {
				message = "Busque o caminhão",
				coords = vector3(1181.57,-3113.83,6.03),
				camCoords = vector3(1167.61,-3127.25,7.39),
				camTime = 4000,
				spawnVeh = true
			},
			[2] = {
				message = "Vá ao local buscar a carga",
				coords = vector3(1016.73,-3121.38,7.18),
				camCoords = vector3(1086.53,-3152.91,17.58),
				camTime = 4000
			},
			[3] = {
				message = "Transporte a carga até seu destino",
				coords = vector3(2216.4,1252.82,79.06),
				camCoords = vector3(2421.37,999.98,105.28),
				camTime = 4000
			},
		},

		vehicleConfig = {
			vehicle = "packer",
			coords = vector4(1179.19,-3106.23,6.12,88.97)
		},

		startEvent = "will_jobs:initTrucker",

		blipType = "progressive",

		reward = function(level)
			local XP_REWARD = 16
			local levelRewards = {
				[0] = math.random(50, 80),
				[1] = math.random(80, 100),
				[2] = math.random(100, 120),
				[3] = math.random(120, 140),
				[4] = math.random(140, 160),
				[5] = math.random(160, 180),
			}
			return levelRewards[level] or math.random(180, 250), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 50.0 then
				DrawMarker(1,x,y,z - 1.0,0,0,0,0,0,0,5.0,5.0,20.0,55,215,215,100,0,0,0,0)
			end
		end,
	},

	["Bombeiro"] = {
		text = "",
		image = "./assets/images/bombeiro.png",
		salary = 3200,
		description = "Apague incêndios e resgate pessoas em situações de perigo.",
		steps = {
			[1] = {
				message = "Busque o veiculo e vista seu uniforme",
				coords = vector3(216.0,-1649.05,29.81),
				camCoords = vector3(233.35,-1627.43,34.81),
				camTime = 4000,
				spawnVeh = true
			},
			[2] = {
				message = "Vá a locais que estão pegando fogo e ajude a apagar",
				coords = vector3(199.67,-1566.31,41.28),
				camCoords = vector3(215.22,-1625.88,42.6),
				camTime = 4000
			},
		},

		vehicleConfig = {
			vehicle = "firetruk",
			coords = vector4(213.12,-1637.86,29.68,322.93)
		},

		startEvent = "will_jobs:initFireman",

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 13
			local levelRewards = {
				[0] = math.random(50, 80),
				[1] = math.random(80, 100),
				[2] = math.random(100, 120),
				[3] = math.random(120, 140),
				[4] = math.random(140, 160),
				[5] = math.random(160, 180),
			}
			return levelRewards[level] or math.random(180, 250), XP_REWARD
		end,
	},
	
	["Mergulhador"] = {
		text = "~g~[E]~w~ COLETAR",
		image = "./assets/images/mergulhador.png",
		salary = 2400,
		description = "Mergulhe e recupere tesouros subaquáticos.",
		steps = {
			[1] = {
				message = "Pegue o submarino e vista o uniforme",
				coords = vector3(-848.03,-1368.96,1.61),
				camCoords = vector3(-841.39,-1367.15,1.61),
				camTime = 4000,
				spawnVeh = true
			},
			[2] = {
				message = "Mergulhe em direção aos tesouros subaquáticos",
				coords = vector3(-815.36,-1502.48,11.95),
				camCoords = vector3(-975.55,-1670.02,6.41),
				camTime = 4000
			},
		},

		vehicleConfig = {
			vehicle = "submersible",
			coords = vector4(-848.41,-1363.1,-1.2,111.72)
		},

		startEvent = "will_jobs:initDiver",

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 12
			local levelRewards = {
				[0] = math.random(50, 80),
				[1] = math.random(80, 100),
				[2] = math.random(100, 120),
				[3] = math.random(120, 140),
				[4] = math.random(140, 160),
				[5] = math.random(160, 180),
			}
			return levelRewards[level] or math.random(180, 250), XP_REWARD
		end,
	},

	["Salva_vidas"] = {
		text = "~g~[E]~w~ OBSERVAR",
		image = "./assets/images/salvavidas.png",
		salary = 2440,
		description = "Fique atento e salve os cidadãos em apuros.",
		steps = {
			[1] = {
				message = "Pegue o veiculo e vista o uniforme",
				coords = vector3(-1482.64,-1029.94,6.14),
				camCoords = vector3(-1473.37,-1029.77,7.39),
				camTime = 4000,
				spawnVeh = true
			},
			[2] = {
				message = "Fique de olho em banhistas em perigo",
				coords = vector3(-1560.78,-1155.59,3.92),
				camCoords = vector3(-1571.02,-1151.22,6.79),
				camTime = 4000
			},
			[3] = {
				message = "Salve os banhistas se afogando",
				coords = vector3(-1949.75,-905.75,1.7),
				camCoords = vector3(-1906.47,-782.35,3.52),
				camTime = 4000
			},
		},

		vehicleConfig = {
			vehicle = "blazer2",
			coords = vector4(-1480.03, -1033.39, 5.99, 229.98)
		},

		startEvent = "will_jobs:initSafeguard",

		blipType = "random",

		reward = function(level)
			local XP_REWARD = 12
			local levelRewards = {
				[0] = math.random(30, 40),
				[1] = math.random(40, 50),
				[2] = math.random(50, 60),
				[3] = math.random(60, 70),
				[4] = math.random(70, 80),
				[5] = math.random(80, 90),
			}
			return levelRewards[level] or math.random(90, 100), XP_REWARD
		end,

		helperMark = function(distance,x,y,z)
			if distance <= 70.0 then
				DrawMarker(1,x,y,z - 5.0,0,0,0,0,0,0,5.0,5.0,50.0,65,65,205,100,0,0,0,0)
			end
		end,
	},
}

-- Mensagens de debug
Config.debug = GlobalState['Basics']['Debug']

Config.notify = function(message, notifyType, source)
	local aliasNotify = {}
	if Config.base == "summerz" or Config.base == "cn" then
		aliasNotify = { ['sucesso'] = "verde", ['negado'] = "vermelho", ['aviso'] = "amarelo", ['importante'] = "azul" }
	end
	if IsDuplicityVersion() then
		TriggerClientEvent("Notify", source, aliasNotify[notifyType] or notifyType, message, 5000)
	else
		TriggerEvent("Notify", aliasNotify[notifyType] or notifyType, message, 5000)
	end
end

--######################--
--##     EXPORTS     ###--
--######################--

-- exports["will_jobs"]:addUserExp(user_id, "Lenhador", 10)
-- exports["will_jobs"]:remUserExp(user_id, "Lenhador", 10)
-- exports["will_jobs"]:getUserExp(user_id, "Lenhador")
