-- Policia para Tema Próprio
local DefaultPolice = {
    ["Coronel"] = {
		_config = {
			title = "Coronel",
			gtype = "job",
			grade = "10",
			isboss = true,
			salary = 9000
		},
		"comando.permissao",
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Capitao"] = {
		_config = {
			title = "Capitao",
			gtype = "job",
			grade = "9",
			salary = 8500
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Major"] = {
		_config = {
			title = "Major",
			gtype = "job",
			grade = "8",
			salary = 8000
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Tenente"] = {
		_config = {
			title = "Tenente",
			gtype = "job",
			grade = "7",
			salary = 7500
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Sub.Tenente"] = {
		_config = {
			title = "Sub Tenente",
			gtype = "job",
			grade = "6",
			salary = 7000
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Sargento"] = {
		_config = {
			title = "Sargento",
			gtype = "job",
			grade = "5",
			salary = 6500
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["2Sargento"] = {
		_config = {
			title = "2° Sargento",
			gtype = "job",
			grade = "4",
			salary = 6000
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["3Sargento"] = {
		_config = {
			title = "3° Sargento",
			gtype = "job",
			grade = "3",
			salary = 5500
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Cabo"] = {
		_config = {
			title = "Cabo",
			gtype = "job",
			grade = "2",
			salary = 5000
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Soldado"] = {
		_config = {
			title = "Soldado",
			gtype = "job",
			grade = "1",
			salary = 4500
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Recruta"] = {
		_config = {
			title = "Recruta",
			gtype = "job",
			grade = "0",
			salary = 4000
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
}

-- Policia para Tema São Paulo
local SPPolice = {
    -- PMESP
    ["CoronelPMESP"] = {
        _config = {
            title = "Coronel - PMESP",
            gtype = "job",
            grade = "10",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoPMESP"] = {
        _config = {
            title = "Capitao - PMESP",
            gtype = "job",
            grade = "9",
            salary = 8500
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["MajorPMESP"] = {
        _config = {
            title = "Major - PMESP",
            gtype = "job",
            grade = "8",
            salary = 8000
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenentePMESP"] = {
        _config = {
            title = "Tenente - PMESP",
            gtype = "job",
            grade = "7",
            salary = 7500
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Sub.TenentePMESP"] = {
        _config = {
            title = "Sub - Tenente PMESP",
            gtype = "job",
            grade = "6",
            salary = 7000
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoPMESP"] = {
        _config = {
            title = "Sargento - PMESP",
            gtype = "job",
            grade = "5",
            salary = 6500
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["2SargentoPMESP"] = {
        _config = {
            title = "2° - Sargento PMESP",
            gtype = "job",
            grade = "4",
            salary = 6000
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["3SargentoPMESP"] = {
        _config = {
            title = "3° - Sargento PMESP",
            gtype = "job",
            grade = "3",
            salary = 5500
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboPMESP"] = {
        _config = {
            title = "Cabo - PMESP",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoPMESP"] = {
        _config = {
            title = "Soldado - PMESP",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaPMESP"] = {
        _config = {
            title = "Recruta - PMESP",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "policiamilitar.permissao",
        "pmesp.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- Policia Civil
    ["Delegado"] = {
        _config = {
            title = "Delegado",
            gtype = "job",
            grade = "3",
            salary = 15000
        },
        "comando.permissao",
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Escrivao"] = {
        _config = {
            title = "Escrivao",
            gtype = "job",
            grade = "2",
            salary = 12000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Investigador"] = {
        _config = {
            title = "Investigador",
            gtype = "job",
            grade = "1",
            salary = 10000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Agente"] = {
        _config = {
            title = "Agente",
            gtype = "job",
            grade = "0",
            salary = 8000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- ROTA
    ["CoronelROTA"] = {
        _config = {
            title = "Coronel - ROTA",
            gtype = "job",
            grade = "6",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoROTA"] = {
        _config = {
            title = "Capitao - ROTA",
            gtype = "job",
            grade = "5",
            salary = 8500
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenenteROTA"] = {
        _config = {
            title = "Tenente - ROTA",
            gtype = "job",
            grade = "4",
            salary = 7500
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoROTA"] = {
        _config = {
            title = "Sargento - ROTA",
            gtype = "job",
            grade = "3",
            salary = 6500
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboROTA"] = {
        _config = {
            title = "Cabo - ROTA",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoROTA"] = {
        _config = {
            title = "Soldado - ROTA",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaROTA"] = {
        _config = {
            title = "Recruta - ROTA",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "rota.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- BAEP
    ["CoronelBAEP"] = {
        _config = {
            title = "Coronel - BAEP",
            gtype = "job",
            grade = "6",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoBAEP"] = {
        _config = {
            title = "Capitao - BAEP",
            gtype = "job",
            grade = "5",
            salary = 8500
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenenteBAEP"] = {
        _config = {
            title = "Tenente - BAEP",
            gtype = "job",
            grade = "4",
            salary = 7500
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoBAEP"] = {
        _config = {
            title = "Sargento - BAEP",
            gtype = "job",
            grade = "3",
            salary = 6500
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboBAEP"] = {
        _config = {
            title = "Cabo - BAEP",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoBAEP"] = {
        _config = {
            title = "Soldado - BAEP",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaBAEP"] = {
        _config = {
            title = "Recruta - BAEP",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "baep.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- Força tatica
    ["CoronelFT"] = {
        _config = {
            title = "Coronel - FT",
            gtype = "job",
            grade = "6",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoFT"] = {
        _config = {
            title = "Capitao - FT",
            gtype = "job",
            grade = "5",
            salary = 8500
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenenteFT"] = {
        _config = {
            title = "Tenente - FT",
            gtype = "job",
            grade = "4",
            salary = 7500
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoFT"] = {
        _config = {
            title = "Sargento - FT",
            gtype = "job",
            grade = "3",
            salary = 6500
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboFT"] = {
        _config = {
            title = "Cabo - FT",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoFT"] = {
        _config = {
            title = "Soldado - FT",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaFT"] = {
        _config = {
            title = "Recruta - FT",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "ft.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- TOR
    ["CoronelTOR"] = {
        _config = {
            title = "Coronel - TOR",
            gtype = "job",
            grade = "3",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "tor.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoTOR"] = {
        _config = {
            title = "Sargento - TOR",
            gtype = "job",
            grade = "2",
            salary = 6500
        },
        "tor.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboTOR"] = {
        _config = {
            title = "Cabo - TOR",
            gtype = "job",
            grade = "1",
            salary = 5000
        },
        "tor.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaTOR"] = {
        _config = {
            title = "Recruta - TOR",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "tor.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- GCM
    ["CoronelGCM"] = {
        _config = {
            title = "Coronel - GCM",
            gtype = "job",
            grade = "3",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "gcm.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoGCM"] = {
        _config = {
            title = "Sargento - GCM",
            gtype = "job",
            grade = "2",
            salary = 6500
        },
        "gcm.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboGCM"] = {
        _config = {
            title = "Cabo - GCM",
            gtype = "job",
            grade = "1",
            salary = 5000
        },
        "gcm.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaGCM"] = {
        _config = {
            title = "Recruta - GCM",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "gcm.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
}

-- Policia para Tema Rio de Janeiro
local RJPolice = {
    ["CoronelPMERJ"] = {
        _config = {
            title = "Coronel - PMERJ",
            gtype = "job",
            grade = "10",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoPMERJ"] = {
        _config = {
            title = "Capitao - PMERJ",
            gtype = "job",
            grade = "9",
            salary = 8500
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["MajorPMERJ"] = {
        _config = {
            title = "Major - PMERJ",
            gtype = "job",
            grade = "8",
            salary = 8000
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenentePMERJ"] = {
        _config = {
            title = "Tenente - PMERJ",
            gtype = "job",
            grade = "7",
            salary = 7500
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Sub.TenentePMERJ"] = {
        _config = {
            title = "Sub - Tenente PMERJ",
            gtype = "job",
            grade = "6",
            salary = 7000
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoPMERJ"] = {
        _config = {
            title = "Sargento - PMERJ",
            gtype = "job",
            grade = "5",
            salary = 6500
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["2SargentoPMERJ"] = {
        _config = {
            title = "2° - Sargento PMERJ",
            gtype = "job",
            grade = "4",
            salary = 6000
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["3SargentoPMERJ"] = {
        _config = {
            title = "3° - Sargento PMERJ",
            gtype = "job",
            grade = "3",
            salary = 5500
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboPMERJ"] = {
        _config = {
            title = "Cabo - PMERJ",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoPMERJ"] = {
        _config = {
            title = "Soldado - PMERJ",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaPMERJ"] = {
        _config = {
            title = "Recruta - PMERJ",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "policiamilitar.permissao",
        "pmerj.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- Policia Civil
    ["Delegado"] = {
        _config = {
            title = "Delegado",
            gtype = "job",
            grade = "3",
            salary = 15000
        },
        "comando.permissao",
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Escrivao"] = {
        _config = {
            title = "Escrivao",
            gtype = "job",
            grade = "2",
            salary = 12000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Investigador"] = {
        _config = {
            title = "Investigador",
            gtype = "job",
            grade = "1",
            salary = 10000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["Agente"] = {
        _config = {
            title = "Agente",
            gtype = "job",
            grade = "0",
            salary = 8000
        },
        "policiacivil.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- BOPE
    ["CoronelBOPE"] = {
        _config = {
            title = "Coronel - BOPE",
            gtype = "job",
            grade = "6",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoBOPE"] = {
        _config = {
            title = "Capitao - BOPE",
            gtype = "job",
            grade = "5",
            salary = 8500
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenenteBOPE"] = {
        _config = {
            title = "Tenente - BOPE",
            gtype = "job",
            grade = "4",
            salary = 7500
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoBOPE"] = {
        _config = {
            title = "Sargento - BOPE",
            gtype = "job",
            grade = "3",
            salary = 6500
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboBOPE"] = {
        _config = {
            title = "Cabo - BOPE",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoBOPE"] = {
        _config = {
            title = "Soldado - BOPE",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaBOPE"] = {
        _config = {
            title = "Recruta - BOPE",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "bope.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },

    -- CORE
    ["CoronelCORE"] = {
        _config = {
            title = "Coronel - CORE",
            gtype = "job",
            grade = "6",
            isboss = true,
            salary = 9000
        },
        "comando.permissao",
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CapitaoCORE"] = {
        _config = {
            title = "Capitao - CORE",
            gtype = "job",
            grade = "5",
            salary = 8500
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["TenenteCORE"] = {
        _config = {
            title = "Tenente - CORE",
            gtype = "job",
            grade = "4",
            salary = 7500
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SargentoCORE"] = {
        _config = {
            title = "Sargento - CORE",
            gtype = "job",
            grade = "3",
            salary = 6500
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["CaboCORE"] = {
        _config = {
            title = "Cabo - CORE",
            gtype = "job",
            grade = "2",
            salary = 5000
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["SoldadoCORE"] = {
        _config = {
            title = "Soldado - CORE",
            gtype = "job",
            grade = "1",
            salary = 4500
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
    ["RecrutaCORE"] = {
        _config = {
            title = "Recruta - CORE",
            gtype = "job",
            grade = "0",
            salary = 4000
        },
        "core.permissao",
        "policia.permissao",
        "polpar.permissao",
        "portadp.permissao",
        "player.blips",
        "garmas.permissao",
        "policiatiros.permissao"
    },
}

function GetPoliceGroups()
    if GlobalState['Basics']['Theme'] == "default" then
        return DefaultPolice
    elseif GlobalState['Basics']['Theme'] == "SP" then
        return SPPolice
    elseif GlobalState['Basics']['Theme'] == "RJ" then
        return RJPolice
    end
end

return GetPoliceGroups