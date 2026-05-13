var audioPlayer = null;

const HUD_SELECTOR = "#casinoHud";

const DEFAULT_PRICES = {
  Blackjack: 100,
  Roleta: 100,
  Slots: "100-2500",
  Poker: 200,
  InsideTrack: 100,
};

const PRICE_ELEMENT_BY_GAME = {
  Blackjack: "#priceBlackjack",
  Roleta: "#priceRoleta",
  Slots: "#priceSlots",
  Poker: "#pricePoker",
  InsideTrack: "#priceInsideTrack",
};

function formatAmount(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string" && value.trim() === "") return "—";
  const numericValue = Number(value);
  if (Number.isFinite(numericValue))
    return numericValue.toLocaleString("pt-BR");
  return String(value);
}

function formatPrice(value) {
  const numericValue = Number(value);
  if (Number.isFinite(numericValue)) {
    return `${numericValue.toLocaleString("pt-BR")} fichas`;
  }
  return formatAmount(value);
}

function applyPrices(prices) {
  Object.keys(PRICE_ELEMENT_BY_GAME).forEach((gameName) => {
    const selector = PRICE_ELEMENT_BY_GAME[gameName];
    const value = prices?.[gameName];
    $(selector).text(formatPrice(value));
  });
}

function setActiveGame(gameName) {
  $("#activeGame").text(gameName ? String(gameName) : "—");
  $(".gameRow").removeClass("gameRow--active");
  if (gameName) {
    $(`.gameRow[data-game="${gameName}"]`).addClass("gameRow--active");
  }
}

function setCurrentBet(bet) {
  $("#currentBet").text(formatAmount(bet));
}

function showHud({ expand = true } = {}) {
  const $hud = $(HUD_SELECTOR);
  $hud.removeClass("hud--hidden");
  if (expand) $hud.removeClass("hud--collapsed");
}

function hideHud() {
  $(HUD_SELECTOR).addClass("hud--hidden");
}

function toggleHudCollapsed() {
  const $hud = $(HUD_SELECTOR);
  if ($hud.hasClass("hud--hidden")) return;
  $hud.toggleClass("hud--collapsed");
}

function setTimer(timeLeft) {
  const $timer = $("#hudTimer");
  const $text = $(".clockText");

  if (timeLeft === null || timeLeft === undefined || Number(timeLeft) < 0) {
    $timer.removeClass("is-visible");
    $text.text("00:00");
    return;
  }

  const seconds = Math.max(0, Math.floor(Number(timeLeft)));
  $timer.addClass("is-visible");
  $text.text(`00:${String(seconds).padStart(2, "0")}`);
}

function setKeyCard(id, keyText, actionText) {
  const $card = $(`#${id}`);
  $card.removeClass("is-hidden");
  $card.find(".keyBadge").text(String(keyText));
  $card.find(".keyAction").text(String(actionText));
}

function hideKeyCard(id) {
  $(`#${id}`).addClass("is-hidden");
}

function hideExtras() {
  $("#handInfo").addClass("is-hidden").text("MÃO: —");
  $("#dealerInfo").addClass("is-hidden").text("DEALER: —");
}

function setExtras({ currentHand, dealerHand } = {}) {
  if (currentHand !== undefined && currentHand !== null && currentHand !== "") {
    $("#handInfo").removeClass("is-hidden").text(`MÃO: ${currentHand}`);
  } else {
    $("#handInfo").addClass("is-hidden").text("MÃO: —");
  }

  if (dealerHand !== undefined && dealerHand !== null && dealerHand !== "") {
    $("#dealerInfo").removeClass("is-hidden").text(`DEALER: ${dealerHand}`);
  } else {
    $("#dealerInfo").addClass("is-hidden").text("DEALER: —");
  }
}

function resetControls() {
  setKeyCard("visionkey", "E", "VISÃO");
  setKeyCard("spacekey", "SPACE", "APOSTAR");
  setKeyCard("enterkey", "ENTER", "COLOCAR");
  setKeyCard("leftkey", "BACK", "SAIR");
  hideExtras();
}

$(function () {
  applyPrices(DEFAULT_PRICES);
  resetControls();
  $("#hudToggle").on("click", toggleHudCollapsed);
});

window.addEventListener("message", ({ data }) => {
  if (data.action === "showCassino") {
    showHud({ expand: true });
    if (data?.prices) applyPrices(data.prices);
    setActiveGame(null);
    setCurrentBet(null);
    resetControls();
  }
  if (data.action === "updateChips") {
    $("#mychips").text(formatAmount(data.myChips));
  }
  if (data.action === "toggleCassinoNui") {
    toggleHudCollapsed();
  }
  if (data.action === "playAudio") {
    if (audioPlayer) {
      audioPlayer.pause();
    }
    audioPlayer = new Audio("./js/sounds/" + data.transactionFile + ".mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
  }
  if (data.action === "showGame") {
    const actualGame = data.game;
    showHud({ expand: true });
    setActiveGame(actualGame);
    if (data.currentBet !== undefined) setCurrentBet(data.currentBet);

    resetControls();
    if (actualGame === "Slots") {
      hideKeyCard("enterkey");
    } else if (actualGame === "Poker") {
      hideKeyCard("visionkey");
      if (data.secondStep) {
        hideKeyCard("spacekey");
        hideKeyCard("enterkey");
        setKeyCard("visionkey", "E", "JOGAR");
        setKeyCard("leftkey", "BACK", "PARAR");
      }
    } else if (actualGame === "Blackjack") {
      hideKeyCard("visionkey");
      if (data.secondStep) {
        hideKeyCard("enterkey");
        setKeyCard("spacekey", "SPACE", "PUXAR");
        setKeyCard("leftkey", "BACK", "PARAR");
        if (data.currentHand !== undefined) {
          setExtras({
            currentHand: data.currentHand,
            dealerHand: data.dealerHand,
          });
        }
      }
    }
  }
  if (data.action === "hideCassino") {
    hideHud();
  }
  if (data.action === "showTimer") {
    setTimer(data.timeLeft);
  }
});

//KEY CLICKED
$(document).keyup(function (e) {
  if (e.keyCode === 71) {
    toggleHudCollapsed();
  }
});
