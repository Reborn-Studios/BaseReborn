-- Czech
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Tuto animaci nelze přehrát ve vozidle.",
        male_only = "Tento emote je pouze pro muže, omlouváme se!",
        not_valid_emote = "%{name} není platný emote.",
        not_valid_dance = "%{name} není platný tanec.",
        not_valid_shared_emote = "%{name} není sdílený emote.",
        emote_menu_cmd = "Pomocí příkazu /emotemenu otevřete nabídku animací.",
        no_cancel = "Žádný emote pro zrušení.",
        invalid_variation = "Neplatná varianta textury. Platné volby jsou: Varianty: %{str}",
        nobody_close = "Nikdo není nablízku",
        sent_request_to = "Hráči jménem %{pname} jste poslali žádost o přehrání výrazu s názvem %{ename}.",
        refuse_emote = "Žádost byla zamítnuta.",
        do_you_wanna = "~y~Y~w~ Přijmout, ~r~L~w~ Odmítnout (~g~%{emote}~w~)"
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
        pee = "Podržte G, abyste se vyčůrali.",
        firework = "Chcete-li použít ohňostroj, stiskněte ~y~G~w~.",
        camera = "Chcete-li použít blesk fotoaparátu, stiskněte tlačítko ~y~G~w~.",
        poop = "Stiskněte ~y~G~w~ pro kakání",
        puke = "Stiskněte ~y~G~w~ pro zvracení",
        spraychamp = "Podržte ~y~G~w~ pro stříkání šampaňského.",
        useleafblower = "Chcete-li použít foukač listí, stiskněte tlačítko ~y~G~w~.",
        vape = "Pro vapování stiskněte ~y~G~w~.",
        makeitrain = "Stisknutím tlačítka ~y~G~w~ vyvoláte déšť.",
        stun = "Stisknutím tlačítka ~y~G~w~ použijete paralyzér."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})