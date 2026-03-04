let pickedvehs = [];
let lastimpound;

$(document).ready(function () {
  $("#searchvehicle").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".selectedvehicle  .vehiclemodel").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  document.onkeydown = function (data) {
    if (data.which == 27) {
      $(".joinMenu").fadeOut(500);
      $(".container").css("display", "none");
      closepage();
      lastplate = null;
      document.querySelectorAll(".vehiclemodel").forEach(function (a) {
        a.remove();
      });
      $.post("https://will_garages_v2/closepage", JSON.stringify({}));
      $(".vehicleOptionMenu").css("display", "none");
    }
  };
});

window.addEventListener("message", function (event) {
  var data = event.data;
  pickedvehs = [];
  if (data.action == "open") {
    closepage();

    $(".container").css("display", "block");
    if (data.sellcar == false) {
      $(".sellprice").css("display", "none");
    } else {
      $(".sellprice").css("display", "flex");
    }
    if (data.transferCar == false) {
      $(".transfer").css("display", "none");
    } else {
      $(".transfer").css("display", "flex");
    }
    if (data.delNearVeh == false) {
      $(".delNearVeh").css("display", "none");
    } else {
      $(".delNearVeh").css("display", "block");
    }

    $(".selectedvehicle").append(
      `
          <div class="vehiclemodel" data-garage="${data.garage}" data-plate="${data.plate}" data-impound="${data.impound}" data-damage = "${data.damage}" data-carmodel = "${data.model}" data-stored = "${data.stored}" data-body = "${data.body}" data-fuellevel = "${data.fuellevel}"  data-fiyat="${data.vehicleprice}">
            <img class="hoverpng" src="https://api.rebornsystem.com.br/garages_v2/hower.png" alt="">
            <img class="hovergri" src="https://api.rebornsystem.com.br/garages_v2/howergri.png" alt="">
            <div class="vehicleimage">
              <img src="${data.directory}/${data.photo}.png" onerror="this.onerror=null;this.src='https://api.rebornsystem.com.br/garages_v2/noveh.png';">
            </div>
            <h3 class="deneme" >${data.brand}</h3>
            <h2 >${data.name}</h2>
            <div class="spawnselectcar"> Selecionar </div>
            <div class="spawncar">Retirar Veículo</div>
            <div class="deletecar">Guardar Veículo</div>
          </div> 
      `,
    );
  } else if (data.action == "notify") {
    notify(data.message, data.type);
  } else if (data.action == "reset") {
    $(".selectedvehicle").html("");
  } else if (data.action == "joinMenu") {
    openJoinMenu(data);
  } else if (data.action == "close") {
    $(".container").css("display", "none");
    $.post("https://will_garages_v2/closepage", JSON.stringify({}));
    lastplate = null;
    document.querySelectorAll(".vehiclemodel").forEach(function (a) {
      a.remove();
    });
    $(".vehicleOptionMenu").css("display", "none");
  } else if (data.action == "openMenu") {
    openVehicleOptions(data);
  } else if (data.action == "admMenu") {
    $(".adminMenu").fadeIn(500);
    $("#garageInitBlip").html(
      data.startCoords.map((cds) => cds.toFixed(2)).join(", "),
    );
  } else if (data.action == "closeAdmMenu") {
    $(".adminMenu").fadeOut(500);
  }
});

$(document).on("click", "#getCoordinates", () => {
  $(".adminMenu").fadeOut(500);
  $.post(
    "https://will_garages_v2/getVehicleSpawn",
    JSON.stringify({}),
    function (data) {
      if (data && data.coords) {
        $(".adminMenu").fadeIn(500);
        data.coords.map((cds) => cds.toFixed(2));
        console.log(data.coords.map((cds) => cds.toFixed(2)).join(", "));
        $("#panelCoordinatesInput").attr(
          "value",
          data.coords.map((cds) => cds.toFixed(2)).join(", "),
        );
      }
    },
  );
});

function registerGarage() {
  const garageName = $("#garageName").val();
  const garagePayment = $("#garagePayment").val();
  const garagePerm = $("#garagePerm").val();
  const garageInitBlip = $("#garageInitBlip").html();
  const garagetype = $("#garagetype option:selected").val();
  const garageinterior = $("#garageinterior option:selected").val();
  const panelCoordinatesInput = $("#panelCoordinatesInput").val();
  $(".adminMenu").fadeOut(500);
  $.post(
    "https://will_garages_v2/registerGarage",
    JSON.stringify({
      garageName,
      garagePayment,
      garagePerm,
      garageInitBlip,
      garagetype,
      garageinterior,
      panelCoordinatesInput,
    }),
  );
}

function openJoinMenu(data) {
  $("#garageimg").attr(
    "src",
    `https://api.rebornsystem.com.br/garages_v2/${data.img}`,
  );
  $(".joinMenu").fadeIn(500);
}

$(document).on("click", "#submitMenu", () => {
  const id = $("#inputGarage").val();
  $.post("https://will_garages_v2/joinGarage", JSON.stringify({ id }));
  $(".joinMenu").fadeOut(500);
});

$(document).on("click", ".delNearVeh", () => {
  $(".container").css("display", "none");
  $.post("https://will_garages_v2/closepage", JSON.stringify({}));
  $.post("https://will_garages_v2/delNearVeh", JSON.stringify({}));
  document.querySelectorAll(".vehiclemodel").forEach(function (a) {
    a.remove();
  });
});

$(document).ready(function () {
  $("#inputGarage").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    if (value && value !== "") {
      $("#submitMenu").html("Campainha");
    } else {
      $("#submitMenu").html("Entrar");
    }
  });
});

$(document).on("click", "#veh-option-button", function () {
  $(".container").css("display", "none");
  $(".vehicleOptionMenu").css("display", "none");
  $.post("https://will_garages_v2/closepage", JSON.stringify({}));
  document.querySelectorAll(".vehiclemodel").forEach(function (a) {
    a.remove();
  });
  $.post(
    "http://will_garages_v2/carsPicked",
    JSON.stringify({
      vehicles: pickedvehs,
    }),
  );
});

function openVehicleOptions(data) {
  $(".vehicleOptionMenu").css("display", "block");
  const { vehicles, imgDiret } = data;
  $(".vehicleOptions").empty();
  for (const veh of vehicles) {
    list_item = `
      <li class="veh-option" data-veh="${veh.name}">          
        <h3>${veh.vname}</h3>
        <img src="${imgDiret}/${veh.name}.png" alt="${veh.vname}" onerror="this.onerror=null;this.src='https://api.rebornsystem.com.br/garages_v2/noveh.png';">
        <p>Selecionar</p>
      </li>
      `;
    $(".vehicleOptions").append(list_item);
  }
  $(".veh-option").click(function () {
    const carname = $(this).attr("data-veh");
    let isActive = $(this).hasClass("active");
    if (!isActive) {
      $(this).addClass("active");
      $(this).children("p").html("Retirar");
      pickedvehs.push(carname);
    } else {
      $(this).removeClass("active");
      $(this).children("p").html("Selecionar");
      const index = pickedvehs.indexOf(carname);
      if (index > -1) {
        pickedvehs.splice(index, 1);
      }
    }
  });
}

function closepage() {
  $(".vehicleprice").css("display", "none");
  $(".priceyes").css("display", "none");
  $(".transferyes").css("display", "none");
  $(".platevehicle").css("display", "none");
  $(".damagevehicle").css("display", "none");
  $(".bodyhealth").css("display", "none");
  $(".spawncar").css("display", "none");
  $(".deletecar").css("display", "none");
}

function openPage() {
  $(".vehicleprice").css("display", "block");
  $(".bodyhealth").css("display", "block");
  $(".platevehicle").css("display", "block");
  $(".damagevehicle").css("display", "block");
  $(".spawnselectcar").css("display", "block");
  $(".spawncar").css("display", "none");
  $(".deletecar").css("display", "none");
}

let lastplate;
let lastprice;
let laststored;
let lastmodel;

$(document).on("click", ".spawnselectcar", function () {
  openPage();
  let plate = $(this).parent().attr("data-plate");
  let damage = $(this).parent().attr("data-damage");
  let vehicleprice = $(this).parent().attr("data-fiyat");
  let bodydamage = $(this).parent().attr("data-body");
  let stored = $(this).parent().attr("data-stored") || 0;
  let model = $(this).parent().attr("data-carmodel");
  let impounds = $(this).parent().attr("data-impound");
  let garage = $(this).parent().attr("data-garage");
  lastmodel = model;
  laststored = stored;
  let damagee = parseInt(damage);
  $(".hoverpng").css("display", "none");
  $(".hovergri").css("display", "block");
  $(".hoverpng").css("transform", "scale(0.5)");
  let image = $(this).parent().find(".hoverpng");
  let damageee = damagee.toFixed(0);
  let fuellevel = $(this).parent().attr("data-fuellevel");
  let fuell = parseInt(fuellevel);
  let fuelll = fuell.toFixed(0);
  lastplate = plate;
  lastprice = vehicleprice;
  $(".vehicleprice").text("$ " + vehicleprice);
  $(".platevehicle").text(plate);
  let bodyy = parseInt(bodydamage);
  let body = bodyy.toFixed(0);
  $(".bodyhealth").text(Number(body) / 10 + "% ");
  $(".damagevehicle").text(Number(damageee) / 10 + "%");
  $(".fuellevel").text(fuelll);
  let selectedCar = $(this).parent().find(".spawnselectcar");
  selectedCar.css("display", "none");
  if (impounds == "true") {
    laststored = 0;
    if (garage) {
      $(".stored").text(garage);
    } else {
      $(".stored").text("Retirado");
    }
    let deletecar = $(this).parent().find(".deletecar");
    deletecar.css("display", "block");
    $(".vehiclestoredpng").attr(
      "src",
      "https://api.rebornsystem.com.br/garages_v2/outveh.png",
    );
  } else {
    laststored = 1;
    $(".stored").text("Estacionado");
    let spawnCar = $(this).parent().find(".spawncar");
    spawnCar.css("display", "block");
    $(".vehiclestoredpng").attr(
      "src",
      "https://api.rebornsystem.com.br/garages_v2/park.png",
    );
  }

  image.css("display", "block");
  setTimeout(function () {
    image.css("transform", "scale(1.0)");
  }, 10);
});

$(document).on("click", ".spawncar", function () {
  if (laststored == "0") {
    notify("O carro não está na garagem", "error");
  } else {
    $.post(
      "https://will_garages_v2/spawnvehicle",
      JSON.stringify({ plate: lastplate, model: lastmodel }),
    );
    $(".container").css("display", "none");
    $.post("https://will_garages_v2/closepage", JSON.stringify({}));
    lastplate = null;
    document.querySelectorAll(".vehiclemodel").forEach(function (a) {
      a.remove();
    });
  }
});

$(document).on("click", ".deletecar", function () {
  if (laststored == "1") {
    notify("O carro já está na garagem", "error");
  } else {
    $.post(
      "https://will_garages_v2/deletevehicle",
      JSON.stringify({ plate: lastplate }),
    );
    $(".container").css("display", "none");
    $.post("https://will_garages_v2/closepage", JSON.stringify({}));
    lastplate = null;
    document.querySelectorAll(".vehiclemodel").forEach(function (a) {
      a.remove();
    });
  }
});

$(document).on("click", ".closeimg", function () {
  $(".container").css("display", "none");
  $.post("https://will_garages_v2/closepage", JSON.stringify({}));
  lastplate = null;

  document.querySelectorAll(".vehiclemodel").forEach(function (a) {
    a.remove();
  });
});

$(document).on("click", ".sellpricecar", function () {
  // $(".sellprice").css("display", "none");
  $(".priceyes").css("display", "block");
});

$(document).on("click", ".priceyesbutton", function () {
  // $(".sellprice").css("display", "block");
  $(".priceyes").css("display", "none");
});

$(document).on("click", ".transfertovehicle", function () {
  const id = $("#transfer").val();
  if (!isNaN(id) && id != "") {
    if (typeof (lastplate != "undefined")) {
      $.post(
        "https://will_garages_v2/transfervehicle",
        JSON.stringify({ plate: lastplate, id: id }),
      );
      $(".container").css("display", "none");
      $.post("https://will_garages_v2/closepage", JSON.stringify({}));
      lastplate = null;
      document.querySelectorAll(".vehiclemodel").forEach(function (a) {
        a.remove();
      });
    } else {
      notify("Escolha um veículo", "error");
    }
  } else {
    notify("ID inválido ", "error");
  }
});

$(document).on("click", ".transferyescar", function () {
  $(".transfer").css("display", "block");
  $(".transferyes").css("display", "none");
});

$(document).on("click", ".pricebutton", function () {
  $.post(
    "https://will_garages_v2/sellvehicle",
    JSON.stringify({
      plate: lastplate,
      price: lastprice,
    }),
    function (sell) {
      if (sell == true) {
        notify("Este veículo não pode ser vendido", "error");
      } else {
        $(".container").css("display", "none");
        $.post("https://will_garages_v2/closepage", JSON.stringify({}));
        lastplate = null;
        document.querySelectorAll(".vehiclemodel").forEach(function (a) {
          a.remove();
        });
      }
    },
  );
});
$(document).ready(function () {
  $("#garagetype").change(function (event) {
    const garagetype = $("#garagetype option:selected").val();
    if (garagetype === "interior") {
      $("#interiorSelection").show();
      $("#panelCoordinates").hide();
    } else {
      $("#interiorSelection").hide();
      $("#panelCoordinates").show();
    }
  });

  const garageinteriors = {
    ["Garagem_menor"]: "small",
    ["Garagem_media"]: "medium",
    ["Garagem_maior"]: "bigger",
    ["Garagem_luxo"]: "luxe",
    ["Garagem_gigante"]: "huge",
  };

  $("#garageinterior").change(function (event) {
    const garageinterior = $("#garageinterior option:selected").val();
    if (garageinteriors[garageinterior]) {
      $("#adm-garage-img").attr("src", "");
      $("#adm-garage-img").attr(
        "src",
        `https://api.rebornsystem.com.br/garages_v2/${garageinteriors[garageinterior]}.png`,
      );
    }
  });
});

$(document).keydown(function (e) {
  if (e.keyCode == 27) {
    $(".container").css("display", "none");
    $.post("https://will_garages_v2/closepage", JSON.stringify({}));
    lastplate = null;
    document.querySelectorAll(".vehiclemodel").forEach(function (a) {
      a.remove();
    });
  }
});

notify = function (text, type) {
  $(".notify").fadeOut(0);
  let renk = "#333";
  if (type == "error") {
    renk = "#FF3131";
  } else if (type == "success") {
    renk = "#689f38";
  }

  $(".notify").fadeIn(100);
  $(".notify").html(text);
  $(".notify").css("background", renk);
  $(".notify").fadeOut(3000);
};
