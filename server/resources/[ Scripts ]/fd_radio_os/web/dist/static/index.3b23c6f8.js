(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) i(l);
  new MutationObserver((l) => {
    for (const c of l)
      if (c.type === "childList")
        for (const f of c.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && i(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const c = {};
    return (
      l.integrity && (c.integrity = l.integrity),
      l.referrerpolicy && (c.referrerPolicy = l.referrerpolicy),
      l.crossorigin === "use-credentials"
        ? (c.credentials = "include")
        : l.crossorigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function i(l) {
    if (l.ep) return;
    l.ep = !0;
    const c = o(l);
    fetch(l.href, c);
  }
})();
let firstOpen = false;
function Oa(e, t) {
  const o = Object.create(null),
    i = e.split(",");
  for (let l = 0; l < i.length; l++) o[i[l]] = !0;
  return t ? (l) => !!o[l.toLowerCase()] : (l) => !!o[l];
}
const Bp =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Hp = Oa(Bp);
function fu(e) {
  return !!e || e === "";
}
function Pt(e) {
  if (ue(e)) {
    const t = {};
    for (let o = 0; o < e.length; o++) {
      const i = e[o],
        l = We(i) ? Vp(i) : Pt(i);
      if (l) for (const c in l) t[c] = l[c];
    }
    return t;
  } else {
    if (We(e)) return e;
    if (Ie(e)) return e;
  }
}
const Up = /;(?![^(]*\))/g,
  Wp = /:(.+)/;
function Vp(e) {
  const t = {};
  return (
    e.split(Up).forEach((o) => {
      if (o) {
        const i = o.split(Wp);
        i.length > 1 && (t[i[0].trim()] = i[1].trim());
      }
    }),
    t
  );
}
function on(e) {
  let t = "";
  if (We(e)) t = e;
  else if (ue(e))
    for (let o = 0; o < e.length; o++) {
      const i = on(e[o]);
      i && (t += i + " ");
    }
  else if (Ie(e)) for (const o in e) e[o] && (t += o + " ");
  return t.trim();
}
function qp(e) {
  if (!e) return null;
  let { class: t, style: o } = e;
  return t && !We(t) && (e.class = on(t)), o && (e.style = Pt(o)), e;
}
function Kp(e, t) {
  if (e.length !== t.length) return !1;
  let o = !0;
  for (let i = 0; o && i < e.length; i++) o = Ii(e[i], t[i]);
  return o;
}
function Ii(e, t) {
  if (e === t) return !0;
  let o = Gl(e),
    i = Gl(t);
  if (o || i) return o && i ? e.getTime() === t.getTime() : !1;
  if (((o = vr(e)), (i = vr(t)), o || i)) return e === t;
  if (((o = ue(e)), (i = ue(t)), o || i)) return o && i ? Kp(e, t) : !1;
  if (((o = Ie(e)), (i = Ie(t)), o || i)) {
    if (!o || !i) return !1;
    const l = Object.keys(e).length,
      c = Object.keys(t).length;
    if (l !== c) return !1;
    for (const f in e) {
      const d = e.hasOwnProperty(f),
        v = t.hasOwnProperty(f);
      if ((d && !v) || (!d && v) || !Ii(e[f], t[f])) return !1;
    }
  }
  return String(e) === String(t);
}
function Xp(e, t) {
  return e.findIndex((o) => Ii(o, t));
}
const be = (e) =>
    We(e)
      ? e
      : e == null
      ? ""
      : ue(e) || (Ie(e) && (e.toString === hu || !he(e.toString)))
      ? JSON.stringify(e, du, 2)
      : String(e),
  du = (e, t) =>
    t && t.__v_isRef
      ? du(e, t.value)
      : vo(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (o, [i, l]) => ((o[`${i} =>`] = l), o),
            {}
          ),
        }
      : zi(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Ie(t) && !ue(t) && !mu(t)
      ? String(t)
      : t,
  Ae = {},
  go = [],
  At = () => {},
  Yp = () => !1,
  Jp = /^on[^a-z]/,
  Di = (e) => Jp.test(e),
  Ea = (e) => e.startsWith("onUpdate:"),
  ut = Object.assign,
  Sa = (e, t) => {
    const o = e.indexOf(t);
    o > -1 && e.splice(o, 1);
  },
  Gp = Object.prototype.hasOwnProperty,
  ye = (e, t) => Gp.call(e, t),
  ue = Array.isArray,
  vo = (e) => Tr(e) === "[object Map]",
  zi = (e) => Tr(e) === "[object Set]",
  Gl = (e) => Tr(e) === "[object Date]",
  he = (e) => typeof e == "function",
  We = (e) => typeof e == "string",
  vr = (e) => typeof e == "symbol",
  Ie = (e) => e !== null && typeof e == "object",
  pu = (e) => Ie(e) && he(e.then) && he(e.catch),
  hu = Object.prototype.toString,
  Tr = (e) => hu.call(e),
  Qp = (e) => Tr(e).slice(8, -1),
  mu = (e) => Tr(e) === "[object Object]",
  Ta = (e) =>
    We(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  di = Oa(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Li = (e) => {
    const t = Object.create(null);
    return (o) => t[o] || (t[o] = e(o));
  },
  Zp = /-(\w)/g,
  Ut = Li((e) => e.replace(Zp, (t, o) => (o ? o.toUpperCase() : ""))),
  eh = /\B([A-Z])/g,
  eo = Li((e) => e.replace(eh, "-$1").toLowerCase()),
  Ni = Li((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Ls = Li((e) => (e ? `on${Ni(e)}` : "")),
  yr = (e, t) => !Object.is(e, t),
  pi = (e, t) => {
    for (let o = 0; o < e.length; o++) e[o](t);
  },
  bi = (e, t, o) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: o });
  },
  wi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ql;
const th = () =>
  Ql ||
  (Ql =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Lt;
class gu {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Lt),
      !t && Lt && (this.index = (Lt.scopes || (Lt.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const o = Lt;
      try {
        return (Lt = this), t();
      } finally {
        Lt = o;
      }
    }
  }
  on() {
    Lt = this;
  }
  off() {
    Lt = this.parent;
  }
  stop(t) {
    if (this.active) {
      let o, i;
      for (o = 0, i = this.effects.length; o < i; o++) this.effects[o].stop();
      for (o = 0, i = this.cleanups.length; o < i; o++) this.cleanups[o]();
      if (this.scopes)
        for (o = 0, i = this.scopes.length; o < i; o++) this.scopes[o].stop(!0);
      if (!this.detached && this.parent && !t) {
        const l = this.parent.scopes.pop();
        l &&
          l !== this &&
          ((this.parent.scopes[this.index] = l), (l.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function vu(e) {
  return new gu(e);
}
function nh(e, t = Lt) {
  t && t.active && t.effects.push(e);
}
const $a = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  yu = (e) => (e.w & Pn) > 0,
  bu = (e) => (e.n & Pn) > 0,
  oh = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Pn;
  },
  rh = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let o = 0;
      for (let i = 0; i < t.length; i++) {
        const l = t[i];
        yu(l) && !bu(l) ? l.delete(e) : (t[o++] = l),
          (l.w &= ~Pn),
          (l.n &= ~Pn);
      }
      t.length = o;
    }
  },
  Gs = new WeakMap();
let lr = 0,
  Pn = 1;
const Qs = 30;
let $t;
const Xn = Symbol(""),
  Zs = Symbol("");
class Ca {
  constructor(t, o = null, i) {
    (this.fn = t),
      (this.scheduler = o),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      nh(this, i);
  }
  run() {
    if (!this.active) return this.fn();
    let t = $t,
      o = wn;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = $t),
        ($t = this),
        (wn = !0),
        (Pn = 1 << ++lr),
        lr <= Qs ? oh(this) : Zl(this),
        this.fn()
      );
    } finally {
      lr <= Qs && rh(this),
        (Pn = 1 << --lr),
        ($t = this.parent),
        (wn = o),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    $t === this
      ? (this.deferStop = !0)
      : this.active &&
        (Zl(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Zl(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let o = 0; o < t.length; o++) t[o].delete(e);
    t.length = 0;
  }
}
let wn = !0;
const wu = [];
function jo() {
  wu.push(wn), (wn = !1);
}
function Ro() {
  const e = wu.pop();
  wn = e === void 0 ? !0 : e;
}
function wt(e, t, o) {
  if (wn && $t) {
    let i = Gs.get(e);
    i || Gs.set(e, (i = new Map()));
    let l = i.get(o);
    l || i.set(o, (l = $a())), _u(l);
  }
}
function _u(e, t) {
  let o = !1;
  lr <= Qs ? bu(e) || ((e.n |= Pn), (o = !yu(e))) : (o = !e.has($t)),
    o && (e.add($t), $t.deps.push(e));
}
function en(e, t, o, i, l, c) {
  const f = Gs.get(e);
  if (!f) return;
  let d = [];
  if (t === "clear") d = [...f.values()];
  else if (o === "length" && ue(e))
    f.forEach((v, b) => {
      (b === "length" || b >= i) && d.push(v);
    });
  else
    switch ((o !== void 0 && d.push(f.get(o)), t)) {
      case "add":
        ue(e)
          ? Ta(o) && d.push(f.get("length"))
          : (d.push(f.get(Xn)), vo(e) && d.push(f.get(Zs)));
        break;
      case "delete":
        ue(e) || (d.push(f.get(Xn)), vo(e) && d.push(f.get(Zs)));
        break;
      case "set":
        vo(e) && d.push(f.get(Xn));
        break;
    }
  if (d.length === 1) d[0] && ea(d[0]);
  else {
    const v = [];
    for (const b of d) b && v.push(...b);
    ea($a(v));
  }
}
function ea(e, t) {
  const o = ue(e) ? e : [...e];
  for (const i of o) i.computed && ec(i);
  for (const i of o) i.computed || ec(i);
}
function ec(e, t) {
  (e !== $t || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const ih = Oa("__proto__,__v_isRef,__isVue"),
  xu = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(vr)
  ),
  sh = Ma(),
  ah = Ma(!1, !0),
  lh = Ma(!0),
  tc = ch();
function ch() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...o) {
        const i = Se(this);
        for (let c = 0, f = this.length; c < f; c++) wt(i, "get", c + "");
        const l = i[t](...o);
        return l === -1 || l === !1 ? i[t](...o.map(Se)) : l;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...o) {
        jo();
        const i = Se(this)[t].apply(this, o);
        return Ro(), i;
      };
    }),
    e
  );
}
function Ma(e = !1, t = !1) {
  return function (i, l, c) {
    if (l === "__v_isReactive") return !e;
    if (l === "__v_isReadonly") return e;
    if (l === "__v_isShallow") return t;
    if (l === "__v_raw" && c === (e ? (t ? Eh : Tu) : t ? Su : Eu).get(i))
      return i;
    const f = ue(i);
    if (!e && f && ye(tc, l)) return Reflect.get(tc, l, c);
    const d = Reflect.get(i, l, c);
    return (vr(l) ? xu.has(l) : ih(l)) || (e || wt(i, "get", l), t)
      ? d
      : Be(d)
      ? f && Ta(l)
        ? d
        : d.value
      : Ie(d)
      ? e
        ? $u(d)
        : Bi(d)
      : d;
  };
}
const uh = Pu(),
  fh = Pu(!0);
function Pu(e = !1) {
  return function (o, i, l, c) {
    let f = o[i];
    if (xo(f) && Be(f) && !Be(l)) return !1;
    if (
      !e &&
      (!_i(l) && !xo(l) && ((f = Se(f)), (l = Se(l))),
      !ue(o) && Be(f) && !Be(l))
    )
      return (f.value = l), !0;
    const d = ue(o) && Ta(i) ? Number(i) < o.length : ye(o, i),
      v = Reflect.set(o, i, l, c);
    return (
      o === Se(c) && (d ? yr(l, f) && en(o, "set", i, l) : en(o, "add", i, l)),
      v
    );
  };
}
function dh(e, t) {
  const o = ye(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && o && en(e, "delete", t, void 0), i;
}
function ph(e, t) {
  const o = Reflect.has(e, t);
  return (!vr(t) || !xu.has(t)) && wt(e, "has", t), o;
}
function hh(e) {
  return wt(e, "iterate", ue(e) ? "length" : Xn), Reflect.ownKeys(e);
}
const Ou = { get: sh, set: uh, deleteProperty: dh, has: ph, ownKeys: hh },
  mh = {
    get: lh,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  gh = ut({}, Ou, { get: ah, set: fh }),
  Aa = (e) => e,
  Fi = (e) => Reflect.getPrototypeOf(e);
function si(e, t, o = !1, i = !1) {
  e = e.__v_raw;
  const l = Se(e),
    c = Se(t);
  o || (t !== c && wt(l, "get", t), wt(l, "get", c));
  const { has: f } = Fi(l),
    d = i ? Aa : o ? Ra : br;
  if (f.call(l, t)) return d(e.get(t));
  if (f.call(l, c)) return d(e.get(c));
  e !== l && e.get(t);
}
function ai(e, t = !1) {
  const o = this.__v_raw,
    i = Se(o),
    l = Se(e);
  return (
    t || (e !== l && wt(i, "has", e), wt(i, "has", l)),
    e === l ? o.has(e) : o.has(e) || o.has(l)
  );
}
function li(e, t = !1) {
  return (
    (e = e.__v_raw), !t && wt(Se(e), "iterate", Xn), Reflect.get(e, "size", e)
  );
}
function nc(e) {
  e = Se(e);
  const t = Se(this);
  return Fi(t).has.call(t, e) || (t.add(e), en(t, "add", e, e)), this;
}
function oc(e, t) {
  t = Se(t);
  const o = Se(this),
    { has: i, get: l } = Fi(o);
  let c = i.call(o, e);
  c || ((e = Se(e)), (c = i.call(o, e)));
  const f = l.call(o, e);
  return (
    o.set(e, t), c ? yr(t, f) && en(o, "set", e, t) : en(o, "add", e, t), this
  );
}
function rc(e) {
  const t = Se(this),
    { has: o, get: i } = Fi(t);
  let l = o.call(t, e);
  l || ((e = Se(e)), (l = o.call(t, e))), i && i.call(t, e);
  const c = t.delete(e);
  return l && en(t, "delete", e, void 0), c;
}
function ic() {
  const e = Se(this),
    t = e.size !== 0,
    o = e.clear();
  return t && en(e, "clear", void 0, void 0), o;
}
function ci(e, t) {
  return function (i, l) {
    const c = this,
      f = c.__v_raw,
      d = Se(f),
      v = t ? Aa : e ? Ra : br;
    return (
      !e && wt(d, "iterate", Xn), f.forEach((b, P) => i.call(l, v(b), v(P), c))
    );
  };
}
function ui(e, t, o) {
  return function (...i) {
    const l = this.__v_raw,
      c = Se(l),
      f = vo(c),
      d = e === "entries" || (e === Symbol.iterator && f),
      v = e === "keys" && f,
      b = l[e](...i),
      P = o ? Aa : t ? Ra : br;
    return (
      !t && wt(c, "iterate", v ? Zs : Xn),
      {
        next() {
          const { value: E, done: T } = b.next();
          return T
            ? { value: E, done: T }
            : { value: d ? [P(E[0]), P(E[1])] : P(E), done: T };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function hn(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function vh() {
  const e = {
      get(c) {
        return si(this, c);
      },
      get size() {
        return li(this);
      },
      has: ai,
      add: nc,
      set: oc,
      delete: rc,
      clear: ic,
      forEach: ci(!1, !1),
    },
    t = {
      get(c) {
        return si(this, c, !1, !0);
      },
      get size() {
        return li(this);
      },
      has: ai,
      add: nc,
      set: oc,
      delete: rc,
      clear: ic,
      forEach: ci(!1, !0),
    },
    o = {
      get(c) {
        return si(this, c, !0);
      },
      get size() {
        return li(this, !0);
      },
      has(c) {
        return ai.call(this, c, !0);
      },
      add: hn("add"),
      set: hn("set"),
      delete: hn("delete"),
      clear: hn("clear"),
      forEach: ci(!0, !1),
    },
    i = {
      get(c) {
        return si(this, c, !0, !0);
      },
      get size() {
        return li(this, !0);
      },
      has(c) {
        return ai.call(this, c, !0);
      },
      add: hn("add"),
      set: hn("set"),
      delete: hn("delete"),
      clear: hn("clear"),
      forEach: ci(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((c) => {
      (e[c] = ui(c, !1, !1)),
        (o[c] = ui(c, !0, !1)),
        (t[c] = ui(c, !1, !0)),
        (i[c] = ui(c, !0, !0));
    }),
    [e, o, t, i]
  );
}
const [yh, bh, wh, _h] = vh();
function ka(e, t) {
  const o = t ? (e ? _h : wh) : e ? bh : yh;
  return (i, l, c) =>
    l === "__v_isReactive"
      ? !e
      : l === "__v_isReadonly"
      ? e
      : l === "__v_raw"
      ? i
      : Reflect.get(ye(o, l) && l in i ? o : i, l, c);
}
const xh = { get: ka(!1, !1) },
  Ph = { get: ka(!1, !0) },
  Oh = { get: ka(!0, !1) },
  Eu = new WeakMap(),
  Su = new WeakMap(),
  Tu = new WeakMap(),
  Eh = new WeakMap();
function Sh(e) {
  switch (e) {
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
}
function Th(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Sh(Qp(e));
}
function Bi(e) {
  return xo(e) ? e : ja(e, !1, Ou, xh, Eu);
}
function $h(e) {
  return ja(e, !1, gh, Ph, Su);
}
function $u(e) {
  return ja(e, !0, mh, Oh, Tu);
}
function ja(e, t, o, i, l) {
  if (!Ie(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const c = l.get(e);
  if (c) return c;
  const f = Th(e);
  if (f === 0) return e;
  const d = new Proxy(e, f === 2 ? i : o);
  return l.set(e, d), d;
}
function _n(e) {
  return xo(e) ? _n(e.__v_raw) : !!(e && e.__v_isReactive);
}
function xo(e) {
  return !!(e && e.__v_isReadonly);
}
function _i(e) {
  return !!(e && e.__v_isShallow);
}
function Cu(e) {
  return _n(e) || xo(e);
}
function Se(e) {
  const t = e && e.__v_raw;
  return t ? Se(t) : e;
}
function Po(e) {
  return bi(e, "__v_skip", !0), e;
}
const br = (e) => (Ie(e) ? Bi(e) : e),
  Ra = (e) => (Ie(e) ? $u(e) : e);
function Mu(e) {
  wn && $t && ((e = Se(e)), _u(e.dep || (e.dep = $a())));
}
function Au(e, t) {
  (e = Se(e)), e.dep && ea(e.dep);
}
function Be(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ht(e) {
  return ku(e, !1);
}
function Ns(e) {
  return ku(e, !0);
}
function ku(e, t) {
  return Be(e) ? e : new Ch(e, t);
}
class Ch {
  constructor(t, o) {
    (this.__v_isShallow = o),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = o ? t : Se(t)),
      (this._value = o ? t : br(t));
  }
  get value() {
    return Mu(this), this._value;
  }
  set value(t) {
    const o = this.__v_isShallow || _i(t) || xo(t);
    (t = o ? t : Se(t)),
      yr(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = o ? t : br(t)), Au(this));
  }
}
function $(e) {
  return Be(e) ? e.value : e;
}
const Mh = {
  get: (e, t, o) => $(Reflect.get(e, t, o)),
  set: (e, t, o, i) => {
    const l = e[t];
    return Be(l) && !Be(o) ? ((l.value = o), !0) : Reflect.set(e, t, o, i);
  },
};
function ju(e) {
  return _n(e) ? e : new Proxy(e, Mh);
}
function Ah(e) {
  const t = ue(e) ? new Array(e.length) : {};
  for (const o in e) t[o] = jh(e, o);
  return t;
}
class kh {
  constructor(t, o, i) {
    (this._object = t),
      (this._key = o),
      (this._defaultValue = i),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function jh(e, t, o) {
  const i = e[t];
  return Be(i) ? i : new kh(e, t, o);
}
var Ru;
class Rh {
  constructor(t, o, i, l) {
    (this._setter = o),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Ru] = !1),
      (this._dirty = !0),
      (this.effect = new Ca(t, () => {
        this._dirty || ((this._dirty = !0), Au(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !l),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = Se(this);
    return (
      Mu(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Ru = "__v_isReadonly";
function Ih(e, t, o = !1) {
  let i, l;
  const c = he(e);
  return (
    c ? ((i = e), (l = At)) : ((i = e.get), (l = e.set)),
    new Rh(i, l, c || !l, o)
  );
}
function xn(e, t, o, i) {
  let l;
  try {
    l = i ? e(...i) : e();
  } catch (c) {
    Hi(c, t, o);
  }
  return l;
}
function kt(e, t, o, i) {
  if (he(e)) {
    const c = xn(e, t, o, i);
    return (
      c &&
        pu(c) &&
        c.catch((f) => {
          Hi(f, t, o);
        }),
      c
    );
  }
  const l = [];
  for (let c = 0; c < e.length; c++) l.push(kt(e[c], t, o, i));
  return l;
}
function Hi(e, t, o, i = !0) {
  const l = t ? t.vnode : null;
  if (t) {
    let c = t.parent;
    const f = t.proxy,
      d = o;
    for (; c; ) {
      const b = c.ec;
      if (b) {
        for (let P = 0; P < b.length; P++) if (b[P](e, f, d) === !1) return;
      }
      c = c.parent;
    }
    const v = t.appContext.config.errorHandler;
    if (v) {
      xn(v, null, 10, [e, f, d]);
      return;
    }
  }
  Dh(e, o, l, i);
}
function Dh(e, t, o, i = !0) {
  console.error(e);
}
let wr = !1,
  ta = !1;
const et = [];
let Bt = 0;
const yo = [];
let Jt = null,
  Wn = 0;
const Iu = Promise.resolve();
let Ia = null;
function Da(e) {
  const t = Ia || Iu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zh(e) {
  let t = Bt + 1,
    o = et.length;
  for (; t < o; ) {
    const i = (t + o) >>> 1;
    _r(et[i]) < e ? (t = i + 1) : (o = i);
  }
  return t;
}
function za(e) {
  (!et.length || !et.includes(e, wr && e.allowRecurse ? Bt + 1 : Bt)) &&
    (e.id == null ? et.push(e) : et.splice(zh(e.id), 0, e), Du());
}
function Du() {
  !wr && !ta && ((ta = !0), (Ia = Iu.then(Lu)));
}
function Lh(e) {
  const t = et.indexOf(e);
  t > Bt && et.splice(t, 1);
}
function Nh(e) {
  ue(e)
    ? yo.push(...e)
    : (!Jt || !Jt.includes(e, e.allowRecurse ? Wn + 1 : Wn)) && yo.push(e),
    Du();
}
function sc(e, t = wr ? Bt + 1 : 0) {
  for (; t < et.length; t++) {
    const o = et[t];
    o && o.pre && (et.splice(t, 1), t--, o());
  }
}
function zu(e) {
  if (yo.length) {
    const t = [...new Set(yo)];
    if (((yo.length = 0), Jt)) {
      Jt.push(...t);
      return;
    }
    for (Jt = t, Jt.sort((o, i) => _r(o) - _r(i)), Wn = 0; Wn < Jt.length; Wn++)
      Jt[Wn]();
    (Jt = null), (Wn = 0);
  }
}
const _r = (e) => (e.id == null ? 1 / 0 : e.id),
  Fh = (e, t) => {
    const o = _r(e) - _r(t);
    if (o === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return o;
  };
function Lu(e) {
  (ta = !1), (wr = !0), et.sort(Fh);
  const t = At;
  try {
    for (Bt = 0; Bt < et.length; Bt++) {
      const o = et[Bt];
      o && o.active !== !1 && xn(o, null, 14);
    }
  } finally {
    (Bt = 0),
      (et.length = 0),
      zu(),
      (wr = !1),
      (Ia = null),
      (et.length || yo.length) && Lu();
  }
}
function Bh(e, t, ...o) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || Ae;
  let l = o;
  const c = t.startsWith("update:"),
    f = c && t.slice(7);
  if (f && f in i) {
    const P = `${f === "modelValue" ? "model" : f}Modifiers`,
      { number: E, trim: T } = i[P] || Ae;
    T && (l = o.map((M) => M.trim())), E && (l = o.map(wi));
  }
  let d,
    v = i[(d = Ls(t))] || i[(d = Ls(Ut(t)))];
  !v && c && (v = i[(d = Ls(eo(t)))]), v && kt(v, e, 6, l);
  const b = i[d + "Once"];
  if (b) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[d]) return;
    (e.emitted[d] = !0), kt(b, e, 6, l);
  }
}
function Nu(e, t, o = !1) {
  const i = t.emitsCache,
    l = i.get(e);
  if (l !== void 0) return l;
  const c = e.emits;
  let f = {},
    d = !1;
  if (!he(e)) {
    const v = (b) => {
      const P = Nu(b, t, !0);
      P && ((d = !0), ut(f, P));
    };
    !o && t.mixins.length && t.mixins.forEach(v),
      e.extends && v(e.extends),
      e.mixins && e.mixins.forEach(v);
  }
  return !c && !d
    ? (Ie(e) && i.set(e, null), null)
    : (ue(c) ? c.forEach((v) => (f[v] = null)) : ut(f, c),
      Ie(e) && i.set(e, f),
      f);
}
function Ui(e, t) {
  return !e || !Di(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      ye(e, t[0].toLowerCase() + t.slice(1)) || ye(e, eo(t)) || ye(e, t));
}
let tt = null,
  Wi = null;
function xi(e) {
  const t = tt;
  return (tt = e), (Wi = (e && e.type.__scopeId) || null), t;
}
function Hh(e) {
  Wi = e;
}
function Uh() {
  Wi = null;
}
const Wh = (e) => Oo;
function Oo(e, t = tt, o) {
  if (!t || e._n) return e;
  const i = (...l) => {
    i._d && gc(-1);
    const c = xi(t);
    let f;
    try {
      f = e(...l);
    } finally {
      xi(c), i._d && gc(1);
    }
    return f;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function Fs(e) {
  const {
    type: t,
    vnode: o,
    proxy: i,
    withProxy: l,
    props: c,
    propsOptions: [f],
    slots: d,
    attrs: v,
    emit: b,
    render: P,
    renderCache: E,
    data: T,
    setupState: M,
    ctx: k,
    inheritAttrs: N,
  } = e;
  let Y, L;
  const ee = xi(e);
  try {
    if (o.shapeFlag & 4) {
      const oe = l || i;
      (Y = Ft(P.call(oe, oe, E, c, M, T, k))), (L = v);
    } else {
      const oe = t;
      (Y = Ft(
        oe.length > 1 ? oe(c, { attrs: v, slots: d, emit: b }) : oe(c, null)
      )),
        (L = t.props ? v : Vh(v));
    }
  } catch (oe) {
    (dr.length = 0), Hi(oe, e, 1), (Y = Ue(On));
  }
  let se = Y;
  if (L && N !== !1) {
    const oe = Object.keys(L),
      { shapeFlag: ce } = se;
    oe.length &&
      ce & 7 &&
      (f && oe.some(Ea) && (L = qh(L, f)), (se = So(se, L)));
  }
  return (
    o.dirs &&
      ((se = So(se)), (se.dirs = se.dirs ? se.dirs.concat(o.dirs) : o.dirs)),
    o.transition && (se.transition = o.transition),
    (Y = se),
    xi(ee),
    Y
  );
}
const Vh = (e) => {
    let t;
    for (const o in e)
      (o === "class" || o === "style" || Di(o)) && ((t || (t = {}))[o] = e[o]);
    return t;
  },
  qh = (e, t) => {
    const o = {};
    for (const i in e) (!Ea(i) || !(i.slice(9) in t)) && (o[i] = e[i]);
    return o;
  };
function Kh(e, t, o) {
  const { props: i, children: l, component: c } = e,
    { props: f, children: d, patchFlag: v } = t,
    b = c.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (o && v >= 0) {
    if (v & 1024) return !0;
    if (v & 16) return i ? ac(i, f, b) : !!f;
    if (v & 8) {
      const P = t.dynamicProps;
      for (let E = 0; E < P.length; E++) {
        const T = P[E];
        if (f[T] !== i[T] && !Ui(b, T)) return !0;
      }
    }
  } else
    return (l || d) && (!d || !d.$stable)
      ? !0
      : i === f
      ? !1
      : i
      ? f
        ? ac(i, f, b)
        : !0
      : !!f;
  return !1;
}
function ac(e, t, o) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < i.length; l++) {
    const c = i[l];
    if (t[c] !== e[c] && !Ui(o, c)) return !0;
  }
  return !1;
}
function Xh({ vnode: e, parent: t }, o) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = o), (t = t.parent);
}
const Yh = (e) => e.__isSuspense;
function Jh(e, t) {
  t && t.pendingBranch
    ? ue(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Nh(e);
}
function Gh(e, t) {
  if (Xe) {
    let o = Xe.provides;
    const i = Xe.parent && Xe.parent.provides;
    i === o && (o = Xe.provides = Object.create(i)), (o[e] = t);
  }
}
function hi(e, t, o = !1) {
  const i = Xe || tt;
  if (i) {
    const l =
      i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return o && he(t) ? t.call(i.proxy) : t;
  }
}
const lc = {};
function bo(e, t, o) {
  return Fu(e, t, o);
}
function Fu(
  e,
  t,
  { immediate: o, deep: i, flush: l, onTrack: c, onTrigger: f } = Ae
) {
  const d = Xe;
  let v,
    b = !1,
    P = !1;
  if (
    (Be(e)
      ? ((v = () => e.value), (b = _i(e)))
      : _n(e)
      ? ((v = () => e), (i = !0))
      : ue(e)
      ? ((P = !0),
        (b = e.some((L) => _n(L) || _i(L))),
        (v = () =>
          e.map((L) => {
            if (Be(L)) return L.value;
            if (_n(L)) return Kn(L);
            if (he(L)) return xn(L, d, 2);
          })))
      : he(e)
      ? t
        ? (v = () => xn(e, d, 2))
        : (v = () => {
            if (!(d && d.isUnmounted)) return E && E(), kt(e, d, 3, [T]);
          })
      : (v = At),
    t && i)
  ) {
    const L = v;
    v = () => Kn(L());
  }
  let E,
    T = (L) => {
      E = Y.onStop = () => {
        xn(L, d, 4);
      };
    };
  if (Or)
    return (T = At), t ? o && kt(t, d, 3, [v(), P ? [] : void 0, T]) : v(), At;
  let M = P ? [] : lc;
  const k = () => {
    if (!!Y.active)
      if (t) {
        const L = Y.run();
        (i || b || (P ? L.some((ee, se) => yr(ee, M[se])) : yr(L, M))) &&
          (E && E(), kt(t, d, 3, [L, M === lc ? void 0 : M, T]), (M = L));
      } else Y.run();
  };
  k.allowRecurse = !!t;
  let N;
  l === "sync"
    ? (N = k)
    : l === "post"
    ? (N = () => gt(k, d && d.suspense))
    : ((k.pre = !0), d && (k.id = d.uid), (N = () => za(k)));
  const Y = new Ca(v, N);
  return (
    t
      ? o
        ? k()
        : (M = Y.run())
      : l === "post"
      ? gt(Y.run.bind(Y), d && d.suspense)
      : Y.run(),
    () => {
      Y.stop(), d && d.scope && Sa(d.scope.effects, Y);
    }
  );
}
function Qh(e, t, o) {
  const i = this.proxy,
    l = We(e) ? (e.includes(".") ? Bu(i, e) : () => i[e]) : e.bind(i, i);
  let c;
  he(t) ? (c = t) : ((c = t.handler), (o = t));
  const f = Xe;
  To(this);
  const d = Fu(l, c.bind(i), o);
  return f ? To(f) : Yn(), d;
}
function Bu(e, t) {
  const o = t.split(".");
  return () => {
    let i = e;
    for (let l = 0; l < o.length && i; l++) i = i[o[l]];
    return i;
  };
}
function Kn(e, t) {
  if (!Ie(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Be(e))) Kn(e.value, t);
  else if (ue(e)) for (let o = 0; o < e.length; o++) Kn(e[o], t);
  else if (zi(e) || vo(e))
    e.forEach((o) => {
      Kn(o, t);
    });
  else if (mu(e)) for (const o in e) Kn(e[o], t);
  return e;
}
function Ze(e) {
  return he(e) ? { setup: e, name: e.name } : e;
}
const fr = (e) => !!e.type.__asyncLoader,
  Hu = (e) => e.type.__isKeepAlive;
function Zh(e, t) {
  Uu(e, "a", t);
}
function em(e, t) {
  Uu(e, "da", t);
}
function Uu(e, t, o = Xe) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let l = o;
      for (; l; ) {
        if (l.isDeactivated) return;
        l = l.parent;
      }
      return e();
    });
  if ((Vi(t, i, o), o)) {
    let l = o.parent;
    for (; l && l.parent; )
      Hu(l.parent.vnode) && tm(i, t, o, l), (l = l.parent);
  }
}
function tm(e, t, o, i) {
  const l = Vi(t, e, i, !0);
  La(() => {
    Sa(i[t], l);
  }, o);
}
function Vi(e, t, o = Xe, i = !1) {
  if (o) {
    const l = o[e] || (o[e] = []),
      c =
        t.__weh ||
        (t.__weh = (...f) => {
          if (o.isUnmounted) return;
          jo(), To(o);
          const d = kt(t, o, e, f);
          return Yn(), Ro(), d;
        });
    return i ? l.unshift(c) : l.push(c), c;
  }
}
const rn =
    (e) =>
    (t, o = Xe) =>
      (!Or || e === "sp") && Vi(e, (...i) => t(...i), o),
  nm = rn("bm"),
  Wu = rn("m"),
  om = rn("bu"),
  rm = rn("u"),
  im = rn("bum"),
  La = rn("um"),
  sm = rn("sp"),
  am = rn("rtg"),
  lm = rn("rtc");
function cm(e, t = Xe) {
  Vi("ec", e, t);
}
function ke(e, t) {
  const o = tt;
  if (o === null) return e;
  const i = Ki(o) || o.proxy,
    l = e.dirs || (e.dirs = []);
  for (let c = 0; c < t.length; c++) {
    let [f, d, v, b = Ae] = t[c];
    he(f) && (f = { mounted: f, updated: f }),
      f.deep && Kn(d),
      l.push({
        dir: f,
        instance: i,
        value: d,
        oldValue: void 0,
        arg: v,
        modifiers: b,
      });
  }
  return e;
}
function Nn(e, t, o, i) {
  const l = e.dirs,
    c = t && t.dirs;
  for (let f = 0; f < l.length; f++) {
    const d = l[f];
    c && (d.oldValue = c[f].value);
    let v = d.dir[i];
    v && (jo(), kt(v, o, 8, [e.el, d, e, t]), Ro());
  }
}
const Na = "components",
  um = "directives";
function xr(e, t) {
  return Fa(Na, e, !0, t) || e;
}
const Vu = Symbol();
function fm(e) {
  return We(e) ? Fa(Na, e, !1) || e : e || Vu;
}
function Qn(e) {
  return Fa(um, e);
}
function Fa(e, t, o = !0, i = !1) {
  const l = tt || Xe;
  if (l) {
    const c = l.type;
    if (e === Na) {
      const d = Nm(c, !1);
      if (d && (d === t || d === Ut(t) || d === Ni(Ut(t)))) return c;
    }
    const f = cc(l[e] || c[e], t) || cc(l.appContext[e], t);
    return !f && i ? c : f;
  }
}
function cc(e, t) {
  return e && (e[t] || e[Ut(t)] || e[Ni(Ut(t))]);
}
function Eo(e, t, o, i) {
  let l;
  const c = o && o[i];
  if (ue(e) || We(e)) {
    l = new Array(e.length);
    for (let f = 0, d = e.length; f < d; f++)
      l[f] = t(e[f], f, void 0, c && c[f]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let f = 0; f < e; f++) l[f] = t(f + 1, f, void 0, c && c[f]);
  } else if (Ie(e))
    if (e[Symbol.iterator])
      l = Array.from(e, (f, d) => t(f, d, void 0, c && c[d]));
    else {
      const f = Object.keys(e);
      l = new Array(f.length);
      for (let d = 0, v = f.length; d < v; d++) {
        const b = f[d];
        l[d] = t(e[b], b, d, c && c[d]);
      }
    }
  else l = [];
  return o && (o[i] = l), l;
}
function Pi(e, t, o = {}, i, l) {
  if (tt.isCE || (tt.parent && fr(tt.parent) && tt.parent.isCE))
    return Ue("slot", t === "default" ? null : { name: t }, i && i());
  let c = e[t];
  c && c._c && (c._d = !1), G();
  const f = c && qu(c(o)),
    d = to(
      qe,
      { key: o.key || (f && f.key) || `_${t}` },
      f || (i ? i() : []),
      f && e._ === 1 ? 64 : -2
    );
  return (
    !l && d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]),
    c && c._c && (c._d = !0),
    d
  );
}
function qu(e) {
  return e.some((t) =>
    Si(t) ? !(t.type === On || (t.type === qe && !qu(t.children))) : !0
  )
    ? e
    : null;
}
const na = (e) => (e ? (af(e) ? Ki(e) || e.proxy : na(e.parent)) : null),
  Oi = ut(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => na(e.parent),
    $root: (e) => na(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ba(e),
    $forceUpdate: (e) => e.f || (e.f = () => za(e.update)),
    $nextTick: (e) => e.n || (e.n = Da.bind(e.proxy)),
    $watch: (e) => Qh.bind(e),
  }),
  dm = {
    get({ _: e }, t) {
      const {
        ctx: o,
        setupState: i,
        data: l,
        props: c,
        accessCache: f,
        type: d,
        appContext: v,
      } = e;
      let b;
      if (t[0] !== "$") {
        const M = f[t];
        if (M !== void 0)
          switch (M) {
            case 1:
              return i[t];
            case 2:
              return l[t];
            case 4:
              return o[t];
            case 3:
              return c[t];
          }
        else {
          if (i !== Ae && ye(i, t)) return (f[t] = 1), i[t];
          if (l !== Ae && ye(l, t)) return (f[t] = 2), l[t];
          if ((b = e.propsOptions[0]) && ye(b, t)) return (f[t] = 3), c[t];
          if (o !== Ae && ye(o, t)) return (f[t] = 4), o[t];
          oa && (f[t] = 0);
        }
      }
      const P = Oi[t];
      let E, T;
      if (P) return t === "$attrs" && wt(e, "get", t), P(e);
      if ((E = d.__cssModules) && (E = E[t])) return E;
      if (o !== Ae && ye(o, t)) return (f[t] = 4), o[t];
      if (((T = v.config.globalProperties), ye(T, t))) return T[t];
    },
    set({ _: e }, t, o) {
      const { data: i, setupState: l, ctx: c } = e;
      return l !== Ae && ye(l, t)
        ? ((l[t] = o), !0)
        : i !== Ae && ye(i, t)
        ? ((i[t] = o), !0)
        : ye(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((c[t] = o), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: o,
          ctx: i,
          appContext: l,
          propsOptions: c,
        },
      },
      f
    ) {
      let d;
      return (
        !!o[f] ||
        (e !== Ae && ye(e, f)) ||
        (t !== Ae && ye(t, f)) ||
        ((d = c[0]) && ye(d, f)) ||
        ye(i, f) ||
        ye(Oi, f) ||
        ye(l.config.globalProperties, f)
      );
    },
    defineProperty(e, t, o) {
      return (
        o.get != null
          ? (e._.accessCache[t] = 0)
          : ye(o, "value") && this.set(e, t, o.value, null),
        Reflect.defineProperty(e, t, o)
      );
    },
  };
let oa = !0;
function pm(e) {
  const t = Ba(e),
    o = e.proxy,
    i = e.ctx;
  (oa = !1), t.beforeCreate && uc(t.beforeCreate, e, "bc");
  const {
    data: l,
    computed: c,
    methods: f,
    watch: d,
    provide: v,
    inject: b,
    created: P,
    beforeMount: E,
    mounted: T,
    beforeUpdate: M,
    updated: k,
    activated: N,
    deactivated: Y,
    beforeDestroy: L,
    beforeUnmount: ee,
    destroyed: se,
    unmounted: oe,
    render: ce,
    renderTracked: we,
    renderTriggered: me,
    errorCaptured: U,
    serverPrefetch: $e,
    expose: De,
    inheritAttrs: He,
    components: nt,
    directives: ot,
    filters: Fe,
  } = t;
  if ((b && hm(b, i, null, e.appContext.config.unwrapInjectedRef), f))
    for (const je in f) {
      const Te = f[je];
      he(Te) && (i[je] = Te.bind(o));
    }
  if (l) {
    const je = l.call(o, o);
    Ie(je) && (e.data = Bi(je));
  }
  if (((oa = !0), c))
    for (const je in c) {
      const Te = c[je],
        rt = he(Te) ? Te.bind(o, o) : he(Te.get) ? Te.get.bind(o, o) : At,
        Et = !he(Te) && he(Te.set) ? Te.set.bind(o) : At,
        jt = Va({ get: rt, set: Et });
      Object.defineProperty(i, je, {
        enumerable: !0,
        configurable: !0,
        get: () => jt.value,
        set: (Ve) => (jt.value = Ve),
      });
    }
  if (d) for (const je in d) Ku(d[je], i, o, je);
  if (v) {
    const je = he(v) ? v.call(o) : v;
    Reflect.ownKeys(je).forEach((Te) => {
      Gh(Te, je[Te]);
    });
  }
  P && uc(P, e, "c");
  function de(je, Te) {
    ue(Te) ? Te.forEach((rt) => je(rt.bind(o))) : Te && je(Te.bind(o));
  }
  if (
    (de(nm, E),
    de(Wu, T),
    de(om, M),
    de(rm, k),
    de(Zh, N),
    de(em, Y),
    de(cm, U),
    de(lm, we),
    de(am, me),
    de(im, ee),
    de(La, oe),
    de(sm, $e),
    ue(De))
  )
    if (De.length) {
      const je = e.exposed || (e.exposed = {});
      De.forEach((Te) => {
        Object.defineProperty(je, Te, {
          get: () => o[Te],
          set: (rt) => (o[Te] = rt),
        });
      });
    } else e.exposed || (e.exposed = {});
  ce && e.render === At && (e.render = ce),
    He != null && (e.inheritAttrs = He),
    nt && (e.components = nt),
    ot && (e.directives = ot);
}
function hm(e, t, o = At, i = !1) {
  ue(e) && (e = ra(e));
  for (const l in e) {
    const c = e[l];
    let f;
    Ie(c)
      ? "default" in c
        ? (f = hi(c.from || l, c.default, !0))
        : (f = hi(c.from || l))
      : (f = hi(c)),
      Be(f) && i
        ? Object.defineProperty(t, l, {
            enumerable: !0,
            configurable: !0,
            get: () => f.value,
            set: (d) => (f.value = d),
          })
        : (t[l] = f);
  }
}
function uc(e, t, o) {
  kt(ue(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, o);
}
function Ku(e, t, o, i) {
  const l = i.includes(".") ? Bu(o, i) : () => o[i];
  if (We(e)) {
    const c = t[e];
    he(c) && bo(l, c);
  } else if (he(e)) bo(l, e.bind(o));
  else if (Ie(e))
    if (ue(e)) e.forEach((c) => Ku(c, t, o, i));
    else {
      const c = he(e.handler) ? e.handler.bind(o) : t[e.handler];
      he(c) && bo(l, c, e);
    }
}
function Ba(e) {
  const t = e.type,
    { mixins: o, extends: i } = t,
    {
      mixins: l,
      optionsCache: c,
      config: { optionMergeStrategies: f },
    } = e.appContext,
    d = c.get(t);
  let v;
  return (
    d
      ? (v = d)
      : !l.length && !o && !i
      ? (v = t)
      : ((v = {}), l.length && l.forEach((b) => Ei(v, b, f, !0)), Ei(v, t, f)),
    Ie(t) && c.set(t, v),
    v
  );
}
function Ei(e, t, o, i = !1) {
  const { mixins: l, extends: c } = t;
  c && Ei(e, c, o, !0), l && l.forEach((f) => Ei(e, f, o, !0));
  for (const f in t)
    if (!(i && f === "expose")) {
      const d = mm[f] || (o && o[f]);
      e[f] = d ? d(e[f], t[f]) : t[f];
    }
  return e;
}
const mm = {
  data: fc,
  props: Hn,
  emits: Hn,
  methods: Hn,
  computed: Hn,
  beforeCreate: ct,
  created: ct,
  beforeMount: ct,
  mounted: ct,
  beforeUpdate: ct,
  updated: ct,
  beforeDestroy: ct,
  beforeUnmount: ct,
  destroyed: ct,
  unmounted: ct,
  activated: ct,
  deactivated: ct,
  errorCaptured: ct,
  serverPrefetch: ct,
  components: Hn,
  directives: Hn,
  watch: vm,
  provide: fc,
  inject: gm,
};
function fc(e, t) {
  return t
    ? e
      ? function () {
          return ut(
            he(e) ? e.call(this, this) : e,
            he(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function gm(e, t) {
  return Hn(ra(e), ra(t));
}
function ra(e) {
  if (ue(e)) {
    const t = {};
    for (let o = 0; o < e.length; o++) t[e[o]] = e[o];
    return t;
  }
  return e;
}
function ct(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Hn(e, t) {
  return e ? ut(ut(Object.create(null), e), t) : t;
}
function vm(e, t) {
  if (!e) return t;
  if (!t) return e;
  const o = ut(Object.create(null), e);
  for (const i in t) o[i] = ct(e[i], t[i]);
  return o;
}
function ym(e, t, o, i = !1) {
  const l = {},
    c = {};
  bi(c, qi, 1), (e.propsDefaults = Object.create(null)), Xu(e, t, l, c);
  for (const f in e.propsOptions[0]) f in l || (l[f] = void 0);
  o ? (e.props = i ? l : $h(l)) : e.type.props ? (e.props = l) : (e.props = c),
    (e.attrs = c);
}
function bm(e, t, o, i) {
  const {
      props: l,
      attrs: c,
      vnode: { patchFlag: f },
    } = e,
    d = Se(l),
    [v] = e.propsOptions;
  let b = !1;
  if ((i || f > 0) && !(f & 16)) {
    if (f & 8) {
      const P = e.vnode.dynamicProps;
      for (let E = 0; E < P.length; E++) {
        let T = P[E];
        if (Ui(e.emitsOptions, T)) continue;
        const M = t[T];
        if (v)
          if (ye(c, T)) M !== c[T] && ((c[T] = M), (b = !0));
          else {
            const k = Ut(T);
            l[k] = ia(v, d, k, M, e, !1);
          }
        else M !== c[T] && ((c[T] = M), (b = !0));
      }
    }
  } else {
    Xu(e, t, l, c) && (b = !0);
    let P;
    for (const E in d)
      (!t || (!ye(t, E) && ((P = eo(E)) === E || !ye(t, P)))) &&
        (v
          ? o &&
            (o[E] !== void 0 || o[P] !== void 0) &&
            (l[E] = ia(v, d, E, void 0, e, !0))
          : delete l[E]);
    if (c !== d)
      for (const E in c) (!t || (!ye(t, E) && !0)) && (delete c[E], (b = !0));
  }
  b && en(e, "set", "$attrs");
}
function Xu(e, t, o, i) {
  const [l, c] = e.propsOptions;
  let f = !1,
    d;
  if (t)
    for (let v in t) {
      if (di(v)) continue;
      const b = t[v];
      let P;
      l && ye(l, (P = Ut(v)))
        ? !c || !c.includes(P)
          ? (o[P] = b)
          : ((d || (d = {}))[P] = b)
        : Ui(e.emitsOptions, v) ||
          ((!(v in i) || b !== i[v]) && ((i[v] = b), (f = !0)));
    }
  if (c) {
    const v = Se(o),
      b = d || Ae;
    for (let P = 0; P < c.length; P++) {
      const E = c[P];
      o[E] = ia(l, v, E, b[E], e, !ye(b, E));
    }
  }
  return f;
}
function ia(e, t, o, i, l, c) {
  const f = e[o];
  if (f != null) {
    const d = ye(f, "default");
    if (d && i === void 0) {
      const v = f.default;
      if (f.type !== Function && he(v)) {
        const { propsDefaults: b } = l;
        o in b ? (i = b[o]) : (To(l), (i = b[o] = v.call(null, t)), Yn());
      } else i = v;
    }
    f[0] &&
      (c && !d ? (i = !1) : f[1] && (i === "" || i === eo(o)) && (i = !0));
  }
  return i;
}
function Yu(e, t, o = !1) {
  const i = t.propsCache,
    l = i.get(e);
  if (l) return l;
  const c = e.props,
    f = {},
    d = [];
  let v = !1;
  if (!he(e)) {
    const P = (E) => {
      v = !0;
      const [T, M] = Yu(E, t, !0);
      ut(f, T), M && d.push(...M);
    };
    !o && t.mixins.length && t.mixins.forEach(P),
      e.extends && P(e.extends),
      e.mixins && e.mixins.forEach(P);
  }
  if (!c && !v) return Ie(e) && i.set(e, go), go;
  if (ue(c))
    for (let P = 0; P < c.length; P++) {
      const E = Ut(c[P]);
      dc(E) && (f[E] = Ae);
    }
  else if (c)
    for (const P in c) {
      const E = Ut(P);
      if (dc(E)) {
        const T = c[P],
          M = (f[E] = ue(T) || he(T) ? { type: T } : T);
        if (M) {
          const k = mc(Boolean, M.type),
            N = mc(String, M.type);
          (M[0] = k > -1),
            (M[1] = N < 0 || k < N),
            (k > -1 || ye(M, "default")) && d.push(E);
        }
      }
    }
  const b = [f, d];
  return Ie(e) && i.set(e, b), b;
}
function dc(e) {
  return e[0] !== "$";
}
function pc(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function hc(e, t) {
  return pc(e) === pc(t);
}
function mc(e, t) {
  return ue(t) ? t.findIndex((o) => hc(o, e)) : he(t) && hc(t, e) ? 0 : -1;
}
const Ju = (e) => e[0] === "_" || e === "$stable",
  Ha = (e) => (ue(e) ? e.map(Ft) : [Ft(e)]),
  wm = (e, t, o) => {
    if (t._n) return t;
    const i = Oo((...l) => Ha(t(...l)), o);
    return (i._c = !1), i;
  },
  Gu = (e, t, o) => {
    const i = e._ctx;
    for (const l in e) {
      if (Ju(l)) continue;
      const c = e[l];
      if (he(c)) t[l] = wm(l, c, i);
      else if (c != null) {
        const f = Ha(c);
        t[l] = () => f;
      }
    }
  },
  Qu = (e, t) => {
    const o = Ha(t);
    e.slots.default = () => o;
  },
  _m = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const o = t._;
      o ? ((e.slots = Se(t)), bi(t, "_", o)) : Gu(t, (e.slots = {}));
    } else (e.slots = {}), t && Qu(e, t);
    bi(e.slots, qi, 1);
  },
  xm = (e, t, o) => {
    const { vnode: i, slots: l } = e;
    let c = !0,
      f = Ae;
    if (i.shapeFlag & 32) {
      const d = t._;
      d
        ? o && d === 1
          ? (c = !1)
          : (ut(l, t), !o && d === 1 && delete l._)
        : ((c = !t.$stable), Gu(t, l)),
        (f = t);
    } else t && (Qu(e, t), (f = { default: 1 }));
    if (c) for (const d in l) !Ju(d) && !(d in f) && delete l[d];
  };
function Zu() {
  return {
    app: null,
    config: {
      isNativeTag: Yp,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Pm = 0;
function Om(e, t) {
  return function (i, l = null) {
    he(i) || (i = Object.assign({}, i)), l != null && !Ie(l) && (l = null);
    const c = Zu(),
      f = new Set();
    let d = !1;
    const v = (c.app = {
      _uid: Pm++,
      _component: i,
      _props: l,
      _container: null,
      _context: c,
      _instance: null,
      version: Hm,
      get config() {
        return c.config;
      },
      set config(b) {},
      use(b, ...P) {
        return (
          f.has(b) ||
            (b && he(b.install)
              ? (f.add(b), b.install(v, ...P))
              : he(b) && (f.add(b), b(v, ...P))),
          v
        );
      },
      mixin(b) {
        return c.mixins.includes(b) || c.mixins.push(b), v;
      },
      component(b, P) {
        return P ? ((c.components[b] = P), v) : c.components[b];
      },
      directive(b, P) {
        return P ? ((c.directives[b] = P), v) : c.directives[b];
      },
      mount(b, P, E) {
        if (!d) {
          const T = Ue(i, l);
          return (
            (T.appContext = c),
            P && t ? t(T, b) : e(T, b, E),
            (d = !0),
            (v._container = b),
            (b.__vue_app__ = v),
            Ki(T.component) || T.component.proxy
          );
        }
      },
      unmount() {
        d && (e(null, v._container), delete v._container.__vue_app__);
      },
      provide(b, P) {
        return (c.provides[b] = P), v;
      },
    });
    return v;
  };
}
function sa(e, t, o, i, l = !1) {
  if (ue(e)) {
    e.forEach((T, M) => sa(T, t && (ue(t) ? t[M] : t), o, i, l));
    return;
  }
  if (fr(i) && !l) return;
  const c = i.shapeFlag & 4 ? Ki(i.component) || i.component.proxy : i.el,
    f = l ? null : c,
    { i: d, r: v } = e,
    b = t && t.r,
    P = d.refs === Ae ? (d.refs = {}) : d.refs,
    E = d.setupState;
  if (
    (b != null &&
      b !== v &&
      (We(b)
        ? ((P[b] = null), ye(E, b) && (E[b] = null))
        : Be(b) && (b.value = null)),
    he(v))
  )
    xn(v, d, 12, [f, P]);
  else {
    const T = We(v),
      M = Be(v);
    if (T || M) {
      const k = () => {
        if (e.f) {
          const N = T ? (ye(E, v) ? E[v] : P[v]) : v.value;
          l
            ? ue(N) && Sa(N, c)
            : ue(N)
            ? N.includes(c) || N.push(c)
            : T
            ? ((P[v] = [c]), ye(E, v) && (E[v] = P[v]))
            : ((v.value = [c]), e.k && (P[e.k] = v.value));
        } else
          T
            ? ((P[v] = f), ye(E, v) && (E[v] = f))
            : M && ((v.value = f), e.k && (P[e.k] = f));
      };
      f ? ((k.id = -1), gt(k, o)) : k();
    }
  }
}
const gt = Jh;
function Em(e) {
  return Sm(e);
}
function Sm(e, t) {
  const o = th();
  o.__VUE__ = !0;
  const {
      insert: i,
      remove: l,
      patchProp: c,
      createElement: f,
      createText: d,
      createComment: v,
      setText: b,
      setElementText: P,
      parentNode: E,
      nextSibling: T,
      setScopeId: M = At,
      insertStaticContent: k,
    } = e,
    N = (
      _,
      O,
      j,
      A = null,
      z = null,
      V = null,
      q = !1,
      W = null,
      K = !!O.dynamicChildren
    ) => {
      if (_ === O) return;
      _ && !rr(_, O) && ((A = Cn(_)), Ve(_, z, V, !0), (_ = null)),
        O.patchFlag === -2 && ((K = !1), (O.dynamicChildren = null));
      const { type: F, ref: ie, shapeFlag: Q } = O;
      switch (F) {
        case Ua:
          Y(_, O, j, A);
          break;
        case On:
          L(_, O, j, A);
          break;
        case Bs:
          _ == null && ee(O, j, A, q);
          break;
        case qe:
          nt(_, O, j, A, z, V, q, W, K);
          break;
        default:
          Q & 1
            ? ce(_, O, j, A, z, V, q, W, K)
            : Q & 6
            ? ot(_, O, j, A, z, V, q, W, K)
            : (Q & 64 || Q & 128) && F.process(_, O, j, A, z, V, q, W, K, St);
      }
      ie != null && z && sa(ie, _ && _.ref, V, O || _, !O);
    },
    Y = (_, O, j, A) => {
      if (_ == null) i((O.el = d(O.children)), j, A);
      else {
        const z = (O.el = _.el);
        O.children !== _.children && b(z, O.children);
      }
    },
    L = (_, O, j, A) => {
      _ == null ? i((O.el = v(O.children || "")), j, A) : (O.el = _.el);
    },
    ee = (_, O, j, A) => {
      [_.el, _.anchor] = k(_.children, O, j, A, _.el, _.anchor);
    },
    se = ({ el: _, anchor: O }, j, A) => {
      let z;
      for (; _ && _ !== O; ) (z = T(_)), i(_, j, A), (_ = z);
      i(O, j, A);
    },
    oe = ({ el: _, anchor: O }) => {
      let j;
      for (; _ && _ !== O; ) (j = T(_)), l(_), (_ = j);
      l(O);
    },
    ce = (_, O, j, A, z, V, q, W, K) => {
      (q = q || O.type === "svg"),
        _ == null ? we(O, j, A, z, V, q, W, K) : $e(_, O, z, V, q, W, K);
    },
    we = (_, O, j, A, z, V, q, W) => {
      let K, F;
      const { type: ie, props: Q, shapeFlag: re, transition: ae, dirs: ge } = _;
      if (
        ((K = _.el = f(_.type, V, Q && Q.is, Q)),
        re & 8
          ? P(K, _.children)
          : re & 16 &&
            U(_.children, K, null, A, z, V && ie !== "foreignObject", q, W),
        ge && Nn(_, null, A, "created"),
        Q)
      ) {
        for (const Oe in Q)
          Oe !== "value" &&
            !di(Oe) &&
            c(K, Oe, null, Q[Oe], V, _.children, A, z, it);
        "value" in Q && c(K, "value", null, Q.value),
          (F = Q.onVnodeBeforeMount) && zt(F, A, _);
      }
      me(K, _, _.scopeId, q, A), ge && Nn(_, null, A, "beforeMount");
      const Pe = (!z || (z && !z.pendingBranch)) && ae && !ae.persisted;
      Pe && ae.beforeEnter(K),
        i(K, O, j),
        ((F = Q && Q.onVnodeMounted) || Pe || ge) &&
          gt(() => {
            F && zt(F, A, _),
              Pe && ae.enter(K),
              ge && Nn(_, null, A, "mounted");
          }, z);
    },
    me = (_, O, j, A, z) => {
      if ((j && M(_, j), A)) for (let V = 0; V < A.length; V++) M(_, A[V]);
      if (z) {
        let V = z.subTree;
        if (O === V) {
          const q = z.vnode;
          me(_, q, q.scopeId, q.slotScopeIds, z.parent);
        }
      }
    },
    U = (_, O, j, A, z, V, q, W, K = 0) => {
      for (let F = K; F < _.length; F++) {
        const ie = (_[F] = W ? yn(_[F]) : Ft(_[F]));
        N(null, ie, O, j, A, z, V, q, W);
      }
    },
    $e = (_, O, j, A, z, V, q) => {
      const W = (O.el = _.el);
      let { patchFlag: K, dynamicChildren: F, dirs: ie } = O;
      K |= _.patchFlag & 16;
      const Q = _.props || Ae,
        re = O.props || Ae;
      let ae;
      j && Fn(j, !1),
        (ae = re.onVnodeBeforeUpdate) && zt(ae, j, O, _),
        ie && Nn(O, _, j, "beforeUpdate"),
        j && Fn(j, !0);
      const ge = z && O.type !== "foreignObject";
      if (
        (F
          ? De(_.dynamicChildren, F, W, j, A, ge, V)
          : q || Te(_, O, W, null, j, A, ge, V, !1),
        K > 0)
      ) {
        if (K & 16) He(W, O, Q, re, j, A, z);
        else if (
          (K & 2 && Q.class !== re.class && c(W, "class", null, re.class, z),
          K & 4 && c(W, "style", Q.style, re.style, z),
          K & 8)
        ) {
          const Pe = O.dynamicProps;
          for (let Oe = 0; Oe < Pe.length; Oe++) {
            const Le = Pe[Oe],
              dt = Q[Le],
              It = re[Le];
            (It !== dt || Le === "value") &&
              c(W, Le, dt, It, z, _.children, j, A, it);
          }
        }
        K & 1 && _.children !== O.children && P(W, O.children);
      } else !q && F == null && He(W, O, Q, re, j, A, z);
      ((ae = re.onVnodeUpdated) || ie) &&
        gt(() => {
          ae && zt(ae, j, O, _), ie && Nn(O, _, j, "updated");
        }, A);
    },
    De = (_, O, j, A, z, V, q) => {
      for (let W = 0; W < O.length; W++) {
        const K = _[W],
          F = O[W],
          ie =
            K.el && (K.type === qe || !rr(K, F) || K.shapeFlag & 70)
              ? E(K.el)
              : j;
        N(K, F, ie, null, A, z, V, q, !0);
      }
    },
    He = (_, O, j, A, z, V, q) => {
      if (j !== A) {
        if (j !== Ae)
          for (const W in j)
            !di(W) && !(W in A) && c(_, W, j[W], null, q, O.children, z, V, it);
        for (const W in A) {
          if (di(W)) continue;
          const K = A[W],
            F = j[W];
          K !== F && W !== "value" && c(_, W, F, K, q, O.children, z, V, it);
        }
        "value" in A && c(_, "value", j.value, A.value);
      }
    },
    nt = (_, O, j, A, z, V, q, W, K) => {
      const F = (O.el = _ ? _.el : d("")),
        ie = (O.anchor = _ ? _.anchor : d(""));
      let { patchFlag: Q, dynamicChildren: re, slotScopeIds: ae } = O;
      ae && (W = W ? W.concat(ae) : ae),
        _ == null
          ? (i(F, j, A), i(ie, j, A), U(O.children, j, ie, z, V, q, W, K))
          : Q > 0 && Q & 64 && re && _.dynamicChildren
          ? (De(_.dynamicChildren, re, j, z, V, q, W),
            (O.key != null || (z && O === z.subTree)) && ef(_, O, !0))
          : Te(_, O, j, ie, z, V, q, W, K);
    },
    ot = (_, O, j, A, z, V, q, W, K) => {
      (O.slotScopeIds = W),
        _ == null
          ? O.shapeFlag & 512
            ? z.ctx.activate(O, j, A, q, K)
            : Fe(O, j, A, z, V, q, K)
          : J(_, O, K);
    },
    Fe = (_, O, j, A, z, V, q) => {
      const W = (_.component = Rm(_, A, z));
      if ((Hu(_) && (W.ctx.renderer = St), Im(W), W.asyncDep)) {
        if ((z && z.registerDep(W, de), !_.el)) {
          const K = (W.subTree = Ue(On));
          L(null, K, O, j);
        }
        return;
      }
      de(W, _, O, j, z, V, q);
    },
    J = (_, O, j) => {
      const A = (O.component = _.component);
      if (Kh(_, O, j))
        if (A.asyncDep && !A.asyncResolved) {
          je(A, O, j);
          return;
        } else (A.next = O), Lh(A.update), A.update();
      else (O.el = _.el), (A.vnode = O);
    },
    de = (_, O, j, A, z, V, q) => {
      const W = () => {
          if (_.isMounted) {
            let { next: ie, bu: Q, u: re, parent: ae, vnode: ge } = _,
              Pe = ie,
              Oe;
            Fn(_, !1),
              ie ? ((ie.el = ge.el), je(_, ie, q)) : (ie = ge),
              Q && pi(Q),
              (Oe = ie.props && ie.props.onVnodeBeforeUpdate) &&
                zt(Oe, ae, ie, ge),
              Fn(_, !0);
            const Le = Fs(_),
              dt = _.subTree;
            (_.subTree = Le),
              N(dt, Le, E(dt.el), Cn(dt), _, z, V),
              (ie.el = Le.el),
              Pe === null && Xh(_, Le.el),
              re && gt(re, z),
              (Oe = ie.props && ie.props.onVnodeUpdated) &&
                gt(() => zt(Oe, ae, ie, ge), z);
          } else {
            let ie;
            const { el: Q, props: re } = O,
              { bm: ae, m: ge, parent: Pe } = _,
              Oe = fr(O);
            if (
              (Fn(_, !1),
              ae && pi(ae),
              !Oe && (ie = re && re.onVnodeBeforeMount) && zt(ie, Pe, O),
              Fn(_, !0),
              Q && Rt)
            ) {
              const Le = () => {
                (_.subTree = Fs(_)), Rt(Q, _.subTree, _, z, null);
              };
              Oe
                ? O.type.__asyncLoader().then(() => !_.isUnmounted && Le())
                : Le();
            } else {
              const Le = (_.subTree = Fs(_));
              N(null, Le, j, A, _, z, V), (O.el = Le.el);
            }
            if ((ge && gt(ge, z), !Oe && (ie = re && re.onVnodeMounted))) {
              const Le = O;
              gt(() => zt(ie, Pe, Le), z);
            }
            (O.shapeFlag & 256 ||
              (Pe && fr(Pe.vnode) && Pe.vnode.shapeFlag & 256)) &&
              _.a &&
              gt(_.a, z),
              (_.isMounted = !0),
              (O = j = A = null);
          }
        },
        K = (_.effect = new Ca(W, () => za(F), _.scope)),
        F = (_.update = () => K.run());
      (F.id = _.uid), Fn(_, !0), F();
    },
    je = (_, O, j) => {
      O.component = _;
      const A = _.vnode.props;
      (_.vnode = O),
        (_.next = null),
        bm(_, O.props, A, j),
        xm(_, O.children, j),
        jo(),
        sc(),
        Ro();
    },
    Te = (_, O, j, A, z, V, q, W, K = !1) => {
      const F = _ && _.children,
        ie = _ ? _.shapeFlag : 0,
        Q = O.children,
        { patchFlag: re, shapeFlag: ae } = O;
      if (re > 0) {
        if (re & 128) {
          Et(F, Q, j, A, z, V, q, W, K);
          return;
        } else if (re & 256) {
          rt(F, Q, j, A, z, V, q, W, K);
          return;
        }
      }
      ae & 8
        ? (ie & 16 && it(F, z, V), Q !== F && P(j, Q))
        : ie & 16
        ? ae & 16
          ? Et(F, Q, j, A, z, V, q, W, K)
          : it(F, z, V, !0)
        : (ie & 8 && P(j, ""), ae & 16 && U(Q, j, A, z, V, q, W, K));
    },
    rt = (_, O, j, A, z, V, q, W, K) => {
      (_ = _ || go), (O = O || go);
      const F = _.length,
        ie = O.length,
        Q = Math.min(F, ie);
      let re;
      for (re = 0; re < Q; re++) {
        const ae = (O[re] = K ? yn(O[re]) : Ft(O[re]));
        N(_[re], ae, j, null, z, V, q, W, K);
      }
      F > ie ? it(_, z, V, !0, !1, Q) : U(O, j, A, z, V, q, W, K, Q);
    },
    Et = (_, O, j, A, z, V, q, W, K) => {
      let F = 0;
      const ie = O.length;
      let Q = _.length - 1,
        re = ie - 1;
      for (; F <= Q && F <= re; ) {
        const ae = _[F],
          ge = (O[F] = K ? yn(O[F]) : Ft(O[F]));
        if (rr(ae, ge)) N(ae, ge, j, null, z, V, q, W, K);
        else break;
        F++;
      }
      for (; F <= Q && F <= re; ) {
        const ae = _[Q],
          ge = (O[re] = K ? yn(O[re]) : Ft(O[re]));
        if (rr(ae, ge)) N(ae, ge, j, null, z, V, q, W, K);
        else break;
        Q--, re--;
      }
      if (F > Q) {
        if (F <= re) {
          const ae = re + 1,
            ge = ae < ie ? O[ae].el : A;
          for (; F <= re; )
            N(null, (O[F] = K ? yn(O[F]) : Ft(O[F])), j, ge, z, V, q, W, K),
              F++;
        }
      } else if (F > re) for (; F <= Q; ) Ve(_[F], z, V, !0), F++;
      else {
        const ae = F,
          ge = F,
          Pe = new Map();
        for (F = ge; F <= re; F++) {
          const st = (O[F] = K ? yn(O[F]) : Ft(O[F]));
          st.key != null && Pe.set(st.key, F);
        }
        let Oe,
          Le = 0;
        const dt = re - ge + 1;
        let It = !1,
          ro = 0;
        const cn = new Array(dt);
        for (F = 0; F < dt; F++) cn[F] = 0;
        for (F = ae; F <= Q; F++) {
          const st = _[F];
          if (Le >= dt) {
            Ve(st, z, V, !0);
            continue;
          }
          let at;
          if (st.key != null) at = Pe.get(st.key);
          else
            for (Oe = ge; Oe <= re; Oe++)
              if (cn[Oe - ge] === 0 && rr(st, O[Oe])) {
                at = Oe;
                break;
              }
          at === void 0
            ? Ve(st, z, V, !0)
            : ((cn[at - ge] = F + 1),
              at >= ro ? (ro = at) : (It = !0),
              N(st, O[at], j, null, z, V, q, W, K),
              Le++);
        }
        const No = It ? Tm(cn) : go;
        for (Oe = No.length - 1, F = dt - 1; F >= 0; F--) {
          const st = ge + F,
            at = O[st],
            io = st + 1 < ie ? O[st + 1].el : A;
          cn[F] === 0
            ? N(null, at, j, io, z, V, q, W, K)
            : It && (Oe < 0 || F !== No[Oe] ? jt(at, j, io, 2) : Oe--);
        }
      }
    },
    jt = (_, O, j, A, z = null) => {
      const { el: V, type: q, transition: W, children: K, shapeFlag: F } = _;
      if (F & 6) {
        jt(_.component.subTree, O, j, A);
        return;
      }
      if (F & 128) {
        _.suspense.move(O, j, A);
        return;
      }
      if (F & 64) {
        q.move(_, O, j, St);
        return;
      }
      if (q === qe) {
        i(V, O, j);
        for (let Q = 0; Q < K.length; Q++) jt(K[Q], O, j, A);
        i(_.anchor, O, j);
        return;
      }
      if (q === Bs) {
        se(_, O, j);
        return;
      }
      if (A !== 2 && F & 1 && W)
        if (A === 0) W.beforeEnter(V), i(V, O, j), gt(() => W.enter(V), z);
        else {
          const { leave: Q, delayLeave: re, afterLeave: ae } = W,
            ge = () => i(V, O, j),
            Pe = () => {
              Q(V, () => {
                ge(), ae && ae();
              });
            };
          re ? re(V, ge, Pe) : Pe();
        }
      else i(V, O, j);
    },
    Ve = (_, O, j, A = !1, z = !1) => {
      const {
        type: V,
        props: q,
        ref: W,
        children: K,
        dynamicChildren: F,
        shapeFlag: ie,
        patchFlag: Q,
        dirs: re,
      } = _;
      if ((W != null && sa(W, null, j, _, !0), ie & 256)) {
        O.ctx.deactivate(_);
        return;
      }
      const ae = ie & 1 && re,
        ge = !fr(_);
      let Pe;
      if ((ge && (Pe = q && q.onVnodeBeforeUnmount) && zt(Pe, O, _), ie & 6))
        zo(_.component, j, A);
      else {
        if (ie & 128) {
          _.suspense.unmount(j, A);
          return;
        }
        ae && Nn(_, null, O, "beforeUnmount"),
          ie & 64
            ? _.type.remove(_, O, j, z, St, A)
            : F && (V !== qe || (Q > 0 && Q & 64))
            ? it(F, O, j, !1, !0)
            : ((V === qe && Q & 384) || (!z && ie & 16)) && it(K, O, j),
          A && $n(_);
      }
      ((ge && (Pe = q && q.onVnodeUnmounted)) || ae) &&
        gt(() => {
          Pe && zt(Pe, O, _), ae && Nn(_, null, O, "unmounted");
        }, j);
    },
    $n = (_) => {
      const { type: O, el: j, anchor: A, transition: z } = _;
      if (O === qe) {
        te(j, A);
        return;
      }
      if (O === Bs) {
        oe(_);
        return;
      }
      const V = () => {
        l(j), z && !z.persisted && z.afterLeave && z.afterLeave();
      };
      if (_.shapeFlag & 1 && z && !z.persisted) {
        const { leave: q, delayLeave: W } = z,
          K = () => q(j, V);
        W ? W(_.el, V, K) : K();
      } else V();
    },
    te = (_, O) => {
      let j;
      for (; _ !== O; ) (j = T(_)), l(_), (_ = j);
      l(O);
    },
    zo = (_, O, j) => {
      const { bum: A, scope: z, update: V, subTree: q, um: W } = _;
      A && pi(A),
        z.stop(),
        V && ((V.active = !1), Ve(q, _, O, j)),
        W && gt(W, O),
        gt(() => {
          _.isUnmounted = !0;
        }, O),
        O &&
          O.pendingBranch &&
          !O.isUnmounted &&
          _.asyncDep &&
          !_.asyncResolved &&
          _.suspenseId === O.pendingId &&
          (O.deps--, O.deps === 0 && O.resolve());
    },
    it = (_, O, j, A = !1, z = !1, V = 0) => {
      for (let q = V; q < _.length; q++) Ve(_[q], O, j, A, z);
    },
    Cn = (_) =>
      _.shapeFlag & 6
        ? Cn(_.component.subTree)
        : _.shapeFlag & 128
        ? _.suspense.next()
        : T(_.anchor || _.el),
    Lo = (_, O, j) => {
      _ == null
        ? O._vnode && Ve(O._vnode, null, null, !0)
        : N(O._vnode || null, _, O, null, null, null, j),
        sc(),
        zu(),
        (O._vnode = _);
    },
    St = {
      p: N,
      um: Ve,
      m: jt,
      r: $n,
      mt: Fe,
      mc: U,
      pc: Te,
      pbc: De,
      n: Cn,
      o: e,
    };
  let oo, Rt;
  return (
    t && ([oo, Rt] = t(St)), { render: Lo, hydrate: oo, createApp: Om(Lo, oo) }
  );
}
function Fn({ effect: e, update: t }, o) {
  e.allowRecurse = t.allowRecurse = o;
}
function ef(e, t, o = !1) {
  const i = e.children,
    l = t.children;
  if (ue(i) && ue(l))
    for (let c = 0; c < i.length; c++) {
      const f = i[c];
      let d = l[c];
      d.shapeFlag & 1 &&
        !d.dynamicChildren &&
        ((d.patchFlag <= 0 || d.patchFlag === 32) &&
          ((d = l[c] = yn(l[c])), (d.el = f.el)),
        o || ef(f, d));
    }
}
function Tm(e) {
  const t = e.slice(),
    o = [0];
  let i, l, c, f, d;
  const v = e.length;
  for (i = 0; i < v; i++) {
    const b = e[i];
    if (b !== 0) {
      if (((l = o[o.length - 1]), e[l] < b)) {
        (t[i] = l), o.push(i);
        continue;
      }
      for (c = 0, f = o.length - 1; c < f; )
        (d = (c + f) >> 1), e[o[d]] < b ? (c = d + 1) : (f = d);
      b < e[o[c]] && (c > 0 && (t[i] = o[c - 1]), (o[c] = i));
    }
  }
  for (c = o.length, f = o[c - 1]; c-- > 0; ) (o[c] = f), (f = t[f]);
  return o;
}
const $m = (e) => e.__isTeleport,
  qe = Symbol(void 0),
  Ua = Symbol(void 0),
  On = Symbol(void 0),
  Bs = Symbol(void 0),
  dr = [];
let Mt = null;
function G(e = !1) {
  dr.push((Mt = e ? null : []));
}
function Cm() {
  dr.pop(), (Mt = dr[dr.length - 1] || null);
}
let Pr = 1;
function gc(e) {
  Pr += e;
}
function tf(e) {
  return (
    (e.dynamicChildren = Pr > 0 ? Mt || go : null),
    Cm(),
    Pr > 0 && Mt && Mt.push(e),
    e
  );
}
function Z(e, t, o, i, l, c) {
  return tf(D(e, t, o, i, l, c, !0));
}
function to(e, t, o, i, l) {
  return tf(Ue(e, t, o, i, l, !0));
}
function Si(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const qi = "__vInternal",
  nf = ({ key: e }) => (e != null ? e : null),
  mi = ({ ref: e, ref_key: t, ref_for: o }) =>
    e != null
      ? We(e) || Be(e) || he(e)
        ? { i: tt, r: e, k: t, f: !!o }
        : e
      : null;
function D(
  e,
  t = null,
  o = null,
  i = 0,
  l = null,
  c = e === qe ? 0 : 1,
  f = !1,
  d = !1
) {
  const v = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && nf(t),
    ref: t && mi(t),
    scopeId: Wi,
    slotScopeIds: null,
    children: o,
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
    shapeFlag: c,
    patchFlag: i,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    d
      ? (Wa(v, o), c & 128 && e.normalize(v))
      : o && (v.shapeFlag |= We(o) ? 8 : 16),
    Pr > 0 &&
      !f &&
      Mt &&
      (v.patchFlag > 0 || c & 6) &&
      v.patchFlag !== 32 &&
      Mt.push(v),
    v
  );
}
const Ue = Mm;
function Mm(e, t = null, o = null, i = 0, l = null, c = !1) {
  if (((!e || e === Vu) && (e = On), Si(e))) {
    const d = So(e, t, !0);
    return (
      o && Wa(d, o),
      Pr > 0 &&
        !c &&
        Mt &&
        (d.shapeFlag & 6 ? (Mt[Mt.indexOf(e)] = d) : Mt.push(d)),
      (d.patchFlag |= -2),
      d
    );
  }
  if ((Fm(e) && (e = e.__vccOpts), t)) {
    t = of(t);
    let { class: d, style: v } = t;
    d && !We(d) && (t.class = on(d)),
      Ie(v) && (Cu(v) && !ue(v) && (v = ut({}, v)), (t.style = Pt(v)));
  }
  const f = We(e) ? 1 : Yh(e) ? 128 : $m(e) ? 64 : Ie(e) ? 4 : he(e) ? 2 : 0;
  return D(e, t, o, i, l, f, c, !0);
}
function of(e) {
  return e ? (Cu(e) || qi in e ? ut({}, e) : e) : null;
}
function So(e, t, o = !1) {
  const { props: i, ref: l, patchFlag: c, children: f } = e,
    d = t ? rf(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && nf(d),
    ref:
      t && t.ref
        ? o && l
          ? ue(l)
            ? l.concat(mi(t))
            : [l, mi(t)]
          : mi(t)
        : l,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: f,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== qe ? (c === -1 ? 16 : c | 16) : c,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && So(e.ssContent),
    ssFallback: e.ssFallback && So(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Am(e = " ", t = 0) {
  return Ue(Ua, null, e, t);
}
function Qe(e = "", t = !1) {
  return t ? (G(), to(On, null, e)) : Ue(On, null, e);
}
function Ft(e) {
  return e == null || typeof e == "boolean"
    ? Ue(On)
    : ue(e)
    ? Ue(qe, null, e.slice())
    : typeof e == "object"
    ? yn(e)
    : Ue(Ua, null, String(e));
}
function yn(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : So(e);
}
function Wa(e, t) {
  let o = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (ue(t)) o = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const l = t.default;
      l && (l._c && (l._d = !1), Wa(e, l()), l._c && (l._d = !0));
      return;
    } else {
      o = 32;
      const l = t._;
      !l && !(qi in t)
        ? (t._ctx = tt)
        : l === 3 &&
          tt &&
          (tt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    he(t)
      ? ((t = { default: t, _ctx: tt }), (o = 32))
      : ((t = String(t)), i & 64 ? ((o = 16), (t = [Am(t)])) : (o = 8));
  (e.children = t), (e.shapeFlag |= o);
}
function rf(...e) {
  const t = {};
  for (let o = 0; o < e.length; o++) {
    const i = e[o];
    for (const l in i)
      if (l === "class")
        t.class !== i.class && (t.class = on([t.class, i.class]));
      else if (l === "style") t.style = Pt([t.style, i.style]);
      else if (Di(l)) {
        const c = t[l],
          f = i[l];
        f &&
          c !== f &&
          !(ue(c) && c.includes(f)) &&
          (t[l] = c ? [].concat(c, f) : f);
      } else l !== "" && (t[l] = i[l]);
  }
  return t;
}
function zt(e, t, o, i = null) {
  kt(e, t, 7, [o, i]);
}
const km = Zu();
let jm = 0;
function Rm(e, t, o) {
  const i = e.type,
    l = (t ? t.appContext : e.appContext) || km,
    c = {
      uid: jm++,
      vnode: e,
      type: i,
      parent: t,
      appContext: l,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new gu(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(l.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Yu(i, l),
      emitsOptions: Nu(i, l),
      emit: null,
      emitted: null,
      propsDefaults: Ae,
      inheritAttrs: i.inheritAttrs,
      ctx: Ae,
      data: Ae,
      props: Ae,
      attrs: Ae,
      slots: Ae,
      refs: Ae,
      setupState: Ae,
      setupContext: null,
      suspense: o,
      suspenseId: o ? o.pendingId : 0,
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
      sp: null,
    };
  return (
    (c.ctx = { _: c }),
    (c.root = t ? t.root : c),
    (c.emit = Bh.bind(null, c)),
    e.ce && e.ce(c),
    c
  );
}
let Xe = null;
const sf = () => Xe || tt,
  To = (e) => {
    (Xe = e), e.scope.on();
  },
  Yn = () => {
    Xe && Xe.scope.off(), (Xe = null);
  };
function af(e) {
  return e.vnode.shapeFlag & 4;
}
let Or = !1;
function Im(e, t = !1) {
  Or = t;
  const { props: o, children: i } = e.vnode,
    l = af(e);
  ym(e, o, l, t), _m(e, i);
  const c = l ? Dm(e, t) : void 0;
  return (Or = !1), c;
}
function Dm(e, t) {
  const o = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Po(new Proxy(e.ctx, dm)));
  const { setup: i } = o;
  if (i) {
    const l = (e.setupContext = i.length > 1 ? Lm(e) : null);
    To(e), jo();
    const c = xn(i, e, 0, [e.props, l]);
    if ((Ro(), Yn(), pu(c))) {
      if ((c.then(Yn, Yn), t))
        return c
          .then((f) => {
            vc(e, f, t);
          })
          .catch((f) => {
            Hi(f, e, 0);
          });
      e.asyncDep = c;
    } else vc(e, c, t);
  } else lf(e, t);
}
function vc(e, t, o) {
  he(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Ie(t) && (e.setupState = ju(t)),
    lf(e, o);
}
let yc;
function lf(e, t, o) {
  const i = e.type;
  if (!e.render) {
    if (!t && yc && !i.render) {
      const l = i.template || Ba(e).template;
      if (l) {
        const { isCustomElement: c, compilerOptions: f } = e.appContext.config,
          { delimiters: d, compilerOptions: v } = i,
          b = ut(ut({ isCustomElement: c, delimiters: d }, f), v);
        i.render = yc(l, b);
      }
    }
    e.render = i.render || At;
  }
  To(e), jo(), pm(e), Ro(), Yn();
}
function zm(e) {
  return new Proxy(e.attrs, {
    get(t, o) {
      return wt(e, "get", "$attrs"), t[o];
    },
  });
}
function Lm(e) {
  const t = (i) => {
    e.exposed = i || {};
  };
  let o;
  return {
    get attrs() {
      return o || (o = zm(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Ki(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ju(Po(e.exposed)), {
        get(t, o) {
          if (o in t) return t[o];
          if (o in Oi) return Oi[o](e);
        },
      }))
    );
}
function Nm(e, t = !0) {
  return he(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Fm(e) {
  return he(e) && "__vccOpts" in e;
}
const Va = (e, t) => Ih(e, t, Or);
function Bm(e, t, o) {
  const i = arguments.length;
  return i === 2
    ? Ie(t) && !ue(t)
      ? Si(t)
        ? Ue(e, null, [t])
        : Ue(e, t)
      : Ue(e, null, t)
    : (i > 3
        ? (o = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Si(o) && (o = [o]),
      Ue(e, t, o));
}
const Hm = "3.2.41",
  Um = "http://www.w3.org/2000/svg",
  Vn = typeof document < "u" ? document : null,
  bc = Vn && Vn.createElement("template"),
  Wm = {
    insert: (e, t, o) => {
      t.insertBefore(e, o || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, o, i) => {
      const l = t
        ? Vn.createElementNS(Um, e)
        : Vn.createElement(e, o ? { is: o } : void 0);
      return (
        e === "select" &&
          i &&
          i.multiple != null &&
          l.setAttribute("multiple", i.multiple),
        l
      );
    },
    createText: (e) => Vn.createTextNode(e),
    createComment: (e) => Vn.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Vn.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, o, i, l, c) {
      const f = o ? o.previousSibling : t.lastChild;
      if (l && (l === c || l.nextSibling))
        for (
          ;
          t.insertBefore(l.cloneNode(!0), o),
            !(l === c || !(l = l.nextSibling));

        );
      else {
        bc.innerHTML = i ? `<svg>${e}</svg>` : e;
        const d = bc.content;
        if (i) {
          const v = d.firstChild;
          for (; v.firstChild; ) d.appendChild(v.firstChild);
          d.removeChild(v);
        }
        t.insertBefore(d, o);
      }
      return [
        f ? f.nextSibling : t.firstChild,
        o ? o.previousSibling : t.lastChild,
      ];
    },
  };
function Vm(e, t, o) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : o
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function qm(e, t, o) {
  const i = e.style,
    l = We(o);
  if (o && !l) {
    for (const c in o) aa(i, c, o[c]);
    if (t && !We(t)) for (const c in t) o[c] == null && aa(i, c, "");
  } else {
    const c = i.display;
    l ? t !== o && (i.cssText = o) : t && e.removeAttribute("style"),
      "_vod" in e && (i.display = c);
  }
}
const wc = /\s*!important$/;
function aa(e, t, o) {
  if (ue(o)) o.forEach((i) => aa(e, t, i));
  else if ((o == null && (o = ""), t.startsWith("--"))) e.setProperty(t, o);
  else {
    const i = Km(e, t);
    wc.test(o)
      ? e.setProperty(eo(i), o.replace(wc, ""), "important")
      : (e[i] = o);
  }
}
const _c = ["Webkit", "Moz", "ms"],
  Hs = {};
function Km(e, t) {
  const o = Hs[t];
  if (o) return o;
  let i = Ut(t);
  if (i !== "filter" && i in e) return (Hs[t] = i);
  i = Ni(i);
  for (let l = 0; l < _c.length; l++) {
    const c = _c[l] + i;
    if (c in e) return (Hs[t] = c);
  }
  return t;
}
const xc = "http://www.w3.org/1999/xlink";
function Xm(e, t, o, i, l) {
  if (i && t.startsWith("xlink:"))
    o == null
      ? e.removeAttributeNS(xc, t.slice(6, t.length))
      : e.setAttributeNS(xc, t, o);
  else {
    const c = Hp(t);
    o == null || (c && !fu(o))
      ? e.removeAttribute(t)
      : e.setAttribute(t, c ? "" : o);
  }
}
function Ym(e, t, o, i, l, c, f) {
  if (t === "innerHTML" || t === "textContent") {
    i && f(i, l, c), (e[t] = o == null ? "" : o);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = o;
    const v = o == null ? "" : o;
    (e.value !== v || e.tagName === "OPTION") && (e.value = v),
      o == null && e.removeAttribute(t);
    return;
  }
  let d = !1;
  if (o === "" || o == null) {
    const v = typeof e[t];
    v === "boolean"
      ? (o = fu(o))
      : o == null && v === "string"
      ? ((o = ""), (d = !0))
      : v === "number" && ((o = 0), (d = !0));
  }
  try {
    e[t] = o;
  } catch {}
  d && e.removeAttribute(t);
}
function qn(e, t, o, i) {
  e.addEventListener(t, o, i);
}
function Jm(e, t, o, i) {
  e.removeEventListener(t, o, i);
}
function Gm(e, t, o, i, l = null) {
  const c = e._vei || (e._vei = {}),
    f = c[t];
  if (i && f) f.value = i;
  else {
    const [d, v] = Qm(t);
    if (i) {
      const b = (c[t] = tg(i, l));
      qn(e, d, b, v);
    } else f && (Jm(e, d, f, v), (c[t] = void 0));
  }
}
const Pc = /(?:Once|Passive|Capture)$/;
function Qm(e) {
  let t;
  if (Pc.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Pc)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : eo(e.slice(2)), t];
}
let Us = 0;
const Zm = Promise.resolve(),
  eg = () => Us || (Zm.then(() => (Us = 0)), (Us = Date.now()));
function tg(e, t) {
  const o = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= o.attached) return;
    kt(ng(i, o.value), t, 5, [i]);
  };
  return (o.value = e), (o.attached = eg()), o;
}
function ng(e, t) {
  if (ue(t)) {
    const o = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        o.call(e), (e._stopped = !0);
      }),
      t.map((i) => (l) => !l._stopped && i && i(l))
    );
  } else return t;
}
const Oc = /^on[a-z]/,
  og = (e, t, o, i, l = !1, c, f, d, v) => {
    t === "class"
      ? Vm(e, i, l)
      : t === "style"
      ? qm(e, o, i)
      : Di(t)
      ? Ea(t) || Gm(e, t, o, i, f)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : rg(e, t, i, l)
        )
      ? Ym(e, t, i, c, f, d, v)
      : (t === "true-value"
          ? (e._trueValue = i)
          : t === "false-value" && (e._falseValue = i),
        Xm(e, t, i, l));
  };
function rg(e, t, o, i) {
  return i
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Oc.test(t) && he(o))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Oc.test(t) && We(o))
    ? !1
    : t in e;
}
const Ti = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ue(t) ? (o) => pi(t, o) : t;
};
function ig(e) {
  e.target.composing = !0;
}
function Ec(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const $i = {
    created(e, { modifiers: { lazy: t, trim: o, number: i } }, l) {
      e._assign = Ti(l);
      const c = i || (l.props && l.props.type === "number");
      qn(e, t ? "change" : "input", (f) => {
        if (f.target.composing) return;
        let d = e.value;
        o && (d = d.trim()), c && (d = wi(d)), e._assign(d);
      }),
        o &&
          qn(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (qn(e, "compositionstart", ig),
          qn(e, "compositionend", Ec),
          qn(e, "change", Ec));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: o, trim: i, number: l } },
      c
    ) {
      if (
        ((e._assign = Ti(c)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (o ||
              (i && e.value.trim() === t) ||
              ((l || e.type === "number") && wi(e.value) === t))))
      )
        return;
      const f = t == null ? "" : t;
      e.value !== f && (e.value = f);
    },
  },
  Sc = {
    deep: !0,
    created(e, { value: t, modifiers: { number: o } }, i) {
      const l = zi(t);
      qn(e, "change", () => {
        const c = Array.prototype.filter
          .call(e.options, (f) => f.selected)
          .map((f) => (o ? wi(Ci(f)) : Ci(f)));
        e._assign(e.multiple ? (l ? new Set(c) : c) : c[0]);
      }),
        (e._assign = Ti(i));
    },
    mounted(e, { value: t }) {
      Tc(e, t);
    },
    beforeUpdate(e, t, o) {
      e._assign = Ti(o);
    },
    updated(e, { value: t }) {
      Tc(e, t);
    },
  };
function Tc(e, t) {
  const o = e.multiple;
  if (!(o && !ue(t) && !zi(t))) {
    for (let i = 0, l = e.options.length; i < l; i++) {
      const c = e.options[i],
        f = Ci(c);
      if (o) ue(t) ? (c.selected = Xp(t, f) > -1) : (c.selected = t.has(f));
      else if (Ii(Ci(c), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !o && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ci(e) {
  return "_value" in e ? e._value : e.value;
}
const sg = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  cf = (e, t) => (o) => {
    if (!("key" in o)) return;
    const i = eo(o.key);
    if (t.some((l) => l === i || sg[l] === i)) return e(o);
  },
  $c = {
    beforeMount(e, { value: t }, { transition: o }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        o && t ? o.beforeEnter(e) : ir(e, t);
    },
    mounted(e, { value: t }, { transition: o }) {
      o && t && o.enter(e);
    },
    updated(e, { value: t, oldValue: o }, { transition: i }) {
      !t != !o &&
        (i
          ? t
            ? (i.beforeEnter(e), ir(e, !0), i.enter(e))
            : i.leave(e, () => {
                ir(e, !1);
              })
          : ir(e, t));
    },
    beforeUnmount(e, { value: t }) {
      ir(e, t);
    },
  };
function ir(e, t) {
  e.style.display = t ? e._vod : "none";
}
const ag = ut({ patchProp: og }, Wm);
let Cc;
function lg() {
  return Cc || (Cc = Em(ag));
}
const uf = (...e) => {
  const t = lg().createApp(...e),
    { mount: o } = t;
  return (
    (t.mount = (i) => {
      const l = cg(i);
      if (!l) return;
      const c = t._component;
      !he(c) && !c.render && !c.template && (c.template = l.innerHTML),
        (l.innerHTML = "");
      const f = o(l, !1, l instanceof SVGElement);
      return (
        l instanceof Element &&
          (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")),
        f
      );
    }),
    t
  );
};
function cg(e) {
  return We(e) ? document.querySelector(e) : e;
}
var ug = !1;
/*!
 * pinia v2.0.23
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ let ff;
const Xi = (e) => (ff = e),
  df = Symbol();
function la(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var pr;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(pr || (pr = {}));
function fg() {
  const e = vu(!0),
    t = e.run(() => Ht({}));
  let o = [],
    i = [];
  const l = Po({
    install(c) {
      Xi(l),
        (l._a = c),
        c.provide(df, l),
        (c.config.globalProperties.$pinia = l),
        i.forEach((f) => o.push(f)),
        (i = []);
    },
    use(c) {
      return !this._a && !ug ? i.push(c) : o.push(c), this;
    },
    _p: o,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return l;
}
const pf = () => {};
function Mc(e, t, o, i = pf) {
  e.push(t);
  const l = () => {
    const c = e.indexOf(t);
    c > -1 && (e.splice(c, 1), i());
  };
  return !o && sf() && La(l), l;
}
function ho(e, ...t) {
  e.slice().forEach((o) => {
    o(...t);
  });
}
function ca(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((o, i) => e.set(i, o)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const o in t) {
    if (!t.hasOwnProperty(o)) continue;
    const i = t[o],
      l = e[o];
    la(l) && la(i) && e.hasOwnProperty(o) && !Be(i) && !_n(i)
      ? (e[o] = ca(l, i))
      : (e[o] = i);
  }
  return e;
}
const dg = Symbol();
function pg(e) {
  return !la(e) || !e.hasOwnProperty(dg);
}
const { assign: bn } = Object;
function hg(e) {
  return !!(Be(e) && e.effect);
}
function mg(e, t, o, i) {
  const { state: l, actions: c, getters: f } = t,
    d = o.state.value[e];
  let v;
  function b() {
    d || (o.state.value[e] = l ? l() : {});
    const P = Ah(o.state.value[e]);
    return bn(
      P,
      c,
      Object.keys(f || {}).reduce(
        (E, T) => (
          (E[T] = Po(
            Va(() => {
              Xi(o);
              const M = o._s.get(e);
              return f[T].call(M, M);
            })
          )),
          E
        ),
        {}
      )
    );
  }
  return (
    (v = hf(e, b, t, o, i, !0)),
    (v.$reset = function () {
      const E = l ? l() : {};
      this.$patch((T) => {
        bn(T, E);
      });
    }),
    v
  );
}
function hf(e, t, o = {}, i, l, c) {
  let f;
  const d = bn({ actions: {} }, o),
    v = { deep: !0 };
  let b,
    P,
    E = Po([]),
    T = Po([]),
    M;
  const k = i.state.value[e];
  !c && !k && (i.state.value[e] = {}), Ht({});
  let N;
  function Y(me) {
    let U;
    (b = P = !1),
      typeof me == "function"
        ? (me(i.state.value[e]),
          (U = { type: pr.patchFunction, storeId: e, events: M }))
        : (ca(i.state.value[e], me),
          (U = { type: pr.patchObject, payload: me, storeId: e, events: M }));
    const $e = (N = Symbol());
    Da().then(() => {
      N === $e && (b = !0);
    }),
      (P = !0),
      ho(E, U, i.state.value[e]);
  }
  const L = pf;
  function ee() {
    f.stop(), (E = []), (T = []), i._s.delete(e);
  }
  function se(me, U) {
    return function () {
      Xi(i);
      const $e = Array.from(arguments),
        De = [],
        He = [];
      function nt(J) {
        De.push(J);
      }
      function ot(J) {
        He.push(J);
      }
      ho(T, { args: $e, name: me, store: ce, after: nt, onError: ot });
      let Fe;
      try {
        Fe = U.apply(this && this.$id === e ? this : ce, $e);
      } catch (J) {
        throw (ho(He, J), J);
      }
      return Fe instanceof Promise
        ? Fe.then((J) => (ho(De, J), J)).catch(
            (J) => (ho(He, J), Promise.reject(J))
          )
        : (ho(De, Fe), Fe);
    };
  }
  const oe = {
      _p: i,
      $id: e,
      $onAction: Mc.bind(null, T),
      $patch: Y,
      $reset: L,
      $subscribe(me, U = {}) {
        const $e = Mc(E, me, U.detached, () => De()),
          De = f.run(() =>
            bo(
              () => i.state.value[e],
              (He) => {
                (U.flush === "sync" ? P : b) &&
                  me({ storeId: e, type: pr.direct, events: M }, He);
              },
              bn({}, v, U)
            )
          );
        return $e;
      },
      $dispose: ee,
    },
    ce = Bi(oe);
  i._s.set(e, ce);
  const we = i._e.run(() => ((f = vu()), f.run(() => t())));
  for (const me in we) {
    const U = we[me];
    if ((Be(U) && !hg(U)) || _n(U))
      c ||
        (k && pg(U) && (Be(U) ? (U.value = k[me]) : ca(U, k[me])),
        (i.state.value[e][me] = U));
    else if (typeof U == "function") {
      const $e = se(me, U);
      (we[me] = $e), (d.actions[me] = U);
    }
  }
  return (
    bn(ce, we),
    bn(Se(ce), we),
    Object.defineProperty(ce, "$state", {
      get: () => i.state.value[e],
      set: (me) => {
        Y((U) => {
          bn(U, me);
        });
      },
    }),
    i._p.forEach((me) => {
      bn(
        ce,
        f.run(() => me({ store: ce, app: i._a, pinia: i, options: d }))
      );
    }),
    k && c && o.hydrate && o.hydrate(ce.$state, k),
    (b = !0),
    (P = !0),
    ce
  );
}
function gg(e, t, o) {
  let i, l;
  const c = typeof t == "function";
  typeof e == "string" ? ((i = e), (l = c ? o : t)) : ((l = e), (i = e.id));
  function f(d, v) {
    const b = sf();
    return (
      (d = d || (b && hi(df))),
      d && Xi(d),
      (d = ff),
      d._s.has(i) || (c ? hf(i, t, l, d) : mg(i, l, d)),
      d._s.get(i)
    );
  }
  return (f.$id = i), f;
}
function vg(e) {
  return {
    all: (e = e || new Map()),
    on: function (t, o) {
      var i = e.get(t);
      i ? i.push(o) : e.set(t, [o]);
    },
    off: function (t, o) {
      var i = e.get(t);
      i && (o ? i.splice(i.indexOf(o) >>> 0, 1) : e.set(t, []));
    },
    emit: function (t, o) {
      var i = e.get(t);
      i &&
        i.slice().map(function (l) {
          l(o);
        }),
        (i = e.get("*")) &&
          i.slice().map(function (l) {
            l(t, o);
          });
    },
  };
}
const ht = () => GetParentResourceName();
var Ac;
const yg = typeof window < "u",
  bg = (e) => typeof e == "string";
yg &&
  ((Ac = window == null ? void 0 : window.navigator) == null
    ? void 0
    : Ac.userAgent) &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);
function sr(e) {
  return typeof e == "function" ? e() : $(e);
}
function kc(e, t = !1, o = "Timeout") {
  return new Promise((i, l) => {
    setTimeout(t ? () => l(o) : i, e);
  });
}
function ua(e, t = !1) {
  function o(
    E,
    { flush: T = "sync", deep: M = !1, timeout: k, throwOnTimeout: N } = {}
  ) {
    let Y = null;
    const ee = [
      new Promise((se) => {
        Y = bo(
          e,
          (oe) => {
            E(oe) !== t && (Y == null || Y(), se(oe));
          },
          { flush: T, deep: M, immediate: !0 }
        );
      }),
    ];
    return (
      k != null &&
        ee.push(
          kc(k, N)
            .then(() => sr(e))
            .finally(() => (Y == null ? void 0 : Y()))
        ),
      Promise.race(ee)
    );
  }
  function i(E, T) {
    if (!Be(E)) return o((oe) => oe === E, T);
    const {
      flush: M = "sync",
      deep: k = !1,
      timeout: N,
      throwOnTimeout: Y,
    } = T != null ? T : {};
    let L = null;
    const se = [
      new Promise((oe) => {
        L = bo(
          [e, E],
          ([ce, we]) => {
            t !== (ce === we) && (L == null || L(), oe(ce));
          },
          { flush: M, deep: k, immediate: !0 }
        );
      }),
    ];
    return (
      N != null &&
        se.push(
          kc(N, Y)
            .then(() => sr(e))
            .finally(() => (L == null || L(), sr(e)))
        ),
      Promise.race(se)
    );
  }
  function l(E) {
    return o((T) => Boolean(T), E);
  }
  function c(E) {
    return i(null, E);
  }
  function f(E) {
    return i(void 0, E);
  }
  function d(E) {
    return o(Number.isNaN, E);
  }
  function v(E, T) {
    return o((M) => {
      const k = Array.from(M);
      return k.includes(E) || k.includes(sr(E));
    }, T);
  }
  function b(E) {
    return P(1, E);
  }
  function P(E = 1, T) {
    let M = -1;
    return o(() => ((M += 1), M >= E), T);
  }
  return Array.isArray(sr(e))
    ? {
        toMatch: o,
        toContains: v,
        changed: b,
        changedTimes: P,
        get not() {
          return ua(e, !t);
        },
      }
    : {
        toMatch: o,
        toBe: i,
        toBeTruthy: l,
        toBeNull: c,
        toBeNaN: d,
        toBeUndefined: f,
        changed: b,
        changedTimes: P,
        get not() {
          return ua(e, !t);
        },
      };
}
function wg(e) {
  return ua(e);
}
function mf(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: gf } = Object.prototype,
  { getPrototypeOf: qa } = Object,
  Ka = ((e) => (t) => {
    const o = gf.call(t);
    return e[o] || (e[o] = o.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  sn = (e) => ((e = e.toLowerCase()), (t) => Ka(t) === e),
  Yi = (e) => (t) => typeof t === e,
  { isArray: $r } = Array,
  fa = Yi("undefined");
function _g(e) {
  return (
    e !== null &&
    !fa(e) &&
    e.constructor !== null &&
    !fa(e.constructor) &&
    Io(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const vf = sn("ArrayBuffer");
function xg(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && vf(e.buffer)),
    t
  );
}
const Pg = Yi("string"),
  Io = Yi("function"),
  yf = Yi("number"),
  bf = (e) => e !== null && typeof e == "object",
  Og = (e) => e === !0 || e === !1,
  gi = (e) => {
    if (Ka(e) !== "object") return !1;
    const t = qa(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  Eg = sn("Date"),
  Sg = sn("File"),
  Tg = sn("Blob"),
  $g = sn("FileList"),
  Cg = (e) => bf(e) && Io(e.pipe),
  Mg = (e) => {
    const t = "[object FormData]";
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        gf.call(e) === t ||
        (Io(e.toString) && e.toString() === t))
    );
  },
  Ag = sn("URLSearchParams"),
  kg = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ji(e, t, { allOwnKeys: o = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let i, l;
  if ((typeof e != "object" && (e = [e]), $r(e)))
    for (i = 0, l = e.length; i < l; i++) t.call(null, e[i], i, e);
  else {
    const c = o ? Object.getOwnPropertyNames(e) : Object.keys(e),
      f = c.length;
    let d;
    for (i = 0; i < f; i++) (d = c[i]), t.call(null, e[d], d, e);
  }
}
function da() {
  const e = {},
    t = (o, i) => {
      gi(e[i]) && gi(o)
        ? (e[i] = da(e[i], o))
        : gi(o)
        ? (e[i] = da({}, o))
        : $r(o)
        ? (e[i] = o.slice())
        : (e[i] = o);
    };
  for (let o = 0, i = arguments.length; o < i; o++)
    arguments[o] && Ji(arguments[o], t);
  return e;
}
const jg = (e, t, o, { allOwnKeys: i } = {}) => (
    Ji(
      t,
      (l, c) => {
        o && Io(l) ? (e[c] = mf(l, o)) : (e[c] = l);
      },
      { allOwnKeys: i }
    ),
    e
  ),
  Rg = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Ig = (e, t, o, i) => {
    (e.prototype = Object.create(t.prototype, i)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      o && Object.assign(e.prototype, o);
  },
  Dg = (e, t, o, i) => {
    let l, c, f;
    const d = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), c = l.length; c-- > 0; )
        (f = l[c]), (!i || i(f, e, t)) && !d[f] && ((t[f] = e[f]), (d[f] = !0));
      e = o !== !1 && qa(e);
    } while (e && (!o || o(e, t)) && e !== Object.prototype);
    return t;
  },
  zg = (e, t, o) => {
    (e = String(e)),
      (o === void 0 || o > e.length) && (o = e.length),
      (o -= t.length);
    const i = e.indexOf(t, o);
    return i !== -1 && i === o;
  },
  Lg = (e) => {
    if (!e) return null;
    if ($r(e)) return e;
    let t = e.length;
    if (!yf(t)) return null;
    const o = new Array(t);
    for (; t-- > 0; ) o[t] = e[t];
    return o;
  },
  Ng = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && qa(Uint8Array)),
  Fg = (e, t) => {
    const i = (e && e[Symbol.iterator]).call(e);
    let l;
    for (; (l = i.next()) && !l.done; ) {
      const c = l.value;
      t.call(e, c[0], c[1]);
    }
  },
  Bg = (e, t) => {
    let o;
    const i = [];
    for (; (o = e.exec(t)) !== null; ) i.push(o);
    return i;
  },
  Hg = sn("HTMLFormElement"),
  Ug = (e) =>
    e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function (o, i, l) {
      return i.toUpperCase() + l;
    }),
  jc = (
    ({ hasOwnProperty: e }) =>
    (t, o) =>
      e.call(t, o)
  )(Object.prototype),
  Wg = sn("RegExp"),
  wf = (e, t) => {
    const o = Object.getOwnPropertyDescriptors(e),
      i = {};
    Ji(o, (l, c) => {
      t(l, c, e) !== !1 && (i[c] = l);
    }),
      Object.defineProperties(e, i);
  },
  Vg = (e) => {
    wf(e, (t, o) => {
      const i = e[o];
      if (!!Io(i)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not read-only method '" + o + "'");
          });
      }
    });
  },
  qg = (e, t) => {
    const o = {},
      i = (l) => {
        l.forEach((c) => {
          o[c] = !0;
        });
      };
    return $r(e) ? i(e) : i(String(e).split(t)), o;
  },
  Kg = () => {},
  Xg = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  I = {
    isArray: $r,
    isArrayBuffer: vf,
    isBuffer: _g,
    isFormData: Mg,
    isArrayBufferView: xg,
    isString: Pg,
    isNumber: yf,
    isBoolean: Og,
    isObject: bf,
    isPlainObject: gi,
    isUndefined: fa,
    isDate: Eg,
    isFile: Sg,
    isBlob: Tg,
    isRegExp: Wg,
    isFunction: Io,
    isStream: Cg,
    isURLSearchParams: Ag,
    isTypedArray: Ng,
    isFileList: $g,
    forEach: Ji,
    merge: da,
    extend: jg,
    trim: kg,
    stripBOM: Rg,
    inherits: Ig,
    toFlatObject: Dg,
    kindOf: Ka,
    kindOfTest: sn,
    endsWith: zg,
    toArray: Lg,
    forEachEntry: Fg,
    matchAll: Bg,
    isHTMLForm: Hg,
    hasOwnProperty: jc,
    hasOwnProp: jc,
    reduceDescriptors: wf,
    freezeMethods: Vg,
    toObjectSet: qg,
    toCamelCase: Ug,
    noop: Kg,
    toFiniteNumber: Xg,
  };
function xe(e, t, o, i, l) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    o && (this.config = o),
    i && (this.request = i),
    l && (this.response = l);
}
I.inherits(xe, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const _f = xe.prototype,
  xf = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  xf[e] = { value: e };
});
Object.defineProperties(xe, xf);
Object.defineProperty(_f, "isAxiosError", { value: !0 });
xe.from = (e, t, o, i, l, c) => {
  const f = Object.create(_f);
  return (
    I.toFlatObject(
      e,
      f,
      function (v) {
        return v !== Error.prototype;
      },
      (d) => d !== "isAxiosError"
    ),
    xe.call(f, e.message, t, o, i, l),
    (f.cause = e),
    (f.name = e.name),
    c && Object.assign(f, c),
    f
  );
};
function Yg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Jg = typeof self == "object" ? self.FormData : window.FormData;
function pa(e) {
  return I.isPlainObject(e) || I.isArray(e);
}
function Pf(e) {
  return I.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Rc(e, t, o) {
  return e
    ? e
        .concat(t)
        .map(function (l, c) {
          return (l = Pf(l)), !o && c ? "[" + l + "]" : l;
        })
        .join(o ? "." : "")
    : t;
}
function Gg(e) {
  return I.isArray(e) && !e.some(pa);
}
const Qg = I.toFlatObject(I, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Zg(e) {
  return (
    e &&
    I.isFunction(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
function Gi(e, t, o) {
  if (!I.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new (Jg || FormData)()),
    (o = I.toFlatObject(
      o,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (N, Y) {
        return !I.isUndefined(Y[N]);
      }
    ));
  const i = o.metaTokens,
    l = o.visitor || P,
    c = o.dots,
    f = o.indexes,
    v = (o.Blob || (typeof Blob < "u" && Blob)) && Zg(t);
  if (!I.isFunction(l)) throw new TypeError("visitor must be a function");
  function b(k) {
    if (k === null) return "";
    if (I.isDate(k)) return k.toISOString();
    if (!v && I.isBlob(k))
      throw new xe("Blob is not supported. Use a Buffer instead.");
    return I.isArrayBuffer(k) || I.isTypedArray(k)
      ? v && typeof Blob == "function"
        ? new Blob([k])
        : Buffer.from(k)
      : k;
  }
  function P(k, N, Y) {
    let L = k;
    if (k && !Y && typeof k == "object") {
      if (I.endsWith(N, "{}"))
        (N = i ? N : N.slice(0, -2)), (k = JSON.stringify(k));
      else if (
        (I.isArray(k) && Gg(k)) ||
        I.isFileList(k) ||
        (I.endsWith(N, "[]") && (L = I.toArray(k)))
      )
        return (
          (N = Pf(N)),
          L.forEach(function (se, oe) {
            !(I.isUndefined(se) || se === null) &&
              t.append(
                f === !0 ? Rc([N], oe, c) : f === null ? N : N + "[]",
                b(se)
              );
          }),
          !1
        );
    }
    return pa(k) ? !0 : (t.append(Rc(Y, N, c), b(k)), !1);
  }
  const E = [],
    T = Object.assign(Qg, {
      defaultVisitor: P,
      convertValue: b,
      isVisitable: pa,
    });
  function M(k, N) {
    if (!I.isUndefined(k)) {
      if (E.indexOf(k) !== -1)
        throw Error("Circular reference detected in " + N.join("."));
      E.push(k),
        I.forEach(k, function (L, ee) {
          (!(I.isUndefined(L) || L === null) &&
            l.call(t, L, I.isString(ee) ? ee.trim() : ee, N, T)) === !0 &&
            M(L, N ? N.concat(ee) : [ee]);
        }),
        E.pop();
    }
  }
  if (!I.isObject(e)) throw new TypeError("data must be an object");
  return M(e), t;
}
function Ic(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (i) {
    return t[i];
  });
}
function Xa(e, t) {
  (this._pairs = []), e && Gi(e, this, t);
}
const Of = Xa.prototype;
Of.append = function (t, o) {
  this._pairs.push([t, o]);
};
Of.toString = function (t) {
  const o = t
    ? function (i) {
        return t.call(this, i, Ic);
      }
    : Ic;
  return this._pairs
    .map(function (l) {
      return o(l[0]) + "=" + o(l[1]);
    }, "")
    .join("&");
};
function ev(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Ef(e, t, o) {
  if (!t) return e;
  const i = (o && o.encode) || ev,
    l = o && o.serialize;
  let c;
  if (
    (l
      ? (c = l(t, o))
      : (c = I.isURLSearchParams(t) ? t.toString() : new Xa(t, o).toString(i)),
    c)
  ) {
    const f = e.indexOf("#");
    f !== -1 && (e = e.slice(0, f)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + c);
  }
  return e;
}
class Dc {
  constructor() {
    this.handlers = [];
  }
  use(t, o, i) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: o,
        synchronous: i ? i.synchronous : !1,
        runWhen: i ? i.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    I.forEach(this.handlers, function (i) {
      i !== null && t(i);
    });
  }
}
const Sf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  tv = typeof URLSearchParams < "u" ? URLSearchParams : Xa,
  nv = FormData,
  ov = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  Zt = {
    isBrowser: !0,
    classes: { URLSearchParams: tv, FormData: nv, Blob },
    isStandardBrowserEnv: ov,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function rv(e, t) {
  return Gi(
    e,
    new Zt.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (o, i, l, c) {
          return Zt.isNode && I.isBuffer(o)
            ? (this.append(i, o.toString("base64")), !1)
            : c.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function iv(e) {
  return I.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === "[]" ? "" : t[1] || t[0]
  );
}
function sv(e) {
  const t = {},
    o = Object.keys(e);
  let i;
  const l = o.length;
  let c;
  for (i = 0; i < l; i++) (c = o[i]), (t[c] = e[c]);
  return t;
}
function Tf(e) {
  function t(o, i, l, c) {
    let f = o[c++];
    const d = Number.isFinite(+f),
      v = c >= o.length;
    return (
      (f = !f && I.isArray(l) ? l.length : f),
      v
        ? (I.hasOwnProp(l, f) ? (l[f] = [l[f], i]) : (l[f] = i), !d)
        : ((!l[f] || !I.isObject(l[f])) && (l[f] = []),
          t(o, i, l[f], c) && I.isArray(l[f]) && (l[f] = sv(l[f])),
          !d)
    );
  }
  if (I.isFormData(e) && I.isFunction(e.entries)) {
    const o = {};
    return (
      I.forEachEntry(e, (i, l) => {
        t(iv(i), l, o, 0);
      }),
      o
    );
  }
  return null;
}
function av(e, t, o) {
  const i = o.config.validateStatus;
  !o.status || !i || i(o.status)
    ? e(o)
    : t(
        new xe(
          "Request failed with status code " + o.status,
          [xe.ERR_BAD_REQUEST, xe.ERR_BAD_RESPONSE][
            Math.floor(o.status / 100) - 4
          ],
          o.config,
          o.request,
          o
        )
      );
}
const lv = Zt.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (o, i, l, c, f, d) {
          const v = [];
          v.push(o + "=" + encodeURIComponent(i)),
            I.isNumber(l) && v.push("expires=" + new Date(l).toGMTString()),
            I.isString(c) && v.push("path=" + c),
            I.isString(f) && v.push("domain=" + f),
            d === !0 && v.push("secure"),
            (document.cookie = v.join("; "));
        },
        read: function (o) {
          const i = document.cookie.match(
            new RegExp("(^|;\\s*)(" + o + ")=([^;]*)")
          );
          return i ? decodeURIComponent(i[3]) : null;
        },
        remove: function (o) {
          this.write(o, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function cv(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function uv(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function $f(e, t) {
  return e && !cv(t) ? uv(e, t) : t;
}
const fv = Zt.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        o = document.createElement("a");
      let i;
      function l(c) {
        let f = c;
        return (
          t && (o.setAttribute("href", f), (f = o.href)),
          o.setAttribute("href", f),
          {
            href: o.href,
            protocol: o.protocol ? o.protocol.replace(/:$/, "") : "",
            host: o.host,
            search: o.search ? o.search.replace(/^\?/, "") : "",
            hash: o.hash ? o.hash.replace(/^#/, "") : "",
            hostname: o.hostname,
            port: o.port,
            pathname:
              o.pathname.charAt(0) === "/" ? o.pathname : "/" + o.pathname,
          }
        );
      }
      return (
        (i = l(window.location.href)),
        function (f) {
          const d = I.isString(f) ? l(f) : f;
          return d.protocol === i.protocol && d.host === i.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function Cr(e, t, o) {
  xe.call(this, e == null ? "canceled" : e, xe.ERR_CANCELED, t, o),
    (this.name = "CanceledError");
}
I.inherits(Cr, xe, { __CANCEL__: !0 });
function dv(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
const pv = I.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  hv = (e) => {
    const t = {};
    let o, i, l;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (f) {
            (l = f.indexOf(":")),
              (o = f.substring(0, l).trim().toLowerCase()),
              (i = f.substring(l + 1).trim()),
              !(!o || (t[o] && pv[o])) &&
                (o === "set-cookie"
                  ? t[o]
                    ? t[o].push(i)
                    : (t[o] = [i])
                  : (t[o] = t[o] ? t[o] + ", " + i : i));
          }),
      t
    );
  },
  zc = Symbol("internals"),
  Cf = Symbol("defaults");
function cr(e) {
  return e && String(e).trim().toLowerCase();
}
function vi(e) {
  return e === !1 || e == null ? e : I.isArray(e) ? e.map(vi) : String(e);
}
function mv(e) {
  const t = Object.create(null),
    o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; (i = o.exec(e)); ) t[i[1]] = i[2];
  return t;
}
function Lc(e, t, o, i) {
  if (I.isFunction(i)) return i.call(this, t, o);
  if (!!I.isString(t)) {
    if (I.isString(i)) return t.indexOf(i) !== -1;
    if (I.isRegExp(i)) return i.test(t);
  }
}
function gv(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, o, i) => o.toUpperCase() + i);
}
function vv(e, t) {
  const o = I.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + o, {
      value: function (l, c, f) {
        return this[i].call(this, t, l, c, f);
      },
      configurable: !0,
    });
  });
}
function ar(e, t) {
  t = t.toLowerCase();
  const o = Object.keys(e);
  let i = o.length,
    l;
  for (; i-- > 0; ) if (((l = o[i]), t === l.toLowerCase())) return l;
  return null;
}
function Ot(e, t) {
  e && this.set(e), (this[Cf] = t || null);
}
Object.assign(Ot.prototype, {
  set: function (e, t, o) {
    const i = this;
    function l(c, f, d) {
      const v = cr(f);
      if (!v) throw new Error("header name must be a non-empty string");
      const b = ar(i, v);
      (b && d !== !0 && (i[b] === !1 || d === !1)) || (i[b || f] = vi(c));
    }
    return (
      I.isPlainObject(e)
        ? I.forEach(e, (c, f) => {
            l(c, f, t);
          })
        : l(t, e, o),
      this
    );
  },
  get: function (e, t) {
    if (((e = cr(e)), !e)) return;
    const o = ar(this, e);
    if (o) {
      const i = this[o];
      if (!t) return i;
      if (t === !0) return mv(i);
      if (I.isFunction(t)) return t.call(this, i, o);
      if (I.isRegExp(t)) return t.exec(i);
      throw new TypeError("parser must be boolean|regexp|function");
    }
  },
  has: function (e, t) {
    if (((e = cr(e)), e)) {
      const o = ar(this, e);
      return !!(o && (!t || Lc(this, this[o], o, t)));
    }
    return !1;
  },
  delete: function (e, t) {
    const o = this;
    let i = !1;
    function l(c) {
      if (((c = cr(c)), c)) {
        const f = ar(o, c);
        f && (!t || Lc(o, o[f], f, t)) && (delete o[f], (i = !0));
      }
    }
    return I.isArray(e) ? e.forEach(l) : l(e), i;
  },
  clear: function () {
    return Object.keys(this).forEach(this.delete.bind(this));
  },
  normalize: function (e) {
    const t = this,
      o = {};
    return (
      I.forEach(this, (i, l) => {
        const c = ar(o, l);
        if (c) {
          (t[c] = vi(i)), delete t[l];
          return;
        }
        const f = e ? gv(l) : String(l).trim();
        f !== l && delete t[l], (t[f] = vi(i)), (o[f] = !0);
      }),
      this
    );
  },
  toJSON: function (e) {
    const t = Object.create(null);
    return (
      I.forEach(Object.assign({}, this[Cf] || null, this), (o, i) => {
        o == null || o === !1 || (t[i] = e && I.isArray(o) ? o.join(", ") : o);
      }),
      t
    );
  },
});
Object.assign(Ot, {
  from: function (e) {
    return I.isString(e)
      ? new this(hv(e))
      : e instanceof this
      ? e
      : new this(e);
  },
  accessor: function (e) {
    const o = (this[zc] = this[zc] = { accessors: {} }).accessors,
      i = this.prototype;
    function l(c) {
      const f = cr(c);
      o[f] || (vv(i, c), (o[f] = !0));
    }
    return I.isArray(e) ? e.forEach(l) : l(e), this;
  },
});
Ot.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
]);
I.freezeMethods(Ot.prototype);
I.freezeMethods(Ot);
function yv(e, t) {
  e = e || 10;
  const o = new Array(e),
    i = new Array(e);
  let l = 0,
    c = 0,
    f;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (v) {
      const b = Date.now(),
        P = i[c];
      f || (f = b), (o[l] = v), (i[l] = b);
      let E = c,
        T = 0;
      for (; E !== l; ) (T += o[E++]), (E = E % e);
      if (((l = (l + 1) % e), l === c && (c = (c + 1) % e), b - f < t)) return;
      const M = P && b - P;
      return M ? Math.round((T * 1e3) / M) : void 0;
    }
  );
}
function Nc(e, t) {
  let o = 0;
  const i = yv(50, 250);
  return (l) => {
    const c = l.loaded,
      f = l.lengthComputable ? l.total : void 0,
      d = c - o,
      v = i(d),
      b = c <= f;
    o = c;
    const P = {
      loaded: c,
      total: f,
      progress: f ? c / f : void 0,
      bytes: d,
      rate: v || void 0,
      estimated: v && f && b ? (f - c) / v : void 0,
    };
    (P[t ? "download" : "upload"] = !0), e(P);
  };
}
function Fc(e) {
  return new Promise(function (o, i) {
    let l = e.data;
    const c = Ot.from(e.headers).normalize(),
      f = e.responseType;
    let d;
    function v() {
      e.cancelToken && e.cancelToken.unsubscribe(d),
        e.signal && e.signal.removeEventListener("abort", d);
    }
    I.isFormData(l) && Zt.isStandardBrowserEnv && c.setContentType(!1);
    let b = new XMLHttpRequest();
    if (e.auth) {
      const M = e.auth.username || "",
        k = e.auth.password
          ? unescape(encodeURIComponent(e.auth.password))
          : "";
      c.set("Authorization", "Basic " + btoa(M + ":" + k));
    }
    const P = $f(e.baseURL, e.url);
    b.open(e.method.toUpperCase(), Ef(P, e.params, e.paramsSerializer), !0),
      (b.timeout = e.timeout);
    function E() {
      if (!b) return;
      const M = Ot.from(
          "getAllResponseHeaders" in b && b.getAllResponseHeaders()
        ),
        N = {
          data:
            !f || f === "text" || f === "json" ? b.responseText : b.response,
          status: b.status,
          statusText: b.statusText,
          headers: M,
          config: e,
          request: b,
        };
      av(
        function (L) {
          o(L), v();
        },
        function (L) {
          i(L), v();
        },
        N
      ),
        (b = null);
    }
    if (
      ("onloadend" in b
        ? (b.onloadend = E)
        : (b.onreadystatechange = function () {
            !b ||
              b.readyState !== 4 ||
              (b.status === 0 &&
                !(b.responseURL && b.responseURL.indexOf("file:") === 0)) ||
              setTimeout(E);
          }),
      (b.onabort = function () {
        !b || (i(new xe("Request aborted", xe.ECONNABORTED, e, b)), (b = null));
      }),
      (b.onerror = function () {
        i(new xe("Network Error", xe.ERR_NETWORK, e, b)), (b = null);
      }),
      (b.ontimeout = function () {
        let k = e.timeout
          ? "timeout of " + e.timeout + "ms exceeded"
          : "timeout exceeded";
        const N = e.transitional || Sf;
        e.timeoutErrorMessage && (k = e.timeoutErrorMessage),
          i(
            new xe(
              k,
              N.clarifyTimeoutError ? xe.ETIMEDOUT : xe.ECONNABORTED,
              e,
              b
            )
          ),
          (b = null);
      }),
      Zt.isStandardBrowserEnv)
    ) {
      const M =
        (e.withCredentials || fv(P)) &&
        e.xsrfCookieName &&
        lv.read(e.xsrfCookieName);
      M && c.set(e.xsrfHeaderName, M);
    }
    l === void 0 && c.setContentType(null),
      "setRequestHeader" in b &&
        I.forEach(c.toJSON(), function (k, N) {
          b.setRequestHeader(N, k);
        }),
      I.isUndefined(e.withCredentials) ||
        (b.withCredentials = !!e.withCredentials),
      f && f !== "json" && (b.responseType = e.responseType),
      typeof e.onDownloadProgress == "function" &&
        b.addEventListener("progress", Nc(e.onDownloadProgress, !0)),
      typeof e.onUploadProgress == "function" &&
        b.upload &&
        b.upload.addEventListener("progress", Nc(e.onUploadProgress)),
      (e.cancelToken || e.signal) &&
        ((d = (M) => {
          !b ||
            (i(!M || M.type ? new Cr(null, e, b) : M), b.abort(), (b = null));
        }),
        e.cancelToken && e.cancelToken.subscribe(d),
        e.signal &&
          (e.signal.aborted ? d() : e.signal.addEventListener("abort", d)));
    const T = dv(P);
    if (T && Zt.protocols.indexOf(T) === -1) {
      i(new xe("Unsupported protocol " + T + ":", xe.ERR_BAD_REQUEST, e));
      return;
    }
    b.send(l || null);
  });
}
const Bc = { http: Fc, xhr: Fc },
  Hc = {
    getAdapter: (e) => {
      if (I.isString(e)) {
        const t = Bc[e];
        if (!e)
          throw Error(
            I.hasOwnProp(e)
              ? `Adapter '${e}' is not available in the build`
              : `Can not resolve adapter '${e}'`
          );
        return t;
      }
      if (!I.isFunction(e)) throw new TypeError("adapter is not a function");
      return e;
    },
    adapters: Bc,
  },
  bv = { "Content-Type": "application/x-www-form-urlencoded" };
function wv() {
  let e;
  return (
    typeof XMLHttpRequest < "u"
      ? (e = Hc.getAdapter("xhr"))
      : typeof process < "u" &&
        I.kindOf(process) === "process" &&
        (e = Hc.getAdapter("http")),
    e
  );
}
function _v(e, t, o) {
  if (I.isString(e))
    try {
      return (t || JSON.parse)(e), I.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError") throw i;
    }
  return (o || JSON.stringify)(e);
}
const Do = {
  transitional: Sf,
  adapter: wv(),
  transformRequest: [
    function (t, o) {
      const i = o.getContentType() || "",
        l = i.indexOf("application/json") > -1,
        c = I.isObject(t);
      if ((c && I.isHTMLForm(t) && (t = new FormData(t)), I.isFormData(t)))
        return l && l ? JSON.stringify(Tf(t)) : t;
      if (
        I.isArrayBuffer(t) ||
        I.isBuffer(t) ||
        I.isStream(t) ||
        I.isFile(t) ||
        I.isBlob(t)
      )
        return t;
      if (I.isArrayBufferView(t)) return t.buffer;
      if (I.isURLSearchParams(t))
        return (
          o.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let d;
      if (c) {
        if (i.indexOf("application/x-www-form-urlencoded") > -1)
          return rv(t, this.formSerializer).toString();
        if ((d = I.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
          const v = this.env && this.env.FormData;
          return Gi(
            d ? { "files[]": t } : t,
            v && new v(),
            this.formSerializer
          );
        }
      }
      return c || l ? (o.setContentType("application/json", !1), _v(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const o = this.transitional || Do.transitional,
        i = o && o.forcedJSONParsing,
        l = this.responseType === "json";
      if (t && I.isString(t) && ((i && !this.responseType) || l)) {
        const f = !(o && o.silentJSONParsing) && l;
        try {
          return JSON.parse(t);
        } catch (d) {
          if (f)
            throw d.name === "SyntaxError"
              ? xe.from(d, xe.ERR_BAD_RESPONSE, this, null, this.response)
              : d;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Zt.classes.FormData, Blob: Zt.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
I.forEach(["delete", "get", "head"], function (t) {
  Do.headers[t] = {};
});
I.forEach(["post", "put", "patch"], function (t) {
  Do.headers[t] = I.merge(bv);
});
function Ws(e, t) {
  const o = this || Do,
    i = t || o,
    l = Ot.from(i.headers);
  let c = i.data;
  return (
    I.forEach(e, function (d) {
      c = d.call(o, c, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    c
  );
}
function Mf(e) {
  return !!(e && e.__CANCEL__);
}
function Vs(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Cr();
}
function Uc(e) {
  return (
    Vs(e),
    (e.headers = Ot.from(e.headers)),
    (e.data = Ws.call(e, e.transformRequest)),
    (e.adapter || Do.adapter)(e).then(
      function (i) {
        return (
          Vs(e),
          (i.data = Ws.call(e, e.transformResponse, i)),
          (i.headers = Ot.from(i.headers)),
          i
        );
      },
      function (i) {
        return (
          Mf(i) ||
            (Vs(e),
            i &&
              i.response &&
              ((i.response.data = Ws.call(e, e.transformResponse, i.response)),
              (i.response.headers = Ot.from(i.response.headers)))),
          Promise.reject(i)
        );
      }
    )
  );
}
function Er(e, t) {
  t = t || {};
  const o = {};
  function i(b, P) {
    return I.isPlainObject(b) && I.isPlainObject(P)
      ? I.merge(b, P)
      : I.isPlainObject(P)
      ? I.merge({}, P)
      : I.isArray(P)
      ? P.slice()
      : P;
  }
  function l(b) {
    if (I.isUndefined(t[b])) {
      if (!I.isUndefined(e[b])) return i(void 0, e[b]);
    } else return i(e[b], t[b]);
  }
  function c(b) {
    if (!I.isUndefined(t[b])) return i(void 0, t[b]);
  }
  function f(b) {
    if (I.isUndefined(t[b])) {
      if (!I.isUndefined(e[b])) return i(void 0, e[b]);
    } else return i(void 0, t[b]);
  }
  function d(b) {
    if (b in t) return i(e[b], t[b]);
    if (b in e) return i(void 0, e[b]);
  }
  const v = {
    url: c,
    method: c,
    data: c,
    baseURL: f,
    transformRequest: f,
    transformResponse: f,
    paramsSerializer: f,
    timeout: f,
    timeoutMessage: f,
    withCredentials: f,
    adapter: f,
    responseType: f,
    xsrfCookieName: f,
    xsrfHeaderName: f,
    onUploadProgress: f,
    onDownloadProgress: f,
    decompress: f,
    maxContentLength: f,
    maxBodyLength: f,
    beforeRedirect: f,
    transport: f,
    httpAgent: f,
    httpsAgent: f,
    cancelToken: f,
    socketPath: f,
    responseEncoding: f,
    validateStatus: d,
  };
  return (
    I.forEach(Object.keys(e).concat(Object.keys(t)), function (P) {
      const E = v[P] || l,
        T = E(P);
      (I.isUndefined(T) && E !== d) || (o[P] = T);
    }),
    o
  );
}
const Af = "1.1.3",
  Ya = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ya[e] = function (i) {
      return typeof i === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Wc = {};
Ya.transitional = function (t, o, i) {
  function l(c, f) {
    return (
      "[Axios v" +
      Af +
      "] Transitional option '" +
      c +
      "'" +
      f +
      (i ? ". " + i : "")
    );
  }
  return (c, f, d) => {
    if (t === !1)
      throw new xe(
        l(f, " has been removed" + (o ? " in " + o : "")),
        xe.ERR_DEPRECATED
      );
    return (
      o &&
        !Wc[f] &&
        ((Wc[f] = !0),
        console.warn(
          l(
            f,
            " has been deprecated since v" +
              o +
              " and will be removed in the near future"
          )
        )),
      t ? t(c, f, d) : !0
    );
  };
};
function xv(e, t, o) {
  if (typeof e != "object")
    throw new xe("options must be an object", xe.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let l = i.length;
  for (; l-- > 0; ) {
    const c = i[l],
      f = t[c];
    if (f) {
      const d = e[c],
        v = d === void 0 || f(d, c, e);
      if (v !== !0)
        throw new xe("option " + c + " must be " + v, xe.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (o !== !0) throw new xe("Unknown option " + c, xe.ERR_BAD_OPTION);
  }
}
const ha = { assertOptions: xv, validators: Ya },
  mn = ha.validators;
class Jn {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new Dc(), response: new Dc() });
  }
  request(t, o) {
    typeof t == "string" ? ((o = o || {}), (o.url = t)) : (o = t || {}),
      (o = Er(this.defaults, o));
    const { transitional: i, paramsSerializer: l } = o;
    i !== void 0 &&
      ha.assertOptions(
        i,
        {
          silentJSONParsing: mn.transitional(mn.boolean),
          forcedJSONParsing: mn.transitional(mn.boolean),
          clarifyTimeoutError: mn.transitional(mn.boolean),
        },
        !1
      ),
      l !== void 0 &&
        ha.assertOptions(
          l,
          { encode: mn.function, serialize: mn.function },
          !0
        ),
      (o.method = (o.method || this.defaults.method || "get").toLowerCase());
    const c = o.headers && I.merge(o.headers.common, o.headers[o.method]);
    c &&
      I.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function (k) {
          delete o.headers[k];
        }
      ),
      (o.headers = new Ot(o.headers, c));
    const f = [];
    let d = !0;
    this.interceptors.request.forEach(function (k) {
      (typeof k.runWhen == "function" && k.runWhen(o) === !1) ||
        ((d = d && k.synchronous), f.unshift(k.fulfilled, k.rejected));
    });
    const v = [];
    this.interceptors.response.forEach(function (k) {
      v.push(k.fulfilled, k.rejected);
    });
    let b,
      P = 0,
      E;
    if (!d) {
      const M = [Uc.bind(this), void 0];
      for (
        M.unshift.apply(M, f),
          M.push.apply(M, v),
          E = M.length,
          b = Promise.resolve(o);
        P < E;

      )
        b = b.then(M[P++], M[P++]);
      return b;
    }
    E = f.length;
    let T = o;
    for (P = 0; P < E; ) {
      const M = f[P++],
        k = f[P++];
      try {
        T = M(T);
      } catch (N) {
        k.call(this, N);
        break;
      }
    }
    try {
      b = Uc.call(this, T);
    } catch (M) {
      return Promise.reject(M);
    }
    for (P = 0, E = v.length; P < E; ) b = b.then(v[P++], v[P++]);
    return b;
  }
  getUri(t) {
    t = Er(this.defaults, t);
    const o = $f(t.baseURL, t.url);
    return Ef(o, t.params, t.paramsSerializer);
  }
}
I.forEach(["delete", "get", "head", "options"], function (t) {
  Jn.prototype[t] = function (o, i) {
    return this.request(
      Er(i || {}, { method: t, url: o, data: (i || {}).data })
    );
  };
});
I.forEach(["post", "put", "patch"], function (t) {
  function o(i) {
    return function (c, f, d) {
      return this.request(
        Er(d || {}, {
          method: t,
          headers: i ? { "Content-Type": "multipart/form-data" } : {},
          url: c,
          data: f,
        })
      );
    };
  }
  (Jn.prototype[t] = o()), (Jn.prototype[t + "Form"] = o(!0));
});
class Ja {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let o;
    this.promise = new Promise(function (c) {
      o = c;
    });
    const i = this;
    this.promise.then((l) => {
      if (!i._listeners) return;
      let c = i._listeners.length;
      for (; c-- > 0; ) i._listeners[c](l);
      i._listeners = null;
    }),
      (this.promise.then = (l) => {
        let c;
        const f = new Promise((d) => {
          i.subscribe(d), (c = d);
        }).then(l);
        return (
          (f.cancel = function () {
            i.unsubscribe(c);
          }),
          f
        );
      }),
      t(function (c, f, d) {
        i.reason || ((i.reason = new Cr(c, f, d)), o(i.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const o = this._listeners.indexOf(t);
    o !== -1 && this._listeners.splice(o, 1);
  }
  static source() {
    let t;
    return {
      token: new Ja(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
}
function Pv(e) {
  return function (o) {
    return e.apply(null, o);
  };
}
function Ov(e) {
  return I.isObject(e) && e.isAxiosError === !0;
}
function kf(e) {
  const t = new Jn(e),
    o = mf(Jn.prototype.request, t);
  return (
    I.extend(o, Jn.prototype, t, { allOwnKeys: !0 }),
    I.extend(o, t, null, { allOwnKeys: !0 }),
    (o.create = function (l) {
      return kf(Er(e, l));
    }),
    o
  );
}
const ft = kf(Do);
ft.Axios = Jn;
ft.CanceledError = Cr;
ft.CancelToken = Ja;
ft.isCancel = Mf;
ft.VERSION = Af;
ft.toFormData = Gi;
ft.AxiosError = xe;
ft.Cancel = ft.CanceledError;
ft.all = function (t) {
  return Promise.all(t);
};
ft.spread = Pv;
ft.isAxiosError = Ov;
ft.formToJSON = (e) => Tf(I.isHTMLForm(e) ? new FormData(e) : e);
var Ev = Object.defineProperty,
  Sv = Object.defineProperties,
  Tv = Object.getOwnPropertyDescriptors,
  Vc = Object.getOwnPropertySymbols,
  $v = Object.prototype.hasOwnProperty,
  Cv = Object.prototype.propertyIsEnumerable,
  qc = (e, t, o) =>
    t in e
      ? Ev(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (e[t] = o),
  qs = (e, t) => {
    for (var o in t || (t = {})) $v.call(t, o) && qc(e, o, t[o]);
    if (Vc) for (var o of Vc(t)) Cv.call(t, o) && qc(e, o, t[o]);
    return e;
  },
  Kc = (e, t) => Sv(e, Tv(t));
function mt(...e) {
  const t = typeof e[0] == "string" ? e[0] : void 0,
    o = bg(t) ? 1 : 0;
  let i = {},
    l = ft,
    c = { immediate: !!o, shallow: !0 };
  const f = (oe) => !!(oe != null && oe.request);
  e.length > 0 + o && (f(e[0 + o]) ? (l = e[0 + o]) : (i = e[0 + o])),
    e.length > 1 + o && f(e[1 + o]) && (l = e[1 + o]),
    ((e.length === 2 + o && !f(e[1 + o])) || e.length === 3 + o) &&
      (c = e[e.length - 1]);
  const d = Ns(),
    v = c.shallow ? Ns() : Ht(),
    b = Ht(!1),
    P = Ht(!1),
    E = Ht(!1),
    T = Ns(),
    M = ft.CancelToken.source(),
    k = (oe) => {
      b.value ||
        !P.value ||
        (M.cancel(oe), (E.value = !0), (P.value = !1), (b.value = !1));
    },
    N = (oe) => {
      (P.value = oe), (b.value = !oe);
    },
    Y = () =>
      new Promise((oe, ce) => {
        wg(b)
          .toBe(!0)
          .then(() => oe(se))
          .catch(ce);
      }),
    L = (oe, ce) => Y().then(oe, ce),
    ee = (oe = t, ce = {}) => {
      T.value = void 0;
      const we = typeof oe == "string" ? oe : t != null ? t : "";
      return (
        N(!0),
        l(
          we,
          Kc(qs(qs({}, i), typeof oe == "object" ? oe : ce), {
            cancelToken: M.token,
          })
        )
          .then((me) => {
            (d.value = me), (v.value = me.data);
          })
          .catch((me) => {
            T.value = me;
          })
          .finally(() => N(!1)),
        { then: L }
      );
    };
  c.immediate && t && ee();
  const se = {
    response: d,
    data: v,
    error: T,
    finished: b,
    loading: P,
    isFinished: b,
    isLoading: P,
    cancel: k,
    isAborted: E,
    canceled: E,
    aborted: E,
    isCanceled: E,
    abort: k,
    execute: ee,
  };
  return Kc(qs({}, se), { then: L });
}
const vt = vg(),
  an = gg({
    id: "radio",
    state: () => ({
      locale: {},
      screen: "main",
      sizes: [
        { name: "Small", value: "small" },
        { name: "Medium", value: "medium" },
        { name: "Large", value: "large" },
      ],
      settings: {
        isRadioShown: !1,
        isOff: 0,
        current: !1,
        volume: 20,
        input: 1,
        isChannelWithList: !1,
        isChannelLocked: !1,
        canChannelBeLocked: !1,
        isColorChangeAllowed: !1,
        ranges: { min: 1, max: 10 },
        position: { bottom: 0, right: 0 },
        size: "medium",
        signs: { sign: null, name: null },
        frame: "default",
        customName: !1,
        isExternalListShown: !1,
        canExternalUsersListBeToggled: !1,
        externalListUsers: [],
      },
      inviteId: null,
      isAllowedToMove: !1,
      screenLists: ["main", "list", "settings", "change", "lock"],
      radioList: [],
      frames: {
        default: { url: "./black.svg", name: "Black" },
        white: { url: "./white.svg", name: "White" },
        blue: { url: "./blue.svg", name: "Blue" },
        green: { url: "./green.svg", name: "Green" },
        red: { url: "./red.svg", name: "Red" },
        yellow: { url: "./yellow.svg", name: "Yellow" },
      },
      quickJoinIsShown: !1,
      quickJoinList: [],
    }),
    actions: {
      async setTab(e) {
        !this.screenLists.includes(e) ||
          (e === "list" && this.fetchList(), (this.screen = e));
      },
      async leaveRadio() {
        mt(`https://${ht()}/leaveRadio`, { method: "POST", data: null });
      },
      async closeRadio() {
        mt(`https://${ht()}/closeRadio`, { method: "POST", data: null });
      },
      async closeList() {
        mt(`https://${ht()}/closeList`, { method: "POST", data: null });
      },
      async toggleOffState() {
        (this.settings.isOff = !this.settings.isOff),
          vt.emit("radio:playButton"),
          this.settings.isOff && (vt.emit("radio:join"), this.leaveRadio());
      },
      async volumeUpButton() {
        vt.emit("radio:playButton"), this.volumeUp();
      },
      async volumeUp() {
        this.settings.isOff ||
          this.settings.volume >= 100 ||
          mt(`https://${ht()}/volumeUpRadio`, { method: "POST", data: null });
      },
      async volumeDownButton() {
        vt.emit("radio:playButton"), this.volumeDown();
      },
      async volumeDown() {
        this.settings.isOff ||
          this.settings.volume <= 0 ||
          mt(`https://${ht()}/volumeDownRadio`, { method: "POST", data: null });
      },
      async updateSigns() {
        mt(`https://${ht()}/updateSignsRadio`, {
          method: "POST",
          data: { signs: this.settings.signs },
        });
      },
      async positionChanged() {
        mt(`https://${ht()}/updatePositionRadio`, {
          method: "POST",
          data: { position: this.settings.position },
        });
      },
      async colorChanged() {
        mt(`https://${ht()}/colorChangeRadio`, {
          method: "POST",
          data: { frame: this.settings.frame },
        });
      },
      async sizeChanged() {
        mt(`https://${ht()}/changeSizeRadio`, {
          method: "POST",
          data: { size: this.settings.size },
        });
      },
      async connectToRadio(e) {
        mt(`https://${ht()}/joinRadio`, {
          method: "POST",
          data: { radio: e || this.settings.input },
        });
      },
      async fetchList() {
        const {
          data: { value: e },
        } = await mt(`https://${ht()}/fetchList`, {
          method: "POST",
          data: { channel: this.settings.current },
        });
        this.radioList = e;
      },
      async toggleChannelState() {
        !this.settings.current ||
          mt(`https://${ht()}/toggleChannelState`, {
            method: "POST",
            data: { channel: this.settings.current },
          });
      },
      async toggleExternalListState() {
        !this.settings.canExternalUsersListBeToggled ||
          (this.settings.isExternalListShown =
            !this.settings.isExternalListShown);
      },
      async invitePlayer() {
        !this.settings.current ||
          mt(`https://${ht()}/inviteToChannel`, {
            method: "POST",
            data: { id: this.inviteId },
          });
      },
      getLocale(e) {
        var t;
        return (t = this.locale[e]) != null ? t : e;
      },
      async fetchLocale() {
        const {
          data: { value: e },
        } = await mt(`https://${ht()}/fetchLocale`, {
          method: "POST",
          data: {},
        });
        this.locale = e;
      },
    },
  });
vt.on("radio:updateValues", (e) => {
  const t = an();
  for (const [, [o, i]] of Object.entries(Object.entries(e)))
    Object.prototype.hasOwnProperty.call(t.settings, o) &&
      (o === "signs" && Array.isArray(i)
        ? (t.settings[o] = {})
        : (t.settings[o] = i));
});
var jf = { exports: {} };
(function (e, t) {
  (function (o) {
    e.exports = o();
  })(function () {
    var o = {};
    Object.defineProperty(o, "__esModule", { value: !0 }),
      (o.default = void 0),
      (o.default = function (n) {
        return !(!n || !n.Window) && n instanceof n.Window;
      });
    var i = {};
    Object.defineProperty(i, "__esModule", { value: !0 }),
      (i.getWindow = function (n) {
        return (0, o.default)(n)
          ? n
          : (n.ownerDocument || n).defaultView || c.window;
      }),
      (i.init = f),
      (i.window = i.realWindow = void 0);
    var l = void 0;
    i.realWindow = l;
    var c = void 0;
    function f(n) {
      i.realWindow = l = n;
      var r = n.document.createTextNode("");
      r.ownerDocument !== n.document &&
        typeof n.wrap == "function" &&
        n.wrap(r) === r &&
        (n = n.wrap(n)),
        (i.window = c = n);
    }
    (i.window = c), typeof window < "u" && window && f(window);
    var d = {};
    function v(n) {
      return (
        (v =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        v(n)
      );
    }
    Object.defineProperty(d, "__esModule", { value: !0 }), (d.default = void 0);
    var b = function (n) {
        return !!n && v(n) === "object";
      },
      P = function (n) {
        return typeof n == "function";
      },
      E = {
        window: function (n) {
          return n === i.window || (0, o.default)(n);
        },
        docFrag: function (n) {
          return b(n) && n.nodeType === 11;
        },
        object: b,
        func: P,
        number: function (n) {
          return typeof n == "number";
        },
        bool: function (n) {
          return typeof n == "boolean";
        },
        string: function (n) {
          return typeof n == "string";
        },
        element: function (n) {
          if (!n || v(n) !== "object") return !1;
          var r = i.getWindow(n) || i.window;
          return /object|function/.test(
            typeof Element > "u" ? "undefined" : v(Element)
          )
            ? n instanceof Element || n instanceof r.Element
            : n.nodeType === 1 && typeof n.nodeName == "string";
        },
        plainObject: function (n) {
          return (
            b(n) &&
            !!n.constructor &&
            /function Object\b/.test(n.constructor.toString())
          );
        },
        array: function (n) {
          return b(n) && n.length !== void 0 && P(n.splice);
        },
      };
    d.default = E;
    var T = {};
    function M(n) {
      var r = n.interaction;
      if (r.prepared.name === "drag") {
        var s = r.prepared.axis;
        s === "x"
          ? ((r.coords.cur.page.y = r.coords.start.page.y),
            (r.coords.cur.client.y = r.coords.start.client.y),
            (r.coords.velocity.client.y = 0),
            (r.coords.velocity.page.y = 0))
          : s === "y" &&
            ((r.coords.cur.page.x = r.coords.start.page.x),
            (r.coords.cur.client.x = r.coords.start.client.x),
            (r.coords.velocity.client.x = 0),
            (r.coords.velocity.page.x = 0));
      }
    }
    function k(n) {
      var r = n.iEvent,
        s = n.interaction;
      if (s.prepared.name === "drag") {
        var a = s.prepared.axis;
        if (a === "x" || a === "y") {
          var u = a === "x" ? "y" : "x";
          (r.page[u] = s.coords.start.page[u]),
            (r.client[u] = s.coords.start.client[u]),
            (r.delta[u] = 0);
        }
      }
    }
    Object.defineProperty(T, "__esModule", { value: !0 }), (T.default = void 0);
    var N = {
        id: "actions/drag",
        install: function (n) {
          var r = n.actions,
            s = n.Interactable,
            a = n.defaults;
          (s.prototype.draggable = N.draggable),
            (r.map.drag = N),
            (r.methodDict.drag = "draggable"),
            (a.actions.drag = N.defaults);
        },
        listeners: {
          "interactions:before-action-move": M,
          "interactions:action-resume": M,
          "interactions:action-move": k,
          "auto-start:check": function (n) {
            var r = n.interaction,
              s = n.interactable,
              a = n.buttons,
              u = s.options.drag;
            if (
              u &&
              u.enabled &&
              (!r.pointerIsDown ||
                !/mouse|pointer/.test(r.pointerType) ||
                (a & s.options.drag.mouseButtons) != 0)
            )
              return (
                (n.action = {
                  name: "drag",
                  axis: u.lockAxis === "start" ? u.startAxis : u.lockAxis,
                }),
                !1
              );
          },
        },
        draggable: function (n) {
          return d.default.object(n)
            ? ((this.options.drag.enabled = n.enabled !== !1),
              this.setPerAction("drag", n),
              this.setOnEvents("drag", n),
              /^(xy|x|y|start)$/.test(n.lockAxis) &&
                (this.options.drag.lockAxis = n.lockAxis),
              /^(xy|x|y)$/.test(n.startAxis) &&
                (this.options.drag.startAxis = n.startAxis),
              this)
            : d.default.bool(n)
            ? ((this.options.drag.enabled = n), this)
            : this.options.drag;
        },
        beforeMove: M,
        move: k,
        defaults: { startAxis: "xy", lockAxis: "xy" },
        getCursor: function () {
          return "move";
        },
      },
      Y = N;
    T.default = Y;
    var L = {};
    Object.defineProperty(L, "__esModule", { value: !0 }), (L.default = void 0);
    var ee = {
      init: function (n) {
        var r = n;
        (ee.document = r.document),
          (ee.DocumentFragment = r.DocumentFragment || se),
          (ee.SVGElement = r.SVGElement || se),
          (ee.SVGSVGElement = r.SVGSVGElement || se),
          (ee.SVGElementInstance = r.SVGElementInstance || se),
          (ee.Element = r.Element || se),
          (ee.HTMLElement = r.HTMLElement || ee.Element),
          (ee.Event = r.Event),
          (ee.Touch = r.Touch || se),
          (ee.PointerEvent = r.PointerEvent || r.MSPointerEvent);
      },
      document: null,
      DocumentFragment: null,
      SVGElement: null,
      SVGSVGElement: null,
      SVGElementInstance: null,
      Element: null,
      HTMLElement: null,
      Event: null,
      Touch: null,
      PointerEvent: null,
    };
    function se() {}
    var oe = ee;
    L.default = oe;
    var ce = {};
    Object.defineProperty(ce, "__esModule", { value: !0 }),
      (ce.default = void 0);
    var we = {
        init: function (n) {
          var r = L.default.Element,
            s = n.navigator || {};
          (we.supportsTouch =
            "ontouchstart" in n ||
            (d.default.func(n.DocumentTouch) &&
              L.default.document instanceof n.DocumentTouch)),
            (we.supportsPointerEvent =
              s.pointerEnabled !== !1 && !!L.default.PointerEvent),
            (we.isIOS = /iP(hone|od|ad)/.test(s.platform)),
            (we.isIOS7 =
              /iP(hone|od|ad)/.test(s.platform) &&
              /OS 7[^\d]/.test(s.appVersion)),
            (we.isIe9 = /MSIE 9/.test(s.userAgent)),
            (we.isOperaMobile =
              s.appName === "Opera" &&
              we.supportsTouch &&
              /Presto/.test(s.userAgent)),
            (we.prefixedMatchesSelector =
              "matches" in r.prototype
                ? "matches"
                : "webkitMatchesSelector" in r.prototype
                ? "webkitMatchesSelector"
                : "mozMatchesSelector" in r.prototype
                ? "mozMatchesSelector"
                : "oMatchesSelector" in r.prototype
                ? "oMatchesSelector"
                : "msMatchesSelector"),
            (we.pEventTypes = we.supportsPointerEvent
              ? L.default.PointerEvent === n.MSPointerEvent
                ? {
                    up: "MSPointerUp",
                    down: "MSPointerDown",
                    over: "mouseover",
                    out: "mouseout",
                    move: "MSPointerMove",
                    cancel: "MSPointerCancel",
                  }
                : {
                    up: "pointerup",
                    down: "pointerdown",
                    over: "pointerover",
                    out: "pointerout",
                    move: "pointermove",
                    cancel: "pointercancel",
                  }
              : null),
            (we.wheelEvent =
              L.default.document && "onmousewheel" in L.default.document
                ? "mousewheel"
                : "wheel");
        },
        supportsTouch: null,
        supportsPointerEvent: null,
        isIOS7: null,
        isIOS: null,
        isIe9: null,
        isOperaMobile: null,
        prefixedMatchesSelector: null,
        pEventTypes: null,
        wheelEvent: null,
      },
      me = we;
    ce.default = me;
    var U = {};
    function $e(n) {
      var r = n.parentNode;
      if (d.default.docFrag(r)) {
        for (; (r = r.host) && d.default.docFrag(r); );
        return r;
      }
      return r;
    }
    function De(n, r) {
      return (
        i.window !== i.realWindow && (r = r.replace(/\/deep\//g, " ")),
        n[ce.default.prefixedMatchesSelector](r)
      );
    }
    Object.defineProperty(U, "__esModule", { value: !0 }),
      (U.closest = function (n, r) {
        for (; d.default.element(n); ) {
          if (De(n, r)) return n;
          n = $e(n);
        }
        return null;
      }),
      (U.getActualElement = function (n) {
        return n.correspondingUseElement || n;
      }),
      (U.getElementClientRect = Fe),
      (U.getElementRect = function (n) {
        var r = Fe(n);
        if (!ce.default.isIOS7 && r) {
          var s = ot(i.getWindow(n));
          (r.left += s.x), (r.right += s.x), (r.top += s.y), (r.bottom += s.y);
        }
        return r;
      }),
      (U.getPath = function (n) {
        for (var r = []; n; ) r.push(n), (n = $e(n));
        return r;
      }),
      (U.getScrollXY = ot),
      (U.indexOfDeepestElement = function (n) {
        for (var r, s = [], a = 0; a < n.length; a++) {
          var u = n[a],
            p = n[r];
          if (u && a !== r)
            if (p) {
              var g = He(u),
                h = He(p);
              if (g !== u.ownerDocument)
                if (h !== u.ownerDocument)
                  if (g !== h) {
                    s = s.length ? s : nt(p);
                    var m = void 0;
                    if (
                      p instanceof L.default.HTMLElement &&
                      u instanceof L.default.SVGElement &&
                      !(u instanceof L.default.SVGSVGElement)
                    ) {
                      if (u === h) continue;
                      m = u.ownerSVGElement;
                    } else m = u;
                    for (
                      var y = nt(m, p.ownerDocument), w = 0;
                      y[w] && y[w] === s[w];

                    )
                      w++;
                    var x = [y[w - 1], y[w], s[w]];
                    if (x[0])
                      for (var C = x[0].lastChild; C; ) {
                        if (C === x[1]) {
                          (r = a), (s = y);
                          break;
                        }
                        if (C === x[2]) break;
                        C = C.previousSibling;
                      }
                  } else
                    (R = u),
                      (S = p),
                      (parseInt(
                        i.getWindow(R).getComputedStyle(R).zIndex,
                        10
                      ) || 0) >=
                        (parseInt(
                          i.getWindow(S).getComputedStyle(S).zIndex,
                          10
                        ) || 0) && (r = a);
                else r = a;
            } else r = a;
        }
        var R, S;
        return r;
      }),
      (U.matchesSelector = De),
      (U.matchesUpTo = function (n, r, s) {
        for (; d.default.element(n); ) {
          if (De(n, r)) return !0;
          if ((n = $e(n)) === s) return De(n, r);
        }
        return !1;
      }),
      (U.nodeContains = function (n, r) {
        if (n.contains) return n.contains(r);
        for (; r; ) {
          if (r === n) return !0;
          r = r.parentNode;
        }
        return !1;
      }),
      (U.parentNode = $e),
      (U.trySelector = function (n) {
        return (
          !!d.default.string(n) && (L.default.document.querySelector(n), !0)
        );
      });
    var He = function (n) {
      return n.parentNode || n.host;
    };
    function nt(n, r) {
      for (
        var s, a = [], u = n;
        (s = He(u)) && u !== r && s !== u.ownerDocument;

      )
        a.unshift(u), (u = s);
      return a;
    }
    function ot(n) {
      return {
        x: (n = n || i.window).scrollX || n.document.documentElement.scrollLeft,
        y: n.scrollY || n.document.documentElement.scrollTop,
      };
    }
    function Fe(n) {
      var r =
        n instanceof L.default.SVGElement
          ? n.getBoundingClientRect()
          : n.getClientRects()[0];
      return (
        r && {
          left: r.left,
          right: r.right,
          top: r.top,
          bottom: r.bottom,
          width: r.width || r.right - r.left,
          height: r.height || r.bottom - r.top,
        }
      );
    }
    var J = {};
    Object.defineProperty(J, "__esModule", { value: !0 }),
      (J.default = function (n, r) {
        for (var s in r) n[s] = r[s];
        return n;
      });
    var de = {};
    function je(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    function Te(n, r, s) {
      return n === "parent"
        ? (0, U.parentNode)(s)
        : n === "self"
        ? r.getRect(s)
        : (0, U.closest)(s, n);
    }
    Object.defineProperty(de, "__esModule", { value: !0 }),
      (de.addEdges = function (n, r, s) {
        n.left && (r.left += s.x),
          n.right && (r.right += s.x),
          n.top && (r.top += s.y),
          n.bottom && (r.bottom += s.y),
          (r.width = r.right - r.left),
          (r.height = r.bottom - r.top);
      }),
      (de.getStringOptionResult = Te),
      (de.rectToXY = function (n) {
        return n && { x: "x" in n ? n.x : n.left, y: "y" in n ? n.y : n.top };
      }),
      (de.resolveRectLike = function (n, r, s, a) {
        var u,
          p = n;
        return (
          d.default.string(p)
            ? (p = Te(p, r, s))
            : d.default.func(p) &&
              (p = p.apply(
                void 0,
                (function (g) {
                  if (Array.isArray(g)) return je(g);
                })((u = a)) ||
                  (function (g) {
                    if (
                      (typeof Symbol < "u" && g[Symbol.iterator] != null) ||
                      g["@@iterator"] != null
                    )
                      return Array.from(g);
                  })(u) ||
                  (function (g, h) {
                    if (g) {
                      if (typeof g == "string") return je(g, h);
                      var m = Object.prototype.toString.call(g).slice(8, -1);
                      return (
                        m === "Object" &&
                          g.constructor &&
                          (m = g.constructor.name),
                        m === "Map" || m === "Set"
                          ? Array.from(g)
                          : m === "Arguments" ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(m)
                          ? je(g, h)
                          : void 0
                      );
                    }
                  })(u) ||
                  (function () {
                    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
                  })()
              )),
          d.default.element(p) && (p = (0, U.getElementRect)(p)),
          p
        );
      }),
      (de.tlbrToXywh = function (n) {
        return (
          !n ||
            ("x" in n && "y" in n) ||
            (((n = (0, J.default)({}, n)).x = n.left || 0),
            (n.y = n.top || 0),
            (n.width = n.width || (n.right || 0) - n.x),
            (n.height = n.height || (n.bottom || 0) - n.y)),
          n
        );
      }),
      (de.xywhToTlbr = function (n) {
        return (
          !n ||
            ("left" in n && "top" in n) ||
            (((n = (0, J.default)({}, n)).left = n.x || 0),
            (n.top = n.y || 0),
            (n.right = n.right || n.left + n.width),
            (n.bottom = n.bottom || n.top + n.height)),
          n
        );
      });
    var rt = {};
    Object.defineProperty(rt, "__esModule", { value: !0 }),
      (rt.default = function (n, r, s) {
        var a = n.options[s],
          u = (a && a.origin) || n.options.origin,
          p = (0, de.resolveRectLike)(u, n, r, [n && r]);
        return (0, de.rectToXY)(p) || { x: 0, y: 0 };
      });
    var Et = {};
    function jt(n) {
      return n.trim().split(/ +/);
    }
    Object.defineProperty(Et, "__esModule", { value: !0 }),
      (Et.default = function n(r, s, a) {
        if (
          ((a = a || {}),
          d.default.string(r) && r.search(" ") !== -1 && (r = jt(r)),
          d.default.array(r))
        )
          return r.reduce(function (m, y) {
            return (0, J.default)(m, n(y, s, a));
          }, a);
        if ((d.default.object(r) && ((s = r), (r = "")), d.default.func(s)))
          (a[r] = a[r] || []), a[r].push(s);
        else if (d.default.array(s))
          for (var u = 0; u < s.length; u++) {
            var p;
            (p = s[u]), n(r, p, a);
          }
        else if (d.default.object(s))
          for (var g in s) {
            var h = jt(g).map(function (m) {
              return "".concat(r).concat(m);
            });
            n(h, s[g], a);
          }
        return a;
      });
    var Ve = {};
    Object.defineProperty(Ve, "__esModule", { value: !0 }),
      (Ve.default = void 0),
      (Ve.default = function (n, r) {
        return Math.sqrt(n * n + r * r);
      });
    var $n = {};
    Object.defineProperty($n, "__esModule", { value: !0 }),
      ($n.default = function (n, r) {
        n.__set || (n.__set = {});
        var s = function (u) {
          typeof n[u] != "function" &&
            u !== "__set" &&
            Object.defineProperty(n, u, {
              get: function () {
                return u in n.__set ? n.__set[u] : (n.__set[u] = r[u]);
              },
              set: function (p) {
                n.__set[u] = p;
              },
              configurable: !0,
            });
        };
        for (var a in r) s(a);
        return n;
      });
    var te = {};
    function zo(n) {
      return n instanceof L.default.Event || n instanceof L.default.Touch;
    }
    function it(n, r, s) {
      return (
        (n = n || "page"), ((s = s || {}).x = r[n + "X"]), (s.y = r[n + "Y"]), s
      );
    }
    function Cn(n, r) {
      return (
        (r = r || { x: 0, y: 0 }),
        ce.default.isOperaMobile && zo(n)
          ? (it("screen", n, r),
            (r.x += window.scrollX),
            (r.y += window.scrollY))
          : it("page", n, r),
        r
      );
    }
    function Lo(n, r) {
      return (
        (r = r || {}),
        ce.default.isOperaMobile && zo(n)
          ? it("screen", n, r)
          : it("client", n, r),
        r
      );
    }
    function St(n) {
      var r = [];
      return (
        d.default.array(n)
          ? ((r[0] = n[0]), (r[1] = n[1]))
          : n.type === "touchend"
          ? n.touches.length === 1
            ? ((r[0] = n.touches[0]), (r[1] = n.changedTouches[0]))
            : n.touches.length === 0 &&
              ((r[0] = n.changedTouches[0]), (r[1] = n.changedTouches[1]))
          : ((r[0] = n.touches[0]), (r[1] = n.touches[1])),
        r
      );
    }
    function oo(n) {
      for (
        var r = {
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
          },
          s = 0;
        s < n.length;
        s++
      ) {
        var a = n[s];
        for (var u in r) r[u] += a[u];
      }
      for (var p in r) r[p] /= n.length;
      return r;
    }
    Object.defineProperty(te, "__esModule", { value: !0 }),
      (te.coordsToEvent = function (n) {
        return {
          coords: n,
          get page() {
            return this.coords.page;
          },
          get client() {
            return this.coords.client;
          },
          get timeStamp() {
            return this.coords.timeStamp;
          },
          get pageX() {
            return this.coords.page.x;
          },
          get pageY() {
            return this.coords.page.y;
          },
          get clientX() {
            return this.coords.client.x;
          },
          get clientY() {
            return this.coords.client.y;
          },
          get pointerId() {
            return this.coords.pointerId;
          },
          get target() {
            return this.coords.target;
          },
          get type() {
            return this.coords.type;
          },
          get pointerType() {
            return this.coords.pointerType;
          },
          get buttons() {
            return this.coords.buttons;
          },
          preventDefault: function () {},
        };
      }),
      (te.copyCoords = function (n, r) {
        (n.page = n.page || {}),
          (n.page.x = r.page.x),
          (n.page.y = r.page.y),
          (n.client = n.client || {}),
          (n.client.x = r.client.x),
          (n.client.y = r.client.y),
          (n.timeStamp = r.timeStamp);
      }),
      (te.getClientXY = Lo),
      (te.getEventTargets = function (n) {
        var r = d.default.func(n.composedPath) ? n.composedPath() : n.path;
        return [
          U.getActualElement(r ? r[0] : n.target),
          U.getActualElement(n.currentTarget),
        ];
      }),
      (te.getPageXY = Cn),
      (te.getPointerId = function (n) {
        return d.default.number(n.pointerId) ? n.pointerId : n.identifier;
      }),
      (te.getPointerType = function (n) {
        return d.default.string(n.pointerType)
          ? n.pointerType
          : d.default.number(n.pointerType)
          ? [void 0, void 0, "touch", "pen", "mouse"][n.pointerType]
          : /touch/.test(n.type || "") || n instanceof L.default.Touch
          ? "touch"
          : "mouse";
      }),
      (te.getTouchPair = St),
      (te.getXY = it),
      (te.isNativePointer = zo),
      (te.newCoords = function () {
        return { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 };
      }),
      (te.pointerAverage = oo),
      Object.defineProperty(te, "pointerExtend", {
        enumerable: !0,
        get: function () {
          return $n.default;
        },
      }),
      (te.setCoordDeltas = function (n, r, s) {
        (n.page.x = s.page.x - r.page.x),
          (n.page.y = s.page.y - r.page.y),
          (n.client.x = s.client.x - r.client.x),
          (n.client.y = s.client.y - r.client.y),
          (n.timeStamp = s.timeStamp - r.timeStamp);
      }),
      (te.setCoordVelocity = function (n, r) {
        var s = Math.max(r.timeStamp / 1e3, 0.001);
        (n.page.x = r.page.x / s),
          (n.page.y = r.page.y / s),
          (n.client.x = r.client.x / s),
          (n.client.y = r.client.y / s),
          (n.timeStamp = s);
      }),
      (te.setCoords = function (n, r, s) {
        var a = r.length > 1 ? oo(r) : r[0];
        Cn(a, n.page), Lo(a, n.client), (n.timeStamp = s);
      }),
      (te.setZeroCoords = function (n) {
        (n.page.x = 0), (n.page.y = 0), (n.client.x = 0), (n.client.y = 0);
      }),
      (te.touchAngle = function (n, r) {
        var s = r + "X",
          a = r + "Y",
          u = St(n),
          p = u[1][s] - u[0][s],
          g = u[1][a] - u[0][a];
        return (180 * Math.atan2(g, p)) / Math.PI;
      }),
      (te.touchBBox = function (n) {
        if (!n.length) return null;
        var r = St(n),
          s = Math.min(r[0].pageX, r[1].pageX),
          a = Math.min(r[0].pageY, r[1].pageY),
          u = Math.max(r[0].pageX, r[1].pageX),
          p = Math.max(r[0].pageY, r[1].pageY);
        return {
          x: s,
          y: a,
          left: s,
          top: a,
          right: u,
          bottom: p,
          width: u - s,
          height: p - a,
        };
      }),
      (te.touchDistance = function (n, r) {
        var s = r + "X",
          a = r + "Y",
          u = St(n),
          p = u[0][s] - u[1][s],
          g = u[0][a] - u[1][a];
        return (0, Ve.default)(p, g);
      });
    var Rt = {};
    function _(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function O(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(Rt, "__esModule", { value: !0 }),
      (Rt.BaseEvent = void 0);
    var j = (function () {
      function n(a) {
        (function (u, p) {
          if (!(u instanceof p))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          O(this, "immediatePropagationStopped", !1),
          O(this, "propagationStopped", !1),
          (this._interaction = a);
      }
      var r, s;
      return (
        (r = n),
        (s = [
          { key: "preventDefault", value: function () {} },
          {
            key: "stopPropagation",
            value: function () {
              this.propagationStopped = !0;
            },
          },
          {
            key: "stopImmediatePropagation",
            value: function () {
              this.immediatePropagationStopped = this.propagationStopped = !0;
            },
          },
        ]) && _(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    (Rt.BaseEvent = j),
      Object.defineProperty(j.prototype, "interaction", {
        get: function () {
          return this._interaction._proxy;
        },
        set: function () {},
      });
    var A = {};
    Object.defineProperty(A, "__esModule", { value: !0 }),
      (A.remove =
        A.merge =
        A.from =
        A.findIndex =
        A.find =
        A.contains =
          void 0),
      (A.contains = function (n, r) {
        return n.indexOf(r) !== -1;
      }),
      (A.remove = function (n, r) {
        return n.splice(n.indexOf(r), 1);
      });
    var z = function (n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        n.push(a);
      }
      return n;
    };
    (A.merge = z),
      (A.from = function (n) {
        return z([], n);
      });
    var V = function (n, r) {
      for (var s = 0; s < n.length; s++) if (r(n[s], s, n)) return s;
      return -1;
    };
    (A.findIndex = V),
      (A.find = function (n, r) {
        return n[V(n, r)];
      });
    var q = {};
    function W(n) {
      return (
        (W =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        W(n)
      );
    }
    function K(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function F(n, r) {
      return (
        (F = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (s, a) {
              return (s.__proto__ = a), s;
            }),
        F(n, r)
      );
    }
    function ie(n, r) {
      if (r && (W(r) === "object" || typeof r == "function")) return r;
      if (r !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return Q(n);
    }
    function Q(n) {
      if (n === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return n;
    }
    function re(n) {
      return (
        (re = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (r) {
              return r.__proto__ || Object.getPrototypeOf(r);
            }),
        re(n)
      );
    }
    function ae(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(q, "__esModule", { value: !0 }),
      (q.DropEvent = void 0);
    var ge = (function (n) {
      (function (h, m) {
        if (typeof m != "function" && m !== null)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (h.prototype = Object.create(m && m.prototype, {
          constructor: { value: h, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(h, "prototype", { writable: !1 }),
          m && F(h, m);
      })(g, n);
      var r,
        s,
        a,
        u,
        p =
          ((a = g),
          (u = (function () {
            if (
              typeof Reflect > "u" ||
              !Reflect.construct ||
              Reflect.construct.sham
            )
              return !1;
            if (typeof Proxy == "function") return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch {
              return !1;
            }
          })()),
          function () {
            var h,
              m = re(a);
            if (u) {
              var y = re(this).constructor;
              h = Reflect.construct(m, arguments, y);
            } else h = m.apply(this, arguments);
            return ie(this, h);
          });
      function g(h, m, y) {
        var w;
        (function (S, B) {
          if (!(S instanceof B))
            throw new TypeError("Cannot call a class as a function");
        })(this, g),
          ae(Q((w = p.call(this, m._interaction))), "dropzone", void 0),
          ae(Q(w), "dragEvent", void 0),
          ae(Q(w), "relatedTarget", void 0),
          ae(Q(w), "draggable", void 0),
          ae(Q(w), "propagationStopped", !1),
          ae(Q(w), "immediatePropagationStopped", !1);
        var x = y === "dragleave" ? h.prev : h.cur,
          C = x.element,
          R = x.dropzone;
        return (
          (w.type = y),
          (w.target = C),
          (w.currentTarget = C),
          (w.dropzone = R),
          (w.dragEvent = m),
          (w.relatedTarget = m.target),
          (w.draggable = m.interactable),
          (w.timeStamp = m.timeStamp),
          w
        );
      }
      return (
        (r = g),
        (s = [
          {
            key: "reject",
            value: function () {
              var h = this,
                m = this._interaction.dropState;
              if (
                this.type === "dropactivate" ||
                (this.dropzone &&
                  m.cur.dropzone === this.dropzone &&
                  m.cur.element === this.target)
              )
                if (
                  ((m.prev.dropzone = this.dropzone),
                  (m.prev.element = this.target),
                  (m.rejected = !0),
                  (m.events.enter = null),
                  this.stopImmediatePropagation(),
                  this.type === "dropactivate")
                ) {
                  var y = m.activeDrops,
                    w = A.findIndex(y, function (C) {
                      var R = C.dropzone,
                        S = C.element;
                      return R === h.dropzone && S === h.target;
                    });
                  m.activeDrops.splice(w, 1);
                  var x = new g(m, this.dragEvent, "dropdeactivate");
                  (x.dropzone = this.dropzone),
                    (x.target = this.target),
                    this.dropzone.fire(x);
                } else
                  this.dropzone.fire(new g(m, this.dragEvent, "dragleave"));
            },
          },
          { key: "preventDefault", value: function () {} },
          {
            key: "stopPropagation",
            value: function () {
              this.propagationStopped = !0;
            },
          },
          {
            key: "stopImmediatePropagation",
            value: function () {
              this.immediatePropagationStopped = this.propagationStopped = !0;
            },
          },
        ]) && K(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        g
      );
    })(Rt.BaseEvent);
    q.DropEvent = ge;
    var Pe = {};
    function Oe(n, r) {
      for (var s = 0; s < n.slice().length; s++) {
        var a = n.slice()[s],
          u = a.dropzone,
          p = a.element;
        (r.dropzone = u),
          (r.target = p),
          u.fire(r),
          (r.propagationStopped = r.immediatePropagationStopped = !1);
      }
    }
    function Le(n, r) {
      for (
        var s = (function (p, g) {
            for (
              var h = p.interactables, m = [], y = 0;
              y < h.list.length;
              y++
            ) {
              var w = h.list[y];
              if (w.options.drop.enabled) {
                var x = w.options.drop.accept;
                if (
                  !(
                    (d.default.element(x) && x !== g) ||
                    (d.default.string(x) && !U.matchesSelector(g, x)) ||
                    (d.default.func(x) &&
                      !x({ dropzone: w, draggableElement: g }))
                  )
                )
                  for (
                    var C = d.default.string(w.target)
                        ? w._context.querySelectorAll(w.target)
                        : d.default.array(w.target)
                        ? w.target
                        : [w.target],
                      R = 0;
                    R < C.length;
                    R++
                  ) {
                    var S = C[R];
                    S !== g &&
                      m.push({ dropzone: w, element: S, rect: w.getRect(S) });
                  }
              }
            }
            return m;
          })(n, r),
          a = 0;
        a < s.length;
        a++
      ) {
        var u = s[a];
        u.rect = u.dropzone.getRect(u.element);
      }
      return s;
    }
    function dt(n, r, s) {
      for (
        var a = n.dropState, u = n.interactable, p = n.element, g = [], h = 0;
        h < a.activeDrops.length;
        h++
      ) {
        var m = a.activeDrops[h],
          y = m.dropzone,
          w = m.element,
          x = m.rect;
        g.push(y.dropCheck(r, s, u, p, w, x) ? w : null);
      }
      var C = U.indexOfDeepestElement(g);
      return a.activeDrops[C] || null;
    }
    function It(n, r, s) {
      var a = n.dropState,
        u = {
          enter: null,
          leave: null,
          activate: null,
          deactivate: null,
          move: null,
          drop: null,
        };
      return (
        s.type === "dragstart" &&
          ((u.activate = new q.DropEvent(a, s, "dropactivate")),
          (u.activate.target = null),
          (u.activate.dropzone = null)),
        s.type === "dragend" &&
          ((u.deactivate = new q.DropEvent(a, s, "dropdeactivate")),
          (u.deactivate.target = null),
          (u.deactivate.dropzone = null)),
        a.rejected ||
          (a.cur.element !== a.prev.element &&
            (a.prev.dropzone &&
              ((u.leave = new q.DropEvent(a, s, "dragleave")),
              (s.dragLeave = u.leave.target = a.prev.element),
              (s.prevDropzone = u.leave.dropzone = a.prev.dropzone)),
            a.cur.dropzone &&
              ((u.enter = new q.DropEvent(a, s, "dragenter")),
              (s.dragEnter = a.cur.element),
              (s.dropzone = a.cur.dropzone))),
          s.type === "dragend" &&
            a.cur.dropzone &&
            ((u.drop = new q.DropEvent(a, s, "drop")),
            (s.dropzone = a.cur.dropzone),
            (s.relatedTarget = a.cur.element)),
          s.type === "dragmove" &&
            a.cur.dropzone &&
            ((u.move = new q.DropEvent(a, s, "dropmove")),
            (u.move.dragmove = s),
            (s.dropzone = a.cur.dropzone))),
        u
      );
    }
    function ro(n, r) {
      var s = n.dropState,
        a = s.activeDrops,
        u = s.cur,
        p = s.prev;
      r.leave && p.dropzone.fire(r.leave),
        r.enter && u.dropzone.fire(r.enter),
        r.move && u.dropzone.fire(r.move),
        r.drop && u.dropzone.fire(r.drop),
        r.deactivate && Oe(a, r.deactivate),
        (s.prev.dropzone = u.dropzone),
        (s.prev.element = u.element);
    }
    function cn(n, r) {
      var s = n.interaction,
        a = n.iEvent,
        u = n.event;
      if (a.type === "dragmove" || a.type === "dragend") {
        var p = s.dropState;
        r.dynamicDrop && (p.activeDrops = Le(r, s.element));
        var g = a,
          h = dt(s, g, u);
        (p.rejected =
          p.rejected &&
          !!h &&
          h.dropzone === p.cur.dropzone &&
          h.element === p.cur.element),
          (p.cur.dropzone = h && h.dropzone),
          (p.cur.element = h && h.element),
          (p.events = It(s, 0, g));
      }
    }
    Object.defineProperty(Pe, "__esModule", { value: !0 }),
      (Pe.default = void 0);
    var No = {
        id: "actions/drop",
        install: function (n) {
          var r = n.actions,
            s = n.interactStatic,
            a = n.Interactable,
            u = n.defaults;
          n.usePlugin(T.default),
            (a.prototype.dropzone = function (p) {
              return (function (g, h) {
                if (d.default.object(h)) {
                  if (
                    ((g.options.drop.enabled = h.enabled !== !1), h.listeners)
                  ) {
                    var m = (0, Et.default)(h.listeners),
                      y = Object.keys(m).reduce(function (w, x) {
                        return (
                          (w[
                            /^(enter|leave)/.test(x)
                              ? "drag".concat(x)
                              : /^(activate|deactivate|move)/.test(x)
                              ? "drop".concat(x)
                              : x
                          ] = m[x]),
                          w
                        );
                      }, {});
                    g.off(g.options.drop.listeners),
                      g.on(y),
                      (g.options.drop.listeners = y);
                  }
                  return (
                    d.default.func(h.ondrop) && g.on("drop", h.ondrop),
                    d.default.func(h.ondropactivate) &&
                      g.on("dropactivate", h.ondropactivate),
                    d.default.func(h.ondropdeactivate) &&
                      g.on("dropdeactivate", h.ondropdeactivate),
                    d.default.func(h.ondragenter) &&
                      g.on("dragenter", h.ondragenter),
                    d.default.func(h.ondragleave) &&
                      g.on("dragleave", h.ondragleave),
                    d.default.func(h.ondropmove) &&
                      g.on("dropmove", h.ondropmove),
                    /^(pointer|center)$/.test(h.overlap)
                      ? (g.options.drop.overlap = h.overlap)
                      : d.default.number(h.overlap) &&
                        (g.options.drop.overlap = Math.max(
                          Math.min(1, h.overlap),
                          0
                        )),
                    "accept" in h && (g.options.drop.accept = h.accept),
                    "checker" in h && (g.options.drop.checker = h.checker),
                    g
                  );
                }
                return d.default.bool(h)
                  ? ((g.options.drop.enabled = h), g)
                  : g.options.drop;
              })(this, p);
            }),
            (a.prototype.dropCheck = function (p, g, h, m, y, w) {
              return (function (x, C, R, S, B, X, H) {
                var ne = !1;
                if (!(H = H || x.getRect(X)))
                  return (
                    !!x.options.drop.checker &&
                    x.options.drop.checker(C, R, ne, x, X, S, B)
                  );
                var le = x.options.drop.overlap;
                if (le === "pointer") {
                  var pe = (0, rt.default)(S, B, "drag"),
                    Ee = te.getPageXY(C);
                  (Ee.x += pe.x), (Ee.y += pe.y);
                  var Re = Ee.x > H.left && Ee.x < H.right,
                    ve = Ee.y > H.top && Ee.y < H.bottom;
                  ne = Re && ve;
                }
                var Me = S.getRect(B);
                if (Me && le === "center") {
                  var xt = Me.left + Me.width / 2,
                    Yt = Me.top + Me.height / 2;
                  ne =
                    xt >= H.left &&
                    xt <= H.right &&
                    Yt >= H.top &&
                    Yt <= H.bottom;
                }
                return (
                  Me &&
                    d.default.number(le) &&
                    (ne =
                      (Math.max(
                        0,
                        Math.min(H.right, Me.right) - Math.max(H.left, Me.left)
                      ) *
                        Math.max(
                          0,
                          Math.min(H.bottom, Me.bottom) -
                            Math.max(H.top, Me.top)
                        )) /
                        (Me.width * Me.height) >=
                      le),
                  x.options.drop.checker &&
                    (ne = x.options.drop.checker(C, R, ne, x, X, S, B)),
                  ne
                );
              })(this, p, g, h, m, y, w);
            }),
            (s.dynamicDrop = function (p) {
              return d.default.bool(p)
                ? ((n.dynamicDrop = p), s)
                : n.dynamicDrop;
            }),
            (0, J.default)(r.phaselessTypes, {
              dragenter: !0,
              dragleave: !0,
              dropactivate: !0,
              dropdeactivate: !0,
              dropmove: !0,
              drop: !0,
            }),
            (r.methodDict.drop = "dropzone"),
            (n.dynamicDrop = !1),
            (u.actions.drop = No.defaults);
        },
        listeners: {
          "interactions:before-action-start": function (n) {
            var r = n.interaction;
            r.prepared.name === "drag" &&
              (r.dropState = {
                cur: { dropzone: null, element: null },
                prev: { dropzone: null, element: null },
                rejected: null,
                events: null,
                activeDrops: [],
              });
          },
          "interactions:after-action-start": function (n, r) {
            var s = n.interaction,
              a = (n.event, n.iEvent);
            if (s.prepared.name === "drag") {
              var u = s.dropState;
              (u.activeDrops = null),
                (u.events = null),
                (u.activeDrops = Le(r, s.element)),
                (u.events = It(s, 0, a)),
                u.events.activate &&
                  (Oe(u.activeDrops, u.events.activate),
                  r.fire("actions/drop:start", {
                    interaction: s,
                    dragEvent: a,
                  }));
            }
          },
          "interactions:action-move": cn,
          "interactions:after-action-move": function (n, r) {
            var s = n.interaction,
              a = n.iEvent;
            s.prepared.name === "drag" &&
              (ro(s, s.dropState.events),
              r.fire("actions/drop:move", { interaction: s, dragEvent: a }),
              (s.dropState.events = {}));
          },
          "interactions:action-end": function (n, r) {
            if (n.interaction.prepared.name === "drag") {
              var s = n.interaction,
                a = n.iEvent;
              cn(n, r),
                ro(s, s.dropState.events),
                r.fire("actions/drop:end", { interaction: s, dragEvent: a });
            }
          },
          "interactions:stop": function (n) {
            var r = n.interaction;
            if (r.prepared.name === "drag") {
              var s = r.dropState;
              s &&
                ((s.activeDrops = null),
                (s.events = null),
                (s.cur.dropzone = null),
                (s.cur.element = null),
                (s.prev.dropzone = null),
                (s.prev.element = null),
                (s.rejected = !1));
            }
          },
        },
        getActiveDrops: Le,
        getDrop: dt,
        getDropEvents: It,
        fireDropEvents: ro,
        defaults: { enabled: !1, accept: null, overlap: "pointer" },
      },
      st = No;
    Pe.default = st;
    var at = {};
    function io(n) {
      var r = n.interaction,
        s = n.iEvent,
        a = n.phase;
      if (r.prepared.name === "gesture") {
        var u = r.pointers.map(function (y) {
            return y.pointer;
          }),
          p = a === "start",
          g = a === "end",
          h = r.interactable.options.deltaSource;
        if (((s.touches = [u[0], u[1]]), p))
          (s.distance = te.touchDistance(u, h)),
            (s.box = te.touchBBox(u)),
            (s.scale = 1),
            (s.ds = 0),
            (s.angle = te.touchAngle(u, h)),
            (s.da = 0),
            (r.gesture.startDistance = s.distance),
            (r.gesture.startAngle = s.angle);
        else if (g) {
          var m = r.prevEvent;
          (s.distance = m.distance),
            (s.box = m.box),
            (s.scale = m.scale),
            (s.ds = 0),
            (s.angle = m.angle),
            (s.da = 0);
        } else
          (s.distance = te.touchDistance(u, h)),
            (s.box = te.touchBBox(u)),
            (s.scale = s.distance / r.gesture.startDistance),
            (s.angle = te.touchAngle(u, h)),
            (s.ds = s.scale - r.gesture.scale),
            (s.da = s.angle - r.gesture.angle);
        (r.gesture.distance = s.distance),
          (r.gesture.angle = s.angle),
          d.default.number(s.scale) &&
            s.scale !== 1 / 0 &&
            !isNaN(s.scale) &&
            (r.gesture.scale = s.scale);
      }
    }
    Object.defineProperty(at, "__esModule", { value: !0 }),
      (at.default = void 0);
    var as = {
        id: "actions/gesture",
        before: ["actions/drag", "actions/resize"],
        install: function (n) {
          var r = n.actions,
            s = n.Interactable,
            a = n.defaults;
          (s.prototype.gesturable = function (u) {
            return d.default.object(u)
              ? ((this.options.gesture.enabled = u.enabled !== !1),
                this.setPerAction("gesture", u),
                this.setOnEvents("gesture", u),
                this)
              : d.default.bool(u)
              ? ((this.options.gesture.enabled = u), this)
              : this.options.gesture;
          }),
            (r.map.gesture = as),
            (r.methodDict.gesture = "gesturable"),
            (a.actions.gesture = as.defaults);
        },
        listeners: {
          "interactions:action-start": io,
          "interactions:action-move": io,
          "interactions:action-end": io,
          "interactions:new": function (n) {
            n.interaction.gesture = {
              angle: 0,
              distance: 0,
              scale: 1,
              startAngle: 0,
              startDistance: 0,
            };
          },
          "auto-start:check": function (n) {
            if (!(n.interaction.pointers.length < 2)) {
              var r = n.interactable.options.gesture;
              if (r && r.enabled) return (n.action = { name: "gesture" }), !1;
            }
          },
        },
        defaults: {},
        getCursor: function () {
          return "";
        },
      },
      td = as;
    at.default = td;
    var kr = {};
    function nd(n, r, s, a, u, p, g) {
      if (!r) return !1;
      if (r === !0) {
        var h = d.default.number(p.width) ? p.width : p.right - p.left,
          m = d.default.number(p.height) ? p.height : p.bottom - p.top;
        if (
          ((g = Math.min(
            g,
            Math.abs((n === "left" || n === "right" ? h : m) / 2)
          )),
          h < 0 &&
            (n === "left" ? (n = "right") : n === "right" && (n = "left")),
          m < 0 &&
            (n === "top" ? (n = "bottom") : n === "bottom" && (n = "top")),
          n === "left")
        ) {
          var y = h >= 0 ? p.left : p.right;
          return s.x < y + g;
        }
        if (n === "top") {
          var w = m >= 0 ? p.top : p.bottom;
          return s.y < w + g;
        }
        if (n === "right") return s.x > (h >= 0 ? p.right : p.left) - g;
        if (n === "bottom") return s.y > (m >= 0 ? p.bottom : p.top) - g;
      }
      return (
        !!d.default.element(a) &&
        (d.default.element(r) ? r === a : U.matchesUpTo(a, r, u))
      );
    }
    function tl(n) {
      var r = n.iEvent,
        s = n.interaction;
      if (s.prepared.name === "resize" && s.resizeAxes) {
        var a = r;
        s.interactable.options.resize.square
          ? (s.resizeAxes === "y"
              ? (a.delta.x = a.delta.y)
              : (a.delta.y = a.delta.x),
            (a.axes = "xy"))
          : ((a.axes = s.resizeAxes),
            s.resizeAxes === "x"
              ? (a.delta.y = 0)
              : s.resizeAxes === "y" && (a.delta.x = 0));
      }
    }
    Object.defineProperty(kr, "__esModule", { value: !0 }),
      (kr.default = void 0);
    var Wt = {
        id: "actions/resize",
        before: ["actions/drag"],
        install: function (n) {
          var r = n.actions,
            s = n.browser,
            a = n.Interactable,
            u = n.defaults;
          (Wt.cursors = (function (p) {
            return p.isIe9
              ? {
                  x: "e-resize",
                  y: "s-resize",
                  xy: "se-resize",
                  top: "n-resize",
                  left: "w-resize",
                  bottom: "s-resize",
                  right: "e-resize",
                  topleft: "se-resize",
                  bottomright: "se-resize",
                  topright: "ne-resize",
                  bottomleft: "ne-resize",
                }
              : {
                  x: "ew-resize",
                  y: "ns-resize",
                  xy: "nwse-resize",
                  top: "ns-resize",
                  left: "ew-resize",
                  bottom: "ns-resize",
                  right: "ew-resize",
                  topleft: "nwse-resize",
                  bottomright: "nwse-resize",
                  topright: "nesw-resize",
                  bottomleft: "nesw-resize",
                };
          })(s)),
            (Wt.defaultMargin =
              s.supportsTouch || s.supportsPointerEvent ? 20 : 10),
            (a.prototype.resizable = function (p) {
              return (function (g, h, m) {
                return d.default.object(h)
                  ? ((g.options.resize.enabled = h.enabled !== !1),
                    g.setPerAction("resize", h),
                    g.setOnEvents("resize", h),
                    d.default.string(h.axis) && /^x$|^y$|^xy$/.test(h.axis)
                      ? (g.options.resize.axis = h.axis)
                      : h.axis === null &&
                        (g.options.resize.axis =
                          m.defaults.actions.resize.axis),
                    d.default.bool(h.preserveAspectRatio)
                      ? (g.options.resize.preserveAspectRatio =
                          h.preserveAspectRatio)
                      : d.default.bool(h.square) &&
                        (g.options.resize.square = h.square),
                    g)
                  : d.default.bool(h)
                  ? ((g.options.resize.enabled = h), g)
                  : g.options.resize;
              })(this, p, n);
            }),
            (r.map.resize = Wt),
            (r.methodDict.resize = "resizable"),
            (u.actions.resize = Wt.defaults);
        },
        listeners: {
          "interactions:new": function (n) {
            n.interaction.resizeAxes = "xy";
          },
          "interactions:action-start": function (n) {
            (function (r) {
              var s = r.iEvent,
                a = r.interaction;
              if (a.prepared.name === "resize" && a.prepared.edges) {
                var u = s,
                  p = a.rect;
                (a._rects = {
                  start: (0, J.default)({}, p),
                  corrected: (0, J.default)({}, p),
                  previous: (0, J.default)({}, p),
                  delta: {
                    left: 0,
                    right: 0,
                    width: 0,
                    top: 0,
                    bottom: 0,
                    height: 0,
                  },
                }),
                  (u.edges = a.prepared.edges),
                  (u.rect = a._rects.corrected),
                  (u.deltaRect = a._rects.delta);
              }
            })(n),
              tl(n);
          },
          "interactions:action-move": function (n) {
            (function (r) {
              var s = r.iEvent,
                a = r.interaction;
              if (a.prepared.name === "resize" && a.prepared.edges) {
                var u = s,
                  p = a.interactable.options.resize.invert,
                  g = p === "reposition" || p === "negate",
                  h = a.rect,
                  m = a._rects,
                  y = m.start,
                  w = m.corrected,
                  x = m.delta,
                  C = m.previous;
                if (((0, J.default)(C, w), g)) {
                  if (((0, J.default)(w, h), p === "reposition")) {
                    if (w.top > w.bottom) {
                      var R = w.top;
                      (w.top = w.bottom), (w.bottom = R);
                    }
                    if (w.left > w.right) {
                      var S = w.left;
                      (w.left = w.right), (w.right = S);
                    }
                  }
                } else
                  (w.top = Math.min(h.top, y.bottom)),
                    (w.bottom = Math.max(h.bottom, y.top)),
                    (w.left = Math.min(h.left, y.right)),
                    (w.right = Math.max(h.right, y.left));
                for (var B in ((w.width = w.right - w.left),
                (w.height = w.bottom - w.top),
                w))
                  x[B] = w[B] - C[B];
                (u.edges = a.prepared.edges), (u.rect = w), (u.deltaRect = x);
              }
            })(n),
              tl(n);
          },
          "interactions:action-end": function (n) {
            var r = n.iEvent,
              s = n.interaction;
            if (s.prepared.name === "resize" && s.prepared.edges) {
              var a = r;
              (a.edges = s.prepared.edges),
                (a.rect = s._rects.corrected),
                (a.deltaRect = s._rects.delta);
            }
          },
          "auto-start:check": function (n) {
            var r = n.interaction,
              s = n.interactable,
              a = n.element,
              u = n.rect,
              p = n.buttons;
            if (u) {
              var g = (0, J.default)({}, r.coords.cur.page),
                h = s.options.resize;
              if (
                h &&
                h.enabled &&
                (!r.pointerIsDown ||
                  !/mouse|pointer/.test(r.pointerType) ||
                  (p & h.mouseButtons) != 0)
              ) {
                if (d.default.object(h.edges)) {
                  var m = { left: !1, right: !1, top: !1, bottom: !1 };
                  for (var y in m)
                    m[y] = nd(
                      y,
                      h.edges[y],
                      g,
                      r._latestPointer.eventTarget,
                      a,
                      u,
                      h.margin || Wt.defaultMargin
                    );
                  (m.left = m.left && !m.right),
                    (m.top = m.top && !m.bottom),
                    (m.left || m.right || m.top || m.bottom) &&
                      (n.action = { name: "resize", edges: m });
                } else {
                  var w = h.axis !== "y" && g.x > u.right - Wt.defaultMargin,
                    x = h.axis !== "x" && g.y > u.bottom - Wt.defaultMargin;
                  (w || x) &&
                    (n.action = {
                      name: "resize",
                      axes: (w ? "x" : "") + (x ? "y" : ""),
                    });
                }
                return !n.action && void 0;
              }
            }
          },
        },
        defaults: {
          square: !1,
          preserveAspectRatio: !1,
          axis: "xy",
          margin: NaN,
          edges: null,
          invert: "none",
        },
        cursors: null,
        getCursor: function (n) {
          var r = n.edges,
            s = n.axis,
            a = n.name,
            u = Wt.cursors,
            p = null;
          if (s) p = u[a + s];
          else if (r) {
            for (
              var g = "", h = ["top", "bottom", "left", "right"], m = 0;
              m < h.length;
              m++
            ) {
              var y = h[m];
              r[y] && (g += y);
            }
            p = u[g];
          }
          return p;
        },
        defaultMargin: null,
      },
      od = Wt;
    kr.default = od;
    var Fo = {};
    Object.defineProperty(Fo, "__esModule", { value: !0 }),
      (Fo.default = void 0);
    var rd = {
      id: "actions",
      install: function (n) {
        n.usePlugin(at.default),
          n.usePlugin(kr.default),
          n.usePlugin(T.default),
          n.usePlugin(Pe.default);
      },
    };
    Fo.default = rd;
    var Tt = {};
    Object.defineProperty(Tt, "__esModule", { value: !0 }),
      (Tt.default = void 0);
    var Vt,
      Mn,
      nl = 0,
      id = {
        request: function (n) {
          return Vt(n);
        },
        cancel: function (n) {
          return Mn(n);
        },
        init: function (n) {
          if (
            ((Vt = n.requestAnimationFrame), (Mn = n.cancelAnimationFrame), !Vt)
          )
            for (
              var r = ["ms", "moz", "webkit", "o"], s = 0;
              s < r.length;
              s++
            ) {
              var a = r[s];
              (Vt = n["".concat(a, "RequestAnimationFrame")]),
                (Mn =
                  n["".concat(a, "CancelAnimationFrame")] ||
                  n["".concat(a, "CancelRequestAnimationFrame")]);
            }
          (Vt = Vt && Vt.bind(n)),
            (Mn = Mn && Mn.bind(n)),
            Vt ||
              ((Vt = function (u) {
                var p = Date.now(),
                  g = Math.max(0, 16 - (p - nl)),
                  h = n.setTimeout(function () {
                    u(p + g);
                  }, g);
                return (nl = p + g), h;
              }),
              (Mn = function (u) {
                return clearTimeout(u);
              }));
        },
      };
    Tt.default = id;
    var qt = {};
    Object.defineProperty(qt, "__esModule", { value: !0 }),
      (qt.default = void 0),
      (qt.getContainer = jr),
      (qt.getScroll = Bo),
      (qt.getScrollSize = function (n) {
        return (
          d.default.window(n) && (n = window.document.body),
          { x: n.scrollWidth, y: n.scrollHeight }
        );
      }),
      (qt.getScrollSizeDelta = function (n, r) {
        var s = n.interaction,
          a = n.element,
          u = s && s.interactable.options[s.prepared.name].autoScroll;
        if (!u || !u.enabled) return r(), { x: 0, y: 0 };
        var p = jr(u.container, s.interactable, a),
          g = Bo(p);
        r();
        var h = Bo(p);
        return { x: h.x - g.x, y: h.y - g.y };
      });
    var fe = {
      defaults: { enabled: !1, margin: 60, container: null, speed: 300 },
      now: Date.now,
      interaction: null,
      i: 0,
      x: 0,
      y: 0,
      isScrolling: !1,
      prevTime: 0,
      margin: 0,
      speed: 0,
      start: function (n) {
        (fe.isScrolling = !0),
          Tt.default.cancel(fe.i),
          (n.autoScroll = fe),
          (fe.interaction = n),
          (fe.prevTime = fe.now()),
          (fe.i = Tt.default.request(fe.scroll));
      },
      stop: function () {
        (fe.isScrolling = !1),
          fe.interaction && (fe.interaction.autoScroll = null),
          Tt.default.cancel(fe.i);
      },
      scroll: function () {
        var n = fe.interaction,
          r = n.interactable,
          s = n.element,
          a = n.prepared.name,
          u = r.options[a].autoScroll,
          p = jr(u.container, r, s),
          g = fe.now(),
          h = (g - fe.prevTime) / 1e3,
          m = u.speed * h;
        if (m >= 1) {
          var y = { x: fe.x * m, y: fe.y * m };
          if (y.x || y.y) {
            var w = Bo(p);
            d.default.window(p)
              ? p.scrollBy(y.x, y.y)
              : p && ((p.scrollLeft += y.x), (p.scrollTop += y.y));
            var x = Bo(p),
              C = { x: x.x - w.x, y: x.y - w.y };
            (C.x || C.y) &&
              r.fire({
                type: "autoscroll",
                target: s,
                interactable: r,
                delta: C,
                interaction: n,
                container: p,
              });
          }
          fe.prevTime = g;
        }
        fe.isScrolling &&
          (Tt.default.cancel(fe.i), (fe.i = Tt.default.request(fe.scroll)));
      },
      check: function (n, r) {
        var s;
        return (s = n.options[r].autoScroll) == null ? void 0 : s.enabled;
      },
      onInteractionMove: function (n) {
        var r = n.interaction,
          s = n.pointer;
        if (r.interacting() && fe.check(r.interactable, r.prepared.name))
          if (r.simulation) fe.x = fe.y = 0;
          else {
            var a,
              u,
              p,
              g,
              h = r.interactable,
              m = r.element,
              y = r.prepared.name,
              w = h.options[y].autoScroll,
              x = jr(w.container, h, m);
            if (d.default.window(x))
              (g = s.clientX < fe.margin),
                (a = s.clientY < fe.margin),
                (u = s.clientX > x.innerWidth - fe.margin),
                (p = s.clientY > x.innerHeight - fe.margin);
            else {
              var C = U.getElementClientRect(x);
              (g = s.clientX < C.left + fe.margin),
                (a = s.clientY < C.top + fe.margin),
                (u = s.clientX > C.right - fe.margin),
                (p = s.clientY > C.bottom - fe.margin);
            }
            (fe.x = u ? 1 : g ? -1 : 0),
              (fe.y = p ? 1 : a ? -1 : 0),
              fe.isScrolling ||
                ((fe.margin = w.margin), (fe.speed = w.speed), fe.start(r));
          }
      },
    };
    function jr(n, r, s) {
      return (
        (d.default.string(n) ? (0, de.getStringOptionResult)(n, r, s) : n) ||
        (0, i.getWindow)(s)
      );
    }
    function Bo(n) {
      return (
        d.default.window(n) && (n = window.document.body),
        { x: n.scrollLeft, y: n.scrollTop }
      );
    }
    var sd = {
        id: "auto-scroll",
        install: function (n) {
          var r = n.defaults,
            s = n.actions;
          (n.autoScroll = fe),
            (fe.now = function () {
              return n.now();
            }),
            (s.phaselessTypes.autoscroll = !0),
            (r.perAction.autoScroll = fe.defaults);
        },
        listeners: {
          "interactions:new": function (n) {
            n.interaction.autoScroll = null;
          },
          "interactions:destroy": function (n) {
            (n.interaction.autoScroll = null),
              fe.stop(),
              fe.interaction && (fe.interaction = null);
          },
          "interactions:stop": fe.stop,
          "interactions:action-move": function (n) {
            return fe.onInteractionMove(n);
          },
        },
      },
      ad = sd;
    qt.default = ad;
    var bt = {};
    Object.defineProperty(bt, "__esModule", { value: !0 }),
      (bt.copyAction = function (n, r) {
        return (n.name = r.name), (n.axis = r.axis), (n.edges = r.edges), n;
      }),
      (bt.sign = void 0),
      (bt.warnOnce = function (n, r) {
        var s = !1;
        return function () {
          return (
            s || (i.window.console.warn(r), (s = !0)), n.apply(this, arguments)
          );
        };
      }),
      (bt.sign = function (n) {
        return n >= 0 ? 1 : -1;
      });
    var Rr = {};
    function ld(n) {
      return d.default.bool(n)
        ? ((this.options.styleCursor = n), this)
        : n === null
        ? (delete this.options.styleCursor, this)
        : this.options.styleCursor;
    }
    function cd(n) {
      return d.default.func(n)
        ? ((this.options.actionChecker = n), this)
        : n === null
        ? (delete this.options.actionChecker, this)
        : this.options.actionChecker;
    }
    Object.defineProperty(Rr, "__esModule", { value: !0 }),
      (Rr.default = void 0);
    var ud = {
      id: "auto-start/interactableMethods",
      install: function (n) {
        var r = n.Interactable;
        (r.prototype.getAction = function (s, a, u, p) {
          var g = (function (h, m, y, w, x) {
            var C = h.getRect(w),
              R = {
                action: null,
                interactable: h,
                interaction: y,
                element: w,
                rect: C,
                buttons: m.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[m.button],
              };
            return x.fire("auto-start:check", R), R.action;
          })(this, a, u, p, n);
          return this.options.actionChecker
            ? this.options.actionChecker(s, a, g, this, p, u)
            : g;
        }),
          (r.prototype.ignoreFrom = (0, bt.warnOnce)(function (s) {
            return this._backCompatOption("ignoreFrom", s);
          }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).")),
          (r.prototype.allowFrom = (0, bt.warnOnce)(function (s) {
            return this._backCompatOption("allowFrom", s);
          }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).")),
          (r.prototype.actionChecker = cd),
          (r.prototype.styleCursor = ld);
      },
    };
    Rr.default = ud;
    var so = {};
    function ol(n, r, s, a, u) {
      return r.testIgnoreAllow(r.options[n.name], s, a) &&
        r.options[n.name].enabled &&
        Ir(r, s, n, u)
        ? n
        : null;
    }
    function fd(n, r, s, a, u, p, g) {
      for (var h = 0, m = a.length; h < m; h++) {
        var y = a[h],
          w = u[h],
          x = y.getAction(r, s, n, w);
        if (x) {
          var C = ol(x, y, w, p, g);
          if (C) return { action: C, interactable: y, element: w };
        }
      }
      return { action: null, interactable: null, element: null };
    }
    function rl(n, r, s, a, u) {
      var p = [],
        g = [],
        h = a;
      function m(w) {
        p.push(w), g.push(h);
      }
      for (; d.default.element(h); ) {
        (p = []), (g = []), u.interactables.forEachMatch(h, m);
        var y = fd(n, r, s, p, g, a, u);
        if (y.action && !y.interactable.options[y.action.name].manualStart)
          return y;
        h = U.parentNode(h);
      }
      return { action: null, interactable: null, element: null };
    }
    function il(n, r, s) {
      var a = r.action,
        u = r.interactable,
        p = r.element;
      (a = a || { name: null }),
        (n.interactable = u),
        (n.element = p),
        (0, bt.copyAction)(n.prepared, a),
        (n.rect = u && a.name ? u.getRect(p) : null),
        al(n, s),
        s.fire("autoStart:prepared", { interaction: n });
    }
    function Ir(n, r, s, a) {
      var u = n.options,
        p = u[s.name].max,
        g = u[s.name].maxPerElement,
        h = a.autoStart.maxInteractions,
        m = 0,
        y = 0,
        w = 0;
      if (!(p && g && h)) return !1;
      for (var x = 0; x < a.interactions.list.length; x++) {
        var C = a.interactions.list[x],
          R = C.prepared.name;
        if (
          C.interacting() &&
          (++m >= h ||
            (C.interactable === n &&
              ((y += R === s.name ? 1 : 0) >= p ||
                (C.element === r && (w++, R === s.name && w >= g)))))
        )
          return !1;
      }
      return h > 0;
    }
    function sl(n, r) {
      return d.default.number(n)
        ? ((r.autoStart.maxInteractions = n), this)
        : r.autoStart.maxInteractions;
    }
    function ls(n, r, s) {
      var a = s.autoStart.cursorElement;
      a && a !== n && (a.style.cursor = ""),
        (n.ownerDocument.documentElement.style.cursor = r),
        (n.style.cursor = r),
        (s.autoStart.cursorElement = r ? n : null);
    }
    function al(n, r) {
      var s = n.interactable,
        a = n.element,
        u = n.prepared;
      if (n.pointerType === "mouse" && s && s.options.styleCursor) {
        var p = "";
        if (u.name) {
          var g = s.options[u.name].cursorChecker;
          p = d.default.func(g)
            ? g(u, s, a, n._interacting)
            : r.actions.map[u.name].getCursor(u);
        }
        ls(n.element, p || "", r);
      } else r.autoStart.cursorElement && ls(r.autoStart.cursorElement, "", r);
    }
    Object.defineProperty(so, "__esModule", { value: !0 }),
      (so.default = void 0);
    var dd = {
        id: "auto-start/base",
        before: ["actions"],
        install: function (n) {
          var r = n.interactStatic,
            s = n.defaults;
          n.usePlugin(Rr.default),
            (s.base.actionChecker = null),
            (s.base.styleCursor = !0),
            (0, J.default)(s.perAction, {
              manualStart: !1,
              max: 1 / 0,
              maxPerElement: 1,
              allowFrom: null,
              ignoreFrom: null,
              mouseButtons: 1,
            }),
            (r.maxInteractions = function (a) {
              return sl(a, n);
            }),
            (n.autoStart = {
              maxInteractions: 1 / 0,
              withinInteractionLimit: Ir,
              cursorElement: null,
            });
        },
        listeners: {
          "interactions:down": function (n, r) {
            var s = n.interaction,
              a = n.pointer,
              u = n.event,
              p = n.eventTarget;
            s.interacting() || il(s, rl(s, a, u, p, r), r);
          },
          "interactions:move": function (n, r) {
            (function (s, a) {
              var u = s.interaction,
                p = s.pointer,
                g = s.event,
                h = s.eventTarget;
              u.pointerType !== "mouse" ||
                u.pointerIsDown ||
                u.interacting() ||
                il(u, rl(u, p, g, h, a), a);
            })(n, r),
              (function (s, a) {
                var u = s.interaction;
                if (
                  u.pointerIsDown &&
                  !u.interacting() &&
                  u.pointerWasMoved &&
                  u.prepared.name
                ) {
                  a.fire("autoStart:before-start", s);
                  var p = u.interactable,
                    g = u.prepared.name;
                  g &&
                    p &&
                    (p.options[g].manualStart ||
                    !Ir(p, u.element, u.prepared, a)
                      ? u.stop()
                      : (u.start(u.prepared, p, u.element), al(u, a)));
                }
              })(n, r);
          },
          "interactions:stop": function (n, r) {
            var s = n.interaction,
              a = s.interactable;
            a && a.options.styleCursor && ls(s.element, "", r);
          },
        },
        maxInteractions: sl,
        withinInteractionLimit: Ir,
        validateAction: ol,
      },
      pd = dd;
    so.default = pd;
    var Dr = {};
    Object.defineProperty(Dr, "__esModule", { value: !0 }),
      (Dr.default = void 0);
    var hd = {
      id: "auto-start/dragAxis",
      listeners: {
        "autoStart:before-start": function (n, r) {
          var s = n.interaction,
            a = n.eventTarget,
            u = n.dx,
            p = n.dy;
          if (s.prepared.name === "drag") {
            var g = Math.abs(u),
              h = Math.abs(p),
              m = s.interactable.options.drag,
              y = m.startAxis,
              w = g > h ? "x" : g < h ? "y" : "xy";
            if (
              ((s.prepared.axis = m.lockAxis === "start" ? w[0] : m.lockAxis),
              w !== "xy" && y !== "xy" && y !== w)
            ) {
              s.prepared.name = null;
              for (
                var x = a,
                  C = function (S) {
                    if (S !== s.interactable) {
                      var B = s.interactable.options.drag;
                      if (!B.manualStart && S.testIgnoreAllow(B, x, a)) {
                        var X = S.getAction(s.downPointer, s.downEvent, s, x);
                        if (
                          X &&
                          X.name === "drag" &&
                          (function (H, ne) {
                            if (!ne) return !1;
                            var le = ne.options.drag.startAxis;
                            return H === "xy" || le === "xy" || le === H;
                          })(w, S) &&
                          so.default.validateAction(X, S, x, a, r)
                        )
                          return S;
                      }
                    }
                  };
                d.default.element(x);

              ) {
                var R = r.interactables.forEachMatch(x, C);
                if (R) {
                  (s.prepared.name = "drag"),
                    (s.interactable = R),
                    (s.element = x);
                  break;
                }
                x = (0, U.parentNode)(x);
              }
            }
          }
        },
      },
    };
    Dr.default = hd;
    var zr = {};
    function cs(n) {
      var r = n.prepared && n.prepared.name;
      if (!r) return null;
      var s = n.interactable.options;
      return s[r].hold || s[r].delay;
    }
    Object.defineProperty(zr, "__esModule", { value: !0 }),
      (zr.default = void 0);
    var md = {
        id: "auto-start/hold",
        install: function (n) {
          var r = n.defaults;
          n.usePlugin(so.default),
            (r.perAction.hold = 0),
            (r.perAction.delay = 0);
        },
        listeners: {
          "interactions:new": function (n) {
            n.interaction.autoStartHoldTimer = null;
          },
          "autoStart:prepared": function (n) {
            var r = n.interaction,
              s = cs(r);
            s > 0 &&
              (r.autoStartHoldTimer = setTimeout(function () {
                r.start(r.prepared, r.interactable, r.element);
              }, s));
          },
          "interactions:move": function (n) {
            var r = n.interaction,
              s = n.duplicate;
            r.autoStartHoldTimer &&
              r.pointerWasMoved &&
              !s &&
              (clearTimeout(r.autoStartHoldTimer),
              (r.autoStartHoldTimer = null));
          },
          "autoStart:before-start": function (n) {
            var r = n.interaction;
            cs(r) > 0 && (r.prepared.name = null);
          },
        },
        getHoldDuration: cs,
      },
      gd = md;
    zr.default = gd;
    var Ho = {};
    Object.defineProperty(Ho, "__esModule", { value: !0 }),
      (Ho.default = void 0);
    var vd = {
      id: "auto-start",
      install: function (n) {
        n.usePlugin(so.default),
          n.usePlugin(zr.default),
          n.usePlugin(Dr.default);
      },
    };
    Ho.default = vd;
    var An = {};
    function yd(n) {
      return /^(always|never|auto)$/.test(n)
        ? ((this.options.preventDefault = n), this)
        : d.default.bool(n)
        ? ((this.options.preventDefault = n ? "always" : "never"), this)
        : this.options.preventDefault;
    }
    function bd(n) {
      var r = n.interaction,
        s = n.event;
      r.interactable && r.interactable.checkAndPreventDefault(s);
    }
    function ll(n) {
      var r = n.Interactable;
      (r.prototype.preventDefault = yd),
        (r.prototype.checkAndPreventDefault = function (s) {
          return (function (a, u, p) {
            var g = a.options.preventDefault;
            if (g !== "never")
              if (g !== "always") {
                if (
                  u.events.supportsPassive &&
                  /^touch(start|move)$/.test(p.type)
                ) {
                  var h = (0, i.getWindow)(p.target).document,
                    m = u.getDocOptions(h);
                  if (!m || !m.events || m.events.passive !== !1) return;
                }
                /^(mouse|pointer|touch)*(down|start)/i.test(p.type) ||
                  (d.default.element(p.target) &&
                    (0, U.matchesSelector)(
                      p.target,
                      "input,select,textarea,[contenteditable=true],[contenteditable=true] *"
                    )) ||
                  p.preventDefault();
              } else p.preventDefault();
          })(this, n, s);
        }),
        n.interactions.docEvents.push({
          type: "dragstart",
          listener: function (s) {
            for (var a = 0; a < n.interactions.list.length; a++) {
              var u = n.interactions.list[a];
              if (
                u.element &&
                (u.element === s.target ||
                  (0, U.nodeContains)(u.element, s.target))
              )
                return void u.interactable.checkAndPreventDefault(s);
            }
          },
        });
    }
    Object.defineProperty(An, "__esModule", { value: !0 }),
      (An.default = void 0),
      (An.install = ll);
    var wd = {
      id: "core/interactablePreventDefault",
      install: ll,
      listeners: ["down", "move", "up", "cancel"].reduce(function (n, r) {
        return (n["interactions:".concat(r)] = bd), n;
      }, {}),
    };
    An.default = wd;
    var us = {};
    Object.defineProperty(us, "__esModule", { value: !0 }),
      (us.default = void 0),
      (us.default = {});
    var Uo,
      Lr = {};
    Object.defineProperty(Lr, "__esModule", { value: !0 }),
      (Lr.default = void 0),
      (function (n) {
        (n.touchAction = "touchAction"),
          (n.boxSizing = "boxSizing"),
          (n.noListeners = "noListeners");
      })(Uo || (Uo = {})),
      Uo.touchAction,
      Uo.boxSizing,
      Uo.noListeners;
    var _d = { id: "dev-tools", install: function () {} };
    Lr.default = _d;
    var kn = {};
    Object.defineProperty(kn, "__esModule", { value: !0 }),
      (kn.default = function n(r) {
        var s = {};
        for (var a in r) {
          var u = r[a];
          d.default.plainObject(u)
            ? (s[a] = n(u))
            : d.default.array(u)
            ? (s[a] = A.from(u))
            : (s[a] = u);
        }
        return s;
      });
    var jn = {};
    function cl(n, r) {
      return (
        (function (s) {
          if (Array.isArray(s)) return s;
        })(n) ||
        (function (s, a) {
          var u =
            s == null
              ? null
              : (typeof Symbol < "u" && s[Symbol.iterator]) || s["@@iterator"];
          if (u != null) {
            var p,
              g,
              h = [],
              m = !0,
              y = !1;
            try {
              for (
                u = u.call(s);
                !(m = (p = u.next()).done) &&
                (h.push(p.value), !a || h.length !== a);
                m = !0
              );
            } catch (w) {
              (y = !0), (g = w);
            } finally {
              try {
                m || u.return == null || u.return();
              } finally {
                if (y) throw g;
              }
            }
            return h;
          }
        })(n, r) ||
        (function (s, a) {
          if (s) {
            if (typeof s == "string") return ul(s, a);
            var u = Object.prototype.toString.call(s).slice(8, -1);
            return (
              u === "Object" && s.constructor && (u = s.constructor.name),
              u === "Map" || u === "Set"
                ? Array.from(s)
                : u === "Arguments" ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)
                ? ul(s, a)
                : void 0
            );
          }
        })(n, r) ||
        (function () {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        })()
      );
    }
    function ul(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    function xd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Rn(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(jn, "__esModule", { value: !0 }),
      (jn.default = void 0),
      (jn.getRectOffset = fl);
    var Pd = (function () {
      function n(a) {
        (function (u, p) {
          if (!(u instanceof p))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          Rn(this, "states", []),
          Rn(this, "startOffset", { left: 0, right: 0, top: 0, bottom: 0 }),
          Rn(this, "startDelta", void 0),
          Rn(this, "result", void 0),
          Rn(this, "endResult", void 0),
          Rn(this, "edges", void 0),
          Rn(this, "interaction", void 0),
          (this.interaction = a),
          (this.result = Nr());
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "start",
            value: function (a, u) {
              var p = a.phase,
                g = this.interaction,
                h = (function (y) {
                  var w = y.interactable.options[y.prepared.name],
                    x = w.modifiers;
                  return x && x.length
                    ? x
                    : [
                        "snap",
                        "snapSize",
                        "snapEdges",
                        "restrict",
                        "restrictEdges",
                        "restrictSize",
                      ]
                        .map(function (C) {
                          var R = w[C];
                          return (
                            R &&
                            R.enabled && { options: R, methods: R._methods }
                          );
                        })
                        .filter(function (C) {
                          return !!C;
                        });
                })(g);
              this.prepareStates(h),
                (this.edges = (0, J.default)({}, g.edges)),
                (this.startOffset = fl(g.rect, u)),
                (this.startDelta = { x: 0, y: 0 });
              var m = this.fillArg({ phase: p, pageCoords: u, preEnd: !1 });
              return (
                (this.result = Nr()),
                this.startAll(m),
                (this.result = this.setAll(m))
              );
            },
          },
          {
            key: "fillArg",
            value: function (a) {
              var u = this.interaction;
              return (
                (a.interaction = u),
                (a.interactable = u.interactable),
                (a.element = u.element),
                (a.rect = a.rect || u.rect),
                (a.edges = this.edges),
                (a.startOffset = this.startOffset),
                a
              );
            },
          },
          {
            key: "startAll",
            value: function (a) {
              for (var u = 0; u < this.states.length; u++) {
                var p = this.states[u];
                p.methods.start && ((a.state = p), p.methods.start(a));
              }
            },
          },
          {
            key: "setAll",
            value: function (a) {
              var u = a.phase,
                p = a.preEnd,
                g = a.skipModifiers,
                h = a.rect;
              (a.coords = (0, J.default)({}, a.pageCoords)),
                (a.rect = (0, J.default)({}, h));
              for (
                var m = g ? this.states.slice(g) : this.states,
                  y = Nr(a.coords, a.rect),
                  w = 0;
                w < m.length;
                w++
              ) {
                var x,
                  C = m[w],
                  R = C.options,
                  S = (0, J.default)({}, a.coords),
                  B = null;
                (x = C.methods) != null &&
                  x.set &&
                  this.shouldDo(R, p, u) &&
                  ((a.state = C),
                  (B = C.methods.set(a)),
                  de.addEdges(this.interaction.edges, a.rect, {
                    x: a.coords.x - S.x,
                    y: a.coords.y - S.y,
                  })),
                  y.eventProps.push(B);
              }
              (y.delta.x = a.coords.x - a.pageCoords.x),
                (y.delta.y = a.coords.y - a.pageCoords.y),
                (y.rectDelta.left = a.rect.left - h.left),
                (y.rectDelta.right = a.rect.right - h.right),
                (y.rectDelta.top = a.rect.top - h.top),
                (y.rectDelta.bottom = a.rect.bottom - h.bottom);
              var X = this.result.coords,
                H = this.result.rect;
              if (X && H) {
                var ne =
                  y.rect.left !== H.left ||
                  y.rect.right !== H.right ||
                  y.rect.top !== H.top ||
                  y.rect.bottom !== H.bottom;
                y.changed = ne || X.x !== y.coords.x || X.y !== y.coords.y;
              }
              return y;
            },
          },
          {
            key: "applyToInteraction",
            value: function (a) {
              var u = this.interaction,
                p = a.phase,
                g = u.coords.cur,
                h = u.coords.start,
                m = this.result,
                y = this.startDelta,
                w = m.delta;
              p === "start" && (0, J.default)(this.startDelta, m.delta);
              for (
                var x = 0;
                x <
                [
                  [h, y],
                  [g, w],
                ].length;
                x++
              ) {
                var C = cl(
                    [
                      [h, y],
                      [g, w],
                    ][x],
                    2
                  ),
                  R = C[0],
                  S = C[1];
                (R.page.x += S.x),
                  (R.page.y += S.y),
                  (R.client.x += S.x),
                  (R.client.y += S.y);
              }
              var B = this.result.rectDelta,
                X = a.rect || u.rect;
              (X.left += B.left),
                (X.right += B.right),
                (X.top += B.top),
                (X.bottom += B.bottom),
                (X.width = X.right - X.left),
                (X.height = X.bottom - X.top);
            },
          },
          {
            key: "setAndApply",
            value: function (a) {
              var u = this.interaction,
                p = a.phase,
                g = a.preEnd,
                h = a.skipModifiers,
                m = this.setAll(
                  this.fillArg({
                    preEnd: g,
                    phase: p,
                    pageCoords: a.modifiedCoords || u.coords.cur.page,
                  })
                );
              if (
                ((this.result = m),
                !m.changed && (!h || h < this.states.length) && u.interacting())
              )
                return !1;
              if (a.modifiedCoords) {
                var y = u.coords.cur.page,
                  w = {
                    x: a.modifiedCoords.x - y.x,
                    y: a.modifiedCoords.y - y.y,
                  };
                (m.coords.x += w.x),
                  (m.coords.y += w.y),
                  (m.delta.x += w.x),
                  (m.delta.y += w.y);
              }
              this.applyToInteraction(a);
            },
          },
          {
            key: "beforeEnd",
            value: function (a) {
              var u = a.interaction,
                p = a.event,
                g = this.states;
              if (g && g.length) {
                for (var h = !1, m = 0; m < g.length; m++) {
                  var y = g[m];
                  a.state = y;
                  var w = y.options,
                    x = y.methods,
                    C = x.beforeEnd && x.beforeEnd(a);
                  if (C) return (this.endResult = C), !1;
                  h = h || (!h && this.shouldDo(w, !0, a.phase, !0));
                }
                h && u.move({ event: p, preEnd: !0 });
              }
            },
          },
          {
            key: "stop",
            value: function (a) {
              var u = a.interaction;
              if (this.states && this.states.length) {
                var p = (0, J.default)(
                  {
                    states: this.states,
                    interactable: u.interactable,
                    element: u.element,
                    rect: null,
                  },
                  a
                );
                this.fillArg(p);
                for (var g = 0; g < this.states.length; g++) {
                  var h = this.states[g];
                  (p.state = h), h.methods.stop && h.methods.stop(p);
                }
                (this.states = null), (this.endResult = null);
              }
            },
          },
          {
            key: "prepareStates",
            value: function (a) {
              this.states = [];
              for (var u = 0; u < a.length; u++) {
                var p = a[u],
                  g = p.options,
                  h = p.methods,
                  m = p.name;
                this.states.push({ options: g, methods: h, index: u, name: m });
              }
              return this.states;
            },
          },
          {
            key: "restoreInteractionCoords",
            value: function (a) {
              var u = a.interaction,
                p = u.coords,
                g = u.rect,
                h = u.modification;
              if (h.result) {
                for (
                  var m = h.startDelta,
                    y = h.result,
                    w = y.delta,
                    x = y.rectDelta,
                    C = [
                      [p.start, m],
                      [p.cur, w],
                    ],
                    R = 0;
                  R < C.length;
                  R++
                ) {
                  var S = cl(C[R], 2),
                    B = S[0],
                    X = S[1];
                  (B.page.x -= X.x),
                    (B.page.y -= X.y),
                    (B.client.x -= X.x),
                    (B.client.y -= X.y);
                }
                (g.left -= x.left),
                  (g.right -= x.right),
                  (g.top -= x.top),
                  (g.bottom -= x.bottom);
              }
            },
          },
          {
            key: "shouldDo",
            value: function (a, u, p, g) {
              return !(
                !a ||
                a.enabled === !1 ||
                (g && !a.endOnly) ||
                (a.endOnly && !u) ||
                (p === "start" && !a.setStart)
              );
            },
          },
          {
            key: "copyFrom",
            value: function (a) {
              (this.startOffset = a.startOffset),
                (this.startDelta = a.startDelta),
                (this.edges = a.edges),
                (this.states = a.states.map(function (u) {
                  return (0, kn.default)(u);
                })),
                (this.result = Nr(
                  (0, J.default)({}, a.result.coords),
                  (0, J.default)({}, a.result.rect)
                ));
            },
          },
          {
            key: "destroy",
            value: function () {
              for (var a in this) this[a] = null;
            },
          },
        ]) && xd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    function Nr(n, r) {
      return {
        rect: r,
        coords: n,
        delta: { x: 0, y: 0 },
        rectDelta: { left: 0, right: 0, top: 0, bottom: 0 },
        eventProps: [],
        changed: !0,
      };
    }
    function fl(n, r) {
      return n
        ? {
            left: r.x - n.left,
            top: r.y - n.top,
            right: n.right - r.x,
            bottom: n.bottom - r.y,
          }
        : { left: 0, top: 0, right: 0, bottom: 0 };
    }
    jn.default = Pd;
    var Ye = {};
    function Fr(n) {
      var r = n.iEvent,
        s = n.interaction.modification.result;
      s && (r.modifiers = s.eventProps);
    }
    Object.defineProperty(Ye, "__esModule", { value: !0 }),
      (Ye.addEventModifiers = Fr),
      (Ye.default = void 0),
      (Ye.makeModifier = function (n, r) {
        var s = n.defaults,
          a = {
            start: n.start,
            set: n.set,
            beforeEnd: n.beforeEnd,
            stop: n.stop,
          },
          u = function (p) {
            var g = p || {};
            for (var h in ((g.enabled = g.enabled !== !1), s))
              h in g || (g[h] = s[h]);
            var m = {
              options: g,
              methods: a,
              name: r,
              enable: function () {
                return (g.enabled = !0), m;
              },
              disable: function () {
                return (g.enabled = !1), m;
              },
            };
            return m;
          };
        return (
          r && typeof r == "string" && ((u._defaults = s), (u._methods = a)), u
        );
      });
    var Od = {
        id: "modifiers/base",
        before: ["actions"],
        install: function (n) {
          n.defaults.perAction.modifiers = [];
        },
        listeners: {
          "interactions:new": function (n) {
            var r = n.interaction;
            r.modification = new jn.default(r);
          },
          "interactions:before-action-start": function (n) {
            var r = n.interaction.modification;
            r.start(n, n.interaction.coords.start.page),
              (n.interaction.edges = r.edges),
              r.applyToInteraction(n);
          },
          "interactions:before-action-move": function (n) {
            return n.interaction.modification.setAndApply(n);
          },
          "interactions:before-action-end": function (n) {
            return n.interaction.modification.beforeEnd(n);
          },
          "interactions:action-start": Fr,
          "interactions:action-move": Fr,
          "interactions:action-end": Fr,
          "interactions:after-action-start": function (n) {
            return n.interaction.modification.restoreInteractionCoords(n);
          },
          "interactions:after-action-move": function (n) {
            return n.interaction.modification.restoreInteractionCoords(n);
          },
          "interactions:stop": function (n) {
            return n.interaction.modification.stop(n);
          },
        },
      },
      Ed = Od;
    Ye.default = Ed;
    var Wo = {};
    Object.defineProperty(Wo, "__esModule", { value: !0 }),
      (Wo.defaults = void 0),
      (Wo.defaults = {
        base: { preventDefault: "auto", deltaSource: "page" },
        perAction: { enabled: !1, origin: { x: 0, y: 0 } },
        actions: {},
      });
    var Vo = {};
    function fs(n) {
      return (
        (fs =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        fs(n)
      );
    }
    function Sd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function ds(n, r) {
      return (
        (ds = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (s, a) {
              return (s.__proto__ = a), s;
            }),
        ds(n, r)
      );
    }
    function Td(n, r) {
      if (r && (fs(r) === "object" || typeof r == "function")) return r;
      if (r !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return Ce(n);
    }
    function Ce(n) {
      if (n === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return n;
    }
    function Br(n) {
      return (
        (Br = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (r) {
              return r.__proto__ || Object.getPrototypeOf(r);
            }),
        Br(n)
      );
    }
    function ze(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(Vo, "__esModule", { value: !0 }),
      (Vo.InteractEvent = void 0);
    var dl = (function (n) {
      (function (h, m) {
        if (typeof m != "function" && m !== null)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (h.prototype = Object.create(m && m.prototype, {
          constructor: { value: h, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(h, "prototype", { writable: !1 }),
          m && ds(h, m);
      })(g, n);
      var r,
        s,
        a,
        u,
        p =
          ((a = g),
          (u = (function () {
            if (
              typeof Reflect > "u" ||
              !Reflect.construct ||
              Reflect.construct.sham
            )
              return !1;
            if (typeof Proxy == "function") return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch {
              return !1;
            }
          })()),
          function () {
            var h,
              m = Br(a);
            if (u) {
              var y = Br(this).constructor;
              h = Reflect.construct(m, arguments, y);
            } else h = m.apply(this, arguments);
            return Td(this, h);
          });
      function g(h, m, y, w, x, C, R) {
        var S;
        (function (Re, ve) {
          if (!(Re instanceof ve))
            throw new TypeError("Cannot call a class as a function");
        })(this, g),
          ze(Ce((S = p.call(this, h))), "relatedTarget", null),
          ze(Ce(S), "screenX", void 0),
          ze(Ce(S), "screenY", void 0),
          ze(Ce(S), "button", void 0),
          ze(Ce(S), "buttons", void 0),
          ze(Ce(S), "ctrlKey", void 0),
          ze(Ce(S), "shiftKey", void 0),
          ze(Ce(S), "altKey", void 0),
          ze(Ce(S), "metaKey", void 0),
          ze(Ce(S), "page", void 0),
          ze(Ce(S), "client", void 0),
          ze(Ce(S), "delta", void 0),
          ze(Ce(S), "rect", void 0),
          ze(Ce(S), "x0", void 0),
          ze(Ce(S), "y0", void 0),
          ze(Ce(S), "t0", void 0),
          ze(Ce(S), "dt", void 0),
          ze(Ce(S), "duration", void 0),
          ze(Ce(S), "clientX0", void 0),
          ze(Ce(S), "clientY0", void 0),
          ze(Ce(S), "velocity", void 0),
          ze(Ce(S), "speed", void 0),
          ze(Ce(S), "swipe", void 0),
          ze(Ce(S), "axes", void 0),
          ze(Ce(S), "preEnd", void 0),
          (x = x || h.element);
        var B = h.interactable,
          X = ((B && B.options) || Wo.defaults).deltaSource,
          H = (0, rt.default)(B, x, y),
          ne = w === "start",
          le = w === "end",
          pe = ne ? Ce(S) : h.prevEvent,
          Ee = ne
            ? h.coords.start
            : le
            ? {
                page: pe.page,
                client: pe.client,
                timeStamp: h.coords.cur.timeStamp,
              }
            : h.coords.cur;
        return (
          (S.page = (0, J.default)({}, Ee.page)),
          (S.client = (0, J.default)({}, Ee.client)),
          (S.rect = (0, J.default)({}, h.rect)),
          (S.timeStamp = Ee.timeStamp),
          le ||
            ((S.page.x -= H.x),
            (S.page.y -= H.y),
            (S.client.x -= H.x),
            (S.client.y -= H.y)),
          (S.ctrlKey = m.ctrlKey),
          (S.altKey = m.altKey),
          (S.shiftKey = m.shiftKey),
          (S.metaKey = m.metaKey),
          (S.button = m.button),
          (S.buttons = m.buttons),
          (S.target = x),
          (S.currentTarget = x),
          (S.preEnd = C),
          (S.type = R || y + (w || "")),
          (S.interactable = B),
          (S.t0 = ne ? h.pointers[h.pointers.length - 1].downTime : pe.t0),
          (S.x0 = h.coords.start.page.x - H.x),
          (S.y0 = h.coords.start.page.y - H.y),
          (S.clientX0 = h.coords.start.client.x - H.x),
          (S.clientY0 = h.coords.start.client.y - H.y),
          (S.delta =
            ne || le
              ? { x: 0, y: 0 }
              : { x: S[X].x - pe[X].x, y: S[X].y - pe[X].y }),
          (S.dt = h.coords.delta.timeStamp),
          (S.duration = S.timeStamp - S.t0),
          (S.velocity = (0, J.default)({}, h.coords.velocity[X])),
          (S.speed = (0, Ve.default)(S.velocity.x, S.velocity.y)),
          (S.swipe = le || w === "inertiastart" ? S.getSwipe() : null),
          S
        );
      }
      return (
        (r = g),
        (s = [
          {
            key: "getSwipe",
            value: function () {
              var h = this._interaction;
              if (
                h.prevEvent.speed < 600 ||
                this.timeStamp - h.prevEvent.timeStamp > 150
              )
                return null;
              var m =
                (180 *
                  Math.atan2(h.prevEvent.velocityY, h.prevEvent.velocityX)) /
                Math.PI;
              m < 0 && (m += 360);
              var y = 112.5 <= m && m < 247.5,
                w = 202.5 <= m && m < 337.5;
              return {
                up: w,
                down: !w && 22.5 <= m && m < 157.5,
                left: y,
                right: !y && (292.5 <= m || m < 67.5),
                angle: m,
                speed: h.prevEvent.speed,
                velocity: {
                  x: h.prevEvent.velocityX,
                  y: h.prevEvent.velocityY,
                },
              };
            },
          },
          { key: "preventDefault", value: function () {} },
          {
            key: "stopImmediatePropagation",
            value: function () {
              this.immediatePropagationStopped = this.propagationStopped = !0;
            },
          },
          {
            key: "stopPropagation",
            value: function () {
              this.propagationStopped = !0;
            },
          },
        ]) && Sd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        g
      );
    })(Rt.BaseEvent);
    (Vo.InteractEvent = dl),
      Object.defineProperties(dl.prototype, {
        pageX: {
          get: function () {
            return this.page.x;
          },
          set: function (n) {
            this.page.x = n;
          },
        },
        pageY: {
          get: function () {
            return this.page.y;
          },
          set: function (n) {
            this.page.y = n;
          },
        },
        clientX: {
          get: function () {
            return this.client.x;
          },
          set: function (n) {
            this.client.x = n;
          },
        },
        clientY: {
          get: function () {
            return this.client.y;
          },
          set: function (n) {
            this.client.y = n;
          },
        },
        dx: {
          get: function () {
            return this.delta.x;
          },
          set: function (n) {
            this.delta.x = n;
          },
        },
        dy: {
          get: function () {
            return this.delta.y;
          },
          set: function (n) {
            this.delta.y = n;
          },
        },
        velocityX: {
          get: function () {
            return this.velocity.x;
          },
          set: function (n) {
            this.velocity.x = n;
          },
        },
        velocityY: {
          get: function () {
            return this.velocity.y;
          },
          set: function (n) {
            this.velocity.y = n;
          },
        },
      });
    var qo = {};
    function pl(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function $d(n, r, s) {
      return (
        r && pl(n.prototype, r),
        s && pl(n, s),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        n
      );
    }
    function Ko(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(qo, "__esModule", { value: !0 }),
      (qo.PointerInfo = void 0);
    var Cd = $d(function n(r, s, a, u, p) {
      (function (g, h) {
        if (!(g instanceof h))
          throw new TypeError("Cannot call a class as a function");
      })(this, n),
        Ko(this, "id", void 0),
        Ko(this, "pointer", void 0),
        Ko(this, "event", void 0),
        Ko(this, "downTime", void 0),
        Ko(this, "downTarget", void 0),
        (this.id = r),
        (this.pointer = s),
        (this.event = a),
        (this.downTime = u),
        (this.downTarget = p);
    });
    qo.PointerInfo = Cd;
    var Hr,
      Ur,
      pt = {};
    function Md(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Ne(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(pt, "__esModule", { value: !0 }),
      (pt.Interaction = void 0),
      Object.defineProperty(pt, "PointerInfo", {
        enumerable: !0,
        get: function () {
          return qo.PointerInfo;
        },
      }),
      (pt.default = pt._ProxyValues = pt._ProxyMethods = void 0),
      (pt._ProxyValues = Hr),
      (function (n) {
        (n.interactable = ""),
          (n.element = ""),
          (n.prepared = ""),
          (n.pointerIsDown = ""),
          (n.pointerWasMoved = ""),
          (n._proxy = "");
      })(Hr || (pt._ProxyValues = Hr = {})),
      (pt._ProxyMethods = Ur),
      (function (n) {
        (n.start = ""),
          (n.move = ""),
          (n.end = ""),
          (n.stop = ""),
          (n.interacting = "");
      })(Ur || (pt._ProxyMethods = Ur = {}));
    var Ad = 0,
      hl = (function () {
        function n(a) {
          var u = this,
            p = a.pointerType,
            g = a.scopeFire;
          (function (C, R) {
            if (!(C instanceof R))
              throw new TypeError("Cannot call a class as a function");
          })(this, n),
            Ne(this, "interactable", null),
            Ne(this, "element", null),
            Ne(this, "rect", null),
            Ne(this, "_rects", void 0),
            Ne(this, "edges", null),
            Ne(this, "_scopeFire", void 0),
            Ne(this, "prepared", { name: null, axis: null, edges: null }),
            Ne(this, "pointerType", void 0),
            Ne(this, "pointers", []),
            Ne(this, "downEvent", null),
            Ne(this, "downPointer", {}),
            Ne(this, "_latestPointer", {
              pointer: null,
              event: null,
              eventTarget: null,
            }),
            Ne(this, "prevEvent", null),
            Ne(this, "pointerIsDown", !1),
            Ne(this, "pointerWasMoved", !1),
            Ne(this, "_interacting", !1),
            Ne(this, "_ending", !1),
            Ne(this, "_stopped", !0),
            Ne(this, "_proxy", null),
            Ne(this, "simulation", null),
            Ne(
              this,
              "doMove",
              (0, bt.warnOnce)(function (C) {
                this.move(C);
              }, "The interaction.doMove() method has been renamed to interaction.move()")
            ),
            Ne(this, "coords", {
              start: te.newCoords(),
              prev: te.newCoords(),
              cur: te.newCoords(),
              delta: te.newCoords(),
              velocity: te.newCoords(),
            }),
            Ne(this, "_id", Ad++),
            (this._scopeFire = g),
            (this.pointerType = p);
          var h = this;
          this._proxy = {};
          var m = function (C) {
            Object.defineProperty(u._proxy, C, {
              get: function () {
                return h[C];
              },
            });
          };
          for (var y in Hr) m(y);
          var w = function (C) {
            Object.defineProperty(u._proxy, C, {
              value: function () {
                return h[C].apply(h, arguments);
              },
            });
          };
          for (var x in Ur) w(x);
          this._scopeFire("interactions:new", { interaction: this });
        }
        var r, s;
        return (
          (r = n),
          (s = [
            {
              key: "pointerMoveTolerance",
              get: function () {
                return 1;
              },
            },
            {
              key: "pointerDown",
              value: function (a, u, p) {
                var g = this.updatePointer(a, u, p, !0),
                  h = this.pointers[g];
                this._scopeFire("interactions:down", {
                  pointer: a,
                  event: u,
                  eventTarget: p,
                  pointerIndex: g,
                  pointerInfo: h,
                  type: "down",
                  interaction: this,
                });
              },
            },
            {
              key: "start",
              value: function (a, u, p) {
                return (
                  !(
                    this.interacting() ||
                    !this.pointerIsDown ||
                    this.pointers.length < (a.name === "gesture" ? 2 : 1) ||
                    !u.options[a.name].enabled
                  ) &&
                  ((0, bt.copyAction)(this.prepared, a),
                  (this.interactable = u),
                  (this.element = p),
                  (this.rect = u.getRect(p)),
                  (this.edges = this.prepared.edges
                    ? (0, J.default)({}, this.prepared.edges)
                    : { left: !0, right: !0, top: !0, bottom: !0 }),
                  (this._stopped = !1),
                  (this._interacting =
                    this._doPhase({
                      interaction: this,
                      event: this.downEvent,
                      phase: "start",
                    }) && !this._stopped),
                  this._interacting)
                );
              },
            },
            {
              key: "pointerMove",
              value: function (a, u, p) {
                this.simulation ||
                  (this.modification && this.modification.endResult) ||
                  this.updatePointer(a, u, p, !1);
                var g,
                  h,
                  m =
                    this.coords.cur.page.x === this.coords.prev.page.x &&
                    this.coords.cur.page.y === this.coords.prev.page.y &&
                    this.coords.cur.client.x === this.coords.prev.client.x &&
                    this.coords.cur.client.y === this.coords.prev.client.y;
                this.pointerIsDown &&
                  !this.pointerWasMoved &&
                  ((g = this.coords.cur.client.x - this.coords.start.client.x),
                  (h = this.coords.cur.client.y - this.coords.start.client.y),
                  (this.pointerWasMoved =
                    (0, Ve.default)(g, h) > this.pointerMoveTolerance));
                var y = this.getPointerIndex(a),
                  w = {
                    pointer: a,
                    pointerIndex: y,
                    pointerInfo: this.pointers[y],
                    event: u,
                    type: "move",
                    eventTarget: p,
                    dx: g,
                    dy: h,
                    duplicate: m,
                    interaction: this,
                  };
                m ||
                  te.setCoordVelocity(this.coords.velocity, this.coords.delta),
                  this._scopeFire("interactions:move", w),
                  m ||
                    this.simulation ||
                    (this.interacting() && ((w.type = null), this.move(w)),
                    this.pointerWasMoved &&
                      te.copyCoords(this.coords.prev, this.coords.cur));
              },
            },
            {
              key: "move",
              value: function (a) {
                (a && a.event) || te.setZeroCoords(this.coords.delta),
                  ((a = (0, J.default)(
                    {
                      pointer: this._latestPointer.pointer,
                      event: this._latestPointer.event,
                      eventTarget: this._latestPointer.eventTarget,
                      interaction: this,
                    },
                    a || {}
                  )).phase = "move"),
                  this._doPhase(a);
              },
            },
            {
              key: "pointerUp",
              value: function (a, u, p, g) {
                var h = this.getPointerIndex(a);
                h === -1 && (h = this.updatePointer(a, u, p, !1));
                var m = /cancel$/i.test(u.type) ? "cancel" : "up";
                this._scopeFire("interactions:".concat(m), {
                  pointer: a,
                  pointerIndex: h,
                  pointerInfo: this.pointers[h],
                  event: u,
                  eventTarget: p,
                  type: m,
                  curEventTarget: g,
                  interaction: this,
                }),
                  this.simulation || this.end(u),
                  this.removePointer(a, u);
              },
            },
            {
              key: "documentBlur",
              value: function (a) {
                this.end(a),
                  this._scopeFire("interactions:blur", {
                    event: a,
                    type: "blur",
                    interaction: this,
                  });
              },
            },
            {
              key: "end",
              value: function (a) {
                var u;
                (this._ending = !0),
                  (a = a || this._latestPointer.event),
                  this.interacting() &&
                    (u = this._doPhase({
                      event: a,
                      interaction: this,
                      phase: "end",
                    })),
                  (this._ending = !1),
                  u === !0 && this.stop();
              },
            },
            {
              key: "currentAction",
              value: function () {
                return this._interacting ? this.prepared.name : null;
              },
            },
            {
              key: "interacting",
              value: function () {
                return this._interacting;
              },
            },
            {
              key: "stop",
              value: function () {
                this._scopeFire("interactions:stop", { interaction: this }),
                  (this.interactable = this.element = null),
                  (this._interacting = !1),
                  (this._stopped = !0),
                  (this.prepared.name = this.prevEvent = null);
              },
            },
            {
              key: "getPointerIndex",
              value: function (a) {
                var u = te.getPointerId(a);
                return this.pointerType === "mouse" ||
                  this.pointerType === "pen"
                  ? this.pointers.length - 1
                  : A.findIndex(this.pointers, function (p) {
                      return p.id === u;
                    });
              },
            },
            {
              key: "getPointerInfo",
              value: function (a) {
                return this.pointers[this.getPointerIndex(a)];
              },
            },
            {
              key: "updatePointer",
              value: function (a, u, p, g) {
                var h = te.getPointerId(a),
                  m = this.getPointerIndex(a),
                  y = this.pointers[m];
                return (
                  (g = g !== !1 && (g || /(down|start)$/i.test(u.type))),
                  y
                    ? (y.pointer = a)
                    : ((y = new qo.PointerInfo(h, a, u, null, null)),
                      (m = this.pointers.length),
                      this.pointers.push(y)),
                  te.setCoords(
                    this.coords.cur,
                    this.pointers.map(function (w) {
                      return w.pointer;
                    }),
                    this._now()
                  ),
                  te.setCoordDeltas(
                    this.coords.delta,
                    this.coords.prev,
                    this.coords.cur
                  ),
                  g &&
                    ((this.pointerIsDown = !0),
                    (y.downTime = this.coords.cur.timeStamp),
                    (y.downTarget = p),
                    te.pointerExtend(this.downPointer, a),
                    this.interacting() ||
                      (te.copyCoords(this.coords.start, this.coords.cur),
                      te.copyCoords(this.coords.prev, this.coords.cur),
                      (this.downEvent = u),
                      (this.pointerWasMoved = !1))),
                  this._updateLatestPointer(a, u, p),
                  this._scopeFire("interactions:update-pointer", {
                    pointer: a,
                    event: u,
                    eventTarget: p,
                    down: g,
                    pointerInfo: y,
                    pointerIndex: m,
                    interaction: this,
                  }),
                  m
                );
              },
            },
            {
              key: "removePointer",
              value: function (a, u) {
                var p = this.getPointerIndex(a);
                if (p !== -1) {
                  var g = this.pointers[p];
                  this._scopeFire("interactions:remove-pointer", {
                    pointer: a,
                    event: u,
                    eventTarget: null,
                    pointerIndex: p,
                    pointerInfo: g,
                    interaction: this,
                  }),
                    this.pointers.splice(p, 1),
                    (this.pointerIsDown = !1);
                }
              },
            },
            {
              key: "_updateLatestPointer",
              value: function (a, u, p) {
                (this._latestPointer.pointer = a),
                  (this._latestPointer.event = u),
                  (this._latestPointer.eventTarget = p);
              },
            },
            {
              key: "destroy",
              value: function () {
                (this._latestPointer.pointer = null),
                  (this._latestPointer.event = null),
                  (this._latestPointer.eventTarget = null);
              },
            },
            {
              key: "_createPreparedEvent",
              value: function (a, u, p, g) {
                return new Vo.InteractEvent(
                  this,
                  a,
                  this.prepared.name,
                  u,
                  this.element,
                  p,
                  g
                );
              },
            },
            {
              key: "_fireEvent",
              value: function (a) {
                var u;
                (u = this.interactable) == null || u.fire(a),
                  (!this.prevEvent ||
                    a.timeStamp >= this.prevEvent.timeStamp) &&
                    (this.prevEvent = a);
              },
            },
            {
              key: "_doPhase",
              value: function (a) {
                var u = a.event,
                  p = a.phase,
                  g = a.preEnd,
                  h = a.type,
                  m = this.rect;
                if (
                  (m &&
                    p === "move" &&
                    (de.addEdges(
                      this.edges,
                      m,
                      this.coords.delta[this.interactable.options.deltaSource]
                    ),
                    (m.width = m.right - m.left),
                    (m.height = m.bottom - m.top)),
                  this._scopeFire(
                    "interactions:before-action-".concat(p),
                    a
                  ) === !1)
                )
                  return !1;
                var y = (a.iEvent = this._createPreparedEvent(u, p, g, h));
                return (
                  this._scopeFire("interactions:action-".concat(p), a),
                  p === "start" && (this.prevEvent = y),
                  this._fireEvent(y),
                  this._scopeFire("interactions:after-action-".concat(p), a),
                  !0
                );
              },
            },
            {
              key: "_now",
              value: function () {
                return Date.now();
              },
            },
          ]),
          s && Md(r.prototype, s),
          Object.defineProperty(r, "prototype", { writable: !1 }),
          n
        );
      })();
    pt.Interaction = hl;
    var kd = hl;
    pt.default = kd;
    var un = {};
    function ml(n) {
      n.pointerIsDown &&
        (hs(n.coords.cur, n.offset.total),
        (n.offset.pending.x = 0),
        (n.offset.pending.y = 0));
    }
    function gl(n) {
      ps(n.interaction);
    }
    function ps(n) {
      if (
        !(function (s) {
          return !(!s.offset.pending.x && !s.offset.pending.y);
        })(n)
      )
        return !1;
      var r = n.offset.pending;
      return (
        hs(n.coords.cur, r),
        hs(n.coords.delta, r),
        de.addEdges(n.edges, n.rect, r),
        (r.x = 0),
        (r.y = 0),
        !0
      );
    }
    function jd(n) {
      var r = n.x,
        s = n.y;
      (this.offset.pending.x += r),
        (this.offset.pending.y += s),
        (this.offset.total.x += r),
        (this.offset.total.y += s);
    }
    function hs(n, r) {
      var s = n.page,
        a = n.client,
        u = r.x,
        p = r.y;
      (s.x += u), (s.y += p), (a.x += u), (a.y += p);
    }
    Object.defineProperty(un, "__esModule", { value: !0 }),
      (un.addTotal = ml),
      (un.applyPending = ps),
      (un.default = void 0),
      (pt._ProxyMethods.offsetBy = "");
    var Rd = {
        id: "offset",
        before: ["modifiers", "pointer-events", "actions", "inertia"],
        install: function (n) {
          n.Interaction.prototype.offsetBy = jd;
        },
        listeners: {
          "interactions:new": function (n) {
            n.interaction.offset = {
              total: { x: 0, y: 0 },
              pending: { x: 0, y: 0 },
            };
          },
          "interactions:update-pointer": function (n) {
            return ml(n.interaction);
          },
          "interactions:before-action-start": gl,
          "interactions:before-action-move": gl,
          "interactions:before-action-end": function (n) {
            var r = n.interaction;
            if (ps(r)) return r.move({ offset: !0 }), r.end(), !1;
          },
          "interactions:stop": function (n) {
            var r = n.interaction;
            (r.offset.total.x = 0),
              (r.offset.total.y = 0),
              (r.offset.pending.x = 0),
              (r.offset.pending.y = 0);
          },
        },
      },
      Id = Rd;
    un.default = Id;
    var In = {};
    function Dd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Ke(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(In, "__esModule", { value: !0 }),
      (In.default = In.InertiaState = void 0);
    var vl = (function () {
      function n(a) {
        (function (u, p) {
          if (!(u instanceof p))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          Ke(this, "active", !1),
          Ke(this, "isModified", !1),
          Ke(this, "smoothEnd", !1),
          Ke(this, "allowResume", !1),
          Ke(this, "modification", void 0),
          Ke(this, "modifierCount", 0),
          Ke(this, "modifierArg", void 0),
          Ke(this, "startCoords", void 0),
          Ke(this, "t0", 0),
          Ke(this, "v0", 0),
          Ke(this, "te", 0),
          Ke(this, "targetOffset", void 0),
          Ke(this, "modifiedOffset", void 0),
          Ke(this, "currentOffset", void 0),
          Ke(this, "lambda_v0", 0),
          Ke(this, "one_ve_v0", 0),
          Ke(this, "timeout", void 0),
          Ke(this, "interaction", void 0),
          (this.interaction = a);
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "start",
            value: function (a) {
              var u = this.interaction,
                p = Wr(u);
              if (!p || !p.enabled) return !1;
              var g = u.coords.velocity.client,
                h = (0, Ve.default)(g.x, g.y),
                m =
                  this.modification || (this.modification = new jn.default(u));
              if (
                (m.copyFrom(u.modification),
                (this.t0 = u._now()),
                (this.allowResume = p.allowResume),
                (this.v0 = h),
                (this.currentOffset = { x: 0, y: 0 }),
                (this.startCoords = u.coords.cur.page),
                (this.modifierArg = m.fillArg({
                  pageCoords: this.startCoords,
                  preEnd: !0,
                  phase: "inertiastart",
                })),
                this.t0 - u.coords.cur.timeStamp < 50 &&
                  h > p.minSpeed &&
                  h > p.endSpeed)
              )
                this.startInertia();
              else {
                if (
                  ((m.result = m.setAll(this.modifierArg)), !m.result.changed)
                )
                  return !1;
                this.startSmoothEnd();
              }
              return (
                (u.modification.result.rect = null),
                u.offsetBy(this.targetOffset),
                u._doPhase({ interaction: u, event: a, phase: "inertiastart" }),
                u.offsetBy({
                  x: -this.targetOffset.x,
                  y: -this.targetOffset.y,
                }),
                (u.modification.result.rect = null),
                (this.active = !0),
                (u.simulation = this),
                !0
              );
            },
          },
          {
            key: "startInertia",
            value: function () {
              var a = this,
                u = this.interaction.coords.velocity.client,
                p = Wr(this.interaction),
                g = p.resistance,
                h = -Math.log(p.endSpeed / this.v0) / g;
              (this.targetOffset = { x: (u.x - h) / g, y: (u.y - h) / g }),
                (this.te = h),
                (this.lambda_v0 = g / this.v0),
                (this.one_ve_v0 = 1 - p.endSpeed / this.v0);
              var m = this.modification,
                y = this.modifierArg;
              (y.pageCoords = {
                x: this.startCoords.x + this.targetOffset.x,
                y: this.startCoords.y + this.targetOffset.y,
              }),
                (m.result = m.setAll(y)),
                m.result.changed &&
                  ((this.isModified = !0),
                  (this.modifiedOffset = {
                    x: this.targetOffset.x + m.result.delta.x,
                    y: this.targetOffset.y + m.result.delta.y,
                  })),
                this.onNextFrame(function () {
                  return a.inertiaTick();
                });
            },
          },
          {
            key: "startSmoothEnd",
            value: function () {
              var a = this;
              (this.smoothEnd = !0),
                (this.isModified = !0),
                (this.targetOffset = {
                  x: this.modification.result.delta.x,
                  y: this.modification.result.delta.y,
                }),
                this.onNextFrame(function () {
                  return a.smoothEndTick();
                });
            },
          },
          {
            key: "onNextFrame",
            value: function (a) {
              var u = this;
              this.timeout = Tt.default.request(function () {
                u.active && a();
              });
            },
          },
          {
            key: "inertiaTick",
            value: function () {
              var a,
                u,
                p,
                g,
                h,
                m = this,
                y = this.interaction,
                w = Wr(y).resistance,
                x = (y._now() - this.t0) / 1e3;
              if (x < this.te) {
                var C,
                  R = 1 - (Math.exp(-w * x) - this.lambda_v0) / this.one_ve_v0;
                this.isModified
                  ? ((a = this.targetOffset.x),
                    (u = this.targetOffset.y),
                    (p = this.modifiedOffset.x),
                    (g = this.modifiedOffset.y),
                    (C = { x: yl((h = R), 0, a, p), y: yl(h, 0, u, g) }))
                  : (C = {
                      x: this.targetOffset.x * R,
                      y: this.targetOffset.y * R,
                    });
                var S = {
                  x: C.x - this.currentOffset.x,
                  y: C.y - this.currentOffset.y,
                };
                (this.currentOffset.x += S.x),
                  (this.currentOffset.y += S.y),
                  y.offsetBy(S),
                  y.move(),
                  this.onNextFrame(function () {
                    return m.inertiaTick();
                  });
              } else
                y.offsetBy({
                  x: this.modifiedOffset.x - this.currentOffset.x,
                  y: this.modifiedOffset.y - this.currentOffset.y,
                }),
                  this.end();
            },
          },
          {
            key: "smoothEndTick",
            value: function () {
              var a = this,
                u = this.interaction,
                p = u._now() - this.t0,
                g = Wr(u).smoothEndDuration;
              if (p < g) {
                var h = {
                    x: bl(p, 0, this.targetOffset.x, g),
                    y: bl(p, 0, this.targetOffset.y, g),
                  },
                  m = {
                    x: h.x - this.currentOffset.x,
                    y: h.y - this.currentOffset.y,
                  };
                (this.currentOffset.x += m.x),
                  (this.currentOffset.y += m.y),
                  u.offsetBy(m),
                  u.move({ skipModifiers: this.modifierCount }),
                  this.onNextFrame(function () {
                    return a.smoothEndTick();
                  });
              } else
                u.offsetBy({
                  x: this.targetOffset.x - this.currentOffset.x,
                  y: this.targetOffset.y - this.currentOffset.y,
                }),
                  this.end();
            },
          },
          {
            key: "resume",
            value: function (a) {
              var u = a.pointer,
                p = a.event,
                g = a.eventTarget,
                h = this.interaction;
              h.offsetBy({
                x: -this.currentOffset.x,
                y: -this.currentOffset.y,
              }),
                h.updatePointer(u, p, g, !0),
                h._doPhase({ interaction: h, event: p, phase: "resume" }),
                (0, te.copyCoords)(h.coords.prev, h.coords.cur),
                this.stop();
            },
          },
          {
            key: "end",
            value: function () {
              this.interaction.move(), this.interaction.end(), this.stop();
            },
          },
          {
            key: "stop",
            value: function () {
              (this.active = this.smoothEnd = !1),
                (this.interaction.simulation = null),
                Tt.default.cancel(this.timeout);
            },
          },
        ]) && Dd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    function Wr(n) {
      var r = n.interactable,
        s = n.prepared;
      return r && r.options && s.name && r.options[s.name].inertia;
    }
    In.InertiaState = vl;
    var zd = {
      id: "inertia",
      before: ["modifiers", "actions"],
      install: function (n) {
        var r = n.defaults;
        n.usePlugin(un.default),
          n.usePlugin(Ye.default),
          (n.actions.phases.inertiastart = !0),
          (n.actions.phases.resume = !0),
          (r.perAction.inertia = {
            enabled: !1,
            resistance: 10,
            minSpeed: 100,
            endSpeed: 10,
            allowResume: !0,
            smoothEndDuration: 300,
          });
      },
      listeners: {
        "interactions:new": function (n) {
          var r = n.interaction;
          r.inertia = new vl(r);
        },
        "interactions:before-action-end": function (n) {
          var r = n.interaction,
            s = n.event;
          return (
            (!r._interacting || r.simulation || !r.inertia.start(s)) && null
          );
        },
        "interactions:down": function (n) {
          var r = n.interaction,
            s = n.eventTarget,
            a = r.inertia;
          if (a.active)
            for (var u = s; d.default.element(u); ) {
              if (u === r.element) {
                a.resume(n);
                break;
              }
              u = U.parentNode(u);
            }
        },
        "interactions:stop": function (n) {
          var r = n.interaction.inertia;
          r.active && r.stop();
        },
        "interactions:before-action-resume": function (n) {
          var r = n.interaction.modification;
          r.stop(n),
            r.start(n, n.interaction.coords.cur.page),
            r.applyToInteraction(n);
        },
        "interactions:before-action-inertiastart": function (n) {
          return n.interaction.modification.setAndApply(n);
        },
        "interactions:action-resume": Ye.addEventModifiers,
        "interactions:action-inertiastart": Ye.addEventModifiers,
        "interactions:after-action-inertiastart": function (n) {
          return n.interaction.modification.restoreInteractionCoords(n);
        },
        "interactions:after-action-resume": function (n) {
          return n.interaction.modification.restoreInteractionCoords(n);
        },
      },
    };
    function yl(n, r, s, a) {
      var u = 1 - n;
      return u * u * r + 2 * u * n * s + n * n * a;
    }
    function bl(n, r, s, a) {
      return -s * (n /= a) * (n - 2) + r;
    }
    var Ld = zd;
    In.default = Ld;
    var Xo = {};
    function Nd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Yo(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    function wl(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        if (n.immediatePropagationStopped) break;
        a(n);
      }
    }
    Object.defineProperty(Xo, "__esModule", { value: !0 }),
      (Xo.Eventable = void 0);
    var Fd = (function () {
      function n(a) {
        (function (u, p) {
          if (!(u instanceof p))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          Yo(this, "options", void 0),
          Yo(this, "types", {}),
          Yo(this, "propagationStopped", !1),
          Yo(this, "immediatePropagationStopped", !1),
          Yo(this, "global", void 0),
          (this.options = (0, J.default)({}, a || {}));
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "fire",
            value: function (a) {
              var u,
                p = this.global;
              (u = this.types[a.type]) && wl(a, u),
                !a.propagationStopped && p && (u = p[a.type]) && wl(a, u);
            },
          },
          {
            key: "on",
            value: function (a, u) {
              var p = (0, Et.default)(a, u);
              for (a in p) this.types[a] = A.merge(this.types[a] || [], p[a]);
            },
          },
          {
            key: "off",
            value: function (a, u) {
              var p = (0, Et.default)(a, u);
              for (a in p) {
                var g = this.types[a];
                if (g && g.length)
                  for (var h = 0; h < p[a].length; h++) {
                    var m = p[a][h],
                      y = g.indexOf(m);
                    y !== -1 && g.splice(y, 1);
                  }
              }
            },
          },
          {
            key: "getRect",
            value: function (a) {
              return null;
            },
          },
        ]) && Nd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    Xo.Eventable = Fd;
    var Jo = {};
    Object.defineProperty(Jo, "__esModule", { value: !0 }),
      (Jo.default = function (n, r) {
        if (r.phaselessTypes[n]) return !0;
        for (var s in r.map)
          if (n.indexOf(s) === 0 && n.substr(s.length) in r.phases) return !0;
        return !1;
      });
    var ms = {};
    Object.defineProperty(ms, "__esModule", { value: !0 }),
      (ms.createInteractStatic = function (n) {
        var r = function s(a, u) {
          var p = n.interactables.get(a, u);
          return (
            p ||
              ((p = n.interactables.new(a, u)).events.global = s.globalEvents),
            p
          );
        };
        return (
          (r.getPointerAverage = te.pointerAverage),
          (r.getTouchBBox = te.touchBBox),
          (r.getTouchDistance = te.touchDistance),
          (r.getTouchAngle = te.touchAngle),
          (r.getElementRect = U.getElementRect),
          (r.getElementClientRect = U.getElementClientRect),
          (r.matchesSelector = U.matchesSelector),
          (r.closest = U.closest),
          (r.globalEvents = {}),
          (r.version = "1.10.17"),
          (r.scope = n),
          (r.use = function (s, a) {
            return this.scope.usePlugin(s, a), this;
          }),
          (r.isSet = function (s, a) {
            return !!this.scope.interactables.get(s, a && a.context);
          }),
          (r.on = (0, bt.warnOnce)(function (s, a, u) {
            if (
              (d.default.string(s) &&
                s.search(" ") !== -1 &&
                (s = s.trim().split(/ +/)),
              d.default.array(s))
            ) {
              for (var p = 0; p < s.length; p++) {
                var g = s[p];
                this.on(g, a, u);
              }
              return this;
            }
            if (d.default.object(s)) {
              for (var h in s) this.on(h, s[h], a);
              return this;
            }
            return (
              (0, Jo.default)(s, this.scope.actions)
                ? this.globalEvents[s]
                  ? this.globalEvents[s].push(a)
                  : (this.globalEvents[s] = [a])
                : this.scope.events.add(this.scope.document, s, a, {
                    options: u,
                  }),
              this
            );
          }, "The interact.on() method is being deprecated")),
          (r.off = (0, bt.warnOnce)(function (s, a, u) {
            if (
              (d.default.string(s) &&
                s.search(" ") !== -1 &&
                (s = s.trim().split(/ +/)),
              d.default.array(s))
            ) {
              for (var p = 0; p < s.length; p++) {
                var g = s[p];
                this.off(g, a, u);
              }
              return this;
            }
            if (d.default.object(s)) {
              for (var h in s) this.off(h, s[h], a);
              return this;
            }
            var m;
            return (
              (0, Jo.default)(s, this.scope.actions)
                ? s in this.globalEvents &&
                  (m = this.globalEvents[s].indexOf(a)) !== -1 &&
                  this.globalEvents[s].splice(m, 1)
                : this.scope.events.remove(this.scope.document, s, a, u),
              this
            );
          }, "The interact.off() method is being deprecated")),
          (r.debug = function () {
            return this.scope;
          }),
          (r.supportsTouch = function () {
            return ce.default.supportsTouch;
          }),
          (r.supportsPointerEvent = function () {
            return ce.default.supportsPointerEvent;
          }),
          (r.stop = function () {
            for (var s = 0; s < this.scope.interactions.list.length; s++)
              this.scope.interactions.list[s].stop();
            return this;
          }),
          (r.pointerMoveTolerance = function (s) {
            return d.default.number(s)
              ? ((this.scope.interactions.pointerMoveTolerance = s), this)
              : this.scope.interactions.pointerMoveTolerance;
          }),
          (r.addDocument = function (s, a) {
            this.scope.addDocument(s, a);
          }),
          (r.removeDocument = function (s) {
            this.scope.removeDocument(s);
          }),
          r
        );
      });
    var Vr = {};
    function Bd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Kt(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(Vr, "__esModule", { value: !0 }),
      (Vr.Interactable = void 0);
    var Hd = (function () {
      function n(a, u, p, g) {
        (function (h, m) {
          if (!(h instanceof m))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          Kt(this, "options", void 0),
          Kt(this, "_actions", void 0),
          Kt(this, "target", void 0),
          Kt(this, "events", new Xo.Eventable()),
          Kt(this, "_context", void 0),
          Kt(this, "_win", void 0),
          Kt(this, "_doc", void 0),
          Kt(this, "_scopeEvents", void 0),
          Kt(this, "_rectChecker", void 0),
          (this._actions = u.actions),
          (this.target = a),
          (this._context = u.context || p),
          (this._win = (0, i.getWindow)(
            (0, U.trySelector)(a) ? this._context : a
          )),
          (this._doc = this._win.document),
          (this._scopeEvents = g),
          this.set(u);
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "_defaults",
            get: function () {
              return { base: {}, perAction: {}, actions: {} };
            },
          },
          {
            key: "setOnEvents",
            value: function (a, u) {
              return (
                d.default.func(u.onstart) &&
                  this.on("".concat(a, "start"), u.onstart),
                d.default.func(u.onmove) &&
                  this.on("".concat(a, "move"), u.onmove),
                d.default.func(u.onend) &&
                  this.on("".concat(a, "end"), u.onend),
                d.default.func(u.oninertiastart) &&
                  this.on("".concat(a, "inertiastart"), u.oninertiastart),
                this
              );
            },
          },
          {
            key: "updatePerActionListeners",
            value: function (a, u, p) {
              (d.default.array(u) || d.default.object(u)) && this.off(a, u),
                (d.default.array(p) || d.default.object(p)) && this.on(a, p);
            },
          },
          {
            key: "setPerAction",
            value: function (a, u) {
              var p = this._defaults;
              for (var g in u) {
                var h = g,
                  m = this.options[a],
                  y = u[h];
                h === "listeners" &&
                  this.updatePerActionListeners(a, m.listeners, y),
                  d.default.array(y)
                    ? (m[h] = A.from(y))
                    : d.default.plainObject(y)
                    ? ((m[h] = (0, J.default)(m[h] || {}, (0, kn.default)(y))),
                      d.default.object(p.perAction[h]) &&
                        "enabled" in p.perAction[h] &&
                        (m[h].enabled = y.enabled !== !1))
                    : d.default.bool(y) && d.default.object(p.perAction[h])
                    ? (m[h].enabled = y)
                    : (m[h] = y);
              }
            },
          },
          {
            key: "getRect",
            value: function (a) {
              return (
                (a =
                  a || (d.default.element(this.target) ? this.target : null)),
                d.default.string(this.target) &&
                  (a = a || this._context.querySelector(this.target)),
                (0, U.getElementRect)(a)
              );
            },
          },
          {
            key: "rectChecker",
            value: function (a) {
              var u = this;
              return d.default.func(a)
                ? ((this._rectChecker = a),
                  (this.getRect = function (p) {
                    var g = (0, J.default)({}, u._rectChecker(p));
                    return (
                      "width" in g ||
                        ((g.width = g.right - g.left),
                        (g.height = g.bottom - g.top)),
                      g
                    );
                  }),
                  this)
                : a === null
                ? (delete this.getRect, delete this._rectChecker, this)
                : this.getRect;
            },
          },
          {
            key: "_backCompatOption",
            value: function (a, u) {
              if ((0, U.trySelector)(u) || d.default.object(u)) {
                for (var p in ((this.options[a] = u), this._actions.map))
                  this.options[p][a] = u;
                return this;
              }
              return this.options[a];
            },
          },
          {
            key: "origin",
            value: function (a) {
              return this._backCompatOption("origin", a);
            },
          },
          {
            key: "deltaSource",
            value: function (a) {
              return a === "page" || a === "client"
                ? ((this.options.deltaSource = a), this)
                : this.options.deltaSource;
            },
          },
          {
            key: "context",
            value: function () {
              return this._context;
            },
          },
          {
            key: "inContext",
            value: function (a) {
              return (
                this._context === a.ownerDocument ||
                (0, U.nodeContains)(this._context, a)
              );
            },
          },
          {
            key: "testIgnoreAllow",
            value: function (a, u, p) {
              return (
                !this.testIgnore(a.ignoreFrom, u, p) &&
                this.testAllow(a.allowFrom, u, p)
              );
            },
          },
          {
            key: "testAllow",
            value: function (a, u, p) {
              return (
                !a ||
                (!!d.default.element(p) &&
                  (d.default.string(a)
                    ? (0, U.matchesUpTo)(p, a, u)
                    : !!d.default.element(a) && (0, U.nodeContains)(a, p)))
              );
            },
          },
          {
            key: "testIgnore",
            value: function (a, u, p) {
              return (
                !(!a || !d.default.element(p)) &&
                (d.default.string(a)
                  ? (0, U.matchesUpTo)(p, a, u)
                  : !!d.default.element(a) && (0, U.nodeContains)(a, p))
              );
            },
          },
          {
            key: "fire",
            value: function (a) {
              return this.events.fire(a), this;
            },
          },
          {
            key: "_onOff",
            value: function (a, u, p, g) {
              d.default.object(u) &&
                !d.default.array(u) &&
                ((g = p), (p = null));
              var h = a === "on" ? "add" : "remove",
                m = (0, Et.default)(u, p);
              for (var y in m) {
                y === "wheel" && (y = ce.default.wheelEvent);
                for (var w = 0; w < m[y].length; w++) {
                  var x = m[y][w];
                  (0, Jo.default)(y, this._actions)
                    ? this.events[a](y, x)
                    : d.default.string(this.target)
                    ? this._scopeEvents["".concat(h, "Delegate")](
                        this.target,
                        this._context,
                        y,
                        x,
                        g
                      )
                    : this._scopeEvents[h](this.target, y, x, g);
                }
              }
              return this;
            },
          },
          {
            key: "on",
            value: function (a, u, p) {
              return this._onOff("on", a, u, p);
            },
          },
          {
            key: "off",
            value: function (a, u, p) {
              return this._onOff("off", a, u, p);
            },
          },
          {
            key: "set",
            value: function (a) {
              var u = this._defaults;
              for (var p in (d.default.object(a) || (a = {}),
              (this.options = (0, kn.default)(u.base)),
              this._actions.methodDict)) {
                var g = p,
                  h = this._actions.methodDict[g];
                (this.options[g] = {}),
                  this.setPerAction(
                    g,
                    (0, J.default)(
                      (0, J.default)({}, u.perAction),
                      u.actions[g]
                    )
                  ),
                  this[h](a[g]);
              }
              for (var m in a) d.default.func(this[m]) && this[m](a[m]);
              return this;
            },
          },
          {
            key: "unset",
            value: function () {
              if (d.default.string(this.target))
                for (var a in this._scopeEvents.delegatedEvents)
                  for (
                    var u = this._scopeEvents.delegatedEvents[a],
                      p = u.length - 1;
                    p >= 0;
                    p--
                  ) {
                    var g = u[p],
                      h = g.selector,
                      m = g.context,
                      y = g.listeners;
                    h === this.target && m === this._context && u.splice(p, 1);
                    for (var w = y.length - 1; w >= 0; w--)
                      this._scopeEvents.removeDelegate(
                        this.target,
                        this._context,
                        a,
                        y[w][0],
                        y[w][1]
                      );
                  }
              else this._scopeEvents.remove(this.target, "all");
            },
          },
        ]) && Bd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    Vr.Interactable = Hd;
    var qr = {};
    function Ud(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function gs(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(qr, "__esModule", { value: !0 }),
      (qr.InteractableSet = void 0);
    var Wd = (function () {
      function n(a) {
        var u = this;
        (function (p, g) {
          if (!(p instanceof g))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          gs(this, "list", []),
          gs(this, "selectorMap", {}),
          gs(this, "scope", void 0),
          (this.scope = a),
          a.addListeners({
            "interactable:unset": function (p) {
              var g = p.interactable,
                h = g.target,
                m = g._context,
                y = d.default.string(h) ? u.selectorMap[h] : h[u.scope.id],
                w = A.findIndex(y, function (x) {
                  return x.context === m;
                });
              y[w] && ((y[w].context = null), (y[w].interactable = null)),
                y.splice(w, 1);
            },
          });
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "new",
            value: function (a, u) {
              u = (0, J.default)(u || {}, { actions: this.scope.actions });
              var p = new this.scope.Interactable(
                  a,
                  u,
                  this.scope.document,
                  this.scope.events
                ),
                g = { context: p._context, interactable: p };
              return (
                this.scope.addDocument(p._doc),
                this.list.push(p),
                d.default.string(a)
                  ? (this.selectorMap[a] || (this.selectorMap[a] = []),
                    this.selectorMap[a].push(g))
                  : (p.target[this.scope.id] ||
                      Object.defineProperty(a, this.scope.id, {
                        value: [],
                        configurable: !0,
                      }),
                    a[this.scope.id].push(g)),
                this.scope.fire("interactable:new", {
                  target: a,
                  options: u,
                  interactable: p,
                  win: this.scope._win,
                }),
                p
              );
            },
          },
          {
            key: "get",
            value: function (a, u) {
              var p = (u && u.context) || this.scope.document,
                g = d.default.string(a),
                h = g ? this.selectorMap[a] : a[this.scope.id];
              if (!h) return null;
              var m = A.find(h, function (y) {
                return y.context === p && (g || y.interactable.inContext(a));
              });
              return m && m.interactable;
            },
          },
          {
            key: "forEachMatch",
            value: function (a, u) {
              for (var p = 0; p < this.list.length; p++) {
                var g = this.list[p],
                  h = void 0;
                if (
                  ((d.default.string(g.target)
                    ? d.default.element(a) && U.matchesSelector(a, g.target)
                    : a === g.target) &&
                    g.inContext(a) &&
                    (h = u(g)),
                  h !== void 0)
                )
                  return h;
              }
            },
          },
        ]) && Ud(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    qr.InteractableSet = Wd;
    var Kr = {};
    function Vd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function vs(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    function ys(n, r) {
      return (
        (function (s) {
          if (Array.isArray(s)) return s;
        })(n) ||
        (function (s, a) {
          var u =
            s == null
              ? null
              : (typeof Symbol < "u" && s[Symbol.iterator]) || s["@@iterator"];
          if (u != null) {
            var p,
              g,
              h = [],
              m = !0,
              y = !1;
            try {
              for (
                u = u.call(s);
                !(m = (p = u.next()).done) &&
                (h.push(p.value), !a || h.length !== a);
                m = !0
              );
            } catch (w) {
              (y = !0), (g = w);
            } finally {
              try {
                m || u.return == null || u.return();
              } finally {
                if (y) throw g;
              }
            }
            return h;
          }
        })(n, r) ||
        (function (s, a) {
          if (s) {
            if (typeof s == "string") return _l(s, a);
            var u = Object.prototype.toString.call(s).slice(8, -1);
            return (
              u === "Object" && s.constructor && (u = s.constructor.name),
              u === "Map" || u === "Set"
                ? Array.from(s)
                : u === "Arguments" ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)
                ? _l(s, a)
                : void 0
            );
          }
        })(n, r) ||
        (function () {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        })()
      );
    }
    function _l(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    Object.defineProperty(Kr, "__esModule", { value: !0 }),
      (Kr.default = void 0);
    var qd = (function () {
      function n(a) {
        (function (u, p) {
          if (!(u instanceof p))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          vs(this, "currentTarget", void 0),
          vs(this, "originalEvent", void 0),
          vs(this, "type", void 0),
          (this.originalEvent = a),
          (0, $n.default)(this, a);
      }
      var r, s;
      return (
        (r = n),
        (s = [
          {
            key: "preventOriginalDefault",
            value: function () {
              this.originalEvent.preventDefault();
            },
          },
          {
            key: "stopPropagation",
            value: function () {
              this.originalEvent.stopPropagation();
            },
          },
          {
            key: "stopImmediatePropagation",
            value: function () {
              this.originalEvent.stopImmediatePropagation();
            },
          },
        ]) && Vd(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        n
      );
    })();
    function Go(n) {
      if (!d.default.object(n)) return { capture: !!n, passive: !1 };
      var r = (0, J.default)({}, n);
      return (r.capture = !!n.capture), (r.passive = !!n.passive), r;
    }
    var Kd = {
      id: "events",
      install: function (n) {
        var r,
          s = [],
          a = {},
          u = [],
          p = {
            add: g,
            remove: h,
            addDelegate: function (w, x, C, R, S) {
              var B = Go(S);
              if (!a[C]) {
                a[C] = [];
                for (var X = 0; X < u.length; X++) {
                  var H = u[X];
                  g(H, C, m), g(H, C, y, !0);
                }
              }
              var ne = a[C],
                le = A.find(ne, function (pe) {
                  return pe.selector === w && pe.context === x;
                });
              le ||
                ((le = { selector: w, context: x, listeners: [] }),
                ne.push(le)),
                le.listeners.push([R, B]);
            },
            removeDelegate: function (w, x, C, R, S) {
              var B,
                X = Go(S),
                H = a[C],
                ne = !1;
              if (H)
                for (B = H.length - 1; B >= 0; B--) {
                  var le = H[B];
                  if (le.selector === w && le.context === x) {
                    for (
                      var pe = le.listeners, Ee = pe.length - 1;
                      Ee >= 0;
                      Ee--
                    ) {
                      var Re = ys(pe[Ee], 2),
                        ve = Re[0],
                        Me = Re[1],
                        xt = Me.capture,
                        Yt = Me.passive;
                      if (ve === R && xt === X.capture && Yt === X.passive) {
                        pe.splice(Ee, 1),
                          pe.length ||
                            (H.splice(B, 1), h(x, C, m), h(x, C, y, !0)),
                          (ne = !0);
                        break;
                      }
                    }
                    if (ne) break;
                  }
                }
            },
            delegateListener: m,
            delegateUseCapture: y,
            delegatedEvents: a,
            documents: u,
            targets: s,
            supportsOptions: !1,
            supportsPassive: !1,
          };
        function g(w, x, C, R) {
          var S = Go(R),
            B = A.find(s, function (X) {
              return X.eventTarget === w;
            });
          B || ((B = { eventTarget: w, events: {} }), s.push(B)),
            B.events[x] || (B.events[x] = []),
            w.addEventListener &&
              !A.contains(B.events[x], C) &&
              (w.addEventListener(x, C, p.supportsOptions ? S : S.capture),
              B.events[x].push(C));
        }
        function h(w, x, C, R) {
          var S = Go(R),
            B = A.findIndex(s, function (Ee) {
              return Ee.eventTarget === w;
            }),
            X = s[B];
          if (X && X.events)
            if (x !== "all") {
              var H = !1,
                ne = X.events[x];
              if (ne) {
                if (C === "all") {
                  for (var le = ne.length - 1; le >= 0; le--)
                    h(w, x, ne[le], S);
                  return;
                }
                for (var pe = 0; pe < ne.length; pe++)
                  if (ne[pe] === C) {
                    w.removeEventListener(
                      x,
                      C,
                      p.supportsOptions ? S : S.capture
                    ),
                      ne.splice(pe, 1),
                      ne.length === 0 && (delete X.events[x], (H = !0));
                    break;
                  }
              }
              H && !Object.keys(X.events).length && s.splice(B, 1);
            } else
              for (x in X.events) X.events.hasOwnProperty(x) && h(w, x, "all");
        }
        function m(w, x) {
          for (
            var C = Go(x),
              R = new qd(w),
              S = a[w.type],
              B = ys(te.getEventTargets(w), 1)[0],
              X = B;
            d.default.element(X);

          ) {
            for (var H = 0; H < S.length; H++) {
              var ne = S[H],
                le = ne.selector,
                pe = ne.context;
              if (
                U.matchesSelector(X, le) &&
                U.nodeContains(pe, B) &&
                U.nodeContains(pe, X)
              ) {
                var Ee = ne.listeners;
                R.currentTarget = X;
                for (var Re = 0; Re < Ee.length; Re++) {
                  var ve = ys(Ee[Re], 2),
                    Me = ve[0],
                    xt = ve[1],
                    Yt = xt.capture,
                    zs = xt.passive;
                  Yt === C.capture && zs === C.passive && Me(R);
                }
              }
            }
            X = U.parentNode(X);
          }
        }
        function y(w) {
          return m(w, !0);
        }
        return (
          (r = n.document) == null ||
            r.createElement("div").addEventListener("test", null, {
              get capture() {
                return (p.supportsOptions = !0);
              },
              get passive() {
                return (p.supportsPassive = !0);
              },
            }),
          (n.events = p),
          p
        );
      },
    };
    Kr.default = Kd;
    var Xr = {};
    Object.defineProperty(Xr, "__esModule", { value: !0 }),
      (Xr.default = void 0);
    var Yr = {
      methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
      search: function (n) {
        for (var r = 0; r < Yr.methodOrder.length; r++) {
          var s;
          s = Yr.methodOrder[r];
          var a = Yr[s](n);
          if (a) return a;
        }
        return null;
      },
      simulationResume: function (n) {
        var r = n.pointerType,
          s = n.eventType,
          a = n.eventTarget,
          u = n.scope;
        if (!/down|start/i.test(s)) return null;
        for (var p = 0; p < u.interactions.list.length; p++) {
          var g = u.interactions.list[p],
            h = a;
          if (g.simulation && g.simulation.allowResume && g.pointerType === r)
            for (; h; ) {
              if (h === g.element) return g;
              h = U.parentNode(h);
            }
        }
        return null;
      },
      mouseOrPen: function (n) {
        var r,
          s = n.pointerId,
          a = n.pointerType,
          u = n.eventType,
          p = n.scope;
        if (a !== "mouse" && a !== "pen") return null;
        for (var g = 0; g < p.interactions.list.length; g++) {
          var h = p.interactions.list[g];
          if (h.pointerType === a) {
            if (h.simulation && !xl(h, s)) continue;
            if (h.interacting()) return h;
            r || (r = h);
          }
        }
        if (r) return r;
        for (var m = 0; m < p.interactions.list.length; m++) {
          var y = p.interactions.list[m];
          if (!(y.pointerType !== a || (/down/i.test(u) && y.simulation)))
            return y;
        }
        return null;
      },
      hasPointer: function (n) {
        for (
          var r = n.pointerId, s = n.scope, a = 0;
          a < s.interactions.list.length;
          a++
        ) {
          var u = s.interactions.list[a];
          if (xl(u, r)) return u;
        }
        return null;
      },
      idle: function (n) {
        for (
          var r = n.pointerType, s = n.scope, a = 0;
          a < s.interactions.list.length;
          a++
        ) {
          var u = s.interactions.list[a];
          if (u.pointers.length === 1) {
            var p = u.interactable;
            if (p && (!p.options.gesture || !p.options.gesture.enabled))
              continue;
          } else if (u.pointers.length >= 2) continue;
          if (!u.interacting() && r === u.pointerType) return u;
        }
        return null;
      },
    };
    function xl(n, r) {
      return n.pointers.some(function (s) {
        return s.id === r;
      });
    }
    var Xd = Yr;
    Xr.default = Xd;
    var Jr = {};
    function bs(n) {
      return (
        (bs =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        bs(n)
      );
    }
    function Pl(n, r) {
      return (
        (function (s) {
          if (Array.isArray(s)) return s;
        })(n) ||
        (function (s, a) {
          var u =
            s == null
              ? null
              : (typeof Symbol < "u" && s[Symbol.iterator]) || s["@@iterator"];
          if (u != null) {
            var p,
              g,
              h = [],
              m = !0,
              y = !1;
            try {
              for (
                u = u.call(s);
                !(m = (p = u.next()).done) &&
                (h.push(p.value), !a || h.length !== a);
                m = !0
              );
            } catch (w) {
              (y = !0), (g = w);
            } finally {
              try {
                m || u.return == null || u.return();
              } finally {
                if (y) throw g;
              }
            }
            return h;
          }
        })(n, r) ||
        (function (s, a) {
          if (s) {
            if (typeof s == "string") return Ol(s, a);
            var u = Object.prototype.toString.call(s).slice(8, -1);
            return (
              u === "Object" && s.constructor && (u = s.constructor.name),
              u === "Map" || u === "Set"
                ? Array.from(s)
                : u === "Arguments" ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)
                ? Ol(s, a)
                : void 0
            );
          }
        })(n, r) ||
        (function () {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        })()
      );
    }
    function Ol(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    function Yd(n, r) {
      if (!(n instanceof r))
        throw new TypeError("Cannot call a class as a function");
    }
    function Jd(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function ws(n, r) {
      return (
        (ws = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (s, a) {
              return (s.__proto__ = a), s;
            }),
        ws(n, r)
      );
    }
    function Gd(n, r) {
      if (r && (bs(r) === "object" || typeof r == "function")) return r;
      if (r !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (s) {
        if (s === void 0)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return s;
      })(n);
    }
    function Gr(n) {
      return (
        (Gr = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (r) {
              return r.__proto__ || Object.getPrototypeOf(r);
            }),
        Gr(n)
      );
    }
    Object.defineProperty(Jr, "__esModule", { value: !0 }),
      (Jr.default = void 0);
    var _s = [
      "pointerDown",
      "pointerMove",
      "pointerUp",
      "updatePointer",
      "removePointer",
      "windowBlur",
    ];
    function El(n, r) {
      return function (s) {
        var a = r.interactions.list,
          u = te.getPointerType(s),
          p = Pl(te.getEventTargets(s), 2),
          g = p[0],
          h = p[1],
          m = [];
        if (/^touch/.test(s.type)) {
          r.prevTouchTime = r.now();
          for (var y = 0; y < s.changedTouches.length; y++) {
            var w = s.changedTouches[y],
              x = {
                pointer: w,
                pointerId: te.getPointerId(w),
                pointerType: u,
                eventType: s.type,
                eventTarget: g,
                curEventTarget: h,
                scope: r,
              },
              C = Sl(x);
            m.push([x.pointer, x.eventTarget, x.curEventTarget, C]);
          }
        } else {
          var R = !1;
          if (!ce.default.supportsPointerEvent && /mouse/.test(s.type)) {
            for (var S = 0; S < a.length && !R; S++)
              R = a[S].pointerType !== "mouse" && a[S].pointerIsDown;
            R = R || r.now() - r.prevTouchTime < 500 || s.timeStamp === 0;
          }
          if (!R) {
            var B = {
                pointer: s,
                pointerId: te.getPointerId(s),
                pointerType: u,
                eventType: s.type,
                curEventTarget: h,
                eventTarget: g,
                scope: r,
              },
              X = Sl(B);
            m.push([B.pointer, B.eventTarget, B.curEventTarget, X]);
          }
        }
        for (var H = 0; H < m.length; H++) {
          var ne = Pl(m[H], 4),
            le = ne[0],
            pe = ne[1],
            Ee = ne[2];
          ne[3][n](le, s, pe, Ee);
        }
      };
    }
    function Sl(n) {
      var r = n.pointerType,
        s = n.scope,
        a = { interaction: Xr.default.search(n), searchDetails: n };
      return (
        s.fire("interactions:find", a),
        a.interaction || s.interactions.new({ pointerType: r })
      );
    }
    function xs(n, r) {
      var s = n.doc,
        a = n.scope,
        u = n.options,
        p = a.interactions.docEvents,
        g = a.events,
        h = g[r];
      for (var m in (a.browser.isIOS &&
        !u.events &&
        (u.events = { passive: !1 }),
      g.delegatedEvents))
        h(s, m, g.delegateListener), h(s, m, g.delegateUseCapture, !0);
      for (var y = u && u.events, w = 0; w < p.length; w++) {
        var x = p[w];
        h(s, x.type, x.listener, y);
      }
    }
    var Qd = {
        id: "core/interactions",
        install: function (n) {
          for (var r = {}, s = 0; s < _s.length; s++) {
            var a = _s[s];
            r[a] = El(a, n);
          }
          var u,
            p = ce.default.pEventTypes;
          function g() {
            for (var h = 0; h < n.interactions.list.length; h++) {
              var m = n.interactions.list[h];
              if (
                m.pointerIsDown &&
                m.pointerType === "touch" &&
                !m._interacting
              )
                for (
                  var y = function () {
                      var x = m.pointers[w];
                      n.documents.some(function (C) {
                        var R = C.doc;
                        return (0, U.nodeContains)(R, x.downTarget);
                      }) || m.removePointer(x.pointer, x.event);
                    },
                    w = 0;
                  w < m.pointers.length;
                  w++
                )
                  y();
            }
          }
          (u = L.default.PointerEvent
            ? [
                { type: p.down, listener: g },
                { type: p.down, listener: r.pointerDown },
                { type: p.move, listener: r.pointerMove },
                { type: p.up, listener: r.pointerUp },
                { type: p.cancel, listener: r.pointerUp },
              ]
            : [
                { type: "mousedown", listener: r.pointerDown },
                { type: "mousemove", listener: r.pointerMove },
                { type: "mouseup", listener: r.pointerUp },
                { type: "touchstart", listener: g },
                { type: "touchstart", listener: r.pointerDown },
                { type: "touchmove", listener: r.pointerMove },
                { type: "touchend", listener: r.pointerUp },
                { type: "touchcancel", listener: r.pointerUp },
              ]).push({
            type: "blur",
            listener: function (h) {
              for (var m = 0; m < n.interactions.list.length; m++)
                n.interactions.list[m].documentBlur(h);
            },
          }),
            (n.prevTouchTime = 0),
            (n.Interaction = (function (h) {
              (function (S, B) {
                if (typeof B != "function" && B !== null)
                  throw new TypeError(
                    "Super expression must either be null or a function"
                  );
                (S.prototype = Object.create(B && B.prototype, {
                  constructor: { value: S, writable: !0, configurable: !0 },
                })),
                  Object.defineProperty(S, "prototype", { writable: !1 }),
                  B && ws(S, B);
              })(R, h);
              var m,
                y,
                w,
                x,
                C =
                  ((w = R),
                  (x = (function () {
                    if (
                      typeof Reflect > "u" ||
                      !Reflect.construct ||
                      Reflect.construct.sham
                    )
                      return !1;
                    if (typeof Proxy == "function") return !0;
                    try {
                      return (
                        Boolean.prototype.valueOf.call(
                          Reflect.construct(Boolean, [], function () {})
                        ),
                        !0
                      );
                    } catch {
                      return !1;
                    }
                  })()),
                  function () {
                    var S,
                      B = Gr(w);
                    if (x) {
                      var X = Gr(this).constructor;
                      S = Reflect.construct(B, arguments, X);
                    } else S = B.apply(this, arguments);
                    return Gd(this, S);
                  });
              function R() {
                return Yd(this, R), C.apply(this, arguments);
              }
              return (
                (m = R),
                (y = [
                  {
                    key: "pointerMoveTolerance",
                    get: function () {
                      return n.interactions.pointerMoveTolerance;
                    },
                    set: function (S) {
                      n.interactions.pointerMoveTolerance = S;
                    },
                  },
                  {
                    key: "_now",
                    value: function () {
                      return n.now();
                    },
                  },
                ]) && Jd(m.prototype, y),
                Object.defineProperty(m, "prototype", { writable: !1 }),
                R
              );
            })(pt.default)),
            (n.interactions = {
              list: [],
              new: function (h) {
                h.scopeFire = function (y, w) {
                  return n.fire(y, w);
                };
                var m = new n.Interaction(h);
                return n.interactions.list.push(m), m;
              },
              listeners: r,
              docEvents: u,
              pointerMoveTolerance: 1,
            }),
            n.usePlugin(An.default);
        },
        listeners: {
          "scope:add-document": function (n) {
            return xs(n, "add");
          },
          "scope:remove-document": function (n) {
            return xs(n, "remove");
          },
          "interactable:unset": function (n, r) {
            for (
              var s = n.interactable, a = r.interactions.list.length - 1;
              a >= 0;
              a--
            ) {
              var u = r.interactions.list[a];
              u.interactable === s &&
                (u.stop(),
                r.fire("interactions:destroy", { interaction: u }),
                u.destroy(),
                r.interactions.list.length > 2 &&
                  r.interactions.list.splice(a, 1));
            }
          },
        },
        onDocSignal: xs,
        doOnInteractions: El,
        methodNames: _s,
      },
      Zd = Qd;
    Jr.default = Zd;
    var Qo = {};
    function Ps(n) {
      return (
        (Ps =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        Ps(n)
      );
    }
    function Zo() {
      return (
        (Zo =
          typeof Reflect < "u" && Reflect.get
            ? Reflect.get.bind()
            : function (n, r, s) {
                var a = ep(n, r);
                if (a) {
                  var u = Object.getOwnPropertyDescriptor(a, r);
                  return u.get
                    ? u.get.call(arguments.length < 3 ? n : s)
                    : u.value;
                }
              }),
        Zo.apply(this, arguments)
      );
    }
    function ep(n, r) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(n, r) && (n = fn(n)) !== null;

      );
      return n;
    }
    function Os(n, r) {
      return (
        (Os = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (s, a) {
              return (s.__proto__ = a), s;
            }),
        Os(n, r)
      );
    }
    function tp(n, r) {
      if (r && (Ps(r) === "object" || typeof r == "function")) return r;
      if (r !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return (function (s) {
        if (s === void 0)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return s;
      })(n);
    }
    function fn(n) {
      return (
        (fn = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (r) {
              return r.__proto__ || Object.getPrototypeOf(r);
            }),
        fn(n)
      );
    }
    function Tl(n, r) {
      if (!(n instanceof r))
        throw new TypeError("Cannot call a class as a function");
    }
    function $l(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function Cl(n, r, s) {
      return (
        r && $l(n.prototype, r),
        s && $l(n, s),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        n
      );
    }
    function Je(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(Qo, "__esModule", { value: !0 }),
      (Qo.Scope = void 0),
      (Qo.initScope = Ml);
    var np = (function () {
      function n() {
        var r = this;
        Tl(this, n),
          Je(
            this,
            "id",
            "__interact_scope_".concat(Math.floor(100 * Math.random()))
          ),
          Je(this, "isInitialized", !1),
          Je(this, "listenerMaps", []),
          Je(this, "browser", ce.default),
          Je(this, "defaults", (0, kn.default)(Wo.defaults)),
          Je(this, "Eventable", Xo.Eventable),
          Je(this, "actions", {
            map: {},
            phases: { start: !0, move: !0, end: !0 },
            methodDict: {},
            phaselessTypes: {},
          }),
          Je(this, "interactStatic", (0, ms.createInteractStatic)(this)),
          Je(this, "InteractEvent", Vo.InteractEvent),
          Je(this, "Interactable", void 0),
          Je(this, "interactables", new qr.InteractableSet(this)),
          Je(this, "_win", void 0),
          Je(this, "document", void 0),
          Je(this, "window", void 0),
          Je(this, "documents", []),
          Je(this, "_plugins", { list: [], map: {} }),
          Je(this, "onWindowUnload", function (a) {
            return r.removeDocument(a.target);
          });
        var s = this;
        this.Interactable = (function (a) {
          (function (m, y) {
            if (typeof y != "function" && y !== null)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (m.prototype = Object.create(y && y.prototype, {
              constructor: { value: m, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(m, "prototype", { writable: !1 }),
              y && Os(m, y);
          })(h, a);
          var u,
            p,
            g =
              ((u = h),
              (p = (function () {
                if (
                  typeof Reflect > "u" ||
                  !Reflect.construct ||
                  Reflect.construct.sham
                )
                  return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  );
                } catch {
                  return !1;
                }
              })()),
              function () {
                var m,
                  y = fn(u);
                if (p) {
                  var w = fn(this).constructor;
                  m = Reflect.construct(y, arguments, w);
                } else m = y.apply(this, arguments);
                return tp(this, m);
              });
          function h() {
            return Tl(this, h), g.apply(this, arguments);
          }
          return (
            Cl(h, [
              {
                key: "_defaults",
                get: function () {
                  return s.defaults;
                },
              },
              {
                key: "set",
                value: function (m) {
                  return (
                    Zo(fn(h.prototype), "set", this).call(this, m),
                    s.fire("interactable:set", {
                      options: m,
                      interactable: this,
                    }),
                    this
                  );
                },
              },
              {
                key: "unset",
                value: function () {
                  Zo(fn(h.prototype), "unset", this).call(this);
                  var m = s.interactables.list.indexOf(this);
                  m < 0 ||
                    (Zo(fn(h.prototype), "unset", this).call(this),
                    s.interactables.list.splice(m, 1),
                    s.fire("interactable:unset", { interactable: this }));
                },
              },
            ]),
            h
          );
        })(Vr.Interactable);
      }
      return (
        Cl(n, [
          {
            key: "addListeners",
            value: function (r, s) {
              this.listenerMaps.push({ id: s, map: r });
            },
          },
          {
            key: "fire",
            value: function (r, s) {
              for (var a = 0; a < this.listenerMaps.length; a++) {
                var u = this.listenerMaps[a].map[r];
                if (u && u(s, this, r) === !1) return !1;
              }
            },
          },
          {
            key: "init",
            value: function (r) {
              return this.isInitialized ? this : Ml(this, r);
            },
          },
          {
            key: "pluginIsInstalled",
            value: function (r) {
              return (
                this._plugins.map[r.id] || this._plugins.list.indexOf(r) !== -1
              );
            },
          },
          {
            key: "usePlugin",
            value: function (r, s) {
              if (!this.isInitialized) return this;
              if (this.pluginIsInstalled(r)) return this;
              if (
                (r.id && (this._plugins.map[r.id] = r),
                this._plugins.list.push(r),
                r.install && r.install(this, s),
                r.listeners && r.before)
              ) {
                for (
                  var a = 0,
                    u = this.listenerMaps.length,
                    p = r.before.reduce(function (h, m) {
                      return (h[m] = !0), (h[Al(m)] = !0), h;
                    }, {});
                  a < u;
                  a++
                ) {
                  var g = this.listenerMaps[a].id;
                  if (p[g] || p[Al(g)]) break;
                }
                this.listenerMaps.splice(a, 0, { id: r.id, map: r.listeners });
              } else
                r.listeners &&
                  this.listenerMaps.push({ id: r.id, map: r.listeners });
              return this;
            },
          },
          {
            key: "addDocument",
            value: function (r, s) {
              if (this.getDocIndex(r) !== -1) return !1;
              var a = i.getWindow(r);
              (s = s ? (0, J.default)({}, s) : {}),
                this.documents.push({ doc: r, options: s }),
                this.events.documents.push(r),
                r !== this.document &&
                  this.events.add(a, "unload", this.onWindowUnload),
                this.fire("scope:add-document", {
                  doc: r,
                  window: a,
                  scope: this,
                  options: s,
                });
            },
          },
          {
            key: "removeDocument",
            value: function (r) {
              var s = this.getDocIndex(r),
                a = i.getWindow(r),
                u = this.documents[s].options;
              this.events.remove(a, "unload", this.onWindowUnload),
                this.documents.splice(s, 1),
                this.events.documents.splice(s, 1),
                this.fire("scope:remove-document", {
                  doc: r,
                  window: a,
                  scope: this,
                  options: u,
                });
            },
          },
          {
            key: "getDocIndex",
            value: function (r) {
              for (var s = 0; s < this.documents.length; s++)
                if (this.documents[s].doc === r) return s;
              return -1;
            },
          },
          {
            key: "getDocOptions",
            value: function (r) {
              var s = this.getDocIndex(r);
              return s === -1 ? null : this.documents[s].options;
            },
          },
          {
            key: "now",
            value: function () {
              return (this.window.Date || Date).now();
            },
          },
        ]),
        n
      );
    })();
    function Ml(n, r) {
      return (
        (n.isInitialized = !0),
        d.default.window(r) && i.init(r),
        L.default.init(r),
        ce.default.init(r),
        Tt.default.init(r),
        (n.window = r),
        (n.document = r.document),
        n.usePlugin(Jr.default),
        n.usePlugin(Kr.default),
        n
      );
    }
    function Al(n) {
      return n && n.replace(/\/.*$/, "");
    }
    Qo.Scope = np;
    var Ge = {};
    Object.defineProperty(Ge, "__esModule", { value: !0 }),
      (Ge.default = void 0);
    var kl = new Qo.Scope(),
      op = kl.interactStatic;
    Ge.default = op;
    var rp =
      typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : void 0;
    kl.init(rp);
    var Qr = {};
    Object.defineProperty(Qr, "__esModule", { value: !0 }),
      (Qr.default = void 0),
      (Qr.default = function () {});
    var Zr = {};
    Object.defineProperty(Zr, "__esModule", { value: !0 }),
      (Zr.default = void 0),
      (Zr.default = function () {});
    var ei = {};
    function jl(n, r) {
      return (
        (function (s) {
          if (Array.isArray(s)) return s;
        })(n) ||
        (function (s, a) {
          var u =
            s == null
              ? null
              : (typeof Symbol < "u" && s[Symbol.iterator]) || s["@@iterator"];
          if (u != null) {
            var p,
              g,
              h = [],
              m = !0,
              y = !1;
            try {
              for (
                u = u.call(s);
                !(m = (p = u.next()).done) &&
                (h.push(p.value), !a || h.length !== a);
                m = !0
              );
            } catch (w) {
              (y = !0), (g = w);
            } finally {
              try {
                m || u.return == null || u.return();
              } finally {
                if (y) throw g;
              }
            }
            return h;
          }
        })(n, r) ||
        (function (s, a) {
          if (s) {
            if (typeof s == "string") return Rl(s, a);
            var u = Object.prototype.toString.call(s).slice(8, -1);
            return (
              u === "Object" && s.constructor && (u = s.constructor.name),
              u === "Map" || u === "Set"
                ? Array.from(s)
                : u === "Arguments" ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)
                ? Rl(s, a)
                : void 0
            );
          }
        })(n, r) ||
        (function () {
          throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        })()
      );
    }
    function Rl(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    Object.defineProperty(ei, "__esModule", { value: !0 }),
      (ei.default = void 0),
      (ei.default = function (n) {
        var r = [
            ["x", "y"],
            ["left", "top"],
            ["right", "bottom"],
            ["width", "height"],
          ].filter(function (a) {
            var u = jl(a, 2),
              p = u[0],
              g = u[1];
            return p in n || g in n;
          }),
          s = function (a, u) {
            for (
              var p = n.range,
                g = n.limits,
                h =
                  g === void 0
                    ? { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 }
                    : g,
                m = n.offset,
                y = m === void 0 ? { x: 0, y: 0 } : m,
                w = { range: p, grid: n, x: null, y: null },
                x = 0;
              x < r.length;
              x++
            ) {
              var C = jl(r[x], 2),
                R = C[0],
                S = C[1],
                B = Math.round((a - y.x) / n[R]),
                X = Math.round((u - y.y) / n[S]);
              (w[R] = Math.max(h.left, Math.min(h.right, B * n[R] + y.x))),
                (w[S] = Math.max(h.top, Math.min(h.bottom, X * n[S] + y.y)));
            }
            return w;
          };
        return (s.grid = n), (s.coordFields = r), s;
      });
    var er = {};
    Object.defineProperty(er, "__esModule", { value: !0 }),
      Object.defineProperty(er, "edgeTarget", {
        enumerable: !0,
        get: function () {
          return Qr.default;
        },
      }),
      Object.defineProperty(er, "elements", {
        enumerable: !0,
        get: function () {
          return Zr.default;
        },
      }),
      Object.defineProperty(er, "grid", {
        enumerable: !0,
        get: function () {
          return ei.default;
        },
      });
    var ti = {};
    Object.defineProperty(ti, "__esModule", { value: !0 }),
      (ti.default = void 0);
    var ip = {
        id: "snappers",
        install: function (n) {
          var r = n.interactStatic;
          (r.snappers = (0, J.default)(r.snappers || {}, er)),
            (r.createSnapGrid = r.snappers.grid);
        },
      },
      sp = ip;
    ti.default = sp;
    var ao = {};
    function Il(n, r) {
      var s = Object.keys(n);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(n);
        r &&
          (a = a.filter(function (u) {
            return Object.getOwnPropertyDescriptor(n, u).enumerable;
          })),
          s.push.apply(s, a);
      }
      return s;
    }
    function Es(n) {
      for (var r = 1; r < arguments.length; r++) {
        var s = arguments[r] != null ? arguments[r] : {};
        r % 2
          ? Il(Object(s), !0).forEach(function (a) {
              ap(n, a, s[a]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(s))
          : Il(Object(s)).forEach(function (a) {
              Object.defineProperty(
                n,
                a,
                Object.getOwnPropertyDescriptor(s, a)
              );
            });
      }
      return n;
    }
    function ap(n, r, s) {
      return (
        r in n
          ? Object.defineProperty(n, r, {
              value: s,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (n[r] = s),
        n
      );
    }
    Object.defineProperty(ao, "__esModule", { value: !0 }),
      (ao.default = ao.aspectRatio = void 0);
    var Dl = {
      start: function (n) {
        var r = n.state,
          s = n.rect,
          a = n.edges,
          u = n.pageCoords,
          p = r.options.ratio,
          g = r.options,
          h = g.equalDelta,
          m = g.modifiers;
        p === "preserve" && (p = s.width / s.height),
          (r.startCoords = (0, J.default)({}, u)),
          (r.startRect = (0, J.default)({}, s)),
          (r.ratio = p),
          (r.equalDelta = h);
        var y = (r.linkedEdges = {
          top: a.top || (a.left && !a.bottom),
          left: a.left || (a.top && !a.right),
          bottom: a.bottom || (a.right && !a.top),
          right: a.right || (a.bottom && !a.left),
        });
        if (((r.xIsPrimaryAxis = !(!a.left && !a.right)), r.equalDelta)) {
          var w = (y.left ? 1 : -1) * (y.top ? 1 : -1);
          r.edgeSign = { x: w, y: w };
        } else r.edgeSign = { x: y.left ? -1 : 1, y: y.top ? -1 : 1 };
        if (((0, J.default)(n.edges, y), m && m.length)) {
          var x = new jn.default(n.interaction);
          x.copyFrom(n.interaction.modification),
            x.prepareStates(m),
            (r.subModification = x),
            x.startAll(Es({}, n));
        }
      },
      set: function (n) {
        var r = n.state,
          s = n.rect,
          a = n.coords,
          u = (0, J.default)({}, a),
          p = r.equalDelta ? lp : cp;
        if ((p(r, r.xIsPrimaryAxis, a, s), !r.subModification)) return null;
        var g = (0, J.default)({}, s);
        (0, de.addEdges)(r.linkedEdges, g, { x: a.x - u.x, y: a.y - u.y });
        var h = r.subModification.setAll(
            Es(
              Es({}, n),
              {},
              {
                rect: g,
                edges: r.linkedEdges,
                pageCoords: a,
                prevCoords: a,
                prevRect: g,
              }
            )
          ),
          m = h.delta;
        return (
          h.changed &&
            (p(r, Math.abs(m.x) > Math.abs(m.y), h.coords, h.rect),
            (0, J.default)(a, h.coords)),
          h.eventProps
        );
      },
      defaults: {
        ratio: "preserve",
        equalDelta: !1,
        modifiers: [],
        enabled: !1,
      },
    };
    function lp(n, r, s) {
      var a = n.startCoords,
        u = n.edgeSign;
      r ? (s.y = a.y + (s.x - a.x) * u.y) : (s.x = a.x + (s.y - a.y) * u.x);
    }
    function cp(n, r, s, a) {
      var u = n.startRect,
        p = n.startCoords,
        g = n.ratio,
        h = n.edgeSign;
      if (r) {
        var m = a.width / g;
        s.y = p.y + (m - u.height) * h.y;
      } else {
        var y = a.height * g;
        s.x = p.x + (y - u.width) * h.x;
      }
    }
    ao.aspectRatio = Dl;
    var up = (0, Ye.makeModifier)(Dl, "aspectRatio");
    ao.default = up;
    var Dn = {};
    Object.defineProperty(Dn, "__esModule", { value: !0 }),
      (Dn.default = void 0);
    var zl = function () {};
    zl._defaults = {};
    var fp = zl;
    Dn.default = fp;
    var Ss = {};
    Object.defineProperty(Ss, "__esModule", { value: !0 }),
      Object.defineProperty(Ss, "default", {
        enumerable: !0,
        get: function () {
          return Dn.default;
        },
      });
    var lt = {};
    function Ts(n, r, s) {
      return d.default.func(n)
        ? de.resolveRectLike(n, r.interactable, r.element, [s.x, s.y, r])
        : de.resolveRectLike(n, r.interactable, r.element);
    }
    Object.defineProperty(lt, "__esModule", { value: !0 }),
      (lt.default = void 0),
      (lt.getRestrictionRect = Ts),
      (lt.restrict = void 0);
    var Ll = {
      start: function (n) {
        var r = n.rect,
          s = n.startOffset,
          a = n.state,
          u = n.interaction,
          p = n.pageCoords,
          g = a.options,
          h = g.elementRect,
          m = (0, J.default)(
            { left: 0, top: 0, right: 0, bottom: 0 },
            g.offset || {}
          );
        if (r && h) {
          var y = Ts(g.restriction, u, p);
          if (y) {
            var w = y.right - y.left - r.width,
              x = y.bottom - y.top - r.height;
            w < 0 && ((m.left += w), (m.right += w)),
              x < 0 && ((m.top += x), (m.bottom += x));
          }
          (m.left += s.left - r.width * h.left),
            (m.top += s.top - r.height * h.top),
            (m.right += s.right - r.width * (1 - h.right)),
            (m.bottom += s.bottom - r.height * (1 - h.bottom));
        }
        a.offset = m;
      },
      set: function (n) {
        var r = n.coords,
          s = n.interaction,
          a = n.state,
          u = a.options,
          p = a.offset,
          g = Ts(u.restriction, s, r);
        if (g) {
          var h = de.xywhToTlbr(g);
          (r.x = Math.max(Math.min(h.right - p.right, r.x), h.left + p.left)),
            (r.y = Math.max(Math.min(h.bottom - p.bottom, r.y), h.top + p.top));
        }
      },
      defaults: {
        restriction: null,
        elementRect: null,
        offset: null,
        endOnly: !1,
        enabled: !1,
      },
    };
    lt.restrict = Ll;
    var dp = (0, Ye.makeModifier)(Ll, "restrict");
    lt.default = dp;
    var Dt = {};
    Object.defineProperty(Dt, "__esModule", { value: !0 }),
      (Dt.restrictEdges = Dt.default = void 0);
    var Nl = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 },
      Fl = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 };
    function Bl(n, r) {
      for (
        var s = ["top", "left", "bottom", "right"], a = 0;
        a < s.length;
        a++
      ) {
        var u = s[a];
        u in n || (n[u] = r[u]);
      }
      return n;
    }
    var Hl = {
      noInner: Nl,
      noOuter: Fl,
      start: function (n) {
        var r,
          s = n.interaction,
          a = n.startOffset,
          u = n.state,
          p = u.options;
        if (p) {
          var g = (0, lt.getRestrictionRect)(p.offset, s, s.coords.start.page);
          r = de.rectToXY(g);
        }
        (r = r || { x: 0, y: 0 }),
          (u.offset = {
            top: r.y + a.top,
            left: r.x + a.left,
            bottom: r.y - a.bottom,
            right: r.x - a.right,
          });
      },
      set: function (n) {
        var r = n.coords,
          s = n.edges,
          a = n.interaction,
          u = n.state,
          p = u.offset,
          g = u.options;
        if (s) {
          var h = (0, J.default)({}, r),
            m = (0, lt.getRestrictionRect)(g.inner, a, h) || {},
            y = (0, lt.getRestrictionRect)(g.outer, a, h) || {};
          Bl(m, Nl),
            Bl(y, Fl),
            s.top
              ? (r.y = Math.min(Math.max(y.top + p.top, h.y), m.top + p.top))
              : s.bottom &&
                (r.y = Math.max(
                  Math.min(y.bottom + p.bottom, h.y),
                  m.bottom + p.bottom
                )),
            s.left
              ? (r.x = Math.min(
                  Math.max(y.left + p.left, h.x),
                  m.left + p.left
                ))
              : s.right &&
                (r.x = Math.max(
                  Math.min(y.right + p.right, h.x),
                  m.right + p.right
                ));
        }
      },
      defaults: {
        inner: null,
        outer: null,
        offset: null,
        endOnly: !1,
        enabled: !1,
      },
    };
    Dt.restrictEdges = Hl;
    var pp = (0, Ye.makeModifier)(Hl, "restrictEdges");
    Dt.default = pp;
    var lo = {};
    Object.defineProperty(lo, "__esModule", { value: !0 }),
      (lo.restrictRect = lo.default = void 0);
    var hp = (0, J.default)(
        {
          get elementRect() {
            return { top: 0, left: 0, bottom: 1, right: 1 };
          },
          set elementRect(n) {},
        },
        lt.restrict.defaults
      ),
      Ul = { start: lt.restrict.start, set: lt.restrict.set, defaults: hp };
    lo.restrictRect = Ul;
    var mp = (0, Ye.makeModifier)(Ul, "restrictRect");
    lo.default = mp;
    var co = {};
    Object.defineProperty(co, "__esModule", { value: !0 }),
      (co.restrictSize = co.default = void 0);
    var gp = { width: -1 / 0, height: -1 / 0 },
      vp = { width: 1 / 0, height: 1 / 0 },
      Wl = {
        start: function (n) {
          return Dt.restrictEdges.start(n);
        },
        set: function (n) {
          var r = n.interaction,
            s = n.state,
            a = n.rect,
            u = n.edges,
            p = s.options;
          if (u) {
            var g =
                de.tlbrToXywh((0, lt.getRestrictionRect)(p.min, r, n.coords)) ||
                gp,
              h =
                de.tlbrToXywh((0, lt.getRestrictionRect)(p.max, r, n.coords)) ||
                vp;
            (s.options = {
              endOnly: p.endOnly,
              inner: (0, J.default)({}, Dt.restrictEdges.noInner),
              outer: (0, J.default)({}, Dt.restrictEdges.noOuter),
            }),
              u.top
                ? ((s.options.inner.top = a.bottom - g.height),
                  (s.options.outer.top = a.bottom - h.height))
                : u.bottom &&
                  ((s.options.inner.bottom = a.top + g.height),
                  (s.options.outer.bottom = a.top + h.height)),
              u.left
                ? ((s.options.inner.left = a.right - g.width),
                  (s.options.outer.left = a.right - h.width))
                : u.right &&
                  ((s.options.inner.right = a.left + g.width),
                  (s.options.outer.right = a.left + h.width)),
              Dt.restrictEdges.set(n),
              (s.options = p);
          }
        },
        defaults: { min: null, max: null, endOnly: !1, enabled: !1 },
      };
    co.restrictSize = Wl;
    var yp = (0, Ye.makeModifier)(Wl, "restrictSize");
    co.default = yp;
    var $s = {};
    Object.defineProperty($s, "__esModule", { value: !0 }),
      Object.defineProperty($s, "default", {
        enumerable: !0,
        get: function () {
          return Dn.default;
        },
      });
    var dn = {};
    Object.defineProperty(dn, "__esModule", { value: !0 }),
      (dn.snap = dn.default = void 0);
    var Vl = {
      start: function (n) {
        var r,
          s = n.interaction,
          a = n.interactable,
          u = n.element,
          p = n.rect,
          g = n.state,
          h = n.startOffset,
          m = g.options,
          y = m.offsetWithOrigin
            ? (function (C) {
                var R = C.interaction.element;
                return (
                  (0, de.rectToXY)(
                    (0, de.resolveRectLike)(
                      C.state.options.origin,
                      null,
                      null,
                      [R]
                    )
                  ) ||
                  (0, rt.default)(
                    C.interactable,
                    R,
                    C.interaction.prepared.name
                  )
                );
              })(n)
            : { x: 0, y: 0 };
        if (m.offset === "startCoords")
          r = { x: s.coords.start.page.x, y: s.coords.start.page.y };
        else {
          var w = (0, de.resolveRectLike)(m.offset, a, u, [s]);
          ((r = (0, de.rectToXY)(w) || { x: 0, y: 0 }).x += y.x), (r.y += y.y);
        }
        var x = m.relativePoints;
        g.offsets =
          p && x && x.length
            ? x.map(function (C, R) {
                return {
                  index: R,
                  relativePoint: C,
                  x: h.left - p.width * C.x + r.x,
                  y: h.top - p.height * C.y + r.y,
                };
              })
            : [{ index: 0, relativePoint: null, x: r.x, y: r.y }];
      },
      set: function (n) {
        var r = n.interaction,
          s = n.coords,
          a = n.state,
          u = a.options,
          p = a.offsets,
          g = (0, rt.default)(r.interactable, r.element, r.prepared.name),
          h = (0, J.default)({}, s),
          m = [];
        u.offsetWithOrigin || ((h.x -= g.x), (h.y -= g.y));
        for (var y = 0; y < p.length; y++)
          for (
            var w = p[y],
              x = h.x - w.x,
              C = h.y - w.y,
              R = 0,
              S = u.targets.length;
            R < S;
            R++
          ) {
            var B,
              X = u.targets[R];
            (B = d.default.func(X) ? X(x, C, r._proxy, w, R) : X) &&
              m.push({
                x: (d.default.number(B.x) ? B.x : x) + w.x,
                y: (d.default.number(B.y) ? B.y : C) + w.y,
                range: d.default.number(B.range) ? B.range : u.range,
                source: X,
                index: R,
                offset: w,
              });
          }
        for (
          var H = {
              target: null,
              inRange: !1,
              distance: 0,
              range: 0,
              delta: { x: 0, y: 0 },
            },
            ne = 0;
          ne < m.length;
          ne++
        ) {
          var le = m[ne],
            pe = le.range,
            Ee = le.x - h.x,
            Re = le.y - h.y,
            ve = (0, Ve.default)(Ee, Re),
            Me = ve <= pe;
          pe === 1 / 0 && H.inRange && H.range !== 1 / 0 && (Me = !1),
            (H.target &&
              !(Me
                ? H.inRange && pe !== 1 / 0
                  ? ve / pe < H.distance / H.range
                  : (pe === 1 / 0 && H.range !== 1 / 0) || ve < H.distance
                : !H.inRange && ve < H.distance)) ||
              ((H.target = le),
              (H.distance = ve),
              (H.range = pe),
              (H.inRange = Me),
              (H.delta.x = Ee),
              (H.delta.y = Re));
        }
        return (
          H.inRange && ((s.x = H.target.x), (s.y = H.target.y)),
          (a.closest = H),
          H
        );
      },
      defaults: {
        range: 1 / 0,
        targets: null,
        offset: null,
        offsetWithOrigin: !0,
        origin: null,
        relativePoints: null,
        endOnly: !1,
        enabled: !1,
      },
    };
    dn.snap = Vl;
    var bp = (0, Ye.makeModifier)(Vl, "snap");
    dn.default = bp;
    var Xt = {};
    function ql(n, r) {
      (r == null || r > n.length) && (r = n.length);
      for (var s = 0, a = Array(r); s < r; s++) a[s] = n[s];
      return a;
    }
    Object.defineProperty(Xt, "__esModule", { value: !0 }),
      (Xt.snapSize = Xt.default = void 0);
    var Kl = {
      start: function (n) {
        var r = n.state,
          s = n.edges,
          a = r.options;
        if (!s) return null;
        (n.state = {
          options: {
            targets: null,
            relativePoints: [{ x: s.left ? 0 : 1, y: s.top ? 0 : 1 }],
            offset: a.offset || "self",
            origin: { x: 0, y: 0 },
            range: a.range,
          },
        }),
          (r.targetFields = r.targetFields || [
            ["width", "height"],
            ["x", "y"],
          ]),
          dn.snap.start(n),
          (r.offsets = n.state.offsets),
          (n.state = r);
      },
      set: function (n) {
        var r,
          s,
          a = n.interaction,
          u = n.state,
          p = n.coords,
          g = u.options,
          h = u.offsets,
          m = { x: p.x - h[0].x, y: p.y - h[0].y };
        (u.options = (0, J.default)({}, g)), (u.options.targets = []);
        for (var y = 0; y < (g.targets || []).length; y++) {
          var w = (g.targets || [])[y],
            x = void 0;
          if ((x = d.default.func(w) ? w(m.x, m.y, a) : w)) {
            for (var C = 0; C < u.targetFields.length; C++) {
              var R =
                  ((r = u.targetFields[C]),
                  (s = 2),
                  (function (H) {
                    if (Array.isArray(H)) return H;
                  })(r) ||
                    (function (H, ne) {
                      var le =
                        H == null
                          ? null
                          : (typeof Symbol < "u" && H[Symbol.iterator]) ||
                            H["@@iterator"];
                      if (le != null) {
                        var pe,
                          Ee,
                          Re = [],
                          ve = !0,
                          Me = !1;
                        try {
                          for (
                            le = le.call(H);
                            !(ve = (pe = le.next()).done) &&
                            (Re.push(pe.value), !ne || Re.length !== ne);
                            ve = !0
                          );
                        } catch (xt) {
                          (Me = !0), (Ee = xt);
                        } finally {
                          try {
                            ve || le.return == null || le.return();
                          } finally {
                            if (Me) throw Ee;
                          }
                        }
                        return Re;
                      }
                    })(r, s) ||
                    (function (H, ne) {
                      if (H) {
                        if (typeof H == "string") return ql(H, ne);
                        var le = Object.prototype.toString.call(H).slice(8, -1);
                        return (
                          le === "Object" &&
                            H.constructor &&
                            (le = H.constructor.name),
                          le === "Map" || le === "Set"
                            ? Array.from(H)
                            : le === "Arguments" ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                le
                              )
                            ? ql(H, ne)
                            : void 0
                        );
                      }
                    })(r, s) ||
                    (function () {
                      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
                    })()),
                S = R[0],
                B = R[1];
              if (S in x || B in x) {
                (x.x = x[S]), (x.y = x[B]);
                break;
              }
            }
            u.options.targets.push(x);
          }
        }
        var X = dn.snap.set(n);
        return (u.options = g), X;
      },
      defaults: {
        range: 1 / 0,
        targets: null,
        offset: null,
        endOnly: !1,
        enabled: !1,
      },
    };
    Xt.snapSize = Kl;
    var wp = (0, Ye.makeModifier)(Kl, "snapSize");
    Xt.default = wp;
    var uo = {};
    Object.defineProperty(uo, "__esModule", { value: !0 }),
      (uo.snapEdges = uo.default = void 0);
    var Xl = {
      start: function (n) {
        var r = n.edges;
        return r
          ? ((n.state.targetFields = n.state.targetFields || [
              [r.left ? "left" : "right", r.top ? "top" : "bottom"],
            ]),
            Xt.snapSize.start(n))
          : null;
      },
      set: Xt.snapSize.set,
      defaults: (0, J.default)((0, kn.default)(Xt.snapSize.defaults), {
        targets: null,
        range: null,
        offset: { x: 0, y: 0 },
      }),
    };
    uo.snapEdges = Xl;
    var _p = (0, Ye.makeModifier)(Xl, "snapEdges");
    uo.default = _p;
    var Cs = {};
    Object.defineProperty(Cs, "__esModule", { value: !0 }),
      Object.defineProperty(Cs, "default", {
        enumerable: !0,
        get: function () {
          return Dn.default;
        },
      });
    var Ms = {};
    Object.defineProperty(Ms, "__esModule", { value: !0 }),
      Object.defineProperty(Ms, "default", {
        enumerable: !0,
        get: function () {
          return Dn.default;
        },
      });
    var fo = {};
    Object.defineProperty(fo, "__esModule", { value: !0 }),
      (fo.default = void 0);
    var xp = {
      aspectRatio: ao.default,
      restrictEdges: Dt.default,
      restrict: lt.default,
      restrictRect: lo.default,
      restrictSize: co.default,
      snapEdges: uo.default,
      snap: dn.default,
      snapSize: Xt.default,
      spring: Cs.default,
      avoid: Ss.default,
      transform: Ms.default,
      rubberband: $s.default,
    };
    fo.default = xp;
    var tr = {};
    Object.defineProperty(tr, "__esModule", { value: !0 }),
      (tr.default = void 0);
    var Pp = {
        id: "modifiers",
        install: function (n) {
          var r = n.interactStatic;
          for (var s in (n.usePlugin(Ye.default),
          n.usePlugin(ti.default),
          (r.modifiers = fo.default),
          fo.default)) {
            var a = fo.default[s],
              u = a._defaults,
              p = a._methods;
            (u._methods = p), (n.defaults.perAction[s] = u);
          }
        },
      },
      Op = Pp;
    tr.default = Op;
    var zn = {};
    function As(n) {
      return (
        (As =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        As(n)
      );
    }
    function Ep(n, r) {
      for (var s = 0; s < r.length; s++) {
        var a = r[s];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(n, a.key, a);
      }
    }
    function ks(n, r) {
      return (
        (ks = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (s, a) {
              return (s.__proto__ = a), s;
            }),
        ks(n, r)
      );
    }
    function Sp(n, r) {
      if (r && (As(r) === "object" || typeof r == "function")) return r;
      if (r !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return js(n);
    }
    function js(n) {
      if (n === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return n;
    }
    function ni(n) {
      return (
        (ni = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (r) {
              return r.__proto__ || Object.getPrototypeOf(r);
            }),
        ni(n)
      );
    }
    Object.defineProperty(zn, "__esModule", { value: !0 }),
      (zn.default = zn.PointerEvent = void 0);
    var Tp = (function (n) {
      (function (h, m) {
        if (typeof m != "function" && m !== null)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (h.prototype = Object.create(m && m.prototype, {
          constructor: { value: h, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(h, "prototype", { writable: !1 }),
          m && ks(h, m);
      })(g, n);
      var r,
        s,
        a,
        u,
        p =
          ((a = g),
          (u = (function () {
            if (
              typeof Reflect > "u" ||
              !Reflect.construct ||
              Reflect.construct.sham
            )
              return !1;
            if (typeof Proxy == "function") return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch {
              return !1;
            }
          })()),
          function () {
            var h,
              m = ni(a);
            if (u) {
              var y = ni(this).constructor;
              h = Reflect.construct(m, arguments, y);
            } else h = m.apply(this, arguments);
            return Sp(this, h);
          });
      function g(h, m, y, w, x, C) {
        var R;
        if (
          ((function (X, H) {
            if (!(X instanceof H))
              throw new TypeError("Cannot call a class as a function");
          })(this, g),
          (R = p.call(this, x)),
          te.pointerExtend(js(R), y),
          y !== m && te.pointerExtend(js(R), m),
          (R.timeStamp = C),
          (R.originalEvent = y),
          (R.type = h),
          (R.pointerId = te.getPointerId(m)),
          (R.pointerType = te.getPointerType(m)),
          (R.target = w),
          (R.currentTarget = null),
          h === "tap")
        ) {
          var S = x.getPointerIndex(m);
          R.dt = R.timeStamp - x.pointers[S].downTime;
          var B = R.timeStamp - x.tapTime;
          R.double =
            !!x.prevTap &&
            x.prevTap.type !== "doubletap" &&
            x.prevTap.target === R.target &&
            B < 500;
        } else
          h === "doubletap" &&
            ((R.dt = m.timeStamp - x.tapTime), (R.double = !0));
        return R;
      }
      return (
        (r = g),
        (s = [
          {
            key: "_subtractOrigin",
            value: function (h) {
              var m = h.x,
                y = h.y;
              return (
                (this.pageX -= m),
                (this.pageY -= y),
                (this.clientX -= m),
                (this.clientY -= y),
                this
              );
            },
          },
          {
            key: "_addOrigin",
            value: function (h) {
              var m = h.x,
                y = h.y;
              return (
                (this.pageX += m),
                (this.pageY += y),
                (this.clientX += m),
                (this.clientY += y),
                this
              );
            },
          },
          {
            key: "preventDefault",
            value: function () {
              this.originalEvent.preventDefault();
            },
          },
        ]) && Ep(r.prototype, s),
        Object.defineProperty(r, "prototype", { writable: !1 }),
        g
      );
    })(Rt.BaseEvent);
    zn.PointerEvent = zn.default = Tp;
    var nr = {};
    Object.defineProperty(nr, "__esModule", { value: !0 }),
      (nr.default = void 0);
    var oi = {
      id: "pointer-events/base",
      before: ["inertia", "modifiers", "auto-start", "actions"],
      install: function (n) {
        (n.pointerEvents = oi),
          (n.defaults.actions.pointerEvents = oi.defaults),
          (0, J.default)(n.actions.phaselessTypes, oi.types);
      },
      listeners: {
        "interactions:new": function (n) {
          var r = n.interaction;
          (r.prevTap = null), (r.tapTime = 0);
        },
        "interactions:update-pointer": function (n) {
          var r = n.down,
            s = n.pointerInfo;
          (!r && s.hold) || (s.hold = { duration: 1 / 0, timeout: null });
        },
        "interactions:move": function (n, r) {
          var s = n.interaction,
            a = n.pointer,
            u = n.event,
            p = n.eventTarget;
          n.duplicate ||
            (s.pointerIsDown && !s.pointerWasMoved) ||
            (s.pointerIsDown && Rs(n),
            pn(
              {
                interaction: s,
                pointer: a,
                event: u,
                eventTarget: p,
                type: "move",
              },
              r
            ));
        },
        "interactions:down": function (n, r) {
          (function (s, a) {
            for (
              var u = s.interaction,
                p = s.pointer,
                g = s.event,
                h = s.eventTarget,
                m = s.pointerIndex,
                y = u.pointers[m].hold,
                w = U.getPath(h),
                x = {
                  interaction: u,
                  pointer: p,
                  event: g,
                  eventTarget: h,
                  type: "hold",
                  targets: [],
                  path: w,
                  node: null,
                },
                C = 0;
              C < w.length;
              C++
            ) {
              var R = w[C];
              (x.node = R), a.fire("pointerEvents:collect-targets", x);
            }
            if (x.targets.length) {
              for (var S = 1 / 0, B = 0; B < x.targets.length; B++) {
                var X = x.targets[B].eventable.options.holdDuration;
                X < S && (S = X);
              }
              (y.duration = S),
                (y.timeout = setTimeout(function () {
                  pn(
                    {
                      interaction: u,
                      eventTarget: h,
                      pointer: p,
                      event: g,
                      type: "hold",
                    },
                    a
                  );
                }, S));
            }
          })(n, r),
            pn(n, r);
        },
        "interactions:up": function (n, r) {
          Rs(n),
            pn(n, r),
            (function (s, a) {
              var u = s.interaction,
                p = s.pointer,
                g = s.event,
                h = s.eventTarget;
              u.pointerWasMoved ||
                pn(
                  {
                    interaction: u,
                    eventTarget: h,
                    pointer: p,
                    event: g,
                    type: "tap",
                  },
                  a
                );
            })(n, r);
        },
        "interactions:cancel": function (n, r) {
          Rs(n), pn(n, r);
        },
      },
      PointerEvent: zn.PointerEvent,
      fire: pn,
      collectEventTargets: Yl,
      defaults: {
        holdDuration: 600,
        ignoreFrom: null,
        allowFrom: null,
        origin: { x: 0, y: 0 },
      },
      types: {
        down: !0,
        move: !0,
        up: !0,
        cancel: !0,
        tap: !0,
        doubletap: !0,
        hold: !0,
      },
    };
    function pn(n, r) {
      var s = n.interaction,
        a = n.pointer,
        u = n.event,
        p = n.eventTarget,
        g = n.type,
        h = n.targets,
        m = h === void 0 ? Yl(n, r) : h,
        y = new zn.PointerEvent(g, a, u, p, s, r.now());
      r.fire("pointerEvents:new", { pointerEvent: y });
      for (
        var w = {
            interaction: s,
            pointer: a,
            event: u,
            eventTarget: p,
            targets: m,
            type: g,
            pointerEvent: y,
          },
          x = 0;
        x < m.length;
        x++
      ) {
        var C = m[x];
        for (var R in C.props || {}) y[R] = C.props[R];
        var S = (0, rt.default)(C.eventable, C.node);
        if (
          (y._subtractOrigin(S),
          (y.eventable = C.eventable),
          (y.currentTarget = C.node),
          C.eventable.fire(y),
          y._addOrigin(S),
          y.immediatePropagationStopped ||
            (y.propagationStopped &&
              x + 1 < m.length &&
              m[x + 1].node !== y.currentTarget))
        )
          break;
      }
      if ((r.fire("pointerEvents:fired", w), g === "tap")) {
        var B = y.double
          ? pn(
              {
                interaction: s,
                pointer: a,
                event: u,
                eventTarget: p,
                type: "doubletap",
              },
              r
            )
          : y;
        (s.prevTap = B), (s.tapTime = B.timeStamp);
      }
      return y;
    }
    function Yl(n, r) {
      var s = n.interaction,
        a = n.pointer,
        u = n.event,
        p = n.eventTarget,
        g = n.type,
        h = s.getPointerIndex(a),
        m = s.pointers[h];
      if (g === "tap" && (s.pointerWasMoved || !m || m.downTarget !== p))
        return [];
      for (
        var y = U.getPath(p),
          w = {
            interaction: s,
            pointer: a,
            event: u,
            eventTarget: p,
            type: g,
            path: y,
            targets: [],
            node: null,
          },
          x = 0;
        x < y.length;
        x++
      ) {
        var C = y[x];
        (w.node = C), r.fire("pointerEvents:collect-targets", w);
      }
      return (
        g === "hold" &&
          (w.targets = w.targets.filter(function (R) {
            var S;
            return (
              R.eventable.options.holdDuration ===
              ((S = s.pointers[h]) == null ? void 0 : S.hold.duration)
            );
          })),
        w.targets
      );
    }
    function Rs(n) {
      var r = n.interaction,
        s = n.pointerIndex,
        a = r.pointers[s].hold;
      a && a.timeout && (clearTimeout(a.timeout), (a.timeout = null));
    }
    var $p = oi;
    nr.default = $p;
    var ri = {};
    function Cp(n) {
      var r = n.interaction;
      r.holdIntervalHandle &&
        (clearInterval(r.holdIntervalHandle), (r.holdIntervalHandle = null));
    }
    Object.defineProperty(ri, "__esModule", { value: !0 }),
      (ri.default = void 0);
    var Mp = {
        id: "pointer-events/holdRepeat",
        install: function (n) {
          n.usePlugin(nr.default);
          var r = n.pointerEvents;
          (r.defaults.holdRepeatInterval = 0),
            (r.types.holdrepeat = n.actions.phaselessTypes.holdrepeat = !0);
        },
        listeners: ["move", "up", "cancel", "endall"].reduce(
          function (n, r) {
            return (n["pointerEvents:".concat(r)] = Cp), n;
          },
          {
            "pointerEvents:new": function (n) {
              var r = n.pointerEvent;
              r.type === "hold" && (r.count = (r.count || 0) + 1);
            },
            "pointerEvents:fired": function (n, r) {
              var s = n.interaction,
                a = n.pointerEvent,
                u = n.eventTarget,
                p = n.targets;
              if (a.type === "hold" && p.length) {
                var g = p[0].eventable.options.holdRepeatInterval;
                g <= 0 ||
                  (s.holdIntervalHandle = setTimeout(function () {
                    r.pointerEvents.fire(
                      {
                        interaction: s,
                        eventTarget: u,
                        type: "hold",
                        pointer: a,
                        event: a,
                      },
                      r
                    );
                  }, g));
              }
            },
          }
        ),
      },
      Ap = Mp;
    ri.default = Ap;
    var ii = {};
    function kp(n) {
      return (0, J.default)(this.events.options, n), this;
    }
    Object.defineProperty(ii, "__esModule", { value: !0 }),
      (ii.default = void 0);
    var jp = {
        id: "pointer-events/interactableTargets",
        install: function (n) {
          var r = n.Interactable;
          r.prototype.pointerEvents = kp;
          var s = r.prototype._backCompatOption;
          r.prototype._backCompatOption = function (a, u) {
            var p = s.call(this, a, u);
            return p === this && (this.events.options[a] = u), p;
          };
        },
        listeners: {
          "pointerEvents:collect-targets": function (n, r) {
            var s = n.targets,
              a = n.node,
              u = n.type,
              p = n.eventTarget;
            r.interactables.forEachMatch(a, function (g) {
              var h = g.events,
                m = h.options;
              h.types[u] &&
                h.types[u].length &&
                g.testIgnoreAllow(m, a, p) &&
                s.push({ node: a, eventable: h, props: { interactable: g } });
            });
          },
          "interactable:new": function (n) {
            var r = n.interactable;
            r.events.getRect = function (s) {
              return r.getRect(s);
            };
          },
          "interactable:set": function (n, r) {
            var s = n.interactable,
              a = n.options;
            (0, J.default)(s.events.options, r.pointerEvents.defaults),
              (0, J.default)(s.events.options, a.pointerEvents || {});
          },
        },
      },
      Rp = jp;
    ii.default = Rp;
    var or = {};
    Object.defineProperty(or, "__esModule", { value: !0 }),
      (or.default = void 0);
    var Ip = {
        id: "pointer-events",
        install: function (n) {
          n.usePlugin(nr), n.usePlugin(ri.default), n.usePlugin(ii.default);
        },
      },
      Dp = Ip;
    or.default = Dp;
    var po = {};
    function Jl(n) {
      var r = n.Interactable;
      (n.actions.phases.reflow = !0),
        (r.prototype.reflow = function (s) {
          return (function (a, u, p) {
            for (
              var g = d.default.string(a.target)
                  ? A.from(a._context.querySelectorAll(a.target))
                  : [a.target],
                h = p.window.Promise,
                m = h ? [] : null,
                y = function () {
                  var x = g[w],
                    C = a.getRect(x);
                  if (!C) return "break";
                  var R = A.find(p.interactions.list, function (ne) {
                      return (
                        ne.interacting() &&
                        ne.interactable === a &&
                        ne.element === x &&
                        ne.prepared.name === u.name
                      );
                    }),
                    S = void 0;
                  if (R)
                    R.move(),
                      m &&
                        (S =
                          R._reflowPromise ||
                          new h(function (ne) {
                            R._reflowResolve = ne;
                          }));
                  else {
                    var B = (0, de.tlbrToXywh)(C),
                      X = {
                        page: { x: B.x, y: B.y },
                        client: { x: B.x, y: B.y },
                        timeStamp: p.now(),
                      },
                      H = te.coordsToEvent(X);
                    S = (function (ne, le, pe, Ee, Re) {
                      var ve = ne.interactions.new({ pointerType: "reflow" }),
                        Me = {
                          interaction: ve,
                          event: Re,
                          pointer: Re,
                          eventTarget: pe,
                          phase: "reflow",
                        };
                      (ve.interactable = le),
                        (ve.element = pe),
                        (ve.prevEvent = Re),
                        ve.updatePointer(Re, Re, pe, !0),
                        te.setZeroCoords(ve.coords.delta),
                        (0, bt.copyAction)(ve.prepared, Ee),
                        ve._doPhase(Me);
                      var xt = ne.window.Promise,
                        Yt = xt
                          ? new xt(function (zs) {
                              ve._reflowResolve = zs;
                            })
                          : void 0;
                      return (
                        (ve._reflowPromise = Yt),
                        ve.start(Ee, le, pe),
                        ve._interacting
                          ? (ve.move(Me), ve.end(Re))
                          : (ve.stop(), ve._reflowResolve()),
                        ve.removePointer(Re, Re),
                        Yt
                      );
                    })(p, a, x, u, H);
                  }
                  m && m.push(S);
                },
                w = 0;
              w < g.length && y() !== "break";
              w++
            );
            return (
              m &&
              h.all(m).then(function () {
                return a;
              })
            );
          })(this, s, n);
        });
    }
    Object.defineProperty(po, "__esModule", { value: !0 }),
      (po.default = void 0),
      (po.install = Jl);
    var zp = {
        id: "reflow",
        install: Jl,
        listeners: {
          "interactions:stop": function (n, r) {
            var s = n.interaction;
            s.pointerType === "reflow" &&
              (s._reflowResolve && s._reflowResolve(),
              A.remove(r.interactions.list, s));
          },
        },
      },
      Lp = zp;
    po.default = Lp;
    var _t = { exports: {} };
    function Is(n) {
      return (
        (Is =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        Is(n)
      );
    }
    Object.defineProperty(_t.exports, "__esModule", { value: !0 }),
      (_t.exports.default = void 0),
      Ge.default.use(An.default),
      Ge.default.use(un.default),
      Ge.default.use(or.default),
      Ge.default.use(In.default),
      Ge.default.use(tr.default),
      Ge.default.use(Ho.default),
      Ge.default.use(Fo.default),
      Ge.default.use(qt.default),
      Ge.default.use(po.default);
    var Np = Ge.default;
    if (((_t.exports.default = Np), Is(_t) === "object" && _t))
      try {
        _t.exports = Ge.default;
      } catch {}
    (Ge.default.default = Ge.default),
      Fo.default,
      qt.default,
      Ho.default,
      An.default,
      Lr.default,
      In.default,
      Ge.default,
      tr.default,
      un.default,
      or.default,
      po.default,
      (_t = _t.exports);
    var Ln = { exports: {} };
    function Ds(n) {
      return (
        (Ds =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (r) {
                return typeof r;
              }
            : function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        Ds(n)
      );
    }
    Object.defineProperty(Ln.exports, "__esModule", { value: !0 }),
      (Ln.exports.default = void 0);
    var Fp = _t.default;
    if (((Ln.exports.default = Fp), Ds(Ln) === "object" && Ln))
      try {
        Ln.exports = _t.default;
      } catch {}
    return (_t.default.default = _t.default), Ln.exports;
  });
})(jf);
const Xc = Yg(jf.exports),
  Mv = { class: "flex h-full flex-1 flex-col" },
  Av = {
    class:
      "flex items-center justify-between gap-1 bg-zinc-700 py-1 px-2 text-xs text-white",
  },
  kv = { class: "flex items-center gap-1" },
  jv = D("i", { class: "fa-solid fa-volume-high" }, null, -1),
  Rv = { class: "font-semibold" },
  Iv = { class: "flex items-end gap-1" },
  Dv = { key: 0, class: "font-semibold" },
  zv = { key: 1, class: "fa-solid fa-signal" },
  Lv = { key: 2, class: "fa-solid fa-close" },
  Nv = { class: "flex flex-1 flex-col justify-around px-2 py-1" },
  Fv = { for: "search", class: "block text-xs font-medium text-white" },
  Bv = { class: "relative mt-1 flex items-center" },
  Hv = ["min", "max"],
  Uv = { class: "absolute inset-y-0 right-0 flex py-1.5 pr-1.5" },
  Wv = D(
    "kbd",
    {
      class:
        "inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-white",
    },
    [D("i", { class: "fa-solid fa-arrow-turn-down rotate-90 transform" })],
    -1
  ),
  Vv = [Wv],
  qv = {
    class:
      "inline-flex divide-x-[0.01vh] divide-gray-300/50 overflow-hidden rounded-md shadow-sm",
  },
  Kv = D("i", { class: "fa-solid fa-list" }, null, -1),
  Xv = [Kv],
  Yv = D("i", { class: "fa-solid fa-pen-to-square" }, null, -1),
  Jv = [Yv],
  Gv = { key: 0, class: "fa-solid fa-lock" },
  Qv = { key: 1, class: "fa-solid fa-lock-open" },
  Zv = D("i", { class: "fa-solid fa-gear" }, null, -1),
  ey = [Zv],
  ty = { class: "flex divide-x-[1px] divide-opacity-50" },
  ny = D("i", { class: "fa-solid fa-close" }, null, -1),
  oy = [ny],
  ry = Ze({
    __name: "MainScreen",
    setup(e) {
      const t = an();
      return (o, i) => {
        const l = Qn("tooltip");
        return (
          G(),
          Z("div", Mv, [
            D("div", Av, [
              D("span", kv, [
                jv,
                D("span", Rv, be($(t).settings.volume) + "%", 1),
              ]),
              D("span", Iv, [
                $(t).settings.current
                  ? (G(),
                    Z(
                      "span",
                      Dv,
                      be(
                        $(t).settings.customName
                          ? $(t).settings.customName.substring(0, 10)
                          : $(t).settings.current
                      ),
                      1
                    ))
                  : Qe("", !0),
                $(t).settings.current ? (G(), Z("i", zv)) : (G(), Z("i", Lv)),
              ]),
            ]),
            D("div", Nv, [
              D("div", null, [
                D("label", Fv, be($(t).getLocale("channel")), 1),
                D("div", Bv, [
                  ke(
                    D(
                      "input",
                      {
                        type: "number",
                        min: $(t).settings.ranges.min,
                        max: $(t).settings.ranges.max,
                        class:
                          "block w-full !appearance-none rounded-md bg-zinc-700 pr-12 text-gray-200 shadow-sm focus:ring-0 focus:ring-transparent focus:ring-offset-transparent sm:text-sm",
                        "onUpdate:modelValue":
                          i[0] || (i[0] = (c) => ($(t).settings.input = c)),
                        onKeyup:
                          i[1] ||
                          (i[1] = cf((c) => $(t).connectToRadio(), ["enter"])),
                      },
                      null,
                      40,
                      Hv
                    ),
                    [[$i, $(t).settings.input]]
                  ),
                  ke((G(), Z("div", Uv, Vv)), [
                    [
                      l,
                      {
                        content: $(t).getLocale("press_enter_to_connect"),
                        placement: "top",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]),
                ]),
              ]),
              D("div", qv, [
                $(t).settings.isChannelWithList
                  ? ke(
                      (G(),
                      Z(
                        "button",
                        {
                          key: 0,
                          type: "button",
                          onClick: i[2] || (i[2] = (c) => $(t).setTab("list")),
                          class:
                            "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-sm font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                        },
                        Xv
                      )),
                      [
                        [
                          l,
                          {
                            content: $(t).getLocale("show_list"),
                            placement: "top",
                          },
                          void 0,
                          { auto: !0 },
                        ],
                      ]
                    )
                  : Qe("", !0),
                $(t).settings.isChannelWithList
                  ? ke(
                      (G(),
                      Z(
                        "button",
                        {
                          key: 1,
                          onClick:
                            i[3] || (i[3] = (c) => $(t).setTab("change")),
                          type: "button",
                          class:
                            "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-sm font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                        },
                        Jv
                      )),
                      [
                        [
                          l,
                          {
                            content: $(t).getLocale("change_signs"),
                            placement: "top",
                          },
                          void 0,
                          { auto: !0 },
                        ],
                      ]
                    )
                  : Qe("", !0),
                $(t).settings.canChannelBeLocked
                  ? ke(
                      (G(),
                      Z(
                        "button",
                        {
                          key: 2,
                          onClick: i[4] || (i[4] = (c) => $(t).setTab("lock")),
                          type: "button",
                          class:
                            "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-sm font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                        },
                        [
                          $(t).settings.isChannelLocked
                            ? (G(), Z("i", Gv))
                            : (G(), Z("i", Qv)),
                        ]
                      )),
                      [
                        [
                          l,
                          {
                            content: $(t).getLocale("lock_channel"),
                            placement: "top",
                          },
                          void 0,
                          { auto: !0 },
                        ],
                      ]
                    )
                  : Qe("", !0),
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      type: "button",
                      onClick: i[5] || (i[5] = (c) => $(t).setTab("settings")),
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-sm font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                    },
                    ey
                  )),
                  [
                    [
                      l,
                      { content: $(t).getLocale("settings"), placement: "top" },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
              ]),
            ]),
            D("div", ty, [
              D(
                "button",
                {
                  type: "button",
                  onClick: i[6] || (i[6] = (c) => $(t).connectToRadio()),
                  class:
                    "inline-flex flex-1 items-center justify-center border border-transparent bg-zinc-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white focus:outline-none focus:ring-0 focus:ring-transparent",
                },
                be($(t).getLocale("change_button")),
                1
              ),
              $(t).settings.current
                ? ke(
                    (G(),
                    Z(
                      "button",
                      {
                        key: 0,
                        type: "button",
                        onClick: i[7] || (i[7] = (c) => $(t).leaveRadio()),
                        class:
                          "inline-flex items-center justify-center border border-transparent bg-zinc-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white focus:outline-none focus:ring-0 focus:ring-transparent",
                      },
                      oy
                    )),
                    [
                      [
                        l,
                        {
                          content: $(t).getLocale("disconnect"),
                          placement: "top",
                        },
                        void 0,
                        { auto: !0 },
                      ],
                    ]
                  )
                : Qe("", !0),
            ]),
          ])
        );
      };
    },
  }),
  iy = { class: "flex h-full flex-1 flex-col overflow-hidden" },
  sy = {
    class:
      "flex items-center justify-between gap-1 bg-zinc-700 py-1 px-2 text-xs text-white",
  },
  ay = { class: "flex items-center gap-1" },
  ly = D("i", { class: "fa-solid fa-volume-high" }, null, -1),
  cy = { class: "font-semibold" },
  uy = { class: "flex items-end gap-1" },
  fy = { key: 0, class: "font-semibold" },
  dy = { key: 1, class: "fa-solid fa-signal" },
  py = { key: 2, class: "fa-solid fa-close" },
  hy = {
    class: "flex flex-1 flex-col gap-2 overflow-hidden py-2 px-2 text-white",
  },
  my = D("i", { class: "fa-solid fa-arrow-left text-xs" }, null, -1),
  gy = { class: "text-xs font-semibold" },
  vy = {
    class:
      "no-scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded-md",
  },
  yy = { for: "sign", class: "block text-xs font-medium text-white" },
  by = { class: "mt-1" },
  wy = ["placeholder"],
  _y = { for: "name", class: "block text-xs font-medium text-white" },
  xy = { class: "mt-1" },
  Py = ["placeholder"],
  Oy = Ze({
    __name: "ChangeScreen",
    setup(e) {
      const t = an();
      return (o, i) => (
        G(),
        Z("div", iy, [
          D("div", sy, [
            D("span", ay, [
              ly,
              D("span", cy, be($(t).settings.volume) + "%", 1),
            ]),
            D("span", uy, [
              $(t).settings.current
                ? (G(),
                  Z(
                    "span",
                    fy,
                    be(
                      $(t).settings.customName
                        ? $(t).settings.customName.substring(0, 10)
                        : $(t).settings.current
                    ),
                    1
                  ))
                : Qe("", !0),
              $(t).settings.current ? (G(), Z("i", dy)) : (G(), Z("i", py)),
            ]),
          ]),
          D("div", hy, [
            D(
              "div",
              {
                onClick: i[0] || (i[0] = (l) => $(t).setTab("main")),
                class:
                  "flex w-full select-none items-center gap-3 rounded-md bg-zinc-700 py-1 px-2 transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
              },
              [my, D("span", gy, be($(t).getLocale("go_back")), 1)]
            ),
            D("div", vy, [
              D("div", null, [
                D("label", yy, be($(t).getLocale("call_sign")), 1),
                D("div", by, [
                  ke(
                    D(
                      "input",
                      {
                        type: "text",
                        id: "sign",
                        "onUpdate:modelValue":
                          i[1] ||
                          (i[1] = (l) => ($(t).settings.signs.sign = l)),
                        class:
                          "block w-full rounded-lg border-gray-300 bg-transparent text-xs text-white shadow-sm placeholder:text-white",
                        placeholder: $(t).getLocale("call_sign_placeholder"),
                      },
                      null,
                      8,
                      wy
                    ),
                    [[$i, $(t).settings.signs.sign]]
                  ),
                ]),
              ]),
              D("div", null, [
                D("label", _y, be($(t).getLocale("name_input")), 1),
                D("div", xy, [
                  ke(
                    D(
                      "input",
                      {
                        type: "text",
                        id: "name",
                        "onUpdate:modelValue":
                          i[2] ||
                          (i[2] = (l) => ($(t).settings.signs.name = l)),
                        class:
                          "block w-full rounded-lg border-gray-300 bg-transparent text-xs text-white shadow-sm placeholder:text-white",
                        placeholder: $(t).getLocale("name_input_placeholder"),
                      },
                      null,
                      8,
                      Py
                    ),
                    [[$i, $(t).settings.signs.name]]
                  ),
                ]),
              ]),
              D("div", null, [
                D(
                  "button",
                  {
                    type: "button",
                    onClick: i[3] || (i[3] = (l) => $(t).updateSigns()),
                    class:
                      "inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-zinc-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-zinc-600 focus:outline-none",
                  },
                  be($(t).getLocale("button_save")),
                  1
                ),
              ]),
            ]),
          ]),
        ])
      );
    },
  }),
  Ey = "/web/dist/static/offScreen.e0f7aeaf.svg",
  Sy = (e, t) => {
    const o = e.__vccOpts || e;
    for (const [i, l] of t) o[i] = l;
    return o;
  },
  Ty = {},
  $y = { class: "h-full w-full bg-black" },
  Cy = D("img", { src: Ey, class: "h-full w-full" }, null, -1),
  My = [Cy];
function Ay(e, t) {
  return G(), Z("div", $y, My);
}
const ky = Sy(Ty, [["render", Ay]]),
  jy = { class: "flex h-full flex-1 flex-col overflow-hidden" },
  Ry = {
    class:
      "flex items-center justify-between gap-1 bg-zinc-700 py-1 px-2 text-xs text-white",
  },
  Iy = { class: "flex items-center gap-1" },
  Dy = D("i", { class: "fa-solid fa-volume-high" }, null, -1),
  zy = { class: "font-semibold" },
  Ly = { class: "flex items-end gap-1" },
  Ny = { key: 0, class: "font-semibold" },
  Fy = { key: 1, class: "fa-solid fa-signal" },
  By = { key: 2, class: "fa-solid fa-close" },
  Hy = {
    class: "flex flex-1 flex-col gap-2 overflow-hidden py-2 px-2 text-white",
  },
  Uy = {
    class:
      "inline-flex divide-x-[0.1vh] divide-gray-300/50 overflow-hidden rounded-md shadow-sm",
  },
  Wy = D("i", { class: "fa-solid fa-arrow-left" }, null, -1),
  Vy = [Wy],
  qy = ["disabled"],
  Ky = { key: 0, class: "fa-solid fa-list" },
  Xy = { key: 1, class: "fa-solid fa-ellipsis-vertical" },
  Yy = {
    class:
      "no-scrollbar flex w-full flex-1 flex-col gap-1 overflow-y-auto rounded-md",
  },
  Jy = {
    class: "flex w-full items-baseline gap-1 rounded-md bg-zinc-700 px-2 py-2",
  },
  Gy = { key: 0, class: "flex-shrink-0 text-xs font-bold" },
  Qy = { key: 1, class: "break-all text-xs" },
  Zy = Ze({
    __name: "ListScreen",
    setup(e) {
      const t = an();
      return (o, i) => {
        const l = Qn("tooltip");
        return (
          G(),
          Z("div", jy, [
            D("div", Ry, [
              D("span", Iy, [
                Dy,
                D("span", zy, be($(t).settings.volume) + "%", 1),
              ]),
              D("span", Ly, [
                $(t).settings.current
                  ? (G(),
                    Z(
                      "span",
                      Ny,
                      be(
                        $(t).settings.customName
                          ? $(t).settings.customName.substring(0, 10)
                          : $(t).settings.current
                      ),
                      1
                    ))
                  : Qe("", !0),
                $(t).settings.current ? (G(), Z("i", Fy)) : (G(), Z("i", By)),
              ]),
            ]),
            D("div", Hy, [
              D("div", Uy, [
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick: i[0] || (i[0] = (c) => $(t).setTab("main")),
                      type: "button",
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                    },
                    Vy
                  )),
                  [
                    [
                      l,
                      {
                        content: $(t).getLocale("go_back"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick:
                        i[1] || (i[1] = (c) => $(t).toggleExternalListState()),
                      type: "button",
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                      disabled: !$(t).settings.canExternalUsersListBeToggled,
                    },
                    [
                      $(t).settings.isExternalListShown
                        ? (G(), Z("i", Xy))
                        : (G(), Z("i", Ky)),
                    ],
                    8,
                    qy
                  )),
                  [
                    [
                      l,
                      {
                        content: $(t).settings.isExternalListShown
                          ? $(t).getLocale("disable_external_list")
                          : $(t).getLocale("enable_external_list"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
              ]),
              D("div", Yy, [
                (G(!0),
                Z(
                  qe,
                  null,
                  Eo(
                    $(t).radioList,
                    (c) => (
                      G(),
                      Z("div", Jy, [
                        c.sign
                          ? (G(), Z("span", Gy, be(c.sign), 1))
                          : Qe("", !0),
                        c.name
                          ? (G(), Z("span", Qy, be(c.name), 1))
                          : Qe("", !0),
                      ])
                    )
                  ),
                  256
                )),
              ]),
            ]),
          ])
        );
      };
    },
  }),
  eb = { class: "flex h-full flex-1 flex-col overflow-hidden" },
  tb = {
    class:
      "flex items-center justify-between gap-1 bg-zinc-700 py-1 px-2 text-xs text-white",
  },
  nb = { class: "flex items-center gap-1" },
  ob = D("i", { class: "fa-solid fa-volume-high" }, null, -1),
  rb = { class: "font-semibold" },
  ib = { class: "flex items-end gap-1" },
  sb = { key: 0, class: "font-semibold" },
  ab = { key: 1, class: "fa-solid fa-signal" },
  lb = { key: 2, class: "fa-solid fa-close" },
  cb = {
    class: "flex flex-1 flex-col gap-2 overflow-hidden py-2 px-2 text-white",
  },
  ub = {
    class:
      "inline-flex divide-x-[0.1vh] divide-gray-300/50 overflow-hidden rounded-md shadow-sm",
  },
  fb = D("i", { class: "fa-solid fa-arrow-left" }, null, -1),
  db = [fb],
  pb = { key: 0, class: "fa-solid fa-lock" },
  hb = { key: 1, class: "fa-solid fa-lock-open" },
  mb = {
    class:
      "no-scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded-md",
  },
  gb = { class: "text-xs" },
  vb = { for: "name", class: "block text-xs font-medium text-white" },
  yb = { class: "mt-1" },
  bb = Ze({
    __name: "LockScreen",
    setup(e) {
      const t = an();
      return (o, i) => {
        const l = Qn("tooltip");
        return (
          G(),
          Z("div", eb, [
            D("div", tb, [
              D("span", nb, [
                ob,
                D("span", rb, be($(t).settings.volume) + "%", 1),
              ]),
              D("span", ib, [
                $(t).settings.current
                  ? (G(),
                    Z(
                      "span",
                      sb,
                      be(
                        $(t).settings.customName
                          ? $(t).settings.customName.substring(0, 10)
                          : $(t).settings.current
                      ),
                      1
                    ))
                  : Qe("", !0),
                $(t).settings.current ? (G(), Z("i", ab)) : (G(), Z("i", lb)),
              ]),
            ]),
            D("div", cb, [
              D("div", ub, [
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick: i[0] || (i[0] = (c) => $(t).setTab("main")),
                      type: "button",
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                    },
                    db
                  )),
                  [
                    [
                      l,
                      {
                        content: $(t).getLocale("go_back"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick:
                        i[1] || (i[1] = (c) => $(t).toggleChannelState()),
                      type: "button",
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear hover:bg-zinc-600 hover:text-white",
                    },
                    [
                      $(t).settings.isChannelLocked
                        ? (G(), Z("i", hb))
                        : (G(), Z("i", pb)),
                    ]
                  )),
                  [
                    [
                      l,
                      {
                        content: $(t).settings.isChannelLocked
                          ? $(t).getLocale("lock_button")
                          : $(t).getLocale("unlock_button"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
              ]),
              D("div", mb, [
                D(
                  "span",
                  gb,
                  be($(t).getLocale("channel_is")) +
                    ": " +
                    be(
                      $(t).settings.isChannelLocked
                        ? $(t).getLocale("locked_status")
                        : $(t).getLocale("unlocked_status")
                    ),
                  1
                ),
                D("div", null, [
                  D("label", vb, be($(t).getLocale("invite_user")), 1),
                  D("div", yb, [
                    ke(
                      D(
                        "input",
                        {
                          "onUpdate:modelValue":
                            i[2] || (i[2] = (c) => ($(t).inviteId = c)),
                          type: "text",
                          id: "name",
                          class:
                            "block w-full rounded-lg border-gray-300 bg-transparent text-xs text-white shadow-sm placeholder:text-white",
                          placeholder: "22",
                        },
                        null,
                        512
                      ),
                      [[$i, $(t).inviteId]]
                    ),
                  ]),
                ]),
                D("div", null, [
                  D(
                    "button",
                    {
                      onClick: i[3] || (i[3] = (c) => $(t).invitePlayer()),
                      type: "button",
                      class:
                        "inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-zinc-700 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-zinc-600 focus:outline-none",
                    },
                    be($(t).getLocale("invite_button")),
                    1
                  ),
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  }),
  wb = { class: "flex h-full flex-1 flex-col overflow-hidden" },
  _b = {
    class:
      "flex items-center justify-between gap-1 bg-zinc-700 py-1 px-2 text-xs text-white",
  },
  xb = { class: "flex items-center gap-1" },
  Pb = D("i", { class: "fa-solid fa-volume-high" }, null, -1),
  Ob = { class: "font-semibold" },
  Eb = { class: "flex items-end gap-1" },
  Sb = { key: 0, class: "font-semibold" },
  Tb = { key: 1, class: "fa-solid fa-signal" },
  $b = { key: 2, class: "fa-solid fa-close" },
  Cb = {
    class: "flex flex-1 flex-col gap-2 overflow-hidden py-2 px-2 text-white",
  },
  Mb = {
    class:
      "inline-flex divide-x-[0.1vh] divide-gray-300/50 overflow-hidden rounded-md shadow-sm",
  },
  Ab = D("i", { class: "fa-solid fa-arrow-left" }, null, -1),
  kb = [Ab],
  jb = D("i", { class: "fa-solid fa-up-down-left-right" }, null, -1),
  Rb = [jb],
  Ib = {
    class:
      "no-scrollbar flex w-full flex-1 flex-col gap-1 overflow-y-auto rounded-md",
  },
  Db = { key: 0 },
  zb = { for: "size", class: "block pb-1 text-xs font-medium text-white" },
  Lb = ["value", "selected"],
  Nb = { for: "size", class: "block pb-1 text-xs font-medium text-white" },
  Fb = ["value", "selected"],
  Bb = { for: "size", class: "block pb-1 text-xs font-medium text-white" },
  Hb = {
    class:
      "flex w-full items-center justify-center overflow-hidden rounded-md border border-gray-400",
  },
  Ub = D("i", { class: "fa-solid fa-minus" }, null, -1),
  Wb = [Ub],
  Vb = { class: "flex flex-1 justify-center" },
  qb = D("i", { class: "fa-solid fa-plus" }, null, -1),
  Kb = [qb],
  Xb = Ze({
    __name: "SettingsScreen",
    setup(e) {
      const t = an();
      function o() {
        vt.emit("radio:toggleMovement");
      }
      return (i, l) => {
        const c = Qn("tooltip");
        return (
          G(),
          Z("div", wb, [
            D("div", _b, [
              D("span", xb, [
                Pb,
                D("span", Ob, be($(t).settings.volume) + "%", 1),
              ]),
              D("span", Eb, [
                $(t).settings.current
                  ? (G(),
                    Z(
                      "span",
                      Sb,
                      be(
                        $(t).settings.customName
                          ? $(t).settings.customName.substring(0, 10)
                          : $(t).settings.current
                      ),
                      1
                    ))
                  : Qe("", !0),
                $(t).settings.current ? (G(), Z("i", Tb)) : (G(), Z("i", $b)),
              ]),
            ]),
            D("div", Cb, [
              D("div", Mb, [
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick: l[0] || (l[0] = (f) => $(t).setTab("main")),
                      type: "button",
                      class:
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear",
                    },
                    kb
                  )),
                  [
                    [
                      c,
                      {
                        content: $(t).getLocale("go_back"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  (G(),
                  Z(
                    "button",
                    {
                      onClick: l[1] || (l[1] = (f) => o()),
                      type: "button",
                      class: on([
                        "relative inline-flex flex-1 items-center justify-center bg-zinc-700 py-2 text-xs font-medium text-white transition duration-150 ease-linear",
                        {
                          "bg-zinc-500 text-white": $(t).isAllowedToMove,
                          "hover:bg-zinc-600 hover:text-white":
                            !$(t).isAllowedToMove,
                        },
                      ]),
                    },
                    Rb,
                    2
                  )),
                  [
                    [
                      c,
                      {
                        content: $(t).getLocale("toggle_frame_movement"),
                        placement: "bottom",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
              ]),
              D("div", Ib, [
                $(t).settings.isColorChangeAllowed
                  ? (G(),
                    Z("div", Db, [
                      D("label", zb, be($(t).getLocale("color")), 1),
                      ke(
                        D(
                          "select",
                          {
                            id: "size",
                            "onUpdate:modelValue":
                              l[2] || (l[2] = (f) => ($(t).settings.frame = f)),
                            onChange:
                              l[3] || (l[3] = (f) => $(t).colorChanged()),
                            class:
                              "block w-full appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-3 pr-10 text-xs ring-0 focus:outline-none",
                          },
                          [
                            (G(!0),
                            Z(
                              qe,
                              null,
                              Eo(
                                $(t).frames,
                                (f, d) => (
                                  G(),
                                  Z(
                                    "option",
                                    {
                                      value: d,
                                      selected: d === $(t).settings.frame,
                                      class: "bg-zinc-700 text-xs text-white",
                                    },
                                    be(
                                      $(t).getLocale(
                                        `color_${
                                          f.name === "default"
                                            ? "black"
                                            : f.name.toLowerCase()
                                        }`
                                      )
                                    ),
                                    9,
                                    Lb
                                  )
                                )
                              ),
                              256
                            )),
                          ],
                          544
                        ),
                        [[Sc, $(t).settings.frame]]
                      ),
                    ]))
                  : Qe("", !0),
                D("div", null, [
                  D("label", Nb, be($(t).getLocale("size")), 1),
                  ke(
                    D(
                      "select",
                      {
                        id: "size",
                        "onUpdate:modelValue":
                          l[4] || (l[4] = (f) => ($(t).settings.size = f)),
                        onChange: l[5] || (l[5] = (f) => $(t).sizeChanged()),
                        class:
                          "block w-full appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-3 pr-10 text-xs ring-0 focus:outline-none",
                      },
                      [
                        (G(!0),
                        Z(
                          qe,
                          null,
                          Eo(
                            $(t).sizes,
                            (f) => (
                              G(),
                              Z(
                                "option",
                                {
                                  value: f.value,
                                  selected: f.value === $(t).settings.size,
                                  class: "bg-zinc-700 text-xs text-white",
                                },
                                be(f.name),
                                9,
                                Fb
                              )
                            )
                          ),
                          256
                        )),
                      ],
                      544
                    ),
                    [[Sc, $(t).settings.size]]
                  ),
                ]),
                D("div", null, [
                  D("label", Bb, be($(t).getLocale("volume")), 1),
                  D("div", Hb, [
                    D(
                      "button",
                      {
                        class: "py-2 px-2 text-xs",
                        onClick: l[6] || (l[6] = (f) => $(t).volumeDown()),
                      },
                      Wb
                    ),
                    D("div", Vb, be($(t).settings.volume), 1),
                    D(
                      "button",
                      {
                        class: "py-2 px-2 text-xs",
                        onClick: l[7] || (l[7] = (f) => $(t).volumeUp()),
                      },
                      Kb
                    ),
                  ]),
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  }),
  Yb = ["src"],
  Jb = Ze({
    __name: "Radio",
    setup(e) {
      const t = an();
      let o = !1;
      vt.on("radio:toggleMovement", () => {
        (o = !o),
          (t.isAllowedToMove = o),
          Xc(b.value).draggable({ enabled: o });
      });
      const i = { main: ry, list: Zy, change: Oy, lock: bb, settings: Xb },
        l = { small: "18vh", medium: "21vh", large: "24vh" },
        c = {
          small: {
            top: "19.741vh",
            left: "3.0vh",
            width: "12.0vh",
            height: "17.25vh",
            maxHeight: "17.25vh",
            minHeight: "17.25vh",
            borderRadius: "0.8vh",
          },
          medium: {
            top: "23.07vh",
            left: "3.4vh",
            width: "14.2vh",
            height: "20.5vh",
            maxHeight: "20.05vh",
            minHeight: "20.05vh",
            borderRadius: "1vh",
          },
          large: {
            top: "26.35vh",
            left: "3.95vh",
            width: "16.08vh",
            height: "23vh",
            maxHeight: "23vh",
            minHeight: "23vh",
            borderRadius: "1vh",
          },
        },
        f = {
          small: { top: "25.2vh", height: "1.5vh", width: "1.5vh" },
          medium: { top: "29.3vh", height: "2vh", width: "1.5vh" },
          large: { top: "33.6vh", height: "2vh", width: "1.5vh" },
        },
        d = {
          small: { top: "27.1vh", height: "1.5vh", width: "1.5vh" },
          medium: { top: "31.5vh", height: "2vh", width: "1.5vh" },
          large: { top: "36.1vh", height: "2vh", width: "1.5vh" },
        },
        v = {
          small: { top: "28.9vh", height: "1.5vh", width: "1.5vh" },
          medium: { top: "33.7vh", height: "2vh", width: "1.5vh" },
          large: { top: "38.6vh", height: "2vh", width: "1.5vh" },
        };
      let b = Ht();
      const P = Va(() => ({
        width: l[t.settings.size],
        bottom: `${t.settings.position.bottom}px`,
        right: `${t.settings.position.right}px`,
      }));
      return (
        Wu(() => {
          Xc(b.value).draggable({
            enabled: !1,
            autoScroll: !1,
            listeners: {
              move(E) {
                (t.settings.position.bottom += -E.dy),
                  (t.settings.position.right += -E.dx);
              },
              end() {
                t.positionChanged();
              },
            },
            ignoreFrom: "#screen",
          }),
            window.addEventListener("keyup", function (E) {
              E.keyCode == 27 &&
                (t.settings.isRadioShown && t.closeRadio(),
                t.quickJoinIsShown && t.closeList());
            }),
            t.fetchLocale();
        }),
        vt.on("radio:toggleRadio", async (E) => {
          t.settings.isRadioShown = E.state;
          if (E.state && !firstOpen) {
            firstOpen = true;
            await new Promise((T) => setTimeout(T, 400));
            $(t).toggleOffState();
          }
        }),
        (E, T) => {
          const M = Qn("tooltip"),
            k = Qn("auto-animate");
          return ke(
            (G(),
            Z(
              "div",
              {
                tabindex: "-1",
                class: "absolute select-none border-none focus:outline-none",
                style: Pt($(P)),
                ref_key: "radioFrame",
                ref: b,
              },
              [
                D(
                  "img",
                  {
                    id: "img",
                    class:
                      "-z-10 flex h-full w-full flex-shrink-0 select-none border-none focus:outline-none",
                    src: $(t).frames[$(t).settings.frame].url,
                    tabindex: "-1",
                  },
                  null,
                  8,
                  Yb
                ),
                ke(
                  D(
                    "div",
                    {
                      onClick: T[0] || (T[0] = (N) => $(t).toggleOffState()),
                      class: "absolute z-50",
                      style: Pt(f[$(t).settings.size]),
                    },
                    null,
                    4
                  ),
                  [
                    [
                      M,
                      {
                        content: $(t).getLocale("turn_on_off"),
                        placement: "right",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  D(
                    "div",
                    {
                      onClick: T[1] || (T[1] = (N) => $(t).volumeUpButton()),
                      class: "absolute z-50",
                      style: Pt(d[$(t).settings.size]),
                    },
                    null,
                    4
                  ),
                  [
                    [
                      M,
                      {
                        content: $(t).getLocale("volume_up"),
                        placement: "right",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  D(
                    "div",
                    {
                      onClick: T[2] || (T[2] = (N) => $(t).volumeDownButton()),
                      class: "absolute z-50",
                      style: Pt(v[$(t).settings.size]),
                    },
                    null,
                    4
                  ),
                  [
                    [
                      M,
                      {
                        content: $(t).getLocale("volume_down"),
                        placement: "right",
                      },
                      void 0,
                      { auto: !0 },
                    ],
                  ]
                ),
                ke(
                  (G(),
                  Z(
                    "div",
                    {
                      id: "screen",
                      class: "absolute overflow-hidden bg-stone-900",
                      style: Pt(c[$(t).settings.size]),
                    },
                    [
                      $(t).settings.isOff
                        ? ke((G(), to(ky, { key: 0 }, null, 512)), [[k]])
                        : (G(),
                          Z(
                            qe,
                            { key: 1 },
                            Eo(i, (N, Y) =>
                              ke(Ue(fm(N), { tabindex: "-1", key: Y }), [
                                [k],
                                [$c, Y === $(t).screen],
                              ])
                            ),
                            64
                          )),
                    ],
                    4
                  )),
                  [[k]]
                ),
              ],
              4
            )),
            [[$c, $(t).settings.isRadioShown], [k]]
          );
        }
      );
    },
  }),
  Gb = {
    key: 0,
    class:
      "no-scrollbar fixed left-5 top-1/2 flex max-h-[50vh] min-h-[50vh] -translate-y-1/2 transform flex-col gap-1 overflow-auto focus:outline-none",
  },
  Qb = ["onClick"],
  Zb = { key: 0 },
  e0 = D("i", { class: "fa-solid fa-wifi" }, null, -1),
  t0 = [e0],
  n0 = Ze({
    __name: "RadioList",
    setup(e) {
      const t = an();
      return (
        vt.on("radio:toggleRadioList", (o) => {
          (t.quickJoinList = []),
            (t.quickJoinIsShown = o.state),
            o.data && (t.quickJoinList = o.data);
        }),
        (o, i) => {
          const l = Qn("auto-animate");
          return $(t).quickJoinIsShown
            ? ke(
                (G(),
                Z("div", Gb, [
                  (G(!0),
                  Z(
                    qe,
                    null,
                    Eo(
                      $(t).quickJoinList,
                      (c) => (
                        G(),
                        Z(
                          "div",
                          {
                            class:
                              "flex flex-grow-0 cursor-default gap-2 rounded bg-stone-900/80 px-4 py-2 text-base font-semibold text-white hover:cursor-pointer hover:bg-stone-600",
                            onClick: (f) => $(t).connectToRadio(c.channel),
                          },
                          [
                            D(
                              "span",
                              null,
                              be(c.name || $(t).getLocale("unknown")) +
                                " (" +
                                be(c.channel) +
                                " MHz)",
                              1
                            ),
                            $(t).settings.current == c.channel
                              ? ke((G(), Z("span", Zb, t0)), [[l]])
                              : Qe("", !0),
                          ],
                          8,
                          Qb
                        )
                      )
                    ),
                    256
                  )),
                ])),
                [[l]]
              )
            : Qe("", !0);
        }
      );
    },
  }),
  o0 = {
    key: 0,
    class: "fixed right-2 top-[10%] opacity-50 flex flex-col items-end",
  },
  r0 = { class: "text-slate-300 shadow font-semibold underline" },
  i0 = { class: "text-slate-300 shadow text-right" },
  s0 = Ze({
    __name: "InRadioList",
    setup(e) {
      const t = an();
      return (o, i) =>
        !$(t).settings.isOff &&
        $(t).settings.isChannelWithList &&
        $(t).settings.isExternalListShown
          ? (G(),
            Z("div", o0, [
              D(
                "span",
                r0,
                be(
                  $(t).settings.customName
                    ? `${$(t).settings.customName.substring(0, 15)}${
                        $(t).settings.customName.length >= 15 ? "..." : ""
                      }`
                    : $(t).getLocale("radio_list")
                ) + ":",
                1
              ),
              D("ul", i0, [
                (G(!0),
                Z(
                  qe,
                  null,
                  Eo(
                    $(t).settings.externalListUsers,
                    (l) => (
                      G(),
                      Z(
                        "li",
                        null,
                        be(
                          l.sign && l.sign !== "" ? l.sign.substring(0, 15) : ""
                        ) +
                          be(l.sign && l.sign !== "" ? " | " : "") +
                          be(l.name.substring(0, 15)),
                        1
                      )
                    )
                  ),
                  256
                )),
              ]),
            ]))
          : Qe("", !0);
    },
  }),
  a0 = Ze({
    __name: "Sounds",
    setup(e) {
      const t = new Audio("./sounds/radio-join-leaveogg.ogg"),
        o = new Audio("./sounds/jammer.mp3"),
        i = new Audio("./sounds/button_click.mp3");
      function l() {
        t.pause(), (t.currentTime = 0), (t.volume = 0.3), t.play();
      }
      function c() {
        o.pause(),
          (o.currentTime = 0),
          (o.loop = !0),
          (o.volume = 0.01),
          o.play();
      }
      function f() {
        o.pause();
      }
      function d() {
        i.pause(), (i.currentTime = 0), (i.volume = 0.1), i.play();
      }
      return (
        vt.on("radio:playButton", () => {
          d();
        }),
        vt.on("radio:join", () => {
          l();
        }),
        vt.on("radio:playJammer", () => {
          c();
        }),
        vt.on("radio:stopJammer", () => {
          f();
        }),
        (v, b) => null
      );
    },
  }),
  l0 = Ze({
    __name: "App",
    setup(e) {
      return (t, o) => (G(), Z(qe, null, [Ue(Jb), Ue(n0), Ue(a0), Ue(s0)], 64));
    },
  });
function ln(e) {
  return e.split("-")[0];
}
function wo(e) {
  return e.split("-")[1];
}
function Mr(e) {
  return ["top", "bottom"].includes(ln(e)) ? "x" : "y";
}
function Ga(e) {
  return e === "y" ? "height" : "width";
}
function Yc(e) {
  let { reference: t, floating: o, placement: i } = e;
  const l = t.x + t.width / 2 - o.width / 2,
    c = t.y + t.height / 2 - o.height / 2;
  let f;
  switch (ln(i)) {
    case "top":
      f = { x: l, y: t.y - o.height };
      break;
    case "bottom":
      f = { x: l, y: t.y + t.height };
      break;
    case "right":
      f = { x: t.x + t.width, y: c };
      break;
    case "left":
      f = { x: t.x - o.width, y: c };
      break;
    default:
      f = { x: t.x, y: t.y };
  }
  const d = Mr(i),
    v = Ga(d);
  switch (wo(i)) {
    case "start":
      f[d] = f[d] - (t[v] / 2 - o[v] / 2);
      break;
    case "end":
      f[d] = f[d] + (t[v] / 2 - o[v] / 2);
      break;
  }
  return f;
}
const c0 = async (e, t, o) => {
  const {
    placement: i = "bottom",
    strategy: l = "absolute",
    middleware: c = [],
    platform: f,
  } = o;
  let d = await f.getElementRects({ reference: e, floating: t, strategy: l }),
    { x: v, y: b } = Yc({ ...d, placement: i }),
    P = i,
    E = {};
  for (let T = 0; T < c.length; T++) {
    const { name: M, fn: k } = c[T],
      {
        x: N,
        y: Y,
        data: L,
        reset: ee,
      } = await k({
        x: v,
        y: b,
        initialPlacement: i,
        placement: P,
        strategy: l,
        middlewareData: E,
        rects: d,
        platform: f,
        elements: { reference: e, floating: t },
      });
    if (
      ((v = N != null ? N : v),
      (b = Y != null ? Y : b),
      (E = { ...E, [M]: L != null ? L : {} }),
      ee)
    ) {
      typeof ee == "object" &&
        (ee.placement && (P = ee.placement),
        ee.rects &&
          (d =
            ee.rects === !0
              ? await f.getElementRects({
                  reference: e,
                  floating: t,
                  strategy: l,
                })
              : ee.rects),
        ({ x: v, y: b } = Yc({ ...d, placement: P }))),
        (T = -1);
      continue;
    }
  }
  return { x: v, y: b, placement: P, strategy: l, middlewareData: E };
};
function u0(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Rf(e) {
  return typeof e != "number"
    ? u0(e)
    : { top: e, right: e, bottom: e, left: e };
}
function ma(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height,
  };
}
async function Qi(e, t) {
  t === void 0 && (t = {});
  const { x: o, y: i, platform: l, rects: c, elements: f, strategy: d } = e,
    {
      boundary: v = "clippingParents",
      rootBoundary: b = "viewport",
      elementContext: P = "floating",
      altBoundary: E = !1,
      padding: T = 0,
    } = t,
    M = Rf(T),
    N = f[E ? (P === "floating" ? "reference" : "floating") : P],
    Y = await l.getClippingClientRect({
      element: (await l.isElement(N))
        ? N
        : N.contextElement ||
          (await l.getDocumentElement({ element: f.floating })),
      boundary: v,
      rootBoundary: b,
    }),
    L = ma(
      await l.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: P === "floating" ? { ...c.floating, x: o, y: i } : c.reference,
        offsetParent: await l.getOffsetParent({ element: f.floating }),
        strategy: d,
      })
    );
  return {
    top: Y.top - L.top + M.top,
    bottom: L.bottom - Y.bottom + M.bottom,
    left: Y.left - L.left + M.left,
    right: L.right - Y.right + M.right,
  };
}
const f0 = Math.min,
  Un = Math.max;
function ga(e, t, o) {
  return Un(e, f0(t, o));
}
const d0 = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const { element: o, padding: i = 0 } = e != null ? e : {},
        { x: l, y: c, placement: f, rects: d, platform: v } = t;
      if (o == null) return {};
      const b = Rf(i),
        P = { x: l, y: c },
        E = ln(f),
        T = Mr(E),
        M = Ga(T),
        k = await v.getDimensions({ element: o }),
        N = T === "y" ? "top" : "left",
        Y = T === "y" ? "bottom" : "right",
        L = d.reference[M] + d.reference[T] - P[T] - d.floating[M],
        ee = P[T] - d.reference[T],
        se = await v.getOffsetParent({ element: o }),
        oe = se ? (T === "y" ? se.clientHeight || 0 : se.clientWidth || 0) : 0,
        ce = L / 2 - ee / 2,
        we = b[N],
        me = oe - k[M] - b[Y],
        U = oe / 2 - k[M] / 2 + ce,
        $e = ga(we, U, me);
      return { data: { [T]: $e, centerOffset: U - $e } };
    },
  }),
  p0 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Mi(e) {
  return e.replace(/left|right|bottom|top/g, (t) => p0[t]);
}
function If(e, t) {
  const o = wo(e) === "start",
    i = Mr(e),
    l = Ga(i);
  let c = i === "x" ? (o ? "right" : "left") : o ? "bottom" : "top";
  return (
    t.reference[l] > t.floating[l] && (c = Mi(c)), { main: c, cross: Mi(c) }
  );
}
const h0 = { start: "end", end: "start" };
function va(e) {
  return e.replace(/start|end/g, (t) => h0[t]);
}
const m0 = ["top", "right", "bottom", "left"],
  g0 = m0.reduce((e, t) => e.concat(t, t + "-start", t + "-end"), []);
function v0(e, t, o) {
  return (
    e
      ? [...o.filter((l) => wo(l) === e), ...o.filter((l) => wo(l) !== e)]
      : o.filter((l) => ln(l) === l)
  ).filter((l) => (e ? wo(l) === e || (t ? va(l) !== l : !1) : !0));
}
const y0 = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "autoPlacement",
      options: e,
      async fn(t) {
        var o, i, l, c, f, d;
        const { x: v, y: b, rects: P, middlewareData: E, placement: T } = t,
          {
            alignment: M = null,
            allowedPlacements: k = g0,
            autoAlignment: N = !0,
            ...Y
          } = e;
        if ((o = E.autoPlacement) != null && o.skip) return {};
        const L = v0(M, N, k),
          ee = await Qi(t, Y),
          se =
            (i = (l = E.autoPlacement) == null ? void 0 : l.index) != null
              ? i
              : 0,
          oe = L[se],
          { main: ce, cross: we } = If(oe, P);
        if (T !== oe) return { x: v, y: b, reset: { placement: L[0] } };
        const me = [ee[ln(oe)], ee[ce], ee[we]],
          U = [
            ...((c = (f = E.autoPlacement) == null ? void 0 : f.overflows) !=
            null
              ? c
              : []),
            { placement: oe, overflows: me },
          ],
          $e = L[se + 1];
        if ($e)
          return {
            data: { index: se + 1, overflows: U },
            reset: { placement: $e },
          };
        const De = U.slice().sort(
            (nt, ot) => nt.overflows[0] - ot.overflows[0]
          ),
          He =
            (d = De.find((nt) => {
              let { overflows: ot } = nt;
              return ot.every((Fe) => Fe <= 0);
            })) == null
              ? void 0
              : d.placement;
        return {
          data: { skip: !0 },
          reset: { placement: He != null ? He : De[0].placement },
        };
      },
    }
  );
};
function b0(e) {
  const t = Mi(e);
  return [va(e), t, va(t)];
}
const w0 = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "flip",
      options: e,
      async fn(t) {
        var o, i;
        const {
          placement: l,
          middlewareData: c,
          rects: f,
          initialPlacement: d,
        } = t;
        if ((o = c.flip) != null && o.skip) return {};
        const {
            mainAxis: v = !0,
            crossAxis: b = !0,
            fallbackPlacements: P,
            fallbackStrategy: E = "bestFit",
            flipAlignment: T = !0,
            ...M
          } = e,
          k = ln(l),
          Y = P || (k === d || !T ? [Mi(d)] : b0(d)),
          L = [d, ...Y],
          ee = await Qi(t, M),
          se = [];
        let oe = ((i = c.flip) == null ? void 0 : i.overflows) || [];
        if ((v && se.push(ee[k]), b)) {
          const { main: U, cross: $e } = If(l, f);
          se.push(ee[U], ee[$e]);
        }
        if (
          ((oe = [...oe, { placement: l, overflows: se }]),
          !se.every((U) => U <= 0))
        ) {
          var ce, we;
          const U =
              ((ce = (we = c.flip) == null ? void 0 : we.index) != null
                ? ce
                : 0) + 1,
            $e = L[U];
          if ($e)
            return {
              data: { index: U, overflows: oe },
              reset: { placement: $e },
            };
          let De = "bottom";
          switch (E) {
            case "bestFit": {
              var me;
              const He =
                (me = oe
                  .slice()
                  .sort(
                    (nt, ot) =>
                      nt.overflows
                        .filter((Fe) => Fe > 0)
                        .reduce((Fe, J) => Fe + J, 0) -
                      ot.overflows
                        .filter((Fe) => Fe > 0)
                        .reduce((Fe, J) => Fe + J, 0)
                  )[0]) == null
                  ? void 0
                  : me.placement;
              He && (De = He);
              break;
            }
            case "initialPlacement":
              De = d;
              break;
          }
          return { data: { skip: !0 }, reset: { placement: De } };
        }
        return {};
      },
    }
  );
};
function _0(e) {
  let { placement: t, rects: o, value: i } = e;
  const l = ln(t),
    c = ["left", "top"].includes(l) ? -1 : 1,
    f = typeof i == "function" ? i({ ...o, placement: t }) : i,
    { mainAxis: d, crossAxis: v } =
      typeof f == "number"
        ? { mainAxis: f, crossAxis: 0 }
        : { mainAxis: 0, crossAxis: 0, ...f };
  return Mr(l) === "x" ? { x: v, y: d * c } : { x: d * c, y: v };
}
const x0 = function (e) {
  return (
    e === void 0 && (e = 0),
    {
      name: "offset",
      options: e,
      fn(t) {
        const { x: o, y: i, placement: l, rects: c } = t,
          f = _0({ placement: l, rects: c, value: e });
        return { x: o + f.x, y: i + f.y, data: f };
      },
    }
  );
};
function P0(e) {
  return e === "x" ? "y" : "x";
}
const O0 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: o, y: i, placement: l } = t,
            {
              mainAxis: c = !0,
              crossAxis: f = !1,
              limiter: d = {
                fn: (Y) => {
                  let { x: L, y: ee } = Y;
                  return { x: L, y: ee };
                },
              },
              ...v
            } = e,
            b = { x: o, y: i },
            P = await Qi(t, v),
            E = Mr(ln(l)),
            T = P0(E);
          let M = b[E],
            k = b[T];
          if (c) {
            const Y = E === "y" ? "top" : "left",
              L = E === "y" ? "bottom" : "right",
              ee = M + P[Y],
              se = M - P[L];
            M = ga(ee, M, se);
          }
          if (f) {
            const Y = T === "y" ? "top" : "left",
              L = T === "y" ? "bottom" : "right",
              ee = k + P[Y],
              se = k - P[L];
            k = ga(ee, k, se);
          }
          const N = d.fn({ ...t, [E]: M, [T]: k });
          return { ...N, data: { x: N.x - o, y: N.y - i } };
        },
      }
    );
  },
  E0 = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var o;
          const { placement: i, rects: l, middlewareData: c } = t,
            { apply: f, ...d } = e;
          if ((o = c.size) != null && o.skip) return {};
          const v = await Qi(t, d),
            b = ln(i),
            P = wo(i) === "end";
          let E, T;
          b === "top" || b === "bottom"
            ? ((E = b), (T = P ? "left" : "right"))
            : ((T = b), (E = P ? "top" : "bottom"));
          const M = Un(v.left, 0),
            k = Un(v.right, 0),
            N = Un(v.top, 0),
            Y = Un(v.bottom, 0),
            L = {
              height:
                l.floating.height -
                (["left", "right"].includes(i)
                  ? 2 * (N !== 0 || Y !== 0 ? N + Y : Un(v.top, v.bottom))
                  : v[E]),
              width:
                l.floating.width -
                (["top", "bottom"].includes(i)
                  ? 2 * (M !== 0 || k !== 0 ? M + k : Un(v.left, v.right))
                  : v[T]),
            };
          return (
            f == null || f({ ...L, ...l }),
            { data: { skip: !0 }, reset: { rects: !0 } }
          );
        },
      }
    );
  };
function Qa(e) {
  return (e == null ? void 0 : e.toString()) === "[object Window]";
}
function Sn(e) {
  if (e == null) return window;
  if (!Qa(e)) {
    const t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Zi(e) {
  return Sn(e).getComputedStyle(e);
}
function tn(e) {
  return Qa(e) ? "" : e ? (e.nodeName || "").toLowerCase() : "";
}
function nn(e) {
  return e instanceof Sn(e).HTMLElement;
}
function Ai(e) {
  return e instanceof Sn(e).Element;
}
function S0(e) {
  return e instanceof Sn(e).Node;
}
function Df(e) {
  const t = Sn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function es(e) {
  const { overflow: t, overflowX: o, overflowY: i } = Zi(e);
  return /auto|scroll|overlay|hidden/.test(t + i + o);
}
function T0(e) {
  return ["table", "td", "th"].includes(tn(e));
}
function zf(e) {
  const t = navigator.userAgent.toLowerCase().includes("firefox"),
    o = Zi(e);
  return (
    o.transform !== "none" ||
    o.perspective !== "none" ||
    o.contain === "paint" ||
    ["transform", "perspective"].includes(o.willChange) ||
    (t && o.willChange === "filter") ||
    (t && (o.filter ? o.filter !== "none" : !1))
  );
}
const Jc = Math.min,
  hr = Math.max,
  ki = Math.round;
function $o(e, t) {
  t === void 0 && (t = !1);
  const o = e.getBoundingClientRect();
  let i = 1,
    l = 1;
  return (
    t &&
      nn(e) &&
      ((i = (e.offsetWidth > 0 && ki(o.width) / e.offsetWidth) || 1),
      (l = (e.offsetHeight > 0 && ki(o.height) / e.offsetHeight) || 1)),
    {
      width: o.width / i,
      height: o.height / l,
      top: o.top / l,
      right: o.right / i,
      bottom: o.bottom / l,
      left: o.left / i,
      x: o.left / i,
      y: o.top / l,
    }
  );
}
function Tn(e) {
  return ((S0(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function ts(e) {
  return Qa(e)
    ? { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset }
    : { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Lf(e) {
  return $o(Tn(e)).left + ts(e).scrollLeft;
}
function $0(e) {
  const t = $o(e);
  return ki(t.width) !== e.offsetWidth || ki(t.height) !== e.offsetHeight;
}
function C0(e, t, o) {
  const i = nn(t),
    l = Tn(t),
    c = $o(e, i && $0(t));
  let f = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (i || (!i && o !== "fixed"))
    if (((tn(t) !== "body" || es(l)) && (f = ts(t)), nn(t))) {
      const v = $o(t, !0);
      (d.x = v.x + t.clientLeft), (d.y = v.y + t.clientTop);
    } else l && (d.x = Lf(l));
  return {
    x: c.left + f.scrollLeft - d.x,
    y: c.top + f.scrollTop - d.y,
    width: c.width,
    height: c.height,
  };
}
function ns(e) {
  return tn(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (Df(e) ? e.host : null) || Tn(e);
}
function Gc(e) {
  return !nn(e) || getComputedStyle(e).position === "fixed"
    ? null
    : e.offsetParent;
}
function M0(e) {
  let t = ns(e);
  for (; nn(t) && !["html", "body"].includes(tn(t)); ) {
    if (zf(t)) return t;
    t = t.parentNode;
  }
  return null;
}
function ya(e) {
  const t = Sn(e);
  let o = Gc(e);
  for (; o && T0(o) && getComputedStyle(o).position === "static"; ) o = Gc(o);
  return o &&
    (tn(o) === "html" ||
      (tn(o) === "body" && getComputedStyle(o).position === "static" && !zf(o)))
    ? t
    : o || M0(e) || t;
}
function Qc(e) {
  return { width: e.offsetWidth, height: e.offsetHeight };
}
function A0(e) {
  let { rect: t, offsetParent: o, strategy: i } = e;
  const l = nn(o),
    c = Tn(o);
  if (o === c) return t;
  let f = { scrollLeft: 0, scrollTop: 0 };
  const d = { x: 0, y: 0 };
  if (
    (l || (!l && i !== "fixed")) &&
    ((tn(o) !== "body" || es(c)) && (f = ts(o)), nn(o))
  ) {
    const v = $o(o, !0);
    (d.x = v.x + o.clientLeft), (d.y = v.y + o.clientTop);
  }
  return { ...t, x: t.x - f.scrollLeft + d.x, y: t.y - f.scrollTop + d.y };
}
function k0(e) {
  const t = Sn(e),
    o = Tn(e),
    i = t.visualViewport;
  let l = o.clientWidth,
    c = o.clientHeight,
    f = 0,
    d = 0;
  return (
    i &&
      ((l = i.width),
      (c = i.height),
      Math.abs(t.innerWidth / i.scale - i.width) < 0.01 &&
        ((f = i.offsetLeft), (d = i.offsetTop))),
    { width: l, height: c, x: f, y: d }
  );
}
function j0(e) {
  var t;
  const o = Tn(e),
    i = ts(e),
    l = (t = e.ownerDocument) == null ? void 0 : t.body,
    c = hr(
      o.scrollWidth,
      o.clientWidth,
      l ? l.scrollWidth : 0,
      l ? l.clientWidth : 0
    ),
    f = hr(
      o.scrollHeight,
      o.clientHeight,
      l ? l.scrollHeight : 0,
      l ? l.clientHeight : 0
    );
  let d = -i.scrollLeft + Lf(e);
  const v = -i.scrollTop;
  return (
    Zi(l || o).direction === "rtl" &&
      (d += hr(o.clientWidth, l ? l.clientWidth : 0) - c),
    { width: c, height: f, x: d, y: v }
  );
}
function Nf(e) {
  return ["html", "body", "#document"].includes(tn(e))
    ? e.ownerDocument.body
    : nn(e) && es(e)
    ? e
    : Nf(ns(e));
}
function ji(e, t) {
  var o;
  t === void 0 && (t = []);
  const i = Nf(e),
    l = i === ((o = e.ownerDocument) == null ? void 0 : o.body),
    c = Sn(i),
    f = l ? [c].concat(c.visualViewport || [], es(i) ? i : []) : i,
    d = t.concat(f);
  return l ? d : d.concat(ji(ns(f)));
}
function R0(e, t) {
  const o = t.getRootNode == null ? void 0 : t.getRootNode();
  if (e.contains(t)) return !0;
  if (o && Df(o)) {
    let i = t;
    do {
      if (i && e === i) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function I0(e) {
  const t = $o(e),
    o = t.top + e.clientTop,
    i = t.left + e.clientLeft;
  return {
    top: o,
    left: i,
    x: i,
    y: o,
    right: i + e.clientWidth,
    bottom: o + e.clientHeight,
    width: e.clientWidth,
    height: e.clientHeight,
  };
}
function Zc(e, t) {
  return t === "viewport" ? ma(k0(e)) : Ai(t) ? I0(t) : ma(j0(Tn(e)));
}
function D0(e) {
  const t = ji(ns(e)),
    i = ["absolute", "fixed"].includes(Zi(e).position) && nn(e) ? ya(e) : e;
  return Ai(i) ? t.filter((l) => Ai(l) && R0(l, i) && tn(l) !== "body") : [];
}
function z0(e) {
  let { element: t, boundary: o, rootBoundary: i } = e;
  const c = [...(o === "clippingParents" ? D0(t) : [].concat(o)), i],
    f = c[0],
    d = c.reduce((v, b) => {
      const P = Zc(t, b);
      return (
        (v.top = hr(P.top, v.top)),
        (v.right = Jc(P.right, v.right)),
        (v.bottom = Jc(P.bottom, v.bottom)),
        (v.left = hr(P.left, v.left)),
        v
      );
    }, Zc(t, f));
  return (
    (d.width = d.right - d.left),
    (d.height = d.bottom - d.top),
    (d.x = d.left),
    (d.y = d.top),
    d
  );
}
const L0 = {
    getElementRects: (e) => {
      let { reference: t, floating: o, strategy: i } = e;
      return { reference: C0(t, ya(o), i), floating: { ...Qc(o), x: 0, y: 0 } };
    },
    convertOffsetParentRelativeRectToViewportRelativeRect: (e) => A0(e),
    getOffsetParent: (e) => {
      let { element: t } = e;
      return ya(t);
    },
    isElement: (e) => Ai(e),
    getDocumentElement: (e) => {
      let { element: t } = e;
      return Tn(t);
    },
    getClippingClientRect: (e) => z0(e),
    getDimensions: (e) => {
      let { element: t } = e;
      return Qc(t);
    },
    getClientRects: (e) => {
      let { element: t } = e;
      return t.getClientRects();
    },
  },
  N0 = (e, t, o) => c0(e, t, { platform: L0, ...o });
var F0 = Object.defineProperty,
  B0 = Object.defineProperties,
  H0 = Object.getOwnPropertyDescriptors,
  eu = Object.getOwnPropertySymbols,
  U0 = Object.prototype.hasOwnProperty,
  W0 = Object.prototype.propertyIsEnumerable,
  tu = (e, t, o) =>
    t in e
      ? F0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o })
      : (e[t] = o),
  Gt = (e, t) => {
    for (var o in t || (t = {})) U0.call(t, o) && tu(e, o, t[o]);
    if (eu) for (var o of eu(t)) W0.call(t, o) && tu(e, o, t[o]);
    return e;
  },
  Ar = (e, t) => B0(e, H0(t));
const Gn = {
  disabled: !1,
  distance: 5,
  skidding: 0,
  container: "body",
  boundary: void 0,
  instantMove: !1,
  disposeTimeout: 5e3,
  popperTriggers: [],
  strategy: "absolute",
  preventOverflow: !0,
  flip: !0,
  shift: !0,
  overflowPadding: 0,
  arrowPadding: 0,
  arrowOverflow: !0,
  themes: {
    tooltip: {
      placement: "top",
      triggers: ["hover", "focus", "touch"],
      hideTriggers: (e) => [...e, "click"],
      delay: { show: 200, hide: 0 },
      handleResize: !1,
      html: !1,
      loadingContent: "...",
    },
    dropdown: {
      placement: "bottom",
      triggers: ["click"],
      delay: 0,
      handleResize: !0,
      autoHide: !0,
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover", "focus"],
      delay: { show: 0, hide: 400 },
    },
  },
};
function Co(e, t) {
  let o = Gn.themes[e] || {},
    i;
  do
    (i = o[t]),
      typeof i > "u"
        ? o.$extend
          ? (o = Gn.themes[o.$extend] || {})
          : ((o = null), (i = Gn[t]))
        : (o = null);
  while (o);
  return i;
}
function V0(e) {
  const t = [e];
  let o = Gn.themes[e] || {};
  do
    o.$extend && !o.$resetCss
      ? (t.push(o.$extend), (o = Gn.themes[o.$extend] || {}))
      : (o = null);
  while (o);
  return t.map((i) => `v-popper--theme-${i}`);
}
function nu(e) {
  const t = [e];
  let o = Gn.themes[e] || {};
  do
    o.$extend
      ? (t.push(o.$extend), (o = Gn.themes[o.$extend] || {}))
      : (o = null);
  while (o);
  return t;
}
let Mo = !1;
if (typeof window < "u") {
  Mo = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get() {
        Mo = !0;
      },
    });
    window.addEventListener("test", null, e);
  } catch {}
}
let Ff = !1;
typeof window < "u" &&
  typeof navigator < "u" &&
  (Ff = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Bf = ["auto", "top", "bottom", "left", "right"].reduce(
    (e, t) => e.concat([t, `${t}-start`, `${t}-end`]),
    []
  ),
  ou = {
    hover: "mouseenter",
    focus: "focus",
    click: "click",
    touch: "touchstart",
  },
  ru = {
    hover: "mouseleave",
    focus: "blur",
    click: "click",
    touch: "touchend",
  };
function iu(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function Ks() {
  return new Promise((e) =>
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    })
  );
}
const Ct = [];
let Bn = null;
const su = {};
function au(e) {
  let t = su[e];
  return t || (t = su[e] = []), t;
}
let ba = function () {};
typeof window < "u" && (ba = window.Element);
function _e(e) {
  return function (t) {
    return Co(t.theme, e);
  };
}
const Xs = "__floating-vue__popper";
var Hf = () =>
  Ze({
    name: "VPopper",
    provide() {
      return { [Xs]: { parentPopper: this } };
    },
    inject: { [Xs]: { default: null } },
    props: {
      theme: { type: String, required: !0 },
      targetNodes: { type: Function, required: !0 },
      referenceNode: { type: Function, default: null },
      popperNode: { type: Function, required: !0 },
      shown: { type: Boolean, default: !1 },
      showGroup: { type: String, default: null },
      ariaId: { default: null },
      disabled: { type: Boolean, default: _e("disabled") },
      positioningDisabled: {
        type: Boolean,
        default: _e("positioningDisabled"),
      },
      placement: {
        type: String,
        default: _e("placement"),
        validator: (e) => Bf.includes(e),
      },
      delay: { type: [String, Number, Object], default: _e("delay") },
      distance: { type: [Number, String], default: _e("distance") },
      skidding: { type: [Number, String], default: _e("skidding") },
      triggers: { type: Array, default: _e("triggers") },
      showTriggers: { type: [Array, Function], default: _e("showTriggers") },
      hideTriggers: { type: [Array, Function], default: _e("hideTriggers") },
      popperTriggers: { type: Array, default: _e("popperTriggers") },
      popperShowTriggers: {
        type: [Array, Function],
        default: _e("popperShowTriggers"),
      },
      popperHideTriggers: {
        type: [Array, Function],
        default: _e("popperHideTriggers"),
      },
      container: {
        type: [String, Object, ba, Boolean],
        default: _e("container"),
      },
      boundary: { type: [String, ba], default: _e("boundary") },
      strategy: {
        type: String,
        validator: (e) => ["absolute", "fixed"].includes(e),
        default: _e("strategy"),
      },
      autoHide: { type: [Boolean, Function], default: _e("autoHide") },
      handleResize: { type: Boolean, default: _e("handleResize") },
      instantMove: { type: Boolean, default: _e("instantMove") },
      eagerMount: { type: Boolean, default: _e("eagerMount") },
      popperClass: {
        type: [String, Array, Object],
        default: _e("popperClass"),
      },
      computeTransformOrigin: {
        type: Boolean,
        default: _e("computeTransformOrigin"),
      },
      autoMinSize: { type: Boolean, default: _e("autoMinSize") },
      autoSize: { type: [Boolean, String], default: _e("autoSize") },
      autoMaxSize: { type: Boolean, default: _e("autoMaxSize") },
      autoBoundaryMaxSize: {
        type: Boolean,
        default: _e("autoBoundaryMaxSize"),
      },
      preventOverflow: { type: Boolean, default: _e("preventOverflow") },
      overflowPadding: {
        type: [Number, String],
        default: _e("overflowPadding"),
      },
      arrowPadding: { type: [Number, String], default: _e("arrowPadding") },
      arrowOverflow: { type: Boolean, default: _e("arrowOverflow") },
      flip: { type: Boolean, default: _e("flip") },
      shift: { type: Boolean, default: _e("shift") },
      shiftCrossAxis: { type: Boolean, default: _e("shiftCrossAxis") },
      noAutoFocus: { type: Boolean, default: _e("noAutoFocus") },
    },
    emits: [
      "show",
      "hide",
      "update:shown",
      "apply-show",
      "apply-hide",
      "close-group",
      "close-directive",
      "auto-hide",
      "resize",
      "dispose",
    ],
    data() {
      return {
        isShown: !1,
        isMounted: !1,
        skipTransition: !1,
        classes: { showFrom: !1, showTo: !1, hideFrom: !1, hideTo: !0 },
        result: {
          x: 0,
          y: 0,
          placement: "",
          strategy: this.strategy,
          arrow: { x: 0, y: 0, centerOffset: 0 },
          transformOrigin: null,
        },
        shownChildren: new Set(),
        lastAutoHide: !0,
      };
    },
    computed: {
      popperId() {
        return this.ariaId != null ? this.ariaId : this.randomId;
      },
      shouldMountContent() {
        return this.eagerMount || this.isMounted;
      },
      slotData() {
        return {
          popperId: this.popperId,
          isShown: this.isShown,
          shouldMountContent: this.shouldMountContent,
          skipTransition: this.skipTransition,
          autoHide:
            typeof this.autoHide == "function"
              ? this.lastAutoHide
              : this.autoHide,
          show: this.show,
          hide: this.hide,
          handleResize: this.handleResize,
          onResize: this.onResize,
          classes: Ar(Gt({}, this.classes), { popperClass: this.popperClass }),
          result: this.positioningDisabled ? null : this.result,
          attrs: this.$attrs,
        };
      },
      parentPopper() {
        var e;
        return (e = this[Xs]) == null ? void 0 : e.parentPopper;
      },
      hasPopperShowTriggerHover() {
        var e, t;
        return (
          ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) ||
          ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"))
        );
      },
    },
    watch: Gt(
      Gt(
        {
          shown: "$_autoShowHide",
          disabled(e) {
            e ? this.dispose() : this.init();
          },
          async container() {
            this.isShown &&
              (this.$_ensureTeleport(), await this.$_computePosition());
          },
        },
        ["triggers", "positioningDisabled"].reduce(
          (e, t) => ((e[t] = "$_refreshListeners"), e),
          {}
        )
      ),
      [
        "placement",
        "distance",
        "skidding",
        "boundary",
        "strategy",
        "overflowPadding",
        "arrowPadding",
        "preventOverflow",
        "shift",
        "shiftCrossAxis",
        "flip",
      ].reduce((e, t) => ((e[t] = "$_computePosition"), e), {})
    ),
    created() {
      (this.$_isDisposed = !0),
        (this.randomId = `popper_${[Math.random(), Date.now()]
          .map((e) => e.toString(36).substring(2, 10))
          .join("_")}`),
        this.autoMinSize &&
          console.warn(
            '[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'
          ),
        this.autoMaxSize &&
          console.warn(
            "[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead."
          );
    },
    mounted() {
      this.init(), this.$_detachPopperNode();
    },
    activated() {
      this.$_autoShowHide();
    },
    deactivated() {
      this.hide();
    },
    beforeUnmount() {
      this.dispose();
    },
    methods: {
      show({ event: e = null, skipDelay: t = !1, force: o = !1 } = {}) {
        var i, l;
        (((i = this.parentPopper) == null ? void 0 : i.lockedChild) &&
          this.parentPopper.lockedChild !== this) ||
          ((this.$_pendingHide = !1),
          (o || !this.disabled) &&
            (((l = this.parentPopper) == null ? void 0 : l.lockedChild) ===
              this && (this.parentPopper.lockedChild = null),
            this.$_scheduleShow(e, t),
            this.$emit("show"),
            (this.$_showFrameLocked = !0),
            requestAnimationFrame(() => {
              this.$_showFrameLocked = !1;
            })),
          this.$emit("update:shown", !0));
      },
      hide({ event: e = null, skipDelay: t = !1 } = {}) {
        var o;
        if (!this.$_hideInProgress) {
          if (this.shownChildren.size > 0) {
            this.$_pendingHide = !0;
            return;
          }
          if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
            this.parentPopper &&
              ((this.parentPopper.lockedChild = this),
              clearTimeout(this.parentPopper.lockedChildTimer),
              (this.parentPopper.lockedChildTimer = setTimeout(() => {
                this.parentPopper.lockedChild === this &&
                  (this.parentPopper.lockedChild.hide({ skipDelay: t }),
                  (this.parentPopper.lockedChild = null));
              }, 1e3)));
            return;
          }
          ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this &&
            (this.parentPopper.lockedChild = null),
            (this.$_pendingHide = !1),
            this.$_scheduleHide(e, t),
            this.$emit("hide"),
            this.$emit("update:shown", !1);
        }
      },
      init() {
        var e, t;
        !this.$_isDisposed ||
          ((this.$_isDisposed = !1),
          (this.isMounted = !1),
          (this.$_events = []),
          (this.$_preventShow = !1),
          (this.$_referenceNode =
            (t = (e = this.referenceNode) == null ? void 0 : e.call(this)) !=
            null
              ? t
              : this.$el),
          (this.$_targetNodes = this.targetNodes().filter(
            (o) => o.nodeType === o.ELEMENT_NODE
          )),
          (this.$_popperNode = this.popperNode()),
          (this.$_innerNode =
            this.$_popperNode.querySelector(".v-popper__inner")),
          (this.$_arrowNode = this.$_popperNode.querySelector(
            ".v-popper__arrow-container"
          )),
          this.$_swapTargetAttrs("title", "data-original-title"),
          this.$_detachPopperNode(),
          this.triggers.length && this.$_addEventListeners(),
          this.shown && this.show());
      },
      dispose() {
        this.$_isDisposed ||
          ((this.$_isDisposed = !0),
          this.$_removeEventListeners(),
          this.hide({ skipDelay: !0 }),
          this.$_detachPopperNode(),
          (this.isMounted = !1),
          (this.isShown = !1),
          this.$_updateParentShownChildren(!1),
          this.$_swapTargetAttrs("data-original-title", "title"),
          this.$emit("dispose"));
      },
      async onResize() {
        this.isShown && (await this.$_computePosition(), this.$emit("resize"));
      },
      async $_computePosition() {
        var e;
        if (this.$_isDisposed || this.positioningDisabled) return;
        const t = { strategy: this.strategy, middleware: [] };
        (this.distance || this.skidding) &&
          t.middleware.push(
            x0({ mainAxis: this.distance, crossAxis: this.skidding })
          );
        const o = this.placement.startsWith("auto");
        if (
          (o
            ? t.middleware.push(
                y0({
                  alignment:
                    (e = this.placement.split("-")[1]) != null ? e : "",
                })
              )
            : (t.placement = this.placement),
          this.preventOverflow &&
            (this.shift &&
              t.middleware.push(
                O0({
                  padding: this.overflowPadding,
                  boundary: this.boundary,
                  crossAxis: this.shiftCrossAxis,
                })
              ),
            !o &&
              this.flip &&
              t.middleware.push(
                w0({ padding: this.overflowPadding, boundary: this.boundary })
              )),
          t.middleware.push(
            d0({ element: this.$_arrowNode, padding: this.arrowPadding })
          ),
          this.arrowOverflow &&
            t.middleware.push({
              name: "arrowOverflow",
              fn: ({ placement: l, rects: c, middlewareData: f }) => {
                let d;
                const { centerOffset: v } = f.arrow;
                return (
                  l.startsWith("top") || l.startsWith("bottom")
                    ? (d = Math.abs(v) > c.reference.width / 2)
                    : (d = Math.abs(v) > c.reference.height / 2),
                  { data: { overflow: d } }
                );
              },
            }),
          this.autoMinSize || this.autoSize)
        ) {
          const l = this.autoSize
            ? this.autoSize
            : this.autoMinSize
            ? "min"
            : null;
          t.middleware.push({
            name: "autoSize",
            fn: ({ rects: c, placement: f, middlewareData: d }) => {
              var v;
              if ((v = d.autoSize) != null && v.skip) return {};
              let b, P;
              return (
                f.startsWith("top") || f.startsWith("bottom")
                  ? (b = c.reference.width)
                  : (P = c.reference.height),
                (this.$_innerNode.style[
                  l === "min" ? "minWidth" : l === "max" ? "maxWidth" : "width"
                ] = b != null ? `${b}px` : null),
                (this.$_innerNode.style[
                  l === "min"
                    ? "minHeight"
                    : l === "max"
                    ? "maxHeight"
                    : "height"
                ] = P != null ? `${P}px` : null),
                { data: { skip: !0 }, reset: { rects: !0 } }
              );
            },
          });
        }
        (this.autoMaxSize || this.autoBoundaryMaxSize) &&
          ((this.$_innerNode.style.maxWidth = null),
          (this.$_innerNode.style.maxHeight = null),
          t.middleware.push(
            E0({
              boundary: this.boundary,
              padding: this.overflowPadding,
              apply: ({ width: l, height: c }) => {
                (this.$_innerNode.style.maxWidth = l != null ? `${l}px` : null),
                  (this.$_innerNode.style.maxHeight =
                    c != null ? `${c}px` : null);
              },
            })
          ));
        const i = await N0(this.$_referenceNode, this.$_popperNode, t);
        Object.assign(this.result, {
          x: i.x,
          y: i.y,
          placement: i.placement,
          strategy: i.strategy,
          arrow: Gt(
            Gt({}, i.middlewareData.arrow),
            i.middlewareData.arrowOverflow
          ),
        });
      },
      $_scheduleShow(e = null, t = !1) {
        if (
          (this.$_updateParentShownChildren(!0),
          (this.$_hideInProgress = !1),
          clearTimeout(this.$_scheduleTimer),
          Bn && this.instantMove && Bn.instantMove && Bn !== this.parentPopper)
        ) {
          Bn.$_applyHide(!0), this.$_applyShow(!0);
          return;
        }
        t
          ? this.$_applyShow()
          : (this.$_scheduleTimer = setTimeout(
              this.$_applyShow.bind(this),
              this.$_computeDelay("show")
            ));
      },
      $_scheduleHide(e = null, t = !1) {
        if (this.shownChildren.size > 0) {
          this.$_pendingHide = !0;
          return;
        }
        this.$_updateParentShownChildren(!1),
          (this.$_hideInProgress = !0),
          clearTimeout(this.$_scheduleTimer),
          this.isShown && (Bn = this),
          t
            ? this.$_applyHide()
            : (this.$_scheduleTimer = setTimeout(
                this.$_applyHide.bind(this),
                this.$_computeDelay("hide")
              ));
      },
      $_computeDelay(e) {
        const t = this.delay;
        return parseInt((t && t[e]) || t || 0);
      },
      async $_applyShow(e = !1) {
        clearTimeout(this.$_disposeTimer),
          clearTimeout(this.$_scheduleTimer),
          (this.skipTransition = e),
          !this.isShown &&
            (this.$_ensureTeleport(),
            await Ks(),
            await this.$_computePosition(),
            await this.$_applyShowEffect(),
            this.positioningDisabled ||
              this.$_registerEventListeners(
                [...ji(this.$_referenceNode), ...ji(this.$_popperNode)],
                "scroll",
                () => {
                  this.$_computePosition();
                }
              ));
      },
      async $_applyShowEffect() {
        if (this.$_hideInProgress) return;
        if (this.computeTransformOrigin) {
          const t = this.$_referenceNode.getBoundingClientRect(),
            o = this.$_popperNode.querySelector(".v-popper__wrapper"),
            i = o.parentNode.getBoundingClientRect(),
            l = t.x + t.width / 2 - (i.left + o.offsetLeft),
            c = t.y + t.height / 2 - (i.top + o.offsetTop);
          this.result.transformOrigin = `${l}px ${c}px`;
        }
        (this.isShown = !0),
          this.$_applyAttrsToTarget({
            "aria-describedby": this.popperId,
            "data-popper-shown": "",
          });
        const e = this.showGroup;
        if (e) {
          let t;
          for (let o = 0; o < Ct.length; o++)
            (t = Ct[o]),
              t.showGroup !== e && (t.hide(), t.$emit("close-group"));
        }
        Ct.push(this), document.body.classList.add("v-popper--some-open");
        for (const t of nu(this.theme))
          au(t).push(this),
            document.body.classList.add(`v-popper--some-open--${t}`);
        this.$emit("apply-show"),
          (this.classes.showFrom = !0),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !1),
          await Ks(),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !0),
          this.noAutoFocus || this.$_popperNode.focus();
      },
      async $_applyHide(e = !1) {
        if (this.shownChildren.size > 0) {
          (this.$_pendingHide = !0), (this.$_hideInProgress = !1);
          return;
        }
        if ((clearTimeout(this.$_scheduleTimer), !this.isShown)) return;
        (this.skipTransition = e),
          iu(Ct, this),
          Ct.length === 0 &&
            document.body.classList.remove("v-popper--some-open");
        for (const o of nu(this.theme)) {
          const i = au(o);
          iu(i, this),
            i.length === 0 &&
              document.body.classList.remove(`v-popper--some-open--${o}`);
        }
        Bn === this && (Bn = null),
          (this.isShown = !1),
          this.$_applyAttrsToTarget({
            "aria-describedby": void 0,
            "data-popper-shown": void 0,
          }),
          clearTimeout(this.$_disposeTimer);
        const t = Co(this.theme, "disposeTimeout");
        t !== null &&
          (this.$_disposeTimer = setTimeout(() => {
            this.$_popperNode &&
              (this.$_detachPopperNode(), (this.isMounted = !1));
          }, t)),
          this.$_removeEventListeners("scroll"),
          this.$emit("apply-hide"),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !0),
          (this.classes.hideTo = !1),
          await Ks(),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !0);
      },
      $_autoShowHide() {
        this.shown ? this.show() : this.hide();
      },
      $_ensureTeleport() {
        if (this.$_isDisposed) return;
        let e = this.container;
        if (
          (typeof e == "string"
            ? (e = window.document.querySelector(e))
            : e === !1 && (e = this.$_targetNodes[0].parentNode),
          !e)
        )
          throw new Error("No container for popover: " + this.container);
        e.appendChild(this.$_popperNode), (this.isMounted = !0);
      },
      $_addEventListeners() {
        const e = (o) => {
          (this.isShown && !this.$_hideInProgress) ||
            ((o.usedByTooltip = !0),
            !this.$_preventShow && this.show({ event: o }));
        };
        this.$_registerTriggerListeners(
          this.$_targetNodes,
          ou,
          this.triggers,
          this.showTriggers,
          e
        ),
          this.$_registerTriggerListeners(
            [this.$_popperNode],
            ou,
            this.popperTriggers,
            this.popperShowTriggers,
            e
          );
        const t = (o) => {
          o.usedByTooltip || this.hide({ event: o });
        };
        this.$_registerTriggerListeners(
          this.$_targetNodes,
          ru,
          this.triggers,
          this.hideTriggers,
          t
        ),
          this.$_registerTriggerListeners(
            [this.$_popperNode],
            ru,
            this.popperTriggers,
            this.popperHideTriggers,
            t
          );
      },
      $_registerEventListeners(e, t, o) {
        this.$_events.push({ targetNodes: e, eventType: t, handler: o }),
          e.forEach((i) =>
            i.addEventListener(t, o, Mo ? { passive: !0 } : void 0)
          );
      },
      $_registerTriggerListeners(e, t, o, i, l) {
        let c = o;
        i != null && (c = typeof i == "function" ? i(c) : i),
          c.forEach((f) => {
            const d = t[f];
            d && this.$_registerEventListeners(e, d, l);
          });
      },
      $_removeEventListeners(e) {
        const t = [];
        this.$_events.forEach((o) => {
          const { targetNodes: i, eventType: l, handler: c } = o;
          !e || e === l
            ? i.forEach((f) => f.removeEventListener(l, c))
            : t.push(o);
        }),
          (this.$_events = t);
      },
      $_refreshListeners() {
        this.$_isDisposed ||
          (this.$_removeEventListeners(), this.$_addEventListeners());
      },
      $_handleGlobalClose(e, t = !1) {
        this.$_showFrameLocked ||
          (this.hide({ event: e }),
          e.closePopover
            ? this.$emit("close-directive")
            : this.$emit("auto-hide"),
          t &&
            ((this.$_preventShow = !0),
            setTimeout(() => {
              this.$_preventShow = !1;
            }, 300)));
      },
      $_detachPopperNode() {
        this.$_popperNode.parentNode &&
          this.$_popperNode.parentNode.removeChild(this.$_popperNode);
      },
      $_swapTargetAttrs(e, t) {
        for (const o of this.$_targetNodes) {
          const i = o.getAttribute(e);
          i && (o.removeAttribute(e), o.setAttribute(t, i));
        }
      },
      $_applyAttrsToTarget(e) {
        for (const t of this.$_targetNodes)
          for (const o in e) {
            const i = e[o];
            i == null ? t.removeAttribute(o) : t.setAttribute(o, i);
          }
      },
      $_updateParentShownChildren(e) {
        let t = this.parentPopper;
        for (; t; )
          e
            ? t.shownChildren.add(this.randomId)
            : (t.shownChildren.delete(this.randomId),
              t.$_pendingHide && t.hide()),
            (t = t.parentPopper);
      },
      $_isAimingPopper() {
        const e = this.$_referenceNode.getBoundingClientRect();
        if (mr >= e.left && mr <= e.right && gr >= e.top && gr <= e.bottom) {
          const t = this.$_popperNode.getBoundingClientRect(),
            o = mr - gn,
            i = gr - vn,
            c =
              t.left +
              t.width / 2 -
              gn +
              (t.top + t.height / 2) -
              vn +
              t.width +
              t.height,
            f = gn + o * c,
            d = vn + i * c;
          return (
            fi(gn, vn, f, d, t.left, t.top, t.left, t.bottom) ||
            fi(gn, vn, f, d, t.left, t.top, t.right, t.top) ||
            fi(gn, vn, f, d, t.right, t.top, t.right, t.bottom) ||
            fi(gn, vn, f, d, t.left, t.bottom, t.right, t.bottom)
          );
        }
        return !1;
      },
    },
    render() {
      return this.$slots.default(this.slotData);
    },
  });
typeof document < "u" &&
  typeof window < "u" &&
  (Ff
    ? (document.addEventListener(
        "touchstart",
        lu,
        Mo ? { passive: !0, capture: !0 } : !0
      ),
      document.addEventListener(
        "touchend",
        K0,
        Mo ? { passive: !0, capture: !0 } : !0
      ))
    : (window.addEventListener("mousedown", lu, !0),
      window.addEventListener("click", q0, !0)),
  window.addEventListener("resize", J0));
function lu(e) {
  for (let t = 0; t < Ct.length; t++) {
    const o = Ct[t];
    try {
      const i = o.popperNode();
      o.$_mouseDownContains = i.contains(e.target);
    } catch {}
  }
}
function q0(e) {
  Uf(e);
}
function K0(e) {
  Uf(e, !0);
}
function Uf(e, t = !1) {
  const o = {};
  for (let i = Ct.length - 1; i >= 0; i--) {
    const l = Ct[i];
    try {
      const c = (l.$_containsGlobalTarget = X0(l, e));
      (l.$_pendingHide = !1),
        requestAnimationFrame(() => {
          if (((l.$_pendingHide = !1), !o[l.randomId] && cu(l, c, e))) {
            if (
              (l.$_handleGlobalClose(e, t),
              !e.closeAllPopover && e.closePopover && c)
            ) {
              let d = l.parentPopper;
              for (; d; ) (o[d.randomId] = !0), (d = d.parentPopper);
              return;
            }
            let f = l.parentPopper;
            for (; f && cu(f, f.$_containsGlobalTarget, e); ) {
              f.$_handleGlobalClose(e, t);
              f = f.parentPopper;
            }
          }
        });
    } catch {}
  }
}
function X0(e, t) {
  const o = e.popperNode();
  return e.$_mouseDownContains || o.contains(t.target);
}
function cu(e, t, o) {
  return o.closeAllPopover || (o.closePopover && t) || (Y0(e, o) && !t);
}
function Y0(e, t) {
  if (typeof e.autoHide == "function") {
    const o = e.autoHide(t);
    return (e.lastAutoHide = o), o;
  }
  return e.autoHide;
}
function J0(e) {
  for (let t = 0; t < Ct.length; t++) Ct[t].$_computePosition(e);
}
let gn = 0,
  vn = 0,
  mr = 0,
  gr = 0;
typeof window < "u" &&
  window.addEventListener(
    "mousemove",
    (e) => {
      (gn = mr), (vn = gr), (mr = e.clientX), (gr = e.clientY);
    },
    Mo ? { passive: !0 } : void 0
  );
function fi(e, t, o, i, l, c, f, d) {
  const v =
      ((f - l) * (t - c) - (d - c) * (e - l)) /
      ((d - c) * (o - e) - (f - l) * (i - t)),
    b =
      ((o - e) * (t - c) - (i - t) * (e - l)) /
      ((d - c) * (o - e) - (f - l) * (i - t));
  return v >= 0 && v <= 1 && b >= 0 && b <= 1;
}
var os = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, l] of t) o[i] = l;
  return o;
};
const G0 = { extends: Hf() };
function Q0(e, t, o, i, l, c) {
  return (
    G(),
    Z(
      "div",
      {
        ref: "reference",
        class: on(["v-popper", { "v-popper--shown": e.slotData.isShown }]),
      },
      [Pi(e.$slots, "default", qp(of(e.slotData)))],
      2
    )
  );
}
var Z0 = os(G0, [["render", Q0]]);
function ew() {
  var e = window.navigator.userAgent,
    t = e.indexOf("MSIE ");
  if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o = e.indexOf("Trident/");
  if (o > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var l = e.indexOf("Edge/");
  return l > 0 ? parseInt(e.substring(l + 5, e.indexOf(".", l)), 10) : -1;
}
let yi;
function wa() {
  wa.init || ((wa.init = !0), (yi = ew() !== -1));
}
var rs = {
  name: "ResizeObserver",
  props: {
    emitOnMount: { type: Boolean, default: !1 },
    ignoreWidth: { type: Boolean, default: !1 },
    ignoreHeight: { type: Boolean, default: !1 },
  },
  emits: ["notify"],
  mounted() {
    wa(),
      Da(() => {
        (this._w = this.$el.offsetWidth),
          (this._h = this.$el.offsetHeight),
          this.emitOnMount && this.emitSize();
      });
    const e = document.createElement("object");
    (this._resizeObject = e),
      e.setAttribute("aria-hidden", "true"),
      e.setAttribute("tabindex", -1),
      (e.onload = this.addResizeHandlers),
      (e.type = "text/html"),
      yi && this.$el.appendChild(e),
      (e.data = "about:blank"),
      yi || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) ||
        (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
        ((this._w = this.$el.offsetWidth),
        (this._h = this.$el.offsetHeight),
        this.emitSize());
    },
    emitSize() {
      this.$emit("notify", { width: this._w, height: this._h });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener(
        "resize",
        this.compareAndNotify
      ),
        this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject &&
        this._resizeObject.onload &&
        (!yi &&
          this._resizeObject.contentDocument &&
          this._resizeObject.contentDocument.defaultView.removeEventListener(
            "resize",
            this.compareAndNotify
          ),
        this.$el.removeChild(this._resizeObject),
        (this._resizeObject.onload = null),
        (this._resizeObject = null));
    },
  },
};
const tw = Wh();
Hh("data-v-b329ee4c");
const nw = { class: "resize-observer", tabindex: "-1" };
Uh();
const ow = tw((e, t, o, i, l, c) => (G(), to("div", nw)));
rs.render = ow;
rs.__scopeId = "data-v-b329ee4c";
rs.__file = "src/components/ResizeObserver.vue";
var Wf = (e = "theme") => ({
  computed: {
    themeClass() {
      return V0(this[e]);
    },
  },
});
const rw = Ze({
    name: "VPopperContent",
    components: { ResizeObserver: rs },
    mixins: [Wf()],
    props: {
      popperId: String,
      theme: String,
      shown: Boolean,
      mounted: Boolean,
      skipTransition: Boolean,
      autoHide: Boolean,
      handleResize: Boolean,
      classes: Object,
      result: Object,
    },
    emits: ["hide", "resize"],
    methods: {
      toPx(e) {
        return e != null && !isNaN(e) ? `${e}px` : null;
      },
    },
  }),
  iw = ["id", "aria-hidden", "tabindex", "data-popper-placement"],
  sw = { ref: "inner", class: "v-popper__inner" },
  aw = D("div", { class: "v-popper__arrow-outer" }, null, -1),
  lw = D("div", { class: "v-popper__arrow-inner" }, null, -1),
  cw = [aw, lw];
function uw(e, t, o, i, l, c) {
  const f = xr("ResizeObserver");
  return (
    G(),
    Z(
      "div",
      {
        id: e.popperId,
        ref: "popover",
        class: on([
          "v-popper__popper",
          [
            e.themeClass,
            e.classes.popperClass,
            {
              "v-popper__popper--shown": e.shown,
              "v-popper__popper--hidden": !e.shown,
              "v-popper__popper--show-from": e.classes.showFrom,
              "v-popper__popper--show-to": e.classes.showTo,
              "v-popper__popper--hide-from": e.classes.hideFrom,
              "v-popper__popper--hide-to": e.classes.hideTo,
              "v-popper__popper--skip-transition": e.skipTransition,
              "v-popper__popper--arrow-overflow":
                e.result && e.result.arrow.overflow,
              "v-popper__popper--no-positioning": !e.result,
            },
          ],
        ]),
        style: Pt(
          e.result
            ? {
                position: e.result.strategy,
                transform: `translate3d(${Math.round(
                  e.result.x
                )}px,${Math.round(e.result.y)}px,0)`,
              }
            : void 0
        ),
        "aria-hidden": e.shown ? "false" : "true",
        tabindex: e.autoHide ? 0 : void 0,
        "data-popper-placement": e.result ? e.result.placement : void 0,
        onKeyup:
          t[2] || (t[2] = cf((d) => e.autoHide && e.$emit("hide"), ["esc"])),
      },
      [
        D("div", {
          class: "v-popper__backdrop",
          onClick: t[0] || (t[0] = (d) => e.autoHide && e.$emit("hide")),
        }),
        D(
          "div",
          {
            class: "v-popper__wrapper",
            style: Pt(
              e.result ? { transformOrigin: e.result.transformOrigin } : void 0
            ),
          },
          [
            D(
              "div",
              sw,
              [
                e.mounted
                  ? (G(),
                    Z(
                      qe,
                      { key: 0 },
                      [
                        D("div", null, [Pi(e.$slots, "default")]),
                        e.handleResize
                          ? (G(),
                            to(f, {
                              key: 0,
                              onNotify:
                                t[1] || (t[1] = (d) => e.$emit("resize", d)),
                            }))
                          : Qe("", !0),
                      ],
                      64
                    ))
                  : Qe("", !0),
              ],
              512
            ),
            D(
              "div",
              {
                ref: "arrow",
                class: "v-popper__arrow-container",
                style: Pt(
                  e.result
                    ? {
                        left: e.toPx(e.result.arrow.x),
                        top: e.toPx(e.result.arrow.y),
                      }
                    : void 0
                ),
              },
              cw,
              4
            ),
          ],
          4
        ),
      ],
      46,
      iw
    )
  );
}
var Vf = os(rw, [["render", uw]]),
  qf = {
    methods: {
      show(...e) {
        return this.$refs.popper.show(...e);
      },
      hide(...e) {
        return this.$refs.popper.hide(...e);
      },
      dispose(...e) {
        return this.$refs.popper.dispose(...e);
      },
      onResize(...e) {
        return this.$refs.popper.onResize(...e);
      },
    },
  };
const fw = Ze({
  name: "VPopperWrapper",
  components: { Popper: Z0, PopperContent: Vf },
  mixins: [qf, Wf("finalTheme")],
  props: { theme: { type: String, default: null } },
  computed: {
    finalTheme() {
      var e;
      return (e = this.theme) != null ? e : this.$options.vPopperTheme;
    },
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter(
        (e) => e !== this.$refs.popperContent.$el
      );
    },
  },
});
function dw(e, t, o, i, l, c) {
  const f = xr("PopperContent"),
    d = xr("Popper");
  return (
    G(),
    to(
      d,
      {
        ref: "popper",
        theme: e.finalTheme,
        "target-nodes": e.getTargetNodes,
        "popper-node": () => e.$refs.popperContent.$el,
        class: on([e.themeClass]),
      },
      {
        default: Oo(
          ({
            popperId: v,
            isShown: b,
            shouldMountContent: P,
            skipTransition: E,
            autoHide: T,
            show: M,
            hide: k,
            handleResize: N,
            onResize: Y,
            classes: L,
            result: ee,
          }) => [
            Pi(e.$slots, "default", { shown: b, show: M, hide: k }),
            Ue(
              f,
              {
                ref: "popperContent",
                "popper-id": v,
                theme: e.finalTheme,
                shown: b,
                mounted: P,
                "skip-transition": E,
                "auto-hide": T,
                "handle-resize": N,
                classes: L,
                result: ee,
                onHide: k,
                onResize: Y,
              },
              {
                default: Oo(() => [
                  Pi(e.$slots, "popper", { shown: b, hide: k }),
                ]),
                _: 2,
              },
              1032,
              [
                "popper-id",
                "theme",
                "shown",
                "mounted",
                "skip-transition",
                "auto-hide",
                "handle-resize",
                "classes",
                "result",
                "onHide",
                "onResize",
              ]
            ),
          ]
        ),
        _: 3,
      },
      8,
      ["theme", "target-nodes", "popper-node", "class"]
    )
  );
}
var Za = os(fw, [["render", dw]]);
Ze(Ar(Gt({}, Za), { name: "VDropdown", vPopperTheme: "dropdown" }));
Ze(Ar(Gt({}, Za), { name: "VMenu", vPopperTheme: "menu" }));
Ze(Ar(Gt({}, Za), { name: "VTooltip", vPopperTheme: "tooltip" }));
const pw = Ze({
    name: "VTooltipDirective",
    components: { Popper: Hf(), PopperContent: Vf },
    mixins: [qf],
    inheritAttrs: !1,
    props: {
      theme: { type: String, default: "tooltip" },
      html: { type: Boolean, default: (e) => Co(e.theme, "html") },
      content: { type: [String, Number, Function], default: null },
      loadingContent: {
        type: String,
        default: (e) => Co(e.theme, "loadingContent"),
      },
    },
    data() {
      return { asyncContent: null };
    },
    computed: {
      isContentAsync() {
        return typeof this.content == "function";
      },
      loading() {
        return this.isContentAsync && this.asyncContent == null;
      },
      finalContent() {
        return this.isContentAsync
          ? this.loading
            ? this.loadingContent
            : this.asyncContent
          : this.content;
      },
    },
    watch: {
      content: {
        handler() {
          this.fetchContent(!0);
        },
        immediate: !0,
      },
      async finalContent() {
        await this.$nextTick(), this.$refs.popper.onResize();
      },
    },
    created() {
      this.$_fetchId = 0;
    },
    methods: {
      fetchContent(e) {
        if (
          typeof this.content == "function" &&
          this.$_isShown &&
          (e || (!this.$_loading && this.asyncContent == null))
        ) {
          (this.asyncContent = null), (this.$_loading = !0);
          const t = ++this.$_fetchId,
            o = this.content(this);
          o.then ? o.then((i) => this.onResult(t, i)) : this.onResult(t, o);
        }
      },
      onResult(e, t) {
        e === this.$_fetchId &&
          ((this.$_loading = !1), (this.asyncContent = t));
      },
      onShow() {
        (this.$_isShown = !0), this.fetchContent();
      },
      onHide() {
        this.$_isShown = !1;
      },
    },
  }),
  hw = ["innerHTML"],
  mw = ["textContent"];
function gw(e, t, o, i, l, c) {
  const f = xr("PopperContent"),
    d = xr("Popper");
  return (
    G(),
    to(
      d,
      rf({ ref: "popper" }, e.$attrs, {
        theme: e.theme,
        "popper-node": () => e.$refs.popperContent.$el,
        onApplyShow: e.onShow,
        onApplyHide: e.onHide,
      }),
      {
        default: Oo(
          ({
            popperId: v,
            isShown: b,
            shouldMountContent: P,
            skipTransition: E,
            autoHide: T,
            hide: M,
            handleResize: k,
            onResize: N,
            classes: Y,
            result: L,
          }) => [
            Ue(
              f,
              {
                ref: "popperContent",
                class: on({ "v-popper--tooltip-loading": e.loading }),
                "popper-id": v,
                theme: e.theme,
                shown: b,
                mounted: P,
                "skip-transition": E,
                "auto-hide": T,
                "handle-resize": k,
                classes: Y,
                result: L,
                onHide: M,
                onResize: N,
              },
              {
                default: Oo(() => [
                  e.html
                    ? (G(),
                      Z(
                        "div",
                        { key: 0, innerHTML: e.finalContent },
                        null,
                        8,
                        hw
                      ))
                    : (G(),
                      Z(
                        "div",
                        { key: 1, textContent: be(e.finalContent) },
                        null,
                        8,
                        mw
                      )),
                ]),
                _: 2,
              },
              1032,
              [
                "class",
                "popper-id",
                "theme",
                "shown",
                "mounted",
                "skip-transition",
                "auto-hide",
                "handle-resize",
                "classes",
                "result",
                "onHide",
                "onResize",
              ]
            ),
          ]
        ),
        _: 1,
      },
      16,
      ["theme", "popper-node", "onApplyShow", "onApplyHide"]
    )
  );
}
var vw = os(pw, [["render", gw]]);
const Kf = "v-popper--has-tooltip";
function yw(e, t) {
  let o = e.placement;
  if (!o && t) for (const i of Bf) t[i] && (o = i);
  return o || (o = Co(e.theme || "tooltip", "placement")), o;
}
function Xf(e, t, o) {
  let i;
  const l = typeof t;
  return (
    l === "string"
      ? (i = { content: t })
      : t && l === "object"
      ? (i = t)
      : (i = { content: !1 }),
    (i.placement = yw(i, o)),
    (i.targetNodes = () => [e]),
    (i.referenceNode = () => e),
    i
  );
}
let Ys,
  Sr,
  bw = 0;
function ww() {
  if (Ys) return;
  (Sr = Ht([])),
    (Ys = uf({
      name: "VTooltipDirectiveApp",
      setup() {
        return { directives: Sr };
      },
      render() {
        return this.directives.map((t) =>
          Bm(
            vw,
            Ar(Gt({}, t.options), {
              shown: t.shown || t.options.shown,
              key: t.id,
            })
          )
        );
      },
      devtools: { hide: !0 },
    }));
  const e = document.createElement("div");
  document.body.appendChild(e), Ys.mount(e);
}
function _w(e, t, o) {
  ww();
  const i = Ht(Xf(e, t, o)),
    l = Ht(!1),
    c = { id: bw++, options: i, shown: l };
  return (
    Sr.value.push(c),
    e.classList && e.classList.add(Kf),
    (e.$_popper = {
      options: i,
      item: c,
      show() {
        l.value = !0;
      },
      hide() {
        l.value = !1;
      },
    })
  );
}
function Yf(e) {
  if (e.$_popper) {
    const t = Sr.value.indexOf(e.$_popper.item);
    t !== -1 && Sr.value.splice(t, 1),
      delete e.$_popper,
      delete e.$_popperOldShown,
      delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(Kf);
}
function uu(e, { value: t, modifiers: o }) {
  const i = Xf(e, t, o);
  if (!i.content || Co(i.theme || "tooltip", "disabled")) Yf(e);
  else {
    let l;
    e.$_popper ? ((l = e.$_popper), (l.options.value = i)) : (l = _w(e, t, o)),
      typeof t.shown < "u" &&
        t.shown !== e.$_popperOldShown &&
        ((e.$_popperOldShown = t.shown), t.shown ? l.show() : l.hide());
  }
}
var xw = {
  beforeMount: uu,
  updated: uu,
  beforeUnmount(e) {
    Yf(e);
  },
};
const Pw = xw,
  Jf = new Set(),
  yt = new WeakMap(),
  _o = new WeakMap(),
  Zn = new WeakMap(),
  _a = new WeakMap(),
  Ow = new WeakMap(),
  Ao = new WeakMap(),
  Ri = new WeakMap(),
  ur = new WeakSet();
let En;
const Qt = "__aa_tgt",
  xa = "__aa_del",
  Ew = (e) => {
    const t = Mw(e);
    t && t.forEach((o) => Aw(o));
  },
  Sw = (e) => {
    e.forEach((t) => {
      t.target === En && $w(), yt.has(t.target) && no(t.target);
    });
  };
function Tw(e) {
  const t = _a.get(e);
  t == null || t.disconnect();
  let o = yt.get(e),
    i = 0;
  const l = 5;
  o || ((o = ko(e)), yt.set(e, o));
  const { offsetWidth: c, offsetHeight: f } = En,
    v = [
      o.top - l,
      c - (o.left + l + o.width),
      f - (o.top + l + o.height),
      o.left - l,
    ]
      .map((P) => `${-1 * Math.floor(P)}px`)
      .join(" "),
    b = new IntersectionObserver(
      () => {
        ++i > 1 && no(e);
      },
      { root: En, threshold: 1, rootMargin: v }
    );
  b.observe(e), _a.set(e, b);
}
function no(e) {
  clearTimeout(Ri.get(e));
  const t = is(e),
    o = typeof t == "function" ? 500 : t.duration;
  Ri.set(
    e,
    setTimeout(async () => {
      const i = Zn.get(e);
      (!i || (await i.finished)) && (yt.set(e, ko(e)), Tw(e));
    }, o)
  );
}
function $w() {
  clearTimeout(Ri.get(En)),
    Ri.set(
      En,
      setTimeout(() => {
        Jf.forEach((e) => ed(e, (t) => Gf(() => no(t))));
      }, 100)
    );
}
function Cw(e) {
  setTimeout(() => {
    Ow.set(
      e,
      setInterval(() => Gf(no.bind(null, e)), 2e3)
    );
  }, Math.round(2e3 * Math.random()));
}
function Gf(e) {
  typeof requestIdleCallback == "function"
    ? requestIdleCallback(() => e())
    : requestAnimationFrame(() => e());
}
let Pa, mo;
typeof window < "u" &&
  ((En = document.documentElement),
  (Pa = new MutationObserver(Ew)),
  (mo = new ResizeObserver(Sw)),
  mo.observe(En));
function Mw(e) {
  return e.reduce((t, o) => {
    if (t === !1) return !1;
    if (o.target instanceof Element) {
      if ((Js(o.target), !t.has(o.target))) {
        t.add(o.target);
        for (let i = 0; i < o.target.children.length; i++) {
          const l = o.target.children.item(i);
          if (!!l) {
            if (xa in l) return !1;
            Js(o.target, l), t.add(l);
          }
        }
      }
      if (o.removedNodes.length)
        for (let i = 0; i < o.removedNodes.length; i++) {
          const l = o.removedNodes[i];
          if (xa in l) return !1;
          l instanceof Element &&
            (t.add(l),
            Js(o.target, l),
            _o.set(l, [o.previousSibling, o.nextSibling]));
        }
    }
    return t;
  }, new Set());
}
function Js(e, t) {
  !t && !(Qt in e)
    ? Object.defineProperty(e, Qt, { value: e })
    : t && !(Qt in t) && Object.defineProperty(t, Qt, { value: e });
}
function Aw(e) {
  var t;
  const o = En.contains(e),
    i = yt.has(e);
  o && _o.has(e) && _o.delete(e),
    Zn.has(e) && ((t = Zn.get(e)) === null || t === void 0 || t.cancel()),
    i && o ? kw(e) : i && !o ? Rw(e) : jw(e);
}
function Nt(e) {
  return Number(e.replace(/[^0-9.\-]/g, ""));
}
function ko(e) {
  const t = e.getBoundingClientRect();
  return {
    top: t.top + window.scrollY,
    left: t.left + window.scrollX,
    width: t.width,
    height: t.height,
  };
}
function Qf(e, t, o) {
  let i = t.width,
    l = t.height,
    c = o.width,
    f = o.height;
  const d = getComputedStyle(e);
  if (d.getPropertyValue("box-sizing") === "content-box") {
    const b =
        Nt(d.paddingTop) +
        Nt(d.paddingBottom) +
        Nt(d.borderTopWidth) +
        Nt(d.borderBottomWidth),
      P =
        Nt(d.paddingLeft) +
        Nt(d.paddingRight) +
        Nt(d.borderRightWidth) +
        Nt(d.borderLeftWidth);
    (i -= P), (c -= P), (l -= b), (f -= b);
  }
  return [i, c, l, f].map(Math.round);
}
function is(e) {
  return Qt in e && Ao.has(e[Qt])
    ? Ao.get(e[Qt])
    : { duration: 250, easing: "ease-in-out" };
}
function Zf(e) {
  if (Qt in e) return e[Qt];
}
function el(e) {
  const t = Zf(e);
  return t ? ur.has(t) : !1;
}
function ed(e, ...t) {
  t.forEach((o) => o(e, Ao.has(e)));
  for (let o = 0; o < e.children.length; o++) {
    const i = e.children.item(o);
    i && t.forEach((l) => l(i, Ao.has(i)));
  }
}
function kw(e) {
  const t = yt.get(e),
    o = ko(e);
  if (!el(e)) return yt.set(e, o);
  let i;
  if (!t) return;
  const l = is(e);
  if (typeof l != "function") {
    const c = t.left - o.left,
      f = t.top - o.top,
      [d, v, b, P] = Qf(e, t, o),
      E = { transform: `translate(${c}px, ${f}px)` },
      T = { transform: "translate(0, 0)" };
    d !== v && ((E.width = `${d}px`), (T.width = `${v}px`)),
      b !== P && ((E.height = `${b}px`), (T.height = `${P}px`)),
      (i = e.animate([E, T], { duration: l.duration, easing: l.easing }));
  } else (i = new Animation(l(e, "remain", t, o))), i.play();
  Zn.set(e, i), yt.set(e, o), i.addEventListener("finish", no.bind(null, e));
}
function jw(e) {
  const t = ko(e);
  yt.set(e, t);
  const o = is(e);
  if (!el(e)) return;
  let i;
  typeof o != "function"
    ? (i = e.animate(
        [
          { transform: "scale(.98)", opacity: 0 },
          { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
          { transform: "scale(1)", opacity: 1 },
        ],
        { duration: o.duration * 1.5, easing: "ease-in" }
      ))
    : ((i = new Animation(o(e, "add", t))), i.play()),
    Zn.set(e, i),
    i.addEventListener("finish", no.bind(null, e));
}
function Rw(e) {
  var t;
  if (!_o.has(e) || !yt.has(e)) return;
  const [o, i] = _o.get(e);
  Object.defineProperty(e, xa, { value: !0 }),
    i && i.parentNode && i.parentNode instanceof Element
      ? i.parentNode.insertBefore(e, i)
      : o && o.parentNode
      ? o.parentNode.appendChild(e)
      : (t = Zf(e)) === null || t === void 0 || t.appendChild(e);
  function l() {
    var T;
    e.remove(),
      yt.delete(e),
      _o.delete(e),
      Zn.delete(e),
      (T = _a.get(e)) === null || T === void 0 || T.disconnect();
  }
  if (!el(e)) return l();
  const [c, f, d, v] = Iw(e),
    b = is(e),
    P = yt.get(e);
  let E;
  Object.assign(e.style, {
    position: "absolute",
    top: `${c}px`,
    left: `${f}px`,
    width: `${d}px`,
    height: `${v}px`,
    margin: 0,
    pointerEvents: "none",
    transformOrigin: "center",
    zIndex: 100,
  }),
    typeof b != "function"
      ? (E = e.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(.98)", opacity: 0 },
          ],
          { duration: b.duration, easing: "ease-out" }
        ))
      : ((E = new Animation(b(e, "remove", P))), E.play()),
    Zn.set(e, E),
    E.addEventListener("finish", l);
}
function Iw(e) {
  const t = yt.get(e),
    [o, , i] = Qf(e, t, ko(e));
  let l = e.parentElement;
  for (
    ;
    l &&
    (getComputedStyle(l).position === "static" || l instanceof HTMLBodyElement);

  )
    l = l.parentElement;
  l || (l = document.body);
  const c = getComputedStyle(l),
    f = yt.get(l) || ko(l),
    d = Math.round(t.top - f.top) - Nt(c.borderTopWidth),
    v = Math.round(t.left - f.left) - Nt(c.borderLeftWidth);
  return [d, v, o, i];
}
function Dw(e, t = {}) {
  return (
    Pa &&
      mo &&
      ((window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        typeof t != "function" &&
        !t.disrespectUserMotionPreference) ||
        (ur.add(e),
        getComputedStyle(e).position === "static" &&
          Object.assign(e.style, { position: "relative" }),
        ed(e, no, Cw, (l) => (mo == null ? void 0 : mo.observe(l))),
        typeof t == "function"
          ? Ao.set(e, t)
          : Ao.set(e, { duration: 250, easing: "ease-in-out", ...t }),
        Pa.observe(e, { childList: !0 }),
        Jf.add(e))),
    Object.freeze({
      parent: e,
      enable: () => {
        ur.add(e);
      },
      disable: () => {
        ur.delete(e);
      },
      isEnabled: () => ur.has(e),
    })
  );
}
const zw = {
    mounted: (e, t) => {
      Dw(e, t.value || {});
    },
  },
  Lw = {
    install(e) {
      e.directive("auto-animate", zw);
    },
  };
const Nw = fg(),
  ss = uf(l0);
window.addEventListener("message", (e) => {
  vt.emit(e.data.action, e.data.data || {});
});
ss.use(Nw);
ss.use(Lw);
ss.directive("tooltip", Pw);
ss.mount("#felisRadioV2");
