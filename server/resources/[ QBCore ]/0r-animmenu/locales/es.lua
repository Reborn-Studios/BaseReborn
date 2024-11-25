-- Spanish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "No puedes reproducir esta animación mientras estás en el vehículo.",
        male_only = "Este emote es sólo para hombres, ¡lo siento!",
        not_valid_emote = "%{name} no es un emote válido.",
        not_valid_dance = "%{name} no es un baile válido.",
        not_valid_shared_emote = "%{name} no es una danza compartida válida.",
        emote_menu_cmd = "Utiliza el comando /emotemenu para abrir el menú de animaciones.",
        no_cancel = "No hay emote para cancelar.",
        invalid_variation = "Variación de textura no válida. Las selecciones válidas son: %{str}",
        nobody_close = "Nadie ~r~cerca~w~ lo suficiente.",
        sent_request_to = "Enviada petición a %{pname}, el nombre de la animación es %{ename}.",
        refuse_emote = "Emote se negó.",
        do_you_wanna = "~y~Y~w~ aceptar, ~r~L~w~ rechazar (~g~%{emote}~w~)"
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
        pee = "Sostén G para orinar.",
        firework = "Pulsa ~y~G~w~ para usar los fuegos artificiales",
        camera = "Pulse ~y~G~w~ para utilizar el flash de la cámara.",
        poop = "Pulsa ~y~G~w~ para hacer caca",
        puke = "Pulsa ~y~G~w~ para vomitar",
        spraychamp = "Mantenga ~y~G~w~ para rociar champán",
        useleafblower = "Pulse ~y~G~w~ para utilizar el soplador de hojas.",
        vape = "Pulse ~y~G~w~ para vapear.",
        makeitrain = "Pulsa ~y~G~w~ para que llueva.",
        stun = "Pulsa ~y~G~w~ para 'usar' la pistola aturdidora.."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})