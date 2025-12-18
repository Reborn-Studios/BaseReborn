function eb(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const l = Object.getOwnPropertyDescriptor(r, i);
          l &&
            Object.defineProperty(
              e,
              i,
              l.get ? l : { enumerable: !0, get: () => r[i] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const s of l.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = n(i);
    fetch(i.href, l);
  }
})();
var su =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Ui(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var X3 = { exports: {} },
  Bc = {},
  Z3 = { exports: {} },
  Ie = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ps = Symbol.for("react.element"),
  tb = Symbol.for("react.portal"),
  nb = Symbol.for("react.fragment"),
  rb = Symbol.for("react.strict_mode"),
  ib = Symbol.for("react.profiler"),
  ob = Symbol.for("react.provider"),
  lb = Symbol.for("react.context"),
  ub = Symbol.for("react.forward_ref"),
  sb = Symbol.for("react.suspense"),
  ab = Symbol.for("react.memo"),
  cb = Symbol.for("react.lazy"),
  oy = Symbol.iterator;
function fb(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (oy && e[oy]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var J3 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ew = Object.assign,
  tw = {};
function Fl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = tw),
    (this.updater = n || J3);
}
Fl.prototype.isReactComponent = {};
Fl.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Fl.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function nw() {}
nw.prototype = Fl.prototype;
function Ng(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = tw),
    (this.updater = n || J3);
}
var Lg = (Ng.prototype = new nw());
Lg.constructor = Ng;
ew(Lg, Fl.prototype);
Lg.isPureReactComponent = !0;
var ly = Array.isArray,
  rw = Object.prototype.hasOwnProperty,
  Mg = { current: null },
  iw = { key: !0, ref: !0, __self: !0, __source: !0 };
function ow(e, t, n) {
  var r,
    i = {},
    l = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (l = "" + t.key),
    t))
      rw.call(t, r) && !iw.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var f = Array(a), d = 0; d < a; d++) f[d] = arguments[d + 2];
    i.children = f;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: ps,
    type: e,
    key: l,
    ref: s,
    props: i,
    _owner: Mg.current,
  };
}
function db(e, t) {
  return {
    $$typeof: ps,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Fg(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ps;
}
function pb(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var uy = /\/+/g;
function sp(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? pb("" + e.key)
    : t.toString(36);
}
function Na(e, t, n, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (l) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ps:
          case tb:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (i = i(s)),
      (e = r === "" ? "." + sp(s, 0) : r),
      ly(i)
        ? ((n = ""),
          e != null && (n = e.replace(uy, "$&/") + "/"),
          Na(i, t, n, "", function (d) {
            return d;
          }))
        : i != null &&
          (Fg(i) &&
            (i = db(
              i,
              n +
                (!i.key || (s && s.key === i.key)
                  ? ""
                  : ("" + i.key).replace(uy, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), ly(e)))
    for (var a = 0; a < e.length; a++) {
      l = e[a];
      var f = r + sp(l, a);
      s += Na(l, t, n, f, i);
    }
  else if (((f = fb(e)), typeof f == "function"))
    for (e = f.call(e), a = 0; !(l = e.next()).done; )
      (l = l.value), (f = r + sp(l, a++)), (s += Na(l, t, n, f, i));
  else if (l === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return s;
}
function da(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Na(e, r, "", "", function (l) {
      return t.call(n, l, i++);
    }),
    r
  );
}
function hb(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Kt = { current: null },
  La = { transition: null },
  gb = {
    ReactCurrentDispatcher: Kt,
    ReactCurrentBatchConfig: La,
    ReactCurrentOwner: Mg,
  };
function lw() {
  throw Error("act(...) is not supported in production builds of React.");
}
Ie.Children = {
  map: da,
  forEach: function (e, t, n) {
    da(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      da(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      da(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Fg(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
Ie.Component = Fl;
Ie.Fragment = nb;
Ie.Profiler = ib;
Ie.PureComponent = Ng;
Ie.StrictMode = rb;
Ie.Suspense = sb;
Ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gb;
Ie.act = lw;
Ie.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = ew({}, e.props),
    i = e.key,
    l = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((l = t.ref), (s = Mg.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (f in t)
      rw.call(t, f) &&
        !iw.hasOwnProperty(f) &&
        (r[f] = t[f] === void 0 && a !== void 0 ? a[f] : t[f]);
  }
  var f = arguments.length - 2;
  if (f === 1) r.children = n;
  else if (1 < f) {
    a = Array(f);
    for (var d = 0; d < f; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: ps, type: e.type, key: i, ref: l, props: r, _owner: s };
};
Ie.createContext = function (e) {
  return (
    (e = {
      $$typeof: lb,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ob, _context: e }),
    (e.Consumer = e)
  );
};
Ie.createElement = ow;
Ie.createFactory = function (e) {
  var t = ow.bind(null, e);
  return (t.type = e), t;
};
Ie.createRef = function () {
  return { current: null };
};
Ie.forwardRef = function (e) {
  return { $$typeof: ub, render: e };
};
Ie.isValidElement = Fg;
Ie.lazy = function (e) {
  return { $$typeof: cb, _payload: { _status: -1, _result: e }, _init: hb };
};
Ie.memo = function (e, t) {
  return { $$typeof: ab, type: e, compare: t === void 0 ? null : t };
};
Ie.startTransition = function (e) {
  var t = La.transition;
  La.transition = {};
  try {
    e();
  } finally {
    La.transition = t;
  }
};
Ie.unstable_act = lw;
Ie.useCallback = function (e, t) {
  return Kt.current.useCallback(e, t);
};
Ie.useContext = function (e) {
  return Kt.current.useContext(e);
};
Ie.useDebugValue = function () {};
Ie.useDeferredValue = function (e) {
  return Kt.current.useDeferredValue(e);
};
Ie.useEffect = function (e, t) {
  return Kt.current.useEffect(e, t);
};
Ie.useId = function () {
  return Kt.current.useId();
};
Ie.useImperativeHandle = function (e, t, n) {
  return Kt.current.useImperativeHandle(e, t, n);
};
Ie.useInsertionEffect = function (e, t) {
  return Kt.current.useInsertionEffect(e, t);
};
Ie.useLayoutEffect = function (e, t) {
  return Kt.current.useLayoutEffect(e, t);
};
Ie.useMemo = function (e, t) {
  return Kt.current.useMemo(e, t);
};
Ie.useReducer = function (e, t, n) {
  return Kt.current.useReducer(e, t, n);
};
Ie.useRef = function (e) {
  return Kt.current.useRef(e);
};
Ie.useState = function (e) {
  return Kt.current.useState(e);
};
Ie.useSyncExternalStore = function (e, t, n) {
  return Kt.current.useSyncExternalStore(e, t, n);
};
Ie.useTransition = function () {
  return Kt.current.useTransition();
};
Ie.version = "18.3.1";
Z3.exports = Ie;
var A = Z3.exports;
const qe = Ui(A),
  uw = eb({ __proto__: null, default: qe }, [A]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mb = A,
  vb = Symbol.for("react.element"),
  yb = Symbol.for("react.fragment"),
  wb = Object.prototype.hasOwnProperty,
  xb = mb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Sb = { key: !0, ref: !0, __self: !0, __source: !0 };
function sw(e, t, n) {
  var r,
    i = {},
    l = null,
    s = null;
  n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (s = t.ref);
  for (r in t) wb.call(t, r) && !Sb.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: vb,
    type: e,
    key: l,
    ref: s,
    props: i,
    _owner: xb.current,
  };
}
Bc.Fragment = yb;
Bc.jsx = sw;
Bc.jsxs = sw;
X3.exports = Bc;
var $g = X3.exports;
const $t = $g.Fragment,
  D = $g.jsx,
  K = $g.jsxs;
var aw = { exports: {} },
  Pn = {},
  cw = { exports: {} },
  fw = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(W, te) {
    var _ = W.length;
    W.push(te);
    e: for (; 0 < _; ) {
      var ne = (_ - 1) >>> 1,
        se = W[ne];
      if (0 < i(se, te)) (W[ne] = te), (W[_] = se), (_ = ne);
      else break e;
    }
  }
  function n(W) {
    return W.length === 0 ? null : W[0];
  }
  function r(W) {
    if (W.length === 0) return null;
    var te = W[0],
      _ = W.pop();
    if (_ !== te) {
      W[0] = _;
      e: for (var ne = 0, se = W.length, O = se >>> 1; ne < O; ) {
        var ve = 2 * (ne + 1) - 1,
          Fe = W[ve],
          we = ve + 1,
          nt = W[we];
        if (0 > i(Fe, _))
          we < se && 0 > i(nt, Fe)
            ? ((W[ne] = nt), (W[we] = _), (ne = we))
            : ((W[ne] = Fe), (W[ve] = _), (ne = ve));
        else if (we < se && 0 > i(nt, _)) (W[ne] = nt), (W[we] = _), (ne = we);
        else break e;
      }
    }
    return te;
  }
  function i(W, te) {
    var _ = W.sortIndex - te.sortIndex;
    return _ !== 0 ? _ : W.id - te.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var s = Date,
      a = s.now();
    e.unstable_now = function () {
      return s.now() - a;
    };
  }
  var f = [],
    d = [],
    p = 1,
    g = null,
    v = 3,
    m = !1,
    E = !1,
    S = !1,
    N = typeof setTimeout == "function" ? setTimeout : null,
    y = typeof clearTimeout == "function" ? clearTimeout : null,
    x = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function k(W) {
    for (var te = n(d); te !== null; ) {
      if (te.callback === null) r(d);
      else if (te.startTime <= W)
        r(d), (te.sortIndex = te.expirationTime), t(f, te);
      else break;
      te = n(d);
    }
  }
  function I(W) {
    if (((S = !1), k(W), !E))
      if (n(f) !== null) (E = !0), ge(M);
      else {
        var te = n(d);
        te !== null && me(I, te.startTime - W);
      }
  }
  function M(W, te) {
    (E = !1), S && ((S = !1), y(B), (B = -1)), (m = !0);
    var _ = v;
    try {
      for (
        k(te), g = n(f);
        g !== null && (!(g.expirationTime > te) || (W && !G()));

      ) {
        var ne = g.callback;
        if (typeof ne == "function") {
          (g.callback = null), (v = g.priorityLevel);
          var se = ne(g.expirationTime <= te);
          (te = e.unstable_now()),
            typeof se == "function" ? (g.callback = se) : g === n(f) && r(f),
            k(te);
        } else r(f);
        g = n(f);
      }
      if (g !== null) var O = !0;
      else {
        var ve = n(d);
        ve !== null && me(I, ve.startTime - te), (O = !1);
      }
      return O;
    } finally {
      (g = null), (v = _), (m = !1);
    }
  }
  var P = !1,
    $ = null,
    B = -1,
    Y = 5,
    ee = -1;
  function G() {
    return !(e.unstable_now() - ee < Y);
  }
  function Z() {
    if ($ !== null) {
      var W = e.unstable_now();
      ee = W;
      var te = !0;
      try {
        te = $(!0, W);
      } finally {
        te ? re() : ((P = !1), ($ = null));
      }
    } else P = !1;
  }
  var re;
  if (typeof x == "function")
    re = function () {
      x(Z);
    };
  else if (typeof MessageChannel < "u") {
    var ae = new MessageChannel(),
      ce = ae.port2;
    (ae.port1.onmessage = Z),
      (re = function () {
        ce.postMessage(null);
      });
  } else
    re = function () {
      N(Z, 0);
    };
  function ge(W) {
    ($ = W), P || ((P = !0), re());
  }
  function me(W, te) {
    B = N(function () {
      W(e.unstable_now());
    }, te);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (W) {
      W.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      E || m || ((E = !0), ge(M));
    }),
    (e.unstable_forceFrameRate = function (W) {
      0 > W || 125 < W
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (Y = 0 < W ? Math.floor(1e3 / W) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(f);
    }),
    (e.unstable_next = function (W) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var te = 3;
          break;
        default:
          te = v;
      }
      var _ = v;
      v = te;
      try {
        return W();
      } finally {
        v = _;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (W, te) {
      switch (W) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          W = 3;
      }
      var _ = v;
      v = W;
      try {
        return te();
      } finally {
        v = _;
      }
    }),
    (e.unstable_scheduleCallback = function (W, te, _) {
      var ne = e.unstable_now();
      switch (
        (typeof _ == "object" && _ !== null
          ? ((_ = _.delay), (_ = typeof _ == "number" && 0 < _ ? ne + _ : ne))
          : (_ = ne),
        W)
      ) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return (
        (se = _ + se),
        (W = {
          id: p++,
          callback: te,
          priorityLevel: W,
          startTime: _,
          expirationTime: se,
          sortIndex: -1,
        }),
        _ > ne
          ? ((W.sortIndex = _),
            t(d, W),
            n(f) === null &&
              W === n(d) &&
              (S ? (y(B), (B = -1)) : (S = !0), me(I, _ - ne)))
          : ((W.sortIndex = se), t(f, W), E || m || ((E = !0), ge(M))),
        W
      );
    }),
    (e.unstable_shouldYield = G),
    (e.unstable_wrapCallback = function (W) {
      var te = v;
      return function () {
        var _ = v;
        v = te;
        try {
          return W.apply(this, arguments);
        } finally {
          v = _;
        }
      };
    });
})(fw);
cw.exports = fw;
var Cb = cw.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eb = A,
  Tn = Cb;
function Q(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var dw = new Set(),
  Wu = {};
function Po(e, t) {
  _l(e, t), _l(e + "Capture", t);
}
function _l(e, t) {
  for (Wu[e] = t, e = 0; e < t.length; e++) dw.add(t[e]);
}
var Qr = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  hh = Object.prototype.hasOwnProperty,
  kb =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  sy = {},
  ay = {};
function bb(e) {
  return hh.call(ay, e)
    ? !0
    : hh.call(sy, e)
    ? !1
    : kb.test(e)
    ? (ay[e] = !0)
    : ((sy[e] = !0), !1);
}
function _b(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Ob(e, t, n, r) {
  if (t === null || typeof t > "u" || _b(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Qt(e, t, n, r, i, l, s) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = l),
    (this.removeEmptyString = s);
}
var Pt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Pt[e] = new Qt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Pt[t] = new Qt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Pt[e] = new Qt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Pt[e] = new Qt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Pt[e] = new Qt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Pt[e] = new Qt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Pt[e] = new Qt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Pt[e] = new Qt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Pt[e] = new Qt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var zg = /[\-:]([a-z])/g;
function Bg(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zg, Bg);
    Pt[t] = new Qt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zg, Bg);
    Pt[t] = new Qt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(zg, Bg);
  Pt[t] = new Qt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Pt[e] = new Qt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Pt.xlinkHref = new Qt(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Pt[e] = new Qt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hg(e, t, n, r) {
  var i = Pt.hasOwnProperty(t) ? Pt[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Ob(t, n, i, r) && (n = null),
    r || i === null
      ? bb(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ei = Eb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  pa = Symbol.for("react.element"),
  nl = Symbol.for("react.portal"),
  rl = Symbol.for("react.fragment"),
  Ug = Symbol.for("react.strict_mode"),
  gh = Symbol.for("react.profiler"),
  pw = Symbol.for("react.provider"),
  hw = Symbol.for("react.context"),
  Wg = Symbol.for("react.forward_ref"),
  mh = Symbol.for("react.suspense"),
  vh = Symbol.for("react.suspense_list"),
  jg = Symbol.for("react.memo"),
  yi = Symbol.for("react.lazy"),
  gw = Symbol.for("react.offscreen"),
  cy = Symbol.iterator;
function au(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (cy && e[cy]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var at = Object.assign,
  ap;
function wu(e) {
  if (ap === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ap = (t && t[1]) || "";
    }
  return (
    `
` +
    ap +
    e
  );
}
var cp = !1;
function fp(e, t) {
  if (!e || cp) return "";
  cp = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var i = d.stack.split(`
`),
          l = r.stack.split(`
`),
          s = i.length - 1,
          a = l.length - 1;
        1 <= s && 0 <= a && i[s] !== l[a];

      )
        a--;
      for (; 1 <= s && 0 <= a; s--, a--)
        if (i[s] !== l[a]) {
          if (s !== 1 || a !== 1)
            do
              if ((s--, a--, 0 > a || i[s] !== l[a])) {
                var f =
                  `
` + i[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    f.includes("<anonymous>") &&
                    (f = f.replace("<anonymous>", e.displayName)),
                  f
                );
              }
            while (1 <= s && 0 <= a);
          break;
        }
    }
  } finally {
    (cp = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? wu(e) : "";
}
function Tb(e) {
  switch (e.tag) {
    case 5:
      return wu(e.type);
    case 16:
      return wu("Lazy");
    case 13:
      return wu("Suspense");
    case 19:
      return wu("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = fp(e.type, !1)), e;
    case 11:
      return (e = fp(e.type.render, !1)), e;
    case 1:
      return (e = fp(e.type, !0)), e;
    default:
      return "";
  }
}
function yh(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case rl:
      return "Fragment";
    case nl:
      return "Portal";
    case gh:
      return "Profiler";
    case Ug:
      return "StrictMode";
    case mh:
      return "Suspense";
    case vh:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case hw:
        return (e.displayName || "Context") + ".Consumer";
      case pw:
        return (e._context.displayName || "Context") + ".Provider";
      case Wg:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case jg:
        return (
          (t = e.displayName || null), t !== null ? t : yh(e.type) || "Memo"
        );
      case yi:
        (t = e._payload), (e = e._init);
        try {
          return yh(e(t));
        } catch {}
    }
  return null;
}
function Ib(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return yh(t);
    case 8:
      return t === Ug ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Fi(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function mw(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Pb(e) {
  var t = mw(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      l = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (s) {
          (r = "" + s), l.call(this, s);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function ha(e) {
  e._valueTracker || (e._valueTracker = Pb(e));
}
function vw(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = mw(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Za(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function wh(e, t) {
  var n = t.checked;
  return at({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function fy(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Fi(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function yw(e, t) {
  (t = t.checked), t != null && Hg(e, "checked", t, !1);
}
function xh(e, t) {
  yw(e, t);
  var n = Fi(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Sh(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Sh(e, t.type, Fi(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function dy(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Sh(e, t, n) {
  (t !== "number" || Za(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var xu = Array.isArray;
function hl(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Fi(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ch(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Q(91));
  return at({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function py(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(Q(92));
      if (xu(n)) {
        if (1 < n.length) throw Error(Q(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Fi(n) };
}
function ww(e, t) {
  var n = Fi(t.value),
    r = Fi(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function hy(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function xw(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Eh(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? xw(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var ga,
  Sw = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        ga = ga || document.createElement("div"),
          ga.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = ga.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function ju(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var _u = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Rb = ["Webkit", "ms", "Moz", "O"];
Object.keys(_u).forEach(function (e) {
  Rb.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (_u[t] = _u[e]);
  });
});
function Cw(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (_u.hasOwnProperty(e) && _u[e])
    ? ("" + t).trim()
    : t + "px";
}
function Ew(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Cw(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Ab = at(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function kh(e, t) {
  if (t) {
    if (Ab[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(Q(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Q(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(Q(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Q(62));
  }
}
function bh(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var _h = null;
function Vg(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Oh = null,
  gl = null,
  ml = null;
function gy(e) {
  if ((e = ms(e))) {
    if (typeof Oh != "function") throw Error(Q(280));
    var t = e.stateNode;
    t && ((t = Vc(t)), Oh(e.stateNode, e.type, t));
  }
}
function kw(e) {
  gl ? (ml ? ml.push(e) : (ml = [e])) : (gl = e);
}
function bw() {
  if (gl) {
    var e = gl,
      t = ml;
    if (((ml = gl = null), gy(e), t)) for (e = 0; e < t.length; e++) gy(t[e]);
  }
}
function _w(e, t) {
  return e(t);
}
function Ow() {}
var dp = !1;
function Tw(e, t, n) {
  if (dp) return e(t, n);
  dp = !0;
  try {
    return _w(e, t, n);
  } finally {
    (dp = !1), (gl !== null || ml !== null) && (Ow(), bw());
  }
}
function Vu(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Vc(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(Q(231, t, typeof n));
  return n;
}
var Th = !1;
if (Qr)
  try {
    var cu = {};
    Object.defineProperty(cu, "passive", {
      get: function () {
        Th = !0;
      },
    }),
      window.addEventListener("test", cu, cu),
      window.removeEventListener("test", cu, cu);
  } catch {
    Th = !1;
  }
function Db(e, t, n, r, i, l, s, a, f) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var Ou = !1,
  Ja = null,
  ec = !1,
  Ih = null,
  Nb = {
    onError: function (e) {
      (Ou = !0), (Ja = e);
    },
  };
function Lb(e, t, n, r, i, l, s, a, f) {
  (Ou = !1), (Ja = null), Db.apply(Nb, arguments);
}
function Mb(e, t, n, r, i, l, s, a, f) {
  if ((Lb.apply(this, arguments), Ou)) {
    if (Ou) {
      var d = Ja;
      (Ou = !1), (Ja = null);
    } else throw Error(Q(198));
    ec || ((ec = !0), (Ih = d));
  }
}
function Ro(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Iw(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function my(e) {
  if (Ro(e) !== e) throw Error(Q(188));
}
function Fb(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Ro(e)), t === null)) throw Error(Q(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === n) return my(i), e;
        if (l === r) return my(i), t;
        l = l.sibling;
      }
      throw Error(Q(188));
    }
    if (n.return !== r.return) (n = i), (r = l);
    else {
      for (var s = !1, a = i.child; a; ) {
        if (a === n) {
          (s = !0), (n = i), (r = l);
          break;
        }
        if (a === r) {
          (s = !0), (r = i), (n = l);
          break;
        }
        a = a.sibling;
      }
      if (!s) {
        for (a = l.child; a; ) {
          if (a === n) {
            (s = !0), (n = l), (r = i);
            break;
          }
          if (a === r) {
            (s = !0), (r = l), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!s) throw Error(Q(189));
      }
    }
    if (n.alternate !== r) throw Error(Q(190));
  }
  if (n.tag !== 3) throw Error(Q(188));
  return n.stateNode.current === n ? e : t;
}
function Pw(e) {
  return (e = Fb(e)), e !== null ? Rw(e) : null;
}
function Rw(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Rw(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Aw = Tn.unstable_scheduleCallback,
  vy = Tn.unstable_cancelCallback,
  $b = Tn.unstable_shouldYield,
  zb = Tn.unstable_requestPaint,
  gt = Tn.unstable_now,
  Bb = Tn.unstable_getCurrentPriorityLevel,
  Gg = Tn.unstable_ImmediatePriority,
  Dw = Tn.unstable_UserBlockingPriority,
  tc = Tn.unstable_NormalPriority,
  Hb = Tn.unstable_LowPriority,
  Nw = Tn.unstable_IdlePriority,
  Hc = null,
  _r = null;
function Ub(e) {
  if (_r && typeof _r.onCommitFiberRoot == "function")
    try {
      _r.onCommitFiberRoot(Hc, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var dr = Math.clz32 ? Math.clz32 : Vb,
  Wb = Math.log,
  jb = Math.LN2;
function Vb(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Wb(e) / jb) | 0)) | 0;
}
var ma = 64,
  va = 4194304;
function Su(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function nc(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var a = s & ~i;
    a !== 0 ? (r = Su(a)) : ((l &= s), l !== 0 && (r = Su(l)));
  } else (s = n & ~i), s !== 0 ? (r = Su(s)) : l !== 0 && (r = Su(l));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (l = t & -t), i >= l || (i === 16 && (l & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - dr(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function Gb(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function qb(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var s = 31 - dr(l),
      a = 1 << s,
      f = i[s];
    f === -1
      ? (!(a & n) || a & r) && (i[s] = Gb(a, t))
      : f <= t && (e.expiredLanes |= a),
      (l &= ~a);
  }
}
function Ph(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Lw() {
  var e = ma;
  return (ma <<= 1), !(ma & 4194240) && (ma = 64), e;
}
function pp(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function hs(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - dr(t)),
    (e[t] = n);
}
function Kb(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - dr(n),
      l = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~l);
  }
}
function qg(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - dr(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var Be = 0;
function Mw(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Fw,
  Kg,
  $w,
  zw,
  Bw,
  Rh = !1,
  ya = [],
  _i = null,
  Oi = null,
  Ti = null,
  Gu = new Map(),
  qu = new Map(),
  xi = [],
  Qb =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function yy(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      _i = null;
      break;
    case "dragenter":
    case "dragleave":
      Oi = null;
      break;
    case "mouseover":
    case "mouseout":
      Ti = null;
      break;
    case "pointerover":
    case "pointerout":
      Gu.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      qu.delete(t.pointerId);
  }
}
function fu(e, t, n, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      t !== null && ((t = ms(t)), t !== null && Kg(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Yb(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (_i = fu(_i, e, t, n, r, i)), !0;
    case "dragenter":
      return (Oi = fu(Oi, e, t, n, r, i)), !0;
    case "mouseover":
      return (Ti = fu(Ti, e, t, n, r, i)), !0;
    case "pointerover":
      var l = i.pointerId;
      return Gu.set(l, fu(Gu.get(l) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (l = i.pointerId), qu.set(l, fu(qu.get(l) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Hw(e) {
  var t = ho(e.target);
  if (t !== null) {
    var n = Ro(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Iw(n)), t !== null)) {
          (e.blockedOn = t),
            Bw(e.priority, function () {
              $w(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Ma(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ah(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (_h = r), n.target.dispatchEvent(r), (_h = null);
    } else return (t = ms(n)), t !== null && Kg(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function wy(e, t, n) {
  Ma(e) && n.delete(t);
}
function Xb() {
  (Rh = !1),
    _i !== null && Ma(_i) && (_i = null),
    Oi !== null && Ma(Oi) && (Oi = null),
    Ti !== null && Ma(Ti) && (Ti = null),
    Gu.forEach(wy),
    qu.forEach(wy);
}
function du(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Rh ||
      ((Rh = !0),
      Tn.unstable_scheduleCallback(Tn.unstable_NormalPriority, Xb)));
}
function Ku(e) {
  function t(i) {
    return du(i, e);
  }
  if (0 < ya.length) {
    du(ya[0], e);
    for (var n = 1; n < ya.length; n++) {
      var r = ya[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    _i !== null && du(_i, e),
      Oi !== null && du(Oi, e),
      Ti !== null && du(Ti, e),
      Gu.forEach(t),
      qu.forEach(t),
      n = 0;
    n < xi.length;
    n++
  )
    (r = xi[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < xi.length && ((n = xi[0]), n.blockedOn === null); )
    Hw(n), n.blockedOn === null && xi.shift();
}
var vl = ei.ReactCurrentBatchConfig,
  rc = !0;
function Zb(e, t, n, r) {
  var i = Be,
    l = vl.transition;
  vl.transition = null;
  try {
    (Be = 1), Qg(e, t, n, r);
  } finally {
    (Be = i), (vl.transition = l);
  }
}
function Jb(e, t, n, r) {
  var i = Be,
    l = vl.transition;
  vl.transition = null;
  try {
    (Be = 4), Qg(e, t, n, r);
  } finally {
    (Be = i), (vl.transition = l);
  }
}
function Qg(e, t, n, r) {
  if (rc) {
    var i = Ah(e, t, n, r);
    if (i === null) Ep(e, t, r, ic, n), yy(e, r);
    else if (Yb(i, e, t, n, r)) r.stopPropagation();
    else if ((yy(e, r), t & 4 && -1 < Qb.indexOf(e))) {
      for (; i !== null; ) {
        var l = ms(i);
        if (
          (l !== null && Fw(l),
          (l = Ah(e, t, n, r)),
          l === null && Ep(e, t, r, ic, n),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else Ep(e, t, r, null, n);
  }
}
var ic = null;
function Ah(e, t, n, r) {
  if (((ic = null), (e = Vg(r)), (e = ho(e)), e !== null))
    if (((t = Ro(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Iw(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (ic = e), null;
}
function Uw(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Bb()) {
        case Gg:
          return 1;
        case Dw:
          return 4;
        case tc:
        case Hb:
          return 16;
        case Nw:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ei = null,
  Yg = null,
  Fa = null;
function Ww() {
  if (Fa) return Fa;
  var e,
    t = Yg,
    n = t.length,
    r,
    i = "value" in Ei ? Ei.value : Ei.textContent,
    l = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[l - r]; r++);
  return (Fa = i.slice(e, 1 < r ? 1 - r : void 0));
}
function $a(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function wa() {
  return !0;
}
function xy() {
  return !1;
}
function Rn(e) {
  function t(n, r, i, l, s) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = s),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(l) : l[a]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? wa
        : xy),
      (this.isPropagationStopped = xy),
      this
    );
  }
  return (
    at(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = wa));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = wa));
      },
      persist: function () {},
      isPersistent: wa,
    }),
    t
  );
}
var $l = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Xg = Rn($l),
  gs = at({}, $l, { view: 0, detail: 0 }),
  e_ = Rn(gs),
  hp,
  gp,
  pu,
  Uc = at({}, gs, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Zg,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== pu &&
            (pu && e.type === "mousemove"
              ? ((hp = e.screenX - pu.screenX), (gp = e.screenY - pu.screenY))
              : (gp = hp = 0),
            (pu = e)),
          hp);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : gp;
    },
  }),
  Sy = Rn(Uc),
  t_ = at({}, Uc, { dataTransfer: 0 }),
  n_ = Rn(t_),
  r_ = at({}, gs, { relatedTarget: 0 }),
  mp = Rn(r_),
  i_ = at({}, $l, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  o_ = Rn(i_),
  l_ = at({}, $l, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  u_ = Rn(l_),
  s_ = at({}, $l, { data: 0 }),
  Cy = Rn(s_),
  a_ = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  c_ = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  f_ = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function d_(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = f_[e]) ? !!t[e] : !1;
}
function Zg() {
  return d_;
}
var p_ = at({}, gs, {
    key: function (e) {
      if (e.key) {
        var t = a_[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = $a(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? c_[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zg,
    charCode: function (e) {
      return e.type === "keypress" ? $a(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? $a(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  h_ = Rn(p_),
  g_ = at({}, Uc, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ey = Rn(g_),
  m_ = at({}, gs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zg,
  }),
  v_ = Rn(m_),
  y_ = at({}, $l, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  w_ = Rn(y_),
  x_ = at({}, Uc, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  S_ = Rn(x_),
  C_ = [9, 13, 27, 32],
  Jg = Qr && "CompositionEvent" in window,
  Tu = null;
Qr && "documentMode" in document && (Tu = document.documentMode);
var E_ = Qr && "TextEvent" in window && !Tu,
  jw = Qr && (!Jg || (Tu && 8 < Tu && 11 >= Tu)),
  ky = String.fromCharCode(32),
  by = !1;
function Vw(e, t) {
  switch (e) {
    case "keyup":
      return C_.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Gw(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var il = !1;
function k_(e, t) {
  switch (e) {
    case "compositionend":
      return Gw(t);
    case "keypress":
      return t.which !== 32 ? null : ((by = !0), ky);
    case "textInput":
      return (e = t.data), e === ky && by ? null : e;
    default:
      return null;
  }
}
function b_(e, t) {
  if (il)
    return e === "compositionend" || (!Jg && Vw(e, t))
      ? ((e = Ww()), (Fa = Yg = Ei = null), (il = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return jw && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var __ = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function _y(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!__[e.type] : t === "textarea";
}
function qw(e, t, n, r) {
  kw(r),
    (t = oc(t, "onChange")),
    0 < t.length &&
      ((n = new Xg("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Iu = null,
  Qu = null;
function O_(e) {
  i4(e, 0);
}
function Wc(e) {
  var t = ul(e);
  if (vw(t)) return e;
}
function T_(e, t) {
  if (e === "change") return t;
}
var Kw = !1;
if (Qr) {
  var vp;
  if (Qr) {
    var yp = "oninput" in document;
    if (!yp) {
      var Oy = document.createElement("div");
      Oy.setAttribute("oninput", "return;"),
        (yp = typeof Oy.oninput == "function");
    }
    vp = yp;
  } else vp = !1;
  Kw = vp && (!document.documentMode || 9 < document.documentMode);
}
function Ty() {
  Iu && (Iu.detachEvent("onpropertychange", Qw), (Qu = Iu = null));
}
function Qw(e) {
  if (e.propertyName === "value" && Wc(Qu)) {
    var t = [];
    qw(t, Qu, e, Vg(e)), Tw(O_, t);
  }
}
function I_(e, t, n) {
  e === "focusin"
    ? (Ty(), (Iu = t), (Qu = n), Iu.attachEvent("onpropertychange", Qw))
    : e === "focusout" && Ty();
}
function P_(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Wc(Qu);
}
function R_(e, t) {
  if (e === "click") return Wc(t);
}
function A_(e, t) {
  if (e === "input" || e === "change") return Wc(t);
}
function D_(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var hr = typeof Object.is == "function" ? Object.is : D_;
function Yu(e, t) {
  if (hr(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!hh.call(t, i) || !hr(e[i], t[i])) return !1;
  }
  return !0;
}
function Iy(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Py(e, t) {
  var n = Iy(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Iy(n);
  }
}
function Yw(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Yw(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Xw() {
  for (var e = window, t = Za(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Za(e.document);
  }
  return t;
}
function e1(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function N_(e) {
  var t = Xw(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Yw(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && e1(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          l = Math.min(r.start, i);
        (r = r.end === void 0 ? l : Math.min(r.end, i)),
          !e.extend && l > r && ((i = r), (r = l), (l = i)),
          (i = Py(n, l));
        var s = Py(n, r);
        i &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var L_ = Qr && "documentMode" in document && 11 >= document.documentMode,
  ol = null,
  Dh = null,
  Pu = null,
  Nh = !1;
function Ry(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Nh ||
    ol == null ||
    ol !== Za(r) ||
    ((r = ol),
    "selectionStart" in r && e1(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Pu && Yu(Pu, r)) ||
      ((Pu = r),
      (r = oc(Dh, "onSelect")),
      0 < r.length &&
        ((t = new Xg("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = ol))));
}
function xa(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var ll = {
    animationend: xa("Animation", "AnimationEnd"),
    animationiteration: xa("Animation", "AnimationIteration"),
    animationstart: xa("Animation", "AnimationStart"),
    transitionend: xa("Transition", "TransitionEnd"),
  },
  wp = {},
  Zw = {};
Qr &&
  ((Zw = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete ll.animationend.animation,
    delete ll.animationiteration.animation,
    delete ll.animationstart.animation),
  "TransitionEvent" in window || delete ll.transitionend.transition);
function jc(e) {
  if (wp[e]) return wp[e];
  if (!ll[e]) return e;
  var t = ll[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Zw) return (wp[e] = t[n]);
  return e;
}
var Jw = jc("animationend"),
  e4 = jc("animationiteration"),
  t4 = jc("animationstart"),
  n4 = jc("transitionend"),
  r4 = new Map(),
  Ay =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Wi(e, t) {
  r4.set(e, t), Po(t, [e]);
}
for (var xp = 0; xp < Ay.length; xp++) {
  var Sp = Ay[xp],
    M_ = Sp.toLowerCase(),
    F_ = Sp[0].toUpperCase() + Sp.slice(1);
  Wi(M_, "on" + F_);
}
Wi(Jw, "onAnimationEnd");
Wi(e4, "onAnimationIteration");
Wi(t4, "onAnimationStart");
Wi("dblclick", "onDoubleClick");
Wi("focusin", "onFocus");
Wi("focusout", "onBlur");
Wi(n4, "onTransitionEnd");
_l("onMouseEnter", ["mouseout", "mouseover"]);
_l("onMouseLeave", ["mouseout", "mouseover"]);
_l("onPointerEnter", ["pointerout", "pointerover"]);
_l("onPointerLeave", ["pointerout", "pointerover"]);
Po(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Po(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Po("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Po(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Po(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Po(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Cu =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  $_ = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cu));
function Dy(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Mb(r, t, void 0, e), (e.currentTarget = null);
}
function i4(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var a = r[s],
            f = a.instance,
            d = a.currentTarget;
          if (((a = a.listener), f !== l && i.isPropagationStopped())) break e;
          Dy(i, a, d), (l = f);
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((a = r[s]),
            (f = a.instance),
            (d = a.currentTarget),
            (a = a.listener),
            f !== l && i.isPropagationStopped())
          )
            break e;
          Dy(i, a, d), (l = f);
        }
    }
  }
  if (ec) throw ((e = Ih), (ec = !1), (Ih = null), e);
}
function et(e, t) {
  var n = t[zh];
  n === void 0 && (n = t[zh] = new Set());
  var r = e + "__bubble";
  n.has(r) || (o4(t, e, 2, !1), n.add(r));
}
function Cp(e, t, n) {
  var r = 0;
  t && (r |= 4), o4(n, e, r, t);
}
var Sa = "_reactListening" + Math.random().toString(36).slice(2);
function Xu(e) {
  if (!e[Sa]) {
    (e[Sa] = !0),
      dw.forEach(function (n) {
        n !== "selectionchange" && ($_.has(n) || Cp(n, !1, e), Cp(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sa] || ((t[Sa] = !0), Cp("selectionchange", !1, t));
  }
}
function o4(e, t, n, r) {
  switch (Uw(t)) {
    case 1:
      var i = Zb;
      break;
    case 4:
      i = Jb;
      break;
    default:
      i = Qg;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Th ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function Ep(e, t, n, r, i) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var f = s.tag;
            if (
              (f === 3 || f === 4) &&
              ((f = s.stateNode.containerInfo),
              f === i || (f.nodeType === 8 && f.parentNode === i))
            )
              return;
            s = s.return;
          }
        for (; a !== null; ) {
          if (((s = ho(a)), s === null)) return;
          if (((f = s.tag), f === 5 || f === 6)) {
            r = l = s;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Tw(function () {
    var d = l,
      p = Vg(n),
      g = [];
    e: {
      var v = r4.get(e);
      if (v !== void 0) {
        var m = Xg,
          E = e;
        switch (e) {
          case "keypress":
            if ($a(n) === 0) break e;
          case "keydown":
          case "keyup":
            m = h_;
            break;
          case "focusin":
            (E = "focus"), (m = mp);
            break;
          case "focusout":
            (E = "blur"), (m = mp);
            break;
          case "beforeblur":
          case "afterblur":
            m = mp;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            m = Sy;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            m = n_;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            m = v_;
            break;
          case Jw:
          case e4:
          case t4:
            m = o_;
            break;
          case n4:
            m = w_;
            break;
          case "scroll":
            m = e_;
            break;
          case "wheel":
            m = S_;
            break;
          case "copy":
          case "cut":
          case "paste":
            m = u_;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            m = Ey;
        }
        var S = (t & 4) !== 0,
          N = !S && e === "scroll",
          y = S ? (v !== null ? v + "Capture" : null) : v;
        S = [];
        for (var x = d, k; x !== null; ) {
          k = x;
          var I = k.stateNode;
          if (
            (k.tag === 5 &&
              I !== null &&
              ((k = I),
              y !== null && ((I = Vu(x, y)), I != null && S.push(Zu(x, I, k)))),
            N)
          )
            break;
          x = x.return;
        }
        0 < S.length &&
          ((v = new m(v, E, null, n, p)), g.push({ event: v, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (m = e === "mouseout" || e === "pointerout"),
          v &&
            n !== _h &&
            (E = n.relatedTarget || n.fromElement) &&
            (ho(E) || E[Yr]))
        )
          break e;
        if (
          (m || v) &&
          ((v =
            p.window === p
              ? p
              : (v = p.ownerDocument)
              ? v.defaultView || v.parentWindow
              : window),
          m
            ? ((E = n.relatedTarget || n.toElement),
              (m = d),
              (E = E ? ho(E) : null),
              E !== null &&
                ((N = Ro(E)), E !== N || (E.tag !== 5 && E.tag !== 6)) &&
                (E = null))
            : ((m = null), (E = d)),
          m !== E)
        ) {
          if (
            ((S = Sy),
            (I = "onMouseLeave"),
            (y = "onMouseEnter"),
            (x = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = Ey),
              (I = "onPointerLeave"),
              (y = "onPointerEnter"),
              (x = "pointer")),
            (N = m == null ? v : ul(m)),
            (k = E == null ? v : ul(E)),
            (v = new S(I, x + "leave", m, n, p)),
            (v.target = N),
            (v.relatedTarget = k),
            (I = null),
            ho(p) === d &&
              ((S = new S(y, x + "enter", E, n, p)),
              (S.target = k),
              (S.relatedTarget = N),
              (I = S)),
            (N = I),
            m && E)
          )
            t: {
              for (S = m, y = E, x = 0, k = S; k; k = Qo(k)) x++;
              for (k = 0, I = y; I; I = Qo(I)) k++;
              for (; 0 < x - k; ) (S = Qo(S)), x--;
              for (; 0 < k - x; ) (y = Qo(y)), k--;
              for (; x--; ) {
                if (S === y || (y !== null && S === y.alternate)) break t;
                (S = Qo(S)), (y = Qo(y));
              }
              S = null;
            }
          else S = null;
          m !== null && Ny(g, v, m, S, !1),
            E !== null && N !== null && Ny(g, N, E, S, !0);
        }
      }
      e: {
        if (
          ((v = d ? ul(d) : window),
          (m = v.nodeName && v.nodeName.toLowerCase()),
          m === "select" || (m === "input" && v.type === "file"))
        )
          var M = T_;
        else if (_y(v))
          if (Kw) M = A_;
          else {
            M = P_;
            var P = I_;
          }
        else
          (m = v.nodeName) &&
            m.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (M = R_);
        if (M && (M = M(e, d))) {
          qw(g, M, n, p);
          break e;
        }
        P && P(e, v, d),
          e === "focusout" &&
            (P = v._wrapperState) &&
            P.controlled &&
            v.type === "number" &&
            Sh(v, "number", v.value);
      }
      switch (((P = d ? ul(d) : window), e)) {
        case "focusin":
          (_y(P) || P.contentEditable === "true") &&
            ((ol = P), (Dh = d), (Pu = null));
          break;
        case "focusout":
          Pu = Dh = ol = null;
          break;
        case "mousedown":
          Nh = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Nh = !1), Ry(g, n, p);
          break;
        case "selectionchange":
          if (L_) break;
        case "keydown":
        case "keyup":
          Ry(g, n, p);
      }
      var $;
      if (Jg)
        e: {
          switch (e) {
            case "compositionstart":
              var B = "onCompositionStart";
              break e;
            case "compositionend":
              B = "onCompositionEnd";
              break e;
            case "compositionupdate":
              B = "onCompositionUpdate";
              break e;
          }
          B = void 0;
        }
      else
        il
          ? Vw(e, n) && (B = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (B = "onCompositionStart");
      B &&
        (jw &&
          n.locale !== "ko" &&
          (il || B !== "onCompositionStart"
            ? B === "onCompositionEnd" && il && ($ = Ww())
            : ((Ei = p),
              (Yg = "value" in Ei ? Ei.value : Ei.textContent),
              (il = !0))),
        (P = oc(d, B)),
        0 < P.length &&
          ((B = new Cy(B, e, null, n, p)),
          g.push({ event: B, listeners: P }),
          $ ? (B.data = $) : (($ = Gw(n)), $ !== null && (B.data = $)))),
        ($ = E_ ? k_(e, n) : b_(e, n)) &&
          ((d = oc(d, "onBeforeInput")),
          0 < d.length &&
            ((p = new Cy("onBeforeInput", "beforeinput", null, n, p)),
            g.push({ event: p, listeners: d }),
            (p.data = $)));
    }
    i4(g, t);
  });
}
function Zu(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function oc(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = Vu(e, n)),
      l != null && r.unshift(Zu(e, l, i)),
      (l = Vu(e, t)),
      l != null && r.push(Zu(e, l, i))),
      (e = e.return);
  }
  return r;
}
function Qo(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ny(e, t, n, r, i) {
  for (var l = t._reactName, s = []; n !== null && n !== r; ) {
    var a = n,
      f = a.alternate,
      d = a.stateNode;
    if (f !== null && f === r) break;
    a.tag === 5 &&
      d !== null &&
      ((a = d),
      i
        ? ((f = Vu(n, l)), f != null && s.unshift(Zu(n, f, a)))
        : i || ((f = Vu(n, l)), f != null && s.push(Zu(n, f, a)))),
      (n = n.return);
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var z_ = /\r\n?/g,
  B_ = /\u0000|\uFFFD/g;
function Ly(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      z_,
      `
`
    )
    .replace(B_, "");
}
function Ca(e, t, n) {
  if (((t = Ly(t)), Ly(e) !== t && n)) throw Error(Q(425));
}
function lc() {}
var Lh = null,
  Mh = null;
function Fh(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var $h = typeof setTimeout == "function" ? setTimeout : void 0,
  H_ = typeof clearTimeout == "function" ? clearTimeout : void 0,
  My = typeof Promise == "function" ? Promise : void 0,
  U_ =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof My < "u"
      ? function (e) {
          return My.resolve(null).then(e).catch(W_);
        }
      : $h;
function W_(e) {
  setTimeout(function () {
    throw e;
  });
}
function kp(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Ku(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Ku(t);
}
function Ii(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Fy(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var zl = Math.random().toString(36).slice(2),
  Er = "__reactFiber$" + zl,
  Ju = "__reactProps$" + zl,
  Yr = "__reactContainer$" + zl,
  zh = "__reactEvents$" + zl,
  j_ = "__reactListeners$" + zl,
  V_ = "__reactHandles$" + zl;
function ho(e) {
  var t = e[Er];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Yr] || n[Er])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Fy(e); e !== null; ) {
          if ((n = e[Er])) return n;
          e = Fy(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ms(e) {
  return (
    (e = e[Er] || e[Yr]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function ul(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Q(33));
}
function Vc(e) {
  return e[Ju] || null;
}
var Bh = [],
  sl = -1;
function ji(e) {
  return { current: e };
}
function tt(e) {
  0 > sl || ((e.current = Bh[sl]), (Bh[sl] = null), sl--);
}
function Ye(e, t) {
  sl++, (Bh[sl] = e.current), (e.current = t);
}
var $i = {},
  zt = ji($i),
  ln = ji(!1),
  Co = $i;
function Ol(e, t) {
  var n = e.type.contextTypes;
  if (!n) return $i;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    l;
  for (l in n) i[l] = t[l];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function un(e) {
  return (e = e.childContextTypes), e != null;
}
function uc() {
  tt(ln), tt(zt);
}
function $y(e, t, n) {
  if (zt.current !== $i) throw Error(Q(168));
  Ye(zt, t), Ye(ln, n);
}
function l4(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(Q(108, Ib(e) || "Unknown", i));
  return at({}, n, r);
}
function sc(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || $i),
    (Co = zt.current),
    Ye(zt, e),
    Ye(ln, ln.current),
    !0
  );
}
function zy(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Q(169));
  n
    ? ((e = l4(e, t, Co)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      tt(ln),
      tt(zt),
      Ye(zt, e))
    : tt(ln),
    Ye(ln, n);
}
var Vr = null,
  Gc = !1,
  bp = !1;
function u4(e) {
  Vr === null ? (Vr = [e]) : Vr.push(e);
}
function G_(e) {
  (Gc = !0), u4(e);
}
function Vi() {
  if (!bp && Vr !== null) {
    bp = !0;
    var e = 0,
      t = Be;
    try {
      var n = Vr;
      for (Be = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Vr = null), (Gc = !1);
    } catch (i) {
      throw (Vr !== null && (Vr = Vr.slice(e + 1)), Aw(Gg, Vi), i);
    } finally {
      (Be = t), (bp = !1);
    }
  }
  return null;
}
var al = [],
  cl = 0,
  ac = null,
  cc = 0,
  Wn = [],
  jn = 0,
  Eo = null,
  Gr = 1,
  qr = "";
function uo(e, t) {
  (al[cl++] = cc), (al[cl++] = ac), (ac = e), (cc = t);
}
function s4(e, t, n) {
  (Wn[jn++] = Gr), (Wn[jn++] = qr), (Wn[jn++] = Eo), (Eo = e);
  var r = Gr;
  e = qr;
  var i = 32 - dr(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var l = 32 - dr(t) + i;
  if (30 < l) {
    var s = i - (i % 5);
    (l = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (i -= s),
      (Gr = (1 << (32 - dr(t) + i)) | (n << i) | r),
      (qr = l + e);
  } else (Gr = (1 << l) | (n << i) | r), (qr = e);
}
function t1(e) {
  e.return !== null && (uo(e, 1), s4(e, 1, 0));
}
function n1(e) {
  for (; e === ac; )
    (ac = al[--cl]), (al[cl] = null), (cc = al[--cl]), (al[cl] = null);
  for (; e === Eo; )
    (Eo = Wn[--jn]),
      (Wn[jn] = null),
      (qr = Wn[--jn]),
      (Wn[jn] = null),
      (Gr = Wn[--jn]),
      (Wn[jn] = null);
}
var bn = null,
  En = null,
  ot = !1,
  ar = null;
function a4(e, t) {
  var n = qn(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function By(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (bn = e), (En = Ii(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (bn = e), (En = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Eo !== null ? { id: Gr, overflow: qr } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = qn(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (bn = e),
            (En = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Hh(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Uh(e) {
  if (ot) {
    var t = En;
    if (t) {
      var n = t;
      if (!By(e, t)) {
        if (Hh(e)) throw Error(Q(418));
        t = Ii(n.nextSibling);
        var r = bn;
        t && By(e, t)
          ? a4(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ot = !1), (bn = e));
      }
    } else {
      if (Hh(e)) throw Error(Q(418));
      (e.flags = (e.flags & -4097) | 2), (ot = !1), (bn = e);
    }
  }
}
function Hy(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  bn = e;
}
function Ea(e) {
  if (e !== bn) return !1;
  if (!ot) return Hy(e), (ot = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Fh(e.type, e.memoizedProps))),
    t && (t = En))
  ) {
    if (Hh(e)) throw (c4(), Error(Q(418)));
    for (; t; ) a4(e, t), (t = Ii(t.nextSibling));
  }
  if ((Hy(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(Q(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              En = Ii(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      En = null;
    }
  } else En = bn ? Ii(e.stateNode.nextSibling) : null;
  return !0;
}
function c4() {
  for (var e = En; e; ) e = Ii(e.nextSibling);
}
function Tl() {
  (En = bn = null), (ot = !1);
}
function r1(e) {
  ar === null ? (ar = [e]) : ar.push(e);
}
var q_ = ei.ReactCurrentBatchConfig;
function hu(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(Q(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Q(147, e));
      var i = r,
        l = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === l
        ? t.ref
        : ((t = function (s) {
            var a = i.refs;
            s === null ? delete a[l] : (a[l] = s);
          }),
          (t._stringRef = l),
          t);
    }
    if (typeof e != "string") throw Error(Q(284));
    if (!n._owner) throw Error(Q(290, e));
  }
  return e;
}
function ka(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      Q(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Uy(e) {
  var t = e._init;
  return t(e._payload);
}
function f4(e) {
  function t(y, x) {
    if (e) {
      var k = y.deletions;
      k === null ? ((y.deletions = [x]), (y.flags |= 16)) : k.push(x);
    }
  }
  function n(y, x) {
    if (!e) return null;
    for (; x !== null; ) t(y, x), (x = x.sibling);
    return null;
  }
  function r(y, x) {
    for (y = new Map(); x !== null; )
      x.key !== null ? y.set(x.key, x) : y.set(x.index, x), (x = x.sibling);
    return y;
  }
  function i(y, x) {
    return (y = Di(y, x)), (y.index = 0), (y.sibling = null), y;
  }
  function l(y, x, k) {
    return (
      (y.index = k),
      e
        ? ((k = y.alternate),
          k !== null
            ? ((k = k.index), k < x ? ((y.flags |= 2), x) : k)
            : ((y.flags |= 2), x))
        : ((y.flags |= 1048576), x)
    );
  }
  function s(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, x, k, I) {
    return x === null || x.tag !== 6
      ? ((x = Ap(k, y.mode, I)), (x.return = y), x)
      : ((x = i(x, k)), (x.return = y), x);
  }
  function f(y, x, k, I) {
    var M = k.type;
    return M === rl
      ? p(y, x, k.props.children, I, k.key)
      : x !== null &&
        (x.elementType === M ||
          (typeof M == "object" &&
            M !== null &&
            M.$$typeof === yi &&
            Uy(M) === x.type))
      ? ((I = i(x, k.props)), (I.ref = hu(y, x, k)), (I.return = y), I)
      : ((I = Va(k.type, k.key, k.props, null, y.mode, I)),
        (I.ref = hu(y, x, k)),
        (I.return = y),
        I);
  }
  function d(y, x, k, I) {
    return x === null ||
      x.tag !== 4 ||
      x.stateNode.containerInfo !== k.containerInfo ||
      x.stateNode.implementation !== k.implementation
      ? ((x = Dp(k, y.mode, I)), (x.return = y), x)
      : ((x = i(x, k.children || [])), (x.return = y), x);
  }
  function p(y, x, k, I, M) {
    return x === null || x.tag !== 7
      ? ((x = xo(k, y.mode, I, M)), (x.return = y), x)
      : ((x = i(x, k)), (x.return = y), x);
  }
  function g(y, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return (x = Ap("" + x, y.mode, k)), (x.return = y), x;
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case pa:
          return (
            (k = Va(x.type, x.key, x.props, null, y.mode, k)),
            (k.ref = hu(y, null, x)),
            (k.return = y),
            k
          );
        case nl:
          return (x = Dp(x, y.mode, k)), (x.return = y), x;
        case yi:
          var I = x._init;
          return g(y, I(x._payload), k);
      }
      if (xu(x) || au(x))
        return (x = xo(x, y.mode, k, null)), (x.return = y), x;
      ka(y, x);
    }
    return null;
  }
  function v(y, x, k, I) {
    var M = x !== null ? x.key : null;
    if ((typeof k == "string" && k !== "") || typeof k == "number")
      return M !== null ? null : a(y, x, "" + k, I);
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case pa:
          return k.key === M ? f(y, x, k, I) : null;
        case nl:
          return k.key === M ? d(y, x, k, I) : null;
        case yi:
          return (M = k._init), v(y, x, M(k._payload), I);
      }
      if (xu(k) || au(k)) return M !== null ? null : p(y, x, k, I, null);
      ka(y, k);
    }
    return null;
  }
  function m(y, x, k, I, M) {
    if ((typeof I == "string" && I !== "") || typeof I == "number")
      return (y = y.get(k) || null), a(x, y, "" + I, M);
    if (typeof I == "object" && I !== null) {
      switch (I.$$typeof) {
        case pa:
          return (y = y.get(I.key === null ? k : I.key) || null), f(x, y, I, M);
        case nl:
          return (y = y.get(I.key === null ? k : I.key) || null), d(x, y, I, M);
        case yi:
          var P = I._init;
          return m(y, x, k, P(I._payload), M);
      }
      if (xu(I) || au(I)) return (y = y.get(k) || null), p(x, y, I, M, null);
      ka(x, I);
    }
    return null;
  }
  function E(y, x, k, I) {
    for (
      var M = null, P = null, $ = x, B = (x = 0), Y = null;
      $ !== null && B < k.length;
      B++
    ) {
      $.index > B ? ((Y = $), ($ = null)) : (Y = $.sibling);
      var ee = v(y, $, k[B], I);
      if (ee === null) {
        $ === null && ($ = Y);
        break;
      }
      e && $ && ee.alternate === null && t(y, $),
        (x = l(ee, x, B)),
        P === null ? (M = ee) : (P.sibling = ee),
        (P = ee),
        ($ = Y);
    }
    if (B === k.length) return n(y, $), ot && uo(y, B), M;
    if ($ === null) {
      for (; B < k.length; B++)
        ($ = g(y, k[B], I)),
          $ !== null &&
            ((x = l($, x, B)), P === null ? (M = $) : (P.sibling = $), (P = $));
      return ot && uo(y, B), M;
    }
    for ($ = r(y, $); B < k.length; B++)
      (Y = m($, y, B, k[B], I)),
        Y !== null &&
          (e && Y.alternate !== null && $.delete(Y.key === null ? B : Y.key),
          (x = l(Y, x, B)),
          P === null ? (M = Y) : (P.sibling = Y),
          (P = Y));
    return (
      e &&
        $.forEach(function (G) {
          return t(y, G);
        }),
      ot && uo(y, B),
      M
    );
  }
  function S(y, x, k, I) {
    var M = au(k);
    if (typeof M != "function") throw Error(Q(150));
    if (((k = M.call(k)), k == null)) throw Error(Q(151));
    for (
      var P = (M = null), $ = x, B = (x = 0), Y = null, ee = k.next();
      $ !== null && !ee.done;
      B++, ee = k.next()
    ) {
      $.index > B ? ((Y = $), ($ = null)) : (Y = $.sibling);
      var G = v(y, $, ee.value, I);
      if (G === null) {
        $ === null && ($ = Y);
        break;
      }
      e && $ && G.alternate === null && t(y, $),
        (x = l(G, x, B)),
        P === null ? (M = G) : (P.sibling = G),
        (P = G),
        ($ = Y);
    }
    if (ee.done) return n(y, $), ot && uo(y, B), M;
    if ($ === null) {
      for (; !ee.done; B++, ee = k.next())
        (ee = g(y, ee.value, I)),
          ee !== null &&
            ((x = l(ee, x, B)),
            P === null ? (M = ee) : (P.sibling = ee),
            (P = ee));
      return ot && uo(y, B), M;
    }
    for ($ = r(y, $); !ee.done; B++, ee = k.next())
      (ee = m($, y, B, ee.value, I)),
        ee !== null &&
          (e && ee.alternate !== null && $.delete(ee.key === null ? B : ee.key),
          (x = l(ee, x, B)),
          P === null ? (M = ee) : (P.sibling = ee),
          (P = ee));
    return (
      e &&
        $.forEach(function (Z) {
          return t(y, Z);
        }),
      ot && uo(y, B),
      M
    );
  }
  function N(y, x, k, I) {
    if (
      (typeof k == "object" &&
        k !== null &&
        k.type === rl &&
        k.key === null &&
        (k = k.props.children),
      typeof k == "object" && k !== null)
    ) {
      switch (k.$$typeof) {
        case pa:
          e: {
            for (var M = k.key, P = x; P !== null; ) {
              if (P.key === M) {
                if (((M = k.type), M === rl)) {
                  if (P.tag === 7) {
                    n(y, P.sibling),
                      (x = i(P, k.props.children)),
                      (x.return = y),
                      (y = x);
                    break e;
                  }
                } else if (
                  P.elementType === M ||
                  (typeof M == "object" &&
                    M !== null &&
                    M.$$typeof === yi &&
                    Uy(M) === P.type)
                ) {
                  n(y, P.sibling),
                    (x = i(P, k.props)),
                    (x.ref = hu(y, P, k)),
                    (x.return = y),
                    (y = x);
                  break e;
                }
                n(y, P);
                break;
              } else t(y, P);
              P = P.sibling;
            }
            k.type === rl
              ? ((x = xo(k.props.children, y.mode, I, k.key)),
                (x.return = y),
                (y = x))
              : ((I = Va(k.type, k.key, k.props, null, y.mode, I)),
                (I.ref = hu(y, x, k)),
                (I.return = y),
                (y = I));
          }
          return s(y);
        case nl:
          e: {
            for (P = k.key; x !== null; ) {
              if (x.key === P)
                if (
                  x.tag === 4 &&
                  x.stateNode.containerInfo === k.containerInfo &&
                  x.stateNode.implementation === k.implementation
                ) {
                  n(y, x.sibling),
                    (x = i(x, k.children || [])),
                    (x.return = y),
                    (y = x);
                  break e;
                } else {
                  n(y, x);
                  break;
                }
              else t(y, x);
              x = x.sibling;
            }
            (x = Dp(k, y.mode, I)), (x.return = y), (y = x);
          }
          return s(y);
        case yi:
          return (P = k._init), N(y, x, P(k._payload), I);
      }
      if (xu(k)) return E(y, x, k, I);
      if (au(k)) return S(y, x, k, I);
      ka(y, k);
    }
    return (typeof k == "string" && k !== "") || typeof k == "number"
      ? ((k = "" + k),
        x !== null && x.tag === 6
          ? (n(y, x.sibling), (x = i(x, k)), (x.return = y), (y = x))
          : (n(y, x), (x = Ap(k, y.mode, I)), (x.return = y), (y = x)),
        s(y))
      : n(y, x);
  }
  return N;
}
var Il = f4(!0),
  d4 = f4(!1),
  fc = ji(null),
  dc = null,
  fl = null,
  i1 = null;
function o1() {
  i1 = fl = dc = null;
}
function l1(e) {
  var t = fc.current;
  tt(fc), (e._currentValue = t);
}
function Wh(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function yl(e, t) {
  (dc = e),
    (i1 = fl = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (rn = !0), (e.firstContext = null));
}
function Qn(e) {
  var t = e._currentValue;
  if (i1 !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), fl === null)) {
      if (dc === null) throw Error(Q(308));
      (fl = e), (dc.dependencies = { lanes: 0, firstContext: e });
    } else fl = fl.next = e;
  return t;
}
var go = null;
function u1(e) {
  go === null ? (go = [e]) : go.push(e);
}
function p4(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), u1(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Xr(e, r)
  );
}
function Xr(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var wi = !1;
function s1(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function h4(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Kr(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Pi(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Ae & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Xr(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), u1(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Xr(e, n)
  );
}
function za(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), qg(e, n);
  }
}
function Wy(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      l = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        l === null ? (i = l = s) : (l = l.next = s), (n = n.next);
      } while (n !== null);
      l === null ? (i = l = t) : (l = l.next = t);
    } else i = l = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function pc(e, t, n, r) {
  var i = e.updateQueue;
  wi = !1;
  var l = i.firstBaseUpdate,
    s = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var f = a,
      d = f.next;
    (f.next = null), s === null ? (l = d) : (s.next = d), (s = f);
    var p = e.alternate;
    p !== null &&
      ((p = p.updateQueue),
      (a = p.lastBaseUpdate),
      a !== s &&
        (a === null ? (p.firstBaseUpdate = d) : (a.next = d),
        (p.lastBaseUpdate = f)));
  }
  if (l !== null) {
    var g = i.baseState;
    (s = 0), (p = d = f = null), (a = l);
    do {
      var v = a.lane,
        m = a.eventTime;
      if ((r & v) === v) {
        p !== null &&
          (p = p.next =
            {
              eventTime: m,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var E = e,
            S = a;
          switch (((v = t), (m = n), S.tag)) {
            case 1:
              if (((E = S.payload), typeof E == "function")) {
                g = E.call(m, g, v);
                break e;
              }
              g = E;
              break e;
            case 3:
              E.flags = (E.flags & -65537) | 128;
            case 0:
              if (
                ((E = S.payload),
                (v = typeof E == "function" ? E.call(m, g, v) : E),
                v == null)
              )
                break e;
              g = at({}, g, v);
              break e;
            case 2:
              wi = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (v = i.effects),
          v === null ? (i.effects = [a]) : v.push(a));
      } else
        (m = {
          eventTime: m,
          lane: v,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          p === null ? ((d = p = m), (f = g)) : (p = p.next = m),
          (s |= v);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (v = a),
          (a = v.next),
          (v.next = null),
          (i.lastBaseUpdate = v),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (p === null && (f = g),
      (i.baseState = f),
      (i.firstBaseUpdate = d),
      (i.lastBaseUpdate = p),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (s |= i.lane), (i = i.next);
      while (i !== t);
    } else l === null && (i.shared.lanes = 0);
    (bo |= s), (e.lanes = s), (e.memoizedState = g);
  }
}
function jy(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(Q(191, i));
        i.call(r);
      }
    }
}
var vs = {},
  Or = ji(vs),
  es = ji(vs),
  ts = ji(vs);
function mo(e) {
  if (e === vs) throw Error(Q(174));
  return e;
}
function a1(e, t) {
  switch ((Ye(ts, t), Ye(es, e), Ye(Or, vs), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Eh(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Eh(t, e));
  }
  tt(Or), Ye(Or, t);
}
function Pl() {
  tt(Or), tt(es), tt(ts);
}
function g4(e) {
  mo(ts.current);
  var t = mo(Or.current),
    n = Eh(t, e.type);
  t !== n && (Ye(es, e), Ye(Or, n));
}
function c1(e) {
  es.current === e && (tt(Or), tt(es));
}
var ut = ji(0);
function hc(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var _p = [];
function f1() {
  for (var e = 0; e < _p.length; e++)
    _p[e]._workInProgressVersionPrimary = null;
  _p.length = 0;
}
var Ba = ei.ReactCurrentDispatcher,
  Op = ei.ReactCurrentBatchConfig,
  ko = 0,
  st = null,
  xt = null,
  Et = null,
  gc = !1,
  Ru = !1,
  ns = 0,
  K_ = 0;
function Dt() {
  throw Error(Q(321));
}
function d1(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!hr(e[n], t[n])) return !1;
  return !0;
}
function p1(e, t, n, r, i, l) {
  if (
    ((ko = l),
    (st = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ba.current = e === null || e.memoizedState === null ? Z_ : J_),
    (e = n(r, i)),
    Ru)
  ) {
    l = 0;
    do {
      if (((Ru = !1), (ns = 0), 25 <= l)) throw Error(Q(301));
      (l += 1),
        (Et = xt = null),
        (t.updateQueue = null),
        (Ba.current = eO),
        (e = n(r, i));
    } while (Ru);
  }
  if (
    ((Ba.current = mc),
    (t = xt !== null && xt.next !== null),
    (ko = 0),
    (Et = xt = st = null),
    (gc = !1),
    t)
  )
    throw Error(Q(300));
  return e;
}
function h1() {
  var e = ns !== 0;
  return (ns = 0), e;
}
function Sr() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Et === null ? (st.memoizedState = Et = e) : (Et = Et.next = e), Et;
}
function Yn() {
  if (xt === null) {
    var e = st.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = xt.next;
  var t = Et === null ? st.memoizedState : Et.next;
  if (t !== null) (Et = t), (xt = e);
  else {
    if (e === null) throw Error(Q(310));
    (xt = e),
      (e = {
        memoizedState: xt.memoizedState,
        baseState: xt.baseState,
        baseQueue: xt.baseQueue,
        queue: xt.queue,
        next: null,
      }),
      Et === null ? (st.memoizedState = Et = e) : (Et = Et.next = e);
  }
  return Et;
}
function rs(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Tp(e) {
  var t = Yn(),
    n = t.queue;
  if (n === null) throw Error(Q(311));
  n.lastRenderedReducer = e;
  var r = xt,
    i = r.baseQueue,
    l = n.pending;
  if (l !== null) {
    if (i !== null) {
      var s = i.next;
      (i.next = l.next), (l.next = s);
    }
    (r.baseQueue = i = l), (n.pending = null);
  }
  if (i !== null) {
    (l = i.next), (r = r.baseState);
    var a = (s = null),
      f = null,
      d = l;
    do {
      var p = d.lane;
      if ((ko & p) === p)
        f !== null &&
          (f = f.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action));
      else {
        var g = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        f === null ? ((a = f = g), (s = r)) : (f = f.next = g),
          (st.lanes |= p),
          (bo |= p);
      }
      d = d.next;
    } while (d !== null && d !== l);
    f === null ? (s = r) : (f.next = a),
      hr(r, t.memoizedState) || (rn = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = f),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (l = i.lane), (st.lanes |= l), (bo |= l), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ip(e) {
  var t = Yn(),
    n = t.queue;
  if (n === null) throw Error(Q(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    l = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = (i = i.next);
    do (l = e(l, s.action)), (s = s.next);
    while (s !== i);
    hr(l, t.memoizedState) || (rn = !0),
      (t.memoizedState = l),
      t.baseQueue === null && (t.baseState = l),
      (n.lastRenderedState = l);
  }
  return [l, r];
}
function m4() {}
function v4(e, t) {
  var n = st,
    r = Yn(),
    i = t(),
    l = !hr(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (rn = !0)),
    (r = r.queue),
    g1(x4.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || (Et !== null && Et.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      is(9, w4.bind(null, n, r, i, t), void 0, null),
      kt === null)
    )
      throw Error(Q(349));
    ko & 30 || y4(n, t, i);
  }
  return i;
}
function y4(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = st.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (st.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function w4(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), S4(t) && C4(e);
}
function x4(e, t, n) {
  return n(function () {
    S4(t) && C4(e);
  });
}
function S4(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !hr(e, n);
  } catch {
    return !0;
  }
}
function C4(e) {
  var t = Xr(e, 1);
  t !== null && pr(t, e, 1, -1);
}
function Vy(e) {
  var t = Sr();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rs,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = X_.bind(null, st, e)),
    [t.memoizedState, e]
  );
}
function is(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = st.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (st.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function E4() {
  return Yn().memoizedState;
}
function Ha(e, t, n, r) {
  var i = Sr();
  (st.flags |= e),
    (i.memoizedState = is(1 | t, n, void 0, r === void 0 ? null : r));
}
function qc(e, t, n, r) {
  var i = Yn();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (xt !== null) {
    var s = xt.memoizedState;
    if (((l = s.destroy), r !== null && d1(r, s.deps))) {
      i.memoizedState = is(t, n, l, r);
      return;
    }
  }
  (st.flags |= e), (i.memoizedState = is(1 | t, n, l, r));
}
function Gy(e, t) {
  return Ha(8390656, 8, e, t);
}
function g1(e, t) {
  return qc(2048, 8, e, t);
}
function k4(e, t) {
  return qc(4, 2, e, t);
}
function b4(e, t) {
  return qc(4, 4, e, t);
}
function _4(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function O4(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), qc(4, 4, _4.bind(null, t, e), n)
  );
}
function m1() {}
function T4(e, t) {
  var n = Yn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && d1(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function I4(e, t) {
  var n = Yn();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && d1(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function P4(e, t, n) {
  return ko & 21
    ? (hr(n, t) || ((n = Lw()), (st.lanes |= n), (bo |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (rn = !0)), (e.memoizedState = n));
}
function Q_(e, t) {
  var n = Be;
  (Be = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Op.transition;
  Op.transition = {};
  try {
    e(!1), t();
  } finally {
    (Be = n), (Op.transition = r);
  }
}
function R4() {
  return Yn().memoizedState;
}
function Y_(e, t, n) {
  var r = Ai(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    A4(e))
  )
    D4(t, n);
  else if (((n = p4(e, t, n, r)), n !== null)) {
    var i = qt();
    pr(n, e, r, i), N4(n, t, r);
  }
}
function X_(e, t, n) {
  var r = Ai(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (A4(e)) D4(t, i);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = t.lastRenderedReducer), l !== null)
    )
      try {
        var s = t.lastRenderedState,
          a = l(s, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), hr(a, s))) {
          var f = t.interleaved;
          f === null
            ? ((i.next = i), u1(t))
            : ((i.next = f.next), (f.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = p4(e, t, i, r)),
      n !== null && ((i = qt()), pr(n, e, r, i), N4(n, t, r));
  }
}
function A4(e) {
  var t = e.alternate;
  return e === st || (t !== null && t === st);
}
function D4(e, t) {
  Ru = gc = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function N4(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), qg(e, n);
  }
}
var mc = {
    readContext: Qn,
    useCallback: Dt,
    useContext: Dt,
    useEffect: Dt,
    useImperativeHandle: Dt,
    useInsertionEffect: Dt,
    useLayoutEffect: Dt,
    useMemo: Dt,
    useReducer: Dt,
    useRef: Dt,
    useState: Dt,
    useDebugValue: Dt,
    useDeferredValue: Dt,
    useTransition: Dt,
    useMutableSource: Dt,
    useSyncExternalStore: Dt,
    useId: Dt,
    unstable_isNewReconciler: !1,
  },
  Z_ = {
    readContext: Qn,
    useCallback: function (e, t) {
      return (Sr().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Qn,
    useEffect: Gy,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ha(4194308, 4, _4.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ha(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ha(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Sr();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Sr();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Y_.bind(null, st, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Sr();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Vy,
    useDebugValue: m1,
    useDeferredValue: function (e) {
      return (Sr().memoizedState = e);
    },
    useTransition: function () {
      var e = Vy(!1),
        t = e[0];
      return (e = Q_.bind(null, e[1])), (Sr().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = st,
        i = Sr();
      if (ot) {
        if (n === void 0) throw Error(Q(407));
        n = n();
      } else {
        if (((n = t()), kt === null)) throw Error(Q(349));
        ko & 30 || y4(r, t, n);
      }
      i.memoizedState = n;
      var l = { value: n, getSnapshot: t };
      return (
        (i.queue = l),
        Gy(x4.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        is(9, w4.bind(null, r, l, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Sr(),
        t = kt.identifierPrefix;
      if (ot) {
        var n = qr,
          r = Gr;
        (n = (r & ~(1 << (32 - dr(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = ns++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = K_++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  J_ = {
    readContext: Qn,
    useCallback: T4,
    useContext: Qn,
    useEffect: g1,
    useImperativeHandle: O4,
    useInsertionEffect: k4,
    useLayoutEffect: b4,
    useMemo: I4,
    useReducer: Tp,
    useRef: E4,
    useState: function () {
      return Tp(rs);
    },
    useDebugValue: m1,
    useDeferredValue: function (e) {
      var t = Yn();
      return P4(t, xt.memoizedState, e);
    },
    useTransition: function () {
      var e = Tp(rs)[0],
        t = Yn().memoizedState;
      return [e, t];
    },
    useMutableSource: m4,
    useSyncExternalStore: v4,
    useId: R4,
    unstable_isNewReconciler: !1,
  },
  eO = {
    readContext: Qn,
    useCallback: T4,
    useContext: Qn,
    useEffect: g1,
    useImperativeHandle: O4,
    useInsertionEffect: k4,
    useLayoutEffect: b4,
    useMemo: I4,
    useReducer: Ip,
    useRef: E4,
    useState: function () {
      return Ip(rs);
    },
    useDebugValue: m1,
    useDeferredValue: function (e) {
      var t = Yn();
      return xt === null ? (t.memoizedState = e) : P4(t, xt.memoizedState, e);
    },
    useTransition: function () {
      var e = Ip(rs)[0],
        t = Yn().memoizedState;
      return [e, t];
    },
    useMutableSource: m4,
    useSyncExternalStore: v4,
    useId: R4,
    unstable_isNewReconciler: !1,
  };
function ur(e, t) {
  if (e && e.defaultProps) {
    (t = at({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function jh(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : at({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Kc = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Ro(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = qt(),
      i = Ai(e),
      l = Kr(r, i);
    (l.payload = t),
      n != null && (l.callback = n),
      (t = Pi(e, l, i)),
      t !== null && (pr(t, e, i, r), za(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = qt(),
      i = Ai(e),
      l = Kr(r, i);
    (l.tag = 1),
      (l.payload = t),
      n != null && (l.callback = n),
      (t = Pi(e, l, i)),
      t !== null && (pr(t, e, i, r), za(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = qt(),
      r = Ai(e),
      i = Kr(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = Pi(e, i, r)),
      t !== null && (pr(t, e, r, n), za(t, e, r));
  },
};
function qy(e, t, n, r, i, l, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, s)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Yu(n, r) || !Yu(i, l)
      : !0
  );
}
function L4(e, t, n) {
  var r = !1,
    i = $i,
    l = t.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = Qn(l))
      : ((i = un(t) ? Co : zt.current),
        (r = t.contextTypes),
        (l = (r = r != null) ? Ol(e, i) : $i)),
    (t = new t(n, l)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Kc),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    t
  );
}
function Ky(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Kc.enqueueReplaceState(t, t.state, null);
}
function Vh(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), s1(e);
  var l = t.contextType;
  typeof l == "object" && l !== null
    ? (i.context = Qn(l))
    : ((l = un(t) ? Co : zt.current), (i.context = Ol(e, l))),
    (i.state = e.memoizedState),
    (l = t.getDerivedStateFromProps),
    typeof l == "function" && (jh(e, t, l, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Kc.enqueueReplaceState(i, i.state, null),
      pc(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Rl(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Tb(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (l) {
    i =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function Pp(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Gh(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var tO = typeof WeakMap == "function" ? WeakMap : Map;
function M4(e, t, n) {
  (n = Kr(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      yc || ((yc = !0), (ng = r)), Gh(e, t);
    }),
    n
  );
}
function F4(e, t, n) {
  (n = Kr(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Gh(e, t);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (n.callback = function () {
        Gh(e, t),
          typeof r != "function" &&
            (Ri === null ? (Ri = new Set([this])) : Ri.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Qy(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new tO();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = gO.bind(null, e, t, n)), t.then(e, e));
}
function Yy(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Xy(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Kr(-1, 1)), (t.tag = 2), Pi(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var nO = ei.ReactCurrentOwner,
  rn = !1;
function Vt(e, t, n, r) {
  t.child = e === null ? d4(t, null, n, r) : Il(t, e.child, n, r);
}
function Zy(e, t, n, r, i) {
  n = n.render;
  var l = t.ref;
  return (
    yl(t, i),
    (r = p1(e, t, n, r, l, i)),
    (n = h1()),
    e !== null && !rn
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Zr(e, t, i))
      : (ot && n && t1(t), (t.flags |= 1), Vt(e, t, r, i), t.child)
  );
}
function Jy(e, t, n, r, i) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" &&
      !k1(l) &&
      l.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = l), $4(e, t, l, r, i))
      : ((e = Va(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var s = l.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Yu), n(s, r) && e.ref === t.ref)
    )
      return Zr(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = Di(l, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function $4(e, t, n, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (Yu(l, r) && e.ref === t.ref)
      if (((rn = !1), (t.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (rn = !0);
      else return (t.lanes = e.lanes), Zr(e, t, i);
  }
  return qh(e, t, n, r, i);
}
function z4(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Ye(pl, xn),
        (xn |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Ye(pl, xn),
          (xn |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : n),
        Ye(pl, xn),
        (xn |= r);
    }
  else
    l !== null ? ((r = l.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Ye(pl, xn),
      (xn |= r);
  return Vt(e, t, i, n), t.child;
}
function B4(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function qh(e, t, n, r, i) {
  var l = un(n) ? Co : zt.current;
  return (
    (l = Ol(t, l)),
    yl(t, i),
    (n = p1(e, t, n, r, l, i)),
    (r = h1()),
    e !== null && !rn
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Zr(e, t, i))
      : (ot && r && t1(t), (t.flags |= 1), Vt(e, t, n, i), t.child)
  );
}
function e2(e, t, n, r, i) {
  if (un(n)) {
    var l = !0;
    sc(t);
  } else l = !1;
  if ((yl(t, i), t.stateNode === null))
    Ua(e, t), L4(t, n, r), Vh(t, n, r, i), (r = !0);
  else if (e === null) {
    var s = t.stateNode,
      a = t.memoizedProps;
    s.props = a;
    var f = s.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = Qn(d))
      : ((d = un(n) ? Co : zt.current), (d = Ol(t, d)));
    var p = n.getDerivedStateFromProps,
      g =
        typeof p == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    g ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== r || f !== d) && Ky(t, s, r, d)),
      (wi = !1);
    var v = t.memoizedState;
    (s.state = v),
      pc(t, r, s, i),
      (f = t.memoizedState),
      a !== r || v !== f || ln.current || wi
        ? (typeof p == "function" && (jh(t, n, p, r), (f = t.memoizedState)),
          (a = wi || qy(t, n, a, r, v, f, d))
            ? (g ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = f)),
          (s.props = r),
          (s.state = f),
          (s.context = d),
          (r = a))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (s = t.stateNode),
      h4(e, t),
      (a = t.memoizedProps),
      (d = t.type === t.elementType ? a : ur(t.type, a)),
      (s.props = d),
      (g = t.pendingProps),
      (v = s.context),
      (f = n.contextType),
      typeof f == "object" && f !== null
        ? (f = Qn(f))
        : ((f = un(n) ? Co : zt.current), (f = Ol(t, f)));
    var m = n.getDerivedStateFromProps;
    (p =
      typeof m == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((a !== g || v !== f) && Ky(t, s, r, f)),
      (wi = !1),
      (v = t.memoizedState),
      (s.state = v),
      pc(t, r, s, i);
    var E = t.memoizedState;
    a !== g || v !== E || ln.current || wi
      ? (typeof m == "function" && (jh(t, n, m, r), (E = t.memoizedState)),
        (d = wi || qy(t, n, d, r, v, E, f) || !1)
          ? (p ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, E, f),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, E, f)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (a === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = E)),
        (s.props = r),
        (s.state = E),
        (s.context = f),
        (r = d))
      : (typeof s.componentDidUpdate != "function" ||
          (a === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Kh(e, t, n, r, l, i);
}
function Kh(e, t, n, r, i, l) {
  B4(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && zy(t, n, !1), Zr(e, t, l);
  (r = t.stateNode), (nO.current = t);
  var a =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = Il(t, e.child, null, l)), (t.child = Il(t, null, a, l)))
      : Vt(e, t, a, l),
    (t.memoizedState = r.state),
    i && zy(t, n, !0),
    t.child
  );
}
function H4(e) {
  var t = e.stateNode;
  t.pendingContext
    ? $y(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && $y(e, t.context, !1),
    a1(e, t.containerInfo);
}
function t2(e, t, n, r, i) {
  return Tl(), r1(i), (t.flags |= 256), Vt(e, t, n, r), t.child;
}
var Qh = { dehydrated: null, treeContext: null, retryLane: 0 };
function Yh(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function U4(e, t, n) {
  var r = t.pendingProps,
    i = ut.current,
    l = !1,
    s = (t.flags & 128) !== 0,
    a;
  if (
    ((a = s) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((l = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    Ye(ut, i & 1),
    e === null)
  )
    return (
      Uh(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          l
            ? ((r = t.mode),
              (l = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = s))
                : (l = Xc(s, r, 0, null)),
              (e = xo(e, r, n, null)),
              (l.return = t),
              (e.return = t),
              (l.sibling = e),
              (t.child = l),
              (t.child.memoizedState = Yh(n)),
              (t.memoizedState = Qh),
              e)
            : v1(t, s))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return rO(e, t, s, r, a, i, n);
  if (l) {
    (l = r.fallback), (s = t.mode), (i = e.child), (a = i.sibling);
    var f = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = f),
          (t.deletions = null))
        : ((r = Di(i, f)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (l = Di(a, l)) : ((l = xo(l, s, n, null)), (l.flags |= 2)),
      (l.return = t),
      (r.return = t),
      (r.sibling = l),
      (t.child = r),
      (r = l),
      (l = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Yh(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (l.memoizedState = s),
      (l.childLanes = e.childLanes & ~n),
      (t.memoizedState = Qh),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = Di(l, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function v1(e, t) {
  return (
    (t = Xc({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ba(e, t, n, r) {
  return (
    r !== null && r1(r),
    Il(t, e.child, null, n),
    (e = v1(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function rO(e, t, n, r, i, l, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Pp(Error(Q(422)))), ba(e, t, s, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((l = r.fallback),
        (i = t.mode),
        (r = Xc({ mode: "visible", children: r.children }, i, 0, null)),
        (l = xo(l, i, s, null)),
        (l.flags |= 2),
        (r.return = t),
        (l.return = t),
        (r.sibling = l),
        (t.child = r),
        t.mode & 1 && Il(t, e.child, null, s),
        (t.child.memoizedState = Yh(s)),
        (t.memoizedState = Qh),
        l);
  if (!(t.mode & 1)) return ba(e, t, s, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (l = Error(Q(419))), (r = Pp(l, r, void 0)), ba(e, t, s, r);
  }
  if (((a = (s & e.childLanes) !== 0), rn || a)) {
    if (((r = kt), r !== null)) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | s) ? 0 : i),
        i !== 0 &&
          i !== l.retryLane &&
          ((l.retryLane = i), Xr(e, i), pr(r, e, i, -1));
    }
    return E1(), (r = Pp(Error(Q(421)))), ba(e, t, s, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = mO.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = l.treeContext),
      (En = Ii(i.nextSibling)),
      (bn = t),
      (ot = !0),
      (ar = null),
      e !== null &&
        ((Wn[jn++] = Gr),
        (Wn[jn++] = qr),
        (Wn[jn++] = Eo),
        (Gr = e.id),
        (qr = e.overflow),
        (Eo = t)),
      (t = v1(t, r.children)),
      (t.flags |= 4096),
      t);
}
function n2(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Wh(e.return, t, n);
}
function Rp(e, t, n, r, i) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = n),
      (l.tailMode = i));
}
function W4(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((Vt(e, t, r.children, n), (r = ut.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && n2(e, n, t);
        else if (e.tag === 19) n2(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Ye(ut, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && hc(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Rp(t, !1, i, n, l);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && hc(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Rp(t, !0, n, null, l);
        break;
      case "together":
        Rp(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ua(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Zr(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (bo |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(Q(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Di(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Di(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function iO(e, t, n) {
  switch (t.tag) {
    case 3:
      H4(t), Tl();
      break;
    case 5:
      g4(t);
      break;
    case 1:
      un(t.type) && sc(t);
      break;
    case 4:
      a1(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Ye(fc, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Ye(ut, ut.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? U4(e, t, n)
          : (Ye(ut, ut.current & 1),
            (e = Zr(e, t, n)),
            e !== null ? e.sibling : null);
      Ye(ut, ut.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return W4(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Ye(ut, ut.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), z4(e, t, n);
  }
  return Zr(e, t, n);
}
var j4, Xh, V4, G4;
j4 = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Xh = function () {};
V4 = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), mo(Or.current);
    var l = null;
    switch (n) {
      case "input":
        (i = wh(e, i)), (r = wh(e, r)), (l = []);
        break;
      case "select":
        (i = at({}, i, { value: void 0 })),
          (r = at({}, r, { value: void 0 })),
          (l = []);
        break;
      case "textarea":
        (i = Ch(e, i)), (r = Ch(e, r)), (l = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = lc);
    }
    kh(n, r);
    var s;
    n = null;
    for (d in i)
      if (!r.hasOwnProperty(d) && i.hasOwnProperty(d) && i[d] != null)
        if (d === "style") {
          var a = i[d];
          for (s in a) a.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (Wu.hasOwnProperty(d)
              ? l || (l = [])
              : (l = l || []).push(d, null));
    for (d in r) {
      var f = r[d];
      if (
        ((a = i?.[d]),
        r.hasOwnProperty(d) && f !== a && (f != null || a != null))
      )
        if (d === "style")
          if (a) {
            for (s in a)
              !a.hasOwnProperty(s) ||
                (f && f.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in f)
              f.hasOwnProperty(s) &&
                a[s] !== f[s] &&
                (n || (n = {}), (n[s] = f[s]));
          } else n || (l || (l = []), l.push(d, n)), (n = f);
        else
          d === "dangerouslySetInnerHTML"
            ? ((f = f ? f.__html : void 0),
              (a = a ? a.__html : void 0),
              f != null && a !== f && (l = l || []).push(d, f))
            : d === "children"
            ? (typeof f != "string" && typeof f != "number") ||
              (l = l || []).push(d, "" + f)
            : d !== "suppressContentEditableWarning" &&
              d !== "suppressHydrationWarning" &&
              (Wu.hasOwnProperty(d)
                ? (f != null && d === "onScroll" && et("scroll", e),
                  l || a === f || (l = []))
                : (l = l || []).push(d, f));
    }
    n && (l = l || []).push("style", n);
    var d = l;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
G4 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function gu(e, t) {
  if (!ot)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Nt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function oO(e, t, n) {
  var r = t.pendingProps;
  switch ((n1(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Nt(t), null;
    case 1:
      return un(t.type) && uc(), Nt(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Pl(),
        tt(ln),
        tt(zt),
        f1(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ea(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), ar !== null && (og(ar), (ar = null)))),
        Xh(e, t),
        Nt(t),
        null
      );
    case 5:
      c1(t);
      var i = mo(ts.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        V4(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Q(166));
          return Nt(t), null;
        }
        if (((e = mo(Or.current)), Ea(t))) {
          (r = t.stateNode), (n = t.type);
          var l = t.memoizedProps;
          switch (((r[Er] = t), (r[Ju] = l), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              et("cancel", r), et("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              et("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Cu.length; i++) et(Cu[i], r);
              break;
            case "source":
              et("error", r);
              break;
            case "img":
            case "image":
            case "link":
              et("error", r), et("load", r);
              break;
            case "details":
              et("toggle", r);
              break;
            case "input":
              fy(r, l), et("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!l.multiple }),
                et("invalid", r);
              break;
            case "textarea":
              py(r, l), et("invalid", r);
          }
          kh(n, l), (i = null);
          for (var s in l)
            if (l.hasOwnProperty(s)) {
              var a = l[s];
              s === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ca(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (l.suppressHydrationWarning !== !0 &&
                      Ca(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : Wu.hasOwnProperty(s) &&
                  a != null &&
                  s === "onScroll" &&
                  et("scroll", r);
            }
          switch (n) {
            case "input":
              ha(r), dy(r, l, !0);
              break;
            case "textarea":
              ha(r), hy(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = lc);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (s = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = xw(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = s.createElement(n, { is: r.is }))
                : ((e = s.createElement(n)),
                  n === "select" &&
                    ((s = e),
                    r.multiple
                      ? (s.multiple = !0)
                      : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Er] = t),
            (e[Ju] = r),
            j4(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((s = bh(n, r)), n)) {
              case "dialog":
                et("cancel", e), et("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                et("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Cu.length; i++) et(Cu[i], e);
                i = r;
                break;
              case "source":
                et("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                et("error", e), et("load", e), (i = r);
                break;
              case "details":
                et("toggle", e), (i = r);
                break;
              case "input":
                fy(e, r), (i = wh(e, r)), et("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = at({}, r, { value: void 0 })),
                  et("invalid", e);
                break;
              case "textarea":
                py(e, r), (i = Ch(e, r)), et("invalid", e);
                break;
              default:
                i = r;
            }
            kh(n, i), (a = i);
            for (l in a)
              if (a.hasOwnProperty(l)) {
                var f = a[l];
                l === "style"
                  ? Ew(e, f)
                  : l === "dangerouslySetInnerHTML"
                  ? ((f = f ? f.__html : void 0), f != null && Sw(e, f))
                  : l === "children"
                  ? typeof f == "string"
                    ? (n !== "textarea" || f !== "") && ju(e, f)
                    : typeof f == "number" && ju(e, "" + f)
                  : l !== "suppressContentEditableWarning" &&
                    l !== "suppressHydrationWarning" &&
                    l !== "autoFocus" &&
                    (Wu.hasOwnProperty(l)
                      ? f != null && l === "onScroll" && et("scroll", e)
                      : f != null && Hg(e, l, f, s));
              }
            switch (n) {
              case "input":
                ha(e), dy(e, r, !1);
                break;
              case "textarea":
                ha(e), hy(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Fi(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? hl(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      hl(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = lc);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Nt(t), null;
    case 6:
      if (e && t.stateNode != null) G4(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Q(166));
        if (((n = mo(ts.current)), mo(Or.current), Ea(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Er] = t),
            (l = r.nodeValue !== n) && ((e = bn), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ca(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ca(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          l && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Er] = t),
            (t.stateNode = r);
      }
      return Nt(t), null;
    case 13:
      if (
        (tt(ut),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ot && En !== null && t.mode & 1 && !(t.flags & 128))
          c4(), Tl(), (t.flags |= 98560), (l = !1);
        else if (((l = Ea(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(Q(318));
            if (
              ((l = t.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(Q(317));
            l[Er] = t;
          } else
            Tl(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Nt(t), (l = !1);
        } else ar !== null && (og(ar), (ar = null)), (l = !0);
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ut.current & 1 ? St === 0 && (St = 3) : E1())),
          t.updateQueue !== null && (t.flags |= 4),
          Nt(t),
          null);
    case 4:
      return (
        Pl(), Xh(e, t), e === null && Xu(t.stateNode.containerInfo), Nt(t), null
      );
    case 10:
      return l1(t.type._context), Nt(t), null;
    case 17:
      return un(t.type) && uc(), Nt(t), null;
    case 19:
      if ((tt(ut), (l = t.memoizedState), l === null)) return Nt(t), null;
      if (((r = (t.flags & 128) !== 0), (s = l.rendering), s === null))
        if (r) gu(l, !1);
        else {
          if (St !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = hc(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    gu(l, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (l = n),
                    (e = r),
                    (l.flags &= 14680066),
                    (s = l.alternate),
                    s === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = s.childLanes),
                        (l.lanes = s.lanes),
                        (l.child = s.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = s.memoizedProps),
                        (l.memoizedState = s.memoizedState),
                        (l.updateQueue = s.updateQueue),
                        (l.type = s.type),
                        (e = s.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Ye(ut, (ut.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            gt() > Al &&
            ((t.flags |= 128), (r = !0), gu(l, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = hc(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              gu(l, !0),
              l.tail === null && l.tailMode === "hidden" && !s.alternate && !ot)
            )
              return Nt(t), null;
          } else
            2 * gt() - l.renderingStartTime > Al &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), gu(l, !1), (t.lanes = 4194304));
        l.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = l.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (l.last = s));
      }
      return l.tail !== null
        ? ((t = l.tail),
          (l.rendering = t),
          (l.tail = t.sibling),
          (l.renderingStartTime = gt()),
          (t.sibling = null),
          (n = ut.current),
          Ye(ut, r ? (n & 1) | 2 : n & 1),
          t)
        : (Nt(t), null);
    case 22:
    case 23:
      return (
        C1(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? xn & 1073741824 && (Nt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Nt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Q(156, t.tag));
}
function lO(e, t) {
  switch ((n1(t), t.tag)) {
    case 1:
      return (
        un(t.type) && uc(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Pl(),
        tt(ln),
        tt(zt),
        f1(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return c1(t), null;
    case 13:
      if (
        (tt(ut), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(Q(340));
        Tl();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return tt(ut), null;
    case 4:
      return Pl(), null;
    case 10:
      return l1(t.type._context), null;
    case 22:
    case 23:
      return C1(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var _a = !1,
  Mt = !1,
  uO = typeof WeakSet == "function" ? WeakSet : Set,
  le = null;
function dl(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        dt(e, t, r);
      }
    else n.current = null;
}
function Zh(e, t, n) {
  try {
    n();
  } catch (r) {
    dt(e, t, r);
  }
}
var r2 = !1;
function sO(e, t) {
  if (((Lh = rc), (e = Xw()), e1(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            l = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, l.nodeType;
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            a = -1,
            f = -1,
            d = 0,
            p = 0,
            g = e,
            v = null;
          t: for (;;) {
            for (
              var m;
              g !== n || (i !== 0 && g.nodeType !== 3) || (a = s + i),
                g !== l || (r !== 0 && g.nodeType !== 3) || (f = s + r),
                g.nodeType === 3 && (s += g.nodeValue.length),
                (m = g.firstChild) !== null;

            )
              (v = g), (g = m);
            for (;;) {
              if (g === e) break t;
              if (
                (v === n && ++d === i && (a = s),
                v === l && ++p === r && (f = s),
                (m = g.nextSibling) !== null)
              )
                break;
              (g = v), (v = g.parentNode);
            }
            g = m;
          }
          n = a === -1 || f === -1 ? null : { start: a, end: f };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (
    Mh = { focusedElem: e, selectionRange: n }, rc = !1, le = t;
    le !== null;

  )
    if (((t = le), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (le = e);
    else
      for (; le !== null; ) {
        t = le;
        try {
          var E = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (E !== null) {
                  var S = E.memoizedProps,
                    N = E.memoizedState,
                    y = t.stateNode,
                    x = y.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : ur(t.type, S),
                      N
                    );
                  y.__reactInternalSnapshotBeforeUpdate = x;
                }
                break;
              case 3:
                var k = t.stateNode.containerInfo;
                k.nodeType === 1
                  ? (k.textContent = "")
                  : k.nodeType === 9 &&
                    k.documentElement &&
                    k.removeChild(k.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(Q(163));
            }
        } catch (I) {
          dt(t, t.return, I);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (le = e);
          break;
        }
        le = t.return;
      }
  return (E = r2), (r2 = !1), E;
}
function Au(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        (i.destroy = void 0), l !== void 0 && Zh(t, n, l);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Qc(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Jh(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function q4(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), q4(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Er], delete t[Ju], delete t[zh], delete t[j_], delete t[V_])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function K4(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function i2(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || K4(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function eg(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = lc));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (eg(e, t, n), e = e.sibling; e !== null; ) eg(e, t, n), (e = e.sibling);
}
function tg(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (tg(e, t, n), e = e.sibling; e !== null; ) tg(e, t, n), (e = e.sibling);
}
var Tt = null,
  sr = !1;
function mi(e, t, n) {
  for (n = n.child; n !== null; ) Q4(e, t, n), (n = n.sibling);
}
function Q4(e, t, n) {
  if (_r && typeof _r.onCommitFiberUnmount == "function")
    try {
      _r.onCommitFiberUnmount(Hc, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Mt || dl(n, t);
    case 6:
      var r = Tt,
        i = sr;
      (Tt = null),
        mi(e, t, n),
        (Tt = r),
        (sr = i),
        Tt !== null &&
          (sr
            ? ((e = Tt),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Tt.removeChild(n.stateNode));
      break;
    case 18:
      Tt !== null &&
        (sr
          ? ((e = Tt),
            (n = n.stateNode),
            e.nodeType === 8
              ? kp(e.parentNode, n)
              : e.nodeType === 1 && kp(e, n),
            Ku(e))
          : kp(Tt, n.stateNode));
      break;
    case 4:
      (r = Tt),
        (i = sr),
        (Tt = n.stateNode.containerInfo),
        (sr = !0),
        mi(e, t, n),
        (Tt = r),
        (sr = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Mt &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            s = l.destroy;
          (l = l.tag),
            s !== void 0 && (l & 2 || l & 4) && Zh(n, t, s),
            (i = i.next);
        } while (i !== r);
      }
      mi(e, t, n);
      break;
    case 1:
      if (
        !Mt &&
        (dl(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          dt(n, t, a);
        }
      mi(e, t, n);
      break;
    case 21:
      mi(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Mt = (r = Mt) || n.memoizedState !== null), mi(e, t, n), (Mt = r))
        : mi(e, t, n);
      break;
    default:
      mi(e, t, n);
  }
}
function o2(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new uO()),
      t.forEach(function (r) {
        var i = vO.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function lr(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var l = e,
          s = t,
          a = s;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (Tt = a.stateNode), (sr = !1);
              break e;
            case 3:
              (Tt = a.stateNode.containerInfo), (sr = !0);
              break e;
            case 4:
              (Tt = a.stateNode.containerInfo), (sr = !0);
              break e;
          }
          a = a.return;
        }
        if (Tt === null) throw Error(Q(160));
        Q4(l, s, i), (Tt = null), (sr = !1);
        var f = i.alternate;
        f !== null && (f.return = null), (i.return = null);
      } catch (d) {
        dt(i, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Y4(t, e), (t = t.sibling);
}
function Y4(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((lr(t, e), xr(e), r & 4)) {
        try {
          Au(3, e, e.return), Qc(3, e);
        } catch (S) {
          dt(e, e.return, S);
        }
        try {
          Au(5, e, e.return);
        } catch (S) {
          dt(e, e.return, S);
        }
      }
      break;
    case 1:
      lr(t, e), xr(e), r & 512 && n !== null && dl(n, n.return);
      break;
    case 5:
      if (
        (lr(t, e),
        xr(e),
        r & 512 && n !== null && dl(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          ju(i, "");
        } catch (S) {
          dt(e, e.return, S);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          s = n !== null ? n.memoizedProps : l,
          a = e.type,
          f = e.updateQueue;
        if (((e.updateQueue = null), f !== null))
          try {
            a === "input" && l.type === "radio" && l.name != null && yw(i, l),
              bh(a, s);
            var d = bh(a, l);
            for (s = 0; s < f.length; s += 2) {
              var p = f[s],
                g = f[s + 1];
              p === "style"
                ? Ew(i, g)
                : p === "dangerouslySetInnerHTML"
                ? Sw(i, g)
                : p === "children"
                ? ju(i, g)
                : Hg(i, p, g, d);
            }
            switch (a) {
              case "input":
                xh(i, l);
                break;
              case "textarea":
                ww(i, l);
                break;
              case "select":
                var v = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var m = l.value;
                m != null
                  ? hl(i, !!l.multiple, m, !1)
                  : v !== !!l.multiple &&
                    (l.defaultValue != null
                      ? hl(i, !!l.multiple, l.defaultValue, !0)
                      : hl(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[Ju] = l;
          } catch (S) {
            dt(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((lr(t, e), xr(e), r & 4)) {
        if (e.stateNode === null) throw Error(Q(162));
        (i = e.stateNode), (l = e.memoizedProps);
        try {
          i.nodeValue = l;
        } catch (S) {
          dt(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (lr(t, e), xr(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ku(t.containerInfo);
        } catch (S) {
          dt(e, e.return, S);
        }
      break;
    case 4:
      lr(t, e), xr(e);
      break;
    case 13:
      lr(t, e),
        xr(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (x1 = gt())),
        r & 4 && o2(e);
      break;
    case 22:
      if (
        ((p = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Mt = (d = Mt) || p), lr(t, e), (Mt = d)) : lr(t, e),
        xr(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !p && e.mode & 1)
        )
          for (le = e, p = e.child; p !== null; ) {
            for (g = le = p; le !== null; ) {
              switch (((v = le), (m = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Au(4, v, v.return);
                  break;
                case 1:
                  dl(v, v.return);
                  var E = v.stateNode;
                  if (typeof E.componentWillUnmount == "function") {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (E.props = t.memoizedProps),
                        (E.state = t.memoizedState),
                        E.componentWillUnmount();
                    } catch (S) {
                      dt(r, n, S);
                    }
                  }
                  break;
                case 5:
                  dl(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    u2(g);
                    continue;
                  }
              }
              m !== null ? ((m.return = v), (le = m)) : u2(g);
            }
            p = p.sibling;
          }
        e: for (p = null, g = e; ; ) {
          if (g.tag === 5) {
            if (p === null) {
              p = g;
              try {
                (i = g.stateNode),
                  d
                    ? ((l = i.style),
                      typeof l.setProperty == "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((a = g.stateNode),
                      (f = g.memoizedProps.style),
                      (s =
                        f != null && f.hasOwnProperty("display")
                          ? f.display
                          : null),
                      (a.style.display = Cw("display", s)));
              } catch (S) {
                dt(e, e.return, S);
              }
            }
          } else if (g.tag === 6) {
            if (p === null)
              try {
                g.stateNode.nodeValue = d ? "" : g.memoizedProps;
              } catch (S) {
                dt(e, e.return, S);
              }
          } else if (
            ((g.tag !== 22 && g.tag !== 23) ||
              g.memoizedState === null ||
              g === e) &&
            g.child !== null
          ) {
            (g.child.return = g), (g = g.child);
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            p === g && (p = null), (g = g.return);
          }
          p === g && (p = null), (g.sibling.return = g.return), (g = g.sibling);
        }
      }
      break;
    case 19:
      lr(t, e), xr(e), r & 4 && o2(e);
      break;
    case 21:
      break;
    default:
      lr(t, e), xr(e);
  }
}
function xr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (K4(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(Q(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (ju(i, ""), (r.flags &= -33));
          var l = i2(e);
          tg(e, l, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            a = i2(e);
          eg(e, a, s);
          break;
        default:
          throw Error(Q(161));
      }
    } catch (f) {
      dt(e, e.return, f);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function aO(e, t, n) {
  (le = e), X4(e);
}
function X4(e, t, n) {
  for (var r = (e.mode & 1) !== 0; le !== null; ) {
    var i = le,
      l = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || _a;
      if (!s) {
        var a = i.alternate,
          f = (a !== null && a.memoizedState !== null) || Mt;
        a = _a;
        var d = Mt;
        if (((_a = s), (Mt = f) && !d))
          for (le = i; le !== null; )
            (s = le),
              (f = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? s2(i)
                : f !== null
                ? ((f.return = s), (le = f))
                : s2(i);
        for (; l !== null; ) (le = l), X4(l), (l = l.sibling);
        (le = i), (_a = a), (Mt = d);
      }
      l2(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (le = l)) : l2(e);
  }
}
function l2(e) {
  for (; le !== null; ) {
    var t = le;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Mt || Qc(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Mt)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ur(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = t.updateQueue;
              l !== null && jy(t, l, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                jy(t, s, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var f = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    f.autoFocus && n.focus();
                    break;
                  case "img":
                    f.src && (n.src = f.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var p = d.memoizedState;
                  if (p !== null) {
                    var g = p.dehydrated;
                    g !== null && Ku(g);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(Q(163));
          }
        Mt || (t.flags & 512 && Jh(t));
      } catch (v) {
        dt(t, t.return, v);
      }
    }
    if (t === e) {
      le = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (le = n);
      break;
    }
    le = t.return;
  }
}
function u2(e) {
  for (; le !== null; ) {
    var t = le;
    if (t === e) {
      le = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (le = n);
      break;
    }
    le = t.return;
  }
}
function s2(e) {
  for (; le !== null; ) {
    var t = le;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Qc(4, t);
          } catch (f) {
            dt(t, n, f);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (f) {
              dt(t, i, f);
            }
          }
          var l = t.return;
          try {
            Jh(t);
          } catch (f) {
            dt(t, l, f);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Jh(t);
          } catch (f) {
            dt(t, s, f);
          }
      }
    } catch (f) {
      dt(t, t.return, f);
    }
    if (t === e) {
      le = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (le = a);
      break;
    }
    le = t.return;
  }
}
var cO = Math.ceil,
  vc = ei.ReactCurrentDispatcher,
  y1 = ei.ReactCurrentOwner,
  Kn = ei.ReactCurrentBatchConfig,
  Ae = 0,
  kt = null,
  vt = null,
  It = 0,
  xn = 0,
  pl = ji(0),
  St = 0,
  os = null,
  bo = 0,
  Yc = 0,
  w1 = 0,
  Du = null,
  nn = null,
  x1 = 0,
  Al = 1 / 0,
  jr = null,
  yc = !1,
  ng = null,
  Ri = null,
  Oa = !1,
  ki = null,
  wc = 0,
  Nu = 0,
  rg = null,
  Wa = -1,
  ja = 0;
function qt() {
  return Ae & 6 ? gt() : Wa !== -1 ? Wa : (Wa = gt());
}
function Ai(e) {
  return e.mode & 1
    ? Ae & 2 && It !== 0
      ? It & -It
      : q_.transition !== null
      ? (ja === 0 && (ja = Lw()), ja)
      : ((e = Be),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Uw(e.type))),
        e)
    : 1;
}
function pr(e, t, n, r) {
  if (50 < Nu) throw ((Nu = 0), (rg = null), Error(Q(185)));
  hs(e, n, r),
    (!(Ae & 2) || e !== kt) &&
      (e === kt && (!(Ae & 2) && (Yc |= n), St === 4 && Si(e, It)),
      sn(e, r),
      n === 1 && Ae === 0 && !(t.mode & 1) && ((Al = gt() + 500), Gc && Vi()));
}
function sn(e, t) {
  var n = e.callbackNode;
  qb(e, t);
  var r = nc(e, e === kt ? It : 0);
  if (r === 0)
    n !== null && vy(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && vy(n), t === 1))
      e.tag === 0 ? G_(a2.bind(null, e)) : u4(a2.bind(null, e)),
        U_(function () {
          !(Ae & 6) && Vi();
        }),
        (n = null);
    else {
      switch (Mw(r)) {
        case 1:
          n = Gg;
          break;
        case 4:
          n = Dw;
          break;
        case 16:
          n = tc;
          break;
        case 536870912:
          n = Nw;
          break;
        default:
          n = tc;
      }
      n = o5(n, Z4.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Z4(e, t) {
  if (((Wa = -1), (ja = 0), Ae & 6)) throw Error(Q(327));
  var n = e.callbackNode;
  if (wl() && e.callbackNode !== n) return null;
  var r = nc(e, e === kt ? It : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = xc(e, r);
  else {
    t = r;
    var i = Ae;
    Ae |= 2;
    var l = e5();
    (kt !== e || It !== t) && ((jr = null), (Al = gt() + 500), wo(e, t));
    do
      try {
        pO();
        break;
      } catch (a) {
        J4(e, a);
      }
    while (1);
    o1(),
      (vc.current = l),
      (Ae = i),
      vt !== null ? (t = 0) : ((kt = null), (It = 0), (t = St));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = Ph(e)), i !== 0 && ((r = i), (t = ig(e, i)))), t === 1)
    )
      throw ((n = os), wo(e, 0), Si(e, r), sn(e, gt()), n);
    if (t === 6) Si(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !fO(i) &&
          ((t = xc(e, r)),
          t === 2 && ((l = Ph(e)), l !== 0 && ((r = l), (t = ig(e, l)))),
          t === 1))
      )
        throw ((n = os), wo(e, 0), Si(e, r), sn(e, gt()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(Q(345));
        case 2:
          so(e, nn, jr);
          break;
        case 3:
          if (
            (Si(e, r), (r & 130023424) === r && ((t = x1 + 500 - gt()), 10 < t))
          ) {
            if (nc(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              qt(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = $h(so.bind(null, e, nn, jr), t);
            break;
          }
          so(e, nn, jr);
          break;
        case 4:
          if ((Si(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - dr(r);
            (l = 1 << s), (s = t[s]), s > i && (i = s), (r &= ~l);
          }
          if (
            ((r = i),
            (r = gt() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * cO(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = $h(so.bind(null, e, nn, jr), r);
            break;
          }
          so(e, nn, jr);
          break;
        case 5:
          so(e, nn, jr);
          break;
        default:
          throw Error(Q(329));
      }
    }
  }
  return sn(e, gt()), e.callbackNode === n ? Z4.bind(null, e) : null;
}
function ig(e, t) {
  var n = Du;
  return (
    e.current.memoizedState.isDehydrated && (wo(e, t).flags |= 256),
    (e = xc(e, t)),
    e !== 2 && ((t = nn), (nn = n), t !== null && og(t)),
    e
  );
}
function og(e) {
  nn === null ? (nn = e) : nn.push.apply(nn, e);
}
function fO(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!hr(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Si(e, t) {
  for (
    t &= ~w1,
      t &= ~Yc,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - dr(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function a2(e) {
  if (Ae & 6) throw Error(Q(327));
  wl();
  var t = nc(e, 0);
  if (!(t & 1)) return sn(e, gt()), null;
  var n = xc(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ph(e);
    r !== 0 && ((t = r), (n = ig(e, r)));
  }
  if (n === 1) throw ((n = os), wo(e, 0), Si(e, t), sn(e, gt()), n);
  if (n === 6) throw Error(Q(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    so(e, nn, jr),
    sn(e, gt()),
    null
  );
}
function S1(e, t) {
  var n = Ae;
  Ae |= 1;
  try {
    return e(t);
  } finally {
    (Ae = n), Ae === 0 && ((Al = gt() + 500), Gc && Vi());
  }
}
function _o(e) {
  ki !== null && ki.tag === 0 && !(Ae & 6) && wl();
  var t = Ae;
  Ae |= 1;
  var n = Kn.transition,
    r = Be;
  try {
    if (((Kn.transition = null), (Be = 1), e)) return e();
  } finally {
    (Be = r), (Kn.transition = n), (Ae = t), !(Ae & 6) && Vi();
  }
}
function C1() {
  (xn = pl.current), tt(pl);
}
function wo(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), H_(n)), vt !== null))
    for (n = vt.return; n !== null; ) {
      var r = n;
      switch ((n1(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && uc();
          break;
        case 3:
          Pl(), tt(ln), tt(zt), f1();
          break;
        case 5:
          c1(r);
          break;
        case 4:
          Pl();
          break;
        case 13:
          tt(ut);
          break;
        case 19:
          tt(ut);
          break;
        case 10:
          l1(r.type._context);
          break;
        case 22:
        case 23:
          C1();
      }
      n = n.return;
    }
  if (
    ((kt = e),
    (vt = e = Di(e.current, null)),
    (It = xn = t),
    (St = 0),
    (os = null),
    (w1 = Yc = bo = 0),
    (nn = Du = null),
    go !== null)
  ) {
    for (t = 0; t < go.length; t++)
      if (((n = go[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          l = n.pending;
        if (l !== null) {
          var s = l.next;
          (l.next = i), (r.next = s);
        }
        n.pending = r;
      }
    go = null;
  }
  return e;
}
function J4(e, t) {
  do {
    var n = vt;
    try {
      if ((o1(), (Ba.current = mc), gc)) {
        for (var r = st.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        gc = !1;
      }
      if (
        ((ko = 0),
        (Et = xt = st = null),
        (Ru = !1),
        (ns = 0),
        (y1.current = null),
        n === null || n.return === null)
      ) {
        (St = 1), (os = t), (vt = null);
        break;
      }
      e: {
        var l = e,
          s = n.return,
          a = n,
          f = t;
        if (
          ((t = It),
          (a.flags |= 32768),
          f !== null && typeof f == "object" && typeof f.then == "function")
        ) {
          var d = f,
            p = a,
            g = p.tag;
          if (!(p.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var v = p.alternate;
            v
              ? ((p.updateQueue = v.updateQueue),
                (p.memoizedState = v.memoizedState),
                (p.lanes = v.lanes))
              : ((p.updateQueue = null), (p.memoizedState = null));
          }
          var m = Yy(s);
          if (m !== null) {
            (m.flags &= -257),
              Xy(m, s, a, l, t),
              m.mode & 1 && Qy(l, d, t),
              (t = m),
              (f = d);
            var E = t.updateQueue;
            if (E === null) {
              var S = new Set();
              S.add(f), (t.updateQueue = S);
            } else E.add(f);
            break e;
          } else {
            if (!(t & 1)) {
              Qy(l, d, t), E1();
              break e;
            }
            f = Error(Q(426));
          }
        } else if (ot && a.mode & 1) {
          var N = Yy(s);
          if (N !== null) {
            !(N.flags & 65536) && (N.flags |= 256),
              Xy(N, s, a, l, t),
              r1(Rl(f, a));
            break e;
          }
        }
        (l = f = Rl(f, a)),
          St !== 4 && (St = 2),
          Du === null ? (Du = [l]) : Du.push(l),
          (l = s);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (t &= -t), (l.lanes |= t);
              var y = M4(l, f, t);
              Wy(l, y);
              break e;
            case 1:
              a = f;
              var x = l.type,
                k = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof x.getDerivedStateFromError == "function" ||
                  (k !== null &&
                    typeof k.componentDidCatch == "function" &&
                    (Ri === null || !Ri.has(k))))
              ) {
                (l.flags |= 65536), (t &= -t), (l.lanes |= t);
                var I = F4(l, a, t);
                Wy(l, I);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      n5(n);
    } catch (M) {
      (t = M), vt === n && n !== null && (vt = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function e5() {
  var e = vc.current;
  return (vc.current = mc), e === null ? mc : e;
}
function E1() {
  (St === 0 || St === 3 || St === 2) && (St = 4),
    kt === null || (!(bo & 268435455) && !(Yc & 268435455)) || Si(kt, It);
}
function xc(e, t) {
  var n = Ae;
  Ae |= 2;
  var r = e5();
  (kt !== e || It !== t) && ((jr = null), wo(e, t));
  do
    try {
      dO();
      break;
    } catch (i) {
      J4(e, i);
    }
  while (1);
  if ((o1(), (Ae = n), (vc.current = r), vt !== null)) throw Error(Q(261));
  return (kt = null), (It = 0), St;
}
function dO() {
  for (; vt !== null; ) t5(vt);
}
function pO() {
  for (; vt !== null && !$b(); ) t5(vt);
}
function t5(e) {
  var t = i5(e.alternate, e, xn);
  (e.memoizedProps = e.pendingProps),
    t === null ? n5(e) : (vt = t),
    (y1.current = null);
}
function n5(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = lO(n, t)), n !== null)) {
        (n.flags &= 32767), (vt = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (St = 6), (vt = null);
        return;
      }
    } else if (((n = oO(n, t, xn)), n !== null)) {
      vt = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      vt = t;
      return;
    }
    vt = t = e;
  } while (t !== null);
  St === 0 && (St = 5);
}
function so(e, t, n) {
  var r = Be,
    i = Kn.transition;
  try {
    (Kn.transition = null), (Be = 1), hO(e, t, n, r);
  } finally {
    (Kn.transition = i), (Be = r);
  }
  return null;
}
function hO(e, t, n, r) {
  do wl();
  while (ki !== null);
  if (Ae & 6) throw Error(Q(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(Q(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = n.lanes | n.childLanes;
  if (
    (Kb(e, l),
    e === kt && ((vt = kt = null), (It = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Oa ||
      ((Oa = !0),
      o5(tc, function () {
        return wl(), null;
      })),
    (l = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || l)
  ) {
    (l = Kn.transition), (Kn.transition = null);
    var s = Be;
    Be = 1;
    var a = Ae;
    (Ae |= 4),
      (y1.current = null),
      sO(e, n),
      Y4(n, e),
      N_(Mh),
      (rc = !!Lh),
      (Mh = Lh = null),
      (e.current = n),
      aO(n),
      zb(),
      (Ae = a),
      (Be = s),
      (Kn.transition = l);
  } else e.current = n;
  if (
    (Oa && ((Oa = !1), (ki = e), (wc = i)),
    (l = e.pendingLanes),
    l === 0 && (Ri = null),
    Ub(n.stateNode),
    sn(e, gt()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (yc) throw ((yc = !1), (e = ng), (ng = null), e);
  return (
    wc & 1 && e.tag !== 0 && wl(),
    (l = e.pendingLanes),
    l & 1 ? (e === rg ? Nu++ : ((Nu = 0), (rg = e))) : (Nu = 0),
    Vi(),
    null
  );
}
function wl() {
  if (ki !== null) {
    var e = Mw(wc),
      t = Kn.transition,
      n = Be;
    try {
      if (((Kn.transition = null), (Be = 16 > e ? 16 : e), ki === null))
        var r = !1;
      else {
        if (((e = ki), (ki = null), (wc = 0), Ae & 6)) throw Error(Q(331));
        var i = Ae;
        for (Ae |= 4, le = e.current; le !== null; ) {
          var l = le,
            s = l.child;
          if (le.flags & 16) {
            var a = l.deletions;
            if (a !== null) {
              for (var f = 0; f < a.length; f++) {
                var d = a[f];
                for (le = d; le !== null; ) {
                  var p = le;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Au(8, p, l);
                  }
                  var g = p.child;
                  if (g !== null) (g.return = p), (le = g);
                  else
                    for (; le !== null; ) {
                      p = le;
                      var v = p.sibling,
                        m = p.return;
                      if ((q4(p), p === d)) {
                        le = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = m), (le = v);
                        break;
                      }
                      le = m;
                    }
                }
              }
              var E = l.alternate;
              if (E !== null) {
                var S = E.child;
                if (S !== null) {
                  E.child = null;
                  do {
                    var N = S.sibling;
                    (S.sibling = null), (S = N);
                  } while (S !== null);
                }
              }
              le = l;
            }
          }
          if (l.subtreeFlags & 2064 && s !== null) (s.return = l), (le = s);
          else
            e: for (; le !== null; ) {
              if (((l = le), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Au(9, l, l.return);
                }
              var y = l.sibling;
              if (y !== null) {
                (y.return = l.return), (le = y);
                break e;
              }
              le = l.return;
            }
        }
        var x = e.current;
        for (le = x; le !== null; ) {
          s = le;
          var k = s.child;
          if (s.subtreeFlags & 2064 && k !== null) (k.return = s), (le = k);
          else
            e: for (s = x; le !== null; ) {
              if (((a = le), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qc(9, a);
                  }
                } catch (M) {
                  dt(a, a.return, M);
                }
              if (a === s) {
                le = null;
                break e;
              }
              var I = a.sibling;
              if (I !== null) {
                (I.return = a.return), (le = I);
                break e;
              }
              le = a.return;
            }
        }
        if (
          ((Ae = i), Vi(), _r && typeof _r.onPostCommitFiberRoot == "function")
        )
          try {
            _r.onPostCommitFiberRoot(Hc, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (Be = n), (Kn.transition = t);
    }
  }
  return !1;
}
function c2(e, t, n) {
  (t = Rl(n, t)),
    (t = M4(e, t, 1)),
    (e = Pi(e, t, 1)),
    (t = qt()),
    e !== null && (hs(e, 1, t), sn(e, t));
}
function dt(e, t, n) {
  if (e.tag === 3) c2(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        c2(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Ri === null || !Ri.has(r)))
        ) {
          (e = Rl(n, e)),
            (e = F4(t, e, 1)),
            (t = Pi(t, e, 1)),
            (e = qt()),
            t !== null && (hs(t, 1, e), sn(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function gO(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = qt()),
    (e.pingedLanes |= e.suspendedLanes & n),
    kt === e &&
      (It & n) === n &&
      (St === 4 || (St === 3 && (It & 130023424) === It && 500 > gt() - x1)
        ? wo(e, 0)
        : (w1 |= n)),
    sn(e, t);
}
function r5(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = va), (va <<= 1), !(va & 130023424) && (va = 4194304))
      : (t = 1));
  var n = qt();
  (e = Xr(e, t)), e !== null && (hs(e, t, n), sn(e, n));
}
function mO(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), r5(e, n);
}
function vO(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(Q(314));
  }
  r !== null && r.delete(t), r5(e, n);
}
var i5;
i5 = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ln.current) rn = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (rn = !1), iO(e, t, n);
      rn = !!(e.flags & 131072);
    }
  else (rn = !1), ot && t.flags & 1048576 && s4(t, cc, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ua(e, t), (e = t.pendingProps);
      var i = Ol(t, zt.current);
      yl(t, n), (i = p1(null, t, r, e, i, n));
      var l = h1();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            un(r) ? ((l = !0), sc(t)) : (l = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            s1(t),
            (i.updater = Kc),
            (t.stateNode = i),
            (i._reactInternals = t),
            Vh(t, r, e, n),
            (t = Kh(null, t, r, !0, l, n)))
          : ((t.tag = 0), ot && l && t1(t), Vt(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ua(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = wO(r)),
          (e = ur(r, e)),
          i)
        ) {
          case 0:
            t = qh(null, t, r, e, n);
            break e;
          case 1:
            t = e2(null, t, r, e, n);
            break e;
          case 11:
            t = Zy(null, t, r, e, n);
            break e;
          case 14:
            t = Jy(null, t, r, ur(r.type, e), n);
            break e;
        }
        throw Error(Q(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : ur(r, i)),
        qh(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : ur(r, i)),
        e2(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((H4(t), e === null)) throw Error(Q(387));
        (r = t.pendingProps),
          (l = t.memoizedState),
          (i = l.element),
          h4(e, t),
          pc(t, r, null, n);
        var s = t.memoizedState;
        if (((r = s.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = l),
            (t.memoizedState = l),
            t.flags & 256)
          ) {
            (i = Rl(Error(Q(423)), t)), (t = t2(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Rl(Error(Q(424)), t)), (t = t2(e, t, r, n, i));
            break e;
          } else
            for (
              En = Ii(t.stateNode.containerInfo.firstChild),
                bn = t,
                ot = !0,
                ar = null,
                n = d4(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Tl(), r === i)) {
            t = Zr(e, t, n);
            break e;
          }
          Vt(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        g4(t),
        e === null && Uh(t),
        (r = t.type),
        (i = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (s = i.children),
        Fh(r, i) ? (s = null) : l !== null && Fh(r, l) && (t.flags |= 32),
        B4(e, t),
        Vt(e, t, s, n),
        t.child
      );
    case 6:
      return e === null && Uh(t), null;
    case 13:
      return U4(e, t, n);
    case 4:
      return (
        a1(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Il(t, null, r, n)) : Vt(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : ur(r, i)),
        Zy(e, t, r, i, n)
      );
    case 7:
      return Vt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Vt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Vt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (l = t.memoizedProps),
          (s = i.value),
          Ye(fc, r._currentValue),
          (r._currentValue = s),
          l !== null)
        )
          if (hr(l.value, s)) {
            if (l.children === i.children && !ln.current) {
              t = Zr(e, t, n);
              break e;
            }
          } else
            for (l = t.child, l !== null && (l.return = t); l !== null; ) {
              var a = l.dependencies;
              if (a !== null) {
                s = l.child;
                for (var f = a.firstContext; f !== null; ) {
                  if (f.context === r) {
                    if (l.tag === 1) {
                      (f = Kr(-1, n & -n)), (f.tag = 2);
                      var d = l.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var p = d.pending;
                        p === null
                          ? (f.next = f)
                          : ((f.next = p.next), (p.next = f)),
                          (d.pending = f);
                      }
                    }
                    (l.lanes |= n),
                      (f = l.alternate),
                      f !== null && (f.lanes |= n),
                      Wh(l.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  f = f.next;
                }
              } else if (l.tag === 10) s = l.type === t.type ? null : l.child;
              else if (l.tag === 18) {
                if (((s = l.return), s === null)) throw Error(Q(341));
                (s.lanes |= n),
                  (a = s.alternate),
                  a !== null && (a.lanes |= n),
                  Wh(s, n, t),
                  (s = l.sibling);
              } else s = l.child;
              if (s !== null) s.return = l;
              else
                for (s = l; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((l = s.sibling), l !== null)) {
                    (l.return = s.return), (s = l);
                    break;
                  }
                  s = s.return;
                }
              l = s;
            }
        Vt(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        yl(t, n),
        (i = Qn(i)),
        (r = r(i)),
        (t.flags |= 1),
        Vt(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = ur(r, t.pendingProps)),
        (i = ur(r.type, i)),
        Jy(e, t, r, i, n)
      );
    case 15:
      return $4(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : ur(r, i)),
        Ua(e, t),
        (t.tag = 1),
        un(r) ? ((e = !0), sc(t)) : (e = !1),
        yl(t, n),
        L4(t, r, i),
        Vh(t, r, i, n),
        Kh(null, t, r, !0, e, n)
      );
    case 19:
      return W4(e, t, n);
    case 22:
      return z4(e, t, n);
  }
  throw Error(Q(156, t.tag));
};
function o5(e, t) {
  return Aw(e, t);
}
function yO(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function qn(e, t, n, r) {
  return new yO(e, t, n, r);
}
function k1(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function wO(e) {
  if (typeof e == "function") return k1(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Wg)) return 11;
    if (e === jg) return 14;
  }
  return 2;
}
function Di(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = qn(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Va(e, t, n, r, i, l) {
  var s = 2;
  if (((r = e), typeof e == "function")) k1(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case rl:
        return xo(n.children, i, l, t);
      case Ug:
        (s = 8), (i |= 8);
        break;
      case gh:
        return (
          (e = qn(12, n, t, i | 2)), (e.elementType = gh), (e.lanes = l), e
        );
      case mh:
        return (e = qn(13, n, t, i)), (e.elementType = mh), (e.lanes = l), e;
      case vh:
        return (e = qn(19, n, t, i)), (e.elementType = vh), (e.lanes = l), e;
      case gw:
        return Xc(n, i, l, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case pw:
              s = 10;
              break e;
            case hw:
              s = 9;
              break e;
            case Wg:
              s = 11;
              break e;
            case jg:
              s = 14;
              break e;
            case yi:
              (s = 16), (r = null);
              break e;
          }
        throw Error(Q(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = qn(s, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = l), t
  );
}
function xo(e, t, n, r) {
  return (e = qn(7, e, r, t)), (e.lanes = n), e;
}
function Xc(e, t, n, r) {
  return (
    (e = qn(22, e, r, t)),
    (e.elementType = gw),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ap(e, t, n) {
  return (e = qn(6, e, null, t)), (e.lanes = n), e;
}
function Dp(e, t, n) {
  return (
    (t = qn(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function xO(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = pp(0)),
    (this.expirationTimes = pp(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = pp(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function b1(e, t, n, r, i, l, s, a, f) {
  return (
    (e = new xO(e, t, n, a, f)),
    t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
    (l = qn(3, null, null, t)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    s1(l),
    e
  );
}
function SO(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: nl,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function l5(e) {
  if (!e) return $i;
  e = e._reactInternals;
  e: {
    if (Ro(e) !== e || e.tag !== 1) throw Error(Q(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (un(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Q(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (un(n)) return l4(e, n, t);
  }
  return t;
}
function u5(e, t, n, r, i, l, s, a, f) {
  return (
    (e = b1(n, r, !0, e, i, l, s, a, f)),
    (e.context = l5(null)),
    (n = e.current),
    (r = qt()),
    (i = Ai(n)),
    (l = Kr(r, i)),
    (l.callback = t ?? null),
    Pi(n, l, i),
    (e.current.lanes = i),
    hs(e, i, r),
    sn(e, r),
    e
  );
}
function Zc(e, t, n, r) {
  var i = t.current,
    l = qt(),
    s = Ai(i);
  return (
    (n = l5(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Kr(l, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Pi(i, t, s)),
    e !== null && (pr(e, i, s, l), za(e, i, s)),
    s
  );
}
function Sc(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function f2(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function _1(e, t) {
  f2(e, t), (e = e.alternate) && f2(e, t);
}
function CO() {
  return null;
}
var s5 =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function O1(e) {
  this._internalRoot = e;
}
Jc.prototype.render = O1.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Q(409));
  Zc(e, t, null, null);
};
Jc.prototype.unmount = O1.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    _o(function () {
      Zc(null, e, null, null);
    }),
      (t[Yr] = null);
  }
};
function Jc(e) {
  this._internalRoot = e;
}
Jc.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = zw();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < xi.length && t !== 0 && t < xi[n].priority; n++);
    xi.splice(n, 0, e), n === 0 && Hw(e);
  }
};
function T1(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ef(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function d2() {}
function EO(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var d = Sc(s);
        l.call(d);
      };
    }
    var s = u5(t, r, e, 0, null, !1, !1, "", d2);
    return (
      (e._reactRootContainer = s),
      (e[Yr] = s.current),
      Xu(e.nodeType === 8 ? e.parentNode : e),
      _o(),
      s
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var d = Sc(f);
      a.call(d);
    };
  }
  var f = b1(e, 0, !1, null, null, !1, !1, "", d2);
  return (
    (e._reactRootContainer = f),
    (e[Yr] = f.current),
    Xu(e.nodeType === 8 ? e.parentNode : e),
    _o(function () {
      Zc(t, f, n, r);
    }),
    f
  );
}
function tf(e, t, n, r, i) {
  var l = n._reactRootContainer;
  if (l) {
    var s = l;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var f = Sc(s);
        a.call(f);
      };
    }
    Zc(t, s, e, i);
  } else s = EO(n, t, e, i, r);
  return Sc(s);
}
Fw = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Su(t.pendingLanes);
        n !== 0 &&
          (qg(t, n | 1), sn(t, gt()), !(Ae & 6) && ((Al = gt() + 500), Vi()));
      }
      break;
    case 13:
      _o(function () {
        var r = Xr(e, 1);
        if (r !== null) {
          var i = qt();
          pr(r, e, 1, i);
        }
      }),
        _1(e, 1);
  }
};
Kg = function (e) {
  if (e.tag === 13) {
    var t = Xr(e, 134217728);
    if (t !== null) {
      var n = qt();
      pr(t, e, 134217728, n);
    }
    _1(e, 134217728);
  }
};
$w = function (e) {
  if (e.tag === 13) {
    var t = Ai(e),
      n = Xr(e, t);
    if (n !== null) {
      var r = qt();
      pr(n, e, t, r);
    }
    _1(e, t);
  }
};
zw = function () {
  return Be;
};
Bw = function (e, t) {
  var n = Be;
  try {
    return (Be = e), t();
  } finally {
    Be = n;
  }
};
Oh = function (e, t, n) {
  switch (t) {
    case "input":
      if ((xh(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Vc(r);
            if (!i) throw Error(Q(90));
            vw(r), xh(r, i);
          }
        }
      }
      break;
    case "textarea":
      ww(e, n);
      break;
    case "select":
      (t = n.value), t != null && hl(e, !!n.multiple, t, !1);
  }
};
_w = S1;
Ow = _o;
var kO = { usingClientEntryPoint: !1, Events: [ms, ul, Vc, kw, bw, S1] },
  mu = {
    findFiberByHostInstance: ho,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  bO = {
    bundleType: mu.bundleType,
    version: mu.version,
    rendererPackageName: mu.rendererPackageName,
    rendererConfig: mu.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ei.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Pw(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: mu.findFiberByHostInstance || CO,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ta = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ta.isDisabled && Ta.supportsFiber)
    try {
      (Hc = Ta.inject(bO)), (_r = Ta);
    } catch {}
}
Pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = kO;
Pn.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!T1(t)) throw Error(Q(200));
  return SO(e, t, null, n);
};
Pn.createRoot = function (e, t) {
  if (!T1(e)) throw Error(Q(299));
  var n = !1,
    r = "",
    i = s5;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = b1(e, 1, !1, null, null, n, !1, r, i)),
    (e[Yr] = t.current),
    Xu(e.nodeType === 8 ? e.parentNode : e),
    new O1(t)
  );
};
Pn.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(Q(188))
      : ((e = Object.keys(e).join(",")), Error(Q(268, e)));
  return (e = Pw(t)), (e = e === null ? null : e.stateNode), e;
};
Pn.flushSync = function (e) {
  return _o(e);
};
Pn.hydrate = function (e, t, n) {
  if (!ef(t)) throw Error(Q(200));
  return tf(null, e, t, !0, n);
};
Pn.hydrateRoot = function (e, t, n) {
  if (!T1(e)) throw Error(Q(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    l = "",
    s = s5;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = u5(t, null, e, 1, n ?? null, i, !1, l, s)),
    (e[Yr] = t.current),
    Xu(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new Jc(t);
};
Pn.render = function (e, t, n) {
  if (!ef(t)) throw Error(Q(200));
  return tf(null, e, t, !1, n);
};
Pn.unmountComponentAtNode = function (e) {
  if (!ef(e)) throw Error(Q(40));
  return e._reactRootContainer
    ? (_o(function () {
        tf(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Yr] = null);
        });
      }),
      !0)
    : !1;
};
Pn.unstable_batchedUpdates = S1;
Pn.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ef(n)) throw Error(Q(200));
  if (e == null || e._reactInternals === void 0) throw Error(Q(38));
  return tf(e, t, n, !1, r);
};
Pn.version = "18.3.1-next-f1338f8080-20240426";
function a5() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a5);
    } catch (e) {
      console.error(e);
    }
}
a5(), (aw.exports = Pn);
var Bl = aw.exports;
const Ia = Ui(Bl);
var c5,
  p2 = Bl;
(c5 = p2.createRoot), p2.hydrateRoot;
var f5 = { exports: {} },
  d5 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dl = A;
function _O(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var OO = typeof Object.is == "function" ? Object.is : _O,
  TO = Dl.useState,
  IO = Dl.useEffect,
  PO = Dl.useLayoutEffect,
  RO = Dl.useDebugValue;
function AO(e, t) {
  var n = t(),
    r = TO({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    l = r[1];
  return (
    PO(
      function () {
        (i.value = n), (i.getSnapshot = t), Np(i) && l({ inst: i });
      },
      [e, n, t]
    ),
    IO(
      function () {
        return (
          Np(i) && l({ inst: i }),
          e(function () {
            Np(i) && l({ inst: i });
          })
        );
      },
      [e]
    ),
    RO(n),
    n
  );
}
function Np(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !OO(e, n);
  } catch {
    return !0;
  }
}
function DO(e, t) {
  return t();
}
var NO =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? DO
    : AO;
d5.useSyncExternalStore =
  Dl.useSyncExternalStore !== void 0 ? Dl.useSyncExternalStore : NO;
f5.exports = d5;
var LO = f5.exports,
  p5 = { exports: {} },
  h5 = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nf = A,
  MO = LO;
function FO(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var $O = typeof Object.is == "function" ? Object.is : FO,
  zO = MO.useSyncExternalStore,
  BO = nf.useRef,
  HO = nf.useEffect,
  UO = nf.useMemo,
  WO = nf.useDebugValue;
h5.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var l = BO(null);
  if (l.current === null) {
    var s = { hasValue: !1, value: null };
    l.current = s;
  } else s = l.current;
  l = UO(
    function () {
      function f(m) {
        if (!d) {
          if (((d = !0), (p = m), (m = r(m)), i !== void 0 && s.hasValue)) {
            var E = s.value;
            if (i(E, m)) return (g = E);
          }
          return (g = m);
        }
        if (((E = g), $O(p, m))) return E;
        var S = r(m);
        return i !== void 0 && i(E, S) ? ((p = m), E) : ((p = m), (g = S));
      }
      var d = !1,
        p,
        g,
        v = n === void 0 ? null : n;
      return [
        function () {
          return f(t());
        },
        v === null
          ? void 0
          : function () {
              return f(v());
            },
      ];
    },
    [t, n, r, i]
  );
  var a = zO(e, l[0], l[1]);
  return (
    HO(
      function () {
        (s.hasValue = !0), (s.value = a);
      },
      [a]
    ),
    WO(a),
    a
  );
};
p5.exports = h5;
var jO = p5.exports;
function VO(e) {
  e();
}
let g5 = VO;
const GO = (e) => (g5 = e),
  qO = () => g5,
  h2 = Symbol.for("react-redux-context"),
  g2 = typeof globalThis < "u" ? globalThis : {};
function KO() {
  var e;
  if (!A.createContext) return {};
  const t = (e = g2[h2]) != null ? e : (g2[h2] = new Map());
  let n = t.get(A.createContext);
  return n || ((n = A.createContext(null)), t.set(A.createContext, n)), n;
}
const zi = KO();
function I1(e = zi) {
  return function () {
    return A.useContext(e);
  };
}
const m5 = I1(),
  QO = () => {
    throw new Error("uSES not initialized!");
  };
let v5 = QO;
const YO = (e) => {
    v5 = e;
  },
  XO = (e, t) => e === t;
function ZO(e = zi) {
  const t = e === zi ? m5 : I1(e);
  return function (r, i = {}) {
    const {
        equalityFn: l = XO,
        stabilityCheck: s = void 0,
        noopCheck: a = void 0,
      } = typeof i == "function" ? { equalityFn: i } : i,
      {
        store: f,
        subscription: d,
        getServerState: p,
        stabilityCheck: g,
        noopCheck: v,
      } = t();
    A.useRef(!0);
    const m = A.useCallback(
        {
          [r.name](S) {
            return r(S);
          },
        }[r.name],
        [r, g, s]
      ),
      E = v5(d.addNestedSub, f.getState, p || f.getState, m, l);
    return A.useDebugValue(E), E;
  };
}
const JO = ZO();
function Cc() {
  return (
    (Cc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Cc.apply(null, arguments)
  );
}
function P1(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var y5 = { exports: {} },
  He = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bt = typeof Symbol == "function" && Symbol.for,
  R1 = bt ? Symbol.for("react.element") : 60103,
  A1 = bt ? Symbol.for("react.portal") : 60106,
  rf = bt ? Symbol.for("react.fragment") : 60107,
  of = bt ? Symbol.for("react.strict_mode") : 60108,
  lf = bt ? Symbol.for("react.profiler") : 60114,
  uf = bt ? Symbol.for("react.provider") : 60109,
  sf = bt ? Symbol.for("react.context") : 60110,
  D1 = bt ? Symbol.for("react.async_mode") : 60111,
  af = bt ? Symbol.for("react.concurrent_mode") : 60111,
  cf = bt ? Symbol.for("react.forward_ref") : 60112,
  ff = bt ? Symbol.for("react.suspense") : 60113,
  eT = bt ? Symbol.for("react.suspense_list") : 60120,
  df = bt ? Symbol.for("react.memo") : 60115,
  pf = bt ? Symbol.for("react.lazy") : 60116,
  tT = bt ? Symbol.for("react.block") : 60121,
  nT = bt ? Symbol.for("react.fundamental") : 60117,
  rT = bt ? Symbol.for("react.responder") : 60118,
  iT = bt ? Symbol.for("react.scope") : 60119;
function An(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case R1:
        switch (((e = e.type), e)) {
          case D1:
          case af:
          case rf:
          case lf:
          case of:
          case ff:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case sf:
              case cf:
              case pf:
              case df:
              case uf:
                return e;
              default:
                return t;
            }
        }
      case A1:
        return t;
    }
  }
}
function w5(e) {
  return An(e) === af;
}
He.AsyncMode = D1;
He.ConcurrentMode = af;
He.ContextConsumer = sf;
He.ContextProvider = uf;
He.Element = R1;
He.ForwardRef = cf;
He.Fragment = rf;
He.Lazy = pf;
He.Memo = df;
He.Portal = A1;
He.Profiler = lf;
He.StrictMode = of;
He.Suspense = ff;
He.isAsyncMode = function (e) {
  return w5(e) || An(e) === D1;
};
He.isConcurrentMode = w5;
He.isContextConsumer = function (e) {
  return An(e) === sf;
};
He.isContextProvider = function (e) {
  return An(e) === uf;
};
He.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === R1;
};
He.isForwardRef = function (e) {
  return An(e) === cf;
};
He.isFragment = function (e) {
  return An(e) === rf;
};
He.isLazy = function (e) {
  return An(e) === pf;
};
He.isMemo = function (e) {
  return An(e) === df;
};
He.isPortal = function (e) {
  return An(e) === A1;
};
He.isProfiler = function (e) {
  return An(e) === lf;
};
He.isStrictMode = function (e) {
  return An(e) === of;
};
He.isSuspense = function (e) {
  return An(e) === ff;
};
He.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === rf ||
    e === af ||
    e === lf ||
    e === of ||
    e === ff ||
    e === eT ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === pf ||
        e.$$typeof === df ||
        e.$$typeof === uf ||
        e.$$typeof === sf ||
        e.$$typeof === cf ||
        e.$$typeof === nT ||
        e.$$typeof === rT ||
        e.$$typeof === iT ||
        e.$$typeof === tT))
  );
};
He.typeOf = An;
y5.exports = He;
var oT = y5.exports,
  x5 = oT,
  lT = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  uT = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  S5 = {};
S5[x5.ForwardRef] = lT;
S5[x5.Memo] = uT;
var We = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var N1 = Symbol.for("react.element"),
  L1 = Symbol.for("react.portal"),
  hf = Symbol.for("react.fragment"),
  gf = Symbol.for("react.strict_mode"),
  mf = Symbol.for("react.profiler"),
  vf = Symbol.for("react.provider"),
  yf = Symbol.for("react.context"),
  sT = Symbol.for("react.server_context"),
  wf = Symbol.for("react.forward_ref"),
  xf = Symbol.for("react.suspense"),
  Sf = Symbol.for("react.suspense_list"),
  Cf = Symbol.for("react.memo"),
  Ef = Symbol.for("react.lazy"),
  aT = Symbol.for("react.offscreen"),
  C5;
C5 = Symbol.for("react.module.reference");
function Xn(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case N1:
        switch (((e = e.type), e)) {
          case hf:
          case mf:
          case gf:
          case xf:
          case Sf:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case sT:
              case yf:
              case wf:
              case Ef:
              case Cf:
              case vf:
                return e;
              default:
                return t;
            }
        }
      case L1:
        return t;
    }
  }
}
We.ContextConsumer = yf;
We.ContextProvider = vf;
We.Element = N1;
We.ForwardRef = wf;
We.Fragment = hf;
We.Lazy = Ef;
We.Memo = Cf;
We.Portal = L1;
We.Profiler = mf;
We.StrictMode = gf;
We.Suspense = xf;
We.SuspenseList = Sf;
We.isAsyncMode = function () {
  return !1;
};
We.isConcurrentMode = function () {
  return !1;
};
We.isContextConsumer = function (e) {
  return Xn(e) === yf;
};
We.isContextProvider = function (e) {
  return Xn(e) === vf;
};
We.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === N1;
};
We.isForwardRef = function (e) {
  return Xn(e) === wf;
};
We.isFragment = function (e) {
  return Xn(e) === hf;
};
We.isLazy = function (e) {
  return Xn(e) === Ef;
};
We.isMemo = function (e) {
  return Xn(e) === Cf;
};
We.isPortal = function (e) {
  return Xn(e) === L1;
};
We.isProfiler = function (e) {
  return Xn(e) === mf;
};
We.isStrictMode = function (e) {
  return Xn(e) === gf;
};
We.isSuspense = function (e) {
  return Xn(e) === xf;
};
We.isSuspenseList = function (e) {
  return Xn(e) === Sf;
};
We.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === hf ||
    e === mf ||
    e === gf ||
    e === xf ||
    e === Sf ||
    e === aT ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Ef ||
        e.$$typeof === Cf ||
        e.$$typeof === vf ||
        e.$$typeof === yf ||
        e.$$typeof === wf ||
        e.$$typeof === C5 ||
        e.getModuleId !== void 0))
  );
};
We.typeOf = Xn;
function cT() {
  const e = qO();
  let t = null,
    n = null;
  return {
    clear() {
      (t = null), (n = null);
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; ) r.callback(), (r = r.next);
      });
    },
    get() {
      let r = [],
        i = t;
      for (; i; ) r.push(i), (i = i.next);
      return r;
    },
    subscribe(r) {
      let i = !0,
        l = (n = { callback: r, next: null, prev: n });
      return (
        l.prev ? (l.prev.next = l) : (t = l),
        function () {
          !i ||
            t === null ||
            ((i = !1),
            l.next ? (l.next.prev = l.prev) : (n = l.prev),
            l.prev ? (l.prev.next = l.next) : (t = l.next));
        }
      );
    },
  };
}
const m2 = { notify() {}, get: () => [] };
function fT(e, t) {
  let n,
    r = m2,
    i = 0,
    l = !1;
  function s(S) {
    p();
    const N = r.subscribe(S);
    let y = !1;
    return () => {
      y || ((y = !0), N(), g());
    };
  }
  function a() {
    r.notify();
  }
  function f() {
    E.onStateChange && E.onStateChange();
  }
  function d() {
    return l;
  }
  function p() {
    i++, n || ((n = t ? t.addNestedSub(f) : e.subscribe(f)), (r = cT()));
  }
  function g() {
    i--, n && i === 0 && (n(), (n = void 0), r.clear(), (r = m2));
  }
  function v() {
    l || ((l = !0), p());
  }
  function m() {
    l && ((l = !1), g());
  }
  const E = {
    addNestedSub: s,
    notifyNestedSubs: a,
    handleChangeWrapper: f,
    isSubscribed: d,
    trySubscribe: v,
    tryUnsubscribe: m,
    getListeners: () => r,
  };
  return E;
}
const dT =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  pT = dT ? A.useLayoutEffect : A.useEffect;
function hT({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: i = "once",
  noopCheck: l = "once",
}) {
  const s = A.useMemo(() => {
      const d = fT(e);
      return {
        store: e,
        subscription: d,
        getServerState: r ? () => r : void 0,
        stabilityCheck: i,
        noopCheck: l,
      };
    }, [e, r, i, l]),
    a = A.useMemo(() => e.getState(), [e]);
  pT(() => {
    const { subscription: d } = s;
    return (
      (d.onStateChange = d.notifyNestedSubs),
      d.trySubscribe(),
      a !== e.getState() && d.notifyNestedSubs(),
      () => {
        d.tryUnsubscribe(), (d.onStateChange = void 0);
      }
    );
  }, [s, a]);
  const f = t || zi;
  return A.createElement(f.Provider, { value: s }, n);
}
function E5(e = zi) {
  const t = e === zi ? m5 : I1(e);
  return function () {
    const { store: r } = t();
    return r;
  };
}
const gT = E5();
function mT(e = zi) {
  const t = e === zi ? gT : E5(e);
  return function () {
    return t().dispatch;
  };
}
const vT = mT();
YO(jO.useSyncExternalStoreWithSelector);
GO(Bl.unstable_batchedUpdates);
const k5 = A.createContext({ dragDropManager: void 0 });
function ls(e) {
  "@babel/helpers - typeof";
  return (
    (ls =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    ls(e)
  );
}
function yT(e, t) {
  if (ls(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (ls(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wT(e) {
  var t = yT(e, "string");
  return ls(t) == "symbol" ? t : t + "";
}
function xT(e, t, n) {
  return (
    (t = wT(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function v2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function y2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? v2(Object(n), !0).forEach(function (r) {
          xT(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : v2(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Lt(e) {
  return (
    "Minified Redux error #" +
    e +
    "; visit https://redux.js.org/Errors?code=" +
    e +
    " for the full message or use the non-minified dev environment for full errors. "
  );
}
var w2 = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })(),
  Lp = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  },
  Ec = {
    INIT: "@@redux/INIT" + Lp(),
    REPLACE: "@@redux/REPLACE" + Lp(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + Lp();
    },
  };
function ST(e) {
  if (typeof e != "object" || e === null) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function M1(e, t, n) {
  var r;
  if (
    (typeof t == "function" && typeof n == "function") ||
    (typeof n == "function" && typeof arguments[3] == "function")
  )
    throw new Error(Lt(0));
  if (
    (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
    typeof n < "u")
  ) {
    if (typeof n != "function") throw new Error(Lt(1));
    return n(M1)(e, t);
  }
  if (typeof e != "function") throw new Error(Lt(2));
  var i = e,
    l = t,
    s = [],
    a = s,
    f = !1;
  function d() {
    a === s && (a = s.slice());
  }
  function p() {
    if (f) throw new Error(Lt(3));
    return l;
  }
  function g(S) {
    if (typeof S != "function") throw new Error(Lt(4));
    if (f) throw new Error(Lt(5));
    var N = !0;
    return (
      d(),
      a.push(S),
      function () {
        if (N) {
          if (f) throw new Error(Lt(6));
          (N = !1), d();
          var x = a.indexOf(S);
          a.splice(x, 1), (s = null);
        }
      }
    );
  }
  function v(S) {
    if (!ST(S)) throw new Error(Lt(7));
    if (typeof S.type > "u") throw new Error(Lt(8));
    if (f) throw new Error(Lt(9));
    try {
      (f = !0), (l = i(l, S));
    } finally {
      f = !1;
    }
    for (var N = (s = a), y = 0; y < N.length; y++) {
      var x = N[y];
      x();
    }
    return S;
  }
  function m(S) {
    if (typeof S != "function") throw new Error(Lt(10));
    (i = S), v({ type: Ec.REPLACE });
  }
  function E() {
    var S,
      N = g;
    return (
      (S = {
        subscribe: function (x) {
          if (typeof x != "object" || x === null) throw new Error(Lt(11));
          function k() {
            x.next && x.next(p());
          }
          k();
          var I = N(k);
          return { unsubscribe: I };
        },
      }),
      (S[w2] = function () {
        return this;
      }),
      S
    );
  }
  return (
    v({ type: Ec.INIT }),
    (r = { dispatch: v, subscribe: g, getState: p, replaceReducer: m }),
    (r[w2] = E),
    r
  );
}
function CT(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t],
      r = n(void 0, { type: Ec.INIT });
    if (typeof r > "u") throw new Error(Lt(12));
    if (typeof n(void 0, { type: Ec.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(Lt(13));
  });
}
function ET(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == "function" && (n[i] = e[i]);
  }
  var l = Object.keys(n),
    s;
  try {
    CT(n);
  } catch (a) {
    s = a;
  }
  return function (f, d) {
    if ((f === void 0 && (f = {}), s)) throw s;
    for (var p = !1, g = {}, v = 0; v < l.length; v++) {
      var m = l[v],
        E = n[m],
        S = f[m],
        N = E(S, d);
      if (typeof N > "u") throw (d && d.type, new Error(Lt(14)));
      (g[m] = N), (p = p || N !== S);
    }
    return (p = p || l.length !== Object.keys(f).length), p ? g : f;
  };
}
function kc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.length === 0
    ? function (r) {
        return r;
      }
    : t.length === 1
    ? t[0]
    : t.reduce(function (r, i) {
        return function () {
          return r(i.apply(void 0, arguments));
        };
      });
}
function kT() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function (r) {
    return function () {
      var i = r.apply(void 0, arguments),
        l = function () {
          throw new Error(Lt(15));
        },
        s = {
          getState: i.getState,
          dispatch: function () {
            return l.apply(void 0, arguments);
          },
        },
        a = t.map(function (f) {
          return f(s);
        });
      return (
        (l = kc.apply(void 0, a)(i.dispatch)),
        y2(y2({}, i), {}, { dispatch: l })
      );
    };
  };
}
function Ee(e, t, ...n) {
  if (bT() && t === void 0)
    throw new Error("invariant requires an error message argument");
  if (!e) {
    let r;
    if (t === void 0)
      r = new Error(
        "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
      );
    else {
      let i = 0;
      (r = new Error(
        t.replace(/%s/g, function () {
          return n[i++];
        })
      )),
        (r.name = "Invariant Violation");
    }
    throw ((r.framesToPop = 1), r);
  }
}
function bT() {
  return typeof process < "u" && {}.NODE_ENV === "production";
}
function _T(e, t, n) {
  return t.split(".").reduce((r, i) => (r && r[i] ? r[i] : n || null), e);
}
function OT(e, t) {
  return e.filter((n) => n !== t);
}
function b5(e) {
  return typeof e == "object";
}
function TT(e, t) {
  const n = new Map(),
    r = (l) => {
      n.set(l, n.has(l) ? n.get(l) + 1 : 1);
    };
  e.forEach(r), t.forEach(r);
  const i = [];
  return (
    n.forEach((l, s) => {
      l === 1 && i.push(s);
    }),
    i
  );
}
function IT(e, t) {
  return e.filter((n) => t.indexOf(n) > -1);
}
const F1 = "dnd-core/INIT_COORDS",
  kf = "dnd-core/BEGIN_DRAG",
  $1 = "dnd-core/PUBLISH_DRAG_SOURCE",
  bf = "dnd-core/HOVER",
  _f = "dnd-core/DROP",
  Of = "dnd-core/END_DRAG";
function x2(e, t) {
  return {
    type: F1,
    payload: { sourceClientOffset: t || null, clientOffset: e || null },
  };
}
const PT = {
  type: F1,
  payload: { clientOffset: null, sourceClientOffset: null },
};
function RT(e) {
  return function (n = [], r = { publishSource: !0 }) {
    const {
        publishSource: i = !0,
        clientOffset: l,
        getSourceClientOffset: s,
      } = r,
      a = e.getMonitor(),
      f = e.getRegistry();
    e.dispatch(x2(l)), AT(n, a, f);
    const d = LT(n, a);
    if (d == null) {
      e.dispatch(PT);
      return;
    }
    let p = null;
    if (l) {
      if (!s) throw new Error("getSourceClientOffset must be defined");
      DT(s), (p = s(d));
    }
    e.dispatch(x2(l, p));
    const v = f.getSource(d).beginDrag(a, d);
    if (v == null) return;
    NT(v), f.pinSource(d);
    const m = f.getSourceType(d);
    return {
      type: kf,
      payload: {
        itemType: m,
        item: v,
        sourceId: d,
        clientOffset: l || null,
        sourceClientOffset: p || null,
        isSourcePublic: !!i,
      },
    };
  };
}
function AT(e, t, n) {
  Ee(!t.isDragging(), "Cannot call beginDrag while dragging."),
    e.forEach(function (r) {
      Ee(n.getSource(r), "Expected sourceIds to be registered.");
    });
}
function DT(e) {
  Ee(
    typeof e == "function",
    "When clientOffset is provided, getSourceClientOffset must be a function."
  );
}
function NT(e) {
  Ee(b5(e), "Item must be an object.");
}
function LT(e, t) {
  let n = null;
  for (let r = e.length - 1; r >= 0; r--)
    if (t.canDragSource(e[r])) {
      n = e[r];
      break;
    }
  return n;
}
function MT(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function FT(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {},
      r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function (i) {
          return Object.getOwnPropertyDescriptor(n, i).enumerable;
        })
      )),
      r.forEach(function (i) {
        MT(e, i, n[i]);
      });
  }
  return e;
}
function $T(e) {
  return function (n = {}) {
    const r = e.getMonitor(),
      i = e.getRegistry();
    zT(r),
      UT(r).forEach((s, a) => {
        const f = BT(s, a, i, r),
          d = { type: _f, payload: { dropResult: FT({}, n, f) } };
        e.dispatch(d);
      });
  };
}
function zT(e) {
  Ee(e.isDragging(), "Cannot call drop while not dragging."),
    Ee(!e.didDrop(), "Cannot call drop twice during one drag operation.");
}
function BT(e, t, n, r) {
  const i = n.getTarget(e);
  let l = i ? i.drop(r, e) : void 0;
  return HT(l), typeof l > "u" && (l = t === 0 ? {} : r.getDropResult()), l;
}
function HT(e) {
  Ee(
    typeof e > "u" || b5(e),
    "Drop result must either be an object or undefined."
  );
}
function UT(e) {
  const t = e.getTargetIds().filter(e.canDropOnTarget, e);
  return t.reverse(), t;
}
function WT(e) {
  return function () {
    const n = e.getMonitor(),
      r = e.getRegistry();
    jT(n);
    const i = n.getSourceId();
    return (
      i != null && (r.getSource(i, !0).endDrag(n, i), r.unpinSource()),
      { type: Of }
    );
  };
}
function jT(e) {
  Ee(e.isDragging(), "Cannot call endDrag while not dragging.");
}
function lg(e, t) {
  return t === null
    ? e === null
    : Array.isArray(e)
    ? e.some((n) => n === t)
    : e === t;
}
function VT(e) {
  return function (n, { clientOffset: r } = {}) {
    GT(n);
    const i = n.slice(0),
      l = e.getMonitor(),
      s = e.getRegistry(),
      a = l.getItemType();
    return (
      KT(i, s, a),
      qT(i, l, s),
      QT(i, l, s),
      { type: bf, payload: { targetIds: i, clientOffset: r || null } }
    );
  };
}
function GT(e) {
  Ee(Array.isArray(e), "Expected targetIds to be an array.");
}
function qT(e, t, n) {
  Ee(t.isDragging(), "Cannot call hover while not dragging."),
    Ee(!t.didDrop(), "Cannot call hover after drop.");
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    Ee(
      e.lastIndexOf(i) === r,
      "Expected targetIds to be unique in the passed array."
    );
    const l = n.getTarget(i);
    Ee(l, "Expected targetIds to be registered.");
  }
}
function KT(e, t, n) {
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r],
      l = t.getTargetType(i);
    lg(l, n) || e.splice(r, 1);
  }
}
function QT(e, t, n) {
  e.forEach(function (r) {
    n.getTarget(r).hover(t, r);
  });
}
function YT(e) {
  return function () {
    if (e.getMonitor().isDragging()) return { type: $1 };
  };
}
function XT(e) {
  return {
    beginDrag: RT(e),
    publishDragSource: YT(e),
    hover: VT(e),
    drop: $T(e),
    endDrag: WT(e),
  };
}
class ZT {
  receiveBackend(t) {
    this.backend = t;
  }
  getMonitor() {
    return this.monitor;
  }
  getBackend() {
    return this.backend;
  }
  getRegistry() {
    return this.monitor.registry;
  }
  getActions() {
    const t = this,
      { dispatch: n } = this.store;
    function r(l) {
      return (...s) => {
        const a = l.apply(t, s);
        typeof a < "u" && n(a);
      };
    }
    const i = XT(this);
    return Object.keys(i).reduce((l, s) => {
      const a = i[s];
      return (l[s] = r(a)), l;
    }, {});
  }
  dispatch(t) {
    this.store.dispatch(t);
  }
  constructor(t, n) {
    (this.isSetUp = !1),
      (this.handleRefCountChange = () => {
        const r = this.store.getState().refCount > 0;
        this.backend &&
          (r && !this.isSetUp
            ? (this.backend.setup(), (this.isSetUp = !0))
            : !r &&
              this.isSetUp &&
              (this.backend.teardown(), (this.isSetUp = !1)));
      }),
      (this.store = t),
      (this.monitor = n),
      t.subscribe(this.handleRefCountChange);
  }
}
function JT(e, t) {
  return { x: e.x + t.x, y: e.y + t.y };
}
function _5(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function eI(e) {
  const {
    clientOffset: t,
    initialClientOffset: n,
    initialSourceClientOffset: r,
  } = e;
  return !t || !n || !r ? null : _5(JT(t, r), n);
}
function tI(e) {
  const { clientOffset: t, initialClientOffset: n } = e;
  return !t || !n ? null : _5(t, n);
}
const Lu = [],
  z1 = [];
Lu.__IS_NONE__ = !0;
z1.__IS_ALL__ = !0;
function nI(e, t) {
  return e === Lu ? !1 : e === z1 || typeof t > "u" ? !0 : IT(t, e).length > 0;
}
class rI {
  subscribeToStateChange(t, n = {}) {
    const { handlerIds: r } = n;
    Ee(typeof t == "function", "listener must be a function."),
      Ee(
        typeof r > "u" || Array.isArray(r),
        "handlerIds, when specified, must be an array of strings."
      );
    let i = this.store.getState().stateId;
    const l = () => {
      const s = this.store.getState(),
        a = s.stateId;
      try {
        a === i || (a === i + 1 && !nI(s.dirtyHandlerIds, r)) || t();
      } finally {
        i = a;
      }
    };
    return this.store.subscribe(l);
  }
  subscribeToOffsetChange(t) {
    Ee(typeof t == "function", "listener must be a function.");
    let n = this.store.getState().dragOffset;
    const r = () => {
      const i = this.store.getState().dragOffset;
      i !== n && ((n = i), t());
    };
    return this.store.subscribe(r);
  }
  canDragSource(t) {
    if (!t) return !1;
    const n = this.registry.getSource(t);
    return (
      Ee(n, `Expected to find a valid source. sourceId=${t}`),
      this.isDragging() ? !1 : n.canDrag(this, t)
    );
  }
  canDropOnTarget(t) {
    if (!t) return !1;
    const n = this.registry.getTarget(t);
    if (
      (Ee(n, `Expected to find a valid target. targetId=${t}`),
      !this.isDragging() || this.didDrop())
    )
      return !1;
    const r = this.registry.getTargetType(t),
      i = this.getItemType();
    return lg(r, i) && n.canDrop(this, t);
  }
  isDragging() {
    return !!this.getItemType();
  }
  isDraggingSource(t) {
    if (!t) return !1;
    const n = this.registry.getSource(t, !0);
    if (
      (Ee(n, `Expected to find a valid source. sourceId=${t}`),
      !this.isDragging() || !this.isSourcePublic())
    )
      return !1;
    const r = this.registry.getSourceType(t),
      i = this.getItemType();
    return r !== i ? !1 : n.isDragging(this, t);
  }
  isOverTarget(t, n = { shallow: !1 }) {
    if (!t) return !1;
    const { shallow: r } = n;
    if (!this.isDragging()) return !1;
    const i = this.registry.getTargetType(t),
      l = this.getItemType();
    if (l && !lg(i, l)) return !1;
    const s = this.getTargetIds();
    if (!s.length) return !1;
    const a = s.indexOf(t);
    return r ? a === s.length - 1 : a > -1;
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType;
  }
  getItem() {
    return this.store.getState().dragOperation.item;
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }
  isSourcePublic() {
    return !!this.store.getState().dragOperation.isSourcePublic;
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }
  getSourceClientOffset() {
    return eI(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return tI(this.store.getState().dragOffset);
  }
  constructor(t, n) {
    (this.store = t), (this.registry = n);
  }
}
const S2 = typeof global < "u" ? global : self,
  O5 = S2.MutationObserver || S2.WebKitMutationObserver;
function T5(e) {
  return function () {
    const n = setTimeout(i, 0),
      r = setInterval(i, 50);
    function i() {
      clearTimeout(n), clearInterval(r), e();
    }
  };
}
function iI(e) {
  let t = 1;
  const n = new O5(e),
    r = document.createTextNode("");
  return (
    n.observe(r, { characterData: !0 }),
    function () {
      (t = -t), (r.data = t);
    }
  );
}
const oI = typeof O5 == "function" ? iI : T5;
class lI {
  enqueueTask(t) {
    const { queue: n, requestFlush: r } = this;
    n.length || (r(), (this.flushing = !0)), (n[n.length] = t);
  }
  constructor() {
    (this.queue = []),
      (this.pendingErrors = []),
      (this.flushing = !1),
      (this.index = 0),
      (this.capacity = 1024),
      (this.flush = () => {
        const { queue: t } = this;
        for (; this.index < t.length; ) {
          const n = this.index;
          if ((this.index++, t[n].call(), this.index > this.capacity)) {
            for (let r = 0, i = t.length - this.index; r < i; r++)
              t[r] = t[r + this.index];
            (t.length -= this.index), (this.index = 0);
          }
        }
        (t.length = 0), (this.index = 0), (this.flushing = !1);
      }),
      (this.registerPendingError = (t) => {
        this.pendingErrors.push(t), this.requestErrorThrow();
      }),
      (this.requestFlush = oI(this.flush)),
      (this.requestErrorThrow = T5(() => {
        if (this.pendingErrors.length) throw this.pendingErrors.shift();
      }));
  }
}
class uI {
  call() {
    try {
      this.task && this.task();
    } catch (t) {
      this.onError(t);
    } finally {
      (this.task = null), this.release(this);
    }
  }
  constructor(t, n) {
    (this.onError = t), (this.release = n), (this.task = null);
  }
}
class sI {
  create(t) {
    const n = this.freeTasks,
      r = n.length ? n.pop() : new uI(this.onError, (i) => (n[n.length] = i));
    return (r.task = t), r;
  }
  constructor(t) {
    (this.onError = t), (this.freeTasks = []);
  }
}
const I5 = new lI(),
  aI = new sI(I5.registerPendingError);
function cI(e) {
  I5.enqueueTask(aI.create(e));
}
const B1 = "dnd-core/ADD_SOURCE",
  H1 = "dnd-core/ADD_TARGET",
  U1 = "dnd-core/REMOVE_SOURCE",
  Tf = "dnd-core/REMOVE_TARGET";
function fI(e) {
  return { type: B1, payload: { sourceId: e } };
}
function dI(e) {
  return { type: H1, payload: { targetId: e } };
}
function pI(e) {
  return { type: U1, payload: { sourceId: e } };
}
function hI(e) {
  return { type: Tf, payload: { targetId: e } };
}
function gI(e) {
  Ee(typeof e.canDrag == "function", "Expected canDrag to be a function."),
    Ee(
      typeof e.beginDrag == "function",
      "Expected beginDrag to be a function."
    ),
    Ee(typeof e.endDrag == "function", "Expected endDrag to be a function.");
}
function mI(e) {
  Ee(typeof e.canDrop == "function", "Expected canDrop to be a function."),
    Ee(typeof e.hover == "function", "Expected hover to be a function."),
    Ee(typeof e.drop == "function", "Expected beginDrag to be a function.");
}
function ug(e, t) {
  if (t && Array.isArray(e)) {
    e.forEach((n) => ug(n, !1));
    return;
  }
  Ee(
    typeof e == "string" || typeof e == "symbol",
    t
      ? "Type can only be a string, a symbol, or an array of either."
      : "Type can only be a string or a symbol."
  );
}
var Vn;
(function (e) {
  (e.SOURCE = "SOURCE"), (e.TARGET = "TARGET");
})(Vn || (Vn = {}));
let vI = 0;
function yI() {
  return vI++;
}
function wI(e) {
  const t = yI().toString();
  switch (e) {
    case Vn.SOURCE:
      return `S${t}`;
    case Vn.TARGET:
      return `T${t}`;
    default:
      throw new Error(`Unknown Handler Role: ${e}`);
  }
}
function C2(e) {
  switch (e[0]) {
    case "S":
      return Vn.SOURCE;
    case "T":
      return Vn.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${e}`);
  }
}
function E2(e, t) {
  const n = e.entries();
  let r = !1;
  do {
    const {
      done: i,
      value: [, l],
    } = n.next();
    if (l === t) return !0;
    r = !!i;
  } while (!r);
  return !1;
}
class xI {
  addSource(t, n) {
    ug(t), gI(n);
    const r = this.addHandler(Vn.SOURCE, t, n);
    return this.store.dispatch(fI(r)), r;
  }
  addTarget(t, n) {
    ug(t, !0), mI(n);
    const r = this.addHandler(Vn.TARGET, t, n);
    return this.store.dispatch(dI(r)), r;
  }
  containsHandler(t) {
    return E2(this.dragSources, t) || E2(this.dropTargets, t);
  }
  getSource(t, n = !1) {
    return (
      Ee(this.isSourceId(t), "Expected a valid source ID."),
      n && t === this.pinnedSourceId
        ? this.pinnedSource
        : this.dragSources.get(t)
    );
  }
  getTarget(t) {
    return (
      Ee(this.isTargetId(t), "Expected a valid target ID."),
      this.dropTargets.get(t)
    );
  }
  getSourceType(t) {
    return (
      Ee(this.isSourceId(t), "Expected a valid source ID."), this.types.get(t)
    );
  }
  getTargetType(t) {
    return (
      Ee(this.isTargetId(t), "Expected a valid target ID."), this.types.get(t)
    );
  }
  isSourceId(t) {
    return C2(t) === Vn.SOURCE;
  }
  isTargetId(t) {
    return C2(t) === Vn.TARGET;
  }
  removeSource(t) {
    Ee(this.getSource(t), "Expected an existing source."),
      this.store.dispatch(pI(t)),
      cI(() => {
        this.dragSources.delete(t), this.types.delete(t);
      });
  }
  removeTarget(t) {
    Ee(this.getTarget(t), "Expected an existing target."),
      this.store.dispatch(hI(t)),
      this.dropTargets.delete(t),
      this.types.delete(t);
  }
  pinSource(t) {
    const n = this.getSource(t);
    Ee(n, "Expected an existing source."),
      (this.pinnedSourceId = t),
      (this.pinnedSource = n);
  }
  unpinSource() {
    Ee(this.pinnedSource, "No source is pinned at the time."),
      (this.pinnedSourceId = null),
      (this.pinnedSource = null);
  }
  addHandler(t, n, r) {
    const i = wI(t);
    return (
      this.types.set(i, n),
      t === Vn.SOURCE
        ? this.dragSources.set(i, r)
        : t === Vn.TARGET && this.dropTargets.set(i, r),
      i
    );
  }
  constructor(t) {
    (this.types = new Map()),
      (this.dragSources = new Map()),
      (this.dropTargets = new Map()),
      (this.pinnedSourceId = null),
      (this.pinnedSource = null),
      (this.store = t);
  }
}
const SI = (e, t) => e === t;
function CI(e, t) {
  return !e && !t ? !0 : !e || !t ? !1 : e.x === t.x && e.y === t.y;
}
function EI(e, t, n = SI) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; ++r) if (!n(e[r], t[r])) return !1;
  return !0;
}
function kI(e = Lu, t) {
  switch (t.type) {
    case bf:
      break;
    case B1:
    case H1:
    case Tf:
    case U1:
      return Lu;
    case kf:
    case $1:
    case Of:
    case _f:
    default:
      return z1;
  }
  const { targetIds: n = [], prevTargetIds: r = [] } = t.payload,
    i = TT(n, r);
  if (!(i.length > 0 || !EI(n, r))) return Lu;
  const s = r[r.length - 1],
    a = n[n.length - 1];
  return s !== a && (s && i.push(s), a && i.push(a)), i;
}
function bI(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function _I(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {},
      r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function (i) {
          return Object.getOwnPropertyDescriptor(n, i).enumerable;
        })
      )),
      r.forEach(function (i) {
        bI(e, i, n[i]);
      });
  }
  return e;
}
const k2 = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null,
};
function OI(e = k2, t) {
  const { payload: n } = t;
  switch (t.type) {
    case F1:
    case kf:
      return {
        initialSourceClientOffset: n.sourceClientOffset,
        initialClientOffset: n.clientOffset,
        clientOffset: n.clientOffset,
      };
    case bf:
      return CI(e.clientOffset, n.clientOffset)
        ? e
        : _I({}, e, { clientOffset: n.clientOffset });
    case Of:
    case _f:
      return k2;
    default:
      return e;
  }
}
function TI(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Yo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {},
      r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function (i) {
          return Object.getOwnPropertyDescriptor(n, i).enumerable;
        })
      )),
      r.forEach(function (i) {
        TI(e, i, n[i]);
      });
  }
  return e;
}
const II = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null,
};
function PI(e = II, t) {
  const { payload: n } = t;
  switch (t.type) {
    case kf:
      return Yo({}, e, {
        itemType: n.itemType,
        item: n.item,
        sourceId: n.sourceId,
        isSourcePublic: n.isSourcePublic,
        dropResult: null,
        didDrop: !1,
      });
    case $1:
      return Yo({}, e, { isSourcePublic: !0 });
    case bf:
      return Yo({}, e, { targetIds: n.targetIds });
    case Tf:
      return e.targetIds.indexOf(n.targetId) === -1
        ? e
        : Yo({}, e, { targetIds: OT(e.targetIds, n.targetId) });
    case _f:
      return Yo({}, e, {
        dropResult: n.dropResult,
        didDrop: !0,
        targetIds: [],
      });
    case Of:
      return Yo({}, e, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: !1,
        isSourcePublic: null,
        targetIds: [],
      });
    default:
      return e;
  }
}
function RI(e = 0, t) {
  switch (t.type) {
    case B1:
    case H1:
      return e + 1;
    case U1:
    case Tf:
      return e - 1;
    default:
      return e;
  }
}
function AI(e = 0) {
  return e + 1;
}
function DI(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function NI(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {},
      r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" &&
      (r = r.concat(
        Object.getOwnPropertySymbols(n).filter(function (i) {
          return Object.getOwnPropertyDescriptor(n, i).enumerable;
        })
      )),
      r.forEach(function (i) {
        DI(e, i, n[i]);
      });
  }
  return e;
}
function LI(e = {}, t) {
  return {
    dirtyHandlerIds: kI(e.dirtyHandlerIds, {
      type: t.type,
      payload: NI({}, t.payload, {
        prevTargetIds: _T(e, "dragOperation.targetIds", []),
      }),
    }),
    dragOffset: OI(e.dragOffset, t),
    refCount: RI(e.refCount, t),
    dragOperation: PI(e.dragOperation, t),
    stateId: AI(e.stateId),
  };
}
function MI(e, t = void 0, n = {}, r = !1) {
  const i = FI(r),
    l = new rI(i, new xI(i)),
    s = new ZT(i, l),
    a = e(s, t, n);
  return s.receiveBackend(a), s;
}
function FI(e) {
  const t = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return M1(LI, e && t && t({ name: "dnd-core", instanceId: "dnd-core" }));
}
function $I(e, t) {
  if (e == null) return {};
  var n = zI(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    for (i = 0; i < l.length; i++)
      (r = l[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function zI(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    l;
  for (l = 0; l < r.length; l++)
    (i = r[l]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
let b2 = 0;
const Ga = Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
var BI = A.memo(function (t) {
  var { children: n } = t,
    r = $I(t, ["children"]);
  const [i, l] = HI(r);
  return (
    A.useEffect(() => {
      if (l) {
        const s = P5();
        return (
          ++b2,
          () => {
            --b2 === 0 && (s[Ga] = null);
          }
        );
      }
    }, []),
    D(k5.Provider, { value: i, children: n })
  );
});
function HI(e) {
  if ("manager" in e) return [{ dragDropManager: e.manager }, !1];
  const t = UI(e.backend, e.context, e.options, e.debugMode),
    n = !e.context;
  return [t, n];
}
function UI(e, t = P5(), n, r) {
  const i = t;
  return i[Ga] || (i[Ga] = { dragDropManager: MI(e, t, n, r) }), i[Ga];
}
function P5() {
  return typeof global < "u" ? global : window;
}
var WI = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var r, i, l;
    if (Array.isArray(t)) {
      if (((r = t.length), r != n.length)) return !1;
      for (i = r; i-- !== 0; ) if (!e(t[i], n[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (((l = Object.keys(t)), (r = l.length), r !== Object.keys(n).length))
      return !1;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, l[i])) return !1;
    for (i = r; i-- !== 0; ) {
      var s = l[i];
      if (!e(t[s], n[s])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
};
const jI = Ui(WI),
  Oo = typeof window < "u" ? A.useLayoutEffect : A.useEffect;
function R5(e, t, n) {
  const [r, i] = A.useState(() => t(e)),
    l = A.useCallback(() => {
      const s = t(e);
      jI(r, s) || (i(s), n && n());
    }, [r, e, n]);
  return Oo(l), [r, l];
}
function VI(e, t, n) {
  const [r, i] = R5(e, t, n);
  return (
    Oo(
      function () {
        const s = e.getHandlerId();
        if (s != null) return e.subscribeToStateChange(i, { handlerIds: [s] });
      },
      [e, i]
    ),
    r
  );
}
function A5(e, t, n) {
  return VI(t, e || (() => ({})), () => n.reconnect());
}
function D5(e, t) {
  const n = [...(t || [])];
  return (
    t == null && typeof e != "function" && n.push(e),
    A.useMemo(() => (typeof e == "function" ? e() : e), n)
  );
}
function GI(e) {
  return A.useMemo(() => e.hooks.dragSource(), [e]);
}
function qI(e) {
  return A.useMemo(() => e.hooks.dragPreview(), [e]);
}
let Mp = !1,
  Fp = !1;
class KI {
  receiveHandlerId(t) {
    this.sourceId = t;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    Ee(
      !Mp,
      "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor"
    );
    try {
      return (Mp = !0), this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      Mp = !1;
    }
  }
  isDragging() {
    if (!this.sourceId) return !1;
    Ee(
      !Fp,
      "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor"
    );
    try {
      return (Fp = !0), this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      Fp = !1;
    }
  }
  subscribeToStateChange(t, n) {
    return this.internalMonitor.subscribeToStateChange(t, n);
  }
  isDraggingSource(t) {
    return this.internalMonitor.isDraggingSource(t);
  }
  isOverTarget(t, n) {
    return this.internalMonitor.isOverTarget(t, n);
  }
  getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }
  isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }
  getSourceId() {
    return this.internalMonitor.getSourceId();
  }
  subscribeToOffsetChange(t) {
    return this.internalMonitor.subscribeToOffsetChange(t);
  }
  canDragSource(t) {
    return this.internalMonitor.canDragSource(t);
  }
  canDropOnTarget(t) {
    return this.internalMonitor.canDropOnTarget(t);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(t) {
    (this.sourceId = null), (this.internalMonitor = t.getMonitor());
  }
}
let $p = !1;
class QI {
  receiveHandlerId(t) {
    this.targetId = t;
  }
  getHandlerId() {
    return this.targetId;
  }
  subscribeToStateChange(t, n) {
    return this.internalMonitor.subscribeToStateChange(t, n);
  }
  canDrop() {
    if (!this.targetId) return !1;
    Ee(
      !$p,
      "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor"
    );
    try {
      return ($p = !0), this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      $p = !1;
    }
  }
  isOver(t) {
    return this.targetId
      ? this.internalMonitor.isOverTarget(this.targetId, t)
      : !1;
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(t) {
    (this.targetId = null), (this.internalMonitor = t.getMonitor());
  }
}
function YI(e, t, n) {
  const r = n.getRegistry(),
    i = r.addTarget(e, t);
  return [i, () => r.removeTarget(i)];
}
function XI(e, t, n) {
  const r = n.getRegistry(),
    i = r.addSource(e, t);
  return [i, () => r.removeSource(i)];
}
function sg(e, t, n, r) {
  let i = n ? n.call(r, e, t) : void 0;
  if (i !== void 0) return !!i;
  if (e === t) return !0;
  if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
  const l = Object.keys(e),
    s = Object.keys(t);
  if (l.length !== s.length) return !1;
  const a = Object.prototype.hasOwnProperty.bind(t);
  for (let f = 0; f < l.length; f++) {
    const d = l[f];
    if (!a(d)) return !1;
    const p = e[d],
      g = t[d];
    if (
      ((i = n ? n.call(r, p, g, d) : void 0),
      i === !1 || (i === void 0 && p !== g))
    )
      return !1;
  }
  return !0;
}
function ag(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function ZI(e) {
  if (typeof e.type == "string") return;
  const t = e.type.displayName || e.type.name || "the component";
  throw new Error(
    `Only native element nodes can now be passed to React DnD connectors.You can either wrap ${t} into a <div>, or turn it into a drag source or a drop target itself.`
  );
}
function JI(e) {
  return (t = null, n = null) => {
    if (!A.isValidElement(t)) {
      const l = t;
      return e(l, n), l;
    }
    const r = t;
    return ZI(r), eP(r, n ? (l) => e(l, n) : e);
  };
}
function N5(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      const r = e[n];
      if (n.endsWith("Ref")) t[n] = e[n];
      else {
        const i = JI(r);
        t[n] = () => i;
      }
    }),
    t
  );
}
function _2(e, t) {
  typeof e == "function" ? e(t) : (e.current = t);
}
function eP(e, t) {
  const n = e.ref;
  return (
    Ee(
      typeof n != "string",
      "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"
    ),
    n
      ? A.cloneElement(e, {
          ref: (r) => {
            _2(n, r), _2(t, r);
          },
        })
      : A.cloneElement(e, { ref: t })
  );
}
class tP {
  receiveHandlerId(t) {
    this.handlerId !== t && ((this.handlerId = t), this.reconnect());
  }
  get connectTarget() {
    return this.dragSource;
  }
  get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  }
  set dragSourceOptions(t) {
    this.dragSourceOptionsInternal = t;
  }
  get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  }
  set dragPreviewOptions(t) {
    this.dragPreviewOptionsInternal = t;
  }
  reconnect() {
    const t = this.reconnectDragSource();
    this.reconnectDragPreview(t);
  }
  reconnectDragSource() {
    const t = this.dragSource,
      n =
        this.didHandlerIdChange() ||
        this.didConnectedDragSourceChange() ||
        this.didDragSourceOptionsChange();
    return (
      n && this.disconnectDragSource(),
      this.handlerId
        ? t
          ? (n &&
              ((this.lastConnectedHandlerId = this.handlerId),
              (this.lastConnectedDragSource = t),
              (this.lastConnectedDragSourceOptions = this.dragSourceOptions),
              (this.dragSourceUnsubscribe = this.backend.connectDragSource(
                this.handlerId,
                t,
                this.dragSourceOptions
              ))),
            n)
          : ((this.lastConnectedDragSource = t), n)
        : n
    );
  }
  reconnectDragPreview(t = !1) {
    const n = this.dragPreview,
      r =
        t ||
        this.didHandlerIdChange() ||
        this.didConnectedDragPreviewChange() ||
        this.didDragPreviewOptionsChange();
    if ((r && this.disconnectDragPreview(), !!this.handlerId)) {
      if (!n) {
        this.lastConnectedDragPreview = n;
        return;
      }
      r &&
        ((this.lastConnectedHandlerId = this.handlerId),
        (this.lastConnectedDragPreview = n),
        (this.lastConnectedDragPreviewOptions = this.dragPreviewOptions),
        (this.dragPreviewUnsubscribe = this.backend.connectDragPreview(
          this.handlerId,
          n,
          this.dragPreviewOptions
        )));
    }
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didConnectedDragSourceChange() {
    return this.lastConnectedDragSource !== this.dragSource;
  }
  didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }
  didDragSourceOptionsChange() {
    return !sg(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !sg(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }
  disconnectDragSource() {
    this.dragSourceUnsubscribe &&
      (this.dragSourceUnsubscribe(), (this.dragSourceUnsubscribe = void 0));
  }
  disconnectDragPreview() {
    this.dragPreviewUnsubscribe &&
      (this.dragPreviewUnsubscribe(),
      (this.dragPreviewUnsubscribe = void 0),
      (this.dragPreviewNode = null),
      (this.dragPreviewRef = null));
  }
  get dragSource() {
    return (
      this.dragSourceNode || (this.dragSourceRef && this.dragSourceRef.current)
    );
  }
  get dragPreview() {
    return (
      this.dragPreviewNode ||
      (this.dragPreviewRef && this.dragPreviewRef.current)
    );
  }
  clearDragSource() {
    (this.dragSourceNode = null), (this.dragSourceRef = null);
  }
  clearDragPreview() {
    (this.dragPreviewNode = null), (this.dragPreviewRef = null);
  }
  constructor(t) {
    (this.hooks = N5({
      dragSource: (n, r) => {
        this.clearDragSource(),
          (this.dragSourceOptions = r || null),
          ag(n) ? (this.dragSourceRef = n) : (this.dragSourceNode = n),
          this.reconnectDragSource();
      },
      dragPreview: (n, r) => {
        this.clearDragPreview(),
          (this.dragPreviewOptions = r || null),
          ag(n) ? (this.dragPreviewRef = n) : (this.dragPreviewNode = n),
          this.reconnectDragPreview();
      },
    })),
      (this.handlerId = null),
      (this.dragSourceRef = null),
      (this.dragSourceOptionsInternal = null),
      (this.dragPreviewRef = null),
      (this.dragPreviewOptionsInternal = null),
      (this.lastConnectedHandlerId = null),
      (this.lastConnectedDragSource = null),
      (this.lastConnectedDragSourceOptions = null),
      (this.lastConnectedDragPreview = null),
      (this.lastConnectedDragPreviewOptions = null),
      (this.backend = t);
  }
}
class nP {
  get connectTarget() {
    return this.dropTarget;
  }
  reconnect() {
    const t =
      this.didHandlerIdChange() ||
      this.didDropTargetChange() ||
      this.didOptionsChange();
    t && this.disconnectDropTarget();
    const n = this.dropTarget;
    if (this.handlerId) {
      if (!n) {
        this.lastConnectedDropTarget = n;
        return;
      }
      t &&
        ((this.lastConnectedHandlerId = this.handlerId),
        (this.lastConnectedDropTarget = n),
        (this.lastConnectedDropTargetOptions = this.dropTargetOptions),
        (this.unsubscribeDropTarget = this.backend.connectDropTarget(
          this.handlerId,
          n,
          this.dropTargetOptions
        )));
    }
  }
  receiveHandlerId(t) {
    t !== this.handlerId && ((this.handlerId = t), this.reconnect());
  }
  get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  }
  set dropTargetOptions(t) {
    this.dropTargetOptionsInternal = t;
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didDropTargetChange() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }
  didOptionsChange() {
    return !sg(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }
  disconnectDropTarget() {
    this.unsubscribeDropTarget &&
      (this.unsubscribeDropTarget(), (this.unsubscribeDropTarget = void 0));
  }
  get dropTarget() {
    return (
      this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current)
    );
  }
  clearDropTarget() {
    (this.dropTargetRef = null), (this.dropTargetNode = null);
  }
  constructor(t) {
    (this.hooks = N5({
      dropTarget: (n, r) => {
        this.clearDropTarget(),
          (this.dropTargetOptions = r),
          ag(n) ? (this.dropTargetRef = n) : (this.dropTargetNode = n),
          this.reconnect();
      },
    })),
      (this.handlerId = null),
      (this.dropTargetRef = null),
      (this.dropTargetOptionsInternal = null),
      (this.lastConnectedHandlerId = null),
      (this.lastConnectedDropTarget = null),
      (this.lastConnectedDropTargetOptions = null),
      (this.backend = t);
  }
}
function ti() {
  const { dragDropManager: e } = A.useContext(k5);
  return Ee(e != null, "Expected drag drop context"), e;
}
function rP(e, t) {
  const n = ti(),
    r = A.useMemo(() => new tP(n.getBackend()), [n]);
  return (
    Oo(
      () => (
        (r.dragSourceOptions = e || null),
        r.reconnect(),
        () => r.disconnectDragSource()
      ),
      [r, e]
    ),
    Oo(
      () => (
        (r.dragPreviewOptions = t || null),
        r.reconnect(),
        () => r.disconnectDragPreview()
      ),
      [r, t]
    ),
    r
  );
}
function iP() {
  const e = ti();
  return A.useMemo(() => new KI(e), [e]);
}
class oP {
  beginDrag() {
    const t = this.spec,
      n = this.monitor;
    let r = null;
    return (
      typeof t.item == "object"
        ? (r = t.item)
        : typeof t.item == "function"
        ? (r = t.item(n))
        : (r = {}),
      r ?? null
    );
  }
  canDrag() {
    const t = this.spec,
      n = this.monitor;
    return typeof t.canDrag == "boolean"
      ? t.canDrag
      : typeof t.canDrag == "function"
      ? t.canDrag(n)
      : !0;
  }
  isDragging(t, n) {
    const r = this.spec,
      i = this.monitor,
      { isDragging: l } = r;
    return l ? l(i) : n === t.getSourceId();
  }
  endDrag() {
    const t = this.spec,
      n = this.monitor,
      r = this.connector,
      { end: i } = t;
    i && i(n.getItem(), n), r.reconnect();
  }
  constructor(t, n, r) {
    (this.spec = t), (this.monitor = n), (this.connector = r);
  }
}
function lP(e, t, n) {
  const r = A.useMemo(() => new oP(e, t, n), [t, n]);
  return (
    A.useEffect(() => {
      r.spec = e;
    }, [e]),
    r
  );
}
function uP(e) {
  return A.useMemo(() => {
    const t = e.type;
    return Ee(t != null, "spec.type must be defined"), t;
  }, [e]);
}
function sP(e, t, n) {
  const r = ti(),
    i = lP(e, t, n),
    l = uP(e);
  Oo(
    function () {
      if (l != null) {
        const [a, f] = XI(l, i, r);
        return t.receiveHandlerId(a), n.receiveHandlerId(a), f;
      }
    },
    [r, t, n, i, l]
  );
}
function aP(e, t) {
  const n = D5(e, t);
  Ee(
    !n.begin,
    "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)"
  );
  const r = iP(),
    i = rP(n.options, n.previewOptions);
  return sP(n, r, i), [A5(n.collect, r, i), GI(i), qI(i)];
}
function cP(e) {
  const n = ti().getMonitor(),
    [r, i] = R5(n, e);
  return (
    A.useEffect(() => n.subscribeToOffsetChange(i)),
    A.useEffect(() => n.subscribeToStateChange(i)),
    r
  );
}
function fP(e) {
  return A.useMemo(() => e.hooks.dropTarget(), [e]);
}
function dP(e) {
  const t = ti(),
    n = A.useMemo(() => new nP(t.getBackend()), [t]);
  return (
    Oo(
      () => (
        (n.dropTargetOptions = e || null),
        n.reconnect(),
        () => n.disconnectDropTarget()
      ),
      [e]
    ),
    n
  );
}
function pP() {
  const e = ti();
  return A.useMemo(() => new QI(e), [e]);
}
function hP(e) {
  const { accept: t } = e;
  return A.useMemo(
    () => (
      Ee(e.accept != null, "accept must be defined"), Array.isArray(t) ? t : [t]
    ),
    [t]
  );
}
class gP {
  canDrop() {
    const t = this.spec,
      n = this.monitor;
    return t.canDrop ? t.canDrop(n.getItem(), n) : !0;
  }
  hover() {
    const t = this.spec,
      n = this.monitor;
    t.hover && t.hover(n.getItem(), n);
  }
  drop() {
    const t = this.spec,
      n = this.monitor;
    if (t.drop) return t.drop(n.getItem(), n);
  }
  constructor(t, n) {
    (this.spec = t), (this.monitor = n);
  }
}
function mP(e, t) {
  const n = A.useMemo(() => new gP(e, t), [t]);
  return (
    A.useEffect(() => {
      n.spec = e;
    }, [e]),
    n
  );
}
function vP(e, t, n) {
  const r = ti(),
    i = mP(e, t),
    l = hP(e);
  Oo(
    function () {
      const [a, f] = YI(l, i, r);
      return t.receiveHandlerId(a), n.receiveHandlerId(a), f;
    },
    [r, t, i, n, l.map((s) => s.toString()).join("|")]
  );
}
function cg(e, t) {
  const n = D5(e, t),
    r = pP(),
    i = dP(n.options);
  return vP(n, r, i), [A5(n.collect, r, i), fP(i)];
}
var Ni;
(function (e) {
  (e.mouse = "mouse"), (e.touch = "touch"), (e.keyboard = "keyboard");
})(Ni || (Ni = {}));
class yP {
  get delay() {
    var t;
    return (t = this.args.delay) !== null && t !== void 0 ? t : 0;
  }
  get scrollAngleRanges() {
    return this.args.scrollAngleRanges;
  }
  get getDropTargetElementsAtPoint() {
    return this.args.getDropTargetElementsAtPoint;
  }
  get ignoreContextMenu() {
    var t;
    return (t = this.args.ignoreContextMenu) !== null && t !== void 0 ? t : !1;
  }
  get enableHoverOutsideTarget() {
    var t;
    return (t = this.args.enableHoverOutsideTarget) !== null && t !== void 0
      ? t
      : !1;
  }
  get enableKeyboardEvents() {
    var t;
    return (t = this.args.enableKeyboardEvents) !== null && t !== void 0
      ? t
      : !1;
  }
  get enableMouseEvents() {
    var t;
    return (t = this.args.enableMouseEvents) !== null && t !== void 0 ? t : !1;
  }
  get enableTouchEvents() {
    var t;
    return (t = this.args.enableTouchEvents) !== null && t !== void 0 ? t : !0;
  }
  get touchSlop() {
    return this.args.touchSlop || 0;
  }
  get delayTouchStart() {
    var t, n, r, i;
    return (i =
      (r =
        (t = this.args) === null || t === void 0
          ? void 0
          : t.delayTouchStart) !== null && r !== void 0
        ? r
        : (n = this.args) === null || n === void 0
        ? void 0
        : n.delay) !== null && i !== void 0
      ? i
      : 0;
  }
  get delayMouseStart() {
    var t, n, r, i;
    return (i =
      (r =
        (t = this.args) === null || t === void 0
          ? void 0
          : t.delayMouseStart) !== null && r !== void 0
        ? r
        : (n = this.args) === null || n === void 0
        ? void 0
        : n.delay) !== null && i !== void 0
      ? i
      : 0;
  }
  get window() {
    if (this.context && this.context.window) return this.context.window;
    if (typeof window < "u") return window;
  }
  get document() {
    var t;
    if (!((t = this.context) === null || t === void 0) && t.document)
      return this.context.document;
    if (this.window) return this.window.document;
  }
  get rootElement() {
    var t;
    return (
      ((t = this.args) === null || t === void 0 ? void 0 : t.rootElement) ||
      this.document
    );
  }
  constructor(t, n) {
    (this.args = t), (this.context = n);
  }
}
function wP(e, t, n, r) {
  return Math.sqrt(Math.pow(Math.abs(n - e), 2) + Math.pow(Math.abs(r - t), 2));
}
function xP(e, t, n, r, i) {
  if (!i) return !1;
  const l = (Math.atan2(r - t, n - e) * 180) / Math.PI + 180;
  for (let s = 0; s < i.length; ++s) {
    const a = i[s];
    if (a && (a.start == null || l >= a.start) && (a.end == null || l <= a.end))
      return !0;
  }
  return !1;
}
const SP = { Left: 1, Right: 2, Center: 4 },
  CP = { Left: 0, Center: 1, Right: 2 };
function zp(e) {
  return e.button === void 0 || e.button === CP.Left;
}
function EP(e) {
  return e.buttons === void 0 || (e.buttons & SP.Left) === 0;
}
function L5(e) {
  return !!e.targetTouches;
}
const kP = 1;
function bP(e) {
  const t = e.nodeType === kP ? e : e.parentElement;
  if (!t) return;
  const { top: n, left: r } = t.getBoundingClientRect();
  return { x: r, y: n };
}
function _P(e, t) {
  if (e.targetTouches.length === 1) return bc(e.targetTouches[0]);
  if (t && e.touches.length === 1 && e.touches[0].target === t.target)
    return bc(e.touches[0]);
}
function bc(e, t) {
  return L5(e) ? _P(e, t) : { x: e.clientX, y: e.clientY };
}
const O2 = (() => {
    let e = !1;
    try {
      addEventListener(
        "test",
        () => {},
        Object.defineProperty({}, "passive", {
          get() {
            return (e = !0), !0;
          },
        })
      );
    } catch {}
    return e;
  })(),
  vu = {
    [Ni.mouse]: {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      contextmenu: "contextmenu",
    },
    [Ni.touch]: { start: "touchstart", move: "touchmove", end: "touchend" },
    [Ni.keyboard]: { keydown: "keydown" },
  };
class Mu {
  profile() {
    var t;
    return {
      sourceNodes: this.sourceNodes.size,
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      targetNodes: this.targetNodes.size,
      dragOverTargetIds:
        ((t = this.dragOverTargetIds) === null || t === void 0
          ? void 0
          : t.length) || 0,
    };
  }
  get document() {
    return this.options.document;
  }
  setup() {
    const t = this.options.rootElement;
    t &&
      (Ee(!Mu.isSetUp, "Cannot have two Touch backends at the same time."),
      (Mu.isSetUp = !0),
      this.addEventListener(t, "start", this.getTopMoveStartHandler()),
      this.addEventListener(t, "start", this.handleTopMoveStartCapture, !0),
      this.addEventListener(t, "move", this.handleTopMove),
      this.addEventListener(t, "move", this.handleTopMoveCapture, !0),
      this.addEventListener(t, "end", this.handleTopMoveEndCapture, !0),
      this.options.enableMouseEvents &&
        !this.options.ignoreContextMenu &&
        this.addEventListener(t, "contextmenu", this.handleTopMoveEndCapture),
      this.options.enableKeyboardEvents &&
        this.addEventListener(t, "keydown", this.handleCancelOnEscape, !0));
  }
  teardown() {
    const t = this.options.rootElement;
    t &&
      ((Mu.isSetUp = !1),
      (this._mouseClientOffset = {}),
      this.removeEventListener(t, "start", this.handleTopMoveStartCapture, !0),
      this.removeEventListener(t, "start", this.handleTopMoveStart),
      this.removeEventListener(t, "move", this.handleTopMoveCapture, !0),
      this.removeEventListener(t, "move", this.handleTopMove),
      this.removeEventListener(t, "end", this.handleTopMoveEndCapture, !0),
      this.options.enableMouseEvents &&
        !this.options.ignoreContextMenu &&
        this.removeEventListener(
          t,
          "contextmenu",
          this.handleTopMoveEndCapture
        ),
      this.options.enableKeyboardEvents &&
        this.removeEventListener(t, "keydown", this.handleCancelOnEscape, !0),
      this.uninstallSourceNodeRemovalObserver());
  }
  addEventListener(t, n, r, i = !1) {
    const l = O2 ? { capture: i, passive: !1 } : i;
    this.listenerTypes.forEach(function (s) {
      const a = vu[s][n];
      a && t.addEventListener(a, r, l);
    });
  }
  removeEventListener(t, n, r, i = !1) {
    const l = O2 ? { capture: i, passive: !1 } : i;
    this.listenerTypes.forEach(function (s) {
      const a = vu[s][n];
      a && t.removeEventListener(a, r, l);
    });
  }
  connectDragSource(t, n) {
    const r = this.handleMoveStart.bind(this, t);
    return (
      this.sourceNodes.set(t, n),
      this.addEventListener(n, "start", r),
      () => {
        this.sourceNodes.delete(t), this.removeEventListener(n, "start", r);
      }
    );
  }
  connectDragPreview(t, n, r) {
    return (
      this.sourcePreviewNodeOptions.set(t, r),
      this.sourcePreviewNodes.set(t, n),
      () => {
        this.sourcePreviewNodes.delete(t),
          this.sourcePreviewNodeOptions.delete(t);
      }
    );
  }
  connectDropTarget(t, n) {
    const r = this.options.rootElement;
    if (!this.document || !r) return () => {};
    const i = (l) => {
      if (!this.document || !r || !this.monitor.isDragging()) return;
      let s;
      switch (l.type) {
        case vu.mouse.move:
          s = { x: l.clientX, y: l.clientY };
          break;
        case vu.touch.move:
          var a, f;
          s = {
            x:
              ((a = l.touches[0]) === null || a === void 0
                ? void 0
                : a.clientX) || 0,
            y:
              ((f = l.touches[0]) === null || f === void 0
                ? void 0
                : f.clientY) || 0,
          };
          break;
      }
      const d = s != null ? this.document.elementFromPoint(s.x, s.y) : void 0,
        p = d && n.contains(d);
      if (d === n || p) return this.handleMove(l, t);
    };
    return (
      this.addEventListener(this.document.body, "move", i),
      this.targetNodes.set(t, n),
      () => {
        this.document &&
          (this.targetNodes.delete(t),
          this.removeEventListener(this.document.body, "move", i));
      }
    );
  }
  getTopMoveStartHandler() {
    return !this.options.delayTouchStart && !this.options.delayMouseStart
      ? this.handleTopMoveStart
      : this.handleTopMoveStartDelay;
  }
  installSourceNodeRemovalObserver(t) {
    this.uninstallSourceNodeRemovalObserver(),
      (this.draggedSourceNode = t),
      (this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
        t &&
          !t.parentElement &&
          (this.resurrectSourceNode(),
          this.uninstallSourceNodeRemovalObserver());
      })),
      !(!t || !t.parentElement) &&
        this.draggedSourceNodeRemovalObserver.observe(t.parentElement, {
          childList: !0,
        });
  }
  resurrectSourceNode() {
    this.document &&
      this.draggedSourceNode &&
      ((this.draggedSourceNode.style.display = "none"),
      this.draggedSourceNode.removeAttribute("data-reactid"),
      this.document.body.appendChild(this.draggedSourceNode));
  }
  uninstallSourceNodeRemovalObserver() {
    this.draggedSourceNodeRemovalObserver &&
      this.draggedSourceNodeRemovalObserver.disconnect(),
      (this.draggedSourceNodeRemovalObserver = void 0),
      (this.draggedSourceNode = void 0);
  }
  constructor(t, n, r) {
    (this.getSourceClientOffset = (i) => {
      const l = this.sourceNodes.get(i);
      return l && bP(l);
    }),
      (this.handleTopMoveStartCapture = (i) => {
        zp(i) && (this.moveStartSourceIds = []);
      }),
      (this.handleMoveStart = (i) => {
        Array.isArray(this.moveStartSourceIds) &&
          this.moveStartSourceIds.unshift(i);
      }),
      (this.handleTopMoveStart = (i) => {
        if (!zp(i)) return;
        const l = bc(i);
        l &&
          (L5(i) && (this.lastTargetTouchFallback = i.targetTouches[0]),
          (this._mouseClientOffset = l)),
          (this.waitingForDelay = !1);
      }),
      (this.handleTopMoveStartDelay = (i) => {
        if (!zp(i)) return;
        const l =
          i.type === vu.touch.start
            ? this.options.delayTouchStart
            : this.options.delayMouseStart;
        (this.timeout = setTimeout(this.handleTopMoveStart.bind(this, i), l)),
          (this.waitingForDelay = !0);
      }),
      (this.handleTopMoveCapture = () => {
        this.dragOverTargetIds = [];
      }),
      (this.handleMove = (i, l) => {
        this.dragOverTargetIds && this.dragOverTargetIds.unshift(l);
      }),
      (this.handleTopMove = (i) => {
        if (
          (this.timeout && clearTimeout(this.timeout),
          !this.document || this.waitingForDelay)
        )
          return;
        const { moveStartSourceIds: l, dragOverTargetIds: s } = this,
          a = this.options.enableHoverOutsideTarget,
          f = bc(i, this.lastTargetTouchFallback);
        if (!f) return;
        if (
          this._isScrolling ||
          (!this.monitor.isDragging() &&
            xP(
              this._mouseClientOffset.x || 0,
              this._mouseClientOffset.y || 0,
              f.x,
              f.y,
              this.options.scrollAngleRanges
            ))
        ) {
          this._isScrolling = !0;
          return;
        }
        if (
          (!this.monitor.isDragging() &&
            this._mouseClientOffset.hasOwnProperty("x") &&
            l &&
            wP(
              this._mouseClientOffset.x || 0,
              this._mouseClientOffset.y || 0,
              f.x,
              f.y
            ) > (this.options.touchSlop ? this.options.touchSlop : 0) &&
            ((this.moveStartSourceIds = void 0),
            this.actions.beginDrag(l, {
              clientOffset: this._mouseClientOffset,
              getSourceClientOffset: this.getSourceClientOffset,
              publishSource: !1,
            })),
          !this.monitor.isDragging())
        )
          return;
        const d = this.sourceNodes.get(this.monitor.getSourceId());
        this.installSourceNodeRemovalObserver(d),
          this.actions.publishDragSource(),
          i.cancelable && i.preventDefault();
        const p = (s || [])
            .map((E) => this.targetNodes.get(E))
            .filter((E) => !!E),
          g = this.options.getDropTargetElementsAtPoint
            ? this.options.getDropTargetElementsAtPoint(f.x, f.y, p)
            : this.document.elementsFromPoint(f.x, f.y),
          v = [];
        for (const E in g) {
          if (!g.hasOwnProperty(E)) continue;
          let S = g[E];
          for (S != null && v.push(S); S; )
            (S = S.parentElement), S && v.indexOf(S) === -1 && v.push(S);
        }
        const m = v
          .filter((E) => p.indexOf(E) > -1)
          .map((E) => this._getDropTargetId(E))
          .filter((E) => !!E)
          .filter((E, S, N) => N.indexOf(E) === S);
        if (a)
          for (const E in this.targetNodes) {
            const S = this.targetNodes.get(E);
            if (d && S && S.contains(d) && m.indexOf(E) === -1) {
              m.unshift(E);
              break;
            }
          }
        m.reverse(), this.actions.hover(m, { clientOffset: f });
      }),
      (this._getDropTargetId = (i) => {
        const l = this.targetNodes.keys();
        let s = l.next();
        for (; s.done === !1; ) {
          const a = s.value;
          if (i === this.targetNodes.get(a)) return a;
          s = l.next();
        }
      }),
      (this.handleTopMoveEndCapture = (i) => {
        if (
          ((this._isScrolling = !1),
          (this.lastTargetTouchFallback = void 0),
          !!EP(i))
        ) {
          if (!this.monitor.isDragging() || this.monitor.didDrop()) {
            this.moveStartSourceIds = void 0;
            return;
          }
          i.cancelable && i.preventDefault(),
            (this._mouseClientOffset = {}),
            this.uninstallSourceNodeRemovalObserver(),
            this.actions.drop(),
            this.actions.endDrag();
        }
      }),
      (this.handleCancelOnEscape = (i) => {
        i.key === "Escape" &&
          this.monitor.isDragging() &&
          ((this._mouseClientOffset = {}),
          this.uninstallSourceNodeRemovalObserver(),
          this.actions.endDrag());
      }),
      (this.options = new yP(r, n)),
      (this.actions = t.getActions()),
      (this.monitor = t.getMonitor()),
      (this.sourceNodes = new Map()),
      (this.sourcePreviewNodes = new Map()),
      (this.sourcePreviewNodeOptions = new Map()),
      (this.targetNodes = new Map()),
      (this.listenerTypes = []),
      (this._mouseClientOffset = {}),
      (this._isScrolling = !1),
      this.options.enableMouseEvents && this.listenerTypes.push(Ni.mouse),
      this.options.enableTouchEvents && this.listenerTypes.push(Ni.touch),
      this.options.enableKeyboardEvents && this.listenerTypes.push(Ni.keyboard);
  }
}
const OP = function (t, n = {}, r = {}) {
  return new Mu(t, n, r);
};
function fr(e) {
  for (
    var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  throw Error(
    "[Immer] minified error nr: " +
      e +
      (n.length
        ? " " +
          n
            .map(function (i) {
              return "'" + i + "'";
            })
            .join(",")
        : "") +
      ". Find the full error at: https://bit.ly/3cXEKWf"
  );
}
function Bi(e) {
  return !!e && !!e[it];
}
function Jr(e) {
  var t;
  return (
    !!e &&
    ((function (n) {
      if (!n || typeof n != "object") return !1;
      var r = Object.getPrototypeOf(n);
      if (r === null) return !0;
      var i = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return (
        i === Object ||
        (typeof i == "function" && Function.toString.call(i) === LP)
      );
    })(e) ||
      Array.isArray(e) ||
      !!e[N2] ||
      !!(!((t = e.constructor) === null || t === void 0) && t[N2]) ||
      W1(e) ||
      j1(e))
  );
}
function To(e, t, n) {
  n === void 0 && (n = !1),
    Hl(e) === 0
      ? (n ? Object.keys : Sl)(e).forEach(function (r) {
          (n && typeof r == "symbol") || t(r, e[r], e);
        })
      : e.forEach(function (r, i) {
          return t(i, r, e);
        });
}
function Hl(e) {
  var t = e[it];
  return t
    ? t.i > 3
      ? t.i - 4
      : t.i
    : Array.isArray(e)
    ? 1
    : W1(e)
    ? 2
    : j1(e)
    ? 3
    : 0;
}
function xl(e, t) {
  return Hl(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function TP(e, t) {
  return Hl(e) === 2 ? e.get(t) : e[t];
}
function M5(e, t, n) {
  var r = Hl(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function F5(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function W1(e) {
  return DP && e instanceof Map;
}
function j1(e) {
  return NP && e instanceof Set;
}
function ao(e) {
  return e.o || e.t;
}
function V1(e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  var t = z5(e);
  delete t[it];
  for (var n = Sl(t), r = 0; r < n.length; r++) {
    var i = n[r],
      l = t[i];
    l.writable === !1 && ((l.writable = !0), (l.configurable = !0)),
      (l.get || l.set) &&
        (t[i] = {
          configurable: !0,
          writable: !0,
          enumerable: l.enumerable,
          value: e[i],
        });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function G1(e, t) {
  return (
    t === void 0 && (t = !1),
    q1(e) ||
      Bi(e) ||
      !Jr(e) ||
      (Hl(e) > 1 && (e.set = e.add = e.clear = e.delete = IP),
      Object.freeze(e),
      t &&
        To(
          e,
          function (n, r) {
            return G1(r, !0);
          },
          !0
        )),
    e
  );
}
function IP() {
  fr(2);
}
function q1(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function Tr(e) {
  var t = gg[e];
  return t || fr(18, e), t;
}
function PP(e, t) {
  gg[e] || (gg[e] = t);
}
function fg() {
  return us;
}
function Bp(e, t) {
  t && (Tr("Patches"), (e.u = []), (e.s = []), (e.v = t));
}
function _c(e) {
  dg(e), e.p.forEach(RP), (e.p = null);
}
function dg(e) {
  e === us && (us = e.l);
}
function T2(e) {
  return (us = { p: [], l: us, h: e, m: !0, _: 0 });
}
function RP(e) {
  var t = e[it];
  t.i === 0 || t.i === 1 ? t.j() : (t.g = !0);
}
function Hp(e, t) {
  t._ = t.p.length;
  var n = t.p[0],
    r = e !== void 0 && e !== n;
  return (
    t.h.O || Tr("ES5").S(t, e, r),
    r
      ? (n[it].P && (_c(t), fr(4)),
        Jr(e) && ((e = Oc(t, e)), t.l || Tc(t, e)),
        t.u && Tr("Patches").M(n[it].t, e, t.u, t.s))
      : (e = Oc(t, n, [])),
    _c(t),
    t.u && t.v(t.u, t.s),
    e !== $5 ? e : void 0
  );
}
function Oc(e, t, n) {
  if (q1(t)) return t;
  var r = t[it];
  if (!r)
    return (
      To(
        t,
        function (a, f) {
          return I2(e, r, t, a, f, n);
        },
        !0
      ),
      t
    );
  if (r.A !== e) return t;
  if (!r.P) return Tc(e, r.t, !0), r.t;
  if (!r.I) {
    (r.I = !0), r.A._--;
    var i = r.i === 4 || r.i === 5 ? (r.o = V1(r.k)) : r.o,
      l = i,
      s = !1;
    r.i === 3 && ((l = new Set(i)), i.clear(), (s = !0)),
      To(l, function (a, f) {
        return I2(e, r, i, a, f, n, s);
      }),
      Tc(e, i, !1),
      n && e.u && Tr("Patches").N(r, n, e.u, e.s);
  }
  return r.o;
}
function I2(e, t, n, r, i, l, s) {
  if (Bi(i)) {
    var a = Oc(e, i, l && t && t.i !== 3 && !xl(t.R, r) ? l.concat(r) : void 0);
    if ((M5(n, r, a), !Bi(a))) return;
    e.m = !1;
  } else s && n.add(i);
  if (Jr(i) && !q1(i)) {
    if (!e.h.D && e._ < 1) return;
    Oc(e, i), (t && t.A.l) || Tc(e, i);
  }
}
function Tc(e, t, n) {
  n === void 0 && (n = !1), !e.l && e.h.D && e.m && G1(t, n);
}
function Up(e, t) {
  var n = e[it];
  return (n ? ao(n) : e)[t];
}
function P2(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n; ) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r) return r;
      n = Object.getPrototypeOf(n);
    }
}
function Ci(e) {
  e.P || ((e.P = !0), e.l && Ci(e.l));
}
function Wp(e) {
  e.o || (e.o = V1(e.t));
}
function pg(e, t, n) {
  var r = W1(t)
    ? Tr("MapSet").F(t, n)
    : j1(t)
    ? Tr("MapSet").T(t, n)
    : e.O
    ? (function (i, l) {
        var s = Array.isArray(i),
          a = {
            i: s ? 1 : 0,
            A: l ? l.A : fg(),
            P: !1,
            I: !1,
            R: {},
            l,
            t: i,
            k: null,
            o: null,
            j: null,
            C: !1,
          },
          f = a,
          d = ss;
        s && ((f = [a]), (d = Eu));
        var p = Proxy.revocable(f, d),
          g = p.revoke,
          v = p.proxy;
        return (a.k = v), (a.j = g), v;
      })(t, n)
    : Tr("ES5").J(t, n);
  return (n ? n.A : fg()).p.push(r), r;
}
function hg(e) {
  return (
    Bi(e) || fr(22, e),
    (function t(n) {
      if (!Jr(n)) return n;
      var r,
        i = n[it],
        l = Hl(n);
      if (i) {
        if (!i.P && (i.i < 4 || !Tr("ES5").K(i))) return i.t;
        (i.I = !0), (r = R2(n, l)), (i.I = !1);
      } else r = R2(n, l);
      return (
        To(r, function (s, a) {
          (i && TP(i.t, s) === a) || M5(r, s, t(a));
        }),
        l === 3 ? new Set(r) : r
      );
    })(e)
  );
}
function R2(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return V1(e);
}
function AP() {
  function e(l, s) {
    var a = i[l];
    return (
      a
        ? (a.enumerable = s)
        : (i[l] = a =
            {
              configurable: !0,
              enumerable: s,
              get: function () {
                var f = this[it];
                return ss.get(f, l);
              },
              set: function (f) {
                var d = this[it];
                ss.set(d, l, f);
              },
            }),
      a
    );
  }
  function t(l) {
    for (var s = l.length - 1; s >= 0; s--) {
      var a = l[s][it];
      if (!a.P)
        switch (a.i) {
          case 5:
            r(a) && Ci(a);
            break;
          case 4:
            n(a) && Ci(a);
        }
    }
  }
  function n(l) {
    for (var s = l.t, a = l.k, f = Sl(a), d = f.length - 1; d >= 0; d--) {
      var p = f[d];
      if (p !== it) {
        var g = s[p];
        if (g === void 0 && !xl(s, p)) return !0;
        var v = a[p],
          m = v && v[it];
        if (m ? m.t !== g : !F5(v, g)) return !0;
      }
    }
    var E = !!s[it];
    return f.length !== Sl(s).length + (E ? 0 : 1);
  }
  function r(l) {
    var s = l.k;
    if (s.length !== l.t.length) return !0;
    var a = Object.getOwnPropertyDescriptor(s, s.length - 1);
    if (a && !a.get) return !0;
    for (var f = 0; f < s.length; f++) if (!s.hasOwnProperty(f)) return !0;
    return !1;
  }
  var i = {};
  PP("ES5", {
    J: function (l, s) {
      var a = Array.isArray(l),
        f = (function (p, g) {
          if (p) {
            for (var v = Array(g.length), m = 0; m < g.length; m++)
              Object.defineProperty(v, "" + m, e(m, !0));
            return v;
          }
          var E = z5(g);
          delete E[it];
          for (var S = Sl(E), N = 0; N < S.length; N++) {
            var y = S[N];
            E[y] = e(y, p || !!E[y].enumerable);
          }
          return Object.create(Object.getPrototypeOf(g), E);
        })(a, l),
        d = {
          i: a ? 5 : 4,
          A: s ? s.A : fg(),
          P: !1,
          I: !1,
          R: {},
          l: s,
          t: l,
          k: f,
          o: null,
          g: !1,
          C: !1,
        };
      return Object.defineProperty(f, it, { value: d, writable: !0 }), f;
    },
    S: function (l, s, a) {
      a
        ? Bi(s) && s[it].A === l && t(l.p)
        : (l.u &&
            (function f(d) {
              if (d && typeof d == "object") {
                var p = d[it];
                if (p) {
                  var g = p.t,
                    v = p.k,
                    m = p.R,
                    E = p.i;
                  if (E === 4)
                    To(v, function (k) {
                      k !== it &&
                        (g[k] !== void 0 || xl(g, k)
                          ? m[k] || f(v[k])
                          : ((m[k] = !0), Ci(p)));
                    }),
                      To(g, function (k) {
                        v[k] !== void 0 || xl(v, k) || ((m[k] = !1), Ci(p));
                      });
                  else if (E === 5) {
                    if ((r(p) && (Ci(p), (m.length = !0)), v.length < g.length))
                      for (var S = v.length; S < g.length; S++) m[S] = !1;
                    else for (var N = g.length; N < v.length; N++) m[N] = !0;
                    for (
                      var y = Math.min(v.length, g.length), x = 0;
                      x < y;
                      x++
                    )
                      v.hasOwnProperty(x) || (m[x] = !0),
                        m[x] === void 0 && f(v[x]);
                  }
                }
              }
            })(l.p[0]),
          t(l.p));
    },
    K: function (l) {
      return l.i === 4 ? n(l) : r(l);
    },
  });
}
var A2,
  us,
  K1 = typeof Symbol < "u" && typeof Symbol("x") == "symbol",
  DP = typeof Map < "u",
  NP = typeof Set < "u",
  D2 = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u",
  $5 = K1
    ? Symbol.for("immer-nothing")
    : (((A2 = {})["immer-nothing"] = !0), A2),
  N2 = K1 ? Symbol.for("immer-draftable") : "__$immer_draftable",
  it = K1 ? Symbol.for("immer-state") : "__$immer_state",
  LP = "" + Object.prototype.constructor,
  Sl =
    typeof Reflect < "u" && Reflect.ownKeys
      ? Reflect.ownKeys
      : Object.getOwnPropertySymbols !== void 0
      ? function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        }
      : Object.getOwnPropertyNames,
  z5 =
    Object.getOwnPropertyDescriptors ||
    function (e) {
      var t = {};
      return (
        Sl(e).forEach(function (n) {
          t[n] = Object.getOwnPropertyDescriptor(e, n);
        }),
        t
      );
    },
  gg = {},
  ss = {
    get: function (e, t) {
      if (t === it) return e;
      var n = ao(e);
      if (!xl(n, t))
        return (function (i, l, s) {
          var a,
            f = P2(l, s);
          return f
            ? "value" in f
              ? f.value
              : (a = f.get) === null || a === void 0
              ? void 0
              : a.call(i.k)
            : void 0;
        })(e, n, t);
      var r = n[t];
      return e.I || !Jr(r)
        ? r
        : r === Up(e.t, t)
        ? (Wp(e), (e.o[t] = pg(e.A.h, r, e)))
        : r;
    },
    has: function (e, t) {
      return t in ao(e);
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(ao(e));
    },
    set: function (e, t, n) {
      var r = P2(ao(e), t);
      if (r?.set) return r.set.call(e.k, n), !0;
      if (!e.P) {
        var i = Up(ao(e), t),
          l = i?.[it];
        if (l && l.t === n) return (e.o[t] = n), (e.R[t] = !1), !0;
        if (F5(n, i) && (n !== void 0 || xl(e.t, t))) return !0;
        Wp(e), Ci(e);
      }
      return (
        (e.o[t] === n && (n !== void 0 || t in e.o)) ||
          (Number.isNaN(n) && Number.isNaN(e.o[t])) ||
          ((e.o[t] = n), (e.R[t] = !0)),
        !0
      );
    },
    deleteProperty: function (e, t) {
      return (
        Up(e.t, t) !== void 0 || t in e.t
          ? ((e.R[t] = !1), Wp(e), Ci(e))
          : delete e.R[t],
        e.o && delete e.o[t],
        !0
      );
    },
    getOwnPropertyDescriptor: function (e, t) {
      var n = ao(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.i !== 1 || t !== "length",
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty: function () {
      fr(11);
    },
    getPrototypeOf: function (e) {
      return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function () {
      fr(12);
    },
  },
  Eu = {};
To(ss, function (e, t) {
  Eu[e] = function () {
    return (arguments[0] = arguments[0][0]), t.apply(this, arguments);
  };
}),
  (Eu.deleteProperty = function (e, t) {
    return Eu.set.call(this, e, t, void 0);
  }),
  (Eu.set = function (e, t, n) {
    return ss.set.call(this, e[0], t, n, e[0]);
  });
var MP = (function () {
    function e(n) {
      var r = this;
      (this.O = D2),
        (this.D = !0),
        (this.produce = function (i, l, s) {
          if (typeof i == "function" && typeof l != "function") {
            var a = l;
            l = i;
            var f = r;
            return function (S) {
              var N = this;
              S === void 0 && (S = a);
              for (
                var y = arguments.length, x = Array(y > 1 ? y - 1 : 0), k = 1;
                k < y;
                k++
              )
                x[k - 1] = arguments[k];
              return f.produce(S, function (I) {
                var M;
                return (M = l).call.apply(M, [N, I].concat(x));
              });
            };
          }
          var d;
          if (
            (typeof l != "function" && fr(6),
            s !== void 0 && typeof s != "function" && fr(7),
            Jr(i))
          ) {
            var p = T2(r),
              g = pg(r, i, void 0),
              v = !0;
            try {
              (d = l(g)), (v = !1);
            } finally {
              v ? _c(p) : dg(p);
            }
            return typeof Promise < "u" && d instanceof Promise
              ? d.then(
                  function (S) {
                    return Bp(p, s), Hp(S, p);
                  },
                  function (S) {
                    throw (_c(p), S);
                  }
                )
              : (Bp(p, s), Hp(d, p));
          }
          if (!i || typeof i != "object") {
            if (
              ((d = l(i)) === void 0 && (d = i),
              d === $5 && (d = void 0),
              r.D && G1(d, !0),
              s)
            ) {
              var m = [],
                E = [];
              Tr("Patches").M(i, d, m, E), s(m, E);
            }
            return d;
          }
          fr(21, i);
        }),
        (this.produceWithPatches = function (i, l) {
          if (typeof i == "function")
            return function (d) {
              for (
                var p = arguments.length, g = Array(p > 1 ? p - 1 : 0), v = 1;
                v < p;
                v++
              )
                g[v - 1] = arguments[v];
              return r.produceWithPatches(d, function (m) {
                return i.apply(void 0, [m].concat(g));
              });
            };
          var s,
            a,
            f = r.produce(i, l, function (d, p) {
              (s = d), (a = p);
            });
          return typeof Promise < "u" && f instanceof Promise
            ? f.then(function (d) {
                return [d, s, a];
              })
            : [f, s, a];
        }),
        typeof n?.useProxies == "boolean" && this.setUseProxies(n.useProxies),
        typeof n?.autoFreeze == "boolean" && this.setAutoFreeze(n.autoFreeze);
    }
    var t = e.prototype;
    return (
      (t.createDraft = function (n) {
        Jr(n) || fr(8), Bi(n) && (n = hg(n));
        var r = T2(this),
          i = pg(this, n, void 0);
        return (i[it].C = !0), dg(r), i;
      }),
      (t.finishDraft = function (n, r) {
        var i = n && n[it],
          l = i.A;
        return Bp(l, r), Hp(void 0, l);
      }),
      (t.setAutoFreeze = function (n) {
        this.D = n;
      }),
      (t.setUseProxies = function (n) {
        n && !D2 && fr(20), (this.O = n);
      }),
      (t.applyPatches = function (n, r) {
        var i;
        for (i = r.length - 1; i >= 0; i--) {
          var l = r[i];
          if (l.path.length === 0 && l.op === "replace") {
            n = l.value;
            break;
          }
        }
        i > -1 && (r = r.slice(i + 1));
        var s = Tr("Patches").$;
        return Bi(n)
          ? s(n, r)
          : this.produce(n, function (a) {
              return s(a, r);
            });
      }),
      e
    );
  })(),
  In = new MP(),
  B5 = In.produce;
In.produceWithPatches.bind(In);
In.setAutoFreeze.bind(In);
In.setUseProxies.bind(In);
In.applyPatches.bind(In);
In.createDraft.bind(In);
In.finishDraft.bind(In);
function H5(e) {
  var t = function (r) {
    var i = r.dispatch,
      l = r.getState;
    return function (s) {
      return function (a) {
        return typeof a == "function" ? a(i, l, e) : s(a);
      };
    };
  };
  return t;
}
var U5 = H5();
U5.withExtraArgument = H5;
const L2 = U5;
var W5 =
    (globalThis && globalThis.__extends) ||
    (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (r, i) {
                r.__proto__ = i;
              }) ||
            function (r, i) {
              for (var l in i)
                Object.prototype.hasOwnProperty.call(i, l) && (r[l] = i[l]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if (typeof n != "function" && n !== null)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        e(t, n);
        function r() {
          this.constructor = t;
        }
        t.prototype =
          n === null
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r());
      };
    })(),
  FP =
    (globalThis && globalThis.__generator) ||
    function (e, t) {
      var n = {
          label: 0,
          sent: function () {
            if (l[0] & 1) throw l[1];
            return l[1];
          },
          trys: [],
          ops: [],
        },
        r,
        i,
        l,
        s;
      return (
        (s = { next: a(0), throw: a(1), return: a(2) }),
        typeof Symbol == "function" &&
          (s[Symbol.iterator] = function () {
            return this;
          }),
        s
      );
      function a(d) {
        return function (p) {
          return f([d, p]);
        };
      }
      function f(d) {
        if (r) throw new TypeError("Generator is already executing.");
        for (; n; )
          try {
            if (
              ((r = 1),
              i &&
                (l =
                  d[0] & 2
                    ? i.return
                    : d[0]
                    ? i.throw || ((l = i.return) && l.call(i), 0)
                    : i.next) &&
                !(l = l.call(i, d[1])).done)
            )
              return l;
            switch (((i = 0), l && (d = [d[0] & 2, l.value]), d[0])) {
              case 0:
              case 1:
                l = d;
                break;
              case 4:
                return n.label++, { value: d[1], done: !1 };
              case 5:
                n.label++, (i = d[1]), (d = [0]);
                continue;
              case 7:
                (d = n.ops.pop()), n.trys.pop();
                continue;
              default:
                if (
                  ((l = n.trys),
                  !(l = l.length > 0 && l[l.length - 1]) &&
                    (d[0] === 6 || d[0] === 2))
                ) {
                  n = 0;
                  continue;
                }
                if (d[0] === 3 && (!l || (d[1] > l[0] && d[1] < l[3]))) {
                  n.label = d[1];
                  break;
                }
                if (d[0] === 6 && n.label < l[1]) {
                  (n.label = l[1]), (l = d);
                  break;
                }
                if (l && n.label < l[2]) {
                  (n.label = l[2]), n.ops.push(d);
                  break;
                }
                l[2] && n.ops.pop(), n.trys.pop();
                continue;
            }
            d = t.call(e, n);
          } catch (p) {
            (d = [6, p]), (i = 0);
          } finally {
            r = l = 0;
          }
        if (d[0] & 5) throw d[1];
        return { value: d[0] ? d[1] : void 0, done: !0 };
      }
    },
  Nl =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
      return e;
    },
  $P = Object.defineProperty,
  zP = Object.defineProperties,
  BP = Object.getOwnPropertyDescriptors,
  M2 = Object.getOwnPropertySymbols,
  HP = Object.prototype.hasOwnProperty,
  UP = Object.prototype.propertyIsEnumerable,
  F2 = function (e, t, n) {
    return t in e
      ? $P(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n);
  },
  Li = function (e, t) {
    for (var n in t || (t = {})) HP.call(t, n) && F2(e, n, t[n]);
    if (M2)
      for (var r = 0, i = M2(t); r < i.length; r++) {
        var n = i[r];
        UP.call(t, n) && F2(e, n, t[n]);
      }
    return e;
  },
  jp = function (e, t) {
    return zP(e, BP(t));
  },
  WP = function (e, t, n) {
    return new Promise(function (r, i) {
      var l = function (f) {
          try {
            a(n.next(f));
          } catch (d) {
            i(d);
          }
        },
        s = function (f) {
          try {
            a(n.throw(f));
          } catch (d) {
            i(d);
          }
        },
        a = function (f) {
          return f.done ? r(f.value) : Promise.resolve(f.value).then(l, s);
        };
      a((n = n.apply(e, t)).next());
    });
  },
  jP =
    typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == "object"
              ? kc
              : kc.apply(null, arguments);
        };
function VP(e) {
  if (typeof e != "object" || e === null) return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null; )
    n = Object.getPrototypeOf(n);
  return t === n;
}
var GP = function (e) {
  return e && typeof e.match == "function";
};
function Mi(e, t) {
  function n() {
    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
    if (t) {
      var l = t.apply(void 0, r);
      if (!l) throw new Error("prepareAction did not return an object");
      return Li(
        Li({ type: e, payload: l.payload }, "meta" in l && { meta: l.meta }),
        "error" in l && { error: l.error }
      );
    }
    return { type: e, payload: r[0] };
  }
  return (
    (n.toString = function () {
      return "" + e;
    }),
    (n.type = e),
    (n.match = function (r) {
      return r.type === e;
    }),
    n
  );
}
var qP = (function (e) {
    W5(t, e);
    function t() {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      var i = e.apply(this, n) || this;
      return Object.setPrototypeOf(i, t.prototype), i;
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return e.prototype.concat.apply(this, n);
      }),
      (t.prototype.prepend = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return n.length === 1 && Array.isArray(n[0])
          ? new (t.bind.apply(t, Nl([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Nl([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array),
  KP = (function (e) {
    W5(t, e);
    function t() {
      for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
      var i = e.apply(this, n) || this;
      return Object.setPrototypeOf(i, t.prototype), i;
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return e.prototype.concat.apply(this, n);
      }),
      (t.prototype.prepend = function () {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
        return n.length === 1 && Array.isArray(n[0])
          ? new (t.bind.apply(t, Nl([void 0], n[0].concat(this))))()
          : new (t.bind.apply(t, Nl([void 0], n.concat(this))))();
      }),
      t
    );
  })(Array);
function mg(e) {
  return Jr(e) ? B5(e, function () {}) : e;
}
function QP(e) {
  return typeof e == "boolean";
}
function YP() {
  return function (t) {
    return XP(t);
  };
}
function XP(e) {
  e === void 0 && (e = {});
  var t = e.thunk,
    n = t === void 0 ? !0 : t;
  e.immutableCheck, e.serializableCheck, e.actionCreatorCheck;
  var r = new qP();
  return (
    n && (QP(n) ? r.push(L2) : r.push(L2.withExtraArgument(n.extraArgument))), r
  );
}
var ZP = !0;
function JP(e) {
  var t = YP(),
    n = e || {},
    r = n.reducer,
    i = r === void 0 ? void 0 : r,
    l = n.middleware,
    s = l === void 0 ? t() : l,
    a = n.devTools,
    f = a === void 0 ? !0 : a,
    d = n.preloadedState,
    p = d === void 0 ? void 0 : d,
    g = n.enhancers,
    v = g === void 0 ? void 0 : g,
    m;
  if (typeof i == "function") m = i;
  else if (VP(i)) m = ET(i);
  else
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    );
  var E = s;
  typeof E == "function" && (E = E(t));
  var S = kT.apply(void 0, E),
    N = kc;
  f && (N = jP(Li({ trace: !ZP }, typeof f == "object" && f)));
  var y = new KP(S),
    x = y;
  Array.isArray(v) ? (x = Nl([S], v)) : typeof v == "function" && (x = v(y));
  var k = N.apply(void 0, x);
  return M1(m, p, k);
}
function j5(e) {
  var t = {},
    n = [],
    r,
    i = {
      addCase: function (l, s) {
        var a = typeof l == "string" ? l : l.type;
        if (!a)
          throw new Error(
            "`builder.addCase` cannot be called with an empty action type"
          );
        if (a in t)
          throw new Error(
            "`builder.addCase` cannot be called with two reducers for the same action type"
          );
        return (t[a] = s), i;
      },
      addMatcher: function (l, s) {
        return n.push({ matcher: l, reducer: s }), i;
      },
      addDefaultCase: function (l) {
        return (r = l), i;
      },
    };
  return e(i), [t, n, r];
}
function eR(e) {
  return typeof e == "function";
}
function tR(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == "function" ? j5(t) : [t, n, r],
    l = i[0],
    s = i[1],
    a = i[2],
    f;
  if (eR(e))
    f = function () {
      return mg(e());
    };
  else {
    var d = mg(e);
    f = function () {
      return d;
    };
  }
  function p(g, v) {
    g === void 0 && (g = f());
    var m = Nl(
      [l[v.type]],
      s
        .filter(function (E) {
          var S = E.matcher;
          return S(v);
        })
        .map(function (E) {
          var S = E.reducer;
          return S;
        })
    );
    return (
      m.filter(function (E) {
        return !!E;
      }).length === 0 && (m = [a]),
      m.reduce(function (E, S) {
        if (S)
          if (Bi(E)) {
            var N = E,
              y = S(N, v);
            return y === void 0 ? E : y;
          } else {
            if (Jr(E))
              return B5(E, function (x) {
                return S(x, v);
              });
            var y = S(E, v);
            if (y === void 0) {
              if (E === null) return E;
              throw Error(
                "A case reducer on a non-draftable value must not return undefined"
              );
            }
            return y;
          }
        return E;
      }, g)
    );
  }
  return (p.getInitialState = f), p;
}
function nR(e, t) {
  return e + "/" + t;
}
function Q1(e) {
  var t = e.name;
  if (!t) throw new Error("`name` is a required option for createSlice");
  typeof process < "u";
  var n =
      typeof e.initialState == "function" ? e.initialState : mg(e.initialState),
    r = e.reducers || {},
    i = Object.keys(r),
    l = {},
    s = {},
    a = {};
  i.forEach(function (p) {
    var g = r[p],
      v = nR(t, p),
      m,
      E;
    "reducer" in g ? ((m = g.reducer), (E = g.prepare)) : (m = g),
      (l[p] = m),
      (s[v] = m),
      (a[p] = E ? Mi(v, E) : Mi(v));
  });
  function f() {
    var p =
        typeof e.extraReducers == "function"
          ? j5(e.extraReducers)
          : [e.extraReducers],
      g = p[0],
      v = g === void 0 ? {} : g,
      m = p[1],
      E = m === void 0 ? [] : m,
      S = p[2],
      N = S === void 0 ? void 0 : S,
      y = Li(Li({}, v), s);
    return tR(n, function (x) {
      for (var k in y) x.addCase(k, y[k]);
      for (var I = 0, M = E; I < M.length; I++) {
        var P = M[I];
        x.addMatcher(P.matcher, P.reducer);
      }
      N && x.addDefaultCase(N);
    });
  }
  var d;
  return {
    name: t,
    reducer: function (p, g) {
      return d || (d = f()), d(p, g);
    },
    actions: a,
    caseReducers: l,
    getInitialState: function () {
      return d || (d = f()), d.getInitialState();
    },
  };
}
var rR = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",
  iR = function (e) {
    e === void 0 && (e = 21);
    for (var t = "", n = e; n--; ) t += rR[(Math.random() * 64) | 0];
    return t;
  },
  oR = ["name", "message", "stack", "code"],
  Vp = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  $2 = (function () {
    function e(t, n) {
      (this.payload = t), (this.meta = n);
    }
    return e;
  })(),
  lR = function (e) {
    if (typeof e == "object" && e !== null) {
      for (var t = {}, n = 0, r = oR; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == "string" && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  },
  Y1 = (function () {
    function e(t, n, r) {
      var i = Mi(t + "/fulfilled", function (d, p, g, v) {
          return {
            payload: d,
            meta: jp(Li({}, v || {}), {
              arg: g,
              requestId: p,
              requestStatus: "fulfilled",
            }),
          };
        }),
        l = Mi(t + "/pending", function (d, p, g) {
          return {
            payload: void 0,
            meta: jp(Li({}, g || {}), {
              arg: p,
              requestId: d,
              requestStatus: "pending",
            }),
          };
        }),
        s = Mi(t + "/rejected", function (d, p, g, v, m) {
          return {
            payload: v,
            error: ((r && r.serializeError) || lR)(d || "Rejected"),
            meta: jp(Li({}, m || {}), {
              arg: g,
              requestId: p,
              rejectedWithValue: !!v,
              requestStatus: "rejected",
              aborted: d?.name === "AbortError",
              condition: d?.name === "ConditionError",
            }),
          };
        }),
        a =
          typeof AbortController < "u"
            ? AbortController
            : (function () {
                function d() {
                  this.signal = {
                    aborted: !1,
                    addEventListener: function () {},
                    dispatchEvent: function () {
                      return !1;
                    },
                    onabort: function () {},
                    removeEventListener: function () {},
                    reason: void 0,
                    throwIfAborted: function () {},
                  };
                }
                return (d.prototype.abort = function () {}), d;
              })();
      function f(d) {
        return function (p, g, v) {
          var m = r?.idGenerator ? r.idGenerator(d) : iR(),
            E = new a(),
            S;
          function N(x) {
            (S = x), E.abort();
          }
          var y = (function () {
            return WP(this, null, function () {
              var x, k, I, M, P, $, B;
              return FP(this, function (Y) {
                switch (Y.label) {
                  case 0:
                    return (
                      Y.trys.push([0, 4, , 5]),
                      (M =
                        (x = r?.condition) == null
                          ? void 0
                          : x.call(r, d, { getState: g, extra: v })),
                      sR(M) ? [4, M] : [3, 2]
                    );
                  case 1:
                    (M = Y.sent()), (Y.label = 2);
                  case 2:
                    if (M === !1 || E.signal.aborted)
                      throw {
                        name: "ConditionError",
                        message:
                          "Aborted due to condition callback returning false.",
                      };
                    return (
                      (P = new Promise(function (ee, G) {
                        return E.signal.addEventListener("abort", function () {
                          return G({
                            name: "AbortError",
                            message: S || "Aborted",
                          });
                        });
                      })),
                      p(
                        l(
                          m,
                          d,
                          (k = r?.getPendingMeta) == null
                            ? void 0
                            : k.call(
                                r,
                                { requestId: m, arg: d },
                                { getState: g, extra: v }
                              )
                        )
                      ),
                      [
                        4,
                        Promise.race([
                          P,
                          Promise.resolve(
                            n(d, {
                              dispatch: p,
                              getState: g,
                              extra: v,
                              requestId: m,
                              signal: E.signal,
                              abort: N,
                              rejectWithValue: function (ee, G) {
                                return new Vp(ee, G);
                              },
                              fulfillWithValue: function (ee, G) {
                                return new $2(ee, G);
                              },
                            })
                          ).then(function (ee) {
                            if (ee instanceof Vp) throw ee;
                            return ee instanceof $2
                              ? i(ee.payload, m, d, ee.meta)
                              : i(ee, m, d);
                          }),
                        ]),
                      ]
                    );
                  case 3:
                    return (I = Y.sent()), [3, 5];
                  case 4:
                    return (
                      ($ = Y.sent()),
                      (I =
                        $ instanceof Vp
                          ? s(null, m, d, $.payload, $.meta)
                          : s($, m, d)),
                      [3, 5]
                    );
                  case 5:
                    return (
                      (B =
                        r &&
                        !r.dispatchConditionRejection &&
                        s.match(I) &&
                        I.meta.condition),
                      B || p(I),
                      [2, I]
                    );
                }
              });
            });
          })();
          return Object.assign(y, {
            abort: N,
            requestId: m,
            arg: d,
            unwrap: function () {
              return y.then(uR);
            },
          });
        };
      }
      return Object.assign(f, {
        pending: l,
        rejected: s,
        fulfilled: i,
        typePrefix: t,
      });
    }
    return (
      (e.withTypes = function () {
        return e;
      }),
      e
    );
  })();
function uR(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function sR(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var aR = function (e, t) {
  return GP(e) ? e.match(t) : e(t);
};
function X1() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return function (n) {
    return e.some(function (r) {
      return aR(r, n);
    });
  };
}
function Z1(e, t) {
  if (!e || !e.meta) return !1;
  var n = typeof e.meta.requestId == "string",
    r = t.indexOf(e.meta.requestStatus) > -1;
  return n && r;
}
function J1(e) {
  return (
    typeof e[0] == "function" &&
    "pending" in e[0] &&
    "fulfilled" in e[0] &&
    "rejected" in e[0]
  );
}
function V5() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return Z1(n, ["pending"]);
      }
    : J1(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.pending;
          }),
          i = X1.apply(void 0, r);
        return i(n);
      }
    : V5()(e[0]);
}
function G5() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return Z1(n, ["rejected"]);
      }
    : J1(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.rejected;
          }),
          i = X1.apply(void 0, r);
        return i(n);
      }
    : G5()(e[0]);
}
function q5() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return e.length === 0
    ? function (n) {
        return Z1(n, ["fulfilled"]);
      }
    : J1(e)
    ? function (n) {
        var r = e.map(function (l) {
            return l.fulfilled;
          }),
          i = X1.apply(void 0, r);
        return i(n);
      }
    : q5()(e[0]);
}
var em = "listenerMiddleware";
Mi(em + "/add");
Mi(em + "/removeAll");
Mi(em + "/remove");
var z2;
typeof queueMicrotask == "function" &&
  queueMicrotask.bind(
    typeof window < "u" ? window : typeof global < "u" ? global : globalThis
  );
AP();
var Ft = ((e) => (
    (e.PLAYER = "player"),
    (e.SHOP = "shop"),
    (e.CONTAINER = "container"),
    (e.CRAFTING = "crafting"),
    e
  ))(Ft || {}),
  Ic = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ Ic.exports;
(function (e, t) {
  (function () {
    var n,
      r = "4.17.21",
      i = 200,
      l = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
      s = "Expected a function",
      a = "Invalid `variable` option passed into `_.template`",
      f = "__lodash_hash_undefined__",
      d = 500,
      p = "__lodash_placeholder__",
      g = 1,
      v = 2,
      m = 4,
      E = 1,
      S = 2,
      N = 1,
      y = 2,
      x = 4,
      k = 8,
      I = 16,
      M = 32,
      P = 64,
      $ = 128,
      B = 256,
      Y = 512,
      ee = 30,
      G = "...",
      Z = 800,
      re = 16,
      ae = 1,
      ce = 2,
      ge = 3,
      me = 1 / 0,
      W = 9007199254740991,
      te = 17976931348623157e292,
      _ = 0 / 0,
      ne = 4294967295,
      se = ne - 1,
      O = ne >>> 1,
      ve = [
        ["ary", $],
        ["bind", N],
        ["bindKey", y],
        ["curry", k],
        ["curryRight", I],
        ["flip", Y],
        ["partial", M],
        ["partialRight", P],
        ["rearg", B],
      ],
      Fe = "[object Arguments]",
      we = "[object Array]",
      nt = "[object AsyncFunction]",
      ct = "[object Boolean]",
      Bt = "[object Date]",
      ii = "[object DOMException]",
      oi = "[object Error]",
      qi = "[object Function]",
      Cs = "[object GeneratorFunction]",
      cn = "[object Map]",
      Ki = "[object Number]",
      Es = "[object Null]",
      Dn = "[object Object]",
      Vl = "[object Promise]",
      qf = "[object Proxy]",
      li = "[object RegExp]",
      Yt = "[object Set]",
      Qi = "[object String]",
      No = "[object Symbol]",
      Kf = "[object Undefined]",
      Yi = "[object WeakMap]",
      Qf = "[object WeakSet]",
      H = "[object ArrayBuffer]",
      J = "[object DataView]",
      fe = "[object Float32Array]",
      De = "[object Float64Array]",
      Ne = "[object Int8Array]",
      Ht = "[object Int16Array]",
      Nn = "[object Int32Array]",
      fn = "[object Uint8Array]",
      Dr = "[object Uint8ClampedArray]",
      Nr = "[object Uint16Array]",
      Ze = "[object Uint32Array]",
      Gl = /\b__p \+= '';/g,
      tr = /\b(__p \+=) '' \+/g,
      ES = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      Pm = /&(?:amp|lt|gt|quot|#39);/g,
      Rm = /[&<>"']/g,
      kS = RegExp(Pm.source),
      bS = RegExp(Rm.source),
      _S = /<%-([\s\S]+?)%>/g,
      OS = /<%([\s\S]+?)%>/g,
      Am = /<%=([\s\S]+?)%>/g,
      TS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      IS = /^\w*$/,
      PS =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Yf = /[\\^$.*+?()[\]{}|]/g,
      RS = RegExp(Yf.source),
      Xf = /^\s+/,
      AS = /\s/,
      DS = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      NS = /\{\n\/\* \[wrapped with (.+)\] \*/,
      LS = /,? & /,
      MS = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      FS = /[()=,{}\[\]\/\s]/,
      $S = /\\(\\)?/g,
      zS = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      Dm = /\w*$/,
      BS = /^[-+]0x[0-9a-f]+$/i,
      HS = /^0b[01]+$/i,
      US = /^\[object .+?Constructor\]$/,
      WS = /^0o[0-7]+$/i,
      jS = /^(?:0|[1-9]\d*)$/,
      VS = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      ks = /($^)/,
      GS = /['\n\r\u2028\u2029\\]/g,
      bs = "\\ud800-\\udfff",
      qS = "\\u0300-\\u036f",
      KS = "\\ufe20-\\ufe2f",
      QS = "\\u20d0-\\u20ff",
      Nm = qS + KS + QS,
      Lm = "\\u2700-\\u27bf",
      Mm = "a-z\\xdf-\\xf6\\xf8-\\xff",
      YS = "\\xac\\xb1\\xd7\\xf7",
      XS = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      ZS = "\\u2000-\\u206f",
      JS =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      Fm = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      $m = "\\ufe0e\\ufe0f",
      zm = YS + XS + ZS + JS,
      Zf = "['’]",
      e6 = "[" + bs + "]",
      Bm = "[" + zm + "]",
      _s = "[" + Nm + "]",
      Hm = "\\d+",
      t6 = "[" + Lm + "]",
      Um = "[" + Mm + "]",
      Wm = "[^" + bs + zm + Hm + Lm + Mm + Fm + "]",
      Jf = "\\ud83c[\\udffb-\\udfff]",
      n6 = "(?:" + _s + "|" + Jf + ")",
      jm = "[^" + bs + "]",
      ed = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      td = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      Lo = "[" + Fm + "]",
      Vm = "\\u200d",
      Gm = "(?:" + Um + "|" + Wm + ")",
      r6 = "(?:" + Lo + "|" + Wm + ")",
      qm = "(?:" + Zf + "(?:d|ll|m|re|s|t|ve))?",
      Km = "(?:" + Zf + "(?:D|LL|M|RE|S|T|VE))?",
      Qm = n6 + "?",
      Ym = "[" + $m + "]?",
      i6 = "(?:" + Vm + "(?:" + [jm, ed, td].join("|") + ")" + Ym + Qm + ")*",
      o6 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      l6 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      Xm = Ym + Qm + i6,
      u6 = "(?:" + [t6, ed, td].join("|") + ")" + Xm,
      s6 = "(?:" + [jm + _s + "?", _s, ed, td, e6].join("|") + ")",
      a6 = RegExp(Zf, "g"),
      c6 = RegExp(_s, "g"),
      nd = RegExp(Jf + "(?=" + Jf + ")|" + s6 + Xm, "g"),
      f6 = RegExp(
        [
          Lo + "?" + Um + "+" + qm + "(?=" + [Bm, Lo, "$"].join("|") + ")",
          r6 + "+" + Km + "(?=" + [Bm, Lo + Gm, "$"].join("|") + ")",
          Lo + "?" + Gm + "+" + qm,
          Lo + "+" + Km,
          l6,
          o6,
          Hm,
          u6,
        ].join("|"),
        "g"
      ),
      d6 = RegExp("[" + Vm + bs + Nm + $m + "]"),
      p6 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      h6 = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout",
      ],
      g6 = -1,
      Je = {};
    (Je[fe] =
      Je[De] =
      Je[Ne] =
      Je[Ht] =
      Je[Nn] =
      Je[fn] =
      Je[Dr] =
      Je[Nr] =
      Je[Ze] =
        !0),
      (Je[Fe] =
        Je[we] =
        Je[H] =
        Je[ct] =
        Je[J] =
        Je[Bt] =
        Je[oi] =
        Je[qi] =
        Je[cn] =
        Je[Ki] =
        Je[Dn] =
        Je[li] =
        Je[Yt] =
        Je[Qi] =
        Je[Yi] =
          !1);
    var Ke = {};
    (Ke[Fe] =
      Ke[we] =
      Ke[H] =
      Ke[J] =
      Ke[ct] =
      Ke[Bt] =
      Ke[fe] =
      Ke[De] =
      Ke[Ne] =
      Ke[Ht] =
      Ke[Nn] =
      Ke[cn] =
      Ke[Ki] =
      Ke[Dn] =
      Ke[li] =
      Ke[Yt] =
      Ke[Qi] =
      Ke[No] =
      Ke[fn] =
      Ke[Dr] =
      Ke[Nr] =
      Ke[Ze] =
        !0),
      (Ke[oi] = Ke[qi] = Ke[Yi] = !1);
    var m6 = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
      },
      v6 = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      },
      y6 = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      w6 = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      x6 = parseFloat,
      S6 = parseInt,
      Zm = typeof su == "object" && su && su.Object === Object && su,
      C6 = typeof self == "object" && self && self.Object === Object && self,
      _t = Zm || C6 || Function("return this")(),
      rd = t && !t.nodeType && t,
      Xi = rd && !0 && e && !e.nodeType && e,
      Jm = Xi && Xi.exports === rd,
      id = Jm && Zm.process,
      Ln = (function () {
        try {
          var L = Xi && Xi.require && Xi.require("util").types;
          return L || (id && id.binding && id.binding("util"));
        } catch {}
      })(),
      e0 = Ln && Ln.isArrayBuffer,
      t0 = Ln && Ln.isDate,
      n0 = Ln && Ln.isMap,
      r0 = Ln && Ln.isRegExp,
      i0 = Ln && Ln.isSet,
      o0 = Ln && Ln.isTypedArray;
    function dn(L, U, z) {
      switch (z.length) {
        case 0:
          return L.call(U);
        case 1:
          return L.call(U, z[0]);
        case 2:
          return L.call(U, z[0], z[1]);
        case 3:
          return L.call(U, z[0], z[1], z[2]);
      }
      return L.apply(U, z);
    }
    function E6(L, U, z, oe) {
      for (var xe = -1, Le = L == null ? 0 : L.length; ++xe < Le; ) {
        var yt = L[xe];
        U(oe, yt, z(yt), L);
      }
      return oe;
    }
    function Mn(L, U) {
      for (
        var z = -1, oe = L == null ? 0 : L.length;
        ++z < oe && U(L[z], z, L) !== !1;

      );
      return L;
    }
    function k6(L, U) {
      for (var z = L == null ? 0 : L.length; z-- && U(L[z], z, L) !== !1; );
      return L;
    }
    function l0(L, U) {
      for (var z = -1, oe = L == null ? 0 : L.length; ++z < oe; )
        if (!U(L[z], z, L)) return !1;
      return !0;
    }
    function ui(L, U) {
      for (
        var z = -1, oe = L == null ? 0 : L.length, xe = 0, Le = [];
        ++z < oe;

      ) {
        var yt = L[z];
        U(yt, z, L) && (Le[xe++] = yt);
      }
      return Le;
    }
    function Os(L, U) {
      var z = L == null ? 0 : L.length;
      return !!z && Mo(L, U, 0) > -1;
    }
    function od(L, U, z) {
      for (var oe = -1, xe = L == null ? 0 : L.length; ++oe < xe; )
        if (z(U, L[oe])) return !0;
      return !1;
    }
    function rt(L, U) {
      for (
        var z = -1, oe = L == null ? 0 : L.length, xe = Array(oe);
        ++z < oe;

      )
        xe[z] = U(L[z], z, L);
      return xe;
    }
    function si(L, U) {
      for (var z = -1, oe = U.length, xe = L.length; ++z < oe; )
        L[xe + z] = U[z];
      return L;
    }
    function ld(L, U, z, oe) {
      var xe = -1,
        Le = L == null ? 0 : L.length;
      for (oe && Le && (z = L[++xe]); ++xe < Le; ) z = U(z, L[xe], xe, L);
      return z;
    }
    function b6(L, U, z, oe) {
      var xe = L == null ? 0 : L.length;
      for (oe && xe && (z = L[--xe]); xe--; ) z = U(z, L[xe], xe, L);
      return z;
    }
    function ud(L, U) {
      for (var z = -1, oe = L == null ? 0 : L.length; ++z < oe; )
        if (U(L[z], z, L)) return !0;
      return !1;
    }
    var _6 = sd("length");
    function O6(L) {
      return L.split("");
    }
    function T6(L) {
      return L.match(MS) || [];
    }
    function u0(L, U, z) {
      var oe;
      return (
        z(L, function (xe, Le, yt) {
          if (U(xe, Le, yt)) return (oe = Le), !1;
        }),
        oe
      );
    }
    function Ts(L, U, z, oe) {
      for (var xe = L.length, Le = z + (oe ? 1 : -1); oe ? Le-- : ++Le < xe; )
        if (U(L[Le], Le, L)) return Le;
      return -1;
    }
    function Mo(L, U, z) {
      return U === U ? B6(L, U, z) : Ts(L, s0, z);
    }
    function I6(L, U, z, oe) {
      for (var xe = z - 1, Le = L.length; ++xe < Le; )
        if (oe(L[xe], U)) return xe;
      return -1;
    }
    function s0(L) {
      return L !== L;
    }
    function a0(L, U) {
      var z = L == null ? 0 : L.length;
      return z ? cd(L, U) / z : _;
    }
    function sd(L) {
      return function (U) {
        return U == null ? n : U[L];
      };
    }
    function ad(L) {
      return function (U) {
        return L == null ? n : L[U];
      };
    }
    function c0(L, U, z, oe, xe) {
      return (
        xe(L, function (Le, yt, je) {
          z = oe ? ((oe = !1), Le) : U(z, Le, yt, je);
        }),
        z
      );
    }
    function P6(L, U) {
      var z = L.length;
      for (L.sort(U); z--; ) L[z] = L[z].value;
      return L;
    }
    function cd(L, U) {
      for (var z, oe = -1, xe = L.length; ++oe < xe; ) {
        var Le = U(L[oe]);
        Le !== n && (z = z === n ? Le : z + Le);
      }
      return z;
    }
    function fd(L, U) {
      for (var z = -1, oe = Array(L); ++z < L; ) oe[z] = U(z);
      return oe;
    }
    function R6(L, U) {
      return rt(U, function (z) {
        return [z, L[z]];
      });
    }
    function f0(L) {
      return L && L.slice(0, g0(L) + 1).replace(Xf, "");
    }
    function pn(L) {
      return function (U) {
        return L(U);
      };
    }
    function dd(L, U) {
      return rt(U, function (z) {
        return L[z];
      });
    }
    function ql(L, U) {
      return L.has(U);
    }
    function d0(L, U) {
      for (var z = -1, oe = L.length; ++z < oe && Mo(U, L[z], 0) > -1; );
      return z;
    }
    function p0(L, U) {
      for (var z = L.length; z-- && Mo(U, L[z], 0) > -1; );
      return z;
    }
    function A6(L, U) {
      for (var z = L.length, oe = 0; z--; ) L[z] === U && ++oe;
      return oe;
    }
    var D6 = ad(m6),
      N6 = ad(v6);
    function L6(L) {
      return "\\" + w6[L];
    }
    function M6(L, U) {
      return L == null ? n : L[U];
    }
    function Fo(L) {
      return d6.test(L);
    }
    function F6(L) {
      return p6.test(L);
    }
    function $6(L) {
      for (var U, z = []; !(U = L.next()).done; ) z.push(U.value);
      return z;
    }
    function pd(L) {
      var U = -1,
        z = Array(L.size);
      return (
        L.forEach(function (oe, xe) {
          z[++U] = [xe, oe];
        }),
        z
      );
    }
    function h0(L, U) {
      return function (z) {
        return L(U(z));
      };
    }
    function ai(L, U) {
      for (var z = -1, oe = L.length, xe = 0, Le = []; ++z < oe; ) {
        var yt = L[z];
        (yt === U || yt === p) && ((L[z] = p), (Le[xe++] = z));
      }
      return Le;
    }
    function Is(L) {
      var U = -1,
        z = Array(L.size);
      return (
        L.forEach(function (oe) {
          z[++U] = oe;
        }),
        z
      );
    }
    function z6(L) {
      var U = -1,
        z = Array(L.size);
      return (
        L.forEach(function (oe) {
          z[++U] = [oe, oe];
        }),
        z
      );
    }
    function B6(L, U, z) {
      for (var oe = z - 1, xe = L.length; ++oe < xe; )
        if (L[oe] === U) return oe;
      return -1;
    }
    function H6(L, U, z) {
      for (var oe = z + 1; oe--; ) if (L[oe] === U) return oe;
      return oe;
    }
    function $o(L) {
      return Fo(L) ? W6(L) : _6(L);
    }
    function nr(L) {
      return Fo(L) ? j6(L) : O6(L);
    }
    function g0(L) {
      for (var U = L.length; U-- && AS.test(L.charAt(U)); );
      return U;
    }
    var U6 = ad(y6);
    function W6(L) {
      for (var U = (nd.lastIndex = 0); nd.test(L); ) ++U;
      return U;
    }
    function j6(L) {
      return L.match(nd) || [];
    }
    function V6(L) {
      return L.match(f6) || [];
    }
    var G6 = function L(U) {
        U = U == null ? _t : zo.defaults(_t.Object(), U, zo.pick(_t, h6));
        var z = U.Array,
          oe = U.Date,
          xe = U.Error,
          Le = U.Function,
          yt = U.Math,
          je = U.Object,
          hd = U.RegExp,
          q6 = U.String,
          Fn = U.TypeError,
          Ps = z.prototype,
          K6 = Le.prototype,
          Bo = je.prototype,
          Rs = U["__core-js_shared__"],
          As = K6.toString,
          ze = Bo.hasOwnProperty,
          Q6 = 0,
          m0 = (function () {
            var o = /[^.]+$/.exec((Rs && Rs.keys && Rs.keys.IE_PROTO) || "");
            return o ? "Symbol(src)_1." + o : "";
          })(),
          Ds = Bo.toString,
          Y6 = As.call(je),
          X6 = _t._,
          Z6 = hd(
            "^" +
              As.call(ze)
                .replace(Yf, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          Ns = Jm ? U.Buffer : n,
          ci = U.Symbol,
          Ls = U.Uint8Array,
          v0 = Ns ? Ns.allocUnsafe : n,
          Ms = h0(je.getPrototypeOf, je),
          y0 = je.create,
          w0 = Bo.propertyIsEnumerable,
          Fs = Ps.splice,
          x0 = ci ? ci.isConcatSpreadable : n,
          Kl = ci ? ci.iterator : n,
          Zi = ci ? ci.toStringTag : n,
          $s = (function () {
            try {
              var o = ro(je, "defineProperty");
              return o({}, "", {}), o;
            } catch {}
          })(),
          J6 = U.clearTimeout !== _t.clearTimeout && U.clearTimeout,
          eC = oe && oe.now !== _t.Date.now && oe.now,
          tC = U.setTimeout !== _t.setTimeout && U.setTimeout,
          zs = yt.ceil,
          Bs = yt.floor,
          gd = je.getOwnPropertySymbols,
          nC = Ns ? Ns.isBuffer : n,
          S0 = U.isFinite,
          rC = Ps.join,
          iC = h0(je.keys, je),
          wt = yt.max,
          Rt = yt.min,
          oC = oe.now,
          lC = U.parseInt,
          C0 = yt.random,
          uC = Ps.reverse,
          md = ro(U, "DataView"),
          Ql = ro(U, "Map"),
          vd = ro(U, "Promise"),
          Ho = ro(U, "Set"),
          Yl = ro(U, "WeakMap"),
          Xl = ro(je, "create"),
          Hs = Yl && new Yl(),
          Uo = {},
          sC = io(md),
          aC = io(Ql),
          cC = io(vd),
          fC = io(Ho),
          dC = io(Yl),
          Us = ci ? ci.prototype : n,
          Zl = Us ? Us.valueOf : n,
          E0 = Us ? Us.toString : n;
        function C(o) {
          if (ft(o) && !Ce(o) && !(o instanceof Pe)) {
            if (o instanceof $n) return o;
            if (ze.call(o, "__wrapped__")) return kv(o);
          }
          return new $n(o);
        }
        var Wo = (function () {
          function o() {}
          return function (u) {
            if (!lt(u)) return {};
            if (y0) return y0(u);
            o.prototype = u;
            var c = new o();
            return (o.prototype = n), c;
          };
        })();
        function Ws() {}
        function $n(o, u) {
          (this.__wrapped__ = o),
            (this.__actions__ = []),
            (this.__chain__ = !!u),
            (this.__index__ = 0),
            (this.__values__ = n);
        }
        (C.templateSettings = {
          escape: _S,
          evaluate: OS,
          interpolate: Am,
          variable: "",
          imports: { _: C },
        }),
          (C.prototype = Ws.prototype),
          (C.prototype.constructor = C),
          ($n.prototype = Wo(Ws.prototype)),
          ($n.prototype.constructor = $n);
        function Pe(o) {
          (this.__wrapped__ = o),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = ne),
            (this.__views__ = []);
        }
        function pC() {
          var o = new Pe(this.__wrapped__);
          return (
            (o.__actions__ = Xt(this.__actions__)),
            (o.__dir__ = this.__dir__),
            (o.__filtered__ = this.__filtered__),
            (o.__iteratees__ = Xt(this.__iteratees__)),
            (o.__takeCount__ = this.__takeCount__),
            (o.__views__ = Xt(this.__views__)),
            o
          );
        }
        function hC() {
          if (this.__filtered__) {
            var o = new Pe(this);
            (o.__dir__ = -1), (o.__filtered__ = !0);
          } else (o = this.clone()), (o.__dir__ *= -1);
          return o;
        }
        function gC() {
          var o = this.__wrapped__.value(),
            u = this.__dir__,
            c = Ce(o),
            h = u < 0,
            w = c ? o.length : 0,
            b = O8(0, w, this.__views__),
            T = b.start,
            R = b.end,
            F = R - T,
            j = h ? R : T - 1,
            V = this.__iteratees__,
            q = V.length,
            ie = 0,
            ue = Rt(F, this.__takeCount__);
          if (!c || (!h && w == F && ue == F)) return q0(o, this.__actions__);
          var pe = [];
          e: for (; F-- && ie < ue; ) {
            j += u;
            for (var _e = -1, he = o[j]; ++_e < q; ) {
              var Te = V[_e],
                Re = Te.iteratee,
                mn = Te.type,
                jt = Re(he);
              if (mn == ce) he = jt;
              else if (!jt) {
                if (mn == ae) continue e;
                break e;
              }
            }
            pe[ie++] = he;
          }
          return pe;
        }
        (Pe.prototype = Wo(Ws.prototype)), (Pe.prototype.constructor = Pe);
        function Ji(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function mC() {
          (this.__data__ = Xl ? Xl(null) : {}), (this.size = 0);
        }
        function vC(o) {
          var u = this.has(o) && delete this.__data__[o];
          return (this.size -= u ? 1 : 0), u;
        }
        function yC(o) {
          var u = this.__data__;
          if (Xl) {
            var c = u[o];
            return c === f ? n : c;
          }
          return ze.call(u, o) ? u[o] : n;
        }
        function wC(o) {
          var u = this.__data__;
          return Xl ? u[o] !== n : ze.call(u, o);
        }
        function xC(o, u) {
          var c = this.__data__;
          return (
            (this.size += this.has(o) ? 0 : 1),
            (c[o] = Xl && u === n ? f : u),
            this
          );
        }
        (Ji.prototype.clear = mC),
          (Ji.prototype.delete = vC),
          (Ji.prototype.get = yC),
          (Ji.prototype.has = wC),
          (Ji.prototype.set = xC);
        function Lr(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function SC() {
          (this.__data__ = []), (this.size = 0);
        }
        function CC(o) {
          var u = this.__data__,
            c = js(u, o);
          if (c < 0) return !1;
          var h = u.length - 1;
          return c == h ? u.pop() : Fs.call(u, c, 1), --this.size, !0;
        }
        function EC(o) {
          var u = this.__data__,
            c = js(u, o);
          return c < 0 ? n : u[c][1];
        }
        function kC(o) {
          return js(this.__data__, o) > -1;
        }
        function bC(o, u) {
          var c = this.__data__,
            h = js(c, o);
          return h < 0 ? (++this.size, c.push([o, u])) : (c[h][1] = u), this;
        }
        (Lr.prototype.clear = SC),
          (Lr.prototype.delete = CC),
          (Lr.prototype.get = EC),
          (Lr.prototype.has = kC),
          (Lr.prototype.set = bC);
        function Mr(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.clear(); ++u < c; ) {
            var h = o[u];
            this.set(h[0], h[1]);
          }
        }
        function _C() {
          (this.size = 0),
            (this.__data__ = {
              hash: new Ji(),
              map: new (Ql || Lr)(),
              string: new Ji(),
            });
        }
        function OC(o) {
          var u = na(this, o).delete(o);
          return (this.size -= u ? 1 : 0), u;
        }
        function TC(o) {
          return na(this, o).get(o);
        }
        function IC(o) {
          return na(this, o).has(o);
        }
        function PC(o, u) {
          var c = na(this, o),
            h = c.size;
          return c.set(o, u), (this.size += c.size == h ? 0 : 1), this;
        }
        (Mr.prototype.clear = _C),
          (Mr.prototype.delete = OC),
          (Mr.prototype.get = TC),
          (Mr.prototype.has = IC),
          (Mr.prototype.set = PC);
        function eo(o) {
          var u = -1,
            c = o == null ? 0 : o.length;
          for (this.__data__ = new Mr(); ++u < c; ) this.add(o[u]);
        }
        function RC(o) {
          return this.__data__.set(o, f), this;
        }
        function AC(o) {
          return this.__data__.has(o);
        }
        (eo.prototype.add = eo.prototype.push = RC), (eo.prototype.has = AC);
        function rr(o) {
          var u = (this.__data__ = new Lr(o));
          this.size = u.size;
        }
        function DC() {
          (this.__data__ = new Lr()), (this.size = 0);
        }
        function NC(o) {
          var u = this.__data__,
            c = u.delete(o);
          return (this.size = u.size), c;
        }
        function LC(o) {
          return this.__data__.get(o);
        }
        function MC(o) {
          return this.__data__.has(o);
        }
        function FC(o, u) {
          var c = this.__data__;
          if (c instanceof Lr) {
            var h = c.__data__;
            if (!Ql || h.length < i - 1)
              return h.push([o, u]), (this.size = ++c.size), this;
            c = this.__data__ = new Mr(h);
          }
          return c.set(o, u), (this.size = c.size), this;
        }
        (rr.prototype.clear = DC),
          (rr.prototype.delete = NC),
          (rr.prototype.get = LC),
          (rr.prototype.has = MC),
          (rr.prototype.set = FC);
        function k0(o, u) {
          var c = Ce(o),
            h = !c && oo(o),
            w = !c && !h && gi(o),
            b = !c && !h && !w && qo(o),
            T = c || h || w || b,
            R = T ? fd(o.length, q6) : [],
            F = R.length;
          for (var j in o)
            (u || ze.call(o, j)) &&
              !(
                T &&
                (j == "length" ||
                  (w && (j == "offset" || j == "parent")) ||
                  (b &&
                    (j == "buffer" ||
                      j == "byteLength" ||
                      j == "byteOffset")) ||
                  Br(j, F))
              ) &&
              R.push(j);
          return R;
        }
        function b0(o) {
          var u = o.length;
          return u ? o[Td(0, u - 1)] : n;
        }
        function $C(o, u) {
          return ra(Xt(o), to(u, 0, o.length));
        }
        function zC(o) {
          return ra(Xt(o));
        }
        function yd(o, u, c) {
          ((c !== n && !ir(o[u], c)) || (c === n && !(u in o))) && Fr(o, u, c);
        }
        function Jl(o, u, c) {
          var h = o[u];
          (!(ze.call(o, u) && ir(h, c)) || (c === n && !(u in o))) &&
            Fr(o, u, c);
        }
        function js(o, u) {
          for (var c = o.length; c--; ) if (ir(o[c][0], u)) return c;
          return -1;
        }
        function BC(o, u, c, h) {
          return (
            fi(o, function (w, b, T) {
              u(h, w, c(w), T);
            }),
            h
          );
        }
        function _0(o, u) {
          return o && yr(u, Ct(u), o);
        }
        function HC(o, u) {
          return o && yr(u, Jt(u), o);
        }
        function Fr(o, u, c) {
          u == "__proto__" && $s
            ? $s(o, u, {
                configurable: !0,
                enumerable: !0,
                value: c,
                writable: !0,
              })
            : (o[u] = c);
        }
        function wd(o, u) {
          for (var c = -1, h = u.length, w = z(h), b = o == null; ++c < h; )
            w[c] = b ? n : Jd(o, u[c]);
          return w;
        }
        function to(o, u, c) {
          return (
            o === o &&
              (c !== n && (o = o <= c ? o : c),
              u !== n && (o = o >= u ? o : u)),
            o
          );
        }
        function zn(o, u, c, h, w, b) {
          var T,
            R = u & g,
            F = u & v,
            j = u & m;
          if ((c && (T = w ? c(o, h, w, b) : c(o)), T !== n)) return T;
          if (!lt(o)) return o;
          var V = Ce(o);
          if (V) {
            if (((T = I8(o)), !R)) return Xt(o, T);
          } else {
            var q = At(o),
              ie = q == qi || q == Cs;
            if (gi(o)) return Y0(o, R);
            if (q == Dn || q == Fe || (ie && !w)) {
              if (((T = F || ie ? {} : gv(o)), !R))
                return F ? y8(o, HC(T, o)) : v8(o, _0(T, o));
            } else {
              if (!Ke[q]) return w ? o : {};
              T = P8(o, q, R);
            }
          }
          b || (b = new rr());
          var ue = b.get(o);
          if (ue) return ue;
          b.set(o, T),
            jv(o)
              ? o.forEach(function (he) {
                  T.add(zn(he, u, c, he, o, b));
                })
              : Uv(o) &&
                o.forEach(function (he, Te) {
                  T.set(Te, zn(he, u, c, Te, o, b));
                });
          var pe = j ? (F ? zd : $d) : F ? Jt : Ct,
            _e = V ? n : pe(o);
          return (
            Mn(_e || o, function (he, Te) {
              _e && ((Te = he), (he = o[Te])),
                Jl(T, Te, zn(he, u, c, Te, o, b));
            }),
            T
          );
        }
        function UC(o) {
          var u = Ct(o);
          return function (c) {
            return O0(c, o, u);
          };
        }
        function O0(o, u, c) {
          var h = c.length;
          if (o == null) return !h;
          for (o = je(o); h--; ) {
            var w = c[h],
              b = u[w],
              T = o[w];
            if ((T === n && !(w in o)) || !b(T)) return !1;
          }
          return !0;
        }
        function T0(o, u, c) {
          if (typeof o != "function") throw new Fn(s);
          return lu(function () {
            o.apply(n, c);
          }, u);
        }
        function eu(o, u, c, h) {
          var w = -1,
            b = Os,
            T = !0,
            R = o.length,
            F = [],
            j = u.length;
          if (!R) return F;
          c && (u = rt(u, pn(c))),
            h
              ? ((b = od), (T = !1))
              : u.length >= i && ((b = ql), (T = !1), (u = new eo(u)));
          e: for (; ++w < R; ) {
            var V = o[w],
              q = c == null ? V : c(V);
            if (((V = h || V !== 0 ? V : 0), T && q === q)) {
              for (var ie = j; ie--; ) if (u[ie] === q) continue e;
              F.push(V);
            } else b(u, q, h) || F.push(V);
          }
          return F;
        }
        var fi = tv(vr),
          I0 = tv(Sd, !0);
        function WC(o, u) {
          var c = !0;
          return (
            fi(o, function (h, w, b) {
              return (c = !!u(h, w, b)), c;
            }),
            c
          );
        }
        function Vs(o, u, c) {
          for (var h = -1, w = o.length; ++h < w; ) {
            var b = o[h],
              T = u(b);
            if (T != null && (R === n ? T === T && !gn(T) : c(T, R)))
              var R = T,
                F = b;
          }
          return F;
        }
        function jC(o, u, c, h) {
          var w = o.length;
          for (
            c = be(c),
              c < 0 && (c = -c > w ? 0 : w + c),
              h = h === n || h > w ? w : be(h),
              h < 0 && (h += w),
              h = c > h ? 0 : Gv(h);
            c < h;

          )
            o[c++] = u;
          return o;
        }
        function P0(o, u) {
          var c = [];
          return (
            fi(o, function (h, w, b) {
              u(h, w, b) && c.push(h);
            }),
            c
          );
        }
        function Ot(o, u, c, h, w) {
          var b = -1,
            T = o.length;
          for (c || (c = A8), w || (w = []); ++b < T; ) {
            var R = o[b];
            u > 0 && c(R)
              ? u > 1
                ? Ot(R, u - 1, c, h, w)
                : si(w, R)
              : h || (w[w.length] = R);
          }
          return w;
        }
        var xd = nv(),
          R0 = nv(!0);
        function vr(o, u) {
          return o && xd(o, u, Ct);
        }
        function Sd(o, u) {
          return o && R0(o, u, Ct);
        }
        function Gs(o, u) {
          return ui(u, function (c) {
            return Hr(o[c]);
          });
        }
        function no(o, u) {
          u = pi(u, o);
          for (var c = 0, h = u.length; o != null && c < h; ) o = o[wr(u[c++])];
          return c && c == h ? o : n;
        }
        function A0(o, u, c) {
          var h = u(o);
          return Ce(o) ? h : si(h, c(o));
        }
        function Ut(o) {
          return o == null
            ? o === n
              ? Kf
              : Es
            : Zi && Zi in je(o)
            ? _8(o)
            : z8(o);
        }
        function Cd(o, u) {
          return o > u;
        }
        function VC(o, u) {
          return o != null && ze.call(o, u);
        }
        function GC(o, u) {
          return o != null && u in je(o);
        }
        function qC(o, u, c) {
          return o >= Rt(u, c) && o < wt(u, c);
        }
        function Ed(o, u, c) {
          for (
            var h = c ? od : Os,
              w = o[0].length,
              b = o.length,
              T = b,
              R = z(b),
              F = 1 / 0,
              j = [];
            T--;

          ) {
            var V = o[T];
            T && u && (V = rt(V, pn(u))),
              (F = Rt(V.length, F)),
              (R[T] =
                !c && (u || (w >= 120 && V.length >= 120))
                  ? new eo(T && V)
                  : n);
          }
          V = o[0];
          var q = -1,
            ie = R[0];
          e: for (; ++q < w && j.length < F; ) {
            var ue = V[q],
              pe = u ? u(ue) : ue;
            if (
              ((ue = c || ue !== 0 ? ue : 0), !(ie ? ql(ie, pe) : h(j, pe, c)))
            ) {
              for (T = b; --T; ) {
                var _e = R[T];
                if (!(_e ? ql(_e, pe) : h(o[T], pe, c))) continue e;
              }
              ie && ie.push(pe), j.push(ue);
            }
          }
          return j;
        }
        function KC(o, u, c, h) {
          return (
            vr(o, function (w, b, T) {
              u(h, c(w), b, T);
            }),
            h
          );
        }
        function tu(o, u, c) {
          (u = pi(u, o)), (o = wv(o, u));
          var h = o == null ? o : o[wr(Hn(u))];
          return h == null ? n : dn(h, o, c);
        }
        function D0(o) {
          return ft(o) && Ut(o) == Fe;
        }
        function QC(o) {
          return ft(o) && Ut(o) == H;
        }
        function YC(o) {
          return ft(o) && Ut(o) == Bt;
        }
        function nu(o, u, c, h, w) {
          return o === u
            ? !0
            : o == null || u == null || (!ft(o) && !ft(u))
            ? o !== o && u !== u
            : XC(o, u, c, h, nu, w);
        }
        function XC(o, u, c, h, w, b) {
          var T = Ce(o),
            R = Ce(u),
            F = T ? we : At(o),
            j = R ? we : At(u);
          (F = F == Fe ? Dn : F), (j = j == Fe ? Dn : j);
          var V = F == Dn,
            q = j == Dn,
            ie = F == j;
          if (ie && gi(o)) {
            if (!gi(u)) return !1;
            (T = !0), (V = !1);
          }
          if (ie && !V)
            return (
              b || (b = new rr()),
              T || qo(o) ? dv(o, u, c, h, w, b) : k8(o, u, F, c, h, w, b)
            );
          if (!(c & E)) {
            var ue = V && ze.call(o, "__wrapped__"),
              pe = q && ze.call(u, "__wrapped__");
            if (ue || pe) {
              var _e = ue ? o.value() : o,
                he = pe ? u.value() : u;
              return b || (b = new rr()), w(_e, he, c, h, b);
            }
          }
          return ie ? (b || (b = new rr()), b8(o, u, c, h, w, b)) : !1;
        }
        function ZC(o) {
          return ft(o) && At(o) == cn;
        }
        function kd(o, u, c, h) {
          var w = c.length,
            b = w,
            T = !h;
          if (o == null) return !b;
          for (o = je(o); w--; ) {
            var R = c[w];
            if (T && R[2] ? R[1] !== o[R[0]] : !(R[0] in o)) return !1;
          }
          for (; ++w < b; ) {
            R = c[w];
            var F = R[0],
              j = o[F],
              V = R[1];
            if (T && R[2]) {
              if (j === n && !(F in o)) return !1;
            } else {
              var q = new rr();
              if (h) var ie = h(j, V, F, o, u, q);
              if (!(ie === n ? nu(V, j, E | S, h, q) : ie)) return !1;
            }
          }
          return !0;
        }
        function N0(o) {
          if (!lt(o) || N8(o)) return !1;
          var u = Hr(o) ? Z6 : US;
          return u.test(io(o));
        }
        function JC(o) {
          return ft(o) && Ut(o) == li;
        }
        function e8(o) {
          return ft(o) && At(o) == Yt;
        }
        function t8(o) {
          return ft(o) && aa(o.length) && !!Je[Ut(o)];
        }
        function L0(o) {
          return typeof o == "function"
            ? o
            : o == null
            ? en
            : typeof o == "object"
            ? Ce(o)
              ? $0(o[0], o[1])
              : F0(o)
            : ry(o);
        }
        function bd(o) {
          if (!ou(o)) return iC(o);
          var u = [];
          for (var c in je(o)) ze.call(o, c) && c != "constructor" && u.push(c);
          return u;
        }
        function n8(o) {
          if (!lt(o)) return $8(o);
          var u = ou(o),
            c = [];
          for (var h in o)
            (h == "constructor" && (u || !ze.call(o, h))) || c.push(h);
          return c;
        }
        function _d(o, u) {
          return o < u;
        }
        function M0(o, u) {
          var c = -1,
            h = Zt(o) ? z(o.length) : [];
          return (
            fi(o, function (w, b, T) {
              h[++c] = u(w, b, T);
            }),
            h
          );
        }
        function F0(o) {
          var u = Hd(o);
          return u.length == 1 && u[0][2]
            ? vv(u[0][0], u[0][1])
            : function (c) {
                return c === o || kd(c, o, u);
              };
        }
        function $0(o, u) {
          return Wd(o) && mv(u)
            ? vv(wr(o), u)
            : function (c) {
                var h = Jd(c, o);
                return h === n && h === u ? ep(c, o) : nu(u, h, E | S);
              };
        }
        function qs(o, u, c, h, w) {
          o !== u &&
            xd(
              u,
              function (b, T) {
                if ((w || (w = new rr()), lt(b))) r8(o, u, T, c, qs, h, w);
                else {
                  var R = h ? h(Vd(o, T), b, T + "", o, u, w) : n;
                  R === n && (R = b), yd(o, T, R);
                }
              },
              Jt
            );
        }
        function r8(o, u, c, h, w, b, T) {
          var R = Vd(o, c),
            F = Vd(u, c),
            j = T.get(F);
          if (j) {
            yd(o, c, j);
            return;
          }
          var V = b ? b(R, F, c + "", o, u, T) : n,
            q = V === n;
          if (q) {
            var ie = Ce(F),
              ue = !ie && gi(F),
              pe = !ie && !ue && qo(F);
            (V = F),
              ie || ue || pe
                ? Ce(R)
                  ? (V = R)
                  : pt(R)
                  ? (V = Xt(R))
                  : ue
                  ? ((q = !1), (V = Y0(F, !0)))
                  : pe
                  ? ((q = !1), (V = X0(F, !0)))
                  : (V = [])
                : uu(F) || oo(F)
                ? ((V = R),
                  oo(R) ? (V = qv(R)) : (!lt(R) || Hr(R)) && (V = gv(F)))
                : (q = !1);
          }
          q && (T.set(F, V), w(V, F, h, b, T), T.delete(F)), yd(o, c, V);
        }
        function z0(o, u) {
          var c = o.length;
          if (c) return (u += u < 0 ? c : 0), Br(u, c) ? o[u] : n;
        }
        function B0(o, u, c) {
          u.length
            ? (u = rt(u, function (b) {
                return Ce(b)
                  ? function (T) {
                      return no(T, b.length === 1 ? b[0] : b);
                    }
                  : b;
              }))
            : (u = [en]);
          var h = -1;
          u = rt(u, pn(de()));
          var w = M0(o, function (b, T, R) {
            var F = rt(u, function (j) {
              return j(b);
            });
            return { criteria: F, index: ++h, value: b };
          });
          return P6(w, function (b, T) {
            return m8(b, T, c);
          });
        }
        function i8(o, u) {
          return H0(o, u, function (c, h) {
            return ep(o, h);
          });
        }
        function H0(o, u, c) {
          for (var h = -1, w = u.length, b = {}; ++h < w; ) {
            var T = u[h],
              R = no(o, T);
            c(R, T) && ru(b, pi(T, o), R);
          }
          return b;
        }
        function o8(o) {
          return function (u) {
            return no(u, o);
          };
        }
        function Od(o, u, c, h) {
          var w = h ? I6 : Mo,
            b = -1,
            T = u.length,
            R = o;
          for (o === u && (u = Xt(u)), c && (R = rt(o, pn(c))); ++b < T; )
            for (
              var F = 0, j = u[b], V = c ? c(j) : j;
              (F = w(R, V, F, h)) > -1;

            )
              R !== o && Fs.call(R, F, 1), Fs.call(o, F, 1);
          return o;
        }
        function U0(o, u) {
          for (var c = o ? u.length : 0, h = c - 1; c--; ) {
            var w = u[c];
            if (c == h || w !== b) {
              var b = w;
              Br(w) ? Fs.call(o, w, 1) : Rd(o, w);
            }
          }
          return o;
        }
        function Td(o, u) {
          return o + Bs(C0() * (u - o + 1));
        }
        function l8(o, u, c, h) {
          for (var w = -1, b = wt(zs((u - o) / (c || 1)), 0), T = z(b); b--; )
            (T[h ? b : ++w] = o), (o += c);
          return T;
        }
        function Id(o, u) {
          var c = "";
          if (!o || u < 1 || u > W) return c;
          do u % 2 && (c += o), (u = Bs(u / 2)), u && (o += o);
          while (u);
          return c;
        }
        function Oe(o, u) {
          return Gd(yv(o, u, en), o + "");
        }
        function u8(o) {
          return b0(Ko(o));
        }
        function s8(o, u) {
          var c = Ko(o);
          return ra(c, to(u, 0, c.length));
        }
        function ru(o, u, c, h) {
          if (!lt(o)) return o;
          u = pi(u, o);
          for (
            var w = -1, b = u.length, T = b - 1, R = o;
            R != null && ++w < b;

          ) {
            var F = wr(u[w]),
              j = c;
            if (F === "__proto__" || F === "constructor" || F === "prototype")
              return o;
            if (w != T) {
              var V = R[F];
              (j = h ? h(V, F, R) : n),
                j === n && (j = lt(V) ? V : Br(u[w + 1]) ? [] : {});
            }
            Jl(R, F, j), (R = R[F]);
          }
          return o;
        }
        var W0 = Hs
            ? function (o, u) {
                return Hs.set(o, u), o;
              }
            : en,
          a8 = $s
            ? function (o, u) {
                return $s(o, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: np(u),
                  writable: !0,
                });
              }
            : en;
        function c8(o) {
          return ra(Ko(o));
        }
        function Bn(o, u, c) {
          var h = -1,
            w = o.length;
          u < 0 && (u = -u > w ? 0 : w + u),
            (c = c > w ? w : c),
            c < 0 && (c += w),
            (w = u > c ? 0 : (c - u) >>> 0),
            (u >>>= 0);
          for (var b = z(w); ++h < w; ) b[h] = o[h + u];
          return b;
        }
        function f8(o, u) {
          var c;
          return (
            fi(o, function (h, w, b) {
              return (c = u(h, w, b)), !c;
            }),
            !!c
          );
        }
        function Ks(o, u, c) {
          var h = 0,
            w = o == null ? h : o.length;
          if (typeof u == "number" && u === u && w <= O) {
            for (; h < w; ) {
              var b = (h + w) >>> 1,
                T = o[b];
              T !== null && !gn(T) && (c ? T <= u : T < u)
                ? (h = b + 1)
                : (w = b);
            }
            return w;
          }
          return Pd(o, u, en, c);
        }
        function Pd(o, u, c, h) {
          var w = 0,
            b = o == null ? 0 : o.length;
          if (b === 0) return 0;
          u = c(u);
          for (
            var T = u !== u, R = u === null, F = gn(u), j = u === n;
            w < b;

          ) {
            var V = Bs((w + b) / 2),
              q = c(o[V]),
              ie = q !== n,
              ue = q === null,
              pe = q === q,
              _e = gn(q);
            if (T) var he = h || pe;
            else
              j
                ? (he = pe && (h || ie))
                : R
                ? (he = pe && ie && (h || !ue))
                : F
                ? (he = pe && ie && !ue && (h || !_e))
                : ue || _e
                ? (he = !1)
                : (he = h ? q <= u : q < u);
            he ? (w = V + 1) : (b = V);
          }
          return Rt(b, se);
        }
        function j0(o, u) {
          for (var c = -1, h = o.length, w = 0, b = []; ++c < h; ) {
            var T = o[c],
              R = u ? u(T) : T;
            if (!c || !ir(R, F)) {
              var F = R;
              b[w++] = T === 0 ? 0 : T;
            }
          }
          return b;
        }
        function V0(o) {
          return typeof o == "number" ? o : gn(o) ? _ : +o;
        }
        function hn(o) {
          if (typeof o == "string") return o;
          if (Ce(o)) return rt(o, hn) + "";
          if (gn(o)) return E0 ? E0.call(o) : "";
          var u = o + "";
          return u == "0" && 1 / o == -me ? "-0" : u;
        }
        function di(o, u, c) {
          var h = -1,
            w = Os,
            b = o.length,
            T = !0,
            R = [],
            F = R;
          if (c) (T = !1), (w = od);
          else if (b >= i) {
            var j = u ? null : C8(o);
            if (j) return Is(j);
            (T = !1), (w = ql), (F = new eo());
          } else F = u ? [] : R;
          e: for (; ++h < b; ) {
            var V = o[h],
              q = u ? u(V) : V;
            if (((V = c || V !== 0 ? V : 0), T && q === q)) {
              for (var ie = F.length; ie--; ) if (F[ie] === q) continue e;
              u && F.push(q), R.push(V);
            } else w(F, q, c) || (F !== R && F.push(q), R.push(V));
          }
          return R;
        }
        function Rd(o, u) {
          return (
            (u = pi(u, o)), (o = wv(o, u)), o == null || delete o[wr(Hn(u))]
          );
        }
        function G0(o, u, c, h) {
          return ru(o, u, c(no(o, u)), h);
        }
        function Qs(o, u, c, h) {
          for (
            var w = o.length, b = h ? w : -1;
            (h ? b-- : ++b < w) && u(o[b], b, o);

          );
          return c
            ? Bn(o, h ? 0 : b, h ? b + 1 : w)
            : Bn(o, h ? b + 1 : 0, h ? w : b);
        }
        function q0(o, u) {
          var c = o;
          return (
            c instanceof Pe && (c = c.value()),
            ld(
              u,
              function (h, w) {
                return w.func.apply(w.thisArg, si([h], w.args));
              },
              c
            )
          );
        }
        function Ad(o, u, c) {
          var h = o.length;
          if (h < 2) return h ? di(o[0]) : [];
          for (var w = -1, b = z(h); ++w < h; )
            for (var T = o[w], R = -1; ++R < h; )
              R != w && (b[w] = eu(b[w] || T, o[R], u, c));
          return di(Ot(b, 1), u, c);
        }
        function K0(o, u, c) {
          for (var h = -1, w = o.length, b = u.length, T = {}; ++h < w; ) {
            var R = h < b ? u[h] : n;
            c(T, o[h], R);
          }
          return T;
        }
        function Dd(o) {
          return pt(o) ? o : [];
        }
        function Nd(o) {
          return typeof o == "function" ? o : en;
        }
        function pi(o, u) {
          return Ce(o) ? o : Wd(o, u) ? [o] : Ev($e(o));
        }
        var d8 = Oe;
        function hi(o, u, c) {
          var h = o.length;
          return (c = c === n ? h : c), !u && c >= h ? o : Bn(o, u, c);
        }
        var Q0 =
          J6 ||
          function (o) {
            return _t.clearTimeout(o);
          };
        function Y0(o, u) {
          if (u) return o.slice();
          var c = o.length,
            h = v0 ? v0(c) : new o.constructor(c);
          return o.copy(h), h;
        }
        function Ld(o) {
          var u = new o.constructor(o.byteLength);
          return new Ls(u).set(new Ls(o)), u;
        }
        function p8(o, u) {
          var c = u ? Ld(o.buffer) : o.buffer;
          return new o.constructor(c, o.byteOffset, o.byteLength);
        }
        function h8(o) {
          var u = new o.constructor(o.source, Dm.exec(o));
          return (u.lastIndex = o.lastIndex), u;
        }
        function g8(o) {
          return Zl ? je(Zl.call(o)) : {};
        }
        function X0(o, u) {
          var c = u ? Ld(o.buffer) : o.buffer;
          return new o.constructor(c, o.byteOffset, o.length);
        }
        function Z0(o, u) {
          if (o !== u) {
            var c = o !== n,
              h = o === null,
              w = o === o,
              b = gn(o),
              T = u !== n,
              R = u === null,
              F = u === u,
              j = gn(u);
            if (
              (!R && !j && !b && o > u) ||
              (b && T && F && !R && !j) ||
              (h && T && F) ||
              (!c && F) ||
              !w
            )
              return 1;
            if (
              (!h && !b && !j && o < u) ||
              (j && c && w && !h && !b) ||
              (R && c && w) ||
              (!T && w) ||
              !F
            )
              return -1;
          }
          return 0;
        }
        function m8(o, u, c) {
          for (
            var h = -1,
              w = o.criteria,
              b = u.criteria,
              T = w.length,
              R = c.length;
            ++h < T;

          ) {
            var F = Z0(w[h], b[h]);
            if (F) {
              if (h >= R) return F;
              var j = c[h];
              return F * (j == "desc" ? -1 : 1);
            }
          }
          return o.index - u.index;
        }
        function J0(o, u, c, h) {
          for (
            var w = -1,
              b = o.length,
              T = c.length,
              R = -1,
              F = u.length,
              j = wt(b - T, 0),
              V = z(F + j),
              q = !h;
            ++R < F;

          )
            V[R] = u[R];
          for (; ++w < T; ) (q || w < b) && (V[c[w]] = o[w]);
          for (; j--; ) V[R++] = o[w++];
          return V;
        }
        function ev(o, u, c, h) {
          for (
            var w = -1,
              b = o.length,
              T = -1,
              R = c.length,
              F = -1,
              j = u.length,
              V = wt(b - R, 0),
              q = z(V + j),
              ie = !h;
            ++w < V;

          )
            q[w] = o[w];
          for (var ue = w; ++F < j; ) q[ue + F] = u[F];
          for (; ++T < R; ) (ie || w < b) && (q[ue + c[T]] = o[w++]);
          return q;
        }
        function Xt(o, u) {
          var c = -1,
            h = o.length;
          for (u || (u = z(h)); ++c < h; ) u[c] = o[c];
          return u;
        }
        function yr(o, u, c, h) {
          var w = !c;
          c || (c = {});
          for (var b = -1, T = u.length; ++b < T; ) {
            var R = u[b],
              F = h ? h(c[R], o[R], R, c, o) : n;
            F === n && (F = o[R]), w ? Fr(c, R, F) : Jl(c, R, F);
          }
          return c;
        }
        function v8(o, u) {
          return yr(o, Ud(o), u);
        }
        function y8(o, u) {
          return yr(o, pv(o), u);
        }
        function Ys(o, u) {
          return function (c, h) {
            var w = Ce(c) ? E6 : BC,
              b = u ? u() : {};
            return w(c, o, de(h, 2), b);
          };
        }
        function jo(o) {
          return Oe(function (u, c) {
            var h = -1,
              w = c.length,
              b = w > 1 ? c[w - 1] : n,
              T = w > 2 ? c[2] : n;
            for (
              b = o.length > 3 && typeof b == "function" ? (w--, b) : n,
                T && Wt(c[0], c[1], T) && ((b = w < 3 ? n : b), (w = 1)),
                u = je(u);
              ++h < w;

            ) {
              var R = c[h];
              R && o(u, R, h, b);
            }
            return u;
          });
        }
        function tv(o, u) {
          return function (c, h) {
            if (c == null) return c;
            if (!Zt(c)) return o(c, h);
            for (
              var w = c.length, b = u ? w : -1, T = je(c);
              (u ? b-- : ++b < w) && h(T[b], b, T) !== !1;

            );
            return c;
          };
        }
        function nv(o) {
          return function (u, c, h) {
            for (var w = -1, b = je(u), T = h(u), R = T.length; R--; ) {
              var F = T[o ? R : ++w];
              if (c(b[F], F, b) === !1) break;
            }
            return u;
          };
        }
        function w8(o, u, c) {
          var h = u & N,
            w = iu(o);
          function b() {
            var T = this && this !== _t && this instanceof b ? w : o;
            return T.apply(h ? c : this, arguments);
          }
          return b;
        }
        function rv(o) {
          return function (u) {
            u = $e(u);
            var c = Fo(u) ? nr(u) : n,
              h = c ? c[0] : u.charAt(0),
              w = c ? hi(c, 1).join("") : u.slice(1);
            return h[o]() + w;
          };
        }
        function Vo(o) {
          return function (u) {
            return ld(ty(ey(u).replace(a6, "")), o, "");
          };
        }
        function iu(o) {
          return function () {
            var u = arguments;
            switch (u.length) {
              case 0:
                return new o();
              case 1:
                return new o(u[0]);
              case 2:
                return new o(u[0], u[1]);
              case 3:
                return new o(u[0], u[1], u[2]);
              case 4:
                return new o(u[0], u[1], u[2], u[3]);
              case 5:
                return new o(u[0], u[1], u[2], u[3], u[4]);
              case 6:
                return new o(u[0], u[1], u[2], u[3], u[4], u[5]);
              case 7:
                return new o(u[0], u[1], u[2], u[3], u[4], u[5], u[6]);
            }
            var c = Wo(o.prototype),
              h = o.apply(c, u);
            return lt(h) ? h : c;
          };
        }
        function x8(o, u, c) {
          var h = iu(o);
          function w() {
            for (var b = arguments.length, T = z(b), R = b, F = Go(w); R--; )
              T[R] = arguments[R];
            var j = b < 3 && T[0] !== F && T[b - 1] !== F ? [] : ai(T, F);
            if (((b -= j.length), b < c))
              return sv(o, u, Xs, w.placeholder, n, T, j, n, n, c - b);
            var V = this && this !== _t && this instanceof w ? h : o;
            return dn(V, this, T);
          }
          return w;
        }
        function iv(o) {
          return function (u, c, h) {
            var w = je(u);
            if (!Zt(u)) {
              var b = de(c, 3);
              (u = Ct(u)),
                (c = function (R) {
                  return b(w[R], R, w);
                });
            }
            var T = o(u, c, h);
            return T > -1 ? w[b ? u[T] : T] : n;
          };
        }
        function ov(o) {
          return zr(function (u) {
            var c = u.length,
              h = c,
              w = $n.prototype.thru;
            for (o && u.reverse(); h--; ) {
              var b = u[h];
              if (typeof b != "function") throw new Fn(s);
              if (w && !T && ta(b) == "wrapper") var T = new $n([], !0);
            }
            for (h = T ? h : c; ++h < c; ) {
              b = u[h];
              var R = ta(b),
                F = R == "wrapper" ? Bd(b) : n;
              F &&
              jd(F[0]) &&
              F[1] == ($ | k | M | B) &&
              !F[4].length &&
              F[9] == 1
                ? (T = T[ta(F[0])].apply(T, F[3]))
                : (T = b.length == 1 && jd(b) ? T[R]() : T.thru(b));
            }
            return function () {
              var j = arguments,
                V = j[0];
              if (T && j.length == 1 && Ce(V)) return T.plant(V).value();
              for (var q = 0, ie = c ? u[q].apply(this, j) : V; ++q < c; )
                ie = u[q].call(this, ie);
              return ie;
            };
          });
        }
        function Xs(o, u, c, h, w, b, T, R, F, j) {
          var V = u & $,
            q = u & N,
            ie = u & y,
            ue = u & (k | I),
            pe = u & Y,
            _e = ie ? n : iu(o);
          function he() {
            for (var Te = arguments.length, Re = z(Te), mn = Te; mn--; )
              Re[mn] = arguments[mn];
            if (ue)
              var jt = Go(he),
                vn = A6(Re, jt);
            if (
              (h && (Re = J0(Re, h, w, ue)),
              b && (Re = ev(Re, b, T, ue)),
              (Te -= vn),
              ue && Te < j)
            ) {
              var ht = ai(Re, jt);
              return sv(o, u, Xs, he.placeholder, c, Re, ht, R, F, j - Te);
            }
            var or = q ? c : this,
              Wr = ie ? or[o] : o;
            return (
              (Te = Re.length),
              R ? (Re = B8(Re, R)) : pe && Te > 1 && Re.reverse(),
              V && F < Te && (Re.length = F),
              this && this !== _t && this instanceof he && (Wr = _e || iu(Wr)),
              Wr.apply(or, Re)
            );
          }
          return he;
        }
        function lv(o, u) {
          return function (c, h) {
            return KC(c, o, u(h), {});
          };
        }
        function Zs(o, u) {
          return function (c, h) {
            var w;
            if (c === n && h === n) return u;
            if ((c !== n && (w = c), h !== n)) {
              if (w === n) return h;
              typeof c == "string" || typeof h == "string"
                ? ((c = hn(c)), (h = hn(h)))
                : ((c = V0(c)), (h = V0(h))),
                (w = o(c, h));
            }
            return w;
          };
        }
        function Md(o) {
          return zr(function (u) {
            return (
              (u = rt(u, pn(de()))),
              Oe(function (c) {
                var h = this;
                return o(u, function (w) {
                  return dn(w, h, c);
                });
              })
            );
          });
        }
        function Js(o, u) {
          u = u === n ? " " : hn(u);
          var c = u.length;
          if (c < 2) return c ? Id(u, o) : u;
          var h = Id(u, zs(o / $o(u)));
          return Fo(u) ? hi(nr(h), 0, o).join("") : h.slice(0, o);
        }
        function S8(o, u, c, h) {
          var w = u & N,
            b = iu(o);
          function T() {
            for (
              var R = -1,
                F = arguments.length,
                j = -1,
                V = h.length,
                q = z(V + F),
                ie = this && this !== _t && this instanceof T ? b : o;
              ++j < V;

            )
              q[j] = h[j];
            for (; F--; ) q[j++] = arguments[++R];
            return dn(ie, w ? c : this, q);
          }
          return T;
        }
        function uv(o) {
          return function (u, c, h) {
            return (
              h && typeof h != "number" && Wt(u, c, h) && (c = h = n),
              (u = Ur(u)),
              c === n ? ((c = u), (u = 0)) : (c = Ur(c)),
              (h = h === n ? (u < c ? 1 : -1) : Ur(h)),
              l8(u, c, h, o)
            );
          };
        }
        function ea(o) {
          return function (u, c) {
            return (
              (typeof u == "string" && typeof c == "string") ||
                ((u = Un(u)), (c = Un(c))),
              o(u, c)
            );
          };
        }
        function sv(o, u, c, h, w, b, T, R, F, j) {
          var V = u & k,
            q = V ? T : n,
            ie = V ? n : T,
            ue = V ? b : n,
            pe = V ? n : b;
          (u |= V ? M : P), (u &= ~(V ? P : M)), u & x || (u &= ~(N | y));
          var _e = [o, u, w, ue, q, pe, ie, R, F, j],
            he = c.apply(n, _e);
          return jd(o) && xv(he, _e), (he.placeholder = h), Sv(he, o, u);
        }
        function Fd(o) {
          var u = yt[o];
          return function (c, h) {
            if (
              ((c = Un(c)), (h = h == null ? 0 : Rt(be(h), 292)), h && S0(c))
            ) {
              var w = ($e(c) + "e").split("e"),
                b = u(w[0] + "e" + (+w[1] + h));
              return (
                (w = ($e(b) + "e").split("e")), +(w[0] + "e" + (+w[1] - h))
              );
            }
            return u(c);
          };
        }
        var C8 =
          Ho && 1 / Is(new Ho([, -0]))[1] == me
            ? function (o) {
                return new Ho(o);
              }
            : op;
        function av(o) {
          return function (u) {
            var c = At(u);
            return c == cn ? pd(u) : c == Yt ? z6(u) : R6(u, o(u));
          };
        }
        function $r(o, u, c, h, w, b, T, R) {
          var F = u & y;
          if (!F && typeof o != "function") throw new Fn(s);
          var j = h ? h.length : 0;
          if (
            (j || ((u &= ~(M | P)), (h = w = n)),
            (T = T === n ? T : wt(be(T), 0)),
            (R = R === n ? R : be(R)),
            (j -= w ? w.length : 0),
            u & P)
          ) {
            var V = h,
              q = w;
            h = w = n;
          }
          var ie = F ? n : Bd(o),
            ue = [o, u, c, h, w, V, q, b, T, R];
          if (
            (ie && F8(ue, ie),
            (o = ue[0]),
            (u = ue[1]),
            (c = ue[2]),
            (h = ue[3]),
            (w = ue[4]),
            (R = ue[9] = ue[9] === n ? (F ? 0 : o.length) : wt(ue[9] - j, 0)),
            !R && u & (k | I) && (u &= ~(k | I)),
            !u || u == N)
          )
            var pe = w8(o, u, c);
          else
            u == k || u == I
              ? (pe = x8(o, u, R))
              : (u == M || u == (N | M)) && !w.length
              ? (pe = S8(o, u, c, h))
              : (pe = Xs.apply(n, ue));
          var _e = ie ? W0 : xv;
          return Sv(_e(pe, ue), o, u);
        }
        function cv(o, u, c, h) {
          return o === n || (ir(o, Bo[c]) && !ze.call(h, c)) ? u : o;
        }
        function fv(o, u, c, h, w, b) {
          return (
            lt(o) && lt(u) && (b.set(u, o), qs(o, u, n, fv, b), b.delete(u)), o
          );
        }
        function E8(o) {
          return uu(o) ? n : o;
        }
        function dv(o, u, c, h, w, b) {
          var T = c & E,
            R = o.length,
            F = u.length;
          if (R != F && !(T && F > R)) return !1;
          var j = b.get(o),
            V = b.get(u);
          if (j && V) return j == u && V == o;
          var q = -1,
            ie = !0,
            ue = c & S ? new eo() : n;
          for (b.set(o, u), b.set(u, o); ++q < R; ) {
            var pe = o[q],
              _e = u[q];
            if (h) var he = T ? h(_e, pe, q, u, o, b) : h(pe, _e, q, o, u, b);
            if (he !== n) {
              if (he) continue;
              ie = !1;
              break;
            }
            if (ue) {
              if (
                !ud(u, function (Te, Re) {
                  if (!ql(ue, Re) && (pe === Te || w(pe, Te, c, h, b)))
                    return ue.push(Re);
                })
              ) {
                ie = !1;
                break;
              }
            } else if (!(pe === _e || w(pe, _e, c, h, b))) {
              ie = !1;
              break;
            }
          }
          return b.delete(o), b.delete(u), ie;
        }
        function k8(o, u, c, h, w, b, T) {
          switch (c) {
            case J:
              if (o.byteLength != u.byteLength || o.byteOffset != u.byteOffset)
                return !1;
              (o = o.buffer), (u = u.buffer);
            case H:
              return !(
                o.byteLength != u.byteLength || !b(new Ls(o), new Ls(u))
              );
            case ct:
            case Bt:
            case Ki:
              return ir(+o, +u);
            case oi:
              return o.name == u.name && o.message == u.message;
            case li:
            case Qi:
              return o == u + "";
            case cn:
              var R = pd;
            case Yt:
              var F = h & E;
              if ((R || (R = Is), o.size != u.size && !F)) return !1;
              var j = T.get(o);
              if (j) return j == u;
              (h |= S), T.set(o, u);
              var V = dv(R(o), R(u), h, w, b, T);
              return T.delete(o), V;
            case No:
              if (Zl) return Zl.call(o) == Zl.call(u);
          }
          return !1;
        }
        function b8(o, u, c, h, w, b) {
          var T = c & E,
            R = $d(o),
            F = R.length,
            j = $d(u),
            V = j.length;
          if (F != V && !T) return !1;
          for (var q = F; q--; ) {
            var ie = R[q];
            if (!(T ? ie in u : ze.call(u, ie))) return !1;
          }
          var ue = b.get(o),
            pe = b.get(u);
          if (ue && pe) return ue == u && pe == o;
          var _e = !0;
          b.set(o, u), b.set(u, o);
          for (var he = T; ++q < F; ) {
            ie = R[q];
            var Te = o[ie],
              Re = u[ie];
            if (h) var mn = T ? h(Re, Te, ie, u, o, b) : h(Te, Re, ie, o, u, b);
            if (!(mn === n ? Te === Re || w(Te, Re, c, h, b) : mn)) {
              _e = !1;
              break;
            }
            he || (he = ie == "constructor");
          }
          if (_e && !he) {
            var jt = o.constructor,
              vn = u.constructor;
            jt != vn &&
              "constructor" in o &&
              "constructor" in u &&
              !(
                typeof jt == "function" &&
                jt instanceof jt &&
                typeof vn == "function" &&
                vn instanceof vn
              ) &&
              (_e = !1);
          }
          return b.delete(o), b.delete(u), _e;
        }
        function zr(o) {
          return Gd(yv(o, n, Ov), o + "");
        }
        function $d(o) {
          return A0(o, Ct, Ud);
        }
        function zd(o) {
          return A0(o, Jt, pv);
        }
        var Bd = Hs
          ? function (o) {
              return Hs.get(o);
            }
          : op;
        function ta(o) {
          for (
            var u = o.name + "", c = Uo[u], h = ze.call(Uo, u) ? c.length : 0;
            h--;

          ) {
            var w = c[h],
              b = w.func;
            if (b == null || b == o) return w.name;
          }
          return u;
        }
        function Go(o) {
          var u = ze.call(C, "placeholder") ? C : o;
          return u.placeholder;
        }
        function de() {
          var o = C.iteratee || rp;
          return (
            (o = o === rp ? L0 : o),
            arguments.length ? o(arguments[0], arguments[1]) : o
          );
        }
        function na(o, u) {
          var c = o.__data__;
          return D8(u) ? c[typeof u == "string" ? "string" : "hash"] : c.map;
        }
        function Hd(o) {
          for (var u = Ct(o), c = u.length; c--; ) {
            var h = u[c],
              w = o[h];
            u[c] = [h, w, mv(w)];
          }
          return u;
        }
        function ro(o, u) {
          var c = M6(o, u);
          return N0(c) ? c : n;
        }
        function _8(o) {
          var u = ze.call(o, Zi),
            c = o[Zi];
          try {
            o[Zi] = n;
            var h = !0;
          } catch {}
          var w = Ds.call(o);
          return h && (u ? (o[Zi] = c) : delete o[Zi]), w;
        }
        var Ud = gd
            ? function (o) {
                return o == null
                  ? []
                  : ((o = je(o)),
                    ui(gd(o), function (u) {
                      return w0.call(o, u);
                    }));
              }
            : lp,
          pv = gd
            ? function (o) {
                for (var u = []; o; ) si(u, Ud(o)), (o = Ms(o));
                return u;
              }
            : lp,
          At = Ut;
        ((md && At(new md(new ArrayBuffer(1))) != J) ||
          (Ql && At(new Ql()) != cn) ||
          (vd && At(vd.resolve()) != Vl) ||
          (Ho && At(new Ho()) != Yt) ||
          (Yl && At(new Yl()) != Yi)) &&
          (At = function (o) {
            var u = Ut(o),
              c = u == Dn ? o.constructor : n,
              h = c ? io(c) : "";
            if (h)
              switch (h) {
                case sC:
                  return J;
                case aC:
                  return cn;
                case cC:
                  return Vl;
                case fC:
                  return Yt;
                case dC:
                  return Yi;
              }
            return u;
          });
        function O8(o, u, c) {
          for (var h = -1, w = c.length; ++h < w; ) {
            var b = c[h],
              T = b.size;
            switch (b.type) {
              case "drop":
                o += T;
                break;
              case "dropRight":
                u -= T;
                break;
              case "take":
                u = Rt(u, o + T);
                break;
              case "takeRight":
                o = wt(o, u - T);
                break;
            }
          }
          return { start: o, end: u };
        }
        function T8(o) {
          var u = o.match(NS);
          return u ? u[1].split(LS) : [];
        }
        function hv(o, u, c) {
          u = pi(u, o);
          for (var h = -1, w = u.length, b = !1; ++h < w; ) {
            var T = wr(u[h]);
            if (!(b = o != null && c(o, T))) break;
            o = o[T];
          }
          return b || ++h != w
            ? b
            : ((w = o == null ? 0 : o.length),
              !!w && aa(w) && Br(T, w) && (Ce(o) || oo(o)));
        }
        function I8(o) {
          var u = o.length,
            c = new o.constructor(u);
          return (
            u &&
              typeof o[0] == "string" &&
              ze.call(o, "index") &&
              ((c.index = o.index), (c.input = o.input)),
            c
          );
        }
        function gv(o) {
          return typeof o.constructor == "function" && !ou(o) ? Wo(Ms(o)) : {};
        }
        function P8(o, u, c) {
          var h = o.constructor;
          switch (u) {
            case H:
              return Ld(o);
            case ct:
            case Bt:
              return new h(+o);
            case J:
              return p8(o, c);
            case fe:
            case De:
            case Ne:
            case Ht:
            case Nn:
            case fn:
            case Dr:
            case Nr:
            case Ze:
              return X0(o, c);
            case cn:
              return new h();
            case Ki:
            case Qi:
              return new h(o);
            case li:
              return h8(o);
            case Yt:
              return new h();
            case No:
              return g8(o);
          }
        }
        function R8(o, u) {
          var c = u.length;
          if (!c) return o;
          var h = c - 1;
          return (
            (u[h] = (c > 1 ? "& " : "") + u[h]),
            (u = u.join(c > 2 ? ", " : " ")),
            o.replace(
              DS,
              `{
/* [wrapped with ` +
                u +
                `] */
`
            )
          );
        }
        function A8(o) {
          return Ce(o) || oo(o) || !!(x0 && o && o[x0]);
        }
        function Br(o, u) {
          var c = typeof o;
          return (
            (u = u ?? W),
            !!u &&
              (c == "number" || (c != "symbol" && jS.test(o))) &&
              o > -1 &&
              o % 1 == 0 &&
              o < u
          );
        }
        function Wt(o, u, c) {
          if (!lt(c)) return !1;
          var h = typeof u;
          return (
            h == "number" ? Zt(c) && Br(u, c.length) : h == "string" && u in c
          )
            ? ir(c[u], o)
            : !1;
        }
        function Wd(o, u) {
          if (Ce(o)) return !1;
          var c = typeof o;
          return c == "number" ||
            c == "symbol" ||
            c == "boolean" ||
            o == null ||
            gn(o)
            ? !0
            : IS.test(o) || !TS.test(o) || (u != null && o in je(u));
        }
        function D8(o) {
          var u = typeof o;
          return u == "string" ||
            u == "number" ||
            u == "symbol" ||
            u == "boolean"
            ? o !== "__proto__"
            : o === null;
        }
        function jd(o) {
          var u = ta(o),
            c = C[u];
          if (typeof c != "function" || !(u in Pe.prototype)) return !1;
          if (o === c) return !0;
          var h = Bd(c);
          return !!h && o === h[0];
        }
        function N8(o) {
          return !!m0 && m0 in o;
        }
        var L8 = Rs ? Hr : up;
        function ou(o) {
          var u = o && o.constructor,
            c = (typeof u == "function" && u.prototype) || Bo;
          return o === c;
        }
        function mv(o) {
          return o === o && !lt(o);
        }
        function vv(o, u) {
          return function (c) {
            return c == null ? !1 : c[o] === u && (u !== n || o in je(c));
          };
        }
        function M8(o) {
          var u = ua(o, function (h) {
              return c.size === d && c.clear(), h;
            }),
            c = u.cache;
          return u;
        }
        function F8(o, u) {
          var c = o[1],
            h = u[1],
            w = c | h,
            b = w < (N | y | $),
            T =
              (h == $ && c == k) ||
              (h == $ && c == B && o[7].length <= u[8]) ||
              (h == ($ | B) && u[7].length <= u[8] && c == k);
          if (!(b || T)) return o;
          h & N && ((o[2] = u[2]), (w |= c & N ? 0 : x));
          var R = u[3];
          if (R) {
            var F = o[3];
            (o[3] = F ? J0(F, R, u[4]) : R), (o[4] = F ? ai(o[3], p) : u[4]);
          }
          return (
            (R = u[5]),
            R &&
              ((F = o[5]),
              (o[5] = F ? ev(F, R, u[6]) : R),
              (o[6] = F ? ai(o[5], p) : u[6])),
            (R = u[7]),
            R && (o[7] = R),
            h & $ && (o[8] = o[8] == null ? u[8] : Rt(o[8], u[8])),
            o[9] == null && (o[9] = u[9]),
            (o[0] = u[0]),
            (o[1] = w),
            o
          );
        }
        function $8(o) {
          var u = [];
          if (o != null) for (var c in je(o)) u.push(c);
          return u;
        }
        function z8(o) {
          return Ds.call(o);
        }
        function yv(o, u, c) {
          return (
            (u = wt(u === n ? o.length - 1 : u, 0)),
            function () {
              for (
                var h = arguments, w = -1, b = wt(h.length - u, 0), T = z(b);
                ++w < b;

              )
                T[w] = h[u + w];
              w = -1;
              for (var R = z(u + 1); ++w < u; ) R[w] = h[w];
              return (R[u] = c(T)), dn(o, this, R);
            }
          );
        }
        function wv(o, u) {
          return u.length < 2 ? o : no(o, Bn(u, 0, -1));
        }
        function B8(o, u) {
          for (var c = o.length, h = Rt(u.length, c), w = Xt(o); h--; ) {
            var b = u[h];
            o[h] = Br(b, c) ? w[b] : n;
          }
          return o;
        }
        function Vd(o, u) {
          if (
            !(u === "constructor" && typeof o[u] == "function") &&
            u != "__proto__"
          )
            return o[u];
        }
        var xv = Cv(W0),
          lu =
            tC ||
            function (o, u) {
              return _t.setTimeout(o, u);
            },
          Gd = Cv(a8);
        function Sv(o, u, c) {
          var h = u + "";
          return Gd(o, R8(h, H8(T8(h), c)));
        }
        function Cv(o) {
          var u = 0,
            c = 0;
          return function () {
            var h = oC(),
              w = re - (h - c);
            if (((c = h), w > 0)) {
              if (++u >= Z) return arguments[0];
            } else u = 0;
            return o.apply(n, arguments);
          };
        }
        function ra(o, u) {
          var c = -1,
            h = o.length,
            w = h - 1;
          for (u = u === n ? h : u; ++c < u; ) {
            var b = Td(c, w),
              T = o[b];
            (o[b] = o[c]), (o[c] = T);
          }
          return (o.length = u), o;
        }
        var Ev = M8(function (o) {
          var u = [];
          return (
            o.charCodeAt(0) === 46 && u.push(""),
            o.replace(PS, function (c, h, w, b) {
              u.push(w ? b.replace($S, "$1") : h || c);
            }),
            u
          );
        });
        function wr(o) {
          if (typeof o == "string" || gn(o)) return o;
          var u = o + "";
          return u == "0" && 1 / o == -me ? "-0" : u;
        }
        function io(o) {
          if (o != null) {
            try {
              return As.call(o);
            } catch {}
            try {
              return o + "";
            } catch {}
          }
          return "";
        }
        function H8(o, u) {
          return (
            Mn(ve, function (c) {
              var h = "_." + c[0];
              u & c[1] && !Os(o, h) && o.push(h);
            }),
            o.sort()
          );
        }
        function kv(o) {
          if (o instanceof Pe) return o.clone();
          var u = new $n(o.__wrapped__, o.__chain__);
          return (
            (u.__actions__ = Xt(o.__actions__)),
            (u.__index__ = o.__index__),
            (u.__values__ = o.__values__),
            u
          );
        }
        function U8(o, u, c) {
          (c ? Wt(o, u, c) : u === n) ? (u = 1) : (u = wt(be(u), 0));
          var h = o == null ? 0 : o.length;
          if (!h || u < 1) return [];
          for (var w = 0, b = 0, T = z(zs(h / u)); w < h; )
            T[b++] = Bn(o, w, (w += u));
          return T;
        }
        function W8(o) {
          for (
            var u = -1, c = o == null ? 0 : o.length, h = 0, w = [];
            ++u < c;

          ) {
            var b = o[u];
            b && (w[h++] = b);
          }
          return w;
        }
        function j8() {
          var o = arguments.length;
          if (!o) return [];
          for (var u = z(o - 1), c = arguments[0], h = o; h--; )
            u[h - 1] = arguments[h];
          return si(Ce(c) ? Xt(c) : [c], Ot(u, 1));
        }
        var V8 = Oe(function (o, u) {
            return pt(o) ? eu(o, Ot(u, 1, pt, !0)) : [];
          }),
          G8 = Oe(function (o, u) {
            var c = Hn(u);
            return (
              pt(c) && (c = n), pt(o) ? eu(o, Ot(u, 1, pt, !0), de(c, 2)) : []
            );
          }),
          q8 = Oe(function (o, u) {
            var c = Hn(u);
            return pt(c) && (c = n), pt(o) ? eu(o, Ot(u, 1, pt, !0), n, c) : [];
          });
        function K8(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : be(u)), Bn(o, u < 0 ? 0 : u, h))
            : [];
        }
        function Q8(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : be(u)),
              (u = h - u),
              Bn(o, 0, u < 0 ? 0 : u))
            : [];
        }
        function Y8(o, u) {
          return o && o.length ? Qs(o, de(u, 3), !0, !0) : [];
        }
        function X8(o, u) {
          return o && o.length ? Qs(o, de(u, 3), !0) : [];
        }
        function Z8(o, u, c, h) {
          var w = o == null ? 0 : o.length;
          return w
            ? (c && typeof c != "number" && Wt(o, u, c) && ((c = 0), (h = w)),
              jC(o, u, c, h))
            : [];
        }
        function bv(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var w = c == null ? 0 : be(c);
          return w < 0 && (w = wt(h + w, 0)), Ts(o, de(u, 3), w);
        }
        function _v(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var w = h - 1;
          return (
            c !== n && ((w = be(c)), (w = c < 0 ? wt(h + w, 0) : Rt(w, h - 1))),
            Ts(o, de(u, 3), w, !0)
          );
        }
        function Ov(o) {
          var u = o == null ? 0 : o.length;
          return u ? Ot(o, 1) : [];
        }
        function J8(o) {
          var u = o == null ? 0 : o.length;
          return u ? Ot(o, me) : [];
        }
        function eE(o, u) {
          var c = o == null ? 0 : o.length;
          return c ? ((u = u === n ? 1 : be(u)), Ot(o, u)) : [];
        }
        function tE(o) {
          for (var u = -1, c = o == null ? 0 : o.length, h = {}; ++u < c; ) {
            var w = o[u];
            h[w[0]] = w[1];
          }
          return h;
        }
        function Tv(o) {
          return o && o.length ? o[0] : n;
        }
        function nE(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var w = c == null ? 0 : be(c);
          return w < 0 && (w = wt(h + w, 0)), Mo(o, u, w);
        }
        function rE(o) {
          var u = o == null ? 0 : o.length;
          return u ? Bn(o, 0, -1) : [];
        }
        var iE = Oe(function (o) {
            var u = rt(o, Dd);
            return u.length && u[0] === o[0] ? Ed(u) : [];
          }),
          oE = Oe(function (o) {
            var u = Hn(o),
              c = rt(o, Dd);
            return (
              u === Hn(c) ? (u = n) : c.pop(),
              c.length && c[0] === o[0] ? Ed(c, de(u, 2)) : []
            );
          }),
          lE = Oe(function (o) {
            var u = Hn(o),
              c = rt(o, Dd);
            return (
              (u = typeof u == "function" ? u : n),
              u && c.pop(),
              c.length && c[0] === o[0] ? Ed(c, n, u) : []
            );
          });
        function uE(o, u) {
          return o == null ? "" : rC.call(o, u);
        }
        function Hn(o) {
          var u = o == null ? 0 : o.length;
          return u ? o[u - 1] : n;
        }
        function sE(o, u, c) {
          var h = o == null ? 0 : o.length;
          if (!h) return -1;
          var w = h;
          return (
            c !== n && ((w = be(c)), (w = w < 0 ? wt(h + w, 0) : Rt(w, h - 1))),
            u === u ? H6(o, u, w) : Ts(o, s0, w, !0)
          );
        }
        function aE(o, u) {
          return o && o.length ? z0(o, be(u)) : n;
        }
        var cE = Oe(Iv);
        function Iv(o, u) {
          return o && o.length && u && u.length ? Od(o, u) : o;
        }
        function fE(o, u, c) {
          return o && o.length && u && u.length ? Od(o, u, de(c, 2)) : o;
        }
        function dE(o, u, c) {
          return o && o.length && u && u.length ? Od(o, u, n, c) : o;
        }
        var pE = zr(function (o, u) {
          var c = o == null ? 0 : o.length,
            h = wd(o, u);
          return (
            U0(
              o,
              rt(u, function (w) {
                return Br(w, c) ? +w : w;
              }).sort(Z0)
            ),
            h
          );
        });
        function hE(o, u) {
          var c = [];
          if (!(o && o.length)) return c;
          var h = -1,
            w = [],
            b = o.length;
          for (u = de(u, 3); ++h < b; ) {
            var T = o[h];
            u(T, h, o) && (c.push(T), w.push(h));
          }
          return U0(o, w), c;
        }
        function qd(o) {
          return o == null ? o : uC.call(o);
        }
        function gE(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? (c && typeof c != "number" && Wt(o, u, c)
                ? ((u = 0), (c = h))
                : ((u = u == null ? 0 : be(u)), (c = c === n ? h : be(c))),
              Bn(o, u, c))
            : [];
        }
        function mE(o, u) {
          return Ks(o, u);
        }
        function vE(o, u, c) {
          return Pd(o, u, de(c, 2));
        }
        function yE(o, u) {
          var c = o == null ? 0 : o.length;
          if (c) {
            var h = Ks(o, u);
            if (h < c && ir(o[h], u)) return h;
          }
          return -1;
        }
        function wE(o, u) {
          return Ks(o, u, !0);
        }
        function xE(o, u, c) {
          return Pd(o, u, de(c, 2), !0);
        }
        function SE(o, u) {
          var c = o == null ? 0 : o.length;
          if (c) {
            var h = Ks(o, u, !0) - 1;
            if (ir(o[h], u)) return h;
          }
          return -1;
        }
        function CE(o) {
          return o && o.length ? j0(o) : [];
        }
        function EE(o, u) {
          return o && o.length ? j0(o, de(u, 2)) : [];
        }
        function kE(o) {
          var u = o == null ? 0 : o.length;
          return u ? Bn(o, 1, u) : [];
        }
        function bE(o, u, c) {
          return o && o.length
            ? ((u = c || u === n ? 1 : be(u)), Bn(o, 0, u < 0 ? 0 : u))
            : [];
        }
        function _E(o, u, c) {
          var h = o == null ? 0 : o.length;
          return h
            ? ((u = c || u === n ? 1 : be(u)),
              (u = h - u),
              Bn(o, u < 0 ? 0 : u, h))
            : [];
        }
        function OE(o, u) {
          return o && o.length ? Qs(o, de(u, 3), !1, !0) : [];
        }
        function TE(o, u) {
          return o && o.length ? Qs(o, de(u, 3)) : [];
        }
        var IE = Oe(function (o) {
            return di(Ot(o, 1, pt, !0));
          }),
          PE = Oe(function (o) {
            var u = Hn(o);
            return pt(u) && (u = n), di(Ot(o, 1, pt, !0), de(u, 2));
          }),
          RE = Oe(function (o) {
            var u = Hn(o);
            return (
              (u = typeof u == "function" ? u : n), di(Ot(o, 1, pt, !0), n, u)
            );
          });
        function AE(o) {
          return o && o.length ? di(o) : [];
        }
        function DE(o, u) {
          return o && o.length ? di(o, de(u, 2)) : [];
        }
        function NE(o, u) {
          return (
            (u = typeof u == "function" ? u : n),
            o && o.length ? di(o, n, u) : []
          );
        }
        function Kd(o) {
          if (!(o && o.length)) return [];
          var u = 0;
          return (
            (o = ui(o, function (c) {
              if (pt(c)) return (u = wt(c.length, u)), !0;
            })),
            fd(u, function (c) {
              return rt(o, sd(c));
            })
          );
        }
        function Pv(o, u) {
          if (!(o && o.length)) return [];
          var c = Kd(o);
          return u == null
            ? c
            : rt(c, function (h) {
                return dn(u, n, h);
              });
        }
        var LE = Oe(function (o, u) {
            return pt(o) ? eu(o, u) : [];
          }),
          ME = Oe(function (o) {
            return Ad(ui(o, pt));
          }),
          FE = Oe(function (o) {
            var u = Hn(o);
            return pt(u) && (u = n), Ad(ui(o, pt), de(u, 2));
          }),
          $E = Oe(function (o) {
            var u = Hn(o);
            return (u = typeof u == "function" ? u : n), Ad(ui(o, pt), n, u);
          }),
          zE = Oe(Kd);
        function BE(o, u) {
          return K0(o || [], u || [], Jl);
        }
        function HE(o, u) {
          return K0(o || [], u || [], ru);
        }
        var UE = Oe(function (o) {
          var u = o.length,
            c = u > 1 ? o[u - 1] : n;
          return (c = typeof c == "function" ? (o.pop(), c) : n), Pv(o, c);
        });
        function Rv(o) {
          var u = C(o);
          return (u.__chain__ = !0), u;
        }
        function WE(o, u) {
          return u(o), o;
        }
        function ia(o, u) {
          return u(o);
        }
        var jE = zr(function (o) {
          var u = o.length,
            c = u ? o[0] : 0,
            h = this.__wrapped__,
            w = function (b) {
              return wd(b, o);
            };
          return u > 1 ||
            this.__actions__.length ||
            !(h instanceof Pe) ||
            !Br(c)
            ? this.thru(w)
            : ((h = h.slice(c, +c + (u ? 1 : 0))),
              h.__actions__.push({ func: ia, args: [w], thisArg: n }),
              new $n(h, this.__chain__).thru(function (b) {
                return u && !b.length && b.push(n), b;
              }));
        });
        function VE() {
          return Rv(this);
        }
        function GE() {
          return new $n(this.value(), this.__chain__);
        }
        function qE() {
          this.__values__ === n && (this.__values__ = Vv(this.value()));
          var o = this.__index__ >= this.__values__.length,
            u = o ? n : this.__values__[this.__index__++];
          return { done: o, value: u };
        }
        function KE() {
          return this;
        }
        function QE(o) {
          for (var u, c = this; c instanceof Ws; ) {
            var h = kv(c);
            (h.__index__ = 0),
              (h.__values__ = n),
              u ? (w.__wrapped__ = h) : (u = h);
            var w = h;
            c = c.__wrapped__;
          }
          return (w.__wrapped__ = o), u;
        }
        function YE() {
          var o = this.__wrapped__;
          if (o instanceof Pe) {
            var u = o;
            return (
              this.__actions__.length && (u = new Pe(this)),
              (u = u.reverse()),
              u.__actions__.push({ func: ia, args: [qd], thisArg: n }),
              new $n(u, this.__chain__)
            );
          }
          return this.thru(qd);
        }
        function XE() {
          return q0(this.__wrapped__, this.__actions__);
        }
        var ZE = Ys(function (o, u, c) {
          ze.call(o, c) ? ++o[c] : Fr(o, c, 1);
        });
        function JE(o, u, c) {
          var h = Ce(o) ? l0 : WC;
          return c && Wt(o, u, c) && (u = n), h(o, de(u, 3));
        }
        function e7(o, u) {
          var c = Ce(o) ? ui : P0;
          return c(o, de(u, 3));
        }
        var t7 = iv(bv),
          n7 = iv(_v);
        function r7(o, u) {
          return Ot(oa(o, u), 1);
        }
        function i7(o, u) {
          return Ot(oa(o, u), me);
        }
        function o7(o, u, c) {
          return (c = c === n ? 1 : be(c)), Ot(oa(o, u), c);
        }
        function Av(o, u) {
          var c = Ce(o) ? Mn : fi;
          return c(o, de(u, 3));
        }
        function Dv(o, u) {
          var c = Ce(o) ? k6 : I0;
          return c(o, de(u, 3));
        }
        var l7 = Ys(function (o, u, c) {
          ze.call(o, c) ? o[c].push(u) : Fr(o, c, [u]);
        });
        function u7(o, u, c, h) {
          (o = Zt(o) ? o : Ko(o)), (c = c && !h ? be(c) : 0);
          var w = o.length;
          return (
            c < 0 && (c = wt(w + c, 0)),
            ca(o) ? c <= w && o.indexOf(u, c) > -1 : !!w && Mo(o, u, c) > -1
          );
        }
        var s7 = Oe(function (o, u, c) {
            var h = -1,
              w = typeof u == "function",
              b = Zt(o) ? z(o.length) : [];
            return (
              fi(o, function (T) {
                b[++h] = w ? dn(u, T, c) : tu(T, u, c);
              }),
              b
            );
          }),
          a7 = Ys(function (o, u, c) {
            Fr(o, c, u);
          });
        function oa(o, u) {
          var c = Ce(o) ? rt : M0;
          return c(o, de(u, 3));
        }
        function c7(o, u, c, h) {
          return o == null
            ? []
            : (Ce(u) || (u = u == null ? [] : [u]),
              (c = h ? n : c),
              Ce(c) || (c = c == null ? [] : [c]),
              B0(o, u, c));
        }
        var f7 = Ys(
          function (o, u, c) {
            o[c ? 0 : 1].push(u);
          },
          function () {
            return [[], []];
          }
        );
        function d7(o, u, c) {
          var h = Ce(o) ? ld : c0,
            w = arguments.length < 3;
          return h(o, de(u, 4), c, w, fi);
        }
        function p7(o, u, c) {
          var h = Ce(o) ? b6 : c0,
            w = arguments.length < 3;
          return h(o, de(u, 4), c, w, I0);
        }
        function h7(o, u) {
          var c = Ce(o) ? ui : P0;
          return c(o, sa(de(u, 3)));
        }
        function g7(o) {
          var u = Ce(o) ? b0 : u8;
          return u(o);
        }
        function m7(o, u, c) {
          (c ? Wt(o, u, c) : u === n) ? (u = 1) : (u = be(u));
          var h = Ce(o) ? $C : s8;
          return h(o, u);
        }
        function v7(o) {
          var u = Ce(o) ? zC : c8;
          return u(o);
        }
        function y7(o) {
          if (o == null) return 0;
          if (Zt(o)) return ca(o) ? $o(o) : o.length;
          var u = At(o);
          return u == cn || u == Yt ? o.size : bd(o).length;
        }
        function w7(o, u, c) {
          var h = Ce(o) ? ud : f8;
          return c && Wt(o, u, c) && (u = n), h(o, de(u, 3));
        }
        var x7 = Oe(function (o, u) {
            if (o == null) return [];
            var c = u.length;
            return (
              c > 1 && Wt(o, u[0], u[1])
                ? (u = [])
                : c > 2 && Wt(u[0], u[1], u[2]) && (u = [u[0]]),
              B0(o, Ot(u, 1), [])
            );
          }),
          la =
            eC ||
            function () {
              return _t.Date.now();
            };
        function S7(o, u) {
          if (typeof u != "function") throw new Fn(s);
          return (
            (o = be(o)),
            function () {
              if (--o < 1) return u.apply(this, arguments);
            }
          );
        }
        function Nv(o, u, c) {
          return (
            (u = c ? n : u),
            (u = o && u == null ? o.length : u),
            $r(o, $, n, n, n, n, u)
          );
        }
        function Lv(o, u) {
          var c;
          if (typeof u != "function") throw new Fn(s);
          return (
            (o = be(o)),
            function () {
              return (
                --o > 0 && (c = u.apply(this, arguments)), o <= 1 && (u = n), c
              );
            }
          );
        }
        var Qd = Oe(function (o, u, c) {
            var h = N;
            if (c.length) {
              var w = ai(c, Go(Qd));
              h |= M;
            }
            return $r(o, h, u, c, w);
          }),
          Mv = Oe(function (o, u, c) {
            var h = N | y;
            if (c.length) {
              var w = ai(c, Go(Mv));
              h |= M;
            }
            return $r(u, h, o, c, w);
          });
        function Fv(o, u, c) {
          u = c ? n : u;
          var h = $r(o, k, n, n, n, n, n, u);
          return (h.placeholder = Fv.placeholder), h;
        }
        function $v(o, u, c) {
          u = c ? n : u;
          var h = $r(o, I, n, n, n, n, n, u);
          return (h.placeholder = $v.placeholder), h;
        }
        function zv(o, u, c) {
          var h,
            w,
            b,
            T,
            R,
            F,
            j = 0,
            V = !1,
            q = !1,
            ie = !0;
          if (typeof o != "function") throw new Fn(s);
          (u = Un(u) || 0),
            lt(c) &&
              ((V = !!c.leading),
              (q = "maxWait" in c),
              (b = q ? wt(Un(c.maxWait) || 0, u) : b),
              (ie = "trailing" in c ? !!c.trailing : ie));
          function ue(ht) {
            var or = h,
              Wr = w;
            return (h = w = n), (j = ht), (T = o.apply(Wr, or)), T;
          }
          function pe(ht) {
            return (j = ht), (R = lu(Te, u)), V ? ue(ht) : T;
          }
          function _e(ht) {
            var or = ht - F,
              Wr = ht - j,
              iy = u - or;
            return q ? Rt(iy, b - Wr) : iy;
          }
          function he(ht) {
            var or = ht - F,
              Wr = ht - j;
            return F === n || or >= u || or < 0 || (q && Wr >= b);
          }
          function Te() {
            var ht = la();
            if (he(ht)) return Re(ht);
            R = lu(Te, _e(ht));
          }
          function Re(ht) {
            return (R = n), ie && h ? ue(ht) : ((h = w = n), T);
          }
          function mn() {
            R !== n && Q0(R), (j = 0), (h = F = w = R = n);
          }
          function jt() {
            return R === n ? T : Re(la());
          }
          function vn() {
            var ht = la(),
              or = he(ht);
            if (((h = arguments), (w = this), (F = ht), or)) {
              if (R === n) return pe(F);
              if (q) return Q0(R), (R = lu(Te, u)), ue(F);
            }
            return R === n && (R = lu(Te, u)), T;
          }
          return (vn.cancel = mn), (vn.flush = jt), vn;
        }
        var C7 = Oe(function (o, u) {
            return T0(o, 1, u);
          }),
          E7 = Oe(function (o, u, c) {
            return T0(o, Un(u) || 0, c);
          });
        function k7(o) {
          return $r(o, Y);
        }
        function ua(o, u) {
          if (typeof o != "function" || (u != null && typeof u != "function"))
            throw new Fn(s);
          var c = function () {
            var h = arguments,
              w = u ? u.apply(this, h) : h[0],
              b = c.cache;
            if (b.has(w)) return b.get(w);
            var T = o.apply(this, h);
            return (c.cache = b.set(w, T) || b), T;
          };
          return (c.cache = new (ua.Cache || Mr)()), c;
        }
        ua.Cache = Mr;
        function sa(o) {
          if (typeof o != "function") throw new Fn(s);
          return function () {
            var u = arguments;
            switch (u.length) {
              case 0:
                return !o.call(this);
              case 1:
                return !o.call(this, u[0]);
              case 2:
                return !o.call(this, u[0], u[1]);
              case 3:
                return !o.call(this, u[0], u[1], u[2]);
            }
            return !o.apply(this, u);
          };
        }
        function b7(o) {
          return Lv(2, o);
        }
        var _7 = d8(function (o, u) {
            u =
              u.length == 1 && Ce(u[0])
                ? rt(u[0], pn(de()))
                : rt(Ot(u, 1), pn(de()));
            var c = u.length;
            return Oe(function (h) {
              for (var w = -1, b = Rt(h.length, c); ++w < b; )
                h[w] = u[w].call(this, h[w]);
              return dn(o, this, h);
            });
          }),
          Yd = Oe(function (o, u) {
            var c = ai(u, Go(Yd));
            return $r(o, M, n, u, c);
          }),
          Bv = Oe(function (o, u) {
            var c = ai(u, Go(Bv));
            return $r(o, P, n, u, c);
          }),
          O7 = zr(function (o, u) {
            return $r(o, B, n, n, n, u);
          });
        function T7(o, u) {
          if (typeof o != "function") throw new Fn(s);
          return (u = u === n ? u : be(u)), Oe(o, u);
        }
        function I7(o, u) {
          if (typeof o != "function") throw new Fn(s);
          return (
            (u = u == null ? 0 : wt(be(u), 0)),
            Oe(function (c) {
              var h = c[u],
                w = hi(c, 0, u);
              return h && si(w, h), dn(o, this, w);
            })
          );
        }
        function P7(o, u, c) {
          var h = !0,
            w = !0;
          if (typeof o != "function") throw new Fn(s);
          return (
            lt(c) &&
              ((h = "leading" in c ? !!c.leading : h),
              (w = "trailing" in c ? !!c.trailing : w)),
            zv(o, u, { leading: h, maxWait: u, trailing: w })
          );
        }
        function R7(o) {
          return Nv(o, 1);
        }
        function A7(o, u) {
          return Yd(Nd(u), o);
        }
        function D7() {
          if (!arguments.length) return [];
          var o = arguments[0];
          return Ce(o) ? o : [o];
        }
        function N7(o) {
          return zn(o, m);
        }
        function L7(o, u) {
          return (u = typeof u == "function" ? u : n), zn(o, m, u);
        }
        function M7(o) {
          return zn(o, g | m);
        }
        function F7(o, u) {
          return (u = typeof u == "function" ? u : n), zn(o, g | m, u);
        }
        function $7(o, u) {
          return u == null || O0(o, u, Ct(u));
        }
        function ir(o, u) {
          return o === u || (o !== o && u !== u);
        }
        var z7 = ea(Cd),
          B7 = ea(function (o, u) {
            return o >= u;
          }),
          oo = D0(
            (function () {
              return arguments;
            })()
          )
            ? D0
            : function (o) {
                return ft(o) && ze.call(o, "callee") && !w0.call(o, "callee");
              },
          Ce = z.isArray,
          H7 = e0 ? pn(e0) : QC;
        function Zt(o) {
          return o != null && aa(o.length) && !Hr(o);
        }
        function pt(o) {
          return ft(o) && Zt(o);
        }
        function U7(o) {
          return o === !0 || o === !1 || (ft(o) && Ut(o) == ct);
        }
        var gi = nC || up,
          W7 = t0 ? pn(t0) : YC;
        function j7(o) {
          return ft(o) && o.nodeType === 1 && !uu(o);
        }
        function V7(o) {
          if (o == null) return !0;
          if (
            Zt(o) &&
            (Ce(o) ||
              typeof o == "string" ||
              typeof o.splice == "function" ||
              gi(o) ||
              qo(o) ||
              oo(o))
          )
            return !o.length;
          var u = At(o);
          if (u == cn || u == Yt) return !o.size;
          if (ou(o)) return !bd(o).length;
          for (var c in o) if (ze.call(o, c)) return !1;
          return !0;
        }
        function G7(o, u) {
          return nu(o, u);
        }
        function q7(o, u, c) {
          c = typeof c == "function" ? c : n;
          var h = c ? c(o, u) : n;
          return h === n ? nu(o, u, n, c) : !!h;
        }
        function Xd(o) {
          if (!ft(o)) return !1;
          var u = Ut(o);
          return (
            u == oi ||
            u == ii ||
            (typeof o.message == "string" &&
              typeof o.name == "string" &&
              !uu(o))
          );
        }
        function K7(o) {
          return typeof o == "number" && S0(o);
        }
        function Hr(o) {
          if (!lt(o)) return !1;
          var u = Ut(o);
          return u == qi || u == Cs || u == nt || u == qf;
        }
        function Hv(o) {
          return typeof o == "number" && o == be(o);
        }
        function aa(o) {
          return typeof o == "number" && o > -1 && o % 1 == 0 && o <= W;
        }
        function lt(o) {
          var u = typeof o;
          return o != null && (u == "object" || u == "function");
        }
        function ft(o) {
          return o != null && typeof o == "object";
        }
        var Uv = n0 ? pn(n0) : ZC;
        function Q7(o, u) {
          return o === u || kd(o, u, Hd(u));
        }
        function Y7(o, u, c) {
          return (c = typeof c == "function" ? c : n), kd(o, u, Hd(u), c);
        }
        function X7(o) {
          return Wv(o) && o != +o;
        }
        function Z7(o) {
          if (L8(o)) throw new xe(l);
          return N0(o);
        }
        function J7(o) {
          return o === null;
        }
        function e9(o) {
          return o == null;
        }
        function Wv(o) {
          return typeof o == "number" || (ft(o) && Ut(o) == Ki);
        }
        function uu(o) {
          if (!ft(o) || Ut(o) != Dn) return !1;
          var u = Ms(o);
          if (u === null) return !0;
          var c = ze.call(u, "constructor") && u.constructor;
          return typeof c == "function" && c instanceof c && As.call(c) == Y6;
        }
        var Zd = r0 ? pn(r0) : JC;
        function t9(o) {
          return Hv(o) && o >= -W && o <= W;
        }
        var jv = i0 ? pn(i0) : e8;
        function ca(o) {
          return typeof o == "string" || (!Ce(o) && ft(o) && Ut(o) == Qi);
        }
        function gn(o) {
          return typeof o == "symbol" || (ft(o) && Ut(o) == No);
        }
        var qo = o0 ? pn(o0) : t8;
        function n9(o) {
          return o === n;
        }
        function r9(o) {
          return ft(o) && At(o) == Yi;
        }
        function i9(o) {
          return ft(o) && Ut(o) == Qf;
        }
        var o9 = ea(_d),
          l9 = ea(function (o, u) {
            return o <= u;
          });
        function Vv(o) {
          if (!o) return [];
          if (Zt(o)) return ca(o) ? nr(o) : Xt(o);
          if (Kl && o[Kl]) return $6(o[Kl]());
          var u = At(o),
            c = u == cn ? pd : u == Yt ? Is : Ko;
          return c(o);
        }
        function Ur(o) {
          if (!o) return o === 0 ? o : 0;
          if (((o = Un(o)), o === me || o === -me)) {
            var u = o < 0 ? -1 : 1;
            return u * te;
          }
          return o === o ? o : 0;
        }
        function be(o) {
          var u = Ur(o),
            c = u % 1;
          return u === u ? (c ? u - c : u) : 0;
        }
        function Gv(o) {
          return o ? to(be(o), 0, ne) : 0;
        }
        function Un(o) {
          if (typeof o == "number") return o;
          if (gn(o)) return _;
          if (lt(o)) {
            var u = typeof o.valueOf == "function" ? o.valueOf() : o;
            o = lt(u) ? u + "" : u;
          }
          if (typeof o != "string") return o === 0 ? o : +o;
          o = f0(o);
          var c = HS.test(o);
          return c || WS.test(o)
            ? S6(o.slice(2), c ? 2 : 8)
            : BS.test(o)
            ? _
            : +o;
        }
        function qv(o) {
          return yr(o, Jt(o));
        }
        function u9(o) {
          return o ? to(be(o), -W, W) : o === 0 ? o : 0;
        }
        function $e(o) {
          return o == null ? "" : hn(o);
        }
        var s9 = jo(function (o, u) {
            if (ou(u) || Zt(u)) {
              yr(u, Ct(u), o);
              return;
            }
            for (var c in u) ze.call(u, c) && Jl(o, c, u[c]);
          }),
          Kv = jo(function (o, u) {
            yr(u, Jt(u), o);
          }),
          fa = jo(function (o, u, c, h) {
            yr(u, Jt(u), o, h);
          }),
          a9 = jo(function (o, u, c, h) {
            yr(u, Ct(u), o, h);
          }),
          c9 = zr(wd);
        function f9(o, u) {
          var c = Wo(o);
          return u == null ? c : _0(c, u);
        }
        var d9 = Oe(function (o, u) {
            o = je(o);
            var c = -1,
              h = u.length,
              w = h > 2 ? u[2] : n;
            for (w && Wt(u[0], u[1], w) && (h = 1); ++c < h; )
              for (var b = u[c], T = Jt(b), R = -1, F = T.length; ++R < F; ) {
                var j = T[R],
                  V = o[j];
                (V === n || (ir(V, Bo[j]) && !ze.call(o, j))) && (o[j] = b[j]);
              }
            return o;
          }),
          p9 = Oe(function (o) {
            return o.push(n, fv), dn(Qv, n, o);
          });
        function h9(o, u) {
          return u0(o, de(u, 3), vr);
        }
        function g9(o, u) {
          return u0(o, de(u, 3), Sd);
        }
        function m9(o, u) {
          return o == null ? o : xd(o, de(u, 3), Jt);
        }
        function v9(o, u) {
          return o == null ? o : R0(o, de(u, 3), Jt);
        }
        function y9(o, u) {
          return o && vr(o, de(u, 3));
        }
        function w9(o, u) {
          return o && Sd(o, de(u, 3));
        }
        function x9(o) {
          return o == null ? [] : Gs(o, Ct(o));
        }
        function S9(o) {
          return o == null ? [] : Gs(o, Jt(o));
        }
        function Jd(o, u, c) {
          var h = o == null ? n : no(o, u);
          return h === n ? c : h;
        }
        function C9(o, u) {
          return o != null && hv(o, u, VC);
        }
        function ep(o, u) {
          return o != null && hv(o, u, GC);
        }
        var E9 = lv(function (o, u, c) {
            u != null && typeof u.toString != "function" && (u = Ds.call(u)),
              (o[u] = c);
          }, np(en)),
          k9 = lv(function (o, u, c) {
            u != null && typeof u.toString != "function" && (u = Ds.call(u)),
              ze.call(o, u) ? o[u].push(c) : (o[u] = [c]);
          }, de),
          b9 = Oe(tu);
        function Ct(o) {
          return Zt(o) ? k0(o) : bd(o);
        }
        function Jt(o) {
          return Zt(o) ? k0(o, !0) : n8(o);
        }
        function _9(o, u) {
          var c = {};
          return (
            (u = de(u, 3)),
            vr(o, function (h, w, b) {
              Fr(c, u(h, w, b), h);
            }),
            c
          );
        }
        function O9(o, u) {
          var c = {};
          return (
            (u = de(u, 3)),
            vr(o, function (h, w, b) {
              Fr(c, w, u(h, w, b));
            }),
            c
          );
        }
        var T9 = jo(function (o, u, c) {
            qs(o, u, c);
          }),
          Qv = jo(function (o, u, c, h) {
            qs(o, u, c, h);
          }),
          I9 = zr(function (o, u) {
            var c = {};
            if (o == null) return c;
            var h = !1;
            (u = rt(u, function (b) {
              return (b = pi(b, o)), h || (h = b.length > 1), b;
            })),
              yr(o, zd(o), c),
              h && (c = zn(c, g | v | m, E8));
            for (var w = u.length; w--; ) Rd(c, u[w]);
            return c;
          });
        function P9(o, u) {
          return Yv(o, sa(de(u)));
        }
        var R9 = zr(function (o, u) {
          return o == null ? {} : i8(o, u);
        });
        function Yv(o, u) {
          if (o == null) return {};
          var c = rt(zd(o), function (h) {
            return [h];
          });
          return (
            (u = de(u)),
            H0(o, c, function (h, w) {
              return u(h, w[0]);
            })
          );
        }
        function A9(o, u, c) {
          u = pi(u, o);
          var h = -1,
            w = u.length;
          for (w || ((w = 1), (o = n)); ++h < w; ) {
            var b = o == null ? n : o[wr(u[h])];
            b === n && ((h = w), (b = c)), (o = Hr(b) ? b.call(o) : b);
          }
          return o;
        }
        function D9(o, u, c) {
          return o == null ? o : ru(o, u, c);
        }
        function N9(o, u, c, h) {
          return (
            (h = typeof h == "function" ? h : n), o == null ? o : ru(o, u, c, h)
          );
        }
        var Xv = av(Ct),
          Zv = av(Jt);
        function L9(o, u, c) {
          var h = Ce(o),
            w = h || gi(o) || qo(o);
          if (((u = de(u, 4)), c == null)) {
            var b = o && o.constructor;
            w
              ? (c = h ? new b() : [])
              : lt(o)
              ? (c = Hr(b) ? Wo(Ms(o)) : {})
              : (c = {});
          }
          return (
            (w ? Mn : vr)(o, function (T, R, F) {
              return u(c, T, R, F);
            }),
            c
          );
        }
        function M9(o, u) {
          return o == null ? !0 : Rd(o, u);
        }
        function F9(o, u, c) {
          return o == null ? o : G0(o, u, Nd(c));
        }
        function $9(o, u, c, h) {
          return (
            (h = typeof h == "function" ? h : n),
            o == null ? o : G0(o, u, Nd(c), h)
          );
        }
        function Ko(o) {
          return o == null ? [] : dd(o, Ct(o));
        }
        function z9(o) {
          return o == null ? [] : dd(o, Jt(o));
        }
        function B9(o, u, c) {
          return (
            c === n && ((c = u), (u = n)),
            c !== n && ((c = Un(c)), (c = c === c ? c : 0)),
            u !== n && ((u = Un(u)), (u = u === u ? u : 0)),
            to(Un(o), u, c)
          );
        }
        function H9(o, u, c) {
          return (
            (u = Ur(u)),
            c === n ? ((c = u), (u = 0)) : (c = Ur(c)),
            (o = Un(o)),
            qC(o, u, c)
          );
        }
        function U9(o, u, c) {
          if (
            (c && typeof c != "boolean" && Wt(o, u, c) && (u = c = n),
            c === n &&
              (typeof u == "boolean"
                ? ((c = u), (u = n))
                : typeof o == "boolean" && ((c = o), (o = n))),
            o === n && u === n
              ? ((o = 0), (u = 1))
              : ((o = Ur(o)), u === n ? ((u = o), (o = 0)) : (u = Ur(u))),
            o > u)
          ) {
            var h = o;
            (o = u), (u = h);
          }
          if (c || o % 1 || u % 1) {
            var w = C0();
            return Rt(o + w * (u - o + x6("1e-" + ((w + "").length - 1))), u);
          }
          return Td(o, u);
        }
        var W9 = Vo(function (o, u, c) {
          return (u = u.toLowerCase()), o + (c ? Jv(u) : u);
        });
        function Jv(o) {
          return tp($e(o).toLowerCase());
        }
        function ey(o) {
          return (o = $e(o)), o && o.replace(VS, D6).replace(c6, "");
        }
        function j9(o, u, c) {
          (o = $e(o)), (u = hn(u));
          var h = o.length;
          c = c === n ? h : to(be(c), 0, h);
          var w = c;
          return (c -= u.length), c >= 0 && o.slice(c, w) == u;
        }
        function V9(o) {
          return (o = $e(o)), o && bS.test(o) ? o.replace(Rm, N6) : o;
        }
        function G9(o) {
          return (o = $e(o)), o && RS.test(o) ? o.replace(Yf, "\\$&") : o;
        }
        var q9 = Vo(function (o, u, c) {
            return o + (c ? "-" : "") + u.toLowerCase();
          }),
          K9 = Vo(function (o, u, c) {
            return o + (c ? " " : "") + u.toLowerCase();
          }),
          Q9 = rv("toLowerCase");
        function Y9(o, u, c) {
          (o = $e(o)), (u = be(u));
          var h = u ? $o(o) : 0;
          if (!u || h >= u) return o;
          var w = (u - h) / 2;
          return Js(Bs(w), c) + o + Js(zs(w), c);
        }
        function X9(o, u, c) {
          (o = $e(o)), (u = be(u));
          var h = u ? $o(o) : 0;
          return u && h < u ? o + Js(u - h, c) : o;
        }
        function Z9(o, u, c) {
          (o = $e(o)), (u = be(u));
          var h = u ? $o(o) : 0;
          return u && h < u ? Js(u - h, c) + o : o;
        }
        function J9(o, u, c) {
          return (
            c || u == null ? (u = 0) : u && (u = +u),
            lC($e(o).replace(Xf, ""), u || 0)
          );
        }
        function ek(o, u, c) {
          return (
            (c ? Wt(o, u, c) : u === n) ? (u = 1) : (u = be(u)), Id($e(o), u)
          );
        }
        function tk() {
          var o = arguments,
            u = $e(o[0]);
          return o.length < 3 ? u : u.replace(o[1], o[2]);
        }
        var nk = Vo(function (o, u, c) {
          return o + (c ? "_" : "") + u.toLowerCase();
        });
        function rk(o, u, c) {
          return (
            c && typeof c != "number" && Wt(o, u, c) && (u = c = n),
            (c = c === n ? ne : c >>> 0),
            c
              ? ((o = $e(o)),
                o &&
                (typeof u == "string" || (u != null && !Zd(u))) &&
                ((u = hn(u)), !u && Fo(o))
                  ? hi(nr(o), 0, c)
                  : o.split(u, c))
              : []
          );
        }
        var ik = Vo(function (o, u, c) {
          return o + (c ? " " : "") + tp(u);
        });
        function ok(o, u, c) {
          return (
            (o = $e(o)),
            (c = c == null ? 0 : to(be(c), 0, o.length)),
            (u = hn(u)),
            o.slice(c, c + u.length) == u
          );
        }
        function lk(o, u, c) {
          var h = C.templateSettings;
          c && Wt(o, u, c) && (u = n), (o = $e(o)), (u = fa({}, u, h, cv));
          var w = fa({}, u.imports, h.imports, cv),
            b = Ct(w),
            T = dd(w, b),
            R,
            F,
            j = 0,
            V = u.interpolate || ks,
            q = "__p += '",
            ie = hd(
              (u.escape || ks).source +
                "|" +
                V.source +
                "|" +
                (V === Am ? zS : ks).source +
                "|" +
                (u.evaluate || ks).source +
                "|$",
              "g"
            ),
            ue =
              "//# sourceURL=" +
              (ze.call(u, "sourceURL")
                ? (u.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++g6 + "]") +
              `
`;
          o.replace(ie, function (he, Te, Re, mn, jt, vn) {
            return (
              Re || (Re = mn),
              (q += o.slice(j, vn).replace(GS, L6)),
              Te &&
                ((R = !0),
                (q +=
                  `' +
__e(` +
                  Te +
                  `) +
'`)),
              jt &&
                ((F = !0),
                (q +=
                  `';
` +
                  jt +
                  `;
__p += '`)),
              Re &&
                (q +=
                  `' +
((__t = (` +
                  Re +
                  `)) == null ? '' : __t) +
'`),
              (j = vn + he.length),
              he
            );
          }),
            (q += `';
`);
          var pe = ze.call(u, "variable") && u.variable;
          if (!pe)
            q =
              `with (obj) {
` +
              q +
              `
}
`;
          else if (FS.test(pe)) throw new xe(a);
          (q = (F ? q.replace(Gl, "") : q)
            .replace(tr, "$1")
            .replace(ES, "$1;")),
            (q =
              "function(" +
              (pe || "obj") +
              `) {
` +
              (pe
                ? ""
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (R ? ", __e = _.escape" : "") +
              (F
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              q +
              `return __p
}`);
          var _e = ny(function () {
            return Le(b, ue + "return " + q).apply(n, T);
          });
          if (((_e.source = q), Xd(_e))) throw _e;
          return _e;
        }
        function uk(o) {
          return $e(o).toLowerCase();
        }
        function sk(o) {
          return $e(o).toUpperCase();
        }
        function ak(o, u, c) {
          if (((o = $e(o)), o && (c || u === n))) return f0(o);
          if (!o || !(u = hn(u))) return o;
          var h = nr(o),
            w = nr(u),
            b = d0(h, w),
            T = p0(h, w) + 1;
          return hi(h, b, T).join("");
        }
        function ck(o, u, c) {
          if (((o = $e(o)), o && (c || u === n))) return o.slice(0, g0(o) + 1);
          if (!o || !(u = hn(u))) return o;
          var h = nr(o),
            w = p0(h, nr(u)) + 1;
          return hi(h, 0, w).join("");
        }
        function fk(o, u, c) {
          if (((o = $e(o)), o && (c || u === n))) return o.replace(Xf, "");
          if (!o || !(u = hn(u))) return o;
          var h = nr(o),
            w = d0(h, nr(u));
          return hi(h, w).join("");
        }
        function dk(o, u) {
          var c = ee,
            h = G;
          if (lt(u)) {
            var w = "separator" in u ? u.separator : w;
            (c = "length" in u ? be(u.length) : c),
              (h = "omission" in u ? hn(u.omission) : h);
          }
          o = $e(o);
          var b = o.length;
          if (Fo(o)) {
            var T = nr(o);
            b = T.length;
          }
          if (c >= b) return o;
          var R = c - $o(h);
          if (R < 1) return h;
          var F = T ? hi(T, 0, R).join("") : o.slice(0, R);
          if (w === n) return F + h;
          if ((T && (R += F.length - R), Zd(w))) {
            if (o.slice(R).search(w)) {
              var j,
                V = F;
              for (
                w.global || (w = hd(w.source, $e(Dm.exec(w)) + "g")),
                  w.lastIndex = 0;
                (j = w.exec(V));

              )
                var q = j.index;
              F = F.slice(0, q === n ? R : q);
            }
          } else if (o.indexOf(hn(w), R) != R) {
            var ie = F.lastIndexOf(w);
            ie > -1 && (F = F.slice(0, ie));
          }
          return F + h;
        }
        function pk(o) {
          return (o = $e(o)), o && kS.test(o) ? o.replace(Pm, U6) : o;
        }
        var hk = Vo(function (o, u, c) {
            return o + (c ? " " : "") + u.toUpperCase();
          }),
          tp = rv("toUpperCase");
        function ty(o, u, c) {
          return (
            (o = $e(o)),
            (u = c ? n : u),
            u === n ? (F6(o) ? V6(o) : T6(o)) : o.match(u) || []
          );
        }
        var ny = Oe(function (o, u) {
            try {
              return dn(o, n, u);
            } catch (c) {
              return Xd(c) ? c : new xe(c);
            }
          }),
          gk = zr(function (o, u) {
            return (
              Mn(u, function (c) {
                (c = wr(c)), Fr(o, c, Qd(o[c], o));
              }),
              o
            );
          });
        function mk(o) {
          var u = o == null ? 0 : o.length,
            c = de();
          return (
            (o = u
              ? rt(o, function (h) {
                  if (typeof h[1] != "function") throw new Fn(s);
                  return [c(h[0]), h[1]];
                })
              : []),
            Oe(function (h) {
              for (var w = -1; ++w < u; ) {
                var b = o[w];
                if (dn(b[0], this, h)) return dn(b[1], this, h);
              }
            })
          );
        }
        function vk(o) {
          return UC(zn(o, g));
        }
        function np(o) {
          return function () {
            return o;
          };
        }
        function yk(o, u) {
          return o == null || o !== o ? u : o;
        }
        var wk = ov(),
          xk = ov(!0);
        function en(o) {
          return o;
        }
        function rp(o) {
          return L0(typeof o == "function" ? o : zn(o, g));
        }
        function Sk(o) {
          return F0(zn(o, g));
        }
        function Ck(o, u) {
          return $0(o, zn(u, g));
        }
        var Ek = Oe(function (o, u) {
            return function (c) {
              return tu(c, o, u);
            };
          }),
          kk = Oe(function (o, u) {
            return function (c) {
              return tu(o, c, u);
            };
          });
        function ip(o, u, c) {
          var h = Ct(u),
            w = Gs(u, h);
          c == null &&
            !(lt(u) && (w.length || !h.length)) &&
            ((c = u), (u = o), (o = this), (w = Gs(u, Ct(u))));
          var b = !(lt(c) && "chain" in c) || !!c.chain,
            T = Hr(o);
          return (
            Mn(w, function (R) {
              var F = u[R];
              (o[R] = F),
                T &&
                  (o.prototype[R] = function () {
                    var j = this.__chain__;
                    if (b || j) {
                      var V = o(this.__wrapped__),
                        q = (V.__actions__ = Xt(this.__actions__));
                      return (
                        q.push({ func: F, args: arguments, thisArg: o }),
                        (V.__chain__ = j),
                        V
                      );
                    }
                    return F.apply(o, si([this.value()], arguments));
                  });
            }),
            o
          );
        }
        function bk() {
          return _t._ === this && (_t._ = X6), this;
        }
        function op() {}
        function _k(o) {
          return (
            (o = be(o)),
            Oe(function (u) {
              return z0(u, o);
            })
          );
        }
        var Ok = Md(rt),
          Tk = Md(l0),
          Ik = Md(ud);
        function ry(o) {
          return Wd(o) ? sd(wr(o)) : o8(o);
        }
        function Pk(o) {
          return function (u) {
            return o == null ? n : no(o, u);
          };
        }
        var Rk = uv(),
          Ak = uv(!0);
        function lp() {
          return [];
        }
        function up() {
          return !1;
        }
        function Dk() {
          return {};
        }
        function Nk() {
          return "";
        }
        function Lk() {
          return !0;
        }
        function Mk(o, u) {
          if (((o = be(o)), o < 1 || o > W)) return [];
          var c = ne,
            h = Rt(o, ne);
          (u = de(u)), (o -= ne);
          for (var w = fd(h, u); ++c < o; ) u(c);
          return w;
        }
        function Fk(o) {
          return Ce(o) ? rt(o, wr) : gn(o) ? [o] : Xt(Ev($e(o)));
        }
        function $k(o) {
          var u = ++Q6;
          return $e(o) + u;
        }
        var zk = Zs(function (o, u) {
            return o + u;
          }, 0),
          Bk = Fd("ceil"),
          Hk = Zs(function (o, u) {
            return o / u;
          }, 1),
          Uk = Fd("floor");
        function Wk(o) {
          return o && o.length ? Vs(o, en, Cd) : n;
        }
        function jk(o, u) {
          return o && o.length ? Vs(o, de(u, 2), Cd) : n;
        }
        function Vk(o) {
          return a0(o, en);
        }
        function Gk(o, u) {
          return a0(o, de(u, 2));
        }
        function qk(o) {
          return o && o.length ? Vs(o, en, _d) : n;
        }
        function Kk(o, u) {
          return o && o.length ? Vs(o, de(u, 2), _d) : n;
        }
        var Qk = Zs(function (o, u) {
            return o * u;
          }, 1),
          Yk = Fd("round"),
          Xk = Zs(function (o, u) {
            return o - u;
          }, 0);
        function Zk(o) {
          return o && o.length ? cd(o, en) : 0;
        }
        function Jk(o, u) {
          return o && o.length ? cd(o, de(u, 2)) : 0;
        }
        return (
          (C.after = S7),
          (C.ary = Nv),
          (C.assign = s9),
          (C.assignIn = Kv),
          (C.assignInWith = fa),
          (C.assignWith = a9),
          (C.at = c9),
          (C.before = Lv),
          (C.bind = Qd),
          (C.bindAll = gk),
          (C.bindKey = Mv),
          (C.castArray = D7),
          (C.chain = Rv),
          (C.chunk = U8),
          (C.compact = W8),
          (C.concat = j8),
          (C.cond = mk),
          (C.conforms = vk),
          (C.constant = np),
          (C.countBy = ZE),
          (C.create = f9),
          (C.curry = Fv),
          (C.curryRight = $v),
          (C.debounce = zv),
          (C.defaults = d9),
          (C.defaultsDeep = p9),
          (C.defer = C7),
          (C.delay = E7),
          (C.difference = V8),
          (C.differenceBy = G8),
          (C.differenceWith = q8),
          (C.drop = K8),
          (C.dropRight = Q8),
          (C.dropRightWhile = Y8),
          (C.dropWhile = X8),
          (C.fill = Z8),
          (C.filter = e7),
          (C.flatMap = r7),
          (C.flatMapDeep = i7),
          (C.flatMapDepth = o7),
          (C.flatten = Ov),
          (C.flattenDeep = J8),
          (C.flattenDepth = eE),
          (C.flip = k7),
          (C.flow = wk),
          (C.flowRight = xk),
          (C.fromPairs = tE),
          (C.functions = x9),
          (C.functionsIn = S9),
          (C.groupBy = l7),
          (C.initial = rE),
          (C.intersection = iE),
          (C.intersectionBy = oE),
          (C.intersectionWith = lE),
          (C.invert = E9),
          (C.invertBy = k9),
          (C.invokeMap = s7),
          (C.iteratee = rp),
          (C.keyBy = a7),
          (C.keys = Ct),
          (C.keysIn = Jt),
          (C.map = oa),
          (C.mapKeys = _9),
          (C.mapValues = O9),
          (C.matches = Sk),
          (C.matchesProperty = Ck),
          (C.memoize = ua),
          (C.merge = T9),
          (C.mergeWith = Qv),
          (C.method = Ek),
          (C.methodOf = kk),
          (C.mixin = ip),
          (C.negate = sa),
          (C.nthArg = _k),
          (C.omit = I9),
          (C.omitBy = P9),
          (C.once = b7),
          (C.orderBy = c7),
          (C.over = Ok),
          (C.overArgs = _7),
          (C.overEvery = Tk),
          (C.overSome = Ik),
          (C.partial = Yd),
          (C.partialRight = Bv),
          (C.partition = f7),
          (C.pick = R9),
          (C.pickBy = Yv),
          (C.property = ry),
          (C.propertyOf = Pk),
          (C.pull = cE),
          (C.pullAll = Iv),
          (C.pullAllBy = fE),
          (C.pullAllWith = dE),
          (C.pullAt = pE),
          (C.range = Rk),
          (C.rangeRight = Ak),
          (C.rearg = O7),
          (C.reject = h7),
          (C.remove = hE),
          (C.rest = T7),
          (C.reverse = qd),
          (C.sampleSize = m7),
          (C.set = D9),
          (C.setWith = N9),
          (C.shuffle = v7),
          (C.slice = gE),
          (C.sortBy = x7),
          (C.sortedUniq = CE),
          (C.sortedUniqBy = EE),
          (C.split = rk),
          (C.spread = I7),
          (C.tail = kE),
          (C.take = bE),
          (C.takeRight = _E),
          (C.takeRightWhile = OE),
          (C.takeWhile = TE),
          (C.tap = WE),
          (C.throttle = P7),
          (C.thru = ia),
          (C.toArray = Vv),
          (C.toPairs = Xv),
          (C.toPairsIn = Zv),
          (C.toPath = Fk),
          (C.toPlainObject = qv),
          (C.transform = L9),
          (C.unary = R7),
          (C.union = IE),
          (C.unionBy = PE),
          (C.unionWith = RE),
          (C.uniq = AE),
          (C.uniqBy = DE),
          (C.uniqWith = NE),
          (C.unset = M9),
          (C.unzip = Kd),
          (C.unzipWith = Pv),
          (C.update = F9),
          (C.updateWith = $9),
          (C.values = Ko),
          (C.valuesIn = z9),
          (C.without = LE),
          (C.words = ty),
          (C.wrap = A7),
          (C.xor = ME),
          (C.xorBy = FE),
          (C.xorWith = $E),
          (C.zip = zE),
          (C.zipObject = BE),
          (C.zipObjectDeep = HE),
          (C.zipWith = UE),
          (C.entries = Xv),
          (C.entriesIn = Zv),
          (C.extend = Kv),
          (C.extendWith = fa),
          ip(C, C),
          (C.add = zk),
          (C.attempt = ny),
          (C.camelCase = W9),
          (C.capitalize = Jv),
          (C.ceil = Bk),
          (C.clamp = B9),
          (C.clone = N7),
          (C.cloneDeep = M7),
          (C.cloneDeepWith = F7),
          (C.cloneWith = L7),
          (C.conformsTo = $7),
          (C.deburr = ey),
          (C.defaultTo = yk),
          (C.divide = Hk),
          (C.endsWith = j9),
          (C.eq = ir),
          (C.escape = V9),
          (C.escapeRegExp = G9),
          (C.every = JE),
          (C.find = t7),
          (C.findIndex = bv),
          (C.findKey = h9),
          (C.findLast = n7),
          (C.findLastIndex = _v),
          (C.findLastKey = g9),
          (C.floor = Uk),
          (C.forEach = Av),
          (C.forEachRight = Dv),
          (C.forIn = m9),
          (C.forInRight = v9),
          (C.forOwn = y9),
          (C.forOwnRight = w9),
          (C.get = Jd),
          (C.gt = z7),
          (C.gte = B7),
          (C.has = C9),
          (C.hasIn = ep),
          (C.head = Tv),
          (C.identity = en),
          (C.includes = u7),
          (C.indexOf = nE),
          (C.inRange = H9),
          (C.invoke = b9),
          (C.isArguments = oo),
          (C.isArray = Ce),
          (C.isArrayBuffer = H7),
          (C.isArrayLike = Zt),
          (C.isArrayLikeObject = pt),
          (C.isBoolean = U7),
          (C.isBuffer = gi),
          (C.isDate = W7),
          (C.isElement = j7),
          (C.isEmpty = V7),
          (C.isEqual = G7),
          (C.isEqualWith = q7),
          (C.isError = Xd),
          (C.isFinite = K7),
          (C.isFunction = Hr),
          (C.isInteger = Hv),
          (C.isLength = aa),
          (C.isMap = Uv),
          (C.isMatch = Q7),
          (C.isMatchWith = Y7),
          (C.isNaN = X7),
          (C.isNative = Z7),
          (C.isNil = e9),
          (C.isNull = J7),
          (C.isNumber = Wv),
          (C.isObject = lt),
          (C.isObjectLike = ft),
          (C.isPlainObject = uu),
          (C.isRegExp = Zd),
          (C.isSafeInteger = t9),
          (C.isSet = jv),
          (C.isString = ca),
          (C.isSymbol = gn),
          (C.isTypedArray = qo),
          (C.isUndefined = n9),
          (C.isWeakMap = r9),
          (C.isWeakSet = i9),
          (C.join = uE),
          (C.kebabCase = q9),
          (C.last = Hn),
          (C.lastIndexOf = sE),
          (C.lowerCase = K9),
          (C.lowerFirst = Q9),
          (C.lt = o9),
          (C.lte = l9),
          (C.max = Wk),
          (C.maxBy = jk),
          (C.mean = Vk),
          (C.meanBy = Gk),
          (C.min = qk),
          (C.minBy = Kk),
          (C.stubArray = lp),
          (C.stubFalse = up),
          (C.stubObject = Dk),
          (C.stubString = Nk),
          (C.stubTrue = Lk),
          (C.multiply = Qk),
          (C.nth = aE),
          (C.noConflict = bk),
          (C.noop = op),
          (C.now = la),
          (C.pad = Y9),
          (C.padEnd = X9),
          (C.padStart = Z9),
          (C.parseInt = J9),
          (C.random = U9),
          (C.reduce = d7),
          (C.reduceRight = p7),
          (C.repeat = ek),
          (C.replace = tk),
          (C.result = A9),
          (C.round = Yk),
          (C.runInContext = L),
          (C.sample = g7),
          (C.size = y7),
          (C.snakeCase = nk),
          (C.some = w7),
          (C.sortedIndex = mE),
          (C.sortedIndexBy = vE),
          (C.sortedIndexOf = yE),
          (C.sortedLastIndex = wE),
          (C.sortedLastIndexBy = xE),
          (C.sortedLastIndexOf = SE),
          (C.startCase = ik),
          (C.startsWith = ok),
          (C.subtract = Xk),
          (C.sum = Zk),
          (C.sumBy = Jk),
          (C.template = lk),
          (C.times = Mk),
          (C.toFinite = Ur),
          (C.toInteger = be),
          (C.toLength = Gv),
          (C.toLower = uk),
          (C.toNumber = Un),
          (C.toSafeInteger = u9),
          (C.toString = $e),
          (C.toUpper = sk),
          (C.trim = ak),
          (C.trimEnd = ck),
          (C.trimStart = fk),
          (C.truncate = dk),
          (C.unescape = pk),
          (C.uniqueId = $k),
          (C.upperCase = hk),
          (C.upperFirst = tp),
          (C.each = Av),
          (C.eachRight = Dv),
          (C.first = Tv),
          ip(
            C,
            (function () {
              var o = {};
              return (
                vr(C, function (u, c) {
                  ze.call(C.prototype, c) || (o[c] = u);
                }),
                o
              );
            })(),
            { chain: !1 }
          ),
          (C.VERSION = r),
          Mn(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (o) {
              C[o].placeholder = C;
            }
          ),
          Mn(["drop", "take"], function (o, u) {
            (Pe.prototype[o] = function (c) {
              c = c === n ? 1 : wt(be(c), 0);
              var h = this.__filtered__ && !u ? new Pe(this) : this.clone();
              return (
                h.__filtered__
                  ? (h.__takeCount__ = Rt(c, h.__takeCount__))
                  : h.__views__.push({
                      size: Rt(c, ne),
                      type: o + (h.__dir__ < 0 ? "Right" : ""),
                    }),
                h
              );
            }),
              (Pe.prototype[o + "Right"] = function (c) {
                return this.reverse()[o](c).reverse();
              });
          }),
          Mn(["filter", "map", "takeWhile"], function (o, u) {
            var c = u + 1,
              h = c == ae || c == ge;
            Pe.prototype[o] = function (w) {
              var b = this.clone();
              return (
                b.__iteratees__.push({ iteratee: de(w, 3), type: c }),
                (b.__filtered__ = b.__filtered__ || h),
                b
              );
            };
          }),
          Mn(["head", "last"], function (o, u) {
            var c = "take" + (u ? "Right" : "");
            Pe.prototype[o] = function () {
              return this[c](1).value()[0];
            };
          }),
          Mn(["initial", "tail"], function (o, u) {
            var c = "drop" + (u ? "" : "Right");
            Pe.prototype[o] = function () {
              return this.__filtered__ ? new Pe(this) : this[c](1);
            };
          }),
          (Pe.prototype.compact = function () {
            return this.filter(en);
          }),
          (Pe.prototype.find = function (o) {
            return this.filter(o).head();
          }),
          (Pe.prototype.findLast = function (o) {
            return this.reverse().find(o);
          }),
          (Pe.prototype.invokeMap = Oe(function (o, u) {
            return typeof o == "function"
              ? new Pe(this)
              : this.map(function (c) {
                  return tu(c, o, u);
                });
          })),
          (Pe.prototype.reject = function (o) {
            return this.filter(sa(de(o)));
          }),
          (Pe.prototype.slice = function (o, u) {
            o = be(o);
            var c = this;
            return c.__filtered__ && (o > 0 || u < 0)
              ? new Pe(c)
              : (o < 0 ? (c = c.takeRight(-o)) : o && (c = c.drop(o)),
                u !== n &&
                  ((u = be(u)), (c = u < 0 ? c.dropRight(-u) : c.take(u - o))),
                c);
          }),
          (Pe.prototype.takeRightWhile = function (o) {
            return this.reverse().takeWhile(o).reverse();
          }),
          (Pe.prototype.toArray = function () {
            return this.take(ne);
          }),
          vr(Pe.prototype, function (o, u) {
            var c = /^(?:filter|find|map|reject)|While$/.test(u),
              h = /^(?:head|last)$/.test(u),
              w = C[h ? "take" + (u == "last" ? "Right" : "") : u],
              b = h || /^find/.test(u);
            w &&
              (C.prototype[u] = function () {
                var T = this.__wrapped__,
                  R = h ? [1] : arguments,
                  F = T instanceof Pe,
                  j = R[0],
                  V = F || Ce(T),
                  q = function (Te) {
                    var Re = w.apply(C, si([Te], R));
                    return h && ie ? Re[0] : Re;
                  };
                V &&
                  c &&
                  typeof j == "function" &&
                  j.length != 1 &&
                  (F = V = !1);
                var ie = this.__chain__,
                  ue = !!this.__actions__.length,
                  pe = b && !ie,
                  _e = F && !ue;
                if (!b && V) {
                  T = _e ? T : new Pe(this);
                  var he = o.apply(T, R);
                  return (
                    he.__actions__.push({ func: ia, args: [q], thisArg: n }),
                    new $n(he, ie)
                  );
                }
                return pe && _e
                  ? o.apply(this, R)
                  : ((he = this.thru(q)),
                    pe ? (h ? he.value()[0] : he.value()) : he);
              });
          }),
          Mn(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (o) {
              var u = Ps[o],
                c = /^(?:push|sort|unshift)$/.test(o) ? "tap" : "thru",
                h = /^(?:pop|shift)$/.test(o);
              C.prototype[o] = function () {
                var w = arguments;
                if (h && !this.__chain__) {
                  var b = this.value();
                  return u.apply(Ce(b) ? b : [], w);
                }
                return this[c](function (T) {
                  return u.apply(Ce(T) ? T : [], w);
                });
              };
            }
          ),
          vr(Pe.prototype, function (o, u) {
            var c = C[u];
            if (c) {
              var h = c.name + "";
              ze.call(Uo, h) || (Uo[h] = []), Uo[h].push({ name: u, func: c });
            }
          }),
          (Uo[Xs(n, y).name] = [{ name: "wrapper", func: n }]),
          (Pe.prototype.clone = pC),
          (Pe.prototype.reverse = hC),
          (Pe.prototype.value = gC),
          (C.prototype.at = jE),
          (C.prototype.chain = VE),
          (C.prototype.commit = GE),
          (C.prototype.next = qE),
          (C.prototype.plant = QE),
          (C.prototype.reverse = YE),
          (C.prototype.toJSON = C.prototype.valueOf = C.prototype.value = XE),
          (C.prototype.first = C.prototype.head),
          Kl && (C.prototype[Kl] = KE),
          C
        );
      },
      zo = G6();
    Xi ? (((Xi.exports = zo)._ = zo), (rd._ = zo)) : (_t._ = zo);
  }).call(su);
})(Ic, Ic.exports);
var K5 = Ic.exports;
const Ve = {
  water: {
    name: "water",
    close: !1,
    label: "VODA",
    stack: !0,
    usable: !0,
    count: 0,
  },
  burger: {
    name: "burger",
    close: !1,
    label: "BURGR",
    stack: !1,
    usable: !1,
    count: 0,
  },
};
let qa = "images";
function cR(e) {
  e && e !== "" && (qa = e);
}
const Q5 = () => !window.invokeNative,
  Y5 = () => {},
  fR = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "ox_inventory";
async function _n(e, t) {
  if (!Q5())
    try {
      return await (
        await fetch(`https://${fR}/${e}`, {
          method: "post",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify(t),
        })
      ).json();
    } catch (n) {
      throw Error(`Failed to fetch NUI callback ${e}! (${n})`);
    }
}
const B2 = (e, t) => {
    if (t.type !== "shop" || !Gt(e)) return !0;
    if (e.count !== void 0 && e.count === 0) return !1;
    if (e.grade === void 0 || !t.groups) return !0;
    const n = Cn.getState().inventory.leftInventory;
    if (!n.groups) return !1;
    const r = Object.keys(t.groups);
    if (Array.isArray(e.grade)) {
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        if (n.groups[l] !== void 0) {
          const s = n.groups[l];
          for (let a = 0; a < e.grade.length; a++) {
            const f = e.grade[a];
            if (s === f) return !0;
          }
        }
      }
      return !1;
    } else {
      for (let i = 0; i < r.length; i++) {
        const l = r[i];
        if (n.groups[l] !== void 0 && n.groups[l] >= e.grade) return !0;
      }
      return !1;
    }
  },
  H2 = (e, t) => {
    if (!Gt(e) || t !== "crafting" || !e.ingredients) return !0;
    const n = Cn.getState().inventory.leftInventory;
    return (
      Object.entries(e.ingredients).filter((l) => {
        const [s, a] = [l[0], l[1]],
          f = Ve[s];
        return a >= 1 && f && f.count >= a
          ? !1
          : !n.items.find((p) => {
              if (Gt(p) && p.name === s && a < 1)
                return p.metadata?.durability >= a * 100;
            });
      }).length === 0
    );
  },
  Gt = (e, t = !1) =>
    (e.name !== void 0 && e.weight !== void 0) ||
    (t && e.name !== void 0 && e.count !== void 0 && e.weight !== void 0),
  dR = (e, t) => e.name === t.name && K5.isEqual(e.metadata, t.metadata),
  pR = (e, t, n) =>
    t.stack
      ? n.find(
          (i) => i.name === e.name && K5.isEqual(i.metadata, e.metadata)
        ) || n.find((i) => i.name === void 0)
      : n.find((i) => i.name === void 0),
  If = (e, t, n) => ({
    sourceInventory: t === Ft.PLAYER ? e.leftInventory : e.rightInventory,
    targetInventory: n
      ? n === Ft.PLAYER
        ? e.leftInventory
        : e.rightInventory
      : t === Ft.PLAYER
      ? e.rightInventory
      : e.leftInventory,
  }),
  Ll = (e, t) => {
    if (e?.durability === void 0) return;
    let n = e.durability;
    return (
      n > 100 &&
        e.degrade &&
        (n = ((e.durability - t) / (60 * e.degrade)) * 100),
      n < 0 && (n = 0),
      n
    );
  },
  X5 = (e) => e.reduce((t, n) => (Gt(n) ? t + n.weight : t), 0),
  U2 = async (e) => {
    const t = await _n("getItemData", e);
    if (t?.name) return (Ve[e] = t), t;
  },
  So = (e) => {
    const t = typeof e == "object";
    if (t) {
      if (!e.name) return;
      const i = e.metadata;
      if (i?.imageurl) return `${i.imageurl}`;
      if (i?.image) return `${qa}/${i.image}.png`;
    }
    const n = t ? e.name : e,
      r = Ve[n];
    return r
      ? (r.image || (r.image = `${qa}/${n}.png`), r.image)
      : `${qa}/${n}.png`;
  },
  hR = (e, t) => {
    const { leftInventory: n, rightInventory: r } = t.payload,
      i = Math.floor(Date.now() / 1e3);
    n &&
      (e.leftInventory = {
        ...n,
        items: Array.from(Array(n.slots), (l, s) => {
          const a = Object.values(n.items).find((f) => f?.slot === s + 1) || {
            slot: s + 1,
          };
          return (
            a.name &&
              (typeof Ve[a.name] > "u" && U2(a.name),
              (a.durability = Ll(a.metadata, i))),
            a
          );
        }),
      }),
      r &&
        (e.rightInventory = {
          ...r,
          items: Array.from(Array(r.slots), (l, s) => {
            const a = Object.values(r.items).find((f) => f?.slot === s + 1) || {
              slot: s + 1,
            };
            return (
              a.name &&
                (typeof Ve[a.name] > "u" && U2(a.name),
                (a.durability = Ll(a.metadata, i))),
              a
            );
          }),
        }),
      (e.shiftPressed = !1),
      (e.isBusy = !1);
  },
  gR = (e, t) => {
    if (t.payload.items) {
      Array.isArray(t.payload.items) || (t.payload.items = [t.payload.items]);
      const n = Math.floor(Date.now() / 1e3);
      Object.values(t.payload.items)
        .filter((r) => !!r)
        .forEach((r) => {
          const i =
            r.inventory && r.inventory !== Ft.PLAYER
              ? e.rightInventory
              : e.leftInventory;
          (r.item.durability = Ll(r.item.metadata, n)),
            (i.items[r.item.slot - 1] = r.item);
        }),
        e.rightInventory.type === Ft.CRAFTING &&
          (e.rightInventory = { ...e.rightInventory });
    }
    if (t.payload.itemCount) {
      const n = Object.entries(t.payload.itemCount);
      for (let r = 0; r < n.length; r++) {
        const i = n[r][0],
          l = n[r][1];
        Ve[i]
          ? (Ve[i].count += l)
          : console.log(`Item data for ${i} is undefined`);
      }
    }
    if (t.payload.weightData) {
      const n = t.payload.weightData.inventoryId,
        r = t.payload.weightData.maxWeight,
        i =
          n === e.leftInventory.id
            ? "leftInventory"
            : n === e.rightInventory.id
            ? "rightInventory"
            : null;
      if (!i) return;
      e[i].maxWeight = r;
    }
    if (t.payload.slotsData) {
      const { inventoryId: n } = t.payload.slotsData,
        { slots: r } = t.payload.slotsData,
        i =
          n === e.leftInventory.id
            ? "leftInventory"
            : n === e.rightInventory.id
            ? "rightInventory"
            : null;
      if (!i) return;
      (e[i].slots = r),
        tm.caseReducers.setupInventory(e, {
          type: "setupInventory",
          payload: {
            leftInventory: i === "leftInventory" ? e[i] : void 0,
            rightInventory: i === "rightInventory" ? e[i] : void 0,
          },
        });
    }
  },
  mR = (e, t) => {
    const { fromSlot: n, fromType: r, toSlot: i, toType: l } = t.payload,
      { sourceInventory: s, targetInventory: a } = If(e, r, l),
      f = Math.floor(Date.now() / 1e3);
    [s.items[n.slot - 1], a.items[i.slot - 1]] = [
      { ...a.items[i.slot - 1], slot: n.slot, durability: Ll(i.metadata, f) },
      { ...s.items[n.slot - 1], slot: i.slot, durability: Ll(n.metadata, f) },
    ];
  },
  vR = (e, t) => {
    const {
        fromSlot: n,
        fromType: r,
        toSlot: i,
        toType: l,
        count: s,
      } = t.payload,
      { sourceInventory: a, targetInventory: f } = If(e, r, l),
      d = n.weight / n.count;
    (f.items[i.slot - 1] = {
      ...f.items[i.slot - 1],
      count: i.count + s,
      weight: d * (i.count + s),
    }),
      !(r === Ft.SHOP || r === Ft.CRAFTING) &&
        (a.items[n.slot - 1] =
          n.count - s > 0
            ? {
                ...a.items[n.slot - 1],
                count: n.count - s,
                weight: d * (n.count - s),
              }
            : { slot: n.slot });
  },
  yR = (e, t) => {
    const {
        fromSlot: n,
        fromType: r,
        toSlot: i,
        toType: l,
        count: s,
      } = t.payload,
      { sourceInventory: a, targetInventory: f } = If(e, r, l),
      d = n.weight / n.count,
      p = Math.floor(Date.now() / 1e3),
      g = a.items[n.slot - 1];
    (f.items[i.slot - 1] = {
      ...g,
      count: s,
      weight: d * s,
      slot: i.slot,
      durability: Ll(g.metadata, p),
    }),
      !(r === Ft.SHOP || r === Ft.CRAFTING) &&
        (a.items[n.slot - 1] =
          n.count - s > 0
            ? {
                ...a.items[n.slot - 1],
                count: n.count - s,
                weight: d * (n.count - s),
              }
            : { slot: n.slot });
  },
  wR = {
    leftInventory: { id: "", type: "", slots: 0, maxWeight: 0, items: [] },
    rightInventory: { id: "", type: "", slots: 0, maxWeight: 0, items: [] },
    additionalMetadata: new Array(),
    itemAmount: 0,
    shiftPressed: !1,
    isBusy: !1,
  },
  tm = Q1({
    name: "inventory",
    initialState: wR,
    reducers: {
      stackSlots: vR,
      swapSlots: mR,
      setupInventory: hR,
      moveSlots: yR,
      refreshSlots: gR,
      setAdditionalMetadata: (e, t) => {
        const n = [];
        for (let r = 0; r < t.payload.length; r++) {
          const i = t.payload[r];
          e.additionalMetadata.find((l) => l.value === i.value) || n.push(i);
        }
        e.additionalMetadata = [...e.additionalMetadata, ...n];
      },
      setItemAmount: (e, t) => {
        e.itemAmount = t.payload;
      },
      setShiftPressed: (e, t) => {
        e.shiftPressed = t.payload;
      },
      setContainerWeight: (e, t) => {
        const n = e.leftInventory.items.find(
          (r) => r.metadata?.container === e.rightInventory.id
        );
        n && (n.weight = t.payload);
      },
    },
    extraReducers: (e) => {
      e.addMatcher(V5, (t) => {
        (t.isBusy = !0),
          (t.history = {
            leftInventory: hg(t.leftInventory),
            rightInventory: hg(t.rightInventory),
          });
      }),
        e.addMatcher(q5, (t) => {
          t.isBusy = !1;
        }),
        e.addMatcher(G5, (t) => {
          t.history &&
            t.history.leftInventory &&
            t.history.rightInventory &&
            ((t.leftInventory = t.history.leftInventory),
            (t.rightInventory = t.history.rightInventory)),
            (t.isBusy = !1);
        });
    },
  }),
  {
    setAdditionalMetadata: xR,
    setItemAmount: SR,
    setShiftPressed: CR,
    setupInventory: Z5,
    swapSlots: ER,
    moveSlots: kR,
    stackSlots: bR,
    refreshSlots: _R,
    setContainerWeight: OR,
  } = tm.actions,
  nm = (e) => e.inventory.leftInventory,
  TR = (e) => e.inventory.rightInventory,
  IR = (e) => e.inventory.itemAmount,
  PR = tm.reducer,
  RR = { open: !1, item: null, inventoryType: null },
  J5 = Q1({
    name: "tooltip",
    initialState: RR,
    reducers: {
      openTooltip(e, t) {
        (e.open = !0),
          (e.item = t.payload.item),
          (e.inventoryType = t.payload.inventoryType);
      },
      closeTooltip(e) {
        e.open = !1;
      },
    },
  }),
  { openTooltip: AR, closeTooltip: Fu } = J5.actions,
  DR = J5.reducer,
  NR = { coords: null, item: null },
  ex = Q1({
    name: "contextMenu",
    initialState: NR,
    reducers: {
      openContextMenu(e, t) {
        (e.coords = t.payload.coords), (e.item = t.payload.item);
      },
      closeContextMenu(e) {
        (e.coords = null), (e.item = null);
      },
    },
  }),
  { openContextMenu: LR, closeContextMenu: rm } = ex.actions,
  MR = ex.reducer,
  Cn = JP({ reducer: { inventory: PR, tooltip: DR, contextMenu: MR } }),
  Ao = () => vT(),
  Ar = JO,
  Sn = (e, t) => {
    const n = A.useRef(Y5);
    A.useEffect(() => {
      n.current = t;
    }, [t]),
      A.useEffect(() => {
        const r = (i) => {
          const { action: l, data: s } = i.data;
          n.current && l === e && n.current(s);
        };
        return (
          window.addEventListener("message", r),
          () => window.removeEventListener("message", r)
        );
      }, [e]);
  },
  im = (e) => {
    const {
      inventory: { itemAmount: t },
    } = Cn.getState();
    _n("useItem", { slot: e.slot, count: t });
  },
  tx = (e) => {
    const {
      inventory: { itemAmount: t },
    } = Cn.getState();
    _n("giveItem", { slot: e.slot, count: t });
  },
  Ge = {};
function nx(e) {
  return rx(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ys(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function FR(e) {
  var t;
  return (t = (rx(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function rx(e) {
  return e instanceof Node || e instanceof ys(e).Node;
}
function cr(e) {
  return e instanceof Element || e instanceof ys(e).Element;
}
function Pc(e) {
  return e instanceof HTMLElement || e instanceof ys(e).HTMLElement;
}
function vg(e) {
  return typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof ys(e).ShadowRoot;
}
function $R(e) {
  return ["html", "body", "#document"].includes(nx(e));
}
function zR(e) {
  return ys(e).getComputedStyle(e);
}
function BR(e) {
  if (nx(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (vg(e) && e.host) || FR(e);
  return vg(t) ? t.host : t;
}
function el(e) {
  let t = e.activeElement;
  for (
    ;
    ((n = t) == null || (r = n.shadowRoot) == null
      ? void 0
      : r.activeElement) != null;

  ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function wn(e, t) {
  if (!e || !t) return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && vg(n)) {
    let r = t;
    for (; r; ) {
      if (e === r) return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function ix() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function HR() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? e.brands
        .map((t) => {
          let { brand: n, version: r } = t;
          return n + "/" + r;
        })
        .join(" ")
    : navigator.userAgent;
}
function UR(e) {
  if (e.mozInputSource === 0 && e.isTrusted) return !0;
  const t = /Android/i;
  return (t.test(ix()) || t.test(HR())) && e.pointerType
    ? e.type === "click" && e.buttons === 1
    : e.detail === 0 && !e.pointerType;
}
function WR(e) {
  return (
    (e.width === 0 && e.height === 0) ||
    (e.width === 1 &&
      e.height === 1 &&
      e.pressure === 0 &&
      e.detail === 0 &&
      e.pointerType !== "mouse") ||
    (e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0)
  );
}
function jR() {
  return /apple/i.test(navigator.vendor);
}
function VR(e) {
  return "nativeEvent" in e;
}
function GR(e) {
  return e.matches("html,body");
}
function kr(e) {
  return e?.ownerDocument || document;
}
function Gp(e, t) {
  if (t == null) return !1;
  if ("composedPath" in e) return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
function ox(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const qR =
  "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function KR(e) {
  return Pc(e) && e.matches(qR);
}
function qp(e) {
  e.preventDefault(), e.stopPropagation();
}
const QR = Math.min,
  YR = Math.max,
  XR = { left: "right", right: "left", bottom: "top", top: "bottom" },
  ZR = { start: "end", end: "start" };
function W2(e, t, n) {
  return YR(e, QR(t, n));
}
function Pf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Io(e) {
  return e.split("-")[0];
}
function Rf(e) {
  return e.split("-")[1];
}
function lx(e) {
  return e === "x" ? "y" : "x";
}
function ux(e) {
  return e === "y" ? "height" : "width";
}
const JR = new Set(["top", "bottom"]);
function bi(e) {
  return JR.has(Io(e)) ? "y" : "x";
}
function sx(e) {
  return lx(bi(e));
}
function eA(e, t, n) {
  n === void 0 && (n = !1);
  const r = Rf(e),
    i = sx(e),
    l = ux(i);
  let s =
    i === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[l] > t.floating[l] && (s = Rc(s)), [s, Rc(s)];
}
function tA(e) {
  const t = Rc(e);
  return [yg(e), t, yg(t)];
}
function yg(e) {
  return e.replace(/start|end/g, (t) => ZR[t]);
}
const j2 = ["left", "right"],
  V2 = ["right", "left"],
  nA = ["top", "bottom"],
  rA = ["bottom", "top"];
function iA(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? V2 : j2) : t ? j2 : V2;
    case "left":
    case "right":
      return t ? nA : rA;
    default:
      return [];
  }
}
function oA(e, t, n, r) {
  const i = Rf(e);
  let l = iA(Io(e), n === "start", r);
  return (
    i && ((l = l.map((s) => s + "-" + i)), t && (l = l.concat(l.map(yg)))), l
  );
}
function Rc(e) {
  return e.replace(/left|right|bottom|top/g, (t) => XR[t]);
}
function lA(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function uA(e) {
  return typeof e != "number"
    ? lA(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Ac(e) {
  const { x: t, y: n, width: r, height: i } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n,
  };
}
function G2(e, t, n) {
  let { reference: r, floating: i } = e;
  const l = bi(t),
    s = sx(t),
    a = ux(s),
    f = Io(t),
    d = l === "y",
    p = r.x + r.width / 2 - i.width / 2,
    g = r.y + r.height / 2 - i.height / 2,
    v = r[a] / 2 - i[a] / 2;
  let m;
  switch (f) {
    case "top":
      m = { x: p, y: r.y - i.height };
      break;
    case "bottom":
      m = { x: p, y: r.y + r.height };
      break;
    case "right":
      m = { x: r.x + r.width, y: g };
      break;
    case "left":
      m = { x: r.x - i.width, y: g };
      break;
    default:
      m = { x: r.x, y: r.y };
  }
  switch (Rf(t)) {
    case "start":
      m[s] -= v * (n && d ? -1 : 1);
      break;
    case "end":
      m[s] += v * (n && d ? -1 : 1);
      break;
  }
  return m;
}
const sA = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: i = "absolute",
      middleware: l = [],
      platform: s,
    } = n,
    a = l.filter(Boolean),
    f = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({ reference: e, floating: t, strategy: i }),
    { x: p, y: g } = G2(d, r, f),
    v = r,
    m = {},
    E = 0;
  for (let S = 0; S < a.length; S++) {
    const { name: N, fn: y } = a[S],
      {
        x,
        y: k,
        data: I,
        reset: M,
      } = await y({
        x: p,
        y: g,
        initialPlacement: r,
        placement: v,
        strategy: i,
        middlewareData: m,
        rects: d,
        platform: s,
        elements: { reference: e, floating: t },
      });
    (p = x ?? p),
      (g = k ?? g),
      (m = { ...m, [N]: { ...m[N], ...I } }),
      M &&
        E <= 50 &&
        (E++,
        typeof M == "object" &&
          (M.placement && (v = M.placement),
          M.rects &&
            (d =
              M.rects === !0
                ? await s.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: i,
                  })
                : M.rects),
          ({ x: p, y: g } = G2(d, v, f))),
        (S = -1));
  }
  return { x: p, y: g, placement: v, strategy: i, middlewareData: m };
};
async function ax(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: i, platform: l, rects: s, elements: a, strategy: f } = e,
    {
      boundary: d = "clippingAncestors",
      rootBoundary: p = "viewport",
      elementContext: g = "floating",
      altBoundary: v = !1,
      padding: m = 0,
    } = Pf(t, e),
    E = uA(m),
    N = a[v ? (g === "floating" ? "reference" : "floating") : g],
    y = Ac(
      await l.getClippingRect({
        element:
          (n = await (l.isElement == null ? void 0 : l.isElement(N))) == null ||
          n
            ? N
            : N.contextElement ||
              (await (l.getDocumentElement == null
                ? void 0
                : l.getDocumentElement(a.floating))),
        boundary: d,
        rootBoundary: p,
        strategy: f,
      })
    ),
    x =
      g === "floating"
        ? { x: r, y: i, width: s.floating.width, height: s.floating.height }
        : s.reference,
    k = await (l.getOffsetParent == null
      ? void 0
      : l.getOffsetParent(a.floating)),
    I = (await (l.isElement == null ? void 0 : l.isElement(k)))
      ? (await (l.getScale == null ? void 0 : l.getScale(k))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    M = Ac(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: x,
            offsetParent: k,
            strategy: f,
          })
        : x
    );
  return {
    top: (y.top - M.top + E.top) / I.y,
    bottom: (M.bottom - y.bottom + E.bottom) / I.y,
    left: (y.left - M.left + E.left) / I.x,
    right: (M.right - y.right + E.right) / I.x,
  };
}
const aA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: i,
              middlewareData: l,
              rects: s,
              initialPlacement: a,
              platform: f,
              elements: d,
            } = t,
            {
              mainAxis: p = !0,
              crossAxis: g = !0,
              fallbackPlacements: v,
              fallbackStrategy: m = "bestFit",
              fallbackAxisSideDirection: E = "none",
              flipAlignment: S = !0,
              ...N
            } = Pf(e, t);
          if ((n = l.arrow) != null && n.alignmentOffset) return {};
          const y = Io(i),
            x = bi(a),
            k = Io(a) === a,
            I = await (f.isRTL == null ? void 0 : f.isRTL(d.floating)),
            M = v || (k || !S ? [Rc(a)] : tA(a)),
            P = E !== "none";
          !v && P && M.push(...oA(a, S, E, I));
          const $ = [a, ...M],
            B = await ax(t, N),
            Y = [];
          let ee = ((r = l.flip) == null ? void 0 : r.overflows) || [];
          if ((p && Y.push(B[y]), g)) {
            const ae = eA(i, s, I);
            Y.push(B[ae[0]], B[ae[1]]);
          }
          if (
            ((ee = [...ee, { placement: i, overflows: Y }]),
            !Y.every((ae) => ae <= 0))
          ) {
            var G, Z;
            const ae = (((G = l.flip) == null ? void 0 : G.index) || 0) + 1,
              ce = $[ae];
            if (
              ce &&
              (!(g === "alignment" ? x !== bi(ce) : !1) ||
                ee.every((W) =>
                  bi(W.placement) === x ? W.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: ae, overflows: ee },
                reset: { placement: ce },
              };
            let ge =
              (Z = ee
                .filter((me) => me.overflows[0] <= 0)
                .sort((me, W) => me.overflows[1] - W.overflows[1])[0]) == null
                ? void 0
                : Z.placement;
            if (!ge)
              switch (m) {
                case "bestFit": {
                  var re;
                  const me =
                    (re = ee
                      .filter((W) => {
                        if (P) {
                          const te = bi(W.placement);
                          return te === x || te === "y";
                        }
                        return !0;
                      })
                      .map((W) => [
                        W.placement,
                        W.overflows
                          .filter((te) => te > 0)
                          .reduce((te, _) => te + _, 0),
                      ])
                      .sort((W, te) => W[1] - te[1])[0]) == null
                      ? void 0
                      : re[0];
                  me && (ge = me);
                  break;
                }
                case "initialPlacement":
                  ge = a;
                  break;
              }
            if (i !== ge) return { reset: { placement: ge } };
          }
          return {};
        },
      }
    );
  },
  cA = new Set(["left", "top"]);
async function fA(e, t) {
  const { placement: n, platform: r, elements: i } = e,
    l = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    s = Io(n),
    a = Rf(n),
    f = bi(n) === "y",
    d = cA.has(s) ? -1 : 1,
    p = l && f ? -1 : 1,
    g = Pf(t, e);
  let {
    mainAxis: v,
    crossAxis: m,
    alignmentAxis: E,
  } = typeof g == "number"
    ? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: g.mainAxis || 0,
        crossAxis: g.crossAxis || 0,
        alignmentAxis: g.alignmentAxis,
      };
  return (
    a && typeof E == "number" && (m = a === "end" ? E * -1 : E),
    f ? { x: m * p, y: v * d } : { x: v * d, y: m * p }
  );
}
const dA = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: i, y: l, placement: s, middlewareData: a } = t,
            f = await fA(t, e);
          return s === ((n = a.offset) == null ? void 0 : n.placement) &&
            (r = a.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: i + f.x, y: l + f.y, data: { ...f, placement: s } };
        },
      }
    );
  },
  pA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: i } = t,
            {
              mainAxis: l = !0,
              crossAxis: s = !1,
              limiter: a = {
                fn: (N) => {
                  let { x: y, y: x } = N;
                  return { x: y, y: x };
                },
              },
              ...f
            } = Pf(e, t),
            d = { x: n, y: r },
            p = await ax(t, f),
            g = bi(Io(i)),
            v = lx(g);
          let m = d[v],
            E = d[g];
          if (l) {
            const N = v === "y" ? "top" : "left",
              y = v === "y" ? "bottom" : "right",
              x = m + p[N],
              k = m - p[y];
            m = W2(x, m, k);
          }
          if (s) {
            const N = g === "y" ? "top" : "left",
              y = g === "y" ? "bottom" : "right",
              x = E + p[N],
              k = E - p[y];
            E = W2(x, E, k);
          }
          const S = a.fn({ ...t, [v]: m, [g]: E });
          return {
            ...S,
            data: { x: S.x - n, y: S.y - r, enabled: { [v]: l, [g]: s } },
          };
        },
      }
    );
  },
  q2 = Math.min,
  $u = Math.max,
  Dc = Math.round,
  Ir = (e) => ({ x: e, y: e });
function Af() {
  return typeof window < "u";
}
function Ul(e) {
  return cx(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function On(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function ni(e) {
  var t;
  return (t = (cx(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function cx(e) {
  return Af() ? e instanceof Node || e instanceof On(e).Node : !1;
}
function gr(e) {
  return Af() ? e instanceof Element || e instanceof On(e).Element : !1;
}
function Pr(e) {
  return Af() ? e instanceof HTMLElement || e instanceof On(e).HTMLElement : !1;
}
function K2(e) {
  return !Af() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof On(e).ShadowRoot;
}
const hA = new Set(["inline", "contents"]);
function ws(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = mr(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !hA.has(i);
}
const gA = new Set(["table", "td", "th"]);
function mA(e) {
  return gA.has(Ul(e));
}
const vA = [":popover-open", ":modal"];
function Df(e) {
  return vA.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const yA = ["transform", "translate", "scale", "rotate", "perspective"],
  wA = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  xA = ["paint", "layout", "strict", "content"];
function om(e) {
  const t = lm(),
    n = gr(e) ? mr(e) : e;
  return (
    yA.some((r) => (n[r] ? n[r] !== "none" : !1)) ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    wA.some((r) => (n.willChange || "").includes(r)) ||
    xA.some((r) => (n.contain || "").includes(r))
  );
}
function SA(e) {
  let t = Hi(e);
  for (; Pr(t) && !Ml(t); ) {
    if (om(t)) return t;
    if (Df(t)) return null;
    t = Hi(t);
  }
  return null;
}
function lm() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const CA = new Set(["html", "body", "#document"]);
function Ml(e) {
  return CA.has(Ul(e));
}
function mr(e) {
  return On(e).getComputedStyle(e);
}
function Nf(e) {
  return gr(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Hi(e) {
  if (Ul(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (K2(e) && e.host) || ni(e);
  return K2(t) ? t.host : t;
}
function fx(e) {
  const t = Hi(e);
  return Ml(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Pr(t) && ws(t)
    ? t
    : fx(t);
}
function Cl(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = fx(e),
    l = i === ((r = e.ownerDocument) == null ? void 0 : r.body),
    s = On(i);
  if (l) {
    const a = wg(s);
    return t.concat(
      s,
      s.visualViewport || [],
      ws(i) ? i : [],
      a && n ? Cl(a) : []
    );
  }
  return t.concat(i, Cl(i, [], n));
}
function wg(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function dx(e) {
  const t = mr(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = Pr(e),
    l = i ? e.offsetWidth : n,
    s = i ? e.offsetHeight : r,
    a = Dc(n) !== l || Dc(r) !== s;
  return a && ((n = l), (r = s)), { width: n, height: r, $: a };
}
function px(e) {
  return gr(e) ? e : e.contextElement;
}
function El(e) {
  const t = px(e);
  if (!Pr(t)) return Ir(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: l } = dx(t);
  let s = (l ? Dc(n.width) : n.width) / r,
    a = (l ? Dc(n.height) : n.height) / i;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!a || !Number.isFinite(a)) && (a = 1),
    { x: s, y: a }
  );
}
const EA = Ir(0);
function hx(e) {
  const t = On(e);
  return !lm() || !t.visualViewport
    ? EA
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function kA(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== On(e)) ? !1 : t;
}
function as(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(),
    l = px(e);
  let s = Ir(1);
  t && (r ? gr(r) && (s = El(r)) : (s = El(e)));
  const a = kA(l, n, r) ? hx(l) : Ir(0);
  let f = (i.left + a.x) / s.x,
    d = (i.top + a.y) / s.y,
    p = i.width / s.x,
    g = i.height / s.y;
  if (l) {
    const v = On(l),
      m = r && gr(r) ? On(r) : r;
    let E = v,
      S = wg(E);
    for (; S && r && m !== E; ) {
      const N = El(S),
        y = S.getBoundingClientRect(),
        x = mr(S),
        k = y.left + (S.clientLeft + parseFloat(x.paddingLeft)) * N.x,
        I = y.top + (S.clientTop + parseFloat(x.paddingTop)) * N.y;
      (f *= N.x),
        (d *= N.y),
        (p *= N.x),
        (g *= N.y),
        (f += k),
        (d += I),
        (E = On(S)),
        (S = wg(E));
    }
  }
  return Ac({ width: p, height: g, x: f, y: d });
}
function um(e, t) {
  const n = Nf(e).scrollLeft;
  return t ? t.left + n : as(ni(e)).left + n;
}
function gx(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(),
    i = r.left + t.scrollLeft - (n ? 0 : um(e, r)),
    l = r.top + t.scrollTop;
  return { x: i, y: l };
}
function bA(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
  const l = i === "fixed",
    s = ni(r),
    a = t ? Df(t.floating) : !1;
  if (r === s || (a && l)) return n;
  let f = { scrollLeft: 0, scrollTop: 0 },
    d = Ir(1);
  const p = Ir(0),
    g = Pr(r);
  if (
    (g || (!g && !l)) &&
    ((Ul(r) !== "body" || ws(s)) && (f = Nf(r)), Pr(r))
  ) {
    const m = as(r);
    (d = El(r)), (p.x = m.x + r.clientLeft), (p.y = m.y + r.clientTop);
  }
  const v = s && !g && !l ? gx(s, f, !0) : Ir(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - f.scrollLeft * d.x + p.x + v.x,
    y: n.y * d.y - f.scrollTop * d.y + p.y + v.y,
  };
}
function _A(e) {
  return Array.from(e.getClientRects());
}
function OA(e) {
  const t = ni(e),
    n = Nf(e),
    r = e.ownerDocument.body,
    i = $u(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    l = $u(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + um(e);
  const a = -n.scrollTop;
  return (
    mr(r).direction === "rtl" && (s += $u(t.clientWidth, r.clientWidth) - i),
    { width: i, height: l, x: s, y: a }
  );
}
function TA(e, t) {
  const n = On(e),
    r = ni(e),
    i = n.visualViewport;
  let l = r.clientWidth,
    s = r.clientHeight,
    a = 0,
    f = 0;
  if (i) {
    (l = i.width), (s = i.height);
    const d = lm();
    (!d || (d && t === "fixed")) && ((a = i.offsetLeft), (f = i.offsetTop));
  }
  return { width: l, height: s, x: a, y: f };
}
const IA = new Set(["absolute", "fixed"]);
function PA(e, t) {
  const n = as(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    l = Pr(e) ? El(e) : Ir(1),
    s = e.clientWidth * l.x,
    a = e.clientHeight * l.y,
    f = i * l.x,
    d = r * l.y;
  return { width: s, height: a, x: f, y: d };
}
function Q2(e, t, n) {
  let r;
  if (t === "viewport") r = TA(e, n);
  else if (t === "document") r = OA(ni(e));
  else if (gr(t)) r = PA(t, n);
  else {
    const i = hx(e);
    r = { x: t.x - i.x, y: t.y - i.y, width: t.width, height: t.height };
  }
  return Ac(r);
}
function mx(e, t) {
  const n = Hi(e);
  return n === t || !gr(n) || Ml(n)
    ? !1
    : mr(n).position === "fixed" || mx(n, t);
}
function RA(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Cl(e, [], !1).filter((a) => gr(a) && Ul(a) !== "body"),
    i = null;
  const l = mr(e).position === "fixed";
  let s = l ? Hi(e) : e;
  for (; gr(s) && !Ml(s); ) {
    const a = mr(s),
      f = om(s);
    !f && a.position === "fixed" && (i = null),
      (
        l
          ? !f && !i
          : (!f && a.position === "static" && !!i && IA.has(i.position)) ||
            (ws(s) && !f && mx(e, s))
      )
        ? (r = r.filter((p) => p !== s))
        : (i = a),
      (s = Hi(s));
  }
  return t.set(e, r), r;
}
function AA(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
  const s = [
      ...(n === "clippingAncestors"
        ? Df(t)
          ? []
          : RA(t, this._c)
        : [].concat(n)),
      r,
    ],
    a = s[0],
    f = s.reduce((d, p) => {
      const g = Q2(t, p, i);
      return (
        (d.top = $u(g.top, d.top)),
        (d.right = q2(g.right, d.right)),
        (d.bottom = q2(g.bottom, d.bottom)),
        (d.left = $u(g.left, d.left)),
        d
      );
    }, Q2(t, a, i));
  return {
    width: f.right - f.left,
    height: f.bottom - f.top,
    x: f.left,
    y: f.top,
  };
}
function DA(e) {
  const { width: t, height: n } = dx(e);
  return { width: t, height: n };
}
function NA(e, t, n) {
  const r = Pr(t),
    i = ni(t),
    l = n === "fixed",
    s = as(e, !0, l, t);
  let a = { scrollLeft: 0, scrollTop: 0 };
  const f = Ir(0);
  function d() {
    f.x = um(i);
  }
  if (r || (!r && !l))
    if (((Ul(t) !== "body" || ws(i)) && (a = Nf(t)), r)) {
      const m = as(t, !0, l, t);
      (f.x = m.x + t.clientLeft), (f.y = m.y + t.clientTop);
    } else i && d();
  l && !r && i && d();
  const p = i && !r && !l ? gx(i, a) : Ir(0),
    g = s.left + a.scrollLeft - f.x - p.x,
    v = s.top + a.scrollTop - f.y - p.y;
  return { x: g, y: v, width: s.width, height: s.height };
}
function Kp(e) {
  return mr(e).position === "static";
}
function Y2(e, t) {
  if (!Pr(e) || mr(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return ni(e) === n && (n = n.ownerDocument.body), n;
}
function vx(e, t) {
  const n = On(e);
  if (Df(e)) return n;
  if (!Pr(e)) {
    let i = Hi(e);
    for (; i && !Ml(i); ) {
      if (gr(i) && !Kp(i)) return i;
      i = Hi(i);
    }
    return n;
  }
  let r = Y2(e, t);
  for (; r && mA(r) && Kp(r); ) r = Y2(r, t);
  return r && Ml(r) && Kp(r) && !om(r) ? n : r || SA(e) || n;
}
const LA = async function (e) {
  const t = this.getOffsetParent || vx,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: NA(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function MA(e) {
  return mr(e).direction === "rtl";
}
const FA = {
    convertOffsetParentRelativeRectToViewportRelativeRect: bA,
    getDocumentElement: ni,
    getClippingRect: AA,
    getOffsetParent: vx,
    getElementRects: LA,
    getClientRects: _A,
    getDimensions: DA,
    getScale: El,
    isElement: gr,
    isRTL: MA,
  },
  $A = dA,
  zA = pA,
  BA = aA,
  HA = (e, t, n) => {
    const r = new Map(),
      i = { platform: FA, ...n },
      l = { ...i.platform, _c: r };
    return sA(e, t, { ...i, platform: l });
  };
var UA = typeof document < "u",
  WA = function () {},
  Ka = UA ? A.useLayoutEffect : WA;
function Nc(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Nc(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const l = i[r];
      if (!(l === "_owner" && e.$$typeof) && !Nc(e[l], t[l])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function yx(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function X2(e, t) {
  const n = yx(e);
  return Math.round(t * n) / n;
}
function Qp(e) {
  const t = A.useRef(e);
  return (
    Ka(() => {
      t.current = e;
    }),
    t
  );
}
function jA(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: i,
      elements: { reference: l, floating: s } = {},
      transform: a = !0,
      whileElementsMounted: f,
      open: d,
    } = e,
    [p, g] = A.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [v, m] = A.useState(r);
  Nc(v, r) || m(r);
  const [E, S] = A.useState(null),
    [N, y] = A.useState(null),
    x = A.useCallback((W) => {
      W !== P.current && ((P.current = W), S(W));
    }, []),
    k = A.useCallback((W) => {
      W !== $.current && (($.current = W), y(W));
    }, []),
    I = l || E,
    M = s || N,
    P = A.useRef(null),
    $ = A.useRef(null),
    B = A.useRef(p),
    Y = f != null,
    ee = Qp(f),
    G = Qp(i),
    Z = Qp(d),
    re = A.useCallback(() => {
      if (!P.current || !$.current) return;
      const W = { placement: t, strategy: n, middleware: v };
      G.current && (W.platform = G.current),
        HA(P.current, $.current, W).then((te) => {
          const _ = { ...te, isPositioned: Z.current !== !1 };
          ae.current &&
            !Nc(B.current, _) &&
            ((B.current = _),
            Bl.flushSync(() => {
              g(_);
            }));
        });
    }, [v, t, n, G, Z]);
  Ka(() => {
    d === !1 &&
      B.current.isPositioned &&
      ((B.current.isPositioned = !1), g((W) => ({ ...W, isPositioned: !1 })));
  }, [d]);
  const ae = A.useRef(!1);
  Ka(
    () => (
      (ae.current = !0),
      () => {
        ae.current = !1;
      }
    ),
    []
  ),
    Ka(() => {
      if ((I && (P.current = I), M && ($.current = M), I && M)) {
        if (ee.current) return ee.current(I, M, re);
        re();
      }
    }, [I, M, re, ee, Y]);
  const ce = A.useMemo(
      () => ({ reference: P, floating: $, setReference: x, setFloating: k }),
      [x, k]
    ),
    ge = A.useMemo(() => ({ reference: I, floating: M }), [I, M]),
    me = A.useMemo(() => {
      const W = { position: n, left: 0, top: 0 };
      if (!ge.floating) return W;
      const te = X2(ge.floating, p.x),
        _ = X2(ge.floating, p.y);
      return a
        ? {
            ...W,
            transform: "translate(" + te + "px, " + _ + "px)",
            ...(yx(ge.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: te, top: _ };
    }, [n, a, ge.floating, p.x, p.y]);
  return A.useMemo(
    () => ({ ...p, update: re, refs: ce, elements: ge, floatingStyles: me }),
    [p, re, ce, ge, me]
  );
}
const VA = (e, t) => ({ ...$A(e), options: [e, t] }),
  GA = (e, t) => ({ ...zA(e), options: [e, t] }),
  qA = (e, t) => ({ ...BA(e), options: [e, t] });
/*!
 * tabbable 6.2.0
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var KA = [
    "input:not([inert])",
    "select:not([inert])",
    "textarea:not([inert])",
    "a[href]:not([inert])",
    "button:not([inert])",
    "[tabindex]:not(slot):not([inert])",
    "audio[controls]:not([inert])",
    "video[controls]:not([inert])",
    '[contenteditable]:not([contenteditable="false"]):not([inert])',
    "details>summary:first-of-type:not([inert])",
    "details:not([inert])",
  ],
  xg = KA.join(","),
  wx = typeof Element > "u",
  cs = wx
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  Lc =
    !wx && Element.prototype.getRootNode
      ? function (e) {
          var t;
          return e == null || (t = e.getRootNode) === null || t === void 0
            ? void 0
            : t.call(e);
        }
      : function (e) {
          return e?.ownerDocument;
        },
  Mc = function e(t, n) {
    var r;
    n === void 0 && (n = !0);
    var i =
        t == null || (r = t.getAttribute) === null || r === void 0
          ? void 0
          : r.call(t, "inert"),
      l = i === "" || i === "true",
      s = l || (n && t && e(t.parentNode));
    return s;
  },
  QA = function (t) {
    var n,
      r =
        t == null || (n = t.getAttribute) === null || n === void 0
          ? void 0
          : n.call(t, "contenteditable");
    return r === "" || r === "true";
  },
  YA = function (t, n, r) {
    if (Mc(t)) return [];
    var i = Array.prototype.slice.apply(t.querySelectorAll(xg));
    return n && cs.call(t, xg) && i.unshift(t), (i = i.filter(r)), i;
  },
  XA = function e(t, n, r) {
    for (var i = [], l = Array.from(t); l.length; ) {
      var s = l.shift();
      if (!Mc(s, !1))
        if (s.tagName === "SLOT") {
          var a = s.assignedElements(),
            f = a.length ? a : s.children,
            d = e(f, !0, r);
          r.flatten
            ? i.push.apply(i, d)
            : i.push({ scopeParent: s, candidates: d });
        } else {
          var p = cs.call(s, xg);
          p && r.filter(s) && (n || !t.includes(s)) && i.push(s);
          var g =
              s.shadowRoot ||
              (typeof r.getShadowRoot == "function" && r.getShadowRoot(s)),
            v = !Mc(g, !1) && (!r.shadowRootFilter || r.shadowRootFilter(s));
          if (g && v) {
            var m = e(g === !0 ? s.children : g.children, !0, r);
            r.flatten
              ? i.push.apply(i, m)
              : i.push({ scopeParent: s, candidates: m });
          } else l.unshift.apply(l, s.children);
        }
    }
    return i;
  },
  xx = function (t) {
    return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
  },
  Sx = function (t) {
    if (!t) throw new Error("No node provided");
    return t.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || QA(t)) &&
      !xx(t)
      ? 0
      : t.tabIndex;
  },
  ZA = function (t, n) {
    var r = Sx(t);
    return r < 0 && n && !xx(t) ? 0 : r;
  },
  JA = function (t, n) {
    return t.tabIndex === n.tabIndex
      ? t.documentOrder - n.documentOrder
      : t.tabIndex - n.tabIndex;
  },
  Cx = function (t) {
    return t.tagName === "INPUT";
  },
  eD = function (t) {
    return Cx(t) && t.type === "hidden";
  },
  tD = function (t) {
    var n =
      t.tagName === "DETAILS" &&
      Array.prototype.slice.apply(t.children).some(function (r) {
        return r.tagName === "SUMMARY";
      });
    return n;
  },
  nD = function (t, n) {
    for (var r = 0; r < t.length; r++)
      if (t[r].checked && t[r].form === n) return t[r];
  },
  rD = function (t) {
    if (!t.name) return !0;
    var n = t.form || Lc(t),
      r = function (a) {
        return n.querySelectorAll('input[type="radio"][name="' + a + '"]');
      },
      i;
    if (
      typeof window < "u" &&
      typeof window.CSS < "u" &&
      typeof window.CSS.escape == "function"
    )
      i = r(window.CSS.escape(t.name));
    else
      try {
        i = r(t.name);
      } catch (s) {
        return (
          console.error(
            "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
            s.message
          ),
          !1
        );
      }
    var l = nD(i, t.form);
    return !l || l === t;
  },
  iD = function (t) {
    return Cx(t) && t.type === "radio";
  },
  oD = function (t) {
    return iD(t) && !rD(t);
  },
  lD = function (t) {
    var n,
      r = t && Lc(t),
      i = (n = r) === null || n === void 0 ? void 0 : n.host,
      l = !1;
    if (r && r !== t) {
      var s, a, f;
      for (
        l = !!(
          ((s = i) !== null &&
            s !== void 0 &&
            (a = s.ownerDocument) !== null &&
            a !== void 0 &&
            a.contains(i)) ||
          (t != null &&
            (f = t.ownerDocument) !== null &&
            f !== void 0 &&
            f.contains(t))
        );
        !l && i;

      ) {
        var d, p, g;
        (r = Lc(i)),
          (i = (d = r) === null || d === void 0 ? void 0 : d.host),
          (l = !!(
            (p = i) !== null &&
            p !== void 0 &&
            (g = p.ownerDocument) !== null &&
            g !== void 0 &&
            g.contains(i)
          ));
      }
    }
    return l;
  },
  Z2 = function (t) {
    var n = t.getBoundingClientRect(),
      r = n.width,
      i = n.height;
    return r === 0 && i === 0;
  },
  uD = function (t, n) {
    var r = n.displayCheck,
      i = n.getShadowRoot;
    if (getComputedStyle(t).visibility === "hidden") return !0;
    var l = cs.call(t, "details>summary:first-of-type"),
      s = l ? t.parentElement : t;
    if (cs.call(s, "details:not([open]) *")) return !0;
    if (!r || r === "full" || r === "legacy-full") {
      if (typeof i == "function") {
        for (var a = t; t; ) {
          var f = t.parentElement,
            d = Lc(t);
          if (f && !f.shadowRoot && i(f) === !0) return Z2(t);
          t.assignedSlot
            ? (t = t.assignedSlot)
            : !f && d !== t.ownerDocument
            ? (t = d.host)
            : (t = f);
        }
        t = a;
      }
      if (lD(t)) return !t.getClientRects().length;
      if (r !== "legacy-full") return !0;
    } else if (r === "non-zero-area") return Z2(t);
    return !1;
  },
  sD = function (t) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
      for (var n = t.parentElement; n; ) {
        if (n.tagName === "FIELDSET" && n.disabled) {
          for (var r = 0; r < n.children.length; r++) {
            var i = n.children.item(r);
            if (i.tagName === "LEGEND")
              return cs.call(n, "fieldset[disabled] *") ? !0 : !i.contains(t);
          }
          return !0;
        }
        n = n.parentElement;
      }
    return !1;
  },
  aD = function (t, n) {
    return !(n.disabled || Mc(n) || eD(n) || uD(n, t) || tD(n) || sD(n));
  },
  J2 = function (t, n) {
    return !(oD(n) || Sx(n) < 0 || !aD(t, n));
  },
  cD = function (t) {
    var n = parseInt(t.getAttribute("tabindex"), 10);
    return !!(isNaN(n) || n >= 0);
  },
  fD = function e(t) {
    var n = [],
      r = [];
    return (
      t.forEach(function (i, l) {
        var s = !!i.scopeParent,
          a = s ? i.scopeParent : i,
          f = ZA(a, s),
          d = s ? e(i.candidates) : a;
        f === 0
          ? s
            ? n.push.apply(n, d)
            : n.push(a)
          : r.push({
              documentOrder: l,
              tabIndex: f,
              item: i,
              isScope: s,
              content: d,
            });
      }),
      r
        .sort(JA)
        .reduce(function (i, l) {
          return l.isScope ? i.push.apply(i, l.content) : i.push(l.content), i;
        }, [])
        .concat(n)
    );
  },
  sm = function (t, n) {
    n = n || {};
    var r;
    return (
      n.getShadowRoot
        ? (r = XA([t], n.includeContainer, {
            filter: J2.bind(null, n),
            flatten: !1,
            getShadowRoot: n.getShadowRoot,
            shadowRootFilter: cD,
          }))
        : (r = YA(t, n.includeContainer, J2.bind(null, n))),
      fD(r)
    );
  };
function dD(e) {
  return A.useMemo(
    () =>
      e.every((t) => t == null)
        ? null
        : (t) => {
            e.forEach((n) => {
              typeof n == "function" ? n(t) : n != null && (n.current = t);
            });
          },
    e
  );
}
let e3 = 0;
function lo(e, t) {
  t === void 0 && (t = {});
  const { preventScroll: n = !1, cancelPrevious: r = !0, sync: i = !1 } = t;
  r && cancelAnimationFrame(e3);
  const l = () => e?.focus({ preventScroll: n });
  i ? l() : (e3 = requestAnimationFrame(l));
}
var on = typeof document < "u" ? A.useLayoutEffect : A.useEffect;
function fs() {
  return (
    (fs = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    fs.apply(this, arguments)
  );
}
let Yp = !1,
  pD = 0;
const t3 = () => "floating-ui-" + pD++;
function hD() {
  const [e, t] = A.useState(() => (Yp ? t3() : void 0));
  return (
    on(() => {
      e == null && t(t3());
    }, []),
    A.useEffect(() => {
      Yp || (Yp = !0);
    }, []),
    e
  );
}
const gD = uw["useId".toString()],
  am = gD || hD;
function mD() {
  const e = new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((i) => i(n));
    },
    on(t, n) {
      e.set(t, [...(e.get(t) || []), n]);
    },
    off(t, n) {
      var r;
      e.set(
        t,
        ((r = e.get(t)) == null ? void 0 : r.filter((i) => i !== n)) || []
      );
    },
  };
}
const vD = A.createContext(null),
  yD = A.createContext(null),
  wD = () => {
    var e;
    return ((e = A.useContext(vD)) == null ? void 0 : e.id) || null;
  },
  cm = () => A.useContext(yD);
function ds(e) {
  return "data-floating-ui-" + e;
}
function vo(e) {
  const t = A.useRef(e);
  return (
    on(() => {
      t.current = e;
    }),
    t
  );
}
function xD(e, t) {
  var n;
  let r = [],
    i = (n = e.find((l) => l.id === t)) == null ? void 0 : n.parentId;
  for (; i; ) {
    const l = e.find((s) => s.id === i);
    (i = l?.parentId), l && (r = r.concat(l));
  }
  return r;
}
function zu(e, t) {
  let n = e.filter((i) => {
      var l;
      return i.parentId === t && ((l = i.context) == null ? void 0 : l.open);
    }),
    r = n;
  for (; r.length; )
    (r = e.filter((i) => {
      var l;
      return (l = r) == null
        ? void 0
        : l.some((s) => {
            var a;
            return (
              i.parentId === s.id && ((a = i.context) == null ? void 0 : a.open)
            );
          });
    })),
      (n = n.concat(r));
  return n;
}
let Xo = new WeakMap(),
  Pa = new WeakSet(),
  Ra = {},
  Xp = 0;
const SD = () => typeof HTMLElement < "u" && "inert" in HTMLElement.prototype,
  Ex = (e) => e && (e.host || Ex(e.parentNode)),
  CD = (e, t) =>
    t
      .map((n) => {
        if (e.contains(n)) return n;
        const r = Ex(n);
        return e.contains(r) ? r : null;
      })
      .filter((n) => n != null);
function ED(e, t, n, r) {
  const i = "data-floating-ui-inert",
    l = r ? "inert" : n ? "aria-hidden" : null,
    s = CD(t, e),
    a = new Set(),
    f = new Set(s),
    d = [];
  Ra[i] || (Ra[i] = new WeakMap());
  const p = Ra[i];
  s.forEach(g), v(t), a.clear();
  function g(m) {
    !m || a.has(m) || (a.add(m), m.parentNode && g(m.parentNode));
  }
  function v(m) {
    !m ||
      f.has(m) ||
      Array.prototype.forEach.call(m.children, (E) => {
        if (a.has(E)) v(E);
        else {
          const S = l ? E.getAttribute(l) : null,
            N = S !== null && S !== "false",
            y = (Xo.get(E) || 0) + 1,
            x = (p.get(E) || 0) + 1;
          Xo.set(E, y),
            p.set(E, x),
            d.push(E),
            y === 1 && N && Pa.add(E),
            x === 1 && E.setAttribute(i, ""),
            !N && l && E.setAttribute(l, "true");
        }
      });
  }
  return (
    Xp++,
    () => {
      d.forEach((m) => {
        const E = (Xo.get(m) || 0) - 1,
          S = (p.get(m) || 0) - 1;
        Xo.set(m, E),
          p.set(m, S),
          E || (!Pa.has(m) && l && m.removeAttribute(l), Pa.delete(m)),
          S || m.removeAttribute(i);
      }),
        Xp--,
        Xp ||
          ((Xo = new WeakMap()),
          (Xo = new WeakMap()),
          (Pa = new WeakSet()),
          (Ra = {}));
    }
  );
}
function n3(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = kr(e[0]).body;
  return ED(e.concat(Array.from(r.querySelectorAll("[aria-live]"))), r, t, n);
}
const fm = () => ({
  getShadowRoot: !0,
  displayCheck:
    typeof ResizeObserver == "function" &&
    ResizeObserver.toString().includes("[native code]")
      ? "full"
      : "none",
});
function kx(e, t) {
  const n = sm(e, fm());
  t === "prev" && n.reverse();
  const r = n.indexOf(el(kr(e)));
  return n.slice(r + 1)[0];
}
function bx() {
  return kx(document.body, "next");
}
function _x() {
  return kx(document.body, "prev");
}
function Bu(e, t) {
  const n = t || e.currentTarget,
    r = e.relatedTarget;
  return !r || !wn(n, r);
}
function kD(e) {
  sm(e, fm()).forEach((n) => {
    (n.dataset.tabindex = n.getAttribute("tabindex") || ""),
      n.setAttribute("tabindex", "-1");
  });
}
function bD(e) {
  e.querySelectorAll("[data-tabindex]").forEach((n) => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex,
      r ? n.setAttribute("tabindex", r) : n.removeAttribute("tabindex");
  });
}
const dm = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0,
};
let _D;
function r3(e) {
  e.key === "Tab" && (e.target, clearTimeout(_D));
}
const Fc = A.forwardRef(function (t, n) {
    const [r, i] = A.useState();
    on(
      () => (
        jR() && i("button"),
        document.addEventListener("keydown", r3),
        () => {
          document.removeEventListener("keydown", r3);
        }
      ),
      []
    );
    const l = {
      ref: n,
      tabIndex: 0,
      role: r,
      "aria-hidden": r ? void 0 : !0,
      [ds("focus-guard")]: "",
      style: dm,
    };
    return A.createElement("span", fs({}, t, l));
  }),
  Ox = A.createContext(null);
function OD(e) {
  let { id: t, root: n } = e === void 0 ? {} : e;
  const [r, i] = A.useState(null),
    l = am(),
    s = Ix(),
    a = A.useMemo(
      () => ({ id: t, root: n, portalContext: s, uniqueId: l }),
      [t, n, s, l]
    ),
    f = A.useRef();
  return (
    on(
      () => () => {
        r?.remove();
      },
      [r, a]
    ),
    on(() => {
      if (f.current === a) return;
      f.current = a;
      const { id: d, root: p, portalContext: g, uniqueId: v } = a,
        m = d ? document.getElementById(d) : null,
        E = ds("portal");
      if (m) {
        const S = document.createElement("div");
        (S.id = v), S.setAttribute(E, ""), m.appendChild(S), i(S);
      } else {
        let S = p || g?.portalNode;
        S && !cr(S) && (S = S.current), (S = S || document.body);
        let N = null;
        d &&
          ((N = document.createElement("div")), (N.id = d), S.appendChild(N));
        const y = document.createElement("div");
        (y.id = v), y.setAttribute(E, ""), (S = N || S), S.appendChild(y), i(y);
      }
    }, [a]),
    r
  );
}
function Tx(e) {
  let { children: t, id: n, root: r = null, preserveTabOrder: i = !0 } = e;
  const l = OD({ id: n, root: r }),
    [s, a] = A.useState(null),
    f = A.useRef(null),
    d = A.useRef(null),
    p = A.useRef(null),
    g = A.useRef(null),
    v = !!s && !s.modal && s.open && i && !!(r || l);
  return (
    A.useEffect(() => {
      if (!l || !i || (s != null && s.modal)) return;
      function m(E) {
        l && Bu(E) && (E.type === "focusin" ? bD : kD)(l);
      }
      return (
        l.addEventListener("focusin", m, !0),
        l.addEventListener("focusout", m, !0),
        () => {
          l.removeEventListener("focusin", m, !0),
            l.removeEventListener("focusout", m, !0);
        }
      );
    }, [l, i, s?.modal]),
    A.createElement(
      Ox.Provider,
      {
        value: A.useMemo(
          () => ({
            preserveTabOrder: i,
            beforeOutsideRef: f,
            afterOutsideRef: d,
            beforeInsideRef: p,
            afterInsideRef: g,
            portalNode: l,
            setFocusManagerState: a,
          }),
          [i, l]
        ),
      },
      v &&
        l &&
        A.createElement(Fc, {
          "data-type": "outside",
          ref: f,
          onFocus: (m) => {
            if (Bu(m, l)) {
              var E;
              (E = p.current) == null || E.focus();
            } else {
              const S = _x() || s?.refs.domReference.current;
              S?.focus();
            }
          },
        }),
      v && l && A.createElement("span", { "aria-owns": l.id, style: dm }),
      l && Bl.createPortal(t, l),
      v &&
        l &&
        A.createElement(Fc, {
          "data-type": "outside",
          ref: d,
          onFocus: (m) => {
            if (Bu(m, l)) {
              var E;
              (E = g.current) == null || E.focus();
            } else {
              const S = bx() || s?.refs.domReference.current;
              S?.focus(),
                s?.closeOnFocusOut && s?.onOpenChange(!1, m.nativeEvent);
            }
          },
        })
    )
  );
}
const Ix = () => A.useContext(Ox),
  TD = A.forwardRef(function (t, n) {
    return A.createElement(
      "button",
      fs({}, t, { type: "button", ref: n, tabIndex: -1, style: dm })
    );
  });
function ID(e) {
  const {
      context: t,
      children: n,
      disabled: r = !1,
      order: i = ["content"],
      guards: l = !0,
      initialFocus: s = 0,
      returnFocus: a = !0,
      modal: f = !0,
      visuallyHiddenDismiss: d = !1,
      closeOnFocusOut: p = !0,
    } = e,
    {
      open: g,
      refs: v,
      nodeId: m,
      onOpenChange: E,
      events: S,
      dataRef: N,
      elements: { domReference: y, floating: x },
    } = t,
    k = SD() ? l : !0,
    I = vo(i),
    M = vo(s),
    P = vo(a),
    $ = cm(),
    B = Ix(),
    Y = typeof s == "number" && s < 0,
    ee = A.useRef(null),
    G = A.useRef(null),
    Z = A.useRef(!1),
    re = A.useRef(null),
    ae = A.useRef(!1),
    ce = B != null,
    ge = y && y.getAttribute("role") === "combobox" && KR(y) && Y,
    me = A.useCallback(
      function (ne) {
        return ne === void 0 && (ne = x), ne ? sm(ne, fm()) : [];
      },
      [x]
    ),
    W = A.useCallback(
      (ne) => {
        const se = me(ne);
        return I.current
          .map((O) =>
            y && O === "reference" ? y : x && O === "floating" ? x : se
          )
          .filter(Boolean)
          .flat();
      },
      [y, x, I, me]
    );
  A.useEffect(() => {
    if (r || !f) return;
    function ne(O) {
      if (O.key === "Tab") {
        wn(x, el(kr(x))) && me().length === 0 && !ge && qp(O);
        const ve = W(),
          Fe = ox(O);
        I.current[0] === "reference" &&
          Fe === y &&
          (qp(O), O.shiftKey ? lo(ve[ve.length - 1]) : lo(ve[1])),
          I.current[1] === "floating" &&
            Fe === x &&
            O.shiftKey &&
            (qp(O), lo(ve[0]));
      }
    }
    const se = kr(x);
    return (
      se.addEventListener("keydown", ne),
      () => {
        se.removeEventListener("keydown", ne);
      }
    );
  }, [r, y, x, f, I, v, ge, me, W]),
    A.useEffect(() => {
      if (r || !p) return;
      function ne() {
        (ae.current = !0),
          setTimeout(() => {
            ae.current = !1;
          });
      }
      function se(O) {
        const ve = O.relatedTarget;
        queueMicrotask(() => {
          const Fe = !(
            wn(y, ve) ||
            wn(x, ve) ||
            wn(ve, x) ||
            wn(B?.portalNode, ve) ||
            (ve != null && ve.hasAttribute(ds("focus-guard"))) ||
            ($ &&
              (zu($.nodesRef.current, m).find((we) => {
                var nt, ct;
                return (
                  wn(
                    (nt = we.context) == null ? void 0 : nt.elements.floating,
                    ve
                  ) ||
                  wn(
                    (ct = we.context) == null
                      ? void 0
                      : ct.elements.domReference,
                    ve
                  )
                );
              }) ||
                xD($.nodesRef.current, m).find((we) => {
                  var nt, ct;
                  return (
                    ((nt = we.context) == null
                      ? void 0
                      : nt.elements.floating) === ve ||
                    ((ct = we.context) == null
                      ? void 0
                      : ct.elements.domReference) === ve
                  );
                })))
          );
          ve &&
            Fe &&
            !ae.current &&
            ve !== re.current &&
            ((Z.current = !0), E(!1, O));
        });
      }
      if (x && Pc(y))
        return (
          y.addEventListener("focusout", se),
          y.addEventListener("pointerdown", ne),
          !f && x.addEventListener("focusout", se),
          () => {
            y.removeEventListener("focusout", se),
              y.removeEventListener("pointerdown", ne),
              !f && x.removeEventListener("focusout", se);
          }
        );
    }, [r, y, x, f, m, $, B, E, p]),
    A.useEffect(() => {
      var ne;
      if (r) return;
      const se = Array.from(
        (B == null || (ne = B.portalNode) == null
          ? void 0
          : ne.querySelectorAll("[" + ds("portal") + "]")) || []
      );
      if (x) {
        const O = [
            x,
            ...se,
            ee.current,
            G.current,
            I.current.includes("reference") || ge ? y : null,
          ].filter((Fe) => Fe != null),
          ve = f ? n3(O, k, !k) : n3(O);
        return () => {
          ve();
        };
      }
    }, [r, y, x, f, I, B, ge, k]),
    on(() => {
      if (r || !x) return;
      const ne = kr(x),
        se = el(ne);
      queueMicrotask(() => {
        const O = W(x),
          ve = M.current,
          Fe = (typeof ve == "number" ? O[ve] : ve.current) || x,
          we = wn(x, se);
        !Y && !we && g && lo(Fe, { preventScroll: Fe === x });
      });
    }, [r, g, x, Y, W, M]),
    on(() => {
      if (r || !x) return;
      let ne = !1;
      const se = kr(x),
        O = el(se),
        ve = N.current;
      re.current = O;
      function Fe(we) {
        if (
          (we.type === "escapeKey" &&
            v.domReference.current &&
            (re.current = v.domReference.current),
          ["referencePress", "escapeKey"].includes(we.type))
        )
          return;
        const nt = we.data.returnFocus;
        typeof nt == "object"
          ? ((Z.current = !1), (ne = nt.preventScroll))
          : (Z.current = !nt);
      }
      return (
        S.on("dismiss", Fe),
        () => {
          S.off("dismiss", Fe);
          const we = el(se);
          (wn(x, we) ||
            ($ &&
              zu($.nodesRef.current, m).some((ct) => {
                var Bt;
                return wn(
                  (Bt = ct.context) == null ? void 0 : Bt.elements.floating,
                  we
                );
              })) ||
            (ve.openEvent &&
              ["click", "mousedown"].includes(ve.openEvent.type))) &&
            v.domReference.current &&
            (re.current = v.domReference.current),
            P.current &&
              Pc(re.current) &&
              !Z.current &&
              lo(re.current, { cancelPrevious: !1, preventScroll: ne });
        }
      );
    }, [r, x, P, N, v, S, $, m]),
    on(() => {
      if (!(r || !B))
        return (
          B.setFocusManagerState({
            modal: f,
            closeOnFocusOut: p,
            open: g,
            onOpenChange: E,
            refs: v,
          }),
          () => {
            B.setFocusManagerState(null);
          }
        );
    }, [r, B, f, g, E, v, p]),
    on(() => {
      if (!r && x && typeof MutationObserver == "function" && !Y) {
        const ne = () => {
          const O = x.getAttribute("tabindex");
          I.current.includes("floating") ||
          (el(kr(x)) !== v.domReference.current && me().length === 0)
            ? O !== "0" && x.setAttribute("tabindex", "0")
            : O !== "-1" && x.setAttribute("tabindex", "-1");
        };
        ne();
        const se = new MutationObserver(ne);
        return (
          se.observe(x, { childList: !0, subtree: !0, attributes: !0 }),
          () => {
            se.disconnect();
          }
        );
      }
    }, [r, x, v, I, me, Y]);
  function te(ne) {
    return r || !d || !f
      ? null
      : A.createElement(
          TD,
          {
            ref: ne === "start" ? ee : G,
            onClick: (se) => E(!1, se.nativeEvent),
          },
          typeof d == "string" ? d : "Dismiss"
        );
  }
  const _ = !r && k && !ge && (ce || f);
  return A.createElement(
    A.Fragment,
    null,
    _ &&
      A.createElement(Fc, {
        "data-type": "inside",
        ref: B?.beforeInsideRef,
        onFocus: (ne) => {
          if (f) {
            const O = W();
            lo(i[0] === "reference" ? O[0] : O[O.length - 1]);
          } else if (B != null && B.preserveTabOrder && B.portalNode)
            if (((Z.current = !1), Bu(ne, B.portalNode))) {
              const O = bx() || y;
              O?.focus();
            } else {
              var se;
              (se = B.beforeOutsideRef.current) == null || se.focus();
            }
        },
      }),
    !ge && te("start"),
    n,
    te("end"),
    _ &&
      A.createElement(Fc, {
        "data-type": "inside",
        ref: B?.afterInsideRef,
        onFocus: (ne) => {
          if (f) lo(W()[0]);
          else if (B != null && B.preserveTabOrder && B.portalNode)
            if ((p && (Z.current = !0), Bu(ne, B.portalNode))) {
              const O = _x() || y;
              O?.focus();
            } else {
              var se;
              (se = B.afterOutsideRef.current) == null || se.focus();
            }
        },
      })
  );
}
const Zp = new Set(),
  PD = A.forwardRef(function (t, n) {
    let { lockScroll: r = !1, ...i } = t;
    const l = am();
    return (
      on(() => {
        if (!r) return;
        Zp.add(l);
        const s = /iP(hone|ad|od)|iOS/.test(ix()),
          a = document.body.style,
          d =
            Math.round(document.documentElement.getBoundingClientRect().left) +
            document.documentElement.scrollLeft
              ? "paddingLeft"
              : "paddingRight",
          p = window.innerWidth - document.documentElement.clientWidth,
          g = a.left ? parseFloat(a.left) : window.pageXOffset,
          v = a.top ? parseFloat(a.top) : window.pageYOffset;
        if (((a.overflow = "hidden"), p && (a[d] = p + "px"), s)) {
          var m, E;
          const S =
              ((m = window.visualViewport) == null ? void 0 : m.offsetLeft) ||
              0,
            N =
              ((E = window.visualViewport) == null ? void 0 : E.offsetTop) || 0;
          Object.assign(a, {
            position: "fixed",
            top: -(v - Math.floor(N)) + "px",
            left: -(g - Math.floor(S)) + "px",
            right: "0",
          });
        }
        return () => {
          Zp.delete(l),
            Zp.size === 0 &&
              (Object.assign(a, { overflow: "", [d]: "" }),
              s &&
                (Object.assign(a, {
                  position: "",
                  top: "",
                  left: "",
                  right: "",
                }),
                window.scrollTo(g, v)));
        };
      }, [l, r]),
      A.createElement(
        "div",
        fs({ ref: n }, i, {
          style: {
            position: "fixed",
            overflow: "auto",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...i.style,
          },
        })
      )
    );
  }),
  RD = uw["useInsertionEffect".toString()],
  AD = RD || ((e) => e());
function Qa(e) {
  const t = A.useRef(() => {});
  return (
    AD(() => {
      t.current = e;
    }),
    A.useCallback(function () {
      for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
        r[i] = arguments[i];
      return t.current == null ? void 0 : t.current(...r);
    }, [])
  );
}
const DD = {
    pointerdown: "onPointerDown",
    mousedown: "onMouseDown",
    click: "onClick",
  },
  ND = {
    pointerdown: "onPointerDownCapture",
    mousedown: "onMouseDownCapture",
    click: "onClickCapture",
  },
  LD = (e) => {
    var t, n;
    return {
      escapeKeyBubbles:
        typeof e == "boolean" ? e : (t = e?.escapeKey) != null ? t : !1,
      outsidePressBubbles:
        typeof e == "boolean" ? e : (n = e?.outsidePress) != null ? n : !0,
    };
  };
function MD(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      onOpenChange: r,
      events: i,
      nodeId: l,
      elements: { reference: s, domReference: a, floating: f },
      dataRef: d,
    } = e,
    {
      enabled: p = !0,
      escapeKey: g = !0,
      outsidePress: v = !0,
      outsidePressEvent: m = "pointerdown",
      referencePress: E = !1,
      referencePressEvent: S = "pointerdown",
      ancestorScroll: N = !1,
      bubbles: y,
    } = t,
    x = cm(),
    k = wD() != null,
    I = Qa(typeof v == "function" ? v : () => !1),
    M = typeof v == "function" ? I : v,
    P = A.useRef(!1),
    { escapeKeyBubbles: $, outsidePressBubbles: B } = LD(y),
    Y = Qa((G) => {
      if (!n || !p || !g || G.key !== "Escape") return;
      const Z = x ? zu(x.nodesRef.current, l) : [];
      if (!$ && (G.stopPropagation(), Z.length > 0)) {
        let re = !0;
        if (
          (Z.forEach((ae) => {
            var ce;
            if (
              (ce = ae.context) != null &&
              ce.open &&
              !ae.context.dataRef.current.__escapeKeyBubbles
            ) {
              re = !1;
              return;
            }
          }),
          !re)
        )
          return;
      }
      i.emit("dismiss", {
        type: "escapeKey",
        data: { returnFocus: { preventScroll: !1 } },
      }),
        r(!1, VR(G) ? G.nativeEvent : G);
    }),
    ee = Qa((G) => {
      const Z = P.current;
      if (((P.current = !1), Z || (typeof M == "function" && !M(G)))) return;
      const re = ox(G),
        ae = "[" + ds("inert") + "]",
        ce = kr(f).querySelectorAll(ae);
      let ge = cr(re) ? re : null;
      for (; ge && !$R(ge); ) {
        const te = BR(ge);
        if (te === kr(f).body || !cr(te)) break;
        ge = te;
      }
      if (
        ce.length &&
        cr(re) &&
        !GR(re) &&
        !wn(re, f) &&
        Array.from(ce).every((te) => !wn(ge, te))
      )
        return;
      if (Pc(re) && f) {
        const te = re.clientWidth > 0 && re.scrollWidth > re.clientWidth,
          _ = re.clientHeight > 0 && re.scrollHeight > re.clientHeight;
        let ne = _ && G.offsetX > re.clientWidth;
        if (
          (_ &&
            zR(re).direction === "rtl" &&
            (ne = G.offsetX <= re.offsetWidth - re.clientWidth),
          ne || (te && G.offsetY > re.clientHeight))
        )
          return;
      }
      const me =
        x &&
        zu(x.nodesRef.current, l).some((te) => {
          var _;
          return Gp(G, (_ = te.context) == null ? void 0 : _.elements.floating);
        });
      if (Gp(G, f) || Gp(G, a) || me) return;
      const W = x ? zu(x.nodesRef.current, l) : [];
      if (W.length > 0) {
        let te = !0;
        if (
          (W.forEach((_) => {
            var ne;
            if (
              (ne = _.context) != null &&
              ne.open &&
              !_.context.dataRef.current.__outsidePressBubbles
            ) {
              te = !1;
              return;
            }
          }),
          !te)
        )
          return;
      }
      i.emit("dismiss", {
        type: "outsidePress",
        data: { returnFocus: k ? { preventScroll: !0 } : UR(G) || WR(G) },
      }),
        r(!1, G);
    });
  return (
    A.useEffect(() => {
      if (!n || !p) return;
      (d.current.__escapeKeyBubbles = $), (d.current.__outsidePressBubbles = B);
      function G(ae) {
        r(!1, ae);
      }
      const Z = kr(f);
      g && Z.addEventListener("keydown", Y), M && Z.addEventListener(m, ee);
      let re = [];
      return (
        N &&
          (cr(a) && (re = Cl(a)),
          cr(f) && (re = re.concat(Cl(f))),
          !cr(s) &&
            s &&
            s.contextElement &&
            (re = re.concat(Cl(s.contextElement)))),
        (re = re.filter((ae) => {
          var ce;
          return (
            ae !== ((ce = Z.defaultView) == null ? void 0 : ce.visualViewport)
          );
        })),
        re.forEach((ae) => {
          ae.addEventListener("scroll", G, { passive: !0 });
        }),
        () => {
          g && Z.removeEventListener("keydown", Y),
            M && Z.removeEventListener(m, ee),
            re.forEach((ae) => {
              ae.removeEventListener("scroll", G);
            });
        }
      );
    }, [d, f, a, s, g, M, m, n, r, N, p, $, B, Y, ee]),
    A.useEffect(() => {
      P.current = !1;
    }, [M, m]),
    A.useMemo(
      () =>
        p
          ? {
              reference: {
                onKeyDown: Y,
                [DD[S]]: (G) => {
                  E &&
                    (i.emit("dismiss", {
                      type: "referencePress",
                      data: { returnFocus: !1 },
                    }),
                    r(!1, G.nativeEvent));
                },
              },
              floating: {
                onKeyDown: Y,
                [ND[m]]: () => {
                  P.current = !0;
                },
              },
            }
          : {},
      [p, i, E, m, S, r, Y]
    )
  );
}
function Px(e) {
  var t;
  e === void 0 && (e = {});
  const { open: n = !1, onOpenChange: r, nodeId: i } = e,
    [l, s] = A.useState(null),
    a = ((t = e.elements) == null ? void 0 : t.reference) || l,
    f = jA(e),
    d = cm(),
    p = Qa((I, M) => {
      I && (v.current.openEvent = M), r?.(I, M);
    }),
    g = A.useRef(null),
    v = A.useRef({}),
    m = A.useState(() => mD())[0],
    E = am(),
    S = A.useCallback(
      (I) => {
        const M = cr(I)
          ? {
              getBoundingClientRect: () => I.getBoundingClientRect(),
              contextElement: I,
            }
          : I;
        f.refs.setReference(M);
      },
      [f.refs]
    ),
    N = A.useCallback(
      (I) => {
        (cr(I) || I === null) && ((g.current = I), s(I)),
          (cr(f.refs.reference.current) ||
            f.refs.reference.current === null ||
            (I !== null && !cr(I))) &&
            f.refs.setReference(I);
      },
      [f.refs]
    ),
    y = A.useMemo(
      () => ({
        ...f.refs,
        setReference: N,
        setPositionReference: S,
        domReference: g,
      }),
      [f.refs, N, S]
    ),
    x = A.useMemo(() => ({ ...f.elements, domReference: a }), [f.elements, a]),
    k = A.useMemo(
      () => ({
        ...f,
        refs: y,
        elements: x,
        dataRef: v,
        nodeId: i,
        floatingId: E,
        events: m,
        open: n,
        onOpenChange: p,
      }),
      [f, i, E, m, n, p, y, x]
    );
  return (
    on(() => {
      const I = d?.nodesRef.current.find((M) => M.id === i);
      I && (I.context = k);
    }),
    A.useMemo(() => ({ ...f, context: k, refs: y, elements: x }), [f, y, x, k])
  );
}
function Jp(e, t, n) {
  const r = new Map();
  return {
    ...(n === "floating" && { tabIndex: -1 }),
    ...e,
    ...t
      .map((i) => (i ? i[n] : null))
      .concat(e)
      .reduce(
        (i, l) => (
          l &&
            Object.entries(l).forEach((s) => {
              let [a, f] = s;
              if (a.indexOf("on") === 0) {
                if ((r.has(a) || r.set(a, []), typeof f == "function")) {
                  var d;
                  (d = r.get(a)) == null || d.push(f),
                    (i[a] = function () {
                      for (
                        var p, g = arguments.length, v = new Array(g), m = 0;
                        m < g;
                        m++
                      )
                        v[m] = arguments[m];
                      return (p = r.get(a)) == null
                        ? void 0
                        : p.map((E) => E(...v)).find((E) => E !== void 0);
                    });
                }
              } else i[a] = f;
            }),
          i
        ),
        {}
      ),
  };
}
function FD(e) {
  e === void 0 && (e = []);
  const t = e,
    n = A.useCallback((l) => Jp(l, e, "reference"), t),
    r = A.useCallback((l) => Jp(l, e, "floating"), t),
    i = A.useCallback(
      (l) => Jp(l, e, "item"),
      e.map((l) => l?.item)
    );
  return A.useMemo(
    () => ({ getReferenceProps: n, getFloatingProps: r, getItemProps: i }),
    [n, r, i]
  );
}
const i3 = (e) =>
  e.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (t, n) => (n ? "-" : "") + t.toLowerCase()
  );
function Zo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function $D(e, t) {
  const [n, r] = A.useState(e);
  return (
    e && !n && r(!0),
    A.useEffect(() => {
      if (!e) {
        const i = setTimeout(() => r(!1), t);
        return () => clearTimeout(i);
      }
    }, [e, t]),
    n
  );
}
function zD(e, t) {
  t === void 0 && (t = {});
  const {
      open: n,
      elements: { floating: r },
    } = e,
    { duration: i = 250 } = t,
    s = (typeof i == "number" ? i : i.close) || 0,
    [a, f] = A.useState(!1),
    [d, p] = A.useState("unmounted"),
    g = $D(n, s);
  return (
    on(() => {
      a && !g && p("unmounted");
    }, [a, g]),
    on(() => {
      if (r)
        if (n) {
          p("initial");
          const v = requestAnimationFrame(() => {
            p("open");
          });
          return () => {
            cancelAnimationFrame(v);
          };
        } else f(!0), p("close");
    }, [n, r]),
    { isMounted: g, status: d }
  );
}
function Rx(e, t) {
  t === void 0 && (t = {});
  const {
      initial: n = { opacity: 0 },
      open: r,
      close: i,
      common: l,
      duration: s = 250,
    } = t,
    a = e.placement,
    f = a.split("-")[0],
    d = A.useMemo(() => ({ side: f, placement: a }), [f, a]),
    p = typeof s == "number",
    g = (p ? s : s.open) || 0,
    v = (p ? s : s.close) || 0,
    [m, E] = A.useState(() => ({ ...Zo(l, d), ...Zo(n, d) })),
    { isMounted: S, status: N } = zD(e, { duration: s }),
    y = vo(n),
    x = vo(r),
    k = vo(i),
    I = vo(l);
  return (
    on(() => {
      const M = Zo(y.current, d),
        P = Zo(k.current, d),
        $ = Zo(I.current, d),
        B =
          Zo(x.current, d) ||
          Object.keys(M).reduce((Y, ee) => ((Y[ee] = ""), Y), {});
      if (
        (N === "initial" &&
          E((Y) => ({ transitionProperty: Y.transitionProperty, ...$, ...M })),
        N === "open" &&
          E({
            transitionProperty: Object.keys(B).map(i3).join(","),
            transitionDuration: g + "ms",
            ...$,
            ...B,
          }),
        N === "close")
      ) {
        const Y = P || M;
        E({
          transitionProperty: Object.keys(Y).map(i3).join(","),
          transitionDuration: v + "ms",
          ...$,
          ...Y,
        });
      }
    }, [v, k, y, x, I, g, N, d]),
    { isMounted: S, styles: m }
  );
}
const BD = ({ infoVisible: e, setInfoVisible: t }) => {
    const { refs: n, context: r } = Px({ open: e, onOpenChange: t }),
      i = MD(r, { outsidePressEvent: "mousedown" }),
      { isMounted: l, styles: s } = Rx(r),
      { getFloatingProps: a } = FD([i]);
    return D($t, {
      children:
        l &&
        D(Tx, {
          children: D(PD, {
            lockScroll: !0,
            className: "useful-controls-dialog-overlay",
            "data-open": e,
            style: s,
            children: D(ID, {
              context: r,
              children: K("div", {
                ref: n.setFloating,
                ...a(),
                className: "useful-controls-dialog",
                style: s,
                children: [
                  K("div", {
                    className: "useful-controls-dialog-title",
                    children: [
                      D("p", {
                        children: Ge.ui_usefulcontrols || "Useful controls",
                      }),
                      D("div", {
                        className: "useful-controls-dialog-close",
                        onClick: () => t(!1),
                        children: D("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          height: "1em",
                          viewBox: "0 0 400 528",
                          children: D("path", {
                            d: "M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z",
                          }),
                        }),
                      }),
                    ],
                  }),
                  K("div", {
                    className: "useful-controls-content-wrapper",
                    children: [
                      K("p", {
                        children: [
                          D("kbd", { children: "RMB" }),
                          D("br", {}),
                          Ge.ui_rmb,
                        ],
                      }),
                      K("p", {
                        children: [
                          D("kbd", { children: "ALT + LMB" }),
                          D("br", {}),
                          Ge.ui_alt_lmb,
                        ],
                      }),
                      K("p", {
                        children: [
                          D("kbd", { children: "CTRL + LMB" }),
                          D("br", {}),
                          Ge.ui_ctrl_lmb,
                        ],
                      }),
                      K("p", {
                        children: [
                          D("kbd", { children: "SHIFT + Drag" }),
                          D("br", {}),
                          Ge.ui_shift_drag,
                        ],
                      }),
                      K("p", {
                        children: [
                          D("kbd", { children: "CTRL + SHIFT + LMB" }),
                          D("br", {}),
                          Ge.ui_ctrl_shift_lmb,
                        ],
                      }),
                      D("div", {
                        style: { textAlign: "right" },
                        children: "🐂",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
    });
  },
  eh = ({
    children: e,
    className: t,
    maxWidth: n,
    originalFontSize: r,
    minScale: i = 1,
    bottom: l,
    fontWeight: s = "bold",
  }) => {
    const a = A.useRef(null);
    return (
      A.useEffect(() => {
        const f = () => {
            const p = a.current;
            if (!p) return;
            (p.style.transform = "translateX(-50%) scale(1)"),
              (p.style.fontSize = `${r}px`);
            const g = p.getBoundingClientRect().width,
              v = g > n ? n / g : 1,
              m = Math.max(v, i);
            p.style.transform = `translateX(-50%) scale(${m})`;
          },
          d = setTimeout(f, 10);
        return (
          window.addEventListener("resize", f),
          () => {
            clearTimeout(d), window.removeEventListener("resize", f);
          }
        );
      }, [e, n, r, i]),
      D("div", {
        ref: a,
        className: t,
        style: {
          position: "absolute",
          left: "50%",
          bottom: `${l}px`,
          color: "white",
          fontWeight: s,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          transformOrigin: "center center",
          fontSize: `${r}px`,
          textAlign: "center",
        },
        children: e,
      })
    );
  },
  HD = () => {
    const e = Ar(IR),
      t = Ao(),
      [n, r] = A.useState(!1),
      [, i] = cg(() => ({
        accept: "SLOT",
        drop: (a) => {
          a.inventory === "player" && im(a.item);
        },
      })),
      [, l] = cg(() => ({
        accept: "SLOT",
        drop: (a) => {
          a.inventory === "player" && tx(a.item);
        },
      })),
      s = (a) => {
        (a.target.valueAsNumber =
          isNaN(a.target.valueAsNumber) || a.target.valueAsNumber < 0
            ? 0
            : Math.floor(a.target.valueAsNumber)),
          t(SR(a.target.valueAsNumber));
      };
    return K($t, {
      children: [
        D(BD, { infoVisible: n, setInfoVisible: r }),
        D("div", {
          className: "inventory-control",
          children: K("div", {
            className: "inventory-control-wrapper",
            children: [
              K("button", {
                className: "inventory-control-button-use button-with-text",
                ref: i,
                children: [
                  D("svg", {
                    width: "52",
                    height: "57",
                    viewBox: "0 0 52 57",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: D("path", {
                      d: "M16.64 13.3714C15.7787 12.2384 14.1456 12.0054 13 12.8571C11.8544 13.7089 11.6187 15.3241 12.48 16.4571L15.5756 20.5393C15.9656 21.0536 15.9087 21.7687 15.4537 22.2188L14.4137 23.2473C13.8694 23.7857 12.9837 23.7455 12.4963 23.1589L5.2 14.4964V2.57143C5.2 1.14911 4.03813 0 2.6 0C1.16187 0 0 1.14911 0 2.57143V20.1214C0 20.9973 0.300625 21.8491 0.853125 22.5321L9.31125 33.3241C9.7175 33.8464 9.99375 34.4411 10.1562 35.0679C10.3025 35.6223 10.8144 36 11.3994 36H22.1C22.815 36 23.4 35.4214 23.4 34.7143V25.7143C23.4 23.4884 22.6687 21.3268 21.32 19.5429L16.64 13.3714ZM49.4 0C47.9619 0 46.8 1.14911 46.8 2.57143V14.4964L39.5037 23.1589C39.0163 23.7375 38.1225 23.7777 37.5863 23.2473L36.5462 22.2188C36.0912 21.7687 36.0344 21.0536 36.4244 20.5393L39.52 16.4571C40.3812 15.3241 40.1456 13.7089 39 12.8571C37.8544 12.0054 36.2212 12.2384 35.36 13.3714L30.68 19.5429C29.3312 21.3268 28.6 23.4884 28.6 25.7143V34.7143C28.6 35.4214 29.185 36 29.9 36H40.6006C41.1775 36 41.6975 35.6223 41.8438 35.0679C42.0062 34.4411 42.2825 33.8464 42.6888 33.3241L51.1469 22.5321C51.6994 21.8491 52 20.9973 52 20.1214V2.57143C52 1.14911 50.8381 0 49.4 0Z",
                      fill: "white",
                    }),
                  }),
                  D(eh, {
                    maxWidth: 47,
                    originalFontSize: 14,
                    bottom: 2,
                    fontWeight: "normal",
                    children: Ge.ui_use || "USE",
                  }),
                ],
              }),
              D("input", {
                className: "inventory-control-input",
                type: "number",
                defaultValue: e,
                onChange: s,
                min: 0,
              }),
              K("button", {
                className: "inventory-control-button-give button-with-text",
                ref: l,
                children: [
                  D("svg", {
                    width: "33",
                    height: "73",
                    viewBox: "0 0 33 73",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: D("path", {
                      d: "M33 33.4218V48.4545C32.9293 50.3927 31.3971 51.9291 29.4643 52H14.1429C13.2471 52 12.3986 51.6455 11.7857 50.9836L0.235714 41.0564L1.98 39.2364C2.42786 38.74 3.06429 38.48 3.72429 38.48H4.24286L11.7857 42.5455V18.9091C11.7857 18.2822 12.0341 17.681 12.4761 17.2378C12.9182 16.7945 13.5177 16.5455 14.1429 16.5455C14.768 16.5455 15.3676 16.7945 15.8096 17.2378C16.2517 17.681 16.5 18.2822 16.5 18.9091V14.1818C16.5 13.5549 16.7483 12.9537 17.1904 12.5105C17.6324 12.0672 18.232 11.8182 18.8571 11.8182C19.4823 11.8182 20.0818 12.0672 20.5239 12.5105C20.9659 12.9537 21.2143 13.5549 21.2143 14.1818V26L30.9964 30.3491C32.1986 30.8927 33 32.0982 33 33.4218ZM18.8571 4.72728C21.3578 4.72728 23.756 5.72338 25.5242 7.49645C27.2924 9.26952 28.2857 11.6743 28.2857 14.1818C28.2857 17.7273 26.4 20.7291 23.5714 22.36V19.4764C25.0093 18.1764 25.9286 16.2855 25.9286 14.1818C25.9286 12.3012 25.1835 10.4976 23.8574 9.1678C22.5312 7.83799 20.7326 7.09092 18.8571 7.09092C15.675 7.09092 12.9643 9.21819 12.0921 12.1255C10.891 12.4917 9.80851 13.1717 8.95583 14.0958C8.10314 15.0198 7.51089 16.1546 7.2398 17.3839C6.96872 18.6131 7.02856 19.8926 7.41318 21.091C7.79781 22.2894 8.49338 23.3637 9.42857 24.2036V27.0873C6.6 25.4564 4.71429 22.4545 4.71429 18.9091C4.71429 15.08 7.00072 11.8182 10.2536 10.2818C11.7857 7.02001 15.0386 4.72728 18.8571 4.72728ZM18.8571 7.72646e-06C22.6081 7.72646e-06 26.2054 1.49416 28.8577 4.15377C31.51 6.81337 33 10.4206 33 14.1818C33 19.0509 30.5486 23.3527 26.8243 25.9055L24.1843 24.7236C26.1305 23.7408 27.7655 22.2341 28.9062 20.3722C30.0469 18.5104 30.6482 16.3669 30.6429 14.1818C30.6429 11.0474 29.4012 8.04145 27.1909 5.82511C24.9807 3.60877 21.9829 2.36364 18.8571 2.36364C14.4021 2.36364 10.5129 4.84546 8.50928 8.53273C4.83214 10.5418 2.35714 14.4418 2.35714 18.9091C2.35714 23.7545 5.25643 27.9145 9.42857 29.7345V32.2873C3.93643 30.3255 0 25.0782 0 18.9091C0 13.78 2.71071 9.2891 6.78857 6.80728C8.04607 4.72721 9.8176 3.00775 11.9318 1.81522C14.046 0.622695 16.4314 -0.00253528 18.8571 7.72646e-06Z",
                      fill: "white",
                    }),
                  }),
                  D(eh, {
                    maxWidth: 30,
                    originalFontSize: 13,
                    bottom: 4,
                    children: Ge.ui_give || "GIVE",
                  }),
                ],
              }),
              K("button", {
                className: "inventory-control-button-close button-with-text",
                onClick: () => _n("exit"),
                children: [
                  D("svg", {
                    width: "40",
                    height: "65",
                    viewBox: "0 0 40 65",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: D("path", {
                      d: "M11.6635 20.6315C10.5173 19.5245 9.60315 18.2004 8.97424 16.7363C8.34533 15.2723 8.0143 13.6976 8.00045 12.1043C7.98661 10.5109 8.29023 8.93077 8.8936 7.45601C9.49697 5.98125 10.388 4.64143 11.5147 3.51472C12.6414 2.38801 13.9813 1.49697 15.456 0.893598C16.9308 0.290228 18.5109 -0.0133927 20.1043 0.000453081C21.6976 0.0142989 23.2723 0.345334 24.7363 0.974242C26.2004 1.60315 27.5245 2.51734 28.6315 3.66346C30.8174 5.92668 32.0269 8.95791 31.9995 12.1043C31.9722 15.2506 30.7102 18.2604 28.4853 20.4853C26.2604 22.7102 23.2506 23.9722 20.1043 23.9995C16.9579 24.0269 13.9267 22.8174 11.6635 20.6315ZM21.8275 12.1475L25.2235 8.75146L23.5315 7.05946L20.1475 10.4555L16.7515 7.05946L15.0595 8.75146L18.4555 12.1475L15.0595 15.5435L16.7515 17.2355L20.1475 13.8395L23.5435 17.2355L25.2355 15.5435L21.8395 12.1475H21.8275Z",
                      fill: "white",
                    }),
                  }),
                  D(eh, {
                    maxWidth: 36,
                    originalFontSize: 12,
                    bottom: 23,
                    children: Ge.ui_close || "CLOSE",
                  }),
                ],
              }),
            ],
          }),
        }),
        D("style", {
          children: `
        .button-with-text {
          position: relative;
          display: inline-block;
        }
      `,
        }),
      ],
    });
  };
function Sg(e, t) {
  return (
    (Sg = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, r) {
          return (n.__proto__ = r), n;
        }),
    Sg(e, t)
  );
}
function pm(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Sg(e, t);
}
var Ax = { exports: {} },
  UD = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  WD = UD,
  jD = WD;
function Dx() {}
function Nx() {}
Nx.resetWarningCache = Dx;
var VD = function () {
  function e(r, i, l, s, a, f) {
    if (f !== jD) {
      var d = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((d.name = "Invariant Violation"), d);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Nx,
    resetWarningCache: Dx,
  };
  return (n.PropTypes = n), n;
};
Ax.exports = VD();
var GD = Ax.exports;
const Se = Ui(GD);
function qD(e, t) {
  return e.classList
    ? !!t && e.classList.contains(t)
    : (" " + (e.className.baseVal || e.className) + " ").indexOf(
        " " + t + " "
      ) !== -1;
}
function KD(e, t) {
  e.classList
    ? e.classList.add(t)
    : qD(e, t) ||
      (typeof e.className == "string"
        ? (e.className = e.className + " " + t)
        : e.setAttribute(
            "class",
            ((e.className && e.className.baseVal) || "") + " " + t
          ));
}
function o3(e, t) {
  return e
    .replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1")
    .replace(/\s+/g, " ")
    .replace(/^\s*|\s*$/g, "");
}
function QD(e, t) {
  e.classList
    ? e.classList.remove(t)
    : typeof e.className == "string"
    ? (e.className = o3(e.className, t))
    : e.setAttribute(
        "class",
        o3((e.className && e.className.baseVal) || "", t)
      );
}
const l3 = { disabled: !1 },
  $c = qe.createContext(null);
var Lx = function (t) {
    return t.scrollTop;
  },
  ku = "unmounted",
  co = "exited",
  fo = "entering",
  tl = "entered",
  Cg = "exiting",
  ri = (function (e) {
    pm(t, e);
    function t(r, i) {
      var l;
      l = e.call(this, r, i) || this;
      var s = i,
        a = s && !s.isMounting ? r.enter : r.appear,
        f;
      return (
        (l.appearStatus = null),
        r.in
          ? a
            ? ((f = co), (l.appearStatus = fo))
            : (f = tl)
          : r.unmountOnExit || r.mountOnEnter
          ? (f = ku)
          : (f = co),
        (l.state = { status: f }),
        (l.nextCallback = null),
        l
      );
    }
    t.getDerivedStateFromProps = function (i, l) {
      var s = i.in;
      return s && l.status === ku ? { status: co } : null;
    };
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (n.componentDidUpdate = function (i) {
        var l = null;
        if (i !== this.props) {
          var s = this.state.status;
          this.props.in
            ? s !== fo && s !== tl && (l = fo)
            : (s === fo || s === tl) && (l = Cg);
        }
        this.updateStatus(!1, l);
      }),
      (n.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (n.getTimeouts = function () {
        var i = this.props.timeout,
          l,
          s,
          a;
        return (
          (l = s = a = i),
          i != null &&
            typeof i != "number" &&
            ((l = i.exit),
            (s = i.enter),
            (a = i.appear !== void 0 ? i.appear : s)),
          { exit: l, enter: s, appear: a }
        );
      }),
      (n.updateStatus = function (i, l) {
        if ((i === void 0 && (i = !1), l !== null))
          if ((this.cancelNextCallback(), l === fo)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var s = this.props.nodeRef
                ? this.props.nodeRef.current
                : Ia.findDOMNode(this);
              s && Lx(s);
            }
            this.performEnter(i);
          } else this.performExit();
        else
          this.props.unmountOnExit &&
            this.state.status === co &&
            this.setState({ status: ku });
      }),
      (n.performEnter = function (i) {
        var l = this,
          s = this.props.enter,
          a = this.context ? this.context.isMounting : i,
          f = this.props.nodeRef ? [a] : [Ia.findDOMNode(this), a],
          d = f[0],
          p = f[1],
          g = this.getTimeouts(),
          v = a ? g.appear : g.enter;
        if ((!i && !s) || l3.disabled) {
          this.safeSetState({ status: tl }, function () {
            l.props.onEntered(d);
          });
          return;
        }
        this.props.onEnter(d, p),
          this.safeSetState({ status: fo }, function () {
            l.props.onEntering(d, p),
              l.onTransitionEnd(v, function () {
                l.safeSetState({ status: tl }, function () {
                  l.props.onEntered(d, p);
                });
              });
          });
      }),
      (n.performExit = function () {
        var i = this,
          l = this.props.exit,
          s = this.getTimeouts(),
          a = this.props.nodeRef ? void 0 : Ia.findDOMNode(this);
        if (!l || l3.disabled) {
          this.safeSetState({ status: co }, function () {
            i.props.onExited(a);
          });
          return;
        }
        this.props.onExit(a),
          this.safeSetState({ status: Cg }, function () {
            i.props.onExiting(a),
              i.onTransitionEnd(s.exit, function () {
                i.safeSetState({ status: co }, function () {
                  i.props.onExited(a);
                });
              });
          });
      }),
      (n.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (n.safeSetState = function (i, l) {
        (l = this.setNextCallback(l)), this.setState(i, l);
      }),
      (n.setNextCallback = function (i) {
        var l = this,
          s = !0;
        return (
          (this.nextCallback = function (a) {
            s && ((s = !1), (l.nextCallback = null), i(a));
          }),
          (this.nextCallback.cancel = function () {
            s = !1;
          }),
          this.nextCallback
        );
      }),
      (n.onTransitionEnd = function (i, l) {
        this.setNextCallback(l);
        var s = this.props.nodeRef
            ? this.props.nodeRef.current
            : Ia.findDOMNode(this),
          a = i == null && !this.props.addEndListener;
        if (!s || a) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var f = this.props.nodeRef
              ? [this.nextCallback]
              : [s, this.nextCallback],
            d = f[0],
            p = f[1];
          this.props.addEndListener(d, p);
        }
        i != null && setTimeout(this.nextCallback, i);
      }),
      (n.render = function () {
        var i = this.state.status;
        if (i === ku) return null;
        var l = this.props,
          s = l.children;
        l.in,
          l.mountOnEnter,
          l.unmountOnExit,
          l.appear,
          l.enter,
          l.exit,
          l.timeout,
          l.addEndListener,
          l.onEnter,
          l.onEntering,
          l.onEntered,
          l.onExit,
          l.onExiting,
          l.onExited,
          l.nodeRef;
        var a = P1(l, [
          "children",
          "in",
          "mountOnEnter",
          "unmountOnExit",
          "appear",
          "enter",
          "exit",
          "timeout",
          "addEndListener",
          "onEnter",
          "onEntering",
          "onEntered",
          "onExit",
          "onExiting",
          "onExited",
          "nodeRef",
        ]);
        return qe.createElement(
          $c.Provider,
          { value: null },
          typeof s == "function"
            ? s(i, a)
            : qe.cloneElement(qe.Children.only(s), a)
        );
      }),
      t
    );
  })(qe.Component);
ri.contextType = $c;
ri.propTypes = {};
function Jo() {}
ri.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Jo,
  onEntering: Jo,
  onEntered: Jo,
  onExit: Jo,
  onExiting: Jo,
  onExited: Jo,
};
ri.UNMOUNTED = ku;
ri.EXITED = co;
ri.ENTERING = fo;
ri.ENTERED = tl;
ri.EXITING = Cg;
const YD = ri;
var XD = function (t, n) {
    return (
      t &&
      n &&
      n.split(" ").forEach(function (r) {
        return KD(t, r);
      })
    );
  },
  th = function (t, n) {
    return (
      t &&
      n &&
      n.split(" ").forEach(function (r) {
        return QD(t, r);
      })
    );
  },
  hm = (function (e) {
    pm(t, e);
    function t() {
      for (var r, i = arguments.length, l = new Array(i), s = 0; s < i; s++)
        l[s] = arguments[s];
      return (
        (r = e.call.apply(e, [this].concat(l)) || this),
        (r.appliedClasses = { appear: {}, enter: {}, exit: {} }),
        (r.onEnter = function (a, f) {
          var d = r.resolveArguments(a, f),
            p = d[0],
            g = d[1];
          r.removeClasses(p, "exit"),
            r.addClass(p, g ? "appear" : "enter", "base"),
            r.props.onEnter && r.props.onEnter(a, f);
        }),
        (r.onEntering = function (a, f) {
          var d = r.resolveArguments(a, f),
            p = d[0],
            g = d[1],
            v = g ? "appear" : "enter";
          r.addClass(p, v, "active"),
            r.props.onEntering && r.props.onEntering(a, f);
        }),
        (r.onEntered = function (a, f) {
          var d = r.resolveArguments(a, f),
            p = d[0],
            g = d[1],
            v = g ? "appear" : "enter";
          r.removeClasses(p, v),
            r.addClass(p, v, "done"),
            r.props.onEntered && r.props.onEntered(a, f);
        }),
        (r.onExit = function (a) {
          var f = r.resolveArguments(a),
            d = f[0];
          r.removeClasses(d, "appear"),
            r.removeClasses(d, "enter"),
            r.addClass(d, "exit", "base"),
            r.props.onExit && r.props.onExit(a);
        }),
        (r.onExiting = function (a) {
          var f = r.resolveArguments(a),
            d = f[0];
          r.addClass(d, "exit", "active"),
            r.props.onExiting && r.props.onExiting(a);
        }),
        (r.onExited = function (a) {
          var f = r.resolveArguments(a),
            d = f[0];
          r.removeClasses(d, "exit"),
            r.addClass(d, "exit", "done"),
            r.props.onExited && r.props.onExited(a);
        }),
        (r.resolveArguments = function (a, f) {
          return r.props.nodeRef ? [r.props.nodeRef.current, a] : [a, f];
        }),
        (r.getClassNames = function (a) {
          var f = r.props.classNames,
            d = typeof f == "string",
            p = d && f ? f + "-" : "",
            g = d ? "" + p + a : f[a],
            v = d ? g + "-active" : f[a + "Active"],
            m = d ? g + "-done" : f[a + "Done"];
          return { baseClassName: g, activeClassName: v, doneClassName: m };
        }),
        r
      );
    }
    var n = t.prototype;
    return (
      (n.addClass = function (i, l, s) {
        var a = this.getClassNames(l)[s + "ClassName"],
          f = this.getClassNames("enter"),
          d = f.doneClassName;
        l === "appear" && s === "done" && d && (a += " " + d),
          s === "active" && i && Lx(i),
          a && ((this.appliedClasses[l][s] = a), XD(i, a));
      }),
      (n.removeClasses = function (i, l) {
        var s = this.appliedClasses[l],
          a = s.base,
          f = s.active,
          d = s.done;
        (this.appliedClasses[l] = {}),
          a && th(i, a),
          f && th(i, f),
          d && th(i, d);
      }),
      (n.render = function () {
        var i = this.props;
        i.classNames;
        var l = P1(i, ["classNames"]);
        return qe.createElement(
          YD,
          Cc({}, l, {
            onEnter: this.onEnter,
            onEntered: this.onEntered,
            onEntering: this.onEntering,
            onExit: this.onExit,
            onExiting: this.onExiting,
            onExited: this.onExited,
          })
        );
      }),
      t
    );
  })(qe.Component);
hm.defaultProps = { classNames: "" };
hm.propTypes = {};
const Mx = hm;
function ZD(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function gm(e, t) {
  var n = function (l) {
      return t && A.isValidElement(l) ? t(l) : l;
    },
    r = Object.create(null);
  return (
    e &&
      A.Children.map(e, function (i) {
        return i;
      }).forEach(function (i) {
        r[i.key] = n(i);
      }),
    r
  );
}
function JD(e, t) {
  (e = e || {}), (t = t || {});
  function n(p) {
    return p in t ? t[p] : e[p];
  }
  var r = Object.create(null),
    i = [];
  for (var l in e) l in t ? i.length && ((r[l] = i), (i = [])) : i.push(l);
  var s,
    a = {};
  for (var f in t) {
    if (r[f])
      for (s = 0; s < r[f].length; s++) {
        var d = r[f][s];
        a[r[f][s]] = n(d);
      }
    a[f] = n(f);
  }
  for (s = 0; s < i.length; s++) a[i[s]] = n(i[s]);
  return a;
}
function yo(e, t, n) {
  return n[t] != null ? n[t] : e.props[t];
}
function eN(e, t) {
  return gm(e.children, function (n) {
    return A.cloneElement(n, {
      onExited: t.bind(null, n),
      in: !0,
      appear: yo(n, "appear", e),
      enter: yo(n, "enter", e),
      exit: yo(n, "exit", e),
    });
  });
}
function tN(e, t, n) {
  var r = gm(e.children),
    i = JD(t, r);
  return (
    Object.keys(i).forEach(function (l) {
      var s = i[l];
      if (A.isValidElement(s)) {
        var a = l in t,
          f = l in r,
          d = t[l],
          p = A.isValidElement(d) && !d.props.in;
        f && (!a || p)
          ? (i[l] = A.cloneElement(s, {
              onExited: n.bind(null, s),
              in: !0,
              exit: yo(s, "exit", e),
              enter: yo(s, "enter", e),
            }))
          : !f && a && !p
          ? (i[l] = A.cloneElement(s, { in: !1 }))
          : f &&
            a &&
            A.isValidElement(d) &&
            (i[l] = A.cloneElement(s, {
              onExited: n.bind(null, s),
              in: d.props.in,
              exit: yo(s, "exit", e),
              enter: yo(s, "enter", e),
            }));
      }
    }),
    i
  );
}
var nN =
    Object.values ||
    function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
  rN = {
    component: "div",
    childFactory: function (t) {
      return t;
    },
  },
  mm = (function (e) {
    pm(t, e);
    function t(r, i) {
      var l;
      l = e.call(this, r, i) || this;
      var s = l.handleExited.bind(ZD(l));
      return (
        (l.state = {
          contextValue: { isMounting: !0 },
          handleExited: s,
          firstRender: !0,
        }),
        l
      );
    }
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        (this.mounted = !0),
          this.setState({ contextValue: { isMounting: !1 } });
      }),
      (n.componentWillUnmount = function () {
        this.mounted = !1;
      }),
      (t.getDerivedStateFromProps = function (i, l) {
        var s = l.children,
          a = l.handleExited,
          f = l.firstRender;
        return { children: f ? eN(i, a) : tN(i, s, a), firstRender: !1 };
      }),
      (n.handleExited = function (i, l) {
        var s = gm(this.props.children);
        i.key in s ||
          (i.props.onExited && i.props.onExited(l),
          this.mounted &&
            this.setState(function (a) {
              var f = Cc({}, a.children);
              return delete f[i.key], { children: f };
            }));
      }),
      (n.render = function () {
        var i = this.props,
          l = i.component,
          s = i.childFactory,
          a = P1(i, ["component", "childFactory"]),
          f = this.state.contextValue,
          d = nN(this.state.children).map(s);
        return (
          delete a.appear,
          delete a.enter,
          delete a.exit,
          l === null
            ? qe.createElement($c.Provider, { value: f }, d)
            : qe.createElement(
                $c.Provider,
                { value: f },
                qe.createElement(l, a, d)
              )
        );
      }),
      t
    );
  })(qe.Component);
mm.propTypes = {};
mm.defaultProps = rN;
const iN = mm,
  u3 = (e) => {
    const t = A.useRef(null);
    return D(Mx, {
      nodeRef: t,
      in: e.in,
      timeout: 200,
      classNames: "transition-slide-up",
      unmountOnExit: !0,
      children: qe.cloneElement(e.children, { ref: t }),
    });
  };
function oN(e) {
  const t = e.replace("#", ""),
    n =
      t.length === 3
        ? t
            .split("")
            .map((s) => s + s)
            .join("")
        : t;
  if (!/^[0-9A-Fa-f]{6}$/.test(n)) return null;
  const r = parseInt(n.slice(0, 2), 16),
    i = parseInt(n.slice(2, 4), 16),
    l = parseInt(n.slice(4, 6), 16);
  return { r, g: i, b: l };
}
const lN = ({ themeSettings: e }) => {
    const [t, n] = A.useState(!1),
      r = Ar(nm).items.slice(0, 5),
      [i, l] = A.useState();
    Sn("toggleHotbar", () => {
      t
        ? n(!1)
        : (i && clearTimeout(i), n(!0), l(setTimeout(() => n(!1), 3e3)));
    });
    const { r: s, g: a, b: f } = oN(e.PrimaryColor) || { r: 0, g: 0, b: 0 };
    return K($t, {
      children: [
        D(u3, {
          in: t,
          children: K($t, {
            children: [
              D("div", {
                className: "hotbar-gradient-overlay",
                style: {
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "200px",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                },
              }),
              D("div", {
                className: "hotbar-gradient-overlay",
                style: {
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  background: `radial-gradient(51.84% 29.54% at 50% 99.07%, rgba(${s}, ${a}, ${f}, 0.1704) 0%, rgba(${s}, ${a}, ${f}, 0) 64.6%, rgba(${s}, ${a}, ${f}, 0) 100%)`,
                  pointerEvents: "none",
                  zIndex: 1,
                },
              }),
            ],
          }),
        }),
        D(u3, {
          in: t,
          children: D("div", {
            children: D("div", {
              className: "hotbar-container",
              style: { zIndex: 999 },
              children: r.map((d) =>
                K(
                  "div",
                  {
                    className: "hotbar-item-slot",
                    style: {
                      backgroundImage: `url(${d?.name ? So(d) : "none"}`,
                    },
                    children: [
                      K("div", {
                        className: "hexagon-slot-number",
                        children: [
                          K("svg", {
                            className: "hexagon-bg",
                            width: "32",
                            height: "32",
                            viewBox: "0 0 32 32",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [
                              D("path", {
                                d: "M14 1.1547C15.2376 0.440169 16.7624 0.440169 18 1.1547L27.8564 6.8453C29.094 7.55983 29.8564 8.88034 29.8564 10.3094V21.6906C29.8564 23.1197 29.094 24.4402 27.8564 25.1547L18 30.8453C16.7624 31.5598 15.2376 31.5598 14 30.8453L4.14359 25.1547C2.90599 24.4402 2.14359 23.1197 2.14359 21.6906L2.14359 10.3094C2.14359 8.88034 2.90599 7.55983 4.14359 6.8453L14 1.1547Z",
                                fill: `${e.PrimaryColor}`,
                                fillOpacity: "0.2",
                              }),
                              D("path", {
                                d: "M14.5 4.86603C15.4282 4.33013 16.5718 4.33013 17.5 4.86603L24.8923 9.13397C25.8205 9.66987 26.3923 10.6603 26.3923 11.7321V20.2679C26.3923 21.3397 25.8205 22.3301 24.8923 22.866L17.5 27.134C16.5718 27.6699 15.4282 27.6699 14.5 27.134L7.1077 22.866C6.17949 22.3301 5.6077 21.3397 5.6077 20.2679L5.6077 11.7321C5.6077 10.6603 6.17949 9.66987 7.1077 9.13397L14.5 4.86603Z",
                                fill: "url(#paint0_linear_0_159)",
                                fillOpacity: "0.24",
                              }),
                              D("path", {
                                d: "M14.7002 5.21289C15.5046 4.74845 16.4954 4.74845 17.2998 5.21289L24.6924 9.48047C25.4968 9.94493 25.9922 10.8036 25.9922 11.7324V20.2676C25.9922 21.1964 25.4968 22.0551 24.6924 22.5195L17.2998 26.7871C16.4954 27.2516 15.5046 27.2516 14.7002 26.7871L7.30762 22.5195C6.50323 22.0551 6.00781 21.1964 6.00781 20.2676L6.00781 11.7324C6.00781 10.8036 6.50323 9.94493 7.30762 9.48047L14.7002 5.21289Z",
                                stroke: `${e.PrimaryColor}`,
                                strokeOpacity: "0.24",
                                strokeWidth: "0.8",
                              }),
                              D("defs", {
                                children: K("linearGradient", {
                                  id: "paint0_linear_0_159",
                                  x1: "4",
                                  y1: "16",
                                  x2: "28",
                                  y2: "16",
                                  gradientUnits: "userSpaceOnUse",
                                  children: [
                                    D("stop", { stopColor: "#D9D9D9" }),
                                    D("stop", {
                                      offset: "1",
                                      stopColor: "#EFEFEF",
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          D("span", {
                            className: "number-text",
                            children: d.slot,
                          }),
                        ],
                      }),
                      Gt(d) &&
                        K("div", {
                          className: "item-slot-wrapper",
                          children: [
                            D("div", {
                              className: "hotbar-slot-header-wrapper",
                              children: D("div", {
                                className: "item-slot-info-wrapper",
                                children: D("p", {
                                  children: d.count
                                    ? d.count.toLocaleString("en-us") + "x"
                                    : "",
                                }),
                              }),
                            }),
                            D("div", {}),
                          ],
                        }),
                    ],
                  },
                  `hotbar-${d.slot}`
                )
              ),
            }),
          }),
        }),
      ],
    });
  },
  uN = ["Escape"],
  sN = (e) => {
    const t = A.useRef(Y5),
      n = Ao();
    A.useEffect(() => {
      t.current = e;
    }, [e]),
      A.useEffect(() => {
        const r = (i) => {
          uN.includes(i.code) && (t.current(!1), n(Fu()), n(rm()), _n("exit"));
        };
        return (
          window.addEventListener("keyup", r),
          () => window.removeEventListener("keyup", r)
        );
      }, []);
  },
  nh = (e, t, n) => {
    let r = e * n,
      i = t * (1 - n);
    return r + i;
  },
  s3 = (e, t, n) => {
    let r = nh(e[0], t[0], n),
      i = nh(e[1], t[1], n),
      l = nh(e[2], t[2], n);
    return `rgb(${r}, ${i}, ${l})`;
  };
function rh(e) {
  if (
    ((e = e.replace("#", "").toLowerCase()),
    !/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(e))
  )
    return console.error("Invalid hex color format"), [0, 0, 0];
  e.length === 3 &&
    (e = e
      .split("")
      .map((i) => i + i)
      .join(""));
  const t = parseInt(e.substring(0, 2), 16),
    n = parseInt(e.substring(2, 4), 16),
    r = parseInt(e.substring(4, 6), 16);
  return [t, n, r];
}
const vm = ({ percent: e, durability: t, segments: n = 12, theme: r }) => {
    const i = {
        primaryColor: rh(r.PrimaryColor),
        secondColor: rh(r.PrimaryColor),
        accentColor: rh(r.PrimaryColor),
      },
      l = A.useMemo(
        () =>
          t
            ? e < 50
              ? s3(i.accentColor, i.primaryColor, e / 100)
              : s3(i.secondColor, i.accentColor, e / 100)
            : "#ffffff",
        [t, e]
      ),
      s = Math.round((e / 100) * n);
    return t
      ? D("div", {
          className: "durability-bar",
          children: D("div", {
            style: {
              visibility: e > 0 ? "visible" : "hidden",
              height: "100%",
              width: `${e}%`,
              backgroundColor: l,
              transition: `background ${0.3}s ease, width ${0.3}s ease`,
            },
          }),
        })
      : D("div", {
          style: {
            display: "flex",
            gap: "6.5px",
            alignItems: "center",
            flexDirection: "row-reverse",
          },
          children: Array.from({ length: n }).map((a, f) =>
            D(
              "div",
              {
                style: {
                  height: "14px",
                  width: "6px",
                  borderRadius: "2px",
                  backgroundColor: f < s ? l : "rgba(255,255,255,0.2)",
                  transition: "background-color 0.3s ease",
                },
              },
              f
            )
          ),
        });
  },
  aN = Y1(
    "inventory/validateMove",
    async (e, { rejectWithValue: t, dispatch: n }) => {
      try {
        const r = await _n("swapItems", e);
        if (r === !1) return t(r);
        typeof r == "number" && n(OR(r));
      } catch {
        return t(!1);
      }
    }
  ),
  Eg = (e, t) => {
    const { inventory: n } = Cn.getState(),
      { sourceInventory: r, targetInventory: i } = If(
        n,
        e.inventory,
        t?.inventory
      ),
      l = r.items[e.item.slot - 1],
      s = Ve[l.name];
    if (s === void 0) return console.error(`${l.name} item data undefined!`);
    if (l.metadata?.container !== void 0) {
      if (i.type === Ft.CONTAINER)
        return console.log(
          `Cannot store container ${l.name} inside another container`
        );
      if (n.rightInventory.id === l.metadata.container)
        return console.log(`Cannot move container ${l.name} when opened`);
    }
    const a = t ? i.items[t.item.slot - 1] : pR(l, s, i.items);
    if (a === void 0) return console.error("Target slot undefined!");
    if (
      a.metadata?.container !== void 0 &&
      n.rightInventory.id === a.metadata.container
    )
      return console.log(
        `Cannot swap item ${l.name} with container ${a.name} when opened`
      );
    const f =
        n.shiftPressed && l.count > 1 && r.type !== "shop"
          ? Math.floor(l.count / 2)
          : n.itemAmount === 0 || n.itemAmount > l.count
          ? l.count
          : n.itemAmount,
      d = {
        fromSlot: l,
        toSlot: a,
        fromType: r.type,
        toType: i.type,
        count: f,
      };
    Cn.dispatch(aN({ ...d, fromSlot: l.slot, toSlot: a.slot })),
      Gt(a, !0)
        ? s.stack && dR(l, a)
          ? Cn.dispatch(bR({ ...d, toSlot: a }))
          : Cn.dispatch(ER({ ...d, toSlot: a }))
        : Cn.dispatch(kR(d));
  },
  cN = Y1("inventory/buyItem", async (e, { rejectWithValue: t }) => {
    try {
      const n = await _n("buyItem", e);
      if (n === !1) return t(n);
    } catch {
      return t(!1);
    }
  }),
  fN = (e, t) => {
    const { inventory: n } = Cn.getState(),
      r = n.rightInventory,
      i = n.leftInventory,
      l = r.items[e.item.slot - 1];
    if (!Gt(l)) throw new Error(`Item ${l.slot} name === undefined`);
    if (l.count === 0) return;
    if (Ve[l.name] === void 0)
      return console.error(`Item ${l.name} data undefined!`);
    const a = i.items[t.item.slot - 1];
    if (a === void 0) return console.error("Target slot undefined");
    const f =
        n.itemAmount !== 0
          ? l.count && n.itemAmount > l.count
            ? l.count
            : n.itemAmount
          : 1,
      d = {
        fromSlot: l,
        toSlot: a,
        fromType: r.type,
        toType: i.type,
        count: f,
      };
    Cn.dispatch(cN({ ...d, fromSlot: l.slot, toSlot: a.slot }));
  },
  dN = Y1("inventory/craftItem", async (e, { rejectWithValue: t }) => {
    try {
      const n = await _n("craftItem", e);
      if (n === !1) return t(n);
    } catch {
      return t(!1);
    }
  }),
  pN = (e, t) => {
    const { inventory: n } = Cn.getState(),
      r = n.rightInventory,
      i = n.leftInventory,
      l = r.items[e.item.slot - 1];
    if (!Gt(l)) throw new Error(`Item ${l.slot} name === undefined`);
    if (l.count === 0) return;
    if (Ve[l.name] === void 0)
      return console.error(`Item ${l.name} data undefined!`);
    const a = i.items[t.item.slot - 1];
    if (a === void 0) return console.error("Target slot undefined");
    const f = n.itemAmount === 0 ? 1 : n.itemAmount,
      d = {
        fromSlot: l,
        toSlot: a,
        fromType: r.type,
        toType: i.type,
        count: f,
      };
    Cn.dispatch(dN({ ...d, fromSlot: l.slot, toSlot: a.slot }));
  },
  hN = (
    {
      item: e,
      inventoryId: t,
      inventoryType: n,
      inventoryGroups: r,
      themeSettings: i,
    },
    l
  ) => {
    const s = ti(),
      a = Ao(),
      f = A.useRef(null),
      [d, p] = A.useState(!1),
      g = A.useCallback(
        () => B2(e, { type: n, groups: r }) && H2(e, n),
        [e, n, r]
      ),
      [{ isDragging: v }, m] = aP(
        () => ({
          type: "SLOT",
          collect: (I) => ({ isDragging: I.isDragging() }),
          item: () =>
            Gt(e, n !== Ft.SHOP)
              ? {
                  inventory: n,
                  item: { name: e.name, slot: e.slot },
                  image: e?.name && `url(${So(e) || "none"}`,
                }
              : null,
          canDrag: g,
        }),
        [n, e]
      ),
      [{ isOver: E }, S] = cg(
        () => ({
          accept: "SLOT",
          collect: (I) => ({ isOver: I.isOver() }),
          drop: (I) => {
            switch ((a(Fu()), I.inventory)) {
              case Ft.SHOP:
                fN(I, { inventory: n, item: { slot: e.slot } });
                break;
              case Ft.CRAFTING:
                pN(I, { inventory: n, item: { slot: e.slot } });
                break;
              default:
                Eg(I, { inventory: n, item: { slot: e.slot } });
                break;
            }
          },
          canDrop: (I) =>
            (I.item.slot !== e.slot || I.inventory !== n) &&
            n !== Ft.SHOP &&
            n !== Ft.CRAFTING,
        }),
        [n, e]
      );
    Sn("refreshSlots", (I) => {
      (!v && !I.items) ||
        !Array.isArray(I.items) ||
        !I.items.find((P) => P.item.slot === e.slot && P.inventory === t) ||
        s.dispatch({ type: "dnd-core/END_DRAG" });
    });
    const N = (I) => m(S(I)),
      y = (I) => {
        I.preventDefault(),
          !(n !== "player" || !Gt(e)) &&
            a(LR({ item: e, coords: { x: I.clientX, y: I.clientY } }));
      },
      x = (I) => {
        a(Fu()),
          f.current && clearTimeout(f.current),
          I.ctrlKey && Gt(e) && n !== "shop" && n !== "crafting"
            ? Eg({ item: e, inventory: n })
            : I.altKey && Gt(e) && n === "player" && im(e);
      },
      k = dD([N, l]);
    return K("div", {
      ref: k,
      onContextMenu: y,
      onClick: x,
      className: "inventory-slot",
      onMouseEnter: () => p(!0),
      onMouseLeave: () => p(!1),
      style: {
        filter:
          !B2(e, { type: n, groups: r }) || !H2(e, n)
            ? "brightness(80%) grayscale(100%)"
            : void 0,
        opacity: v ? 0.4 : 1,
        backgroundImage: `url(${e?.name ? So(e) : "none"}`,
        border: E ? "1px dashed rgba(255,255,255,0.4)" : "",
        outline: d
          ? `0.8px solid ${i?.PrimaryColor || "#BEEE11"}`
          : "0.8px solid #FFFFFF1F",
        backgroundColor: d ? `${i?.PrimaryColor || "#BEEE11"}0D` : "#B1B1B111",
      },
      children: [
        n === "shop" &&
          Gt(e) &&
          e?.price !== void 0 &&
          D($t, {
            children:
              e?.currency !== "money" &&
              e.currency !== "black_money" &&
              e.price > 0 &&
              e.currency
                ? K("div", {
                    className: "item-slot-currency-wrapper-topleft",
                    children: [
                      D("img", {
                        src: e.currency ? So(e.currency) : "none",
                        alt: "item-image",
                        style: {
                          imageRendering: "-webkit-optimize-contrast",
                          height: "auto",
                          width: "2vh",
                          backfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                        },
                      }),
                      D("p", { children: e.price.toLocaleString("en-us") }),
                    ],
                  })
                : D($t, {
                    children:
                      e.price > 0 &&
                      D("div", {
                        className: "item-slot-price-wrapper-topleft",
                        style: {
                          color:
                            e.currency === "money" || !e.currency
                              ? i?.money?.money
                              : i?.money?.blackMoney,
                          backgroundColor: `${
                            e.currency === "money" || !e.currency
                              ? i?.money?.money
                              : i?.money?.blackMoney
                          }33`,
                        },
                        children: K("p", {
                          children: [
                            Ge.$ || "$",
                            e.price.toLocaleString("en-us"),
                          ],
                        }),
                      }),
                  }),
          }),
        n === "player" &&
          e.slot <= 5 &&
          K("div", {
            className: "hexagon-slot-number",
            children: [
              K("svg", {
                className: "hexagon-bg",
                width: "32",
                height: "32",
                viewBox: "0 0 32 32",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  D("path", {
                    d: "M14 1.1547C15.2376 0.440169 16.7624 0.440169 18 1.1547L27.8564 6.8453C29.094 7.55983 29.8564 8.88034 29.8564 10.3094V21.6906C29.8564 23.1197 29.094 24.4402 27.8564 25.1547L18 30.8453C16.7624 31.5598 15.2376 31.5598 14 30.8453L4.14359 25.1547C2.90599 24.4402 2.14359 23.1197 2.14359 21.6906L2.14359 10.3094C2.14359 8.88034 2.90599 7.55983 4.14359 6.8453L14 1.1547Z",
                    fill: "#D9D9D9",
                    fillOpacity: "0.2",
                  }),
                  D("path", {
                    d: "M14.5 4.86603C15.4282 4.33013 16.5718 4.33013 17.5 4.86603L24.8923 9.13397C25.8205 9.66987 26.3923 10.6603 26.3923 11.7321V20.2679C26.3923 21.3397 25.8205 22.3301 24.8923 22.866L17.5 27.134C16.5718 27.6699 15.4282 27.6699 14.5 27.134L7.1077 22.866C6.17949 22.3301 5.6077 21.3397 5.6077 20.2679L5.6077 11.7321C5.6077 10.6603 6.17949 9.66987 7.1077 9.13397L14.5 4.86603Z",
                    fill: "url(#paint0_linear_0_159)",
                    fillOpacity: "0.24",
                  }),
                  D("path", {
                    d: "M14.7002 5.21289C15.5046 4.74845 16.4954 4.74845 17.2998 5.21289L24.6924 9.48047C25.4968 9.94493 25.9922 10.8036 25.9922 11.7324V20.2676C25.9922 21.1964 25.4968 22.0551 24.6924 22.5195L17.2998 26.7871C16.4954 27.2516 15.5046 27.2516 14.7002 26.7871L7.30762 22.5195C6.50323 22.0551 6.00781 21.1964 6.00781 20.2676L6.00781 11.7324C6.00781 10.8036 6.50323 9.94493 7.30762 9.48047L14.7002 5.21289Z",
                    stroke: "#D9D9D9",
                    strokeOpacity: "0.24",
                    strokeWidth: "0.8",
                  }),
                  D("defs", {
                    children: K("linearGradient", {
                      id: "paint0_linear_0_159",
                      x1: "4",
                      y1: "16",
                      x2: "28",
                      y2: "16",
                      gradientUnits: "userSpaceOnUse",
                      children: [
                        D("stop", { stopColor: "#D9D9D9" }),
                        D("stop", { offset: "1", stopColor: "#EFEFEF" }),
                      ],
                    }),
                  }),
                ],
              }),
              D("span", { className: "number-text", children: e.slot }),
            ],
          }),
        Gt(e) &&
          K("div", {
            className: "item-slot-wrapper",
            onMouseEnter: () => {
              f.current = window.setTimeout(() => {
                a(AR({ item: e, inventoryType: n }));
              }, 500);
            },
            onMouseLeave: () => {
              a(Fu()),
                f.current && (clearTimeout(f.current), (f.current = null));
            },
            children: [
              D("div", {
                className:
                  n === "player" && e.slot <= 5
                    ? "item-hotslot-header-wrapper"
                    : "item-slot-header-wrapper",
                children: D("div", {
                  className: "item-slot-info-wrapper",
                  children: D("p", {
                    children: e.count
                      ? e.count.toLocaleString("en-us") + "x"
                      : "",
                  }),
                }),
              }),
              K("div", {
                children: [
                  n !== "shop" &&
                    e?.slot > 5 &&
                    e?.durability !== void 0 &&
                    D(vm, { percent: e.durability, durability: !0, theme: i }),
                  ((n === "player" && e.slot > 5) || n !== "player") &&
                    D("div", {
                      className: "inventory-slot-label-box",
                      children: D("div", {
                        className: "inventory-slot-label-text",
                        children: e.metadata?.label
                          ? e.metadata.label
                          : Ve[e.name]?.label || e.name,
                      }),
                    }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  ym = qe.memo(qe.forwardRef(hN));
function Fx(e) {
  const [t, n] = A.useState(null),
    r = A.useRef(null);
  return {
    ref: A.useCallback(
      (l) => {
        if (
          (r.current && (r.current.disconnect(), (r.current = null)),
          l === null)
        ) {
          n(null);
          return;
        }
        (r.current = new IntersectionObserver(([s]) => {
          n(s);
        }, e)),
          r.current.observe(l);
      },
      [e?.rootMargin, e?.root, e?.threshold]
    ),
    entry: t,
  };
}
const a3 = 25,
  gN = ({ inventory: e, UseNativeLabeling: t, themeSettings: n, Texts: r }) => {
    const i = A.useMemo(
        () =>
          e.maxWeight !== void 0 ? Math.floor(X5(e.items) * 1e3) / 1e3 : 0,
        [e.maxWeight, e.items]
      ),
      [l, s] = A.useState(0),
      a = A.useRef(null),
      { ref: f, entry: d } = Fx({ threshold: 0.5 }),
      p = Ar((g) => g.inventory.isBusy);
    return (
      A.useEffect(() => {
        d && d.isIntersecting && s((g) => ++g);
      }, [d]),
      D($t, {
        children: K("div", {
          className: "right-inventory-grid-wrapper",
          style: { pointerEvents: p ? "none" : "auto" },
          children: [
            K("div", {
              className: "right-inventory-top-wrapper",
              children: [
                K("div", {
                  className: "right-inventory-top-esc-wrapper",
                  children: [
                    D("button", {
                      className: "menu-item-esc-btn",
                      style: {
                        border: `1.5px solid ${n.PrimaryColor}`,
                        color: n.PrimaryColor,
                        background: `${n.PrimaryColor}0C`,
                      },
                      disabled: !1,
                      onClick: () => _n("exit"),
                      children: "ESC",
                    }),
                    K("div", {
                      className: "right-inventory-top-label-texts",
                      children: [
                        D("div", {
                          className: "right-inventory-top-label-text1",
                          children: r.Close_header_1,
                        }),
                        D("div", {
                          className: "right-inventory-top-label-text2",
                          children: r.Close_header_2,
                        }),
                      ],
                    }),
                  ],
                }),
                K("div", {
                  className: "right-inventory-top-icon",
                  children: [
                    K("svg", {
                      width: "52",
                      height: "52",
                      viewBox: "0 0 52 52",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [
                        D("path", {
                          d: "M24 1.1547C25.2376 0.440169 26.7624 0.440169 28 1.1547L46.5167 11.8453C47.7543 12.5598 48.5167 13.8803 48.5167 15.3094V36.6906C48.5167 38.1197 47.7543 39.4402 46.5167 40.1547L28 50.8453C26.7624 51.5598 25.2376 51.5598 24 50.8453L5.48334 40.1547C4.24573 39.4402 3.48334 38.1197 3.48334 36.6906L3.48334 15.3094C3.48334 13.8803 4.24574 12.5598 5.48334 11.8453L24 1.1547Z",
                          fill: n.PrimaryColor,
                          fillOpacity: "0.2",
                        }),
                        D("path", {
                          d: "M24.75 7.29883C25.5235 6.85232 26.4765 6.85232 27.25 7.29883L41.5703 15.5674C42.3438 16.014 42.8203 16.8393 42.8203 17.7324V34.2676C42.8203 35.1607 42.3438 35.986 41.5703 36.4326L27.25 44.7012C26.5249 45.1197 25.6423 45.1455 24.8975 44.7793L24.75 44.7012L10.4297 36.4326C9.6562 35.986 9.17969 35.1607 9.17969 34.2676L9.17969 17.7324C9.17969 16.8393 9.6562 16.014 10.4297 15.5674L24.75 7.29883Z",
                          fill: n.PrimaryColor,
                          stroke: n.PrimaryColor,
                        }),
                        D("path", {
                          d: "M32.72 21.5455H19.92C19.7503 21.5455 19.5875 21.4784 19.4675 21.3591C19.3474 21.2397 19.28 21.0779 19.28 20.9091C19.28 20.7403 19.3474 20.5785 19.4675 20.4591C19.5875 20.3398 19.7503 20.2727 19.92 20.2727H30.8C30.9697 20.2727 31.1325 20.2057 31.2525 20.0863C31.3726 19.967 31.44 19.8051 31.44 19.6364C31.44 19.4676 31.3726 19.3057 31.2525 19.1864C31.1325 19.067 30.9697 19 30.8 19H19.92C19.4108 19 18.9224 19.2011 18.5624 19.5592C18.2023 19.9172 18 20.4028 18 20.9091V31.0909C18 31.5972 18.2023 32.0828 18.5624 32.4408C18.9224 32.7989 19.4108 33 19.92 33H32.72C33.0595 33 33.385 32.8659 33.6251 32.6272C33.8651 32.3885 34 32.0648 34 31.7273V22.8182C34 22.4806 33.8651 22.1569 33.6251 21.9182C33.385 21.6795 33.0595 21.5455 32.72 21.5455ZM29.84 27.9091C29.6501 27.9091 29.4645 27.8531 29.3067 27.7482C29.1488 27.6433 29.0257 27.4943 28.9531 27.3198C28.8804 27.1454 28.8614 26.9535 28.8984 26.7683C28.9355 26.5832 29.0269 26.4131 29.1612 26.2796C29.2954 26.1461 29.4665 26.0552 29.6527 26.0183C29.8389 25.9815 30.032 26.0004 30.2074 26.0727C30.3828 26.1449 30.5327 26.2673 30.6382 26.4242C30.7437 26.5812 30.8 26.7658 30.8 26.9545C30.8 27.2077 30.6989 27.4505 30.5188 27.6295C30.3388 27.8085 30.0946 27.9091 29.84 27.9091Z",
                          fill: "#121212",
                        }),
                      ],
                    }),
                    K("div", {
                      className: "grid-text-content",
                      children: [
                        D("div", {
                          className: "grid-label",
                          children: t
                            ? e.label?.toLocaleUpperCase()
                            : r.Secondary,
                        }),
                        D("div", {
                          className: "grid-label2",
                          children: r.SecondaryDescription,
                        }),
                      ],
                    }),
                  ],
                }),
                e.maxWeight &&
                  K("div", {
                    className: "right-inventory-grid-header-weight-wrapper",
                    children: [
                      K("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          right: "0px",
                          position: "absolute",
                          bottom: "20px",
                        },
                        children: [
                          D("svg", {
                            width: "16",
                            height: "14",
                            viewBox: "0 0 16 14",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: D("path", {
                              d: "M8 0C8.84869 0 9.66263 0.327777 10.2627 0.911223C10.8629 1.49467 11.2 2.28599 11.2 3.11111C11.2 3.67889 11.048 4.20778 10.768 4.66667H12.8C13.56 4.66667 14.2 5.18778 14.36 5.88C15.968 12.11 16 12.2733 16 12.4444C16 12.857 15.8314 13.2527 15.5314 13.5444C15.2313 13.8361 14.8243 14 14.4 14H1.6C1.17565 14 0.768687 13.8361 0.468629 13.5444C0.168571 13.2527 0 12.857 0 12.4444C0 12.2733 0.0320002 12.11 1.64 5.88C1.8 5.18778 2.44 4.66667 3.2 4.66667H5.232C4.94639 4.19549 4.79713 3.65801 4.8 3.11111C4.8 2.28599 5.13714 1.49467 5.73726 0.911223C6.33737 0.327777 7.15131 0 8 0ZM8 1.55556C7.57565 1.55556 7.16869 1.71944 6.86863 2.01117C6.56857 2.30289 6.4 2.69855 6.4 3.11111C6.4 3.52367 6.56857 3.91933 6.86863 4.21105C7.16869 4.50278 7.57565 4.66667 8 4.66667C8.42435 4.66667 8.83131 4.50278 9.13137 4.21105C9.43143 3.91933 9.6 3.52367 9.6 3.11111C9.6 2.69855 9.43143 2.30289 9.13137 2.01117C8.83131 1.71944 8.42435 1.55556 8 1.55556Z",
                              fill: "white",
                            }),
                          }),
                          K("span", {
                            className: "inventory-grid-weight-right",
                            children: [
                              (i / 1e3).toFixed(1),
                              " / ",
                              ((e?.maxWeight ?? 0) / 1e3).toFixed(1),
                              " kg",
                            ],
                          }),
                        ],
                      }),
                      D(vm, {
                        percent: e.maxWeight ? (i / e.maxWeight) * 100 : 0,
                        theme: n,
                      }),
                    ],
                  }),
              ],
            }),
            D("div", {
              className: "right-inventory-grid-container",
              ref: a,
              children: D($t, {
                children: e.items
                  .slice(e.type == "player" ? 5 : 0, (l + 1) * a3)
                  .map((g, v) =>
                    D(
                      ym,
                      {
                        item: g,
                        ref: v === (l + 1) * a3 - 1 ? f : null,
                        inventoryType: e.type,
                        inventoryGroups: e.groups,
                        inventoryId: e.id,
                        themeSettings: n,
                      },
                      `${e.type}-${e.id}-${g.slot}`
                    )
                  ),
              }),
            }),
          ],
        }),
      })
    );
  },
  mN = ({ UseNativeLabeling: e, themeSettings: t, Texts: n }) => {
    const r = Ar(TR);
    return D(gN, {
      inventory: r,
      themeSettings: t,
      Texts: n,
      UseNativeLabeling: e,
    });
  },
  vN = ({ inventory: e, themeSettings: t, Texts: n }) => {
    const r = A.useMemo(
        () =>
          e.maxWeight !== void 0 ? Math.floor(X5(e.items) * 1e3) / 1e3 : 0,
        [e.maxWeight, e.items]
      ),
      [i, l] = A.useState(0),
      s = A.useRef(null),
      { ref: a, entry: f } = Fx({ threshold: 0.5 }),
      d = Ar((v) => v.inventory.isBusy),
      p = e.slots;
    A.useEffect(() => {
      f && f.isIntersecting && l((v) => ++v);
    }, [f]);
    const g = (v) => (v == null ? "0" : Number(v).toLocaleString());
    return D($t, {
      children: K("div", {
        className: "inventory-grid-wrapper",
        style: { pointerEvents: d ? "none" : "auto" },
        children: [
          K("div", {
            className: "inventory-grid-header-container",
            children: [
              D("div", {
                className: "inventory-grid-title",
                children: n.Header,
              }),
              K("div", {
                className: "inventory-grid-character-container",
                children: [
                  D("div", {
                    className: "inventory-grid-character-profile",
                    style: {
                      backgroundImage: `url(${
                        e?.mugshot?.startsWith("data:") ||
                        e?.mugshot?.startsWith("http")
                          ? e.mugshot
                          : `data:image/png;base64,${e.mugshot}`
                      })`,
                    },
                  }),
                  K("div", {
                    className: "inventory-grid-character-details-container",
                    children: [
                      D("div", {
                        className: "inventory-grid-character-name",
                        style: { color: t.PrimaryColor },
                        children: e.label?.toUpperCase(),
                      }),
                      K("div", {
                        className: "inventory-grid-character-chardetails",
                        children: [
                          K("div", {
                            className: "inventory-grid-character-money",
                            children: [
                              D("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: D("path", {
                                  d: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM8.92308 11.6923H8.61539V12.3077C8.61539 12.4709 8.55055 12.6274 8.43514 12.7428C8.31974 12.8582 8.16321 12.9231 8 12.9231C7.83679 12.9231 7.68027 12.8582 7.56486 12.7428C7.44945 12.6274 7.38462 12.4709 7.38462 12.3077V11.6923H6.15385C5.99064 11.6923 5.83411 11.6275 5.71871 11.5121C5.6033 11.3967 5.53846 11.2401 5.53846 11.0769C5.53846 10.9137 5.6033 10.7572 5.71871 10.6418C5.83411 10.5264 5.99064 10.4615 6.15385 10.4615H8.92308C9.16789 10.4615 9.40268 10.3643 9.57579 10.1912C9.7489 10.0181 9.84616 9.78327 9.84616 9.53846C9.84616 9.29364 9.7489 9.05886 9.57579 8.88575C9.40268 8.71264 9.16789 8.61538 8.92308 8.61538H7.07692C6.50569 8.61538 5.95785 8.38846 5.55393 7.98454C5.15 7.58061 4.92308 7.03277 4.92308 6.46154C4.92308 5.8903 5.15 5.34246 5.55393 4.93854C5.95785 4.53461 6.50569 4.30769 7.07692 4.30769H7.38462V3.69231C7.38462 3.5291 7.44945 3.37257 7.56486 3.25716C7.68027 3.14176 7.83679 3.07692 8 3.07692C8.16321 3.07692 8.31974 3.14176 8.43514 3.25716C8.55055 3.37257 8.61539 3.5291 8.61539 3.69231V4.30769H9.84616C10.0094 4.30769 10.1659 4.37253 10.2813 4.48793C10.3967 4.60334 10.4615 4.75987 10.4615 4.92308C10.4615 5.08629 10.3967 5.24281 10.2813 5.35822C10.1659 5.47363 10.0094 5.53846 9.84616 5.53846H7.07692C6.83211 5.53846 6.59732 5.63571 6.42421 5.80882C6.2511 5.98193 6.15385 6.21672 6.15385 6.46154C6.15385 6.70635 6.2511 6.94114 6.42421 7.11425C6.59732 7.28736 6.83211 7.38461 7.07692 7.38461H8.92308C9.49431 7.38461 10.0422 7.61154 10.4461 8.01546C10.85 8.41938 11.0769 8.96722 11.0769 9.53846C11.0769 10.1097 10.85 10.6575 10.4461 11.0615C10.0422 11.4654 9.49431 11.6923 8.92308 11.6923Z",
                                  fill: "white",
                                }),
                              }),
                              K("span", {
                                className:
                                  "inventory-grid-character-money-amount",
                                children: [Ge.$ || "$", " ", g(e.pdata?.money)],
                              }),
                            ],
                          }),
                          K("div", {
                            className: "inventory-grid-character-bank",
                            children: [
                              D("svg", {
                                width: "18",
                                height: "14",
                                viewBox: "0 0 18 14",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: D("path", {
                                  d: "M15.9231 0H2.07692C1.52609 0 0.997815 0.221249 0.608317 0.615076C0.218818 1.0089 0 1.54305 0 2.1V11.9C0 12.457 0.218818 12.9911 0.608317 13.3849C0.997815 13.7788 1.52609 14 2.07692 14H15.9231C16.4739 14 17.0022 13.7788 17.3917 13.3849C17.7812 12.9911 18 12.457 18 11.9V2.1C18 1.54305 17.7812 1.0089 17.3917 0.615076C17.0022 0.221249 16.4739 0 15.9231 0ZM11.0769 6.3C11.0769 6.85695 10.8581 7.3911 10.4686 7.78492C10.0791 8.17875 9.55083 8.4 9 8.4C8.44917 8.4 7.92089 8.17875 7.53139 7.78492C7.14189 7.3911 6.92308 6.85695 6.92308 6.3C6.92308 6.11435 6.85014 5.9363 6.7203 5.80503C6.59047 5.67375 6.41438 5.6 6.23077 5.6H1.38462V4.2H16.6154V5.6H11.7692C11.5856 5.6 11.4095 5.67375 11.2797 5.80503C11.1499 5.9363 11.0769 6.11435 11.0769 6.3ZM2.07692 1.4H15.9231C16.1067 1.4 16.2828 1.47375 16.4126 1.60503C16.5424 1.7363 16.6154 1.91435 16.6154 2.1V2.8H1.38462V2.1C1.38462 1.91435 1.45755 1.7363 1.58739 1.60503C1.71722 1.47375 1.89331 1.4 2.07692 1.4Z",
                                  fill: "white",
                                }),
                              }),
                              K("span", {
                                className:
                                  "inventory-grid-character-bank-amount",
                                children: [Ge.$ || "$", " ", g(e.pdata?.bank)],
                              }),
                            ],
                          }),
                          K("div", {
                            className: "inventory-grid-character-id",
                            children: [
                              D("svg", {
                                width: "18",
                                height: "14",
                                viewBox: "0 0 18 14",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: D("path", {
                                  d: "M7.61539 6.36364C7.61539 6.61536 7.53418 6.86143 7.38203 7.07073C7.22989 7.28003 7.01364 7.44315 6.76064 7.53948C6.50763 7.63581 6.22923 7.66102 5.96064 7.61191C5.69206 7.5628 5.44534 7.44158 5.2517 7.26359C5.05806 7.0856 4.92618 6.85882 4.87276 6.61193C4.81933 6.36505 4.84675 6.10915 4.95155 5.87659C5.05635 5.64402 5.23382 5.44525 5.46152 5.3054C5.68922 5.16555 5.95692 5.09091 6.23077 5.09091C6.59799 5.09091 6.95017 5.225 7.20984 5.46368C7.46951 5.70236 7.61539 6.02609 7.61539 6.36364ZM18 1.27273V12.7273C18 13.0648 17.8541 13.3885 17.5945 13.6272C17.3348 13.8659 16.9826 14 16.6154 14H1.38462C1.01739 14 0.66521 13.8659 0.405544 13.6272C0.145879 13.3885 0 13.0648 0 12.7273V1.27273C0 0.935179 0.145879 0.611456 0.405544 0.372773C0.66521 0.13409 1.01739 0 1.38462 0H16.6154C16.9826 0 17.3348 0.13409 17.5945 0.372773C17.8541 0.611456 18 0.935179 18 1.27273ZM9.67067 10.0227C9.44664 9.25384 8.91544 8.59088 8.18308 8.16614C8.57201 7.81075 8.83739 7.35723 8.94558 6.86304C9.05377 6.36886 8.99989 5.85628 8.79078 5.39028C8.58167 4.92427 8.22674 4.52583 7.77098 4.24547C7.31523 3.9651 6.77917 3.81543 6.23077 3.81543C5.68237 3.81543 5.14631 3.9651 4.69055 4.24547C4.2348 4.52583 3.87987 4.92427 3.67076 5.39028C3.46165 5.85628 3.40777 6.36886 3.51596 6.86304C3.62415 7.35723 3.88953 7.81075 4.27846 8.16614C3.54657 8.59135 3.01552 9.25412 2.79087 10.0227C2.74496 10.1862 2.7716 10.3598 2.86492 10.5052C2.95823 10.6507 3.11059 10.7561 3.28846 10.7983C3.46634 10.8405 3.65516 10.816 3.81339 10.7302C3.97163 10.6445 4.08631 10.5044 4.13221 10.3409C4.36067 9.52557 5.2624 8.90909 6.23077 8.90909C7.19913 8.90909 8.10173 9.52398 8.32933 10.3409C8.37523 10.5044 8.48991 10.6445 8.64815 10.7302C8.80638 10.816 8.9952 10.8405 9.17308 10.7983C9.35095 10.7561 9.5033 10.6507 9.59662 10.5052C9.68994 10.3598 9.71658 10.1862 9.67067 10.0227ZM15.2308 8.27273C15.2308 8.10395 15.1578 7.94209 15.028 7.82275C14.8982 7.70341 14.7221 7.63636 14.5385 7.63636H11.0769C10.8933 7.63636 10.7172 7.70341 10.5874 7.82275C10.4576 7.94209 10.3846 8.10395 10.3846 8.27273C10.3846 8.4415 10.4576 8.60336 10.5874 8.7227C10.7172 8.84205 10.8933 8.90909 11.0769 8.90909H14.5385C14.7221 8.90909 14.8982 8.84205 15.028 8.7227C15.1578 8.60336 15.2308 8.4415 15.2308 8.27273ZM15.2308 5.72727C15.2308 5.5585 15.1578 5.39664 15.028 5.2773C14.8982 5.15795 14.7221 5.09091 14.5385 5.09091H11.0769C10.8933 5.09091 10.7172 5.15795 10.5874 5.2773C10.4576 5.39664 10.3846 5.5585 10.3846 5.72727C10.3846 5.89605 10.4576 6.05791 10.5874 6.17725C10.7172 6.29659 10.8933 6.36364 11.0769 6.36364H14.5385C14.7221 6.36364 14.8982 6.29659 15.028 6.17725C15.1578 6.05791 15.2308 5.89605 15.2308 5.72727Z",
                                  fill: "white",
                                }),
                              }),
                              D("span", {
                                className: "inventory-grid-character-id-amount",
                                children: e.passport,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          K("div", {
            className: "inventory-grid-wbarheader",
            children: [
              K("svg", {
                width: "52",
                height: "52",
                viewBox: "0 0 52 52",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  D("path", {
                    d: "M24 1.1547C25.2376 0.440169 26.7624 0.440169 28 1.1547L46.5167 11.8453C47.7543 12.5598 48.5167 13.8803 48.5167 15.3094V36.6906C48.5167 38.1197 47.7543 39.4402 46.5167 40.1547L28 50.8453C26.7624 51.5598 25.2376 51.5598 24 50.8453L5.48334 40.1547C4.24573 39.4402 3.48334 38.1197 3.48334 36.6906L3.48334 15.3094C3.48334 13.8803 4.24574 12.5598 5.48334 11.8453L24 1.1547Z",
                    fill: t.PrimaryColor,
                    fillOpacity: "0.2",
                  }),
                  D("path", {
                    d: "M24.75 7.29883C25.5235 6.85232 26.4765 6.85232 27.25 7.29883L41.5703 15.5674C42.3438 16.014 42.8203 16.8393 42.8203 17.7324V34.2676C42.8203 35.1607 42.3438 35.986 41.5703 36.4326L27.25 44.7012C26.5249 45.1197 25.6423 45.1455 24.8975 44.7793L24.75 44.7012L10.4297 36.4326C9.6562 35.986 9.17969 35.1607 9.17969 34.2676L9.17969 17.7324C9.17969 16.8393 9.6562 16.014 10.4297 15.5674L24.75 7.29883Z",
                    fill: t.PrimaryColor,
                    stroke: t.PrimaryColor,
                  }),
                  D("path", {
                    d: "M23.6667 33H31.5417C32.3467 33 33 32.3467 33 31.5417V30.9583C33 30.1533 32.3467 29.5 31.5417 29.5H23.6667V33ZM23.6667 28.3333H31.5417C32.3467 28.3333 33 27.68 33 26.875V25.125C33 24.32 32.3467 23.6667 31.5417 23.6667H23.6667V28.3333ZM22.5 23.6667V28.3333H20.4583C19.6533 28.3333 19 27.68 19 26.875V25.125C19 24.32 19.6533 23.6667 20.4583 23.6667H22.5ZM23.6667 22.5H31.5417C32.3467 22.5 33 21.8467 33 21.0417V20.4583C33 19.6533 32.3467 19 31.5417 19H23.6667V22.5ZM22.5 19V22.5H20.4583C19.6533 22.5 19 21.8467 19 21.0417V20.4583C19 19.6533 19.6533 19 20.4583 19H22.5ZM22.5 29.5V33H20.4583C19.6533 33 19 32.3467 19 31.5417V30.9583C19 30.1533 19.6533 29.5 20.4583 29.5H22.5Z",
                    fill: "#121212",
                  }),
                ],
              }),
              K("div", {
                className: "grid-text-content",
                children: [
                  D("div", { className: "grid-label", children: n.Pockets }),
                  D("div", {
                    className: "grid-label2",
                    children: n.PocketsDescription,
                  }),
                ],
              }),
            ],
          }),
          K("div", {
            style: {
              position: "absolute",
              top: "155px",
              right: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
            },
            children: [
              e.maxWeight &&
                K("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginLeft: "5.5vh",
                    marginTop: "0.5vh",
                  },
                  children: [
                    D("svg", {
                      width: "16",
                      height: "14",
                      viewBox: "0 0 16 14",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: D("path", {
                        d: "M8 0C8.84869 0 9.66263 0.327777 10.2627 0.911223C10.8629 1.49467 11.2 2.28599 11.2 3.11111C11.2 3.67889 11.048 4.20778 10.768 4.66667H12.8C13.56 4.66667 14.2 5.18778 14.36 5.88C15.968 12.11 16 12.2733 16 12.4444C16 12.857 15.8314 13.2527 15.5314 13.5444C15.2313 13.8361 14.8243 14 14.4 14H1.6C1.17565 14 0.768687 13.8361 0.468629 13.5444C0.168571 13.2527 0 12.857 0 12.4444C0 12.2733 0.0320002 12.11 1.64 5.88C1.8 5.18778 2.44 4.66667 3.2 4.66667H5.232C4.94639 4.19549 4.79713 3.65801 4.8 3.11111C4.8 2.28599 5.13714 1.49467 5.73726 0.911223C6.33737 0.327777 7.15131 0 8 0ZM8 1.55556C7.57565 1.55556 7.16869 1.71944 6.86863 2.01117C6.56857 2.30289 6.4 2.69855 6.4 3.11111C6.4 3.52367 6.56857 3.91933 6.86863 4.21105C7.16869 4.50278 7.57565 4.66667 8 4.66667C8.42435 4.66667 8.83131 4.50278 9.13137 4.21105C9.43143 3.91933 9.6 3.52367 9.6 3.11111C9.6 2.69855 9.43143 2.30289 9.13137 2.01117C8.83131 1.71944 8.42435 1.55556 8 1.55556Z",
                        fill: "white",
                      }),
                    }),
                    K("span", {
                      className: "inventory-grid-weight-left",
                      children: [
                        (r / 1e3).toFixed(1),
                        " / ",
                        ((e?.maxWeight ?? 0) / 1e3).toFixed(1),
                        " kg",
                      ],
                    }),
                  ],
                }),
              D(vm, {
                percent: e.maxWeight ? (r / e.maxWeight) * 100 : 0,
                theme: t,
              }),
            ],
          }),
          D("div", {
            className: "inventory-grid-container",
            ref: s,
            children: D($t, {
              children: e.items
                .slice(e.type == "player" ? 5 : 0, (i + 1) * p)
                .map((v, m) =>
                  D(
                    ym,
                    {
                      item: v,
                      ref: m === (i + 1) * p - 1 ? a : null,
                      inventoryType: e.type,
                      inventoryGroups: e.groups,
                      inventoryId: e.id,
                      themeSettings: t,
                    },
                    `${e.type}-${e.id}-${v.slot}`
                  )
                ),
            }),
          }),
        ],
      }),
    });
  },
  yN = ({ themeSettings: e, Texts: t }) => {
    const n = Ar(nm);
    return D(vN, { inventory: n, themeSettings: e, Texts: t });
  },
  c3 = ["http", "https", "mailto", "tel"];
function wN(e) {
  const t = (e || "").trim(),
    n = t.charAt(0);
  if (n === "#" || n === "/") return t;
  const r = t.indexOf(":");
  if (r === -1) return t;
  let i = -1;
  for (; ++i < c3.length; ) {
    const l = c3[i];
    if (r === l.length && t.slice(0, l.length).toLowerCase() === l) return t;
  }
  return (
    (i = t.indexOf("?")),
    (i !== -1 && r > i) || ((i = t.indexOf("#")), i !== -1 && r > i)
      ? t
      : "javascript:void(0)"
  );
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ var xN = function (t) {
  return (
    t != null &&
    t.constructor != null &&
    typeof t.constructor.isBuffer == "function" &&
    t.constructor.isBuffer(t)
  );
};
const $x = Ui(xN);
function Hu(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
    ? f3(e.position)
    : "start" in e || "end" in e
    ? f3(e)
    : "line" in e || "column" in e
    ? kg(e)
    : "";
}
function kg(e) {
  return d3(e && e.line) + ":" + d3(e && e.column);
}
function f3(e) {
  return kg(e && e.start) + "-" + kg(e && e.end);
}
function d3(e) {
  return e && typeof e == "number" ? e : 1;
}
class Zn extends Error {
  constructor(t, n, r) {
    const i = [null, null];
    let l = {
      start: { line: null, column: null },
      end: { line: null, column: null },
    };
    if (
      (super(),
      typeof n == "string" && ((r = n), (n = void 0)),
      typeof r == "string")
    ) {
      const s = r.indexOf(":");
      s === -1 ? (i[1] = r) : ((i[0] = r.slice(0, s)), (i[1] = r.slice(s + 1)));
    }
    n &&
      ("type" in n || "position" in n
        ? n.position && (l = n.position)
        : "start" in n || "end" in n
        ? (l = n)
        : ("line" in n || "column" in n) && (l.start = n)),
      (this.name = Hu(n) || "1:1"),
      (this.message = typeof t == "object" ? t.message : t),
      (this.stack = ""),
      typeof t == "object" && t.stack && (this.stack = t.stack),
      (this.reason = this.message),
      this.fatal,
      (this.line = l.start.line),
      (this.column = l.start.column),
      (this.position = l),
      (this.source = i[0]),
      (this.ruleId = i[1]),
      this.file,
      this.actual,
      this.expected,
      this.url,
      this.note;
  }
}
Zn.prototype.file = "";
Zn.prototype.name = "";
Zn.prototype.reason = "";
Zn.prototype.message = "";
Zn.prototype.stack = "";
Zn.prototype.fatal = null;
Zn.prototype.column = null;
Zn.prototype.line = null;
Zn.prototype.source = null;
Zn.prototype.ruleId = null;
Zn.prototype.position = null;
const Cr = { basename: SN, dirname: CN, extname: EN, join: kN, sep: "/" };
function SN(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  xs(e);
  let n = 0,
    r = -1,
    i = e.length,
    l;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.charCodeAt(i) === 47) {
        if (l) {
          n = i + 1;
          break;
        }
      } else r < 0 && ((l = !0), (r = i + 1));
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e) return "";
  let s = -1,
    a = t.length - 1;
  for (; i--; )
    if (e.charCodeAt(i) === 47) {
      if (l) {
        n = i + 1;
        break;
      }
    } else
      s < 0 && ((l = !0), (s = i + 1)),
        a > -1 &&
          (e.charCodeAt(i) === t.charCodeAt(a--)
            ? a < 0 && (r = i)
            : ((a = -1), (r = s)));
  return n === r ? (r = s) : r < 0 && (r = e.length), e.slice(n, r);
}
function CN(e) {
  if ((xs(e), e.length === 0)) return ".";
  let t = -1,
    n = e.length,
    r;
  for (; --n; )
    if (e.charCodeAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0
    ? e.charCodeAt(0) === 47
      ? "/"
      : "."
    : t === 1 && e.charCodeAt(0) === 47
    ? "//"
    : e.slice(0, t);
}
function EN(e) {
  xs(e);
  let t = e.length,
    n = -1,
    r = 0,
    i = -1,
    l = 0,
    s;
  for (; t--; ) {
    const a = e.charCodeAt(t);
    if (a === 47) {
      if (s) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && ((s = !0), (n = t + 1)),
      a === 46 ? (i < 0 ? (i = t) : l !== 1 && (l = 1)) : i > -1 && (l = -1);
  }
  return i < 0 || n < 0 || l === 0 || (l === 1 && i === n - 1 && i === r + 1)
    ? ""
    : e.slice(i, n);
}
function kN(...e) {
  let t = -1,
    n;
  for (; ++t < e.length; )
    xs(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : bN(n);
}
function bN(e) {
  xs(e);
  const t = e.charCodeAt(0) === 47;
  let n = _N(e, !t);
  return (
    n.length === 0 && !t && (n = "."),
    n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"),
    t ? "/" + n : n
  );
}
function _N(e, t) {
  let n = "",
    r = 0,
    i = -1,
    l = 0,
    s = -1,
    a,
    f;
  for (; ++s <= e.length; ) {
    if (s < e.length) a = e.charCodeAt(s);
    else {
      if (a === 47) break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === s - 1 || l === 1))
        if (i !== s - 1 && l === 2) {
          if (
            n.length < 2 ||
            r !== 2 ||
            n.charCodeAt(n.length - 1) !== 46 ||
            n.charCodeAt(n.length - 2) !== 46
          ) {
            if (n.length > 2) {
              if (((f = n.lastIndexOf("/")), f !== n.length - 1)) {
                f < 0
                  ? ((n = ""), (r = 0))
                  : ((n = n.slice(0, f)),
                    (r = n.length - 1 - n.lastIndexOf("/"))),
                  (i = s),
                  (l = 0);
                continue;
              }
            } else if (n.length > 0) {
              (n = ""), (r = 0), (i = s), (l = 0);
              continue;
            }
          }
          t && ((n = n.length > 0 ? n + "/.." : ".."), (r = 2));
        } else
          n.length > 0
            ? (n += "/" + e.slice(i + 1, s))
            : (n = e.slice(i + 1, s)),
            (r = s - i - 1);
      (i = s), (l = 0);
    } else a === 46 && l > -1 ? l++ : (l = -1);
  }
  return n;
}
function xs(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const ON = { cwd: TN };
function TN() {
  return "/";
}
function bg(e) {
  return e !== null && typeof e == "object" && e.href && e.origin;
}
function IN(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!bg(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`"
    );
    throw ((t.code = "ERR_INVALID_ARG_TYPE"), t);
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw ((t.code = "ERR_INVALID_URL_SCHEME"), t);
  }
  return PN(e);
}
function PN(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.charCodeAt(n) === 37 && t.charCodeAt(n + 1) === 50) {
      const r = t.charCodeAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(t);
}
const ih = ["history", "path", "basename", "stem", "extname", "dirname"];
class zx {
  constructor(t) {
    let n;
    t
      ? typeof t == "string" || RN(t)
        ? (n = { value: t })
        : bg(t)
        ? (n = { path: t })
        : (n = t)
      : (n = {}),
      (this.data = {}),
      (this.messages = []),
      (this.history = []),
      (this.cwd = ON.cwd()),
      this.value,
      this.stored,
      this.result,
      this.map;
    let r = -1;
    for (; ++r < ih.length; ) {
      const l = ih[r];
      l in n &&
        n[l] !== void 0 &&
        n[l] !== null &&
        (this[l] = l === "history" ? [...n[l]] : n[l]);
    }
    let i;
    for (i in n) ih.includes(i) || (this[i] = n[i]);
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    bg(t) && (t = IN(t)),
      lh(t, "path"),
      this.path !== t && this.history.push(t);
  }
  get dirname() {
    return typeof this.path == "string" ? Cr.dirname(this.path) : void 0;
  }
  set dirname(t) {
    p3(this.basename, "dirname"), (this.path = Cr.join(t || "", this.basename));
  }
  get basename() {
    return typeof this.path == "string" ? Cr.basename(this.path) : void 0;
  }
  set basename(t) {
    lh(t, "basename"),
      oh(t, "basename"),
      (this.path = Cr.join(this.dirname || "", t));
  }
  get extname() {
    return typeof this.path == "string" ? Cr.extname(this.path) : void 0;
  }
  set extname(t) {
    if ((oh(t, "extname"), p3(this.dirname, "extname"), t)) {
      if (t.charCodeAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Cr.join(this.dirname, this.stem + (t || ""));
  }
  get stem() {
    return typeof this.path == "string"
      ? Cr.basename(this.path, this.extname)
      : void 0;
  }
  set stem(t) {
    lh(t, "stem"),
      oh(t, "stem"),
      (this.path = Cr.join(this.dirname || "", t + (this.extname || "")));
  }
  toString(t) {
    return (this.value || "").toString(t || void 0);
  }
  message(t, n, r) {
    const i = new Zn(t, n, r);
    return (
      this.path && ((i.name = this.path + ":" + i.name), (i.file = this.path)),
      (i.fatal = !1),
      this.messages.push(i),
      i
    );
  }
  info(t, n, r) {
    const i = this.message(t, n, r);
    return (i.fatal = null), i;
  }
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw ((i.fatal = !0), i);
  }
}
function oh(e, t) {
  if (e && e.includes(Cr.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Cr.sep + "`"
    );
}
function lh(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function p3(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function RN(e) {
  return $x(e);
}
function h3(e) {
  if (e) throw e;
}
var Ya = Object.prototype.hasOwnProperty,
  Bx = Object.prototype.toString,
  g3 = Object.defineProperty,
  m3 = Object.getOwnPropertyDescriptor,
  v3 = function (t) {
    return typeof Array.isArray == "function"
      ? Array.isArray(t)
      : Bx.call(t) === "[object Array]";
  },
  y3 = function (t) {
    if (!t || Bx.call(t) !== "[object Object]") return !1;
    var n = Ya.call(t, "constructor"),
      r =
        t.constructor &&
        t.constructor.prototype &&
        Ya.call(t.constructor.prototype, "isPrototypeOf");
    if (t.constructor && !n && !r) return !1;
    var i;
    for (i in t);
    return typeof i > "u" || Ya.call(t, i);
  },
  w3 = function (t, n) {
    g3 && n.name === "__proto__"
      ? g3(t, n.name, {
          enumerable: !0,
          configurable: !0,
          value: n.newValue,
          writable: !0,
        })
      : (t[n.name] = n.newValue);
  },
  x3 = function (t, n) {
    if (n === "__proto__")
      if (Ya.call(t, n)) {
        if (m3) return m3(t, n).value;
      } else return;
    return t[n];
  },
  AN = function e() {
    var t,
      n,
      r,
      i,
      l,
      s,
      a = arguments[0],
      f = 1,
      d = arguments.length,
      p = !1;
    for (
      typeof a == "boolean" && ((p = a), (a = arguments[1] || {}), (f = 2)),
        (a == null || (typeof a != "object" && typeof a != "function")) &&
          (a = {});
      f < d;
      ++f
    )
      if (((t = arguments[f]), t != null))
        for (n in t)
          (r = x3(a, n)),
            (i = x3(t, n)),
            a !== i &&
              (p && i && (y3(i) || (l = v3(i)))
                ? (l
                    ? ((l = !1), (s = r && v3(r) ? r : []))
                    : (s = r && y3(r) ? r : {}),
                  w3(a, { name: n, newValue: e(p, s, i) }))
                : typeof i < "u" && w3(a, { name: n, newValue: i }));
    return a;
  };
const S3 = Ui(AN);
function _g(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (t === null ||
      t === Object.prototype ||
      Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function DN() {
  const e = [],
    t = { run: n, use: r };
  return t;
  function n(...i) {
    let l = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    a(null, ...i);
    function a(f, ...d) {
      const p = e[++l];
      let g = -1;
      if (f) {
        s(f);
        return;
      }
      for (; ++g < i.length; )
        (d[g] === null || d[g] === void 0) && (d[g] = i[g]);
      (i = d), p ? NN(p, a)(...d) : s(null, ...d);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e.push(i), t;
  }
}
function NN(e, t) {
  let n;
  return r;
  function r(...s) {
    const a = e.length > s.length;
    let f;
    a && s.push(i);
    try {
      f = e.apply(this, s);
    } catch (d) {
      const p = d;
      if (a && n) throw p;
      return i(p);
    }
    a ||
      (f && f.then && typeof f.then == "function"
        ? f.then(l, i)
        : f instanceof Error
        ? i(f)
        : l(f));
  }
  function i(s, ...a) {
    n || ((n = !0), t(s, ...a));
  }
  function l(s) {
    i(null, s);
  }
}
const LN = Ux().freeze(),
  Hx = {}.hasOwnProperty;
function Ux() {
  const e = DN(),
    t = [];
  let n = {},
    r,
    i = -1;
  return (
    (l.data = s),
    (l.Parser = void 0),
    (l.Compiler = void 0),
    (l.freeze = a),
    (l.attachers = t),
    (l.use = f),
    (l.parse = d),
    (l.stringify = p),
    (l.run = g),
    (l.runSync = v),
    (l.process = m),
    (l.processSync = E),
    l
  );
  function l() {
    const S = Ux();
    let N = -1;
    for (; ++N < t.length; ) S.use(...t[N]);
    return S.data(S3(!0, {}, n)), S;
  }
  function s(S, N) {
    return typeof S == "string"
      ? arguments.length === 2
        ? (ah("data", r), (n[S] = N), l)
        : (Hx.call(n, S) && n[S]) || null
      : S
      ? (ah("data", r), (n = S), l)
      : n;
  }
  function a() {
    if (r) return l;
    for (; ++i < t.length; ) {
      const [S, ...N] = t[i];
      if (N[0] === !1) continue;
      N[0] === !0 && (N[0] = void 0);
      const y = S.call(l, ...N);
      typeof y == "function" && e.use(y);
    }
    return (r = !0), (i = Number.POSITIVE_INFINITY), l;
  }
  function f(S, ...N) {
    let y;
    if ((ah("use", r), S != null))
      if (typeof S == "function") M(S, ...N);
      else if (typeof S == "object") Array.isArray(S) ? I(S) : k(S);
      else throw new TypeError("Expected usable value, not `" + S + "`");
    return y && (n.settings = Object.assign(n.settings || {}, y)), l;
    function x(P) {
      if (typeof P == "function") M(P);
      else if (typeof P == "object")
        if (Array.isArray(P)) {
          const [$, ...B] = P;
          M($, ...B);
        } else k(P);
      else throw new TypeError("Expected usable value, not `" + P + "`");
    }
    function k(P) {
      I(P.plugins), P.settings && (y = Object.assign(y || {}, P.settings));
    }
    function I(P) {
      let $ = -1;
      if (P != null)
        if (Array.isArray(P))
          for (; ++$ < P.length; ) {
            const B = P[$];
            x(B);
          }
        else throw new TypeError("Expected a list of plugins, not `" + P + "`");
    }
    function M(P, $) {
      let B = -1,
        Y;
      for (; ++B < t.length; )
        if (t[B][0] === P) {
          Y = t[B];
          break;
        }
      Y
        ? (_g(Y[1]) && _g($) && ($ = S3(!0, Y[1], $)), (Y[1] = $))
        : t.push([...arguments]);
    }
  }
  function d(S) {
    l.freeze();
    const N = yu(S),
      y = l.Parser;
    return (
      uh("parse", y),
      C3(y, "parse") ? new y(String(N), N).parse() : y(String(N), N)
    );
  }
  function p(S, N) {
    l.freeze();
    const y = yu(N),
      x = l.Compiler;
    return (
      sh("stringify", x),
      E3(S),
      C3(x, "compile") ? new x(S, y).compile() : x(S, y)
    );
  }
  function g(S, N, y) {
    if (
      (E3(S),
      l.freeze(),
      !y && typeof N == "function" && ((y = N), (N = void 0)),
      !y)
    )
      return new Promise(x);
    x(null, y);
    function x(k, I) {
      e.run(S, yu(N), M);
      function M(P, $, B) {
        ($ = $ || S), P ? I(P) : k ? k($) : y(null, $, B);
      }
    }
  }
  function v(S, N) {
    let y, x;
    return l.run(S, N, k), k3("runSync", "run", x), y;
    function k(I, M) {
      h3(I), (y = M), (x = !0);
    }
  }
  function m(S, N) {
    if ((l.freeze(), uh("process", l.Parser), sh("process", l.Compiler), !N))
      return new Promise(y);
    y(null, N);
    function y(x, k) {
      const I = yu(S);
      l.run(l.parse(I), I, (P, $, B) => {
        if (P || !$ || !B) M(P);
        else {
          const Y = l.stringify($, B);
          Y == null || ($N(Y) ? (B.value = Y) : (B.result = Y)), M(P, B);
        }
      });
      function M(P, $) {
        P || !$ ? k(P) : x ? x($) : N(null, $);
      }
    }
  }
  function E(S) {
    let N;
    l.freeze(), uh("processSync", l.Parser), sh("processSync", l.Compiler);
    const y = yu(S);
    return l.process(y, x), k3("processSync", "process", N), y;
    function x(k) {
      (N = !0), h3(k);
    }
  }
}
function C3(e, t) {
  return (
    typeof e == "function" &&
    e.prototype &&
    (MN(e.prototype) || t in e.prototype)
  );
}
function MN(e) {
  let t;
  for (t in e) if (Hx.call(e, t)) return !0;
  return !1;
}
function uh(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Parser`");
}
function sh(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Compiler`");
}
function ah(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function E3(e) {
  if (!_g(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function k3(e, t, n) {
  if (!n)
    throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function yu(e) {
  return FN(e) ? e : new zx(e);
}
function FN(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function $N(e) {
  return typeof e == "string" || $x(e);
}
const zN = {};
function BN(e, t) {
  const n = t || zN,
    r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0,
    i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Wx(e, r, i);
}
function Wx(e, t, n) {
  if (HN(e)) {
    if ("value" in e) return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return b3(e.children, t, n);
  }
  return Array.isArray(e) ? b3(e, t, n) : "";
}
function b3(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) r[i] = Wx(e[i], t, n);
  return r.join("");
}
function HN(e) {
  return !!(e && typeof e == "object");
}
function Rr(e, t, n, r) {
  const i = e.length;
  let l = 0,
    s;
  if (
    (t < 0 ? (t = -t > i ? 0 : i + t) : (t = t > i ? i : t),
    (n = n > 0 ? n : 0),
    r.length < 1e4)
  )
    (s = Array.from(r)), s.unshift(t, n), e.splice(...s);
  else
    for (n && e.splice(t, n); l < r.length; )
      (s = r.slice(l, l + 1e4)),
        s.unshift(t, 0),
        e.splice(...s),
        (l += 1e4),
        (t += 1e4);
}
function Gn(e, t) {
  return e.length > 0 ? (Rr(e, e.length, 0, t), e) : t;
}
const _3 = {}.hasOwnProperty;
function UN(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; ) WN(t, e[n]);
  return t;
}
function WN(e, t) {
  let n;
  for (n in t) {
    const i = (_3.call(e, n) ? e[n] : void 0) || (e[n] = {}),
      l = t[n];
    let s;
    if (l)
      for (s in l) {
        _3.call(i, s) || (i[s] = []);
        const a = l[s];
        jN(i[s], Array.isArray(a) ? a : a ? [a] : []);
      }
  }
}
function jN(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e : r).push(t[n]);
  Rr(e, 0, 0, r);
}
const VN =
    /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,
  br = Gi(/[A-Za-z]/),
  kn = Gi(/[\dA-Za-z]/),
  GN = Gi(/[#-'*+\--9=?A-Z^-~]/);
function Og(e) {
  return e !== null && (e < 32 || e === 127);
}
const Tg = Gi(/\d/),
  qN = Gi(/[\dA-Fa-f]/),
  KN = Gi(/[!-/:-@[-`{-~]/);
function ye(e) {
  return e !== null && e < -2;
}
function an(e) {
  return e !== null && (e < 0 || e === 32);
}
function Me(e) {
  return e === -2 || e === -1 || e === 32;
}
const QN = Gi(VN),
  YN = Gi(/\s/);
function Gi(e) {
  return t;
  function t(n) {
    return n !== null && e.test(String.fromCharCode(n));
  }
}
function Xe(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return s;
  function s(f) {
    return Me(f) ? (e.enter(n), a(f)) : t(f);
  }
  function a(f) {
    return Me(f) && l++ < i ? (e.consume(f), a) : (e.exit(n), t(f));
  }
}
const XN = { tokenize: ZN };
function ZN(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(a),
      e.exit("lineEnding"),
      Xe(e, t, "linePrefix")
    );
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const f = e.enter("chunkText", { contentType: "text", previous: n });
    return n && (n.next = f), (n = f), s(a);
  }
  function s(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return ye(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), s);
  }
}
const JN = { tokenize: eL },
  O3 = { tokenize: tL };
function eL(e) {
  const t = this,
    n = [];
  let r = 0,
    i,
    l,
    s;
  return a;
  function a(k) {
    if (r < n.length) {
      const I = n[r];
      return (t.containerState = I[1]), e.attempt(I[0].continuation, f, d)(k);
    }
    return d(k);
  }
  function f(k) {
    if ((r++, t.containerState._closeFlow)) {
      (t.containerState._closeFlow = void 0), i && x();
      const I = t.events.length;
      let M = I,
        P;
      for (; M--; )
        if (t.events[M][0] === "exit" && t.events[M][1].type === "chunkFlow") {
          P = t.events[M][1].end;
          break;
        }
      y(r);
      let $ = I;
      for (; $ < t.events.length; )
        (t.events[$][1].end = Object.assign({}, P)), $++;
      return (
        Rr(t.events, M + 1, 0, t.events.slice(I)), (t.events.length = $), d(k)
      );
    }
    return a(k);
  }
  function d(k) {
    if (r === n.length) {
      if (!i) return v(k);
      if (i.currentConstruct && i.currentConstruct.concrete) return E(k);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return (t.containerState = {}), e.check(O3, p, g)(k);
  }
  function p(k) {
    return i && x(), y(r), v(k);
  }
  function g(k) {
    return (
      (t.parser.lazy[t.now().line] = r !== n.length), (s = t.now().offset), E(k)
    );
  }
  function v(k) {
    return (t.containerState = {}), e.attempt(O3, m, E)(k);
  }
  function m(k) {
    return r++, n.push([t.currentConstruct, t.containerState]), v(k);
  }
  function E(k) {
    if (k === null) {
      i && x(), y(0), e.consume(k);
      return;
    }
    return (
      (i = i || t.parser.flow(t.now())),
      e.enter("chunkFlow", { contentType: "flow", previous: l, _tokenizer: i }),
      S(k)
    );
  }
  function S(k) {
    if (k === null) {
      N(e.exit("chunkFlow"), !0), y(0), e.consume(k);
      return;
    }
    return ye(k)
      ? (e.consume(k),
        N(e.exit("chunkFlow")),
        (r = 0),
        (t.interrupt = void 0),
        a)
      : (e.consume(k), S);
  }
  function N(k, I) {
    const M = t.sliceStream(k);
    if (
      (I && M.push(null),
      (k.previous = l),
      l && (l.next = k),
      (l = k),
      i.defineSkip(k.start),
      i.write(M),
      t.parser.lazy[k.start.line])
    ) {
      let P = i.events.length;
      for (; P--; )
        if (
          i.events[P][1].start.offset < s &&
          (!i.events[P][1].end || i.events[P][1].end.offset > s)
        )
          return;
      const $ = t.events.length;
      let B = $,
        Y,
        ee;
      for (; B--; )
        if (t.events[B][0] === "exit" && t.events[B][1].type === "chunkFlow") {
          if (Y) {
            ee = t.events[B][1].end;
            break;
          }
          Y = !0;
        }
      for (y(r), P = $; P < t.events.length; )
        (t.events[P][1].end = Object.assign({}, ee)), P++;
      Rr(t.events, B + 1, 0, t.events.slice($)), (t.events.length = P);
    }
  }
  function y(k) {
    let I = n.length;
    for (; I-- > k; ) {
      const M = n[I];
      (t.containerState = M[1]), M[0].exit.call(t, e);
    }
    n.length = k;
  }
  function x() {
    i.write([null]),
      (l = void 0),
      (i = void 0),
      (t.containerState._closeFlow = void 0);
  }
}
function tL(e, t, n) {
  return Xe(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function T3(e) {
  if (e === null || an(e) || YN(e)) return 1;
  if (QN(e)) return 2;
}
function wm(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && ((t = l(t, n)), r.push(l));
  }
  return t;
}
const Ig = { name: "attention", tokenize: rL, resolveAll: nL };
function nL(e, t) {
  let n = -1,
    r,
    i,
    l,
    s,
    a,
    f,
    d,
    p;
  for (; ++n < e.length; )
    if (
      e[n][0] === "enter" &&
      e[n][1].type === "attentionSequence" &&
      e[n][1]._close
    ) {
      for (r = n; r--; )
        if (
          e[r][0] === "exit" &&
          e[r][1].type === "attentionSequence" &&
          e[r][1]._open &&
          t.sliceSerialize(e[r][1]).charCodeAt(0) ===
            t.sliceSerialize(e[n][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[n][1]._open) &&
            (e[n][1].end.offset - e[n][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[n][1].end.offset -
                e[n][1].start.offset) %
              3
            )
          )
            continue;
          f =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[n][1].end.offset - e[n][1].start.offset > 1
              ? 2
              : 1;
          const g = Object.assign({}, e[r][1].end),
            v = Object.assign({}, e[n][1].start);
          I3(g, -f),
            I3(v, f),
            (s = {
              type: f > 1 ? "strongSequence" : "emphasisSequence",
              start: g,
              end: Object.assign({}, e[r][1].end),
            }),
            (a = {
              type: f > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, e[n][1].start),
              end: v,
            }),
            (l = {
              type: f > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, e[r][1].end),
              end: Object.assign({}, e[n][1].start),
            }),
            (i = {
              type: f > 1 ? "strong" : "emphasis",
              start: Object.assign({}, s.start),
              end: Object.assign({}, a.end),
            }),
            (e[r][1].end = Object.assign({}, s.start)),
            (e[n][1].start = Object.assign({}, a.end)),
            (d = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (d = Gn(d, [
                ["enter", e[r][1], t],
                ["exit", e[r][1], t],
              ])),
            (d = Gn(d, [
              ["enter", i, t],
              ["enter", s, t],
              ["exit", s, t],
              ["enter", l, t],
            ])),
            (d = Gn(
              d,
              wm(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)
            )),
            (d = Gn(d, [
              ["exit", l, t],
              ["enter", a, t],
              ["exit", a, t],
              ["exit", i, t],
            ])),
            e[n][1].end.offset - e[n][1].start.offset
              ? ((p = 2),
                (d = Gn(d, [
                  ["enter", e[n][1], t],
                  ["exit", e[n][1], t],
                ])))
              : (p = 0),
            Rr(e, r - 1, n - r + 3, d),
            (n = r + d.length - p - 2);
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function rL(e, t) {
  const n = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = T3(r);
  let l;
  return s;
  function s(f) {
    return (l = f), e.enter("attentionSequence"), a(f);
  }
  function a(f) {
    if (f === l) return e.consume(f), a;
    const d = e.exit("attentionSequence"),
      p = T3(f),
      g = !p || (p === 2 && i) || n.includes(f),
      v = !i || (i === 2 && p) || n.includes(r);
    return (
      (d._open = !!(l === 42 ? g : g && (i || !v))),
      (d._close = !!(l === 42 ? v : v && (p || !g))),
      t(f)
    );
  }
}
function I3(e, t) {
  (e.column += t), (e.offset += t), (e._bufferIndex += t);
}
const iL = { name: "autolink", tokenize: oL };
function oL(e, t, n) {
  let r = 0;
  return i;
  function i(m) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(m),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      l
    );
  }
  function l(m) {
    return br(m) ? (e.consume(m), s) : d(m);
  }
  function s(m) {
    return m === 43 || m === 45 || m === 46 || kn(m) ? ((r = 1), a(m)) : d(m);
  }
  function a(m) {
    return m === 58
      ? (e.consume(m), (r = 0), f)
      : (m === 43 || m === 45 || m === 46 || kn(m)) && r++ < 32
      ? (e.consume(m), a)
      : ((r = 0), d(m));
  }
  function f(m) {
    return m === 62
      ? (e.exit("autolinkProtocol"),
        e.enter("autolinkMarker"),
        e.consume(m),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        t)
      : m === null || m === 32 || m === 60 || Og(m)
      ? n(m)
      : (e.consume(m), f);
  }
  function d(m) {
    return m === 64 ? (e.consume(m), p) : GN(m) ? (e.consume(m), d) : n(m);
  }
  function p(m) {
    return kn(m) ? g(m) : n(m);
  }
  function g(m) {
    return m === 46
      ? (e.consume(m), (r = 0), p)
      : m === 62
      ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
        e.enter("autolinkMarker"),
        e.consume(m),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        t)
      : v(m);
  }
  function v(m) {
    if ((m === 45 || kn(m)) && r++ < 63) {
      const E = m === 45 ? v : g;
      return e.consume(m), E;
    }
    return n(m);
  }
}
const Lf = { tokenize: lL, partial: !0 };
function lL(e, t, n) {
  return r;
  function r(l) {
    return Me(l) ? Xe(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || ye(l) ? t(l) : n(l);
  }
}
const jx = {
  name: "blockQuote",
  tokenize: uL,
  continuation: { tokenize: sL },
  exit: aL,
};
function uL(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === 62) {
      const a = r.containerState;
      return (
        a.open || (e.enter("blockQuote", { _container: !0 }), (a.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(s),
        e.exit("blockQuoteMarker"),
        l
      );
    }
    return n(s);
  }
  function l(s) {
    return Me(s)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(s),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        t)
      : (e.exit("blockQuotePrefix"), t(s));
  }
}
function sL(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return Me(s)
      ? Xe(
          e,
          l,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(s)
      : l(s);
  }
  function l(s) {
    return e.attempt(jx, t, n)(s);
  }
}
function aL(e) {
  e.exit("blockQuote");
}
const Vx = { name: "characterEscape", tokenize: cL };
function cL(e, t, n) {
  return r;
  function r(l) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(l),
      e.exit("escapeMarker"),
      i
    );
  }
  function i(l) {
    return KN(l)
      ? (e.enter("characterEscapeValue"),
        e.consume(l),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        t)
      : n(l);
  }
}
const P3 = document.createElement("i");
function xm(e) {
  const t = "&" + e + ";";
  P3.innerHTML = t;
  const n = P3.textContent;
  return (n.charCodeAt(n.length - 1) === 59 && e !== "semi") || n === t
    ? !1
    : n;
}
const Gx = { name: "characterReference", tokenize: fL };
function fL(e, t, n) {
  const r = this;
  let i = 0,
    l,
    s;
  return a;
  function a(g) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(g),
      e.exit("characterReferenceMarker"),
      f
    );
  }
  function f(g) {
    return g === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(g),
        e.exit("characterReferenceMarkerNumeric"),
        d)
      : (e.enter("characterReferenceValue"), (l = 31), (s = kn), p(g));
  }
  function d(g) {
    return g === 88 || g === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(g),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (l = 6),
        (s = qN),
        p)
      : (e.enter("characterReferenceValue"), (l = 7), (s = Tg), p(g));
  }
  function p(g) {
    if (g === 59 && i) {
      const v = e.exit("characterReferenceValue");
      return s === kn && !xm(r.sliceSerialize(v))
        ? n(g)
        : (e.enter("characterReferenceMarker"),
          e.consume(g),
          e.exit("characterReferenceMarker"),
          e.exit("characterReference"),
          t);
    }
    return s(g) && i++ < l ? (e.consume(g), p) : n(g);
  }
}
const R3 = { tokenize: pL, partial: !0 },
  A3 = { name: "codeFenced", tokenize: dL, concrete: !0 };
function dL(e, t, n) {
  const r = this,
    i = { tokenize: M, partial: !0 };
  let l = 0,
    s = 0,
    a;
  return f;
  function f(P) {
    return d(P);
  }
  function d(P) {
    const $ = r.events[r.events.length - 1];
    return (
      (l =
        $ && $[1].type === "linePrefix"
          ? $[2].sliceSerialize($[1], !0).length
          : 0),
      (a = P),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      p(P)
    );
  }
  function p(P) {
    return P === a
      ? (s++, e.consume(P), p)
      : s < 3
      ? n(P)
      : (e.exit("codeFencedFenceSequence"),
        Me(P) ? Xe(e, g, "whitespace")(P) : g(P));
  }
  function g(P) {
    return P === null || ye(P)
      ? (e.exit("codeFencedFence"), r.interrupt ? t(P) : e.check(R3, S, I)(P))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        v(P));
  }
  function v(P) {
    return P === null || ye(P)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), g(P))
      : Me(P)
      ? (e.exit("chunkString"),
        e.exit("codeFencedFenceInfo"),
        Xe(e, m, "whitespace")(P))
      : P === 96 && P === a
      ? n(P)
      : (e.consume(P), v);
  }
  function m(P) {
    return P === null || ye(P)
      ? g(P)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        E(P));
  }
  function E(P) {
    return P === null || ye(P)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), g(P))
      : P === 96 && P === a
      ? n(P)
      : (e.consume(P), E);
  }
  function S(P) {
    return e.attempt(i, I, N)(P);
  }
  function N(P) {
    return e.enter("lineEnding"), e.consume(P), e.exit("lineEnding"), y;
  }
  function y(P) {
    return l > 0 && Me(P) ? Xe(e, x, "linePrefix", l + 1)(P) : x(P);
  }
  function x(P) {
    return P === null || ye(P)
      ? e.check(R3, S, I)(P)
      : (e.enter("codeFlowValue"), k(P));
  }
  function k(P) {
    return P === null || ye(P)
      ? (e.exit("codeFlowValue"), x(P))
      : (e.consume(P), k);
  }
  function I(P) {
    return e.exit("codeFenced"), t(P);
  }
  function M(P, $, B) {
    let Y = 0;
    return ee;
    function ee(ce) {
      return P.enter("lineEnding"), P.consume(ce), P.exit("lineEnding"), G;
    }
    function G(ce) {
      return (
        P.enter("codeFencedFence"),
        Me(ce)
          ? Xe(
              P,
              Z,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4
            )(ce)
          : Z(ce)
      );
    }
    function Z(ce) {
      return ce === a ? (P.enter("codeFencedFenceSequence"), re(ce)) : B(ce);
    }
    function re(ce) {
      return ce === a
        ? (Y++, P.consume(ce), re)
        : Y >= s
        ? (P.exit("codeFencedFenceSequence"),
          Me(ce) ? Xe(P, ae, "whitespace")(ce) : ae(ce))
        : B(ce);
    }
    function ae(ce) {
      return ce === null || ye(ce) ? (P.exit("codeFencedFence"), $(ce)) : B(ce);
    }
  }
}
function pL(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return s === null
      ? n(s)
      : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), l);
  }
  function l(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
const ch = { name: "codeIndented", tokenize: gL },
  hL = { tokenize: mL, partial: !0 };
function gL(e, t, n) {
  const r = this;
  return i;
  function i(d) {
    return e.enter("codeIndented"), Xe(e, l, "linePrefix", 4 + 1)(d);
  }
  function l(d) {
    const p = r.events[r.events.length - 1];
    return p &&
      p[1].type === "linePrefix" &&
      p[2].sliceSerialize(p[1], !0).length >= 4
      ? s(d)
      : n(d);
  }
  function s(d) {
    return d === null
      ? f(d)
      : ye(d)
      ? e.attempt(hL, s, f)(d)
      : (e.enter("codeFlowValue"), a(d));
  }
  function a(d) {
    return d === null || ye(d)
      ? (e.exit("codeFlowValue"), s(d))
      : (e.consume(d), a);
  }
  function f(d) {
    return e.exit("codeIndented"), t(d);
  }
}
function mL(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line]
      ? n(s)
      : ye(s)
      ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i)
      : Xe(e, l, "linePrefix", 4 + 1)(s);
  }
  function l(s) {
    const a = r.events[r.events.length - 1];
    return a &&
      a[1].type === "linePrefix" &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : ye(s)
      ? i(s)
      : n(s);
  }
}
const vL = { name: "codeText", tokenize: xL, resolve: yL, previous: wL };
function yL(e) {
  let t = e.length - 4,
    n = 3,
    r,
    i;
  if (
    (e[n][1].type === "lineEnding" || e[n][1].type === "space") &&
    (e[t][1].type === "lineEnding" || e[t][1].type === "space")
  ) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        (e[n][1].type = "codeTextPadding"),
          (e[t][1].type = "codeTextPadding"),
          (n += 2),
          (t -= 2);
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0
      ? r !== t && e[r][1].type !== "lineEnding" && (i = r)
      : (r === t || e[r][1].type === "lineEnding") &&
        ((e[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (t -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function wL(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function xL(e, t, n) {
  let r = 0,
    i,
    l;
  return s;
  function s(g) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(g);
  }
  function a(g) {
    return g === 96
      ? (e.consume(g), r++, a)
      : (e.exit("codeTextSequence"), f(g));
  }
  function f(g) {
    return g === null
      ? n(g)
      : g === 32
      ? (e.enter("space"), e.consume(g), e.exit("space"), f)
      : g === 96
      ? ((l = e.enter("codeTextSequence")), (i = 0), p(g))
      : ye(g)
      ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), f)
      : (e.enter("codeTextData"), d(g));
  }
  function d(g) {
    return g === null || g === 32 || g === 96 || ye(g)
      ? (e.exit("codeTextData"), f(g))
      : (e.consume(g), d);
  }
  function p(g) {
    return g === 96
      ? (e.consume(g), i++, p)
      : i === r
      ? (e.exit("codeTextSequence"), e.exit("codeText"), t(g))
      : ((l.type = "codeTextData"), d(g));
  }
}
function qx(e) {
  const t = {};
  let n = -1,
    r,
    i,
    l,
    s,
    a,
    f,
    d;
  for (; ++n < e.length; ) {
    for (; n in t; ) n = t[n];
    if (
      ((r = e[n]),
      n &&
        r[1].type === "chunkFlow" &&
        e[n - 1][1].type === "listItemPrefix" &&
        ((f = r[1]._tokenizer.events),
        (l = 0),
        l < f.length && f[l][1].type === "lineEndingBlank" && (l += 2),
        l < f.length && f[l][1].type === "content"))
    )
      for (; ++l < f.length && f[l][1].type !== "content"; )
        f[l][1].type === "chunkText" &&
          ((f[l][1]._isInFirstContentOfListItem = !0), l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, SL(e, n)), (n = t[n]), (d = !0));
    else if (r[1]._container) {
      for (
        l = n, i = void 0;
        l-- &&
        ((s = e[l]),
        s[1].type === "lineEnding" || s[1].type === "lineEndingBlank");

      )
        s[0] === "enter" &&
          (i && (e[i][1].type = "lineEndingBlank"),
          (s[1].type = "lineEnding"),
          (i = l));
      i &&
        ((r[1].end = Object.assign({}, e[i][1].start)),
        (a = e.slice(i, n)),
        a.unshift(r),
        Rr(e, i, n - i + 1, a));
    }
  }
  return !d;
}
function SL(e, t) {
  const n = e[t][1],
    r = e[t][2];
  let i = t - 1;
  const l = [],
    s = n._tokenizer || r.parser[n.contentType](n.start),
    a = s.events,
    f = [],
    d = {};
  let p,
    g,
    v = -1,
    m = n,
    E = 0,
    S = 0;
  const N = [S];
  for (; m; ) {
    for (; e[++i][1] !== m; );
    l.push(i),
      m._tokenizer ||
        ((p = r.sliceStream(m)),
        m.next || p.push(null),
        g && s.defineSkip(m.start),
        m._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = !0),
        s.write(p),
        m._isInFirstContentOfListItem &&
          (s._gfmTasklistFirstContentOfListItem = void 0)),
      (g = m),
      (m = m.next);
  }
  for (m = n; ++v < a.length; )
    a[v][0] === "exit" &&
      a[v - 1][0] === "enter" &&
      a[v][1].type === a[v - 1][1].type &&
      a[v][1].start.line !== a[v][1].end.line &&
      ((S = v + 1),
      N.push(S),
      (m._tokenizer = void 0),
      (m.previous = void 0),
      (m = m.next));
  for (
    s.events = [],
      m ? ((m._tokenizer = void 0), (m.previous = void 0)) : N.pop(),
      v = N.length;
    v--;

  ) {
    const y = a.slice(N[v], N[v + 1]),
      x = l.pop();
    f.unshift([x, x + y.length - 1]), Rr(e, x, 2, y);
  }
  for (v = -1; ++v < f.length; )
    (d[E + f[v][0]] = E + f[v][1]), (E += f[v][1] - f[v][0] - 1);
  return d;
}
const CL = { tokenize: bL, resolve: kL },
  EL = { tokenize: _L, partial: !0 };
function kL(e) {
  return qx(e), e;
}
function bL(e, t) {
  let n;
  return r;
  function r(a) {
    return (
      e.enter("content"),
      (n = e.enter("chunkContent", { contentType: "content" })),
      i(a)
    );
  }
  function i(a) {
    return a === null ? l(a) : ye(a) ? e.check(EL, s, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function s(a) {
    return (
      e.consume(a),
      e.exit("chunkContent"),
      (n.next = e.enter("chunkContent", {
        contentType: "content",
        previous: n,
      })),
      (n = n.next),
      i
    );
  }
}
function _L(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(s),
      e.exit("lineEnding"),
      Xe(e, l, "linePrefix")
    );
  }
  function l(s) {
    if (s === null || ye(s)) return n(s);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      a &&
      a[1].type === "linePrefix" &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? t(s)
      : e.interrupt(r.parser.constructs.flow, n, t)(s);
  }
}
function Kx(e, t, n, r, i, l, s, a, f) {
  const d = f || Number.POSITIVE_INFINITY;
  let p = 0;
  return g;
  function g(y) {
    return y === 60
      ? (e.enter(r), e.enter(i), e.enter(l), e.consume(y), e.exit(l), v)
      : y === null || y === 32 || y === 41 || Og(y)
      ? n(y)
      : (e.enter(r),
        e.enter(s),
        e.enter(a),
        e.enter("chunkString", { contentType: "string" }),
        S(y));
  }
  function v(y) {
    return y === 62
      ? (e.enter(l), e.consume(y), e.exit(l), e.exit(i), e.exit(r), t)
      : (e.enter(a), e.enter("chunkString", { contentType: "string" }), m(y));
  }
  function m(y) {
    return y === 62
      ? (e.exit("chunkString"), e.exit(a), v(y))
      : y === null || y === 60 || ye(y)
      ? n(y)
      : (e.consume(y), y === 92 ? E : m);
  }
  function E(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), m) : m(y);
  }
  function S(y) {
    return !p && (y === null || y === 41 || an(y))
      ? (e.exit("chunkString"), e.exit(a), e.exit(s), e.exit(r), t(y))
      : p < d && y === 40
      ? (e.consume(y), p++, S)
      : y === 41
      ? (e.consume(y), p--, S)
      : y === null || y === 32 || y === 40 || Og(y)
      ? n(y)
      : (e.consume(y), y === 92 ? N : S);
  }
  function N(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), S) : S(y);
  }
}
function Qx(e, t, n, r, i, l) {
  const s = this;
  let a = 0,
    f;
  return d;
  function d(m) {
    return e.enter(r), e.enter(i), e.consume(m), e.exit(i), e.enter(l), p;
  }
  function p(m) {
    return a > 999 ||
      m === null ||
      m === 91 ||
      (m === 93 && !f) ||
      (m === 94 && !a && "_hiddenFootnoteSupport" in s.parser.constructs)
      ? n(m)
      : m === 93
      ? (e.exit(l), e.enter(i), e.consume(m), e.exit(i), e.exit(r), t)
      : ye(m)
      ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), p)
      : (e.enter("chunkString", { contentType: "string" }), g(m));
  }
  function g(m) {
    return m === null || m === 91 || m === 93 || ye(m) || a++ > 999
      ? (e.exit("chunkString"), p(m))
      : (e.consume(m), f || (f = !Me(m)), m === 92 ? v : g);
  }
  function v(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), a++, g) : g(m);
  }
}
function Yx(e, t, n, r, i, l) {
  let s;
  return a;
  function a(v) {
    return v === 34 || v === 39 || v === 40
      ? (e.enter(r),
        e.enter(i),
        e.consume(v),
        e.exit(i),
        (s = v === 40 ? 41 : v),
        f)
      : n(v);
  }
  function f(v) {
    return v === s
      ? (e.enter(i), e.consume(v), e.exit(i), e.exit(r), t)
      : (e.enter(l), d(v));
  }
  function d(v) {
    return v === s
      ? (e.exit(l), f(s))
      : v === null
      ? n(v)
      : ye(v)
      ? (e.enter("lineEnding"),
        e.consume(v),
        e.exit("lineEnding"),
        Xe(e, d, "linePrefix"))
      : (e.enter("chunkString", { contentType: "string" }), p(v));
  }
  function p(v) {
    return v === s || v === null || ye(v)
      ? (e.exit("chunkString"), d(v))
      : (e.consume(v), v === 92 ? g : p);
  }
  function g(v) {
    return v === s || v === 92 ? (e.consume(v), p) : p(v);
  }
}
function Uu(e, t) {
  let n;
  return r;
  function r(i) {
    return ye(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (n = !0), r)
      : Me(i)
      ? Xe(e, r, n ? "linePrefix" : "lineSuffix")(i)
      : t(i);
  }
}
function kl(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const OL = { name: "definition", tokenize: IL },
  TL = { tokenize: PL, partial: !0 };
function IL(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(m) {
    return e.enter("definition"), s(m);
  }
  function s(m) {
    return Qx.call(
      r,
      e,
      a,
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(m);
  }
  function a(m) {
    return (
      (i = kl(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      m === 58
        ? (e.enter("definitionMarker"),
          e.consume(m),
          e.exit("definitionMarker"),
          f)
        : n(m)
    );
  }
  function f(m) {
    return an(m) ? Uu(e, d)(m) : d(m);
  }
  function d(m) {
    return Kx(
      e,
      p,
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(m);
  }
  function p(m) {
    return e.attempt(TL, g, g)(m);
  }
  function g(m) {
    return Me(m) ? Xe(e, v, "whitespace")(m) : v(m);
  }
  function v(m) {
    return m === null || ye(m)
      ? (e.exit("definition"), r.parser.defined.push(i), t(m))
      : n(m);
  }
}
function PL(e, t, n) {
  return r;
  function r(a) {
    return an(a) ? Uu(e, i)(a) : n(a);
  }
  function i(a) {
    return Yx(
      e,
      l,
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(a);
  }
  function l(a) {
    return Me(a) ? Xe(e, s, "whitespace")(a) : s(a);
  }
  function s(a) {
    return a === null || ye(a) ? t(a) : n(a);
  }
}
const RL = { name: "hardBreakEscape", tokenize: AL };
function AL(e, t, n) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return ye(l) ? (e.exit("hardBreakEscape"), t(l)) : n(l);
  }
}
const DL = { name: "headingAtx", tokenize: LL, resolve: NL };
function NL(e, t) {
  let n = e.length - 2,
    r = 3,
    i,
    l;
  return (
    e[r][1].type === "whitespace" && (r += 2),
    n - 2 > r && e[n][1].type === "whitespace" && (n -= 2),
    e[n][1].type === "atxHeadingSequence" &&
      (r === n - 1 || (n - 4 > r && e[n - 2][1].type === "whitespace")) &&
      (n -= r + 1 === n ? 2 : 4),
    n > r &&
      ((i = { type: "atxHeadingText", start: e[r][1].start, end: e[n][1].end }),
      (l = {
        type: "chunkText",
        start: e[r][1].start,
        end: e[n][1].end,
        contentType: "text",
      }),
      Rr(e, r, n - r + 1, [
        ["enter", i, t],
        ["enter", l, t],
        ["exit", l, t],
        ["exit", i, t],
      ])),
    e
  );
}
function LL(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("atxHeading"), l(p);
  }
  function l(p) {
    return e.enter("atxHeadingSequence"), s(p);
  }
  function s(p) {
    return p === 35 && r++ < 6
      ? (e.consume(p), s)
      : p === null || an(p)
      ? (e.exit("atxHeadingSequence"), a(p))
      : n(p);
  }
  function a(p) {
    return p === 35
      ? (e.enter("atxHeadingSequence"), f(p))
      : p === null || ye(p)
      ? (e.exit("atxHeading"), t(p))
      : Me(p)
      ? Xe(e, a, "whitespace")(p)
      : (e.enter("atxHeadingText"), d(p));
  }
  function f(p) {
    return p === 35 ? (e.consume(p), f) : (e.exit("atxHeadingSequence"), a(p));
  }
  function d(p) {
    return p === null || p === 35 || an(p)
      ? (e.exit("atxHeadingText"), a(p))
      : (e.consume(p), d);
  }
}
const ML = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  D3 = ["pre", "script", "style", "textarea"],
  FL = { name: "htmlFlow", tokenize: HL, resolveTo: BL, concrete: !0 },
  $L = { tokenize: WL, partial: !0 },
  zL = { tokenize: UL, partial: !0 };
function BL(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); );
  return (
    t > 1 &&
      e[t - 2][1].type === "linePrefix" &&
      ((e[t][1].start = e[t - 2][1].start),
      (e[t + 1][1].start = e[t - 2][1].start),
      e.splice(t - 2, 2)),
    e
  );
}
function HL(e, t, n) {
  const r = this;
  let i, l, s, a, f;
  return d;
  function d(O) {
    return p(O);
  }
  function p(O) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(O), g;
  }
  function g(O) {
    return O === 33
      ? (e.consume(O), v)
      : O === 47
      ? (e.consume(O), (l = !0), S)
      : O === 63
      ? (e.consume(O), (i = 3), r.interrupt ? t : _)
      : br(O)
      ? (e.consume(O), (s = String.fromCharCode(O)), N)
      : n(O);
  }
  function v(O) {
    return O === 45
      ? (e.consume(O), (i = 2), m)
      : O === 91
      ? (e.consume(O), (i = 5), (a = 0), E)
      : br(O)
      ? (e.consume(O), (i = 4), r.interrupt ? t : _)
      : n(O);
  }
  function m(O) {
    return O === 45 ? (e.consume(O), r.interrupt ? t : _) : n(O);
  }
  function E(O) {
    const ve = "CDATA[";
    return O === ve.charCodeAt(a++)
      ? (e.consume(O), a === ve.length ? (r.interrupt ? t : Z) : E)
      : n(O);
  }
  function S(O) {
    return br(O) ? (e.consume(O), (s = String.fromCharCode(O)), N) : n(O);
  }
  function N(O) {
    if (O === null || O === 47 || O === 62 || an(O)) {
      const ve = O === 47,
        Fe = s.toLowerCase();
      return !ve && !l && D3.includes(Fe)
        ? ((i = 1), r.interrupt ? t(O) : Z(O))
        : ML.includes(s.toLowerCase())
        ? ((i = 6), ve ? (e.consume(O), y) : r.interrupt ? t(O) : Z(O))
        : ((i = 7),
          r.interrupt && !r.parser.lazy[r.now().line] ? n(O) : l ? x(O) : k(O));
    }
    return O === 45 || kn(O)
      ? (e.consume(O), (s += String.fromCharCode(O)), N)
      : n(O);
  }
  function y(O) {
    return O === 62 ? (e.consume(O), r.interrupt ? t : Z) : n(O);
  }
  function x(O) {
    return Me(O) ? (e.consume(O), x) : ee(O);
  }
  function k(O) {
    return O === 47
      ? (e.consume(O), ee)
      : O === 58 || O === 95 || br(O)
      ? (e.consume(O), I)
      : Me(O)
      ? (e.consume(O), k)
      : ee(O);
  }
  function I(O) {
    return O === 45 || O === 46 || O === 58 || O === 95 || kn(O)
      ? (e.consume(O), I)
      : M(O);
  }
  function M(O) {
    return O === 61 ? (e.consume(O), P) : Me(O) ? (e.consume(O), M) : k(O);
  }
  function P(O) {
    return O === null || O === 60 || O === 61 || O === 62 || O === 96
      ? n(O)
      : O === 34 || O === 39
      ? (e.consume(O), (f = O), $)
      : Me(O)
      ? (e.consume(O), P)
      : B(O);
  }
  function $(O) {
    return O === f
      ? (e.consume(O), (f = null), Y)
      : O === null || ye(O)
      ? n(O)
      : (e.consume(O), $);
  }
  function B(O) {
    return O === null ||
      O === 34 ||
      O === 39 ||
      O === 47 ||
      O === 60 ||
      O === 61 ||
      O === 62 ||
      O === 96 ||
      an(O)
      ? M(O)
      : (e.consume(O), B);
  }
  function Y(O) {
    return O === 47 || O === 62 || Me(O) ? k(O) : n(O);
  }
  function ee(O) {
    return O === 62 ? (e.consume(O), G) : n(O);
  }
  function G(O) {
    return O === null || ye(O) ? Z(O) : Me(O) ? (e.consume(O), G) : n(O);
  }
  function Z(O) {
    return O === 45 && i === 2
      ? (e.consume(O), ge)
      : O === 60 && i === 1
      ? (e.consume(O), me)
      : O === 62 && i === 4
      ? (e.consume(O), ne)
      : O === 63 && i === 3
      ? (e.consume(O), _)
      : O === 93 && i === 5
      ? (e.consume(O), te)
      : ye(O) && (i === 6 || i === 7)
      ? (e.exit("htmlFlowData"), e.check($L, se, re)(O))
      : O === null || ye(O)
      ? (e.exit("htmlFlowData"), re(O))
      : (e.consume(O), Z);
  }
  function re(O) {
    return e.check(zL, ae, se)(O);
  }
  function ae(O) {
    return e.enter("lineEnding"), e.consume(O), e.exit("lineEnding"), ce;
  }
  function ce(O) {
    return O === null || ye(O) ? re(O) : (e.enter("htmlFlowData"), Z(O));
  }
  function ge(O) {
    return O === 45 ? (e.consume(O), _) : Z(O);
  }
  function me(O) {
    return O === 47 ? (e.consume(O), (s = ""), W) : Z(O);
  }
  function W(O) {
    if (O === 62) {
      const ve = s.toLowerCase();
      return D3.includes(ve) ? (e.consume(O), ne) : Z(O);
    }
    return br(O) && s.length < 8
      ? (e.consume(O), (s += String.fromCharCode(O)), W)
      : Z(O);
  }
  function te(O) {
    return O === 93 ? (e.consume(O), _) : Z(O);
  }
  function _(O) {
    return O === 62
      ? (e.consume(O), ne)
      : O === 45 && i === 2
      ? (e.consume(O), _)
      : Z(O);
  }
  function ne(O) {
    return O === null || ye(O)
      ? (e.exit("htmlFlowData"), se(O))
      : (e.consume(O), ne);
  }
  function se(O) {
    return e.exit("htmlFlow"), t(O);
  }
}
function UL(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return ye(s)
      ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), l)
      : n(s);
  }
  function l(s) {
    return r.parser.lazy[r.now().line] ? n(s) : t(s);
  }
}
function WL(e, t, n) {
  return r;
  function r(i) {
    return (
      e.enter("lineEnding"),
      e.consume(i),
      e.exit("lineEnding"),
      e.attempt(Lf, t, n)
    );
  }
}
const jL = { name: "htmlText", tokenize: VL };
function VL(e, t, n) {
  const r = this;
  let i, l, s;
  return a;
  function a(_) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(_), f;
  }
  function f(_) {
    return _ === 33
      ? (e.consume(_), d)
      : _ === 47
      ? (e.consume(_), M)
      : _ === 63
      ? (e.consume(_), k)
      : br(_)
      ? (e.consume(_), B)
      : n(_);
  }
  function d(_) {
    return _ === 45
      ? (e.consume(_), p)
      : _ === 91
      ? (e.consume(_), (l = 0), E)
      : br(_)
      ? (e.consume(_), x)
      : n(_);
  }
  function p(_) {
    return _ === 45 ? (e.consume(_), m) : n(_);
  }
  function g(_) {
    return _ === null
      ? n(_)
      : _ === 45
      ? (e.consume(_), v)
      : ye(_)
      ? ((s = g), me(_))
      : (e.consume(_), g);
  }
  function v(_) {
    return _ === 45 ? (e.consume(_), m) : g(_);
  }
  function m(_) {
    return _ === 62 ? ge(_) : _ === 45 ? v(_) : g(_);
  }
  function E(_) {
    const ne = "CDATA[";
    return _ === ne.charCodeAt(l++)
      ? (e.consume(_), l === ne.length ? S : E)
      : n(_);
  }
  function S(_) {
    return _ === null
      ? n(_)
      : _ === 93
      ? (e.consume(_), N)
      : ye(_)
      ? ((s = S), me(_))
      : (e.consume(_), S);
  }
  function N(_) {
    return _ === 93 ? (e.consume(_), y) : S(_);
  }
  function y(_) {
    return _ === 62 ? ge(_) : _ === 93 ? (e.consume(_), y) : S(_);
  }
  function x(_) {
    return _ === null || _ === 62
      ? ge(_)
      : ye(_)
      ? ((s = x), me(_))
      : (e.consume(_), x);
  }
  function k(_) {
    return _ === null
      ? n(_)
      : _ === 63
      ? (e.consume(_), I)
      : ye(_)
      ? ((s = k), me(_))
      : (e.consume(_), k);
  }
  function I(_) {
    return _ === 62 ? ge(_) : k(_);
  }
  function M(_) {
    return br(_) ? (e.consume(_), P) : n(_);
  }
  function P(_) {
    return _ === 45 || kn(_) ? (e.consume(_), P) : $(_);
  }
  function $(_) {
    return ye(_) ? ((s = $), me(_)) : Me(_) ? (e.consume(_), $) : ge(_);
  }
  function B(_) {
    return _ === 45 || kn(_)
      ? (e.consume(_), B)
      : _ === 47 || _ === 62 || an(_)
      ? Y(_)
      : n(_);
  }
  function Y(_) {
    return _ === 47
      ? (e.consume(_), ge)
      : _ === 58 || _ === 95 || br(_)
      ? (e.consume(_), ee)
      : ye(_)
      ? ((s = Y), me(_))
      : Me(_)
      ? (e.consume(_), Y)
      : ge(_);
  }
  function ee(_) {
    return _ === 45 || _ === 46 || _ === 58 || _ === 95 || kn(_)
      ? (e.consume(_), ee)
      : G(_);
  }
  function G(_) {
    return _ === 61
      ? (e.consume(_), Z)
      : ye(_)
      ? ((s = G), me(_))
      : Me(_)
      ? (e.consume(_), G)
      : Y(_);
  }
  function Z(_) {
    return _ === null || _ === 60 || _ === 61 || _ === 62 || _ === 96
      ? n(_)
      : _ === 34 || _ === 39
      ? (e.consume(_), (i = _), re)
      : ye(_)
      ? ((s = Z), me(_))
      : Me(_)
      ? (e.consume(_), Z)
      : (e.consume(_), ae);
  }
  function re(_) {
    return _ === i
      ? (e.consume(_), (i = void 0), ce)
      : _ === null
      ? n(_)
      : ye(_)
      ? ((s = re), me(_))
      : (e.consume(_), re);
  }
  function ae(_) {
    return _ === null ||
      _ === 34 ||
      _ === 39 ||
      _ === 60 ||
      _ === 61 ||
      _ === 96
      ? n(_)
      : _ === 47 || _ === 62 || an(_)
      ? Y(_)
      : (e.consume(_), ae);
  }
  function ce(_) {
    return _ === 47 || _ === 62 || an(_) ? Y(_) : n(_);
  }
  function ge(_) {
    return _ === 62
      ? (e.consume(_), e.exit("htmlTextData"), e.exit("htmlText"), t)
      : n(_);
  }
  function me(_) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(_),
      e.exit("lineEnding"),
      W
    );
  }
  function W(_) {
    return Me(_)
      ? Xe(
          e,
          te,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(_)
      : te(_);
  }
  function te(_) {
    return e.enter("htmlTextData"), s(_);
  }
}
const Sm = { name: "labelEnd", tokenize: XL, resolveTo: YL, resolveAll: QL },
  GL = { tokenize: ZL },
  qL = { tokenize: JL },
  KL = { tokenize: eM };
function QL(e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const n = e[t][1];
    (n.type === "labelImage" ||
      n.type === "labelLink" ||
      n.type === "labelEnd") &&
      (e.splice(t + 1, n.type === "labelImage" ? 4 : 2),
      (n.type = "data"),
      t++);
  }
  return e;
}
function YL(e, t) {
  let n = e.length,
    r = 0,
    i,
    l,
    s,
    a;
  for (; n--; )
    if (((i = e[n][1]), l)) {
      if (i.type === "link" || (i.type === "labelLink" && i._inactive)) break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (s) {
      if (
        e[n][0] === "enter" &&
        (i.type === "labelImage" || i.type === "labelLink") &&
        !i._balanced &&
        ((l = n), i.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (s = n);
  const f = {
      type: e[l][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, e[l][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    d = {
      type: "label",
      start: Object.assign({}, e[l][1].start),
      end: Object.assign({}, e[s][1].end),
    },
    p = {
      type: "labelText",
      start: Object.assign({}, e[l + r + 2][1].end),
      end: Object.assign({}, e[s - 2][1].start),
    };
  return (
    (a = [
      ["enter", f, t],
      ["enter", d, t],
    ]),
    (a = Gn(a, e.slice(l + 1, l + r + 3))),
    (a = Gn(a, [["enter", p, t]])),
    (a = Gn(
      a,
      wm(t.parser.constructs.insideSpan.null, e.slice(l + r + 4, s - 3), t)
    )),
    (a = Gn(a, [["exit", p, t], e[s - 2], e[s - 1], ["exit", d, t]])),
    (a = Gn(a, e.slice(s + 1))),
    (a = Gn(a, [["exit", f, t]])),
    Rr(e, l, e.length, a),
    e
  );
}
function XL(e, t, n) {
  const r = this;
  let i = r.events.length,
    l,
    s;
  for (; i--; )
    if (
      (r.events[i][1].type === "labelImage" ||
        r.events[i][1].type === "labelLink") &&
      !r.events[i][1]._balanced
    ) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(v) {
    return l
      ? l._inactive
        ? g(v)
        : ((s = r.parser.defined.includes(
            kl(r.sliceSerialize({ start: l.end, end: r.now() }))
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(v),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          f)
      : n(v);
  }
  function f(v) {
    return v === 40
      ? e.attempt(GL, p, s ? p : g)(v)
      : v === 91
      ? e.attempt(qL, p, s ? d : g)(v)
      : s
      ? p(v)
      : g(v);
  }
  function d(v) {
    return e.attempt(KL, p, g)(v);
  }
  function p(v) {
    return t(v);
  }
  function g(v) {
    return (l._balanced = !0), n(v);
  }
}
function ZL(e, t, n) {
  return r;
  function r(g) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(g),
      e.exit("resourceMarker"),
      i
    );
  }
  function i(g) {
    return an(g) ? Uu(e, l)(g) : l(g);
  }
  function l(g) {
    return g === 41
      ? p(g)
      : Kx(
          e,
          s,
          a,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32
        )(g);
  }
  function s(g) {
    return an(g) ? Uu(e, f)(g) : p(g);
  }
  function a(g) {
    return n(g);
  }
  function f(g) {
    return g === 34 || g === 39 || g === 40
      ? Yx(
          e,
          d,
          n,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString"
        )(g)
      : p(g);
  }
  function d(g) {
    return an(g) ? Uu(e, p)(g) : p(g);
  }
  function p(g) {
    return g === 41
      ? (e.enter("resourceMarker"),
        e.consume(g),
        e.exit("resourceMarker"),
        e.exit("resource"),
        t)
      : n(g);
  }
}
function JL(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Qx.call(
      r,
      e,
      l,
      s,
      "reference",
      "referenceMarker",
      "referenceString"
    )(a);
  }
  function l(a) {
    return r.parser.defined.includes(
      kl(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? t(a)
      : n(a);
  }
  function s(a) {
    return n(a);
  }
}
function eM(e, t, n) {
  return r;
  function r(l) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(l),
      e.exit("referenceMarker"),
      i
    );
  }
  function i(l) {
    return l === 93
      ? (e.enter("referenceMarker"),
        e.consume(l),
        e.exit("referenceMarker"),
        e.exit("reference"),
        t)
      : n(l);
  }
}
const tM = { name: "labelStartImage", tokenize: nM, resolveAll: Sm.resolveAll };
function nM(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(a),
      e.exit("labelImageMarker"),
      l
    );
  }
  function l(a) {
    return a === 91
      ? (e.enter("labelMarker"),
        e.consume(a),
        e.exit("labelMarker"),
        e.exit("labelImage"),
        s)
      : n(a);
  }
  function s(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(a)
      : t(a);
  }
}
const rM = { name: "labelStartLink", tokenize: iM, resolveAll: Sm.resolveAll };
function iM(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(s),
      e.exit("labelMarker"),
      e.exit("labelLink"),
      l
    );
  }
  function l(s) {
    return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? n(s)
      : t(s);
  }
}
const fh = { name: "lineEnding", tokenize: oM };
function oM(e, t) {
  return n;
  function n(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      Xe(e, t, "linePrefix")
    );
  }
}
const Xa = { name: "thematicBreak", tokenize: lM };
function lM(e, t, n) {
  let r = 0,
    i;
  return l;
  function l(d) {
    return e.enter("thematicBreak"), s(d);
  }
  function s(d) {
    return (i = d), a(d);
  }
  function a(d) {
    return d === i
      ? (e.enter("thematicBreakSequence"), f(d))
      : r >= 3 && (d === null || ye(d))
      ? (e.exit("thematicBreak"), t(d))
      : n(d);
  }
  function f(d) {
    return d === i
      ? (e.consume(d), r++, f)
      : (e.exit("thematicBreakSequence"),
        Me(d) ? Xe(e, a, "whitespace")(d) : a(d));
  }
}
const tn = {
    name: "list",
    tokenize: aM,
    continuation: { tokenize: cM },
    exit: dM,
  },
  uM = { tokenize: pM, partial: !0 },
  sM = { tokenize: fM, partial: !0 };
function aM(e, t, n) {
  const r = this,
    i = r.events[r.events.length - 1];
  let l =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    s = 0;
  return a;
  function a(m) {
    const E =
      r.containerState.type ||
      (m === 42 || m === 43 || m === 45 ? "listUnordered" : "listOrdered");
    if (
      E === "listUnordered"
        ? !r.containerState.marker || m === r.containerState.marker
        : Tg(m)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = E), e.enter(E, { _container: !0 })),
        E === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          m === 42 || m === 45 ? e.check(Xa, n, d)(m) : d(m)
        );
      if (!r.interrupt || m === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), f(m);
    }
    return n(m);
  }
  function f(m) {
    return Tg(m) && ++s < 10
      ? (e.consume(m), f)
      : (!r.interrupt || s < 2) &&
        (r.containerState.marker
          ? m === r.containerState.marker
          : m === 41 || m === 46)
      ? (e.exit("listItemValue"), d(m))
      : n(m);
  }
  function d(m) {
    return (
      e.enter("listItemMarker"),
      e.consume(m),
      e.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || m),
      e.check(Lf, r.interrupt ? n : p, e.attempt(uM, v, g))
    );
  }
  function p(m) {
    return (r.containerState.initialBlankLine = !0), l++, v(m);
  }
  function g(m) {
    return Me(m)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(m),
        e.exit("listItemPrefixWhitespace"),
        v)
      : n(m);
  }
  function v(m) {
    return (
      (r.containerState.size =
        l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      t(m)
    );
  }
}
function cM(e, t, n) {
  const r = this;
  return (r.containerState._closeFlow = void 0), e.check(Lf, i, l);
  function i(a) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      Xe(e, t, "listItemIndent", r.containerState.size + 1)(a)
    );
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !Me(a)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        s(a))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(sM, t, s)(a));
  }
  function s(a) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      Xe(
        e,
        e.attempt(tn, t, n),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(a)
    );
  }
}
function fM(e, t, n) {
  const r = this;
  return Xe(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const s = r.events[r.events.length - 1];
    return s &&
      s[1].type === "listItemIndent" &&
      s[2].sliceSerialize(s[1], !0).length === r.containerState.size
      ? t(l)
      : n(l);
  }
}
function dM(e) {
  e.exit(this.containerState.type);
}
function pM(e, t, n) {
  const r = this;
  return Xe(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(l) {
    const s = r.events[r.events.length - 1];
    return !Me(l) && s && s[1].type === "listItemPrefixWhitespace"
      ? t(l)
      : n(l);
  }
}
const N3 = { name: "setextUnderline", tokenize: gM, resolveTo: hM };
function hM(e, t) {
  let n = e.length,
    r,
    i,
    l;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1),
        !l && e[n][1].type === "definition" && (l = n);
  const s = {
    type: "setextHeading",
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end),
  };
  return (
    (e[i][1].type = "setextHeadingText"),
    l
      ? (e.splice(i, 0, ["enter", s, t]),
        e.splice(l + 1, 0, ["exit", e[r][1], t]),
        (e[r][1].end = Object.assign({}, e[l][1].end)))
      : (e[r][1] = s),
    e.push(["exit", s, t]),
    e
  );
}
function gM(e, t, n) {
  const r = this;
  let i;
  return l;
  function l(d) {
    let p = r.events.length,
      g;
    for (; p--; )
      if (
        r.events[p][1].type !== "lineEnding" &&
        r.events[p][1].type !== "linePrefix" &&
        r.events[p][1].type !== "content"
      ) {
        g = r.events[p][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || g)
      ? (e.enter("setextHeadingLine"), (i = d), s(d))
      : n(d);
  }
  function s(d) {
    return e.enter("setextHeadingLineSequence"), a(d);
  }
  function a(d) {
    return d === i
      ? (e.consume(d), a)
      : (e.exit("setextHeadingLineSequence"),
        Me(d) ? Xe(e, f, "lineSuffix")(d) : f(d));
  }
  function f(d) {
    return d === null || ye(d) ? (e.exit("setextHeadingLine"), t(d)) : n(d);
  }
}
const mM = { tokenize: vM };
function vM(e) {
  const t = this,
    n = e.attempt(
      Lf,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        Xe(
          e,
          e.attempt(this.parser.constructs.flow, i, e.attempt(CL, i)),
          "linePrefix"
        )
      )
    );
  return n;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEndingBlank"),
      e.consume(l),
      e.exit("lineEndingBlank"),
      (t.currentConstruct = void 0),
      n
    );
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(l),
      e.exit("lineEnding"),
      (t.currentConstruct = void 0),
      n
    );
  }
}
const yM = { resolveAll: Zx() },
  wM = Xx("string"),
  xM = Xx("text");
function Xx(e) {
  return { tokenize: t, resolveAll: Zx(e === "text" ? SM : void 0) };
  function t(n) {
    const r = this,
      i = this.parser.constructs[e],
      l = n.attempt(i, s, a);
    return s;
    function s(p) {
      return d(p) ? l(p) : a(p);
    }
    function a(p) {
      if (p === null) {
        n.consume(p);
        return;
      }
      return n.enter("data"), n.consume(p), f;
    }
    function f(p) {
      return d(p) ? (n.exit("data"), l(p)) : (n.consume(p), f);
    }
    function d(p) {
      if (p === null) return !0;
      const g = i[p];
      let v = -1;
      if (g)
        for (; ++v < g.length; ) {
          const m = g[v];
          if (!m.previous || m.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function Zx(e) {
  return t;
  function t(n, r) {
    let i = -1,
      l;
    for (; ++i <= n.length; )
      l === void 0
        ? n[i] && n[i][1].type === "data" && ((l = i), i++)
        : (!n[i] || n[i][1].type !== "data") &&
          (i !== l + 2 &&
            ((n[l][1].end = n[i - 1][1].end),
            n.splice(l + 2, i - l - 2),
            (i = l + 2)),
          (l = void 0));
    return e ? e(n, r) : n;
  }
}
function SM(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if (
      (n === e.length || e[n][1].type === "lineEnding") &&
      e[n - 1][1].type === "data"
    ) {
      const r = e[n - 1][1],
        i = t.sliceStream(r);
      let l = i.length,
        s = -1,
        a = 0,
        f;
      for (; l--; ) {
        const d = i[l];
        if (typeof d == "string") {
          for (s = d.length; d.charCodeAt(s - 1) === 32; ) a++, s--;
          if (s) break;
          s = -1;
        } else if (d === -2) (f = !0), a++;
        else if (d !== -1) {
          l++;
          break;
        }
      }
      if (a) {
        const d = {
          type:
            n === e.length || f || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a,
            _index: r.start._index + l,
            _bufferIndex: l ? s : r.start._bufferIndex + s,
          },
          end: Object.assign({}, r.end),
        };
        (r.end = Object.assign({}, d.start)),
          r.start.offset === r.end.offset
            ? Object.assign(r, d)
            : (e.splice(n, 0, ["enter", d, t], ["exit", d, t]), (n += 2));
      }
      n++;
    }
  return e;
}
function CM(e, t, n) {
  let r = Object.assign(
    n ? Object.assign({}, n) : { line: 1, column: 1, offset: 0 },
    { _index: 0, _bufferIndex: -1 }
  );
  const i = {},
    l = [];
  let s = [],
    a = [];
  const f = {
      consume: x,
      enter: k,
      exit: I,
      attempt: $(M),
      check: $(P),
      interrupt: $(P, { interrupt: !0 }),
    },
    d = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser: e,
      sliceStream: m,
      sliceSerialize: v,
      now: E,
      defineSkip: S,
      write: g,
    };
  let p = t.tokenize.call(d, f);
  return t.resolveAll && l.push(t), d;
  function g(G) {
    return (
      (s = Gn(s, G)),
      N(),
      s[s.length - 1] !== null
        ? []
        : (B(t, 0), (d.events = wm(l, d.events, d)), d.events)
    );
  }
  function v(G, Z) {
    return kM(m(G), Z);
  }
  function m(G) {
    return EM(s, G);
  }
  function E() {
    const { line: G, column: Z, offset: re, _index: ae, _bufferIndex: ce } = r;
    return { line: G, column: Z, offset: re, _index: ae, _bufferIndex: ce };
  }
  function S(G) {
    (i[G.line] = G.column), ee();
  }
  function N() {
    let G;
    for (; r._index < s.length; ) {
      const Z = s[r._index];
      if (typeof Z == "string")
        for (
          G = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === G && r._bufferIndex < Z.length;

        )
          y(Z.charCodeAt(r._bufferIndex));
      else y(Z);
    }
  }
  function y(G) {
    p = p(G);
  }
  function x(G) {
    ye(G)
      ? (r.line++, (r.column = 1), (r.offset += G === -3 ? 2 : 1), ee())
      : G !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === s[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (d.previous = G);
  }
  function k(G, Z) {
    const re = Z || {};
    return (
      (re.type = G),
      (re.start = E()),
      d.events.push(["enter", re, d]),
      a.push(re),
      re
    );
  }
  function I(G) {
    const Z = a.pop();
    return (Z.end = E()), d.events.push(["exit", Z, d]), Z;
  }
  function M(G, Z) {
    B(G, Z.from);
  }
  function P(G, Z) {
    Z.restore();
  }
  function $(G, Z) {
    return re;
    function re(ae, ce, ge) {
      let me, W, te, _;
      return Array.isArray(ae) ? se(ae) : "tokenize" in ae ? se([ae]) : ne(ae);
      function ne(we) {
        return nt;
        function nt(ct) {
          const Bt = ct !== null && we[ct],
            ii = ct !== null && we.null,
            oi = [
              ...(Array.isArray(Bt) ? Bt : Bt ? [Bt] : []),
              ...(Array.isArray(ii) ? ii : ii ? [ii] : []),
            ];
          return se(oi)(ct);
        }
      }
      function se(we) {
        return (me = we), (W = 0), we.length === 0 ? ge : O(we[W]);
      }
      function O(we) {
        return nt;
        function nt(ct) {
          return (
            (_ = Y()),
            (te = we),
            we.partial || (d.currentConstruct = we),
            we.name && d.parser.constructs.disable.null.includes(we.name)
              ? Fe()
              : we.tokenize.call(
                  Z ? Object.assign(Object.create(d), Z) : d,
                  f,
                  ve,
                  Fe
                )(ct)
          );
        }
      }
      function ve(we) {
        return G(te, _), ce;
      }
      function Fe(we) {
        return _.restore(), ++W < me.length ? O(me[W]) : ge;
      }
    }
  }
  function B(G, Z) {
    G.resolveAll && !l.includes(G) && l.push(G),
      G.resolve &&
        Rr(d.events, Z, d.events.length - Z, G.resolve(d.events.slice(Z), d)),
      G.resolveTo && (d.events = G.resolveTo(d.events, d));
  }
  function Y() {
    const G = E(),
      Z = d.previous,
      re = d.currentConstruct,
      ae = d.events.length,
      ce = Array.from(a);
    return { restore: ge, from: ae };
    function ge() {
      (r = G),
        (d.previous = Z),
        (d.currentConstruct = re),
        (d.events.length = ae),
        (a = ce),
        ee();
    }
  }
  function ee() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function EM(e, t) {
  const n = t.start._index,
    r = t.start._bufferIndex,
    i = t.end._index,
    l = t.end._bufferIndex;
  let s;
  if (n === i) s = [e[n].slice(r, l)];
  else {
    if (((s = e.slice(n, i)), r > -1)) {
      const a = s[0];
      typeof a == "string" ? (s[0] = a.slice(r)) : s.shift();
    }
    l > 0 && s.push(e[i].slice(0, l));
  }
  return s;
}
function kM(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const l = e[n];
    let s;
    if (typeof l == "string") s = l;
    else
      switch (l) {
        case -5: {
          s = "\r";
          break;
        }
        case -4: {
          s = `
`;
          break;
        }
        case -3: {
          s = `\r
`;
          break;
        }
        case -2: {
          s = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && i) continue;
          s = " ";
          break;
        }
        default:
          s = String.fromCharCode(l);
      }
    (i = l === -2), r.push(s);
  }
  return r.join("");
}
const bM = {
    42: tn,
    43: tn,
    45: tn,
    48: tn,
    49: tn,
    50: tn,
    51: tn,
    52: tn,
    53: tn,
    54: tn,
    55: tn,
    56: tn,
    57: tn,
    62: jx,
  },
  _M = { 91: OL },
  OM = { [-2]: ch, [-1]: ch, 32: ch },
  TM = {
    35: DL,
    42: Xa,
    45: [N3, Xa],
    60: FL,
    61: N3,
    95: Xa,
    96: A3,
    126: A3,
  },
  IM = { 38: Gx, 92: Vx },
  PM = {
    [-5]: fh,
    [-4]: fh,
    [-3]: fh,
    33: tM,
    38: Gx,
    42: Ig,
    60: [iL, jL],
    91: rM,
    92: [RL, Vx],
    93: Sm,
    95: Ig,
    96: vL,
  },
  RM = { null: [Ig, yM] },
  AM = { null: [42, 95] },
  DM = { null: [] },
  NM = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: AM,
        contentInitial: _M,
        disable: DM,
        document: bM,
        flow: TM,
        flowInitial: OM,
        insideSpan: RM,
        string: IM,
        text: PM,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function LM(e) {
  const n = UN([NM, ...((e || {}).extensions || [])]),
    r = {
      defined: [],
      lazy: {},
      constructs: n,
      content: i(XN),
      document: i(JN),
      flow: i(mM),
      string: i(wM),
      text: i(xM),
    };
  return r;
  function i(l) {
    return s;
    function s(a) {
      return CM(r, l, a);
    }
  }
}
const L3 = /[\0\t\n\r]/g;
function MM() {
  let e = 1,
    t = "",
    n = !0,
    r;
  return i;
  function i(l, s, a) {
    const f = [];
    let d, p, g, v, m;
    for (
      l = t + l.toString(s),
        g = 0,
        t = "",
        n && (l.charCodeAt(0) === 65279 && g++, (n = void 0));
      g < l.length;

    ) {
      if (
        ((L3.lastIndex = g),
        (d = L3.exec(l)),
        (v = d && d.index !== void 0 ? d.index : l.length),
        (m = l.charCodeAt(v)),
        !d)
      ) {
        t = l.slice(g);
        break;
      }
      if (m === 10 && g === v && r) f.push(-3), (r = void 0);
      else
        switch (
          (r && (f.push(-5), (r = void 0)),
          g < v && (f.push(l.slice(g, v)), (e += v - g)),
          m)
        ) {
          case 0: {
            f.push(65533), e++;
            break;
          }
          case 9: {
            for (p = Math.ceil(e / 4) * 4, f.push(-2); e++ < p; ) f.push(-1);
            break;
          }
          case 10: {
            f.push(-4), (e = 1);
            break;
          }
          default:
            (r = !0), (e = 1);
        }
      g = v + 1;
    }
    return a && (r && f.push(-5), t && f.push(t), f.push(null)), f;
  }
}
function FM(e) {
  for (; !qx(e); );
  return e;
}
function Jx(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 ||
    n === 11 ||
    (n > 13 && n < 32) ||
    (n > 126 && n < 160) ||
    (n > 55295 && n < 57344) ||
    (n > 64975 && n < 65008) ||
    (n & 65535) === 65535 ||
    (n & 65535) === 65534 ||
    n > 1114111
    ? "�"
    : String.fromCharCode(n);
}
const $M = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function zM(e) {
  return e.replace($M, BM);
}
function BM(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1),
      l = i === 120 || i === 88;
    return Jx(n.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return xm(n) || e;
}
const eS = {}.hasOwnProperty,
  HM = function (e, t, n) {
    return (
      typeof t != "string" && ((n = t), (t = void 0)),
      UM(n)(FM(LM(n).document().write(MM()(e, t, !0))))
    );
  };
function UM(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(li),
      autolinkProtocol: G,
      autolinkEmail: G,
      atxHeading: a(Es),
      blockQuote: a(oi),
      characterEscape: G,
      characterReference: G,
      codeFenced: a(qi),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: a(qi, f),
      codeText: a(Cs, f),
      codeTextData: G,
      data: G,
      codeFlowValue: G,
      definition: a(cn),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: a(Ki),
      hardBreakEscape: a(Dn),
      hardBreakTrailing: a(Dn),
      htmlFlow: a(Vl, f),
      htmlFlowData: G,
      htmlText: a(Vl, f),
      htmlTextData: G,
      image: a(qf),
      label: f,
      link: a(li),
      listItem: a(Qi),
      listItemValue: E,
      listOrdered: a(Yt, m),
      listUnordered: a(Yt),
      paragraph: a(No),
      reference: Fe,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: a(Es),
      strong: a(Kf),
      thematicBreak: a(Qf),
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: $,
      autolink: p(),
      autolinkEmail: ii,
      autolinkProtocol: Bt,
      blockQuote: p(),
      characterEscapeValue: Z,
      characterReferenceMarkerHexadecimal: nt,
      characterReferenceMarkerNumeric: nt,
      characterReferenceValue: ct,
      codeFenced: p(x),
      codeFencedFence: y,
      codeFencedFenceInfo: S,
      codeFencedFenceMeta: N,
      codeFlowValue: Z,
      codeIndented: p(k),
      codeText: p(me),
      codeTextData: Z,
      data: Z,
      definition: p(),
      definitionDestinationString: P,
      definitionLabelString: I,
      definitionTitleString: M,
      emphasis: p(),
      hardBreakEscape: p(ae),
      hardBreakTrailing: p(ae),
      htmlFlow: p(ce),
      htmlFlowData: Z,
      htmlText: p(ge),
      htmlTextData: Z,
      image: p(te),
      label: ne,
      labelText: _,
      lineEnding: re,
      link: p(W),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: we,
      resourceDestinationString: se,
      resourceTitleString: O,
      resource: ve,
      setextHeading: p(ee),
      setextHeadingLineSequence: Y,
      setextHeadingText: B,
      strong: p(),
      thematicBreak: p(),
    },
  };
  tS(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(H) {
    let J = { type: "root", children: [] };
    const fe = {
        stack: [J],
        tokenStack: [],
        config: t,
        enter: d,
        exit: g,
        buffer: f,
        resume: v,
        setData: l,
        getData: s,
      },
      De = [];
    let Ne = -1;
    for (; ++Ne < H.length; )
      if (H[Ne][1].type === "listOrdered" || H[Ne][1].type === "listUnordered")
        if (H[Ne][0] === "enter") De.push(Ne);
        else {
          const Ht = De.pop();
          Ne = i(H, Ht, Ne);
        }
    for (Ne = -1; ++Ne < H.length; ) {
      const Ht = t[H[Ne][0]];
      eS.call(Ht, H[Ne][1].type) &&
        Ht[H[Ne][1].type].call(
          Object.assign({ sliceSerialize: H[Ne][2].sliceSerialize }, fe),
          H[Ne][1]
        );
    }
    if (fe.tokenStack.length > 0) {
      const Ht = fe.tokenStack[fe.tokenStack.length - 1];
      (Ht[1] || M3).call(fe, void 0, Ht[0]);
    }
    for (
      J.position = {
        start: vi(
          H.length > 0 ? H[0][1].start : { line: 1, column: 1, offset: 0 }
        ),
        end: vi(
          H.length > 0
            ? H[H.length - 2][1].end
            : { line: 1, column: 1, offset: 0 }
        ),
      },
        Ne = -1;
      ++Ne < t.transforms.length;

    )
      J = t.transforms[Ne](J) || J;
    return J;
  }
  function i(H, J, fe) {
    let De = J - 1,
      Ne = -1,
      Ht = !1,
      Nn,
      fn,
      Dr,
      Nr;
    for (; ++De <= fe; ) {
      const Ze = H[De];
      if (
        (Ze[1].type === "listUnordered" ||
        Ze[1].type === "listOrdered" ||
        Ze[1].type === "blockQuote"
          ? (Ze[0] === "enter" ? Ne++ : Ne--, (Nr = void 0))
          : Ze[1].type === "lineEndingBlank"
          ? Ze[0] === "enter" &&
            (Nn && !Nr && !Ne && !Dr && (Dr = De), (Nr = void 0))
          : Ze[1].type === "linePrefix" ||
            Ze[1].type === "listItemValue" ||
            Ze[1].type === "listItemMarker" ||
            Ze[1].type === "listItemPrefix" ||
            Ze[1].type === "listItemPrefixWhitespace" ||
            (Nr = void 0),
        (!Ne && Ze[0] === "enter" && Ze[1].type === "listItemPrefix") ||
          (Ne === -1 &&
            Ze[0] === "exit" &&
            (Ze[1].type === "listUnordered" || Ze[1].type === "listOrdered")))
      ) {
        if (Nn) {
          let Gl = De;
          for (fn = void 0; Gl--; ) {
            const tr = H[Gl];
            if (
              tr[1].type === "lineEnding" ||
              tr[1].type === "lineEndingBlank"
            ) {
              if (tr[0] === "exit") continue;
              fn && ((H[fn][1].type = "lineEndingBlank"), (Ht = !0)),
                (tr[1].type = "lineEnding"),
                (fn = Gl);
            } else if (
              !(
                tr[1].type === "linePrefix" ||
                tr[1].type === "blockQuotePrefix" ||
                tr[1].type === "blockQuotePrefixWhitespace" ||
                tr[1].type === "blockQuoteMarker" ||
                tr[1].type === "listItemIndent"
              )
            )
              break;
          }
          Dr && (!fn || Dr < fn) && (Nn._spread = !0),
            (Nn.end = Object.assign({}, fn ? H[fn][1].start : Ze[1].end)),
            H.splice(fn || De, 0, ["exit", Nn, Ze[2]]),
            De++,
            fe++;
        }
        Ze[1].type === "listItemPrefix" &&
          ((Nn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ze[1].start),
            end: void 0,
          }),
          H.splice(De, 0, ["enter", Nn, Ze[2]]),
          De++,
          fe++,
          (Dr = void 0),
          (Nr = !0));
      }
    }
    return (H[J][1]._spread = Ht), fe;
  }
  function l(H, J) {
    n[H] = J;
  }
  function s(H) {
    return n[H];
  }
  function a(H, J) {
    return fe;
    function fe(De) {
      d.call(this, H(De), De), J && J.call(this, De);
    }
  }
  function f() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function d(H, J, fe) {
    return (
      this.stack[this.stack.length - 1].children.push(H),
      this.stack.push(H),
      this.tokenStack.push([J, fe]),
      (H.position = { start: vi(J.start) }),
      H
    );
  }
  function p(H) {
    return J;
    function J(fe) {
      H && H.call(this, fe), g.call(this, fe);
    }
  }
  function g(H, J) {
    const fe = this.stack.pop(),
      De = this.tokenStack.pop();
    if (De)
      De[0].type !== H.type &&
        (J ? J.call(this, H, De[0]) : (De[1] || M3).call(this, H, De[0]));
    else
      throw new Error(
        "Cannot close `" +
          H.type +
          "` (" +
          Hu({ start: H.start, end: H.end }) +
          "): it’s not open"
      );
    return (fe.position.end = vi(H.end)), fe;
  }
  function v() {
    return BN(this.stack.pop());
  }
  function m() {
    l("expectingFirstListItemValue", !0);
  }
  function E(H) {
    if (s("expectingFirstListItemValue")) {
      const J = this.stack[this.stack.length - 2];
      (J.start = Number.parseInt(this.sliceSerialize(H), 10)),
        l("expectingFirstListItemValue");
    }
  }
  function S() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.lang = H;
  }
  function N() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.meta = H;
  }
  function y() {
    s("flowCodeInside") || (this.buffer(), l("flowCodeInside", !0));
  }
  function x() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    (J.value = H.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")), l("flowCodeInside");
  }
  function k() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.value = H.replace(/(\r?\n|\r)$/g, "");
  }
  function I(H) {
    const J = this.resume(),
      fe = this.stack[this.stack.length - 1];
    (fe.label = J), (fe.identifier = kl(this.sliceSerialize(H)).toLowerCase());
  }
  function M() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.title = H;
  }
  function P() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.url = H;
  }
  function $(H) {
    const J = this.stack[this.stack.length - 1];
    if (!J.depth) {
      const fe = this.sliceSerialize(H).length;
      J.depth = fe;
    }
  }
  function B() {
    l("setextHeadingSlurpLineEnding", !0);
  }
  function Y(H) {
    const J = this.stack[this.stack.length - 1];
    J.depth = this.sliceSerialize(H).charCodeAt(0) === 61 ? 1 : 2;
  }
  function ee() {
    l("setextHeadingSlurpLineEnding");
  }
  function G(H) {
    const J = this.stack[this.stack.length - 1];
    let fe = J.children[J.children.length - 1];
    (!fe || fe.type !== "text") &&
      ((fe = Yi()),
      (fe.position = { start: vi(H.start) }),
      J.children.push(fe)),
      this.stack.push(fe);
  }
  function Z(H) {
    const J = this.stack.pop();
    (J.value += this.sliceSerialize(H)), (J.position.end = vi(H.end));
  }
  function re(H) {
    const J = this.stack[this.stack.length - 1];
    if (s("atHardBreak")) {
      const fe = J.children[J.children.length - 1];
      (fe.position.end = vi(H.end)), l("atHardBreak");
      return;
    }
    !s("setextHeadingSlurpLineEnding") &&
      t.canContainEols.includes(J.type) &&
      (G.call(this, H), Z.call(this, H));
  }
  function ae() {
    l("atHardBreak", !0);
  }
  function ce() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.value = H;
  }
  function ge() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.value = H;
  }
  function me() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.value = H;
  }
  function W() {
    const H = this.stack[this.stack.length - 1];
    if (s("inReference")) {
      const J = s("referenceType") || "shortcut";
      (H.type += "Reference"),
        (H.referenceType = J),
        delete H.url,
        delete H.title;
    } else delete H.identifier, delete H.label;
    l("referenceType");
  }
  function te() {
    const H = this.stack[this.stack.length - 1];
    if (s("inReference")) {
      const J = s("referenceType") || "shortcut";
      (H.type += "Reference"),
        (H.referenceType = J),
        delete H.url,
        delete H.title;
    } else delete H.identifier, delete H.label;
    l("referenceType");
  }
  function _(H) {
    const J = this.sliceSerialize(H),
      fe = this.stack[this.stack.length - 2];
    (fe.label = zM(J)), (fe.identifier = kl(J).toLowerCase());
  }
  function ne() {
    const H = this.stack[this.stack.length - 1],
      J = this.resume(),
      fe = this.stack[this.stack.length - 1];
    if ((l("inReference", !0), fe.type === "link")) {
      const De = H.children;
      fe.children = De;
    } else fe.alt = J;
  }
  function se() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.url = H;
  }
  function O() {
    const H = this.resume(),
      J = this.stack[this.stack.length - 1];
    J.title = H;
  }
  function ve() {
    l("inReference");
  }
  function Fe() {
    l("referenceType", "collapsed");
  }
  function we(H) {
    const J = this.resume(),
      fe = this.stack[this.stack.length - 1];
    (fe.label = J),
      (fe.identifier = kl(this.sliceSerialize(H)).toLowerCase()),
      l("referenceType", "full");
  }
  function nt(H) {
    l("characterReferenceType", H.type);
  }
  function ct(H) {
    const J = this.sliceSerialize(H),
      fe = s("characterReferenceType");
    let De;
    fe
      ? ((De = Jx(J, fe === "characterReferenceMarkerNumeric" ? 10 : 16)),
        l("characterReferenceType"))
      : (De = xm(J));
    const Ne = this.stack.pop();
    (Ne.value += De), (Ne.position.end = vi(H.end));
  }
  function Bt(H) {
    Z.call(this, H);
    const J = this.stack[this.stack.length - 1];
    J.url = this.sliceSerialize(H);
  }
  function ii(H) {
    Z.call(this, H);
    const J = this.stack[this.stack.length - 1];
    J.url = "mailto:" + this.sliceSerialize(H);
  }
  function oi() {
    return { type: "blockquote", children: [] };
  }
  function qi() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Cs() {
    return { type: "inlineCode", value: "" };
  }
  function cn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Ki() {
    return { type: "emphasis", children: [] };
  }
  function Es() {
    return { type: "heading", depth: void 0, children: [] };
  }
  function Dn() {
    return { type: "break" };
  }
  function Vl() {
    return { type: "html", value: "" };
  }
  function qf() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function li() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Yt(H) {
    return {
      type: "list",
      ordered: H.type === "listOrdered",
      start: null,
      spread: H._spread,
      children: [],
    };
  }
  function Qi(H) {
    return { type: "listItem", spread: H._spread, checked: null, children: [] };
  }
  function No() {
    return { type: "paragraph", children: [] };
  }
  function Kf() {
    return { type: "strong", children: [] };
  }
  function Yi() {
    return { type: "text", value: "" };
  }
  function Qf() {
    return { type: "thematicBreak" };
  }
}
function vi(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function tS(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? tS(e, r) : WM(e, r);
  }
}
function WM(e, t) {
  let n;
  for (n in t)
    if (eS.call(t, n)) {
      if (n === "canContainEols") {
        const r = t[n];
        r && e[n].push(...r);
      } else if (n === "transforms") {
        const r = t[n];
        r && e[n].push(...r);
      } else if (n === "enter" || n === "exit") {
        const r = t[n];
        r && Object.assign(e[n], r);
      }
    }
}
function M3(e, t) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          Hu({ start: e.start, end: e.end }) +
          "): a different token (`" +
          t.type +
          "`, " +
          Hu({ start: t.start, end: t.end }) +
          ") is open"
      )
    : new Error(
        "Cannot close document, a token (`" +
          t.type +
          "`, " +
          Hu({ start: t.start, end: t.end }) +
          ") is still open"
      );
}
function jM(e) {
  Object.assign(this, {
    Parser: (n) => {
      const r = this.data("settings");
      return HM(
        n,
        Object.assign({}, r, e, {
          extensions: this.data("micromarkExtensions") || [],
          mdastExtensions: this.data("fromMarkdownExtensions") || [],
        })
      );
    },
  });
}
function VM(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function GM(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    e.patch(t, n),
    [
      e.applyData(t, n),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function qM(e, t) {
  const n = t.value
      ? t.value +
        `
`
      : "",
    r = t.lang ? t.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null,
    i = {};
  r && (i.className = ["language-" + r]);
  let l = {
    type: "element",
    tagName: "code",
    properties: i,
    children: [{ type: "text", value: n }],
  };
  return (
    t.meta && (l.data = { meta: t.meta }),
    e.patch(t, l),
    (l = e.applyData(t, l)),
    (l = { type: "element", tagName: "pre", properties: {}, children: [l] }),
    e.patch(t, l),
    l
  );
}
function KM(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function QM(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Wl(e) {
  const t = [];
  let n = -1,
    r = 0,
    i = 0;
  for (; ++n < e.length; ) {
    const l = e.charCodeAt(n);
    let s = "";
    if (l === 37 && kn(e.charCodeAt(n + 1)) && kn(e.charCodeAt(n + 2))) i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) ||
        (s = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(n + 1);
      l < 56320 && a > 56319 && a < 57344
        ? ((s = String.fromCharCode(l, a)), (i = 1))
        : (s = "�");
    } else s = String.fromCharCode(l);
    s &&
      (t.push(e.slice(r, n), encodeURIComponent(s)), (r = n + i + 1), (s = "")),
      i && ((n += i), (i = 0));
  }
  return t.join("") + e.slice(r);
}
function nS(e, t) {
  const n = String(t.identifier).toUpperCase(),
    r = Wl(n.toLowerCase()),
    i = e.footnoteOrder.indexOf(n);
  let l;
  i === -1
    ? (e.footnoteOrder.push(n),
      (e.footnoteCounts[n] = 1),
      (l = e.footnoteOrder.length))
    : (e.footnoteCounts[n]++, (l = i + 1));
  const s = e.footnoteCounts[n],
    a = {
      type: "element",
      tagName: "a",
      properties: {
        href: "#" + e.clobberPrefix + "fn-" + r,
        id: e.clobberPrefix + "fnref-" + r + (s > 1 ? "-" + s : ""),
        dataFootnoteRef: !0,
        ariaDescribedBy: ["footnote-label"],
      },
      children: [{ type: "text", value: String(l) }],
    };
  e.patch(t, a);
  const f = { type: "element", tagName: "sup", properties: {}, children: [a] };
  return e.patch(t, f), e.applyData(t, f);
}
function YM(e, t) {
  const n = e.footnoteById;
  let r = 1;
  for (; r in n; ) r++;
  const i = String(r);
  return (
    (n[i] = {
      type: "footnoteDefinition",
      identifier: i,
      children: [{ type: "paragraph", children: t.children }],
      position: t.position,
    }),
    nS(e, { type: "footnoteReference", identifier: i, position: t.position })
  );
}
function XM(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function ZM(e, t) {
  if (e.dangerous) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
  return null;
}
function rS(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (
    (n === "collapsed"
      ? (r += "[]")
      : n === "full" && (r += "[" + (t.label || t.identifier) + "]"),
    t.type === "imageReference")
  )
    return { type: "text", value: "![" + t.alt + r };
  const i = e.all(t),
    l = i[0];
  l && l.type === "text"
    ? (l.value = "[" + l.value)
    : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return (
    s && s.type === "text"
      ? (s.value += r)
      : i.push({ type: "text", value: r }),
    i
  );
}
function JM(e, t) {
  const n = e.definition(t.identifier);
  if (!n) return rS(e, t);
  const r = { src: Wl(n.url || ""), alt: t.alt };
  n.title !== null && n.title !== void 0 && (r.title = n.title);
  const i = { type: "element", tagName: "img", properties: r, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}
function eF(e, t) {
  const n = { src: Wl(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt),
    t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function tF(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e.patch(t, r), e.applyData(t, r);
}
function nF(e, t) {
  const n = e.definition(t.identifier);
  if (!n) return rS(e, t);
  const r = { href: Wl(n.url || "") };
  n.title !== null && n.title !== void 0 && (r.title = n.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: r,
    children: e.all(t),
  };
  return e.patch(t, i), e.applyData(t, i);
}
function rF(e, t) {
  const n = { href: Wl(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t),
  };
  return e.patch(t, r), e.applyData(t, r);
}
function iF(e, t, n) {
  const r = e.all(t),
    i = n ? oF(n) : iS(t),
    l = {},
    s = [];
  if (typeof t.checked == "boolean") {
    const p = r[0];
    let g;
    p && p.type === "element" && p.tagName === "p"
      ? (g = p)
      : ((g = { type: "element", tagName: "p", properties: {}, children: [] }),
        r.unshift(g)),
      g.children.length > 0 && g.children.unshift({ type: "text", value: " " }),
      g.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: t.checked, disabled: !0 },
        children: [],
      }),
      (l.className = ["task-list-item"]);
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const p = r[a];
    (i || a !== 0 || p.type !== "element" || p.tagName !== "p") &&
      s.push({
        type: "text",
        value: `
`,
      }),
      p.type === "element" && p.tagName === "p" && !i
        ? s.push(...p.children)
        : s.push(p);
  }
  const f = r[r.length - 1];
  f &&
    (i || f.type !== "element" || f.tagName !== "p") &&
    s.push({
      type: "text",
      value: `
`,
    });
  const d = { type: "element", tagName: "li", properties: l, children: s };
  return e.patch(t, d), e.applyData(t, d);
}
function oF(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; ) t = iS(n[r]);
  }
  return t;
}
function iS(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function lF(e, t) {
  const n = {},
    r = e.all(t);
  let i = -1;
  for (
    typeof t.start == "number" && t.start !== 1 && (n.start = t.start);
    ++i < r.length;

  ) {
    const s = r[i];
    if (
      s.type === "element" &&
      s.tagName === "li" &&
      s.properties &&
      Array.isArray(s.properties.className) &&
      s.properties.className.includes("task-list-item")
    ) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0),
  };
  return e.patch(t, l), e.applyData(t, l);
}
function uF(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
function sF(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function aF(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Cm = oS("start"),
  Em = oS("end");
function cF(e) {
  return { start: Cm(e), end: Em(e) };
}
function oS(e) {
  return t;
  function t(n) {
    const r = (n && n.position && n.position[e]) || {};
    return {
      line: r.line || null,
      column: r.column || null,
      offset: r.offset > -1 ? r.offset : null,
    };
  }
}
function fF(e, t) {
  const n = e.all(t),
    r = n.shift(),
    i = [];
  if (r) {
    const s = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0),
    };
    e.patch(t.children[0], s), i.push(s);
  }
  if (n.length > 0) {
    const s = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(n, !0),
      },
      a = Cm(t.children[1]),
      f = Em(t.children[t.children.length - 1]);
    a.line && f.line && (s.position = { start: a, end: f }), i.push(s);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0),
  };
  return e.patch(t, l), e.applyData(t, l);
}
function dF(e, t, n) {
  const r = n ? n.children : void 0,
    l = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td",
    s = n && n.type === "table" ? n.align : void 0,
    a = s ? s.length : t.children.length;
  let f = -1;
  const d = [];
  for (; ++f < a; ) {
    const g = t.children[f],
      v = {},
      m = s ? s[f] : void 0;
    m && (v.align = m);
    let E = { type: "element", tagName: l, properties: v, children: [] };
    g && ((E.children = e.all(g)), e.patch(g, E), (E = e.applyData(t, E))),
      d.push(E);
  }
  const p = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(d, !0),
  };
  return e.patch(t, p), e.applyData(t, p);
}
function pF(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(t),
  };
  return e.patch(t, n), e.applyData(t, n);
}
const F3 = 9,
  $3 = 32;
function hF(e) {
  const t = String(e),
    n = /\r?\n|\r/g;
  let r = n.exec(t),
    i = 0;
  const l = [];
  for (; r; )
    l.push(z3(t.slice(i, r.index), i > 0, !0), r[0]),
      (i = r.index + r[0].length),
      (r = n.exec(t));
  return l.push(z3(t.slice(i), i > 0, !1)), l.join("");
}
function z3(e, t, n) {
  let r = 0,
    i = e.length;
  if (t) {
    let l = e.codePointAt(r);
    for (; l === F3 || l === $3; ) r++, (l = e.codePointAt(r));
  }
  if (n) {
    let l = e.codePointAt(i - 1);
    for (; l === F3 || l === $3; ) i--, (l = e.codePointAt(i - 1));
  }
  return i > r ? e.slice(r, i) : "";
}
function gF(e, t) {
  const n = { type: "text", value: hF(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function mF(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e.patch(t, n), e.applyData(t, n);
}
const vF = {
  blockquote: VM,
  break: GM,
  code: qM,
  delete: KM,
  emphasis: QM,
  footnoteReference: nS,
  footnote: YM,
  heading: XM,
  html: ZM,
  imageReference: JM,
  image: eF,
  inlineCode: tF,
  linkReference: nF,
  link: rF,
  listItem: iF,
  list: lF,
  paragraph: uF,
  root: sF,
  strong: aF,
  table: fF,
  tableCell: pF,
  tableRow: dF,
  text: gF,
  thematicBreak: mF,
  toml: Aa,
  yaml: Aa,
  definition: Aa,
  footnoteDefinition: Aa,
};
function Aa() {
  return null;
}
const lS = function (e) {
  if (e == null) return SF;
  if (typeof e == "string") return xF(e);
  if (typeof e == "object") return Array.isArray(e) ? yF(e) : wF(e);
  if (typeof e == "function") return Mf(e);
  throw new Error("Expected function, string, or object as test");
};
function yF(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; ) t[n] = lS(e[n]);
  return Mf(r);
  function r(...i) {
    let l = -1;
    for (; ++l < t.length; ) if (t[l].call(this, ...i)) return !0;
    return !1;
  }
}
function wF(e) {
  return Mf(t);
  function t(n) {
    let r;
    for (r in e) if (n[r] !== e[r]) return !1;
    return !0;
  }
}
function xF(e) {
  return Mf(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Mf(e) {
  return t;
  function t(n, ...r) {
    return !!(
      n &&
      typeof n == "object" &&
      "type" in n &&
      e.call(this, n, ...r)
    );
  }
}
function SF() {
  return !0;
}
const CF = !0,
  B3 = !1,
  EF = "skip",
  kF = function (e, t, n, r) {
    typeof t == "function" &&
      typeof n != "function" &&
      ((r = n), (n = t), (t = null));
    const i = lS(t),
      l = r ? -1 : 1;
    s(e, void 0, [])();
    function s(a, f, d) {
      const p = a && typeof a == "object" ? a : {};
      if (typeof p.type == "string") {
        const v =
          typeof p.tagName == "string"
            ? p.tagName
            : typeof p.name == "string"
            ? p.name
            : void 0;
        Object.defineProperty(g, "name", {
          value: "node (" + (a.type + (v ? "<" + v + ">" : "")) + ")",
        });
      }
      return g;
      function g() {
        let v = [],
          m,
          E,
          S;
        if (
          (!t || i(a, f, d[d.length - 1] || null)) &&
          ((v = bF(n(a, d))), v[0] === B3)
        )
          return v;
        if (a.children && v[0] !== EF)
          for (
            E = (r ? a.children.length : -1) + l, S = d.concat(a);
            E > -1 && E < a.children.length;

          ) {
            if (((m = s(a.children[E], E, S)()), m[0] === B3)) return m;
            E = typeof m[1] == "number" ? m[1] : E + l;
          }
        return v;
      }
    }
  };
function bF(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [CF, e] : [e];
}
const km = function (e, t, n, r) {
  typeof t == "function" &&
    typeof n != "function" &&
    ((r = n), (n = t), (t = null)),
    kF(e, t, i, r);
  function i(l, s) {
    const a = s[s.length - 1];
    return n(l, a ? a.children.indexOf(l) : null, a);
  }
};
function _F(e) {
  return (
    !e ||
    !e.position ||
    !e.position.start ||
    !e.position.start.line ||
    !e.position.start.column ||
    !e.position.end ||
    !e.position.end.line ||
    !e.position.end.column
  );
}
const H3 = {}.hasOwnProperty;
function OF(e) {
  const t = Object.create(null);
  if (!e || !e.type) throw new Error("mdast-util-definitions expected node");
  return (
    km(e, "definition", (r) => {
      const i = U3(r.identifier);
      i && !H3.call(t, i) && (t[i] = r);
    }),
    n
  );
  function n(r) {
    const i = U3(r);
    return i && H3.call(t, i) ? t[i] : null;
  }
}
function U3(e) {
  return String(e || "").toUpperCase();
}
const zc = {}.hasOwnProperty;
function TF(e, t) {
  const n = t || {},
    r = n.allowDangerousHtml || !1,
    i = {};
  return (
    (s.dangerous = r),
    (s.clobberPrefix =
      n.clobberPrefix === void 0 || n.clobberPrefix === null
        ? "user-content-"
        : n.clobberPrefix),
    (s.footnoteLabel = n.footnoteLabel || "Footnotes"),
    (s.footnoteLabelTagName = n.footnoteLabelTagName || "h2"),
    (s.footnoteLabelProperties = n.footnoteLabelProperties || {
      className: ["sr-only"],
    }),
    (s.footnoteBackLabel = n.footnoteBackLabel || "Back to content"),
    (s.unknownHandler = n.unknownHandler),
    (s.passThrough = n.passThrough),
    (s.handlers = { ...vF, ...n.handlers }),
    (s.definition = OF(e)),
    (s.footnoteById = i),
    (s.footnoteOrder = []),
    (s.footnoteCounts = {}),
    (s.patch = IF),
    (s.applyData = PF),
    (s.one = a),
    (s.all = f),
    (s.wrap = AF),
    (s.augment = l),
    km(e, "footnoteDefinition", (d) => {
      const p = String(d.identifier).toUpperCase();
      zc.call(i, p) || (i[p] = d);
    }),
    s
  );
  function l(d, p) {
    if (d && "data" in d && d.data) {
      const g = d.data;
      g.hName &&
        (p.type !== "element" &&
          (p = { type: "element", tagName: "", properties: {}, children: [] }),
        (p.tagName = g.hName)),
        p.type === "element" &&
          g.hProperties &&
          (p.properties = { ...p.properties, ...g.hProperties }),
        "children" in p &&
          p.children &&
          g.hChildren &&
          (p.children = g.hChildren);
    }
    if (d) {
      const g = "type" in d ? d : { position: d };
      _F(g) || (p.position = { start: Cm(g), end: Em(g) });
    }
    return p;
  }
  function s(d, p, g, v) {
    return (
      Array.isArray(g) && ((v = g), (g = {})),
      l(d, {
        type: "element",
        tagName: p,
        properties: g || {},
        children: v || [],
      })
    );
  }
  function a(d, p) {
    return uS(s, d, p);
  }
  function f(d) {
    return bm(s, d);
  }
}
function IF(e, t) {
  e.position && (t.position = cF(e));
}
function PF(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName,
      i = e.data.hChildren,
      l = e.data.hProperties;
    typeof r == "string" &&
      (n.type === "element"
        ? (n.tagName = r)
        : (n = { type: "element", tagName: r, properties: {}, children: [] })),
      n.type === "element" && l && (n.properties = { ...n.properties, ...l }),
      "children" in n &&
        n.children &&
        i !== null &&
        i !== void 0 &&
        (n.children = i);
  }
  return n;
}
function uS(e, t, n) {
  const r = t && t.type;
  if (!r) throw new Error("Expected node, got `" + t + "`");
  return zc.call(e.handlers, r)
    ? e.handlers[r](e, t, n)
    : e.passThrough && e.passThrough.includes(r)
    ? "children" in t
      ? { ...t, children: bm(e, t) }
      : t
    : e.unknownHandler
    ? e.unknownHandler(e, t, n)
    : RF(e, t);
}
function bm(e, t) {
  const n = [];
  if ("children" in t) {
    const r = t.children;
    let i = -1;
    for (; ++i < r.length; ) {
      const l = uS(e, r[i], t);
      if (l) {
        if (
          i &&
          r[i - 1].type === "break" &&
          (!Array.isArray(l) &&
            l.type === "text" &&
            (l.value = l.value.replace(/^\s+/, "")),
          !Array.isArray(l) && l.type === "element")
        ) {
          const s = l.children[0];
          s && s.type === "text" && (s.value = s.value.replace(/^\s+/, ""));
        }
        Array.isArray(l) ? n.push(...l) : n.push(l);
      }
    }
  }
  return n;
}
function RF(e, t) {
  const n = t.data || {},
    r =
      "value" in t && !(zc.call(n, "hProperties") || zc.call(n, "hChildren"))
        ? { type: "text", value: t.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: bm(e, t),
          };
  return e.patch(t, r), e.applyData(t, r);
}
function AF(e, t) {
  const n = [];
  let r = -1;
  for (
    t &&
    n.push({
      type: "text",
      value: `
`,
    });
    ++r < e.length;

  )
    r &&
      n.push({
        type: "text",
        value: `
`,
      }),
      n.push(e[r]);
  return (
    t &&
      e.length > 0 &&
      n.push({
        type: "text",
        value: `
`,
      }),
    n
  );
}
function DF(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.footnoteOrder.length; ) {
    const r = e.footnoteById[e.footnoteOrder[n]];
    if (!r) continue;
    const i = e.all(r),
      l = String(r.identifier).toUpperCase(),
      s = Wl(l.toLowerCase());
    let a = 0;
    const f = [];
    for (; ++a <= e.footnoteCounts[l]; ) {
      const g = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e.clobberPrefix + "fnref-" + s + (a > 1 ? "-" + a : ""),
          dataFootnoteBackref: !0,
          className: ["data-footnote-backref"],
          ariaLabel: e.footnoteBackLabel,
        },
        children: [{ type: "text", value: "↩" }],
      };
      a > 1 &&
        g.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(a) }],
        }),
        f.length > 0 && f.push({ type: "text", value: " " }),
        f.push(g);
    }
    const d = i[i.length - 1];
    if (d && d.type === "element" && d.tagName === "p") {
      const g = d.children[d.children.length - 1];
      g && g.type === "text"
        ? (g.value += " ")
        : d.children.push({ type: "text", value: " " }),
        d.children.push(...f);
    } else i.push(...f);
    const p = {
      type: "element",
      tagName: "li",
      properties: { id: e.clobberPrefix + "fn-" + s },
      children: e.wrap(i, !0),
    };
    e.patch(r, p), t.push(p);
  }
  if (t.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: e.footnoteLabelTagName,
          properties: {
            ...JSON.parse(JSON.stringify(e.footnoteLabelProperties)),
            id: "footnote-label",
          },
          children: [{ type: "text", value: e.footnoteLabel }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(t, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
function sS(e, t) {
  const n = TF(e, t),
    r = n.one(e, null),
    i = DF(n);
  return (
    i &&
      r.children.push(
        {
          type: "text",
          value: `
`,
        },
        i
      ),
    Array.isArray(r) ? { type: "root", children: r } : r
  );
}
const NF = function (e, t) {
    return e && "run" in e ? MF(e, t) : FF(e || t);
  },
  LF = NF;
function MF(e, t) {
  return (n, r, i) => {
    e.run(sS(n, t), r, (l) => {
      i(l);
    });
  };
}
function FF(e) {
  return (t) => sS(t, e);
}
class Ss {
  constructor(t, n, r) {
    (this.property = t), (this.normal = n), r && (this.space = r);
  }
}
Ss.prototype.property = {};
Ss.prototype.normal = {};
Ss.prototype.space = null;
function aS(e, t) {
  const n = {},
    r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new Ss(n, r, t);
}
function Pg(e) {
  return e.toLowerCase();
}
class Jn {
  constructor(t, n) {
    (this.property = t), (this.attribute = n);
  }
}
Jn.prototype.space = null;
Jn.prototype.boolean = !1;
Jn.prototype.booleanish = !1;
Jn.prototype.overloadedBoolean = !1;
Jn.prototype.number = !1;
Jn.prototype.commaSeparated = !1;
Jn.prototype.spaceSeparated = !1;
Jn.prototype.commaOrSpaceSeparated = !1;
Jn.prototype.mustUseProperty = !1;
Jn.prototype.defined = !1;
let $F = 0;
const ke = Do(),
  mt = Do(),
  cS = Do(),
  X = Do(),
  Qe = Do(),
  bl = Do(),
  yn = Do();
function Do() {
  return 2 ** ++$F;
}
const Rg = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: ke,
        booleanish: mt,
        commaOrSpaceSeparated: yn,
        commaSeparated: bl,
        number: X,
        overloadedBoolean: cS,
        spaceSeparated: Qe,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  dh = Object.keys(Rg);
class _m extends Jn {
  constructor(t, n, r, i) {
    let l = -1;
    if ((super(t, n), W3(this, "space", i), typeof r == "number"))
      for (; ++l < dh.length; ) {
        const s = dh[l];
        W3(this, dh[l], (r & Rg[s]) === Rg[s]);
      }
  }
}
_m.prototype.defined = !0;
function W3(e, t, n) {
  n && (e[t] = n);
}
const zF = {}.hasOwnProperty;
function jl(e) {
  const t = {},
    n = {};
  let r;
  for (r in e.properties)
    if (zF.call(e.properties, r)) {
      const i = e.properties[r],
        l = new _m(r, e.transform(e.attributes || {}, r), i, e.space);
      e.mustUseProperty &&
        e.mustUseProperty.includes(r) &&
        (l.mustUseProperty = !0),
        (t[r] = l),
        (n[Pg(r)] = r),
        (n[Pg(l.attribute)] = r);
    }
  return new Ss(t, n, e.space);
}
const fS = jl({
    space: "xlink",
    transform(e, t) {
      return "xlink:" + t.slice(5).toLowerCase();
    },
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
  }),
  dS = jl({
    space: "xml",
    transform(e, t) {
      return "xml:" + t.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
  });
function pS(e, t) {
  return t in e ? e[t] : t;
}
function hS(e, t) {
  return pS(e, t.toLowerCase());
}
const gS = jl({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: hS,
    properties: { xmlns: null, xmlnsXLink: null },
  }),
  mS = jl({
    transform(e, t) {
      return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: mt,
      ariaAutoComplete: null,
      ariaBusy: mt,
      ariaChecked: mt,
      ariaColCount: X,
      ariaColIndex: X,
      ariaColSpan: X,
      ariaControls: Qe,
      ariaCurrent: null,
      ariaDescribedBy: Qe,
      ariaDetails: null,
      ariaDisabled: mt,
      ariaDropEffect: Qe,
      ariaErrorMessage: null,
      ariaExpanded: mt,
      ariaFlowTo: Qe,
      ariaGrabbed: mt,
      ariaHasPopup: null,
      ariaHidden: mt,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: Qe,
      ariaLevel: X,
      ariaLive: null,
      ariaModal: mt,
      ariaMultiLine: mt,
      ariaMultiSelectable: mt,
      ariaOrientation: null,
      ariaOwns: Qe,
      ariaPlaceholder: null,
      ariaPosInSet: X,
      ariaPressed: mt,
      ariaReadOnly: mt,
      ariaRelevant: null,
      ariaRequired: mt,
      ariaRoleDescription: Qe,
      ariaRowCount: X,
      ariaRowIndex: X,
      ariaRowSpan: X,
      ariaSelected: mt,
      ariaSetSize: X,
      ariaSort: null,
      ariaValueMax: X,
      ariaValueMin: X,
      ariaValueNow: X,
      ariaValueText: null,
      role: null,
    },
  }),
  BF = jl({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    transform: hS,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: bl,
      acceptCharset: Qe,
      accessKey: Qe,
      action: null,
      allow: null,
      allowFullScreen: ke,
      allowPaymentRequest: ke,
      allowUserMedia: ke,
      alt: null,
      as: null,
      async: ke,
      autoCapitalize: null,
      autoComplete: Qe,
      autoFocus: ke,
      autoPlay: ke,
      blocking: Qe,
      capture: null,
      charSet: null,
      checked: ke,
      cite: null,
      className: Qe,
      cols: X,
      colSpan: null,
      content: null,
      contentEditable: mt,
      controls: ke,
      controlsList: Qe,
      coords: X | bl,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: ke,
      defer: ke,
      dir: null,
      dirName: null,
      disabled: ke,
      download: cS,
      draggable: mt,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: ke,
      formTarget: null,
      headers: Qe,
      height: X,
      hidden: ke,
      high: X,
      href: null,
      hrefLang: null,
      htmlFor: Qe,
      httpEquiv: Qe,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: ke,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: ke,
      itemId: null,
      itemProp: Qe,
      itemRef: Qe,
      itemScope: ke,
      itemType: Qe,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: ke,
      low: X,
      manifest: null,
      max: null,
      maxLength: X,
      media: null,
      method: null,
      min: null,
      minLength: X,
      multiple: ke,
      muted: ke,
      name: null,
      nonce: null,
      noModule: ke,
      noValidate: ke,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: ke,
      optimum: X,
      pattern: null,
      ping: Qe,
      placeholder: null,
      playsInline: ke,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: ke,
      referrerPolicy: null,
      rel: Qe,
      required: ke,
      reversed: ke,
      rows: X,
      rowSpan: X,
      sandbox: Qe,
      scope: null,
      scoped: ke,
      seamless: ke,
      selected: ke,
      shadowRootClonable: ke,
      shadowRootDelegatesFocus: ke,
      shadowRootMode: null,
      shape: null,
      size: X,
      sizes: null,
      slot: null,
      span: X,
      spellCheck: mt,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: X,
      step: null,
      style: null,
      tabIndex: X,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: ke,
      useMap: null,
      value: mt,
      width: X,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: Qe,
      axis: null,
      background: null,
      bgColor: null,
      border: X,
      borderColor: null,
      bottomMargin: X,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: ke,
      declare: ke,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: X,
      leftMargin: X,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: X,
      marginWidth: X,
      noResize: ke,
      noHref: ke,
      noShade: ke,
      noWrap: ke,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: X,
      rules: null,
      scheme: null,
      scrolling: mt,
      standby: null,
      summary: null,
      text: null,
      topMargin: X,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: X,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: ke,
      disableRemotePlayback: ke,
      prefix: null,
      property: null,
      results: X,
      security: null,
      unselectable: null,
    },
  }),
  HF = jl({
    space: "svg",
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    transform: pS,
    properties: {
      about: yn,
      accentHeight: X,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: X,
      amplitude: X,
      arabicForm: null,
      ascent: X,
      attributeName: null,
      attributeType: null,
      azimuth: X,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: X,
      by: null,
      calcMode: null,
      capHeight: X,
      className: Qe,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: X,
      diffuseConstant: X,
      direction: null,
      display: null,
      dur: null,
      divisor: X,
      dominantBaseline: null,
      download: ke,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: X,
      enableBackground: null,
      end: null,
      event: null,
      exponent: X,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: X,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: bl,
      g2: bl,
      glyphName: bl,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: X,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: X,
      horizOriginX: X,
      horizOriginY: X,
      id: null,
      ideographic: X,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: X,
      k: X,
      k1: X,
      k2: X,
      k3: X,
      k4: X,
      kernelMatrix: yn,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: X,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: X,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: X,
      overlineThickness: X,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: X,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: Qe,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: X,
      pointsAtY: X,
      pointsAtZ: X,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: yn,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: yn,
      rev: yn,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: yn,
      requiredFeatures: yn,
      requiredFonts: yn,
      requiredFormats: yn,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: X,
      specularExponent: X,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: X,
      strikethroughThickness: X,
      string: null,
      stroke: null,
      strokeDashArray: yn,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: X,
      strokeOpacity: X,
      strokeWidth: null,
      style: null,
      surfaceScale: X,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: yn,
      tabIndex: X,
      tableValues: null,
      target: null,
      targetX: X,
      targetY: X,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: yn,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: X,
      underlineThickness: X,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: X,
      values: null,
      vAlphabetic: X,
      vMathematical: X,
      vectorEffect: null,
      vHanging: X,
      vIdeographic: X,
      version: null,
      vertAdvY: X,
      vertOriginX: X,
      vertOriginY: X,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: X,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
  }),
  UF = /^data[-\w.:]+$/i,
  j3 = /-[a-z]/g,
  WF = /[A-Z]/g;
function jF(e, t) {
  const n = Pg(t);
  let r = t,
    i = Jn;
  if (n in e.normal) return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && UF.test(t)) {
    if (t.charAt(4) === "-") {
      const l = t.slice(5).replace(j3, GF);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = t.slice(4);
      if (!j3.test(l)) {
        let s = l.replace(WF, VF);
        s.charAt(0) !== "-" && (s = "-" + s), (t = "data" + s);
      }
    }
    i = _m;
  }
  return new i(r, t);
}
function VF(e) {
  return "-" + e.toLowerCase();
}
function GF(e) {
  return e.charAt(1).toUpperCase();
}
const V3 = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  qF = aS([dS, fS, gS, mS, BF], "html"),
  KF = aS([dS, fS, gS, mS, HF], "svg");
function QF(e) {
  if (e.allowedElements && e.disallowedElements)
    throw new TypeError(
      "Only one of `allowedElements` and `disallowedElements` should be defined"
    );
  if (e.allowedElements || e.disallowedElements || e.allowElement)
    return (t) => {
      km(t, "element", (n, r, i) => {
        const l = i;
        let s;
        if (
          (e.allowedElements
            ? (s = !e.allowedElements.includes(n.tagName))
            : e.disallowedElements &&
              (s = e.disallowedElements.includes(n.tagName)),
          !s &&
            e.allowElement &&
            typeof r == "number" &&
            (s = !e.allowElement(n, r, l)),
          s && typeof r == "number")
        )
          return (
            e.unwrapDisallowed && n.children
              ? l.children.splice(r, 1, ...n.children)
              : l.children.splice(r, 1),
            r
          );
      });
    };
}
var vS = { exports: {} },
  Ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Om = Symbol.for("react.element"),
  Tm = Symbol.for("react.portal"),
  Ff = Symbol.for("react.fragment"),
  $f = Symbol.for("react.strict_mode"),
  zf = Symbol.for("react.profiler"),
  Bf = Symbol.for("react.provider"),
  Hf = Symbol.for("react.context"),
  YF = Symbol.for("react.server_context"),
  Uf = Symbol.for("react.forward_ref"),
  Wf = Symbol.for("react.suspense"),
  jf = Symbol.for("react.suspense_list"),
  Vf = Symbol.for("react.memo"),
  Gf = Symbol.for("react.lazy"),
  XF = Symbol.for("react.offscreen"),
  yS;
yS = Symbol.for("react.module.reference");
function er(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Om:
        switch (((e = e.type), e)) {
          case Ff:
          case zf:
          case $f:
          case Wf:
          case jf:
            return e;
          default:
            switch (((e = e && e.$$typeof), e)) {
              case YF:
              case Hf:
              case Uf:
              case Gf:
              case Vf:
              case Bf:
                return e;
              default:
                return t;
            }
        }
      case Tm:
        return t;
    }
  }
}
Ue.ContextConsumer = Hf;
Ue.ContextProvider = Bf;
Ue.Element = Om;
Ue.ForwardRef = Uf;
Ue.Fragment = Ff;
Ue.Lazy = Gf;
Ue.Memo = Vf;
Ue.Portal = Tm;
Ue.Profiler = zf;
Ue.StrictMode = $f;
Ue.Suspense = Wf;
Ue.SuspenseList = jf;
Ue.isAsyncMode = function () {
  return !1;
};
Ue.isConcurrentMode = function () {
  return !1;
};
Ue.isContextConsumer = function (e) {
  return er(e) === Hf;
};
Ue.isContextProvider = function (e) {
  return er(e) === Bf;
};
Ue.isElement = function (e) {
  return typeof e == "object" && e !== null && e.$$typeof === Om;
};
Ue.isForwardRef = function (e) {
  return er(e) === Uf;
};
Ue.isFragment = function (e) {
  return er(e) === Ff;
};
Ue.isLazy = function (e) {
  return er(e) === Gf;
};
Ue.isMemo = function (e) {
  return er(e) === Vf;
};
Ue.isPortal = function (e) {
  return er(e) === Tm;
};
Ue.isProfiler = function (e) {
  return er(e) === zf;
};
Ue.isStrictMode = function (e) {
  return er(e) === $f;
};
Ue.isSuspense = function (e) {
  return er(e) === Wf;
};
Ue.isSuspenseList = function (e) {
  return er(e) === jf;
};
Ue.isValidElementType = function (e) {
  return (
    typeof e == "string" ||
    typeof e == "function" ||
    e === Ff ||
    e === zf ||
    e === $f ||
    e === Wf ||
    e === jf ||
    e === XF ||
    (typeof e == "object" &&
      e !== null &&
      (e.$$typeof === Gf ||
        e.$$typeof === Vf ||
        e.$$typeof === Bf ||
        e.$$typeof === Hf ||
        e.$$typeof === Uf ||
        e.$$typeof === yS ||
        e.getModuleId !== void 0))
  );
};
Ue.typeOf = er;
vS.exports = Ue;
var ZF = vS.exports;
const JF = Ui(ZF);
function e$(e) {
  const t = e && typeof e == "object" && e.type === "text" ? e.value || "" : e;
  return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
}
function t$(e) {
  return e.join(" ").trim();
}
function n$(e, t) {
  const n = t || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " "))
    .trim();
}
var Im = { exports: {} },
  G3 = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
  r$ = /\n/g,
  i$ = /^\s*/,
  o$ = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
  l$ = /^:\s*/,
  u$ = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
  s$ = /^[;\s]*/,
  a$ = /^\s+|\s+$/g,
  c$ = `
`,
  q3 = "/",
  K3 = "*",
  po = "",
  f$ = "comment",
  d$ = "declaration",
  p$ = function (e, t) {
    if (typeof e != "string")
      throw new TypeError("First argument must be a string");
    if (!e) return [];
    t = t || {};
    var n = 1,
      r = 1;
    function i(E) {
      var S = E.match(r$);
      S && (n += S.length);
      var N = E.lastIndexOf(c$);
      r = ~N ? E.length - N : r + E.length;
    }
    function l() {
      var E = { line: n, column: r };
      return function (S) {
        return (S.position = new s(E)), d(), S;
      };
    }
    function s(E) {
      (this.start = E),
        (this.end = { line: n, column: r }),
        (this.source = t.source);
    }
    s.prototype.content = e;
    function a(E) {
      var S = new Error(t.source + ":" + n + ":" + r + ": " + E);
      if (
        ((S.reason = E),
        (S.filename = t.source),
        (S.line = n),
        (S.column = r),
        (S.source = e),
        !t.silent)
      )
        throw S;
    }
    function f(E) {
      var S = E.exec(e);
      if (S) {
        var N = S[0];
        return i(N), (e = e.slice(N.length)), S;
      }
    }
    function d() {
      f(i$);
    }
    function p(E) {
      var S;
      for (E = E || []; (S = g()); ) S !== !1 && E.push(S);
      return E;
    }
    function g() {
      var E = l();
      if (!(q3 != e.charAt(0) || K3 != e.charAt(1))) {
        for (
          var S = 2;
          po != e.charAt(S) && (K3 != e.charAt(S) || q3 != e.charAt(S + 1));

        )
          ++S;
        if (((S += 2), po === e.charAt(S - 1)))
          return a("End of comment missing");
        var N = e.slice(2, S - 2);
        return (
          (r += 2),
          i(N),
          (e = e.slice(S)),
          (r += 2),
          E({ type: f$, comment: N })
        );
      }
    }
    function v() {
      var E = l(),
        S = f(o$);
      if (S) {
        if ((g(), !f(l$))) return a("property missing ':'");
        var N = f(u$),
          y = E({
            type: d$,
            property: Q3(S[0].replace(G3, po)),
            value: N ? Q3(N[0].replace(G3, po)) : po,
          });
        return f(s$), y;
      }
    }
    function m() {
      var E = [];
      p(E);
      for (var S; (S = v()); ) S !== !1 && (E.push(S), p(E));
      return E;
    }
    return d(), m();
  };
function Q3(e) {
  return e ? e.replace(a$, po) : po;
}
var h$ = p$;
function wS(e, t) {
  var n = null;
  if (!e || typeof e != "string") return n;
  for (
    var r, i = h$(e), l = typeof t == "function", s, a, f = 0, d = i.length;
    f < d;
    f++
  )
    (r = i[f]),
      (s = r.property),
      (a = r.value),
      l ? t(s, a, r) : a && (n || (n = {}), (n[s] = a));
  return n;
}
Im.exports = wS;
Im.exports.default = wS;
var g$ = Im.exports;
const m$ = Ui(g$),
  Ag = {}.hasOwnProperty,
  v$ = new Set(["table", "thead", "tbody", "tfoot", "tr"]);
function xS(e, t) {
  const n = [];
  let r = -1,
    i;
  for (; ++r < t.children.length; )
    (i = t.children[r]),
      i.type === "element"
        ? n.push(y$(e, i, r, t))
        : i.type === "text"
        ? (t.type !== "element" || !v$.has(t.tagName) || !e$(i)) &&
          n.push(i.value)
        : i.type === "raw" && !e.options.skipHtml && n.push(i.value);
  return n;
}
function y$(e, t, n, r) {
  const i = e.options,
    l = i.transformLinkUri === void 0 ? wN : i.transformLinkUri,
    s = e.schema,
    a = t.tagName,
    f = {};
  let d = s,
    p;
  if (
    (s.space === "html" && a === "svg" && ((d = KF), (e.schema = d)),
    t.properties)
  )
    for (p in t.properties)
      Ag.call(t.properties, p) && x$(f, p, t.properties[p], e);
  (a === "ol" || a === "ul") && e.listDepth++;
  const g = xS(e, t);
  (a === "ol" || a === "ul") && e.listDepth--, (e.schema = s);
  const v = t.position || {
      start: { line: null, column: null, offset: null },
      end: { line: null, column: null, offset: null },
    },
    m = i.components && Ag.call(i.components, a) ? i.components[a] : a,
    E = typeof m == "string" || m === qe.Fragment;
  if (!JF.isValidElementType(m))
    throw new TypeError(
      `Component for name \`${a}\` not defined or is not renderable`
    );
  if (
    ((f.key = n),
    a === "a" &&
      i.linkTarget &&
      (f.target =
        typeof i.linkTarget == "function"
          ? i.linkTarget(
              String(f.href || ""),
              t.children,
              typeof f.title == "string" ? f.title : null
            )
          : i.linkTarget),
    a === "a" &&
      l &&
      (f.href = l(
        String(f.href || ""),
        t.children,
        typeof f.title == "string" ? f.title : null
      )),
    !E &&
      a === "code" &&
      r.type === "element" &&
      r.tagName !== "pre" &&
      (f.inline = !0),
    !E &&
      (a === "h1" ||
        a === "h2" ||
        a === "h3" ||
        a === "h4" ||
        a === "h5" ||
        a === "h6") &&
      (f.level = Number.parseInt(a.charAt(1), 10)),
    a === "img" &&
      i.transformImageUri &&
      (f.src = i.transformImageUri(
        String(f.src || ""),
        String(f.alt || ""),
        typeof f.title == "string" ? f.title : null
      )),
    !E && a === "li" && r.type === "element")
  ) {
    const S = w$(t);
    (f.checked = S && S.properties ? !!S.properties.checked : null),
      (f.index = ph(r, t)),
      (f.ordered = r.tagName === "ol");
  }
  return (
    !E &&
      (a === "ol" || a === "ul") &&
      ((f.ordered = a === "ol"), (f.depth = e.listDepth)),
    (a === "td" || a === "th") &&
      (f.align &&
        (f.style || (f.style = {}),
        (f.style.textAlign = f.align),
        delete f.align),
      E || (f.isHeader = a === "th")),
    !E &&
      a === "tr" &&
      r.type === "element" &&
      (f.isHeader = r.tagName === "thead"),
    i.sourcePos && (f["data-sourcepos"] = E$(v)),
    !E && i.rawSourcePos && (f.sourcePosition = t.position),
    !E &&
      i.includeElementIndex &&
      ((f.index = ph(r, t)), (f.siblingCount = ph(r))),
    E || (f.node = t),
    g.length > 0 ? qe.createElement(m, f, g) : qe.createElement(m, f)
  );
}
function w$(e) {
  let t = -1;
  for (; ++t < e.children.length; ) {
    const n = e.children[t];
    if (n.type === "element" && n.tagName === "input") return n;
  }
  return null;
}
function ph(e, t) {
  let n = -1,
    r = 0;
  for (; ++n < e.children.length && e.children[n] !== t; )
    e.children[n].type === "element" && r++;
  return r;
}
function x$(e, t, n, r) {
  const i = jF(r.schema, t);
  let l = n;
  l == null ||
    l !== l ||
    (Array.isArray(l) && (l = i.commaSeparated ? n$(l) : t$(l)),
    i.property === "style" && typeof l == "string" && (l = S$(l)),
    i.space && i.property
      ? (e[Ag.call(V3, i.property) ? V3[i.property] : i.property] = l)
      : i.attribute && (e[i.attribute] = l));
}
function S$(e) {
  const t = {};
  try {
    m$(e, n);
  } catch {}
  return t;
  function n(r, i) {
    const l = r.slice(0, 4) === "-ms-" ? `ms-${r.slice(4)}` : r;
    t[l.replace(/-([a-z])/g, C$)] = i;
  }
}
function C$(e, t) {
  return t.toUpperCase();
}
function E$(e) {
  return [e.start.line, ":", e.start.column, "-", e.end.line, ":", e.end.column]
    .map(String)
    .join("");
}
const Y3 = {}.hasOwnProperty,
  k$ = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  Da = {
    plugins: { to: "remarkPlugins", id: "change-plugins-to-remarkplugins" },
    renderers: { to: "components", id: "change-renderers-to-components" },
    astPlugins: { id: "remove-buggy-html-in-markdown-parser" },
    allowDangerousHtml: { id: "remove-buggy-html-in-markdown-parser" },
    escapeHtml: { id: "remove-buggy-html-in-markdown-parser" },
    source: { to: "children", id: "change-source-to-children" },
    allowNode: {
      to: "allowElement",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
    },
    allowedTypes: {
      to: "allowedElements",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
    },
    disallowedTypes: {
      to: "disallowedElements",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
    },
    includeNodeIndex: {
      to: "includeElementIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
  };
function SS(e) {
  for (const l in Da)
    if (Y3.call(Da, l) && Y3.call(e, l)) {
      const s = Da[l];
      console.warn(
        `[react-markdown] Warning: please ${
          s.to ? `use \`${s.to}\` instead of` : "remove"
        } \`${l}\` (see <${k$}#${s.id}> for more info)`
      ),
        delete Da[l];
    }
  const t = LN()
      .use(jM)
      .use(e.remarkPlugins || [])
      .use(LF, { ...e.remarkRehypeOptions, allowDangerousHtml: !0 })
      .use(e.rehypePlugins || [])
      .use(QF, e),
    n = new zx();
  typeof e.children == "string"
    ? (n.value = e.children)
    : e.children !== void 0 &&
      e.children !== null &&
      console.warn(
        `[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`
      );
  const r = t.runSync(t.parse(n), n);
  if (r.type !== "root") throw new TypeError("Expected a `root` node");
  let i = qe.createElement(
    qe.Fragment,
    {},
    xS({ options: e, schema: qF, listDepth: 0 }, r)
  );
  return (
    e.className && (i = qe.createElement("div", { className: e.className }, i)),
    i
  );
}
SS.propTypes = {
  children: Se.string,
  className: Se.string,
  allowElement: Se.func,
  allowedElements: Se.arrayOf(Se.string),
  disallowedElements: Se.arrayOf(Se.string),
  unwrapDisallowed: Se.bool,
  remarkPlugins: Se.arrayOf(
    Se.oneOfType([
      Se.object,
      Se.func,
      Se.arrayOf(
        Se.oneOfType([
          Se.bool,
          Se.string,
          Se.object,
          Se.func,
          Se.arrayOf(Se.any),
        ])
      ),
    ])
  ),
  rehypePlugins: Se.arrayOf(
    Se.oneOfType([
      Se.object,
      Se.func,
      Se.arrayOf(
        Se.oneOfType([
          Se.bool,
          Se.string,
          Se.object,
          Se.func,
          Se.arrayOf(Se.any),
        ])
      ),
    ])
  ),
  sourcePos: Se.bool,
  rawSourcePos: Se.bool,
  skipHtml: Se.bool,
  includeElementIndex: Se.bool,
  transformLinkUri: Se.oneOfType([Se.func, Se.bool]),
  linkTarget: Se.oneOfType([Se.func, Se.string]),
  transformImageUri: Se.func,
  components: Se.object,
};
const b$ = () =>
    K("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "#ffffff",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        D("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        D("circle", { cx: "12", cy: "12", r: "9" }),
        D("polyline", { points: "12 7 12 12 15 15" }),
      ],
    }),
  _$ = ({ item: e, inventoryType: t, style: n }, r) => {
    const i = Ar((d) => d.inventory.additionalMetadata),
      l = A.useMemo(() => Ve[e.name], [e]),
      s = A.useMemo(
        () =>
          e.ingredients
            ? Object.entries(e.ingredients).sort((d, p) => d[1] - p[1])
            : null,
        [e]
      ),
      a = e.metadata?.description || l?.description,
      f = l?.ammoName && Ve[l?.ammoName]?.label;
    return l
      ? D("div", {
          className: "tooltip-container",
          ref: r,
          style: n,
          children: K("div", {
            className: "tooltip-content",
            children: [
              D("div", {
                className: "tooltip-header",
                children: K("div", {
                  className: "tooltip-item-info",
                  children: [
                    D("div", {
                      className: "tooltip-item-icon",
                      children: D("img", {
                        src: So(e.name),
                        alt: e.metadata?.label || l.label || e.name,
                        onError: (d) => {
                          d.currentTarget.style.display = "none";
                        },
                      }),
                    }),
                    K("div", {
                      className: "tooltip-item-details",
                      children: [
                        D("h3", {
                          className: "tooltip-item-name",
                          children: e.metadata?.label || l.label || e.name,
                        }),
                        D("span", {
                          className: "tooltip-item-type",
                          children:
                            t === "crafting"
                              ? K("div", {
                                  className: "tooltip-crafting-info",
                                  children: [
                                    D(b$, {}),
                                    K("span", {
                                      children: [
                                        (e.duration !== void 0
                                          ? e.duration
                                          : 3e3) / 1e3,
                                        "s",
                                      ],
                                    }),
                                  ],
                                })
                              : e.name.toLowerCase().startsWith("weapon_")
                              ? "Weapon"
                              : "Item",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              a &&
                D("div", {
                  className: "tooltip-description",
                  children: D(SS, {
                    className: "tooltip-markdown",
                    children: a,
                  }),
                }),
              t !== "crafting" &&
                K("div", {
                  className: "tooltip-stats",
                  children: [
                    e.durability !== void 0 &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ui_durability, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: Math.trunc(e.durability),
                          }),
                        ],
                      }),
                    e.metadata?.ammo !== void 0 &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ui_ammo, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: e.metadata.ammo,
                          }),
                        ],
                      }),
                    f &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ammo_type, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: f,
                          }),
                        ],
                      }),
                    e.metadata?.serial &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ui_serial, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: e.metadata.serial,
                          }),
                        ],
                      }),
                    e.metadata?.components &&
                      e.metadata?.components[0] &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ui_components, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: (e.metadata?.components).map((d, p, g) =>
                              p + 1 === g.length
                                ? Ve[d]?.label
                                : Ve[d]?.label + ", "
                            ),
                          }),
                        ],
                      }),
                    e.metadata?.weapontint &&
                      K("div", {
                        className: "tooltip-stat",
                        children: [
                          K("span", {
                            className: "tooltip-stat-label",
                            children: [Ge.ui_tint, ":"],
                          }),
                          D("span", {
                            className: "tooltip-stat-value",
                            children: e.metadata.weapontint,
                          }),
                        ],
                      }),
                    i.map((d, p) =>
                      D(
                        A.Fragment,
                        {
                          children:
                            e.metadata &&
                            e.metadata[d.metadata] &&
                            K("div", {
                              className: "tooltip-stat",
                              children: [
                                K("span", {
                                  className: "tooltip-stat-label",
                                  children: [d.value, ":"],
                                }),
                                D("span", {
                                  className: "tooltip-stat-value",
                                  children: e.metadata[d.metadata],
                                }),
                              ],
                            }),
                        },
                        `metadata-${p}`
                      )
                    ),
                  ],
                }),
              t === "crafting" &&
                s &&
                K("div", {
                  className: "tooltip-ingredients",
                  children: [
                    D("h4", {
                      className: "tooltip-ingredients-title",
                      children: "Ingredients:",
                    }),
                    D("div", {
                      className: "tooltip-ingredients-list",
                      children: s.map((d) => {
                        const [p, g] = [d[0], d[1]];
                        return K(
                          "div",
                          {
                            className: "tooltip-ingredient",
                            children: [
                              D("div", {
                                className: "tooltip-ingredient-icon",
                                children: D("img", {
                                  src: p ? So(p) : "none",
                                  alt: "ingredient",
                                  onError: (v) => {
                                    v.currentTarget.style.display = "none";
                                  },
                                }),
                              }),
                              D("span", {
                                className: "tooltip-ingredient-text",
                                children:
                                  g >= 1
                                    ? `${g}x ${Ve[p]?.label || p}`
                                    : g === 0
                                    ? `${Ve[p]?.label || p}`
                                    : g < 1 &&
                                      `${g * 100}% ${Ve[p]?.label || p}`,
                              }),
                            ],
                          },
                          `ingredient-${p}`
                        );
                      }),
                    }),
                  ],
                }),
            ],
          }),
        })
      : D("div", {
          className: "tooltip-container",
          ref: r,
          style: n,
          children: D("div", {
            className: "tooltip-content",
            children: D("div", {
              className: "tooltip-header",
              children: K("div", {
                className: "tooltip-item-info",
                children: [
                  D("div", { className: "tooltip-item-icon-placeholder" }),
                  D("div", {
                    className: "tooltip-item-details",
                    children: D("h3", {
                      className: "tooltip-item-name",
                      children: e.name,
                    }),
                  }),
                ],
              }),
            }),
          }),
        });
  },
  O$ = qe.forwardRef(_$),
  T$ = () => {
    const e = Ar((a) => a.tooltip),
      {
        refs: t,
        context: n,
        floatingStyles: r,
      } = Px({
        middleware: [qA(), GA(), VA({ mainAxis: 10, crossAxis: 10 })],
        open: e.open,
        placement: "right-start",
      }),
      { isMounted: i, styles: l } = Rx(n, { duration: 200 }),
      s = ({ clientX: a, clientY: f }) => {
        t.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: a,
              y: f,
              left: a,
              top: f,
              right: a,
              bottom: f,
            };
          },
        });
      };
    return (
      A.useEffect(
        () => (
          window.addEventListener("mousemove", s),
          () => {
            window.removeEventListener("mousemove", s);
          }
        ),
        []
      ),
      D($t, {
        children:
          i &&
          e.item &&
          e.inventoryType &&
          D(Tx, {
            children: D(O$, {
              ref: t.setFloating,
              style: { ...r, ...l },
              item: e.item,
              inventoryType: e.inventoryType,
            }),
          }),
      })
    );
  },
  I$ = (e) => {
    const t = document.createElement("input");
    (t.value = e),
      document.body.appendChild(t),
      t.select(),
      document.execCommand("copy"),
      document.body.removeChild(t);
  },
  P$ = ({ themeSettings: e }) => {
    const t = Ao(),
      n = Ar((y) => y.contextMenu),
      r = n.item,
      i = A.useRef(null),
      [l, s] = A.useState({ x: 0, y: 0 }),
      [a, f] = A.useState(""),
      [d, p] = A.useState(null),
      g = A.useCallback(() => {
        t(rm());
      }, [t]),
      v = (y) => {
        const x = {
          width: "200px",
          height: y === "submenu" ? "36px" : "30px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          fontSize: y === "submenu" ? "13px" : "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0",
          background: "rgba(255, 255, 255, 0.05)",
          color: y === "submenu" ? "#bbb" : "#ccc",
        };
        return y === "submenu"
          ? {
              ...x,
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }
          : x;
      },
      m = (y) =>
        y === "submenu"
          ? {
              background: "rgba(255, 255, 255, 0.08)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }
          : {
              background: e.buttonGradients.gradient,
              boxShadow: `0 4px 12px ${e.buttonGradients.shadow}`,
              transform: "translateY(-1px)",
              color: e.buttonGradients.text,
            },
      E = (y, x) => {
        const k = v(x);
        return d === y ? { ...k, ...m(x) } : k;
      };
    A.useEffect(() => {
      const y = (x) => {
        i.current && !i.current.contains(x.target) && g();
      };
      if (n.coords) {
        const x = setTimeout(() => {
          document.addEventListener("mousedown", y),
            document.addEventListener("contextmenu", y);
        }, 100);
        return () => {
          clearTimeout(x),
            document.removeEventListener("mousedown", y),
            document.removeEventListener("contextmenu", y);
        };
      }
    }, [n.coords, g]),
      A.useEffect(() => {
        const y = (x) => {
          x.key === "Escape" && (x.preventDefault(), g());
        };
        return (
          n.coords && document.addEventListener("keydown", y),
          () => {
            document.removeEventListener("keydown", y);
          }
        );
      }, [n.coords, g]),
      A.useEffect(() => {
        const y = () => {
          g();
        };
        return (
          n.coords && window.addEventListener("scroll", y, !0),
          () => {
            window.removeEventListener("scroll", y, !0);
          }
        );
      }, [n.coords, g]),
      A.useEffect(() => {
        const y = () => {
          g();
        };
        return (
          n.coords && window.addEventListener("resize", y),
          () => {
            window.removeEventListener("resize", y);
          }
        );
      }, [n.coords, g]),
      A.useEffect(() => {
        if (n.coords && i.current) {
          const y = i.current.getBoundingClientRect(),
            x = window.innerWidth,
            k = window.innerHeight;
          let I = n.coords.x,
            M = n.coords.y,
            P = "";
          I + y.width > x &&
            ((I = n.coords.x - y.width), (P += "position-left ")),
            M + y.height > k &&
              ((M = n.coords.y - y.height), (P += "position-top ")),
            (I = Math.max(0, I)),
            (M = Math.max(0, M)),
            s({ x: I, y: M }),
            f(P.trim());
        }
      }, [n.coords]);
    const S = A.useCallback(
        (y) => {
          if (r) {
            event?.stopPropagation();
            try {
              switch (y && y.action) {
                case "use":
                  im({ name: r.name, slot: r.slot });
                  break;
                case "give":
                  tx({ name: r.name, slot: r.slot });
                  break;
                case "drop":
                  Gt(r) && Eg({ item: r, inventory: "player" });
                  break;
                case "remove":
                  _n("removeComponent", {
                    component: y?.component,
                    slot: y?.slot,
                  });
                  break;
                case "removeAmmo":
                  _n("removeAmmo", r.slot);
                  break;
                case "copy":
                  I$(y.serial || "");
                  break;
                case "custom":
                  _n("useButton", { id: (y?.id || 0) + 1, slot: r.slot });
                  break;
              }
            } catch (x) {
              console.error("Error handling context menu action:", x);
            } finally {
              g();
            }
          }
        },
        [r, g]
      ),
      N = (y) =>
        y.reduce((x, k, I) => {
          if (k.group) {
            const M = x.findIndex((P) => P.groupName === k.group);
            M !== -1
              ? x[M].buttons.push({ ...k, index: I })
              : x.push({ groupName: k.group, buttons: [{ ...k, index: I }] });
          } else x.push({ groupName: null, buttons: [{ ...k, index: I }] });
          return x;
        }, []);
    return !r || !n.coords
      ? null
      : K("div", {
          ref: i,
          className: `inventory-context ${a}`,
          style: { left: l.x, top: l.y },
          onClick: (y) => y.stopPropagation(),
          onContextMenu: (y) => y.preventDefault(),
          children: [
            K("div", {
              className: "context-header",
              children: [
                K("div", {
                  className: "header-top",
                  children: [
                    D("div", {
                      className: "item-icon",
                      children: D("img", {
                        src: Ve[r.name]?.image || "/default-item.png",
                        alt: r.name,
                      }),
                    }),
                    K("div", {
                      className: "item-info",
                      children: [
                        D("h3", {
                          className: "item-name",
                          children: Ve[r.name]?.label || r.name,
                        }),
                        D("p", { className: "item-type", children: "Item" }),
                      ],
                    }),
                  ],
                }),
                Ve[r.name]?.description &&
                  D("p", {
                    className: "item-description",
                    children: Ve[r.name]?.description,
                  }),
              ],
            }),
            K("div", {
              className: "context-actions",
              children: [
                D("button", {
                  style: E("use", "primary"),
                  onClick: () => S({ action: "use" }),
                  onMouseEnter: () => p("use"),
                  onMouseLeave: () => p(null),
                  children: Ge.ui_use || "Use",
                }),
                D("button", {
                  style: E("give", "secondary"),
                  onClick: () => S({ action: "give" }),
                  onMouseEnter: () => p("give"),
                  onMouseLeave: () => p(null),
                  children: Ge.ui_give || "Give",
                }),
                D("button", {
                  style: E("drop", "secondary"),
                  onClick: () => S({ action: "drop" }),
                  onMouseEnter: () => p("drop"),
                  onMouseLeave: () => p(null),
                  children: Ge.ui_drop || "Drop",
                }),
                r.metadata?.ammo > 0 &&
                  D("button", {
                    style: E("removeAmmo", "secondary"),
                    onClick: () => S({ action: "removeAmmo" }),
                    onMouseEnter: () => p("removeAmmo"),
                    onMouseLeave: () => p(null),
                    children: Ge.ui_remove_ammo || "Remove Ammo",
                  }),
                r.metadata?.serial &&
                  D("button", {
                    style: E("copy", "secondary"),
                    onClick: () =>
                      S({ action: "copy", serial: r.metadata?.serial }),
                    onMouseEnter: () => p("copy"),
                    onMouseLeave: () => p(null),
                    children: Ge.ui_copy || "Copy Serial",
                  }),
                r.metadata?.components &&
                  r.metadata?.components.length > 0 &&
                  K("div", {
                    className: "context-submenu",
                    children: [
                      D("div", {
                        className: "submenu-header",
                        children:
                          Ge.ui_removeattachments || "Remove Attachments",
                      }),
                      r.metadata.components.map((y, x) =>
                        D(
                          "button",
                          {
                            style: E(`component-${x}`, "submenu"),
                            onClick: () =>
                              S({
                                action: "remove",
                                component: y,
                                slot: r.slot,
                              }),
                            onMouseEnter: () => p(`component-${x}`),
                            onMouseLeave: () => p(null),
                            children: Ve[y]?.label || y,
                          },
                          x
                        )
                      ),
                    ],
                  }),
                ((r.name && Ve[r.name]?.buttons?.length) || 0) > 0 &&
                  D("div", {
                    className: "context-custom-buttons",
                    children: N(Ve[r.name]?.buttons).map((y, x) =>
                      D(
                        qe.Fragment,
                        {
                          children: y.groupName
                            ? K("div", {
                                className: "context-submenu",
                                children: [
                                  D("div", {
                                    className: "submenu-header",
                                    children: y.groupName,
                                  }),
                                  y.buttons.map((k) =>
                                    D(
                                      "button",
                                      {
                                        style: E(
                                          `custom-grouped-${k.index}`,
                                          "submenu"
                                        ),
                                        onClick: () =>
                                          S({ action: "custom", id: k.index }),
                                        onMouseEnter: () =>
                                          p(`custom-grouped-${k.index}`),
                                        onMouseLeave: () => p(null),
                                        children: k.label,
                                      },
                                      k.index
                                    )
                                  ),
                                ],
                              })
                            : y.buttons.map((k) =>
                                D(
                                  "button",
                                  {
                                    style: E(`custom-${k.index}`, "secondary"),
                                    onClick: () =>
                                      S({ action: "custom", id: k.index }),
                                    onMouseEnter: () => p(`custom-${k.index}`),
                                    onMouseLeave: () => p(null),
                                    children: k.label,
                                  },
                                  k.index
                                )
                              ),
                        },
                        x
                      )
                    ),
                  }),
              ],
            }),
          ],
        });
  },
  CS = (e) => {
    const t = A.useRef(null);
    return D(Mx, {
      in: e.in,
      nodeRef: t,
      classNames: "transition-fade",
      timeout: 200,
      unmountOnExit: !0,
      children: D("span", { ref: t, children: e.children }),
    });
  },
  R$ = ({ inventory: e, themeSettings: t, Texts: n }) =>
    D($t, {
      children: K("div", {
        className: "hotinventory-grid-wrapper",
        children: [
          K("div", {
            className: "label-container",
            children: [
              K("svg", {
                width: "52",
                height: "52",
                viewBox: "0 0 52 52",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  D("path", {
                    d: "M24 1.1547C25.2376 0.440169 26.7624 0.440169 28 1.1547L46.5167 11.8453C47.7543 12.5598 48.5167 13.8803 48.5167 15.3094V36.6906C48.5167 38.1197 47.7543 39.4402 46.5167 40.1547L28 50.8453C26.7624 51.5598 25.2376 51.5598 24 50.8453L5.48334 40.1547C4.24573 39.4402 3.48334 38.1197 3.48334 36.6906L3.48334 15.3094C3.48334 13.8803 4.24574 12.5598 5.48334 11.8453L24 1.1547Z",
                    fill: t.PrimaryColor,
                    fillOpacity: "0.2",
                  }),
                  D("path", {
                    d: "M24.75 7.29883C25.5235 6.85232 26.4765 6.85232 27.25 7.29883L41.5703 15.5674C42.3438 16.014 42.8203 16.8393 42.8203 17.7324V34.2676C42.8203 35.1607 42.3438 35.986 41.5703 36.4326L27.25 44.7012C26.5249 45.1197 25.6423 45.1455 24.8975 44.7793L24.75 44.7012L10.4297 36.4326C9.6562 35.986 9.17969 35.1607 9.17969 34.2676L9.17969 17.7324C9.17969 16.8393 9.6562 16.014 10.4297 15.5674L24.75 7.29883Z",
                    fill: t.PrimaryColor,
                    stroke: t.PrimaryColor,
                  }),
                  D("path", {
                    d: "M32.734 32.2036C32.6856 32.3509 32.57 32.5142 32.3805 32.5692C32.2437 32.609 27.7172 33.9151 27.5779 33.9515C27.1794 34.0573 26.9024 33.9794 26.7205 33.8195C26.4435 33.5765 23.2426 31.4071 19.2047 31.2022C18.7731 31.1811 18.9846 29.5508 20.2184 29.5508C21.0639 29.5508 23.5358 30.1628 23.834 29.8648C24.0643 29.6346 24.1688 28.2743 23.2078 25.9009L21.2746 21.1294C21.1968 20.9141 21.2058 20.6771 21.2996 20.4682C21.3935 20.2594 21.565 20.0949 21.778 20.0093C21.9911 19.9237 22.2291 19.9237 22.4422 20.0093C22.6552 20.0949 22.8267 20.2594 22.9206 20.4683L24.6081 24.632C24.7721 25.0383 24.9743 25.1924 25.1944 25.1077C25.3907 25.0332 25.4315 24.9029 25.3125 24.5076L23.574 19.4051C23.5364 19.2953 23.521 19.1792 23.5285 19.0634C23.536 18.9476 23.5664 18.8345 23.6178 18.7304C23.6693 18.6263 23.7408 18.5333 23.8284 18.4568C23.9159 18.3803 24.0177 18.3217 24.128 18.2844C24.2383 18.2468 24.355 18.2312 24.4713 18.2385C24.5877 18.2459 24.7014 18.2761 24.806 18.3274C24.9106 18.3787 25.0041 18.45 25.0809 18.5374C25.1578 18.6247 25.2166 18.7263 25.2539 18.8363L26.9075 23.6882C27.0536 24.1148 27.2083 24.3383 27.453 24.235C27.6 24.1732 27.5898 23.9489 27.5507 23.7534L26.39 19.1224C26.3581 19.0086 26.3494 18.8895 26.3645 18.7722C26.3795 18.655 26.418 18.5419 26.4777 18.4397C26.5374 18.3375 26.617 18.2483 26.7119 18.1773C26.8068 18.1063 26.915 18.055 27.0302 18.0263C27.1453 17.9977 27.265 17.9924 27.3823 18.0106C27.4995 18.0288 27.6119 18.0703 27.7128 18.1326C27.8137 18.1948 27.901 18.2766 27.9697 18.373C28.0383 18.4695 28.0868 18.5787 28.1124 18.6941L29.183 22.9619C29.3394 23.5892 29.483 23.8152 29.7319 23.7534C29.986 23.6916 29.9741 23.4834 29.9393 23.3115L29.1983 19.6481C29.168 19.4443 29.2174 19.2367 29.3363 19.0681C29.4552 18.8995 29.6346 18.7828 29.8373 18.7421C30.04 18.7014 30.2507 18.7397 30.4259 18.8492C30.6011 18.9588 30.7274 19.1311 30.7788 19.3306L31.5843 23.3183L31.5852 23.3192V23.32L32.0678 25.7112C32.1732 26.1624 32.2938 26.5873 32.4502 27.0038C33.3721 29.4492 32.8912 31.7135 32.734 32.2036Z",
                    fill: "#121212",
                  }),
                ],
              }),
              K("div", {
                className: "text-content",
                children: [
                  D("div", { className: "label", children: n.Hotbar }),
                  D("div", {
                    className: "label2",
                    children: n.HotbarDescription,
                  }),
                ],
              }),
            ],
          }),
          D("div", {
            className: "hotinventory-grid-container",
            children: D($t, {
              children: e.items.slice(0, 5).map((r, i) =>
                D(
                  ym,
                  {
                    item: r,
                    inventoryType: e.type,
                    inventoryGroups: e.groups,
                    inventoryId: e.id,
                    themeSettings: t,
                  },
                  `${e.type}-${e.id}-${r.slot}`
                )
              ),
            }),
          }),
        ],
      }),
    }),
  A$ = ({ themeSettings: e, Texts: t }) => {
    const n = Ar(nm);
    return D(R$, { inventory: n, themeSettings: e, Texts: t });
  };
class D$ {
  canvas;
  ctx;
  particles = [];
  mouse = { x: 0, y: 0, px: 0, py: 0 };
  lastTime = 0;
  animationId;
  resizeHandler;
  mouseMoveHandler;
  color;
  constructor(t) {
    (this.color = t),
      (this.canvas = document.createElement("canvas")),
      (this.ctx = this.canvas.getContext("2d")),
      (this.canvas.style.position = "fixed"),
      (this.canvas.style.top = "0"),
      (this.canvas.style.left = "0"),
      (this.canvas.style.pointerEvents = "none"),
      (this.canvas.style.zIndex = "9999"),
      document.body.appendChild(this.canvas),
      this.resize(),
      (this.resizeHandler = () => this.resize()),
      (this.mouseMoveHandler = (n) => {
        (this.mouse.px = this.mouse.x),
          (this.mouse.py = this.mouse.y),
          (this.mouse.x = n.clientX),
          (this.mouse.y = n.clientY);
        const r = this.mouse.x - this.mouse.px,
          i = this.mouse.y - this.mouse.py;
        if (Math.sqrt(r * r + i * i) > 0)
          for (let s = 0; s < 3; s++)
            this.particles.push(
              new N$(
                this.mouse.x + (Math.random() - 0.5) * 10,
                this.mouse.y + (Math.random() - 0.5) * 10,
                Math.random() * 2 + 2
              )
            );
      }),
      window.addEventListener("resize", this.resizeHandler),
      window.addEventListener("mousemove", this.mouseMoveHandler),
      (this.animationId = requestAnimationFrame((n) => this.animate(n)));
  }
  resize() {
    (this.canvas.width = window.innerWidth),
      (this.canvas.height = window.innerHeight);
  }
  animate(t) {
    this.lastTime === 0 && (this.lastTime = t);
    const n = (t - this.lastTime) / 1e3;
    (this.lastTime = t),
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let r = this.particles.length - 1; r >= 0; r--) {
      const i = this.particles[r];
      if ((i.update(n), i.life <= 0)) {
        this.particles.splice(r, 1);
        continue;
      }
      this.ctx.beginPath(), this.ctx.arc(i.x, i.y, i.size, 0, Math.PI * 2);
      const l = this.ctx.createRadialGradient(i.x, i.y, 0, i.x, i.y, i.size);
      l.addColorStop(
        0,
        `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${i.life})`
      ),
        l.addColorStop(
          0.4,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
            i.life * 0.5
          })`
        ),
        l.addColorStop(
          1,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`
        ),
        (this.ctx.fillStyle = l),
        this.ctx.fill();
    }
    this.animationId = requestAnimationFrame((r) => this.animate(r));
  }
  destroy() {
    this.animationId && cancelAnimationFrame(this.animationId),
      window.removeEventListener("resize", this.resizeHandler),
      window.removeEventListener("mousemove", this.mouseMoveHandler),
      this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas),
      (this.particles = []);
  }
}
class N$ {
  constructor(t, n, r) {
    (this.x = t),
      (this.y = n),
      (this.size = r),
      (this.velocity = {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
      });
  }
  life = 1;
  velocity;
  gravity = 150;
  drag = 0.95;
  update(t) {
    (this.life -= t * 1.5),
      (this.velocity.x *= this.drag),
      (this.velocity.y *= this.drag),
      (this.velocity.y += this.gravity * t),
      (this.x += this.velocity.x * t),
      (this.y += this.velocity.y * t),
      (this.size *= 0.95);
  }
}
const L$ = () => {
    const [e, t] = A.useState(!1),
      n = Ao(),
      r = A.useRef(null),
      [i, l] = A.useState(!1),
      [s, a] = A.useState(!1),
      [f, d] = A.useState({ r: 0, g: 0, b: 0 }),
      [p, g] = A.useState({
        PrimaryColor: "#360a7eff",
        buttonGradients: {
          gradient: "linear-gradient(135deg, #D34242 0%, #D55858 100%)",
          shadow: "rgba(205 50 50 / 0.4)",
          text: "#000",
        },
        money: { money: "#BEEE11", blackMoney: "#EE1111" },
      }),
      [v, m] = A.useState({
        Header: "INVENTÁRIO",
        Pockets: "BOLSOS",
        PocketsDescription: "Itens no seu personagem",
        Hotbar: "HOTBAR",
        HotbarDescription: "Equipe seus itens rapidamente",
        Secondary: "SECUNDÁRIO",
        SecondaryDescription: "Armazene ativos necessários",
        Close_header_1: "Fechar",
        Close_header_2: "Inventário",
      });
    Sn("setInventoryVisible", t),
      Sn("closeInventory", () => {
        t(!1), n(rm()), n(Fu());
      }),
      sN(t),
      Sn("setupInventory", (S) => {
        n(Z5(S)),
          S.ThemeSettings && g(S.ThemeSettings),
          !e && t(!0),
          l(S.mouseTrailActive.enabled),
          d(S.mouseTrailActive.color),
          m(S.Texts),
          a(S.UseNativeLabeling);
      }),
      Sn("refreshSlots", (S) => n(_R(S))),
      Sn("updateThemePrism", (S) => {
        g(S.ThemeSettings);
      }),
      Sn("displayMetadata", (S) => {
        n(xR(S));
      }),
      A.useEffect(
        () => (
          i &&
            (e
              ? (r.current = new D$(f))
              : r.current && (r.current.destroy(), (r.current = null))),
          () => {
            r.current && (r.current.destroy(), (r.current = null));
          }
        ),
        [e]
      );
    const E = A.useMemo(() => {
      const S = `
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1920" height="1080" fill="#04040B" fill-opacity="0.86"/>
        <rect width="1920" height="1080" fill="url(#paint0_radial_2001_2)" fill-opacity="0.63"/>
        <rect x="1920" y="1080" width="1920" height="1080" transform="rotate(180 1920 1080)" fill="url(#paint1_radial_2001_2)"/>
        <defs>
          <radialGradient id="paint0_radial_2001_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2201 1708.5) rotate(-106.683) scale(1701.63 10273)">
            <stop stop-color="${p.PrimaryColor}"/>
            <stop offset="1" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="paint1_radial_2001_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4121 2788.5) rotate(-102.28) scale(1321.23 7976.45)">
            <stop stop-color="${p.PrimaryColor}" stop-opacity="0.4"/>
            <stop offset="1" stop-opacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    `
        .replace(/\s+/g, " ")
        .trim();
      return `url('data:image/svg+xml;utf8,${encodeURIComponent(S)}')`;
    }, [p.PrimaryColor]);
    return K($t, {
      children: [
        D(CS, {
          in: e,
          children: K("div", {
            className: "inventory-wrapper",
            style: {
              background: E,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            },
            children: [
              K("div", {
                className: "playerinventory",
                children: [
                  D(yN, { themeSettings: p, Texts: v }),
                  D(A$, { themeSettings: p, Texts: v }),
                ],
              }),
              D(HD, {}),
              D("div", {
                className: "secondaryinventory",
                children: D(mN, {
                  themeSettings: p,
                  Texts: v,
                  UseNativeLabeling: s,
                }),
              }),
              D(T$, {}),
              D(P$, { themeSettings: p }),
            ],
          }),
        }),
        D(lN, { themeSettings: p }),
      ],
    });
  },
  Dg = (e, t) => ({ x: e.x - t.x, y: e.y - t.y }),
  M$ = (e) => {
    const t = e.getInitialClientOffset(),
      n = e.getInitialSourceClientOffset();
    return t === null || n === null || t.x === void 0 || t.y === void 0
      ? { x: 0, y: 0 }
      : Dg(t, n);
  },
  F$ = (e, t) => {
    const n = e.getClientOffset();
    if (n === null) return null;
    if (!t.current || !t.current.getBoundingClientRect) return Dg(n, M$(e));
    const r = t.current.getBoundingClientRect(),
      i = { x: r.width / 2, y: r.height / 2 };
    return Dg(n, i);
  },
  $$ = () => {
    const e = A.useRef(null),
      {
        data: t,
        isDragging: n,
        currentOffset: r,
      } = cP((i) => ({
        data: i.getItem(),
        currentOffset: F$(i, e),
        isDragging: i.isDragging(),
      }));
    return D($t, {
      children:
        n &&
        r &&
        t.item &&
        D("div", {
          className: "item-drag-preview",
          ref: e,
          style: {
            transform: `translate(${r.x}px, ${r.y}px)`,
            backgroundImage: t.image,
          },
        }),
    });
  },
  z$ = (e) => {
    const [t, n] = A.useState(!1),
      r = A.useCallback(
        (s) =>
          ({ key: a }) => {
            a === e && n(s);
          },
        [e]
      ),
      i = r(!0),
      l = r(!1);
    return (
      A.useEffect(
        () => (
          window.addEventListener("keydown", i),
          window.addEventListener("keyup", l),
          () => {
            window.removeEventListener("keydown", i),
              window.removeEventListener("keyup", l);
          }
        ),
        [i, l]
      ),
      t
    );
  },
  B$ = () => {
    const e = Ao(),
      t = z$("Shift");
    return (
      A.useEffect(() => {
        e(CR(t));
      }, [t, e]),
      D($t, {})
    );
  },
  H$ = () => {
    const e = Ao(),
      t = ti();
    return (
      Sn("init", ({ locale: n, items: r, leftInventory: i, imagepath: l }) => {
        for (const s in n) Ge[s] = n[s];
        for (const s in r) Ve[s] = r[s];
        cR(l), e(Z5({ leftInventory: i }));
      }),
      _n("uiLoaded", {}),
      Sn("closeInventory", () => {
        t.dispatch({ type: "dnd-core/END_DRAG" });
      }),
      K("div", {
        className: "app-wrapper",
        children: [D(L$, {}), D($$, {}), D(B$, {})],
      })
    );
  };
addEventListener("dragstart", function (e) {
  e.preventDefault();
});
const U$ = (e = []) => {
    const [t, n] = A.useState(e);
    return {
      add: (r) => {
        n((i) => [...i, r]);
      },
      remove: () => {
        let r;
        return n(([i, ...l]) => ((r = i), l)), r;
      },
      get values() {
        return t;
      },
      get first() {
        return t[0];
      },
      get last() {
        return t[t.length - 1];
      },
      get size() {
        return t.length;
      },
    };
  },
  W$ = qe.createContext(null),
  j$ = (e) => {
    const t = {
      position: "fixed",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    };
    switch (e) {
      case "top-left":
        return { ...t, top: "20px", left: "20px" };
      case "top-center":
        return {
          ...t,
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "top-right":
        return { ...t, top: "20px", right: "20px" };
      case "left-center":
        return {
          ...t,
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "left-bottom":
        return { ...t, left: "20px", bottom: "20px" };
      case "bottom-center":
        return {
          ...t,
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "right-bottom":
        return { ...t, right: "20px", bottom: "20px" };
      case "right-center":
        return {
          ...t,
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return { ...t, top: "20px", right: "20px" };
    }
  },
  V$ = qe.forwardRef((e, t) => {
    const n = e.item.item;
    return K("div", {
      className: "item-notification-modern",
      style: e.style,
      ref: t,
      children: [
        D("div", {
          className: "item-notification-image",
          style: { backgroundImage: `url(${So(n) || "none"})` },
        }),
        D("div", {
          className: "item-notification-name-badge",
          style: {
            color: e.themeSettings.PrimaryColor,
            background: `${e.themeSettings.PrimaryColor}29`,
            border: `1px solid ${e.themeSettings.PrimaryColor}0A`,
          },
          children: n.metadata?.label || Ve[n.name]?.label || n.name,
        }),
        D("div", {
          className: "item-notification-action",
          children: e.item.text,
        }),
      ],
    });
  }),
  G$ = ({ children: e }) => {
    const [t, n] = A.useState({ position: "right-center", duration: 2500 }),
      [r, i] = A.useState({
        PrimaryColor: "#EE1111",
        buttonGradients: {
          gradient: "linear-gradient(135deg, #D34242 0%, #D55858 100%)",
          shadow: "rgba(205 50 50 / 0.4)",
          text: "#000",
        },
      }),
      l = U$(),
      s = (a) => {
        const f = qe.createRef(),
          d = { id: Date.now(), item: a, ref: f };
        l.add(d);
        const p = setTimeout(() => {
          l.remove(), clearTimeout(p);
        }, t.duration || 2500);
      };
    return (
      Sn("itemNotify", ([a, f, d, p]) => {
        p && n((g) => ({ ...g, position: p.position, duration: p.duration })),
          s({ item: a, text: d ? `${Ge[f]} ${d}x` : `${Ge[f]}` });
      }),
      Sn("setNotificationConfig", (a) => {
        n((f) => ({ ...f, ...a }));
      }),
      Sn("setupNotifyTheme", (a) => {
        i(a.Prism);
      }),
      K(W$.Provider, {
        value: { add: s, setConfig: n },
        children: [
          e,
          Bl.createPortal(
            D("div", {
              className: "item-notification-container-modern",
              style: j$(t.position),
              children: D(iN, {
                component: null,
                children: l.values.map((a, f) =>
                  D(
                    CS,
                    {
                      children: D(V$, {
                        item: a.item,
                        ref: a.ref,
                        themeSettings: r,
                      }),
                    },
                    `item-notification-${f}`
                  )
                ),
              }),
            }),
            document.body
          ),
        ],
      })
    );
  },
  bu = document.getElementById("root");
Q5() &&
  ((bu.style.backgroundImage =
    'url("https://r2.fivemanage.com/ilww0vsQbrOTUyk9NfMQN/image(2).png")'),
  (bu.style.backgroundSize = "cover"),
  (bu.style.backgroundRepeat = "no-repeat"),
  (bu.style.backgroundPosition = "center"));
c5(bu).render(
  D(qe.StrictMode, {
    children: D(hT, {
      store: Cn,
      children: D(BI, {
        backend: OP,
        options: { enableMouseEvents: !0 },
        children: D(G$, { children: D(H$, {}) }),
      }),
    }),
  })
);
