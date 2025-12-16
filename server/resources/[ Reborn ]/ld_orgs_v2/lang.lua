Config.Langs = {
    ['offlinePlayer'] = function(source)
        notify(source, "negado", "Este jogador não está online.", 5000)
    end,

    ['alreadyFaction'] = function(source)
        notify(source, "negado", "Este jogador já está em uma organização.", 5000)
    end,

    ['alreadyBlacklist'] = function(source)
        notify(source, "negado", "Você está na blacklist e não pode receber convites.", 5000)
    end,

    ['alreadyUserBlacklist'] = function(source)
        notify(source, "negado", "Este jogador está na blacklist.", 5000)
    end,

    ['sendInvite'] = function(source)
        notify(source, "sucesso", "Você enviou o convite.", 5000)
    end,

    ['acceptInvite'] = function(source)
        notify(source, "sucesso", "Você aceitou o convite.", 5000)
    end,

    ['acceptedInvite'] = function(source, ply_id)
        notify(source, "sucesso", "O jogador ID " .. ply_id .. " aceitou o convite.", 5000)
    end,

    ['bestTier'] = function(source)
        notify(source, "negado", "Você não pode fazer isso com alguém de cargo igual ou superior ao seu.", 5000)
    end,

    ['youPromoved'] = function(source)
        notify(source, "sucesso", "Você foi promovido.", 5000)
    end,

    ['youPromovedUser'] = function(source, ply_id, group)
        notify(source, "sucesso", "Você promoveu o ID " .. ply_id .. " para " .. group .. ".", 5000)
    end,

    ['youDemote'] = function(source)
        notify(source, "sucesso", "Você foi rebaixado.", 5000)
    end,

    ['youDemoteUser'] = function(source, ply_id, group)
        notify(source, "sucesso", "Você rebaixou o ID " .. ply_id .. " para " .. group .. ".", 5000)
    end,

    ['youDismiss'] = function(source)
        notify(source, "sucesso", "Você foi demitido da organização.", 5000)
    end,

    ['youDismissUser'] = function(source, ply_id)
        notify(source, "sucesso", "Você demitiu o ID " .. ply_id .. ".", 5000)
    end,

    ['waitCooldown'] = function(source)
        notify(source, "negado", "Aguarde o cooldown para realizar esta ação.", 5000)
    end,

    ['bankNotMoney'] = function(source)
        notify(source, "negado", "O banco da organização não possui essa quantia.", 5000)
    end,

    ['rewardedGoal'] = function(source, amount)
        notify(source, "sucesso", "Você resgatou a meta diária e recebeu <b>R$ " .. amount .. "</b>.", 5000)
    end,

    ['notPermission'] = function(source)
        notify(source, "negado", "Você não possui permissão para isso.", 5000)
    end,

    ['notMoneyDeposit'] = function(source)
        notify(source, "negado", "Você não possui dinheiro suficiente para depositar.", 5000)
    end,

    -- === METAS DIÁRIAS ===
    ['incompleteGoals'] = function(source)
        notify(source, "negado", "Você ainda não concluiu todas as metas obrigatórias.", 5000)
    end,

    ['alreadyRedeemed'] = function(source)
        notify(source, "negado", "Você já resgatou a recompensa da meta diária hoje.", 5000)
    end,

    ['noGoalsToday'] = function(source)
        notify(source, "negado", "Você não possui metas registradas hoje.", 5000)
    end,

    ['noGoalsConfig'] = function(source)
        notify(source, "negado", "Sua organização não possui metas configuradas.", 5000)
    end,
}

if SERVER then
    function notify(source, type, message, duration)
        TriggerClientEvent("Notify", source, type, message, duration or 5000)
    end
else
    function notify(type, message, duration)
        TriggerEvent("Notify", type, message, duration or 5000)
    end
end