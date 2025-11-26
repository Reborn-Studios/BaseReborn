var ppl_h = [];
var ppl_all = [];
var cur_id = null;
let actualPage = 1;
let MAX_QUANTITY = 40;

$(window).ready(function () {
  window.addEventListener("message", (event) => {
    let data = event.data;
    switch (data.action) {
      case "init":
        __init__(data);
        break;
      // case "update":
      //   __init__(data);
      //   break;
      case "openHousePainel":
        __housePainel__(data.quantity);
        break;
      case "addHousePaiel":
        __addHousePainel__(data.data, data.index);
        break;
      case "manage":
        __manage__(data);
        break;
      case "close":
        $(".container").hide("fade");
        $(".manage").hide("fade");
        setTimeout(() => {
          $(".container").css("display", "none");
        }, 500);
        $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
        break;
    }
  });
});
$(document).on("keydown", function () {
  switch (event.keyCode) {
    case 27:
      _c_();
      break;
  }
});
$(document).ready(function () {
  $(document).on("click", "a", function () {
    __click_($(this));
  });
  $(document).on("click", "w", function () {
    __click_($(this));
  });
});

const formatPrice = (price) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const setLocation = (index) => {
  $.post("https://will_homes/setLocation", JSON.stringify({ index }));
};

const requestPageHouses = async (page) => {
  $(".pageHouses").html(
    `<div class="loading-container">
      <img src="./svg/loading.svg" alt="loading" class="spin-anim" />
    </div>`
  );
  $(".pagination").html("");
  await __wait__(500);
  $(".pageHouses").html("");
  actualPage = Number(page);
  $.post(
    "https://will_homes/requestHouses",
    JSON.stringify({ pagination: actualPage }),
    function (x) {
      for (let i = 0; i < x.houses.length; i++) {
        __addHousePainel__(x.houses[i], x.houses[i].index);
      }
    }
  );
  refreshPagination();
};

const refreshPagination = () => {
  for (let index = 0; index < MAX_QUANTITY; index++) {
    if (actualPage == index + 1) {
      $(".pagination").append(`<div class="selectedPage">${index + 1}</div>`);
    } else {
      $(".pagination").append(
        `<div class="page" onclick="requestPageHouses('${index + 1}')">${
          index + 1
        }</div>`
      );
    }
  }
};

__housePainel__ = (quantity) => {
  $(".housesMain").fadeIn(500);
  MAX_QUANTITY = quantity;
  requestPageHouses(actualPage);
};

__addHousePainel__ = (x, index) => {
  $(".pageHouses").append(`
    <div class="housecard">
      <img src="./interiors/${x.photo || x.theme}.png" alt="${x.theme}" />
      <div class="title">${x.name}</div>
      <ul>
        <li>${formatPrice(x.price)}</li>
        <li>${x.garage ? "Possui garagem" : "Não possui garagem"}</li>
      </ul>
      <div class="starscard-${index}"></div>
      <button class="loc" onclick="setLocation('${index}')">
        <img src="./svg/location.svg" alt="" style="width: 1vw;height: 2vh;" />
        <span>Localização</span>
      </button>
    </div>
  `);
  for (let i = 0; i < x.stars; i++) {
    // $(`.starscard-${index}`).append(`<i class="fas fa-star star"></i>`);
    $(`.starscard-${index}`).append(
      `<img src="./svg/star.svg" style="width: 1vw;height: 2vh;" class="star" />`
    );
  }
  for (let i = 0; i < 5 - x.stars; i++) {
    // $(`.starscard-${index}`).append(`<i class="fas fa-star nostar"></i>`);
    $(`.starscard-${index}`).append(
      `<img src="./svg/nostar.svg" style="width: 1vw;height: 2vh;" class="nostar" />`
    );
  }
};

__init__ = (x) => {
  house = x.house;
  $(".container").show("fade");
  $(".bg").show("fade");
  $(".buy").show("fade");
  $("#h_sell").css("display", "block");
  $("#h_transfer").css("display", "block");
  $(".manage").hide("fade");
  $(".buttons").css("display", "block");
  $("#h_no").html(house.id);
  cur_id = house.id;
  $(".stars").html("");
  $("#h_who").html(house.who);
  if (house.theme) {
    $(".ev").css("background", `url(./interiors/${house.theme}.png)`);
  } else {
    $(".ev").css("background", `url(./interiors/modern.png)`);
  }
  $(".ev").css("background-size", "cover");
  if (house.tax) {
    const date = Date.now() / 1000;
    const seconds = house.tax - date;
    const days = Math.round(seconds / 3600 / 24);
    if (days <= 0) {
      const taxButton = `<div class="tax-button"><a href="#" style="background:#dd4d38;margin:10px;" data-info="pay-tax">Pagar taxa</a></div>`;
      $("#info_tax").html("ATRASADO" + taxButton);
    } else {
      $("#info_tax").html(`${days} Dias`);
    }
  }
  /* for (let i = 0; i < house.stars; i++) {
    $(".stars").append(`<i class="fas fa-star star"></i>`);
  }
  for (let i = 0; i < 5 - house.stars; i++) {
    $(".stars").append(`<i class="fas fa-star nostar"></i>`);
  } */
  for (let i = 0; i < house.stars; i++) {
    $(".stars").append(
      `<img src="./svg/star.svg" style="width: 1vw;height: 2vh;" class="star" />`
    );
  }
  for (let i = 0; i < 5 - house.stars; i++) {
    $(".stars").append(
      `<img src="./svg/nostar.svg" style="width: 1vw;height: 2vh;" class="nostar" />`
    );
  }
  if (house.garage == true) {
    $("#h_gp").html("Disponível");
  } else {
    $("#h_gp").html("Indisponível");
  }
  $("#h_price").html("R$" + house.numco);
  if (house.owner != house.curidf) {
    $("#h_sell").css("display", "none");
    $("#h_transfer").css("display", "none");
    $(".buttons").css("display", "none");
  } else {
    $("#h_buy").css("display", "none");
    $("#h_visit").css("display", "none");
    $("#h_friends").css("display", "inline-block");
  }
  if (house.owner == 0) {
    $("#h_sell").css("display", "none");
    $("#h_transfer").css("display", "none");
    $(".buttons").css("display", "none");
    $("#h_buy").css("display", "block");
    $("#h_visit").css("display", "block");
  } else if (house.infoauth == "friend") {
    $(".buttons").css("display", "block");
    $("#h_buy").css("display", "none");
    $("#h_visit").css("display", "none");
    $("#h_sell").css("display", "none");
    $("#h_transfer").css("display", "none");
    $(".tax-button").css("display", "none");
    $("#h_friends").css("display", "none");
  }
  $("#h_sell_price").html("R$" + house.price.toLocaleString());
};

__click_ = async (x) => {
  switch (x.data("info")) {
    case "close-modal":
      $(".modal").hide("fade");
      setTimeout(() => {
        $(".modal").css("display", "none");
      }, 500);
      $(".sellmodal").hide("fade");
      setTimeout(() => {
        $(".sellmodal").css("display", "none");
      }, 500);
      $(".transfermodal").hide("fade");
      setTimeout(() => {
        $(".transfermodal").css("display", "none");
      }, 500);
      break;
    case "buy-house":
      await __loading__();
      $(".container").show("fade");
      setTimeout(() => {
        $(".modal").css("display", "block");
      }, 500);
      break;
    case "pay-tax":
      await __loading__();
      $.post(
        "https://will_homes/updateTax",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "visit-house":
      await __loading__();
      $(".modal").hide("fade");
      $(".manage").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
      }, 500);
      $.post(
        "https://will_homes/visit",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "with-cash":
      await __loading__();
      $(".modal").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
        $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
      }, 500);
      $.post(
        "https://will_homes/tryBuy",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "with-gems":
      await __loading__();
      $(".modal").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
        $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
      }, 500);
      $.post(
        "https://will_homes/tryBuyGems",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "sell-house":
      await __loading__();
      $(".sellmodal").show("fade");
      setTimeout(() => {
        $(".sellmodal").css("display", "block");
      }, 500);
      break;
    case "sell-with-money":
      await __loading__();
      $(".sellmodal").hide("fade");
      setTimeout(() => {
        $(".sellmodal").css("display", "none");
      }, 500);
      $.post(
        "https://will_homes/trySell",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "transfer-house":
      await __loading__();
      $(".transfermodal").show("fade");
      setTimeout(() => {
        $(".transfermodal").css("display", "block");
      }, 500);
      break;
    case "transfer-home":
      await __loading__();
      $(".transfermodal").hide("fade");
      setTimeout(() => {
        $(".transfermodal").css("display", "none");
      }, 500);
      const nuser_id = $("#transfer-user").val();
      $.post(
        "https://will_homes/tryTransfer",
        JSON.stringify({ id: cur_id, nuser_id }),
        function (x) {}
      );
      break;
    case "home":
      await __loading__();
      $(".container").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
      }, 500);
      $.post(
        "https://will_homes/enterHouse",
        JSON.stringify({ id: cur_id }),
        function (x) {}
      );
      break;
    case "theme":
      $.post(
        "https://will_homes/changeTheme",
        JSON.stringify({ id: cur_id, theme: $(x).data("theme") }),
        function (x) {}
      );
      await __loading__();
      $(".container").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
      }, 500);
      $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
      break;
    case "close_":
      $(".container").hide("fade");
      $(".manage").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
      }, 500);
      $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
      break;
    case "table":
      tid = $(x).data("theme");
      await __loading__();
      $(".container").hide("fade");
      setTimeout(() => {
        $(".container").css("display", "none");
      }, 500);
      $.post(
        "https://will_homes/table",
        JSON.stringify({ tid: tid, turl: $("#u_" + tid).val() }),
        function (x) {}
      );
      $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
      break;
    case "walls_":
      $(".tables").hide("fade");
      await __wait__(500);
      $(".walls").show("fade");
      break;
    case "tables_":
      $(".walls").hide("fade");
      await __wait__(500);
      $(".tables").show("fade");
      break;
    case "friends":
      $(".friends").show("fade");
      $.post(
        "https://will_homes/GetPlayers",
        JSON.stringify({ id: cur_id }),
        function (data) {
          ppl_all = data.all;
          ppl_h = data.house;
          $("#all").html("");
          $("#friends").html("");
          $.each(ppl_all, function (i, v) {
            $("#all").append(
              `<a class="pl" data-info="add-house-f" data-id="${v.id}" data-name="${v.name}" >${v.name} <i class="fa-thin fa-plus"></i></a>`
            );
          });
          $.each(ppl_h, function (i, v) {
            $("#friends").append(
              `<a class="pl" data-info="remove-house-f" data-id="${v.id}" data-name="${v.name}" >${v.name} <i class="fa-thin fa-minus"></i></a>`
            );
          });
        }
      );
      break;
    case "add-house-f":
      xid = $(x).data("id");
      xname = $(x).data("name");
      $.post(
        "https://will_homes/AddFriends",
        JSON.stringify({ id: cur_id, pid: xid, name: xname }),
        function (data) {}
      );
      $("#friends").append(
        `<a class="pl" data-info="remove-house-f" data-id="${xid}" data-name="${xname}"  >${xname} <i class="fa-thin fa-minus"></i></a>`
      );
      x.remove();
      break;
    case "remove-house-f":
      xid = $(x).data("id");
      xname = $(x).data("name");
      $.post(
        "https://will_homes/RemoveFriends",
        JSON.stringify({ id: cur_id, pid: xid, name: xname }),
        function (data) {}
      );
      $("#all").append(
        `<a class="pl" data-info="add-house-f" data-id="${xid}" data-name="${xname}"  >${xname} <i class="fa-thin fa-plus"></i></a>`
      );
      x.remove();
      break;
    case "close-and-save":
      $(".friends").hide("fade");
      $.post(
        "https://will_homes/StreamFriends",
        JSON.stringify({ id: cur_id }),
        function (data) {}
      );
      break;
  }
};

_c_ = () => {
  $(".container").hide("fade");
  $(".manage").hide("fade");
  $(".buy").hide("fade");
  $(".bg").hide("fade");
  $(".sellmodal").hide("fade");
  $(".friends").hide("fade");
  setTimeout(() => {
    $(".container").css("display", "none");
    $(".housesMain").css("display", "none");
  }, 500);
  $.post("https://will_homes/close", JSON.stringify({}), function (x) {});
};

__loading__ = async () => {
  return new Promise((res) => {
    $(".loading").show("fade");
    setTimeout(() => {
      $(".loading").css("display", "block");
    }, 150);
    setTimeout(() => {
      $(".loading").hide("fade");
      setTimeout(() => {
        $(".loading").css("display", "none");
        res("done");
      }, 150);
    }, 1000);
  });
};

__wait__ = async (x) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("done");
    }, x);
  });
};

__manage__ = (x) => {
  house = x.house;
  cur_id = house.id;
  $(".container").show("fade");
  $(".buy").hide("fade");
  $(".manage").show("fade");
  $(".scrl").html("");
  $.each(x.theme, function (i, v) {
    $(".scrl").append(
      `<div class="wall" style="background: url(./interiors/${i}.png);background-size: cover;"><a data-info="theme" data-theme="${i}" href="#">Selecionar</a></div>`
    );
  });
  $(".scrl").append(`
        <div class="button-container">
            <div class="button"><i class="fas fa-angle-left"></i></div>
            <div class="button"><i class="fas fa-angle-right"></i></div>
        </div>
    `);
  fixImages();
};

function fixImages() {
  const slides = document.querySelectorAll(".wall");
  const button = document.querySelectorAll(".button");

  let current = 0;
  let prev = 4;
  let next = 1;

  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () =>
      i == 0 ? gotoPrev() : gotoNext()
    );
  }

  const gotoPrev = () =>
    current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

  const gotoNext = () => (current < 4 ? gotoNum(current + 1) : gotoNum(0));

  const gotoNum = (number) => {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      slides[i].classList.remove("prev");
      slides[i].classList.remove("next");
    }

    if (next == 5) {
      next = 0;
    }

    if (prev == -1) {
      prev = 4;
    }

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
  };
}
