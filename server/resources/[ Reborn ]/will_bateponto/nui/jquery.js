$(function () {
  window.onload = (e) => {
    window.addEventListener("message", (event) => {
      var item = event.data;
      if (item.type === "firstMenu") {
        $("#bateponto").show();
      }
      if (item.sendText) {
        $("#text").html(item.sendText);
      }
      if (item.type === "hideMenu") {
        $("#bateponto").hide();
        $("#text").html("");
      }
    });
    document.onkeyup = function (data) {
      if (data.which == 27) {
        $.post(
          "http://will_bateponto/batepontoClose",
          JSON.stringify({}),
          function (datab) {},
        );
      }
    };
  };
});

$(document).on("click", ".botao", function () {
  $.post(
    "http://will_bateponto/botao",
    JSON.stringify({}),
    function (datab) {},
  );
});
