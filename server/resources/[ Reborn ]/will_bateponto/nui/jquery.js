$(function () {
  window.onload = (e) => {
    window.addEventListener("message", (event) => {
      var item = event.data;
      switch (item.type) {
        case "firstMenu":
          $("#bateponto").show();
          $("#verify").hide();
          $("#entrou").hide();
          $("#saiu").hide();
          break;
        case "hideMenu":
          $("#bateponto").hide();
          $("#verify").hide();
          $("#entrou").hide();
          $("#saiu").hide();
          break;
        case "Verify":
          $("#bateponto").show();
          $("#verify").show();
          $("#entrou").hide();
          $("#saiu").hide();
          break;
        case "Entrou":
          $("#verify").hide();
          $("#entrou").show();
          $("#saiu").hide();
          break;
        case "Saiu":
          $("#verify").hide();
          $("#entrou").hide();
          $("#saiu").show();
          break;
      }
    });
    document.onkeyup = function (data) {
      if (data.which == 27) {
        $.post(
          "http://will_bateponto/batepontoClose",
          JSON.stringify({}),
          function (datab) {}
        );
      }
    };
  };
});

$(document).on("click", ".botao", function () {
  $.post(
    "http://will_bateponto/botao",
    JSON.stringify({}),
    function (datab) {}
  );
});
