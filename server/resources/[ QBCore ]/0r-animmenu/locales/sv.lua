-- Swedish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Du kan inte spela upp denna animering när du befinner dig i fordonet.",
        male_only = "Denna emote är endast för män, tyvärr!",
        not_valid_emote = "%{name} är inte en giltig emote.",
        not_valid_dance = "%{name} är inte en giltig dans.",
        not_valid_shared_emote = "%{name} är inte en delad emote.",
        emote_menu_cmd = "Använd kommandot /emotemenu för att öppna animationsmenyn.",
        no_cancel = "Ingen emote att avbryta.",
        invalid_variation = "Ogiltig texturvariant. Giltiga val är: %{str}",
        nobody_close = "Ingen ~r~close~w~ tillräckligt.",
        sent_request_to = "Skickade förfrågan till %{pname}, animationsnamn är %{ename}.",
        refuse_emote = "Emote vägrade.",
        do_you_wanna = "~y~Y~w~ att acceptera, ~r~L~w~ att vägra (~g~%{emote}~w~)"
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
        pee = "Håll G för att kissa.",
        firework = "Tryck ~y~G~w~ för att använda fyrverkeriet",
        camera = "Tryck på ~y~G~w~ för att använda kamerans blixt.",
        poop = "Tryck ~y~G~w~ för att bajsa",
        puke = "Tryck ~y~G~w~ för att kräkas",
        spraychamp = "Håll ~y~G~w~ för att spruta champagne",
        useleafblower = "Tryck på ~y~G~w~ för att använda lövblåsen.",
        vape = "Tryck på ~y~G~w~ för att vape.",
        makeitrain = "Tryck på ~y~G~w~ för att få det att regna.",
        stun = "Tryck på ~y~G~w~ för att använda elpistol."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})