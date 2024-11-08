let list = [];
let blocked = false;

$(document).ready(function () {
  window.addEventListener("message", function (event) {
    switch (event.data.action) {
      case "notify":
        if (event.data.data) {
          addNotification(event.data.data);
          break;
        }

      case "showAll":
        if (list.length > 0) {
          showLast();
          $.post("http://notifyPush/focusOn");
        }
        break;

      case "hideAll":
        hideAll();
        $.post("http://notifyPush/focusOff");
        break;
    }
    document.onkeyup = function (data) {
      if (data.which == 27) {
        hideAll();
        $.post("http://notifyPush/focusOff");
      }
    };

    $(document).on("click", "#loc", function () {
      $.post(
        "http://notifyPush/setWay",
        JSON.stringify({ x: $(this).attr("data-x"), y: $(this).attr("data-y") })
      );
    });

    $(document).on("click", "#phone", function () {
      $.post(
        "http://notifyPush/phoneCall",
        JSON.stringify({ phone: $(this).attr("data-phone") })
      );
    });
  });
});

const addNotification = (data) => {
  if (list.length > 9) list.shift();
  const html = `<div class="notification" id="loc" data-x="${data.x}" data-y="${
    data.y
  }" style="background: rgba(${data.rgba[0]},${data.rgba[1]},${
    data.rgba[2]
  },0.7); border-left: rgba(${data.rgba[0]},${data.rgba[1]},${
    data.rgba[2]
  },1.0) 5px solid;">
        <div class="content">
            ${data.code === undefined ? "" : `<div class="code">QRU</div>`}
            <div class="titulo">${data.title}</div>
            ${
              data.street === undefined
                ? ""
                : `<div class="content-line"><i class="fa fa-arrow-right"></i>  ${data.street}</div>`
            }
            ${
              data.criminal === undefined
                ? ""
                : `<div class="content-line"><i class="fa fa-arrow-right"></i>  ${data.criminal}</div>`
            }
            ${
              data.name === undefined
                ? ""
                : `<div class="content-line"><i class="fa fa-arrow-right"></i>  ${data.name}</div>`
            }
            ${
              data.vehicle === undefined
                ? ""
                : `<div class="content-line"><i class="fa fa-arrow-right"></i>  ${data.vehicle}</div>`
            }
            ${
              data.time === undefined
                ? ""
                : `<div class="content-line"><i class="fa fa-arrow-right"></i>  ${data.time}</div>`
            }
        </div>
        <div class="buttons">
          <div class="chamados"><i class="fas fa-map-marker-alt fa-lg"></i></div>
            ${
              data.phone === undefined
                ? ""
                : `<div class="chamados" id="phone" data-phone="${data.phone}"><i class="fas fa-phone-alt"></i></div>`
            }
        </div>
        ${
          data.text === undefined ? "" : `<div class="texto">${data.text}</div>`
        }
    </div>`;
  list.push(html);

  if (!blocked) {
    $(html)
      .prependTo(".body")
      .hide()
      .show("slide", { direction: "right" }, 250)
      .delay(5000)
      .hide("slide", { direction: "right" }, 250);
  }
};

const hideAll = () => {
  blocked = false;
  $(".body").css("overflow", "hidden");
  $(".body").html("");
};

const showLast = () => {
  hideAll();
  blocked = true;

  $(".body").css("overflow-y", "scroll");
  for (i in list) {
    $(list[i]).prependTo(".body");
  }
};
