Farms = {}

--------##########################----------
------           DESMANCHE         ---------
--------##########################----------

Farms.desmanche = {
    [1] = {
        IniciarServico = { 474.78,-1308.48,29.2 },                         -- Onde se inicia o serviço e verifica a existência de um carro
        LocalDesmancharCarro = { 479.85,-1318.31,29.02 },                   -- Onde deve haver o carro que será desmanchado para poder continuar o desmanche
        LocalFerramentas = { 473.81,-1314.05,29.2,119.06 },                  -- Local onde 'pegará' as ferramentas
        AnuncioChassi = { 472.15,-1310.71,29.22,107.72 },                          -- Onde finalizará a missão para entregar o chassi e receber dinheiro e itens
        Computador = { 472.15,-1310.71,29.22,107.72 },                        -- Local do computador
        RestritoParaDesmanche = true,                                      -- É restrito para quem tiver só a permissão do desmanche? (TRUE/FALSE)
        PermissaoDesmanche = 'Motoclub',                                   -- Se RestritoParaDesmanche for TRUE, aqui deverá ter a permissão que será verifiada.

        PrecisaDeItem = false,                                             -- Precisa de item para iniciar o desmanche? (TRUE/FALSE)
        ItemNecessario = 'detonador',                                      -- Qual item precisa para iniciar o desmanche?
        QtdNecessaria = 0,                                                 -- Quantos itens precisará para iniciar o desmanche?

        Payment = {
            ["copper"] = math.random(8,12),
            ["aluminum"] = math.random(8,12),
            ["glass"] = math.random(8,12),
        }
    }
}

--------##########################----------
------        COCAINA FARM         ---------
--------##########################----------

Farms.cocaina = {
    locais = { 
        { ['id'] = 1, ['x'] = -1105.13, ['y'] = 4952.35, ['z'] = 218.65, ['text'] = "colocar a cocaína na vasilha", ['perm'] = "Azuis" }, -- Cocaina PASTA
        { ['id'] = 2, ['x'] = -1106.4, ['y'] = 4951.23, ['z'] = 218.68, ['text'] = "espalhar a cocaína", ['perm'] = "Azuis" }, -- Cocaina PRODUZIR
        { ['id'] = 3, ['x'] = -1111.81, ['y'] = 4942.2, ['z'] = 218.65, ['text'] = "embalar cocaína", ['perm'] = "Azuis" },
    },
    itens = {
        [1] = { ['re'] = nil, ['reqtd'] = nil, ['item'] = "cocaempo", ['itemqtd'] = 10 },
        [2] = { ['re'] = "cocaempo", ['reqtd'] = 10, ['item'] = "pastadecoca", ['itemqtd'] = 10 },
        [3] = { ['re'] = "pastadecoca", ['reqtd'] = 10, ['item'] = "cocaine", ['itemqtd'] = 20 },
    }
}

--------##########################----------
------        MACONHA FARM         ---------
--------##########################----------

Farms.maconha = {
    locais = { 
        { ['id'] = 1, ['x'] = 99.78, ['y'] = 6344.38, ['z'] = 31.38, ['text'] = "colher a Sativa", ['perm'] = "Vermelhos" }, 
        { ['id'] = 2, ['x'] = 101.95, ['y'] = 6353.35, ['z'] = 31.38, ['text'] = "colher a Índica", ['perm'] = "Vermelhos" }, 
        { ['id'] = 3, ['x'] =  116.47, ['y'] = 6362.53, ['z'] = 32.79, ['text'] = "preparar a bucha", ['perm'] = "Vermelhos" },
    },
    itens = {
        [1] = { ['re'] = nil, ['reqtd'] = nil, ['item'] = "folhademaconha", ['itemqtd'] = 10 },
        [2] = { ['re'] = "folhademaconha", ['reqtd'] = 10, ['item'] = "maconhamacerada", ['itemqtd'] = 10 },
        [3] = { ['re'] = "maconhamacerada", ['reqtd'] = 10, ['item'] = "weed", ['itemqtd'] = 20 },
    }
}

--------##########################----------
------      METANFETAMINA FARM     ---------
--------##########################----------

Farms.meta = {
    locais = {
        { ['id'] = 1, ['x'] = 1493.17, ['y'] = 6390.24, ['z'] = 21.26, ['text'] = "colocar os ingredientes", ['perm'] = "Verdes" },
        { ['id'] = 2, ['x'] = 1504.89, ['y'] = 6393.25, ['z'] = 20.79, ['text'] = "quebrar metanfetamina", ['perm'] = "Verdes" }, 
        { ['id'] = 3, ['x'] = 1500.67, ['y'] = 6394.03, ['z'] = 20.79, ['text'] = "embalar metanfetamina", ['perm'] = "Verdes" },
    },
    itens = {
        [1] = { ['re'] = nil, ['reqtd'] = nil, ['item'] = "acidobateria", ['itemqtd'] = 10 },
        [2] = { ['re'] = "acidobateria", ['reqtd'] = 10, ['item'] = "methliquid", ['itemqtd'] = 10 },
        [3] = { ['re'] = "methliquid", ['reqtd'] = 10, ['item'] = "meth", ['itemqtd'] = 20 },
    }
}

--------##########################----------
------          LAVAGEM FARM       ---------
--------##########################----------

Farms.lavagem = {
	perm = "Vanilla",
    locais = {
        [1] = vector3(1138.23,-3196.95,-39.66),
        [2] = vector3(1136.12,-3197.2,-39.66),
        [3] = vector3(1125.87,-3196.9,-39.66),
        [4] = vector3(1122.21,-3197.79,-40.39),
        [5] = vector3(1116.73,-3195.7,-40.4),
    },
	dinheiro_sujo = {
		min_money = 50000,
		max_money = 1000000,
		porcentagem = 90,
	}
}

--------##########################----------
------      ENTREGA DE DROGAS      ---------
--------##########################----------

Farms.init = { 
	{ 19.79,-1601.41,29.38 },
	{ 1336.68,-114.69,120.4 },
} 

Farms.itemList = {
	{ item = "cocaine", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 },
	{ item = "weed", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 },
	{ item = "meth", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 },
	{ item = "ecstasy", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 },
	{ item = "lean", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 }, 
	{ item = "lsd", priceMin = 650, priceMax = 800, randMin = 3, randMax = 5 },
}
