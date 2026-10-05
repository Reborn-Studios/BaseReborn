/* --------------------------------------------------------------------------------------------
   TRIADE ADMIN - APLICACAO NUI
-------------------------------------------------------------------------------------------- */
const RESOURCE =
  typeof GetParentResourceName === "function"
    ? GetParentResourceName()
    : "triade_admin";
const IMG_LOCAL = "https://cfx-nui-" + RESOURCE + "/img/";

const S = {
  open: false,
  tab: "servidor",
  data: null,
  perms: {},
  remoteImages: "",
  cache: {},
  sel: {},
  timers: {},
  pages: {},
};

/* --------------------------------------------------------------------------------------------
   COMUNICACAO
-------------------------------------------------------------------------------------------- */
let ultimoAvisoRede = 0;

async function post(name, body, resource) {
  try {
    const response = await fetch(
      "https://" + (resource || RESOURCE) + "/" + name,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(body || {}),
      },
    );
    return await response.json();
  } catch (err) {
    console.error('[triade_admin] o pedido "' + name + '" falhou:', err, body);

    // Travao de 10s: a aba do mapa repete a consulta de 5 em 5 segundos e, com o servidor
    // em baixo, isto enchia o ecra de avisos iguais.
    const agora = Date.now();
    if (agora - ultimoAvisoRede > 10000) {
      ultimoAvisoRede = agora;
      toast(
        "Sem resposta",
        'O servidor nao respondeu ao pedido "' +
          name +
          '". Isto nao e uma lista vazia, e uma falha -- veja a consola do servidor.',
        "err",
      );
    }

    return null;
  }
}

async function getData(key, payload) {
  return await post("fetch", { key: key, payload: payload || {} });
}

async function run(key, payload, silent) {
  const result = await post("action", { key: key, payload: payload || {} });
  if (!silent && result && result.message) {
    toast(
      result.ok ? "Sucesso" : "Aviso",
      result.message,
      result.ok ? "ok" : "err",
    );
  }
  return result || { ok: false };
}

function can(key) {
  return S.perms[key] === true;
}

/* --------------------------------------------------------------------------------------------
   HELPERS DE DOM
-------------------------------------------------------------------------------------------- */
function $(id) {
  return document.getElementById(id);
}

function ocupavel(node, handler) {
  let ocupado = false;

  return function (event) {
    if (ocupado) return;

    const resultado = handler.call(this, event);
    // Sincrono: nada a esperar.
    if (!resultado || typeof resultado.then !== "function") return resultado;

    ocupado = true;
    node.classList.add("is-busy");
    if ("disabled" in node) node.disabled = true;

    // Rede de seguranca. Um callback NUI que o Lua se esqueceu de responder deixa a
    // promessa pendente para sempre, e sem isto o botao ficava morto ate reabrir o painel.
    const solta = setTimeout(libertar, 20000);

    function libertar() {
      clearTimeout(solta);
      ocupado = false;
      node.classList.remove("is-busy");
      if ("disabled" in node) node.disabled = false;
    }

    resultado.then(libertar, libertar);
    return resultado;
  };
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const key in attrs) {
      if (key === "class") node.className = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else if (key === "style") Object.assign(node.style, attrs[key]);
      else if (key === "onclick")
        node.addEventListener("click", ocupavel(node, attrs[key]));
      else if (key.startsWith("on"))
        node.addEventListener(key.slice(2), attrs[key]);
      else if (attrs[key] !== null && attrs[key] !== undefined)
        node.setAttribute(key, attrs[key]);
    }
  }
  (children || []).forEach(function (child) {
    if (child === null || child === undefined || child === false) return;
    node.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child,
    );
  });
  return node;
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function money(value) {
  const n = Math.floor(Number(value) || 0);
  return "R$ " + n.toLocaleString("pt-BR");
}

function dateBR(value) {
  if (!value) return "-";
  const raw = String(value).replace("T", " ");
  const parts = raw.split(" ");
  const d = (parts[0] || "").split("-");
  if (d.length !== 3) return raw;
  return d[2] + "/" + d[1] + "/" + d[0];
}

function timeBR(value) {
  if (!value) return "-";
  const raw = String(value).replace("T", " ");
  const parts = raw.split(" ");
  return (parts[1] || "").substring(0, 8) || "-";
}

function initials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/);
  if (!parts[0]) return "--";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function image(file) {
  file = file || "";

  const fontes = [];
  if (/^https?:\/\//i.test(file)) {
    fontes.push(file);
    // Mesmo nome, no CDN remoto. Ex.: .../vehicles/x.png -> .../imagens/x.png
    const nome = file.split("/").pop();
    if (S.remoteImages && nome) fontes.push(S.remoteImages + nome);
  } else {
    fontes.push(IMG_LOCAL + file);
    if (S.remoteImages) fontes.push(S.remoteImages + file);
  }

  const img = el("img", { src: fontes[0], loading: "lazy" });
  let tentativa = 0;

  img.addEventListener("error", function () {
    tentativa++;
    if (tentativa < fontes.length) {
      img.src = fontes[tentativa];
      return;
    }
    img.style.display = "none";
  });

  return img;
}

/* --------------------------------------------------------------------------------------------
   PAGINACAO
-------------------------------------------------------------------------------------------- */
const PAGE_SIZES = [24, 48, 96, 200];

function pageState(key) {
  if (!S.pages[key]) S.pages[key] = { page: 1, size: 48 };
  return S.pages[key];
}

// Volta ao inicio. Chamar sempre que o CONTEUDO da lista muda (busca, troca de aba, novo ID):
// sem isto, procurar uma coisa estando na pagina 9 mostra uma grelha vazia.
function resetPage(key) {
  pageState(key).page = 1;
}

function pagerBar(st, total, count, onChange) {
  const pages = Math.max(1, Math.ceil(total / st.size));
  const from = (st.page - 1) * st.size;

  function go(page) {
    const next = Math.min(pages, Math.max(1, page));
    if (next === st.page) return;
    st.page = next;
    onChange();
  }

  const jump = el("input", {
    type: "number",
    class: "pager-jump",
    min: 1,
    max: pages,
    value: st.page,
    title: "Escreva o numero da pagina e carregue Enter",
  });

  jump.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    go(Number(jump.value) || 1);
    jump.value = st.page;
  });
  // Sem isto, clicar numa seta depois de escrever deixava o campo com o numero antigo.
  jump.addEventListener("blur", function () {
    jump.value = st.page;
  });

  const size = el(
    "select",
    { class: "pager-size", title: "Itens por pagina" },
    PAGE_SIZES.map(function (value) {
      return el("option", {
        value: value,
        text: value + " por pagina",
        selected: value === st.size ? "selected" : null,
      });
    }),
  );

  size.addEventListener("change", function () {
    // Manter o PRIMEIRO item visivel ao mudar o tamanho, em vez de saltar para a pagina 1:
    // quem esta a folhear no meio da lista nao perde o lugar.
    const anchor = (st.page - 1) * st.size;
    st.size = Number(size.value) || 48;
    st.page = Math.floor(anchor / st.size) + 1;
    onChange();
  });

  const step = function (label, title, delta, disabled) {
    return el("button", {
      class: "btn small ghost",
      text: label,
      title: title,
      disabled: disabled ? "disabled" : null,
      onclick: function () {
        go(st.page + delta);
      },
    });
  };

  const edge = function (label, title, target, disabled) {
    return el("button", {
      class: "btn small ghost",
      text: label,
      title: title,
      disabled: disabled ? "disabled" : null,
      onclick: function () {
        go(target);
      },
    });
  };

  const first = total === 0 ? 0 : from + 1;
  const last = from + count;

  return el("div", { class: "pager" }, [
    el("span", {
      class: "pager-count",
      text:
        total === 0 ? "Nada a mostrar" : first + "-" + last + " de " + total,
    }),
    size,
    edge("«", "Primeira pagina", 1, st.page === 1),
    step("‹", "Pagina anterior", -1, st.page === 1),
    el("span", { class: "pager-page" }, [
      jump,
      el("span", { text: "/ " + pages }),
    ]),
    step("›", "Proxima pagina", 1, st.page === pages),
    edge("»", "Ultima pagina", pages, st.page === pages),
  ]);
}

// Lista inteira no cliente: cortamos aqui e devolvemos o pedaco junto com a barra.
function paginate(list, key, onChange) {
  const st = pageState(key);
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / st.size));

  // A pagina pode ter ficado fora do intervalo: a lista encolheu depois de uma busca, ou o
  // tamanho por pagina aumentou. Corrigimos aqui em vez de deixar a grelha vazia.
  if (st.page > pages) st.page = pages;
  if (st.page < 1) st.page = 1;

  const from = (st.page - 1) * st.size;
  const slice = list.slice(from, from + st.size);

  return {
    slice: slice,
    node: pagerBar(st, total, slice.length, onChange),
    total: total,
    pages: pages,
  };
}

// Lista paginada pelo servidor: o cliente so tem a pagina atual, entao passa o total e quantas
// linhas recebeu. `pageQuery(key)` devolve o { page, size } a mandar no pedido.
function serverPager(key, total, count, onChange) {
  return pagerBar(pageState(key), total, count, onChange);
}

function pageQuery(key) {
  const st = pageState(key);
  return { page: st.page, size: st.size };
}

/* --------------------------------------------------------------------------------------------
   ICONES
-------------------------------------------------------------------------------------------- */
const ICONS = {
  server:
    '<path d="M3 5h18v5H3zM3 14h18v5H3z"/><circle cx="7" cy="7.5" r="1"/><circle cx="7" cy="16.5" r="1"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 19c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4"/><path d="M17 8.2a2.8 2.8 0 1 0 0-.2"/><path d="M17.5 13.8c2.4.4 4 2.2 4 5.2"/>',
  alert:
    '<path d="M12 3 2.5 20h19z"/><path d="M12 9.5v5"/><circle cx="12" cy="17.2" r=".8" fill="currentColor"/>',
  map: '<path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6z"/><path d="M9 3v15M15 6v15"/>',
  headset:
    '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h2.5v6H5a1 1 0 0 1-1-1z"/><path d="M20 13h-2.5v6H19a1 1 0 0 0 1-1z"/><path d="M17.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-2"/>',
  shield:
    '<path d="M12 3 4.5 6v6c0 4.4 3.1 8.1 7.5 9 4.4-.9 7.5-4.6 7.5-9V6z"/>',
  idcard:
    '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5 16c.6-1.5 2-2.2 3.5-2.2S11.4 14.5 12 16"/><path d="M14.5 10h4M14.5 13.5h4"/>',
  box: '<path d="M12 2.8 3.5 7v10L12 21.2 20.5 17V7z"/><path d="M3.5 7 12 11.3 20.5 7M12 11.3v10"/>',
  car: '<path d="M4.5 16.5h15M6 16.5v2h-2v-2M18 16.5v2h2v-2"/><path d="M3.5 16.5v-3.2l1.8-4.5A2 2 0 0 1 7.1 7.5h9.8a2 2 0 0 1 1.8 1.3l1.8 4.5v3.2z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  pin: '<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  cloud:
    '<path d="M7 18h10.5a3.5 3.5 0 0 0 .3-7 5.5 5.5 0 0 0-10.6-1.3A4 4 0 0 0 7 18z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/>',
  rain: '<path d="M7 15h10a3.4 3.4 0 0 0 .3-6.8 5.4 5.4 0 0 0-10.4-1.3A3.9 3.9 0 0 0 7 15z"/><path d="M9 18.5l-1 2.5M13 18.5l-1 2.5M17 18.5l-1 2.5"/>',
  snow: '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2 3.8 16.8"/>',
  haze: '<path d="M4 9h16M4 13h16M7 17h10"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  wrench:
    '<path d="M20 6.5a5 5 0 0 1-6.6 6.2L6.9 19.2a2.2 2.2 0 0 1-3.1-3.1l6.5-6.5A5 5 0 0 1 16.5 3z"/>',
  heart:
    '<path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  ban: '<circle cx="12" cy="12" r="8.5"/><path d="m6.2 6.2 11.6 11.6"/>',
  moneyin:
    '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M17.5 9.5v5"/>',
  moneyout:
    '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5"/>',
  message:
    '<path d="M20.5 15.5a2 2 0 0 1-2 2H8l-4.5 3.5v-14a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  trash: '<path d="M4.5 6.5h15M9.5 6.5V4.8h5v1.7M6.5 6.5l1 13h9l1-13"/>',
  star: '<path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 3.5V9h-5.5"/>',
  plus: '<path d="M12 5.5v13M5.5 12h13"/>',
  minus: '<path d="M5.5 12h13"/>',
  eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.3 2"/>',
  trophy:
    '<path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 5.5H5A2.5 2.5 0 0 0 7.5 9M16.5 5.5H19A2.5 2.5 0 0 1 16.5 9"/><path d="M10 13.5h4l.5 3.5h-5z"/><path d="M8 20h8"/>',
  history:
    '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4.5V10H9"/><path d="M12 8v4.4l3 1.8"/>',
  target:
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/>',
  key: '<circle cx="8" cy="14" r="4"/><path d="m11 11 8-8 2 2-2 2 1.5 1.5L18.5 10 17 8.5 14.5 11"/>',
  fire: '<path d="M12 21c3.6 0 6-2.4 6-5.7 0-4-4.3-5.7-3.4-10.3C11.8 6.6 6 9.4 6 15.3 6 18.6 8.4 21 12 21z"/>',
  snowflake:
    '<path d="M12 2.5v19M4 7l16 10M20 7 4 17"/><path d="m9.5 4.5 2.5 2.5 2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
  folder:
    '<path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2.2h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z"/>',
};

function icon(name, size) {
  const body = ICONS[name] || ICONS.box;
  const svg =
    '<svg viewBox="0 0 24 24" width="' +
    (size || 17) +
    '" height="' +
    (size || 17) +
    '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    body +
    "</svg>";
  const span = document.createElement("span");
  span.innerHTML = svg;
  span.style.display = "inline-flex";
  return span;
}

/* --------------------------------------------------------------------------------------------
   TOASTS
-------------------------------------------------------------------------------------------- */
function toast(title, message, kind) {
  const node = el("div", { class: "toast " + (kind || "") }, [
    el("strong", { text: title }),
    el("div", { html: message }),
  ]);
  $("toasts").appendChild(node);
  setTimeout(function () {
    node.style.opacity = "0";
    node.style.transform = "translateX(20px)";
    node.style.transition = "0.25s";
    setTimeout(function () {
      node.remove();
    }, 260);
  }, 4200);
}

/* --------------------------------------------------------------------------------------------
   MODAL
-------------------------------------------------------------------------------------------- */
let modalHandler = null;
let modalBusy = false;
let modalConfirmText = "";

let modalDepois = null;

function openModal(options) {
  $("modalTitle").textContent = options.title || "";
  $("modalSubtitle").textContent = options.subtitle || "";
  $("modalConfirm").innerHTML = options.confirmText || "&#10003; Executar";
  $("modalConfirm").className =
    "btn " + (options.danger ? "danger" : "primary");

  const body = $("modalBody");
  clear(body);

  (options.fields || []).forEach(function (field) {
    const wrap = el("div");
    if (field.label)
      wrap.appendChild(el("label", { class: "field", text: field.label }));

    let input;
    if (field.type === "select") {
      input = el("select");
      (field.options || []).forEach(function (option) {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;
        const opt = el("option", { value: value, text: label });
        if (String(field.value) === String(value)) opt.selected = true;
        input.appendChild(opt);
      });
    } else if (field.type === "textarea") {
      input = el("textarea", { placeholder: field.placeholder || "" });
      input.value = field.value || "";
    } else {
      input = el("input", {
        type: field.type || "text",
        placeholder: field.placeholder || "",
      });
      input.value =
        field.value !== undefined && field.value !== null ? field.value : "";
    }

    input.dataset.key = field.key;
    wrap.appendChild(input);
    if (field.hint)
      wrap.appendChild(
        el("div", {
          class: "muted",
          style: { marginTop: "6px" },
          text: field.hint,
        }),
      );
    body.appendChild(wrap);
  });

  if (options.content) body.appendChild(options.content);

  // `wide` existe para a janela do print: 520px nao serve para ver uma tela de 1080p.
  $("modal")
    .querySelector(".modal")
    .classList.toggle("wide", options.wide === true);

  // Janela so de leitura (print, info da entidade): "Cancelar" e "Fechar" fariam a mesma
  // coisa, e dois botoes iguais lado a lado so fazem a pessoa hesitar.
  $("modalCancel").hidden = !options.onConfirm;

  modalHandler = options.onConfirm || null;
  modalConfirmText = options.confirmText || "&#10003; Executar";
  modalDepois = null;
  setModalBusy(false);
  $("modal").classList.remove("hidden");

  const first = body.querySelector("input, select, textarea");
  if (first)
    setTimeout(function () {
      first.focus();
    }, 60);
}

function closeModal() {
  $("modal").classList.add("hidden");
  modalHandler = null;
  modalDepois = null;
  setModalBusy(false);
}

function setModalBusy(estado) {
  modalBusy = estado === true;

  $("modalConfirm").disabled = modalBusy;
  $("modalCancel").disabled = modalBusy;
  $("modalClose").disabled = modalBusy;
  $("modalConfirm").innerHTML = modalBusy ? "A executar..." : modalConfirmText;
}

function modalValues() {
  const values = {};
  $("modalBody")
    .querySelectorAll("[data-key]")
    .forEach(function (node) {
      values[node.dataset.key] = node.value;
    });
  return values;
}

/* --------------------------------------------------------------------------------------------
   NAVEGACAO
-------------------------------------------------------------------------------------------- */
function renderNav() {
  const nav = $("nav");
  clear(nav);

  S.data.tabs.forEach(function (tab) {
    const allowed = can("tab." + tab.id);
    const button = el(
      "button",
      {
        class:
          "nav-item" +
          (S.tab === tab.id ? " active" : "") +
          (allowed ? "" : " locked"),
        onclick: function () {
          if (!allowed) {
            toast("Bloqueado", "Voce nao tem permissao para esta aba.", "err");
            return;
          }
          setTab(tab.id);
        },
      },
      [icon(tab.icon, 17), el("span", { text: tab.label })],
    );
    nav.appendChild(button);
  });
}

function setTab(id) {
  S.tab = id;
  const tab = S.data.tabs.find(function (t) {
    return t.id === id;
  });
  if (tab) {
    $("pageEyebrow").textContent = tab.eyebrow;
    $("pageTitle").textContent = tab.title;
  }
  renderNav();
  renderTab();
}

function stopTimers() {
  Object.keys(S.timers).forEach(function (key) {
    clearInterval(S.timers[key]);
    delete S.timers[key];
  });
}

function renderTab() {
  stopTimers();
  const view = $("view");
  clear(view);
  view.appendChild(
    el("div", { class: "empty" }, [el("span", { text: "A carregar..." })]),
  );

  const renderer = RENDER[S.tab];
  if (renderer) renderer(view);
}

/* --------------------------------------------------------------------------------------------
   ABA: SERVIDOR
-------------------------------------------------------------------------------------------- */
const SERVER_COMMANDS = [
  {
    key: "server.whitelist",
    icon: "check",
    tone: "",
    label: "Liberar whitelist",
    desc: "Libera o acesso do passaporte informado.",
    fields: [
      {
        key: "passport",
        label: "Passaporte / ID",
        type: "number",
        placeholder: "Ex.: 15",
      },
    ],
  },
  {
    key: "server.unwhitelist",
    icon: "ban",
    tone: "red",
    label: "Remover whitelist",
    desc: "Remove o acesso do passaporte informado.",
    fields: [
      {
        key: "passport",
        label: "Passaporte / ID",
        type: "number",
        placeholder: "Ex.: 15",
      },
    ],
  },
  {
    key: "server.ban",
    icon: "ban",
    tone: "red",
    label: "Banir jogador",
    desc: "Registra o banimento na estrutura de bans da sua vRP.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      {
        key: "reason",
        label: "Motivo",
        type: "text",
        placeholder: "Motivo do banimento",
      },
    ],
  },
  {
    key: "server.unban",
    icon: "check",
    tone: "",
    label: "Desbanir jogador",
    desc: "Remove o banimento do passaporte informado. O motivo e obrigatorio.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      { key: "reason", label: "Motivo do desbanimento", type: "text" },
    ],
  },
  {
    key: "server.rg",
    icon: "idcard",
    tone: "",
    label: "Consultar RG",
    desc: "Exibe identidade, dinheiro, multas e cargos do passaporte.",
    fields: [
      {
        key: "passport",
        label: "Passaporte / ID",
        type: "number",
        placeholder: "Ex.: 15",
      },
    ],
  },
  {
    key: "server.announce",
    icon: "message",
    tone: "",
    label: "Aviso geral",
    desc: "Exibe um aviso administrativo na tela de todos os jogadores.",
    fields: [{ key: "message", label: "Mensagem", type: "textarea" }],
  },
  {
    key: "server.addmoney",
    icon: "moneyin",
    tone: "green",
    label: "Adicionar dinheiro",
    desc: "Adiciona dinheiro na carteira ou no banco.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      { key: "amount", label: "Valor", type: "number" },
      {
        key: "account",
        label: "Conta",
        type: "select",
        options: [
          { value: "wallet", label: "Carteira" },
          { value: "bank", label: "Banco" },
        ],
      },
    ],
  },
  {
    key: "server.remmoney",
    icon: "moneyout",
    tone: "red",
    label: "Remover dinheiro",
    desc: "Retira dinheiro da carteira ou do banco.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      { key: "amount", label: "Valor", type: "number" },
      {
        key: "account",
        label: "Conta",
        type: "select",
        options: [
          { value: "wallet", label: "Carteira" },
          { value: "bank", label: "Banco" },
        ],
      },
    ],
  },
  {
    key: "server.dm",
    icon: "message",
    tone: "",
    label: "Mensagem privada",
    desc: "Exibe um aviso administrativo diretamente na tela do jogador.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      { key: "message", label: "Mensagem", type: "textarea" },
    ],
  },
  {
    key: "server.warn",
    icon: "alert",
    tone: "red",
    label: "Advertencia",
    desc: "Envia o jogador para o castigo em uma dimensao isolada pelo tempo definido e registra o motivo.",
    fields: [
      { key: "passport", label: "Passaporte / ID", type: "number" },
      { key: "reason", label: "Motivo", type: "text" },
      {
        key: "minutes",
        label: "Tempo de castigo (minutos)",
        type: "number",
        value: 15,
      },
    ],
  },
  {
    key: "server.waypoint",
    icon: "map",
    tone: "",
    label: "Ir ao waypoint",
    desc: "Teleporta voce para a marcacao atual do mapa.",
    fields: [],
  },
  {
    key: "server.tpcoords",
    icon: "target",
    tone: "",
    label: "Teleportar por coordenadas",
    desc: "Cole a coordenada completa no formato X, Y, Z.",
    fields: [
      {
        key: "coords",
        label: "Coordenadas",
        type: "text",
        placeholder: "46.63, -899.06, 29.98",
      },
    ],
  },
  {
    key: "server.hash",
    icon: "idcard",
    tone: "",
    label: "Hash do veiculo",
    desc: "Exibe nome e hash do veiculo atual ou mais proximo.",
    fields: [],
  },
  {
    key: "server.repair",
    icon: "wrench",
    tone: "",
    label: "Reparar veiculo",
    desc: "Repara o veiculo atual ou o mais proximo.",
    fields: [],
  },
  {
    key: "server.reviveall",
    icon: "heart",
    tone: "green",
    label: "Reviver todos",
    desc: "Restaura a vida de todos os jogadores online.",
    fields: [],
  },
  {
    key: "server.clearvehicles",
    icon: "trash",
    tone: "red",
    label: "Limpar veiculos",
    desc: "Inicia a limpeza global de veiculos vazios apos o aviso configurado.",
    fields: [],
  },
  {
    key: "server.clearprops",
    icon: "trash",
    tone: "red",
    label: "Limpar props",
    desc: "Remove objetos dentro do raio configurado ao redor da staff.",
    fields: [
      { key: "radius", label: "Raio (metros)", type: "number", value: 100 },
    ],
  },
  {
    key: "server.delvehicle",
    icon: "trash",
    tone: "red",
    label: "Deletar veiculo",
    desc: "Remove o veiculo atual ou o mais proximo.",
    fields: [],
  },
  {
    key: "server.wipeid",
    icon: "trash",
    tone: "red",
    label: "Limpar dados ID",
    desc: "Apaga permanentemente todos os dados vinculados ao ID e deixa o passaporte livre.",
    fields: [{ key: "passport", label: "Passaporte / ID", type: "number" }],
    confirm: true,
  },
];

const RENDER = {};

RENDER.servidor = async function (view) {
  const info = (await getData("server")) || {};
  clear(view);

  const banners = el("div", { class: "grid grid-2" });

  if (can("server.permissions")) {
    banners.appendChild(
      el("div", { class: "banner", onclick: openPermissions }, [
        el("div", { class: "ic" }, [icon("key", 20)]),
        el("div", { class: "txt" }, [
          el("span", { text: "CONTROLE DE ACESSO" }),
          el("strong", { text: "Permissoes do Painel" }),
        ]),
        el("div", { class: "btn small primary", text: "Gerenciar" }),
      ]),
    );
  }

  if (can("server.banhistory")) {
    banners.appendChild(
      el("div", { class: "banner", onclick: openBanHistory }, [
        el("div", { class: "ic" }, [icon("history", 20)]),
        el("div", { class: "txt" }, [
          el("span", { text: "HISTORICO DE MODERACAO" }),
          el("strong", {
            text: "Registros de ban e unban (" + (info.bans || 0) + ")",
          }),
        ]),
        el("div", { class: "btn small primary", text: "Ver registros" }),
      ]),
    );
  }

  const card = el("div", { class: "card" });
  card.appendChild(
    el("div", { class: "card-head" }, [
      el("div", {}, [el("h3", { text: "COMANDOS ADM GERAIS" }), ,]),
    ]),
  );

  const grid = el("div", { class: "grid grid-4" });
  SERVER_COMMANDS.forEach(function (command) {
    const allowed = can(command.key);
    grid.appendChild(
      el(
        "button",
        {
          class: "action-card " + command.tone + (allowed ? "" : " locked"),
          onclick: function () {
            runServerCommand(command);
          },
        },
        [
          el("div", { class: "top" }, [
            el("div", { class: "ic" }, [icon(command.icon, 16)]),
            el("strong", { text: command.label }),
          ]),
          el("p", { text: command.desc }),
        ],
      ),
    );
  });

  card.appendChild(grid);
  view.appendChild(el("div", { class: "stack" }, [banners, card]));
};

function runServerCommand(command) {
  if (!command.fields.length) {
    if (command.confirm) {
      openModal({
        title: command.label,
        subtitle: command.desc,
        danger: true,
        confirmText: "Confirmar",
        onConfirm: function () {
          return run(command.key, {});
        },
      });
      return;
    }
    run(command.key, {}).then(function (result) {
      handleCommandResult(command, result);
    });
    return;
  }

  openModal({
    title: command.label,
    subtitle: command.desc,
    danger: command.tone === "red",
    fields: command.fields,
    onConfirm: async function (values) {
      const result = await run(command.key, values);

      // Devolver o resultado e o que deixa a janela aberta quando o servidor recusa.
      if (!result || !result.ok) return result;

      // O "Consultar RG" e o "Hash do veiculo" respondem com uma janela nova, e o
      // openModal reaproveita este mesmo DOM -- por isso so depois de esta fechar.
      modalDepois = function () {
        handleCommandResult(command, result);
      };
      return result;
    },
  });
}

function handleCommandResult(command, result) {
  if (!result || !result.ok || !result.data) return;

  if (command.key === "server.rg") {
    const data = result.data;
    const content = el("div", { class: "stack" }, [
      el(
        "div",
        {
          class: "kpis",
          style: { gridTemplateColumns: "repeat(3, minmax(0,1fr))" },
        },
        [
          kpi("Passaporte", "#" + data.passport),
          kpi("Carteira", money(data.wallet)),
          kpi("Banco", money(data.bank)),
        ],
      ),
      el(
        "div",
        {
          class: "kpis",
          style: { gridTemplateColumns: "repeat(3, minmax(0,1fr))" },
        },
        [
          kpi("RG", data.registration || "-"),
          kpi("Telefone", data.phone || "-"),
          kpi("Multas", money(data.fines)),
        ],
      ),
      el("div", {}, [
        el("label", { class: "field", text: "Cargos" }),
        el(
          "div",
          { class: "row", style: { flexWrap: "wrap" } },
          (data.groups || []).map(function (group) {
            return el("span", { class: "tag", text: group });
          }),
        ),
      ]),
    ]);

    openModal({
      title: data.name,
      subtitle:
        "Passaporte #" +
        data.passport +
        (data.online ? " - Online" : " - Offline"),
      confirmText: "Fechar",
      content: content,
      onConfirm: function () {},
    });
  }

  if (command.key === "server.hash") {
    openModal({
      title: "Hash do veiculo",
      subtitle: "Dados do veiculo mais proximo.",
      confirmText: "Fechar",
      fields: [
        { key: "model", label: "Modelo", value: result.data.model },
        { key: "hash", label: "Hash", value: result.data.hash },
        { key: "plate", label: "Placa", value: result.data.plate },
      ],
      onConfirm: function () {},
    });
  }
}

function kpi(label, value, danger) {
  return el("div", { class: "kpi" + (danger ? " red" : "") }, [
    el("span", { text: label }),
    el("strong", { text: value }),
  ]);
}

async function openPermissions() {
  const data = await getData("permissions");
  if (!data) return;

  const content = el("div", { class: "stack" });

  data.groups.forEach(function (group) {
    const table = el("table");
    const head = el("tr", {}, [el("th", { text: group.group })]);
    data.roles.forEach(function (role) {
      head.appendChild(
        el("th", {
          text: role.label,
          style: { textAlign: "center", width: "90px" },
        }),
      );
    });
    table.appendChild(el("thead", {}, [head]));

    const body = el("tbody");
    group.items.forEach(function (item) {
      const row = el("tr", {}, [el("td", { text: item.label })]);
      data.roles.forEach(function (role) {
        const cell = el("td", { style: { textAlign: "center" } });
        const toggle = el("div", {
          class: "toggle" + (item.access[role.id] ? " on" : ""),
          style: { margin: "0 auto" },
        });
        toggle.addEventListener("click", async function () {
          const next = !toggle.classList.contains("on");
          const result = await run(
            "server.permissions.set",
            { key: item.key, role: role.id, allowed: next },
            true,
          );
          if (result.ok) toggle.classList.toggle("on", next);
          else toast("Aviso", result.message || "Falha ao alterar.", "err");
        });
        cell.appendChild(toggle);
        row.appendChild(cell);
      });
      body.appendChild(row);
    });

    table.appendChild(body);
    content.appendChild(el("div", { class: "table-wrap" }, [table]));
  });

  // Deita fora a configuracao de permissoes toda, de todos os cargos, de uma vez. Era a acao
  // de maior alcance do painel sem uma unica pergunta pelo meio.
  const reset = el("button", {
    class: "btn danger",
    text: "Restaurar padrao",
    onclick: function () {
      openModal({
        title: "Restaurar as permissoes padrao",
        subtitle:
          "Apaga o que foi configurado para Admin, Moderador e Suporte e repoe os valores de origem. Nao ha como desfazer.",
        danger: true,
        confirmText: "Restaurar",
        onConfirm: async function () {
          const result = await run("server.permissions.reset");
          if (result && result.ok) modalDepois = openPermissions;
          return result;
        },
      });
    },
  });

  content.appendChild(reset);

  openModal({
    title: "Permissoes do Painel",
    subtitle: "Ative ou desative cada funcao por cargo.",
    confirmText: "Fechar",
    content: content,
    onConfirm: function () {},
  });
}

async function openBanHistory() {
  const content = el("div", { class: "stack" });
  const search = el("input", {
    type: "search",
    placeholder: "Buscar por ID, nome, staff ou motivo...",
  });
  const wrap = el("div", { class: "table-wrap" });

  async function load() {
    const data = await getData("banhistory", { search: search.value });
    clear(wrap);

    const table = el("table");
    table.appendChild(
      el("thead", {}, [
        el("tr", {}, [
          el("th", { text: "Acao" }),
          el("th", { text: "Jogador" }),
          el("th", { text: "ID" }),
          el("th", { text: "Staff" }),
          el("th", { text: "Motivo" }),
          el("th", { text: "Data" }),
          el("th", { text: "Hora" }),
        ]),
      ]),
    );

    const body = el("tbody");
    ((data && data.records) || []).forEach(function (row) {
      body.appendChild(
        el("tr", {}, [
          el("td", {}, [
            el("span", {
              class: "tag " + (row.action === "ban" ? "red" : "green"),
              text: row.action === "ban" ? "BAN" : "UNBAN",
            }),
          ]),
          el("td", { text: row.name || "-" }),
          el("td", { text: "#" + row.passport }),
          el("td", { text: (row.staff_name || "-") + " #" + row.staff_id }),
          el("td", { text: row.reason || "-" }),
          el("td", { text: dateBR(row.created_at) }),
          el("td", { text: timeBR(row.created_at) }),
        ]),
      );
    });

    if (!body.children.length) {
      body.appendChild(
        el("tr", {}, [
          el("td", {
            colspan: "7",
            text: "Nenhum registro encontrado.",
            style: { textAlign: "center", color: "var(--muted)" },
          }),
        ]),
      );
    }

    table.appendChild(body);
    wrap.appendChild(table);
  }

  search.addEventListener("input", function () {
    load();
  });
  content.appendChild(el("div", { class: "search" }, [search]));
  content.appendChild(wrap);
  load();

  openModal({
    title: "Registros de ban e unban",
    subtitle: "Historico completo de moderacao do servidor.",
    confirmText: "Fechar",
    content: content,
    onConfirm: function () {},
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: JOGADORES
-------------------------------------------------------------------------------------------- */
RENDER.jogadores = async function (view) {
  const data = (await getData("players")) || { players: [], counters: [] };
  S.cache.players = data.players;
  clear(view);

  const counters = el("div", { class: "grid grid-6" });
  data.counters.forEach(function (counter) {
    counters.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [icon(counter.icon, 17)]),
        el("div", {}, [
          el("strong", { text: String(counter.value) }),
          el("span", { text: counter.label }),
        ]),
      ]),
    );
  });

  const search = el("input", {
    type: "search",
    placeholder: "Buscar por nome ou ID...",
  });
  const list = el("div", { class: "list" });
  const detail = el("div", { class: "card", style: { minHeight: "520px" } });

  function renderList() {
    const term = search.value.toLowerCase();
    clear(list);

    const filtered = data.players.filter(function (player) {
      return (
        !term ||
        player.name.toLowerCase().includes(term) ||
        String(player.passport).includes(term)
      );
    });

    if (!filtered.length) {
      list.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum jogador encontrado" }),
        ]),
      );
      return;
    }

    filtered.forEach(function (player) {
      list.appendChild(
        el(
          "div",
          {
            class:
              "list-item" + (S.sel.player === player.passport ? " active" : ""),
            onclick: function () {
              S.sel.player = player.passport;
              renderList();
              loadPlayer(player.passport);
            },
          },
          [
            el("div", { class: "avatar", text: player.initials }),
            el("div", { class: "user-text" }, [
              el("strong", { text: player.name }),
              el("span", {
                text: "ID #" + player.passport + " - Bucket " + player.bucket,
              }),
            ]),
            el("div", { class: "meta" }, [
              el("strong", { text: "#" + player.passport }),
              el("span", { text: player.ping + "ms" }),
            ]),
          ],
        ),
      );
    });
  }

  async function loadPlayer(passport) {
    clear(detail);
    detail.appendChild(
      el("div", { class: "empty" }, [el("span", { text: "A carregar..." })]),
    );

    const player = await getData("player", { passport: passport });
    clear(detail);
    if (!player) {
      detail.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Jogador nao encontrado" }),
        ]),
      );
      return;
    }

    detail.appendChild(
      el("div", { class: "card-head" }, [
        el("div", { class: "row" }, [
          el("div", {
            class: "avatar",
            style: { width: "52px", height: "52px", fontSize: "16px" },
            text: player.initials,
          }),
          el("div", {}, [
            el("h3", { text: player.name }),
            el("p", {
              text:
                "Passaporte #" +
                player.passport +
                " - Source " +
                player.source +
                " - Bucket " +
                player.bucket,
            }),
          ]),
        ]),
        el("div", { class: "row" }, [
          can("player.inventory")
            ? el(
                "button",
                {
                  class: "btn",
                  onclick: function () {
                    openInventory(player);
                  },
                },
                [
                  icon("box", 15),
                  el("span", { text: "Inspecionar Inventario" }),
                ],
              )
            : null,
          el("span", {
            class: "tag " + (player.online ? "green" : "grey"),
            text: player.online ? "ONLINE" : "OFFLINE",
          }),
        ]),
      ]),
    );

    detail.appendChild(
      el("div", { class: "kpis" }, [
        kpi("Carteira", money(player.wallet)),
        kpi("Banco", money(player.bank)),
        kpi("Multas", money(player.fines)),
        kpi("Advertencias", String(player.warns), player.warns > 0),
        kpi("Ping", player.ping + "ms"),
      ]),
    );

    detail.appendChild(
      el(
        "div",
        {
          class: "card-head",
          style: { marginTop: "18px", marginBottom: "10px" },
        },
        [
          el("h3", { text: "Acoes rapidas", style: { fontSize: "14px" } }),
          el("span", {
            class: "muted",
            text: "As permissoes tambem sao verificadas no servidor.",
          }),
        ],
      ),
    );

    const quick = [
      {
        key: "player.goto",
        icon: "pin",
        label: "Ir ate",
        run: function () {
          return run("player.goto", { passport: player.passport });
        },
      },
      {
        key: "player.bring",
        icon: "target",
        label: "Puxar",
        run: function () {
          return run("player.bring", { passport: player.passport });
        },
      },
      {
        key: "player.spectate",
        icon: "eye",
        label: "Ver tela",
        run: function () {
          return startPreview(player);
        },
      },
      // O print nao devolve a imagem nesta chamada: ela chega depois, pelo evento
      // `screenshot`, e abre a janela sozinha.
      {
        key: "player.screenshot",
        icon: "target",
        label: "Print da tela",
        run: function () {
          return run("player.screenshot", { passport: player.passport });
        },
      },
      {
        key: "player.revive",
        icon: "heart",
        label: "Reviver",
        run: function () {
          return run("player.revive", { passport: player.passport });
        },
      },
      {
        key: "player.freeze",
        icon: "snowflake",
        label: "Congelar",
        run: function () {
          return run("player.freeze", {
            passport: player.passport,
            state: true,
          });
        },
      },
      {
        key: "player.freeze",
        icon: "sun",
        label: "Descongelar",
        run: function () {
          return run("player.freeze", {
            passport: player.passport,
            state: false,
          });
        },
      },
      {
        key: "player.message",
        icon: "message",
        label: "Mensagem",
        run: function () {
          promptMessage(player);
        },
      },
      {
        key: "player.warn",
        icon: "alert",
        label: "Advertencia",
        run: function () {
          promptWarn(player);
        },
      },
      {
        key: "player.rg",
        icon: "idcard",
        label: "RG",
        run: function () {
          return run("player.rg", { passport: player.passport });
        },
      },
      {
        key: "player.money",
        icon: "moneyin",
        label: "Adicionar dinheiro",
        run: function () {
          promptMoney(player, true);
        },
      },
      {
        key: "player.money",
        icon: "moneyout",
        label: "Remover dinheiro",
        run: function () {
          promptMoney(player, false);
        },
      },
      // Tira TODAS as armas do jogador e nao se desfaz: confirma primeiro. Esta sentado
      // entre o "Remover dinheiro" e o "Kick", e e facil de acertar por engano.
      {
        key: "player.clearweapons",
        icon: "trash",
        label: "Limpar armas",
        run: function () {
          openModal({
            title: "Limpar as armas de " + player.name,
            subtitle:
              "Passaporte #" +
              player.passport +
              ". Remove todas as armas do jogador. Nao ha como desfazer.",
            danger: true,
            confirmText: "Limpar armas",
            onConfirm: function () {
              return run("player.clearweapons", { passport: player.passport });
            },
          });
        },
      },
      {
        key: "player.kick",
        icon: "ban",
        label: "Kick",
        run: function () {
          promptKick(player);
        },
      },
      {
        key: "player.ban",
        icon: "ban",
        label: "Banir",
        run: function () {
          promptBan(player);
        },
      },
    ];

    const actions = el("div", { class: "grid grid-3" });
    quick.forEach(function (item) {
      if (!can(item.key)) return;
      actions.appendChild(
        el(
          "button",
          {
            class: "btn",
            style: { justifyContent: "flex-start" },
            onclick: item.run,
          },
          [icon(item.icon, 15), el("span", { text: item.label })],
        ),
      );
    });
    detail.appendChild(actions);

    detail.appendChild(
      el(
        "div",
        {
          class: "card-head",
          style: { marginTop: "20px", marginBottom: "10px" },
        },
        [
          el("h3", { text: "Cargos atuais", style: { fontSize: "14px" } }),
          can("tab.setagem")
            ? el("button", {
                class: "btn small",
                text: "Gerenciar",
                onclick: function () {
                  S.sel.setagem = player.passport;
                  setTab("setagem");
                },
              })
            : null,
        ],
      ),
    );

    const tags = el("div", { class: "row", style: { flexWrap: "wrap" } });
    if (!player.groups.length)
      tags.appendChild(
        el("span", { class: "muted", text: "Nenhum cargo definido." }),
      );
    player.groups.forEach(function (group) {
      tags.appendChild(
        el("span", {
          class: "tag",
          text: group.group + (group.level > 1 ? " - " + group.level : ""),
        }),
      );
    });
    detail.appendChild(tags);
  }

  search.addEventListener("input", renderList);

  view.appendChild(
    el("div", { class: "stack" }, [
      counters,
      el("div", { class: "split" }, [
        el("div", { class: "card" }, [
          el("div", { class: "search", style: { marginBottom: "12px" } }, [
            search,
          ]),
          list,
        ]),
        detail,
      ]),
    ]),
  );

  renderList();
  if (S.sel.player) loadPlayer(S.sel.player);
  else
    detail.appendChild(
      el("div", { class: "empty" }, [
        icon("users", 26),
        el("strong", { text: "Selecione um jogador" }),
        el("span", { text: "Escolha alguem na lista para ver os detalhes." }),
      ]),
    );
};

function promptMessage(player) {
  openModal({
    title: "Mensagem privada",
    subtitle: "Enviar para " + player.name + " #" + player.passport,
    fields: [{ key: "message", label: "Mensagem", type: "textarea" }],
    onConfirm: function (values) {
      return run("player.message", {
        passport: player.passport,
        message: values.message,
      });
    },
  });
}

function promptWarn(player) {
  openModal({
    title: "Aplicar advertencia",
    subtitle: player.name + " #" + player.passport,
    danger: true,
    fields: [
      {
        key: "reason",
        label: "Motivo",
        type: "select",
        options: (S.data.warnReasons || []).map(function (r) {
          return { value: r, label: r };
        }),
      },
      { key: "custom", label: "Motivo personalizado (opcional)", type: "text" },
      {
        key: "minutes",
        label: "Tempo de castigo (minutos)",
        type: "select",
        options: (S.data.warnTimes || []).map(function (t) {
          return { value: t, label: t + " minutos" };
        }),
      },
    ],
    onConfirm: function (values) {
      return run("player.warn", {
        passport: player.passport,
        reason:
          values.custom && values.custom.trim() ? values.custom : values.reason,
        minutes: values.minutes,
      });
    },
  });
}

function promptMoney(player, add) {
  openModal({
    title: add ? "Adicionar dinheiro" : "Remover dinheiro",
    subtitle: player.name + " #" + player.passport,
    fields: [
      { key: "amount", label: "Valor", type: "number", placeholder: "10000" },
      {
        key: "account",
        label: "Conta",
        type: "select",
        options: [
          { value: "wallet", label: "Carteira" },
          { value: "bank", label: "Banco" },
        ],
      },
    ],
    onConfirm: function (values) {
      return run(add ? "player.addmoney" : "player.remmoney", {
        passport: player.passport,
        amount: values.amount,
        account: values.account,
      });
    },
  });
}

function promptKick(player) {
  openModal({
    title: "Kickar jogador",
    subtitle: player.name + " #" + player.passport,
    danger: true,
    fields: [{ key: "reason", label: "Motivo", type: "text" }],
    onConfirm: function (values) {
      return run("player.kick", {
        passport: player.passport,
        reason: values.reason,
      });
    },
  });
}

function promptBan(player) {
  openModal({
    title: "Banir jogador",
    subtitle: player.name + " #" + player.passport,
    danger: true,
    fields: [{ key: "reason", label: "Motivo", type: "text" }],
    onConfirm: function (values) {
      return run("player.ban", {
        passport: player.passport,
        reason: values.reason,
      });
    },
  });
}

async function openInventory(player) {
  const content = el("div", { class: "stack" });
  const search = el("input", {
    type: "search",
    placeholder: "Buscar no inventario...",
  });
  const grid = el("div", { class: "grid grid-3" });

  async function load() {
    const data = await getData("inventory", { passport: player.passport });
    clear(grid);

    const term = search.value.toLowerCase();
    const items = ((data && data.items) || []).filter(function (item) {
      return (
        !term ||
        item.label.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term)
      );
    });

    if (!items.length) {
      grid.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Inventario vazio" }),
        ]),
      );
      return;
    }

    items.forEach(function (item) {
      grid.appendChild(
        el("div", { class: "tile" }, [
          el("div", { class: "thumb" }, [image(item.image)]),
          el("div", { class: "info" }, [
            el("strong", { text: item.label }),
            el("span", { text: item.name + " - x" + item.count }),
          ]),
          can("player.inventory.edit")
            ? el("button", {
                class: "btn small danger",
                text: "Remover",
                onclick: async function () {
                  await run("inventory.remove", {
                    passport: player.passport,
                    item: item.name,
                    amount: item.count,
                    slot: item.slot,
                  });
                  load();
                },
              })
            : null,
        ]),
      );
    });
  }

  search.addEventListener("input", load);

  const header = el("div", { class: "row" }, [
    el("div", { class: "search", style: { flex: 1 } }, [search]),
    can("player.inventory.edit")
      ? el("button", {
          class: "btn primary small",
          text: "+ Add item",
          onclick: function () {
            openModal({
              title: "Adicionar item",
              subtitle: player.name + " #" + player.passport,
              fields: [
                { key: "item", label: "Nome do item (spawn)", type: "text" },
                {
                  key: "amount",
                  label: "Quantidade",
                  type: "number",
                  value: 1,
                },
              ],
              onConfirm: async function (values) {
                const result = await run("inventory.add", {
                  passport: player.passport,
                  item: values.item,
                  amount: values.amount,
                });
                if (result && result.ok)
                  modalDepois = function () {
                    openInventory(player);
                  };
                return result;
              },
            });
          },
        })
      : null,
    // Apaga o inventario inteiro e nao ha como desfazer -- passa por confirmacao, como o
    // "Limpar dados ID". Antes disparava a seco no primeiro clique.
    can("player.inventory.edit")
      ? el("button", {
          class: "btn danger small",
          text: "Limpar inventario",
          onclick: function () {
            openModal({
              title: "Limpar o inventario de " + player.name,
              subtitle:
                "Passaporte #" +
                player.passport +
                ". Remove todos os itens de uma vez. Nao ha como desfazer.",
              danger: true,
              confirmText: "Limpar tudo",
              onConfirm: async function () {
                const result = await run("inventory.clear", {
                  passport: player.passport,
                });
                if (result && result.ok)
                  modalDepois = function () {
                    openInventory(player);
                  };
                return result;
              },
            });
          },
        })
      : null,
  ]);

  content.appendChild(header);
  content.appendChild(grid);
  load();

  openModal({
    title: "Inventario de " + player.name,
    subtitle: "Passaporte #" + player.passport,
    confirmText: "Fechar",
    content: content,
    onConfirm: function () {},
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: ADVERTENCIAS
-------------------------------------------------------------------------------------------- */
RENDER.advertencias = async function (view) {
  const search = el("input", {
    type: "search",
    placeholder: "Buscar por ID, nome, sobrenome, motivo ou staff...",
  });
  const stats = el("div", { class: "grid grid-3" });
  const wrap = el("div", { class: "table-wrap" });
  const rankWrap = el("div", { class: "card" });

  async function load() {
    const data = (await getData("warns", { search: search.value })) || {
      records: [],
      ranking: [],
      totals: {},
    };

    clear(stats);
    stats.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [icon("alert", 17)]),
        el("div", {}, [
          el("strong", { text: String(data.totals.all || 0) }),
          el("span", { text: "Advertencias registradas" }),
        ]),
      ]),
    );
    stats.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [icon("clock", 17)]),
        el("div", {}, [
          el("strong", { text: String(data.totals.active || 0) }),
          el("span", { text: "Castigos ativos" }),
        ]),
      ]),
    );
    stats.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [icon("users", 17)]),
        el("div", {}, [
          el("strong", { text: String(data.totals.players || 0) }),
          el("span", { text: "Jogadores advertidos" }),
        ]),
      ]),
    );

    clear(wrap);
    const table = el("table");
    table.appendChild(
      el("thead", {}, [
        el("tr", {}, [
          el("th", { text: "#" }),
          el("th", { text: "Jogador" }),
          el("th", { text: "ID" }),
          el("th", { text: "Motivo" }),
          el("th", { text: "Tempo" }),
          el("th", { text: "Data" }),
          el("th", { text: "Hora" }),
          el("th", { text: "Staff" }),
          el("th", { text: "Status" }),
          el("th", { text: "" }),
        ]),
      ]),
    );

    const body = el("tbody");
    data.records.forEach(function (row) {
      const remaining = Number(row.remaining || 0);
      body.appendChild(
        el("tr", {}, [
          el("td", { text: "#" + row.id }),
          el("td", { text: (row.name || "") + " " + (row.name2 || "") }),
          el("td", { text: "#" + row.passport }),
          el("td", { text: row.reason }),
          el("td", { text: (row.minutes || 0) + " min" }),
          el("td", { text: dateBR(row.created_at) }),
          el("td", { text: timeBR(row.created_at) }),
          el("td", { text: (row.staff_name || "-") + " #" + row.staff_id }),
          el("td", {}, [
            el("span", {
              class: "tag " + (Number(row.active) === 1 ? "amber" : "grey"),
              text:
                Number(row.active) === 1
                  ? Math.ceil(remaining / 60) + " min restantes"
                  : "Cumprida",
            }),
          ]),
          el("td", {}, [
            el("div", { class: "row" }, [
              Number(row.active) === 1 && can("warn.delete")
                ? el("button", {
                    class: "btn small",
                    text: "Liberar",
                    onclick: async function () {
                      await run("warn.release", { passport: row.passport });
                      load();
                    },
                  })
                : null,
              can("warn.delete")
                ? el("button", {
                    class: "btn small danger",
                    text: "Excluir",
                    onclick: async function () {
                      await run("warn.delete", { id: row.id });
                      load();
                    },
                  })
                : null,
            ]),
          ]),
        ]),
      );
    });

    if (!body.children.length)
      body.appendChild(
        el("tr", {}, [
          el("td", {
            colspan: "10",
            text: "Nenhuma advertencia encontrada.",
            style: { textAlign: "center", color: "var(--muted)" },
          }),
        ]),
      );
    table.appendChild(body);
    wrap.appendChild(table);

    clear(rankWrap);
    rankWrap.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("h3", { text: "Quantidade por jogador" }),
          el("p", { text: "Jogadores com mais advertencias registradas." }),
        ]),
      ]),
    );
    const rankList = el("div", { class: "list" });
    data.ranking.forEach(function (row) {
      rankList.appendChild(
        el("div", { class: "list-item" }, [
          el("div", {
            class: "avatar",
            text: initials((row.name || "") + " " + (row.name2 || "")),
          }),
          el("div", { class: "user-text" }, [
            el("strong", { text: (row.name || "") + " " + (row.name2 || "") }),
            el("span", { text: "ID #" + row.passport }),
          ]),
          el("div", { class: "meta" }, [
            el("strong", { text: row.total + "x" }),
            el("span", { text: "advertencias" }),
          ]),
        ]),
      );
    });
    if (!data.ranking.length)
      rankList.appendChild(
        el("div", { class: "empty" }, [el("span", { text: "Sem registros." })]),
      );
    rankWrap.appendChild(rankList);
  }

  search.addEventListener("input", function () {
    load();
  });

  clear(view);
  view.appendChild(
    el("div", { class: "stack" }, [
      stats,
      el("div", { class: "card" }, [el("div", { class: "search" }, [search])]),
      el(
        "div",
        { class: "split", style: { gridTemplateColumns: "1fr 340px" } },
        [wrap, rankWrap],
      ),
    ]),
  );

  load();
};

/* --------------------------------------------------------------------------------------------
   ABA: MAPA
-------------------------------------------------------------------------------------------- */
RENDER.mapa = async function (view) {
  clear(view);

  const frame = el("div", { class: "map-frame" });
  const canvas = el("div", { class: "map-canvas" });
  const inner = el("div", { class: "map-inner" });
  const mapImg = el("img", { src: "img/map.png" });

  inner.appendChild(mapImg);
  canvas.appendChild(inner);
  frame.appendChild(canvas);

  const tools = el("div", { class: "map-tools" }, [
    el("button", {
      text: "+",
      onclick: function () {
        zoom(0.25);
      },
    }),
    el("button", {
      text: "-",
      onclick: function () {
        zoom(-0.25);
      },
    }),
    el("button", {
      html: "&#9974;",
      title: "Tela cheia",
      onclick: function () {
        frame.classList.toggle("full");
      },
    }),
  ]);
  frame.appendChild(tools);

  const side = el("div", { class: "card" });
  const status = el("div", { class: "row", style: { marginBottom: "12px" } });

  view.appendChild(
    el("div", { class: "stack" }, [
      status,
      el("div", { class: "map-wrap" }, [frame, side]),
    ]),
  );

  let scale = 1,
    offsetX = 0,
    offsetY = 0,
    bounds = S.data.map;
  let players = [];
  let popup = null;
  // Coordenadas do balao em unidades do mapa, para o reposicionar a cada zoom.
  let popupPos = null;

  function apply() {
    inner.style.transform =
      "translate(" + offsetX + "px," + offsetY + "px) scale(" + scale + ")";
  }

  function zoom(delta) {
    scale = Math.max(0.6, Math.min(6, scale + delta));
    apply();
    draw();
  }

  canvas.addEventListener("wheel", function (event) {
    event.preventDefault();
    zoom(event.deltaY < 0 ? 0.2 : -0.2);
  });

  let dragging = false,
    startX = 0,
    startY = 0;
  canvas.addEventListener("mousedown", function (event) {
    dragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
    canvas.style.cursor = "grabbing";
  });
  window.addEventListener("mouseup", function () {
    dragging = false;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener("mousemove", function (event) {
    if (!dragging) return;
    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    apply();
  });

  function sizeMap() {
    const size = Math.min(frame.clientWidth, frame.clientHeight);
    inner.style.width = size + "px";
    inner.style.height = size + "px";
    return size;
  }

  function draw() {
    const size = sizeMap();
    inner.querySelectorAll(".map-pin").forEach(function (node) {
      node.remove();
    });

    players.forEach(function (player) {
      const px =
        ((player.x - bounds.minX) / (bounds.maxX - bounds.minX)) * size;
      const py =
        ((bounds.maxY - player.y) / (bounds.maxY - bounds.minY)) * size;

      const pin = el("div", {
        class:
          "map-pin" + (S.sel.mapPlayer === player.passport ? " selected" : ""),
        style: {
          left: px + "px",
          top: py + "px",
          transform: "translate(-50%,-50%) scale(" + 1 / scale + ")",
        },
        title: player.name + " #" + player.passport,
        onclick: function (event) {
          event.stopPropagation();
          S.sel.mapPlayer = player.passport;
          showPopup(player, px, py);
          draw();
        },
      });
      inner.appendChild(pin);
    });

    posicionarPopup();
    apply();
  }

  // Folga entre o fundo do balao e o pino, em pixeis de ecra.
  const POPUP_FOLGA = 10;

  function posicionarPopup() {
    if (!popup || !popupPos) return;

    const meia = popup.offsetHeight / 2;
    const ty = (-POPUP_FOLGA - meia) / scale - meia;

    popup.style.left = popupPos.px + "px";
    popup.style.top = popupPos.py + "px";
    popup.style.transform =
      "translate(-50%," + ty + "px) scale(" + 1 / scale + ")";
  }

  function fecharPopup() {
    if (popup) popup.remove();
    popup = null;
    popupPos = null;
  }

  function showPopup(player, px, py) {
    fecharPopup();
    popupPos = { px: px, py: py };

    popup = el("div", { class: "map-popup" }, [
      el("div", { class: "row" }, [
        el("div", { style: { flex: 1 } }, [
          el("h4", { text: player.name }),
          el("div", {
            class: "sub",
            text:
              "ID #" +
              player.passport +
              " - Ping " +
              player.ping +
              "ms - Bucket " +
              player.bucket,
          }),
        ]),
        el("button", {
          class: "icon-btn",
          html: "&#10005;",
          onclick: fecharPopup,
        }),
      ]),
      // map.actions permite negar as acoes pelo mapa mesmo a quem as tem na aba Jogadores
      el(
        "div",
        { class: "grid grid-2" },
        can("map.actions")
          ? [
              can("player.bring")
                ? el(
                    "button",
                    {
                      class: "btn small",
                      onclick: function () {
                        run("player.bring", { passport: player.passport });
                      },
                    },
                    [icon("target", 14), el("span", { text: "Puxar" })],
                  )
                : null,
              can("player.goto")
                ? el(
                    "button",
                    {
                      class: "btn small",
                      onclick: function () {
                        run("player.goto", { passport: player.passport });
                      },
                    },
                    [icon("pin", 14), el("span", { text: "Ir ate" })],
                  )
                : null,
              can("player.freeze")
                ? el(
                    "button",
                    {
                      class: "btn small",
                      onclick: function () {
                        run("player.freeze", {
                          passport: player.passport,
                          state: true,
                        });
                      },
                    },
                    [icon("snowflake", 14), el("span", { text: "Congelar" })],
                  )
                : null,
              can("player.spectate")
                ? el(
                    "button",
                    {
                      class: "btn small",
                      onclick: function () {
                        startPreview(player);
                      },
                    },
                    [icon("eye", 14), el("span", { text: "Ver tela" })],
                  )
                : null,
            ]
          : [
              el("span", {
                class: "muted",
                text: "Sem permissao para acoes pelo mapa.",
              }),
            ],
      ),
    ]);

    inner.appendChild(popup);
    posicionarPopup();
  }

  function renderSide() {
    clear(side);
    side.appendChild(
      el("div", { class: "card-head" }, [
        el("div", { class: "row" }, [
          icon("users", 16),
          el("h3", {
            text: "ONLINE",
            style: { fontSize: "13px", letterSpacing: "1px" },
          }),
        ]),
        el("span", { class: "tag", text: String(players.length) }),
      ]),
    );

    const list = el("div", { class: "list" });
    players.forEach(function (player) {
      list.appendChild(
        el(
          "div",
          {
            class:
              "list-item" +
              (S.sel.mapPlayer === player.passport ? " active" : ""),
            onclick: function () {
              S.sel.mapPlayer = player.passport;
              draw();
              renderSide();
            },
          },
          [
            el("div", { class: "avatar", text: player.initials }),
            el("div", { class: "user-text" }, [
              el("strong", { text: player.name }),
              el("span", {
                text: "ID #" + player.passport + " - Bucket " + player.bucket,
              }),
            ]),
            el("div", { class: "meta" }, [
              el("span", { text: player.ping + "ms" }),
            ]),
          ],
        ),
      );
    });

    if (!players.length)
      list.appendChild(
        el("div", { class: "empty" }, [
          el("span", { text: "Nenhum jogador online." }),
        ]),
      );
    side.appendChild(list);
  }

  // Um intervalo so, vindo do servidor. Se mudar a quente, o timer acompanha.
  let periodo = 0;

  function agendar(ms) {
    if (ms === periodo) return;
    periodo = ms;
    clearInterval(S.timers.map);
    S.timers.map = setInterval(refresh, ms);
  }

  async function refresh() {
    const data = await getData("map");
    if (!data) return;
    players = data.players;
    bounds = data.bounds;

    clear(status);
    status.appendChild(el("span", { class: "dot-online" }));
    status.appendChild(el("strong", { text: String(players.length) }));
    status.appendChild(
      el("span", { class: "muted", text: "jogador(es) online" }),
    );
    status.appendChild(el("div", { class: "spacer" }));
    const ms =
      Number(data.refresh) || Number(S.data.map && S.data.map.Refresh) || 5000;
    agendar(ms);
    status.appendChild(
      el("span", {
        class: "muted",
        text: "Atualizando a cada " + Math.round(ms / 1000) + "s",
      }),
    );

    draw();
    renderSide();
  }

  mapImg.addEventListener("load", draw);
  // O timer e criado pelo agendar(), dentro do refresh, com o valor que o servidor
  // devolveu -- por isso nao ha nenhum setInterval aqui.
  await refresh();
};

/* --------------------------------------------------------------------------------------------
   ABA: CHAMADOS
-------------------------------------------------------------------------------------------- */
RENDER.chamados = async function (view) {
  clear(view);

  let section = "abertos";
  const tabs = el("div", { class: "grid grid-5" });
  const content = el("div", { class: "card" });

  const sections = [
    { id: "abertos", icon: "headset", label: "Chamados abertos" },
    { id: "historico", icon: "history", label: "Historico de chamados" },
    { id: "ranking", icon: "trophy", label: "Ranking Staff" },
    { id: "avaliacoes", icon: "star", label: "Avaliacoes" },
    { id: "notas", icon: "target", label: "Notas Staff" },
  ];

  function renderTabs() {
    clear(tabs);
    sections.forEach(function (item) {
      tabs.appendChild(
        el(
          "div",
          {
            class: "banner" + (section === item.id ? " active" : ""),
            style:
              section === item.id
                ? {
                    borderColor: "var(--accent-line)",
                    background: "var(--bg-card-2)",
                  }
                : {},
            onclick: function () {
              section = item.id;
              renderTabs();
              load();
            },
          },
          [
            el("div", { class: "ic" }, [icon(item.icon, 18)]),
            el("div", { class: "txt" }, [
              el("strong", {
                text: item.label,
                style: { fontSize: "13.5px", margin: 0 },
              }),
            ]),
            el("span", { class: "muted", html: "&rsaquo;" }),
          ],
        ),
      );
    });
  }

  function stars(value) {
    const row = el("div", { class: "rating-row" });
    for (let i = 1; i <= 5; i++)
      row.appendChild(
        el("span", {
          class: "s" + (i <= value ? "" : " off"),
          html: "&#9733;",
        }),
      );
    row.appendChild(
      el("strong", {
        text: " " + Number(value).toFixed(1),
        style: { marginLeft: "6px", fontSize: "12px" },
      }),
    );
    return row;
  }

  async function load() {
    clear(content);
    content.appendChild(
      el("div", { class: "empty" }, [el("span", { text: "A carregar..." })]),
    );

    if (section === "abertos") {
      const data = (await getData("tickets")) || { tickets: [] };
      clear(content);
      content.appendChild(
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Chamados abertos" }),
            el("p", {
              text:
                data.tickets.length +
                " chamado(s) aguardando ou em atendimento.",
            }),
          ]),
          el("button", { class: "btn primary small", onclick: load }, [
            icon("refresh", 14),
            el("span", { text: "Atualizar" }),
          ]),
        ]),
      );

      if (!data.tickets.length) {
        content.appendChild(
          el("div", { class: "empty" }, [
            icon("headset", 26),
            el("strong", { text: "Nenhum chamado aberto" }),
            el("span", {
              text: "Novos chamados aparecerao aqui automaticamente.",
            }),
          ]),
        );
        return;
      }

      const list = el("div", { class: "list", style: { maxHeight: "none" } });
      data.tickets.forEach(function (ticket) {
        list.appendChild(
          el("div", { class: "list-item", style: { cursor: "default" } }, [
            el("div", { class: "avatar" }, [icon(ticket.icon, 16)]),
            el("div", { class: "user-text" }, [
              el("strong", {
                text: ticket.typeLabel + " #" + ticket.id + " - " + ticket.name,
              }),
              el("span", {
                text: "ID #" + ticket.passport + " - " + ticket.message,
              }),
            ]),
            el("div", { class: "row" }, [
              el("span", {
                class:
                  "tag " + (ticket.status === "aberto" ? "amber" : "green"),
                text:
                  ticket.status === "aberto" ? "AGUARDANDO" : "EM ATENDIMENTO",
              }),
              ticket.staff_name
                ? el("span", {
                    class: "muted",
                    text:
                      "Staff: " + ticket.staff_name + " #" + ticket.staff_id,
                  })
                : null,
              ticket.status === "aberto" && can("ticket.accept")
                ? el("button", {
                    class: "btn small success",
                    text: "Aceitar",
                    onclick: async function () {
                      await run("ticket.accept", { id: ticket.id });
                      load();
                    },
                  })
                : null,
              can("ticket.accept")
                ? el("button", {
                    class: "btn small",
                    text: "Ir ate",
                    onclick: function () {
                      run("ticket.goto", { id: ticket.id });
                    },
                  })
                : null,
              can("ticket.close")
                ? el("button", {
                    class: "btn small danger",
                    text: "Finalizar",
                    onclick: async function () {
                      await run("ticket.close", { id: ticket.id });
                      load();
                    },
                  })
                : null,
            ]),
          ]),
        );
      });
      content.appendChild(list);
      return;
    }

    if (section === "historico") {
      const search = el("input", {
        type: "search",
        placeholder: "Buscar por ID, jogador, staff ou mensagem...",
      });
      const wrap = el("div", { class: "table-wrap" });

      async function loadHistory() {
        const data = (await getData("ticketHistory", {
          search: search.value,
        })) || { tickets: [] };
        clear(wrap);
        const table = el("table");
        table.appendChild(
          el("thead", {}, [
            el("tr", {}, [
              el("th", { text: "#" }),
              el("th", { text: "Tipo" }),
              el("th", { text: "Jogador" }),
              el("th", { text: "Staff" }),
              el("th", { text: "Mensagem" }),
              el("th", { text: "Data" }),
              el("th", { text: "Hora" }),
              el("th", { text: "Nota" }),
            ]),
          ]),
        );
        const body = el("tbody");
        data.tickets.forEach(function (ticket) {
          body.appendChild(
            el("tr", {}, [
              el("td", { text: "#" + ticket.id }),
              el("td", { text: ticket.typeLabel }),
              el("td", { text: ticket.name + " #" + ticket.passport }),
              el("td", {
                text:
                  (ticket.staff_name || "-") + " #" + (ticket.staff_id || 0),
              }),
              el("td", { text: ticket.message || "-" }),
              el("td", { text: dateBR(ticket.closed_at || ticket.created_at) }),
              el("td", { text: timeBR(ticket.closed_at || ticket.created_at) }),
              el("td", {}, [
                ticket.rating
                  ? stars(ticket.rating)
                  : el("span", { class: "muted", text: "Sem nota" }),
              ]),
            ]),
          );
        });
        if (!body.children.length)
          body.appendChild(
            el("tr", {}, [
              el("td", {
                colspan: "8",
                text: "Nenhum chamado finalizado.",
                style: { textAlign: "center", color: "var(--muted)" },
              }),
            ]),
          );
        table.appendChild(body);
        wrap.appendChild(table);
      }

      search.addEventListener("input", loadHistory);
      clear(content);
      content.appendChild(
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Historico de chamados" }),
            el("p", { text: "Todos os atendimentos finalizados." }),
          ]),
        ]),
      );
      content.appendChild(
        el("div", { class: "search", style: { marginBottom: "12px" } }, [
          search,
        ]),
      );
      content.appendChild(wrap);
      loadHistory();
      return;
    }

    if (section === "ranking") {
      const data = (await getData("ticketRanking")) || { ranking: [] };
      clear(content);
      content.appendChild(
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Ranking Staff" }),
            el("p", {
              text: "Quantidade de atendimentos e media de estrelas.",
            }),
          ]),
        ]),
      );

      const list = el("div", { class: "list", style: { maxHeight: "none" } });
      data.ranking.forEach(function (row) {
        list.appendChild(
          el("div", { class: "list-item", style: { cursor: "default" } }, [
            el("div", { class: "avatar", text: String(row.position) }),
            el("div", { class: "user-text" }, [
              el("strong", { text: row.staff_name }),
              el("span", {
                text:
                  "ID #" + row.staff_id + " - " + row.total + " atendimento(s)",
              }),
            ]),
            stars(row.average),
          ]),
        );
      });
      if (!data.ranking.length)
        list.appendChild(
          el("div", { class: "empty" }, [
            el("span", { text: "Sem atendimentos registrados." }),
          ]),
        );
      content.appendChild(list);
      return;
    }

    if (section === "avaliacoes") {
      const data = (await getData("ticketRatings")) || { ratings: [] };
      clear(content);
      content.appendChild(
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Avaliacoes" }),
            el("p", {
              text: "Notas e comentarios deixados apos os atendimentos.",
            }),
          ]),
        ]),
      );

      const list = el("div", { class: "stack" });
      data.ratings.forEach(function (row) {
        list.appendChild(
          el(
            "div",
            { class: "card", style: { background: "var(--bg-card-2)" } },
            [
              el(
                "div",
                { class: "card-head", style: { marginBottom: "10px" } },
                [
                  el("div", {}, [
                    el("h3", { text: row.name, style: { fontSize: "14px" } }),
                    el("p", {
                      text:
                        "atendimento de " +
                        row.staff_name +
                        " #" +
                        row.staff_id,
                    }),
                  ]),
                  stars(row.rating),
                ],
              ),
              el(
                "div",
                {
                  style: {
                    background: "var(--bg-input)",
                    borderRadius: "9px",
                    padding: "12px",
                    fontSize: "12.5px",
                  },
                },
                [el("span", { text: row.comment || "Sem comentario." })],
              ),
              el("div", {
                class: "muted",
                style: { marginTop: "8px" },
                text: dateBR(row.closed_at) + " " + timeBR(row.closed_at),
              }),
            ],
          ),
        );
      });
      if (!data.ratings.length)
        list.appendChild(
          el("div", { class: "empty" }, [
            el("span", { text: "Nenhuma avaliacao recebida." }),
          ]),
        );
      content.appendChild(list);
      return;
    }

    if (section === "notas") {
      const data = (await getData("ticketNotes")) || { notes: [] };
      clear(content);
      content.appendChild(
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Notas Staff" }),
            el("p", {
              text: "Media de estrelas, melhor e pior nota de cada membro.",
            }),
          ]),
        ]),
      );

      const wrap = el("div", { class: "table-wrap" });
      const table = el("table");
      table.appendChild(
        el("thead", {}, [
          el("tr", {}, [
            el("th", { text: "Staff" }),
            el("th", { text: "ID" }),
            el("th", { text: "Atendimentos" }),
            el("th", { text: "Avaliados" }),
            el("th", { text: "Media" }),
            el("th", { text: "Melhor" }),
            el("th", { text: "Pior" }),
          ]),
        ]),
      );
      const body = el("tbody");
      data.notes.forEach(function (row) {
        body.appendChild(
          el("tr", {}, [
            el("td", { text: row.staff_name }),
            el("td", { text: "#" + row.staff_id }),
            el("td", { text: String(row.total) }),
            el("td", { text: String(row.rated) }),
            el("td", {}, [stars(row.average)]),
            el("td", { text: row.best ? row.best + " estrelas" : "-" }),
            el("td", { text: row.worst ? row.worst + " estrelas" : "-" }),
          ]),
        );
      });
      if (!body.children.length)
        body.appendChild(
          el("tr", {}, [
            el("td", {
              colspan: "7",
              text: "Sem dados.",
              style: { textAlign: "center", color: "var(--muted)" },
            }),
          ]),
        );
      table.appendChild(body);
      wrap.appendChild(table);
      content.appendChild(wrap);
    }
  }

  view.appendChild(el("div", { class: "stack" }, [tabs, content]));
  renderTabs();
  load();
  S.timers.tickets = setInterval(function () {
    if (section === "abertos") load();
  }, 15000);
};

/* --------------------------------------------------------------------------------------------
   ABA: SETAGEM
-------------------------------------------------------------------------------------------- */
RENDER.setagem = async function (view) {
  clear(view);

  const passportInput = el("input", {
    type: "number",
    placeholder: "Passaporte / ID",
    value: S.sel.setagem || "",
  });
  const status = el("div", { class: "row" });
  const currentWrap = el("div", { class: "card" });
  const availableWrap = el("div", { class: "card" });

  const currentFilter = el("input", {
    type: "search",
    placeholder: "Filtrar cargos atuais...",
  });
  const availableFilter = el("input", {
    type: "search",
    placeholder: "Buscar cargo ou organizacao...",
  });

  let payload = null;

  async function load() {
    const passport = Number(passportInput.value) || 0;
    payload = await getData("groups", { passport: passport });
    render();
  }

  function render() {
    clear(status);
    if (payload && payload.player) {
      status.appendChild(el("span", { class: "dot-online" }));
      status.appendChild(
        el("div", {}, [
          el("strong", { text: payload.player.name }),
          el("div", {
            class: "muted",
            text:
              "Passaporte #" +
              payload.player.passport +
              " - " +
              (payload.player.online ? "Online" : "Offline"),
          }),
        ]),
      );
    } else {
      status.appendChild(
        el("span", {
          class: "muted",
          text: "Informe um passaporte e carregue o jogador.",
        }),
      );
    }

    clear(currentWrap);
    currentWrap.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("h3", { text: "Cargos do jogador" }),
          el("p", {
            text:
              ((payload && payload.current.length) || 0) +
              " grupo(s) carregado(s)",
          }),
        ]),
      ]),
    );
    currentWrap.appendChild(
      el("div", { class: "search", style: { marginBottom: "12px" } }, [
        currentFilter,
      ]),
    );

    const currentGrid = el("div", { class: "grid grid-2" });
    const currentTerm = currentFilter.value.toLowerCase();

    ((payload && payload.current) || [])
      .filter(function (entry) {
        return (
          !currentTerm ||
          entry.group.toLowerCase().includes(currentTerm) ||
          String(entry.organization).toLowerCase().includes(currentTerm)
        );
      })
      .forEach(function (entry) {
        currentGrid.appendChild(
          el(
            "div",
            {
              class: "card",
              style: { background: "var(--bg-card-2)", padding: "14px" },
            },
            [
              el("strong", { text: entry.group }),
              el("div", {
                class: "muted",
                style: { margin: "3px 0 10px" },
                text: entry.organization + " - nivel " + entry.level,
              }),
              can("group.remove")
                ? el("button", {
                    class: "btn small danger",
                    text: "- Remover",
                    onclick: async function () {
                      await run("group.remove", {
                        passport: payload.player.passport,
                        organization: entry.organization,
                        group: entry.group,
                        level: entry.level,
                      });
                      load();
                    },
                  })
                : null,
            ],
          ),
        );
      });

    if (!currentGrid.children.length)
      currentGrid.appendChild(
        el("div", { class: "empty" }, [
          el("span", { text: "Nenhum cargo encontrado." }),
        ]),
      );
    currentWrap.appendChild(currentGrid);

    clear(availableWrap);
    availableWrap.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("h3", { text: "Cargos disponiveis" }),
          el("p", {
            text: "Filtrados e ordenados a partir do Groups.lua da vRP.",
          }),
        ]),
      ]),
    );
    availableWrap.appendChild(
      el("div", { class: "search", style: { marginBottom: "12px" } }, [
        availableFilter,
      ]),
    );

    const availableGrid = el("div", { class: "grid grid-3 scroll-y" });
    const term = availableFilter.value.toLowerCase();

    ((payload && payload.available) || [])
      .filter(function (entry) {
        return (
          !term ||
          entry.label.toLowerCase().includes(term) ||
          entry.group.toLowerCase().includes(term) ||
          String(entry.organization).toLowerCase().includes(term) ||
          String(entry.type).toLowerCase().includes(term)
        );
      })
      .slice(0, 300)
      .forEach(function (entry) {
        availableGrid.appendChild(
          el(
            "div",
            {
              class: "card",
              style: { background: "var(--bg-card-2)", padding: "14px" },
            },
            [
              el("strong", { text: entry.label }),
              el("div", {
                class: "muted",
                style: { margin: "3px 0 10px" },
                text:
                  entry.organization +
                  " - " +
                  entry.type +
                  " - nivel " +
                  entry.level,
              }),
              can("group.add")
                ? el("button", {
                    class: "btn small success",
                    text: "+ Adicionar",
                    onclick: async function () {
                      const passport = Number(passportInput.value) || 0;
                      if (!passport) {
                        toast("Aviso", "Informe o passaporte primeiro.", "err");
                        return;
                      }
                      await run("group.add", {
                        passport: passport,
                        group: entry.group,
                        level: entry.level,
                      });
                      load();
                    },
                  })
                : null,
            ],
          ),
        );
      });

    if (!availableGrid.children.length)
      availableGrid.appendChild(
        el("div", { class: "empty" }, [
          el("span", { text: "Nenhum cargo encontrado." }),
        ]),
      );
    availableWrap.appendChild(availableGrid);
  }

  currentFilter.addEventListener("input", render);
  availableFilter.addEventListener("input", render);

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "row" }, [
          el("div", { style: { width: "220px" } }, [
            el("label", { class: "field", text: "Passaporte / ID" }),
            passportInput,
          ]),
          el(
            "button",
            {
              class: "btn primary",
              style: { marginTop: "18px" },
              onclick: load,
            },
            [icon("target", 15), el("span", { text: "Carregar jogador" })],
          ),
          el("div", { class: "spacer" }),
          status,
        ]),
      ]),
      el("div", { class: "grid grid-2" }, [currentWrap, availableWrap]),
    ]),
  );

  load();
};

/* --------------------------------------------------------------------------------------------
   ABA: ALTERAR RG
-------------------------------------------------------------------------------------------- */
RENDER.rg = async function (view) {
  clear(view);

  const passportInput = el("input", {
    type: "number",
    placeholder: "Passaporte / ID",
    value: S.sel.rg || "",
  });
  const status = el("div", { class: "row" });
  const card = el("div", { class: "card" });

  async function load() {
    const passport = Number(passportInput.value) || 0;
    if (!passport) {
      toast("Aviso", "Informe um passaporte.", "err");
      return;
    }

    S.sel.rg = passport;
    const data = await getData("identity", { passport: passport });

    clear(status);
    clear(card);

    if (!data) {
      card.appendChild(
        el("div", { class: "empty" }, [
          icon("idcard", 26),
          el("strong", { text: "Passaporte nao encontrado" }),
        ]),
      );
      return;
    }

    status.appendChild(
      el("span", {
        class: "dot-online",
        style: { background: data.online ? "var(--green)" : "var(--muted-2)" },
      }),
    );
    status.appendChild(
      el("div", {}, [
        el("strong", { text: data.fullname }),
        el("div", {
          class: "muted",
          text:
            "Passaporte #" +
            data.passport +
            " - " +
            (data.online ? "Online" : "Offline"),
        }),
      ]),
    );

    card.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("span", { class: "eyebrow", text: "DADOS DE IDENTIDADE" }),
          el("h3", { text: data.fullname }),
          el("p", {
            text: "Use o lapis ao lado de cada informacao para alterar somente aquele dado.",
          }),
        ]),
        el("span", {
          class: "tag " + (data.online ? "green" : "grey"),
          text: data.online ? "ONLINE" : "OFFLINE",
        }),
      ]),
    );

    const fields = [
      {
        key: "id",
        label: "ID",
        value: data.passport,
        hint: "Passaporte principal do jogador",
        perm: "rg.edit.id",
        type: "number",
      },
      {
        key: "name",
        label: "Nome",
        value: data.name,
        hint: "Nome registrado na identidade",
        perm: "rg.edit",
      },
      {
        key: "name2",
        label: "Sobrenome",
        value: data.name2,
        hint: "Sobrenome registrado na identidade",
        perm: "rg.edit",
      },
      {
        key: "age",
        label: "Idade",
        value: data.age,
        hint: "Idade registrada no personagem",
        perm: "rg.edit",
        type: "number",
      },
      {
        key: "phone",
        label: "Telefone",
        value: data.phone,
        hint: "Numero de telefone da identidade",
        perm: "rg.edit",
      },
      {
        key: "registration",
        label: "RG",
        value: data.registration,
        hint: "Registro geral do personagem",
        perm: "rg.edit",
      },
      {
        key: "wallet",
        label: "Carteira",
        value: money(data.wallet),
        raw: data.wallet,
        hint: "Dinheiro atual no inventario",
        perm: "rg.edit.money",
        type: "number",
      },
      {
        key: "bank",
        label: "Banco",
        value: money(data.bank),
        raw: data.bank,
        hint: "Saldo atual da conta bancaria",
        perm: "rg.edit.money",
        type: "number",
      },
    ];

    const grid = el("div", { class: "grid grid-2" });
    fields.forEach(function (field) {
      grid.appendChild(
        el(
          "div",
          {
            class: "card",
            style: {
              background: "var(--bg-card-2)",
              padding: "14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            },
          },
          [
            el("div", { style: { flex: 1 } }, [
              el("span", {
                class: "field",
                style: { display: "block" },
                text: field.label,
              }),
              el("strong", {
                text: String(field.value),
                style: { fontSize: "16px" },
              }),
              el("div", {
                class: "muted",
                style: { marginTop: "3px" },
                text: field.hint,
              }),
            ]),
            can(field.perm)
              ? el("button", {
                  class: "btn small primary",
                  html: "&#9998;",
                  onclick: function () {
                    openModal({
                      title: "Alterar " + field.label,
                      subtitle:
                        data.fullname + " - Passaporte #" + data.passport,
                      fields: [
                        {
                          key: "value",
                          label: field.label,
                          type: field.type || "text",
                          value:
                            field.raw !== undefined ? field.raw : field.value,
                        },
                      ],
                      onConfirm: async function (values) {
                        const result = await run("identity.set", {
                          passport: data.passport,
                          field: field.key,
                          value: values.value,
                        });
                        // Recusado: a janela fica aberta com o valor escrito, para corrigir sem
                        // ter de o escrever tudo outra vez.
                        if (!result || !result.ok) return result;

                        if (result.data && result.data.passport) {
                          passportInput.value = result.data.passport;
                        }
                        load();
                        return result;
                      },
                    });
                  },
                })
              : null,
          ],
        ),
      );
    });

    card.appendChild(grid);

    if (!data.hasAgeColumn) {
      card.appendChild(
        el("div", {
          class: "muted",
          style: { marginTop: "12px" },
          text: 'A coluna "age" nao existe na tabela characters: a idade fica guardada em vrp_user_data.',
        }),
      );
    }
  }

  passportInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") load();
  });

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "row" }, [
          el("div", { style: { width: "220px" } }, [
            el("label", { class: "field", text: "Passaporte / ID" }),
            passportInput,
          ]),
          el(
            "button",
            {
              class: "btn primary",
              style: { marginTop: "18px" },
              onclick: load,
            },
            [icon("target", 15), el("span", { text: "Carregar jogador" })],
          ),
          el("div", { class: "spacer" }),
          status,
        ]),
      ]),
      card,
    ]),
  );

  if (S.sel.rg) load();
  else
    card.appendChild(
      el("div", { class: "empty" }, [
        icon("idcard", 26),
        el("strong", { text: "Informe um passaporte" }),
        el("span", {
          text: "Carregue um jogador para ver e alterar a identidade.",
        }),
      ]),
    );
};

/* --------------------------------------------------------------------------------------------
   ABA: ITENS
-------------------------------------------------------------------------------------------- */
RENDER.itens = async function (view) {
  const data = (await getData("items")) || { items: [] };
  clear(view);

  const search = el("input", {
    type: "search",
    placeholder: "Buscar item pelo nome ou spawn...",
  });
  const grid = el("div", { class: "grid grid-3" });
  const topPager = el("div");
  const bottomPager = el("div");

  function render() {
    clear(grid);
    clear(topPager);
    clear(bottomPager);

    const term = search.value.toLowerCase();
    const matches = data.items.filter(function (item) {
      return (
        !term ||
        item.label.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term)
      );
    });

    // A barra vai em cima E em baixo: com 96 itens por pagina, ter de rolar de volta ao topo
    // so para carregar em "proxima" e o que torna folhear cansativo.
    const page = paginate(matches, "itens", render);
    topPager.appendChild(page.node);
    bottomPager.appendChild(paginate(matches, "itens", render).node);

    if (!page.slice.length) {
      grid.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum item encontrado" }),
          el("span", {
            text: term
              ? 'Nada bate com "' + search.value + '".'
              : "O catalogo de itens esta vazio. Use triadeadmin_itens na consola.",
          }),
        ]),
      );
      clear(bottomPager);
      return;
    }

    page.slice.forEach(function (item) {
      grid.appendChild(
        el("div", { class: "tile" }, [
          el("div", { class: "thumb" }, [image(item.image)]),
          el("div", { class: "info" }, [
            el("strong", { text: item.label }),
            el("span", { text: item.name }),
            can("item.spawn")
              ? el("span", {
                  class: "link",
                  text: "Clique para spawnar",
                  onclick: function () {
                    promptSpawnItem(item);
                  },
                })
              : null,
          ]),
        ]),
      );
    });
  }

  // Buscar tem de voltar a pagina 1, senao quem procura estando na pagina 9 ve grelha vazia.
  search.addEventListener("input", function () {
    resetPage("itens");
    render();
  });

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "search" }, [search]),
        topPager,
      ]),
      grid,
      bottomPager,
    ]),
  );
  render();
};

function promptSpawnItem(item) {
  openModal({
    title: "Spawnar " + item.label,
    subtitle: "Item: " + item.name,
    fields: [
      { key: "amount", label: "Quantidade", type: "number", value: 1 },
      {
        key: "passport",
        label: "Passaporte de destino (vazio = voce)",
        type: "number",
        placeholder: "Ex.: 15",
      },
    ],
    onConfirm: function (values) {
      return run("item.spawn", {
        item: item.name,
        amount: values.amount,
        passport: values.passport,
      });
    },
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: VEICULOS
-------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------
   CARTAO DE VEICULO
-------------------------------------------------------------------------------------------- */
function vehicleShow(src, legenda) {
  if (!src) return;

  const caixa = el("div", { class: "vshow" }, [
    el("img", { src: src }),
    el("div", { class: "legenda", text: legenda || "" }),
  ]);

  function fechar() {
    caixa.remove();
    document.removeEventListener("keydown", aoTeclado);
  }

  // Esc fecha, mas so esta lupa: por isso o listener sai junto com ela, senao ficava a
  // intercetar o Esc do painel para sempre.
  function aoTeclado(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      fechar();
    }
  }

  caixa.addEventListener("click", fechar);
  document.addEventListener("keydown", aoTeclado);
  document.body.appendChild(caixa);
}

/* opcoes: { label, spawn, image, sub, ghost, actions } */
function vehicleCard(opcoes) {
  const foto = opcoes.image ? image(opcoes.image) : null;

  const shot = el("div", { class: "shot" }, [
    foto || el("span", { class: "sem-foto", text: "SEM FOTO" }),
  ]);

  if (foto && !opcoes.ghost) {
    shot.addEventListener("click", function () {
      // A src atual e nao a original: o image() troca de fonte quando a primeira falha,
      // por isso ler agora garante que a lupa abre a que realmente carregou.
      vehicleShow(foto.getAttribute("src"), opcoes.spawn);
    });
  } else {
    shot.style.cursor = "default";
  }

  return el("div", { class: "vcard" + (opcoes.ghost ? " ghost" : "") }, [
    shot,
    el("div", { class: "meta" }, [
      el("strong", {
        text: opcoes.label || opcoes.spawn,
        title: opcoes.label || "",
      }),
      el("span", { class: "spawn", text: opcoes.spawn, title: opcoes.spawn }),
      opcoes.sub
        ? el("span", { class: "sub", text: opcoes.sub, title: opcoes.sub })
        : null,
      opcoes.ghost
        ? el("span", {
            class: "tag bad",
            style: { marginTop: "6px" },
            text: "NAO ESTA NO JOGO",
          })
        : null,
    ]),
    el("div", { class: "actions" }, opcoes.actions || []),
  ]);
}

RENDER.veiculos = async function (view) {
  // `showAll` vive fora do render para sobreviver a um re-render da aba.
  if (S.sel.vehShowAll === undefined) S.sel.vehShowAll = false;

  let data = (await getData("vehicles", { all: S.sel.vehShowAll })) || {
    game: [],
    addon: [],
  };
  clear(view);

  let mode = "game";
  const search = el("input", {
    type: "search",
    placeholder: "Buscar veiculo pelo nome ou spawn...",
  });
  const garageId = el("input", {
    type: "number",
    placeholder: "ID para garagem",
  });
  const grid = el("div", { class: "vgrid" });
  const topPager = el("div");
  const bottomPager = el("div");

  const quick = [
    {
      key: "vehicle.spawn",
      icon: "car",
      label: "Spawnar veiculo",
      desc: "Spawn manual por nome.",
      run: function () {
        promptVehicle("vehicle.spawn", "Spawnar veiculo", false);
      },
    },
    {
      key: "vehicle.give",
      icon: "plus",
      label: "Dar veiculo",
      desc: "Entrega um veiculo na garagem do passaporte.",
      run: function () {
        promptVehicle("vehicle.give", "Dar veiculo", true);
      },
    },
    {
      key: "vehicle.remove",
      icon: "trash",
      label: "Remover veiculo",
      desc: "Remove um veiculo da garagem do passaporte.",
      tone: "red",
      run: function () {
        promptVehicle("vehicle.remove", "Remover veiculo", true);
      },
    },
    {
      key: "vehicle.repair",
      icon: "wrench",
      label: "Reparar veiculo",
      desc: "Repara o veiculo atual ou o mais proximo.",
      run: function () {
        run("vehicle.repair", {});
      },
    },
    {
      key: "vehicle.repair",
      icon: "fire",
      label: "Tunar veiculo",
      desc: "Aplica o tuning maximo.",
      run: function () {
        run("vehicle.tune", {});
      },
    },
    {
      key: "vehicle.delete",
      icon: "trash",
      label: "Deletar veiculo",
      desc: "Deleta o veiculo atual ou o mais proximo.",
      tone: "red",
      run: function () {
        run("vehicle.delete", {});
      },
    },
    {
      key: "vehicle.quality",
      icon: "check",
      label: "Lavar veiculo",
      desc: "Tira a sujidade e as decalcomanias.",
      run: function () {
        run("vehicle.quality", { key: "wash" });
      },
    },
    {
      key: "vehicle.quality",
      icon: "fire",
      label: "Encher o tanque",
      desc: "Enche e grava no statebag do ox_fuel.",
      run: function () {
        run("vehicle.quality", { key: "fuel" });
      },
    },
    {
      key: "vehicle.quality",
      icon: "key",
      label: "Trancar",
      desc: "Tranca as portas para todos os jogadores.",
      run: function () {
        run("vehicle.quality", { key: "lock" });
      },
    },
    {
      key: "vehicle.quality",
      icon: "key",
      label: "Destrancar",
      desc: "Destranca as portas.",
      run: function () {
        run("vehicle.quality", { key: "unlock" });
      },
    },
  ];

  const quickGrid = el("div", { class: "grid grid-6" });
  quick.forEach(function (item) {
    if (!can(item.key)) return;
    quickGrid.appendChild(
      el(
        "button",
        { class: "action-card " + (item.tone || ""), onclick: item.run },
        [
          el("div", { class: "top" }, [
            el("div", { class: "ic" }, [icon(item.icon, 16)]),
            el("strong", { text: item.label }),
          ]),
          el("p", { text: item.desc }),
        ],
      ),
    );
  });

  let garageCache = { passport: 0, vehicles: null };

  async function renderGarage(force) {
    const passport = Number(garageId.value) || 0;

    if (!passport) {
      clear(grid);
      clear(topPager);
      clear(bottomPager);
      grid.appendChild(
        el("div", { class: "empty" }, [
          icon("folder", 26),
          el("strong", { text: "Informe um ID" }),
          el("span", {
            text: "Escreva o passaporte no campo ao lado da busca para ver a garagem.",
          }),
        ]),
      );
      return;
    }

    if (force || garageCache.passport !== passport || !garageCache.vehicles) {
      const result = await getData("garage", { passport: passport });
      garageCache = {
        passport: passport,
        vehicles: (result && result.vehicles) || [],
      };
    }

    clear(grid);
    clear(topPager);
    clear(bottomPager);

    // A mesma busca do catalogo serve a garagem: aqui procura tambem pela PLACA, que e como
    // a staff costuma chegar a um carro concreto.
    const term = search.value.toLowerCase();
    const matches = garageCache.vehicles.filter(function (vehicle) {
      if (!term) return true;
      return (
        String(vehicle.spawn).toLowerCase().includes(term) ||
        String(vehicle.label).toLowerCase().includes(term) ||
        String(vehicle.plate || "")
          .toLowerCase()
          .includes(term)
      );
    });

    if (!matches.length) {
      grid.appendChild(
        el("div", { class: "empty" }, [
          el("strong", {
            text: term ? "Nenhum veiculo encontrado" : "Garagem vazia",
          }),
          el("span", {
            text: term
              ? 'Nada bate com "' +
                search.value +
                '" na garagem do #' +
                passport +
                "."
              : "O passaporte #" + passport + " nao tem veiculos.",
          }),
        ]),
      );
      return;
    }

    const page = paginate(matches, "veiculos:garage", function () {
      renderGarage(false);
    });
    topPager.appendChild(page.node);
    bottomPager.appendChild(
      paginate(matches, "veiculos:garage", function () {
        renderGarage(false);
      }).node,
    );

    page.slice.forEach(function (vehicle) {
      grid.appendChild(
        vehicleCard({
          label: vehicle.label,
          spawn: vehicle.spawn,
          image: vehicle.image,
          sub:
            "Placa " +
            (vehicle.plate || "-") +
            "  \u00b7  " +
            (vehicle.garage && vehicle.garage !== "-"
              ? vehicle.garage
              : "sem garagem") +
            (vehicle.stored === false ? "  \u00b7  na rua" : ""),
          actions: [
            can("vehicle.spawn")
              ? el("button", {
                  class: "btn small",
                  text: "Spawn",
                  onclick: function () {
                    run("vehicle.spawn", { spawn: vehicle.spawn });
                  },
                })
              : null,
            can("vehicle.remove")
              ? el("button", {
                  class: "btn small danger",
                  text: "Remover",
                  onclick: function () {
                    openModal({
                      title: "Remover " + (vehicle.label || vehicle.spawn),
                      subtitle:
                        "Placa " +
                        (vehicle.plate || "-") +
                        ", da garagem do passaporte #" +
                        passport +
                        ". O veiculo sai da garagem do jogador e nao volta.",
                      danger: true,
                      confirmText: "Remover da garagem",
                      onConfirm: async function () {
                        const result = await run("vehicle.remove", {
                          spawn: vehicle.spawn,
                          plate: vehicle.plate,
                          passport: passport,
                        });
                        if (result && result.ok) renderGarage(true);
                        return result;
                      },
                    });
                  },
                })
              : null,
          ],
        }),
      );
    });
  }

  function render() {
    if (mode === "garage") {
      renderGarage();
      return;
    }

    clear(grid);
    clear(topPager);
    clear(bottomPager);

    const list = mode === "game" ? data.game : data.addon;
    const term = search.value.toLowerCase();

    const matches = list.filter(function (vehicle) {
      return (
        !term ||
        vehicle.spawn.toLowerCase().includes(term) ||
        String(vehicle.label).toLowerCase().includes(term)
      );
    });

    // Cada aba tem a sua propria pagina: sair dos addons na pagina 4 e voltar leva-o de
    // volta a pagina 4, e nao a pagina 4 dos veiculos do jogo.
    const key = "veiculos:" + mode;
    const page = paginate(matches, key, render);
    topPager.appendChild(page.node);
    bottomPager.appendChild(paginate(matches, key, render).node);

    if (!page.slice.length) {
      grid.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum veiculo encontrado" }),
          el("span", {
            text: term
              ? 'Nada bate com "' + search.value + '".'
              : "Esta lista esta vazia. Use triadeadmin_veiculos na consola.",
          }),
        ]),
      );
      clear(bottomPager);
      return;
    }

    page.slice.forEach(function (vehicle) {
      const fora = vehicle.missing === true;

      grid.appendChild(
        vehicleCard({
          label: vehicle.label,
          spawn: vehicle.spawn,
          image: vehicle.image,
          ghost: fora,
          actions: [
            can("vehicle.spawn")
              ? el("button", {
                  class: "btn small",
                  text: "Spawn",
                  disabled: fora ? "disabled" : null,
                  title: fora
                    ? "O jogo nao tem este modelo -- nao nasce."
                    : null,
                  onclick: function () {
                    if (!fora) run("vehicle.spawn", { spawn: vehicle.spawn });
                  },
                })
              : null,
            can("vehicle.give")
              ? el("button", {
                  class: "btn small success",
                  text: "Dar",
                  disabled: fora ? "disabled" : null,
                  title: fora
                    ? "O jogo nao tem este modelo -- daria um carro fantasma na garagem."
                    : null,
                  onclick: function () {
                    if (fora) return;
                    const passport = Number(garageId.value) || 0;
                    if (!passport) {
                      toast(
                        "Aviso",
                        "Informe o ID para garagem no campo ao lado da busca.",
                        "err",
                      );
                      return;
                    }
                    run("vehicle.give", {
                      spawn: vehicle.spawn,
                      passport: passport,
                    });
                  },
                })
              : null,
            can("vehicle.remove")
              ? el("button", {
                  class: "btn small danger",
                  text: "Remover",
                  onclick: function () {
                    const passport = Number(garageId.value) || 0;
                    if (!passport) {
                      toast(
                        "Aviso",
                        "Informe o ID para garagem no campo ao lado da busca.",
                        "err",
                      );
                      return;
                    }
                    // Aqui nao ha placa -- o pedido vai pelo modelo, e o servidor escolhe.
                    // Razao de sobra para perguntar antes.
                    openModal({
                      title: "Remover " + (vehicle.label || vehicle.spawn),
                      subtitle:
                        "Sai da garagem do passaporte #" +
                        passport +
                        ". Como o pedido vai pelo modelo e nao pela placa, se o jogador tiver mais do que um destes quem escolhe e o servidor.",
                      danger: true,
                      confirmText: "Remover da garagem",
                      onConfirm: function () {
                        return run("vehicle.remove", {
                          spawn: vehicle.spawn,
                          passport: passport,
                        });
                      },
                    });
                  },
                })
              : null,
          ],
        }),
      );
    });
  }

  const tabs = [];
  function setMode(next) {
    mode = next;
    tabs.forEach(function (button) {
      button.classList.toggle("active", button.dataset.mode === next);
    });
    search.placeholder =
      next === "garage"
        ? "Buscar na garagem pelo nome, spawn ou placa..."
        : "Buscar veiculo pelo nome ou spawn...";
    render();
  }

  const tabGame = el(
    "button",
    {
      class: "tab-btn active",
      "data-mode": "game",
      onclick: function () {
        setMode("game");
      },
    },
    [
      icon("car", 14),
      el("span", { text: "Veiculos do jogo (" + data.game.length + ")" }),
    ],
  );
  const tabAddon = el(
    "button",
    {
      class: "tab-btn",
      "data-mode": "addon",
      onclick: function () {
        setMode("addon");
      },
    },
    [
      icon("plus", 14),
      el("span", { text: "Veiculos addon (" + data.addon.length + ")" }),
    ],
  );
  const tabGarage = el(
    "button",
    {
      class: "tab-btn",
      "data-mode": "garage",
      onclick: function () {
        setMode("garage");
      },
    },
    [icon("folder", 14), el("span", { text: "Garagem do ID" })],
  );
  tabs.push(tabGame, tabAddon, tabGarage);

  // Buscar reinicia a pagina da lista que esta a ser vista, senao a grelha fica vazia.
  search.addEventListener("input", function () {
    resetPage("veiculos:" + mode);
    render();
  });

  garageId.addEventListener("change", function () {
    resetPage("veiculos:garage");
    if (mode === "garage") renderGarage(true);
  });

  // Captura de imagens. Cartao proprio, so para quem tem a permissao. Fica escondido quando
  // nao ha nada a capturar -- so aparece quando serve para alguma coisa.
  const capturePanel = el("div");
  if (can("vehicle.capture")) renderCapture(capturePanel);

  const escondidos = (data.hidden && data.hidden.game + data.hidden.addon) || 0;
  const filterBar = el("div", { class: "row filter-bar" });

  if (!data.validated) {
    filterBar.appendChild(
      el("span", { class: "tag warn", text: "NAO VALIDADO" }),
    );
    filterBar.appendChild(
      el("span", {
        class: "muted",
        text: "Ainda nao foi possivel perguntar ao jogo que modelos existem. A lista abaixo vem dos ficheiros e pode ter carros que nao nascem.",
      }),
    );
  } else if (escondidos > 0) {
    filterBar.appendChild(el("span", { class: "tag ok", text: "FILTRADO" }));
    filterBar.appendChild(
      el("span", {
        class: "muted",
        text:
          escondidos +
          " modelo(s) do catalogo nao existem no jogo e estao escondidos. Validado em " +
          dateBR(data.validatedAt) +
          " as " +
          timeBR(data.validatedAt) +
          ".",
      }),
    );
    filterBar.appendChild(el("div", { class: "spacer" }));
    filterBar.appendChild(
      el("button", {
        class: "btn small" + (S.sel.vehShowAll ? " primary" : " ghost"),
        text: S.sel.vehShowAll
          ? "Esconder os ausentes"
          : "Mostrar os " + escondidos + " ausentes",
        onclick: function () {
          S.sel.vehShowAll = !S.sel.vehShowAll;
          setTab("veiculos");
        },
      }),
    );
  } else {
    filterBar.appendChild(
      el("span", { class: "tag ok", text: "TUDO NO JOGO" }),
    );
    filterBar.appendChild(
      el("span", {
        class: "muted",
        text:
          "Todos os modelos do catalogo existem no jogo. Validado em " +
          dateBR(data.validatedAt) +
          " as " +
          timeBR(data.validatedAt) +
          ".",
      }),
    );
  }

  view.appendChild(
    el("div", { class: "stack" }, [
      quickGrid,
      el("div", { class: "card" }, [
        el("div", { class: "row" }, [
          el("div", { class: "search", style: { flex: 1 } }, [search]),
          el("div", { style: { width: "180px" } }, [garageId]),
        ]),
        el("div", { class: "row", style: { marginTop: "12px" } }, [
          tabGame,
          tabAddon,
          tabGarage,
          el("div", { class: "spacer" }),
          can("vehicle.catalog")
            ? el("button", { class: "btn primary", onclick: promptCatalog }, [
                icon("plus", 14),
                el("span", { text: "Adicionar veiculo" }),
              ])
            : null,
        ]),
        filterBar,
        topPager,
      ]),
      capturePanel,
      grid,
      bottomPager,
    ]),
  );

  if (data.loading) {
    grid.appendChild(
      el("div", { class: "empty" }, [
        el("strong", { text: "Catalogo a ser gerado" }),
        el("span", {
          text: "O servidor esta analisando os vehicles.meta. Volte em alguns segundos.",
        }),
      ]),
    );
  } else {
    render();
  }
};

/* --------------------------------------------------------------------------------------------
   CAPTURA DE IMAGENS DE VEICULO
-------------------------------------------------------------------------------------------- */
let captureHost = null;

async function renderCapture(host) {
  captureHost = host;
  const data = await getData("capture");
  paintCapture(data);
}

function capturaAviso(titulo, texto) {
  return el("div", { class: "card" }, [
    el("div", { class: "card-head" }, [
      el("div", {}, [
        el("h3", { text: "Imagens dos veiculos" }),
        el("p", { text: "Gera o .png de cada carro a partir do jogo." }),
      ]),
      el("div", { class: "ic" }, [icon("target", 16)]),
    ]),
    el("div", { class: "cap-bloqueio" }, [
      el("span", { class: "tag bad", text: "PARADO" }),
      el("div", {}, [el("strong", { text: titulo }), el("p", { text: texto })]),
    ]),
  ]);
}

function paintCapture(data) {
  const host = captureHost;
  if (!host || !document.body.contains(host)) return;
  clear(host);

  if (!data) {
    host.appendChild(
      capturaAviso(
        "A consulta nao respondeu",
        'O servidor devolveu vazio na consulta "capture". Ou o triade_admin nao carregou o server/sv_capture.lua, ou o seu cargo nao tem a permissao vehicle.capture. Veja a consola do servidor.',
      ),
    );
    return;
  }

  if (!data.enabled) {
    host.appendChild(
      capturaAviso(
        "Captura desligada no config",
        "Ponha TriadeAdmin.Capture.Enabled = true no config.lua e reinicie o triade_admin.",
      ),
    );
    return;
  }

  // Pre-requisitos. Dizer POR QUE nao da e melhor do que um botao que falha ao ser clicado --
  // e dizer O QUE FAZER e melhor do que so apontar o problema.
  const bloqueios = [];
  if (!data.screenshot)
    bloqueios.push(
      "o recurso screenshot-basic nao esta a correr (na consola: ensure screenshot-basic)",
    );
  if (!data.validated)
    bloqueios.push(
      "o catalogo ainda nao foi validado no jogo (feche e reabra esta aba uma vez)",
    );

  const corpo = [];

  if (data.running) {
    const total = data.total || 1;
    const pct = Math.round((data.done / total) * 100);

    corpo.push(
      el("div", { class: "cap-bar" }, [
        el("div", { class: "cap-fill", style: { width: pct + "%" } }),
      ]),
    );
    corpo.push(
      el(
        "div",
        { class: "row", style: { marginTop: "10px", flexWrap: "wrap" } },
        [
          el("strong", { text: data.done + " / " + total }),
          el("span", {
            class: "muted",
            text: data.current
              ? "a fotografar " + data.current
              : "a preparar...",
          }),
          el("div", { class: "spacer" }),
          el("span", { class: "tag ok", text: data.ok + " gravadas" }),
          data.fail > 0
            ? el("span", { class: "tag bad", text: data.fail + " falhas" })
            : null,
          el("button", {
            class: "btn small danger",
            text: "Parar",
            onclick: async function () {
              await run("vehicle.capture.stop", {});
            },
          }),
        ],
      ),
    );
    corpo.push(
      el("p", {
        class: "muted",
        style: { marginTop: "8px" },
        text: "Nao saia do jogo nem feche o painel ate terminar: e o seu cliente que desenha a cena. O seu personagem fica parado num mundo isolado e volta ao sitio no fim.",
      }),
    );
  } else {
    corpo.push(
      el("div", { class: "row", style: { flexWrap: "wrap" } }, [
        el("strong", { text: data.pending + " addon(s) sem imagem" }),
        el("span", { class: "muted", text: "gravadas em " + data.folder }),
        el("div", { class: "spacer" }),
        // Lote de teste primeiro, e a primeiro de proposito: julgar o enquadramento com 5
        // custa 20 segundos, descobrir que estava errado ao fim de 368 custa meia hora.
        bloqueios.length === 0 && data.pending > 0
          ? el(
              "button",
              {
                class: "btn",
                onclick: function () {
                  confirmCapture(data, "faltam", 5, "addon");
                },
              },
              [icon("eye", 14), el("span", { text: "Testar 5" })],
            )
          : null,
        bloqueios.length === 0 && data.pending > 0
          ? el(
              "button",
              {
                class: "btn primary",
                onclick: function () {
                  confirmCapture(data, "faltam", 0, "addon");
                },
              },
              [
                icon("target", 14),
                el("span", { text: "Capturar os " + data.pending + " addons" }),
              ],
            )
          : null,
        bloqueios.length === 0
          ? el(
              "button",
              {
                class: "btn",
                onclick: function () {
                  confirmCapture(data, "todos", 0, "addon");
                },
              },
              [
                icon("refresh", 14),
                el("span", { text: "Refazer todos os addons" }),
              ],
            )
          : null,
      ]),
    );

    if (bloqueios.length === 0 && data.pendingGame > 0) {
      corpo.push(
        el(
          "div",
          { class: "row", style: { flexWrap: "wrap", marginTop: "8px" } },
          [
            el("span", {
              class: "muted",
              text:
                "Ha tambem " +
                data.pendingGame +
                " veiculo(s) do jogo (vanilla e DLC) sem imagem nas pastas. Estes costumam ter arte pronta na internet.",
            }),
            el("div", { class: "spacer" }),
            el(
              "button",
              {
                class: "btn small ghost",
                onclick: function () {
                  confirmCapture(data, "faltam", 5, "game");
                },
              },
              [el("span", { text: "Testar 5 do jogo" })],
            ),
            el(
              "button",
              {
                class: "btn small ghost",
                onclick: function () {
                  confirmCapture(data, "faltam", 0, "game");
                },
              },
              [el("span", { text: "Capturar os do jogo" })],
            ),
          ],
        ),
      );
    }

    if (bloqueios.length) {
      corpo.push(
        el("div", { class: "cap-bloqueio" }, [
          el("span", { class: "tag bad", text: "SEM BOTOES" }),
          el("div", {}, [
            el("strong", { text: "Nao da para comecar ainda" }),
            el("p", { text: bloqueios.join("  ·  ") }),
          ]),
        ]),
      );
    } else if (data.pending === 0) {
      corpo.push(
        el("p", {
          class: "muted",
          style: { marginTop: "8px" },
          text: 'Todos os modelos do catalogo ja tem imagem. Use "Refazer todas" se quiser gerar outra vez.',
        }),
      );
    }

    if (data.failures && data.failures.length) {
      const lista = el("div", { class: "cap-fails" });
      data.failures.slice(0, 40).forEach(function (f) {
        lista.appendChild(
          el("div", { class: "cap-fail" }, [
            el("strong", { text: f.spawn }),
            el("span", { text: f.motivo }),
          ]),
        );
      });
      corpo.push(
        el("div", { style: { marginTop: "12px" } }, [
          el("p", {
            class: "muted",
            text: "Do ultimo lote, " + data.failures.length + " falharam:",
          }),
          lista,
        ]),
      );
    }
  }

  host.appendChild(
    el(
      "div",
      { class: "card" },
      [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Imagens dos veiculos" }),
            el("p", {
              text: "Gera o .png de cada carro a partir do jogo. Os packs desta base nao trazem miniatura.",
            }),
          ]),
          el("div", { class: "ic" }, [icon("target", 16)]),
        ]),
      ].concat(corpo),
    ),
  );
}

function confirmCapture(data, mode, limit, kind) {
  kind = kind || "addon";
  const restantes = kind === "game" ? data.pendingGame : data.pending;
  const total = limit || (mode === "todos" ? null : restantes);
  const quantos = limit
    ? limit + " modelo(s), so para ver como ficam"
    : mode === "todos"
      ? "TODOS os modelos do catalogo"
      : data.pending + " modelo(s)";

  const segundos = (total || (data.pending || 0) + 200) * 4;
  const tempo =
    segundos < 90
      ? segundos + " segundos"
      : Math.ceil(segundos / 60) + " minuto(s)";

  openModal({
    title: limit ? "Lote de teste" : "Capturar imagens",
    subtitle:
      "Vai fotografar " +
      quantos +
      ", cerca de " +
      tempo +
      ". O seu personagem fica preso num mundo isolado ate terminar — da para parar a meio." +
      (limit ? " Veja as imagens na pasta antes de correr o lote todo." : ""),
    confirmText: "Comecar",
    onConfirm: async function () {
      const r = await run("vehicle.capture.start", {
        mode: mode,
        limit: limit || 0,
        kind: kind,
      });
      if (r && r.ok) renderCapture(captureHost);
    },
  });
}

function promptVehicle(key, title, needPassport) {
  const fields = [
    {
      key: "spawn",
      label: "Spawn do veiculo",
      type: "text",
      placeholder: "Ex.: casco",
    },
  ];
  if (needPassport)
    fields.unshift({
      key: "passport",
      label: "Passaporte / ID",
      type: "number",
    });

  openModal({
    title: title,
    subtitle: "Informe os dados para executar a acao.",
    fields: fields,
    onConfirm: function (values) {
      return run(key, values);
    },
  });
}

function promptCatalog() {
  openModal({
    title: "Adicionar veiculo ao catalogo",
    subtitle: "Inclui o veiculo na listagem do painel.",
    fields: [
      { key: "spawn", label: "Spawn do veiculo", type: "text" },
      { key: "label", label: "Nome exibido", type: "text" },
      {
        key: "kind",
        label: "Tipo",
        type: "select",
        options: [
          { value: "game", label: "Veiculo do jogo" },
          { value: "addon", label: "Veiculo addon" },
        ],
      },
    ],
    onConfirm: async function (values) {
      const result = await run("vehicle.catalog", values);
      if (!result || !result.ok) return result;
      renderTab();
      return result;
    },
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: LOCAIS
-------------------------------------------------------------------------------------------- */
RENDER.locais = async function (view) {
  let category = S.sel.category || null;

  async function render() {
    const data = (await getData("locations")) || {
      categories: [],
      locations: [],
    };
    clear(view);

    if (!category) {
      const search = el("input", {
        type: "search",
        placeholder: "Buscar categoria...",
      });
      const grid = el("div", { class: "grid grid-3" });

      function list() {
        clear(grid);
        const term = search.value.toLowerCase();
        data.categories
          .filter(function (item) {
            return !term || item.name.toLowerCase().includes(term);
          })
          .forEach(function (item) {
            grid.appendChild(
              el(
                "div",
                {
                  class: "banner",
                  onclick: function () {
                    category = item.name;
                    S.sel.category = item.name;
                    render();
                  },
                },
                [
                  el("div", { class: "ic" }, [
                    icon(item.external ? "target" : "map", 18),
                  ]),
                  el("div", { class: "txt" }, [
                    el("strong", { text: item.name, style: { margin: 0 } }),
                    // As de fora sao lidas do recurso dono (o craft) a cada abertura, por isso
                    // nao se diz "cadastrados": ninguem as cadastrou aqui.
                    el("p", {
                      text: item.external
                        ? item.total + " pontos (lidos do triade_craft)"
                        : item.total + " locais cadastrados",
                    }),
                  ]),
                  item.external
                    ? el("span", { class: "tag grey", text: "SO LEITURA" })
                    : null,
                  can("local.delete") && !item.external && item.total === 0
                    ? el("button", {
                        class: "btn small danger",
                        title: "Apagar categoria vazia",
                        html: "&#10005;",
                        onclick: async function (event) {
                          event.stopPropagation();
                          await run("location.categoryDelete", {
                            name: item.name,
                          });
                          render();
                        },
                      })
                    : null,
                  el("span", { class: "muted", html: "&rsaquo;" }),
                ],
              ),
            );
          });
        if (!grid.children.length)
          grid.appendChild(
            el("div", { class: "empty" }, [
              el("strong", { text: "Nenhuma categoria" }),
            ]),
          );
      }

      search.addEventListener("input", list);

      view.appendChild(
        el("div", { class: "stack" }, [
          el("div", { class: "card" }, [
            el("div", { class: "row" }, [
              el("div", { class: "search", style: { flex: 1 } }, [search]),
              can("local.create")
                ? el(
                    "button",
                    {
                      class: "btn",
                      onclick: function () {
                        openModal({
                          title: "Nova categoria",
                          subtitle: "Crie um grupo para organizar os locais.",
                          fields: [
                            {
                              key: "name",
                              label: "Nome da categoria",
                              type: "text",
                            },
                          ],
                          onConfirm: async function (values) {
                            const result = await run(
                              "location.category",
                              values,
                            );
                            if (!result || !result.ok) return result;
                            render();
                            return result;
                          },
                        });
                      },
                    },
                    [icon("plus", 14), el("span", { text: "Nova categoria" })],
                  )
                : null,
              can("local.create")
                ? el(
                    "button",
                    {
                      class: "btn primary",
                      onclick: function () {
                        promptLocation(data.categories, null, render);
                      },
                    },
                    [icon("pin", 14), el("span", { text: "Add local" })],
                  )
                : null,
            ]),
          ]),
          grid,
        ]),
      );

      list();
      return;
    }

    const locations = data.locations.filter(function (item) {
      return item.category === category;
    });
    const search = el("input", {
      type: "search",
      placeholder: "Buscar em " + category + "...",
    });
    const grid = el("div", { class: "grid grid-3" });

    function list() {
      clear(grid);
      const term = search.value.toLowerCase();
      locations
        .filter(function (item) {
          return !term || item.name.toLowerCase().includes(term);
        })
        .forEach(function (item) {
          grid.appendChild(
            el(
              "div",
              { class: "card", style: { background: "var(--bg-card)" } },
              [
                el("div", { class: "row" }, [
                  el(
                    "div",
                    {
                      class: "ic",
                      style: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "9px",
                        background: "var(--accent-soft)",
                        display: "grid",
                        placeItems: "center",
                        color: "#7fb4ff",
                      },
                    },
                    [icon("pin", 15)],
                  ),
                  el("div", { class: "spacer" }),
                  el("span", {
                    class: "tag",
                    text: item.external ? "CRAFT" : "#" + item.id,
                  }),
                ]),
                el("strong", {
                  text: item.name,
                  style: { display: "block", margin: "10px 0 6px" },
                }),
                el("span", { class: "tag grey", text: item.category }),
                // O detalhe do craft (org e modo da bancada, item e quantidade do checkpoint) e o
                // que distingue dois pontos com nome parecido.
                item.info
                  ? el("span", {
                      class: "muted",
                      style: {
                        display: "block",
                        marginTop: "6px",
                        fontSize: "11.5px",
                      },
                      text: item.info,
                    })
                  : null,
                el("div", {
                  class: "mono",
                  style: { margin: "10px 0" },
                  text:
                    Number(item.x).toFixed(2) +
                    ", " +
                    Number(item.y).toFixed(2) +
                    ", " +
                    Number(item.z).toFixed(2),
                }),
                el("div", { class: "row" }, [
                  // Local externo nao tem id: a coordenada vai no pedido. O servidor continua a
                  // verificar a permissao e a registar o teleporte.
                  can("local.teleport")
                    ? el(
                        "button",
                        {
                          class: "btn small",
                          onclick: function () {
                            run(
                              "location.teleport",
                              item.external
                                ? {
                                    id: 0,
                                    x: item.x,
                                    y: item.y,
                                    z: item.z,
                                    name: item.name,
                                  }
                                : { id: item.id },
                            );
                          },
                        },
                        [
                          icon("target", 13),
                          el("span", { text: "Teleportar" }),
                        ],
                      )
                    : null,
                  el("div", { class: "spacer" }),
                  // Sem Apagar nos externos: a linha e do craft, e o painel nao e dono dela.
                  can("local.delete") && !item.external
                    ? el(
                        "button",
                        {
                          class: "btn small danger",
                          onclick: async function () {
                            await run("location.delete", { id: item.id });
                            render();
                          },
                        },
                        [icon("trash", 13), el("span", { text: "Apagar" })],
                      )
                    : null,
                ]),
              ],
            ),
          );
        });
      if (!grid.children.length)
        grid.appendChild(
          el("div", { class: "empty" }, [
            el("strong", { text: "Nenhum local cadastrado" }),
          ]),
        );
    }

    search.addEventListener("input", list);

    view.appendChild(
      el("div", { class: "stack" }, [
        el("div", { class: "card" }, [
          el("div", { class: "row" }, [
            el(
              "button",
              {
                class: "btn",
                onclick: function () {
                  category = null;
                  S.sel.category = null;
                  render();
                },
              },
              [
                el("span", { html: "&lsaquo;" }),
                el("span", { text: "Voltar" }),
              ],
            ),
            el("div", {}, [
              el("span", { class: "eyebrow", text: "CATEGORIA" }),
              el("strong", {
                text: category + " - " + locations.length + " locais",
              }),
            ]),
          ]),
        ]),
        el("div", { class: "card" }, [
          el("div", { class: "row" }, [
            el("div", { class: "search", style: { flex: 1 } }, [search]),
            can("local.create")
              ? el(
                  "button",
                  {
                    class: "btn primary",
                    onclick: function () {
                      promptLocation(data.categories, category, render);
                    },
                  },
                  [icon("plus", 14), el("span", { text: "Add local" })],
                )
              : null,
          ]),
        ]),
        grid,
      ]),
    );

    list();
  }

  render();
};

async function promptLocation(categories, preset, done) {
  const current = await run("location.current", {}, true);
  const coords = (current && current.data && current.data.coords) || "";

  openModal({
    title: "Adicionar local",
    subtitle:
      "A coordenada atual ja vem preenchida. Pode substituir manualmente.",
    fields: [
      { key: "name", label: "Nome do local", type: "text" },
      {
        key: "category",
        label: "Categoria",
        type: "select",
        value: preset || "Geral",
        options: categories.map(function (c) {
          return { value: c.name, label: c.name };
        }),
      },
      {
        key: "coords",
        label: "Coordenadas (X, Y, Z)",
        type: "text",
        value: coords,
        hint: "Deixe como esta para usar a sua posicao capturada.",
      },
    ],
    onConfirm: async function (values) {
      const result = await run("location.create", {
        name: values.name,
        category: values.category,
        manual: true,
        coords: values.coords,
      });
      // Coordenada mal colada e o erro tipico aqui: sem isto perdia-se tambem o nome.
      if (!result || !result.ok) return result;
      if (done) done();
      return result;
    },
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: CLIMA
-------------------------------------------------------------------------------------------- */
RENDER.clima = async function (view) {
  async function render() {
    const data = await getData("weather");
    clear(view);
    if (!data) return;

    const left = el("div", { class: "card" });
    left.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("h3", { text: "Clima do servidor" }),
          el("p", {
            text: "Selecione um clima ou ative a rotacao automatica.",
          }),
        ]),
        el("div", { class: "stat", style: { padding: "10px 14px" } }, [
          el("span", { class: "dot-online" }),
          el("div", {}, [
            el("span", {
              text: "CLIMA ATUAL",
              style: { fontSize: "9px", letterSpacing: "1.2px" },
            }),
            el("strong", { text: data.current, style: { fontSize: "15px" } }),
          ]),
        ]),
      ]),
    );

    const toggles = el("div", {
      class: "grid grid-2",
      style: { marginBottom: "14px" },
    });

    function toggleCard(label, description, state, iconName, onChange) {
      const toggle = el("div", { class: "toggle" + (state ? " on" : "") });
      const card = el(
        "div",
        {
          class: "weather-card" + (state ? " active" : ""),
          onclick: async function () {
            await onChange(!state);
            render();
          },
        },
        [
          el("div", { class: "ic" }, [icon(iconName, 16)]),
          el("div", { style: { flex: 1 } }, [
            el("strong", { text: label }),
            el("span", { text: description }),
          ]),
          toggle,
        ],
      );
      return card;
    }

    toggles.appendChild(
      toggleCard(
        "Congelar clima",
        "Mantem o clima selecionado fixo para todos.",
        data.frozen,
        "snowflake",
        function (next) {
          return run("weather.freeze", { state: next });
        },
      ),
    );
    toggles.appendChild(
      toggleCard(
        "Clima rotativo",
        "Alterna naturalmente entre climas comuns.",
        data.rotation,
        "refresh",
        function (next) {
          return run("weather.rotation", { state: next });
        },
      ),
    );
    left.appendChild(toggles);

    const grid = el("div", { class: "weather-grid" });
    data.types.forEach(function (weather) {
      const card = el(
        "div",
        {
          class:
            "weather-card" + (weather.id === data.current ? " active" : ""),
          onclick: async function () {
            if (!can("weather.set")) {
              toast("Bloqueado", "Sem permissao para alterar o clima.", "err");
              return;
            }
            await run("weather.set", { weather: weather.id });
            render();
          },
        },
        [
          el("div", { class: "ic" }, [icon(weather.icon, 16)]),
          el("div", {}, [
            el("strong", { text: weather.label }),
            el("span", { text: weather.id }),
          ]),
        ],
      );
      if (weather.id === data.current)
        card.appendChild(el("span", { class: "badge", text: "ATUAL" }));
      grid.appendChild(card);
    });
    left.appendChild(grid);

    const right = el("div", { class: "card" });
    right.appendChild(
      el("div", { class: "card-head" }, [
        el("div", {}, [
          el("h3", { text: "Horario do servidor" }),
          el("p", { text: "Arraste a barra para definir a hora global." }),
        ]),
      ]),
    );

    const clock = el("div", { class: "clock" });
    const total = data.hours * 60 + data.minutes;
    const label = el("strong", {
      text: pad(data.hours) + ":" + pad(data.minutes),
    });
    clock.appendChild(label);

    const range = el("input", {
      type: "range",
      min: "0",
      max: "1439",
      value: String(total),
    });
    range.addEventListener("input", function () {
      const value = Number(range.value);
      label.textContent = pad(Math.floor(value / 60)) + ":" + pad(value % 60);
    });
    range.addEventListener("change", async function () {
      const value = Number(range.value);
      await run("weather.time", {
        hours: Math.floor(value / 60),
        minutes: value % 60,
      });
    });

    right.appendChild(clock);
    right.appendChild(range);
    right.appendChild(
      el("div", { class: "range-legend" }, [
        el("span", { text: "00:00" }),
        el("span", { text: "06:00" }),
        el("span", { text: "12:00" }),
        el("span", { text: "18:00" }),
        el("span", { text: "23:59" }),
      ]),
    );

    const freezeTime = el(
      "div",
      {
        class: "weather-card",
        style: { marginTop: "16px" },
        onclick: async function () {
          await run("weather.timeFreeze", { state: !data.timeFrozen });
          render();
        },
      },
      [
        el("div", { class: "ic" }, [icon("clock", 16)]),
        el("div", { style: { flex: 1 } }, [
          el("strong", { text: "Congelar horario" }),
          el("span", {
            text: "Pausa o relogio exatamente no horario escolhido.",
          }),
        ]),
        el("div", { class: "toggle" + (data.timeFrozen ? " on" : "") }),
      ],
    );
    right.appendChild(freezeTime);

    right.appendChild(
      el("div", { class: "weather-card", style: { marginTop: "10px" } }, [
        el("div", { class: "ic" }, [icon("clock", 16)]),
        el("div", {}, [
          el("span", { text: "STATUS DO RELOGIO" }),
          el("strong", {
            text: data.timeFrozen ? "CONGELADO" : "EM MOVIMENTO",
          }),
        ]),
      ]),
    );

    view.appendChild(
      el(
        "div",
        { class: "split", style: { gridTemplateColumns: "1fr 380px" } },
        [left, right],
      ),
    );
  }

  render();
};

function pad(value) {
  return String(value).padStart(2, "0");
}

/* --------------------------------------------------------------------------------------------
   ABA: PERSONAGENS
-------------------------------------------------------------------------------------------- */
RENDER.personagens = async function (view) {
  clear(view);

  const search = el("input", {
    type: "search",
    placeholder: "Buscar por passaporte, nome, sobrenome, telefone ou RG...",
  });
  const grid = el("div", { class: "grid grid-3" });
  const topPager = el("div");
  const bottomPager = el("div");
  const head = el("div", { class: "card-head" });

  let loading = false;

  async function load() {
    if (loading) return;
    loading = true;

    const query = pageQuery("personagens");
    const data = (await getData("characters", {
      search: search.value,
      page: query.page,
      size: query.size,
    })) || { characters: [], total: 0 };

    loading = false;

    clear(grid);
    clear(topPager);
    clear(bottomPager);
    clear(head);

    head.appendChild(
      el("div", {}, [
        el("h3", { text: "Personagens do servidor" }),
        el("p", {
          text:
            data.total +
            " no total. Inclui quem esta offline -- e a tabela characters inteira.",
        }),
      ]),
    );

    const rows = data.characters || [];
    topPager.appendChild(
      serverPager("personagens", data.total, rows.length, load),
    );
    bottomPager.appendChild(
      serverPager("personagens", data.total, rows.length, load),
    );

    if (!rows.length) {
      grid.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum personagem encontrado" }),
          el("span", {
            text: search.value
              ? 'Nada bate com "' + search.value + '".'
              : "A tabela characters esta vazia.",
          }),
        ]),
      );
      clear(bottomPager);
      return;
    }

    rows.forEach(function (person) {
      const tags = [];
      if (person.online)
        tags.push(el("span", { class: "tag ok", text: "ONLINE" }));
      if (person.banned)
        tags.push(el("span", { class: "tag bad", text: "BANIDO" }));
      if (!person.whitelist)
        tags.push(el("span", { class: "tag warn", text: "SEM WL" }));

      grid.appendChild(
        el("div", { class: "card char-card" }, [
          el("div", { class: "char-top" }, [
            el("div", { class: "avatar", text: person.initials }),
            el("div", { class: "char-id" }, [
              el("strong", { text: person.name }),
              el("span", {
                text:
                  "ID #" +
                  person.passport +
                  (person.age ? " - " + person.age + " anos" : ""),
              }),
            ]),
            el("div", { class: "char-tags" }, tags),
          ]),
          el("div", { class: "char-facts" }, [
            fact("Banco", money(person.bank)),
            fact("Multas", money(person.fines)),
            fact("Veiculos", String(person.vehicles)),
            fact("Advertencias", String(person.warns)),
            fact("Telefone", person.phone),
            fact("RG", person.registration),
          ]),
          el(
            "div",
            { class: "row", style: { marginTop: "12px", flexWrap: "wrap" } },
            [
              can("tab.rg")
                ? el("button", {
                    class: "btn small",
                    text: "Alterar RG",
                    onclick: function () {
                      S.sel.rg = person.passport;
                      setTab("rg");
                    },
                  })
                : null,
              can("tab.setagem")
                ? el("button", {
                    class: "btn small",
                    text: "Setagem",
                    onclick: function () {
                      S.sel.setagem = person.passport;
                      setTab("setagem");
                    },
                  })
                : null,
              can("server.ban") && !person.banned
                ? el("button", {
                    class: "btn small danger",
                    text: "Banir",
                    onclick: function () {
                      openModal({
                        title: "Banir " + person.name,
                        subtitle: "Passaporte #" + person.passport,
                        danger: true,
                        fields: [
                          { key: "reason", label: "Motivo", type: "text" },
                        ],
                        onConfirm: async function (values) {
                          const result = await run("server.ban", {
                            passport: person.passport,
                            reason: values.reason,
                          });
                          if (!result || !result.ok) return result;
                          load();
                          return result;
                        },
                      });
                    },
                  })
                : null,
              can("server.unban") && person.banned
                ? el("button", {
                    class: "btn small success",
                    text: "Desbanir",
                    onclick: function () {
                      openModal({
                        title: "Desbanir " + person.name,
                        subtitle: "Passaporte #" + person.passport,
                        fields: [
                          {
                            key: "reason",
                            label: "Motivo do desbanimento",
                            type: "text",
                          },
                        ],
                        onConfirm: async function (values) {
                          const result = await run("server.unban", {
                            passport: person.passport,
                            reason: values.reason,
                          });
                          if (!result || !result.ok) return result;
                          load();
                          return result;
                        },
                      });
                    },
                  })
                : null,
              can("server.wipeid")
                ? el("button", {
                    class: "btn small danger",
                    text: "Apagar dados",
                    onclick: function () {
                      openModal({
                        title: "Apagar o passaporte #" + person.passport,
                        danger: true,
                        confirmText: "Apagar tudo",
                        subtitle:
                          "Isto apaga " +
                          person.name +
                          " de mais de 60 tabelas: telefone, casa, faccao, multas, veiculos, skin. Nao ha como desfazer. O jogador precisa estar OFFLINE.",
                        onConfirm: async function () {
                          await run("server.wipeid", {
                            passport: person.passport,
                          });
                          load();
                        },
                      });
                    },
                  })
                : null,
            ],
          ),
        ]),
      );
    });
  }

  function fact(label, value) {
    return el("div", { class: "char-fact" }, [
      el("span", { text: label }),
      el("strong", { text: value }),
    ]);
  }

  // Buscar volta a pagina 1 e so dispara o pedido depois de parar de escrever: sem o atraso,
  // cada tecla era uma consulta ao servidor.
  let typing = null;
  search.addEventListener("input", function () {
    clearTimeout(typing);
    typing = setTimeout(function () {
      resetPage("personagens");
      load();
    }, 350);
  });

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        head,
        el("div", { class: "search", style: { marginTop: "12px" } }, [search]),
        topPager,
      ]),
      grid,
      bottomPager,
    ]),
  );

  load();
};

/* --------------------------------------------------------------------------------------------
   ABA: METRICAS
-------------------------------------------------------------------------------------------- */
RENDER.metricas = async function (view) {
  const data = await getData("metrics");
  clear(view);

  if (!data) {
    view.appendChild(
      el("div", { class: "empty" }, [el("strong", { text: "Sem dados" })]),
    );
    return;
  }

  const totals = el("div", { class: "grid grid-4" });
  data.totals.forEach(function (item) {
    totals.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [icon(item.icon, 16)]),
        el("div", {}, [
          el("strong", { text: Number(item.value).toLocaleString("pt-BR") }),
          el("span", { text: item.label }),
        ]),
      ]),
    );
  });

  const moneyRow = el("div", { class: "grid grid-3" });
  data.money.forEach(function (item) {
    moneyRow.appendChild(
      el("div", { class: "stat" }, [
        el("div", { class: "ic" }, [
          icon(item.id === "taxes" ? "moneyout" : "moneyin", 16),
        ]),
        el("div", {}, [
          el("strong", { text: money(item.value) }),
          el("span", { text: item.label }),
        ]),
      ]),
    );
  });
  moneyRow.appendChild(
    el("div", { class: "stat" }, [
      el("div", { class: "ic" }, [icon("clock", 16)]),
      el("div", {}, [
        el("strong", { text: uptimeText(data.uptime) }),
        el("span", { text: "Servidor de pe ha" }),
      ]),
    ]),
  );

  const boards = el("div", { class: "grid grid-2" });
  data.rankings.forEach(function (board) {
    const list = el("div", { class: "rank-list" });

    if (!board.rows.length) {
      list.appendChild(
        el("div", { class: "empty" }, [
          el("span", { text: "Sem dados ainda." }),
        ]),
      );
    }

    board.rows.forEach(function (row) {
      list.appendChild(
        el("div", { class: "rank-row" }, [
          el("span", {
            class: "rank-pos" + (row.position <= 3 ? " top" : ""),
            text: String(row.position),
          }),
          el("div", { class: "rank-who" }, [
            el("strong", { text: row.name }),
            el("span", { text: "ID #" + row.passport }),
          ]),
          el("strong", {
            class: "rank-value",
            text:
              board.suffix === "money"
                ? money(row.value)
                : Number(row.value).toLocaleString("pt-BR") +
                  " " +
                  board.suffix,
          }),
        ]),
      );
    });

    boards.appendChild(
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: board.label }),
            el("p", { text: "Os 25 primeiros." }),
          ]),
          el("div", { class: "ic" }, [icon(board.icon, 16)]),
        ]),
        list,
      ]),
    );
  });

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Totais do servidor" }),
            el("p", { text: "Contagens diretas da base de dados." }),
          ]),
        ]),
        totals,
      ]),
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Dinheiro" }),
            el("p", {
              text: "So o que esta guardado. A carteira nao entra: e um item do ox_inventory e so existe para quem esta ligado.",
            }),
          ]),
        ]),
        moneyRow,
      ]),
      boards,
    ]),
  );
};

function uptimeText(seconds) {
  const s = Number(seconds) || 0;
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return d + "d " + h + "h";
  if (h > 0) return h + "h " + m + "min";
  return m + "min";
}

/* --------------------------------------------------------------------------------------------
   ABA: REGISTOS (acoes da staff + chat interno)
-------------------------------------------------------------------------------------------- */
RENDER.registos = async function (view) {
  clear(view);

  let mode = can("log.view") ? "logs" : "chat";
  const body = el("div");
  const tabs = [];

  function setMode(next) {
    mode = next;
    tabs.forEach(function (b) {
      b.classList.toggle("active", b.dataset.mode === next);
    });
    stopTimers();
    clear(body);
    if (next === "logs") renderLogs(body);
    else renderChat(body);
  }

  const tabLogs = el(
    "button",
    {
      class: "tab-btn",
      "data-mode": "logs",
      onclick: function () {
        setMode("logs");
      },
    },
    [icon("history", 14), el("span", { text: "Acoes da staff" })],
  );
  const tabChat = el(
    "button",
    {
      class: "tab-btn",
      "data-mode": "chat",
      onclick: function () {
        setMode("chat");
      },
    },
    [icon("message", 14), el("span", { text: "Chat da staff" })],
  );

  if (can("log.view")) tabs.push(tabLogs);
  if (can("chat.read")) tabs.push(tabChat);

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [el("div", { class: "row" }, tabs)]),
      body,
    ]),
  );

  setMode(mode);
};

/* REGISTOS - ACOES DA STAFF ------------------------------------------------------------------ */
async function renderLogs(host) {
  const search = el("input", {
    type: "search",
    placeholder: "Buscar por ID da staff, nome, acao ou detalhe...",
  });
  const table = el("div", { class: "log-table" });
  const topPager = el("div");
  const chips = el("div", {
    class: "row",
    style: { flexWrap: "wrap", marginTop: "10px" },
  });

  let loading = false;

  async function load() {
    if (loading) return;
    loading = true;

    const query = pageQuery("logs");
    const data = (await getData("logs", {
      search: search.value,
      page: query.page,
      size: query.size,
    })) || { logs: [], total: 0, actions: [] };

    loading = false;
    clear(table);
    clear(topPager);
    clear(chips);

    topPager.appendChild(
      serverPager("logs", data.total, (data.logs || []).length, load),
    );

    // Atalhos pelas acoes mais frequentes -- e assim que se procura "quem baniu quem".
    (data.actions || []).slice(0, 12).forEach(function (entry) {
      chips.appendChild(
        el("button", {
          class: "btn small ghost",
          text: entry.action + " (" + entry.total + ")",
          onclick: function () {
            search.value = entry.action;
            resetPage("logs");
            load();
          },
        }),
      );
    });

    if (!(data.logs || []).length) {
      table.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum registo" }),
          el("span", {
            text: search.value
              ? 'Nada bate com "' + search.value + '".'
              : "Ainda nao houve nenhuma acao pelo painel.",
          }),
        ]),
      );
      return;
    }

    table.appendChild(
      el("div", { class: "log-row head" }, [
        el("span", { text: "Data" }),
        el("span", { text: "Hora" }),
        el("span", { text: "Staff" }),
        el("span", { text: "Acao" }),
        el("span", { text: "Detalhes" }),
      ]),
    );

    data.logs.forEach(function (row) {
      table.appendChild(
        el("div", { class: "log-row" }, [
          el("span", { text: dateBR(row.created_at) }),
          el("span", { text: timeBR(row.created_at) }),
          el("span", { text: (row.staff_name || "-") + " #" + row.staff_id }),
          el("span", { class: "log-action", text: row.action }),
          el("span", {
            class: "log-details",
            title: row.details || "",
            text: row.details || "-",
          }),
        ]),
      );
    });
  }

  let typing = null;
  search.addEventListener("input", function () {
    clearTimeout(typing);
    typing = setTimeout(function () {
      resetPage("logs");
      load();
    }, 350);
  });

  host.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Acoes da staff" }),
            el("p", {
              text: "Tudo o que foi executado pelo painel, com quem executou, quando e sobre quem.",
            }),
          ]),
          can("log.clear")
            ? el("button", {
                class: "btn small danger",
                text: "Limpar",
                onclick: function () {
                  openModal({
                    title: "Limpar o registo de acoes",
                    danger: true,
                    confirmText: "Limpar",
                    subtitle:
                      "Deixe os dias em branco ou em 0 para apagar TUDO. Isto nao se desfaz.",
                    fields: [
                      {
                        key: "days",
                        label: "Apagar o que for mais antigo que (dias)",
                        type: "number",
                        placeholder: "30",
                      },
                    ],
                    onConfirm: async function (values) {
                      const result = await run("log.clear", {
                        days: values.days,
                      });
                      if (!result || !result.ok) return result;
                      resetPage("logs");
                      load();
                      return result;
                    },
                  });
                },
              })
            : null,
        ]),
        el("div", { class: "search" }, [search]),
        chips,
        topPager,
      ]),
      table,
    ]),
  );

  load();
}

/* REGISTOS - CHAT DA STAFF ------------------------------------------------------------------- */
let chatBox = null;

async function renderChat(host) {
  const data = (await getData("chat")) || { messages: [], me: 0 };

  const list = el("div", { class: "chat-list" });
  const input = el("input", {
    type: "text",
    maxlength: 400,
    placeholder: "Escreva para a equipa e carregue Enter...",
  });

  // Guardado num global para o evento de mensagem nova conseguir anexar sem re-render.
  chatBox = { list: list, me: data.me };

  function atBottom() {
    // 40px de folga: se a pessoa esta a ler mensagens antigas, nao a arrastamos para baixo.
    return list.scrollTop + list.clientHeight >= list.scrollHeight - 40;
  }

  function append(message, scroll) {
    const mine = Number(message.staff_id) === Number(data.me);
    list.appendChild(
      el("div", { class: "chat-msg" + (mine ? " mine" : "") }, [
        el("div", { class: "chat-head" }, [
          el("strong", { text: message.staff_name }),
          el("span", { class: "chat-role", text: message.staff_role || "" }),
          el("span", {
            class: "chat-time",
            text: dateBR(message.created_at) + " " + timeBR(message.created_at),
          }),
        ]),
        el("p", { text: message.message }),
      ]),
    );
    if (scroll) list.scrollTop = list.scrollHeight;
  }

  chatBox.append = function (message) {
    const keep = atBottom();
    append(message, keep);
  };

  if (!data.messages.length) {
    list.appendChild(
      el("div", { class: "empty" }, [
        el("strong", { text: "Sem mensagens" }),
        el("span", { text: "Comece a conversa." }),
      ]),
    );
  }
  data.messages.forEach(function (m) {
    append(m, false);
  });

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    const result = await run("chat.send", { message: text }, true);
    // A mensagem volta pelo evento de rede, como a de qualquer outro membro da staff -- nao
    // a acrescentamos aqui para nao aparecer duas vezes.
    if (result && !result.ok)
      toast("Aviso", result.message || "Nao foi possivel enviar.", "err");
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  });

  host.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Chat da staff" }),
            el("p", {
              text: "Visivel apenas para quem tem permissao de leitura. Guardado na base de dados, sobrevive a restart.",
            }),
          ]),
          can("chat.clear")
            ? el("button", {
                class: "btn small danger",
                text: "Limpar",
                onclick: function () {
                  openModal({
                    title: "Limpar o chat da staff",
                    danger: true,
                    confirmText: "Limpar",
                    subtitle:
                      "Apaga todas as mensagens, para todos. Nao se desfaz.",
                    onConfirm: async function () {
                      await run("chat.clear", {});
                      setTab("registos");
                    },
                  });
                },
              })
            : null,
        ]),
        list,
        can("chat.send")
          ? el("div", { class: "chat-send" }, [
              input,
              el("button", {
                class: "btn primary",
                text: "Enviar",
                onclick: send,
              }),
            ])
          : el("p", {
              class: "muted",
              text: "Voce pode ler, mas nao escrever neste chat.",
            }),
      ]),
    ]),
  );

  list.scrollTop = list.scrollHeight;
}

/* --------------------------------------------------------------------------------------------
   ABA: FERRAMENTAS
-------------------------------------------------------------------------------------------- */
const TOOL_TOGGLES = [
  {
    key: "self.godmode",
    action: "self.godmode",
    icon: "heart",
    label: "Modo divindade",
    desc: "Voce deixa de receber dano de qualquer tipo.",
  },
  {
    key: "self.invisible",
    action: "self.invisible",
    icon: "eye",
    label: "Invisibilidade",
    desc: "O seu personagem deixa de ser desenhado. O blip e a voz continuam.",
  },
];

const DEV_TOGGLES = [
  {
    id: "vehicles",
    icon: "car",
    label: "Mostrar veiculos",
    desc: "Nome e hash por cima de cada veiculo num raio de 100 m.",
  },
  {
    id: "peds",
    icon: "users",
    label: "Mostrar peds",
    desc: "Hash por cima de cada ped num raio de 100 m.",
  },
  {
    id: "objects",
    icon: "box",
    label: "Mostrar objetos",
    desc: "Hash por cima de cada objeto num raio de 100 m.",
  },
  {
    id: "coords",
    icon: "pin",
    label: "Mostrar coordenadas",
    desc: "A sua posicao e heading, desenhados por cima de si.",
  },
];

RENDER.ferramentas = async function (view) {
  clear(view);

  const state = S.sel.tools || (S.sel.tools = {});
  const cards = [];

  function toggleCard(entry, active, onToggle) {
    return el(
      "button",
      {
        class: "action-card tool-card" + (active ? " on" : ""),
        onclick: async function () {
          await onToggle(!active);
          setTab("ferramentas");
        },
      },
      [
        el("div", { class: "top" }, [
          el("div", { class: "ic" }, [icon(entry.icon, 16)]),
          el("strong", { text: entry.label }),
          el("span", {
            class: "tag " + (active ? "ok" : ""),
            text: active ? "LIGADO" : "desligado",
          }),
        ]),
        el("p", { text: entry.desc }),
      ],
    );
  }

  const selfGrid = el("div", { class: "grid grid-2" });
  TOOL_TOGGLES.forEach(function (entry) {
    if (!can(entry.key)) return;
    selfGrid.appendChild(
      toggleCard(entry, state[entry.key] === true, async function (next) {
        state[entry.key] = next;
        await run(entry.action, { state: next }, true);
      }),
    );
  });

  const devGrid = el("div", { class: "grid grid-4" });
  DEV_TOGGLES.forEach(function (entry) {
    devGrid.appendChild(
      toggleCard(
        entry,
        state["dev." + entry.id] === true,
        async function (next) {
          state["dev." + entry.id] = next;
          await run("dev.toggle", { key: entry.id, state: next }, true);
        },
      ),
    );
  });

  const devActions = el("div", { class: "grid grid-4" });
  [
    {
      key: "dev.tools",
      icon: "target",
      label: "Info da entidade",
      desc: "Aponte a camara e clique: modelo, hash, tipo, coordenadas e net id.",
      run: async function () {
        const result = await run("dev.entityinfo", {}, true);
        if (!result.ok) {
          toast("Aviso", result.message || "Nenhuma entidade na mira.", "err");
          return;
        }
        showEntityInfo(result.data);
      },
    },
    {
      key: "dev.tools",
      icon: "eye",
      label: "Distancia de visao",
      desc: "Multiplicador do LOD. 1x e o padrao do jogo; acima disso custa FPS.",
      run: function () {
        openModal({
          title: "Distancia de visao",
          subtitle: "Entre 0.5 e 10. Acima de 3 pesa bastante.",
          fields: [
            { key: "value", label: "Multiplicador", type: "number", value: 1 },
          ],
          onConfirm: function (values) {
            return run("dev.viewdistance", { value: values.value });
          },
        });
      },
    },
    {
      key: "dev.delete",
      icon: "trash",
      label: "Apagar ped proximo",
      tone: "red",
      desc: "Remove o ped mais proximo. Nunca apaga o corpo de um jogador.",
      run: function () {
        run("dev.deleteclosest", { kind: "ped" });
      },
    },
    {
      key: "dev.delete",
      icon: "trash",
      label: "Apagar objeto proximo",
      tone: "red",
      desc: "Remove o objeto mais proximo num raio de 20 m.",
      run: function () {
        run("dev.deleteclosest", { kind: "object" });
      },
    },
  ].forEach(function (entry) {
    if (!can(entry.key)) return;
    devActions.appendChild(
      el(
        "button",
        { class: "action-card " + (entry.tone || ""), onclick: entry.run },
        [
          el("div", { class: "top" }, [
            el("div", { class: "ic" }, [icon(entry.icon, 16)]),
            el("strong", { text: entry.label }),
          ]),
          el("p", { text: entry.desc }),
        ],
      ),
    );
  });

  const vehGrid = el("div", { class: "grid grid-4" });
  VEHICLE_QUALITY.forEach(function (entry) {
    vehGrid.appendChild(
      el(
        "button",
        {
          class: "action-card",
          onclick: function () {
            run("vehicle.quality", { key: entry.id });
          },
        },
        [
          el("div", { class: "top" }, [
            el("div", { class: "ic" }, [icon(entry.icon, 16)]),
            el("strong", { text: entry.label }),
          ]),
          el("p", { text: entry.desc }),
        ],
      ),
    );
  });

  const stack = el("div", { class: "stack" });

  if (selfGrid.children.length) {
    stack.appendChild(
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Em voce" }),
            el("p", {
              text: "Sao reaplicados sozinhos enquanto estiverem ligados: o ped do jogador e trocado varias vezes nesta base e o efeito perder-se-ia.",
            }),
          ]),
        ]),
        selfGrid,
      ]),
    );
  }

  if (can("vehicle.quality")) {
    stack.appendChild(
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Veiculo atual ou o mais proximo" }),
            el("p", {
              text: "Alcance de 8 metros. Dentro do carro, age sobre o seu.",
            }),
          ]),
        ]),
        vehGrid,
      ]),
    );
  }

  if (can("dev.tools")) {
    stack.appendChild(
      el("div", { class: "card" }, [
        el("div", { class: "card-head" }, [
          el("div", {}, [
            el("h3", { text: "Opcoes de programador" }),
            el("p", {
              text: "Desenham por cima do jogo. Custam FPS enquanto estiverem ligadas -- desligue quando terminar.",
            }),
          ]),
        ]),
        devGrid,
        el("div", { style: { marginTop: "14px" } }, [devActions]),
      ]),
    );
  }

  if (!stack.children.length) {
    stack.appendChild(
      el("div", { class: "empty" }, [
        el("strong", { text: "Sem ferramentas disponiveis" }),
        el("span", { text: "O seu cargo nao tem nenhuma destas permissoes." }),
      ]),
    );
  }

  view.appendChild(stack);
};

const VEHICLE_QUALITY = [
  {
    id: "wash",
    icon: "check",
    label: "Lavar",
    desc: "Tira a sujidade e as decalcomanias.",
  },
  {
    id: "fuel",
    icon: "fire",
    label: "Encher o tanque",
    desc: "Enche e grava no statebag do ox_fuel, senao voltava ao valor antigo.",
  },
  {
    id: "lock",
    icon: "key",
    label: "Trancar",
    desc: "Tranca as portas para todos os jogadores.",
  },
  {
    id: "unlock",
    icon: "key",
    label: "Destrancar",
    desc: "Destranca as portas.",
  },
];

function showEntityInfo(data) {
  const rows = [
    ["Modelo", data.model],
    ["Hash", data.hash],
    ["Tipo", data.type],
    ["Coordenadas", data.coords],
    ["Heading", data.heading],
    ["Net ID", data.netId ? String(data.netId) : "-"],
    ["Rede", data.mine],
  ];

  openModal({
    title: "Entidade: " + data.model,
    subtitle: "Clique num valor para o selecionar e copiar.",
    confirmText: "Fechar",
    content: el(
      "div",
      { class: "kv-list" },
      rows.map(function (row) {
        return el("div", { class: "kv" }, [
          el("span", { text: row[0] }),
          // selectable: e para isto que a gente abre a janela -- copiar o hash ou as coords.
          el("strong", {
            class: "selectable",
            text: String(row[1]),
            onclick: function (event) {
              const range = document.createRange();
              range.selectNodeContents(event.currentTarget);
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            },
          }),
        ]);
      }),
    ),
  });
}

/* --------------------------------------------------------------------------------------------
   ABA: RESOURCES
-------------------------------------------------------------------------------------------- */
RENDER.resources = async function (view) {
  clear(view);

  const search = el("input", {
    type: "search",
    placeholder: "Buscar resource pelo nome...",
  });
  const list = el("div", { class: "res-list" });
  const head = el("div", { class: "card-head" });
  const topPager = el("div");
  let filter = "all";
  const filterButtons = [];

  let data = { resources: [], counts: {}, total: 0 };

  async function load() {
    data = (await getData("resources")) || {
      resources: [],
      counts: {},
      total: 0,
    };
    render();
  }

  function render() {
    clear(list);
    clear(head);
    clear(topPager);

    head.appendChild(
      el("div", {}, [
        el("h3", { text: data.total + " resources" }),
        el("p", {
          text:
            (data.counts.started || 0) +
            " a correr, " +
            (data.counts.stopped || 0) +
            " parados, " +
            (data.counts.other || 0) +
            " noutro estado.",
        }),
      ]),
    );

    const term = search.value.toLowerCase();
    const matches = (data.resources || []).filter(function (entry) {
      if (filter === "started" && entry.state !== "started") return false;
      if (filter === "stopped" && entry.state === "started") return false;
      return !term || entry.name.toLowerCase().includes(term);
    });

    const page = paginate(matches, "resources", render);
    topPager.appendChild(page.node);

    if (!page.slice.length) {
      list.appendChild(
        el("div", { class: "empty" }, [
          el("strong", { text: "Nenhum resource encontrado" }),
        ]),
      );
      return;
    }

    page.slice.forEach(function (entry) {
      const running = entry.state === "started";

      const motivo =
        "Protegido: parar isto derruba o servidor ou prende a NUI. Use a consola.";

      list.appendChild(
        el("div", { class: "res-row" + (entry.protected ? " guarded" : "") }, [
          el("span", { class: "res-dot " + (running ? "on" : "off") }),
          el("div", { class: "res-name" }, [
            el("strong", { text: entry.name }),
            el("span", {
              text: entry.state + (entry.version ? " - v" + entry.version : ""),
            }),
          ]),
          entry.protected
            ? el("span", {
                class: "tag warn",
                text: "PROTEGIDO",
                title: motivo,
              })
            : null,
          el("div", { class: "row" }, [
            running
              ? null
              : el("button", {
                  class: "btn small success",
                  text: "Iniciar",
                  onclick: function () {
                    control(entry.name, "start");
                  },
                }),
            running
              ? el("button", {
                  class: "btn small",
                  text: "Reiniciar",
                  disabled: entry.protected ? "disabled" : null,
                  title: entry.protected ? motivo : null,
                  onclick: function () {
                    if (!entry.protected) control(entry.name, "restart");
                  },
                })
              : null,
            running
              ? el("button", {
                  class: "btn small danger",
                  text: "Parar",
                  disabled: entry.protected ? "disabled" : null,
                  title: entry.protected ? motivo : null,
                  onclick: function () {
                    if (!entry.protected) confirmStop(entry);
                  },
                })
              : null,
          ]),
        ]),
      );
    });
  }

  async function control(name, mode) {
    await run("resource.control", { name: name, mode: mode });
    await load();
  }

  function confirmStop(entry) {
    openModal({
      title: "Parar " + entry.name,
      danger: true,
      confirmText: "Parar",
      subtitle:
        "Jogadores online perdem o que este recurso faz na hora. Se ele voltar a ligar sozinho, e o AdminControl -- ele religa recursos parados quando um admin cria item, loja ou garagem pelo /adm dele.",
      onConfirm: async function () {
        await control(entry.name, "stop");
      },
    });
  }

  function setFilter(next) {
    filter = next;
    filterButtons.forEach(function (b) {
      b.classList.toggle("active", b.dataset.filter === next);
    });
    resetPage("resources");
    render();
  }

  ["all", "started", "stopped"].forEach(function (id) {
    const label =
      id === "all" ? "Todos" : id === "started" ? "A correr" : "Parados";
    const button = el(
      "button",
      {
        class: "tab-btn" + (id === "all" ? " active" : ""),
        "data-filter": id,
        onclick: function () {
          setFilter(id);
        },
      },
      [el("span", { text: label })],
    );
    filterButtons.push(button);
  });

  search.addEventListener("input", function () {
    resetPage("resources");
    render();
  });

  view.appendChild(
    el("div", { class: "stack" }, [
      el("div", { class: "card" }, [
        head,
        el("div", { class: "search", style: { marginTop: "12px" } }, [search]),
        el(
          "div",
          { class: "row", style: { marginTop: "12px" } },
          filterButtons.concat([
            el("div", { class: "spacer" }),
            el("button", { class: "btn small", onclick: load }, [
              icon("refresh", 14),
              el("span", { text: "Atualizar" }),
            ]),
          ]),
        ),
        topPager,
      ]),
      list,
    ]),
  );

  load();
};

/* --------------------------------------------------------------------------------------------
   PRINT DA TELA DO JOGADOR
-------------------------------------------------------------------------------------------- */
function showScreenshot(data) {
  openModal({
    title: "Tela de " + data.name,
    subtitle:
      "Passaporte #" +
      data.passport +
      " - capturado em " +
      dateBR(data.at) +
      " as " +
      timeBR(data.at),
    confirmText: "Fechar",
    wide: true,
    content: el("div", { class: "shot-wrap" }, [
      el("img", { src: data.image, class: "shot-img" }),
    ]),
  });
}

/* --------------------------------------------------------------------------------------------
   VER TELA (PREVISUALIZACAO AO VIVO)
------------------------------------------------------------------------------------------- */
function isPreviewOpen() {
  return !$("preview").classList.contains("hidden");
}

function closePreview() {
  if (!isPreviewOpen()) return;
  $("preview").classList.add("hidden");
  $("previewFrame").src = "";
  $("previewEmpty").classList.remove("hidden");
  post("previewClose", {});
}

function openPreview(player) {
  $("previewTitle").textContent = player.name;
  $("previewSubtitle").textContent =
    "Passaporte #" + player.passport + " - ao vivo";
  $("previewFrame").src = "";
  $("previewEmpty").classList.remove("hidden");
  $("preview").classList.remove("hidden");
}

function startPreview(player) {
  return run("player.spectate", { passport: player.passport }).then(
    function (result) {
      if (result && result.ok) openPreview(player);
    },
  );
}

/* --------------------------------------------------------------------------------------------
   CHAMADOS - LADO DO JOGADOR
-------------------------------------------------------------------------------------------- */
let ticketType = null;

function renderTicketMenu(data) {
  const wrap = $("ticketTypes");
  clear(wrap);

  data.types.forEach(function (type) {
    wrap.appendChild(
      el(
        "button",
        {
          class: "ticket-type",
          onclick: function () {
            openTicketForm(type);
          },
        },
        [
          el("div", { class: "ic" }, [icon(type.icon, 16)]),
          el("strong", { text: type.label }),
          el("span", { text: "Solicitar atendimento" }),
        ],
      ),
    );
  });

  $("ticketHint").textContent = (data.key || "F5") + " abre e fecha esta tela.";
  $("ticketMenu").classList.remove("hidden");
}

function openTicketForm(type) {
  ticketType = type;
  $("ticketMenu").classList.add("hidden");
  $("ticketFormEyebrow").textContent = String(type.label).toUpperCase();
  $("ticketMessage").value = "";
  $("ticketForm").classList.remove("hidden");
  setTimeout(function () {
    $("ticketMessage").focus();
  }, 60);
}

function closeTicketUI() {
  $("ticketMenu").classList.add("hidden");
  $("ticketForm").classList.add("hidden");
  post("ticketMenuClose", {});
}

function addTicketPopup(ticket) {
  const wrap = $("ticketPopups");
  if (wrap.querySelector('[data-ticket="' + ticket.id + '"]')) return;

  const node = el("div", { class: "ticket-popup", "data-ticket": ticket.id }, [
    el("div", { class: "head" }, [
      el("div", { class: "ic" }, [icon(ticket.icon, 14)]),
      el("strong", { text: ticket.typeLabel }),
      el("span", { class: "id", text: "#" + ticket.id }),
    ]),
    el("div", {
      class: "who",
      html: ticket.name + "<span>ID #" + ticket.passport + "</span>",
    }),
    el("div", { class: "msg", text: ticket.message }),
    el("div", { class: "foot" }, [
      el("button", {
        class: "btn small primary",
        text: "Aceitar",
        onclick: async function () {
          await post("ticketAction", { key: "ticket.accept", id: ticket.id });
          node.remove();
        },
      }),
      el("button", {
        class: "btn small ghost",
        text: "Fechar",
        onclick: async function () {
          await post("ticketDismiss", { id: ticket.id });
          node.remove();
        },
      }),
    ]),
    el("div", {
      class: "hint",
      text: "Pressione " + (ticket.key || "F12") + " para liberar o mouse",
    }),
  ]);

  wrap.appendChild(node);
}

function openRating(data) {
  $("ratingStaff").textContent =
    "Atendido por " + data.staff + " - " + data.type;
  $("ratingComment").value = "";

  let value = 5;
  const wrap = $("ratingStars");
  clear(wrap);

  function paint() {
    wrap.querySelectorAll(".star").forEach(function (node, index) {
      node.classList.toggle("on", index < value);
    });
  }

  for (let i = 1; i <= 5; i++) {
    const star = el("span", {
      class: "star",
      html: "&#9733;",
      onclick: function () {
        value = i;
        paint();
      },
    });
    wrap.appendChild(star);
  }
  paint();

  $("ratingSend").onclick = async function () {
    await post("ticketRate", {
      id: data.id,
      rating: value,
      comment: $("ratingComment").value,
    });
    $("ticketRating").classList.add("hidden");
  };

  $("ratingSkip").onclick = async function () {
    await post("ticketRatingClose", {});
    $("ticketRating").classList.add("hidden");
  };

  $("ticketRating").classList.remove("hidden");
}

/* --------------------------------------------------------------------------------------------
   CASTIGO
-------------------------------------------------------------------------------------------- */
let punishTimer = null;

function startPunish(seconds, reason) {
  $("punishReason").textContent = reason || "Sem motivo informado.";
  $("punish").classList.remove("hidden");

  let left = seconds;
  function tick() {
    if (left <= 0) {
      stopPunish();
      return;
    }
    const minutes = Math.floor(left / 60);
    const rest = left % 60;
    $("punishTimer").textContent = pad(minutes) + ":" + pad(rest);
    left--;
  }

  tick();
  clearInterval(punishTimer);
  punishTimer = setInterval(tick, 1000);
}

function stopPunish() {
  clearInterval(punishTimer);
  punishTimer = null;
  $("punish").classList.add("hidden");
}

/* --------------------------------------------------------------------------------------------
   BOOT
-------------------------------------------------------------------------------------------- */
window.addEventListener("message", function (event) {
  const message = event.data || {};

  if (message.action === "open") {
    S.data = message.data;
    S.perms = message.data.permissions || {};
    S.remoteImages = message.data.images || "";
    S.open = true;

    $("brandTitle").textContent = message.data.brand.Title;
    $("brandVersion").textContent = message.data.brand.Version;
    $("brandLogo").textContent = message.data.brand.Short;
    $("staffName").textContent = message.data.staff.name;
    $("staffMeta").textContent =
      message.data.role.label + " - ID #" + message.data.staff.passport;
    $("staffAvatar").textContent = message.data.staff.initials;
    $("onlineCount").textContent = message.data.online;

    $("panel").classList.remove("hidden");

    const firstAllowed = message.data.tabs.find(function (tab) {
      return S.perms["tab." + tab.id];
    });
    setTab(firstAllowed ? firstAllowed.id : message.data.tabs[0].id);
    return;
  }

  if (message.action === "close") {
    S.open = false;
    stopTimers();
    closeModal();
    $("panel").classList.add("hidden");
    if (isPreviewOpen()) {
      $("preview").classList.add("hidden");
      $("previewFrame").src = "";
      $("previewEmpty").classList.remove("hidden");
    }
    return;
  }

  // O print chega quando chegar -- o jogador pode demorar a responder, ou nem responder. Por
  // isso abre sozinho em vez de ficar a bloquear a acao a espera.
  if (message.action === "screenshot") {
    showScreenshot(message.data);
    return;
  }

  if (message.action === "previewFrame") {
    if (!isPreviewOpen()) return;
    $("previewFrame").src = message.data;
    $("previewEmpty").classList.add("hidden");
    return;
  }

  if (message.action === "previewClose") {
    closePreview();
    return;
  }

  if (message.action === "chat") {
    // Se a aba do chat estiver aberta, anexa em direto; caso contrario avisa, porque o
    // proximo carregamento da aba ja traz a mensagem pelo historico.
    if (chatBox && chatBox.append && document.body.contains(chatBox.list)) {
      chatBox.append(message.data);
    } else if (
      Number(message.data.staff_id) !==
      Number(S.data && S.data.staff && S.data.staff.passport)
    ) {
      toast(
        "Chat da staff",
        message.data.staff_name + ": " + message.data.message,
        "ok",
      );
    }
    return;
  }

  if (message.action === "chatCleared") {
    if (S.tab === "registos") setTab("registos");
    return;
  }

  if (message.action === "captureProgress") {
    if (message.data && message.data.running) paintCapture(message.data);
    else if (captureHost && document.body.contains(captureHost))
      renderCapture(captureHost);
    return;
  }

  if (message.action === "ticketMenu") {
    renderTicketMenu(message.data);
    return;
  }
  if (message.action === "ticketMenuClose") {
    $("ticketMenu").classList.add("hidden");
    $("ticketForm").classList.add("hidden");
    return;
  }
  if (message.action === "ticketPopup") {
    addTicketPopup(message.data);
    return;
  }
  if (message.action === "ticketPopupFocus") {
    $("ticketPopups").classList.toggle("focused", message.state === true);
    return;
  }
  if (message.action === "ticketPopupRemove") {
    const node = $("ticketPopups").querySelector(
      '[data-ticket="' + message.id + '"]',
    );
    if (node) node.remove();
    return;
  }
  if (message.action === "ticketRating") {
    openRating(message.data);
    return;
  }
  if (message.action === "punish") {
    if (message.state) startPunish(message.seconds || 0, message.reason);
    else stopPunish();
    return;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  $("btnClose").addEventListener("click", function () {
    post("close", {});
  });
  $("btnRefresh").addEventListener("click", function () {
    renderTab();
  });

  $("modalClose").addEventListener("click", closeModal);
  $("modalCancel").addEventListener("click", closeModal);
  $("modalConfirm").addEventListener("click", async function () {
    const handler = modalHandler;
    if (!handler) {
      closeModal();
      return;
    }
    if (modalBusy) return;

    const values = modalValues();
    let result;

    setModalBusy(true);
    try {
      result = await handler(values);
    } finally {
      setModalBusy(false);
    }

    if (result && result.ok === false) return;

    // Guardar antes de fechar: o closeModal limpa a fila.
    const depois = modalDepois;
    closeModal();
    if (depois) depois();
  });

  $("ticketMenuClose").addEventListener("click", closeTicketUI);
  $("ticketFormClose").addEventListener("click", closeTicketUI);
  $("ticketFormCancel").addEventListener("click", closeTicketUI);
  $("ticketFormSend").addEventListener("click", async function () {
    const message = $("ticketMessage").value;
    if (!message.trim()) return;
    await post("ticketCreate", {
      type: ticketType ? ticketType.id : "staff",
      message: message,
    });
    $("ticketForm").classList.add("hidden");
  });

  $("previewCloseBtn").addEventListener("click", closePreview);

  // Janela de previsualizacao arrastavel pelo header
  const previewWin = $("preview");
  const previewHead = previewWin.querySelector(".preview-head");
  let drag = null;

  previewHead.addEventListener("mousedown", function (event) {
    if (event.button !== 0) return;
    if (event.target.closest("button")) return;
    const rect = previewWin.getBoundingClientRect();
    drag = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
    event.preventDefault();
  });

  document.addEventListener("mousemove", function (event) {
    if (!drag) return;
    const rect = previewWin.getBoundingClientRect();
    previewWin.style.left =
      Math.max(
        8,
        Math.min(event.clientX - drag.dx, window.innerWidth - rect.width - 8),
      ) + "px";
    previewWin.style.top =
      Math.max(
        8,
        Math.min(event.clientY - drag.dy, window.innerHeight - rect.height - 8),
      ) + "px";
    previewWin.style.right = "auto";
    previewWin.style.bottom = "auto";
  });

  document.addEventListener("mouseup", function () {
    drag = null;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!$("modal").classList.contains("hidden")) {
      closeModal();
      return;
    }
    if (
      !$("ticketForm").classList.contains("hidden") ||
      !$("ticketMenu").classList.contains("hidden")
    ) {
      closeTicketUI();
      return;
    }
    if (isPreviewOpen()) {
      closePreview();
      return;
    }
    if (S.open) post("close", {});
  });

  async function applyTheme() {
    const data = await post("Theme", {}, "vrp");
    if (!data || !data.main) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", data.main);
    root.style.setProperty("--accent-soft", data.main + "22");
    root.style.setProperty("--accent-line", data.main + "55");
  }
  applyTheme();
});
