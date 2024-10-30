/* ---------------------------------------------------------------------------------------------------------------- */
$(document).ready(function () {
  window.addEventListener("message", function (event) {
    if (event["data"]["tencode"] == true) {
      $("#divCode").css("display", "block");
    }

    if (event["data"]["tencode"] == false) {
      $("#divCode").css("display", "none");
    }

    if (event["data"]["radar"] == true) {
      $("#topRadar").css("display", "block");
      $("#botRadar").css("display", "block");
    }

    if (event["data"]["radar"] == false) {
      $("#topRadar").css("display", "none");
      $("#botRadar").css("display", "none");
    }

    if (event["data"]["radar"] == "top") {
      $("#topRadar").html(
        "<legend>RADAR DIANTEIRO</legend><c>PLACA:</c> " +
          event["data"]["plate"] +
          "<br><c>MODELO:</c> <v>" +
          event["data"]["model"] +
          "</v><br><c>VELOCIDADE:</c> " +
          parseInt(event["data"]["speed"]) +
          " KMH"
      );
    }

    if (event["data"]["radar"] == "bot") {
      $("#botRadar").html(
        "<legend>RADAR TRASEIRO</legend><c>PLACA:</c> " +
          event["data"]["plate"] +
          "<br><c>MODELO:</c> <v>" +
          event["data"]["model"] +
          "</v><br><c>VELOCIDADE:</c> " +
          parseInt(event["data"]["speed"]) +
          " KMH"
      );
    }

    if (event["data"]["freeze"] == true) {
      $("#freezeRadar").css("display", "block");
    }

    if (event["data"]["freeze"] == false) {
      $("#freezeRadar").css("display", "none");
    }

    if (event["data"]["name"] === "DeathScreen") {
      if (event["data"]["payload"]) {
        $("#deathscreen").fadeIn(500);
      } else {
        $("#deathscreen").fadeOut(500);
      }
    }
    if (event["data"]["name"] === "UpdateDeathScreen") {
      const minutes = Math.floor(event["data"]["payload"] / 60);
      const seconds = event["data"]["payload"] - minutes * 60;

      if (minutes > 0) {
        if (minutes > 9) {
          $(".timer1").html(minutes.toString()[0]);
          $(".timer2").html(minutes.toString()[1]);
        } else {
          $(".timer1").html("0");
          $(".timer2").html(minutes.toString());
        }
      } else {
        $(".timer1").html("0");
        $(".timer2").html("0");
      }
      if (seconds > 9) {
        $(".timer3").html(seconds.toString()[0]);
        $(".timer4").html(seconds.toString()[1]);
      } else {
        $(".timer3").html("0");
        $(".timer4").html(seconds.toString());
      }
    }
  });

  document.onkeyup = function (data) {
    if (data["which"] == 27) {
      $.post("http://Controller/closeSystem");
    }
  };
});
/* ---------------------------------------------------------------------------------------------------------------- */
const clickCode = (data) => {
  $.post("http://Controller/sendCode", JSON.stringify({ code: data }));
};
