-- Polish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Nie można odtworzyć tej animacji w pojeździe.",
        male_only = "Ta emotka jest tylko dla mężczyzn, przepraszamy!",
        not_valid_emote = "%{name} nie jest prawidłową emotką.",
        not_valid_dance = "%{name} nie jest prawidłowym tańcem.",
        not_valid_shared_emote = "%{name} nie jest emotką współdzieloną.",
        emote_menu_cmd = "Użyj komendy /emotemenu, aby otworzyć menu animacji.",
        no_cancel = "Brak emotki do anulowania.",
        invalid_variation = "Nieprawidłowa odmiana tekstury. Prawidłowe wybory to: %{str}",
        nobody_close = "Nikt nie jest wystarczająco blisko.",
        sent_request_to = "Wysłano żądanie do %{pname}, nazwa animacji to %{ename}.",
        refuse_emote = "Emote odmówił.",
        do_you_wanna = "~y~Y~w~ zaakceptować, ~r~L~w~ odmówić (~g~%{emote}~w~)"
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
        pee = "Przytrzymaj G, aby się wysikać.",
        firework = "Naciśnij ~y~G~w~, aby użyć fajerwerków",
        camera = "Naciśnij ~y~G~w~, aby użyć lampy błyskowej aparatu.",
        poop = "Naciśnij ~y~G~w~ by zrobić kupę",
        puke = "Naciśnij ~y~G~w~ by zwymiotować",
        spraychamp = "Przytrzymaj ~y~G~w~, aby rozpylić szampana",
        useleafblower = "Naciśnij ~y~G~w~, aby użyć dmuchawy do liści.",
        vape = "Naciśnij ~y~G~w~, aby waporyzować.",
        makeitrain = "Naciśnij ~y~G~w~, aby wywołać deszcz.",
        stun = "Naciśnij ~y~G~w~, aby 'użyć' paralizatora."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})