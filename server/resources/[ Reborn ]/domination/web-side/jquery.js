$(function () {
  let actionContainer = $("#actionmenu");

  window.addEventListener("message", function (event) {
    let item = event.data;
    switch (item.action) {
      case "hideMenu":
        actionContainer.fadeOut(500);
        break;
      case "updateInfos":
        actionContainer.fadeIn(500);
        updateInfos(event.data);
        break;
    }
  });
});

function updateInfos(data) {
  let points = data.points || 0;
  let lider = data.lider || "Indefinido";
  let time = data.time || 0;
  $("#actionmenu").html(`
		<div id="borderstyle">
			<div id="dom">
				<div class="infos" id="domination">DOMINAÇÃO</div>
				<div class="infos" id="points">PONTUAÇÃO: ${points}</div>
				<div class="infos" id="lider">LIDERANÇA: ${lider}</div>
				<div id="time"><i class="fas fa-clock"></i>${time}</div>
			</div>
      	</div>
	`);
}
