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
	["Exemplo"] = {
		coords = { 2541.42,2277.36,31.74 }, 			-- COORDENADA DO CENTRO DA ÁREA DE DOMINAÇÃO / BLIP
		tempo_para_dominar = 500, 						-- CASO NINGUÉM ATINJA O LIMITE DE PONTOS, APÓS ESSE TEMPO ACABAR, A EQUIPE QUE ESTIVER MANTENDO A LIDERANÇA GANHARÁ (em segundos)
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
		grupo = 'Exemplo', 								-- Grupo que será dado aos vencedores (e removido dos perdedores)
		webhook = '', 									-- WebHook pra log
		itens = { 										-- Itens que serão dados aos membros da facção vencedora (apenas os que participaram da dominação)
			['weed'] = { quantidade_min = 2, quantidade_max = 4 }, 
			['cocaine'] = { quantidade_min = 1, quantidade_max = 1 },
		},
		receive_itens = 30,								-- Entrega de itens a cada 30 minutos
	},
}

-- Usar cores do: https://docs.fivem.net/docs/game-references/blips/
Config.fac_color = {
	['Admin'] = 3,
}
