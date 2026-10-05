-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CONFIGURACAO
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin = {}

TriadeAdmin.Brand = {
	["Title"] = "ADMIN",
	["Short"] = "R",
	["Version"] = "v1.0.0"
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- ABERTURA DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Open = {
	["Command"] = "painel",					-- /painel
	["Aliases"] = { "adm", "admin" },		-- comandos alternativos
	["Key"] = "",							-- sem tecla; atribuir em Definicoes > Atalhos de Teclado
	["TicketCommand"] = "chamado",			-- comando do jogador para abrir chamados
	["TicketKey"] = ""						-- sem tecla; atribuir em Definicoes > Atalhos de Teclado
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- DIAGNOSTICO
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Diagnostics = {
	["OnStart"] = true,				-- imprime o relatorio de compatibilidade no arranque
	["SelfTestOnStart"] = true		-- corre o auto-teste das consultas no arranque
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- IMAGENS
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Images = {
	["RemoteURL"] = "",		-- CDN de itens, ex. "http://O-SEU-IP/imagens/". Vazio = so o disco.
	["VehiclesURL"] = "",	-- CDN de veiculos, ex. "http://O-SEU-IP/vehicles/". Vazio = nome relativo.
	["Folders"] = {
		"C:/xampp/htdocs/imagens",
		"C:/xampp/htdocs/vehicles",
		"@will_battlepass/html/images"
	}
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- MAPA AO VIVO
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Map = {
	["minX"] = -6150.0,
	["maxX"] = 7700.0,
	["minY"] = -4050.0,
	["maxY"] = 8200.0,
	["Refresh"] = 5000						-- milissegundos entre atualizacoes do mapa
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CLIMA
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Weather = {
	["RotationMinutes"] = 15,				-- tempo entre trocas no modo rotativo
	["Rotation"] = { "EXTRASUNNY", "CLEAR", "CLOUDS", "OVERCAST", "CLEARING", "RAIN", "SMOG", "FOGGY" },
	["Types"] = {
		{ ["id"] = "EXTRASUNNY",	["label"] = "Muito ensolarado",	["icon"] = "sun" },
		{ ["id"] = "CLEAR",			["label"] = "Limpo",			["icon"] = "sun" },
		{ ["id"] = "NEUTRAL",		["label"] = "Neutro",			["icon"] = "sun" },
		{ ["id"] = "SMOG",			["label"] = "Smog",				["icon"] = "haze" },
		{ ["id"] = "FOGGY",			["label"] = "Neblina",			["icon"] = "haze" },
		{ ["id"] = "OVERCAST",		["label"] = "Nublado fechado",	["icon"] = "cloud" },
		{ ["id"] = "CLOUDS",		["label"] = "Nuvens",			["icon"] = "cloud" },
		{ ["id"] = "CLEARING",		["label"] = "Abrindo",			["icon"] = "cloud" },
		{ ["id"] = "RAIN",			["label"] = "Chuva",			["icon"] = "rain" },
		{ ["id"] = "THUNDER",		["label"] = "Tempestade",		["icon"] = "rain" },
		{ ["id"] = "SNOW",			["label"] = "Neve",				["icon"] = "snow" },
		{ ["id"] = "BLIZZARD",		["label"] = "Nevasca",			["icon"] = "snow" },
		{ ["id"] = "SNOWLIGHT",		["label"] = "Neve leve",		["icon"] = "snow" },
		{ ["id"] = "XMAS",			["label"] = "Natal",			["icon"] = "snow" },
		{ ["id"] = "HALLOWEEN",		["label"] = "Halloween",		["icon"] = "moon" }
	}
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CAPTURA DE IMAGENS DE VEICULO
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Capture = {
	["Enabled"] = true,

	-- Onde gravar. Tem de ser o que o VehiclesURL serve: o painel procura a imagem pelo nome
	-- do spawn nessa pasta. Caminho absoluto, entregue ao screenshot-basic.
	["Folder"] = "C:/xampp/htdocs/vehicles",

	-- Bucket proprio. Nao reutilizar o do castigo (7331) nem o da arena (7100..7159), e NUNCA
	-- usar o id do jogador -- ids comecam em 1 e colidem com o id de casa do qs-housing.
	["Bucket"] = 7400,

	["Coords"] = { -4600.0, -6200.0, 320.0 },
	["Heading"] = 215.0,

	["Clock"] = { ["hour"] = 11, ["minute"] = 30 },
	["Weather"] = "EXTRASUNNY",

	-- Enquadramento. A distancia e CALCULADA a partir do tamanho real do modelo
	-- (GetModelDimensions), do fov e do formato do ecra -- nao e um multiplicador a olho.
	["Camera"] = {
		["fov"] = 38.0,

		["fill"] = 0.86,

		["height"] = 0.38,					-- altura da camara, em alturas do modelo
		["yaw"] = 34.0						-- 3/4 de FRENTE, o angulo classico de catalogo
	},

	-- Tempos. `load` e o teto para o modelo carregar: os addons grandes desta base chegam a
	-- demorar varios segundos e cortar cedo produz foto de carro invisivel.
	["Timing"] = {
		["load"] = 12000,
		["settle"] = 500,					-- depois de posicionar, antes de fotografar
		["shot"] = 15000					-- teto de espera pelo ficheiro
	},

	["Skip"] = {
		"tdmotostier303"
	},

	["Encoding"] = "png",
	["Quality"] = 0.92,

	["Width"] = 960
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- ADVERTENCIAS / CASTIGO
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Warn = {
	["Bucket"] = 7331,						-- dimensao isolada do castigo
	["Coords"] = { 1692.51, 2565.53, 45.56 },
	["ReturnCoords"] = { 1846.15, 2585.83, 45.66 },
	["Reasons"] = {
		"Desrespeito com a Staff",
		"Roleplay irreal / Powergaming",
		"Bug abuse",
		"VDM / RDM",
		"Fuga de roleplay",
		"Toxicidade no chat de voz",
		"Outro"
	},
	["Times"] = { 5, 10, 15, 30, 60, 120 }
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAMADOS
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Tickets = {
	["Types"] = {
		{ ["id"] = "staff",		["label"] = "Chamado Staff",	["icon"] = "headset",	["perms"] = { "Admin" } },
		{ ["id"] = "policia",	["label"] = "Chamado Policia",	["icon"] = "shield",	["perms"] = { "Policia" } },
		{ ["id"] = "mecanica",	["label"] = "Chamado Mecanica",	["icon"] = "wrench",	["perms"] = { "LSCustoms", "Bennys" } },
		{ ["id"] = "hospital",	["label"] = "Chamado Hospital",	["icon"] = "heart",		["perms"] = { "Hospital" } }
	},
	["Cooldown"] = 60,						-- segundos entre chamados do mesmo jogador
	["RatingTimeout"] = 180					-- segundos para o jogador avaliar depois de finalizado
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONTADORES DA ABA JOGADORES
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Counters = {
	{ ["id"] = "staff",		["label"] = "Staff Online",		["icon"] = "shield",	["perms"] = { "Admin" } },
	{ ["id"] = "mechanic",	["label"] = "Mecanicos Online",	["icon"] = "wrench",	["perms"] = { "LSCustoms", "Bennys" } },
	{ ["id"] = "police",	["label"] = "Policia Online",	["icon"] = "idcard",	["perms"] = { "Policia" } },
	{ ["id"] = "medic",		["label"] = "Medicos Online",	["icon"] = "heart",		["perms"] = { "Hospital" } },
	{ ["id"] = "illegal",	["label"] = "Ilegal Online",	["icon"] = "alert",		["perms"] = {
		"Mafia", "Vanilla", "Bahamas", "Vermelhos", "Azuis", "Verdes",
		"Croacia", "Milicia", "Alemanha", "Motoclub", "Cassino", "Pubzinho"
	} }
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CARGOS DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Roles = {
	{ ["id"] = "dono",	["label"] = "Dono",				["perms"] = { "Admin-1" } },
	{ ["id"] = "admin",	["label"] = "Administrador",	["perms"] = { "Admin-2" } },
	{ ["id"] = "mod",	["label"] = "Moderador",		["perms"] = { "Admin-3" } },
	{ ["id"] = "sup",	["label"] = "Suporte",			["perms"] = { "Admin-4" } }
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- ABAS
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.Tabs = {
	{ ["id"] = "servidor",		["label"] = "Servidor",		["icon"] = "server",	["eyebrow"] = "ADMINISTRACAO",	["title"] = "Servidor",			["subtitle"] = "Central de acoes administrativas gerais do servidor." },
	{ ["id"] = "jogadores",		["label"] = "Jogadores",	["icon"] = "users",		["eyebrow"] = "GERENCIAMENTO",	["title"] = "Jogadores online",	["subtitle"] = "Encontre jogadores, consulte dados e execute acoes rapidas." },
	{ ["id"] = "advertencias",	["label"] = "Advertencias",	["icon"] = "alert",		["eyebrow"] = "MODERACAO",		["title"] = "Advertencias",		["subtitle"] = "Historico completo de advertencias e castigos aplicados." },
	{ ["id"] = "mapa",			["label"] = "Mapa",			["icon"] = "map",		["eyebrow"] = "MONITORAMENTO",	["title"] = "Mapa ao vivo",		["subtitle"] = "Acompanhe a posicao dos jogadores e execute acoes em tempo real." },
	{ ["id"] = "chamados",		["label"] = "Chamados",		["icon"] = "headset",	["eyebrow"] = "ATENDIMENTO",	["title"] = "Chamados",			["subtitle"] = "Atenda solicitacoes e acompanhe historico, ranking e avaliacoes." },
	{ ["id"] = "setagem",		["label"] = "Setagem",		["icon"] = "shield",	["eyebrow"] = "PERMISSOES",		["title"] = "Setagem",			["subtitle"] = "Gerencie cargos e grupos com protecao de hierarquia integrada." },
	{ ["id"] = "rg",			["label"] = "Alterar RG",	["icon"] = "idcard",	["eyebrow"] = "IDENTIDADE",		["title"] = "Alterar RG",		["subtitle"] = "Consulte e altere os dados de identidade de qualquer passaporte." },
	{ ["id"] = "itens",			["label"] = "Itens",		["icon"] = "box",		["eyebrow"] = "INVENTARIO",		["title"] = "Itens",			["subtitle"] = "Spawne rapidamente qualquer item do servidor." },
	{ ["id"] = "veiculos",		["label"] = "Veiculos",		["icon"] = "car",		["eyebrow"] = "GARAGEM",		["title"] = "Veiculos",			["subtitle"] = "Spawne, entregue, remova, repare e gerencie veiculos." },
	{ ["id"] = "locais",		["label"] = "Locais",		["icon"] = "pin",		["eyebrow"] = "MUNDO",			["title"] = "Locais",			["subtitle"] = "Cadastre e acesse os locais administrativos do servidor." },
	{ ["id"] = "clima",			["label"] = "Clima",		["icon"] = "cloud",		["eyebrow"] = "AMBIENTE",		["title"] = "Clima",			["subtitle"] = "Controle o clima e o horario global do servidor." },
	{ ["id"] = "personagens",	["label"] = "Personagens",	["icon"] = "folder",	["eyebrow"] = "BASE DE DADOS",	["title"] = "Personagens",		["subtitle"] = "Todos os personagens do servidor, online ou nao." },
	{ ["id"] = "metricas",		["label"] = "Metricas",		["icon"] = "trophy",	["eyebrow"] = "NUMEROS",		["title"] = "Metricas",			["subtitle"] = "Totais do servidor e os rankings de dinheiro, veiculos e multas." },
	{ ["id"] = "registos",		["label"] = "Registos",		["icon"] = "history",	["eyebrow"] = "AUDITORIA",		["title"] = "Registos",			["subtitle"] = "Tudo o que a staff executou pelo painel, e o chat interno da equipa." },
	{ ["id"] = "ferramentas",	["label"] = "Ferramentas",	["icon"] = "target",	["eyebrow"] = "UTILIDADES",		["title"] = "Ferramentas",		["subtitle"] = "Modo divindade, invisibilidade, opcoes de programador e atalhos de veiculo." },
	{ ["id"] = "resources",		["label"] = "Resources",	["icon"] = "refresh",	["eyebrow"] = "SERVIDOR",		["title"] = "Resources",		["subtitle"] = "Estado de cada recurso, com iniciar, parar e reiniciar." }
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- PERMISSOES PADRAO DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
local function access(dono, admin, mod, sup)
	return { ["dono"] = dono, ["admin"] = admin, ["mod"] = mod, ["sup"] = sup }
end

TriadeAdmin.Permissions = {
	-- ABAS
	["tab.servidor"]			= { ["label"] = "Abrir aba Servidor",				["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.jogadores"]			= { ["label"] = "Abrir aba Jogadores",				["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.advertencias"]		= { ["label"] = "Abrir aba Advertencias",			["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.mapa"]				= { ["label"] = "Abrir aba Mapa",					["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.chamados"]			= { ["label"] = "Abrir aba Chamados",				["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.setagem"]				= { ["label"] = "Abrir aba Setagem",				["group"] = "Abas",			["access"] = access(true, true, true, false) },
	["tab.rg"]					= { ["label"] = "Abrir aba Alterar RG",				["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.itens"]				= { ["label"] = "Abrir aba Itens",					["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.veiculos"]			= { ["label"] = "Abrir aba Veiculos",				["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.locais"]				= { ["label"] = "Abrir aba Locais",					["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.clima"]				= { ["label"] = "Abrir aba Clima",					["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.personagens"]			= { ["label"] = "Abrir aba Personagens",			["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.metricas"]			= { ["label"] = "Abrir aba Metricas",				["group"] = "Abas",			["access"] = access(true, true, false, false) },
	["tab.registos"]			= { ["label"] = "Abrir aba Registos",				["group"] = "Abas",			["access"] = access(true, true, true, true) },
	["tab.ferramentas"]			= { ["label"] = "Abrir aba Ferramentas",			["group"] = "Abas",			["access"] = access(true, true, true, false) },
	["tab.resources"]			= { ["label"] = "Abrir aba Resources",				["group"] = "Abas",			["access"] = access(true, false, false, false) },
	-- SERVIDOR
	["server.permissions"]		= { ["label"] = "Gerenciar permissoes do painel",	["group"] = "Servidor",		["access"] = access(true, false, false, false) },
	["server.banhistory"]		= { ["label"] = "Ver historico de banimentos",		["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.whitelist"]		= { ["label"] = "Liberar whitelist",				["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.unwhitelist"]		= { ["label"] = "Remover whitelist",				["group"] = "Servidor",		["access"] = access(true, true, true, false) },
	["server.ban"]				= { ["label"] = "Banir jogador",					["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.unban"]			= { ["label"] = "Desbanir jogador",					["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.rg"]				= { ["label"] = "Consultar RG",						["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.announce"]			= { ["label"] = "Aviso geral",						["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.addmoney"]			= { ["label"] = "Adicionar dinheiro",				["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.remmoney"]			= { ["label"] = "Remover dinheiro",					["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.dm"]				= { ["label"] = "Mensagem privada",					["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.warn"]				= { ["label"] = "Aplicar advertencia / castigo",	["group"] = "Servidor",		["access"] = access(true, true, true, false) },
	["server.waypoint"]			= { ["label"] = "Ir ao waypoint",					["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.tpcoords"]			= { ["label"] = "Teleportar por coordenadas",		["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.hash"]				= { ["label"] = "Consultar hash do veiculo",		["group"] = "Servidor",		["access"] = access(true, true, true, true) },
	["server.repair"]			= { ["label"] = "Reparar veiculo",					["group"] = "Servidor",		["access"] = access(true, true, true, false) },
	["server.reviveall"]		= { ["label"] = "Reviver todos",					["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.clearvehicles"]	= { ["label"] = "Limpar veiculos",					["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.clearprops"]		= { ["label"] = "Limpar props",						["group"] = "Servidor",		["access"] = access(true, true, false, false) },
	["server.delvehicle"]		= { ["label"] = "Deletar veiculo",					["group"] = "Servidor",		["access"] = access(true, true, true, false) },
	["server.wipeid"]			= { ["label"] = "Limpar dados do ID",				["group"] = "Servidor",		["access"] = access(true, false, false, false) },
	-- JOGADORES
	["player.goto"]				= { ["label"] = "Ir ate jogador",					["group"] = "Jogadores",	["access"] = access(true, true, true, true) },
	["player.bring"]			= { ["label"] = "Puxar jogador",					["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	["player.spectate"]			= { ["label"] = "Ver tela ao vivo",					["group"] = "Jogadores",	["access"] = access(true, true, true, true) },
	["player.revive"]			= { ["label"] = "Reviver jogador",					["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	["player.freeze"]			= { ["label"] = "Congelar / descongelar",			["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	["player.message"]			= { ["label"] = "Mensagem privada",					["group"] = "Jogadores",	["access"] = access(true, true, true, true) },
	["player.warn"]				= { ["label"] = "Advertir jogador",					["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	["player.rg"]				= { ["label"] = "Consultar RG do jogador",			["group"] = "Jogadores",	["access"] = access(true, true, true, true) },
	["player.money"]			= { ["label"] = "Adicionar / remover dinheiro",		["group"] = "Jogadores",	["access"] = access(true, true, false, false) },
	["player.clearweapons"]		= { ["label"] = "Limpar armas",						["group"] = "Jogadores",	["access"] = access(true, true, false, false) },
	["player.kick"]				= { ["label"] = "Kickar jogador",					["group"] = "Jogadores",	["access"] = access(true, true, true, true) },
	["player.ban"]				= { ["label"] = "Banir jogador",					["group"] = "Jogadores",	["access"] = access(true, true, false, false) },
	["player.inventory"]		= { ["label"] = "Inspecionar inventario",			["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	["player.inventory.edit"]	= { ["label"] = "Editar inventario",				["group"] = "Jogadores",	["access"] = access(true, true, false, false) },
	-- ADVERTENCIAS
	["warn.view"]				= { ["label"] = "Ver advertencias",					["group"] = "Advertencias",	["access"] = access(true, true, true, true) },
	["warn.delete"]				= { ["label"] = "Excluir advertencia",				["group"] = "Advertencias",	["access"] = access(true, true, false, false) },
	-- MAPA
	["map.actions"]				= { ["label"] = "Acoes pelo mapa",					["group"] = "Mapa",			["access"] = access(true, true, true, false) },
	-- CHAMADOS
	["ticket.accept"]			= { ["label"] = "Aceitar chamado",					["group"] = "Chamados",		["access"] = access(true, true, true, true) },
	["ticket.close"]			= { ["label"] = "Finalizar chamado",				["group"] = "Chamados",		["access"] = access(true, true, true, true) },
	["ticket.history"]			= { ["label"] = "Ver historico / ranking",			["group"] = "Chamados",		["access"] = access(true, true, true, true) },
	-- SETAGEM
	["group.add"]				= { ["label"] = "Adicionar cargo",					["group"] = "Setagem",		["access"] = access(true, true, true, false) },
	["group.remove"]			= { ["label"] = "Remover cargo",					["group"] = "Setagem",		["access"] = access(true, true, true, false) },
	-- ALTERAR RG
	["rg.edit"]					= { ["label"] = "Alterar dados de identidade",		["group"] = "Alterar RG",	["access"] = access(true, true, false, false) },
	["rg.edit.id"]				= { ["label"] = "Alterar ID / passaporte",			["group"] = "Alterar RG",	["access"] = access(true, false, false, false) },
	["rg.edit.money"]			= { ["label"] = "Alterar carteira / banco",			["group"] = "Alterar RG",	["access"] = access(true, true, false, false) },
	-- ITENS
	["item.spawn"]				= { ["label"] = "Spawnar itens",					["group"] = "Itens",		["access"] = access(true, true, false, false) },
	-- VEICULOS
	["vehicle.spawn"]			= { ["label"] = "Spawnar veiculo",					["group"] = "Veiculos",		["access"] = access(true, true, false, false) },
	["vehicle.give"]			= { ["label"] = "Dar veiculo",						["group"] = "Veiculos",		["access"] = access(true, true, false, false) },
	["vehicle.remove"]			= { ["label"] = "Remover veiculo da garagem",		["group"] = "Veiculos",		["access"] = access(true, true, false, false) },
	["vehicle.repair"]			= { ["label"] = "Reparar / tunar veiculo",			["group"] = "Veiculos",		["access"] = access(true, true, true, false) },
	["vehicle.delete"]			= { ["label"] = "Deletar veiculo",					["group"] = "Veiculos",		["access"] = access(true, true, true, false) },
	["vehicle.catalog"]			= { ["label"] = "Adicionar veiculo ao catalogo",	["group"] = "Veiculos",		["access"] = access(true, false, false, false) },
	["vehicle.capture"]			= { ["label"] = "Capturar imagens dos veiculos",	["group"] = "Veiculos",		["access"] = access(true, false, false, false) },
	-- LOCAIS
	["local.teleport"]			= { ["label"] = "Teleportar para local",			["group"] = "Locais",		["access"] = access(true, true, true, true) },
	["local.create"]			= { ["label"] = "Criar local / categoria",			["group"] = "Locais",		["access"] = access(true, true, true, false) },
	["local.delete"]			= { ["label"] = "Excluir local",					["group"] = "Locais",		["access"] = access(true, true, false, false) },
	-- CLIMA
	["weather.set"]				= { ["label"] = "Alterar clima",					["group"] = "Clima",		["access"] = access(true, true, false, false) },
	["weather.time"]			= { ["label"] = "Alterar horario",					["group"] = "Clima",		["access"] = access(true, true, false, false) },
	-- PERSONAGENS
	["character.view"]			= { ["label"] = "Consultar personagens",			["group"] = "Personagens",	["access"] = access(true, true, false, false) },
	-- METRICAS
	["metrics.view"]			= { ["label"] = "Ver metricas e rankings",			["group"] = "Metricas",		["access"] = access(true, true, false, false) },
	-- REGISTOS
	["log.view"]				= { ["label"] = "Ver o registo de acoes",			["group"] = "Registos",		["access"] = access(true, true, true, false) },
	["log.clear"]				= { ["label"] = "Limpar o registo de acoes",		["group"] = "Registos",		["access"] = access(true, false, false, false) },
	["chat.read"]				= { ["label"] = "Ler o chat da staff",				["group"] = "Registos",		["access"] = access(true, true, true, true) },
	["chat.send"]				= { ["label"] = "Escrever no chat da staff",		["group"] = "Registos",		["access"] = access(true, true, true, true) },
	["chat.clear"]				= { ["label"] = "Limpar o chat da staff",			["group"] = "Registos",		["access"] = access(true, false, false, false) },
	-- FERRAMENTAS
	["self.godmode"]			= { ["label"] = "Modo divindade",					["group"] = "Ferramentas",	["access"] = access(true, true, true, false) },
	["self.invisible"]			= { ["label"] = "Invisibilidade",					["group"] = "Ferramentas",	["access"] = access(true, true, true, false) },
	["dev.tools"]				= { ["label"] = "Opcoes de programador",			["group"] = "Ferramentas",	["access"] = access(true, true, false, false) },
	["dev.delete"]				= { ["label"] = "Apagar ped / objeto mais proximo",	["group"] = "Ferramentas",	["access"] = access(true, true, false, false) },
	["vehicle.quality"]			= { ["label"] = "Lavar / trancar / encher veiculo",	["group"] = "Ferramentas",	["access"] = access(true, true, true, false) },
	-- SCREENSHOT
	["player.screenshot"]		= { ["label"] = "Tirar print da tela do jogador",	["group"] = "Jogadores",	["access"] = access(true, true, true, false) },
	-- RESOURCES
	["resource.view"]			= { ["label"] = "Listar resources",					["group"] = "Resources",	["access"] = access(true, false, false, false) },
	["resource.control"]		= { ["label"] = "Iniciar / parar / reiniciar",		["group"] = "Resources",	["access"] = access(true, false, false, false) }
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- RESOURCES PROTEGIDOS
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.ProtectedResources = {
	"triade_admin", "vrp", "oxmysql", "ox_lib", "ox_inventory",
	"spawnmanager", "sessionmanager", "mapmanager", "chat", "hardcap", "baseevents",
	"Guardinha", "Controller", "AdminControl"
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CATEGORIAS PADRAO DE LOCAIS (criadas na primeira execucao)
-----------------------------------------------------------------------------------------------------------------------------------------
TriadeAdmin.DefaultCategories = {
	"Geral", "Policia", "Hospital", "LS Customs", "Bennys Motorworks",
	"Mafia", "Vanilla", "Bahamas", "Vermelhos", "Azuis", "Verdes",
	"Croacia", "Milicia", "Alemanha", "Motoclub", "Cassino", "Pubzinho",
	"Roubos", "Fazendas", "Arena"
}
