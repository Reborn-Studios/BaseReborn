addEventListener("message", function (event) {
  if (event["data"]["show"] !== undefined) {
    if (event["data"]["show"] == true) {
      var html = `<span id=${event["data"]["id"]} class="message" style="left: 0; top: 0;"></span>`;
      $(html).fadeIn("normal").appendTo("#webShowMe");
    }
  }

  if (event["data"]["action"] !== undefined) {
    if (event["data"]["action"] == "update") {
      if (event["data"]["border"] !== undefined) {
        $(`#${event["data"]["id"]}`)
          .css("padding", "0")
          .css("background", "transparent");
        $(`#${event["data"]["id"]}`)
          .css("left", event["data"]["x"] * 100 + 4 + "%")
          .css("top", event["data"]["y"] * 95 + "%");

        $(`#${event["data"]["id"]}`).html(event["data"]["text"]);
      } else {
        $(`#${event["data"]["id"]}`)
          .css("border-radius", "7px")
          .css("border", "1px solid rgba(255, 255, 255, 0.1)")
          .css("padding", "12px 14px")
          .css(
            "background",
            "linear-gradient(45.72deg, rgba(255, 255, 255, 0.0975) 11.1%, rgba(255, 255, 255, 0) 100%)"
          );
        $(`#${event["data"]["id"]}`)
          .css("left", event["data"]["x"] * 100 + 3 + "%")
          .css("top", event["data"]["y"] * 100 + "%");

        $(`#${event["data"]["id"]}`)
          .text(event["data"]["text"])
          .css("color", "#FFF");
      }
    }

    if (event["data"]["action"] == "remove") {
      $(`#${event["data"]["id"]}`).fadeOut("normal", function () {
        $(this).remove();
      });
    }
  }
});
