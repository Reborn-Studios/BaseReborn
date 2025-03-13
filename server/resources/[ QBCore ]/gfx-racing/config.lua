Config = {}
Config.Database = "oxmysql"
Config.Framework = "new-qb"
Config.ServerName = GlobalState['Basics']['ServerName']
Config.ImageType = "steam" --discord // steam
Config.PlayerWaitTime = 1 -- minuto
Config.MinPlayersForStart = 2
Config.VehicleCollision = true
Config.ShowPlayerNamesInRace = true
Config.BlipConfig = {}
Config.MaximumRouteCount = 200
Config.MinimumRouteCountForAddRoute = 5

Config.Texts =  {
    ["inracealready"] = "Você já esta em uma corrida!",
    ["maxplayers"] = "Maximo de Jogadores",
    ["creatednewrace"] = "Sua corrida foi criada!",
    ["notatlocation"] = "Você não esta no local da corrida e foi expulso!",
    ["racedeactivated"] = "Sua corrida foi desativada!",
    ["finishrace"] = "Você finalizou a corrida",
    ["needmoreroute"] = "Você precisa adicionar algumas rotas!",
    ["maxroute"] = "Maximo de rotas!",
    ["startinrace"] = "Corrida começa em ",
    ["createrace"] = "Uma nova corrida foi lançada, clique para entrar",
    ["racestartin"] = "Sua corrida começa em 30 segundos, por favor entre no carro e fique pronto!",
    ["openui"] = {
        key = "INSERT",
        text = "Abrir corrida",
        command = "races",
        item = "raceticket"        -- Coloque 'false' caso nao utilize item para corrida
    }
}
