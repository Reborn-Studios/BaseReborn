Services = {
	-- Nome |    Coordenadas	| Permissao para colocar roupas | Permissao para salvar as roupas
	[1] = { "Hospital", 1150.37,-1589.54,35.3, "paramedico.permissao", "diretor.permissao" },
	[2] = { "Hospital", 1150.61,-1583.09,35.3, "paramedico.permissao", "diretor.permissao" },
	[3] = { "Mecânica", 822.92,-942.93,26.47, "mecanico.permissao", "lidermecanico.permissao" },
	[4] = { "Policia", 83.15,-380.61,41.63, "policia.permissao","comando.permissao" },
}

local DefaultPolClothes = {}
if GlobalState['Basics']['Theme'] == "default" then
	DefaultPolClothes = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 43, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 209, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
elseif GlobalState['Basics']['Theme'] == "SP" then
	DefaultPolClothes = {
		["homem"] = {
			["hat"] = { item = 218, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 194, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 146, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 530, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	FT = {
		["homem"] = {
			["hat"] = { item = 219, texture = 2, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 194, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 146, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 528, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	BAEP = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 203, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 542, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 44, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	ROTA = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 203, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 542, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 44, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	GCM = {
		["homem"] = {
			["hat"] = { item = 215, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 212, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 539, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	TOR = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 203, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 572, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 44, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	PCESP = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 231, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 215, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 550, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 44, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
elseif GlobalState['Basics']['Theme'] == "RJ" then
	DefaultPolClothes = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 43, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 209, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 232, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	Bope = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 52, texture = 2, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 16, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 15, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 49, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 54, texture = 2, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 18, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 14, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 42, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	PMERJ = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 130, texture = 3, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 7, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 129, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 98, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTewxture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 136, texture = 3, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 7, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 14, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 31, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
	CORE = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 52, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 16, texture = 2, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 15, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 49, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTewxture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 54, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 18, texture = 2, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 14, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 42, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
end

Presets = {
	["Police"] = {
		["Recruta"] = DefaultPolClothes,
		["Soldado"] = DefaultPolClothes,
		["Cabo"] = DefaultPolClothes,
		["3Sargento"] = DefaultPolClothes,
		["2Sargento"] = DefaultPolClothes,
		["Sargento"] = DefaultPolClothes,
		["Sub.Tenente"] = DefaultPolClothes,
		["Tenente"] = DefaultPolClothes,
		["Major"] = DefaultPolClothes,
		["Capitao"] = DefaultPolClothes,
		["Coronel"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 3, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 43, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 209, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 3, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 232, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
		["GTM"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 43, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 209, texture = 5, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 33, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 3, texture = 1, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 28, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 232, texture = 5, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
	},
	["Paramedic"] = {
		["Medico"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 20, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 7, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 96, texture = 1, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 32, texture = 7, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 126, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 79, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 23, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 7, texture = 3, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 101, texture = 1, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 58, texture = 7, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 96, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 91, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
		["Enfermeiro"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 20, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 7, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 96, texture = 1, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 32, texture = 7, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 126, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 79, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 23, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 7, texture = 3, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 101, texture = 1, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 58, texture = 7, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 96, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 91, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
	},
    ["Mechanic"] = {
        ["Mecanico"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 39, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 129, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 65, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 107, texture = 9, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = 13, texture = 2, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 31, texture = 2, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 9, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 27, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 202, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 23, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
		["Bennys"] = {
			["homem"] = {
				["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 39, texture = 2, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 129, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 65, texture = 2, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 107, texture = 9, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			},
			["mulher"] = {
				["hat"] = { item = 13, texture = 2, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 31, texture = 2, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 9, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 27, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 202, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 23, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["glass"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
			}
		},
    }
}

if GlobalState['Basics']['Theme'] == "SP" then
	Presets["Police"]["CoronelPMESP"] = DefaultPolClothes
	Presets["Police"]["CapitaoPMESP"] = DefaultPolClothes
	Presets["Police"]["MajorPMESP"] = DefaultPolClothes
	Presets["Police"]["TenentePMESP"] = DefaultPolClothes
	Presets["Police"]["Sub.TenentePMESP"] = DefaultPolClothes
	Presets["Police"]["SargentoPMESP"] = DefaultPolClothes
	Presets["Police"]["2SargentoPMESP"] = DefaultPolClothes
	Presets["Police"]["3SargentoPMESP"] = DefaultPolClothes
	Presets["Police"]["CaboPMESP"] = DefaultPolClothes
	Presets["Police"]["SoldadoPMESP"] = DefaultPolClothes
	Presets["Police"]["RecrutaPMESP"] = DefaultPolClothes

	Presets["Police"]["Delegado"] = PCESP
	Presets["Police"]["Escrivao"] = PCESP
	Presets["Police"]["Investigador"] = PCESP
	Presets["Police"]["Agente"] = PCESP

	Presets["Police"]["CoronelROTA"] = ROTA
	Presets["Police"]["CapitaoROTA"] = ROTA
	Presets["Police"]["TenenteROTA"] = ROTA
	Presets["Police"]["SargentoROTA"] = ROTA
	Presets["Police"]["CaboROTA"] = ROTA
	Presets["Police"]["SoldadoROTA"] = ROTA
	Presets["Police"]["RecrutaROTA"] = ROTA

	Presets["Police"]["CoronelBAEP"] = BAEP
	Presets["Police"]["CapitaoBAEP"] = BAEP
	Presets["Police"]["TenenteBAEP"] = BAEP
	Presets["Police"]["SargentoBAEP"] = BAEP
	Presets["Police"]["CaboBAEP"] = BAEP
	Presets["Police"]["SoldadoBAEP"] = BAEP
	Presets["Police"]["RecrutaBAEP"] = BAEP

	Presets["Police"]["CoronelFT"] = FT
	Presets["Police"]["CapitaoFT"] = FT
	Presets["Police"]["TenenteFT"] = FT
	Presets["Police"]["SargentoFT"] = FT
	Presets["Police"]["CaboFT"] = FT
	Presets["Police"]["SoldadoFT"] = FT
	Presets["Police"]["RecrutaFT"] = FT

	Presets["Police"]["CoronelTOR"] = TOR
	Presets["Police"]["SargentoTOR"] = TOR
	Presets["Police"]["CaboTOR"] = TOR
	Presets["Police"]["RecrutaTOR"] = TOR

	Presets["Police"]["CoronelGCM"] = GCM
	Presets["Police"]["SargentoGCM"] = GCM
	Presets["Police"]["CaboGCM"] = GCM
	Presets["Police"]["RecrutaGCM"] = GCM
elseif GlobalState['Basics']['Theme'] == "RJ" then
	Presets["Police"]["CoronelBOPE"] = Bope
	Presets["Police"]["CapitaoBOPE"] = Bope
	Presets["Police"]["TenenteBOPE"] = Bope
	Presets["Police"]["SargentoBOPE"] = Bope
	Presets["Police"]["CaboBOPE"] = Bope
	Presets["Police"]["SoldadoBOPE"] = Bope
	Presets["Police"]["RecrutaBOPE"] = Bope

	Presets["Police"]["CoronelPMERJ"] = PMERJ
	Presets["Police"]["CapitaoPMERJ"] = PMERJ
	Presets["Police"]["MajorPMERJ"] = PMERJ
	Presets["Police"]["TenentePMERJ"] = PMERJ
	Presets["Police"]["Sub.TenentePMERJ"] = PMERJ
	Presets["Police"]["SargentoPMERJ"] = PMERJ
	Presets["Police"]["2SargentoPMERJ"] = PMERJ
	Presets["Police"]["3SargentoPMERJ"] = PMERJ
	Presets["Police"]["CaboPMERJ"] = PMERJ
	Presets["Police"]["SoldadoPMERJ"] = PMERJ
	Presets["Police"]["RecrutaPMERJ"] = PMERJ

	Presets["Police"]["CoronelCORE"] = CORE
	Presets["Police"]["CapitaoCORE"] = CORE
	Presets["Police"]["MajorCORE"] = CORE
	Presets["Police"]["TenenteCORE"] = CORE
	Presets["Police"]["Sub.TenenteCORE"] = CORE
	Presets["Police"]["SargentoCORE"] = CORE
	Presets["Police"]["2SargentoCORE"] = CORE
	Presets["Police"]["3SargentoCORE"] = CORE
	Presets["Police"]["CaboCORE"] = CORE
	Presets["Police"]["SoldadoCORE"] = CORE
	Presets["Police"]["RecrutaCORE"] = CORE
	Presets["Police"]["RECOM"] = {
		["homem"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 130, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 7, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 129, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 98, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTewxture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		},
		["mulher"] = {
			["hat"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["pants"] = { item = 136, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["vest"] = { item = 18, texture = 1, defaultItem = 0, defaultTexture = 0 },
			["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["mask"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["tshirt"] = { item = 14, texture = 0, defaultItem = 1, defaultTexture = 0 },
			["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["torso"] = { item = 31, texture = 2, defaultItem = 0, defaultTexture = 0 },
			["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
			["arms"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["glass"] = { item = -1, texture = 0, defaultItem = 0, defaultTexture = 0 },
			["ear"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 }
		}
	}
end
