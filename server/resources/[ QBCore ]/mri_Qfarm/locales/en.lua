local Translations = {
    actions = {
        edit = "Edit Farm",
    },
    menus = {
        ["farm_header_title"] = "%{name}",
        ["cancel_farm"] = "Cancel actual Farm",
        ["craft_header_title"] = "Craft: %{name}",
        ["cancel_craft"] = "Cancel actual Craft",
        ["item_header_title"] = "Crafting: %{item}",
        ["item_build_time"] = "%{buildTime} second(s).",
        ["back"] = "Back",
    },
    error = {
        ["invalid_job"] = "don't think I work here...",
        ["invalid_items"] = "You don't have the right items!",
        ["no_items"] = "You don't have any item!",
        ["item_not_found"] = "Item: %{item} not found.",
        ["job_not_found"] = "Job: %{job} not found.",
        ["gang_not_found"] = "Gang: %{gang} not found.",
        ["item_cfg_not_found"] = "Item config: %{item} not found.",
        ["incorrect_vehicle"] = "You're not in a qualified vehicle.",
    },
    progress = {
        ["pick_farm"] = "Picking %{item}...",
        ["craft_progress"] = "Crafting %{item}...",
    },
    task = {
        ["start_task"] = "[E] Pick",
        ["cancel_task"] = "You have cancelled the task",
    },
    text = {
        ["start_shift"] = "You have started your %{item} farm!",
        ["end_shift"] = "Your shift has ended!",
        ["cancel_shift"] = "Your shift was cancelled!",
        ["cancel_craft"] = "Your crafting was cancelled!",
        ["valid_zone"] = "Valid Zone!",
        ["invalid_zone"] = "Invalid Zone!",
        ["zone_entered"] = "%{zone} Zone Entered",
        ["zone_exited"] = "%{zone} Zone Exited",
    },
    misc = {
        ["farm_point"] = "Farm Point"
    },
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})
