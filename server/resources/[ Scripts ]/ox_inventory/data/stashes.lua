return {
	{
		-- Coordenadas do baú
		coords = vec3(-1077.9,-815.4,11.04),
		target = {
			-- Coordenadas para abrir o target (olhinho)
			loc = vec3(-1077.9,-815.4,10.54),
			label = 'Abrir bau'
		},
		name = 'policelocker',
		label = 'Bau geral policial',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = 'police'
	},
	{
		coords = vec3(-435.76,-320.22,34.92),
		target = {
			loc = vec3(-435.76,-320.22,34.92),
			label = 'Abrir bau'
		},
		name = 'emslocker',
		label = 'Bau geral Hospital',
		slots = 70,
		weight = 70000,
		showBlip = true,
		groups = { ['ambulance'] = 0 }
	},
	{
		coords = vec3(1277.79,-194.98,105.08),
		target = {
			loc = vec3(1277.79,-194.98,105.08),
			label = 'Abrir bau'
		},
		name = 'vermelhoslocker',
		label = 'Bau Vermelhos',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Vermelhos'] = 0, ['VermelhosLider'] = 0}
	},
	{
		coords = vec3(2250.59,52.02,251.42),
		target = {
			loc = vec3(2250.59,52.02,251.42),
			label = 'Abrir bau'
		},
		name = 'azuislocker',
		label = 'Bau Azuis',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Azuis'] = 0, ['AzuisLider'] = 0}
	},
	{
		coords = vec3(1719.06, 396.15, 245.27),
		target = {
			loc = vec3(1719.06, 396.15, 245.27),
			label = 'Abrir bau'
		},
		name = 'verdeslocker',
		label = 'Bau Verdes',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Verdes'] = 0}
	},
	{
		coords = vec3(-1884.34, 2069.89, 145.58),
		target = {
			loc = vec3(-1884.34, 2069.89, 145.58),
			label = 'Abrir bau'
		},
		name = 'bahamaslocker',
		label = 'Bau Bahamas',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Bahamas'] = 0}
	},
	{
		coords = vec3(575.39,-3121.57,18.77),
		target = {
			loc = vec3(575.39,-3121.57,18.77),
			label = 'Abrir bau'
		},
		name = 'mafialocker',
		label = 'Bau Mafia',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Mafia'] = 0}
	},
	{
		coords = vec3(1392.13, 1134.07, 109.75),
		target = {
			loc = vec3(1392.13, 1134.07, 109.75),
			label = 'Abrir bau'
		},
		name = 'milicialocker',
		label = 'Bau Milicia',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Milicia'] = 0}
	},
	{
		coords = vec3(977.22, -104.03, 74.85),
		target = {
			loc = vec3(977.22, -104.03, 74.85),
			label = 'Abrir bau'
		},
		name = 'motoclublocker',
		label = 'Bau Motoclub',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Motoclub'] = 0}
	},
	{
		coords = vec3(93.37, -1291.34, 29.27),
		target = {
			loc = vec3(93.37, -1291.34, 29.27),
			label = 'Abrir bau'
		},
		name = 'vanillalocker',
		label = 'Bau Vanilla',
		slots = 72,
		weight = 50000,
		showBlip = true,
		groups = {['Vanilla'] = 0}
	},
}
