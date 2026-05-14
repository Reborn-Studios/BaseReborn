const MAX_NOTIFICATIONS = 10;
const LIVE_TIMEOUT_MS = 5000;

let list = [];
let blocked = false;

const escapeHtml = (value) => {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const createLine = (iconClass, text) => {
  if (text === undefined || text === null || String(text).trim() === "")
    return "";
  return `<div class="notification-line"><i class="${iconClass}"></i><span>${escapeHtml(
    text,
  )}</span></div>`;
};

const buildNotificationHtml = (data, { isLive }) => {
  const rgba = Array.isArray(data.rgba) ? data.rgba : [242, 201, 76];
  const accent = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},1)`;

  const badge =
    data.code === undefined ? "" : `<div class="notification-badge">QRU</div>`;
  const title = `<div class="notification-title">${escapeHtml(data.title)}</div>`;

  const lines = [
    createLine("fas fa-location-arrow", data.street),
    createLine("fas fa-user-secret", data.criminal),
    createLine("fas fa-user", data.name),
    createLine("fas fa-car", data.vehicle),
    createLine("far fa-clock", data.time),
  ]
    .filter(Boolean)
    .join("");

  const text =
    data.text === undefined ||
    data.text === null ||
    String(data.text).trim() === ""
      ? ""
      : `<div class="notification-text">${escapeHtml(data.text)}</div>`;

  const phoneAction =
    data.phone === undefined ||
    data.phone === null ||
    String(data.phone).trim() === ""
      ? ""
      : `<button class="action action-phone" type="button" data-phone="${escapeHtml(
          data.phone,
        )}" aria-label="Ligar"><i class="fas fa-phone-alt"></i></button>`;

  return `
    <div class="notification${isLive ? " is-live" : ""}" data-x="${escapeHtml(
      data.x,
    )}" data-y="${escapeHtml(data.y)}" style="--np-accent: ${accent};">
      <div class="notification-main">
        <div class="notification-header">
          ${badge}
          ${title}
        </div>
        <div class="notification-lines">${lines}</div>
        ${text}
      </div>
      <div class="notification-actions">
        <button class="action action-loc" type="button" aria-label="Marcar GPS"><i class="fas fa-map-marker-alt"></i></button>
        ${phoneAction}
      </div>
      <div class="notification-progress"></div>
    </div>
  `.trim();
};

const renderAll = () => {
  const $body = $(".body");
  $body.html("");
  for (let i = list.length - 1; i >= 0; i -= 1) {
    $body.append(buildNotificationHtml(list[i], { isLive: false }));
  }
};

const addNotification = (data) => {
  list.push(data);
  if (list.length > MAX_NOTIFICATIONS) list.shift();

  if (blocked) return;

  const html = buildNotificationHtml(data, { isLive: true });
  const $el = $(html);
  $el.prependTo(".body").hide().show("slide", { direction: "right" }, 200);

  setTimeout(() => {
    $el.hide("slide", { direction: "right" }, 200, () => $el.remove());
  }, LIVE_TIMEOUT_MS);
};

const hideAll = () => {
  blocked = false;
  $(".body").css("overflow", "hidden").html("");
};

const showLast = () => {
  hideAll();
  blocked = true;
  $(".body").css("overflow-y", "auto");
  renderAll();
};

$(document).ready(function () {
  window.addEventListener("message", function (event) {
    switch (event.data.action) {
      case "notify":
        if (event.data.data) addNotification(event.data.data);
        break;
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
  });

  $(document).on("keyup", function (e) {
    if (e.which === 27) {
      hideAll();
      $.post("http://notifyPush/focusOff");
    }
  });

  $(document).on("click", ".action-loc", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $notification = $(this).closest(".notification");
    $.post(
      "http://notifyPush/setWay",
      JSON.stringify({
        x: $notification.attr("data-x"),
        y: $notification.attr("data-y"),
      }),
    );
  });

  $(document).on("click", ".notification", function () {
    $.post(
      "http://notifyPush/setWay",
      JSON.stringify({ x: $(this).attr("data-x"), y: $(this).attr("data-y") }),
    );
  });

  $(document).on("click", ".action-phone", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $.post(
      "http://notifyPush/phoneCall",
      JSON.stringify({ phone: $(this).attr("data-phone") }),
    );
  });
});
