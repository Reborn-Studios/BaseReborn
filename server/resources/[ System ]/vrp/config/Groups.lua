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

local Polices = {
	["default"] = {
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
	},
	["SP"] = {
		["PMESP"] = {
			["Name"] = "Polícia Militar do Estado de São Paulo",
			["Type"] = "job",
			["QBESXGroup"] = "police",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelPMESP",
					["Title"] = "Coronel - PMESP",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comando.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoPMESP",
					["Title"] = "Capitao - PMESP",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "MajorPMESP",
					["Title"] = "Major - PMESP",
					["Salary"] = 8000,
				},
				[4] = {
					["Group"] = "TenentePMESP",
					["Title"] = "Tenente - PMESP",
					["Salary"] = 7500,
				},
				[5] = {
					["Group"] = "Sub.TenentePMESP",
					["Title"] = "Sub - Tenente PMESP",
					["Salary"] = 7000,
				},
				[6] = {
					["Group"] = "SargentoPMESP",
					["Title"] = "Sargento - PMESP",
					["Salary"] = 6500,
				},
				[7] = {
					["Group"] = "2SargentoPMESP",
					["Title"] = "2° - Sargento PMESP",
					["Salary"] = 6000,
				},
				[8] = {
					["Group"] = "3SargentoPMESP",
					["Title"] = "3° - Sargento PMESP",
					["Salary"] = 5500,
				},
				[9] = {
					["Group"] = "CaboPMESP",
					["Title"] = "Cabo - PMESP",
					["Salary"] = 5000,
				},
				[10] = {
					["Group"] = "SoldadoPMESP",
					["Title"] = "Soldado - PMESP",
					["Salary"] = 4500,
				},
				[11] = {
					["Group"] = "RecrutaPMESP",
					["Title"] = "Recruta - PMESP",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"policiamilitar.permissao",
				"pmesp.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["PoliciaCivil"] = {
			["Name"] = "Polícia Civil",
			["Type"] = "job",
			["QBESXGroup"] = "civil",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "Delegado",
					["Title"] = "Delegado",
					["Leader"] = true,
					["Salary"] = 15000,
					["Permission"] = {
						"delegado.permissao",
					}
				},
				[2] = {
					["Group"] = "Escrivao",
					["Title"] = "Escrivão",
					["Salary"] = 12000,
					["Permission"] = {
						"escrivao.permissao",
					}
				},
				[3] = {
					["Group"] = "Investigador",
					["Title"] = "Investigador",
					["Salary"] = 10000,
					["Permission"] = {
						"investigador.permissao",
					}
				},
				[4] = {
					["Group"] = "Agente",
					["Title"] = "Agente",
					["Salary"] = 8000,
				},
			},
			["Permissions"] = {
				"policiacivil.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["ROTA"] = {
			["Name"] = "ROTA",
			["Type"] = "job",
			["QBESXGroup"] = "rota",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelROTA",
					["Title"] = "Coronel ROTA",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandorota.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoROTA",
					["Title"] = "Capitão ROTA",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "TenenteROTA",
					["Title"] = "Tenente ROTA",
					["Salary"] = 7500,
				},
				[4] = {
					["Group"] = "SargentoROTA",
					["Title"] = "Sargento ROTA",
					["Salary"] = 6500,
				},
				[5] = {
					["Group"] = "CaboROTA",
					["Title"] = "Cabo ROTA",
					["Salary"] = 5000,
				},
				[6] = {
					["Group"] = "SoldadoROTA",
					["Title"] = "Soldado ROTA",
					["Salary"] = 4500,
				},
				[7] = {
					["Group"] = "RecrutaROTA",
					["Title"] = "Recruta ROTA",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"rota.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["BAEP"] = {
			["Name"] = "BAEP",
			["Type"] = "job",
			["QBESXGroup"] = "baep",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelBAEP",
					["Title"] = "Coronel BAEP",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandobaep.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoBAEP",
					["Title"] = "Capitão BAEP",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "TenenteBAEP",
					["Title"] = "Tenente BAEP",
					["Salary"] = 7500,
				},
				[4] = {
					["Group"] = "SargentoBAEP",
					["Title"] = "Sargento BAEP",
					["Salary"] = 6500,
				},
				[5] = {
					["Group"] = "CaboBAEP",
					["Title"] = "Cabo BAEP",
					["Salary"] = 5000,
				},
				[6] = {
					["Group"] = "SoldadoBAEP",
					["Title"] = "Soldado BAEP",
					["Salary"] = 4500,
				},
				[7] = {
					["Group"] = "RecrutaBAEP",
					["Title"] = "Recruta BAEP",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"baep.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["FT"] = {
			["Name"] = "Força Tática",
			["Type"] = "job",
			["QBESXGroup"] = "ft",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelFT",
					["Title"] = "Coronel FT",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandoft.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoFT",
					["Title"] = "Capitão FT",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "TenenteFT",
					["Title"] = "Tenente FT",
					["Salary"] = 7500,
				},
				[4] = {
					["Group"] = "SargentoFT",
					["Title"] = "Sargento FT",
					["Salary"] = 6500,
				},
				[5] = {
					["Group"] = "CaboFT",
					["Title"] = "Cabo FT",
					["Salary"] = 5000,
				},
				[6] = {
					["Group"] = "SoldadoFT",
					["Title"] = "Soldado FT",
					["Salary"] = 4500,
				},
				[7] = {
					["Group"] = "RecrutaFT",
					["Title"] = "Recruta FT",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"ft.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["TOR"] = {
			["Name"] = "TOR",
			["Type"] = "job",
			["QBESXGroup"] = "tor",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelTOR",
					["Title"] = "Coronel TOR",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandotor.permissao",
					}
				},
				[2] = {
					["Group"] = "SargentoTOR",
					["Title"] = "Sargento TOR",
					["Salary"] = 6500,
				},
				[3] = {
					["Group"] = "CaboTOR",
					["Title"] = "Cabo TOR",
					["Salary"] = 5000,
				},
				[4] = {
					["Group"] = "RecrutaTOR",
					["Title"] = "Recruta TOR",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"tor.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["GCM"] = {
			["Name"] = "GCM",
			["Type"] = "job",
			["QBESXGroup"] = "gcm",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelGCM",
					["Title"] = "Coronel GCM",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandogcm.permissao",
					}
				},
				[2] = {
					["Group"] = "SargentoGCM",
					["Title"] = "Sargento GCM",
					["Salary"] = 6500,
				},
				[3] = {
					["Group"] = "CaboGCM",
					["Title"] = "Cabo GCM",
					["Salary"] = 5000,
				},
				[4] = {
					["Group"] = "RecrutaGCM",
					["Title"] = "Recruta GCM",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"gcm.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
	},
	["RJ"] = {
		["PMERJ"] = {
			["Name"] = "PMERJ",
			["Type"] = "job",
			["QBESXGroup"] = "pmerj",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelPMERJ",
					["Title"] = "Coronel PMERJ",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandopmerj.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoPMERJ",
					["Title"] = "Capitão PMERJ",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "MajorPMERJ",
					["Title"] = "Major PMERJ",
					["Salary"] = 8000,
				},
				[4] = {
					["Group"] = "TenentePMERJ",
					["Title"] = "Tenente PMERJ",
					["Salary"] = 7500,
				},
				[5] = {
					["Group"] = "Sub.TenentePMERJ",
					["Title"] = "Sub. Tenente PMERJ",
					["Salary"] = 7000,
				},
				[6] = {
					["Group"] = "SargentoPMERJ",
					["Title"] = "1° Sargento PMERJ",
					["Salary"] = 6500,
				},
				[7] = {
					["Group"] = "2SargentoPMERJ",
					["Title"] = "2° Sargento PMERJ",
					["Salary"] = 6000,
				},
				[8] = {
					["Group"] = "3SargentoPMERJ",
					["Title"] = "3° Sargento PMERJ",
					["Salary"] = 5500,
				},
				[9] = {
					["Group"] = "CaboPMERJ",
					["Title"] = "Cabo PMERJ",
					["Salary"] = 5000,
				},
				[10] = {
					["Group"] = "SoldadoPMERJ",
					["Title"] = "Soldado PMERJ",
					["Salary"] = 4500,
				},
				[11] = {
					["Group"] = "RecrutaPMERJ",
					["Title"] = "Recruta PMERJ",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"policiamilitar.permissao",
				"pmerj.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["PoliciaCivil"] = {
			["Name"] = "Polícia Civil",
			["Type"] = "job",
			["QBESXGroup"] = "police",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "Delegado",
					["Title"] = "Delegado",
					["Leader"] = true,
					["Salary"] = 15000,
					["Permission"] = {
						"comando.permissao",
					}
				},
				[2] = {
					["Group"] = "Escrivao",
					["Title"] = "Escrivão",
					["Salary"] = 12000,
				},
				[3] = {
					["Group"] = "Investigador",
					["Title"] = "Investigador",
					["Salary"] = 10000,
				},
				[4] = {
					["Group"] = "Agente",
					["Title"] = "Agente",
					["Salary"] = 8000,
				},
			},
			["Permissions"] = {
				"policiacivil.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["BOPE"] = {
			["Name"] = "BOPE",
			["Type"] = "job",
			["QBESXGroup"] = "bope",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelBOPE",
					["Title"] = "Coronel BOPE",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandobope.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoBOPE",
					["Title"] = "Capitão BOPE",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "TenenteBOPE",
					["Title"] = "Tenente BOPE",
					["Salary"] = 7500,
				},
				[4] = {
					["Group"] = "SargentoBOPE",
					["Title"] = "Sargento BOPE",
					["Salary"] = 6500,
				},
				[5] = {
					["Group"] = "CaboBOPE",
					["Title"] = "Cabo BOPE",
					["Salary"] = 5000,
				},
				[6] = {
					["Group"] = "SoldadoBOPE",
					["Title"] = "Soldado BOPE",
					["Salary"] = 4500,
				},
				[7] = {
					["Group"] = "RecrutaBOPE",
					["Title"] = "Recruta BOPE",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"bope.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
		["CORE"] = {
			["Name"] = "CORE",
			["Type"] = "job",
			["QBESXGroup"] = "core",
			["Hierarchy"] = {
				[1] = {
					["Group"] = "CoronelCORE",
					["Title"] = "Coronel CORE",
					["Leader"] = true,
					["Salary"] = 9000,
					["Permission"] = {
						"comandocore.permissao",
					}
				},
				[2] = {
					["Group"] = "CapitaoCORE",
					["Title"] = "Capitão CORE",
					["Salary"] = 8500,
				},
				[3] = {
					["Group"] = "TenenteCORE",
					["Title"] = "Tenente CORE",
					["Salary"] = 7500,
				},
				[4] = {
					["Group"] = "SargentoCORE",
					["Title"] = "Sargento CORE",
					["Salary"] = 6500,
				},
				[5] = {
					["Group"] = "CaboCORE",
					["Title"] = "Cabo CORE",
					["Salary"] = 5000,
				},
				[6] = {
					["Group"] = "SoldadoCORE",
					["Title"] = "Soldado CORE",
					["Salary"] = 4500,
				},
				[7] = {
					["Group"] = "RecrutaCORE",
					["Title"] = "Recruta CORE",
					["Salary"] = 4000,
				},
			},
			["Permissions"] = {
				"core.permissao",
				"policia.permissao",
				"polpar.permissao",
				"portadp.permissao",
				"player.blips",
				"garmas.permissao",
				"policiatiros.permissao"
			},
			["Service"] = {},
			["Markers"] = true,
		},
	}
}

local ConfigGroups = json.decode(LoadResourceFile("AdminControl", 'data/groups.json')) or {}
for Group,data in pairs(ConfigGroups) do
	groups[Group] = data
end

if Polices[GlobalState['Basics']['Theme']] then
	for Police,data in pairs(Polices[GlobalState['Basics']['Theme']]) do
		groups[Police] = data
	end
end

return groups