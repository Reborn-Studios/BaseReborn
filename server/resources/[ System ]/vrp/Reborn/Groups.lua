local groups = {
	--[[ 
		#############
			STAFF
		#############
	 ]]
	["Owner"] = {
		_config = {
			title = "Dono",
			gtype = "staff"
		},
		"owner.permissao",
		"admin.permissao",
		"cas.permissao",
		"suporte.permissao",
		"player.blips",
		"player.spec",
		"mqcu.permissao",
		"player.noclip",
		"player.secret",
		"player.wall",
		"moderador.permissao",
		"adm.permissao",
		"comando.permissao",
		"lidermecanico.permissao",
		"diretor.permissao",
	},
	["Admin"] = {
		_config = {
			title = "Administrator",
			gtype = "staff"
		},
		"admin.permissao",
		"suporte.permissao",
		"player.blips",
		"player.spec",
		"player.noclip",
		"mqcu.permissao",
		"player.secret",
		"player.wall",
		"moderador.permissao",
		"adm.permissao"
	},
	["Mod"] = {
		_config = {
			title = "Moderador",
			gtype = "staff"
		},
		"moderador.permissao",
		"player.blips",
		"player.spec",
		"player.noclip",
		"mqcu.permissao",
		"player.wall",
		"suporte.permissao",
		"mod.permissao"
	},
	["Sup"] = {
		_config = {
			title = "Suporte",
			gtype = "staff"
		},
		"suporte.permissao",
		"mqcu.permissao",
		"sup.permissao"
	},
	--[[ 
		#############
		   POLICIA
		#############
	 ]]
	["Police"] = {
		_config = {
			title = "Policial",
			gtype = "job"
		},
		"policiamilitar.permissao",
		"policia.permissao",
		"polpar.permissao",
		"portadp.permissao",
		"player.blips",
		"garmas.permissao",
		"policiatiros.permissao"
	},
	["Coronel"] = {
		_config = {
			title = "Coronel",
			gtype = "job",
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
	--[[ 
		#############
		   HOSPITAL
		#############
	 ]]
	["Paramedic"] = {
		_config = {
			title = "Paramedico",
			gtype = "job"
		},
		"paramedico.permissao",
		"polpar.permissao",
	},
	["Enfermeiro"] = {
		_config = {
			title = "Enfermeiro",
			gtype = "job",
			salary = 5000
		},
		"paramedico.permissao",
		"polpar.permissao",
	},
	["Medico"] = {
		_config = {
			title = "Medico",
			gtype = "job",
			salary = 5500
		},
		"paramedico.permissao",
		"polpar.permissao",
	},
	["Diretor"] = {
		_config = {
			title = "Diretor",
			gtype = "job",
			salary = 6000
		},
		"diretor.permissao",
		"paramedico.permissao",
		"polpar.permissao",
	},
	--[[ 
		#############
		   MECANICO
		#############
	 ]]
	["Mecanico"] = {
		_config = {
			title = "Mecanico",
		},
		"mecanico.permissao",
	},
	["MecanicoGerente"] = {
		_config = {
			title = "Mecanico Gerente",
			gtype = "job",
			salary = 5000
		},
		"mecanico.permissao",
	},
	["MecanicoLider"] = {
		_config = {
			title = "Mecanico Lider",
			gtype = "job",
			salary = 7000
		},
		"mecanico.permissao",
		"lidermecanico.permissao",
	},
	["Bennys"] = {
		_config = {
			title = "Bennys",
			gtype = "job",
			salary = 5000
		},
		"bennys.permissao"
	},
	["BennysGerente"] = {
		_config = {
			title = "Bennys Gerente",
			gtype = "job",
			salary = 7000
		},
		"liderbennys.permissao",
		"bennys.permissao"
	},
	["BennysLider"] = {
		_config = {
			title = "Bennys L.",
			gtype = "job",
			salary = 7000
		},
		"liderbennys.permissao",
		"bennys.permissao"
	},
	--[[ 
		#############
		   VIPS
		#############
	 ]]
	["Prata"] = {
		_config = {
			title = "Prata",
			gtype = "vip",
			salary = 3000
		},
		"prata.permissao"
	},
	["Ouro"] = {
		_config = {
			title = "Ouro",
			gtype = "vip",
			salary = 4000
		},
		"ouro.permissao",
		"mochila.permissao"
	},
	["Platina"] = {
		_config = {
			title = "Platina",
			gtype = "vip",
			salary = 5500
		},
		"platina.permissao",
		"pets.permissao",
		"corarma.permissao",
		"casa.permissao",
		"tratamentolivre.permissao",
		"helivip.permissao",
		"roupas.permissao",
		"mochila.permissao"
	},
	["Diamante"] = {
		_config = {
			title = "Diamante",
			gtype = "vip",
			salary = 7500
		},
		"diamante.permissao",
		"pets.permissao",
		"corarma.permissao",
		"tratamentolivre.permissao",
		"helivip.permissao",
		"radar.permissao",
		"roupas.permissao",
		"casa.permissao",
		"fantasias.permissao",
		"permanente.permissao",
		"personagem.permissao",
		"carrosexclusivos.permissao",
		"mochila.permissao"
	},
	--[[ 
		#############
		  FACS/ORGS
		#############
	 ]]
	["fac1"] = {
		_config = {
			title = "Membro de facção",
			gtype = "job"
		},
		"fac1.permissao"
	},
	["fac1lider"] = {
		_config = {
			title = "Membro de facção L.",
			gtype = "job"
		},
		"liderfac1.permissao",
		"fac1.permissao"
	},
	["fac2"] = {
		_config = {
			title = "Membro de facção",
			gtype = "job"
		},
		"fac2.permissao"
	},
	["fac2lider"] = {
		_config = {
			title = "Membro de facção L.",
			gtype = "job"
		},
		"liderfac2.permissao",
		"fac2.permissao"
	},
	["fac3"] = {
		_config = {
			title = "Membro de facção",
			gtype = "job"
		},
		"fac3.permissao",
		"trafico.permissao"
	},
	["fac3lider"] = {
		_config = {
			title = "Membro de facção L.",
			gtype = "job"
		},
		"liderfac3.permissao",
		"fac3.permissao",
		"trafico.permissao"
	},
	["Cassino"] = {
		_config = {
			title = "Cassino",
			gtype = "job"
		},
		"cassino.permissao",
		"farmarma.permissao"
	},
	["CassinoLider"] = {
		_config = {
			title = "Cassino L.",
			gtype = "job"
		},
		"lidercassino.permissao",
		"cassino.permissao",
		"farmarma.permissao"
	},
	["Motoclub"] = {
		_config = {
			title = "Motoclub",
			gtype = "job"
		},
		"desmanche.permissao",
		"motoclub.permissao",
	},
	["MotoclubLider"] = {
		_config = {
			title = "Motoclub L.",
			gtype = "job"
		},
		"lidermotoclub.permissao",
		"liderdesmanche.permissao",
		"desmanche.permissao",
		"motoclub.permissao",

	},
	["Milicia"] = {
		_config = {
			title = "Milicia",
			gtype = "job"
		},
		"milicia.permissao",
		"municao.permissao"
	},
	["MiliciaLider"] = {
		_config = {
			title = "Milicia L.",
			gtype = "job"
		},
		"milicialider.permissao",
		"milicia.permissao",
		"municao.permissao",
	},
	["Bahamas"] = {
		_config = {
			title = "Bahamas",
			gtype = "job"
		},
		"bahamas.permissao"
	},
	["BahamasLider"] = {
		_config = {
			title = "Bahamas L.",
			gtype = "job"
		},
		"bahamaslider.permissao",
		"bahamas.permissao"
	},
	["Mafia"] = {
		_config = {
			title = "Mafia",
			gtype = "job"
		},
		"mafia.permissao"
	},
	["MafiaLider"] = {
		_config = {
			title = "Mafia L.",
			gtype = "job"
		},
		"mafialider.permissao",
		"mafia.permissao"
	},
	["Vanilla"] = {
		_config = {
			title = "Vanilla Club",
			gtype = "job"
		},
		"lavagem.permissao",
		"vanilla.permissao"
	},
	["VanillaLider"] = {
		_config = {
			title = "Vanilla Strip Club L.",
			gtype = "job"
		},
		"lidervanilla.permissao",
		"lavagem.permissao",
		"vanilla.permissao"
	},
	["Verdes"] = {
		_config = {
			title = "Verdes",
			gtype = "job"
		},
		"verdes.permissao"
	},
	["VerdesLider"] = {
		_config = {
			title = "Verdes L.",
			gtype = "job"
		},
		"verdeslider.permissao",
		"verdes.permissao"
	},
	["Vermelhos"] = {
		_config = {
			title = "Vermelhos",
			gtype = "job"
		},
		"vermelhos.permissao"
	},
	["VermelhosLider"] = {
		_config = {
			title = "Vermelhos L.",
			gtype = "job"
		},
		"vermelhoslider.permissao",
		"vermelhos.permissao"
	},
	["Azuis"] = {
		_config = {
			title = "Azuis",
			gtype = "job"
		},
		"azuis.permissao"
	},
	["AzuisLider"] = {
		_config = {
			title = "Azuis L.",
			gtype = "job"
		},
		"azuislider.permissao",
		"azuis.permissao"
	},
	--[[ 
		#############
			OUTROS
		#############
	 ]]
	["Juiz"] = {
		_config = {
			title = "Juiz",
			gtype = "job"
		},
		"advogado.permissao",
		"juiza.permissao",
		"portadp.permissao",
	},
	["News"] = {
		_config = {
			title = "Noticias",
			gtype = "job"
		},
		"news.permissao",
	},
	["Piloto"] = {
		_config = {
			title = "Piloto",
			gtype = "alt"
		},
		"piloto.permissao"
	},
	["Advogado"] = {
		_config = {
			title = "Advogado",
			gtype = "job"
		},
		"advogado.permissao"
	},
}

do
	local paisanaGroups = {}
	for k,v in pairs(groups) do
		if v._config and v._config.gtype then
			if v._config.gtype == "job" then
				paisanaGroups["Paisana"..k] = {
					_config = {
						title = "Paisana - "..v._config.title,
						gtype = "job"
					},
					"sem.permissao"
				}
			elseif v._config.gtype == "staff" then
				paisanaGroups["wait"..k] = {
					_config = {
						title = "Paisana - "..v._config.title,
						gtype = "staff"
					},
					"sem.permissao"
				}
			end
		end
	end
	for k,v in pairs(paisanaGroups) do
		groups[k] = v
	end
end

return groups