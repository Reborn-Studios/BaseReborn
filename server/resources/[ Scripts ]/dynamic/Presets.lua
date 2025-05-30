Services = {
	-- Nome |    Coordenadas	| Permissao para colocar roupas | Permissao para salvar as roupas
	[1] = { "Hospital", 1150.37,-1589.54,35.3, "paramedico.permissao", "diretor.permissao" },
	[2] = { "Hospital", 1150.61,-1583.09,35.3, "paramedico.permissao", "diretor.permissao" },
	[3] = { "Mecânica", 822.92,-942.93,26.47, "mecanico.permissao", "lidermecanico.permissao" },
	[4] = { "Policia", 83.15,-380.61,41.63, "policia.permissao","comando.permissao" },
}

local DefaultPolClothes = {
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
        ["Bennys"] = {
			["homem"] = {
				["hat"] = { item = 13, texture = 2, defaultItem = -1, defaultTexture = 0 },
				["pants"] = { item = 25, texture = 2, defaultItem = 0, defaultTexture = 0 },
				["vest"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["bracelet"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["decals"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["mask"] = { item = 121, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["shoes"] = { item = 25, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["tshirt"] = { item = 56, texture = 0, defaultItem = 1, defaultTexture = 0 },
				["backpack"] = { item = 0, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["torso"] = { item = 200, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["accessory"] = { item = 1, texture = 0, defaultItem = 0, defaultTexture = 0 },
				["watch"] = { item = -1, texture = 0, defaultItem = -1, defaultTexture = 0 },
				["arms"] = { item = 20, texture = 0, defaultItem = 0, defaultTexture = 0 },
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