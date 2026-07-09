local Translations = {
    menu = {
        title = "Menu Animacji",
        description = "Tutaj możesz zarządzać wszystkimi animacjami serwera.",
        search_placeholder = "Szukaj po tytule, nazwie",
        all_animations = "Wszystkie Animacje",
        quick_animations = "Szybkie Animacje",
        quick = "SZYBKIE",
        animations = "ANIMACJE",
        animations_number = "animacje",
        modern = "Nowoczesny",
        compact = "Kompaktowy",
        show_categories = "Pokaż Kategorie",
        hide_categories = "Ukryj Kategorie",
        prop_options = "Opcje Rekwizytów",
        left_hand = "Lewa Ręka",
        right_hand = "Prawa Ręka",
        keybinds = "Skróty Klawiszowe",
        your_keybinds = "Twoje Skróty",
        keybind_for = "Skrót dla:",
        update_key = "Zaktualizuj Klawisz",
        save = "Zapisz",
        cancel = "Anuluj"
    },
    notifications = {
        request_cancelled = "Prośba anulowana.",
        request_timed_out = "Upłynął limit czasu prośby.",
        no_players_nearby = "Brak graczy w pobliżu.",
        no_emote_to_cancel = "Brak animacji do anulowania.",
        quick_slot_empty = "Brak animacji na slocie %{slot}.",
        waiting_for_a_decision = "Oczekiwanie na decyzję. Anuluj",
        already_playing_anim = "Już odtwarzasz animację.",
        walk_style_is_set_default = "Twój styl chodzenia ustawiono na domyślny.",
        just_animals = "Tylko postacie zwierzęce mogą używać tej animacji."
    },
    categories = {
        all = "Wszystkie",
        favorites = "Ulubione",
        general = "Ogólne",
        extra = "Domyślne GTA",
        dances = "Tańce",
        expressions = "Miny",
        walks = "Chód",
        placedemotes = "Pozycje",
        syncedemotes = "Wspólne",
        propemotes = "Rekwizyty",
        erpemotes = "ERP",
        animalemotes = "Zwierzęce",
        gang = "Gang"
    },
    keybinds = {
        toggle_point_description = "Przełącz wskazywanie",
        ragdoll_description = "Ragdoll",
        play_quick_emote = "Odtwórz szybką emotkę"
    },
    animations = {
        smoke = "Naciśnij ~y~G~w~, aby palić.",
        vape = "Naciśnij ~y~G~w~, aby vapować.",
        cut = "Naciśnij ~y~G~w~, aby ciąć",
        makeitrain = "Naciśnij ~y~G~w~, aby sypać kasą.",
        camera = "Naciśnij ~y~G~w~, aby użyć flesza.",
        spraychamp = "Przytrzymaj ~y~G~w~, aby oblewać szampanem",
        useleafblower = "Naciśnij ~y~G~w~, aby użyć dmuchawy.",
        poop = "Naciśnij ~y~G~w~, aby zrobić kupę",
        puke = "Naciśnij ~y~G~w~, aby wymiotować",
        firework = "Naciśnij ~y~G~w~, aby odpalić fajerwerki",
        pee = "Przytrzymaj ~y~G~w~, aby sikać.",
        stun = "Naciśnij ~y~G~w~, aby 'użyć' paralizatora",
        candle = "Naciśnij ~y~G~w~, aby zapalić świeczkę"
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})