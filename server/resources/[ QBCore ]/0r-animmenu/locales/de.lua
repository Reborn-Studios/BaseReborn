-- Deutsch
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Sie können diese Animation im Fahrzeug nicht abspielen.",
        male_only = "Dieses Emote ist nur für Männer, sorry!",
        not_valid_emote = "%{name} ist kein gültiges Emote.",
        not_valid_dance = "%{name} ist kein gültiger Tanz.",
        not_valid_shared_emote = "%{name}  ist kein gemeinsames Emote.",
        emote_menu_cmd = "Verwenden Sie den Befehl /emotemenu, um das Animationsmenü zu öffnen.",
        no_cancel = "Kein Emote zum Abbrechen.",
        invalid_variation = "Ungültige Texturvariante. Gültige Auswahlen sind: %{str}",
        nobody_close = "Niemand ist ~r~close~w~ genug.",
        sent_request_to = "Anfrage an %{pname} gesendet, Animationsname ist %{ename}.",
        refuse_emote = "Emote abgelehnt.",
        do_you_wanna = "~y~Y~w~ zu akzeptieren, ~r~L~w~ abzulehnen (~g~%{emote}~w~)"
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
        pee = "Halten Sie G zum Pinkeln.",
        firework = "Drücken Sie ~y~G~w~, um das Feuerwerk zu benutzen",
        camera = "Drücken Sie ~y~G~w~, um den Kamerablitz zu verwenden.",
        poop = "Drücke ~y~G~w~ zum Kacken",
        puke = "Drücken Sie ~y~G~w~ zum Kotzen",
        spraychamp = "Halten Sie ~y~G~w~, um Champagner zu versprühen",
        useleafblower = "Drücken Sie ~y~G~w~, um den Laubbläser zu verwenden.",
        vape = "Drücken Sie ~y~G~w~ zum Dampfen.",
        makeitrain = "Drücke ~y~G~w~, um es regnen zu lassen.",
        stun = "Drücken Sie ~y~G~w~, um die Betäubungspistole zu benutzen. rain."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})