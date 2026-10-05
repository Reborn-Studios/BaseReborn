Config = {}

Config.Main = {

    -- AUTENTICAÇÂO DA BASE OU DO SCRIPT? (true = base, false = script)
    baseVersion = true,

    cmd = 'painelfac',
    -- Comando usado pelos jogadores para abrir o painel da organização

    cmdAdm = 'paineladm',
    -- Comando exclusivo para abrir o painel administrativo

    createAutomaticOrganizations = true,
    -- Se ativado, as organizações da configuração serão criadas automaticamente no banco de dados

    serverLogo = 'https://files.catbox.moe/7pffdk.png',
    -- Logo do servidor exibido no topo da interface do painel enquanto não definido pela facção

    itemImagesUrl = 'https://api.rebornsystem.com.br/imagens/',

    blackList = 3,
    -- Quantidade de dias que o jogador ficará na blacklist
    -- após ser demitido de uma organização

    clearChestLogs = 15,
    -- Intervalo (em dias) para limpeza automática dos logs do baú
    -- Ajuda a evitar acúmulo excessivo de dados no banco
}

Config.Permissions = {
    adminPanel = 'admin.permissao',
    removeBlacklist = 'admin.permissao',
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
