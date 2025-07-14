-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
RolepassPoints = 500
RolepassPrice = 10000
-----------------------------------------------------------------------------------------------------------------------------------------
-- BOX MENU
-----------------------------------------------------------------------------------------------------------------------------------------
BoxMenu = 1
-----------------------------------------------------------------------------------------------------------------------------------------
-- BOXES
-----------------------------------------------------------------------------------------------------------------------------------------
Boxes = {
    {
        ["Id"] = 1,
        ["Name"] = "Caixa de Diamantes",
        ["Image"] = "gemstone",
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 250,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 375,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 500,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 625,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 750,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 1000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 5
            }, {
                ["Id"] = 7,
                ["Amount"] = 2000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 4
            }, {
                ["Id"] = 8,
                ["Amount"] = 3000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 3
            }, {
                ["Id"] = 9,
                ["Amount"] = 4000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 2
            }, {
                ["Id"] = 10,
                ["Amount"] = 5000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 1
            }, {
                ["Id"] = 11,
                ["Amount"] = 10000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 0
            }, {
                ["Id"] = 12,
                ["Amount"] = 20000,
                ["Image"] = "gemstone",
                ["Item"] = "gemstone",
                ["Name"] = "Diamante",
                ["Chance"] = 0
            }
        }
    }, {
        ["Id"] = 2,
        ["Name"] = "Caixa de Munições",
        ["Image"] = "platinum",
        ["Price"] = 1000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "ammo-9",
                ["Item"] = "ammo-9",
                ["Name"] = "9mm",
                ["Chance"] = 300
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "ammo-rifle",
                ["Item"] = "ammo-rifle",
                ["Name"] = "5.56x45",
                ["Chance"] = 200
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "ammo-rifle2",
                ["Item"] = "ammo-rifle2",
                ["Name"] = "7.62x39",
                ["Chance"] = 175
            }, {
                ["Id"] = 4,
                ["Amount"] = 1000,
                ["Image"] = "ammo-22",
                ["Item"] = "ammo-22",
                ["Name"] = ".22 Long Rifle",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1000,
                ["Image"] = "ammo-emp",
                ["Item"] = "ammo-emp",
                ["Name"] = "EMP round",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 1000,
                ["Image"] = "ammo-shotgun",
                ["Item"] = "ammo-shotgun",
                ["Name"] = "12 Gauge",
                ["Chance"] = 5
            }, {
                ["Id"] = 7,
                ["Amount"] = 1000,
                ["Image"] = "ammo-44",
                ["Item"] = "ammo-44",
                ["Name"] = ".44 Magnum",
                ["Chance"] = 4
            }, {
                ["Id"] = 8,
                ["Amount"] = 1000,
                ["Image"] = "ammo-grenade",
                ["Item"] = "ammo-grenade",
                ["Name"] = "40mm Explosive",
                ["Chance"] = 3
            }, {
                ["Id"] = 9,
                ["Amount"] = 1000,
                ["Image"] = "ammo-heavysniper",
                ["Item"] = "ammo-heavysniper",
                ["Name"] = ".50 BMG",
                ["Chance"] = 2
            }, {
                ["Id"] = 10,
                ["Amount"] = 1000,
                ["Image"] = "ammo-sniper",
                ["Item"] = "ammo-sniper",
                ["Name"] = "7.62x51",
                ["Chance"] = 1
            }, {
                ["Id"] = 11,
                ["Amount"] = 10000,
                ["Image"] = "ammo-rifle",
                ["Item"] = "ammo-rifle",
                ["Name"] = "5.56x45",
                ["Chance"] = 0
            }, {
                ["Id"] = 12,
                ["Amount"] = 10000,
                ["Image"] = "ammo-rifle2",
                ["Item"] = "ammo-rifle2",
                ["Name"] = "7.62x39",
                ["Chance"] = 0
            }
        }
    }, {
        ["Id"] = 3,
        ["Name"] = "Caixa de Alumínio",
        ["Image"] = "aluminum",
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 1250,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1500,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 2250,
                ["Image"] = "aluminum",
                ["Item"] = "aluminum",
                ["Name"] = "Alumínio",
                ["Chance"] = 10
            }
        }
    }, {
        ["Id"] = 4,
        ["Name"] = "Caixa de Vidro",
        ["Image"] = "glass",
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 1250,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1500,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 2250,
                ["Image"] = "glass",
                ["Item"] = "glass",
                ["Name"] = "Vidro",
                ["Chance"] = 10
            }
        }
    }, {
        ["Id"] = 5,
        ["Name"] = "Caixa de Cobre",
        ["Image"] = "copper",
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 1250,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1500,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 2250,
                ["Image"] = "copper",
                ["Item"] = "copper",
                ["Name"] = "Cobre",
                ["Chance"] = 10
            }
        }
    }, {
        ["Id"] = 6,
        ["Name"] = "Caixa de Borracha",
        ["Image"] = "rubber",
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 1250,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1500,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 2250,
                ["Image"] = "rubber",
                ["Item"] = "rubber",
                ["Name"] = "Borracha",
                ["Chance"] = 10
            }
        }
    }, {
        ["Id"] = 7,
        ["Name"] = "Caixa de Plástico",
        ["Image"] = "plastic",
        ["Price"] = 500,
        ["Discount"] = 0.75,
        ["Rewards"] = {
            {
                ["Id"] = 1,
                ["Amount"] = 500,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 500
            }, {
                ["Id"] = 2,
                ["Amount"] = 750,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 250
            }, {
                ["Id"] = 3,
                ["Amount"] = 1000,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 200
            }, {
                ["Id"] = 4,
                ["Amount"] = 1250,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 150
            }, {
                ["Id"] = 5,
                ["Amount"] = 1500,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 100
            }, {
                ["Id"] = 6,
                ["Amount"] = 2250,
                ["Image"] = "plastic",
                ["Item"] = "plastic",
                ["Name"] = "Plástico",
                ["Chance"] = 10
            }
        }
    }
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- WORKS
-----------------------------------------------------------------------------------------------------------------------------------------
Works = {
    ["Taxi"] = "Taxi",
    ["Delivery"] = "Entregador",
    ["Transporter"] = "Transportador",
    ["Lumberman"] = "Lenhador",
    ["Trucker"] = "Caminhoneiro",
    ["Driver"] = "Motorista",
    ["Fireman"] = "Bombeiro",
    ["Diver"] = "Mergulhador",
    ["Garbageman"] = "Lixeiro",
    ["Safeguard"] = "Salva_vidas",
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- PREMIUM
-----------------------------------------------------------------------------------------------------------------------------------------
Premium = {
    ["Diamante"] = {
        ["Hierarchy"] = 1,
        ["Name"] = "Diamante",
        ["Image"] = "diamond",
        ["Price"] = 50000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {
                ["Type"] = "Info",
                ["Name"] = "Veiculo da categoria 2 30 dias"
            },
            {["Type"] = "Info", ["Name"] = "Reduz 50% de quebrar a Lockpick"},
            {
                ["Type"] = "Info",
                ["Name"] = "Recebe 100 Kilos de peso na mochila"
            },
            {["Type"] = "Info", ["Name"] = "50% de bonificação nos empregos"},
            {
                ["Type"] = "Info",
                ["Name"] = "Salário de $25.000 a cada 30 minutos"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "+1 Slot de Armário"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Não perde mochila ao renascer"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Tratamento livre"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Acesso a Helicopteros Vips"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Troca de roupa sem item"
            },
            {
                ["Type"] = "Item",
                ["Item"] = "premiumplate",
                ["Name"] = "Plate Premium",
                ["Amount"] = 1
            },
        },
        ["Selectables"] = {
            {
                ["Id"] = 1,
                ["Name"] = "Veiculos VIPs",
                ["Options"] = {
                    {
                        ["Name"] = "Nissan GTR",
                        ["Index"] = "gtr50",
                        ["Amount"] = 30
                    },
                    {
                        ["Name"] = "Audi RS7",
                        ["Index"] = "rs7",
                        ["Amount"] = 30
                    },
                    {
                        ["Name"] = "Lancer Evolution 9",
                        ["Index"] = "evo9",
                        ["Amount"] = 30
                    },
                }
            }
        }
    },
    ["Platina"] = {
        ["Hierarchy"] = 2,
        ["Name"] = "Platina",
        ["Image"] = "platinum",
        ["Price"] = 35000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {["Type"] = "Info", ["Name"] = "Reduz 30% de quebrar a Lockpick"},
            {
                ["Type"] = "Info",
                ["Name"] = "Recebe 50 Kilos de peso na mochila"
            },
            {["Type"] = "Info", ["Name"] = "30% de bonificação nos empregos"},
            {
                ["Type"] = "Info",
                ["Name"] = "Salário de $15.000 a cada 30 minutos"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "+1 Slot de Armário"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Não perde mochila ao renascer"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Tratamento livre"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Acesso a Helicopteros Vips"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Troca de roupa sem item"
            },
            {
                ["Type"] = "Item",
                ["Item"] = "premiumplate",
                ["Name"] = "Plate Premium",
                ["Amount"] = 1
            },
        }
    },
    ["Ouro"] = {
        ["Hierarchy"] = 3,
        ["Name"] = "Ouro",
        ["Image"] = "gold",
        ["Price"] = 20000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {["Type"] = "Info", ["Name"] = "Reduz 20% de quebrar a Lockpick"},
            {
                ["Type"] = "Info",
                ["Name"] = "Recebe 30 Kilos de peso na mochila"
            },
            {["Type"] = "Info", ["Name"] = "20% de bonificação nos empregos"},
            {
                ["Type"] = "Info",
                ["Name"] = "Salário de $10.000 a cada 30 minutos"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "+1 Slot de Armário"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "Não perde mochila ao renascer"
            },
        }
    },
    ["Prata"] = {
        ["Hierarchy"] = 4,
        ["Name"] = "Prata",
        ["Image"] = "silver",
        ["Price"] = 10000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {["Type"] = "Info", ["Name"] = "Reduz 10% de quebrar a Lockpick"},
            {["Type"] = "Info", ["Name"] = "20 Kilos de peso na mochila"},
            {["Type"] = "Info", ["Name"] = "10% de bonificação nos empregos"},
            {
                ["Type"] = "Info",
                ["Name"] = "Salário de $5.000 a cada 30 minutos"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "+1 Slot de Armário"
            }
        }
    },
    ["Bronze"] = {
        ["Hierarchy"] = 5,
        ["Name"] = "Bronze",
        ["Image"] = "bronze",
        ["Price"] = 5000,
        ["Discount"] = 1.0,
        ["Rewards"] = {
            {["Type"] = "Info", ["Name"] = "Reduz 5% de quebrar a Lockpick"},
            {["Type"] = "Info", ["Name"] = "10 Kilos de peso na mochila"},
            {["Type"] = "Info", ["Name"] = "5% de bonificação nos empregos"},
            {
                ["Type"] = "Info",
                ["Name"] = "Salário de $2.500 a cada 30 minutos"
            },
            {
                ["Type"] = "Info",
                ["Name"] = "+1 Slot de Armário"
            }
        }
    }
    -- [4] = {
    -- 	["Hierarchy"] = 3,
    -- 	["Name"] = "Bronze",
    -- 	["Image"] = "bronze",
    -- 	["Price"] = 5000,
    -- 	["Discount"] = 1.0,
    -- 	["Rewards"] = {
    -- 		{
    -- 			["Type"] = "Item",
    -- 			["Item"] = "bandage",
    -- 			["Name"] = "Bandagem",
    -- 			["Amount"] = 1
    -- 		},{
    -- 			["Type"] = "Info",
    -- 			["Name"] = "Veiculo da categoria 2 30 dias"
    -- 		},{
    -- 			["Type"] = "Vehicle",
    -- 			["Name"] = "SkylineR34",
    -- 			["Index"] = "skyliner34",
    -- 			["Amount"] = 30
    -- 		}
    -- 	},
    -- 	["Selectables"] = {
    -- 		{
    -- 			["Id"] = 1,
    -- 			["Name"] = "Categoria 2",
    -- 			["Options"] = {
    -- 				{
    -- 					["Name"] = "SkylineR34",
    -- 					["Index"] = "skyliner34"
    -- 				}
    -- 			}
    -- 		}
    -- 	}
    -- }
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SHOPITENS
-----------------------------------------------------------------------------------------------------------------------------------------
ShopItens = {
    ["gemstone"] = {
        ["Price"] = 1,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["premiumplate"] = {
        ["Price"] = 4000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["premiumpersonagem"] = {
        ["Price"] = 5000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["premiumname"] = {
        ["Price"] = 3000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["grafite"] = {
        ["Price"] = 750,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["removedor"] = {
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["WEAPON_FLARE"] = {
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["WEAPON_FIREWORK"] = {
        ["Price"] = 2500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["WEAPON_FLAREGUN"] = {
        ["Price"] = 2500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["WEAPON_MOLOTOV"] = {
        ["Price"] = 1500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["backpackp"] = {
        ["Price"] = 2000,
        ["Discount"] = 0.95,
        ["Category"] = "Diamantes"
    },
    ["backpackm"] = {
        ["Price"] = 3500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["pager"] = {
        ["Price"] = 500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["radio_jammer"] = {
        ["Price"] = 1000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["drugtable"] = {
        ["Price"] = 1250,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["cirurgia"] = {
        ["Price"] = 1250,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["backpackg"] = {
        ["Price"] = 5000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["teddy"] = {
        ["Price"] = 5000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["money_box"] = {
        ["Price"] = 5000,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["aio_box"] = {
        ["Price"] = 3500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["medkit_box"] = {
        ["Price"] = 2500,
        ["Discount"] = 1.0,
        ["Category"] = "Diamantes"
    },
    ["vest_box"] = {
        ["Price"] = 5000,
        ["Discount"] = 0.95,
        ["Category"] = "Diamantes"
    },
    ["adrenaline"] = {
        ["Price"] = 500,
        ["Discount"] = 0.98,
        ["Category"] = "Diamantes"
    },
    ["blackcard"] = {
        ["Price"] = 1500,
        ["Discount"] = 0.98,
        ["Category"] = "Diamantes"
    },
    ["bluecard"] = {
        ["Price"] = 1500,
        ["Discount"] = 0.98,
        ["Category"] = "Diamantes"
    },
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ROLEITENS
-----------------------------------------------------------------------------------------------------------------------------------------
RoleItens = {
    ["Free"] = {
        {["Amount"] = 1000, ["Item"] = "dollars"},
        {["Amount"] = 1000, ["Item"] = "dollars"},
        {["Amount"] = 1000, ["Item"] = "dollars"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "weaponkey"},
        {["Amount"] = 1000, ["Item"] = "dollars"},
        {["Amount"] = 1250, ["Item"] = "dollars"},
        {["Amount"] = 1500, ["Item"] = "dollars"},
        {["Amount"] = 1750, ["Item"] = "dollars"},
        {["Amount"] = 1, ["Item"] = "warfarin"},
        {["Amount"] = 3, ["Item"] = "bandage"},
        {["Amount"] = 3, ["Item"] = "analgesic"},
        {["Amount"] = 5, ["Item"] = "gauze"},
        {["Amount"] = 1, ["Item"] = "medicalkey"},
        {["Amount"] = 1, ["Item"] = "utilkey"},
        {["Amount"] = 3, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "advtoolbox"},
        {["Amount"] = 1, ["Item"] = "adrenalineplus"},
        {["Amount"] = 100, ["Item"] = "plastic"},
        {["Amount"] = 100, ["Item"] = "glass"},
        {["Amount"] = 100, ["Item"] = "rubber"},
        {["Amount"] = 100, ["Item"] = "aluminum"},
        {["Amount"] = 100, ["Item"] = "copper"},
        {["Amount"] = 275, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 325, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 375, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 1, ["Item"] = "television"},
        {["Amount"] = 1, ["Item"] = "safependrive"},
        {["Amount"] = 1, ["Item"] = "goldenjug"}
    },
    ["Premium"] = {
        {["Amount"] = 2500, ["Item"] = "dollars"},
        {["Amount"] = 2750, ["Item"] = "dollars"},
        {["Amount"] = 3000, ["Item"] = "dollars"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 1, ["Item"] = "toolbox"},
        {["Amount"] = 3, ["Item"] = "toolbox"},
        {["Amount"] = 3, ["Item"] = "toolbox"},
        {["Amount"] = 2500, ["Item"] = "dollars"},
        {["Amount"] = 2750, ["Item"] = "dollars"},
        {["Amount"] = 3000, ["Item"] = "dollars"},
        {["Amount"] = 1, ["Item"] = "backpackp"},
        {["Amount"] = 3, ["Item"] = "adrenaline"},
        {["Amount"] = 3, ["Item"] = "diagram"},
        {["Amount"] = 3, ["Item"] = "diagram"},
        {["Amount"] = 225, ["Item"] = "plastic"},
        {["Amount"] = 225, ["Item"] = "glass"},
        {["Amount"] = 225, ["Item"] = "rubber"},
        {["Amount"] = 225, ["Item"] = "aluminum"},
        {["Amount"] = 225, ["Item"] = "copper"},
        {["Amount"] = 625, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 725, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 825, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 928, ["Item"] = "blueprint_fragment"},
        {["Amount"] = 1, ["Item"] = "goldenleopard"},
        {["Amount"] = 1, ["Item"] = "goldenlion"},
        {["Amount"] = 1, ["Item"] = "blueprint_bench"},
        {["Amount"] = 1, ["Item"] = "goldenjug"},
        {["Amount"] = 1, ["Item"] = "moneywash"}
    }
}