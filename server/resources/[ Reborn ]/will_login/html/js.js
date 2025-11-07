const userInfos = {};
let vehicles = [];
let discord = "";

$(document).ready(function () {
  const birthInput = document.getElementById("birth_input");

  birthInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 10);
    e.target.value = value;
  });

  document.getElementById("phone_input").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 2)
      value = "(" + value.slice(0, 2) + ") " + value.slice(2);
    if (value.length > 9)
      value = value.slice(0, 10) + "-" + value.slice(10, 14);
    e.target.value = value;
  });

  window.addEventListener("message", function (event) {
    if (event.data.action == "CodeMenu") {
      const infos = event.data.infos;
      discord = event.data.discord;
      vehicles = event.data.vehicles;
      for (const key in infos) {
        if (!infos[key]) {
          $(`#${key}_container`).css("display", "none");
        }
      }
      $("body").css("display", "flex");
      $(".firstScreen").css("display", "flex");
      $(".loginMenu").css("display", "block");
      $(".twoScreen").css("display", "none");
    } else if (event.data.action == "CodeMyMenu") {
      $("body").css("display", "flex");
      $(".firstScreen").css("display", "none");
      $(".twoScreen").css("display", "flex");
      $(".mycodeBox").html(event.data.code);
      number = event.data.price;
      $(".bigPrizePrice").html(
        "R$" + number.toLocaleString("pt-BR", { minimumFractionDigits: 0 })
      );
    } else if (event.data.action == "listed") {
      html =
        `
      <div class="prizeBoxs">
      <div class="prizeNumber">` +
        event.data.k +
        `</div>
      <div class="noprizeBox">
        <div class="prizeName">Dinheiro</div>
        <div
          class="prizeImg"
          style="background-image: url(./img/prize.png)"
        ></div>
        <div class="prizePrice">$ ` +
        event.data.price +
        `</div>
      </div>
    </div>
      `;
      $(".prizeSide").prepend(html);
    } else if (event.data.action == "listed-ok") {
      html =
        `
      <div class="prizeBoxs" >
      <div class="prizeNumber">` +
        event.data.k +
        `</div>
      <div class="noprizeBox" style="background: radial-gradient(110.31% 110.31% at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%);">
        <div class="prizeName">Dinheiro</div>
        <div
          class="prizeImg"
          style="background-image: url(./img/prize-okok.png)"
        ></div>
        <div class="prizePrice">$ ` +
        event.data.price +
        `</div>
      </div>
    </div>
      `;
      $(".prizeSide").prepend(html);
    } else if (event.data.action == "listed-okok") {
      html =
        `
      <div class="prizeBoxs">
      <div class="prizeNumber">` +
        event.data.k +
        `</div>
      <div class="noprizeBox" style="background: radial-gradient(80% 80% at 50% 50%, rgba(0, 148, 255, 0.43) 0%, rgba(0, 148, 255, 0) 100%), radial-gradient(110.31% 110.31% at 50% 50%, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 100%); ">
        <div class="prizeName">Dinheiro</div>
        <div
          class="prizeImg"
          style="background-image: url(./img/prize-ok.png)"
        ></div>
        <div class="prizePrice">$ ` +
        event.data.price +
        `</div>
      </div>
    </div>
      `;
      $(".prizeSide").prepend(html);
    }
  });
});

$(document).on("keydown", function (event) {
  switch (event.keyCode) {
    case 27: // ESC
      if ($(".twoScreen").css("display") != "none") {
        $(".twoScreen").fadeOut();
        $("body").fadeOut();
        $.post("https://will_login/close");
      }
  }
});

function collect() {
  $.post("http://will_login/collect");
  Swal.fire({
    icon: "success",
    title: "Coletado com sucesso!",
    background: "rgba(1, 4, 6, 0.90)",
    width: 600,
    padding: "3em",
    color: "#FFFFFF",
    showConfirmButton: false,
    timer: 1000,
  });
  setTimeout(function () {
    CloseMenu();
  }, 1000);
}

function accept(usedCode) {
  if (usedCode) {
    const code = $("#code_input").val();
    if (!code) {
      Swal.fire({
        icon: "error",
        title: "Digite o código!",
        background: "rgba(1, 4, 6, 0.90)",
        width: 600,
        padding: "3em",
        color: "#FFFFFF",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Convite usado com sucesso!",
      background: "rgba(1, 4, 6, 0.90)",
      width: 600,
      padding: "3em",
      color: "#FFFFFF",
      showConfirmButton: false,
      timer: 1000,
    });
    $.post(
      "https://will_login/accept",
      JSON.stringify({
        code: $("#code_input").val(),
      })
    );
  }
  setTimeout(function () {
    if (vehicles.length > 0) {
      const referenceMenu = document.querySelector(".referenceMenu");
      const vehicleMenu = document.querySelector(".vehicleMenu");

      referenceMenu.classList.add("fade-out");
      $(".vehiclesContainer").html("");

      setTimeout(() => {
        vehicles.map((veh) => {
          $(".vehiclesContainer").append(`
            <div class="vehicleBox">
              <div>
                <div class="textinfo">${veh.title} <span>${veh.days} dias</span></div>
                <div class="nocodeButton" onclick="rewardVehicle('${veh.index}')">
                  Resgatar
                </div>
              </div>
              <img
                src="${veh.image}"
                alt="${veh.title}"
              />
            </div>
        `);
        });
        referenceMenu.style.display = "none";
        vehicleMenu.style.display = "block";
        vehicleMenu.classList.add("fade-in");
      }, 500);
    } else {
      CloseMenu();
    }
  }, 1500);
}

function copy() {
  var mycodeBox = document.querySelector(".mycodeBox");
  var textToCopy = mycodeBox.innerText;
  var textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  Swal.fire({
    icon: "success",
    title: "Copiado com sucesso!",
    background: "rgba(1, 4, 6, 0.90)",
    width: 600,
    padding: "3em",
    color: "#FFFFFF",
    showConfirmButton: false,
    timer: 1000,
  });
}

function CloseMenu() {
  $("body").css("display", "none");
  $(".prizeSide").empty();
  $.post("https://will_login/close");
}

function isValidDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (year < 1920) return false;
  if (year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function nextStep() {
  const nameInput = $("#name_input").val();
  const emailInput = $("#email_input").val();
  const phoneInput = $("#phone_input").val();
  const birthInput = $("#birth_input").val();
  const findWhere = $("#findwhere").val();

  if (!/^[a-zA-Z\s]{3,}$/.test(nameInput)) {
    return Swal.fire({
      icon: "error",
      title: "O nome deve conter pelo menos 3 caracteres e apenas letras.",
      background: "rgba(1, 4, 6, 0.90)",
      width: 600,
      padding: "3em",
      color: "#FFFFFF",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
    return Swal.fire({
      icon: "error",
      title: "O e-mail informado não é válido!",
      background: "rgba(1, 4, 6, 0.90)",
      width: 600,
      padding: "3em",
      color: "#FFFFFF",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthInput) || !isValidDate(birthInput)) {
    return Swal.fire({
      icon: "error",
      title: "Data de Nascimento Errado!",
      background: "rgba(1, 4, 6, 0.90)",
      width: 600,
      padding: "3em",
      color: "#FFFFFF",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  userInfos.name = nameInput;
  userInfos.email = emailInput;
  userInfos.phone = phoneInput;
  userInfos.bof = birthInput;
  userInfos.find = findWhere;
  // console.log(nameInput, emailInput, phoneInput, birthInput, findWhere);
  $.post("https://will_login/getToken", "", (result) => {
    if (result) {
      $("#token").html(result);
      performAnimation();
    }
  });
}

function openDiscord() {
  window.invokeNative("openUrl", discord);
}

function performAnimation() {
  const loginMenu = document.querySelector(".loginMenu");
  const discordMenu = document.querySelector(".discordMenu");

  loginMenu.classList.add("fade-out");

  setTimeout(() => {
    loginMenu.style.display = "none";
    discordMenu.style.display = "block";
    discordMenu.classList.add("fade-in");
  }, 500);
}

let buttonCooldown = 0;
function openReferenceMenu() {
  if (buttonCooldown > 0) {
    Swal.fire({
      icon: "error",
      title: "Aguarde a liberação!",
      background: "rgba(1, 4, 6, 0.90)",
      width: 600,
      padding: "3em",
      color: "#FFFFFF",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }
  buttonCooldown = 5;
  setInterval(() => {
    if (buttonCooldown > 0) {
      buttonCooldown--;
    }
  }, 1000);
  $.post(
    "https://will_login/tryRegister",
    JSON.stringify({ infos: userInfos }),
    (result) => {
      if (result) {
        const discordMenu = document.querySelector(".discordMenu");
        const referenceMenu = document.querySelector(".referenceMenu");
        discordMenu.classList.remove("fade-in");
        discordMenu.classList.add("fade-out");
        setTimeout(() => {
          discordMenu.style.display = "none";
          referenceMenu.style.display = "block";
          referenceMenu.classList.add("fade-in");
        }, 500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Você ainda não foi liberado. Aguarde!",
          background: "rgba(1, 4, 6, 0.90)",
          width: 600,
          padding: "3em",
          color: "#FFFFFF",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  );
}

function copyToken() {
  var mytoken = document.querySelector("#token");
  var textToCopy = mytoken.innerText;
  var textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  Swal.fire({
    icon: "success",
    title: "Copiado com sucesso!",
    background: "rgba(1, 4, 6, 0.90)",
    width: 600,
    padding: "3em",
    color: "#FFFFFF",
    showConfirmButton: false,
    timer: 1000,
  });
}

function rewardVehicle(vehicle) {
  Swal.fire({
    icon: "success",
    title: "Veiculo resgatado com sucesso!",
    background: "rgba(1, 4, 6, 0.90)",
    width: 600,
    padding: "3em",
    color: "#FFFFFF",
    showConfirmButton: false,
    timer: 2000,
  });
  $.post("https://will_login/rewardVehicle", JSON.stringify({ vehicle }));
  setTimeout(() => {
    CloseMenu();
  }, 2500);
}
