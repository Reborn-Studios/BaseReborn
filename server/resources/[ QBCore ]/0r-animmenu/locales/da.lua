-- Danish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Du kan ikke afspille denne animation, mens du er i bilen.",
        male_only = "Denne emote er kun til mænd, beklager!",
        not_valid_emote = "%{name} er ikke en gyldig emote.",
        not_valid_dance = "%{name} er ikke en gyldig dans.",
        not_valid_shared_emote = "%{name} er ikke en delt emote.",
        emote_menu_cmd = "Brug kommandoen /emotemenu til at åbne animationsmenuen.",
        no_cancel = "Ingen emote til at annullere.",
        invalid_variation = "Ugyldig tekstur-variation. Gyldige valg er: %{str}",
        nobody_close = "Ingen er tæt nok på.",
        sent_request_to = "Sendte anmodning til %{pname}, animationsnavnet er %{ename}.",
        refuse_emote = "Emote nægtede.",
        do_you_wanna = "~y~Y~w~ at acceptere, ~r~L~w~ at nægte (~g~%{emote}~w~)"
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
        pee = "Hold G for at tisse",
        firework = "Tryk på ~y~G~w~ for at bruge fyrværkeriet",
        camera = "Tryk på ~y~G~w~ for at bruge kameraets blitz.",
        poop = "Tryk på ~y~G~w~ for at skide",
        puke = "Tryk på ~y~G~w~ for at brække dig",
        spraychamp = "Hold ~y~G~w~ for at sprøjte champagne",
        useleafblower = "Tryk på ~y~G~w~ for at bruge løvblæseren.",
        vape = "Tryk på ~y~G~w~ for at vape.",
        makeitrain = "Tryk på ~y~G~w~ for at få det til at regne.",
        stun = "Tryk på ~y~G~w~ for at 'bruge' bedøvelsespistolen."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})