local PoliceStashes = {}
if GlobalState['Basics']['Theme'] == "default" then
	PoliceStashes = {
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
				minZ = 39.0,
				-- Maximo da altura
				maxZ = 40.0,
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
	}
elseif GlobalState['Basics']['Theme'] == "SP" then
	PoliceStashes = {
		{
			coords = vec3(-1703.21,-738.3,11.42),
			target = {
				loc = vec3(-1703.21,-738.3,11.42),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 11.0,
				maxZ = 12.0,
				label = 'Abrir bau'
			},
			name = 'pmesplocker',
			label = 'Bau PMESP',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['police'] = 15
			}
		},
		{
			coords = vec3(-740.08,-75.97,37.99),
			target = {
				loc = vec3(-740.08,-75.97,37.99),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 37.0,
				maxZ = 38.0,
				label = 'Abrir bau'
			},
			name = 'ftlocker',
			label = 'Bau Força Tatica',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['ft'] = 10
			}
		},
		{
			coords = vec3(-1214.92,-2276.26,14.49),
			target = {
				loc = vec3(-1214.92,-2276.26,14.49),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 14.0,
				maxZ = 15.0,
				label = 'Abrir bau'
			},
			name = 'rotalocker',
			label = 'Bau Rota',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['rota'] = 10
			}
		},
		{
			coords = vec3(-1214.92,-2276.26,14.49),
			target = {
				loc = vec3(-1214.92,-2276.26,14.49),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 14.0,
				maxZ = 15.0,
				label = 'Abrir bau'
			},
			name = 'pcesplocker',
			label = 'Bau PCESP',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['civil'] = 8
			}
		},
		{
			coords = vec3(-478.06,293.84,83.51),
			target = {
				loc = vec3(-478.06,293.84,83.51),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 83.0,
				maxZ = 84.0,
				label = 'Abrir bau'
			},
			name = 'gcmlocker',
			label = 'Bau GCM',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['gcm'] = 7
			}
		},
		{
			coords = vec3(-3029.73,385.31,15.11),
			target = {
				loc = vec3(-3029.73,385.31,15.11),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 15.0,
				maxZ = 16.0,
				label = 'Abrir bau'
			},
			name = 'bprvlocker',
			label = 'Bau BPRV',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['prf'] = 7
			}
		},
		{
			coords = vec3(-3029.73,385.31,15.11),
			target = {
				loc = vec3(-3029.73,385.31,15.11),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 15.0,
				maxZ = 16.0,
				label = 'Abrir bau'
			},
			name = 'baeplocker',
			label = 'Bau BAEP',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['baep'] = 8
			}
		},
	}
elseif GlobalState['Basics']['Theme'] == "RJ" then
	PoliceStashes = {
		{
			coords = vec3(-1650.32,172.67,61.9),
			target = {
				loc = vec3(-1650.32,172.67,61.9),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 61.0,
				maxZ = 62.0,
				label = 'Abrir bau'
			},
			name = 'pmerjlocker',
			label = 'Bau PMERJ',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['pmerj'] = 15
			}
		},
		{
			coords = vec3(-252.5,1551.28,346.41),
			target = {
				loc = vec3(-252.5,1551.28,346.41),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 346.0,
				maxZ = 347.0,
				label = 'Abrir bau'
			},
			name = 'bopelocker',
			label = 'Bau BOPE',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['bope'] = 10
			}
		},
		{
			coords = vec3(-813.27,-2669.81,14.24),
			target = {
				loc = vec3(-813.27,-2669.81,14.24),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 14.0,
				maxZ = 15.0,
				label = 'Abrir bau'
			},
			name = 'choquelocker',
			label = 'Bau CHOQUE',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['choque'] = 10
			}
		},
		{
			coords = vec3(-928.56,-2049.56,9.43),
			target = {
				loc = vec3(-928.56,-2049.56,9.43),
				length = 1.5,
				width = 6.0,
				heading = 270.0,
				minZ = 9.0,
				maxZ = 10.0,
				label = 'Abrir bau'
			},
			name = 'pcerjlocker',
			label = 'Bau PCERJ',
			slots = 72,
			weight = 150000,
			showBlip = true,
			groups = {
				['police'] = 8
			}
		},
		-- {
		-- 	coords = vec3(),
		-- 	target = {
		-- 		loc = vec3(),
		-- 		length = 1.5,
		-- 		width = 6.0,
		-- 		heading = 270.0,
		-- 		minZ = 9.0,
		-- 		maxZ = 10.0,
		-- 		label = 'Abrir bau'
		-- 	},
		-- 	name = 'corelocker',
		-- 	label = 'Bau CORE',
		-- 	slots = 72,
		-- 	weight = 150000,
		-- 	showBlip = true,
		-- 	groups = {
		-- 		['core'] = 8
		-- 	}
		-- },
	}
end

return PoliceStashes