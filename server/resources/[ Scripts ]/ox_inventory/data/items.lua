return {
	['testburger'] = {
		label = 'Test Burger',
		weight = 220,
		degrade = 60,
		client = {
			image = 'burger_chicken.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'burger',
			usetime = 2500,
		},
		server = {
			test = 'what an amazingly delicious burger, amirite?'
		},
		buttons = {
			{
				label = 'Lick it',
				action = function(slot)
					print('You licked the burger')
				end
			},
			{
				label = 'Squeeze it',
				action = function(slot)
					print('You squeezed the burger :(')
				end
			},
			{
				label = 'What do you call a vegan burger?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('A misteak.')
				end
			},
			{
				label = 'What do frogs like to eat with their hamburgers?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('French flies.')
				end
			},
			{
				label = 'Why were the burger and fries running?',
				group = 'Hamburger Puns',
				action = function(slot)
					print('Because they\'re fast food.')
				end
			}
		},
		consume = 0.3
	},
	['bandage'] = {
		label = 'Bandagem',
		weight = 115,
		client = {
			anim = { dict = 'missheistdockssetup1clipboard@idle_a', clip = 'idle_a', flag = 49 },
			prop = { model = `prop_rolled_sock_02`, pos = vec3(-0.14, -0.14, -0.08), rot = vec3(-50.0, -50.0, 0.0) },
			disable = { move = true, car = true, combat = true },
			usetime = 2500,
		}
	},
	['burger'] = {
		label = 'Hambúrguer',
		weight = 220,
		degrade = 60,
		decay = true,
		client = {
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'burger',
			usetime = 2500,
			notification = 'Você comeu um delicioso hambúrguer'
		},
	},
	['cola'] = {
		label = 'Coca Cola',
		weight = 350,
		client = {
			status = { thirst = 200000 },
			anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
			prop = { model = `prop_ecola_can`, pos = vec3(0.01, 0.01, 0.06), rot = vec3(5.0, 5.0, -180.5) },
			usetime = 2500,
			notification = 'Você matou sua sede com uma cola'
		}
	},
	['sprunk'] = {
		label = 'Sprite',
		weight = 350,
		client = {
			status = { thirst = 200000 },
			anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
			prop = { model = `prop_ld_can_01`, pos = vec3(0.01, 0.01, 0.06), rot = vec3(5.0, 5.0, -180.5) },
			usetime = 2500,
			notification = 'Você matou sua sede com uma sprite'
		}
	},
	['parachute'] = {
		label = 'Paraquedas',
		weight = 8000,
		stack = true,
		client = {
			anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
			usetime = 1500
		}
	},

	["soda"] = {
		label = "Soda",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "soda.png",
		}
	},

	["ritmoneury"] = {
		label = "Ritmoneury",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "ritmoneury.png",
		}
	},

	["warfarin"] = {
		label = "Kit Médico",
		weight = 500,
		stack = true,
		close = true,
		description = "Kit Medico para recuperar sua saude",
		client = {
			image = "warfarin.png",
		}
	},

	["playstation"] = {
		label = "Playstation",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "playstation.png",
		}
	},

	["keyboard"] = {
		label = "Teclado",
		weight = 400,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "keyboard.png",
		}
	},

	["dewars"] = {
		label = "Dewars",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "dewars.png",
		}
	},

	["lockpick"] = {
		label = "Lockpick",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "lockpick.png",
		}
	},

	["energetic"] = {
		label = "Energético",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "energetic.png",
		}
	},

	["woodlog"] = {
		label = "Tora de Madeira",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "woodlog.png",
		}
	},

	["hotdog"] = {
		label = "Cachorro-Quente",
		weight = 300,
		stack = true,
		close = true,
		degrade = 40,
		decay = true,
		client = {
			image = 'hotdog.png',
			status = { hunger = 200000 },
			anim = 'eating_dog',
			prop = 'hotdog',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["celular"] = {
		label = "Telefone",
		close = true,
		description = "Sem descrição",
		weight = 190,
		stack = false,
		--[[ consume = 0,
		client = {
			export = "lb-phone.UsePhoneItem",
			remove = function()
				TriggerEvent("lb-phone:itemRemoved")
			end,
			add = function()
				TriggerEvent("lb-phone:itemAdded")
			end
		} ]]
	},

	["bucket"] = {
		label = "Balde",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "bucket.png",
		}
	},

	["glass"] = {
		label = "Vidro",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "glass.png",
		}
	},

	["premiumplate"] = {
		label = "Placa Premium",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "premiumplate.png",
		}
	},

	["seringac"] = {
		label = "Seringa C",
		weight = 1500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "seringac.png",
		}
	},

	["premiumname"] = {
		label = "Mudar Nome",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "premiumname.png",
		}
	},

	["identity"] = {
		label = "Identidade",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "identity.png",
		}
	},

	["dollars2"] = {
		label = "Dinheiro Sujo",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "dollars2.png",
		}
	},

	["methliquid"] = {
		label = "Meta Líquida",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "methliquid.png",
		}
	},

	["armacaodearma"] = {
		label = "Armacao",
		weight = 50,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "armacaodearma.png",
		}
	},

	["absolut"] = {
		label = "Absolut",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "absolut.png",
		}
	},

	["octopus"] = {
		label = "Polvo",
		weight = 600,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "octopus.png",
		}
	},

	["hennessy"] = {
		label = "Hennessy",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "hennessy.png",
		}
	},

	["camera"] = {
		label = "Câmera",
		weight = 2500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "camera.png",
		}
	},

	["cocaempo"] = {
		label = "Coca em pó",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "cocaempo.png",
		}
	},

	["analgesic"] = {
		label = "Analgésico",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "analgesic.png",
		}
	},

	["grafite"] = {
		label = "Grafite",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "grafite.png",
		}
	},

	["papelmoeda"] = {
		label = "Papel Moeda",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "papelmoeda.png",
		}
	},

	["rubber"] = {
		label = "Borracha",
		weight = 50,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "rubber.png",
		}
	},

	["blackcard"] = {
		label = "Cartão Preto",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "blackcard.png",
		}
	},

	["cannabisseed"] = {
		label = "Sementes de maconha",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "cannabisseed.png",
		}
	},

	["fungo"] = {
		label = "fungo",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "fungo.png",
		}
	},

	["joint"] = {
		label = "Baseado",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "joint.png",
		}
	},

	["premiumgarage"] = {
		label = "+ 1 Garagem",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "premiumgarage.png",
		}
	},

	["fries"] = {
		label = "Fritas",
		weight = 300,
		stack = true,
		close = true,
		degrade = 60,
		decay = true,
		client = {
			image = 'fries.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'fries',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["pager"] = {
		label = "Pager",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "pager.png",
		}
	},

	["tires"] = {
		label = "Pneus",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "tires.png",
		}
	},

	["gdtkit"] = {
		label = "Kit Químico",
		weight = 750,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gdtkit.png",
		}
	},

	["backpackp"] = {
		label = "Mochila P",
		weight = 250,
		stack = true,
		close = true,
		description = "Mochila para reforçar o peso",
		client = {
			image = "backpackp.png",
		}
	},

	["pecadearma"] = {
		label = "Peca de arma",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "pecadearma.png",
		}
	},

	["folhademaconha"] = {
		label = "Folha De Maconha",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "folhademaconha.png",
		}
	},

	["aio_box"] = {
		label = "Aio Lootbox",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "aio_box.png",
		}
	},

	["gatilho"] = {
		label = "Gatilho",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gatilho.png",
		}
	},

	["bracelet"] = {
		label = "Bracelete",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "bracelet.png",
		}
	},

	["sandwich"] = {
		label = "Sanduiche",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "sandwich.png",
		}
	},

	["divingsuit"] = {
		label = "Roupa de Mergulho",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "divingsuit.png",
		}
	},

	["firecracker"] = {
		label = "Fogos de Artificio",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "firecracker.png",
		}
	},

	["cigarette"] = {
		label = "Cigarro",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "cigarette.png",
		}
	},

	["sinkalmy"] = {
		label = "Sinkalmy",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "sinkalmy.png",
		}
	},

	["meth"] = {
		label = "Metanfetamina",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "meth.png",
		}
	},

	["premiumpersonagem"] = {
		label = "+1 Personagem",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "premiumpersonagem.png",
		}
	},

	["fueltech"] = {
		label = "Fueltech",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "fueltech.png",
		}
	},

	["backpackm"] = {
		label = "Mochila M",
		weight = 500,
		stack = true,
		close = true,
		description = "Mochila para reforçar o peso",
		client = {
			image = "backpackm.png",
		}
	},

	["alvejante"] = {
		label = "Solvente",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "alvejante.png",
		}
	},

	["radio"] = {
		label = "Rádio",
		weight = 1000,
		stack = true,
		close = true,
		description = "Comunique-se com seus amigos e colegas",
		client = {
			image = "radio.png",
		}
	},

	["money_box"] = {
		label = "Money Lootbox",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "money_box.png",
		}
	},

	["maconhamacerada"] = {
		label = "Maconha Prensada",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "maconhamacerada.png",
		}
	},

	["medkit_box"] = {
		label = "Medkit Lootbox",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "medkit_box.png",
		}
	},

	["removedor"] = {
		label = "Removedor",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "removedor.png",
		}
	},

	["bait"] = {
		label = "Isca",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "bait.png",
		}
	},

	["aluminum"] = {
		label = "Alúminio",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "aluminum.png",
		}
	},

	["hamburger"] = {
		label = "Hamburger",
		weight = 500,
		stack = true,
		close = true,
		degrade = 60,
		decay = true,
		client = {
			image = 'hamburger.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'burger',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["cpuchip"] = {
		label = "Processador",
		weight = 750,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "cpuchip.png",
		}
	},

	["vest"] = {
		label = "Colete",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "vest.png",
		}
	},

	["paperbag"] = {
		label = "Saco de Papel",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "paperbag.png",
		}
	},

	["teddy"] = {
		label = "Teddy",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "teddy.png",
		}
	},

	["binoculars"] = {
		label = "Binóculos",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "binoculars.png",
		}
	},

	["postit"] = {
		label = "Bloco de Notas",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "postit.png",
		}
	},

	["goldbar"] = {
		label = "Barra de Ouro",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "goldbar.png",
		}
	},

	["vehicle_box"] = {
		label = "Vehicle Lootbox",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "vehicle_box.png",
		}
	},

	["toolbox"] = {
		label = "Caixa de Ferramentas",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "toolbox.png",
		}
	},

	["acidobateria"] = {
		label = "acido bateria",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "acidobateria.png",
		}
	},

	["gauze"] = {
		label = "Gaze",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gauze.png",
		}
	},

	["lean"] = {
		label = "Lean",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "lean.png",
		}
	},

	["chandon"] = {
		label = "Chandon",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "chandon.png",
		}
	},

	["raceticket"] = {
		label = "Ticket de Corrida",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "raceticket.png",
		}
	},

	["tecido"] = {
		label = "Tecido",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "tecido.png",
		}
	},

	["silk"] = {
		label = "Seda",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "silk.png",
		}
	},

	["lsd"] = {
		label = "Lsd",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "lsd.png",
		}
	},

	["fichas"] = {
		label = "Fichas",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "fichas.png",
		}
	},

	["dollars"] = {
		label = "Dinheiro",
		weight = 0,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "dollars.png",
		}
	},

	["eletronics"] = {
		label = "Eletrônico",
		weight = 10,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "eletronics.png",
		}
	},

	["pouch"] = {
		label = "Malote",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "pouch.png",
		}
	},

	["ominitrix"] = {
		label = "Ominitrix",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "ominitrix.png",
		}
	},

	["cocaine"] = {
		label = "Cocaina",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "cocaine.png",
		}
	},

	["hood"] = {
		label = "Capuz",
		weight = 1500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "hood.png",
		}
	},

	["brass"] = {
		label = "Bronze",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "brass.png",
		}
	},

	["seringaa"] = {
		label = "Seringa A",
		weight = 1500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "seringaa.png",
		}
	},

	["linha"] = {
		label = "Linha",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "linha.png",
		}
	},

	["gsrkit"] = {
		label = "Kit Residual",
		weight = 750,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gsrkit.png",
		}
	},

	["dildo"] = {
		label = "Vibrador",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "dildo.png",
		}
	},

	["capsule"] = {
		label = "Capsula",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "capsule.png",
		}
	},

	["bluecard"] = {
		label = "Cartão Azul",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "bluecard.png",
		}
	},

	["backpackg"] = {
		label = "Mochila G",
		weight = 1000,
		stack = true,
		close = true,
		description = "Mochila para reforçar o peso",
		client = {
			image = "backpackg.png",
		}
	},

	["notebook"] = {
		label = "Notebook",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "notebook.png",
		}
	},

	["pano"] = {
		label = "Pano",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "pano.png",
		}
	},

	["tacos"] = {
		label = "Tacos",
		weight = 500,
		stack = true,
		close = true,
		degrade = 60,
		decay = true,
		client = {
			image = 'tacos.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'tacos',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["mouse"] = {
		label = "Mouse",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "mouse.png",
		}
	},

	["dirtywater"] = {
		label = "Água Suja",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "dirtywater.png",
		}
	},

	["plate"] = {
		label = "Placa",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "plate.png",
		}
	},

	["lighter"] = {
		label = "Isqueiro",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "lighter.png",
		}
	},

	["delivery"] = {
		label = "Pacote",
		weight = 2500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "delivery.png",
		}
	},

	["adrenaline"] = {
		label = "Adrenalina",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "adrenaline.png",
		}
	},

	["barrier"] = {
		label = "Barreira",
		weight = 5000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "barrier.png",
		}
	},

	["pastadecoca"] = {
		label = "pasta de coca",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "pastadecoca.png",
		}
	},

	["weed"] = {
		label = "Maconha",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "weed.png",
		}
	},

	["emptybottle"] = {
		label = "Garrafa Vazia",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "emptybottle.png",
		}
	},

	["chocolate"] = {
		label = "Chocolate",
		weight = 200,
		stack = true,
		close = true,
		degrade = 60,
		decay = true,
		client = {
			image = 'chocolate.png',
			status = { hunger = 200000 },
			anim = 'eating',
			prop = 'chocolate',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["compost"] = {
		label = "Adubo",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "compost.png",
		}
	},

	["vest_box"] = {
		label = "Vest Lootbox",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "vest_box.png",
		}
	},

	["donut"] = {
		label = "Rosquinha",
		weight = 200,
		stack = true,
		close = true,
		degrade = 60,
		decay = true,
		client = {
			image = 'donut.png',
			status = { hunger = 200000 },
			anim = 'eating_dog',
			prop = 'donut',
			usetime = 2500,
		},
		description = "Sem descrição",
	},

	["backpackx"] = {
		label = "Mochila X",
		weight = 2000,
		stack = true,
		close = true,
		description = "Mochila para reforçar o peso",
		client = {
			image = "backpackx.png",
		}
	},

	["cirurgia"] = {
		label = "Cirurgia",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "premiumpersonagem.png",
		}
	},

	["coffee"] = {
		label = "Café",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "coffee.png",
		}
	},

	["vape"] = {
		label = "Vape",
		weight = 800,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "vape.png",
		}
	},

	["xbox"] = {
		label = "Xbox",
		weight = 2000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "xbox.png",
		}
	},

	["shrimp"] = {
		label = "Camarão",
		weight = 400,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "shrimp.png",
		}
	},

	["watch"] = {
		label = "Relogio",
		weight = 1000,
		stack = true,
		close = true,
		description = "Relogio estiloso para seu visual",
		client = {
			image = "watch.png",
		}
	},

	["gunpowder"] = {
		label = "Pólvora",
		weight = 50,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gunpowder.png",
		}
	},

	["handcuff"] = {
		label = "Algemas",
		weight = 750,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "handcuff.png",
		}
	},

	["plastic"] = {
		label = "Plástico",
		weight = 50,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "plastic.png",
		}
	},

	["c4"] = {
		label = "C4",
		weight = 3000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "c4.png",
		}
	},

	["tinta"] = {
		label = "Tinta",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "tinta.png",
		}
	},

	["water"] = {
		label = "Água",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "water.png",
		}
	},

	["ring"] = {
		label = "Anel",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "ring.png",
		}
	},

	["rope"] = {
		label = "Cordas",
		weight = 1500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "rope.png",
		}
	},

	["fishingrod"] = {
		label = "Vara de Pescar",
		weight = 3000,
		stack = true,
		close = true,
		description = "Uma pescaria sempre relaxa",
		client = {
			image = "fishingrod.png",
		}
	},

	["copper"] = {
		label = "Cobre",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "copper.png",
		}
	},

	["legos"] = {
		label = "Legos",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "legos.png",
		}
	},

	["rose"] = {
		label = "Rosa",
		weight = 100,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "rose.png",
		}
	},

	["carp"] = {
		label = "Carpa",
		weight = 500,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "carp.png",
		}
	},

	["ecstasy"] = {
		label = "Ecstasy",
		weight = 300,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "ecstasy.png",
		}
	},

	["gallon"] = {
		label = "Galão",
		weight = 1250,
		stack = false,
		close = true,
		description = "Sem descrição",
		client = {
			image = "gallon.png",
		}
	},

	["fuel"] = {
		label = "Combustível",
		weight = 1,
		stack = false,
		close = true,
		description = "Sem descrição",
		client = {
			image = "fuel.png",
		}
	},

	["roupas"] = {
		label = "Roupas",
		weight = 1,
		stack = true,
		close = true,
		description = "Realize trocas de roupas",
		client = {
			image = "roupas.png",
		}
	},

	["radio_jammer"] = {
		label = "Radio Jammer",
		weight = 10000,
		description = "Bloqueie sinais de radio",
	},

	["drugtable"] = {
		label = "Mesa de drogas",
		weight = 5000,
		stack = true,
		close = true,
		description = "Mesa para venda de drogas",
		client = {
			image = "drugtable.png",
		}
	},

	["gemstone"] = {
		label = "Gemas",
		weight = 0,
		stack = true,
		close = true,
		description = "Utilize para ganhar suas gemas",
		client = {
			image = "gemstone.png",
		}
	},

	["cat"] = {
		label = "Coleira de Gato",
		weight = 1250,
		stack = true,
		close = true,
		description = "Gato Pet",
		client = {
			image = "cat.png",
		}
	},

	["poodle"] = {
		label = "Coleira de Poodle",
		weight = 1250,
		stack = true,
		close = true,
		description = "Poodle Pet",
		client = {
			image = "poodle.png",
		}
	},

	["shepherd"] = {
		label = "Coleira de Shepherd",
		weight = 1250,
		stack = true,
		close = true,
		description = "Shepherd Pet",
		client = {
			image = "shepherd.png",
		}
	},

	["retriever"] = {
		label = "Coleira de Retriever",
		weight = 1250,
		stack = true,
		close = true,
		description = "Retriever Pet",
		client = {
			image = "retriever.png",
		}
	},

	["westy"] = {
		label = "Coleira de Westy",
		weight = 1250,
		stack = true,
		close = true,
		description = "Westy Pet",
		client = {
			image = "westy.png",
		}
	},

	["husky"] = {
		label = "Coleira de Husky",
		weight = 1250,
		stack = true,
		close = true,
		description = "Husky Pet",
		client = {
			image = "husky.png",
		}
	},

	["pug"] = {
		label = "Coleira de Pug",
		weight = 1250,
		stack = true,
		close = true,
		description = "Pug Pet",
		client = {
			image = "pug.png",
		}
	},

	["rottweiler"] = {
		label = "Coleira de Rottweiler",
		weight = 1250,
		stack = true,
		close = true,
		description = "Rottweiler Pet",
		client = {
			image = "rottweiler.png",
		}
	},

	["vehkey"] = {
		label = "Chave Veícular",
		close = true,
		weight = 250,
		description = "Chave de veiculo",
		client = {
			image = "vehiclekey.png",
		}
	},

	["GADGET_PARACHUTE"] = {
		label = "Paraquedas",
		weight = 2250,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "GADGET_PARACHUTE.png",
		}
	},

	["AMMO_PETROLCAN"] = {
		label = "Combustível",
		weight = 1,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "AMMO_PETROLCAN.png",
		}
	},

	["shotgunammo"] = {
		label = "M. Escopeta",
		weight = 50,
		stack = true,
		close = true,
		description = "Munição para escopetas",
		client = {
			image = "shotgunammo.png",
		}
	},

	["WEAPON_STONEHATCHET"] = {
		label = "Machado de Pedra",
		weight = 750,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "WEAPON_STONEHATCHET.png",
		}
	},

	["attachsgrip"] = {
		label = "Grip",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "attachsgrip.png",
		}
	},

	["rifleammo"] = {
		label = "M. Rifle",
		weight = 40,
		stack = true,
		close = true,
		description = "Munição para rifles",
		client = {
			image = "rifleammo.png",
		}
	},

	["pistolammo"] = {
		label = "M. Pistola",
		weight = 20,
		stack = true,
		close = true,
		description = "Munição para pistolas",
		client = {
			image = "pistolammo.png",
		}
	},

	["attachsflashlight"] = {
		label = "Lanterna",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "attachsflashlight.png",
		}
	},

	["attachssilencer"] = {
		label = "Silenciador",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "attachssilencer.png",
		}
	},

	["finish"] = {
		label = "Skin",
		weight = 1000,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "finish.png",
		}
	},

	["clip"] = {
		label = "Pente",
		weight = 1000,
		stack = true,
		close = true,
		description = "Pente para armas pequenas e grandes",
		client = {
			image = "clip.png",
		}
	},

	["grip"] = {
		label = "Empunhadura",
		weight = 1000,
		stack = true,
		close = true,
		description = "Empunhadura para armas pequenas e grandes",
		client = {
			image = "grip.png",
		}
	},

	["suppressor"] = {
		label = "Silenciador",
		weight = 1000,
		stack = true,
		close = true,
		description = "Silenciador para armas pequenas e grandes",
		client = {
			image = "suppressor.png",
		}
	},

	["smgammo"] = {
		label = "M. Sub Metralhadora",
		weight = 30,
		stack = true,
		close = true,
		description = "Munição para submetralhadoras",
		client = {
			image = "smgammo.png",
		}
	},

	["scope"] = {
		label = "Mira",
		weight = 1000,
		stack = true,
		close = true,
		description = "Mira para armas pequenas e grandes",
		client = {
			image = "scope.png",
		}
	},

	["flashlight"] = {
		label = "Lanterna",
		weight = 1000,
		stack = true,
		close = true,
		description = "Lanterna para armas pequenas e grandes",
		client = {
			image = "flashlight.png",
		}
	},

	["attachscrosshair"] = {
		label = "Mira",
		weight = 200,
		stack = true,
		close = true,
		description = "Sem descrição",
		client = {
			image = "attachscrosshair.png",
		}
	},

	["paintingg"] = {
		label = "paintingg",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintingg.png",
		}
	},

	["paintingh"] = {
		label = "paintingh",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintingh.png",
		}
	},

	["paintingf"] = {
		label = "paintingf",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintingf.png",
		}
	},

	["drill"] = {
		label = "Drill",
		weight = 500,
		stack = true,
		close = true,
		description = "Furadeira",
		client = {
			image = "drill.png",
		}
	},

	["bag"] = {
		label = "Bag",
		weight = 500,
		stack = true,
		close = true,
		description = "Mochila para roubo",
		client = {
			image = "bag.png",
		}
	},

	["paintingj"] = {
		label = "paintingj",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintingj.png",
		}
	},

	["thermite_h"] = {
		label = "Termita",
		weight = 500,
		stack = true,
		close = true,
		description = "Termita para abrir trancas",
		client = {
			image = "thermite_h.png",
		}
	},

	["paintingi"] = {
		label = "paintingi",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintingi.png",
		}
	},

	["yacht_drill"] = {
		label = "Drill",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "yacht_drill.png",
		}
	},

	["diamond"] = {
		label = "Diamantes",
		weight = 0,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "diamond.png",
		}
	},

	["hack_usb"] = {
		label = "Hack USB",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "hack_usb.png",
		}
	},

	["paintinge"] = {
		label = "paintinge",
		weight = 500,
		stack = true,
		close = true,
		description = "",
		client = {
			image = "paintinge.png",
		}
	},

	["cutter"] = {
		label = "cutter",
		weight = 500,
		stack = true,
		close = true,
		description = "Cortador",
		client = {
			image = "cutter.png",
		}
	},
}