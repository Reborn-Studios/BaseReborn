Config.Groups = {
    ['Hospital'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {
                    ['warfarin'] = 50, -- Quantidade padrao da recompensa
                    ['bandage'] = 5, -- Quantidade padrao da recompensa
                }
            }
        },

        List = {
            ['Diretor'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 6000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Medico'] = {
                prefix = 'Medico',
                tier = 2,
                salary = 5500,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Enfermeiro'] = {
                prefix = 'Enfermeiro',
                tier = 3,
                salary = 5000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Paramedico'] = {
                prefix = 'Paramedico',
                tier = 4,
                salary = 3000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Bennys'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['BennysLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 7000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['BennysGerente'] = {
                prefix = 'Gerente',
                tier = 2,
                salary = 5500,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Bennys'] = {
                prefix = 'Membro',
                tier = 3,
                salary = 5000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Mecanico'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['MecanicoLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 1000,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['MecanicoGerente'] = {
                prefix = 'Gerente',
                tier = 2,
                salary = 500,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Mecanico'] = {
                prefix = 'Mecânico',
                tier = 3,
                salary = 250,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Cassino'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['CassinoLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Cassino'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Motoclub'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['MotoclubLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Motoclub'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Milicia'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['MiliciaLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Milicia'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Bahamas'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['BahamasLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Bahamas'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Mafia'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['MafiaLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Mafia'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Vanilla'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['VanillaLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Vanilla'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Verdes'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['VerdesLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Verdes'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Vermelhos'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['VermelhosLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Vermelhos'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
    ['Azuis'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {}
            }
        },

        List = {
            ['AzuisLider'] = {
                prefix = 'Líder',
                tier = 1,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
            ['Azuis'] = {
                prefix = 'Membro',
                tier = 2,
                salary = 0,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
}