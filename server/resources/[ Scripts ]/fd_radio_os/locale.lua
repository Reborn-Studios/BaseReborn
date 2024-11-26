Locale = {
    ui = {
        ["go_back"] = "Voltar",
        ["call_sign"] = "Código de Identificação",
        ["call_sign_placeholder"] = "ex.: 333",
        ["name_input"] = "Nome",
        ["name_input_placeholder"] = "ex.: Novato",
        ["button_save"] = "Salvar",
        ["lock_button"] = "Travar",
        ["unlock_button"] = "Destravar",
        ["locked_status"] = "Travado",
        ["unlocked_status"] = "Destravado",
        ["channel_is"] = "Canal está",
        ["invite_user"] = "Convidar (ID do Usuário)",
        ["invite_button"] = "Convidar",
        ["channel"] = "Canal",
        ["show_list"] = "Mostrar Lista",
        ["change_signs"] = "Mudar Códigos",
        ["lock_channel"] = "Travar Canal",
        ["settings"] = "Configurações",
        ["change_button"] = "Alterar",
        ["disconnect"] = "Desconectar",
        ["toggle_frame_movement"] = "Alternar movimento do quadro",
        ["color"] = "Cor",
        ["size"] = "Tamanho",
        ["volume"] = "Volume",
        ["press_enter_to_connect"] = "Pressione Enter para conectar",
        ["turn_on_off"] = "Ligar/Desligar",
        ["volume_up"] = "Aumentar Volume",
        ["volume_down"] = "Diminuir Volume",
        ["unknown"] = "Desconhecido",
        ["color_black"] = "Preto",
        ["color_white"] = "Branco",
        ["color_blue"] = "Azul",
        ["color_green"] = "Verde",
        ["color_red"] = "Vermelho",
        ["color_yellow"] = "Amarelo",
        ["radio_list"] = "Rádio",
        ["enable_external_list"] = "Mostrar lista externa",
        ["disable_external_list"] = "Ocultar lista externa"
    },
    to_close_to_other_jammer = "Você está muito perto de outro jammer.",
    press_to_destroy = "Pressione [E] para destruir o jammer",
    press_to_pickup = "Pressione [E] para pegar o jammer",
    destroy_jammer = "Destruir jammer",
    pick_up_jammer = "Pegar jammer",
    joined_to_radio = 'Você está conectado a: %sMhz.',
    invalid_radio = 'Esta frequência não está disponível.',
    you_on_radio = 'Você já está conectado a este canal!',
    restricted_channel_error = 'Você não pode se conectar a este sinal!',
    you_leave = 'Você saiu do canal.',
    open_radio = 'Abrir rádio',
    open_radio_list = 'Abrir lista rápida de rádio',
    radio_cannot_be_unlocked = "O rádio não pode ser destravado.",
    radio_unlocked = "Rádio destravado",
    radio_cannot_be_locked = "O rádio não pode ser travado.",
    radio_locked = "Rádio travado.",
    radio_cannot_invite = "Não é possível convidar para este rádio.",
    radio_invited = "Convidado para o rádio.",
    increase_radio_volume = 'O rádio já está no volume mais baixo',
    volume_radio = 'Novo volume do rádio %s.',
    decrease_radio_volume = 'O rádio já está no volume máximo',
    size_updated = "Tamanho do quadro atualizado!",
    frame_updated = "Cor atualizada!",
    position_updated = "Posição do quadro atualizada!",
    signs_updated = "Códigos atualizados!"
}


setmetatable(Locale, {
    __index = function(self, key)
        if rawget(self, key) == nil then
            return ('Unknown key: %s'):format(key)
        end

        return rawget(self, key)
    end
})
