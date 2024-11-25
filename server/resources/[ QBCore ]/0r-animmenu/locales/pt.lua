-- Brazilian Portuguese
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Não é possível reproduzir essa animação enquanto estiver em um veículo.",
        male_only = "Esse emote é apenas para homens, desculpe!",
        not_valid_emote = "%{name} não é um emote válido.",
        not_valid_dance = "%{name} não é uma dança válida.",
        not_valid_shared_emote = "%{name} não é um emote compartilhado.",
        emote_menu_cmd = "Use o comando /emotemenu para abrir o menu de animações.",
        no_cancel = "Não há emote para cancelar.",
        invalid_variation = "Nenhum emote para cancelar.Variação de textura inválida. As seleções válidas são: %{str}",
        nobody_close = "Ninguém se aproxima o suficiente.",
        sent_request_to = "Solicitação enviada para %{pname}, o nome da animação é %{ename}.",
        refuse_emote = "O Emote recusou.",
        do_you_wanna = "~y~Y~w~ para aceitar, ~r~L~w~ para recusar (~g~%{emote}~w~)"
    },
    categories = {
        all = "All",
        favorites = "Favorites",
        general = "General",
        dances = "Dances",
        expressions = "Expressions",
        walks = "expressions",
        placedemotes = "Placed",
        syncedemotes = "Shared",
    },
    ptfxInfos = {
        pee = "Segure G para fazer xixi.",
        firework = "Pressione ~y~G~w~ para usar o fogo de artifício",
        camera = "Pressione ~y~G~w~ para usar o flash da câmera.",
        poop = "Pressione ~y~G~w~ para fazer cocô",
        puke = "Pressione ~y~G~w~ para vomitar",
        spraychamp = "Segure ~y~G~w~ para borrifar champanhe",
        useleafblower = "Pressione ~y~G~w~ para usar o soprador de folhas.",
        vape = "Pressione ~y~G~w~ para vaporizar.",
        makeitrain = "Pressione ~y~G~w~ para fazer chover.",
        stun = "Pressione ~y~G~w~ para usar a arma de choque."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})