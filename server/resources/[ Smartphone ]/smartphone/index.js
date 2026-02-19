var Zr,
  Qr,
  ei,
  ti,
  bi,
  gi,
  MO,
  e,
  t,
  n = Object.prototype.hasOwnProperty,
  l = Object.getOwnPropertySymbols,
  a = Object.prototype.propertyIsEnumerable,
  s = Object.assign,
  o = (e$, e0) => {
    var e8 = {};
    for (var e2 in e$)
      n.call(e$, e2) && 0 > e0.indexOf(e2) && (e8[e2] = e$[e2]);
    if (null != e$ && l)
      for (var e2 of l(e$))
        0 > e0.indexOf(e2) && a.call(e$, e2) && (e8[e2] = e$[e2]);
    return e8;
  };

function r(e$, e0) {
  let e8 = Object.create(null),
    e2 = e$.split(",");
  for (let e3 = 0; e3 < e2.length; e3++) e8[e2[e3]] = !0;
  return e0 ? (e$) => !!e8[e$.toLowerCase()] : (e$) => !!e8[e$];
}
!(function (e$ = ".", e0 = "__import__") {
  try {
    self[e0] = Function("u", "return import(u)");
  } catch (e8) {
    let e2 = new URL(e$, location),
      e3 = (e$) => {
        (URL.revokeObjectURL(e$.src), e$.remove());
      };
    ((self[e0] = (e$) =>
      new Promise((e8, e1) => {
        let e6 = new URL(e$, e2);
        if (self[e0].moduleMap[e6]) return e8(self[e0].moduleMap[e6]);
        let e4 = new Blob(
            [`import * as m from '${e6}';`, `${e0}.moduleMap['${e6}']=m;`],
            {
              type: "text/javascript",
            },
          ),
          e7 = Object.assign(document.createElement("script"), {
            type: "module",
            src: URL.createObjectURL(e4),
            onerror() {
              (e1(Error(`Failed to import: ${e$}`)), e3(e7));
            },
            onload() {
              (e8(self[e0].moduleMap[e6]), e3(e7));
            },
          });
        document.head.appendChild(e7);
      })),
      (self[e0].moduleMap = {}));
  }
})("/dist/");
const i = r(
    "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt",
  ),
  c = r(
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  );

function u(e$) {
  if (P(e$)) {
    let e0 = {};
    for (let e8 = 0; e8 < e$.length; e8++) {
      let e2 = e$[e8],
        e3 = u(V(e2) ? f(e2) : e2);
      if (e3) for (let e1 in e3) e0[e1] = e3[e1];
    }
    return e0;
  }
  if (N(e$)) return e$;
}
const d = /;(?![^(]*\))/g,
  p = /:(.+)/;

function f(e$) {
  let e0 = {};
  return (
    e$.split(d).forEach((e$) => {
      if (e$) {
        let e8 = e$.split(p);
        e8.length > 1 && (e0[e8[0].trim()] = e8[1].trim());
      }
    }),
    e0
  );
}

function m(e$) {
  let e0 = "";
  if (V(e$)) e0 = e$;
  else if (P(e$))
    for (let e8 = 0; e8 < e$.length; e8++) {
      let e2 = m(e$[e8]);
      e2 && (e0 += e2 + " ");
    }
  else if (N(e$)) for (let e3 in e$) e$[e3] && (e0 += e3 + " ");
  return e0.trim();
}

function h(e$, e0) {
  if (e$ === e0) return !0;
  let e8 = O(e$),
    e2 = O(e0);
  if (e8 || e2) return !(!e8 || !e2) && e$.getTime() === e0.getTime();
  if (((e8 = P(e$)), (e2 = P(e0)), e8 || e2))
    return (
      !(!e8 || !e2) &&
      (function (e$, e0) {
        if (e$.length !== e0.length) return !1;
        let e8 = !0;
        for (let e2 = 0; e8 && e2 < e$.length; e2++) e8 = h(e$[e2], e0[e2]);
        return e8;
      })(e$, e0)
    );
  if (((e8 = N(e$)), (e2 = N(e0)), e8 || e2)) {
    if (!e8 || !e2 || Object.keys(e$).length !== Object.keys(e0).length)
      return !1;
    for (let e3 in e$) {
      let e1 = e$.hasOwnProperty(e3),
        e6 = e0.hasOwnProperty(e3);
      if ((e1 && !e6) || (!e1 && e6) || !h(e$[e3], e0[e3])) return !1;
    }
  }
  return String(e$) === String(e0);
}

function b(e$, e0) {
  return e$.findIndex((e$) => h(e$, e0));
}
const g = (e$) =>
    null == e$ ? "" : N(e$) ? JSON.stringify(e$, v, 2) : String(e$),
  v = (e$, e0) =>
    L(e0)
      ? {
          [`Map(${e0.size})`]: [...e0.entries()].reduce(
            (e$, [e0, e8]) => ((e$[`${e0} =>`] = e8), e$),
            {},
          ),
        }
      : I(e0)
        ? {
            [`Set(${e0.size})`]: [...e0.values()],
          }
        : !N(e0) || P(e0) || F(e0)
          ? e0
          : String(e0),
  x = {},
  y = [],
  k = () => {},
  w = () => !1,
  C = /^on[^a-z]/,
  _ = (e$) => C.test(e$),
  A = (e$) => e$.startsWith("onUpdate:"),
  S = Object.assign,
  T = (e$, e0) => {
    let e8 = e$.indexOf(e0);
    e8 > -1 && e$.splice(e8, 1);
  },
  E = Object.prototype.hasOwnProperty,
  R = (e$, e0) => E.call(e$, e0),
  P = Array.isArray,
  L = (e$) => "[object Map]" === j(e$),
  I = (e$) => "[object Set]" === j(e$),
  O = (e$) => e$ instanceof Date,
  M = (e$) => "function" == typeof e$,
  V = (e$) => "string" == typeof e$,
  D = (e$) => "symbol" == typeof e$,
  N = (e$) => null !== e$ && "object" == typeof e$,
  U = (e$) => N(e$) && M(e$.then) && M(e$.catch),
  $ = Object.prototype.toString,
  j = (e$) => $.call(e$),
  F = (e$) => "[object Object]" === j(e$),
  z = (e$) =>
    V(e$) && "NaN" !== e$ && "-" !== e$[0] && "" + parseInt(e$, 10) === e$,
  B = r(
    ",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  H = (e$) => {
    let e0 = Object.create(null);
    return (e8) => e0[e8] || (e0[e8] = e$(e8));
  },
  q = /-(\w)/g,
  G = H((e$) => e$.replace(q, (e$, e0) => (e0 ? e0.toUpperCase() : ""))),
  W = /\B([A-Z])/g,
  K = H((e$) => e$.replace(W, "-$1").toLowerCase()),
  J = H((e$) => e$.charAt(0).toUpperCase() + e$.slice(1)),
  X = H((e$) => (e$ ? `on${J(e$)}` : "")),
  Y = (e$, e0) => e$ !== e0 && (e$ == e$ || e0 == e0),
  Z = (e$, e0) => {
    for (let e8 = 0; e8 < e$.length; e8++) e$[e8](e0);
  },
  Q = (e$, e0, e8) => {
    Object.defineProperty(e$, e0, {
      configurable: !0,
      enumerable: !1,
      value: e8,
    });
  },
  ee = (e$) => {
    let e0 = parseFloat(e$);
    return isNaN(e0) ? e$ : e0;
  },
  te = new WeakMap(),
  ne = [];
let le;
const ae = Symbol(""),
  se = Symbol("");

function oe(e$, e0 = x) {
  var e8;
  (e8 = e$) && !0 === e8._isEffect && (e$ = e$.raw);
  let e2 = (function (e$, e0) {
    let e8 = function () {
      if (!e8.active) return e0.scheduler ? void 0 : e$();
      if (!ne.includes(e8)) {
        ce(e8);
        try {
          return (de.push(ue), (ue = !0), ne.push(e8), (le = e8), e$());
        } finally {
          (ne.pop(), fe(), (le = ne[ne.length - 1]));
        }
      }
    };
    return (
      (e8.id = ie++),
      (e8.allowRecurse = !!e0.allowRecurse),
      (e8._isEffect = !0),
      (e8.active = !0),
      (e8.raw = e$),
      (e8.deps = []),
      (e8.options = e0),
      e8
    );
  })(e$, e0);
  return (e0.lazy || e2(), e2);
}

function re(e$) {
  e$.active &&
    (ce(e$), e$.options.onStop && e$.options.onStop(), (e$.active = !1));
}
let ie = 0;

function ce(e$) {
  let { deps: e0 } = e$;
  if (e0.length) {
    for (let e8 = 0; e8 < e0.length; e8++) e0[e8].delete(e$);
    e0.length = 0;
  }
}
let ue = !0;
const de = [];

function pe() {
  (de.push(ue), (ue = !1));
}

function fe() {
  let e$ = de.pop();
  ue = void 0 === e$ || e$;
}

function me(e$, e0, e8) {
  if (!ue || void 0 === le) return;
  let e2 = te.get(e$);
  e2 || te.set(e$, (e2 = new Map()));
  let e3 = e2.get(e8);
  (e3 || e2.set(e8, (e3 = new Set())),
    e3.has(le) || (e3.add(le), le.deps.push(e3)));
}

function he(e$, e0, e8, e2, e3, e1) {
  let e6 = te.get(e$);
  if (!e6) return;
  let e4 = new Set(),
    e7 = (e$) => {
      e$ &&
        e$.forEach((e$) => {
          (e$ !== le || e$.allowRecurse) && e4.add(e$);
        });
    };
  if ("clear" === e0) e6.forEach(e7);
  else if ("length" === e8 && P(e$))
    e6.forEach((e$, e0) => {
      ("length" === e0 || e0 >= e2) && e7(e$);
    });
  else
    switch ((void 0 !== e8 && e7(e6.get(e8)), e0)) {
      case "add":
        P(e$)
          ? z(e8) && e7(e6.get("length"))
          : (e7(e6.get(ae)), L(e$) && e7(e6.get(se)));
        break;
      case "delete":
        P(e$) || (e7(e6.get(ae)), L(e$) && e7(e6.get(se)));
        break;
      case "set":
        L(e$) && e7(e6.get(ae));
    }
  e4.forEach((e$) => {
    e$.options.scheduler ? e$.options.scheduler(e$) : e$();
  });
}
const be = r("__proto__,__v_isRef,__isVue"),
  ge = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e$) => Symbol[e$])
      .filter(D),
  ),
  ve = Ce(),
  xe = Ce(!1, !0),
  ye = Ce(!0),
  ke = Ce(!0, !0),
  we = {};

function Ce(e$ = !1, e0 = !1) {
  return function (e8, e2, e3) {
    if ("__v_isReactive" === e2) return !e$;
    if ("__v_isReadonly" === e2) return e$;
    if ("__v_raw" === e2 && e3 === (e$ ? Xe : Je).get(e8)) return e8;
    let e1 = P(e8);
    if (!e$ && e1 && R(we, e2)) return Reflect.get(we, e2, e3);
    let e6 = Reflect.get(e8, e2, e3);
    return (D(e2) ? ge.has(e2) : be(e2)) || (e$ || me(e8, 0, e2), e0)
      ? e6
      : ot(e6)
        ? e1 && z(e2)
          ? e6
          : e6.value
        : N(e6)
          ? e$
            ? Qe(e6)
            : Ze(e6)
          : e6;
  };
}

function _e(e$ = !1) {
  return function (e0, e8, e2, e3) {
    let e1 = e0[e8];
    if (!e$ && ((e2 = at(e2)), !P(e0) && ot(e1) && !ot(e2)))
      return ((e1.value = e2), !0);
    let e6 = P(e0) && z(e8) ? Number(e8) < e0.length : R(e0, e8),
      e4 = Reflect.set(e0, e8, e2, e3);
    return (
      e0 === at(e3) &&
        (e6 ? Y(e2, e1) && he(e0, "set", e8, e2) : he(e0, "add", e8, e2)),
      e4
    );
  };
}
(["includes", "indexOf", "lastIndexOf"].forEach((e$) => {
  let e0 = Array.prototype[e$];
  we[e$] = function (...e$) {
    let e8 = at(this);
    for (let e2 = 0, e3 = this.length; e2 < e3; e2++) me(e8, 0, e2 + "");
    let e1 = e0.apply(e8, e$);
    return -1 === e1 || !1 === e1 ? e0.apply(e8, e$.map(at)) : e1;
  };
}),
  ["push", "pop", "shift", "unshift", "splice"].forEach((e$) => {
    let e0 = Array.prototype[e$];
    we[e$] = function (...e$) {
      pe();
      let e8 = e0.apply(this, e$);
      return (fe(), e8);
    };
  }));
const Ae = {
    get: ve,
    set: _e(),
    deleteProperty: function (e$, e0) {
      let e8 = R(e$, e0);
      e$[e0];
      let e2 = Reflect.deleteProperty(e$, e0);
      return (e2 && e8 && he(e$, "delete", e0, void 0), e2);
    },
    has: function (e$, e0) {
      let e8 = Reflect.has(e$, e0);
      return ((D(e0) && ge.has(e0)) || me(e$, 0, e0), e8);
    },
    ownKeys: function (e$) {
      return (me(e$, 0, P(e$) ? "length" : ae), Reflect.ownKeys(e$));
    },
  },
  Se = {
    get: ye,
    set: (e$, e0) => !0,
    deleteProperty: (e$, e0) => !0,
  },
  Te = S({}, Ae, {
    get: xe,
    set: _e(!0),
  });
S({}, Se, {
  get: ke,
});
const Ee = (e$) => (N(e$) ? Ze(e$) : e$),
  Re = (e$) => (N(e$) ? Qe(e$) : e$),
  Pe = (e$) => e$,
  Le = (e$) => Reflect.getPrototypeOf(e$);

function Ie(e$, e0, e8 = !1, e2 = !1) {
  let e3 = at((e$ = e$.__v_raw)),
    e1 = at(e0);
  (e0 === e1 || e8 || me(e3, 0, e0), e8 || me(e3, 0, e1));
  let { has: e6 } = Le(e3),
    e4 = e8 ? Re : e2 ? Pe : Ee;
  return e6.call(e3, e0)
    ? e4(e$.get(e0))
    : e6.call(e3, e1)
      ? e4(e$.get(e1))
      : void 0;
}

function Oe(e$, e0 = !1) {
  let e8 = this.__v_raw,
    e2 = at(e8),
    e3 = at(e$);
  return (
    e$ === e3 || e0 || me(e2, 0, e$),
    e0 || me(e2, 0, e3),
    e$ === e3 ? e8.has(e$) : e8.has(e$) || e8.has(e3)
  );
}

function Me(e$, e0 = !1) {
  return (
    (e$ = e$.__v_raw),
    e0 || me(at(e$), 0, ae),
    Reflect.get(e$, "size", e$)
  );
}

function Ve(e$) {
  e$ = at(e$);
  let e0 = at(this);
  return (Le(e0).has.call(e0, e$) || (e0.add(e$), he(e0, "add", e$, e$)), this);
}

function De(e$, e0) {
  e0 = at(e0);
  let e8 = at(this),
    { has: e2, get: e3 } = Le(e8),
    e1 = e2.call(e8, e$);
  e1 || ((e$ = at(e$)), (e1 = e2.call(e8, e$)));
  let e6 = e3.call(e8, e$);
  return (
    e8.set(e$, e0),
    e1 ? Y(e0, e6) && he(e8, "set", e$, e0) : he(e8, "add", e$, e0),
    this
  );
}

function Ne(e$) {
  let e0 = at(this),
    { has: e8, get: e2 } = Le(e0),
    e3 = e8.call(e0, e$);
  (e3 || ((e$ = at(e$)), (e3 = e8.call(e0, e$))), e2 && e2.call(e0, e$));
  let e1 = e0.delete(e$);
  return (e3 && he(e0, "delete", e$, void 0), e1);
}

function Ue() {
  let e$ = at(this),
    e0 = 0 !== e$.size,
    e8 = e$.clear();
  return (e0 && he(e$, "clear", void 0, void 0), e8);
}

function $e(e$, e0) {
  return function (e8, e2) {
    let e3 = this,
      e1 = e3.__v_raw,
      e6 = at(e1),
      e4 = e$ ? Re : e0 ? Pe : Ee;
    return (
      e$ || me(e6, 0, ae),
      e1.forEach((e$, e0) => e8.call(e2, e4(e$), e4(e0), e3))
    );
  };
}

function je(e$, e0, e8) {
  return function (...e2) {
    let e3 = this.__v_raw,
      e1 = at(e3),
      e6 = L(e1),
      e4 = "entries" === e$ || (e$ === Symbol.iterator && e6),
      e7 = e3[e$](...e2),
      e5 = e0 ? Re : e8 ? Pe : Ee;
    return (
      e0 || me(e1, 0, "keys" === e$ && e6 ? se : ae),
      {
        next() {
          let { value: e$, done: e0 } = e7.next();
          return e0
            ? {
                value: e$,
                done: e0,
              }
            : {
                value: e4 ? [e5(e$[0]), e5(e$[1])] : e5(e$),
                done: e0,
              };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}

function Fe(e$) {
  return function (...e0) {
    return "delete" !== e$ && this;
  };
}
const ze = {
    get(e$) {
      return Ie(this, e$);
    },
    get size() {
      return Me(this);
    },
    has: Oe,
    add: Ve,
    set: De,
    delete: Ne,
    clear: Ue,
    forEach: $e(!1, !1),
  },
  Be = {
    get(e$) {
      return Ie(this, e$, !1, !0);
    },
    get size() {
      return Me(this);
    },
    has: Oe,
    add: Ve,
    set: De,
    delete: Ne,
    clear: Ue,
    forEach: $e(!1, !0),
  },
  He = {
    get(e$) {
      return Ie(this, e$, !0);
    },
    get size() {
      return Me(this, !0);
    },
    has(e$) {
      return Oe.call(this, e$, !0);
    },
    add: Fe("add"),
    set: Fe("set"),
    delete: Fe("delete"),
    clear: Fe("clear"),
    forEach: $e(!0, !1),
  };

function qe(e$, e0) {
  let e8 = e0 ? Be : e$ ? He : ze;
  return (e0, e2, e3) =>
    "__v_isReactive" === e2
      ? !e$
      : "__v_isReadonly" === e2
        ? e$
        : "__v_raw" === e2
          ? e0
          : Reflect.get(R(e8, e2) && e2 in e0 ? e8 : e0, e2, e3);
}
["keys", "values", "entries", Symbol.iterator].forEach((e$) => {
  ((ze[e$] = je(e$, !1, !1)),
    (He[e$] = je(e$, !0, !1)),
    (Be[e$] = je(e$, !1, !0)));
});
const Ge = {
    get: qe(!1, !1),
  },
  We = {
    get: qe(!1, !0),
  },
  Ke = {
    get: qe(!0, !1),
  },
  Je = new WeakMap(),
  Xe = new WeakMap();

function Ye(e$) {
  var e0;
  return e$.__v_skip || !Object.isExtensible(e$)
    ? 0
    : (function (e$) {
        switch (e$) {
          case "Object":
          case "Array":
            return 1;
          case "Map":
          case "Set":
          case "WeakMap":
          case "WeakSet":
            return 2;
          default:
            return 0;
        }
      })(j(e$).slice(8, -1));
}

function Ze(e$) {
  return e$ && e$.__v_isReadonly ? e$ : et(e$, !1, Ae, Ge);
}

function Qe(e$) {
  return et(e$, !0, Se, Ke);
}

function et(e$, e0, e8, e2) {
  if (!N(e$) || (e$.__v_raw && (!e0 || !e$.__v_isReactive))) return e$;
  let e3 = e0 ? Xe : Je,
    e1 = e3.get(e$);
  if (e1) return e1;
  let e6 = Ye(e$);
  if (0 === e6) return e$;
  let e4 = new Proxy(e$, 2 === e6 ? e2 : e8);
  return (e3.set(e$, e4), e4);
}

function tt(e$) {
  return nt(e$) ? tt(e$.__v_raw) : !(!e$ || !e$.__v_isReactive);
}

function nt(e$) {
  return !(!e$ || !e$.__v_isReadonly);
}

function lt(e$) {
  return tt(e$) || nt(e$);
}

function at(e$) {
  return (e$ && at(e$.__v_raw)) || e$;
}
const st = (e$) => (N(e$) ? Ze(e$) : e$);

function ot(e$) {
  return Boolean(e$ && !0 === e$.__v_isRef);
}

function rt(e$) {
  return ct(e$);
}
class it {
  constructor(e$, e0 = !1) {
    ((this._rawValue = e$),
      (this._shallow = e0),
      (this.__v_isRef = !0),
      (this._value = e0 ? e$ : st(e$)));
  }
  get value() {
    return (me(at(this), 0, "value"), this._value);
  }
  set value(e$) {
    Y(at(e$), this._rawValue) &&
      ((this._rawValue = e$),
      (this._value = this._shallow ? e$ : st(e$)),
      he(at(this), "set", "value", e$));
  }
}

function ct(e$, e0 = !1) {
  return ot(e$) ? e$ : new it(e$, e0);
}

function ut(e$) {
  return ot(e$) ? e$.value : e$;
}
const dt = {
  get: (e$, e0, e8) => ut(Reflect.get(e$, e0, e8)),
  set(e$, e0, e8, e2) {
    let e3 = e$[e0];
    return ot(e3) && !ot(e8)
      ? ((e3.value = e8), !0)
      : Reflect.set(e$, e0, e8, e2);
  },
};

function pt(e$) {
  return tt(e$) ? e$ : new Proxy(e$, dt);
}
class ft {
  constructor(e$, e0) {
    ((this._object = e$), (this._key = e0), (this.__v_isRef = !0));
  }
  get value() {
    return this._object[this._key];
  }
  set value(e$) {
    this._object[this._key] = e$;
  }
}
class mt {
  constructor(e$, e0, e8) {
    ((this._setter = e0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = oe(e$, {
        lazy: !0,
        scheduler: () => {
          this._dirty || ((this._dirty = !0), he(at(this), "set", "value"));
        },
      })),
      (this.__v_isReadonly = e8));
  }
  get value() {
    return (
      this._dirty && ((this._value = this.effect()), (this._dirty = !1)),
      me(at(this), 0, "value"),
      this._value
    );
  }
  set value(e$) {
    this._setter(e$);
  }
}

function ht(e$, e0, e8, e2) {
  let e3;
  try {
    e3 = e2 ? e$(...e2) : e$();
  } catch (e1) {
    gt(e1, e0, e8);
  }
  return e3;
}

function bt(e$, e0, e8, e2) {
  if (M(e$)) {
    let e3 = ht(e$, e0, e8, e2);
    return (
      e3 &&
        U(e3) &&
        e3.catch((e$) => {
          gt(e$, e0, e8);
        }),
      e3
    );
  }
  let e1 = [];
  for (let e6 = 0; e6 < e$.length; e6++) e1.push(bt(e$[e6], e0, e8, e2));
  return e1;
}

function gt(e$, e0, e8, e2 = !0) {
  if ((e0 && e0.vnode, e0)) {
    let e3 = e0.parent,
      e1 = e0.proxy,
      e6 = e8;
    for (; e3; ) {
      let e4 = e3.ec;
      if (e4) {
        for (let e7 = 0; e7 < e4.length; e7++)
          if (!1 === e4[e7](e$, e1, e6)) return;
      }
      e3 = e3.parent;
    }
    let e5 = e0.appContext.config.errorHandler;
    if (e5) return void ht(e5, null, 10, [e$, e1, e6]);
  }
  !(function (e$, e0, e8, e2 = !0) {
    console.error(e$);
  })(e$, 0, 0, e2);
}
let vt = !1,
  xt = !1;
const yt = [];
let kt = 0;
const wt = [];
let Ct = null,
  _t = 0;
const At = [];
let St = null,
  Tt = 0;
const Et = Promise.resolve();
let Rt = null,
  Pt = null;

function Lt(e$) {
  let e0 = Rt || Et;
  return e$ ? e0.then(this ? e$.bind(this) : e$) : e0;
}

function It(e$) {
  if (
    !(
      (yt.length && yt.includes(e$, vt && e$.allowRecurse ? kt + 1 : kt)) ||
      e$ === Pt
    )
  ) {
    let e0 = (function (e$) {
      let e0 = kt + 1,
        e8 = yt.length,
        e2 = Nt(e$);
      for (; e0 < e8; ) {
        let e3 = (e0 + e8) >>> 1;
        Nt(yt[e3]) < e2 ? (e0 = e3 + 1) : (e8 = e3);
      }
      return e0;
    })(e$);
    (e0 > -1 ? yt.splice(e0, 0, e$) : yt.push(e$), Ot());
  }
}

function Ot() {
  vt || xt || ((xt = !0), (Rt = Et.then(Ut)));
}

function Mt(e$, e0, e8, e2) {
  (P(e$)
    ? e8.push(...e$)
    : (e0 && e0.includes(e$, e$.allowRecurse ? e2 + 1 : e2)) || e8.push(e$),
    Ot());
}

function Vt(e$, e0 = null) {
  if (wt.length) {
    for (
      Pt = e0, Ct = [...new Set(wt)], wt.length = 0, _t = 0;
      _t < Ct.length;
      _t++
    )
      Ct[_t]();
    ((Ct = null), (_t = 0), (Pt = null), Vt(e$, e0));
  }
}

function Dt(e$) {
  if (At.length) {
    let e0 = [...new Set(At)];
    if (((At.length = 0), St)) return void St.push(...e0);
    for (
      (St = e0).sort((e$, e0) => Nt(e$) - Nt(e0)), Tt = 0;
      Tt < St.length;
      Tt++
    )
      St[Tt]();
    ((St = null), (Tt = 0));
  }
}
const Nt = (e$) => (null == e$.id ? 1 / 0 : e$.id);

function Ut(e$) {
  ((xt = !1), (vt = !0), Vt(e$), yt.sort((e$, e0) => Nt(e$) - Nt(e0)));
  try {
    for (kt = 0; kt < yt.length; kt++) {
      let e0 = yt[kt];
      e0 && ht(e0, null, 14);
    }
  } finally {
    ((kt = 0),
      (yt.length = 0),
      Dt(),
      (vt = !1),
      (Rt = null),
      (yt.length || At.length) && Ut(e$));
  }
}

function $t(e$, e0, ...e8) {
  let e2 = e$.vnode.props || x,
    e3 = e8,
    e1 = e0.startsWith("update:"),
    e6 = e1 && e0.slice(7);
  if (e6 && e6 in e2) {
    let e4 = `${"modelValue" === e6 ? "model" : e6}Modifiers`,
      { number: e7, trim: e5 } = e2[e4] || x;
    e5 ? (e3 = e8.map((e$) => e$.trim())) : e7 && (e3 = e8.map(ee));
  }
  let eV = X(G(e0)),
    eN = e2[eV];
  (!eN && e1 && (eN = e2[(eV = X(K(e0)))]), eN && bt(eN, e$, 6, e3));
  let e9 = e2[eV + "Once"];
  if (e9) {
    if (e$.emitted) {
      if (e$.emitted[eV]) return;
    } else (e$.emitted = {})[eV] = !0;
    bt(e9, e$, 6, e3);
  }
}

function jt(e$, e0, e8 = !1) {
  if (!e0.deopt && void 0 !== e$.__emits) return e$.__emits;
  let e2 = e$.emits,
    e3 = {},
    e1 = !1;
  if (!M(e$)) {
    let e6 = (e$) => {
      ((e1 = !0), S(e3, jt(e$, e0, !0)));
    };
    (!e8 && e0.mixins.length && e0.mixins.forEach(e6),
      e$.extends && e6(e$.extends),
      e$.mixins && e$.mixins.forEach(e6));
  }
  return e2 || e1
    ? (P(e2) ? e2.forEach((e$) => (e3[e$] = null)) : S(e3, e2),
      (e$.__emits = e3))
    : (e$.__emits = null);
}

function Ft(e$, e0) {
  return (
    !(!e$ || !_(e0)) &&
    (R(
      e$,
      (e0 = e0.slice(2).replace(/Once$/, ""))[0].toLowerCase() + e0.slice(1),
    ) ||
      R(e$, K(e0)) ||
      R(e$, e0))
  );
}
let zt = null;

function Bt(e$) {
  zt = e$;
}

function Ht(e$) {
  let {
      type: e0,
      vnode: e8,
      proxy: e2,
      withProxy: e3,
      props: e1,
      propsOptions: [e6],
      slots: e4,
      attrs: e7,
      emit: e5,
      render: eV,
      renderCache: eN,
      data: e9,
      setupState: eU,
      ctx: ej,
    } = e$,
    eD;
  zt = e$;
  try {
    let ez;
    if (4 & e8.shapeFlag) {
      let eF = e3 || e2;
      ((eD = Vl(eV.call(eF, eF, eN, e1, eU, e9, ej))), (ez = e7));
    } else {
      let eB = e0;
      ((eD = Vl(
        eB(
          e1,
          eB.length > 1
            ? {
                attrs: e7,
                slots: e4,
                emit: e5,
              }
            : null,
        ),
      )),
        (ez = e0.props ? e7 : Gt(e7)));
    }
    let eH = eD;
    if (!1 !== e0.inheritAttrs && ez) {
      let eZ = Object.keys(ez),
        { shapeFlag: eG } = eH;
      eZ.length &&
        (1 & eG || 6 & eG) &&
        (e6 && eZ.some(A) && (ez = Wt(ez, e6)), (eH = Ll(eH, ez)));
    }
    (e8.dirs && (eH.dirs = eH.dirs ? eH.dirs.concat(e8.dirs) : e8.dirs),
      e8.transition && (eH.transition = e8.transition),
      (eD = eH));
  } catch (eq) {
    (gt(eq, e$, 1), (eD = Pl(vl)));
  }
  return ((zt = null), eD);
}

function qt(e$) {
  let e0;
  for (let e8 = 0; e8 < e$.length; e8++) {
    let e2 = e$[e8];
    if (!Al(e2)) return;
    if (e2.type !== vl || "v-if" === e2.children) {
      if (e0) return;
      e0 = e2;
    }
  }
  return e0;
}
const Gt = (e$) => {
    let e0;
    for (let e8 in e$)
      ("class" === e8 || "style" === e8 || _(e8)) &&
        ((e0 || (e0 = {}))[e8] = e$[e8]);
    return e0;
  },
  Wt = (e$, e0) => {
    let e8 = {};
    for (let e2 in e$) (A(e2) && e2.slice(9) in e0) || (e8[e2] = e$[e2]);
    return e8;
  };

function Kt(e$, e0, e8) {
  let e2 = Object.keys(e0);
  if (e2.length !== Object.keys(e$).length) return !0;
  for (let e3 = 0; e3 < e2.length; e3++) {
    let e1 = e2[e3];
    if (e0[e1] !== e$[e1] && !Ft(e8, e1)) return !0;
  }
  return !1;
}

function Jt(e$) {
  return (M(e$) && (e$ = e$()), P(e$) && (e$ = qt(e$)), Vl(e$));
}
let Xt = 0;
const Yt = (e$) => (Xt += e$);

function Zt(e$, e0, e8 = {}, e2) {
  let e3 = e$[e0];
  (Xt++, wl());
  let e1 = e3 && Qt(e3(e8)),
    e6 = _l(
      bl,
      {
        key: e8.key || `_${e0}`,
      },
      e1 || (e2 ? e2() : []),
      e1 && 1 === e$._ ? 64 : -2,
    );
  return (Xt--, e6);
}

function Qt(e$) {
  return e$.some(
    (e$) =>
      !Al(e$) || (e$.type !== vl && !(e$.type === bl && !Qt(e$.children))),
  )
    ? e$
    : null;
}

function en(e$, e0 = zt) {
  if (!e0) return e$;
  let e8 = (...e8) => {
    Xt || wl(!0);
    let e2 = zt;
    Bt(e0);
    let e3 = e$(...e8);
    return (Bt(e2), Xt || Cl(), e3);
  };
  return ((e8._c = !0), e8);
}
let tn = null;
const nn = [];

function ln(e$) {
  nn.push((tn = e$));
}

function an() {
  (nn.pop(), (tn = nn[nn.length - 1] || null));
}

function sn(e$) {
  return (e0) =>
    en(function () {
      ln(e$);
      let e8 = e0.apply(this, arguments);
      return (an(), e8);
    });
}

function on(e$, e0, e8, e2 = !1) {
  let e3 = {},
    e1 = {};
  (Q(e1, Tl, 1),
    rn(e$, e0, e3, e1),
    e8
      ? (e$.props = e2 ? e3 : et(e3, !1, Te, We))
      : e$.type.props
        ? (e$.props = e3)
        : (e$.props = e1),
    (e$.attrs = e1));
}

function rn(e$, e0, e8, e2) {
  let [e3, e1] = e$.propsOptions;
  if (e0)
    for (let e6 in e0) {
      let e4 = e0[e6];
      if (B(e6)) continue;
      let e7;
      e3 && R(e3, (e7 = G(e6)))
        ? (e8[e7] = e4)
        : Ft(e$.emitsOptions, e6) || (e2[e6] = e4);
    }
  if (e1) {
    let e5 = at(e8);
    for (let eV = 0; eV < e1.length; eV++) {
      let eN = e1[eV];
      e8[eN] = cn(e3, e5, eN, e5[eN], e$);
    }
  }
}

function cn(e$, e0, e8, e2, e3) {
  let e1 = e$[e8];
  if (null != e1) {
    let e6 = R(e1, "default");
    if (e6 && void 0 === e2) {
      let e4 = e1.default;
      e1.type !== Function && M(e4)
        ? (aa(e3), (e2 = e4(e0)), aa(null))
        : (e2 = e4);
    }
    e1[0] &&
      (R(e0, e8) || e6
        ? e1[1] && ("" === e2 || e2 === K(e8)) && (e2 = !0)
        : (e2 = !1));
  }
  return e2;
}

function un(e$, e0, e8 = !1) {
  if (!e0.deopt && e$.__props) return e$.__props;
  let e2 = e$.props,
    e3 = {},
    e1 = [],
    e6 = !1;
  if (!M(e$)) {
    let e4 = (e$) => {
      e6 = !0;
      let [e8, e2] = un(e$, e0, !0);
      (S(e3, e8), e2 && e1.push(...e2));
    };
    (!e8 && e0.mixins.length && e0.mixins.forEach(e4),
      e$.extends && e4(e$.extends),
      e$.mixins && e$.mixins.forEach(e4));
  }
  if (!e2 && !e6) return (e$.__props = y);
  if (P(e2))
    for (let e7 = 0; e7 < e2.length; e7++) {
      let e5 = G(e2[e7]);
      dn(e5) && (e3[e5] = x);
    }
  else if (e2)
    for (let eV in e2) {
      let eN = G(eV);
      if (dn(eN)) {
        let e9 = e2[eV],
          eU = (e3[eN] =
            P(e9) || M(e9)
              ? {
                  type: e9,
                }
              : e9);
        if (eU) {
          let ej = mn(Boolean, eU.type),
            eD = mn(String, eU.type);
          ((eU[0] = ej > -1),
            (eU[1] = eD < 0 || ej < eD),
            (ej > -1 || R(eU, "default")) && e1.push(eN));
        }
      }
    }
  return (e$.__props = [e3, e1]);
}

function dn(e$) {
  return "$" !== e$[0];
}

function pn(e$) {
  let e0 = e$ && e$.toString().match(/^\s*function (\w+)/);
  return e0 ? e0[1] : "";
}

function fn(e$, e0) {
  return pn(e$) === pn(e0);
}

function mn(e$, e0) {
  if (P(e0)) {
    for (let e8 = 0, e2 = e0.length; e8 < e2; e8++)
      if (fn(e0[e8], e$)) return e8;
  } else if (M(e0)) return fn(e0, e$) ? 0 : -1;
  return -1;
}

function hn(e$, e0, e8 = na, e2 = !1) {
  if (e8) {
    let e3 = e8[e$] || (e8[e$] = []),
      e1 =
        e0.__weh ||
        (e0.__weh = (...e2) => {
          if (e8.isUnmounted) return;
          (pe(), aa(e8));
          let e3 = bt(e0, e8, e$, e2);
          return (aa(null), fe(), e3);
        });
    return (e2 ? e3.unshift(e1) : e3.push(e1), e1);
  }
}
const bn =
    (e$) =>
    (e0, e8 = na) =>
      !oa && hn(e$, e0, e8),
  gn = bn("bm"),
  vn = bn("m"),
  xn = bn("bu"),
  yn = bn("u"),
  kn = bn("bum"),
  wn = bn("um"),
  Cn = bn("rtg"),
  _n = bn("rtc");

function An(e$, e0) {
  return En(e$, null, e0);
}
const Sn = {};

function Tn(e$, e0, e8) {
  return En(e$, e0, e8);
}

function En(
  e$,
  e0,
  { immediate: e8, deep: e2, flush: e3, onTrack: e1, onTrigger: e6 } = x,
  e4 = na,
) {
  let e7,
    e5,
    eV = !1;
  if (
    (ot(e$)
      ? ((e7 = () => e$.value), (eV = !!e$._shallow))
      : tt(e$)
        ? ((e7 = () => e$), (e2 = !0))
        : (e7 = P(e$)
            ? () =>
                e$.map((e$) =>
                  ot(e$)
                    ? e$.value
                    : tt(e$)
                      ? Pn(e$)
                      : M(e$)
                        ? ht(e$, e4, 2, [e4 && e4.proxy])
                        : void 0,
                )
            : M(e$)
              ? e0
                ? () => ht(e$, e4, 2, [e4 && e4.proxy])
                : () => {
                    if (!e4 || !e4.isUnmounted)
                      return (e5 && e5(), ht(e$, e4, 3, [e9]));
                  }
              : k),
    e0 && e2)
  ) {
    let eN = e7;
    e7 = () => Pn(eN());
  }
  let e9 = (e$) => {
      e5 = ez.options.onStop = () => {
        ht(e$, e4, 4);
      };
    },
    eU = P(e$) ? [] : Sn,
    ej = () => {
      if (ez.active) {
        if (e0) {
          let e$ = ez();
          (e2 || eV || Y(e$, eU)) &&
            (e5 && e5(),
            bt(e0, e4, 3, [e$, eU === Sn ? void 0 : eU, e9]),
            (eU = e$));
        } else ez();
      }
    },
    eD;
  ((ej.allowRecurse = !!e0),
    (eD =
      "sync" === e3
        ? ej
        : "post" === e3
          ? () => sl(ej, e4 && e4.suspense)
          : () => {
              var e$;
              !e4 || e4.isMounted ? ((e$ = ej), Mt(e$, Ct, wt, _t)) : ej();
            }));
  let ez = oe(e7, {
    lazy: !0,
    onTrack: e1,
    onTrigger: e6,
    scheduler: eD,
  });
  return (
    ca(ez, e4),
    e0
      ? e8
        ? ej()
        : (eU = ez())
      : "post" === e3
        ? sl(ez, e4 && e4.suspense)
        : ez(),
    () => {
      (re(ez), e4 && T(e4.effects, ez));
    }
  );
}

function Rn(e$, e0, e8) {
  let e2 = this.proxy;
  return En(V(e$) ? () => e2[e$] : e$.bind(e2), e0.bind(e2), e8, this);
}

function Pn(e$, e0 = new Set()) {
  if (!N(e$) || e0.has(e$)) return e$;
  if ((e0.add(e$), ot(e$))) Pn(e$.value, e0);
  else if (P(e$)) for (let e8 = 0; e8 < e$.length; e8++) Pn(e$[e8], e0);
  else if (I(e$) || L(e$))
    e$.forEach((e$) => {
      Pn(e$, e0);
    });
  else for (let e2 in e$) Pn(e$[e2], e0);
  return e$;
}

function Ln() {
  let e$ = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    vn(() => {
      e$.isMounted = !0;
    }),
    kn(() => {
      e$.isUnmounting = !0;
    }),
    e$
  );
}
const In = [Function, Array],
  On = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: In,
      onEnter: In,
      onAfterEnter: In,
      onEnterCancelled: In,
      onBeforeLeave: In,
      onLeave: In,
      onAfterLeave: In,
      onLeaveCancelled: In,
      onBeforeAppear: In,
      onAppear: In,
      onAfterAppear: In,
      onAppearCancelled: In,
    },
    setup(e$, { slots: e0 }) {
      let e8 = la(),
        e2 = Ln(),
        e3;
      return () => {
        let e1 = e0.default && $n(e0.default(), !0);
        if (!e1 || !e1.length) return;
        let e6 = at(e$),
          { mode: e4 } = e6,
          e7 = e1[0];
        if (e2.isLeaving) return Dn(e7);
        let e5 = Nn(e7);
        if (!e5) return Dn(e7);
        let eV = Vn(e5, e6, e2, e8);
        Un(e5, eV);
        let eN = e8.subTree,
          e9 = eN && Nn(eN),
          eU = !1,
          { getTransitionKey: ej } = e5.type;
        if (ej) {
          let eD = ej();
          void 0 === e3 ? (e3 = eD) : eD !== e3 && ((e3 = eD), (eU = !0));
        }
        if (e9 && e9.type !== vl && (!Sl(e5, e9) || eU)) {
          let ez = Vn(e9, e6, e2, e8);
          if ((Un(e9, ez), "out-in" === e4))
            return (
              (e2.isLeaving = !0),
              (ez.afterLeave = () => {
                ((e2.isLeaving = !1), e8.update());
              }),
              Dn(e7)
            );
          "in-out" === e4 &&
            (ez.delayLeave = (e$, e0, e8) => {
              ((Mn(e2, e9)[String(e9.key)] = e9),
                (e$._leaveCb = () => {
                  (e0(), (e$._leaveCb = void 0), delete eV.delayedLeave);
                }),
                (eV.delayedLeave = e8));
            });
        }
        return e7;
      };
    },
  };

function Mn(e$, e0) {
  let { leavingVNodes: e8 } = e$,
    e2 = e8.get(e0.type);
  return (e2 || ((e2 = Object.create(null)), e8.set(e0.type, e2)), e2);
}

function Vn(e$, e0, e8, e2) {
  let {
      appear: e3,
      mode: e1,
      persisted: e6 = !1,
      onBeforeEnter: e4,
      onEnter: e7,
      onAfterEnter: e5,
      onEnterCancelled: eV,
      onBeforeLeave: eN,
      onLeave: e9,
      onAfterLeave: eU,
      onLeaveCancelled: ej,
      onBeforeAppear: eD,
      onAppear: ez,
      onAfterAppear: eF,
      onAppearCancelled: eB,
    } = e0,
    eH = String(e$.key),
    eZ = Mn(e8, e$),
    eG = (e$, e0) => {
      e$ && bt(e$, e2, 9, e0);
    },
    eq = {
      mode: e1,
      persisted: e6,
      beforeEnter(e0) {
        let e2 = e4;
        if (!e8.isMounted) {
          if (!e3) return;
          e2 = eD || e4;
        }
        e0._leaveCb && e0._leaveCb(!0);
        let e1 = eZ[eH];
        (e1 && Sl(e$, e1) && e1.el._leaveCb && e1.el._leaveCb(), eG(e2, [e0]));
      },
      enter(e$) {
        let e0 = e7,
          e2 = e5,
          e1 = eV;
        if (!e8.isMounted) {
          if (!e3) return;
          ((e0 = ez || e7), (e2 = eF || e5), (e1 = eB || eV));
        }
        let e6 = !1,
          e4 = (e$._enterCb = (e0) => {
            e6 ||
              ((e6 = !0),
              eG(e0 ? e1 : e2, [e$]),
              eq.delayedLeave && eq.delayedLeave(),
              (e$._enterCb = void 0));
          });
        e0 ? (e0(e$, e4), e0.length <= 1 && e4()) : e4();
      },
      leave(e0, e2) {
        let e3 = String(e$.key);
        if ((e0._enterCb && e0._enterCb(!0), e8.isUnmounting)) return e2();
        eG(eN, [e0]);
        let e1 = !1,
          e6 = (e0._leaveCb = (e8) => {
            e1 ||
              ((e1 = !0),
              e2(),
              eG(e8 ? ej : eU, [e0]),
              (e0._leaveCb = void 0),
              eZ[e3] === e$ && delete eZ[e3]);
          });
        ((eZ[e3] = e$), e9 ? (e9(e0, e6), e9.length <= 1 && e6()) : e6());
      },
      clone: (e$) => Vn(e$, e0, e8, e2),
    };
  return eq;
}

function Dn(e$) {
  if (jn(e$)) return (((e$ = Ll(e$)).children = null), e$);
}

function Nn(e$) {
  return jn(e$) ? (e$.children ? e$.children[0] : void 0) : e$;
}

function Un(e$, e0) {
  6 & e$.shapeFlag && e$.component
    ? Un(e$.component.subTree, e0)
    : 128 & e$.shapeFlag
      ? ((e$.ssContent.transition = e0.clone(e$.ssContent)),
        (e$.ssFallback.transition = e0.clone(e$.ssFallback)))
      : (e$.transition = e0);
}

function $n(e$, e0 = !1) {
  let e8 = [],
    e2 = 0;
  for (let e3 = 0; e3 < e$.length; e3++) {
    let e1 = e$[e3];
    e1.type === bl
      ? (128 & e1.patchFlag && e2++, (e8 = e8.concat($n(e1.children, e0))))
      : (e0 || e1.type !== vl) && e8.push(e1);
  }
  if (e2 > 1) for (let e6 = 0; e6 < e8.length; e6++) e8[e6].patchFlag = -2;
  return e8;
}
const jn = (e$) => e$.type.__isKeepAlive,
  Fn = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number],
    },
    setup(e$, { slots: e0 }) {
      let e8 = new Map(),
        e2 = new Set(),
        e3 = null,
        e1 = la(),
        e6 = e1.suspense,
        e4 = e1.ctx,
        {
          renderer: {
            p: e7,
            m: e5,
            um: eV,
            o: { createElement: eN },
          },
        } = e4,
        e9 = eN("div");

      function eU(e$) {
        (qn(e$), eV(e$, e1, e6));
      }

      function ej(e$) {
        e8.forEach((e0, e8) => {
          let e2 = ua(e0.type);
          !e2 || (e$ && e$(e2)) || eD(e8);
        });
      }

      function eD(e$) {
        let e0 = e8.get(e$);
        (e3 && e0.type === e3.type ? e3 && qn(e3) : eU(e0),
          e8.delete(e$),
          e2.delete(e$));
      }
      ((e4.activate = (e$, e0, e8, e2, e3) => {
        let e1 = e$.component;
        (e5(e$, e0, e8, 0, e6),
          e7(e1.vnode, e$, e0, e8, e1, e6, e2, e3),
          sl(() => {
            ((e1.isDeactivated = !1), e1.a && Z(e1.a));
            let e0 = e$.props && e$.props.onVnodeMounted;
            e0 && il(e0, e1.parent, e$);
          }, e6));
      }),
        (e4.deactivate = (e$) => {
          let e0 = e$.component;
          (e5(e$, e9, null, 1, e6),
            sl(() => {
              e0.da && Z(e0.da);
              let e8 = e$.props && e$.props.onVnodeUnmounted;
              (e8 && il(e8, e0.parent, e$), (e0.isDeactivated = !0));
            }, e6));
        }),
        Tn(
          () => [e$.include, e$.exclude],
          ([e$, e0]) => {
            (e$ && ej((e0) => zn(e$, e0)), e0 && ej((e$) => !zn(e0, e$)));
          },
          {
            flush: "post",
            deep: !0,
          },
        ));
      let ez = null,
        eF = () => {
          null != ez && e8.set(ez, Gn(e1.subTree));
        };
      return (
        vn(eF),
        yn(eF),
        kn(() => {
          e8.forEach((e$) => {
            let { subTree: e0, suspense: e8 } = e1,
              e2 = Gn(e0);
            if (e$.type !== e2.type) eU(e$);
            else {
              qn(e2);
              let e3 = e2.component.da;
              e3 && sl(e3, e8);
            }
          });
        }),
        () => {
          if (((ez = null), !e0.default)) return null;
          let e1 = e0.default(),
            e6 = e1[0];
          if (e1.length > 1) return ((e3 = null), e1);
          if (!(Al(e6) && (4 & e6.shapeFlag || 128 & e6.shapeFlag)))
            return ((e3 = null), e6);
          let e4 = Gn(e6),
            e7 = e4.type,
            e5 = ua(e7),
            { include: eV, exclude: eN, max: e9 } = e$;
          if ((eV && (!e5 || !zn(eV, e5))) || (eN && e5 && zn(eN, e5)))
            return ((e3 = e4), e6);
          let eU = null == e4.key ? e7 : e4.key,
            ej = e8.get(eU);
          return (
            e4.el && ((e4 = Ll(e4)), 128 & e6.shapeFlag && (e6.ssContent = e4)),
            (ez = eU),
            ej
              ? ((e4.el = ej.el),
                (e4.component = ej.component),
                e4.transition && Un(e4, e4.transition),
                (e4.shapeFlag |= 512),
                e2.delete(eU),
                e2.add(eU))
              : (e2.add(eU),
                e9 &&
                  e2.size > parseInt(e9, 10) &&
                  eD(e2.values().next().value)),
            (e4.shapeFlag |= 256),
            (e3 = e4),
            e6
          );
        }
      );
    },
  };

function zn(e$, e0) {
  return P(e$)
    ? e$.some((e$) => zn(e$, e0))
    : V(e$)
      ? e$.split(",").indexOf(e0) > -1
      : !!e$.test && e$.test(e0);
}

function Bn(e$, e0, e8 = na) {
  let e2 =
    e$.__wdc ||
    (e$.__wdc = () => {
      let e0 = e8;
      for (; e0; ) {
        if (e0.isDeactivated) return;
        e0 = e0.parent;
      }
      e$();
    });
  if ((hn(e0, e2, e8), e8)) {
    let e3 = e8.parent;
    for (; e3 && e3.parent; )
      (jn(e3.parent.vnode) && Hn(e2, e0, e8, e3), (e3 = e3.parent));
  }
}

function Hn(e$, e0, e8, e2) {
  let e3 = hn(e0, e$, e2, !0);
  wn(() => {
    T(e2[e0], e3);
  }, e8);
}

function qn(e$) {
  let e0 = e$.shapeFlag;
  (256 & e0 && (e0 -= 256), 512 & e0 && (e0 -= 512), (e$.shapeFlag = e0));
}

function Gn(e$) {
  return 128 & e$.shapeFlag ? e$.ssContent : e$;
}
const Wn = (e$) => "_" === e$[0] || "$stable" === e$,
  Kn = (e$) => (P(e$) ? e$.map(Vl) : [Vl(e$)]),
  Jn = (e$, e0, e8) => en((e$) => Kn(e0(e$)), e8),
  Xn = (e$, e0) => {
    let e8 = e$._ctx;
    for (let e2 in e$) {
      if (Wn(e2)) continue;
      let e3 = e$[e2];
      if (M(e3)) e0[e2] = Jn(0, e3, e8);
      else if (null != e3) {
        let e1 = Kn(e3);
        e0[e2] = () => e1;
      }
    }
  },
  Yn = (e$, e0) => {
    let e8 = Kn(e0);
    e$.slots.default = () => e8;
  };

function Zn(e$, e0) {
  if (null === zt) return e$;
  let e8 = zt.proxy,
    e2 = e$.dirs || (e$.dirs = []);
  for (let e3 = 0; e3 < e0.length; e3++) {
    let [e1, e6, e4, e7 = x] = e0[e3];
    (M(e1) &&
      (e1 = {
        mounted: e1,
        updated: e1,
      }),
      e2.push({
        dir: e1,
        instance: e8,
        value: e6,
        oldValue: void 0,
        arg: e4,
        modifiers: e7,
      }));
  }
  return e$;
}

function Qn(e$, e0, e8, e2) {
  let e3 = e$.dirs,
    e1 = e0 && e0.dirs;
  for (let e6 = 0; e6 < e3.length; e6++) {
    let e4 = e3[e6];
    e1 && (e4.oldValue = e1[e6].value);
    let e7 = e4.dir[e2];
    e7 && bt(e7, e8, 8, [e$.el, e4, e$, e0]);
  }
}

function el() {
  return {
    app: null,
    config: {
      isNativeTag: w,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: w,
      errorHandler: void 0,
      warnHandler: void 0,
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
  };
}
let tl = 0;

function nl(e$, e0) {
  return function (e8, e2 = null) {
    null == e2 || N(e2) || (e2 = null);
    let e3 = el(),
      e1 = new Set(),
      e6 = !1,
      e4 = (e3.app = {
        _uid: tl++,
        _component: e8,
        _props: e2,
        _container: null,
        _context: e3,
        version: ma,
        get config() {
          return e3.config;
        },
        set config(e) {},
        use: (e$, ...e0) => (
          e1.has(e$) ||
            (e$ && M(e$.install)
              ? (e1.add(e$), e$.install(e4, ...e0))
              : M(e$) && (e1.add(e$), e$(e4, ...e0))),
          e4
        ),
        mixin: (e$) => (
          e3.mixins.includes(e$) ||
            (e3.mixins.push(e$), (e$.props || e$.emits) && (e3.deopt = !0)),
          e4
        ),
        component: (e$, e0) =>
          e0 ? ((e3.components[e$] = e0), e4) : e3.components[e$],
        directive: (e$, e0) =>
          e0 ? ((e3.directives[e$] = e0), e4) : e3.directives[e$],
        mount(e1, e7) {
          if (!e6) {
            let e5 = Pl(e8, e2);
            return (
              (e5.appContext = e3),
              e7 && e0 ? e0(e5, e1) : e$(e5, e1),
              (e6 = !0),
              (e4._container = e1),
              (e1.__vue_app__ = e4),
              e5.component.proxy
            );
          }
        },
        unmount() {
          e6 && (e$(null, e4._container), delete e4._container.__vue_app__);
        },
        provide: (e$, e0) => ((e3.provides[e$] = e0), e4),
      });
    return e4;
  };
}

function ll(e$) {
  return M(e$)
    ? {
        setup: e$,
        name: e$.name,
      }
    : e$;
}
const al = {
    scheduler: It,
    allowRecurse: !0,
  },
  sl = function (e$, e0) {
    e0 && e0.pendingBranch
      ? P(e$)
        ? e0.effects.push(...e$)
        : e0.effects.push(e$)
      : Mt(e$, St, At, Tt);
  },
  ol = (e$, e0, e8, e2) => {
    if (P(e$))
      return void e$.forEach((e$, e3) =>
        ol(e$, e0 && (P(e0) ? e0[e3] : e0), e8, e2),
      );
    let e3;
    e3 =
      !e2 || e2.type.__asyncLoader
        ? null
        : 4 & e2.shapeFlag
          ? e2.component.exposed || e2.component.proxy
          : e2.el;
    let { i: e1, r: e6 } = e$,
      e4 = e0 && e0.r,
      e7 = e1.refs === x ? (e1.refs = {}) : e1.refs,
      e5 = e1.setupState;
    if (
      (null != e4 &&
        e4 !== e6 &&
        (V(e4)
          ? ((e7[e4] = null), R(e5, e4) && (e5[e4] = null))
          : ot(e4) && (e4.value = null)),
      V(e6))
    ) {
      let eV = () => {
        ((e7[e6] = e3), R(e5, e6) && (e5[e6] = e3));
      };
      e3 ? ((eV.id = -1), sl(eV, e8)) : eV();
    } else if (ot(e6)) {
      let eN = () => {
        e6.value = e3;
      };
      e3 ? ((eN.id = -1), sl(eN, e8)) : eN();
    } else M(e6) && ht(e6, e1, 12, [e3, e7]);
  };

function rl(e$) {
  return (function (e$, e0) {
    let {
        insert: e8,
        remove: e2,
        patchProp: e3,
        forcePatchProp: e1,
        createElement: e6,
        createText: e4,
        createComment: e7,
        setText: e5,
        setElementText: eV,
        parentNode: eN,
        nextSibling: e9,
        setScopeId: eU = k,
        cloneNode: ej,
        insertStaticContent: eD,
      } = e$,
      ez = (e$, e0, e8, e2 = null, e3 = null, e1 = null, e6 = !1, e4 = !1) => {
        (e$ && !Sl(e$, e0) && ((e2 = tD(e$)), tV(e$, e3, e1, !0), (e$ = null)),
          -2 === e0.patchFlag && ((e4 = !1), (e0.dynamicChildren = null)));
        let { type: e7, ref: e5, shapeFlag: eV } = e0;
        switch (e7) {
          case gl:
            eF(e$, e0, e8, e2);
            break;
          case vl:
            eB(e$, e0, e8, e2);
            break;
          case xl:
            null == e$ && eH(e0, e8, e2, e6);
            break;
          case bl:
            t$(e$, e0, e8, e2, e3, e1, e6, e4);
            break;
          default:
            1 & eV
              ? eq(e$, e0, e8, e2, e3, e1, e6, e4)
              : 6 & eV
                ? t0(e$, e0, e8, e2, e3, e1, e6, e4)
                : (64 & eV || 128 & eV) &&
                  e7.process(e$, e0, e8, e2, e3, e1, e6, e4, tF);
        }
        null != e5 && e3 && ol(e5, e$ && e$.ref, e1, e0);
      },
      eF = (e$, e0, e2, e3) => {
        if (null == e$) e8((e0.el = e4(e0.children)), e2, e3);
        else {
          let e1 = (e0.el = e$.el);
          e0.children !== e$.children && e5(e1, e0.children);
        }
      },
      eB = (e$, e0, e2, e3) => {
        null == e$
          ? e8((e0.el = e7(e0.children || "")), e2, e3)
          : (e0.el = e$.el);
      },
      eH = (e$, e0, e8, e2) => {
        [e$.el, e$.anchor] = eD(e$.children, e0, e8, e2);
      },
      eZ = ({ el: e$, anchor: e0 }, e2, e3) => {
        let e1;
        for (; e$ && e$ !== e0; ) ((e1 = e9(e$)), e8(e$, e2, e3), (e$ = e1));
        e8(e0, e2, e3);
      },
      eG = ({ el: e$, anchor: e0 }) => {
        let e8;
        for (; e$ && e$ !== e0; ) ((e8 = e9(e$)), e2(e$), (e$ = e8));
        e2(e0);
      },
      eq = (e$, e0, e8, e2, e3, e1, e6, e4) => {
        ((e6 = e6 || "svg" === e0.type),
          null == e$
            ? eW(e0, e8, e2, e3, e1, e6, e4)
            : eY(e$, e0, e3, e1, e6, e4));
      },
      eW = (e$, e0, e2, e1, e4, e7, e5) => {
        let eN,
          e9,
          {
            type: eU,
            props: eD,
            shapeFlag: ez,
            transition: eF,
            scopeId: eB,
            patchFlag: eH,
            dirs: eZ,
          } = e$;
        if (e$.el && void 0 !== ej && -1 === eH) eN = e$.el = ej(e$.el);
        else {
          if (
            ((eN = e$.el = e6(e$.type, e7, eD && eD.is)),
            8 & ez
              ? eV(eN, e$.children)
              : 16 & ez &&
                eX(
                  e$.children,
                  eN,
                  null,
                  e1,
                  e4,
                  e7 && "foreignObject" !== eU,
                  e5 || !!e$.dynamicChildren,
                ),
            eZ && Qn(e$, null, e1, "created"),
            eD)
          ) {
            for (let eG in eD)
              B(eG) || e3(eN, eG, null, eD[eG], e7, e$.children, e1, e4, tj);
            (e9 = eD.onVnodeBeforeMount) && il(e9, e1, e$);
          }
          eK(eN, eB, e$, e1);
        }
        eZ && Qn(e$, null, e1, "beforeMount");
        let eq = (!e4 || (e4 && !e4.pendingBranch)) && eF && !eF.persisted;
        (eq && eF.beforeEnter(eN),
          e8(eN, e0, e2),
          ((e9 = eD && eD.onVnodeMounted) || eq || eZ) &&
            sl(() => {
              (e9 && il(e9, e1, e$),
                eq && eF.enter(eN),
                eZ && Qn(e$, null, e1, "mounted"));
            }, e4));
      },
      eK = (e$, e0, e8, e2) => {
        if ((e0 && eU(e$, e0), e2)) {
          let e3 = e2.type.__scopeId;
          (e3 && e3 !== e0 && eU(e$, e3 + "-s"),
            e8 === e2.subTree && eK(e$, e2.vnode.scopeId, e2.vnode, e2.parent));
        }
      },
      eX = (e$, e0, e8, e2, e3, e1, e6, e4 = 0) => {
        for (let e7 = e4; e7 < e$.length; e7++) {
          let e5 = (e$[e7] = e6 ? Dl(e$[e7]) : Vl(e$[e7]));
          ez(null, e5, e0, e8, e2, e3, e1, e6);
        }
      },
      eY = (e$, e0, e8, e2, e6, e4) => {
        let e7 = (e0.el = e$.el),
          { patchFlag: e5, dynamicChildren: eN, dirs: e9 } = e0;
        e5 |= 16 & e$.patchFlag;
        let eU = e$.props || x,
          ej = e0.props || x,
          eD;
        if (
          ((eD = ej.onVnodeBeforeUpdate) && il(eD, e8, e0, e$),
          e9 && Qn(e0, e$, e8, "beforeUpdate"),
          e5 > 0)
        ) {
          if (16 & e5) eJ(e7, e0, eU, ej, e8, e2, e6);
          else if (
            (2 & e5 &&
              eU.class !== ej.class &&
              e3(e7, "class", null, ej.class, e6),
            4 & e5 && e3(e7, "style", eU.style, ej.style, e6),
            8 & e5)
          ) {
            let ez = e0.dynamicProps;
            for (let eF = 0; eF < ez.length; eF++) {
              let eB = ez[eF],
                eH = eU[eB],
                eZ = ej[eB];
              (eZ !== eH || (e1 && e1(e7, eB))) &&
                e3(e7, eB, eH, eZ, e6, e$.children, e8, e2, tj);
            }
          }
          1 & e5 && e$.children !== e0.children && eV(e7, e0.children);
        } else e4 || null != eN || eJ(e7, e0, eU, ej, e8, e2, e6);
        let eG = e6 && "foreignObject" !== e0.type;
        (eN
          ? eQ(e$.dynamicChildren, eN, e7, e8, e2, eG)
          : e4 || t6(e$, e0, e7, null, e8, e2, eG),
          ((eD = ej.onVnodeUpdated) || e9) &&
            sl(() => {
              (eD && il(eD, e8, e0, e$), e9 && Qn(e0, e$, e8, "updated"));
            }, e2));
      },
      eQ = (e$, e0, e8, e2, e3, e1) => {
        for (let e6 = 0; e6 < e0.length; e6++) {
          let e4 = e$[e6],
            e7 = e0[e6],
            e5 =
              e4.type === bl ||
              !Sl(e4, e7) ||
              6 & e4.shapeFlag ||
              64 & e4.shapeFlag
                ? eN(e4.el)
                : e8;
          ez(e4, e7, e5, null, e2, e3, e1, !0);
        }
      },
      eJ = (e$, e0, e8, e2, e6, e4, e7) => {
        if (e8 !== e2) {
          for (let e5 in e2) {
            if (B(e5)) continue;
            let eV = e2[e5],
              eN = e8[e5];
            (eV !== eN || (e1 && e1(e$, e5))) &&
              e3(e$, e5, eN, eV, e7, e0.children, e6, e4, tj);
          }
          if (e8 !== x)
            for (let e9 in e8)
              B(e9) ||
                e9 in e2 ||
                e3(e$, e9, e8[e9], null, e7, e0.children, e6, e4, tj);
        }
      },
      t$ = (e$, e0, e2, e3, e1, e6, e7, e5) => {
        let eV = (e0.el = e$ ? e$.el : e4("")),
          eN = (e0.anchor = e$ ? e$.anchor : e4("")),
          { patchFlag: e9, dynamicChildren: eU } = e0;
        (e9 > 0 && (e5 = !0),
          null == e$
            ? (e8(eV, e2, e3),
              e8(eN, e2, e3),
              eX(e0.children, e2, eN, e1, e6, e7, e5))
            : e9 > 0 && 64 & e9 && eU && e$.dynamicChildren
              ? (eQ(e$.dynamicChildren, eU, e2, e1, e6, e7),
                (null != e0.key || (e1 && e0 === e1.subTree)) && cl(e$, e0, !0))
              : t6(e$, e0, e2, eN, e1, e6, e7, e5));
      },
      t0 = (e$, e0, e8, e2, e3, e1, e6, e4) => {
        null == e$
          ? 512 & e0.shapeFlag
            ? e3.ctx.activate(e0, e8, e2, e6, e4)
            : t8(e0, e8, e2, e3, e1, e6, e4)
          : t2(e$, e0, e4);
      },
      t8 = (e$, e0, e8, e2, e3, e1, e6) => {
        let e4 = (e$.component = (function (e$, e0, e8) {
          let e2 = e$.type,
            e3 = (e0 ? e0.appContext : e$.appContext) || ea,
            e1 = {
              uid: ta++,
              vnode: e$,
              type: e2,
              parent: e0,
              appContext: e3,
              root: null,
              next: null,
              subTree: null,
              update: null,
              render: null,
              proxy: null,
              exposed: null,
              withProxy: null,
              effects: null,
              provides: e0 ? e0.provides : Object.create(e3.provides),
              accessCache: null,
              renderCache: [],
              components: null,
              directives: null,
              propsOptions: un(e2, e3),
              emitsOptions: jt(e2, e3),
              emit: null,
              emitted: null,
              ctx: x,
              data: x,
              props: x,
              attrs: x,
              slots: x,
              refs: x,
              setupState: x,
              setupContext: null,
              suspense: e8,
              suspenseId: e8 ? e8.pendingId : 0,
              asyncDep: null,
              asyncResolved: !1,
              isMounted: !1,
              isUnmounted: !1,
              isDeactivated: !1,
              bc: null,
              c: null,
              bm: null,
              m: null,
              bu: null,
              u: null,
              um: null,
              bum: null,
              da: null,
              a: null,
              rtg: null,
              rtc: null,
              ec: null,
            };
          return (
            (e1.ctx = {
              _: e1,
            }),
            (e1.root = e0 ? e0.root : e1),
            (e1.emit = $t.bind(null, e1)),
            e1
          );
        })(e$, e2, e3));
        if (
          (jn(e$) && (e4.ctx.renderer = tF),
          (function (e$, e0 = !1) {
            oa = e0;
            let { props: e8, children: e2 } = e$.vnode,
              e3 = sa(e$);
            (on(e$, e8, e3, e0),
              ((e$, e0) => {
                if (32 & e$.vnode.shapeFlag) {
                  let e8 = e0._;
                  e8
                    ? ((e$.slots = e0), Q(e0, "_", e8))
                    : Xn(e0, (e$.slots = {}));
                } else ((e$.slots = {}), e0 && Yn(e$, e0));
                Q(e$.slots, Tl, 1);
              })(e$, e2),
              e3 &&
                (function (e$, e0) {
                  let e8 = e$.type;
                  ((e$.accessCache = Object.create(null)),
                    (e$.proxy = new Proxy(e$.ctx, Zl)));
                  let { setup: e2 } = e8;
                  if (e2) {
                    let e3 = (e$.setupContext =
                      e2.length > 1
                        ? (function (e$) {
                            let e0 = (e0) => {
                              e$.exposed = pt(e0);
                            };
                            return {
                              attrs: e$.attrs,
                              slots: e$.slots,
                              emit: e$.emit,
                              expose: e0,
                            };
                          })(e$)
                        : null);
                    ((na = e$), pe());
                    let e1 = ht(e2, e$, 0, [e$.props, e3]);
                    if ((fe(), (na = null), U(e1))) {
                      if (e0)
                        return e1.then((e0) => {
                          ra(e$, e0);
                        });
                      e$.asyncDep = e1;
                    } else ra(e$, e1);
                  } else ia(e$);
                })(e$, e0),
              (oa = !1));
          })(e4),
          e4.asyncDep)
        ) {
          if ((e3 && e3.registerDep(e4, t3), !e$.el)) {
            let e7 = (e4.subTree = Pl(vl));
            eB(null, e7, e0, e8);
          }
        } else t3(e4, e$, e0, e8, e3, e1, e6);
      },
      t2 = (e$, e0, e8) => {
        let e2 = (e0.component = e$.component);
        if (
          (function (e$, e0, e8) {
            let { props: e2, children: e3, component: e1 } = e$,
              { props: e6, children: e4, patchFlag: e7 } = e0,
              e5 = e1.emitsOptions;
            if (e0.dirs || e0.transition) return !0;
            if (!(e8 && e7 >= 0))
              return (
                !((!e3 && !e4) || (e4 && e4.$stable)) ||
                (e2 !== e6 && (e2 ? !e6 || Kt(e2, e6, e5) : !!e6))
              );
            if (1024 & e7) return !0;
            if (16 & e7) return e2 ? Kt(e2, e6, e5) : !!e6;
            if (8 & e7) {
              let eV = e0.dynamicProps;
              for (let eN = 0; eN < eV.length; eN++) {
                let e9 = eV[eN];
                if (e6[e9] !== e2[e9] && !Ft(e5, e9)) return !0;
              }
            }
            return !1;
          })(e$, e0, e8)
        ) {
          if (e2.asyncDep && !e2.asyncResolved) return void t1(e2, e0, e8);
          ((e2.next = e0),
            (function (e$) {
              let e0 = yt.indexOf(e$);
              e0 > -1 && yt.splice(e0, 1);
            })(e2.update),
            e2.update());
        } else
          ((e0.component = e$.component), (e0.el = e$.el), (e2.vnode = e0));
      },
      t3 = (e$, e0, e8, e2, e3, e1, e6) => {
        e$.update = oe(function () {
          if (e$.isMounted) {
            let e4,
              { next: e7, bu: e5, u: eV, parent: e9, vnode: eU } = e$,
              ej = e7;
            (e7 ? ((e7.el = eU.el), t1(e$, e7, e6)) : (e7 = eU),
              e5 && Z(e5),
              (e4 = e7.props && e7.props.onVnodeBeforeUpdate) &&
                il(e4, e9, e7, eU));
            let eD = Ht(e$),
              eF = e$.subTree;
            ((e$.subTree = eD),
              ez(eF, eD, eN(eF.el), tD(eF), e$, e3, e1),
              (e7.el = eD.el),
              null === ej &&
                (function ({ vnode: e$, parent: e0 }, e8) {
                  for (; e0 && e0.subTree === e$; )
                    (((e$ = e0.vnode).el = e8), (e0 = e0.parent));
                })(e$, eD.el),
              eV && sl(eV, e3),
              (e4 = e7.props && e7.props.onVnodeUpdated) &&
                sl(() => {
                  il(e4, e9, e7, eU);
                }, e3));
          } else {
            let eB,
              { el: eH, props: eZ } = e0,
              { bm: eG, m: eq, parent: eW } = e$;
            (eG && Z(eG), (eB = eZ && eZ.onVnodeBeforeMount) && il(eB, eW, e0));
            let eK = (e$.subTree = Ht(e$));
            if (
              (eH && tH
                ? tH(e0.el, eK, e$, e3)
                : (ez(null, eK, e8, e2, e$, e3, e1), (e0.el = eK.el)),
              eq && sl(eq, e3),
              (eB = eZ && eZ.onVnodeMounted))
            ) {
              let eX = e0;
              sl(() => {
                il(eB, eW, eX);
              }, e3);
            }
            let { a: eY } = e$;
            (eY && 256 & e0.shapeFlag && sl(eY, e3),
              (e$.isMounted = !0),
              (e0 = e8 = e2 = null));
          }
        }, al);
      },
      t1 = (e$, e0, e8) => {
        e0.component = e$;
        let e2 = e$.vnode.props;
        ((e$.vnode = e0),
          (e$.next = null),
          (function (e$, e0, e8, e2) {
            let {
                props: e3,
                attrs: e1,
                vnode: { patchFlag: e6 },
              } = e$,
              e4 = at(e3),
              [e7] = e$.propsOptions;
            if (!(e2 || e6 > 0) || 16 & e6) {
              let e5;
              for (let eV in (rn(e$, e0, e3, e1), e4))
                (e0 && (R(e0, eV) || ((e5 = K(eV)) !== eV && R(e0, e5)))) ||
                  (e7
                    ? e8 &&
                      (void 0 !== e8[eV] || void 0 !== e8[e5]) &&
                      (e3[eV] = cn(e7, e0 || x, eV, void 0, e$))
                    : delete e3[eV]);
              if (e1 !== e4)
                for (let eN in e1) (e0 && R(e0, eN)) || delete e1[eN];
            } else if (8 & e6) {
              let e9 = e$.vnode.dynamicProps;
              for (let eU = 0; eU < e9.length; eU++) {
                let ej = e9[eU],
                  eD = e0[ej];
                if (e7) {
                  if (R(e1, ej)) e1[ej] = eD;
                  else {
                    let ez = G(ej);
                    e3[ez] = cn(e7, e4, ez, eD, e$);
                  }
                } else e1[ej] = eD;
              }
            }
            he(e$, "set", "$attrs");
          })(e$, e0.props, e2, e8),
          ((e$, e0) => {
            let { vnode: e8, slots: e2 } = e$,
              e3 = !0,
              e1 = x;
            if (32 & e8.shapeFlag) {
              let e6 = e0._;
              (e6
                ? 1 === e6
                  ? (e3 = !1)
                  : S(e2, e0)
                : ((e3 = !e0.$stable), Xn(e0, e2)),
                (e1 = e0));
            } else
              e0 &&
                (Yn(e$, e0),
                (e1 = {
                  default: 1,
                }));
            if (e3) for (let e4 in e2) Wn(e4) || e4 in e1 || delete e2[e4];
          })(e$, e0.children),
          Vt(void 0, e$.update));
      },
      t6 = (e$, e0, e8, e2, e3, e1, e6, e4 = !1) => {
        let e7 = e$ && e$.children,
          e5 = e$ ? e$.shapeFlag : 0,
          eN = e0.children,
          { patchFlag: e9, shapeFlag: eU } = e0;
        if (e9 > 0) {
          if (128 & e9) return void t7(e7, eN, e8, e2, e3, e1, e6, e4);
          if (256 & e9) return void t4(e7, eN, e8, e2, e3, e1, e6, e4);
        }
        8 & eU
          ? (16 & e5 && tj(e7, e3, e1), eN !== e7 && eV(e8, eN))
          : 16 & e5
            ? 16 & eU
              ? t7(e7, eN, e8, e2, e3, e1, e6, e4)
              : tj(e7, e3, e1, !0)
            : (8 & e5 && eV(e8, ""), 16 & eU && eX(eN, e8, e2, e3, e1, e6, e4));
      },
      t4 = (e$, e0, e8, e2, e3, e1, e6, e4) => {
        e0 = e0 || y;
        let e7 = (e$ = e$ || y).length,
          e5 = e0.length,
          eV = Math.min(e7, e5),
          eN;
        for (eN = 0; eN < eV; eN++) {
          let e9 = (e0[eN] = e4 ? Dl(e0[eN]) : Vl(e0[eN]));
          ez(e$[eN], e9, e8, null, e3, e1, e6, e4);
        }
        e7 > e5
          ? tj(e$, e3, e1, !0, !1, eV)
          : eX(e0, e8, e2, e3, e1, e6, e4, eV);
      },
      t7 = (e$, e0, e8, e2, e3, e1, e6, e4) => {
        let e7 = 0,
          e5 = e0.length,
          eV = e$.length - 1,
          eN = e5 - 1;
        for (; e7 <= eV && e7 <= eN; ) {
          let e9 = e$[e7],
            eU = (e0[e7] = e4 ? Dl(e0[e7]) : Vl(e0[e7]));
          if (!Sl(e9, eU)) break;
          (ez(e9, eU, e8, null, e3, e1, e6, e4), e7++);
        }
        for (; e7 <= eV && e7 <= eN; ) {
          let ej = e$[eV],
            eD = (e0[eN] = e4 ? Dl(e0[eN]) : Vl(e0[eN]));
          if (!Sl(ej, eD)) break;
          (ez(ej, eD, e8, null, e3, e1, e6, e4), eV--, eN--);
        }
        if (e7 > eV) {
          if (e7 <= eN) {
            let eF = eN + 1,
              eB = eF < e5 ? e0[eF].el : e2;
            for (; e7 <= eN; )
              (ez(
                null,
                (e0[e7] = e4 ? Dl(e0[e7]) : Vl(e0[e7])),
                e8,
                eB,
                e3,
                e1,
                e6,
              ),
                e7++);
          }
        } else if (e7 > eN) for (; e7 <= eV; ) (tV(e$[e7], e3, e1, !0), e7++);
        else {
          let eH = e7,
            eZ = e7,
            eG = new Map();
          for (e7 = eZ; e7 <= eN; e7++) {
            let eq = (e0[e7] = e4 ? Dl(e0[e7]) : Vl(e0[e7]));
            null != eq.key && eG.set(eq.key, e7);
          }
          let eW,
            eK = 0,
            eX = eN - eZ + 1,
            eY = !1,
            eQ = 0,
            eJ = Array(eX);
          for (e7 = 0; e7 < eX; e7++) eJ[e7] = 0;
          for (e7 = eH; e7 <= eV; e7++) {
            let t$ = e$[e7];
            if (eK >= eX) {
              tV(t$, e3, e1, !0);
              continue;
            }
            let t0;
            if (null != t$.key) t0 = eG.get(t$.key);
            else
              for (eW = eZ; eW <= eN; eW++)
                if (0 === eJ[eW - eZ] && Sl(t$, e0[eW])) {
                  t0 = eW;
                  break;
                }
            void 0 === t0
              ? tV(t$, e3, e1, !0)
              : ((eJ[t0 - eZ] = e7 + 1),
                t0 >= eQ ? (eQ = t0) : (eY = !0),
                ez(t$, e0[t0], e8, null, e3, e1, e6, e4),
                eK++);
          }
          let t8 = eY
            ? (function (e$) {
                let e0 = e$.slice(),
                  e8 = [0],
                  e2,
                  e3,
                  e1,
                  e6,
                  e4,
                  e7 = e$.length;
                for (e2 = 0; e2 < e7; e2++) {
                  let e5 = e$[e2];
                  if (0 !== e5) {
                    if (e$[(e3 = e8[e8.length - 1])] < e5) {
                      ((e0[e2] = e3), e8.push(e2));
                      continue;
                    }
                    for (e1 = 0, e6 = e8.length - 1; e1 < e6; )
                      e$[e8[(e4 = ((e1 + e6) / 2) | 0)]] < e5
                        ? (e1 = e4 + 1)
                        : (e6 = e4);
                    e5 < e$[e8[e1]] &&
                      (e1 > 0 && (e0[e2] = e8[e1 - 1]), (e8[e1] = e2));
                  }
                }
                for (e6 = e8[(e1 = e8.length) - 1]; e1-- > 0; )
                  ((e8[e1] = e6), (e6 = e0[e6]));
                return e8;
              })(eJ)
            : y;
          for (eW = t8.length - 1, e7 = eX - 1; e7 >= 0; e7--) {
            let t2 = eZ + e7,
              t3 = e0[t2],
              t1 = t2 + 1 < e5 ? e0[t2 + 1].el : e2;
            0 === eJ[e7]
              ? ez(null, t3, e8, t1, e3, e1, e6)
              : eY && (eW < 0 || e7 !== t8[eW] ? t5(t3, e8, t1, 2) : eW--);
          }
        }
      },
      t5 = (e$, e0, e2, e3, e1 = null) => {
        let {
          el: e6,
          type: e4,
          transition: e7,
          children: e5,
          shapeFlag: eV,
        } = e$;
        if (6 & eV) return void t5(e$.component.subTree, e0, e2, e3);
        if (128 & eV) return void e$.suspense.move(e0, e2, e3);
        if (64 & eV) return void e4.move(e$, e0, e2, tF);
        if (e4 === bl) {
          e8(e6, e0, e2);
          for (let eN = 0; eN < e5.length; eN++) t5(e5[eN], e0, e2, e3);
          return void e8(e$.anchor, e0, e2);
        }
        if (e4 === xl) return void eZ(e$, e0, e2);
        if (2 !== e3 && 1 & eV && e7) {
          if (0 === e3)
            (e7.beforeEnter(e6), e8(e6, e0, e2), sl(() => e7.enter(e6), e1));
          else {
            let { leave: e9, delayLeave: eU, afterLeave: ej } = e7,
              eD = () => e8(e6, e0, e2),
              ez = () => {
                e9(e6, () => {
                  (eD(), ej && ej());
                });
              };
            eU ? eU(e6, eD, ez) : ez();
          }
        } else e8(e6, e0, e2);
      },
      tV = (e$, e0, e8, e2 = !1, e3 = !1) => {
        let {
          type: e1,
          props: e6,
          ref: e4,
          children: e7,
          dynamicChildren: e5,
          shapeFlag: eV,
          patchFlag: eN,
          dirs: e9,
        } = e$;
        if ((null != e4 && ol(e4, null, e8, null), 256 & eV))
          return void e0.ctx.deactivate(e$);
        let eU = 1 & eV && e9,
          ej;
        if (((ej = e6 && e6.onVnodeBeforeUnmount) && il(ej, e0, e$), 6 & eV))
          tU(e$.component, e8, e2);
        else {
          if (128 & eV) return void e$.suspense.unmount(e8, e2);
          (eU && Qn(e$, null, e0, "beforeUnmount"),
            e5 && (e1 !== bl || (eN > 0 && 64 & eN))
              ? tj(e5, e0, e8, !1, !0)
              : ((e1 === bl && (128 & eN || 256 & eN)) || (!e3 && 16 & eV)) &&
                tj(e7, e0, e8),
            64 & eV && (e2 || !ul(e$.props)) && e$.type.remove(e$, tF),
            e2 && tN(e$));
        }
        ((ej = e6 && e6.onVnodeUnmounted) || eU) &&
          sl(() => {
            (ej && il(ej, e0, e$), eU && Qn(e$, null, e0, "unmounted"));
          }, e8);
      },
      tN = (e$) => {
        let { type: e0, el: e8, anchor: e3, transition: e1 } = e$;
        if (e0 === bl) return void t9(e8, e3);
        if (e0 === xl) return void eG(e$);
        let e6 = () => {
          (e2(e8), e1 && !e1.persisted && e1.afterLeave && e1.afterLeave());
        };
        if (1 & e$.shapeFlag && e1 && !e1.persisted) {
          let { leave: e4, delayLeave: e7 } = e1,
            e5 = () => e4(e8, e6);
          e7 ? e7(e$.el, e6, e5) : e5();
        } else e6();
      },
      t9 = (e$, e0) => {
        let e8;
        for (; e$ !== e0; ) ((e8 = e9(e$)), e2(e$), (e$ = e8));
        e2(e0);
      },
      tU = (e$, e0, e8) => {
        let { bum: e2, effects: e3, update: e1, subTree: e6, um: e4 } = e$;
        if ((e2 && Z(e2), e3))
          for (let e7 = 0; e7 < e3.length; e7++) re(e3[e7]);
        (e1 && (re(e1), tV(e6, e$, e0, e8)),
          e4 && sl(e4, e0),
          sl(() => {
            e$.isUnmounted = !0;
          }, e0),
          e0 &&
            e0.pendingBranch &&
            !e0.isUnmounted &&
            e$.asyncDep &&
            !e$.asyncResolved &&
            e$.suspenseId === e0.pendingId &&
            (e0.deps--, 0 === e0.deps && e0.resolve()));
      },
      tj = (e$, e0, e8, e2 = !1, e3 = !1, e1 = 0) => {
        for (let e6 = e1; e6 < e$.length; e6++) tV(e$[e6], e0, e8, e2, e3);
      },
      tD = (e$) =>
        6 & e$.shapeFlag
          ? tD(e$.component.subTree)
          : 128 & e$.shapeFlag
            ? e$.suspense.next()
            : e9(e$.anchor || e$.el),
      tz = (e$, e0) => {
        (null == e$
          ? e0._vnode && tV(e0._vnode, null, null, !0)
          : ez(e0._vnode || null, e$, e0),
          Dt(),
          (e0._vnode = e$));
      },
      tF = {
        p: ez,
        um: tV,
        m: t5,
        r: tN,
        mt: t8,
        mc: eX,
        pc: t6,
        pbc: eQ,
        n: tD,
        o: e$,
      },
      tB,
      tH;
    return (
      e0 && ([tB, tH] = e0(tF)),
      {
        render: tz,
        hydrate: tB,
        createApp: nl(tz, tB),
      }
    );
  })(e$);
}

function il(e$, e0, e8, e2 = null) {
  bt(e$, e0, 7, [e8, e2]);
}

function cl(e$, e0, e8 = !1) {
  let e2 = e$.children,
    e3 = e0.children;
  if (P(e2) && P(e3))
    for (let e1 = 0; e1 < e2.length; e1++) {
      let e6 = e2[e1],
        e4 = e3[e1];
      1 & e4.shapeFlag &&
        !e4.dynamicChildren &&
        ((e4.patchFlag <= 0 || 32 === e4.patchFlag) &&
          ((e4 = e3[e1] = Dl(e3[e1])).el = e6.el),
        e8 || cl(e6, e4));
    }
}
const ul = (e$) => e$ && (e$.disabled || "" === e$.disabled);

function dl(e$) {
  return ml("components", e$) || e$;
}
const pl = Symbol();

function fl(e$) {
  return V(e$) ? ml("components", e$, !1) || e$ : e$ || pl;
}

function ml(e$, e0, e8 = !0) {
  let e2 = zt || na;
  if (e2) {
    let e3 = e2.type;
    if ("components" === e$) {
      if ("_self" === e0) return e3;
      let e1 = ua(e3);
      if (e1 && (e1 === e0 || e1 === G(e0) || e1 === J(G(e0)))) return e3;
    }
    return hl(e2[e$] || e3[e$], e0) || hl(e2.appContext[e$], e0);
  }
}

function hl(e$, e0) {
  return e$ && (e$[e0] || e$[G(e0)] || e$[J(G(e0))]);
}
const bl = Symbol(void 0),
  gl = Symbol(void 0),
  vl = Symbol(void 0),
  xl = Symbol(void 0),
  yl = [];
let kl = null;

function wl(e$ = !1) {
  yl.push((kl = e$ ? null : []));
}

function Cl() {
  (yl.pop(), (kl = yl[yl.length - 1] || null));
}

function _l(e$, e0, e8, e2, e3) {
  let e1 = Pl(e$, e0, e8, e2, e3, !0);
  return ((e1.dynamicChildren = kl || y), Cl(), kl && kl.push(e1), e1);
}

function Al(e$) {
  return !!e$ && !0 === e$.__v_isVNode;
}

function Sl(e$, e0) {
  return e$.type === e0.type && e$.key === e0.key;
}
const Tl = "__vInternal",
  El = ({ key: e$ }) => (null != e$ ? e$ : null),
  Rl = ({ ref: e$ }) =>
    null != e$
      ? V(e$) || ot(e$) || M(e$)
        ? {
            i: zt,
            r: e$,
          }
        : e$
      : null,
  Pl = function (e$, e0 = null, e8 = null, e2 = 0, e3 = null, e1 = !1) {
    var e6, e4, e7;
    if (((e$ && e$ !== pl) || (e$ = vl), Al(e$))) {
      let e5 = Ll(e$, e0, !0);
      return (e8 && Nl(e5, e8), e5);
    }
    if (((e6 = e$), M(e6) && "__vccOpts" in e6 && (e$ = e$.__vccOpts), e0)) {
      (lt(e0) || Tl in e0) && (e0 = S({}, e0));
      let { class: eV, style: eN } = e0;
      (eV && !V(eV) && (e0.class = m(eV)),
        N(eN) && (lt(eN) && !P(eN) && (eN = S({}, eN)), (e0.style = u(eN))));
    }
    let e9 = V(e$)
        ? 1
        : e$.__isSuspense
          ? 128
          : e$.__isTeleport
            ? 64
            : N(e$)
              ? 4
              : M(e$)
                ? 2
                : 0,
      eU = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e$,
        props: e0,
        key: e0 && El(e0),
        ref: e0 && Rl(e0),
        scopeId: tn,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: e9,
        patchFlag: e2,
        dynamicProps: e3,
        dynamicChildren: null,
        appContext: null,
      };
    if ((Nl(eU, e8), 128 & e9)) {
      let { content: ej, fallback: eD } = (function (e$) {
        let { shapeFlag: e0, children: e8 } = e$,
          e2,
          e3;
        return (
          32 & e0
            ? ((e2 = Jt(e8.default)), (e3 = Jt(e8.fallback)))
            : ((e2 = Jt(e8)), (e3 = Vl(null))),
          {
            content: e2,
            fallback: e3,
          }
        );
      })(eU);
      ((eU.ssContent = ej), (eU.ssFallback = eD));
    }
    return (!e1 && kl && (e2 > 0 || 6 & e9) && 32 !== e2 && kl.push(eU), eU);
  };

function Ll(e$, e0, e8 = !1) {
  let { props: e2, ref: e3, patchFlag: e1, children: e6 } = e$,
    e4 = e0 ? Ul(e2 || {}, e0) : e2;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e$.type,
    props: e4,
    key: e4 && El(e4),
    ref:
      e0 && e0.ref
        ? e8 && e3
          ? P(e3)
            ? e3.concat(Rl(e0))
            : [e3, Rl(e0)]
          : Rl(e0)
        : e3,
    scopeId: e$.scopeId,
    children: e6,
    target: e$.target,
    targetAnchor: e$.targetAnchor,
    staticCount: e$.staticCount,
    shapeFlag: e$.shapeFlag,
    patchFlag: e0 && e$.type !== bl ? (-1 === e1 ? 16 : 16 | e1) : e1,
    dynamicProps: e$.dynamicProps,
    dynamicChildren: e$.dynamicChildren,
    appContext: e$.appContext,
    dirs: e$.dirs,
    transition: e$.transition,
    component: e$.component,
    suspense: e$.suspense,
    ssContent: e$.ssContent && Ll(e$.ssContent),
    ssFallback: e$.ssFallback && Ll(e$.ssFallback),
    el: e$.el,
    anchor: e$.anchor,
  };
}

function Il(e$ = " ", e0 = 0) {
  return Pl(gl, null, e$, e0);
}

function Ol(e$, e0) {
  let e8 = Pl(xl, null, e$);
  return ((e8.staticCount = e0), e8);
}

function Ml(e$ = "", e0 = !1) {
  return e0 ? (wl(), _l(vl, null, e$)) : Pl(vl, null, e$);
}

function Vl(e$) {
  return null == e$ || "boolean" == typeof e$
    ? Pl(vl)
    : P(e$)
      ? Pl(bl, null, e$)
      : "object" == typeof e$
        ? null === e$.el
          ? e$
          : Ll(e$)
        : Pl(gl, null, String(e$));
}

function Dl(e$) {
  return null === e$.el ? e$ : Ll(e$);
}

function Nl(e$, e0) {
  let e8 = 0,
    { shapeFlag: e2 } = e$;
  if (null == e0) e0 = null;
  else if (P(e0)) e8 = 16;
  else if ("object" == typeof e0) {
    if (1 & e2 || 64 & e2) {
      let e3 = e0.default;
      return void (e3 && (e3._c && Yt(1), Nl(e$, e3()), e3._c && Yt(-1)));
    }
    {
      e8 = 32;
      let e1 = e0._;
      e1 || Tl in e0
        ? 3 === e1 &&
          zt &&
          (1024 & zt.vnode.patchFlag
            ? ((e0._ = 2), (e$.patchFlag |= 1024))
            : (e0._ = 1))
        : (e0._ctx = zt);
    }
  } else
    M(e0)
      ? ((e0 = {
          default: e0,
          _ctx: zt,
        }),
        (e8 = 32))
      : ((e0 = String(e0)), 64 & e2 ? ((e8 = 16), (e0 = [Il(e0)])) : (e8 = 8));
  ((e$.children = e0), (e$.shapeFlag |= e8));
}

function Ul(...e$) {
  let e0 = S({}, e$[0]);
  for (let e8 = 1; e8 < e$.length; e8++) {
    let e2 = e$[e8];
    for (let e3 in e2)
      if ("class" === e3)
        e0.class !== e2.class && (e0.class = m([e0.class, e2.class]));
      else if ("style" === e3) e0.style = u([e0.style, e2.style]);
      else if (_(e3)) {
        let e1 = e0[e3],
          e6 = e2[e3];
        e1 !== e6 && (e0[e3] = e1 ? [].concat(e1, e2[e3]) : e6);
      } else "" !== e3 && (e0[e3] = e2[e3]);
  }
  return e0;
}

function $l(e$, e0) {
  if (na) {
    let e8 = na.provides,
      e2 = na.parent && na.parent.provides;
    (e2 === e8 && (e8 = na.provides = Object.create(e2)), (e8[e$] = e0));
  }
}

function jl(e$, e0, e8 = !1) {
  let e2 = na || zt;
  if (e2) {
    let e3 =
      null == e2.parent
        ? e2.vnode.appContext && e2.vnode.appContext.provides
        : e2.parent.provides;
    if (e3 && e$ in e3) return e3[e$];
    if (arguments.length > 1) return e8 && M(e0) ? e0() : e0;
  }
}
let Fl = !1;

function zl(e$, e0, e8 = [], e2 = [], e3 = [], e1 = !1) {
  var e6, e4;
  let {
      mixins: e7,
      extends: e5,
      data: eV,
      computed: eN,
      methods: e9,
      watch: eU,
      provide: ej,
      inject: eD,
      components: ez,
      directives: eF,
      beforeMount: eB,
      mounted: eH,
      beforeUpdate: eZ,
      updated: eG,
      activated: eq,
      deactivated: eW,
      beforeDestroy: eK,
      beforeUnmount: eX,
      destroyed: eY,
      unmounted: eQ,
      render: eJ,
      renderTracked: t$,
      renderTriggered: t0,
      errorCaptured: t8,
      expose: t2,
    } = e0,
    t3 = e$.proxy,
    t1 = e$.ctx,
    t6 = e$.appContext.mixins;
  if (
    (e1 && eJ && e$.render === k && (e$.render = eJ),
    e1 ||
      ((Fl = !0),
      Bl("beforeCreate", "bc", e0, e$, t6),
      (Fl = !1),
      Gl(e$, t6, e8, e2, e3)),
    e5 && zl(e$, e5, e8, e2, e3, !0),
    e7 && Gl(e$, e7, e8, e2, e3),
    eD)
  ) {
    if (P(eD))
      for (let t4 = 0; t4 < eD.length; t4++) {
        let t7 = eD[t4];
        t1[t7] = jl(t7);
      }
    else
      for (let t5 in eD) {
        let tV = eD[t5];
        N(tV)
          ? (t1[t5] = jl(tV.from || t5, tV.default, !0))
          : (t1[t5] = jl(tV));
      }
  }
  if (e9)
    for (let tN in e9) {
      let t9 = e9[tN];
      M(t9) && (t1[tN] = t9.bind(t3));
    }
  if (
    (e1
      ? eV && e8.push(eV)
      : (e8.length && e8.forEach((e0) => Wl(e$, e0, t3)), eV && Wl(e$, eV, t3)),
    eN)
  )
    for (let tU in eN) {
      let tj = eN[tU],
        tD = da({
          get: M(tj) ? tj.bind(t3, t3) : M(tj.get) ? tj.get.bind(t3, t3) : k,
          set: !M(tj) && M(tj.set) ? tj.set.bind(t3) : k,
        });
      Object.defineProperty(t1, tU, {
        enumerable: !0,
        configurable: !0,
        get: () => tD.value,
        set: (e$) => (tD.value = e$),
      });
    }
  if (
    (eU && e2.push(eU),
    !e1 &&
      e2.length &&
      e2.forEach((e$) => {
        for (let e0 in e$) Kl(e$[e0], t1, t3, e0);
      }),
    ej && e3.push(ej),
    !e1 &&
      e3.length &&
      e3.forEach((e$) => {
        let e0 = M(e$) ? e$.call(t3) : e$;
        Reflect.ownKeys(e0).forEach((e$) => {
          $l(e$, e0[e$]);
        });
      }),
    e1 &&
      (ez &&
        S(e$.components || (e$.components = S({}, e$.type.components)), ez),
      eF &&
        S(e$.directives || (e$.directives = S({}, e$.type.directives)), eF)),
    e1 || Bl("created", "c", e0, e$, t6),
    eB && gn(eB.bind(t3)),
    eH && vn(eH.bind(t3)),
    eZ && xn(eZ.bind(t3)),
    eG && yn(eG.bind(t3)),
    eq && Bn(eq.bind(t3), "a", e6),
    eW && ((e4 = eW.bind(t3)), Bn(e4, "da", void 0)),
    t8 &&
      ((e$, e0 = na) => {
        hn("ec", e$, e0);
      })(t8.bind(t3)),
    t$ && _n(t$.bind(t3)),
    t0 && Cn(t0.bind(t3)),
    eX && kn(eX.bind(t3)),
    eQ && wn(eQ.bind(t3)),
    P(t2) && !e1)
  ) {
    if (t2.length) {
      let tz = e$.exposed || (e$.exposed = pt({}));
      t2.forEach((e$) => {
        var e0, e8;
        tz[e$] = ((e0 = t3), ot(e0[(e8 = e$)]) ? e0[e8] : new ft(e0, e8));
      });
    } else e$.exposed || (e$.exposed = x);
  }
}

function Bl(e$, e0, e8, e2, e3) {
  ql(e$, e0, e3, e2);
  let { extends: e1, mixins: e6 } = e8;
  (e1 && Hl(e$, e0, e1, e2), e6 && ql(e$, e0, e6, e2));
  let e4 = e8[e$];
  e4 && bt(e4.bind(e2.proxy), e2, e0);
}

function Hl(e$, e0, e8, e2) {
  e8.extends && Hl(e$, e0, e8.extends, e2);
  let e3 = e8[e$];
  e3 && bt(e3.bind(e2.proxy), e2, e0);
}

function ql(e$, e0, e8, e2) {
  for (let e3 = 0; e3 < e8.length; e3++) {
    let e1 = e8[e3].mixins;
    e1 && ql(e$, e0, e1, e2);
    let e6 = e8[e3][e$];
    e6 && bt(e6.bind(e2.proxy), e2, e0);
  }
}

function Gl(e$, e0, e8, e2, e3) {
  for (let e1 = 0; e1 < e0.length; e1++) zl(e$, e0[e1], e8, e2, e3, !0);
}

function Wl(e$, e0, e8) {
  let e2 = e0.call(e8, e8);
  N(e2) && (e$.data === x ? (e$.data = Ze(e2)) : S(e$.data, e2));
}

function Kl(e$, e0, e8, e2) {
  let e3 = e2.includes(".")
    ? (function (e$, e0) {
        let e8 = e0.split(".");
        return () => {
          let e0 = e$;
          for (let e2 = 0; e2 < e8.length && e0; e2++) e0 = e0[e8[e2]];
          return e0;
        };
      })(e8, e2)
    : () => e8[e2];
  if (V(e$)) {
    let e1 = e0[e$];
    M(e1) && Tn(e3, e1);
  } else if (M(e$)) Tn(e3, e$.bind(e8));
  else if (N(e$)) {
    if (P(e$)) e$.forEach((e$) => Kl(e$, e0, e8, e2));
    else {
      let e6 = M(e$.handler) ? e$.handler.bind(e8) : e0[e$.handler];
      M(e6) && Tn(e3, e6, e$);
    }
  }
}

function Jl(e$, e0, e8) {
  let e2 = e8.appContext.config.optionMergeStrategies,
    { mixins: e3, extends: e1 } = e0;
  for (let e6 in (e1 && Jl(e$, e1, e8),
  e3 && e3.forEach((e0) => Jl(e$, e0, e8)),
  e0))
    e2 && R(e2, e6)
      ? (e$[e6] = e2[e6](e$[e6], e0[e6], e8.proxy, e6))
      : (e$[e6] = e0[e6]);
}
const Xl = (e$) =>
    e$ ? (sa(e$) ? (e$.exposed ? e$.exposed : e$.proxy) : Xl(e$.parent)) : null,
  Yl = S(Object.create(null), {
    $: (e$) => e$,
    $el: (e$) => e$.vnode.el,
    $data: (e$) => e$.data,
    $props: (e$) => e$.props,
    $attrs: (e$) => e$.attrs,
    $slots: (e$) => e$.slots,
    $refs: (e$) => e$.refs,
    $parent: (e$) => Xl(e$.parent),
    $root: (e$) => Xl(e$.root),
    $emit: (e$) => e$.emit,
    $options: (e$) =>
      (function (e$) {
        let e0 = e$.type,
          { __merged: e8, mixins: e2, extends: e3 } = e0;
        if (e8) return e8;
        let e1 = e$.appContext.mixins;
        if (!e1.length && !e2 && !e3) return e0;
        let e6 = {};
        return (
          e1.forEach((e0) => Jl(e6, e0, e$)),
          Jl(e6, e0, e$),
          (e0.__merged = e6)
        );
      })(e$),
    $forceUpdate: (e$) => () => It(e$.update),
    $nextTick: (e$) => Lt.bind(e$.proxy),
    $watch: (e$) => Rn.bind(e$),
  }),
  Zl = {
    get({ _: e$ }, e0) {
      let {
        ctx: e8,
        setupState: e2,
        data: e3,
        props: e1,
        accessCache: e6,
        type: e4,
        appContext: e7,
      } = e$;
      if ("__v_skip" === e0) return !0;
      let e5;
      if ("$" !== e0[0]) {
        let eV = e6[e0];
        if (void 0 !== eV)
          switch (eV) {
            case 0:
              return e2[e0];
            case 1:
              return e3[e0];
            case 3:
              return e8[e0];
            case 2:
              return e1[e0];
          }
        else {
          if (e2 !== x && R(e2, e0)) return ((e6[e0] = 0), e2[e0]);
          if (e3 !== x && R(e3, e0)) return ((e6[e0] = 1), e3[e0]);
          if ((e5 = e$.propsOptions[0]) && R(e5, e0))
            return ((e6[e0] = 2), e1[e0]);
          if (e8 !== x && R(e8, e0)) return ((e6[e0] = 3), e8[e0]);
          Fl || (e6[e0] = 4);
        }
      }
      let eN = Yl[e0],
        e9,
        eU;
      return eN
        ? ("$attrs" === e0 && me(e$, 0, e0), eN(e$))
        : (e9 = e4.__cssModules) && (e9 = e9[e0])
          ? e9
          : e8 !== x && R(e8, e0)
            ? ((e6[e0] = 3), e8[e0])
            : R((eU = e7.config.globalProperties), e0)
              ? eU[e0]
              : void 0;
    },
    set({ _: e$ }, e0, e8) {
      let { data: e2, setupState: e3, ctx: e1 } = e$;
      if (e3 !== x && R(e3, e0)) e3[e0] = e8;
      else if (e2 !== x && R(e2, e0)) e2[e0] = e8;
      else if (R(e$.props, e0)) return !1;
      return ("$" !== e0[0] || !(e0.slice(1) in e$)) && ((e1[e0] = e8), !0);
    },
    has(
      {
        _: {
          data: e$,
          setupState: e0,
          accessCache: e8,
          ctx: e2,
          appContext: e3,
          propsOptions: e1,
        },
      },
      e6,
    ) {
      let e4;
      return (
        void 0 !== e8[e6] ||
        (e$ !== x && R(e$, e6)) ||
        (e0 !== x && R(e0, e6)) ||
        ((e4 = e1[0]) && R(e4, e6)) ||
        R(e2, e6) ||
        R(Yl, e6) ||
        R(e3.config.globalProperties, e6)
      );
    },
  },
  Ql = S({}, Zl, {
    get(e$, e0) {
      if (e0 !== Symbol.unscopables) return Zl.get(e$, e0, e$);
    },
    has: (e$, e0) => "_" !== e0[0] && !i(e0),
  }),
  ea = el();
let ta = 0,
  na = null;
const la = () => na || zt,
  aa = (e$) => {
    na = e$;
  };

function sa(e$) {
  return 4 & e$.vnode.shapeFlag;
}
let oa = !1;

function ra(e$, e0, e8) {
  (M(e0) ? (e$.render = e0) : N(e0) && (e$.setupState = pt(e0)), ia(e$));
}

function ia(e$, e0) {
  let e8 = e$.type;
  (e$.render ||
    ((e$.render = e8.render || k),
    e$.render._rc && (e$.withProxy = new Proxy(e$.ctx, Ql))),
    (na = e$),
    pe(),
    zl(e$, e8),
    fe(),
    (na = null));
}

function ca(e$, e0 = na) {
  e0 && (e0.effects || (e0.effects = [])).push(e$);
}

function ua(e$) {
  return (M(e$) && e$.displayName) || e$.name;
}

function da(e$) {
  var e0;
  let e8,
    e2,
    e3 =
      ((e0 = e$),
      M(e0) ? ((e8 = e0), (e2 = k)) : ((e8 = e0.get), (e2 = e0.set)),
      new mt(e8, e2, M(e0) || !e0.set));
  return (ca(e3.effect), e3);
}

function pa(e$, e0, e8) {
  let e2 = arguments.length;
  return 2 === e2
    ? N(e0) && !P(e0)
      ? Al(e0)
        ? Pl(e$, null, [e0])
        : Pl(e$, e0)
      : Pl(e$, null, e0)
    : (e2 > 3
        ? (e8 = Array.prototype.slice.call(arguments, 2))
        : 3 === e2 && Al(e8) && (e8 = [e8]),
      Pl(e$, e0, e8));
}

function fa(e$, e0) {
  let e8;
  if (P(e$) || V(e$)) {
    e8 = Array(e$.length);
    for (let e2 = 0, e3 = e$.length; e2 < e3; e2++) e8[e2] = e0(e$[e2], e2);
  } else if ("number" == typeof e$) {
    e8 = Array(e$);
    for (let e1 = 0; e1 < e$; e1++) e8[e1] = e0(e1 + 1, e1);
  } else if (N(e$)) {
    if (e$[Symbol.iterator]) e8 = Array.from(e$, e0);
    else {
      let e6 = Object.keys(e$);
      e8 = Array(e6.length);
      for (let e4 = 0, e7 = e6.length; e4 < e7; e4++) {
        let e5 = e6[e4];
        e8[e4] = e0(e$[e5], e5, e4);
      }
    }
  } else e8 = [];
  return e8;
}
const ma = "3.0.7",
  ha = "http://www.w3.org/2000/svg",
  ba = "undefined" != typeof document ? document : null;
let ga, va;
const xa = {
    insert(e$, e0, e8) {
      e0.insertBefore(e$, e8 || null);
    },
    remove(e$) {
      let e0 = e$.parentNode;
      e0 && e0.removeChild(e$);
    },
    createElement: (e$, e0, e8) =>
      e0
        ? ba.createElementNS(ha, e$)
        : ba.createElement(
            e$,
            e8
              ? {
                  is: e8,
                }
              : void 0,
          ),
    createText: (e$) => ba.createTextNode(e$),
    createComment: (e$) => ba.createComment(e$),
    setText(e$, e0) {
      e$.nodeValue = e0;
    },
    setElementText(e$, e0) {
      e$.textContent = e0;
    },
    parentNode: (e$) => e$.parentNode,
    nextSibling: (e$) => e$.nextSibling,
    querySelector: (e$) => ba.querySelector(e$),
    setScopeId(e$, e0) {
      e$.setAttribute(e0, "");
    },
    cloneNode: (e$) => e$.cloneNode(!0),
    insertStaticContent(e$, e0, e8, e2) {
      let e3 = e2
        ? va || (va = ba.createElementNS(ha, "svg"))
        : ga || (ga = ba.createElement("div"));
      e3.innerHTML = e$;
      let e1 = e3.firstChild,
        e6 = e1,
        e4 = e6;
      for (; e6; ) ((e4 = e6), xa.insert(e6, e0, e8), (e6 = e3.firstChild));
      return [e1, e4];
    },
  },
  ya = /\s*!important$/;

function ka(e$, e0, e8) {
  if (P(e8)) e8.forEach((e8) => ka(e$, e0, e8));
  else if (e0.startsWith("--")) e$.setProperty(e0, e8);
  else {
    let e2 = (function (e$, e0) {
      let e8 = Ca[e0];
      if (e8) return e8;
      let e2 = G(e0);
      if ("filter" !== e2 && e2 in e$) return (Ca[e0] = e2);
      e2 = J(e2);
      for (let e3 = 0; e3 < wa.length; e3++) {
        let e1 = wa[e3] + e2;
        if (e1 in e$) return (Ca[e0] = e1);
      }
      return e0;
    })(e$, e0);
    ya.test(e8)
      ? e$.setProperty(K(e2), e8.replace(ya, ""), "important")
      : (e$[e2] = e8);
  }
}
const wa = ["Webkit", "Moz", "ms"],
  Ca = {},
  _a = "http://www.w3.org/1999/xlink";
let Aa = Date.now;
"undefined" != typeof document &&
  Aa() > document.createEvent("Event").timeStamp &&
  (Aa = () => performance.now());
let Sa = 0;
const Ta = Promise.resolve(),
  Ea = () => {
    Sa = 0;
  };

function Ra(e$, e0, e8, e2) {
  e$.addEventListener(e0, e8, e2);
}

function Pa(e$, e0, e8, e2, e3 = null) {
  let e1 = e$._vei || (e$._vei = {}),
    e6 = e1[e0];
  if (e2 && e6) e6.value = e2;
  else {
    let [e4, e7] = (function (e$) {
      let e0;
      if (La.test(e$)) {
        let e8;
        for (e0 = {}; (e8 = e$.match(La)); )
          ((e$ = e$.slice(0, e$.length - e8[0].length)),
            (e0[e8[0].toLowerCase()] = !0));
      }
      return [K(e$.slice(2)), e0];
    })(e0);
    e2
      ? Ra(
          e$,
          e4,
          (e1[e0] = (function (e$, e0) {
            let e8 = (e$) => {
              Aa() >= e8.attached - 1 &&
                bt(
                  (function (e$, e0) {
                    if (P(e0)) {
                      let e8 = e$.stopImmediatePropagation;
                      return (
                        (e$.stopImmediatePropagation = () => {
                          (e8.call(e$), (e$._stopped = !0));
                        }),
                        e0.map((e$) => (e0) => !e0._stopped && e$(e0))
                      );
                    }
                    return e0;
                  })(e$, e8.value),
                  e0,
                  5,
                  [e$],
                );
            };
            return (
              (e8.value = e$),
              (e8.attached = Sa || (Ta.then(Ea), (Sa = Aa()))),
              e8
            );
          })(e2, e3)),
          e7,
        )
      : e6 &&
        (!(function (e$, e0, e8, e2) {
          e$.removeEventListener(e0, e8, e2);
        })(e$, e4, e6, e7),
        (e1[e0] = void 0));
  }
}
const La = /(?:Once|Passive|Capture)$/,
  Ia = /^on[a-z]/,
  Oa = (e$, { slots: e0 }) => pa(On, Da(e$), e0);
Oa.displayName = "Transition";
const Ma = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: !0,
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Va = (Oa.props = S({}, On.props, Ma));

function Da(e$) {
  let {
      name: e0 = "v",
      type: e8,
      css: e2 = !0,
      duration: e3,
      enterFromClass: e1 = `${e0}-enter-from`,
      enterActiveClass: e6 = `${e0}-enter-active`,
      enterToClass: e4 = `${e0}-enter-to`,
      appearFromClass: e7 = e1,
      appearActiveClass: e5 = e6,
      appearToClass: eV = e4,
      leaveFromClass: eN = `${e0}-leave-from`,
      leaveActiveClass: e9 = `${e0}-leave-active`,
      leaveToClass: eU = `${e0}-leave-to`,
    } = e$,
    ej = {};
  for (let eD in e$) eD in Ma || (ej[eD] = e$[eD]);
  if (!e2) return ej;
  let ez = (function (e$) {
      if (null == e$) return null;
      if (N(e$)) return [Na(e$.enter), Na(e$.leave)];
      {
        let e0 = Na(e$);
        return [e0, e0];
      }
    })(e3),
    eF = ez && ez[0],
    eB = ez && ez[1],
    {
      onBeforeEnter: eH,
      onEnter: eZ,
      onEnterCancelled: eG,
      onLeave: eq,
      onLeaveCancelled: eW,
      onBeforeAppear: eK = eH,
      onAppear: eX = eZ,
      onAppearCancelled: eY = eG,
    } = ej,
    eQ = (e$, e0, e8) => {
      ($a(e$, e0 ? eV : e4), $a(e$, e0 ? e5 : e6), e8 && e8());
    },
    eJ = (e$, e0) => {
      ($a(e$, eU), $a(e$, e9), e0 && e0());
    },
    t$ = (e$) => (e0, e2) => {
      let e3 = e$ ? eX : eZ,
        e6 = () => eQ(e0, e$, e2);
      (e3 && e3(e0, e6),
        ja(() => {
          ($a(e0, e$ ? e7 : e1),
            Ua(e0, e$ ? eV : e4),
            (e3 && e3.length > 1) || za(e0, e8, eF, e6));
        }));
    };
  return S(ej, {
    onBeforeEnter(e$) {
      (eH && eH(e$), Ua(e$, e1), Ua(e$, e6));
    },
    onBeforeAppear(e$) {
      (eK && eK(e$), Ua(e$, e7), Ua(e$, e5));
    },
    onEnter: t$(!1),
    onAppear: t$(!0),
    onLeave(e$, e0) {
      let e2 = () => eJ(e$, e0);
      (Ua(e$, eN),
        Ga(),
        Ua(e$, e9),
        ja(() => {
          ($a(e$, eN), Ua(e$, eU), (eq && eq.length > 1) || za(e$, e8, eB, e2));
        }),
        eq && eq(e$, e2));
    },
    onEnterCancelled(e$) {
      (eQ(e$, !1), eG && eG(e$));
    },
    onAppearCancelled(e$) {
      (eQ(e$, !0), eY && eY(e$));
    },
    onLeaveCancelled(e$) {
      (eJ(e$), eW && eW(e$));
    },
  });
}

function Na(e$) {
  return ee(e$);
}

function Ua(e$, e0) {
  (e0.split(/\s+/).forEach((e0) => e0 && e$.classList.add(e0)),
    (e$._vtc || (e$._vtc = new Set())).add(e0));
}

function $a(e$, e0) {
  e0.split(/\s+/).forEach((e0) => e0 && e$.classList.remove(e0));
  let { _vtc: e8 } = e$;
  e8 && (e8.delete(e0), e8.size || (e$._vtc = void 0));
}

function ja(e$) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e$);
  });
}
let Fa = 0;

function za(e$, e0, e8, e2) {
  let e3 = (e$._endId = ++Fa),
    e1 = () => {
      e3 === e$._endId && e2();
    };
  if (e8) return setTimeout(e1, e8);
  let { type: e6, timeout: e4, propCount: e7 } = Ba(e$, e0);
  if (!e6) return e2();
  let e5 = e6 + "end",
    eV = 0,
    eN = () => {
      (e$.removeEventListener(e5, e9), e1());
    },
    e9 = (e0) => {
      e0.target === e$ && ++eV >= e7 && eN();
    };
  (setTimeout(() => {
    eV < e7 && eN();
  }, e4 + 1),
    e$.addEventListener(e5, e9));
}

function Ba(e$, e0) {
  let e8 = window.getComputedStyle(e$),
    e2 = (e$) => (e8[e$] || "").split(", "),
    e3 = e2("transitionDelay"),
    e1 = e2("transitionDuration"),
    e6 = Ha(e3, e1),
    e4 = e2("animationDelay"),
    e7 = e2("animationDuration"),
    e5 = Ha(e4, e7),
    eV = null,
    eN = 0,
    e9 = 0;
  return (
    "transition" === e0
      ? e6 > 0 && ((eV = "transition"), (eN = e6), (e9 = e1.length))
      : "animation" === e0
        ? e5 > 0 && ((eV = "animation"), (eN = e5), (e9 = e7.length))
        : (e9 = (eV =
            (eN = Math.max(e6, e5)) > 0
              ? e6 > e5
                ? "transition"
                : "animation"
              : null)
            ? "transition" === eV
              ? e1.length
              : e7.length
            : 0),
    {
      type: eV,
      timeout: eN,
      propCount: e9,
      hasTransform:
        "transition" === eV &&
        /\b(transform|all)(,|$)/.test(e8.transitionProperty),
    }
  );
}

function Ha(e$, e0) {
  for (; e$.length < e0.length; ) e$ = e$.concat(e$);
  return Math.max(...e0.map((e0, e8) => qa(e0) + qa(e$[e8])));
}

function qa(e$) {
  return 1e3 * Number(e$.slice(0, -1).replace(",", "."));
}

function Ga() {
  return document.body.offsetHeight;
}
const Wa = new WeakMap(),
  Ka = new WeakMap(),
  Ja = {
    name: "TransitionGroup",
    props: S({}, Va, {
      tag: String,
      moveClass: String,
    }),
    setup(e$, { slots: e0 }) {
      let e8 = la(),
        e2 = Ln(),
        e3,
        e1;
      return (
        yn(() => {
          if (!e3.length) return;
          let e0 = e$.moveClass || `${e$.name || "v"}-move`;
          if (
            !(function (e$, e0, e8) {
              let e2 = e$.cloneNode();
              (e$._vtc &&
                e$._vtc.forEach((e$) => {
                  e$.split(/\s+/).forEach(
                    (e$) => e$ && e2.classList.remove(e$),
                  );
                }),
                e8.split(/\s+/).forEach((e$) => e$ && e2.classList.add(e$)),
                (e2.style.display = "none"));
              let e3 = 1 === e0.nodeType ? e0 : e0.parentNode;
              e3.appendChild(e2);
              let { hasTransform: e1 } = Ba(e2);
              return (e3.removeChild(e2), e1);
            })(e3[0].el, e8.vnode.el, e0)
          )
            return;
          (e3.forEach(Xa), e3.forEach(Ya));
          let e2 = e3.filter(Za);
          (Ga(),
            e2.forEach((e$) => {
              let e8 = e$.el,
                e2 = e8.style;
              (Ua(e8, e0),
                (e2.transform =
                  e2.webkitTransform =
                  e2.transitionDuration =
                    ""));
              let e3 = (e8._moveCb = (e$) => {
                (e$ && e$.target !== e8) ||
                  (e$ && !/transform$/.test(e$.propertyName)) ||
                  (e8.removeEventListener("transitionend", e3),
                  (e8._moveCb = null),
                  $a(e8, e0));
              });
              e8.addEventListener("transitionend", e3);
            }));
        }),
        () => {
          let e6 = at(e$),
            e4 = Da(e6),
            e7 = e6.tag || bl;
          ((e3 = e1), (e1 = e0.default ? $n(e0.default()) : []));
          for (let e5 = 0; e5 < e1.length; e5++) {
            let eV = e1[e5];
            null != eV.key && Un(eV, Vn(eV, e4, e2, e8));
          }
          if (e3)
            for (let eN = 0; eN < e3.length; eN++) {
              let e9 = e3[eN];
              (Un(e9, Vn(e9, e4, e2, e8)),
                Wa.set(e9, e9.el.getBoundingClientRect()));
            }
          return Pl(e7, null, e1);
        }
      );
    },
  };

function Xa(e$) {
  let e0 = e$.el;
  (e0._moveCb && e0._moveCb(), e0._enterCb && e0._enterCb());
}

function Ya(e$) {
  Ka.set(e$, e$.el.getBoundingClientRect());
}

function Za(e$) {
  let e0 = Wa.get(e$),
    e8 = Ka.get(e$),
    e2 = e0.left - e8.left,
    e3 = e0.top - e8.top;
  if (e2 || e3) {
    let e1 = e$.el.style;
    return (
      (e1.transform = e1.webkitTransform = `translate(${e2}px,${e3}px)`),
      (e1.transitionDuration = "0s"),
      e$
    );
  }
}
const Qa = (e$) => {
  let e0 = e$.props["onUpdate:modelValue"];
  return P(e0) ? (e$) => Z(e0, e$) : e0;
};

function es(e$) {
  e$.target.composing = !0;
}

function ts(e$) {
  let e0 = e$.target;
  e0.composing &&
    ((e0.composing = !1),
    (function (e$, e0) {
      let e8 = document.createEvent("HTMLEvents");
      (e8.initEvent(e0, !0, !0), e$.dispatchEvent(e8));
    })(e0, "input"));
}
const ns = {
    created(e$, { modifiers: { lazy: e0, trim: e8, number: e2 } }, e3) {
      e$._assign = Qa(e3);
      let e1 = e2 || "number" === e$.type;
      (Ra(e$, e0 ? "change" : "input", (e0) => {
        if (e0.target.composing) return;
        let e2 = e$.value;
        (e8 ? (e2 = e2.trim()) : e1 && (e2 = ee(e2)), e$._assign(e2));
      }),
        e8 &&
          Ra(e$, "change", () => {
            e$.value = e$.value.trim();
          }),
        e0 ||
          (Ra(e$, "compositionstart", es),
          Ra(e$, "compositionend", ts),
          Ra(e$, "change", ts)));
    },
    mounted(e$, { value: e0 }) {
      e$.value = null == e0 ? "" : e0;
    },
    beforeUpdate(e$, { value: e0, modifiers: { trim: e8, number: e2 } }, e3) {
      if (
        ((e$._assign = Qa(e3)),
        e$.composing ||
          (document.activeElement === e$ &&
            ((e8 && e$.value.trim() === e0) ||
              ((e2 || "number" === e$.type) && ee(e$.value) === e0))))
      )
        return;
      let e1 = null == e0 ? "" : e0;
      e$.value !== e1 && (e$.value = e1);
    },
  },
  ls = {
    created(e$, e0, e8) {
      ((e$._assign = Qa(e8)),
        Ra(e$, "change", () => {
          var e0;
          let e8 = e$._modelValue,
            e2 = "_value" in (e0 = e$) ? e0._value : e0.value,
            e3 = e$.checked,
            e1 = e$._assign;
          if (P(e8)) {
            let e6 = b(e8, e2),
              e4 = -1 !== e6;
            if (e3 && !e4) e1(e8.concat(e2));
            else if (!e3 && e4) {
              let e7 = [...e8];
              (e7.splice(e6, 1), e1(e7));
            }
          } else if (I(e8)) {
            let e5 = new Set(e8);
            (e3 ? e5.add(e2) : e5.delete(e2), e1(e5));
          } else e1(ss(e$, e3));
        }));
    },
    mounted: as,
    beforeUpdate(e$, e0, e8) {
      ((e$._assign = Qa(e8)), as(e$, e0, e8));
    },
  };

function as(e$, { value: e0, oldValue: e8 }, e2) {
  ((e$._modelValue = e0),
    P(e0)
      ? (e$.checked = b(e0, e2.props.value) > -1)
      : I(e0)
        ? (e$.checked = e0.has(e2.props.value))
        : e0 !== e8 && (e$.checked = h(e0, ss(e$, !0))));
}

function ss(e$, e0) {
  let e8 = e0 ? "_trueValue" : "_falseValue";
  return e8 in e$ ? e$[e8] : e0;
}
const os = ["ctrl", "shift", "alt", "meta"],
  rs = {
    stop: (e$) => e$.stopPropagation(),
    prevent: (e$) => e$.preventDefault(),
    self: (e$) => e$.target !== e$.currentTarget,
    ctrl: (e$) => !e$.ctrlKey,
    shift: (e$) => !e$.shiftKey,
    alt: (e$) => !e$.altKey,
    meta: (e$) => !e$.metaKey,
    left: (e$) => "button" in e$ && 0 !== e$.button,
    middle: (e$) => "button" in e$ && 1 !== e$.button,
    right: (e$) => "button" in e$ && 2 !== e$.button,
    exact: (e$, e0) => os.some((e8) => e$[`${e8}Key`] && !e0.includes(e8)),
  },
  is =
    (e$, e0) =>
    (e8, ...e2) => {
      for (let e3 = 0; e3 < e0.length; e3++) {
        let e1 = rs[e0[e3]];
        if (e1 && e1(e8, e0)) return;
      }
      return e$(e8, ...e2);
    },
  cs = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  us = (e$, e0) => (e8) => {
    if (!("key" in e8)) return;
    let e2 = K(e8.key);
    return e0.some((e$) => e$ === e2 || cs[e$] === e2) ? e$(e8) : void 0;
  },
  ds = {
    beforeMount(e$, { value: e0 }, { transition: e8 }) {
      ((e$._vod = "none" === e$.style.display ? "" : e$.style.display),
        e8 && e0 ? e8.beforeEnter(e$) : ps(e$, e0));
    },
    mounted(e$, { value: e0 }, { transition: e8 }) {
      e8 && e0 && e8.enter(e$);
    },
    updated(e$, { value: e0, oldValue: e8 }, { transition: e2 }) {
      !e0 != !e8 &&
        (e2
          ? e0
            ? (e2.beforeEnter(e$), ps(e$, !0), e2.enter(e$))
            : e2.leave(e$, () => {
                ps(e$, !1);
              })
          : ps(e$, e0));
    },
    beforeUnmount(e$, { value: e0 }) {
      ps(e$, e0);
    },
  };

function ps(e$, e0) {
  e$.style.display = e0 ? e$._vod : "none";
}
const fs = S(
  {
    patchProp(e$, e0, e8, e2, e3 = !1, e1, e6, e4, e7) {
      switch (e0) {
        case "class":
          !(function (e$, e0, e8) {
            if ((null == e0 && (e0 = ""), e8)) e$.setAttribute("class", e0);
            else {
              let e2 = e$._vtc;
              (e2 && (e0 = (e0 ? [e0, ...e2] : [...e2]).join(" ")),
                (e$.className = e0));
            }
          })(e$, e2, e3);
          break;
        case "style":
          !(function (e$, e0, e8) {
            let e2 = e$.style;
            if (e8) {
              if (V(e8)) {
                if (e0 !== e8) {
                  let e3 = e2.display;
                  ((e2.cssText = e8), "_vod" in e$ && (e2.display = e3));
                }
              } else {
                for (let e1 in e8) ka(e2, e1, e8[e1]);
                if (e0 && !V(e0))
                  for (let e6 in e0) null == e8[e6] && ka(e2, e6, "");
              }
            } else e$.removeAttribute("style");
          })(e$, e8, e2);
          break;
        default:
          var e5, eV, eN, e9;
          _(e0)
            ? A(e0) || Pa(e$, e0, 0, e2, e6)
            : ((e5 = e$),
                (eV = e0),
                (eN = e2),
                (e9 = e3)
                  ? "innerHTML" === eV || !!(eV in e5 && Ia.test(eV) && M(eN))
                  : !(
                      "spellcheck" === eV ||
                      "draggable" === eV ||
                      "form" === eV ||
                      ("list" === eV && "INPUT" === e5.tagName) ||
                      ("type" === eV && "TEXTAREA" === e5.tagName) ||
                      (Ia.test(eV) && V(eN))
                    ) && eV in e5)
              ? (function (e$, e0, e8, e2, e3, e1, e6) {
                  if ("innerHTML" === e0 || "textContent" === e0)
                    return (
                      e2 && e6(e2, e3, e1),
                      void (e$[e0] = null == e8 ? "" : e8)
                    );
                  if ("value" !== e0 || "PROGRESS" === e$.tagName) {
                    if ("" === e8 || null == e8) {
                      let e4 = typeof e$[e0];
                      if ("" === e8 && "boolean" === e4)
                        return void (e$[e0] = !0);
                      if (null == e8 && "string" === e4)
                        return ((e$[e0] = ""), void e$.removeAttribute(e0));
                      if ("number" === e4)
                        return ((e$[e0] = 0), void e$.removeAttribute(e0));
                    }
                    try {
                      e$[e0] = e8;
                    } catch (e7) {}
                  } else {
                    e$._value = e8;
                    let e5 = null == e8 ? "" : e8;
                    e$.value !== e5 && (e$.value = e5);
                  }
                })(e$, e0, e2, e1, e6, e4, e7)
              : ("true-value" === e0
                  ? (e$._trueValue = e2)
                  : "false-value" === e0 && (e$._falseValue = e2),
                (function (e$, e0, e8, e2) {
                  if (e2 && e0.startsWith("xlink:"))
                    null == e8
                      ? e$.removeAttributeNS(_a, e0.slice(6, e0.length))
                      : e$.setAttributeNS(_a, e0, e8);
                  else {
                    let e3 = c(e0);
                    null == e8 || (e3 && !1 === e8)
                      ? e$.removeAttribute(e0)
                      : e$.setAttribute(e0, e3 ? "" : e8);
                  }
                })(e$, e0, e2, e3));
      }
    },
    forcePatchProp: (e$, e0) => "value" === e0,
  },
  xa,
);
let ms;
var hs,
  bs = "object" == typeof Reflect ? Reflect : null,
  gs =
    bs && "function" == typeof bs.apply
      ? bs.apply
      : function (e$, e0, e8) {
          return Function.prototype.apply.call(e$, e0, e8);
        };
hs =
  bs && "function" == typeof bs.ownKeys
    ? bs.ownKeys
    : Object.getOwnPropertySymbols
      ? function (e$) {
          return Object.getOwnPropertyNames(e$).concat(
            Object.getOwnPropertySymbols(e$),
          );
        }
      : function (e$) {
          return Object.getOwnPropertyNames(e$);
        };
var vs =
  Number.isNaN ||
  function (e$) {
    return e$ != e$;
  };

function xs() {
  xs.init.call(this);
}
var ys = xs,
  ks = function (e$, e0) {
    return new Promise(function (e8, e2) {
      var e3, e1, e6;

      function e4(e8) {
        (e$.removeListener(e0, e7), e2(e8));
      }

      function e7() {
        ("function" == typeof e$.removeListener &&
          e$.removeListener("error", e4),
          e8([].slice.call(arguments)));
      }
      (Ls(e$, e0, e7, {
        once: !0,
      }),
        "error" !== e0 &&
          ((e3 = e$),
          (e1 = e4),
          (e6 = {
            once: !0,
          }),
          "function" == typeof e3.on && Ls(e3, "error", e1, e6)));
    });
  };
((xs.EventEmitter = xs),
  (xs.prototype._events = void 0),
  (xs.prototype._eventsCount = 0),
  (xs.prototype._maxListeners = void 0));
var ws = 10;

function Cs(e$) {
  if ("function" != typeof e$)
    throw TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof e$,
    );
}

function _s(e$) {
  return void 0 === e$._maxListeners
    ? xs.defaultMaxListeners
    : e$._maxListeners;
}

function As(e$, e0, e8, e2) {
  var e3, e1, e6, e4;
  if (
    (Cs(e8),
    void 0 === (e1 = e$._events)
      ? ((e1 = e$._events = Object.create(null)), (e$._eventsCount = 0))
      : (void 0 !== e1.newListener &&
          (e$.emit("newListener", e0, e8.listener ? e8.listener : e8),
          (e1 = e$._events)),
        (e6 = e1[e0])),
    void 0 === e6)
  )
    ((e6 = e1[e0] = e8), ++e$._eventsCount);
  else if (
    ("function" == typeof e6
      ? (e6 = e1[e0] = e2 ? [e8, e6] : [e6, e8])
      : e2
        ? e6.unshift(e8)
        : e6.push(e8),
    (e3 = _s(e$)) > 0 && e6.length > e3 && !e6.warned)
  ) {
    e6.warned = !0;
    var e7 = Error(
      "Possible EventEmitter memory leak detected. " +
        e6.length +
        " " +
        String(e0) +
        " listeners added. Use emitter.setMaxListeners() to increase limit",
    );
    ((e7.name = "MaxListenersExceededWarning"),
      (e7.emitter = e$),
      (e7.type = e0),
      (e7.count = e6.length),
      (e4 = e7),
      console && console.warn && console.warn(e4));
  }
  return e$;
}

function Ss() {
  if (!this.fired)
    return (
      this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      0 === arguments.length
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments)
    );
}

function Ts(e$, e0, e8) {
  var e2 = {
      fired: !1,
      wrapFn: void 0,
      target: e$,
      type: e0,
      listener: e8,
    },
    e3 = Ss.bind(e2);
  return ((e3.listener = e8), (e2.wrapFn = e3), e3);
}

function Es(e$, e0, e8) {
  var e2 = e$._events;
  if (void 0 === e2) return [];
  var e3 = e2[e0];
  return void 0 === e3
    ? []
    : "function" == typeof e3
      ? e8
        ? [e3.listener || e3]
        : [e3]
      : e8
        ? (function (e$) {
            for (var e0 = Array(e$.length), e8 = 0; e8 < e0.length; ++e8)
              e0[e8] = e$[e8].listener || e$[e8];
            return e0;
          })(e3)
        : Ps(e3, e3.length);
}

function Rs(e$) {
  var e0 = this._events;
  if (void 0 !== e0) {
    var e8 = e0[e$];
    if ("function" == typeof e8) return 1;
    if (void 0 !== e8) return e8.length;
  }
  return 0;
}

function Ps(e$, e0) {
  for (var e8 = Array(e0), e2 = 0; e2 < e0; ++e2) e8[e2] = e$[e2];
  return e8;
}

function Ls(e$, e0, e8, e2) {
  if ("function" == typeof e$.on) e2.once ? e$.once(e0, e8) : e$.on(e0, e8);
  else {
    if ("function" != typeof e$.addEventListener)
      throw TypeError(
        'The "emitter" argument must be of type EventEmitter. Received type ' +
          typeof e$,
      );
    e$.addEventListener(e0, function e3(e1) {
      (e2.once && e$.removeEventListener(e0, e3), e8(e1));
    });
  }
}

function Is(e$) {
  return new Date(1e3 * e$).toLocaleTimeString("pt-BR").substring(0, 5);
}
(Object.defineProperty(xs, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return ws;
  },
  set: function (e$) {
    if ("number" != typeof e$ || e$ < 0 || vs(e$))
      throw RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          e$ +
          ".",
      );
    ws = e$;
  },
}),
  (xs.init = function () {
    ((void 0 !== this._events &&
      this._events !== Object.getPrototypeOf(this)._events) ||
      ((this._events = Object.create(null)), (this._eventsCount = 0)),
      (this._maxListeners = this._maxListeners || void 0));
  }),
  (xs.prototype.setMaxListeners = function (e$) {
    if ("number" != typeof e$ || e$ < 0 || vs(e$))
      throw RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          e$ +
          ".",
      );
    return ((this._maxListeners = e$), this);
  }),
  (xs.prototype.getMaxListeners = function () {
    return _s(this);
  }),
  (xs.prototype.emit = function (e$) {
    for (var e0 = [], e8 = 1; e8 < arguments.length; e8++)
      e0.push(arguments[e8]);
    var e2 = "error" === e$,
      e3 = this._events;
    if (void 0 !== e3) e2 = e2 && void 0 === e3.error;
    else if (!e2) return !1;
    if (e2) {
      if ((e0.length > 0 && (e1 = e0[0]), e1 instanceof Error)) throw e1;
      var e1,
        e6 = Error("Unhandled error." + (e1 ? " (" + e1.message + ")" : ""));
      throw ((e6.context = e1), e6);
    }
    var e4 = e3[e$];
    if (void 0 === e4) return !1;
    if ("function" == typeof e4) gs(e4, this, e0);
    else {
      var e7 = e4.length,
        e5 = Ps(e4, e7);
      for (e8 = 0; e8 < e7; ++e8) gs(e5[e8], this, e0);
    }
    return !0;
  }),
  (xs.prototype.addListener = function (e$, e0) {
    return As(this, e$, e0, !1);
  }),
  (xs.prototype.on = xs.prototype.addListener),
  (xs.prototype.prependListener = function (e$, e0) {
    return As(this, e$, e0, !0);
  }),
  (xs.prototype.once = function (e$, e0) {
    return (Cs(e0), this.on(e$, Ts(this, e$, e0)), this);
  }),
  (xs.prototype.prependOnceListener = function (e$, e0) {
    return (Cs(e0), this.prependListener(e$, Ts(this, e$, e0)), this);
  }),
  (xs.prototype.removeListener = function (e$, e0) {
    var e8, e2, e3, e1, e6;
    if ((Cs(e0), void 0 === (e2 = this._events) || void 0 === (e8 = e2[e$])))
      return this;
    if (e8 === e0 || e8.listener === e0)
      0 == --this._eventsCount
        ? (this._events = Object.create(null))
        : (delete e2[e$],
          e2.removeListener &&
            this.emit("removeListener", e$, e8.listener || e0));
    else if ("function" != typeof e8) {
      for (e3 = -1, e1 = e8.length - 1; e1 >= 0; e1--)
        if (e8[e1] === e0 || e8[e1].listener === e0) {
          ((e6 = e8[e1].listener), (e3 = e1));
          break;
        }
      if (e3 < 0) return this;
      (0 === e3
        ? e8.shift()
        : (function (e$, e0) {
            for (; e0 + 1 < e$.length; e0++) e$[e0] = e$[e0 + 1];
            e$.pop();
          })(e8, e3),
        1 === e8.length && (e2[e$] = e8[0]),
        void 0 !== e2.removeListener &&
          this.emit("removeListener", e$, e6 || e0));
    }
    return this;
  }),
  (xs.prototype.off = xs.prototype.removeListener),
  (xs.prototype.removeAllListeners = function (e$) {
    var e0, e8, e2;
    if (void 0 === (e8 = this._events)) return this;
    if (void 0 === e8.removeListener)
      return (
        0 === arguments.length
          ? ((this._events = Object.create(null)), (this._eventsCount = 0))
          : void 0 !== e8[e$] &&
            (0 == --this._eventsCount
              ? (this._events = Object.create(null))
              : delete e8[e$]),
        this
      );
    if (0 === arguments.length) {
      var e3,
        e1 = Object.keys(e8);
      for (e2 = 0; e2 < e1.length; ++e2)
        "removeListener" !== (e3 = e1[e2]) && this.removeAllListeners(e3);
      return (
        this.removeAllListeners("removeListener"),
        (this._events = Object.create(null)),
        (this._eventsCount = 0),
        this
      );
    }
    if ("function" == typeof (e0 = e8[e$])) this.removeListener(e$, e0);
    else if (void 0 !== e0)
      for (e2 = e0.length - 1; e2 >= 0; e2--) this.removeListener(e$, e0[e2]);
    return this;
  }),
  (xs.prototype.listeners = function (e$) {
    return Es(this, e$, !0);
  }),
  (xs.prototype.rawListeners = function (e$) {
    return Es(this, e$, !1);
  }),
  (xs.listenerCount = function (e$, e0) {
    return "function" == typeof e$.listenerCount
      ? e$.listenerCount(e0)
      : Rs.call(e$, e0);
  }),
  (xs.prototype.listenerCount = Rs),
  (xs.prototype.eventNames = function () {
    return this._eventsCount > 0 ? hs(this._events) : [];
  }),
  (ys.once = ks));
const Os = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
  Ms = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ],
  Vs = [
    "Janeiro",
    "Fevereiro",
    "Mar\xe7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  Ds = Vs.map((e$) => e$.toUpperCase());

function Ns(e$, e0) {
  return e$.length > e0 ? e$.substring(0, e0) + "..." : e$;
}

function Us(e$) {
  let e0 = e$ instanceof Date ? e$ : new Date(1e3 * e$);
  return [
    [e0.getDate(), Vs[e0.getMonth()].substr(0, 3), e0.getFullYear() - 2e3].join(
      " ",
    ),
    Is(e$),
  ];
}

function $s(e$, e0) {
  let e8 = e$.length;
  for (; e8--; ) e0(e$[e8], e8) && e$.splice(e8, 1);
}

function js(e$) {
  let e0 = So.settings.currency || "R$",
    e8 = Math.abs(Math.ceil(e$)).toLocaleString("pt-BR");
  return e$ < 0 ? "-" + e0 + " " + e8 : e0 + " " + e8;
}

function Fs(e$) {
  return e$ && e$[0].toUpperCase() + e$.substr(1);
}

function zs(e$) {
  return String(e$).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function Bs(e$, e0 = "Voc\xea") {
  var e8;
  return e$ === So.identity.phone
    ? e0
    : (null == (e8 = So.contacts.value.find((e0) => e0.phone === e$))
        ? void 0
        : e8.name) || e$;
}
const Hs = new Proxy(
  {},
  {
    get: (e$, e0) => Zs(e0),
  },
);

function qs(e$, e0, e8) {
  return e8.indexOf(e$) == e0;
}
var Gs = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      isAudio: function (e$) {
        return e$.match(/\.(ogg|webm)$/);
      },
      unixToHHMM: Is,
      unixToDate: function (e$) {
        return new Date(1e3 * e$).toLocaleString("pt-BR").substring(0, 10);
      },
      unixToLocale: function (e$) {
        let e0 = new Date(1e3 * e$);
        return `${Os[e0.getDay()]}, ${e0.getDate()} de ${
          Ms[e0.getMonth()]
        }, ${Is(e$)}`;
      },
      unixToRelative: function (e$) {
        let { abs: e0, floor: e8 } = Math,
          e2 = e0(e$ - e8(Date.now() / 1e3));
        return e2 < 60
          ? "Agora"
          : e2 < 3600
            ? e8(e2 / 60) + "min"
            : e2 < 86400
              ? e8(e2 / 3600) + "h"
              : e8(e2 / 86400) + "d";
      },
      unixToDatetime: function (e$) {
        return new Date(1e3 * e$).toLocaleString("pt-BR");
      },
      duration: function (e$) {
        let e0 = e$ >= 3600;
        return new Date(1e3 * e$)
          .toISOString()
          .substr(e0 ? 11 : 14, e0 ? 8 : 5);
      },
      fancyMonths: Vs,
      upperMonths: Ds,
      unixToDayOfMonth: function (e$) {
        let e0 = e$ instanceof Date ? e$ : new Date(1e3 * e$);
        return e0.getDate() + " DE " + Ds[e0.getMonth()];
      },
      ellipsis: Ns,
      unixToTwitter: Us,
      moneyStringToInt: function (e$) {
        return parseInt(e$.replace(/\D/g, "") || 0).toLocaleString("pt-BR");
      },
      vdist: function ([e$, e0, e8], [e2, e3, e1], e6 = !1) {
        return Math.round(
          Math.sqrt((e$ - e2) ** 2 + (e0 - e3) ** 2 + (e6 ? e8 - e1 : 0) ** 2),
        );
      },
      vdist2: function (...e$) {
        let e0 = this.vdist(...e$);
        return e0 > 1e3 ? Math.round(e0 / 100) / 10 + "km" : e0 + "m";
      },
      removeIf: $s,
      intToMoney: js,
      ucfirst: Fs,
      safeHTML: zs,
      getNameByPhone: Bs,
      nameByApp: Hs,
      arrayUnique: qs,
    },
    Symbol.toStringTag,
    {
      value: "Module",
    },
  ),
);

function Ws(e$) {
  var e0;
  let e8 = null == (e0 = So.settings.apps) ? void 0 : e0[e$];
  return "string" == typeof e8
    ? [null, e8]
    : [null == e8 ? void 0 : e8.name, null == e8 ? void 0 : e8.icon];
}

function Ks(e$, e0, e8, e2, e3) {
  var e1;
  let [e6, e4] = Ws(e$);
  return (
    null != e3 ||
      (e3 = !(null == (e1 = So.settings.disabledApps)
        ? void 0
        : e1.includes(e$))),
    {
      entry: e$,
      name: null != e6 ? e6 : e8,
      icon: null != e4 ? e4 : e2,
      to: e0,
      enabled: e3,
    }
  );
}
const Js = {
  picpay: "PicPay",
  hype: "Hype Bank",
  itau: "Ita\xfa",
  nubank: "Nubank",
  fleeca: "Fleeca",
  nxbank: "Nxbank",
  bb: "Banco do Brasil",
};
let Xs = [];

function Ys() {
  var e$;
  if (Xs.length) return Xs;
  let e0 = (e$) => So.asset("/apps/" + e$);
  return (Xs = [
    Ks("settings", "/settings", "", e0("settings.png"), !0),
    Ks("contacts", "/contacts", "", e0("phone.png"), !0),
    Ks("sms", "/sms", "", e0("sms.webp"), !0),
    Ks("gallery", "/gallery", "", e0("photos.webp"), !0),
    Ks("whatsapp", "/whatsapp", "WhatsApp", e0("whatsapp.jpg")),
    Ks("tor", "/tor", "TOR", e0("tor.jpg")),
    Ks("instagram", "/instagram/login", "Instagram", e0("instagram.jpg")),
    Ks("twitter", "/twitter", "Twitter", e0("twitter.png")),
    Ks(
      "bank",
      "/bank",
      Js[So.settings.bankType.replace(/\d/g, "")],
      e0(So.settings.bankType.toLowerCase() + ".webp"),
    ),
    // Ks("paypal", "/paypal", "PayPal", e0("paypal.webp")), // PayPal removido
    Ks("olx", "/olx", "OLX", e0("olx.png")),
    Ks("tinder", "/tinder", "Tinder", e0("tinder.webp")),
    // Ks("yellowpages", "/yellowpages", "Yellow Pages", e0("yellowpages.webp")), // Yellow Pages removido
    ...Object.keys(null != (e$ = So.settings.customApps) ? e$ : []).map((e$) =>
      Ks(e$, "/custom/" + e$, Fs(e$), e0("settings.png")),
    ),
    Ks("weazel", "/weazel", "Weazel News", e0("weazel.webp")),
    // Ks("casino", "/casino", "Blaze", e0("blaze.webp")), // Cassino removido
    Ks("calculator", "/calculator", "Calculadora", e0("calculator.webp")),
    Ks("notes", "/notes", "Anota\xe7\xf5es", e0("notes.webp")),
    Ks("minesweeper", "/minesweeper", "Campo Minado", e0("minesweeper.webp")),
    Ks("truco", "/truco", "Truco", e0("truco.webp")),
    // Ks("uber", "/uber", "Uber", e0("uber.webp")), // Uber removido
  ]
    .filter((e$) => (null == e$ ? void 0 : e$.enabled))
    .map((e$, e0) =>
      s(s({}, e$), {
        bottom: e0 < 4,
      }),
    ));
}

function Zs(e$) {
  var e0;
  return null == (e0 = Ys().find((e0) => e0.entry == e$)) ? void 0 : e0.name;
}
const Qs = {
  get gps() {
    var e$;
    return null != (e$ = Ws("gps")[1]) ? e$ : So.asset("/apps/waze.webp");
  },
  get phone() {
    var e0;
    return null != (e0 = Ws("phone")[1]) ? e0 : So.asset("/apps/phone.png");
  },
  get facetime() {
    var e8;
    return null != (e8 = Ws("facetime")[1])
      ? e8
      : So.asset("/apps/facetime.webp");
  },
};

function eo(e$) {
  return new Promise((e0) => setTimeout(e0, e$));
}

async function uploadToCatbox(file, extension) {
  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", file, `${Date.now()}.${extension}`);
  formData.append("userhash", "7df65496863436c4d38169363");

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
  });

  const data = await response.text();
  if (data.startsWith("https://")) return data;
  throw new Error("Erro ao enviar para Catbox: " + data);
}

async function uploadVideoToCatbox(file) {
  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", file, "camera.webm");
  formData.append("userhash", "7df65496863436c4d38169363");

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
  });

  const data = await response.text();
  if (data.startsWith("https://")) {
    console.log("✅ Upload concluído:", data);
    return data;
  } else {
    console.error("❌ Erro no Catbox:", data);
    throw new Error(data);
  }
}

var to = {
  async upload(file, extension) {
    try {
      const url = await uploadToCatbox(file, extension);
      return url;
    } catch (err) {
      console.error("❌ Falha no upload:", err);
      So.alert("Falha ao enviar arquivo para o Catbox!");
      return null;
    }
  },
  async uploadVideo(file) {
    try {
      const url = await uploadVideoToCatbox(file);
      return url;
    } catch (err) {
      console.error("Erro no upload de vídeo:", err);
      So.alert("Falha ao enviar vídeo para o Catbox!");
      return null;
    }
  },
};

function no(e$, e0, e8) {
  let e2 = e$.createShader(e0);
  (e$.shaderSource(e2, e8), e$.compileShader(e2));
  let e3 = e$.getShaderInfoLog(e2);
  return (e3 && console.error(e3), e2);
}
class lo {
  constructor(e$) {
    ((this.canvas = e$),
      (this.gl = e$.getContext("webgl", {
        antialias: !1,
        depth: !1,
        stencil: !1,
        alpha: !1,
        desynchronized: !0,
        failIfMajorPerformanceCaveat: !1,
      })),
      (this.animationFrame = void 0),
      this.createStuff(),
      this.render(),
      (this.running = !0));
  }
  createStuff() {
    if (!this.gl) {
      for (let e$ = 0; e$ < 10; e$ += 1)
        console.log(
          "Voc\xea est\xe1 bugado! N\xe3o poss\xedvel criar o contexto WebGL, este problema n\xe3o tem corre\xe7\xe3o",
        );
      return;
    }
    let e0 = this.gl,
      e8 = (function (e$) {
        let e0 = e$.createTexture(),
          e8 = new Uint8Array([0, 0, 255, 255]);
        return (
          e$.bindTexture(e$.TEXTURE_2D, e0),
          e$.texImage2D(
            e$.TEXTURE_2D,
            0,
            e$.RGBA,
            1,
            1,
            0,
            e$.RGBA,
            e$.UNSIGNED_BYTE,
            e8,
          ),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_MAG_FILTER, e$.NEAREST),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_MIN_FILTER, e$.NEAREST),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_WRAP_S, e$.CLAMP_TO_EDGE),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_WRAP_T, e$.CLAMP_TO_EDGE),
          e$.texParameterf(
            e$.TEXTURE_2D,
            e$.TEXTURE_WRAP_T,
            e$.MIRRORED_REPEAT,
          ),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_WRAP_T, e$.REPEAT),
          e$.texParameterf(e$.TEXTURE_2D, e$.TEXTURE_WRAP_T, e$.CLAMP_TO_EDGE),
          e0
        );
      })(e0),
      {
        program: e2,
        vloc: e3,
        tloc: e1,
      } = (function (e$) {
        let e0 = no(
            e$,
            e$.VERTEX_SHADER,
            "\n  attribute vec2 a_position;\n  attribute vec2 a_texcoord;\n  uniform mat3 u_matrix;\n  varying vec2 textureCoordinate;\n  void main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n    textureCoordinate = a_texcoord;\n  }\n",
          ),
          e8 = no(
            e$,
            e$.FRAGMENT_SHADER,
            "\nvarying highp vec2 textureCoordinate;\nuniform sampler2D external_texture;\nvoid main()\n{\n  gl_FragColor = texture2D(external_texture, textureCoordinate);\n}\n",
          ),
          e2 = e$.createProgram();
        return (
          e$.attachShader(e2, e0),
          e$.attachShader(e2, e8),
          e$.linkProgram(e2),
          e$.useProgram(e2),
          {
            program: e2,
            vloc: e$.getAttribLocation(e2, "a_position"),
            tloc: e$.getAttribLocation(e2, "a_texcoord"),
          }
        );
      })(e0),
      { vertexBuff: e6, texBuff: e4 } = (function (e$) {
        let e0 = e$.createBuffer();
        (e$.bindBuffer(e$.ARRAY_BUFFER, e0),
          e$.bufferData(
            e$.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            e$.STATIC_DRAW,
          ));
        let e8 = e$.createBuffer();
        return (
          e$.bindBuffer(e$.ARRAY_BUFFER, e8),
          e$.bufferData(
            e$.ARRAY_BUFFER,
            new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            e$.STATIC_DRAW,
          ),
          {
            vertexBuff: e0,
            texBuff: e8,
          }
        );
      })(e0);
    (e0.useProgram(e2),
      e0.bindTexture(e0.TEXTURE_2D, e8),
      e0.uniform1i(e0.getUniformLocation(e2, "external_texture"), 0),
      e0.bindBuffer(e0.ARRAY_BUFFER, e6),
      e0.vertexAttribPointer(e3, 2, e0.FLOAT, !1, 0, 0),
      e0.enableVertexAttribArray(e3),
      e0.bindBuffer(e0.ARRAY_BUFFER, e4),
      e0.vertexAttribPointer(e1, 2, e0.FLOAT, !1, 0, 0),
      e0.enableVertexAttribArray(e1),
      e0.viewport(0, 0, e0.canvas.width, e0.canvas.height));
  }
  resize(e$, e0) {
    this.gl &&
      (this.gl.viewport(0, 0, e$, e0),
      (this.gl.canvas.width = e$),
      (this.gl.canvas.height = e0));
  }
  render() {
    var e$;
    !this.kill &&
      this.gl &&
      (this.running &&
        (this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4),
        this.gl.finish(),
        null == (e$ = this.onrender) || e$.call(this, this.canvas)),
      (this.animationFrame = requestAnimationFrame(this.render.bind(this))));
  }
}
const ao = document.createElement("canvas");
((ao.width = 1920), (ao.height = 1080));
const so = new lo(ao);
so.running = !1;
let oo = 0;
var ro = {
  get running() {
    return so.running;
  },
  canvas: ao,
  get delta() {
    return oo;
  },
  set delta(e) {
    ((oo = e), (so.running = oo > 0));
  },
  start() {
    this.delta += 1;
  },
  stop() {
    this.delta -= 1;
  },
  createBlob: (e$ = 0.8, e0 = "image/jpeg") =>
    new Promise((e8) => so.canvas.toBlob(e8, e0, e$)),
  createDataURL: (e$ = 0.8, e0 = "image/jpeg") => so.canvas.toDataURL(e0, e$),
  createStream: () => so.canvas.captureStream(24),
};
const io = Ze({
  original: null,
  formats: ["landscape", "portrait", "selfie"],
  ondiscard: null,
  onproceed: null,
  request(e$ = !1, e0 = "/") {
    return So.localhost
      ? Promise.resolve(
          e$
            ? "https://i.pinimg.com/564x/a6/d4/30/a6d4302b399cc1dc1e682f08f20bf2f4.jpg"
            : "https://c.wallhere.com/photos/b1/5e/GTA5_GTA_Online_GTA_Landscape_GTA_Photography_trees_sunrise_Grand_Theft_Auto_V_Grand_Theft_Auto_V_Online-1945677.jpg!d",
        )
      : (ro.start(),
        So.pusher.once("CONFIRM_SCREENSHOT", async () => {
          this.original = await ro.createBlob();
          let e$ = new Audio(So.asset("/stock/photo.ogg"));
          ((e$.volume = 0.25),
            e$.play(),
            fetch("http://smartphone/screenshot", {
              method: "POST",
            }));
        }),
        (this.formats = e$ ? ["selfie"] : ["landscape", "portrait", "selfie"]),
        new Promise((e8, e2) => {
          ((So.visible.value = !1),
            So.client.close(),
            So.client.takePhoto(!!e$).then(async (e$) => {
              if ((ro.stop(), So.client.open(), e$)) {
                for (; !this.original; ) await uo(50);
                ((this.ondiscard = () => {
                  ((this.original = null), e2("Photo discarded"));
                }),
                  (this.onproceed = (e$) => {
                    to.upload(e$, "jpg")
                      .then(
                        (e$) => {
                          (So.backend.gallery_save(e0, e$).then((e$) => {
                            (So.gallery.push(e$),
                              So.gallery.sort((e$, e0) => e0.id - e$.id));
                          }),
                            e8(e$));
                        },
                        (e$) => {
                          (e2(e$),
                            console.error(
                              "Falha ao realizar upload de imagem",
                              e$.message,
                            ));
                        },
                      )
                      .finally(() => (this.original = null));
                  }));
              } else e2("Camera rejected");
            }));
        }));
  },
});

function co(...e$) {
  return e$.length ? io.request(...e$) : io;
}

function uo(e$) {
  return new Promise((e0) => setTimeout(e0, e$));
}
const po = rt();

function fo() {
  return new Promise((e$, e0) => {
    po.value = (e8) => (e8 ? e$(e8) : e0());
  });
}

function mo() {
  return {
    "/": "C\xe2mera",
    "/whatsapp": Zs("whatsapp"),
    "/tor": Zs("tor"),
    "/instagram": Zs("instagram"),
    "/olx": Zs("olx"),
    "/tinder": Zs("tinder"),
    "/downloads": "Downloads",
    "/videos": "V\xeddeos",
  };
}
var ho = {
  callback: po,
};
window.addEventListener("popstate", () => (bo.state.request.value = null));
const bo = {
    clearAndRequest(e$, e0 = 25, e8 = !1) {
      return ((this.state.request.value = null), this.request(e$, e0, e8));
    },
    request(e$, e0 = 25, e8 = !1) {
      return new Promise((e2, e3) => {
        this.state.request.value ||
          (Array.isArray(e$)
            ? (this.state.request.value = {
                options: e$.filter(Boolean).map((e$, e0) => {
                  var e8;
                  return Array.isArray(e$)
                    ? {
                        key: e$.length >= 3 ? e$[0] : e0,
                        display: e$.length >= 3 ? e$[1] : e$[0],
                        classes: e$.length >= 3 ? e$[2] : e$[1] || [],
                      }
                    : {
                        key: null != (e8 = e$.key) ? e8 : e0,
                        html: null == e$ ? void 0 : e$.html,
                        display: e$,
                      };
                }),
                size: e0,
                resolve: e2,
                reject: e3,
                emptyAsError: e8,
              })
            : (this.state.request.value = {
                options: Object.entries(e$).map((e$) => ({
                  key: e$[0],
                  display: e$[1],
                })),
                size: e0,
                resolve: e2,
                reject: e3,
                emptyAsError: e8,
              }));
      });
    },
    state: {
      request: rt(),
    },
  },
  go = () => bo;

function vo(e$) {
  return new Proxy(
    {},
    {
      get: (e0, e8) =>
        e0[e8] ||
        (e0[e8] = function (...e0) {
          return new Promise((e2, e3) => {
            fetch("http://smartphone/" + e$, {
              method: "POST",
              body: JSON.stringify({
                member: e8,
                args: e0,
              }),
            })
              .then((e$) => e$.json())
              .then((e$) => {
                e$ && e$.__null__ ? e2(null) : e2(e$);
              })
              .catch((e2) => {
                (e3(e2),
                  console.error(
                    "Rejected: " + e$,
                    e8,
                    JSON.stringify(e0),
                    (null == e2 ? void 0 : e2.message) || e2,
                  ));
              });
          });
        }),
    },
  );
}
const xo = vo("client"),
  yo = (e$) => "./assets" + e$,
  ko = new ys();
ko.setMaxListeners(300);
const wo = {
  volume: rt(
    Number(localStorage.getItem("smartphone@notificationVolume") || 50),
  ),
  doNotDisturb: rt("true" == localStorage.getItem("smartphone@doNotDisturb")),
  darkTheme: rt("true" == localStorage.getItem("smartphone@darkTheme")),
  anonymousCall: rt("true" == localStorage.getItem("smartphone@anonymousCall")),
  get(e$, e0) {
    let e8 = localStorage.getItem("smartphone@" + e$);
    return null != e8 ? e8 : e0;
  },
  set: (e$, e0) => localStorage.setItem("smartphone@" + e$, e0),
};

function Co(e$) {
  (wo.set("darkTheme", e$),
    document.documentElement.classList.toggle("dark", !!e$));
}
(Tn(wo.volume, (e$) => wo.set("notificationVolume", e$)),
  Tn(wo.doNotDisturb, (e$) => wo.set("doNotDisturb", String(!!e$))),
  Tn(wo.darkTheme, (e$) => Co(e$)),
  Tn(wo.anonymousCall, (e$) => wo.set("anonymousCall", String(!!e$))),
  document.documentElement.classList.toggle("dark", wo.darkTheme.value));
const _o = [];
ko.on("Route:afterEach", () => {
  let e$ = _o.splice(0, _o.length);
  for (let [e0, e8] of e$) ko.removeListener(e0, e8);
});
const Ao = {
  asset: yo,
  bankLock: !1,
  lockAndProceed(e$) {
    this.bankLock ||
      ((this.bankLock = !0),
      Promise.resolve(e$()).finally(() => (this.bankLock = !1)));
  },
  clock: rt({
    hours: "00",
    minutes: "00",
  }),
  visible: rt(!1),
  loaded: rt(!1),
  microphone: rt(),
  debug(...e$) {
    (this.localhost || globalThis.$smartphoneDebug) && console.log(...e$);
  },
  setDark: Co,
  darkTheme: wo.darkTheme,
  captureMicrophone() {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          autoGainControl: !1,
        },
      })
      .then(
        (e$) => (this.microphone.value = e$),
        () => {},
      );
  },
  currentCall: rt(),
  localhost: !window.hasOwnProperty("invokeNative"),
  identity: Ze({}),
  messages: Ze({}),
  gallery: Ze([]),
  contacts: rt([]),
  sortContacts() {
    this.contacts.value.sort((e$, e0) => e$.name.localeCompare(e0.name));
  },
  settings: Ze({
    zoom: 100,
    bankType: "nubank",
    case: "iphonexs",
    allowUnsafeURL: !1,
    uploadServer: "",
    ringSound: yo("/stock/ring.mp3"),
    dialSound: yo("/stock/dial.mp3"),
    notificationSound: yo("/stock/notification.mp3"),
    instagramLogo:
      null != (e = globalThis.instagramLogo)
        ? e
        : yo("/apps/instagram_hand.png"),
    blocks: [],
    currency: "R$",
  }),
  isDisabled(e$) {
    var e0;
    return null == (e0 = this.settings.disabledApps) ? void 0 : e0.includes(e$);
  },
  backend: vo("backend"),
  backgroundURL: localStorage.getItem("smartphone@background"),
  client: xo,
  pusher: ko,
  onceRoute(e$, e0) {
    (this.pusher.on(e$, e0), _o.push([e$, e0]));
  },
  notifications: Ze([]),
  storage: wo,
  addNotification(e$, e0, e8) {
    var e2, e3, e1, e6, e4, e7;
    let e5 = this.notifications,
      eV = {
        id:
          (null != (e2 = e5.map((e$) => e$.id).sort((e$, e0) => e0 - e$)[0])
            ? e2
            : 0) + 1,
        icon:
          null != (e7 = Qs[(e6 = e$)])
            ? e7
            : null == (e4 = Ys().find((e$) => e$.entry == e6))
              ? void 0
              : e4.icon,
        title: e0,
        subtitle: e8,
      };
    if (
      (e5.push(eV),
      setTimeout(
        () => {
          let e$ = e5.indexOf(eV);
          -1 != e$ && e5.splice(e$, 1);
        },
        null !=
          (e1 = null == (e3 = this.settings.notificationSpan) ? void 0 : e3[e$])
          ? e1
          : 5e3,
      ),
      "phone" != e$)
    ) {
      let eN = new Audio(this.settings.notificationSound);
      ((eN.volume = this.getNotificationVolume() / 100),
        (eN.currentTime = 0),
        eN.play());
    }
  },
  getNotificationVolume: () =>
    parseInt(localStorage.getItem("smartphone@notificationVolume") || 50),
  setNotificationVolume(e$) {
    localStorage.setItem("smartphone@notificationVolume", e$);
  },
  hasNotificationFor: (e$) =>
    "false" !=
    localStorage.getItem(`smartphone@notification_${e$.toLowerCase()}`),
  setNotificationFor(e$, e0) {
    localStorage.setItem(
      `smartphone@notification_${e$.toLowerCase()}`,
      JSON.stringify(!!e0),
    );
  },
  created() {
    (this.backend.getSettings().then((e$) => {
      var { identity: e0, contacts: e8 } = e$,
        e2 = o(e$, ["identity", "contacts"]);
      for (let e3 in e0) this.identity[e3] = e0[e3];
      ((this.contacts.value = e8),
        this.sortContacts(),
        Object.assign(this.settings, e2),
        e2.isAndroid && (document.documentElement.style.fontFamily = "Roboto"),
        (Xs.length = 0),
        Ys(),
        e2.forceBackground
          ? (this.backgroundURL = e2.backgroundURL)
          : this.backgroundURL ||
            (this.backgroundURL =
              e2.backgroundURL || yo("/stock/wallpapers/default.webp")));
    }),
      (this.settings.zoom =
        parseInt(localStorage.getItem("smartphone@zoom")) || 100),
      this.updateZoom(),
      this.localhost &&
        ((this.settings.case = "iphone14pro"),
        (this.settings.isAndroid = !1),
        (document.documentElement.style.fontFamily = "Roboto"),
        (this.settings.backgroundURL = yo("/stock/wallpapers/s20.webp")),
        (this.settings.bankType = "bb"),
        (this.identity = {
          name: "Will",
          firstname: "Dev",
          user_id: 1,
          phone: "111-111",
        }),
        (this.currentCall.value = {
          contact: {
            phone: "000-000",
            name: "Bruno",
          },
        }),
        this.contacts.value.push(
          ...Array(90)
            .fill(0)
            .map((e$, e0) => ({
              id: e0 + 1,
              name: "Fake " + (e0 + 1),
              phone: "000-0" + String(e0 + 1).padStart(2, 0),
            })),
        )));
  },
  ready() {
    (this.pusher.on("ADD_CONTACT", () => this.sortContacts()),
      this.settings.useGameClock
        ? this.pusher.on("TIME", (e$) => (this.clock.value = e$))
        : setInterval(() => {
            let e$ = new Date(),
              e0 = this.clock.value;
            ((e0.hours = String(e$.getHours()).padStart(2, 0)),
              (e0.minutes = String(e$.getMinutes()).padStart(2, 0)));
          }, 1e3));
  },
  fetchSettings() {
    let e$ = setInterval(() => {
      this.identity.user_id && this.identity.phone
        ? clearInterval(e$)
        : this.created();
    }, 2500);
  },
  updateZoom() {
    let e$ = (this.settings.zoom / 100) * 8;
    document.querySelector("html").style.fontSize = e$ + "px";
  },
  getPlayerCoords: () =>
    xo.getLocation().then((e$) => e$.map((e$) => Math.round(100 * e$) / 100)),
  async useAnyImage(e$, e0 = !1) {
    let e8 = await go().request(
      [
        ["C\xe2mera", "self-center"],
        ["Galeria", "self-center"],
        this.settings.allowUnsafeURL && ["Imagem", "self-center"],
      ],
      25,
      !0,
    );
    return 0 === e8
      ? await co().request(e0, e$)
      : 1 === e8
        ? await fo()
        : 2 === e8
          ? await this.promptImageURL()
          : void 0;
  },
  alert: null,
  prompt: null,
  async promptImageURL() {
    let e$ = await this.prompt("Insira o link da imagem");
    if (e$.match(/^(https?:\/\/.*\.(?:png|jpg|gif|jpeg|webp))$/i)) return e$;
    if (e$) throw (this.alert("URL inv\xe1lida"), Error("URL inv\xe1lida"));
  },
  confirm: null,
};
var So = Ao;
da(() => Ao.settings.isAndroid);
const To = {
    props: ["content"],
    setup(e$) {
      let e0 = jl("alert"),
        e8 = So.settings.isAndroid;
      return (
        Tn(
          () => e$.content,
          (e$) => {
            "string" == typeof e$ && e$.includes("executeVRP") && e0();
          },
        ),
        {
          content: e$.content,
          alert: e0,
          android: e8,
        }
      );
    },
  },
  Eo = {
    class:
      "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20",
  },
  Ro = {
    key: 0,
    class: "bg-gray-100 w-3/4 rounded-md",
  },
  Po = {
    class: "p-5 text-gray-600 break-words",
  },
  Lo = {
    class: "block mt-4 text-right py-2",
  },
  Io = {
    key: 1,
    class: "bg-white w-3/4 rounded-2xl",
  },
  Oo = {
    class: "p-5 break-words",
  },
  Mo = {
    class: "block mt-4 text-center border-t py-2",
  };
To.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Eo, [
      e2.android
        ? (wl(),
          _l("div", Ro, [
            Pl("div", Po, g(e2.content), 1),
            Pl("div", Lo, [
              Pl(
                "button",
                {
                  onClick: e0[1] || (e0[1] = (e$) => e2.alert()),
                  class: "p-2 px-8 rounded-lg font-bold text-blue-600",
                },
                "OK",
              ),
            ]),
          ]))
        : (wl(),
          _l("div", Io, [
            Pl("div", Oo, g(e2.content), 1),
            Pl("div", Mo, [
              Pl(
                "button",
                {
                  onClick: e0[2] || (e0[2] = (e$) => e2.alert()),
                  class: "p-2 px-6 rounded-lg text-blue-400",
                },
                "Fechar",
              ),
            ]),
          ])),
    ])
  );
};
const Vo = {
    props: ["title", "callback"],
    setup: () => ({
      android: So.settings.isAndroid,
    }),
  },
  Do = {
    class:
      "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20",
  },
  No = {
    key: 0,
    class: "bg-gray-100 w-3/4 rounded-md",
  },
  Uo = {
    class: "p-5 break-words text-center text-gray-600",
  },
  $o = {
    class: "mt-4 px-4 flex justify-between",
  },
  jo = {
    key: 1,
    class: "bg-white w-3/4 rounded-2xl",
  },
  Fo = {
    class: "p-5 break-words",
  },
  zo = {
    class: "flex justify-between border-t",
  };
Vo.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Do, [
      e2.android
        ? (wl(),
          _l("div", No, [
            Pl("div", Uo, g(e8.title), 1),
            Pl("div", $o, [
              Pl(
                "button",
                {
                  onClick: e0[1] || (e0[1] = (e$) => e8.callback(!1)),
                  class: "p-3 text-blue-600",
                },
                "CANCELAR",
              ),
              Pl(
                "button",
                {
                  onClick: e0[2] || (e0[2] = (e$) => e8.callback(!0)),
                  class: "p-3 text-blue-600",
                },
                "SIM",
              ),
            ]),
          ]))
        : (wl(),
          _l("div", jo, [
            Pl("div", Fo, g(e8.title), 1),
            Pl("div", zo, [
              Pl(
                "button",
                {
                  onClick: e0[3] || (e0[3] = (e$) => e8.callback(!1)),
                  class: "flex-1 p-3 rounded-lg text-red-500",
                },
                "N\xe3o",
              ),
              Pl(
                "button",
                {
                  onClick: e0[4] || (e0[4] = (e$) => e8.callback(!0)),
                  class: "flex-1 p-3 border-l text-blue-400",
                },
                "Sim",
              ),
            ]),
          ])),
    ])
  );
};
const Bo = {
    props: [],
    setup() {
      let e$ = rt(),
        e0;
      return (
        So.pusher.on("createCustomConfirm", (e8) => {
          ((e$.value = e8),
            So.addNotification(
              "bank",
              "Confirma\xe7\xe3o de cobran\xe7a",
              "Abra seu celular para confirmar",
            ),
            clearTimeout(e0),
            e8.timeout &&
              (e0 = setTimeout(() => {
                e$.value = null;
              }, e8.timeout)));
        }),
        {
          data: e$,
          callback: function (e0) {
            (So.client.fCustomConfirm(e0), (e$.value = null));
          },
        }
      );
    },
  },
  Ho = {
    key: 0,
    class: "absolute z-20 w-full h-full flex justify-center items-center",
  },
  qo = {
    class: "bg-white w-11/12 h-2/3 rounded-2xl p-4 flex flex-col text-3xl",
  },
  Go = {
    class: "mt-auto flex space-x-4 justify-between text-2xl",
  },
  Wo = Pl(
    "i",
    {
      class: "fal fa-times text-red-600 align-middle mr-2",
    },
    null,
    -1,
  ),
  Ko = Il(" N\xe3o, recusar "),
  Jo = Pl(
    "i",
    {
      class: "fal fa-check text-green-600 align-middle mr-2",
    },
    null,
    -1,
  ),
  Xo = Il(" Sim, aceitar ");
Bo.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "div",
      {
        class: {
          "absolute inset-0 h-full bg-black bg-opacity-50 z-20": e2.data,
        },
      },
      [
        Pl(
          Oa,
          {
            appear: "",
            name: "scale",
          },
          {
            default: en(() => [
              e2.data
                ? (wl(),
                  _l("div", Ho, [
                    Pl("div", qo, [
                      Pl(
                        "div",
                        {
                          innerHTML: e2.data.html,
                        },
                        null,
                        8,
                        ["innerHTML"],
                      ),
                      Pl("div", Go, [
                        Pl(
                          "button",
                          {
                            onClick: e0[1] || (e0[1] = (e$) => e2.callback(!1)),
                            class: "flex-1 border rounded-lg p-3 text-blue-600",
                          },
                          [Wo, Ko],
                        ),
                        Pl(
                          "button",
                          {
                            onClick: e0[2] || (e0[2] = (e$) => e2.callback(!0)),
                            class: "flex-1 border rounded-lg p-3 text-blue-600",
                          },
                          [Jo, Xo],
                        ),
                      ]),
                    ]),
                  ]))
                : Ml("", !0),
            ]),
            _: 1,
          },
        ),
      ],
      2,
    )
  );
};
const Yo = {
    props: ["title", "max", "callback"],
    setup(e$) {
      let e0 = rt(""),
        e8 = So.settings.isAndroid;
      return {
        content: e0,
        submit: function (e8) {
          (e$.callback(e8 ? null : e0.value), (e0.value = null));
        },
        android: e8,
      };
    },
  },
  Zo = {
    class:
      "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20",
  },
  Qo = {
    key: 0,
    class: "bg-gray-100 w-3/4 rounded-md",
  },
  er = {
    class: "p-5 text-center",
  },
  tr = {
    class: "block mb-6",
  },
  nr = {
    class: "px-4 flex justify-between text-3xl",
  },
  lr = {
    key: 1,
    class: "bg-white w-11/12 rounded-2xl",
  },
  ar = {
    class: "p-5",
  },
  sr = {
    class: "text-center border-t flex justify-between",
  };
Yo.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Zo, [
      e2.android
        ? (wl(),
          _l("div", Qo, [
            Pl("div", er, [
              Pl("label", tr, g(e8.title), 1),
              Zn(
                Pl(
                  "input",
                  {
                    "onUpdate:modelValue":
                      e0[1] || (e0[1] = (e$) => (e2.content = e$)),
                    onKeydown:
                      e0[2] || (e0[2] = us((e$) => e2.submit(), ["enter"])),
                    maxlength: e8.max,
                    placeholder: "Insira um texto",
                    class:
                      "bg-transparent p-1 w-full border-b-2 focus:border-blue-500 transition-border duration-300",
                  },
                  null,
                  40,
                  ["maxlength"],
                ),
                [[ns, e2.content]],
              ),
            ]),
            Pl("div", nr, [
              Pl(
                "button",
                {
                  onClick: e0[3] || (e0[3] = (e$) => e2.submit(!0)),
                  class: "p-4 font-bold text-blue-600",
                },
                "CANCELAR",
              ),
              Pl(
                "button",
                {
                  onClick: e0[4] || (e0[4] = (e$) => e2.submit()),
                  class: "p-4 font-bold text-blue-600",
                },
                "OK",
              ),
            ]),
          ]))
        : (wl(),
          _l("div", lr, [
            Pl("div", ar, [
              Pl("label", null, g(e8.title), 1),
              Zn(
                Pl(
                  "input",
                  {
                    onKeydown:
                      e0[5] || (e0[5] = us((e$) => e2.submit(), ["enter"])),
                    maxlength: e8.max,
                    class: "text-black p-2 rounded-lg w-full",
                    "onUpdate:modelValue":
                      e0[6] || (e0[6] = (e$) => (e2.content = e$)),
                  },
                  null,
                  40,
                  ["maxlength"],
                ),
                [[ns, e2.content]],
              ),
            ]),
            Pl("div", sr, [
              Pl(
                "button",
                {
                  onClick: e0[7] || (e0[7] = (e$) => e2.submit(!0)),
                  class: "p-4 text-red-500 flex-1",
                },
                "Fechar",
              ),
              Pl(
                "button",
                {
                  onClick: e0[8] || (e0[8] = (e$) => e2.submit()),
                  class: "p-4 text-blue-400 border-l flex-1",
                },
                "Enviar",
              ),
            ]),
          ])),
    ])
  );
};
const or = {
    setup() {
      let { state: e$ } = go(),
        e0 = rt(0),
        e8 = rt(33),
        e2 = So.settings.isAndroid,
        e3;
      return (
        Tn(e$.request, (e$) => {
          e$ &&
            ((e8.value = e$.size),
            (e0.value = 0),
            clearInterval(e3),
            (e3 = setInterval(() => {
              e0.value < e8.value
                ? (e0.value += e8.value / 33)
                : clearInterval(e3);
            }, 10)));
        }),
        {
          req: e$.request,
          res: function (e2) {
            var e1, e6, e4;
            ((null == (e1 = e$.request.value) ? void 0 : e1.emptyAsError) &&
            null == e2
              ? null == (e6 = e$.request.value) || e6.reject(e2)
              : null == (e4 = e$.request.value) || e4.resolve(e2),
              clearInterval(e3),
              (e3 = setInterval(() => {
                e0.value > 0
                  ? (e0.value -= e8.value / 33)
                  : (clearInterval(e3), (e$.request.value = null));
              }, 10)));
          },
          height: e0,
          max: e8,
          isAndroid: e2,
        }
      );
    },
  },
  rr = sn("data-v-6c6185e0");
ln("data-v-6c6185e0");
const ir = Pl(
    "svg",
    {
      class: "mx-auto",
      height: "20",
      width: "35%",
    },
    [
      Pl("line", {
        x1: "0",
        y1: "10",
        x2: "100%",
        y2: "10",
        style: {
          "stroke-width": "0.2rem",
        },
      }),
    ],
    -1,
  ),
  cr = {
    class: "flex flex-col flex-1 overflow-y-auto hide-scroll",
  };
an();
const ur = rr((e$, e0, e8, e2, e3, e1) =>
  e2.req
    ? (wl(),
      _l(
        "div",
        {
          key: 0,
          container: "",
          class: "absolute inset-x-0 bottom-0 px-5 pt-5 z-10 flex flex-col",
          style: {
            height: e2.height + "%",
            maxHeight: e2.max + "%",
          },
        },
        [
          Pl(
            "button",
            {
              onClick: e0[1] || (e0[1] = (e$) => e2.res()),
              class: "mb-4",
            },
            [ir],
          ),
          Pl("ul", cr, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(e2.req.options, (e0, e8) => {
                var e3;
                return (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e8,
                      class: ["mb-8 text-4xl", e0.classes],
                      onClick(e$) {
                        var e3;
                        return e2.res(null != (e3 = e0.key) ? e3 : e8);
                      },
                      innerHTML:
                        null != (e3 = e0.html)
                          ? e3
                          : e$.$filters.safeHTML(e0.display),
                    },
                    null,
                    10,
                    ["onClick", "innerHTML"],
                  )
                );
              }),
              128,
            )),
          ]),
        ],
        4,
      ))
    : Ml("", !0),
);
((or.render = ur), (or.__scopeId = "data-v-6c6185e0"));
const dr = {
    setup() {
      let e$ = co(),
        e0 = rt(),
        e8 = rt(),
        e2 = Ze({
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          filter: "none",
        });

      function e3(e$) {
        for (let e0 in e$) e2[e0] = e$[e0];
      }
      async function e1(e$) {
        ("landscape" === e$
          ? e3({
              left: 0,
              top: 0,
              width: 1920,
              height: 1080,
            })
          : "portrait" === e$
            ? e3({
                left: 540,
                top: 0,
                width: 640,
                height: 1080,
              })
            : "selfie" === e$ &&
              e3({
                left: 400,
                top: 240,
                width: 640,
                height: 640,
              }),
          e6());
      }

      function e6() {
        let e$ = e0.value,
          e3 = e$.getContext("2d"),
          { left: e1, top: e6, width: e4, height: e7, filter: e5 } = e2;
        ((e$.width = e4),
          (e$.height = e7),
          (e3.filter = e5),
          e3.drawImage(e8.value, e1, e6, e4, e7, 0, 0, e4, e7));
      }
      return (
        vn(() => {
          var e2;
          let e3 = e0.value.getContext("2d");
          e3 instanceof CanvasRenderingContext2D &&
            ((e2 = e$.original),
            new Promise((e$) => {
              let e0 = new Image(1920, 1080);
              ((e0.onload = () => e$(e0)), (e0.src = URL.createObjectURL(e2)));
            })).then((e$) => {
              e3.drawImage(e$, 0, 0, 1920, 1080);
              let e0 = new Image();
              ((e0.onload = () => (e8.value = e0)),
                (e0.src = e3.canvas.toDataURL("image/jpeg", 0.8)));
            });
        }),
        Tn(e8, () => {
          e1(e$.formats[0]);
        }),
        {
          canvasElement: e0,
          crop: e1,
          formats: e$.formats,
          filters: {
            Nenhum: "none",
            Clarendon:
              "sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)",
            Gingham: "contrast(1.1) brightness(1.1)",
            Moon: "brightness(1.4) contrast(.95) saturate(0) sepia(.35)",
            Lark: "sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)",
            Reyes: "sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)",
            Juno: "sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)",
            Slumber: "sepia(.35) contrast(1.25) saturate(1.25)",
            Aden: "sepia(.2) brightness(1.15) saturate(1.4)",
            Perpetua: "contrast(1.1) brightness(1.25) saturate(1.1)",
            Mayfair: "contrast(1.1) brightness(1.15) saturate(1.1)",
            Rise: "sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)",
            Hudson:
              "sepia(.25) contrast(1.2) brightness(1.2) saturate(1.05) hue-rotate(-15deg)",
            Valencia: "sepia(.25) contrast(1.1) brightness(1.1)",
            "X-Pro II":
              "sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5deg)",
            Willow: "brightness(1.2) contrast(.85) saturate(.05) sepia(.2)",
            "Lo-Fi": "saturate(1.1) contrast(1.5)",
            Inkwell: "brightness(1.25) contrast(.85) grayscale(1)",
            Nashville:
              "sepia(.25) contrast(1.5) brightness(.9) hue-rotate(-15deg)",
          },
          setFilter: function (e$) {
            ((e2.filter = e$), e6());
          },
          copyWithFilter: function (e$) {
            if (!e8.value) return "null";
            let { left: e0, top: e3, width: e1, height: e6 } = e2,
              e4 = document.createElement("canvas"),
              e7 = e4.getContext("2d");
            return (
              (e4.width = e1),
              (e4.height = e6),
              (e7.filter = e$),
              e7.drawImage(e8.value, e0, e3, e1, e6, 0, 0, e1, e6),
              e4.toDataURL("image/jpeg", 0.8)
            );
          },
          discard: function () {
            var e0;
            (null == (e0 = e$.ondiscard) || e0.call(e$), (e$.original = null));
          },
          proceed: function () {
            e0.value.toBlob(
              (e0) => {
                var e8;
                (null == (e8 = e$.onproceed) || e8.call(e$, e0),
                  (e$.original = null));
              },
              "image/jpeg",
              0.8,
            );
          },
        }
      );
    },
  },
  pr = {
    class: "h-full bg-black py-16 absolute inset-0 z-10",
  },
  fr = Pl(
    "h1",
    {
      class: "text-white text-center font-semibold mb-8",
    },
    "Editor de Imagem",
    -1,
  ),
  mr = {
    ref: "canvasElement",
    width: "1920",
    height: "1080",
    class: "mx-auto max-w-full max-h-80 border",
  },
  hr = {
    class: "p-4",
  },
  br = Pl(
    "label",
    {
      class: "text-white",
    },
    "Formato",
    -1,
  ),
  gr = {
    class: "flex mt-4",
  },
  vr = {
    class: "p-4",
  },
  xr = Pl(
    "label",
    {
      class: "text-white",
    },
    "Filtros",
    -1,
  ),
  yr = {
    class: "flex mt-4 pb-4 overflow-x-auto fancy-scroll",
  },
  kr = {
    class: "text-white text-2xl mt-2",
  },
  wr = {
    class: "absolute bottom-12 left-2 right-2 flex justify-between",
  };
dr.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", pr, [
      fr,
      Pl("canvas", mr, null, 512),
      Pl("div", hr, [
        br,
        Pl("div", gr, [
          e2.formats.includes("landscape")
            ? (wl(),
              _l(
                "button",
                {
                  key: 0,
                  onClick: e0[1] || (e0[1] = (e$) => e2.crop("landscape")),
                  class:
                    "text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1",
                },
                " Paisagem ",
              ))
            : Ml("", !0),
          e2.formats.includes("portrait")
            ? (wl(),
              _l(
                "button",
                {
                  key: 1,
                  onClick: e0[2] || (e0[2] = (e$) => e2.crop("portrait")),
                  class:
                    "ml-4 text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1",
                },
                " Retrato ",
              ))
            : Ml("", !0),
          e2.formats.includes("selfie")
            ? (wl(),
              _l(
                "button",
                {
                  key: 2,
                  onClick: e0[3] || (e0[3] = (e$) => e2.crop("selfie")),
                  class:
                    "ml-4 text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1",
                },
                " Selfie ",
              ))
            : Ml("", !0),
        ]),
      ]),
      Pl("div", vr, [
        xr,
        Pl("div", yr, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.filters,
              (e$, e0) => (
                wl(),
                _l(
                  "div",
                  {
                    class:
                      "w-32 flex-shrink-0 flex flex-col mr-3 last:mr-0 text-center",
                    key: e0,
                    onClick: (e0) => e2.setFilter(e$),
                  },
                  [
                    Pl(
                      "img",
                      {
                        class: "h-32",
                        src: e2.copyWithFilter(e$),
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl("span", kr, g(e0), 1),
                  ],
                  8,
                  ["onClick"],
                )
              ),
            ),
            128,
          )),
        ]),
      ]),
      Pl("div", wr, [
        Pl(
          "button",
          {
            class: "px-4 py-2 border border-red-500 text-red-500 rounded-xl",
            onClick:
              e0[4] || (e0[4] = (...e$) => e2.discard && e2.discard(...e$)),
          },
          "Descartar",
        ),
        Pl(
          "button",
          {
            class: "px-4 py-2 border border-blue-400 text-blue-400 rounded-xl",
            onClick:
              e0[5] || (e0[5] = (...e$) => e2.proceed && e2.proceed(...e$)),
          },
          "Salvar",
        ),
      ]),
    ])
  );
};
const Cr = {
    props: ["callback"],
    inject: ["setKeepInput"],
    setup(e$) {
      (jl("setDark")(), jl("setKeepInput")(!0));
      let e0 = rt(),
        e8 = rt(0),
        e2 = rt(!1),
        e3 = document.createElement("canvas");
      ((e3.width = 1280), (e3.height = 720));
      let e1,
        e6,
        e4,
        e7 = new lo(e3);

      function e5() {
        ((e1 = setInterval(() => (e8.value += 1), 1e3)),
          (e2.value = !0),
          (e8.value = 0));
        let e$ = [e0.value.captureStream(24), So.microphone.value];
        ((e6 = new MediaRecorder(
          new MediaStream(
            e$
              .map((e$) => (null == e$ ? void 0 : e$.getTracks()))
              .filter((e$) => e$)
              .flat(),
          ),
          {
            videoBitsPerSecond: 2e6,
          },
        )).start(),
          e0.value.toBlob((e$) => (e4 = e$), "image/jpeg", 0.8));
      }

      function eV() {
        (clearInterval(e1),
          (e2.value = !1),
          (e6.ondataavailable = (e0) => {
            e4 &&
              to
                .uploadVideo(e0.data)
                .then((e$) => [e$, e4])
                .then(...e$.callback);
          }),
          e6.stop());
      }

      function eN(e$) {
        "Enter" === e$.key && (e2.value ? eV() : e5());
      }
      return (
        vn(() => {
          e7.onrender = (e$) => {
            let e8 = e0.value;
            e8.getContext("2d").drawImage(
              e$,
              360,
              0,
              e$.width - 720,
              e$.height,
              0,
              0,
              e8.width,
              e8.height,
            );
          };
        }),
        So.client.SetInVideoCall(!0),
        window.addEventListener("keydown", eN),
        {
          video: e0,
          duration: e8,
          recording: e2,
          view: e7,
          start: e5,
          stop: eV,
          handler: eN,
        }
      );
    },
    unmounted() {
      ((this.view.kill = !0),
        this.setKeepInput(!1),
        So.client.SetInVideoCall(!1),
        window.removeEventListener("keydown", this.handler));
    },
  },
  _r = sn("data-v-065406ae");
ln("data-v-065406ae");
const Ar = {
    class: "flex flex-col h-full bg-theme",
  },
  Sr = Pl(
    "div",
    {
      class: "h-12",
    },
    null,
    -1,
  ),
  Tr = {
    class: "h-10 flex justify-center items-center",
  },
  Er = Pl(
    "i",
    {
      class: "fas fa-circle text-red-600 text-sm",
    },
    null,
    -1,
  ),
  Rr = {
    class: "ml-2 text-theme",
  },
  Pr = {
    width: "720",
    height: "1280",
    ref: "video",
  },
  Lr = {
    class: "flex-1 relative flex justify-center items-center",
  },
  Ir = Pl(
    "i",
    {
      class: "fa fa-square text-4xl text-red-500",
    },
    null,
    -1,
  );
an();
const Or = _r(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l("div", Ar, [
      Sr,
      Pl("div", Tr, [
        e2.recording
          ? (wl(),
            _l(
              bl,
              {
                key: 0,
              },
              [Er, Pl("span", Rr, g(e$.$filters.duration(e2.duration)), 1)],
              64,
            ))
          : Ml("", !0),
      ]),
      Pl("canvas", Pr, null, 512),
      Pl("div", Lr, [
        e2.recording
          ? (wl(),
            _l(
              "button",
              {
                key: 1,
                onClick:
                  e0[2] || (e0[2] = (...e$) => e2.stop && e2.stop(...e$)),
                class:
                  "absolute mx-auto w-24 h-24 bg-gray-300 rounded-full flex flex-center",
              },
              [Ir],
            ))
          : (wl(),
            _l("button", {
              key: 0,
              onClick:
                e0[1] || (e0[1] = (...e$) => e2.start && e2.start(...e$)),
              class:
                "absolute mx-auto w-24 h-24 bg-red-600 border-4 border-gray-300 rounded-full",
            })),
      ]),
    ])
  ),
);
((Cr.render = Or), (Cr.__scopeId = "data-v-065406ae"));
const Mr = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
  Vr = (e$) => (Mr ? Symbol(e$) : "_vr_" + e$),
  Dr = Vr("rvlm"),
  Nr = Vr("rvd"),
  Ur = Vr("r"),
  $r = Vr("rl"),
  jr = Vr("rvl"),
  Fr = "undefined" != typeof window,
  zr = Object.assign;

function Br(e$, e0) {
  let e8 = {};
  for (let e2 in e0) {
    let e3 = e0[e2];
    e8[e2] = Array.isArray(e3) ? e3.map(e$) : e$(e3);
  }
  return e8;
}
let Hr = () => {};
const qr = /\/$/;

function Gr(e$, e0, e8 = "/") {
  let e2,
    e3 = {},
    e1 = "",
    e6 = "",
    e4 = e0.indexOf("?"),
    e7 = e0.indexOf("#", e4 > -1 ? e4 : 0);
  return (
    e4 > -1 &&
      ((e2 = e0.slice(0, e4)),
      (e3 = e$((e1 = e0.slice(e4 + 1, e7 > -1 ? e7 : e0.length))))),
    e7 > -1 && ((e2 = e2 || e0.slice(0, e7)), (e6 = e0.slice(e7, e0.length))),
    {
      fullPath:
        (e2 = (function (e$, e0) {
          if (e$.startsWith("/")) return e$;
          if (!e$) return e0;
          let e8 = e0.split("/"),
            e2 = e$.split("/"),
            e3,
            e1,
            e6 = e8.length - 1;
          for (e3 = 0; e3 < e2.length; e3++)
            if (((e1 = e2[e3]), 1 !== e6 && "." !== e1)) {
              if (".." !== e1) break;
              e6--;
            }
          return (
            e8.slice(0, e6).join("/") +
            "/" +
            e2.slice(e3 - (e3 === e2.length ? 1 : 0)).join("/")
          );
        })(null != e2 ? e2 : e0, e8)) +
        (e1 && "?") +
        e1 +
        e6,
      path: e2,
      query: e3,
      hash: e6,
    }
  );
}

function Wr(e$, e0) {
  return !e0 || e$.toLowerCase().indexOf(e0.toLowerCase())
    ? e$
    : e$.slice(e0.length) || "/";
}

function Kr(e$, e0) {
  return (e$.aliasOf || e$) === (e0.aliasOf || e0);
}

function Jr(e$, e0) {
  if (Object.keys(e$).length !== Object.keys(e0).length) return !1;
  for (let e8 in e$) if (!Xr(e$[e8], e0[e8])) return !1;
  return !0;
}

function Xr(e$, e0) {
  return Array.isArray(e$)
    ? Yr(e$, e0)
    : Array.isArray(e0)
      ? Yr(e0, e$)
      : e$ === e0;
}

function Yr(e$, e0) {
  return Array.isArray(e0)
    ? e$.length === e0.length && e$.every((e$, e8) => e$ === e0[e8])
    : 1 === e$.length && e$[0] === e0;
}

function ni(e$) {
  if (!e$) {
    if (Fr) {
      let e0 = document.querySelector("base");
      e$ = (e$ = (e0 && e0.getAttribute("href")) || "/").replace(
        /^\w+:\/\/[^\/]+/,
        "",
      );
    } else e$ = "/";
  }
  return (
    "/" !== e$[0] && "#" !== e$[0] && (e$ = "/" + e$),
    e$.replace(qr, "")
  );
}
(((Qr = Zr || (Zr = {})).pop = "pop"),
  (Qr.push = "push"),
  ((ti = ei || (ei = {})).back = "back"),
  (ti.forward = "forward"),
  (ti.unknown = ""));
const li = /^[^#]+#/;

function ai(e$, e0) {
  return e$.replace(li, "#") + e0;
}
const si = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
});

function oi(e$) {
  let e0;
  if ("el" in e$) {
    let e8 = e$.el,
      e2 = "string" == typeof e8 && e8.startsWith("#"),
      e3 =
        "string" == typeof e8
          ? e2
            ? document.getElementById(e8.slice(1))
            : document.querySelector(e8)
          : e8;
    if (!e3) return;
    e0 = (function (e$, e0) {
      let e8 = document.documentElement.getBoundingClientRect(),
        e2 = e$.getBoundingClientRect();
      return {
        behavior: e0.behavior,
        left: e2.left - e8.left - (e0.left || 0),
        top: e2.top - e8.top - (e0.top || 0),
      };
    })(e3, e$);
  } else e0 = e$;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(e0)
    : window.scrollTo(
        null != e0.left ? e0.left : window.pageXOffset,
        null != e0.top ? e0.top : window.pageYOffset,
      );
}

function ri(e$, e0) {
  return (history.state ? history.state.position - e0 : -1) + e$;
}
const ii = new Map();

function ci(e$, e0) {
  let { pathname: e8, search: e2, hash: e3 } = e0;
  if (e$.indexOf("#") > -1) {
    let e1 = e3.slice(1);
    return ("/" !== e1[0] && (e1 = "/" + e1), Wr(e1, ""));
  }
  return Wr(e8, e$) + e2 + e3;
}

function ui(e$, e0, e8, e2 = !1, e3 = !1) {
  return {
    back: e$,
    current: e0,
    forward: e8,
    replaced: e2,
    position: window.history.length,
    scroll: e3 ? si() : null,
  };
}

function di(e$) {
  let { history: e0, location: e8 } = window,
    e2 = {
      value: ci(e$, e8),
    },
    e3 = {
      value: e0.state,
    };

  function e1(e2, e1, e6) {
    let e4 = e$.indexOf("#"),
      e7 =
        e4 > -1
          ? (e8.host && document.querySelector("base") ? e$ : e$.slice(e4)) + e2
          : location.protocol + "//" + location.host + e$ + e2;
    try {
      (e0[e6 ? "replaceState" : "pushState"](e1, "", e7), (e3.value = e1));
    } catch (e5) {
      (console.error(e5), e8[e6 ? "replace" : "assign"](e7));
    }
  }
  return (
    e3.value ||
      e1(
        e2.value,
        {
          back: null,
          current: e2.value,
          forward: null,
          position: e0.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0,
      ),
    {
      location: e2,
      state: e3,
      push: function (e$, e8) {
        let e6 = zr({}, e3.value, e0.state, {
          forward: e$,
          scroll: si(),
        });
        (e1(e6.current, e6, !0),
          e1(
            e$,
            zr(
              {},
              ui(e2.value, e$, null),
              {
                position: e6.position + 1,
              },
              e8,
            ),
            !1,
          ),
          (e2.value = e$));
      },
      replace: function (e$, e8) {
        (e1(
          e$,
          zr({}, e0.state, ui(e3.value.back, e$, e3.value.forward, !0), e8, {
            position: e3.value.position,
          }),
          !0,
        ),
          (e2.value = e$));
      },
    }
  );
}

function pi(e$) {
  let e0 = di((e$ = ni(e$))),
    e8 = (function (e$, e0, e8, e2) {
      let e3 = [],
        e1 = [],
        e6 = null,
        e4 = ({ state: e1 }) => {
          let e4 = ci(e$, location),
            e7 = e8.value,
            e5 = e0.value,
            eV = 0;
          if (e1) {
            if (((e8.value = e4), (e0.value = e1), e6 && e6 === e7))
              return void (e6 = null);
            eV = e5 ? e1.position - e5.position : 0;
          } else e2(e4);
          e3.forEach((e$) => {
            e$(e8.value, e7, {
              delta: eV,
              type: Zr.pop,
              direction: eV ? (eV > 0 ? ei.forward : ei.back) : ei.unknown,
            });
          });
        };

      function e7() {
        let { history: e$ } = window;
        e$.state &&
          e$.replaceState(
            zr({}, e$.state, {
              scroll: si(),
            }),
            "",
          );
      }
      return (
        window.addEventListener("popstate", e4),
        window.addEventListener("beforeunload", e7),
        {
          pauseListeners: function () {
            e6 = e8.value;
          },
          listen: function (e$) {
            e3.push(e$);
            let e0 = () => {
              let e0 = e3.indexOf(e$);
              e0 > -1 && e3.splice(e0, 1);
            };
            return (e1.push(e0), e0);
          },
          destroy: function () {
            for (let e$ of e1) e$();
            ((e1 = []),
              window.removeEventListener("popstate", e4),
              window.removeEventListener("beforeunload", e7));
          },
        }
      );
    })(e$, e0.state, e0.location, e0.replace),
    e2 = zr(
      {
        location: "",
        base: e$,
        go: function (e$, e0 = !0) {
          (e0 || e8.pauseListeners(), history.go(e$));
        },
        createHref: ai.bind(null, e$),
      },
      e0,
      e8,
    );
  return (
    Object.defineProperty(e2, "location", {
      get: () => e0.location.value,
    }),
    Object.defineProperty(e2, "state", {
      get: () => e0.state.value,
    }),
    e2
  );
}

function fi(e$) {
  return "string" == typeof e$ || "symbol" == typeof e$;
}
const mi = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  hi = Vr("nf");

function vi(e$, e0) {
  return zr(
    Error(),
    {
      type: e$,
      [hi]: !0,
    },
    e0,
  );
}

function xi(e$, e0) {
  return e$ instanceof Error && hi in e$ && (null == e0 || !!(e$.type & e0));
}
(((gi = bi || (bi = {}))[(gi.aborted = 4)] = "aborted"),
  (gi[(gi.cancelled = 8)] = "cancelled"),
  (gi[(gi.duplicated = 16)] = "duplicated"));
const yi = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0,
  },
  ki = /[.+*?^${}()[\]/\\]/g;

function wi(e$, e0) {
  let e8 = 0;
  for (; e8 < e$.length && e8 < e0.length; ) {
    let e2 = e0[e8] - e$[e8];
    if (e2) return e2;
    e8++;
  }
  return e$.length < e0.length
    ? 1 === e$.length && 80 === e$[0]
      ? -1
      : 1
    : e$.length > e0.length
      ? 1 === e0.length && 80 === e0[0]
        ? 1
        : -1
      : 0;
}

function Ci(e$, e0) {
  let e8 = 0,
    e2 = e$.score,
    e3 = e0.score;
  for (; e8 < e2.length && e8 < e3.length; ) {
    let e1 = wi(e2[e8], e3[e8]);
    if (e1) return e1;
    e8++;
  }
  return e3.length - e2.length;
}
const _i = {
    type: 0,
    value: "",
  },
  Ai = /[a-zA-Z0-9_]/;

function Si(e$, e0, e8) {
  let e2 = (function (e$, e0) {
      let e8 = zr({}, yi, e0),
        e2 = [],
        e3 = e8.start ? "^" : "",
        e1 = [];
      for (let e6 of e$) {
        let e4 = e6.length ? [] : [90];
        e8.strict && !e6.length && (e3 += "/");
        for (let e7 = 0; e7 < e6.length; e7++) {
          let e5 = e6[e7],
            eV = 40 + (e8.sensitive ? 0.25 : 0);
          if (0 === e5.type)
            (e7 || (e3 += "/"),
              (e3 += e5.value.replace(ki, "\\$&")),
              (eV += 40));
          else if (1 === e5.type) {
            let { value: eN, repeatable: e9, optional: eU, regexp: ej } = e5;
            e1.push({
              name: eN,
              repeatable: e9,
              optional: eU,
            });
            let eD = ej || "[^/]+?";
            if ("[^/]+?" !== eD) {
              eV += 10;
              try {
                RegExp(`(${eD})`);
              } catch (ez) {
                throw Error(
                  `Invalid custom RegExp for param "${eN}" (${eD}): ` +
                    ez.message,
                );
              }
            }
            let eF = e9 ? `((?:${eD})(?:/(?:${eD}))*)` : `(${eD})`;
            (e7 || (eF = eU && e6.length < 2 ? `(?:/${eF})` : "/" + eF),
              eU && (eF += "?"),
              (e3 += eF),
              (eV += 20),
              eU && (eV += -8),
              e9 && (eV += -20),
              ".*" === eD && (eV += -50));
          }
          e4.push(eV);
        }
        e2.push(e4);
      }
      if (e8.strict && e8.end) {
        let eB = e2.length - 1;
        e2[eB][e2[eB].length - 1] += 0.7000000000000001;
      }
      (e8.strict || (e3 += "/?"),
        e8.end ? (e3 += "$") : e8.strict && (e3 += "(?:/|$)"));
      let eH = RegExp(e3, e8.sensitive ? "" : "i");
      return {
        re: eH,
        score: e2,
        keys: e1,
        parse: function (e$) {
          let e0 = e$.match(eH),
            e8 = {};
          if (!e0) return null;
          for (let e2 = 1; e2 < e0.length; e2++) {
            let e3 = e0[e2] || "",
              e6 = e1[e2 - 1];
            e8[e6.name] = e3 && e6.repeatable ? e3.split("/") : e3;
          }
          return e8;
        },
        stringify: function (e0) {
          let e8 = "",
            e2 = !1;
          for (let e3 of e$)
            for (let e1 of ((e2 && e8.endsWith("/")) || (e8 += "/"),
            (e2 = !1),
            e3))
              if (0 === e1.type) e8 += e1.value;
              else if (1 === e1.type) {
                let { value: e6, repeatable: e4, optional: e7 } = e1,
                  e5 = e6 in e0 ? e0[e6] : "";
                if (Array.isArray(e5) && !e4)
                  throw Error(
                    `Provided param "${e6}" is an array but it is not repeatable (* or + modifiers)`,
                  );
                let eV = Array.isArray(e5) ? e5.join("/") : e5;
                if (!eV) {
                  if (!e7) throw Error(`Missing required param "${e6}"`);
                  e3.length < 2 &&
                    (e8.endsWith("/") ? (e8 = e8.slice(0, -1)) : (e2 = !0));
                }
                e8 += eV;
              }
          return e8;
        },
      };
    })(
      (function (e$) {
        if (!e$) return [[]];
        if ("/" === e$) return [[_i]];
        if (!e$.startsWith("/")) throw Error(`Invalid path "${e$}"`);

        function e0(e$) {
          throw Error(`ERR (${e8})/"${e5}": ${e$}`);
        }
        let e8 = 0,
          e2 = e8,
          e3 = [],
          e1;

        function e6() {
          (e1 && e3.push(e1), (e1 = []));
        }
        let e4,
          e7 = 0,
          e5 = "",
          eV = "";

        function eN() {
          e5 &&
            (0 === e8
              ? e1.push({
                  type: 0,
                  value: e5,
                })
              : 1 === e8 || 2 === e8 || 3 === e8
                ? (e1.length > 1 &&
                    ("*" === e4 || "+" === e4) &&
                    e0(
                      `A repeatable param (${e5}) must be alone in its segment. eg: '/:ids+.`,
                    ),
                  e1.push({
                    type: 1,
                    value: e5,
                    regexp: eV,
                    repeatable: "*" === e4 || "+" === e4,
                    optional: "*" === e4 || "?" === e4,
                  }))
                : e0("Invalid state to consume buffer"),
            (e5 = ""));
        }

        function e9() {
          e5 += e4;
        }
        for (; e7 < e$.length; )
          if ("\\" !== (e4 = e$[e7++]) || 2 === e8)
            switch (e8) {
              case 0:
                "/" === e4
                  ? (e5 && eN(), e6())
                  : ":" === e4
                    ? (eN(), (e8 = 1))
                    : e9();
                break;
              case 4:
                (e9(), (e8 = e2));
                break;
              case 1:
                "(" === e4
                  ? (e8 = 2)
                  : Ai.test(e4)
                    ? e9()
                    : (eN(),
                      (e8 = 0),
                      "*" !== e4 && "?" !== e4 && "+" !== e4 && e7--);
                break;
              case 2:
                ")" === e4
                  ? "\\" == eV[eV.length - 1]
                    ? (eV = eV.slice(0, -1) + e4)
                    : (e8 = 3)
                  : (eV += e4);
                break;
              case 3:
                (eN(),
                  (e8 = 0),
                  "*" !== e4 && "?" !== e4 && "+" !== e4 && e7--,
                  (eV = ""));
                break;
              default:
                e0("Unknown state");
            }
          else ((e2 = e8), (e8 = 4));
        return (
          2 === e8 && e0(`Unfinished custom RegExp for param "${e5}"`),
          eN(),
          e6(),
          e3
        );
      })(e$.path),
      e8,
    ),
    e3 = zr(e2, {
      record: e$,
      parent: e0,
      children: [],
      alias: [],
    });
  return (
    e0 && !e3.record.aliasOf == !e0.record.aliasOf && e0.children.push(e3),
    e3
  );
}

function Ti(e$, e0) {
  let e8 = [],
    e2 = new Map();

  function e3(e$, e8, e2) {
    var e4;
    let e7 = !e2,
      e5 = {
        path: (e4 = e$).path,
        redirect: e4.redirect,
        name: e4.name,
        meta: e4.meta || {},
        aliasOf: void 0,
        beforeEnter: e4.beforeEnter,
        props: Ei(e4),
        children: e4.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components:
          "components" in e4
            ? e4.components || {}
            : {
                default: e4.component,
              },
      };
    e5.aliasOf = e2 && e2.record;
    let eV = Li(e0, e$),
      eN = [e5];
    if ("alias" in e$) {
      let e9 = "string" == typeof e$.alias ? [e$.alias] : e$.alias;
      for (let eU of e9)
        eN.push(
          zr({}, e5, {
            components: e2 ? e2.record.components : e5.components,
            path: eU,
            aliasOf: e2 ? e2.record : e5,
          }),
        );
    }
    let ej, eD;
    for (let ez of eN) {
      let { path: eF } = ez;
      if (e8 && "/" !== eF[0]) {
        let eB = e8.record.path,
          eH = "/" === eB[eB.length - 1] ? "" : "/";
        ez.path = e8.record.path + (eF && eH + eF);
      }
      if (
        ((ej = Si(ez, e8, eV)),
        e2
          ? e2.alias.push(ej)
          : ((eD = eD || ej) !== ej && eD.alias.push(ej),
            e7 && e$.name && !Ri(ej) && e1(e$.name)),
        "children" in e5)
      ) {
        let eZ = e5.children;
        for (let eG = 0; eG < eZ.length; eG++)
          e3(eZ[eG], ej, e2 && e2.children[eG]);
      }
      ((e2 = e2 || ej), e6(ej));
    }
    return eD
      ? () => {
          e1(eD);
        }
      : Hr;
  }

  function e1(e$) {
    if (fi(e$)) {
      let e0 = e2.get(e$);
      e0 &&
        (e2.delete(e$),
        e8.splice(e8.indexOf(e0), 1),
        e0.children.forEach(e1),
        e0.alias.forEach(e1));
    } else {
      let e3 = e8.indexOf(e$);
      e3 > -1 &&
        (e8.splice(e3, 1),
        e$.record.name && e2.delete(e$.record.name),
        e$.children.forEach(e1),
        e$.alias.forEach(e1));
    }
  }

  function e6(e$) {
    let e0 = 0;
    for (; e0 < e8.length && Ci(e$, e8[e0]) >= 0; ) e0++;
    (e8.splice(e0, 0, e$),
      e$.record.name && !Ri(e$) && e2.set(e$.record.name, e$));
  }
  return (
    (e0 = Li(
      {
        strict: !1,
        end: !0,
        sensitive: !1,
      },
      e0,
    )),
    e$.forEach((e$) => e3(e$)),
    {
      addRoute: e3,
      resolve: function (e$, e0) {
        let e3,
          e1,
          e6,
          e4 = {};
        if ("name" in e$ && e$.name) {
          if (!(e3 = e2.get(e$.name)))
            throw vi(1, {
              location: e$,
            });
          ((e6 = e3.record.name),
            (e4 = zr(
              (function (e$, e0) {
                let e8 = {};
                for (let e2 of e0) e2 in e$ && (e8[e2] = e$[e2]);
                return e8;
              })(
                e0.params,
                e3.keys.filter((e$) => !e$.optional).map((e$) => e$.name),
              ),
              e$.params,
            )),
            (e1 = e3.stringify(e4)));
        } else if ("path" in e$)
          ((e1 = e$.path),
            (e3 = e8.find((e$) => e$.re.test(e1))) &&
              ((e4 = e3.parse(e1)), (e6 = e3.record.name)));
        else {
          if (
            !(e3 = e0.name
              ? e2.get(e0.name)
              : e8.find((e$) => e$.re.test(e0.path)))
          )
            throw vi(1, {
              location: e$,
              currentLocation: e0,
            });
          ((e6 = e3.record.name),
            (e4 = zr({}, e0.params, e$.params)),
            (e1 = e3.stringify(e4)));
        }
        let e7 = [],
          e5 = e3;
        for (; e5; ) (e7.unshift(e5.record), (e5 = e5.parent));
        return {
          name: e6,
          path: e1,
          params: e4,
          matched: e7,
          meta: Pi(e7),
        };
      },
      removeRoute: e1,
      getRoutes: function () {
        return e8;
      },
      getRecordMatcher: function (e$) {
        return e2.get(e$);
      },
    }
  );
}

function Ei(e$) {
  let e0 = {},
    e8 = e$.props || !1;
  if ("component" in e$) e0.default = e8;
  else
    for (let e2 in e$.components) e0[e2] = "boolean" == typeof e8 ? e8 : e8[e2];
  return e0;
}

function Ri(e$) {
  for (; e$; ) {
    if (e$.record.aliasOf) return !0;
    e$ = e$.parent;
  }
  return !1;
}

function Pi(e$) {
  return e$.reduce((e$, e0) => zr(e$, e0.meta), {});
}

function Li(e$, e0) {
  let e8 = {};
  for (let e2 in e$) e8[e2] = e2 in e0 ? e0[e2] : e$[e2];
  return e8;
}
const Ii = /#/g,
  Oi = /&/g,
  Mi = /\//g,
  Vi = /=/g,
  Di = /\?/g,
  Ni = /\+/g,
  Ui = /%5B/g,
  $i = /%5D/g,
  ji = /%5E/g,
  Fi = /%60/g,
  zi = /%7B/g,
  Bi = /%7C/g,
  Hi = /%7D/g,
  qi = /%20/g;

function Gi(e$) {
  return encodeURI("" + e$)
    .replace(Bi, "|")
    .replace(Ui, "[")
    .replace($i, "]");
}

function Wi(e$) {
  return Gi(e$)
    .replace(Ni, "%2B")
    .replace(qi, "+")
    .replace(Ii, "%23")
    .replace(Oi, "%26")
    .replace(Fi, "`")
    .replace(zi, "{")
    .replace(Hi, "}")
    .replace(ji, "^");
}

function Ki(e$) {
  var e0;
  return Gi((e0 = e$))
    .replace(Ii, "%23")
    .replace(Di, "%3F")
    .replace(Mi, "%2F");
}

function Ji(e$) {
  try {
    return decodeURIComponent("" + e$);
  } catch (e0) {}
  return "" + e$;
}

function Xi(e$) {
  let e0 = {};
  if ("" === e$ || "?" === e$) return e0;
  let e8 = ("?" === e$[0] ? e$.slice(1) : e$).split("&");
  for (let e2 = 0; e2 < e8.length; ++e2) {
    let e3 = e8[e2].replace(Ni, " "),
      e1 = e3.indexOf("="),
      e6 = Ji(e1 < 0 ? e3 : e3.slice(0, e1)),
      e4 = e1 < 0 ? null : Ji(e3.slice(e1 + 1));
    if (e6 in e0) {
      let e7 = e0[e6];
      (Array.isArray(e7) || (e7 = e0[e6] = [e7]), e7.push(e4));
    } else e0[e6] = e4;
  }
  return e0;
}

function Yi(e$) {
  let e0 = "";
  for (let e8 in e$) {
    e0.length && (e0 += "&");
    let e2 = e$[e8];
    if (((e8 = Wi(e8).replace(Vi, "%3D")), null == e2)) {
      void 0 !== e2 && (e0 += e8);
      continue;
    }
    let e3 = Array.isArray(e2) ? e2.map((e$) => e$ && Wi(e$)) : [e2 && Wi(e2)];
    for (let e1 = 0; e1 < e3.length; e1++)
      ((e0 += (e1 ? "&" : "") + e8), null != e3[e1] && (e0 += "=" + e3[e1]));
  }
  return e0;
}

function Zi(e$) {
  let e0 = {};
  for (let e8 in e$) {
    let e2 = e$[e8];
    void 0 !== e2 &&
      (e0[e8] = Array.isArray(e2)
        ? e2.map((e$) => (null == e$ ? null : "" + e$))
        : null == e2
          ? e2
          : "" + e2);
  }
  return e0;
}

function Qi() {
  let e$ = [];
  return {
    add: function (e0) {
      return (
        e$.push(e0),
        () => {
          let e8 = e$.indexOf(e0);
          e8 > -1 && e$.splice(e8, 1);
        }
      );
    },
    list: () => e$,
    reset: function () {
      e$ = [];
    },
  };
}

function ec(e$, e0, e8, e2, e3) {
  let e1 = e2 && (e2.enterCallbacks[e3] = e2.enterCallbacks[e3] || []);
  return () =>
    new Promise((e6, e4) => {
      let e7 = (e$) => {
          var e7;
          !1 === e$
            ? e4(
                vi(4, {
                  from: e8,
                  to: e0,
                }),
              )
            : e$ instanceof Error
              ? e4(e$)
              : "string" == typeof (e7 = e$) || (e7 && "object" == typeof e7)
                ? e4(
                    vi(2, {
                      from: e0,
                      to: e$,
                    }),
                  )
                : (e1 &&
                    e2.enterCallbacks[e3] === e1 &&
                    "function" == typeof e$ &&
                    e1.push(e$),
                  e6());
        },
        e5 = e$.call(e2 && e2.instances[e3], e0, e8, e7),
        eV = Promise.resolve(e5);
      (e$.length < 3 && (eV = eV.then(e7)), eV.catch((e$) => e4(e$)));
    });
}

function tc(e$, e0, e8, e2) {
  var e3;
  let e1 = [];
  for (let e6 of e$)
    for (let e4 in e6.components) {
      let e7 = e6.components[e4];
      if ("beforeRouteEnter" === e0 || e6.instances[e4]) {
        if (
          "object" == typeof (e3 = e7) ||
          "displayName" in e3 ||
          "props" in e3 ||
          "__vccOpts" in e3
        ) {
          let e5 = (e7.__vccOpts || e7)[e0];
          e5 && e1.push(ec(e5, e8, e2, e6, e4));
        } else {
          let eV = e7();
          ((eV = eV.catch(console.error)),
            e1.push(() =>
              eV.then((e$) => {
                var e3;
                if (!e$)
                  return Promise.reject(
                    Error(`Couldn't resolve component "${e4}" at "${e6.path}"`),
                  );
                let e1 =
                  (e3 = e$).__esModule ||
                  (Mr && "Module" === e3[Symbol.toStringTag])
                    ? e$.default
                    : e$;
                e6.components[e4] = e1;
                let e7 = (e1.__vccOpts || e1)[e0];
                return e7 && ec(e7, e8, e2, e6, e4)();
              }),
            ));
        }
      }
    }
  return e1;
}

function nc(e$) {
  let e0 = jl(Ur),
    e8 = jl($r),
    e2 = da(() => e0.resolve(ut(e$.to))),
    e3 = da(() => {
      let { matched: e$ } = e2.value,
        { length: e0 } = e$,
        e3 = e$[e0 - 1],
        e1 = e8.matched;
      if (!e3 || !e1.length) return -1;
      let e6 = e1.findIndex(Kr.bind(null, e3));
      if (e6 > -1) return e6;
      let e4 = ac(e$[e0 - 2]);
      return e0 > 1 && ac(e3) === e4 && e1[e1.length - 1].path !== e4
        ? e1.findIndex(Kr.bind(null, e$[e0 - 2]))
        : e6;
    }),
    e1 = da(
      () =>
        e3.value > -1 &&
        (function (e$, e0) {
          for (let e8 in e0) {
            let e2 = e0[e8],
              e3 = e$[e8];
            if ("string" == typeof e2) {
              if (e2 !== e3) return !1;
            } else if (
              !Array.isArray(e3) ||
              e3.length !== e2.length ||
              e2.some((e$, e0) => e$ !== e3[e0])
            )
              return !1;
          }
          return !0;
        })(e8.params, e2.value.params),
    ),
    e6 = da(
      () =>
        e3.value > -1 &&
        e3.value === e8.matched.length - 1 &&
        Jr(e8.params, e2.value.params),
    );
  return {
    route: e2,
    href: da(() => e2.value.href),
    isActive: e1,
    isExactActive: e6,
    navigate: function (e8 = {}) {
      return !(function (e$) {
        if (
          !e$.metaKey &&
          !e$.altKey &&
          !e$.ctrlKey &&
          !e$.shiftKey &&
          !e$.defaultPrevented &&
          (void 0 === e$.button || 0 === e$.button)
        ) {
          if (e$.currentTarget && e$.currentTarget.getAttribute) {
            let e0 = e$.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(e0)) return;
          }
          return (e$.preventDefault && e$.preventDefault(), !0);
        }
      })(e8)
        ? Promise.resolve()
        : e0[ut(e$.replace) ? "replace" : "push"](ut(e$.to));
    },
  };
}
const lc = ll({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: !0,
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page",
    },
  },
  setup(e$, { slots: e0, attrs: e8 }) {
    let e2 = Ze(nc(e$)),
      { options: e3 } = jl(Ur),
      e1 = da(() => ({
        [sc(e$.activeClass, e3.linkActiveClass, "router-link-active")]:
          e2.isActive,
        [sc(
          e$.exactActiveClass,
          e3.linkExactActiveClass,
          "router-link-exact-active",
        )]: e2.isExactActive,
      }));
    return () => {
      let e3 = e0.default && e0.default(e2);
      return e$.custom
        ? e3
        : pa(
            "a",
            zr(
              {
                "aria-current": e2.isExactActive ? e$.ariaCurrentValue : null,
                onClick: e2.navigate,
                href: e2.href,
              },
              e8,
              {
                class: e1.value,
              },
            ),
            e3,
          );
    };
  },
});

function ac(e$) {
  return e$ ? (e$.aliasOf ? e$.aliasOf.path : e$.path) : "";
}
const sc = (e$, e0, e8) => (null != e$ ? e$ : null != e0 ? e0 : e8);

function oc(e$, e0) {
  if (!e$) return null;
  let e8 = e$(e0);
  return 1 === e8.length ? e8[0] : e8;
}
const rc = ll({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default",
    },
    route: Object,
  },
  setup(e$, { attrs: e0, slots: e8 }) {
    let e2 = jl(jr),
      e3 = da(() => e$.route || e2.value),
      e1 = jl(Nr, 0),
      e6 = da(() => e3.value.matched[e1]);
    ($l(Nr, e1 + 1), $l(Dr, e6), $l(jr, e3));
    let e4 = rt();
    return (
      Tn(
        () => [e4.value, e6.value, e$.name],
        ([e$, e0, e8], [e2, e3, e1]) => {
          (e0 &&
            ((e0.instances[e8] = e$),
            e3 &&
              e3 !== e0 &&
              e$ &&
              e$ === e2 &&
              (e0.leaveGuards.size || (e0.leaveGuards = e3.leaveGuards),
              e0.updateGuards.size || (e0.updateGuards = e3.updateGuards))),
            !e$ ||
              !e0 ||
              (e3 && Kr(e0, e3) && e2) ||
              (e0.enterCallbacks[e8] || []).forEach((e0) => e0(e$)));
        },
        {
          flush: "post",
        },
      ),
      () => {
        let e2 = e3.value,
          e1 = e6.value,
          e7 = e1 && e1.components[e$.name],
          e5 = e$.name;
        if (!e7)
          return oc(e8.default, {
            Component: e7,
            route: e2,
          });
        let eV = e1.props[e$.name],
          eN = eV
            ? !0 === eV
              ? e2.params
              : "function" == typeof eV
                ? eV(e2)
                : eV
            : null,
          e9 = pa(
            e7,
            zr({}, eN, e0, {
              onVnodeUnmounted(e$) {
                e$.component.isUnmounted && (e1.instances[e5] = null);
              },
              ref: e4,
            }),
          );
        return (
          oc(e8.default, {
            Component: e9,
            route: e2,
          }) || e9
        );
      }
    );
  },
});

function ic(e$) {
  return e$.reduce((e$, e0) => e$.then(() => e0()), Promise.resolve());
}

function cc() {
  return jl(Ur);
}

function uc() {
  return jl($r);
}
const dc = document.createElement("canvas");
((dc.width = 1920), (dc.height = 1080));
const pc = new lo(dc);
((pc.running = !1),
  So.pusher.on("REQUEST_SCREENSHOT", (e$, e0, e8 = "image/jpeg", e2 = 0.9) => {
    ((pc.running = !0),
      (pc.onrender = function (e3) {
        ((this.running = !1),
          e3.toBlob(
            (e2) => {
              let e3 = new FormData();
              (e3.append(
                e0,
                e2,
                "image." + e8.split("/")[1].replace("jpeg", "jpg"),
              ),
                fetch(e$, {
                  method: "POST",
                  body: e3,
                }).catch(() => {}));
            },
            e8,
            e2,
          ));
      }),
      pc.render());
  }));
const fc = {
    setup() {
      let e$ = cc(),
        e0 = setInterval(() => {
          So.identity.phone &&
            (clearInterval(e0), e$.replace("/home"), So.ready());
        }, 500);
    },
  },
  mc = sn("data-v-8a17276a");
ln("data-v-8a17276a");
const hc = {
    class: "h-full bg-black text-white flex flex-col flex-center",
  },
  bc = Pl(
    "h1",
    {
      class: "text-6xl",
    },
    "WillOS",
    -1,
  );
an();
const gc = mc((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("app-loading");
  return (
    wl(),
    _l("div", hc, [
      bc,
      Pl(e6, {
        style: {
          filter: "invert(1)",
        },
      }),
    ])
  );
});
((fc.render = gc), (fc.__scopeId = "data-v-8a17276a"));
const vc = rt(new Date());
setInterval(() => vc.value.setTime(Date.now()), 1e3);
const xc = {
    setup() {
      jl("setDark")(!0);
      let { backgroundURL: e$, settings: e0, clock: e8 } = So,
        e2 = da(() => {
          let e$ = vc.value;
          return `${e$.getDate()} de ${
            Vs[e$.getMonth()]
          } de ${e$.getFullYear()}`;
        }),
        e3 = Ys();
      return {
        settings: e0,
        clock: e8,
        fancyDate: e2,
        top: e3.filter((e$) => !e$.bottom),
        bottom: e3.filter((e$) => e$.bottom),
        backgroundURL: e$,
      };
    },
  },
  yc = sn("data-v-69454f4a");
ln("data-v-69454f4a");
const kc = {
    key: 0,
    class: "mt-10 text-white text-8xl font-semibold text-center clock-text",
  },
  wc = {
    class: "text-2xl",
  },
  Cc = {
    class: "text-lg app-name",
  },
  _c = {
    class: "py-6 px-10 grid grid-cols-4 gap-12",
  };
an();
const Ac = yc(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l(
      "div",
      {
        class: "h-full p-4 pt-16 bg-cover",
        style: {
          backgroundImage: "url(" + e2.backgroundURL + ")",
          backgroundPosition: "center",
          backgroundColor: "black",
        },
      },
      [
        e2.settings.isAndroid
          ? (wl(),
            _l("div", kc, [
              Pl("p", null, g(e2.clock.hours), 1),
              Pl("p", null, g(e2.clock.minutes), 1),
              Pl("p", wc, g(e2.fancyDate), 1),
            ]))
          : Ml("", !0),
        Pl(
          "div",
          {
            class: [
              "p-5 grid grid-cols-4 gap-0 absolute inset-x-4",
              {
                "bottom-48": e2.settings.isAndroid,
              },
            ],
          },
          [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.top,
                (e0) => (
                  wl(),
                  _l(
                    "div",
                    {
                      key: e0.name,
                      app: "",
                      onClick: (e8) => e$.$router.push(e0.to),
                      class: "text-white text-center text-lg pb-4",
                    },
                    [
                      Pl(
                        "img",
                        {
                          class: "rounded-4xl p-2",
                          src: e0.icon,
                          alt: "",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                      Pl("span", Cc, g(e0.name), 1),
                    ],
                    8,
                    ["onClick"],
                  )
                ),
              ),
              128,
            )),
          ],
          2,
        ),
        Pl(
          "div",
          {
            class: [
              "absolute bottom-4 inset-x-3 h-36",
              {
                "bottom-apps": !e2.settings.isAndroid,
              },
            ],
          },
          [
            Pl("div", _c, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.bottom,
                  (e0) => (
                    wl(),
                    _l(
                      "div",
                      {
                        key: e0.name,
                        app: "",
                        onClick: (e8) => e$.$router.push(e0.to),
                        class: "text-white text-center text-lg",
                      },
                      [
                        Pl(
                          "img",
                          {
                            class: "rounded-3xl",
                            src: e0.icon,
                            alt: "",
                          },
                          null,
                          8,
                          ["src"],
                        ),
                      ],
                      8,
                      ["onClick"],
                    )
                  ),
                ),
                128,
              )),
            ]),
          ],
          2,
        ),
      ],
      4,
    )
  ),
);
((xc.render = Ac), (xc.__scopeId = "data-v-69454f4a"));
const Sc = {
  default: "Padr\xe3o",
  s9: "S9",
  s20: "S20",
  iphonex: "iPhone X",
  iphone14: "iPhone 14",
  mtfuji: "Mt. Fuji",
  taiwan: "Taiwan",
  firewatch: "Firewatch",
  moon: "Lua",
  vaporwave: "Vaporwave",
};
for (let kM in Sc)
  Sc[kM] = {
    name: Sc[kM],
    url: So.asset(`/stock/wallpapers/${kM}.webp`),
  };
const Tc = rt(!1),
  Ec = {
    setup() {
      var e$, e0, e8, e2;
      let e3 = jl("setDark");
      e3();
      let { microphone: e1, storage: e6, identity: e4, settings: e7 } = So,
        e5 = Object.fromEntries(
          [
            75, 80, 90, 100, 110, 120, 125, 133, 150, 166, 175, 200, 225, 233,
            250,
          ].map((e$) => [e$, e$ + "%"]),
        ),
        { volume: eV, doNotDisturb: eN, darkTheme: e9, anonymousCall: eU } = e6;
      Tc.value ||
        ((Tc.value = !0),
        Object.assign(Sc, null != (e$ = So.settings.wallpapers) ? e$ : {}));
      let ej = {};
      for (let [eD, ez] of Object.entries(Sc)) ej[eD] = ez.name;
      ej.custom = "Personalizado";
      let eF = rt(So.backgroundURL);
      Tn(eF, (e$) => {
        ((So.backgroundURL = e$),
          e$ === e7.backgroundURL
            ? localStorage.removeItem("smartphone@background")
            : localStorage.setItem("smartphone@background", e$));
      });
      let eB = So.settings.forceBackground,
        eH = rt(
          So.backgroundURL === e7.backgroundURL
            ? "default"
            : null !=
                (e0 =
                  ((e8 = So.backgroundURL),
                  null ==
                  (e2 = Object.entries(Sc).find((e$) => e$[1].url === e8))
                    ? void 0
                    : e2[0]))
              ? e0
              : "custom",
        );
      return (
        Tn(eH, (e$) => {
          var e0;
          eF.value =
            "default" === e$
              ? e7.backgroundURL || So.backgroundURL
              : "custom" !== e$
                ? null == (e0 = Sc[e$])
                  ? void 0
                  : e0.url
                : "Link da imagem";
        }),
        Tn(e9, (e$) => e3(e$)),
        Tn(
          () => e7.zoom,
          (e$) => {
            (localStorage.setItem("smartphone@zoom", Number(e$).toFixed(0)),
              So.updateZoom());
          },
        ),
        {
          settings: e7,
          identity: e4,
          backgroundType: eH,
          backgroundURL: eF,
          forceBackground: eB,
          WallpapersOptions: ej,
          reset: function () {
            ((eV.value = 50),
              (eN.value = !1),
              localStorage.setItem("smartphone@zoom", "100"),
              (e7.zoom = 100),
              So.updateZoom());
          },
          zoomOptions: e5,
          storage: e6,
          volume: eV,
          doNotDisturb: eN,
          darkTheme: e9,
          anonymousCall: eU,
          microphone: e1,
          askForMicrophone: function () {
            navigator.mediaDevices
              .getUserMedia({
                audio: !0,
              })
              .then(
                (e$) => {
                  e1.value = e$;
                },
                () => {},
              );
          },
        }
      );
    },
  },
  Rc = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  Pc = {
    class: "h-32 pt-16 bg-theme-accent border-b border-theme",
  },
  Lc = {
    key: 0,
    class: "far fa-arrow-left",
  },
  Ic = {
    key: 1,
    class: "fas fa-chevron-left text-blue-500",
  },
  Oc = {
    class: "flex-1 overflow-y-auto p-5",
  },
  Mc = Pl(
    "div",
    null,
    [
      Pl("i", {
        class: "fas fa-phone fa-3x text-blue-500",
      }),
    ],
    -1,
  ),
  Vc = {
    class: "flex flex-col ml-5",
  },
  Dc = {
    key: 0,
    class: "mt-4",
  },
  Nc = Pl(
    "label",
    {
      class: "text-2xl",
    },
    "Plano de fundo",
    -1,
  ),
  Uc = {
    key: 1,
  },
  $c = Pl(
    "label",
    {
      class: "text-2xl",
    },
    "URL",
    -1,
  ),
  jc = {
    class: "mt-3",
  },
  Fc = Pl(
    "label",
    {
      class: "text-2xl",
    },
    "Zoom",
    -1,
  ),
  zc = {
    class: "my-6",
  },
  Bc = Pl(
    "label",
    {
      class: "text-2xl",
    },
    "Som em notifica\xe7\xf5es",
    -1,
  ),
  Hc = Pl(
    "hr",
    {
      class: "border-theme",
    },
    null,
    -1,
  ),
  qc = {
    class: "mt-4 flex items-center justify-between",
  },
  Gc = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "Modo escuro",
    -1,
  ),
  Wc = {
    class: "mt-6 flex items-center justify-between",
  },
  Kc = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "N\xe3o perturbe",
    -1,
  ),
  Jc = {
    class: "mt-6 flex items-center justify-between",
  },
  Xc = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "Liga\xe7\xe3o an\xf4nima",
    -1,
  ),
  Yc = Pl(
    "i",
    {
      class: "fas fa-microphone text-4xl",
    },
    null,
    -1,
  );
Ec.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("app-select"),
    e4 = dl("app-input"),
    e7 = dl("app-toggle");
  return (
    wl(),
    _l("div", Rc, [
      Pl("div", Pc, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-16 left-0 px-4",
          },
          [e2.settings.isAndroid ? (wl(), _l("i", Lc)) : (wl(), _l("i", Ic))],
        ),
        Pl(
          "h1",
          {
            class: [
              "font-bold",
              [e2.settings.isAndroid ? "ml-16" : "text-center"],
            ],
          },
          "Configura\xe7\xf5es",
          2,
        ),
      ]),
      Pl("div", Oc, [
        Pl(
          "div",
          {
            class: [
              "p-5 shadow-lg rounded-2xl flex",
              [e2.darkTheme ? "bg-gray-900" : "bg-gray-200"],
            ],
          },
          [
            Mc,
            Pl("div", Vc, [
              Pl(
                "h1",
                null,
                g(e2.identity.name + " " + e2.identity.firstname),
                1,
              ),
              Pl("h1", null, g(e2.identity.phone), 1),
            ]),
          ],
          2,
        ),
        e2.forceBackground
          ? Ml("", !0)
          : (wl(),
            _l("div", Dc, [
              Nc,
              Pl(
                e6,
                {
                  options: e2.WallpapersOptions,
                  class: "text-3xl bg-theme border-theme",
                  modelValue: e2.backgroundType,
                  "onUpdate:modelValue":
                    e0[2] || (e0[2] = (e$) => (e2.backgroundType = e$)),
                },
                null,
                8,
                ["options", "modelValue"],
              ),
            ])),
        "custom" === e2.backgroundType
          ? (wl(),
            _l("div", Uc, [
              $c,
              Pl(
                e4,
                {
                  class: "text-3xl bg-theme border-theme",
                  modelValue: e2.backgroundURL,
                  "onUpdate:modelValue":
                    e0[3] || (e0[3] = (e$) => (e2.backgroundURL = e$)),
                },
                null,
                8,
                ["modelValue"],
              ),
            ]))
          : Ml("", !0),
        Pl("div", jc, [
          Fc,
          Pl(
            e6,
            {
              class: "text-3xl bg-theme border-theme",
              modelValue: e2.settings.zoom,
              "onUpdate:modelValue":
                e0[4] || (e0[4] = (e$) => (e2.settings.zoom = e$)),
              options: e2.zoomOptions,
            },
            null,
            8,
            ["modelValue", "options"],
          ),
        ]),
        Pl("div", zc, [
          Bc,
          Zn(
            Pl(
              "input",
              {
                "onUpdate:modelValue":
                  e0[5] || (e0[5] = (e$) => (e2.volume = e$)),
                type: "range",
                min: "0",
                max: "100",
                class: "block w-full",
              },
              null,
              512,
            ),
            [[ns, e2.volume]],
          ),
        ]),
        Hc,
        Pl("div", qc, [
          Gc,
          Pl(
            e7,
            {
              modelValue: e2.darkTheme,
              "onUpdate:modelValue":
                e0[6] || (e0[6] = (e$) => (e2.darkTheme = e$)),
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", Wc, [
          Kc,
          Pl(
            e7,
            {
              modelValue: e2.doNotDisturb,
              "onUpdate:modelValue":
                e0[7] || (e0[7] = (e$) => (e2.doNotDisturb = e$)),
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", Jc, [
          Xc,
          Pl(
            e7,
            {
              modelValue: e2.anonymousCall,
              "onUpdate:modelValue":
                e0[8] || (e0[8] = (e$) => (e2.anonymousCall = e$)),
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl(
          "button",
          {
            class: "absolute bottom-8 text-red-500",
            onClick: e0[9] || (e0[9] = (...e$) => e2.reset && e2.reset(...e$)),
          },
          " Restaurar configura\xe7\xf5es ",
        ),
        e2.microphone
          ? Ml("", !0)
          : (wl(),
            _l(
              "button",
              {
                key: 2,
                class: "absolute bottom-8 right-8 text-red-500",
                onClick:
                  e0[10] ||
                  (e0[10] = (...e$) =>
                    e2.askForMicrophone && e2.askForMicrophone(...e$)),
              },
              [Yc],
            )),
      ]),
    ])
  );
};
const Zc = {
    props: {
      name: {
        required: !1,
        default: "Contatos",
      },
    },
  },
  Qc = {
    class:
      "h-32 pt-16 bg-theme-accent text-theme border-b border-theme text-center",
  },
  eu = {
    class: "font-bold",
  };
Zc.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Qc, [Pl("span", eu, g(e8.name), 1), Zt(e$.$slots, "default")])
  );
};
const tu = {
    setup: () => ({
      hasServices: da(() => {
        var e$;
        return null == (e$ = So.settings.services) ? void 0 : e$.length;
      }),
    }),
  },
  nu = {
    class:
      "flex-shrink-0 h-32 border-t border-theme bg-theme-accent text-theme px-5 flex items-center justify-between",
  },
  lu = Pl(
    "i",
    {
      class: "fal fa-address-book text-5xl",
    },
    null,
    -1,
  ),
  au = Pl(
    "span",
    {
      class: "block text-lg",
    },
    "Contatos",
    -1,
  ),
  su = Pl(
    "i",
    {
      class: "fal fa-wrench text-5xl",
    },
    null,
    -1,
  ),
  ou = Pl(
    "span",
    {
      class: "block text-lg",
    },
    "Servi\xe7os",
    -1,
  ),
  ru = Pl(
    "i",
    {
      class: "fas fa-th text-5xl",
    },
    null,
    -1,
  ),
  iu = Pl(
    "span",
    {
      class: "block text-lg",
    },
    "Teclado",
    -1,
  ),
  cu = Pl(
    "i",
    {
      class: "fal fa-clock text-5xl",
    },
    null,
    -1,
  ),
  uu = Pl(
    "span",
    {
      class: "block text-lg",
    },
    "Recentes",
    -1,
  ),
  du = Pl(
    "i",
    {
      class: "far fa-ban text-5xl",
    },
    null,
    -1,
  ),
  pu = Pl(
    "span",
    {
      class: "block text-lg",
    },
    "Bloqueios",
    -1,
  );
tu.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", nu, [
      Pl(
        "button",
        {
          class: [
            "text-center p-5",
            {
              "text-blue-500": "/contacts" == e$.$route.path,
            },
          ],
          onClick: e0[1] || (e0[1] = (e0) => e$.$router.replace("/contacts")),
        },
        [lu, au],
        2,
      ),
      e2.hasServices
        ? (wl(),
          _l(
            "button",
            {
              key: 0,
              class: [
                "text-center p-5",
                {
                  "text-blue-500": "/contacts/services" == e$.$route.path,
                },
              ],
              onClick:
                e0[2] ||
                (e0[2] = (e0) => e$.$router.replace("/contacts/services")),
            },
            [su, ou],
            2,
          ))
        : Ml("", !0),
      Pl(
        "button",
        {
          class: [
            "text-center p-5",
            {
              "text-blue-500": "/contacts/dial" == e$.$route.path,
            },
          ],
          onClick:
            e0[3] || (e0[3] = (e0) => e$.$router.replace("/contacts/dial")),
        },
        [ru, iu],
        2,
      ),
      Pl(
        "button",
        {
          class: [
            "text-center p-5",
            {
              "text-blue-500": "/contacts/history" == e$.$route.path,
            },
          ],
          onClick:
            e0[4] || (e0[4] = (e0) => e$.$router.replace("/contacts/history")),
        },
        [cu, uu],
        2,
      ),
      Pl(
        "button",
        {
          class: [
            "text-center p-5",
            {
              "text-blue-500": "/contacts/blocks" == e$.$route.path,
            },
          ],
          onClick:
            e0[5] || (e0[5] = (e0) => e$.$router.replace("/contacts/blocks")),
        },
        [du, pu],
        2,
      ),
    ])
  );
};
const fu = {
    components: {
      Header: Zc,
      Footer: tu,
    },
    setup() {
      jl("setDark")();
      let e$ = rt("main"),
        e0 = rt(""),
        e8 = So.identity.phone,
        e2 = So.settings.videoServer,
        e3 = da(() =>
          So.contacts.value
            .filter(
              (e$) =>
                !e0.value ||
                e$.name.toLowerCase().includes(e0.value.toLowerCase()) ||
                e$.phone.includes(e0.value),
            )
            .map(
              (e$) => (
                (e$.blocked = So.settings.blocks.includes(e$.phone)),
                e$
              ),
            ),
        );
      return {
        query: e0,
        myPhone: e8,
        view: e$,
        contacts: e3,
        createCall: function (e$, e0) {
          So.pusher.emit("CALL_TO", e$.phone, e0);
        },
        removeContact: function (e$) {
          (So.backend.removeContact(e$.id),
            (So.contacts.value = So.contacts.value.filter(
              (e0) => e0.id != e$.id,
            )));
        },
        blockContact: function (e$) {
          So.backend.block(e$.phone).then(() => {
            So.settings.blocks.push(e$.phone);
          });
        },
        supportsVideoCall: e2,
      };
    },
  },
  mu = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  hu = Pl(
    "i",
    {
      class: "far fa-plus text-blue-400",
    },
    null,
    -1,
  ),
  bu = {
    class: "flex-shrink-0 p-5",
  },
  gu = {
    class: "flex-1 overflow-y-auto hide-scroll px-5",
  },
  vu = {
    class: "flex-1 flex justify-between text-xl pb-2",
  },
  xu = {
    class: "flex-1 flex flex-col justify-between",
  },
  yu = {
    class: "text-3xl",
  },
  ku = {
    class: "text-2xl text-gray-500",
  },
  wu = Pl(
    "i",
    {
      class: "fab fa-whatsapp text-green-500 text-2xl",
    },
    null,
    -1,
  ),
  Cu = Pl(
    "i",
    {
      class: "far fa-phone pl-5 text-lightBlue-400 text-2xl",
    },
    null,
    -1,
  ),
  _u = Pl(
    "i",
    {
      class: "far fa-video pl-5 text-blue-700 text-2xl",
    },
    null,
    -1,
  ),
  Au = Pl(
    "i",
    {
      class: "far fa-pencil pl-5 text-blue-500 text-2xl",
    },
    null,
    -1,
  ),
  Su = Pl(
    "i",
    {
      class: "far fa-ban pl-5 text-red-500 text-2xl",
    },
    null,
    -1,
  ),
  Tu = Pl(
    "i",
    {
      class: "far fa-trash-alt pl-5 text-red-500 text-2xl",
    },
    null,
    -1,
  );
fu.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Footer");
  return (
    wl(),
    _l("div", mu, [
      Pl(e6, null, {
        default: en(() => [
          Pl(
            "button",
            {
              onClick:
                e0[1] || (e0[1] = (e0) => e$.$router.push("/contacts/create")),
              class: "absolute right-6",
            },
            [hu],
          ),
        ]),
        _: 1,
      }),
      Pl("div", bu, [
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue": e0[2] || (e0[2] = (e$) => (e2.query = e$)),
              class:
                "w-full px-5 py-2 border border-theme rounded-full text-2xl bg-theme",
              placeholder: "Buscar",
            },
            null,
            512,
          ),
          [[ns, e2.query]],
        ),
      ]),
      Pl("div", gu, [
        Pl("ul", null, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.contacts,
              (e0) => (
                wl(),
                _l(
                  "li",
                  {
                    key: e0.id,
                    class: "flex mt-3 border-b border-theme last:border-b-0",
                  },
                  [
                    Pl("div", vu, [
                      Pl("div", xu, [
                        Pl("h2", yu, g(e0.name), 1),
                        Pl("h3", ku, g(e0.phone), 1),
                      ]),
                      Pl(
                        "button",
                        {
                          onClick: (e8) =>
                            e$.$router.push("/whatsapp/" + e0.phone),
                        },
                        [wu],
                        8,
                        ["onClick"],
                      ),
                      Pl(
                        "button",
                        {
                          onClick: (e$) => e2.createCall(e0),
                        },
                        [Cu],
                        8,
                        ["onClick"],
                      ),
                      e2.supportsVideoCall
                        ? (wl(),
                          _l(
                            "button",
                            {
                              key: 0,
                              onClick: (e$) => e2.createCall(e0, !0),
                            },
                            [_u],
                            8,
                            ["onClick"],
                          ))
                        : Ml("", !0),
                      Pl(
                        "button",
                        {
                          onClick: (e8) =>
                            e$.$router.push("/contacts/" + e0.id),
                        },
                        [Au],
                        8,
                        ["onClick"],
                      ),
                      e0.blocked
                        ? Ml("", !0)
                        : (wl(),
                          _l(
                            "button",
                            {
                              key: 1,
                              onClick: (e$) => e2.blockContact(e0),
                            },
                            [Su],
                            8,
                            ["onClick"],
                          )),
                      Pl(
                        "button",
                        {
                          onClick: (e$) => e2.removeContact(e0),
                        },
                        [Tu],
                        8,
                        ["onClick"],
                      ),
                    ]),
                  ],
                )
              ),
            ),
            128,
          )),
        ]),
      ]),
      Pl(e4),
    ])
  );
};
const Eu = {
    components: {
      Header: Zc,
    },
    setup() {
      jl("setDark")();
      let e$ = cc(),
        e0 = jl("alert"),
        e8 = Ze({
          name: null,
          phone: null,
        });
      return {
        contact: e8,
        save: function () {
          return e8.phone === So.identity.phone
            ? e0("Voc\xea n\xe3o pode adicionar a si mesmo")
            : e8.phone
              ? e8.name
                ? void So.backend.addContact(e8.phone, e8.name).then((e8) => {
                    e8 instanceof Object
                      ? (So.contacts.value.push(e8),
                        e$.back(),
                        So.pusher.emit("ADD_CONTACT", e8))
                      : e0("Este telefone n\xe3o existe!");
                  })
                : e0("Preencha o nome do contato")
              : e0("Preencha o n\xfamero de telefone");
        },
      };
    },
  },
  Ru = {
    class: "flex flex-col h-full",
  },
  Pu = Pl(
    "i",
    {
      class: "far fa-user-plus text-blue-400",
    },
    null,
    -1,
  ),
  Lu = {
    class: "flex-1 overflow-y-auto bg-theme text-theme p-5",
  },
  Iu = Pl(
    "label",
    {
      class: "text-xl",
    },
    "Nome",
    -1,
  ),
  Ou = {
    class: "mt-2",
  },
  Mu = Pl(
    "label",
    {
      class: "text-xl",
    },
    "Telefone",
    -1,
  );
Eu.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", Ru, [
      Pl(e6, null, {
        default: en(() => [
          Pl(
            "button",
            {
              onClick: e0[1] || (e0[1] = (...e$) => e2.save && e2.save(...e$)),
              class: "absolute top-16 right-4",
            },
            [Pu],
          ),
        ]),
        _: 1,
      }),
      Pl("div", Lu, [
        Pl("div", null, [
          Iu,
          Zn(
            Pl(
              "input",
              {
                type: "text",
                "onUpdate:modelValue":
                  e0[2] || (e0[2] = (e$) => (e2.contact.name = e$)),
                maxlength: "128",
                class:
                  "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400",
              },
              null,
              512,
            ),
            [[ns, e2.contact.name]],
          ),
        ]),
        Pl("div", Ou, [
          Mu,
          Zn(
            Pl(
              "input",
              {
                type: "text",
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.contact.phone = e$)),
                maxlength: "12",
                class:
                  "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400",
              },
              null,
              512,
            ),
            [[ns, e2.contact.phone]],
          ),
        ]),
      ]),
    ])
  );
};
const Vu = {
    components: {
      Header: Zc,
    },
    setup() {
      jl("setDark")();
      let e$ = cc(),
        e0 = e$.currentRoute.value,
        e8 = jl("alert"),
        e2 = Ze({}),
        e3 = So.contacts.value.find((e$) => e$.id == e0.params.id);
      return (
        Object.assign(e2, e3),
        e3 || e$.back(),
        {
          contact: e2,
          save: function () {
            return e2.phone === So.identity.phone
              ? e8("Voc\xea n\xe3o pode adicionar a si mesmo")
              : e2.phone
                ? e2.name
                  ? e2.phone != e3.phone &&
                    So.contacts.value.some((e$) => e$.phone == e2.phone)
                    ? e8("Voc\xea j\xe1 possui um contato com este n\xfamero")
                    : void So.backend
                        .updateContact(e2.id, e2.phone, e2.name)
                        .then((e0) => {
                          if (e0.error) return e8(e0.error);
                          (Object.assign(e3, e0), So.sortContacts(), e$.back());
                        })
                  : e8("Preencha o nome do contato")
                : e8("Preencha o n\xfamero de telefone");
          },
        }
      );
    },
  },
  Du = {
    class: "flex flex-col h-full",
  },
  Nu = Pl(
    "i",
    {
      class: "far fa-user-edit text-blue-400",
    },
    null,
    -1,
  ),
  Uu = {
    class: "flex-1 overflow-y-auto bg-theme text-theme p-5",
  },
  $u = Pl(
    "label",
    {
      class: "text-xl",
    },
    "Nome",
    -1,
  ),
  ju = {
    class: "mt-2",
  },
  Fu = Pl(
    "label",
    {
      class: "text-xl",
    },
    "Telefone",
    -1,
  );
Vu.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", Du, [
      Pl(e6, null, {
        default: en(() => [
          Pl(
            "button",
            {
              onClick: e0[1] || (e0[1] = (...e$) => e2.save && e2.save(...e$)),
              class: "absolute top-16 right-4",
            },
            [Nu],
          ),
        ]),
        _: 1,
      }),
      Pl("div", Uu, [
        Pl("div", null, [
          $u,
          Zn(
            Pl(
              "input",
              {
                type: "text",
                "onUpdate:modelValue":
                  e0[2] || (e0[2] = (e$) => (e2.contact.name = e$)),
                maxlength: "128",
                class:
                  "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400",
              },
              null,
              512,
            ),
            [[ns, e2.contact.name]],
          ),
        ]),
        Pl("div", ju, [
          Fu,
          Zn(
            Pl(
              "input",
              {
                type: "text",
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.contact.phone = e$)),
                maxlength: "12",
                class:
                  "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400",
              },
              null,
              512,
            ),
            [[ns, e2.contact.phone]],
          ),
        ]),
      ]),
    ])
  );
};
const zu = {
    components: {
      Header: Zc,
      Footer: tu,
    },
    setup() {
      jl("setDark")();
      let e$ = rt(),
        e0 = jl("alert"),
        e8 = da(() => {
          var e$;
          return null != (e$ = So.settings.services) ? e$ : [];
        });
      return {
        serviceOffer: e$,
        broadcastService: async function () {
          let e8 = e$.value;
          if (!e8.content) return e0("Informe um motivo");
          let e2 = await So.getPlayerCoords();
          (So.backend
            .service_request(e8.service.number, e8.content, e2)
            .then((e8) => {
              (null == e8 ? void 0 : e8.error)
                ? e0(e8.error)
                : ((e$.value = null), e0("Chamado efetuado."));
            }),
            (e8.content = null));
        },
        services: e8,
      };
    },
  },
  Bu = {
    class: "flex flex-col h-full",
  },
  Hu = {
    class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme",
  },
  qu = {
    key: 0,
    class: "p-5",
  },
  Gu = {
    class: "font-semibold",
  },
  Wu = {
    class: "mt-3",
  },
  Ku = Pl(
    "label",
    {
      class: "text-2xl",
    },
    "Motivo do chamado",
    -1,
  ),
  Ju = {
    class: "flex justify-between mt-2",
  },
  Xu = {
    key: 1,
  },
  Yu = {
    class: "flex flex-col",
  },
  Zu = {
    class: "font-semibold",
  },
  Qu = {
    class: "text-gray-500 text-xl",
  },
  ed = {
    class: "ml-auto",
  };
zu.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Footer");
  return (
    wl(),
    _l("div", Bu, [
      Pl(e6, {
        name: "Servi\xe7os",
      }),
      Pl("div", Hu, [
        e2.serviceOffer
          ? (wl(),
            _l("div", qu, [
              Pl("h1", Gu, g(e2.serviceOffer.service.name), 1),
              Pl("div", Wu, [
                Ku,
                Zn(
                  Pl(
                    "textarea",
                    {
                      "onUpdate:modelValue":
                        e0[1] ||
                        (e0[1] = (e$) => (e2.serviceOffer.content = e$)),
                      onKeydown:
                        e0[2] ||
                        (e0[2] = us(
                          is(() => {}, ["prevent"]),
                          ["enter"],
                        )),
                      class:
                        "block w-full h-80 resize-none bg-theme border border-theme rounded-md p-2 fancy-scroll",
                      maxlength: "200",
                    },
                    null,
                    544,
                  ),
                  [[ns, e2.serviceOffer.content]],
                ),
              ]),
              Pl("div", Ju, [
                Pl(
                  "button",
                  {
                    class: "block px-4 py-2 text-red-500",
                    onClick:
                      e0[3] || (e0[3] = (e$) => (e2.serviceOffer = null)),
                  },
                  " Cancelar ",
                ),
                Pl(
                  "button",
                  {
                    class: "block px-4 py-2 text-blue-500",
                    onClick:
                      e0[4] ||
                      (e0[4] = (...e$) =>
                        e2.broadcastService && e2.broadcastService(...e$)),
                  },
                  " Enviar ",
                ),
              ]),
            ]))
          : (wl(),
            _l("ul", Xu, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.services,
                  (e$) => (
                    wl(),
                    _l(
                      "li",
                      {
                        class: "border-b border-theme p-5 flex items-center",
                        key: e$.number,
                      },
                      [
                        Pl("div", Yu, [
                          Pl("h1", Zu, g(e$.name), 1),
                          Pl("h3", Qu, g(e$.number), 1),
                        ]),
                        Pl("div", ed, [
                          Pl(
                            "i",
                            {
                              onClick: (e0) =>
                                (e2.serviceOffer = {
                                  service: e$,
                                }),
                              class: "fas fa-comment-alt-lines text-blue-500",
                            },
                            null,
                            8,
                            ["onClick"],
                          ),
                        ]),
                      ],
                    )
                  ),
                ),
                128,
              )),
            ])),
      ]),
      Pl(e4),
    ])
  );
};
const td = {
    components: {
      Header: Zc,
      Footer: tu,
    },
    inject: ["setDark"],
    setup() {
      var e$;
      jl("setDark")();
      let e0 = jl("prompt"),
        e8 = jl("alert"),
        e2 = rt(null != (e$ = cc().currentRoute.value.query.phone) ? e$ : "");
      return {
        number: e2,
        add: function (e$) {
          var e0, e8;
          let e3 = So.settings.phone_template || "XXX-XXX",
            e1;
          e2.value.length < e3.length &&
            ((e2.value += e$),
            (e2.value =
              ((e0 = e3),
              (e8 = e2.value.match(/\d/g)),
              (e1 = 0),
              e0
                .replace(/X/g, () => e8[e1++])
                .replace(/undefined/g, "")
                .replace(/-$/, ""))));
        },
        save: async function () {
          var e$;
          let e3 =
            null == (e$ = await e0("Nome do contato")) ? void 0 : e$.trim();
          if (e3)
            return e2.value == So.identity.phone
              ? e8("N\xfamero inv\xe1lido")
              : e3.length > 128
                ? e8("Nome inv\xe1lido")
                : void So.backend.addContact(e2.value, e3).then((e$) => {
                    e$ instanceof Object
                      ? (So.contacts.value.push(e$),
                        (e2.value = ""),
                        So.pusher.emit("ADD_CONTACT", e$))
                      : e8("Este n\xfamero n\xe3o existe");
                  });
        },
        backspace: function () {
          let e$ = e2.value;
          e2.value = e$.substr(0, Math.max(0, e$.length - 1));
        },
        call: function (e$ = !1) {
          if (!e2.value || e2.value == So.identity.phone)
            return e8("N\xfamero inv\xe1lido");
          So.pusher.emit("CALL_TO", e2.value, e$);
        },
      };
    },
    activated() {
      this.setDark(!1);
    },
  },
  nd = sn("data-v-a03b3120");
ln("data-v-a03b3120");
const ld = {
    class: "flex flex-col h-full bg-theme",
  },
  ad = {
    class: "flex-1",
  },
  sd = {
    class: "text-center w-3/4 mx-auto p-5 mt-24 mb-12",
  },
  od = {
    class: "block text-6xl h-16 text-theme",
  },
  rd = {
    class: "mx-16",
  },
  id = {
    class: "flex justify-between w-full",
  },
  cd = {
    class: "flex justify-between w-full mt-4",
  },
  ud = {
    class: "flex justify-between w-full mt-4",
  },
  dd = {
    class: "mt-4 flex justify-between w-full text-center",
  },
  pd = Pl(
    "i",
    {
      class: "fal fa-user-plus",
    },
    null,
    -1,
  ),
  fd = Pl(
    "i",
    {
      class: "fal fa-backspace",
    },
    null,
    -1,
  ),
  md = {
    class: "grid grid-cols-3 gap-12 mt-4",
  },
  hd = Pl(
    "i",
    {
      class: "fas fa-video text-4xl",
    },
    null,
    -1,
  ),
  bd = Pl(
    "i",
    {
      class: "fas fa-phone-alt text-4xl",
    },
    null,
    -1,
  );
an();
const gd = nd((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header"),
    e4 = dl("Footer");
  return (
    wl(),
    _l("div", ld, [
      Pl(e6, {
        name: "Teclado",
      }),
      Pl("div", ad, [
        Pl("div", sd, [Pl("span", od, g(e2.number), 1)]),
        Pl("div", rd, [
          Pl("div", id, [
            Pl(
              "button",
              {
                number: "",
                onClick: e0[1] || (e0[1] = (e$) => e2.add(1)),
              },
              "1",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[2] || (e0[2] = (e$) => e2.add(2)),
              },
              "2",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[3] || (e0[3] = (e$) => e2.add(3)),
              },
              "3",
            ),
          ]),
          Pl("div", cd, [
            Pl(
              "button",
              {
                number: "",
                onClick: e0[4] || (e0[4] = (e$) => e2.add(4)),
              },
              "4",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[5] || (e0[5] = (e$) => e2.add(5)),
              },
              "5",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[6] || (e0[6] = (e$) => e2.add(6)),
              },
              "6",
            ),
          ]),
          Pl("div", ud, [
            Pl(
              "button",
              {
                number: "",
                onClick: e0[7] || (e0[7] = (e$) => e2.add(7)),
              },
              "7",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[8] || (e0[8] = (e$) => e2.add(8)),
              },
              "8",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[9] || (e0[9] = (e$) => e2.add(9)),
              },
              "9",
            ),
          ]),
          Pl("div", dd, [
            Pl(
              "button",
              {
                number: "",
                onClick: e0[10] || (e0[10] = (e$) => e2.save()),
              },
              [pd],
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[11] || (e0[11] = (e$) => e2.add(0)),
              },
              "0",
            ),
            Pl(
              "button",
              {
                number: "",
                onClick: e0[12] || (e0[12] = (e$) => e2.backspace()),
              },
              [fd],
            ),
          ]),
          Pl("div", md, [
            Pl(
              "button",
              {
                number: "",
                class: "blue-gradient rounded-full text-white",
                onClick: e0[13] || (e0[13] = (e$) => e2.call(!0)),
              },
              [hd],
            ),
            Pl(
              "button",
              {
                number: "",
                class: "green-gradient rounded-full text-white",
                onClick: e0[14] || (e0[14] = (e$) => e2.call()),
              },
              [bd],
            ),
          ]),
        ]),
      ]),
      Pl(e4),
    ])
  );
});
((td.render = gd), (td.__scopeId = "data-v-a03b3120"));
const vd = {
    components: {
      Header: Zc,
      Footer: tu,
    },
    setup() {
      jl("setDark")();
      let e$ = rt([]),
        e0 = So.identity.phone;

      function e8(e$) {
        return [e$.initiator, e$.target].find((e$) => e$ != e0);
      }
      return (
        So.backend.getPhoneCalls().then((e8) => {
          e$.value = e8.map(
            (e$) => ((e$.callback = e$.initiator == e0 || !e$.anonymous), e$),
          );
        }),
        {
          calls: e$,
          myPhone: e0,
          other: e8,
          createCall: function (e$) {
            So.pusher.emit("CALL_TO", e8(e$), e$.video);
          },
        }
      );
    },
  },
  xd = {
    class: "flex flex-col h-full",
  },
  yd = {
    class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme",
  },
  kd = {
    key: 0,
    class: "h-full flex flex-center",
  },
  wd = {
    key: 1,
    class: "p-3 font-semibold text-center",
  },
  Cd = {
    key: 2,
  },
  _d = {
    class: "w-16 text-center",
  },
  Ad = {
    key: 0,
    class: "fas fa-ban text-red-500 fa-2x",
  },
  Sd = {
    key: 2,
    class: "fas fa-question",
  },
  Td = {
    class: "flex flex-col ml-5 text-3xl",
  },
  Ed = {
    class: "font-semibold",
  },
  Rd = {
    class: "text-gray-400",
  },
  Pd = {
    class: "ml-auto self-start text-xl text-gray-400",
  };
vd.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-loading"),
    e7 = dl("Footer");
  return (
    wl(),
    _l("div", xd, [
      Pl(e6, {
        name: "Recentes",
      }),
      Pl("div", yd, [
        e2.calls
          ? e2.calls.length
            ? (wl(),
              _l("ul", Cd, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(
                    e2.calls,
                    (e0) => (
                      wl(),
                      _l(
                        "li",
                        {
                          key: e0.id,
                          onClick: (e$) => e0.callback && e2.createCall(e0),
                          class: "border-b border-theme p-5 flex items-center",
                        },
                        [
                          Pl("div", _d, [
                            "refused" === e0.status && e0.target == e2.myPhone
                              ? (wl(), _l("i", Ad))
                              : "ok" === e0.status
                                ? (wl(),
                                  _l(
                                    "i",
                                    {
                                      key: 1,
                                      class: [
                                        "fas",
                                        [
                                          e0.video
                                            ? "fa-video"
                                            : "fa-phone transform rotate-90",
                                        ],
                                      ],
                                    },
                                    null,
                                    2,
                                  ))
                                : (wl(), _l("i", Sd)),
                          ]),
                          Pl("div", Td, [
                            Pl(
                              "h1",
                              Ed,
                              g(
                                e0.callback
                                  ? e$.$filters.getNameByPhone(e2.other(e0))
                                  : "(An\xf4nimo)",
                              ),
                              1,
                            ),
                            Pl(
                              "span",
                              Rd,
                              g(e$.$filters.duration(e0.duration)),
                              1,
                            ),
                          ]),
                          Pl(
                            "span",
                            Pd,
                            g(e$.$filters.unixToDayOfMonth(e0.created_at)),
                            1,
                          ),
                        ],
                        8,
                        ["onClick"],
                      )
                    ),
                  ),
                  128,
                )),
              ]))
            : (wl(),
              _l("h1", wd, " Voc\xea n\xe3o realizou nenhuma liga\xe7\xe3o "))
          : (wl(), _l("div", kd, [Pl(e4)])),
      ]),
      Pl(e7),
    ])
  );
};
const Ld = {
    components: {
      Header: Zc,
      Footer: tu,
    },
    setup() {
      jl("setDark")();
      let e$ = So.settings.blocks;
      return {
        blocks: e$,
        unblock: function (e0) {
          So.backend.unblock(e0).then(() => {
            let e8 = e$.indexOf(e0);
            e8 >= 0 && e$.splice(e8, 1);
          });
        },
      };
    },
  },
  Id = {
    class: "flex flex-col h-full",
  },
  Od = {
    class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme",
  },
  Md = {
    key: 0,
    class: "h-full flex flex-center",
  },
  Vd = {
    key: 1,
    class: "p-3 font-semibold text-center",
  },
  Dd = {
    key: 2,
  },
  Nd = {
    class: "font-semibold",
  },
  Ud = Pl(
    "button",
    {
      class: "ml-auto px-2",
    },
    [
      Pl("i", {
        class: "fal fa-times text-4xl text-gray-500",
      }),
    ],
    -1,
  );
Ld.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-loading"),
    e7 = dl("Footer");
  return (
    wl(),
    _l("div", Id, [
      Pl(e6, {
        name: "Bloqueios",
      }),
      Pl("div", Od, [
        e2.blocks
          ? e2.blocks.length
            ? (wl(),
              _l("ul", Dd, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(
                    e2.blocks,
                    (e0) => (
                      wl(),
                      _l(
                        "li",
                        {
                          key: e0,
                          onClick: (e$) => e2.unblock(e0),
                          class: "border-b border-theme p-5 flex items-center",
                        },
                        [
                          Pl("h1", Nd, g(e$.$filters.getNameByPhone(e0)), 1),
                          Ud,
                        ],
                        8,
                        ["onClick"],
                      )
                    ),
                  ),
                  128,
                )),
              ]))
            : (wl(), _l("h1", Vd, " Nenhum n\xfamero bloqueado "))
          : (wl(), _l("div", Md, [Pl(e4)])),
      ]),
      Pl(e7),
    ])
  );
};
const $d = {
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = rt(So.hasNotificationFor("sms"));
      Tn(e$, (e$) => So.setNotificationFor("sms", e$));
      let e0 = rt(""),
        e8 = da(() => {
          var e$;
          let e8 = e0.value,
            e2 = [];
          for (let [e3, e1] of Object.entries(So.messages))
            e1.length &&
              (e3.includes(e8) ||
                Bs(e3).toLowerCase().includes(e8.toLowerCase())) &&
              e2.push({
                phone: e3,
                message: e1[e1.length - 1],
              });
          for (let e6 of So.contacts.value)
            e8 &&
              !(null == (e$ = So.messages[e6.phone]) ? void 0 : e$.length) &&
              (e6.phone.includes(e8) ||
                e6.name.toLowerCase().includes(e8.toLowerCase())) &&
              e2.push({
                phone: e6.phone,
                message: null,
              });
          return (
            e2.sort((e$, e0) => {
              var e8, e2;
              return (
                (null == (e8 = e0.message) ? void 0 : e8.created_at) -
                  (null == (e2 = e$.message) ? void 0 : e2.created_at) || 0
              );
            }),
            e2
          );
        });
      return {
        query: e0,
        chats: e8,
        notifications: e$,
      };
    },
  },
  jd = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  Fd = {
    class: "flex h-32 pt-16 bg-theme-accent border-b border-theme",
  },
  zd = Pl(
    "h1",
    {
      class: "mx-auto font-bold",
    },
    "Mensagens",
    -1,
  ),
  Bd = {
    key: 0,
    class: "far fa-bell",
  },
  Hd = {
    key: 1,
    class: "far fa-bell-slash",
  },
  qd = {
    class: "p-4",
  },
  Gd = {
    class: "relative",
  },
  Wd = Pl(
    "i",
    {
      class: "absolute top-3 left-4 text-gray-500 fas fa-search text-xl",
    },
    null,
    -1,
  ),
  Kd = {
    class: "flex-1 overflow-y-auto hide-scroll",
  },
  Jd = {
    class: "flex flex-col",
  },
  Xd = {
    class: "text-3xl",
  },
  Yd = {
    key: 0,
    class: "text-2xl text-gray-500",
  },
  Zd = {
    key: 1,
    class: "text-2xl text-gray-500 italic",
  },
  Qd = {
    key: 0,
    class: "text-xl text-gray-500",
  };
$d.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", jd, [
      Pl("div", Fd, [
        zd,
        Pl(
          "button",
          {
            class: "absolute top-16 right-0 w-20 px-5",
            onClick:
              e0[1] || (e0[1] = (e$) => (e2.notifications = !e2.notifications)),
          },
          [e2.notifications ? (wl(), _l("i", Bd)) : (wl(), _l("i", Hd))],
        ),
      ]),
      Pl("div", qd, [
        Pl("div", Gd, [
          Wd,
          Zn(
            Pl(
              "input",
              {
                "onUpdate:modelValue":
                  e0[2] || (e0[2] = (e$) => (e2.query = e$)),
                placeholder: "Pesquise um n\xfamero ou contato",
                type: "text",
                class:
                  "w-full bg-theme border border-theme rounded-full p-2 pl-12 pr-6 text-2xl",
              },
              null,
              512,
            ),
            [[ns, e2.query]],
          ),
        ]),
      ]),
      Pl("ul", Kd, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.chats,
            (e0) => (
              wl(),
              _l(
                "li",
                {
                  key: e0.phone,
                  class:
                    "flex justify-between items-start border-b border-theme p-4",
                  onClick: (e8) => e$.$router.push("/sms/" + e0.phone),
                },
                [
                  Pl("div", Jd, [
                    Pl("h1", Xd, g(e$.$filters.getNameByPhone(e0.phone)), 1),
                    e0.message
                      ? (wl(),
                        _l(
                          "p",
                          Yd,
                          g(
                            e0.message.content ||
                              (e0.message.image
                                ? "📷 Foto"
                                : "\uD83C\uDF0E Localiza\xe7\xe3o"),
                          ),
                          1,
                        ))
                      : (wl(), _l("p", Zd, "Nenhuma mensagem...")),
                  ]),
                  e0.message
                    ? (wl(),
                      _l(
                        "p",
                        Qd,
                        g(e$.$filters.unixToRelative(e0.message.created_at)),
                        1,
                      ))
                    : Ml("", !0),
                ],
                8,
                ["onClick"],
              )
            ),
          ),
          128,
        )),
      ]),
    ])
  );
};
const ep = {
    setup() {
      jl("setDark")(So.darkTheme.value);
      let { id: e$ } = uc().params;
      So.messages[e$] || (So.messages[e$] = []);
      let e0 = So.messages[e$],
        e8 = rt(),
        { isAndroid: e2 } = So.settings;
      return (
        Tn(e0, () => {
          Lt(
            () =>
              !e8.value &&
              document.querySelector(".overflow-y-auto").scrollTo(0, 9e6),
          );
        }),
        {
          isAndroid: e2,
          id: e$,
          messages: e0,
          updateGPS: function (e$) {
            So.pusher.emit("GPS", {
              location: e$,
            });
          },
          content: e8,
          send: function () {
            e8.value &&
              (So.backend.sms_send(e$, e8.value).then((e$) => {
                e$ && e0.push(e$) > 100 && e0.shift();
              }),
              (e8.value = null));
          },
        }
      );
    },
  },
  tp = sn("data-v-ec3dade0");
ln("data-v-ec3dade0");
const np = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  lp = {
    class: "flex h-32 pt-16 bg-theme-accent border-b border-theme",
  },
  ap = {
    key: 0,
    class: "far fa-arrow-left",
  },
  sp = {
    key: 1,
    class: "fas fa-chevron-left text-blue-400",
  },
  op = {
    class: "flex-1 overflow-y-auto hide-scroll mt-2",
  },
  rp = {
    key: 0,
    class: "mx-2 fal fa-check-double text-gray-400 text-base",
  },
  ip = {
    class: "break-words whitespace-pre-line",
  },
  cp = {
    class: "px-5 py-6",
  },
  up = {
    class: "relative",
  },
  dp = Pl(
    "i",
    {
      class: "fal fa-paper-plane text-gray-600 text-3xl",
    },
    null,
    -1,
  );
an();
const pp = tp(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l("div", np, [
      Pl("div", lp, [
        Pl(
          "button",
          {
            class: "absolute top-16 px-5",
            onClick:
              e0[1] ||
              (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
          },
          [e2.isAndroid ? (wl(), _l("i", ap)) : (wl(), _l("i", sp))],
        ),
        Pl(
          "h1",
          {
            class: [
              {
                "ml-16": e2.isAndroid,
                "mx-auto": !e2.isAndroid,
              },
              "font-bold",
            ],
          },
          g(e$.$filters.getNameByPhone(e2.id).substr(0, 12)),
          3,
        ),
      ]),
      Pl("ul", op, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.messages,
            (e0, e8) => (
              wl(),
              _l(
                "li",
                {
                  key: e8,
                  class: [
                    "flex items-end mb-2 mx-4",
                    {
                      "flex-row-reverse": e0.sender != e2.id,
                    },
                  ],
                },
                [
                  e0.delivered && e0.sender != e2.id
                    ? (wl(), _l("i", rp))
                    : Ml("", !0),
                  Pl(
                    "div",
                    {
                      class: "p-3 text-3xl rounded-2xl",
                      received: e0.sender == e2.id,
                      style: {
                        "max-width": "75%",
                      },
                    },
                    [
                      e0.image
                        ? (wl(),
                          _l(
                            "img",
                            {
                              key: 0,
                              class: "rounded-xl",
                              src: e0.image,
                            },
                            null,
                            8,
                            ["src"],
                          ))
                        : e0.location
                          ? (wl(),
                            _l(
                              "img",
                              {
                                key: 1,
                                class: "rounded-xl",
                                src: e$.$asset("/stock/maps.jpg"),
                                onClick: (e$) => e2.updateGPS(e0.location),
                              },
                              null,
                              8,
                              ["src", "onClick"],
                            ))
                          : Ml("", !0),
                      Pl("p", ip, g(e0.content), 1),
                    ],
                    8,
                    ["received"],
                  ),
                ],
                2,
              )
            ),
          ),
          128,
        )),
      ]),
      Pl("div", cp, [
        Pl("div", up, [
          Zn(
            Pl(
              "input",
              {
                onKeydown:
                  e0[2] ||
                  (e0[2] = us((...e$) => e2.send && e2.send(...e$), ["enter"])),
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.content = e$)),
                maxlength: "255",
                type: "text",
                class:
                  "w-full bg-theme border border-theme rounded-full p-4 pr-16 text-2xl",
              },
              null,
              544,
            ),
            [[ns, e2.content]],
          ),
          Pl(
            "button",
            {
              class: "absolute top-2 right-6",
              onClick: e0[4] || (e0[4] = (...e$) => e2.send && e2.send(...e$)),
            },
            [dp],
          ),
        ]),
      ]),
    ])
  ),
);
((ep.render = pp), (ep.__scopeId = "data-v-ec3dade0"));
const fp = ho.callback;
(Tn(fp, (e$) => {
  e$ && VO.push("/gallery");
}),
  So.pusher.on("Route:afterEach", (e$) => {
    "/gallery" != e$.path && fp.value && (fp.value = null);
  }));
const mp = {
    setup() {
      jl("setDark")();
      let e$ = mo(),
        e0 = So.gallery,
        e8 = So.settings.isAndroid,
        e2 = rt(),
        e3 = da(() =>
          e0
            .map((e$) => e$.folder)
            .filter((e$, e0, e8) => e8.indexOf(e$) == e0)
            .sort(),
        ),
        e1 = da(() => e0.filter((e$) => e$.folder === e2.value));
      return (
        e0.checked ||
          So.backend.gallery().then((e$) => {
            (Object.assign(e0, e$), (e0.checked = !0));
          }),
        {
          isAndroid: e8,
          callback: fp,
          takePhoto: function () {
            co()
              .request(!1, "/")
              .catch(() => {});
          },
          path: e2,
          folders: e3,
          files: e1,
          select: function (e$) {
            fp.value
              ? (fp.value(e$.url), (fp.value = null), VO.back())
              : VO.push("/gallery/carousel/" + e$.id);
          },
          folderLang: e$,
        }
      );
    },
  },
  hp = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  bp = {
    class: "h-32 pt-16 border-b border-theme bg-theme-accent",
  },
  gp = {
    key: 0,
    class: "far fa-arrow-left",
  },
  vp = {
    key: 1,
    class: "far fa-chevron-left text-yellow-500",
  },
  xp = Pl(
    "i",
    {
      class: "fal fa-camera text-yellow-500",
    },
    null,
    -1,
  ),
  yp = {
    class: "flex-1 overflow-x-auto hide-scroll",
  },
  kp = {
    key: 0,
    class: "p-5",
  },
  wp = Pl(
    "i",
    {
      class: "fas fa-folder text-yellow-500 text-6xl",
    },
    null,
    -1,
  ),
  Cp = {
    class: "ml-4",
  },
  _p = {
    key: 1,
    class: "grid grid-cols-4 gap-0.5",
  };
mp.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  return (
    wl(),
    _l("div", hp, [
      Pl("div", bp, [
        e2.path
          ? (wl(),
            _l(
              "button",
              {
                key: 0,
                onClick: e0[1] || (e0[1] = (e$) => (e2.path = null)),
                class: "absolute top-16 px-4",
              },
              [e2.isAndroid ? (wl(), _l("i", gp)) : (wl(), _l("i", vp))],
            ))
          : Ml("", !0),
        Pl(
          "h1",
          {
            class: [
              [e2.path && e2.isAndroid ? "ml-16" : "text-center"],
              "font-bold text-4xl",
            ],
          },
          g(null != (e6 = e2.folderLang[e2.path]) ? e6 : "Galeria"),
          3,
        ),
        e2.callback
          ? Ml("", !0)
          : (wl(),
            _l(
              "button",
              {
                key: 1,
                onClick:
                  e0[2] ||
                  (e0[2] = (...e$) => e2.takePhoto && e2.takePhoto(...e$)),
                class: "absolute top-16 right-4 px-4",
              },
              [xp],
            )),
      ]),
      Pl("div", yp, [
        e2.path
          ? (wl(),
            _l("ul", _p, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.files,
                  (e$) => (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e$.id,
                      },
                      [
                        Pl(
                          "div",
                          {
                            onClick: (e0) => e2.select(e$),
                            class: "w-full h-36",
                            style: {
                              background: `url(${e$.url})`,
                              backgroundSize: "100% 100%",
                            },
                          },
                          null,
                          12,
                          ["onClick"],
                        ),
                      ],
                    )
                  ),
                ),
                128,
              )),
            ]))
          : (wl(),
            _l("ul", kp, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.folders,
                  (e$) => (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e$,
                        class: "flex items-center mb-4",
                        onClick: (e0) => (e2.path = e$),
                      },
                      [wp, Pl("h1", Cp, g(e2.folderLang[e$]), 1)],
                      8,
                      ["onClick"],
                    )
                  ),
                ),
                128,
              )),
            ])),
      ]),
    ])
  );
};
const Ap = {
    setup() {
      jl("setDark")();
      let e$ = uc(),
        e0 = mo(),
        e8 = rt(So.gallery.find((e0) => e0.id == e$.params.file)),
        e2 = Ze(So.gallery.filter((e$) => e$.folder === e8.value.folder)),
        e3 = da(() => e2.indexOf(e8.value)),
        e1 = da(() => e2.length);
      return {
        file: e8,
        index: e3,
        length: e1,
        next: function (e$ = 1) {
          let e0 = e2.indexOf(e8.value) + e$;
          e0 >= 0 && e0 < e2.length && (e8.value = e2[e0]);
        },
        folders: e0,
      };
    },
  },
  Sp = {
    class: "h-full bg-theme text-theme",
  },
  Tp = {
    class: "h-32 pt-16 text-center bg-theme-accent border-b border-theme",
  },
  Ep = {
    class: "mt-64 relative",
  },
  Rp = {
    class: "mt-4 text-center font-semibold text-4xl",
  };
Ap.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Sp, [
      Pl("div", Tp, [Pl("h1", null, g(e2.folders[e2.file.folder]), 1)]),
      Pl("div", Ep, [
        Pl("button", {
          onClick: e0[1] || (e0[1] = (e$) => e2.next(-1)),
          class: "absolute left-0 top-0 h-96 w-1/4",
        }),
        Pl(
          "img",
          {
            src: e2.file.url,
            class: "h-96 mx-auto",
          },
          null,
          8,
          ["src"],
        ),
        Pl("button", {
          onClick: e0[2] || (e0[2] = (e$) => e2.next(1)),
          class: "absolute right-0 top-0 h-96 w-1/4",
        }),
      ]),
      Pl("div", Rp, g(e2.index + 1) + " / " + g(e2.length), 1),
    ])
  );
};
class Pp {
  constructor(e$) {
    ((this.readyState = 0), (this.call = e$));
    let e0 = So.settings.videoServer;
    if (
      ((this.isAudioUDP = "rtc" == e$.mode),
      (this.isVideoUDP = "rtc" == e0),
      (this.channels = {}),
      "rtc" == e$.mode || (e$.isVideo && "rtc" == e0))
    ) {
      let e8 = [];
      if (So.settings.turnServer) {
        let [e2, e3, e1] = So.settings.turnServer.split(",");
        e8.push({
          urls: [e2],
          username: e3,
          credential: e1,
        });
      } else
        e8.push({
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        });
      ((this.peer = new RTCPeerConnection({
        iceServers: e8,
      })),
        (this.peer.onicecandidate = ({ candidate: e$ }) =>
          this.onicecandidate(e$)),
        (this.peer.ontrack = ({ streams: e$ }) => this.onstreams(e$)),
        (this.peer.ondatachannel = ({ channel: e$ }) => {
          ((this.channels[e$.label] = e$),
            (e$.onmessage = ({ data: e$ }) => this.blobCallback(Ip(e$))));
        }));
    }
  }
  addStream(e$) {
    e$.getTracks().forEach((e0) => this.peer.addTrack(e0, e$));
  }
  onicecandidate(e$) {
    throw Error("onicecandidate should be replaced by a new function");
  }
  onstreams(e$) {
    throw Error("ontrack should be replaced by a new function");
  }
  async createOffer() {
    let e$ = await this.peer.createOffer({
      offerToReceiveAudio: !0,
    });
    return (await this.peer.setLocalDescription(e$), e$);
  }
  setAnswer(e$) {
    return this.peer.setRemoteDescription(e$);
  }
  async createAnswer(e$) {
    await this.peer.setRemoteDescription(e$);
    let e0 = this.peer.createAnswer({
      offerToReceiveAudio: !0,
    });
    return (await this.peer.setLocalDescription(e0), e0);
  }
  addIceCandidate(e$) {
    this.peer.addIceCandidate(e$);
  }
  addVoice() {
    let { mode: e$, room: e0 } = this.call;
    ["mumble-voip", "voip", "pma-voice"].includes(e$) &&
      So.client.exports(e$, "addPlayerToCall", e0);
  }
  async _addVideoStream(e$) {
    var e0;
    ro.start();
    let e8 = ro.canvas,
      e2 = document.createElement("canvas");
    ((e2.width = 375), (e2.height = 812));
    let e3 = e2.getContext("2d");
    for (; this.readyState; ) {
      let e1 = Date.now();
      e3.drawImage(
        e8,
        0.26 * e8.width,
        0,
        0.28 * e8.width,
        e8.height,
        0,
        0,
        375,
        812,
      );
      let e6 = await new Promise((e$) => e2.toBlob(e$, "image/jpeg", 0.3));
      (this.isVideoUDP
        ? null == (e0 = this.channels.video) || e0.send(await e6.arrayBuffer())
        : this.socket.readyState == WebSocket.OPEN && this.socket.send(e6),
        e$(e6, !0),
        await Lp(42 - (Date.now() - e1)));
    }
    ro.stop();
  }
  addVideo(e$) {
    if (((this.blobCallback = e$), this.isVideoUDP)) {
      if (this.call.owner) {
        let e0 = this.peer.createDataChannel("video");
        ((e0.onmessage = ({ data: e0 }) => e$(Ip(e0))),
          (e0.onopen = () => (this.channels.video = e0)));
      }
      ((this.readyState = 1), this._addVideoStream(e$));
    } else {
      let e8 = So.settings.videoServer;
      (10 > e8.lastIndexOf("/") && (e8 += "/"),
        (e8 += this.call.room),
        (this.socket = new WebSocket(e8)),
        (this.socket.onopen = () => {
          ((this.readyState = 1), this._addVideoStream(e$));
        }),
        (this.socket.onmessage = ({ data: e0 }) => e$(e0)),
        (this.socket.onclose = () => (this.readyState = 0)));
    }
  }
  close() {
    var e$, e0;
    ((this.readyState = 0),
      null == (e$ = this.peer) || e$.close(),
      null == (e0 = this.socket) || e0.close());
    let { room: e8, mode: e2 } = this.call;
    ["mumble-voip", "voip", "pma-voice"].includes(e2)
      ? So.client.exports(e2, "removePlayerFromCall", e8)
      : "tokovoip" === e2 &&
        So.client.exports("tokovoip_script", "removePlayerFromRadio", e8);
  }
}

function Lp(e$) {
  return new Promise((e0) => setTimeout(e0, e$));
}

function Ip(e$) {
  return new Blob([new Uint8Array(e$, 0, e$.byteLength)]);
}
const Op = {
    setup() {
      jl("setDark")(!0);
      let { backgroundURL: e$, settings: e0, currentCall: e8 } = So,
        e2 = jl("setKeepInput"),
        e3 = e8.value,
        e1 = rt(0),
        e6 = rt(0),
        e4 = new Pp(e3),
        e7 = cc(),
        e5 = Ze({
          big: null,
          small: null,
        }),
        eV = rt(),
        eN = rt(),
        e9 = {
          ring: So.settings.ringSound,
          dial: So.settings.dialSound,
        },
        eU = null;
      async function ej() {
        (document
          .querySelectorAll("audio[audioEffect]")
          .forEach((e$) => e$.pause()),
          So.client.playAnim("toCall", !0),
          (e3.accepted = !0),
          So.client.setState("inCall", !0),
          So.client.setState("inVideoCall", e3.isVideo),
          e3.isVideo &&
            (e4.addVideo((e$, e0) => {
              let e8 = e0 ? eN.value : eV.value;
              if (
                (e0 ? (e5.small = !0) : (e5.big = !0),
                e8 instanceof HTMLCanvasElement)
              ) {
                let e2 = e8.getContext("2d"),
                  e3 = new Image();
                ((e3.onload = () =>
                  e2.drawImage(e3, 0, 0, e8.width, e8.height)),
                  (e3.src = URL.createObjectURL(e$)));
              }
            }),
            So.client.SetInVideoCall(!0)),
          e2(!0),
          e4.addVoice(),
          (e4.isAudioUDP || (e3.isVideo && e4.isVideoUDP)) &&
            e3.owner &&
            ez("setOffer", await e4.createOffer()),
          (eU = setInterval(() => (e1.value += 1), 1e3)));
      }

      function eD(e$) {
        ((So.currentCall.value = null),
          e7.back(),
          eU && clearInterval(eU),
          So.client.setState("inCall", !1),
          So.client.setState("inVideoCall", !1),
          e4.close(),
          e3.isVideo && So.client.SetInVideoCall(!1),
          So.visible.value
            ? So.client.playAnim("callToText", !0)
            : So.client.playAnim("fromCall"),
          e$ && So.backend.endPhoneCall(e3.room));
      }
      (e4.isAudioUDP &&
        (navigator.mediaDevices
          .getUserMedia({
            audio: {
              autoGainControl: !1,
            },
          })
          .then((e$) => e4.addStream(e$))
          .catch(() => console.error("No available stream")),
        (e4.onstreams = (e$) => {
          let e0 = new Audio();
          ((e0.autoplay = !0), (e0.srcObject = e$[0]));
        })),
        e4.peer && (e4.onicecandidate = (e$) => e$ && ez("addCandidate", e$)),
        So.onceRoute("CALL_READY", ej));
      let ez = (e$, ...e0) => So.backend.call_p2p(e$, e0),
        eF = {
          setOffer: async (e$) => ez("setAnswer", await e4.createAnswer(e$)),
          setAnswer: (e$) => e4.setAnswer(e$),
          addCandidate: (e$) => e$ && e4.addIceCandidate(e$),
        };
      return (
        So.onceRoute("CALL_P2P", ({ event: e$, args: e0 }) => {
          eF[e$](...(e0 || []));
        }),
        So.onceRoute("FORCE_LEAVE_CALL", () => {
          So.currentCall.value && eD(!0);
        }),
        vn(() => {
          let e$ = document.getElementById(e3.owner ? "dial" : "ring");
          ((e$.currentTime = 0), e$.play());
        }),
        So.onceRoute("CALL_END", () => eD()),
        {
          backgroundURL: e$,
          call: e3,
          video: e5,
          videoPeer: eV,
          videoSource: eN,
          settings: e0,
          status: e6,
          duration: e1,
          audios: e9,
          accept: function () {
            (So.backend.answerPhoneCall(e3.room), ej());
          },
          block: function () {
            ((So.currentCall.value = null),
              e7.back(),
              So.backend.block(e3.contact.phone),
              So.settings.blocks.push(e3.contact.phone));
          },
          refuse: function () {
            ((So.currentCall.value = null),
              e7.back(),
              So.backend.refusePhoneCall(e3.room));
          },
          end: eD,
        }
      );
    },
  },
  Mp = sn("data-v-58ae5e69");
ln("data-v-58ae5e69");
const Vp = {
    class: "mt-48 text-7xl text-white",
  },
  Dp = {
    class: "text-white mt-4",
  },
  Np = {
    key: 0,
    class: "absolute inset-0 bg-black",
    big: "",
  },
  Up = {
    ref: "videoPeer",
    width: "375",
    height: "812",
    class: "w-full h-full",
  },
  $p = {
    key: 1,
    class: "absolute right-4 top-16 w-64 h-96 bg-black rounded-3xl",
    small: "",
  },
  jp = {
    ref: "videoSource",
    width: "160",
    height: "240",
    class: "w-full h-full rounded-3xl",
  },
  Fp = {
    class: "w-full absolute bottom-48",
  },
  zp = {
    key: 0,
    class: "flex justify-around",
  },
  Bp = Pl(
    "i",
    {
      class: "fas fa-phone transform rotate-225",
    },
    null,
    -1,
  ),
  Hp = Pl(
    "h1",
    {
      class: "text-white text-xl text-center mt-3",
    },
    "Recusar",
    -1,
  ),
  qp = Pl(
    "i",
    {
      class: "fas fa-ban",
    },
    null,
    -1,
  ),
  Gp = Pl(
    "h1",
    {
      class: "text-white text-xl text-center mt-3",
    },
    "Bloquear",
    -1,
  ),
  Wp = {
    key: 0,
    class: "fas fa-video",
  },
  Kp = {
    key: 1,
    class: "fas fa-phone transform rotate-90",
  },
  Jp = Pl(
    "h1",
    {
      class: "text-white text-xl text-center mt-3",
    },
    "Atender",
    -1,
  ),
  Xp = {
    key: 1,
    class: "text-center",
  },
  Yp = Pl(
    "i",
    {
      class: "fas fa-times",
    },
    null,
    -1,
  ),
  Zp = Pl(
    "h1",
    {
      class: "text-white text-xl mt-3",
    },
    "Encerrar",
    -1,
  );
an();
const Qp = Mp(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l(
      "div",
      {
        class: "flex flex-col items-center h-full bg-cover relative",
        style: {
          backgroundImage: "url(" + e2.backgroundURL + ")",
          backgroundPosition: "center",
          backgroundColor: "black",
        },
      },
      [
        Pl(
          "h1",
          Vp,
          g(
            e2.call.isAnonymous && !e2.call.owner
              ? "An\xf4nimo"
              : e2.call.contact.name.substr(0, 16),
          ),
          1,
        ),
        Pl("span", Dp, g(e$.$filters.duration(e2.duration)), 1),
        e2.video.big
          ? (wl(), _l("div", Np, [Pl("canvas", Up, null, 512)]))
          : Ml("", !0),
        e2.video.small
          ? (wl(), _l("div", $p, [Pl("canvas", jp, null, 512)]))
          : Ml("", !0),
        Pl("div", Fp, [
          e2.call.accepted || e2.call.owner
            ? (wl(),
              _l("div", Xp, [
                Pl(
                  "button",
                  {
                    class:
                      "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
                    onClick: e0[4] || (e0[4] = (e$) => e2.end(!0)),
                  },
                  [Yp],
                ),
                Zp,
              ]))
            : (wl(),
              _l("div", zp, [
                Pl("div", null, [
                  Pl(
                    "button",
                    {
                      class:
                        "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
                      onClick:
                        e0[1] ||
                        (e0[1] = (...e$) => e2.refuse && e2.refuse(...e$)),
                    },
                    [Bp],
                  ),
                  Hp,
                ]),
                Pl("div", null, [
                  Pl(
                    "button",
                    {
                      class:
                        "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
                      onClick:
                        e0[2] ||
                        (e0[2] = (...e$) => e2.block && e2.block(...e$)),
                    },
                    [qp],
                  ),
                  Gp,
                ]),
                Pl("div", null, [
                  Pl(
                    "button",
                    {
                      class:
                        "text-white w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full",
                      onClick:
                        e0[3] ||
                        (e0[3] = (...e$) => e2.accept && e2.accept(...e$)),
                    },
                    [
                      e2.call.isVideo
                        ? (wl(), _l("i", Wp))
                        : (wl(), _l("i", Kp)),
                    ],
                  ),
                  Jp,
                ]),
              ])),
        ]),
        Pl(
          "audio",
          {
            audioEffect: "",
            id: "ring",
            src: e2.audios.ring,
            loop: "",
          },
          null,
          8,
          ["src"],
        ),
        Pl(
          "audio",
          {
            audioEffect: "",
            id: "dial",
            src: e2.audios.dial,
            loop: "",
          },
          null,
          8,
          ["src"],
        ),
      ],
      4,
    )
  ),
);
((Op.render = Qp), (Op.__scopeId = "data-v-58ae5e69"));
const ef = {},
  tf = Pl(
    "div",
    {
      class: "h-12 bg-whatsapp-dark",
    },
    null,
    -1,
  ),
  nf = {
    class: "pt-4 bg-whatsapp text-white text-left",
  };
ef.render = function (e$, e0) {
  return (
    wl(),
    _l(bl, null, [tf, Pl("div", nf, [Zt(e$.$slots, "default")])], 64)
  );
};
const lf = {
    props: ["onChange", "tab"],
    setup: (e$) => ({
      fill: (e0, e8) => (e$.tab === e0 ? e8 + "_fill" : e8),
    }),
  },
  af = {
    class: "mt-auto grid grid-cols-4 p-2 px-5 bg-theme-accent",
  },
  sf = {
    class: "cupertino-icons text-6xl",
  },
  of = {
    class: "text-xl",
  };
lf.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", af, [
      (wl(),
      _l(
        bl,
        null,
        fa(
          [
            {
              tab: "calls",
              icon: "phone",
              label: "Chamadas",
            },
            {
              tab: "contacts",
              icon: "person_circle",
              label: "Contatos",
            },
            {
              tab: "chats",
              icon: "chat_bubble_2",
              label: "Conversas",
            },
            {
              tab: "settings",
              icon: "gear",
              label: "Configura\xe7\xf5es",
            },
          ],
          (e$, e0) =>
            Pl(
              "button",
              {
                onClick: (e0) => e8.onChange(e$.tab),
                class: [
                  "p-2",
                  {
                    "bg-lightBlue-400 text-lightBlue-500 bg-opacity-10 rounded-lg":
                      e8.tab == e$.tab,
                  },
                ],
                key: e0,
              },
              [
                Pl("i", sf, g(e2.fill(e$.tab, e$.icon)), 1),
                Pl("p", of, g(e$.label), 1),
              ],
              10,
              ["onClick"],
            ),
        ),
        64,
      )),
    ])
  );
};
const rf = {
    components: {
      Header: ef,
    },
    setup() {
      co();
      let e$ = jl("alert"),
        e0 = rt(!1),
        e8 = rt(!0),
        e2 = rt(So.hasNotificationFor("whatsapp")),
        e3 = rt("true" == So.storage.get("whatsapp-sensitive")),
        e1 = rt(So.asset("/stock/user.svg"));
      return (
        Tn(e3, (e$) => So.storage.set("whatsapp-sensitive", String(e$))),
        So.backend.wpp_getProfile().then((e$) => {
          ((e1.value = e$.avatarURL || So.asset("/stock/user.svg")),
            (e8.value = !!e$.read_receipts),
            (e0.value = !1));
        }),
        Tn(e2, (e$) => So.setNotificationFor("whatsapp", e$)),
        Tn(e8, (e$) => {
          So.backend.wpp_updateSettings(e$);
        }),
        {
          loading: e0,
          avatarURL: e1,
          read_receipts: e8,
          notifications: e2,
          sensitive: e3,
          changeAvatar: async function () {
            try {
              let e$ = await So.useAnyImage("/whatsapp", !0);
              ((e1.value = e$), So.backend.wpp_updateAvatar(e$));
            } catch (e0) {}
          },
          deleteMessages: function () {
            (So.backend
              .wpp_deleteMessages()
              .then(() => e$("Todas as mensagens privadas foram apagadas")),
              So.pusher.emit("WHATSAPP_DELETE_MESSAGES"));
          },
        }
      );
    },
  },
  cf = {
    key: 0,
    class: "flex-1 flex flex-center",
  },
  uf = {
    key: 1,
    class: "flex-1 overflow-y-auto hide-scroll p-5 flex flex-col text-theme",
  },
  df = {
    class: "relative mb-3",
  },
  pf = Pl(
    "i",
    {
      class: "fas fa-camera",
    },
    null,
    -1,
  ),
  ff = {
    class: "border-t border-theme pt-3 flex-1 flex flex-col",
  },
  mf = {
    class: "flex justify-between",
  },
  hf = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "Confirma\xe7\xe3o de Leitura",
    -1,
  ),
  bf = {
    class: "flex justify-between mt-3",
  },
  gf = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "Notifica\xe7\xf5es",
    -1,
  ),
  vf = {
    class: "flex justify-between mt-3",
  },
  xf = Pl(
    "label",
    {
      class: "text-3xl",
    },
    "Conte\xfado sens\xedvel",
    -1,
  ),
  yf = {
    class: "mt-auto",
  };
rf.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("app-loading"),
    e4 = dl("app-toggle");
  return e2.loading
    ? (wl(), _l("div", cf, [Pl(e6)]))
    : (wl(),
      _l("div", uf, [
        Zt(e$.$slots, "default"),
        Pl("div", df, [
          Pl(
            "img",
            {
              src: e2.avatarURL,
              class: "w-64 h-64 rounded-full mx-auto",
            },
            null,
            8,
            ["src"],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[1] ||
                (e0[1] = (...e$) => e2.changeAvatar && e2.changeAvatar(...e$)),
              class:
                "absolute bottom-0 right-40 px-4 py-2 rounded-full bg-gray-400 text-black",
            },
            [pf],
          ),
        ]),
        Pl("div", ff, [
          Pl("div", mf, [
            hf,
            Pl(
              e4,
              {
                modelValue: e2.read_receipts,
                "onUpdate:modelValue":
                  e0[2] || (e0[2] = (e$) => (e2.read_receipts = e$)),
              },
              null,
              8,
              ["modelValue"],
            ),
          ]),
          Pl("div", bf, [
            gf,
            Pl(
              e4,
              {
                modelValue: e2.notifications,
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.notifications = e$)),
              },
              null,
              8,
              ["modelValue"],
            ),
          ]),
          Pl("div", vf, [
            xf,
            Pl(
              e4,
              {
                modelValue: e2.sensitive,
                "onUpdate:modelValue":
                  e0[4] || (e0[4] = (e$) => (e2.sensitive = e$)),
              },
              null,
              8,
              ["modelValue"],
            ),
          ]),
          Pl("div", yf, [
            Pl(
              "button",
              {
                class: "text-red-500",
                onClick:
                  e0[5] ||
                  (e0[5] = (...e$) =>
                    e2.deleteMessages && e2.deleteMessages(...e$)),
              },
              "Apagar todas as mensagens",
            ),
          ]),
        ]),
      ]));
};
const kf = Ze([]),
  wf = Ze([]),
  Cf = Ze({}),
  _f = Ze({});

function Af(e$, e0 = null) {
  let e8 = kf.find((e0) => e0.id == e$);
  return (e8 && e0 && Object.assign(e8, e0), e8);
}

function Sf(e$) {
  let e0 = kf.findIndex((e0) => e0.id === e$);
  e0 >= 0 && kf.splice(e0, 1);
}

function Tf(e$, e0) {
  var e8;
  return (
    e0 ||
      ((e0 = e$.target), (e$ = null != (e8 = e$.sender) ? e8 : e$.initiator)),
    e$ == So.identity.phone ? e0 : e$
  );
}
(So.pusher.on("WHATSAPP_GROUP", (e$) => {
  ((e$.phone = "group" + e$.id), kf.push(e$));
}),
  So.pusher.on("WHATSAPP_GROUP_PHOTO", ({ id: e$, avatarURL: e0 }) => {
    Af(e$, {
      avatarURL: e0,
    });
  }),
  So.pusher.on("WHATSAPP_GROUP_NAME", ({ id: e$, name: e0 }) => {
    Af(e$, {
      name: e0,
    });
  }),
  So.pusher.on("WHATSAPP_LEAVE_GROUP", (e$) => Sf(e$)),
  So.pusher.on("WHATSAPP_UNGROUP", (e$) => Sf(e$)),
  So.pusher.on("WHATSAPP_GROUP_KICK", ({ id: e$ }) => Sf(e$)),
  So.pusher.on("WHATSAPP_GROUP_DESTROY", ({ id: e$ }) => Sf(e$)),
  So.pusher.on("WHATSAPP_READED", (e$) => delete Cf[e$]),
  So.pusher.on(
    "WHATSAPP_AVATAR",
    ({ phone: e$, avatarURL: e0 }) => (_f[e$] = e0),
  ),
  So.pusher.on("ADD_CONTACT", async ({ phone: e$ }) => {
    let e0 = await So.backend.wpp_getAvatar(e$);
    _f[e$] = e0;
  }),
  So.pusher.on("WHATSAPP_MESSAGE", (e$) => {
    if (e$.channel_id > 1e9)
      Af(e$.channel_id - 1e9, {
        message: e$,
      });
    else {
      e$.other = Tf(e$);
      let e0 = wf.findIndex((e0) => Tf(e0) == e$.other);
      (-1 != e0 ? wf.splice(e0, 1, e$) : wf.push(e$),
        e$.sender != So.identity.phone &&
          (Cf[e$.channel_id] = (Cf[e$.channel_id] || 0) + 1));
    }
  }),
  So.pusher.on("WHATSAPP_DELETE_MESSAGES", () => {
    $s(wf, (e$) => !e$.target.startsWith("group"));
  }));
var Ef = {
  loaded: !1,
  groups: kf,
  messages: wf,
  unread: Cf,
  avatars: _f,
  async ready() {
    ((this.loaded = !0), await So.backend.wpp_getProfile());
    let e$ = await So.backend.wpp_getResume();
    for (let [e0, e8] of (e$.groups.forEach(
      (e$) => (e$.phone = "group" + e$.id),
    ),
    e$.messages.forEach((e$) => (e$.other = Tf(e$))),
    Object.entries(e$)))
      Object.assign(this[e0], e8);
    (So.pusher.once("REFRESH", () => {
      for (let e$ of ((this.loaded = !1),
      [this.groups, this.messages, this.unread, this.avatars]))
        for (let e0 in e$) delete e$[e0];
    }),
      (this.loaded = !0));
  },
};
const Rf = {
    components: {
      Header: ef,
      Footer: lf,
      Settings: rf,
    },
    name: "WhatsApp",
    inject: ["setDark"],
    setup() {
      cc();
      let e$ = So.settings.isAndroid,
        e0 = da(() => So.identity.phone),
        e8 = rt("chats"),
        e2 = rt(""),
        e3 = rt(!1),
        e1 = rt(Zs("whatsapp")),
        e6 = rt([]),
        e4 = da(() => {
          let e$ = e2.value.toLowerCase();
          return e6.value.filter((e0) =>
            e$
              ? Bs(eU(e0)).toLowerCase().includes(e$) || eU(e0).includes(e$)
              : 1,
          );
        }),
        { groups: e7, messages: e5, unread: eV, avatars: eN } = Ef;
      So.localhost &&
        (e4.value = [
          {
            initiator: "000-001",
            target: "000-002",
            status: "ok",
            callback: !0,
            duration: 30,
            created_at: Date.now() / 1e3,
          },
          {
            initiator: "000-001",
            target: "000-003",
            callback: !0,
            duration: 30,
            created_at: Date.now() / 1e3,
          },
          {
            initiator: "000-001",
            target: "000-004",
            callback: !0,
            duration: 30,
            created_at: Date.now() / 1e3,
          },
        ]);
      let e9 = 0;
      Tn(e8, (e$) => {
        "calls" === e$ &&
          e9 < Date.now() &&
          (So.backend.getPhoneCalls().then((e$) => {
            e6.value = e$.map(
              (e$) => (
                (e$.callback = e$.initiator == e0.value || !e$.anonymous),
                e$
              ),
            );
          }),
          (e9 = Date.now() + 5e3));
      });
      let eU = (e$, e0) => {
        var e8, e2;
        return (
          e0 ||
            ((e0 = null != (e8 = e$.target) ? e8 : e$.target),
            (e$ = null != (e2 = e$.sender) ? e2 : e$.initiator)),
          e$ == So.identity.phone ? e0 : e$
        );
      };

      function ej(e$) {
        let e0 = e5.find((e0) => e0.other === e$);
        return {
          id: e$,
          phone: e$,
          name: Bs(e$),
          avatarURL: eN[e$] || So.asset("/stock/user.svg"),
          message: e0,
          unread: eV[null == e0 ? void 0 : e0.channel_id] || 0,
        };
      }
      let eD = da(() => {
        let e$ = e2.value.trim().toLowerCase(),
          e0 = [];
        return (
          "chats" === e8.value
            ? (e0.push(
                ...e5
                  .filter((e0) =>
                    e$
                      ? Bs(e0.other).toLowerCase().includes(e$) ||
                        e0.other.includes(e$)
                      : 1,
                  )
                  .map((e$) => ej(e$.other)),
              ),
              e$
                ? (e0.push(
                    ...e7.filter((e0) => e0.name.toLowerCase().includes(e$)),
                  ),
                  So.contacts.value.forEach((e8) => {
                    e0.some((e$) => e$.phone == e8.phone) ||
                      ((e8.phone.includes(e$) ||
                        e8.name.toLowerCase().includes(e$)) &&
                        e0.push(ej(e8.phone)));
                  }))
                : e0.push(...e7))
            : "contacts" === e8.value &&
              So.contacts.value.forEach((e8) => {
                (e8.phone.includes(e$) || e8.name.toLowerCase().includes(e$)) &&
                  e0.push(ej(e8.phone));
              }),
          e0.sort((e$, e0) => {
            var e8, e2;
            return (
              (null == (e8 = e0.message) ? void 0 : e8.created_at) -
              (null == (e2 = e$.message) ? void 0 : e2.created_at)
            );
          })
        );
      });
      return (
        Ef.loaded || Ef.ready(),
        {
          android: e$,
          tab: e8,
          appName: e1,
          query: e2,
          searching: e3,
          conversations: eD,
          calls: e4,
          myPhone: e0,
          contentDefaults: {
            image: "📷 Foto",
            location: "\uD83C\uDF0E Localiza\xe7\xe3o",
            audio: "\uD83D\uDD0A \xc1udio",
          },
          onContext: async function (e$) {
            let e0 = await go().request(
              [
                ["Excluir conversa", "text-red-500 self-center"],
                "g" != e$.phone[0] && [
                  "Efetuar liga\xe7\xe3o",
                  "text-blue-500 self-center",
                ],
              ].filter((e$) => e$),
              20,
            );
            0 === e0
              ? So.backend.wpp_deleteMessages(e$.phone).then(() => {
                  $s(e5, (e0) => e0.other == e$.phone);
                })
              : 1 === e0 && So.pusher.emit("CALL_TO", e$.phone);
          },
          other: eU,
          createCall: function (e$) {
            So.pusher.emit("CALL_TO", eU(e$), e$.video);
          },
          getAvatar: function (e$) {
            var e0;
            return null != (e0 = eN[e$]) ? e0 : So.asset("/stock/user.svg");
          },
        }
      );
    },
    activated() {
      this.setDark(!!So.settings.isAndroid || void 0);
    },
  },
  Pf = sn("data-v-1e353ded");
ln("data-v-1e353ded");
const Lf = {
    class: "font-bold ml-6",
  },
  If = {
    key: 0,
    class: "far fa-search-minus text-3xl",
  },
  Of = {
    key: 1,
    class: "far fa-search text-3xl",
  },
  Mf = Pl(
    "i",
    {
      class: "fas fa-users",
    },
    null,
    -1,
  ),
  Vf = Pl(
    "i",
    {
      class: "fas fa-cog",
    },
    null,
    -1,
  ),
  Df = {
    class:
      "mt-4 h-16 bg-whatsapp text-white border-b border-theme grid grid-cols-3",
  },
  Nf = {
    key: 1,
    class: "p-3 pb-0",
  },
  Uf = {
    key: 2,
    class: "flex-1 overflow-y-auto hide-scroll p-5",
  },
  $f = {
    key: 0,
    class: "mt-24",
  },
  jf = {
    class: "text-5xl font-bold",
  },
  Ff = {
    class: "relative text-placeholder",
  },
  zf = Pl(
    "i",
    {
      class: "fas fa-search absolute left-2 top-3.5 text-xl",
    },
    null,
    -1,
  ),
  Bf = {
    class:
      "flex-1 flex flex-col justify-around text-xl ml-3 border-1 border-b border-theme pb-2",
  },
  Hf = {
    class: "flex items-center justify-between",
  },
  qf = {
    class: "text-3xl text-theme",
  },
  Gf = {
    key: 0,
    class: "text-gray-400",
  },
  Wf = {
    class: "flex justify-between",
  },
  Kf = {
    key: 0,
    class: "text-xl text-gray-400",
  },
  Jf = {
    key: 1,
    class: "text-xl text-gray-500 italic",
  },
  Xf = {
    key: 2,
    class: "text-xl text-gray-500 italic",
  },
  Yf = {
    key: 3,
    class:
      "bg-blue-500 text-white px-3 py-1 text-base rounded-full flex flex-center",
  },
  Zf = {
    key: 0,
    class: "mt-24 mb-16",
  },
  Qf = Pl(
    "h1",
    {
      class: "text-5xl font-bold",
    },
    "Configura\xe7\xf5es",
    -1,
  ),
  em = {
    key: 4,
    class: "flex-1 overflow-y-auto hide-scroll p-5",
  },
  tm = {
    key: 0,
    class: "mt-24",
  },
  nm = Pl(
    "h1",
    {
      class: "text-5xl font-bold",
    },
    "Chamadas",
    -1,
  ),
  lm = {
    class: "text-theme",
  },
  am = {
    class: "flex flex-col ml-5 text-3xl",
  },
  sm = {
    class: "font-semibold",
  },
  om = {
    class: "text-gray-400 text-xl pt-2",
  },
  rm = {
    key: 0,
    class: "fas fa-video",
  },
  im = {
    key: 1,
    class: "fas fa-phone transform rotate-90",
  };
an();
const cm = Pf((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header"),
    e4 = dl("app-input"),
    e7 = dl("Settings"),
    e5 = dl("Footer");
  return (
    wl(),
    _l(
      "div",
      {
        class: [
          "flex flex-col h-full",
          [e2.android ? "bg-whatsapp-container" : "bg-theme text-theme"],
        ],
      },
      [
        e2.android
          ? (wl(),
            _l(
              e6,
              {
                key: 0,
              },
              {
                default: Pf(() => [
                  Pl("h1", Lf, g(e2.appName), 1),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[1] ||
                        (e0[1] = (e$) => (e2.searching = !e2.searching)),
                      class: "absolute top-16 right-32",
                    },
                    [e2.searching ? (wl(), _l("i", If)) : (wl(), _l("i", Of))],
                  ),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[2] ||
                        (e0[2] = (e0) => e$.$router.push("/whatsapp/create")),
                      class: "absolute top-16 right-16",
                    },
                    [Mf],
                  ),
                  Pl(
                    "button",
                    {
                      onClick: e0[3] || (e0[3] = (e$) => (e2.tab = "settings")),
                      class: "absolute top-16 right-4",
                    },
                    [Vf],
                  ),
                  Pl("div", Df, [
                    (wl(),
                    _l(
                      bl,
                      null,
                      fa(
                        {
                          chats: "CHATS",
                          contacts: "CONTATOS",
                          calls: "LIGA\xc7\xd5ES",
                        },
                        (e$, e0) =>
                          Pl(
                            "button",
                            {
                              key: e0,
                              tab: "",
                              class: [
                                "font-bold text-xl",
                                {
                                  active: e2.tab === e0,
                                },
                              ],
                              onClick: (e$) => (e2.tab = e0),
                            },
                            g(e$),
                            11,
                            ["onClick"],
                          ),
                      ),
                      64,
                    )),
                  ]),
                ]),
                _: 1,
              },
            ))
          : Ml("", !0),
        e2.searching && ("chats" == e2.tab || "contacts" == e2.tab)
          ? (wl(),
            _l("div", Nf, [
              Pl(
                e4,
                {
                  modelValue: e2.query,
                  "onUpdate:modelValue":
                    e0[4] || (e0[4] = (e$) => (e2.query = e$)),
                  spellcheck: "false",
                  placeholder: "Nome do contato",
                  class: "bg-transparent border text-theme text-xl",
                },
                null,
                8,
                ["modelValue"],
              ),
            ]))
          : Ml("", !0),
        "chats" == e2.tab || "contacts" == e2.tab
          ? (wl(),
            _l("div", Uf, [
              e2.android
                ? Ml("", !0)
                : (wl(),
                  _l("div", $f, [
                    Pl(
                      "h1",
                      jf,
                      g("chats" == e2.tab ? "Conversas" : "Contatos"),
                      1,
                    ),
                    Pl("div", Ff, [
                      Zn(
                        Pl(
                          "input",
                          {
                            "onUpdate:modelValue":
                              e0[5] || (e0[5] = (e$) => (e2.query = e$)),
                            class:
                              "bg-theme-accent w-full text-lg p-2.5 pl-8 rounded-lg",
                            spellcheck: "false",
                            placeholder: "Pesquisar",
                          },
                          null,
                          512,
                        ),
                        [[ns, e2.query]],
                      ),
                      zf,
                    ]),
                    "chats" == e2.tab
                      ? (wl(),
                        _l(
                          "h1",
                          {
                            key: 0,
                            class:
                              "text-right text-lightBlue-500 underline text-2xl mt-4",
                            onClick:
                              e0[6] ||
                              (e0[6] = (e0) =>
                                e$.$router.push("/whatsapp/create")),
                          },
                          " Novo grupo ",
                        ))
                      : Ml("", !0),
                  ])),
              Pl("ul", null, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(e2.conversations, (e0) => {
                    var e8, e3;
                    return (
                      wl(),
                      _l(
                        "li",
                        {
                          onContextmenu: is(
                            (e$) => e2.onContext(e0),
                            ["prevent", "stop"],
                          ),
                          key: e0.id,
                          onClick: (e8) =>
                            e$.$router.push("/whatsapp/" + e0.phone),
                          class: "flex mt-3",
                        },
                        [
                          Pl(
                            "img",
                            {
                              class: "border rounded-full w-24 h-24",
                              src: e0.avatarURL,
                              alt: "",
                            },
                            null,
                            8,
                            ["src"],
                          ),
                          Pl("div", Bf, [
                            Pl("div", Hf, [
                              Pl("h2", qf, g(e0.name), 1),
                              e0.message
                                ? (wl(),
                                  _l(
                                    "span",
                                    Gf,
                                    g(
                                      e$.$filters.unixToHHMM(
                                        e0.message.created_at,
                                      ),
                                    ),
                                    1,
                                  ))
                                : Ml("", !0),
                            ]),
                            Pl("div", Wf, [
                              e0.message
                                ? (wl(),
                                  _l("span", Kf, [
                                    e0.message.sender == e2.myPhone
                                      ? (wl(),
                                        _l(
                                          "i",
                                          {
                                            key: 0,
                                            class: [
                                              "fal fa-check-double",
                                              {
                                                "text-blue-400":
                                                  !!e0.message.saw_at,
                                              },
                                            ],
                                          },
                                          null,
                                          2,
                                        ))
                                      : Ml("", !0),
                                    Il(
                                      " " +
                                        g(
                                          (
                                            null == (e8 = e0.message.content)
                                              ? void 0
                                              : e8.match(
                                                  /(http)?s?:?(\/\/[^"']*\.(?:webm))/,
                                                )
                                          )
                                            ? e2.contentDefaults.audio
                                            : (null == (e3 = e0.message.content)
                                                ? void 0
                                                : e3.substr(0, 40)) ||
                                                e2.contentDefaults[
                                                  e0.message.image
                                                    ? "image"
                                                    : "location"
                                                ],
                                        ),
                                      1,
                                    ),
                                  ]))
                                : e0.phone != e0.id
                                  ? (wl(),
                                    _l("span", Jf, " Nenhuma mensagem... "))
                                  : (wl(),
                                    _l(
                                      "span",
                                      Xf,
                                      " Clique para iniciar uma conversa ",
                                    )),
                              e0.unread
                                ? (wl(), _l("span", Yf, g(e0.unread), 1))
                                : Ml("", !0),
                            ]),
                          ]),
                        ],
                        40,
                        ["onContextmenu", "onClick"],
                      )
                    );
                  }),
                  128,
                )),
              ]),
            ]))
          : "settings" == e2.tab
            ? (wl(),
              _l(
                e7,
                {
                  key: 3,
                },
                {
                  default: Pf(() => [
                    e2.android ? Ml("", !0) : (wl(), _l("div", Zf, [Qf])),
                  ]),
                  _: 1,
                },
              ))
            : (wl(),
              _l("div", em, [
                e2.android ? Ml("", !0) : (wl(), _l("div", tm, [nm])),
                Pl("ul", lm, [
                  (wl(!0),
                  _l(
                    bl,
                    null,
                    fa(
                      e2.calls,
                      (e0) => (
                        wl(),
                        _l(
                          "li",
                          {
                            key: e0.id,
                            class:
                              "border-b border-theme p-5 flex items-center",
                          },
                          [
                            Pl(
                              "img",
                              {
                                class: "w-20 h-20 rounded-full",
                                src: e2.getAvatar(e0.callback && e2.other(e0)),
                              },
                              null,
                              8,
                              ["src"],
                            ),
                            Pl("div", am, [
                              Pl(
                                "h1",
                                sm,
                                g(
                                  e0.callback
                                    ? e$.$filters.getNameByPhone(e2.other(e0))
                                    : "(An\xf4nimo)",
                                ),
                                1,
                              ),
                              Pl("span", om, [
                                Pl(
                                  "i",
                                  {
                                    class: [
                                      "fal fa-long-arrow-left",
                                      {
                                        "text-red-500": "ok" != e0.status,
                                        "text-green-500": "ok" == e0.status,
                                        "transform -rotate-45":
                                          e0.target == e2.myPhone,
                                        "rotate-135": e0.target != e2.myPhone,
                                      },
                                    ],
                                  },
                                  null,
                                  2,
                                ),
                                Il(
                                  " " +
                                    g(
                                      e$.$filters.unixToDayOfMonth(
                                        e0.created_at,
                                      ),
                                    ),
                                  1,
                                ),
                              ]),
                            ]),
                            e0.callback
                              ? (wl(),
                                _l(
                                  "button",
                                  {
                                    key: 0,
                                    class: [
                                      "ml-auto text-3xl",
                                      [
                                        e2.android
                                          ? "text-whatsapp"
                                          : "text-blue-ios",
                                      ],
                                    ],
                                    onClick: (e$) =>
                                      e0.callback && e2.createCall(e0),
                                  },
                                  [
                                    e0.video
                                      ? (wl(), _l("i", rm))
                                      : (wl(), _l("i", im)),
                                  ],
                                  10,
                                  ["onClick"],
                                ))
                              : Ml("", !0),
                          ],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ])),
        e2.android
          ? Ml("", !0)
          : (wl(),
            _l(
              e5,
              {
                key: 5,
                tab: e2.tab,
                onChange: (e$) => (e2.tab = e$),
              },
              null,
              8,
              ["tab", "onChange"],
            )),
      ],
      2,
    )
  );
});
((Rf.render = cm), (Rf.__scopeId = "data-v-1e353ded"));
const um = {
    props: ["src"],
    setup(e$) {
      let e0 = Ze({
          playing: !1,
          duration: 0,
          offset: 0,
        }),
        e8 = new Audio();
      ((e8.oncanplay = () => (e0.offset = 0)),
        fetch(e$.src)
          .then((e$) => e$.blob())
          .then((e$) => {
            e8.src = URL.createObjectURL(e$);
          }),
        (e8.ontimeupdate = () => {
          e0.offset = e8.currentTime;
        }),
        (e8.ondurationchange = (e$) => {
          e$.target.duration != 1 / 0 && (e0.duration = e$.target.duration);
        }),
        e8.addEventListener("ended", () => {
          e0.playing = !1;
        }));
      let e2 = da(() => (e0.duration ? (e0.offset / e0.duration) * 95 : 0));
      return {
        state: e0,
        resume() {
          (e8.play(),
            (e0.playing = !0),
            e0.offset >= e0.duration && (e8.currentTime = 0));
        },
        pause() {
          (e8.pause(), (e0.playing = !1));
        },
        percent: e2,
      };
    },
  },
  dm = {
    class: "relative flex items-center h-20 px-6 rounded-lg w-full",
  },
  pm = Pl(
    "i",
    {
      class: "fas fa-play text-gray-400",
    },
    null,
    -1,
  ),
  fm = Pl(
    "i",
    {
      class: "fas fa-pause text-gray-400",
    },
    null,
    -1,
  ),
  mm = {
    class: "ml-4 flex-1 h-1 bg-gray-200",
  },
  hm = {
    class: "absolute bottom-0 right-4 text-theme text-lg",
  };
um.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", dm, [
      e2.state.playing
        ? (wl(),
          _l(
            "button",
            {
              key: 1,
              onClick: e0[2] || (e0[2] = (e$) => e2.pause()),
            },
            [fm],
          ))
        : (wl(),
          _l(
            "button",
            {
              key: 0,
              onClick: e0[1] || (e0[1] = (e$) => e2.resume()),
            },
            [pm],
          )),
      Pl("div", mm, [
        Pl(
          "div",
          {
            style: {
              width: e2.percent + "%",
              backgroundColor: e2.state.playing ? "#4ade80" : "#60a5fa",
              height: "0.25rem",
            },
          },
          null,
          4,
        ),
        Pl(
          "div",
          {
            style: {
              left: e2.percent + "%",
              backgroundColor: e2.state.playing ? "#4ade80" : "#60a5fa",
            },
            class: "relative bottom-3 rounded-full w-5 h-5 bg-blue-400",
          },
          null,
          4,
        ),
      ]),
      Pl("span", hm, g(e$.$filters.duration(e2.state.duration)), 1),
    ])
  );
};
const bm = {
    components: {
      AudioPlayer: um,
      Header: ef,
    },
    setup() {
      jl("setDark")(!!So.settings.isAndroid || null);
      let e$ = uc(),
        e0 = So.identity.phone,
        e8 = jl("alert"),
        e2 = jl("prompt"),
        e3 = jl("useImageFocus"),
        e1 = rt(""),
        e6 = rt([]),
        e4 = rt([0, 0, 0]),
        e7 = Ze({}),
        e5 = rt(null),
        eV = rt(!!So.settings.videoServer),
        eN = e$.params.contact,
        e9 = rt(So.contacts.value.find((e$) => e$.phone === eN));

      function eU(e$) {
        return (e$.location && (e$.location = JSON.parse(e$.location)), e$);
      }
      (e9.value ||
        (eN.startsWith("group")
          ? (e9.value = {
              id: eN,
              isGroup: !0,
            })
          : (e9.value = {
              name: eN,
              unknown: !0,
              avatarURL: So.asset("/stock/user.svg"),
            })),
        So.getPlayerCoords().then((e$) => (e4.value = e$)),
        So.backend.wpp_getChat(eN).then((e$) => {
          ((e9.value.id = e$.id),
            e$.name && (e9.value.name = e$.name),
            (e9.value.avatarURL = e$.avatarURL || So.asset("/stock/user.svg")),
            (e6.value = e$.messages.map(eU)),
            Lt(() => eD(!0)));
        }));
      let ej = 0;

      function eD(e$, e0) {
        var e8;
        (!0 !== e$ && e1.value) ||
          (null == (e8 = document.querySelector(".overflow-y-auto")) ||
            e8.scrollTo(0, 9e6),
          e9.value.id < 1e9 &&
            !e0 &&
            ej < Date.now() &&
            ((ej = Date.now() + 1e3),
            So.backend.wpp_markAsRead(eN),
            So.pusher.emit("WHATSAPP_READED", e9.value.id)));
      }
      async function ez(e$ = "text", e0) {
        let e3 = [eN, (e0 || e1.value).trim(), e$];
        if ("location" === e$) e3.push(await So.getPlayerCoords());
        else if ("camera" === e$)
          try {
            ((e3[2] = "image"), e3.push(await co().request(!1, "/whatsapp")));
          } catch (e6) {
            return;
          }
        else if ("gallery" === e$)
          try {
            ((e3[2] = "image"), e3.push(await fo()));
          } catch (e4) {
            return;
          }
        else if ("image" === e$) {
          let e5 = await e2("Insira o link da imagem");
          if (!e5) return;
          if (
            !e5.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)
          )
            return e8("Link inv\xe1lido");
          e3.push(e5);
        } else if (!e3[1]) return;
        (So.backend.wpp_sendMessage(...e3).then((e$) => {
          e$.error && e8(e$.error);
        }),
          (e1.value = ""),
          delete e7.attachments);
      }

      function eF(e$) {
        e$.channel_id == e9.value.id &&
          (e6.value.push(eU(e$)), Lt(() => eD(!1, e$.sender == e0)));
      }
      (So.onceRoute("WHATSAPP_MESSAGE", eF),
        So.onceRoute("WHATSAPP_READ", (e$) => {
          e$ === eN &&
            e6.value.forEach((e$) => {
              e$.sender == e0 && (e$.saw_at = Math.floor(Date.now() / 1e3));
            });
        }));
      let eB = [
        "#ef5350",
        "#EC407A",
        "#AB47BC",
        "#7E57C2",
        "#5C6BC0",
        "#42A5F5",
        "#26C6DA",
        "#26A69A",
        "#66BB6A",
        "#9CCC65",
        "#FF7043",
      ];
      return {
        prompt: e2,
        chat: e9,
        myPhone: e0,
        messages: e6,
        addMessage: ez,
        handleMessage: eF,
        ajustSize: eD,
        updateGPS: function (e$) {
          So.pusher.emit("GPS", {
            location: e$,
          });
        },
        location: e4,
        text: e1,
        recording: e5,
        startRecording: function () {
          if (!So.microphone.value)
            return (
              So.captureMicrophone(),
              e8("A autoriza\xe7\xe3o do microfone n\xe3o foi concedida.")
            );
          let e$ = new MediaRecorder(So.microphone.value, {
              audioBitsPerSecond: 16e3,
            }),
            e0 = setInterval(() => {
              if (!e5.value) return clearInterval(e0);
              e5.value.duration += 1;
            }, 1e3);
          (e$.start(),
            (e5.value = {
              duration: 0,
              recorder: e$,
              stop(e0 = !1) {
                ((e5.value = null),
                  e0 &&
                    (e$.ondataavailable = (e$) =>
                      to.upload(e$.data, "webm").then(
                        (e$) => {
                          ez("audio", e$);
                        },
                        () => e8("Falha ao salvar \xe1udio"),
                      )),
                  e$.stop());
              },
            }));
        },
        getColorForPhone: function (e$) {
          return eB[parseInt(e$.replace(/-/g, "")) % eB.length];
        },
        saveContact: async function () {
          var e$;
          let e0 =
            null == (e$ = await e2("Nome do contato")) ? void 0 : e$.trim();
          if (e0)
            return e0.length > 128
              ? e8("Nome inv\xe1lido")
              : void So.backend.addContact(eN, e0).then((e$) => {
                  e$ instanceof Object &&
                    ((e9.value.name = e0),
                    delete e9.value.unknown,
                    So.contacts.value.push(e$),
                    So.pusher.emit("ADD_CONTACT", e$));
                });
        },
        misc: e7,
        isExternalLink: function (e$) {
          if ("true" != So.storage.get("whatsapp-sensitive")) return !1;
          let e0 = So.settings.uploadServer;
          return !e$.startsWith(e0.substring(0, e0.indexOf("/", 10)));
        },
        addAttachment: function () {
          let e$ = ["camera", "gallery", "location"];
          (So.settings.allowUnsafeURL && e$.splice(2, 0, "image"),
            go()
              .request(
                [
                  ["C\xe2mera", "text-blue-500 self-center"],
                  ["Galeria", "text-blue-500 self-center"],
                  So.settings.allowUnsafeURL && [
                    "Imagem",
                    "text-blue-500 self-center",
                  ],
                  ["Localiza\xe7\xe3o", "text-blue-500 self-center"],
                ],
                30,
              )
              .then((e0) => e$[e0] && ez(e$[e0])));
        },
        onContextImage: async function (e$) {
          let e0 = await go().request(
            [
              ["Ver imagem", "text-blue-500 self-center"],
              ["Salvar imagem", "text-blue-500 self-center"],
            ],
            20,
          );
          if (0 === e0) e3(e$);
          else if (1 === e0) {
            if (So.gallery.some((e0) => e0.url == e$))
              return e8("Esta imagem j\xe1 est\xe1 salva");
            So.backend.gallery_save("/downloads", e$).then((e$) => {
              (So.gallery.push(e$), So.gallery.sort((e$, e0) => e0.id - e$.id));
            });
          }
        },
        createCall: function (e$ = !1) {
          So.pusher.emit("CALL_TO", eN, e$);
        },
        hasVideoCall: eV,
        android: So.settings.isAndroid,
      };
    },
    unmounted() {
      var e$;
      null == (e$ = this.recording) || e$.stop();
    },
  },
  gm = sn("data-v-21268b06");
ln("data-v-21268b06");
const vm = {
    class: "flex flex-col h-full text-theme",
    container: "",
  },
  xm = {
    class: "h-16",
  },
  ym = Pl(
    "i",
    {
      class: "far fa-arrow-left text-3xl",
    },
    null,
    -1,
  ),
  km = Pl(
    "i",
    {
      class: "fas fa-user-plus pl-3 text-2xl",
    },
    null,
    -1,
  ),
  wm = {
    key: 0,
    class: "absolute top-16 right-0",
  },
  Cm = Pl(
    "i",
    {
      class: "fas fa-video text-2xl",
    },
    null,
    -1,
  ),
  _m = Pl(
    "i",
    {
      class: "fas fa-phone transform rotate-90 text-2xl",
    },
    null,
    -1,
  ),
  Am = {
    key: 1,
    class:
      "h-36 bg-theme-accent flex items-center pt-20 pb-2 px-5 border-b border-theme",
  },
  Sm = Pl(
    "i",
    {
      class: "cupertino-icons text-blue-ios",
    },
    "chevron_back",
    -1,
  ),
  Tm = Pl(
    "i",
    {
      class: "fas fa-user-plus pl-3 text-2xl text-blue-ios",
    },
    null,
    -1,
  ),
  Em = {
    key: 0,
    class: "ml-auto mr-4",
  },
  Rm = Pl(
    "i",
    {
      class: "fal fa-video text-blue-ios text-4xl",
    },
    null,
    -1,
  ),
  Pm = Pl(
    "i",
    {
      class: "cupertino-icons text-4xl text-blue-ios",
    },
    "phone",
    -1,
  ),
  Lm = {
    class: "flex-1 overflow-y-auto hide-scroll p-5 relative",
  },
  Im = {
    key: 1,
  },
  Om = {
    class: "text-xl w-full flex justify-between ",
  },
  Mm = Pl("b", null, "Clique para atualizar seu GPS", -1),
  Vm = {
    class: "break-words",
  },
  Dm = {
    class:
      "flex-shrink-0 absolute right-3 bottom-1 flex items-center text-base text-gray-400",
  },
  Nm = {
    key: 2,
    class:
      "absolute right-8 bottom-28 bg-theme text-theme w-40 py-2 px-4 rounded-full flex justify-between",
  },
  Um = {
    class: "blink",
  },
  $m = Pl(
    "i",
    {
      class: "far fa-trash-alt text-red-500",
    },
    null,
    -1,
  ),
  jm = {
    key: 3,
    class: "h-24 flex items-center justify-around px-4",
  },
  Fm = Pl(
    "i",
    {
      class: "far fa-paperclip text-3xl",
    },
    null,
    -1,
  ),
  zm = {
    key: 0,
    xmlns: "http://www.w3.org/2000/svg",
    "enable-background": "new 0 0 24 24",
    height: "2.4rem",
    viewBox: "0 0 24 24",
    width: "2.4rem",
    fill: "#fff",
  },
  Bm = Pl(
    "g",
    null,
    [
      Pl("rect", {
        fill: "none",
        height: "24",
        width: "24",
      }),
      Pl("rect", {
        fill: "none",
        height: "24",
        width: "24",
      }),
      Pl("rect", {
        fill: "none",
        height: "24",
        width: "24",
      }),
    ],
    -1,
  ),
  Hm = Pl(
    "g",
    null,
    [
      Pl("g"),
      Pl("g", null, [
        Pl("path", {
          d: "M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z",
        }),
        Pl("path", {
          d: "M17,11c0,2.76-2.24,5-5,5s-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92H17z",
        }),
      ]),
    ],
    -1,
  ),
  qm = {
    key: 1,
    class: "fa fa-square text-3xl",
  },
  Gm = {
    key: 4,
    class: "h-20 flex items-center px-10 bg-theme-accent",
  },
  Wm = Pl(
    "i",
    {
      class: "fal fa-plus text-4xl text-blue-ios",
    },
    null,
    -1,
  ),
  Km = {
    key: 0,
    class: "fa fa-square text-red-500 text-3xl",
  },
  Jm = {
    key: 1,
    class: "fal fa-microphone text-blue-ios",
  };
an();
const Xm = gm((e$, e0, e8, e2, e3, e1) => {
  var e6, e4, e7;
  let e5 = dl("Header"),
    eV = dl("AudioPlayer");
  return (
    wl(),
    _l("div", vm, [
      e2.android
        ? (wl(),
          _l(
            e5,
            {
              key: 0,
            },
            {
              default: gm(() => {
                var e8, e3;
                return [
                  Pl("div", xm, [
                    Pl(
                      "button",
                      {
                        onClick:
                          e0[1] ||
                          (e0[1] = (...e0) =>
                            e$.$router.back && e$.$router.back(...e0)),
                        class: "absolute top-16 left-4",
                      },
                      [ym],
                    ),
                    Pl(
                      "img",
                      {
                        onClick:
                          e0[2] ||
                          (e0[2] = (e0) =>
                            e2.chat.isGroup &&
                            e$.$router.push("/whatsapp/edit/" + e2.chat.id)),
                        class: "absolute top-16 left-14 w-12 h-12 rounded-full",
                        src:
                          null != (e8 = e2.chat.avatarURL)
                            ? e8
                            : e$.$asset("/stock/user.svg"),
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl(
                      "h1",
                      {
                        class: "ml-28 font-bold",
                        onClick:
                          e0[4] ||
                          (e0[4] = (e0) =>
                            e2.chat.isGroup &&
                            e$.$router.push("/whatsapp/edit/" + e2.chat.id)),
                      },
                      [
                        Il(
                          g(
                            null == (e3 = e2.chat.name)
                              ? void 0
                              : e3.slice(0, 20),
                          ) + " ",
                          1,
                        ),
                        e2.chat.unknown
                          ? (wl(),
                            _l(
                              "button",
                              {
                                key: 0,
                                onClick:
                                  e0[3] ||
                                  (e0[3] = (...e$) =>
                                    e2.saveContact && e2.saveContact(...e$)),
                              },
                              [km],
                            ))
                          : Ml("", !0),
                      ],
                    ),
                    e2.chat.isGroup
                      ? Ml("", !0)
                      : (wl(),
                        _l("div", wm, [
                          e2.hasVideoCall
                            ? (wl(),
                              _l(
                                "button",
                                {
                                  key: 0,
                                  onClick:
                                    e0[5] ||
                                    (e0[5] = (e$) => e2.createCall(!0)),
                                  class: "mr-8",
                                },
                                [Cm],
                              ))
                            : Ml("", !0),
                          Pl(
                            "button",
                            {
                              onClick:
                                e0[6] || (e0[6] = (e$) => e2.createCall()),
                              class: "mr-8",
                            },
                            [_m],
                          ),
                        ])),
                  ]),
                ];
              }),
              _: 1,
            },
          ))
        : (wl(),
          _l("div", Am, [
            Pl(
              "button",
              {
                onClick:
                  e0[7] ||
                  (e0[7] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [Sm],
            ),
            Pl(
              "img",
              {
                class: "ml-14 w-12 h-12 rounded-full",
                src:
                  null != (e6 = e2.chat.avatarURL)
                    ? e6
                    : e$.$asset("/stock/user.svg"),
              },
              null,
              8,
              ["src"],
            ),
            Pl(
              "h1",
              {
                class: "ml-4 font-bold text-3xl text-theme",
                onClick:
                  e0[9] ||
                  (e0[9] = (e0) =>
                    e2.chat.isGroup &&
                    e$.$router.push("/whatsapp/edit/" + e2.chat.id)),
              },
              [
                Il(
                  g(
                    null ==
                      (e7 = null == (e4 = e2.chat.name) ? void 0 : e4.slice)
                      ? void 0
                      : e7.call(e4, 0, 20),
                  ) + " ",
                  1,
                ),
                e2.chat.unknown
                  ? (wl(),
                    _l(
                      "button",
                      {
                        key: 0,
                        onClick:
                          e0[8] ||
                          (e0[8] = (...e$) =>
                            e2.saveContact && e2.saveContact(...e$)),
                      },
                      [Tm],
                    ))
                  : Ml("", !0),
              ],
            ),
            e2.chat.isGroup
              ? Ml("", !0)
              : (wl(),
                _l("div", Em, [
                  e2.hasVideoCall
                    ? (wl(),
                      _l(
                        "button",
                        {
                          key: 0,
                          onClick:
                            e0[10] || (e0[10] = (e$) => e2.createCall(!0)),
                          class: "mr-10",
                        },
                        [Rm],
                      ))
                    : Ml("", !0),
                  Pl(
                    "button",
                    {
                      onClick: e0[11] || (e0[11] = (e$) => e2.createCall()),
                    },
                    [Pm],
                  ),
                ])),
          ])),
      Pl("div", Lm, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.messages,
            (e8) => (
              wl(),
              _l(
                "div",
                {
                  class: "flex",
                  key: e8.id,
                },
                [
                  Pl(
                    "div",
                    {
                      class: [
                        "max-w-10/12 mt-2 p-4 pb-8 rounded-xl relative",
                        {
                          "w-10/12": e$.$filters.isAudio(e8.content),
                          "bg-sender ml-auto": e8.sender == e2.myPhone,
                          "bg-target mr-auto": e8.sender != e2.myPhone,
                        },
                      ],
                    },
                    [
                      e8.channel_id > 1e9 && e8.sender != e2.myPhone
                        ? (wl(),
                          _l(
                            "h1",
                            {
                              key: 0,
                              class: "mb-1 text-xl",
                              style: {
                                color: e2.getColorForPhone(e8.sender),
                              },
                            },
                            g(e$.$filters.getNameByPhone(e8.sender)),
                            5,
                          ))
                        : Ml("", !0),
                      e8.image
                        ? (wl(),
                          _l("div", Im, [
                            Pl(
                              "img",
                              {
                                onContextmenu: is(
                                  (e$) => e2.onContextImage(e8.image),
                                  ["prevent", "stop"],
                                ),
                                class: [
                                  "w-full rounded-lg",
                                  {
                                    censored: e2.isExternalLink(e8.image),
                                  },
                                ],
                                onLoad:
                                  e0[12] ||
                                  (e0[12] = (...e$) =>
                                    e2.ajustSize && e2.ajustSize(...e$)),
                                src: e8.image,
                                tabindex: "0",
                              },
                              null,
                              42,
                              ["onContextmenu", "src"],
                            ),
                          ]))
                        : e8.location
                          ? (wl(),
                            _l(
                              "div",
                              {
                                key: 2,
                                class: "flex flex-col items-center",
                                onClick: (e$) => e2.updateGPS(e8.location),
                              },
                              [
                                Pl(
                                  "img",
                                  {
                                    class: "border rounded-lg",
                                    onLoad:
                                      e0[13] ||
                                      (e0[13] = (...e$) =>
                                        e2.ajustSize && e2.ajustSize(...e$)),
                                    src: "/stock/maps.jpg",
                                    alt: "",
                                  },
                                  null,
                                  32,
                                ),
                                Pl("div", Om, [
                                  Mm,
                                  Pl(
                                    "span",
                                    null,
                                    g(
                                      e$.$filters.vdist2(
                                        e2.location,
                                        e8.location,
                                      ),
                                    ),
                                    1,
                                  ),
                                ]),
                              ],
                              8,
                              ["onClick"],
                            ))
                          : Ml("", !0),
                      e$.$filters.isAudio(e8.content)
                        ? (wl(),
                          _l(
                            eV,
                            {
                              key: 3,
                              src: e8.content,
                            },
                            null,
                            8,
                            ["src"],
                          ))
                        : Ml("", !0),
                      Pl("div", null, [
                        Pl(
                          "span",
                          Vm,
                          g(e$.$filters.isAudio(e8.content) ? "" : e8.content),
                          1,
                        ),
                        Pl("span", Dm, [
                          Il(g(e$.$filters.unixToHHMM(e8.created_at)) + " ", 1),
                          e8.sender == e2.myPhone
                            ? (wl(),
                              _l(
                                "i",
                                {
                                  key: 0,
                                  class: [
                                    "fal fa-check-double pl-2",
                                    {
                                      "text-blue-400": e8.saw_at,
                                    },
                                  ],
                                },
                                null,
                                2,
                              ))
                            : Ml("", !0),
                        ]),
                      ]),
                    ],
                    2,
                  ),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
      e2.recording
        ? (wl(),
          _l("div", Nm, [
            Pl("span", Um, g(e$.$filters.duration(e2.recording.duration)), 1),
            Pl(
              "button",
              {
                onClick: e0[14] || (e0[14] = (e$) => e2.recording.stop()),
              },
              [$m],
            ),
          ]))
        : Ml("", !0),
      e2.android
        ? (wl(),
          _l("div", jm, [
            Zn(
              Pl(
                "input",
                {
                  android: "",
                  type: "text",
                  onKeydown:
                    e0[15] || (e0[15] = us((e$) => e2.addMessage(), ["enter"])),
                  "onUpdate:modelValue":
                    e0[16] || (e0[16] = (e$) => (e2.text = e$)),
                  placeholder: "Envie uma mensagem",
                  class:
                    "flex-1 p-3.5 px-4 pr-14 text-2xl text-theme rounded-full",
                },
                null,
                544,
              ),
              [[ns, e2.text]],
            ),
            Pl(
              "button",
              {
                class: "absolute right-28",
                onClick: e0[17] || (e0[17] = (e$) => e2.addAttachment()),
              },
              [Fm],
            ),
            Pl(
              "button",
              {
                class: "flex flex-center ml-2 w-16 h-16 microphone",
                onClick:
                  e0[18] ||
                  (e0[18] = (e$) =>
                    e2.recording ? e2.recording.stop(!0) : e2.startRecording()),
              },
              [
                e2.recording
                  ? (wl(), _l("i", qm))
                  : (wl(), _l("svg", zm, [Bm, Hm])),
              ],
            ),
          ]))
        : (wl(),
          _l("div", Gm, [
            Pl(
              "button",
              {
                onClick:
                  e0[19] ||
                  (e0[19] = (...e$) =>
                    e2.addAttachment && e2.addAttachment(...e$)),
              },
              [Wm],
            ),
            Zn(
              Pl(
                "input",
                {
                  onKeydown:
                    e0[20] || (e0[20] = us((e$) => e2.addMessage(), ["enter"])),
                  "onUpdate:modelValue":
                    e0[21] || (e0[21] = (e$) => (e2.text = e$)),
                  class:
                    "ml-4 bg-theme rounded-3xl bg-theme border border-theme w-full p-2 px-4 text-2xl text-theme",
                },
                null,
                544,
              ),
              [[ns, e2.text]],
            ),
            Pl(
              "button",
              {
                class: "ml-5",
                onClick:
                  e0[22] ||
                  (e0[22] = (e$) =>
                    e2.recording ? e2.recording.stop(!0) : e2.startRecording()),
              },
              [e2.recording ? (wl(), _l("i", Km)) : (wl(), _l("i", Jm))],
            ),
          ])),
    ])
  );
});
((bm.render = Xm), (bm.__scopeId = "data-v-21268b06"));
const Ym = rt(So.asset("/stock/user.svg")),
  Zm = rt(""),
  Qm = Ze([So.identity.phone]),
  eh = da(() => {
    var e$;
    return null != (e$ = So.settings.whatsappMaxMembers) ? e$ : 100;
  }),
  th = {
    components: {
      Header: ef,
    },
    setup() {
      jl("setDark")(!!So.settings.isAndroid || null);
      let e$ = So.settings.isAndroid,
        e0 = jl("prompt"),
        e8 = jl("alert"),
        e2 = cc(),
        e3 = rt(!0),
        e1 = da(() => So.contacts.value.filter((e$) => !Qm.includes(e$.phone)));
      return {
        android: e$,
        maxMembers: eh,
        dark: So.darkTheme,
        avatarURL: Ym,
        name: Zm,
        contacts: e1,
        invited: Qm,
        removeMember: function (e$) {
          Qm.splice(Qm.indexOf(e$), 1);
        },
        promptAvatarURL: async function () {
          try {
            let e$ = await go().request(["Link externo", "Galeria"], 20, !0),
              e2 = await (e$ ? fo() : e0("Insira o link"));
            if ((null == e2 ? void 0 : e2.length) > 255)
              e8("Link muito grande, m\xe1ximo de 255 caracteres");
            else if (e2) {
              Ym.value = e2;
              let e1 = new Image();
              ((e1.onload = () => (e3.value = !0)), (e1.src = e2));
            }
          } catch (e6) {}
        },
        submit: function () {
          var e$;
          if (!e3.value) return e8("Imagem inv\xe1lida");
          if (Ym.value.length > 255) return e8("Imagem muito grande");
          if (
            !(null == (e$ = Zm.value) ? void 0 : e$.trim()) ||
            Zm.value.length > 32
          )
            return e8("Nome inv\xe1lido");
          if (Qm.length < 2) return e8("Usu\xe1rios insuficientes");
          let e0 = Qm.filter((e$, e0) => e0);
          (So.backend
            .wpp_createGroup(Zm.value.trim(), Ym.value, e0)
            .then(() => {
              e2.back();
            }),
            (Ym.value = So.asset("/stock/user.svg")),
            (Zm.value = ""),
            (Qm.length = 0),
            Qm.push(So.identity.phone));
        },
      };
    },
  },
  nh = sn("data-v-f8c9758a");
ln("data-v-f8c9758a");
const lh = {
    class: "h-16",
  },
  ah = Pl(
    "i",
    {
      class: "far fa-arrow-left",
    },
    null,
    -1,
  ),
  sh = Pl(
    "h1",
    {
      class: "absolute left-16 font-bold",
    },
    "Criar Grupo",
    -1,
  ),
  oh = {
    key: 1,
    class: "mt-24 mb-8 px-5",
  },
  rh = Pl(
    "h1",
    {
      class: "text-5xl font-bold",
    },
    "Criar Grupo",
    -1,
  ),
  ih = {
    class: "flex-1 p-5",
  },
  ch = {
    class: "relative mx-auto w-40",
  },
  uh = Pl(
    "i",
    {
      class: "fas fa-link text-white text-xl",
    },
    null,
    -1,
  ),
  dh = Pl("label", null, "Nome", -1),
  ph = {
    class: "block mt-4",
  },
  fh = {
    class: "border rounded-xl p-4 overflow-y-auto fancy-scroll",
    style: {
      height: "40rem",
    },
  },
  mh = {
    key: 0,
    class: "text-2xl",
  },
  hh = Pl(
    "i",
    {
      class: "far fa-times text-red-500",
    },
    null,
    -1,
  ),
  bh = {
    key: 0,
    class: "text-2xl",
  },
  gh = Pl(
    "i",
    {
      class: "far fa-user-plus text-blue-500",
    },
    null,
    -1,
  ),
  vh = {
    key: 0,
    class: "absolute bottom-8 right-8",
  };
an();
const xh = nh((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header"),
    e4 = dl("app-input");
  return (
    wl(),
    _l(
      "div",
      {
        class: [
          "flex flex-col h-full text-theme",
          [e2.android ? "bg-whatsapp-container" : "bg-theme"],
        ],
      },
      [
        e2.android
          ? (wl(),
            _l(
              e6,
              {
                key: 0,
              },
              {
                default: nh(() => [
                  Pl("div", lh, [
                    Pl(
                      "button",
                      {
                        onClick:
                          e0[1] ||
                          (e0[1] = (...e0) =>
                            e$.$router.back && e$.$router.back(...e0)),
                        class: "absolute left-0 px-4",
                      },
                      [ah],
                    ),
                    sh,
                  ]),
                ]),
                _: 1,
              },
            ))
          : (wl(), _l("div", oh, [rh])),
        Pl("div", ih, [
          Pl("div", ch, [
            Pl(
              "img",
              {
                src: e2.avatarURL,
                class: "w-40 h-40 rounded-full",
              },
              null,
              8,
              ["src"],
            ),
            Pl(
              "button",
              {
                onClick: e0[2] || (e0[2] = (e$) => e2.promptAvatarURL()),
                class: [
                  "absolute bottom-0 right-0 w-12 h-12 rounded-full bg-gray-500 border-2 flex flex-center",
                  [e2.dark ? "border-black" : "border-white"],
                ],
              },
              [uh],
              2,
            ),
          ]),
          Pl("div", null, [
            dh,
            Pl(
              e4,
              {
                modelValue: e2.name,
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.name = e$)),
                maxlength: "24",
                class: "text-3xl bg-transparent text-theme border",
              },
              null,
              8,
              ["modelValue"],
            ),
          ]),
          Pl(
            "label",
            ph,
            "Membros (" + g(e2.invited.length) + "/" + g(e2.maxMembers) + ")",
            1,
          ),
          Pl("ul", fh, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.invited,
                (e0, e8) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e8,
                      class: "flex justify-between items-center mb-2 last:mb-0",
                    },
                    [
                      Pl("span", null, g(e$.$filters.getNameByPhone(e0)), 1),
                      e8
                        ? (wl(),
                          _l("div", mh, [
                            Pl(
                              "button",
                              {
                                onClick: (e$) => e2.removeMember(e0),
                                class: "pl-3",
                              },
                              [hh],
                              8,
                              ["onClick"],
                            ),
                          ]))
                        : Ml("", !0),
                    ],
                  )
                ),
              ),
              128,
            )),
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.contacts,
                (e0, e8) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e8,
                      class: "flex justify-between items-center mb-2 last:mb-0",
                    },
                    [
                      Pl(
                        "span",
                        null,
                        g(e$.$filters.getNameByPhone(e0.phone)),
                        1,
                      ),
                      e2.invited.length < e2.maxMembers
                        ? (wl(),
                          _l("div", bh, [
                            Pl(
                              "button",
                              {
                                onClick: (e$) => e2.invited.push(e0.phone),
                                class: "pl-3",
                              },
                              [gh],
                              8,
                              ["onClick"],
                            ),
                          ]))
                        : Ml("", !0),
                    ],
                  )
                ),
              ),
              128,
            )),
          ]),
          e2.invited.length > 1
            ? (wl(),
              _l("div", vh, [
                Pl(
                  "button",
                  {
                    onClick:
                      e0[4] ||
                      (e0[4] = (...e$) => e2.submit && e2.submit(...e$)),
                    class: "bg-blue-500 px-6 p-3 rounded-xl text-white",
                  },
                  "Criar",
                ),
              ]))
            : Ml("", !0),
        ]),
      ],
      2,
    )
  );
});
((th.render = xh), (th.__scopeId = "data-v-f8c9758a"));
const yh = da(() => {
    var e$;
    return null != (e$ = So.settings.whatsappMaxMembers) ? e$ : 100;
  }),
  kh = {
    components: {
      Header: ef,
    },
    setup() {
      jl("setDark")(!!So.settings.isAndroid || null);
      let e$ = jl("prompt"),
        e0 = jl("alert"),
        e8 = jl("confirm"),
        e2 = cc(),
        e3 = uc(),
        e1 = Ze({}),
        e6 = e3.params.group.slice(5);
      So.localhost &&
        ((e1.id = 1),
        (e1.owner = So.identity.phone),
        (e1.isOwner = !0),
        (e1.members = ["000-004", "000-002"]));
      let e4 = da(() => {
        let e$ = [];
        return (
          e1.id &&
            (e$.push(e1.owner, ...e1.members),
            e1.isOwner && e$.push(...So.contacts.value.map((e$) => e$.phone))),
          e$.filter((e$, e0, e8) => e8.indexOf(e$) == e0)
        );
      });
      async function e7(e$, e8) {
        let e2 = await So.backend[e$](...e8);
        return (null == e2 ? void 0 : e2.error)
          ? (e0(e2.error), Promise.reject("WhatsApp response with error"))
          : e2;
      }
      return (
        So.backend.wpp_getGroup(e6).then((e$) => {
          ((e$.isOwner = e$.owner === So.identity.phone),
            Object.assign(e1, e$),
            (null == e$ ? void 0 : e$.id) ||
              (e2.back(), e0("Grupo inv\xe1lido (Sem ID)")));
        }),
        (e7.empty = () => {}),
        {
          android: So.settings.isAndroid,
          maxMembers: yh,
          dark: So.darkTheme,
          members: e4,
          group: e1,
          promptAvatarURL: async function () {
            try {
              let e8 = await go().request(["Link externo", "Galeria"], 20, !0),
                e2 = await (e8 ? fo() : e$("Insira o link"));
              (null == e2 ? void 0 : e2.length) > 255
                ? e0("Link muito grande, m\xe1ximo de 255 caracteres")
                : e2 &&
                  e7("wpp_updateGroupAvatar", [e1.id, e2]).then(
                    () => (e1.avatarURL = e2),
                    e7.empty,
                  );
            } catch (e3) {}
          },
          updateName: async function (e$) {
            e7("wpp_updateGroupName", [e1.id, e$]).then(
              () => (e1.name = e$),
              e7.empty,
            );
          },
          removeMember: function (e$) {
            e8("Deseja remover " + Bs(e$) + "?").then(
              (e0) =>
                e0 &&
                e7("wpp_removeFromGroup", [e1.id, e$]).then(() => {
                  e1.members = e1.members.filter((e0) => e0 != e$);
                }, e7.empty),
            );
          },
          leaveGroup: async function () {
            e7("wpp_leaveGroup", [e1.id]).then(() => e2.go(-2), e7.empty);
          },
          destroyGroup: async function () {
            e7("wpp_deleteGroup", [e1.id]).then(() => e2.go(-2), e7.empty);
          },
          promoteMember: async function (e$) {
            if (
              !(await e8(
                "Deseja transferir a posse do grupo para " + Bs(e$) + "?",
              ))
            )
              return;
            let e2 = await e7("wpp_promote", [e1.id, e$]);
            if (null == e2 ? void 0 : e2.error) return e0(e2.error);
            let e3 = e1.members.indexOf(e$);
            (e1.members.splice(e3, 1, So.identity.phone),
              (e1.owner = e$),
              (e1.isOwner = !1));
          },
          inviteMember: function (e$) {
            e7("wpp_inviteToGroup", [e1.id, e$]).then(
              () => e1.members.push(e$),
              e7.empty,
            );
          },
        }
      );
    },
  },
  wh = sn("data-v-491341e1");
ln("data-v-491341e1");
const Ch = {
    class: "flex flex-col h-full bg-whatsapp-container text-theme",
  },
  _h = {
    class: "h-16",
  },
  Ah = Pl(
    "i",
    {
      class: "far fa-arrow-left",
    },
    null,
    -1,
  ),
  Sh = {
    class: "absolute left-16 font-bold",
  },
  Th = {
    key: 1,
    class: "mt-24 mb-8 px-5",
  },
  Eh = Pl(
    "h1",
    {
      class: "text-5xl font-bold",
    },
    "Editar Grupo",
    -1,
  ),
  Rh = {
    class: "flex-1 p-5",
  },
  Ph = {
    key: 0,
    class: "relative mx-auto w-40",
  },
  Lh = Pl(
    "i",
    {
      class: "fas fa-link text-white text-xl",
    },
    null,
    -1,
  ),
  Ih = {
    class: "mt-4",
  },
  Oh = Pl(
    "label",
    {
      for: "block m-2",
    },
    "Nome do Grupo",
    -1,
  ),
  Mh = {
    key: 1,
    class: "mt-4",
  },
  Vh = {
    class: "border rounded-xl p-4 overflow-y-auto fancy-scroll",
    style: {
      height: "40rem",
    },
  },
  Dh = {
    key: 0,
    class: "text-2xl",
  },
  Nh = Pl(
    "i",
    {
      class: "far fa-chevron-up text-green-500",
    },
    null,
    -1,
  ),
  Uh = Pl(
    "i",
    {
      class: "far fa-times text-red-500",
    },
    null,
    -1,
  ),
  $h = Pl(
    "i",
    {
      class: "far fa-user-plus text-blue-500",
    },
    null,
    -1,
  ),
  jh = {
    key: 2,
    class: "absolute bottom-8 left-8",
  },
  Fh = {
    key: 3,
    class: "absolute bottom-8 right-8",
  };
an();
const zh = wh((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header"),
    e4 = dl("app-input");
  return (
    wl(),
    _l("div", Ch, [
      e2.android
        ? (wl(),
          _l(
            e6,
            {
              key: 0,
            },
            {
              default: wh(() => {
                var e8;
                return [
                  Pl("div", _h, [
                    Pl(
                      "button",
                      {
                        onClick:
                          e0[1] ||
                          (e0[1] = (...e0) =>
                            e$.$router.back && e$.$router.back(...e0)),
                        class: "absolute left-0 px-4",
                      },
                      [Ah],
                    ),
                    Pl(
                      "h1",
                      Sh,
                      g(
                        null == (e8 = e2.group.name) ? void 0 : e8.slice(0, 20),
                      ),
                      1,
                    ),
                  ]),
                ];
              }),
              _: 1,
            },
          ))
        : (wl(), _l("div", Th, [Eh])),
      Pl("div", Rh, [
        e2.group.id
          ? (wl(),
            _l("div", Ph, [
              Pl(
                "img",
                {
                  src: e2.group.avatarURL,
                  class: "w-40 h-40 border rounded-full",
                },
                null,
                8,
                ["src"],
              ),
              e2.group.isOwner
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      onClick: e0[2] || (e0[2] = (e$) => e2.promptAvatarURL()),
                      class: [
                        "absolute bottom-0 right-0 w-12 h-12 rounded-full bg-gray-500 border-2 flex flex-center",
                        [e2.dark ? "border-black" : "border-white"],
                      ],
                    },
                    [Lh],
                    2,
                  ))
                : Ml("", !0),
            ]))
          : Ml("", !0),
        Pl("div", Ih, [
          Oh,
          Pl(
            e4,
            {
              value: e2.group.name,
              onChange:
                e0[3] || (e0[3] = (e$) => e2.updateName(e$.target.value)),
              maxlength: "24",
              class: "text-3xl bg-transparent text-theme border",
            },
            null,
            8,
            ["value"],
          ),
        ]),
        e2.group.members
          ? (wl(),
            _l("div", Mh, [
              Pl(
                "label",
                null,
                "Membros (" +
                  g(e2.group.members.length + 1) +
                  "/" +
                  g(e2.maxMembers) +
                  ")",
                1,
              ),
              Pl("ul", Vh, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(
                    e2.members,
                    (e0) => (
                      wl(),
                      _l(
                        "li",
                        {
                          key: e0,
                          class:
                            "flex justify-between items-center mb-2 last:mb-0",
                        },
                        [
                          Pl(
                            "span",
                            null,
                            g(e$.$filters.getNameByPhone(e0)),
                            1,
                          ),
                          e2.group.isOwner && e0 != e2.group.owner
                            ? (wl(),
                              _l("div", Dh, [
                                e2.group.members.includes(e0)
                                  ? (wl(),
                                    _l(
                                      "button",
                                      {
                                        key: 0,
                                        onClick: (e$) => e2.promoteMember(e0),
                                        class: "px-3",
                                      },
                                      [Nh],
                                      8,
                                      ["onClick"],
                                    ))
                                  : Ml("", !0),
                                e2.group.members.includes(e0)
                                  ? (wl(),
                                    _l(
                                      "button",
                                      {
                                        key: 1,
                                        onClick: (e$) => e2.removeMember(e0),
                                        class: "pl-3",
                                      },
                                      [Uh],
                                      8,
                                      ["onClick"],
                                    ))
                                  : e2.group.members.length < 99
                                    ? (wl(),
                                      _l(
                                        "button",
                                        {
                                          key: 2,
                                          onClick: (e$) => e2.inviteMember(e0),
                                          class: "pl-3",
                                        },
                                        [$h],
                                        8,
                                        ["onClick"],
                                      ))
                                    : Ml("", !0),
                              ]))
                            : Ml("", !0),
                        ],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
            ]))
          : Ml("", !0),
        e2.members.length > 1 && !e2.group.isOwner
          ? (wl(),
            _l("div", jh, [
              Pl(
                "button",
                {
                  onClick:
                    e0[4] ||
                    (e0[4] = (...e$) => e2.leaveGroup && e2.leaveGroup(...e$)),
                  class: "text-red-500",
                },
                "Sair do grupo",
              ),
            ]))
          : Ml("", !0),
        e2.group.isOwner
          ? (wl(),
            _l("div", Fh, [
              Pl(
                "button",
                {
                  onClick:
                    e0[5] ||
                    (e0[5] = (...e$) =>
                      e2.destroyGroup && e2.destroyGroup(...e$)),
                  class: "text-red-500",
                },
                "Excluir o grupo",
              ),
            ]))
          : Ml("", !0),
      ]),
    ])
  );
});
((kh.render = zh), (kh.__scopeId = "data-v-491341e1"));
const Bh = {
    props: ["footer", "hasBell"],
    setup() {
      jl("setDark")(!0);
      let e$ = da(() => So.settings.isAndroid),
        e0 = [
          {
            name: "Mensagens",
            path: "/tor",
            icon: "fal fa-reply-all",
          },
          {
            name: "Grupos",
            path: "/tor/groups",
            icon: "fal fa-comment-alt",
          },
          {
            name: "An\xfancios",
            path: "/tor/store",
            icon: "fal fa-bags-shopping",
          },
        ];
      So.isDisabled("tor-payments") ||
        e0.push({
          name: "Pagamentos",
          path: "/tor/payments",
          icon: "fal fa-wallet",
        });
      let e8 = rt(So.hasNotificationFor("tor"));
      return (
        Tn(e8, (e$) => So.setNotificationFor("tor", e$)),
        {
          isAndroid: e$,
          routes: e0,
          notifications: e8,
        }
      );
    },
  },
  Hh = {
    class: "flex flex-col h-full bg-black",
  },
  qh = {
    class: "h-32 pt-16 bg-tor-secondary text-white flex-shrink-0",
  },
  Gh = {
    key: 0,
    class: "far fa-arrow-left mr-4",
  },
  Wh = {
    key: 1,
    class: "fas fa-chevron-left text-blue-400",
  },
  Kh = {
    class: "font-bold ml-16",
  },
  Jh = {
    key: 0,
    class: "far fa-bell",
  },
  Xh = {
    key: 1,
    class: "far fa-bell-slash",
  },
  Yh = {
    class: "flex-1 overflow-y-auto hide-scroll",
  },
  Zh = {
    key: 0,
    class:
      "h-32 bg-tor-secondary flex justify-between items-center px-8 text-white text-4xl",
  },
  Qh = {
    class: "text-lg mt-3",
  };
Bh.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Hh, [
      Pl("div", qh, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-16 px-5",
          },
          [e2.isAndroid ? (wl(), _l("i", Gh)) : (wl(), _l("i", Wh))],
        ),
        Pl("h1", Kh, [
          Zt(e$.$slots, "header"),
          e8.hasBell
            ? (wl(),
              _l(
                "button",
                {
                  key: 0,
                  onClick:
                    e0[2] ||
                    (e0[2] = (e$) => (e2.notifications = !e2.notifications)),
                  class: "absolute top-20 right-8 w-6 h-4 flex flex-center",
                },
                [e2.notifications ? (wl(), _l("i", Jh)) : (wl(), _l("i", Xh))],
              ))
            : Ml("", !0),
        ]),
      ]),
      Pl("div", Yh, [Zt(e$.$slots, "default")]),
      Zt(e$.$slots, "footer"),
      !1 !== e8.footer
        ? (wl(),
          _l("div", Zh, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.routes,
                (e0) => (
                  wl(),
                  _l(
                    "button",
                    {
                      key: e0.path,
                      class: [
                        "text-center",
                        {
                          "text-tor": e$.$route.path == e0.path,
                        },
                      ],
                      onClick: (e8) => e$.$router.replace(e0.path),
                    },
                    [
                      Pl(
                        "i",
                        {
                          class: e0.icon,
                        },
                        null,
                        2,
                      ),
                      Pl("h1", Qh, g(e0.name), 1),
                    ],
                    10,
                    ["onClick"],
                  )
                ),
              ),
              128,
            )),
          ]))
        : Ml("", !0),
    ])
  );
};
const eb = Ze({
  id: "0",
  is(e$) {
    return this.id == e$ || this.id == (null == e$ ? void 0 : e$.sender);
  },
  getNickname(e$) {
    var e0;
    return null != (e0 = localStorage.getItem("tor:nickname:" + e$))
      ? e0
      : "Usu\xe1rio " + e$;
  },
  setNickname(e$, e0) {
    localStorage.setItem("tor:nickname:" + e$, e0);
  },
  direct: [],
  groups: ["geral"],
  listening: [],
});
for (let kM of ["direct", "groups", "listening"]) {
  let e2 = "smartphone@deepweb@" + kM,
    e3 = localStorage.getItem(e2);
  if (e3) {
    let e1 = JSON.parse(e3);
    eb[kM] = e1;
  }
  Tn(
    () => eb[kM],
    (e$) => {
      localStorage.setItem(e2, JSON.stringify(e$));
    },
    {
      deep: !0,
    },
  );
}
(An(() => So.backend.tor_subscribe(eb.groups)),
  So.pusher.on("TOR_MESSAGE", (e$) => {
    let e0 = String(e$.sender);
    e0 != eb.id &&
      e$.channel.startsWith("dm:") &&
      !eb.direct.includes(e0) &&
      eb.direct.unshift(e0);
  }));
const tb = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = cc(),
        e0 = rt([]);
      return (
        So.backend.tor_blocked().then((e0) => {
          e0 && (e$.replace("/home"), So.alert(e0));
        }),
        So.backend.tor_resume(eb.direct).then((e$) => {
          e0.value = Object.entries(e$)
            .map(([e$, e0]) => ({
              id: e$,
              name: eb.getNickname(e$),
              avatarURL: `https://avatars.dicebear.com/api/identicon/${e$}.svg`,
              message: e0,
            }))
            .sort((e$, e0) =>
              e$.message && e0.message
                ? e$.message.created_at > e0.message.created_at
                  ? -1
                  : 1
                : e$.message == e0.message
                  ? 0
                  : e$.message
                    ? -1
                    : 1,
            );
        }),
        So.onceRoute("TOR_MESSAGE", (e$) => {
          if (e$.channel.startsWith("dm:") && e$.sender != eb.id) {
            let e8 = e0.value.find((e0) => e0.id == e$.sender);
            e8 && (e8.message = e$);
          }
        }),
        So.backend.tor_id().then((e$) => (eb.id = e$)),
        {
          users: e0,
          search: function () {
            So.prompt("Digite o id do usu\xe1rio").then((e0) => {
              (e0 = null == e0 ? void 0 : e0.trim()) &&
                (e0.match(/^\d+$/)
                  ? e$.push("/tor/" + e0)
                  : So.alert("Usu\xe1rio inv\xe1lido"));
            });
          },
        }
      );
    },
  },
  nb = Il(" Deep Web "),
  lb = {
    class: "text-2xl flex-1",
  },
  ab = {
    class: "flex justify-between",
  },
  sb = {
    class: "font-bold",
  },
  ob = {
    key: 0,
    class: "text-lg",
  },
  rb = {
    key: 0,
    class: "text-gray-400",
  },
  ib = {
    key: 0,
  },
  cb = {
    key: 1,
  },
  ub = {
    key: 2,
  },
  db = {
    key: 1,
    class: "text-gray-400 italic",
  },
  pb = Pl(
    "i",
    {
      class: "fa fa-pen",
    },
    null,
    -1,
  );
tb.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        hasBell: "yes",
      },
      {
        header: en(() => [nb]),
        default: en(() => [
          Pl("ul", null, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.users,
                (e0) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e0.id,
                      onClick: (e8) => e$.$router.push("/tor/" + e0.id),
                      class:
                        "p-5 flex items-start text-white hover:bg-gray-900",
                    },
                    [
                      Pl(
                        "img",
                        {
                          class: "bg-white rounded-full w-20 mr-4",
                          src: e0.avatarURL,
                        },
                        null,
                        8,
                        ["src"],
                      ),
                      Pl("div", lb, [
                        Pl("div", ab, [
                          Pl("h1", sb, g(e0.name), 1),
                          e0.message
                            ? (wl(),
                              _l(
                                "h1",
                                ob,
                                g(
                                  e$.$filters.unixToRelative(
                                    e0.message.created_at,
                                  ),
                                ),
                                1,
                              ))
                            : Ml("", !0),
                        ]),
                        e0.message
                          ? (wl(),
                            _l("p", rb, [
                              e0.message.location
                                ? (wl(),
                                  _l(
                                    "span",
                                    ib,
                                    "\uD83C\uDF0E Localiza\xe7\xe3o",
                                  ))
                                : e0.message.image
                                  ? (wl(), _l("span", cb, "📷 Foto"))
                                  : (wl(),
                                    _l("span", ub, g(e0.message.content), 1)),
                            ]))
                          : (wl(), _l("p", db, "Nenhuma mensagem...")),
                      ]),
                    ],
                    8,
                    ["onClick"],
                  )
                ),
              ),
              128,
            )),
          ]),
          Pl(
            "button",
            {
              onClick:
                e0[1] || (e0[1] = (...e$) => e2.search && e2.search(...e$)),
              class:
                "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full",
            },
            [pb],
          ),
        ]),
        _: 1,
      },
    )
  );
};
const fb = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = cc(),
        e0 = rt([]);
      return (
        So.backend.tor_resume(eb.groups, !0).then((e$) => {
          e0.value = Object.entries(e$)
            .map(([e$, e0]) => ({
              id: e$,
              message: e0,
            }))
            .sort((e$, e0) =>
              e$.message && e0.message
                ? e$.message.created_at > e0.message.created_at
                  ? -1
                  : 1
                : e$.message == e0.message
                  ? 0
                  : e$.message
                    ? -1
                    : 1,
            );
        }),
        So.onceRoute("TOR_MESSAGE", (e$) => {
          if (!e$.channel.startsWith("dm:") && e$.sender != eb.id) {
            let e8 = e0.value.find((e0) => e0.id == e$.channel);
            e8 && (e8.message = e$);
          }
        }),
        {
          state: eb,
          groups: e0,
          search: function () {
            So.prompt("Digite o nome do grupo").then((e0) => {
              (e0 = null == e0 ? void 0 : e0.trim()) &&
                (e0.match(/^[\w-.]+$/)
                  ? e$.push("/tor/" + e0)
                  : So.alert("Grupo inv\xe1lido"));
            });
          },
        }
      );
    },
  },
  mb = Il(" Deep Web "),
  hb = Pl(
    "div",
    {
      class: "bg-white rounded-full w-20 h-20 mr-4 flex flex-center",
    },
    [
      Pl("i", {
        class: "fas fa-users text-4xl text-gray-500",
      }),
    ],
    -1,
  ),
  bb = {
    class: "text-2xl flex-1",
  },
  gb = {
    class: "flex justify-between",
  },
  vb = {
    class: "font-bold",
  },
  xb = {
    key: 0,
    class: "text-lg",
  },
  yb = {
    key: 0,
    class: "text-gray-400",
  },
  kb = {
    key: 0,
  },
  wb = {
    key: 1,
  },
  Cb = {
    key: 2,
  },
  _b = {
    key: 1,
    class: "text-gray-400 italic",
  },
  Ab = Pl(
    "i",
    {
      class: "fa fa-search",
    },
    null,
    -1,
  );
fb.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        hasBell: "yes",
      },
      {
        header: en(() => [mb]),
        default: en(() => [
          Pl("ul", null, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.groups,
                (e0) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e0,
                      onClick: (e8) => e$.$router.push("/tor/" + e0.id),
                      class:
                        "p-5 flex items-start text-white hover:bg-gray-900",
                    },
                    [
                      hb,
                      Pl("div", bb, [
                        Pl("div", gb, [
                          Pl("h1", vb, "#" + g(e0.id), 1),
                          e0.message
                            ? (wl(),
                              _l(
                                "h1",
                                xb,
                                g(
                                  e$.$filters.unixToRelative(
                                    e0.message.created_at,
                                  ),
                                ),
                                1,
                              ))
                            : Ml("", !0),
                        ]),
                        e0.message
                          ? (wl(),
                            _l("p", yb, [
                              e0.message.location
                                ? (wl(),
                                  _l(
                                    "span",
                                    kb,
                                    "\uD83C\uDF0E Localiza\xe7\xe3o",
                                  ))
                                : e0.message.image
                                  ? (wl(), _l("span", wb, "📷 Foto"))
                                  : (wl(),
                                    _l("span", Cb, g(e0.message.content), 1)),
                            ]))
                          : (wl(), _l("p", _b, "Nenhuma mensagem...")),
                      ]),
                    ],
                    8,
                    ["onClick"],
                  )
                ),
              ),
              128,
            )),
          ]),
          Pl(
            "button",
            {
              onClick:
                e0[1] || (e0[1] = (...e$) => e2.search && e2.search(...e$)),
              class:
                "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full",
            },
            [Ab],
          ),
        ]),
        _: 1,
      },
    )
  );
};
const Sb = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = uc(),
        e0 = da(() => e$.params.id),
        e8 = !e0.value.match(/^\d+$/),
        e2 = rt(e8 ? "#" + e0.value : eb.getNickname(e0.value)),
        e3 = da(() =>
          e8 ? eb.groups.includes(e0.value) : eb.direct.includes(e0.value),
        ),
        e1 = e$.params.id,
        e6 = rt(""),
        e4 = rt([]),
        e7 = da(() => {
          let e$ = [],
            e0;
          for (let e8 of e4.value)
            (null == e0 ? void 0 : e0[0].sender) != e8.sender
              ? e$.push((e0 = [e8]))
              : e0.push(e8);
          return e$;
        });

      function e5(e$) {
        var e0;
        (!0 !== e$ && e6.value) ||
          null == (e0 = document.querySelector(".overflow-y-auto")) ||
          e0.scrollTo({
            top: 9e6,
            behavior: e$ ? "auto" : "smooth",
          });
      }
      async function eV(e$, e0) {
        (e$ || e0 || e6.value) &&
          (So.backend.tor_send(e8 ? e1 : parseInt(e1), e6.value, e$, e0),
          (e6.value = ""));
      }
      return (
        So.backend
          .tor_messages(e8 ? e1 : parseInt(e1))
          .then((e$) => {
            for (let e0 of e$)
              try {
                let e8 = JSON.parse(e0.content);
                3 === e8.length && ((e0.location = e8), (e0.content = ""));
              } catch (e2) {}
            ((e4.value = e$), Lt(() => e5(!0)));
          })
          .catch((e$) => console.error(e$)),
        So.onceRoute("TOR_MESSAGE", (e$) => {
          e4.value.find((e0) => e0.id == e$.id) ||
            (e8 && e$.channel != e0.value) ||
            ((e8 || e$.sender == e0.value || e$.sender == eb.id) &&
              (e4.value.push(e$), Lt(e5)));
        }),
        {
          state: eb,
          input: e6,
          messages: e4,
          addMessage: eV,
          blocks: e7,
          addAttachment: async function () {
            let e$ = ["camera", "gallery", "location"];
            (So.settings.allowUnsafeURL && e$.splice(2, 0, "image"),
              e8 || So.isDisabled("tor-payments") || e$.push("payment"));
            let e2 = await go().request(
              [
                ["C\xe2mera", "text-blue-500 text-center"],
                ["Galeria", "text-blue-500 text-center"],
                e$.includes("image") && ["Imagem", "text-blue-500 text-center"],
                ["Localiza\xe7\xe3o", "text-blue-500 text-center"],
                e$.includes("payment") && [
                  "Pagamento",
                  "text-blue-500 text-center",
                ],
              ],
              7 * e$.length,
            );
            try {
              switch (e$[e2]) {
                case "camera":
                  return eV(await co(!1, "/tor"));
                case "gallery":
                  return eV(await fo());
                case "image":
                  return eV(await So.promptImageURL());
                case "location":
                  let e3 = await So.getPlayerCoords();
                  return eV(null, JSON.stringify(e3));
                case "payment":
                  let e1 = parseInt(await So.prompt("Insira o valor"));
                  e1 > 0 &&
                    So.lockAndProceed(() =>
                      So.backend.tor_pay(parseInt(e0.value), e1).then((e$) => {
                        So.alert(null == e$ ? void 0 : e$.error);
                      }),
                    );
              }
            } catch (e6) {}
          },
          setLocation: function (e$) {
            So.pusher.emit("GPS", {
              location: e$,
            });
          },
          ajustSize: e5,
          isPinned: e3,
          togglePinned: function () {
            let e$ = e8 ? eb.groups : eb.direct,
              e2 = e$.indexOf(e0.value);
            e2 >= 0 ? e$.splice(e2, 1) : e$.push(e0.value);
          },
          isGroup: e8,
          nickname: e2,
          changeNickname: function () {
            So.prompt("Insira o apelido", 12).then((e$) => {
              let e8 = null == e$ ? void 0 : e$.trim();
              e8 &&
                e8.length <= 12 &&
                (eb.setNickname(e0.value, e8), (e2.value = e8));
            });
          },
        }
      );
    },
  },
  Tb = sn("data-v-1fdef7f8");
ln("data-v-1fdef7f8");
const Eb = {
    class: "flex items-center",
  },
  Rb = {
    key: 0,
    class: "bg-white rounded-full w-12 h-12 mr-4 flex flex-center",
  },
  Pb = Pl(
    "i",
    {
      class: "fas fa-users text-2xl text-gray-500",
    },
    null,
    -1,
  ),
  Lb = {
    class: "ml-auto",
  },
  Ib = Pl(
    "i",
    {
      class: "fas fa-user-tag",
    },
    null,
    -1,
  ),
  Ob = {
    key: 0,
    class: "fal fa-times",
  },
  Mb = {
    key: 1,
    class: "fas fa-thumbtack transform rotate-45",
  },
  Vb = {
    key: 0,
    class: "text-white text-base",
  },
  Db = {
    class: "break-words relative mt-1",
  },
  Nb = {
    class: "mr-2",
  },
  Ub = {
    class: "text-base h-6 float-right relative top-3",
  },
  $b = {
    class: "h-20 px-4 flex items-center bg-tor-secondary",
  },
  jb = Pl(
    "i",
    {
      class: "far fa-paper-plane",
    },
    null,
    -1,
  ),
  Fb = Pl(
    "i",
    {
      class: "far fa-paperclip transform rotate-180",
    },
    null,
    -1,
  );
an();
const zb = Tb((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        footer: !1,
      },
      {
        header: Tb(() => [
          Pl("div", Eb, [
            e2.isGroup
              ? (wl(), _l("div", Rb, [Pb]))
              : (wl(),
                _l(
                  "img",
                  {
                    key: 1,
                    class: "w-12 h-12 bg-white rounded-full mr-4",
                    src: `https://avatars.dicebear.com/api/identicon/${e$.$route.params.id}.svg`,
                  },
                  null,
                  8,
                  ["src"],
                )),
            Pl("h1", null, g(e2.nickname), 1),
            Pl("div", Lb, [
              e2.isGroup
                ? Ml("", !0)
                : (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      class: "mr-2 px-2",
                      onClick:
                        e0[1] ||
                        (e0[1] = (...e$) =>
                          e2.changeNickname && e2.changeNickname(...e$)),
                    },
                    [Ib],
                  )),
              Pl(
                "button",
                {
                  class: "mr-4 px-2",
                  onClick:
                    e0[2] ||
                    (e0[2] = (...e$) =>
                      e2.togglePinned && e2.togglePinned(...e$)),
                },
                [e2.isPinned ? (wl(), _l("i", Ob)) : (wl(), _l("i", Mb))],
              ),
            ]),
          ]),
        ]),
        footer: Tb(() => [
          Pl("div", $b, [
            Zn(
              Pl(
                "input",
                {
                  "onUpdate:modelValue":
                    e0[5] || (e0[5] = (e$) => (e2.input = e$)),
                  onKeydown:
                    e0[6] || (e0[6] = us((e$) => e2.addMessage(), ["enter"])),
                  class:
                    "ml-8 flex-1 caret-tor text-white text-3xl bg-transparent",
                  placeholder: "Mensagem",
                },
                null,
                544,
              ),
              [
                [
                  ns,
                  e2.input,
                  void 0,
                  {
                    trim: !0,
                  },
                ],
              ],
            ),
            e2.input
              ? (wl(),
                _l(
                  "button",
                  {
                    key: 0,
                    onClick: e0[7] || (e0[7] = (e$) => e2.addMessage()),
                    class: "p-4 text-gray-500",
                  },
                  [jb],
                ))
              : (wl(),
                _l(
                  "button",
                  {
                    key: 1,
                    onClick:
                      e0[8] ||
                      (e0[8] = (...e$) =>
                        e2.addAttachment && e2.addAttachment(...e$)),
                    class: "p-4 text-gray-500",
                  },
                  [Fb],
                )),
          ]),
        ]),
        default: Tb(() => [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.blocks,
              (e8, e3) => (
                wl(),
                _l(
                  "ul",
                  {
                    key: e3,
                    class: "p-4",
                  },
                  [
                    Pl(
                      "li",
                      {
                        class: [
                          "flex",
                          {
                            "flex-row-reverse": e8[0].sender == e2.state.id,
                          },
                        ],
                      },
                      [
                        e2.state.is(e8[0])
                          ? Ml("", !0)
                          : (wl(),
                            _l(
                              "img",
                              {
                                key: 0,
                                class: "w-16 h-16 bg-white rounded-full",
                                src: `https://avatars.dicebear.com/api/identicon/${e8[0].sender}.svg`,
                              },
                              null,
                              8,
                              ["src"],
                            )),
                        Pl(
                          "ul",
                          {
                            class: [
                              "flex flex-col items-start w-full",
                              e8[0].sender == e2.state.id ? "mr-4" : "ml-4",
                            ],
                          },
                          [
                            !e2.state.is(e8[0]) && e2.isGroup
                              ? (wl(),
                                _l("li", Vb, [
                                  Pl(
                                    "button",
                                    {
                                      onClick: (e0) =>
                                        e$.$router.push("/tor/" + e8[0].sender),
                                    },
                                    "Usu\xe1rio " + g(e8[0].sender),
                                    9,
                                    ["onClick"],
                                  ),
                                ]))
                              : Ml("", !0),
                            (wl(!0),
                            _l(
                              bl,
                              null,
                              fa(e8, (e8) => {
                                var e3;
                                return (
                                  wl(),
                                  _l(
                                    "li",
                                    {
                                      key: e8.id,
                                      class: [
                                        "message p-2 rounded text-3xl text-white mb-1.5",
                                        [
                                          e8.sender == e2.state.id
                                            ? "ml-auto bg-tor"
                                            : "bg-gray-800",
                                        ],
                                      ],
                                    },
                                    [
                                      e8.image
                                        ? (wl(),
                                          _l(
                                            "img",
                                            {
                                              key: 0,
                                              class: "w-full rounded",
                                              onLoad:
                                                e0[3] ||
                                                (e0[3] = (...e$) =>
                                                  e2.ajustSize &&
                                                  e2.ajustSize(...e$)),
                                              src: e8.image,
                                            },
                                            null,
                                            40,
                                            ["src"],
                                          ))
                                        : e8.location
                                          ? (wl(),
                                            _l(
                                              "img",
                                              {
                                                key: 1,
                                                onClick: (e$) =>
                                                  e2.setLocation(e8.location),
                                                class: "w-full rounded",
                                                onLoad:
                                                  e0[4] ||
                                                  (e0[4] = (...e$) =>
                                                    e2.ajustSize &&
                                                    e2.ajustSize(...e$)),
                                                src: "/stock/maps.jpg",
                                              },
                                              null,
                                              40,
                                              ["onClick"],
                                            ))
                                          : Ml("", !0),
                                      Pl("p", Db, [
                                        Pl("span", Nb, g(e8.content), 1),
                                        Pl(
                                          "span",
                                          Ub,
                                          g(
                                            e$.$filters.unixToHHMM(
                                              null != (e3 = e8.created_at)
                                                ? e3
                                                : Date.now(),
                                            ),
                                          ),
                                          1,
                                        ),
                                      ]),
                                    ],
                                    2,
                                  )
                                );
                              }),
                              128,
                            )),
                          ],
                          2,
                        ),
                      ],
                      2,
                    ),
                  ],
                )
              ),
            ),
            128,
          )),
        ]),
        _: 1,
      },
    )
  );
});
((Sb.render = zb), (Sb.__scopeId = "data-v-1fdef7f8"));
const Bb = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = cc(),
        e0 = rt([]),
        e8 = da(() => So.identity.moderator),
        e2 = jl("useImageFocus");
      return (
        So.backend.tor_ads().then((e$) => (e0.value = e$)),
        {
          state: eb,
          create: function () {
            e$.push("/tor/store/create");
          },
          ads: e0,
          focusImage: e2,
          destroy: function (e$) {
            So.backend.tor_destroy_ad(e$).then(() => {
              e0.value = e0.value.filter((e0) => e0.id != e$);
            });
          },
          moderator: e8,
        }
      );
    },
  },
  Hb = Il(" Deep Web "),
  qb = {
    class: "p-4",
  },
  Gb = {
    class: "bg-gray-800 rounded flex-1 p-3",
  },
  Wb = {
    class: "flex justify-between items-start mb-4",
  },
  Kb = {
    class: "font-bold break-words mr-2",
  },
  Jb = Pl(
    "i",
    {
      class: "fal fa-times text-red-500",
    },
    null,
    -1,
  ),
  Xb = {
    class: "text-xl mb-4",
  },
  Yb = {
    class: "text-lg",
  },
  Zb = Pl(
    "i",
    {
      class: "fas fa-reply",
    },
    null,
    -1,
  ),
  Qb = Il(" Conversar"),
  eg = Pl(
    "i",
    {
      class: "far fa-plus",
    },
    null,
    -1,
  );
Bb.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(e6, null, {
      header: en(() => [Hb]),
      default: en(() => [
        Pl("ul", qb, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.ads,
              (e0) => (
                wl(),
                _l(
                  "li",
                  {
                    key: e0.id,
                    class: "flex text-white text-2xl mb-6",
                  },
                  [
                    Pl(
                      "img",
                      {
                        class: "w-20 h-20 rounded-full bg-white mr-4",
                        src: `https://avatars.dicebear.com/api/identicon/${e0.anom_id}.svg`,
                        alt: "",
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl("div", Gb, [
                      Pl("div", Wb, [
                        Pl("h1", Kb, g(e0.title), 1),
                        e2.moderator || e2.state.id == e0.anom_id
                          ? (wl(),
                            _l(
                              "button",
                              {
                                key: 0,
                                onClick: (e$) => e2.destroy(e0.id),
                              },
                              [Jb],
                              8,
                              ["onClick"],
                            ))
                          : Ml("", !0),
                      ]),
                      Pl("p", Xb, g(e0.description), 1),
                      e0.image
                        ? (wl(),
                          _l(
                            "img",
                            {
                              key: 0,
                              class: "h-64 mb-4 mx-auto",
                              onClick: (e$) => e2.focusImage(e0.image),
                              src: e0.image,
                            },
                            null,
                            8,
                            ["onClick", "src"],
                          ))
                        : Ml("", !0),
                      Pl("p", Yb, "Autor: " + g(e0.anom_id), 1),
                      Pl(
                        "button",
                        {
                          onClick: (e8) =>
                            e$.$router.push(`/tor/${e0.anom_id}`),
                          class: "font-bold",
                        },
                        [Zb, Qb],
                        8,
                        ["onClick"],
                      ),
                    ]),
                  ],
                )
              ),
            ),
            128,
          )),
        ]),
        Pl(
          "button",
          {
            onClick:
              e0[1] || (e0[1] = (...e$) => e2.create && e2.create(...e$)),
            class:
              "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full",
          },
          [eg],
        ),
      ]),
      _: 1,
    })
  );
};
const tg = Ze({}),
  ng = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = cc();
      return {
        state: eb,
        form: tg,
        addImage: async function () {
          try {
            let e$ = await go().request(
              [
                ["C\xe2mera", "text-center"],
                ["Galeria", "text-center"],
              ],
              20,
              !0,
            );
            tg.image = e$ ? await fo() : await co(!1, "/tor");
          } catch (e0) {}
        },
        publish: function () {
          tg.title &&
            tg.description &&
            (So.backend.tor_publish(tg).then(() => e$.back()),
            Object.assign(tg, {
              title: "",
              description: "",
              image: "",
            }));
        },
      };
    },
  },
  lg = sn("data-v-a969c978");
ln("data-v-a969c978");
const ag = Il(" Deep Web "),
  sg = {
    class: "p-5 text-xl text-white",
  },
  og = Pl("h1", null, "T\xedtulo", -1),
  rg = Pl("h1", null, "Descri\xe7\xe3o", -1),
  ig = Pl("h1", null, "Foto (Opcional)", -1),
  cg = {
    class: "text-right mt-4",
  };
an();
const ug = lg((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        footer: !1,
      },
      {
        header: lg(() => [ag]),
        default: lg(() => [
          Pl("div", sg, [
            og,
            Zn(
              Pl(
                "input",
                {
                  "onUpdate:modelValue":
                    e0[1] || (e0[1] = (e$) => (e2.form.title = e$)),
                  tabindex: "1",
                },
                null,
                512,
              ),
              [
                [
                  ns,
                  e2.form.title,
                  void 0,
                  {
                    trim: !0,
                  },
                ],
              ],
            ),
            rg,
            Zn(
              Pl(
                "input",
                {
                  "onUpdate:modelValue":
                    e0[2] || (e0[2] = (e$) => (e2.form.description = e$)),
                  tabindex: "1",
                },
                null,
                512,
              ),
              [
                [
                  ns,
                  e2.form.description,
                  void 0,
                  {
                    trim: !0,
                  },
                ],
              ],
            ),
            ig,
            e2.form.image
              ? (wl(),
                _l(
                  "img",
                  {
                    key: 0,
                    class: "h-64 rounded mx-auto mt-4",
                    src: e2.form.image,
                  },
                  null,
                  8,
                  ["src"],
                ))
              : (wl(),
                _l(
                  "button",
                  {
                    key: 1,
                    onClick: e0[3] || (e0[3] = (e$) => e2.addImage()),
                    class: "bg-tor p-2",
                  },
                  "Clique para adicionar",
                )),
            Pl("div", cg, [
              Pl(
                "button",
                {
                  onClick: e0[4] || (e0[4] = (e$) => e2.publish()),
                  class: "bg-tor p-2",
                },
                "Publicar",
              ),
            ]),
          ]),
        ]),
        _: 1,
      },
    )
  );
});
((ng.render = ug), (ng.__scopeId = "data-v-a969c978"));
const dg = {
    components: {
      Page: Bh,
    },
    setup() {
      let e$ = rt([]);
      return (
        So.backend.tor_payments().then((e0) => {
          (e0.forEach((e$) => {
            e$.sending = e$.sender == eb.id;
          }),
            (e$.value = e0));
        }),
        {
          state: eb,
          payments: e$,
        }
      );
    },
  },
  pg = Il(" Deep Web "),
  fg = {
    class: "p-4",
  },
  mg = {
    class: "break-words",
  },
  hg = {
    key: 0,
  },
  bg = {
    key: 1,
  };
dg.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(e6, null, {
      header: en(() => [pg]),
      default: en(() => [
        Pl("ul", fg, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.payments,
              (e0) => (
                wl(),
                _l(
                  "li",
                  {
                    key: e0.id,
                    class: [
                      "flex items-start text-white text-xl mb-4",
                      [e0.sending ? "flex-row-reverse" : ""],
                    ],
                  },
                  [
                    Pl(
                      "img",
                      {
                        class: "w-14 h-14 rounded-full bg-white",
                        src: `https://avatars.dicebear.com/api/identicon/${
                          e0.sending ? e0.target : e0.sender
                        }.svg`,
                        alt: "",
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl(
                      "div",
                      {
                        class: [
                          "rounded flex-1 p-3",
                          [e0.sending ? "bg-tor mr-4" : "bg-gray-800 ml-4"],
                        ],
                      },
                      [
                        Pl("h1", mg, [
                          e0.sending
                            ? (wl(),
                              _l(
                                "span",
                                hg,
                                "Voc\xea enviou " +
                                  g(e$.$filters.intToMoney(e0.amount)) +
                                  " para @" +
                                  g(e0.target),
                                1,
                              ))
                            : (wl(),
                              _l(
                                "span",
                                bg,
                                "Voc\xea recebeu " +
                                  g(e$.$filters.intToMoney(e0.amount)) +
                                  " de @" +
                                  g(e0.sender),
                                1,
                              )),
                        ]),
                      ],
                      2,
                    ),
                  ],
                  2,
                )
              ),
            ),
            128,
          )),
        ]),
      ]),
      _: 1,
    })
  );
};
const gg = {
  profile: Ze(
    So.localhost
      ? {
          id: 1,
          username: "will",
          bio: "aaaaaaaaaaaaaaaaaaa",
          verified: 1,
          avatarURL: "/stock/user.jpg",
        }
      : {},
  ),
  stories: rt([]),
  storiesSeen: {},
  addStory(e$) {
    (this.stories.value.push(e$),
      delete this.storiesSeen[e$.author.username],
      this.sortStory());
  },
  remStory(e$) {
    let e0 = this.stories.value,
      e8 = e0.find((e0) => e0.id == e$);
    e8 &&
      (e0.splice(e0.indexOf(e8), 1),
      delete this.storiesSeen[e8.author.username],
      this.sortStory());
  },
  showProfileMap(e$) {
    go()
      .clearAndRequest(
        Object.entries(e$).map(([e$, e0]) => ({
          key: e$,
          html: `
      <div class="flex items-center">
        <div class="w-16 h-16 bg-instagram rounded-full">
          <img class="w-16 h-16 p-0.5 rounded-full" src="${zs(e0)}">
        </div>
        <span class="ml-5">${zs(e$)}</span>
      </div>`,
        })),
        50,
      )
      .then((e$) => e$ && VO.push("/instagram/profiles/" + e$));
  },
  getStoryMap() {
    let e$ = {};
    for (let e0 of this.stories.value) {
      let e8 = e0.author.username;
      e8 in e$ ? e$[e8].push(e0) : (e$[e8] = [e0]);
    }
    for (let e2 in e$) e$[e2].seen = !!this.storiesSeen[e2];
    return e$;
  },
  markAsSeen(e$) {
    ((this.storiesSeen[e$] = !0), this.sortStory());
  },
  sortStory() {
    this.stories.value.sort((e$, e0) => {
      let e8 = this.storiesSeen[e$.author.username],
        e2 = this.storiesSeen[e0.author.username];
      return e$.author.username == e0.author.username
        ? 0
        : e$.author.username == this.profile.username
          ? -1
          : e0.author.username == this.profile.username
            ? 1
            : e8 != e2
              ? e8
                ? 1
                : -1
              : e$.author.username.localeCompare(e0.author.username);
    });
  },
  async loadStories() {
    ((this.stories.value = await So.backend.ig_getStories()), this.sortStory());
  },
};
(So.pusher.on("REFRESH", () => {
  gg.profile = {};
}),
  So.pusher.on("INSTAGRAM_STORY", (e$) => {
    gg.addStory(e$);
  }),
  So.pusher.on("INSTAGRAM_DELETE_STORY", (e$) => {
    gg.remStory(e$);
  }));
const vg = {
    props: ["back"],
    setup() {
      let e$ = cc(),
        e0 = rt(So.hasNotificationFor("instagram"));
      Tn(e0, (e$) => So.setNotificationFor("instagram", e$));
      let e8 = So.settings.instagramLogo;
      return {
        dark: So.darkTheme,
        notifications: e0,
        logo: e8,
        logout: function () {
          for (let e0 in gg.profile) delete gg.profile[e0];
          (So.backend.ig_logout(), e$.replace("/instagram/login"));
        },
      };
    },
  },
  xg = {
    class:
      "h-32 pt-16 border-b border-theme bg-theme text-theme text-left flex-shrink-0",
  },
  yg = Pl(
    "i",
    {
      class: "far fa-sign-out",
    },
    null,
    -1,
  );
vg.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", xg, [
      Pl(
        "img",
        {
          src: e2.logo,
          class: "h-14 ml-6",
          style: {
            filter: e2.dark ? "invert(1)" : "",
          },
        },
        null,
        12,
        ["src"],
      ),
      Pl(
        "button",
        {
          class: "absolute top-16 right-20",
          onClick: e0[1] || (e0[1] = (e$) => e2.logout()),
        },
        [yg],
      ),
      Pl(
        "button",
        {
          class: "absolute top-16 right-4",
          onClick:
            e0[2] || (e0[2] = (e$) => (e2.notifications = !e2.notifications)),
        },
        [
          Pl(
            "i",
            {
              class: [
                "far",
                e2.notifications ? "fa-bell" : "fa-bell-slash",
                "w-12",
              ],
            },
            null,
            2,
          ),
        ],
      ),
    ])
  );
};
const kg = {
    setup() {
      co();
      let e$ = cc();
      return {
        profile: gg.profile,
        createPost: async function () {
          try {
            let e0 = await So.useAnyImage("/instagram");
            setTimeout(
              () =>
                e$.replace({
                  path: "/instagram/create",
                  query: {
                    url: e0,
                  },
                }),
              200,
            );
          } catch (e8) {}
        },
      };
    },
  },
  wg = Pl(
    "div",
    {
      class: "w-full h-28",
    },
    null,
    -1,
  ),
  Cg = {
    class:
      "absolute bottom-0 w-full h-28 bg-theme text-theme border-t border-theme px-2 grid grid-cols-5",
  },
  _g = Pl(
    "i",
    {
      class: "fal fa-home-alt text-3xl",
    },
    null,
    -1,
  ),
  Ag = {
    key: 0,
    class: "mx-auto w-1 h-1 bg-theme2 rounded-full",
  },
  Sg = Pl(
    "i",
    {
      class: "fal fa-search text-3xl",
    },
    null,
    -1,
  ),
  Tg = {
    key: 0,
    class: "mx-auto w-1 h-1 bg-theme2 rounded-full",
  },
  Eg = Pl(
    "i",
    {
      class: "fal fa-plus-square text-3xl",
    },
    null,
    -1,
  ),
  Rg = {
    key: 0,
    class: "mx-auto w-1 h-1 bg-theme2 rounded-full",
  },
  Pg = Pl(
    "i",
    {
      class: "fal fa-heart text-3xl",
    },
    null,
    -1,
  ),
  Lg = {
    key: 0,
    class: "mx-auto w-1 h-1 bg-theme2 rounded-full",
  };
kg.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  return (
    wl(),
    _l(
      bl,
      null,
      [
        wg,
        Pl("div", Cg, [
          Pl(
            "button",
            {
              onClick:
                e0[1] || (e0[1] = (e0) => e$.$router.replace("/instagram")),
            },
            [
              _g,
              "/instagram" === e$.$route.path
                ? (wl(), _l("div", Ag))
                : Ml("", !0),
            ],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[2] ||
                (e0[2] = (e0) => e$.$router.replace("/instagram/search")),
            },
            [
              Sg,
              "/instagram/search" === e$.$route.path
                ? (wl(), _l("div", Tg))
                : Ml("", !0),
            ],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[3] ||
                (e0[3] = (...e$) => e2.createPost && e2.createPost(...e$)),
            },
            [
              Eg,
              "/instagram/create" === e$.$route.path
                ? (wl(), _l("div", Rg))
                : Ml("", !0),
            ],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[4] ||
                (e0[4] = (e0) =>
                  e$.$router.replace("/instagram/notifications")),
            },
            [
              Pg,
              "/instagram/notifications" === e$.$route.path
                ? (wl(), _l("div", Lg))
                : Ml("", !0),
            ],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[5] ||
                (e0[5] = (e0) =>
                  e$.$router.replace(
                    "/instagram/profiles/" + e2.profile.username,
                  )),
              class: "mx-auto",
            },
            [
              Pl(
                "img",
                {
                  class: "rounded-full h-12 w-12",
                  src: null == (e6 = e2.profile) ? void 0 : e6.avatarURL,
                },
                null,
                8,
                ["src"],
              ),
            ],
          ),
        ]),
      ],
      64,
    )
  );
};
const Ig = {
    components: {
      Header: vg,
      Bottom: kg,
    },
    setup() {
      let e$ = uc(),
        e0 = cc(),
        e8 = rt(!1),
        e2 = rt(e$.query.url),
        e3 = rt("");
      return {
        selfie: e8,
        image: e2,
        content: e3,
        publish: function () {
          So.backend.ig_createPost(e2.value, e3.value, !1).then(() => {
            e0.replace("/instagram");
          });
        },
      };
    },
  },
  Og = {
    class: "bg-theme text-theme h-full p-5",
  },
  Mg = {
    key: 0,
  },
  Vg = {
    class: "mt-3",
  },
  Dg = Pl("label", null, "Status", -1),
  Ng = {
    class: "mt-3",
  };
Ig.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-input"),
    e7 = dl("Bottom");
  return (
    wl(),
    _l(
      bl,
      null,
      [
        Pl(e6),
        Pl("div", Og, [
          e2.image
            ? (wl(),
              _l("div", Mg, [
                Pl(
                  "img",
                  {
                    class: "max-h-96 rounded-xl mx-auto",
                    src: e2.image,
                  },
                  null,
                  8,
                  ["src"],
                ),
                Pl("div", Vg, [
                  Dg,
                  Pl(
                    e4,
                    {
                      class: "bg-theme border-theme",
                      placeholder: "Como voc\xea est\xe1 se sentindo?",
                      modelValue: e2.content,
                      "onUpdate:modelValue":
                        e0[1] || (e0[1] = (e$) => (e2.content = e$)),
                      maxlength: "240",
                    },
                    null,
                    8,
                    ["modelValue"],
                  ),
                ]),
                Pl("div", Ng, [
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[2] ||
                        (e0[2] = (...e$) => e2.publish && e2.publish(...e$)),
                      class:
                        "mt-5 bg-blue-500 p-3 text-white w-full rounded-xl",
                    },
                    " Publicar ",
                  ),
                ]),
              ]))
            : Ml("", !0),
        ]),
        Pl(e7),
      ],
      64,
    )
  );
};
const Ug = {
    props: ["post"],
    setup(e$) {
      let e0 = e$.post,
        e8 = rt(""),
        { profile: e2 } = gg,
        e3 = uc(),
        e1 = cc(),
        e6 = jl("useImageFocus"),
        e4 = e3.path.endsWith("/posts/" + e0.id),
        e7 = da(() =>
          gg.stories.value.some(
            (e$) => e$.author.username == e0.author.username,
          ),
        );

      function e5() {
        e5.lastLike > Date.now() ||
          ((e5.lastLike = Date.now() + 667),
          So.backend.ig_setLike(e0.id, !e0.likes.includes(e2.id)));
      }
      return (
        (e5.lastLike = 0),
        e4
          ? (Tn(e0.comments, () =>
              Lt(() => {
                let e$ = document.querySelector("ul[comments]");
                e8.value || e$.scrollTo(0, 9e6);
              }),
            ),
            So.onceRoute(
              "INSTAGRAM_LIKE",
              ({ post_id: e$, profile_id: e8, toggle: e2 }) => {
                e$ == e0.id &&
                  (e2
                    ? e0.likes.push(e8)
                    : (e0.likes = e0.likes.filter((e$) => e$ != e8)));
              },
            ),
            So.onceRoute("INSTAGRAM_REPLY", (e$) => {
              e0.id == e$.post_id && e0.comments.push(e$);
            }))
          : (So.onceRoute(
              "INSTAGRAM_LIKE",
              ({ post_id: e$, profile_id: e8, toggle: e2 }) => {
                e$ == e0.id &&
                  (e2
                    ? e0.likes.push(e8)
                    : (e0.likes = e0.likes.filter((e$) => e$ != e8)));
              },
            ),
            So.onceRoute("INSTAGRAM_REPLY", ({ post_id: e$ }) => {
              e$ == e0.id && (e0.comments += 1);
            })),
        {
          profile: e2,
          hasStory: e7,
          comment: e8,
          reply: function () {
            var e$;
            (null == (e$ = e8.value) ? void 0 : e$.trim()) &&
              (So.backend.ig_reply(e0.id, e8.value), (e8.value = ""));
          },
          like: e5,
          showOptions: async function () {
            let e$ = {};
            ((e0.profile_id == e2.id || So.identity.moderator) &&
              (e$.delete = "Excluir publica\xe7\xe3o"),
              e0.profile_id != e2.id &&
                (!So.localhost &&
                (await So.backend.ig_isFollowing(e0.profile_id))
                  ? (e$.unfollow = "Deixar de seguir")
                  : (e$.follow = "Seguir")),
              e0.likes.includes(e2.id)
                ? (e$.dislike = "Descurtir")
                : (e$.like = "Curtir"),
              (e$.likes = "Ver curtidas"),
              go()
                .request(e$, 33)
                .then((e$) => {
                  switch (e$) {
                    case "delete":
                      So.backend.ig_deletePost(e0.id);
                      break;
                    case "likes":
                      So.backend
                        .ig_getLikes(e0.id)
                        .then((e$) => gg.showProfileMap(e$));
                      break;
                    case "like":
                      So.backend.ig_setLike(e0.id, !0);
                      break;
                    case "dislike":
                      So.backend.ig_setLike(e0.id, !1);
                      break;
                    case "follow":
                      So.backend.ig_setFollow(e0.profile_id, !0);
                      break;
                    case "unfollow":
                      So.backend.ig_setFollow(e0.profile_id, !1);
                  }
                }));
          },
          handleImageClick: function () {
            e4 ? e6(e0.image) : e1.push("/instagram/posts/" + e0.id);
          },
        }
      );
    },
  },
  $g = sn("data-v-1e9271c0");
ln("data-v-1e9271c0");
const jg = {
    class: "flex flex-col border-b border-theme flex-1",
  },
  Fg = {
    class: "flex items-center p-3",
  },
  zg = Pl(
    "i",
    {
      class: "far fa-ellipsis-v",
    },
    null,
    -1,
  ),
  Bg = {
    class: "p-3 flex items-center",
  },
  Hg = {
    key: 0,
    class: "far fa-heart",
  },
  qg = {
    key: 1,
    class: "fas fa-heart text-red-500",
  },
  Gg = Pl(
    "i",
    {
      class: "far fa-comment",
      style: {
        transform: "rotateY(180deg)",
      },
    },
    null,
    -1,
  ),
  Wg = {
    key: 0,
    class: "ml-3",
  },
  Kg = {
    key: 1,
    class: "ml-3",
  },
  Jg = {
    class: "text-gray-500 text-xl ml-auto",
  },
  Xg = {
    key: 0,
    style: {
      flex: "1 0 0",
    },
    comments: "",
    class: "overflow-y-auto hide-scroll border-t border-theme p-3",
  },
  Yg = {
    key: 0,
    class: "mb-3",
  },
  Zg = {
    class: "mr-3",
  },
  Qg = {
    class: "font-light text-3xl break-words",
  },
  ev = {
    class: "mr-3",
  },
  tv = {
    class: "font-light text-3xl break-words",
  },
  nv = {
    key: 1,
    style: {
      flex: "1 0 0",
    },
    class: "p-3",
  },
  lv = {
    class: "mr-3",
  },
  av = {
    class: "text-3xl break-words",
  },
  sv = {
    key: 2,
    class: "border-t border-theme flex px-4 p-5 mb-3 flex-shrink-0",
  };
an();
const ov = $g((e$, e0, e8, e2, e3, e1) => {
  var e6, e4;
  let e7 = dl("app-verified");
  return (
    wl(),
    _l("div", jg, [
      Pl("div", Fg, [
        Pl(
          "div",
          {
            class: [
              "h-20 w-20 rounded-full",
              {
                "bg-instagram": e2.hasStory,
              },
            ],
          },
          [
            Pl(
              "img",
              {
                class: "h-20 w-20 rounded-full p-0.5",
                src: e8.post.author.avatarURL,
                alt: "",
              },
              null,
              8,
              ["src"],
            ),
          ],
          2,
        ),
        Pl(
          "h3",
          {
            class: "ml-5",
            onClick:
              e0[1] ||
              (e0[1] = (e0) =>
                e$.$router.replace(
                  "/instagram/profiles/" + e8.post.author.username,
                )),
          },
          g(null != (e6 = e8.post.author.name) ? e6 : e8.post.author.username),
          1,
        ),
        (null == (e4 = e8.post.author) ? void 0 : e4.verified)
          ? (wl(),
            _l(e7, {
              key: 0,
              class: "ml-3 w-8 h-8",
            }))
          : Ml("", !0),
        Pl(
          "button",
          {
            class: "ml-auto text-theme px-6 py-3",
            onClick: e0[2] || (e0[2] = (e$) => e2.showOptions()),
          },
          [zg],
        ),
      ]),
      Pl(
        "img",
        {
          style: {
            "max-height": "32rem",
          },
          class: "block w-auto mx-auto",
          onClick:
            e0[3] ||
            (e0[3] = (...e$) =>
              e2.handleImageClick && e2.handleImageClick(...e$)),
          loading: "lazy",
          src: e8.post.image,
          alt: "",
        },
        null,
        8,
        ["src"],
      ),
      Pl("div", Bg, [
        Pl(
          "button",
          {
            onClick: e0[4] || (e0[4] = (e$) => e2.like(e8.post.id)),
          },
          [
            e8.post.likes.includes(e2.profile.id)
              ? (wl(), _l("i", qg))
              : (wl(), _l("i", Hg)),
            Il(" " + g(e8.post.likes.length.toLocaleString("pt-BR")), 1),
          ],
        ),
        Pl(
          "button",
          {
            class: "ml-5",
            onClick:
              e0[5] ||
              (e0[5] = (e0) =>
                e$.$router.push("/instagram/posts/" + e8.post.id)),
          },
          [
            Gg,
            Array.isArray(e8.post.comments)
              ? (wl(),
                _l(
                  "span",
                  Wg,
                  g(e8.post.comments.length.toLocaleString("pt-BR")),
                  1,
                ))
              : (wl(),
                _l("span", Kg, g(e8.post.comments.toLocaleString("pt-BR")), 1)),
          ],
        ),
        Pl("span", Jg, g(e$.$filters.unixToDayOfMonth(e8.post.created_at)), 1),
      ]),
      Array.isArray(e8.post.comments)
        ? (wl(),
          _l("ul", Xg, [
            e8.post.content
              ? (wl(),
                _l("li", Yg, [
                  Pl("b", Zg, g(e8.post.author.username), 1),
                  Pl("span", Qg, g(e8.post.content), 1),
                ]))
              : Ml("", !0),
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e8.post.comments,
                (e$, e0) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e0,
                    },
                    [
                      Pl("b", ev, g(e$.author.username), 1),
                      Pl("span", tv, g(e$.content), 1),
                    ],
                  )
                ),
              ),
              128,
            )),
          ]))
        : e8.post.content
          ? (wl(),
            _l("div", nv, [
              Pl("b", lv, g(e8.post.author.username), 1),
              Pl("span", av, g(e8.post.content), 1),
            ]))
          : Ml("", !0),
      Array.isArray(e8.post.comments)
        ? (wl(),
          _l("div", sv, [
            Zn(
              Pl(
                "input",
                {
                  type: "text",
                  maxlength: "255",
                  class: "w-full bg-theme pr-5",
                  "onUpdate:modelValue":
                    e0[6] || (e0[6] = (e$) => (e2.comment = e$)),
                  onKeydown:
                    e0[7] ||
                    (e0[7] = us(
                      (...e$) => e2.reply && e2.reply(...e$),
                      ["enter"],
                    )),
                  placeholder: "Adicione um coment\xe1rio",
                },
                null,
                544,
              ),
              [[ns, e2.comment]],
            ),
            Pl(
              "button",
              {
                class: [e2.comment ? "text-blue-500" : "text-blue-200"],
                onClick:
                  e0[8] || (e0[8] = (...e$) => e2.reply && e2.reply(...e$)),
              },
              "Post",
              2,
            ),
          ]))
        : Ml("", !0),
    ])
  );
});
((Ug.render = ov), (Ug.__scopeId = "data-v-1e9271c0"));
const rv = {
    setup() {
      let e$ = cc(),
        e0 = uc(),
        e8 = rt(0),
        e2 = rt(e0.params.id),
        e3 = da(() =>
          gg.stories.value.filter((e$) => e$.author.username == e2.value),
        ),
        e1 = da(() => e3.value[e8.value]),
        e6 = gg.stories.value.map((e$) => e$.author.username).filter(qs),
        e4 = da(
          () => e2.value === gg.profile.username || So.identity.moderator,
        );

      function e7(e$) {
        ((e8.value = 0), (e2.value = e$), e3.effect());
      }

      function e5() {
        let e0 = e6.indexOf(e2.value) + 1;
        (gg.markAsSeen(e2.value), e0 < e6.length ? e7(e6[e0]) : e$.back());
      }
      return (
        Tn(e2, (e0) => e$.replace("/instagram/stories/" + e0)),
        {
          index: e8,
          stories: e3,
          current: e1,
          next: function (e$ = 1) {
            if (e$ < 0)
              return (function () {
                if (0 == e8.value) {
                  let e$ = e6.indexOf(e2.value) - 1;
                  -1 != e$ && e7(e6[e$]);
                } else e8.value -= 1;
              })();
            e8.value + 1 >= e3.value.length ? e5() : (e8.value += 1);
          },
          destroy: async function () {
            var e$;
            let e0 = e8.value,
              e2 = e3.value.length,
              e1 = null == (e$ = e3.value) ? void 0 : e$[e0];
            e1 &&
              So.backend.ig_deleteStory(e1.id).then(() => {
                (1 == e2 || e0 >= e2 - 1) && e5();
              });
          },
          canDestroy: e4,
        }
      );
    },
  },
  iv = sn("data-v-5e4237d2");
ln("data-v-5e4237d2");
const cv = {
    class: "absolute inset-0 pt-16 h-32 w-full bg-theme z-1 text-center",
  },
  uv = Pl(
    "i",
    {
      class: "fas fa-chevron-left text-blue-400",
    },
    null,
    -1,
  ),
  dv = {
    class: "text-theme",
  },
  pv = Pl(
    "i",
    {
      class: "far fa-trash-alt text-red-500",
    },
    null,
    -1,
  ),
  fv = {
    key: 2,
    class:
      "absolute break-words bottom-48 p-2 left-2 right-2 rounded-2xl text-center text-white bg-black bg-opacity-50",
  },
  mv = {
    class: "absolute bottom-8 w-full flex justify-center",
  },
  hv = {
    key: 0,
    class: "w-4 h-4 rounded-full bg-gray-200",
  },
  bv = {
    key: 1,
    class: "w-4 h-4 rounded-full border bg-gray-600",
  };
an();
const gv = iv((e$, e0, e8, e2, e3, e1) => {
  var e6, e4, e7;
  let e5 = dl("app-verified");
  return (
    wl(),
    _l(
      "div",
      {
        class: "bg-theme p-2 h-full flex flex-col justify-center",
        key: e$.$route.params.id,
      },
      [
        Pl("div", cv, [
          Pl(
            "button",
            {
              onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
              class: "absolute top-16 left-0 px-5",
            },
            [uv],
          ),
          Pl("span", dv, [
            Il(g(e$.$route.params.id.substr(0, 16)) + " ", 1),
            (null == (e6 = e2.stories[e2.index]) ? void 0 : e6.author.verified)
              ? (wl(),
                _l(e5, {
                  key: 0,
                  class: "inline w-8 h-8",
                }))
              : Ml("", !0),
          ]),
          e2.canDestroy
            ? (wl(),
              _l(
                "button",
                {
                  key: 0,
                  onClick:
                    e0[2] ||
                    (e0[2] = (...e$) => e2.destroy && e2.destroy(...e$)),
                  class: "absolute top-16 right-0 px-5",
                },
                [pv],
              ))
            : Ml("", !0),
        ]),
        Pl(
          "div",
          {
            class: "absolute top-32 -left-2 -right-2 -bottom-2",
            style: {
              background: "black",
              backgroundImage: "url(" + e2.current.image + ")",
              backgroundSize: "100% 100%",
              filter: "blur(5px)",
            },
          },
          null,
          4,
        ),
        e2.current.video
          ? (wl(),
            _l(
              "video",
              {
                key: 0,
                onEnded: e0[3] || (e0[3] = (e$) => e2.next()),
                src: e2.current.video,
                class: "absolute left-0 right-0 w-full",
                autoplay: "",
                controls: "",
              },
              null,
              40,
              ["src"],
            ))
          : (wl(),
            _l(
              "img",
              {
                key: 1,
                class: "absolute left-0 right-0 w-full",
                src: e2.current.image,
              },
              null,
              8,
              ["src"],
            )),
        Pl("button", {
          class: "absolute left-0 h-1/3 w-5/12",
          onClick: e0[4] || (e0[4] = (e$) => e2.next(-1)),
        }),
        Pl("button", {
          class: "absolute right-0 h-1/3 w-5/12",
          onClick: e0[5] || (e0[5] = (e$) => e2.next()),
        }),
        (null == (e4 = e2.stories[e2.index]) ? void 0 : e4.content)
          ? (wl(),
            _l(
              "h1",
              fv,
              g(null == (e7 = e2.stories[e2.index]) ? void 0 : e7.content),
              1,
            ))
          : Ml("", !0),
        Pl("div", mv, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.stories,
              (e$, e0) => (
                wl(),
                _l(
                  "div",
                  {
                    key: e0,
                    class: "mr-2 last:mr-0",
                  },
                  [
                    e0 == e2.index
                      ? (wl(), _l("div", hv))
                      : (wl(), _l("div", bv)),
                  ],
                )
              ),
            ),
            128,
          )),
        ]),
      ],
    )
  );
});
((rv.render = gv), (rv.__scopeId = "data-v-5e4237d2"));
const vv = {
    components: {
      Header: vg,
      NavBar: kg,
      AddPost: Ig,
      Post: Ug,
      Story: rv,
    },
    setup() {
      jl("setDark")();
      let e$ = jl("prompt"),
        e0 = jl("videoCamera"),
        e8 = Ze([]),
        { profile: e2 } = gg,
        e3 = co(),
        e1 = da(() => gg.getStoryMap()),
        e6 = rt(So.hasNotificationFor("instagram"));
      return (
        Tn(e6, (e$) => So.setNotificationFor("instagram", e$)),
        So.backend.ig_getTimeline().then((e$) => {
          ((e8.length = 0), Object.assign(e8, e$));
        }),
        So.onceRoute("INSTAGRAM_POST", (e$) => {
          e8.unshift(e$) > 100 && (e8.length = 100);
        }),
        So.onceRoute("INSTAGRAM_DESTROY", (e$) => {
          let e0 = e8.findIndex((e0) => e0.id == e$);
          -1 != e0 && e8.splice(e0, 1);
        }),
        So.localhost &&
          e8.push({
            id: 1,
            author: {
              username: "will",
              verified: 1,
            },
            content: "Hello world",
            image: "",
            likes: [],
            comments: 0,
            created_at: Date.now() / 1e3,
          }),
        So.pusher.removeAllListeners("INSTAGRAM_LIKE"),
        So.pusher.removeAllListeners("INSTAGRAM_REPLY"),
        {
          dark: So.storage.darkTheme,
          notifications: e6,
          profile: e2,
          stories: e1,
          posts: e8,
          createStory: async function () {
            try {
              let e8 = await go().request(
                  [
                    ["V\xeddeo", "self-center"],
                    ["C\xe2mera", "self-center"],
                    ["Galeria", "self-center"],
                    So.settings.allowUnsafeURL && ["Imagem", "self-center"],
                  ],
                  25,
                  !0,
                ),
                e2,
                e1 = "";
              0 == e8
                ? (([e2, thumbnail] = await e0()),
                  (e1 = await to.upload(thumbnail, "jpg")))
                : (e1 =
                    1 == e8
                      ? await e3.request(!1, "/instagram")
                      : 2 == e8
                        ? await fo()
                        : await So.promptImageURL());
              let e6 = await e$("Status");
              So.backend.ig_createStory(e1, e6, e2);
            } catch (e4) {}
          },
        }
      );
    },
  },
  xv = {
    class: "flex flex-col h-full",
  },
  yv = {
    class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme",
  },
  kv = {
    class:
      "h-44 px-2 flex items-center border-b border-theme shadow overflow-x-auto fancy-scroll",
  },
  wv = {
    key: 0,
    class: "flex-shrink-0",
  },
  Cv = {
    class: "flex flex-center rounded-full relative",
  },
  _v = Pl(
    "i",
    {
      class: "fas fa-plus text-base text-white",
    },
    null,
    -1,
  ),
  Av = Pl(
    "h1",
    {
      class: "text-lg text-center",
    },
    "Seu story",
    -1,
  ),
  Sv = Pl(
    "i",
    {
      class: "fas fa-plus text-base text-white",
    },
    null,
    -1,
  ),
  Tv = {
    class: "w-28 overflow-x-hidden text-lg text-center",
  };
vv.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Post"),
    e7 = dl("NavBar");
  return (
    wl(),
    _l("div", xv, [
      Pl(e6),
      Pl("div", yv, [
        Pl("ul", kv, [
          e2.stories[e2.profile.username]
            ? Ml("", !0)
            : (wl(),
              _l("li", wv, [
                Pl("div", Cv, [
                  Pl(
                    "img",
                    {
                      class: "w-28 h-28 p-1 rounded-full",
                      src: e2.profile.avatarURL,
                    },
                    null,
                    8,
                    ["src"],
                  ),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[1] ||
                        (e0[1] = is(
                          (...e$) => e2.createStory && e2.createStory(...e$),
                          ["stop"],
                        )),
                      class: [
                        e2.dark ? "border-black" : "border-white",
                        "absolute bottom-1 right-1 border-2 bg-lightBlue-600 w-8 h-8 rounded-full text-white flex flex-center",
                      ],
                    },
                    [_v],
                    2,
                  ),
                ]),
                Av,
              ])),
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.stories,
              (e8, e3) => (
                wl(),
                _l(
                  "li",
                  {
                    class: "ml-1 last:pr-1 flex-shrink-0",
                    key: e3,
                  },
                  [
                    Pl(
                      "div",
                      {
                        class: [
                          "w-28 flex flex-center rounded-full relative",
                          {
                            "bg-instagram":
                              !e8.seen || e2.profile.username == e3,
                          },
                        ],
                        onClick: (e0) =>
                          e$.$router.push("/instagram/stories/" + e3),
                      },
                      [
                        Pl(
                          "img",
                          {
                            class: "w-28 h-28 p-1 rounded-full",
                            src: e8[0].image,
                          },
                          null,
                          8,
                          ["src"],
                        ),
                        e2.profile.username == e3
                          ? (wl(),
                            _l(
                              "button",
                              {
                                key: 0,
                                class: [
                                  e2.dark ? "border-black" : "border-white",
                                  "absolute bottom-1 right-1 border-2 bg-lightBlue-600 w-8 h-8 rounded-full text-white flex flex-center",
                                ],
                                onClick:
                                  e0[2] ||
                                  (e0[2] = is(
                                    (...e$) =>
                                      e2.createStory && e2.createStory(...e$),
                                    ["stop"],
                                  )),
                              },
                              [Sv],
                              2,
                            ))
                          : Ml("", !0),
                      ],
                      10,
                      ["onClick"],
                    ),
                    Pl(
                      "h1",
                      Tv,
                      g(e2.profile.username == e3 ? "Seu story" : e3),
                      1,
                    ),
                  ],
                )
              ),
            ),
            128,
          )),
        ]),
        Pl("ul", null, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.posts,
              (e$) => (
                wl(),
                _l(
                  "li",
                  {
                    postid: e$.id,
                    key: e$.id,
                  },
                  [
                    Pl(
                      e4,
                      {
                        post: e$,
                      },
                      null,
                      8,
                      ["post"],
                    ),
                  ],
                  8,
                  ["postid"],
                )
              ),
            ),
            128,
          )),
        ]),
      ]),
      Pl(e7),
    ])
  );
};
const Ev = {
    setup() {
      jl("setDark")();
      let e$ = rt(!0),
        e0 = rt(1),
        e8 = rt([]),
        e2 = So.settings.instagramLogo;
      return (
        So.backend.ig_accounts().then(async (e2) => {
          ((e8.value = e2),
            (e0.value = await So.backend.ig_max_accounts()),
            (e$.value = !1));
        }),
        gg.profile.id && VO.replace("/instagram"),
        {
          dark: So.storage.darkTheme,
          logo: e2,
          max: e0,
          accounts: e8,
          login: async function (e$) {
            let e0 = await So.backend.ig_login(e$);
            e0 &&
              (Object.assign(gg.profile, e0),
              gg.loadStories(),
              VO.replace("/instagram"));
          },
          isLoading: e$,
        }
      );
    },
  },
  Rv = {
    key: 0,
    class: "h-full bg-theme",
  },
  Pv = {
    key: 1,
    class: "flex flex-col h-full bg-theme text-theme p-5 pt-24",
  },
  Lv = {
    class: "mb-8",
  },
  Iv = {
    class: "w-3/4 mx-auto",
  },
  Ov = {
    class: "ml-2 flex flex-col",
  },
  Mv = {
    class: "text-2xl",
  },
  Vv = {
    class: "text-xl",
  };
Ev.render = function (e$, e0, e8, e2, e3, e1) {
  return e2.isLoading
    ? (wl(), _l("div", Rv))
    : (wl(),
      _l("div", Pv, [
        Pl("div", Lv, [
          Pl(
            "img",
            {
              class: "h-16 mx-auto",
              src: e2.logo,
              style: {
                filter: "invert(" + (e2.dark ? 1 : 0) + ")",
              },
            },
            null,
            12,
            ["src"],
          ),
        ]),
        Pl("ul", Iv, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(e2.accounts, (e$) => {
              var e0;
              return (
                wl(),
                _l(
                  "li",
                  {
                    class: "flex items-center mb-5",
                    key: e$.id,
                  },
                  [
                    Pl(
                      "img",
                      {
                        class: "w-24 h-24 rounded-lg",
                        src: e$.avatarURL,
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl("div", Ov, [
                      Pl(
                        "h1",
                        Mv,
                        g(null != (e0 = e$.name) ? e0 : e$.username),
                        1,
                      ),
                      Pl("h3", Vv, "@" + g(e$.username), 1),
                    ]),
                    Pl(
                      "button",
                      {
                        onClick: (e0) => e2.login(e$.id),
                        class:
                          "ml-auto bg-blue-500 rounded-xl text-white text-lg p-2 px-4",
                      },
                      "Login",
                      8,
                      ["onClick"],
                    ),
                  ],
                )
              );
            }),
            128,
          )),
        ]),
        e2.max > e2.accounts.length
          ? (wl(),
            _l(
              "div",
              {
                key: 0,
                class: [
                  "text-center",
                  {
                    "my-auto": !e2.accounts.length,
                  },
                ],
              },
              [
                Pl(
                  "button",
                  {
                    onClick:
                      e0[1] ||
                      (e0[1] = (e0) =>
                        e$.$router.replace("/instagram/register")),
                    class:
                      "w-2/3 text-center bg-blue-500 rounded-xl text-white text-2xl p-2",
                  },
                  "Criar uma conta",
                ),
              ],
              2,
            ))
          : Ml("", !0),
      ]));
};
const Dv = rt(""),
  Nv = rt(""),
  Uv = rt(""),
  $v = rt(""),
  jv = {
    setup() {
      jl("setDark")();
      let e$ = jl("alert"),
        e0 = So.settings.instagramLogo;
      return {
        dark: So.storage.darkTheme,
        avatarURL: Dv,
        name: Nv,
        username: Uv,
        bio: $v,
        takeSelfie: async function () {
          try {
            let e$ = await So.useAnyImage("/instagram", !0);
            Dv.value = e$;
          } catch (e0) {}
        },
        createAccount: function () {
          var e0;
          if (
            ["register", "search", "create", "liked", "stories"].includes(
              null == (e0 = Uv.value) ? void 0 : e0.toLowerCase(),
            )
          )
            return e$("Este nome n\xe3o pode ser utilizado");
          Dv.value
            ? So.backend
                .ig_register(Nv.value, Uv.value, $v.value, Dv.value)
                .then((e0) => {
                  if (e0.error) e$(e0.error);
                  else
                    for (let e8 of (VO.replace("/instagram/login"),
                    [Dv, Nv, Uv, $v]))
                      e8.value = "";
                })
            : e$("A selfie \xe9 obrigat\xf3ria!");
        },
        logo: e0,
      };
    },
  },
  Fv = {
    class: "flex flex-col h-full bg-theme text-theme p-5 pt-24",
  },
  zv = {
    class: "mb-8",
  },
  Bv = {
    class: "w-64 h-64 bg-instagram mx-auto rounded-full",
  },
  Hv = Pl(
    "span",
    {
      class: "text-center text-gray-500 text-xl mt-2",
    },
    "Clique na imagem para alterar",
    -1,
  ),
  qv = {
    key: 0,
  },
  Gv = {
    class: "mt-3",
  },
  Wv = Pl("label", null, "Nome", -1),
  Kv = {
    class: "mt-3",
  },
  Jv = Pl("label", null, "Usu\xe1rio", -1),
  Xv = {
    class: "mt-3",
  },
  Yv = Pl("label", null, "Biografia", -1),
  Zv = {
    class: "mt-3",
  };
jv.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("app-input");
  return (
    wl(),
    _l("div", Fv, [
      Pl("div", zv, [
        Pl(
          "img",
          {
            class: "h-16 mx-auto",
            src: e2.logo,
            style: {
              filter: "invert(" + (e2.dark ? 1 : 0) + ")",
            },
          },
          null,
          12,
          ["src"],
        ),
      ]),
      Pl("div", Bv, [
        Pl(
          "img",
          {
            onClick:
              e0[1] ||
              (e0[1] = (...e$) => e2.takeSelfie && e2.takeSelfie(...e$)),
            class: "rounded-full w-64 h-64 p-1",
            src: e2.avatarURL || e$.$asset("/stock/user.jpg"),
          },
          null,
          8,
          ["src"],
        ),
      ]),
      Hv,
      e2.avatarURL
        ? (wl(),
          _l("div", qv, [
            Pl("div", Gv, [
              Wv,
              Pl(
                e6,
                {
                  maxlength: "32",
                  modelValue: e2.name,
                  "onUpdate:modelValue":
                    e0[2] || (e0[2] = (e$) => (e2.name = e$)),
                  class: "text-3xl bg-theme border-theme",
                },
                null,
                8,
                ["modelValue"],
              ),
            ]),
            Pl("div", Kv, [
              Jv,
              Pl(
                e6,
                {
                  maxlength: "24",
                  modelValue: e2.username,
                  "onUpdate:modelValue":
                    e0[3] || (e0[3] = (e$) => (e2.username = e$)),
                  class: "text-3xl bg-theme border-theme",
                },
                null,
                8,
                ["modelValue"],
              ),
            ]),
            Pl("div", Xv, [
              Yv,
              Pl(
                e6,
                {
                  maxlength: "255",
                  modelValue: e2.bio,
                  "onUpdate:modelValue":
                    e0[4] || (e0[4] = (e$) => (e2.bio = e$)),
                  class: "text-3xl bg-theme border-theme",
                },
                null,
                8,
                ["modelValue"],
              ),
            ]),
            Pl("div", Zv, [
              Pl(
                "button",
                {
                  onClick:
                    e0[5] ||
                    (e0[5] = (...e$) =>
                      e2.createAccount && e2.createAccount(...e$)),
                  class:
                    "w-full text-center bg-blue-500 rounded-xl text-white p-3",
                },
                "Cadastre-se",
              ),
            ]),
          ]))
        : Ml("", !0),
    ])
  );
};
const Qv = {
    components: {
      Header: vg,
      NavBar: kg,
    },
    setup() {
      let e$ = rt(""),
        e0 = rt([]),
        e8 = null;

      function e2() {
        So.backend.ig_search(e$.value).then((e$) => {
          e0.value = e$.length && e$;
        });
      }
      return (
        Tn(e$, (e$) => {
          if (!e$) return (e0.value = []);
          (clearTimeout(e8), (e8 = setTimeout(e2, 500)));
        }),
        {
          query: e$,
          profiles: e0,
        }
      );
    },
  },
  ex = {
    class: "h-full flex flex-col bg-theme text-theme",
  },
  tx = {
    class: "p-3",
  },
  nx = {
    class: "relative",
  },
  lx = Pl(
    "i",
    {
      class: "fal fa-search absolute inset-y-5 left-4 text-gray-400 text-lg",
    },
    null,
    -1,
  ),
  ax = {
    key: 0,
    class: "p-3",
  },
  sx = {
    key: 1,
    class: "flex-1 overflow-y-auto hide-scroll p-3",
  },
  ox = {
    class: "bg-instagram w-24 h-24 rounded-full mr-3",
  };
Qv.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-input"),
    e7 = dl("app-verified"),
    e5 = dl("nav-bar");
  return (
    wl(),
    _l("div", ex, [
      Pl(e6),
      Pl("div", tx, [
        Pl("div", nx, [
          lx,
          Pl(
            e4,
            {
              class: "bg-theme text-2xl border-theme pl-12",
              modelValue: e2.query,
              "onUpdate:modelValue": e0[1] || (e0[1] = (e$) => (e2.query = e$)),
              placeholder: "Nome de usu\xe1rio",
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
      ]),
      e2.query && !e2.profiles
        ? (wl(), _l("h1", ax, "Nenhum resultado encontrado"))
        : (wl(),
          _l("ul", sx, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.profiles,
                (e0) => (
                  wl(),
                  _l(
                    "li",
                    {
                      key: e0.id,
                      onClick: (e8) =>
                        e$.$router.push("/instagram/profiles/" + e0.username),
                      class: "flex items-center mb-2 last:mb-0",
                    },
                    [
                      Pl("div", ox, [
                        Pl(
                          "img",
                          {
                            src: e0.avatarURL,
                            class: "p-0.5 w-24 h-24 rounded-full",
                          },
                          null,
                          8,
                          ["src"],
                        ),
                      ]),
                      Pl("span", null, g(e0.username), 1),
                      e0.verified
                        ? (wl(),
                          _l(e7, {
                            key: 0,
                            class: "w-8 h-8 ml-3 mt-2",
                          }))
                        : Ml("", !0),
                    ],
                    8,
                    ["onClick"],
                  )
                ),
              ),
              128,
            )),
          ])),
      Pl(e5),
    ])
  );
};
const rx = {
    components: {
      Header: vg,
      NavBar: kg,
    },
    setup() {
      jl("setDark")();
      let e$ = rt(!1),
        e0 = rt([]);
      return (
        So.backend
          .ig_notifications()
          .then((e8) => {
            ((e0.value = e8), (e$.value = !1));
          })
          .then(() => So.backend.ig_saw_notifications()),
        {
          loading: e$,
          notifications: e0,
        }
      );
    },
  },
  ix = {
    class: "flex flex-col bg-theme text-theme h-full",
  },
  cx = {
    key: 0,
    class: "h-full flex flex-col flex-center",
  },
  ux = {
    key: 1,
    class: "p-5 text-center",
  },
  dx = {
    key: 2,
    class: "overflow-y-auto hide-scroll flex-1 p-5",
  },
  px = {
    class: "ml-4 mt-2 text-3xl",
  },
  fx = {
    class: "text-gray-500",
  };
rx.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-loading"),
    e7 = dl("nav-bar");
  return (
    wl(),
    _l("div", ix, [
      Pl(e6),
      e2.loading
        ? (wl(),
          _l("div", cx, [
            Pl(e4, {
              style: {
                filter: "invert(1)",
              },
            }),
          ]))
        : e2.notifications.length
          ? (wl(),
            _l("ul", dx, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(e2.notifications, (e0) => {
                  var e8;
                  return (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e0.id,
                        class: "flex items-start mb-5",
                      },
                      [
                        Pl(
                          "img",
                          {
                            class: "w-24 h-24 rounded-full",
                            src:
                              null != (e8 = e0.avatarURL)
                                ? e8
                                : e$.$asset("/stock/user.svg"),
                          },
                          null,
                          8,
                          ["src"],
                        ),
                        Pl("p", px, [
                          Il(g(e0.content) + " ", 1),
                          Pl(
                            "span",
                            fx,
                            g(e$.$filters.unixToRelative(e0.created_at)),
                            1,
                          ),
                        ]),
                      ],
                    )
                  );
                }),
                128,
              )),
            ]))
          : (wl(), _l("h1", ux, "Nenhuma notifica\xe7\xe3o")),
      Pl(e7),
    ])
  );
};
const mx = {
    components: {
      Header: vg,
      Bottom: kg,
    },
    setup() {
      jl("setDark")();
      let e$ = jl("alert"),
        e0 = Ze({}),
        e8 = Ze({});
      (Object.assign(e8, gg.profile), Object.assign(e0, gg.profile));
      let e2 = da(() => {
        for (let e$ of ["name", "username", "bio"])
          if (e0[e$] != e8[e$]) return !0;
        return !1;
      });
      return {
        profile: e8,
        changeAvatar: async function () {
          try {
            let e$ = await So.useAnyImage("/instagram", !0);
            ((e0.avatarURL = e8.avatarURL = e$),
              (gg.profile.avatarURL = e$),
              So.backend.ig_changeAvatar(e$));
          } catch (e2) {}
        },
        hasChanges: e2,
        save: function () {
          So.backend
            .ig_updateProfile({
              name: e8.name,
              username: e8.username,
              bio: e8.bio,
            })
            .then((e2) => {
              if (null == e2 ? void 0 : e2.error) e$(e2.error);
              else {
                for (let e3 of gg.stories.value)
                  e3.author.username == e0.username &&
                    (e3.author.username = e8.username);
                (gg.sortStory(),
                  Object.assign(e0, e8),
                  Object.assign(gg.profile, e8));
              }
            });
        },
      };
    },
  },
  hx = {
    class: "h-full bg-theme text-theme",
  },
  bx = {
    class: "mt-16 text-center",
  },
  gx = {
    class: "mt-8 mx-4",
  },
  vx = Pl(
    "label",
    {
      class: "text-gray-400 font-semibold text-2xl",
    },
    "Nome",
    -1,
  ),
  xx = {
    class: "mt-6 mx-4",
  },
  yx = Pl(
    "label",
    {
      class: "text-gray-400 font-semibold text-2xl",
    },
    "Usu\xe1rio",
    -1,
  ),
  kx = {
    class: "mt-6 mx-4",
  },
  wx = Pl(
    "label",
    {
      class: "text-gray-400 font-semibold text-2xl",
    },
    "Bio",
    -1,
  ),
  Cx = Pl(
    "i",
    {
      class: "fal fa-check mr-2",
    },
    null,
    -1,
  ),
  _x = Il(" Salvar ");
mx.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Bottom");
  return (
    wl(),
    _l("div", hx, [
      Pl(e6),
      Pl("div", bx, [
        Pl(
          "img",
          {
            class: "mx-auto w-48 h-48 rounded-full",
            src: e2.profile.avatarURL,
          },
          null,
          8,
          ["src"],
        ),
        Pl(
          "button",
          {
            onClick:
              e0[1] ||
              (e0[1] = (...e$) => e2.changeAvatar && e2.changeAvatar(...e$)),
            class: "font-semibold text-blue-500",
          },
          " Mudar foto de perfil ",
        ),
      ]),
      Pl("div", gx, [
        vx,
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[2] || (e0[2] = (e$) => (e2.profile.name = e$)),
              maxlength: "32",
              class: "block w-full bg-transparent p-1 border-b border-theme",
            },
            null,
            512,
          ),
          [[ns, e2.profile.name]],
        ),
      ]),
      Pl("div", xx, [
        yx,
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[3] || (e0[3] = (e$) => (e2.profile.username = e$)),
              maxlength: "24",
              class: "block w-full bg-transparent p-1 border-b border-theme",
            },
            null,
            512,
          ),
          [[ns, e2.profile.username]],
        ),
      ]),
      Pl("div", kx, [
        wx,
        Zn(
          Pl(
            "input",
            {
              maxlength: "255",
              "onUpdate:modelValue":
                e0[4] || (e0[4] = (e$) => (e2.profile.bio = e$)),
              class: "block w-full bg-transparent p-1 border-b border-theme",
            },
            null,
            512,
          ),
          [[ns, e2.profile.bio]],
        ),
      ]),
      e2.hasChanges
        ? (wl(),
          _l(
            "button",
            {
              key: 0,
              onClick: e0[5] || (e0[5] = (...e$) => e2.save && e2.save(...e$)),
              class:
                "absolute bottom-32 right-4 bg-blue-500 text-white rounded-xl p-2 px-4",
            },
            [Cx, _x],
          ))
        : Ml("", !0),
      Pl(e4),
    ])
  );
};
const Ax = {
    components: {
      Bottom: kg,
      Header: vg,
      Post: Ug,
      Menu: or,
    },
    setup() {
      let e$ = uc(),
        e0 = rt(),
        e8 = Ze([]);

      function e2(e$) {
        e2.last > Date.now() ||
          ((e2.last = Date.now() + 1e3),
          So.backend.ig_setFollow(e0.value.id, e$).then(() => {
            ((e0.value.isFollowed = e$), (e0.value.followers += e$ ? 1 : -1));
          }));
      }
      return (
        So.backend.ig_getProfile(e$.params.id).then((e$) => {
          e$
            ? ((e$.profile.isYou = e$.profile.id == gg.profile.id),
              (e0.value = e$.profile),
              (e0.value.hasStory = gg.stories.value.some(
                (e0) => e0.author.username == e$.profile.username,
              )),
              e8.push(...e$.posts))
            : (e0.value = !1);
        }),
        (e2.last = 0),
        So.onceRoute("INSTAGRAM_DESTROY", (e$) => {
          let e0 = e8.findIndex((e0) => e0.id == e$);
          -1 != e0 && e8.splice(e0, 1);
        }),
        {
          profile: e0,
          posts: e8,
          setFollow: e2,
          getFollowers: function () {
            So.backend
              .ig_getFollowers(e0.value.id)
              .then((e$) => gg.showProfileMap(e$));
          },
          getFollowing: function () {
            So.backend
              .ig_getFollowing(e0.value.id)
              .then((e$) => gg.showProfileMap(e$));
          },
        }
      );
    },
  },
  Sx = {
    class: "bg-theme text-theme h-full flex flex-col",
  },
  Tx = {
    key: 0,
    class: "p-3",
  },
  Ex = {
    key: 1,
    class: "p-3 flex items-center border-b border-theme shadow-lg",
  },
  Rx = {
    class: "flex-1 flex flex-col items-start",
  },
  Px = {
    class: "ml-4 mb-4 flex",
  },
  Lx = {
    class: "grid grid-cols-3 p-5 gap-5",
  },
  Ix = {
    class: "text-center text-2xl",
  },
  Ox = {
    class: "font-bold block",
  },
  Mx = Pl(
    "span",
    {
      class: "text-gray-500",
    },
    "Posts",
    -1,
  ),
  Vx = {
    class: "font-bold block",
  },
  Dx = Pl(
    "span",
    {
      class: "text-gray-500",
    },
    "Seguidores",
    -1,
  ),
  Nx = {
    class: "font-bold block",
  },
  Ux = Pl(
    "span",
    {
      class: "text-gray-500",
    },
    "Seguindo",
    -1,
  ),
  $x = {
    class: "text-2xl mb-4 mx-4",
  },
  jx = {
    class: "font-bold",
  },
  Fx = {
    class: "px-4 w-full",
  },
  zx = {
    class: "overflow-y-auto hide-scroll grid grid-cols-3",
  },
  Bx = {
    key: 2,
    class: "text-center mt-4",
  };
Ax.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  let e4 = dl("Header"),
    e7 = dl("app-verified"),
    e5 = dl("Bottom");
  return (
    wl(),
    _l("div", Sx, [
      Pl(e4),
      !1 === e2.profile
        ? (wl(), _l("h1", Tx, "Perfil n\xe3o encontrado"))
        : e2.profile
          ? (wl(),
            _l("div", Ex, [
              Pl("div", Rx, [
                Pl("div", Px, [
                  Pl(
                    "div",
                    {
                      class: [
                        "w-28 h-28",
                        {
                          "bg-instagram rounded-full": e2.profile.hasStory,
                        },
                      ],
                    },
                    [
                      Pl(
                        "img",
                        {
                          src: e2.profile.avatarURL,
                          class: "w-28 h-28 p-0.5 rounded-full",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                    ],
                    2,
                  ),
                  Pl("div", Lx, [
                    Pl("div", Ix, [
                      Pl("span", Ox, g(e2.profile.posts || 0), 1),
                      Mx,
                    ]),
                    Pl(
                      "div",
                      {
                        class: "text-center text-2xl",
                        onClick:
                          e0[1] ||
                          (e0[1] = (...e$) =>
                            e2.getFollowers && e2.getFollowers(...e$)),
                      },
                      [Pl("span", Vx, g(e2.profile.followers || 0), 1), Dx],
                    ),
                    Pl(
                      "div",
                      {
                        class: "text-center text-2xl",
                        onClick:
                          e0[2] ||
                          (e0[2] = (...e$) =>
                            e2.getFollowing && e2.getFollowing(...e$)),
                      },
                      [Pl("span", Nx, g(e2.profile.following || 0), 1), Ux],
                    ),
                  ]),
                ]),
                Pl("div", $x, [
                  Pl("h1", jx, [
                    Il(
                      g(
                        null != (e6 = e2.profile.name)
                          ? e6
                          : e2.profile.username,
                      ) + " ",
                      1,
                    ),
                    e2.profile.verified
                      ? (wl(),
                        _l(e7, {
                          key: 0,
                          class: "inline ml-1 mb-0.5 w-6 h-6",
                        }))
                      : Ml("", !0),
                  ]),
                  Pl("p", null, g(e2.profile.bio), 1),
                ]),
                Pl("div", Fx, [
                  e2.profile.isYou
                    ? (wl(),
                      _l(
                        "button",
                        {
                          key: 0,
                          onClick:
                            e0[3] ||
                            (e0[3] = (e0) =>
                              e$.$router.push("/instagram/edit")),
                          class:
                            "block w-full border border-theme p-1 rounded-xl",
                        },
                        " Editar perfil ",
                      ))
                    : (wl(),
                      _l(
                        "button",
                        {
                          key: 1,
                          onClick:
                            e0[4] ||
                            (e0[4] = (e$) =>
                              e2.setFollow(!e2.profile.isFollowed)),
                          class:
                            "block w-full bg-blue-500 p-1 text-white rounded-xl",
                        },
                        g(
                          e2.profile.isFollowed ? "Deixar de seguir" : "Seguir",
                        ),
                        1,
                      )),
                ]),
              ]),
            ]))
          : Ml("", !0),
      Pl("ul", zx, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.posts,
            (e0) => (
              wl(),
              _l(
                "li",
                {
                  key: e0.id,
                  onClick: (e8) => e$.$router.push("/instagram/posts/" + e0.id),
                },
                [
                  Pl(
                    "div",
                    {
                      class: "h-56 bg-cover bg-center",
                      style: {
                        backgroundImage: "url(" + e0.image + ")",
                      },
                    },
                    null,
                    4,
                  ),
                ],
                8,
                ["onClick"],
              )
            ),
          ),
          128,
        )),
      ]),
      e2.profile && !e2.posts.length
        ? (wl(), _l("h3", Bx, "Este usu\xe1rio n\xe3o tem publica\xe7\xf5es"))
        : Ml("", !0),
      Pl(e5),
    ])
  );
};
const Hx = {
    components: {
      Header: vg,
      NavBar: kg,
      Post: Ug,
    },
    setup() {
      let e$ = rt(!0),
        e0 = rt(),
        e8 = cc(),
        e2 = uc();
      return (
        So.backend.ig_getPost(e2.params.id).then((e8) => {
          ((e0.value = e8), (e$.value = !1));
        }),
        So.onceRoute("INSTAGRAM_DESTROY", (e$) => {
          var e2;
          (null == (e2 = e0.value) ? void 0 : e2.id) == e$ && e8.back();
        }),
        {
          loading: e$,
          post: e0,
        }
      );
    },
  },
  qx = {
    class: "flex flex-col bg-theme text-theme h-full",
  },
  Gx = {
    key: 0,
  },
  Wx = {
    key: 2,
  };
Hx.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Post");
  return (
    wl(),
    _l("div", qx, [
      Pl(e6, {
        back: "Voltar",
      }),
      e2.loading
        ? (wl(), _l("div", Gx))
        : e2.post
          ? (wl(),
            _l(
              e4,
              {
                key: 1,
                post: e2.post,
              },
              null,
              8,
              ["post"],
            ))
          : (wl(), _l("h1", Wx, "Post n\xe3o encontrado")),
    ])
  );
};
const Kx = rt(),
  Jx = {
    setup() {
      var e$;
      return {
        logo:
          null != (e$ = So.settings.twitterLogo) ? e$ : globalThis.twitterLogo,
        profile: Kx,
        scrollTop: function () {
          let e$ = document.querySelector(".overflow-y-auto");
          e$ && (e$.scrollTop = 0);
        },
      };
    },
  },
  Xx = {
    class:
      "flex-shrink-0 h-28 border-b border-theme flex justify-center items-end pb-3",
  };
Jx.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", Xx, [
      Pl(
        "img",
        {
          onClick:
            e0[1] ||
            (e0[1] = (e0) => {
              var e8;
              return e$.$router.push(
                "/twitter/profiles/" +
                  (null == (e8 = e2.profile) ? void 0 : e8.id),
              );
            }),
          class: "absolute left-8 w-12 h-12 rounded-full",
          src: e2.profile.avatarURL,
        },
        null,
        8,
        ["src"],
      ),
      e2.logo
        ? (wl(),
          _l(
            "img",
            {
              key: 0,
              class: "w-12 h-12",
              src: e2.logo,
            },
            null,
            8,
            ["src"],
          ))
        : (wl(),
          _l("i", {
            key: 1,
            onClick:
              e0[2] || (e0[2] = (...e$) => e2.scrollTop && e2.scrollTop(...e$)),
            class: "fab fa-twitter text-4xl text-twitter",
          })),
      Pl("i", {
        onClick: e0[3] || (e0[3] = (e0) => e$.$router.push("/twitter/create")),
        class: "absolute right-8 top-16 fa fa-feather-alt text-twitter",
      }),
    ])
  );
};
const Yx = {
    props: {
      tag: {
        default: "li",
      },
      post: {
        required: !0,
      },
    },
    emits: ["setLike", "setRetweet"],
    setup(e$, e0) {
      let e8 = cc(),
        e2 = e$.post,
        e3 = e2.retweeted_by ? e2.tweet_id : e2.id;
      return {
        id: e3,
        redirect() {
          e8.push(`/twitter/posts/${e3}`);
        },
        retweet() {
          So.backend["twitter_" + (e2.retweeted ? "unretweet" : "retweet")](
            e3,
          ).then((e$) => {
            e0.emit("setRetweet", e3, e$);
          });
        },
        like() {
          So.backend["twitter_" + (e2.liked ? "dislike" : "like")](e3).then(
            (e$) => {
              e0.emit("setLike", e3, e$);
            },
          );
        },
        showOptions() {
          let e$ = {};
          ((e2.author.id === Kx.value.id || So.identity.moderator) &&
            (e$.delete = "Excluir tweet"),
            (e$.view = "Ver tweet"),
            go()
              .request(e$, 25, !0)
              .then(
                (e$) => {
                  "delete" === e$
                    ? So.backend.twitter_destroy(e3)
                    : "view" === e$ && this.redirect();
                },
                () => {},
              ));
        },
      };
    },
  },
  Zx = {
    key: 0,
    class: "ml-16 mb-1 text-lg text-gray-500 font-bold",
  },
  Qx = Pl(
    "i",
    {
      class: "fas fa-retweet",
    },
    null,
    -1,
  ),
  ey = {
    class: "flex",
  },
  ty = {
    class: "ml-4 flex-1 flex flex-col",
  },
  ny = {
    class: "flex items-center text-xl mb-1",
  },
  ly = {
    class: "font-bold mr-2",
  },
  ay = {
    class: "text-gray-500",
  },
  sy = Pl(
    "i",
    {
      class: "fas fa-ellipsis-v",
    },
    null,
    -1,
  ),
  oy = {
    class: "text-2xl",
  },
  ry = {
    class: "flex justify-between text-2xl mt-3 w-96",
  },
  iy = Pl(
    "i",
    {
      class: "far fa-comment mr-2",
    },
    null,
    -1,
  ),
  cy = Pl(
    "i",
    {
      class: "far fa-retweet mr-2",
    },
    null,
    -1,
  );
Yx.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("app-verified");
  return (
    wl(),
    _l(
      fl(e8.tag),
      {
        class: "p-3 border-b border-theme text-theme",
      },
      {
        default: en(() => {
          var e3;
          return [
            e8.post.retweeted_by
              ? (wl(),
                _l("p", Zx, [
                  Qx,
                  Il(" " + g(e8.post.retweeted_by) + " retweetou ", 1),
                ]))
              : Ml("", !0),
            Pl("div", ey, [
              Pl(
                "img",
                {
                  onClick:
                    e0[1] ||
                    (e0[1] = (e0) =>
                      e$.$router.push(
                        "/twitter/profiles/" + e8.post.author.id,
                      )),
                  class: "w-20 h-20 rounded-full",
                  src: e8.post.author.avatarURL,
                  alt: "",
                },
                null,
                8,
                ["src"],
              ),
              Pl("div", ty, [
                Pl("div", ny, [
                  Pl("span", ly, g(e8.post.author.name), 1),
                  e8.post.author.verified
                    ? (wl(),
                      _l(e6, {
                        key: 0,
                        class: "mr-2 w-5 h-5",
                      }))
                    : Ml("", !0),
                  Pl(
                    "span",
                    ay,
                    " @" +
                      g(e8.post.author.username) +
                      " \xb7 " +
                      g(
                        e$.$filters.unixToRelative(
                          null != (e3 = e8.post.created_at) ? e3 : 0,
                        ),
                      ),
                    1,
                  ),
                  Pl(
                    "button",
                    {
                      class: "ml-auto px-4",
                      onClick:
                        e0[2] ||
                        (e0[2] = (...e$) =>
                          e2.showOptions && e2.showOptions(...e$)),
                    },
                    [sy],
                  ),
                ]),
                Pl("p", oy, g(e8.post.content), 1),
                Pl("div", ry, [
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[3] ||
                        (e0[3] = (...e$) => e2.redirect && e2.redirect(...e$)),
                    },
                    [iy, Pl("span", null, g(e8.post.comments), 1)],
                  ),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[4] ||
                        (e0[4] = (...e$) => e2.retweet && e2.retweet(...e$)),
                      class: {
                        "text-green-400": e8.post.retweeted,
                      },
                    },
                    [cy, Pl("span", null, g(e8.post.retweets), 1)],
                    2,
                  ),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[5] || (e0[5] = (...e$) => e2.like && e2.like(...e$)),
                      class: {
                        "text-red-500": e8.post.liked,
                      },
                    },
                    [
                      Pl(
                        "i",
                        {
                          class: [
                            {
                              fas: e8.post.liked,
                            },
                            "far fa-heart mr-2",
                          ],
                        },
                        null,
                        2,
                      ),
                      Pl("span", null, g(e8.post.likes), 1),
                    ],
                    2,
                  ),
                ]),
              ]),
            ]),
          ];
        }),
        _: 1,
      },
    )
  );
};
const uy = {
  components: {
    Post: Yx,
  },
  props: ["all"],
  setup(e$) {
    let e0 = e$.all;
    So.onceRoute("TWITTER_DESTROY", (e$) => {
      let e8 = 0;
      for (
        ;
        -1 != (e8 = e0.findIndex((e0) => e0.id == e$ || e0.tweet_id == e$));
      )
        e0.splice(e8, 1);
    });
    let e8 = (e$, e8, e2 = 1) =>
      So.onceRoute(e$, (e$) => {
        e0.filter(
          (e0) => e0.id == e$ || (e0.tweet_id == e$ && e0.retweeted_by),
        ).forEach((e$) => {
          e$[e8] += e2;
        });
      });
    return (
      e8("TWITTER_LIKE", "likes"),
      e8("TWITTER_DISLIKE", "likes", -1),
      e8("TWITTER_REPLY", "comments"),
      e8("TWITTER_RETWEET", "retweets"),
      e8("TWITTER_UNRETWEET", "retweets", -1),
      {
        setLike: function (e$, e8) {
          e0.filter(
            (e0) => e0.id == e$ || (e0.tweet_id == e$ && e0.retweeted_by),
          ).forEach((e$) => {
            e$.liked = e8;
          });
        },
        setRetweet: function (e$, e8) {
          e0.filter(
            (e0) => e0.id == e$ || (e0.tweet_id == e$ && e0.retweeted_by),
          ).forEach((e$) => (e$.retweeted = e8));
          let e2 = e0.findIndex((e0) => e0.tweet_id == e$ && e0.retweeted_by);
          !e8 && e2 >= 0 && e0.splice(e2, 1);
        },
      }
    );
  },
};
uy.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Post");
  return (
    wl(),
    _l("ul", null, [
      (wl(!0),
      _l(
        bl,
        null,
        fa(
          e8.all,
          (e$) => (
            wl(),
            _l(
              e6,
              {
                tag: "li",
                key: e$.id,
                post: e$,
                onSetLike: e2.setLike,
                onSetRetweet: e2.setRetweet,
              },
              null,
              8,
              ["post", "onSetLike", "onSetRetweet"],
            )
          ),
        ),
        128,
      )),
    ])
  );
};
const dy = {
    components: {
      Header: Jx,
      Timeline: uy,
    },
    setup() {
      jl("setDark")();
      let e$ = Ze([]);
      if (So.localhost) {
        Kx.value = {
          name: "Will Dev",
          username: "Will",
          bio: "Programador do celular",
          avatarURL:
            "https://pbs.twimg.com/profile_images/1408692225513607170/2fgNPFXo_400x400.jpg",
        };
        for (let e0 = 0; e0 < 100; e0 += 1)
          e$.push({
            id: e0 + 1,
            author: {
              name: "John Doe",
              username: "johndoe",
              avatarURL: "https://picsum.photos/200",
            },
            content: "Lorem ipsum dolor sit amet ".repeat(10),
            likes: Math.floor(1e3 * Math.random()),
            retweets: Math.floor(1e3 * Math.random()),
            comments: Math.floor(100 * Math.random()),
            liked: 0.75 > Math.random(),
            retweeted: 0.75 > Math.random(),
          });
      }
      return (
        So.backend.twitter().then((e0) => {
          e0
            ? ((Kx.value = e0),
              So.backend.twitter_timeline().then((e0) => {
                (Object.assign(e$, e0),
                  So.onceRoute("TWITTER_TWEET", (e0) => e$.unshift(e0)));
              }))
            : "/twitter" === VO.currentRoute.value.path &&
              VO.replace("/twitter/register");
        }),
        {
          profile: Kx,
          posts: e$,
        }
      );
    },
  },
  py = {
    key: 0,
    class: "flex flex-col h-full bg-theme",
  },
  fy = {
    key: 1,
    class: "h-full bg-theme",
  };
dy.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Timeline");
  return e2.profile
    ? (wl(),
      _l("div", py, [
        Pl(e6),
        Pl(
          e4,
          {
            class: "overflow-y-auto hide-scroll",
            all: e2.posts,
          },
          null,
          8,
          ["all"],
        ),
      ]))
    : (wl(), _l("div", fy));
};
const my = {
    setup() {
      var e$;
      jl("setDark")();
      let e0 = jl("alert"),
        e8 = rt({}),
        e2 =
          null != (e$ = So.settings.twitterLogo) ? e$ : globalThis.twitterLogo;
      return {
        form: e8,
        register: function () {
          So.backend.twitter_register(e8.value).then((e$) => {
            e$ && e$.error ? e0(e$.error) : VO.replace("/twitter");
          });
        },
        logo: e2,
      };
    },
  },
  hy = sn("data-v-571aa757");
ln("data-v-571aa757");
const by = {
    class: "h-full bg-theme",
  },
  gy = {
    class: "h-28 flex items-end justify-center pb-4",
  },
  vy = {
    key: 1,
    class: "fab fa-twitter text-4xl text-twitter",
  },
  xy = {
    class: "w-10/12 mx-auto mt-32 text-theme",
  },
  yy = {
    class: "text-right mt-6",
  };
an();
const ky = hy(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l("div", by, [
      Pl("div", gy, [
        Pl(
          "span",
          {
            onClick:
              e0[1] ||
              (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
            class: "absolute left-4 text-3xl text-twitter",
          },
          "Cancelar",
        ),
        e2.logo
          ? (wl(),
            _l(
              "img",
              {
                key: 0,
                class: "w-12 h-12",
                src: e2.logo,
              },
              null,
              8,
              ["src"],
            ))
          : (wl(), _l("i", vy)),
      ]),
      Pl("div", xy, [
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[2] || (e0[2] = (e$) => (e2.form.name = e$)),
              maxlength: "24",
              class: "border-b border-theme w-full text-3xl p-2 bg-theme",
              placeholder: "Nome",
            },
            null,
            512,
          ),
          [[ns, e2.form.name]],
        ),
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[3] || (e0[3] = (e$) => (e2.form.username = e$)),
              maxlength: "16",
              class: "mt-8 border-b border-theme w-full text-3xl p-2 bg-theme",
              placeholder: "Nome de usu\xe1rio",
            },
            null,
            512,
          ),
          [[ns, e2.form.username]],
        ),
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[4] || (e0[4] = (e$) => (e2.form.bio = e$)),
              maxlength: "255",
              class: "mt-8 border-b border-theme w-full text-3xl p-2 bg-theme",
              placeholder: "Biografia",
            },
            null,
            512,
          ),
          [[ns, e2.form.bio]],
        ),
        Pl("div", yy, [
          Pl(
            "button",
            {
              onClick:
                e0[5] || (e0[5] = (...e$) => e2.register && e2.register(...e$)),
              class: "bg-twitter text-white p-2 px-4 rounded-full",
            },
            "Cadastrar",
          ),
        ]),
      ]),
    ])
  ),
);
((my.render = ky), (my.__scopeId = "data-v-571aa757"));
const wy = {
    setup() {
      jl("setDark")();
      let e$ = jl("alert"),
        e0 = cc(),
        e8 = Ze({});
      return {
        profile: Kx,
        form: e8,
        submit: function () {
          So.backend.twitter_store(e8.content).then((e8) => {
            e8 && e8.error ? e$(e8.error) : e0.back();
          });
        },
      };
    },
  },
  Cy = sn("data-v-4a7be0d9");
ln("data-v-4a7be0d9");
const _y = {
    class: "flex flex-col h-full bg-theme",
  },
  Ay = {
    class: "mt-16 px-8 flex justify-between",
  },
  Sy = {
    class: "p-8 flex h-full",
  };
an();
const Ty = Cy(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l("div", _y, [
      Pl("div", Ay, [
        Pl("i", {
          onClick:
            e0[1] ||
            (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
          class: "fal fa-times text-twitter text-4xl",
        }),
        Pl(
          "button",
          {
            onClick:
              e0[2] || (e0[2] = (...e$) => e2.submit && e2.submit(...e$)),
            class:
              "bg-twitter text-white text-2xl font-bold px-6 py-2 rounded-full",
          },
          "Tweet",
        ),
      ]),
      Pl("div", Sy, [
        Pl(
          "img",
          {
            class: "w-16 h-16 mr-4 rounded-full",
            src: e2.profile.avatarURL,
            alt: "",
          },
          null,
          8,
          ["src"],
        ),
        Zn(
          Pl(
            "textarea",
            {
              "onUpdate:modelValue":
                e0[3] || (e0[3] = (e$) => (e2.form.content = e$)),
              maxlength: "280",
              class: "w-full h-full resize-none bg-transparent text-theme",
              placeholder: "O que est\xe1 acontecendo?",
            },
            null,
            512,
          ),
          [[ns, e2.form.content]],
        ),
      ]),
    ])
  ),
);
((wy.render = Ty), (wy.__scopeId = "data-v-4a7be0d9"));
const Ey = {
    components: {
      Timeline: uy,
    },
    setup() {
      jl("setDark")();
      let e$ = uc(),
        e0 = cc(),
        e8 = jl("alert"),
        e2 = rt({}),
        e3 = Ze([]),
        e1 = rt("00:00"),
        e6 = rt("1 Jan 73"),
        e4 = rt();
      return (
        So.localhost &&
          (e2.value = {
            id: 1,
            author: {
              name: "Usuario",
              username: "usuario",
              avatarURL: "https://picsum.photos/200",
            },
            content: "Hello",
          }),
        An(() => {
          e$.params.id &&
            So.backend.twitter_view(e$.params.id).then((e$) => {
              ((e2.value = e$.tweet),
                (e3.length = 0),
                Object.assign(e3, e$.comments));
              let [e0, e8] = Us(e$.tweet.created_at);
              ((e6.value = e0), (e1.value = e8));
            });
        }),
        vn(() => {
          let e$ = (e$, e0) =>
            So.onceRoute(e$, (e$) => e$ == e2.value.id && e0());
          (So.onceRoute("TWITTER_DESTROY", (e$) => {
            if (e2.value.id != e$) {
              let e1 = e3.indexOf((e0) => e0.id == e$);
              return e1 >= 0 && e3.index(e1);
            }
            (e0.back(), e8("Este tweet foi exclu\xeddo"));
          }),
            e$("TWITTER_LIKE", () => e2.value.likes++),
            e$("TWITTER_RETWEET", () => e2.value.retweets++),
            e$("TWITTER_DISLIKE", () => e2.value.likes--),
            e$("TWITTER_UNRETWEET", () => e2.value.retweets--));
        }),
        {
          content: e4,
          createReply: function () {
            let e$ = e4.value.trim();
            e$ &&
              So.backend.twitter_reply(parseInt(e2.value.id), e$).then((e$) => {
                if (e$.error) return e8(e$.error);
                (e$ && e3.unshift(e$), (e4.value = ""));
              });
          },
          mine: Kx,
          tweet: e2,
          hour: e1,
          date: e6,
          android: So.settings.isAndroid,
          comments: e3,
          like: function () {
            So.backend["twitter_" + (e2.value.liked ? "dislike" : "like")](
              e2.value.id,
            ).then((e$) => {
              e2.value.liked = e$;
            });
          },
          retweet: function () {
            So.backend[
              "twitter_" + (e2.value.retweeted ? "unretweet" : "retweet")
            ](e2.value.id).then((e$) => {
              e2.value.retweeted = e$;
            });
          },
        }
      );
    },
  },
  Ry = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  Py = Pl(
    "div",
    {
      class: "h-16 flex-shrink-0 bg-theme",
    },
    null,
    -1,
  ),
  Ly = {
    class: "overflow-y-auto hide-scroll",
  },
  Iy = {
    key: 0,
    class: "px-5",
  },
  Oy = {
    class: "flex items-center",
  },
  My = {
    class: "ml-4",
  },
  Vy = {
    class: "flex items-center",
  },
  Dy = {
    class: "text-gray-500",
  },
  Ny = {
    class: "mt-6 text-4xl leading-snug",
  },
  Uy = {
    class: "mt-4 text-gray-500 text-xl",
  },
  $y = {
    class: "mt-4 flex text-2xl border-t border-b border-theme py-4",
  },
  jy = {
    class: "text-gray-500",
  },
  Fy = {
    class: "text-theme",
  },
  zy = Il(" Retweets"),
  By = {
    class: "ml-5 text-gray-500",
  },
  Hy = {
    class: "text-theme",
  },
  qy = Il(" Likes"),
  Gy = {
    class:
      "flex justify-between items-center text-2xl border-b border-theme py-4 px-8",
  },
  Wy = Pl(
    "i",
    {
      class: "fal fa-comment text-4xl",
    },
    null,
    -1,
  ),
  Ky = Pl(
    "i",
    {
      class: "fal fa-retweet text-4xl",
    },
    null,
    -1,
  ),
  Jy = {
    key: 1,
    class: "p-4",
  },
  Xy = {
    class: "flex ml-16 mb-2 justify-between items-center",
  },
  Yy = {
    class: "text-2xl text-gray-500",
  },
  Zy = Pl(
    "i",
    {
      class: "fal fa-level-up transform-flip-x mr-2",
    },
    null,
    -1,
  ),
  Qy = Il(" Respondendo "),
  ek = {
    class: "text-twitter",
  },
  tk = {
    class: "flex items-start border-b border-theme pb-4",
  };
Ey.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  let e4 = dl("app-verified"),
    e7 = dl("Timeline");
  return (
    wl(),
    _l("div", Ry, [
      Py,
      Pl("div", Ly, [
        (null == (e6 = e2.tweet) ? void 0 : e6.id)
          ? (wl(),
            _l("div", Iy, [
              Pl("div", Oy, [
                Pl(
                  "img",
                  {
                    onClick:
                      e0[1] ||
                      (e0[1] = (e0) =>
                        e$.$router.push(
                          "/twitter/profiles/" + e2.tweet.author.id,
                        )),
                    class: "w-24 h-24 rounded-full",
                    src: e2.tweet.author.avatarURL,
                  },
                  null,
                  8,
                  ["src"],
                ),
                Pl("div", My, [
                  Pl("div", Vy, [
                    Pl("h1", null, g(e2.tweet.author.name), 1),
                    e2.tweet.author.verified
                      ? (wl(),
                        _l(e4, {
                          key: 0,
                          class: "ml-2 w-6 h-6",
                        }))
                      : Ml("", !0),
                  ]),
                  Pl("h1", Dy, "@" + g(e2.tweet.author.username), 1),
                ]),
              ]),
              Pl("p", Ny, g(e2.tweet.content), 1),
              Pl(
                "p",
                Uy,
                g(e2.hour) +
                  " \xb7 " +
                  g(e2.date) +
                  " \xb7 Twitter for " +
                  g(e2.android ? "willid" : "WillOS"),
                1,
              ),
              Pl("div", $y, [
                Pl("p", jy, [Pl("b", Fy, g(e2.tweet.retweets), 1), zy]),
                Pl("p", By, [Pl("b", Hy, g(e2.tweet.likes), 1), qy]),
              ]),
            ]))
          : Ml("", !0),
        Pl("div", Gy, [
          Pl(
            "button",
            {
              onClick:
                e0[2] ||
                (e0[2] = (e$) => (e2.content = null == e2.content ? "" : null)),
            },
            [Wy],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[3] || (e0[3] = (...e$) => e2.retweet && e2.retweet(...e$)),
              class: {
                "text-green-400": e2.tweet.retweeted,
              },
            },
            [Ky],
            2,
          ),
          Pl(
            "button",
            {
              onClick: e0[4] || (e0[4] = (...e$) => e2.like && e2.like(...e$)),
              class: {
                "text-red-500": e2.tweet.liked,
              },
            },
            [
              Pl(
                "i",
                {
                  class: [
                    "fal fa-heart text-4xl",
                    {
                      fas: e2.tweet.liked,
                    },
                  ],
                },
                null,
                2,
              ),
            ],
            2,
          ),
        ]),
        null != e2.content
          ? (wl(),
            _l("div", Jy, [
              Pl("div", Xy, [
                Pl("p", Yy, [
                  Zy,
                  Qy,
                  Pl("span", ek, "@" + g(e2.tweet.author.username), 1),
                ]),
                Pl(
                  "button",
                  {
                    onClick:
                      e0[5] ||
                      (e0[5] = (...e$) =>
                        e2.createReply && e2.createReply(...e$)),
                    class:
                      "bg-twitter px-6 py-2 text-xl text-white rounded-full",
                  },
                  "Responder",
                ),
              ]),
              Pl("div", tk, [
                Pl(
                  "img",
                  {
                    class: "w-20 h-20 rounded-full",
                    src: e2.mine.avatarURL,
                  },
                  null,
                  8,
                  ["src"],
                ),
                Zn(
                  Pl(
                    "textarea",
                    {
                      onKeydown:
                        e0[6] ||
                        (e0[6] = us(
                          is(
                            (...e$) => e2.createReply && e2.createReply(...e$),
                            ["prevent"],
                          ),
                          ["enter"],
                        )),
                      class:
                        "ml-3 mt-5 w-full h-36 bg-transparent text-theme resize-none hide-scroll",
                      "onUpdate:modelValue":
                        e0[7] || (e0[7] = (e$) => (e2.content = e$)),
                      placeholder: "Tweete sua resposta",
                    },
                    null,
                    544,
                  ),
                  [[ns, e2.content]],
                ),
              ]),
            ]))
          : Ml("", !0),
        Pl(
          e7,
          {
            all: e2.comments,
          },
          null,
          8,
          ["all"],
        ),
      ]),
    ])
  );
};
const nk = {
    components: {
      Timeline: uy,
    },
    setup() {
      jl("setDark")();
      let e$ = uc(),
        e0 = rt(),
        e8 = Ze([]);
      return (
        So.localhost &&
          ((e0.value = {
            name: "Will Dev",
            username: "Will",
            verified: 1,
          }),
          e8.push(
            ...Array(50)
              .fill(0)
              .map((e$, e0) => ({
                id: e0 + 1,
                author: {
                  avatarURL: "https://picsum.photos/200",
                },
                content: "Hello world " + e0,
              })),
          )),
        So.backend.twitter_profile(e$.params.id).then((e$) => {
          ((e0.value = null == e$ ? void 0 : e$.profile),
            Object.assign(e8, null == e$ ? void 0 : e$.posts));
        }),
        {
          dark: So.darkTheme,
          profile: e0,
          posts: e8,
          mine: Kx,
          follow: async function () {
            (await So.backend.twitter_follow(e$.params.id)) &&
              ((e0.value.followers += 1), (e0.value.isFollowed = !0));
          },
          unfollow: async function () {
            (await So.backend.twitter_unfollow(e$.params.id)) &&
              ((e0.value.followers -= 1), (e0.value.isFollowed = !1));
          },
        }
      );
    },
  },
  lk = {
    class: "flex flex-col h-full bg-theme",
  },
  ak = Pl(
    "div",
    {
      class: "h-12 flex-shrink-0 bg-theme-accent",
    },
    null,
    -1,
  ),
  sk = {
    key: 0,
    class: "overflow-y-auto hide-scroll",
  },
  ok = {
    class: "relative",
  },
  rk = {
    class: "pt-4 text-right h-20",
  },
  ik = {
    class: "text-theme px-4 border-b border-theme",
  },
  ck = {
    class: "flex items-center",
  },
  uk = {
    class: "text-4xl",
  },
  dk = {
    class: "text-gray-500 text-2xl my-2",
  },
  pk = {
    class: "text-xl",
  },
  fk = {
    class: "flex text-2xl my-4",
  },
  mk = Il(),
  hk = Pl(
    "span",
    {
      class: "text-gray-500",
    },
    "Seguindo",
    -1,
  ),
  bk = {
    class: "ml-6",
  },
  gk = Il(),
  vk = Pl(
    "span",
    {
      class: "text-gray-500",
    },
    "Seguidores",
    -1,
  );
nk.render = function (e$, e0, e8, e2, e3, e1) {
  var e6, e4, e7, e5;
  let eV = dl("app-verified"),
    eN = dl("Timeline");
  return (
    wl(),
    _l("div", lk, [
      ak,
      e2.profile
        ? (wl(),
          _l("div", sk, [
            Pl("div", ok, [
              Pl(
                "img",
                {
                  class: "w-full h-56",
                  src: e2.profile.bannerURL,
                },
                null,
                8,
                ["src"],
              ),
              Pl(
                "img",
                {
                  class: [
                    "absolute left-8 top-36 w-36 h-36 rounded-full border-4",
                    [e2.dark ? "border-black" : "border-white"],
                  ],
                  src: null == (e6 = e2.profile) ? void 0 : e6.avatarURL,
                  alt: "",
                },
                null,
                10,
                ["src"],
              ),
            ]),
            Pl("div", rk, [
              (null == (e4 = e2.mine) ? void 0 : e4.id) == e2.profile.id
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      onClick:
                        e0[1] ||
                        (e0[1] = (e0) => e$.$router.push("/twitter/settings")),
                      class:
                        "mr-4 px-6 rounded-full text-twitter border border-twitter",
                    },
                    "Editar perfil",
                  ))
                : e2.profile.isFollowed
                  ? (wl(),
                    _l(
                      "button",
                      {
                        key: 1,
                        onClick:
                          e0[2] ||
                          (e0[2] = (...e$) =>
                            e2.unfollow && e2.unfollow(...e$)),
                        class:
                          "mr-4 px-6 rounded-full text-twitter border border-twitter",
                      },
                      "Deixar de seguir",
                    ))
                  : (wl(),
                    _l(
                      "button",
                      {
                        key: 2,
                        onClick:
                          e0[3] ||
                          (e0[3] = (...e$) => e2.follow && e2.follow(...e$)),
                        class:
                          "mr-4 px-6 rounded-full text-twitter border border-twitter",
                      },
                      "Seguir",
                    )),
            ]),
            Pl("div", ik, [
              Pl("div", ck, [
                Pl("h1", uk, g(e2.profile.name), 1),
                e2.profile.verified
                  ? (wl(),
                    _l(eV, {
                      key: 0,
                      class: "ml-2 w-6 h-6",
                    }))
                  : Ml("", !0),
              ]),
              Pl("h3", dk, "@" + g(e2.profile.username), 1),
              Pl("p", pk, g(e2.profile.bio), 1),
              Pl("div", fk, [
                Pl("p", null, [
                  Pl(
                    "b",
                    null,
                    g(null != (e7 = e2.profile.following) ? e7 : 0),
                    1,
                  ),
                  mk,
                  hk,
                ]),
                Pl("p", bk, [
                  Pl(
                    "b",
                    null,
                    g(null != (e5 = e2.profile.followers) ? e5 : 0),
                    1,
                  ),
                  gk,
                  vk,
                ]),
              ]),
            ]),
            Pl(
              eN,
              {
                all: e2.posts,
              },
              null,
              8,
              ["all"],
            ),
          ]))
        : Ml("", !0),
    ])
  );
};
const xk = Ze({}),
  yk = {
    components: {
      Header: Jx,
    },
    setup() {
      xk.id || Object.assign(xk, Kx.value);
      let e$ = jl("alert"),
        e0 = jl("prompt"),
        e8 = da(() => {
          for (let [e$, e0] of Object.entries(Kx.value))
            if (e0 != xk[e$]) return !0;
        });
      return {
        dark: So.darkTheme,
        form: xk,
        save: function () {
          So.backend.twitter_save(xk).then((e0) => {
            if (e0.error) return e$(e0.error);
            (Object.assign(xk, e0), Object.assign(Kx.value, e0));
          });
        },
        changeAvatar: async function () {
          try {
            let e$ = await So.useAnyImage("/twitter", !0);
            xk.avatarURL = e$;
          } catch (e0) {}
        },
        changeBanner: function () {
          e0("Link da imagem").then((e$) => {
            if (e$) {
              let e0 = new Image();
              ((e0.onload = () => (xk.bannerURL = e$)), (e0.src = e$));
            }
          });
        },
        hasChanges: e8,
      };
    },
  },
  kk = sn("data-v-1576647c");
ln("data-v-1576647c");
const wk = {
    class: "h-full text-theme bg-theme",
  },
  Ck = {
    class: "h-32 pb-4 border-b border-theme flex items-end",
  },
  _k = Pl(
    "i",
    {
      class: "far text-2xl fa-arrow-left",
    },
    null,
    -1,
  ),
  Ak = Pl("h1", null, "Editar perfil", -1),
  Sk = {
    class: "relative",
  },
  Tk = {
    class: "relative w-full",
  },
  Ek = Pl(
    "i",
    {
      class: "fas fa-camera opacity-75",
    },
    null,
    -1,
  ),
  Rk = {
    class: "absolute left-8 top-36 flex flex-center",
  },
  Pk = Pl(
    "i",
    {
      class: "fas fa-camera opacity-75",
    },
    null,
    -1,
  ),
  Lk = {
    class: "px-5 mt-20",
  },
  Ik = {
    class: "mb-4 flex flex-col",
  },
  Ok = Pl("label", null, "Nome", -1),
  Mk = {
    class: "mb-4 flex flex-col",
  },
  Vk = Pl("label", null, "Nome de usu\xe1rio", -1),
  Dk = {
    class: "mb-4 flex flex-col",
  },
  Nk = Pl("label", null, "Bio", -1);
an();
const Uk = kk((e$, e0, e8, e2, e3, e1) => {
  var e6;
  return (
    wl(),
    _l("div", wk, [
      Pl("div", Ck, [
        Pl(
          "button",
          {
            onClick:
              e0[1] ||
              (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
            class: "px-5 text-twitter",
          },
          [_k],
        ),
        Ak,
        e2.hasChanges
          ? (wl(),
            _l(
              "button",
              {
                key: 0,
                onClick:
                  e0[2] || (e0[2] = (...e$) => e2.save && e2.save(...e$)),
                class: "ml-auto text-twitter text-2xl px-5",
              },
              "Salvar",
            ))
          : Ml("", !0),
      ]),
      Pl("div", Sk, [
        Pl("div", Tk, [
          Pl(
            "button",
            {
              onClick:
                e0[3] ||
                (e0[3] = (...e$) => e2.changeBanner && e2.changeBanner(...e$)),
              class: "absolute inset-0 w-full text-center text-white",
            },
            [Ek],
          ),
          Pl(
            "img",
            {
              class: "h-56 w-full",
              src: null == (e6 = e2.form) ? void 0 : e6.bannerURL,
              alt: "",
            },
            null,
            8,
            ["src"],
          ),
        ]),
        Pl("div", Rk, [
          Pl(
            "button",
            {
              onClick:
                e0[4] ||
                (e0[4] = (...e$) => e2.changeAvatar && e2.changeAvatar(...e$)),
              class:
                "absolute inset-0 w-full rounded-full text-center text-white",
            },
            [Pk],
          ),
          Pl(
            "img",
            {
              class: [
                "w-36 h-36 rounded-full border-4",
                [e2.dark ? "border-black" : "border-white"],
              ],
              src: e2.form.avatarURL,
              alt: "",
            },
            null,
            10,
            ["src"],
          ),
        ]),
      ]),
      Pl("div", Lk, [
        Pl("div", Ik, [
          Ok,
          Zn(
            Pl(
              "input",
              {
                maxlength: "24",
                "onUpdate:modelValue":
                  e0[5] || (e0[5] = (e$) => (e2.form.name = e$)),
                class: "border-b border-theme p-1",
              },
              null,
              512,
            ),
            [[ns, e2.form.name]],
          ),
        ]),
        Pl("div", Mk, [
          Vk,
          Zn(
            Pl(
              "input",
              {
                maxlength: "16",
                "onUpdate:modelValue":
                  e0[6] || (e0[6] = (e$) => (e2.form.username = e$)),
                class: "border-b border-theme p-1",
              },
              null,
              512,
            ),
            [[ns, e2.form.username]],
          ),
        ]),
        Pl("div", Dk, [
          Nk,
          Zn(
            Pl(
              "input",
              {
                maxlength: "255",
                "onUpdate:modelValue":
                  e0[7] || (e0[7] = (e$) => (e2.form.bio = e$)),
                class: "border-b border-theme p-1",
              },
              null,
              512,
            ),
            [[ns, e2.form.bio]],
          ),
        ]),
      ]),
    ])
  );
});
((yk.render = Uk), (yk.__scopeId = "data-v-1576647c"));
const $k = new Map();

function jk(e$, e0) {
  let e8, e2;
  Array.isArray(e$)
    ? ([e8, e2] = e$)
    : ((e8 = () => e$.value), (e2 = (e0) => (e$.value = e0)));
  let e3 = [],
    e1 = Math.floor((e8() - e0) / 23);
  0 == e1 && e2(e0);
  for (let e6 = 25; e6 <= 600; e6 += 25)
    e3.push(
      setTimeout(() => {
        (e2(600 == e6 ? e0 : e8() - e1), 600 == e6 && $k.delete(e$));
      }, e6),
    );
  $k.set(e$, () => {
    (e3.forEach(clearTimeout), e2(e0));
  });
}
const Fk = {
  setup() {
    let e$ = rt(),
      e0,
      e8,
      e2 = !1;
    return {
      container: e$,
      down: function (e3) {
        ((e2 = !0),
          (e0 = e3.pageX - e$.value.offsetLeft),
          (e8 = e$.value.scrollLeft));
      },
      up: function () {
        e2 = !1;
      },
      move: function (e3) {
        if (!e2) return;
        e3.preventDefault();
        let e1 = 0.75 * (e3.pageX - e$.value.offsetLeft - e0);
        e$.value.scrollLeft = e8 - e1;
      },
    };
  },
};
Fk.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "div",
      {
        class: "overflow-x-auto hide-scroll",
        ref: "container",
        onMousedown:
          e0[1] ||
          (e0[1] = is(
            (...e$) => e2.down && e2.down(...e$),
            ["stop", "prevent"],
          )),
        onMouseup: e0[2] || (e0[2] = (...e$) => e2.up && e2.up(...e$)),
        onMouseleave: e0[3] || (e0[3] = (...e$) => e2.up && e2.up(...e$)),
        onMousemove: e0[4] || (e0[4] = (...e$) => e2.move && e2.move(...e$)),
      },
      [Zt(e$.$slots, "default")],
      544,
    )
  );
};
const zk = rt(),
  Bk = {
    props: {
      header: {
        default: !0,
      },
    },
    components: {
      HorizontalScroll: Fk,
    },
    setup() {
      let e$ = da(() => So.settings.bankType),
        e0 = da(() => So.settings.bankLogo),
        e8 = da(() => {
          var e$;
          return !(null == (e$ = So.settings.disabledApps)
            ? void 0
            : e$.includes("invoice"));
        }),
        e2 = da(() => {
          var e$;
          return !(null == (e$ = So.settings.disabledApps)
            ? void 0
            : e$.includes("fines"));
        });
      return (
        null == zk.value &&
          So.backend.bank_hasPix().then((e$) => (zk.value = e$)),
        {
          pix: zk,
          bankType: e$,
          bankLogo: e0,
          hasInvoices: e8,
          hasFines: e2,
        }
      );
    },
  },
  Hk = {
    key: 0,
    class: "h-12 bank-dark",
  },
  qk = {
    key: 1,
    class: "h-20 flex-shrink-0 pt-4 text-center",
  },
  Gk = {
    key: 1,
    class: "relative-white flex justify-center",
  },
  Wk = Pl(
    "img",
    {
      class: "w-16",
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwCAYAAAChS3wfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATxSURBVGhD7ZpbqFRVGMf3PnYsDQNJSysTooumlFKCJSHdoAfDLkQEZURhVNBDUBqUPfRSEPXSS4RQEJiRZJ0CLQuyjKIw1ETNSjllJZplF7OLs/r91/r2NHNm75k5Z8Zp72b+8OPb+1uXWWvttfbazLfiqEm5kuuP4uhGLq+HWTBRbvgBtsNHsBbPh3FfXOL6/yPn3FmwBZrRLlgCJ1jxYksdga9A+hLuhdlwCkyG6XA1PAoboQTSPrirVHJ9VlUxRSce8N1xbhM0fKrkmQUr4QhIb8MkSy6eaPxbvhvOaf03LfLPh92+ZLDnWFKxRMP15KU55mpalJkAG3xp576B0y2pOKLRW33znbvQXMMS5cbBx76GYEdbUi5Usw3SwLGYeXCSd0TR43AqPAy75KjQ37ATNsVxfMR7UkSdUzCfwomwlLyqs0rkkZkLGui07fkArKbsb+G2vqjvGMwC0G+n6XO27Dft2hcYBffBfhiutDssgszvCtJuV0Z0AMaZuyx8Sk92kCxpBvVbkboi3wpfor6e8A3m4ljMi3CN7tEO2Ap6LFeC3v7vwI9QKc2WCyCZLcthMU+p5kOI39AT2QZnwm3keU7+RKRrhugD6z3YLV+FtJWqbcfDfMqulzNL1KWPtL26hFVwGCo1HjQ7fvd3FHgGpINwE5T3bq7rvgPwj4a74ZAyoUcsqUakPRSyuBXmKgvfjpDkppurSvjXhmR3lbkyRZ4zQlb3vbmqhL8vJLPu4BLQ1PtD15anLHxNvQRJXwDa+w9D6tse/zyQPjNXWfiSAZhmrirhXxOS2zIAcUgOT/oe0FJ4iqml6TciUfZ1zCug5bRIvhQlU3uC2f9cGoCLw2X0vNlWtNJsUudQ/Wl2lNk0+e2gU9IA6EUm7TPbigbN6iU0UmXuJEdD5Zddm9TRp9cOtXsACqfeAJjtWvUGwGzXqjcAZrtWvQEw27XqDYDZrlVvAMx2rfI3AM7/odIx5XEGdLRN7f6x1v8P6OjfIe0fgA43v3XlcQlkKZldbW1z/pZAtpL/LKeabUXJv9KH8rQEkthiVh0bzN7gQhyxFd1q9oM8LYHkCWcFM1+Cn+FSuEWOkYjBOx+zLNxFTx+tJZD1FOvNkC1mLzNbpTiOFZd8MNxFy+mITq6MsfuGIq+iQYoHrgMFZ1fR2tfk/Jqb0yzhO6iUIrE6FSY7jUYoaJop6pqBUdjrL3gZFD6v1GS4Agapq2otW+MGQDNhKukhcFkhdQKj0Pr93hFC5p/AL/7uXymIqhCagqJvgMqdDTNBUqB3Ib/xqyrVia5GWuNK2aHvRMpD3nWhSF0lHSiLsv34B0OyW2LuGpEmroMkZjkc/QTLoBxiV4Nlta709NI6+S0MMFpJWKuuqO84zEJIQuaV0o9pqr9Lfd5RKcregXkWdAhiDnkUTk8VebV8zzWGnhnQbz8JB0GxT0mz5X3qHDpb8iN1CpIZtB1GFESlXN3ocK5FoyfCTt985zaD3k/DEmWSAdhjrmKJhk+Bbb4LPEXQ2QNLbSzyXq6CaKO5iicaPx5W+26EAxwDMBcsR7pIHwPrQao5jFUo0QG9pG+GPeqNSW//x+BamAk6sjsJzoM7Idkd9sLJVlWxRUfGgs4o68XYjL4AffE1VMO9PU+iU2qvTqXpI+ci0HkibXnaEvfDZngVXmC7G3oyLEVR9A/5Q6Q0mcHOXwAAAABJRU5ErkJggg==",
      alt: "",
    },
    null,
    -1,
  ),
  Kk = {
    key: 2,
    class: "relative-white flex items-center justify-center",
  },
  Jk = Pl(
    "svg",
    {
      class: "h-8 w-16",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.0",
      width: "270px",
      height: "136px",
      viewBox: "0 0 270 136",
      preserveAspectRatio: "xMidYMid meet",
    },
    [
      Pl(
        "g",
        {
          fill: "#ffffff",
        },
        [
          Pl("path", {
            d: "M177.3 134.5 c-13.5 -2.9 -24.7 -11.8 -30.5 -24.1 -5.5 -11.7 -5.9 -16 -6.5 -63 l-0.6 -43.2 12.4 -0.7 c6.8 -0.4 15.1 -0.5 18.4 -0.3 l6 0.3 0.5 43.5 c0.6 47.1 0.5 46.4 6.5 56.6 5.3 9.1 17.8 16.8 29 18 9.2 0.9 9.4 1.1 4.2 4.8 -6.4 4.5 -13.1 7.3 -20.8 8.5 -8 1.3 -10.8 1.3 -18.6 -0.4z",
          }),
          Pl("path", {
            d: "M0 92.2 c0 -42.3 0.3 -46.1 5.1 -55.4 4.4 -8.6 15.8 -17.7 26.6 -21.1 5.3 -1.7 16.3 -3.3 16.3 -2.3 0 0.3 -1.5 2.6 -3.4 5.1 -1.9 2.4 -4.5 7 -5.8 10.2 -2.3 5.8 -2.3 6.2 -2.6 54.6 l-0.3 48.7 -18 0 -17.9 0 0 -39.8z",
          }),
          Pl("path", {
            d: "M93 91.2 c0 -44.3 -0.3 -47.5 -5.7 -57.4 -5.5 -10 -18 -18.1 -29.8 -19.4 -9.2 -0.9 -9.4 -1.1 -4.2 -4.8 15 -10.7 34.3 -12.2 50.7 -4 8.2 4.1 14.6 10.8 19 19.7 5.5 11.3 6 16.1 6.7 63.5 l0.6 43.2 -18.7 0 -18.6 0 0 -40.8z",
          }),
          Pl("path", {
            d: "M222 122.6 c0 -0.3 1.5 -2.6 3.4 -5.1 1.9 -2.4 4.5 -7 5.8 -10.2 2.3 -5.8 2.3 -6.2 2.6 -54.5 l0.3 -48.8 18 0 17.9 0 0 39.8 c0 42.4 -0.3 46.1 -5.1 55.5 -4.5 8.8 -16.6 18.2 -27.9 21.5 -4.4 1.4 -15 2.6 -15 1.8z",
          }),
        ],
      ),
    ],
    -1,
  ),
  Xk = {
    key: 3,
    class: "font-bold text-4xl",
  },
  Yk = {
    key: 5,
    class: "h-16 mt-4 mx-auto",
    src: "https://i.imgur.com/BC78tFD.png",
  },
  Zk = {
    key: 9,
    class: "h-20 mx-auto",
    src: "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-1.png",
  },
  Qk = {
    key: 10,
    class: "h-20 mx-auto",
    src: "https://i.imgur.com/a3XNYTj.png",
  },
  ew = Pl(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "2.25rem",
      height: "2.25rem",
      viewBox: "0 0 2500 2500",
    },
    [
      Pl(
        "g",
        {
          fill: "rgb(255,255,255)",
          style: {
            transform: "none",
            "--darkreader-inline-fill": "#e8e6e3",
          },
          "data-darkreader-inline-fill": "",
        },
        [
          Pl("g", null, [
            Pl("path", {
              d: "M1165 2486 c-107 -28 -123 -40 -393 -309 -263 -262 -263 -262 -185 -269 141 -12 169 -30 413 -272 118 -118 225 -219 238 -225 16 -9 28 -9 45 0 12 6 117 105 232 220 236 234 278 263 400 275 67 7 67 7 -172 246 -131 132 -255 253 -275 269 -75 60 -211 89 -303 65z m176 -113 c48 -15 74 -37 242 -202 103 -101 187 -187 187 -190 0 -3 -20 -15 -43 -25 -28 -13 -112 -88 -254 -230 -213 -210 -213 -210 -430 5 -171 169 -228 220 -265 235 -27 10 -48 22 -48 25 0 3 82 86 183 185 156 154 189 182 232 196 65 22 130 22 196 1z",
            }),
            Pl("path", {
              d: "M223 1628 c-211 -213 -217 -225 -217 -383 0 -158 6 -170 217 -383 172 -174 172 -174 297 -170 106 4 132 8 170 28 28 14 124 102 250 228 113 112 219 213 235 223 38 24 124 25 167 3 17 -9 126 -111 242 -227 151 -150 224 -216 256 -230 33 -15 74 -22 150 -25 105 -4 105 -4 282 176 169 172 177 182 197 245 30 100 34 130 21 193 -23 112 -41 138 -223 322 -172 174 -172 174 -277 170 -78 -3 -117 -9 -150 -24 -32 -15 -107 -82 -256 -231 -116 -116 -225 -218 -242 -227 -43 -22 -129 -21 -167 3 -16 10 -124 113 -240 228 -126 126 -226 217 -250 228 -31 15 -68 20 -165 23 -125 4 -125 4 -297 -170z m423 49 c17 -9 125 -110 240 -224 209 -208 209 -208 -1 -417 -116 -114 -223 -215 -240 -223 -18 -10 -66 -18 -120 -21 -90 -4 -90 -4 -236 145 -90 91 -153 163 -163 187 -22 52 -22 190 0 242 10 24 73 96 163 187 146 149 146 149 236 145 57 -3 101 -10 121 -21z m1560 -129 c131 -134 152 -160 167 -207 21 -67 21 -109 0 -185 -16 -56 -26 -69 -166 -213 -147 -151 -150 -153 -193 -153 -24 0 -67 5 -96 11 -51 11 -60 18 -271 227 -217 217 -217 217 -5 430 233 233 244 240 359 241 56 1 56 1 205 -151z",
            }),
            Pl("path", {
              d: "M1011 865 c-259 -256 -284 -273 -424 -283 -79 -5 -79 -5 160 -244 131 -132 258 -254 283 -273 89 -66 221 -83 346 -44 68 21 68 21 337 288 269 266 269 266 210 273 -32 4 -87 20 -123 34 -59 25 -86 48 -291 251 -163 162 -232 223 -249 223 -16 0 -85 -62 -249 -225z m458 -99 c148 -148 217 -210 252 -227 27 -12 49 -25 49 -29 0 -4 -84 -90 -188 -192 -186 -183 -188 -185 -254 -203 -45 -12 -82 -16 -114 -11 -92 12 -129 38 -310 218 -96 94 -174 174 -173 177 0 3 26 18 57 33 45 22 99 69 262 233 113 113 207 205 210 205 3 0 97 -92 209 -204z",
            }),
          ]),
        ],
      ),
    ],
    -1,
  ),
  tw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Pix",
    -1,
  ),
  nw = Pl(
    "i",
    {
      class: "fal fa-usd-circle",
    },
    null,
    -1,
  ),
  lw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Transferir",
    -1,
  ),
  aw = Pl(
    "i",
    {
      class: "fal fa-file-invoice-dollar",
    },
    null,
    -1,
  ),
  sw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Extrato",
    -1,
  ),
  ow = Pl(
    "i",
    {
      class: "fal fa-user-friends",
    },
    null,
    -1,
  ),
  rw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Cobrar",
    -1,
  ),
  iw = Pl(
    "i",
    {
      class: "fal fa-file-invoice",
    },
    null,
    -1,
  ),
  cw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Faturas",
    -1,
  ),
  uw = Pl(
    "i",
    {
      class: "fal fa-gavel",
    },
    null,
    -1,
  ),
  dw = Pl(
    "span",
    {
      class: "text-2xl",
    },
    "Multas",
    -1,
  );
Bk.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("HorizontalScroll");
  return (
    wl(),
    _l(
      "div",
      {
        class: "flex flex-col h-full",
        bankType: e2.bankType,
      },
      [
        null != e8.header ? (wl(), _l("div", Hk)) : Ml("", !0),
        e8.header
          ? (wl(),
            _l("div", qk, [
              e2.bankLogo
                ? (wl(),
                  _l(
                    "img",
                    {
                      key: 0,
                      class: "h-20 mx-auto",
                      src: e2.bankLogo,
                    },
                    null,
                    8,
                    ["src"],
                  ))
                : "nubank" == e2.bankType
                  ? (wl(), _l("div", Gk, [Wk]))
                  : "nubank2" == e2.bankType
                    ? (wl(), _l("div", Kk, [Jk]))
                    : "southBank" == e2.bankType
                      ? (wl(), _l("h1", Xk, "SouthBank"))
                      : "fleeca" == e2.bankType
                        ? (wl(),
                          _l(
                            "img",
                            {
                              key: 4,
                              class: "h-12 mx-auto",
                              src: e$.$asset("/stock/fleeca.png"),
                              alt: "",
                            },
                            null,
                            8,
                            ["src"],
                          ))
                        : "nxbank" == e2.bankType
                          ? (wl(), _l("img", Yk))
                          : "CPBank" == e2.bankType
                            ? (wl(),
                              _l(
                                "img",
                                {
                                  key: 6,
                                  class: "h-12 mt-4 mx-auto",
                                  src: e$.$asset("/apps/cpbank.svg"),
                                },
                                null,
                                8,
                                ["src"],
                              ))
                            : "picpay" == e2.bankType
                              ? (wl(),
                                _l(
                                  "img",
                                  {
                                    key: 7,
                                    class: "h-14 mt-2 mx-auto",
                                    src: e$.$asset("/stock/picpay.svg"),
                                  },
                                  null,
                                  8,
                                  ["src"],
                                ))
                              : "bdc" == e2.bankType
                                ? (wl(),
                                  _l(
                                    "img",
                                    {
                                      key: 8,
                                      class: "h-24 mx-auto",
                                      src: e$.$asset("/apps/bdc.svg"),
                                    },
                                    null,
                                    8,
                                    ["src"],
                                  ))
                                : "itau" == e2.bankType
                                  ? (wl(), _l("img", Zk))
                                  : "bb" == e2.bankType
                                    ? (wl(), _l("img", Qk))
                                    : Ml("", !0),
            ]))
          : Ml("", !0),
        Zt(e$.$slots, "default"),
        "/bank" == e$.$route.path
          ? (wl(),
            _l(
              e6,
              {
                key: 2,
                class:
                  "mt-auto flex flex-shrink-0 flex-no-shrink h-52 py-5 mx-5 text-4xl",
              },
              {
                default: en(() => [
                  e2.pix
                    ? (wl(),
                      _l(
                        "div",
                        {
                          key: 0,
                          onClick:
                            e0[1] ||
                            (e0[1] = (e0) => e$.$router.push("/bank/pix")),
                          class:
                            "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                        },
                        [ew, tw],
                      ))
                    : Ml("", !0),
                  Pl(
                    "div",
                    {
                      onClick:
                        e0[2] ||
                        (e0[2] = (e0) => e$.$router.push("/bank/transfer")),
                      class:
                        "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                    },
                    [nw, lw],
                  ),
                  Pl(
                    "div",
                    {
                      onClick:
                        e0[3] ||
                        (e0[3] = (e0) => e$.$router.push("/bank/statements")),
                      class:
                        "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                    },
                    [aw, sw],
                  ),
                  e2.hasInvoices
                    ? (wl(),
                      _l(
                        "div",
                        {
                          key: 1,
                          onClick:
                            e0[4] ||
                            (e0[4] = (e0) =>
                              e$.$router.push("/bank/invoices/create")),
                          class:
                            "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                        },
                        [ow, rw],
                      ))
                    : Ml("", !0),
                  e2.hasInvoices
                    ? (wl(),
                      _l(
                        "div",
                        {
                          key: 2,
                          onClick:
                            e0[5] ||
                            (e0[5] = (e0) => e$.$router.push("/bank/invoices")),
                          class:
                            "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                        },
                        [iw, cw],
                      ))
                    : Ml("", !0),
                  e2.hasFines
                    ? (wl(),
                      _l(
                        "div",
                        {
                          key: 3,
                          onClick:
                            e0[6] ||
                            (e0[6] = (e0) => e$.$router.push("/bank/fines")),
                          class:
                            "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6",
                        },
                        [uw, dw],
                      ))
                    : Ml("", !0),
                ]),
                _: 1,
              },
            ))
          : Ml("", !0),
      ],
      8,
      ["bankType"],
    )
  );
};
const pw = {
    components: {
      Page: Bk,
    },
    setup() {
      (jl("setDark")(!0), jl("alert"));
      let e$ = So.identity,
        e0 = rt(!0),
        e8 = rt(0),
        e2 = rt(0),
        e3 = rt(0),
        e1 = rt(So.hasNotificationFor("bank"));
      return (
        So.backend.bank_index().then((e$) => {
          ((e8.value = e$.balance),
            (e3.value = e$.fines),
            (e2.value = e$.invoices));
        }),
        Tn(e1, (e$) => So.setNotificationFor("bank", e$)),
        So.onceRoute("BANK", ({ value: e$ }) => jk(e8, e8.value + e$)),
        {
          identity: e$,
          notifications: e1,
          visible: e0,
          balance: e8,
          invoices: e2,
          fines: e3,
          isEnabled: function (e$) {
            var e0;
            return !(null == (e0 = So.settings.disabledApps)
              ? void 0
              : e0.includes(e$));
          },
        }
      );
    },
  },
  fw = {
    class: "p-5 flex-1 flex flex-col",
  },
  mw = {
    class: "flex justify-between items-center",
  },
  hw = {
    class: "text-5xl font-bold relative-white",
  },
  bw = {
    class: "flex",
  },
  gw = {
    class: "mt-6 p-8 bg-white rounded-lg",
  },
  vw = Pl(
    "span",
    {
      class: "block mb-5 text-gray-600",
    },
    [
      Pl("i", {
        class: "fal fa-coins",
      }),
      Pl(
        "span",
        {
          class: "ml-5",
        },
        "Conta",
      ),
    ],
    -1,
  ),
  xw = Pl(
    "h1",
    {
      class: "text-gray-600 text-3xl mb-5",
    },
    "Saldo dispon\xedvel",
    -1,
  ),
  yw = {
    key: 0,
    class: "text-6xl h-16 font-bold",
  },
  kw = {
    key: 1,
    class: "bg-gray-200 h-16",
  },
  ww = {
    key: 0,
    class: "mt-6 p-8 bg-white rounded-lg",
  },
  Cw = Pl(
    "span",
    {
      class: "block mb-5 text-gray-600",
    },
    [
      Pl("i", {
        class: "fal fa-file-invoice",
      }),
      Pl(
        "span",
        {
          class: "ml-5",
        },
        "Faturas",
      ),
    ],
    -1,
  ),
  _w = Pl(
    "h1",
    {
      class: "text-gray-600 text-3xl mb-5",
    },
    "Fatura atual",
    -1,
  ),
  Aw = {
    key: 0,
    class: "text-6xl h-16 font-bold text-red-600",
  },
  Sw = {
    key: 1,
    class: "bg-gray-200 h-16",
  },
  Tw = {
    key: 1,
    class: "mt-6 p-8 bg-white rounded-lg",
  },
  Ew = Pl(
    "span",
    {
      class: "block mb-5 text-gray-600",
    },
    [
      Pl("i", {
        class: "fal fa-gavel",
      }),
      Pl(
        "span",
        {
          class: "ml-5",
        },
        "Multas",
      ),
    ],
    -1,
  ),
  Rw = Pl(
    "h1",
    {
      class: "text-gray-600 text-3xl mb-5",
    },
    "Fatura atual",
    -1,
  ),
  Pw = {
    key: 0,
    class: "text-6xl h-16 font-bold text-red-600",
  },
  Lw = {
    key: 1,
    class: "bg-gray-200 h-16",
  };
pw.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(e6, null, {
      default: en(() => [
        Pl("div", fw, [
          Pl("div", mw, [
            Pl("h1", hw, "Ol\xe1, " + g(e2.identity.name), 1),
            Pl("div", bw, [
              Pl(
                "button",
                {
                  onClick:
                    e0[1] ||
                    (e0[1] = (e$) => (e2.notifications = !e2.notifications)),
                  class:
                    "text-white bank-light w-16 h-16 flex flex-center rounded-full mr-2",
                },
                [
                  Pl(
                    "i",
                    {
                      class: [
                        "far",
                        e2.notifications ? "fa-bell" : "fa-bell-slash",
                      ],
                    },
                    null,
                    2,
                  ),
                ],
              ),
              Pl(
                "button",
                {
                  onClick:
                    e0[2] || (e0[2] = (e$) => (e2.visible = !e2.visible)),
                  class:
                    "text-white bank-light w-16 h-16 flex flex-center rounded-full",
                },
                [
                  Pl(
                    "i",
                    {
                      class: ["far", e2.visible ? "fa-eye" : "fa-eye-slash"],
                    },
                    null,
                    2,
                  ),
                ],
              ),
            ]),
          ]),
          Pl("div", null, [
            Pl("div", gw, [
              vw,
              xw,
              e2.visible
                ? (wl(), _l("h3", yw, g(e$.$filters.intToMoney(e2.balance)), 1))
                : (wl(), _l("div", kw)),
            ]),
            e2.isEnabled("invoice")
              ? (wl(),
                _l("div", ww, [
                  Cw,
                  _w,
                  e2.visible
                    ? (wl(),
                      _l("h3", Aw, g(e$.$filters.intToMoney(e2.invoices)), 1))
                    : (wl(), _l("div", Sw)),
                ]))
              : Ml("", !0),
            e2.isEnabled("fines")
              ? (wl(),
                _l("div", Tw, [
                  Ew,
                  Rw,
                  e2.visible
                    ? (wl(),
                      _l("h3", Pw, g(e$.$filters.intToMoney(e2.fines)), 1))
                    : (wl(), _l("div", Lw)),
                ]))
              : Ml("", !0),
          ]),
        ]),
      ]),
      _: 1,
    })
  );
};
const Iw = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = cc(),
        e0 = jl("alert"),
        e8 = rt(0),
        e2 = rt(0),
        e3 = rt("0"),
        e1 = rt("0");
      return (
        Tn(e3, (e$) => {
          let e0 = Number(e$.replace(/\D/g, ""));
          e3.value = (e0 > e2.value ? e2.value : e0).toLocaleString("pt-BR");
        }),
        So.backend.bank_getBalance().then((e$) => (e2.value = e$)),
        {
          step: e8,
          balance: e2,
          value: e3,
          key: e1,
          submit: function () {
            let e8 = Number(e3.value.replace(/\D/g, ""));
            So.confirm(
              "Deseja transferir " + js(e8) + " para a chave " + e1.value + "?",
            ).then((e2) => {
              e2 &&
                So.lockAndProceed(() =>
                  So.backend.bank_pix(e1.value, e8).then((e2) => {
                    e2.error
                      ? e0(e2.error)
                      : e$.replace({
                          path: "/bank/receipt",
                          query: {
                            name: e1.value,
                            value: e8,
                          },
                        });
                  }),
                );
            });
          },
        }
      );
    },
  },
  Ow = sn("data-v-2b331752");
ln("data-v-2b331752");
const Mw = {
    class: "mt-auto flex-1 bg-white relative",
  },
  Vw = Pl(
    "i",
    {
      class: "fal fa-times text-4xl text-gray-600",
    },
    null,
    -1,
  ),
  Dw = {
    key: 0,
  },
  Nw = {
    class: "p-5",
  },
  Uw = Pl(
    "h1",
    {
      class: "font-semibold",
    },
    "Qual \xe9 o valor da transfer\xeancia?",
    -1,
  ),
  $w = {
    class: "mt-4 text-3xl",
  },
  jw = Il("Saldo dispon\xedvel em conta "),
  Fw = {
    class: "p-5 text-5xl",
  },
  zw = {
    class: "relative",
  },
  Bw = {
    class: "absolute bottom-1.5 font-bold",
  },
  Hw = Pl(
    "i",
    {
      class: "fas fa-arrow-right",
    },
    null,
    -1,
  ),
  qw = {
    key: 1,
  },
  Gw = {
    class: "p-5",
  },
  Ww = Pl(
    "label",
    {
      class: "text-gray-700 font-semibold",
    },
    "Chave Pix",
    -1,
  ),
  Kw = {
    key: 0,
    class: "absolute inset-x-8 bottom-8",
  },
  Jw = {
    key: 2,
  },
  Xw = {
    class: "p-8",
  },
  Yw = Pl(
    "img",
    {
      class: "w-1/3 mb-8 bank-from-pink-filter",
      src: "https://i.imgur.com/2BHyIED.jpg",
    },
    null,
    -1,
  ),
  Zw = Pl(
    "h1",
    {
      class: "font-semibold",
    },
    "Pronto, enviamos sua transfer\xeancia",
    -1,
  ),
  Qw = {
    class: "flex flex-col items-center mt-8 p-4 py-12 border",
  },
  eC = {
    class: "font-bold text-5xl",
  },
  tC = {
    class: "mt-8 text-2xl",
  },
  nC = Pl(
    "span",
    {
      class: "text-gray-600",
    },
    "Agora mesmo",
    -1,
  );
an();
const lC = Ow((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: Ow(() => [
          Pl("div", Mw, [
            Pl(
              "button",
              {
                class: "p-5 mt-8",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [Vw],
            ),
            0 == e2.step
              ? (wl(),
                _l("div", Dw, [
                  Pl("div", Nw, [
                    Uw,
                    Pl("p", $w, [
                      jw,
                      Pl(
                        "strong",
                        null,
                        g(e$.$currency) +
                          " " +
                          g(e2.balance.toLocaleString("pt-BR")),
                        1,
                      ),
                    ]),
                  ]),
                  Pl("div", Fw, [
                    Pl("div", zw, [
                      Pl("span", Bw, g(e$.$currency), 1),
                      Zn(
                        Pl(
                          "input",
                          {
                            onKeydown:
                              e0[2] ||
                              (e0[2] = us(
                                (e$) => (0 != e2.value ? (e2.step = 1) : null),
                                ["enter"],
                              )),
                            "onUpdate:modelValue":
                              e0[3] || (e0[3] = (e$) => (e2.value = e$)),
                            class: "w-full font-bold border-b pl-20",
                          },
                          null,
                          544,
                        ),
                        [[ns, e2.value]],
                      ),
                    ]),
                  ]),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[4] ||
                        (e0[4] = (e$) =>
                          0 != e2.value ? (e2.step = 1) : null),
                      class: [
                        "absolute bottom-8 right-8 flex flex-center w-24 h-24 rounded-full",
                        {
                          "bg-gray-100 text-gray-400": 0 == e2.value,
                          "bank-light text-white": 0 != e2.value,
                        },
                      ],
                    },
                    [Hw],
                    2,
                  ),
                ]))
              : 1 == e2.step
                ? (wl(),
                  _l("div", qw, [
                    Pl("div", Gw, [
                      Ww,
                      Zn(
                        Pl(
                          "input",
                          {
                            "onUpdate:modelValue":
                              e0[5] || (e0[5] = (e$) => (e2.key = e$)),
                            class: "w-full mt-8 pb-2 border-b font-bold",
                          },
                          null,
                          512,
                        ),
                        [[ns, e2.key]],
                      ),
                    ]),
                    e2.key.trim()
                      ? (wl(),
                        _l("div", Kw, [
                          Pl(
                            "button",
                            {
                              onClick:
                                e0[6] ||
                                (e0[6] = (...e$) =>
                                  e2.submit && e2.submit(...e$)),
                              class:
                                "w-full rounded-full bank-light text-white p-5",
                            },
                            " Transferir para essa chave ",
                          ),
                        ]))
                      : Ml("", !0),
                  ]))
                : 2 == e2.step
                  ? (wl(),
                    _l("div", Jw, [
                      Pl("div", Xw, [
                        Yw,
                        Zw,
                        Pl("div", Qw, [
                          Pl("p", eC, g(e$.$currency) + " " + g(e2.value), 1),
                          Pl("p", null, "para " + g(e$.name), 1),
                          Pl("p", tC, [nC, Il(" • " + g(e$.time), 1)]),
                        ]),
                      ]),
                    ]))
                  : Ml("", !0),
          ]),
        ]),
        _: 1,
      },
    )
  );
});
((Iw.render = lC), (Iw.__scopeId = "data-v-2b331752"));
const aC = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = cc(),
        e0 = jl("alert"),
        e8 = rt(0),
        e2 = rt(1),
        e3 = rt("0"),
        e1 = rt("0");
      return (
        Tn(e3, (e$) => {
          let e0 = Number(e$.replace(/\D/g, ""));
          e3.value = (e0 > e2.value ? e2.value : e0).toLocaleString("pt-BR");
        }),
        So.backend.bank_getBalance().then((e$) => (e2.value = e$)),
        {
          step: e8,
          balance: e2,
          value: e3,
          passport: e1,
          submit: async function () {
            let e8 = Number(e3.value.replace(/\D/g, "")),
              { name: e2, error: e6 } = await So.backend.bank_confirm(e1.value);
            if (!e2) return So.alert(e6);
            So.confirm(
              "Deseja transferir " + js(e8) + " para " + e2 + "?",
            ).then((e3) => {
              e3 &&
                So.lockAndProceed(() =>
                  So.backend.bank_transfer(e1.value, e8).then((e3) => {
                    e3.error
                      ? e0(e3.error)
                      : e$.replace({
                          path: "/bank/receipt",
                          query: {
                            name: e2,
                            value: e8,
                          },
                        });
                  }),
                );
            });
          },
        }
      );
    },
  },
  sC = sn("data-v-2062cc68");
ln("data-v-2062cc68");
const oC = {
    class: "mt-auto flex-1 bg-white relative",
  },
  rC = Pl(
    "i",
    {
      class: "fal fa-times text-4xl text-gray-600",
    },
    null,
    -1,
  ),
  iC = {
    key: 0,
  },
  cC = {
    class: "p-5",
  },
  uC = Pl(
    "h1",
    {
      class: "font-semibold",
    },
    "Qual \xe9 o valor da transfer\xeancia?",
    -1,
  ),
  dC = {
    class: "mt-4 text-3xl",
  },
  pC = Il("Saldo dispon\xedvel em conta "),
  fC = {
    class: "p-5 text-5xl",
  },
  mC = {
    class: "relative",
  },
  hC = {
    class: "absolute bottom-1.5 font-bold",
  },
  bC = Pl(
    "i",
    {
      class: "fas fa-arrow-right",
    },
    null,
    -1,
  ),
  gC = {
    key: 1,
  },
  vC = {
    class: "p-5",
  },
  xC = Pl(
    "label",
    {
      class: "text-gray-700 font-semibold",
    },
    "Passaporte",
    -1,
  ),
  yC = Pl(
    "button",
    {
      class: "w-full rounded-full bank-light text-white p-5",
    },
    " Transferir para esse passaporte ",
    -1,
  );
an();
const kC = sC((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: sC(() => [
          Pl("div", oC, [
            Pl(
              "button",
              {
                class: "p-5 mt-8",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [rC],
            ),
            0 == e2.step
              ? (wl(),
                _l("div", iC, [
                  Pl("div", cC, [
                    uC,
                    Pl("p", dC, [
                      pC,
                      Pl(
                        "strong",
                        null,
                        g(e$.$currency) +
                          " " +
                          g(e2.balance.toLocaleString("pt-BR")),
                        1,
                      ),
                    ]),
                  ]),
                  Pl("div", fC, [
                    Pl("div", mC, [
                      Pl("span", hC, g(e$.$currency), 1),
                      Zn(
                        Pl(
                          "input",
                          {
                            onKeydown:
                              e0[2] ||
                              (e0[2] = us(
                                (e$) => (0 != e2.value ? (e2.step = 1) : null),
                                ["enter"],
                              )),
                            "onUpdate:modelValue":
                              e0[3] || (e0[3] = (e$) => (e2.value = e$)),
                            class: "w-full font-bold border-b pl-20",
                          },
                          null,
                          544,
                        ),
                        [[ns, e2.value]],
                      ),
                    ]),
                  ]),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[4] ||
                        (e0[4] = (e$) =>
                          0 != e2.value ? (e2.step = 1) : null),
                      class: [
                        "absolute bottom-8 right-8 flex flex-center w-24 h-24 rounded-full",
                        {
                          "bg-gray-100 text-gray-400": 0 == e2.value,
                          "bank-light text-white": 0 != e2.value,
                        },
                      ],
                    },
                    [bC],
                    2,
                  ),
                ]))
              : 1 == e2.step
                ? (wl(),
                  _l("div", gC, [
                    Pl("div", vC, [
                      xC,
                      Zn(
                        Pl(
                          "input",
                          {
                            "onUpdate:modelValue":
                              e0[5] || (e0[5] = (e$) => (e2.passport = e$)),
                            class: "w-full mt-8 pb-2 border-b font-bold",
                          },
                          null,
                          512,
                        ),
                        [[ns, e2.passport]],
                      ),
                    ]),
                    e2.passport >= 0
                      ? (wl(),
                        _l(
                          "div",
                          {
                            key: 0,
                            onClick:
                              e0[6] ||
                              (e0[6] = (...e$) =>
                                e2.submit && e2.submit(...e$)),
                            class: "absolute inset-x-8 bottom-8",
                          },
                          [yC],
                        ))
                      : Ml("", !0),
                  ]))
                : Ml("", !0),
          ]),
        ]),
        _: 1,
      },
    )
  );
});
((aC.render = kC), (aC.__scopeId = "data-v-2062cc68"));
const wC = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = uc(),
        { name: e0, value: e8 } = e$.query;
      e8 = Number(e8).toLocaleString("pt-BR");
      let e2 = new Date();
      return {
        name: e0,
        value: e8,
        time: e2.getHours() + "h" + String(e2.getMinutes()).padStart(2, 0),
      };
    },
  },
  CC = sn("data-v-180baeb8");
ln("data-v-180baeb8");
const _C = {
    class: "mt-auto flex-1 bg-white relative",
  },
  AC = Pl(
    "i",
    {
      class: "fal fa-times text-4xl text-gray-600",
    },
    null,
    -1,
  ),
  SC = {
    class: "p-8",
  },
  TC = Pl(
    "img",
    {
      class: "w-1/3 mb-8 bank-from-pink-filter",
      src: "https://i.imgur.com/2BHyIED.jpg",
    },
    null,
    -1,
  ),
  EC = Pl(
    "h1",
    {
      class: "font-semibold",
    },
    "Pronto, enviamos sua transfer\xeancia",
    -1,
  ),
  RC = {
    class: "flex flex-col items-center mt-8 p-4 py-12 border",
  },
  PC = {
    class: "font-bold text-5xl",
  },
  LC = {
    class: "mt-8 text-2xl",
  },
  IC = Pl(
    "span",
    {
      class: "text-gray-600",
    },
    "Agora mesmo",
    -1,
  );
an();
const OC = CC((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: CC(() => [
          Pl("div", _C, [
            Pl(
              "button",
              {
                class: "p-5 mt-8",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [AC],
            ),
            Pl("div", null, [
              Pl("div", SC, [
                TC,
                EC,
                Pl("div", RC, [
                  Pl("p", PC, g(e$.$currency) + " " + g(e2.value), 1),
                  Pl("p", null, "para " + g(e2.name), 1),
                  Pl("p", LC, [IC, Il(" • " + g(e2.time), 1)]),
                ]),
              ]),
            ]),
          ]),
        ]),
        _: 1,
      },
    )
  );
});
((wC.render = OC), (wC.__scopeId = "data-v-180baeb8"));
const MC = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = rt(0),
        e0 = rt([]);
      return (
        So.backend.bank_getBalance().then((e0) => (e$.value = e0)),
        So.backend
          .bank_extract()
          .then(
            (e$) =>
              (e0.value = e$.map(
                (e$) => (
                  (e$.description = e$.description.replace(/<[^>]*>/g, "")),
                  e$
                ),
              )),
          ),
        {
          balance: e$,
          statements: e0,
        }
      );
    },
  },
  VC = {
    class: "flex flex-col items-start bg-white h-full pt-12",
  },
  DC = Pl(
    "i",
    {
      class: "far fa-chevron-left",
    },
    null,
    -1,
  ),
  NC = {
    class: "p-8",
  },
  UC = Pl(
    "h1",
    {
      class: "text-gray-600",
    },
    "Saldo dispon\xedvel",
    -1,
  ),
  $C = {
    class: "mt-2 font-bold text-5xl",
  },
  jC = Pl(
    "hr",
    {
      class: "w-full",
    },
    null,
    -1,
  ),
  FC = {
    class: "flex flex-col h-full w-full overflow-y-auto hide-scroll",
  },
  zC = Pl(
    "h1",
    {
      class: "font-bold text-4xl px-8 pt-8 pb-4",
    },
    "Hist\xf3rico",
    -1,
  ),
  BC = {
    key: 0,
    class: "text-xl text-gray-400",
  },
  HC = {
    key: 0,
    class: "mt-8 text-center text-3xl",
  },
  qC = Pl(
    "i",
    {
      class: "fal fa-history",
    },
    null,
    -1,
  ),
  GC = Il(" Nenhuma atividade recente ");
MC.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: en(() => [
          Pl("div", VC, [
            Pl(
              "button",
              {
                class: "p-8 text-gray-600",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [DC],
            ),
            Pl("div", NC, [
              UC,
              Pl(
                "h1",
                $C,
                g(e$.$currency) + " " + g(e2.balance.toLocaleString("pt-BR")),
                1,
              ),
            ]),
            jC,
            Pl("div", FC, [
              zC,
              Pl("ul", null, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(
                    e2.statements,
                    (e$, e0) => (
                      wl(),
                      _l(
                        "li",
                        {
                          key: e0,
                          class: "p-4 px-8 border-b",
                        },
                        [
                          Pl("p", null, g(e$.description), 1),
                          e$.created_at
                            ? (wl(), _l("p", BC, g(e$.created_at), 1))
                            : Ml("", !0),
                        ],
                      )
                    ),
                  ),
                  128,
                )),
                e2.statements.length
                  ? Ml("", !0)
                  : (wl(), _l("p", HC, [qC, GC])),
              ]),
            ]),
          ]),
        ]),
        _: 1,
      },
    )
  );
};
const WC = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = jl("alert"),
        e0 = rt("received"),
        e8 = rt(0),
        e2 = rt([]),
        e3 = da(() =>
          e2.value.filter(
            (e$) =>
              ("sent" === e0.value ? e$.payee_id : e$.payer_id) ===
              So.identity.user_id,
          ),
        );
      return (
        So.backend.bank_getBalance().then((e$) => (e8.value = e$)),
        So.backend.bank_getInvoices().then((e$) => (e2.value = e$)),
        {
          balance: e8,
          invoices: e2,
          filtered: e3,
          pay: function (e0) {
            So.backend.bank_payInvoice(e0.id).then((e3) => {
              if (null == e3 ? void 0 : e3.error) e$(e3.error);
              else {
                jk(e8, Math.max(0, e8.value - e0.value));
                let e1 = e2.value.indexOf(e0);
                e2.value.splice(e1, 1);
              }
            });
          },
          tab: e0,
        }
      );
    },
  },
  KC = {
    class: "flex flex-col items-start h-full bg-white",
  },
  JC = Pl(
    "i",
    {
      class: "far fa-chevron-left",
    },
    null,
    -1,
  ),
  XC = {
    class: "px-8 pb-8 w-full border-b",
  },
  YC = Pl(
    "h1",
    {
      class: "text-4xl text-gray-600 font-semibold",
    },
    "Saldo dispon\xedvel",
    -1,
  ),
  ZC = {
    class: "mt-4 text-5xl font-bold",
  },
  QC = {
    class: "grid grid-cols-2 w-full text-3xl border-b",
  },
  e_ = {
    class: "flex-1 w-full overflow-y-auto hide-scroll",
  },
  t_ = {
    class: "flex-1",
  },
  n_ = {
    class: "break-words text-3xl",
  },
  l_ = {
    class: "text-gray-500 text-xl",
  },
  a_ = {
    class: "ml-auto text-red-500 font-semibold px-4",
  },
  s_ = {
    key: 0,
    class: "mt-8 text-center text-3xl",
  },
  o_ = Pl(
    "i",
    {
      class: "fal fa-file-invoice-dollar",
    },
    null,
    -1,
  ),
  r_ = Il(" Nenhuma fatura em aberto ");
WC.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: en(() => [
          Pl("div", KC, [
            Pl(
              "button",
              {
                class: "p-8 pt-16 text-gray-600",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [JC],
            ),
            Pl("div", XC, [
              YC,
              Pl(
                "p",
                ZC,
                g(e$.$currency) + " " + g(e2.balance.toLocaleString("pt-BR")),
                1,
              ),
            ]),
            Pl("div", QC, [
              Pl(
                "button",
                {
                  onClick: e0[2] || (e0[2] = (e$) => (e2.tab = "received")),
                  class: [
                    {
                      "bank-light text-white": "received" === e2.tab,
                    },
                    "p-4 text-center font-bold border-r",
                  ],
                },
                "Recebidas",
                2,
              ),
              Pl(
                "button",
                {
                  onClick: e0[3] || (e0[3] = (e$) => (e2.tab = "sent")),
                  class: [
                    {
                      "bank-light text-white": "sent" === e2.tab,
                    },
                    "p-4 text-center font-bold",
                  ],
                },
                "Enviadas",
                2,
              ),
            ]),
            Pl("ul", e_, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.filtered,
                  (e0, e8) => (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e8,
                        class: "flex items-center px-4 py-4 border-b",
                      },
                      [
                        Pl("div", t_, [
                          Pl("h1", n_, g(e0.reason), 1),
                          Pl(
                            "p",
                            l_,
                            g(e0.name) +
                              " - " +
                              g(e$.$filters.unixToRelative(e0.created_at)),
                            1,
                          ),
                        ]),
                        Pl(
                          "p",
                          a_,
                          g(e$.$currency) +
                            " " +
                            g(e0.value.toLocaleString("pt-BR")),
                          1,
                        ),
                        "received" === e2.tab
                          ? (wl(),
                            _l(
                              "button",
                              {
                                key: 0,
                                onClick: (e$) => e2.pay(e0),
                                class:
                                  "bank-light text-white px-6 py-2 rounded-xl",
                              },
                              " Pagar ",
                              8,
                              ["onClick"],
                            ))
                          : Ml("", !0),
                      ],
                    )
                  ),
                ),
                128,
              )),
              e2.filtered.length ? Ml("", !0) : (wl(), _l("p", s_, [o_, r_])),
            ]),
          ]),
        ]),
        _: 1,
      },
    )
  );
};
const i_ = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = jl("alert"),
        e0 = jl("setLoading"),
        e8 = rt(0),
        e2 = rt(0),
        e3 = rt(""),
        e1 = rt(1),
        e6 = rt({});
      return (
        Tn(e2, (e$) => {
          e2.value = Number(e$.replace(/\D/g, "")).toLocaleString("pt-BR");
        }),
        {
          step: e1,
          submit: function () {
            let e4 = Number(e2.value.replace(/\D/g, ""));
            (e0(!0),
              So.backend
                .bank_storeInvoice(e8.value, e4, e3.value)
                .then((e0) => {
                  if (e0.error) e$(e0.error);
                  else {
                    let e8 = new Date();
                    ((e0.time =
                      e8.getHours() +
                      "h" +
                      String(e8.getMinutes()).padStart(2, 0)),
                      (e6.value = e0),
                      (e1.value = 2));
                  }
                })
                .finally(() => e0(!1)));
          },
          passport: e8,
          value: e2,
          reason: e3,
          receipt: e6,
        }
      );
    },
  },
  c_ = {
    class: "h-full bg-white",
  },
  u_ = Pl(
    "i",
    {
      class: "far fa-chevron-left",
    },
    null,
    -1,
  ),
  d_ = {
    key: 0,
  },
  p_ = {
    class: "p-8",
  },
  f_ = Pl(
    "label",
    {
      class: "text-3xl text-gray-500",
    },
    "Passaporte",
    -1,
  ),
  m_ = {
    class: "px-8 pb-8",
  },
  h_ = Pl(
    "label",
    {
      class: "text-3xl text-gray-500",
    },
    "Valor da fatura",
    -1,
  ),
  b_ = {
    class: "mt-4 relative text-5xl",
  },
  g_ = {
    class: "absolute bottom-1.5 font-bold",
  },
  v_ = {
    class: "px-8",
  },
  x_ = Pl(
    "label",
    {
      class: "text-3xl text-gray-500",
    },
    "Raz\xe3o",
    -1,
  ),
  y_ = Pl(
    "button",
    {
      class: "w-full rounded-full bank-light text-white p-5",
    },
    " Criar fatura ",
    -1,
  ),
  k_ = {
    key: 1,
    class: "p-8",
  },
  w_ = Pl(
    "img",
    {
      class: "w-1/3 mb-8 bank-from-pink-filter",
      src: "https://i.imgur.com/2BHyIED.jpg",
    },
    null,
    -1,
  ),
  C_ = Pl(
    "h1",
    {
      class: "font-semibold",
    },
    "Pronto, enviamos sua fatura",
    -1,
  ),
  __ = {
    class: "flex flex-col items-center mt-8 p-4 py-12 border",
  },
  A_ = {
    class: "font-bold text-5xl",
  },
  S_ = {
    class: "mt-8 text-2xl",
  },
  T_ = Pl(
    "span",
    {
      class: "text-gray-600",
    },
    "Agora mesmo",
    -1,
  );
i_.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: en(() => [
          Pl("div", c_, [
            Pl(
              "button",
              {
                class: "p-8 pt-16 text-gray-600",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [u_],
            ),
            1 == e2.step
              ? (wl(),
                _l("div", d_, [
                  Pl("div", p_, [
                    f_,
                    Zn(
                      Pl(
                        "input",
                        {
                          "onUpdate:modelValue":
                            e0[2] || (e0[2] = (e$) => (e2.passport = e$)),
                          maxlength: 11,
                          class: "w-full mt-4 font-bold border-b text-5xl",
                        },
                        null,
                        512,
                      ),
                      [[ns, e2.passport]],
                    ),
                  ]),
                  Pl("div", m_, [
                    h_,
                    Pl("div", b_, [
                      Pl("span", g_, g(e$.$currency), 1),
                      Zn(
                        Pl(
                          "input",
                          {
                            "onUpdate:modelValue":
                              e0[3] || (e0[3] = (e$) => (e2.value = e$)),
                            maxlength: 11,
                            class: "w-full font-bold border-b pl-20",
                          },
                          null,
                          512,
                        ),
                        [[ns, e2.value]],
                      ),
                    ]),
                  ]),
                  Pl("div", v_, [
                    x_,
                    Zn(
                      Pl(
                        "input",
                        {
                          "onUpdate:modelValue":
                            e0[4] || (e0[4] = (e$) => (e2.reason = e$)),
                          maxlength: "100",
                          spellcheck: "false",
                          placeholder: "Raz\xe3o da fatura",
                          class: "w-full mt-4 font-bold text-4xl pb-2 border-b",
                        },
                        null,
                        512,
                      ),
                      [[ns, e2.reason]],
                    ),
                  ]),
                  e2.passport >= 0 && 0 != e2.value && e2.reason.trim()
                    ? (wl(),
                      _l(
                        "div",
                        {
                          key: 0,
                          onClick:
                            e0[5] ||
                            (e0[5] = (...e$) => e2.submit && e2.submit(...e$)),
                          class: "absolute inset-x-8 bottom-8",
                        },
                        [y_],
                      ))
                    : Ml("", !0),
                ]))
              : 2 == e2.step
                ? (wl(),
                  _l("div", k_, [
                    w_,
                    C_,
                    Pl("div", __, [
                      Pl(
                        "p",
                        A_,
                        g(e$.$currency) +
                          " " +
                          g(e2.receipt.value.toLocaleString("pt-BR")),
                        1,
                      ),
                      Pl("p", null, "para " + g(e2.receipt.name), 1),
                      Pl("p", S_, [T_, Il(" • " + g(e2.receipt.time), 1)]),
                    ]),
                  ]))
                : Ml("", !0),
          ]),
        ]),
        _: 1,
      },
    )
  );
};
const E_ = {
    components: {
      Page: Bk,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = jl("alert"),
        e0 = rt(0),
        e8 = rt([]);
      return (
        So.backend.bank_getBalance().then((e$) => (e0.value = e$)),
        So.backend.bank_getFines().then((e$) => (e8.value = e$)),
        {
          balance: e0,
          fines: e8,
          pay: function (e2) {
            So.backend.bank_payFine(e2.id).then((e3) => {
              if (null == e3 ? void 0 : e3.error) e$(e3.error);
              else {
                jk(e0, Math.max(0, e0.value - e2.total));
                let e1 = e8.value.indexOf(e2);
                e8.value.splice(e1, 1);
              }
            });
          },
        }
      );
    },
  },
  R_ = {
    class: "flex flex-col items-start h-full bg-white",
  },
  P_ = Pl(
    "i",
    {
      class: "far fa-chevron-left",
    },
    null,
    -1,
  ),
  L_ = {
    class: "px-8 pb-8 w-full border-b",
  },
  I_ = Pl(
    "h1",
    {
      class: "text-4xl text-gray-600 font-semibold",
    },
    "Saldo dispon\xedvel",
    -1,
  ),
  O_ = {
    class: "mt-4 text-5xl font-bold",
  },
  M_ = Pl(
    "p",
    {
      class: "px-8 py-8 font-bold text-3xl",
    },
    "Multas",
    -1,
  ),
  V_ = {
    class: "flex-1 w-full overflow-y-auto hide-scroll",
  },
  D_ = {
    class: "flex-1",
  },
  N_ = {
    class: "break-words text-3xl",
  },
  U_ = {
    class: "text-gray-500 text-xl",
  },
  $_ = {
    class: "ml-auto text-red-500 font-semibold px-4",
  },
  j_ = {
    key: 0,
    class: "mt-8 text-center text-3xl",
  },
  F_ = Pl(
    "i",
    {
      class: "fal fa-gavel",
    },
    null,
    -1,
  ),
  z_ = Il(" Nenhuma multa pendente ");
E_.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Page");
  return (
    wl(),
    _l(
      e6,
      {
        header: null,
      },
      {
        default: en(() => [
          Pl("div", R_, [
            Pl(
              "button",
              {
                class: "p-8 pt-16 text-gray-600",
                onClick:
                  e0[1] ||
                  (e0[1] = (...e0) =>
                    e$.$router.back && e$.$router.back(...e0)),
              },
              [P_],
            ),
            Pl("div", L_, [
              I_,
              Pl(
                "p",
                O_,
                g(e$.$currency) + " " + g(e2.balance.toLocaleString("pt-BR")),
                1,
              ),
            ]),
            M_,
            Pl("ul", V_, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.fines,
                  (e0, e8) => (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e8,
                        class: "flex items-center px-4 py-4 border-b",
                      },
                      [
                        Pl("div", D_, [
                          Pl("h1", N_, g(e0.description), 1),
                          Pl("p", U_, g(e0.created_at), 1),
                        ]),
                        Pl(
                          "p",
                          $_,
                          g(e$.$currency) +
                            " " +
                            g(e0.total.toLocaleString("pt-BR")),
                          1,
                        ),
                        Pl(
                          "button",
                          {
                            onClick: (e$) => e2.pay(e0),
                            class: "bank-light text-white px-6 py-2 rounded-xl",
                          },
                          " Pagar ",
                          8,
                          ["onClick"],
                        ),
                      ],
                    )
                  ),
                ),
                128,
              )),
              e2.fines.length ? Ml("", !0) : (wl(), _l("p", j_, [F_, z_])),
            ]),
          ]),
        ]),
        _: 1,
      },
    )
  );
};
const B_ = {
    setup() {
      jl("setDark")(!1);
      let e$ = jl("alert"),
        e0 = So.identity,
        e8 = rt(0),
        e2 = rt("resume"),
        e3 = rt(null),
        e1 = rt([]),
        e6 = rt(So.hasNotificationFor("paypal"));

      function e4(e0) {
        return ({ error: e2, transaction: e6 }) => {
          e2
            ? e$(e2)
            : (e1.value.unshift(e6),
              (e8.value += e0 * e6.value),
              e7(e6),
              "payment" === e6.type
                ? (e3.value = e6)
                : "deposit" === e6.type && (eN.bank -= e6.value));
        };
      }

      function e7(e$) {
        ((e2.value = "details"), (e3.value = e$));
      }
      (Tn(e6, (e$) => So.setNotificationFor("paypal", e$)),
        So.localhost &&
          e1.value.push({
            id: 1,
            user_id: 1,
            target: 1,
            value: 100,
            type: "deposit",
            created_at: Date.now() / 1e3,
          }),
        So.onceRoute("PAYPAL", ({ value: e$ }) => jk(e8, e8.value + e$)),
        (e4.add = e4(1)),
        (e4.rem = e4(-1)));
      let e5 = Ze({}),
        eV = Ze({}),
        eN = Ze({
          bank: 0,
        });
      So.backend.paypal_index().then((e$) => {
        ((e8.value = e$.balance),
          (eN.bank = e$.bank),
          (e1.value = e$.transactions));
      });
      let e9 = da(() => e1.value.find((e$) => "payment" === e$.type));
      return {
        isAndroid: So.settings.isAndroid,
        notifications: e6,
        identity: e0,
        action: e2,
        firstPayment: e9,
        payment: e3,
        openPayment: e7,
        balance: e8,
        extract: e1,
        send: e5,
        submitSend: function () {
          var e0;
          let e8 = parseInt(
            null == (e0 = e5.value) ? void 0 : e0.replace(/\D/g, ""),
          );
          e5.user_id
            ? e8
              ? So.lockAndProceed(() =>
                  So.backend
                    .paypal_send(e5.user_id, e8, e5.message)
                    .then(e4.rem),
                )
              : e$("Digite o valor a ser transferido")
            : e$("Digite o passaporte do jogador");
        },
        transfer: eV,
        submitTransfer: function () {
          var e0;
          let e8 = parseInt(
            null == (e0 = eV.value) ? void 0 : e0.replace(/\D/g, ""),
          );
          e8
            ? So.lockAndProceed(() =>
                So.backend.paypal_transfer(e8).then(e4.rem),
              )
            : e$("Digite o valor a ser transferido");
        },
        deposit: eN,
        submitDeposit: function () {
          var e0;
          let e8 = parseInt(
            null == (e0 = eN.value) ? void 0 : e0.replace(/\D/g, ""),
          );
          e8
            ? So.lockAndProceed(() =>
                So.backend.paypal_deposit(e8).then(e4.add),
              )
            : e$("Digite o valor de dep\xf3sito");
        },
      };
    },
  },
  H_ = {
    class: "flex flex-col h-full bg-white",
  },
  q_ = {
    class: "flex-shrink-0 h-32 pt-16 border-b",
  },
  G_ = {
    key: 0,
    class: "text-blue-400",
  },
  W_ = Pl(
    "i",
    {
      class: "fas fa-chevron-left",
    },
    null,
    -1,
  ),
  K_ = {
    key: 1,
    class: "far fa-arrow-left",
  },
  J_ = {
    key: 0,
    class: "flex-1 overflow-y-auto hide-scroll p-5 bg-gray-100",
  },
  X_ = {
    key: 0,
    class: "bg-paypal h-80 rounded-lg p-8 text-white",
  },
  Y_ = {
    class: "text-right",
  },
  Z_ = {
    class: "text-2xl",
  },
  Q_ = {
    class: "mt-6 text-4xl break-words",
  },
  eA = {
    class: "bg-white mt-5 p-5 rounded-xl shadow-xl",
  },
  tA = {
    class: "flex justify-between items-center",
  },
  nA = Pl(
    "h1",
    {
      class: "font-bold mb-2",
    },
    "Saldo do PayPal",
    -1,
  ),
  lA = {
    class: "align-top",
  },
  aA = {
    class: "ml-3 text-6xl",
  },
  sA = {
    class: "bg-white p-5 mt-8 rounded-xl shadow-xl",
  },
  oA = Pl(
    "i",
    {
      class: "far fa-list-ul mr-4",
    },
    null,
    -1,
  ),
  rA = Il(" Ver toda atividade "),
  iA = {
    key: 1,
    class: "flex-1 bg-gray-100 overflow-y-auto p-5",
  },
  cA = {
    class: "text-center",
  },
  uA = Pl(
    "svg",
    {
      class: "checkmark",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 52 52",
    },
    [
      Pl("circle", {
        class: "checkmark__circle",
        cx: "26",
        cy: "26",
        r: "25",
        fill: "none",
      }),
      Pl("path", {
        class: "checkmark__check",
        fill: "none",
        d: "M14.1 27.2l7.1 7.2 16.7-16.8",
      }),
    ],
    -1,
  ),
  dA = {
    class: "mt-3 px-3",
  },
  pA = {
    key: 0,
  },
  fA = {
    key: 1,
  },
  mA = {
    key: 2,
  },
  hA = {
    key: 3,
  },
  bA = {
    key: 0,
    class: "mt-10 border text-center bg-white rounded-xl",
  },
  gA = Pl(
    "h1",
    {
      class: "font-bold py-4",
    },
    "MENSAGEM",
    -1,
  ),
  vA = Pl("hr", null, null, -1),
  xA = {
    class: "block py-2 break-words",
  },
  yA = {
    class: "mt-10 border text-center bg-white rounded-xl",
  },
  kA = Pl(
    "h1",
    {
      class: "font-bold py-4",
    },
    "DATA",
    -1,
  ),
  wA = Pl("hr", null, null, -1),
  CA = {
    class: "block py-2",
  },
  _A = {
    class: "mt-10 border text-center bg-white rounded-xl",
  },
  AA = Pl(
    "h1",
    {
      class: "font-bold py-4",
    },
    "C\xd3DIGO DE TRANSA\xc7\xc3O",
    -1,
  ),
  SA = Pl("hr", null, null, -1),
  TA = {
    class: "block py-2",
  },
  EA = {
    key: 2,
    class: "flex-1 bg-gray-100 overflow-y-auto hide-scroll",
  },
  RA = {
    class: "w-16 h-16 bg-gray-400 rounded-full text-center py-2 text-gray-100",
  },
  PA = {
    key: 0,
    class: "fas fa-handshake",
  },
  LA = {
    key: 1,
    class: "fas fa-university",
  },
  IA = {
    key: 2,
    class: "fas fa-piggy-bank",
  },
  OA = {
    class: "flex flex-col ml-3",
  },
  MA = {
    class: "font-semibold",
  },
  VA = {
    class: "text-xl text-gray-400",
  },
  DA = {
    class: "ml-auto self-start",
  },
  NA = {
    key: 3,
    class: "flex-1 bg-gray-100 p-5",
  },
  UA = {
    class: "mt-10",
  },
  $A = {
    class: "text-xl",
  },
  jA = Il("Valor dispon\xedvel no paypal: "),
  FA = {
    class: "flex mt-5",
  },
  zA = {
    key: 4,
    class: "flex-1 bg-gray-100 p-5",
  },
  BA = {
    class: "text-xl",
  },
  HA = Il("Valor dispon\xedvel no paypal: "),
  qA = {
    class: "mt-10 text-right",
  },
  GA = {
    key: 5,
    class: "flex-1 bg-gray-100 p-5",
  },
  WA = {
    class: "text-xl",
  },
  KA = Il("Valor dispon\xedvel no banco: "),
  JA = {
    class: "mt-10 text-right",
  },
  XA = {
    class:
      "mt-auto h-32 flex-shrink-0 border-t shadow-2xl flex justify-around text-3xl",
  },
  YA = {
    class: "text-center mt-auto",
  },
  ZA = Pl(
    "i",
    {
      class: "fal fa-money-bill-wave-alt",
    },
    null,
    -1,
  ),
  QA = Pl(
    "span",
    {
      class: "block",
    },
    "Enviar",
    -1,
  ),
  eS = {
    class: "text-center mt-auto",
  },
  tS = Pl(
    "i",
    {
      class: "fal fa-university",
    },
    null,
    -1,
  ),
  nS = Pl(
    "span",
    {
      class: "block",
    },
    "Sacar",
    -1,
  ),
  lS = {
    class: "text-center mt-auto",
  },
  aS = Pl(
    "i",
    {
      class: "fal fa-piggy-bank",
    },
    null,
    -1,
  ),
  sS = Pl(
    "span",
    {
      class: "block",
    },
    "Depositar",
    -1,
  );
B_.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("app-input");
  return (
    wl(),
    _l("div", H_, [
      Pl("div", q_, [
        Pl(
          "button",
          {
            onClick:
              e0[1] ||
              (e0[1] = (e0) =>
                "resume" != e2.action
                  ? (e2.action = "resume")
                  : e$.$router.back()),
            class: "absolute top-16 left-0 px-4",
          },
          [
            e2.isAndroid
              ? (wl(), _l("i", K_))
              : (wl(),
                _l("span", G_, [
                  W_,
                  Il(" " + g("resume" == e2.action ? "Apps" : "Resumo"), 1),
                ])),
          ],
        ),
        Pl(
          "h1",
          {
            class: [
              "font-bold",
              {
                "ml-16": e2.isAndroid,
                "text-center": !e2.isAndroid,
              },
            ],
          },
          g(
            e2.isAndroid
              ? "resume" == e2.action
                ? e$.$filters.nameByApp.paypal
                : "Resumo"
              : e$.$filters.nameByApp.paypal,
          ),
          3,
        ),
      ]),
      "resume" == e2.action
        ? (wl(),
          _l("div", J_, [
            e2.firstPayment
              ? (wl(),
                _l("div", X_, [
                  Pl("div", Y_, [
                    Pl(
                      "span",
                      Z_,
                      g(
                        e$.$filters.unixToDayOfMonth(
                          e2.firstPayment.created_at,
                        ),
                      ),
                      1,
                    ),
                  ]),
                  Pl("p", Q_, [
                    Il(
                      g(
                        e2.firstPayment.user_id == e2.identity.user_id
                          ? "Voc\xea"
                          : e2.firstPayment.fullName,
                      ) + " enviou ",
                      1,
                    ),
                    Pl(
                      "b",
                      null,
                      g(e$.$filters.intToMoney(e2.firstPayment.value)),
                      1,
                    ),
                  ]),
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[2] ||
                        (e0[2] = (e$) => e2.openPayment(e2.firstPayment)),
                      class: "mt-8 border-2 px-6 py-1 rounded-full",
                    },
                    "Ver detalhes",
                  ),
                ]))
              : Ml("", !0),
            Pl("div", eA, [
              Pl("div", tA, [
                nA,
                Pl(
                  "button",
                  {
                    onClick:
                      e0[3] ||
                      (e0[3] = (e$) => (e2.notifications = !e2.notifications)),
                    class:
                      "text-white bg-paypal-light h-12 w-12 text-xl rounded-full",
                  },
                  [
                    Pl(
                      "i",
                      {
                        class: [
                          "far",
                          e2.notifications ? "fa-bell" : "fa-bell-slash",
                        ],
                      },
                      null,
                      2,
                    ),
                  ],
                ),
              ]),
              Pl("span", lA, g(e$.$currency), 1),
              Pl("span", aA, g(e2.balance.toLocaleString("pt-BR")), 1),
            ]),
            Pl("div", sA, [
              Pl(
                "button",
                {
                  class: "text-paypal-light",
                  onClick: e0[4] || (e0[4] = (e$) => (e2.action = "activity")),
                },
                [oA, rA],
              ),
            ]),
          ]))
        : "details" == e2.action
          ? (wl(),
            _l("div", iA, [
              Pl("div", cA, [
                uA,
                Pl("div", dA, [
                  "withdraw" === e2.payment.type
                    ? (wl(),
                      _l(
                        "p",
                        pA,
                        " Voc\xea sacou " +
                          g(e$.$filters.intToMoney(e2.payment.value)),
                        1,
                      ))
                    : "deposit" === e2.payment.type
                      ? (wl(),
                        _l(
                          "p",
                          fA,
                          " Voc\xea depositou " +
                            g(e$.$filters.intToMoney(e2.payment.value)),
                          1,
                        ))
                      : e2.payment.user_id === e2.identity.user_id
                        ? (wl(),
                          _l(
                            "p",
                            mA,
                            " Voc\xea enviou " +
                              g(e$.$filters.intToMoney(e2.payment.value)) +
                              " para " +
                              g(e2.payment.fullName),
                            1,
                          ))
                        : (wl(),
                          _l(
                            "p",
                            hA,
                            " Voc\xea recebeu " +
                              g(e$.$filters.intToMoney(e2.payment.value)) +
                              " de " +
                              g(e2.payment.fullName),
                            1,
                          )),
                ]),
              ]),
              e2.payment.description
                ? (wl(),
                  _l("div", bA, [
                    gA,
                    vA,
                    Pl("span", xA, g(e2.payment.description), 1),
                  ]))
                : Ml("", !0),
              Pl("div", yA, [
                kA,
                wA,
                Pl(
                  "span",
                  CA,
                  g(e$.$filters.unixToDatetime(e2.payment.created_at)),
                  1,
                ),
              ]),
              Pl("div", _A, [AA, SA, Pl("span", TA, g(e2.payment.id), 1)]),
            ]))
          : "activity" == e2.action
            ? (wl(),
              _l("div", EA, [
                Pl("ul", null, [
                  (wl(!0),
                  _l(
                    bl,
                    null,
                    fa(
                      e2.extract,
                      (e0) => (
                        wl(),
                        _l(
                          "li",
                          {
                            onClick: (e$) => e2.openPayment(e0),
                            key: e0.id,
                            class: "flex items-center border-b p-4 shadow",
                          },
                          [
                            Pl("div", RA, [
                              e0.user_id != e0.target
                                ? (wl(), _l("i", PA))
                                : "withdraw" == e0.type
                                  ? (wl(), _l("i", LA))
                                  : "deposit" == e0.type
                                    ? (wl(), _l("i", IA))
                                    : Ml("", !0),
                            ]),
                            Pl("div", OA, [
                              Pl(
                                "span",
                                MA,
                                g(
                                  "payment" == e0.type
                                    ? "Pagamento"
                                    : "withdraw" == e0.type
                                      ? "Saque"
                                      : "Dep\xf3sito",
                                ),
                                1,
                              ),
                              Pl(
                                "span",
                                VA,
                                g(e$.$filters.unixToDate(e0.created_at)),
                                1,
                              ),
                            ]),
                            Pl("div", DA, [
                              Pl(
                                "span",
                                {
                                  class: [
                                    "text-2xl",
                                    e0.user_id == e0.target &&
                                    "withdraw" == e0.type
                                      ? "text-red-500"
                                      : 0,
                                    e0.user_id != e0.target &&
                                    e0.user_id == e2.identity.user_id
                                      ? "text-red-500"
                                      : 0,
                                  ],
                                },
                                g(e$.$filters.intToMoney(e0.value)),
                                3,
                              ),
                            ]),
                          ],
                          8,
                          ["onClick"],
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ]))
            : "send" == e2.action
              ? (wl(),
                _l("div", NA, [
                  Pl(
                    e6,
                    {
                      modelValue: e2.send.user_id,
                      "onUpdate:modelValue":
                        e0[5] || (e0[5] = (e$) => (e2.send.user_id = e$)),
                      format: "int",
                      noborder: "1",
                      class: "bg-transparent border-b border-blue-400",
                      placeholder: "Passaporte",
                    },
                    null,
                    8,
                    ["modelValue"],
                  ),
                  Pl("div", UA, [
                    Pl(
                      e6,
                      {
                        modelValue: e2.send.value,
                        "onUpdate:modelValue":
                          e0[6] || (e0[6] = (e$) => (e2.send.value = e$)),
                        format: "money",
                        noborder: "1",
                        class: "bg-transparent border-b border-blue-400",
                        placeholder: "Valor a ser enviado",
                      },
                      null,
                      8,
                      ["modelValue"],
                    ),
                    Pl("small", $A, [
                      jA,
                      Pl("b", null, g(e$.$filters.intToMoney(e2.balance)), 1),
                    ]),
                  ]),
                  Pl("div", FA, [
                    Pl(
                      e6,
                      {
                        modelValue: e2.send.message,
                        "onUpdate:modelValue":
                          e0[7] || (e0[7] = (e$) => (e2.send.message = e$)),
                        class: "rounded-full px-6",
                        placeholder: "Deixa uma mensagem",
                        maxlength: "250",
                      },
                      null,
                      8,
                      ["modelValue"],
                    ),
                    Pl(
                      "button",
                      {
                        onClick:
                          e0[8] ||
                          (e0[8] = (...e$) =>
                            e2.submitSend && e2.submitSend(...e$)),
                        class:
                          "ml-4 p-4 px-8 bg-paypal-light text-white font-semibold rounded-full",
                      },
                      "Transferir",
                    ),
                  ]),
                ]))
              : "transfer" == e2.action
                ? (wl(),
                  _l("div", zA, [
                    Pl(
                      e6,
                      {
                        modelValue: e2.transfer.value,
                        "onUpdate:modelValue":
                          e0[9] || (e0[9] = (e$) => (e2.transfer.value = e$)),
                        noborder: "1",
                        format: "money",
                        placeholder: "Valor para transferir",
                        class: "bg-transparent border-b border-blue-400",
                      },
                      null,
                      8,
                      ["modelValue"],
                    ),
                    Pl("small", BA, [
                      HA,
                      Pl("b", null, g(e$.$filters.intToMoney(e2.balance)), 1),
                    ]),
                    Pl("div", qA, [
                      Pl(
                        "button",
                        {
                          onClick:
                            e0[10] ||
                            (e0[10] = (...e$) =>
                              e2.submitTransfer && e2.submitTransfer(...e$)),
                          class:
                            "bg-paypal-light p-4 px-8 text-white font-semibold rounded-full",
                        },
                        "Sacar",
                      ),
                    ]),
                  ]))
                : "deposit" == e2.action
                  ? (wl(),
                    _l("div", GA, [
                      Pl(
                        e6,
                        {
                          modelValue: e2.deposit.value,
                          "onUpdate:modelValue":
                            e0[11] ||
                            (e0[11] = (e$) => (e2.deposit.value = e$)),
                          noborder: "1",
                          format: "money",
                          placeholder: "Valor para depositar",
                          class: "bg-transparent border-b border-blue-400",
                        },
                        null,
                        8,
                        ["modelValue"],
                      ),
                      Pl("small", WA, [
                        KA,
                        Pl(
                          "b",
                          null,
                          g(e$.$filters.intToMoney(e2.deposit.bank)),
                          1,
                        ),
                      ]),
                      Pl("div", JA, [
                        Pl(
                          "button",
                          {
                            onClick:
                              e0[12] ||
                              (e0[12] = (...e$) =>
                                e2.submitDeposit && e2.submitDeposit(...e$)),
                            class:
                              "bg-paypal-light p-4 px-8 text-white font-semibold rounded-full",
                          },
                          "Depositar",
                        ),
                      ]),
                    ]))
                  : Ml("", !0),
      Pl("div", XA, [
        Pl("div", YA, [
          Pl(
            "button",
            {
              onClick: e0[13] || (e0[13] = (e$) => (e2.action = "send")),
              class: "bg-paypal-light text-white p-5 rounded-full",
            },
            [ZA],
          ),
          QA,
        ]),
        Pl("div", eS, [
          Pl(
            "button",
            {
              onClick: e0[14] || (e0[14] = (e$) => (e2.action = "transfer")),
              class: "bg-paypal-light text-white p-5 rounded-full",
            },
            [tS],
          ),
          nS,
        ]),
        Pl("div", lS, [
          Pl(
            "button",
            {
              onClick: e0[15] || (e0[15] = (e$) => (e2.action = "deposit")),
              class: "bg-paypal-light text-white p-5 rounded-full",
            },
            [aS],
          ),
          sS,
        ]),
      ]),
    ])
  );
};
const oS = {
    props: ["title"],
    setup: () => ({
      isAndroid: So.settings.isAndroid,
    }),
  },
  rS = {
    class: "h-32 pt-16 bg-olx text-white flex-shrink-0",
  },
  iS = {
    key: 0,
    class: "far fa-arrow-left",
  },
  cS = {
    key: 1,
    class: "fas fa-chevron-left",
  };
oS.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", rS, [
      Pl(
        "button",
        {
          onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
          class: "absolute top-16 left-0 px-4",
        },
        [e2.isAndroid ? (wl(), _l("i", iS)) : (wl(), _l("i", cS))],
      ),
      Pl(
        "h1",
        {
          class: [
            "font-bold",
            {
              "ml-16": e2.isAndroid,
              "text-center": !e2.isAndroid,
            },
          ],
        },
        g(e8.title || "OLX"),
        3,
      ),
    ])
  );
};
const uS = {
    props: ["data"],
    setup({ data: e$ }) {
      let e0 = So.identity.moderator,
        e8 = jl("confirm");
      return {
        moderator: e0,
        destroy: function () {
          e8("Deseja excluir este an\xfancio?").then((e0) => {
            e0 && So.backend.olx_destroy(e$.id).then(() => (e$.id = null));
          });
        },
      };
    },
  },
  dS = {
    key: 0,
  },
  pS = {
    class: "border-t border-b border-theme p-4",
  },
  fS = {
    class: "text-4xl break-words mb-4",
  },
  mS = {
    class: "flex justify-between items-end",
  },
  hS = {
    class: "block text-xl",
  },
  bS = {
    class: "flex",
  },
  gS = Pl(
    "i",
    {
      class: "fal fa-trash-alt",
    },
    null,
    -1,
  );
uS.render = function (e$, e0, e8, e2, e3, e1) {
  return e8.data.id
    ? (wl(),
      _l("div", dS, [
        Pl(
          "img",
          {
            src: e8.data.images[0],
            class: "w-full block",
            alt: "",
          },
          null,
          8,
          ["src"],
        ),
        Pl("div", pS, [
          Pl("h1", fS, g(e8.data.title), 1),
          Pl("div", mS, [
            Pl("strong", hS, g(e$.$filters.intToMoney(e8.data.price)), 1),
            Pl("div", bS, [
              e2.moderator
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      class: "mr-8 text-red-500",
                      onClick:
                        e0[1] ||
                        (e0[1] = (...e$) => e2.destroy && e2.destroy(...e$)),
                    },
                    [gS],
                  ))
                : Ml("", !0),
              Pl(
                "button",
                {
                  onClick:
                    e0[2] ||
                    (e0[2] = (e0) => e$.$router.push("/olx/" + e8.data.id)),
                  class: "bg-olx px-6 py-2 text-white rounded-xl",
                },
                " Ver mais ",
              ),
            ]),
          ]),
        ]),
      ]))
    : Ml("", !0);
};
const vS = {},
  xS = {
    class:
      "absolute bottom-0 left-0 right-0 h-32 bg-theme-accent border-t-2 border-theme text-theme grid grid-cols-4 p-3 px-10",
  },
  yS = Pl(
    "i",
    {
      class: "fal fa-home-alt text-4xl block",
    },
    null,
    -1,
  ),
  kS = Pl(
    "span",
    {
      class: "text-base font-bold",
    },
    "In\xedcio",
    -1,
  ),
  wS = Pl(
    "i",
    {
      class: "fal fa-bullhorn text-4xl block",
    },
    null,
    -1,
  ),
  CS = Pl(
    "span",
    {
      class: "text-base font-bold",
    },
    "Anunciar",
    -1,
  ),
  _S = Pl(
    "i",
    {
      class: "fal fa-search text-4xl block",
    },
    null,
    -1,
  ),
  AS = Pl(
    "span",
    {
      class: "text-base font-bold",
    },
    "Buscar",
    -1,
  ),
  SS = Pl(
    "i",
    {
      class: "fal fa-box text-4xl block",
    },
    null,
    -1,
  ),
  TS = Pl(
    "span",
    {
      class: "text-base font-bold",
    },
    "Seus an\xfancios",
    -1,
  );
vS.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", xS, [
      Pl(
        "button",
        {
          onClick: e0[1] || (e0[1] = (e0) => e$.$router.replace("/olx")),
          class: {
            "text-olx": "/olx" == e$.$route.path,
          },
        },
        [yS, kS],
        2,
      ),
      Pl(
        "button",
        {
          onClick: e0[2] || (e0[2] = (e0) => e$.$router.push("/olx/create")),
          class: {
            "text-olx": "/olx/create" == e$.$route.path,
          },
        },
        [wS, CS],
        2,
      ),
      Pl(
        "button",
        {
          onClick: e0[3] || (e0[3] = (e0) => e$.$router.push("/olx/search")),
          class: {
            "text-olx": "/olx/search" == e$.$route.path,
          },
        },
        [_S, AS],
        2,
      ),
      Pl(
        "button",
        {
          onClick: e0[4] || (e0[4] = (e0) => e$.$router.push("/olx/dashboard")),
          class: {
            "text-olx": "/olx/dashboard" == e$.$route.path,
          },
        },
        [SS, TS],
        2,
      ),
    ])
  );
};
const ES = {
    components: {
      Header: oS,
      Ad: uS,
      Footer: vS,
    },
    setup() {
      jl("setDark")(!0);
      let e$ = rt([]);
      return (
        So.backend.olx_search("%", "%").then((e0) => {
          e$.value = e0;
        }),
        {
          ads: e$,
        }
      );
    },
  },
  RS = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  PS = {
    class: "overflow-y-auto hide-scroll",
  },
  LS = Pl(
    "div",
    {
      class: "mt-32",
    },
    null,
    -1,
  );
ES.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("Ad"),
    e7 = dl("Footer");
  return (
    wl(),
    _l("div", RS, [
      Pl(e6, {
        title: "An\xfancios",
        class: "flex-shrink-0",
      }),
      Pl("ul", PS, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.ads,
            (e$) => (
              wl(),
              _l(
                "li",
                {
                  key: e$.id,
                },
                [
                  Pl(
                    e4,
                    {
                      data: e$,
                    },
                    null,
                    8,
                    ["data"],
                  ),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
      LS,
      Pl(e7),
    ])
  );
};
const IS = rt(""),
  OS = rt(""),
  MS = rt(),
  VS = rt(""),
  DS = rt([]),
  NS = {
    components: {
      Header: oS,
      Footer: vS,
    },
    setup() {
      (jl("setDark")(!0), co());
      let e$ = cc(),
        e0 = jl("alert");
      return {
        title: IS,
        category: OS,
        description: VS,
        price: MS,
        images: DS,
        addImage: async function () {
          try {
            let e$ = await So.useAnyImage("/olx");
            DS.value.push(e$);
          } catch (e0) {}
        },
        submit: function () {
          var e8;
          let e2 = {
            title: IS,
            category: OS,
            price: MS,
            description: VS,
            images: DS,
          };
          for (let e3 in e2) e2[e3] = e2[e3].value;
          return e2.title.trim()
            ? e2.category
              ? e2.price
                ? e2.images.length
                  ? ((e2.price = parseInt(
                      null == (e8 = e2.price) ? void 0 : e8.replace(/\D/g, ""),
                    )),
                    void So.backend.olx_createAd(e2).then((e8) => {
                      if (e8.error) return e0(e8.error);
                      (e$.replace("/olx"),
                        (IS.value = ""),
                        (OS.value = ""),
                        (MS.value = void 0),
                        (VS.value = ""),
                        (DS.value = []));
                    }))
                  : e0("Ao menos uma imagem \xe9 obrigat\xf3ria.")
                : e0("Insira um pre\xe7o")
              : e0("Escolha uma categoria")
            : e0("T\xedtulo inv\xe1lido");
        },
      };
    },
  },
  US = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  $S = {
    class: "p-5",
  },
  jS = Pl("label", null, "T\xedtulo do An\xfancio", -1),
  FS = {
    class: "mt-5",
  },
  zS = Pl("label", null, "Categoria", -1),
  BS = {
    class: "mt-5",
  },
  HS = Pl("label", null, "Pre\xe7o", -1),
  qS = {
    class: "mt-5 relative",
  },
  GS = Pl("label", null, "Descri\xe7\xe3o", -1),
  WS = {
    class: "absolute bottom-4 right-4 text-lg text-theme",
  },
  KS = Pl("label", null, "Fotos", -1),
  JS = {
    class: "h-24 flex",
  },
  XS = Pl(
    "i",
    {
      class: "fas fa-plus",
    },
    null,
    -1,
  );
NS.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-input"),
    e7 = dl("app-select");
  return (
    wl(),
    _l("div", US, [
      Pl(e6, {
        title: "Anunciar",
      }),
      Pl("div", $S, [
        Pl("div", null, [
          jS,
          Pl(
            e4,
            {
              darkable: "true",
              modelValue: e2.title,
              "onUpdate:modelValue": e0[1] || (e0[1] = (e$) => (e2.title = e$)),
              placeholder: "BMW i8",
              maxlength: "64",
              class: "text-2xl",
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", FS, [
          zS,
          Pl(
            e7,
            {
              darkable: "true",
              class: "text-2xl",
              modelValue: e2.category,
              "onUpdate:modelValue":
                e0[2] || (e0[2] = (e$) => (e2.category = e$)),
              options: {
                cars: "Carros",
                motorcycles: "Motos",
                houses: "Casas",
                misc: "Outros",
              },
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", BS, [
          HS,
          Pl(
            e4,
            {
              darkable: "true",
              modelValue: e2.price,
              "onUpdate:modelValue": e0[3] || (e0[3] = (e$) => (e2.price = e$)),
              format: "money",
              maxlength: "11",
              class: "text-2xl",
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", qS, [
          GS,
          Zn(
            Pl(
              "textarea",
              {
                onKeydown:
                  e0[4] ||
                  (e0[4] = us(
                    is(() => {}, ["prevent"]),
                    ["enter"],
                  )),
                class:
                  "resize-none p-3 bg-theme border border-theme rounded-lg fancy-scroll w-full text-3xl",
                "onUpdate:modelValue":
                  e0[5] || (e0[5] = (e$) => (e2.description = e$)),
                maxlength: "1024",
                rows: "8",
              },
              null,
              544,
            ),
            [[ns, e2.description]],
          ),
          Pl("span", WS, g(e2.description.length) + "/1024", 1),
        ]),
        Pl("div", null, [
          KS,
          Pl("div", JS, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.images,
                (e$, e0) => (
                  wl(),
                  _l(
                    "img",
                    {
                      key: e0,
                      src: e$,
                      class: "w-24 h-24 border-2 mr-2",
                    },
                    null,
                    8,
                    ["src"],
                  )
                ),
              ),
              128,
            )),
            e2.images.length < 3
              ? (wl(),
                _l(
                  "button",
                  {
                    key: 0,
                    onClick:
                      e0[6] ||
                      (e0[6] = (...e$) => e2.addImage && e2.addImage(...e$)),
                    class:
                      "w-24 h-24 border-2 border-olx flex flex-center text-olx",
                  },
                  [XS],
                ))
              : Ml("", !0),
          ]),
        ]),
        Pl(
          "button",
          {
            onClick:
              e0[7] || (e0[7] = (...e$) => e2.submit && e2.submit(...e$)),
            class:
              "absolute bottom-16 right-8 bg-olx p-3 px-6 text-white rounded-xl mt-2 block ml-auto",
          },
          "Publicar",
        ),
      ]),
    ])
  );
};
const YS = {
    components: {
      Header: oS,
      Ad: uS,
    },
    setup() {
      jl("setDark")(!0);
      let e$ = rt(""),
        e0 = rt("%"),
        e8 = rt([]),
        e2;

      function e3() {
        let e2 = e$.value || "%";
        ("%" != e2 && (e2 = "%" + e2 + "%"),
          So.backend.olx_search(e2, e0.value).then((e$) => (e8.value = e$)));
      }
      return (
        Tn(e$, () => {
          (clearTimeout(e2), (e2 = setTimeout(e3, 500)));
        }),
        Tn(e0, () => e3()),
        e3(),
        {
          query: e$,
          category: e0,
          ads: e8,
        }
      );
    },
  },
  ZS = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  QS = {
    class: "p-3 flex",
  },
  eT = {
    class: "overflow-y-auto hide-scroll",
  },
  tT = Pl(
    "div",
    {
      class: "mt-32",
    },
    null,
    -1,
  );
YS.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-input"),
    e7 = dl("app-select"),
    e5 = dl("Ad");
  return (
    wl(),
    _l("div", ZS, [
      Pl(e6, {
        title: "Busca",
      }),
      Pl("div", QS, [
        Pl(
          e4,
          {
            darkable: "true",
            modelValue: e2.query,
            "onUpdate:modelValue": e0[1] || (e0[1] = (e$) => (e2.query = e$)),
            placeholder: "T\xedtulo do an\xfancio",
            class: "text-2xl rounded-r-none",
          },
          null,
          8,
          ["modelValue"],
        ),
        Pl(
          e7,
          {
            darkable: "true",
            modelValue: e2.category,
            "onUpdate:modelValue":
              e0[2] || (e0[2] = (e$) => (e2.category = e$)),
            class: "rounded-l-none border-l-0 text-2xl",
            options: {
              "%": "Todos",
              cars: "Carros",
              motorcycles: "Motos",
              houses: "Casas",
              misc: "Outros",
            },
          },
          null,
          8,
          ["modelValue"],
        ),
      ]),
      Pl("ul", eT, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.ads,
            (e$) => (
              wl(),
              _l(
                "li",
                {
                  key: e$.id,
                },
                [
                  Pl(
                    e5,
                    {
                      data: e$,
                    },
                    null,
                    8,
                    ["data"],
                  ),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
      tT,
    ])
  );
};
const nT = {
    components: {
      Header: oS,
      Ad: uS,
      Footer: vS,
    },
    inject: ["setDark"],
    setup() {
      let e$ = uc(),
        e0 = rt(),
        e8 = rt(0),
        e2 = So.identity;
      return (
        So.backend.olx_fetch(e$.params.id).then((e$) => {
          if (((e0.value = e$ || !1), e$))
            for (let e8 of e$.images) new Image().src = e8;
        }),
        {
          ad: e0,
          yourself: e2,
          imgIndex: e8,
        }
      );
    },
    mounted() {
      this.setDark(!0);
    },
  },
  lT = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  aT = {
    key: 0,
  },
  sT = {
    class: "relative bg-black",
  },
  oT = Pl(
    "i",
    {
      class: "fal fa-chevron-left fa-2x",
    },
    null,
    -1,
  ),
  rT = Pl(
    "i",
    {
      class: "fal fa-chevron-right fa-2x",
    },
    null,
    -1,
  ),
  iT = {
    class: "p-3 overflow-y-auto-hide-scroll",
  },
  cT = {
    class: "py-3",
  },
  uT = {
    class: "font-bold text-5xl",
  },
  dT = {
    class: "opacity-75 my-8 text-4xl break-words",
  },
  pT = {
    class: "opacity-50 text-2xl",
  },
  fT = Pl(
    "hr",
    {
      class: "border-theme",
    },
    null,
    -1,
  ),
  mT = {
    class: "py-3",
  },
  hT = Pl(
    "h1",
    {
      class: "font-semibold mb-4 text-4xl",
    },
    "Descri\xe7\xe3o",
    -1,
  ),
  bT = {
    class: "text-2xl opacity-75 break-words",
  },
  gT = Pl(
    "hr",
    {
      class: "border-theme",
    },
    null,
    -1,
  ),
  vT = {
    class: "py-3",
  },
  xT = Pl(
    "h1",
    {
      class: "font-semibold mb-4 text-4xl",
    },
    "Anunciante",
    -1,
  ),
  yT = {
    class: "text-2xl",
  },
  kT = Pl(
    "strong",
    {
      class: "opacity-75",
    },
    "Nome: ",
    -1,
  ),
  wT = {
    class: "opacity-50",
  },
  CT = Pl(
    "strong",
    {
      class: "opacity-75",
    },
    "Passaporte: ",
    -1,
  ),
  _T = {
    class: "opacity-50",
  },
  AT = Pl(
    "strong",
    {
      class: "opacity-75",
    },
    "Telefone: ",
    -1,
  ),
  ST = {
    class: "select-text opacity-50",
  },
  TT = Pl(
    "i",
    {
      class: "fab fa-whatsapp",
    },
    null,
    -1,
  ),
  ET = {
    key: 1,
  },
  RT = Pl(
    "h1",
    {
      class: "p-3 text-center opacity-75 font-semibold",
    },
    "An\xfancio n\xe3o encontrado",
    -1,
  );
nT.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", lT, [
      Pl(e6, {
        title: "Detalhes",
      }),
      e2.ad
        ? (wl(),
          _l("div", aT, [
            Pl("div", sT, [
              0 != e2.imgIndex
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      onClick:
                        e0[1] ||
                        (e0[1] = (e$) =>
                          (e2.imgIndex = Math.max(0, e2.imgIndex - 1))),
                      class: "absolute text-white h-full w-2/12",
                    },
                    [oT],
                  ))
                : Ml("", !0),
              Pl(
                "img",
                {
                  class: "mx-auto",
                  style: {
                    "max-height": "21.5rem",
                  },
                  src: e2.ad.images[e2.imgIndex],
                  alt: "",
                },
                null,
                8,
                ["src"],
              ),
              e2.imgIndex < e2.ad.images.length - 1
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 1,
                      onClick:
                        e0[2] ||
                        (e0[2] = (e$) =>
                          (e2.imgIndex = Math.min(
                            e2.ad.images.length - 1,
                            e2.imgIndex + 1,
                          ))),
                      class: "absolute top-0 right-0 text-white h-full w-2/12",
                    },
                    [rT],
                  ))
                : Ml("", !0),
            ]),
            Pl("div", iT, [
              Pl("div", cT, [
                Pl("h1", uT, g(e$.$filters.intToMoney(e2.ad.price)), 1),
                Pl("h3", dT, g(e2.ad.title), 1),
                Pl(
                  "span",
                  pT,
                  "Publicado em " + g(e$.$filters.unixToDate(e2.ad.created_at)),
                  1,
                ),
              ]),
              fT,
              Pl("div", mT, [hT, Pl("span", bT, g(e2.ad.description), 1)]),
              gT,
              Pl("div", vT, [
                xT,
                Pl("ul", yT, [
                  Pl("li", null, [kT, Pl("span", wT, g(e2.ad.author.name), 1)]),
                  Pl("li", null, [
                    CT,
                    Pl("span", _T, g(e2.ad.author.user_id), 1),
                  ]),
                  Pl("li", null, [
                    AT,
                    Pl("span", ST, g(e2.ad.author.phone), 1),
                    e2.yourself.phone != e2.ad.author.phone
                      ? (wl(),
                        _l(
                          "button",
                          {
                            key: 0,
                            class: "ml-3 text-green-500",
                            onClick:
                              e0[3] ||
                              (e0[3] = (e0) =>
                                e$.$router.push(
                                  "/whatsapp/" + e2.ad.author.phone,
                                )),
                          },
                          [TT],
                        ))
                      : Ml("", !0),
                  ]),
                ]),
              ]),
            ]),
          ]))
        : !1 === e2.ad
          ? (wl(), _l("div", ET, [RT]))
          : Ml("", !0),
    ])
  );
};
const PT = {
    components: {
      Header: oS,
      Ad: uS,
    },
    setup() {
      jl("setDark")(!0);
      let e$ = jl("alert"),
        e0 = rt();
      return (
        So.backend.olx_dashboard().then((e$) => {
          e0.value = e$;
        }),
        {
          ads: e0,
          destroy: function (e8) {
            So.backend.olx_destroy(e8).then((e2) => {
              (null == e2 ? void 0 : e2.error)
                ? e$(e2.error)
                : (e0.value = e0.value.filter((e$) => e$.id != e8));
            });
          },
        }
      );
    },
  },
  LT = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  IT = {
    key: 0,
    class: "overflow-y-auto hide-scroll",
  },
  OT = {
    class: "ml-3 flex flex-col flex-1 justify-between",
  },
  MT = {
    class: "text-2xl text-theme opacity-75 break-words",
  },
  VT = {
    class: "text-xl text-theme opacity-75",
  },
  DT = Pl(
    "i",
    {
      class: "fal fa-trash-alt text-red-500",
    },
    null,
    -1,
  ),
  NT = {
    key: 1,
    class: "p-3",
  },
  UT = Pl(
    "h1",
    {
      class: "text-theme font-semibold text-center",
    },
    "Voc\xea n\xe3o possui an\xfancios",
    -1,
  ),
  $T = Pl(
    "div",
    {
      class: "mt-32",
    },
    null,
    -1,
  );
PT.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  let e4 = dl("Header");
  return (
    wl(),
    _l("div", LT, [
      Pl(e4, {
        title: "Seus an\xfancios",
      }),
      (null == (e6 = e2.ads) ? void 0 : e6.length)
        ? (wl(),
          _l("div", IT, [
            Pl("ul", null, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.ads,
                  (e0) => (
                    wl(),
                    _l(
                      "li",
                      {
                        key: e0.id,
                        class: "border-b border-theme last:border-b-0 flex",
                      },
                      [
                        Pl(
                          "img",
                          {
                            src: e0.images[0],
                            class: "h-32",
                          },
                          null,
                          8,
                          ["src"],
                        ),
                        Pl("div", OT, [
                          Pl("h1", MT, g(e0.title), 1),
                          Pl("h3", VT, g(e$.$filters.intToMoney(e0.price)), 1),
                        ]),
                        Pl(
                          "button",
                          {
                            class: "m-3 p-2",
                            onClick: (e$) => e2.destroy(e0.id),
                          },
                          [DT],
                          8,
                          ["onClick"],
                        ),
                      ],
                    )
                  ),
                ),
                128,
              )),
            ]),
          ]))
        : e2.ads
          ? (wl(), _l("div", NT, [UT]))
          : Ml("", !0),
      $T,
    ])
  );
};
const jT = {},
  FT = {
    class: "mt-24 mx-4 bg-lightgray px-8 py-6 rounded-lg flex justify-between",
  };
jT.render = function (e$, e0) {
  return (
    wl(),
    _l("div", FT, [
      Pl("button", null, [
        Pl(
          "img",
          {
            src: e$.$asset("/stock/tinder/flame.png", "tinderFlame"),
            class: "w-10",
            style: {
              filter:
                "/tinder" != e$.$route.path
                  ? "opacity(0.6) invert(0.5)"
                  : "none",
            },
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.replace("/tinder")),
          },
          null,
          12,
          ["src"],
        ),
      ]),
      Pl("button", null, [
        Pl(
          "img",
          {
            src: e$.$asset("/stock/tinder/heart.png"),
            class: "w-10",
            style: {
              filter:
                "/tinder/likes" != e$.$route.path
                  ? "opacity(0.6) invert(0.5)"
                  : "none",
            },
            onClick:
              e0[2] || (e0[2] = (e0) => e$.$router.replace("/tinder/likes")),
          },
          null,
          12,
          ["src"],
        ),
      ]),
      Pl("button", null, [
        Pl(
          "img",
          {
            src: e$.$asset("/stock/tinder/chat.png"),
            class: "w-10",
            style: {
              filter:
                "/tinder/chats" != e$.$route.path
                  ? "opacity(0.6) invert(0.5)"
                  : "none",
            },
            onClick:
              e0[3] || (e0[3] = (e0) => e$.$router.replace("/tinder/chats")),
          },
          null,
          12,
          ["src"],
        ),
      ]),
      Pl("button", null, [
        Pl(
          "img",
          {
            src: e$.$asset("/stock/tinder/user.png"),
            class: "w-10",
            style: {
              filter:
                "/tinder/profile" != e$.$route.path
                  ? "opacity(0.6) invert(0.5)"
                  : "none",
            },
            onClick:
              e0[4] || (e0[4] = (e0) => e$.$router.replace("/tinder/profile")),
          },
          null,
          12,
          ["src"],
        ),
      ]),
    ])
  );
};
const zT = {
    components: {
      Header: jT,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = cc(),
        e0 = rt();
      return (
        So.backend.tinder().then(async (e8) => {
          e8
            ? (e0.value = await So.backend.tinder_next(0))
            : "/tinder" == e$.currentRoute.value.path &&
              e$.replace("/tinder/register");
        }),
        {
          peer: e0,
          back: function () {
            e0.value &&
              So.backend.tinder_next(e0.value.id, !1).then((e$) => {
                e$ ? (e0.value = e$) : (e0.value.previous = !1);
              });
          },
          next: function (e$) {
            e0.value &&
              So.backend
                .tinder_next(e0.value.id, !0, e$)
                .then((e$) => (e0.value = e$));
          },
        }
      );
    },
  },
  BT = {
    class: "h-full bg-white flex flex-col",
  },
  HT = {
    key: 0,
    class: "flex-1 mt-8 mx-4",
  },
  qT = {
    class: "relative mt-4",
  },
  GT = {
    class: "absolute bottom-4 left-4 right-4 text-white text-4xl",
  },
  WT = {
    class: "flex",
  },
  KT = {
    class: "font-bold",
  },
  JT = {
    class: "ml-3",
  },
  XT = {
    class: "flex items-center",
  },
  YT = {
    class: "text-lg ml-2",
  },
  ZT = {
    key: 0,
    class: "grid grid-cols-3 gap-4",
  },
  QT = {
    class:
      "flex-1 overflow-y-auto text-3xl h-80 fancy-scroll mt-4 whitespace-pre-wrap",
  },
  eE = {
    class:
      "absolute bottom-8 inset-x-4 px-8 h-28 bg-lightgray flex justify-between rounded-2xl",
  },
  tE = {
    key: 1,
  },
  nE = Pl(
    "p",
    {
      class: "text-gray-500 text-center text-xl mt-4",
    },
    "N\xe3o encontramos ningu\xe9m compat\xedvel com voc\xea.",
    -1,
  );
zT.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", BT, [
      Pl(e6),
      e2.peer && "object" == typeof e2.peer
        ? (wl(),
          _l("div", HT, [
            Pl("div", qT, [
              Pl(
                "img",
                {
                  src: e2.peer.image,
                  class: "rounded-2xl w-full max-h-96 mx-auto",
                },
                null,
                8,
                ["src"],
              ),
              Pl("div", GT, [
                Pl("div", WT, [
                  Pl("h1", KT, g(e2.peer.name), 1),
                  Pl("h3", JT, g(e2.peer.age), 1),
                ]),
                Pl("div", XT, [
                  Pl(
                    "div",
                    {
                      class: [
                        "w-2 h-2 rounded-full",
                        [e2.peer.online ? "bg-green-400" : "bg-gray-400"],
                      ],
                    },
                    null,
                    2,
                  ),
                  Pl("span", YT, g(e2.peer.online ? "Online" : "Offline"), 1),
                ]),
                e2.peer.show_tags
                  ? (wl(),
                    _l("ul", ZT, [
                      (wl(!0),
                      _l(
                        bl,
                        null,
                        fa(
                          e2.peer.tags,
                          (e$, e0) => (
                            wl(),
                            _l(
                              "li",
                              {
                                key: e0,
                                class: "text-xl tinder-chip",
                              },
                              g(e$),
                              1,
                            )
                          ),
                        ),
                        128,
                      )),
                    ]))
                  : Ml("", !0),
              ]),
            ]),
            Pl("p", QT, g(e2.peer.bio), 1),
            Pl("div", eE, [
              e2.peer.previous
                ? (wl(),
                  _l(
                    "button",
                    {
                      key: 0,
                      onClick: e0[1] || (e0[1] = (e$) => e2.back()),
                    },
                    [
                      Pl(
                        "img",
                        {
                          src: e$.$asset("/stock/tinder/redo.png"),
                          class: "h-16",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                    ],
                  ))
                : Ml("", !0),
              Pl(
                "button",
                {
                  onClick: e0[2] || (e0[2] = (e$) => e2.next(0)),
                },
                [
                  Pl(
                    "img",
                    {
                      src: e$.$asset("/stock/tinder/refuse.png"),
                      class: "h-16",
                    },
                    null,
                    8,
                    ["src"],
                  ),
                ],
              ),
              Pl(
                "button",
                {
                  onClick: e0[3] || (e0[3] = (e$) => e2.next(2)),
                },
                [
                  Pl(
                    "img",
                    {
                      src: e$.$asset("/stock/tinder/star.png"),
                      class: "h-16",
                    },
                    null,
                    8,
                    ["src"],
                  ),
                ],
              ),
              Pl(
                "button",
                {
                  onClick: e0[4] || (e0[4] = (e$) => e2.next(1)),
                },
                [
                  Pl(
                    "img",
                    {
                      src: e$.$asset("/stock/tinder/like.png"),
                      class: "h-16",
                    },
                    null,
                    8,
                    ["src"],
                  ),
                ],
              ),
            ]),
          ]))
        : (wl(),
          _l("div", tE, [
            Pl(
              "img",
              {
                src: e$.$asset("/stock/tinder/heartbreak.svg"),
                class: "mx-auto mt-56 px-24",
              },
              null,
              8,
              ["src"],
            ),
            nE,
          ])),
    ])
  );
};
const lE = Ze({
    show_gender: !0,
    show_tags: !0,
  }),
  aE = {
    components: {},
    setup() {
      let e$ = jl("setDark"),
        e0 = cc();
      e$(!0);
      let e8 = Ze({
          tags: new Set(),
        }),
        e2 = rt();
      return {
        payload: lE,
        tmp: e8,
        error: e2,
        takeSelfie: async function () {
          try {
            let e0 = await So.useAnyImage("/tinder", !0);
            ((lE.image = e0), e$(!1));
          } catch (e8) {}
        },
        next: function () {
          var e$;
          if (lE.name) {
            if (lE.age) {
              if (lE.gender) {
                if (lE.tags) {
                  if (lE.target) {
                    if (!lE.bio) {
                      let e3 = e8.bio;
                      if (!e3) return (e2.value = "Preencha a bio");
                      if (e3.length > 1024)
                        return (e2.value = "Limite de caracteres ultrapassado");
                      ((lE.bio = e3),
                        So.backend.tinder_register(lE).then(() => {
                          e0.replace("/tinder");
                        }));
                    }
                  } else {
                    let e1 = e8.target;
                    if (!e1) return (e2.value = "Escolha sua prefer\xeancia");
                    lE.target = e1;
                  }
                } else {
                  let e6 = [...e8.tags];
                  if (!e6.length)
                    return (e2.value =
                      "Escolha pelo menos uma orienta\xe7\xe3o");
                  if (e6.length > 3)
                    return (e2.value = "Escolha no m\xe1ximo 3");
                  lE.tags = e6;
                }
              } else {
                let e4 = e8.gender;
                if (!e4) return (e2.value = "Escolhe um g\xeanero");
                lE.gender = e4;
              }
            } else {
              let e7 = parseInt(e8.age);
              if (!e7) return (e2.value = "Insira sua idade");
              if (e7 < 18) return (e2.value = "A idade m\xednima \xe9 18");
              lE.age = e7;
            }
          } else {
            let e5 = null == (e$ = e8.name) ? void 0 : e$.trim();
            if (!e5) return (e2.value = "Insira seu nome e sobrenome");
            if (!e5.includes(" ")) return (e2.value = "Insira seu sobrenome");
            if (e5.match(/[\d!@#$%&*()\-=_+/]/))
              return (e2.value =
                "Seu nome n\xe3o pode ter n\xfameros/s\xedmbolos");
            lE.name = e5;
          }
          e2.value = null;
        },
      };
    },
    unmounted() {
      for (let e$ in lE) e$.startsWith("show_") || delete lE[e$];
    },
  },
  sE = sn("data-v-0181de71");
ln("data-v-0181de71");
const oE = {
    class: "flex flex-col h-full",
  },
  rE = {
    key: 0,
    container: "",
    class: "flex-1",
  },
  iE = Pl(
    "span",
    {
      class: "text-xl text-white block text-center mt-4",
    },
    "Clique na imagem para alterar",
    -1,
  ),
  cE = {
    key: 1,
    class: "flex-1 bg-white",
  },
  uE = {
    key: 0,
    class: "mt-96 px-20",
  },
  dE = Pl(
    "p",
    {
      class: "text-xl text-gray-400 mt-2",
    },
    "\xc9 assim que o seu nome vai aparecer no Tinder e voc\xea n\xe3o poder\xe1 alter\xe1-lo depois.",
    -1,
  ),
  pE = {
    key: 1,
    class: "mt-96 px-20",
  },
  fE = Pl(
    "p",
    {
      class: "text-xl text-gray-400 mt-2",
    },
    "Sua idade ser\xe1 p\xfablica.",
    -1,
  ),
  mE = {
    key: 2,
    class: "mt-80 px-20",
  },
  hE = Pl(
    "span",
    {
      class: "text-2xl tinder-gray",
    },
    "Selecione o seu g\xeanero.",
    -1,
  ),
  bE = {
    class: "flex items-center",
  },
  gE = Pl(
    "label",
    {
      class: "ml-2 text-2xl tinder-gray",
    },
    "Mostrar meu g\xeanero no perfil",
    -1,
  ),
  vE = {
    key: 3,
    class: "mt-60 px-20",
  },
  xE = Pl(
    "span",
    {
      class: "text-2xl tinder-gray",
    },
    "Selecione at\xe9 3",
    -1,
  ),
  yE = {
    class: "flex items-center",
  },
  kE = Pl(
    "label",
    {
      class: "ml-2 text-2xl tinder-gray",
    },
    "Mostrar minha orienta\xe7\xe3o no meu perfil",
    -1,
  ),
  wE = {
    key: 4,
    class: "mt-72 px-20",
  },
  CE = Pl(
    "span",
    {
      class: "text-2xl tinder-gray",
    },
    "Sua prefer\xeancia \xe9 por",
    -1,
  ),
  _E = {
    key: 5,
    class: "mt-72 px-20",
  },
  AE = Pl(
    "span",
    {
      class: "text-xl tinder-gray",
    },
    "Escreva a sua biografia",
    -1,
  ),
  SE = Pl(
    "p",
    {
      class: "text-xl tinder-gray",
    },
    "\xc9 assim que a sua biografia vai aparecer no Tinder, mas voc\xea poder\xe1 alter\xe1-la depois.",
    -1,
  ),
  TE = {
    key: 6,
    class: "mt-96 text-center",
  },
  EE = {
    key: 7,
    class: "absolute bottom-32 w-full text-center text-2xl text-red-500",
  },
  RE = {
    key: 8,
    class: "absolute bottom-20 inset-x-0 text-center",
  };
an();
const PE = sE((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("app-loading");
  return (
    wl(),
    _l("div", oE, [
      e2.payload.image
        ? (wl(),
          _l("div", cE, [
            Pl(
              "img",
              {
                class: "mx-auto mt-20 h-16",
                src: e$.$asset("/stock/tinder/logo.svg", "tinderLogo"),
                style: {
                  filter: "invert(0.4)",
                },
              },
              null,
              8,
              ["src"],
            ),
            e2.payload.name
              ? e2.payload.age
                ? e2.payload.gender
                  ? e2.payload.tags
                    ? e2.payload.target
                      ? e2.payload.bio
                        ? (wl(),
                          _l("div", TE, [
                            Pl(e6, {
                              style: {
                                filter: "invert(0.5)",
                              },
                            }),
                          ]))
                        : (wl(),
                          _l("div", _E, [
                            AE,
                            Zn(
                              Pl(
                                "textarea",
                                {
                                  "onUpdate:modelValue":
                                    e0[10] ||
                                    (e0[10] = (e$) => (e2.tmp.bio = e$)),
                                  onKeydown:
                                    e0[11] ||
                                    (e0[11] = us(
                                      is(() => {}, ["prevent"]),
                                      ["enter"],
                                    )),
                                  class:
                                    "border h-80 fancy-scroll rounded-xl text-xl w-full resize-none p-4",
                                  spellcheck: "false",
                                },
                                null,
                                544,
                              ),
                              [[ns, e2.tmp.bio]],
                            ),
                            SE,
                          ]))
                      : (wl(),
                        _l("div", wE, [
                          CE,
                          (wl(),
                          _l(
                            bl,
                            null,
                            fa(
                              {
                                Male: "Homens",
                                Female: "Mulheres",
                                All: "Todos",
                              },
                              (e$, e0) =>
                                Pl(
                                  "button",
                                  {
                                    key: e0,
                                    onClick: (e$) => (e2.tmp.target = e0),
                                    class: [
                                      "w-full border border-gray-200 rounded-xl py-3 mb-3",
                                      {
                                        "border-gray-500": e2.tmp.target == e0,
                                      },
                                    ],
                                  },
                                  g(e$),
                                  11,
                                  ["onClick"],
                                ),
                            ),
                            64,
                          )),
                        ]))
                    : (wl(),
                      _l("div", vE, [
                        xE,
                        (wl(),
                        _l(
                          bl,
                          null,
                          fa(
                            [
                              "Heterossexual",
                              "Gay",
                              "L\xe9sbica",
                              "Bissexual",
                              "Assexual",
                              "Demissexual",
                              "Pansexual",
                              "Outros",
                            ],
                            (e$) =>
                              Pl(
                                "button",
                                {
                                  key: e$,
                                  class: [
                                    "block mb-3 text-5xl text-gray-400 transition-color duration-300",
                                    {
                                      "text-gray-900": e2.tmp.tags.has(e$),
                                    },
                                  ],
                                  onClick: (e0) =>
                                    e2.tmp.tags.has(e$)
                                      ? e2.tmp.tags.delete(e$)
                                      : e2.tmp.tags.add(e$),
                                },
                                g(e$),
                                11,
                                ["onClick"],
                              ),
                          ),
                          64,
                        )),
                        Pl("div", yE, [
                          Zn(
                            Pl(
                              "input",
                              {
                                "onUpdate:modelValue":
                                  e0[9] ||
                                  (e0[9] = (e$) => (e2.payload.show_tags = e$)),
                                type: "checkbox",
                                style: {
                                  filter: "grayscale(1)",
                                },
                              },
                              null,
                              512,
                            ),
                            [[ls, e2.payload.show_tags]],
                          ),
                          kE,
                        ]),
                      ]))
                  : (wl(),
                    _l("div", mE, [
                      hE,
                      Pl(
                        "button",
                        {
                          onClick:
                            e0[6] || (e0[6] = (e$) => (e2.tmp.gender = "Male")),
                          class: [
                            "w-full border border-gray-200 rounded-xl py-3 mb-3",
                            {
                              "border-gray-500": "Male" == e2.tmp.gender,
                            },
                          ],
                        },
                        " Homem ",
                        2,
                      ),
                      Pl(
                        "button",
                        {
                          onClick:
                            e0[7] ||
                            (e0[7] = (e$) => (e2.tmp.gender = "Female")),
                          class: [
                            "w-full border border-gray-200 rounded-xl py-3 mb-3",
                            {
                              "border-gray-500": "Female" == e2.tmp.gender,
                            },
                          ],
                        },
                        " Mulher ",
                        2,
                      ),
                      Pl("div", bE, [
                        Zn(
                          Pl(
                            "input",
                            {
                              "onUpdate:modelValue":
                                e0[8] ||
                                (e0[8] = (e$) => (e2.payload.show_gender = e$)),
                              type: "checkbox",
                              style: {
                                filter: "grayscale(1)",
                              },
                            },
                            null,
                            512,
                          ),
                          [[ls, e2.payload.show_gender]],
                        ),
                        gE,
                      ]),
                    ]))
                : (wl(),
                  _l("div", pE, [
                    Zn(
                      Pl(
                        "input",
                        {
                          autofocus: "",
                          onKeydown:
                            e0[4] ||
                            (e0[4] = us(
                              (...e$) => e2.next && e2.next(...e$),
                              ["enter"],
                            )),
                          "onUpdate:modelValue":
                            e0[5] || (e0[5] = (e$) => (e2.tmp.age = e$)),
                          type: "text",
                          maxlength: "3",
                          min: "18",
                          placeholder: "21",
                          class: "mx-auto block w-full border-b text-gray-800",
                        },
                        null,
                        544,
                      ),
                      [[ns, e2.tmp.age]],
                    ),
                    fE,
                  ]))
              : (wl(),
                _l("div", uE, [
                  Zn(
                    Pl(
                      "input",
                      {
                        autofocus: "",
                        onKeydown:
                          e0[2] ||
                          (e0[2] = us(
                            (...e$) => e2.next && e2.next(...e$),
                            ["enter"],
                          )),
                        "onUpdate:modelValue":
                          e0[3] || (e0[3] = (e$) => (e2.tmp.name = e$)),
                        type: "text",
                        maxlength: "255",
                        placeholder: "Nome e Sobrenome",
                        class: "mx-auto block w-full border-b text-gray-800",
                      },
                      null,
                      544,
                    ),
                    [[ns, e2.tmp.name]],
                  ),
                  dE,
                ])),
            e2.error ? (wl(), _l("p", EE, g(e2.error), 1)) : Ml("", !0),
            e2.payload.bio
              ? Ml("", !0)
              : (wl(),
                _l("div", RE, [
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[12] ||
                        (e0[12] = (...e$) => e2.next && e2.next(...e$)),
                      class: "tinder-gray font-semibold text-4xl",
                    },
                    " CONTINUAR ",
                  ),
                ])),
          ]))
        : (wl(),
          _l("div", rE, [
            Pl(
              "img",
              {
                src: e$.$asset("/stock/tinder/logo.svg", "tinderLogo"),
                class: "mx-auto mt-32 w-5/12",
              },
              null,
              8,
              ["src"],
            ),
            Pl(
              "div",
              {
                onClick:
                  e0[1] ||
                  (e0[1] = (...e$) => e2.takeSelfie && e2.takeSelfie(...e$)),
                class:
                  "w-80 h-80 bg-white mx-auto mt-56 rounded-30 flex flex-center",
              },
              [
                Pl(
                  "img",
                  {
                    class: "w-1/2",
                    style: {
                      filter: "grayscale(1) opacity(0.5)",
                    },
                    src: e$.$asset("/stock/tinder/flame.png", "tinderFlame"),
                  },
                  null,
                  8,
                  ["src"],
                ),
              ],
            ),
            iE,
          ])),
    ])
  );
});
((aE.render = PE), (aE.__scopeId = "data-v-0181de71"));
const LE = {
    components: {
      Header: jT,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = rt();
      return (
        So.backend.tinder_liked().then((e0) => {
          e$.value = e0;
        }),
        {
          likes: e$,
        }
      );
    },
  },
  IE = sn("data-v-b5909498");
ln("data-v-b5909498");
const OE = {
    class: "h-full bg-white flex flex-col",
  },
  ME = {
    key: 0,
    class: "w-2/3 mx-auto mt-80",
  },
  VE = Pl(
    "p",
    {
      class: "text-gray-500 text-xl mt-2",
    },
    "Ainda ningu\xe9m te curtiu, mas eu curto voc\xea.",
    -1,
  ),
  DE = {
    key: 1,
    class: "overflow-y-auto hide-scroll my-3 mx-6 grid grid-cols-2 gap-6",
  },
  NE = {
    class: "absolute bottom-1 left-1 text-xl text-white",
  };
an();
const UE = IE((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", OE, [
      Pl(e6),
      e2.likes && !e2.likes.length
        ? (wl(),
          _l("div", ME, [
            Pl(
              "img",
              {
                src: e$.$asset("/stock/tinder/dislike.svg"),
                class: "w-2/3 mx-auto",
              },
              null,
              8,
              ["src"],
            ),
            VE,
          ]))
        : (wl(),
          _l("div", DE, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(
                e2.likes,
                (e$) => (
                  wl(),
                  _l(
                    "div",
                    {
                      class: "relative",
                      key: e$.id,
                    },
                    [
                      Pl(
                        "img",
                        {
                          src: e$.image,
                          class: "rounded-lg",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                      Pl("p", NE, [
                        Pl("b", null, g(e$.name), 1),
                        Pl("span", null, ", " + g(e$.age), 1),
                      ]),
                    ],
                  )
                ),
              ),
              128,
            )),
          ])),
    ])
  );
});
((LE.render = UE), (LE.__scopeId = "data-v-b5909498"));
const $E = {
    components: {
      Header: jT,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = rt([]),
        e0 = da(() =>
          e$.value
            .filter((e$) => e$.last_message)
            .sort(
              (e$, e0) =>
                e0.last_message.created_at - e$.last_message.created_at,
            ),
        ),
        e8 = da(() => e$.value.filter((e$) => !e$.last_message));
      return (
        So.backend.tinder_matches().then((e0) => {
          e$.value = null != e0 ? e0 : [];
        }),
        So.onceRoute("TINDER_MESSAGE", (e8) => {
          let e2 = e$.value.find((e$) => e$.id == e8.sender);
          e2 && ((e2.last_message = e8), e0.effect());
        }),
        {
          fresh: e8,
          conversations: e0,
        }
      );
    },
  },
  jE = {
    class: "h-full bg-white flex flex-col",
  },
  FE = {
    key: 0,
    class: "m-4",
  },
  zE = Pl(
    "span",
    {
      class: "text-tinder text-2xl",
    },
    "Novos Matches",
    -1,
  ),
  BE = {
    class:
      "bg-lightgray h-36 p-4 rounded-2xl flex overflow-x-auto tinder-scroll",
  },
  HE = {
    class: "overflow-hidden whitespace-nowrap text-base w-20",
  },
  qE = {
    key: 1,
    class: "text-tinder text-2xl m-4",
  },
  GE = {
    key: 2,
    class: "flex-1 overflow-y-auto hide-scroll m-4",
  },
  WE = {
    class: "ml-5 flex-1",
  },
  KE = {
    class: "text-2xl font-bold",
  },
  JE = {
    class: "flex justify-between",
  },
  XE = {
    class: "text-lg text-gray-800 w-96 overflow-x-hidden",
  },
  YE = {
    class: "text-lg text-gray-400",
  };
$E.render = function (e$, e0, e8, e2, e3, e1) {
  var e6, e4;
  let e7 = dl("Header");
  return (
    wl(),
    _l("div", jE, [
      Pl(e7),
      e2.fresh.length
        ? (wl(),
          _l("div", FE, [
            zE,
            Pl("div", BE, [
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.fresh,
                  (e0) => (
                    wl(),
                    _l(
                      "div",
                      {
                        key: e0.id,
                        onClick: (e8) =>
                          e$.$router.push("/tinder/chats/" + e0.id),
                        class:
                          "flex flex-col flex-shrink-0 justify-center pr-3",
                      },
                      [
                        Pl(
                          "img",
                          {
                            src: e0.image,
                            class: "w-20 h-20 rounded-full",
                          },
                          null,
                          8,
                          ["src"],
                        ),
                        Pl("h1", HE, g(e0.name), 1),
                      ],
                      8,
                      ["onClick"],
                    )
                  ),
                ),
                128,
              )),
            ]),
          ]))
        : Ml("", !0),
      (null == (e6 = e2.conversations) ? void 0 : e6.length)
        ? (wl(), _l("p", qE, "Mensagens"))
        : Ml("", !0),
      (null == (e4 = e2.conversations) ? void 0 : e4.length)
        ? (wl(),
          _l("div", GE, [
            (wl(!0),
            _l(
              bl,
              null,
              fa(e2.conversations, (e0) => {
                var e8;
                return (
                  wl(),
                  _l(
                    "div",
                    {
                      key: e0.id,
                      onClick: (e8) =>
                        e$.$router.push("/tinder/chats/" + e0.id),
                      class: "mb-5 flex items-center",
                    },
                    [
                      Pl(
                        "img",
                        {
                          src: e0.image,
                          class: "w-24 h-24 rounded-full",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                      Pl("div", WE, [
                        Pl("h1", KE, g(e0.name), 1),
                        Pl("div", JE, [
                          Pl(
                            "p",
                            XE,
                            g(e0.last_message.content.substr(0, 32)),
                            1,
                          ),
                          Pl(
                            "p",
                            YE,
                            g(
                              e$.$filters.unixToHHMM(
                                null != (e8 = e0.last_message.created_at)
                                  ? e8
                                  : Date.now() / 1e3,
                              ),
                            ),
                            1,
                          ),
                        ]),
                      ]),
                    ],
                    8,
                    ["onClick"],
                  )
                );
              }),
              128,
            )),
          ]))
        : Ml("", !0),
    ])
  );
};
const ZE = {
    setup() {
      jl("setDark")(!1);
      let e$ = uc(),
        e0 = cc(),
        e8 = jl("confirm"),
        e2 = e$.params.id,
        e3 = rt(),
        e1 = rt({}),
        e6 = rt({}),
        e4 = Ze([]);

      function e7(e$) {
        e3.value ||
          Lt(() => {
            var e0;
            return null == (e0 = document.querySelector(".overflow-y-auto"))
              ? void 0
              : e0.scrollTo({
                  left: 0,
                  top: 9e6,
                  behavior: null != e$ ? e$ : "smooth",
                });
          });
      }
      return (
        So.backend.tinder_chat(e2).then((e$) => {
          var { messages: e0, avatars: e8 } = e$,
            e2 = o(e$, ["messages", "avatars"]);
          ((e1.value = e2),
            (e6.value = e8),
            e4.push(
              ...(function (e$) {
                let e0 = [],
                  e8 = [];
                for (let e2 of e$)
                  e8.length && e8[e8.length - 1].sender != e2.sender
                    ? (e0.push(e8), (e8 = [e2]))
                    : e8.push(e2);
                return (e8.length && e0.push(e8), e0);
              })(e0),
            ),
            e7("auto"));
        }),
        So.onceRoute("TINDER_MESSAGE", (e$) => {
          if (e$.sender != e2 && e$.target != e2) return;
          let e0 = e4[e4.length - 1];
          (e0 && e0[0].sender == e$.sender ? e0.push(e$) : e4.push([e$]), e7());
        }),
        So.onceRoute("TINDER_DISMATCH", (e$) => {
          e$ == e2 && e0.back();
        }),
        So.onceRoute("TINDER_LIKE", (e$) => {
          for (let e0 of e4) {
            let e8 = e0.find((e0) => e0.id == e$);
            e8 && (e8.liked = 1);
          }
        }),
        {
          id: e2,
          chat: e1,
          blocks: e4,
          avatars: e6,
          content: e3,
          sendMessage: function () {
            e3.value &&
              (So.backend.tinder_sendMessage(e2, e3.value), (e3.value = null));
          },
          dismatch: async function () {
            e8("Deseja dar dismatch?").then(
              (e$) =>
                e$ && So.backend.tinder_dismatch(e2).then(() => e0.back()),
            );
          },
          like: function (e$) {
            e$.liked || So.backend.tinder_likeMessage(e$.id);
          },
        }
      );
    },
  },
  QE = sn("data-v-a4dd8eb2");
ln("data-v-a4dd8eb2");
const eR = {
    class: "h-full bg-white flex flex-col",
  },
  tR = {
    class: "mt-16 h-24 border-b flex-shrink-0",
  },
  nR = Pl(
    "i",
    {
      class: "far fa-chevron-left text-5xl text-gray-400",
    },
    null,
    -1,
  ),
  lR = {
    class: "text-center",
  },
  aR = {
    class: "text-xl font-semibold text-gray-600",
  },
  sR = Pl(
    "i",
    {
      class: "fas fa-times text-5xl text-tinder",
    },
    null,
    -1,
  ),
  oR = {
    class: "flex-1 overflow-y-auto hide-scroll px-4",
  },
  rR = {
    class: "text-center text-xl font-semibold text-gray-600",
  },
  iR = {
    class: "break-words",
  },
  cR = {
    key: 0,
    class:
      "absolute text-sm w-full -bottom-4.5 left-0 text-gray-500 text-right",
  },
  uR = {
    class: "flex-shrink-0 h-40 pt-4",
  },
  dR = {
    class:
      "bg-gray-100 h-24 mx-4 px-4 rounded-lg flex justify-between items-center",
  };
an();
const pR = QE((e$, e0, e8, e2, e3, e1) => {
  var e6;
  return (
    wl(),
    _l("div", eR, [
      Pl("div", tR, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-20 px-8",
          },
          [nR],
        ),
        Pl("div", lR, [
          Pl(
            "img",
            {
              src:
                null != (e6 = e2.chat.image)
                  ? e6
                  : e$.$asset("/stock/user.svg"),
              class: "w-16 h-16 rounded-full mx-auto",
            },
            null,
            8,
            ["src"],
          ),
          Pl("p", aR, g(e2.chat.name), 1),
        ]),
        Pl(
          "button",
          {
            onClick: e0[2] || (e0[2] = (e$) => e2.dismatch()),
            class: "absolute top-20 right-8",
          },
          [sR],
        ),
      ]),
      Pl("div", oR, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.blocks,
            (e0, e8) => (
              wl(),
              _l(
                "div",
                {
                  key: e8,
                  class: "mb-4",
                },
                [
                  Pl(
                    "h1",
                    rR,
                    g(e$.$filters.unixToLocale(e0[0].created_at)),
                    1,
                  ),
                  Pl(
                    "div",
                    {
                      class: [
                        "flex items-end",
                        {
                          "flex-row-reverse": e0[0].sender != e2.id,
                        },
                      ],
                    },
                    [
                      Pl(
                        "img",
                        {
                          src: e2.avatars[e0[0].sender],
                          class: "w-16 h-16 rounded-full",
                        },
                        null,
                        8,
                        ["src"],
                      ),
                      Pl(
                        "div",
                        {
                          class: [
                            "mx-4 flex flex-col",
                            {
                              "items-start": e0[0].sender == e2.id,
                              "items-end": e0[0].sender != e2.id,
                            },
                          ],
                        },
                        [
                          (wl(!0),
                          _l(
                            bl,
                            null,
                            fa(
                              e0,
                              (e$, e0) => (
                                wl(),
                                _l(
                                  "div",
                                  {
                                    key: e0,
                                    sender: e$.sender != e2.id,
                                    class:
                                      "relative min-8rem mb-4 last:mb-0 px-4 py-2 rounded-2xl",
                                  },
                                  [
                                    Pl("p", iR, g(e$.content), 1),
                                    e$.sender != e2.id && e$.liked
                                      ? (wl(),
                                        _l("p", cR, "Curtiu sua mensagem"))
                                      : Ml("", !0),
                                    e$.sender == e2.id
                                      ? (wl(),
                                        _l(
                                          "button",
                                          {
                                            key: 1,
                                            class: "absolute -right-12 top-2",
                                            onClick: (e0) => e2.like(e$),
                                          },
                                          [
                                            Pl(
                                              "i",
                                              {
                                                class: [
                                                  "fas fa-heart",
                                                  {
                                                    "text-gray-300": !e$.liked,
                                                    "text-tinder": e$.liked,
                                                  },
                                                ],
                                              },
                                              null,
                                              2,
                                            ),
                                          ],
                                          8,
                                          ["onClick"],
                                        ))
                                      : Ml("", !0),
                                  ],
                                  8,
                                  ["sender"],
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        2,
                      ),
                    ],
                    2,
                  ),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
      Pl("div", uR, [
        Pl("div", dR, [
          Zn(
            Pl(
              "input",
              {
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.content = e$)),
                onKeydown:
                  e0[4] ||
                  (e0[4] = us(
                    (...e$) => e2.sendMessage && e2.sendMessage(...e$),
                    ["enter"],
                  )),
                maxlength: "255",
                type: "text",
                class: "p-4 bg-transparent text-xl flex-1",
                placeholder: "Digite uma mensagem",
              },
              null,
              544,
            ),
            [[ns, e2.content]],
          ),
          Pl(
            "button",
            {
              onClick:
                e0[5] ||
                (e0[5] = (...e$) => e2.sendMessage && e2.sendMessage(...e$)),
              class: "ml-4 text-gray-400 text-2xl",
            },
            "Enviar",
          ),
        ]),
      ]),
    ])
  );
});
((ZE.render = pR), (ZE.__scopeId = "data-v-a4dd8eb2"));
const fR = {
    components: {
      Header: jT,
    },
    setup() {
      jl("setDark")(!1);
      let e$ = jl("alert"),
        e0 = rt({}),
        e8 = rt(So.hasNotificationFor("tinder"));
      return (
        Tn(e8, (e$) => So.setNotificationFor("tinder", e$)),
        Tn(
          () => e0.value.target,
          (e$, e0) => e0 && So.backend.tinder_changeTarget(e$),
        ),
        So.backend.tinder().then((e$) => (e0.value = e$)),
        {
          profile: e0,
          notifications: e8,
          changeAvatar: async function () {
            try {
              let e$ = await So.useAnyImage("/tinder", !0);
              (await So.backend.tinder_changeAvatar(e$), (e0.value.image = e$));
            } catch (e8) {}
          },
          changeBio: function () {
            let e8 = e0.value.bio;
            return e8
              ? e8.length > 1024
                ? e$("A bio n\xe3o pode ser maior que 1024 caracteres")
                : void So.backend.tinder_changeBio(e8)
              : e$("A bio n\xe3o pode ficar vazia");
          },
          deleteAccount: function () {
            So.backend.tinder_delete().then(() => {
              VO.replace("/home");
            });
          },
        }
      );
    },
  },
  mR = sn("data-v-dfd1e998");
ln("data-v-dfd1e998");
const hR = {
    class: "h-full bg-white flex flex-col",
  },
  bR = {
    key: 0,
  },
  gR = {
    class: "relative",
  },
  vR = {
    class: "flex justify-center",
  },
  xR = {
    class: "font-bold",
  },
  yR = {
    class: "mx-4 mt-4",
  },
  kR = Pl(
    "span",
    {
      class: "text-gray-500 text-2xl",
    },
    "Biografia",
    -1,
  ),
  wR = {
    class: "mx-4 mt-4",
  },
  CR = Pl("label", null, "O que voc\xea busca?", -1),
  _R = {
    class: "px-4 mt-4",
  },
  AR = {
    class: "flex justify-between",
  },
  SR = Pl(
    "p",
    {
      class: "text-3xl",
    },
    "Notifica\xe7\xf5es",
    -1,
  ),
  TR = {
    class: "text-center mt-32",
  };
an();
const ER = mR((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Header"),
    e4 = dl("app-select"),
    e7 = dl("app-toggle");
  return (
    wl(),
    _l("div", hR, [
      Pl(e6),
      e2.profile.id
        ? (wl(),
          _l("div", bR, [
            Pl("div", gR, [
              Pl(
                "img",
                {
                  src: e2.profile.image,
                  class: "relative mx-auto mt-16 w-64 h-64 rounded-full",
                },
                null,
                8,
                ["src"],
              ),
              Pl("img", {
                onClick: e0[1] || (e0[1] = (e$) => e2.changeAvatar()),
                class:
                  "absolute top-6 left-0 right-0 w-1/3 mx-auto opacity-0 hover:opacity-50 transition-opacity duration-300",
                style: {
                  filter: "invert(1)",
                },
                src: "http://simpleicon.com/wp-content/uploads/camera.svg",
                alt: "",
              }),
            ]),
            Pl("div", vR, [
              Pl("p", xR, g(e2.profile.name), 1),
              Pl("p", null, ", " + g(e2.profile.age), 1),
            ]),
            Pl("div", yR, [
              kR,
              Zn(
                Pl(
                  "textarea",
                  {
                    "onUpdate:modelValue":
                      e0[2] || (e0[2] = (e$) => (e2.profile.bio = e$)),
                    onChange:
                      e0[3] ||
                      (e0[3] = (...e$) => e2.changeBio && e2.changeBio(...e$)),
                    class:
                      "block w-full h-64 p-3 rounded-xl resize-none text-2xl",
                    spellcheck: "false",
                  },
                  null,
                  544,
                ),
                [[ns, e2.profile.bio]],
              ),
            ]),
            Pl("div", wR, [
              CR,
              Pl(
                e4,
                {
                  modelValue: e2.profile.target,
                  "onUpdate:modelValue":
                    e0[4] || (e0[4] = (e$) => (e2.profile.target = e$)),
                  options: {
                    Male: "Homens",
                    Female: "Mulheres",
                    All: "Todos",
                  },
                },
                null,
                8,
                ["modelValue"],
              ),
            ]),
            Pl("div", _R, [
              Pl("div", AR, [
                SR,
                Pl(
                  e7,
                  {
                    modelValue: e2.notifications,
                    "onUpdate:modelValue":
                      e0[5] || (e0[5] = (e$) => (e2.notifications = e$)),
                  },
                  null,
                  8,
                  ["modelValue"],
                ),
              ]),
            ]),
            Pl("div", TR, [
              Pl(
                "button",
                {
                  onClick:
                    e0[6] ||
                    (e0[6] = (...e$) =>
                      e2.deleteAccount && e2.deleteAccount(...e$)),
                  class: "bg-red-600 text-white rounded p-2 px-4 text-2xl",
                },
                "Excluir minha conta",
              ),
            ]),
          ]))
        : Ml("", !0),
    ])
  );
});
((fR.render = ER), (fR.__scopeId = "data-v-dfd1e998"));
const RR = {
  setup() {
    jl("setDark")();
    let e$ = uc().params.id,
      e0 = {
        dark: So.darkTheme.value || "",
        fontSize: document.documentElement.style.fontSize,
        android: So.settings.isAndroid,
      },
      e8 = Object.entries(e0)
        .map((e$) => e$.map(encodeURIComponent).join("="))
        .join("&");
    return {
      src: da(() => {
        var e0;
        return (
          (null == (e0 = So.settings.customApps) ? void 0 : e0[e$]) + "?" + e8
        );
      }),
      id: e$,
    };
  },
};
RR.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "iframe",
      {
        key: e2.id,
        class: "w-full h-full bg-theme",
        src: e2.src,
        frameborder: "0",
      },
      null,
      8,
      ["src"],
    )
  );
};
const PR = {
    props: ["title"],
    setup: () => ({
      isAndroid: So.settings.isAndroid,
    }),
  },
  LR = {
    class: "h-32 pt-16 bg-theme-accent border-b border-theme",
  },
  IR = {
    key: 0,
    class: "far fa-arrow-left",
  },
  OR = {
    key: 1,
    class: "fas fa-chevron-left text-blue-400",
  };
PR.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", LR, [
      Pl(
        "button",
        {
          onClick:
            e0[1] ||
            (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
          class: "absolute top-16 left-0 px-4",
        },
        [e2.isAndroid ? (wl(), _l("i", IR)) : (wl(), _l("i", OR))],
      ),
      Pl(
        "h1",
        {
          class: [
            "font-bold",
            {
              "ml-16": e2.isAndroid,
              "text-center": !e2.isAndroid,
            },
          ],
        },
        g(e8.title),
        3,
      ),
      Zt(e$.$slots, "default"),
    ])
  );
};
const MR = {
    components: {
      Header: PR,
    },
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = jl("confirm"),
        e0 = Zs("yellowpages"),
        e8 = (e$, e0) => e$.toLowerCase().includes(e0.toLowerCase()),
        e2 = rt(""),
        e3 = rt([]),
        e1 = da(() => {
          let e$ = e2.value;
          return e$
            ? e3.value.filter(
                ({ title: e0, author: e2 }) =>
                  e8(e0, e$) || e8(e2.name, e$) || e8(e2.phone, e$),
              )
            : e3.value;
        }),
        e6 = da(() =>
          e3.value.some((e$) => e$.author.user_id == So.identity.user_id),
        );
      return (
        So.backend.yellowpages_index().then((e$) => (e3.value = e$)),
        {
          appName: e0,
          dark: So.darkTheme,
          hasPost: e6,
          query: e2,
          posts: e1,
          call: function (e$) {
            So.pusher.emit("CALL_TO", e$);
          },
          destroy: function () {
            e$("Deseja excluir seu an\xfancio?").then(
              (e$) =>
                e$ &&
                So.backend.yellowpages_destroy().then(() => {
                  e3.value = e3.value.filter(
                    (e$) => e$.author.user_id != So.identity.user_id,
                  );
                }),
            );
          },
        }
      );
    },
  },
  VR = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  DR = Pl(
    "i",
    {
      class: "far fa-times text-red-500",
    },
    null,
    -1,
  ),
  NR = Pl(
    "i",
    {
      class: "far fa-plus text-blue-500",
    },
    null,
    -1,
  ),
  UR = {
    class: "flex-shrink p-5 relative",
  },
  $R = {
    class: "flex-1 overflow-y-auto hide-scroll px-5",
  },
  jR = {
    class: "text-center break-words pb-2",
  },
  FR = {
    class: "grid grid-cols-2 border-t border-yellow-700 pt-2 text-3xl",
  },
  zR = {
    class: "text-center border-r border-yellow-700",
  };
MR.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header"),
    e4 = dl("app-input");
  return (
    wl(),
    _l("div", VR, [
      Pl(
        e6,
        {
          title: e2.appName,
        },
        {
          default: en(() => [
            e2.hasPost
              ? (wl(),
                _l(
                  "button",
                  {
                    key: 0,
                    class: "absolute top-16 right-0 px-5",
                    onClick:
                      e0[1] ||
                      (e0[1] = (...e$) => e2.destroy && e2.destroy(...e$)),
                  },
                  [DR],
                ))
              : (wl(),
                _l(
                  "button",
                  {
                    key: 1,
                    class: "absolute top-16 right-0 px-5",
                    onClick:
                      e0[2] ||
                      (e0[2] = (e0) => e$.$router.push("/yellowpages/create")),
                  },
                  [NR],
                )),
          ]),
          _: 1,
        },
        8,
        ["title"],
      ),
      Pl("div", UR, [
        Pl(
          "i",
          {
            class: [
              "absolute top-9 left-10 fas fa-search text-2xl",
              [e2.dark ? "text-gray-800" : "text-gray-400"],
            ],
          },
          null,
          2,
        ),
        Pl(
          e4,
          {
            modelValue: e2.query,
            "onUpdate:modelValue": e0[3] || (e0[3] = (e$) => (e2.query = e$)),
            placeholder: "Buscar",
            class: "text-2xl bg-theme border-theme pl-14",
          },
          null,
          8,
          ["modelValue"],
        ),
      ]),
      Pl("ul", $R, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.posts,
            (e$) => (
              wl(),
              _l(
                "li",
                {
                  key: e$.id,
                  class: "bg-yellow-400 text-yellow-700 mx-auto p-5 mb-4",
                },
                [
                  Pl("p", jR, g(e$.title), 1),
                  Pl("div", FR, [
                    Pl("p", zR, g(e$.author.name), 1),
                    Pl(
                      "button",
                      {
                        class: "text-center",
                        onClick: (e0) => e2.call(e$.author.phone),
                      },
                      g(e$.author.phone),
                      9,
                      ["onClick"],
                    ),
                  ]),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
    ])
  );
};
const BR = {
    components: {
      Header: PR,
    },
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = cc(),
        e0 = rt("");
      return {
        dark: So.darkTheme,
        title: e0,
        publish: function () {
          e0.value.trim().length &&
            So.backend.yellowpages_store(e0.value).then(() => e$.back());
        },
      };
    },
  },
  HR = {
    class: "h-full bg-theme text-theme",
  },
  qR = {
    class: "p-5",
  },
  GR = Pl("label", null, "T\xedtulo", -1);
BR.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", HR, [
      Pl(e6, {
        title: "Criar um an\xfancio",
      }),
      Pl("div", qR, [
        GR,
        Zn(
          Pl(
            "textarea",
            {
              "onUpdate:modelValue": e0[1] || (e0[1] = (e$) => (e2.title = e$)),
              maxlength: "100",
              class:
                "block p-4 text-3xl text-theme w-full h-64 bg-theme border border-theme resize-none rounded-xl",
            },
            null,
            512,
          ),
          [[ns, e2.title]],
        ),
        Pl(
          "button",
          {
            onClick:
              e0[2] || (e0[2] = (...e$) => e2.publish && e2.publish(...e$)),
            class:
              "block ml-auto mt-4 px-4 py-3 rounded-xl bg-yellow-400 text-yellow-700",
          },
          "Publicar",
        ),
      ]),
    ])
  );
};
const WR = {
    inject: ["setDark"],
    data: () => ({
      result: 0,
      tmp_value: 0,
      reset: !1,
      operator: void 0,
      lastOperation: void 0,
    }),
    created() {
      this.setDark(!0);
    },
    methods: {
      clear() {
        ((this.result = 0),
          (this.tmp_value = 0),
          (this.operator = void 0),
          (this.lastOperation = void 0));
      },
      invert() {
        this.result *= -1;
      },
      percent() {
        this.result = (this.result / 100) * this.tmp_value;
      },
      addNumber(e$) {
        ((0 != this.result && !0 !== this.reset) ||
          ((this.result = ""), (this.reset = !1)),
          (this.result += e$.toString()));
      },
      addPoint() {
        this.result.includes(".") || (this.result += ".");
      },
      setOperator(e$) {
        (0 != this.tmp_value && this.calculate(),
          (this.tmp_value = this.result),
          (this.operator = e$),
          (this.reset = !0));
      },
      equal() {
        if (!this.operator && this.lastOperation) {
          let [e$, e0] = this.lastOperation;
          ((this.operator = e$),
            (this.tmp_value = this.result),
            (this.result = e0));
        }
        (this.calculate(), (this.tmp_value = 0), (this.operator = void 0));
      },
      calculate() {
        let e$ = 0,
          e0 = parseFloat(this.tmp_value),
          e8 = parseFloat(this.result);
        switch (this.operator) {
          case "+":
            e$ = e0 + e8;
            break;
          case "-":
            e$ = e0 - e8;
            break;
          case "*":
            e$ = e0 * e8;
            break;
          case "/":
            e$ = e0 / e8;
        }
        ((this.lastOperation = [this.operator, e8]),
          (this.result = e$.toString()));
      },
    },
  },
  KR = {
    class: "flex flex-col h-full bg-black",
  },
  JR = {
    class: "h-full p-5 pt-80 mt-32",
  },
  XR = {
    class: "flex justify-around",
  },
  YR = Pl(
    "i",
    {
      class: "fas fa-divide",
    },
    null,
    -1,
  ),
  ZR = {
    class: "flex justify-around mt-4",
  },
  QR = Pl(
    "i",
    {
      class: "fas fa-times",
    },
    null,
    -1,
  ),
  eP = {
    class: "flex justify-around mt-4",
  },
  tP = Pl(
    "i",
    {
      class: "fas fa-minus",
    },
    null,
    -1,
  ),
  nP = {
    class: "flex justify-around mt-4",
  },
  lP = Pl(
    "i",
    {
      class: "fas fa-plus",
    },
    null,
    -1,
  ),
  aP = {
    class: "flex justify-around mt-4",
  },
  sP = Pl(
    "i",
    {
      class: "fas fa-equals",
    },
    null,
    -1,
  );
WR.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", KR, [
      Pl("div", JR, [
        Zn(
          Pl(
            "input",
            {
              class:
                "block bg-transparent text-white w-full text-right p-4 h-52",
              style: {
                fontSize:
                  Math.min(8, (20 / String(e3.result).length) * 2.75) + "rem",
              },
              type: "text",
              "onUpdate:modelValue":
                e0[1] || (e0[1] = (e$) => (e3.result = e$)),
              disabled: "",
            },
            null,
            4,
          ),
          [[ns, e3.result]],
        ),
        Pl("div", XR, [
          Pl(
            "div",
            {
              class: "bg-gray-500 w-28 py-8 text-center rounded-full",
              onClick:
                e0[2] || (e0[2] = (...e$) => e1.clear && e1.clear(...e$)),
            },
            "AC",
          ),
          Pl(
            "div",
            {
              class: "bg-gray-500 w-28 py-8 text-center rounded-full",
              onClick:
                e0[3] || (e0[3] = (...e$) => e1.invert && e1.invert(...e$)),
            },
            "+/-",
          ),
          Pl(
            "div",
            {
              class: "bg-gray-500 w-28 py-8 text-center rounded-full",
              onClick:
                e0[4] || (e0[4] = (...e$) => e1.percent && e1.percent(...e$)),
            },
            "%",
          ),
          Pl(
            "div",
            {
              class:
                "bg-orange-400 text-white w-28 py-8 text-center rounded-full",
              onClick: e0[5] || (e0[5] = (e$) => e1.setOperator("/")),
            },
            [YR],
          ),
        ]),
        Pl("div", ZR, [
          (wl(),
          _l(
            bl,
            null,
            fa([7, 8, 9], (e$) =>
              Pl(
                "div",
                {
                  key: e$,
                  onClick: (e0) => e1.addNumber(e$),
                  class:
                    "bg-gray-800 text-white w-28 py-8 text-center rounded-full",
                },
                g(e$),
                9,
                ["onClick"],
              ),
            ),
            64,
          )),
          Pl(
            "div",
            {
              class:
                "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
              onClick: e0[6] || (e0[6] = (e$) => e1.setOperator("*")),
            },
            [QR],
          ),
        ]),
        Pl("div", eP, [
          (wl(),
          _l(
            bl,
            null,
            fa([4, 5, 6], (e$) =>
              Pl(
                "div",
                {
                  key: e$,
                  onClick: (e0) => e1.addNumber(e$),
                  class:
                    "bg-gray-800 text-white w-28 py-8 text-center rounded-full",
                },
                g(e$),
                9,
                ["onClick"],
              ),
            ),
            64,
          )),
          Pl(
            "div",
            {
              class:
                "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
              onClick: e0[7] || (e0[7] = (e$) => e1.setOperator("-")),
            },
            [tP],
          ),
        ]),
        Pl("div", nP, [
          (wl(),
          _l(
            bl,
            null,
            fa([1, 2, 3], (e$) =>
              Pl(
                "div",
                {
                  key: e$,
                  onClick: (e0) => e1.addNumber(e$),
                  class:
                    "bg-gray-800 text-white w-28 py-8 text-center rounded-full",
                },
                g(e$),
                9,
                ["onClick"],
              ),
            ),
            64,
          )),
          Pl(
            "div",
            {
              class:
                "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
              onClick: e0[8] || (e0[8] = (e$) => e1.setOperator("+")),
            },
            [lP],
          ),
        ]),
        Pl("div", aP, [
          Pl(
            "div",
            {
              onClick: e0[9] || (e0[9] = (e$) => e1.addNumber(0)),
              class: "bg-gray-800 text-white w-60 py-8 pl-12 rounded-full",
            },
            "0",
          ),
          Pl(
            "div",
            {
              onClick:
                e0[10] ||
                (e0[10] = (...e$) => e1.addPoint && e1.addPoint(...e$)),
              class:
                "bg-gray-800 text-white w-28 py-8 text-center rounded-full",
            },
            ".",
          ),
          Pl(
            "div",
            {
              class:
                "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
              onClick:
                e0[11] || (e0[11] = (...e$) => e1.equal && e1.equal(...e$)),
            },
            [sP],
          ),
        ]),
      ]),
    ])
  );
};
const oP = {
    props: ["title"],
    setup: () => ({
      isAndroid: So.settings.isAndroid,
    }),
  },
  rP = {
    class:
      "flex flex-shrink-0 h-32 pt-16 bg-theme-accent border-b border-theme",
  },
  iP = {
    key: 0,
    class: "far fa-arrow-left",
  },
  cP = {
    key: 1,
    class: "fas fa-chevron-left text-note",
  };
oP.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", rP, [
      Pl(
        "button",
        {
          class: "absolute left-0 top-16 px-5",
          onClick:
            e0[1] ||
            (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
        },
        [e2.isAndroid ? (wl(), _l("i", iP)) : (wl(), _l("i", cP))],
      ),
      Pl(
        "h1",
        {
          class: [
            {
              "ml-16": e2.isAndroid,
              "mx-auto": !e2.isAndroid,
            },
            "font-bold",
          ],
        },
        g(e8.title),
        3,
      ),
      Zt(e$.$slots, "default"),
    ])
  );
};
const uP = {
    components: {
      Header: oP,
    },
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = jl("confirm"),
        e0 = localStorage.getItem("smartphone@notes"),
        e8 = rt(e0 ? JSON.parse(e0) : []);
      return {
        notes: e8,
        change: function (e$, e0) {
          let e2 = e8.value,
            e3 = e2[e0];
          ((e2[e0] = e2[e$]),
            (e2[e$] = e3),
            localStorage.setItem("smartphone@notes", JSON.stringify(e2)));
        },
        destroy: function (e0) {
          e$("Deseja apagar essa anota\xe7\xe3o?").then((e$) => {
            if (e$) {
              let e2 = e8.value;
              (e2.splice(e0, 1),
                localStorage.setItem("smartphone@notes", JSON.stringify(e2)));
            }
          });
        },
      };
    },
  },
  dP = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  pP = Pl(
    "i",
    {
      class: "far fa-plus text-note",
    },
    null,
    -1,
  ),
  fP = {
    class: "flex-grow overflow-y-auto hide-scroll",
  },
  mP = Pl(
    "i",
    {
      class: "fas fa-chevron-up text-lg text-note",
    },
    null,
    -1,
  ),
  hP = Pl(
    "i",
    {
      class: "fas fa-chevron-down text-lg text-note",
    },
    null,
    -1,
  ),
  bP = {
    class: "ml-4 flex flex-col",
  },
  gP = {
    key: 0,
    class: "text-2xl overflow-x-hidden",
  },
  vP = {
    key: 1,
    class: "text-2xl italic",
  },
  xP = {
    class: "text-gray-500 text-xl",
  },
  yP = Pl(
    "i",
    {
      class: "far fa-trash-alt text-note text-xl",
    },
    null,
    -1,
  );
uP.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", dP, [
      Pl(
        e6,
        {
          title: "Notas",
        },
        {
          default: en(() => [
            Pl(
              "button",
              {
                class: "absolute right-0 top-16 px-5",
                onClick:
                  e0[1] || (e0[1] = (e0) => e$.$router.push("/notes/create")),
              },
              [pP],
            ),
          ]),
          _: 1,
        },
      ),
      Pl("ul", fP, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.notes,
            (e8, e3) => (
              wl(),
              _l(
                "li",
                {
                  key: e3,
                  class: "flex items-center border-b border-theme p-2",
                  onClick: (e0) => e$.$router.push("/notes/" + e3),
                },
                [
                  Pl(
                    "div",
                    {
                      class: "flex flex-col",
                      onClick: e0[2] || (e0[2] = is(() => {}, ["stop"])),
                    },
                    [
                      e3 > 0
                        ? (wl(),
                          _l(
                            "button",
                            {
                              key: 0,
                              onClick: is(
                                (e$) => e2.change(e3, e3 - 1),
                                ["stop"],
                              ),
                            },
                            [mP],
                            8,
                            ["onClick"],
                          ))
                        : Ml("", !0),
                      e3 < e2.notes.length - 1
                        ? (wl(),
                          _l(
                            "button",
                            {
                              key: 1,
                              onClick: is(
                                (e$) => e2.change(e3, e3 + 1),
                                ["stop"],
                              ),
                            },
                            [hP],
                            8,
                            ["onClick"],
                          ))
                        : Ml("", !0),
                    ],
                  ),
                  Pl("div", bP, [
                    e8.text.trim()
                      ? (wl(), _l("p", gP, g(e8.text.substr(0, 32)), 1))
                      : (wl(), _l("p", vP, "(Sem conte\xfado)")),
                    Pl(
                      "p",
                      xP,
                      g(new Date(e8.updated_at).toLocaleString("pt-BR")),
                      1,
                    ),
                  ]),
                  Pl(
                    "button",
                    {
                      class: "ml-auto px-5",
                      onClick: is((e$) => e2.destroy(e3), ["stop"]),
                    },
                    [yP],
                    8,
                    ["onClick"],
                  ),
                ],
                8,
                ["onClick"],
              )
            ),
          ),
          128,
        )),
      ]),
    ])
  );
};
const kP = {
    components: {
      Header: oP,
    },
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = cc(),
        e0 = rt("");
      return (
        Lt(() => document.querySelector("textarea").focus()),
        {
          text: e0,
          save: function () {
            var e8;
            let e2 = JSON.parse(
                null != (e8 = localStorage.getItem("smartphone@notes"))
                  ? e8
                  : "[]",
              ),
              e3 = Date.now();
            (e2.push({
              text: e0.value,
              created_at: e3,
              updated_at: e3,
            }),
              localStorage.setItem("smartphone@notes", JSON.stringify(e2)),
              e$.back());
          },
        }
      );
    },
  },
  wP = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  CP = Pl(
    "i",
    {
      class: "far fa-file text-note",
    },
    null,
    -1,
  );
kP.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", wP, [
      Pl(
        e6,
        {
          title: "Nova anota\xe7\xe3o",
        },
        {
          default: en(() => [
            Pl(
              "button",
              {
                class: "absolute right-0 top-16 px-5",
                onClick:
                  e0[1] || (e0[1] = (...e$) => e2.save && e2.save(...e$)),
              },
              [CP],
            ),
          ]),
          _: 1,
        },
      ),
      Zn(
        Pl(
          "textarea",
          {
            onKeydown:
              e0[2] ||
              (e0[2] = us(
                is(() => {}, ["prevent"]),
                ["enter"],
              )),
            maxlength: "10000",
            class: "flex-1 w-full p-2 fancy-scroll resize-none bg-theme",
            "onUpdate:modelValue": e0[3] || (e0[3] = (e$) => (e2.text = e$)),
          },
          null,
          544,
        ),
        [[ns, e2.text]],
      ),
    ])
  );
};
const _P = {
    components: {
      Header: oP,
    },
    setup() {
      jl("setDark")(So.darkTheme.value);
      let e$ = cc(),
        e0 = e$.currentRoute.value.params.id,
        e8 = rt(JSON.parse(localStorage.getItem("smartphone@notes"))[e0].text);
      return {
        text: e8,
        save: function () {
          let e2 = JSON.parse(localStorage.getItem("smartphone@notes"));
          ((e2[e0].text = e8.value),
            (e2[e0].updated_at = Date.now()),
            localStorage.setItem("smartphone@notes", JSON.stringify(e2)),
            e$.back());
        },
      };
    },
  },
  AP = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  SP = Pl(
    "i",
    {
      class: "far fa-pencil text-note",
    },
    null,
    -1,
  );
_P.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Header");
  return (
    wl(),
    _l("div", AP, [
      Pl(
        e6,
        {
          title: "Editar anota\xe7\xe3o",
        },
        {
          default: en(() => [
            Pl(
              "button",
              {
                class: "absolute right-0 top-16 px-5",
                onClick:
                  e0[1] || (e0[1] = (...e$) => e2.save && e2.save(...e$)),
              },
              [SP],
            ),
          ]),
          _: 1,
        },
      ),
      Zn(
        Pl(
          "textarea",
          {
            onKeydown:
              e0[2] ||
              (e0[2] = us(
                is(() => {}, ["prevent"]),
                ["enter"],
              )),
            maxlength: "10000",
            class: "flex-1 w-full p-2 fancy-scroll resize-none bg-theme",
            "onUpdate:modelValue": e0[3] || (e0[3] = (e$) => (e2.text = e$)),
          },
          null,
          544,
        ),
        [[ns, e2.text]],
      ),
    ])
  );
};
const TP = Ze([]),
  EP = {
    inject: ["setDark"],
    setup() {
      let e$ = So.settings.isAndroid,
        e0 = Zs("weazel"),
        e8 = Ze(
          So.localhost
            ? [
                {
                  id: 1,
                  title: "Jacinto pinto morre engasgado",
                  description:
                    "N\xe3o foi encontrado nenhum pinto no local, a policia informou que est\xe1 atr\xe1s de quem possa ter causado este incidente...",
                  imageURL: "https://picsum.photos/200",
                  views: 0,
                  created_at: Date.now() / 1e3 - 300,
                },
              ]
            : [],
        ),
        e2 = rt(),
        e3 = rt(So.localhost),
        e1 = rt(So.hasNotificationFor("weazel"));
      return (
        Tn(e1, (e$) => So.setNotificationFor("weazel", e$)),
        TP.length || So.backend.weazel_tags().then((e$) => TP.push(...e$)),
        So.backend.weazel_index().then((e$) => {
          e8.push(...e$);
        }),
        So.backend.weazel_check().then((e$) => (e3.value = e$)),
        So.pusher.on("WEAZEL_DESTROY", (e$) => {
          let e0 = e8.findIndex((e0) => e0.id == e$);
          e0 >= 0 && e8.splice(e0, 1);
        }),
        {
          isAndroid: e$,
          isJournalist: e3,
          notifications: e1,
          destroy: async function (e$) {
            (await So.confirm(
              "Tem certeza que deseja excluir esta not\xedcia?",
            )) && So.backend.weazel_destroy(e$);
          },
          title: e0,
          news: e8,
          tags: TP,
          setTag: function (e$) {
            e2.value != e$ &&
              ((e2.value = e$),
              So.backend.weazel_tag(e$).then((e$) => {
                ((e8.length = 0), e8.push(...e$));
              }));
          },
        }
      );
    },
    created() {
      this.setDark(!0);
    },
  },
  RP = {
    class: "h-full flex flex-col bg-theme text-theme",
  },
  PP = {
    class: "h-32 pt-12 bg-weazel flex items-center",
  },
  LP = {
    key: 0,
    class: "far fa-arrow-left mr-4",
  },
  IP = {
    key: 1,
    class: "fas fa-chevron-left",
  },
  OP = {
    key: 0,
    class: "far fa-bell",
  },
  MP = {
    key: 1,
    class: "far fa-bell-slash",
  },
  VP = Pl(
    "i",
    {
      class: "fas fa-pen-alt",
    },
    null,
    -1,
  ),
  DP = {
    class: "flex-1 overflow-y-auto hide-scroll",
  },
  NP = {
    class: "flex flex-wrap p-5 text-xl",
  },
  UP = {
    class: "p-5 rounded-xl",
  },
  $P = {
    class: "flex items-start",
  },
  jP = {
    class: "flex-1",
  },
  FP = {
    class: "text-3xl mb-2 font-bold",
  },
  zP = {
    class: "text-lg opacity-75 overflow-ellipsis",
  },
  BP = {
    class: "flex items-center text-xl",
  },
  HP = {
    class: "opacity-50",
  },
  qP = Pl(
    "i",
    {
      class: "far fa-eye ml-2 mr-1",
    },
    null,
    -1,
  ),
  GP = {
    key: 0,
    class: "ml-auto space-x-4",
  },
  WP = Pl(
    "i",
    {
      class: "fas fa-pen-alt",
    },
    null,
    -1,
  ),
  KP = Pl(
    "i",
    {
      class: "far fa-trash-alt",
    },
    null,
    -1,
  );
EP.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", RP, [
      Pl("div", PP, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-16 px-5",
          },
          [e2.isAndroid ? (wl(), _l("i", LP)) : (wl(), _l("i", IP))],
        ),
        Pl(
          "h1",
          {
            class: [
              {
                "ml-16": e2.isAndroid,
                "mx-auto": !e2.isAndroid,
              },
              "font-bold",
            ],
          },
          g(e2.title),
          3,
        ),
        Pl(
          "button",
          {
            onClick:
              e0[2] || (e0[2] = (e$) => (e2.notifications = !e2.notifications)),
            class: "absolute top-20 right-8 w-6 h-4 flex flex-center",
          },
          [e2.notifications ? (wl(), _l("i", OP)) : (wl(), _l("i", MP))],
        ),
      ]),
      e2.isJournalist
        ? (wl(),
          _l(
            "button",
            {
              key: 0,
              onClick:
                e0[3] || (e0[3] = (e0) => e$.$router.push("/weazel/create")),
              class:
                "bg-weazel w-24 h-24 absolute bottom-8 right-8 rounded-full",
            },
            [VP],
          ))
        : Ml("", !0),
      Pl("div", DP, [
        Pl("div", NP, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.tags,
              (e$) => (
                wl(),
                _l(
                  "button",
                  {
                    key: e$,
                    onClick: (e0) => e2.setTag(e$),
                    class: "bg-theme-accent p-2 mt-2 rounded-xl mr-5",
                  },
                  g(e$),
                  9,
                  ["onClick"],
                )
              ),
            ),
            128,
          )),
        ]),
        Pl("ul", UP, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.news,
              (e0) => (
                wl(),
                _l(
                  "li",
                  {
                    key: e0.id,
                    onClick: (e8) => e$.$router.push("/weazel/" + e0.id),
                    class: "border-b border-theme py-5",
                  },
                  [
                    Pl("div", $P, [
                      Pl("div", jP, [
                        Pl("h1", FP, g(e0.title), 1),
                        Pl(
                          "p",
                          zP,
                          g(
                            e$.$filters.ellipsis(
                              e0.description.split("\n")[0],
                              120,
                            ),
                          ),
                          1,
                        ),
                      ]),
                      e0.imageURL
                        ? (wl(),
                          _l(
                            "img",
                            {
                              key: 0,
                              class: "h-32 ml-4 rounded-xl",
                              src: e0.imageURL,
                            },
                            null,
                            8,
                            ["src"],
                          ))
                        : Ml("", !0),
                    ]),
                    Pl("div", BP, [
                      Pl("span", HP, [
                        Il(
                          g(e$.$filters.unixToRelative(e0.created_at)) + " ",
                          1,
                        ),
                        qP,
                        Il(" " + g(e0.views.toLocaleString()), 1),
                      ]),
                      e2.isJournalist
                        ? (wl(),
                          _l("div", GP, [
                            Pl(
                              "button",
                              {
                                onClick: is(
                                  (e8) =>
                                    e$.$router.push(
                                      "/weazel/" + e0.id + "/edit",
                                    ),
                                  ["stop"],
                                ),
                                class: "ml-auto text-blue-600",
                              },
                              [WP],
                              8,
                              ["onClick"],
                            ),
                            Pl(
                              "button",
                              {
                                onClick: is(
                                  (e$) => e2.destroy(e0.id),
                                  ["stop"],
                                ),
                                class: "ml-auto text-red-600",
                              },
                              [KP],
                              8,
                              ["onClick"],
                            ),
                          ]))
                        : Ml("", !0),
                    ]),
                  ],
                  8,
                  ["onClick"],
                )
              ),
            ),
            128,
          )),
        ]),
      ]),
    ])
  );
};
const JP = {
  props: {
    modelValue: {
      required: !0,
    },
    type: {
      default: "text",
    },
    noborder: {
      required: !1,
      default: !1,
    },
    format: {
      required: !1,
    },
    darkable: {
      required: !1,
    },
  },
  methods: {
    changeValue({ target: e$ }) {
      ("money" === this.format
        ? (e$.value = this.$filters.moneyStringToInt(e$.value))
        : "int" === this.format &&
          (e$.value = Math.floor(e$.value.replace(/\D/g, ""))),
        this.$emit("update:modelValue", e$.value));
    },
  },
};
JP.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "input",
      {
        type: e8.type,
        value: e8.modelValue,
        onInput:
          e0[1] || (e0[1] = (...e$) => e1.changeValue && e1.changeValue(...e$)),
        class: [
          "w-full p-3 py-4",
          {
            "rounded-lg border focus:border-blue-400": !e8.noborder,
            "bg-theme border-theme": e8.darkable,
          },
        ],
      },
      null,
      42,
      ["type", "value"],
    )
  );
};
const XP = {
  props: {
    modelValue: {
      required: !0,
    },
    options: {
      default: {},
    },
    darkable: {
      required: !1,
    },
  },
};
XP.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "select",
      {
        value: e8.modelValue,
        onChange:
          e0[1] ||
          (e0[1] = (e0) => e$.$emit("update:modelValue", e0.target.value)),
        class: [
          "w-full p-3 rounded-lg border focus:border-blue-400",
          {
            "bg-theme border-theme": e8.darkable,
          },
        ],
      },
      [
        Pl(
          "option",
          {
            disabled: "",
            selected: null == e8.modelValue,
            value: null,
          },
          "Escolha uma op\xe7\xe3o",
          8,
          ["selected"],
        ),
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e8.options,
            (e$, e0) => (
              wl(),
              _l(
                "option",
                {
                  key: e0,
                  value: e0,
                  selected: e8.modelValue == e0,
                },
                g(e$),
                9,
                ["value", "selected"],
              )
            ),
          ),
          128,
        )),
      ],
      42,
      ["value"],
    )
  );
};
const YP = Ze({
    title: "",
    description: "",
    author: So.identity.name,
  }),
  ZP = {
    components: {
      Input: JP,
      Select: XP,
    },
    setup() {
      let e$ = So.settings.isAndroid,
        { id: e0 } = uc().params,
        e8 = Ze({});

      function e2(e$) {
        if (null == e$ ? void 0 : e$.error) So.alert(e$.error);
        else {
          for (let e0 in (VO.back(), YP))
            "title" == e0 || "description" == e0
              ? (YP[e0] = "")
              : delete YP[e0];
          YP.author = So.identity.name;
        }
      }
      return (
        So.backend.weazel_tags().then((e$) => {
          for (let e0 of e$) e8[e0] = e0;
        }),
        e0 && So.backend.weazel_view(e0).then((e$) => Object.assign(YP, e$)),
        {
          isAndroid: e$,
          onImageClick: function () {
            So.useAnyImage("/").then(
              (e$) => {
                YP.imageURL = e$;
              },
              () => {},
            );
          },
          onPublishClick: function () {
            e0
              ? So.backend.weazel_update(e0, YP).then(e2)
              : So.backend.weazel_publish(YP).then(e2);
          },
          onPreviewClick: function () {
            So.addNotification("weazel", YP.title, Ns(YP.description, 120));
          },
          form: YP,
          tags: e8,
        }
      );
    },
  },
  QP = {
    class: "h-full flex flex-col bg-theme text-theme",
  },
  eL = {
    class: "h-32 pt-12 bg-weazel flex items-center",
  },
  tL = {
    key: 0,
    class: "far fa-arrow-left mr-4",
  },
  nL = {
    key: 1,
    class: "fas fa-chevron-left",
  },
  lL = {
    class: "p-5 text-2xl space-y-4 overflow-y-auto hide-scroll",
  },
  aL = Pl("label", null, "T\xedtulo", -1),
  sL = Pl("label", null, "Autor", -1),
  oL = Pl("label", null, "Categoria", -1),
  rL = Pl("label", null, "Descri\xe7\xe3o", -1),
  iL = Pl("label", null, "V\xeddeo", -1),
  cL = Pl("label", null, "Imagem", -1),
  uL = {
    class: "text-right",
  };
ZP.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Input"),
    e4 = dl("Select");
  return (
    wl(),
    _l("div", QP, [
      Pl("div", eL, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-16 px-5",
          },
          [e2.isAndroid ? (wl(), _l("i", tL)) : (wl(), _l("i", nL))],
        ),
        Pl(
          "h1",
          {
            class: [
              {
                "ml-16": e2.isAndroid,
                "mx-auto": !e2.isAndroid,
              },
              "font-bold",
            ],
          },
          g(e2.form.id ? "Editar not\xedcia" : "Criar not\xedcia"),
          3,
        ),
      ]),
      Pl("div", lL, [
        Pl("div", null, [
          aL,
          Pl(
            e6,
            {
              class: "text-xl bg-theme border-theme",
              modelValue: e2.form.title,
              "onUpdate:modelValue":
                e0[2] || (e0[2] = (e$) => (e2.form.title = e$)),
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", null, [
          sL,
          Pl(
            e6,
            {
              class: "text-xl bg-theme border-theme",
              modelValue: e2.form.author,
              "onUpdate:modelValue":
                e0[3] || (e0[3] = (e$) => (e2.form.author = e$)),
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", null, [
          oL,
          Pl(
            e4,
            {
              class: "text-xl py-4 bg-theme border-theme",
              modelValue: e2.form.tag,
              "onUpdate:modelValue":
                e0[4] || (e0[4] = (e$) => (e2.form.tag = e$)),
              options: e2.tags,
            },
            null,
            8,
            ["modelValue", "options"],
          ),
        ]),
        Pl("div", null, [
          rL,
          Zn(
            Pl(
              "textarea",
              {
                class:
                  "block resize-none mt-1 w-full bg-theme rounded-xl border border-theme p-2",
                "onUpdate:modelValue":
                  e0[5] || (e0[5] = (e$) => (e2.form.description = e$)),
                rows: "8",
              },
              null,
              512,
            ),
            [[ns, e2.form.description]],
          ),
        ]),
        Pl("div", null, [
          iL,
          Pl(
            e6,
            {
              class: "text-xl bg-theme border-theme",
              modelValue: e2.form.videoURL,
              "onUpdate:modelValue":
                e0[6] || (e0[6] = (e$) => (e2.form.videoURL = e$)),
              placeholder:
                "Exemplo: https://www.youtube.com/watch?v=cDg7eF99nR",
            },
            null,
            8,
            ["modelValue"],
          ),
        ]),
        Pl("div", null, [
          cL,
          e2.form.imageURL
            ? (wl(),
              _l(
                "img",
                {
                  key: 0,
                  onClick:
                    e0[7] ||
                    (e0[7] = (...e$) =>
                      e2.onImageClick && e2.onImageClick(...e$)),
                  src: e2.form.imageURL,
                  class: "rounded-xl w-1/2",
                  alt: "",
                },
                null,
                8,
                ["src"],
              ))
            : (wl(),
              _l(
                "button",
                {
                  key: 1,
                  onClick:
                    e0[8] ||
                    (e0[8] = (...e$) =>
                      e2.onImageClick && e2.onImageClick(...e$)),
                  class: "bg-weazel block p-2 rounded mt-1",
                },
                "Adicionar",
              )),
        ]),
        Pl("div", uL, [
          e2.form.id
            ? Ml("", !0)
            : (wl(),
              _l(
                "button",
                {
                  key: 0,
                  onClick:
                    e0[9] ||
                    (e0[9] = (...e$) =>
                      e2.onPreviewClick && e2.onPreviewClick(...e$)),
                  class: "bg-weazel p-2 px-4 mr-4 rounded mt-1",
                },
                "Prever notifica\xe7\xe3o",
              )),
          Pl(
            "button",
            {
              onClick:
                e0[10] ||
                (e0[10] = (...e$) =>
                  e2.onPublishClick && e2.onPublishClick(...e$)),
              class: "bg-weazel p-2 px-4 rounded mt-1",
            },
            "Publicar",
          ),
        ]),
      ]),
    ])
  );
};
const dL = {
    setup() {
      let e$ = So.settings.isAndroid,
        e0 = uc().params,
        e8 = Ze(
          So.localhost
            ? {
                title: "T\xedtulo da not\xedcia",
                description: "Descri\xe7\xe3o da not\xedcia",
                tag: "Fofocas",
                author: "Will Dev",
                imageURL: "https://picsum.photos/1920/1080",
                views: 0,
                videoURL: "",
                created_at: Date.now() / 1e3,
              }
            : {},
        ),
        e2 = da(() => {
          if ("string" != typeof e8.videoURL) return null;
          for (let e$ of [/watch\?v=(\w+)/, /youtu\.be\/(\w+)/]) {
            let e0 = e8.videoURL.match(e$);
            if (e0) return "https://www.youtube.com/embed/" + e0[1];
          }
        });
      return (
        So.backend.weazel_view(e0.id).then((e$) => {
          e$ ? Object.assign(e8, e$) : VO.back();
        }),
        {
          isAndroid: e$,
          post: e8,
          videoURL: e2,
        }
      );
    },
  },
  pL = {
    class: "h-full flex flex-col bg-theme text-theme",
  },
  fL = {
    class: "h-32 pt-12 bg-weazel flex items-center",
  },
  mL = {
    key: 0,
    class: "far fa-arrow-left mr-4",
  },
  hL = {
    key: 1,
    class: "fas fa-chevron-left",
  },
  bL = {
    key: 0,
    class: "flex-1 overflow-y-auto hide-scroll p-5 rounded-xl",
  },
  gL = {
    class: "space-y-4",
  },
  vL = {
    class: "text-3xl whitespace-pre-wrap opacity-75",
  },
  xL = {
    class: "flex justify-between text-xl opacity-50",
  },
  yL = {
    class: "text-xl opacity-50",
  };
let kL;
dL.render = function (e$, e0, e8, e2, e3, e1) {
  var e6;
  return (
    wl(),
    _l("div", pL, [
      Pl("div", fL, [
        Pl(
          "button",
          {
            onClick: e0[1] || (e0[1] = (e0) => e$.$router.back()),
            class: "absolute top-16 px-5",
          },
          [e2.isAndroid ? (wl(), _l("i", mL)) : (wl(), _l("i", hL))],
        ),
        Pl(
          "h1",
          {
            class: [
              {
                "ml-16": e2.isAndroid,
                "mx-auto": !e2.isAndroid,
              },
              "font-bold overflow-ellipsis w-96 overflow-hidden whitespace-nowrap",
            ],
          },
          g(null != (e6 = e2.post.title) ? e6 : "Carregando..."),
          3,
        ),
      ]),
      e2.post.description
        ? (wl(),
          _l("div", bL, [
            Pl("div", gL, [
              Pl("p", vL, g(e2.post.description), 1),
              e2.post.imageURL
                ? (wl(),
                  _l(
                    "img",
                    {
                      key: 0,
                      class: "w-full rounded-xl",
                      src: e2.post.imageURL,
                    },
                    null,
                    8,
                    ["src"],
                  ))
                : Ml("", !0),
              e2.videoURL
                ? (wl(),
                  _l(
                    "iframe",
                    {
                      key: 1,
                      class: "w-full aspect-16/9 rounded-xl",
                      src: e2.videoURL,
                      title: "YouTube video player",
                      frameborder: "0",
                      allow:
                        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                      allowfullscreen: "",
                    },
                    null,
                    8,
                    ["src"],
                  ))
                : Ml("", !0),
              Pl("div", xL, [
                Pl(
                  "h1",
                  null,
                  g(e$.$filters.unixToRelative(e2.post.created_at)) +
                    " - Em " +
                    g(e2.post.tag),
                  1,
                ),
                Pl("h1", null, g(e2.post.author), 1),
              ]),
            ]),
            Pl("h1", yL, g(e2.post.views) + " visualiza\xe7\xf5es", 1),
          ]))
        : Ml("", !0),
    ])
  );
};
const wL = {},
  CL = [0, 1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7, 14],
  _L = Array(10).fill(CL).flat(),
  AL = {
    setup() {
      let e$ = rt(),
        e0 = rt(),
        e8 = rt(),
        e2 = rt(0),
        e3 = rt(""),
        e1 = rt(!1),
        e6 = Ze({
          black: {
            size: 0,
            amount: 0,
            mine: 0,
          },
          red: {
            size: 0,
            amount: 0,
            mine: 0,
          },
          white: {
            size: 0,
            amount: 0,
            mine: 0,
          },
        }),
        e4 = Ze([]),
        e7 = jl("addBalance"),
        e5 = jl("onceTab"),
        eV = So.settings.currency,
        eN = !1;
      async function e9(e$) {
        if (!eN) {
          for (eN = !0; e$ > 0; ) {
            if (!e8.value || !e0.value) return;
            ((e8.value.innerHTML = (e$ / 1e3).toFixed(2) + "s"),
              (e0.value.style.width = (e$ / 15e3) * 100 + "%"),
              (e$ -= 40),
              await eo(40));
          }
          ((eN = !1), (e8.value.innerHTML = ""), (e0.value.style.width = "0%"));
        }
      }

      function eU(e$, e0, e8) {
        return new Promise((e2) => {
          e$.animate([e0], e8).onfinish = () => {
            (Object.assign(e$.style, e0), e2());
          };
        });
      }
      return (
        e5("CASINO_DOUBLE", (e0) => {
          ((async function (e0) {
            let e8 = 826.75 + 7 * CL.indexOf(e0),
              e2 = e$.value;
            if (e2 instanceof HTMLElement) {
              var e3;
              e2.style.opacity = 1;
              let e1 = `translateX(-${
                e8 + 3 * Math.random() * (Math.random() > 0.5 ? 1 : -1)
              }rem)`;
              (await eU(
                e2,
                {
                  transform: e1,
                },
                {
                  duration: 8e3,
                  easing: "ease-in-out",
                },
              ),
                await eU(
                  e2,
                  {
                    transform: `translateX(-${e8}rem)`,
                  },
                  {
                    duration: 500,
                    delay: 1e3,
                    easing: "ease-out",
                  },
                ),
                await eo(2e3),
                await eU(
                  e2,
                  {
                    transform: "translate(-91.75rem)",
                  },
                  {
                    duration: 500,
                    delay: 2e3,
                  },
                ),
                (e2.style.opacity = 0.5));
              let e5 = 0 == (e3 = e0) ? "white" : e3 < 8 ? "red" : "black",
                eV = e6[e5].mine * ("white" == e5 ? 14 : 2);
              (e4.push(e5) > 10 && e4.shift(), e7(eV));
            }
          })(e0),
            (e1.value = !0));
        }),
        e5("CASINO_DOUBLE_RESET", () => {
          for (let e$ in e6)
            ((e6[e$].size = 0), (e6[e$].amount = 0), (e6[e$].mine = 0));
          e1.value = !1;
        }),
        e5("CASINO_DOUBLE_BET", ({ color: e$, amount: e0 }) => {
          ((e6[e$].size += 1), (e6[e$].amount += e0));
        }),
        So.backend.casino_double().then(async (e$) => {
          if ((e4.push(...e$.last), "rolling" === e$.status))
            ((e1.value = !0), await e9(e$.delay));
          else if ("bet" === e$.status) {
            for (let [e0, [e8, e2]] of Object.entries(e$.aggregate))
              Object.assign(e6[e0], {
                size: e8,
                amount: e2,
              });
            await e9(e$.delay);
          }
        }),
        {
          currency: eV,
          lastColors: e4,
          roulette: e$,
          progress: e0,
          timer: e8,
          pretty: function (e$) {
            return (null != e$ ? e$ : 0).toLocaleString();
          },
          bet: function () {
            let e$ = e3.value,
              e0 = parseInt(e2.value);
            e0 &&
              e0 > 0 &&
              e3.value &&
              So.backend.casino_double_bet(e$, e0).then((e8) => {
                e8.error
                  ? So.alert(e8.error)
                  : ((e6[e$].mine += e0), e7(-e0), e9(e8));
              });
          },
          bets: e6,
          amount: e2,
          multiply: function (e$) {
            let e0 = parseInt(e2.value);
            e0 && e0 > 0 && (e2.value = Math.ceil(e0 * e$));
          },
          color: e3,
          waiting: e1,
          repeated: _L,
        }
      );
    },
  },
  SL = {
    class: "p-5 bg-blaze space-y-5 mb-4",
  },
  TL = {
    class: "container relative py-36 pb-6 bg-blaze-dark rounded-xl",
  },
  EL = {
    class:
      "absolute top-0 p-5 pt-1 h-20 inset-x-0 border-b border-coolGray-800",
  },
  RL = Pl(
    "h1",
    {
      class: "text-lg text-white mb-1",
    },
    "\xdaltimas rodadas",
    -1,
  ),
  PL = {
    class: "flex space-x-6",
  },
  LL = {
    key: 1,
    class: "far fa-circle text-xl text-white",
  },
  IL = {
    class: "absolute inset-x-5 rounded overflow-hidden top-24 z-1",
  },
  OL = {
    ref: "progress",
    style: {
      width: "0",
    },
    class: "bg-blaze-red h-6",
  },
  ML = {
    ref: "timer",
    class: "absolute text-white inset-x-0 text-center text-base top-0",
  },
  VL = Pl(
    "div",
    {
      class: "absolute inset-x-0 bottom-2 top-32 z-1",
    },
    [
      Pl("div", {
        class: "h-full rounded-full w-1.5 bg-white mx-auto",
      }),
    ],
    -1,
  ),
  DL = {
    class: "mx-5 rounded-xl overflow-hidden",
  },
  NL = {
    class: "wrapper",
  },
  UL = {
    ref: "roulette",
    style: {
      transform: "translateX(-91.75rem)",
      opacity: "0.5",
    },
    class: "flex space-x-4 transition-opacity duration-500",
  },
  $L = {
    key: 1,
  },
  jL = {
    class: "flex justify-between",
  },
  FL = {
    class: "relative w-64 text-xl",
  },
  zL = {
    class: "absolute right-4 top-6 font-bold text-gray-300",
  },
  BL = Pl(
    "h1",
    {
      class: "text-gray-300 text-xl",
    },
    "Selecionar cor",
    -1,
  ),
  HL = {
    class: "grid grid-cols-3 gap-5",
  },
  qL = {
    class: "flex justify-between items-center p-5 pr-10 bg-blaze mb-4",
  },
  GL = Pl(
    "div",
    {
      class: "w-16 h-16 rounded-xl bg-blaze-red flex flex-center text-white",
    },
    [
      Pl("i", {
        class: "far fa-circle text-4xl",
      }),
    ],
    -1,
  ),
  WL = Pl(
    "h1",
    {
      class: "mr-auto text-white text-2xl ml-4",
    },
    "Vit\xf3ria 2x",
    -1,
  ),
  KL = {
    class: "text-xl text-right",
  },
  JL = {
    class: "text-gray-300",
  },
  XL = {
    class: "text-white font-bold",
  },
  YL = {
    class: "flex justify-between items-center p-5 pr-10 bg-blaze mb-4",
  },
  ZL = {
    class: "w-16 h-16 rounded-xl bg-white flex flex-center text-white",
  },
  QL = Pl(
    "h1",
    {
      class: "mr-auto text-white text-2xl ml-4",
    },
    "Vit\xf3ria 14x",
    -1,
  ),
  eI = {
    class: "text-xl text-right",
  },
  tI = {
    class: "text-gray-300",
  },
  nI = {
    class: "text-white font-bold",
  },
  lI = {
    class: "flex justify-between items-center p-5 pr-10 bg-blaze",
  },
  aI = Pl(
    "div",
    {
      class: "w-16 h-16 rounded-xl bg-blaze-black flex flex-center text-white",
    },
    [
      Pl("i", {
        class: "far fa-circle text-4xl",
      }),
    ],
    -1,
  ),
  sI = Pl(
    "h1",
    {
      class: "mr-auto text-white text-2xl ml-4",
    },
    "Vit\xf3ria 2x",
    -1,
  ),
  oI = {
    class: "text-xl text-right",
  },
  rI = {
    class: "text-gray-300",
  },
  iI = {
    class: "text-white font-bold",
  };
AL.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      bl,
      null,
      [
        Pl("div", SL, [
          Pl("div", TL, [
            Pl("div", EL, [
              RL,
              Pl("div", PL, [
                (wl(!0),
                _l(
                  bl,
                  null,
                  fa(
                    e2.lastColors,
                    (e0, e8) => (
                      wl(),
                      _l(
                        "div",
                        {
                          key: e8,
                          class: [
                            "w-8 h-8 rounded flex flex-center",
                            ["bg-blaze-" + e0],
                          ],
                        },
                        [
                          "white" == e0
                            ? (wl(),
                              _l(
                                "img",
                                {
                                  key: 0,
                                  class: "w-4",
                                  src: e$.$asset(
                                    "/apps/blaze.svg",
                                    "casinoLogo",
                                  ),
                                  alt: "",
                                },
                                null,
                                8,
                                ["src"],
                              ))
                            : (wl(), _l("i", LL)),
                        ],
                        2,
                      )
                    ),
                  ),
                  128,
                )),
              ]),
            ]),
            Pl("div", IL, [Pl("div", OL, null, 512), Pl("h1", ML, null, 512)]),
            VL,
            Pl("div", DL, [
              Pl("div", NL, [
                Pl(
                  "div",
                  UL,
                  [
                    (wl(!0),
                    _l(
                      bl,
                      null,
                      fa(
                        e2.repeated,
                        (e0, e8) => (
                          wl(),
                          _l(
                            "div",
                            {
                              key: e8,
                              class: [
                                "blaze-tile",
                                0 == e0
                                  ? "bg-white"
                                  : e0 > 7
                                    ? "bg-blaze-black text-white"
                                    : "bg-blaze-red text-white",
                              ],
                            },
                            [
                              0 == e0
                                ? (wl(),
                                  _l(
                                    "img",
                                    {
                                      key: 0,
                                      class: "w-12",
                                      src: e$.$asset(
                                        "/apps/blaze.svg",
                                        "casinoLogo",
                                      ),
                                      alt: "",
                                    },
                                    null,
                                    8,
                                    ["src"],
                                  ))
                                : (wl(), _l("span", $L, g(e0), 1)),
                            ],
                            2,
                          )
                        ),
                      ),
                      128,
                    )),
                  ],
                  512,
                ),
              ]),
            ]),
          ]),
          Pl("div", jL, [
            Pl("div", FL, [
              Zn(
                Pl(
                  "input",
                  {
                    "onUpdate:modelValue":
                      e0[1] || (e0[1] = (e$) => (e2.amount = e$)),
                    class:
                      "w-full bg-blaze-dark p-6 font-bold rounded-xl text-gray-300 placeholder-current",
                    placeholder: "Quantia",
                    type: "text",
                  },
                  null,
                  512,
                ),
                [[ns, e2.amount]],
              ),
              Pl("h1", zL, g(e2.currency), 1),
            ]),
            Pl(
              "button",
              {
                onClick: e0[2] || (e0[2] = (e$) => e2.multiply(0.5)),
                class:
                  "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
              },
              " \xbd ",
            ),
            Pl(
              "button",
              {
                onClick: e0[3] || (e0[3] = (e$) => e2.multiply(2)),
                class:
                  "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
              },
              " 2x ",
            ),
          ]),
          BL,
          Pl("div", HL, [
            Pl(
              "button",
              {
                class: [
                  {
                    border: "red" == e2.color,
                  },
                  "bg-blaze-red text-white text-2xl rounded-lg h-20",
                ],
                onClick: e0[4] || (e0[4] = (e$) => (e2.color = "red")),
              },
              " x2 ",
              2,
            ),
            Pl(
              "button",
              {
                class: [
                  {
                    border: "white" == e2.color,
                  },
                  "bg-white text-blaze-red text-2xl rounded-lg h-20 border-red-600",
                ],
                onClick: e0[5] || (e0[5] = (e$) => (e2.color = "white")),
              },
              " x14 ",
              2,
            ),
            Pl(
              "button",
              {
                class: [
                  {
                    border: "black" == e2.color,
                  },
                  "bg-blaze-black text-white text-2xl rounded-lg h-20",
                ],
                onClick: e0[6] || (e0[6] = (e$) => (e2.color = "black")),
              },
              " x2 ",
              2,
            ),
          ]),
          Pl(
            "button",
            {
              onClick: e0[7] || (e0[7] = (...e$) => e2.bet && e2.bet(...e$)),
              class: [
                "bg-blaze-red w-full h-20 text-white font-bold text-2xl rounded-lg",
                {
                  "opacity-50": e2.waiting,
                },
              ],
            },
            g(e2.waiting ? "Esperando" : "Come\xe7ar o jogo"),
            3,
          ),
        ]),
        Pl("div", qL, [
          GL,
          WL,
          Pl("div", KL, [
            Pl(
              "h1",
              JL,
              g(e2.pretty(e2.bets.red.size)) + " Total de Apostas",
              1,
            ),
            Pl("h1", XL, g(e$.$filters.intToMoney(e2.bets.red.amount)), 1),
          ]),
        ]),
        Pl("div", YL, [
          Pl("div", ZL, [
            Pl(
              "img",
              {
                class: "w-8",
                src: e$.$asset("/apps/blaze.svg", "casinoLogo"),
                alt: "",
              },
              null,
              8,
              ["src"],
            ),
          ]),
          QL,
          Pl("div", eI, [
            Pl(
              "h1",
              tI,
              g(e2.pretty(e2.bets.white.size)) + " Total de Apostas",
              1,
            ),
            Pl("h1", nI, g(e$.$filters.intToMoney(e2.bets.white.amount)), 1),
          ]),
        ]),
        Pl("div", lI, [
          aI,
          sI,
          Pl("div", oI, [
            Pl(
              "h1",
              rI,
              g(e2.pretty(e2.bets.black.size)) + " Total de Apostas",
              1,
            ),
            Pl("h1", iI, g(e$.$filters.intToMoney(e2.bets.black.amount)), 1),
          ]),
        ]),
      ],
      64,
    )
  );
};
const cI = {
    setup() {
      let e$ = So.settings.currency,
        e0 = rt(0),
        e8 = rt(0),
        e2 = rt(!1),
        e3 = rt(0),
        e1 = rt(0),
        e6 = rt(0),
        e4 = rt(!1),
        e7 = Ze([]),
        e5 = rt(),
        eV = rt(),
        eN = jl("onceTab"),
        e9 = jl("addBalance"),
        eU,
        ej = !1;
      async function eD(e$, e0 = 15e3) {
        (clearInterval(ej),
          (ej = setInterval(() => {
            if (e$ <= 0)
              return (
                (e5.value.innerHTML = ""),
                (eV.value.style.width = "0%"),
                clearInterval(ej)
              );
            e5.value &&
              eV.value &&
              ((e5.value.innerHTML = (e$ / 1e3).toFixed(2) + "s"),
              (eV.value.style.width = (e$ / e0) * 100 + "%"),
              (e$ = Math.max(0, e$ - 40)));
          }, 40)));
      }

      function ez(e$ = 1) {
        ((e0.value = e$),
          (eU = setInterval(() => {
            let e$ = e0.value;
            e0.value += 0.005 * Math.floor(e$);
          }, 50)));
      }
      return (
        So.backend.casino_crash().then(async (e$) => {
          (e7.push(...e$.last),
            (e6.value = e$.totalBet),
            "waiting" === e$.status && e$.delay
              ? await eD(e$.delay)
              : "crashing" === e$.status
                ? (await ez(e$.multiplier), e$.totalBet || (e2.value = !0))
                : "ending" === e$.status &&
                  ((e4.value = !0),
                  (e0.value = e$.multiplier),
                  (e2.value = !0)));
        }),
        eN("CASINO_CRASH_CASHOUT", (e$) => (e8.value = e$)),
        eN("CASINO_CRASH_ENDING", (e$) => {
          (clearInterval(eU),
            e7.push(e$) > 10 && e7.shift(),
            (e0.value = e$),
            (e4.value = !0),
            (e2.value = !0),
            eD(5e3, 5e3));
        }),
        eN("CASINO_CRASH_REFRESH", () => {
          ((e2.value = !1),
            (e0.value = 0),
            (e4.value = !1),
            (e6.value = 0),
            (e8.value = null));
        }),
        eN("CASINO_CRASH", (e$) => {
          ((e0.value = 1), e$ ? (e4.value = !0) : ez());
        }),
        eN("CASINO_CRASH_WARMUP", () => eD(15e3)),
        wn(() => {
          (clearInterval(eU), clearInterval(ej));
        }),
        {
          currency: e$,
          timer: e5,
          progress: eV,
          won: e8,
          crashed: e4,
          multiplier: e0,
          start: ez,
          waiting: e2,
          bet: function () {
            var e$, e0;
            if (e2.value) return;
            let e8 = parseInt(e3.value);
            if (e8 && e8 > 0) {
              let e4 =
                parseFloat(
                  null == (e0 = null == (e$ = e1.value) ? void 0 : e$.replace)
                    ? void 0
                    : e0.call(e$, ",", "."),
                ) || null;
              So.backend.casino_crash_bet(e8, e4).then((e$) => {
                e$.error
                  ? So.alert(e$.error)
                  : ((e6.value += e8), e9(-e8), eD(e$.delay));
              });
            }
          },
          stop: function () {
            e2.value ||
              So.backend.casino_crash_cashout().then((e$) => {
                e$.error
                  ? So.alert(e$.error)
                  : ((e6.value = 0), e9(e$[1]), (e8.value = e$));
              });
          },
          totalBet: e6,
          amount: e3,
          multiply: function (e$) {
            let e0 = parseInt(e3.value);
            e0 && e0 > 0 && (e3.value = Math.ceil(e0 * e$));
          },
          cashout: e1,
          rounds: e7,
        }
      );
    },
  },
  uI = sn("data-v-6c02b606");
ln("data-v-6c02b606");
const dI = {
    class: "p-5 bg-blaze h-full overflow-y-auto space-y-5",
  },
  pI = {
    class: "p-3 rounded-3xl bg-blaze-dark relative",
  },
  fI = {
    class: "flex justify-end text-white space-x-4 text-2xl overflow-hidden",
  },
  mI = {
    class: "absolute inset-x-10 rounded overflow-hidden top-24 z-1",
  },
  hI = {
    ref: "progress",
    style: {
      width: "0",
    },
    class: "bg-blaze-red h-8",
  },
  bI = {
    ref: "timer",
    class: "absolute text-white inset-x-0 text-center text-2xl top-0",
  },
  gI = {
    key: 0,
    class:
      "absolute text-center inset-0 flex justify-center items-start top-40",
  },
  vI = {
    class:
      "bg-blaze-green rounded-xl overflow-hidden text-white text-4xl leading-loose",
  },
  xI = {
    class: "bg-green-600 leading-loose text-xl px-4",
  },
  yI = {
    key: 0,
    class:
      "bg-blaze-red rounded-xl overflow-hidden text-white text-4xl w-40 leading-loose",
  },
  kI = Pl(
    "p",
    {
      class: "bg-red-700 leading-loose text-xl",
    },
    "CRASHED",
    -1,
  ),
  wI = {
    key: 1,
    class: "bg-blaze-light rounded-xl text-white w-32",
  },
  CI = Pl(
    "i",
    {
      class: "f6-thin block text-white text-opacity-5",
      style: {
        "font-size": "32.5rem",
        "line-height": "0.95",
      },
    },
    "",
    -1,
  ),
  _I = {
    class: "flex justify-between",
  },
  AI = {
    class: "relative w-64 text-xl",
  },
  SI = {
    class: "absolute right-4 top-6 font-bold text-gray-300",
  },
  TI = {
    class: "relative w-full text-xl",
  },
  EI = Pl(
    "label",
    {
      class: "text-xl text-gray-300",
    },
    "Auto retirar",
    -1,
  ),
  RI = Pl(
    "h1",
    {
      class: "absolute right-4 top-16 font-bold text-gray-300",
    },
    "X",
    -1,
  );
an();
const PI = uI(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l("div", dI, [
      Pl("div", pI, [
        Pl("ul", fI, [
          (wl(!0),
          _l(
            bl,
            null,
            fa(
              e2.rounds,
              (e$, e0) => (
                wl(),
                _l(
                  "li",
                  {
                    key: e0,
                    class: [
                      "p-2 rounded-xl",
                      {
                        "bg-blaze-light": e$ < 2,
                        "bg-blaze-green": e$ >= 2,
                      },
                    ],
                  },
                  g(e$.toFixed(2)),
                  3,
                )
              ),
            ),
            128,
          )),
        ]),
        Pl("div", mI, [Pl("div", hI, null, 512), Pl("h1", bI, null, 512)]),
        e2.won
          ? (wl(),
            _l("div", gI, [
              Pl("div", vI, [
                Il(" x " + g(e2.won[0].toFixed(2)) + " ", 1),
                Pl(
                  "p",
                  xI,
                  "VOC\xca GANHOU! " + g(e$.$filters.intToMoney(e2.won[1])),
                  1,
                ),
              ]),
            ]))
          : Ml("", !0),
        e2.multiplier
          ? (wl(),
            _l(
              "div",
              {
                key: 1,
                class: [
                  {
                    "top-28": e2.won,
                  },
                  "absolute text-center inset-0 grid place-items-center",
                ],
              },
              [
                e2.crashed
                  ? (wl(),
                    _l("div", yI, [
                      Il(g(e2.multiplier.toFixed(2)) + "x ", 1),
                      kI,
                    ]))
                  : e2.multiplier
                    ? (wl(),
                      _l("div", wI, g(e2.multiplier.toFixed(2)) + "x ", 1))
                    : Ml("", !0),
              ],
              2,
            ))
          : Ml("", !0),
        CI,
      ]),
      e2.totalBet > 0 && e2.multiplier > 0
        ? (wl(),
          _l(
            "button",
            {
              key: 0,
              onClick: e0[1] || (e0[1] = (...e$) => e2.stop && e2.stop(...e$)),
              class: [
                "bg-blaze-red w-full h-20 text-white font-bold text-2xl rounded-lg",
                {
                  "opacity-50": e2.waiting,
                },
              ],
            },
            " Parar " + g(e$.$filters.intToMoney(e2.totalBet * e2.multiplier)),
            3,
          ))
        : (wl(),
          _l(
            "button",
            {
              key: 1,
              onClick: e0[2] || (e0[2] = (...e$) => e2.bet && e2.bet(...e$)),
              class: [
                "bg-blaze-red w-full h-20 text-white font-bold text-2xl rounded-lg",
                {
                  "opacity-50": e2.waiting,
                },
              ],
            },
            g(e2.waiting ? "Esperando" : "Come\xe7ar o jogo"),
            3,
          )),
      Pl("div", _I, [
        Pl("div", AI, [
          Zn(
            Pl(
              "input",
              {
                "onUpdate:modelValue":
                  e0[3] || (e0[3] = (e$) => (e2.amount = e$)),
                class:
                  "w-full bg-blaze-dark p-6 font-bold rounded-xl text-gray-300 placeholder-current",
                placeholder: "Quantia",
                type: "text",
              },
              null,
              512,
            ),
            [[ns, e2.amount]],
          ),
          Pl("h1", SI, g(e2.currency), 1),
        ]),
        Pl(
          "button",
          {
            onClick: e0[4] || (e0[4] = (e$) => e2.multiply(0.5)),
            class:
              "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
          },
          " \xbd ",
        ),
        Pl(
          "button",
          {
            onClick: e0[5] || (e0[5] = (e$) => e2.multiply(2)),
            class:
              "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
          },
          " 2x ",
        ),
      ]),
      Pl("div", TI, [
        EI,
        Zn(
          Pl(
            "input",
            {
              "onUpdate:modelValue":
                e0[6] || (e0[6] = (e$) => (e2.cashout = e$)),
              class:
                "w-full bg-blaze-dark mt-2 p-6 font-bold rounded-xl text-gray-300 placeholder-current",
              placeholder: "Quantia",
              type: "text",
            },
            null,
            512,
          ),
          [[ns, e2.cashout]],
        ),
        RI,
      ]),
    ])
  ),
);
((cI.render = PI), (cI.__scopeId = "data-v-6c02b606"));
const LI = Ze({
  revealed: {},
});

function II() {
  (Object.keys(LI).forEach((e$) => delete LI[e$]), (LI.revealed = {}));
}
const OI = {
    setup() {
      let e$ = So.settings.currency,
        e0 = rt(0),
        e8 = rt(2),
        e2 = da(() => Object.keys(LI.revealed).length > 0),
        e3 = jl("addBalance");
      return {
        currency: e$,
        game: LI,
        canFinish: e2,
        amount: e0,
        mines: e8,
        multiply: function (e$) {
          let e8 = parseInt(e0.value);
          e8 && e8 > 0 && (e0.value = Math.ceil(e8 * e$));
        },
        click: function (e$) {
          e$ in LI.revealed ||
            !LI.id ||
            LI.lost ||
            LI.clicking ||
            ((LI.clicking = !0),
            So.backend
              .casino_mine_click(e$)
              .then((e0) => {
                if (e0.error) return So.alert(e0.error);
                ("mine" == e0[0] && (LI.lost = !0),
                  (LI.revealed[e$] = e0[0]),
                  (LI.reward = e0[1]));
              })
              .finally(() => (LI.clicking = !1)));
        },
        play: function () {
          if (LI.lost) II();
          else if (LI.id)
            ((LI.clicking = !0),
              So.backend.casino_mine_finish().then((e$) => {
                e$.error ? So.alert(e$.error) : (e3(e$.reward), II());
              }));
          else {
            let e$ = parseInt(e0.value) || 0;
            So.backend.casino_mine_start(e$, e8.value).then((e0) => {
              e0.error ? So.alert(e0.error) : (e3(-e$), Object.assign(LI, e0));
            });
          }
        },
        finish: function () {
          e2.value &&
            So.backend.casino_mine_finish().then((e$) => {
              if (e$.error) return So.alert(e$.error);
              (e3(e$.reward), II());
            });
        },
      };
    },
  },
  MI = {
    class: "bg-blaze h-full p-5 space-y-5",
  },
  VI = {
    class: "bg-blaze-dark grid grid-cols-5 gap-8 p-5 rounded-xl",
  },
  DI = {
    key: 0,
    class: "fad fa-gem text-lightBlue-400 animate-flip",
  },
  NI = {
    key: 1,
    class: "fal fa-bomb text-blaze-red animate-flip",
  },
  UI = {
    key: 0,
    class: "flex justify-between",
  },
  $I = {
    class: "relative w-64 text-xl",
  },
  jI = {
    class: "absolute right-4 top-6 font-bold text-gray-300",
  },
  FI = {
    key: 1,
    class: "text-xl space-y-2",
  },
  zI = Pl(
    "h1",
    {
      class: "text-white",
    },
    "Quantidade de minas",
    -1,
  ),
  BI = {
    key: 2,
    class: "text-xl space-y-2",
  },
  HI = Pl(
    "h1",
    {
      class: "text-white",
    },
    "Pr\xeamio",
    -1,
  );
OI.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", MI, [
      Pl("div", VI, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            Array(25),
            (e$, e0) => (
              wl(),
              _l(
                "button",
                {
                  key: e0,
                  onClick: (e$) => e2.click(e0),
                  class:
                    "aspect-1/1 bg-gradient-to-br from-coolGray-800 to-coolGray-900 rounded-lg flex flex-center",
                },
                [
                  "diamond" == e2.game.revealed[e0]
                    ? (wl(), _l("i", DI))
                    : "mine" == e2.game.revealed[e0]
                      ? (wl(), _l("i", NI))
                      : Ml("", !0),
                ],
                8,
                ["onClick"],
              )
            ),
          ),
          128,
        )),
      ]),
      e2.game.id
        ? Ml("", !0)
        : (wl(),
          _l("div", UI, [
            Pl("div", $I, [
              Zn(
                Pl(
                  "input",
                  {
                    "onUpdate:modelValue":
                      e0[1] || (e0[1] = (e$) => (e2.amount = e$)),
                    class:
                      "w-full bg-blaze-dark p-6 font-bold rounded-xl text-gray-300 placeholder-current",
                    placeholder: "Quantia",
                    type: "text",
                  },
                  null,
                  512,
                ),
                [[ns, e2.amount]],
              ),
              Pl("h1", jI, g(e2.currency), 1),
            ]),
            Pl(
              "button",
              {
                onClick: e0[2] || (e0[2] = (e$) => e2.multiply(0.5)),
                class:
                  "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
              },
              " \xbd ",
            ),
            Pl(
              "button",
              {
                onClick: e0[3] || (e0[3] = (e$) => e2.multiply(2)),
                class:
                  "border w-32 rounded-xl text-2xl border-gray-600 text-gray-200",
              },
              " 2x ",
            ),
          ])),
      e2.game.id
        ? (wl(),
          _l("div", BI, [
            HI,
            Pl(
              "input",
              {
                disabled: "",
                value: e2.game.reward,
                class:
                  "w-full bg-blaze-dark p-6 font-bold rounded-xl text-gray-300 placeholder-current",
                placeholder: "Quantidade",
                type: "text",
              },
              null,
              8,
              ["value"],
            ),
          ]))
        : (wl(),
          _l("div", FI, [
            zI,
            Zn(
              Pl(
                "input",
                {
                  "onUpdate:modelValue":
                    e0[4] || (e0[4] = (e$) => (e2.mines = e$)),
                  class:
                    "w-full bg-blaze-dark p-6 font-bold rounded-xl text-gray-300 placeholder-current",
                  placeholder: "Quantidade",
                  type: "text",
                },
                null,
                512,
              ),
              [[ns, e2.mines]],
            ),
          ])),
      !e2.game.id || e2.game.lost
        ? (wl(),
          _l(
            "button",
            {
              key: 3,
              onClick: e0[5] || (e0[5] = (...e$) => e2.play && e2.play(...e$)),
              class: "bg-blaze-red w-full py-4 text-xl text-white rounded-lg",
            },
            g(e2.game.lost ? "Jogar novamente" : "Jogar"),
            1,
          ))
        : (wl(),
          _l(
            "button",
            {
              key: 4,
              onClick:
                e0[6] || (e0[6] = (...e$) => e2.finish && e2.finish(...e$)),
              class: [
                "bg-blaze-red w-full py-4 text-xl text-white rounded-lg",
                {
                  "opacity-50": !e2.canFinish,
                },
              ],
            },
            " Finalizar ",
            2,
          )),
    ])
  );
};
const qI = {
    components: {
      Double: AL,
      Crash: cI,
      Mine: OI,
    },
    setup() {
      let e$ = So.settings.currency,
        e0 = rt("double"),
        e8 = rt(0),
        e2 = [];

      function e3(e$) {
        var e0;
        ((e0 = e8),
          $k.has(e0) && $k.get(e0)(),
          $k.delete(e0),
          jk(e8, e8.value + e$));
      }

      function e1() {
        for (let { event: e$, callback: e0 } of e2)
          So.pusher.removeListener(e$, e0);
        e2.length = 0;
      }
      return (
        (function (e$, e0) {
          if (!e0) return e$();
          if (void 0 === kL) {
            let e8 = document.createElement("link").relList;
            kL =
              e8 && e8.supports && e8.supports("modulepreload")
                ? "modulepreload"
                : "preload";
          }
          Promise.all(
            e0.map((e$) => {
              if (e$ in wL) return;
              wL[e$] = !0;
              let e0 = e$.endsWith(".css");
              if (
                document.querySelector(
                  `link[href="${e$}"]${e0 ? '[rel="stylesheet"]' : ""}`,
                )
              )
                return;
              let e8 = document.createElement("link");
              return (
                (e8.rel = e0 ? "stylesheet" : kL),
                e0 || ((e8.as = "script"), (e8.crossOrigin = "")),
                (e8.href = e$),
                document.head.appendChild(e8),
                e0
                  ? new Promise((e$, e0) => {
                      (e8.addEventListener("load", e$),
                        e8.addEventListener("error", e0));
                    })
                  : void 0
              );
            }),
          ).then(() => e$());
        })(
          () =>
            __import__(
              "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js",
            ),
          void 0,
        ),
        $l("setBalance", (e$) => jk(e8, e$)),
        $l("addBalance", e3),
        $l("onceTab", function (e$, e0) {
          (e2.push({
            event: e$,
            callback: e0,
          }),
            So.pusher.on(e$, e0));
        }),
        So.pusher.on("CASINO_INCREMENT", e3),
        Tn(e0, e1),
        wn(e1),
        So.backend.casino_balance().then((e$) => (e8.value = Number(e$))),
        {
          currency: e$,
          tab: e0,
          balance: e8,
          deposit: function () {
            So.prompt("Digite o valor do dep\xf3sito").then(
              (e$) => {
                let e0 = parseInt(e$);
                e0 &&
                  e0 > 0 &&
                  So.backend.casino_deposit(e0).then((e$) => {
                    e$ && (e8.value += e0);
                  });
              },
              () => {},
            );
          },
          withdraw: function () {
            So.prompt("Digite o valor do saque").then(
              (e$) => {
                let e0 = parseInt(e$);
                e0 &&
                  e0 > 0 &&
                  So.backend.casino_withdraw(e0).then((e$) => {
                    e$ && (e8.value -= e0);
                  });
              },
              () => {},
            );
          },
        }
      );
    },
    mounted() {
      So.backend.casino_subscribe();
    },
    unmounted() {
      So.backend.casino_unsubscribe();
    },
  },
  GI = {
    class: "h-full flex flex-col bg-blaze-dark sofia-pro",
  },
  WI = {
    class: "h-36 pt-12 px-10 flex justify-start items-center flex-shrink-0",
  },
  KI = {
    class:
      "border rounded-xl border-gray-700 ml-auto font-bold p-3 flex space-x-5 text-2xl",
  },
  JI = {
    class: "text-coolGray-400",
  },
  XI = {
    class: "text-white",
  },
  YI = Pl(
    "i",
    {
      class: "fas fa-exchange",
    },
    null,
    -1,
  ),
  ZI = {
    class:
      "mt-auto flex-shrink-0 h-32 grid grid-cols-3 bg-coolGray-800 text-white text-xl border-t border-coolGray-700",
  },
  QI = Pl(
    "svg",
    {
      width: "3rem",
      height: "3rem",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      Pl("path", {
        d: "M1 6H0V14H1C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V7C2 6.73478 1.89464 6.48043 1.70711 6.29289C1.51957 6.10536 1.26522 6 1 6Z",
        fill: "#8C9099",
      }),
      Pl("path", {
        d: "M19 6C18.7348 6 18.4804 6.10536 18.2929 6.29289C18.1054 6.48043 18 6.73478 18 7V13C18 13.2652 18.1054 13.5196 18.2929 13.7071C18.4804 13.8946 18.7348 14 19 14H20V6H19Z",
        fill: "#8C9099",
      }),
      Pl("path", {
        d: "M9 14V4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H9V14Z",
        fill: "#414952",
      }),
      Pl("path", {
        d: "M14 4H11V16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4Z",
        fill: "#414952",
      }),
      Pl("path", {
        d: "M9 19C9 19.2652 9.10536 19.5196 9.29289 19.7071C9.48043 19.8946 9.73478 20 10 20C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V16H9V19Z",
        fill: "#8C9099",
      }),
      Pl("path", {
        d: "M11 1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V4H11V1Z",
        fill: "#8C9099",
      }),
    ],
    -1,
  ),
  eO = Pl(
    "h1",
    {
      class: "mt-2",
    },
    "Double",
    -1,
  ),
  tO = Pl(
    "svg",
    {
      width: "3rem",
      height: "3rem",
      viewBox: "0 0 21 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      Pl("path", {
        d: "M13.14 5C12.69 5.45 12.14 5.64 11.9 5.41C11.66 5.18 11.9 4.63 12.32 4.17C12.74 3.71 13.32 3.53 13.56 3.76C13.8 3.99 13.6 4.53 13.14 5Z",
        fill: "#414952",
      }),
      Pl("path", {
        d: "M18 0H2C1.46957 0 0.96086 0.210714 0.585787 0.585786C0.210714 0.960859 0 1.46957 0 2V20C6.28 20 10.6 15.76 12.25 10.67C12.8089 10.8838 13.4016 10.9956 14 11C14.11 11 14.2 11 14.31 11C13.2234 14.7898 10.7158 18.0139 7.31 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0V0ZM14 9C13.4067 9 12.8266 8.82405 12.3333 8.49441C11.8399 8.16476 11.4554 7.69623 11.2284 7.14805C11.0013 6.59987 10.9419 5.99667 11.0576 5.41473C11.1734 4.83279 11.4591 4.29824 11.8787 3.87868C12.2982 3.45912 12.8328 3.1734 13.4147 3.05764C13.9967 2.94189 14.5999 3.0013 15.1481 3.22836C15.6962 3.45542 16.1648 3.83994 16.4944 4.33329C16.8241 4.82664 17 5.40666 17 6C17 6.79565 16.6839 7.55871 16.1213 8.12132C15.5587 8.68393 14.7957 9 14 9Z",
        fill: "#8C9099",
      }),
      Pl("path", {
        d: "M19.94 1.54006C19.94 1.45006 19.94 1.35006 19.86 1.26006C19.8414 1.22776 19.8247 1.19436 19.81 1.16006L19.69 0.940059L19.62 0.830059L19.51 0.660059C19.4821 0.618792 19.4485 0.581747 19.41 0.550059L19.22 0.420059L19.08 0.320059C19.0366 0.29081 18.9895 0.267283 18.94 0.250059C18.8034 0.172451 18.6594 0.108797 18.51 0.0600586C18.5241 0.206388 18.5241 0.353729 18.51 0.500059V16.7501C18.51 17.2142 18.3256 17.6593 17.9975 17.9875C17.6693 18.3157 17.2241 18.5001 16.76 18.5001H9.41002C8.74004 19.0592 8.02418 19.561 7.27002 20.0001H18C18.5305 20.0001 19.0392 19.7893 19.4142 19.4143C19.7893 19.0392 20 18.5305 20 18.0001V2.00006C20.0158 1.87054 20.0158 1.73958 20 1.61006C19.9847 1.58307 19.9644 1.5593 19.94 1.54006Z",
        fill: "#414952",
      }),
    ],
    -1,
  ),
  nO = Pl(
    "h1",
    {
      class: "mt-2",
    },
    "Crash",
    -1,
  ),
  lO = Pl(
    "svg",
    {
      width: "3rem",
      height: "3rem",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    [
      Pl("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M16.0889 6.31927L15.2989 7.09927C14.9289 7.46927 13.5889 6.72927 12.2989 5.43927C11.8226 4.96474 11.3969 4.44192 11.0289 3.87927C10.6689 3.30927 10.4989 2.87927 10.5889 2.57927C9.99471 2.44642 9.38773 2.37935 8.77888 2.37927C6.83085 2.37942 4.93857 3.02963 3.40187 4.22687C1.86517 5.42412 0.771943 7.09993 0.295399 8.98877C-0.181146 10.8776 -0.0137504 12.8715 0.771062 14.6544C1.55588 16.4374 2.91322 17.9074 4.62803 18.8317C6.34284 19.756 8.31705 20.0816 10.2378 19.7569C12.1586 19.4322 13.9161 18.4759 15.2319 17.0394C16.5477 15.6029 17.3465 13.7684 17.5017 11.8265C17.657 9.88468 17.1597 7.94657 16.0889 6.31927ZM5.33888 7.05927C4.33888 8.11927 3.09888 8.62927 2.68888 8.21927C2.27888 7.80927 2.79888 6.61927 3.84888 5.56927C4.89888 4.51927 6.08888 3.99927 6.49888 4.40927C6.90888 4.81927 6.38888 5.99927 5.33888 7.05927Z",
        fill: "#414952",
      }),
      Pl("path", {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M10.0289 18.6294C8.37383 18.6292 6.75272 18.1596 5.35379 17.2751C3.95485 16.3905 2.83547 15.1274 2.12559 13.6323C1.41571 12.1371 1.14445 10.4713 1.34329 8.82817C1.54213 7.18505 2.20291 5.63202 3.24894 4.34937C2.29467 5.12084 1.51335 6.08441 0.955698 7.17749C0.39805 8.27057 0.0765523 9.46873 0.0120843 10.6941C-0.0523837 11.9196 0.141619 13.1448 0.581494 14.2904C1.02137 15.436 1.69728 16.4762 2.56533 17.3435C3.43338 18.2109 4.47416 18.8859 5.62008 19.3249C6.766 19.7638 7.99143 19.9568 9.21679 19.8914C10.4422 19.8259 11.6401 19.5034 12.7327 18.9449C13.8253 18.3864 14.7882 17.6043 15.5589 16.6494C14.0021 17.9327 12.0465 18.6329 10.0289 18.6294Z",
        fill: "#414952",
      }),
      Pl("path", {
        d: "M14.529 3.87937C14.4516 3.87953 14.3756 3.8588 14.309 3.81937C14.2498 3.79057 14.1969 3.75037 14.1533 3.70108C14.1097 3.65179 14.0762 3.59437 14.0549 3.53212C14.0335 3.46988 14.0246 3.40402 14.0288 3.33834C14.0329 3.27266 14.05 3.20844 14.079 3.14937C14.2144 2.88712 14.3898 2.64758 14.599 2.43937C13.439 1.36937 12.309 0.779368 12.029 1.11937C11.749 1.45937 12.399 2.81937 13.689 4.11937C14.979 5.41937 16.319 6.11937 16.689 5.77937C17.059 5.43937 16.439 4.31937 15.369 3.14937C15.2319 3.27988 15.1171 3.43188 15.029 3.59937C14.9822 3.68989 14.9099 3.76468 14.821 3.81446C14.7321 3.86424 14.6306 3.88681 14.529 3.87937Z",
        fill: "#414952",
      }),
      Pl("path", {
        d: "M19.6189 0.0493271C19.5592 0.0206524 19.4944 0.0041153 19.4283 0.000675356C19.3622 -0.00276459 19.2961 0.00696118 19.2337 0.0292882C19.1714 0.0516153 19.1141 0.086099 19.0652 0.130738C19.0163 0.175377 18.9768 0.229283 18.9489 0.289327C18.6189 0.989327 17.8389 1.17933 16.9489 1.39933C16.092 1.51215 15.2826 1.85805 14.6089 2.39933L14.9789 2.73933L15.3189 3.09933C15.8608 2.68431 16.5022 2.4188 17.1789 2.32933C17.7217 2.28984 18.2475 2.12248 18.7133 1.84092C19.1791 1.55937 19.5716 1.17161 19.8589 0.709327C19.8874 0.650385 19.9038 0.586332 19.9071 0.520952C19.9104 0.455572 19.9006 0.39019 19.8782 0.328667C19.8558 0.267144 19.8214 0.210728 19.7768 0.16275C19.7323 0.114772 19.6786 0.0762053 19.6189 0.0493271Z",
        fill: "#414952",
      }),
    ],
    -1,
  ),
  aO = Pl(
    "h1",
    {
      class: "mt-2",
    },
    "Mine",
    -1,
  );
qI.render = function (e$, e0, e8, e2, e3, e1) {
  let e6 = dl("Double"),
    e4 = dl("Crash"),
    e7 = dl("Mine");
  return (
    wl(),
    _l("div", GI, [
      Pl("div", WI, [
        Pl(
          "img",
          {
            class: "w-12 h-12",
            src: e$.$asset("/apps/blaze.svg", "casinoLogo"),
            alt: "",
          },
          null,
          8,
          ["src"],
        ),
        Pl("div", KI, [
          Pl("h1", JI, g(e2.currency), 1),
          Pl("h3", XI, g(e2.balance.toLocaleString()), 1),
        ]),
        Pl(
          "button",
          {
            onClick:
              e0[1] || (e0[1] = (...e$) => e2.deposit && e2.deposit(...e$)),
            class:
              "bg-blaze-red text-white text-xl font-bold h-14 px-4 ml-5 rounded-lg",
          },
          " Depositar ",
        ),
        Pl(
          "button",
          {
            onClick:
              e0[2] || (e0[2] = (...e$) => e2.withdraw && e2.withdraw(...e$)),
            class:
              "bg-blaze-red text-white text-xl font-bold h-14 px-4 ml-5 rounded-lg",
          },
          [YI],
        ),
      ]),
      "double" == e2.tab
        ? (wl(),
          _l(e6, {
            key: 0,
          }))
        : Ml("", !0),
      "crash" == e2.tab
        ? (wl(),
          _l(e4, {
            key: 1,
          }))
        : "mine" == e2.tab
          ? (wl(),
            _l(e7, {
              key: 2,
            }))
          : Ml("", !0),
      Pl("div", ZI, [
        Pl(
          "button",
          {
            onClick: e0[3] || (e0[3] = (e$) => (e2.tab = "double")),
            class: "mx-auto flex flex-col flex-center",
          },
          [QI, eO],
        ),
        Pl(
          "button",
          {
            onClick: e0[4] || (e0[4] = (e$) => (e2.tab = "crash")),
            class: "mx-auto flex flex-col flex-center",
          },
          [tO, nO],
        ),
        Pl(
          "button",
          {
            onClick: e0[5] || (e0[5] = (e$) => (e2.tab = "mine")),
            class: "mx-auto flex flex-col flex-center",
          },
          [lO, aO],
        ),
      ]),
    ])
  );
};
const sO = {
    setup() {
      jl("setDark")(!0);
      let e$ = Ze([]),
        e0 = Ze({
          state: "",
          time: 0,
          bombs: 0,
          marked: 0,
        });

      function e8(e$) {
        return e$[Math.floor(e$.length * Math.random())];
      }
      return (
        setInterval(() => {
          "playing" == e0.state && (e0.time += 1);
        }, 1e3),
        {
          game: e0,
          columns: e$,
          newGame: function (e2, e3) {
            ((e$.length = 0),
              (e0.state = "playing"),
              (e0.bombs = e3),
              (e0.marked = 0),
              (e0.time = 0));
            for (let e1 = 0; e1 < e2; e1++) {
              let e6 = [];
              for (let e4 = 0; e4 < e2; e4++)
                e6.push({
                  x: e1,
                  y: e4,
                  nearby: 0,
                  revealed: !1,
                  marked: !1,
                  mine: !1,
                });
              e$.push(e6);
            }
            for (; e3; ) {
              let e7 = e8(e8(e$));
              e7.mine || ((e7.mine = !0), (e3 -= 1));
            }
          },
          reveal: function e8(e2) {
            if (!e2.marked && "defeat" != e0.state && !e2.revealed) {
              if (((e2.revealed = !0), e2.mine)) e0.state = "defeat";
              else {
                let e3 = e$.flat(),
                  e1 = e3.filter(
                    (e$) =>
                      e$ != e2 &&
                      1.9 > Math.sqrt((e$.x - e2.x) ** 2 + (e$.y - e2.y) ** 2),
                  ),
                  e6 = e1.reduce((e$, e0) => e$ + e0.mine, 0);
                (0 == e6 ? e1.forEach((e$) => e8(e$)) : (e2.nearby = e6),
                  e3.reduce((e$, e0) => e$ + e0.revealed, 0) ==
                    e3.length - e0.bombs && (e0.state = "win"));
              }
            }
          },
          mark: function (e$) {
            e$.revealed ||
              "playing" != e0.state ||
              (e0.marked >= e0.bombs && !e$.marked) ||
              ((e$.marked = !e$.marked), (e0.marked += e$.marked ? 1 : -1));
          },
        }
      );
    },
  },
  oO = {
    class: "flex flex-col h-full bg-gray-800",
  },
  rO = {
    class: "flex justify-between p-8 pt-48",
  },
  iO = {
    class: "flex",
  },
  cO = {
    class: "flex flex-center",
  },
  uO = {
    key: 0,
    class: "fas fa-flag-alt text-lg text-red-600",
  },
  dO = {
    key: 1,
    class: "fas fa-bomb",
  },
  pO = {
    key: 0,
    class: "flex-1 bg-gray-800",
  },
  fO = {
    class: "flex justify-between p-8",
  },
  mO = {
    class:
      "bg-gray-600 ring ring-gray-500 text-white text-center p-5 rounded-xl w-32",
  },
  hO = {
    class:
      "bg-gray-600 ring ring-gray-500 text-white text-center p-5 rounded-xl w-32",
  },
  bO = {
    key: 1,
    class: "text-white text-center text-4xl pt-8",
  },
  gO = {
    key: 0,
  },
  vO = {
    key: 1,
  },
  xO = {
    key: 2,
  };
sO.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", oO, [
      Pl("div", rO, [
        (wl(),
        _l(
          bl,
          null,
          fa(
            [
              [5, 5],
              [9, 10],
              [12, 20],
            ],
            ([e$, e0]) =>
              Pl(
                "div",
                {
                  key: e$,
                  class:
                    "bg-gray-600 ring ring-gray-500 text-white p-5 rounded-xl",
                  onClick: (e8) => e2.newGame(e$, e0),
                },
                [Pl("h3", null, g(e$) + "x" + g(e$), 1)],
                8,
                ["onClick"],
              ),
          ),
          64,
        )),
      ]),
      Pl("div", iO, [
        (wl(!0),
        _l(
          bl,
          null,
          fa(
            e2.columns,
            (e$, e0) => (
              wl(),
              _l(
                "div",
                {
                  class: "flex flex-col flex-1",
                  key: e0,
                },
                [
                  (wl(!0),
                  _l(
                    bl,
                    null,
                    fa(
                      e$,
                      (e$, e0) => (
                        wl(),
                        _l(
                          "div",
                          {
                            key: e0,
                            class: [
                              "w-full square border border-gray-600 flex flex-center",
                              [e$.revealed ? "bg-gray-400" : "bg-gray-500"],
                            ],
                            onClick: (e0) => e2.reveal(e$),
                            onContextmenu: is(
                              (e0) => e2.mark(e$),
                              ["prevent", "stop"],
                            ),
                          },
                          [
                            Pl("div", cO, [
                              e$.marked
                                ? (wl(), _l("i", uO))
                                : e$.revealed && e$.mine
                                  ? (wl(), _l("i", dO))
                                  : (wl(),
                                    _l(
                                      "p",
                                      {
                                        key: 2,
                                        nearby: e$.nearby,
                                        class: "font-bold",
                                      },
                                      g(e$.nearby || ""),
                                      9,
                                      ["nearby"],
                                    )),
                            ]),
                          ],
                          42,
                          ["onClick", "onContextmenu"],
                        )
                      ),
                    ),
                    128,
                  )),
                ],
              )
            ),
          ),
          128,
        )),
      ]),
      "playing" == e2.game.state
        ? (wl(),
          _l("div", pO, [
            Pl("div", fO, [
              Pl("div", mO, g(e$.$filters.duration(e2.game.time)), 1),
              Pl("div", hO, [
                Pl("h3", null, "💣 " + g(e2.game.bombs - e2.game.marked), 1),
              ]),
            ]),
          ]))
        : (wl(),
          _l("div", bO, [
            "win" == e2.game.state
              ? (wl(),
                _l(
                  "h1",
                  gO,
                  "Voc\xea venceu em " + g(e$.$filters.duration(e2.game.time)),
                  1,
                ))
              : "defeat" == e2.game.state
                ? (wl(), _l("h1", vO, "Voc\xea perdeu"))
                : (wl(), _l("h1", xO, "Escolha um modo de jogo")),
          ])),
    ])
  );
};
const yO = {
    setup: () => (
      jl("setDark")(So.darkTheme.value),
      {
        isAndroid: So.settings.isAndroid,
      }
    ),
  },
  kO = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  wO = {
    class: "h-32 pt-16",
  },
  CO = {
    key: 0,
    class: "far fa-arrow-left",
  },
  _O = {
    key: 1,
    class: "fas fa-chevron-left text-blue-500",
  },
  AO = Pl(
    "iframe",
    {
      class: "flex-1 w-full",
      src: "https://trucoon.com.br/jogo/",
      frameborder: "0",
    },
    "\r\n    ",
    -1,
  );
yO.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", kO, [
      Pl("div", wO, [
        Pl(
          "button",
          {
            class: "absolute top-16 left-0 px-4",
            onClick:
              e0[1] ||
              (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
          },
          [e2.isAndroid ? (wl(), _l("i", CO)) : (wl(), _l("i", _O))],
        ),
        Pl(
          "h1",
          {
            class: [
              "font-bold",
              {
                "ml-16": e2.isAndroid,
                "text-center": !e2.isAndroid,
              },
            ],
          },
          "Truco",
          2,
        ),
      ]),
      AO,
    ])
  );
};
const SO = {
    setup: () => (
      jl("setDark")(So.darkTheme.value),
      {
        isAndroid: So.settings.isAndroid,
      }
    ),
  },
  TO = {
    class: "flex flex-col h-full bg-theme text-theme",
  },
  EO = {
    class: "h-32 pt-16",
  },
  RO = {
    key: 0,
    class: "far fa-arrow-left",
  },
  PO = {
    key: 1,
    class: "fas fa-chevron-left text-blue-500",
  },
  LO = Pl(
    "iframe",
    {
      class: "flex-1 w-full",
      src: "https://slither.io/",
      frameborder: "0",
    },
    "\r\n    ",
    -1,
  );
SO.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l("div", TO, [
      Pl("div", EO, [
        Pl(
          "button",
          {
            class: "absolute top-16 left-0 px-4",
            onClick:
              e0[1] ||
              (e0[1] = (...e0) => e$.$router.back && e$.$router.back(...e0)),
          },
          [e2.isAndroid ? (wl(), _l("i", RO)) : (wl(), _l("i", PO))],
        ),
        Pl(
          "h1",
          {
            class: [
              "font-bold",
              {
                "ml-16": e2.isAndroid,
                "text-center": !e2.isAndroid,
              },
            ],
          },
          "Gulper",
          2,
        ),
      ]),
      LO,
    ])
  );
};
const IO = [
    {
      path: "/",
      component: fc,
    },
    {
      path: "/home",
      component: xc,
    },
    {
      path: "/video",
      component: Cr,
    },
    {
      path: "/settings",
      component: Ec,
    },
    {
      path: "/contacts",
      component: fu,
    },
    {
      path: "/contacts/services",
      component: zu,
    },
    {
      path: "/contacts/dial",
      component: td,
    },
    {
      path: "/contacts/history",
      component: vd,
    },
    {
      path: "/contacts/blocks",
      component: Ld,
    },
    {
      path: "/contacts/create",
      component: Eu,
    },
    {
      path: "/contacts/:id",
      component: Vu,
    },
    {
      path: "/call",
      component: Op,
    },
    {
      path: "/sms",
      component: $d,
    },
    {
      path: "/sms/:id",
      component: ep,
    },
    {
      path: "/gallery",
      component: mp,
    },
    {
      path: "/gallery/:folder",
      component: mp,
    },
    {
      path: "/gallery/carousel/:file",
      component: Ap,
    },
    {
      path: "/whatsapp",
      component: Rf,
      meta: {
        keepAlive: !0,
      },
    },
    {
      path: "/whatsapp/create",
      component: th,
    },
    {
      path: "/whatsapp/edit/:group",
      component: kh,
    },
    {
      path: "/whatsapp/:contact",
      component: bm,
    },
    {
      path: "/tor",
      component: tb,
    },
    {
      path: "/tor/groups",
      component: fb,
    },
    {
      path: "/tor/store",
      component: Bb,
    },
    {
      path: "/tor/store/create",
      component: ng,
    },
    {
      path: "/tor/payments",
      component: dg,
    },
    {
      path: "/tor/:id",
      component: Sb,
    },
    {
      path: "/instagram",
      component: vv,
    },
    {
      path: "/instagram/login",
      component: Ev,
    },
    {
      path: "/instagram/register",
      component: jv,
    },
    {
      path: "/instagram/search",
      component: Qv,
    },
    {
      path: "/instagram/create",
      component: Ig,
    },
    {
      path: "/instagram/notifications",
      component: rx,
    },
    {
      path: "/instagram/edit",
      component: mx,
    },
    {
      path: "/instagram/profiles/:id",
      component: Ax,
    },
    {
      path: "/instagram/posts/:id",
      component: Hx,
    },
    {
      path: "/instagram/stories/:id",
      component: rv,
    },
    {
      path: "/twitter",
      component: dy,
    },
    {
      path: "/twitter/register",
      component: my,
    },
    {
      path: "/twitter/create",
      component: wy,
    },
    {
      path: "/twitter/posts/:id",
      component: Ey,
    },
    {
      path: "/twitter/profiles/:id",
      component: nk,
    },
    {
      path: "/twitter/settings",
      component: yk,
    },
    {
      path: "/bank",
      component: pw,
    },
    {
      path: "/bank/pix",
      component: Iw,
    },
    {
      path: "/bank/transfer",
      component: aC,
    },
    {
      path: "/bank/receipt",
      component: wC,
    },
    {
      path: "/bank/statements",
      component: MC,
    },
    {
      path: "/bank/invoices",
      component: WC,
    },
    {
      path: "/bank/invoices/create",
      component: i_,
    },
    {
      path: "/bank/fines",
      component: E_,
    },
    {
      path: "/paypal",
      component: B_,
    },
    {
      path: "/olx",
      component: ES,
    },
    {
      path: "/olx/create",
      component: NS,
    },
    {
      path: "/olx/search",
      component: YS,
    },
    {
      path: "/olx/dashboard",
      component: PT,
    },
    {
      path: "/olx/:id",
      component: nT,
    },
    {
      path: "/tinder",
      component: zT,
    },
    {
      path: "/tinder/register",
      component: aE,
    },
    {
      path: "/tinder/likes",
      component: LE,
    },
    {
      path: "/tinder/chats",
      component: $E,
    },
    {
      path: "/tinder/chats/:id",
      component: ZE,
    },
    {
      path: "/tinder/profile",
      component: fR,
    },
    {
      path: "/yellowpages",
      component: MR,
    },
    {
      path: "/yellowpages/create",
      component: BR,
    },
    {
      path: "/weazel",
      component: EP,
    },
    {
      path: "/weazel/create",
      component: ZP,
    },
    {
      path: "/weazel/:id/edit",
      component: ZP,
    },
    {
      path: "/weazel/:id",
      component: dL,
    },
    {
      path: "/casino",
      component: qI,
    },
    {
      path: "/custom/:id",
      component: RR,
    },
    {
      path: "/calculator",
      component: WR,
    },
    {
      path: "/notes",
      component: uP,
    },
    {
      path: "/notes/create",
      component: kP,
    },
    {
      path: "/notes/:id",
      component: _P,
    },
    {
      path: "/minesweeper",
      component: sO,
    },
    {
      path: "/truco",
      component: yO,
    },
    {
      path: "/gulper",
      component: SO,
    },
  ],
  OO = (function (e$) {
    let e0 = Ti(e$.routes, e$),
      e8 = e$.parseQuery || Xi,
      e2 = e$.stringifyQuery || Yi,
      e3 = e$.history,
      e1 = Qi(),
      e6 = Qi(),
      e4 = Qi(),
      e7 = ct(mi, !0),
      e5 = mi;
    Fr &&
      e$.scrollBehavior &&
      "scrollRestoration" in history &&
      (history.scrollRestoration = "manual");
    let eV = Br.bind(null, (e$) => "" + e$),
      eN = Br.bind(null, Ki),
      e9 = Br.bind(null, Ji);

    function eU(e$, e1) {
      var e6, e4, e5;
      if (((e1 = zr({}, e1 || e7.value)), "string" == typeof e$)) {
        let eU = Gr(e8, e$, e1.path),
          ej = e0.resolve(
            {
              path: eU.path,
            },
            e1,
          ),
          eD = e3.createHref(eU.fullPath);
        return zr(eU, ej, {
          params: e9(ej.params),
          hash: Ji(eU.hash),
          redirectedFrom: void 0,
          href: eD,
        });
      }
      let ez;
      "path" in e$
        ? (ez = zr({}, e$, {
            path: Gr(e8, e$.path, e1.path).path,
          }))
        : ((ez = zr({}, e$, {
            params: eN(e$.params),
          })),
          (e1.params = eN(e1.params)));
      let eF = e0.resolve(ez, e1),
        eB = e$.hash || "";
      eF.params = eV(e9(eF.params));
      let eH,
        eZ =
          ((e4 = e2),
          (eH = (e5 = zr({}, e$, {
            hash:
              ((e6 = eB),
              Gi(e6).replace(zi, "{").replace(Hi, "}").replace(ji, "^")),
            path: eF.path,
          })).query
            ? e4(e5.query)
            : ""),
          e5.path + (eH && "?") + eH + (e5.hash || "")),
        eG = e3.createHref(eZ);
      return zr(
        {
          fullPath: eZ,
          hash: eB,
          query: e2 === Yi ? Zi(e$.query) : e$.query,
        },
        eF,
        {
          redirectedFrom: void 0,
          href: eG,
        },
      );
    }

    function ej(e$) {
      return "string" == typeof e$ ? Gr(e8, e$, e7.value.path) : zr({}, e$);
    }

    function eD(e$, e0) {
      if (e5 !== e$)
        return vi(8, {
          from: e0,
          to: e$,
        });
    }

    function ez(e$) {
      return eB(e$);
    }

    function eF(e$) {
      let e0 = e$.matched[e$.matched.length - 1];
      if (e0 && e0.redirect) {
        let { redirect: e8 } = e0,
          e2 = "function" == typeof e8 ? e8(e$) : e8;
        return (
          "string" == typeof e2 &&
            (e2 =
              e2.indexOf("?") > -1 || e2.indexOf("#") > -1
                ? (e2 = ej(e2))
                : {
                    path: e2,
                  }),
          zr(
            {
              query: e$.query,
              hash: e$.hash,
              params: e$.params,
            },
            e2,
          )
        );
      }
    }

    function eB(e$, e0) {
      var e8, e3, e1;
      let e6 = (e5 = eU(e$)),
        e4 = e7.value,
        eV = e$.state,
        eN = e$.force,
        e9 = !0 === e$.replace,
        eD = eF(e6);
      if (eD)
        return eB(
          zr(ej(eD), {
            state: eV,
            force: eN,
            replace: e9,
          }),
          e0 || e6,
        );
      let ez = e6,
        eH,
        eW,
        eK;
      return (
        (ez.redirectedFrom = e0),
        !eN &&
          ((e8 = e2),
          (e3 = e4),
          (e1 = e6),
          (eW = e3.matched.length - 1),
          (eK = e1.matched.length - 1),
          eW > -1 &&
            eW === eK &&
            Kr(e3.matched[eW], e1.matched[eK]) &&
            Jr(e3.params, e1.params) &&
            e8(e3.query) === e8(e1.query) &&
            e3.hash === e1.hash) &&
          ((eH = vi(16, {
            to: ez,
            from: e4,
          })),
          t$(e4, e4, !0, !1)),
        (eH ? Promise.resolve(eH) : eZ(ez, e4))
          .catch((e$) => (xi(e$) ? e$ : eQ(e$)))
          .then((e$) => {
            if (e$) {
              if (xi(e$, 2))
                return eB(
                  zr(ej(e$.to), {
                    state: eV,
                    force: eN,
                    replace: e9,
                  }),
                  e0 || ez,
                );
            } else e$ = eq(ez, e4, !0, e9, eV);
            return (eG(ez, e4, e$), e$);
          })
      );
    }

    function eH(e$, e0) {
      let e8 = eD(e$, e0);
      return e8 ? Promise.reject(e8) : Promise.resolve();
    }

    function eZ(e$, e0) {
      let e8,
        [e2, e3, e4] = (function (e$, e0) {
          let e8 = [],
            e2 = [],
            e3 = [],
            e1 = Math.max(e0.matched.length, e$.matched.length);
          for (let e6 = 0; e6 < e1; e6++) {
            let e4 = e0.matched[e6];
            e4 &&
              (e$.matched.find((e$) => Kr(e$, e4)) ? e2.push(e4) : e8.push(e4));
            let e7 = e$.matched[e6];
            e7 && (e0.matched.find((e$) => Kr(e$, e7)) || e3.push(e7));
          }
          return [e8, e2, e3];
        })(e$, e0);
      for (let e7 of ((e8 = tc(e2.reverse(), "beforeRouteLeave", e$, e0)), e2))
        e7.leaveGuards.forEach((e2) => {
          e8.push(ec(e2, e$, e0));
        });
      let e5 = eH.bind(null, e$, e0);
      return (
        e8.push(e5),
        ic(e8)
          .then(() => {
            for (let e2 of ((e8 = []), e1.list())) e8.push(ec(e2, e$, e0));
            return (e8.push(e5), ic(e8));
          })
          .then(() => {
            for (let e2 of ((e8 = tc(e3, "beforeRouteUpdate", e$, e0)), e3))
              e2.updateGuards.forEach((e2) => {
                e8.push(ec(e2, e$, e0));
              });
            return (e8.push(e5), ic(e8));
          })
          .then(() => {
            for (let e2 of ((e8 = []), e$.matched))
              if (e2.beforeEnter && 0 > e0.matched.indexOf(e2)) {
                if (Array.isArray(e2.beforeEnter))
                  for (let e3 of e2.beforeEnter) e8.push(ec(e3, e$, e0));
                else e8.push(ec(e2.beforeEnter, e$, e0));
              }
            return (e8.push(e5), ic(e8));
          })
          .then(
            () => (
              e$.matched.forEach((e$) => (e$.enterCallbacks = {})),
              (e8 = tc(e4, "beforeRouteEnter", e$, e0)).push(e5),
              ic(e8)
            ),
          )
          .then(() => {
            for (let e2 of ((e8 = []), e6.list())) e8.push(ec(e2, e$, e0));
            return (e8.push(e5), ic(e8));
          })
          .catch((e$) => (xi(e$, 8) ? e$ : Promise.reject(e$)))
      );
    }

    function eG(e$, e0, e8) {
      for (let e2 of e4.list()) e2(e$, e0, e8);
    }

    function eq(e$, e0, e8, e2, e1) {
      let e6 = eD(e$, e0);
      if (e6) return e6;
      let e4 = e0 === mi,
        e5 = Fr ? history.state : {};
      (e8 &&
        (e2 || e4
          ? e3.replace(
              e$.fullPath,
              zr(
                {
                  scroll: e4 && e5 && e5.scroll,
                },
                e1,
              ),
            )
          : e3.push(e$.fullPath, e1)),
        (e7.value = e$),
        t$(e$, e0, e8, e4),
        eJ());
    }
    let eW,
      eK,
      eX = Qi(),
      eY = Qi();

    function eQ(e$) {
      return (eJ(e$), eY.list().forEach((e0) => e0(e$)), Promise.reject(e$));
    }

    function eJ(e$) {
      eK ||
        ((eK = !0),
        (eW = e3.listen((e$, e0, e8) => {
          var e2, e1;
          let e6 = eU(e$),
            e4 = eF(e6);
          if (e4)
            return void eB(
              zr(e4, {
                replace: !0,
              }),
              e6,
            ).catch(Hr);
          e5 = e6;
          let eV = e7.value;
          (Fr &&
            ((e2 = ri(eV.fullPath, e8.delta)), (e1 = si()), ii.set(e2, e1)),
            eZ(e6, eV)
              .catch((e$) =>
                xi(e$, 12)
                  ? e$
                  : xi(e$, 2)
                    ? (eB(e$.to, e6).catch(Hr), Promise.reject())
                    : (e8.delta && e3.go(-e8.delta, !1), eQ(e$)),
              )
              .then((e$) => {
                ((e$ = e$ || eq(e6, eV, !1)) &&
                  e8.delta &&
                  e3.go(-e8.delta, !1),
                  eG(e6, eV, e$));
              })
              .catch(Hr));
        })),
        eX.list().forEach(([e0, e8]) => (e$ ? e8(e$) : e0())),
        eX.reset());
    }

    function t$(e0, e8, e2, e3) {
      let { scrollBehavior: e1 } = e$;
      if (!Fr || !e1) return Promise.resolve();
      let e6 =
        (!e2 &&
          (function (e$) {
            let e0 = ii.get(e$);
            return (ii.delete(e$), e0);
          })(ri(e0.fullPath, 0))) ||
        ((e3 || !e2) && history.state && history.state.scroll) ||
        null;
      return Lt()
        .then(() => e1(e0, e8, e6))
        .then((e$) => e$ && oi(e$))
        .catch(eQ);
    }
    let t0 = (e$) => e3.go(e$),
      t8,
      t2 = new Set();
    return {
      currentRoute: e7,
      addRoute: function (e$, e8) {
        let e2, e3;
        return (
          fi(e$) ? ((e2 = e0.getRecordMatcher(e$)), (e3 = e8)) : (e3 = e$),
          e0.addRoute(e3, e2)
        );
      },
      removeRoute: function (e$) {
        let e8 = e0.getRecordMatcher(e$);
        e8 && e0.removeRoute(e8);
      },
      hasRoute: function (e$) {
        return !!e0.getRecordMatcher(e$);
      },
      getRoutes: function () {
        return e0.getRoutes().map((e$) => e$.record);
      },
      resolve: eU,
      options: e$,
      push: ez,
      replace: function (e$) {
        var e0;
        return (
          (e0 = zr(ej(e$), {
            replace: !0,
          })),
          eB(e0)
        );
      },
      go: t0,
      back: () => t0(-1),
      forward: () => t0(1),
      beforeEach: e1.add,
      beforeResolve: e6.add,
      afterEach: e4.add,
      onError: eY.add,
      isReady: function () {
        return eK && e7.value !== mi
          ? Promise.resolve()
          : new Promise((e$, e0) => {
              eX.add([e$, e0]);
            });
      },
      install(e$) {
        var e0;
        (e$.component("RouterLink", lc),
          e$.component("RouterView", rc),
          (e$.config.globalProperties.$router = this),
          Object.defineProperty(e$.config.globalProperties, "$route", {
            get: () => ut(e7),
          }),
          Fr &&
            !t8 &&
            e7.value === mi &&
            ((t8 = !0), eB((e0 = e3.location)).catch((e$) => {})));
        let e8 = {};
        for (let e2 in mi) e8[e2] = da(() => e7.value[e2]);
        (e$.provide(Ur, this), e$.provide($r, Ze(e8)), e$.provide(jr, e7));
        let e1 = e$.unmount;
        (t2.add(e$),
          (e$.unmount = function () {
            (t2.delete(e$),
              t2.size < 1 && (eW(), (e7.value = mi), (t8 = !1), (eK = !1)),
              e1());
          }));
      },
    };
  })({
    history:
      (0 >
        (MO = location.host
          ? MO || location.pathname + location.search
          : "").indexOf("#") && (MO += "#"),
      pi(MO)),
    routes: IO,
  });
OO.afterEach((e$) => So.pusher.emit("Route:afterEach", e$));
var VO = OO;
const DO = () => VO.currentRoute.value.path,
  NO = new Map();
for (let [kM, wM] of (NO.set("GPS", ({ location: [e$, e0] }) => {
  (So.client.SetNewWaypoint(e$, e0),
    So.addNotification("gps", "GPS", "O destino foi marcado em seu GPS"));
}),
NO.set(
  "WHATSAPP_MESSAGE",
  ({ sender: e$, group: e0, content: e8, image: e2, location: e3 }) => {
    if (e$ != So.identity.phone) {
      let e1 = Bs(e$),
        e6 = e2 ? "📷 Foto" : e3 ? "\uD83C\uDF0E Localiza\xe7\xe3o" : e8;
      (e6.match(/(http)?s?:?(\/\/[^"']*\.(?:webm|ogg))/)
        ? (e6 = "\uD83D\uDD0A \xc1udio")
        : e6.length > 40 && (e6 = e6.substr(0, 40) + "..."),
        e0 && DO() != `/whatsapp/group${e0.id}`
          ? So.addNotification("whatsapp", e0.name, `<b>${e1}:</b> ${e6}`)
          : e0 ||
            DO() == `/whatsapp/${e$}` ||
            So.addNotification("whatsapp", e1, e6));
    }
  },
),
NO.set("WHATSAPP_GROUP_KICK", ({ name: e$ }) =>
  So.addNotification("whatsapp", e$, "Voc\xea foi removido do grupo"),
),
NO.set("WHATSAPP_GROUP_DESTROY", ({ name: e$ }) =>
  So.addNotification("whatsapp", e$, "O grupo foi exclu\xeddo"),
),
NO.set("INSTAGRAM_NOTIFY", (e$) =>
  So.addNotification("instagram", Zs("instagram"), zs(e$)),
),
NO.set("PAYPAL", ({ sender: e$, value: e0 }) => {
  let e8 = Bs(e$);
  So.addNotification(
    "paypal",
    "PayPal",
    `<b class="text-black">${e8}</b> transferiu <b class="text-black">${js(
      e0,
    )}</b> para sua conta`,
  );
}),
NO.set("BANK", ({ sender: e$, value: e0 }) => {
  let e8 = Bs(e$);
  So.addNotification(
    "bank",
    Zs("bank"),
    `<b class="text-black">${e8}</b> transferiu <b class="text-black">${js(
      e0,
    )}</b> para sua conta`,
  );
}),
NO.set("BANK_NOTIFY", ({ title: e$, subtitle: e0 }) =>
  So.addNotification("bank", e$, e0),
),
NO.set("BANK_INVOICE", ({ value: e$ }) =>
  So.addNotification(
    "bank",
    "Fatura recebida",
    `Voc\xea recebeu uma fatura no valor de ${js(e$)}`,
  ),
),
NO.set("BANK_INVOICE_RECEIPT", ({ value: e$, name: e0 }) =>
  So.addNotification(
    "bank",
    `${e0} pagou uma fatura`,
    `Foram creditados ${js(e$)} em sua conta`,
  ),
),
NO.set(
  "TINDER_MESSAGE",
  ({ sender: e$, sender_name: e0, content: e8, sender_uid: e2 }) => {
    e2 != So.identity.user_id &&
      DO() != `/tinder/chats/${e$}` &&
      So.addNotification("tinder", e0, e8);
  },
),
NO.set("TINDER_MATCH", ({ profile: { name: e$ } }) =>
  So.addNotification(
    "tinder",
    "Match!",
    `Voc\xea agora tem um match com ${e$}! <i class="fas fa-heart text-red-500"></i>`,
  ),
),
NO.set("TWITTER_NOTIFY", (e$) => {
  let [e0, e8] = Array.isArray(e$) ? e$ : [null, e$];
  So.addNotification("twitter", null != e0 ? e0 : Zs("twitter"), e8);
}),
NO.set("TOR_NOTIFY", (e$) => {
  let [e0, e8] = Array.isArray(e$) ? e$ : [null, e$];
  So.addNotification("tor", null != e0 ? e0 : Zs("tor"), e8);
}),
NO.set("TOR_MESSAGE", (e$) => {
  let e0 = e$.channel.startsWith("dm:");
  if (
    "geral" != e$.channel &&
    e$.sender != eb.id &&
    DO() !== "/tor/" + (e0 ? e$.sender : e$.channel)
  ) {
    let e8 = e$.location
      ? "\uD83C\uDF0E Localiza\xe7\xe3o"
      : e$.image
        ? "📷 Foto"
        : e$.content;
    So.addNotification(
      "tor",
      e0 ? eb.getNickname(e$.sender) : "#" + e$.channel,
      e8,
    );
  }
}),
NO.set("WEAZEL", (e$) =>
  So.addNotification("weazel", e$.title, e$.description),
),
NO.set("CUSTOM_NOTIFY", ({ app: e$, title: e0, subtitle: e8 }) => {
  So.addNotification(e$, e0, e8);
}),
NO.set("SMS", (e$) => {
  let { sender: e0, content: e8, image: e2, location: e3 } = e$;
  if (
    (null != e$.created_at || (e$.created_at = Math.floor(Date.now() / 1e3)),
    e0 in So.messages
      ? So.messages[e0].push(e$) > 100 && So.messages[e0].shift()
      : (So.messages[e0] = [e$]),
    So.hasNotificationFor("sms") && DO() != "/sms/" + e0)
  ) {
    let e1 = e8.substr(0, 40);
    (e8.length > 40 && (e1 += "..."),
      So.addNotification(
        "sms",
        Bs(e0),
        e2 ? "📷 Foto" : e3 ? "\uD83C\uDF0E Localiza\xe7\xe3o" : e1,
      ));
  }
}),
NO.entries()))
  So.pusher.on(kM, (e$) => {
    let e0 = kM.split("_")[0].toLowerCase();
    (So.hasNotificationFor(e0) || "sms" === e0) && wM(e$);
  });
var UO =
    "\nAddEventHandler('onResourceStop', function (name)\n  if name == GetCurrentResourceName() and IsNuiOpen then\n    SetNuiFocus(false)\n  end\nend)\n\nfunction src.exports(script, method, ...)\n  local o = exports[script]\n  o[method](o, ...)\nend\n\nfunction src.takePhoto(onlySelfie)\n  return TakePhotoAndUpload(onlySelfie)\nend\n\nfunction src.getLocation()\n  local c = GetEntityCoords(PlayerPedId())\n  return {c.x,c.y,c.z}\nend\n\nfunction src.setInput(b)\n  SetNuiFocusKeepInput(b)\nend\n\nsrc.SetNewWaypoint = SetNewWaypoint\n\nfunction src.getClock()\n  local hours = GetClockHours()\n  local minutes = GetClockMinutes()\n  if hours < 10 then hours = '0'..hours end\n  if minutes < 10 then minutes = '0'..minutes end\n  \n  return { hours=hours, minutes=minutes }\nend\n\nfunction src.isAlive()\n  return GetEntityHealth(PlayerPedId()) > (MinimumHealth or 101)\nend\n\nfunction src.setState(key, value)\n  LocalPlayer.state[key] = value\nend\n\nCitizen.CreateThread(function()\n  while true do\n    TriggerNuiEvent('pusher', 'TIME', src.getClock())\n    Wait(1000)\n  end\nend)\n\nfunction TriggerNuiEvent(event, ...)\n  local args = {...}\n  SendNUIMessage({ event=event,args=args })\nend\n\nRegisterNetEvent('smartphone:pusher', function(type, subject)\n  TriggerNuiEvent('pusher', type, subject)\nend)\n\nRegisterCommand('+smartphone-fix', function()\n  SetNuiFocus(IsNuiOpen, IsNuiOpen)\nend)\n\nfunction requestSync(name, ...)\n  local p = promise.new()\n  requestToBackend(name, {...}, function(res)\n    p:resolve(res)\n  end)\n  return Citizen.Await(p)\nend\n\nfunction forceOpen()\n  if not IsNuiOpen then\n    if (GetEntityHealth(PlayerPedId()) > (MinimumHealth or 101) or CanUseDead) and not LocalPlayer.state.disablePhone then\n      local res = requestSync('checkPhone')\n      if requestSync('checkPhone') then\n        src.open()\n      else\n        NoPhoneCallback()\n      end\n    end\n  else\n    SetNuiFocus(true, true)\n  end\nend\n\nexports('forceOpen', forceOpen)\n\nexports('closeSmartphone', function()\n  TriggerNuiEvent('close')\nend)\n\nexports('close', function()\n  TriggerNuiEvent('close')\nend)\n\nexports('open', src.open)\n\nRegisterCommand('bindSmartphone', function()\n  if (not PhoneKey or PhoneKey == 'k') and not IsControlJustPressed(0, 311) then return end\n  if IsControlPressed(0, 176) or IsControlPressed(0, 25) then return end\n\n  forceOpen()\nend)\n\nRegisterKeyMapping('bindSmartphone', 'Open the smartphone', 'keyboard', _G.PhoneKey or 'k')\n\nDisabledKeys = { 24, 25, 140, 199 }\n\nfunction disarmPlayer()\n	if DoNotDisarm then\n		return\n	end\n	SetCurrentPedWeapon(PlayerPedId(), GetHashKey(\"WEAPON_UNARMED\"), true)\nend\n\nCitizen.CreateThread(function()\n  while true do\n    local idle = 0\n\n    if IsNuiOpen then\n			disarmPlayer()\n      for k,v in pairs(DisabledKeys) do\n        DisableControlAction(0, v, true)\n      end\n\n      local ped = PlayerPedId()\n\n      if not CanUseDead and (GetEntityHealth(ped) < MinimumHealth or IsPedRagdoll(ped)) then\n        src.close()\n        TriggerNuiEvent('pusher', 'SET_VISIBLE', false)\n        TriggerNuiEvent('pusher', 'FORCE_LEAVE_CALL', true)\n        src.playAnim(false)\n        tryDeleteProp()\n      end\n    else idle = 1000 end\n\n    Wait(idle)\n  end\nend)\n\nif not NoPhoneCallback then\n  _G.NoPhoneCallback = function()\n    if GetResourceMetadata('vrp', 'creative_network') then\n       TriggerEvent('Notify', 'Negado', 'Voc\xea n\xe3o tem <b>CELULAR</b>', 'vermelho', 3000)\n    else\n      TriggerEvent('Notify', 'negado', 'Voc\xea n\xe3o tem <b>CELULAR</b>')\n    end\n  end\nend\n\nRegisterNUICallback('keydown', function(data, cb)\n  TriggerNuiEvent('pusher', 'keydown', data.key or data)\n  cb('ok')\nend)\n\nRegisterNUICallback('setDark', function(data, cb)\n  TriggerNuiEvent('pusher', 'setDark', data)\n  cb('ok')\nend)\n\nRegisterNUICallback('prompt', function(data, cb)\n  TriggerNuiEvent('pusher', 'prompt', data)\n  src.fPrompt = cb\nend)\n\nRegisterNUICallback('confirm', function(data, cb)\n  TriggerNuiEvent('pusher', 'confirm', data)\n  src.fConfirm = cb\nend)\n\nRegisterNUICallback('alert', function(data, cb)\n  TriggerNuiEvent('pusher', 'alert', data)\n  cb('ok')\nend)\n\nfunction createSMS(sender, content, attachments)\n  local atype = type(attachments)\n  TriggerNuiEvent('pusher', 'SMS', {\n    sender = sender,\n    content = content,\n    image = (atype == 'string') and attachments or nil,\n    location = (atype == 'table') and attachments or nil\n  })\nend\n\nRegisterNetEvent('smartphone:createBankConfirm', function(html, id, timeout)\n  TriggerNuiEvent('pusher', 'createCustomConfirm', { html = html, timeout = timeout })\n  \n  src.fCustomConfirm = function(answer)\n    TriggerServerEvent('bank:confirm', id, answer)\n  end\nend)\n\nexports('createSMS', createSMS)\nRegisterNetEvent('smartphone:createSMS', createSMS)\n\nexports('createDispatch', function(number, text)\n  local cds = src.getLocation()\n  return requestSync('service_request', number, text, cds)\nend)\n\nexports('callPlayer', function(phone)\n  TriggerNuiEvent('pusher', 'CALL_TO', phone)\nend)\n\nRegisterNetEvent('smartphone:exports', function(script, method, ...)\n  local e = exports[script]\n  e[method](e, ...)\nend)\n",
  $O =
    "\nfunction CellFrontCamActivate(activate)\n  return Citizen.InvokeNative(0x2491A93618B7D838, activate)\nend\n\nScreenshotCallback = nil\n\nRegisterNUICallback('screenshot', function(data, cb)\n  if ScreenshotCallback then\n    ScreenshotCallback()\n    ScreenshotCallback = nil\n  end\n  cb({})\nend)\n\nBlockCameraKeys = false\n\nfunction TakePhotoAndUpload(onlySelfie)\n  local selfie = not not onlySelfie\n\n  if _G.Summerz then executeVRP('removeObjects') end\n\n  ClearPedSecondaryTask(PlayerPedId())\n  ClearPedTasks(PlayerPedId())\n\n  CreateMobilePhone(1)\n  CellCamActivate(true, true)\n\n  isUsingCamera = true\n\n  if selfie then\n    CellFrontCamActivate(true)\n  end\n\n  Wait(500)\n\n  local p = promise.new()\n\n  Citizen.CreateThread(function()\n    local click = false\n\n    while true do\n      HideHudAndRadarThisFrame()\n      if IsControlJustReleased(0, 27) and not onlySelfie then\n        selfie = not selfie\n        CellFrontCamActivate(selfie)\n        Wait(500)\n      elseif IsControlJustReleased(0, 177) then\n        p:resolve(false)\n        break\n      elseif IsControlJustReleased(0, 176) or IsControlJustReleased(0, 38) or IsControlJustReleased(0, 201) then\n        TriggerNuiEvent('pusher', 'CONFIRM_SCREENSHOT')\n        ScreenshotCallback = function()\n          p:resolve(true)\n        end\n        break\n      end\n      Wait(0)\n    end\n  end)\n\n  p:next(function(b)\n    DestroyMobilePhone()\n    CellCamActivate(false, false)\n    isUsingCamera = false\n    if _G.Summerz then PhonePlayText() end\n    return b\n  end)\n\n  return Citizen.Await(p)\nend",
  jO =
    '\n\nInVideoCall = false\nVC_FirstPerson = true\nVC_Camera = false\n\nfunction DESTROY_VC_CAMERA()\n  if VC_Camera then\n    DestroyMobilePhone()\n    CellCamActivate(false, false)\n    VC_Camera = false\n  end\nend\n\nfunction SetInVideoCall(bool)\n  if Summerz then\n    LocalPlayer["state"]["Active"] = not bool\n  end\n  if bool ~= InVideoCall then\n    InVideoCall = bool\n    if not bool then\n      VC_FirstPerson = true\n      SetFollowPedCamViewMode(1)\n    else\n      CreateThread(function()\n        while InVideoCall do\n          DisableControlAction(0, 0, true)\n          if IsControlJustPressed(1, 27) or (IsPedInAnyVehicle(PlayerPedId()) and not VC_FirstPerson) then\n            VC_FirstPerson = not VC_FirstPerson\n      \n            if VC_FirstPerson then\n              DESTROY_VC_CAMERA()\n            elseif not VC_Camera then\n              VC_Camera = true\n              CreateMobilePhone(1)\n              CellCamActivate(true, true)\n              CellFrontCamActivate(true)\n            end\n          elseif VC_FirstPerson then\n            SetFollowPedCamViewMode(4)\n            SetFollowVehicleCamViewMode(4)\n          end\n          Wait(0)\n        end\n        DESTROY_VC_CAMERA()\n      end)\n    end\n  end\nend\n\nsrc.SetInVideoCall = SetInVideoCall\n',
  FO =
    "\nfunction executeVRP(name, ...)\n	TriggerEvent('vRP:proxy', name, {...}, 'smartphone', -1)\nend\n\nlocal function log(...)\n  if Debug then\n    print(...)\n  end\nend\n\n_G.MinimumHealth = _G.MinimumHealth or 101\n\nisUsingCamera = false\ncurrentAnim = false\ncurrentProp = false\n\nif not phoneModel then\n  if Summerz then\n    phoneModel = \"prop_npc_phone_02\"\n  else\n    phoneModel = \"prop_amb_phone\"\n  end\nend\n\nfunction playAnim(anim)\n  dict = inCar() and \"anim@cellphone@in_car@ps\" or \"cellphone@\"\n  if IsEntityPlayingAnim(PlayerPedId(), dict, anim, 3) then\n    return\n  end\n\n  RequestAnimDict(dict)\n  repeat Wait(10)\n  until HasAnimDictLoaded(dict)\n  TaskPlayAnim(PlayerPedId(), dict, anim, 3.0, 3.0, -1, 50, 1, 0, 0, 0)\n  currentAnim = { dict, anim }\nend\n\nfunction stopAnim()\n  if currentAnim then\n    local dict, anim = table.unpack(currentAnim)\n    StopAnimTask(PlayerPedId(), dict, anim, 1.1)\n  end\n  currentAnim = false\nend\n\nlocal propLock = false\n\nfunction setPhoneProp(bool)\n	if DisableProp or Summerz then\n		return\n	end\n\n  local startedAt = GetGameTimer()\n\n  log('Awaiting propLock')\n\n  repeat Wait(0)\n  until not propLock\n\n  log('propLock done')\n\n  propLock = true\n\n  if bool then\n    disarmPlayer()\n\n    if DoesEntityExist(currentProp) then\n      tryDeleteProp()\n    end\n\n    local ped = PlayerPedId()\n\n    log('Requesting model')\n\n    RequestModel(phoneModel)\n    repeat Wait(50)\n    until HasModelLoaded(phoneModel)\n\n    log('Requesting 0x00029a')\n\n    local mode = MODE_CACHE or requestSync('0x00029a')\n\n    log('Mode is ', mode)\n\n    if mode == 'auto' then\n      MODE_CACHE = 'auto'\n      local x, y, z = table.unpack(GetEntityCoords(ped))\n      currentProp = CreateObject(phoneModel, x, y, z-1.5, true, true, false)\n    elseif mode then\n      propLock = false\n      currentProp = NetToEnt(mode)\n    else\n      propLock = false\n      return SetModelAsNoLongerNeeded(phoneModel)\n    end\n    SetEntityCollision(currentProp, false, false)\n    AttachEntityToEntity(currentProp, ped, GetPedBoneIndex(ped, 28422),0.0,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true)\n    SetModelAsNoLongerNeeded(phoneModel)\n  elseif currentProp then\n    tryDeleteProp()\n    currentProp = false\n  end\n  propLock = false\nend\n\nfunction inCar()\n  return IsPedInAnyVehicle(PlayerPedId())\nend\n\nanims = {}\n\nfunction anims.close()\n  setPhoneProp(false)\n  Wait(1000)\n  stopAnim()\nend\n\nfunction anims.toText()\n  if Summerz then\n    return executeVRP(\"createObjects\", \"cellphone@\", \"cellphone_text_in\", phoneModel, 50, 28422)\n  end\n  playAnim(\"cellphone_text_in\")\nend\n\nfunction anims.toCall()\n  if Summerz then\n		return executeVRP(\"createObjects\", \"cellphone@\", \"cellphone_text_to_call\", phoneModel, 50, 28422)\n  end\n  playAnim(\"cellphone_text_to_call\")\nend\n\nfunction anims.callToText()\n  if Summerz then\n    return executeVRP(\"createObjects\", \"cellphone@\", \"cellphone_call_to_text\", phoneModel, 50, 28422)\n  end\n  playAnim(\"cellphone_call_to_text\")\nend\n\nfunction anims.fromCall()\n  if Summerz then\n    return executeVRP('removeObjects', 'one')\n  end\n  playAnim(inCar() and \"cellphone_horizontal_exit\" or \"cellphone_call_out\")\n  anims.close()\nend\n\nfunction anims.fromText()\n  if Summerz then\n    return executeVRP('removeObjects', 'one')\n  end\n  playAnim(\"cellphone_text_out\")\n  anims.close()\nend\n\nlocal currentLoop\n\nfunction src.playAnim(anim, loop)\n  if type(anim) == 'string' and anim:match('to') then\n    setPhoneProp(true)\n  end\n\n	if loop and currentLoop ~= anim and not Summerz then\n		currentLoop = anim\n\n		CreateThread(function()\n			while currentLoop == anim and GetEntityHealth(PlayerPedId()) >= MinimumHealth and not isUsingCamera and not InVideoCall do\n				pcall(anims[anim])\n				Wait(250)\n			end\n		end)\n	elseif anim then\n		currentLoop = false\n		pcall(anims[anim])\n  elseif anim == false then\n    if Summerz then\n      return executeVRP('removeObjects', 'one')\n    end\n    currentLoop = false\n    stopAnim()\n  end\nend\n\nfunction tryDeleteProp()\n  log('tryDeleteProp->start')\n  while DoesEntityExist(currentProp) do\n    NetworkRequestControlOfEntity(currentProp)\n    DeleteEntity(currentProp)\n    Wait(0)\n  end\n  log('tryDeleteProp->end')\nend\n\nAddEventHandler('onResourceStop', function(name)\n  if name == GetCurrentResourceName() then\n		if currentProp then\n			src.playAnim(false)\n      tryDeleteProp()\n		end\n  end\nend)\n";
if (!So.localhost) {
  let e6 = null != (t = globalThis.safeEval) ? t : "eval",
    e4 = [UO, $O, jO, FO].map((e$) => So.client[e6](e$));
  Promise.all(e4).then(() => {
    (So.client.__clear(), (globalThis.safeEval = null));
  });
}
const zO = {
    components: {
      Alert: To,
      Confirm: Vo,
      Prompt: Yo,
      Menu: or,
      PhotoEditor: dr,
      VideoRecorder: Cr,
      CustomConfirm: Bo,
    },
    setup() {
      let e$ = cc(),
        e0 = rt(!0),
        { visible: e8, notifications: e2, currentCall: e3, identity: e1 } = So,
        e6 = rt(),
        e4 = rt(),
        e7 = rt(),
        e5 = rt(),
        eV = co(),
        eN = da(() => So.settings.case || "iphonex"),
        e9 = da(() => So.settings.isAndroid),
        eU = da(() => So.clock.value.hours + ":" + So.clock.value.minutes),
        ej = da(() => {
          var e$;
          return null != (e$ = So.settings.notificationsBottom) ? e$ : "18.5vh";
        }),
        eD = rt(),
        ez = rt(),
        eF = rt(!1),
        eB = 0;
      if (So.localhost) {
        e8.value = !0;
        let eH = document.querySelector("body");
        ((eH.style.backgroundColor = "blue"),
          (eH.style.backgroundSize = "100vw 100vh"));
      }
      let eZ =
        (e$) =>
        (e0, e8 = 255) =>
          new Promise((e2) => {
            if (e0.includes("executeVRP")) return e2("true");
            e$.value = {
              title: e0,
              max: e8,
              callback: function (e0) {
                (e2(e0), (e$.value = null));
              },
            };
          });
      ($l("videoCamera", () =>
        new Promise((e$, e0) => {
          ez.value = [e$, e0];
        }).finally(() => (ez.value = null)),
      ),
        $l("alert", (So.alert = (e$) => (e6.value = e$))),
        $l("prompt", (So.prompt = eZ(e7))),
        $l("confirm", (So.confirm = eZ(e4))),
        $l(
          "setDark",
          (e$) => (e0.value = null != e$ ? e$ : So.darkTheme.value),
        ),
        $l("setLoading", (e$) => (eF.value = e$)),
        So.fetchSettings(),
        So.localhost && So.created());
      let eG = rt(!1);
      Tn(eG, (e$) => So.client.setInput(e$));
      let eq = {
        open() {
          var e$;
          ((eB = Date.now() + 500),
            (e8.value = !0),
            (null == (e$ = e3.value) ? void 0 : e$.accepted) ||
              So.client.playAnim("toText", !0),
            So.client.setState("usingPhone", !0));
        },
        async close() {
          var e0;
          (["/call", "/"].includes(e$.currentRoute.value.path) ||
            e$.push("/home"),
            [e6, e7, e5, e4, ez].forEach((e$) => (e$.value = null)),
            (e8.value = !1),
            (eG.value = !1),
            (null == (e0 = e3.value) ? void 0 : e0.accepted) ||
              So.client.playAnim("fromText"),
            So.client.close(),
            So.client.setState("usingPhone", !1));
        },
        pusher(e$, e0) {
          So.pusher.emit(e$, e0);
        },
      };

      function eW(e0) {
        if (So.localhost && "k" === e0) return void (e8.value = !0);
        if (
          eB > Date.now() ||
          ("Escape" != e0 && "Backspace" != e0) ||
          eF.value
        )
          return;
        if (eD.value) return (eD.value = null);
        let e2 = "Escape" == e0;
        go().state.request.value = null;
        let e3 = e$.currentRoute.value.path;
        if (
          "Backspace" === e0 &&
          !document.querySelector("input:focus,textarea:focus")
        ) {
          if ("/home" == e3) e2 = !0;
          else if (ez.value) ez.value = null;
          else if ("/call" != e3 && "/" != e3)
            return ([e6, e4, e7].forEach((e$) => (e$.value = null)), e$.back());
        }
        e2 && eq.close();
      }
      return (
        So.pusher.on("REDIRECT", (e0) => {
          (So.visible.value || So.client.open(),
            "/home" != e$.currentRoute.value.path && e$.replace("/home"),
            e$.push(e0));
        }),
        So.pusher.on("CALL_REQUEST", async (e0) => {
          So.storage.doNotDisturb.value ||
            ((await So.client.isAlive()) &&
              ((e0.contact = So.contacts.value.find(
                (e$) => e$.phone == e0.initiator.phone,
              ) || {
                name: e0.isAnonymous ? "An\xf4nimo" : e0.initiator.phone,
                phone: e0.initiator.phone,
              }),
              (e3.value = e0),
              e8.value ||
                So.addNotification(
                  e0.isVideo ? "facetime" : "phone",
                  e0.isVideo ? "Chamada de V\xeddeo" : "Chamada de Voz",
                  e0.contact.name + " est\xe1 te ligando",
                ),
              e$.push("/call")));
        }),
        So.pusher.on("CALL_TO", (e0, e8 = !1) => {
          if (e0 == So.identity.phone)
            return (e6.value = "Voc\xea n\xe3o pode ligar para si mesmo");
          let e2 = So.storage.anonymousCall.value;
          So.backend.createPhoneCall(e0, e8, e2).then((e8) => {
            e8.error
              ? (e6.value = e8.error)
              : ((e8.contact = {
                  name: Bs(e0),
                  phone: e0,
                }),
                (e8.owner = !0),
                (e3.value = e8),
                e$.push("/call"),
                So.visible.value || So.client.open());
          });
        }),
        So.pusher.on("SET_VISIBLE", (e$) => (e8.value = e$)),
        So.pusher.on("REFRESH", () => {
          (e$.replace("/"),
            (So.identity.phone = null),
            So.fetchSettings(),
            So.backend.ig_logout());
        }),
        So.pusher.on(
          "SERVICE_RESPONSE",
          () => (e6.value = "Seu chamado foi atendido"),
        ),
        So.pusher.on(
          "SERVICE_REJECT",
          () => (e6.value = "Seu chamado foi rejeitado"),
        ),
        So.pusher.on("PHONE_CHANGE", ({ from: e$, to: e0 }) => {
          var e8;
          (So.contacts.value.forEach((e8) => {
            e8.phone == e$ && (e8.phone = e0);
          }),
            (null == (e8 = So.identity) ? void 0 : e8.phone) == e$ &&
              (So.identity.phone = e0));
        }),
        So.pusher.on("UPLOAD_SCREENSHOT", ({ url: e$, body: e0 = {} }) => {
          let e8 = new FormData();
          for (let e2 in e0) e8.set(e2, e0[e2]);
          (ro.start(),
            setTimeout(async () => {
              let e0 = await ro.createBlob();
              (e8.append("file", e0, Date.now() + ".jpg"),
                fetch(e$, {
                  method: "POST",
                  body: e8,
                }),
                ro.stop());
            }, 200));
        }),
        (globalThis.pusher = So.pusher),
        So.localhost && (globalThis.store = So),
        $l("useImageFocus", (e$) => (eD.value = e$)),
        $l("setKeepInput", (e$) => (eG.value = e$)),
        So.captureMicrophone(),
        window.addEventListener(
          "message",
          ({ data: { event: e$, args: e0 } }) => {
            var e8;
            null == (e8 = eq[e$]) || e8.call(eq, ...e0);
          },
        ),
        window.addEventListener("contextmenu", () => {
          eG.value = !eG.value;
        }),
        window.addEventListener("keydown", ({ key: e$ }) => eW(e$)),
        So.pusher.on("keydown", eW),
        So.pusher.on("setDark", (e$) => (e0.value = e$)),
        So.pusher.on("prompt", (e$) =>
          eZ(e7)(e$).then((e$) => So.client.fPrompt(e$)),
        ),
        So.pusher.on("confirm", (e$) =>
          eZ(e4)(e$).then((e$) => So.client.fConfirm(e$)),
        ),
        So.pusher.on("alert", (e$) => (e6.value = e$)),
        {
          visible: e8,
          loading: eF,
          android: e9,
          clock: eU,
          alert: e6,
          confirm: e4,
          prompt: e7,
          dark: e0,
          menu: e5,
          paint: eV,
          notifications: e2,
          call: e3,
          identity: e1,
          phonecase: eN,
          imageFocused: eD,
          notificationsBottom: ej,
          recording: ez,
        }
      );
    },
  },
  BO = sn("data-v-16768605");
ln("data-v-16768605");
const HO = {
    key: 0,
    class: "notification select-none",
  },
  qO = {
    class: "flex flex-col ml-3",
  },
  GO = Pl("h1", null, "Chamada em andamento", -1),
  WO = {
    class: "flex flex-col ml-3",
  },
  KO = {
    key: 0,
    class: "fixed z-50 w-screen h-screen flex flex-col flex-center select-none",
    style: {
      background: "rgba(0,0,0,0.8)",
    },
  },
  JO = {
    class: "relative",
  },
  XO = {
    class: "bg-gray-900 h-16 rounded-t-3xl",
  },
  YO = Pl(
    "i",
    {
      class: "fas fa-times text-white text-3xl",
    },
    null,
    -1,
  ),
  ZO = {
    class: "marvel-device iphone-x",
  },
  QO = {
    class: "screen",
  },
  eM = {
    class: "absolute left-8 z-10",
  },
  tM = {
    class: "font-bold text-xl",
  },
  nM = {
    key: 0,
    class: "relative left-1.5 bottom-0 far fa-location-arrow text-sm",
  },
  lM = {
    class: "absolute right-8 top-5 z-10 flex items-center text-lg",
  },
  aM = Pl(
    "i",
    {
      class: "fas fa-signal-alt pr-2",
    },
    null,
    -1,
  ),
  sM = Pl(
    "i",
    {
      class: "fas fa-wifi pr-2",
    },
    null,
    -1,
  ),
  oM = {
    key: 0,
    class: "far fa-battery-full pr-2",
  },
  rM = {
    key: 1,
    class: "absolute inset-0 bg-black bg-opacity-20 flex flex-center z-10",
  },
  iM = Pl(
    "i",
    {
      class: "fas fa-spinner-third animate-spin text-5xl text-white",
    },
    null,
    -1,
  );
an();
const cM = BO((e$, e0, e8, e2, e3, e1) => {
  let e6 = dl("Alert"),
    e4 = dl("Prompt"),
    e7 = dl("Confirm"),
    e5 = dl("custom-confirm"),
    eV = dl("Menu"),
    eN = dl("PhotoEditor"),
    e9 = dl("VideoRecorder"),
    eU = dl("router-view");
  return (
    wl(),
    _l(
      bl,
      null,
      [
        Pl(
          Ja,
          {
            tag: "ul",
            "enter-from-class": "opacity-0 transform translate-y-16",
            "enter-to-class": "opacity-100",
            "leave-from-class": "opacity-100",
            "leave-to-class": "opacity-0 transform translate-x-96",
            "enter-active-class": "transition duration-1000",
            "leave-active-class": "transition duration-1000",
            class: "notifications",
            style: {
              right: e2.visible ? "49rem" : "5rem",
              bottom: e2.visible ? "6.5rem" : e2.notificationsBottom,
            },
          },
          {
            default: BO(() => [
              e2.call && e2.call.accepted && !e2.visible
                ? (wl(),
                  _l("li", HO, [
                    Pl(
                      "img",
                      {
                        src: e$.$asset("/apps/phone.png"),
                        class: "w-8 rounded-xl",
                      },
                      null,
                      8,
                      ["src"],
                    ),
                    Pl("div", qO, [
                      GO,
                      Pl("span", null, g(e2.call.contact.name), 1),
                    ]),
                  ]))
                : Ml("", !0),
              (wl(!0),
              _l(
                bl,
                null,
                fa(
                  e2.notifications,
                  (e$) => (
                    wl(),
                    _l(
                      "li",
                      {
                        class: "notification select-none",
                        key: e$.id,
                      },
                      [
                        Pl(
                          "img",
                          {
                            src: e$.icon,
                            class: "w-8 rounded-xl",
                          },
                          null,
                          8,
                          ["src"],
                        ),
                        Pl("div", WO, [
                          Pl("h1", null, g(e$.title), 1),
                          Pl(
                            "span",
                            {
                              innerHTML: e$.subtitle,
                            },
                            null,
                            8,
                            ["innerHTML"],
                          ),
                        ]),
                      ],
                    )
                  ),
                ),
                128,
              )),
            ]),
            _: 1,
          },
          8,
          ["style"],
        ),
        e2.imageFocused
          ? (wl(),
            _l("div", KO, [
              Pl("div", JO, [
                Pl("div", XO, [
                  Pl(
                    "button",
                    {
                      onClick:
                        e0[1] || (e0[1] = (e$) => (e2.imageFocused = null)),
                      class: "block ml-auto p-3 mr-2",
                    },
                    [YO],
                  ),
                ]),
                Pl(
                  "img",
                  {
                    style: {
                      "max-height": "80vh",
                      "max-width": "50vw",
                    },
                    src: e2.imageFocused,
                  },
                  null,
                  8,
                  ["src"],
                ),
              ]),
            ]))
          : Ml("", !0),
        Pl(
          Oa,
          {
            name: "phone",
          },
          {
            default: BO(() => [
              Zn(
                Pl(
                  "div",
                  ZO,
                  [
                    Pl(
                      "img",
                      {
                        class: "case",
                        type: e2.phonecase,
                        src: e$.$asset(`/stock/cases/${e2.phonecase}.png`),
                      },
                      null,
                      8,
                      ["type", "src"],
                    ),
                    Pl("div", QO, [
                      "/boot" != e$.$route.path
                        ? (wl(),
                          _l(
                            "div",
                            {
                              key: 0,
                              class: {
                                "text-white": e2.dark,
                                "text-black": !e2.dark,
                              },
                            },
                            [
                              Pl("div", eM, [
                                Pl("span", tM, g(e2.clock), 1),
                                e2.android ? Ml("", !0) : (wl(), _l("i", nM)),
                              ]),
                              Pl("div", lM, [
                                aM,
                                sM,
                                e2.android ? Ml("", !0) : (wl(), _l("i", oM)),
                              ]),
                            ],
                            2,
                          ))
                        : Ml("", !0),
                      e2.loading ? (wl(), _l("div", rM, [iM])) : Ml("", !0),
                      e2.alert
                        ? (wl(),
                          _l(
                            e6,
                            {
                              key: 2,
                              content: e2.alert,
                            },
                            null,
                            8,
                            ["content"],
                          ))
                        : Ml("", !0),
                      e2.prompt
                        ? (wl(),
                          _l(
                            e4,
                            Ul(
                              {
                                key: 3,
                              },
                              e2.prompt,
                            ),
                            null,
                            16,
                          ))
                        : Ml("", !0),
                      e2.confirm
                        ? (wl(),
                          _l(
                            e7,
                            {
                              key: 4,
                              title: e2.confirm.title,
                              callback: e2.confirm.callback,
                            },
                            null,
                            8,
                            ["title", "callback"],
                          ))
                        : Ml("", !0),
                      Pl(e5),
                      Pl(
                        Oa,
                        {
                          name: "menu",
                        },
                        {
                          default: BO(() => [Pl(eV)]),
                          _: 1,
                        },
                      ),
                      e2.paint.original
                        ? (wl(),
                          _l(eN, {
                            key: 5,
                          }))
                        : Ml("", !0),
                      e2.recording
                        ? (wl(),
                          _l(
                            e9,
                            {
                              key: 6,
                              callback: e2.recording,
                            },
                            null,
                            8,
                            ["callback"],
                          ))
                        : Ml("", !0),
                      Pl(
                        eU,
                        {
                          key: e$.$route.fullPath,
                        },
                        {
                          default: BO(({ Component: e$ }) => [
                            (wl(),
                            _l(
                              Fn,
                              {
                                include: "WhatsApp",
                              },
                              [
                                Zn((wl(), _l(fl(e$), null, null, 512)), [
                                  [ds, !e2.paint.original && !e2.recording],
                                ]),
                              ],
                              1024,
                            )),
                          ]),
                          _: 1,
                        },
                      ),
                    ]),
                  ],
                  512,
                ),
                [[ds, e2.visible]],
              ),
            ]),
            _: 1,
          },
        ),
      ],
      64,
    )
  );
});
((zO.render = cM), (zO.__scopeId = "data-v-16768605"));
const uM = {
    props: {
      modelValue: {
        required: !0,
      },
    },
    setup: () => ({
      android: So.settings.isAndroid,
    }),
  },
  dM = sn("data-v-e073d7c8");
ln("data-v-e073d7c8");
const pM = Pl("i", null, null, -1);
an();
const fM = dM(
  (e$, e0, e8, e2, e3, e1) => (
    wl(),
    _l(
      "label",
      {
        class: "form-switch",
        android: e2.android,
      },
      [
        Pl(
          "input",
          {
            type: "checkbox",
            checked: e8.modelValue,
            onInput:
              e0[1] ||
              (e0[1] = (e0) =>
                e$.$emit("update:modelValue", e0.target.checked)),
          },
          null,
          40,
          ["checked"],
        ),
        pM,
      ],
      8,
      ["android"],
    )
  ),
);
((uM.render = fM), (uM.__scopeId = "data-v-e073d7c8"));
const mM = {
    props: ["white"],
    setup(e$) {
      var e0;
      return {
        white: null != (e0 = So.darkTheme.value) ? e0 : e$.white,
      };
    },
  },
  hM = Ol(
    '<div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>',
    12,
  );
mM.render = function (e$, e0, e8, e2, e3, e1) {
  return (
    wl(),
    _l(
      "div",
      {
        class: "loading-spinner",
        style: {
          filter: e2.white && "invert(1)",
        },
      },
      [hM],
      4,
    )
  );
};
const bM = {},
  gM = {
    xmlns: "http://www.w3.org/2000/svg",
    height: "512pt",
    viewBox: "0 0 512 512",
    width: "512pt",
  },
  vM = Pl(
    "path",
    {
      d: "m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0",
      fill: "#2196f3",
    },
    null,
    -1,
  ),
  xM = Pl(
    "path",
    {
      d: "m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0",
      fill: "#fafafa",
    },
    null,
    -1,
  );
((bM.render = function (e$, e0) {
  return (wl(), _l("svg", gM, [vM, xM]));
}),
  (globalThis.GameView = lo));
const yM = ((...e$) => {
  let e0 = (ms || (ms = rl(fs))).createApp(...e$),
    { mount: e8 } = e0;
  return (
    (e0.mount = (e$) => {
      let e2 = (function (e$) {
        return V(e$) ? document.querySelector(e$) : e$;
      })(e$);
      if (!e2) return;
      let e3 = e0._component;
      (M(e3) || e3.render || e3.template || (e3.template = e2.innerHTML),
        (e2.innerHTML = ""));
      let e1 = e8(e2);
      return (
        e2 instanceof Element &&
          (e2.removeAttribute("v-cloak"), e2.setAttribute("data-v-app", "")),
        e1
      );
    }),
    e0
  );
})(zO);
(yM.component("AppInput", JP),
  yM.component("AppSelect", XP),
  yM.component("AppToggle", uM),
  yM.component("AppLoading", mM),
  yM.component("AppVerified", bM),
  yM.use(VO),
  (yM.config.globalProperties.$filters = Gs),
  (yM.config.globalProperties.$asset = (e$, e0) =>
    So.settings[e0] || So.asset(e$)),
  Object.defineProperty(yM.config.globalProperties, "$currency", {
    get: () => So.settings.currency,
  }),
  yM.mount("#root"));
