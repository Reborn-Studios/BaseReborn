return {
	{
		-- Coordenadas do baú
		coords = vec3(52.77,-437.65,39.15),
		target = {
			-- Coordenadas para abrir o target (olhinho)
			loc = vec3(52.77,-437.65,39.15),
			-- Configurações padrões
			length = 1.5,
			width = 6.0,
			heading = 306.92,
			-- Minimo da altura
			minZ = 10.0,
			-- Maximo da altura
			maxZ = 12.0,
			-- 
			label = 'Abrir bau'
		},
		-- ID do bau
		name = 'policelocker',
		-- Nome que aparece no inventario
		label = 'Bau geral policial',
		-- Slots do bau
		slots = 72,
		-- Peso do bau dividido por 1000, ex.: 50kg
		weight = 50000,
		-- Mostrar blip de bau (Mostra apenas para quem tem o grupo)
		showBlip = true,
		-- Grupos para acessar o bau, exemplos:
		--[[ 
			ex.1: groups = 'police',
			ex.2: groups = { ['Coronel'] = 0, ['Major'] = 0, ['Capitao'] = 0 }
		]]
		groups = 'police'
	},
	{
		coords = vec3(-435.76,-320.22,34.92),
		target = {
			loc = vec3(-435.76,-320.22,34.92),
			length = 0.6,
			width = 1.8,
			heading = 16.32,
			minZ = 33.34,
			maxZ = 35.74,
			label = 'Abrir bau'
		},
		name = 'emslocker',
		label = 'Bau geral Hospital',
		owner = true,
		slots = 70,
		weight = 70000,
		showBlip = true,
		groups = {['ambulance'] = 0}
	},
	{	
		coords = vec3(1277.79,-194.98,105.08),	
		target = {
			loc = vec3(1277.79,-194.98,105.08),
			length = 1.2,
			width = 5.6,
			heading = 326.12,
			minZ = 104.49,
			maxZ = 106.09,
			label = 'Abrir bau'
		},
		name = 'vermelhoslocker',
		label = 'Bau Vermelhos',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Vermelhos'] = 0}
	},
	{
		coords = vec3(2250.59,52.02,251.42),
		target = {
			loc = vec3(2250.59,52.02,251.42),
			length = 1.2,
			width = 5.6,
			heading = 337.17,
			minZ = 250.49,
			maxZ = 252.09,
			label = 'Abrir bau'
		},
		name = 'azuislocker',
		label = 'Bau Azuis',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Azuis'] = 0}
	},
	{
		coords = vec3(1719.06, 396.15, 245.27),
		target = {
			loc = vec3(1719.06, 396.15, 245.27),
			length = 1.2,
			width = 5.6,
			heading = 0,
			minZ = 244.49,
			maxZ = 246.09,
			label = 'Abrir bau'
		},
		name = 'verdeslocker',
		label = 'Bau Verdes',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Verdes'] = 0}
	},
	{
		coords = vec3(-1884.34, 2069.89, 145.58),
		target = {
			loc = vec3(-1884.34, 2069.89, 145.58),
			length = 1.2,
			width = 5.6,
			heading = 0,
			minZ = 144.49,
			maxZ = 146.09,
			label = 'Abrir bau'
		},
		name = 'bahamaslocker',
		label = 'Bau Bahamas',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Bahamas'] = 0}
	},
	{
		coords = vec3(575.39,-3121.57,18.77),
		target = {
			loc = vec3(575.39,-3121.57,18.77),
			length = 1.2,
			width = 5.6,
			heading = 276.09,
			minZ = 17.49,
			maxZ = 19.09,
			label = 'Abrir bau'
		},
		name = 'mafialocker',
		label = 'Bau Mafia',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Mafia'] = 0}
	},
	{
		coords = vec3(1392.13, 1134.07, 109.75),
		target = {
			loc = vec3(1392.13, 1134.07, 109.75),
			length = 1.2,
			width = 5.6,
			heading = 86.28,
			minZ = 108.49,
			maxZ = 110.09,
			label = 'Abrir bau'
		},
		name = 'milicialocker',
		label = 'Bau Milicia',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Milicia'] = 0}
	},
	{
		coords = vec3(977.22, -104.03, 74.85),
		target = {
			loc = vec3(977.22, -104.03, 74.85),
			length = 1.2,
			width = 5.6,
			heading = 0,
			minZ = 73.49,
			maxZ = 75.09,
			label = 'Abrir bau'
		},
		name = 'motoclublocker',
		label = 'Bau Motoclub',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Motoclub'] = 0}
	},
	{
		coords = vec3(93.37, -1291.34, 29.27),
		target = {
			loc = vec3(93.37, -1291.34, 29.27),
			length = 1.2,
			width = 5.6,
			heading = 0,
			minZ = 28.49,
			maxZ = 30.09,
			label = 'Abrir bau'
		},
		name = 'vanillalocker',
		label = 'Bau Vanilla',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Vanilla'] = 0}
	},
	{
		coords = vec3(-465.81, -293.78, 34.92),
		target = {
			loc = vec3(-465.81, -293.78, 33.92),
			length = 1.2,
			width = 5.6,
			heading = 26.0,
			minZ = 33.49,
			maxZ = 35.59,
			label = 'Abrir bau'
		},
		name = 'hospitallocker',
		label = 'Bau Hospital',
		owner = true,
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['ambulance'] = 0}
	},
}