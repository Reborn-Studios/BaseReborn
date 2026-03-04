Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
local Webhooks = module("config/webhooks") or {}

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}
Config.tempo_att_blip = 60 			-- Tempo para os blips atualizarem (recomendado deixar 60 segundos +)
Config.group_type = "job" 			-- Tipo de grupo que as facções são (atributo GTYPE)
Config.debug = false 				-- Mensagens no console
Config.startDom = 1000 				-- segundos  --*60*60*4	-- 4 horas

-----##########################################################-----
--###      CONFIGURAÇÃO/CRIAÇÃO DAS ÁREAS DE DOMINAÇÃO
-----##########################################################-----

Config.locais = {
	["Industria"] = {
		coords = { 2750.04,1516.03,24.51 }, 			-- COORDENADA DO CENTRO DA ÁREA DE DOMINAÇÃO / BLIP
		tempo_para_dominar = 900, 						-- CASO NINGUÉM ATINJA O LIMITE DE PONTOS, APÓS ESSE TEMPO ACABAR, A EQUIPE QUE ESTIVER MANTENDO A LIDERANÇA GANHARÁ (em segundos)
		tamanho_area = 170, 							-- TAMANHO DA ÁREA DE DOMINAÇÃO
		cooldown = 60*60*24*3, 							-- TEMPO PARA ÁREA PODER SER DOMINADA NOVAMENTE (padrão 3 dias)
		sets = { 										-- APENAS OS SETS QUE POSSUIREM ESSA PERMISSÃO, FARÃO EFEITO NA PONTUAÇÃO TOTAL / PODERÁ STARTAR A DOMINAÇÃO
			"cassino.permissao",
			"motoclub.permissao",
			"milicia.permissao",
			"bahamas.permissao",
			"mafia.permissao",
			"vanilla.permissao",
			"verdes.permissao",
			"vermelhos.permissao",
			"azuis.permissao",
		},
		pontos = { 										-- CONFIGURAÇÃO GERAL DA PONTUAÇÃO
			limite = 50,
			ganhando = 1, 								-- Quantos pontos cada player da facção que estiver ganhando irá somar ao total
			perdendo = 1, 								-- Quantos pontos cada player da facção que estiver perdendo irá retirar do total
			modo_pontuacao = "fixo", 					-- Modo pontuação: (distancia/fixo).
		},
		grupo = 'Industria', 								-- Grupo que será dado aos vencedores (e removido dos perdedores)
		webhook = Webhooks.webhhokdomination, 			-- WebHook pra log
		itens = {}, 									-- Itens que serão dados aos membros da facção vencedora (apenas os que participaram da dominação)
		receive_itens = 30,								-- Entrega de itens a cada 30 minutos
	},
	["Teatro"] = {
		coords = { 696.81,606.86,128.92 }, 			-- COORDENADA DO CENTRO DA ÁREA DE DOMINAÇÃO / BLIP
		tempo_para_dominar = 900, 						-- CASO NINGUÉM ATINJA O LIMITE DE PONTOS, APÓS ESSE TEMPO ACABAR, A EQUIPE QUE ESTIVER MANTENDO A LIDERANÇA GANHARÁ (em segundos)
		tamanho_area = 170, 							-- TAMANHO DA ÁREA DE DOMINAÇÃO
		cooldown = 60*60*24*3, 							-- TEMPO PARA ÁREA PODER SER DOMINADA NOVAMENTE (padrão 7 dias)
		sets = { 										-- APENAS OS SETS QUE POSSUIREM ESSA PERMISSÃO, FARÃO EFEITO NA PONTUAÇÃO TOTAL / PODERÁ STARTAR A DOMINAÇÃO
			"cassino.permissao",
			"motoclub.permissao",
			"milicia.permissao",
			"bahamas.permissao",
			"mafia.permissao",
			"vanilla.permissao",
			"verdes.permissao",
			"vermelhos.permissao",
			"azuis.permissao",
		},
		pontos = { 										-- CONFIGURAÇÃO GERAL DA PONTUAÇÃO
			limite = 50,
			ganhando = 1, 								-- Quantos pontos cada player da facção que estiver ganhando irá somar ao total
			perdendo = 1, 								-- Quantos pontos cada player da facção que estiver perdendo irá retirar do total
			modo_pontuacao = "fixo", 					-- Modo pontuação: (distancia/fixo).
		},
		grupo = 'Teatro', 								-- Grupo que será dado aos vencedores (e removido dos perdedores)
		webhook = '', 									-- WebHook pra log
		itens = {},
		receive_itens = 30,								-- Entrega de itens a cada 30 minutos
	},
	["Petroleira"] = {
		coords = { 1617.9,-2243.29,107.17 }, 			-- COORDENADA DO CENTRO DA ÁREA DE DOMINAÇÃO / BLIP
		tempo_para_dominar = 900, 						-- CASO NINGUÉM ATINJA O LIMITE DE PONTOS, APÓS ESSE TEMPO ACABAR, A EQUIPE QUE ESTIVER MANTENDO A LIDERANÇA GANHARÁ (em segundos)
		tamanho_area = 170, 							-- TAMANHO DA ÁREA DE DOMINAÇÃO
		cooldown = 60*60*24*3, 							-- TEMPO PARA ÁREA PODER SER DOMINADA NOVAMENTE (padrão 7 dias)
		sets = { 										-- APENAS OS SETS QUE POSSUIREM ESSA PERMISSÃO, FARÃO EFEITO NA PONTUAÇÃO TOTAL / PODERÁ STARTAR A DOMINAÇÃO
			"cassino.permissao",
			"motoclub.permissao",
			"milicia.permissao",
			"bahamas.permissao",
			"mafia.permissao",
			"vanilla.permissao",
			"verdes.permissao",
			"vermelhos.permissao",
			"azuis.permissao",
		},
		pontos = { 										-- CONFIGURAÇÃO GERAL DA PONTUAÇÃO
			limite = 50,
			ganhando = 1, 								-- Quantos pontos cada player da facção que estiver ganhando irá somar ao total
			perdendo = 1, 								-- Quantos pontos cada player da facção que estiver perdendo irá retirar do total
			modo_pontuacao = "fixo", 					-- Modo pontuação: (distancia/fixo).
		},
		grupo = 'Petroleira', 								-- Grupo que será dado aos vencedores (e removido dos perdedores)
		webhook = '', 									-- WebHook pra log
		itens = {},
		receive_itens = 30,								-- Entrega de itens a cada 30 minutos
	},
	["Madeireira"] = {
		coords = { -469.87,5356.89,80.76 }, 			-- COORDENADA DO CENTRO DA ÁREA DE DOMINAÇÃO / BLIP
		tempo_para_dominar = 900, 						-- CASO NINGUÉM ATINJA O LIMITE DE PONTOS, APÓS ESSE TEMPO ACABAR, A EQUIPE QUE ESTIVER MANTENDO A LIDERANÇA GANHARÁ (em segundos)
		tamanho_area = 170, 							-- TAMANHO DA ÁREA DE DOMINAÇÃO
		cooldown = 60*60*24*3, 							-- TEMPO PARA ÁREA PODER SER DOMINADA NOVAMENTE (padrão 7 dias)
		sets = { 										-- APENAS OS SETS QUE POSSUIREM ESSA PERMISSÃO, FARÃO EFEITO NA PONTUAÇÃO TOTAL / PODERÁ STARTAR A DOMINAÇÃO
			"cassino.permissao",
			"motoclub.permissao",
			"milicia.permissao",
			"bahamas.permissao",
			"mafia.permissao",
			"vanilla.permissao",
			"verdes.permissao",
			"vermelhos.permissao",
			"azuis.permissao",
		},
		pontos = { 										-- CONFIGURAÇÃO GERAL DA PONTUAÇÃO
			limite = 50,
			ganhando = 1, 								-- Quantos pontos cada player da facção que estiver ganhando irá somar ao total
			perdendo = 1, 								-- Quantos pontos cada player da facção que estiver perdendo irá retirar do total
			modo_pontuacao = "fixo", 					-- Modo pontuação: (distancia/fixo).
		},
		grupo = 'Madeireira', 								-- Grupo que será dado aos vencedores (e removido dos perdedores)
		webhook = '', 									-- WebHook pra log
		itens = {},
		receive_itens = 30,								-- Entrega de itens a cada 30 minutos
	},
}

-- Usar cores do: https://docs.fivem.net/docs/game-references/blips/
Config.fac_color = {
	["cassino.permissao"] = 15,
	["motoclub.permissao"] = 6,
	["milicia.permissao"] = 10,
	["bahamas.permissao"] = 17,
	["mafia.permissao"] = 22,
	["vanilla.permissao"] = 5,
	["verdes.permissao"] = 2,
	["vermelhos.permissao"] = 1,
	["azuis.permissao"] = 3,
}
