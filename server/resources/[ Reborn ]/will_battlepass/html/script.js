let data = null;
let backgroundImg = "./images";
let myReward;

$(function () {
  $("body").css("background", "transparent");

  window.addEventListener("message", function (event) {
    if (event.data.enable) {
      data = event.data.data;

      SetupMenu();
      $("#wrap").fadeIn();
      if (data.imgDirect && data.imgDirect !== "") {
        backgroundImg = data.imgDirect;
      }
    }

    if (event.data.openLootbox) {
      sortLootbox(event.data.box);
    }

    if (event.data.reward) {
      myReward = event.data.reward;
    }
  });

  $("#btn-buy-level").click(function () {
    $(".content-popup").fadeIn(700);
  });

  $(".confirm-buy").click(function () {
    $(".content-popup").hide();
    $("#wrap").fadeOut();
    $.post("https://will_battlepass/buy_level", JSON.stringify({}));
  });

  $(".closeBtn").click(function () {
    $(".content-popup").fadeOut(200);
  });

  document.onkeyup = function (event) {
    if (event.key == "Escape") {
      $(".content-popup").hide();
      $("#wrap").hide();
      $.post("https://will_battlepass/quit", JSON.stringify({}));
    }
  };
});

function SetupMenu() {
  GenerateProgress();
  GenerateRewards();
  GenerateLootboxes();

  if (data.nextLevelEta != 0) {
    $("#before-get-exp-time").html(data.nextLevelEta + " minuto(s)");
  } else {
    $("#before-get-exp-time").html("RESGATAR SUA RECOMPENSA");
  }
}

function ClaimReward() {
  $("#wrap").hide();
  $.post("https://will_battlepass/reward", JSON.stringify({}));
}

function BuyLootbox(id, useCoin) {
  $("#wrap").hide();
  $.post(
    "https://will_battlepass/buy_lootbox",
    JSON.stringify({ id, useCoin }),
  );
}

function GenerateProgress() {
  let xpPerc = Math.floor((data.xp / data.maxXp) * 100);

  $("#exp-progress").html(
    `
	<div id="exp-progress">
		<table>
		<tr>
			<td>
			<span id="exp-current">` +
      data.xp +
      `</span> / <span id="exp-goal">` +
      data.maxXp +
      `</span><br/>
			<span id="exp-progress-desc">XP ATUAL</span>
			</td>
			<td><center><div id="levelbar"></div></center></td>
		</tr>
		</table>
		<script>
		var bar = new ProgressBar.Circle(levelbar, {
		  strokeWidth: 10,
		  color: 'rgba(255,255,255,0.1)',
		  trailColor: 'rgba(255,255,255,0.2)',
		  trailWidth: 1,
		  easing: 'easeInOut',
		  duration: 2000,
		  svgStyle: null,
		  text: {
			value: '',
			alignToBottom: false
		  },
		  
		  // Set default step function for all animate calls
		  step: (state, bar) => {
			bar.path.setAttribute('stroke', state.color);
			var value = Math.round(bar.value() * 100);
			bar.setText("<span id='level-circle'>` +
      data.level +
      `</span><br/><span id='level-circle-desc'>NIVEL</span>");
			bar.text.style.color = state.color;
		  }
		});
		
		bar.animate(` +
      xpPerc +
      ` / 100);
		
		</script>
	</div>`,
  );
}

function GenerateRewards() {
  let finalHTML = ``;

  for (let i = 0; i < data.rewards.length; i++) {
    let itemStatus;
    let itemReceived;
    let itemLevel = i + 1;

    if (i % 5 == 0) {
      if (data.level >= itemLevel && data.level < itemLevel + 5) {
        finalHTML += `<div class="item active">`;
      } else {
        finalHTML += `<div class="item">`;
      }
    }

    if (data.level == itemLevel) {
      let xpPerc = Math.floor((data.xp / data.maxXp) * 100);

      if (xpPerc == 100) {
        itemStatus = `<div id="battlepass-done"><i class="fas fa-check"></i>FINALIZADO</div>`;
        itemReceived = `<button onclick="ClaimReward()" id="battlepass-claim">RESGATAR</button>`;
      } else {
        itemStatus = `<div id="battlepass-accomp">CONQUISTA</div>`;
        itemReceived =
          `<div id="battlepass-inprogress" class="w3-border">EM PROGRESSO <div class="w3-red" style="width:` +
          xpPerc +
          `%"></div></div>`;
      }
    } else if (data.level < itemLevel) {
      itemStatus = `<div id="battlepass-waiting">AGUARDE...</div>`;
      itemReceived = `<div id="battlepass-received">AGUARDE...</div>`;
    } else if (data.level > itemLevel) {
      itemStatus = `<div id="battlepass-done"><i class="fas fa-check"></i>FINALIZADO</div>`;
      itemReceived = `<div id="battlepass-received">ENTREGUE</div>`;
    }
    let itemImage =
      (backgroundImg && `${backgroundImg}/${data.rewards[i].item}.png`) ||
      "./images/lootbox.png";
    finalHTML +=
      `
		<div id="battlepass-block">
			<div id="battlepass-level">NIVEL ` +
      itemLevel +
      `</div>
			<div id="battlepass-block-bg">
				` +
      itemStatus +
      `
				<div id="battlepass-reward-img" style="background:url(${itemImage}) center center no-repeat;background-size:cover;background-origin:content-box;"></div>
				<div id="battlepass-reward-title">` +
      data.rewards[i].title +
      `</div>
				<div id="battlepass-reward-desc">` +
      data.rewards[i].desc +
      `</div>
				` +
      itemReceived +
      `
			</div>
		</div>`;

    if (i % 5 == 4) {
      finalHTML += `</div>`;
    }
  }

  $("#rewards").html(finalHTML);
}

function GenerateLootboxes() {
  $("#lootboxes").html("");

  for (let i = 0; i < data.lootboxes.length; i++) {
    let moneyText;
    let coinText;
    let lootboxId = i + 1;
    let tooltip = CreateTooltip(data.lootboxes_re[i], data.lootboxes[i].type);

    if (data.lootboxes[i].moneyPrice) {
      moneyText =
        `
			<td>
				<div id="lootbox-money">
					PREÇO:<br/>
					<span id="lootbox-money-price">$` +
        data.lootboxes[i].moneyPrice +
        `</span>
				</div>
				<button onclick="BuyLootbox(` +
        lootboxId +
        `, false)" id="lootbox-money-open">COMPRAR</button>
			</td>`;
    } else {
      moneyText = `
			<td>
				<div id="lootbox-not-available">
					INDISPONIVEL<br/>COM DINHEIRO
				</div>
				<button id="lootbox-not-available-open">COMPRAR</button>
			</td>`;
    }

    if (data.lootboxes[i].coinPrice) {
      coinText =
        `
			<td>
				<div id="lootbox-coins">
					DIAMANTES:<br/>
					<span id="lootbox-coins-price"><i class="fa fa-diamond"></i> ` +
        data.lootboxes[i].coinPrice +
        `</span>
				</div>
				<button onclick="BuyLootbox(` +
        lootboxId +
        `, true)" id="lootbox-coins-open">COMPRAR</button>
			</td>`;
    } else {
      coinText = `
			<td>
				<div id="lootbox-not-available">
					INDISPONIVEL<br/>COM DIAMANTES
				</div>
				<button id="lootbox-not-available-open">COMPRAR</button>
			</td>`;
    }
    let itemImage = `./images/${data.lootboxes[i].name}.png`;

    $("#lootboxes").append(
      `<div id="lootbox-block">
			<div id="lootbox-drops">
				<i class="fas fa-info"></i> DROPS
				` +
        tooltip +
        `
			</div>
			<div id="unique">UNIQUE</div>
			<div id="lootbox-img" style="background:url(${itemImage}) center center no-repeat;background-size:cover;background-origin:content-box;"></div>
			<div id="lootbox-title">` +
        data.lootboxes[i].title +
        `</div>
			<table>
			<tr>
				` +
        moneyText +
        `
				` +
        coinText +
        `
			</tr>
			</table>
		</div>`,
    );
  }
}

function sortLootbox(box) {
  $("body").append(
    '<div class="itemsBackground"><div class="bxItems"></div></div>',
  );
  let index = 0;
  let timeout = 4;
  let countdown = 150;
  const interval = setInterval(() => {
    let itemImage =
      (backgroundImg && `${backgroundImg}/${box[index].name}.png`) ||
      "./images/lootbox.png";
    $(".bxItems").html(
      `<img src=${itemImage} id="itemPhoto"><div id="labelText">${box[index].label}</div>`,
    );
    index += 1;
    if (box.length === index) {
      index = 0;
    }
    if (timeout <= 0 && myReward) {
      itemImage = `${backgroundImg}/${box[myReward - 1].name}.png`;
      $(".bxItems").html(
        `<img src=${itemImage} id="itemPhoto"><div id="labelText">${
          box[myReward - 1].label
        }</div>`,
      );
      clearInterval(interval);
    }
    countdown += 50;
    if (countdown > 500) {
      timeout -= 1;
      countdown = 150;
    }
  }, countdown);
  setTimeout(() => {
    $(".itemsBackground").remove();
  }, 8500);
}

function CreateTooltip(data, type) {
  let html = `<span class="tooltiptext">`;

  $.each(data, function (index, info) {
    if (info.amount < 10000) {
      html += info.luck + `% x` + info.amount + ` ` + info.label + `<br/>`;
    } else {
      html += info.luck + `% ` + info.label + `<br/>`;
    }
  });

  html += `</span>`;

  return html;
}
