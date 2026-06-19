Lang = {}

Lang.Brand = 'REBORN'

Lang.Messages = {
    -- ===== Som / Bluetooth =====
    sound_on              = 'Status do som: Ligado',
    sound_off             = 'Status do som: Desligado',
    sound_blocked_here    = 'Som desativado neste local.',
    bt_not_paired         = 'Bluetooth não está pareado. Use /som para parear.',
    bt_no_bike            = 'Bluetooth não é permitido em motos ou bicicletas.',
    bt_disabled_bike      = 'Bluetooth desativado: motos e bicicletas não suportam pareamento.',
    bt_change_blocked_dj  = 'Não é permitido alterar o modo de Bluetooth enquanto conectado à mesa.',

    -- ===== Modo Streamer =====
    streamer_on           = 'Modo Streamer: ATIVADO',
    streamer_off          = 'Modo Streamer: DESATIVADO',
    streamer_active_menu  = 'Modo Streamer ativo: não é possível usar a música',
    streamer_active_sound = 'Modo Streamer ativo: som desativado',

    -- ===== Volume pessoal =====
    volume_usage          = 'Use: /volume <0-100>',
    volume_set            = 'Seu volume de música foi ajustado para %s%%',

    -- ===== Permissão =====
    no_permission         = 'Você não tem permissão para usar este comando.',

    -- ===== Mesa DJ =====
    dj_too_far            = 'Você está muito longe da mesa DJ! Máximo de 10 metros.',
    dj_in_use             = 'Essa mesa está em uso no momento.',
    dj_place_speaker      = 'Coloque o speaker no chão para conectar à mesa.',
    dj_connected          = 'Conectado na mesa de DJ: %s',
    dj_disconnected       = 'Desconectado da mesa de DJ',
    dj_no_permission      = 'Você não tem permissão para usar esta mesa de DJ.',
    dj_not_found          = 'Mesa DJ não encontrada',
    user_check_error      = 'Erro ao verificar usuário',

    -- ===== Playlists =====
    playlist_deleted        = 'Playlist deletada com sucesso.',
    playlist_delete_error   = 'Erro ao deletar playlist.',
    playlist_music_removed  = 'Música removida da playlist.',
    playlist_remove_error   = 'Erro ao remover música da playlist.',
    playlist_invalid_data   = 'Dados inválidos.',
    playlist_not_found      = 'Playlist não encontrada ou não pertence a você!',
    playlist_video_exists   = 'O vídeo já está na playlist!',
    playlist_video_added    = 'Vídeo adicionado à playlist com sucesso!',
    playlist_imported       = 'Playlist importada com %s música(s)!',
    playlist_import_error   = 'Erro ao importar playlist.',
    playlist_share_created  = 'Código de compartilhamento gerado!',
    playlist_share_error    = 'Não foi possível gerar o código.',
    playlist_share_invalid  = 'Código inválido ou expirado.',
    -- ===== Admin =====
    admin_no_permission   = 'Você não tem permissão para acessar o painel administrativo.',
    admin_saved           = 'Configurações salvas com sucesso.',
    admin_save_error      = 'Não foi possível salvar as configurações.',
    admin_restored        = 'Valores restaurados para o último estado salvo.',
    ui_reset              = 'Posição da interface restaurada ao centro.',
    ui_reset_player       = 'Posição da interface do jogador %s restaurada.',
    player_not_found      = 'Jogador não encontrado.',
}

function Lang.get(key, ...)
    local msg = Lang.Messages[key]
    if not msg then
        return key
    end

    if select('#', ...) > 0 then
        local ok, formatted = pcall(string.format, msg, ...)
        if ok then
            return formatted
        end
    end

    return msg
end

if IsDuplicityVersion() then
    function LangNotify(target, ntype, key, ...)
        if not target then return end
        TriggerClientEvent('Notify', target, ntype, Lang.get(key, ...))
    end
else
    function LangNotify(ntype, key, ...)
        TriggerEvent('Notify', ntype, Lang.get(key, ...))
    end
end
