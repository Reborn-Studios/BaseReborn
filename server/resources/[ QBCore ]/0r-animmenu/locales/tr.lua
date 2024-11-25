-- Turkish
local Translations = {
    notifications = {
        cant_play_in_vehicle = "Araç içindeyken bu animasyonu oynatamazsınız.",
        male_only = "Bu ifade sadece erkeklere özeldir, üzgünüm!",
        not_valid_emote = "%{name} geçerli bir ifade değil.",
        not_valid_dance = "%{name} geçerli bir dans değildir.",
        not_valid_shared_emote = "%{name} paylaşılan bir ifade değildir.",
        emote_menu_cmd = "Animasyonlar menüsünü açmak için /emotemenu komutunu kullanın.",
        no_cancel = "İptal edilecek ifade yok.",
        invalid_variation = "Geçersiz doku varyasyonu. Geçerli seçimler şunlardır: %{str}",
        nobody_close = "Kimse yeterince ~yakın~ değil.",
        sent_request_to = "İstek %{pname} oyuncusuna gönderildi, animasyon adı %{ename}.",
        refuse_emote = "İstek reddedildi.",
        do_you_wanna = "Kabul etmek için ~y~Y~w~, reddetmek için ~r~L~w~ (~g~%{emote}~w~)"
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
        pee = "İşemek için G'yi basılı tut.",
        firework = "Havai fişeği kullanmak için ~y~G~w~ tşuna basın",
        camera = "Kamera flaşını kullanmak için ~y~G~w~ düğmesine basın.",
        poop = "Kaka yapmak için ~y~G~w~ tuşuna basın",
        puke = "Kusmak için ~y~G~w~ tuşuna basın",
        spraychamp = "Şampanya püskürtmek için ~y~G~w~ tuşunu basılı tutun",
        useleafblower = "Yaprak üfleyiciyi kullanmak için ~y~G~w~ düğmesine basın.",
        vape = "Vape için ~y~G~w~ tuşuna basın.",
        makeitrain = "Yağmur yağdırmak için ~y~G~w~ tuşlarına basın.",
        stun = "Şok tabancasını 'kullanmak' için ~y~G~w~ tuşlarına basın."
    }
}

Lang = Lang or Locale:new({
    phrases = Translations,
    warnOnMissing = true
})