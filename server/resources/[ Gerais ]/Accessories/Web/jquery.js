$(document).ready(function () {
  window.addEventListener("message", function (event) {
    if (event["data"]["action"] == "showAssault") {
      $("#app").fadeIn(500);
    }
    if (event["data"]["action"] == "hideAssault") {
      $("#app").fadeOut(500);
    }
  });
});
