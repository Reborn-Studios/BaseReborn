Config = {}

Config.Main = {
    cmd = 'painelfac',
    -- Comando usado pelos jogadores para abrir o painel da organização

    cmdAdm = 'paineladm',
    -- Comando exclusivo para abrir o painel administrativo

    createAutomaticOrganizations = true,
    -- Se ativado, as organizações da configuração serão criadas automaticamente no banco de dados

    serverLogo = 'https://files.catbox.moe/tpdqz8.png',
    -- Logo do servidor exibido no topo da interface do painel enquanto não definido pela facção

    blackList = 3,
    -- Quantidade de dias que o jogador ficará na blacklist
    -- após ser demitido de uma organização

    clearChestLogs = 15,
    -- Intervalo (em dias) para limpeza automática dos logs do baú
    -- Ajuda a evitar acúmulo excessivo de dados no banco
}

-- ==============================================================
-- CONFIGURAÇÕES DO DISCORD (Sistema de Sincronização de Cargos)
-- ==============================================================

Config.Discord = {
    enabled = false, -- Se o sistema de Discord está ativado
    debug = false, -- Se ativado, exibe logs de debug no console do servidor
    botToken = 'SEU TOKEN AQUI', -- TOKEN DO BOT DO DISCORD
    serverId = 'SEU SERVER ID AQUI', -- ID DO SERVIDOR DO DISCORD
}

-- ==============================================================
-- PERMISSÕES PADRÃO DOS CARGOS
-- ==============================================================

-- Essas permissões servem como base para todos os cargos dentro das organizações.
-- Elas podem ser ativadas ou desativadas individualmente
-- pelo painel ou por configurações específicas da facção.

Config.defaultPermissions = {
    invite = {
        name = "Convidar",
        description = "Autoriza convidar novos jogadores para a organização."
    },

    promote = {
        name = "Promover",
        description = "Autoriza promover membros para cargos superiores."
    },

    demote = {
        name = "Rebaixar",
        description = "Autoriza rebaixar membros para cargos inferiores."
    },

    dismiss = {
        name = "Demitir",
        description = "Autoriza remover membros da organização, aplicando blacklist."
    },

    withdraw = {
        name = "Sacar dinheiro",
        description = "Autoriza retirar dinheiro do banco da organização."
    },

    deposit = {
        name = "Depositar dinheiro",
        description = "Autoriza adicionar dinheiro ao banco da organização."
    },

    message = {
        name = "Escrever anotações",
        description = "Autoriza criar e editar anotações internas da organização."
    },

    alerts = {
        name = "Enviar alertas",
        description = "Autoriza enviar alertas para todos os membros online."
    },
}


-- ===================================================================
-- ====================== EXPORT: LOG DO BAÚ =========================
-- ===================================================================
--[[
    Como usar o export para registrar ações no baú da organização:

    Parâmetros:
        user_id : number  -> ID permanente do jogador
        action  : string  -> "deposit" (depositou)
        item    : string  -> Nome/spawn do item (ex: "water", "weed")
        amount  : number  -> Quantidade do item movimentado

    Exemplo de uso (no seu sistema de inventário):
        exports.ld_orgs_v2:addLogChest(user_id, "deposit", "coca_leaf", 100)
]]

-- ===================================================================
-- =================== EXPORT: METAS DIÁRIAS =========================
-- ===================================================================
--[[
    Como usar o export para registrar progresso nas metas diárias:

    Esse export deve ser chamado sempre que o jogador:
        - Guardar itens no armazém da organização
        - Farmar/coletar itens que contam para metas

    Parâmetros:
        user_id : number  -> ID permanente do jogador
        item    : string  -> Nome/spawn do item que conta para a meta (ex: "coca_leaf", "meth")
        amount  : number  -> Quantidade processada/farmada

    Exemplo de uso:
        exports.ld_orgs_v2:addGoal(user_id, "coca_leaf", 50)
        exports.ld_orgs_v2:addGoal(user_id, "meth", 10)
]]
