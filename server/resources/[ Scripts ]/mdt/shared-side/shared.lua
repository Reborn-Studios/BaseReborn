-----------------------------------------------------------------------------------------------------------------------------------------
-- CONFIG
-----------------------------------------------------------------------------------------------------------------------------------------
Config = {
	Group = "Policia",

	WebhookPhoto = "",
	MaxFine = 100000,
	MaxReductionFine = 100,

	MaxArrest = 2500,
	MaxReductionArrest = 100,

	BankTaxWithdraw = 1.0,
	BankTaxTransfer = 1.0,

	Permissions = { -- ( -1 = Ninguém tem permissão | 0 = Todos tem permissão | 2 = 2 e 1 tem permissão )
		Board = 1,
		Firearms = 1,
		Flyingarms = 1,
		ClearRecord = 1,
		Patrol = {
			View = 1,
			Create = 1,
			Edit = 1,
			Delete = 1
		},
		Operations = {
			View = 1,
			Create = 1,
			Edit = 1,
			Delete = 1
		},
		Arrest = 1,
		Fine = 1,
		Warning = 1,
		PoliceReports = {
			View = 1,
			Create = 1,
			Edit = 1,
			Archive = 1
		},
		InternalAffairs = {
			View = 1,
			Create = 1,
			Edit = 1,
			Archive = 1
		},
		Wanted = {
			View = 1,
			Create = 1,
			Edit = 1,
			Delete = 1
		},
		SeizedVehicles = 1,
		EditPenalCode = 1,
		Medals = {
			View = 1,
			Create = 1,
			Assign = 1,
			Edit = 1,
			Delete = 1
		},
		Units = {
			View = 1,
			Create = 1,
			Assign = 1,
			Edit = 1,
			Delete = 1
		},
		Management = {
			View = 1,
			Create = 1,
			Edit = 1,
			Dismiss = 1
		},
		Bank = {
			View = 1,
			Deposit = 1,
			Withdraw = 1,
			Transfer = 1
		}
	},

	OtherPermissions = {
		LSPD = {
			Board = 1,
			Firearms = 1,
			Flyingarms = 1,
			ClearRecord = 1,
			Patrol = {
				View = 1,
				Create = 1,
				Edit = 1,
				Delete = 1
			},
			Operations = {
				View = 1,
				Create = 1,
				Edit = 1,
				Delete = 1
			},
			Arrest = 1,
			Fine = 1,
			Warning = 1,
			PoliceReports = {
				View = 1,
				Create = 1,
				Edit = 1,
				Archive = 1
			},
			InternalAffairs = {
				View = 1,
				Create = 1,
				Edit = 1,
				Archive = 1
			},
			Wanted = {
				View = 1,
				Create = 1,
				Edit = 1,
				Delete = 1
			},
			SeizedVehicles = 1,
			EditPenalCode = 1,
			Medals = {
				View = 1,
				Create = 1,
				Assign = 1,
				Edit = 1,
				Delete = 1
			},
			Units = {
				View = 1,
				Create = 1,
				Assign = 1,
				Edit = 1,
				Delete = 1
			},
			Management = {
				View = 1,
				Create = 1,
				Edit = 1,
				Dismiss = 1
			},
			Bank = {
				View = 1,
				Deposit = 1,
				Withdraw = 1,
				Transfer = 1
			}
		}
	},

	OperationsLocations = {
		{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Barbearia",
			Max = 2
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Loja de Armamentos",
			Max = 2
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Loja Roupas",
			Max = 2
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Loja de Tatuagem",
			Max = 2
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Loja de Departamento",
			Max = 5
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Galinheiro",
			Max = 10
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Açougue",
			Max = 10
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Madeireira",
			Max = 10
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Aeroporto do Norte",
			Max = 10
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Doca",
			Max = 10
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Fleeca",
			Max = 11
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Joalheria",
			Max = 11
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Banco Central",
			Max = 19
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Humane",
			Max = 25
		},{
			Image = "nui://mdt/web-side/images/Operations.png",
			Name = "Operação",
			Max = 33
		}
	}
}