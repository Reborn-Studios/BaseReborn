(function (_0x32844d, _0x4331fb) {
  const _0x33acea = _0x5ee5,
    _0x2208c2 = _0x32844d();
  while (!![]) {
    try {
      const _0x4a445c =
        parseInt(_0x33acea(0x17a)) / 0x1 +
        -parseInt(_0x33acea(0x16e)) / 0x2 +
        (parseInt(_0x33acea(0x16f)) / 0x3) *
          (-parseInt(_0x33acea(0x171)) / 0x4) +
        (parseInt(_0x33acea(0x146)) / 0x5) *
          (-parseInt(_0x33acea(0x172)) / 0x6) +
        parseInt(_0x33acea(0x17b)) / 0x7 +
        (-parseInt(_0x33acea(0x14c)) / 0x8) *
          (parseInt(_0x33acea(0x150)) / 0x9) +
        parseInt(_0x33acea(0x145)) / 0xa;
      if (_0x4a445c === _0x4331fb) break;
      else _0x2208c2["push"](_0x2208c2["shift"]());
    } catch (_0x53161e) {
      _0x2208c2["push"](_0x2208c2["shift"]());
    }
  }
})(_0x50cb, 0x1acfd);
let drugs = {},
  selectedDrug = null,
  imageDirect = "https://api.rebornsystem.com.br/imagens";
window["addEventListener"]("message", function (_0x24f01a) {
  const _0x3c977e = _0x5ee5,
    _0x54feaa = _0x24f01a[_0x3c977e(0x16d)];
  if (_0x54feaa["status"] === _0x3c977e(0x176))
    $("#npcTalk")["html"](_0x54feaa[_0x3c977e(0x174)]),
      $(_0x3c977e(0x175))[_0x3c977e(0x153)](""),
      $("#npcSellMenu")[_0x3c977e(0x158)](0x1f4);
  else {
    if (_0x54feaa["status"] === _0x3c977e(0x162))
      $(_0x3c977e(0x14e))["fadeIn"](0x1f4);
    else {
      if (_0x54feaa["status"] === _0x3c977e(0x160))
        (drugs = _0x54feaa["drugs"]), updateDrugsTable();
      else {
        if (_0x54feaa["status"] === _0x3c977e(0x15c))
          updateBuyTable(_0x54feaa[_0x3c977e(0x159)]),
            $(_0x3c977e(0x16b))[_0x3c977e(0x158)](0x1f4);
        else {
          if (_0x54feaa["status"] === _0x3c977e(0x14f))
            $(_0x3c977e(0x16b))[_0x3c977e(0x167)](0x1f4);
          else {
            if (_0x54feaa[_0x3c977e(0x170)] === "hideNpcMenu") closeNpcMenu();
            else {
              if (_0x54feaa[_0x3c977e(0x170)] === _0x3c977e(0x178))
                closeTableMenu();
              else
                _0x54feaa[_0x3c977e(0x170)] === _0x3c977e(0x165) &&
                  _0x54feaa[_0x3c977e(0x15f)] &&
                  (imageDirect = _0x54feaa[_0x3c977e(0x15f)]);
            }
          }
        }
      }
    }
  }
  document[_0x3c977e(0x161)] = function (_0x479067) {
    const _0x11797d = _0x3c977e;
    _0x479067[_0x11797d(0x164)] == 0x1b && closeTableMenu();
  };
});
function addToTable() {
  const _0x41a5af = _0x5ee5;
  if (!selectedDrug) {
    $(_0x41a5af(0x143))["fadeIn"](0x1f4),
      $(_0x41a5af(0x143))["html"](_0x41a5af(0x157)),
      setTimeout(() => {
        const _0x5c1d38 = _0x41a5af;
        $(_0x5c1d38(0x143))[_0x5c1d38(0x167)](0x1f4);
      }, 0xbb8);
    return;
  }
  const _0x322cfa = $(_0x41a5af(0x15d))[_0x41a5af(0x153)]();
  if (_0x322cfa <= 0x0 || _0x322cfa > drugs[selectedDrug][_0x41a5af(0x15a)]) {
    $("#invalidMessage")[_0x41a5af(0x158)](0x1f4),
      $(_0x41a5af(0x143))["html"]("Insira\x20uma\x20quantidade\x20válida!"),
      setTimeout(() => {
        const _0x24a41d = _0x41a5af;
        $(_0x24a41d(0x143))[_0x24a41d(0x167)](0x1f4);
      }, 0xbb8);
    return;
  }
  $[_0x41a5af(0x166)](
    "http://will_drugsales/addDrugToTable",
    JSON[_0x41a5af(0x15b)]({ item: selectedDrug, amount: _0x322cfa })
  );
}
function remFromTable() {
  const _0x327e04 = _0x5ee5;
  if (!selectedDrug) {
    $("#invalidMessage")["fadeIn"](0x1f4),
      $(_0x327e04(0x143))["html"](_0x327e04(0x157)),
      setTimeout(() => {
        const _0x357eaf = _0x327e04;
        $(_0x357eaf(0x143))[_0x357eaf(0x167)](0x1f4);
      }, 0xbb8);
    return;
  }
  const _0x2aef16 = $("#drugquantity")[_0x327e04(0x153)]();
  if (_0x2aef16 <= 0x0 || _0x2aef16 > drugs[selectedDrug][_0x327e04(0x16c)]) {
    $(_0x327e04(0x143))[_0x327e04(0x158)](0x1f4),
      $(_0x327e04(0x143))[_0x327e04(0x14a)](
        "Insira\x20uma\x20quantidade\x20válida!"
      ),
      setTimeout(() => {
        const _0x3db044 = _0x327e04;
        $("#invalidMessage")[_0x3db044(0x167)](0x1f4);
      }, 0xbb8);
    return;
  }
  $[_0x327e04(0x166)](
    _0x327e04(0x148),
    JSON["stringify"]({ item: selectedDrug, amount: _0x2aef16 })
  );
}
function updateDrugsTable() {
  const _0x13f66c = _0x5ee5;
  $(_0x13f66c(0x141))["html"]("");
  for (const [_0x3eccc3, _0x133077] of Object["entries"](drugs)) {
    $(_0x13f66c(0x141))[_0x13f66c(0x147)](
      _0x13f66c(0x163) +
        _0x3eccc3 +
        _0x13f66c(0x179) +
        (selectedDrug === _0x3eccc3 ? _0x13f66c(0x151) : "") +
        _0x13f66c(0x14b) +
        imageDirect +
        "/" +
        _0x3eccc3 +
        _0x13f66c(0x152) +
        _0x3eccc3 +
        _0x13f66c(0x144) +
        (_0x133077[_0x13f66c(0x155)] || _0x3eccc3) +
        "</h2>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-sm\x22>Mesa:\x20<span\x20class=\x22text-blue-400\x22>" +
        _0x133077["table"] +
        "</span></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-sm\x22>Inventario:\x20<span\x20class=\x22text-blue-400\x22>" +
        _0x133077[_0x13f66c(0x15a)] +
        _0x13f66c(0x156)
    );
  }
}
function updateBuyTable(_0x5c1adb) {
  const _0x1e07af = _0x5ee5;
  $(_0x1e07af(0x15e))[_0x1e07af(0x14a)]("");
  for (const [_0x4ba026, _0x48eef0] of Object[_0x1e07af(0x168)](_0x5c1adb)) {
    $(_0x1e07af(0x15e))[_0x1e07af(0x147)](
      "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20border\x20border-zinc-500\x20transition-all\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20src=\x22" +
        imageDirect +
        "/" +
        _0x4ba026 +
        _0x1e07af(0x152) +
        _0x4ba026 +
        _0x1e07af(0x169) +
        (_0x48eef0[_0x1e07af(0x155)] || _0x4ba026) +
        "</h2>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22w-[9vw]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for=\x22quantity\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22text-sm\x20font-medium\x20leading-6\x20text-zinc-300\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20>Quantidade</label\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-1\x20items-center\x20rounded-md\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20type=\x22text\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20name=\x22quantity\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20id=\x22drugBuyQuantity-" +
        _0x4ba026 +
        "\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22rounded-md\x20w-1/3\x20border-0\x20py-1\x20pl-2\x20text-zinc-900\x20placeholder:text-zinc-400\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20placeholder=\x220\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>/" +
        _0x48eef0[_0x1e07af(0x16a)] +
        _0x1e07af(0x173) +
        _0x4ba026 +
        _0x1e07af(0x149) +
        _0x48eef0[_0x1e07af(0x142)] +
        "</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20"
    );
  }
}
function _0x50cb() {
  const _0x24fea7 = [
    "price",
    "#invalidMessage",
    "\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22w-[5vw]\x20bg-zinc-900\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22mx-2\x20text-zinc-400\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h2\x20class=\x22font-semibold\x20text-lg\x22>",
    "5525780SszeRC",
    "245GdDNsJ",
    "append",
    "http://will_drugsales/remDrugFromTable",
    "\x27)\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22bg-green-600\x20hover:bg-green-700\x20p-1\x20rounded\x20text-zinc-300\x20my-2\x20font-semibold\x20w-1/2\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Comprar\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-lg\x22>R$",
    "html",
    "\x20hover:cursor-pointer\x20transition-all\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20src=\x22",
    "1928NoRfwf",
    "http://will_drugsales/tryBuyProduct",
    "#tableDrugsMenu",
    "closeTableProducts",
    "7893IiMODV",
    "bg-zinc-900",
    ".png\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20alt=\x22",
    "val",
    "http://will_drugsales/sellToNpc",
    "name",
    "</span></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20",
    "Selecione\x20uma\x20droga!",
    "fadeIn",
    "products",
    "inv",
    "stringify",
    "openTableProducts",
    "#drugquantity",
    "#tableItems",
    "direct",
    "updateTableDrugsMenu",
    "onkeyup",
    "tableDrugsMenu",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20onclick=\x22selectDrug(\x27",
    "which",
    "setImageDirect",
    "post",
    "fadeOut",
    "entries",
    "\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22w-[5vw]\x20bg-zinc-900\x20object-contain\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22m-2\x20text-zinc-400\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h2\x20class=\x22font-semibold\x20text-lg\x20w-fit\x22>",
    "amount",
    "#buyProductsTable",
    "table",
    "data",
    "404386BwIsRY",
    "2433rsGNEh",
    "status",
    "116Nhstln",
    "7818pZlrUK",
    "</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20items-center\x20justify-between\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20onclick=\x22buyProduct(\x27",
    "description",
    "#drugprice",
    "sellNpcMenu",
    "http://will_drugsales/focusOff",
    "hideTableMenu",
    "\x27)\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20class=\x22flex\x20border\x20hover:bg-zinc-900\x20",
    "15066qeNCTd",
    "301651aFjrwv",
    "#tableSellItems",
  ];
  _0x50cb = function () {
    return _0x24fea7;
  };
  return _0x50cb();
}
function selectDrug(_0x53d07b) {
  (selectedDrug = _0x53d07b), updateDrugsTable();
}
function trySellDrug() {
  const _0x584ab3 = _0x5ee5,
    _0x53b065 = $(_0x584ab3(0x175))[_0x584ab3(0x153)]();
  $[_0x584ab3(0x166)](
    _0x584ab3(0x154),
    JSON[_0x584ab3(0x15b)]({ price: _0x53b065 })
  ),
    closeNpcMenu();
}
function buyProduct(_0x1b8e5a) {
  const _0x301740 = _0x5ee5,
    _0x4bbcfc = $("#drugBuyQuantity-" + _0x1b8e5a)[_0x301740(0x153)]();
  $[_0x301740(0x166)](
    _0x301740(0x14d),
    JSON[_0x301740(0x15b)]({ drug: _0x1b8e5a, quantity: _0x4bbcfc })
  );
}
function _0x5ee5(_0x3a504a, _0x2f8a26) {
  const _0x50cb5e = _0x50cb();
  return (
    (_0x5ee5 = function (_0x5ee59a, _0x3b248d) {
      _0x5ee59a = _0x5ee59a - 0x141;
      let _0x4e6540 = _0x50cb5e[_0x5ee59a];
      return _0x4e6540;
    }),
    _0x5ee5(_0x3a504a, _0x2f8a26)
  );
}
function closeNpcMenu() {
  const _0x4bed02 = _0x5ee5;
  $("#npcSellMenu")[_0x4bed02(0x167)](0x1f4),
    $[_0x4bed02(0x166)](_0x4bed02(0x177));
}
function closeTableMenu() {
  const _0x551001 = _0x5ee5;
  $(_0x551001(0x14e))[_0x551001(0x167)](0x1f4),
    $(_0x551001(0x16b))[_0x551001(0x167)](0x1f4),
    $[_0x551001(0x166)](_0x551001(0x177));
}
