-- English
local Translations = {
    menu = {
        title = "Animation Menu",
        description = "Here you can manage all server animations.",
        search_placeholder = "Search by title, name",
        all_animations = "All Animations",
        quick_animations = "Quick Animations",
        quick = "QUICK",
        animations = "ANIMATIONS",
        animations_number = "animations",
        modern = "Modern",
        compact = "Compact",
        show_categories = "Show Categories",
        hide_categories = "Hide Categories",
        prop_options = "Prop Options",
        left_hand = "Left Hand",
        right_hand = "Right Hand",
        keybinds = "Keybinds",
        your_keybinds = "Your Keybinds",
        keybind_for = "Keybind for:",
        update_key = "Update Key",
        save = "Save",
        cancel = "Cancel"
    },
    notifications = {
        request_cancelled = "Request cancelled.",
        request_timed_out = "Request timed out.",
        no_players_nearby = "No players nearby.",
        no_emote_to_cancel = "No emote to cancel.",
        quick_slot_empty = "No anim found on slot %{slot}.",
        waiting_for_a_decision = "Waiting for a desicion. Cancel",
        already_playing_anim = "You're already playing an anim.",
        walk_style_is_set_default = "Your walking style is set as default.",
        just_animals = "Only animal characters can use this animation."
    },
    categories = {
        all = "All",
        favorites = "Favorites",
        general = "General",
        extra = "GTA Default",
        dances = "Dances",
        expressions = "Expressions",
        walks = "Walks",
        placedemotes = "Placeds",
        syncedemotes = "Synceds",
        propemotes = "Props",
        erpemotes = "ERP",
        animalemotes = "Animals",
        gang = "Gang"
    },
    keybinds = {
        toggle_point_description = "Toggles Point",
        ragdoll_description = "Ragdoll",
        play_quick_emote = "Play quick emote"
    },
    animations = {
        smoke = "Press ~y~G~w~ to smoke.",
        vape = "Press ~y~G~w~ to vape.",
        cut = "Press ~y~G~w~ to cut",
        makeitrain = "Press ~y~G~w~ to make it rain.",
        camera = "Press ~y~G~w~ to use camera flash.",
        spraychamp = "Hold ~y~G~w~ to spray champagne",
        useleafblower = "Press ~y~G~w~ to use the leaf blower.",
        poop = "Press ~y~G~w~ to poop",
        puke = "Press ~y~G~w~ to puke",
        firework = "Press ~y~G~w~ to use the firework",
        pee = "Hold ~y~G~w~ to pee.",
        stun = "Press ~y~G~w~ to 'use' stun gun",
        candle = "Press ~y~G~w~ to light candle"
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})