Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
Tools = module("vrp","lib/Tools")
vRP = Proxy.getInterface("vRP")

-----##########################################################-----
--###          CONFIGS
-----##########################################################-----

Config = {}

Config.Commands = {
	['blips'] = {
		['command'] = "blips",
		['perm'] = "owner.permissao"
	},
	['garages'] = {
		['command'] = "garagens",
		['perm'] = "owner.permissao"
	},
	['peds'] = {
		['command'] = "peds",
		['perm'] = "owner.permissao"
	},
	['safezones'] = {
		['command'] = "safezones",
		['perm'] = "owner.permissao"
	},
	['stashes'] = {
		['command'] = "baus",
		['perm'] = "owner.permissao"
	},
	['elevators'] = {
		['command'] = "elevadores",
		['perm'] = "owner.permissao"
	},
	['radio'] = {
		['command'] = "radiofreqs",
		['perm'] = "owner.permissao"
	},
	['skinshop'] = {
		['command'] = "admSkinshop",
		['perm'] = "owner.permissao"
	},
	['farms'] = {
		['command'] = "criarfarm",
		['perm'] = "owner.permissao"
	},
	['shops'] = {
		['command'] = "createshops",
		['perm'] = "owner.permissao"
	},
	['tattooshop'] = {
		['command'] = "tattooshops",
		['perm'] = "owner.permissao"
	},
	['groups'] = {
		['command'] = "managegroups",
		['perm'] = "owner.permissao"
	},
	['items'] = {
		['command'] = "manageitems",
		['perm'] = "owner.permissao"
	},
	['barbershop'] = {
		['command'] = "barbershops",
		['perm'] = "owner.permissao"
	}
}

Config.DefaultStash = {
    slots = 72,             -- 72 Slots
    weight = 50 * 1000,     -- 50 KG
}

Config.PedHashs = {
	"ig_dale",
	"mp_m_shopkeep_01",
	"s_m_m_prisguard_01",
	"a_m_m_farmer_01",
	"csb_prologuedriver",
	"s_m_y_garbage",
	"s_m_y_baywatch_01",
	"s_m_m_dockwork_01",
	"s_m_y_hwaycop_01",
	"ig_abigail",
	"u_m_y_abner",
	"a_m_o_acult_02",
	"a_m_m_afriamer_01",
	"csb_mp_agent14",
	"csb_agent",
	"u_m_m_aldinapoli",
	"ig_amandatownley",
	"ig_andreas",
	"u_m_y_antonb",
	"csb_anita",
	"cs_andreas",
	"ig_ashley",
	"s_m_m_autoshop_01",
	"ig_money",
	"g_m_y_ballaeast_01",
	"g_m_y_ballaorig_01",
	"g_f_y_ballas_01",
	"u_m_y_babyd",
	"ig_barry",
	"s_m_y_barman_01",
	"u_m_y_baygor",
	"a_f_y_beach_01",
	"a_f_y_bevhills_02",
	"a_f_y_bevhills_01",
	"u_m_y_burgerdrug_01",
	"a_m_m_business_01",
	"a_f_m_business_02",
	"a_m_y_business_02",
	"ig_car3guy1",
	"ig_chef2",
	"g_m_m_chigoon_02",
	"g_m_m_chigoon_01",
	"ig_claypain",
	"ig_clay",
	"a_f_m_eastsa_01"
}
