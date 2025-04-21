local Webhooks = module("Reborn/webhooks") or {}
orgsConfig = {}

orgsConfig.blackList = 3 --tempo da blacklist
orgsConfig.PermAdmin = "admin.permissao"
orgsConfig.debug = false
orgsConfig.summerz = false
orgsConfig.webhook = {
	demote = Webhooks.webhookdemote,
	invite = Webhooks.webhookinvite,
	leaveOrg = Webhooks.webhookleaveorg,
	promote = Webhooks.webhookpromote,
	bankDeposit = Webhooks.webhookbankdeposit,
	bankWithdraw = Webhooks.webhookbankwithdraw,
	reward = Webhooks.webhookreward
}

-- até o lider editar os pagamentos mensais/diários, o padrão que vem por facção é definido aqui
orgsConfig.PaymentDefault = {
	--	playerMonthly = 10,
	maxMonthly = 5000,
	--  playerDailyFarm = 10,
	maxDaily = 450,
	--  playerRewarded = true,
	payment = 10000
}

--mensagens da blacklist
orgsConfig.langs = {
	isBlackList = function(source,dia,mes,hora,minutos) return TriggerClientEvent("Notify",source, "negado","Atenção: Você so podera entrar em organização no dia "..dia.."/"..mes.." as "..hora..":"..minutos..".", 5) end,
    haveBlackList = function(source,dia,mes,hora,minutos) return TriggerClientEvent("Notify",source, "negado","Este jogador está proibido de entrar em qualquer organização até dia "..dia.."/"..mes.." as "..hora..":"..minutos..".", 5) end,
}


orgsConfig.main = {
	createAutomatic = true, -- Criar Automaticamente Organizações no banco de dados, so é preciso startar uma vez a cada alteração com ela em TRUE.
}

orgsConfig.Permissions = {
	-- alterar apenas a descrição, caso queira
	invite = { -- Permissao Para Convidar
		name = "Convidar",
		description = "Esta permissao permite vc convidar as pessoas para sua facção."
	},
	demote = { -- Permissao Para Demitir
		name = "Demitir",
		description = "Essa permissão permite que o cargo selecionado demita um cargo inferior."
	}, 
	promove = { -- Permissao Para Promover
		name = "Promover",
		description = "Essa permissão permite que o cargo selecionado promova um cargo."
	}, 
	withdraw = { -- Permissao Para Sacar Dinheiro
		name = "Sacar dinheiro",
		description = "Permite que esse cargo selecionado possa sacar dinheiro do banco da facção."
	}, 
	deposit = { -- Permissao Para Depositar Dinheiro
		name = "Depositar dinheiro",
		description = "Permite que esse cargo selecionado possa depositar dinheiro no banco da facção."
	}, 
	message = { -- Permissao para Escrever nas anotaçoes
		name = "Escrever anotações",
		description = "Permite que esse cargo selecionado possa escrever anotações."
	},
	pix = {  -- Permissao para Alterar o Pix
		name = "Alterar a chave PIX",
		description = "Permite que esse cargo selecionado possa alterar a chave PIX do banco da facção"
	},
	chat = { -- Permissao para Falar no chat
		name = "Escrever no chat",
		description = "Permite que esse cargo selecionado possa se comunicar no chat da facção"
	},
}

orgsConfig.List = {
	-- EXEMPLO
	--[[ ["Ballas"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['rifleammo'] = true,
                ['dollars'] = true,
				['pistolammo'] = true,
            }
		},
		groups = {
			["Ballas"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 6, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["SubBallas"] = { -- CARGO
				prefix = "Braço-Direito", -- PREFIX
				tier = 5, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["GerenteBallas"] = { -- CARGO
				prefix = "Gerente", -- PREFIX
				tier = 4, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["RecrutadorBallas"] = { -- CARGO
				prefix = "Recrutador", -- PREFIX
				tier = 3, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["MembroBallas"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["NovatoBallas"] = { -- CARGO
				prefix = "Novato", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	}, ]]
	["Milicia"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['rifleammo'] = true,
                ['smgammo'] = true,
                ['shotgunammo'] = true,
				['pistolammo'] = true,
				["capsule"] = true,
				["gunpowder"] = true,
            }
		},
		groups = {
			["MiliciaLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Milicia"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Bahamas"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['lockpick'] = true,
                ['blackcard'] = true,
                ['c4'] = true,
				['handcuff'] = true,
				["rope"] = true,
				["hood"] = true,
            }
		},
		
		groups = {
			["BahamasLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Bahamas"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Mafia"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['m1911'] = true,
                ['fiveseven'] = true,
                ['akcompact'] = true,
				['uzi'] = true,
				["ak103"] = true,
				["ak74"] = true,
            }
		},
		
		groups = {
			["MafiaLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Mafia"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Mafia"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['m1911'] = true,
                ['fiveseven'] = true,
                ['akcompact'] = true,
				['uzi'] = true,
				["ak103"] = true,
				["ak74"] = true,
            }
		},
		
		groups = {
			["MafiaLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Mafia"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Vermelhos"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['weed'] = true,
            }
		},
		
		groups = {
			["VermelhosLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Vermelhos"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Azuis"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['cocaine'] = true,
            }
		},
		
		groups = {
			["AzuisLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Azuis"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Verdes"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {
                -- ITEM / SEMPRE TRUE
                ['meth'] = true,
            }
		},
		
		groups = {
			["VerdesLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Verdes"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Motoclub"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {}
		},
		
		groups = {
			["MotoclubLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Motoclub"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Vanilla"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {}
		},
		
		groups = {
			["VanillaLider"] = { -- CARGO
				prefix = "Lider", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Vanilla"] = { -- CARGO
				prefix = "Membro", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
	["Hospital"] = {
		config = {
			maxMembers = 15, -- Maximo de Jogadores
			listMetas = {}
		},
		
		groups = {
			["Diretor"] = { -- CARGO
				prefix = "Diretor", -- PREFIX
				leader = true, -- Se é lider ou não
				tier = 4, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Medico"] = { -- CARGO
				prefix = "Medico", -- PREFIX
				tier = 3, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Enfermeiro"] = { -- CARGO
				prefix = "Enfermeiro", -- PREFIX
				tier = 2, -- Nivel do Cargo ( Para ter uma Ordem )
			},
			["Paramedico"] = { -- CARGO
				prefix = "Paramedico", -- PREFIX
				tier = 1, -- Nivel do Cargo ( Para ter uma Ordem )
			},
		}
	},
}