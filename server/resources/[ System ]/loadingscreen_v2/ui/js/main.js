const convertValue = (value, oldMin, oldMax, newMin, newMax) => {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  const newValue = ((value - oldMin) * newRange) / oldRange + newMin;
  return newValue;
};

$(document).ready(function () {
  let daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  let CurrentDayOfWeek = new Date().getDay();
  let CurrentHour = new Date().getHours();
  let CurrentMinute = new Date().getMinutes();
  let CurrentMonth = new Date().getMonth() + 1;
  let CurrentDay = new Date().getDate();
  let CurrentYear = new Date().getFullYear();

  let hours = CurrentHour + ":" + CurrentMinute;
  let fullYear = CurrentDay + "/" + CurrentMonth + "/" + CurrentYear;
  let day = daysOfWeek[CurrentDayOfWeek];

  $(".date-time").text(day + ", " + hours + ", " + fullYear);

  $(document).on("click", ".gallery .img img", function () {
    var src = $(this).attr("src");
    $(".img-box img").attr("src", src);
    $(".img-box").fadeIn(150);
  });

  $(document).on("click", ".img-box", function () {
    $(this).fadeOut(150);
  });

  $(document).on("click", "#gallery-prev", function () {
    var leftPos = $(".gallery").scrollLeft();
    $(".gallery").animate({ scrollLeft: leftPos - 244.39 }, 244.39);
  });

  $(document).on("click", "#gallery-next", function () {
    var leftPos = $(".gallery").scrollLeft();
    $(".gallery").animate({ scrollLeft: leftPos + 244.39 }, 244.39);
  });

  $("#music-sound").on("input", function () {
    $("#input-bg-sound").css("width", $(this).val() + "%");
  });

  $("#music-time").on("input", function () {
    $("#input-bg-time").css("width", $(this).val() + "%");
  });

  $("#staff-box").html("");
  $("#update-box").html("");
  $("#new-box").html("");
  $("#gallery-box").html("");

  let staffs = Object.values(Config.Staffs);
  let updates = Object.values(Config.Updates);
  let news = Object.values(Config.News);
  let gallery = Object.values(Config.Gallery);

  staffs.forEach((staff) => {
    $("#staff-box").append(`
            <div class="user-wrapper">
                <div class="image-wrapper">
                    <img src="assets/polygon.png" class="polygon">
                    <img src="assets/${staff.profilePicture}" class="pp">
                </div>
                <div class="user-content">
                    <div class="nickname-wrapper">
                        <div class="title">Apelido</div>
                        <div class="subtitle ${staff.rank}">${staff.rankLabel} <img src="assets/${staff.rank}.png"></div>
                    </div>
                    <div class="name">${staff.name}</div>
                </div>
            </div>
        `);
  });

  updates.forEach((update) => {
    $("#update-box").append(`
            <div class="update-wrapper">
                <div class="icon"><img src="assets/update-icon.png"></div>
                <div class="cont">
                    <div class="title-wrapper">
                        <div class="subtitle">${update.date}</div>
                        <div class="title">${update.title}</div>
                    </div>
                    <div class="text">${update.text}</div>
                </div>
            </div>
        `);
  });

  news.forEach((neww) => {
    $("#new-box").append(`
            <div class="new-wrapper">
                <div class="icon"><img src="assets/news-icon.png"></div>
                <div class="cont">
                    <div class="title-wrapper">
                        <div class="subtitle">${neww.date}</div>
                        <div class="title">${neww.title}</div>
                    </div>
                    <div class="text">${neww.text}</div>
                </div>
            </div>
        `);
  });

  gallery.forEach((img) => {
    $("#gallery-box").append(`
            <div class="img">
                <img src="assets/gallery/${img}">
            </div>
        `);
  });

  $(window).on("message", function ({ originalEvent: e }) {
    switch (e.data.eventName) {
      case "loadProgress":
        $(".bottom").css(
          "stroke-dashoffset",
          convertValue(
            (e.data.loadFraction * 100).toFixed(0),
            0,
            100,
            102.5,
            0
          ) + "vh"
        );
        $("#percent").text((e.data.loadFraction * 100).toFixed(0) + "%");
        break;
    }
  });

  playAudio(0);
});

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    events: {
      onReady: onPlayerReady,
    },
  });
}

let interval;
function onPlayerReady() {
  player.mute();
}

function secondsToDuration(sec) {
  return `${Math.floor(sec / 60)
    .toString()
    .padStart(2, "0")}:${Math.round(sec % 60)
    .toString()
    .padStart(2, "0")}`;
}

let musics = Object.values(Config.Musics);
let audio = null;
let audioId = -1;
let audioInterval = null;
let audioTime = 0;

function playAudio(id) {
  stopAudio();

  const music = musics[id];

  if (music) {
    audio = new Audio(music.audio);
    audio.volume = $("#music-sound").val() / 100;

    resumeAudio();

    audioId = id;
    audioInterval = setInterval(() => {
      $("#music-time-text p").text(secondsToDuration(audio.duration));
      $("#music-time-text span").text(secondsToDuration(audio.currentTime));
      $("#music-time").val(
        convertValue(audio.currentTime, 0, audio.duration, 0, 100)
      );
      $("#input-bg-time").width(
        convertValue(audio.currentTime, 0, audio.duration, 0, 100) + "%"
      );
    }, 500);

    $("#music-name").text(music.title);
    $("#music-image").attr("src", music.image);
  }
}

function stopAudio() {
  if (audio) {
    audio.pause();

    clearInterval(audioInterval);

    audio = null;
    audioId = -1;
    audioInterval = null;

    $("#music-name").text("Not Playing");
  }
}

function pauseAudio() {
  if (audio) {
    audio.pause();

    $("#play").show();
    $("#pause").hide();
  }
}

function resumeAudio() {
  if (audio) {
    audio.play();

    $("#play").hide();
    $("#pause").show();
  } else {
    playAudio(0);
  }
}

function nextSong(prev) {
  if (audio) {
    prev ? audioId-- : audioId++;

    if (audioId >= musics.length) audioId = 0;
    else if (audioId < 0) audioId = musics.length - 1;

    playAudio(audioId);

    $("#music-time-text span").text(secondsToDuration(audio.currentTime));
    $("#music-time").val(
      convertValue(audio.currentTime, 0, audio.duration, 0, 100)
    );
    $("#input-bg-time").width(
      convertValue(audio.currentTime, 0, audio.duration, 0, 100) + "%"
    );
  }
}

$(function () {
  $("#play").click(() => resumeAudio());
  $("#pause").click(() => pauseAudio());
  $("#next").click(() => nextSong());
  $("#prev").click(() => nextSong(true));

  $("#music-time").on("change", function () {
    audio.seek(convertValue($(this).val(), 0, 100, 0, audio.duration()));
  });
});

$("#music-time").on("input", function () {
  if (audio) {
    audio.currentTime = convertValue($(this).val(), 0, 100, 0, audio.duration);
    $("#music-time-text p").text(secondsToDuration(audio.duration));
    $("#music-time-text span").text(secondsToDuration(audio.currentTime));
    $("#input-bg-time").width(
      convertValue(audio.currentTime, 0, audio.duration, 0, 100) + "%"
    );
  }
});

$("#music-sound").on("input", function () {
  if (audio) {
    audio.volume = $(this).val() / 100;
    $("#input-bg-sound").width($(this).val() + "%");
  }
});
