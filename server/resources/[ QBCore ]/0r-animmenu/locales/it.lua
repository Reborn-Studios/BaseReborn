-- Italian
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Non è possibile riprodurre questa animazione mentre si è a bordo di un veicolo.",
        male_only = "Questa emote è solo maschile, mi dispiace!",
        not_valid_emote = "%{name} non è un'emote valida.",
        not_valid_dance = "%{name} non è un ballo valido.",
        not_valid_shared_emote = "%{name} non è un'emote condivisa.",
        emote_menu_cmd = "Usare il comando /emotemenu per aprire il menu delle animazioni.",
        no_cancel = "Nessuna emote da annullare.",
        invalid_variation = "Variazione di texture non valida. Le selezioni valide sono: %{str}",
        nobody_close = "Nessuno si avvicina abbastanza.",
        sent_request_to = "Richiesta inviata a %{pname}, il nome dell'animazione è %{ename}.",
        refuse_emote = "Emote ha rifiutato.",
        do_you_wanna = "~y~Y~w~ per accettare, ~r~L~w~ per rifiutare (~g~%{emote}~w~)"
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
        pee = "Tenere premuto G per fare pipì",
        firework = "Premete ~y~G~w~ per usare il fuoco d'artificio",
        camera = "Premere ~y~G~w~ per utilizzare il flash della fotocamera",
        poop = "Premere ~y~G~w~ per fare la cacca",
        puke = "Premere ~y~G~w~ per vomitare",
        spraychamp = "Tenere premuto ~y~G~w~ per spruzzare lo champagne",
        useleafblower = "PPremere ~y~G~w~ per utilizzare il soffiatore di foglie",
        vape = "Premere ~y~G~w~ per svapare",
        makeitrain = "Premere ~y~G~w~ per far piovere",
        stun = "Premere ~y~G~w~ per usare la pistola stordente"
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})