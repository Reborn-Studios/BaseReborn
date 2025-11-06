CreateThread(function ()
    Wait(1000)
    local data = json.decode(LoadResourceFile(GetCurrentResourceName(), 'html/config.json'))
    data["watermark"] = {
        label = {
            text = GlobalState['Basics']['ServerName'],
            colorWordCount = 1
        },
        subHeading = "Loading Screen",
        logo = GlobalState['Basics']['CityLogo']
    }
    for k,v in pairs(data["socialHeaders"]) do
        if v["type"] == "discord" then
            data["socialHeaders"][k]["link"] = GlobalState['Basics']['Discord']
        end
    end
    SaveResourceFile(GetCurrentResourceName(), 'html/config.json', json.encode(data, { indent = true }), -1)
end)