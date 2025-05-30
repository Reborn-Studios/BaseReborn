(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function Xc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var ws = { exports: {} },
  vl = {},
  xs = { exports: {} },
  O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ur = Symbol.for("react.element"),
  Yc = Symbol.for("react.portal"),
  Jc = Symbol.for("react.fragment"),
  qc = Symbol.for("react.strict_mode"),
  Zc = Symbol.for("react.profiler"),
  bc = Symbol.for("react.provider"),
  ed = Symbol.for("react.context"),
  td = Symbol.for("react.forward_ref"),
  nd = Symbol.for("react.suspense"),
  rd = Symbol.for("react.memo"),
  ld = Symbol.for("react.lazy"),
  ru = Symbol.iterator;
function od(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ru && e[ru]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ks = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ss = Object.assign,
  Cs = {};
function gn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Cs),
    (this.updater = n || ks);
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
gn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Es() {}
Es.prototype = gn.prototype;
function ri(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Cs),
    (this.updater = n || ks);
}
var li = (ri.prototype = new Es());
li.constructor = ri;
Ss(li, gn.prototype);
li.isPureReactComponent = !0;
var lu = Array.isArray,
  Ns = Object.prototype.hasOwnProperty,
  oi = { current: null },
  zs = { key: !0, ref: !0, __self: !0, __source: !0 };
function _s(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Ns.call(t, r) && !zs.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    l.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: ur,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: oi.current,
  };
}
function id(e, t) {
  return {
    $$typeof: ur,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ii(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ur;
}
function ud(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var ou = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ud("" + e.key)
    : t.toString(36);
}
function Mr(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ur:
          case Yc:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + Ml(i, 0) : r),
      lu(l)
        ? ((n = ""),
          e != null && (n = e.replace(ou, "$&/") + "/"),
          Mr(l, t, n, "", function (a) {
            return a;
          }))
        : l != null &&
          (ii(l) &&
            (l = id(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(ou, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), lu(e)))
    for (var u = 0; u < e.length; u++) {
      o = e[u];
      var s = r + Ml(o, u);
      i += Mr(o, t, n, s, l);
    }
  else if (((s = od(e)), typeof s == "function"))
    for (e = s.call(e), u = 0; !(o = e.next()).done; )
      (o = o.value), (s = r + Ml(o, u++)), (i += Mr(o, t, n, s, l));
  else if (o === "object")
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
  return i;
}
function hr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Mr(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function sd(e) {
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
var fe = { current: null },
  Or = { transition: null },
  ad = {
    ReactCurrentDispatcher: fe,
    ReactCurrentBatchConfig: Or,
    ReactCurrentOwner: oi,
  };
function Ps() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = {
  map: hr,
  forEach: function (e, t, n) {
    hr(
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
      hr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      hr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ii(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
O.Component = gn;
O.Fragment = Jc;
O.Profiler = Zc;
O.PureComponent = ri;
O.StrictMode = qc;
O.Suspense = nd;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ad;
O.act = Ps;
O.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Ss({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = oi.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in t)
      Ns.call(t, s) &&
        !zs.hasOwnProperty(s) &&
        (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: ur, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function (e) {
  return (
    (e = {
      $$typeof: ed,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: bc, _context: e }),
    (e.Consumer = e)
  );
};
O.createElement = _s;
O.createFactory = function (e) {
  var t = _s.bind(null, e);
  return (t.type = e), t;
};
O.createRef = function () {
  return { current: null };
};
O.forwardRef = function (e) {
  return { $$typeof: td, render: e };
};
O.isValidElement = ii;
O.lazy = function (e) {
  return { $$typeof: ld, _payload: { _status: -1, _result: e }, _init: sd };
};
O.memo = function (e, t) {
  return { $$typeof: rd, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function (e) {
  var t = Or.transition;
  Or.transition = {};
  try {
    e();
  } finally {
    Or.transition = t;
  }
};
O.unstable_act = Ps;
O.useCallback = function (e, t) {
  return fe.current.useCallback(e, t);
};
O.useContext = function (e) {
  return fe.current.useContext(e);
};
O.useDebugValue = function () {};
O.useDeferredValue = function (e) {
  return fe.current.useDeferredValue(e);
};
O.useEffect = function (e, t) {
  return fe.current.useEffect(e, t);
};
O.useId = function () {
  return fe.current.useId();
};
O.useImperativeHandle = function (e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function (e, t) {
  return fe.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function (e, t) {
  return fe.current.useLayoutEffect(e, t);
};
O.useMemo = function (e, t) {
  return fe.current.useMemo(e, t);
};
O.useReducer = function (e, t, n) {
  return fe.current.useReducer(e, t, n);
};
O.useRef = function (e) {
  return fe.current.useRef(e);
};
O.useState = function (e) {
  return fe.current.useState(e);
};
O.useSyncExternalStore = function (e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function () {
  return fe.current.useTransition();
};
O.version = "18.3.1";
xs.exports = O;
var L = xs.exports;
const cd = Xc(L);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dd = L,
  fd = Symbol.for("react.element"),
  pd = Symbol.for("react.fragment"),
  md = Object.prototype.hasOwnProperty,
  hd = dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  vd = { key: !0, ref: !0, __self: !0, __source: !0 };
function js(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) md.call(t, r) && !vd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: fd,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: hd.current,
  };
}
vl.Fragment = pd;
vl.jsx = js;
vl.jsxs = js;
ws.exports = vl;
var k = ws.exports,
  oo = {},
  Ls = { exports: {} },
  Ce = {},
  Ts = { exports: {} },
  Rs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(S, j) {
    var T = S.length;
    S.push(j);
    e: for (; 0 < T; ) {
      var A = (T - 1) >>> 1,
        Q = S[A];
      if (0 < l(Q, j)) (S[A] = j), (S[T] = Q), (T = A);
      else break e;
    }
  }
  function n(S) {
    return S.length === 0 ? null : S[0];
  }
  function r(S) {
    if (S.length === 0) return null;
    var j = S[0],
      T = S.pop();
    if (T !== j) {
      S[0] = T;
      e: for (var A = 0, Q = S.length, pr = Q >>> 1; A < pr; ) {
        var Nt = 2 * (A + 1) - 1,
          Rl = S[Nt],
          zt = Nt + 1,
          mr = S[zt];
        if (0 > l(Rl, T))
          zt < Q && 0 > l(mr, Rl)
            ? ((S[A] = mr), (S[zt] = T), (A = zt))
            : ((S[A] = Rl), (S[Nt] = T), (A = Nt));
        else if (zt < Q && 0 > l(mr, T)) (S[A] = mr), (S[zt] = T), (A = zt);
        else break e;
      }
    }
    return j;
  }
  function l(S, j) {
    var T = S.sortIndex - j.sortIndex;
    return T !== 0 ? T : S.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      u = i.now();
    e.unstable_now = function () {
      return i.now() - u;
    };
  }
  var s = [],
    a = [],
    m = 1,
    h = null,
    p = 3,
    y = !1,
    w = !1,
    x = !1,
    P = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(S) {
    for (var j = n(a); j !== null; ) {
      if (j.callback === null) r(a);
      else if (j.startTime <= S)
        r(a), (j.sortIndex = j.expirationTime), t(s, j);
      else break;
      j = n(a);
    }
  }
  function v(S) {
    if (((x = !1), f(S), !w))
      if (n(s) !== null) (w = !0), tt(C);
      else {
        var j = n(a);
        j !== null && Bt(v, j.startTime - S);
      }
  }
  function C(S, j) {
    (w = !1), x && ((x = !1), d(_), (_ = -1)), (y = !0);
    var T = p;
    try {
      for (
        f(j), h = n(s);
        h !== null && (!(h.expirationTime > j) || (S && !ae()));

      ) {
        var A = h.callback;
        if (typeof A == "function") {
          (h.callback = null), (p = h.priorityLevel);
          var Q = A(h.expirationTime <= j);
          (j = e.unstable_now()),
            typeof Q == "function" ? (h.callback = Q) : h === n(s) && r(s),
            f(j);
        } else r(s);
        h = n(s);
      }
      if (h !== null) var pr = !0;
      else {
        var Nt = n(a);
        Nt !== null && Bt(v, Nt.startTime - j), (pr = !1);
      }
      return pr;
    } finally {
      (h = null), (p = T), (y = !1);
    }
  }
  var N = !1,
    z = null,
    _ = -1,
    U = 5,
    M = -1;
  function ae() {
    return !(e.unstable_now() - M < U);
  }
  function F() {
    if (z !== null) {
      var S = e.unstable_now();
      M = S;
      var j = !0;
      try {
        j = z(!0, S);
      } finally {
        j ? et() : ((N = !1), (z = null));
      }
    } else N = !1;
  }
  var et;
  if (typeof c == "function")
    et = function () {
      c(F);
    };
  else if (typeof MessageChannel < "u") {
    var Et = new MessageChannel(),
      fr = Et.port2;
    (Et.port1.onmessage = F),
      (et = function () {
        fr.postMessage(null);
      });
  } else
    et = function () {
      P(F, 0);
    };
  function tt(S) {
    (z = S), N || ((N = !0), et());
  }
  function Bt(S, j) {
    _ = P(function () {
      S(e.unstable_now());
    }, j);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (S) {
      S.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      w || y || ((w = !0), tt(C));
    }),
    (e.unstable_forceFrameRate = function (S) {
      0 > S || 125 < S
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (U = 0 < S ? Math.floor(1e3 / S) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return p;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (S) {
      switch (p) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = p;
      }
      var T = p;
      p = j;
      try {
        return S();
      } finally {
        p = T;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (S, j) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var T = p;
      p = S;
      try {
        return j();
      } finally {
        p = T;
      }
    }),
    (e.unstable_scheduleCallback = function (S, j, T) {
      var A = e.unstable_now();
      switch (
        (typeof T == "object" && T !== null
          ? ((T = T.delay), (T = typeof T == "number" && 0 < T ? A + T : A))
          : (T = A),
        S)
      ) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return (
        (Q = T + Q),
        (S = {
          id: m++,
          callback: j,
          priorityLevel: S,
          startTime: T,
          expirationTime: Q,
          sortIndex: -1,
        }),
        T > A
          ? ((S.sortIndex = T),
            t(a, S),
            n(s) === null &&
              S === n(a) &&
              (x ? (d(_), (_ = -1)) : (x = !0), Bt(v, T - A)))
          : ((S.sortIndex = Q), t(s, S), w || y || ((w = !0), tt(C))),
        S
      );
    }),
    (e.unstable_shouldYield = ae),
    (e.unstable_wrapCallback = function (S) {
      var j = p;
      return function () {
        var T = p;
        p = j;
        try {
          return S.apply(this, arguments);
        } finally {
          p = T;
        }
      };
    });
})(Rs);
Ts.exports = Rs;
var gd = Ts.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yd = L,
  Se = gd;
function g(e) {
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
var Ms = new Set(),
  Wn = {};
function Ut(e, t) {
  cn(e, t), cn(e + "Capture", t);
}
function cn(e, t) {
  for (Wn[e] = t, e = 0; e < t.length; e++) Ms.add(t[e]);
}
var Ye = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  io = Object.prototype.hasOwnProperty,
  wd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  iu = {},
  uu = {};
function xd(e) {
  return io.call(uu, e)
    ? !0
    : io.call(iu, e)
    ? !1
    : wd.test(e)
    ? (uu[e] = !0)
    : ((iu[e] = !0), !1);
}
function kd(e, t, n, r) {
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
function Sd(e, t, n, r) {
  if (t === null || typeof t > "u" || kd(e, t, n, r)) return !0;
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
function pe(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    le[e] = new pe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  le[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  le[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  le[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    le[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  le[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  le[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  le[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  le[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ui = /[\-:]([a-z])/g;
function si(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ui, si);
    le[t] = new pe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ui, si);
    le[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ui, si);
  le[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new pe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  le[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ai(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Sd(t, n, l, r) && (n = null),
    r || l === null
      ? xd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var be = yd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  vr = Symbol.for("react.element"),
  Wt = Symbol.for("react.portal"),
  Qt = Symbol.for("react.fragment"),
  ci = Symbol.for("react.strict_mode"),
  uo = Symbol.for("react.profiler"),
  Os = Symbol.for("react.provider"),
  Is = Symbol.for("react.context"),
  di = Symbol.for("react.forward_ref"),
  so = Symbol.for("react.suspense"),
  ao = Symbol.for("react.suspense_list"),
  fi = Symbol.for("react.memo"),
  ot = Symbol.for("react.lazy"),
  Fs = Symbol.for("react.offscreen"),
  su = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (su && e[su]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var X = Object.assign,
  Ol;
function Tn(e) {
  if (Ol === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ol = (t && t[1]) || "";
    }
  return (
    `
` +
    Ol +
    e
  );
}
var Il = !1;
function Fl(e, t) {
  if (!e || Il) return "";
  Il = !0;
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
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var l = a.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          u = o.length - 1;
        1 <= i && 0 <= u && l[i] !== o[u];

      )
        u--;
      for (; 1 <= i && 0 <= u; i--, u--)
        if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if ((i--, u--, 0 > u || l[i] !== o[u])) {
                var s =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= i && 0 <= u);
          break;
        }
    }
  } finally {
    (Il = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Tn(e) : "";
}
function Cd(e) {
  switch (e.tag) {
    case 5:
      return Tn(e.type);
    case 16:
      return Tn("Lazy");
    case 13:
      return Tn("Suspense");
    case 19:
      return Tn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Fl(e.type, !1)), e;
    case 11:
      return (e = Fl(e.type.render, !1)), e;
    case 1:
      return (e = Fl(e.type, !0)), e;
    default:
      return "";
  }
}
function co(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qt:
      return "Fragment";
    case Wt:
      return "Portal";
    case uo:
      return "Profiler";
    case ci:
      return "StrictMode";
    case so:
      return "Suspense";
    case ao:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Is:
        return (e.displayName || "Context") + ".Consumer";
      case Os:
        return (e._context.displayName || "Context") + ".Provider";
      case di:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case fi:
        return (
          (t = e.displayName || null), t !== null ? t : co(e.type) || "Memo"
        );
      case ot:
        (t = e._payload), (e = e._init);
        try {
          return co(e(t));
        } catch {}
    }
  return null;
}
function Ed(e) {
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
      return co(t);
    case 8:
      return t === ci ? "StrictMode" : "Mode";
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
function wt(e) {
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
function Ds(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Nd(e) {
  var t = Ds(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function gr(e) {
  e._valueTracker || (e._valueTracker = Nd(e));
}
function As(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Ds(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Qr(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function fo(e, t) {
  var n = t.checked;
  return X({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function au(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = wt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function $s(e, t) {
  (t = t.checked), t != null && ai(e, "checked", t, !1);
}
function po(e, t) {
  $s(e, t);
  var n = wt(t.value),
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
    ? mo(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && mo(e, t.type, wt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function cu(e, t, n) {
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
function mo(e, t, n) {
  (t !== "number" || Qr(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Rn = Array.isArray;
function rn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ho(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(g(91));
  return X({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function du(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(g(92));
      if (Rn(n)) {
        if (1 < n.length) throw Error(g(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: wt(n) };
}
function Us(e, t) {
  var n = wt(t.value),
    r = wt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function fu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Vs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function vo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Vs(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var yr,
  Bs = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        yr = yr || document.createElement("div"),
          yr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = yr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Qn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var In = {
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
  zd = ["Webkit", "ms", "Moz", "O"];
Object.keys(In).forEach(function (e) {
  zd.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (In[t] = In[e]);
  });
});
function Hs(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (In.hasOwnProperty(e) && In[e])
    ? ("" + t).trim()
    : t + "px";
}
function Ws(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Hs(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var _d = X(
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
function go(e, t) {
  if (t) {
    if (_d[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(g(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(g(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(g(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(g(62));
  }
}
function yo(e, t) {
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
var wo = null;
function pi(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var xo = null,
  ln = null,
  on = null;
function pu(e) {
  if ((e = cr(e))) {
    if (typeof xo != "function") throw Error(g(280));
    var t = e.stateNode;
    t && ((t = kl(t)), xo(e.stateNode, e.type, t));
  }
}
function Qs(e) {
  ln ? (on ? on.push(e) : (on = [e])) : (ln = e);
}
function Gs() {
  if (ln) {
    var e = ln,
      t = on;
    if (((on = ln = null), pu(e), t)) for (e = 0; e < t.length; e++) pu(t[e]);
  }
}
function Ks(e, t) {
  return e(t);
}
function Xs() {}
var Dl = !1;
function Ys(e, t, n) {
  if (Dl) return e(t, n);
  Dl = !0;
  try {
    return Ks(e, t, n);
  } finally {
    (Dl = !1), (ln !== null || on !== null) && (Xs(), Gs());
  }
}
function Gn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = kl(n);
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
  if (n && typeof n != "function") throw Error(g(231, t, typeof n));
  return n;
}
var ko = !1;
if (Ye)
  try {
    var Sn = {};
    Object.defineProperty(Sn, "passive", {
      get: function () {
        ko = !0;
      },
    }),
      window.addEventListener("test", Sn, Sn),
      window.removeEventListener("test", Sn, Sn);
  } catch {
    ko = !1;
  }
function Pd(e, t, n, r, l, o, i, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (m) {
    this.onError(m);
  }
}
var Fn = !1,
  Gr = null,
  Kr = !1,
  So = null,
  jd = {
    onError: function (e) {
      (Fn = !0), (Gr = e);
    },
  };
function Ld(e, t, n, r, l, o, i, u, s) {
  (Fn = !1), (Gr = null), Pd.apply(jd, arguments);
}
function Td(e, t, n, r, l, o, i, u, s) {
  if ((Ld.apply(this, arguments), Fn)) {
    if (Fn) {
      var a = Gr;
      (Fn = !1), (Gr = null);
    } else throw Error(g(198));
    Kr || ((Kr = !0), (So = a));
  }
}
function Vt(e) {
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
function Js(e) {
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
function mu(e) {
  if (Vt(e) !== e) throw Error(g(188));
}
function Rd(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Vt(e)), t === null)) throw Error(g(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return mu(l), e;
        if (o === r) return mu(l), t;
        o = o.sibling;
      }
      throw Error(g(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (u === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (u === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(g(189));
      }
    }
    if (n.alternate !== r) throw Error(g(190));
  }
  if (n.tag !== 3) throw Error(g(188));
  return n.stateNode.current === n ? e : t;
}
function qs(e) {
  return (e = Rd(e)), e !== null ? Zs(e) : null;
}
function Zs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Zs(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var bs = Se.unstable_scheduleCallback,
  hu = Se.unstable_cancelCallback,
  Md = Se.unstable_shouldYield,
  Od = Se.unstable_requestPaint,
  J = Se.unstable_now,
  Id = Se.unstable_getCurrentPriorityLevel,
  mi = Se.unstable_ImmediatePriority,
  ea = Se.unstable_UserBlockingPriority,
  Xr = Se.unstable_NormalPriority,
  Fd = Se.unstable_LowPriority,
  ta = Se.unstable_IdlePriority,
  gl = null,
  Ve = null;
function Dd(e) {
  if (Ve && typeof Ve.onCommitFiberRoot == "function")
    try {
      Ve.onCommitFiberRoot(gl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ie = Math.clz32 ? Math.clz32 : Ud,
  Ad = Math.log,
  $d = Math.LN2;
function Ud(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Ad(e) / $d) | 0)) | 0;
}
var wr = 64,
  xr = 4194304;
function Mn(e) {
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
function Yr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? (r = Mn(u)) : ((o &= i), o !== 0 && (r = Mn(o)));
  } else (i = n & ~l), i !== 0 ? (r = Mn(i)) : o !== 0 && (r = Mn(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ie(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function Vd(e, t) {
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
function Bd(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Ie(o),
      u = 1 << i,
      s = l[i];
    s === -1
      ? (!(u & n) || u & r) && (l[i] = Vd(u, t))
      : s <= t && (e.expiredLanes |= u),
      (o &= ~u);
  }
}
function Co(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function na() {
  var e = wr;
  return (wr <<= 1), !(wr & 4194240) && (wr = 64), e;
}
function Al(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function sr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ie(t)),
    (e[t] = n);
}
function Hd(e, t) {
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
    var l = 31 - Ie(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function hi(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ie(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var D = 0;
function ra(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var la,
  vi,
  oa,
  ia,
  ua,
  Eo = !1,
  kr = [],
  dt = null,
  ft = null,
  pt = null,
  Kn = new Map(),
  Xn = new Map(),
  ut = [],
  Wd =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function vu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      dt = null;
      break;
    case "dragenter":
    case "dragleave":
      ft = null;
      break;
    case "mouseover":
    case "mouseout":
      pt = null;
      break;
    case "pointerover":
    case "pointerout":
      Kn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xn.delete(t.pointerId);
  }
}
function Cn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = cr(t)), t !== null && vi(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Qd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (dt = Cn(dt, e, t, n, r, l)), !0;
    case "dragenter":
      return (ft = Cn(ft, e, t, n, r, l)), !0;
    case "mouseover":
      return (pt = Cn(pt, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return Kn.set(o, Cn(Kn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), Xn.set(o, Cn(Xn.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function sa(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = Vt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Js(n)), t !== null)) {
          (e.blockedOn = t),
            ua(e.priority, function () {
              oa(n);
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
function Ir(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = No(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (wo = r), n.target.dispatchEvent(r), (wo = null);
    } else return (t = cr(n)), t !== null && vi(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function gu(e, t, n) {
  Ir(e) && n.delete(t);
}
function Gd() {
  (Eo = !1),
    dt !== null && Ir(dt) && (dt = null),
    ft !== null && Ir(ft) && (ft = null),
    pt !== null && Ir(pt) && (pt = null),
    Kn.forEach(gu),
    Xn.forEach(gu);
}
function En(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Eo ||
      ((Eo = !0),
      Se.unstable_scheduleCallback(Se.unstable_NormalPriority, Gd)));
}
function Yn(e) {
  function t(l) {
    return En(l, e);
  }
  if (0 < kr.length) {
    En(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var r = kr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    dt !== null && En(dt, e),
      ft !== null && En(ft, e),
      pt !== null && En(pt, e),
      Kn.forEach(t),
      Xn.forEach(t),
      n = 0;
    n < ut.length;
    n++
  )
    (r = ut[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ut.length && ((n = ut[0]), n.blockedOn === null); )
    sa(n), n.blockedOn === null && ut.shift();
}
var un = be.ReactCurrentBatchConfig,
  Jr = !0;
function Kd(e, t, n, r) {
  var l = D,
    o = un.transition;
  un.transition = null;
  try {
    (D = 1), gi(e, t, n, r);
  } finally {
    (D = l), (un.transition = o);
  }
}
function Xd(e, t, n, r) {
  var l = D,
    o = un.transition;
  un.transition = null;
  try {
    (D = 4), gi(e, t, n, r);
  } finally {
    (D = l), (un.transition = o);
  }
}
function gi(e, t, n, r) {
  if (Jr) {
    var l = No(e, t, n, r);
    if (l === null) Xl(e, t, r, qr, n), vu(e, r);
    else if (Qd(l, e, t, n, r)) r.stopPropagation();
    else if ((vu(e, r), t & 4 && -1 < Wd.indexOf(e))) {
      for (; l !== null; ) {
        var o = cr(l);
        if (
          (o !== null && la(o),
          (o = No(e, t, n, r)),
          o === null && Xl(e, t, r, qr, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var qr = null;
function No(e, t, n, r) {
  if (((qr = null), (e = pi(r)), (e = jt(e)), e !== null))
    if (((t = Vt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Js(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (qr = e), null;
}
function aa(e) {
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
      switch (Id()) {
        case mi:
          return 1;
        case ea:
          return 4;
        case Xr:
        case Fd:
          return 16;
        case ta:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var at = null,
  yi = null,
  Fr = null;
function ca() {
  if (Fr) return Fr;
  var e,
    t = yi,
    n = t.length,
    r,
    l = "value" in at ? at.value : at.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (Fr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Dr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Sr() {
  return !0;
}
function yu() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Sr
        : yu),
      (this.isPropagationStopped = yu),
      this
    );
  }
  return (
    X(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Sr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Sr));
      },
      persist: function () {},
      isPersistent: Sr,
    }),
    t
  );
}
var yn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  wi = Ee(yn),
  ar = X({}, yn, { view: 0, detail: 0 }),
  Yd = Ee(ar),
  $l,
  Ul,
  Nn,
  yl = X({}, ar, {
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
    getModifierState: xi,
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
        : (e !== Nn &&
            (Nn && e.type === "mousemove"
              ? (($l = e.screenX - Nn.screenX), (Ul = e.screenY - Nn.screenY))
              : (Ul = $l = 0),
            (Nn = e)),
          $l);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ul;
    },
  }),
  wu = Ee(yl),
  Jd = X({}, yl, { dataTransfer: 0 }),
  qd = Ee(Jd),
  Zd = X({}, ar, { relatedTarget: 0 }),
  Vl = Ee(Zd),
  bd = X({}, yn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  ef = Ee(bd),
  tf = X({}, yn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  nf = Ee(tf),
  rf = X({}, yn, { data: 0 }),
  xu = Ee(rf),
  lf = {
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
  of = {
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
  uf = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function sf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = uf[e]) ? !!t[e] : !1;
}
function xi() {
  return sf;
}
var af = X({}, ar, {
    key: function (e) {
      if (e.key) {
        var t = lf[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Dr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? of[e.keyCode] || "Unidentified"
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
    getModifierState: xi,
    charCode: function (e) {
      return e.type === "keypress" ? Dr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Dr(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  cf = Ee(af),
  df = X({}, yl, {
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
  ku = Ee(df),
  ff = X({}, ar, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: xi,
  }),
  pf = Ee(ff),
  mf = X({}, yn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  hf = Ee(mf),
  vf = X({}, yl, {
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
  gf = Ee(vf),
  yf = [9, 13, 27, 32],
  ki = Ye && "CompositionEvent" in window,
  Dn = null;
Ye && "documentMode" in document && (Dn = document.documentMode);
var wf = Ye && "TextEvent" in window && !Dn,
  da = Ye && (!ki || (Dn && 8 < Dn && 11 >= Dn)),
  Su = " ",
  Cu = !1;
function fa(e, t) {
  switch (e) {
    case "keyup":
      return yf.indexOf(t.keyCode) !== -1;
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
function pa(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function xf(e, t) {
  switch (e) {
    case "compositionend":
      return pa(t);
    case "keypress":
      return t.which !== 32 ? null : ((Cu = !0), Su);
    case "textInput":
      return (e = t.data), e === Su && Cu ? null : e;
    default:
      return null;
  }
}
function kf(e, t) {
  if (Gt)
    return e === "compositionend" || (!ki && fa(e, t))
      ? ((e = ca()), (Fr = yi = at = null), (Gt = !1), e)
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
      return da && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Sf = {
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
function Eu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Sf[e.type] : t === "textarea";
}
function ma(e, t, n, r) {
  Qs(r),
    (t = Zr(t, "onChange")),
    0 < t.length &&
      ((n = new wi("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var An = null,
  Jn = null;
function Cf(e) {
  Na(e, 0);
}
function wl(e) {
  var t = Yt(e);
  if (As(t)) return e;
}
function Ef(e, t) {
  if (e === "change") return t;
}
var ha = !1;
if (Ye) {
  var Bl;
  if (Ye) {
    var Hl = "oninput" in document;
    if (!Hl) {
      var Nu = document.createElement("div");
      Nu.setAttribute("oninput", "return;"),
        (Hl = typeof Nu.oninput == "function");
    }
    Bl = Hl;
  } else Bl = !1;
  ha = Bl && (!document.documentMode || 9 < document.documentMode);
}
function zu() {
  An && (An.detachEvent("onpropertychange", va), (Jn = An = null));
}
function va(e) {
  if (e.propertyName === "value" && wl(Jn)) {
    var t = [];
    ma(t, Jn, e, pi(e)), Ys(Cf, t);
  }
}
function Nf(e, t, n) {
  e === "focusin"
    ? (zu(), (An = t), (Jn = n), An.attachEvent("onpropertychange", va))
    : e === "focusout" && zu();
}
function zf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return wl(Jn);
}
function _f(e, t) {
  if (e === "click") return wl(t);
}
function Pf(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function jf(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var De = typeof Object.is == "function" ? Object.is : jf;
function qn(e, t) {
  if (De(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!io.call(t, l) || !De(e[l], t[l])) return !1;
  }
  return !0;
}
function _u(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Pu(e, t) {
  var n = _u(e);
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
    n = _u(n);
  }
}
function ga(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? ga(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function ya() {
  for (var e = window, t = Qr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Qr(e.document);
  }
  return t;
}
function Si(e) {
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
function Lf(e) {
  var t = ya(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    ga(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Si(n)) {
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
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = Pu(n, o));
        var i = Pu(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
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
var Tf = Ye && "documentMode" in document && 11 >= document.documentMode,
  Kt = null,
  zo = null,
  $n = null,
  _o = !1;
function ju(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  _o ||
    Kt == null ||
    Kt !== Qr(r) ||
    ((r = Kt),
    "selectionStart" in r && Si(r)
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
    ($n && qn($n, r)) ||
      (($n = r),
      (r = Zr(zo, "onSelect")),
      0 < r.length &&
        ((t = new wi("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Kt))));
}
function Cr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Xt = {
    animationend: Cr("Animation", "AnimationEnd"),
    animationiteration: Cr("Animation", "AnimationIteration"),
    animationstart: Cr("Animation", "AnimationStart"),
    transitionend: Cr("Transition", "TransitionEnd"),
  },
  Wl = {},
  wa = {};
Ye &&
  ((wa = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Xt.animationend.animation,
    delete Xt.animationiteration.animation,
    delete Xt.animationstart.animation),
  "TransitionEvent" in window || delete Xt.transitionend.transition);
function xl(e) {
  if (Wl[e]) return Wl[e];
  if (!Xt[e]) return e;
  var t = Xt[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in wa) return (Wl[e] = t[n]);
  return e;
}
var xa = xl("animationend"),
  ka = xl("animationiteration"),
  Sa = xl("animationstart"),
  Ca = xl("transitionend"),
  Ea = new Map(),
  Lu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function kt(e, t) {
  Ea.set(e, t), Ut(t, [e]);
}
for (var Ql = 0; Ql < Lu.length; Ql++) {
  var Gl = Lu[Ql],
    Rf = Gl.toLowerCase(),
    Mf = Gl[0].toUpperCase() + Gl.slice(1);
  kt(Rf, "on" + Mf);
}
kt(xa, "onAnimationEnd");
kt(ka, "onAnimationIteration");
kt(Sa, "onAnimationStart");
kt("dblclick", "onDoubleClick");
kt("focusin", "onFocus");
kt("focusout", "onBlur");
kt(Ca, "onTransitionEnd");
cn("onMouseEnter", ["mouseout", "mouseover"]);
cn("onMouseLeave", ["mouseout", "mouseover"]);
cn("onPointerEnter", ["pointerout", "pointerover"]);
cn("onPointerLeave", ["pointerout", "pointerover"]);
Ut(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Ut(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ut(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Ut(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Ut(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var On =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Of = new Set("cancel close invalid load scroll toggle".split(" ").concat(On));
function Tu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Td(r, t, void 0, e), (e.currentTarget = null);
}
function Na(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i],
            s = u.instance,
            a = u.currentTarget;
          if (((u = u.listener), s !== o && l.isPropagationStopped())) break e;
          Tu(l, u, a), (o = s);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((u = r[i]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== o && l.isPropagationStopped())
          )
            break e;
          Tu(l, u, a), (o = s);
        }
    }
  }
  if (Kr) throw ((e = So), (Kr = !1), (So = null), e);
}
function B(e, t) {
  var n = t[Ro];
  n === void 0 && (n = t[Ro] = new Set());
  var r = e + "__bubble";
  n.has(r) || (za(t, e, 2, !1), n.add(r));
}
function Kl(e, t, n) {
  var r = 0;
  t && (r |= 4), za(n, e, r, t);
}
var Er = "_reactListening" + Math.random().toString(36).slice(2);
function Zn(e) {
  if (!e[Er]) {
    (e[Er] = !0),
      Ms.forEach(function (n) {
        n !== "selectionchange" && (Of.has(n) || Kl(n, !1, e), Kl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Er] || ((t[Er] = !0), Kl("selectionchange", !1, t));
  }
}
function za(e, t, n, r) {
  switch (aa(t)) {
    case 1:
      var l = Kd;
      break;
    case 4:
      l = Xd;
      break;
    default:
      l = gi;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !ko ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var s = i.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = i.stateNode.containerInfo),
              s === l || (s.nodeType === 8 && s.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; u !== null; ) {
          if (((i = jt(u)), i === null)) return;
          if (((s = i.tag), s === 5 || s === 6)) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  Ys(function () {
    var a = o,
      m = pi(n),
      h = [];
    e: {
      var p = Ea.get(e);
      if (p !== void 0) {
        var y = wi,
          w = e;
        switch (e) {
          case "keypress":
            if (Dr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = cf;
            break;
          case "focusin":
            (w = "focus"), (y = Vl);
            break;
          case "focusout":
            (w = "blur"), (y = Vl);
            break;
          case "beforeblur":
          case "afterblur":
            y = Vl;
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
            y = wu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = qd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = pf;
            break;
          case xa:
          case ka:
          case Sa:
            y = ef;
            break;
          case Ca:
            y = hf;
            break;
          case "scroll":
            y = Yd;
            break;
          case "wheel":
            y = gf;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = nf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = ku;
        }
        var x = (t & 4) !== 0,
          P = !x && e === "scroll",
          d = x ? (p !== null ? p + "Capture" : null) : p;
        x = [];
        for (var c = a, f; c !== null; ) {
          f = c;
          var v = f.stateNode;
          if (
            (f.tag === 5 &&
              v !== null &&
              ((f = v),
              d !== null && ((v = Gn(c, d)), v != null && x.push(bn(c, v, f)))),
            P)
          )
            break;
          c = c.return;
        }
        0 < x.length &&
          ((p = new y(p, w, null, n, m)), h.push({ event: p, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((p = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          p &&
            n !== wo &&
            (w = n.relatedTarget || n.fromElement) &&
            (jt(w) || w[Je]))
        )
          break e;
        if (
          (y || p) &&
          ((p =
            m.window === m
              ? m
              : (p = m.ownerDocument)
              ? p.defaultView || p.parentWindow
              : window),
          y
            ? ((w = n.relatedTarget || n.toElement),
              (y = a),
              (w = w ? jt(w) : null),
              w !== null &&
                ((P = Vt(w)), w !== P || (w.tag !== 5 && w.tag !== 6)) &&
                (w = null))
            : ((y = null), (w = a)),
          y !== w)
        ) {
          if (
            ((x = wu),
            (v = "onMouseLeave"),
            (d = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = ku),
              (v = "onPointerLeave"),
              (d = "onPointerEnter"),
              (c = "pointer")),
            (P = y == null ? p : Yt(y)),
            (f = w == null ? p : Yt(w)),
            (p = new x(v, c + "leave", y, n, m)),
            (p.target = P),
            (p.relatedTarget = f),
            (v = null),
            jt(m) === a &&
              ((x = new x(d, c + "enter", w, n, m)),
              (x.target = f),
              (x.relatedTarget = P),
              (v = x)),
            (P = v),
            y && w)
          )
            t: {
              for (x = y, d = w, c = 0, f = x; f; f = Ht(f)) c++;
              for (f = 0, v = d; v; v = Ht(v)) f++;
              for (; 0 < c - f; ) (x = Ht(x)), c--;
              for (; 0 < f - c; ) (d = Ht(d)), f--;
              for (; c--; ) {
                if (x === d || (d !== null && x === d.alternate)) break t;
                (x = Ht(x)), (d = Ht(d));
              }
              x = null;
            }
          else x = null;
          y !== null && Ru(h, p, y, x, !1),
            w !== null && P !== null && Ru(h, P, w, x, !0);
        }
      }
      e: {
        if (
          ((p = a ? Yt(a) : window),
          (y = p.nodeName && p.nodeName.toLowerCase()),
          y === "select" || (y === "input" && p.type === "file"))
        )
          var C = Ef;
        else if (Eu(p))
          if (ha) C = Pf;
          else {
            C = zf;
            var N = Nf;
          }
        else
          (y = p.nodeName) &&
            y.toLowerCase() === "input" &&
            (p.type === "checkbox" || p.type === "radio") &&
            (C = _f);
        if (C && (C = C(e, a))) {
          ma(h, C, n, m);
          break e;
        }
        N && N(e, p, a),
          e === "focusout" &&
            (N = p._wrapperState) &&
            N.controlled &&
            p.type === "number" &&
            mo(p, "number", p.value);
      }
      switch (((N = a ? Yt(a) : window), e)) {
        case "focusin":
          (Eu(N) || N.contentEditable === "true") &&
            ((Kt = N), (zo = a), ($n = null));
          break;
        case "focusout":
          $n = zo = Kt = null;
          break;
        case "mousedown":
          _o = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (_o = !1), ju(h, n, m);
          break;
        case "selectionchange":
          if (Tf) break;
        case "keydown":
        case "keyup":
          ju(h, n, m);
      }
      var z;
      if (ki)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        Gt
          ? fa(e, n) && (_ = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ &&
        (da &&
          n.locale !== "ko" &&
          (Gt || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && Gt && (z = ca())
            : ((at = m),
              (yi = "value" in at ? at.value : at.textContent),
              (Gt = !0))),
        (N = Zr(a, _)),
        0 < N.length &&
          ((_ = new xu(_, e, null, n, m)),
          h.push({ event: _, listeners: N }),
          z ? (_.data = z) : ((z = pa(n)), z !== null && (_.data = z)))),
        (z = wf ? xf(e, n) : kf(e, n)) &&
          ((a = Zr(a, "onBeforeInput")),
          0 < a.length &&
            ((m = new xu("onBeforeInput", "beforeinput", null, n, m)),
            h.push({ event: m, listeners: a }),
            (m.data = z)));
    }
    Na(h, t);
  });
}
function bn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Zr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = Gn(e, n)),
      o != null && r.unshift(bn(e, o, l)),
      (o = Gn(e, t)),
      o != null && r.push(bn(e, o, l))),
      (e = e.return);
  }
  return r;
}
function Ht(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ru(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 &&
      a !== null &&
      ((u = a),
      l
        ? ((s = Gn(n, o)), s != null && i.unshift(bn(n, s, u)))
        : l || ((s = Gn(n, o)), s != null && i.push(bn(n, s, u)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var If = /\r\n?/g,
  Ff = /\u0000|\uFFFD/g;
function Mu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      If,
      `
`
    )
    .replace(Ff, "");
}
function Nr(e, t, n) {
  if (((t = Mu(t)), Mu(e) !== t && n)) throw Error(g(425));
}
function br() {}
var Po = null,
  jo = null;
function Lo(e, t) {
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
var To = typeof setTimeout == "function" ? setTimeout : void 0,
  Df = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ou = typeof Promise == "function" ? Promise : void 0,
  Af =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ou < "u"
      ? function (e) {
          return Ou.resolve(null).then(e).catch($f);
        }
      : To;
function $f(e) {
  setTimeout(function () {
    throw e;
  });
}
function Yl(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), Yn(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Yn(t);
}
function mt(e) {
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
function Iu(e) {
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
var wn = Math.random().toString(36).slice(2),
  Ue = "__reactFiber$" + wn,
  er = "__reactProps$" + wn,
  Je = "__reactContainer$" + wn,
  Ro = "__reactEvents$" + wn,
  Uf = "__reactListeners$" + wn,
  Vf = "__reactHandles$" + wn;
function jt(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Je] || n[Ue])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Iu(e); e !== null; ) {
          if ((n = e[Ue])) return n;
          e = Iu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function cr(e) {
  return (
    (e = e[Ue] || e[Je]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Yt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(g(33));
}
function kl(e) {
  return e[er] || null;
}
var Mo = [],
  Jt = -1;
function St(e) {
  return { current: e };
}
function H(e) {
  0 > Jt || ((e.current = Mo[Jt]), (Mo[Jt] = null), Jt--);
}
function $(e, t) {
  Jt++, (Mo[Jt] = e.current), (e.current = t);
}
var xt = {},
  se = St(xt),
  ve = St(!1),
  It = xt;
function dn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return xt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ge(e) {
  return (e = e.childContextTypes), e != null;
}
function el() {
  H(ve), H(se);
}
function Fu(e, t, n) {
  if (se.current !== xt) throw Error(g(168));
  $(se, t), $(ve, n);
}
function _a(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(g(108, Ed(e) || "Unknown", l));
  return X({}, n, r);
}
function tl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || xt),
    (It = se.current),
    $(se, e),
    $(ve, ve.current),
    !0
  );
}
function Du(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(g(169));
  n
    ? ((e = _a(e, t, It)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      H(ve),
      H(se),
      $(se, e))
    : H(ve),
    $(ve, n);
}
var Qe = null,
  Sl = !1,
  Jl = !1;
function Pa(e) {
  Qe === null ? (Qe = [e]) : Qe.push(e);
}
function Bf(e) {
  (Sl = !0), Pa(e);
}
function Ct() {
  if (!Jl && Qe !== null) {
    Jl = !0;
    var e = 0,
      t = D;
    try {
      var n = Qe;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Qe = null), (Sl = !1);
    } catch (l) {
      throw (Qe !== null && (Qe = Qe.slice(e + 1)), bs(mi, Ct), l);
    } finally {
      (D = t), (Jl = !1);
    }
  }
  return null;
}
var qt = [],
  Zt = 0,
  nl = null,
  rl = 0,
  Ne = [],
  ze = 0,
  Ft = null,
  Ge = 1,
  Ke = "";
function _t(e, t) {
  (qt[Zt++] = rl), (qt[Zt++] = nl), (nl = e), (rl = t);
}
function ja(e, t, n) {
  (Ne[ze++] = Ge), (Ne[ze++] = Ke), (Ne[ze++] = Ft), (Ft = e);
  var r = Ge;
  e = Ke;
  var l = 32 - Ie(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - Ie(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (Ge = (1 << (32 - Ie(t) + l)) | (n << l) | r),
      (Ke = o + e);
  } else (Ge = (1 << o) | (n << l) | r), (Ke = e);
}
function Ci(e) {
  e.return !== null && (_t(e, 1), ja(e, 1, 0));
}
function Ei(e) {
  for (; e === nl; )
    (nl = qt[--Zt]), (qt[Zt] = null), (rl = qt[--Zt]), (qt[Zt] = null);
  for (; e === Ft; )
    (Ft = Ne[--ze]),
      (Ne[ze] = null),
      (Ke = Ne[--ze]),
      (Ne[ze] = null),
      (Ge = Ne[--ze]),
      (Ne[ze] = null);
}
var ke = null,
  xe = null,
  W = !1,
  Oe = null;
function La(e, t) {
  var n = _e(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Au(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ke = e), (xe = mt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ke = e), (xe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ft !== null ? { id: Ge, overflow: Ke } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = _e(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ke = e),
            (xe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Oo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Io(e) {
  if (W) {
    var t = xe;
    if (t) {
      var n = t;
      if (!Au(e, t)) {
        if (Oo(e)) throw Error(g(418));
        t = mt(n.nextSibling);
        var r = ke;
        t && Au(e, t)
          ? La(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (W = !1), (ke = e));
      }
    } else {
      if (Oo(e)) throw Error(g(418));
      (e.flags = (e.flags & -4097) | 2), (W = !1), (ke = e);
    }
  }
}
function $u(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ke = e;
}
function zr(e) {
  if (e !== ke) return !1;
  if (!W) return $u(e), (W = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Lo(e.type, e.memoizedProps))),
    t && (t = xe))
  ) {
    if (Oo(e)) throw (Ta(), Error(g(418)));
    for (; t; ) La(e, t), (t = mt(t.nextSibling));
  }
  if (($u(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(g(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              xe = mt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      xe = null;
    }
  } else xe = ke ? mt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ta() {
  for (var e = xe; e; ) e = mt(e.nextSibling);
}
function fn() {
  (xe = ke = null), (W = !1);
}
function Ni(e) {
  Oe === null ? (Oe = [e]) : Oe.push(e);
}
var Hf = be.ReactCurrentBatchConfig;
function zn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(g(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(g(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var u = l.refs;
            i === null ? delete u[o] : (u[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(g(284));
    if (!n._owner) throw Error(g(290, e));
  }
  return e;
}
function _r(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      g(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Uu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ra(e) {
  function t(d, c) {
    if (e) {
      var f = d.deletions;
      f === null ? ((d.deletions = [c]), (d.flags |= 16)) : f.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), (c = c.sibling);
    return null;
  }
  function r(d, c) {
    for (d = new Map(); c !== null; )
      c.key !== null ? d.set(c.key, c) : d.set(c.index, c), (c = c.sibling);
    return d;
  }
  function l(d, c) {
    return (d = yt(d, c)), (d.index = 0), (d.sibling = null), d;
  }
  function o(d, c, f) {
    return (
      (d.index = f),
      e
        ? ((f = d.alternate),
          f !== null
            ? ((f = f.index), f < c ? ((d.flags |= 2), c) : f)
            : ((d.flags |= 2), c))
        : ((d.flags |= 1048576), c)
    );
  }
  function i(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, c, f, v) {
    return c === null || c.tag !== 6
      ? ((c = ro(f, d.mode, v)), (c.return = d), c)
      : ((c = l(c, f)), (c.return = d), c);
  }
  function s(d, c, f, v) {
    var C = f.type;
    return C === Qt
      ? m(d, c, f.props.children, v, f.key)
      : c !== null &&
        (c.elementType === C ||
          (typeof C == "object" &&
            C !== null &&
            C.$$typeof === ot &&
            Uu(C) === c.type))
      ? ((v = l(c, f.props)), (v.ref = zn(d, c, f)), (v.return = d), v)
      : ((v = Wr(f.type, f.key, f.props, null, d.mode, v)),
        (v.ref = zn(d, c, f)),
        (v.return = d),
        v);
  }
  function a(d, c, f, v) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== f.containerInfo ||
      c.stateNode.implementation !== f.implementation
      ? ((c = lo(f, d.mode, v)), (c.return = d), c)
      : ((c = l(c, f.children || [])), (c.return = d), c);
  }
  function m(d, c, f, v, C) {
    return c === null || c.tag !== 7
      ? ((c = Ot(f, d.mode, v, C)), (c.return = d), c)
      : ((c = l(c, f)), (c.return = d), c);
  }
  function h(d, c, f) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = ro("" + c, d.mode, f)), (c.return = d), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case vr:
          return (
            (f = Wr(c.type, c.key, c.props, null, d.mode, f)),
            (f.ref = zn(d, null, c)),
            (f.return = d),
            f
          );
        case Wt:
          return (c = lo(c, d.mode, f)), (c.return = d), c;
        case ot:
          var v = c._init;
          return h(d, v(c._payload), f);
      }
      if (Rn(c) || kn(c))
        return (c = Ot(c, d.mode, f, null)), (c.return = d), c;
      _r(d, c);
    }
    return null;
  }
  function p(d, c, f, v) {
    var C = c !== null ? c.key : null;
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return C !== null ? null : u(d, c, "" + f, v);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case vr:
          return f.key === C ? s(d, c, f, v) : null;
        case Wt:
          return f.key === C ? a(d, c, f, v) : null;
        case ot:
          return (C = f._init), p(d, c, C(f._payload), v);
      }
      if (Rn(f) || kn(f)) return C !== null ? null : m(d, c, f, v, null);
      _r(d, f);
    }
    return null;
  }
  function y(d, c, f, v, C) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return (d = d.get(f) || null), u(c, d, "" + v, C);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case vr:
          return (d = d.get(v.key === null ? f : v.key) || null), s(c, d, v, C);
        case Wt:
          return (d = d.get(v.key === null ? f : v.key) || null), a(c, d, v, C);
        case ot:
          var N = v._init;
          return y(d, c, f, N(v._payload), C);
      }
      if (Rn(v) || kn(v)) return (d = d.get(f) || null), m(c, d, v, C, null);
      _r(c, v);
    }
    return null;
  }
  function w(d, c, f, v) {
    for (
      var C = null, N = null, z = c, _ = (c = 0), U = null;
      z !== null && _ < f.length;
      _++
    ) {
      z.index > _ ? ((U = z), (z = null)) : (U = z.sibling);
      var M = p(d, z, f[_], v);
      if (M === null) {
        z === null && (z = U);
        break;
      }
      e && z && M.alternate === null && t(d, z),
        (c = o(M, c, _)),
        N === null ? (C = M) : (N.sibling = M),
        (N = M),
        (z = U);
    }
    if (_ === f.length) return n(d, z), W && _t(d, _), C;
    if (z === null) {
      for (; _ < f.length; _++)
        (z = h(d, f[_], v)),
          z !== null &&
            ((c = o(z, c, _)), N === null ? (C = z) : (N.sibling = z), (N = z));
      return W && _t(d, _), C;
    }
    for (z = r(d, z); _ < f.length; _++)
      (U = y(z, d, _, f[_], v)),
        U !== null &&
          (e && U.alternate !== null && z.delete(U.key === null ? _ : U.key),
          (c = o(U, c, _)),
          N === null ? (C = U) : (N.sibling = U),
          (N = U));
    return (
      e &&
        z.forEach(function (ae) {
          return t(d, ae);
        }),
      W && _t(d, _),
      C
    );
  }
  function x(d, c, f, v) {
    var C = kn(f);
    if (typeof C != "function") throw Error(g(150));
    if (((f = C.call(f)), f == null)) throw Error(g(151));
    for (
      var N = (C = null), z = c, _ = (c = 0), U = null, M = f.next();
      z !== null && !M.done;
      _++, M = f.next()
    ) {
      z.index > _ ? ((U = z), (z = null)) : (U = z.sibling);
      var ae = p(d, z, M.value, v);
      if (ae === null) {
        z === null && (z = U);
        break;
      }
      e && z && ae.alternate === null && t(d, z),
        (c = o(ae, c, _)),
        N === null ? (C = ae) : (N.sibling = ae),
        (N = ae),
        (z = U);
    }
    if (M.done) return n(d, z), W && _t(d, _), C;
    if (z === null) {
      for (; !M.done; _++, M = f.next())
        (M = h(d, M.value, v)),
          M !== null &&
            ((c = o(M, c, _)), N === null ? (C = M) : (N.sibling = M), (N = M));
      return W && _t(d, _), C;
    }
    for (z = r(d, z); !M.done; _++, M = f.next())
      (M = y(z, d, _, M.value, v)),
        M !== null &&
          (e && M.alternate !== null && z.delete(M.key === null ? _ : M.key),
          (c = o(M, c, _)),
          N === null ? (C = M) : (N.sibling = M),
          (N = M));
    return (
      e &&
        z.forEach(function (F) {
          return t(d, F);
        }),
      W && _t(d, _),
      C
    );
  }
  function P(d, c, f, v) {
    if (
      (typeof f == "object" &&
        f !== null &&
        f.type === Qt &&
        f.key === null &&
        (f = f.props.children),
      typeof f == "object" && f !== null)
    ) {
      switch (f.$$typeof) {
        case vr:
          e: {
            for (var C = f.key, N = c; N !== null; ) {
              if (N.key === C) {
                if (((C = f.type), C === Qt)) {
                  if (N.tag === 7) {
                    n(d, N.sibling),
                      (c = l(N, f.props.children)),
                      (c.return = d),
                      (d = c);
                    break e;
                  }
                } else if (
                  N.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === ot &&
                    Uu(C) === N.type)
                ) {
                  n(d, N.sibling),
                    (c = l(N, f.props)),
                    (c.ref = zn(d, N, f)),
                    (c.return = d),
                    (d = c);
                  break e;
                }
                n(d, N);
                break;
              } else t(d, N);
              N = N.sibling;
            }
            f.type === Qt
              ? ((c = Ot(f.props.children, d.mode, v, f.key)),
                (c.return = d),
                (d = c))
              : ((v = Wr(f.type, f.key, f.props, null, d.mode, v)),
                (v.ref = zn(d, c, f)),
                (v.return = d),
                (d = v));
          }
          return i(d);
        case Wt:
          e: {
            for (N = f.key; c !== null; ) {
              if (c.key === N)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === f.containerInfo &&
                  c.stateNode.implementation === f.implementation
                ) {
                  n(d, c.sibling),
                    (c = l(c, f.children || [])),
                    (c.return = d),
                    (d = c);
                  break e;
                } else {
                  n(d, c);
                  break;
                }
              else t(d, c);
              c = c.sibling;
            }
            (c = lo(f, d.mode, v)), (c.return = d), (d = c);
          }
          return i(d);
        case ot:
          return (N = f._init), P(d, c, N(f._payload), v);
      }
      if (Rn(f)) return w(d, c, f, v);
      if (kn(f)) return x(d, c, f, v);
      _r(d, f);
    }
    return (typeof f == "string" && f !== "") || typeof f == "number"
      ? ((f = "" + f),
        c !== null && c.tag === 6
          ? (n(d, c.sibling), (c = l(c, f)), (c.return = d), (d = c))
          : (n(d, c), (c = ro(f, d.mode, v)), (c.return = d), (d = c)),
        i(d))
      : n(d, c);
  }
  return P;
}
var pn = Ra(!0),
  Ma = Ra(!1),
  ll = St(null),
  ol = null,
  bt = null,
  zi = null;
function _i() {
  zi = bt = ol = null;
}
function Pi(e) {
  var t = ll.current;
  H(ll), (e._currentValue = t);
}
function Fo(e, t, n) {
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
function sn(e, t) {
  (ol = e),
    (zi = bt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (he = !0), (e.firstContext = null));
}
function je(e) {
  var t = e._currentValue;
  if (zi !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), bt === null)) {
      if (ol === null) throw Error(g(308));
      (bt = e), (ol.dependencies = { lanes: 0, firstContext: e });
    } else bt = bt.next = e;
  return t;
}
var Lt = null;
function ji(e) {
  Lt === null ? (Lt = [e]) : Lt.push(e);
}
function Oa(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), ji(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    qe(e, r)
  );
}
function qe(e, t) {
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
var it = !1;
function Li(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Ia(e, t) {
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
function Xe(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function ht(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      qe(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), ji(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    qe(e, n)
  );
}
function Ar(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), hi(e, n);
  }
}
function Vu(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
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
function il(e, t, n, r) {
  var l = e.updateQueue;
  it = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u,
      a = s.next;
    (s.next = null), i === null ? (o = a) : (i.next = a), (i = s);
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (u = m.lastBaseUpdate),
      u !== i &&
        (u === null ? (m.firstBaseUpdate = a) : (u.next = a),
        (m.lastBaseUpdate = s)));
  }
  if (o !== null) {
    var h = l.baseState;
    (i = 0), (m = a = s = null), (u = o);
    do {
      var p = u.lane,
        y = u.eventTime;
      if ((r & p) === p) {
        m !== null &&
          (m = m.next =
            {
              eventTime: y,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var w = e,
            x = u;
          switch (((p = t), (y = n), x.tag)) {
            case 1:
              if (((w = x.payload), typeof w == "function")) {
                h = w.call(y, h, p);
                break e;
              }
              h = w;
              break e;
            case 3:
              w.flags = (w.flags & -65537) | 128;
            case 0:
              if (
                ((w = x.payload),
                (p = typeof w == "function" ? w.call(y, h, p) : w),
                p == null)
              )
                break e;
              h = X({}, h, p);
              break e;
            case 2:
              it = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (p = l.effects),
          p === null ? (l.effects = [u]) : p.push(u));
      } else
        (y = {
          eventTime: y,
          lane: p,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          m === null ? ((a = m = y), (s = h)) : (m = m.next = y),
          (i |= p);
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        (p = u),
          (u = p.next),
          (p.next = null),
          (l.lastBaseUpdate = p),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (m === null && (s = h),
      (l.baseState = s),
      (l.firstBaseUpdate = a),
      (l.lastBaseUpdate = m),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (At |= i), (e.lanes = i), (e.memoizedState = h);
  }
}
function Bu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(g(191, l));
        l.call(r);
      }
    }
}
var dr = {},
  Be = St(dr),
  tr = St(dr),
  nr = St(dr);
function Tt(e) {
  if (e === dr) throw Error(g(174));
  return e;
}
function Ti(e, t) {
  switch (($(nr, t), $(tr, e), $(Be, dr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vo(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = vo(t, e));
  }
  H(Be), $(Be, t);
}
function mn() {
  H(Be), H(tr), H(nr);
}
function Fa(e) {
  Tt(nr.current);
  var t = Tt(Be.current),
    n = vo(t, e.type);
  t !== n && ($(tr, e), $(Be, n));
}
function Ri(e) {
  tr.current === e && (H(Be), H(tr));
}
var G = St(0);
function ul(e) {
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
var ql = [];
function Mi() {
  for (var e = 0; e < ql.length; e++)
    ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var $r = be.ReactCurrentDispatcher,
  Zl = be.ReactCurrentBatchConfig,
  Dt = 0,
  K = null,
  Z = null,
  ee = null,
  sl = !1,
  Un = !1,
  rr = 0,
  Wf = 0;
function oe() {
  throw Error(g(321));
}
function Oi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!De(e[n], t[n])) return !1;
  return !0;
}
function Ii(e, t, n, r, l, o) {
  if (
    ((Dt = o),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    ($r.current = e === null || e.memoizedState === null ? Xf : Yf),
    (e = n(r, l)),
    Un)
  ) {
    o = 0;
    do {
      if (((Un = !1), (rr = 0), 25 <= o)) throw Error(g(301));
      (o += 1),
        (ee = Z = null),
        (t.updateQueue = null),
        ($r.current = Jf),
        (e = n(r, l));
    } while (Un);
  }
  if (
    (($r.current = al),
    (t = Z !== null && Z.next !== null),
    (Dt = 0),
    (ee = Z = K = null),
    (sl = !1),
    t)
  )
    throw Error(g(300));
  return e;
}
function Fi() {
  var e = rr !== 0;
  return (rr = 0), e;
}
function $e() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ee === null ? (K.memoizedState = ee = e) : (ee = ee.next = e), ee;
}
function Le() {
  if (Z === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = ee === null ? K.memoizedState : ee.next;
  if (t !== null) (ee = t), (Z = e);
  else {
    if (e === null) throw Error(g(310));
    (Z = e),
      (e = {
        memoizedState: Z.memoizedState,
        baseState: Z.baseState,
        baseQueue: Z.baseQueue,
        queue: Z.queue,
        next: null,
      }),
      ee === null ? (K.memoizedState = ee = e) : (ee = ee.next = e);
  }
  return ee;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function bl(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(g(311));
  n.lastRenderedReducer = e;
  var r = Z,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var u = (i = null),
      s = null,
      a = o;
    do {
      var m = a.lane;
      if ((Dt & m) === m)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var h = {
          lane: m,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        s === null ? ((u = s = h), (i = r)) : (s = s.next = h),
          (K.lanes |= m),
          (At |= m);
      }
      a = a.next;
    } while (a !== null && a !== o);
    s === null ? (i = r) : (s.next = u),
      De(r, t.memoizedState) || (he = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (K.lanes |= o), (At |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function eo(e) {
  var t = Le(),
    n = t.queue;
  if (n === null) throw Error(g(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    De(o, t.memoizedState) || (he = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Da() {}
function Aa(e, t) {
  var n = K,
    r = Le(),
    l = t(),
    o = !De(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (he = !0)),
    (r = r.queue),
    Di(Va.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (ee !== null && ee.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      or(9, Ua.bind(null, n, r, l, t), void 0, null),
      te === null)
    )
      throw Error(g(349));
    Dt & 30 || $a(n, t, l);
  }
  return l;
}
function $a(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Ua(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Ba(t) && Ha(e);
}
function Va(e, t, n) {
  return n(function () {
    Ba(t) && Ha(e);
  });
}
function Ba(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function Ha(e) {
  var t = qe(e, 1);
  t !== null && Fe(t, e, 1, -1);
}
function Hu(e) {
  var t = $e();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Kf.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function or(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Wa() {
  return Le().memoizedState;
}
function Ur(e, t, n, r) {
  var l = $e();
  (K.flags |= e),
    (l.memoizedState = or(1 | t, n, void 0, r === void 0 ? null : r));
}
function Cl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Z !== null) {
    var i = Z.memoizedState;
    if (((o = i.destroy), r !== null && Oi(r, i.deps))) {
      l.memoizedState = or(t, n, o, r);
      return;
    }
  }
  (K.flags |= e), (l.memoizedState = or(1 | t, n, o, r));
}
function Wu(e, t) {
  return Ur(8390656, 8, e, t);
}
function Di(e, t) {
  return Cl(2048, 8, e, t);
}
function Qa(e, t) {
  return Cl(4, 2, e, t);
}
function Ga(e, t) {
  return Cl(4, 4, e, t);
}
function Ka(e, t) {
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
function Xa(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Cl(4, 4, Ka.bind(null, t, e), n)
  );
}
function Ai() {}
function Ya(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oi(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Ja(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oi(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function qa(e, t, n) {
  return Dt & 21
    ? (De(n, t) || ((n = na()), (K.lanes |= n), (At |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (he = !0)), (e.memoizedState = n));
}
function Qf(e, t) {
  var n = D;
  (D = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Zl.transition;
  Zl.transition = {};
  try {
    e(!1), t();
  } finally {
    (D = n), (Zl.transition = r);
  }
}
function Za() {
  return Le().memoizedState;
}
function Gf(e, t, n) {
  var r = gt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    ba(e))
  )
    ec(t, n);
  else if (((n = Oa(e, t, n, r)), n !== null)) {
    var l = de();
    Fe(n, e, r, l), tc(n, t, r);
  }
}
function Kf(e, t, n) {
  var r = gt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ba(e)) ec(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          u = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), De(u, i))) {
          var s = t.interleaved;
          s === null
            ? ((l.next = l), ji(t))
            : ((l.next = s.next), (s.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Oa(e, t, l, r)),
      n !== null && ((l = de()), Fe(n, e, r, l), tc(n, t, r));
  }
}
function ba(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function ec(e, t) {
  Un = sl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function tc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), hi(e, n);
  }
}
var al = {
    readContext: je,
    useCallback: oe,
    useContext: oe,
    useEffect: oe,
    useImperativeHandle: oe,
    useInsertionEffect: oe,
    useLayoutEffect: oe,
    useMemo: oe,
    useReducer: oe,
    useRef: oe,
    useState: oe,
    useDebugValue: oe,
    useDeferredValue: oe,
    useTransition: oe,
    useMutableSource: oe,
    useSyncExternalStore: oe,
    useId: oe,
    unstable_isNewReconciler: !1,
  },
  Xf = {
    readContext: je,
    useCallback: function (e, t) {
      return ($e().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: je,
    useEffect: Wu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ur(4194308, 4, Ka.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ur(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ur(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = $e();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = $e();
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
        (e = e.dispatch = Gf.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = $e();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Hu,
    useDebugValue: Ai,
    useDeferredValue: function (e) {
      return ($e().memoizedState = e);
    },
    useTransition: function () {
      var e = Hu(!1),
        t = e[0];
      return (e = Qf.bind(null, e[1])), ($e().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        l = $e();
      if (W) {
        if (n === void 0) throw Error(g(407));
        n = n();
      } else {
        if (((n = t()), te === null)) throw Error(g(349));
        Dt & 30 || $a(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        Wu(Va.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        or(9, Ua.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = $e(),
        t = te.identifierPrefix;
      if (W) {
        var n = Ke,
          r = Ge;
        (n = (r & ~(1 << (32 - Ie(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = rr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Wf++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Yf = {
    readContext: je,
    useCallback: Ya,
    useContext: je,
    useEffect: Di,
    useImperativeHandle: Xa,
    useInsertionEffect: Qa,
    useLayoutEffect: Ga,
    useMemo: Ja,
    useReducer: bl,
    useRef: Wa,
    useState: function () {
      return bl(lr);
    },
    useDebugValue: Ai,
    useDeferredValue: function (e) {
      var t = Le();
      return qa(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = bl(lr)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: Da,
    useSyncExternalStore: Aa,
    useId: Za,
    unstable_isNewReconciler: !1,
  },
  Jf = {
    readContext: je,
    useCallback: Ya,
    useContext: je,
    useEffect: Di,
    useImperativeHandle: Xa,
    useInsertionEffect: Qa,
    useLayoutEffect: Ga,
    useMemo: Ja,
    useReducer: eo,
    useRef: Wa,
    useState: function () {
      return eo(lr);
    },
    useDebugValue: Ai,
    useDeferredValue: function (e) {
      var t = Le();
      return Z === null ? (t.memoizedState = e) : qa(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = eo(lr)[0],
        t = Le().memoizedState;
      return [e, t];
    },
    useMutableSource: Da,
    useSyncExternalStore: Aa,
    useId: Za,
    unstable_isNewReconciler: !1,
  };
function Re(e, t) {
  if (e && e.defaultProps) {
    (t = X({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Do(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : X({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var El = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Vt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = de(),
      l = gt(e),
      o = Xe(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = ht(e, o, l)),
      t !== null && (Fe(t, e, l, r), Ar(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = de(),
      l = gt(e),
      o = Xe(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = ht(e, o, l)),
      t !== null && (Fe(t, e, l, r), Ar(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = de(),
      r = gt(e),
      l = Xe(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = ht(e, l, r)),
      t !== null && (Fe(t, e, r, n), Ar(t, e, r));
  },
};
function Qu(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !qn(n, r) || !qn(l, o)
      : !0
  );
}
function nc(e, t, n) {
  var r = !1,
    l = xt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = je(o))
      : ((l = ge(t) ? It : se.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? dn(e, l) : xt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = El),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Gu(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && El.enqueueReplaceState(t, t.state, null);
}
function Ao(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Li(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = je(o))
    : ((o = ge(t) ? It : se.current), (l.context = dn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Do(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && El.enqueueReplaceState(l, l.state, null),
      il(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function hn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Cd(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function to(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function $o(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var qf = typeof WeakMap == "function" ? WeakMap : Map;
function rc(e, t, n) {
  (n = Xe(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      dl || ((dl = !0), (Yo = r)), $o(e, t);
    }),
    n
  );
}
function lc(e, t, n) {
  (n = Xe(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        $o(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        $o(e, t),
          typeof r != "function" &&
            (vt === null ? (vt = new Set([this])) : vt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function Ku(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new qf();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = dp.bind(null, e, t, n)), t.then(e, e));
}
function Xu(e) {
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
function Yu(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Xe(-1, 1)), (t.tag = 2), ht(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Zf = be.ReactCurrentOwner,
  he = !1;
function ce(e, t, n, r) {
  t.child = e === null ? Ma(t, null, n, r) : pn(t, e.child, n, r);
}
function Ju(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    sn(t, l),
    (r = Ii(e, t, n, r, o, l)),
    (n = Fi()),
    e !== null && !he
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ze(e, t, l))
      : (W && n && Ci(t), (t.flags |= 1), ce(e, t, r, l), t.child)
  );
}
function qu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !Gi(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), oc(e, t, o, r, l))
      : ((e = Wr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : qn), n(i, r) && e.ref === t.ref)
    )
      return Ze(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = yt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function oc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (qn(o, r) && e.ref === t.ref)
      if (((he = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (he = !0);
      else return (t.lanes = e.lanes), Ze(e, t, l);
  }
  return Uo(e, t, n, r, l);
}
function ic(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        $(tn, we),
        (we |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          $(tn, we),
          (we |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        $(tn, we),
        (we |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      $(tn, we),
      (we |= r);
  return ce(e, t, l, n), t.child;
}
function uc(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Uo(e, t, n, r, l) {
  var o = ge(n) ? It : se.current;
  return (
    (o = dn(t, o)),
    sn(t, l),
    (n = Ii(e, t, n, r, o, l)),
    (r = Fi()),
    e !== null && !he
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ze(e, t, l))
      : (W && r && Ci(t), (t.flags |= 1), ce(e, t, n, l), t.child)
  );
}
function Zu(e, t, n, r, l) {
  if (ge(n)) {
    var o = !0;
    tl(t);
  } else o = !1;
  if ((sn(t, l), t.stateNode === null))
    Vr(e, t), nc(t, n, r), Ao(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      u = t.memoizedProps;
    i.props = u;
    var s = i.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = je(a))
      : ((a = ge(n) ? It : se.current), (a = dn(t, a)));
    var m = n.getDerivedStateFromProps,
      h =
        typeof m == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    h ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== r || s !== a) && Gu(t, i, r, a)),
      (it = !1);
    var p = t.memoizedState;
    (i.state = p),
      il(t, r, i, l),
      (s = t.memoizedState),
      u !== r || p !== s || ve.current || it
        ? (typeof m == "function" && (Do(t, n, m, r), (s = t.memoizedState)),
          (u = it || Qu(t, n, u, r, p, s, a))
            ? (h ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (i.props = r),
          (i.state = s),
          (i.context = a),
          (r = u))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      Ia(e, t),
      (u = t.memoizedProps),
      (a = t.type === t.elementType ? u : Re(t.type, u)),
      (i.props = a),
      (h = t.pendingProps),
      (p = i.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = je(s))
        : ((s = ge(n) ? It : se.current), (s = dn(t, s)));
    var y = n.getDerivedStateFromProps;
    (m =
      typeof y == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((u !== h || p !== s) && Gu(t, i, r, s)),
      (it = !1),
      (p = t.memoizedState),
      (i.state = p),
      il(t, r, i, l);
    var w = t.memoizedState;
    u !== h || p !== w || ve.current || it
      ? (typeof y == "function" && (Do(t, n, y, r), (w = t.memoizedState)),
        (a = it || Qu(t, n, a, r, p, w, s) || !1)
          ? (m ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, w, s),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, w, s)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && p === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = w)),
        (i.props = r),
        (i.state = w),
        (i.context = s),
        (r = a))
      : (typeof i.componentDidUpdate != "function" ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && p === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Vo(e, t, n, r, o, l);
}
function Vo(e, t, n, r, l, o) {
  uc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Du(t, n, !1), Ze(e, t, o);
  (r = t.stateNode), (Zf.current = t);
  var u =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = pn(t, e.child, null, o)), (t.child = pn(t, null, u, o)))
      : ce(e, t, u, o),
    (t.memoizedState = r.state),
    l && Du(t, n, !0),
    t.child
  );
}
function sc(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Fu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Fu(e, t.context, !1),
    Ti(e, t.containerInfo);
}
function bu(e, t, n, r, l) {
  return fn(), Ni(l), (t.flags |= 256), ce(e, t, n, r), t.child;
}
var Bo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ho(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ac(e, t, n) {
  var r = t.pendingProps,
    l = G.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    u;
  if (
    ((u = i) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    $(G, l & 1),
    e === null)
  )
    return (
      Io(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = _l(i, r, 0, null)),
              (e = Ot(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ho(n)),
              (t.memoizedState = Bo),
              e)
            : $i(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return bf(e, t, i, r, u, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (u = l.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = yt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (o = yt(u, o)) : ((o = Ot(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Ho(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Bo),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = yt(o, { mode: "visible", children: r.children })),
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
function $i(e, t) {
  return (
    (t = _l({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Pr(e, t, n, r) {
  return (
    r !== null && Ni(r),
    pn(t, e.child, null, n),
    (e = $i(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function bf(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = to(Error(g(422)))), Pr(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = _l({ mode: "visible", children: r.children }, l, 0, null)),
        (o = Ot(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && pn(t, e.child, null, i),
        (t.child.memoizedState = Ho(i)),
        (t.memoizedState = Bo),
        o);
  if (!(t.mode & 1)) return Pr(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (o = Error(g(419))), (r = to(o, r, void 0)), Pr(e, t, i, r);
  }
  if (((u = (i & e.childLanes) !== 0), he || u)) {
    if (((r = te), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), qe(e, l), Fe(r, e, l, -1));
    }
    return Qi(), (r = to(Error(g(421)))), Pr(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = fp.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (xe = mt(l.nextSibling)),
      (ke = t),
      (W = !0),
      (Oe = null),
      e !== null &&
        ((Ne[ze++] = Ge),
        (Ne[ze++] = Ke),
        (Ne[ze++] = Ft),
        (Ge = e.id),
        (Ke = e.overflow),
        (Ft = t)),
      (t = $i(t, r.children)),
      (t.flags |= 4096),
      t);
}
function es(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Fo(e.return, t, n);
}
function no(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function cc(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((ce(e, t, r.children, n), (r = G.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && es(e, n, t);
        else if (e.tag === 19) es(e, n, t);
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
  if (($(G, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && ul(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          no(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && ul(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        no(t, !0, n, null, o);
        break;
      case "together":
        no(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Vr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ze(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (At |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(g(153));
  if (t.child !== null) {
    for (
      e = t.child, n = yt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = yt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function ep(e, t, n) {
  switch (t.tag) {
    case 3:
      sc(t), fn();
      break;
    case 5:
      Fa(t);
      break;
    case 1:
      ge(t.type) && tl(t);
      break;
    case 4:
      Ti(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      $(ll, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? ($(G, G.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? ac(e, t, n)
          : ($(G, G.current & 1),
            (e = Ze(e, t, n)),
            e !== null ? e.sibling : null);
      $(G, G.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return cc(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        $(G, G.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), ic(e, t, n);
  }
  return Ze(e, t, n);
}
var dc, Wo, fc, pc;
dc = function (e, t) {
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
Wo = function () {};
fc = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Tt(Be.current);
    var o = null;
    switch (n) {
      case "input":
        (l = fo(e, l)), (r = fo(e, r)), (o = []);
        break;
      case "select":
        (l = X({}, l, { value: void 0 })),
          (r = X({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = ho(e, l)), (r = ho(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = br);
    }
    go(n, r);
    var i;
    n = null;
    for (a in l)
      if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
        if (a === "style") {
          var u = l[a];
          for (i in u) u.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (Wn.hasOwnProperty(a)
              ? o || (o = [])
              : (o = o || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (
        ((u = l != null ? l[a] : void 0),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === "style")
          if (u) {
            for (i in u)
              !u.hasOwnProperty(i) ||
                (s && s.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in s)
              s.hasOwnProperty(i) &&
                u[i] !== s[i] &&
                (n || (n = {}), (n[i] = s[i]));
          } else n || (o || (o = []), o.push(a, n)), (n = s);
        else
          a === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (o = o || []).push(a, s))
            : a === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (o = o || []).push(a, "" + s)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (Wn.hasOwnProperty(a)
                ? (s != null && a === "onScroll" && B("scroll", e),
                  o || u === s || (o = []))
                : (o = o || []).push(a, s));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
pc = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!W)
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
function ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function tp(e, t, n) {
  var r = t.pendingProps;
  switch ((Ei(t), t.tag)) {
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
      return ie(t), null;
    case 1:
      return ge(t.type) && el(), ie(t), null;
    case 3:
      return (
        (r = t.stateNode),
        mn(),
        H(ve),
        H(se),
        Mi(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (zr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Oe !== null && (Zo(Oe), (Oe = null)))),
        Wo(e, t),
        ie(t),
        null
      );
    case 5:
      Ri(t);
      var l = Tt(nr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        fc(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(g(166));
          return ie(t), null;
        }
        if (((e = Tt(Be.current)), zr(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Ue] = t), (r[er] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              B("cancel", r), B("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              B("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < On.length; l++) B(On[l], r);
              break;
            case "source":
              B("error", r);
              break;
            case "img":
            case "image":
            case "link":
              B("error", r), B("load", r);
              break;
            case "details":
              B("toggle", r);
              break;
            case "input":
              au(r, o), B("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                B("invalid", r);
              break;
            case "textarea":
              du(r, o), B("invalid", r);
          }
          go(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Nr(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (o.suppressHydrationWarning !== !0 &&
                      Nr(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Wn.hasOwnProperty(i) &&
                  u != null &&
                  i === "onScroll" &&
                  B("scroll", r);
            }
          switch (n) {
            case "input":
              gr(r), cu(r, o, !0);
              break;
            case "textarea":
              gr(r), fu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = br);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Vs(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Ue] = t),
            (e[er] = r),
            dc(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = yo(n, r)), n)) {
              case "dialog":
                B("cancel", e), B("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                B("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < On.length; l++) B(On[l], e);
                l = r;
                break;
              case "source":
                B("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                B("error", e), B("load", e), (l = r);
                break;
              case "details":
                B("toggle", e), (l = r);
                break;
              case "input":
                au(e, r), (l = fo(e, r)), B("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = X({}, r, { value: void 0 })),
                  B("invalid", e);
                break;
              case "textarea":
                du(e, r), (l = ho(e, r)), B("invalid", e);
                break;
              default:
                l = r;
            }
            go(n, l), (u = l);
            for (o in u)
              if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === "style"
                  ? Ws(e, s)
                  : o === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && Bs(e, s))
                  : o === "children"
                  ? typeof s == "string"
                    ? (n !== "textarea" || s !== "") && Qn(e, s)
                    : typeof s == "number" && Qn(e, "" + s)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (Wn.hasOwnProperty(o)
                      ? s != null && o === "onScroll" && B("scroll", e)
                      : s != null && ai(e, o, s, i));
              }
            switch (n) {
              case "input":
                gr(e), cu(e, r, !1);
                break;
              case "textarea":
                gr(e), fu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? rn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      rn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = br);
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
      return ie(t), null;
    case 6:
      if (e && t.stateNode != null) pc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(g(166));
        if (((n = Tt(nr.current)), Tt(Be.current), zr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ue] = t),
            (o = r.nodeValue !== n) && ((e = ke), e !== null))
          )
            switch (e.tag) {
              case 3:
                Nr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Nr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ue] = t),
            (t.stateNode = r);
      }
      return ie(t), null;
    case 13:
      if (
        (H(G),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (W && xe !== null && t.mode & 1 && !(t.flags & 128))
          Ta(), fn(), (t.flags |= 98560), (o = !1);
        else if (((o = zr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(g(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(g(317));
            o[Ue] = t;
          } else
            fn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ie(t), (o = !1);
        } else Oe !== null && (Zo(Oe), (Oe = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || G.current & 1 ? b === 0 && (b = 3) : Qi())),
          t.updateQueue !== null && (t.flags |= 4),
          ie(t),
          null);
    case 4:
      return (
        mn(), Wo(e, t), e === null && Zn(t.stateNode.containerInfo), ie(t), null
      );
    case 10:
      return Pi(t.type._context), ie(t), null;
    case 17:
      return ge(t.type) && el(), ie(t), null;
    case 19:
      if ((H(G), (o = t.memoizedState), o === null)) return ie(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) _n(o, !1);
        else {
          if (b !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = ul(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    _n(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return $(G, (G.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            J() > vn &&
            ((t.flags |= 128), (r = !0), _n(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ul(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              _n(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !W)
            )
              return ie(t), null;
          } else
            2 * J() - o.renderingStartTime > vn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), _n(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = J()),
          (t.sibling = null),
          (n = G.current),
          $(G, r ? (n & 1) | 2 : n & 1),
          t)
        : (ie(t), null);
    case 22:
    case 23:
      return (
        Wi(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? we & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ie(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(g(156, t.tag));
}
function np(e, t) {
  switch ((Ei(t), t.tag)) {
    case 1:
      return (
        ge(t.type) && el(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        mn(),
        H(ve),
        H(se),
        Mi(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ri(t), null;
    case 13:
      if ((H(G), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(g(340));
        fn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return H(G), null;
    case 4:
      return mn(), null;
    case 10:
      return Pi(t.type._context), null;
    case 22:
    case 23:
      return Wi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var jr = !1,
  ue = !1,
  rp = typeof WeakSet == "function" ? WeakSet : Set,
  E = null;
function en(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Y(e, t, r);
      }
    else n.current = null;
}
function Qo(e, t, n) {
  try {
    n();
  } catch (r) {
    Y(e, t, r);
  }
}
var ts = !1;
function lp(e, t) {
  if (((Po = Jr), (e = ya()), Si(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            u = -1,
            s = -1,
            a = 0,
            m = 0,
            h = e,
            p = null;
          t: for (;;) {
            for (
              var y;
              h !== n || (l !== 0 && h.nodeType !== 3) || (u = i + l),
                h !== o || (r !== 0 && h.nodeType !== 3) || (s = i + r),
                h.nodeType === 3 && (i += h.nodeValue.length),
                (y = h.firstChild) !== null;

            )
              (p = h), (h = y);
            for (;;) {
              if (h === e) break t;
              if (
                (p === n && ++a === l && (u = i),
                p === o && ++m === r && (s = i),
                (y = h.nextSibling) !== null)
              )
                break;
              (h = p), (p = h.parentNode);
            }
            h = y;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (jo = { focusedElem: e, selectionRange: n }, Jr = !1, E = t; E !== null; )
    if (((t = E), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (E = e);
    else
      for (; E !== null; ) {
        t = E;
        try {
          var w = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (w !== null) {
                  var x = w.memoizedProps,
                    P = w.memoizedState,
                    d = t.stateNode,
                    c = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? x : Re(t.type, x),
                      P
                    );
                  d.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var f = t.stateNode.containerInfo;
                f.nodeType === 1
                  ? (f.textContent = "")
                  : f.nodeType === 9 &&
                    f.documentElement &&
                    f.removeChild(f.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(g(163));
            }
        } catch (v) {
          Y(t, t.return, v);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (E = e);
          break;
        }
        E = t.return;
      }
  return (w = ts), (ts = !1), w;
}
function Vn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && Qo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Nl(e, t) {
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
function Go(e) {
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
function mc(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), mc(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ue], delete t[er], delete t[Ro], delete t[Uf], delete t[Vf])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function hc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ns(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || hc(e.return)) return null;
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
function Ko(e, t, n) {
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
          n != null || t.onclick !== null || (t.onclick = br));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ko(e, t, n), e = e.sibling; e !== null; ) Ko(e, t, n), (e = e.sibling);
}
function Xo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Xo(e, t, n), e = e.sibling; e !== null; ) Xo(e, t, n), (e = e.sibling);
}
var ne = null,
  Me = !1;
function nt(e, t, n) {
  for (n = n.child; n !== null; ) vc(e, t, n), (n = n.sibling);
}
function vc(e, t, n) {
  if (Ve && typeof Ve.onCommitFiberUnmount == "function")
    try {
      Ve.onCommitFiberUnmount(gl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ue || en(n, t);
    case 6:
      var r = ne,
        l = Me;
      (ne = null),
        nt(e, t, n),
        (ne = r),
        (Me = l),
        ne !== null &&
          (Me
            ? ((e = ne),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null &&
        (Me
          ? ((e = ne),
            (n = n.stateNode),
            e.nodeType === 8
              ? Yl(e.parentNode, n)
              : e.nodeType === 1 && Yl(e, n),
            Yn(e))
          : Yl(ne, n.stateNode));
      break;
    case 4:
      (r = ne),
        (l = Me),
        (ne = n.stateNode.containerInfo),
        (Me = !0),
        nt(e, t, n),
        (ne = r),
        (Me = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ue &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && Qo(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      nt(e, t, n);
      break;
    case 1:
      if (
        !ue &&
        (en(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          Y(n, t, u);
        }
      nt(e, t, n);
      break;
    case 21:
      nt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ue = (r = ue) || n.memoizedState !== null), nt(e, t, n), (ue = r))
        : nt(e, t, n);
      break;
    default:
      nt(e, t, n);
  }
}
function rs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new rp()),
      t.forEach(function (r) {
        var l = pp.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Te(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (ne = u.stateNode), (Me = !1);
              break e;
            case 3:
              (ne = u.stateNode.containerInfo), (Me = !0);
              break e;
            case 4:
              (ne = u.stateNode.containerInfo), (Me = !0);
              break e;
          }
          u = u.return;
        }
        if (ne === null) throw Error(g(160));
        vc(o, i, l), (ne = null), (Me = !1);
        var s = l.alternate;
        s !== null && (s.return = null), (l.return = null);
      } catch (a) {
        Y(l, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) gc(t, e), (t = t.sibling);
}
function gc(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Te(t, e), Ae(e), r & 4)) {
        try {
          Vn(3, e, e.return), Nl(3, e);
        } catch (x) {
          Y(e, e.return, x);
        }
        try {
          Vn(5, e, e.return);
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      break;
    case 1:
      Te(t, e), Ae(e), r & 512 && n !== null && en(n, n.return);
      break;
    case 5:
      if (
        (Te(t, e),
        Ae(e),
        r & 512 && n !== null && en(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Qn(l, "");
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            u === "input" && o.type === "radio" && o.name != null && $s(l, o),
              yo(u, i);
            var a = yo(u, o);
            for (i = 0; i < s.length; i += 2) {
              var m = s[i],
                h = s[i + 1];
              m === "style"
                ? Ws(l, h)
                : m === "dangerouslySetInnerHTML"
                ? Bs(l, h)
                : m === "children"
                ? Qn(l, h)
                : ai(l, m, h, a);
            }
            switch (u) {
              case "input":
                po(l, o);
                break;
              case "textarea":
                Us(l, o);
                break;
              case "select":
                var p = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var y = o.value;
                y != null
                  ? rn(l, !!o.multiple, y, !1)
                  : p !== !!o.multiple &&
                    (o.defaultValue != null
                      ? rn(l, !!o.multiple, o.defaultValue, !0)
                      : rn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[er] = o;
          } catch (x) {
            Y(e, e.return, x);
          }
      }
      break;
    case 6:
      if ((Te(t, e), Ae(e), r & 4)) {
        if (e.stateNode === null) throw Error(g(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (x) {
          Y(e, e.return, x);
        }
      }
      break;
    case 3:
      if (
        (Te(t, e), Ae(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Yn(t.containerInfo);
        } catch (x) {
          Y(e, e.return, x);
        }
      break;
    case 4:
      Te(t, e), Ae(e);
      break;
    case 13:
      Te(t, e),
        Ae(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Bi = J())),
        r & 4 && rs(e);
      break;
    case 22:
      if (
        ((m = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ue = (a = ue) || m), Te(t, e), (ue = a)) : Te(t, e),
        Ae(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !m && e.mode & 1)
        )
          for (E = e, m = e.child; m !== null; ) {
            for (h = E = m; E !== null; ) {
              switch (((p = E), (y = p.child), p.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Vn(4, p, p.return);
                  break;
                case 1:
                  en(p, p.return);
                  var w = p.stateNode;
                  if (typeof w.componentWillUnmount == "function") {
                    (r = p), (n = p.return);
                    try {
                      (t = r),
                        (w.props = t.memoizedProps),
                        (w.state = t.memoizedState),
                        w.componentWillUnmount();
                    } catch (x) {
                      Y(r, n, x);
                    }
                  }
                  break;
                case 5:
                  en(p, p.return);
                  break;
                case 22:
                  if (p.memoizedState !== null) {
                    os(h);
                    continue;
                  }
              }
              y !== null ? ((y.return = p), (E = y)) : os(h);
            }
            m = m.sibling;
          }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                (l = h.stateNode),
                  a
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((u = h.stateNode),
                      (s = h.memoizedProps.style),
                      (i =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = Hs("display", i)));
              } catch (x) {
                Y(e, e.return, x);
              }
            }
          } else if (h.tag === 6) {
            if (m === null)
              try {
                h.stateNode.nodeValue = a ? "" : h.memoizedProps;
              } catch (x) {
                Y(e, e.return, x);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            (h.child.return = h), (h = h.child);
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            m === h && (m = null), (h = h.return);
          }
          m === h && (m = null), (h.sibling.return = h.return), (h = h.sibling);
        }
      }
      break;
    case 19:
      Te(t, e), Ae(e), r & 4 && rs(e);
      break;
    case 21:
      break;
    default:
      Te(t, e), Ae(e);
  }
}
function Ae(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (hc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(g(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Qn(l, ""), (r.flags &= -33));
          var o = ns(e);
          Xo(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            u = ns(e);
          Ko(e, u, i);
          break;
        default:
          throw Error(g(161));
      }
    } catch (s) {
      Y(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function op(e, t, n) {
  (E = e), yc(e);
}
function yc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var l = E,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || jr;
      if (!i) {
        var u = l.alternate,
          s = (u !== null && u.memoizedState !== null) || ue;
        u = jr;
        var a = ue;
        if (((jr = i), (ue = s) && !a))
          for (E = l; E !== null; )
            (i = E),
              (s = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? is(l)
                : s !== null
                ? ((s.return = i), (E = s))
                : is(l);
        for (; o !== null; ) (E = o), yc(o), (o = o.sibling);
        (E = l), (jr = u), (ue = a);
      }
      ls(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (E = o)) : ls(e);
  }
}
function ls(e) {
  for (; E !== null; ) {
    var t = E;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ue || Nl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ue)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Re(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Bu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Bu(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
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
                var a = t.alternate;
                if (a !== null) {
                  var m = a.memoizedState;
                  if (m !== null) {
                    var h = m.dehydrated;
                    h !== null && Yn(h);
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
              throw Error(g(163));
          }
        ue || (t.flags & 512 && Go(t));
      } catch (p) {
        Y(t, t.return, p);
      }
    }
    if (t === e) {
      E = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (E = n);
      break;
    }
    E = t.return;
  }
}
function os(e) {
  for (; E !== null; ) {
    var t = E;
    if (t === e) {
      E = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (E = n);
      break;
    }
    E = t.return;
  }
}
function is(e) {
  for (; E !== null; ) {
    var t = E;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Nl(4, t);
          } catch (s) {
            Y(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Y(t, l, s);
            }
          }
          var o = t.return;
          try {
            Go(t);
          } catch (s) {
            Y(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Go(t);
          } catch (s) {
            Y(t, i, s);
          }
      }
    } catch (s) {
      Y(t, t.return, s);
    }
    if (t === e) {
      E = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (E = u);
      break;
    }
    E = t.return;
  }
}
var ip = Math.ceil,
  cl = be.ReactCurrentDispatcher,
  Ui = be.ReactCurrentOwner,
  Pe = be.ReactCurrentBatchConfig,
  I = 0,
  te = null,
  q = null,
  re = 0,
  we = 0,
  tn = St(0),
  b = 0,
  ir = null,
  At = 0,
  zl = 0,
  Vi = 0,
  Bn = null,
  me = null,
  Bi = 0,
  vn = 1 / 0,
  We = null,
  dl = !1,
  Yo = null,
  vt = null,
  Lr = !1,
  ct = null,
  fl = 0,
  Hn = 0,
  Jo = null,
  Br = -1,
  Hr = 0;
function de() {
  return I & 6 ? J() : Br !== -1 ? Br : (Br = J());
}
function gt(e) {
  return e.mode & 1
    ? I & 2 && re !== 0
      ? re & -re
      : Hf.transition !== null
      ? (Hr === 0 && (Hr = na()), Hr)
      : ((e = D),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : aa(e.type))),
        e)
    : 1;
}
function Fe(e, t, n, r) {
  if (50 < Hn) throw ((Hn = 0), (Jo = null), Error(g(185)));
  sr(e, n, r),
    (!(I & 2) || e !== te) &&
      (e === te && (!(I & 2) && (zl |= n), b === 4 && st(e, re)),
      ye(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((vn = J() + 500), Sl && Ct()));
}
function ye(e, t) {
  var n = e.callbackNode;
  Bd(e, t);
  var r = Yr(e, e === te ? re : 0);
  if (r === 0)
    n !== null && hu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && hu(n), t === 1))
      e.tag === 0 ? Bf(us.bind(null, e)) : Pa(us.bind(null, e)),
        Af(function () {
          !(I & 6) && Ct();
        }),
        (n = null);
    else {
      switch (ra(r)) {
        case 1:
          n = mi;
          break;
        case 4:
          n = ea;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = ta;
          break;
        default:
          n = Xr;
      }
      n = zc(n, wc.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function wc(e, t) {
  if (((Br = -1), (Hr = 0), I & 6)) throw Error(g(327));
  var n = e.callbackNode;
  if (an() && e.callbackNode !== n) return null;
  var r = Yr(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = pl(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = kc();
    (te !== e || re !== t) && ((We = null), (vn = J() + 500), Mt(e, t));
    do
      try {
        ap();
        break;
      } catch (u) {
        xc(e, u);
      }
    while (!0);
    _i(),
      (cl.current = o),
      (I = l),
      q !== null ? (t = 0) : ((te = null), (re = 0), (t = b));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Co(e)), l !== 0 && ((r = l), (t = qo(e, l)))), t === 1)
    )
      throw ((n = ir), Mt(e, 0), st(e, r), ye(e, J()), n);
    if (t === 6) st(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !up(l) &&
          ((t = pl(e, r)),
          t === 2 && ((o = Co(e)), o !== 0 && ((r = o), (t = qo(e, o)))),
          t === 1))
      )
        throw ((n = ir), Mt(e, 0), st(e, r), ye(e, J()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(g(345));
        case 2:
          Pt(e, me, We);
          break;
        case 3:
          if (
            (st(e, r), (r & 130023424) === r && ((t = Bi + 500 - J()), 10 < t))
          ) {
            if (Yr(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              de(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = To(Pt.bind(null, e, me, We), t);
            break;
          }
          Pt(e, me, We);
          break;
        case 4:
          if ((st(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ie(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = J() - r),
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
                : 1960 * ip(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = To(Pt.bind(null, e, me, We), r);
            break;
          }
          Pt(e, me, We);
          break;
        case 5:
          Pt(e, me, We);
          break;
        default:
          throw Error(g(329));
      }
    }
  }
  return ye(e, J()), e.callbackNode === n ? wc.bind(null, e) : null;
}
function qo(e, t) {
  var n = Bn;
  return (
    e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256),
    (e = pl(e, t)),
    e !== 2 && ((t = me), (me = n), t !== null && Zo(t)),
    e
  );
}
function Zo(e) {
  me === null ? (me = e) : me.push.apply(me, e);
}
function up(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!De(o(), l)) return !1;
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
function st(e, t) {
  for (
    t &= ~Vi,
      t &= ~zl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ie(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function us(e) {
  if (I & 6) throw Error(g(327));
  an();
  var t = Yr(e, 0);
  if (!(t & 1)) return ye(e, J()), null;
  var n = pl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Co(e);
    r !== 0 && ((t = r), (n = qo(e, r)));
  }
  if (n === 1) throw ((n = ir), Mt(e, 0), st(e, t), ye(e, J()), n);
  if (n === 6) throw Error(g(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Pt(e, me, We),
    ye(e, J()),
    null
  );
}
function Hi(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((vn = J() + 500), Sl && Ct());
  }
}
function $t(e) {
  ct !== null && ct.tag === 0 && !(I & 6) && an();
  var t = I;
  I |= 1;
  var n = Pe.transition,
    r = D;
  try {
    if (((Pe.transition = null), (D = 1), e)) return e();
  } finally {
    (D = r), (Pe.transition = n), (I = t), !(I & 6) && Ct();
  }
}
function Wi() {
  (we = tn.current), H(tn);
}
function Mt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Df(n)), q !== null))
    for (n = q.return; n !== null; ) {
      var r = n;
      switch ((Ei(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && el();
          break;
        case 3:
          mn(), H(ve), H(se), Mi();
          break;
        case 5:
          Ri(r);
          break;
        case 4:
          mn();
          break;
        case 13:
          H(G);
          break;
        case 19:
          H(G);
          break;
        case 10:
          Pi(r.type._context);
          break;
        case 22:
        case 23:
          Wi();
      }
      n = n.return;
    }
  if (
    ((te = e),
    (q = e = yt(e.current, null)),
    (re = we = t),
    (b = 0),
    (ir = null),
    (Vi = zl = At = 0),
    (me = Bn = null),
    Lt !== null)
  ) {
    for (t = 0; t < Lt.length; t++)
      if (((n = Lt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    Lt = null;
  }
  return e;
}
function xc(e, t) {
  do {
    var n = q;
    try {
      if ((_i(), ($r.current = al), sl)) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        sl = !1;
      }
      if (
        ((Dt = 0),
        (ee = Z = K = null),
        (Un = !1),
        (rr = 0),
        (Ui.current = null),
        n === null || n.return === null)
      ) {
        (b = 1), (ir = t), (q = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          u = n,
          s = t;
        if (
          ((t = re),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var a = s,
            m = u,
            h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var p = m.alternate;
            p
              ? ((m.updateQueue = p.updateQueue),
                (m.memoizedState = p.memoizedState),
                (m.lanes = p.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var y = Xu(i);
          if (y !== null) {
            (y.flags &= -257),
              Yu(y, i, u, o, t),
              y.mode & 1 && Ku(o, a, t),
              (t = y),
              (s = a);
            var w = t.updateQueue;
            if (w === null) {
              var x = new Set();
              x.add(s), (t.updateQueue = x);
            } else w.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Ku(o, a, t), Qi();
              break e;
            }
            s = Error(g(426));
          }
        } else if (W && u.mode & 1) {
          var P = Xu(i);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256),
              Yu(P, i, u, o, t),
              Ni(hn(s, u));
            break e;
          }
        }
        (o = s = hn(s, u)),
          b !== 4 && (b = 2),
          Bn === null ? (Bn = [o]) : Bn.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var d = rc(o, s, t);
              Vu(o, d);
              break e;
            case 1:
              u = s;
              var c = o.type,
                f = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (f !== null &&
                    typeof f.componentDidCatch == "function" &&
                    (vt === null || !vt.has(f))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var v = lc(o, u, t);
                Vu(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Cc(n);
    } catch (C) {
      (t = C), q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function kc() {
  var e = cl.current;
  return (cl.current = al), e === null ? al : e;
}
function Qi() {
  (b === 0 || b === 3 || b === 2) && (b = 4),
    te === null || (!(At & 268435455) && !(zl & 268435455)) || st(te, re);
}
function pl(e, t) {
  var n = I;
  I |= 2;
  var r = kc();
  (te !== e || re !== t) && ((We = null), Mt(e, t));
  do
    try {
      sp();
      break;
    } catch (l) {
      xc(e, l);
    }
  while (!0);
  if ((_i(), (I = n), (cl.current = r), q !== null)) throw Error(g(261));
  return (te = null), (re = 0), b;
}
function sp() {
  for (; q !== null; ) Sc(q);
}
function ap() {
  for (; q !== null && !Md(); ) Sc(q);
}
function Sc(e) {
  var t = Nc(e.alternate, e, we);
  (e.memoizedProps = e.pendingProps),
    t === null ? Cc(e) : (q = t),
    (Ui.current = null);
}
function Cc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = np(n, t)), n !== null)) {
        (n.flags &= 32767), (q = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (b = 6), (q = null);
        return;
      }
    } else if (((n = tp(n, t, we)), n !== null)) {
      q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  b === 0 && (b = 5);
}
function Pt(e, t, n) {
  var r = D,
    l = Pe.transition;
  try {
    (Pe.transition = null), (D = 1), cp(e, t, n, r);
  } finally {
    (Pe.transition = l), (D = r);
  }
  return null;
}
function cp(e, t, n, r) {
  do an();
  while (ct !== null);
  if (I & 6) throw Error(g(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(g(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Hd(e, o),
    e === te && ((q = te = null), (re = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Lr ||
      ((Lr = !0),
      zc(Xr, function () {
        return an(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = Pe.transition), (Pe.transition = null);
    var i = D;
    D = 1;
    var u = I;
    (I |= 4),
      (Ui.current = null),
      lp(e, n),
      gc(n, e),
      Lf(jo),
      (Jr = !!Po),
      (jo = Po = null),
      (e.current = n),
      op(n),
      Od(),
      (I = u),
      (D = i),
      (Pe.transition = o);
  } else e.current = n;
  if (
    (Lr && ((Lr = !1), (ct = e), (fl = l)),
    (o = e.pendingLanes),
    o === 0 && (vt = null),
    Dd(n.stateNode),
    ye(e, J()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (dl) throw ((dl = !1), (e = Yo), (Yo = null), e);
  return (
    fl & 1 && e.tag !== 0 && an(),
    (o = e.pendingLanes),
    o & 1 ? (e === Jo ? Hn++ : ((Hn = 0), (Jo = e))) : (Hn = 0),
    Ct(),
    null
  );
}
function an() {
  if (ct !== null) {
    var e = ra(fl),
      t = Pe.transition,
      n = D;
    try {
      if (((Pe.transition = null), (D = 16 > e ? 16 : e), ct === null))
        var r = !1;
      else {
        if (((e = ct), (ct = null), (fl = 0), I & 6)) throw Error(g(331));
        var l = I;
        for (I |= 4, E = e.current; E !== null; ) {
          var o = E,
            i = o.child;
          if (E.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (E = a; E !== null; ) {
                  var m = E;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Vn(8, m, o);
                  }
                  var h = m.child;
                  if (h !== null) (h.return = m), (E = h);
                  else
                    for (; E !== null; ) {
                      m = E;
                      var p = m.sibling,
                        y = m.return;
                      if ((mc(m), m === a)) {
                        E = null;
                        break;
                      }
                      if (p !== null) {
                        (p.return = y), (E = p);
                        break;
                      }
                      E = y;
                    }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var x = w.child;
                if (x !== null) {
                  w.child = null;
                  do {
                    var P = x.sibling;
                    (x.sibling = null), (x = P);
                  } while (x !== null);
                }
              }
              E = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (E = i);
          else
            e: for (; E !== null; ) {
              if (((o = E), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Vn(9, o, o.return);
                }
              var d = o.sibling;
              if (d !== null) {
                (d.return = o.return), (E = d);
                break e;
              }
              E = o.return;
            }
        }
        var c = e.current;
        for (E = c; E !== null; ) {
          i = E;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) (f.return = i), (E = f);
          else
            e: for (i = c; E !== null; ) {
              if (((u = E), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Nl(9, u);
                  }
                } catch (C) {
                  Y(u, u.return, C);
                }
              if (u === i) {
                E = null;
                break e;
              }
              var v = u.sibling;
              if (v !== null) {
                (v.return = u.return), (E = v);
                break e;
              }
              E = u.return;
            }
        }
        if (
          ((I = l), Ct(), Ve && typeof Ve.onPostCommitFiberRoot == "function")
        )
          try {
            Ve.onPostCommitFiberRoot(gl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (D = n), (Pe.transition = t);
    }
  }
  return !1;
}
function ss(e, t, n) {
  (t = hn(n, t)),
    (t = rc(e, t, 1)),
    (e = ht(e, t, 1)),
    (t = de()),
    e !== null && (sr(e, 1, t), ye(e, t));
}
function Y(e, t, n) {
  if (e.tag === 3) ss(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ss(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (vt === null || !vt.has(r)))
        ) {
          (e = hn(n, e)),
            (e = lc(t, e, 1)),
            (t = ht(t, e, 1)),
            (e = de()),
            t !== null && (sr(t, 1, e), ye(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function dp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = de()),
    (e.pingedLanes |= e.suspendedLanes & n),
    te === e &&
      (re & n) === n &&
      (b === 4 || (b === 3 && (re & 130023424) === re && 500 > J() - Bi)
        ? Mt(e, 0)
        : (Vi |= n)),
    ye(e, t);
}
function Ec(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = xr), (xr <<= 1), !(xr & 130023424) && (xr = 4194304))
      : (t = 1));
  var n = de();
  (e = qe(e, t)), e !== null && (sr(e, t, n), ye(e, n));
}
function fp(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Ec(e, n);
}
function pp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(g(314));
  }
  r !== null && r.delete(t), Ec(e, n);
}
var Nc;
Nc = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ve.current) he = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (he = !1), ep(e, t, n);
      he = !!(e.flags & 131072);
    }
  else (he = !1), W && t.flags & 1048576 && ja(t, rl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Vr(e, t), (e = t.pendingProps);
      var l = dn(t, se.current);
      sn(t, n), (l = Ii(null, t, r, e, l, n));
      var o = Fi();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ge(r) ? ((o = !0), tl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Li(t),
            (l.updater = El),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ao(t, r, e, n),
            (t = Vo(null, t, r, !0, o, n)))
          : ((t.tag = 0), W && o && Ci(t), ce(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Vr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = hp(r)),
          (e = Re(r, e)),
          l)
        ) {
          case 0:
            t = Uo(null, t, r, e, n);
            break e;
          case 1:
            t = Zu(null, t, r, e, n);
            break e;
          case 11:
            t = Ju(null, t, r, e, n);
            break e;
          case 14:
            t = qu(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(g(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Re(r, l)),
        Uo(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Re(r, l)),
        Zu(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((sc(t), e === null)) throw Error(g(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          Ia(e, t),
          il(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = hn(Error(g(423)), t)), (t = bu(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = hn(Error(g(424)), t)), (t = bu(e, t, r, n, l));
            break e;
          } else
            for (
              xe = mt(t.stateNode.containerInfo.firstChild),
                ke = t,
                W = !0,
                Oe = null,
                n = Ma(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((fn(), r === l)) {
            t = Ze(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Fa(t),
        e === null && Io(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Lo(r, l) ? (i = null) : o !== null && Lo(r, o) && (t.flags |= 32),
        uc(e, t),
        ce(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Io(t), null;
    case 13:
      return ac(e, t, n);
    case 4:
      return (
        Ti(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = pn(t, null, r, n)) : ce(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Re(r, l)),
        Ju(e, t, r, l, n)
      );
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          $(ll, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (De(o.value, i)) {
            if (o.children === l.children && !ve.current) {
              t = Ze(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var u = o.dependencies;
              if (u !== null) {
                i = o.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (o.tag === 1) {
                      (s = Xe(-1, n & -n)), (s.tag = 2);
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var m = a.pending;
                        m === null
                          ? (s.next = s)
                          : ((s.next = m.next), (m.next = s)),
                          (a.pending = s);
                      }
                    }
                    (o.lanes |= n),
                      (s = o.alternate),
                      s !== null && (s.lanes |= n),
                      Fo(o.return, n, t),
                      (u.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(g(341));
                (i.lanes |= n),
                  (u = i.alternate),
                  u !== null && (u.lanes |= n),
                  Fo(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        ce(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        sn(t, n),
        (l = je(l)),
        (r = r(l)),
        (t.flags |= 1),
        ce(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Re(r, t.pendingProps)),
        (l = Re(r.type, l)),
        qu(e, t, r, l, n)
      );
    case 15:
      return oc(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Re(r, l)),
        Vr(e, t),
        (t.tag = 1),
        ge(r) ? ((e = !0), tl(t)) : (e = !1),
        sn(t, n),
        nc(t, r, l),
        Ao(t, r, l, n),
        Vo(null, t, r, !0, e, n)
      );
    case 19:
      return cc(e, t, n);
    case 22:
      return ic(e, t, n);
  }
  throw Error(g(156, t.tag));
};
function zc(e, t) {
  return bs(e, t);
}
function mp(e, t, n, r) {
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
function _e(e, t, n, r) {
  return new mp(e, t, n, r);
}
function Gi(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function hp(e) {
  if (typeof e == "function") return Gi(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === di)) return 11;
    if (e === fi) return 14;
  }
  return 2;
}
function yt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = _e(e.tag, t, e.key, e.mode)),
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
function Wr(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) Gi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case Qt:
        return Ot(n.children, l, o, t);
      case ci:
        (i = 8), (l |= 8);
        break;
      case uo:
        return (
          (e = _e(12, n, t, l | 2)), (e.elementType = uo), (e.lanes = o), e
        );
      case so:
        return (e = _e(13, n, t, l)), (e.elementType = so), (e.lanes = o), e;
      case ao:
        return (e = _e(19, n, t, l)), (e.elementType = ao), (e.lanes = o), e;
      case Fs:
        return _l(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Os:
              i = 10;
              break e;
            case Is:
              i = 9;
              break e;
            case di:
              i = 11;
              break e;
            case fi:
              i = 14;
              break e;
            case ot:
              (i = 16), (r = null);
              break e;
          }
        throw Error(g(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = _e(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Ot(e, t, n, r) {
  return (e = _e(7, e, r, t)), (e.lanes = n), e;
}
function _l(e, t, n, r) {
  return (
    (e = _e(22, e, r, t)),
    (e.elementType = Fs),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ro(e, t, n) {
  return (e = _e(6, e, null, t)), (e.lanes = n), e;
}
function lo(e, t, n) {
  return (
    (t = _e(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function vp(e, t, n, r, l) {
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
    (this.eventTimes = Al(0)),
    (this.expirationTimes = Al(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Al(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Ki(e, t, n, r, l, o, i, u, s) {
  return (
    (e = new vp(e, t, n, u, s)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = _e(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Li(o),
    e
  );
}
function gp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Wt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function _c(e) {
  if (!e) return xt;
  e = e._reactInternals;
  e: {
    if (Vt(e) !== e || e.tag !== 1) throw Error(g(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ge(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(g(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return _a(e, n, t);
  }
  return t;
}
function Pc(e, t, n, r, l, o, i, u, s) {
  return (
    (e = Ki(n, r, !0, e, l, o, i, u, s)),
    (e.context = _c(null)),
    (n = e.current),
    (r = de()),
    (l = gt(n)),
    (o = Xe(r, l)),
    (o.callback = t ?? null),
    ht(n, o, l),
    (e.current.lanes = l),
    sr(e, l, r),
    ye(e, r),
    e
  );
}
function Pl(e, t, n, r) {
  var l = t.current,
    o = de(),
    i = gt(l);
  return (
    (n = _c(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Xe(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = ht(l, t, i)),
    e !== null && (Fe(e, l, i, o), Ar(e, l, i)),
    i
  );
}
function ml(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function as(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xi(e, t) {
  as(e, t), (e = e.alternate) && as(e, t);
}
function yp() {
  return null;
}
var jc =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Yi(e) {
  this._internalRoot = e;
}
jl.prototype.render = Yi.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(g(409));
  Pl(e, t, null, null);
};
jl.prototype.unmount = Yi.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    $t(function () {
      Pl(null, e, null, null);
    }),
      (t[Je] = null);
  }
};
function jl(e) {
  this._internalRoot = e;
}
jl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ia();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ut.length && t !== 0 && t < ut[n].priority; n++);
    ut.splice(n, 0, e), n === 0 && sa(e);
  }
};
function Ji(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ll(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function cs() {}
function wp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var a = ml(i);
        o.call(a);
      };
    }
    var i = Pc(t, r, e, 0, null, !1, !1, "", cs);
    return (
      (e._reactRootContainer = i),
      (e[Je] = i.current),
      Zn(e.nodeType === 8 ? e.parentNode : e),
      $t(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var a = ml(s);
      u.call(a);
    };
  }
  var s = Ki(e, 0, !1, null, null, !1, !1, "", cs);
  return (
    (e._reactRootContainer = s),
    (e[Je] = s.current),
    Zn(e.nodeType === 8 ? e.parentNode : e),
    $t(function () {
      Pl(t, s, n, r);
    }),
    s
  );
}
function Tl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var s = ml(i);
        u.call(s);
      };
    }
    Pl(t, i, e, l);
  } else i = wp(n, t, e, l, r);
  return ml(i);
}
la = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Mn(t.pendingLanes);
        n !== 0 &&
          (hi(t, n | 1), ye(t, J()), !(I & 6) && ((vn = J() + 500), Ct()));
      }
      break;
    case 13:
      $t(function () {
        var r = qe(e, 1);
        if (r !== null) {
          var l = de();
          Fe(r, e, 1, l);
        }
      }),
        Xi(e, 1);
  }
};
vi = function (e) {
  if (e.tag === 13) {
    var t = qe(e, 134217728);
    if (t !== null) {
      var n = de();
      Fe(t, e, 134217728, n);
    }
    Xi(e, 134217728);
  }
};
oa = function (e) {
  if (e.tag === 13) {
    var t = gt(e),
      n = qe(e, t);
    if (n !== null) {
      var r = de();
      Fe(n, e, t, r);
    }
    Xi(e, t);
  }
};
ia = function () {
  return D;
};
ua = function (e, t) {
  var n = D;
  try {
    return (D = e), t();
  } finally {
    D = n;
  }
};
xo = function (e, t, n) {
  switch (t) {
    case "input":
      if ((po(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
            var l = kl(r);
            if (!l) throw Error(g(90));
            As(r), po(r, l);
          }
        }
      }
      break;
    case "textarea":
      Us(e, n);
      break;
    case "select":
      (t = n.value), t != null && rn(e, !!n.multiple, t, !1);
  }
};
Ks = Hi;
Xs = $t;
var xp = { usingClientEntryPoint: !1, Events: [cr, Yt, kl, Qs, Gs, Hi] },
  Pn = {
    findFiberByHostInstance: jt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  kp = {
    bundleType: Pn.bundleType,
    version: Pn.version,
    rendererPackageName: Pn.rendererPackageName,
    rendererConfig: Pn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: be.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = qs(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Pn.findFiberByHostInstance || yp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Tr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Tr.isDisabled && Tr.supportsFiber)
    try {
      (gl = Tr.inject(kp)), (Ve = Tr);
    } catch {}
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xp;
Ce.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ji(t)) throw Error(g(200));
  return gp(e, t, null, n);
};
Ce.createRoot = function (e, t) {
  if (!Ji(e)) throw Error(g(299));
  var n = !1,
    r = "",
    l = jc;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Ki(e, 1, !1, null, null, n, !1, r, l)),
    (e[Je] = t.current),
    Zn(e.nodeType === 8 ? e.parentNode : e),
    new Yi(t)
  );
};
Ce.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(g(188))
      : ((e = Object.keys(e).join(",")), Error(g(268, e)));
  return (e = qs(t)), (e = e === null ? null : e.stateNode), e;
};
Ce.flushSync = function (e) {
  return $t(e);
};
Ce.hydrate = function (e, t, n) {
  if (!Ll(t)) throw Error(g(200));
  return Tl(null, e, t, !0, n);
};
Ce.hydrateRoot = function (e, t, n) {
  if (!Ji(e)) throw Error(g(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = jc;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Pc(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[Je] = t.current),
    Zn(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new jl(t);
};
Ce.render = function (e, t, n) {
  if (!Ll(t)) throw Error(g(200));
  return Tl(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function (e) {
  if (!Ll(e)) throw Error(g(40));
  return e._reactRootContainer
    ? ($t(function () {
        Tl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Je] = null);
        });
      }),
      !0)
    : !1;
};
Ce.unstable_batchedUpdates = Hi;
Ce.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ll(n)) throw Error(g(200));
  if (e == null || e._reactInternals === void 0) throw Error(g(38));
  return Tl(e, t, n, !1, r);
};
Ce.version = "18.3.1-next-f1338f8080-20240426";
function Lc() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lc);
    } catch (e) {
      console.error(e);
    }
}
Lc(), (Ls.exports = Ce);
var Sp = Ls.exports,
  ds = Sp;
(oo.createRoot = ds.createRoot), (oo.hydrateRoot = ds.hydrateRoot);
const Cp = [
    {
      name: "Taxi",
      exp: 210,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://assetsio.gnwcdn.com/gta-online-downtown-cab-company-building-and-taxi.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
    },
    {
      name: "Lixeiro",
      exp: 50,
      steps: [
        "Busque o veículo e coloque uniforme bem rapido para ganhar dinheiro rapido",
        "Vá as lixeiras e colete o lixo",
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvN44X6d1hH09QkyguOSuqxe3JmUjv4t8CuTlAdxHBrBnJR6igWXTNCN0EtY-Aj4rmCBaYwN0X9p5svGd8E3XTMeY93SlG5u1f6mmzBtjt1Z-t5Jv_P4iS49_IGyDi_KNKjqSsqTUgyhqp/s1600/trabalho_de_lixeiro_traduzido_e_sem_erros-774611.png",
    },
    {
      name: "Entregador",
      exp: 350,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://img.gta5-mods.com/q95/images/uber-delivery-bag-exclusive-for-franklin/e10958-uberbag-mod_07.jpg",
    },
    {
      name: "Lenhador",
      exp: 590,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image: "",
    },
    {
      name: "Motorista",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://cs1.gtaall.com.br/attachments/2019-08/original/6a7b4eb9796eaae00b4050e41666a994eea55be2/10914-002.jpg",
    },
    {
      name: "Transportador",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/385k/7c74b5d03ee6f1629f52b4d67437562fb18547de.jpg",
    },
    {
      name: "Minerador",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image: "",
    },
    {
      name: "Bombeiro",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image: "",
    },
    {
      name: "Caminhoneiro",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://pm1.aminoapps.com/6460/0976693660157286a61b558926826f30d7aaf808_hq.jpg",
    },
    {
      name: "Mergulhador",
      exp: 0,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      image:
        "https://psverso.com.br/wp-content/uploads/2023/12/GTA-5-Como-pegar-equipamento-e-roupa-de-mergulho.webp",
    },
  ],
  fs = {
    message: "Busque o cidadão marcado no mapa",
    job: {
      name: "Taxi",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel facere quidem porro culpa molestias illo ipsam debitis at in, saepe, nihil omnis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas blanditiis nesciunt maxime eos reprehenderit, dicta, nemo eum placeat est modi omnis ipsam deleniti nostrum doloremque labore possimus soluta. Harum, ab?",
      salary: 1e3,
      exp: 20,
      image:
        "https://assetsio.gnwcdn.com/gta-online-downtown-cab-company-building-and-taxi.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
    },
  };
function Ep(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Np(...e) {
  return (t) => e.forEach((n) => Ep(n, t));
}
var qi = L.forwardRef((e, t) => {
  const { children: n, ...r } = e,
    l = L.Children.toArray(n),
    o = l.find(_p);
  if (o) {
    const i = o.props.children,
      u = l.map((s) =>
        s === o
          ? L.Children.count(i) > 1
            ? L.Children.only(null)
            : L.isValidElement(i)
            ? i.props.children
            : null
          : s
      );
    return k.jsx(bo, {
      ...r,
      ref: t,
      children: L.isValidElement(i) ? L.cloneElement(i, void 0, u) : null,
    });
  }
  return k.jsx(bo, { ...r, ref: t, children: n });
});
qi.displayName = "Slot";
var bo = L.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  if (L.isValidElement(n)) {
    const l = jp(n);
    return L.cloneElement(n, { ...Pp(r, n.props), ref: t ? Np(t, l) : l });
  }
  return L.Children.count(n) > 1 ? L.Children.only(null) : null;
});
bo.displayName = "SlotClone";
var zp = ({ children: e }) => k.jsx(k.Fragment, { children: e });
function _p(e) {
  return L.isValidElement(e) && e.type === zp;
}
function Pp(e, t) {
  const n = { ...t };
  for (const r in t) {
    const l = e[r],
      o = t[r];
    /^on[A-Z]/.test(r)
      ? l && o
        ? (n[r] = (...u) => {
            o(...u), l(...u);
          })
        : l && (n[r] = l)
      : r === "style"
      ? (n[r] = { ...l, ...o })
      : r === "className" && (n[r] = [l, o].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function jp(e) {
  var r, l;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null
        ? void 0
        : r.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (l = Object.getOwnPropertyDescriptor(e, "ref")) == null
          ? void 0
          : l.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Tc(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Tc(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function Lp() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Tc(e)) && (r && (r += " "), (r += t));
  return r;
}
const ps = (e) => (typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e),
  ms = Lp,
  Tp = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return ms(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className
      );
    const { variants: l, defaultVariants: o } = t,
      i = Object.keys(l).map((a) => {
        const m = n == null ? void 0 : n[a],
          h = o == null ? void 0 : o[a];
        if (m === null) return null;
        const p = ps(m) || ps(h);
        return l[a][p];
      }),
      u =
        n &&
        Object.entries(n).reduce((a, m) => {
          let [h, p] = m;
          return p === void 0 || (a[h] = p), a;
        }, {}),
      s =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((a, m) => {
              let { class: h, className: p, ...y } = m;
              return Object.entries(y).every((w) => {
                let [x, P] = w;
                return Array.isArray(P)
                  ? P.includes({ ...o, ...u }[x])
                  : { ...o, ...u }[x] === P;
              })
                ? [...a, h, p]
                : a;
            }, []);
    return ms(
      e,
      i,
      s,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className
    );
  };
function Rc(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var l = e.length;
      for (t = 0; t < l; t++)
        e[t] && (n = Rc(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function Rp() {
  for (var e, t, n = 0, r = "", l = arguments.length; n < l; n++)
    (e = arguments[n]) && (t = Rc(e)) && (r && (r += " "), (r += t));
  return r;
}
const Zi = "-";
function Mp(e) {
  const t = Ip(e),
    { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
  function l(i) {
    const u = i.split(Zi);
    return u[0] === "" && u.length !== 1 && u.shift(), Mc(u, t) || Op(i);
  }
  function o(i, u) {
    const s = n[i] || [];
    return u && r[i] ? [...s, ...r[i]] : s;
  }
  return { getClassGroupId: l, getConflictingClassGroupIds: o };
}
function Mc(e, t) {
  var i;
  if (e.length === 0) return t.classGroupId;
  const n = e[0],
    r = t.nextPart.get(n),
    l = r ? Mc(e.slice(1), r) : void 0;
  if (l) return l;
  if (t.validators.length === 0) return;
  const o = e.join(Zi);
  return (i = t.validators.find(({ validator: u }) => u(o))) == null
    ? void 0
    : i.classGroupId;
}
const hs = /^\[(.+)\]$/;
function Op(e) {
  if (hs.test(e)) {
    const t = hs.exec(e)[1],
      n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n) return "arbitrary.." + n;
  }
}
function Ip(e) {
  const { theme: t, prefix: n } = e,
    r = { nextPart: new Map(), validators: [] };
  return (
    Dp(Object.entries(e.classGroups), n).forEach(([o, i]) => {
      ei(i, r, o, t);
    }),
    r
  );
}
function ei(e, t, n, r) {
  e.forEach((l) => {
    if (typeof l == "string") {
      const o = l === "" ? t : vs(t, l);
      o.classGroupId = n;
      return;
    }
    if (typeof l == "function") {
      if (Fp(l)) {
        ei(l(r), t, n, r);
        return;
      }
      t.validators.push({ validator: l, classGroupId: n });
      return;
    }
    Object.entries(l).forEach(([o, i]) => {
      ei(i, vs(t, o), n, r);
    });
  });
}
function vs(e, t) {
  let n = e;
  return (
    t.split(Zi).forEach((r) => {
      n.nextPart.has(r) ||
        n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
        (n = n.nextPart.get(r));
    }),
    n
  );
}
function Fp(e) {
  return e.isThemeGetter;
}
function Dp(e, t) {
  return t
    ? e.map(([n, r]) => {
        const l = r.map((o) =>
          typeof o == "string"
            ? t + o
            : typeof o == "object"
            ? Object.fromEntries(Object.entries(o).map(([i, u]) => [t + i, u]))
            : o
        );
        return [n, l];
      })
    : e;
}
function Ap(e) {
  if (e < 1) return { get: () => {}, set: () => {} };
  let t = 0,
    n = new Map(),
    r = new Map();
  function l(o, i) {
    n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map()));
  }
  return {
    get(o) {
      let i = n.get(o);
      if (i !== void 0) return i;
      if ((i = r.get(o)) !== void 0) return l(o, i), i;
    },
    set(o, i) {
      n.has(o) ? n.set(o, i) : l(o, i);
    },
  };
}
const Oc = "!";
function $p(e) {
  const { separator: t, experimentalParseClassName: n } = e,
    r = t.length === 1,
    l = t[0],
    o = t.length;
  function i(u) {
    const s = [];
    let a = 0,
      m = 0,
      h;
    for (let P = 0; P < u.length; P++) {
      let d = u[P];
      if (a === 0) {
        if (d === l && (r || u.slice(P, P + o) === t)) {
          s.push(u.slice(m, P)), (m = P + o);
          continue;
        }
        if (d === "/") {
          h = P;
          continue;
        }
      }
      d === "[" ? a++ : d === "]" && a--;
    }
    const p = s.length === 0 ? u : u.substring(m),
      y = p.startsWith(Oc),
      w = y ? p.substring(1) : p,
      x = h && h > m ? h - m : void 0;
    return {
      modifiers: s,
      hasImportantModifier: y,
      baseClassName: w,
      maybePostfixModifierPosition: x,
    };
  }
  return n
    ? function (s) {
        return n({ className: s, parseClassName: i });
      }
    : i;
}
function Up(e) {
  if (e.length <= 1) return e;
  const t = [];
  let n = [];
  return (
    e.forEach((r) => {
      r[0] === "[" ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
    }),
    t.push(...n.sort()),
    t
  );
}
function Vp(e) {
  return { cache: Ap(e.cacheSize), parseClassName: $p(e), ...Mp(e) };
}
const Bp = /\s+/;
function Hp(e, t) {
  const {
      parseClassName: n,
      getClassGroupId: r,
      getConflictingClassGroupIds: l,
    } = t,
    o = new Set();
  return e
    .trim()
    .split(Bp)
    .map((i) => {
      const {
        modifiers: u,
        hasImportantModifier: s,
        baseClassName: a,
        maybePostfixModifierPosition: m,
      } = n(i);
      let h = !!m,
        p = r(h ? a.substring(0, m) : a);
      if (!p) {
        if (!h) return { isTailwindClass: !1, originalClassName: i };
        if (((p = r(a)), !p))
          return { isTailwindClass: !1, originalClassName: i };
        h = !1;
      }
      const y = Up(u).join(":");
      return {
        isTailwindClass: !0,
        modifierId: s ? y + Oc : y,
        classGroupId: p,
        originalClassName: i,
        hasPostfixModifier: h,
      };
    })
    .reverse()
    .filter((i) => {
      if (!i.isTailwindClass) return !0;
      const { modifierId: u, classGroupId: s, hasPostfixModifier: a } = i,
        m = u + s;
      return o.has(m)
        ? !1
        : (o.add(m), l(s, a).forEach((h) => o.add(u + h)), !0);
    })
    .reverse()
    .map((i) => i.originalClassName)
    .join(" ");
}
function Wp() {
  let e = 0,
    t,
    n,
    r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ic(t)) && (r && (r += " "), (r += n));
  return r;
}
function Ic(e) {
  if (typeof e == "string") return e;
  let t,
    n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ic(e[r])) && (n && (n += " "), (n += t));
  return n;
}
function Qp(e, ...t) {
  let n,
    r,
    l,
    o = i;
  function i(s) {
    const a = t.reduce((m, h) => h(m), e());
    return (n = Vp(a)), (r = n.cache.get), (l = n.cache.set), (o = u), u(s);
  }
  function u(s) {
    const a = r(s);
    if (a) return a;
    const m = Hp(s, n);
    return l(s, m), m;
  }
  return function () {
    return o(Wp.apply(null, arguments));
  };
}
function V(e) {
  const t = (n) => n[e] || [];
  return (t.isThemeGetter = !0), t;
}
const Fc = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  Gp = /^\d+\/\d+$/,
  Kp = new Set(["px", "full", "screen"]),
  Xp = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Yp =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Jp = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  qp = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Zp =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function He(e) {
  return Rt(e) || Kp.has(e) || Gp.test(e);
}
function rt(e) {
  return xn(e, "length", im);
}
function Rt(e) {
  return !!e && !Number.isNaN(Number(e));
}
function Rr(e) {
  return xn(e, "number", Rt);
}
function jn(e) {
  return !!e && Number.isInteger(Number(e));
}
function bp(e) {
  return e.endsWith("%") && Rt(e.slice(0, -1));
}
function R(e) {
  return Fc.test(e);
}
function lt(e) {
  return Xp.test(e);
}
const em = new Set(["length", "size", "percentage"]);
function tm(e) {
  return xn(e, em, Dc);
}
function nm(e) {
  return xn(e, "position", Dc);
}
const rm = new Set(["image", "url"]);
function lm(e) {
  return xn(e, rm, sm);
}
function om(e) {
  return xn(e, "", um);
}
function Ln() {
  return !0;
}
function xn(e, t, n) {
  const r = Fc.exec(e);
  return r
    ? r[1]
      ? typeof t == "string"
        ? r[1] === t
        : t.has(r[1])
      : n(r[2])
    : !1;
}
function im(e) {
  return Yp.test(e) && !Jp.test(e);
}
function Dc() {
  return !1;
}
function um(e) {
  return qp.test(e);
}
function sm(e) {
  return Zp.test(e);
}
function am() {
  const e = V("colors"),
    t = V("spacing"),
    n = V("blur"),
    r = V("brightness"),
    l = V("borderColor"),
    o = V("borderRadius"),
    i = V("borderSpacing"),
    u = V("borderWidth"),
    s = V("contrast"),
    a = V("grayscale"),
    m = V("hueRotate"),
    h = V("invert"),
    p = V("gap"),
    y = V("gradientColorStops"),
    w = V("gradientColorStopPositions"),
    x = V("inset"),
    P = V("margin"),
    d = V("opacity"),
    c = V("padding"),
    f = V("saturate"),
    v = V("scale"),
    C = V("sepia"),
    N = V("skew"),
    z = V("space"),
    _ = V("translate"),
    U = () => ["auto", "contain", "none"],
    M = () => ["auto", "hidden", "clip", "visible", "scroll"],
    ae = () => ["auto", R, t],
    F = () => [R, t],
    et = () => ["", He, rt],
    Et = () => ["auto", Rt, R],
    fr = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top",
    ],
    tt = () => ["solid", "dashed", "dotted", "double", "none"],
    Bt = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
    ],
    S = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch",
    ],
    j = () => ["", "0", R],
    T = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ],
    A = () => [Rt, Rr],
    Q = () => [Rt, R];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ln],
      spacing: [He, rt],
      blur: ["none", "", lt, R],
      brightness: A(),
      borderColor: [e],
      borderRadius: ["none", "", "full", lt, R],
      borderSpacing: F(),
      borderWidth: et(),
      contrast: A(),
      grayscale: j(),
      hueRotate: Q(),
      invert: j(),
      gap: F(),
      gradientColorStops: [e],
      gradientColorStopPositions: [bp, rt],
      inset: ae(),
      margin: ae(),
      opacity: A(),
      padding: F(),
      saturate: A(),
      scale: A(),
      sepia: j(),
      skew: Q(),
      space: F(),
      translate: F(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", R] }],
      container: ["container"],
      columns: [{ columns: [lt] }],
      "break-after": [{ "break-after": T() }],
      "break-before": [{ "break-before": T() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none", "start", "end"] }],
      clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [...fr(), R] }],
      overflow: [{ overflow: M() }],
      "overflow-x": [{ "overflow-x": M() }],
      "overflow-y": [{ "overflow-y": M() }],
      overscroll: [{ overscroll: U() }],
      "overscroll-x": [{ "overscroll-x": U() }],
      "overscroll-y": [{ "overscroll-y": U() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [x] }],
      "inset-x": [{ "inset-x": [x] }],
      "inset-y": [{ "inset-y": [x] }],
      start: [{ start: [x] }],
      end: [{ end: [x] }],
      top: [{ top: [x] }],
      right: [{ right: [x] }],
      bottom: [{ bottom: [x] }],
      left: [{ left: [x] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", jn, R] }],
      basis: [{ basis: ae() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", R] }],
      grow: [{ grow: j() }],
      shrink: [{ shrink: j() }],
      order: [{ order: ["first", "last", "none", jn, R] }],
      "grid-cols": [{ "grid-cols": [Ln] }],
      "col-start-end": [{ col: ["auto", { span: ["full", jn, R] }, R] }],
      "col-start": [{ "col-start": Et() }],
      "col-end": [{ "col-end": Et() }],
      "grid-rows": [{ "grid-rows": [Ln] }],
      "row-start-end": [{ row: ["auto", { span: [jn, R] }, R] }],
      "row-start": [{ "row-start": Et() }],
      "row-end": [{ "row-end": Et() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", R] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", R] }],
      gap: [{ gap: [p] }],
      "gap-x": [{ "gap-x": [p] }],
      "gap-y": [{ "gap-y": [p] }],
      "justify-content": [{ justify: ["normal", ...S()] }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal", ...S(), "baseline"] }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [...S(), "baseline"] }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [c] }],
      px: [{ px: [c] }],
      py: [{ py: [c] }],
      ps: [{ ps: [c] }],
      pe: [{ pe: [c] }],
      pt: [{ pt: [c] }],
      pr: [{ pr: [c] }],
      pb: [{ pb: [c] }],
      pl: [{ pl: [c] }],
      m: [{ m: [P] }],
      mx: [{ mx: [P] }],
      my: [{ my: [P] }],
      ms: [{ ms: [P] }],
      me: [{ me: [P] }],
      mt: [{ mt: [P] }],
      mr: [{ mr: [P] }],
      mb: [{ mb: [P] }],
      ml: [{ ml: [P] }],
      "space-x": [{ "space-x": [z] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [z] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", R, t] }],
      "min-w": [{ "min-w": [R, t, "min", "max", "fit"] }],
      "max-w": [
        {
          "max-w": [
            R,
            t,
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [lt] },
            lt,
          ],
        },
      ],
      h: [{ h: [R, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "min-h": [{ "min-h": [R, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "max-h": [{ "max-h": [R, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      size: [{ size: [R, t, "auto", "min", "max", "fit"] }],
      "font-size": [{ text: ["base", lt, rt] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Rr,
          ],
        },
      ],
      "font-family": [{ font: [Ln] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            R,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", Rt, Rr] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            He,
            R,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", R] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", R] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [e] }],
      "placeholder-opacity": [{ "placeholder-opacity": [d] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [e] }],
      "text-opacity": [{ "text-opacity": [d] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [...tt(), "wavy"] }],
      "text-decoration-thickness": [
        { decoration: ["auto", "from-font", He, rt] },
      ],
      "underline-offset": [{ "underline-offset": ["auto", He, R] }],
      "text-decoration-color": [{ decoration: [e] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      indent: [{ indent: F() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            R,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", R] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [d] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [...fr(), nm] }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", tm] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            lm,
          ],
        },
      ],
      "bg-color": [{ bg: [e] }],
      "gradient-from-pos": [{ from: [w] }],
      "gradient-via-pos": [{ via: [w] }],
      "gradient-to-pos": [{ to: [w] }],
      "gradient-from": [{ from: [y] }],
      "gradient-via": [{ via: [y] }],
      "gradient-to": [{ to: [y] }],
      rounded: [{ rounded: [o] }],
      "rounded-s": [{ "rounded-s": [o] }],
      "rounded-e": [{ "rounded-e": [o] }],
      "rounded-t": [{ "rounded-t": [o] }],
      "rounded-r": [{ "rounded-r": [o] }],
      "rounded-b": [{ "rounded-b": [o] }],
      "rounded-l": [{ "rounded-l": [o] }],
      "rounded-ss": [{ "rounded-ss": [o] }],
      "rounded-se": [{ "rounded-se": [o] }],
      "rounded-ee": [{ "rounded-ee": [o] }],
      "rounded-es": [{ "rounded-es": [o] }],
      "rounded-tl": [{ "rounded-tl": [o] }],
      "rounded-tr": [{ "rounded-tr": [o] }],
      "rounded-br": [{ "rounded-br": [o] }],
      "rounded-bl": [{ "rounded-bl": [o] }],
      "border-w": [{ border: [u] }],
      "border-w-x": [{ "border-x": [u] }],
      "border-w-y": [{ "border-y": [u] }],
      "border-w-s": [{ "border-s": [u] }],
      "border-w-e": [{ "border-e": [u] }],
      "border-w-t": [{ "border-t": [u] }],
      "border-w-r": [{ "border-r": [u] }],
      "border-w-b": [{ "border-b": [u] }],
      "border-w-l": [{ "border-l": [u] }],
      "border-opacity": [{ "border-opacity": [d] }],
      "border-style": [{ border: [...tt(), "hidden"] }],
      "divide-x": [{ "divide-x": [u] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [u] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [d] }],
      "divide-style": [{ divide: tt() }],
      "border-color": [{ border: [l] }],
      "border-color-x": [{ "border-x": [l] }],
      "border-color-y": [{ "border-y": [l] }],
      "border-color-t": [{ "border-t": [l] }],
      "border-color-r": [{ "border-r": [l] }],
      "border-color-b": [{ "border-b": [l] }],
      "border-color-l": [{ "border-l": [l] }],
      "divide-color": [{ divide: [l] }],
      "outline-style": [{ outline: ["", ...tt()] }],
      "outline-offset": [{ "outline-offset": [He, R] }],
      "outline-w": [{ outline: [He, rt] }],
      "outline-color": [{ outline: [e] }],
      "ring-w": [{ ring: et() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [e] }],
      "ring-opacity": [{ "ring-opacity": [d] }],
      "ring-offset-w": [{ "ring-offset": [He, rt] }],
      "ring-offset-color": [{ "ring-offset": [e] }],
      shadow: [{ shadow: ["", "inner", "none", lt, om] }],
      "shadow-color": [{ shadow: [Ln] }],
      opacity: [{ opacity: [d] }],
      "mix-blend": [{ "mix-blend": [...Bt(), "plus-lighter", "plus-darker"] }],
      "bg-blend": [{ "bg-blend": Bt() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [n] }],
      brightness: [{ brightness: [r] }],
      contrast: [{ contrast: [s] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", lt, R] }],
      grayscale: [{ grayscale: [a] }],
      "hue-rotate": [{ "hue-rotate": [m] }],
      invert: [{ invert: [h] }],
      saturate: [{ saturate: [f] }],
      sepia: [{ sepia: [C] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [n] }],
      "backdrop-brightness": [{ "backdrop-brightness": [r] }],
      "backdrop-contrast": [{ "backdrop-contrast": [s] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [a] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [m] }],
      "backdrop-invert": [{ "backdrop-invert": [h] }],
      "backdrop-opacity": [{ "backdrop-opacity": [d] }],
      "backdrop-saturate": [{ "backdrop-saturate": [f] }],
      "backdrop-sepia": [{ "backdrop-sepia": [C] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [i] }],
      "border-spacing-x": [{ "border-spacing-x": [i] }],
      "border-spacing-y": [{ "border-spacing-y": [i] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            R,
          ],
        },
      ],
      duration: [{ duration: Q() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", R] }],
      delay: [{ delay: Q() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", R] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [v] }],
      "scale-x": [{ "scale-x": [v] }],
      "scale-y": [{ "scale-y": [v] }],
      rotate: [{ rotate: [jn, R] }],
      "translate-x": [{ "translate-x": [_] }],
      "translate-y": [{ "translate-y": [_] }],
      "skew-x": [{ "skew-x": [N] }],
      "skew-y": [{ "skew-y": [N] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            R,
          ],
        },
      ],
      accent: [{ accent: ["auto", e] }],
      appearance: [{ appearance: ["none", "auto"] }],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            R,
          ],
        },
      ],
      "caret-color": [{ caret: [e] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": F() }],
      "scroll-mx": [{ "scroll-mx": F() }],
      "scroll-my": [{ "scroll-my": F() }],
      "scroll-ms": [{ "scroll-ms": F() }],
      "scroll-me": [{ "scroll-me": F() }],
      "scroll-mt": [{ "scroll-mt": F() }],
      "scroll-mr": [{ "scroll-mr": F() }],
      "scroll-mb": [{ "scroll-mb": F() }],
      "scroll-ml": [{ "scroll-ml": F() }],
      "scroll-p": [{ "scroll-p": F() }],
      "scroll-px": [{ "scroll-px": F() }],
      "scroll-py": [{ "scroll-py": F() }],
      "scroll-ps": [{ "scroll-ps": F() }],
      "scroll-pe": [{ "scroll-pe": F() }],
      "scroll-pt": [{ "scroll-pt": F() }],
      "scroll-pr": [{ "scroll-pr": F() }],
      "scroll-pb": [{ "scroll-pb": F() }],
      "scroll-pl": [{ "scroll-pl": F() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [{ touch: ["auto", "none", "manipulation"] }],
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", R] },
      ],
      fill: [{ fill: [e, "none"] }],
      "stroke-w": [{ stroke: [He, rt, Rr] }],
      stroke: [{ stroke: [e, "none"] }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
const cm = Qp(am);
function Ac(...e) {
  return cm(Rp(e));
}
const bi = () => !window.invokeNative;
async function ti(e, t, n) {
  const r = {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(t),
  };
  if (bi() && n) return n;
  const l = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "nui-frame-app";
  return await (await fetch(`https://${l}/${e}`, r)).json();
}
const dm = () => {},
  ni = (e, t) => {
    const n = L.useRef(dm);
    L.useEffect(() => {
      n.current = t;
    }, [t]),
      L.useEffect(() => {
        const r = (l) => {
          const { action: o, data: i } = l.data;
          n.current && o === e && n.current(i);
        };
        return (
          window.addEventListener("message", r),
          () => window.removeEventListener("message", r)
        );
      }, [e]);
  },
  fm = Tp(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
    {
      variants: {
        variant: {
          default:
            "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
          destructive:
            "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
          outline:
            "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          secondary:
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
          ghost:
            "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
          link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    }
  ),
  nn = L.forwardRef(
    ({ className: e, variant: t, size: n, asChild: r = !1, ...l }, o) => {
      const i = r ? qi : "button";
      return k.jsx(i, {
        className: Ac(fm({ variant: t, size: n, className: e })),
        ref: o,
        ...l,
      });
    }
  );
nn.displayName = "Button";
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pm = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  $c = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var mm = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hm = L.forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: l = "",
      children: o,
      iconNode: i,
      ...u
    },
    s
  ) =>
    L.createElement(
      "svg",
      {
        ref: s,
        ...mm,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: $c("lucide", l),
        ...u,
      },
      [
        ...i.map(([a, m]) => L.createElement(a, m)),
        ...(Array.isArray(o) ? o : [o]),
      ]
    )
);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Uc = (e, t) => {
  const n = L.forwardRef(({ className: r, ...l }, o) =>
    L.createElement(hm, {
      ref: o,
      iconNode: t,
      className: $c(`lucide-${pm(e)}`, r),
      ...l,
    })
  );
  return (n.displayName = `${e}`), n;
};
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vm = Uc("ArrowBigRight", [
  ["path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z", key: "7fvt9c" }],
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Vc = Uc("X", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ]),
  gm = ({ selectedJob: e = "Sem emprego", salary: t = 0, closeMenu: n }) =>
    k.jsxs("header", {
      className: "flex items-center gap-4 w-full text-[#ffffffde]",
      children: [
        k.jsxs("div", {
          children: [
            k.jsxs("h2", {
              className: "font-bold text-3xl line-clamp-1",
              children: [
                "CENTRAL DE ",
                k.jsx("span", {
                  className: "text-yellow-300",
                  children: "EMPREGO",
                }),
              ],
            }),
            k.jsx("p", {
              className: "text-zinc-500 truncate",
              children: "Escolha seu emprego e faça muito dinheiro",
            }),
          ],
        }),
        k.jsxs("div", {
          className:
            "bg-zinc-800 p-2 rounded w-[15vw] flex justify-between px-4",
          children: [
            k.jsx("span", { children: "Trabalho atual: " }),
            k.jsx("span", {
              className: "text-yellow-300 font-semibold",
              children: e,
            }),
          ],
        }),
        k.jsxs("div", {
          className:
            "bg-zinc-800 p-2 rounded w-[15vw] flex justify-between px-4",
          children: [
            k.jsx("span", { children: "Salário:" }),
            k.jsxs("span", {
              className: "text-green-300 font-semibold",
              children: ["$", t],
            }),
          ],
        }),
        k.jsx(nn, {
          variant: "secondary",
          size: "icon",
          className: "m-auto mr-0 font-bold",
          onClick: n,
          children: k.jsx(Vc, {}),
        }),
      ],
    });
function ym(e, t = []) {
  let n = [];
  function r(o, i) {
    const u = L.createContext(i),
      s = n.length;
    n = [...n, i];
    function a(h) {
      const { scope: p, children: y, ...w } = h,
        x = (p == null ? void 0 : p[e][s]) || u,
        P = L.useMemo(() => w, Object.values(w));
      return k.jsx(x.Provider, { value: P, children: y });
    }
    function m(h, p) {
      const y = (p == null ? void 0 : p[e][s]) || u,
        w = L.useContext(y);
      if (w) return w;
      if (i !== void 0) return i;
      throw new Error(`\`${h}\` must be used within \`${o}\``);
    }
    return (a.displayName = o + "Provider"), [a, m];
  }
  const l = () => {
    const o = n.map((i) => L.createContext(i));
    return function (u) {
      const s = (u == null ? void 0 : u[e]) || o;
      return L.useMemo(() => ({ [`__scope${e}`]: { ...u, [e]: s } }), [u, s]);
    };
  };
  return (l.scopeName = e), [r, wm(l, ...t)];
}
function wm(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((l) => ({ useScope: l(), scopeName: l.scopeName }));
    return function (o) {
      const i = r.reduce((u, { useScope: s, scopeName: a }) => {
        const h = s(o)[`__scope${a}`];
        return { ...u, ...h };
      }, {});
      return L.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
var xm = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  Bc = xm.reduce((e, t) => {
    const n = L.forwardRef((r, l) => {
      const { asChild: o, ...i } = r,
        u = o ? qi : t;
      return (
        typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
        k.jsx(u, { ...i, ref: l })
      );
    });
    return (n.displayName = `Primitive.${t}`), { ...e, [t]: n };
  }, {}),
  eu = "Progress",
  tu = 100,
  [km, Mm] = ym(eu),
  [Sm, Cm] = km(eu),
  Hc = L.forwardRef((e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: l,
      getValueLabel: o = Em,
      ...i
    } = e;
    (l || l === 0) && !gs(l) && console.error(Nm(`${l}`, "Progress"));
    const u = gs(l) ? l : tu;
    r !== null && !ys(r, u) && console.error(zm(`${r}`, "Progress"));
    const s = ys(r, u) ? r : null,
      a = hl(s) ? o(s, u) : void 0;
    return k.jsx(Sm, {
      scope: n,
      value: s,
      max: u,
      children: k.jsx(Bc.div, {
        "aria-valuemax": u,
        "aria-valuemin": 0,
        "aria-valuenow": hl(s) ? s : void 0,
        "aria-valuetext": a,
        role: "progressbar",
        "data-state": Gc(s, u),
        "data-value": s ?? void 0,
        "data-max": u,
        ...i,
        ref: t,
      }),
    });
  });
Hc.displayName = eu;
var Wc = "ProgressIndicator",
  Qc = L.forwardRef((e, t) => {
    const { __scopeProgress: n, ...r } = e,
      l = Cm(Wc, n);
    return k.jsx(Bc.div, {
      "data-state": Gc(l.value, l.max),
      "data-value": l.value ?? void 0,
      "data-max": l.max,
      ...r,
      ref: t,
    });
  });
Qc.displayName = Wc;
function Em(e, t) {
  return `${Math.round((e / t) * 100)}%`;
}
function Gc(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function hl(e) {
  return typeof e == "number";
}
function gs(e) {
  return hl(e) && !isNaN(e) && e > 0;
}
function ys(e, t) {
  return hl(e) && !isNaN(e) && e <= t && e >= 0;
}
function Nm(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${tu}\`.`;
}
function zm(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${tu} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Kc = Hc,
  _m = Qc;
const nu = L.forwardRef(({ className: e, value: t, ...n }, r) =>
  k.jsx(Kc, {
    ref: r,
    className: Ac(
      "relative h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800",
      e
    ),
    ...n,
    children: k.jsx(_m, {
      className:
        "h-full w-full flex-1 bg-yellow-400 transition-all dark:bg-zinc-50",
      style: { transform: `translateX(-${100 - (t || 0)}%)` },
    }),
  })
);
nu.displayName = Kc.displayName;
const Pm = ({ job: e, setActualjob: t, closeMenu: n }) => {
    var i;
    const [r, l] = L.useState(!1),
      o = () => {
        l(!1), t(e.name), ti("startJob", { job: e.name });
      };
    return k.jsxs(k.Fragment, {
      children: [
        k.jsx(nn, {
          className:
            "absolute bottom-5 inset-x-4 hover:bg-zinc-700 bg-zinc-800",
          size: "lg",
          onClick: () => l(!r),
          children: "Saiba mais",
        }),
        r &&
          k.jsxs(k.Fragment, {
            children: [
              k.jsx("div", {
                className:
                  "fixed inset-0 z-40 w-full h-full bg-zinc-950 opacity-60",
                onClick: () => l(!1),
              }),
              k.jsxs("div", {
                className:
                  "fixed z-50 text-white top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-zinc-800 p-8 rounded-lg w-1/2",
                children: [
                  k.jsx(nn, {
                    variant: "secondary",
                    size: "icon",
                    className: "w-7 h-7 font-bold absolute top-5 right-5",
                    onClick: () => l(!1),
                    children: k.jsx(Vc, { size: 15 }),
                  }),
                  k.jsx("h1", {
                    className: "text-2xl font-bold mb-2",
                    children: e.name,
                  }),
                  k.jsx("p", { className: "text-sm", children: e.description }),
                  k.jsx("hr", { className: "my-2" }),
                  k.jsx("h3", {
                    className: "text-lg font-semibold mt-4",
                    children: "Tutorial:",
                  }),
                  k.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      k.jsx("div", {
                        className: "step-container w-full",
                        children:
                          (i = e.steps) == null
                            ? void 0
                            : i.map((u, s) =>
                                k.jsxs(
                                  "p",
                                  {
                                    className: "text-sm my-2",
                                    children: [s + 1, ") ", u],
                                  },
                                  s
                                )
                              ),
                      }),
                      k.jsx("div", {
                        className: "flex justify-end w-full",
                        children: k.jsxs(nn, {
                          className: "hover:bg-zinc-700",
                          onClick: () => {
                            ti("openTutorial", { job: e.name }), n();
                          },
                          children: ["Ver tutorial", k.jsx(vm, { size: 20 })],
                        }),
                      }),
                    ],
                  }),
                  k.jsx("hr", { className: "my-2" }),
                  k.jsxs("div", {
                    className: "my-5",
                    children: [
                      k.jsxs("h3", {
                        className: "text-center text-yellow-300 font-semibold",
                        children: [e.exp % 100, "%"],
                      }),
                      k.jsxs("div", {
                        className: "flex items-center gap-4",
                        children: [
                          k.jsx("div", {
                            className: "font-semibold",
                            children: Math.floor(e.exp / 100),
                          }),
                          k.jsx(nu, {
                            value: e.exp % 100,
                            className: "w-full",
                          }),
                          k.jsx("div", {
                            className: "font-semibold",
                            children: Math.ceil(e.exp / 100) || 1,
                          }),
                        ],
                      }),
                    ],
                  }),
                  k.jsx(nn, {
                    className:
                      "mt-2 mx-auto w-full hover:bg-green-400 hover:text-zinc-900",
                    onClick: o,
                    children: "Iniciar emprego",
                  }),
                ],
              }),
            ],
          }),
      ],
    });
  },
  jm = ({ job: e, setActualjob: t, closeMenu: n }) =>
    k.jsxs("div", {
      className:
        "border-zinc-800 border-[1px] rounded-xl p-8 w-[14vw] h-[32vh] relative overflow-hidden bg-zinc-900",
      children: [
        k.jsxs("p", {
          className:
            "bg-yellow-300 text-black font-semibold p-1 absolute right-2 top-2 z-10 rounded-lg text-sm",
          children: ["$", e.salary, " por hora"],
        }),
        k.jsxs("div", {
          className: "absolute z-10 left-0 mx-4 top-20",
          children: [
            k.jsx("h2", {
              className: "font-bold 2xl:text-2xl text-xl mt-2 text-[#ffffffde]",
              children: e.name,
            }),
            k.jsx("p", {
              className:
                "text-zinc-500 text-sm mt-2 2xl:line-clamp-4 sm:line-clamp-2 line-clamp-1",
              children: e.description,
            }),
          ],
        }),
        k.jsx("img", {
          src: e.image,
          alt: e.name,
          className: "w-full absolute top-0 left-0 object-cover h-[15vh]",
          onError: (r) => {
            (r.currentTarget.src =
              "https://api.rebornsystem.com.br/jobs/backup_job.png"),
              (r.currentTarget.onerror = null);
          },
        }),
        k.jsx("div", {
          className:
            "absolute top-0 left-0 w-full bg-gradient-to-b from-transparent to-zinc-900 h-[15vh]",
        }),
        k.jsx(Pm, { job: e, setActualjob: t, closeMenu: n }),
      ],
    });
function Lm() {
  const [e, t] = L.useState(0),
    [n, r] = L.useState(Cp || []),
    [l, o] = L.useState("Sem emprego"),
    [i, u] = L.useState(bi());
  ni("openJobs", (m) => {
    r(m.jobs), t(m.salary), o(m.myJob), u(!0);
  });
  const s = (m) => {
      o(m), a(), n.find((h) => h.name === m && t(h.salary));
    },
    a = () => {
      u(!1), ti("closeMenu");
    };
  return (
    (document.onkeydown = (m) => m.key === "Escape" && a()),
    k.jsxs("div", {
      className:
        "bg-gradient-to-r from-zinc-950 from-5% via-zinc-850 via-30% to-zinc-900 to-90% absolute top-1/2 left-1/2 z-10 translate-y-[-50%] translate-x-[-50%] border-zinc-800 border-2 rounded-xl px-12 py-8 w-2/3 h-4/5",
      style: { display: i ? "block" : "none" },
      children: [
        k.jsx(gm, { selectedJob: l, salary: e, closeMenu: a }),
        k.jsx("div", {
          className: "flex flex-wrap gap-3 w-full my-8 overflow-auto h-[83%]",
          children: n.map((m, h) =>
            k.jsx(jm, { job: m, setActualjob: s, closeMenu: a }, h)
          ),
        }),
      ],
    })
  );
}
function Tm() {
  const [e, t] = L.useState(fs),
    [n, r] = L.useState(bi());
  return (
    ni("hintJob", (l = fs) => (r(!0), t(l))),
    ni("closeMenu", () => r(!1)),
    k.jsx("div", {
      style: { display: n ? "block" : "none" },
      className: "absolute top-1/2 border-zinc-800 text-zinc-100 left-5",
      children: k.jsxs("div", {
        className:
          "relative overflow-hidden h-[15vh] w-[15vw] rounded-2xl px-2 border-[1px] border-zinc-500",
        children: [
          k.jsx("div", {
            className:
              "absolute top-0 inset-0 w-full bg-gradient-to-t from-zinc-800 to-transparent h-full z-10",
          }),
          k.jsx("img", {
            src: e.job.image,
            alt: e.job.name,
            className: "w-full absolute top-0 left-0 object-cover h-[15vh]",
            onError: (l) => {
              (l.currentTarget.src =
                "https://api.rebornsystem.com.br/jobs/backup_job.png"),
                (l.currentTarget.onerror = null);
            },
          }),
          k.jsxs("div", {
            className:
              "absolute z-30 flex flex-col justify-end h-full w-full px-4",
            children: [
              k.jsx("div", {
                style: { fontFamily: "cursive", WebkitTextStroke: "1px black" },
                className:
                  "text-zinc-300 text-base min-[1440px]:text-xl min-[1680px]:text-2xl text-center font-semibold",
                children: e.message,
              }),
              k.jsxs("div", {
                className: "flex items-center gap-2 bottom-0",
                children: [
                  k.jsx("div", {
                    className: "font-semibold",
                    children: Math.floor(e.job.exp / 100),
                  }),
                  k.jsx(nu, {
                    value: e.job.exp % 100,
                    className: "w-full h-2",
                  }),
                  k.jsx("div", {
                    className: "font-semibold",
                    children: Math.ceil(e.job.exp / 100) || 1,
                  }),
                ],
              }),
              k.jsxs("div", {
                className: "flex justify-between py-2 font-semibold",
                children: [
                  k.jsx("span", {
                    className: "text-zinc-200",
                    children: "Ganho: ",
                  }),
                  k.jsxs("span", {
                    className: "text-green-300",
                    children: ["$", e.job.salary],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    })
  );
}
function Rm() {
  return k.jsxs(k.Fragment, { children: [k.jsx(Lm, {}), k.jsx(Tm, {})] });
}
oo.createRoot(document.getElementById("root")).render(
  k.jsx(cd.StrictMode, { children: k.jsx(Rm, {}) })
);
