let imageIP = "https://api.rebornsystem.com.br/imagens/";
let vehicles = {};
let actualCategory = "";
let intv;
let vehsFiltered = [];

window.addEventListener("message", function (event) {
  const item = event.data;

  if (item["action"] === "show") {
    $(".background").fadeIn(500);
    $(".init-painel").fadeIn(500);
    if (item["ip"]) {
      imageIP = item["ip"];
    }
    vehicles = item["vehicles"];
    initPainel(vehicles);
  }

  if (item["action"] === "admMenu") {
    admMenu();
  }

  if (item["action"] === "stopTest") {
    $(".test-drive").fadeOut(500);
    if (intv) {
      clearInterval(intv);
    }
  }

  if (item["action"] === "close") {
    closePainel();
  }

  document.onkeyup = function (data) {
    if (data["which"] == 27) {
      closePainel();
    }
  };
});

function closePainel() {
  $(".init-painel").hide();
  $(".background").fadeOut(500);
  $(".admMenu").fadeOut(500);
  $(".vehs-painel").hide();
  $(".vehicle-infos").hide();
  $.post("https://" + GetParentResourceName() + "/close");
}

function initPainel(vehicles) {
  if (vehicles) {
    $(".categories").html("");
    for (const [vehType, vehs] of Object.entries(vehicles)) {
      $(".categories").append(
        `
                <div class="vehcategory" onclick="showCategory(\'` +
          vehType +
          `\')">
                    <div class="p-9 flex flex-col justify-center items-center">
                        <h2 class="font-bold">${vehType.toUpperCase()}</h2>
                        <img src="./assets/${vehType}.png" onerror="this.onerror=null;this.src='./assets/classic.png';" alt="super-car" class="categoryimg">
                    </div>
                </div>
            `
      );
    }
  }
}

function showCategory(category) {
  actualCategory = category;
  const vehs = vehicles[category];
  $(".init-painel").fadeOut(500);
  $(".vehs-painel").fadeIn(500);
  $(".vehs-painel").html(`
    <div class="backArrow animate-pulse absolute cursor-pointer" onclick="backScreen()"><img src="assets/arrow.png" alt="arrow"></div>
    <h2 class="title font-bold text-xl mb-5">${category.toUpperCase()}</h2>
    <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault">Nome</label>
    <input class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onchange="showVehicles()"
    />
    <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault">Preço</label>
    <div class="content-border">
        <div class="vehicles grid grid-cols-5 gap-1"></div>
    </div>
`);
  showVehicles(vehs);
}

function showVehicles(vehs) {
  if (vehs) {
    vehsFiltered = [];
    for (const [spawn, vehData] of Object.entries(vehs)) {
      vehsFiltered.push({ ...vehData, spawn });
    }
  }
  const val = $("#flexSwitchCheckDefault").val();
  if (val === "on") {
    vehsFiltered.sort((a, b) => {
      if (a.nome > b.nome) return 1;
      if (a.nome < b.nome) return -1;
      return 0;
    });
    document.getElementById("flexSwitchCheckDefault").value = "off";
  } else {
    vehsFiltered.sort((a, b) => {
      if (a.valor > b.valor) return 1;
      if (a.valor < b.valor) return -1;
      return 0;
    });
    document.getElementById("flexSwitchCheckDefault").value = "on";
  }
  $(".vehicles").html("");
  for (const info of vehsFiltered) {
    if (!info.vip) {
      info.valor = info.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      info.valor = info.valor + " Gemas";
    }
    let list = `
        <div class="vehcategory max-h-44" onclick="showVehicle('${
          info.spawn
        }')">
            <div class="px-5 flex flex-col justify-center items-center">
                <h2 class="vehName mx-5 mt-2">${info.nome.toUpperCase()}</h2>
                <h3 class="font-bold">${info.valor}</h3>
            </div>
            <img src="${imageIP}/${
      info.spawn
    }.png" onerror="this.onerror=null;this.src='https://api.rebornsystem.com.br/garages_v2/noveh.png';" class="vehicleimage">
        </div>
        `;
    $(".vehicles").append(list);
  }
}

function showVehicle(vehicle) {
  $.post(
    "https://" + GetParentResourceName() + "/load_vehicle",
    JSON.stringify({ vehicle, actualCategory }),
    (infos) => {
      if (infos) {
        if (!infos.vip) {
          infos.price = infos.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
        } else {
          infos.price = infos.price + " Gemas";
        }
        $(".vehs-painel").hide();
        $(".background").hide();
        $(".vehicle-infos").show();
        $(".vehicle-infos").html(`
                <h2 class="title font-bold text-xl mb-5">${infos.nome.toUpperCase()}</h2>
                <div class="content-border">
                    <div class="infos grid grid-cols-2 gap-2">
                        <div class="veh-info col-span-2 p-6 flex justify-center">
                            <img class="image-info" src="${imageIP}/${vehicle}.png" onerror="this.onerror=null;this.src='https://i.imgur.com/acV4tCt.png';" >
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">BAU</span>
                            <span class="veh-data py-2 font-bold">${
                              infos.chest
                            }</span>
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">PREÇO</span>
                            <span class="veh-data py-2 font-bold">${
                              infos.price
                            }</span>
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">HP</span>
                            <span class="veh-data py-2 font-bold">${
                              infos.horsePower
                            }</span>
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">0-100</span>
                            <span class="veh-data py-2 font-bold">${infos.initialDrive.toFixed(
                              2
                            )}</span>
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">PESO</span>
                            <span class="veh-data py-2 font-bold">${
                              infos.vehMass
                            }</span>
                        </div>
                        <div class="veh-info flex justify-between items-center">
                            <span class="px-10 py-2">PESSOAS</span>
                            <span class="veh-data py-2 font-bold">${
                              infos.seats
                            }</span>
                        </div>
                        <div class="veh-info freecam p-5 col-span-2 flex justify-center items-center" onclick="freeCam()">
                            <button>CAMERA LIVRE</button>
                        </div>
                        <div class="veh-info col-span-2 p-4 flex justify-evenly items-center">
                            <h3>ESCOLHA A COR</h3>
                            <div id="choose-color" class="flex flex-wrap">
                                <div id="white" class="choose-color-circle"></div>
                                <div id="black" class="choose-color-circle"></div>
                                <div id="grey" class="choose-color-circle"></div>
                                <div id="yellow" class="choose-color-circle"></div>
                                <div id="green" class="choose-color-circle"></div>
                                <div id="red" class="choose-color-circle"></div>
                                <div id="blue" class="choose-color-circle"></div>
                                <div id="purple" class="choose-color-circle"></div>
                                <div id="petrol" class="choose-color-circle"></div>
                                <div id="cyan" class="choose-color-circle"></div>
                                <div id="orange" class="choose-color-circle"></div>
                                <div id="dark-blue" class="choose-color-circle"></div>
                            </div>
                        </div>
                        <div class="button-back flex justify-center" onclick="backVehicles()">
                            <button>VOLTAR</button>
                        </div>
                        <div class="button-test-drive flex justify-center" onclick="testDrive('${vehicle}')">
                            <button>TEST-DRIVE</button>
                        </div>
                        <div class="button-rent flex justify-center" onclick="rentVehicle('${vehicle}')">
                            <button>ALUGAR</button>
                        </div>
                        <div class="button-order flex justify-center" onclick="buyVehicle('${vehicle}')">
                            <button>COMPRAR</button>
                        </div>
                    </div>
                </div>
            `);
      }
    }
  );
}

function testDrive(vehicle) {
  $.post(
    "https://will_conce_v2/spaw_testeDrive",
    JSON.stringify({ vehicle }),
    function (data) {
      if (data && data.time) {
        $(".test-drive").fadeIn(500);
        let curTest = data.time || 30;
        if (intv) {
          clearInterval(intv);
        }
        intv = setInterval(() => {
          $(".test-drive").html(`
                <div class="content-border">
                <h1 class="title veh-info text-white font-bold text-lg mb-5 p-1">TEST DRIVE</h1>
                <div class="text-center text-white text-xl mb-2 font-bold">${curTest}</div>
                </div>
                `);
          curTest -= 1;
        }, 1000);
      }
    }
  );
  closePainel();
}

function rentVehicle(vehicle) {
  $.post(
    "https://will_conce_v2/rent_vehicle",
    JSON.stringify({ vehicle, category: actualCategory })
  );
  closePainel();
}

function freeCam() {
  $.post("https://will_conce_v2/chance_cam", JSON.stringify());
}

var RGBvalues = (function () {
  var _hex2dec = function (v) {
    return parseInt(v, 16);
  };

  var _splitHEX = function (hex) {
    var c;
    if (hex.length === 4) {
      c = hex.replace("#", "").split("");
      return {
        r: _hex2dec(c[0] + c[0]),
        g: _hex2dec(c[1] + c[1]),
        b: _hex2dec(c[2] + c[2]),
      };
    } else {
      return {
        r: _hex2dec(hex.slice(1, 3)),
        g: _hex2dec(hex.slice(3, 5)),
        b: _hex2dec(hex.slice(5)),
      };
    }
  };

  var _splitRGB = function (rgb) {
    var c = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(",");
    var flag = false,
      obj;
    c = c.map(function (n, i) {
      return i !== 3 ? parseInt(n, 10) : (flag = true), parseFloat(n);
    });
    obj = {
      r: c[0],
      g: c[1],
      b: c[2],
    };
    if (flag) obj.a = c[3];
    return obj;
  };

  var color = function (col) {
    var slc = col.slice(0, 1);
    if (slc === "#") {
      return _splitHEX(col);
    } else if (slc.toLowerCase() === "r") {
      return _splitRGB(col);
    } else {
      console.log(
        "!Ooops! RGBvalues.color(" + col + ") : HEX, RGB, or RGBa strings only"
      );
    }
  };

  return {
    color: color,
  };
})();

$(document).on("click", ".choose-color-circle", function (e) {
  var rgb = RGBvalues.color($(this).css("background-color"));
  $.post(
    "https://will_conce_v2/change_color",
    JSON.stringify({ rgb: rgb }),
    function (x) {}
  );
});

function backScreen() {
  $(".vehs-painel").fadeOut(500);
  $(".init-painel").fadeIn(500);
}

function backVehicles() {
  $(".background").fadeIn(500);
  $(".vehs-painel").fadeIn(500);
  $(".vehicle-infos").fadeOut(500);
}

function buyVehicle(vehicle) {
  closePainel();
  $.post(
    "https://" + GetParentResourceName() + "/buy_vehicle",
    JSON.stringify({ vehicle, category: actualCategory })
  );
}

function admMenu() {
  $(".admMenu").fadeIn(500);
  $(".admMenu").html(`
        <div class="content-border">
            <div class="bg-slate-600 p-3 text-white border-sky-700 border-2 rounded-xl">
                <h1 class="font-bold text-center">CONTROLE ADMIN</h1>
                <div class="admin-options flex">
                    <div class="admin-option mx-2 p-2 rounded-lg hover:bg-slate-700 cursor-pointer" id="addstock" onclick="changeAdmMenu(this.id)">Adicionar estoque</div>
                    <div class="admin-option mx-2 p-2 rounded-lg hover:bg-slate-700 cursor-pointer" id="addveh" onclick="changeAdmMenu(this.id)">Adicionar veiculo</div>
                    <div class="admin-option mx-2 p-2 rounded-lg hover:bg-slate-700 cursor-pointer" id="remveh" onclick="changeAdmMenu(this.id)">Remover veiculo</div>
                </div>
                <div class="container-adm my-3 flex flex-col items-center"></div>
            </div>
        </div>
    `);
  changeAdmMenu();
}

function changeAdmMenu(id) {
  if (!id) id = "addstock";
  $(".admin-option").removeClass("actived");
  $("#" + id).addClass("actived");
  if (id === "addstock") {
    $(".container-adm").html(`
            <label class="relative block">
                <span class="text-lg">Veiculo</span>
                <input class="stock-veh placeholder:italic text-black block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Panto" type="text" name="search"/>
            </label>
            <label class="relative block my-5">
                <span class="text-lg">Quantidade</span>
                <input class="stock-qnt placeholder:italic text-black block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="10" type="text" name="search"/>
            </label>
            <div class="button-order flex justify-center p-3 text-green-400 hover:text-white">
                <button onclick=addStock()>CONFIRMAR</button>
            </div>
        `);
  } else if (id === "addveh" || id === "remveh") {
    $(".container-adm").html(`
            <label class="relative block">
                <span class="text-lg">Passaporte</span>
                <input class="user placeholder:italic text-black block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="1" type="text" name="search"/>
            </label>
            <label class="relative block my-5">
                <span class="text-lg">Veiculo</span>
                <input class="vehicle-user placeholder:italic text-black block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Panto" type="text" name="search"/>
            </label>
            <div class="button-order flex justify-center p-3 text-green-400 hover:text-white">
                <button onclick=userVehFunc('${id}')>CONFIRMAR</button>
            </div>
        `);
  }
}

function addStock() {
  const vehicle = $(".stock-veh").val();
  const stock = $(".stock-qnt").val();
  if (vehicle && stock) {
    $.post(
      "https://" + GetParentResourceName() + "/add_stock",
      JSON.stringify({ stock, vehicle })
    );
  }
}

function userVehFunc(mode) {
  const passport = $(".user").val();
  const vehicle = $(".vehicle-user").val();
  if (passport && vehicle) {
    $.post(
      "https://" + GetParentResourceName() + "/change_user_veh",
      JSON.stringify({ passport, vehicle, mode })
    );
  }
}
