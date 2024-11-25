-- French
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Vous ne pouvez pas jouer cette animation lorsque vous êtes dans un véhicule.",
        male_only = "Cette emote est réservée aux hommes, désolé!",
        not_valid_emote = "%{name} n'est pas une emote valide.",
        not_valid_dance = "%{name} n'est pas une danse valide.",
        not_valid_shared_emote = "%{name} n'est pas une emote partagée.",
        emote_menu_cmd = "Utilisez la commande /emotemenu pour ouvrir le menu des animations.",
        no_cancel = "Pas d'emote à annuler.",
        invalid_variation = "Variation de texture non valide. Les sélections valides sont les suivantes: %{str}",
        nobody_close = "Personne n'est assez proche.",
        sent_request_to = "Envoi d'une requête à %{pname}, le nom de l'animation est %{ename}.",
        refuse_emote = "Emote a refusé.",
        do_you_wanna = "~y~Y~w~ d'accepter, ~r~L~w~ refuser (~g~%{emote}~w~)"
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
        pee = "Tenez G pour faire pipi.",
        firework = "Appuyez sur ~y~G~w~ pour utiliser le feu d'artifice",
        camera = "Appuyez sur ~y~G~w~ pour utiliser le flash de l'appareil photo.",
        poop = "Appuyer sur ~y~G~w~ pour faire caca",
        puke = "Appuyer sur ~y~G~w~ pour vomir",
        spraychamp = "Tenez ~y~G~w~ pour arroser le champagne",
        useleafblower = "Appuyez sur ~y~G~w~ pour utiliser le souffleur de feuilles.",
        vape = "Appuyez sur ~y~G~w~ pour vaper.",
        makeitrain = "Appuyez sur ~y~G~w~ pour faire pleuvoir.",
        stun = "Appuyez sur ~y~G~w~ pour utiliser le pistolet paralysant."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})