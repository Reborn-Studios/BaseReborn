CreateThread(function ()
    Wait(1000)
    local changedText = false
    local data = json.decode(LoadResourceFile(GetCurrentResourceName(), 'html/config.json'))
    if data["watermark"] and data["watermark"]["label"]?.text ~= GlobalState['Basics']['ServerName'] then
        data["watermark"] = {
            label = {
                text = GlobalState['Basics']['ServerName'],
                colorWordCount = 1
            },
            subHeading = "Loading Screen",
            logo = GlobalState['Basics']['CityLogo']
        }
        changedText = true
    end
    for k,v in pairs(data["socialHeaders"]) do
        if v["type"] == "discord" and data["socialHeaders"][k]["link"] ~= GlobalState['Basics']['Discord'] then
            data["socialHeaders"][k]["link"] = GlobalState['Basics']['Discord']
            changedText = true
        end
    end
    if changedText then
        SaveResourceFile(GetCurrentResourceName(), 'html/config.json', json.encode(data, { indent = true }), -1)
    end
end)