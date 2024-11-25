-- Dutch
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Je kunt deze animatie niet afspelen in een voertuig.",
        male_only = "Deze emote is alleen voor mannen, sorry!",
        not_valid_emote = "%{name} is geen geldige emote.",
        not_valid_dance = "%{name} is geen geldige dans.",
        not_valid_shared_emote = "%{name} is geen gedeelde emote.",
        emote_menu_cmd = "Gebruik het commando /emotemenu om het animatiemenu te openen.",
        no_cancel = "Geen emote om te annuleren.",
        invalid_variation = "Ongeldige textuurvariatie. Geldige selecties zijn: %{str}",
        nobody_close = "Niemand komt dichtbij genoeg.",
        sent_request_to = "Verzoek verzonden naar %{pname}, animatie naam is %{ename}.",
        refuse_emote = "Emote geweigerd.",
        do_you_wanna = "~y~Y~w~ aanvaarden, ~r~L~w~ weigeren (~g~%{emote}~w~)"
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
        pee = "Houd G ingedrukt om te plassen.",
        firework = "Druk op ~y~G~w~ om het vuurwerk te gebruiken",
        camera = "Druk op ~y~G~w~ om de cameraflitser te gebruiken.",
        poop = "Druk op ~y~G~w~ om te poepen",
        puke = "Druk op ~y~G~w~ om te kotsen",
        spraychamp = "Houd ~y~G~w~ ingedrukt om champagne te spuiten.",
        useleafblower = "Druk op ~y~G~w~ om de bladblazer te gebruiken.",
        vape = "Druk op ~y~G~w~ om te vapen.",
        makeitrain = "Druk op ~y~G~w~ om het te laten regenen.",
        stun = "Druk op ~y~G~w~ om het verdovingsgeweer te gebruiken."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})