Config.Groups = {
    ['Mecanico'] = {
        Config = {
            Salary = {
                active = true, -- Se vai estar ativo ou nao
                time = 60, -- Tempo em minutos para receber o pagamento
                enableRegistry = true -- Se vai registrar o pagamento no extrato bancário da org
            },

            Goals = { -- METAS (Pode ser ajustado pelo lider)
                defaultReward = 500, -- Valor padrao da recompensa
                itens = {
                    ['dollars'] = 50, -- Quantidade padrao da recompensa
                    ['water'] = 5, -- Quantidade padrao da recompensa
                }
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
            ['Lavador'] = {
                prefix = 'Lavador',
                tier = 4,
                salary = 100,
                roleId = '' -- ID DO CARGO NO DISCORD
            },
        }
    },
}