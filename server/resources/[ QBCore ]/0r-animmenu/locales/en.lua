-- English
local Translations = {
    menu = {
        title = "Animations",
        description = "All animations list on one place",
        exit = "Exit"
    },
    notifications = {
        request_cancelled = "Request cancelled.",
        request_timed_out = "Request timed out.",
        no_players_nearby = "No players nearby.",
        no_emote_to_cancel = "No emote to cancel.",
        quick_slot_empty = "No anim found on slot %{slot}.",
        waiting_for_a_decision = "Waiting for a desicion. Cancel"
    },
    categories = {
        all = "All",
        favorites = "Favorites",
        general = "General",
        dances = "Dances",
        expressions = "Expressions",
        walks = "Walks",
        placedemotes = "Placed",
        syncedemotes = "Shared",
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = false
})