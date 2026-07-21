local groups = {
	["Admin"] = {
		["Name"] = "Administração",
		["Type"] = "staff",
		["QBESXGroup"] = "admin",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Owner",
				["Title"] = "Dono",
				["Leader"] = true,
				["Permission"] = {
					"owner.permissao",
					"comando.permissao",
					"lidermecanico.permissao",
					"diretor.permissao",
				}
			},
			[2] = {
				["Group"] = "Admin",
				["Title"] = "Administrador",
				["Permission"] = {
					"admin.permissao",
				}
			},
			[3] = {
				["Group"] = "Mod",
				["Title"] = "Moderador",
				["Permission"] = {
					"moderador.permissao",
				}
			},
			[4] = {
				["Group"] = "Sup",
				["Title"] = "Suporte",
			},
		},
		["Permissions"] = {
			"suporte.permissao",
			"mqcu.permissao",
			"sup.permissao",
			"player.blips",
			"player.spec",
			"player.noclip",
			"player.wall",
		},
		["Service"] = {}
	},
	["Policia"] = {
		["Name"] = "Policia Geral",
		["Type"] = "job",
		["QBESXGroup"] = "police",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Coronel",
				["Title"] = "Coronel",
				["Leader"] = true,
				["Salary"] = 9000,
				["Permission"] = {
					"comando.permissao",
				}
			},
			[2] = {
				["Group"] = "Capitao",
				["Title"] = "Capitão",
				["Salary"] = 8500,
			},
			[3] = {
				["Group"] = "Major",
				["Title"] = "Major",
				["Salary"] = 8000,
			},
			[4] = {
				["Group"] = "Tenente",
				["Title"] = "Tenente",
				["Salary"] = 7500,
			},
			[5] = {
				["Group"] = "Sub.Tenente",
				["Title"] = "Sub. Tenente",
				["Salary"] = 7000,
			},
			[6] = {
				["Group"] = "Sargento",
				["Title"] = "1° Sargento",
				["Salary"] = 6500,
			},
			[7] = {
				["Group"] = "2Sargento",
				["Title"] = "2° Sargento",
				["Salary"] = 6000,
			},
			[8] = {
				["Group"] = "3Sargento",
				["Title"] = "3° Sargento",
				["Salary"] = 5500,
			},
			[9] = {
				["Group"] = "Cabo",
				["Title"] = "Cabo",
				["Salary"] = 5000,
			},
			[10] = {
				["Group"] = "Recruta",
				["Title"] = "Recruta",
				["Salary"] = 4500,
			},
		},
		["Permissions"] = {
			"policiamilitar.permissao",
			"policia.permissao",
			"polpar.permissao",
			"portadp.permissao",
			"player.blips",
			"garmas.permissao",
			"policiatiros.permissao"
		},
		["Service"] = {},
        ["Markers"] = true,              -- Sistema de blips no mapa
	},
	["Hospital"] = {
		["Name"] = "Central Hospital",
		["Type"] = "job",
		["QBESXGroup"] = "ambulance",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Diretor",
				["Title"] = "Medico Diretor",
				["Leader"] = true,
				["Salary"] = 6000,
				["Permission"] = {
					"diretor.permissao",
				}
			},
			[2] = {
				["Group"] = "Medico",
				["Title"] = "Médico",
				["Salary"] = 5500,
				["Permission"] = {
					"medico.permissao",
				}
			},
			[3] = {
				["Group"] = "Enfermeiro",
				["Title"] = "Enfermeiro",
				["Salary"] = 5000,
				["Permission"] = {
					"enfermeiro.permissao",
				}
			},
			[4] = {
				["Group"] = "Paramedico",
				["Title"] = "Paramedico",
				["Salary"] = 3000
			},
		},
		["Permissions"] = {
			"paramedico.permissao",
			"polpar.permissao",
		},
		["Service"] = {},
        ["Markers"] = true,              -- Sistema de blips no mapa
		["OrgPanel"] = true
	},
	["LSCustoms"] = {
		["Name"] = "LS Customs",
		["Type"] = "job",
		["QBESXGroup"] = "mechanic",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Lider",
				["Title"] = "Mecanico Lider",
				["Leader"] = true,
				["Salary"] = 7000,
				["Permission"] = {
					"lidermecanico.permissao",
				}
			},
			[2] = {
				["Group"] = "Gerente",
				["Title"] = "Mecânico Gerente",
				["Salary"] = 5000,
				["Permission"] = {
					"mecanicogerente.permissao",
				}
			},
			[3] = {
				["Group"] = "Mecanico",
				["Title"] = "Mecanico Membro",
				["Salary"] = 3000,
			},
		},
		["Permissions"] = {
			"mecanico.permissao",
		},
		["Service"] = {},
	},
	["Bennys"] = {
		["Name"] = "Bennys Motorworks",
		["Type"] = "job",
		["QBESXGroup"] = "mechanic",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Lider",
				["Title"] = "Lider Bennys",
				["Leader"] = true,
				["Salary"] = 7000,
				["Permission"] = {
					"liderbennys.permissao",
				}
			},
			[2] = {
				["Group"] = "Gerente",
				["Title"] = "Gerente Bennys",
				["Salary"] = 5000,
				["Permission"] = {
					"gerentebennys.permissao",
				}
			},
			[3] = {
				["Group"] = "Mecanico",
				["Title"] = "Mecanico Bennys",
				["Salary"] = 3000,
			},
		},
		["Permissions"] = {
			"bennys.permissao",
		},
		["Service"] = {},
	},
	["Vips"] = {
		["Name"] = "Vips",
		["Type"] = "vip",
		["Hierarchy"] = {
			[1] = {
				["Group"] = "Diamante",
				["Title"] = "VIP Diamante",
				["Salary"] = 25000,
				["BackpackWeight"] = 100,				-- Aumento de mochila
				["Permission"] = {
					"diamante.permissao",				-- Permissão de exclusividade Diamante
					"pets.permissao",					-- Utilizado para script de Pets do Lucca
					"tratamentolivre.permissao",		-- Utilizado para não pagar tratamento do hospital
					"helivip.permissao",				-- Acesso a garagem de Helicopteros VIPs
					"radar.permissao",					-- Utilizado para o script de radar do Lucca
					"roupas.permissao",					-- Não precisar de item roupas para mudar de roupas por comando
					"carrosexclusivos.permissao",		-- Acesso a garagem de carros exclusivos
					"mochila.permissao",				-- Não perder a mochila ao morrer
				}
			},
			[2] = {
				["Group"] = "Platina",
				["Title"] = "VIP Platina",
				["Salary"] = 15000,
				["BackpackWeight"] = 50,
				["Permission"] = {
					"platina.permissao",
					"pets.permissao",
					"tratamentolivre.permissao",
					"helivip.permissao",
					"radar.permissao",
					"roupas.permissao",
					"carrosexclusivos.permissao",
					"mochila.permissao",
				}
			},
			[3] = {
				["Group"] = "Ouro",
				["Title"] = "VIP Ouro",
				["Salary"] = 10000,
				["BackpackWeight"] = 30,
				["Permission"] = {
					"ouro.permissao",
					"mochila.permissao",
				}
			},
			[4] = {
				["Group"] = "Prata",
				["Title"] = "VIP Prata",
				["Salary"] = 5000,
				["BackpackWeight"] = 20,
				["Permission"] = {
					"prata.permissao",
				}
			},
			[5] = {
				["Group"] = "Bronze",
				["Title"] = "VIP Bronze",
				["Salary"] = 2500,
				["BackpackWeight"] = 10,
				["Permission"] = {
					"bronze.permissao",
				}
			},
		},
		["Permissions"] = {
			"vip.permissao",					-- Permissão padrão para VIPs
		},
		["Service"] = {},
	},
}

local ConfigGroups = json.decode(LoadResourceFile("AdminControl", 'data/groups.json')) or {}
for Group,data in pairs(ConfigGroups) do
	groups[Group] = data
end

return groups