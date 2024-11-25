-- Romanian
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Nu puteți reda această animație în timp ce vă aflați în vehicul.",
        male_only = "Acest emote este doar pentru bărbați, îmi pare rău!",
        not_valid_emote = "%{name} nu este un emote valid.",
        not_valid_dance = "%{name} nu este un dans valid.",
        not_valid_shared_emote = "%{name} nu este un emote partajat.",
        emote_menu_cmd = "Utilizați comanda /emotemenu pentru a deschide meniul de animații.",
        no_cancel = "Nu există emote de anulat.",
        invalid_variation = "Variație de textură invalidă. Selecțiile valide sunt: %{str}",
        nobody_close = "Nimeni nu se ~r~aproape~w~ suficient.",
        sent_request_to = "Cerere trimisă către %{pname}, numele animației este %{ename}.",
        refuse_emote = "Emote a refuzat.",
        do_you_wanna = "~y~Y~w~ pentru a accepta, ~r~L~w~ pentru a refuza (~g~%{emote}~w~)"
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
        pee = "Țineți apăsat G pentru a face pipi.",
        firework = "Apăsați ~y~G~w~ pentru a folosi focul de artificii.",
        camera = "Apăsați ~y~G~w~ pentru a utiliza blițul camerei.",
        poop = "Apăsați ~y~G~w~ pentru a face caca",
        puke = "Apăsați ~y~G~w~ pentru a vomita",
        spraychamp = "Țineți apăsat ~y~G~w~ pentru a pulveriza șampanie.",
        useleafblower = "Apăsați ~y~G~w~ pentru a utiliza suflanta de frunze.",
        vape = "Apăsați ~y~G~w~ pentru a trage un fum.",
        makeitrain = "Apăsați ~y~G~w~ pentru a face să plouă.",
        stun = "Apăsați ~y~G~w~ pentru a folosi pistolul paralizant."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})