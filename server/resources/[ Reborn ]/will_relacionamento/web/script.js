const app = document.getElementById("app");
const titleEl = document.getElementById("title");
const meNameEl = document.getElementById("meName");
const actionsEl = document.getElementById("actions");
const closeBtn = document.getElementById("closeBtn");
const acceptBtn = document.getElementById("acceptBtn");
const subtitleEl = document.getElementById("subtitle");
const incomingWrap = document.getElementById("incoming");
const myRelLineEl = document.getElementById("myRelLine");
const declineBtn = document.getElementById("declineBtn");
const targetNameEl = document.getElementById("targetName");
const statusLineEl = document.getElementById("statusLine");
const incomingText = document.getElementById("incomingText");

let state = {
  mode: "panel",
  panel: null,
  incoming: null,
};

function post(endpoint, body) {
  return fetch(`https://${GetParentResourceName()}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body || {}),
  });
}

function setHidden(el, hidden) {
  if (!el) return;
  if (hidden) el.classList.add("hidden");
  else el.classList.remove("hidden");
}

function clearActions() {
  actionsEl.innerHTML = "";
}

function createButton(label, variant, onClick) {
  const btn = document.createElement("button");
  btn.className = `btn ${variant || "ghost"}`;
  btn.textContent = label;
  btn.addEventListener("click", onClick);
  return btn;
}

function formatStatus(status) {
  if (status === "dating") return "Namorando";
  if (status === "married") return "Casado";
  return "Sem relacionamento";
}

function renderPanel(data) {
  state.panel = data;
  state.incoming = null;

  titleEl.textContent = "Relacionamento";
  subtitleEl.textContent = "Opções com a pessoa selecionada";
  meNameEl.textContent = data?.me?.name
    ? `${data.me.name} (#${data.me.user_id})`
    : "—";
  targetNameEl.textContent = data?.target?.name
    ? `${data.target.name} (#${data.target.user_id})`
    : "—";

  const myRel = data?.my_relationship || null;
  const withTarget = data?.relationship_with_target || null;

  const status = withTarget?.status || "none";
  statusLineEl.textContent = formatStatus(status);

  if (myRel?.status && myRel.partner_user_id) {
    myRelLineEl.textContent = `Seu relacionamento atual: ${formatStatus(myRel.status)} com ${myRel.partner_name} (#${myRel.partner_user_id})`;
    setHidden(myRelLineEl, false);
  } else {
    setHidden(myRelLineEl, true);
  }

  setHidden(incomingWrap, true);
  clearActions();

  const targetServerId = data?.target?.server_id;
  const isWithTarget = !!withTarget?.status;
  const isExclusiveWithTarget =
    isWithTarget && myRel?.partner_user_id === data?.target?.user_id;
  const hasSomeoneElse =
    myRel?.partner_user_id && myRel.partner_user_id !== data?.target?.user_id;

  if (!myRel?.status) {
    actionsEl.appendChild(
      createButton("Convidar para namorar", "primary", () =>
        post("requestDating", { targetServerId }),
      ),
    );
    return;
  }

  if (hasSomeoneElse) {
    actionsEl.appendChild(
      createButton("Fechar", "ghost", () => post("close", {})),
    );
    return;
  }

  if (isWithTarget && withTarget.status === "dating") {
    actionsEl.appendChild(
      createButton("Casar", "primary", () =>
        post("requestMarriage", { targetServerId }),
      ),
    );
    actionsEl.appendChild(
      createButton("Terminar relacionamento", "danger", () =>
        post("endRelationship", { targetServerId }),
      ),
    );
    return;
  }

  if (isWithTarget && withTarget.status === "married") {
    actionsEl.appendChild(
      createButton("Terminar casamento", "danger", () =>
        post("endRelationship", { targetServerId }),
      ),
    );
    return;
  }

  if (!isWithTarget && isExclusiveWithTarget) {
    actionsEl.appendChild(
      createButton("Terminar relacionamento", "danger", () =>
        post("endRelationship", { targetServerId }),
      ),
    );
    return;
  }

  actionsEl.appendChild(
    createButton("Fechar", "ghost", () => post("close", {})),
  );
}

function renderIncoming(payload) {
  state.incoming = payload;
  state.panel = null;

  const type = payload?.type;
  const fromName = payload?.from?.name
    ? `${payload.from.name} (#${payload.from.user_id})`
    : "—";

  if (type === "dating") {
    titleEl.textContent = "Pedido de namoro";
    subtitleEl.textContent = "Responda ao convite";
    incomingText.textContent = `${fromName} quer namorar com você.`;
  } else {
    titleEl.textContent = "Pedido de casamento";
    subtitleEl.textContent = "Responda ao pedido";
    incomingText.textContent = `${fromName} quer casar com você.`;
  }

  meNameEl.textContent = "—";
  targetNameEl.textContent = fromName;
  statusLineEl.textContent = type === "dating" ? "Convite" : "Pedido";
  setHidden(myRelLineEl, true);

  clearActions();
  setHidden(incomingWrap, false);
}

function open() {
  app.classList.remove("hidden");
}

function close() {
  app.classList.add("hidden");
  state.panel = null;
  state.incoming = null;
  clearActions();
  setHidden(incomingWrap, true);
}

window.addEventListener("message", (event) => {
  const msg = event.data;
  if (!msg || !msg.action) return;

  if (msg.action === "open") {
    open();
    if (msg.mode === "incoming") {
      renderIncoming(msg.data);
    } else {
      renderPanel(msg.data);
    }
    return;
  }

  if (msg.action === "close") {
    close();
  }
});

closeBtn.addEventListener("click", () => post("close", {}));

acceptBtn.addEventListener("click", () => {
  const token = state.incoming?.token;
  if (!token) return;
  post("respond", { token, accepted: true });
});

declineBtn.addEventListener("click", () => {
  const token = state.incoming?.token;
  if (!token) return;
  post("respond", { token, accepted: false });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") post("close", {});
});
