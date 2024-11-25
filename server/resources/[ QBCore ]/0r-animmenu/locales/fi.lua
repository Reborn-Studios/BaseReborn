-- Finnish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Et voi toistaa tätä animaatiota ajoneuvossa ollessasi.",
        male_only = "Tämä hymiö on vain miehille, anteeksi!",
        not_valid_emote = "%{name} ei ole kelvollinen emote.",
        not_valid_dance = "%{name} ei ole kelvollinen tanssi.",
        not_valid_shared_emote = "%{name} ei ole jaettu emote.",
        emote_menu_cmd = "Avaa animaatiovalikko komennolla /emotemenu.",
        no_cancel = "Peruuttaminen ei ole mahdollista.",
        invalid_variation = "Tekstuurin vaihtelu on virheellinen. Kelvolliset valinnat ovat: %{str}",
        nobody_close = "Kukaan ei ole tarpeeksi lähellä.",
        sent_request_to = "Lähetetty pyyntö %{pname}:lle, animaation nimi on %{ename}.",
        refuse_emote = "Emote kieltäytyi.",
        do_you_wanna = "~y~Y~w~ hyväksyä, ~r~L~w~ kieltäytyä (~g~%{emote}~w~)."
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
        pee = "Pidä G:tä pissalla.",
        firework = "Paina ~y~G~w~ käyttääksesi ilotulitusta...",
        camera = "Paina ~y~G~w~ käyttääksesi kameran salamaa.",
        poop = "Kakkaa painamalla ~y~G~w~",
        puke = "Paina ~y~G~w~ oksennuttaaksesi",
        spraychamp = "Pidä ~y~G~w~ suihkuttaaksesi samppanjaa -",
        useleafblower = "Paina ~y~G~w~ käyttääksesi lehtipuhallinta.",
        vape = "Hengitä painamalla ~y~G~w~.",
        makeitrain = "Paina ~y~G~w~ saadaksesi sen satamaan.",
        stun = "Paina ~y~G~w~ 'käyttääksesi' tainnutusasetta."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})