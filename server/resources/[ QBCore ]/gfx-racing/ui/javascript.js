const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;
var mapopened = false;
var raceid = 0;
PlayerData = {};
page = "races";
toggleraces = {};
CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoom) {
    return Math.pow(2, zoom);
  },
  zoom: function (sc) {
    return Math.log(sc) / 0.6931471805599453;
  },
  distance: function (pos1, pos2) {
    var x_difference = pos2.lng - pos1.lng;
    var y_difference = pos2.lat - pos1.lat;
    return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true,
});

function customIcon(icon) {
  return L.icon({
    iconUrl: `blips/${icon}.png`,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
    popupAnchor: [-10, -27],
  });
}

var LastSelectedObject = "home";
function escapeHtml(string) {
  return String(string).replace(/[&<>"'=/]/g, function (s) {
    return entityMap[s];
  });
}

const dt = new Date();
dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
function datetimeLocal() {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}

CheckList = {
  Name: false,
  Reward: false,
  Others: {
    Time: false,
    Players: false,
    Route: false,
  },
};

innotif = false;
RouteList = [];
ActiveRaces = [];
CalculateTime = function (datestr) {
  const dt = new Date(datestr);
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
  var year = dt.getFullYear();
  return `${padL(dt.getDate())}.${padL(dt.getMonth() + 1)}.${year} - ${padL(
    dt.getHours()
  )}:${padL(dt.getMinutes())}`;
};

window.addEventListener("message", function (event) {
  if (event.data.message == "OpenNui") {
    PlayerData = event.data.data;
    $("#userstats-wl").html(PlayerData.Win + "/" + PlayerData.Lose);
    var totalraces = Number(PlayerData.Win) + Number(PlayerData.Lose);
    $("#userstats-games").html(totalraces);
    $("#userstats-favcar").html(event.data.favouritecar);
    $(".playerimagetop").css(
      "background-image",
      "url(" + PlayerData.PlayerPhoto + ")"
    );
    $("#userstats-lastrace").html(PlayerData.LastRace);
    $(".topnav-PlayerName").html(PlayerData.Steam);
    $(".topnav-desc").html(PlayerData.CharacterName);
    $(".playername").html(PlayerData.Steam);
    $(".desc").html(PlayerData.CharacterName);
    $(".playermoney").html("$" + event.data.bankmoney);
    $(".playerinfoimg").html(
      `
            <img src="` +
        PlayerData.PlayerPhoto +
        `">
        `
    );
    ActiveRaces = event.data.activeraces;
    SetPlayerRoutes(PlayerData.Routes);
    SetActiveRaces(event.data.activeraces);
    SetLeaderBoard(event.data.LeaderBoard);
    SetIncomingRace(event.data.incomingrace);
    SetRaceHistory(PlayerData.RaceHistory);
    $(".screen").fadeIn(300);
  } else if (event.data.message == "AddRace") {
    SetAnnouncement(event.data.text, event.data.id);
    AddRace(event.data.data, event.data.route, event.data.id);
  } else if (event.data.message == "init") {
  } else if (event.data.message == "updateinterval") {
    UpdateInterval(event.data.time);
  } else if (event.data.message == "RefreshActive") {
    SetActiveRaces(event.data.activeraces);
  } else if (event.data.message == "Countdown") {
    StartCountDown(event.data.count);
  } else if (event.data.message == "removeracing") {
  } else if (event.data.message == "refreshleaderboardpage") {
    LeaderBoardPage(
      true,
      event.data.leaderboard,
      event.data.lap,
      event.data.percentage
    );
  } else if (event.data.message == "closeleaderboard") {
    LeaderBoardPage(
      false,
      event.data.leaderboard,
      event.data.lap,
      event.data.percentage
    );
  } else if (event.data.message == "SendNotification") {
    SendNotification(event.data.text, event.data.time);
  } else if (event.data.message == "update") {
    PlayerData = event.data.data;
    $("#userstats-wl").html(PlayerData.Win + "/" + PlayerData.Lose);
    var totalraces = Number(PlayerData.Win) + Number(PlayerData.Lose);
    $("#userstats-games").html(totalraces);
    $("#userstats-favcar").html(event.data.favouritecar);
    $(".playerimagetop").css(
      "background-image",
      "url(" + PlayerData.PlayerPhoto + ")"
    );
    $("#userstats-lastrace").html(PlayerData.LastRace);
    $(".topnav-PlayerName").html(PlayerData.Steam);
    $(".topnav-desc").html(PlayerData.CharacterName);
    $(".playername").html(PlayerData.Steam);
    $(".desc").html(PlayerData.CharacterName);
    $(".playermoney").html("$" + event.data.bankmoney);
    $(".playerinfoimg").html(
      `
            <img src="` +
        PlayerData.PlayerPhoto +
        `">
        `
    );
    SetPlayerRoutes(PlayerData.Routes);
    SetActiveRaces(event.data.activeraces);
    SetLeaderBoard(event.data.LeaderBoard);
    SetIncomingRace(event.data.incomingrace);
    SetRaceHistory(PlayerData.RaceHistory);
  }
});

SetAnnouncement = function (text, id) {
  $(".annountcement").html(
    `
        <h1> <strong>Announcement:</strong>` +
      text +
      `</h1>
    `
  );
  $(".annountcement").data("raceid", id);
};

SendNotification = function (text, time) {
  if (innotif) {
    return;
  }
  innotif = true;
  $(".notifmain").fadeIn(300);
  content = $(
    '<div style="border-radius: 5px; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border: 1px solid gray;" class="w-[80%] h-fit flex items-center "><div class="w-[7vh] h-[60%] flex justify-center items-center borderright"><img src="./images/exclamation.png"></div><div class="w-[87%] h-fit flex items-center ml-3 mr-3 mb-2 mt-2 annountcement"><h1 style="w-fit; white-space: break-spaces;">' +
      text +
      "</h1></div></div>"
  );
  $(".notificationbg").prepend(content);

  $(content).fadeIn(500);
  setTimeout(function () {
    $(content).fadeOut(time * 0.25);
  }, time * 0.75);

  setTimeout(function () {
    $(content).css("display", "none");
    innotif = false;
    $(".notifmain").fadeOut(300);
  }, time);
};

CreateID = function () {
  return Math.floor(Math.random() * 50000);
};

SetRaceHistory = function (RaceHistory) {
  if (RaceHistory.length == 0) {
    $(".history-epty").fadeIn(300);
    return;
  }
  $(".racehistory").html("");
  $(".history-epty").fadeOut(300);
  for (i = 0; i < RaceHistory.length; i++) {
    var time = CalculateTime(RaceHistory[i].date);
    var rank = Number(RaceHistory[i].rank);
    if (rank == 1) {
      $(".racehistory").prepend(
        `
            <div class="w-full h-[18%] hover:bg-[url('./images/history-hover-bg.png')] bg-[url('./images/race-history-bg.png')] bg-no-repeat bg-cover flex mt-2">
                <div class="w-[70%] h-full" >
                    <div class="w-[80%] h-full flex flex-col">
                        <div class="flex w-full h-[30%] history-race-title items-center ml-2" >CORRIDA </div>
                        <div class="flex w-full h-[40%] history-race-name items-center ml-2" >` +
          RaceHistory[i].racename +
          `</div>
                        <div class="flex w-full h-[30%] history-race-time items-center ml-2" >FINALIZADO  <p>&nbsp;| ` +
          time +
          `</p></div>
                    </div>
                </div>
                <div class="w-[15%] h-full flex justify-center items-center">
                    <img src="./images/won.png">
                </div>
                <div class="w-[15%] h-full flex justify-center items-center" style="background: rgba(0, 0, 0, 0.65);">
                    <p class="playerRaceRank">` +
          rank +
          `<span>&nbsp;ST</span></p>
                </div>
            </div>
        `
      );
    } else if (rank == 2) {
      $(".racehistory").prepend(
        `
            <div class="w-full h-[18%] hover:bg-[url('./images/history-hover-bg.png')] bg-[url('./images/race-history-bg.png')] bg-no-repeat bg-cover flex mt-2">
                <div class="w-[70%] h-full" >
                    <div class="w-[80%] h-full flex flex-col">
                        <div class="flex w-full h-[30%] history-race-title items-center ml-2" >CORRIDA </div>
                        <div class="flex w-full h-[40%] history-race-name items-center ml-2" >` +
          RaceHistory[i].racename +
          `</div>
                        <div class="flex w-full h-[30%] history-race-time items-center ml-2" >FINALIZADO  <p>&nbsp;| ` +
          time +
          `</p></div>
                    </div>
                </div>
                <div class="w-[15%] h-full flex justify-center items-center">
                    <img src="./images/lose.png">
                </div>
                <div class="w-[15%] h-full flex justify-center items-center" style="background: rgba(0, 0, 0, 0.65);">
                    <p class="playerRaceRank">` +
          rank +
          `<span>&nbsp;ND</span></p>
                </div>
            </div>
        `
      );
    } else if (rank == 3) {
      $(".racehistory").prepend(
        `
            <div class="w-full h-[18%] hover:bg-[url('./images/history-hover-bg.png')] bg-[url('./images/race-history-bg.png')] bg-no-repeat bg-cover flex mt-2">
                <div class="w-[70%] h-full" >
                    <div class="w-[80%] h-full flex flex-col">
                        <div class="flex w-full h-[30%] history-race-title items-center ml-2" >CORRIDA </div>
                        <div class="flex w-full h-[40%] history-race-name items-center ml-2" >` +
          RaceHistory[i].racename +
          `</div>
                        <div class="flex w-full h-[30%] history-race-time items-center ml-2" >FINALIZADO  <p>&nbsp;| ` +
          time +
          `</p></div>
                    </div>
                </div>
                <div class="w-[15%] h-full flex justify-center items-center">
                    <img src="./images/lose.png">
                </div>
                <div class="w-[15%] h-full flex justify-center items-center" style="background: rgba(0, 0, 0, 0.65);">
                    <p class="playerRaceRank">` +
          rank +
          `<span>&nbsp;RD</span></p>
                </div>
            </div>
        `
      );
    } else {
      $(".racehistory").prepend(
        `
            <div class="w-full h-[18%] hover:bg-[url('./images/history-hover-bg.png')] bg-[url('./images/race-history-bg.png')] bg-no-repeat bg-cover flex mt-2">
                <div class="w-[70%] h-full" >
                    <div class="w-[80%] h-full flex flex-col">
                        <div class="flex w-full h-[30%] history-race-title items-center ml-2" >CORRIDA </div>
                        <div class="flex w-full h-[40%] history-race-name items-center ml-2" >` +
          RaceHistory[i].racename +
          `</div>
                        <div class="flex w-full h-[30%] history-race-time items-center ml-2" >FINALIZADO  <p>&nbsp;| ` +
          time +
          `</p></div>
                    </div>
                </div>
                <div class="w-[15%] h-full flex justify-center items-center">
                    <img src="./images/lose.png">
                </div>
                <div class="w-[15%] h-full flex justify-center items-center" style="background: rgba(0, 0, 0, 0.65);">
                    <p class="playerRaceRank">` +
          rank +
          `<span>&nbsp;TH</span></p>
                </div>
            </div>
        `
      );
    }
  }
};

StartCountDown = function (count) {
  $(".countdowndiv").fadeIn(100);
  $(".counter").html(count);
  if (count == 1) {
    $(".countdowndiv").fadeOut(100);
    StartRaceTimeCounter();
  }
};

StartRaceTimeCounter = function () {
  let i = 0;
  setInterval(function () {
    i++;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(i / (60 * 60 * 24));
    var hours = Math.floor((i % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((i % (60 * 60)) / 60);
    var seconds = Math.floor(i % 60);

    // Display the result in the element with id="demo"
    $(".leaderboardtimeest").html(
      hours + ":" + minutes + ":" + seconds + " s "
    );
  }, 1000);
};

LeaderBoardPage = function (open, leaderboard, lap, percentage) {
  if (open) {
    $(".screen").fadeOut(300);
    $(".leaderboardpage").fadeIn(300);
    $(".playerlistleaderboard").html("");
    userrank = 0;
    for (i = 0; i < 5; i++) {
      if (leaderboard[i]) {
        var km = leaderboard[i].km;
        calc = km.toFixed(2);
        ranking = i + 1;
        if (PlayerData.source == leaderboard[i].source) {
          userrank = ranking;
          $(".playerlistleaderboard").append(
            `
                    <div class="w-full h-1/5 flex justify-center items-center gap-3" >
                        <div class="w-[20%] h-full flex justify-center items-center text-white" ><p class="leaderboard-rank-user">0` +
              ranking +
              `&nbsp;<p style="font-size: 3vh; color: #FD3A69 !important;">·</p></p></div>
                        <div class="w-full h-[80%] flex gap-1 items-center" style="border: 0.3vh solid #FE3968; border-radius: 5px; background: linear-gradient(90.18deg, rgba(0, 0, 0, 0.76) 12.54%, rgba(0, 0, 0, 0.76) 101.68%);">
                            <div class="w-[0.1vh] h-[80%] bg-white"></div>
                            <div class="w-[22.5%] h-full  ml-2 overflow-hidden" style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);"><img src='` +
              leaderboard[i].playerphoto +
              `'></div>
                            <p class="text-[1.5vh] w-[50%] h-full flex items-center" >` +
              leaderboard[i].CharacterName +
              `</p>
                            <p class="text-[1.3vh] w-[30%] h-full flex items-center justify-center" >` +
              calc +
              ` mil</p>
                        </div>
                    </div>
                    `
          );
        } else {
          if (leaderboard[i].finished) {
            $(".playerlistleaderboard").append(
              `
                        <div class="w-full h-1/5 flex justify-center items-center gap-3" >
                            <div class="w-[20%] h-full flex justify-center items-center text-white" ><p class="leaderboard-rank" >0` +
                ranking +
                `</p></div>
                            <div class="w-full h-[80%] flex gap-1 items-center" style="border: 0.1vh solid #8ac926; border-radius: 5px;">
                                <div class="w-[0.1vh] h-[80%] bg-white"></div>
                                <div class="w-[22.5%] h-full  ml-2 overflow-hidden" style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);"><img src='` +
                leaderboard[i].playerphoto +
                `'></div>
                                <p class="text-[1.5vh] w-[50%] h-full flex items-center" >` +
                leaderboard[i].CharacterName +
                `</p>
                                <p class="text-[1.3vh] w-[30%] h-full flex items-center justify-center" >` +
                calc +
                ` mil</p>
                            </div>
                        </div>
                        `
            );
          } else {
            $(".playerlistleaderboard").append(
              `
                        <div class="w-full h-1/5 flex justify-center items-center gap-3" >
                            <div class="w-[20%] h-full flex justify-center items-center text-white" ><p class="leaderboard-rank" >0` +
                ranking +
                `</p></div>
                            <div class="w-full h-[80%] flex gap-1 items-center" style="border: 0.1vh solid rgb(155, 155, 155); border-radius: 5px;">
                                <div class="w-[0.1vh] h-[80%] bg-white"></div>
                                <div class="w-[22.5%] h-full  ml-2 overflow-hidden" style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);"><img src='` +
                leaderboard[i].playerphoto +
                `'></div>
                                <p class="text-[1.5vh] w-[50%] h-full flex items-center" >` +
                leaderboard[i].CharacterName +
                `</p>
                                <p class="text-[1.3vh] w-[30%] h-full flex items-center justify-center" >` +
                calc +
                ` mil</p>
                            </div>
                        </div>
                        `
            );
          }
        }
      }
    }
    $(".leaderboardtimeestlap").html("STATUS " + lap);
    $(".leaderboard-rank-top").html("0" + userrank);
    $(".leaderboard-rank-users").html("0" + leaderboard.length);
    $(".leaderboardprocces").html(percentage + "%");
  } else {
    $(".screen").fadeOut(300);
    $(".leaderboardpage").fadeOut(300);
    $(".playerlistleaderboard").html("");
    $(".leaderboardtimeestlap").html("");
    $(".leaderboard-rank-top").html("");
    $(".leaderboard-rank-users").html("");
    $(".leaderboardprocces").html("");
  }
};

GetTimeDifference = function (time) {
  let today = new Date();
  let racetime = new Date(time);
  if (racetime < today) {
    $.post("https://gfx-racing/leaverace", JSON.stringify({}));
  }
  let diffMs = racetime - today;
  let Daydifference = Math.floor(diffMs / 86400000);
  let Hoursdifference = Math.floor((diffMs % 86400000) / 3600000);
  let Minutedifference = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  let Secondsdifference = Math.round(diffMs / 1000);
  if (Secondsdifference == 0) {
    Secondsdifference = 1;
  }
  let TimeAgo = Secondsdifference + " seconds later";
  if (Daydifference > 0 && Hoursdifference > 0) {
    TimeAgo = Daydifference + " day " + Hoursdifference + " hours later";
  } else if (Daydifference > 0 && Hoursdifference == 0) {
    TimeAgo = Daydifference + " day later";
  } else if (Daydifference == 0 && Hoursdifference > 0) {
    TimeAgo = Hoursdifference + " hours later";
  } else if (
    Daydifference == 0 &&
    Hoursdifference == 0 &&
    Minutedifference > 0
  ) {
    TimeAgo = Minutedifference + " minutes later";
  }
  return TimeAgo;
};

SetIncomingRace = function (incomingrace) {
  $(".incomingracetext").html(`
                <p style="font-size: 1vh; color: #DC355D; font-family: 'gilroy';">Entre em qualquer corrida!</p>
            `);
  $(".maindesc").find(".leavebtn").remove();
  if (PlayerData) {
    if (incomingrace) {
      $(".maindesc").append(`
            <div class="w-[90%] h-[20%] flex justify-center items-center leavebtn">
                                                Sair
                                            </div>
            `);
      $(".incomingracetext").html(
        `
                <p style="font-size: 1vh; color: #DC355D; font-family: 'gilroy';">` +
          incomingrace.data.Name +
          ` | ` +
          GetTimeDifference(incomingrace.data.Others.Time) +
          ` starting!</p>
            `
      );
      //$.post("https://gfx-racing/setinterval", JSON.stringify({timediff : incomingrace.data.Others.Time}));
    }
  }
};

UpdateInterval = function (time) {
  let today = new Date();
  let racetime = new Date(time);
  let diffMs = racetime - today;
  let Daydifference = Math.floor(diffMs / 86400000);
  let Hoursdifference = Math.floor((diffMs % 86400000) / 3600000);
  let Minutedifference = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  let Secondsdifference = Math.round(diffMs / 1000);
  if (Secondsdifference == 0) {
    Secondsdifference = 1;
  }
  diff = {};
  diff.day = Daydifference;
  diff.hours = Hoursdifference;
  diff.minute = Minutedifference;
  diff.seconds = Secondsdifference;
  $.post(
    "https://gfx-racing/updateinterval",
    JSON.stringify({ timediff: diff })
  );
};

SetLeaderBoard = function (data) {
  $(".ranklistmain").html("");
  $(".ranklistpage").html("");
  for (i = 0; i < Config.MainPageLeaderBoardLength; i++) {
    if (data[i]) {
      ranking = i + 1;
      if (ranking > 5) {
        $(".ranklistmain").append(
          `
                <div class="w-full h-[4vh] flex gap-2 mt-2" >
                <div class="rankdiv w-[7.5%] h-full flex justify-center items-center nottop5">
                    #` +
            ranking +
            `
                </div>
                <div class="w-full h-[4vh] flex" >
                    <div class="w-full h-full flex ranking-index-div nottop5">
                        <div class="w-1/4 h-full ranking-PlayerInfo flex items-center gap-2">
                            <div class="w-1/3 h-[80%] ml-[0.25vh]  bg-no-repeat bg-cover bg-center leadimg"><img style="object-fit: scale-down" src=` +
            data[i].playerphoto +
            `></div>
                            <p class="ranking-playerinfo-playername">` +
            data[i].charname +
            `</p>
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].win +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].lose +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].distance.toFixed(2) +
            `
                        </div>
                    </div>
                </div>
            </div>
                `
        );
      } else {
        $(".ranklistmain").append(
          `
                <div class="w-full h-[4vh] flex gap-2 mt-2" >
                <div class="rankdiv w-[7.5%] h-full flex justify-center items-center">
                    #` +
            ranking +
            `
                </div>
                <div class="w-full h-[4vh] flex" >
                    <div class="w-full h-full flex ranking-index-div">
                        <div class="w-1/4 h-full ranking-PlayerInfo flex items-center gap-2">
                            <div class="w-1/3 h-[80%] ml-[0.25vh]  bg-no-repeat bg-cover bg-center leadimg"><img  style="object-fit: scale-down" src=` +
            data[i].playerphoto +
            `></div>
                            <p class="ranking-playerinfo-playername">` +
            data[i].charname +
            `</p>
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].win +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].lose +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].distance.toFixed(2) +
            `
                        </div>
                    </div>
                </div>
            </div>
                `
        );
      }
    }
  }

  for (i = 0; i < Config.RacersPageLeaderBoardLength; i++) {
    if (data[i]) {
      ranking = i + 1;
      if (ranking > 5) {
        $(".ranklistpage").append(
          `
            <div class="w-full h-[4vh] flex gap-2 mt-2" >
            <div class="rankdiv w-[7.5%] h-full flex justify-center items-center nottop5">
                #` +
            ranking +
            `
            </div>
            <div class="w-full h-[4vh] flex" >
                <div class="w-full h-full flex ranking-index-div nottop5">
                    <div class="w-1/4 h-full ranking-PlayerInfo flex items-center gap-2">
                        <div class="w-1/3 h-[80%] ml-[0.25vh]  bg-no-repeat bg-cover bg-center leadimg"><img style="object-fit: scale-down" src=` +
            data[i].playerphoto +
            `></div>
                        <p class="ranking-playerinfo-playername">` +
            data[i].charname +
            `</p>
                    </div>
                    <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                    ` +
            data[i].win +
            `
                    </div>
                    <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                    ` +
            data[i].lose +
            `
                    </div>
                    <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                    ` +
            data[i].distance.toFixed(2) +
            `
                    </div>
                </div>
            </div>
        </div>
            `
        );
      } else {
        $(".ranklistpage").append(
          `
                <div class="w-full h-[4vh] flex gap-2 mt-2" >
                <div class="rankdiv w-[7.5%] h-full flex justify-center items-center">
                    #` +
            ranking +
            `
                </div>
                <div class="w-full h-[4vh] flex" >
                    <div class="w-full h-full flex ranking-index-div">
                        <div class="w-1/4 h-full ranking-PlayerInfo flex items-center gap-2">
                            <div class="w-1/3 h-[80%] ml-[0.25vh]  bg-no-repeat bg-cover bg-center leadimg"><img style="object-fit: scale-down" src=` +
            data[i].playerphoto +
            `></div>
                            <p class="ranking-playerinfo-playername">` +
            data[i].charname +
            `</p>
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].win +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].lose +
            `
                        </div>
                        <div class="w-1/4 h-full flex justify-center items-center ranking-playerinfo-playerwinvalue">
                        ` +
            data[i].distance.toFixed(2) +
            `
                        </div>
                    </div>
                </div>
            </div>
                `
        );
      }
    }
  }
};

SetPlayerRoutes = function (routes) {
  $(".routesmenu").html("");
  $.each(routes, function (i, index) {
    $(".routesmenu").prepend(
      `
        <div class="w-full h-[20%] hover:bg-[url('./images/hover-bg.png')] active-races-cont bg-[url('./images/active-races-bg.png')]  bg-no-repeat bg-cover flex mt-1" >
        <div class="w-[80%] h-full flex flex-col routes-container" data=` +
        index.id +
        `>
            <div class="flex w-full h-[30%] race-title items-center ml-2" >Route -</div>
            <div class="flex w-full h-[40%] race-name items-center ml-2" >` +
        index.name +
        `</div>
            <div class="flex w-full h-[30%] race-time items-center ml-2" ><p style="color: #808080; font-size: 1vh;"> <i class="fas fa-hourglass-start"></i> - ` +
        index.StartStreet +
        `&nbsp;| <i class="fas fa-hourglass"></i> - ` +
        index.FinishStreet +
        ` | ` +
        index.Routes.length +
        ` Area</p></div>
        </div>
        <div class="w-[20%] h-full flex justify-center items-center " onclick=DeleteRoute(` +
        index.id +
        `)>
            <i class="fas fa-trash delet"></i>
        </div>
    </div>
        `
    );
    $(".routesmenu")
      .find("[data=" + index.id + "]")
      .data("route", index.Routes);
  });
};

DeleteRoute = function (id) {
  $.post("https://gfx-racing/DeleteRoute", JSON.stringify({ id: id }));
};

SetActiveRaces = function (activeraces) {
  $(".activelist").html("");
  $.each(activeraces, function (i, index) {
    AddRace(index.data, index.route, index.id);
  });
};

AddRace = function (data, route, id) {
  var date = CalculateTime(data.Others.Time);
  let today = new Date();
  let racetime = new Date(data.Others.Time);
  if (today > racetime) {
    //return $.post("https://gfx-racing/clearracedata", JSON.stringify({id : id}));
  }
  $(".activelist").prepend(
    `
    <div class="w-full h-[18%] hover:bg-[url('./images/hover-bg.png')] active-races-cont bg-[url('./images/active-races-bg.png')] mt-2 bg-no-repeat bg-cover flex racelist" id=` +
      id +
      ` >
                                    <div class="w-[80%] h-full flex flex-col">
                                        <div class="flex w-full h-[30%] race-title items-center ml-2" >CORRIDA</div>
                                        <div class="flex w-full h-[40%] race-name items-center ml-2" >` +
      data.Name +
      `</div>
                                        <div class="flex w-full h-[30%] race-time items-center ml-2" >ATIVO | <p>&nbsp;` +
      date +
      `</p></div>
                                    </div>
                                    <div class="w-[20%] h-full flex justify-center items-center">
                                        <img src="./images/arrow.png">
                                    </div>
                                </div>
    `
  );
  $(".activelist")
    .find("[id=" + id + "]")
    .data("routes", route);
  $(".activelist")
    .find("[id=" + id + "]")
    .data("data", data);
  $(".activelist")
    .find("[id=" + id + "]")
    .data("date", date);
  $(".activelist")
    .find("[id=" + id + "]")
    .data("raceid", id);
};

ChangeInput = function (domtype, value) {
  if (domtype == "range") {
    $(".playerlength").html(
      value + '<h1 class="input-desc">&nbsp;Players</h1>'
    );
    if (Number(value) >= 2) {
      $("#checklist-range").html('<img src="./images/tick.png">');

      CheckList.Others.Players = Number(value);
    } else {
      $("#checklist-range").html('<img src="./images/bg-required.png">');
      CheckList.Others.Players = false;
    }
  } else if (domtype == "text") {
    var nvalue = escapeHtml(value);
    if (nvalue != "") {
      $(".givename").html(`
            <div class="w-[8%] h-full flex justify-start items-center">
            <img src="./images/success.png">
                                        </div>
                                        <p style="color: white;">DE UM NOME A CORRIDA</p>
            `);
      $("#checklist-name").html('<img src="./images/tick.png">');
      CheckList.Name = nvalue;
    } else {
      $(".givename").html(`
            <div class="w-[8%] h-full flex justify-start items-center">
                                            <img src="./images/required.png">
                                        </div>
                                        <p style="color: white;">DE UM NOME A CORRIDA</p>
            `);
      $("#checklist-name").html('<img src="./images/bg-required.png">');
      CheckList.Name = false;
    }
  } else if (domtype == "number") {
    if (value == "") {
      $("#checklist-reward").html('<img src="./images/bg-required.png">');
      $(".setreward").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/required.png">
                                        </div>
                                        <p style="color: white;">RECOMPENSA</p>
            `);
      CheckList.Reward = false;
      return;
    }
    nNumber = Number(value);
    if (nNumber > 0) {
      $(".setreward").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/success.png">
                                        </div>
                                        <p style="color: white;">RECOMPENSA</p>
            `);
      $("#checklist-reward").html('<img src="./images/tick.png">');
      CheckList.Reward = nNumber;
    } else {
      $(".setreward").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/required.png">
                                        </div>
                                        <p style="color: white;">RECOMPENSA</p>
            `);
      $("#checklist-reward").html('<img src="./images/bg-required.png">');
      CheckList.Reward = false;
    }
  } else if (domtype == "date") {
    var badinput = document.querySelector("#meeting-time").validity.badInput;
    if (badinput) {
      $("#checklist-date").html('<img src="./images/bg-required.png">');
      CheckList.Others.Time = false;
    } else {
      selectedDate = document.getElementById("meeting-time").value;
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      var selectedDate = new Date(selectedDate);
      var now = new Date();
      if (selectedDate < now) {
        $("#checklist-date").html('<img src="./images/bg-required.png">');
        return;
      }
      $("#checklist-date").html('<img src="./images/tick.png">');
      CheckList.Others.Time = document.getElementById("meeting-time").value;
    }
  }
  if (CheckList.Others) {
    if (
      CheckList.Others.Time &&
      CheckList.Others.Players &&
      CheckList.Others.Route
    ) {
      $(".othersettings").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/success.png">
                                        </div>
                                        <p style="color: white;">OUTRAS CONFIGURAÇÕES</p>
            `);
    } else {
      $(".othersettings").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/required.png">
                                        </div>
                                        <p style="color: white;">OUTRAS CONFIGURAÇÕES</p>
            `);
    }
  }
};

OpenCreateRace = function () {
  $(".leftcontainer-main").hide();
  $(".homepage").hide();
  $(".routes-leftcontainer").hide();
  $(".mappage").hide();
  $(".createraceleftcontainer").show();
  $(".racerspage").show();
  //const booking = document.getElementById('meeting-time');
  //booking.value = datetimeLocal();
};

OpenRaceData = function (data, date, isroute, id) {
  $(".homepage").hide();
  $(".mainracers").hide();
  $(".mainpage").show();
  $(".mappage").show();
  page = "races";
  AttrMap(data, date, isroute, id);
};

Back = function (type) {
  if (type == "createrace") {
    $(".leftcontainer-main").show();
    $(".homepage").show();
    $(".createraceleftcontainer").hide();
    $(".racerspage").hide();
  } else if (type == "routepage") {
    $(".createraceleftcontainer").show();
    $(".racerspage").show();
    $(".homepage").hide();
    $(".routes-leftcontainer").hide();
    $("#map").html("");
    $(".mappage").hide();
  }
};

SelectRoute = function () {
  $(".createraceleftcontainer").hide();
  $(".homepage").hide();
  $(".racerspage").hide();
  $(".routes-leftcontainer").show();
  $("#map").html("");
  $(".mappage").show();
  AttrMap();
  page = "routes";
};

Select = function (type) {
  if (type == "exit") {
    $(".screen").fadeOut(300);
    $.post("https://gfx-racing/CloseUi", JSON.stringify({}));
  } else if (type == "racers") {
    $(".mainpage").hide();
    $(".mappage").hide();
    $(".createraceleftcontainer").hide();
    $(".racerspage").hide();
    $(".routes-leftcontainer").hide();
    $("#map").html("");
    $(".mappage").hide();
    $(".mainracers").show();
    $(".leftcontainer-main").show();
  } else if (type == "home") {
    $(".mainracers").hide();
    $(".mappage").hide();
    $(".createraceleftcontainer").hide();
    $(".racerspage").hide();
    $(".routes-leftcontainer").hide();
    $("#map").html("");
    $(".mappage").hide();
    $(".mainpage").show();
    $(".homepage").show();
    $(".leftcontainer-main").show();
  } else if (type == "races") {
    $(".createraceleftcontainer").hide();
    $(".racerspage").hide();
    OpenRaceData();
    ShowRaceStarts();
  }

  if (LastSelectedObject == type) {
    return;
  }
  if (LastSelectedObject != "") {
    $("." + LastSelectedObject).removeClass("selectedMain");
  }
  $("." + type).addClass("selectedMain");
  LastSelectedObject = type;
};
var ExampleGroup = L.layerGroup();
var Icons = {
  Example: ExampleGroup,
};
(AtlasStyle = L.tileLayer("mapStyles/styleAtlas/{z}/{x}/{y}.jpg", {
  minZoom: 0,
  maxZoom: 5,
  noWrap: true,
  continuousWorld: false,
  attribution: "Online map GTA V",
  id: "styleAtlas map",
})),
  (mymap = undefined);
AttrMap = function (data, date, isroute, id) {
  $("#map").html("");
  if (mymap) {
    mymap.off();
    mymap.remove();
  }
  mymap = L.map("map", {
    crs: CUSTOM_CRS,
    zoomControl: false,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    attributionControl: false,
    layers: [AtlasStyle],
    center: [0, 0],
    zoom: 3,
  });
  if (data) {
    SetRaceInfo(data, date, isroute, id);
  }
  SetBG();
  $.post("https://gfx-racing/ClearRouteData", JSON.stringify({}));
};

SetBG = function () {
  $("#map").append("<div class='test'></div>");
};

$(document).on("dblclick", "#map", function (e) {
  if (page == "races") {
    return;
  }
  var latLng = mymap.mouseEventToLatLng(e.originalEvent);
  id = RouteList.length + 1;
  marker = L.marker([latLng.lat, latLng.lng], {
    icon: customIcon(1),
    draggable: "true",
    id: id,
  })
    .addTo(mymap)
    .bindPopup("Route");
  RouteList.push({
    id: id,
    x: latLng.lng,
    y: latLng.lat,
    marker: marker,
  });
  TestFunct();
  $.post(
    "https://gfx-racing/AddMarker",
    JSON.stringify({ x: latLng.lng, y: latLng.lat })
  );
});

TestFunct = function () {
  for (i = 0; i < RouteList.length; i++) {
    const marker = RouteList[i].marker;
    if (marker && !RouteList[i].eventcreated) {
      RouteList[i].eventcreated = true;
      marker.on("dragend", function (event) {
        console.log(marker.options.id);
        var position = marker.getLatLng();
        marker.setLatLng(position, {
          draggable: "true",
        });
        $.post(
          "https://gfx-racing/UpdateMarker",
          JSON.stringify({
            x: position.lng,
            y: position.lat,
            id: marker.options.id,
          })
        );
      });
    }
  }
};

$(document).on("click", ".leavebtn", function () {
  $.post("https://gfx-racing/leaverace", JSON.stringify({}));
});

$(document).on("click", ".routes-container", function () {
  id = $(this).attr("data");
  route = $(this).data("route");
  OpenRaceData("unknown", false, true, id);

  $.each(route, function (i, index) {
    L.marker([index.y, index.x], { icon: customIcon(1) })
      .addTo(mymap)
      .bindPopup("Route");
  });
});

$(document).on("click", ".annountcement", function () {
  id = $(this).data("raceid");
  $.post("https://gfx-racing/JoinRace", JSON.stringify({ id: id }));
});

$(document).on("click", ".selectrouteindex", function () {
  id = $(this).attr("id");
  SelectRouteIndex(id);
});

$(document).on("click", ".joinrace", function () {
  if (raceid == 0) {
    return console.log("something went wrong");
  }
  $.post("https://gfx-racing/JoinRace", JSON.stringify({ id: raceid }));
});
$(document).on("click", ".racelist", function () {
  routes = $(this).data("routes");
  data = $(this).data("data");
  date = $(this).data("date");
  raceid = $(this).data("raceid");
  OpenRaceData(data, date);
  console.log(JSON.stringify(routes));
  $.each(routes, function (i, index) {
    console.log(index.y);
    L.marker([index.y, index.x], { icon: customIcon(1) })
      .addTo(mymap)
      .bindPopup("Route");
  });
});

$(document).on("click", ".showfirstpick", function () {
  var id = $(this).data("id");
  var x = Number($(this).data("x"));
  var y = Number($(this).data("y"));
  var price = $(this).data("price");
  var name = $(this).data("name");
  $(".gfx ")
    .find("[id=" + id + "]")
    .remove();
  if (toggleraces[id]) {
    L.marker([y, x], {
      icon: L.divIcon({
        iconSize: "auto",
        className: "gfx",
        html:
          `
                    <div class='showfirstpick flex items-center' id=` +
          id +
          `>
                        <div class="vectorfiled">
                            <img src='./images/vector.png'>
                        </div>
                        <div class="vectortextside">
                            <p>
                            ` +
          name +
          `
                            </p>
                        </div>
                    </div>
                `,
      }),
    }).addTo(mymap);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("id", id);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("x", x);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("y", y);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("price", price);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("name", name);
    toggleraces[id] = undefined;
  } else {
    L.marker([y, x], {
      icon: L.divIcon({
        iconSize: "auto",
        className: "gfx",
        html:
          `
            <div class='vectortextside-active showfirstpick' id=` +
          id +
          `>
            
            
             <div class="race-reward-contain">
                 <img src="images/cupreward.png" alt=""><p>` +
          price +
          `$</p>
             </div>
            
            <div class="vectorfield-contain">
                <div class="vectorfiled">
                    <img src='./images/vectoractive.png'>
                </div>
                <div class="vectortextside">
                    <p>
                    ` +
          name +
          `
                    </p>
                </div>
            </div>

            <div class="racejoin-way">
            
            <button class="racejoin-way-join" raceid=` +
          id +
          `><p>JOIN</p></button>
            </div>

            
            </div>
            `,
      }),
    }).addTo(mymap);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("id", id);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("x", x);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("y", y);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("price", price);
    $(".gfx")
      .find("[id=" + id + "]")
      .data("name", name);
    toggleraces[id] = true;
  }
});

$(document).on("click", ".racejoin-way-join", function () {
  raceidt = $(this).attr("raceid");
  $.post("https://gfx-racing/JoinRace", JSON.stringify({ id: raceidt }));
});

ShowRaceStarts = function () {
  $.each(ActiveRaces, function (i, index) {
    L.marker([index.route[0].y, index.route[0].x], {
      icon: L.divIcon({
        iconSize: "auto",
        className: "gfx",
        html:
          `
                    <div class='showfirstpick flex items-center' id=` +
          index.id +
          `>
                        <div class="vectorfiled">
                            <img src='./images/vector.png'>
                        </div>
                        <div class="vectortextside">
                            <p>
                            ` +
          index.data.Name +
          `
                            </p>
                        </div>
                    </div>
                `,
      }),
    }).addTo(mymap);
    $(".gfx")
      .find("[id=" + index.id + "]")
      .data("id", index.id);
    $(".gfx")
      .find("[id=" + index.id + "]")
      .data("x", index.route[0].x);
    $(".gfx")
      .find("[id=" + index.id + "]")
      .data("y", index.route[0].y);
    $(".gfx")
      .find("[id=" + index.id + "]")
      .data("price", index.data.Reward);
    $(".gfx")
      .find("[id=" + index.id + "]")
      .data("name", index.data.Name);
  });
};

SelectRouteIndex = function (id) {
  CheckList.Others.Route = id;
  $(".createraceleftcontainer").show();
  $(".racerspage").show();
  $(".homepage").hide();
  $(".routes-leftcontainer").hide();
  //$("#map").html("")
  $(".mappage").hide();
  ChangeInput("upd");
};

function isEmpty(str) {
  return !str.trim().length;
}

CreateRace = function () {
  if (
    CheckList.Others.Time &&
    CheckList.Others.Players &&
    CheckList.Others.Route &&
    CheckList.Name &&
    CheckList.Reward
  ) {
    $.post(
      "https://gfx-racing/CreateRace",
      JSON.stringify({
        data: CheckList,
        luadate: new Date(CheckList.Others.Time).getTime(),
      })
    );
    $("#range").val(0);
    $(".playerlength").html(0 + '<h1 class="input-desc">&nbsp;Players</h1>');
    $("#checklist-range").html('<img src="./images/bg-required.png">');
    $(".givename").html(`
        <div class="w-[8%] h-full flex justify-start items-center">
                                        <img src="./images/required.png">
                                    </div>
                                    <p style="color: white;">DE UM NOME A CORRIDA</p>
        `);
    $("#checklist-name").html('<img src="./images/bg-required.png">');
    $(".nameval").val("");
    $(".priceval").val("");
    $("#checklist-reward").html('<img src="./images/bg-required.png">');
    $(".setreward").html(`
        <div class="w-[8%] h-full flex justify-center items-center">
                                        <img src="./images/required.png">
                                    </div>
                                    <p style="color: white;">RECOMPENSA</p>
        `);
    $("#checklist-date").html('<img src="./images/bg-required.png">');
    $(".othersettings").html(`
            <div class="w-[8%] h-full flex justify-center items-center">
                                            <img src="./images/required.png">
                                        </div>
                                        <p style="color: white;">OUTRAS CONFIGURAÇÕES</p>
            `);
    $("#meeting-time").val("");
    CheckList.Name = false;
    CheckList.Reward = false;
    CheckList.Others.Time = false;
    CheckList.Others.Players = false;
    CheckList.Others.Route = false;
    $(".leftcontainer-main").show();
    $(".homepage").show();
    $(".createraceleftcontainer").hide();
    $(".racerspage").hide();
  } else {
    if (!CheckList.Others.Time) {
      SendNotification("Você precisa colocar uma data!", 2500);
    } else if (!CheckList.Others.Players) {
      SendNotification(
        "Você precisa colocar a quantidade de corredores!",
        2500
      );
    } else if (!CheckList.Others.Route) {
      SendNotification("Você precisa definir uma rota!", 2500);
    } else if (!CheckList.Name) {
      SendNotification("Você precisa colocar um nome na corrida!", 2500);
    } else if (!CheckList.Reward) {
      SendNotification("Você precisa colocar uma recompensa!", 2500);
    }
  }
};

ClearValues = function () {
  $("#checklist-name").html('<img src="./images/bg-required.png">');
  $(".givename").html(`
        <div class="w-[8%] h-full flex justify-start items-center">
                                        <img src="./images/required.png">
                                    </div>
                                    <p style="color: white;">DE UM NOME A CORRIDA</p>
    `);
};

CreateRoute = function () {
  val = $("#routename").val();
  if (isEmpty(val)) {
  } else {
    $.post("https://gfx-racing/AddRoute", JSON.stringify({ name: val }));
    RouteList = [];
    //CheckList.Name = false
    //CheckList.Reward = false
    //CheckList.Others.Time = false
    //CheckList.Others.Players = false
    //CheckList.Others.Route = false
  }
};

SetRaceInfo = function (data, date, isroute, id) {
  if (isroute) {
    $("#map").append(
      `
                <div id="desc-side-map">
                    <div class="w-full h-full flex gap-1 justify-end">
                        <div class="w-full h-full flex justify-center items-center selectrouteindex" id=` +
        id +
        ` style="border: 1px solid rgba(255, 255, 255, 0.16); background:rgba(0, 0, 0, 0.44); border-radius: 0.3vw; color:rgba(254, 57, 103, 0.692); font-size:2.2vh;">
                            SELECIONAR ROTA
                        </div>
                    </div>
                </div>
        `
    );
  } else {
    $("#map").append(
      `
        <div id="descriptionmap" style="-webkit-box-shadow: -2px -1px 120px -5px #C72F4D;; -moz-box-shadow: -2px -1px 120px -5px #C72F4D;; box-shadow: -2px -1px 120px -5px #C72F4D;;">
                                        <div class="race-name mt-1 ml-2 w-full h-[30%]">
                                            ` +
        data.Name +
        `
                                        </div>
                                        <div class="flex w-full h-[30%] mt-3 race-time items-center ml-2" >
                                            ATIVO | <p>&nbsp;` +
        date +
        `</p>
                                        </div>
                                    </div>
                                    <div id="desc-side-map">
                                        <div class="w-full h-full flex gap-1 justify-end">
                                        <!--  -->
                                        <div class="w-[50%] h-full flex justify-center items-center gap-2 " style="background: linear-gradient(266.34deg, rgba(6, 6, 6, 0.727) -5.87%, rgba(0, 0, 0, 0.411) 89.42%);">
                                            <img src="./images/sun.png" style="object-fit: contain;">
                                            <p style="font-size: 1.8vh;" class="mr-1">50°</p>
                                        </div>
                                        <div class="w-[25%] h-full flex justify-center items-center" style="border: 1px solid rgba(255, 255, 255, 0.16); background:rgba(0, 0, 0, 0.44); border-radius: 0.3vw;">
                                            <img src="./images/bg-w.png">
                                        </div>
                                        <div class="w-[25%] h-full flex justify-center items-center joinrace"  style="border: 1px solid rgba(255, 255, 255, 0.16); background:rgba(0, 0, 0, 0.44); border-radius: 0.3vw; color:rgba(254, 57, 103, 0.692); font-size:2.2vh;">
                                        <i class="fas fa-sign-in-alt"></i>
                                        </div>
                                        </div>
    
                                    </div>
                                    
        `
    );
  }
};

$(document).on("keydown", function () {
  switch (event.keyCode) {
    case 27: // ESC
      opened = false;
      $(".screen").fadeOut(300);
      $.post("https://gfx-racing/CloseUi", JSON.stringify({}));
      break;
    case 113: // ESC
      opened = false;
      $(".screen").fadeOut(300);
      $.post("https://gfx-racing/CloseUi", JSON.stringify({}));
      break;
  }
});
